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
const AUTH_KEY = "elite_auth_user";

function loadUser(): UserProfile | null {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(AUTH_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch { return null; }
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

    /* On mount: try Supabase first, then localStorage fallback */
    useEffect(() => {
        let cancelled = false;

        async function init() {
            try {
                // Try Supabase
                const { createClient } = await import("@/lib/supabase");
                const sb = createClient();
                const { data: { session } } = await sb.auth.getSession();

                if (session?.user && !cancelled) {
                    // Fetch profile from profiles table
                    const { data: profile } = await sb
                        .from("profiles")
                        .select("*")
                        .eq("id", session.user.id)
                        .single();

                    // Fetch XP/level/streak from user_progress
                    const { data: progress } = await sb
                        .from("user_progress")
                        .select("xp, level, streak")
                        .eq("user_id", session.user.id)
                        .single();

                    const stored = loadUser();
                    const u: UserProfile = {
                        id: session.user.id,
                        name: profile?.name || session.user.email?.split("@")[0] || "User",
                        email: session.user.email || "",
                        grade: profile?.grade,
                        phone: profile?.phone,
                        avatar: profile?.avatar,
                        level: progress?.level ?? stored?.level ?? 1,
                        xp: progress?.xp ?? stored?.xp ?? 0,
                        streak: progress?.streak ?? stored?.streak ?? 0,
                        joinedAt: stored?.joinedAt || new Date().toISOString(),
                    };
                    setUser(u);
                    saveUser(u);
                } else if (!cancelled) {
                    // Fallback: localStorage only
                    const stored = loadUser();
                    setUser(stored);
                }

                // Listen for auth changes
                const { data: { subscription } } = sb.auth.onAuthStateChange((_event, session) => {
                    if (!session) {
                        setUser(null);
                        saveUser(null);
                    }
                });

                return () => subscription.unsubscribe();
            } catch {
                // Supabase not configured — use localStorage only
                if (!cancelled) {
                    const stored = loadUser();
                    setUser(stored);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        init();
        return () => { cancelled = true; };
    }, []);

    const signOut = async () => {
        try {
            const { createClient } = await import("@/lib/supabase");
            const sb = createClient();
            await sb.auth.signOut();
        } catch { /* Supabase not available */ }
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
