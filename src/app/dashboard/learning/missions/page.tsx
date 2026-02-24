"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { FadeIn, StaggerList, StaggerItem, AnimatedBar } from "@/components/motion/motion";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

const RARITY_COLORS: Record<string, { bg: string; color: string; border: string }> = {
    common: { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" },
    rare: { bg: "#dbeafe", color: "#1d4ed8", border: "#93c5fd" },
    epic: { bg: "#ede9fe", color: "#6d28d9", border: "#c4b5fd" },
    legendary: { bg: "#fef3c7", color: "#b45309", border: "#fcd34d" },
};

const RARITY_LABELS: Record<string, string> = { common: "일반", rare: "희귀", epic: "영웅", legendary: "전설" };

export default function MissionsPage() {
    const { user } = useAuth();
    const supabase = createClient();
    const [tab, setTab] = useState<"missions" | "achievements">("missions");
    const [missions, setMissions] = useState<any[]>([]);
    const [userMissions, setUserMissions] = useState<any[]>([]);
    const [achievements, setAchievements] = useState<any[]>([]);
    const [userAchievements, setUserAchievements] = useState<any[]>([]);

    useEffect(() => {
        if (!user) return;
        // 미션 로드
        supabase.from("daily_missions").select("*").eq("is_active", true).order("mission_type")
            .then(({ data }) => { if (data) setMissions(data); });
        supabase.from("user_daily_missions").select("*").eq("user_id", user.id).eq("assigned_date", new Date().toISOString().split("T")[0])
            .then(({ data }) => { if (data) setUserMissions(data); });
        // 업적 로드
        supabase.from("achievements").select("*").order("sort_order")
            .then(({ data }) => { if (data) setAchievements(data); });
        supabase.from("user_achievements").select("*").eq("user_id", user.id)
            .then(({ data }) => { if (data) setUserAchievements(data); });
    }, [user, supabase]);

    const completedMissionIds = userMissions.filter(m => m.is_completed).map(m => m.mission_id);
    const earnedAchievementIds = userAchievements.map(a => a.achievement_id);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* 탭 */}
            <div style={{ display: "flex", gap: 8 }}>
                {[
                    { key: "missions" as const, label: "≡ 데일리 미션", icon: "task_alt" },
                    { key: "achievements" as const, label: "★ 업적", icon: "military_tech" },
                ].map((t) => (
                    <motion.button key={t.key} onClick={() => setTab(t.key)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                        style={{
                            padding: "12px 24px", borderRadius: 14, border: "none", fontSize: 14, fontWeight: 700,
                            background: tab === t.key ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "rgba(255,255,255,0.7)",
                            color: tab === t.key ? "#fff" : "#64748b", cursor: "pointer",
                            boxShadow: tab === t.key ? "0 8px 20px rgba(14,165,233,0.2)" : "none",
                        }}
                    >{t.label}</motion.button>
                ))}
            </div>

            {/* 데일리 미션 */}
            {tab === "missions" && (
                <div style={{ ...glassCard, borderRadius: 24, padding: 28 }}>
                    <h2 style={{ fontWeight: 800, fontSize: 20, color: "#0f172a", marginBottom: 8 }}>≡ 오늘의 미션</h2>
                    <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>미션을 완료하면 경험치를 획득할 수 있어요!</p>

                    <StaggerList style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {missions.filter(m => m.mission_type === "daily").map((m) => {
                            const done = completedMissionIds.includes(m.id);
                            const userM = userMissions.find(um => um.mission_id === m.id);
                            return (
                                <StaggerItem key={m.id}>
                                    <div style={{
                                        display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                                        borderRadius: 16, background: done ? "#f0fdf4" : "#f8fafc",
                                        border: `1px solid ${done ? "#bbf7d0" : "#e2e8f0"}`,
                                        cursor: "default",
                                    }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                                            background: done ? "#dcfce7" : "#e0f2fe", fontSize: 20,
                                        }}>
                                            <span className="material-symbols-outlined" style={{ color: done ? "#16a34a" : "#0284c7" }}>
                                                {done ? "check_circle" : m.icon}
                                            </span>
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: done ? "#16a34a" : "#0f172a" }}>{m.title}</div>
                                            <div style={{ fontSize: 12, color: "#94a3b8" }}>{m.description}</div>
                                            {!done && userM && (
                                                <div style={{ marginTop: 6, height: 4, background: "#e2e8f0", borderRadius: 999, overflow: "hidden", width: 120 }}>
                                                    <div style={{ width: `${Math.min((userM.progress / m.condition_value) * 100, 100)}%`, height: "100%", background: "#0ea5e9", borderRadius: 999 }} />
                                                </div>
                                            )}
                                        </div>
                                        <div style={{
                                            padding: "6px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700,
                                            background: done ? "#dcfce7" : "#fef3c7", color: done ? "#16a34a" : "#b45309",
                                        }}>
                                            {done ? "완료 ✓" : `+${m.xp_reward} XP`}
                                        </div>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerList>

                    {/* 주간 미션 */}
                    {missions.filter(m => m.mission_type === "weekly").length > 0 && (
                        <>
                            <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", margin: "32px 0 16px" }}> 주간 미션</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {missions.filter(m => m.mission_type === "weekly").map((m) => {
                                    const done = completedMissionIds.includes(m.id);
                                    return (
                                        <motion.div key={m.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            whileHover={{ x: 4 }}
                                            style={{
                                                display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                                                borderRadius: 16, background: "#f8fafc", border: "1px solid #e2e8f0",
                                            }}
                                        >
                                            <span style={{ fontSize: 20 }}>{m.icon}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{m.title}</div>
                                                <div style={{ fontSize: 12, color: "#94a3b8" }}>{m.description}</div>
                                            </div>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "#b45309" }}>+{m.xp_reward} XP</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* 업적 */}
            {tab === "achievements" && (
                <div style={{ ...glassCard, borderRadius: 24, padding: 28 }}>
                    <h2 style={{ fontWeight: 800, fontSize: 20, color: "#0f172a", marginBottom: 8 }}>★ 업적 컬렉션</h2>
                    <p style={{ color: "#64748b", fontSize: 13, marginBottom: 24 }}>
                        획득: {earnedAchievementIds.length}/{achievements.length}
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
                        {achievements.map((a) => {
                            const earned = earnedAchievementIds.includes(a.id);
                            const r = RARITY_COLORS[a.rarity] || RARITY_COLORS.common;
                            return (
                                <motion.div key={a.id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    whileHover={earned ? { y: -4, boxShadow: `0 8px 24px ${r.color}30` } : {}}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    style={{
                                        padding: 20, borderRadius: 18,
                                        background: earned ? r.bg : "#f8fafc",
                                        border: `1px solid ${earned ? r.border : "#e2e8f0"}`,
                                        opacity: earned ? 1 : 0.5,
                                        position: "relative",
                                    }}
                                >
                                    {earned && (
                                        <span style={{
                                            position: "absolute", top: 10, right: 10, fontSize: 10, fontWeight: 700,
                                            padding: "3px 10px", borderRadius: 8, background: r.color, color: "#fff",
                                        }}>{RARITY_LABELS[a.rarity]}</span>
                                    )}
                                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 8 }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                                            background: earned ? `${r.color}20` : "#e2e8f0", fontSize: 22,
                                        }}>
                                            <span className="material-symbols-outlined" style={{ color: earned ? r.color : "#94a3b8" }}>
                                                {earned ? a.icon : "lock"}
                                            </span>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: earned ? r.color : "#94a3b8" }}>{a.title}</div>
                                            <div style={{ fontSize: 11, color: "#94a3b8" }}>{a.description}</div>
                                        </div>
                                    </div>
                                    <div style={{ fontSize: 11, color: "#94a3b8", display: "flex", justifyContent: "space-between" }}>
                                        <span>보상: +{a.xp_reward} XP</span>
                                        {earned && <span style={{ color: "#22c55e" }}>✓ 달성</span>}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
