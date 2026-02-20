"use client";

import { useUserProgress } from "@/hooks/useUserProgress";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { getTierInfo, calcLevel, xpForNextLevel, checkAttendance, TIERS } from "@/lib/xp-engine";

/* ── Styles ── */
const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

/* ── Roadmap (한글) ── */
const ROADMAP = [
    { title: "코딩 기초", icon: "extension", status: "done" as const },
    { title: "컴퓨팅 사고력", icon: "psychology", status: "done" as const },
    { title: "C언어", icon: "code", status: "active" as const },
    { title: "알고리즘", icon: "data_object", status: "locked" as const },
    { title: "마스터", icon: "military_tech", status: "locked" as const },
];

export default function JourneyPage() {
    const { progress } = useUserProgress();
    const { user } = useAuth();
    const [courses, setCourses] = useState<any[]>([]);
    const [userCourseProgress, setUserCourseProgress] = useState<any[]>([]);
    const [attendanceChecked, setAttendanceChecked] = useState(false);
    const [attendanceMsg, setAttendanceMsg] = useState("");

    const supabase = createClient();

    // Fetch courses from Supabase
    useEffect(() => {
        async function load() {
            const { data: c } = await supabase.from("courses").select("*").order("sort_order");
            if (c) setCourses(c);

            if (user) {
                const { data: ucp } = await supabase.from("user_course_progress").select("*").eq("user_id", user.id);
                if (ucp) setUserCourseProgress(ucp);

                // 오늘 출석 여부 확인
                const today = new Date().toISOString().split("T")[0];
                const { data: att } = await supabase.from("attendance").select("id").eq("user_id", user.id).eq("check_date", today).single();
                if (att) setAttendanceChecked(true);
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

    const tierInfo = getTierInfo(progress?.tier || "Iron");
    const levelProgress = xpForNextLevel(progress?.xp || 0);

    // 코스별 색상
    const COURSE_COLORS = ["#8b5cf6", "#0ea5e9", "#ef4444", "#14b8a6", "#f59e0b", "#f97316", "#3b82f6", "#6366f1"];
    const COURSE_ICONS = ["psychology", "code", "bolt", "web", "javascript", "data_object", "terminal", "account_tree"];

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

                    {/* ── 학습 진행률 (과목별) ── */}
                    <div style={{ ...glassCard, borderRadius: 28, padding: 28 }}>
                        <h2 style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ padding: 8, background: "#e0f2fe", color: "#0284c7", borderRadius: 12, display: "flex" }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>trending_up</span>
                            </span>
                            과목별 학습 진행률
                        </h2>
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            {(courses.length > 0 ? courses : [
                                { title: "컴퓨팅 사고력", total_lessons: 20, color: "#8b5cf6", icon: "🧠" },
                                { title: "코딩 기초", total_lessons: 24, color: "#0ea5e9", icon: "💻" },
                                { title: "C언어 프로그래밍", total_lessons: 28, color: "#ef4444", icon: "⚙️" },
                                { title: "HTML/CSS 웹 기초", total_lessons: 20, color: "#14b8a6", icon: "🌐" },
                            ]).map((c: any, i: number) => {
                                const ucp = userCourseProgress.find((u) => u.course_id === c.id);
                                const lessons = ucp?.completed_lessons;
                                const done = Array.isArray(lessons) ? lessons.length : (typeof lessons === 'number' ? lessons : 0);
                                const total = c.total_lessons || 1;
                                const pct = Math.round((done / total) * 100);
                                const color = c.color || COURSE_COLORS[i % COURSE_COLORS.length];
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
                                            <div style={{ width: `${pct}%`, height: "100%", borderRadius: 999, background: `linear-gradient(90deg, ${color}, ${color}88)`, transition: "width 0.8s" }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Learning Roadmap ── */}
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
                                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, flex: "1 1 120px", justifyContent: "center", position: "relative" }}>
                                    <div style={{
                                        width: 56, height: 56, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                                        position: "relative", zIndex: 2,
                                        ...(node.status === "done" ? { background: "linear-gradient(135deg, #22c55e, #16a34a)", color: "#fff", boxShadow: "0 8px 20px rgba(34,197,94,0.25)" }
                                            : node.status === "active" ? { background: "linear-gradient(135deg, #0ea5e9, #2563eb)", color: "#fff", boxShadow: "0 8px 20px rgba(14,165,233,0.3)" }
                                                : { background: "#f1f5f9", color: "#94a3b8", border: "2px solid #e2e8f0" })
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{node.status === "done" ? "check" : node.icon}</span>
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
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── 코스 카드 그리드 ── */}
                    <div>
                        <h2 style={{ fontWeight: 800, fontSize: 20, color: "#0f172a", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                            <span className="material-symbols-outlined" style={{ color: "#6366f1", fontSize: 22 }}>library_books</span>
                            전체 코스
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
                            {(courses.length > 0 ? courses : [
                                { title: "컴퓨팅 사고력", description: "문제 분석 · 논리적 사고", icon: "🧠", color: "#8b5cf6", difficulty: "입문", total_lessons: 20 },
                                { title: "코딩 기초", description: "변수, 반복문, 조건문", icon: "💻", color: "#0ea5e9", difficulty: "입문", total_lessons: 24 },
                                { title: "C언어 프로그래밍", description: "포인터 · 메모리 관리", icon: "⚙️", color: "#ef4444", difficulty: "초급", total_lessons: 28 },
                                { title: "HTML/CSS 웹 기초", description: "웹페이지 만들기", icon: "🌐", color: "#14b8a6", difficulty: "입문", total_lessons: 20 },
                            ]).map((c: any, i: number) => {
                                const ucp = userCourseProgress.find((u) => u.course_id === c.id);
                                const lessons = ucp?.completed_lessons;
                                const done = Array.isArray(lessons) ? lessons.length : (typeof lessons === 'number' ? lessons : 0);
                                const total = c.total_lessons || 1;
                                const pct = Math.round((done / total) * 100);
                                const color = c.color || COURSE_COLORS[i % COURSE_COLORS.length];
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
                                                    <div style={{ fontSize: 11, color: "#94a3b8" }}>{c.difficulty} · {c.total_lessons}개 레슨</div>
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
                </div>

                {/* ═══ Sidebar ═══ */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {/* 티어 카드 */}
                    <div style={{
                        padding: 24, borderRadius: 24, position: "relative", overflow: "hidden",
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
                    </div>

                    {/* 통계 카드 */}
                    <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f59e0b" }}>bar_chart</span>
                            나의 학습 현황
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {[
                                { label: "🔥 연속 출석", value: `${progress?.streak || 0}일`, color: "#ef4444" },
                                { label: "📊 정확도", value: `${progress?.accuracy || 0}%`, color: "#0ea5e9" },
                                { label: "✅ 풀은 문제", value: `${progress?.totalProblems || 0}개`, color: "#22c55e" },
                                { label: "⭐ 경험치", value: `${progress?.xp || 0}`, color: "#f59e0b" },
                            ].map((s) => (
                                <div key={s.label} style={{ padding: 14, borderRadius: 16, background: "#f8fafc", textAlign: "center" }}>
                                    <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4 }}>{s.label}</div>
                                    <div style={{ fontSize: 18, fontWeight: 900, color: s.color }}>{s.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 빠른 이동 */}
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
                </div>
            </div>
        </>
    );
}
