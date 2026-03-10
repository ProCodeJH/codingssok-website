"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PROBLEM_SETS, DIFFICULTY_COLORS, SOURCE_INFO, getTotalProblemCount } from "@/data/problems/external-problems";
import type { ExternalProblem } from "@/data/problems/external-problems";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)",
    borderRadius: 20, border: "1px solid rgba(226,232,240,0.5)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
};

export default function ProblemBrowserPage() {
    const [activeSet, setActiveSet] = useState<string | null>(null);
    const [sourceFilter, setSourceFilter] = useState<string>("all");
    const [diffFilter, setDiffFilter] = useState<string>("all");
    const [search, setSearch] = useState("");
    const totalCount = getTotalProblemCount();

    const currentSet = useMemo(() => activeSet ? PROBLEM_SETS.find(s => s.id === activeSet) : null, [activeSet]);

    const filteredProblems = useMemo(() => {
        let probs: ExternalProblem[] = currentSet?.problems ?? PROBLEM_SETS.flatMap(s => s.problems);
        if (sourceFilter !== "all") probs = probs.filter(p => p.source === sourceFilter);
        if (diffFilter !== "all") probs = probs.filter(p => p.difficulty === diffFilter);
        if (search.trim()) {
            const q = search.toLowerCase();
            probs = probs.filter(p => p.title.toLowerCase().includes(q) || p.tags.some(t => t.includes(q)) || p.category.includes(q));
        }
        return probs;
    }, [currentSet, sourceFilter, diffFilter, search]);

    return (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
            {/* Header */}
            <div style={{ marginBottom: 28 }}>
                <Link href="/dashboard/learning" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>← 학습</Link>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: "#0f172a", marginTop: 8, letterSpacing: -0.5 }}>
                    문제 은행
                </h1>
                <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
                    백준 · KOI Study · 프로그래머스 · 코드업에서 엄선한 <strong>{totalCount}개</strong> 문제
                </p>
            </div>

            {/* Category Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 10, marginBottom: 24 }}>
                <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                    onClick={() => setActiveSet(null)}
                    style={{
                        ...glassCard, padding: "14px 16px", border: activeSet === null ? "2px solid #6366f1" : "1px solid rgba(226,232,240,0.5)",
                        cursor: "pointer", textAlign: "left",
                    }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#6366f1" }}>grid_view</span>
                        <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>전체</div>
                            <div style={{ fontSize: 10, color: "#94a3b8" }}>{totalCount}문제</div>
                        </div>
                    </div>
                </motion.button>
                {PROBLEM_SETS.map(set => (
                    <motion.button key={set.id} whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                        onClick={() => setActiveSet(set.id)}
                        style={{
                            ...glassCard, padding: "14px 16px",
                            border: activeSet === set.id ? `2px solid ${set.color}` : "1px solid rgba(226,232,240,0.5)",
                            cursor: "pointer", textAlign: "left",
                        }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 20, color: set.color }}>{set.icon}</span>
                            <div>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{set.title}</div>
                                <div style={{ fontSize: 10, color: "#94a3b8" }}>{set.problems.length}문제</div>
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Filters */}
            <div style={{ ...glassCard, padding: "12px 16px", marginBottom: 20, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                <input
                    value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="문제 검색..."
                    style={{
                        padding: "8px 14px", borderRadius: 10, border: "1px solid #e2e8f0",
                        fontSize: 13, outline: "none", flex: "1 1 200px", minWidth: 150,
                    }}
                />
                <div style={{ display: "flex", gap: 4 }}>
                    {["all", "baekjoon", "programmers", "koistudy", "codeup"].map(s => (
                        <button key={s} onClick={() => setSourceFilter(s)} style={{
                            padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                            background: sourceFilter === s ? (s === "all" ? "#6366f1" : SOURCE_INFO[s]?.color || "#6366f1") : "#f1f5f9",
                            color: sourceFilter === s ? "#fff" : "#64748b",
                            fontSize: 11, fontWeight: 600, transition: "all 0.15s",
                        }}>
                            {s === "all" ? "전체" : SOURCE_INFO[s]?.label || s}
                        </button>
                    ))}
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                    {["all", "bronze", "silver", "gold", "platinum"].map(d => (
                        <button key={d} onClick={() => setDiffFilter(d)} style={{
                            padding: "6px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                            background: diffFilter === d ? (d === "all" ? "#6366f1" : DIFFICULTY_COLORS[d]?.text || "#6366f1") : "#f1f5f9",
                            color: diffFilter === d ? "#fff" : "#64748b",
                            fontSize: 11, fontWeight: 600, transition: "all 0.15s",
                        }}>
                            {d === "all" ? "전체" : DIFFICULTY_COLORS[d]?.label || d}
                        </button>
                    ))}
                </div>
            </div>

            {/* Results Count */}
            <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginBottom: 12 }}>
                {filteredProblems.length}개 문제 {currentSet ? `(${currentSet.title})` : ""}
            </div>

            {/* Problem List */}
            <AnimatePresence mode="popLayout">
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {filteredProblems.map((p, i) => {
                        const diff = DIFFICULTY_COLORS[p.difficulty];
                        const src = SOURCE_INFO[p.source];
                        return (
                            <motion.a
                                key={p.id}
                                href={p.url} target="_blank" rel="noopener noreferrer"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: i * 0.02, duration: 0.2 }}
                                style={{
                                    ...glassCard, padding: "14px 18px", textDecoration: "none",
                                    display: "flex", alignItems: "center", gap: 14, cursor: "pointer",
                                }}
                                whileHover={{ x: 4, boxShadow: "0 6px 24px rgba(0,0,0,0.08)" }}
                            >
                                {/* Number */}
                                <span style={{
                                    fontSize: 11, fontWeight: 700, color: "#94a3b8", minWidth: 28, textAlign: "center",
                                    fontFamily: "'JetBrains Mono', monospace",
                                }}>{i + 1}</span>

                                {/* Source Badge */}
                                <span style={{
                                    fontSize: 9, padding: "3px 8px", borderRadius: 6, fontWeight: 700,
                                    background: `${src.color}15`, color: src.color, whiteSpace: "nowrap",
                                }}>{src.label}</span>

                                {/* Title & Tags */}
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{p.title}</div>
                                    <div style={{ display: "flex", gap: 4, marginTop: 3, flexWrap: "wrap" }}>
                                        {p.tags.slice(0, 3).map(t => (
                                            <span key={t} style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: "#f1f5f9", color: "#64748b" }}>{t}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Category */}
                                <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, whiteSpace: "nowrap" }}>{p.category}</span>

                                {/* Difficulty Badge */}
                                <span style={{
                                    fontSize: 9, padding: "3px 10px", borderRadius: 6, fontWeight: 700,
                                    background: diff.bg, color: diff.text, whiteSpace: "nowrap",
                                }}>{diff.label}</span>

                                {/* External Link Icon */}
                                <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#cbd5e1" }}>open_in_new</span>
                            </motion.a>
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
