"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { TIERS, getTierInfo, getDisplayTier, getPlacementTier, checkPromotion, getNextTier } from "@/lib/xp-engine";
import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Shared Styles ── */
const glassPanel: React.CSSProperties = {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)",
};

export default function TierPage() {
    const { user } = useAuth();
    const { progress } = useUserProgress();
    const supabase = useMemo(() => createClient(), []);

    const [examQuestions, setExamQuestions] = useState<any[]>([]);
    const [examMode, setExamMode] = useState<"none" | "placement" | "promotion">("none");
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState<{ score: number; total: number; tier?: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);
    const [currentQ, setCurrentQ] = useState(0);

    /* Timer State */
    const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes
    const hrs = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
    const min = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
    const sec = String(timeLeft % 60).padStart(2, "0");

    /* Tier Info */
    const currentTier = getDisplayTier(progress?.tier || "Iron", progress?.level || 1, progress?.placement_done);
    const nextTier = getNextTier(progress?.tier || "Iron");
    const canPlacement = (progress?.level || 1) >= 30 && !progress?.placement_done;
    const canPromotion = progress?.placement_done && nextTier;
    const answered = Object.keys(answers).length;
    const total = examQuestions.length;

    /* Load tier history */
    useEffect(() => {
        if (!user) return;
        supabase.from("user_tier_history").select("*").eq("user_id", user.id)
            .order("created_at", { ascending: false }).limit(10)
            .then(({ data }) => { if (data) setHistory(data); });
    }, [user, supabase]);

    /* Exam timer */
    useEffect(() => {
        if (examMode === "none" || result) return;
        const id = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
        return () => clearInterval(id);
    }, [examMode, result]);

    const startExam = useCallback(async (type: "placement" | "promotion") => {
        setLoading(true);
        const tierName = type === "placement" ? "placement" : nextTier!;
        const { data } = await supabase.from("tier_exams").select("*").eq("tier_name", tierName).eq("exam_type", type).order("sort_order");
        if (data && data.length > 0) {
            setExamQuestions(data);
            setExamMode(type);
            setAnswers({});
            setResult(null);
            setCurrentQ(0);
            setTimeLeft(data.length * 90); // 90s per question
        }
        setLoading(false);
    }, [nextTier, supabase]);

    const submitExam = useCallback(async () => {
        if (!user) return;
        let score = 0;
        examQuestions.forEach((q, i) => { if (answers[i] === q.correct_answer) score++; });

        let newTier: string;
        if (examMode === "placement") {
            newTier = getPlacementTier(score, total);
        } else {
            newTier = checkPromotion(score, total) ? nextTier! : (progress?.tier || "Iron");
        }

        await supabase.from("user_tier_history").insert({
            user_id: user.id, from_tier: progress?.tier || "Iron", to_tier: newTier,
            exam_score: score, exam_total: total, change_type: examMode,
        });
        await supabase.from("user_progress").update({
            tier: newTier, placement_done: true,
        }).eq("user_id", user.id);

        setResult({ score, total, tier: newTier });
    }, [user, examQuestions, answers, examMode, total, nextTier, progress, supabase]);

    /* ───────────── V2: Exam Mode ───────────── */
    if (examMode !== "none" && !result) {
        const q = examQuestions[currentQ];
        const options: string[] = q ? (typeof q.options === "string" ? JSON.parse(q.options) : q.options) : [];
        const flagged: number[] = []; // for future use

        return (
            <div style={{ display: "flex", flexDirection: "column", gap: 0, height: "calc(100vh - 80px)" }}>
                {/* Top Progress Bar */}
                <div style={{ padding: "16px 24px", background: "rgba(255,255,255,0.8)", backdropFilter: "blur(12px)", borderBottom: "1px solid #e2e8f0" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 8 }}>
                        <div>
                            <h1 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" }}>
                                {examMode === "placement" ? "티어 배치고사" : `${getTierInfo(nextTier!).nameKo} 승급심사`}
                            </h1>
                            <p style={{ fontSize: 13, color: "#64748b", margin: "4px 0 0" }}>
                                {examMode === "placement" ? "결과에 따라 티어가 배정됩니다" : "70% 이상 정답 시 승급합니다"}
                            </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <span style={{ fontSize: 18, fontWeight: 800, color: "#1349ec" }}>
                                Q{currentQ + 1} <span style={{ color: "#94a3b8", fontWeight: 400, fontSize: 14 }}>/ {total}</span>
                            </span>
                        </div>
                    </div>
                    <div style={{ height: 6, width: "100%", background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{
                            height: "100%", borderRadius: 99, transition: "width 0.3s",
                            background: "linear-gradient(90deg, #1349ec, #6366f1)",
                            width: `${(answered / total) * 100}%`,
                            boxShadow: "0 0 10px rgba(19,73,236,0.4)",
                        }} />
                    </div>
                </div>

                {/* Main Split: Question + Answers */}
                <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
                    {/* Left: Question */}
                    <div style={{ flex: 1, padding: "32px 40px", overflowY: "auto", borderRight: "1px solid #f1f5f9" }}>
                        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                            <span style={{
                                padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 800, letterSpacing: "0.05em",
                                background: "rgba(19,73,236,0.1)", color: "#1349ec", border: "1px solid rgba(19,73,236,0.2)",
                                textTransform: "uppercase",
                            }}>
                                {examMode === "placement" ? "배치고사" : "승급심사"}
                            </span>
                        </div>
                        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", lineHeight: 1.5, marginBottom: 16 }}>
                            {q?.question}
                        </h3>
                        {q?.code_block && (
                            <div style={{
                                background: "#f8fafc", borderRadius: 16, border: "1px solid #e2e8f0",
                                padding: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 13,
                                overflowX: "auto", marginTop: 16, lineHeight: 1.7, color: "#334155",
                            }}>
                                <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{q.code_block}</pre>
                            </div>
                        )}
                    </div>

                    {/* Right: Answers */}
                    <div style={{ width: 420, display: "flex", flexDirection: "column", background: "rgba(248,250,252,0.5)", padding: "32px 28px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <h4 style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                답안 선택
                            </h4>
                            {/* Timer */}
                            <div style={{
                                display: "flex", alignItems: "center", gap: 6, padding: "6px 14px",
                                borderRadius: 99, background: "#f1f5f9", border: "1px solid #e2e8f0",
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#1349ec" }}>timer</span>
                                <span style={{ fontSize: 14, fontWeight: 700, fontFamily: "monospace", color: "#0f172a", fontVariantNumeric: "tabular-nums" }}>
                                    {hrs}:{min}:{sec}
                                </span>
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                            {options.map((opt: string, idx: number) => {
                                const selected = answers[currentQ] === opt;
                                return (
                                    <button key={idx} onClick={() => setAnswers(prev => ({ ...prev, [currentQ]: opt }))} style={{
                                        display: "flex", alignItems: "center", padding: "16px 18px", borderRadius: 16,
                                        border: `2px solid ${selected ? "#1349ec" : "#e2e8f0"}`,
                                        background: selected ? "rgba(19,73,236,0.05)" : "#fff",
                                        cursor: "pointer", transition: "all 0.2s", textAlign: "left",
                                    }}>
                                        <div style={{
                                            width: 24, height: 24, borderRadius: 99, flexShrink: 0, marginRight: 14,
                                            border: `2px solid ${selected ? "#1349ec" : "#cbd5e1"}`,
                                            background: selected ? "#1349ec" : "transparent",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            transition: "all 0.2s",
                                        }}>
                                            {selected && <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#fff" }}>check</span>}
                                        </div>
                                        <span style={{ fontSize: 15, fontWeight: selected ? 700 : 500, color: selected ? "#1349ec" : "#475569" }}>
                                            {opt}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Nav Footer */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, borderTop: "1px solid #e2e8f0", marginTop: 24 }}>
                            <button onClick={() => setCurrentQ(Math.max(0, currentQ - 1))} disabled={currentQ === 0} style={{
                                display: "flex", alignItems: "center", gap: 4, padding: "10px 16px", borderRadius: 12,
                                border: "none", background: currentQ > 0 ? "#f1f5f9" : "transparent", cursor: currentQ > 0 ? "pointer" : "default",
                                color: currentQ > 0 ? "#475569" : "#cbd5e1", fontSize: 14, fontWeight: 600,
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span> 이전
                            </button>

                            {currentQ < total - 1 ? (
                                <button onClick={() => setCurrentQ(currentQ + 1)} style={{
                                    display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 12,
                                    border: "none", fontSize: 15, fontWeight: 800, cursor: "pointer",
                                    background: "linear-gradient(135deg, #1349ec, #6366f1)", color: "#fff",
                                    boxShadow: "0 8px 20px rgba(19,73,236,0.3)", transition: "all 0.2s",
                                }}>
                                    다음 문제 <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                                </button>
                            ) : (
                                <button onClick={submitExam} disabled={answered < total} style={{
                                    display: "flex", alignItems: "center", gap: 8, padding: "12px 28px", borderRadius: 12,
                                    border: "none", fontSize: 15, fontWeight: 800, cursor: answered >= total ? "pointer" : "not-allowed",
                                    background: answered >= total ? "linear-gradient(135deg, #059669, #10b981)" : "#e2e8f0",
                                    color: answered >= total ? "#fff" : "#94a3b8",
                                    boxShadow: answered >= total ? "0 8px 20px rgba(5,150,105,0.3)" : "none",
                                }}>
                                    제출하기 ({answered}/{total})
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bottom Question Navigator */}
                <div style={{
                    padding: "12px 24px", background: "rgba(248,250,252,0.8)", backdropFilter: "blur(8px)",
                    borderTop: "1px solid #e2e8f0", display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center",
                }}>
                    {examQuestions.map((_, i) => {
                        const isCurrent = i === currentQ;
                        const isAnswered = answers[i] !== undefined;
                        return (
                            <button key={i} onClick={() => setCurrentQ(i)} style={{
                                width: 36, height: 36, borderRadius: 99, border: isCurrent ? "2px solid #1349ec" : "1px solid #e2e8f0",
                                background: isAnswered ? "#1349ec" : isCurrent ? "#fff" : "#f8fafc",
                                color: isAnswered ? "#fff" : isCurrent ? "#0f172a" : "#94a3b8",
                                fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                                boxShadow: isCurrent ? "0 0 0 3px rgba(19,73,236,0.15)" : "none",
                                transform: isCurrent ? "scale(1.1)" : "scale(1)",
                            }}>
                                {i + 1}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    /* ───────────── Result View ───────────── */
    if (result) {
        const tierResult = getTierInfo(result.tier!);
        const pct = Math.round(result.score / result.total * 100);
        const passed = examMode === "placement" || pct >= 70;
        return (
            <div style={{ maxWidth: 600, margin: "60px auto", textAlign: "center" }}>
                <div style={{
                    ...glassPanel, borderRadius: 32, padding: 56, boxShadow: "0 8px 32px rgba(0,0,0,0.07)",
                    position: "relative", overflow: "hidden",
                }}>
                    <div style={{
                        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                        width: "40%", height: 4, borderRadius: 2,
                        background: passed ? "linear-gradient(90deg, #10b981, #059669)" : "linear-gradient(90deg, #ef4444, #dc2626)",
                        boxShadow: passed ? "0 0 20px rgba(16,185,129,0.4)" : "0 0 20px rgba(239,68,68,0.4)",
                    }} />
                    <div style={{ fontSize: 72, marginBottom: 20 }}>{passed ? "🎉" : "😢"}</div>
                    <h2 style={{ fontWeight: 900, fontSize: 28, color: "#0f172a", marginBottom: 8 }}>
                        {examMode === "placement" ? "배치 완료!" : passed ? "승급 성공!" : "아쉽네요..."}
                    </h2>
                    <p style={{ fontSize: 18, color: "#64748b", marginBottom: 32 }}>
                        {result.score}/{result.total} 정답 ({pct}%)
                    </p>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 14, padding: "18px 40px",
                        borderRadius: 24, background: tierResult.gradient, color: "#fff",
                        fontSize: 22, fontWeight: 900, boxShadow: `0 20px 40px ${tierResult.color}40`,
                    }}>
                        {tierResult.icon} {tierResult.nameKo}
                    </div>
                    <button onClick={() => { setExamMode("none"); setResult(null); window.location.reload(); }} style={{
                        display: "block", margin: "40px auto 0", padding: "14px 36px", borderRadius: 14,
                        background: "#f1f5f9", border: "none", fontSize: 15, fontWeight: 700,
                        color: "#475569", cursor: "pointer", transition: "all 0.2s",
                    }}>돌아가기</button>
                </div>
            </div>
        );
    }

    /* ───────────── V1: Landing Dashboard ───────────── */
    return (
        <div style={{ display: "flex", gap: 24, height: "calc(100vh - 80px)" }}>
            {/* Background effects */}
            <div style={{
                position: "fixed", top: "-20%", right: "-10%", width: 800, height: 800,
                background: "rgba(19,73,236,0.03)", borderRadius: "50%", filter: "blur(100px)", pointerEvents: "none", zIndex: 0,
            }} />

            {/* Center: Main Exam Card */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 10 }}>
                <div style={{
                    ...glassPanel, width: "100%", maxWidth: 900, padding: "48px 56px", borderRadius: 24,
                    boxShadow: "0 8px 32px rgba(19,73,236,0.07)", borderTop: "4px solid #1349ec",
                    position: "relative", overflow: "hidden",
                }}>
                    {/* Glow accent */}
                    <div style={{
                        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
                        width: "50%", height: 2, background: "#1349ec",
                        boxShadow: "0 0 30px 10px rgba(19,73,236,0.3)",
                    }} />

                    {/* Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 }}>
                        <div style={{ maxWidth: 500 }}>
                            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                                <span style={{
                                    padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 800, letterSpacing: "0.08em",
                                    background: "rgba(19,73,236,0.1)", color: "#1349ec", border: "1px solid rgba(19,73,236,0.2)",
                                    textTransform: "uppercase",
                                }}>
                                    {canPlacement ? "배치고사" : canPromotion ? "승급심사" : "시험 대기실"}
                                </span>
                                <span style={{
                                    padding: "4px 10px", borderRadius: 6, fontSize: 10, fontWeight: 800, letterSpacing: "0.08em",
                                    background: "#f1f5f9", color: "#64748b", border: "1px solid #e2e8f0",
                                    textTransform: "uppercase",
                                }}>
                                    {currentTier.nameKo}
                                </span>
                            </div>
                            <h1 style={{
                                fontSize: 40, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em",
                                lineHeight: 1.15, marginBottom: 16,
                            }}>
                                코딩 실력 <br />
                                <span style={{
                                    background: "linear-gradient(90deg, #1349ec, #6366f1)",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                }}>
                                    승급 & 배치
                                </span>
                            </h1>
                            <p style={{ color: "#64748b", fontSize: 16, fontWeight: 300, lineHeight: 1.7 }}>
                                {canPlacement
                                    ? "배치고사를 통해 현재 실력에 맞는 티어를 배정받으세요. 문제를 풀고 결과에 따라 아이언~골드 중 티어가 정해집니다."
                                    : canPromotion
                                        ? `${getTierInfo(nextTier!).nameKo} 승급을 위한 시험을 치를 수 있습니다. 70% 이상 정답 시 승급합니다.`
                                        : progress?.placement_done
                                            ? "현재 단계에서 승급 조건을 확인해보세요. 꾸준한 학습으로 실력을 키워보세요!"
                                            : `레벨 30에 도달하면 배치고사를 볼 수 있어요! (현재 Lv.${progress?.level || 1})`
                                }
                            </p>
                        </div>

                        {/* Timer Display */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                            <div style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>
                                예상 소요 시간
                            </div>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                                {[{ v: "01", l: "Hrs" }, { v: "30", l: "Min" }, { v: "00", l: "Sec" }].map((t, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "baseline" }}>
                                        {i > 0 && <span style={{ fontSize: 32, fontWeight: 300, color: "#cbd5e1", margin: "0 2px", position: "relative", top: -12 }}>:</span>}
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                                            <span style={{
                                                fontSize: 44, fontWeight: 300, fontVariantNumeric: "tabular-nums", letterSpacing: "-0.05em",
                                                color: i === 2 ? "#1349ec" : "#0f172a",
                                            }}>{t.v}</span>
                                            <span style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase" }}>{t.l}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 48 }}>
                        {[
                            { icon: "quiz", color: "#94a3b8", value: "20", label: "총 문제 수" },
                            { icon: "check_circle", color: "#1349ec", value: String(answered), label: "완료" },
                            { icon: "flag", color: "#f59e0b", value: String(history.length), label: "시험 이력" },
                        ].map((s, i) => (
                            <div key={i} style={{
                                padding: 24, borderRadius: 16, background: "rgba(248,250,252,0.5)", border: "1px solid #f1f5f9",
                                display: "flex", flexDirection: "column", gap: 4,
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 24, color: s.color, marginBottom: 4 }}>{s.icon}</span>
                                <span style={{ fontSize: 28, fontWeight: 800, color: "#0f172a" }}>{s.value}</span>
                                <span style={{ fontSize: 14, fontWeight: 500, color: "#64748b" }}>{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Action */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                        {(canPlacement || canPromotion) && (
                            <button
                                onClick={() => startExam(canPlacement ? "placement" : "promotion")}
                                disabled={loading}
                                style={{
                                    position: "relative", display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                                    width: "100%", padding: "18px 0", borderRadius: 16, border: "none",
                                    background: "#1349ec", color: "#fff", fontSize: 17, fontWeight: 800,
                                    letterSpacing: "0.05em", textTransform: "uppercase", cursor: "pointer",
                                    boxShadow: "0 0 20px -5px rgba(19,73,236,0.5)", transition: "all 0.2s",
                                }}
                            >
                                {loading ? "준비 중..." : canPlacement ? "🎯 배치고사 시작" : `⬆️ ${getTierInfo(nextTier!).nameKo} 승급심사`}
                                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_forward</span>
                            </button>
                        )}
                        {!canPlacement && !canPromotion && (
                            <div style={{
                                width: "100%", padding: "18px 0", borderRadius: 16,
                                background: "#f1f5f9", textAlign: "center",
                                fontSize: 15, fontWeight: 600, color: "#94a3b8",
                            }}>
                                🔒 {progress?.placement_done ? "현재 최고 티어에 도달했거나 승급 준비 중입니다" : `레벨 30 도달 시 배치고사 활성화 (Lv.${progress?.level || 1})`}
                            </div>
                        )}
                        <p style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 4 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>info</span>
                            시험 진행 중 페이지를 벗어나면 진행이 초기화됩니다.
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Sidebar: Tier List */}
            <aside style={{
                width: 280, display: "flex", flexDirection: "column", ...glassPanel,
                borderRadius: 24, boxShadow: "0 8px 32px rgba(0,0,0,0.07)", overflow: "hidden", flexShrink: 0,
            }}>
                <div style={{ padding: 20, borderBottom: "1px solid #f1f5f9" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
                        <span className="material-symbols-outlined" style={{ color: "#1349ec" }}>military_tech</span>
                        티어 목록
                    </h3>
                </div>
                <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 8 }}>
                    {TIERS.map((t) => {
                        const isCurrent = t.name === (progress?.tier || "Iron");
                        return (
                            <div key={t.name} style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", borderRadius: 16,
                                background: isCurrent ? t.gradient : "#f8fafc",
                                color: isCurrent ? "#fff" : "#475569",
                                border: isCurrent ? "none" : "1px solid #e2e8f0",
                                boxShadow: isCurrent ? `0 8px 20px ${t.color}30` : "none",
                                transition: "all 0.2s",
                            }}>
                                <span style={{ fontSize: 24 }}>{t.icon}</span>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 800 }}>{t.nameKo}</div>
                                    <div style={{ fontSize: 11, opacity: 0.7 }}>{t.name}</div>
                                </div>
                                {isCurrent && <span style={{ marginLeft: "auto", fontSize: 11, fontWeight: 700, opacity: 0.8 }}>현재</span>}
                            </div>
                        );
                    })}
                </div>

                {/* History */}
                {history.length > 0 && (
                    <div style={{ padding: 16, borderTop: "1px solid #f1f5f9" }}>
                        <h4 style={{ fontSize: 12, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12 }}>최근 이력</h4>
                        {history.slice(0, 3).map((h) => (
                            <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                                <span style={{ fontSize: 16 }}>{getTierInfo(h.to_tier).icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>
                                        {getTierInfo(h.from_tier).nameKo} → {getTierInfo(h.to_tier).nameKo}
                                    </div>
                                    <div style={{ fontSize: 10, color: "#94a3b8" }}>
                                        {h.exam_score}/{h.exam_total} · {new Date(h.created_at).toLocaleDateString("ko-KR")}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </aside>
        </div>
    );
}
