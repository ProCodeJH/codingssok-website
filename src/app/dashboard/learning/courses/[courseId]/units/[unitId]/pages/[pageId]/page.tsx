"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { awardXP, deductXP, XP_REWARDS, XP_PENALTIES } from "@/lib/xp-engine";
import { getCourseById, getAllUnits } from "@/data/courses";
import type { Unit, Page, Quiz, CodeProblem } from "@/data/courses";
import LevelUpModal from "@/components/ui/LevelUpModal";
import { QuizPanel, CodeProblemCard, MI, glassPanel } from "../../../../components";
import confetti from "canvas-confetti";
import { useWrongAnswers } from "@/hooks/useWrongAnswers";

/* ──────────────────────────────────────────────
   Learning Content Page
   /dashboard/learning/courses/[courseId]/units/[unitId]/pages/[pageId]
   ────────────────────────────────────────────── */

export default function LearningContentPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const unitIdParam = params.unitId as string;
    const pageIdParam = params.pageId as string;
    const { user } = useAuth();
    const contentRef = useRef<HTMLDivElement>(null);

    const courseData = useMemo(() => getCourseById(courseId), [courseId]);
    const allUnits = useMemo(() => getAllUnits(courseId), [courseId]);

    // Find unit by 1-based index in allUnits (URL param is index, not unitNumber)
    const unitIndex = parseInt(unitIdParam, 10) - 1;
    const unit = useMemo(() => (unitIndex >= 0 && unitIndex < allUnits.length) ? allUnits[unitIndex] : undefined, [allUnits, unitIndex]);
    const pages = useMemo(() => unit?.pages ?? [], [unit]);
    const currentPage = useMemo(() => pages.find(p => p.id === pageIdParam), [pages, pageIdParam]);
    const currentPageIndex = useMemo(() => pages.findIndex(p => p.id === pageIdParam), [pages, pageIdParam]);

    // Quiz state
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [quizResult, setQuizResult] = useState<"correct" | "wrong" | null>(null);
    const [wrongCount, setWrongCount] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [hintLevel, setHintLevel] = useState(0); // 0: no hint, 1-3: progressive hints
    const [shaking, setShaking] = useState(false);
    const [levelUpInfo, setLevelUpInfo] = useState<{ level: number } | null>(null);
    const [xpMsg, setXpMsg] = useState("");

    // Code problem state
    const [showProblemAnswer, setShowProblemAnswer] = useState<Record<number, boolean>>({});
    const [editorCode, setEditorCode] = useState<Record<number, string>>({});
    const [runResult, setRunResult] = useState<Record<number, { stdout: string; stderr: string; exitCode: number } | null>>({});
    const [runLoading, setRunLoading] = useState<Record<number, boolean>>({});

    // Wrong answer notebook
    const { addWrongAnswer } = useWrongAnswers();

    // ── Code execution ──
    const executeCode = async (probId: number, code: string) => {
        setRunLoading(prev => ({ ...prev, [probId]: true }));
        setRunResult(prev => ({ ...prev, [probId]: null }));
        try {
            const res = await fetch('/api/compile', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) });
            const data = await res.json();
            setRunResult(prev => ({ ...prev, [probId]: { stdout: data.program_output || "", stderr: data.program_error || data.compiler_error || "", exitCode: data.status === "0" ? 0 : 1 } }));
        } catch (err) {
            console.error('[Compile] executeCode failed:', err);
            setRunResult(prev => ({ ...prev, [probId]: { stdout: "", stderr: "네트워크 오류가 발생했습니다.", exitCode: 1 } }));
        } finally {
            setRunLoading(prev => ({ ...prev, [probId]: false }));
        }
    };

    // ── Quiz check ──
    const handleQuizCheck = useCallback((quiz: Quiz) => {
        if (selectedAnswer === null) return;
        if (selectedAnswer === quiz.answer) {
            setQuizResult("correct");
            //  Confetti celebration!
            confetti({ particleCount: 200, spread: 80, origin: { y: 0.75 }, colors: ['#4F46E5', '#F59E0B', '#34D399', '#818CF8'] });
            if (user?.id) {
                awardXP(user.id, XP_REWARDS.lesson_complete, "퀴즈 정답", "check_circle").then(r => {
                    if (r?.levelUp) setLevelUpInfo({ level: r.level });
                    setXpMsg(`+${XP_REWARDS.lesson_complete} XP`);
                    setTimeout(() => setXpMsg(""), 2500);
                });
            }
        } else {
            setQuizResult("wrong");
            setShaking(true);
            setTimeout(() => setShaking(false), 600);
            const newWrongCount = wrongCount + 1;
            setWrongCount(newWrongCount);
            // Progressive hints: level 1 at 2 wrong, level 2 at 4 wrong, level 3 (full answer) at 6 wrong
            if (newWrongCount >= 2) { setShowHint(true); setHintLevel(Math.min(3, Math.ceil(newWrongCount / 2))); }
            // 오답 노트에 자동 기록
            if (currentPage?.quiz) {
                addWrongAnswer({
                    id: `${courseId}__${unitIdParam}__${pageIdParam}__0`,
                    courseId,
                    unitTitle: unit?.title ?? "",
                    pageTitle: currentPage.title,
                    question: quiz.question,
                    options: quiz.options,
                    correctAnswer: quiz.answer,
                    userAnswer: selectedAnswer,
                });
            }
            if (user?.id) {
                deductXP(user.id, XP_PENALTIES.wrong_answer, "오답");
            }
        }
    }, [selectedAnswer, user, wrongCount]);

    // ── Reset quiz/problem state when page changes ──
    useEffect(() => {
        setSelectedAnswer(null);
        setQuizResult(null);
        setWrongCount(0);
        setShowHint(false);
        setHintLevel(0);
        setShaking(false);
        setShowProblemAnswer({});
        setEditorCode({});
        setRunResult({});
        if (contentRef.current) contentRef.current.scrollTop = 0;
    }, [pageIdParam]);

    // ── Inject __runCCode for in-content run buttons ──
    useEffect(() => {
        (window as any).__runCCode = async (btn: HTMLButtonElement) => {
            const code = btn.getAttribute("data-code")?.replace(/\\n/g, "\n").replace(/\\"/g, '"') ?? "";
            btn.disabled = true;
            btn.textContent = "⏳ 실행 중...";
            const wrapper = btn.closest(".lms-code-wrap");
            try {
                const res = await fetch("/api/compile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) });
                const data = await res.json();
                const output = data.program_output || data.compiler_error || data.program_error || "(출력 없음)";
                const isError = !!(data.compiler_error || data.program_error);
                let outEl = wrapper?.querySelector(".lms-run-output") as HTMLDivElement;
                if (!outEl) { outEl = document.createElement("div"); outEl.className = "lms-run-output"; wrapper?.appendChild(outEl); }
                outEl.innerHTML = `<div class="status ${isError ? "error" : "success"}">${isError ? "✗ 에러" : "✓ 실행 완료"}</div><pre>${output}</pre>`;
            } catch (e) { console.error('[Compile] __runCCode failed:', e); } finally { btn.disabled = false; btn.textContent = "▶ 실행"; }
        };
        return () => { delete (window as any).__runCCode; };
    }, []);

    // ── Inject copy buttons into code blocks ──
    useEffect(() => {
        if (!contentRef.current) return;
        const timer = setTimeout(() => {
            const blocks = contentRef.current?.querySelectorAll('pre');
            if (!blocks) return;
            blocks.forEach(pre => {
                if (pre.querySelector('.copy-btn')) return;
                const btn = document.createElement('button');
                btn.className = 'copy-btn';
                btn.textContent = '≡ 복사';
                btn.title = '코드 복사';
                Object.assign(btn.style, {
                    position: 'absolute', top: '6px', right: '6px', padding: '4px 10px',
                    border: 'none', borderRadius: '8px', background: 'rgba(255,255,255,0.9)',
                    color: '#475569', fontSize: '11px', fontWeight: '700', cursor: 'pointer',
                    opacity: '0', transition: 'opacity 0.2s', zIndex: '10',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                });
                pre.style.position = 'relative';
                pre.addEventListener('mouseenter', () => { btn.style.opacity = '1'; });
                pre.addEventListener('mouseleave', () => { btn.style.opacity = '0'; });
                btn.addEventListener('click', async () => {
                    const code = pre.querySelector('code')?.textContent || pre.textContent || '';
                    try {
                        await navigator.clipboard.writeText(code);
                        btn.textContent = '✓ 복사됨!';
                        setTimeout(() => { btn.textContent = '≡ 복사'; }, 1500);
                    } catch { btn.textContent = '✗ 실패'; setTimeout(() => { btn.textContent = '≡ 복사'; }, 1500); }
                });
                pre.appendChild(btn);
            });
        }, 300);
        return () => clearTimeout(timer);
    }, [currentPage?.content, pageIdParam]);

    // ── Navigation helpers ──
    const prevPage = currentPageIndex > 0 ? pages[currentPageIndex - 1] : null;
    const nextPage = currentPageIndex < pages.length - 1 ? pages[currentPageIndex + 1] : null;
    const navigatePage = (pageId: string) => {
        router.push(`/dashboard/learning/courses/${courseId}/units/${unitIdParam}/pages/${pageId}`);
    };

    // ── Keyboard navigation (←→ arrow keys) ──
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Don't interfere with input fields / code editors
            const tag = (e.target as HTMLElement)?.tagName;
            if (tag === 'INPUT' || tag === 'TEXTAREA' || (e.target as HTMLElement)?.isContentEditable) return;
            if (e.key === 'ArrowLeft' && prevPage) {
                e.preventDefault();
                navigatePage(prevPage.id);
            } else if (e.key === 'ArrowRight' && nextPage) {
                e.preventDefault();
                navigatePage(nextPage.id);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [prevPage, nextPage]);

    // Find chapter containing this unit
    const chapterInfo = useMemo(() => {
        if (!courseData || !unit) return null;
        for (const ch of courseData.chapters) {
            if (ch.units.some(u => u.id === unit.id)) {
                return ch;
            }
        }
        return null;
    }, [courseData, unit]);

    // Find next unit for auto-advance
    const nextUnitInfo = useMemo(() => {
        if (!courseData || !unit) return null;
        const allCourseUnits = courseData.chapters.flatMap(ch => ch.units);
        const currentIdx = allCourseUnits.findIndex(u => u.id === unit.id);
        if (currentIdx < 0 || currentIdx >= allCourseUnits.length - 1) return null;
        const next = allCourseUnits[currentIdx + 1];
        const hasContent = next.pages && next.pages.some(p => p.content || p.quiz || p.problems);
        if (!hasContent) return null;
        const firstPage = next.pages?.find(p => p.content || p.quiz || p.problems) || next.pages?.[0];
        if (!firstPage) return null;
        return { unit: next, unitIdx: currentIdx + 2, firstPageId: firstPage.id };
    }, [courseData, unit]);

    // ── Not found ──
    if (!courseData || !unit) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", flexDirection: "column", gap: 16 }}>
                <span style={{ fontSize: 48, opacity: 0.3 }}></span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#334155" }}>유닛을 찾을 수 없습니다</h2>
                <Link href={`/dashboard/learning/courses/${courseId}`} style={{ color: "#0ea5e9", fontWeight: 600, fontSize: 14 }}>
                    ← 코스로 돌아가기
                </Link>
            </div>
        );
    }

    if (!currentPage) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "60vh", flexDirection: "column", gap: 16 }}>
                <span style={{ fontSize: 48, opacity: 0.3 }}></span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#334155" }}>페이지를 찾을 수 없습니다</h2>
                <p style={{ fontSize: 13, color: "#94a3b8" }}>이 유닛에는 {pages.length}개의 페이지가 있습니다.</p>
                {pages.length > 0 && (
                    <button onClick={() => navigatePage(pages[0].id)} style={{ padding: "8px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg, #0ea5e9, #6366f1)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
                        첫 번째 페이지로 이동
                    </button>
                )}
                <Link href={`/dashboard/learning/courses/${courseId}`} style={{ color: "#0ea5e9", fontWeight: 600, fontSize: 14 }}>
                    ← 코스로 돌아가기
                </Link>
            </div>
        );
    }

    const pageIcon = currentPage.type === '퀴즈' ? '?' : currentPage.type === '핵심정리' ? '≡' : currentPage.type === 'QnA' ? '' : '';

    return (
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "28px 16px 80px" }}>
            {/* XP Message */}
            <AnimatePresence>
                {xpMsg && (
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        style={{ position: "fixed", top: 80, right: 28, zIndex: 1000, padding: "10px 24px", borderRadius: 16, background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", fontWeight: 800, fontSize: 14, boxShadow: "0 8px 24px rgba(16,185,129,0.3)" }}>
                        {xpMsg}
                    </motion.div>
                )}
            </AnimatePresence>

            {levelUpInfo && <LevelUpModal level={levelUpInfo.level} onClose={() => setLevelUpInfo(null)} />}

            {/* ═══ Breadcrumb ═══ */}
            <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
                <Link href="/dashboard/learning" style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, textDecoration: "none" }}>학습</Link>
                <span style={{ fontSize: 10, color: "#cbd5e1" }}>›</span>
                <Link href={`/dashboard/learning/courses/${courseId}`} style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, textDecoration: "none" }}>{courseData.title}</Link>
                <span style={{ fontSize: 10, color: "#cbd5e1" }}>›</span>
                {chapterInfo && <><span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>CH.{chapterInfo.chapterNumber}</span><span style={{ fontSize: 10, color: "#cbd5e1" }}>›</span></>}
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>Unit {unit.unitNumber}. {unit.title}</span>
            </motion.div>

            {/* ═══ Page Tabs ═══ */}
            <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
                className="hide-scrollbar"
                style={{ ...glassPanel, display: "flex", gap: 2, overflowX: "auto", marginBottom: 24, padding: 6, borderRadius: 18 }}>
                {pages.map((pg, i) => {
                    const isActive = pg.id === pageIdParam;
                    const icon = pg.type === '퀴즈' ? '?' : pg.type === '핵심정리' ? '≡' : pg.type === 'QnA' ? '' : '';
                    const hasContent = !!(pg.content || pg.quiz || pg.problems);
                    return (
                        <motion.button key={pg.id} whileHover={{ y: -1 }} whileTap={{ scale: 0.97 }}
                            onClick={() => hasContent && navigatePage(pg.id)}
                            disabled={!hasContent}
                            style={{
                                padding: "10px 16px", border: "none", cursor: hasContent ? "pointer" : "not-allowed",
                                background: isActive ? "linear-gradient(135deg, rgba(14,165,233,0.1), rgba(99,102,241,0.08))" : "transparent",
                                borderRadius: 14, position: "relative", fontSize: 12,
                                fontWeight: isActive ? 700 : 500, color: isActive ? "#0369a1" : "#64748b",
                                whiteSpace: "nowrap", opacity: hasContent ? 1 : 0.4,
                                transition: "all 0.2s",
                            }}>
                            {icon} {pg.id}. {pg.title}
                            {isActive && <motion.div layoutId="page-tab-indicator" style={{ position: "absolute", bottom: 2, left: 8, right: 8, height: 2, background: "linear-gradient(90deg, #0ea5e9, #6366f1)", borderRadius: 999 }} />}
                        </motion.button>
                    );
                })}
            </motion.div>

            {/* ═══ Content Card ═══ */}
            <motion.div ref={contentRef} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                style={{ ...glassPanel, borderRadius: 28, overflow: "hidden", position: "relative" }}>
                {/* Gradient top bar */}
                <div style={{ height: 3, background: "linear-gradient(90deg, #0ea5e9, #6366f1, #8b5cf6)" }} />

                {/* Page Header */}
                <div style={{ padding: "32px 36px 0", borderBottom: "1px solid rgba(14,165,233,0.06)" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", letterSpacing: 1.5, textTransform: "uppercase" as const }}>
                            Page {currentPage.id}
                        </span>
                        <span style={{
                            padding: "2px 10px", borderRadius: 8, fontSize: 10, fontWeight: 700,
                            background: currentPage.type === '퀴즈' ? "rgba(168,85,247,0.08)" : currentPage.type === '핵심정리' ? "rgba(14,165,233,0.08)" : "rgba(16,185,129,0.08)",
                            color: currentPage.type === '퀴즈' ? "#7c3aed" : currentPage.type === '핵심정리' ? "#0284c7" : "#059669",
                        }}>
                            {pageIcon} {currentPage.type}
                        </span>
                    </div>
                    <h1 style={{ fontSize: 26, fontWeight: 900, color: "#0f172a", margin: "0 0 24px", lineHeight: 1.3, letterSpacing: -0.5 }}>
                        {currentPage.title}
                    </h1>
                </div>

                {/* Content Body */}
                <div style={{ padding: "28px 36px 36px" }}>
                    {/* HTML content */}
                    {currentPage.content && (
                        <div dangerouslySetInnerHTML={{ __html: currentPage.content }}
                            style={{ fontSize: 14, lineHeight: 1.9, color: "#334155", marginBottom: currentPage.quiz || currentPage.problems ? 32 : 0 }} />
                    )}

                    {/* Quiz */}
                    {currentPage.quiz && (
                        <QuizPanel
                            quiz={currentPage.quiz} unit={unit}
                            selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer}
                            quizResult={quizResult} shaking={shaking}
                            wrongCount={wrongCount} showHint={showHint}
                            onCheck={() => handleQuizCheck(currentPage.quiz!)}
                        />
                    )}

                    {/* Code Problems */}
                    {currentPage.problems && currentPage.problems.length > 0 && (
                        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: currentPage.content ? 28 : 0 }}>
                            {currentPage.problems.map((prob: CodeProblem) => (
                                <CodeProblemCard key={prob.id} prob={prob}
                                    editorCode={editorCode} setEditorCode={setEditorCode}
                                    runResult={runResult} runLoading={runLoading}
                                    executeCode={executeCode}
                                    showProblemAnswer={showProblemAnswer} setShowProblemAnswer={setShowProblemAnswer}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>

            {/* ═══ Navigation Footer ═══ */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 24, gap: 16 }}>
                {prevPage ? (
                    <motion.button whileHover={{ x: -3 }} whileTap={{ scale: 0.97 }}
                        onClick={() => navigatePage(prevPage.id)}
                        style={{ ...glassPanel, padding: "14px 24px", border: "none", cursor: "pointer", borderRadius: 16, display: "flex", alignItems: "center", gap: 10, flex: 1, maxWidth: 300 }}>
                        <MI icon="arrow_back" style={{ fontSize: 16, color: "#94a3b8" }} />
                        <div style={{ textAlign: "left" }}>
                            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>이전</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>{prevPage.title}</div>
                        </div>
                    </motion.button>
                ) : <div />}

                {nextPage ? (
                    <motion.button whileHover={{ x: 3 }} whileTap={{ scale: 0.97 }}
                        onClick={() => navigatePage(nextPage.id)}
                        style={{ ...glassPanel, padding: "14px 24px", border: "none", cursor: "pointer", borderRadius: 16, display: "flex", alignItems: "center", gap: 10, flex: 1, maxWidth: 300, justifyContent: "flex-end" }}>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>다음</div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>{nextPage.title}</div>
                        </div>
                        <MI icon="arrow_forward" style={{ fontSize: 16, color: "#94a3b8" }} />
                    </motion.button>
                ) : (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        onClick={() => nextUnitInfo
                            ? router.push(`/dashboard/learning/courses/${courseId}/units/${nextUnitInfo.unitIdx}/pages/${nextUnitInfo.firstPageId}`)
                            : router.push(`/dashboard/learning/courses/${courseId}`)}
                        style={{ padding: "14px 28px", border: "none", cursor: "pointer", borderRadius: 16, background: nextUnitInfo ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "linear-gradient(135deg, #10b981, #059669)", color: "#fff", fontWeight: 800, fontSize: 13, boxShadow: nextUnitInfo ? "0 4px 16px rgba(99,102,241,0.2)" : "0 4px 16px rgba(16,185,129,0.2)" }}>
                        {nextUnitInfo ? `다음 유닛 → ${nextUnitInfo.unit.title}` : "✓ 유닛 완료 · 목록으로 돌아가기"}
                    </motion.button>
                )}
            </motion.div>

            {/* ═══ Floating Bottom Nav Bar ═══ */}
            <div style={{
                position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 50,
                background: "rgba(255,255,255,0.92)", backdropFilter: "blur(20px)",
                borderTop: "1px solid rgba(226,232,240,0.5)",
                boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
                padding: "10px 24px",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
            }}>
                <button
                    onClick={() => prevPage && navigatePage(prevPage.id)}
                    disabled={!prevPage}
                    style={{
                        padding: "8px 20px", border: "1px solid #e2e8f0", borderRadius: 12,
                        background: prevPage ? "#fff" : "#f8fafc", cursor: prevPage ? "pointer" : "not-allowed",
                        fontSize: 13, fontWeight: 700, color: prevPage ? "#475569" : "#cbd5e1",
                        display: "flex", alignItems: "center", gap: 6, transition: "all 0.2s",
                    }}>
                    <MI icon="arrow_back" style={{ fontSize: 14 }} /> 이전
                </button>
                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, minWidth: 60, textAlign: "center" }}>
                    {currentPageIndex + 1} / {pages.length}
                </span>
                {nextPage ? (
                    <button
                        onClick={() => navigatePage(nextPage.id)}
                        style={{
                            padding: "8px 20px", border: "none", borderRadius: 12,
                            background: "linear-gradient(135deg, #6366f1, #8b5cf6)", cursor: "pointer",
                            fontSize: 13, fontWeight: 700, color: "#fff",
                            display: "flex", alignItems: "center", gap: 6,
                            boxShadow: "0 4px 12px rgba(99,102,241,0.25)", transition: "all 0.2s",
                        }}>
                        다음 <MI icon="arrow_forward" style={{ fontSize: 14 }} />
                    </button>
                ) : (
                    <button
                        onClick={() => nextUnitInfo
                            ? router.push(`/dashboard/learning/courses/${courseId}/units/${nextUnitInfo.unitIdx}/pages/${nextUnitInfo.firstPageId}`)
                            : router.push(`/dashboard/learning/courses/${courseId}`)}
                        style={{
                            padding: "8px 20px", border: "none", borderRadius: 12,
                            background: nextUnitInfo ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "linear-gradient(135deg, #10b981, #059669)", cursor: "pointer",
                            fontSize: 13, fontWeight: 700, color: "#fff",
                            display: "flex", alignItems: "center", gap: 6,
                            boxShadow: nextUnitInfo ? "0 4px 12px rgba(99,102,241,0.25)" : "0 4px 12px rgba(16,185,129,0.25)",
                        }}>
                        {nextUnitInfo ? "다음 유닛 →" : "✓ 완료"} <MI icon={nextUnitInfo ? "arrow_forward" : "check"} style={{ fontSize: 14 }} />
                    </button>
                )}
            </div>
        </div>
    );
}
