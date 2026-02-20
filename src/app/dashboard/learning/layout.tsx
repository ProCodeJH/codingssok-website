"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { AuthProvider, useAuth } from "@/contexts/AuthContext";

/* ── Nav Items ── */
const NAV_ITEMS = [
    { emoji: "🏔️", label: "여정", href: "/dashboard/learning" },
    { emoji: "🏋️", label: "데일리 챌린지", href: "/dashboard/learning/challenge" },
    { emoji: "🚩", label: "목표", href: "/dashboard/learning/goals" },
    { emoji: "🏆", label: "리더보드", href: "/dashboard/learning/leaderboard" },
    { emoji: "🏪", label: "스토어", href: "/dashboard/learning/store", badge: true },
    { emoji: "🤓", label: "프로필", href: "/dashboard/learning/profile" },
];

/* ── Auth Guard ── */
function AuthGate({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) {
            window.location.href = "/login";
        }
    }, [loading, user]);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-[#13daec] border-t-transparent rounded-full animate-spin" />
                    <p className="text-sm text-gray-500 font-medium">로딩 중...</p>
                </div>
            </div>
        );
    }

    if (!user) return null;
    return <>{children}</>;
}

/* ── Sidebar ── */
function Sidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const { user, signOut } = useAuth();

    const isActive = (href: string) => {
        if (href === "/dashboard/learning") return pathname === href;
        return pathname.startsWith(href);
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
          fixed lg:sticky top-0 left-0 z-50 lg:z-auto
          w-64 h-screen flex-shrink-0
          bg-white border-r border-gray-200
          flex flex-col justify-between
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
                style={{ fontFamily: "'Inter', sans-serif" }}
            >
                <div>
                    {/* Logo */}
                    <div className="h-20 flex items-center px-8 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-[#3B82F6] flex items-center justify-center text-white font-bold text-lg">
                                E
                            </div>
                            <span className="font-bold text-xl tracking-tight text-gray-900">
                                Elite<span className="text-[#3B82F6]">Academy</span>
                            </span>
                        </div>
                    </div>

                    {/* Nav */}
                    <nav className="p-4 space-y-2">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={onClose}
                                className={`
                  flex items-center gap-4 px-4 py-3 rounded-xl transition-all group relative
                  ${isActive(item.href)
                                        ? "bg-blue-50 text-[#3B82F6] font-semibold shadow-sm ring-1 ring-blue-100"
                                        : "text-gray-500 hover:bg-gray-50"
                                    }
                `}
                            >
                                <span className={`text-2xl transition-transform duration-200 ${!isActive(item.href) ? "group-hover:scale-110" : ""}`}>
                                    {item.emoji}
                                </span>
                                <span className="font-medium">{item.label}</span>
                                {item.badge && (
                                    <span className="absolute right-4 top-4 w-2 h-2 bg-red-500 rounded-full" />
                                )}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* User profile bottom */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-gray-50 border border-gray-100">
                        <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {user?.name?.charAt(0) || "U"}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{user?.name || "사용자"}</p>
                            <p className="text-xs text-gray-400 truncate">Lv. {user?.level || 1}</p>
                        </div>
                        <button
                            onClick={signOut}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="로그아웃"
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
}

/* ── Layout ── */
export default function LearningLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AuthProvider>
            <AuthGate>
                {/* Font imports for learning platform */}
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
                <div className="flex h-screen overflow-hidden bg-[#F3F4F6]" style={{ fontFamily: "'Inter', sans-serif", fontSize: '16px' }}>
                    <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                    <main className="flex-1 flex flex-col h-screen overflow-hidden">
                        {/* Mobile header */}
                        <header className="lg:hidden h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 z-20 flex-shrink-0">
                            <div className="font-bold text-lg text-gray-900">Elite Academy</div>
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
                            >
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="3" y1="12" x2="21" y2="12" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <line x1="3" y1="18" x2="21" y2="18" />
                                </svg>
                            </button>
                        </header>

                        <div className="flex-1 overflow-y-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </AuthGate>
        </AuthProvider>
    );
}
