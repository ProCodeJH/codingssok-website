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
   Zenith Helix — Architectural Flow V2
   Course Selection · Learning Dashboard
   ═══════════════════════════════════════════ */

/* ── Material Icons shortcut ── */
function MI({ icon, style, className }: { icon: string; style?: React.CSSProperties; className?: string }) {
    return <span className={`material-symbols-outlined ${className || ""}`} style={style}>{icon}</span>;
}

/* ── Rotating 3D Cube Icon ── */
function CubeIcon({ label, color, duration = 8 }: { label: string; color: string; duration?: number }) {
    const borderColor = `${color}99`;
    const bgColor = `${color}15`;
    return (
        <div style={{
            width: 44, height: 44, transformStyle: "preserve-3d",
            transform: "rotateX(-20deg) rotateY(45deg)",
            animation: `rotate-cube ${duration}s linear infinite`,
            position: "relative",
        }}>
            {[0, 90, 180, -90].map((deg, i) => (
                <div key={i} style={{
                    position: "absolute", width: 44, height: 44,
                    background: bgColor, border: `2px solid ${borderColor}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, fontWeight: 700, color,
                    transform: `rotateY(${deg}deg) translateZ(22px)`,
                }}>
                    {i === 0 ? label : ""}
                </div>
            ))}
            {[90, -90].map((deg, i) => (
                <div key={`tb-${i}`} style={{
                    position: "absolute", width: 44, height: 44,
                    background: bgColor, border: `2px solid ${borderColor}`,
                    transform: `rotateX(${deg}deg) translateZ(22px)`,
                }} />
            ))}
        </div>
    );
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
        if (result.alreadyChecked) setAttendanceMsg("이미 오늘 출석했어요");
        else setAttendanceMsg(`출석 완료! +10 XP 획득`);
        setAttendanceChecked(true);
        setTimeout(() => setAttendanceMsg(""), 3000);
    }, [user, attendanceChecked]);

    const tierInfo = getDisplayTier(progress?.tier || "Iron", progress?.level || 1, progress?.placement_done);
    const levelProgress = xpForNextLevel(progress?.xp || 0);

    // ── Card positioning for helix layout ──
    const cardPositions = useMemo(() => {
        const positions = [
            { left: "8%", top: "55%", scale: 1, z: 40, delay: 0.1, anim: "float-slow" },
            { left: "32%", top: "40%", scale: 0.88, z: 35, delay: 0.2, anim: "float-delayed" },
            { left: "56%", top: "28%", scale: 0.78, z: 30, delay: 0.3, anim: "float-slow" },
            { left: "76%", top: "18%", scale: 0.68, z: 25, delay: 0.4, anim: "float-delayed" },
            { left: "18%", top: "72%", scale: 0.72, z: 20, delay: 0.5, anim: "float-delayed" },
            { left: "44%", top: "62%", scale: 0.65, z: 15, delay: 0.6, anim: "float-slow" },
            { left: "68%", top: "48%", scale: 0.6, z: 10, delay: 0.7, anim: "float-delayed" },
            { left: "88%", top: "35%", scale: 0.55, z: 5, delay: 0.8, anim: "float-slow" },
        ];
        return positions;
    }, []);

    const courseColors = [
        "#2563eb", "#7c3aed", "#0891b2", "#059669",
        "#d97706", "#dc2626", "#4f46e5", "#0d9488",
    ];

    const cubeLabelMap: Record<string, string> = {
        "computational-thinking": "CT",
        "coding-basics": "CB",
        "python": "Py",
        "c-lang": "C",
        "koi": "KOI",
        "pcce": "PC",
        "cos": "CS",
        "cos-pro": "CP",
        "word-processor": "WP",
    };

    return (
        <>
            <style>{`
                @keyframes rotate-cube {
                    0% { transform: rotateX(-20deg) rotateY(0deg); }
                    100% { transform: rotateX(-20deg) rotateY(360deg); }
                }
                @keyframes helix-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-16px); }
                }
                @keyframes helix-float-alt {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-12px); }
                }
                @keyframes pulse-glow {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                .helix-float-slow { animation: helix-float 7s ease-in-out infinite; }
                .helix-float-delayed { animation: helix-float-alt 7s ease-in-out 3.5s infinite; }
                .monolith-card {
                    background: rgba(255,255,255,0.85);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(255,255,255,0.9);
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.5),
                        0 20px 40px rgba(0,0,0,0.08),
                        inset 0 0 30px rgba(147,197,253,0.15);
                    transition: transform 0.4s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s ease;
                }
                .monolith-card:hover {
                    transform: translateY(-12px) scale(1.04) !important;
                    box-shadow:
                        0 0 0 1px rgba(59,130,246,0.5),
                        0 30px 60px rgba(37,99,235,0.15),
                        inset 0 0 40px rgba(147,197,253,0.3);
                    z-index: 50 !important;
                }
                .glass-frosted {
                    background: rgba(255,255,255,0.35);
                    backdrop-filter: blur(24px) saturate(180%);
                    -webkit-backdrop-filter: blur(24px) saturate(180%);
                    border: 1px solid rgba(255,255,255,0.65);
                    box-shadow: 0 8px 32px rgba(31,38,135,0.08);
                }
                @media (max-width: 900px) {
                    .helix-viewport { height: auto !important; min-height: 700px !important; }
                    .helix-card-wrap { position: relative !important; left: auto !important; top: auto !important; }
                    .helix-grid-fallback {
                        display: grid !important;
                        grid-template-columns: 1fr 1fr !important;
                        gap: 16px !important;
                        padding: 0 16px !important;
                    }
                    .bottom-panel-left, .bottom-panel-right { position: relative !important; bottom: auto !important; left: auto !important; right: auto !important; }
                    .bottom-panels-wrap {
                        display: flex !important; flex-wrap: wrap !important; gap: 16px !important;
                        padding: 24px 16px !important;
                    }
                }
                @media (max-width: 640px) {
                    .helix-grid-fallback { grid-template-columns: 1fr !important; }
                }
            `}</style>

            <div style={{
                position: "relative", minHeight: "calc(100vh - 100px)",
                fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
                color: "#0f172a",
                overflow: "hidden",
            }}>
                {/* ═══ Void Gradient Background ═══ */}
                <div style={{
                    position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden",
                    background: "radial-gradient(circle at 50% 50%, #ffffff 0%, #f1f5f9 60%, #e2e8f0 100%)",
                }}>
                    <div style={{
                        position: "absolute", top: "-10%", left: "-10%", width: 800, height: 800,
                        background: "rgba(191,219,254,0.35)", borderRadius: "50%", filter: "blur(120px)",
                        mixBlendMode: "multiply", animation: "pulse-glow 3s infinite",
                    }} />
                    <div style={{
                        position: "absolute", bottom: "-10%", right: "-10%", width: 1000, height: 1000,
                        background: "rgba(224,231,255,0.5)", borderRadius: "50%", filter: "blur(100px)",
                        mixBlendMode: "multiply",
                    }} />
                    <div style={{
                        position: "absolute", top: "40%", left: "30%", width: 600, height: 600,
                        background: "rgba(255,255,255,0.8)", borderRadius: "50%", filter: "blur(80px)",
                        mixBlendMode: "overlay",
                    }} />
                </div>

                {/* ═══ Content ═══ */}
                <div style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", minHeight: "100%" }}>

                    {/* ── TOP BAR: Level + Attendance + Search ── */}
                    <motion.div
                        initial={{ y: -40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
                        className="glass-frosted"
                        style={{
                            margin: "16px 16px 0", borderRadius: 16, padding: "12px 24px",
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                            flexWrap: "wrap", gap: 12,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            {/* Logo cube */}
                            <div style={{
                                width: 40, height: 40, borderRadius: 10,
                                background: "linear-gradient(135deg, #2563eb, #4338ca)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                boxShadow: "0 4px 16px rgba(37,99,235,0.3)", color: "#fff",
                            }}>
                                <MI icon="dns" style={{ fontSize: 22 }} />
                            </div>
                            <div>
                                <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1, margin: 0 }}>
                                    코딩쏙
                                </h2>
                                <span style={{ fontSize: 9, color: "#64748b", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                                    HELIX V2
                                </span>
                            </div>
                            <div style={{ width: 1, height: 32, background: "#cbd5e1", margin: "0 8px" }} />
                            {/* Level badge */}
                            <span style={{
                                fontSize: 10, fontWeight: 700, color: "#fff",
                                background: tierInfo.gradient, padding: "4px 12px", borderRadius: 8,
                            }}>
                                Lv.{progress?.level || 1} · {tierInfo.nameKo}
                            </span>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            {/* Attendance */}
                            <AnimatePresence>
                                {attendanceMsg && (
                                    <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                        style={{ fontSize: 12, fontWeight: 700, color: "#059669", background: "#dcfce7", padding: "4px 12px", borderRadius: 8, border: "1px solid #86efac" }}>
                                        {attendanceMsg}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {!attendanceChecked ? (
                                <motion.button onClick={handleAttendance} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: "8px 16px", borderRadius: 10, border: "none", fontSize: 12, fontWeight: 700,
                                        cursor: "pointer", background: "linear-gradient(135deg, #2563eb, #4338ca)",
                                        color: "#fff", boxShadow: "0 4px 12px rgba(37,99,235,0.3)",
                                        display: "flex", alignItems: "center", gap: 6,
                                    }}>
                                    <MI icon="login" style={{ fontSize: 14 }} /> 출석체크
                                </motion.button>
                            ) : (
                                <span style={{ padding: "8px 16px", borderRadius: 10, fontSize: 12, fontWeight: 700, color: "#94a3b8", background: "rgba(255,255,255,0.5)", display: "flex", alignItems: "center", gap: 6 }}>
                                    <MI icon="check_circle" style={{ fontSize: 14 }} /> 출석 완료
                                </span>
                            )}
                            {/* Quick links */}
                            <Link href="/dashboard/learning/review"
                                style={{ width: 36, height: 36, borderRadius: 10, background: "#fff", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#64748b", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                                <MI icon="edit_note" style={{ fontSize: 18 }} />
                            </Link>
                            <Link href="/trial"
                                style={{ width: 36, height: 36, borderRadius: 10, background: "#FFFBEB", border: "1px solid #FDE68A", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", color: "#D97706", boxShadow: "0 2px 8px rgba(245,158,11,0.08)" }}>
                                <MI icon="science" style={{ fontSize: 18 }} />
                            </Link>
                        </div>
                    </motion.div>

                    {/* ── HERO TEXT ── */}
                    <div style={{ textAlign: "center", paddingTop: 40, pointerEvents: "none", position: "relative", zIndex: 20 }}>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                fontSize: "clamp(40px, 8vw, 88px)", fontWeight: 700,
                                letterSpacing: "-0.06em", lineHeight: 1,
                                margin: 0,
                                background: "linear-gradient(to bottom, #0f172a, #64748b, #94a3b8)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                                opacity: 0.85,
                            }}
                        >
                            LEARNING<br />PATH
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 12 }}
                        >
                            Sequence Initiated: Helix V2.0
                        </motion.p>
                    </div>

                    {/* ═══ HELIX VIEWPORT — 3D Floating Monolith Cards ═══ */}
                    <div className="helix-viewport" style={{
                        position: "relative", width: "100%", height: 700,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        overflow: "hidden", perspective: 1200,
                    }}>
                        {/* SVG Fiber Optic Lines */}
                        <svg style={{
                            position: "absolute", width: "100%", height: "100%",
                            pointerEvents: "none", zIndex: 0, opacity: 0.5,
                            transform: "scale(1.1) translateY(30px)",
                        }}>
                            <defs>
                                <linearGradient id="fiberG" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="rgba(37,99,235,0)" />
                                    <stop offset="50%" stopColor="rgba(37,99,235,0.4)" />
                                    <stop offset="100%" stopColor="rgba(37,99,235,0)" />
                                </linearGradient>
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>
                            <path d="M 10% 85% Q 30% 75% 40% 55% T 60% 40% T 80% 25% T 95% 10%"
                                fill="none" stroke="url(#fiberG)" strokeWidth="2" filter="url(#glow)" opacity="0.5" />
                            <path d="M 5% 90% Q 25% 80% 35% 60% T 55% 45% T 75% 30% T 90% 15%"
                                fill="none" stroke="url(#fiberG)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
                        </svg>

                        {/* Decorative particles */}
                        <div style={{ position: "absolute", left: "25%", top: "50%", width: 6, height: 6, background: "#94a3b8", borderRadius: 2, opacity: 0.3, animation: "pulse-glow 2s infinite" }} />
                        <div style={{ position: "absolute", right: "33%", bottom: "33%", width: 4, height: 4, background: "#3b82f6", borderRadius: 2, opacity: 0.3, animation: "pulse-glow 2s infinite 0.7s" }} />
                        <div style={{ position: "absolute", left: "50%", top: "25%", width: 8, height: 8, border: "1px solid #cbd5e1", borderRadius: 2, opacity: 0.25, transform: "rotate(45deg)" }} />

                        {/* ── Course Monolith Cards ── */}
                        <div className="helix-grid-fallback" style={{ position: "relative", width: "100%", maxWidth: 1200, height: "100%", display: "contents" }}>
                            {COURSES.map((course, idx) => {
                                const pos = cardPositions[idx % cardPositions.length];
                                const color = courseColors[idx % courseColors.length];
                                const prog = courseProgress[course.id] || 0;
                                const cubeLabel = cubeLabelMap[course.id] || course.title.substring(0, 2);

                                return (
                                    <Link key={course.id} href={`/dashboard/learning/courses/${course.id}`} style={{ textDecoration: "none" }}>
                                        <motion.div
                                            className={`monolith-card helix-card-wrap ${pos.anim === "float-slow" ? "helix-float-slow" : "helix-float-delayed"}`}
                                            initial={{ opacity: 0, y: 40, scale: pos.scale * 0.8 }}
                                            animate={{ opacity: 1, y: 0, scale: pos.scale }}
                                            transition={{ delay: pos.delay, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                                            style={{
                                                position: "absolute",
                                                left: pos.left, top: pos.top,
                                                width: 220, minHeight: 260,
                                                borderRadius: 16, padding: 20,
                                                cursor: "pointer", zIndex: pos.z,
                                                display: "flex", flexDirection: "column",
                                            }}
                                        >
                                            {/* Top accent line */}
                                            <div style={{
                                                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                                                background: color, borderRadius: "16px 16px 0 0",
                                            }} />

                                            {/* 3D Cube Icon */}
                                            <div style={{
                                                flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
                                                perspective: 500, minHeight: 100,
                                            }}>
                                                <CubeIcon label={cubeLabel} color={color} duration={8 + idx * 2} />
                                            </div>

                                            {/* Card body */}
                                            <div style={{ marginTop: 12 }}>
                                                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e293b", lineHeight: 1.1, margin: 0 }}>
                                                    {course.title}
                                                </h3>
                                                <p style={{ fontSize: 10, color: "#64748b", marginTop: 6, fontFamily: "monospace", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                                                    {course.id.replace(/-/g, "_").toUpperCase()}
                                                </p>

                                                {/* Progress bar or tag */}
                                                {prog > 0 ? (
                                                    <div style={{ marginTop: 10 }}>
                                                        <div style={{ width: "100%", height: 4, background: "rgba(226,232,240,0.5)", borderRadius: 999, overflow: "hidden" }}>
                                                            <div style={{
                                                                width: `${prog}%`, height: "100%",
                                                                background: color,
                                                                boxShadow: `0 0 8px ${color}60`,
                                                            }} />
                                                        </div>
                                                        <span style={{ fontSize: 9, color: "#94a3b8", marginTop: 4, display: "block" }}>
                                                            {prog === 100 ? "완료" : `${prog}% 진행`}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                                                        <span style={{
                                                            padding: "2px 8px", borderRadius: 4, fontSize: 9, fontWeight: 700,
                                                            background: `${color}15`, color, border: `1px solid ${color}30`,
                                                        }}>
                                                            {course.chapters.length}챕터
                                                        </span>
                                                        <span style={{
                                                            padding: "2px 8px", borderRadius: 4, fontSize: 9, fontWeight: 700,
                                                            background: `${color}15`, color, border: `1px solid ${color}30`,
                                                        }}>
                                                            {course.totalUnits}유닛
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* ═══ BOTTOM PANELS — Mastery Index & Active Synapses ═══ */}
                    <div className="bottom-panels-wrap" style={{
                        position: "relative", zIndex: 50, padding: "0 24px 32px",
                        display: "flex", justifyContent: "space-between", alignItems: "flex-end",
                        flexWrap: "wrap", gap: 16,
                    }}>
                        {/* ── LEFT: Mastery Index ── */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5, duration: 0.7 }}
                            className="glass-frosted bottom-panel-left"
                            style={{ borderRadius: 16, padding: 24, width: 280 }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 16 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <MI icon="donut_large" style={{ fontSize: 20, color: "#2563eb" }} />
                                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b" }}>
                                        Mastery Index
                                    </span>
                                </div>
                                <span style={{ background: "#dbeafe", color: "#1d4ed8", fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4 }}>
                                    V2.0
                                </span>
                            </div>
                            <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                                <span style={{ fontSize: 40, fontWeight: 700, color: "#0f172a" }}>
                                    {levelProgress.progress}
                                </span>
                                <span style={{ fontSize: 14, fontWeight: 500, color: "#94a3b8" }}>/ 100</span>
                            </div>
                            <div style={{ width: "100%", background: "rgba(226,232,240,0.5)", height: 6, borderRadius: 999, overflow: "hidden", marginTop: 8 }}>
                                <div style={{
                                    width: `${levelProgress.progress}%`, height: "100%",
                                    background: "linear-gradient(90deg, #2563eb, #4338ca)",
                                    boxShadow: "0 0 10px rgba(59,130,246,0.5)",
                                }} />
                            </div>
                            <p style={{ fontSize: 10, color: "#94a3b8", marginTop: 8 }}>
                                다음 레벨까지 {levelProgress.needed - levelProgress.current} XP
                            </p>

                            {/* Weekly XP Mini Chart */}
                            <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 40, marginTop: 16 }}>
                                {weeklyXP.map((d, i) => {
                                    const max = Math.max(...weeklyXP.map(x => x.xp), 1);
                                    const isToday = i === new Date().getDay();
                                    return (
                                        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                                            <motion.div
                                                initial={{ height: 0 }}
                                                animate={{ height: `${Math.max((d.xp / max) * 30, d.xp > 0 ? 4 : 2)}px` }}
                                                transition={{ delay: 0.8 + i * 0.05 }}
                                                style={{
                                                    width: "100%", borderRadius: "3px 3px 1px 1px",
                                                    background: isToday ? "linear-gradient(to top, #2563eb, #60a5fa)" : d.xp > 0 ? "#cbd5e1" : "#f1f5f9",
                                                    boxShadow: isToday ? "0 0 6px rgba(37,99,235,0.4)" : "none",
                                                }}
                                            />
                                            <span style={{ fontSize: 8, fontWeight: isToday ? 700 : 400, color: isToday ? "#2563eb" : "#94a3b8" }}>{d.day}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>

                        {/* ── CENTER: Stats ── */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                            style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}
                        >
                            {[
                                { label: "연속 출석", val: `${progress?.streak || 0}일`, icon: "local_fire_department", c: "#ef4444" },
                                { label: "성공률", val: `${successRate}%`, icon: "trending_up", c: "#2563eb" },
                                { label: "코드 제출", val: `${submissions}회`, icon: "terminal", c: "#7c3aed" },
                                { label: "총 XP", val: `${(progress?.xp || 0).toLocaleString()}`, icon: "star", c: "#f59e0b" },
                            ].map((s) => (
                                <motion.div key={s.label} whileHover={{ scale: 1.06, y: -4 }}
                                    className="glass-frosted"
                                    style={{
                                        borderRadius: 14, padding: "12px 18px", textAlign: "center",
                                        minWidth: 90,
                                    }}
                                >
                                    <MI icon={s.icon} style={{ fontSize: 18, color: s.c, marginBottom: 4, display: "block" }} />
                                    <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>{s.val}</div>
                                    <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{s.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* ── RIGHT: Active Synapses ── */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, duration: 0.7 }}
                            className="bottom-panel-right"
                            style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}
                        >
                            <div className="glass-frosted" style={{ borderRadius: 16, padding: 16, width: 260 }}>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b" }}>
                                        최근 활동
                                    </span>
                                    <div style={{ display: "flex", gap: 3 }}>
                                        {[0, 1, 2].map(i => (
                                            <div key={i} style={{
                                                width: 5, height: 5, borderRadius: "50%", background: "#34d399",
                                                animation: `pulse-glow 1.5s infinite ${i * 0.15}s`,
                                            }} />
                                        ))}
                                    </div>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    {recentActivity.length === 0 ? (
                                        <div style={{
                                            display: "flex", alignItems: "center", gap: 8, padding: "10px 12px",
                                            borderRadius: 10, background: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.5)",
                                        }}>
                                            <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>
                                                <MI icon="edit_note" style={{ fontSize: 16 }} />
                                            </div>
                                            <div>
                                                <p style={{ fontSize: 11, fontWeight: 700, color: "#64748b", margin: 0 }}>활동 기록 없음</p>
                                                <p style={{ fontSize: 9, color: "#94a3b8", margin: "2px 0 0" }}>코스를 시작해보세요</p>
                                            </div>
                                        </div>
                                    ) : (
                                        recentActivity.slice(0, 3).map((a: any, i: number) => (
                                            <motion.div key={i}
                                                initial={{ opacity: 0, x: 8 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.8 + i * 0.08 }}
                                                style={{
                                                    display: "flex", alignItems: "center", gap: 8, padding: "8px 10px",
                                                    borderRadius: 10, background: "rgba(255,255,255,0.4)", border: "1px solid rgba(255,255,255,0.5)",
                                                }}
                                            >
                                                <div style={{
                                                    width: 28, height: 28, borderRadius: 6,
                                                    background: i === 0 ? "#dbeafe" : "#f3e8ff",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    color: i === 0 ? "#2563eb" : "#7c3aed",
                                                }}>
                                                    <MI icon={i === 0 ? "code" : "hub"} style={{ fontSize: 16 }} />
                                                </div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <p style={{ fontSize: 11, fontWeight: 700, color: "#1e293b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                        {a.reason || "경험치 획득"}
                                                    </p>
                                                    <p style={{ fontSize: 9, color: "#94a3b8", margin: "1px 0 0" }}>+{a.amount} XP</p>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Streak indicator */}
                            <motion.div whileHover={{ scale: 1.1 }}
                                className="glass-frosted"
                                style={{
                                    width: 52, height: 52, borderRadius: "50%",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    cursor: "pointer", boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                                }}
                            >
                                <MI icon="rocket_launch" style={{ fontSize: 22, color: "#64748b" }} />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
