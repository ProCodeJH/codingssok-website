"use client";
import { useState, useCallback, useEffect } from "react";

/* ═══════════════════════════════════════
   보상 상점 — XP로 아이템 구매
   Ice, XP 부스터, 아바타, 에디터 테마 등
   ═══════════════════════════════════════ */

export interface StoreItem {
    id: string;
    emoji: string;
    name: string;
    description: string;
    price: number;             // XP cost
    category: "utility" | "avatar" | "theme" | "emoji";
    rarity: "common" | "rare" | "epic" | "legendary";
    stackable: boolean;        // can buy multiple
}

export const STORE_ITEMS: StoreItem[] = [
    // Utility
    { id: "ice", emoji: "🧊", name: "스트릭 프리즈", description: "하루 스트릭 유지", price: 500, category: "utility", rarity: "common", stackable: true },
    { id: "xp_boost_2x", emoji: "⚡", name: "XP 2배 부스터", description: "24시간 XP 2배", price: 1000, category: "utility", rarity: "rare", stackable: true },
    { id: "hint_pack", emoji: "💡", name: "힌트 팩 (5회)", description: "무료 힌트 5회 사용", price: 300, category: "utility", rarity: "common", stackable: true },

    // Avatars
    { id: "avatar_robot", emoji: "🤖", name: "로봇 아바타", description: "프로필 아이콘 변경", price: 800, category: "avatar", rarity: "rare", stackable: false },
    { id: "avatar_cat", emoji: "🐱", name: "고양이 아바타", description: "프로필 아이콘 변경", price: 800, category: "avatar", rarity: "rare", stackable: false },
    { id: "avatar_alien", emoji: "👽", name: "우주인 아바타", description: "프로필 아이콘 변경", price: 1200, category: "avatar", rarity: "epic", stackable: false },
    { id: "avatar_dragon", emoji: "🐉", name: "드래곤 아바타", description: "프로필 아이콘 변경", price: 2000, category: "avatar", rarity: "legendary", stackable: false },

    // Editor themes
    { id: "theme_dracula", emoji: "🧛", name: "드라큘라 테마", description: "코드 에디터 테마", price: 600, category: "theme", rarity: "rare", stackable: false },
    { id: "theme_monokai", emoji: "🎨", name: "모노카이 테마", description: "코드 에디터 테마", price: 600, category: "theme", rarity: "rare", stackable: false },
    { id: "theme_ocean", emoji: "🌊", name: "오션 테마", description: "코드 에디터 테마", price: 600, category: "theme", rarity: "rare", stackable: false },

    // Nick color
    { id: "nick_gold", emoji: "✨", name: "골드 닉네임", description: "닉네임 금색 표시", price: 2000, category: "emoji", rarity: "legendary", stackable: false },
];

const STORAGE_KEY = "codingssok_store";

interface StoreState {
    purchased: string[];       // item IDs
    inventory: Record<string, number>;  // stackable items count
}

function loadStore(): StoreState {
    if (typeof window === "undefined") return { purchased: [], inventory: {} };
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : { purchased: [], inventory: {} };
    } catch { return { purchased: [], inventory: {} }; }
}

export function useStore() {
    const [store, setStore] = useState<StoreState>(() => loadStore());

    useEffect(() => {
        try { localStorage.setItem(STORAGE_KEY, JSON.stringify(store)); } catch { }
    }, [store]);

    const purchase = useCallback((itemId: string): { success: boolean; message: string } => {
        const item = STORE_ITEMS.find(i => i.id === itemId);
        if (!item) return { success: false, message: "아이템을 찾을 수 없습니다." };

        // Check if already owned (non-stackable)
        if (!item.stackable && store.purchased.includes(itemId)) {
            return { success: false, message: "이미 보유한 아이템입니다." };
        }

        // Check XP (read from user profile)
        let currentXp = 0;
        try {
            const user = JSON.parse(localStorage.getItem("codingssok_user") || "{}");
            currentXp = user.xp || 0;
        } catch { }

        if (currentXp < item.price) {
            return { success: false, message: `XP가 부족합니다. (보유: ${currentXp}, 필요: ${item.price})` };
        }

        // Deduct XP
        try {
            const user = JSON.parse(localStorage.getItem("codingssok_user") || "{}");
            user.xp = (user.xp || 0) - item.price;
            localStorage.setItem("codingssok_user", JSON.stringify(user));
        } catch { }

        // Add to inventory
        setStore(prev => {
            const purchased = item.stackable ? prev.purchased : [...prev.purchased, itemId];
            const inventory = { ...prev.inventory };
            if (item.stackable) {
                inventory[itemId] = (inventory[itemId] || 0) + 1;
            }

            // Special handling: ice item sync to streak
            if (itemId === "ice") {
                try {
                    const streak = JSON.parse(localStorage.getItem("codingssok_streak") || "{}");
                    streak.iceItems = (streak.iceItems || 0) + 1;
                    localStorage.setItem("codingssok_streak", JSON.stringify(streak));
                } catch { }
            }

            return { purchased: item.stackable ? prev.purchased : purchased, inventory };
        });

        return { success: true, message: `${item.name}을(를) 구매했습니다!` };
    }, [store]);

    const owns = useCallback((itemId: string) => store.purchased.includes(itemId), [store]);
    const getCount = useCallback((itemId: string) => store.inventory[itemId] || 0, [store]);

    return { store, purchase, owns, getCount, STORE_ITEMS };
}
