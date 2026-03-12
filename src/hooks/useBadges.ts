"use client";
import { useState, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════
   배지 & 업적 시스템
   localStorage 기반
   ═══════════════════════════════════════ */

export interface Badge {
    id: string;
    name: string;
    description: string;
    condition: string;       // human-readable condition
    category: "learning" | "special";
    rarity: "common" | "rare" | "epic" | "legendary";
    unlockedAt?: number;     // timestamp when earned
}

export const BADGE_CATALOG: Omit<Badge, "unlockedAt">[] = [
    // Learning badges
    { id: "seedling", name: "새싹", description: "첫 유닛 완료", condition: "유닛 1개 완료", category: "learning", rarity: "common" },
    { id: "coder", name: "코더", description: "첫 코드 실행", condition: "코드 1번 실행", category: "learning", rarity: "common" },
    { id: "sharpshooter", name: "정확왕", description: "연속 10문제 정답", condition: "퀴즈 10연속 정답", category: "learning", rarity: "rare" },
    { id: "speedster", name: "속도왕", description: "5분 내 유닛 완료", condition: "5분 내 1유닛 완료", category: "learning", rarity: "rare" },
    { id: "bookworm", name: "다독가", description: "50유닛 완료", condition: "유닛 50개 완료", category: "learning", rarity: "epic" },
    { id: "genius", name: "천재", description: "100유닛 완료", condition: "유닛 100개 완료", category: "learning", rarity: "epic" },
    { id: "master", name: "마스터", description: "전체 코스 완료!", condition: "모든 코스 100%", category: "learning", rarity: "legendary" },

    // Special badges
    { id: "early_bird", name: "아침형", description: "오전 7시 이전 학습", condition: "AM 7시 이전 접속", category: "special", rarity: "rare" },
    { id: "night_owl", name: "올빼미", description: "자정 이후 학습", condition: "AM 12시 이후 접속", category: "special", rarity: "rare" },
    { id: "xmas", name: "크리스마스", description: "12월 25일 학습", condition: "12/25 접속", category: "special", rarity: "epic" },
    { id: "champion", name: "1등", description: "리더보드 1위", condition: "주간 리더보드 1위", category: "special", rarity: "legendary" },
];

const RARITY_COLORS: Record<string, string> = {
    common: "#94a3b8",
    rare: "#3B82F6",
    epic: "#2563eb",
    legendary: "#F59E0B",
};

export { RARITY_COLORS };

const STORAGE_KEY = "codingssok_badges";

function loadBadges(): string[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch { return []; }
}

export function useBadges() {
    const [unlockedIds, setUnlockedIds] = useState<string[]>(() => loadBadges());
    const [newBadge, setNewBadge] = useState<Badge | null>(null);

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedIds)); } catch { }
    }, [unlockedIds]);

    const unlock = useCallback((badgeId: string) => {
        setUnlockedIds(prev => {
            if (prev.includes(badgeId)) return prev;
            const badge = BADGE_CATALOG.find(b => b.id === badgeId);
            if (badge) {
                setNewBadge({ ...badge, unlockedAt: Date.now() });
                // Auto-clear notification after 4s
                setTimeout(() => setNewBadge(null), 4000);
            }
            return [...prev, badgeId];
        });
    }, []);

    // Auto-check time-based badges
    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 7) unlock("early_bird");
        if (hour >= 0 && hour < 5) unlock("night_owl");
        const now = new Date();
        if (now.getMonth() === 11 && now.getDate() === 25) unlock("xmas");
    }, [unlock]);

    // reward-engine 에서 발행하는 badge-unlocked 이벤트 감지
    useEffect(() => {
        const handler = (e: Event) => {
            const badgeId = (e as CustomEvent).detail as string;
            if (badgeId) unlock(badgeId);
        };
        window.addEventListener("badge-unlocked", handler);
        return () => window.removeEventListener("badge-unlocked", handler);
    }, [unlock]);

    const allBadges: Badge[] = BADGE_CATALOG.map(b => ({
        ...b,
        unlockedAt: unlockedIds.includes(b.id) ? Date.now() : undefined,
    }));

    const unlockedCount = unlockedIds.length;
    const totalCount = BADGE_CATALOG.length;

    return {
        allBadges, unlockedIds, unlockedCount, totalCount,
        unlock, newBadge, setNewBadge,
        RARITY_COLORS,
    };
}
