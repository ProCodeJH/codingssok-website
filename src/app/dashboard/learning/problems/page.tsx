"use client";
import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PROBLEM_SETS, DIFFICULTY_COLORS, SOURCE_INFO, getTotalProblemCount } from "@/data/problems/external-problems";
import type { ExternalProblem } from "@/data/problems/external-problems";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)",
    borderRadius: 20, border: "1px solid rgba(226,232,240,0.5)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
};

const STORAGE_KEY = "codingssok_solved_problems";

function loadSolved(): Set<string> {
    if (typeof window === "undefined") return new Set();
    try { const raw = localStorage.getItem(STORAGE_KEY); return raw ? new Set(JSON.parse(raw)) : new Set(); } catch { return new Set(); }
}

function saveSolved(solved: Set<string>) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...solved]));
}

export default function ProblemBrowserPage() {
    const [activeSet, setActiveSet] = useState<string | null>(null);
    const [sourceFilter, setSourceFilter] = useState<string>("all");
    const [diffFilter, setDiffFilter] = useState<string>("all");
    const [search, setSearch] = useState("");
    const [solved, setSolved] = useState<Set<string>>(() => loadSolved());
    const [showSolvedOnly, setShowSolvedOnly] = useState(false);
    const totalCount = getTotalProblemCount();

    const toggleSolved = useCallback((id: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setSolved(prev => {
            const next = new Set(prev);
            if (next.has(id)) next.delete(id); else next.add(id);
            saveSolved(next);
            return next;
        });
    }, []);

    const currentSet = useMemo(() => activeSet ? PROBLEM_SETS.find(s => s.id === activeSet) : null, [activeSet]);

    const filteredProblems = useMemo(() => {
        let probs: ExternalProblem[] = currentSet?.problems ?? PROBLEM_SETS.flatMap(s => s.problems);
        if (sourceFilter !== "all") probs = probs.filter(p => p.source === sourceFilter);
        if (diffFilter !== "all") probs = probs.filter(p => p.difficulty === diffFilter);
        if (showSolvedOnly) probs = probs.filter(p => solved.has(p.id));
        if (search.trim()) {
            const q = search.toLowerCase();
            probs = probs.filter(p => p.title.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.category.includes(q));
        }
        return probs;
    }, [currentSet, sourceFilter, diffFilter, search, showSolvedOnly, solved]);

    const solvedInSet = currentSet
        ? currentSet.problems.filter(p => solved.has(p.id)).length
        : solved.size;
    const totalInSet = currentSet ? currentSet.problems.length : totalCount;
    const progressPct = totalInSet > 0 ? Math.round((solvedInSet / totalInSet) * 100) : 0;

    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
            {/* Header */}
            <div style={{ marginBottom: 20 }}>
                <Link href="/dashboard/learning" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>← 학습</Link>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", marginTop: 8, letterSpacing: -0.5 }}>
                    문제 은행
                </h1>
                <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
                    백준 · KOI Study · 프로그래머스 · 코드업에서 엄선한 <strong>{totalCount}개</strong> 문제
                </p>
            </div>

            {/* Progress Bar */}
            <div style={{ ...glassCard, padding: "14px 20px", marginBottom: 20 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>
                        진행률 {currentSet ? `(${currentSet.title})` : ""}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#3b82f6" }}>
                        {solvedInSet}/{totalInSet} ({progressPct}%)
                    </span>
                </div>
                <div style={{ height: 8, borderRadius: 4, background: "#f1f5f9", overflow: "hidden" }}>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPct}%` }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        style={{ height: "100%", borderRadius: 4, background: "linear-gradient(90deg, #3b82f6, #2563eb)" }}
                    />
                </div>
            </div>

            {/* Category Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8, marginBottom: 20 }}>
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveSet(null)}
                    style={{
                        ...glassCard, padding: "12px 14px", border: activeSet === null ? "2px solid #3b82f6" : "1px solid rgba(226,232,240,0.5)",
                        cursor: "pointer", textAlign: "left",
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#3b82f6" }}>grid_view</span>
                        <div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>전체</div>
                            <div style={{ fontSize: 9, color: "#94a3b8" }}>{solved.size}/{totalCount}</div>
                        </div>
                    </div>
                </motion.button>
                {PROBLEM_SETS.map(set => {
                    const setSolved = set.problems.filter(p => solved.has(p.id)).length;
                    return (
                        <motion.button key={set.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                            onClick={() => setActiveSet(set.id)}
                            style={{
                                ...glassCard, padding: "12px 14px",
                                border: activeSet === set.id ? `2px solid ${set.color}` : "1px solid rgba(226,232,240,0.5)",
                                cursor: "pointer", textAlign: "left",
                            }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 18, color: set.color }}>{set.icon}</span>
                                <div>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>{set.title}</div>
                                    <div style={{ fontSize: 9, color: "#94a3b8" }}>{setSolved}/{set.problems.length}</div>
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>

            {/* Filters */}
            <div style={{ ...glassCard, padding: "10px 14px", marginBottom: 16, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="문제 검색..."
                    style={{ padding: "7px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12, outline: "none", flex: "1 1 180px", minWidth: 140 }}
                />
                <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    {["all", "baekjoon", "programmers", "koistudy", "codeup"].map(s => (
                        <button key={s} onClick={() => setSourceFilter(s)} style={{
                            padding: "5px 10px", borderRadius: 7, border: "none", cursor: "pointer",
                            background: sourceFilter === s ? (s === "all" ? "#3b82f6" : SOURCE_INFO[s]?.color || "#3b82f6") : "#f1f5f9",
                            color: sourceFilter === s ? "#fff" : "#64748b", fontSize: 10, fontWeight: 600,
                        }}>{s === "all" ? "전체" : SOURCE_INFO[s]?.label || s}</button>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 3 }}>
                    {["all", "bronze", "silver", "gold", "platinum"].map(d => (
                        <button key={d} onClick={() => setDiffFilter(d)} style={{
                            padding: "5px 8px", borderRadius: 7, border: "none", cursor: "pointer",
                            background: diffFilter === d ? (d === "all" ? "#3b82f6" : DIFFICULTY_COLORS[d]?.text || "#3b82f6") : "#f1f5f9",
                            color: diffFilter === d ? "#fff" : "#64748b", fontSize: 10, fontWeight: 600,
                        }}>{d === "all" ? "전체" : DIFFICULTY_COLORS[d]?.label || d}</button>
                    ))}
                </div>
                <button onClick={() => setShowSolvedOnly(!showSolvedOnly)} style={{
                    padding: "5px 10px", borderRadius: 7, border: "none", cursor: "pointer",
                    background: showSolvedOnly ? "#22c55e" : "#f1f5f9",
                    color: showSolvedOnly ? "#fff" : "#64748b", fontSize: 10, fontWeight: 600,
                }}>{showSolvedOnly ? "풀이 완료만" : "전체 보기"}</button>
            </div>

            {/* Results Count */}
            <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 10 }}>
                {filteredProblems.length}개 문제 {currentSet ? `(${currentSet.title})` : ""}
            </div>

            {/* Problem List */}
            <AnimatePresence mode="popLayout">
                <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {filteredProblems.map((p, i) => {
                        const diff = DIFFICULTY_COLORS[p.difficulty];
                        const src = SOURCE_INFO[p.source];
                        const isSolved = solved.has(p.id);
                        return (
                            <motion.div
                                key={p.id}
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: Math.min(i * 0.015, 0.3), duration: 0.2 }}
                                style={{
                                    ...glassCard, padding: "12px 16px",
                                    display: "flex", alignItems: "center", gap: 12,
                                    borderLeft: isSolved ? "3px solid #22c55e" : "3px solid transparent",
                                    opacity: isSolved ? 0.7 : 1,
                                }}
                            >
                                {/* Solve Checkbox */}
                                <motion.button
                                    whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }}
                                    onClick={(e) => toggleSolved(p.id, e)}
                                    style={{
                                        width: 22, height: 22, borderRadius: 6,
                                        border: isSolved ? "none" : "2px solid #cbd5e1",
                                        background: isSolved ? "#22c55e" : "transparent",
                                        cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                                        flexShrink: 0,
                                    }}
                                >
                                    {isSolved && <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#fff" }}>check</span>}
                                </motion.button>

                                {/* Source Badge */}
                                <span style={{
                                    fontSize: 8, padding: "2px 6px", borderRadius: 5, fontWeight: 700,
                                    background: `${src.color}15`, color: src.color, whiteSpace: "nowrap",
                                }}>{src.label}</span>

                                {/* Title & Tags */}
                                <a href={p.url} target="_blank" rel="noopener noreferrer"
                                    style={{ flex: 1, minWidth: 0, textDecoration: isSolved ? "line-through" : "none", textDecorationColor: "#94a3b8" }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: isSolved ? "#94a3b8" : "#0f172a" }}>{p.title}</div>
                                    <div style={{ display: "flex", gap: 3, marginTop: 2, flexWrap: "wrap" }}>
                                        {p.tags.slice(0, 3).map(t => (
                                            <span key={t} style={{ fontSize: 8, padding: "1px 5px", borderRadius: 4, background: "#f1f5f9", color: "#64748b" }}>{t}</span>
                                        ))}
                                    </div>
                                </a>

                                {/* Category */}
                                <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 600, whiteSpace: "nowrap", display: "none" }} className="sm:!inline">{p.category}</span>

                                {/* Difficulty */}
                                <span style={{
                                    fontSize: 8, padding: "2px 8px", borderRadius: 5, fontWeight: 700,
                                    background: diff.bg, color: diff.text, whiteSpace: "nowrap",
                                }}>{diff.label}</span>

                                {/* External Link */}
                                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ flexShrink: 0 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#cbd5e1" }}>open_in_new</span>
                                </a>
                            </motion.div>
                        );
                    })}
                </div>
            </AnimatePresence>

            {filteredProblems.length === 0 && (
                <div style={{ ...glassCard, padding: 48, textAlign: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 48, color: "#cbd5e1" }}>search_off</span>
                    <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 12 }}>검색 결과가 없습니다</p>
                </div>
            )}
        </div>
    );
}
