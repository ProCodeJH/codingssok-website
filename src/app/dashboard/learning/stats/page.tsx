"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { createClient } from "@/lib/supabase";
import { getTierInfo, getDisplayTier, calcLevel, xpForNextLevel } from "@/lib/xp-engine";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

export default function StatsPage() {
    const { user } = useAuth();
    const { progress } = useUserProgress();
    const supabase = createClient();
    const [submissions, setSubmissions] = useState(0);
    const [successRate, setSuccessRate] = useState(0);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    const tierInfo = getDisplayTier(progress?.tier || "Iron", progress?.level || 1, progress?.placement_done);
    const level = calcLevel(progress?.xp || 0);
    const levelProg = xpForNextLevel(progress?.xp || 0);

    useEffect(() => {
        if (!user) return;
        // 제출 통계
        supabase.from("code_submissions").select("status").eq("user_id", user.id)
            .then(({ data }) => {
                if (data) {
                    setSubmissions(data.length);
                    const success = data.filter((d: any) => d.status === "success").length;
                    setSuccessRate(data.length > 0 ? Math.round((success / data.length) * 100) : 0);
                }
            });
        // 최근 활동
        supabase.from("xp_logs").select("*").eq("user_id", user.id)
            .order("created_at", { ascending: false }).limit(10)
            .then(({ data }) => { if (data) setRecentActivity(data); });
    }, [user, supabase]);

    const STAT_CARDS = [
        { icon: "⭐", label: "총 경험치", value: `${(progress?.xp || 0).toLocaleString()} XP`, color: "#f59e0b" },
        { icon: "🔥", label: "연속 출석", value: `${progress?.streak || 0}일`, color: "#ef4444" },
        { icon: "📊", label: "현재 레벨", value: `Lv.${level}`, color: "#0ea5e9" },
        { icon: "💻", label: "코드 제출", value: `${submissions}회`, color: "#8b5cf6" },
        { icon: "✅", label: "성공률", value: `${successRate}%`, color: "#10b981" },
        { icon: "🏅", label: "푼 문제", value: `${progress?.totalProblems || 0}개`, color: "#06b6d4" },
    ];

    const WEEKLY_DATA = [
        { day: "월", xp: 120 }, { day: "화", xp: 85 }, { day: "수", xp: 200 },
        { day: "목", xp: 150 }, { day: "금", xp: 90 }, { day: "토", xp: 300 },
        { day: "일", xp: 50 },
    ];
    const maxXp = Math.max(...WEEKLY_DATA.map((d) => d.xp), 1);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <style>{`@media (min-width:768px) { .stats-grid-2 { grid-template-columns: 1fr 1fr !important; } } @media (min-width:1024px) { .stats-grid-3 { grid-template-columns: repeat(3,1fr) !important; } .stats-grid-6 { grid-template-columns: repeat(6,1fr) !important; } }`}</style>

            <div>
                <h1 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: 0 }}>📊 학습 통계</h1>
                <p style={{ fontSize: 13, color: "#64748b" }}>나의 학습 현황을 한 눈에 확인하세요</p>
            </div>

            {/* 현재 티어 + 레벨 */}
            <div style={{ ...glassCard, borderRadius: 28, padding: 28, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 100, background: tierInfo.gradient, opacity: 0.2 }} />
                <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                    <div style={{ fontSize: 48 }}>{tierInfo.icon}</div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                            <span style={{ fontSize: 22, fontWeight: 900, color: "#0f172a" }}>{tierInfo.nameKo}</span>
                            <span style={{ padding: "3px 10px", borderRadius: 999, background: tierInfo.gradient, color: "#fff", fontSize: 12, fontWeight: 700 }}>Lv.{level}</span>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "#64748b", marginBottom: 6 }}>
                            <span>다음 레벨까지</span>
                            <span>{levelProg.current} / {levelProg.needed} XP</span>
                        </div>
                        <div style={{ height: 10, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                            <div style={{ width: `${levelProg.progress}%`, height: "100%", background: tierInfo.gradient, borderRadius: 999, transition: "width 0.5s" }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* 통계 카드 6개 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 12 }} className="stats-grid-6">
                {STAT_CARDS.map((s, i) => (
                    <div key={i} style={{ ...glassCard, borderRadius: 16, padding: 20, textAlign: "center" }}>
                        <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                        <div style={{ fontSize: 22, fontWeight: 900, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginTop: 4 }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* 주간 XP 차트 */}
            <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginBottom: 20 }}>📈 이번 주 XP 획득량</h3>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 160, paddingBottom: 30, position: "relative" }}>
                    {WEEKLY_DATA.map((d, i) => (
                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#0ea5e9" }}>{d.xp}</span>
                            <div style={{
                                width: "100%", maxWidth: 40, height: `${(d.xp / maxXp) * 120}px`,
                                background: "linear-gradient(to top, #0ea5e9, #38bdf8)", borderRadius: "8px 8px 4px 4px",
                                transition: "height 0.5s", minHeight: 8,
                            }} />
                            <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b" }}>{d.day}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="stats-grid-2">
                {/* 최근 활동 */}
                <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                    <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginBottom: 16 }}>🕐 최근 활동</h3>
                    {recentActivity.length === 0 ? (
                        <div style={{ textAlign: "center", padding: 32, color: "#94a3b8" }}>
                            <span style={{ fontSize: 32, display: "block", marginBottom: 8 }}>📝</span>
                            아직 활동 기록이 없어요
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {recentActivity.map((a: any, i: number) => (
                                <div key={i} style={{
                                    display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                                    borderRadius: 12, background: "#f8fafc",
                                }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: "50%",
                                        background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fff", fontSize: 14,
                                    }}>⭐</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{a.reason || "경험치 획득"}</div>
                                        <div style={{ fontSize: 11, color: "#94a3b8" }}>
                                            {new Date(a.created_at).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 14, fontWeight: 800, color: "#059669" }}>+{a.amount} XP</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 과목별 진행도 */}
                <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                    <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginBottom: 16 }}>📚 과목별 진행도</h3>
                    {[
                        { name: "컴퓨팅 사고력", progress: 65, color: "#6366f1" },
                        { name: "C언어 기초", progress: 40, color: "#f59e0b" },
                        { name: "코딩 기초", progress: 80, color: "#10b981" },
                        { name: "알고리즘 입문", progress: 25, color: "#ef4444" },
                    ].map((s, i) => (
                        <div key={i} style={{ marginBottom: 16 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{s.name}</span>
                                <span style={{ fontSize: 12, color: "#94a3b8" }}>{s.progress}%</span>
                            </div>
                            <div style={{ height: 8, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                                <div style={{ width: `${s.progress}%`, height: "100%", background: s.color, borderRadius: 999, transition: "width 0.5s" }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
