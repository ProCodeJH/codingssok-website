"use client";

import { useUserProgress } from "@/hooks/useUserProgress";
import { useState, useEffect, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getTierInfo, getDisplayTier, calcLevel, xpForNextLevel, checkAttendance } from "@/lib/xp-engine";
import { COURSES, getCurriculumStats } from "@/data/courses";

/* ═══════════════════════════════════════════
   Quantum-Spatial Enterprise Hub V2
   Elevator Shaft · Learning Dashboard
   ═══════════════════════════════════════════ */

/* ── Material Icons shortcut ── */
function MI({ icon, style, className }: { icon: string; style?: React.CSSProperties; className?: string }) {
    return <span className={`material-symbols-outlined ${className || ""}`} style={style}>{icon}</span>;
}

/* ── Roadmap status helper ── */
function getStatusForCourse(courseIndex: number, userCourseProgress: any[], course: any) {
    const ucp = userCourseProgress.find((u) => u.course_id === course.id);
    const lessons = ucp?.completed_lessons;
    const done = Array.isArray(lessons) ? lessons.length : (typeof lessons === "number" ? lessons : 0);
    const total = course.totalUnits || 1;
    const pct = Math.round((done / total) * 100);
    if (pct >= 100) return "done";
    if (pct > 0 || courseIndex === 0) return "active";
    return "locked";
}

/* ── Material icon from course topic ── */
const COURSE_MATERIAL_ICONS: Record<string, string> = {
    "🧠": "psychology", "💻": "terminal", "🌱": "eco", "🐍": "code",
    "🏆": "emoji_events", "📋": "assignment", "🎯": "gps_fixed",
    "🏅": "military_tech", "📄": "description",
};

export default function JourneyPage() {
    const { progress } = useUserProgress();
    const { user } = useAuth();
    const [userCourseProgress, setUserCourseProgress] = useState<any[]>([]);
    const [attendanceChecked, setAttendanceChecked] = useState(false);
    const [attendanceMsg, setAttendanceMsg] = useState("");
    const [submissions, setSubmissions] = useState(0);
    const [successRate, setSuccessRate] = useState(0);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);
    const [weeklyXP, setWeeklyXP] = useState<{ day: string; xp: number }[]>([]);
    const [heatmapData, setHeatmapData] = useState<Record<string, number>>({});

    const supabase = useMemo(() => createClient(), []);
    const stats = useMemo(() => getCurriculumStats(), []);

    // ── Data fetch ──
    useEffect(() => {
        async function load() {
            if (!user) return;
            const uid = user.id;
            try { const { data: ucp } = await supabase.from("user_course_progress").select("*").eq("user_id", uid); if (ucp) setUserCourseProgress(ucp); } catch { }
            try {
                const today = new Date().toISOString().split("T")[0];
                const { data: att } = await supabase.from("attendance").select("id").eq("user_id", uid).eq("check_date", today).maybeSingle();
                if (att) setAttendanceChecked(true);
            } catch { }
            try {
                const { data: subs } = await supabase.from("code_submissions").select("status").eq("user_id", uid);
                if (subs) {
                    setSubmissions(subs.length);
                    const success = subs.filter((d: any) => d.status === "success").length;
                    setSuccessRate(subs.length > 0 ? Math.round((success / subs.length) * 100) : 0);
                }
            } catch { }
            try {
                const { data: acts } = await supabase.from("xp_logs").select("*").eq("user_id", uid)
                    .order("created_at", { ascending: false }).limit(5);
                if (acts) setRecentActivity(acts);
            } catch { }
            try {
                const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];
                const weekStart = new Date();
                weekStart.setDate(weekStart.getDate() - weekStart.getDay());
                weekStart.setHours(0, 0, 0, 0);
                const { data: xpLogs } = await supabase.from("xp_logs").select("amount, created_at")
                    .eq("user_id", uid).gte("created_at", weekStart.toISOString());
                const daily: Record<string, number> = {};
                dayLabels.forEach(d => daily[d] = 0);
                (xpLogs || []).forEach((log: any) => {
                    const dayIdx = new Date(log.created_at).getDay();
                    daily[dayLabels[dayIdx]] = (daily[dayLabels[dayIdx]] || 0) + (log.amount || 0);
                });
                setWeeklyXP(dayLabels.map(d => ({ day: d, xp: daily[d] })));
            } catch {
                setWeeklyXP(["일", "월", "화", "수", "목", "금", "토"].map(d => ({ day: d, xp: 0 })));
            }
            try {
                const ninetyDaysAgo = new Date();
                ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90);
                const { data: heatLogs } = await supabase.from("xp_logs").select("created_at")
                    .eq("user_id", uid).gte("created_at", ninetyDaysAgo.toISOString());
                const hm: Record<string, number> = {};
                (heatLogs || []).forEach((log: any) => {
                    const key = new Date(log.created_at).toISOString().split("T")[0];
                    hm[key] = (hm[key] || 0) + 1;
                });
                setHeatmapData(hm);
            } catch { }
        }
        load();
    }, [user, supabase]);

    const handleAttendance = useCallback(async () => {
        if (!user || attendanceChecked) return;
        const result = await checkAttendance(user.id);
        if (result.alreadyChecked) setAttendanceMsg("이미 오늘 출석했어요!");
        else setAttendanceMsg(`출석 완료! +10 XP 🎉`);
        setAttendanceChecked(true);
        setTimeout(() => setAttendanceMsg(""), 3000);
    }, [user, attendanceChecked]);

    const tierInfo = getDisplayTier(progress?.tier || "Iron", progress?.level || 1, progress?.placement_done);
    const levelProgress = xpForNextLevel(progress?.xp || 0);

    // ── Build roadmap ──
    const roadmap = COURSES.map((c, i) => ({
        ...c,
        materialIcon: COURSE_MATERIAL_ICONS[c.icon] || "school",
        status: getStatusForCourse(i, userCourseProgress, c),
        pct: (() => {
            const ucp = userCourseProgress.find((u) => u.course_id === c.id);
            const lessons = ucp?.completed_lessons;
            const done = Array.isArray(lessons) ? lessons.length : (typeof lessons === "number" ? lessons : 0);
            return Math.round((done / (c.totalUnits || 1)) * 100);
        })(),
    }));

    const activeCourseIdx = roadmap.findIndex(r => r.status === "active");

    return (
        <>
            <style>{`
                .elevator-shaft {
                    position: absolute; left: 50%; top: 0; bottom: 0; width: 2px;
                    background: linear-gradient(to bottom, rgba(14,165,233,0), rgba(14,165,233,0.3) 10%, rgba(14,165,233,0.3) 90%, rgba(14,165,233,0));
                    transform: translateX(-50%); z-index: 0;
                }
                .floor-indicator {
                    position: absolute; left: 50%; transform: translateX(-50%);
                    width: 40px; height: 40px; background: white; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    box-shadow: 0 0 0 4px rgba(255,255,255,0.8), 0 0 0 6px rgba(14,165,233,0.2); z-index: 10;
                }
                .marble-card {
                    background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
                    position: relative;
                }
                .marble-card::before {
                    content: ''; position: absolute; inset: 0;
                    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z' fill='%239C92AC' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
                    opacity: 0.6; pointer-events: none; border-radius: inherit;
                }
                .glass-orb {
                    background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.9), rgba(200,230,255,0.4) 40%, rgba(56,189,248,0.1) 80%);
                    box-shadow: inset -10px -10px 20px rgba(0,0,0,0.1), inset 10px 10px 20px rgba(255,255,255,0.8), 0 15px 30px rgba(14,165,233,0.2);
                    backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.6);
                }
                @keyframes orbit-spin { to { transform: rotate(360deg); } }
                @keyframes orbit-spin-rev { to { transform: rotate(-360deg); } }
                .orbit-ring { animation: orbit-spin 20s linear infinite; }
                .orbit-ring-rev { animation: orbit-spin-rev 25s linear infinite; }
                @media (max-width: 900px) {
                    .shaft-row { flex-direction: column !important; }
                    .shaft-row > div { width: 100% !important; padding: 0 !important; }
                    .elevator-shaft { display: none; }
                    .floor-indicator { position: relative !important; left: auto !important; transform: none !important; margin: 0 auto 12px; }
                    .shaft-cross-line { display: none !important; }
                    .zenith-bottom-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>

            <div className="zenith-page" style={{ position: "relative", minHeight: "calc(100vh - 120px)" }}>
                {/* ═══ Ambient Background ═══ */}
                <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
                    <div className="zenith-drift" style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "rgba(224,242,254,0.5)", borderRadius: "50%", filter: "blur(120px)" }} />
                    <div className="zenith-float-delayed" style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", background: "rgba(224,231,255,0.5)", borderRadius: "50%", filter: "blur(120px)" }} />
                    <div className="zenith-float" style={{ position: "absolute", top: "20%", right: "10%", width: "30%", height: "30%", background: "rgba(240,253,250,0.5)", borderRadius: "50%", filter: "blur(100px)" }} />
                </div>

                {/* ═══ Main Content ═══ */}
                <div style={{ position: "relative", zIndex: 10 }}>

                    {/* ── Header: Level badge + Attendance + Curriculum Overview ── */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48, flexWrap: "wrap", gap: 20 }}>
                        {/* Left: Welcome + Attendance */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                                <span style={{ fontSize: 11, fontWeight: 700, color: "#fff", background: tierInfo.gradient, padding: "3px 10px", borderRadius: 8 }}>
                                    Lv.{progress?.level || 1}
                                </span>
                                <span style={{ fontSize: 13, color: "#64748b" }}>{tierInfo.nameKo}</span>
                            </div>
                            <AnimatePresence>
                                {attendanceMsg && (
                                    <motion.span initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                        style={{ fontSize: 13, fontWeight: 700, color: "#059669", background: "#dcfce7", padding: "6px 14px", borderRadius: 12, border: "1px solid #86efac", display: "inline-block", marginBottom: 8 }}
                                    >{attendanceMsg}</motion.span>
                                )}
                            </AnimatePresence>
                            {!attendanceChecked ? (
                                <motion.button onClick={handleAttendance} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    style={{ padding: "10px 20px", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", background: "linear-gradient(135deg, #3b82f6, #6366f1)", color: "#fff", boxShadow: "0 8px 20px rgba(59,130,246,0.3)", display: "flex", alignItems: "center", gap: 8 }}>
                                    <MI icon="login" style={{ fontSize: 16 }} /> 출석체크
                                </motion.button>
                            ) : (
                                <button disabled style={{ padding: "10px 20px", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 700, background: "rgba(255,255,255,0.5)", color: "#94a3b8", display: "flex", alignItems: "center", gap: 8 }}>
                                    <MI icon="check_circle" style={{ fontSize: 16 }} /> 출석 완료 ✓
                                </button>
                            )}
                        </motion.div>

                        {/* Right: Curriculum Overview */}
                        <motion.div initial={{ opacity: 0, y: -20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="z-glass-panel" style={{ borderRadius: 20, padding: 24, maxWidth: 520, width: "100%" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                                <h2 className="z-font-display z-holographic-text" style={{ fontWeight: 700, fontSize: 17, color: "#1e293b", margin: 0 }}>
                                    Curriculum Overview
                                </h2>
                                <Link href="/dashboard/learning/courses" style={{ color: "#3b82f6", display: "flex" }}>
                                    <MI icon="more_horiz" />
                                </Link>
                            </div>
                            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
                                <StatOrb icon="psychology" color="#8b5cf6" value={stats.totalCourses} label="Courses" />
                                <VertDivider />
                                <StatOrb icon="language" color="#06b6d4" value={stats.totalUnits} label="Units" />
                                <VertDivider />
                                {/* AI Bot */}
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", top: -8 }}>
                                    <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                        style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(to bottom, rgba(59,130,246,0.1), transparent)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                        <div style={{ position: "absolute", inset: -4, borderRadius: "50%", border: "1px solid rgba(59,130,246,0.2)", animation: "pulse 2s infinite" }} />
                                        <MI icon="smart_toy" style={{ fontSize: 36, color: "#3b82f6", filter: "drop-shadow(0 0 15px rgba(37,99,235,0.6))" }} />
                                    </motion.div>
                                </div>
                                <VertDivider />
                                <StatOrb icon="science" color="#6366f1" value={`${stats.totalHours}h`} label="Study Time" />
                            </div>
                        </motion.div>
                    </div>

                    {/* ═══ ELEVATOR SHAFT — Vertical Course Roadmap ═══ */}
                    <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto", paddingBottom: 80 }}>
                        {/* Central shaft line */}
                        <div className="elevator-shaft" />

                        {roadmap.map((course, i) => {
                            const isActive = course.status === "active" && i === (activeCourseIdx >= 0 ? activeCourseIdx : 0);
                            const isDone = course.status === "done";
                            const isLocked = course.status === "locked";
                            const isEven = i % 2 === 0;
                            const modId = String(i + 1).padStart(2, "0");

                            if (isActive) {
                                return (
                                    <ActiveFloor key={course.id} course={course} modId={modId} pct={course.pct} />
                                );
                            }
                            if (isDone) {
                                return (
                                    <CompletedFloor key={course.id} course={course} modId={modId} isEven={isEven} idx={i} />
                                );
                            }
                            return (
                                <LockedFloor key={course.id} course={course} modId={modId} isEven={isEven} idx={i} />
                            );
                        })}
                    </div>

                    {/* ═══ Bottom Info Row ═══ */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, maxWidth: 1100, margin: "0 auto" }} className="zenith-bottom-grid">
                        {/* Weekly XP */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                            className="z-glass-panel" style={{ borderRadius: 20, padding: 20 }}>
                            <h3 className="z-font-display" style={{ fontWeight: 700, fontSize: 15, color: "#1e293b", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                                <MI icon="bar_chart" style={{ fontSize: 18, color: "#3b82f6" }} /> 이번 주 XP
                            </h3>
                            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
                                {weeklyXP.map((d, i, arr) => {
                                    const max = Math.max(...arr.map(x => x.xp), 1);
                                    const isToday = i === new Date().getDay();
                                    return (
                                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                            <span style={{ fontSize: 9, fontWeight: 700, color: isToday ? "#3b82f6" : "#94a3b8" }}>{d.xp}</span>
                                            <motion.div initial={{ height: 0 }} animate={{ height: `${Math.max((d.xp / max) * 60, d.xp > 0 ? 6 : 2)}px` }}
                                                transition={{ delay: 0.5 + i * 0.06, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                style={{ width: "100%", maxWidth: 28, borderRadius: "5px 5px 2px 2px", minHeight: 2, background: isToday ? "linear-gradient(to top, #3b82f6, #60a5fa)" : d.xp > 0 ? "linear-gradient(to top, #cbd5e1, #94a3b8)" : "#f1f5f9", boxShadow: isToday ? "0 4px 12px rgba(59,130,246,0.25)" : "none" }}
                                            />
                                            <span style={{ fontSize: 10, fontWeight: isToday ? 800 : 500, color: isToday ? "#3b82f6" : "#64748b" }}>{d.day}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
                            className="z-glass-panel" style={{ borderRadius: 20, padding: 20 }}>
                            <h3 className="z-font-display" style={{ fontWeight: 700, fontSize: 15, color: "#1e293b", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                                <MI icon="leaderboard" style={{ fontSize: 18, color: "#8b5cf6" }} /> 나의 현황
                            </h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                {[
                                    { label: "🔥 연속 출석", val: `${progress?.streak || 0}일`, c: "#ef4444" },
                                    { label: "📊 성공률", val: `${successRate}%`, c: "#3b82f6" },
                                    { label: "💻 코드 제출", val: `${submissions}회`, c: "#8b5cf6" },
                                    { label: "⭐ XP", val: `${(progress?.xp || 0).toLocaleString()}`, c: "#f59e0b" },
                                ].map((s) => (
                                    <motion.div key={s.label} whileHover={{ scale: 1.04, y: -2 }}
                                        style={{ padding: "10px 12px", borderRadius: 14, background: "rgba(248,250,252,0.6)", textAlign: "center", border: "1px solid rgba(226,232,240,0.4)" }}>
                                        <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2 }}>{s.label}</div>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: s.c }}>{s.val}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Activity */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
                            className="z-glass-panel" style={{ borderRadius: 20, padding: 20 }}>
                            <h3 className="z-font-display" style={{ fontWeight: 700, fontSize: 15, color: "#1e293b", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                                <MI icon="schedule" style={{ fontSize: 18, color: "#f59e0b" }} /> 최근 활동
                            </h3>
                            {recentActivity.length === 0 ? (
                                <div style={{ textAlign: "center", padding: 16, color: "#94a3b8", fontSize: 13 }}>📝 아직 활동 기록이 없어요</div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    {recentActivity.slice(0, 4).map((a: any, i: number) => (
                                        <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.06 }}
                                            style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 10, background: "rgba(248,250,252,0.5)" }}>
                                            <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, flexShrink: 0 }}>⭐</div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: 11, fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.reason || "경험치 획득"}</div>
                                            </div>
                                            <span style={{ fontSize: 11, fontWeight: 800, color: "#059669", whiteSpace: "nowrap" }}>+{a.amount}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}

/* ═══ Sub-Components ═══ */

function StatOrb({ icon, color, value, label }: { icon: string; color: string; value: string | number; label: string }) {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
            <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(to top, ${color}20, rgba(59,130,246,0.05))`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8, position: "relative" }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `1px solid ${color}30`, filter: "blur(2px)" }} />
                <MI icon={icon} style={{ fontSize: 26, color, filter: `drop-shadow(0 0 8px ${color}80)` }} />
            </motion.div>
            <span className="z-font-display" style={{ fontWeight: 700, fontSize: 22, color: "#1e293b" }}>{value}</span>
            <span style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
        </div>
    );
}

function VertDivider() {
    return <div style={{ height: 48, width: 1, background: "linear-gradient(to bottom, transparent, rgba(203,213,225,0.5), transparent)", flexShrink: 0 }} />;
}

/* ═══ ELEVATOR SHAFT — Floor Components ═══ */

/* ── Active Floor — Full-width hero with glass orb ── */
function ActiveFloor({ course, modId, pct }: { course: any; modId: string; pct: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ position: "relative", zIndex: 20, width: "100%", marginBottom: 80 }}
        >
            {/* Floor indicator — pulsing blue */}
            <div className="floor-indicator" style={{
                top: "50%", width: 60, height: 60, transform: "translate(-50%, -50%)",
                boxShadow: "0 0 40px rgba(14,165,233,0.3)", border: "none",
            }}>
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(14,165,233,0.2)", animation: "pulse 2s infinite" }} />
                <MI icon="hub" style={{ fontSize: 24, color: "#0ea5e9" }} />
            </div>

            {/* Two-column layout */}
            <div className="shaft-row" style={{ display: "flex", alignItems: "center", gap: 32 }}>
                {/* Left: Glass orb visual */}
                <div style={{ width: "45%", display: "flex", justifyContent: "center", paddingRight: 48 }}>
                    <div style={{ position: "relative", width: "100%", maxWidth: 320, aspectRatio: "4/3" }}>
                        <div style={{
                            position: "absolute", inset: 0,
                            background: "linear-gradient(to bottom right, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
                            backdropFilter: "blur(12px)", borderRadius: 32,
                            border: "1px solid rgba(255,255,255,0.6)",
                            boxShadow: "0 8px 32px rgba(31,38,135,0.15)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            overflow: "hidden", zIndex: 10,
                        }}>
                            {/* Glass orb */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                className="glass-orb"
                                style={{
                                    width: 120, height: 120, borderRadius: "50%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    position: "relative", zIndex: 20,
                                }}
                            >
                                <MI icon={course.materialIcon} style={{ fontSize: 52, color: "rgba(14,165,233,0.8)", filter: "drop-shadow(0 4px 12px rgba(14,165,233,0.4))" }} />
                            </motion.div>

                            {/* Spinning orbit rings */}
                            <div className="orbit-ring" style={{
                                position: "absolute", width: 180, height: 180, borderRadius: "50%",
                                border: "1px solid rgba(14,165,233,0.1)", borderTopColor: "rgba(14,165,233,0.4)",
                            }} />
                            <div className="orbit-ring-rev" style={{
                                position: "absolute", width: 240, height: 240, borderRadius: "50%",
                                border: "1px solid rgba(99,102,241,0.1)", borderBottomColor: "rgba(99,102,241,0.3)",
                            }} />

                            {/* Bottom stats */}
                            <div style={{ position: "absolute", bottom: 16, left: 16, right: 16, display: "flex", justifyContent: "space-between", zIndex: 30 }}>
                                <div className="z-glass-panel" style={{ padding: "6px 12px", borderRadius: 10 }}>
                                    <div style={{ fontSize: 9, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>진행률</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: "#0ea5e9", fontFamily: "monospace" }}>{pct}%</div>
                                </div>
                                <div className="z-glass-panel" style={{ padding: "6px 12px", borderRadius: 10 }}>
                                    <div style={{ fontSize: 9, color: "#64748b", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>유닛</div>
                                    <div style={{ fontSize: 13, fontWeight: 700, color: "#059669", fontFamily: "monospace" }}>{course.totalUnits}</div>
                                </div>
                            </div>
                        </div>
                        {/* Shadow layer */}
                        <div style={{ position: "absolute", inset: 16, background: "rgba(14,165,233,0.05)", borderRadius: 32, transform: "translateZ(-50px) translateY(32px)", filter: "blur(24px)" }} />
                    </div>
                </div>

                {/* Right: Main card */}
                <div style={{ width: "55%", paddingLeft: 48 }}>
                    <motion.div
                        whileHover={{ y: -4, boxShadow: "0 30px 60px -12px rgba(50,50,93,0.2), 0 18px 36px -18px rgba(0,0,0,0.15)" }}
                        style={{
                            background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px)",
                            padding: 40, borderRadius: 32,
                            boxShadow: "0 30px 60px -12px rgba(50,50,93,0.15), 0 18px 36px -18px rgba(0,0,0,0.1)",
                            border: "1px solid rgba(255,255,255,0.9)",
                            position: "relative", overflow: "hidden",
                            transition: "box-shadow 0.5s, transform 0.5s",
                        }}
                    >
                        {/* Top gradient bar */}
                        <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 3, background: "linear-gradient(to right, #0ea5e9, #818cf8, #0ea5e9)" }} />
                        {/* Soft glow */}
                        <div style={{ position: "absolute", right: -40, top: -40, width: 160, height: 160, background: "rgba(224,242,254,0.6)", borderRadius: "50%", filter: "blur(48px)", pointerEvents: "none" }} />

                        <div style={{ position: "relative", zIndex: 10 }}>
                            {/* Live badge */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                                <span style={{ position: "relative", display: "flex", width: 8, height: 8 }}>
                                    <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#0ea5e9", animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite", opacity: 0.75 }} />
                                    <span style={{ position: "relative", display: "inline-flex", borderRadius: "50%", width: 8, height: 8, background: "#0ea5e9" }} />
                                </span>
                                <span style={{ fontSize: 11, fontWeight: 700, color: "#0ea5e9", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                                    Live Session // MOD_{modId}
                                </span>
                            </div>

                            <h2 className="z-font-display" style={{ fontWeight: 700, fontSize: 32, color: "#1e293b", marginBottom: 8, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                                {course.title}
                            </h2>
                            <p style={{ color: "#64748b", lineHeight: 1.7, fontSize: 15, marginBottom: 28, fontWeight: 300 }}>
                                {course.description}
                            </p>

                            {/* Progress + info grid */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
                                <div style={{ padding: 14, borderRadius: 16, background: "#f8fafc", border: "1px solid #f1f5f9" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                                        <MI icon="memory" style={{ fontSize: 16, color: "#94a3b8" }} />
                                        <span style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>진행률</span>
                                    </div>
                                    <div style={{ height: 6, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            style={{ height: "100%", background: "#0ea5e9", borderRadius: 999 }} />
                                    </div>
                                </div>
                                <div style={{ padding: 14, borderRadius: 16, background: "#f8fafc", border: "1px solid #f1f5f9" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                                        <MI icon="dataset" style={{ fontSize: 16, color: "#94a3b8" }} />
                                        <span style={{ fontSize: 10, fontWeight: 700, color: "#475569", textTransform: "uppercase" }}>구성</span>
                                    </div>
                                    <div style={{ fontSize: 14, fontFamily: "monospace", color: "#334155", fontWeight: 600 }}>
                                        {course.chapters.length}챕터 · {course.totalUnits}유닛
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <Link href={`/dashboard/learning/courses/${course.id}`} style={{ textDecoration: "none" }}>
                                <motion.button whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.98 }}
                                    style={{
                                        width: "100%", padding: "16px 0", background: "#0f172a", color: "#fff",
                                        border: "none", borderRadius: 16, fontWeight: 600, fontSize: 15, cursor: "pointer",
                                        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                                        display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                                        transition: "box-shadow 0.3s, transform 0.3s",
                                    }}>
                                    <span>학습 시작</span>
                                    <MI icon="arrow_forward" style={{ fontSize: 16 }} />
                                </motion.button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Completed Floor — Alternating left/right marble card ── */
function CompletedFloor({ course, modId, isEven, idx }: { course: any; modId: string; isEven: boolean; idx: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.6 }}
            whileHover={{ opacity: 1 }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            style={{ position: "relative", zIndex: 10, width: "100%", marginBottom: 64, transition: "opacity 0.5s" }}
        >
            {/* Floor indicator — green check */}
            <div className="floor-indicator" style={{ top: 32, background: "#f0fdf4", border: "2px solid #dcfce7" }}>
                <MI icon="check" style={{ fontSize: 18, color: "#22c55e" }} />
            </div>

            <div className="shaft-row" style={{ display: "flex", alignItems: "center", gap: 48, flexDirection: isEven ? "row-reverse" : "row" }}>
                {/* Cross line */}
                <div className="shaft-cross-line" style={{
                    position: "absolute", top: 50, [isEven ? "right" : "left"]: "50%",
                    width: "48%", height: 1,
                    background: isEven
                        ? "linear-gradient(to right, transparent, rgba(226,232,240,0.5), transparent)"
                        : "linear-gradient(to left, transparent, rgba(226,232,240,0.5), transparent)",
                    zIndex: -1,
                }} />

                {/* Visual */}
                <div style={{ width: "45%", display: "flex", justifyContent: isEven ? "flex-start" : "flex-end", padding: isEven ? "0 0 0 48px" : "0 48px 0 0" }}>
                    <div style={{ position: "relative", width: 240, height: 180 }}>
                        <div style={{ position: "absolute", inset: 0, background: "#fff", borderRadius: 20, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05), 0 0 2px rgba(0,0,0,0.05)", border: "1px solid rgba(241,245,249,0.5)" }} />
                        <div style={{ position: "absolute", inset: 8, background: "#f8fafc", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #f1f5f9" }}>
                            <MI icon={course.materialIcon} style={{ fontSize: 60, color: "#cbd5e1" }} />
                        </div>
                    </div>
                </div>

                {/* Card */}
                <div style={{ width: "55%", display: "flex", justifyContent: isEven ? "flex-end" : "flex-start" }}>
                    <motion.div
                        whileHover={{ y: -4 }}
                        transition={{ duration: 0.5 }}
                        className="marble-card"
                        style={{
                            padding: 32, borderRadius: 24,
                            boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05), 0 0 2px rgba(0,0,0,0.05)",
                            width: 400, maxWidth: "100%",
                            border: "1px solid rgba(255,255,255,0.6)",
                            transition: "transform 0.5s",
                        }}
                    >
                        <div style={{ position: "relative", zIndex: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                <div style={{ padding: "4px 12px", background: "#f0fdf4", borderRadius: 999, border: "1px solid #dcfce7" }}>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: "#16a34a", textTransform: "uppercase", letterSpacing: "0.08em" }}>Completed</span>
                                </div>
                                <span style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>MOD_{modId}</span>
                            </div>
                            <h3 className="z-font-display" style={{ fontWeight: 700, fontSize: 22, color: "#1e293b", marginBottom: 8 }}>{course.title}</h3>
                            <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 20 }}>{course.description}</p>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 16, borderTop: "1px solid #f1f5f9" }}>
                                <div style={{ display: "flex", gap: -8 }}>
                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#e2e8f0", border: "2px solid #fff" }} />
                                    <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#cbd5e1", border: "2px solid #fff", marginLeft: -8 }} />
                                </div>
                                <Link href={`/dashboard/learning/courses/${course.id}`} style={{ fontSize: 13, fontWeight: 500, color: "#94a3b8", textDecoration: "none" }}>
                                    복습하기
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

/* ── Locked Floor — Grayscale, lower opacity ── */
function LockedFloor({ course, modId, isEven, idx }: { course: any; modId: string; isEven: boolean; idx: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 0.4 }}
            whileHover={{ opacity: 0.8 }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            style={{ position: "relative", zIndex: 10, width: "100%", marginBottom: 64, transition: "opacity 0.5s" }}
        >
            {/* Floor indicator — lock */}
            <div className="floor-indicator" style={{ top: 32, background: "#f8fafc", border: "2px solid #e2e8f0" }}>
                <MI icon="lock" style={{ fontSize: 18, color: "#94a3b8" }} />
            </div>

            <div className="shaft-row" style={{ display: "flex", alignItems: "center", gap: 48, flexDirection: isEven ? "row" : "row-reverse" }}>
                {/* Cross line */}
                <div className="shaft-cross-line" style={{
                    position: "absolute", top: 50, [isEven ? "left" : "right"]: "50%",
                    width: "48%", height: 1,
                    background: isEven
                        ? "linear-gradient(to right, transparent, rgba(226,232,240,0.4), transparent)"
                        : "linear-gradient(to left, transparent, rgba(226,232,240,0.4), transparent)",
                    zIndex: -1,
                }} />

                {/* Card */}
                <div style={{ width: "55%", display: "flex", justifyContent: isEven ? "flex-start" : "flex-end" }}>
                    <motion.div
                        whileHover={{ y: -4, filter: "grayscale(0)" }}
                        className="marble-card"
                        style={{
                            padding: 32, borderRadius: 24,
                            width: 400, maxWidth: "100%",
                            border: "1px solid #e2e8f0",
                            background: "rgba(248,250,252,0.5)",
                            filter: "grayscale(0.3)",
                            boxShadow: "none",
                            transition: "all 0.5s",
                        }}
                    >
                        <div style={{ position: "relative", zIndex: 10 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                                <div style={{ padding: "4px 12px", background: "#f1f5f9", borderRadius: 999, border: "1px solid #e2e8f0" }}>
                                    <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>Locked</span>
                                </div>
                                <span style={{ fontSize: 12, fontFamily: "monospace", color: "#94a3b8" }}>MOD_{modId}</span>
                            </div>
                            <h3 className="z-font-display" style={{ fontWeight: 700, fontSize: 22, color: "#475569", marginBottom: 8 }}>{course.title}</h3>
                            <p style={{ fontSize: 13, color: "#94a3b8", lineHeight: 1.6, marginBottom: 20 }}>{course.description}</p>
                            <div style={{ height: 4, width: "100%", background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                                <div style={{ height: "100%", background: "#cbd5e1", width: 0 }} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Visual */}
                <div style={{ width: "45%", display: "flex", justifyContent: isEven ? "flex-end" : "flex-start", padding: isEven ? "0 48px 0 0" : "0 0 0 48px" }}>
                    <div style={{ position: "relative", width: 240, height: 180, opacity: 0.5 }}>
                        <div style={{ position: "absolute", inset: 0, background: "#f1f5f9", borderRadius: 20, border: "1px solid #e2e8f0" }} />
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <MI icon={course.materialIcon} style={{ fontSize: 52, color: "#cbd5e1" }} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
