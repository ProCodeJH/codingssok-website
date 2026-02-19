"use client";
import { useState, useEffect } from "react";

interface UserStats {
    totalSolved: number; streak: number; lastActiveDate: string; dailyLog: Record<string, number>;
}

const STORAGE_KEY = "codingssok-user-stats";

const loadStats = (): UserStats => {
    if (typeof window === "undefined") return { totalSolved: 0, streak: 0, lastActiveDate: "", dailyLog: {} };
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || { totalSolved: 0, streak: 0, lastActiveDate: "", dailyLog: {} }; }
    catch { return { totalSolved: 0, streak: 0, lastActiveDate: "", dailyLog: {} }; }
};

const saveStats = (stats: UserStats) => { if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); };
const getToday = () => new Date().toISOString().split("T")[0];

const getTierInfo = (solved: number): { name: string; color: string; nextTier: string; nextAt: number; emoji: string } => {
    if (solved >= 100) return { name: "Diamond", color: "#67e8f9", nextTier: "MAX", nextAt: 100, emoji: "💎" };
    if (solved >= 50) return { name: "Platinum", color: "#a78bfa", nextTier: "Diamond", nextAt: 100, emoji: "🏅" };
    if (solved >= 25) return { name: "Gold", color: "#fbbf24", nextTier: "Platinum", nextAt: 50, emoji: "🥇" };
    if (solved >= 10) return { name: "Silver", color: "#94a3b8", nextTier: "Gold", nextAt: 25, emoji: "🥈" };
    return { name: "Bronze", color: "#d97706", nextTier: "Silver", nextAt: 10, emoji: "🥉" };
};

interface Props { isOpen: boolean; onClose: () => void }

export function Leaderboard({ isOpen, onClose }: Props) {
    const [stats, setStats] = useState<UserStats>(loadStats);

    useEffect(() => { if (isOpen) setStats(loadStats()); }, [isOpen]);

    const recordSolve = () => {
        const today = getToday();
        const newStats = { ...stats };
        newStats.totalSolved += 1;
        newStats.dailyLog[today] = (newStats.dailyLog[today] || 0) + 1;
        // streak
        const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
        if (newStats.lastActiveDate === yesterday || newStats.lastActiveDate === today) {
            if (newStats.lastActiveDate === yesterday) newStats.streak += 1;
        } else { newStats.streak = 1; }
        newStats.lastActiveDate = today;
        saveStats(newStats); setStats(newStats);
    };

    const resetStats = () => {
        const empty: UserStats = { totalSolved: 0, streak: 0, lastActiveDate: "", dailyLog: {} };
        saveStats(empty); setStats(empty);
    };

    const tier = getTierInfo(stats.totalSolved);
    const progressToNext = tier.nextAt === 100 && stats.totalSolved >= 100 ? 100 : (stats.totalSolved / tier.nextAt) * 100;
    const todayCount = stats.dailyLog[getToday()] || 0;

    if (!isOpen) return null;
    const border = "rgba(255,255,255,0.06)";

    return (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#252320", borderRadius: 16, border: `1px solid ${border}`, maxWidth: 420, width: "90%", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>🏆 리더보드</span>
                    <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#888", fontSize: 16, cursor: "pointer" }}>✕</button>
                </div>

                {/* Tier Display */}
                <div style={{ padding: 24, textAlign: "center", background: `linear-gradient(180deg, ${tier.color}10, transparent)` }}>
                    <div style={{ fontSize: 48, marginBottom: 8 }}>{tier.emoji}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: tier.color }}>{tier.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>
                        {tier.nextTier === "MAX" ? "최고 티어 달성! 🎉" : `다음 티어: ${tier.nextTier} (${tier.nextAt - stats.totalSolved}문제 남음)`}
                    </div>
                    {/* Progress bar */}
                    <div style={{ marginTop: 12, height: 6, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${Math.min(100, progressToNext)}%`, background: tier.color, borderRadius: 3, transition: "width 0.5s" }} />
                    </div>
                </div>

                {/* Stats Grid */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, padding: "16px 20px" }}>
                    {[
                        { label: "총 해결", value: stats.totalSolved, icon: "🎯", color: "#22c55e" },
                        { label: "연속일", value: stats.streak, icon: "🔥", color: "#f59e0b" },
                        { label: "오늘 해결", value: todayCount, icon: "📅", color: "#3b82f6" },
                        { label: "총 활동일", value: Object.keys(stats.dailyLog).length, icon: "📊", color: "#8b5cf6" },
                    ].map(s => (
                        <div key={s.label} style={{ padding: 14, background: "rgba(0,0,0,0.15)", borderRadius: 10, textAlign: "center" }}>
                            <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Actions */}
                <div style={{ padding: "0 20px 16px", display: "flex", gap: 8 }}>
                    <button onClick={recordSolve} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", background: "#22c55e", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>✅ 문제 해결 기록</button>
                    <button onClick={resetStats} style={{ padding: 10, borderRadius: 8, border: `1px solid ${border}`, background: "transparent", color: "#888", fontSize: 12, cursor: "pointer" }}>🔄</button>
                </div>
            </div>
        </div>
    );
}
