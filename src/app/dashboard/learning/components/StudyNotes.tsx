"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Note {
    id: string; title: string; content: string; courseId: string;
    tags: string[]; color: string; emoji: string;
    createdAt: number; updatedAt: number; pinned: boolean;
}

const STORAGE_KEY = "codingssok-study-notes";
const COLORS = ["#eff6ff", "#f0fdf4", "#fefce8", "#fdf2f8", "#f5f3ff", "#fff7ed", "#f0f9ff"];
const EMOJIS = ["📝", "💡", "⚡", "🔥", "🎯", "🧩", "🌟", "📌", "🚀", "🎨", "📊", "🧠"];
const STICKERS = ["⭐", "❤️", "🏆", "🎉", "💎", "🌈", "✨", "🎈", "🦋", "🌸", "🐱", "🎵"];

const load = (): Note[] => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
};
const save = (notes: Note[]) => { if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); };

interface Props {
    isOpen: boolean; onClose: () => void; currentCourseId?: string; currentCourseName?: string;
}

export function StudyNotes({ isOpen, onClose, currentCourseId, currentCourseName }: Props) {
    const [notes, setNotes] = useState<Note[]>(load);
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCourse, setFilterCourse] = useState("all");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [showStickerPicker, setShowStickerPicker] = useState(false);

    useEffect(() => { save(notes); }, [notes]);

    const createNote = useCallback(() => {
        const newNote: Note = {
            id: `note-${Date.now()}`, title: "", content: "",
            courseId: currentCourseId || "general", tags: [],
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            emoji: "📝", createdAt: Date.now(), updatedAt: Date.now(), pinned: false,
        };
        setNotes(prev => [newNote, ...prev]);
        setActiveNote(newNote);
    }, [currentCourseId]);

    const updateNote = (field: keyof Note, value: string | boolean | string[]) => {
        if (!activeNote) return;
        const updated = { ...activeNote, [field]: value, updatedAt: Date.now() };
        setActiveNote(updated);
        setNotes(prev => prev.map(n => n.id === updated.id ? updated : n));
    };

    const deleteNote = (id: string) => {
        setNotes(prev => prev.filter(n => n.id !== id));
        if (activeNote?.id === id) setActiveNote(null);
    };

    const togglePin = (id: string) => {
        setNotes(prev => prev.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n));
    };

    const insertSticker = (sticker: string) => {
        if (!activeNote) return;
        updateNote("content", activeNote.content + sticker);
        setShowStickerPicker(false);
    };

    const courses = [...new Set(notes.map(n => n.courseId))];
    const filtered = notes
        .filter(n => filterCourse === "all" || n.courseId === filterCourse)
        .filter(n => !searchQuery || n.title.includes(searchQuery) || n.content.includes(searchQuery))
        .sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0) || b.updatedAt - a.updatedAt);

    const timeAgo = (ts: number) => {
        const d = Date.now() - ts;
        if (d < 60000) return "방금 전";
        if (d < 3600000) return `${Math.floor(d / 60000)}분 전`;
        if (d < 86400000) return `${Math.floor(d / 3600000)}시간 전`;
        return `${Math.floor(d / 86400000)}일 전`;
    };

    if (!isOpen) return null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,0.3)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center" }}
            onClick={onClose}
        >
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
                onClick={e => e.stopPropagation()}
                style={{
                    width: "90%", maxWidth: 960, height: "80vh", background: "#fff", borderRadius: 20,
                    boxShadow: "0 24px 80px rgba(0,0,0,0.15)", display: "flex", overflow: "hidden",
                }}
            >
                {/* Left: Note list */}
                <div style={{ width: 300, borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", background: "#f8fafc" }}>
                    <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid #e2e8f0" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                            <h3 style={{ fontSize: 16, fontWeight: 800, color: "#1e293b", margin: 0 }}>📝 학습 노트</h3>
                            <button onClick={createNote} style={{
                                padding: "6px 14px", borderRadius: 8, border: "none", background: "#2563eb", color: "#fff",
                                fontSize: 12, fontWeight: 700, cursor: "pointer",
                            }}>+ 새 노트</button>
                        </div>
                        <input placeholder="🔍 노트 검색..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                            style={{
                                width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
                                fontSize: 12, outline: "none", background: "#fff",
                            }}
                        />
                        {courses.length > 0 && (
                            <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
                                <button onClick={() => setFilterCourse("all")}
                                    style={{ padding: "3px 10px", borderRadius: 12, border: "none", fontSize: 10, fontWeight: 600, cursor: "pointer", background: filterCourse === "all" ? "#2563eb" : "#e2e8f0", color: filterCourse === "all" ? "#fff" : "#64748b" }}>전체</button>
                                {courses.map(c => (
                                    <button key={c} onClick={() => setFilterCourse(c)}
                                        style={{ padding: "3px 10px", borderRadius: 12, border: "none", fontSize: 10, fontWeight: 600, cursor: "pointer", background: filterCourse === c ? "#2563eb" : "#e2e8f0", color: filterCourse === c ? "#fff" : "#64748b" }}>{c}</button>
                                ))}
                            </div>
                        )}
                    </div>
                    <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
                        {filtered.length === 0 ? (
                            <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
                                <div style={{ fontSize: 32, marginBottom: 8 }}>📝</div>
                                <div style={{ fontSize: 12 }}>노트를 작성해보세요!</div>
                            </div>
                        ) : filtered.map(note => (
                            <motion.div key={note.id}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setActiveNote(note)}
                                style={{
                                    padding: "12px 14px", background: activeNote?.id === note.id ? "#eff6ff" : note.color,
                                    borderRadius: 12, marginBottom: 6, cursor: "pointer",
                                    border: activeNote?.id === note.id ? "2px solid #2563eb" : "1px solid #e2e8f0",
                                    transition: "all 0.2s",
                                }}
                            >
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ fontSize: 16 }}>{note.emoji}</span>
                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {note.title || "제목 없음"}
                                    </span>
                                    {note.pinned && <span style={{ fontSize: 12 }}>📌</span>}
                                </div>
                                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                    {note.content.substring(0, 60) || "내용을 입력하세요..."}
                                </div>
                                <div style={{ fontSize: 9, color: "#cbd5e1", marginTop: 4 }}>{timeAgo(note.updatedAt)}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right: Editor */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    {activeNote ? (
                        <>
                            {/* Toolbar */}
                            <div style={{ padding: "12px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 8, background: "#fafbfc" }}>
                                <button onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    style={{ fontSize: 20, background: "transparent", border: "none", cursor: "pointer", padding: 4, borderRadius: 6, position: "relative" }}>
                                    {activeNote.emoji}
                                </button>
                                {showEmojiPicker && (
                                    <div style={{ position: "absolute", top: 48, left: 20, background: "#fff", border: "1px solid #e2e8f0", borderRadius: 12, padding: 12, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4, boxShadow: "0 8px 24px rgba(0,0,0,0.1)", zIndex: 10 }}>
                                        {EMOJIS.map(e => (
                                            <button key={e} onClick={() => { updateNote("emoji", e); setShowEmojiPicker(false); }}
                                                style={{ fontSize: 20, background: "transparent", border: "none", cursor: "pointer", padding: 6, borderRadius: 6 }}
                                                onMouseEnter={ev => { ev.currentTarget.style.background = "#eff6ff"; }}
                                                onMouseLeave={ev => { ev.currentTarget.style.background = "transparent"; }}
                                            >{e}</button>
                                        ))}
                                    </div>
                                )}
                                <div style={{ flex: 1 }} />
                                {/* Color picker */}
                                {COLORS.map(c => (
                                    <button key={c} onClick={() => updateNote("color", c)}
                                        style={{
                                            width: 20, height: 20, borderRadius: "50%", border: activeNote.color === c ? "2px solid #2563eb" : "1px solid #e2e8f0",
                                            background: c, cursor: "pointer",
                                        }} />
                                ))}
                                <div style={{ width: 1, height: 20, background: "#e2e8f0", margin: "0 4px" }} />
                                <button onClick={() => setShowStickerPicker(!showStickerPicker)}
                                    style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", fontSize: 11, cursor: "pointer", fontWeight: 600 }}>🎨 스티커</button>
                                <button onClick={() => togglePin(activeNote.id)}
                                    style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #e2e8f0", background: activeNote.pinned ? "#fef3c7" : "#fff", fontSize: 11, cursor: "pointer" }}>
                                    {activeNote.pinned ? "📌 고정됨" : "📌 고정"}
                                </button>
                                <button onClick={() => deleteNote(activeNote.id)}
                                    style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #fecaca", background: "#fff", color: "#ef4444", fontSize: 11, cursor: "pointer" }}>🗑️</button>
                                <button onClick={onClose}
                                    style={{ padding: "4px 10px", borderRadius: 6, border: "1px solid #e2e8f0", background: "#fff", fontSize: 14, cursor: "pointer", marginLeft: 4 }}>✕</button>
                            </div>

                            {/* Sticker picker */}
                            <AnimatePresence>
                                {showStickerPicker && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        style={{ borderBottom: "1px solid #e2e8f0", padding: "8px 20px", background: "#fafbfc", overflow: "hidden" }}>
                                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                            {STICKERS.map(s => (
                                                <button key={s} onClick={() => insertSticker(s)}
                                                    style={{ fontSize: 20, padding: 6, borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer" }}
                                                    onMouseEnter={ev => { ev.currentTarget.style.background = "#eff6ff"; ev.currentTarget.style.transform = "scale(1.2)"; }}
                                                    onMouseLeave={ev => { ev.currentTarget.style.background = "#fff"; ev.currentTarget.style.transform = "scale(1)"; }}
                                                >{s}</button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Title input */}
                            <input value={activeNote.title} onChange={e => updateNote("title", e.target.value)}
                                placeholder="노트 제목을 입력하세요..." maxLength={100}
                                style={{
                                    padding: "16px 24px 8px", fontSize: 22, fontWeight: 800, border: "none", outline: "none",
                                    color: "#1e293b", background: "transparent",
                                }} />

                            {/* Content editor */}
                            <textarea value={activeNote.content} onChange={e => updateNote("content", e.target.value)}
                                placeholder="학습 내용을 자유롭게 기록하세요... 📝&#10;&#10;💡 코드 메모, 핵심 개념 정리, 오답 노트 등&#10;🎨 스티커와 이모지로 꾸며보세요!"
                                style={{
                                    flex: 1, padding: "8px 24px 24px", fontSize: 14, lineHeight: 1.8, border: "none", outline: "none",
                                    color: "#334155", background: "transparent", resize: "none", fontFamily: "'Pretendard', system-ui, sans-serif",
                                }} />

                            {/* Footer */}
                            <div style={{
                                padding: "10px 24px", borderTop: "1px solid #e2e8f0", background: "#fafbfc",
                                display: "flex", justifyContent: "space-between", fontSize: 10, color: "#94a3b8",
                            }}>
                                <span>과목: {activeNote.courseId} | {activeNote.content.length}자</span>
                                <span>자동 저장됨 ✓</span>
                            </div>
                        </>
                    ) : (
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>📝</div>
                            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>노트를 선택하거나 새로 만드세요</div>
                            <div style={{ fontSize: 12 }}>학습 내용을 기록하고 꾸며보세요!</div>
                            <button onClick={createNote} style={{
                                marginTop: 20, padding: "10px 24px", borderRadius: 10, border: "none",
                                background: "#2563eb", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer",
                            }}>✨ 새 노트 만들기</button>
                            <button onClick={onClose} style={{
                                marginTop: 10, padding: "8px 20px", borderRadius: 8, border: "1px solid #e2e8f0",
                                background: "#fff", fontSize: 12, cursor: "pointer", color: "#64748b",
                            }}>닫기</button>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
