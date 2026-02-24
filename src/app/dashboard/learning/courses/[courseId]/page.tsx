"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";
import { awardXP, deductXP, XP_REWARDS, XP_PENALTIES } from "@/lib/xp-engine";
import { getCourseById, getAllUnits } from "@/data/courses";
import type { Unit, Quiz, Chapter as ChapterType, Page, CodeProblem } from "@/data/courses";
import LevelUpModal from "@/components/ui/LevelUpModal";
import { MI, glassPanel, marbleCard, cardFloating, TYPE_STYLES, DIFF_LABELS, QuizPanel, CodeProblemCard } from "./components";

/* ── Variants ── */
const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const staggerItem = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };
const accordionVariants = { collapsed: { height: 0, opacity: 0, overflow: "hidden" as const }, expanded: { height: "auto", opacity: 1, overflow: "visible" as const, transition: { type: "spring" as const, stiffness: 200, damping: 25 } } };

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const { user } = useAuth();
    const supabase = useMemo(() => createClient(), []);

    const courseData = useMemo(() => getCourseById(courseId), [courseId]);
    const allUnits = useMemo(() => getAllUnits(courseId), [courseId]);

    const [completedUnits, setCompletedUnits] = useState<Set<string>>(() => {
        if (typeof window === 'undefined') return new Set<string>();
        try {
            const saved = localStorage.getItem(`codingssok_completed_${courseId}`);
            return saved ? new Set<string>(JSON.parse(saved)) : new Set<string>();
        } catch { return new Set<string>(); }
    });
    const [showHtmlContent, setShowHtmlContent] = useState(false);
    const [activeUnit, setActiveUnit] = useState<string | null>(null);
    const [activePage, setActivePage] = useState<Page | null>(null);
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
    const [xpMsg, setXpMsg] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [quizResult, setQuizResult] = useState<"correct" | "wrong" | null>(null);
    const [wrongCount, setWrongCount] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [levelUpInfo, setLevelUpInfo] = useState<{ level: number } | null>(null);
    const [shaking, setShaking] = useState(false);
    const [showProblemAnswer, setShowProblemAnswer] = useState<Record<number, boolean>>({});
    const [editorCode, setEditorCode] = useState<Record<number, string>>({});
    const [runResult, setRunResult] = useState<Record<number, { stdout: string; stderr: string; exitCode: number } | null>>({});
    const [runLoading, setRunLoading] = useState<Record<number, boolean>>({});
    const [activeChapterIdx, setActiveChapterIdx] = useState(0);

    const executeCode = async (probId: number, code: string) => {
        setRunLoading(prev => ({ ...prev, [probId]: true }));
        setRunResult(prev => ({ ...prev, [probId]: null }));
        try {
            const res = await fetch('/api/compile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
            const data = await res.json();
            setRunResult(prev => ({ ...prev, [probId]: { stdout: data.stdout || '', stderr: data.stderr || data.error || '', exitCode: data.success ? 0 : 1 } }));
        } catch {
            setRunResult(prev => ({ ...prev, [probId]: { stdout: '', stderr: '네트워크 오류', exitCode: -1 } }));
        } finally { setRunLoading(prev => ({ ...prev, [probId]: false })); }
    };

    useEffect(() => {
        (window as any).__runCCode = async (btn: HTMLButtonElement) => {
            const code = btn.getAttribute('data-code') || '';
            if (!code) return;
            btn.disabled = true; btn.textContent = '⏳ 실행 중...';
            const existingOutput = btn.closest('.lms-code-wrap')?.querySelector('.lms-run-output');
            if (existingOutput) existingOutput.remove();
            const outputDiv = document.createElement('div');
            outputDiv.className = 'lms-run-output';
            outputDiv.innerHTML = '<div class="status loading">⏳ 컴파일 및 실행 중...</div><pre>실행 중입니다...</pre>';
            btn.closest('.lms-code-wrap')?.appendChild(outputDiv);
            try {
                const res = await fetch('/api/compile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
                const data = await res.json();
                const ok = data.success;
                outputDiv.innerHTML = `<div class="status ${ok ? 'success' : 'error'}">${ok ? '✅ 실행 성공' : '❌ 실행 실패'}</div><pre>${data.stderr || data.error ? `[오류]\n${data.stderr || data.error}` : data.stdout || '(출력 없음)'}</pre>`;
            } catch { outputDiv.innerHTML = '<div class="status error">❌ 네트워크 오류</div><pre>서버에 연결할 수 없습니다.</pre>'; }
            finally { btn.disabled = false; btn.textContent = '▶ 실행하기'; }
        };
        return () => { delete (window as any).__runCCode; };
    }, []);

    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const { data } = await supabase.from("user_course_progress").select("completed_lessons").eq("user_id", user.id).eq("course_id", courseId).single();
                if (data?.completed_lessons) setCompletedUnits(new Set(data.completed_lessons as string[]));
            } catch { }
        })();
    }, [user, courseId, supabase]);

    useEffect(() => {
        if (courseData?.chapters?.[0]) setExpandedChapters(new Set([courseData.chapters[0].id]));
    }, [courseData]);

    const toggleChapter = (chapterId: string) => {
        setExpandedChapters(prev => { const next = new Set(prev); next.has(chapterId) ? next.delete(chapterId) : next.add(chapterId); return next; });
    };

    const handleQuizCheck = (quiz: Quiz, unit: Unit) => {
        if (selectedAnswer === null) return;
        if (selectedAnswer === quiz.answer) {
            setQuizResult("correct");
            setTimeout(() => completeUnit(unit), 1500);
        } else {
            setQuizResult("wrong"); setShaking(true);
            const newWrongCount = wrongCount + 1; setWrongCount(newWrongCount);
            if (user) { deductXP(user.id, XP_PENALTIES.wrong_answer, `오답: ${unit.title}`); setXpMsg(`-${XP_PENALTIES.wrong_answer} XP 😢`); setTimeout(() => setXpMsg(""), 2500); }
            if (newWrongCount >= 3) setShowHint(true);
            setTimeout(() => { setShaking(false); setQuizResult(null); setSelectedAnswer(null); }, 1500);
        }
    };

    const completeUnit = async (unit: Unit) => {
        if (completedUnits.has(unit.id)) return;
        const newCompleted = new Set(completedUnits); newCompleted.add(unit.id); setCompletedUnits(newCompleted);
        // Persist to localStorage
        try { localStorage.setItem(`codingssok_completed_${courseId}`, JSON.stringify(Array.from(newCompleted))); } catch { }
        setSelectedAnswer(null); setQuizResult(null); setWrongCount(0); setShowHint(false);
        if (user) {
            const result = await awardXP(user.id, XP_REWARDS.lesson_complete, `학습 완료: ${unit.title}`, "book");
            setXpMsg(`+${XP_REWARDS.lesson_complete} XP! 🎉`); setTimeout(() => setXpMsg(""), 3000);
            if (result?.levelUp) setLevelUpInfo({ level: result.level });
            const prog = Math.round((newCompleted.size / allUnits.length) * 100);
            await supabase.from("user_course_progress").upsert({ user_id: user.id, course_id: courseId, progress: prog, completed_lessons: Array.from(newCompleted) }, { onConflict: "user_id,course_id" });
        }
        setActiveUnit(null);
    };

    if (!courseData) return <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>코스를 찾을 수 없습니다.</div>;

    const progressPct = allUnits.length > 0 ? Math.round((completedUnits.size / allUnits.length) * 100) : 0;

    return (
        <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 28 }}>
            <style>{`
                @keyframes confetti-pop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
                @keyframes pulse-green { 0%,100% { box-shadow: 0 0 0 0 rgba(16,185,129,0.4); } 50% { box-shadow: 0 0 0 12px rgba(16,185,129,0); } }
                @keyframes spine-glow { 0%,100% { opacity:0.4; } 50% { opacity:1; } }
                .crystal-spine { position:relative; }
                .crystal-spine::after { content:''; position:absolute; bottom:0; left:50%; transform:translateX(-50%); width:60%; height:2px; background:linear-gradient(90deg,transparent,rgba(14,165,233,0.3),transparent); }
                .hide-scrollbar::-webkit-scrollbar{display:none;} .hide-scrollbar{-ms-overflow-style:none;scrollbar-width:none;}
            `}</style>

            {/* Ambient BG */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "rgba(191,219,254,0.4)", borderRadius: "50%", filter: "blur(120px)", mixBlendMode: "multiply" }} />
                <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "50%", height: "50%", background: "rgba(199,210,254,0.4)", borderRadius: "50%", filter: "blur(120px)", mixBlendMode: "multiply" }} />
            </div>

            {levelUpInfo && <LevelUpModal level={levelUpInfo.level} onClose={() => setLevelUpInfo(null)} />}

            <AnimatePresence>
                {xpMsg && (
                    <motion.div initial={{ opacity: 0, y: -30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: "fixed", top: 20, right: 20, zIndex: 9999, padding: "14px 28px", borderRadius: 20,
                            background: xpMsg.includes("-") ? "linear-gradient(135deg, #dc2626, #b91c1c)" : "linear-gradient(135deg, #059669, #047857)",
                            color: "#fff", fontSize: 14, fontWeight: 800, ...cardFloating
                        }}>{xpMsg}</motion.div>
                )}
            </AnimatePresence>

            {/* Back Link */}
            <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} style={{ position: "relative", zIndex: 1 }}>
                <Link href="/dashboard/learning/courses" style={{ fontSize: 13, color: "#64748b", textDecoration: "none", display: "flex", alignItems: "center", gap: 6, fontWeight: 500 }}>← 코스 목록으로</Link>
            </motion.div>

            {/* ═══ Crystal Spine Hero ═══ */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{ ...marbleCard, ...cardFloating, borderRadius: 28, overflow: "hidden", position: "relative", zIndex: 1 }}>
                <div style={{ height: 130, background: courseData.gradient, display: "flex", alignItems: "center", padding: "0 36px", gap: 18, position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", right: -30, top: -30, width: 160, height: 160, background: "rgba(255,255,255,0.15)", borderRadius: "50%", filter: "blur(2px)" }} />
                    <motion.span whileHover={{ scale: 1.15, rotate: 8 }} style={{ fontSize: 52, filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.15))", position: "relative", zIndex: 2 }}>{courseData.icon}</motion.span>
                    <div style={{ position: "relative", zIndex: 2 }}>
                        <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: 0, textShadow: "0 2px 8px rgba(0,0,0,0.2)" }}>{courseData.title}</h1>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", margin: "4px 0 0", fontWeight: 500 }}>{courseData.description}</p>
                    </div>
                </div>
                <div style={{ padding: "22px 28px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#475569" }}>진행률</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: "#0ea5e9" }}>{progressPct}% ({completedUnits.size}/{allUnits.length})</span>
                    </div>
                    <div style={{ height: 10, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
                            style={{ height: "100%", background: courseData.gradient, borderRadius: 999 }} />
                    </div>

                    {/* ── Crystal Spine: Horizontal Chapter Navigation ── */}
                    <div className="hide-scrollbar" style={{ display: "flex", gap: 8, marginTop: 16, overflowX: "auto", paddingBottom: 4 }}>
                        {courseData.chapters.map((ch: ChapterType, i: number) => {
                            const chComplete = ch.units.filter(u => completedUnits.has(u.id)).length;
                            const chTotal = ch.units.length;
                            const isActive = activeChapterIdx === i;
                            return (
                                <motion.button key={ch.id} whileHover={{ y: -2, scale: 1.02 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => { setActiveChapterIdx(i); setExpandedChapters(new Set([ch.id])); }}
                                    className="crystal-spine"
                                    style={{
                                        padding: "10px 18px", borderRadius: 14, cursor: "pointer", flexShrink: 0,
                                        background: isActive ? "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(99,102,241,0.1))" : "rgba(255,255,255,0.5)",
                                        border: isActive ? "1.5px solid rgba(14,165,233,0.3)" : "1px solid #f1f5f9",
                                        boxShadow: isActive ? "0 4px 12px rgba(14,165,233,0.1)" : "none",
                                        display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap",
                                    } as any}>
                                    <span style={{ fontSize: 18 }}>{ch.icon}</span>
                                    <div style={{ textAlign: "left" }}>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: isActive ? "#0ea5e9" : "#94a3b8", letterSpacing: 0.5 }}>CH.{ch.chapterNumber}</div>
                                        <div style={{ fontSize: 11, fontWeight: 700, color: isActive ? "#0f172a" : "#64748b" }}>{ch.title}</div>
                                    </div>
                                    <span style={{ fontSize: 9, fontWeight: 800, color: chComplete === chTotal ? "#22c55e" : "#94a3b8", padding: "2px 8px", borderRadius: 999, background: chComplete === chTotal ? "#f0fdf4" : "#f8fafc" }}>
                                        {chComplete}/{chTotal}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </motion.div>

            {/* HTML Content Iframe */}
            {showHtmlContent && courseData.htmlPath && (
                <div style={{ ...glassPanel, borderRadius: 24, overflow: "hidden", border: "2px solid rgba(14,165,233,0.2)" }}>
                    <div style={{ padding: "12px 20px", background: "linear-gradient(135deg, #f0f9ff, #e0f2fe)", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid rgba(14,165,233,0.15)" }}>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#0369a1" }}>📚 {courseData.title} — 문제풀이 학습</span>
                        <a href={courseData.htmlPath} target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: "#0ea5e9", textDecoration: "none", fontWeight: 600 }}>새 탭에서 열기 ↗</a>
                    </div>
                    <iframe src={courseData.htmlPath} style={{ width: "100%", height: "80vh", border: "none", background: "#fff" }} title={`${courseData.title} 학습 콘텐츠`} sandbox="allow-scripts allow-same-origin allow-popups" />
                </div>
            )}

            {/* ═══ Chapter Content ═══ */}
            <motion.div variants={staggerContainer} initial="hidden" animate="show"
                style={{ display: "flex", flexDirection: "column", gap: 20, position: "relative", zIndex: 1 }}>
                {courseData.chapters.map((chapter: ChapterType) => {
                    const isExpanded = expandedChapters.has(chapter.id);
                    const chapterCompleted = chapter.units.filter(u => completedUnits.has(u.id)).length;
                    const chapterTotal = chapter.units.length;
                    const chapterPct = chapterTotal > 0 ? Math.round((chapterCompleted / chapterTotal) * 100) : 0;

                    return (
                        <motion.div key={chapter.id} variants={staggerItem} style={{ ...glassPanel, borderRadius: 24, overflow: "hidden", ...cardFloating }}>
                            <motion.div onClick={() => toggleChapter(chapter.id)} whileHover={{ backgroundColor: "rgba(14,165,233,0.03)" }}
                                style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 28px", cursor: "pointer", borderBottom: isExpanded ? "1px solid rgba(14,165,233,0.08)" : "none" }}>
                                <motion.span whileHover={{ scale: 1.15 }} style={{ fontSize: 32, display: "inline-block" }}>{chapter.icon}</motion.span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", letterSpacing: 1.5, textTransform: "uppercase" as const }}>Chapter {chapter.chapterNumber}</span>
                                        {chapterPct === 100 && <span style={{ fontSize: 10, padding: "2px 10px", borderRadius: 999, background: "#dcfce7", color: "#15803d", fontWeight: 800, border: "1px solid #86efac" }}>✓ 완료</span>}
                                    </div>
                                    <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", margin: "4px 0 0" }}>{chapter.title}</h3>
                                    <p style={{ fontSize: 12, color: "#94a3b8", margin: "3px 0 0" }}>{chapter.description}</p>
                                </div>
                                <div style={{ textAlign: "right", minWidth: 70 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: chapterPct === 100 ? "#10b981" : "#64748b" }}>{chapterCompleted}/{chapterTotal}</div>
                                    <div style={{ width: 60, height: 4, background: "#e2e8f0", borderRadius: 999, marginTop: 6 }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${chapterPct}%` }} style={{ height: "100%", background: chapterPct === 100 ? "linear-gradient(135deg, #10b981, #059669)" : "linear-gradient(135deg, #0ea5e9, #6366f1)", borderRadius: 999 }} />
                                    </div>
                                </div>
                                <motion.span animate={{ rotate: isExpanded ? 180 : 0 }} style={{ fontSize: 14, color: "#94a3b8" }}>▼</motion.span>
                            </motion.div>

                            <AnimatePresence initial={false}>
                                {isExpanded && (
                                    <motion.div key="units" initial="collapsed" animate="expanded" exit="collapsed" variants={accordionVariants}>
                                        {chapter.units.map((unit, i) => {
                                            const completed = completedUnits.has(unit.id);
                                            const isActive = activeUnit === unit.id;
                                            const typeStyle = TYPE_STYLES[unit.type ?? "이론"] || TYPE_STYLES["이론"];
                                            const prevUnit = i > 0 ? chapter.units[i - 1] : null;
                                            const isLocked = prevUnit ? !completedUnits.has(prevUnit.id) && !completed : false;

                                            return (
                                                <div key={unit.id}>
                                                    <motion.div onClick={() => {
                                                        if (isLocked) return;
                                                        // Navigate to dedicated page if unit has pages with content
                                                        const hasPageContent = unit.pages && unit.pages.some(p => p.content || p.quiz || p.problems);
                                                        if (hasPageContent && unit.pages && unit.pages.length > 0) {
                                                            const firstContentPage = unit.pages.find(p => p.content || p.quiz || p.problems) || unit.pages[0];
                                                            const unitIdx = allUnits.indexOf(unit) + 1;
                                                            router.push(`/dashboard/learning/courses/${courseId}/units/${unitIdx}/pages/${firstContentPage.id}`);
                                                            return;
                                                        }
                                                        setActiveUnit(isActive ? null : unit.id); setActivePage(null); setSelectedAnswer(null); setQuizResult(null); setWrongCount(0); setShowHint(false); setShaking(false); setShowProblemAnswer({});
                                                    }} whileHover={!isLocked ? { x: 4, backgroundColor: isActive ? "#f0f9ff" : "rgba(14,165,233,0.02)" } : {}}
                                                        style={{
                                                            display: "flex", alignItems: "center", gap: 14, padding: "16px 28px 16px 52px",
                                                            borderBottom: "1px solid rgba(241,245,249,0.8)", cursor: isLocked ? "not-allowed" : "pointer",
                                                            background: isActive ? "rgba(224,242,254,0.5)" : completed ? "rgba(240,253,244,0.4)" : "transparent",
                                                            opacity: isLocked ? 0.45 : 1, borderLeft: isActive ? "3px solid #0ea5e9" : "3px solid transparent",
                                                        }}>
                                                        <div style={{
                                                            width: 30, height: 30, borderRadius: "50%", flexShrink: 0,
                                                            background: completed ? "linear-gradient(135deg, #10b981, #059669)" : isLocked ? "#e2e8f0" : courseData.gradient,
                                                            display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 11, fontWeight: 800,
                                                        }}>{completed ? "✓" : isLocked ? "🔒" : unit.unitNumber}</div>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontSize: 13, fontWeight: completed ? 600 : 700, color: completed ? "#64748b" : "#0f172a" }}>{unit.title}</div>
                                                            <div style={{ display: "flex", gap: 6, marginTop: 4, flexWrap: "wrap" }}>
                                                                <span style={{ padding: "2px 8px", borderRadius: 8, fontSize: 10, fontWeight: 700, background: typeStyle.bg, color: typeStyle.color }}>{typeStyle.icon} {unit.type}</span>
                                                                <span style={{ fontSize: 10, color: "#94a3b8" }}>⏱ {unit.duration}</span>
                                                                {unit.difficulty && <span style={{ fontSize: 10, color: "#94a3b8" }}>{DIFF_LABELS[unit.difficulty]}</span>}
                                                            </div>
                                                        </div>
                                                        {completed && <span style={{ fontSize: 10, color: "#10b981", fontWeight: 800, padding: "3px 10px", borderRadius: 8, background: "rgba(16,185,129,0.1)" }}>완료 ✓</span>}
                                                        {!completed && !(unit.pages && unit.pages.some(p => p.content || p.quiz || p.problems)) && !unit.content && (
                                                            <span style={{ fontSize: 9, color: "#94a3b8", fontWeight: 700, padding: "3px 10px", borderRadius: 8, background: "#f1f5f9", border: "1px solid #e2e8f0" }}>📝 준비 중</span>
                                                        )}
                                                    </motion.div>

                                                    {/* Page content & Quiz/Problem panels */}
                                                    {isActive && (() => {
                                                        const hasPageContent = unit.pages && unit.pages.some(p => p.content || p.quiz || p.problems);
                                                        if (hasPageContent) {
                                                            return (
                                                                <div style={{ borderBottom: "1px solid rgba(14,165,233,0.1)" }}>
                                                                    {/* Page Tabs */}
                                                                    <div className="hide-scrollbar" style={{ display: "flex", gap: 2, overflowX: "auto", borderBottom: "1px solid rgba(226,232,240,0.6)", background: "linear-gradient(180deg, #f8fafc, rgba(255,255,255,0.8))", paddingLeft: 52, paddingRight: 16 }}>
                                                                        {unit.pages?.map(pg => {
                                                                            const isPageActive = activePage?.id === pg.id;
                                                                            const pageIcon = pg.type === '퀴즈' ? '❓' : pg.type === '핵심정리' ? '📋' : pg.type === 'QnA' ? '💬' : '📄';
                                                                            return (
                                                                                <motion.button key={pg.id} onClick={(e) => { e.stopPropagation(); setActivePage(isPageActive ? null : pg); setSelectedAnswer(null); setQuizResult(null); setWrongCount(0); setShowHint(false); setShowProblemAnswer({}); }}
                                                                                    whileHover={{ y: -1 }} style={{ padding: "10px 18px", border: "none", cursor: "pointer", background: "transparent", position: "relative", fontSize: 12, fontWeight: isPageActive ? 700 : 500, color: isPageActive ? "#0369a1" : "#64748b", whiteSpace: "nowrap", opacity: (pg.content || pg.quiz || pg.problems) ? 1 : 0.45 }}
                                                                                    disabled={!pg.content && !pg.quiz && !pg.problems}>
                                                                                    {pageIcon} {pg.id} {pg.title}
                                                                                    {isPageActive && <motion.div layoutId={`tab-indicator-${unit.id}`} style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #0ea5e9, #6366f1)", borderRadius: 999 }} />}
                                                                                </motion.button>
                                                                            );
                                                                        })}
                                                                    </div>

                                                                    {/* Active page content */}
                                                                    {activePage && (
                                                                        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                                                                            style={{ padding: "28px 28px 28px 52px", background: "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))", position: "relative", overflow: "hidden" }}>
                                                                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #0ea5e9, #6366f1, #0ea5e9)" }} />
                                                                            <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid rgba(14,165,233,0.08)" }}>
                                                                                <span style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", letterSpacing: 1.5, textTransform: "uppercase" as const }}>{activePage.id}</span>
                                                                                <h4 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "6px 0 0" }}>{activePage.title}</h4>
                                                                            </div>
                                                                            {activePage.content && <div dangerouslySetInnerHTML={{ __html: activePage.content }} style={{ fontSize: 14, lineHeight: 1.9, color: "#334155", marginBottom: 28 }} />}
                                                                            {activePage.quiz && <QuizPanel quiz={activePage.quiz} unit={unit} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} quizResult={quizResult} shaking={shaking} wrongCount={wrongCount} showHint={showHint} onCheck={() => handleQuizCheck(activePage.quiz!, unit)} />}
                                                                            {activePage.problems && activePage.problems.length > 0 && (
                                                                                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                                                                                    {activePage.problems.map((prob: CodeProblem) => (
                                                                                        <CodeProblemCard key={prob.id} prob={prob} editorCode={editorCode} setEditorCode={setEditorCode} runResult={runResult} runLoading={runLoading} executeCode={executeCode} showProblemAnswer={showProblemAnswer} setShowProblemAnswer={setShowProblemAnswer} />
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </motion.div>
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                        return null;
                                                    })()}

                                                    {/* Legacy Quiz */}
                                                    {isActive && !completed && unit.quiz && !(unit.pages && unit.pages.some(p => p.content || p.quiz || p.problems)) && (
                                                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                                            style={{ padding: "24px 24px 24px 76px", background: "linear-gradient(135deg, rgba(240,249,255,0.7), rgba(224,242,254,0.5))", borderBottom: "1px solid rgba(224,242,254,0.6)", position: "relative" }}>
                                                            <div style={{ position: "absolute", top: 0, left: 76, right: 24, height: 2, background: "linear-gradient(90deg, #6366f1, #0ea5e9, #10b981)", borderRadius: 2, opacity: 0.5 }} />
                                                            {unit.content && (
                                                                <div style={{ marginBottom: 18, padding: "16px 20px", borderRadius: 16, background: "rgba(255,255,255,0.7)", border: "1px solid rgba(226,232,240,0.5)" }}>
                                                                    <p style={{ fontSize: 13, color: "#334155", margin: 0, lineHeight: 1.7 }}>{unit.content}</p>
                                                                    {unit.tip && <p style={{ fontSize: 12, color: "#0ea5e9", margin: "8px 0 0", fontWeight: 600 }}>{unit.tip}</p>}
                                                                </div>
                                                            )}
                                                            <QuizPanel quiz={unit.quiz} unit={unit} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} quizResult={quizResult} shaking={shaking} wrongCount={wrongCount} showHint={showHint} onCheck={() => handleQuizCheck(unit.quiz!, unit)} />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </motion.div>
        </div>
    );
}
