"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════
   학부모 대시보드 — 자녀 학습 현황
   /parent
   
   localStorage 기반 데모 (Supabase 연동 없이)
   학생 학습 데이터를 읽어서 보여줌
   ═══════════════════════════════════════ */

interface ChildInfo {
    name: string;
    level: number;
    xp: number;
    streak: number;
    totalDays: number;
    coursesCompleted: number;
    totalCourses: number;
    quizAccuracy: number;
    weeklyMinutes: number;
    recentUnits: string[];
}

function getChildData(): ChildInfo | null {
    if (typeof window === "undefined") return null;
    try {
        // Read from student's localStorage data
        const studentRaw = localStorage.getItem("codingssok_user");
        const streakRaw = localStorage.getItem("codingssok_streak");
        const wrongRaw = localStorage.getItem("codingssok_wrong_answers");

        const student = studentRaw ? JSON.parse(studentRaw) : null;
        const streak = streakRaw ? JSON.parse(streakRaw) : null;
        const wrong = wrongRaw ? JSON.parse(wrongRaw) : [];

        if (!student) return null;

        const totalQuizzes = wrong.length + 10; // assume 10 correct
        const accuracy = totalQuizzes > 0 ? Math.round(((totalQuizzes - wrong.length) / totalQuizzes) * 100) : 100;

        return {
            name: student.name || "학생",
            level: student.level || 1,
            xp: student.xp || 0,
            streak: streak?.currentStreak || 0,
            totalDays: streak?.totalDays || 0,
            coursesCompleted: 0,
            totalCourses: 9,
            quizAccuracy: accuracy,
            weeklyMinutes: Math.floor(Math.random() * 120 + 60), // placeholder
            recentUnits: ["변수와 상수", "printf 함수", "scanf 입력"],
        };
    } catch { return null; }
}

const DAY_LABELS = ["일", "월", "화", "수", "목", "금", "토"];

function WeeklyHeatmap({ activeDates }: { activeDates: string[] }) {
    const last28: string[] = [];
    for (let i = 27; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        last28.push(d.toISOString().slice(0, 10));
    }

    return (
        <div>
            <div style={{ display: "flex", gap: 2, marginBottom: 4 }}>
                {DAY_LABELS.map(d => (
                    <div key={d} style={{ width: "calc(100% / 7)", textAlign: "center", fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>
                        {d}
                    </div>
                ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
                {last28.map(date => {
                    const isActive = activeDates.includes(date);
                    return (
                        <div key={date} style={{
                            aspectRatio: "1", borderRadius: 4,
                            background: isActive ? "#4F46E5" : "#f1f5f9",
                            opacity: isActive ? 1 : 0.5,
                        }} title={date} />
                    );
                })}
            </div>
        </div>
    );
}

export default function ParentDashboard() {
    const [child] = useState<ChildInfo | null>(() => getChildData());
    const [activeTab, setActiveTab] = useState<"overview" | "progress" | "report">("overview");

    // Read streak data for heatmap
    const activeDates: string[] = (() => {
        if (typeof window === "undefined") return [];
        try {
            const raw = localStorage.getItem("codingssok_streak");
            return raw ? JSON.parse(raw).activeDates || [] : [];
        } catch { return []; }
    })();

    if (!child) {
        return (
            <div style={{
                minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
                background: "linear-gradient(135deg, #EEF2FF, #F8FAFC)",
                flexDirection: "column", gap: 16, padding: 20,
            }}>
                <span className="material-symbols-outlined" style={{ fontSize: 64, opacity: 0.3, color: "#94a3b8" }}>family_restroom</span>
                <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1e1b4b" }}>학부모 대시보드</h2>
                <p style={{ fontSize: 14, color: "#94a3b8", textAlign: "center" }}>
                    자녀가 먼저 로그인해야 학습 데이터를 확인할 수 있습니다.
                </p>
                <Link href="/" style={{
                    padding: "10px 24px", borderRadius: 12, background: "#4F46E5", color: "#fff",
                    fontWeight: 700, fontSize: 14, textDecoration: "none",
                }}>
                    홈으로 돌아가기
                </Link>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: "100vh", background: "linear-gradient(135deg, #EEF2FF, #F8FAFC)",
            padding: "24px 20px",
        }}>
            <div style={{ maxWidth: 900, margin: "0 auto" }}>
                {/* ── Header ── */}
                <div style={{ marginBottom: 32 }}>
                    <Link href="/" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>← 홈</Link>
                    <h1 style={{ fontSize: 28, fontWeight: 800, color: "#1e1b4b", marginTop: 8, letterSpacing: "-0.03em" }}>
                        학부모 대시보드
                    </h1>
                    <p style={{ fontSize: 14, color: "#64748b" }}>
                        <strong>{child.name}</strong> 학생의 학습 현황
                    </p>
                </div>

                {/* ── Tab Navigation ── */}
                <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#fff", borderRadius: 12, padding: 4 }}>
                    {(["overview", "progress", "report"] as const).map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            flex: 1, padding: "10px 16px", borderRadius: 10, border: "none", cursor: "pointer",
                            background: activeTab === tab ? "#4F46E5" : "transparent",
                            color: activeTab === tab ? "#fff" : "#64748b",
                            fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                        }}>
                            {tab === "overview" ? "오늘의 요약" : tab === "progress" ? "학습 진행" : "주간 리포트"}
                        </button>
                    ))}
                </div>

                {/* ═══ Overview Tab ═══ */}
                {activeTab === "overview" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        {/* Summary Cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12, marginBottom: 24 }}>
                            {[
                                { icon: "local_fire_department", label: "연속 출석", value: `${child.streak}일`, color: "#EF4444", bg: "#FEF2F2" },
                                { icon: "star", label: "레벨", value: `Lv.${child.level}`, color: "#F59E0B", bg: "#FFFBEB" },
                                { icon: "lightbulb", label: "퀴즈 정답률", value: `${child.quizAccuracy}%`, color: "#4F46E5", bg: "#EEF2FF" },
                                { icon: "schedule", label: "주간 학습", value: `${child.weeklyMinutes}분`, color: "#34D399", bg: "#ECFDF5" },
                            ].map(s => (
                                <div key={s.label} style={{
                                    background: "#fff", borderRadius: 16, padding: "20px",
                                    border: "1px solid #e2e8f0",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 20, width: 36, height: 36, borderRadius: 10, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                                            {s.icon}
                                        </span>
                                        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{s.label}</span>
                                    </div>
                                    <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* 28-day Heatmap */}
                        <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", border: "1px solid #e2e8f0", marginBottom: 24 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b", marginBottom: 16 }}>최근 4주 출석 현황</h3>
                            <WeeklyHeatmap activeDates={activeDates} />
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, fontSize: 11, color: "#94a3b8" }}>
                                <div style={{ width: 12, height: 12, borderRadius: 3, background: "#f1f5f9" }} /> 미출석
                                <div style={{ width: 12, height: 12, borderRadius: 3, background: "#4F46E5" }} /> 출석
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div style={{ background: "#fff", borderRadius: 16, padding: "20px 24px", border: "1px solid #e2e8f0" }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b", marginBottom: 16 }}>최근 학습 유닛</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {child.recentUnits.map((u, i) => (
                                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", borderRadius: 10, background: "#f8fafc" }}>
                                        <span style={{ width: 28, height: 28, borderRadius: 8, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: "#4F46E5", fontWeight: 800 }}>
                                            {i + 1}
                                        </span>
                                        <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{u}</span>
                                        <span style={{ marginLeft: "auto", fontSize: 11, color: "#34D399", fontWeight: 600 }}>✓ 완료</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══ Progress Tab ═══ */}
                {activeTab === "progress" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "1px solid #e2e8f0", marginBottom: 24 }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b", marginBottom: 20 }}>코스별 진행률</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {[
                                    { name: "C언어 기초", pct: 12, color: "#F59E0B" },
                                    { name: "코딩 기초", pct: 0, color: "#10B981" },
                                    { name: "파이썬 기초", pct: 0, color: "#3B82F6" },
                                ].map(c => (
                                    <div key={c.name}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 18, color: c.color }}>school</span>
                                            <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{c.name}</span>
                                            <span style={{ marginLeft: "auto", fontSize: 12, fontWeight: 700, color: c.color }}>{c.pct}%</span>
                                        </div>
                                        <div style={{ height: 8, borderRadius: 4, background: "#f1f5f9", overflow: "hidden" }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${c.pct}%` }}
                                                transition={{ duration: 1, ease: "easeOut" }}
                                                style={{ height: "100%", borderRadius: 4, background: c.color }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Strengths & Weaknesses */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div style={{ background: "#fff", borderRadius: 16, padding: "20px", border: "1px solid #d1fae5" }}>
                                <h4 style={{ fontSize: 13, fontWeight: 700, color: "#059669", marginBottom: 12 }}>강점</h4>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    {["변수와 상수", "printf 출력", "산술 연산자"].map(s => (
                                        <div key={s} style={{ fontSize: 12, color: "#334155", padding: "6px 10px", borderRadius: 8, background: "#ecfdf5" }}>{s}</div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ background: "#fff", borderRadius: 16, padding: "20px", border: "1px solid #fecaca" }}>
                                <h4 style={{ fontSize: 13, fontWeight: 700, color: "#dc2626", marginBottom: 12 }}>보충 필요</h4>
                                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                    {["포인터", "배열 활용", "문자열 처리"].map(s => (
                                        <div key={s} style={{ fontSize: 12, color: "#334155", padding: "6px 10px", borderRadius: 8, background: "#fef2f2" }}>{s}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══ Report Tab ═══ */}
                {activeTab === "report" && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <div style={{ background: "#fff", borderRadius: 16, padding: "28px", border: "1px solid #e2e8f0" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                                <span style={{ fontSize: 28 }}>≡</span>
                                <div>
                                    <h3 style={{ fontSize: 17, fontWeight: 800, color: "#1e1b4b" }}>주간 리포트</h3>
                                    <p style={{ fontSize: 12, color: "#94a3b8" }}>
                                        {new Date(Date.now() - 7 * 86400000).toLocaleDateString("ko")} ~ {new Date().toLocaleDateString("ko")}
                                    </p>
                                </div>
                            </div>

                            <div style={{ fontSize: 14, color: "#334155", lineHeight: 2.2, background: "#f8fafc", borderRadius: 12, padding: "20px 24px" }}>
                                <div>✓ <strong>출석</strong>: {child.streak}/7일 ({Math.round(child.streak / 7 * 100)}%)</div>
                                <div> <strong>총 학습시간</strong>: {child.weeklyMinutes}분</div>
                                <div> <strong>완료 유닛</strong>: {child.recentUnits.length}개</div>
                                <div> <strong>퀴즈 정답률</strong>: {child.quizAccuracy}%</div>
                                <div> <strong>현재 스트릭</strong>: {child.streak}일 연속</div>
                                <div> <strong>레벨</strong>: Lv.{Math.max(1, child.level - 1)} → Lv.{child.level}</div>
                            </div>

                            <div style={{ marginTop: 20, padding: "16px 20px", borderRadius: 12, background: "#EEF2FF", border: "1px solid #C7D2FE" }}>
                                <div style={{ fontSize: 12, fontWeight: 700, color: "#4F46E5", marginBottom: 6 }}> 선생님 한마디</div>
                                <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.7 }}>
                                    &ldquo;{child.name} 학생이 이번 주에 많이 노력했습니다!
                                    변수와 상수 개념을 잘 이해하고 있어요.
                                    다음 주에는 반복문에 도전해봐요! 화이팅! &rdquo;
                                </p>
                            </div>

                            <button style={{
                                width: "100%", marginTop: 20, padding: "12px", borderRadius: 12,
                                border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer",
                                fontWeight: 700, fontSize: 13, color: "#4F46E5",
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            }}>
                                 PDF로 다운로드 (준비 중)
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div >
    );
}
