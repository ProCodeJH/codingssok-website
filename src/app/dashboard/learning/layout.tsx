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
    { icon: "storefront", label: "Store", href: "/dashboard/learning/store" },
    { icon: "settings", label: "Profile", href: "/dashboard/learning/profile" },
];

/* ── Auth Guard ── */
function AuthGate({ children }: { children: ReactNode }) {
    const { user, loading } = useAuth();
    useEffect(() => { if (!loading && !user) window.location.href = "/login"; }, [loading, user]);
    if (loading) return (
        <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg,#f0f9ff,#e0f2fe)" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, border: "4px solid #0ea5e9", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
                <p style={{ fontSize: 14, color: "#64748b" }}>로딩 중...</p>
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
        <aside style={{ display: "none" }} className="lg:!block lg:col-span-2">
            <div style={{ position: "sticky", top: 128, maxHeight: "calc(100vh - 10rem)", overflowY: "auto" }} className="hide-scrollbar">
                <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href}
                            style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
                                borderRadius: 16, fontSize: 14, fontWeight: isActive(item.href) ? 700 : 600,
                                textDecoration: "none", transition: "all 0.2s",
                                ...(isActive(item.href) ? {
                                    background: "#f0f9ff", color: "#0369a1",
                                    border: "1px solid #e0f2fe",
                                    boxShadow: "0 1px 3px rgba(14,165,233,0.1), 0 0 0 1px rgba(186,230,253,0.5)"
                                } : {
                                    background: "transparent", color: "#64748b",
                                    border: "1px solid transparent",
                                })
                            }}
                        >
                            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                {/* Daily Challenge Mini Card */}
                <div style={{ marginTop: 40, padding: "0 8px" }}>
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
                                <span style={{ fontSize: 10, fontWeight: 700, background: "rgba(255,255,255,0.1)", padding: "4px 10px", borderRadius: 999, color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.1)" }}>DAILY DROP</span>
                            </div>
                            <h4 style={{ fontWeight: 700, fontSize: 16, color: "#fff", marginBottom: 6, letterSpacing: "-0.02em" }}>Algorithm Sort</h4>
                            <p style={{ fontSize: 12, color: "rgba(203,213,225,0.8)", marginBottom: 16, fontWeight: 300, lineHeight: 1.6 }}>Optimize the sort function for O(n) complexity.</p>
                            <Link href="/dashboard/learning/challenge" style={{
                                display: "flex", width: "100%", padding: "10px 0", justifyContent: "center", alignItems: "center", gap: 8,
                                background: "linear-gradient(to right, #0ea5e9, #6366f1)", color: "#fff", borderRadius: 12, fontSize: 12, fontWeight: 700,
                                textDecoration: "none", boxShadow: "0 10px 15px -3px rgba(14,165,233,0.25)"
                            }}>
                                Start Challenge
                                <span className="material-symbols-outlined" style={{ fontSize: 12 }}>arrow_forward</span>
                            </Link>
                        </div>
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
        <nav style={{
            position: "sticky", top: 0, zIndex: 50, width: "100%",
            background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
            borderBottom: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
        }}>
            <div style={{ maxWidth: 1600, margin: "0 auto", padding: "0 24px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", height: 80, alignItems: "center" }}>
                    {/* Logo */}
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{
                            width: 44, height: 44, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
                            background: "linear-gradient(to top right, #0ea5e9, #6366f1)", color: "#fff",
                            boxShadow: "0 0 30px -5px rgba(14,165,233,0.4)"
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 24 }}>school</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a" }}>
                                Elite<span style={{ color: "#0ea5e9" }}>Academy</span>
                            </span>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.2em" }}>Hyper Learning Hub</span>
                        </div>
                    </div>

                    {/* Right */}
                    <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
                        {/* Search - hidden on mobile */}
                        <div className="hidden md:flex" style={{ position: "relative" }}>
                            <span className="material-symbols-outlined" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 20 }}>search</span>
                            <input style={{
                                paddingLeft: 48, paddingRight: 24, paddingTop: 10, paddingBottom: 10,
                                background: "rgba(241,245,249,0.5)", border: "1px solid #e2e8f0", borderRadius: 999,
                                fontSize: 14, width: 288, outline: "none", color: "#475569"
                            }} placeholder="Search for knowledge..." type="text" />
                        </div>

                        {/* User */}
                        <div className="hidden sm:flex" style={{ alignItems: "center", gap: 24, paddingLeft: 24, borderLeft: "1px solid rgba(226,232,240,0.6)" }}>
                            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                <span style={{ fontSize: 14, fontWeight: 700, color: "#1e293b" }}>{user?.name || user?.email?.split("@")[0] || "Student"}</span>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                                    <span style={{ fontSize: 10, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>Elite Member</span>
                                </div>
                            </div>
                            <button onClick={signOut} title="로그아웃" style={{
                                width: 44, height: 44, borderRadius: "50%", padding: 2,
                                background: "linear-gradient(to bottom right, #7dd3fc, #a5b4fc)",
                                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", cursor: "pointer", border: "none",
                                display: "flex", alignItems: "center", justifyContent: "center"
                            }}>
                                <div style={{
                                    width: "100%", height: "100%", borderRadius: "50%",
                                    background: "#e0f2fe", display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#0369a1", fontWeight: 700, fontSize: 14, border: "2px solid #fff"
                                }}>
                                    {(user?.email?.charAt(0) || "U").toUpperCase()}
                                </div>
                            </button>
                        </div>

                        {/* Mobile menu */}
                        <button onClick={onMenuOpen} className="lg:hidden" style={{
                            padding: 8, color: "#64748b", background: "transparent", border: "none",
                            borderRadius: 12, cursor: "pointer"
                        }}>
                            <span className="material-symbols-outlined">menu</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}

/* ── Mobile Drawer ── */
function MobileDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const pathname = usePathname();
    const isActive = (href: string) => href === "/dashboard/learning" ? pathname === href : pathname.startsWith(href);
    if (!isOpen) return null;
    return (
        <>
            <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 60 }} className="lg:hidden" />
            <aside style={{
                position: "fixed", top: 0, left: 0, zIndex: 70, width: 288, height: "100vh",
                background: "rgba(255,255,255,0.95)", backdropFilter: "blur(20px)", padding: 24,
                borderRight: "1px solid rgba(255,255,255,0.5)", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                display: "flex", flexDirection: "column"
            }} className="lg:hidden">
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 12, background: "linear-gradient(to top right, #0ea5e9, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>school</span>
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: "#0f172a" }}>Elite<span style={{ color: "#0ea5e9" }}>Academy</span></span>
                </div>
                <nav style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                    {NAV_ITEMS.map((item) => (
                        <Link key={item.href} href={item.href} onClick={onClose} style={{
                            display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 12,
                            fontSize: 14, fontWeight: 600, textDecoration: "none",
                            ...(isActive(item.href) ? { background: "#f0f9ff", color: "#0369a1", border: "1px solid #e0f2fe" } : { color: "#64748b", border: "1px solid transparent" })
                        }}>
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
                    <div className="floating-orb" style={{ background: "#93c5fd", width: 384, height: 384, top: 0, left: 0, transform: "translate(-50%,-50%)" }} />
                    <div className="floating-orb" style={{ background: "#e9d5ff", width: 500, height: 500, bottom: 0, right: 0, transform: "translate(33%,33%)" }} />
                    <div className="floating-orb" style={{ background: "#a5f3fc", width: 256, height: 256, top: "33%", right: "25%", opacity: 0.4 }} />

                    <Navbar onMenuOpen={() => setSidebarOpen(true)} />
                    <MobileDrawer isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                    {/* Main Grid */}
                    <main style={{
                        flex: 1, maxWidth: 1600, width: "100%", margin: "0 auto",
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
                            {children}
                        </div>
                    </main>
                </div>
            </AuthGate>
        </AuthProvider>
    );
}
