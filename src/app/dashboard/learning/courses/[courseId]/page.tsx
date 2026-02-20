"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { awardXP, XP_REWARDS } from "@/lib/xp-engine";
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

// 각 코스별 레슨 데이터 (fallback)
const LESSONS_DB: Record<string, { title: string; duration: string; type: string }[]> = {
    "1": [
        { title: "컴퓨팅 사고란?", duration: "15분", type: "이론" },
        { title: "문제 분해하기", duration: "20분", type: "실습" },
        { title: "패턴 인식", duration: "18분", type: "이론" },
        { title: "추상화 개념", duration: "22분", type: "이론" },
        { title: "알고리즘 설계 기초", duration: "25분", type: "실습" },
        { title: "순서도 그리기", duration: "20분", type: "실습" },
        { title: "조건과 분기", duration: "18분", type: "이론" },
        { title: "반복과 루프", duration: "20분", type: "실습" },
        { title: "디버깅 사고", duration: "15분", type: "이론" },
        { title: "실전 문제 풀기 1", duration: "30분", type: "퀴즈" },
        { title: "실전 문제 풀기 2", duration: "30분", type: "퀴즈" },
        { title: "종합 평가", duration: "40분", type: "시험" },
    ],
    "2": [
        { title: "C언어 소개와 환경 설정", duration: "15분", type: "이론" },
        { title: "Hello World 출력", duration: "10분", type: "실습" },
        { title: "변수와 자료형", duration: "25분", type: "이론" },
        { title: "변수 실습", duration: "20분", type: "실습" },
        { title: "연산자", duration: "20분", type: "이론" },
        { title: "scanf와 printf", duration: "18분", type: "실습" },
        { title: "조건문 (if/else)", duration: "22분", type: "이론" },
        { title: "조건문 실습", duration: "25분", type: "실습" },
        { title: "반복문 (for/while)", duration: "25분", type: "이론" },
        { title: "반복문 실습", duration: "30분", type: "실습" },
        { title: "배열 기초", duration: "20분", type: "이론" },
        { title: "배열 실습", duration: "25분", type: "실습" },
        { title: "함수 기초", duration: "22분", type: "이론" },
        { title: "함수 실습", duration: "25분", type: "실습" },
        { title: "포인터 개념", duration: "30분", type: "이론" },
        { title: "포인터 실습", duration: "30분", type: "실습" },
        { title: "구조체", duration: "25분", type: "이론" },
        { title: "문자열 처리", duration: "25분", type: "실습" },
        { title: "종합 문제", duration: "40분", type: "퀴즈" },
        { title: "기말 평가", duration: "50분", type: "시험" },
    ],
};

const TYPE_STYLES: Record<string, { icon: string; color: string; bg: string }> = {
    "이론": { icon: "📖", color: "#6366f1", bg: "#eef2ff" },
    "실습": { icon: "💻", color: "#10b981", bg: "#dcfce7" },
    "퀴즈": { icon: "❓", color: "#f59e0b", bg: "#fef3c7" },
    "시험": { icon: "📝", color: "#ef4444", bg: "#fee2e2" },
};

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const { user } = useAuth();
    const supabase = createClient();

    const [course, setCourse] = useState<any>(null);
    const [lessons, setLessons] = useState<any[]>([]);
    const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());
    const [activeLesson, setActiveLesson] = useState<number | null>(null);
    const [xpMsg, setXpMsg] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // 코스 정보 로드
        supabase.from("courses").select("*").eq("id", courseId).single()
            .then(({ data }) => {
                if (data) setCourse(data);
                else {
                    // fallback
                    const fallbacks: Record<string, any> = {
                        "1": { id: "1", title: "컴퓨팅 사고력", description: "문제 해결 능력을 키우는 컴퓨팅 사고의 기초", xp_reward: 500, difficulty: "beginner" },
                        "2": { id: "2", title: "C언어 기초", description: "변수, 배열, 포인터까지 C언어의 핵심 문법", xp_reward: 800, difficulty: "beginner" },
                        "3": { id: "3", title: "코딩 기초", description: "프로그래밍의 기본 개념과 논리적 사고", xp_reward: 600, difficulty: "beginner" },
                        "4": { id: "4", title: "알고리즘 입문", description: "정렬, 탐색, 재귀 등 기본 알고리즘", xp_reward: 1000, difficulty: "intermediate" },
                    };
                    setCourse(fallbacks[courseId] || { id: courseId, title: "코스", description: "", xp_reward: 500 });
                }
                setLoading(false);
            });

        // 레슨 데이터
        setLessons(LESSONS_DB[courseId] || LESSONS_DB["1"] || []);
    }, [courseId, supabase]);

    const completeLesson = async (index: number) => {
        if (completedLessons.has(index)) return;
        const newCompleted = new Set(completedLessons);
        newCompleted.add(index);
        setCompletedLessons(newCompleted);

        // XP 적립
        if (user) {
            await awardXP(user.id, XP_REWARDS.lesson_complete, `레슨 완료: ${lessons[index]?.title}`, "book");
            setXpMsg(`+${XP_REWARDS.lesson_complete} XP! 🎉`);
            setTimeout(() => setXpMsg(""), 3000);

            // 진행률 업데이트
            const prog = Math.round((newCompleted.size / lessons.length) * 100);
            await supabase.from("user_course_progress").upsert({
                user_id: user.id, course_id: courseId, progress: prog,
            }, { onConflict: "user_id,course_id" });
        }
        setActiveLesson(null);
    };

    if (loading) return <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>로딩 중...</div>;

    const colors = COURSE_COLORS[course?.title] || { gradient: "linear-gradient(135deg, #64748b, #94a3b8)", icon: "📖" };
    const progressPct = lessons.length > 0 ? Math.round((completedLessons.size / lessons.length) * 100) : 0;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* XP 토스트 */}
            {xpMsg && (
                <div style={{
                    position: "fixed", top: 20, right: 20, zIndex: 9999,
                    padding: "14px 24px", borderRadius: 16, background: "#059669", color: "#fff",
                    fontSize: 14, fontWeight: 700, boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                }}>{xpMsg}</div>
            )}

            {/* 뒤로가기 */}
            <Link href="/dashboard/learning/courses" style={{ fontSize: 13, color: "#64748b", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                ← 코스 목록으로
            </Link>

            {/* 코스 헤더 */}
            <div style={{
                ...glassCard, borderRadius: 28, overflow: "hidden",
            }}>
                <div style={{ height: 120, background: colors.gradient, display: "flex", alignItems: "center", padding: "0 32px", gap: 16 }}>
                    <span style={{ fontSize: 48 }}>{colors.icon}</span>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: 0, textShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>{course?.title}</h1>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", margin: 0 }}>{course?.description}</p>
                    </div>
                </div>
                <div style={{ padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#475569" }}>진행률</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#0ea5e9" }}>{progressPct}% ({completedLessons.size}/{lessons.length})</span>
                    </div>
                    <div style={{ height: 10, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                        <div style={{ width: `${progressPct}%`, height: "100%", background: colors.gradient, borderRadius: 999, transition: "width 0.5s" }} />
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12, color: "#94a3b8" }}>
                        <span>⭐ 완료 보상: {course?.xp_reward || 0} XP</span>
                        <span>📝 총 {lessons.length}개 레슨</span>
                    </div>
                </div>
            </div>

            {/* 레슨 목록 */}
            <div style={{ ...glassCard, borderRadius: 24, overflow: "hidden" }}>
                <div style={{ padding: "16px 24px", borderBottom: "1px solid #f1f5f9" }}>
                    <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", margin: 0 }}>📋 레슨 목록</h3>
                </div>
                <div>
                    {lessons.map((lesson, i) => {
                        const completed = completedLessons.has(i);
                        const isActive = activeLesson === i;
                        const typeStyle = TYPE_STYLES[lesson.type] || TYPE_STYLES["이론"];
                        const isLocked = i > 0 && !completedLessons.has(i - 1) && !completed;

                        return (
                            <div key={i}>
                                <div
                                    onClick={() => !isLocked && setActiveLesson(isActive ? null : i)}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 14, padding: "16px 24px",
                                        borderBottom: "1px solid #f8fafc", cursor: isLocked ? "not-allowed" : "pointer",
                                        background: isActive ? "#f0f9ff" : completed ? "#f0fdf4" : "transparent",
                                        opacity: isLocked ? 0.5 : 1, transition: "all 0.2s",
                                    }}
                                >
                                    {/* 번호/체크 */}
                                    <div style={{
                                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                                        background: completed ? "#10b981" : isLocked ? "#e2e8f0" : colors.gradient,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#fff", fontSize: 13, fontWeight: 800,
                                    }}>
                                        {completed ? "✓" : isLocked ? "🔒" : i + 1}
                                    </div>

                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontSize: 14, fontWeight: completed ? 600 : 700, color: completed ? "#64748b" : "#0f172a" }}>
                                            {lesson.title}
                                        </div>
                                        <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                                            <span style={{
                                                padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                                                background: typeStyle.bg, color: typeStyle.color,
                                            }}>{typeStyle.icon} {lesson.type}</span>
                                            <span style={{ fontSize: 11, color: "#94a3b8" }}>⏱ {lesson.duration}</span>
                                        </div>
                                    </div>

                                    {completed && <span style={{ fontSize: 11, color: "#10b981", fontWeight: 700 }}>완료 ✓</span>}
                                </div>

                                {/* 확장 패널 */}
                                {isActive && !completed && (
                                    <div style={{ padding: "16px 24px 20px 70px", background: "#f0f9ff", borderBottom: "1px solid #e0f2fe" }}>
                                        <p style={{ fontSize: 13, color: "#475569", marginBottom: 12 }}>
                                            이 레슨을 완료하면 <strong style={{ color: "#059669" }}>+{XP_REWARDS.lesson_complete} XP</strong>를 받아요!
                                        </p>
                                        <button onClick={() => completeLesson(i)} style={{
                                            padding: "10px 24px", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 700,
                                            background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff",
                                            cursor: "pointer", boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                                        }}>✓ 레슨 완료</button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
