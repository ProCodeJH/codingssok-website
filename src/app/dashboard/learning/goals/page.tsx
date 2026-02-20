"use client";

import { useState } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";
import { useUserGoals } from "@/hooks/useLearningData";

const ACTIVE_GOALS = [
    {
        id: 1, title: "Python Mastery", desc: "Complete all Python modules and reach expert level",
        icon: "code", target: 150, current: 87, unit: "problems", deadline: "Mar 15",
        color: "#3b82f6", lightBg: "#eff6ff", border: "#bfdbfe",
        milestones: [
            { name: "Basics", done: true }, { name: "Data Structures", done: true },
            { name: "Algorithms", done: false }, { name: "Advanced", done: false },
        ],
    },
    {
        id: 2, title: "30-Day Streak", desc: "Maintain your daily challenge streak for 30 consecutive days",
        icon: "local_fire_department", target: 30, current: 12, unit: "days", deadline: "Mar 20",
        color: "#f97316", lightBg: "#fff7ed", border: "#fed7aa",
        milestones: [
            { name: "Week 1", done: true }, { name: "Week 2", done: false },
            { name: "Week 3", done: false }, { name: "Week 4", done: false },
        ],
    },
    {
        id: 3, title: "Level 10 Scholar", desc: "Reach Level 10 by earning enough XP across all modules",
        icon: "school", target: 5000, current: 3200, unit: "XP", deadline: "Apr 1",
        color: "#a855f7", lightBg: "#faf5ff", border: "#e9d5ff",
        milestones: [
            { name: "Level 5", done: true }, { name: "Level 7", done: true },
            { name: "Level 9", done: false }, { name: "Level 10", done: false },
        ],
    },
];

const COMPLETED_GOALS = [
    { title: "Coding Foundations Complete", desc: "Finished all beginner modules", icon: "check_circle", completedDate: "Feb 1" },
    { title: "First Bug Fixed", desc: "Submitted your first bug fix", icon: "bug_report", completedDate: "Jan 20" },
    { title: "10-Day Streak", desc: "Logged in for 10 consecutive days", icon: "local_fire_department", completedDate: "Jan 15" },
    { title: "Community Helper", desc: "Helped 5 classmates with their code", icon: "group", completedDate: "Jan 10" },
];

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

export default function GoalsPage() {
    const { progress } = useUserProgress();
    const [tab, setTab] = useState<"active" | "completed">("active");
    const { activeGoals: dbActive, completedGoals: dbCompleted, loading: goalsLoading } = useUserGoals();

    // Supabase 데이터가 있으면 사용, 없으면 mock fallback
    const activeGoals = dbActive.length > 0
        ? dbActive.map((g, i) => ({
            id: i + 1, title: g.title, desc: g.description || "", icon: g.icon,
            target: g.target, current: g.current, unit: g.unit, deadline: g.deadline || "",
            color: g.color, lightBg: g.light_bg, border: g.border_color,
            milestones: [] as { name: string; done: boolean }[],
        }))
        : ACTIVE_GOALS;

    const completedGoals = dbCompleted.length > 0
        ? dbCompleted.map(g => ({
            title: g.title, desc: g.description || "", icon: g.icon, completedDate: g.deadline || "",
        }))
        : COMPLETED_GOALS;

    return (
        <>
            <style>{`@media (min-width: 1024px) { .goals-grid { grid-template-columns: 7fr 3fr !important; } }`}</style>
            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>

                {/* Header */}
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                    <div>
                        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#0f172a", margin: "0 0 4px 0", display: "flex", alignItems: "center", gap: 12 }}>
                            <span className="material-symbols-outlined" style={{ color: "#0ea5e9", fontSize: 32 }}>flag</span>
                            My Goals
                        </h1>
                        <p style={{ fontSize: 14, color: "#64748b", margin: 0 }}>Track your progress and set new targets</p>
                    </div>
                    <button style={{
                        display: "flex", alignItems: "center", gap: 8, padding: "10px 20px",
                        background: "linear-gradient(to right, #0ea5e9, #6366f1)", color: "#fff",
                        borderRadius: 12, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
                        boxShadow: "0 10px 15px -3px rgba(14,165,233,0.25)",
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>add</span>
                        New Goal
                    </button>
                </div>

                {/* Stats Row */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 16 }}>
                    {[
                        { label: "Active Goals", value: activeGoals.length, icon: "flag", color: "#0ea5e9", bg: "#e0f2fe" },
                        { label: "Completed", value: completedGoals.length, icon: "check_circle", color: "#22c55e", bg: "#dcfce7" },
                        { label: "XP Earned", value: progress.xp, icon: "stars", color: "#a855f7", bg: "#f3e8ff" },
                        { label: "Day Streak", value: progress.streak, icon: "local_fire_department", color: "#f97316", bg: "#fff7ed" },
                    ].map((s, i) => (
                        <div key={i} style={{ ...glassCard, borderRadius: 16, padding: 20 }}>
                            <div style={{ width: 40, height: 40, borderRadius: 10, background: s.bg, color: s.color, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
                                <span className="material-symbols-outlined">{s.icon}</span>
                            </div>
                            <div style={{ fontSize: 24, fontWeight: 900, color: "#0f172a" }}>{s.value}</div>
                            <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: 4, background: "#f1f5f9", padding: 4, borderRadius: 12, width: "fit-content" }}>
                    {(["active", "completed"] as const).map((t) => (
                        <button key={t} onClick={() => setTab(t as "active" | "completed")} style={{
                            padding: "8px 24px", borderRadius: 8, fontSize: 14, fontWeight: 700,
                            border: "none", cursor: "pointer", transition: "all 0.2s",
                            ...(tab === t ? { background: "#fff", color: "#0f172a", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" } : { background: "transparent", color: "#64748b" }),
                        }}>
                            {t === "active" ? "Active Goals" : "Completed"} {t === "active" ? `(${activeGoals.length})` : `(${completedGoals.length})`}
                        </button>
                    ))}
                </div>

                {/* Active Goals */}
                {tab === "active" && !goalsLoading && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {activeGoals.map((g) => {
                            const pct = Math.round((g.current / g.target) * 100);
                            return (
                                <div key={g.id} style={{ ...glassCard, borderRadius: 24, padding: 28, position: "relative" }}>
                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                                            <div style={{ width: 52, height: 52, borderRadius: 16, background: g.lightBg, color: g.color, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${g.border}` }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 28 }}>{g.icon}</span>
                                            </div>
                                            <div>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>{g.title}</h3>
                                                <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>{g.desc}</p>
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                                            <span style={{ fontSize: 12, color: "#64748b", background: "#f8fafc", padding: "4px 10px", borderRadius: 8, border: "1px solid #e2e8f0" }}>Due {g.deadline}</span>
                                            <span style={{ fontSize: 24, fontWeight: 900, color: g.color }}>{pct}%</span>
                                        </div>
                                    </div>

                                    {/* Progress bar */}
                                    <div style={{ marginBottom: 20 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 8 }}>
                                            <span>{g.current} {g.unit}</span>
                                            <span>{g.target} {g.unit}</span>
                                        </div>
                                        <div style={{ height: 10, background: "#f1f5f9", borderRadius: 999, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                                            <div style={{ height: "100%", borderRadius: 999, background: `linear-gradient(to right, ${g.color}, ${g.color}dd)`, width: `${pct}%`, transition: "width 0.5s ease" }} />
                                        </div>
                                    </div>

                                    {/* Milestones */}
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {g.milestones.map((m, mi) => (
                                            <div key={mi} style={{
                                                display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, fontSize: 12, fontWeight: 600,
                                                ...(m.done ? { background: g.lightBg, color: g.color, border: `1px solid ${g.border}` } : { background: "#f8fafc", color: "#94a3b8", border: "1px solid #e2e8f0" }),
                                            }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{m.done ? "check_circle" : "radio_button_unchecked"}</span>
                                                {m.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Completed Goals */}
                {tab === "completed" && !goalsLoading && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
                        {completedGoals.map((g, i) => (
                            <div key={i} style={{ ...glassCard, borderRadius: 20, padding: 24, display: "flex", alignItems: "flex-start", gap: 16 }}>
                                <div style={{ width: 48, height: 48, borderRadius: 14, background: "#dcfce7", color: "#16a34a", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                    <span className="material-symbols-outlined">{g.icon}</span>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h4 style={{ fontWeight: 700, fontSize: 15, color: "#0f172a", margin: "0 0 4px 0" }}>{g.title}</h4>
                                    <p style={{ fontSize: 13, color: "#64748b", margin: "0 0 8px 0" }}>{g.desc}</p>
                                    <span style={{ fontSize: 11, color: "#94a3b8" }}>Completed {g.completedDate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
