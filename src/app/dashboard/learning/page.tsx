"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { LearningRoadmap } from "./components/LearningRoadmap";
import { StudyNotes } from "./components/StudyNotes";
import { GamificationBar, useGamification } from "./components/GamificationBar";
import { CourseView } from "./components/CourseView";

/* ═══════════════════════════════════════════════════════════════
   코딩쏙 학습 플랫폼 — 프리미엄 에디션
   화이트 + 블루 테마 | 로드맵 | 메모 | 게임화 | 올인원
   ═══════════════════════════════════════════════════════════════ */

// ─── White + Blue Theme System ───
const theme = {
    bg: "#f8fafc",
    bgWhite: "#ffffff",
    bgCard: "#ffffff",
    bgSoft: "#f1f5f9",
    bgAccent: "#eff6ff",
    primary: "#2563eb",
    primaryLight: "#3b82f6",
    primaryDark: "#1d4ed8",
    gradient: "linear-gradient(135deg, #2563eb, #3b82f6, #60a5fa)",
    gradientSoft: "linear-gradient(135deg, #eff6ff, #dbeafe)",
    text: "#1e293b",
    textSecondary: "#64748b",
    textMuted: "#94a3b8",
    border: "#e2e8f0",
    borderLight: "#f1f5f9",
    shadow: "0 1px 3px rgba(0,0,0,0.06)",
    shadowMd: "0 4px 16px rgba(0,0,0,0.08)",
    shadowLg: "0 8px 32px rgba(0,0,0,0.1)",
    shadowBlue: "0 4px 20px rgba(37,99,235,0.15)",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
};

// ─── Course Data (9개 전체 과목) ───
interface Course {
    id: string; name: string; icon: string; color: string;
    gradient: string; htmlPath: string; desc: string;
    problems: number; category: "foundation" | "language" | "certification" | "competition";
    order: number;
}

const courses: Course[] = [
    { id: "coding-basics", name: "코딩 기초", icon: "🧩", color: "#22c55e", gradient: "linear-gradient(135deg, #22c55e, #16a34a)", htmlPath: "/learning-platform/코딩기초/index.html", desc: "프로그래밍의 첫 걸음, 기초 사고력 키우기", problems: 80, category: "foundation", order: 1 },
    { id: "computational-thinking", name: "컴퓨팅 사고력", icon: "🧠", color: "#8b5cf6", gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)", htmlPath: "/learning-platform/컴퓨팅사고력/index.html", desc: "논리적 사고와 문제 해결 능력 향상", problems: 120, category: "foundation", order: 2 },
    { id: "python", name: "파이썬", icon: "🐍", color: "#3b82f6", gradient: "linear-gradient(135deg, #3b82f6, #2563eb)", htmlPath: "/learning-platform/파이썬/index.html", desc: "Python 기초부터 심화까지", problems: 150, category: "language", order: 3 },
    { id: "c-language", name: "C 언어", icon: "⚡", color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b, #d97706)", htmlPath: "/learning-platform/C언어/index.html", desc: "C 프로그래밍 완전 정복", problems: 200, category: "language", order: 4 },
    { id: "cos", name: "COS", icon: "📋", color: "#06b6d4", gradient: "linear-gradient(135deg, #06b6d4, #0891b2)", htmlPath: "/learning-platform/COS/index.html", desc: "COS 자격증 완벽 대비", problems: 100, category: "certification", order: 5 },
    { id: "cos-pro", name: "COS Pro", icon: "🏆", color: "#ec4899", gradient: "linear-gradient(135deg, #ec4899, #db2777)", htmlPath: "/learning-platform/COS-Pro/index.html", desc: "COS Pro 자격증 도전", problems: 80, category: "certification", order: 6 },
    { id: "pcce", name: "PCCE", icon: "💻", color: "#f97316", gradient: "linear-gradient(135deg, #f97316, #ea580c)", htmlPath: "/learning-platform/PCCE/index.html", desc: "PCCE 코딩 역량 평가 대비", problems: 60, category: "certification", order: 7 },
    { id: "koi-past", name: "KOI 기출", icon: "🎯", color: "#ef4444", gradient: "linear-gradient(135deg, #ef4444, #dc2626)", htmlPath: "/learning-platform/KOI기출/index.html", desc: "KOI 올림피아드 기출 풀이", problems: 150, category: "competition", order: 8 },
    { id: "word-processor", name: "워드프로세서", icon: "📄", color: "#6366f1", gradient: "linear-gradient(135deg, #6366f1, #4f46e5)", htmlPath: "/learning-platform/워드프로세서/index.html", desc: "워드프로세서 자격증 대비", problems: 80, category: "certification", order: 9 },
];

const categories = [
    { id: "all", name: "전체", icon: "📚" },
    { id: "foundation", name: "기초 과정", icon: "🧩" },
    { id: "language", name: "프로그래밍 언어", icon: "💻" },
    { id: "certification", name: "자격증", icon: "📋" },
    { id: "competition", name: "대회 준비", icon: "🏆" },
];

// ─── Component ───
function LearningInner() {
    const searchParams = useSearchParams();
    const supabase = createClient();
    const [userId, setUserId] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"hub" | "course" | "achievements">("hub");
    const [activeCourse, setActiveCourse] = useState<Course | null>(null);
    const [filterCategory, setFilterCategory] = useState("all");
    const [showNotes, setShowNotes] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { progress, addXp } = useGamification();

    // Auth
    useEffect(() => {
        (async () => {
            try {
                const { data } = await supabase.auth.getUser();
                if (data.user) setUserId(data.user.id);
            } catch { /* ignore */ }
        })();
    }, [supabase]);

    // URL param handling
    useEffect(() => {
        const courseParam = searchParams?.get("course");
        if (courseParam) {
            const found = courses.find(c => c.id === courseParam);
            if (found) { setActiveCourse(found); setViewMode("course"); }
        }
    }, [searchParams]);

    const openCourse = (course: Course) => {
        setActiveCourse(course);
        setViewMode("course");
        addXp(5); // Small XP for opening a course
    };

    const totalProblems = courses.reduce((s, c) => s + c.problems, 0);
    const filteredCourses = courses
        .filter(c => filterCategory === "all" || c.category === filterCategory)
        .filter(c => !searchQuery || c.name.includes(searchQuery) || c.desc.includes(searchQuery));

    // Roadmap nodes
    const roadmapNodes = courses.slice(0, 6).map((c, i) => ({
        id: c.id, name: c.name, icon: c.icon, color: c.color,
        status: (i === 0 ? "completed" : i === 1 ? "current" : "locked") as "completed" | "current" | "locked",
        path: c.htmlPath, problems: c.problems, desc: c.desc,
    }));

    // ═══ COURSE VIEW ═══
    if (viewMode === "course" && activeCourse) {
        return (
            <>
                <CourseView
                    courseId={activeCourse.id} courseName={activeCourse.name}
                    courseIcon={activeCourse.icon} courseColor={activeCourse.color}
                    htmlPath={activeCourse.htmlPath}
                    onBack={() => { setViewMode("hub"); setActiveCourse(null); }}
                    onOpenNotes={() => setShowNotes(true)}
                    onXpEarned={(xp) => addXp(xp)}
                />
                <AnimatePresence>
                    {showNotes && <StudyNotes isOpen={showNotes} onClose={() => setShowNotes(false)} currentCourseId={activeCourse.id} currentCourseName={activeCourse.name} />}
                </AnimatePresence>
            </>
        );
    }

    // ═══ HUB VIEW ═══
    return (
        <div style={{ minHeight: "100vh", background: theme.bg, fontFamily: "'Pretendard', 'Inter', system-ui, sans-serif", color: theme.text }}>

            {/* ═══ Header ═══ */}
            <motion.header initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                style={{
                    background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px) saturate(180%)",
                    borderBottom: `1px solid ${theme.border}`, padding: "0 clamp(16px, 3vw, 40px)",
                    height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
                    position: "sticky", top: 0, zIndex: 50,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <Link href="/dashboard" style={{ textDecoration: "none", color: theme.primary, fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
                        ← 대시보드
                    </Link>
                    <div style={{ width: 1, height: 20, background: theme.border }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 3 }} style={{ fontSize: 22 }}>📚</motion.span>
                        <h1 style={{ fontSize: 17, fontWeight: 800, margin: 0, background: theme.gradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            코딩쏙 학습 플랫폼
                        </h1>
                    </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <GamificationBar progress={progress} compact />
                    <button onClick={() => setShowNotes(true)} style={{
                        padding: "8px 16px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff",
                        fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
                    }}>📝 노트</button>
                    <button onClick={() => setViewMode(viewMode === "achievements" ? "hub" : "achievements")} style={{
                        padding: "8px 16px", borderRadius: 10, border: viewMode === "achievements" ? `2px solid ${theme.primary}` : "1px solid #e2e8f0",
                        background: viewMode === "achievements" ? theme.bgAccent : "#fff",
                        fontSize: 12, fontWeight: 600, cursor: "pointer",
                    }}>🏅 성취</button>
                </div>
            </motion.header>

            {viewMode === "achievements" ? (
                /* ═══ ACHIEVEMENTS VIEW ═══ */
                <div style={{ maxWidth: 600, margin: "0 auto", padding: "32px 24px" }}>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24, textAlign: "center" }}>🏅 나의 성취</h2>
                        <GamificationBar progress={progress} />
                    </motion.div>
                </div>
            ) : (
                /* ═══ HUB MAIN ═══ */
                <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px 80px" }}>

                    {/* ── Hero Section ── */}
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        style={{
                            background: theme.gradient, borderRadius: 24, padding: "48px 40px",
                            marginBottom: 36, position: "relative", overflow: "hidden",
                            boxShadow: theme.shadowBlue,
                        }}
                    >
                        {/* Background decorations */}
                        <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
                        <div style={{ position: "absolute", bottom: -60, left: -20, width: 150, height: 150, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
                        <div style={{ position: "absolute", top: 20, right: 200, width: 80, height: 80, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

                        <div style={{ position: "relative", zIndex: 1 }}>
                            <motion.h2 initial={{ x: -30 }} animate={{ x: 0 }}
                                style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 900, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}
                            >
                                오늘도 코딩 실력을<br />한 단계 올려볼까요? 🚀
                            </motion.h2>
                            <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, maxWidth: 500, lineHeight: 1.6, marginBottom: 24 }}>
                                9개 과목 · {totalProblems.toLocaleString()}개 문제 · 체계적인 커리큘럼으로<br />
                                코딩 왕초보부터 올림피아드까지 완벽 대비하세요.
                            </p>
                            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                {[
                                    { icon: "📊", label: `${courses.length}개 과목`, bg: "rgba(255,255,255,0.15)" },
                                    { icon: "📝", label: `${totalProblems.toLocaleString()}+ 문제`, bg: "rgba(255,255,255,0.15)" },
                                    { icon: "🔥", label: `${progress.streak}일 연속`, bg: "rgba(255,255,255,0.15)" },
                                    { icon: "⚡", label: `${progress.xp} XP`, bg: "rgba(255,255,255,0.15)" },
                                ].map(stat => (
                                    <div key={stat.label} style={{
                                        padding: "8px 16px", borderRadius: 12, background: stat.bg,
                                        display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: "#fff",
                                    }}>
                                        {stat.icon} {stat.label}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Elite Platform Pages ── */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
                        style={{
                            marginBottom: 28,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                            <span style={{ fontSize: 18 }}>⚡</span>
                            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: theme.text }}>Elite 학습 도구</h3>
                            <span style={{ fontSize: 11, color: theme.textMuted, padding: "2px 10px", background: theme.bgSoft, borderRadius: 20 }}>프리미엄</span>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
                            {[
                                { id: "elite-roadmap", name: "로드맵", icon: "🗺️", color: "#06b6d4", gradient: "linear-gradient(135deg, #06b6d4, #0891b2)", htmlPath: "/learning-platform/elite/roadmap.html", desc: "학습 여정 시각화" },
                                { id: "elite-hub", name: "학습 허브", icon: "📚", color: "#2563eb", gradient: "linear-gradient(135deg, #2563eb, #1d4ed8)", htmlPath: "/learning-platform/elite/hub.html", desc: "통합 학습 대시보드" },
                                { id: "elite-challenge", name: "데일리 챌린지", icon: "🎯", color: "#7c3aed", gradient: "linear-gradient(135deg, #7c3aed, #6d28d9)", htmlPath: "/learning-platform/elite/challenge.html", desc: "매일 도전 문제" },
                                { id: "elite-leaderboard", name: "리더보드", icon: "🏆", color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b, #d97706)", htmlPath: "/learning-platform/elite/leaderboard.html", desc: "랭킹 & 순위" },
                                { id: "elite-goals", name: "학습 목표", icon: "🎯", color: "#22c55e", gradient: "linear-gradient(135deg, #22c55e, #16a34a)", htmlPath: "/learning-platform/elite/goals.html", desc: "마일스톤 관리" },
                                { id: "elite-profile", name: "프로필", icon: "👤", color: "#ec4899", gradient: "linear-gradient(135deg, #ec4899, #db2777)", htmlPath: "/learning-platform/elite/profile.html", desc: "게이미피케이션 프로필" },
                                { id: "elite-editor", name: "코드 에디터", icon: "💻", color: "#6366f1", gradient: "linear-gradient(135deg, #6366f1, #4f46e5)", htmlPath: "/learning-platform/elite/editor.html", desc: "인터랙티브 코딩" },
                            ].map((page) => (
                                <motion.div
                                    key={page.id}
                                    whileHover={{ y: -4, scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => openCourse({ ...page, problems: 0, category: "foundation", order: 100 } as Course)}
                                    style={{
                                        background: theme.bgWhite, borderRadius: 16, border: `1px solid ${theme.border}`,
                                        padding: "16px", cursor: "pointer", boxShadow: theme.shadow,
                                        transition: "box-shadow 0.2s",
                                        position: "relative", overflow: "hidden",
                                    }}
                                >
                                    <div style={{
                                        position: "absolute", top: 0, left: 0, right: 0, height: 3,
                                        background: page.gradient,
                                    }} />
                                    <div style={{ fontSize: 24, marginBottom: 8 }}>{page.icon}</div>
                                    <div style={{ fontSize: 13, fontWeight: 800, color: theme.text, marginBottom: 2 }}>{page.name}</div>
                                    <div style={{ fontSize: 11, color: theme.textMuted }}>{page.desc}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Learning Roadmap ── */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        style={{
                            background: theme.bgWhite, borderRadius: 20, border: `1px solid ${theme.border}`,
                            padding: "28px 24px", marginBottom: 28, boxShadow: theme.shadow, overflow: "hidden",
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                            <span style={{ fontSize: 18 }}>🗺️</span>
                            <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: theme.text }}>학습 로드맵</h3>
                            <span style={{ fontSize: 11, color: theme.textMuted, padding: "2px 10px", background: theme.bgSoft, borderRadius: 20 }}>추천 학습 경로</span>
                        </div>
                        <div style={{ overflowX: "auto", paddingBottom: 8 }}>
                            <LearningRoadmap nodes={roadmapNodes} onNodeClick={(node) => {
                                const course = courses.find(c => c.id === node.id);
                                if (course) openCourse(course);
                            }} />
                        </div>
                    </motion.div>

                    {/* ── Search & Filters ── */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                        style={{ marginBottom: 24, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}
                    >
                        <div style={{ position: "relative", flex: "1 1 300px" }}>
                            <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 14 }}>🔍</span>
                            <input placeholder="과목 검색..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                                style={{
                                    width: "100%", padding: "12px 12px 12px 38px", borderRadius: 14, border: `1px solid ${theme.border}`,
                                    fontSize: 14, outline: "none", background: theme.bgWhite, color: theme.text,
                                    transition: "border-color 0.2s, box-shadow 0.2s",
                                }}
                                onFocus={e => { e.currentTarget.style.borderColor = theme.primary; e.currentTarget.style.boxShadow = theme.shadowBlue; }}
                                onBlur={e => { e.currentTarget.style.borderColor = theme.border; e.currentTarget.style.boxShadow = "none"; }}
                            />
                        </div>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {categories.map(cat => (
                                <button key={cat.id} onClick={() => setFilterCategory(cat.id)}
                                    style={{
                                        padding: "8px 16px", borderRadius: 12, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer",
                                        background: filterCategory === cat.id ? theme.primary : theme.bgWhite,
                                        color: filterCategory === cat.id ? "#fff" : theme.textSecondary,
                                        boxShadow: filterCategory === cat.id ? theme.shadowBlue : theme.shadow,
                                        transition: "all 0.2s",
                                    }}
                                >{cat.icon} {cat.name}</button>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Course Cards Grid ── */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20, marginBottom: 36 }}>
                        {filteredCourses.map((course, i) => (
                            <motion.div key={course.id}
                                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.06 }}
                                whileHover={{ y: -6, boxShadow: theme.shadowLg }}
                                onClick={() => openCourse(course)}
                                style={{
                                    background: theme.bgWhite, borderRadius: 20, padding: 0, cursor: "pointer",
                                    border: `1px solid ${theme.border}`, overflow: "hidden",
                                    boxShadow: theme.shadow, transition: "all 0.3s",
                                }}
                            >
                                {/* Card gradient top */}
                                <div style={{ height: 6, background: course.gradient }} />

                                <div style={{ padding: "24px 24px 20px" }}>
                                    {/* Icon + Name */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                                        <motion.div
                                            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                                            style={{
                                                width: 52, height: 52, borderRadius: 14,
                                                background: `${course.color}12`, display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 26, border: `1px solid ${course.color}20`,
                                            }}
                                        >{course.icon}</motion.div>
                                        <div>
                                            <div style={{ fontSize: 17, fontWeight: 800, color: theme.text }}>{course.name}</div>
                                            <div style={{ fontSize: 12, color: theme.textSecondary, marginTop: 2 }}>{course.desc}</div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                                        <span style={{
                                            padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                                            background: `${course.color}10`, color: course.color,
                                        }}>{course.problems}문제</span>
                                        <span style={{
                                            padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                                            background: "#f1f5f9", color: theme.textSecondary,
                                        }}>{categories.find(c => c.id === course.category)?.name}</span>
                                    </div>

                                    {/* Action button */}
                                    <motion.div
                                        whileHover={{ scale: 1.02 }}
                                        style={{
                                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                            padding: "12px 20px", borderRadius: 12, background: course.gradient,
                                            color: "#fff", fontSize: 13, fontWeight: 700,
                                            boxShadow: `0 4px 12px ${course.color}30`,
                                        }}
                                    >
                                        🚀 학습 시작하기
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* ── Quick Links ── */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                        style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}
                    >
                        <a href="/learning-platform/index.html" target="_blank" rel="noopener noreferrer"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
                                background: theme.bgWhite, border: `1px solid ${theme.border}`, borderRadius: 14,
                                fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", color: theme.textSecondary,
                                boxShadow: theme.shadow,
                            }}
                        >📚 학습 허브 (원본)</a>
                        <a href="/learning-platform/dashboard.html" target="_blank" rel="noopener noreferrer"
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
                                background: theme.bgWhite, border: `1px solid ${theme.border}`, borderRadius: 14,
                                fontSize: 13, fontWeight: 600, cursor: "pointer", textDecoration: "none", color: theme.textSecondary,
                                boxShadow: theme.shadow,
                            }}
                        >📊 성취도 대시보드</a>
                    </motion.div>
                </div>
            )}

            {/* ═══ Study Notes Modal ═══ */}
            <AnimatePresence>
                {showNotes && <StudyNotes isOpen={showNotes} onClose={() => setShowNotes(false)} currentCourseId={activeCourse?.id} currentCourseName={activeCourse?.name} />}
            </AnimatePresence>
        </div>
    );
}

export default function LearningPage() {
    return (
        <Suspense fallback={<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#f8fafc", fontSize: 18, color: "#64748b" }}>📚 학습 플랫폼 로딩 중...</div>}>
            <LearningInner />
        </Suspense>
    );
}
