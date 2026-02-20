"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useUserBadges, useActivityLog } from "@/hooks/useLearningData";

const BADGES = [
    { name: "Gold Contributor", icon: "emoji_events", bg: "#fef9c3", color: "#a16207", border: "#fde68a" },
    { name: "Python Expert", icon: "code", bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    { name: "7-Day Streak", icon: "local_fire_department", bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
    { name: "Bug Hunter", icon: "bug_report", bg: "#fef2f2", color: "#b91c1c", border: "#fecaca" },
    { name: "Team Player", icon: "group", bg: "#faf5ff", color: "#7e22ce", border: "#e9d5ff" },
    { name: "Fast Solver", icon: "bolt", bg: "#f0fdfa", color: "#0f766e", border: "#99f6e4" },
];

const ACTIVITY = [
    { action: "Array Rotation 풀이 완료", xp: 150, time: "2시간 전", icon: "check_circle", bg: "#dcfce7", color: "#15803d" },
    { action: "Python Masterclass 3장 완료", xp: 200, time: "어제", icon: "school", bg: "#dbeafe", color: "#1d4ed8" },
    { action: "'Bug Hunter' 뱃지 획득", xp: 100, time: "2일 전", icon: "military_tech", bg: "#fef9c3", color: "#a16207" },
    { action: "Daily Challenge 7일 연속 클리어", xp: 500, time: "3일 전", icon: "local_fire_department", bg: "#fee2e2", color: "#b91c1c" },
    { action: "Coding Foundations 코스 완료", xp: 300, time: "1주 전", icon: "flag", bg: "#f3e8ff", color: "#7e22ce" },
];

const STATS = [
    { label: "Problems Solved", value: "120", icon: "check_circle", bg: "#f0fdf4", color: "#16a34a", border: "#bbf7d0" },
    { label: "Accuracy", value: "94%", icon: "verified", bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
    { label: "Avg. Time", value: "12m", icon: "timer", bg: "#faf5ff", color: "#7e22ce", border: "#e9d5ff" },
    { label: "Best Streak", value: "14d", icon: "local_fire_department", bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
];

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

function getTimeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}분 전`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}시간 전`;
    const days = Math.floor(hrs / 24);
    if (days === 1) return "어제";
    if (days < 7) return `${days}일 전`;
    return `${Math.floor(days / 7)}주 전`;
}
export default function ProfilePage() {
    const { user } = useAuth();
    const { progress } = useUserProgress();
    const { badges: dbBadges } = useUserBadges();
    const { activities: dbActivities } = useActivityLog(5);

    // Supabase 데이터가 있으면 사용, 없으면 mock fallback
    const badges = dbBadges.length > 0
        ? dbBadges.map(b => ({
            name: b.badge_name, icon: b.badge_icon,
            bg: b.badge_bg, color: b.badge_color,
            border: b.badge_bg, // fallback
        }))
        : BADGES;

    const activities = dbActivities.length > 0
        ? dbActivities.map(a => {
            const ago = getTimeAgo(a.created_at);
            return { action: a.action, xp: a.xp_earned, time: ago, icon: a.icon, bg: a.icon_bg, color: a.icon_color };
        })
        : ACTIVITY;

    const displayName = user?.name || user?.email?.split("@")[0] || "Student";
    const initial = (user?.email?.charAt(0) || "S").toUpperCase();
    const xpForNext = (progress.level + 1) * 500;
    const xpPercent = Math.min((progress.xp / xpForNext) * 100, 100);

    return (
        <>
            <style>{`@media (min-width: 1024px) { .profile-grid { grid-template-columns: 7fr 3fr !important; } }`}</style>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>

                {/* Hero */}
                <div style={{
                    position: "relative", overflow: "hidden", borderRadius: 28,
                    background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
                    color: "#fff", padding: "40px 48px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                }}>
                    <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, background: "rgba(14,165,233,0.15)", borderRadius: "50%", filter: "blur(80px)" }} />
                    <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, background: "rgba(99,102,241,0.15)", borderRadius: "50%", filter: "blur(48px)" }} />

                    <div style={{ position: "relative", zIndex: 10, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 32 }}>
                        {/* Avatar */}
                        <div style={{ position: "relative" }}>
                            <div style={{
                                width: 96, height: 96, borderRadius: "50%", padding: 3,
                                background: "linear-gradient(to top right, #0ea5e9, #6366f1)",
                                boxShadow: "0 0 0 4px rgba(255,255,255,0.1)",
                            }}>
                                <div style={{
                                    width: "100%", height: "100%", borderRadius: "50%",
                                    background: "linear-gradient(to bottom right, #0369a1, #4338ca)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 36, fontWeight: 800, color: "#fff", border: "3px solid #0f172a",
                                }}>{initial}</div>
                            </div>
                            <div style={{ position: "absolute", bottom: 2, right: 2, width: 16, height: 16, borderRadius: "50%", background: "#22c55e", border: "2px solid #0f172a" }} />
                        </div>

                        {/* Info */}
                        <div style={{ flex: 1, minWidth: 200 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                                <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>{displayName}</h1>
                                <span style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9", background: "rgba(14,165,233,0.15)", padding: "4px 12px", borderRadius: 999, border: "1px solid rgba(14,165,233,0.3)" }}>
                                    Lv.{progress.level} Scholar
                                </span>
                            </div>
                            <p style={{ color: "rgba(255,255,255,0.5)", margin: "0 0 20px 0", fontSize: 14 }}>@{displayName.toLowerCase().replace(/\s/g, "")}</p>

                            {/* XP bar */}
                            <div>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                                    <span style={{ color: "rgba(255,255,255,0.6)" }}>Level {progress.level} → {progress.level + 1}</span>
                                    <span style={{ color: "#0ea5e9", fontWeight: 700 }}>{progress.xp} / {xpForNext} XP</span>
                                </div>
                                <div style={{ height: 8, background: "rgba(255,255,255,0.1)", borderRadius: 999, overflow: "hidden" }}>
                                    <div style={{
                                        height: "100%", borderRadius: 999, width: `${xpPercent}%`,
                                        background: "linear-gradient(to right, #0ea5e9, #6366f1)",
                                        boxShadow: "0 0 10px rgba(14,165,233,0.5)",
                                    }} />
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
                            {[
                                { v: progress.streak, l: "Day Streak", icon: "local_fire_department", c: "#f97316" },
                                { v: 120, l: "Problems", icon: "code", c: "#0ea5e9" },
                                { v: progress.xp, l: "Total XP", icon: "stars", c: "#a855f7" },
                            ].map((s, i) => (
                                <div key={i} style={{ textAlign: "center" }}>
                                    <span className="material-symbols-outlined" style={{ color: s.c, fontSize: 22, display: "block", marginBottom: 4 }}>{s.icon}</span>
                                    <div style={{ fontSize: 24, fontWeight: 900 }}>{s.v}</div>
                                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{s.l}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
                    {STATS.map((s, i) => (
                        <div key={i} style={{ ...glassCard, borderRadius: 16, padding: 20, display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ width: 48, height: 48, borderRadius: 14, background: s.bg, color: s.color, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span className="material-symbols-outlined">{s.icon}</span>
                            </div>
                            <div>
                                <div style={{ fontSize: 24, fontWeight: 900, color: "#0f172a" }}>{s.value}</div>
                                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{s.label}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Content Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }} className="profile-grid">
                    {/* Badges */}
                    <div style={{ ...glassCard, borderRadius: 24, padding: 28 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: 8 }}>
                            <span className="material-symbols-outlined" style={{ color: "#eab308" }}>military_tech</span>
                            Badges Earned
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                            {badges.map((b, i) => (
                                <div key={i} style={{
                                    display: "flex", alignItems: "center", gap: 12, padding: 14,
                                    background: b.bg, borderRadius: 12, border: `1px solid ${b.border}`,
                                }}>
                                    <div style={{ width: 40, height: 40, borderRadius: 10, background: "#fff", color: b.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                                        <span className="material-symbols-outlined">{b.icon}</span>
                                    </div>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{b.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div style={{ ...glassCard, borderRadius: 24, padding: 28 }}>
                        <h2 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 20px 0", display: "flex", alignItems: "center", gap: 8 }}>
                            <span className="material-symbols-outlined" style={{ color: "#0ea5e9" }}>history</span>
                            최근 활동
                        </h2>
                        <div style={{ position: "relative", paddingLeft: 16, borderLeft: "2px solid #f1f5f9", display: "flex", flexDirection: "column", gap: 20 }}>
                            {activities.map((a, i) => (
                                <div key={i} style={{ position: "relative" }}>
                                    <div style={{ position: "absolute", left: -25, top: 4, width: 16, height: 16, borderRadius: "50%", background: a.bg, color: a.color, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 0 3px #fff" }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 10 }}>{a.icon}</span>
                                    </div>
                                    <div style={{ background: "#fff", padding: 14, borderRadius: 12, border: "1px solid #f1f5f9" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                            <span style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{a.action}</span>
                                            <span style={{ fontSize: 10, color: "#94a3b8" }}>{a.time}</span>
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: "#16a34a", background: "#dcfce7", padding: "2px 8px", borderRadius: 6 }}>+{a.xp} XP</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
