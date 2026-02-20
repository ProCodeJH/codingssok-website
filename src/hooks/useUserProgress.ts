"use client";

import { useState, useEffect, useCallback } from "react";

/* ── Types ── */
export interface UserProgress {
    xp: number;
    level: number;
    streak: number;
    lastActiveDate: string;
    completedCourses: string[];
    completedChallenges: string[];
    badges: string[];
    totalProblems: number;
    rank: number;
    tier: string;
    points: number;
    goals: GoalProgress[];
}

export interface GoalProgress {
    id: string;
    name: string;
    progress: number; // 0-100
    target: number;
    current: number;
}

const PROGRESS_KEY = "elite_user_progress";

const DEFAULT_PROGRESS: UserProgress = {
    xp: 2450,
    level: 42,
    streak: 12,
    lastActiveDate: new Date().toISOString().split("T")[0],
    completedCourses: ["coding-foundations", "computational-thinking"],
    completedChallenges: ["string-reverse", "division"],
    badges: ["gold-contributor", "bug-hunter", "trend-setter"],
    totalProblems: 89,
    rank: 24,
    tier: "Gold I",
    points: 1240,
    goals: [
        { id: "python", name: "Master Python Concurrency", progress: 75, target: 100, current: 75 },
        { id: "react", name: "React Advanced Patterns", progress: 45, target: 100, current: 45 },
        { id: "system", name: "System Design Basics", progress: 10, target: 100, current: 10 },
    ],
};

function loadProgress(): UserProgress {
    if (typeof window === "undefined") return DEFAULT_PROGRESS;
    try {
        const raw = localStorage.getItem(PROGRESS_KEY);
        return raw ? { ...DEFAULT_PROGRESS, ...JSON.parse(raw) } : DEFAULT_PROGRESS;
    } catch { return DEFAULT_PROGRESS; }
}

function saveProgress(p: UserProgress) {
    if (typeof window === "undefined") return;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
}

/* XP → Level 계산 */
function xpToLevel(xp: number): number {
    return Math.floor(xp / 100) + 1;
}

/* ── Hook ── */
export function useUserProgress() {
    const [progress, setProgress] = useState<UserProgress>(DEFAULT_PROGRESS);

    useEffect(() => {
        setProgress(loadProgress());
    }, []);

    const update = useCallback((patch: Partial<UserProgress>) => {
        setProgress(prev => {
            const next = { ...prev, ...patch };
            saveProgress(next);
            return next;
        });
    }, []);

    const addXP = useCallback((amount: number) => {
        setProgress(prev => {
            const newXP = prev.xp + amount;
            const next = { ...prev, xp: newXP, level: xpToLevel(newXP) };
            saveProgress(next);
            return next;
        });
    }, []);

    const completeChallenge = useCallback((id: string) => {
        setProgress(prev => {
            if (prev.completedChallenges.includes(id)) return prev;
            const next = {
                ...prev,
                completedChallenges: [...prev.completedChallenges, id],
                totalProblems: prev.totalProblems + 1,
            };
            saveProgress(next);
            return next;
        });
    }, []);

    const completeCourse = useCallback((id: string) => {
        setProgress(prev => {
            if (prev.completedCourses.includes(id)) return prev;
            const next = {
                ...prev,
                completedCourses: [...prev.completedCourses, id],
            };
            saveProgress(next);
            return next;
        });
    }, []);

    const updateStreak = useCallback(() => {
        setProgress(prev => {
            const today = new Date().toISOString().split("T")[0];
            if (prev.lastActiveDate === today) return prev;
            const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
            const streak = prev.lastActiveDate === yesterday ? prev.streak + 1 : 1;
            const next = { ...prev, streak, lastActiveDate: today };
            saveProgress(next);
            return next;
        });
    }, []);

    const updateGoal = useCallback((id: string, current: number) => {
        setProgress(prev => {
            const goals = prev.goals.map(g =>
                g.id === id ? { ...g, current, progress: Math.min(100, Math.round((current / g.target) * 100)) } : g
            );
            const next = { ...prev, goals };
            saveProgress(next);
            return next;
        });
    }, []);

    return {
        progress,
        addXP,
        completeChallenge,
        completeCourse,
        updateStreak,
        updateGoal,
        update,
    };
}
