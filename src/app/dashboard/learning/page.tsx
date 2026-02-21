"use client";

import { useUserProgress } from "@/hooks/useUserProgress";
import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { getTierInfo, getDisplayTier, calcLevel, xpForNextLevel, checkAttendance, TIERS } from "@/lib/xp-engine";
import { COURSES, getCurriculumStats } from "@/data/courses";
import { FadeIn, StaggerList, StaggerItem, ScaleOnHover, AnimatedBar } from "@/components/motion/motion";
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

/* ── Roadmap (새 데이터 기반) ── */
const ROADMAP = COURSES.map((c, i) => ({
    title: c.title, icon: c.icon, id: c.id,
    status: (i === 0 ? "done" : i === 1 ? "active" : "locked") as "done" | "active" | "locked",
}));

export default function JourneyPage() {
    const { progress } = useUserProgress();
    const { user } = useAuth();
    const [courses, setCourses] = useState<any[]>([]);
    const [userCourseProgress, setUserCourseProgress] = useState<any[]>([]);
    const [attendanceChecked, setAttendanceChecked] = useState(false);
    const [attendanceMsg, setAttendanceMsg] = useState("");
    const [submissions, setSubmissions] = useState(0);
    const [successRate, setSuccessRate] = useState(0);
    const [recentActivity, setRecentActivity] = useState<any[]>([]);

    const supabase = useMemo(() => createClient(), []);
    const stats = useMemo(() => getCurriculumStats(), []);

    // Fetch user progress from Supabase
    useEffect(() => {
        async function load() {
            setCourses(COURSES.map(c => ({ ...c, total_lessons: c.totalUnits })));

            if (user) {
                try {
                    const { data: ucp } = await supabase.from("user_course_progress").select("*").eq("user_id", user.id);
                    if (ucp) setUserCourseProgress(ucp);
                } catch { /* 테이블 없으면 무시 */ }

                try {
                    // 오늘 출석 여부 확인
                    const today = new Date().toISOString().split("T")[0];
                    const { data: att } = await supabase.from("attendance").select("id").eq("user_id", user.id).eq("check_date", today).maybeSingle();
                    if (att) setAttendanceChecked(true);
                } catch { /* 테이블 없으면 무시 */ }

                // 코드 제출 통계
                try {
                    const { data: subs } = await supabase.from("code_submissions").select("status").eq("user_id", user.id);
                    if (subs) {
                        setSubmissions(subs.length);
                        const success = subs.filter((d: any) => d.status === "success").length;
                        setSuccessRate(subs.length > 0 ? Math.round((success / subs.length) * 100) : 0);
                    }
                } catch { /* 테이블 없으면 무시 */ }

                // 최근 활동
                try {
                    const { data: acts } = await supabase.from("xp_logs").select("*").eq("user_id", user.id)
                        .order("created_at", { ascending: false }).limit(5);
                    if (acts) setRecentActivity(acts);
                } catch { /* 테이블 없으면 무시 */ }
            }
        }
        load();
    }, [user, supabase]);

    const handleAttendance = async () => {
        if (!user || attendanceChecked) return;
        const result = await checkAttendance(user.id);
        if (result.alreadyChecked) {
            setAttendanceMsg("이미 오늘 출석했어요!");
        } else {
            setAttendanceMsg(`출석 완료! +${10} XP 🎉`);
        }
        setAttendanceChecked(true);
        setTimeout(() => setAttendanceMsg(""), 3000);
    };

    const tierInfo = getDisplayTier(progress?.tier || "Iron", progress?.level || 1, progress?.placement_done);
    const levelProgress = xpForNextLevel(progress?.xp || 0);

    // 코스별 색상
    const COURSE_COLORS = COURSES.map(c => {
        const m = c.gradient.match(/#[a-fA-F0-9]{6}/g);
        return m?.[0] || "#0ea5e9";
    });

    return (
        <>
            <style>{`
                @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
                @keyframes ping { 75%,100% { transform: scale(2); opacity: 0; } }
            `}</style>

            <div style={{ display: "grid", gap: 32 }} className="lg-grid-10">
                <style>{`@media (min-width: 1024px) { .lg-grid-10 { grid-template-columns: 7fr 3fr !important; } }`}</style>

                {/* ═══ Main Content ═══ */}
                <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>

                    {/* ── Welcome + 출석체크 ── */}
                    <FadeIn>
                        <div style={{ ...glassCard, borderRadius: 28, padding: 28, position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, background: "rgba(14,165,233,0.06)", borderRadius: "50%", filter: "blur(40px)" }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10, flexWrap: "wrap", gap: 16 }}>
                                <div>
                                    <h1 style={{ fontWeight: 800, fontSize: 24, color: "#0f172a", margin: 0, display: "flex", alignItems: "center", gap: 12 }}>
                                        <span style={{ fontSize: 28 }}>{tierInfo.icon}</span>
                                        안녕하세요, {user?.email?.split("@")[0] || "학생"}님!
                                    </h1>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                                        <span style={{ fontSize: 13, color: "#64748b" }}>
                                            Lv.{progress?.level || 1} · {tierInfo.nameKo} · XP {progress?.xp || 0}
                                        </span>
                                        <div style={{ width: 120, height: 6, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                                            <div style={{ width: `${levelProgress.progress}%`, height: "100%", background: "linear-gradient(90deg, #0ea5e9, #6366f1)", borderRadius: 999, transition: "width 0.5s" }} />
                                        </div>
                                        <span style={{ fontSize: 11, color: "#94a3b8" }}>다음 레벨까지 {levelProgress.needed - levelProgress.current} XP</span>
                                    </div>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    {attendanceMsg && (
                                        <span style={{ fontSize: 13, fontWeight: 700, color: "#059669", background: "#dcfce7", padding: "6px 14px", borderRadius: 12 }}>{attendanceMsg}</span>
                                    )}
                                    <button onClick={handleAttendance} disabled={attendanceChecked} style={{
                                        padding: "12px 24px", borderRadius: 14, border: "none", fontSize: 14, fontWeight: 700, cursor: attendanceChecked ? "default" : "pointer",
                                        background: attendanceChecked ? "#f1f5f9" : "linear-gradient(135deg, #0ea5e9, #6366f1)",
                                        color: attendanceChecked ? "#94a3b8" : "#fff",
                                        boxShadow: attendanceChecked ? "none" : "0 8px 20px rgba(14,165,233,0.3)",
                                        transition: "all 0.2s", display: "flex", alignItems: "center", gap: 8,
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{attendanceChecked ? "check_circle" : "login"}</span>
                                        {attendanceChecked ? "출석 완료 ✓" : "출석체크"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

                    {/* ── 학습 진행률 (과목별) ── */}
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

                    {/* ── Learning Roadmap ── */}
                    <FadeIn delay={0.25}>
                        <div style={{ ...glassCard, borderRadius: 40, padding: 32, position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 4, background: "linear-gradient(to right, #38bdf8, #6366f1, transparent)", opacity: 0.5 }} />
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40 }}>
                                <div>
                                    <h2 style={{ fontWeight: 800, fontSize: 22, color: "#0f172a", letterSpacing: "-0.02em" }}>학습 로드맵</h2>
                                    <p style={{ fontSize: 13, color: "#64748b", fontWeight: 400 }}>단계별로 학습 여정을 따라가세요</p>
                                </div>
                            </div>

                            {/* Roadmap Steps */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, position: "relative" }}>
                                {ROADMAP.map((node, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                                        style={{ display: "flex", alignItems: "center", gap: 12, flex: "1 1 120px", justifyContent: "center", position: "relative" }}
                                    >
                                        <div style={{
                                            width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                            position: "relative", zIndex: 2,
                                            ...(node.status === "done" ? { background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", boxShadow: "0 8px 20px rgba(34,197,94,0.25)" }
                                                : node.status === "active" ? { background: "linear-gradient(135deg, #0ea5e9, #2563eb)", color: "#fff", boxShadow: "0 8px 20px rgba(14,165,233,0.3)" }
                                                    : { background: "#f1f5f9", color: "#94a3b8", border: "2px solid #e2e8f0" })
                                        }}>
                                            <span style={{ fontSize: 24 }}>{node.status === "done" ? "✓" : node.icon}</span>
                                        </div>
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

                    {/* ── 주간 XP + 최근 활동 (from stats) ── */}
                    <FadeIn delay={0.35}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="stats-grid-2">
                            <style>{`@media (max-width: 767px) { .stats-grid-2 { grid-template-columns: 1fr !important; } }`}</style>
                            {/* 주간 XP 차트 */}
                            <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginBottom: 20 }}>📈 이번 주 XP</h3>
                                <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 120 }}>
                                    {[{ day: "월", xp: 120 }, { day: "화", xp: 85 }, { day: "수", xp: 200 },
                                    { day: "목", xp: 150 }, { day: "금", xp: 90 }, { day: "토", xp: 300 }, { day: "일", xp: 50 }]
                                        .map((d, i, arr) => {
                                            const max = Math.max(...arr.map(x => x.xp), 1);
                                            return (
                                                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                                    <span style={{ fontSize: 10, fontWeight: 700, color: "#0ea5e9" }}>{d.xp}</span>
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: `${(d.xp / max) * 80}px` }}
                                                        transition={{ delay: 0.4 + i * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                                        style={{ width: "100%", maxWidth: 32, background: "linear-gradient(to top, #0ea5e9, #38bdf8)", borderRadius: "6px 6px 3px 3px", minHeight: 6 }}
                                                    />
                                                    <span style={{ fontSize: 11, fontWeight: 600, color: "#64748b" }}>{d.day}</span>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>

                            {/* 최근 활동 */}
                            <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                                <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", marginBottom: 16 }}>🕐 최근 활동</h3>
                                {recentActivity.length === 0 ? (
                                    <div style={{ textAlign: "center", padding: 24, color: "#94a3b8" }}>
                                        <span style={{ fontSize: 28, display: "block", marginBottom: 4 }}>📝</span>
                                        아직 활동 기록이 없어요
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        {recentActivity.map((a: any, i: number) => (
                                            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 12, background: "#f8fafc" }}>
                                                <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #0ea5e9, #6366f1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 13 }}>⭐</div>
                                                <div style={{ flex: 1 }}>
                                                    <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{a.reason || "경험치 획득"}</div>
                                                    <div style={{ fontSize: 10, color: "#94a3b8" }}>{new Date(a.created_at).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
                                                </div>
                                                <span style={{ fontSize: 13, fontWeight: 800, color: "#059669" }}>+{a.amount} XP</span>
                                            </div>
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
                                        <Link key={c.title || i} href={`/dashboard/learning/courses/${c.id || i}`} style={{ textDecoration: "none" }}>
                                            <div style={{ ...glassCard, borderRadius: 20, padding: 24, transition: "all 0.2s", cursor: "pointer", position: "relative", overflow: "hidden" }}>
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
                                                        <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: color, transition: "width 0.5s" }} />
                                                    </div>
                                                    <span style={{ fontSize: 12, fontWeight: 800, color }}>{pct}%</span>
                                                </div>
                                            </div>
                                        </Link>
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
                                    <motion.div
                                        key={s.label}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.3 + si * 0.06 }}
                                        style={{ padding: 14, borderRadius: 16, background: "#f8fafc", textAlign: "center" }}
                                    >
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
                                    <Link key={q.label} href={q.href} style={{
                                        display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                                        borderRadius: 14, background: "#f8fafc", textDecoration: "none",
                                        transition: "all 0.2s", fontSize: 13, fontWeight: 600, color: "#475569",
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: q.color }}>{q.icon}</span>
                                        {q.label}
                                        <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#cbd5e1", marginLeft: "auto" }}>chevron_right</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div >
        </>
    );
}
