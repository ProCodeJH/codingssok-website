"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";
import { awardXP, XP_REWARDS } from "@/lib/xp-engine";
import { getCourseById, getAllUnits } from "@/data/courses";
import type { Unit, Quiz, Chapter as ChapterType } from "@/data/courses";

const glassCard = {
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.6)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
};

const TYPE_STYLES: Record<string, { icon: string; color: string; bg: string }> = {
    "이론": { icon: "📖", color: "#6366f1", bg: "#eef2ff" },
    "실습": { icon: "💻", color: "#10b981", bg: "#dcfce7" },
    "퀴즈": { icon: "❓", color: "#f59e0b", bg: "#fef3c7" },
    "시험": { icon: "📝", color: "#ef4444", bg: "#fee2e2" },
    "종합": { icon: "🏆", color: "#8b5cf6", bg: "#f5f3ff" },
};

const DIFF_LABELS = ["", "⭐", "⭐⭐", "⭐⭐⭐"];

export default function CourseDetailPage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const { user } = useAuth();
    const supabase = useMemo(() => createClient(), []);

    // ── 새 데이터에서 코스/유닛 로드 ──
    const courseData = useMemo(() => getCourseById(courseId), [courseId]);
    const allUnits = useMemo(() => getAllUnits(courseId), [courseId]);

    const [completedUnits, setCompletedUnits] = useState<Set<string>>(new Set());
    const [showHtmlContent, setShowHtmlContent] = useState(false);
    const [activeUnit, setActiveUnit] = useState<string | null>(null);
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
    const [xpMsg, setXpMsg] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [quizResult, setQuizResult] = useState<"correct" | "wrong" | null>(null);

    // Supabase에서 이전 진행 데이터 로드
    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const { data } = await supabase.from("user_course_progress").select("completed_lessons")
                    .eq("user_id", user.id).eq("course_id", courseId).single();
                if (data?.completed_lessons) {
                    setCompletedUnits(new Set(data.completed_lessons as string[]));
                }
            } catch (err) {
                // 테이블이 없거나 데이터가 없을 수 있음 — 무시
            }
        })();
    }, [user, courseId, supabase]);

    // 첫 챕터 자동 확장
    useEffect(() => {
        if (courseData?.chapters?.[0]) {
            setExpandedChapters(new Set([courseData.chapters[0].id]));
        }
    }, [courseData]);

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev => {
            const next = new Set(prev);
            next.has(chapterId) ? next.delete(chapterId) : next.add(chapterId);
            return next;
        });
    };

    const checkAnswer = (quiz: Quiz, unit: Unit) => {
        if (selectedAnswer === null) return;
        if (selectedAnswer === quiz.answer) {
            setQuizResult("correct");
            setTimeout(() => completeUnit(unit), 1200);
        } else {
            setQuizResult("wrong");
            setTimeout(() => { setQuizResult(null); setSelectedAnswer(null); }, 2000);
        }
    };

    const completeUnit = async (unit: Unit) => {
        if (completedUnits.has(unit.id)) return;
        const newCompleted = new Set(completedUnits);
        newCompleted.add(unit.id);
        setCompletedUnits(newCompleted);
        setSelectedAnswer(null);
        setQuizResult(null);

        if (user) {
            await awardXP(user.id, XP_REWARDS.lesson_complete, `학습 완료: ${unit.title}`, "book");
            setXpMsg(`+${XP_REWARDS.lesson_complete} XP! 🎉`);
            setTimeout(() => setXpMsg(""), 3000);

            const prog = Math.round((newCompleted.size / allUnits.length) * 100);
            await supabase.from("user_course_progress").upsert({
                user_id: user.id, course_id: courseId, progress: prog,
                completed_lessons: Array.from(newCompleted),
            }, { onConflict: "user_id,course_id" });
        }
        setActiveUnit(null);
    };

    if (!courseData) {
        return <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>코스를 찾을 수 없습니다.</div>;
    }

    const progressPct = allUnits.length > 0 ? Math.round((completedUnits.size / allUnits.length) * 100) : 0;

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

            <Link href="/dashboard/learning/courses" style={{ fontSize: 13, color: "#64748b", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                ← 코스 목록으로
            </Link>

            {/* 코스 헤더 */}
            <div style={{ ...glassCard, borderRadius: 28, overflow: "hidden" }}>
                <div style={{ height: 120, background: courseData.gradient, display: "flex", alignItems: "center", padding: "0 32px", gap: 16 }}>
                    <span style={{ fontSize: 48 }}>{courseData.icon}</span>
                    <div>
                        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: 0, textShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>{courseData.title}</h1>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", margin: 0 }}>{courseData.description}</p>
                    </div>
                </div>
                <div style={{ padding: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#475569" }}>진행률</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#0ea5e9" }}>{progressPct}% ({completedUnits.size}/{allUnits.length})</span>
                    </div>
                    <div style={{ height: 10, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                        <div style={{ width: `${progressPct}%`, height: "100%", background: courseData.gradient, borderRadius: 999, transition: "width 0.5s" }} />
                    </div>
                    <div style={{ display: "flex", gap: 16, marginTop: 12, fontSize: 12, color: "#94a3b8" }}>
                        <span>📚 {courseData.chapters.length}개 챕터</span>
                        <span>📝 {allUnits.length}개 유닛</span>
                        <span>🧪 퀴즈 통과 필수</span>
                        <span>⏱ 약 {courseData.estimatedHours}시간</span>
                    </div>
                    {courseData.htmlPath && (
                        <button
                            onClick={() => setShowHtmlContent(v => !v)}
                            style={{
                                marginTop: 16, padding: "14px 28px", borderRadius: 16, border: "none",
                                background: showHtmlContent ? "#e2e8f0" : courseData.gradient,
                                color: showHtmlContent ? "#475569" : "#fff",
                                fontSize: 14, fontWeight: 800, cursor: "pointer",
                                boxShadow: showHtmlContent ? "none" : "0 6px 20px rgba(14,165,233,0.25)",
                                display: "flex", alignItems: "center", gap: 8, transition: "all 0.3s",
                            }}
                        >
                            <span style={{ fontSize: 18 }}>{showHtmlContent ? "📋" : "🚀"}</span>
                            {showHtmlContent ? "챕터 보기" : "문제풀이 학습 시작"}
                        </button>
                    )}
                </div>
            </div>

            {/* HTML 학습 콘텐츠 (iframe) */}
            {showHtmlContent && courseData.htmlPath && (
                <div style={{
                    ...glassCard, borderRadius: 24, overflow: "hidden",
                    border: "2px solid rgba(14,165,233,0.2)",
                }}>
                    <div style={{
                        padding: "12px 20px", background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        borderBottom: "1px solid rgba(14,165,233,0.15)",
                    }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0369a1" }}>
                            📚 {courseData.title} — 문제풀이 학습
                        </span>
                        <a
                            href={courseData.htmlPath}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ fontSize: 12, color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}
                        >
                            새 탭에서 열기 ↗
                        </a>
                    </div>
                    <iframe
                        src={courseData.htmlPath}
                        style={{
                            width: "100%", height: "80vh", border: "none",
                            background: "#fff",
                        }}
                        title={`${courseData.title} 학습 콘텐츠`}
                        sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                </div>
            )}

            {/* 챕터 → 유닛 아코디언 */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {courseData.chapters.map((chapter: ChapterType) => {
                    const isExpanded = expandedChapters.has(chapter.id);
                    const chapterCompleted = chapter.units.filter(u => completedUnits.has(u.id)).length;
                    const chapterTotal = chapter.units.length;
                    const chapterPct = chapterTotal > 0 ? Math.round((chapterCompleted / chapterTotal) * 100) : 0;

                    return (
                        <div key={chapter.id} style={{ ...glassCard, borderRadius: 20, overflow: "hidden" }}>
                            {/* 챕터 헤더 */}
                            <div
                                onClick={() => toggleChapter(chapter.id)}
                                style={{
                                    display: "flex", alignItems: "center", gap: 14, padding: "18px 24px",
                                    cursor: "pointer", borderBottom: isExpanded ? "1px solid #f1f5f9" : "none",
                                    transition: "background 0.2s",
                                }}
                            >
                                <span style={{ fontSize: 28 }}>{chapter.icon}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8" }}>Chapter {chapter.chapterNumber}</span>
                                        {chapterPct === 100 && <span style={{ fontSize: 10, padding: "2px 8px", borderRadius: 999, background: "#dcfce7", color: "#15803d", fontWeight: 800 }}>✓ 완료</span>}
                                    </div>
                                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a", margin: "4px 0 0" }}>{chapter.title}</h3>
                                    <p style={{ fontSize: 12, color: "#94a3b8", margin: "2px 0 0" }}>{chapter.description}</p>
                                </div>
                                <div style={{ textAlign: "right", minWidth: 70 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: chapterPct === 100 ? "#10b981" : "#64748b" }}>{chapterCompleted}/{chapterTotal}</div>
                                    <div style={{ width: 60, height: 4, background: "#e2e8f0", borderRadius: 999, marginTop: 4 }}>
                                        <div style={{ width: `${chapterPct}%`, height: "100%", background: chapterPct === 100 ? "#10b981" : "#0ea5e9", borderRadius: 999, transition: "width 0.3s" }} />
                                    </div>
                                </div>
                                <span style={{ fontSize: 16, color: "#94a3b8", transition: "transform 0.2s", transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }}>▼</span>
                            </div>

                            {/* 유닛 리스트 */}
                            {isExpanded && (
                                <div>
                                    {chapter.units.map((unit, i) => {
                                        const completed = completedUnits.has(unit.id);
                                        const isActive = activeUnit === unit.id;
                                        const typeStyle = TYPE_STYLES[unit.type] || TYPE_STYLES["이론"];
                                        // 이전 유닛이 완료되지 않았으면 잠금 (첫 유닛은 항상 열림)
                                        const prevUnit = i > 0 ? chapter.units[i - 1] : null;
                                        const isLocked = prevUnit ? !completedUnits.has(prevUnit.id) && !completed : false;

                                        return (
                                            <div key={unit.id}>
                                                <div
                                                    onClick={() => {
                                                        if (!isLocked) {
                                                            setActiveUnit(isActive ? null : unit.id);
                                                            setSelectedAnswer(null);
                                                            setQuizResult(null);
                                                        }
                                                    }}
                                                    style={{
                                                        display: "flex", alignItems: "center", gap: 14, padding: "14px 24px 14px 48px",
                                                        borderBottom: "1px solid #f8fafc", cursor: isLocked ? "not-allowed" : "pointer",
                                                        background: isActive ? "#f0f9ff" : completed ? "#f0fdf4" : "transparent",
                                                        opacity: isLocked ? 0.5 : 1, transition: "all 0.2s",
                                                    }}
                                                >
                                                    <div style={{
                                                        width: 28, height: 28, borderRadius: "50%", flexShrink: 0,
                                                        background: completed ? "#10b981" : isLocked ? "#e2e8f0" : courseData.gradient,
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        color: "#fff", fontSize: 11, fontWeight: 800,
                                                    }}>
                                                        {completed ? "✓" : isLocked ? "🔒" : unit.unitNumber}
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 13, fontWeight: completed ? 600 : 700, color: completed ? "#64748b" : "#0f172a" }}>
                                                            {unit.title}
                                                        </div>
                                                        <div style={{ display: "flex", gap: 6, marginTop: 3, flexWrap: "wrap" }}>
                                                            <span style={{
                                                                padding: "1px 7px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                                                                background: typeStyle.bg, color: typeStyle.color,
                                                            }}>{typeStyle.icon} {unit.type}</span>
                                                            <span style={{ fontSize: 10, color: "#94a3b8" }}>⏱ {unit.duration}</span>
                                                            {unit.difficulty && <span style={{ fontSize: 10, color: "#94a3b8" }}>{DIFF_LABELS[unit.difficulty]}</span>}
                                                            {unit.subtitle && <span style={{ fontSize: 10, color: "#cbd5e1" }}>{unit.subtitle}</span>}
                                                        </div>
                                                    </div>
                                                    {completed && <span style={{ fontSize: 10, color: "#10b981", fontWeight: 700 }}>완료 ✓</span>}
                                                </div>

                                                {/* 퀴즈 패널 */}
                                                {isActive && !completed && unit.quiz && (
                                                    <div style={{ padding: "20px 24px 24px 76px", background: "#f0f9ff", borderBottom: "1px solid #e0f2fe" }}>
                                                        {/* 콘텐츠 미리보기 */}
                                                        {unit.content && (
                                                            <div style={{ marginBottom: 16, padding: "12px 16px", borderRadius: 12, background: "#fff", border: "1px solid #e2e8f0" }}>
                                                                <p style={{ fontSize: 13, color: "#334155", margin: 0, lineHeight: 1.7 }}>{unit.content}</p>
                                                                {unit.tip && (
                                                                    <p style={{ fontSize: 12, color: "#0ea5e9", margin: "8px 0 0", fontWeight: 600 }}>{unit.tip}</p>
                                                                )}
                                                            </div>
                                                        )}

                                                        <div style={{ marginBottom: 16 }}>
                                                            <p style={{ fontSize: 13, fontWeight: 700, color: "#0369a1", marginBottom: 4 }}>🧪 확인 퀴즈</p>
                                                            <p style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", margin: 0 }}>{unit.quiz.question}</p>
                                                        </div>

                                                        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                                                            {unit.quiz.options.map((opt, oi) => {
                                                                const isSelected = selectedAnswer === oi;
                                                                const isCorrectAnswer = quizResult && oi === unit.quiz!.answer;
                                                                const isWrongSelection = quizResult === "wrong" && isSelected;
                                                                return (
                                                                    <button
                                                                        key={oi}
                                                                        onClick={() => { if (!quizResult) setSelectedAnswer(oi); }}
                                                                        disabled={!!quizResult}
                                                                        style={{
                                                                            padding: "12px 16px", borderRadius: 12, textAlign: "left" as const,
                                                                            border: isCorrectAnswer ? "2px solid #10b981" : isWrongSelection ? "2px solid #ef4444" : isSelected ? "2px solid #0ea5e9" : "1px solid #e2e8f0",
                                                                            background: isCorrectAnswer ? "#dcfce7" : isWrongSelection ? "#fee2e2" : isSelected ? "#e0f2fe" : "#fff",
                                                                            cursor: quizResult ? "default" : "pointer",
                                                                            fontSize: 13, fontWeight: isSelected ? 700 : 500, color: "#0f172a",
                                                                            transition: "all 0.2s",
                                                                        }}
                                                                    >
                                                                        <span style={{ marginRight: 8, fontWeight: 700, color: "#94a3b8" }}>{String.fromCharCode(65 + oi)}.</span>
                                                                        {opt}
                                                                        {isCorrectAnswer && " ✅"}
                                                                        {isWrongSelection && " ❌"}
                                                                    </button>
                                                                );
                                                            })}
                                                        </div>

                                                        {quizResult === "correct" && (
                                                            <div style={{ padding: "12px 16px", borderRadius: 12, background: "#dcfce7", border: "1px solid #86efac", marginBottom: 12 }}>
                                                                <p style={{ fontSize: 14, fontWeight: 700, color: "#15803d", margin: 0 }}>🎉 정답입니다! +{XP_REWARDS.lesson_complete} XP</p>
                                                                <p style={{ fontSize: 12, color: "#166534", margin: "4px 0 0" }}>{unit.quiz.explanation}</p>
                                                            </div>
                                                        )}
                                                        {quizResult === "wrong" && (
                                                            <div style={{ padding: "12px 16px", borderRadius: 12, background: "#fee2e2", border: "1px solid #fca5a5", marginBottom: 12 }}>
                                                                <p style={{ fontSize: 14, fontWeight: 700, color: "#dc2626", margin: 0 }}>❌ 틀렸습니다. 다시 시도해보세요!</p>
                                                            </div>
                                                        )}

                                                        {!quizResult && selectedAnswer !== null && (
                                                            <button onClick={() => checkAnswer(unit.quiz!, unit)} style={{
                                                                padding: "10px 24px", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 700,
                                                                background: "linear-gradient(135deg, #0ea5e9, #6366f1)", color: "#fff",
                                                                cursor: "pointer", boxShadow: "0 4px 14px rgba(14,165,233,0.3)",
                                                            }}>✓ 정답 확인</button>
                                                        )}

                                                        {!quizResult && selectedAnswer === null && (
                                                            <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>💡 보기를 선택한 후 &quot;정답 확인&quot; 버튼을 눌러주세요</p>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
