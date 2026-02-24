"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useWrongAnswers, WrongAnswer } from "@/hooks/useWrongAnswers";

/* ══════════════════════════════════════════════
   오답 노트 — 복습 페이지
   /dashboard/learning/review
   ══════════════════════════════════════════════ */

const FILTERS = ["all", "unmastered", "mastered"] as const;
type Filter = typeof FILTERS[number];
const FILTER_LABELS: Record<Filter, string> = { all: "전체", unmastered: "미완료", mastered: "완료" };

export default function ReviewPage() {
    const { items, markReviewed, markMastered, removeItem } = useWrongAnswers();
    const [filter, setFilter] = useState<Filter>("unmastered");
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showAnswer, setShowAnswer] = useState<Record<string, boolean>>({});

    const filtered = useMemo(() => {
        if (filter === "mastered") return items.filter(w => w.mastered);
        if (filter === "unmastered") return items.filter(w => !w.mastered);
        return items;
    }, [items, filter]);

    const stats = useMemo(() => ({
        total: items.length,
        mastered: items.filter(w => w.mastered).length,
        remaining: items.filter(w => !w.mastered).length,
    }), [items]);

    if (items.length === 0) {
        return (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: 16 }}>
                <span style={{ fontSize: 72, opacity: 0.3 }}>🎉</span>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#334155" }}>오답이 없습니다!</h2>
                <p style={{ fontSize: 14, color: "#94a3b8" }}>퀴즈에서 틀린 문제가 자동으로 수집됩니다.</p>
                <Link href="/dashboard/learning" style={{ color: "#4F46E5", fontWeight: 600, fontSize: 14, marginTop: 8 }}>
                    ← 학습으로 돌아가기
                </Link>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "32px 20px" }}>
            {/* ── Header ── */}
            <div style={{ marginBottom: 32 }}>
                <Link href="/dashboard/learning" style={{ fontSize: 13, color: "#94a3b8", fontWeight: 500, textDecoration: "none" }}>
                    ← 학습 대시보드
                </Link>
                <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1e1b4b", marginTop: 12, letterSpacing: "-0.03em" }}>
                    📒 오답 노트
                </h1>
                <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>
                    틀린 문제를 복습하고 완전히 이해하세요.
                </p>
            </div>

            {/* ── Stats Bar ── */}
            <div style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24,
            }}>
                {[
                    { label: "전체", value: stats.total, color: "#4F46E5", bg: "#EEF2FF" },
                    { label: "복습 필요", value: stats.remaining, color: "#F59E0B", bg: "#FFFBEB" },
                    { label: "완료", value: stats.mastered, color: "#34D399", bg: "#ECFDF5" },
                ].map(s => (
                    <div key={s.label} style={{
                        background: s.bg, borderRadius: 12, padding: "16px 20px", textAlign: "center",
                    }}>
                        <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* ── Filter Tabs ── */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {FILTERS.map(f => (
                    <button key={f} onClick={() => setFilter(f)} style={{
                        padding: "6px 16px", borderRadius: 20, border: "none", cursor: "pointer",
                        background: filter === f ? "#4F46E5" : "#f1f5f9",
                        color: filter === f ? "#fff" : "#64748b",
                        fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                    }}>
                        {FILTER_LABELS[f]}
                    </button>
                ))}
            </div>

            {/* ── Wrong Answer Cards ── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <AnimatePresence mode="popLayout">
                    {filtered.map(w => (
                        <motion.div
                            key={w.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                background: "#fff", borderRadius: 16, overflow: "hidden",
                                border: `1px solid ${w.mastered ? "#d1fae5" : "#e2e8f0"}`,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                            }}
                        >
                            {/* Card Header */}
                            <div
                                onClick={() => setExpandedId(expandedId === w.id ? null : w.id)}
                                style={{
                                    padding: "16px 20px", cursor: "pointer",
                                    display: "flex", alignItems: "center", gap: 12,
                                }}
                            >
                                <span style={{
                                    width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                                    background: w.mastered ? "#ecfdf5" : "#fef3c7", fontSize: 18,
                                }}>
                                    {w.mastered ? "✅" : "📝"}
                                </span>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#1e1b4b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {w.question}
                                    </div>
                                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                                        {w.unitTitle} · {w.pageTitle} · 복습 {w.reviewCount}회
                                    </div>
                                </div>
                                <span style={{ fontSize: 14, color: "#94a3b8", transform: expandedId === w.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                                    ▼
                                </span>
                            </div>

                            {/* Expanded Content */}
                            <AnimatePresence>
                                {expandedId === w.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.25 }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div style={{ padding: "0 20px 16px", borderTop: "1px solid #f1f5f9" }}>
                                            {/* Options */}
                                            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
                                                {w.options.map((opt, idx) => {
                                                    const isCorrect = idx === w.correctAnswer;
                                                    const isUserWrong = idx === w.userAnswer;
                                                    const revealed = showAnswer[w.id];
                                                    return (
                                                        <div key={idx} style={{
                                                            padding: "10px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                                                            background: revealed && isCorrect ? "#ecfdf5" : revealed && isUserWrong ? "#fef2f2" : "#f8fafc",
                                                            border: `1px solid ${revealed && isCorrect ? "#34d399" : revealed && isUserWrong ? "#fca5a5" : "#e2e8f0"}`,
                                                            color: revealed && isCorrect ? "#059669" : revealed && isUserWrong ? "#dc2626" : "#475569",
                                                        }}>
                                                            {String.fromCharCode(65 + idx)}. {opt}
                                                            {revealed && isCorrect && " ✓"}
                                                            {revealed && isUserWrong && " ✗ (내 답)"}
                                                        </div>
                                                    );
                                                })}
                                            </div>

                                            {/* Actions */}
                                            <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                                                {!showAnswer[w.id] ? (
                                                    <button onClick={() => { setShowAnswer(p => ({ ...p, [w.id]: true })); markReviewed(w.id); }}
                                                        style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "#4F46E5", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                                                        💡 정답 보기
                                                    </button>
                                                ) : (
                                                    <>
                                                        {!w.mastered && (
                                                            <button onClick={() => markMastered(w.id)}
                                                                style={{ padding: "8px 16px", borderRadius: 10, border: "none", background: "#34D399", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                                                                ✅ 이해 완료
                                                            </button>
                                                        )}
                                                        <button onClick={() => removeItem(w.id)}
                                                            style={{ padding: "8px 16px", borderRadius: 10, border: "1px solid #fca5a5", background: "#fff", color: "#dc2626", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>
                                                            🗑 삭제
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                    <span style={{ fontSize: 48, opacity: 0.3 }}>{filter === "mastered" ? "📭" : "🎉"}</span>
                    <p style={{ fontSize: 14, color: "#94a3b8", marginTop: 12 }}>
                        {filter === "mastered" ? "아직 완료한 문제가 없습니다." : "복습할 문제가 없습니다!"}
                    </p>
                </div>
            )}
        </div>
    );
}
