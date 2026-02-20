"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

/* ── Nav Items ── */
const NAV_ITEMS = [
    { icon: "dashboard", label: "Dashboard", href: "/dashboard/learning" },
    { icon: "library_books", label: "My Courses", href: "/dashboard/learning/challenge" },
    { icon: "emoji_events", label: "Achievements", href: "/dashboard/learning/goals" },
    { icon: "diversity_3", label: "Leaderboard", href: "/dashboard/learning/leaderboard" },
    { icon: "storefront", label: "Store", href: "/dashboard/learning/store", badge: true },
    { icon: "settings", label: "Profile", href: "/dashboard/learning/profile" },
];



/* ── Auth Guard ── */
function AuthGate({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();

    useEffect(() => {
        if (!loading && !user) window.location.href = "/login";
    }, [loading, user]);

    if (loading) return (
        <div className="h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg,#f0f9ff 0%,#e0f2fe 100%)" }}>
            <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-slate-500 font-medium">로딩 중...</p>
            </div>
        </div>
    );

    if (!user) return null;
    return <>{children}</>;
}

/* ── Left Sidebar ── */
function LeftSidebar() {
    const pathname = usePathname();
    const isActive = (href: string) => href === "/dashboard/learning" ? pathname === href : pathname.startsWith(href);

    return (
        <aside className="hidden lg:block lg:col-span-2 sticky top-32 h-[calc(100vh-10rem)] overflow-y-auto hide-scrollbar">
            <nav className="space-y-2">
                {NAV_ITEMS.map((item) => (
                    <Link key={item.href} href={item.href}
                        className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-semibold text-sm transition-all relative overflow-hidden group
                        ${isActive(item.href)
                                ? "bg-sky-50 text-sky-700 font-bold shadow-sm border border-sky-100 ring-1 ring-sky-200/50"
                                : "text-slate-500 hover:bg-white hover:text-sky-600 border border-transparent hover:border-sky-50 hover:shadow-lg hover:shadow-sky-100/50"
                            }`}
                    >
                        {isActive(item.href) && (
                            <div className="absolute inset-0 bg-gradient-to-r from-sky-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                        <span className={`material-symbols-outlined relative z-10 ${!isActive(item.href) ? "group-hover:scale-110" : ""} transition-transform`}>
                            {item.icon}
                        </span>
                        <span className="relative z-10">{item.label}</span>
                        {item.badge && <span className="absolute right-4 top-4 w-2 h-2 bg-red-500 rounded-full" />}
                    </Link>
                ))}
            </nav>

            {/* Daily Challenge Mini Card */}
            <div className="mt-10 px-2">
                <div className="relative rounded-3xl p-5 overflow-hidden group shadow-2xl shadow-indigo-500/20 transition-all hover:scale-[1.02]">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl group-hover:bg-sky-400/30 transition-all duration-700" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-3">
                            <div className="p-1.5 bg-yellow-500/20 rounded-lg backdrop-blur-sm border border-yellow-500/30">
                                <span className="material-symbols-outlined text-yellow-400 text-lg block">bolt</span>
                            </div>
                            <span className="text-[10px] font-bold bg-white/10 px-2.5 py-1 rounded-full text-white/90 backdrop-blur-md border border-white/10">DAILY DROP</span>
                        </div>
                        <h4 className="font-bold text-base text-white mb-1.5 tracking-tight">Algorithm Sort</h4>
                        <p className="text-xs text-slate-300/80 mb-4 font-light leading-relaxed">Optimize the sort function for O(n) complexity.</p>
                        <Link href="/dashboard/learning/challenge"
                            className="w-full py-2.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-400 hover:to-indigo-400 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center gap-2">
                            Start Challenge
                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>
        </aside>
    );
}

/* ── Top Navbar ── */
function Navbar({ onMenuOpen }: { onMenuOpen: () => void }) {
    const { user, signOut } = useAuth();

    return (
        <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    {/* Logo */}
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-lg transform transition-transform hover:scale-105 hover:rotate-3">
                            <span className="material-symbols-outlined text-2xl">school</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-extrabold tracking-tight text-slate-900">Elite<span className="text-sky-500">Academy</span></span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Hyper Learning Hub</span>
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-8">
                        {/* Search */}
                        <div className="hidden md:flex relative group">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-sky-500 transition-colors text-xl">search</span>
                            <input className="pl-12 pr-6 py-2.5 bg-slate-50/50 hover:bg-white border border-slate-200 hover:border-sky-200 rounded-full text-sm focus:ring-4 focus:ring-sky-100 focus:border-sky-400 w-72 transition-all outline-none shadow-inner text-slate-600 placeholder:text-slate-400"
                                placeholder="Search for knowledge..." type="text" />
                        </div>

                        {/* User */}
                        <div className="hidden sm:flex items-center gap-6 pl-6 border-l border-slate-200/60">
                            <div className="flex flex-col items-end">
                                <span className="text-sm font-bold text-slate-800">{user?.name || user?.email?.split("@")[0] || "Student"}</span>
                                <div className="flex items-center gap-1.5">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                                    </span>
                                    <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">Elite Member</span>
                                </div>
                            </div>
                            <button onClick={signOut} title="로그아웃"
                                className="w-11 h-11 rounded-full p-0.5 bg-gradient-to-br from-sky-300 to-indigo-300 shadow-lg cursor-pointer hover:shadow-xl transition-all flex items-center justify-center">
                                <div className="w-full h-full rounded-full bg-sky-100 flex items-center justify-center text-sky-700 font-bold text-sm border-2 border-white">
                                    {(user?.email?.charAt(0) || "U").toUpperCase()}
                                </div>
                            </button>
                        </div>

                        {/* Mobile hamburger */}
                        <button onClick={onMenuOpen} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors">
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

/* ── Mobile Sidebar Drawer ── */
function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const isActive = (href: string) => href === "/dashboard/learning" ? pathname === href : pathname.startsWith(href);

    if (!isOpen) return null;
    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-[60] lg:hidden" onClick={onClose} />
            <aside className="fixed top-0 left-0 z-[70] w-72 h-screen bg-white/95 backdrop-blur-xl border-r border-white/50 flex flex-col p-6 shadow-2xl lg:hidden">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-500 flex items-center justify-center text-white">
                        <span className="material-symbols-outlined text-xl">school</span>
                    </div>
                    <span className="text-lg font-extrabold text-slate-900">Elite<span className="text-sky-500">Academy</span></span>
                </div>
                <nav className="space-y-2 flex-1">
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href} onClick={onClose}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all
                            ${isActive(item.href) ? "bg-sky-50 text-sky-700 border border-sky-100" : "text-slate-500 hover:bg-slate-50"}`}>
                            <span className="material-symbols-outlined">{item.icon}</span>
                            {item.label}
                        </Link>
                    ))}
                </nav>
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
                {/* Fonts */}
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" />
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />

                <div className="min-h-screen flex flex-col relative overflow-x-hidden antialiased selection:bg-sky-500/20 selection:text-sky-700"
                    style={{ fontSize: '16px', fontFamily: "'Plus Jakarta Sans', sans-serif", background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', backgroundAttachment: 'fixed' }}>

                    {/* Floating orbs */}
                    <div className="floating-orb bg-blue-300 w-96 h-96 top-0 left-0 -translate-x-1/2 -translate-y-1/2 fixed" />
                    <div className="floating-orb bg-purple-200 w-[500px] h-[500px] bottom-0 right-0 translate-x-1/3 translate-y-1/3 fixed" />
                    <div className="floating-orb bg-cyan-200 w-64 h-64 top-1/3 right-1/4 opacity-40 fixed" />

                    {/* Top Navbar */}
                    <Navbar onMenuOpen={() => setSidebarOpen(true)} />

                    {/* Mobile Drawer */}
                    <MobileDrawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                    {/* Main Grid */}
                    <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
                        <LeftSidebar />
                        <div className="col-span-1 lg:col-span-10">
                            {children}
                        </div>
                    </main>
                </div>
            </AuthGate>
        </AuthProvider>
    );
}
