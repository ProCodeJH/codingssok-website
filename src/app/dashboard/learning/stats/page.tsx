"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Styles ── */
const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

const sectionTitle: React.CSSProperties = {
    fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const,
    letterSpacing: "0.08em", marginBottom: 16,
};

export default function PlayerStatsPage() {
    const { user } = useAuth();
    const { progress } = useUserProgress();
    const displayName = user?.name || user?.email?.split("@")[0] || "Alex Coder";
    const initial = (user?.email?.charAt(0) || "A").toUpperCase();

    return (
        <>
            <style>{`
                @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
                @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
                .floating-emblem { animation: float 6s ease-in-out infinite; }
                .shimmer-bg { background: linear-gradient(90deg, #13daec 0%, #a0f4fc 50%, #13daec 100%); background-size: 200% 100%; animation: shimmer 3s infinite linear; }
                @media (min-width: 1024px) { .stats-grid { grid-template-columns: 3fr 6fr 3fr !important; } }
            `}</style>

            {/* Breadcrumbs */}
            <div style={{ marginBottom: 32, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#64748b", marginBottom: 4 }}>
                        <span>Home</span>
                        <span className="material-symbols-outlined" style={{ fontSize: 10 }}>arrow_forward_ios</span>
                        <span style={{ color: "#13daec", fontWeight: 500 }}>Profile</span>
                    </div>
                    <h1 style={{ fontSize: 30, fontWeight: 900, letterSpacing: "-0.02em", color: "#0f172a", margin: 0 }}>Player Stats</h1>
                </div>
                <button style={{
                    display: "flex", alignItems: "center", gap: 8, padding: "8px 16px",
                    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 8,
                    fontSize: 14, fontWeight: 600, cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                    color: "#475569",
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>share</span>
                    Share Profile
                </button>
            </div>

            {/* Main Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }} className="stats-grid">

                {/* ═══ Left Column: Identity ═══ */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* Profile Card */}
                    <div style={{ ...glassCard, borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at center, rgba(19,218,236,0.15) 0%, rgba(19,218,236,0) 70%)", opacity: 0.5 }} />

                        <div style={{ position: "relative", marginBottom: 16 }}>
                            <div style={{
                                width: 128, height: 128, borderRadius: "50%", padding: 4,
                                background: "linear-gradient(to top right, #13daec, #3b82f6)",
                                boxShadow: "0 10px 15px -3px rgba(19,218,236,0.2)",
                            }}>
                                <div style={{
                                    width: "100%", height: "100%", borderRadius: "50%", border: "4px solid #fff",
                                    background: "linear-gradient(to bottom right, #e0f2fe, #c7d2fe)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 40, fontWeight: 800, color: "#0369a1",
                                }}>
                                    {initial}
                                </div>
                            </div>
                            <div style={{ position: "absolute", bottom: 8, right: 8, width: 16, height: 16, borderRadius: "50%", background: "#22c55e", border: "2px solid #fff" }} />
                        </div>

                        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0", position: "relative", zIndex: 1 }}>{displayName}</h2>
                        <p style={{ color: "#64748b", fontSize: 14, fontWeight: 500, marginBottom: 4, position: "relative", zIndex: 1 }}>@{displayName.toLowerCase().replace(/\s/g, "")}</p>
                        <div style={{
                            padding: "4px 12px", background: "rgba(19,218,236,0.1)", color: "#13daec",
                            fontSize: 12, fontWeight: 700, borderRadius: 999, textTransform: "uppercase",
                            letterSpacing: "0.05em", marginBottom: 24, position: "relative", zIndex: 1,
                        }}>
                            Level 42 Architect
                        </div>

                        <div style={{
                            display: "grid", gridTemplateColumns: "1fr 1fr", width: "100%", gap: 16,
                            marginBottom: 24, borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9",
                            padding: "16px 0", position: "relative", zIndex: 1,
                        }}>
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <span style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>1.2k</span>
                                <span style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Followers</span>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", borderLeft: "1px solid #f1f5f9" }}>
                                <span style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>45</span>
                                <span style={{ fontSize: 12, color: "#64748b", textTransform: "uppercase", fontWeight: 600 }}>Following</span>
                            </div>
                        </div>

                        <button style={{
                            width: "100%", padding: "10px 0", borderRadius: 8,
                            border: "1px solid #e2e8f0", fontSize: 14, fontWeight: 700,
                            color: "#475569", background: "#fff", cursor: "pointer",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.05)", position: "relative", zIndex: 1,
                        }}>
                            Edit Profile
                        </button>
                    </div>

                    {/* Top Badges */}
                    <div style={{ ...glassCard, borderRadius: 16, padding: 20 }}>
                        <h3 style={sectionTitle}>Top Badges</h3>
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                            {[
                                { icon: "emoji_events", bg: "#fef9c3", color: "#ca8a04" },
                                { icon: "pest_control", bg: "#f3e8ff", color: "#7c3aed" },
                                { icon: "trending_up", bg: "#ffe4e6", color: "#e11d48" },
                            ].map((b, i) => (
                                <div key={i} style={{
                                    width: 40, height: 40, borderRadius: "50%",
                                    background: b.bg, color: b.color,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <span className="material-symbols-outlined">{b.icon}</span>
                                </div>
                            ))}
                            <div style={{
                                width: 40, height: 40, borderRadius: "50%",
                                background: "#f8fafc", color: "#94a3b8",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                border: "1px dashed #cbd5e1",
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>add</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ═══ Center Column: League Hub ═══ */}
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* Hero Rank Card */}
                    <div style={{
                        ...glassCard, borderRadius: 16, padding: 32, position: "relative",
                        overflow: "hidden", minHeight: 400, display: "flex", flexDirection: "column",
                        alignItems: "center", justifyContent: "center", textAlign: "center",
                    }}>
                        {/* BG elements */}
                        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')", opacity: 0.03 }} />
                        <div style={{ position: "absolute", top: -80, right: -80, width: 256, height: 256, background: "rgba(19,218,236,0.2)", filter: "blur(48px)", borderRadius: "50%" }} />
                        <div style={{ position: "absolute", bottom: 0, left: 0, width: 160, height: 160, background: "rgba(59,130,246,0.1)", filter: "blur(48px)", borderRadius: "50%" }} />

                        {/* Diamond emblem */}
                        <div className="floating-emblem" style={{ marginBottom: 24, position: "relative", zIndex: 10 }}>
                            <svg width="180" height="180" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ filter: "drop-shadow(0 10px 30px rgba(19,218,236,0.4))" }}>
                                <defs>
                                    <linearGradient id="diamondGrad" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#A0F4FC" stopOpacity="0.9" />
                                        <stop offset="1" stopColor="#13DAEC" stopOpacity="0.6" />
                                    </linearGradient>
                                </defs>
                                <path d="M100 20L170 60L100 180L30 60L100 20Z" fill="url(#diamondGrad)" stroke="white" strokeWidth="2" />
                                <path d="M100 20L100 180" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                                <path d="M30 60L170 60" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                            </svg>
                        </div>

                        <div style={{ position: "relative", zIndex: 10 }}>
                            <h2 style={{ fontSize: 36, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.02em", margin: "0 0 8px 0" }}>Diamond League II</h2>
                            <p style={{ color: "#64748b", fontWeight: 500, margin: 0 }}>Top 2% Globally • Season ends in 4 days</p>
                        </div>

                        {/* XP Progress */}
                        <div style={{ width: "100%", maxWidth: 400, marginTop: 32, position: "relative", zIndex: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, fontWeight: 700, marginBottom: 8 }}>
                                <span style={{ color: "#475569" }}>Current XP</span>
                                <span style={{ color: "#13daec" }}>{progress.xp} / 3,000</span>
                            </div>
                            <div style={{
                                height: 16, background: "#f1f5f9", borderRadius: 999, overflow: "hidden",
                                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.06)", border: "1px solid #e2e8f0",
                            }}>
                                <div className="shimmer-bg" style={{
                                    height: "100%", width: `${Math.min((progress.xp / 3000) * 100, 100)}%`,
                                    borderRadius: 999, boxShadow: "0 0 15px rgba(19,218,236,0.5)",
                                }} />
                            </div>
                            <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 8 }}>
                                {3000 - progress.xp} XP to reach <strong style={{ color: "#475569" }}>Master League</strong>
                            </p>
                        </div>

                        {/* Battle Pass Rewards */}
                        <div style={{ marginTop: 32, display: "flex", gap: 16, position: "relative", zIndex: 10 }}>
                            {[
                                { icon: "lock_open", label: "Skin", locked: false },
                                { icon: "diamond", label: "Gems", locked: false },
                                { icon: "lock", label: "Lvl 43", locked: true },
                            ].map((r, i) => (
                                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", opacity: r.locked ? 0.5 : 1 }}>
                                    <div style={{
                                        width: 48, height: 48, borderRadius: 12,
                                        background: r.locked ? "#f8fafc" : "linear-gradient(to bottom right, #f8fafc, #f1f5f9)",
                                        border: r.locked ? "1px dashed #cbd5e1" : "1px solid #e2e8f0",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    }}>
                                        <span className="material-symbols-outlined" style={{ color: r.locked ? "#cbd5e1" : "#94a3b8" }}>{r.icon}</span>
                                    </div>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: r.locked ? "#cbd5e1" : "#94a3b8", textTransform: "uppercase" }}>{r.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Active Challenges */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                        {[
                            { icon: "local_fire_department", title: "Daily Streak", desc: "Log in for 7 days in a row", progress: 5, total: 7, color: "#f97316", bg: "#fff7ed", unit: "Days" },
                            { icon: "code", title: "Code Reviewer", desc: "Review 10 peer projects", progress: 3, total: 10, color: "#6366f1", bg: "#eef2ff", unit: "Reviews" },
                        ].map((c, i) => (
                            <div key={i} style={{
                                background: "#fff", border: "1px solid #f1f5f9", borderRadius: 12,
                                padding: 20, display: "flex", alignItems: "flex-start", gap: 16,
                                boxShadow: "0 1px 2px rgba(0,0,0,0.05)", cursor: "pointer",
                            }}>
                                <div style={{ padding: 12, borderRadius: 8, background: c.bg, color: c.color }}>
                                    <span className="material-symbols-outlined">{c.icon}</span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>{c.title}</h4>
                                    <p style={{ fontSize: 14, color: "#64748b", marginBottom: 8 }}>{c.desc}</p>
                                    <div style={{ width: "100%", height: 6, background: "#f1f5f9", borderRadius: 999 }}>
                                        <div style={{ height: "100%", borderRadius: 999, background: c.color, width: `${(c.progress / c.total) * 100}%` }} />
                                    </div>
                                    <p style={{ fontSize: 12, textAlign: "right", marginTop: 4, fontFamily: "monospace", color: c.color }}>{c.progress}/{c.total} {c.unit}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═══ Right Column: Timeline ═══ */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ ...glassCard, borderRadius: 16, padding: 24, border: "1px solid #e2e8f0", height: "100%" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                            <h3 style={{ fontWeight: 700, color: "#0f172a", margin: 0 }}>Recent Activity</h3>
                            <button style={{ color: "#13daec", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                                <span className="material-symbols-outlined">history</span>
                            </button>
                        </div>

                        <div style={{ position: "relative", paddingLeft: 16, borderLeft: "2px solid #f1f5f9" }}>
                            {/* Timeline items */}
                            {[
                                {
                                    color: "#13daec", label: "Level Up!", time: "2h ago",
                                    content: <>Reached <strong style={{ color: "#0f172a" }}>Level 42</strong></>,
                                    badge: "+500 XP", badgeBg: "rgba(19,218,236,0.1)", badgeColor: "#13daec",
                                },
                                {
                                    color: "#a855f7", label: "Achievement", time: "5h ago",
                                    content: (
                                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
                                            <div style={{ padding: 6, background: "#f3e8ff", borderRadius: 6, color: "#7c3aed" }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>pest_control</span>
                                            </div>
                                            <span>Bug Squasher</span>
                                        </div>
                                    ),
                                    subtitle: "Fixed 50 bugs in the academy projects.",
                                },
                                {
                                    color: "#3b82f6", label: "Course", time: "1d ago",
                                    content: <>Completed <strong>Advanced React Patterns</strong></>,
                                    subtitle: "Reviewed by 5 peers",
                                },
                            ].map((item, i) => (
                                <div key={i} style={{ position: "relative", marginBottom: i < 2 ? 32 : 0 }}>
                                    <div style={{
                                        position: "absolute", left: -21, top: 4, width: 12, height: 12,
                                        borderRadius: "50%", background: item.color,
                                        boxShadow: `0 0 0 4px #fff`,
                                    }} />
                                    <div style={{
                                        background: "#fff", border: "1px solid #f1f5f9",
                                        padding: 16, borderRadius: 12,
                                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: item.color, textTransform: "uppercase", letterSpacing: "0.05em" }}>{item.label}</span>
                                            <span style={{ fontSize: 10, color: "#94a3b8" }}>{item.time}</span>
                                        </div>
                                        <div style={{ fontSize: 14, fontWeight: 500, color: "#475569", marginBottom: 4 }}>{item.content}</div>
                                        {item.subtitle && <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>{item.subtitle}</p>}
                                        {item.badge && (
                                            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                                                <span style={{ padding: "2px 8px", borderRadius: 4, background: item.badgeBg, color: item.badgeColor, fontSize: 10, fontFamily: "monospace" }}>{item.badge}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button style={{
                            width: "100%", marginTop: 32, paddingTop: 16, fontSize: 14,
                            color: "#64748b", background: "none", border: "none", cursor: "pointer",
                            fontWeight: 500, borderTop: "1px solid #f1f5f9",
                        }}>
                            View All History
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
