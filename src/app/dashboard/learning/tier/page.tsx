"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { TIERS, getTierInfo, getPlacementTier, checkPromotion, getNextTier } from "@/lib/xp-engine";
import { useUserProgress } from "@/hooks/useUserProgress";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

export default function TierPage() {
    const { user } = useAuth();
    const { progress } = useUserProgress();
    const supabase = createClient();

    const [examQuestions, setExamQuestions] = useState<any[]>([]);
    const [examMode, setExamMode] = useState<"none" | "placement" | "promotion">("none");
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [result, setResult] = useState<{ score: number; total: number; tier?: string } | null>(null);
    const [loading, setLoading] = useState(false);
    const [history, setHistory] = useState<any[]>([]);

    const currentTier = getTierInfo(progress?.tier || "Iron");
    const nextTier = getNextTier(progress?.tier || "Iron");
    const canPlacement = (progress?.level || 1) >= 30 && !progress?.placement_done;
    const canPromotion = progress?.placement_done && nextTier;

    useEffect(() => {
        if (!user) return;
        supabase.from("user_tier_history").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10)
            .then(({ data }) => { if (data) setHistory(data); });
    }, [user, supabase]);

    const startExam = async (type: "placement" | "promotion") => {
        setLoading(true);
        const tierName = type === "placement" ? "placement" : nextTier!;
        const { data } = await supabase.from("tier_exams").select("*").eq("tier_name", tierName).eq("exam_type", type).order("sort_order");
        if (data && data.length > 0) {
            setExamQuestions(data);
            setExamMode(type);
            setAnswers({});
            setResult(null);
        }
        setLoading(false);
    };

    const submitExam = async () => {
        if (!user) return;
        let score = 0;
        examQuestions.forEach((q, i) => { if (answers[i] === q.correct_answer) score++; });
        const total = examQuestions.length;

        let newTier: string;
        if (examMode === "placement") {
            newTier = getPlacementTier(score, total);
        } else {
            if (checkPromotion(score, total)) {
                newTier = nextTier!;
            } else {
                newTier = progress?.tier || "Iron";
            }
        }

        // DB 업데이트
        await supabase.from("user_tier_history").insert({
            user_id: user.id, from_tier: progress?.tier || "Iron", to_tier: newTier,
            exam_score: score, exam_total: total, change_type: examMode,
        });
        await supabase.from("user_progress").update({
            tier: newTier, placement_done: true,
        }).eq("user_id", user.id);

        setResult({ score, total, tier: newTier });
    };

    // 시험 모드 렌더
    if (examMode !== "none" && !result) {
        return (
            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <div style={{ ...glassCard, borderRadius: 24, padding: 32 }}>
                    <h2 style={{ fontWeight: 900, fontSize: 22, color: "#0f172a", marginBottom: 8 }}>
                        {examMode === "placement" ? "🎯 티어 배치고사" : `⬆️ ${getTierInfo(nextTier!).nameKo} 승급심사`}
                    </h2>
                    <p style={{ color: "#64748b", fontSize: 13, marginBottom: 32 }}>
                        {examMode === "placement" ? "결과에 따라 아이언~골드 중 티어가 배정됩니다." : "70% 이상 정답 시 승급합니다."}
                    </p>
                    {examQuestions.map((q, i) => (
                        <div key={i} style={{ marginBottom: 28, padding: 24, borderRadius: 20, background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>
                                <span style={{ color: "#0ea5e9", marginRight: 8 }}>Q{i + 1}.</span>{q.question}
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {(JSON.parse(typeof q.options === "string" ? q.options : JSON.stringify(q.options)) as string[]).map((opt: string) => (
                                    <button key={opt} onClick={() => setAnswers(prev => ({ ...prev, [i]: opt }))} style={{
                                        padding: "12px 16px", borderRadius: 12, border: "2px solid",
                                        borderColor: answers[i] === opt ? "#0ea5e9" : "#e2e8f0",
                                        background: answers[i] === opt ? "#f0f9ff" : "#fff",
                                        color: answers[i] === opt ? "#0369a1" : "#475569",
                                        fontWeight: answers[i] === opt ? 700 : 500, fontSize: 14, cursor: "pointer",
                                        textAlign: "left", transition: "all 0.15s",
                                    }}>
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button onClick={submitExam} disabled={Object.keys(answers).length < examQuestions.length} style={{
                        width: "100%", padding: "16px 0", borderRadius: 16, border: "none", fontSize: 16, fontWeight: 800,
                        background: Object.keys(answers).length >= examQuestions.length
                            ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "#e2e8f0",
                        color: Object.keys(answers).length >= examQuestions.length ? "#fff" : "#94a3b8",
                        cursor: Object.keys(answers).length >= examQuestions.length ? "pointer" : "not-allowed",
                        boxShadow: "0 10px 20px rgba(14,165,233,0.2)",
                    }}>
                        제출하기 ({Object.keys(answers).length}/{examQuestions.length})
                    </button>
                </div>
            </div>
        );
    }

    // 결과 모드
    if (result) {
        const tierResult = getTierInfo(result.tier!);
        return (
            <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
                <div style={{ ...glassCard, borderRadius: 32, padding: 48 }}>
                    <div style={{ fontSize: 64, marginBottom: 16 }}>{tierResult.icon}</div>
                    <h2 style={{ fontWeight: 900, fontSize: 28, color: "#0f172a", marginBottom: 8 }}>
                        {examMode === "placement" ? "배치 완료!" : result.score / result.total >= 0.7 ? "승급 성공! 🎉" : "아쉽네요..."}
                    </h2>
                    <p style={{ fontSize: 16, color: "#64748b", marginBottom: 24 }}>
                        {result.score}/{result.total} 정답 ({Math.round(result.score / result.total * 100)}%)
                    </p>
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: 12, padding: "16px 32px",
                        borderRadius: 20, background: tierResult.gradient, color: "#fff", fontSize: 20, fontWeight: 900,
                        boxShadow: `0 20px 40px ${tierResult.color}40`,
                    }}>
                        {tierResult.icon} {tierResult.nameKo}
                    </div>
                    <button onClick={() => { setExamMode("none"); setResult(null); window.location.reload(); }} style={{
                        display: "block", margin: "32px auto 0", padding: "12px 32px", borderRadius: 14,
                        background: "#f1f5f9", border: "none", fontSize: 14, fontWeight: 700, color: "#475569", cursor: "pointer",
                    }}>돌아가기</button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* 현재 티어 대형 카드 */}
            <div style={{
                padding: 40, borderRadius: 32, position: "relative", overflow: "hidden",
                background: currentTier.gradient, color: "#fff",
                boxShadow: `0 25px 50px ${currentTier.color}30`,
            }}>
                <div style={{ position: "absolute", top: -30, right: -30, fontSize: 120, opacity: 0.15 }}>{currentTier.icon}</div>
                <div style={{ position: "relative", zIndex: 10 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.8, marginBottom: 8 }}>나의 현재 티어</div>
                    <div style={{ fontSize: 40, fontWeight: 900, display: "flex", alignItems: "center", gap: 14 }}>
                        {currentTier.icon} {currentTier.nameKo}
                    </div>
                    <div style={{ fontSize: 14, opacity: 0.8, marginTop: 8 }}>
                        Lv.{progress?.level || 1} · XP {progress?.xp || 0} · 연속 {progress?.streak || 0}일
                    </div>
                    <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
                        {canPlacement && (
                            <button onClick={() => startExam("placement")} disabled={loading} style={{
                                padding: "14px 28px", borderRadius: 16, border: "2px solid rgba(255,255,255,0.3)",
                                background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer",
                            }}>🎯 배치고사 보기</button>
                        )}
                        {canPromotion && (
                            <button onClick={() => startExam("promotion")} disabled={loading} style={{
                                padding: "14px 28px", borderRadius: 16, border: "2px solid rgba(255,255,255,0.3)",
                                background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer",
                            }}>⬆️ {getTierInfo(nextTier!).nameKo} 승급심사</button>
                        )}
                        {!canPlacement && (progress?.level || 1) < 30 && (
                            <div style={{ fontSize: 13, opacity: 0.7, padding: "14px 0" }}>
                                🔒 레벨 30에 도달하면 배치고사를 볼 수 있어요! (현재 Lv.{progress?.level || 1})
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 티어 목록 */}
            <div style={{ ...glassCard, borderRadius: 24, padding: 28 }}>
                <h2 style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", marginBottom: 20 }}>🏅 전체 티어 목록</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                    {TIERS.map((t) => {
                        const isCurrent = t.name === (progress?.tier || "Iron");
                        return (
                            <div key={t.name} style={{
                                padding: 20, borderRadius: 20, textAlign: "center",
                                background: isCurrent ? t.gradient : "#f8fafc",
                                color: isCurrent ? "#fff" : "#475569",
                                border: isCurrent ? "none" : "1px solid #e2e8f0",
                                boxShadow: isCurrent ? `0 10px 20px ${t.color}30` : "none",
                                transition: "all 0.2s",
                            }}>
                                <div style={{ fontSize: 32, marginBottom: 8 }}>{t.icon}</div>
                                <div style={{ fontSize: 14, fontWeight: 800 }}>{t.nameKo}</div>
                                <div style={{ fontSize: 11, opacity: 0.7, marginTop: 4 }}>{t.name}</div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 티어 변동 이력 */}
            {history.length > 0 && (
                <div style={{ ...glassCard, borderRadius: 24, padding: 28 }}>
                    <h2 style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", marginBottom: 16 }}>📋 티어 변동 이력</h2>
                    {history.map((h) => (
                        <div key={h.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid #f1f5f9" }}>
                            <span style={{ fontSize: 20 }}>{getTierInfo(h.to_tier).icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>
                                    {getTierInfo(h.from_tier).nameKo} → {getTierInfo(h.to_tier).nameKo}
                                </div>
                                <div style={{ fontSize: 11, color: "#94a3b8" }}>
                                    {h.exam_score}/{h.exam_total} ({Math.round(h.exam_score / h.exam_total * 100)}%) · {h.change_type === "placement" ? "배치고사" : "승급심사"}
                                </div>
                            </div>
                            <div style={{ fontSize: 11, color: "#cbd5e1" }}>{new Date(h.created_at).toLocaleDateString("ko-KR")}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
