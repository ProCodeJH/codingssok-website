"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";

/*
  숙제 & 노트 시스템 — Supabase DB 연동
*/

interface Homework {
    id: string;
    title: string;
    description: string;
    subject: string;
    due_date: string;
}

interface HomeworkSubmission {
    id: string;
    homework_id: string;
    submitted_at: string;
}

interface Note {
    id: string;
    title: string;
    content: string;
    tags: string[];
    created_at: string;
    updated_at: string;
}

export default function HomeworkPage() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [tab, setTab] = useState<"homework" | "notes">("homework");

    // Homework state
    const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
    const [submissions, setSubmissions] = useState<HomeworkSubmission[]>([]);
    const [hwLoading, setHwLoading] = useState(true);

    // Notes state
    const [notes, setNotes] = useState<Note[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [newNoteContent, setNewNoteContent] = useState("");
    const [newNoteTags, setNewNoteTags] = useState("");
    const [saving, setSaving] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

    const supabase = createClient();

    // Auth check
    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) {
                window.location.href = "/login";
                return;
            }
            setUserId(data.user.id);
            setLoggedIn(true);
        });
    }, [supabase]);

    // Fetch homework from DB
    const fetchHomework = useCallback(async () => {
        if (!userId) return;
        setHwLoading(true);
        try {
            const { data: hw } = await supabase
                .from("homework")
                .select("*")
                .eq("assigned_to", userId)
                .order("due_date", { ascending: true });

            const { data: subs } = await supabase
                .from("homework_submissions")
                .select("*")
                .eq("user_id", userId);

            setHomeworkList(hw || []);
            setSubmissions(subs || []);
        } catch (err) {
            console.error("숙제 로드 실패:", err);
        } finally {
            setHwLoading(false);
        }
    }, [userId, supabase]);

    // Fetch notes from DB
    const fetchNotes = useCallback(async () => {
        if (!userId) return;
        setNotesLoading(true);
        try {
            const { data } = await supabase
                .from("notes")
                .select("*")
                .eq("user_id", userId)
                .order("created_at", { ascending: false });

            setNotes(data || []);
        } catch (err) {
            console.error("노트 로드 실패:", err);
        } finally {
            setNotesLoading(false);
        }
    }, [userId, supabase]);

    useEffect(() => {
        if (userId) {
            fetchHomework();
            fetchNotes();
        }
    }, [userId, fetchHomework, fetchNotes]);

    // Submit homework
    const submitHomework = async (homeworkId: string) => {
        if (!userId) return;
        const { error } = await supabase.from("homework_submissions").insert({
            homework_id: homeworkId,
            user_id: userId,
            content: "제출 완료",
        });
        if (error) {
            alert("제출 실패: " + error.message);
        } else {
            fetchHomework();
        }
    };

    // Save note to DB
    const saveNote = async () => {
        if (!userId || !newNoteTitle.trim() || !newNoteContent.trim()) return;
        setSaving(true);

        const tags = newNoteTags.split(",").map((t) => t.trim()).filter(Boolean);

        try {
            if (editingNoteId) {
                // Update existing note
                const { error } = await supabase
                    .from("notes")
                    .update({ title: newNoteTitle, content: newNoteContent, tags, updated_at: new Date().toISOString() })
                    .eq("id", editingNoteId)
                    .eq("user_id", userId);
                if (error) throw error;
            } else {
                // Insert new note
                const { error } = await supabase.from("notes").insert({
                    user_id: userId,
                    title: newNoteTitle,
                    content: newNoteContent,
                    tags,
                });
                if (error) throw error;
            }

            setNewNoteTitle("");
            setNewNoteContent("");
            setNewNoteTags("");
            setEditingNoteId(null);
            fetchNotes();
        } catch (err) {
            alert("저장 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류"));
        } finally {
            setSaving(false);
        }
    };

    // Delete note
    const deleteNote = async (noteId: string) => {
        if (!userId || !confirm("정말 삭제하시겠습니까?")) return;
        const { error } = await supabase.from("notes").delete().eq("id", noteId).eq("user_id", userId);
        if (error) {
            alert("삭제 실패: " + error.message);
        } else {
            fetchNotes();
        }
    };

    // Edit note — populate form
    const startEditNote = (note: Note) => {
        setEditingNoteId(note.id);
        setNewNoteTitle(note.title);
        setNewNoteContent(note.content);
        setNewNoteTags(note.tags.join(", "));
        setTab("notes");
    };

    const isSubmitted = (homeworkId: string) => submissions.some((s) => s.homework_id === homeworkId);

    if (!loggedIn) return null;

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fdfaf5, #fff5eb)" }}>
            {/* Header */}
            <motion.header
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    padding: "12px clamp(16px, 3vw, 24px)",
                    display: "flex", alignItems: "center", gap: 16,
                    position: "sticky", top: 0, zIndex: 50,
                }}
            >
                <Link href="/dashboard" style={{ textDecoration: "none", color: "#EC5212", fontSize: 13, fontWeight: 500 }}>← 대시보드</Link>
                <h1 style={{ fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 700, color: "#1a1a1a" }}>📝 숙제 & 노트</h1>
            </motion.header>

            <div style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(20px, 4vw, 32px) clamp(16px, 3vw, 24px)" }}>
                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ display: "flex", gap: 4, marginBottom: 32, background: "rgba(0,0,0,0.04)", borderRadius: 14, padding: 4 }}
                >
                    {(["homework", "notes"] as const).map((t) => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            flex: 1, padding: "12px 0", border: "none", borderRadius: 10,
                            background: tab === t ? "#fff" : "transparent",
                            fontWeight: 600, fontSize: 14, cursor: "pointer",
                            color: tab === t ? "#1a1a1a" : "#999",
                            boxShadow: tab === t ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
                            transition: "all 0.25s ease",
                        }}>
                            {t === "homework" ? "📋 숙제" : "📓 수업 노트"}
                        </button>
                    ))}
                </motion.div>

                {/* ── 숙제 탭 ── */}
                {tab === "homework" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {hwLoading ? (
                            <p style={{ textAlign: "center", color: "#999", padding: 40 }}>숙제를 불러오는 중...</p>
                        ) : homeworkList.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    textAlign: "center", padding: "60px 24px",
                                    background: "#fff", borderRadius: 24,
                                    border: "2px dashed rgba(0,0,0,0.08)",
                                }}
                            >
                                <div style={{ fontSize: 64, marginBottom: 16 }}>📭</div>
                                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginBottom: 8 }}>아직 배정된 숙제가 없어요!</h3>
                                <p style={{ fontSize: 14, color: "#999", lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>
                                    선생님이 새 숙제를 등록하면<br />여기에 자동으로 나타납니다.
                                </p>
                            </motion.div>
                        ) : (
                            homeworkList.map((hw) => (
                                <div key={hw.id} style={{
                                    background: "#fff", borderRadius: 16, padding: "20px 24px",
                                    border: "1.5px solid #f0f0f0",
                                    display: "flex", alignItems: "center", justifyContent: "space-between",
                                }}>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                            <span style={{
                                                fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
                                                background: hw.subject === "C언어" ? "#FFF0E6" : hw.subject === "HTML/CSS" ? "#E6F7F2" : "#E6F0FA",
                                                color: hw.subject === "C언어" ? "#EC5212" : hw.subject === "HTML/CSS" ? "#77C6B3" : "#70A2E1",
                                            }}>{hw.subject}</span>
                                            <span style={{ fontSize: 12, color: "#999" }}>마감: {hw.due_date}</span>
                                        </div>
                                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a", marginBottom: 4 }}>{hw.title}</h3>
                                        <p style={{ fontSize: 13, color: "#888" }}>{hw.description}</p>
                                    </div>
                                    {isSubmitted(hw.id) ? (
                                        <span style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, background: "#e8f5e9", color: "#2e7d32", whiteSpace: "nowrap" }}>
                                            ✅ 제출 완료
                                        </span>
                                    ) : (
                                        <button onClick={() => submitHomework(hw.id)} style={{
                                            padding: "8px 16px", borderRadius: 8, border: "none",
                                            background: "#EC5212", color: "#fff", fontWeight: 600,
                                            fontSize: 12, cursor: "pointer", whiteSpace: "nowrap",
                                        }}>
                                            제출하기
                                        </button>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}

                {/* ── 노트 탭 ── */}
                {tab === "notes" && (
                    <div>
                        {/* Note input form */}
                        <div style={{ background: "#fff", borderRadius: 16, padding: 20, marginBottom: 16, border: "1.5px solid #f0f0f0" }}>
                            <input
                                value={newNoteTitle}
                                onChange={(e) => setNewNoteTitle(e.target.value)}
                                placeholder="노트 제목"
                                style={{ width: "100%", border: "none", outline: "none", fontSize: 16, fontWeight: 600, marginBottom: 8, fontFamily: "inherit", boxSizing: "border-box" }}
                            />
                            <textarea
                                value={newNoteContent}
                                onChange={(e) => setNewNoteContent(e.target.value)}
                                placeholder="오늘 배운 내용을 메모하세요..."
                                style={{ width: "100%", border: "none", outline: "none", fontSize: 14, lineHeight: 1.6, resize: "none", minHeight: 80, fontFamily: "inherit", boxSizing: "border-box" }}
                            />
                            <input
                                value={newNoteTags}
                                onChange={(e) => setNewNoteTags(e.target.value)}
                                placeholder="태그 (쉼표로 구분, 예: C언어, 포인터)"
                                style={{ width: "100%", border: "none", outline: "none", fontSize: 13, color: "#888", marginTop: 8, fontFamily: "inherit", boxSizing: "border-box" }}
                            />
                            <div style={{ textAlign: "right", marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                {editingNoteId && (
                                    <button onClick={() => { setEditingNoteId(null); setNewNoteTitle(""); setNewNoteContent(""); setNewNoteTags(""); }} style={{
                                        padding: "8px 20px", borderRadius: 8, border: "1px solid #ddd",
                                        background: "#fff", color: "#666", fontWeight: 600, fontSize: 13, cursor: "pointer",
                                    }}>취소</button>
                                )}
                                <button onClick={saveNote} disabled={saving || !newNoteTitle.trim() || !newNoteContent.trim()} style={{
                                    padding: "8px 20px", borderRadius: 8, border: "none",
                                    background: saving ? "#ccc" : "#FFD37D", color: "#1a1a1a",
                                    fontWeight: 600, fontSize: 13, cursor: saving ? "not-allowed" : "pointer",
                                }}>
                                    {saving ? "저장 중..." : editingNoteId ? "✏️ 수정" : "💾 저장"}
                                </button>
                            </div>
                        </div>

                        {/* Existing notes from DB */}
                        {notesLoading ? (
                            <p style={{ textAlign: "center", color: "#999", padding: 40 }}>노트를 불러오는 중...</p>
                        ) : notes.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    textAlign: "center", padding: "60px 24px",
                                    background: "#fff", borderRadius: 24,
                                    border: "2px dashed rgba(0,0,0,0.08)",
                                }}
                            >
                                <div style={{ fontSize: 64, marginBottom: 16 }}>📓</div>
                                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#333", marginBottom: 8 }}>첫 노트를 작성해보세요!</h3>
                                <p style={{ fontSize: 14, color: "#999", lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>
                                    위 입력칸에서 제목, 내용, 태그를 입력하고<br />💾 저장 버튼을 눌러주세요.
                                </p>
                                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
                                    {["✏️ 배운 내용 정리", "💡 아이디어 메모", "📌 중요 포인트"].map(tip => (
                                        <span key={tip} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, background: "rgba(0,0,0,0.04)", color: "#888" }}>{tip}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            notes.map((note) => (
                                <div key={note.id} style={{
                                    background: "#fff", borderRadius: 16, padding: "20px 24px",
                                    marginBottom: 12, border: "1.5px solid #f0f0f0",
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#1a1a1a" }}>{note.title}</h3>
                                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                            <span style={{ fontSize: 12, color: "#999" }}>{new Date(note.created_at).toLocaleDateString("ko-KR")}</span>
                                            <button onClick={() => startEditNote(note)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 14 }}>✏️</button>
                                            <button onClick={() => deleteNote(note.id)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 14 }}>🗑️</button>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 8, whiteSpace: "pre-wrap" }}>{note.content}</p>
                                    {note.tags && note.tags.length > 0 && (
                                        <div style={{ display: "flex", gap: 6 }}>
                                            {note.tags.map((tag) => (
                                                <span key={tag} style={{ fontSize: 11, padding: "2px 8px", borderRadius: 6, background: "#f5f5f5", color: "#888" }}>
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
