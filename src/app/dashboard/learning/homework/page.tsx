"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import { FadeIn, StaggerList, StaggerItem } from "@/components/motion/motion";

/*
  숙제 & 노트 시스템 — 화이트톤 (learning 레이아웃 통합)
  - 숙제 목록 + 제출, 노트 CRUD
  - layout.tsx 네비로 감싸짐
*/

interface Homework { id: string; title: string; description: string; subject: string; due_date: string; }
interface HomeworkSubmission { id: string; homework_id: string; submitted_at: string; }
interface Note { id: string; title: string; content: string; tags: string[]; created_at: string; updated_at: string; }

const subjectColors: Record<string, { bg: string; text: string; border: string }> = {
    "C언어": { bg: "#fff7ed", text: "#ea580c", border: "#fed7aa" },
    "HTML/CSS": { bg: "#f0fdfa", text: "#0d9488", border: "#99f6e4" },
    "JavaScript": { bg: "#fefce8", text: "#ca8a04", border: "#fef08a" },
    "Python": { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" },
    "알고리즘": { bg: "#faf5ff", text: "#7c3aed", border: "#e9d5ff" },
};

export default function HomeworkPage() {
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

    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) setUserId(data.user.id);
        });
    }, [supabase]);

    const fetchHomework = useCallback(async () => {
        if (!userId) return; setHwLoading(true);
        try {
            const { data: hw } = await supabase.from("homework").select("*").eq("assigned_to", userId).order("due_date", { ascending: true });
            const { data: subs } = await supabase.from("homework_submissions").select("*").eq("user_id", userId);
            setHomeworkList(hw || []); setSubmissions(subs || []);
        } catch (err) { console.error("숙제 로드 실패:", err); }
        finally { setHwLoading(false); }
    }, [userId, supabase]);

    const fetchNotes = useCallback(async () => {
        if (!userId) return; setNotesLoading(true);
        try {
            const { data } = await supabase.from("notes").select("*").eq("user_id", userId).order("created_at", { ascending: false });
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
                const { error } = await supabase.from("notes").update({ title: newNoteTitle, content: newNoteContent, tags, updated_at: new Date().toISOString() }).eq("id", editingNoteId).eq("user_id", userId);
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

    const PRIMARY = "#0ea5e9";

    const glassCard: React.CSSProperties = {
        background: "rgba(255,255,255,0.65)", backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.02)",
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Header */}
            <div>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em" }}>
                    <span style={{ marginRight: 8 }}>📝</span>숙제 & 노트
                </h1>
                <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>숙제 확인·제출, 수업 노트 관리</p>
            </div>

            {/* Tabs */}
            <div style={{
                display: "flex", borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0",
                background: "#f8fafc",
            }}>
                {(["homework", "notes"] as const).map((t) => (
                    <button key={t} onClick={() => setTab(t)} style={{
                        flex: 1, padding: "12px 0", border: "none", fontWeight: 700, fontSize: 14,
                        cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
                        background: tab === t ? "#fff" : "transparent",
                        color: tab === t ? "#0f172a" : "#94a3b8",
                        boxShadow: tab === t ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                    }}>
                        {t === "homework" ? "📋 숙제" : "📓 수업 노트"}
                    </button>
                ))}
            </div>

            {/* ── 숙제 탭 ── */}
            {tab === "homework" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {hwLoading ? (
                        <p style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>숙제를 불러오는 중...</p>
                    ) : homeworkList.length === 0 ? (
                        <div style={{
                            textAlign: "center", padding: "60px 24px", borderRadius: 20, ...glassCard,
                            border: "2px dashed #e2e8f0",
                        }}>
                            <div style={{ fontSize: 64, marginBottom: 16 }}>📭</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>아직 배정된 숙제가 없어요!</h3>
                            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                                선생님이 새 숙제를 등록하면<br />여기에 자동으로 나타납니다.
                            </p>
                        </div>
                    ) : (
                        homeworkList.map((hw) => {
                            const sc = subjectColors[hw.subject] || { bg: "#f1f5f9", text: "#64748b", border: "#e2e8f0" };
                            return (
                                <div key={hw.id} style={{
                                    ...glassCard, borderRadius: 16, padding: "20px 24px",
                                    display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
                                }}>
                                    <div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                            <span style={{
                                                fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 32,
                                                background: sc.bg, color: sc.text, border: `1px solid ${sc.border}`,
                                            }}>{hw.subject}</span>
                                            <span style={{ fontSize: 12, color: "#94a3b8" }}>마감: {hw.due_date}</span>
                                        </div>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{hw.title}</h3>
                                        <p style={{ fontSize: 13, color: "#64748b" }}>{hw.description}</p>
                                    </div>
                                    {isSubmitted(hw.id) ? (
                                        <span style={{
                                            padding: "8px 16px", borderRadius: 12, fontSize: 12, fontWeight: 700,
                                            background: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0", whiteSpace: "nowrap",
                                        }}>✅ 제출 완료</span>
                                    ) : (
                                        <button onClick={() => submitHomework(hw.id)} style={{
                                            padding: "8px 20px", borderRadius: 12, border: "none",
                                            background: `linear-gradient(to right, ${PRIMARY}, #6366f1)`, color: "#fff",
                                            fontWeight: 700, fontSize: 12, cursor: "pointer", whiteSpace: "nowrap",
                                            boxShadow: "0 4px 14px rgba(14,165,233,0.3)",
                                        }}>제출하기</button>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}

            {/* ── 노트 탭 ── */}
            {tab === "notes" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* Note editor */}
                    <div style={{ ...glassCard, borderRadius: 20, padding: 20 }}>
                        <input
                            value={newNoteTitle} onChange={(e) => setNewNoteTitle(e.target.value)}
                            placeholder="노트 제목"
                            style={{
                                width: "100%", border: "1px solid #e2e8f0", outline: "none", fontSize: 16, fontWeight: 600,
                                marginBottom: 12, fontFamily: "inherit", boxSizing: "border-box",
                                background: "#f8fafc", color: "#0f172a", padding: "12px 16px", borderRadius: 12,
                            }}
                        />
                        <textarea
                            value={newNoteContent} onChange={(e) => setNewNoteContent(e.target.value)}
                            placeholder="오늘 배운 내용을 메모하세요..."
                            style={{
                                width: "100%", border: "1px solid #e2e8f0", outline: "none", fontSize: 14, lineHeight: 1.6,
                                resize: "none", minHeight: 120, fontFamily: "inherit", boxSizing: "border-box",
                                background: "#f8fafc", color: "#0f172a", padding: "12px 16px", borderRadius: 12,
                                marginBottom: 12,
                            }}
                        />
                        <input
                            value={newNoteTags} onChange={(e) => setNewNoteTags(e.target.value)}
                            placeholder="태그 (쉼표로 구분, 예: C언어, 포인터)"
                            style={{
                                width: "100%", border: "1px solid #e2e8f0", outline: "none", fontSize: 13,
                                fontFamily: "inherit", boxSizing: "border-box",
                                background: "#f8fafc", color: "#64748b", padding: "10px 16px", borderRadius: 12,
                            }}
                        />
                        <div style={{ textAlign: "right", marginTop: 16, display: "flex", justifyContent: "flex-end", gap: 8 }}>
                            {editingNoteId && (
                                <button onClick={() => { setEditingNoteId(null); setNewNoteTitle(""); setNewNoteContent(""); setNewNoteTags(""); }} style={{
                                    padding: "8px 20px", borderRadius: 12, border: "1px solid #e2e8f0",
                                    background: "#fff", color: "#64748b", fontWeight: 600, fontSize: 13, cursor: "pointer",
                                }}>취소</button>
                            )}
                            <button
                                onClick={saveNote}
                                disabled={saving || !newNoteTitle.trim() || !newNoteContent.trim()}
                                style={{
                                    padding: "8px 24px", borderRadius: 12, border: "none",
                                    background: saving ? "#94a3b8" : `linear-gradient(to right, ${PRIMARY}, #6366f1)`, color: "#fff",
                                    fontWeight: 700, fontSize: 13, cursor: saving ? "not-allowed" : "pointer",
                                    boxShadow: saving ? "none" : "0 4px 14px rgba(14,165,233,0.3)",
                                }}
                            >
                                {saving ? "저장 중..." : editingNoteId ? "✏️ 수정" : "💾 저장"}
                            </button>
                        </div>
                    </div>

                    {/* Notes list */}
                    {notesLoading ? (
                        <p style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>노트를 불러오는 중...</p>
                    ) : notes.length === 0 ? (
                        <div style={{
                            textAlign: "center", padding: "60px 24px", borderRadius: 20, ...glassCard,
                            border: "2px dashed #e2e8f0",
                        }}>
                            <div style={{ fontSize: 64, marginBottom: 16 }}>📓</div>
                            <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>첫 노트를 작성해보세요!</h3>
                            <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.6 }}>
                                위 입력칸에서 제목, 내용, 태그를 입력하고<br />💾 저장 버튼을 눌러주세요.
                            </p>
                        </div>
                    ) : (
                        notes.map((note) => (
                            <div key={note.id} style={{ ...glassCard, borderRadius: 16, padding: "20px 24px" }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>{note.title}</h3>
                                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                        <span style={{ fontSize: 12, color: "#94a3b8" }}>{new Date(note.created_at).toLocaleDateString("ko-KR")}</span>
                                        <button onClick={() => startEditNote(note)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 14 }}>✏️</button>
                                        <button onClick={() => deleteNote(note.id)} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 14 }}>🗑️</button>
                                    </div>
                                </div>
                                <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 8, whiteSpace: "pre-wrap" }}>{note.content}</p>
                                {note.tags && note.tags.length > 0 && (
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                        {note.tags.map((tag) => (
                                            <span key={tag} style={{
                                                fontSize: 11, padding: "3px 10px", borderRadius: 32,
                                                background: "#e0f2fe", color: "#0369a1", border: "1px solid #bae6fd",
                                            }}>#{tag}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}
