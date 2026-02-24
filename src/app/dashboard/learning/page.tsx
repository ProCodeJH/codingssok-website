"use client";

import { useUserProgress } from "@/hooks/useUserProgress";
import { useState, useEffect, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getTierInfo, getDisplayTier, calcLevel, xpForNextLevel, checkAttendance } from "@/lib/xp-engine";
import { COURSES, getCurriculumStats } from "@/data/courses";
import { CourseIcon } from "@/components/icons/CourseIcons";
import StreakWidget from "@/components/ui/StreakWidget";
import { useWrongAnswers } from "@/hooks/useWrongAnswers";

/* ═══════════════════════════════════════════
   Quantum-Spatial Enterprise Hub V2
   Course Selection · Learning Dashboard
   ═══════════════════════════════════════════ */

/* ── Material Icons shortcut ── */
function MI({ icon, style, className }: { icon: string; style?: React.CSSProperties; className?: string }) {
    return <span className={`material-symbols-outlined ${className || ""}`} style={style}>{icon}</span>;
}

export default function JourneyPage() {
    const { progress } = useUserProgress();
    const { user } = useAuth();
    const [userCourseProgress, setUserCourseProgress] = useState<any[]>([]);
    const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});
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
            try {
                const { data: ucp } = await supabase.from("user_course_progress").select("*").eq("user_id", uid);
                if (ucp) {
                    setUserCourseProgress(ucp);
                    const m: Record<string, number> = {};
                    ucp.forEach((p: any) => {
                        const completed = typeof p.completed_lessons === 'number' ? p.completed_lessons : (Array.isArray(p.completed_lessons) ? p.completed_lessons.length : 0);
                        const course = COURSES.find(c => c.id === p.course_id);
                        const total = course?.totalUnits || 1;
                        m[p.course_id] = p.is_completed ? 100 : Math.round((completed / total) * 100);
                    });
                    setCourseProgress(m);
                }
            } catch { }
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
                const dayLabels = ["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"];
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
                setWeeklyXP(["\uC77C", "\uC6D4", "\uD654", "\uC218", "\uBAA9", "\uAE08", "\uD1A0"].map(d => ({ day: d, xp: 0 })));
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
        if (result.alreadyChecked) setAttendanceMsg("\uC774\uBBF8 \uC624\uB298 \uCD9C\uC11D\uD588\uC5B4\uC694");
        else setAttendanceMsg(`\uCD9C\uC11D \uC644\uB8CC! +10 XP \uD68D\uB4DD`);
        setAttendanceChecked(true);
        setTimeout(() => setAttendanceMsg(""), 3000);
    }, [user, attendanceChecked]);

    const tierInfo = getDisplayTier(progress?.tier || "Iron", progress?.level || 1, progress?.placement_done);
    const levelProgress = xpForNextLevel(progress?.xp || 0);

    return (
        <>
            <style>{`
                @media (max-width: 900px) {
                    .zenith-bottom-grid { grid-template-columns: 1fr !important; }
                    .course-grid { grid-template-columns: 1fr 1fr !important; }
                }
                @media (max-width: 600px) {
                    .course-grid { grid-template-columns: 1fr !important; }
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
                                    <MI icon="login" style={{ fontSize: 16 }} /> {"\uCD9C\uC11D\uCCB4\uD06C"}
                                </motion.button>
                            ) : (
                                <button disabled style={{ padding: "10px 20px", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 700, background: "rgba(255,255,255,0.5)", color: "#94a3b8", display: "flex", alignItems: "center", gap: 8 }}>
                                    <MI icon="check_circle" style={{ fontSize: 16 }} /> {"\uCD9C\uC11D \uC644\uB8CC \u2713"}
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

                    {/* ── Streak + Quick Links Row ── */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 1100, margin: "0 auto 32px", alignItems: "start" }}>
                        <StreakWidget />
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <Link href="/dashboard/learning/review" style={{
                                display: "flex", alignItems: "center", gap: 12,
                                background: "#fff", borderRadius: 16, padding: "16px 20px",
                                border: "1px solid #e2e8f0", textDecoration: "none",
                                boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "border-color 0.2s",
                            }}>
                                <span style={{ fontSize: 24 }}>{"\uD83D\uDCDD"}</span>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 14, color: "#1e1b4b" }}>{"\uC624\uB2F5 \uB178\uD2B8"}</div>
                                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{"\uD2C0\uB9B0 \uBB38\uC81C\uB97C \uBCF5\uC2B5\uD558\uC138\uC694"}</div>
                                </div>
                                <span style={{ marginLeft: "auto", color: "#94a3b8", fontSize: 14 }}>{"\u2192"}</span>
                            </Link>
                            <Link href="/trial" style={{
                                display: "flex", alignItems: "center", gap: 12,
                                background: "linear-gradient(135deg, #FFFBEB, #FEF3C7)", borderRadius: 16, padding: "16px 20px",
                                border: "1px solid #FDE68A", textDecoration: "none",
                                boxShadow: "0 2px 8px rgba(245,158,11,0.08)", transition: "border-color 0.2s",
                            }}>
                                <span style={{ fontSize: 24 }}>{"\uD83E\uDDEA"}</span>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: 14, color: "#92400E" }}>{"\uBB34\uB8CC \uCCB4\uD5D8"}</div>
                                    <div style={{ fontSize: 12, color: "#B45309" }}>{"\uCCAB \uB2E8\uACC4 \uBB34\uB8CC\uB85C \uCCB4\uD5D8\uD574\uBCF4\uC138\uC694"}</div>
                                </div>
                                <span style={{ marginLeft: "auto", color: "#B45309", fontSize: 14 }}>{"\u2192"}</span>
                            </Link>
                        </div>
                    </div>

                    {/* ═══ COURSE SELECTION — Pick Your Course ═══ */}
                    <div style={{ maxWidth: 1100, margin: "0 auto", marginBottom: 48 }}>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                                <h2 className="z-font-display" style={{ fontWeight: 800, fontSize: 22, color: "#1e293b", margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                                    <MI icon="school" style={{ fontSize: 24, color: "#6366f1" }} /> {"\uCF54\uC2A4 \uC120\uD0DD"}
                                </h2>
                                <span style={{ fontSize: 12, color: "#94a3b8" }}>{"\uC6D0\uD558\uB294 \uACFC\uBAA9\uC744 \uC120\uD0DD\uD558\uC138\uC694"}</span>
                            </div>

                            {/* In-Progress Courses */}
                            {(() => {
                                const inProg = COURSES.filter(c => courseProgress[c.id] && courseProgress[c.id] > 0 && courseProgress[c.id] < 100); return inProg.length > 0 ? (
                                    <div className="z-glass-panel" style={{ borderRadius: 20, padding: 20, marginBottom: 20 }}>
                                        <h3 style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", margin: "0 0 14px", display: "flex", alignItems: "center", gap: 8 }}>
                                            <MI icon="play_circle" style={{ fontSize: 18, color: "#f59e0b" }} /> {"\uC9C4\uD589 \uC911\uC778 \uCF54\uC2A4"}
                                        </h3>
                                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                            {inProg.map(c => (
                                                <Link key={c.id} href={`/dashboard/learning/courses/${c.id}`} style={{ textDecoration: "none", flex: "1 1 220px", maxWidth: 340 }}>
                                                    <motion.div whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                                                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", borderRadius: 14, background: "#f8fafc", border: "1px solid #f1f5f9", cursor: "pointer", transition: "all 0.2s" }}>
                                                        <CourseIcon courseId={c.id} size={30} />
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{c.title}</div>
                                                            <div style={{ height: 6, background: "#e2e8f0", borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
                                                                <div style={{ width: `${courseProgress[c.id]}%`, height: "100%", background: c.gradient, borderRadius: 999 }} />
                                                            </div>
                                                        </div>
                                                        <span style={{ fontSize: 12, fontWeight: 800, color: "#0ea5e9" }}>{courseProgress[c.id]}%</span>
                                                    </motion.div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ) : null;
                            })()}

                            {/* Course Selection Grid */}
                            <div className="course-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                                {COURSES.map((course, idx) => {
                                    const prog = courseProgress[course.id] || 0;
                                    return (
                                        <Link key={course.id} href={`/dashboard/learning/courses/${course.id}`} style={{ textDecoration: "none" }}>
                                            <motion.div
                                                whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
                                                initial={{ opacity: 0, y: 16 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.15 + idx * 0.05, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                style={{
                                                    borderRadius: 20, overflow: "hidden", cursor: "pointer",
                                                    background: "#fff", border: "1px solid #e2e8f0",
                                                    boxShadow: "0 4px 16px rgba(0,0,0,0.04)",
                                                    transition: "all 0.3s ease",
                                                }}
                                            >
                                                {/* Gradient banner with icon */}
                                                <div style={{
                                                    height: 100, background: course.gradient,
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    position: "relative", overflow: "hidden",
                                                }}>
                                                    {/* Decorative circles */}
                                                    <div style={{ position: "absolute", right: -20, top: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
                                                    <div style={{ position: "absolute", left: -10, bottom: -10, width: 50, height: 50, borderRadius: "50%", background: "rgba(255,255,255,0.1)" }} />
                                                    <CourseIcon courseId={course.id} size={48} style={{ filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }} />
                                                    {/* Progress badge */}
                                                    {prog > 0 && (
                                                        <div style={{
                                                            position: "absolute", top: 10, right: 10,
                                                            padding: "3px 10px", borderRadius: 8,
                                                            background: "rgba(255,255,255,0.95)",
                                                            fontSize: 10, fontWeight: 800,
                                                            color: prog === 100 ? "#059669" : "#0ea5e9",
                                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                                        }}>
                                                            {prog === 100 ? "\uC644\uB8CC" : `${prog}%`}
                                                        </div>
                                                    )}
                                                    {/* Chapter/Unit badges */}
                                                    <div style={{ position: "absolute", bottom: 8, left: 10, display: "flex", gap: 4 }}>
                                                        <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 9, fontWeight: 800, background: "rgba(255,255,255,0.9)", color: "#475569" }}>
                                                            {course.chapters.length}{"\uCC55\uD130"}
                                                        </span>
                                                        <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 9, fontWeight: 800, background: "rgba(255,255,255,0.9)", color: "#475569" }}>
                                                            {course.totalUnits}{"\uC720\uB2DB"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Card body */}
                                                <div style={{ padding: "14px 18px 16px" }}>
                                                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{course.title}</h3>
                                                    <p style={{
                                                        fontSize: 12, color: "#64748b", lineHeight: 1.5, margin: "0 0 12px",
                                                        overflow: "hidden", textOverflow: "ellipsis",
                                                        display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const,
                                                    }}>{course.description}</p>

                                                    {/* Progress bar */}
                                                    <div style={{ height: 5, background: "#f1f5f9", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${prog}%` }}
                                                            transition={{ delay: 0.5, duration: 0.8 }}
                                                            style={{ height: "100%", background: course.gradient, borderRadius: 999 }}
                                                        />
                                                    </div>

                                                    {/* Footer */}
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: "#94a3b8" }}>
                                                            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                                                <MI icon="schedule" style={{ fontSize: 13 }} /> {course.estimatedHours}h
                                                            </span>
                                                            <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                                                <MI icon="quiz" style={{ fontSize: 13 }} /> {course.totalProblems}{"\uBB38\uC81C"}
                                                            </span>
                                                        </div>
                                                        <motion.span
                                                            whileHover={{ x: 4 }}
                                                            style={{
                                                                fontSize: 12, fontWeight: 700, color: "#6366f1",
                                                                display: "flex", alignItems: "center", gap: 4,
                                                            }}
                                                        >
                                                            {prog === 0 ? "\uC2DC\uC791\uD558\uAE30" : prog === 100 ? "\uBCF5\uC2B5" : "\uC774\uC5B4\uD558\uAE30"}
                                                            <MI icon="arrow_forward" style={{ fontSize: 14 }} />
                                                        </motion.span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </div>

                    {/* ═══ Bottom Info Row ═══ */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, maxWidth: 1100, margin: "0 auto" }} className="zenith-bottom-grid">
                        {/* Weekly XP */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                            className="z-glass-panel" style={{ borderRadius: 20, padding: 20 }}>
                            <h3 className="z-font-display" style={{ fontWeight: 700, fontSize: 15, color: "#1e293b", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                                <MI icon="bar_chart" style={{ fontSize: 18, color: "#3b82f6" }} /> {"\uC774\uBC88 \uC8FC XP"}
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
                                <MI icon="leaderboard" style={{ fontSize: 18, color: "#8b5cf6" }} /> {"\uB098\uC758 \uD604\uD669"}
                            </h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                {[
                                    { label: "\uC5F0\uC18D \uCD9C\uC11D", val: `${progress?.streak || 0}\uC77C`, c: "#ef4444", icon: "local_fire_department" },
                                    { label: "\uC131\uACF5\uB960", val: `${successRate}%`, c: "#3b82f6", icon: "trending_up" },
                                    { label: "\uCF54\uB4DC \uC81C\uCD9C", val: `${submissions}\uD68C`, c: "#8b5cf6", icon: "terminal" },
                                    { label: "XP", val: `${(progress?.xp || 0).toLocaleString()}`, c: "#f59e0b", icon: "star" },
                                ].map((s) => (
                                    <motion.div key={s.label} whileHover={{ scale: 1.04, y: -2 }}
                                        style={{ padding: "10px 12px", borderRadius: 14, background: "rgba(248,250,252,0.6)", textAlign: "center", border: "1px solid rgba(226,232,240,0.4)" }}>
                                        <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 2, display: "flex", alignItems: "center", gap: 3 }}><MI icon={s.icon} style={{ fontSize: 12 }} />{s.label}</div>
                                        <div style={{ fontSize: 16, fontWeight: 800, color: s.c }}>{s.val}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Recent Activity */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
                            className="z-glass-panel" style={{ borderRadius: 20, padding: 20 }}>
                            <h3 className="z-font-display" style={{ fontWeight: 700, fontSize: 15, color: "#1e293b", marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
                                <MI icon="schedule" style={{ fontSize: 18, color: "#f59e0b" }} /> {"\uCD5C\uADFC \uD65C\uB3D9"}
                            </h3>
                            {
                                recentActivity.length === 0 ? (
                                    <div style={{ textAlign: "center", padding: 16, color: "#94a3b8", fontSize: 13, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><MI icon="edit_note" style={{ fontSize: 16 }} /> {"\uC544\uC9C1 \uD65C\uB3D9 \uAE30\uB85D\uC774 \uC5C6\uC5B4\uC694"}</div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        {recentActivity.slice(0, 4).map((a: any, i: number) => (
                                            <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.7 + i * 0.06 }}
                                                style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 10, background: "rgba(248,250,252,0.5)" }}>
                                                <div style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #3b82f6, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, flexShrink: 0 }}><MI icon="star" style={{ fontSize: 14 }} /></div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: 11, fontWeight: 600, color: "#1e293b", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.reason || "\uACBD\uD5D8\uCE58 \uD68D\uB4DD"}</div>
                                                </div>
                                                <span style={{ fontSize: 11, fontWeight: 800, color: "#059669", whiteSpace: "nowrap" }}>+{a.amount}</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                )
                            }
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
