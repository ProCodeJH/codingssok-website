"use client";

import { useEffect, useState, ReactNode, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { getTierInfo } from "@/lib/xp-engine";
import { PageTransition } from "@/components/motion/page-transition";
import { GlowPulse } from "@/components/motion/motion";
import { Spotlight, MorphingGradient } from "@/components/motion/premium";

/* ── Nav Items (한글화 + 새 메뉴) ── */
const NAV_ITEMS = [
    { icon: "dashboard", label: "대시보드", href: "/dashboard/learning" },
    { icon: "library_books", label: "내 코스", href: "/dashboard/learning/courses" },
    { icon: "terminal", label: "C 컴파일러", href: "/dashboard/learning/compiler" },
    { icon: "assignment", label: "숙제 & 노트", href: "/dashboard/learning/homework" },
    { icon: "shield", label: "티어 & 승급", href: "/dashboard/learning/tier" },
    { icon: "task_alt", label: "미션 & 업적", href: "/dashboard/learning/missions" },
    { icon: "emoji_events", label: "챌린지", href: "/dashboard/learning/challenges" },
    { icon: "chat", label: "채팅", href: "/dashboard/learning/chat" },
    { icon: "diversity_3", label: "리더보드", href: "/dashboard/learning/leaderboard" },
    { icon: "storefront", label: "상점", href: "/dashboard/learning/store" },
    { icon: "menu_book", label: "수업자료", href: "/dashboard/learning/study" },
    { icon: "person", label: "프로필", href: "/dashboard/learning/profile" },
    { icon: "admin_panel_settings", label: "관리자", href: "/dashboard/learning/admin" },
];

/* ── Auth Guard ── */
function AuthGate({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    useEffect(() => { if (!loading && !user) window.location.href = "/login"; }, [loading, user]);
    if (loading) return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#f0f9ff,#e0f2fe)", position: "relative", overflow: "hidden" }}>
            <MorphingGradient colors={["#0ea5e9", "#6366f1", "#ec4899", "#14b8a6"]} speed={6} />
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, position: "relative", zIndex: 10 }}
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    style={{ width: 48, height: 48, border: "4px solid #0ea5e9", borderTopColor: "transparent", borderRadius: "50%" }}
                />
                <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ fontSize: 15, color: "#475569", fontWeight: 600, letterSpacing: "-0.01em" }}
                >코딩쏙 로딩 중...</motion.p>
            </motion.div>
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
        <aside style={{ display: "none" }} className="lg:!block lg:col-span-2">
            <div style={{ position: "sticky", top: 128, maxHeight: "calc(100vh - 10rem)", overflowY: "auto" }} className="hide-scrollbar">
                <Spotlight size={200} color="rgba(14,165,233,0.04)" style={{ borderRadius: 20 }}>
                    <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        {NAV_ITEMS.map((item, i) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.03, duration: 0.3 }}
                                whileHover={!isActive(item.href) ? { x: 4, backgroundColor: "rgba(240,249,255,0.5)" } : {}}
                                style={{ borderRadius: 14 }}
                            >
                                <Link href={item.href}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 12, padding: "11px 18px",
                                        borderRadius: 14, fontSize: 13, fontWeight: isActive(item.href) ? 700 : 500,
                                        textDecoration: "none", transition: "all 0.2s", position: "relative",
                                        ...(isActive(item.href) ? {
                                            background: "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(99,102,241,0.06))",
                                            color: "#0369a1",
                                            border: "1px solid rgba(14,165,233,0.12)",
                                            boxShadow: "0 2px 8px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.5)"
                                        } : {
                                            background: "transparent", color: "#64748b",
                                            border: "1px solid transparent",
                                        })
                                    }}
                                >
                                    {isActive(item.href) && (
                                        <motion.div
                                            layoutId="sidebar-active"
                                            style={{
                                                position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                                                width: 3, height: 20, borderRadius: 4,
                                                background: "linear-gradient(to bottom, #0ea5e9, #6366f1)",
                                                boxShadow: "0 0 8px rgba(14,165,233,0.4)",
                                            }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    <motion.span
                                        className="material-symbols-outlined"
                                        style={{ fontSize: 20, color: isActive(item.href) ? "#0ea5e9" : undefined }}
                                        whileHover={{ scale: 1.15, rotate: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    >{item.icon}</motion.span>
                                    <span>{item.label}</span>
                                    {isActive(item.href) && (
                                        <motion.div
                                            layoutId="sidebar-dot"
                                            style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#0ea5e9" }}
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </nav>
                </Spotlight>

                {/* 오늘의 챌린지 카드 */}
                <div style={{ marginTop: 32, padding: "0 8px" }}>
                    <div style={{
                        position: "relative", borderRadius: 24, padding: 20, overflow: "hidden",
                        boxShadow: "0 25px 50px -12px rgba(99,102,241,0.2)",
                    }}>
                        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom right, #0f172a, #1e1b4b, #0f172a)" }} />
                        <div style={{ position: "absolute", right: -16, top: -16, width: 128, height: 128, background: "rgba(14,165,233,0.2)", borderRadius: "50%", filter: "blur(48px)" }} />
                        <div style={{ position: "relative", zIndex: 10 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                <div style={{ padding: 6, background: "rgba(234,179,8,0.2)", borderRadius: 8, border: "1px solid rgba(234,179,8,0.3)" }}>
                                    <span className="material-symbols-outlined" style={{ color: "#facc15", fontSize: 18, display: "block" }}>bolt</span>
                                </div>
                                <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: 999, color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}>오늘의 챌린지</span>
                            </div>
                            <h4 style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>C언어 도전하기</h4>
                            <p style={{ fontSize: 12, color: "rgba(203,213,225,0.8)", marginBottom: 16, fontWeight: 300, lineHeight: 1.6 }}>매일 새로운 C언어 문제에 도전해보세요!</p>
                            <GlowPulse color="rgba(99,102,241,0.5)">
                                <Link href="/dashboard/learning/courses" style={{
                                    display: "flex", width: "100%", padding: "10px 0", justifyContent: "center", alignItems: "center", gap: 8,
                                    background: "linear-gradient(to right, #0ea5e9, #6366f1)", color: "#fff", borderRadius: 12, fontSize: 12, fontWeight: 700,
                                    textDecoration: "none", boxShadow: "0 10px 15px -3px rgba(14,165,233,0.25)"
                                }}>
                                    도전 시작
                                    <span className="material-symbols-outlined" style={{ fontSize: 12 }}>arrow_forward</span>
                                </Link>
                            </GlowPulse>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}

/* ── Top Navbar (scroll-aware) ── */
function Navbar({ onMenuOpen }: { onMenuOpen: () => void }) {
    const { user, signOut } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                position: "sticky", top: 0, zIndex: 50, width: "100%",
                background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
                backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(12px)",
                WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "blur(12px)",
                borderBottom: `1px solid ${scrolled ? "rgba(226,232,240,0.5)" : "rgba(255,255,255,0.3)"}`,
                boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)" : "none",
                transition: "background 0.3s, border-bottom 0.3s, box-shadow 0.3s, backdrop-filter 0.3s",
            }}
        >
            <div style={{ maxWidth: 1800, margin: "0 auto", padding: "0 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", height: 76, alignItems: "center" }}>
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        style={{ display: "flex", alignItems: "center", gap: 14, cursor: "pointer" }}
                    >
                        <motion.div
                            whileHover={{ rotate: 8, scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400, damping: 15 }}
                            style={{
                                width: 42, height: 42, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center",
                                background: "linear-gradient(135deg, #0ea5e9, #6366f1)", color: "#fff",
                                boxShadow: "0 8px 24px -4px rgba(14,165,233,0.35)"
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>school</span>
                        </motion.div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a" }}>
                                코딩<span style={{ color: "#0ea5e9" }}>쏙</span>
                            </span>
                            <span style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase" }}>Learning Dashboard</span>
                        </div>
                    </motion.div>

                    {/* Right */}
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                        {/* Search */}
                        <div className="hidden md:flex" style={{ position: "relative" }}>
                            <span className="material-symbols-outlined" style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 18 }}>search</span>
                            <input style={{
                                paddingLeft: 42, paddingRight: 20, paddingTop: 9, paddingBottom: 9,
                                background: scrolled ? "rgba(241,245,249,0.7)" : "rgba(241,245,249,0.4)",
                                border: "1px solid rgba(226,232,240,0.6)", borderRadius: 999,
                                fontSize: 13, width: 260, outline: "none", color: "#475569",
                                transition: "all 0.3s",
                            }} placeholder="코스, 문제 검색..." type="text" />
                        </div>

                        {/* User */}
                        <div className="hidden sm:flex" style={{ alignItems: "center", gap: 16, paddingLeft: 20, borderLeft: "1px solid rgba(226,232,240,0.5)" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                <span style={{ fontSize: 13, fontWeight: 700, color: "#1e293b" }}>{user?.name || user?.email?.split("@")[0] || "학생"}</span>
                                <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                                    <motion.span
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 6px rgba(34,197,94,0.4)" }}
                                    />
                                    <span style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>접속 중</span>
                                </div>
                            </div>
                            <motion.button
                                onClick={signOut} title="로그아웃"
                                whileHover={{ scale: 1.08, boxShadow: "0 8px 24px rgba(14,165,233,0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                style={{
                                    width: 42, height: 42, borderRadius: "50%", padding: 2,
                                    background: "linear-gradient(135deg, #7dd3fc, #a5b4fc)",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)", cursor: "pointer", border: "none",
                                    display: "flex", alignItems: "center", justifyContent: "center"
                                }}
                            >
                                <div style={{
                                    width: "100%", height: "100%", borderRadius: "50%",
                                    background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#0369a1", fontWeight: 700, fontSize: 14, border: "2px solid #fff"
                                }}>
                                    {(user?.email?.charAt(0) || "U").toUpperCase()}
                                </div>
                            </motion.button>
                        </div>

                        {/* Mobile menu */}
                        <motion.button
                            onClick={onMenuOpen} className="lg:hidden"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            style={{
                                padding: 8, color: "#64748b", background: "transparent", border: "none",
                                borderRadius: 12, cursor: "pointer"
                            }}
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </motion.button>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}

/* ── Mobile Drawer (AnimatePresence) ── */
function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const isActive = (href: string) => href === "/dashboard/learning" ? pathname === href : pathname.startsWith(href);
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        onClick={onClose}
                        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 60 }}
                        className="lg:hidden"
                    />
                    <motion.aside
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                            position: "fixed", top: 0, left: 0, zIndex: 70, width: 288, height: "100vh",
                            background: "rgba(255,255,255,0.95)", backdropFilter: "blur(24px)", padding: 24,
                            borderRight: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                            display: "flex", flexDirection: "column"
                        }}
                        className="lg:hidden"
                    >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(135deg, #0ea5e9, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>school</span>
                                </div>
                                <span style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>코딩<span style={{ color: "#0ea5e9" }}>쏙</span></span>
                            </div>
                            <motion.button
                                onClick={onClose}
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                style={{ width: 32, height: 32, borderRadius: 10, border: "none", background: "#f1f5f9", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                            >
                                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#64748b" }}>close</span>
                            </motion.button>
                        </div>
                        <nav style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
                            {NAV_ITEMS.map((item, i) => (
                                <motion.div
                                    key={item.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.03 }}
                                >
                                    <Link href={item.href} onClick={onClose} style={{
                                        display: "flex", alignItems: "center", gap: 12, padding: "11px 16px", borderRadius: 12,
                                        fontSize: 14, fontWeight: 600, textDecoration: "none",
                                        ...(isActive(item.href) ? { background: "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(99,102,241,0.06))", color: "#0369a1", border: "1px solid rgba(14,165,233,0.12)" } : { color: "#64748b", border: "1px solid transparent" })
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                                        {item.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}

/* ── Layout ── */
export default function LearningLayout({ children }: { children: ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <AuthProvider>
            <AuthGate>
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" />
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />

                <style>{`
                    @keyframes spin { to { transform: rotate(360deg); } }
                    .lg\\:!block { display: block !important; }
                    @media (max-width: 1023px) { .lg\\:!block { display: none !important; } }
                `}</style>

                <div style={{
                    minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative",
                    overflowX: "hidden", fontSize: 16,
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                    backgroundAttachment: "fixed",
                    WebkitFontSmoothing: "antialiased",
                }}>
                    {/* Floating orbs */}
                    <div className="floating-orb floating-orb--1" style={{ background: "#93c5fd", width: 384, height: 384, top: 0, left: 0 }} />
                    <div className="floating-orb floating-orb--2" style={{ background: "#e9d5ff", width: 500, height: 500, bottom: 0, right: 0 }} />
                    <div className="floating-orb floating-orb--3" style={{ background: "#a5f3fc", width: 256, height: 256, top: "33%", right: "25%" }} />

                    <Navbar onMenuOpen={() => setSidebarOpen(true)} />
                    <MobileDrawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                    {/* Main Grid */}
                    <main style={{
                        flex: 1, maxWidth: 1800, width: "100%", margin: "0 auto",
                        padding: "40px 24px",
                        display: "grid", gridTemplateColumns: "1fr",
                        gap: 32, position: "relative", zIndex: 10,
                    }} className="lg:!grid-cols-12">
                        <style>{`
                            @media (min-width: 1024px) {
                                .lg\\:!grid-cols-12 { grid-template-columns: repeat(12, minmax(0, 1fr)) !important; }
                                .lg\\:col-span-2 { grid-column: span 2 / span 2; }
                                .lg\\:col-span-10 { grid-column: span 10 / span 10; }
                            }
                        `}</style>
                        <LeftSidebar />
                        <div className="lg:col-span-10">
                            <PageTransition>
                                {children}
                            </PageTransition>
                        </div>
                    </main>
                </div>
            </AuthGate>
        </AuthProvider>
    );
}
