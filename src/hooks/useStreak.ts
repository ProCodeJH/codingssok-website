"use client";
import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════
   스트릭 시스템 — 연속 학습일 추적
   + 🧊 아이스 아이템 (스트릭 프리즈)
   localStorage 기반
   ═══════════════════════════════════════ */

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string;       // ISO date string (YYYY-MM-DD)
    activeDates: string[];        // all active dates
    iceItems: number;             // 🧊 freeze items
    frozenDates: string[];        // dates saved by ice
    totalDays: number;
}

const STORAGE_KEY = "codingssok_streak";
const ICE_PRICE_XP = 500;

function getToday(): string {
    return new Date().toISOString().slice(0, 10);
}

function getYesterday(): string {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
}

/** Get dates for the last N days */
export function getLastNDays(n: number): string[] {
    const dates: string[] = [];
    for (let i = n - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().slice(0, 10));
    }
    return dates;
}

function loadStreak(): StreakData {
    if (typeof window === "undefined") return defaultStreak();
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : defaultStreak();
    } catch { return defaultStreak(); }
}

function defaultStreak(): StreakData {
    return {
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: "",
        activeDates: [],
        iceItems: 1, // start with 1 free ice
        frozenDates: [],
        totalDays: 0,
    };
}

function saveStreak(data: StreakData) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { }
}

export function useStreak() {
    const [streak, setStreak] = useState<StreakData>(() => loadStreak());

    useEffect(() => { saveStreak(streak); }, [streak]);

    // Check in today (called when user does any learning activity)
    const checkIn = useCallback(() => {
        setStreak(prev => {
            const today = getToday();
            if (prev.lastActiveDate === today) return prev; // already checked in

            const yesterday = getYesterday();
            let newStreak = prev.currentStreak;
            const newActiveDates = [...prev.activeDates];

            if (prev.lastActiveDate === yesterday || prev.lastActiveDate === "") {
                // Continuing streak
                newStreak += 1;
            } else if (prev.frozenDates.includes(yesterday)) {
                // Yesterday was frozen — streak continues
                newStreak += 1;
            } else {
                // Streak broken — but check if we can auto-freeze
                newStreak = 1;
            }

            if (!newActiveDates.includes(today)) {
                newActiveDates.push(today);
            }

            return {
                ...prev,
                currentStreak: newStreak,
                longestStreak: Math.max(prev.longestStreak, newStreak),
                lastActiveDate: today,
                activeDates: newActiveDates,
                totalDays: newActiveDates.length,
            };
        });
    }, []);

    // Use ice item to freeze a missed day
    const useIce = useCallback(() => {
        setStreak(prev => {
            if (prev.iceItems <= 0) return prev;
            const yesterday = getYesterday();
            return {
                ...prev,
                iceItems: prev.iceItems - 1,
                frozenDates: [...prev.frozenDates, yesterday],
            };
        });
    }, []);

    // Purchase ice with XP (integrate with XP engine)
    const purchaseIce = useCallback(() => {
        setStreak(prev => ({
            ...prev,
            iceItems: prev.iceItems + 1,
        }));
    }, []);

    // Check if streak is at risk (last active was yesterday, not today yet)
    const isAtRisk = streak.lastActiveDate !== getToday() && streak.currentStreak > 0;
    const isBroken = streak.lastActiveDate !== getToday() && streak.lastActiveDate !== getYesterday() && streak.currentStreak > 0;

    // Get streak badge
    const badge = streak.currentStreak >= 100 ? { emoji: "🏆", label: "골드", color: "#F59E0B" }
        : streak.currentStreak >= 30 ? { emoji: "🥈", label: "실버", color: "#94a3b8" }
            : streak.currentStreak >= 7 ? { emoji: "🥉", label: "브론즈", color: "#CD7F32" }
                : null;

    return {
        streak, checkIn, useIce, purchaseIce,
        isAtRisk, isBroken, badge,
        ICE_PRICE_XP,
    };
}
