"use client";

import { useUserProgress } from "@/hooks/useUserProgress";
import { useState, useEffect, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getTierInfo, getDisplayTier, calcLevel, xpForNextLevel, checkAttendance } from "@/lib/xp-engine";
import { COURSES, getCurriculumStats } from "@/data/courses";
import { FadeIn, AnimatedBar, GlowPulse, HoverGlow } from "@/components/motion/motion";
import { AnimatedCounter } from "@/components/motion/counter";
import { TiltCard } from "@/components/motion/tilt-card";

/* ── Styles ── */
const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

/* ── GitHub-style Heatmap Component ── */
function ActivityHeatmap({ data }: { data: Record<string, number> }) {
    const weeks = 12; // 12주
    const today = new Date();
    const cells: { date: string; count: number; dayOfWeek: number }[] = [];

    for (let i = weeks * 7 - 1; i >= 0; i--) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().split("T")[0];
        cells.push({ date: key, count: data[key] || 0, dayOfWeek: d.getDay() });
    }

    const maxCount = Math.max(...cells.map(c => c.count), 1);
    const getColor = (count: number) => {
        if (count === 0) return "#f1f5f9";
        const intensity = Math.min(count / maxCount, 1);
        if (intensity < 0.25) return "#bbf7d0";
        if (intensity < 0.5) return "#4ade80";
        if (intensity < 0.75) return "#22c55e";
        return "#15803d";
    };

    // Group into weeks (columns)
    const weekCols: typeof cells[] = [];
    for (let i = 0; i < cells.length; i += 7) {
        weekCols.push(cells.slice(i, i + 7));
    }

    const DAY_LABELS = ["", "월", "", "수", "", "금", ""];

    return (
        <div style={{ display: "flex", gap: 3 }}>
            {/* Day labels */}
            <div style={{ display: "flex", flexDirection: "column", gap: 3, marginTop: 0 }}>
                {DAY_LABELS.map((l, i) => (
                    <span key={i} style={{ fontSize: 9, color: "#94a3b8", height: 12, lineHeight: "12px", width: 16, textAlign: "right" }}>{l}</span>
                ))}
            </div>
            {/* Grid cells */}
            {weekCols.map((week, wi) => (
                <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {week.map((cell, di) => (
                        <motion.div
                            key={cell.date}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: wi * 0.02 + di * 0.01, duration: 0.3 }}
                            title={`${cell.date}: ${cell.count}회 활동`}
                            style={{
                                width: 12, height: 12, borderRadius: 3,
                                background: getColor(cell.count),
                                transition: "background 0.3s",
                                cursor: "pointer",
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

/* ── Roadmap ── */
const ROADMAP = COURSES.map((c, i) => ({
    title: c.title, icon: c.icon, id: c.id,
    status: (i === 0 ? "done" : i === 1 ? "active" : "locked") as "done" | "active" | "locked",
}));

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
    const userId = user?.id || null;

    // Fetch all data
    useEffect(() => {
        async function load() {
            if (!user) return;
            const uid = user.id;

            // User course progress
            try { const { data: ucp } = await supabase.from("user_course_progress").select("*").eq("user_id", uid); if (ucp) setUserCourseProgress(ucp); } catch { }

            // Attendance check
            try {
                const today = new Date().toISOString().split("T")[0];
                const { data: att } = await supabase.from("attendance").select("id").eq("user_id", uid).eq("check_date", today).maybeSingle();
                if (att) setAttendanceChecked(true);
            } catch { }

            // Code submissions stats
            try {
                const { data: subs } = await supabase.from("code_submissions").select("status").eq("user_id", uid);
                if (subs) {
                    setSubmissions(subs.length);
                    const success = subs.filter((d: any) => d.status === "success").length;
                    setSuccessRate(subs.length > 0 ? Math.round((success / subs.length) * 100) : 0);
                }
            } catch { }

            // Recent activity
            try {
                const { data: acts } = await supabase.from("xp_logs").select("*").eq("user_id", uid)
                    .order("created_at", { ascending: false }).limit(5);
                if (acts) setRecentActivity(acts);
            } catch { }

            // === REAL Weekly XP Chart ===
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
                // Fallback to empty
                setWeeklyXP(["일", "월", "화", "수", "목", "금", "토"].map(d => ({ day: d, xp: 0 })));
            }

            // === Activity Heatmap (90 days) ===
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

    const handleAttendance = async () => {
        if (!user || attendanceChecked) return;
        const result = await checkAttendance(user.id);
        if (result.alreadyChecked) setAttendanceMsg("이미 오늘 출석했어요!");
        else setAttendanceMsg(`출석 완료! +10 XP 🎉`);
        setAttendanceChecked(true);
        setTimeout(() => setAttendanceMsg(""), 3000);
    };

    const tierInfo = getDisplayTier(progress?.tier || "Iron", progress?.level || 1, progress?.placement_done);
    const levelProgress = xpForNextLevel(progress?.xp || 0);

    const COURSE_COLORS = COURSES.map(c => {
        const m = c.gradient.match(/#[a-fA-F0-9]{6}/g);
        return m?.[0] || "#0ea5e9";
    });

    return (
        <>
            <style>{`
                @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
                @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
            `}</style>

            <div style={{ display: "grid", gap: 32 }} className="lg-grid-10">
                <style>{`@media (min-width: 1024px) { .lg-grid-10 { grid-template-columns: 7fr 3fr !important; } }`}</style>

                {/* ═══ Main Content ═══ */}
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>

                    {/* ── Welcome + 출석체크 ── */}
                    <FadeIn>
                        <div style={{ ...glassCard, borderRadius: 28, padding: 28, position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, background: "rgba(14,165,233,0.06)", borderRadius: "50%", filter: "blur(40px)" }} />
                            <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, background: "rgba(99,102,241,0.05)", borderRadius: "50%", filter: "blur(30px)" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10, flexWrap: "wrap", gap: 16 }}>
                                <div>
                                    <h1 style={{ fontWeight: 800, fontSize: 24, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: 12 }}>
                                        <span style={{ fontSize: 28 }}>{tierInfo.icon}</span>
                                        안녕하세요, {user?.email?.split("@")[0] || "학생"}님!
                                    </h1>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 10 }}>
                                        <span style={{
                                            fontSize: 11, fontWeight: 700, color: "#fff",
                                            background: tierInfo.gradient, padding: "3px 10px",
                                            borderRadius: 8,
                                        }}>
                                            Lv.{progress?.level || 1}
                                        </span>
                                        <span style={{ fontSize: 13, color: "#64748b" }}>{tierInfo.nameKo}</span>
                                        <div style={{ width: 140, height: 8, background: "#e2e8f0", borderRadius: 999, overflow: "hidden", position: "relative" }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${levelProgress.progress}%` }}
                                                transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                style={{ height: "100%", background: "linear-gradient(90deg, #0ea5e9, #6366f1)", borderRadius: 999 }}
                                            />
                                        </div>
                                        <span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>
                                            {levelProgress.needed - levelProgress.current} XP →
                                        </span>
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <AnimatePresence>
                                        {attendanceMsg && (
                                            <motion.span
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                style={{ fontSize: 13, fontWeight: 700, color: "#059669", background: "#dcfce7", padding: "6px 14px", borderRadius: 12, border: "1px solid #86efac" }}
                                            >{attendanceMsg}</motion.span>
                                        )}
                                    </AnimatePresence>
                                    {!attendanceChecked ? (
                                        <GlowPulse color="rgba(14,165,233,0.4)">
                                            <motion.button
                                                onClick={handleAttendance}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                style={{
                                                    padding: "12px 24px", borderRadius: 14, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer",
                                                    background: "linear-gradient(135deg, #0ea5e9, #6366f1)", color: "#fff",
                                                    boxShadow: "0 8px 20px rgba(14,165,233,0.3)",
                                                    display: "flex", alignItems: "center", gap: 8,
                                                }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>
                                                출석체크
                                            </motion.button>
                                        </GlowPulse>
                                    ) : (
                                        <button disabled style={{
                                            padding: "12px 24px", borderRadius: 14, border: "none", fontSize: 14, fontWeight: 700,
                                            background: "#f1f5f9", color: "#94a3b8", display: "flex", alignItems: "center", gap: 8,
                                        }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>check_circle</span>
                                            출석 완료 ✓
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* ── 활동 히트맵 (GitHub 스타일) ── */}
                    <FadeIn delay={0.1}>
                        <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                <h2 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", display: "flex", alignItems: "center", gap: 10, margin: 0 }}>
                                    <span style={{ padding: 6, background: "#dcfce7", color: "#15803d", borderRadius: 10, display: "flex" }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>grid_view</span>
                                    </span>
                                    학습 활동 히트맵
                                </h2>
                                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                    <span style={{ fontSize: 10, color: "#94a3b8" }}>적음</span>
                                    {["#f1f5f9", "#bbf7d0", "#4ade80", "#22c55e", "#15803d"].map(c => (
                                        <span key={c} style={{ width: 10, height: 10, borderRadius: 2, background: c }} />
                                    ))}
                                    <span style={{ fontSize: 10, color: "#94a3b8" }}>많음</span>
                                </div>
                            </div>
                            <div style={{ overflowX: "auto", paddingBottom: 4 }}>
                                <ActivityHeatmap data={heatmapData} />
                            </div>
                            <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 11, color: "#94a3b8" }}>
                                <span>총 {Object.values(heatmapData).reduce((a, b) => a + b, 0)}회 활동</span>
                                <span>{Object.keys(heatmapData).length}일 참여</span>
                            </div>
                        </div>
                    </FadeIn>

                    {/* ── 과목별 학습 진행률 ── */}
                    <FadeIn delay={0.15}>
                        <div style={{ ...glassCard, borderRadius: 28, padding: 28 }}>
                            <h2 style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ padding: 8, background: "#e0f2fe", color: "#0284c7", borderRadius: 12, display: "flex" }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>trending_up</span>
                                </span>
                                과목별 학습 진행률
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {COURSES.map((c: any, i: number) => {
                                    const ucp = userCourseProgress.find((u) => u.course_id === c.id);
                                    const lessons = ucp?.completed_lessons;
                                    const done = Array.isArray(lessons) ? lessons.length : (typeof lessons === 'number' ? lessons : 0);
                                    const total = c.totalUnits || 1;
                                    const pct = Math.round((done / total) * 100);
                                    const color = COURSE_COLORS[i % COURSE_COLORS.length];
                                    return (
                                        <div key={c.title || i}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                    <span style={{ fontSize: 16 }}>{c.icon}</span>
                                                    <span style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{c.title}</span>
                                                </div>
                                                <span style={{ fontSize: 13, fontWeight: 800, color }}>{pct}%</span>
                                            </div>
                                            <div style={{ width: "100%", height: 8, background: "#f1f5f9", borderRadius: 999, overflow: "hidden" }}>
                                                <AnimatedBar width={`${pct}%`} color={`linear-gradient(90deg, ${color}, ${color}88)`} delay={i * 0.1} />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </FadeIn>

                    {/* ── 학습 로드맵 ── */}
                    <FadeIn delay={0.25}>
                        <div style={{ ...glassCard, borderRadius: 40, padding: 32, position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: "linear-gradient(to right, #38bdf8, #6366f1, transparent)", opacity: 0.5 }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
                                <div>
                                    <h2 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", letterSpacing: "-0.02em" }}>학습 로드맵</h2>
                                    <p style={{ fontSize: 13, color: "#64748b", fontWeight: 400 }}>단계별로 학습 여정을 따라가세요</p>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, position: "relative" }}>
                                {ROADMAP.map((node, i) => (
                                    <motion.div key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                        style={{ display: "flex", alignItems: "center", gap: 12, flex: "1 1 120px", justifyContent: "center", position: "relative" }}>
                                        <motion.div
                                            whileHover={{ scale: 1.15, rotate: 5 }}
                                            style={{
                                                width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                                position: "relative", zIndex: 2, cursor: "pointer",
                                                ...(node.status === "done" ? { background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", boxShadow: "0 8px 20px rgba(34,197,94,0.25)" }
                                                    : node.status === "active" ? { background: "linear-gradient(135deg, #0ea5e9, #2563eb)", color: "#fff", boxShadow: "0 8px 20px rgba(14,165,233,0.3)" }
                                                        : { background: "#f1f5f9", color: "#94a3b8", border: "2px solid #e2e8f0" })
                                            }}>
                                            <span style={{ fontSize: 24 }}>{node.status === "done" ? "✓" : node.icon}</span>
                                        </motion.div>
                                        <div>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: node.status === "locked" ? "#94a3b8" : "#0f172a" }}>{node.title}</div>
                                            <div style={{ fontSize: 11, color: node.status === "done" ? "#22c55e" : node.status === "active" ? "#0ea5e9" : "#cbd5e1", fontWeight: 600 }}>
                                                {node.status === "done" ? "완료 ✓" : node.status === "active" ? "학습중 →" : "잠김 🔒"}
                                            </div>
                                        </div>
                                        {i < ROADMAP.length - 1 && (
                                            <div style={{ width: 24, height: 2, background: node.status === "done" ? "#22c55e" : "#e2e8f0", position: "absolute", right: -18, top: "50%" }} />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* ── 주간 XP + 최근 활동 ── */}
                    <FadeIn delay={0.35}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="stats-grid-2">
                            <style>{`@media (max-width: 767px) { .stats-grid-2 { grid-template-columns: 1fr !important; } }`}</style>

                            {/* 주간 XP 차트 (REAL Supabase data) */}
                            <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ padding: 6, background: "#dbeafe", color: "#2563eb", borderRadius: 8, display: "flex" }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>bar_chart</span>
                                    </span>
                                    이번 주 XP
                                    <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500, marginLeft: "auto" }}>실시간</span>
                                </h3>
                                <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 120 }}>
                                    {weeklyXP.map((d, i, arr) => {
                                        const max = Math.max(...arr.map(x => x.xp), 1);
                                        const isToday = i === new Date().getDay();
                                        return (
                                            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                                <span style={{ fontSize: 10, fontWeight: 700, color: isToday ? "#0ea5e9" : "#94a3b8" }}>{d.xp}</span>
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${Math.max((d.xp / max) * 80, d.xp > 0 ? 6 : 2)}px` }}
                                                    transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                    style={{
                                                        width: "100%", maxWidth: 32, borderRadius: "6px 6px 3px 3px", minHeight: 2,
                                                        background: isToday
                                                            ? "linear-gradient(to top, #0ea5e9, #38bdf8)"
                                                            : d.xp > 0 ? "linear-gradient(to top, #cbd5e1, #94a3b8)" : "#f1f5f9",
                                                        boxShadow: isToday ? "0 4px 12px rgba(14,165,233,0.2)" : "none",
                                                    }}
                                                />
                                                <span style={{ fontSize: 11, fontWeight: isToday ? 800 : 600, color: isToday ? "#0ea5e9" : "#64748b" }}>{d.day}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* 최근 활동 */}
                            <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ padding: 6, background: "#fef3c7", color: "#d97706", borderRadius: 8, display: "flex" }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 16 }}>schedule</span>
                                    </span>
                                    최근 활동
                                </h3>
                                {recentActivity.length === 0 ? (
                                    <div style={{ textAlign: "center", padding: 24, color: "#94a3b8" }}>
                                        <span style={{ fontSize: 28, display: "block", marginBottom: 4 }}>📝</span>
                                        아직 활동 기록이 없어요
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        {recentActivity.map((a: any, i: number) => (
                                            <motion.div key={i}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i }}
                                                style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, background: "#f8fafc" }}>
                                                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #0ea5e9, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13, flexShrink: 0 }}>⭐</div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.reason || "경험치 획득"}</div>
                                                    <div style={{ fontSize: 10, color: "#94a3b8" }}>{new Date(a.created_at).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
                                                </div>
                                                <span style={{ fontSize: 13, fontWeight: 800, color: "#059669", whiteSpace: "nowrap" }}>+{a.amount} XP</span>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </FadeIn>

                    {/* ── 코스 카드 그리드 ── */}
                    <FadeIn delay={0.45}>
                        <div>
                            <h2 style={{ fontWeight: 800, fontSize: 20, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                                <span className="material-symbols-outlined" style={{ color: "#6366f1", fontSize: 22 }}>library_books</span>
                                전체 코스
                                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500, marginLeft: "auto" }}>{COURSES.length}개 코스</span>
                            </h2>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                                {COURSES.map((c: any, i: number) => {
                                    const ucp = userCourseProgress.find((u) => u.course_id === c.id);
                                    const lessons = ucp?.completed_lessons;
                                    const done = Array.isArray(lessons) ? lessons.length : (typeof lessons === 'number' ? lessons : 0);
                                    const total = c.totalUnits || 1;
                                    const pct = Math.round((done / total) * 100);
                                    const color = COURSE_COLORS[i % COURSE_COLORS.length];
                                    return (
                                        <HoverGlow key={c.title || i} glowColor={`${color}22`}>
                                            <Link href={`/dashboard/learning/courses/${c.id || i}`} style={{ textDecoration: "none", display: "block" }}>
                                                <motion.div
                                                    whileHover={{ y: -4, boxShadow: `0 12px 30px ${color}20` }}
                                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                                    style={{ ...glassCard, borderRadius: 20, padding: 24, position: "relative", overflow: "hidden" }}>
                                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(90deg, ${color}, ${color}66)` }} />
                                                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                                                        <div style={{ width: 44, height: 44, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, background: `${color}15` }}>
                                                            {c.icon}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>{c.title}</div>
                                                            <div style={{ fontSize: 11, color: "#94a3b8" }}>{c.chapters.length}챕터 · {c.totalUnits}유닛</div>
                                                        </div>
                                                    </div>
                                                    <p style={{ fontSize: 12, color: "#64748b", marginBottom: 12, lineHeight: 1.5 }}>{c.description}</p>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <div style={{ flex: 1, height: 6, background: "#f1f5f9", borderRadius: 999, marginRight: 12, overflow: "hidden" }}>
                                                            <AnimatedBar width={`${pct}%`} color={color} height={6} delay={i * 0.1} />
                                                        </div>
                                                        <span style={{ fontSize: 12, fontWeight: 800, color }}>{pct}%</span>
                                                    </div>
                                                </motion.div>
                                            </Link>
                                        </HoverGlow>
                                    );
                                })}
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* ═══ Sidebar ═══ */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* 티어 카드 */}
                    <FadeIn delay={0.2} direction="right">
                        <TiltCard maxTilt={6} style={{
                            padding: 24, borderRadius: 24,
                            background: tierInfo.gradient, color: "#fff",
                            boxShadow: `0 20px 40px ${tierInfo.color}30`,
                        }}>
                            <div style={{ position: "absolute", top: -20, right: -20, fontSize: 80, opacity: 0.15 }}>{tierInfo.icon}</div>
                            <div style={{ position: "relative", zIndex: 10 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, opacity: 0.8, marginBottom: 4 }}>현재 티어</div>
                                <div style={{ fontSize: 28, fontWeight: 900, display: "flex", alignItems: "center", gap: 10 }}>
                                    {tierInfo.icon} {tierInfo.nameKo}
                                </div>
                                <div style={{ fontSize: 12, opacity: 0.8, marginTop: 4 }}>Lv.{progress?.level || 1} · XP {progress?.xp || 0}</div>
                                {(progress?.level || 1) < 30 && (
                                    <div style={{ marginTop: 12, fontSize: 11, opacity: 0.7 }}>
                                        🎯 레벨 30 도달 시 배치고사 가능!
                                    </div>
                                )}
                                <Link href="/dashboard/learning/tier" style={{
                                    display: "inline-flex", marginTop: 14, padding: "8px 16px", borderRadius: 12,
                                    background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 12, fontWeight: 700,
                                    textDecoration: "none", alignItems: "center", gap: 6,
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>shield</span>
                                    티어 상세 보기
                                </Link>
                            </div>
                        </TiltCard>
                    </FadeIn>

                    {/* 통계 카드 */}
                    <FadeIn delay={0.3} direction="right">
                        <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f59e0b" }}>bar_chart</span>
                                나의 학습 현황
                            </h3>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                                {[
                                    { label: "🔥 연속 출석", value: `${progress?.streak || 0}일`, color: "#ef4444" },
                                    { label: "📊 성공률", value: `${successRate}%`, color: "#0ea5e9" },
                                    { label: "💻 코드 제출", value: `${submissions}회`, color: "#8b5cf6" },
                                    { label: "✅ 풀은 문제", value: `${progress?.totalProblems || 0}개`, color: "#22c55e" },
                                    { label: "⭐ 경험치", value: `${(progress?.xp || 0).toLocaleString()}`, color: "#f59e0b" },
                                    { label: "📈 레벨", value: `Lv.${calcLevel(progress?.xp || 0)}`, color: "#06b6d4" },
                                ].map((s, si) => (
                                    <motion.div key={s.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + si * 0.06 }}
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        style={{ padding: 14, borderRadius: 16, background: "#f8fafc", textAlign: "center", cursor: "default" }}>
                                        <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>{s.label}</div>
                                        <div style={{ fontSize: 18, fontWeight: 900, color: s.color }}>{s.value}</div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* 빠른 이동 */}
                    <FadeIn delay={0.4} direction="right">
                        <div style={{ ...glassCard, borderRadius: 24, padding: 20 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>⚡ 바로가기</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {[
                                    { label: "C 컴파일러", icon: "terminal", href: "/dashboard/learning/compiler", color: "#ec4899" },
                                    { label: "오늘의 챌린지", icon: "bolt", href: "/dashboard/learning/courses", color: "#f59e0b" },
                                    { label: "리더보드", icon: "diversity_3", href: "/dashboard/learning/leaderboard", color: "#14b8a6" },
                                    { label: "채팅방", icon: "chat", href: "/dashboard/learning/chat", color: "#6366f1" },
                                ].map((q) => (
                                    <motion.div key={q.label}
                                        whileHover={{ x: 4, backgroundColor: "#f0f9ff" }}
                                        transition={{ type: "spring", stiffness: 400, damping: 25 }}>
                                        <Link href={q.href} style={{
                                            display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                                            borderRadius: 14, background: "#f8fafc", textDecoration: "none",
                                            fontSize: 13, fontWeight: 600, color: "#475569",
                                        }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: q.color }}>{q.icon}</span>
                                            {q.label}
                                            <motion.span className="material-symbols-outlined"
                                                style={{ fontSize: 14, color: "#cbd5e1", marginLeft: "auto" }}
                                                whileHover={{ x: 4 }}>chevron_right</motion.span>
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </>
    );
}
