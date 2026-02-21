"use client";

import { useState, useEffect, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { COURSES, getCurriculumStats } from "@/data/courses";
import { motion } from "framer-motion";
import { FadeIn, StaggerList, StaggerItem, AnimatedBar } from "@/components/motion/motion";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.85)", backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.6)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
};

export default function CoursesPage() {
    const { user } = useAuth();
    const supabase = useMemo(() => createClient(), []);
    const [progress, setProgress] = useState<Record<string, number>>({});

    const stats = useMemo(() => getCurriculumStats(), []);

    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const { data } = await supabase.from("user_course_progress")
                    .select("course_id, completed_lessons, is_completed")
                    .eq("user_id", user.id);
                if (data) {
                    const m: Record<string, number> = {};
                    data.forEach((p: any) => {
                        // completed_lessons가 숫자이면 그대로, 배열이면 length 사용
                        const completed = typeof p.completed_lessons === 'number' ? p.completed_lessons : (Array.isArray(p.completed_lessons) ? p.completed_lessons.length : 0);
                        const course = COURSES.find(c => c.id === p.course_id);
                        const total = course?.totalUnits || 1;
                        m[p.course_id] = p.is_completed ? 100 : Math.round((completed / total) * 100);
                    });
                    setProgress(m);
                }
            } catch (err) {
                console.error("코스 진행률 로드 실패:", err);
            }
        })();
    }, [user, supabase]);

    const inProgress = COURSES.filter(c => progress[c.id] && progress[c.id] > 0 && progress[c.id] < 100);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {/* 페이지 헤더 */}
            <div>
                <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", margin: 0 }}>📚 코스 탐색</h1>
                <p style={{ fontSize: 14, color: "#64748b", margin: "4px 0 0" }}>체계적인 커리큘럼으로 프로그래밍을 마스터하세요</p>
            </div>

            {/* 커리큘럼 통계 배너 */}
            <div style={{
                ...glassCard, borderRadius: 24, padding: "20px 28px",
                background: "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(99,102,241,0.08))",
                border: "1px solid rgba(14,165,233,0.15)",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                    <span style={{ fontSize: 22 }}>🎯</span>
                    <span style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>코딩쏙 커리큘럼</span>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 12 }}>
                    {[
                        { label: "코스", value: stats.totalCourses, icon: "📦", color: "#6366f1" },
                        { label: "챕터", value: stats.totalChapters, icon: "📂", color: "#0ea5e9" },
                        { label: "유닛", value: stats.totalUnits, icon: "📝", color: "#10b981" },
                        { label: "문제", value: `${stats.totalProblems}+`, icon: "🧪", color: "#f59e0b" },
                        { label: "학습시간", value: `${stats.totalHours}h`, icon: "⏱", color: "#ef4444" },
                    ].map(s => (
                        <div key={s.label} style={{
                            padding: "12px 14px", borderRadius: 14, background: "#fff",
                            border: "1px solid #f1f5f9", textAlign: "center",
                        }}>
                            <span style={{ fontSize: 18 }}>{s.icon}</span>
                            <div style={{ fontSize: 20, fontWeight: 900, color: s.color, marginTop: 2 }}>{s.value}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8" }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 진행 중인 코스 */}
            {inProgress.length > 0 && (
                <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 16, margin: 0 }}>🔥 진행 중인 코스</h3>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 14 }}>
                        {inProgress.map(c => (
                            <Link key={c.id} href={`/dashboard/learning/courses/${c.id}`} style={{ textDecoration: "none", flex: "1 1 220px" }}>
                                <div style={{
                                    display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                                    borderRadius: 14, background: "#f8fafc", border: "1px solid #f1f5f9",
                                    cursor: "pointer", transition: "all 0.2s",
                                }}>
                                    <span style={{ fontSize: 26 }}>{c.icon}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{c.title}</div>
                                        <div style={{ height: 6, background: "#e2e8f0", borderRadius: 999, marginTop: 6, overflow: "hidden" }}>
                                            <div style={{ width: `${progress[c.id]}%`, height: "100%", background: c.gradient, borderRadius: 999 }} />
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 800, color: "#0ea5e9" }}>{progress[c.id]}%</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {/* 코스 카드 그리드 */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
                {COURSES.map(course => {
                    const prog = progress[course.id] || 0;
                    return (
                        <Link key={course.id} href={`/dashboard/learning/courses/${course.id}`} style={{ textDecoration: "none" }}>
                            <div style={{
                                ...glassCard, borderRadius: 22, overflow: "hidden",
                                cursor: "pointer", transition: "all 0.3s",
                            }}>
                                {/* 그라디언트 배너 */}
                                <div style={{
                                    height: 110, background: course.gradient, display: "flex",
                                    alignItems: "center", justifyContent: "center", position: "relative",
                                }}>
                                    <span style={{ fontSize: 44, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))" }}>{course.icon}</span>
                                    {prog > 0 && (
                                        <div style={{
                                            position: "absolute", top: 12, right: 12,
                                            padding: "4px 12px", borderRadius: 10, background: "rgba(255,255,255,0.95)",
                                            fontSize: 11, fontWeight: 800, color: prog === 100 ? "#059669" : "#0ea5e9",
                                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                                        }}>{prog === 100 ? "✅ 완료" : `${prog}%`}</div>
                                    )}
                                    {/* 챕터/유닛 뱃지 */}
                                    <div style={{
                                        position: "absolute", bottom: 10, left: 14,
                                        display: "flex", gap: 6,
                                    }}>
                                        <span style={{
                                            padding: "3px 10px", borderRadius: 8, fontSize: 10, fontWeight: 800,
                                            background: "rgba(255,255,255,0.9)", color: "#475569",
                                        }}>{course.chapters.length}개 챕터</span>
                                        <span style={{
                                            padding: "3px 10px", borderRadius: 8, fontSize: 10, fontWeight: 800,
                                            background: "rgba(255,255,255,0.9)", color: "#475569",
                                        }}>{course.totalUnits}개 유닛</span>
                                    </div>
                                </div>

                                {/* 하단 정보 */}
                                <div style={{ padding: "18px 22px 20px" }}>
                                    <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>{course.title}</h3>
                                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: "0 0 14px", minHeight: 42 }}>{course.description}</p>

                                    {/* 프로그레스 바 */}
                                    <div style={{ height: 7, background: "#e2e8f0", borderRadius: 999, overflow: "hidden", marginBottom: 10 }}>
                                        <div style={{ width: `${prog}%`, height: "100%", background: course.gradient, borderRadius: 999, transition: "width 0.5s" }} />
                                    </div>

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <div style={{ display: "flex", gap: 10, fontSize: 11, color: "#94a3b8" }}>
                                            <span>⏱ {course.estimatedHours}시간</span>
                                            <span>🧪 {course.totalProblems}문제</span>
                                        </div>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: "#0ea5e9" }}>
                                            {prog === 0 ? "시작하기 →" : prog === 100 ? "복습하기" : "이어하기 →"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
