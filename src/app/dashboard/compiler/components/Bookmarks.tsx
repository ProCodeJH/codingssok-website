"use client";
import { useState, useEffect, useCallback } from "react";

interface Bookmark {
    id: string; line: number; text: string; color: string; timestamp: number;
}

const BOOKMARK_COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];
const STORAGE_KEY = "codingssok-bookmarks";

const loadBookmarks = (): Bookmark[] => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
};
const saveBookmarks = (bm: Bookmark[]) => { if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(bm)); };

interface Props { code: string; onJumpToLine?: (line: number) => void }

export function Bookmarks({ code, onJumpToLine }: Props) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(loadBookmarks);
    const [addLine, setAddLine] = useState("");
    const [colorIdx, setColorIdx] = useState(0);

    useEffect(() => { saveBookmarks(bookmarks); }, [bookmarks]);

    const lines = code.split("\n");

    const addBookmark = useCallback(() => {
        const lineNum = parseInt(addLine);
        if (isNaN(lineNum) || lineNum < 1 || lineNum > lines.length) return;
        if (bookmarks.some(b => b.line === lineNum)) return;
        const text = lines[lineNum - 1]?.trim() || "";
        const newBm: Bookmark = { id: `bm-${Date.now()}`, line: lineNum, text, color: BOOKMARK_COLORS[colorIdx % BOOKMARK_COLORS.length], timestamp: Date.now() };
        setBookmarks(prev => [...prev, newBm].sort((a, b) => a.line - b.line));
        setColorIdx(i => (i + 1) % BOOKMARK_COLORS.length);
        setAddLine("");
    }, [addLine, lines, bookmarks, colorIdx]);

    const removeBookmark = (id: string) => { setBookmarks(prev => prev.filter(b => b.id !== id)); };
    const clearAll = () => setBookmarks([]);

    const border = "rgba(255,255,255,0.06)";

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${border}`, background: "rgba(59,130,246,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>🔖 북마크</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{bookmarks.length}개</span>
                </div>
            </div>

            {/* Add bookmark */}
            <div style={{ padding: "8px 12px", borderBottom: `1px solid ${border}`, display: "flex", gap: 6 }}>
                <input type="number" min={1} max={lines.length} value={addLine} onChange={e => setAddLine(e.target.value)} placeholder={`라인 (1-${lines.length})`} onKeyDown={e => e.key === "Enter" && addBookmark()} style={{ flex: 1, padding: "6px 10px", borderRadius: 6, border: `1px solid ${border}`, background: "rgba(0,0,0,0.15)", color: "#ccc", fontSize: 11, outline: "none" }} />
                <button onClick={addBookmark} style={{ padding: "6px 12px", borderRadius: 6, border: "none", background: "#3b82f6", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>+ 추가</button>
            </div>

            {/* Bookmark list */}
            <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
                {bookmarks.length === 0 ? (
                    <div style={{ textAlign: "center", padding: 24, color: "rgba(255,255,255,0.2)", fontSize: 12 }}>
                        <div style={{ fontSize: 24, marginBottom: 8 }}>🔖</div>
                        라인 번호를 입력하여<br />북마크를 추가하세요
                    </div>
                ) : (
                    bookmarks.map(bm => (
                        <div key={bm.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: "rgba(0,0,0,0.08)", borderRadius: 8, marginBottom: 4, borderLeft: `3px solid ${bm.color}` }}>
                            <div style={{ flex: 1, cursor: onJumpToLine ? "pointer" : "default" }} onClick={() => onJumpToLine?.(bm.line)}>
                                <div style={{ fontSize: 10, color: bm.color, fontWeight: 600 }}>Line {bm.line}</div>
                                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 200 }}>{bm.text || "(빈 줄)"}</div>
                            </div>
                            <button onClick={() => removeBookmark(bm.id)} style={{ background: "transparent", border: "none", color: "rgba(255,255,255,0.2)", fontSize: 12, cursor: "pointer", padding: 4 }}>✕</button>
                        </div>
                    ))
                )}
            </div>

            {/* Footer */}
            {bookmarks.length > 0 && (
                <div style={{ padding: 8, borderTop: `1px solid ${border}` }}>
                    <button onClick={clearAll} style={{ width: "100%", padding: 8, borderRadius: 6, border: `1px solid ${border}`, background: "transparent", color: "rgba(255,255,255,0.3)", fontSize: 10, cursor: "pointer" }}>🗑️ 전체 삭제</button>
                </div>
            )}
        </div>
    );
}
