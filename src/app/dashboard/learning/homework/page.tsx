"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";

interface Homework {
    id: string;
    title: string;
    description: string;
    due_date: string | null;
    course_id: string | null;
    assigned_to: string | null;
    is_active: boolean;
    created_at: string;
    html_url: string | null;
    homework_type: string | null;
}

interface Submission {
    id: string;
    homework_id: string;
    user_id: string;
    content: string;
    score: number | null;
    feedback: string | null;
    submitted_at: string;
}

function formatDate(d: string): string {
    const date = new Date(d);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function timeAgo(ts: string): string {
    const d = Date.now() - new Date(ts).getTime();
    if (d < 60000) return "방금 전";
    if (d < 3600000) return `${Math.floor(d / 60000)}분 전`;
    if (d < 86400000) return `${Math.floor(d / 3600000)}시간 전`;
    return `${Math.floor(d / 86400000)}일 전`;
}

export default function HomeworkPage() {
    const { user } = useAuth();
    const supabase = useMemo(() => createClient(), []);

    const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(true);

    // Submit form
    const [activeHwId, setActiveHwId] = useState<string | null>(null);
    const [submitContent, setSubmitContent] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitMsg, setSubmitMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const [htmlHwOpen, setHtmlHwOpen] = useState<string | null>(null);
    const [htmlProgress, setHtmlProgress] = useState<{ answered: number; total: number } | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const fetchData = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            const [rHw, rSub] = await Promise.all([
                supabase.from("homework")
                    .select("id,title,description,due_date,course_id,assigned_to,is_active,created_at,html_url,homework_type")
                    .eq("is_active", true)
                    .or(`assigned_to.eq.${user.id},assigned_to.is.null`)
                    .order("created_at", { ascending: false })
                    .limit(30),
                supabase.from("homework_submissions")
                    .select("id,homework_id,user_id,content,score,feedback,submitted_at")
                    .eq("user_id", user.id)
                    .order("submitted_at", { ascending: false }),
            ]);
            setHomeworkList(rHw.data || []);
            setSubmissions(rSub.data || []);
        } catch (err) {
            if (process.env.NODE_ENV === 'development') console.error("숙제 로드 실패:", err);
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => { fetchData(); }, [fetchData]);

    // Realtime subscription for new homework
    useEffect(() => {
        if (!user) return;
        const ch = supabase.channel("student-homework")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "homework" }, (p) => {
                const hw = p.new as Homework;
                if (hw.is_active && (hw.assigned_to === user.id || hw.assigned_to === null)) {
                    setHomeworkList(prev => [hw, ...prev]);
                }
            })
            .subscribe();
        return () => { supabase.removeChannel(ch); };
    }, [user, supabase]);

    // Listen for messages from HTML homework iframe
    useEffect(() => {
        const handler = (e: MessageEvent) => {
            if (!e.data || typeof e.data.type !== 'string') return;

            if (e.data.type === 'hw-progress') {
                setHtmlProgress({ answered: e.data.answered, total: e.data.total });
            }

            if (e.data.type === 'hw-submit' && htmlHwOpen) {
                const content = JSON.stringify({
                    answers: e.data.answers,
                    answered: e.data.answered,
                    total: e.data.total,
                    studentName: e.data.studentName,
                    submittedAt: new Date().toISOString(),
                });
                handleHtmlSubmit(htmlHwOpen, content);
            }

            if (e.data.type === 'hw-close') {
                // Student closed the result modal - we can optionally close the iframe
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, [htmlHwOpen]);

    const handleSubmit = async (hwId: string) => {
        if (!user || !submitContent.trim()) return;
        setSubmitting(true);
        setSubmitMsg(null);
        try {
            const { error } = await supabase.from("homework_submissions").insert({
                homework_id: hwId,
                user_id: user.id,
                content: submitContent.trim(),
            });
            if (error) {
                if (error.code === "23505") {
                    setSubmitMsg({ ok: false, text: "이미 제출한 숙제입니다." });
                } else {
                    throw error;
                }
            } else {
                setSubmitMsg({ ok: true, text: "제출 완료!" });
                setSubmitContent("");
                setActiveHwId(null);
                fetchData();
            }
        } catch (err: unknown) {
            setSubmitMsg({ ok: false, text: `오류: ${err instanceof Error ? err.message : String(err)}` });
        } finally {
            setSubmitting(false);
        }
    };

    const handleHtmlSubmit = async (hwId: string, content: string) => {
        if (!user) return;
        try {
            const { error } = await supabase.from("homework_submissions").insert({
                homework_id: hwId,
                user_id: user.id,
                content: content,
            });
            if (error) {
                if (error.code === "23505") {
                    await supabase.from("homework_submissions")
                        .update({ content: content })
                        .eq("homework_id", hwId)
                        .eq("user_id", user.id);
                } else {
                    throw error;
                }
            }
            setHtmlHwOpen(null);
            setHtmlProgress(null);
            fetchData();
        } catch (err) {
            if (process.env.NODE_ENV === 'development') console.error("HTML 숙제 제출 실패:", err);
        }
    };

    const pending = homeworkList.filter(hw => !submissions.find(s => s.homework_id === hw.id));
    const completed = homeworkList.filter(hw => submissions.find(s => s.homework_id === hw.id));

    if (loading) {
        return (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 300 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#3b82f6", animation: "spin 1s linear infinite" }}>progress_activity</span>
            </div>
        );
    }

    return (
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", marginBottom: 6 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 26, verticalAlign: "middle", marginRight: 8, color: "#3b82f6" }}>assignment</span>
                    숙제
                </h1>
                <p style={{ fontSize: 13, color: "#94a3b8" }}>
                    미제출 {pending.length}개 · 제출완료 {completed.length}개
                </p>
            </div>

            {homeworkList.length === 0 ? (
                <div style={{
                    background: "#fff", borderRadius: 20, padding: 60, textAlign: "center",
                    border: "1px solid #e2e8f0",
                }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 56, color: "#cbd5e1", marginBottom: 12, display: "block" }}>assignment_turned_in</span>
                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#94a3b8", marginBottom: 8 }}>숙제가 없습니다</h3>
                    <p style={{ fontSize: 13, color: "#cbd5e1" }}>새로운 숙제가 나오면 여기에 표시됩니다.</p>
                </div>
            ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* 미제출 숙제 */}
                    {pending.length > 0 && (
                        <div>
                            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#ef4444", marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>pending_actions</span>
                                미제출 ({pending.length})
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {pending.map(hw => {
                                    const isOverdue = hw.due_date && new Date(hw.due_date) < new Date();
                                    const isExpanded = activeHwId === hw.id;
                                    return (
                                        <motion.div
                                            key={hw.id}
                                            layout
                                            style={{
                                                background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0",
                                                borderLeft: `4px solid ${isOverdue ? "#ef4444" : "#3b82f6"}`,
                                                overflow: "hidden",
                                            }}
                                        >
                                            <div
                                                onClick={() => {
                                                    if (hw.homework_type === 'html' && hw.html_url) {
                                                        setHtmlHwOpen(hw.id);
                                                    } else {
                                                        setActiveHwId(isExpanded ? null : hw.id);
                                                        setSubmitContent("");
                                                        setSubmitMsg(null);
                                                    }
                                                }}
                                                style={{ padding: "16px 20px", cursor: "pointer" }}
                                            >
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                                    <div style={{ flex: 1 }}>
                                                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{hw.title}</h3>
                                                        {hw.description && (
                                                            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                                                                {hw.description.length > 120 ? hw.description.slice(0, 120) + "..." : hw.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span style={{
                                                        fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20, whiteSpace: "nowrap",
                                                        background: isOverdue ? "rgba(239,68,68,0.1)" : "rgba(59,130,246,0.1)",
                                                        color: isOverdue ? "#ef4444" : "#3b82f6",
                                                    }}>
                                                        {isOverdue ? "기한초과" : "미제출"}
                                                    </span>
                                                </div>
                                                <div style={{ display: "flex", gap: 16, fontSize: 11, color: "#94a3b8" }}>
                                                    {hw.due_date && (
                                                        <span>
                                                            <span className="material-symbols-outlined" style={{ fontSize: 13, verticalAlign: "middle", marginRight: 3 }}>event</span>
                                                            마감: {formatDate(hw.due_date)}
                                                        </span>
                                                    )}
                                                    <span>
                                                        <span className="material-symbols-outlined" style={{ fontSize: 13, verticalAlign: "middle", marginRight: 3 }}>schedule</span>
                                                        {timeAgo(hw.created_at)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* HTML 숙제: 열기 버튼 */}
                                            {hw.homework_type === 'html' && hw.html_url && !isExpanded && (
                                                <div style={{ padding: "0 20px 16px" }}>
                                                    <motion.button
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        onClick={(e) => { e.stopPropagation(); setHtmlHwOpen(hw.id); }}
                                                        style={{
                                                            width: "100%", padding: "14px 20px", borderRadius: 12, border: "none",
                                                            background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                                                            color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer",
                                                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                                        }}
                                                    >
                                                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>play_arrow</span>
                                                        숙제 풀기
                                                    </motion.button>
                                                </div>
                                            )}

                                            {/* 제출 폼 */}
                                            <AnimatePresence>
                                                {isExpanded && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        style={{ overflow: "hidden" }}
                                                    >
                                                        <div style={{ padding: "0 20px 20px", borderTop: "1px solid #f1f5f9" }}>
                                                            <div style={{ paddingTop: 16 }}>
                                                                <label style={{ fontSize: 12, fontWeight: 600, color: "#334155", display: "block", marginBottom: 8 }}>
                                                                    답안 작성
                                                                </label>
                                                                <textarea
                                                                    value={submitContent}
                                                                    onChange={e => setSubmitContent(e.target.value)}
                                                                    placeholder="숙제 답안을 입력하세요..."
                                                                    style={{
                                                                        width: "100%", minHeight: 120, padding: "12px 14px",
                                                                        borderRadius: 12, border: "2px solid #e2e8f0",
                                                                        fontSize: 14, outline: "none", resize: "vertical",
                                                                        boxSizing: "border-box", lineHeight: 1.6,
                                                                        fontFamily: "inherit",
                                                                    }}
                                                                    onFocus={e => e.target.style.borderColor = "#3b82f6"}
                                                                    onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                                                                />
                                                                {submitMsg && (
                                                                    <div style={{
                                                                        padding: "8px 14px", borderRadius: 10, fontSize: 12, marginTop: 8,
                                                                        background: submitMsg.ok ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)",
                                                                        color: submitMsg.ok ? "#059669" : "#dc2626", fontWeight: 600,
                                                                    }}>{submitMsg.text}</div>
                                                                )}
                                                                <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 12 }}>
                                                                    <button
                                                                        onClick={() => { setActiveHwId(null); setSubmitContent(""); setSubmitMsg(null); }}
                                                                        style={{
                                                                            padding: "10px 20px", borderRadius: 10, border: "1px solid #e2e8f0",
                                                                            background: "#fff", color: "#64748b", fontSize: 13, fontWeight: 600, cursor: "pointer",
                                                                        }}
                                                                    >취소</button>
                                                                    <motion.button
                                                                        whileHover={{ scale: 1.02 }}
                                                                        whileTap={{ scale: 0.98 }}
                                                                        onClick={() => handleSubmit(hw.id)}
                                                                        disabled={submitting || !submitContent.trim()}
                                                                        style={{
                                                                            padding: "10px 24px", borderRadius: 10, border: "none",
                                                                            background: submitContent.trim() ? "#2563eb" : "#e2e8f0",
                                                                            color: submitContent.trim() ? "#fff" : "#94a3b8",
                                                                            fontSize: 13, fontWeight: 700, cursor: submitContent.trim() ? "pointer" : "default",
                                                                        }}
                                                                    >
                                                                        {submitting ? "제출 중..." : "제출하기"}
                                                                    </motion.button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* 제출 완료 */}
                    {completed.length > 0 && (
                        <div>
                            <h2 style={{ fontSize: 14, fontWeight: 700, color: "#22c55e", marginBottom: 10, marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>task_alt</span>
                                제출 완료 ({completed.length})
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {completed.map(hw => {
                                    const sub = submissions.find(s => s.homework_id === hw.id)!;
                                    const isGraded = sub.score !== null;
                                    return (
                                        <div key={hw.id} style={{
                                            background: "#fff", borderRadius: 16, padding: "16px 20px",
                                            border: "1px solid #e2e8f0", borderLeft: "4px solid #22c55e",
                                        }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                                                <div>
                                                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{hw.title}</h3>
                                                    <span style={{ fontSize: 11, color: "#94a3b8" }}>제출: {timeAgo(sub.submitted_at)}</span>
                                                </div>
                                                <span style={{
                                                    fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 20,
                                                    background: isGraded ? "rgba(34,197,94,0.1)" : "rgba(245,158,11,0.1)",
                                                    color: isGraded ? "#22c55e" : "#f59e0b",
                                                }}>
                                                    {isGraded ? `${sub.score}점` : "채점 대기"}
                                                </span>
                                            </div>

                                            {/* 내 답안 미리보기 */}
                                            <div style={{
                                                padding: "10px 14px", borderRadius: 10, background: "#f8fafc",
                                                fontSize: 12, color: "#475569", lineHeight: 1.6,
                                                whiteSpace: "pre-wrap", maxHeight: 80, overflow: "hidden",
                                            }}>
                                                {sub.content}
                                            </div>

                                            {/* 채점 결과 */}
                                            {isGraded && (
                                                <div style={{
                                                    marginTop: 10, padding: "10px 14px", borderRadius: 10,
                                                    background: "#f0fdf4", display: "flex", alignItems: "center", gap: 8,
                                                }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#22c55e" }}>check_circle</span>
                                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>{sub.score}점</span>
                                                    {sub.feedback && (
                                                        <span style={{ fontSize: 12, color: "#64748b" }}> — {sub.feedback}</span>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* HTML 숙제 전체화면 오버레이 */}
            <AnimatePresence>
                {htmlHwOpen && (() => {
                    const hw = homeworkList.find(h => h.id === htmlHwOpen);
                    if (!hw?.html_url) return null;
                    return (
                        <motion.div
                            key="html-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: "fixed", inset: 0, zIndex: 9999,
                                background: "rgba(0,0,0,0.85)",
                                display: "flex", flexDirection: "column",
                            }}
                        >
                            {/* 상단 바 */}
                            <div style={{
                                display: "flex", alignItems: "center", justifyContent: "space-between",
                                padding: "12px 24px", background: "#0f172a",
                                borderBottom: "1px solid rgba(255,255,255,0.1)",
                            }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                    <span style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{hw.title}</span>
                                    {hw.due_date && (
                                        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                                            마감: {hw.due_date}
                                        </span>
                                    )}
                                    {htmlProgress && (
                                        <span style={{
                                            fontSize: 12, fontWeight: 700,
                                            padding: "4px 12px", borderRadius: 20,
                                            background: htmlProgress.answered === htmlProgress.total
                                                ? "rgba(34,197,94,0.2)" : "rgba(59,130,246,0.2)",
                                            color: htmlProgress.answered === htmlProgress.total
                                                ? "#4ade80" : "#60a5fa",
                                        }}>
                                            {htmlProgress.answered} / {htmlProgress.total} 완료
                                        </span>
                                    )}
                                </div>
                                <button
                                    onClick={() => { setHtmlHwOpen(null); setHtmlProgress(null); }}
                                    style={{
                                        padding: "8px 16px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.2)",
                                        background: "transparent", color: "#fff", fontSize: 13, fontWeight: 600,
                                        cursor: "pointer", display: "flex", alignItems: "center", gap: 6,
                                    }}
                                >
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>close</span>
                                    닫기
                                </button>
                            </div>
                            {/* iframe */}
                            <iframe
                                ref={iframeRef}
                                src={hw.html_url}
                                style={{ flex: 1, border: "none", width: "100%", background: "#000" }}
                                title={hw.title}
                                onLoad={() => {
                                    if (iframeRef.current?.contentWindow && user) {
                                        setTimeout(() => {
                                            iframeRef.current?.contentWindow?.postMessage({
                                                type: 'hw-init',
                                                studentName: user.name || user.email || '',
                                            }, '*');
                                        }, 500);
                                    }
                                }}
                            />
                        </motion.div>
                    );
                })()}
            </AnimatePresence>
        </div>
    );
}
