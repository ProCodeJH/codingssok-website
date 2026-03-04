"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/* ── Types ── */
export interface UserProfile {
    id: string;
    name: string;
    email: string;
    grade?: string;
    phone?: string;
    avatar?: string;
    level: number;
    xp: number;
    streak: number;
    joinedAt: string;
}

interface AuthContextType {
    user: UserProfile | null;
    loading: boolean;
    signOut: () => void;
    updateProfile: (patch: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signOut: () => { },
    updateProfile: () => { },
});

export const useAuth = () => useContext(AuthContext);

/* ── Storage Keys ── */
const AUTH_KEY = "codingssok_user";

function loadUser(): UserProfile | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch (e) { console.error('[Auth] loadUser failed:', e); return null; }
}

function saveUser(u: UserProfile | null) {
    if (typeof window === "undefined") return;
    if (u) localStorage.setItem(AUTH_KEY, JSON.stringify(u));
    else localStorage.removeItem(AUTH_KEY);
}

/* ── Provider ── */
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    /* On mount: load from localStorage + sync XP from Supabase */
    useEffect(() => {
        let cancelled = false;

        async function init() {
            try {
                const stored = loadUser();
                if (stored && !cancelled) {
                    // Sync latest XP/level from Supabase user_progress
                    try {
                        const { createClient } = await import("@/lib/supabase");
                        const sb = createClient();
                        const { data: progress } = await sb
                            .from("user_progress")
                            .select("xp, level, streak")
                            .eq("user_id", stored.id)
                            .single();

                        if (progress && !cancelled) {
                            stored.xp = progress.xp ?? stored.xp;
                            stored.level = progress.level ?? stored.level;
                            stored.streak = progress.streak ?? stored.streak;
                            saveUser(stored);
                        }
                    } catch (e) {
                        console.error('[Auth] XP sync failed:', e);
                    }
                    setUser(stored);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        init();
        return () => { cancelled = true; };
    }, []);

    const signOut = () => {
        setUser(null);
        saveUser(null);
        window.location.href = "/login";
    };

    const updateProfile = (patch: Partial<UserProfile>) => {
        setUser(prev => {
            if (!prev) return prev;
            const updated = { ...prev, ...patch };
            saveUser(updated);
            return updated;
        });
    };

    return (
        <AuthContext.Provider value={{ user, loading, signOut, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
}
