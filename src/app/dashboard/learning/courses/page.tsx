"use client";

import { useState, useEffect } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Styles ── */
const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

/* ── Data ── */
const DAILY_CHALLENGE = {
    title: "Array Rotation",
    difficulty: "Medium",
    category: "Algorithms",
    desc: "Given an integer array, rotate the array to the right by k steps. Can you do it in O(1) extra space?",
    xpReward: 150,
    timeLimit: "30 min",
    solvedBy: 342,
    hints: 3,
};

const CHALLENGE_HISTORY = [
    { day: "Mon", title: "Binary Search", difficulty: "Easy", xp: 80, status: "completed" },
    { day: "Tue", title: "Merge Sort", difficulty: "Medium", xp: 120, status: "completed" },
    { day: "Wed", title: "Graph BFS", difficulty: "Hard", xp: 200, status: "completed" },
    { day: "Thu", title: "Dynamic Prog", difficulty: "Hard", xp: 200, status: "completed" },
    { day: "Fri", title: "Array Rotation", difficulty: "Medium", xp: 150, status: "today" },
    { day: "Sat", title: "???", difficulty: "???", xp: 0, status: "locked" },
    { day: "Sun", title: "???", difficulty: "???", xp: 0, status: "locked" },
];

const LEADERBOARD_MINI = [
    { rank: 1, name: "Alex Kim", xp: 980, avatar: "A" },
    { rank: 2, name: "Sarah L.", xp: 870, avatar: "S" },
    { rank: 3, name: "Mike R.", xp: 750, avatar: "M" },
    { rank: 4, name: "You", xp: 650, avatar: "Y", isMe: true },
];

const TEST_CASES = [
    { input: "[1,2,3,4,5,6,7], k=3", expected: "[5,6,7,1,2,3,4]" },
    { input: "[-1,-100,3,99], k=2", expected: "[3,99,-1,-100]" },
    { input: "[1,2], k=5", expected: "[2,1]" },
];

const CODE_TEMPLATE = `def rotate(nums, k):
    """
    Rotate array to the right by k steps.
    Do not return anything, modify nums in-place.
    """
    # Your solution here
    pass`;

const diffColors: Record<string, { bg: string; color: string; border: string }> = {
    Easy: { bg: "rgba(34,197,94,0.2)", color: "#4ade80", border: "rgba(34,197,94,0.3)" },
    Medium: { bg: "rgba(249,115,22,0.2)", color: "#fb923c", border: "rgba(249,115,22,0.3)" },
    Hard: { bg: "rgba(239,68,68,0.2)", color: "#f87171", border: "rgba(239,68,68,0.3)" },
};

export default function CoursesPage() {
    const { progress } = useUserProgress();
    const [timeLeft, setTimeLeft] = useState(1800);
    const [started, setStarted] = useState(false);
    const [code, setCode] = useState(CODE_TEMPLATE);

    useEffect(() => {
        if (!started) return;
        const timer = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
        return () => clearInterval(timer);
    }, [started]);

    const fmt = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
    const dc = diffColors[DAILY_CHALLENGE.difficulty] || diffColors.Medium;

    return (
        <>
            <style>{`
                @keyframes pulse2 { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
                @media (min-width: 1024px) { .courses-grid { grid-template-columns: 8fr 4fr !important; } }
            `}</style>

            <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>

                {/* ═══ Daily Challenge Banner ═══ */}
                <div style={{
                    position: "relative", overflow: "hidden", borderRadius: 24,
                    background: "linear-gradient(to bottom right, #0f172a, #1e293b, #0f172a)",
                    color: "#fff", padding: "32px 40px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                }}>
                    {/* BG elements */}
                    <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+\")", opacity: 0.5 }} />
                    <div style={{ position: "absolute", top: -80, right: -80, width: 240, height: 240, background: "rgba(19,218,236,0.2)", borderRadius: "50%", filter: "blur(80px)" }} />
                    <div style={{ position: "absolute", bottom: -80, left: -80, width: 240, height: 240, background: "rgba(37,99,235,0.2)", borderRadius: "50%", filter: "blur(80px)" }} />

                    <div style={{ position: "relative", zIndex: 10, display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
                        <div style={{ flex: 1, minWidth: 280 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                <span style={{
                                    background: "rgba(255,255,255,0.1)", padding: "4px 12px", borderRadius: 8,
                                    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em",
                                    color: "#13daec", border: "1px solid rgba(255,255,255,0.1)",
                                }}>Daily Challenge</span>
                                <span style={{
                                    padding: "2px 10px", borderRadius: 999, fontSize: 10, fontWeight: 700,
                                    background: dc.bg, color: dc.color, border: `1px solid ${dc.border}`,
                                }}>{DAILY_CHALLENGE.difficulty}</span>
                            </div>
                            <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.02em", margin: "0 0 12px 0" }}>{DAILY_CHALLENGE.title}</h1>
                            <p style={{ color: "rgba(255,255,255,0.6)", maxWidth: 560, lineHeight: 1.6, margin: 0 }}>{DAILY_CHALLENGE.desc}</p>
                            <div style={{ display: "flex", gap: 24, marginTop: 24, fontSize: 14 }}>
                                {[
                                    { icon: "stars", val: `${DAILY_CHALLENGE.xpReward}`, label: "XP" },
                                    { icon: "timer", val: DAILY_CHALLENGE.timeLimit, label: "" },
                                    { icon: "group", val: `${DAILY_CHALLENGE.solvedBy}`, label: "solved" },
                                ].map((s, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(255,255,255,0.5)" }}>
                                        <span className="material-symbols-outlined" style={{ color: "#13daec", fontSize: 18 }}>{s.icon}</span>
                                        <strong style={{ color: "#fff" }}>{s.val}</strong> {s.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                            <div style={{ position: "relative", width: 112, height: 112 }}>
                                <svg style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }} viewBox="0 0 100 100">
                                    <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                                    <circle cx="50" cy="50" r="44" fill="none" stroke="#13daec" strokeWidth="8" strokeDasharray={`${(timeLeft / 1800) * 276.5}, 276.5`} strokeLinecap="round" />
                                </svg>
                                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
                                    <span style={{ fontSize: 24, fontWeight: 900, fontVariantNumeric: "tabular-nums" }}>{fmt(timeLeft)}</span>
                                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Remaining</span>
                                </div>
                            </div>
                            <button onClick={() => setStarted(!started)} style={{
                                padding: "10px 24px", borderRadius: 12, fontWeight: 700, fontSize: 14,
                                border: "none", cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", gap: 6,
                                ...(started
                                    ? { background: "#ef4444", boxShadow: "0 10px 15px -3px rgba(239,68,68,0.3)" }
                                    : { background: "#13daec", boxShadow: "0 10px 15px -3px rgba(19,218,236,0.3)" }),
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{started ? "pause" : "play_arrow"}</span>
                                {started ? "Pause" : "Start Challenge"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ═══ Week Streak ═══ */}
                <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                        <h2 style={{ fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 8, margin: 0 }}>
                            <span className="material-symbols-outlined" style={{ color: "#13daec" }}>calendar_month</span>
                            This Week&apos;s Challenges
                        </h2>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", background: "#f3f4f6", padding: "4px 12px", borderRadius: 999 }}>4/7 Completed</span>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 12 }}>
                        {CHALLENGE_HISTORY.map((ch, i) => (
                            <div key={i} style={{
                                textAlign: "center", padding: 12, borderRadius: 12, cursor: "pointer", transition: "all 0.2s",
                                ...(ch.status === "completed" ? { background: "#f0fdf4", border: "1px solid #bbf7d0" }
                                    : ch.status === "today" ? { background: "#eff6ff", border: "1px solid #93c5fd", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1), 0 0 0 2px #bfdbfe" }
                                        : { background: "#f9fafb", border: "1px solid #f3f4f6", opacity: 0.6 }),
                            }}>
                                <div style={{
                                    fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8,
                                    color: ch.status === "today" ? "#3b82f6" : ch.status === "completed" ? "#16a34a" : "#9ca3af",
                                }}>{ch.day}</div>
                                <div style={{
                                    width: 32, height: 32, borderRadius: "50%", margin: "0 auto 8px", display: "flex", alignItems: "center", justifyContent: "center",
                                    ...(ch.status === "completed" ? { background: "#22c55e", color: "#fff" }
                                        : ch.status === "today" ? { background: "#3b82f6", color: "#fff", animation: "pulse2 2s ease-in-out infinite" }
                                            : { background: "#e5e7eb", color: "#9ca3af" }),
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>
                                        {ch.status === "completed" ? "check" : ch.status === "today" ? "play_arrow" : "lock"}
                                    </span>
                                </div>
                                <div style={{ fontSize: 10, fontWeight: 700, color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ch.title}</div>
                                {ch.xp > 0 && ch.status !== "locked" && <div style={{ fontSize: 10, color: "#9ca3af", marginTop: 4 }}>+{ch.xp} XP</div>}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ═══ Editor + Sidebar ═══ */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 32 }} className="courses-grid">
                    {/* Code Editor */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        <div style={{ background: "#0f172a", borderRadius: 16, border: "1px solid #334155", overflow: "hidden", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
                            {/* Editor header */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#1e293b", borderBottom: "1px solid #334155" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
                                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#eab308" }} />
                                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
                                    <span style={{ fontSize: 12, color: "#94a3b8", marginLeft: 12, fontFamily: "monospace" }}>solution.py</span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <button style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", background: "#334155", padding: "4px 12px", borderRadius: 6, border: "none", cursor: "pointer" }}>Python</button>
                                    <button style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", background: "#334155", padding: "4px 12px", borderRadius: 6, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 12 }}>lightbulb</span> Hints ({DAILY_CHALLENGE.hints})
                                    </button>
                                </div>
                            </div>
                            {/* Code area */}
                            <div style={{ padding: 16 }}>
                                <textarea
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    spellCheck={false}
                                    style={{
                                        width: "100%", background: "transparent", color: "#4ade80",
                                        fontFamily: "monospace", fontSize: 14, resize: "none", outline: "none",
                                        minHeight: 350, lineHeight: 1.6, border: "none",
                                    }}
                                />
                            </div>
                            {/* Editor footer */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px", background: "#1e293b", borderTop: "1px solid #334155" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    {["play_arrow:Run", "bug_report:Debug"].map((b) => {
                                        const [icon, label] = b.split(":");
                                        return (
                                            <button key={label} style={{
                                                fontSize: 12, fontWeight: 700, color: "#cbd5e1", background: "#334155",
                                                padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer",
                                                display: "flex", alignItems: "center", gap: 6,
                                            }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{icon}</span> {label}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button style={{
                                    fontSize: 12, fontWeight: 700, color: "#fff", background: "#13daec",
                                    padding: "8px 20px", borderRadius: 8, border: "none", cursor: "pointer",
                                    display: "flex", alignItems: "center", gap: 6,
                                    boxShadow: "0 10px 15px -3px rgba(19,218,236,0.2)",
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>send</span> Submit Solution
                                </button>
                            </div>
                        </div>

                        {/* Test Cases */}
                        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                            <h3 style={{ fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 8, marginBottom: 16, margin: "0 0 16px 0" }}>
                                <span className="material-symbols-outlined" style={{ color: "#13daec" }}>checklist</span>
                                Test Cases
                            </h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {TEST_CASES.map((tc, i) => (
                                    <div key={i} style={{
                                        display: "flex", alignItems: "center", gap: 16, padding: 16,
                                        background: "#f9fafb", borderRadius: 12, border: "1px solid #f3f4f6",
                                    }}>
                                        <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", background: "#e5e7eb", color: "#9ca3af", fontSize: 12, fontWeight: 700 }}>{i + 1}</div>
                                        <div style={{ flex: 1, minWidth: 0 }}>
                                            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                                                <div><span style={{ color: "#9ca3af", fontWeight: 500 }}>Input:</span> <span style={{ fontFamily: "monospace", color: "#374151" }}>{tc.input}</span></div>
                                                <div><span style={{ color: "#9ca3af", fontWeight: 500 }}>Expected:</span> <span style={{ fontFamily: "monospace", color: "#374151" }}>{tc.expected}</span></div>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: "#9ca3af", background: "#e5e7eb", padding: "4px 10px", borderRadius: 6, textTransform: "uppercase" }}>Pending</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {/* Mini Leaderboard */}
                        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                            <h3 style={{ fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 8, margin: "0 0 16px 0" }}>
                                <span className="material-symbols-outlined" style={{ color: "#eab308" }}>leaderboard</span>
                                Today&apos;s Ranking
                            </h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                {LEADERBOARD_MINI.map((u) => (
                                    <div key={u.rank} style={{
                                        display: "flex", alignItems: "center", gap: 12, padding: 12, borderRadius: 12,
                                        ...(u.isMe ? { background: "#eff6ff", border: "1px solid #bfdbfe" } : { border: "1px solid transparent" }),
                                    }}>
                                        <span style={{ fontSize: 12, fontWeight: 900, width: 20, color: u.rank <= 3 ? "#eab308" : "#9ca3af" }}>#{u.rank}</span>
                                        <div style={{
                                            width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 12, fontWeight: 700,
                                            ...(u.isMe ? { background: "#3b82f6", color: "#fff" } : { background: "#e5e7eb", color: "#4b5563" }),
                                        }}>{u.avatar}</div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: u.isMe ? "#2563eb" : "#111827" }}>{u.name}</div>
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: "#6b7280" }}>{u.xp} XP</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Challenge Stats */}
                        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e5e7eb", padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                            <h3 style={{ fontWeight: 700, color: "#111827", display: "flex", alignItems: "center", gap: 8, margin: "0 0 16px 0" }}>
                                <span className="material-symbols-outlined" style={{ color: "#f97316" }}>local_fire_department</span>
                                Challenge Stats
                            </h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {[
                                    { label: "Current Streak", val: `${progress.streak} days`, bg: "#fff7ed", color: "#c2410c", border: "#fed7aa" },
                                    { label: "Best Streak", val: "14 days", bg: "#faf5ff", color: "#7e22ce", border: "#e9d5ff" },
                                    { label: "Total Solved", val: "47", bg: "#f0fdf4", color: "#15803d", border: "#bbf7d0" },
                                    { label: "Win Rate", val: "89%", bg: "#eff6ff", color: "#1d4ed8", border: "#bfdbfe" },
                                ].map((s, i) => (
                                    <div key={i} style={{
                                        display: "flex", justifyContent: "space-between", alignItems: "center",
                                        padding: 12, background: s.bg, borderRadius: 12,
                                        border: `1px solid ${s.border}`,
                                    }}>
                                        <span style={{ fontSize: 14, color: s.color, fontWeight: 500 }}>{s.label}</span>
                                        <span style={{ fontSize: 18, fontWeight: 900, color: "#111827" }}>{s.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Next Achievement */}
                        <div style={{
                            position: "relative", overflow: "hidden",
                            background: "linear-gradient(to bottom right, #eab308, #f97316)",
                            borderRadius: 16, padding: 24, color: "#fff",
                            boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                        }}>
                            <div style={{ position: "absolute", right: -24, bottom: -24, fontSize: 80, opacity: 0.2 }}>🏆</div>
                            <div style={{ position: "relative", zIndex: 10 }}>
                                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fef9c3", marginBottom: 8 }}>Next Achievement</div>
                                <h4 style={{ fontWeight: 700, fontSize: 18, margin: "0 0 4px 0" }}>7-Day Streak Master</h4>
                                <p style={{ fontSize: 14, color: "#fef9c3", marginBottom: 12 }}>Complete 3 more daily challenges</p>
                                <div style={{ width: "100%", height: 8, background: "rgba(255,255,255,0.2)", borderRadius: 999 }}>
                                    <div style={{ height: "100%", background: "#fff", borderRadius: 999, width: "57%" }} />
                                </div>
                                <p style={{ fontSize: 10, color: "#fde68a", marginTop: 6, textAlign: "right" }}>4 / 7 days</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
