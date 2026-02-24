"use client";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UserProgress {
    xp: number; level: number; streak: number;
    lastActiveDate: string; badges: string[];
    dailyXp: Record<string, number>;
}

const STORAGE_KEY = "codingssok-gamification";
const LEVELS = [
    { level: 1, xp: 0, title: "코딩 새싹 ", color: "#22c55e" },
    { level: 2, xp: 100, title: "코딩 탐험가 ", color: "#3b82f6" },
    { level: 3, xp: 300, title: "코딩 전사 ", color: "#8b5cf6" },
    { level: 4, xp: 600, title: "코딩 마법사 ", color: "#f59e0b" },
    { level: 5, xp: 1000, title: "코딩 영웅 ", color: "#ef4444" },
    { level: 6, xp: 1500, title: "코딩 전설 ", color: "#ec4899" },
    { level: 7, xp: 2500, title: "코딩 신화 ", color: "#06b6d4" },
    { level: 8, xp: 4000, title: "코딩 마스터 ", color: "#2563eb" },
];

const BADGES = [
    { id: "first-lesson", icon: "", name: "첫 수업", desc: "첫 레슨 완료", condition: (p: UserProgress) => p.xp >= 10 },
    { id: "streak-3", icon: "", name: "3일 연속", desc: "3일 연속 학습", condition: (p: UserProgress) => p.streak >= 3 },
    { id: "streak-7", icon: "", name: "7일 연속", desc: "7일 연속 학습", condition: (p: UserProgress) => p.streak >= 7 },
    { id: "xp-100", icon: "", name: "100 XP", desc: "XP 100 달성", condition: (p: UserProgress) => p.xp >= 100 },
    { id: "xp-500", icon: "", name: "500 XP", desc: "XP 500 달성", condition: (p: UserProgress) => p.xp >= 500 },
    { id: "xp-1000", icon: "", name: "1000 XP", desc: "XP 1000 달성", condition: (p: UserProgress) => p.xp >= 1000 },
    { id: "streak-30", icon: "", name: "30일 연속", desc: "30일 연속 학습", condition: (p: UserProgress) => p.streak >= 30 },
    { id: "explorer", icon: "", name: "탐험가", desc: "3개 과목 학습", condition: () => false },
];

const loadProgress = (): UserProgress => {
    if (typeof window === "undefined") return { xp: 0, level: 1, streak: 0, lastActiveDate: "", badges: [], dailyXp: {} };
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null") || { xp: 0, level: 1, streak: 0, lastActiveDate: "", badges: [], dailyXp: {} }; }
    catch { return { xp: 0, level: 1, streak: 0, lastActiveDate: "", badges: [], dailyXp: {} }; }
};
const saveProgress = (p: UserProgress) => { if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); };

const getToday = () => new Date().toISOString().split("T")[0];

export function useGamification() {
    const [progress, setProgress] = useState<UserProgress>(loadProgress);

    useEffect(() => { saveProgress(progress); }, [progress]);

    const addXp = (amount: number) => {
        setProgress(prev => {
            const today = getToday();
            const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
            let newStreak = prev.streak;
            if (prev.lastActiveDate === yesterday) newStreak++;
            else if (prev.lastActiveDate !== today) newStreak = 1;

            const newXp = prev.xp + amount;
            const newLevel = LEVELS.reduce((lvl, l) => newXp >= l.xp ? l.level : lvl, 1);

            const updated = {
                ...prev, xp: newXp, level: newLevel, streak: newStreak,
                lastActiveDate: today,
                dailyXp: { ...prev.dailyXp, [today]: (prev.dailyXp[today] || 0) + amount },
            };

            // Check badges
            const newBadges = [...updated.badges];
            BADGES.forEach(badge => {
                if (!newBadges.includes(badge.id) && badge.condition(updated)) {
                    newBadges.push(badge.id);
                }
            });
            updated.badges = newBadges;
            return updated;
        });
    };

    return { progress, addXp };
}

interface Props {
    progress: UserProgress;
    compact?: boolean;
}

export function GamificationBar({ progress, compact = false }: Props) {
    const [showDetails, setShowDetails] = useState(false);

    const currentLevel = useMemo(() => LEVELS.reduce((lvl, l) => progress.xp >= l.xp ? l : lvl, LEVELS[0]), [progress.xp]);
    const nextLevel = useMemo(() => LEVELS.find(l => l.level === currentLevel.level + 1), [currentLevel]);
    const xpProgress = nextLevel ? ((progress.xp - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100 : 100;
    const todayXp = progress.dailyXp[getToday()] || 0;

    // Last 7 days for mini calendar
    const last7 = useMemo(() => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const d = new Date(Date.now() - i * 86400000).toISOString().split("T")[0];
            days.push({ date: d, xp: progress.dailyXp[d] || 0, day: ["일", "월", "화", "수", "목", "금", "토"][new Date(d).getDay()] });
        }
        return days;
    }, [progress.dailyXp]);

    if (compact) {
        return (
            <motion.div
                onClick={() => setShowDetails(!showDetails)}
                whileHover={{ scale: 1.02 }}
                style={{
                    display: "flex", alignItems: "center", gap: 12, padding: "10px 18px",
                    background: "#fff", borderRadius: 14, border: "1px solid #e2e8f0",
                    cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
            >
                <span style={{ fontSize: 20 }}>{currentLevel.title.split(" ").pop()}</span>
                <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: currentLevel.color }}>Lv.{currentLevel.level} {currentLevel.title.split(" ").slice(0, -1).join(" ")}</div>
                    <div style={{ width: 80, height: 4, background: "#e2e8f0", borderRadius: 2, marginTop: 3 }}>
                        <motion.div animate={{ width: `${xpProgress}%` }} style={{ height: "100%", background: currentLevel.color, borderRadius: 2 }} />
                    </div>
                </div>
                <div style={{ display: "flex", gap: 8, marginLeft: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#f59e0b" }}>{progress.xp}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: "#ef4444" }}>{progress.streak}</span>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            style={{
                background: "#fff", borderRadius: 20, border: "1px solid #e2e8f0",
                padding: 24, boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
            }}
        >
            {/* Level & XP */}
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    style={{
                        width: 64, height: 64, borderRadius: "50%",
                        background: `linear-gradient(135deg, ${currentLevel.color}, ${currentLevel.color}aa)`,
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
                        boxShadow: `0 4px 20px ${currentLevel.color}40`,
                    }}
                >{currentLevel.title.split(" ").pop()}</motion.div>
                <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#1e293b" }}>
                        Lv.{currentLevel.level} {currentLevel.title.split(" ").slice(0, -1).join(" ")}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                        <div style={{ flex: 1, height: 8, background: "#e2e8f0", borderRadius: 4, overflow: "hidden" }}>
                            <motion.div initial={{ width: 0 }} animate={{ width: `${xpProgress}%` }}
                                transition={{ duration: 1, type: "spring" }}
                                style={{ height: "100%", background: `linear-gradient(90deg, ${currentLevel.color}, ${currentLevel.color}cc)`, borderRadius: 4 }} />
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 700, color: "#64748b" }}>
                            {progress.xp}{nextLevel ? `/${nextLevel.xp}` : ""} XP
                        </span>
                    </div>
                </div>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                {[
                    { icon: "", label: "총 XP", value: progress.xp, color: "#f59e0b" },
                    { icon: "", label: "연속일", value: progress.streak, color: "#ef4444" },
                    { icon: "", label: "오늘 XP", value: todayXp, color: "#2563eb" },
                    { icon: "★", label: "뱃지", value: progress.badges.length, color: "#8b5cf6" },
                ].map(s => (
                    <div key={s.label} style={{
                        flex: 1, textAlign: "center", padding: "14px 8px", borderRadius: 14,
                        background: `${s.color}08`, border: `1px solid ${s.color}20`,
                    }}>
                        <div style={{ fontSize: 18, marginBottom: 2 }}>{s.icon}</div>
                        <div style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.value}</div>
                        <div style={{ fontSize: 10, color: "#94a3b8" }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* 7-day activity */}
            <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8 }}>≡ 최근 7일 활동</div>
                <div style={{ display: "flex", gap: 6 }}>
                    {last7.map(d => (
                        <div key={d.date} style={{ flex: 1, textAlign: "center" }}>
                            <div style={{
                                height: 40, borderRadius: 8, marginBottom: 4,
                                background: d.xp > 0 ? `linear-gradient(to top, #2563eb${Math.min(255, d.xp * 3).toString(16).padStart(2, "0")}, transparent)` : "#f1f5f9",
                                display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 4,
                            }}>
                                {d.xp > 0 && <span style={{ fontSize: 9, fontWeight: 700, color: "#2563eb" }}>{d.xp}</span>}
                            </div>
                            <div style={{ fontSize: 9, color: d.date === getToday() ? "#2563eb" : "#94a3b8", fontWeight: d.date === getToday() ? 700 : 400 }}>{d.day}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Badges */}
            <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#64748b", marginBottom: 8 }}>★ 업적 뱃지</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {BADGES.map(badge => {
                        const earned = progress.badges.includes(badge.id);
                        return (
                            <motion.div key={badge.id}
                                whileHover={{ scale: 1.1 }}
                                style={{
                                    width: 56, height: 56, borderRadius: 14, display: "flex", flexDirection: "column",
                                    alignItems: "center", justifyContent: "center",
                                    background: earned ? "#eff6ff" : "#f8fafc", border: `1px solid ${earned ? "#bfdbfe" : "#e2e8f0"}`,
                                    opacity: earned ? 1 : 0.4, cursor: "default",
                                }}
                                title={`${badge.name}: ${badge.desc}`}
                            >
                                <span style={{ fontSize: 20 }}>{badge.icon}</span>
                                <span style={{ fontSize: 7, fontWeight: 700, color: "#64748b", marginTop: 2 }}>{badge.name}</span>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </motion.div>
    );
}
