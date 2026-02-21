"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { getTierInfo } from "@/lib/xp-engine";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { FadeIn, StaggerList, StaggerItem, ShimmerLoader } from "@/components/motion/motion";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

const PODIUM_ORDER = [1, 0, 2]; // 시각적: 2등, 1등, 3등
const PODIUM_HEIGHTS = [100, 130, 80];
const PODIUM_GRADS = [
    "linear-gradient(to top, #9ca3af, #d1d5db)",
    "linear-gradient(to top, #f59e0b, #fbbf24)",
    "linear-gradient(to top, #b45309, #d97706)",
];
const PODIUM_MEDALS = ["🥈", "🥇", "🥉"];

export default function LeaderboardPage() {
    const { user } = useAuth();
    const supabase = createClient();
    const [players, setPlayers] = useState<any[]>([]);
    const [tab, setTab] = useState<"xp" | "streak" | "problems">("xp");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const orderCol = tab === "xp" ? "xp" : tab === "streak" ? "streak" : "total_problems";

        // 2-step fetch: user_progress + profiles separately (no FK join needed)
        (async () => {
            try {
                const { data: progressData } = await supabase.from("user_progress")
                    .select("*")
                    .order(orderCol, { ascending: false })
                    .limit(50);

                if (progressData && progressData.length > 0) {
                    const userIds = progressData.map((p: any) => p.user_id);
                    const { data: profilesData } = await supabase.from("profiles")
                        .select("id, display_name, avatar_url, email")
                        .in("id", userIds);

                    const profileMap = new Map((profilesData || []).map((p: any) => [p.id, p]));
                    const merged = progressData.map((p: any) => ({
                        ...p,
                        profiles: profileMap.get(p.user_id) || { display_name: null, avatar_url: null, email: null },
                    }));
                    setPlayers(merged);
                } else {
                    setPlayers([]);
                }
            } catch (err) {
                console.error("리더보드 로드 실패:", err);
                setPlayers([]);
            }
            setLoading(false);
        })();
    }, [tab, supabase]);

    const top3 = players.slice(0, 3);
    const rest = players.slice(3);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: 0 }}>🏆 리더보드</h1>
                    <p style={{ fontSize: 13, color: "#64748b" }}>누가 가장 열심히 학습하고 있을까요?</p>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                    {[
                        { key: "xp" as const, label: "⭐ 경험치" },
                        { key: "streak" as const, label: "🔥 연속출석" },
                        { key: "problems" as const, label: "✅ 문제수" },
                    ].map((t) => (
                        <motion.button key={t.key} onClick={() => setTab(t.key)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 400, damping: 20 }}
                            style={{
                                padding: "10px 20px", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 700,
                                background: tab === t.key ? "#0f172a" : "rgba(255,255,255,0.7)",
                                color: tab === t.key ? "#fff" : "#64748b", cursor: "pointer",
                            }}
                        >{t.label}</motion.button>
                    ))}
                </div>
            </div>

            {/* 포디움 */}
            {top3.length >= 3 && (
                <FadeIn>
                    <div style={{ ...glassCard, borderRadius: 28, padding: "32px 24px 0", display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 16 }}>
                        {PODIUM_ORDER.map((idx, vi) => {
                            const p = top3[idx];
                            if (!p) return null;
                            const tier = getTierInfo(p.tier || "Iron");
                            const value = tab === "xp" ? p.xp : tab === "streak" ? p.streak : p.total_problems;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: vi * 0.15, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: 160 }}
                                >
                                    <div style={{ fontSize: 32, marginBottom: 8 }}>{PODIUM_MEDALS[vi]}</div>
                                    <div style={{
                                        width: 56, height: 56, borderRadius: "50%", border: "3px solid #fff",
                                        background: p.profiles?.avatar_url ? `url(${p.profiles.avatar_url}) center/cover` : tier.gradient,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fff", fontWeight: 800, fontSize: 18,
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.1)", marginBottom: 8,
                                    }}>
                                        {!p.profiles?.avatar_url && (p.profiles?.display_name || p.profiles?.email || "?").charAt(0).toUpperCase()}
                                    </div>
                                    <div style={{ fontSize: 13, fontWeight: 800, color: "#0f172a", textAlign: "center" }}>{p.profiles?.display_name || p.profiles?.email?.split("@")[0]}</div>
                                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{tier.icon} {tier.nameKo} · Lv.{p.level || 1}</div>
                                    <div style={{ fontSize: 16, fontWeight: 900, color: "#0ea5e9", marginTop: 4 }}>{value?.toLocaleString()}</div>
                                    <div style={{
                                        width: "100%", height: PODIUM_HEIGHTS[vi], borderRadius: "12px 12px 0 0",
                                        background: PODIUM_GRADS[vi], marginTop: 12,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fff", fontSize: 28, fontWeight: 900,
                                    }}>
                                        {idx + 1}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </FadeIn>
            )}

            {/* 순위표 */}
            <div style={{ ...glassCard, borderRadius: 24, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 8 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f59e0b" }}>assessment</span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>전체 순위</span>
                    <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: "auto" }}>{players.length}명</span>
                </div>
                {loading ? (
                    <ShimmerLoader lines={8} style={{ padding: 24 }} />
                ) : (
                    <div>
                        {players.map((p, i) => {
                            const tier = getTierInfo(p.tier || "Iron");
                            const isMe = p.user_id === user?.id;
                            const value = tab === "xp" ? p.xp : tab === "streak" ? p.streak : p.total_problems;
                            return (
                                <motion.div
                                    key={p.user_id || i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    whileHover={{ backgroundColor: isMe ? "#e0f2fe" : "#f8fafc", x: 4 }}
                                    transition={{ delay: i * 0.04, duration: 0.3 }}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 14, padding: "14px 20px",
                                        borderBottom: "1px solid #f8fafc",
                                        background: isMe ? "#f0f9ff" : "transparent",
                                        cursor: "default",
                                    }}>
                                    <span style={{
                                        width: 28, textAlign: "center", fontSize: 14, fontWeight: 800,
                                        color: i < 3 ? "#f59e0b" : "#94a3b8",
                                    }}>
                                        {i < 3 ? ["🥇", "🥈", "🥉"][i] : `#${i + 1}`}
                                    </span>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                                        background: p.profiles?.avatar_url ? `url(${p.profiles.avatar_url}) center/cover` : tier.gradient,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fff", fontWeight: 700, fontSize: 13,
                                    }}>
                                        {!p.profiles?.avatar_url && (p.profiles?.display_name || p.profiles?.email || "?").charAt(0).toUpperCase()}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{
                                            fontSize: 14, fontWeight: isMe ? 800 : 600, color: isMe ? "#0369a1" : "#0f172a",
                                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                                        }}>
                                            {p.profiles?.display_name || p.profiles?.email?.split("@")[0]}
                                            {isMe && <span style={{ fontSize: 11, color: "#0ea5e9", marginLeft: 6 }}>← 나</span>}
                                        </div>
                                        <div style={{ fontSize: 11, color: "#94a3b8" }}>
                                            {tier.icon} {tier.nameKo} · Lv.{p.level || 1}
                                        </div>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <div style={{ fontSize: 16, fontWeight: 900, color: "#0ea5e9" }}>{value?.toLocaleString() || 0}</div>
                                        <div style={{ fontSize: 10, color: "#94a3b8" }}>
                                            {tab === "xp" ? "XP" : tab === "streak" ? "일" : "문제"}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
