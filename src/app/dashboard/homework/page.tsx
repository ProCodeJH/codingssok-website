"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";

/*
  숙제 & 노트 시스템 — Coddy Dark Theme + 코딩쏙 브랜드
  - 다크 브라운 테마 (대시보드/컴파일러와 통일)
  - Coddy 카드 radius 16px, 입력 51px/12px
  - Coddy 탭 indicator bar (4px accent bottom)
  - Coddy 태그 pill (32px radius)
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

    const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
    const [submissions, setSubmissions] = useState<HomeworkSubmission[]>([]);
    const [hwLoading, setHwLoading] = useState(true);

    const [notes, setNotes] = useState<Note[]>([]);
    const [notesLoading, setNotesLoading] = useState(true);
    const [newNoteTitle, setNewNoteTitle] = useState("");
    const [newNoteContent, setNewNoteContent] = useState("");
    const [newNoteTags, setNewNoteTags] = useState("");
    const [saving, setSaving] = useState(false);
    const [editingNoteId, setEditingNoteId] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) { window.location.href = "/login"; return; }
            setUserId(data.user.id); setLoggedIn(true);
        });
    }, [supabase]);

    const fetchHomework = useCallback(async () => {
        if (!userId) return;
        setHwLoading(true);
        try {
            const { data: hw } = await supabase.from("homework").select("*")
                .eq("assigned_to", userId).order("due_date", { ascending: true });
            const { data: subs } = await supabase.from("homework_submissions").select("*")
                .eq("user_id", userId);
            setHomeworkList(hw || []); setSubmissions(subs || []);
        } catch (err) { console.error("숙제 로드 실패:", err); }
        finally { setHwLoading(false); }
    }, [userId, supabase]);

    const fetchNotes = useCallback(async () => {
        if (!userId) return;
        setNotesLoading(true);
        try {
            const { data } = await supabase.from("notes").select("*")
                .eq("user_id", userId).order("created_at", { ascending: false });
            setNotes(data || []);
        } catch (err) { console.error("노트 로드 실패:", err); }
        finally { setNotesLoading(false); }
    }, [userId, supabase]);

    useEffect(() => { if (userId) { fetchHomework(); fetchNotes(); } }, [userId, fetchHomework, fetchNotes]);

    const submitHomework = async (homeworkId: string) => {
        if (!userId) return;
        const { error } = await supabase.from("homework_submissions").insert({ homework_id: homeworkId, user_id: userId, content: "제출 완료" });
        if (error) alert("제출 실패: " + error.message);
        else fetchHomework();
    };

    const saveNote = async () => {
        if (!userId || !newNoteTitle.trim() || !newNoteContent.trim()) return;
        setSaving(true);
        const tags = newNoteTags.split(",").map((t) => t.trim()).filter(Boolean);
        try {
            if (editingNoteId) {
                const { error } = await supabase.from("notes")
                    .update({ title: newNoteTitle, content: newNoteContent, tags, updated_at: new Date().toISOString() })
                    .eq("id", editingNoteId).eq("user_id", userId);
                if (error) throw error;
            } else {
                const { error } = await supabase.from("notes").insert({ user_id: userId, title: newNoteTitle, content: newNoteContent, tags });
                if (error) throw error;
            }
            setNewNoteTitle(""); setNewNoteContent(""); setNewNoteTags(""); setEditingNoteId(null); fetchNotes();
        } catch (err) { alert("저장 실패: " + (err instanceof Error ? err.message : "알 수 없는 오류")); }
        finally { setSaving(false); }
    };

    const deleteNote = async (noteId: string) => {
        if (!userId || !confirm("정말 삭제하시겠습니까?")) return;
        const { error } = await supabase.from("notes").delete().eq("id", noteId).eq("user_id", userId);
        if (error) alert("삭제 실패: " + error.message);
        else fetchNotes();
    };

    const startEditNote = (note: Note) => {
        setEditingNoteId(note.id); setNewNoteTitle(note.title);
        setNewNoteContent(note.content); setNewNoteTags(note.tags.join(", ")); setTab("notes");
    };

    const isSubmitted = (homeworkId: string) => submissions.some((s) => s.homework_id === homeworkId);

    if (!loggedIn) return null;

    /* Coddy Design Tokens (warm brown) */
    const bg1 = "#1e1c1a";
    const bg2 = "#252320";
    const bg3 = "#2d2a26";
    const border = "rgba(255,255,255,0.06)";
    const accent = "#EC5212";
    const textP = "rgba(255,255,255,0.87)";
    const textS = "rgba(255,255,255,0.5)";
    const textD = "rgba(255,255,255,0.25)";

    /* Subject color map */
    const subjectColors: Record<string, { bg: string; text: string }> = {
        "C언어": { bg: "rgba(236,82,18,0.15)", text: "#EC5212" },
        "HTML/CSS": { bg: "rgba(119,198,179,0.15)", text: "#77C6B3" },
        "JavaScript": { bg: "rgba(255,211,125,0.15)", text: "#FFD37D" },
    };

    return (
        <div style={{ minHeight: "100vh", background: bg1, color: textP }}>
            {/* Header — Coddy 54px topbar */}
            <motion.header
                initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                style={{
                    height: 54, background: bg2, borderBottom: `1px solid ${border}`,
                    padding: "0 16px", display: "flex", alignItems: "center", gap: 12,
                    position: "sticky", top: 0, zIndex: 50,
                }}
            >
                <Link href="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 16 }}>🌸</span>
                    <span style={{ color: accent, fontSize: 13, fontWeight: 600 }}>← 대시보드</span>
                </Link>
                <div style={{ width: 1, height: 20, background: border }} />
                <h1 style={{ fontSize: "clamp(13px, 2vw, 16px)", fontWeight: 700, color: "#fff" }}>📝 숙제 & 노트</h1>
            </motion.header>

            <div style={{ maxWidth: 800, margin: "0 auto", padding: "clamp(20px, 4vw, 32px) clamp(16px, 3vw, 24px)" }}>
                {/* Coddy-style Tabs with bottom indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ display: "flex", marginBottom: 32, position: "relative" }}
                >
                    {(["homework", "notes"] as const).map((t) => (
                        <button key={t} onClick={() => setTab(t)} style={{
                            flex: 1, padding: "14px 0", border: "none", background: "transparent",
                            fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "inherit",
                            color: tab === t ? "#fff" : textS,
                            borderBottom: tab === t ? `3px solid ${accent}` : `1px solid ${border}`,
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
                            <p style={{ textAlign: "center", color: textD, padding: 40 }}>숙제를 불러오는 중...</p>
                        ) : homeworkList.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    textAlign: "center", padding: "60px 24px",
                                    background: bg2, borderRadius: 16,
                                    border: `1px dashed ${border}`,
                                }}
                            >
                                <div style={{ fontSize: 64, marginBottom: 16 }}>📭</div>
                                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 8 }}>아직 배정된 숙제가 없어요!</h3>
                                <p style={{ fontSize: 14, color: textS, lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>
                                    선생님이 새 숙제를 등록하면<br />여기에 자동으로 나타납니다.
                                </p>
                            </motion.div>
                        ) : (
                            homeworkList.map((hw, i) => (
                                <motion.div
                                    key={hw.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    style={{
                                        background: bg2, borderRadius: 16, padding: "20px 24px",
                                        border: `1px solid ${border}`,
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                    }}
                                >
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                            <span style={{
                                                fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 32,
                                                background: (subjectColors[hw.subject] || { bg: "rgba(255,255,255,0.08)" }).bg,
                                                color: (subjectColors[hw.subject] || { text: textS }).text,
                                            }}>{hw.subject}</span>
                                            <span style={{ fontSize: 12, color: textD }}>마감: {hw.due_date}</span>
                                        </div>
                                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{hw.title}</h3>
                                        <p style={{ fontSize: 13, color: textS }}>{hw.description}</p>
                                    </div>
                                    {isSubmitted(hw.id) ? (
                                        <span style={{
                                            padding: "6px 14px", borderRadius: 12, fontSize: 12, fontWeight: 700,
                                            background: "rgba(119,198,179,0.15)", color: "#77C6B3", whiteSpace: "nowrap",
                                        }}>✅ 제출 완료</span>
                                    ) : (
                                        <motion.button
                                            onClick={() => submitHomework(hw.id)}
                                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                            style={{
                                                padding: "8px 18px", borderRadius: 12, border: "none",
                                                background: accent, color: "#fff", fontWeight: 700,
                                                fontSize: 12, cursor: "pointer", whiteSpace: "nowrap",
                                                fontFamily: "inherit",
                                                boxShadow: `0 4px 16px ${accent}60`,
                                            }}
                                        >제출하기</motion.button>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                )}

                {/* ── 노트 탭 ── */}
                {tab === "notes" && (
                    <div>
                        {/* Note editor — Coddy input pattern */}
                        <div style={{
                            background: bg2, borderRadius: 16, padding: 20, marginBottom: 16,
                            border: `1px solid ${border}`,
                        }}>
                            <input
                                value={newNoteTitle}
                                onChange={(e) => setNewNoteTitle(e.target.value)}
                                placeholder="노트 제목"
                                style={{
                                    width: "100%", border: "none", outline: "none", fontSize: 16, fontWeight: 600,
                                    marginBottom: 12, fontFamily: "inherit", boxSizing: "border-box",
                                    background: bg3, color: "#fff", padding: "12px 16px", borderRadius: 12,
                                    height: 51,
                                }}
                            />
                            <textarea
                                value={newNoteContent}
                                onChange={(e) => setNewNoteContent(e.target.value)}
                                placeholder="오늘 배운 내용을 메모하세요..."
                                style={{
                                    width: "100%", border: "none", outline: "none", fontSize: 14, lineHeight: 1.6,
                                    resize: "none", minHeight: 100, fontFamily: "inherit", boxSizing: "border-box",
                                    background: bg3, color: textP, padding: "12px 16px", borderRadius: 12,
                                    marginBottom: 12,
                                }}
                            />
                            <input
                                value={newNoteTags}
                                onChange={(e) => setNewNoteTags(e.target.value)}
                                placeholder="태그 (쉼표로 구분, 예: C언어, 포인터)"
                                style={{
                                    width: "100%", border: "none", outline: "none", fontSize: 13,
                                    fontFamily: "inherit", boxSizing: "border-box",
                                    background: bg3, color: textS, padding: "10px 16px", borderRadius: 12,
                                    height: 42,
                                }}
                            />
                            <div style={{ textAlign: "right", marginTop: 16, display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                {editingNoteId && (
                                    <button onClick={() => { setEditingNoteId(null); setNewNoteTitle(""); setNewNoteContent(""); setNewNoteTags(""); }} style={{
                                        padding: "8px 20px", borderRadius: 12, border: `1px solid ${border}`,
                                        background: "transparent", color: textS, fontWeight: 600, fontSize: 13, cursor: "pointer",
                                        fontFamily: "inherit",
                                    }}>취소</button>
                                )}
                                <motion.button
                                    onClick={saveNote}
                                    disabled={saving || !newNoteTitle.trim() || !newNoteContent.trim()}
                                    whileHover={saving ? {} : { scale: 1.05 }}
                                    whileTap={saving ? {} : { scale: 0.95 }}
                                    style={{
                                        padding: "8px 24px", borderRadius: 12, border: "none",
                                        background: saving ? "#555" : accent, color: "#fff",
                                        fontWeight: 700, fontSize: 13, cursor: saving ? "not-allowed" : "pointer",
                                        fontFamily: "inherit",
                                        boxShadow: saving ? "none" : `0 4px 16px ${accent}60`,
                                    }}
                                >
                                    {saving ? "저장 중..." : editingNoteId ? "✏️ 수정" : "💾 저장"}
                                </motion.button>
                            </div>
                        </div>

                        {/* Notes list */}
                        {notesLoading ? (
                            <p style={{ textAlign: "center", color: textD, padding: 40 }}>노트를 불러오는 중...</p>
                        ) : notes.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                style={{
                                    textAlign: "center", padding: "60px 24px",
                                    background: bg2, borderRadius: 16,
                                    border: `1px dashed ${border}`,
                                }}
                            >
                                <div style={{ fontSize: 64, marginBottom: 16 }}>📓</div>
                                <h3 style={{ fontSize: 18, fontWeight: 600, color: "#fff", marginBottom: 8 }}>첫 노트를 작성해보세요!</h3>
                                <p style={{ fontSize: 14, color: textS, lineHeight: 1.6, maxWidth: 300, margin: "0 auto" }}>
                                    위 입력칸에서 제목, 내용, 태그를 입력하고<br />💾 저장 버튼을 눌러주세요.
                                </p>
                                <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
                                    {["✏️ 배운 내용 정리", "💡 아이디어 메모", "📌 중요 포인트"].map(tip => (
                                        <span key={tip} style={{
                                            fontSize: 11, padding: "4px 12px", borderRadius: 32,
                                            background: "rgba(255,255,255,0.06)", color: textS,
                                        }}>{tip}</span>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            notes.map((note, i) => (
                                <motion.div
                                    key={note.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    style={{
                                        background: bg2, borderRadius: 16, padding: "20px 24px",
                                        marginBottom: 12, border: `1px solid ${border}`,
                                    }}
                                >
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{note.title}</h3>
                                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                            <span style={{ fontSize: 12, color: textD }}>{new Date(note.created_at).toLocaleDateString("ko-KR")}</span>
                                            <button onClick={() => startEditNote(note)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 14, filter: "grayscale(0.5)" }}>✏️</button>
                                            <button onClick={() => deleteNote(note.id)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 14, filter: "grayscale(0.5)" }}>🗑️</button>
                                        </div>
                                    </div>
                                    <p style={{ fontSize: 14, color: textS, lineHeight: 1.6, marginBottom: 8, whiteSpace: "pre-wrap" }}>{note.content}</p>
                                    {note.tags && note.tags.length > 0 && (
                                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                            {note.tags.map((tag) => (
                                                <span key={tag} style={{
                                                    fontSize: 11, padding: "3px 10px", borderRadius: 32,
                                                    background: "rgba(236,82,18,0.1)", color: accent,
                                                }}>#{tag}</span>
                                            ))}
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
