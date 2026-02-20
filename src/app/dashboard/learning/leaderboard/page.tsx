"use client";

import { useState } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useLeaderboard } from "@/hooks/useLearningData";

const TOP_3 = [
    { rank: 1, name: "Alex Kim", xp: 9850, level: 67, streak: 45 },
    { rank: 2, name: "Sarah Lee", xp: 8720, level: 61, streak: 38 },
    { rank: 3, name: "Mike Park", xp: 7680, level: 55, streak: 32 },
];

const RANKINGS = [
    { rank: 4, name: "Emily Chen", xp: 6500, level: 48, streak: 28, badge: "Gold" },
    { rank: 5, name: "David Choi", xp: 5890, level: 44, streak: 24, badge: "Gold" },
    { rank: 6, name: "Lisa Wang", xp: 5200, level: 40, streak: 20, badge: "Silver" },
    { rank: 7, name: "Tom Brown", xp: 4800, level: 37, streak: 18, badge: "Silver" },
    { rank: 8, name: "You", xp: 3200, level: 25, streak: 12, badge: "Bronze", isMe: true },
    { rank: 9, name: "Jane Kim", xp: 2900, level: 22, streak: 10, badge: "Bronze" },
    { rank: 10, name: "Chris Oh", xp: 2400, level: 19, streak: 8, badge: "Bronze" },
];

const BADGE_STYLE: Record<string, { bg: string; color: string; border: string }> = {
    Gold: { bg: "#fef9c3", color: "#a16207", border: "#fde68a" },
    Silver: { bg: "#f1f5f9", color: "#475569", border: "#e2e8f0" },
    Bronze: { bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
};

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

// Podium order: 2nd, 1st, 3rd
const PODIUM = [TOP_3[1], TOP_3[0], TOP_3[2]];
const PODIUM_HEIGHTS = [112, 144, 96];
const PODIUM_GRADS = [
    "linear-gradient(to top, #9ca3af, #d1d5db)",
    "linear-gradient(to top, #f59e0b, #fbbf24)",
    "linear-gradient(to top, #b45309, #d97706)",
];
const PODIUM_MEDALS = ["🥈", "🥇", "🥉"];

export default function LeaderboardPage() {
    const { progress } = useUserProgress();
    const { entries: dbEntries, myRank, loading: lbLoading } = useLeaderboard();

    // Supabase 데이터가 있으면 사용, 없으면 mock fallback
    const rankings = dbEntries.length > 0
        ? dbEntries.map((e, i) => ({
            rank: e.rank || i + 1, name: e.name || e.email?.split("@")[0] || "User",
            xp: e.xp, level: e.level, streak: e.streak,
            badge: e.tier || "Bronze", isMe: myRank ? e.user_id === myRank.user_id : false,
        }))
        : RANKINGS;
    const [period, setPeriod] = useState("weekly");

    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>

            {/* Header */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                <div>
                    <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: 12 }}>
                        <span className="material-symbols-outlined" style={{ color: "#eab308", fontSize: 32 }}>leaderboard</span>
                        Leaderboard
                    </h1>
                    <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>See where you stand among the community</p>
                </div>
                <div style={{ display: "flex", gap: 4, background: "#fff", padding: 6, borderRadius: 12, border: "1px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                    {["weekly", "monthly", "alltime"].map((p) => (
                        <button key={p} onClick={() => setPeriod(p)} style={{
                            padding: "8px 16px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                            border: "none", cursor: "pointer", transition: "all 0.2s",
                            ...(period === p ? { background: "#2563eb", color: "#fff", boxShadow: "0 4px 6px -1px rgba(37,99,235,0.3)" } : { background: "transparent", color: "#94a3b8" }),
                        }}>
                            {p === "alltime" ? "All Time" : p.charAt(0).toUpperCase() + p.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* My Rank Banner */}
            <div style={{
                position: "relative", overflow: "hidden", borderRadius: 16, padding: 24,
                background: "linear-gradient(to right, #2563eb, #4f46e5)", color: "#fff",
                boxShadow: "0 25px 50px -12px rgba(37,99,235,0.3)",
            }}>
                <div style={{ position: "absolute", right: -40, top: -40, width: 160, height: 160, background: "rgba(255,255,255,0.1)", borderRadius: "50%", filter: "blur(48px)" }} />
                <div style={{ position: "relative", zIndex: 10, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
                    <div style={{
                        width: 64, height: 64, borderRadius: 16, background: "rgba(255,255,255,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 900,
                        backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)",
                    }}>#8</div>
                    <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 4px 0" }}>Your Current Ranking</h3>
                        <p style={{ color: "#bfdbfe", fontSize: 14, margin: 0 }}>500 XP more to reach Rank #7</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                        {[{ v: progress.xp, l: "Total XP" }, { v: progress.streak, l: "Streak" }, { v: 120, l: "Solved" }].map((s, i) => (
                            <div key={i} style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 24, fontWeight: 900 }}>{s.v}</div>
                                <div style={{ fontSize: 10, color: "#bfdbfe", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 700 }}>{s.l}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top 3 Podium */}
            <div style={{ ...glassCard, borderRadius: 24, padding: 32 }}>
                <h2 style={{ textAlign: "center", fontWeight: 700, color: "#0f172a", marginBottom: 32, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <span className="material-symbols-outlined" style={{ color: "#eab308", fontSize: 24 }}>emoji_events</span>
                    Top 3 Champions
                </h2>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 32, maxWidth: 480, margin: "0 auto" }}>
                    {PODIUM.map((u, i) => (
                        <div key={u.rank} style={{ display: "flex", flexDirection: "column", alignItems: "center", order: i === 1 ? 2 : i === 0 ? 1 : 3 }}>
                            <div style={{ position: "relative", marginBottom: 12 }}>
                                <div style={{
                                    width: i === 1 ? 80 : 64, height: i === 1 ? 80 : 64,
                                    borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontSize: 24, fontWeight: 900, color: "#475569",
                                    ...(i === 1 ? { boxShadow: "0 0 0 4px #fbbf24, 0 20px 25px -5px rgba(251,191,36,0.2)" } : {}),
                                }}>{u.name.charAt(0)}</div>
                                <div style={{ position: "absolute", top: -8, right: -8, fontSize: 24 }}>{PODIUM_MEDALS[i]}</div>
                            </div>
                            <h4 style={{ fontWeight: 700, fontSize: 14, color: "#0f172a", margin: "0 0 4px 0" }}>{u.name}</h4>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#13daec", marginBottom: 12 }}>{u.xp.toLocaleString()} XP</span>
                            <div style={{
                                width: 80, height: PODIUM_HEIGHTS[i], background: PODIUM_GRADS[i],
                                borderRadius: "12px 12px 0 0", display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)",
                            }}>
                                <span style={{ fontSize: 28, fontWeight: 900, color: "rgba(255,255,255,0.8)" }}>#{u.rank}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Full Rankings */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9" }}>
                    <h3 style={{ fontWeight: 700, color: "#0f172a", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                        <span className="material-symbols-outlined" style={{ color: "#13daec" }}>format_list_numbered</span>
                        Full Rankings
                    </h3>
                </div>
                <div>
                    {rankings.map((u) => {
                        const bs = BADGE_STYLE[u.badge] || BADGE_STYLE.Bronze;
                        return (
                            <div key={u.rank} style={{
                                display: "flex", alignItems: "center", gap: 16, padding: "16px 24px",
                                borderBottom: "1px solid #f9fafb", transition: "background 0.15s",
                                ...(u.isMe ? { background: "rgba(219,234,254,0.4)", borderLeft: "4px solid #3b82f6" } : {}),
                            }}>
                                <span style={{ fontSize: 14, fontWeight: 900, width: 32, color: u.rank <= 3 ? "#eab308" : "#94a3b8" }}>#{u.rank}</span>
                                <div style={{
                                    width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center",
                                    justifyContent: "center", fontSize: 14, fontWeight: 700,
                                    ...(u.isMe ? { background: "#3b82f6", color: "#fff" } : { background: "#f1f5f9", color: "#475569" }),
                                }}>{u.name.charAt(0)}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 700, fontSize: 14, color: u.isMe ? "#2563eb" : "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
                                        {u.name}
                                        {u.isMe && <span style={{ fontSize: 10, fontWeight: 700, color: "#3b82f6", background: "#dbeafe", padding: "2px 8px", borderRadius: 999 }}>You</span>}
                                    </div>
                                    <div style={{ fontSize: 12, color: "#94a3b8" }}>Level {u.level}</div>
                                </div>
                                <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 8, background: bs.bg, color: bs.color, border: `1px solid ${bs.border}` }}>{u.badge}</span>
                                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: "#94a3b8", width: 64, justifyContent: "flex-end" }}>
                                    <span className="material-symbols-outlined" style={{ color: "#f97316", fontSize: 14 }}>local_fire_department</span>
                                    <span style={{ fontWeight: 700 }}>{u.streak}d</span>
                                </div>
                                <div style={{ textAlign: "right", width: 96 }}>
                                    <span style={{ fontWeight: 700, fontSize: 14, color: "#0f172a" }}>{u.xp.toLocaleString()}</span>
                                    <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 4 }}>XP</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
