"use client";

import { useUserProgress } from "@/hooks/useUserProgress";
import { useState } from "react";

/* ── Styles ── */
const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.65)",
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.02), inset 0 0 20px rgba(255,255,255,0.5)",
};

/* ── Course Data ── */
const COURSES = [
    {
        id: "foundations", title: "Coding Foundations",
        desc: "First steps into programming. Master variables, loops, and basic logic structures with interactive puzzles.",
        icon: "extension", problems: 80, tag: "Beginner", status: "completed" as const,
        gradient: "linear-gradient(to right, #34d399, #14b8a6)",
        iconBg: { background: "linear-gradient(to bottom right, #ecfdf5, #f0fdfa)", border: "1px solid #d1fae5" },
        iconColor: "#059669",
        statusBg: "#dcfce7", statusColor: "#15803d", statusBorder: "rgba(187,247,208,0.5)",
        btnStyle: { background: "#fff", border: "1px solid #a7f3d0", color: "#059669" } as React.CSSProperties,
        btnLabel: "Review Course", btnIcon: "rocket_launch",
    },
    {
        id: "thinking", title: "Computational Thinking",
        desc: "Enhance logical problem solving skills and sophisticated algorithmic approaches for complex systems.",
        icon: "psychology", problems: 120, tag: "Logic", status: "completed" as const,
        gradient: "linear-gradient(to right, #a78bfa, #e879f9)",
        iconBg: { background: "linear-gradient(to bottom right, #faf5ff, #fdf4ff)", border: "1px solid #e9d5ff" },
        iconColor: "#7c3aed",
        statusBg: "#f3e8ff", statusColor: "#7e22ce", statusBorder: "rgba(233,213,255,0.5)",
        btnStyle: { background: "#fff", border: "1px solid #d8b4fe", color: "#7c3aed" } as React.CSSProperties,
        btnLabel: "Review Course", btnIcon: "rocket_launch",
    },
    {
        id: "python", title: "Python Masterclass",
        desc: "Deep dive into Python architecture. From syntax sugar to advanced data structures and memory models.",
        icon: "code", problems: 150, tag: "Advanced", status: "active" as const,
        gradient: "linear-gradient(to right, #38bdf8, #3b82f6, #6366f1)",
        iconBg: { background: "linear-gradient(to top right, #0ea5e9, #2563eb)", border: "none" },
        iconColor: "#fff",
        statusBg: "#e0f2fe", statusColor: "#0369a1", statusBorder: "#bae6fd",
        btnStyle: { background: "linear-gradient(to right, #0ea5e9, #2563eb)", color: "#fff", border: "none", boxShadow: "0 10px 15px -3px rgba(14,165,233,0.25)" } as React.CSSProperties,
        btnLabel: "Continue Learning", btnIcon: "play_arrow",
    },
    {
        id: "c-lang", title: "C Language",
        desc: "Low level programming concepts and manual memory management techniques for systems programming.",
        icon: "bolt", problems: 200, tag: "System", status: "locked" as const,
        gradient: "linear-gradient(to right, #cbd5e1, #cbd5e1)",
        iconBg: { background: "#f1f5f9", border: "1px solid #e2e8f0" },
        iconColor: "#94a3b8",
        statusBg: "#f1f5f9", statusColor: "#64748b", statusBorder: "#e2e8f0",
        btnStyle: { background: "#f1f5f9", color: "#94a3b8", border: "1px solid #e2e8f0", cursor: "not-allowed" } as React.CSSProperties,
        btnLabel: "Start Learning", btnIcon: "lock",
    },
];

const ROADMAP = [
    { title: "Foundations", icon: "check_circle", status: "done" as const },
    { title: "Logic", icon: "psychology", status: "done" as const },
    { title: "Python", icon: "code", status: "active" as const },
    { title: "C Language", icon: "data_object", status: "locked" as const },
    { title: "Masters", icon: "military_tech", status: "locked" as const },
];

const CLASSMATES = [
    { name: "Sarah K.", initial: "S", msg: 'Completed <span style="color:#0284c7;font-weight:600">Memory Mgmt</span> with 98% score! 🎉', time: "2m" },
    { name: "Mike R.", initial: "M", msg: 'Started the <span style="color:#4f46e5;font-weight:600">Pointer Quiz</span>.', time: "15m" },
    { name: "John Doe", initial: "JD", msg: 'Earned "Bug Hunter" Badge 🏅', time: "1h" },
];

export default function JourneyPage() {
    const { progress } = useUserProgress();
    const [filter, setFilter] = useState("all");

    return (
        <>
            <style>{`
                @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
                @keyframes ping { 75%,100% { transform: scale(2); opacity: 0; } }
                @keyframes bounce { 0%,100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); } 50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); } }
                @keyframes spin3 { to { transform: rotate(360deg); } }
                @keyframes spin10 { to { transform: rotate(360deg); } }
                @media (min-width: 1024px) {
                    .lg-col-7 { grid-column: span 7 / span 7; }
                    .lg-col-3 { grid-column: span 3 / span 3; }
                }
            `}</style>

            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }} className="lg-grid-10">
                <style>{`@media (min-width: 1024px) { .lg-grid-10 { grid-template-columns: 7fr 3fr !important; } }`}</style>

                {/* ═══ Main Content ═══ */}
                <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>

                    {/* ── Quick Access Modules (from /dashboard) ── */}
                    <div>
                        <h2 style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                            <span className="material-symbols-outlined" style={{ color: "#0ea5e9", fontSize: 20 }}>widgets</span>
                            Quick Access
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                            {[
                                { title: "C 컴파일러", desc: "코드 작성 & 실행", href: "/dashboard/learning/compiler", icon: "terminal", color: "#ec4899", gradient: "linear-gradient(135deg, #ec4899, #f43f5e)" },
                                { title: "숙제 & 노트", desc: "숙제 확인 · 노트 관리", href: "/dashboard/learning/homework", icon: "assignment", color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b, #f97316)" },
                                { title: "My Courses", desc: "코스 목록 & 진행률", href: "/dashboard/learning/courses", icon: "library_books", color: "#0ea5e9", gradient: "linear-gradient(135deg, #0ea5e9, #3b82f6)" },
                                { title: "Achievements", desc: "목표 & 도전과제", href: "/dashboard/learning/goals", icon: "emoji_events", color: "#8b5cf6", gradient: "linear-gradient(135deg, #8b5cf6, #6366f1)" },
                                { title: "Leaderboard", desc: "랭킹 보드", href: "/dashboard/learning/leaderboard", icon: "diversity_3", color: "#14b8a6", gradient: "linear-gradient(135deg, #14b8a6, #06b6d4)" },
                                { title: "Player Stats", desc: "학습 통계", href: "/dashboard/learning/stats", icon: "sports_esports", color: "#ef4444", gradient: "linear-gradient(135deg, #ef4444, #f97316)" },
                            ].map((m) => (
                                <a key={m.title} href={m.href} style={{
                                    ...glassCard, borderRadius: 16, padding: "16px 18px", textDecoration: "none",
                                    display: "flex", alignItems: "center", gap: 12, transition: "all 0.2s",
                                    cursor: "pointer",
                                }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
                                        background: m.gradient, color: "#fff", flexShrink: 0,
                                        boxShadow: `0 4px 12px ${m.color}30`,
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{m.icon}</span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{m.title}</div>
                                        <div style={{ fontSize: 11, color: "#94a3b8" }}>{m.desc}</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* ── Learning Roadmap ── */}
                    <div style={{ ...glassCard, borderRadius: 40, padding: 32, position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: "linear-gradient(to right, #38bdf8, #6366f1, transparent)", opacity: 0.5 }} />
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
                            <div>
                                <h2 style={{ fontWeight: 800, fontSize: 24, color: "#0f172a", display: "flex", alignItems: "center", gap: 12, margin: 0 }}>
                                    <span style={{ padding: 8, background: "#e0f2fe", color: "#0284c7", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>map</span>
                                    </span>
                                    Learning Path
                                </h2>
                                <p style={{ color: "#64748b", fontSize: 14, marginTop: 4, marginLeft: 56 }}>Your personalized curriculum to mastery</p>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#0369a1", background: "#f0f9ff", border: "1px solid #e0f2fe", padding: "6px 16px", borderRadius: 999, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>Recommended Path</span>
                        </div>

                        <div style={{ position: "relative", minWidth: 600, paddingTop: 16, paddingBottom: 48, paddingLeft: 8, paddingRight: 8, overflowX: "auto" }} className="hide-scrollbar">
                            {/* Connecting line */}
                            <div style={{ position: "absolute", top: 56, left: 32, right: 32, height: 3, borderRadius: 99, background: "linear-gradient(90deg, #38bdf8 0%, #818cf8 50%, #e2e8f0 100%)", boxShadow: "0 0 10px rgba(56,189,248,0.3)" }} />

                            <div style={{ display: "flex", justifyContent: "space-between", position: "relative", zIndex: 10 }}>
                                {ROADMAP.map((node, i) => (
                                    <div key={i} style={{
                                        display: "flex", flexDirection: "column", alignItems: "center", width: 128,
                                        cursor: node.status === "locked" ? "not-allowed" : "pointer",
                                        opacity: node.status === "locked" ? 0.5 : 1,
                                        transition: "all 0.3s"
                                    }}>
                                        <div style={{ position: "relative", marginBottom: 16 }}>
                                            {/* Active rings */}
                                            {node.status === "active" && (
                                                <>
                                                    <div style={{ position: "absolute", inset: -16, borderRadius: "50%", border: "1px solid rgba(56,189,248,0.3)", animation: "spin10 10s linear infinite" }} />
                                                    <div style={{ position: "absolute", inset: -16, borderRadius: "50%", borderTop: "2px solid #0ea5e9", borderRight: "2px solid transparent", borderBottom: "2px solid transparent", borderLeft: "2px solid transparent", animation: "spin3 3s linear infinite" }} />
                                                </>
                                            )}

                                            <div style={{
                                                width: node.status === "active" ? 96 : 80,
                                                height: node.status === "active" ? 96 : 80,
                                                borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                                background: node.status === "locked" ? "rgba(241,245,249,0.5)" : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.4))",
                                                border: "1px solid rgba(255,255,255,0.9)",
                                                boxShadow: node.status === "active"
                                                    ? "0 0 15px rgba(14,165,233,0.4), inset 0 0 10px rgba(14,165,233,0.2), 6px 6px 12px rgba(164,194,244,0.2), -6px -6px 12px rgba(255,255,255,0.9)"
                                                    : "6px 6px 12px rgba(164,194,244,0.2), -6px -6px 12px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.9), inset -2px -2px 4px rgba(164,194,244,0.1)",
                                                ...(node.status === "active" ? { marginTop: -8 } : {}),
                                            }}>
                                                <span className="material-symbols-outlined" style={{
                                                    fontSize: node.status === "active" ? 36 : 28,
                                                    color: node.status === "done" ? "#22c55e" : node.status === "active" ? "#0284c7" : "#94a3b8",
                                                    ...(node.status === "active" ? { filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" } : {}),
                                                }}>
                                                    {node.status === "done" ? "check_circle" : node.icon}
                                                </span>
                                            </div>

                                            {/* Glow */}
                                            {node.status === "done" && <div style={{ position: "absolute", inset: 0, background: "rgba(34,197,94,0.2)", borderRadius: "50%", filter: "blur(20px)", zIndex: -1 }} />}
                                            {node.status === "active" && <div style={{ position: "absolute", inset: 0, background: "rgba(14,165,233,0.3)", borderRadius: "50%", filter: "blur(32px)", zIndex: -1, animation: "pulse 2s ease-in-out infinite" }} />}

                                            {/* Badges */}
                                            {node.status === "active" && (
                                                <div style={{ position: "absolute", top: -8, right: -8, background: "linear-gradient(to right, #0ea5e9, #6366f1)", borderRadius: "50%", padding: 8, border: "2px solid #fff", zIndex: 30, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)", animation: "bounce 1s infinite" }}>
                                                    <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 10, fontWeight: 700, display: "block" }}>play_arrow</span>
                                                </div>
                                            )}
                                            {node.status === "locked" && (
                                                <div style={{ position: "absolute", top: -4, right: -4, background: "#94a3b8", borderRadius: "50%", padding: 6, border: "2px solid #fff", zIndex: 20, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                                                    <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 12, fontWeight: 700, display: "block" }}>lock</span>
                                                </div>
                                            )}
                                        </div>

                                        <div style={{ textAlign: "center", ...(node.status === "active" ? { marginTop: 8 } : {}) }}>
                                            {node.status === "active" ? (
                                                <h4 style={{ fontWeight: 800, fontSize: 16, margin: "0 0 4px 0", background: "linear-gradient(to right, #0284c7, #4f46e5)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{node.title}</h4>
                                            ) : (
                                                <h4 style={{ fontWeight: 700, fontSize: 14, margin: "0 0 4px 0", color: node.status === "locked" ? "#64748b" : "#1e293b" }}>{node.title}</h4>
                                            )}
                                            {node.status === "active" ? (
                                                <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 999, background: "#e0f2fe", fontSize: 10, color: "#0369a1", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", border: "1px solid #bae6fd" }}>In Progress</span>
                                            ) : (
                                                <p style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>
                                                    {node.status === "done" ? "Completed" : "Locked"}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* ── Filters ── */}
                    <div style={{ ...glassCard, borderRadius: 16, padding: "8px 16px", display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
                            <span className="material-symbols-outlined" style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "#94a3b8", fontSize: 18 }}>search</span>
                            <input style={{ width: "100%", paddingLeft: 40, paddingRight: 16, paddingTop: 10, paddingBottom: 10, background: "rgba(255,255,255,0.5)", border: "1px solid #e2e8f0", borderRadius: 12, fontSize: 14, outline: "none" }} placeholder="Filter modules..." type="text" />
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            {[
                                { key: "all", label: "All", icon: "grid_view" },
                                { key: "basics", label: "Basics", icon: "eco" },
                                { key: "langs", label: "Langs", icon: "code" },
                                { key: "comp", label: "Comp", icon: "trophy" },
                            ].map((f) => (
                                <button key={f.key} onClick={() => setFilter(f.key)} style={{
                                    padding: "8px 20px", borderRadius: 12, fontSize: 12, fontWeight: 700, border: "none",
                                    cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
                                    ...(filter === f.key
                                        ? { background: "#1e293b", color: "#fff", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }
                                        : { background: "#fff", color: "#475569", border: "1px solid #e2e8f0", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }),
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{f.icon}</span> {f.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ── Course Cards ── */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
                        {COURSES.map((c) => (
                            <div key={c.id} style={{
                                ...glassCard, borderRadius: 24, overflow: "hidden", transition: "all 0.3s",
                                ...(c.status === "active" ? { boxShadow: "0 20px 25px -5px rgba(14,165,233,0.1), 0 10px 10px -5px rgba(14,165,233,0.04), inset 0 0 20px rgba(255,255,255,0.5)" } : {}),
                                ...(c.status === "locked" ? { opacity: 0.7, borderStyle: "dashed", borderWidth: 2, borderColor: "#cbd5e1" } : {}),
                            }}>
                                {/* Top color bar */}
                                <div style={{ height: 6, width: "100%", background: c.gradient }} />

                                <div style={{ padding: 28 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                                        <div style={{
                                            width: 56, height: 56, borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center",
                                            ...c.iconBg, color: c.iconColor,
                                            boxShadow: c.status === "active" ? "0 10px 15px -3px rgba(14,165,233,0.3)" : "0 1px 2px rgba(0,0,0,0.05)",
                                        }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 28 }}>{c.icon}</span>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                            <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Status</span>
                                            <span style={{
                                                fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 999,
                                                background: c.statusBg, color: c.statusColor, border: `1px solid ${c.statusBorder}`,
                                                display: "flex", alignItems: "center", gap: 6, boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                                            }}>
                                                {c.status === "active" && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0ea5e9", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />}
                                                {c.status === "locked" && <span className="material-symbols-outlined" style={{ fontSize: 10 }}>lock</span>}
                                                {c.status === "completed" ? "Completed" : c.status === "active" ? "In Progress" : "Locked"}
                                            </span>
                                        </div>
                                    </div>

                                    <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: "#0f172a" }}>{c.title}</h3>
                                    <p style={{ fontSize: 14, marginBottom: 24, lineHeight: 1.6, color: c.status === "locked" ? "#94a3b8" : "#64748b", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{c.desc}</p>

                                    <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, padding: "6px 12px", borderRadius: 8, background: c.status === "active" ? "#fff" : "#f8fafc", color: c.status === "locked" ? "#94a3b8" : "#475569", border: "1px solid #e2e8f0" }}>{c.problems} Problems</span>
                                        <span style={{ fontSize: 10, fontWeight: 700, padding: "6px 12px", borderRadius: 8, background: c.status === "active" ? "#fff" : "#f8fafc", color: c.status === "locked" ? "#94a3b8" : "#475569", border: "1px solid #e2e8f0" }}>{c.tag}</span>
                                    </div>

                                    <button disabled={c.status === "locked"} style={{
                                        width: "100%", padding: "12px 0", borderRadius: 12, fontSize: 14, fontWeight: 700,
                                        cursor: c.status === "locked" ? "not-allowed" : "pointer",
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                        transition: "all 0.2s", ...c.btnStyle,
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{c.btnIcon}</span>
                                        {c.btnLabel}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═══ Right Sidebar ═══ */}
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                    {/* Activity Overview */}
                    <div style={{ ...glassCard, borderRadius: 32, padding: 24, position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: -40, right: -40, width: 128, height: 128, background: "#bae6fd", borderRadius: "50%", filter: "blur(48px)", opacity: 0.5 }} />
                        <h2 style={{ fontSize: 14, fontWeight: 800, color: "#1e293b", display: "flex", alignItems: "center", gap: 8, marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.05em", position: "relative", zIndex: 10 }}>
                            <span className="material-symbols-outlined" style={{ color: "#0ea5e9", fontSize: 20 }}>timelapse</span>
                            Activity Overview
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16, position: "relative", zIndex: 10 }}>
                            <div style={{ padding: 16, background: "rgba(255,255,255,0.6)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                                <div style={{ fontSize: 12, color: "#0284c7", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>Time Spent</div>
                                <div style={{ fontSize: 24, fontWeight: 900, color: "#1e293b" }}>4h 15m</div>
                            </div>
                            <div style={{ padding: 16, background: "rgba(255,255,255,0.6)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                                <div style={{ fontSize: 12, color: "#0d9488", fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.05em" }}>XP Earned</div>
                                <div style={{ fontSize: 24, fontWeight: 900, color: "#1e293b" }}>{progress.xp}</div>
                            </div>
                        </div>
                        <div style={{ padding: 20, background: "linear-gradient(to bottom right, #fff7ed, rgba(255,237,213,0.5))", borderRadius: 16, border: "1px solid rgba(254,215,170,0.6)", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", zIndex: 10, boxShadow: "0 1px 2px rgba(0,0,0,0.05)" }}>
                            <div>
                                <div style={{ fontSize: 10, color: "#ea580c", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Current Streak</div>
                                <div style={{ fontSize: 20, fontWeight: 900, color: "#1e293b", display: "flex", alignItems: "center", gap: 6 }}>
                                    {progress.streak} Days
                                    <span className="material-symbols-outlined" style={{ color: "#f97316", fontSize: 18, animation: "pulse 2s ease-in-out infinite" }}>local_fire_department</span>
                                </div>
                            </div>
                            <div style={{ position: "relative", width: 48, height: 48 }}>
                                <svg style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }} viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#fed7aa" strokeWidth="3" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f97316" strokeDasharray={`${Math.min(progress.streak * 5, 100)}, 100`} strokeLinecap="round" strokeWidth="3" />
                                </svg>
                                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#ea580c" }}>{Math.min(progress.streak * 5, 100)}%</div>
                            </div>
                        </div>
                    </div>

                    {/* Classmates */}
                    <div style={{ ...glassCard, borderRadius: 32, padding: 24, position: "relative" }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                            <h2 style={{ fontWeight: 800, color: "#1e293b", fontSize: 14, textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                                <span className="material-symbols-outlined" style={{ color: "#6366f1", fontSize: 20 }}>group</span>
                                Classmates
                            </h2>
                            <span style={{ fontSize: 10, fontWeight: 700, color: "#6366f1", background: "#eef2ff", padding: "4px 12px", borderRadius: 999, cursor: "pointer" }}>View All</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "relative" }}>
                            {/* Timeline line */}
                            <div style={{ position: "absolute", left: 19, top: 12, bottom: 12, width: 2, background: "#e2e8f0", zIndex: 0 }} />
                            {CLASSMATES.map((c, i) => (
                                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 16, position: "relative", zIndex: 10, cursor: "pointer" }}>
                                    <div style={{
                                        width: 40, height: 40, borderRadius: "50%", flexShrink: 0,
                                        background: "linear-gradient(to bottom right, #e0f2fe, #e0e7ff)",
                                        color: "#0284c7", display: "flex", alignItems: "center", justifyContent: "center",
                                        fontWeight: 700, fontSize: 12,
                                        boxShadow: "0 0 0 4px #fff, 0 4px 6px -1px rgba(0,0,0,0.1)"
                                    }}>
                                        {c.initial}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0, background: "rgba(255,255,255,0.6)", padding: 12, borderRadius: 16, borderTopLeftRadius: 4, border: "1px solid transparent" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
                                            <p style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", margin: 0 }}>{c.name}</p>
                                            <span style={{ fontSize: 10, fontFamily: "monospace", color: "#94a3b8" }}>{c.time}</span>
                                        </div>
                                        <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5, margin: 0 }} dangerouslySetInnerHTML={{ __html: c.msg }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* AI Mentor CTA */}
                    <div style={{
                        position: "relative", overflow: "hidden", borderRadius: 32,
                        background: "linear-gradient(to bottom right, #7c3aed, #4338ca)", padding: 32,
                        color: "#fff", boxShadow: "0 25px 50px -12px rgba(99,102,241,0.3)", cursor: "pointer",
                        transition: "transform 0.2s",
                    }}>
                        <div style={{ position: "absolute", right: -48, top: -48, width: 192, height: 192, borderRadius: "50%", background: "rgba(255,255,255,0.1)", filter: "blur(48px)" }} />
                        <div style={{ position: "absolute", left: -48, bottom: -48, width: 160, height: 160, borderRadius: "50%", background: "rgba(168,85,247,0.3)", filter: "blur(48px)" }} />
                        <div style={{ position: "relative", zIndex: 10 }}>
                            <div style={{ marginBottom: 12, display: "inline-flex", alignItems: "center", gap: 8, borderRadius: 999, background: "rgba(255,255,255,0.1)", padding: "4px 12px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", border: "1px solid rgba(255,255,255,0.1)" }}>
                                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#facc15", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
                                Pro Feature
                            </div>
                            <h3 style={{ marginBottom: 8, fontWeight: 700, fontSize: 20, letterSpacing: "-0.02em" }}>Unlock AI Mentor</h3>
                            <p style={{ fontSize: 12, color: "#c7d2fe", marginBottom: 24, lineHeight: 1.6, opacity: 0.9 }}>Get instant, intelligent help with your code anytime. Your personal coding assistant.</p>
                            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.2)", width: "fit-content", padding: "8px 16px", borderRadius: 12, display: "flex", alignItems: "center", gap: 8 }}>
                                Upgrade Now <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined" style={{ position: "absolute", bottom: 16, right: 16, fontSize: 80, color: "rgba(255,255,255,0.05)", transform: "rotate(12deg)" }}>smart_toy</span>
                    </div>
                </div>
            </div>
        </>
    );
}
