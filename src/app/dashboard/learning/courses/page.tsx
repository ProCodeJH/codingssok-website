"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

const COURSE_COLORS: Record<string, { gradient: string; icon: string }> = {
    "컴퓨팅 사고력": { gradient: "linear-gradient(135deg, #6366f1, #8b5cf6)", icon: "🧠" },
    "C언어 기초": { gradient: "linear-gradient(135deg, #f59e0b, #ef4444)", icon: "💻" },
    "코딩 기초": { gradient: "linear-gradient(135deg, #10b981, #06b6d4)", icon: "🌱" },
    "알고리즘 입문": { gradient: "linear-gradient(135deg, #ec4899, #f43f5e)", icon: "🧩" },
    "HTML/CSS": { gradient: "linear-gradient(135deg, #0ea5e9, #3b82f6)", icon: "🎨" },
    "JavaScript 기초": { gradient: "linear-gradient(135deg, #eab308, #f59e0b)", icon: "⚡" },
    "Python 기초": { gradient: "linear-gradient(135deg, #3b82f6, #6366f1)", icon: "🐍" },
    "데이터 구조": { gradient: "linear-gradient(135deg, #14b8a6, #059669)", icon: "📊" },
};

const DIFFICULTY: Record<string, { label: string; color: string; bg: string }> = {
    beginner: { label: "입문", color: "#10b981", bg: "#dcfce7" },
    intermediate: { label: "중급", color: "#f59e0b", bg: "#fef3c7" },
    advanced: { label: "고급", color: "#ef4444", bg: "#fee2e2" },
};

export default function CoursesPage() {
    const { user } = useAuth();
    const supabase = createClient();
    const [courses, setCourses] = useState<any[]>([]);
    const [progress, setProgress] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("전체");

    useEffect(() => {
        Promise.all([
            supabase.from("courses").select("*").order("sort_order", { ascending: true }),
            user ? supabase.from("user_course_progress").select("course_id, progress").eq("user_id", user.id) : Promise.resolve({ data: null }),
        ]).then(([coursesRes, progRes]) => {
            if (coursesRes.data) {
                setCourses(coursesRes.data);
            } else {
                // fallback 데이터
                setCourses([
                    { id: "1", title: "컴퓨팅 사고력", description: "문제 해결 능력을 키우는 컴퓨팅 사고의 기초", category: "기초", difficulty: "beginner", total_lessons: 12, xp_reward: 500 },
                    { id: "2", title: "C언어 기초", description: "변수, 배열, 포인터까지 C언어의 핵심 문법", category: "프로그래밍", difficulty: "beginner", total_lessons: 20, xp_reward: 800 },
                    { id: "3", title: "코딩 기초", description: "프로그래밍의 기본 개념과 논리적 사고", category: "기초", difficulty: "beginner", total_lessons: 15, xp_reward: 600 },
                    { id: "4", title: "알고리즘 입문", description: "정렬, 탐색, 재귀 등 기본 알고리즘", category: "알고리즘", difficulty: "intermediate", total_lessons: 18, xp_reward: 1000 },
                    { id: "5", title: "HTML/CSS", description: "웹 페이지 구조와 스타일링의 기초", category: "웹", difficulty: "beginner", total_lessons: 14, xp_reward: 500 },
                    { id: "6", title: "JavaScript 기초", description: "동적 웹 페이지를 만드는 JS 핵심 문법", category: "웹", difficulty: "intermediate", total_lessons: 16, xp_reward: 700 },
                    { id: "7", title: "Python 기초", description: "데이터 분석과 자동화를 위한 Python 기초", category: "프로그래밍", difficulty: "beginner", total_lessons: 15, xp_reward: 600 },
                    { id: "8", title: "데이터 구조", description: "스택, 큐, 트리, 그래프 자료구조 학습", category: "알고리즘", difficulty: "advanced", total_lessons: 22, xp_reward: 1200 },
                ]);
            }
            if (progRes.data) {
                const m: Record<string, number> = {};
                progRes.data.forEach((p: any) => { m[p.course_id] = p.progress || 0; });
                setProgress(m);
            }
            setLoading(false);
        });
    }, [user, supabase]);

    const categories = ["전체", ...new Set(courses.map((c) => c.category).filter(Boolean))];
    const filtered = filter === "전체" ? courses : courses.filter((c) => c.category === filter);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
                <h1 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: 0 }}>📚 내 코스</h1>
                <p style={{ fontSize: 13, color: "#64748b" }}>체계적으로 프로그래밍을 배워보세요</p>
            </div>

            {/* 필터 */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {categories.map((c) => (
                    <button key={c} onClick={() => setFilter(c)} style={{
                        padding: "8px 18px", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 700,
                        background: filter === c ? "#0f172a" : "rgba(255,255,255,0.7)",
                        color: filter === c ? "#fff" : "#64748b", cursor: "pointer",
                    }}>{c}</button>
                ))}
            </div>

            {/* 진행 중인 코스 요약 */}
            {Object.keys(progress).length > 0 && (
                <div style={{ ...glassCard, borderRadius: 24, padding: 24 }}>
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>🔥 진행 중인 코스</h3>
                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                        {courses.filter((c) => progress[c.id] && progress[c.id] > 0 && progress[c.id] < 100).map((c) => {
                            const colors = COURSE_COLORS[c.title] || { gradient: "linear-gradient(135deg, #64748b, #94a3b8)", icon: "📖" };
                            return (
                                <div key={c.id} style={{
                                    display: "flex", alignItems: "center", gap: 12, padding: "10px 16px",
                                    borderRadius: 14, background: "#f8fafc", flex: "1 1 200px",
                                }}>
                                    <span style={{ fontSize: 24 }}>{colors.icon}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 13, fontWeight: 700, color: "#0f172a" }}>{c.title}</div>
                                        <div style={{ height: 6, background: "#e2e8f0", borderRadius: 999, marginTop: 4, overflow: "hidden" }}>
                                            <div style={{ width: `${progress[c.id]}%`, height: "100%", background: colors.gradient, borderRadius: 999 }} />
                                        </div>
                                    </div>
                                    <span style={{ fontSize: 12, fontWeight: 800, color: "#0ea5e9" }}>{progress[c.id]}%</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* 코스 그리드 */}
            {loading ? (
                <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>로딩 중...</div>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                    {filtered.map((course) => {
                        const colors = COURSE_COLORS[course.title] || { gradient: "linear-gradient(135deg, #64748b, #94a3b8)", icon: "📖" };
                        const diff = DIFFICULTY[course.difficulty] || DIFFICULTY.beginner;
                        const prog = progress[course.id] || 0;
                        return (
                            <Link key={course.id} href={`/dashboard/learning/courses/${course.id}`} style={{ textDecoration: "none" }}>
                                <div style={{
                                    ...glassCard, borderRadius: 20, overflow: "hidden",
                                    cursor: "pointer", transition: "all 0.3s",
                                }}>
                                    {/* 상단 그라디언트 배너 */}
                                    <div style={{
                                        height: 100, background: colors.gradient, display: "flex",
                                        alignItems: "center", justifyContent: "center", position: "relative",
                                    }}>
                                        <span style={{ fontSize: 40, opacity: 0.9 }}>{colors.icon}</span>
                                        {prog > 0 && (
                                            <div style={{
                                                position: "absolute", top: 10, right: 10,
                                                padding: "4px 10px", borderRadius: 8, background: "rgba(255,255,255,0.9)",
                                                fontSize: 11, fontWeight: 800, color: "#059669",
                                            }}>{prog === 100 ? "✅ 완료" : `${prog}%`}</div>
                                        )}
                                    </div>
                                    {/* 하단 정보 */}
                                    <div style={{ padding: 20 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                            <span style={{
                                                padding: "3px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                                                background: diff.bg, color: diff.color,
                                            }}>{diff.label}</span>
                                            <span style={{ fontSize: 11, color: "#94a3b8" }}>{course.total_lessons || "?"}개 레슨</span>
                                        </div>
                                        <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>{course.title}</h3>
                                        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.5, marginBottom: 12 }}>{course.description}</p>
                                        {/* 프로그레스 바 */}
                                        <div style={{ height: 6, background: "#e2e8f0", borderRadius: 999, overflow: "hidden", marginBottom: 8 }}>
                                            <div style={{ width: `${prog}%`, height: "100%", background: colors.gradient, borderRadius: 999, transition: "width 0.5s" }} />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b" }}>⭐ +{course.xp_reward || 0} XP</span>
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
            )}
        </div>
    );
}
