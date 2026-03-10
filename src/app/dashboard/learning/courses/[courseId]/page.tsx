"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";
import { awardXP, deductXP, XP_REWARDS, XP_PENALTIES } from "@/lib/xp-engine";
import { getCourseById, getAllUnits } from "@/data/courses";
import type { Unit, Quiz, Chapter as ChapterType, Page, CodeProblem } from "@/data/courses";
import LevelUpModal from "@/components/ui/LevelUpModal";
import { MI, glassPanel, QuizPanel, CodeProblemCard, TYPE_STYLES, DIFF_LABELS } from "./components";
import { useStudyNotes } from "@/hooks/useStudyNotes";
import StudyNotesEditor from "./StudyNotesEditor";

/* ── Highlighter Colors ── */
const HL_COLORS = [
    { id: "yellow", bg: "rgba(253,224,71,0.45)", solid: "#fde047", label: "노랑" },
    { id: "green", bg: "rgba(74,222,128,0.35)", solid: "#4ade80", label: "녹색" },
    { id: "blue", bg: "rgba(96,165,250,0.30)", solid: "#60a5fa", label: "파랑" },
    { id: "purple", bg: "rgba(192,132,252,0.30)", solid: "#c084fc", label: "보라" },
    { id: "red", bg: "rgba(252,165,165,0.40)", solid: "#fca5a5", label: "빨강" },
    { id: "orange", bg: "rgba(251,146,60,0.35)", solid: "#fb923c", label: "주황" },
];

const NOTE_BG: Record<string, { bg: string; border: string }> = {
    yellow: { bg: "#fef9c3", border: "#fde047" },
    green: { bg: "#dcfce7", border: "#86efac" },
    blue: { bg: "#dbeafe", border: "#93c5fd" },
    purple: { bg: "#f3e8ff", border: "#c084fc" },
    red: { bg: "#fee2e2", border: "#fca5a5" },
    orange: { bg: "#ffedd5", border: "#fdba74" },
};

export default function CourseDetailPage() {
    const params = useParams();
    const router = useRouter();
    const courseId = params.courseId as string;
    const { user } = useAuth();
    const supabase = useMemo(() => createClient(), []);
    const contentRef = useRef<HTMLDivElement>(null);

    const courseData = useMemo(() => getCourseById(courseId), [courseId]);
    const allUnits = useMemo(() => getAllUnits(courseId), [courseId]);

    // ── State ──
    const [completedUnits, setCompletedUnits] = useState<Set<string>>(() => {
        if (typeof window === "undefined") return new Set<string>();
        try { const s = localStorage.getItem(`codingssok_completed_${courseId}`); return s ? new Set<string>(JSON.parse(s)) : new Set<string>(); } catch { return new Set<string>(); }
    });
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
    const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
    const [activePage, setActivePage] = useState<Page | null>(null);
    const [leftOpen, setLeftOpen] = useState(true);
    const [rightOpen, setRightOpen] = useState(true);

    // Quiz state
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [quizResult, setQuizResult] = useState<"correct" | "wrong" | null>(null);
    const [wrongCount, setWrongCount] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [shaking, setShaking] = useState(false);
    const [levelUpInfo, setLevelUpInfo] = useState<{ level: number } | null>(null);
    const [xpMsg, setXpMsg] = useState("");

    // Code problem state
    const [showProblemAnswer, setShowProblemAnswer] = useState<Record<number, boolean>>({});
    const [editorCode, setEditorCode] = useState<Record<number, string>>({});
    const [runResult, setRunResult] = useState<Record<number, { stdout: string; stderr: string; exitCode: number } | null>>({});
    const [runLoading, setRunLoading] = useState<Record<number, boolean>>({});

    // Notes
    const { saveNote, getNote } = useStudyNotes();
    const noteKey = `${user?.id || "anon"}_${courseId}_${selectedUnit?.id || ""}_${activePage?.id || ""}`;
    const existingNote = getNote(noteKey);
    const [noteText, setNoteText] = useState(existingNote?.content || "");
    const [noteColor, setNoteColor] = useState(existingNote?.color || "yellow");
    const noteSaveTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Highlighter
    const [activeHL, setActiveHL] = useState<string | null>(null);

    // Right panel tab
    const [rightTab, setRightTab] = useState<"notes" | "timer" | "qa" | "bookmarks">("notes");

    // Timer
    const [timerMode, setTimerMode] = useState<"focus" | "short" | "long">("focus");
    const [timerSec, setTimerSec] = useState(25 * 60);
    const [timerRunning, setTimerRunning] = useState(false);
    const [timerSessions, setTimerSessions] = useState(0);
    const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
    const TIMER_DURATIONS = { focus: 25 * 60, short: 5 * 60, long: 15 * 60 };

    useEffect(() => {
        if (timerRunning && timerSec > 0) {
            timerRef.current = setInterval(() => setTimerSec(s => s - 1), 1000);
            return () => clearInterval(timerRef.current);
        } else if (timerSec === 0 && timerRunning) {
            setTimerRunning(false);
            if (timerMode === "focus") setTimerSessions(s => s + 1);
        }
    }, [timerRunning, timerSec, timerMode]);

    const resetTimer = (mode: "focus" | "short" | "long") => { setTimerMode(mode); setTimerSec(TIMER_DURATIONS[mode]); setTimerRunning(false); if (timerRef.current) clearInterval(timerRef.current); };

    // Q&A
    const [qaList, setQaList] = useState<{ q: string; ts: number }[]>(() => {
        if (typeof window === "undefined") return [];
        try { const s = localStorage.getItem(`codingssok_qa_${user?.id || "anon"}_${courseId}`); return s ? JSON.parse(s) : []; } catch { return []; }
    });
    const [qaInput, setQaInput] = useState("");
    const addQuestion = () => {
        if (!qaInput.trim()) return;
        const next = [{ q: qaInput.trim(), ts: Date.now() }, ...qaList];
        setQaList(next); setQaInput("");
        try { localStorage.setItem(`codingssok_qa_${user?.id || "anon"}_${courseId}`, JSON.stringify(next)); } catch {}
    };

    // Bookmarks
    const [bookmarks, setBookmarks] = useState<{ unitId: string; unitTitle: string; pageId: string; pageTitle: string; ts: number }[]>(() => {
        if (typeof window === "undefined") return [];
        try { const s = localStorage.getItem(`codingssok_bm_${user?.id || "anon"}_${courseId}`); return s ? JSON.parse(s) : []; } catch { return []; }
    });
    const addBookmark = () => {
        if (!selectedUnit || !activePage) return;
        if (bookmarks.some(b => b.unitId === selectedUnit.id && b.pageId === activePage.id)) return;
        const next = [{ unitId: selectedUnit.id, unitTitle: selectedUnit.title, pageId: activePage.id, pageTitle: activePage.title, ts: Date.now() }, ...bookmarks];
        setBookmarks(next);
        try { localStorage.setItem(`codingssok_bm_${user?.id || "anon"}_${courseId}`, JSON.stringify(next)); } catch {}
    };
    const removeBookmark = (ts: number) => {
        const next = bookmarks.filter(b => b.ts !== ts);
        setBookmarks(next);
        try { localStorage.setItem(`codingssok_bm_${user?.id || "anon"}_${courseId}`, JSON.stringify(next)); } catch {}
    };
    const isBookmarked = selectedUnit && activePage ? bookmarks.some(b => b.unitId === selectedUnit.id && b.pageId === activePage.id) : false;

    // Sync note text when selection changes
    useEffect(() => {
        const n = getNote(noteKey);
        setNoteText(n?.content || "");
        setNoteColor(n?.color || "yellow");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [noteKey]);

    // Auto-save note (debounced — avoids re-render flicker)
    const saveNoteDebounced = useCallback((text: string, color: string) => {
        if (noteSaveTimer.current) clearTimeout(noteSaveTimer.current);
        noteSaveTimer.current = setTimeout(() => {
            if (text.trim()) saveNote(noteKey, text, color);
        }, 800);
    }, [noteKey, saveNote]);
    useEffect(() => () => { if (noteSaveTimer.current) clearTimeout(noteSaveTimer.current); }, []);

    // Highlight persistence key
    const hlStorageKey = `codingssok_hl_${user?.id || "anon"}_${courseId}_${selectedUnit?.id || ""}_${activePage?.id || ""}`;

    // Save highlights to localStorage
    const saveHighlights = useCallback(() => {
        if (!contentRef.current) return;
        try { localStorage.setItem(hlStorageKey, contentRef.current.innerHTML); } catch {}
    }, [hlStorageKey]);

    // Attach click-to-remove + persist on <mark> elements
    const attachMarkListeners = useCallback(() => {
        if (!contentRef.current) return;
        contentRef.current.querySelectorAll("mark").forEach(mark => {
            if (mark.dataset.hlBound) return;
            mark.dataset.hlBound = "1";
            mark.style.cursor = "pointer";
            mark.title = "클릭하여 형광편 제거";
            mark.addEventListener("click", () => {
                mark.replaceWith(...Array.from(mark.childNodes));
                saveHighlights();
            });
        });
    }, [saveHighlights]);

    // Restore highlights from localStorage after content renders
    useEffect(() => {
        if (!contentRef.current || !activePage) return;
        const saved = localStorage.getItem(hlStorageKey);
        if (saved) {
            contentRef.current.innerHTML = saved;
            attachMarkListeners();
        }
    }, [hlStorageKey, activePage, attachMarkListeners]);

    // Highlight selected text in content
    const highlightSelection = useCallback((colorId: string) => {
        const sel = window.getSelection();
        if (!sel || sel.isCollapsed || !contentRef.current) return;
        const range = sel.getRangeAt(0);
        if (!contentRef.current.contains(range.commonAncestorContainer)) return;
        const hlColor = HL_COLORS.find(c => c.id === colorId);
        if (!hlColor) return;
        const mark = document.createElement("mark");
        mark.style.background = hlColor.bg;
        mark.style.borderBottom = `2px solid ${hlColor.solid}`;
        mark.style.padding = "1px 2px";
        mark.style.borderRadius = "3px";
        mark.style.cursor = "pointer";
        mark.title = "클릭하여 형광편 제거";
        mark.addEventListener("click", () => { mark.replaceWith(...Array.from(mark.childNodes)); saveHighlights(); });
        try { range.surroundContents(mark); } catch {}
        sel.removeAllRanges();
        saveHighlights();
    }, [saveHighlights]);

    // Listen for text selection when highlighter is active
    useEffect(() => {
        if (!activeHL) return;
        const handleMouseUp = () => {
            const sel = window.getSelection();
            if (sel && !sel.isCollapsed) highlightSelection(activeHL);
        };
        document.addEventListener("mouseup", handleMouseUp);
        return () => document.removeEventListener("mouseup", handleMouseUp);
    }, [activeHL, highlightSelection]);

    // ── Init ──
    useEffect(() => {
        if (courseData?.chapters?.[0]) setExpandedChapters(new Set([courseData.chapters[0].id]));
    }, [courseData]);

    useEffect(() => {
        if (!user) return;
        (async () => {
            try {
                const { data } = await supabase.from("user_course_progress").select("completed_lessons").eq("user_id", user.id).eq("course_id", courseId).single();
                if (data?.completed_lessons) setCompletedUnits(new Set(data.completed_lessons as string[]));
            } catch {}
        })();
    }, [user, courseId, supabase]);

    // ── Inject __runCCode ──
    useEffect(() => {
        (window as any).__runCCode = async (btn: HTMLButtonElement) => {
            const code = btn.getAttribute("data-code")?.replace(/\\n/g, "\n").replace(/\\"/g, '"') ?? "";
            btn.disabled = true; btn.textContent = "⏳ 실행 중...";
            const wrapper = btn.closest(".lms-code-wrap");
            try {
                const res = await fetch("/api/compile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) });
                const data = await res.json();
                const output = data.program_output || data.compiler_error || data.program_error || "(출력 없음)";
                const isError = !!(data.compiler_error || data.program_error);
                let outEl = wrapper?.querySelector(".lms-run-output") as HTMLDivElement;
                if (!outEl) { outEl = document.createElement("div"); outEl.className = "lms-run-output"; wrapper?.appendChild(outEl); }
                outEl.innerHTML = `<div class="status ${isError ? "error" : "success"}">${isError ? "✗ 에러" : "✓ 실행 완료"}</div><pre>${output}</pre>`;
            } catch {} finally { btn.disabled = false; btn.textContent = "▶ 실행"; }
        };
        return () => { delete (window as any).__runCCode; };
    }, []);

    // ── Copy btns ──
    useEffect(() => {
        if (!contentRef.current) return;
        const timer = setTimeout(() => {
            contentRef.current?.querySelectorAll("pre").forEach(pre => {
                if (pre.querySelector(".copy-btn")) return;
                const btn = document.createElement("button");
                btn.className = "copy-btn";
                btn.textContent = "복사";
                Object.assign(btn.style, { position: "absolute", top: "6px", right: "6px", padding: "3px 10px", border: "none", borderRadius: "6px", background: "rgba(255,255,255,0.9)", color: "#475569", fontSize: "10px", fontWeight: "700", cursor: "pointer", opacity: "0", transition: "opacity 0.2s", zIndex: "10" });
                pre.style.position = "relative";
                pre.addEventListener("mouseenter", () => { btn.style.opacity = "1"; });
                pre.addEventListener("mouseleave", () => { btn.style.opacity = "0"; });
                btn.addEventListener("click", async () => {
                    const code = pre.querySelector("code")?.textContent || pre.textContent || "";
                    try { await navigator.clipboard.writeText(code); btn.textContent = "✓"; setTimeout(() => { btn.textContent = "복사"; }, 1200); } catch {}
                });
                pre.appendChild(btn);
            });
        }, 300);
        return () => clearTimeout(timer);
    }, [activePage?.content]);

    // ── Actions ──
    const toggleChapter = (id: string) => setExpandedChapters(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

    const selectUnit = (unit: Unit) => {
        setSelectedUnit(unit);
        const firstPage = unit.pages?.find(p => p.content || p.quiz || p.problems) || unit.pages?.[0] || null;
        setActivePage(firstPage);
        resetQuiz();
    };

    const resetQuiz = () => { setSelectedAnswer(null); setQuizResult(null); setWrongCount(0); setShowHint(false); setShaking(false); setShowProblemAnswer({}); setEditorCode({}); setRunResult({}); };

    const executeCode = async (probId: number, code: string) => {
        setRunLoading(prev => ({ ...prev, [probId]: true }));
        setRunResult(prev => ({ ...prev, [probId]: null }));
        try {
            const res = await fetch("/api/compile", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ code }) });
            const data = await res.json();
            setRunResult(prev => ({ ...prev, [probId]: { stdout: data.program_output || "", stderr: data.program_error || data.compiler_error || "", exitCode: data.status === "0" ? 0 : 1 } }));
        } catch { setRunResult(prev => ({ ...prev, [probId]: { stdout: "", stderr: "네트워크 오류", exitCode: 1 } })); }
        finally { setRunLoading(prev => ({ ...prev, [probId]: false })); }
    };

    const handleQuizCheck = (quiz: Quiz, unit: Unit) => {
        if (selectedAnswer === null) return;
        if (selectedAnswer === quiz.answer) {
            setQuizResult("correct");
            setTimeout(() => completeUnit(unit), 1500);
        } else {
            setQuizResult("wrong"); setShaking(true);
            const nw = wrongCount + 1; setWrongCount(nw);
            if (user) { deductXP(user.id, XP_PENALTIES.wrong_answer, `오답: ${unit.title}`); setXpMsg(`-${XP_PENALTIES.wrong_answer} XP`); setTimeout(() => setXpMsg(""), 2500); }
            if (nw >= 3) setShowHint(true);
            setTimeout(() => { setShaking(false); setQuizResult(null); setSelectedAnswer(null); }, 1500);
        }
    };

    const completeUnit = async (unit: Unit) => {
        if (completedUnits.has(unit.id)) return;
        const nc = new Set(completedUnits); nc.add(unit.id); setCompletedUnits(nc);
        try { localStorage.setItem(`codingssok_completed_${courseId}`, JSON.stringify(Array.from(nc))); } catch {}
        resetQuiz();
        if (user) {
            const result = await awardXP(user.id, XP_REWARDS.lesson_complete, `학습 완료: ${unit.title}`, "book");
            setXpMsg(`+${XP_REWARDS.lesson_complete} XP!`); setTimeout(() => setXpMsg(""), 3000);
            if (result?.levelUp) setLevelUpInfo({ level: result.level });
            const prog = Math.round((nc.size / allUnits.length) * 100);
            await supabase.from("user_course_progress").upsert({ user_id: user.id, course_id: courseId, progress: prog, completed_lessons: Array.from(nc) }, { onConflict: "user_id,course_id" });
        }
    };

    // Page navigation
    const pages = selectedUnit?.pages ?? [];
    const currentPageIdx = pages.findIndex(p => p.id === activePage?.id);
    const prevPage = currentPageIdx > 0 ? pages[currentPageIdx - 1] : null;
    const nextPage = currentPageIdx < pages.length - 1 ? pages[currentPageIdx + 1] : null;
    const navigatePage = (pg: Page) => { setActivePage(pg); resetQuiz(); if (contentRef.current) contentRef.current.scrollTop = 0; };

    if (!courseData) return <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>코스를 찾을 수 없습니다.</div>;

    const progressPct = allUnits.length > 0 ? Math.round((completedUnits.size / allUnits.length) * 100) : 0;

    return (
        <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "#f8fafc" }}>
            <style>{`
                .hide-sb::-webkit-scrollbar{display:none} .hide-sb{-ms-overflow-style:none;scrollbar-width:none}
                @keyframes confetti-pop{0%{transform:scale(0)}50%{transform:scale(1.2)}100%{transform:scale(1)}}
                @keyframes pulse-green{0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.4)}50%{box-shadow:0 0 0 12px rgba(16,185,129,0)}}
            `}</style>

            {levelUpInfo && <LevelUpModal level={levelUpInfo.level} onClose={() => setLevelUpInfo(null)} />}
            <AnimatePresence>
                {xpMsg && (
                    <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, padding: "12px 24px", borderRadius: 16, background: xpMsg.includes("-") ? "linear-gradient(135deg,#dc2626,#b91c1c)" : "linear-gradient(135deg,#059669,#047857)", color: "#fff", fontSize: 14, fontWeight: 800 }}>{xpMsg}</motion.div>
                )}
            </AnimatePresence>

            {/* ══════════════════════════════════════════════
                LEFT PANEL — 커리큘럼 트리
               ══════════════════════════════════════════════ */}
            <motion.aside
                animate={{ width: leftOpen ? 280 : 0, opacity: leftOpen ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ flexShrink: 0, overflow: "hidden", borderRight: "1px solid #e2e8f0", background: "#fff", display: "flex", flexDirection: "column" }}>

                {/* Header */}
                <div style={{ padding: "20px 16px 12px", borderBottom: "1px solid #f1f5f9" }}>
                    <Link href="/dashboard/learning" style={{ fontSize: 11, color: "#94a3b8", textDecoration: "none", fontWeight: 600, display: "flex", alignItems: "center", gap: 4, marginBottom: 12 }}>
                        <MI icon="arrow_back" style={{ fontSize: 14 }} /> 대시보드
                    </Link>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                        <span style={{ fontSize: 28 }}>{courseData.icon}</span>
                        <div>
                            <h2 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", margin: 0, lineHeight: 1.3 }}>{courseData.title}</h2>
                            <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{allUnits.length}개 유닛</span>
                        </div>
                    </div>
                    {/* Progress */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, color: "#64748b" }}>진행률</span>
                        <span style={{ fontSize: 10, fontWeight: 800, color: progressPct === 100 ? "#10b981" : "#6366f1" }}>{progressPct}%</span>
                    </div>
                    <div style={{ height: 6, background: "#f1f5f9", borderRadius: 999, overflow: "hidden" }}>
                        <motion.div initial={{ width: 0 }} animate={{ width: `${progressPct}%` }} style={{ height: "100%", background: courseData.gradient, borderRadius: 999 }} />
                    </div>
                </div>

                {/* Chapter Tree */}
                <div className="hide-sb" style={{ flex: 1, overflowY: "auto", padding: "8px 0" }}>
                    {courseData.chapters.map((ch: ChapterType) => {
                        const isExp = expandedChapters.has(ch.id);
                        const chDone = ch.units.filter(u => completedUnits.has(u.id)).length;
                        return (
                            <div key={ch.id} style={{ marginBottom: 2 }}>
                                {/* Chapter header */}
                                <button onClick={() => toggleChapter(ch.id)} style={{
                                    width: "100%", padding: "10px 16px", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                                    background: isExp ? "rgba(99,102,241,0.04)" : "transparent", textAlign: "left", transition: "background 0.15s",
                                }}>
                                    <span style={{ fontSize: 10, transition: "transform 0.2s", transform: isExp ? "rotate(90deg)" : "rotate(0)", color: "#94a3b8" }}>▶</span>
                                    <span style={{ fontSize: 16 }}>{ch.icon}</span>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 9, fontWeight: 800, color: "#94a3b8", letterSpacing: 1, textTransform: "uppercase" as const }}>CH.{ch.chapterNumber}</div>
                                        <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ch.title}</div>
                                    </div>
                                    <span style={{ fontSize: 9, fontWeight: 800, color: chDone === ch.units.length ? "#10b981" : "#94a3b8", padding: "2px 6px", borderRadius: 6, background: chDone === ch.units.length ? "#f0fdf4" : "#f8fafc" }}>{chDone}/{ch.units.length}</span>
                                </button>

                                {/* Units */}
                                <AnimatePresence initial={false}>
                                    {isExp && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                                            {ch.units.map((unit, i) => {
                                                const done = completedUnits.has(unit.id);
                                                const prevU = i > 0 ? ch.units[i - 1] : null;
                                                const locked = prevU ? !completedUnits.has(prevU.id) && !done : false;
                                                const isSelected = selectedUnit?.id === unit.id;
                                                const hasContent = unit.pages?.some(p => p.content || p.quiz || p.problems) || unit.content;
                                                return (
                                                    <button key={unit.id} onClick={() => !locked && hasContent && selectUnit(unit)} disabled={locked || !hasContent}
                                                        style={{
                                                            width: "100%", padding: "8px 16px 8px 40px", border: "none", cursor: locked || !hasContent ? "not-allowed" : "pointer",
                                                            display: "flex", alignItems: "center", gap: 8, textAlign: "left", transition: "all 0.15s",
                                                            background: isSelected ? "linear-gradient(90deg, rgba(99,102,241,0.08), transparent)" : "transparent",
                                                            borderLeft: isSelected ? "3px solid #6366f1" : "3px solid transparent",
                                                            opacity: locked ? 0.4 : !hasContent ? 0.5 : 1,
                                                        }}>
                                                        <div style={{
                                                            width: 22, height: 22, borderRadius: "50%", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                                                            background: done ? "#10b981" : locked ? "#e2e8f0" : isSelected ? "#6366f1" : "#f1f5f9",
                                                            color: (done || isSelected) ? "#fff" : locked ? "#cbd5e1" : "#64748b", fontSize: 9, fontWeight: 800,
                                                        }}>{done ? <span className="material-symbols-outlined" style={{fontSize:12}}>check</span> : locked ? <span className="material-symbols-outlined" style={{fontSize:12}}>lock</span> : unit.unitNumber}</div>
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ fontSize: 11, fontWeight: isSelected ? 700 : 600, color: isSelected ? "#0f172a" : done ? "#64748b" : "#334155", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{unit.title}</div>
                                                            {unit.duration && <div style={{ fontSize: 9, color: "#94a3b8" }}>{unit.duration}</div>}
                                                        </div>
                                                        {!hasContent && <span style={{ fontSize: 8, color: "#94a3b8", fontWeight: 700, padding: "1px 6px", borderRadius: 4, background: "#f1f5f9" }}>준비중</span>}
                                                    </button>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </motion.aside>

            {/* Left toggle */}
            <button onClick={() => setLeftOpen(!leftOpen)} style={{ position: "absolute", left: leftOpen ? 268 : 0, top: "50%", transform: "translateY(-50%)", zIndex: 50, width: 24, height: 48, borderRadius: "0 8px 8px 0", border: "1px solid #e2e8f0", borderLeft: "none", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "2px 0 8px rgba(0,0,0,0.04)", transition: "left 0.3s" }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{leftOpen ? "◂" : "▸"}</span>
            </button>

            {/* ══════════════════════════════════════════════
                CENTER PANEL — 학습 콘텐츠
               ══════════════════════════════════════════════ */}
            <main style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>

                {selectedUnit && activePage ? (
                    <>
                        {/* Highlighter Toolbar — 상단 중앙 */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, borderBottom: "1px solid #e2e8f0", background: "#fff", padding: "10px 24px", flexShrink: 0 }}>
                            <MI icon="ink_highlighter" style={{ fontSize: 16, color: activeHL ? HL_COLORS.find(c => c.id === activeHL)?.solid || "#6366f1" : "#94a3b8" }} />
                            {HL_COLORS.map(c => {
                                const isOn = activeHL === c.id;
                                return (
                                    <button key={c.id} onClick={() => setActiveHL(isOn ? null : c.id)} title={c.label}
                                        style={{
                                            width: 24, height: 18, borderRadius: 6, cursor: "pointer", transition: "all 0.15s", position: "relative",
                                            border: isOn ? `2px solid ${c.solid}` : "1px solid #e2e8f0",
                                            background: c.bg,
                                            transform: isOn ? "scale(1.15)" : "scale(1)",
                                            boxShadow: isOn ? `0 2px 6px ${c.bg}` : "none",
                                        }}>
                                        <div style={{ position: "absolute", bottom: 2, left: 4, right: 4, height: 2, background: c.solid, borderRadius: 1 }} />
                                    </button>
                                );
                            })}
                            {activeHL && (
                                <button onClick={() => setActiveHL(null)} title="형광펜 끄기" style={{ width: 20, height: 18, borderRadius: 6, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontSize: 10, color: "#94a3b8", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                            )}
                            {activeHL && <span style={{ fontSize: 10, color: HL_COLORS.find(c => c.id === activeHL)?.solid || "#6366f1", fontWeight: 700, marginLeft: 4 }}>텍스트를 드래그하세요</span>}
                        </div>

                        {/* Content */}
                        <div ref={contentRef} className="hide-sb" style={{ flex: 1, overflowY: "auto", padding: "32px 40px 120px" }}>
                            {/* Page header */}
                            <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid #f1f5f9" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                                    <span style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", letterSpacing: 1.5 }}>UNIT {selectedUnit.unitNumber} · PAGE {activePage.id}</span>
                                    <span style={{ padding: "2px 8px", borderRadius: 6, fontSize: 9, fontWeight: 700, background: activePage.type === "퀴즈" ? "#f5f3ff" : activePage.type === "핵심정리" ? "#f0f9ff" : "#f0fdf4", color: activePage.type === "퀴즈" ? "#7c3aed" : activePage.type === "핵심정리" ? "#0284c7" : "#059669" }}>{activePage.type}</span>
                                </div>
                                <h1 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: 0, lineHeight: 1.3, letterSpacing: -0.5 }}>{activePage.title}</h1>
                            </div>

                            {/* HTML content */}
                            {activePage.content && (
                                <div dangerouslySetInnerHTML={{ __html: activePage.content }} style={{ maxWidth: 800, margin: "0 auto", fontSize: 14, lineHeight: 1.9, color: "#334155", marginBottom: activePage.quiz || (activePage.problems && activePage.problems.length > 0) ? 32 : 0 }} />
                            )}

                            {/* Quiz */}
                            {activePage.quiz && <QuizPanel quiz={activePage.quiz} unit={selectedUnit} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} quizResult={quizResult} shaking={shaking} wrongCount={wrongCount} showHint={showHint} onCheck={() => handleQuizCheck(activePage.quiz!, selectedUnit)} />}

                            {/* Code Problems */}
                            {activePage.problems && activePage.problems.length > 0 && (
                                <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: activePage.content ? 28 : 0 }}>
                                    {activePage.problems.map((prob: CodeProblem) => (
                                        <CodeProblemCard key={prob.id} prob={prob} editorCode={editorCode} setEditorCode={setEditorCode} runResult={runResult} runLoading={runLoading} executeCode={executeCode} showProblemAnswer={showProblemAnswer} setShowProblemAnswer={setShowProblemAnswer} />
                                    ))}
                                </div>
                            )}

                            {/* Nav buttons */}
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 40, gap: 16 }}>
                                {prevPage ? (
                                    <button onClick={() => navigatePage(prevPage)} style={{ padding: "10px 20px", borderRadius: 12, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#475569", display: "flex", alignItems: "center", gap: 6 }}>
                                        <MI icon="arrow_back" style={{ fontSize: 14 }} /> {prevPage.title}
                                    </button>
                                ) : <div />}
                                {nextPage ? (
                                    <button onClick={() => navigatePage(nextPage)} style={{ padding: "10px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#fff", display: "flex", alignItems: "center", gap: 6 }}>
                                        {nextPage.title} <MI icon="arrow_forward" style={{ fontSize: 14 }} />
                                    </button>
                                ) : (
                                    <button onClick={() => { if (!completedUnits.has(selectedUnit.id)) completeUnit(selectedUnit); }} style={{ padding: "10px 20px", borderRadius: 12, border: "none", background: "linear-gradient(135deg,#10b981,#059669)", cursor: "pointer", fontSize: 12, fontWeight: 700, color: "#fff" }}>
                                        ✓ 학습 완료
                                    </button>
                                )}
                            </div>
                        </div>
                    </>
                ) : selectedUnit && !activePage && selectedUnit.content ? (
                    /* Legacy unit with direct content (no pages) */
                    <div ref={contentRef} className="hide-sb" style={{ flex: 1, overflowY: "auto", padding: "32px 40px 120px" }}>
                        <div style={{ marginBottom: 28, paddingBottom: 20, borderBottom: "1px solid #f1f5f9" }}>
                            <span style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", letterSpacing: 1.5 }}>UNIT {selectedUnit.unitNumber}</span>
                            <h1 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: "6px 0 0" }}>{selectedUnit.title}</h1>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.9, color: "#334155" }}>{selectedUnit.content}</p>
                        {selectedUnit.tip && <p style={{ fontSize: 13, color: "#0ea5e9", fontWeight: 600, marginTop: 12 }}>{selectedUnit.tip}</p>}
                        {selectedUnit.quiz && <QuizPanel quiz={selectedUnit.quiz} unit={selectedUnit} selectedAnswer={selectedAnswer} setSelectedAnswer={setSelectedAnswer} quizResult={quizResult} shaking={shaking} wrongCount={wrongCount} showHint={showHint} onCheck={() => handleQuizCheck(selectedUnit.quiz!, selectedUnit)} />}
                    </div>
                ) : (
                    /* Empty state */
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20, color: "#94a3b8" }}>
                        <svg width="160" height="140" viewBox="0 0 160 140" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Desk */}
                            <rect x="20" y="100" width="120" height="8" rx="4" fill="#e2e8f0" />
                            <rect x="35" y="108" width="8" height="20" rx="2" fill="#cbd5e1" />
                            <rect x="117" y="108" width="8" height="20" rx="2" fill="#cbd5e1" />
                            {/* Book stack */}
                            <rect x="38" y="82" width="50" height="10" rx="2" fill="#c7d2fe" />
                            <rect x="40" y="72" width="46" height="10" rx="2" fill="#a5b4fc" />
                            <rect x="42" y="62" width="42" height="10" rx="2" fill="#818cf8" />
                            {/* Open book */}
                            <g transform="translate(70, 50)">
                                <path d="M0 10 C0 4, 8 0, 30 0 L30 40 C8 40, 0 36, 0 30Z" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" />
                                <path d="M60 10 C60 4, 52 0, 30 0 L30 40 C52 40, 60 36, 60 30Z" fill="#ede9fe" stroke="#c4b5fd" strokeWidth="1.5" />
                                <line x1="30" y1="2" x2="30" y2="38" stroke="#cbd5e1" strokeWidth="1" />
                                {/* Text lines on left page */}
                                <line x1="6" y1="10" x2="24" y2="10" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="6" y1="16" x2="20" y2="16" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="6" y1="22" x2="22" y2="22" stroke="#bfdbfe" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="6" y1="28" x2="18" y2="28" stroke="#dbeafe" strokeWidth="1.5" strokeLinecap="round" />
                                {/* Text lines on right page */}
                                <line x1="36" y1="10" x2="54" y2="10" stroke="#c4b5fd" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="36" y1="16" x2="50" y2="16" stroke="#ddd6fe" strokeWidth="1.5" strokeLinecap="round" />
                                <line x1="36" y1="22" x2="52" y2="22" stroke="#ddd6fe" strokeWidth="1.5" strokeLinecap="round" />
                            </g>
                            {/* Cursor/pointer arrow */}
                            <g transform="translate(108, 68)">
                                <path d="M0 0 L0 20 L6 15 L12 24 L16 22 L10 13 L17 11Z" fill="#6366f1" stroke="#4f46e5" strokeWidth="1" strokeLinejoin="round" />
                            </g>
                            {/* Sparkles */}
                            <circle cx="55" cy="42" r="2" fill="#fbbf24" opacity="0.8">
                                <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="140" cy="55" r="1.5" fill="#a78bfa" opacity="0.6">
                                <animate attributeName="opacity" values="0.6;0.1;0.6" dur="1.8s" repeatCount="indefinite" />
                            </circle>
                            <circle cx="25" cy="60" r="1.5" fill="#60a5fa" opacity="0.7">
                                <animate attributeName="opacity" values="0.7;0.15;0.7" dur="2.2s" repeatCount="indefinite" />
                            </circle>
                        </svg>
                        <div style={{ textAlign: "center" }}>
                            <h3 style={{ fontSize: 17, fontWeight: 800, color: "#475569", margin: "0 0 6px" }}>학습할 유닛을 선택하세요</h3>
                            <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, lineHeight: 1.6 }}>← 커리큘럼에서 원하는 유닛을 클릭하면<br />학습이 시작됩니다</p>
                        </div>
                    </div>
                )}
            </main>

            {/* Right toggle */}
            <button onClick={() => setRightOpen(!rightOpen)} style={{ position: "absolute", right: rightOpen ? 468 : 0, top: "50%", transform: "translateY(-50%)", zIndex: 50, width: 24, height: 48, borderRadius: "8px 0 0 8px", border: "1px solid #e2e8f0", borderRight: "none", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "-2px 0 8px rgba(0,0,0,0.04)", transition: "right 0.3s" }}>
                <span style={{ fontSize: 12, color: "#94a3b8" }}>{rightOpen ? "▸" : "◂"}</span>
            </button>

            {/* ══════════════════════════════════════════════
                RIGHT PANEL — 도구 패널
               ══════════════════════════════════════════════ */}
            <motion.aside
                animate={{ width: rightOpen ? 480 : 0, opacity: rightOpen ? 1 : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                style={{ flexShrink: 0, overflow: "hidden", borderLeft: "1px solid #e2e8f0", background: "#fff", display: "flex", flexDirection: "column" }}>

                {/* ── Tab Bar ── */}
                <div style={{ display: "flex", borderBottom: "1px solid #f1f5f9", background: "#fafafa" }}>
                    {(["notes", "timer", "qa", "bookmarks"] as const).map(tab => {
                        const icons = { notes: "edit_note", timer: "timer", qa: "help_outline", bookmarks: "bookmark" };
                        const labels = { notes: "노트", timer: "타이머", qa: "Q&A", bookmarks: "북마크" };
                        const isActive = rightTab === tab;
                        return (
                            <button key={tab} onClick={() => setRightTab(tab)} style={{
                                flex: 1, padding: "10px 0", border: "none", cursor: "pointer", background: "transparent",
                                borderBottom: isActive ? "2px solid #6366f1" : "2px solid transparent",
                                color: isActive ? "#6366f1" : "#94a3b8", fontSize: 10, fontWeight: isActive ? 800 : 600,
                                display: "flex", flexDirection: "column", alignItems: "center", gap: 2, transition: "all 0.15s",
                            }}>
                                <MI icon={icons[tab]} style={{ fontSize: 16 }} />
                                {labels[tab]}
                            </button>
                        );
                    })}
                </div>

                {/* ── Tab Content ── */}
                <div className="hide-sb" style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>

                    {rightTab === "notes" && (
                        selectedUnit ? (
                            <StudyNotesEditor
                                key={noteKey}
                                initialContent={existingNote?.content || ""}
                                initialColor={existingNote?.color || "yellow"}
                                unitTitle={selectedUnit.title}
                                onSave={(content, color) => saveNote(noteKey, content, color)}
                            />
                        ) : (
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#cbd5e1", gap: 8 }}>
                                <MI icon="sticky_note_2" style={{ fontSize: 32 }} />
                                <p style={{ fontSize: 12, margin: 0, textAlign: "center" }}>유닛을 선택하면<br />노트를 작성할 수 있습니다</p>
                            </div>
                        )
                    )}

                    {/* ━━ TIMER TAB ━━ */}
                    {rightTab === "timer" && (() => {
                        const totalSec = TIMER_DURATIONS[timerMode];
                        const pct = totalSec > 0 ? ((totalSec - timerSec) / totalSec) * 100 : 0;
                        const mm = String(Math.floor(timerSec / 60)).padStart(2, "0");
                        const ss = String(timerSec % 60).padStart(2, "0");
                        return (
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 16px", gap: 20 }}>
                                {/* Mode selector */}
                                <div style={{ display: "flex", gap: 6, background: "#f1f5f9", borderRadius: 12, padding: 4 }}>
                                    {(["focus", "short", "long"] as const).map(m => (
                                        <button key={m} onClick={() => resetTimer(m)} style={{
                                            padding: "6px 14px", borderRadius: 10, border: "none", cursor: "pointer", fontSize: 11, fontWeight: timerMode === m ? 700 : 500,
                                            background: timerMode === m ? "#fff" : "transparent", color: timerMode === m ? "#6366f1" : "#64748b",
                                            boxShadow: timerMode === m ? "0 2px 8px rgba(0,0,0,0.06)" : "none", transition: "all 0.15s",
                                        }}>{m === "focus" ? "집중" : m === "short" ? "짧은 휴식" : "긴 휴식"}</button>
                                    ))}
                                </div>

                                {/* Circular progress */}
                                <div style={{ position: "relative", width: 180, height: 180 }}>
                                    <svg width="180" height="180" style={{ transform: "rotate(-90deg)" }}>
                                        <circle cx="90" cy="90" r="80" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                                        <circle cx="90" cy="90" r="80" fill="none" stroke={timerMode === "focus" ? "#6366f1" : "#10b981"} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 80}`} strokeDashoffset={`${2 * Math.PI * 80 * (1 - pct / 100)}`} style={{ transition: "stroke-dashoffset 0.5s" }} />
                                    </svg>
                                    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                        <span style={{ fontSize: 40, fontWeight: 900, color: "#0f172a", fontFamily: "monospace", letterSpacing: 2 }}>{mm}:{ss}</span>
                                        <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{timerMode === "focus" ? "집중 시간" : "휴식 시간"}</span>
                                    </div>
                                </div>

                                {/* Controls */}
                                <div style={{ display: "flex", gap: 10 }}>
                                    <button onClick={() => setTimerRunning(!timerRunning)} style={{
                                        padding: "10px 28px", borderRadius: 14, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700,
                                        background: timerRunning ? "#f1f5f9" : "linear-gradient(135deg,#6366f1,#8b5cf6)",
                                        color: timerRunning ? "#475569" : "#fff",
                                    }}>{timerRunning ? "⏸ 일시정지" : timerSec < totalSec ? "▶ 계속" : "▶ 시작"}</button>
                                    <button onClick={() => resetTimer(timerMode)} style={{ padding: "10px 16px", borderRadius: 14, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#64748b" }}>↺</button>
                                </div>

                                {/* Sessions */}
                                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>오늘 완료: <span style={{ color: "#6366f1", fontWeight: 800 }}>{timerSessions}</span> 세션</div>
                            </div>
                        );
                    })()}

                    {/* ━━ Q&A TAB ━━ */}
                    {rightTab === "qa" && (
                        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <div style={{ padding: 16, borderBottom: "1px solid #f1f5f9" }}>
                                <div style={{ display: "flex", gap: 6 }}>
                                    <input value={qaInput} onChange={e => setQaInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addQuestion()}
                                        placeholder="질문을 입력하세요..."
                                        style={{ flex: 1, padding: "8px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 12, outline: "none", background: "#f8fafc" }} />
                                    <button onClick={addQuestion} style={{ padding: "8px 14px", borderRadius: 10, border: "none", background: "linear-gradient(135deg,#6366f1,#8b5cf6)", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}>등록</button>
                                </div>
                            </div>
                            <div className="hide-sb" style={{ flex: 1, overflowY: "auto", padding: "8px 16px" }}>
                                {qaList.length === 0 ? (
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#cbd5e1", gap: 8, padding: 20 }}>
                                        <MI icon="help_outline" style={{ fontSize: 32 }} />
                                        <p style={{ fontSize: 12, margin: 0, textAlign: "center" }}>궁금한 점을 질문해보세요</p>
                                    </div>
                                ) : qaList.map((item, i) => (
                                    <div key={item.ts} style={{ padding: "10px 0", borderBottom: i < qaList.length - 1 ? "1px solid #f1f5f9" : "none" }}>
                                        <p style={{ fontSize: 12, color: "#334155", margin: 0, lineHeight: 1.6 }}>Q. {item.q}</p>
                                        <span style={{ fontSize: 9, color: "#cbd5e1" }}>{new Date(item.ts).toLocaleDateString("ko")}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* ━━ BOOKMARKS TAB ━━ */}
                    {rightTab === "bookmarks" && (
                        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            {selectedUnit && activePage && (
                                <div style={{ padding: 16, borderBottom: "1px solid #f1f5f9" }}>
                                    <button onClick={addBookmark} disabled={isBookmarked} style={{
                                        width: "100%", padding: "10px", borderRadius: 12, border: isBookmarked ? "1px solid #c7d2fe" : "1px solid #e2e8f0",
                                        background: isBookmarked ? "#eef2ff" : "#fff", cursor: isBookmarked ? "default" : "pointer",
                                        fontSize: 12, fontWeight: 700, color: isBookmarked ? "#6366f1" : "#475569", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                    }}>
                                        <MI icon={isBookmarked ? "bookmark" : "bookmark_border"} style={{ fontSize: 16 }} />
                                        {isBookmarked ? "북마크됨" : "현재 페이지 북마크"}
                                    </button>
                                </div>
                            )}
                            <div className="hide-sb" style={{ flex: 1, overflowY: "auto", padding: "8px 16px" }}>
                                {bookmarks.length === 0 ? (
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#cbd5e1", gap: 8, padding: 20 }}>
                                        <MI icon="bookmark_border" style={{ fontSize: 32 }} />
                                        <p style={{ fontSize: 12, margin: 0, textAlign: "center" }}>중요한 페이지를<br />북마크해보세요</p>
                                    </div>
                                ) : bookmarks.map(bm => (
                                    <div key={bm.ts} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 0", borderBottom: "1px solid #f8fafc" }}>
                                        <button onClick={() => {
                                            const u = allUnits.find(u => u.id === bm.unitId);
                                            if (u) { selectUnit(u); const pg = u.pages?.find(p => p.id === bm.pageId); if (pg) setActivePage(pg); }
                                        }} style={{ flex: 1, textAlign: "left", border: "none", background: "transparent", cursor: "pointer", padding: 0 }}>
                                            <div style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>{bm.pageTitle}</div>
                                            <div style={{ fontSize: 9, color: "#94a3b8" }}>{bm.unitTitle}</div>
                                        </button>
                                        <button onClick={() => removeBookmark(bm.ts)} style={{ border: "none", background: "transparent", cursor: "pointer", color: "#cbd5e1", fontSize: 14 }}>✕</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </motion.aside>
        </div>
    );
}
