"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { COURSES } from "@/data/courses";
import { CourseIcon } from "@/components/icons/CourseIcons";
import { createClient } from "@/lib/supabase";

/* ═══════════════════════════════════════
   선생님 관리 패널 — Supabase 연동
   /teacher/admin

   4탭: 학생 관리 / 학생 추가 / 콘텐츠 관리 / 알림 발송
   ═══════════════════════════════════════ */

interface Student {
    id: string;
    name: string;
    birthday: string;
    grade: string | null;
    class: string | null;
    avatar: string | null;
    created_at: string;
}

const STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
    online: { bg: "#ECFDF5", text: "#059669", label: "접속 중" },
    offline: { bg: "#F1F5F9", text: "#64748B", label: "오프라인" },
    inactive: { bg: "#FEF2F2", text: "#DC2626", label: "비활성" },
};

export default function TeacherAdmin() {
    const [activeTab, setActiveTab] = useState<"students" | "add" | "homework" | "content" | "notify" | "feedback" | "monitor">("students");
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [notifyMsg, setNotifyMsg] = useState("");
    const [notifySent, setNotifySent] = useState(false);
    const [editingUnit, setEditingUnit] = useState<string | null>(null);

    // 학생 추가 폼
    const [newName, setNewName] = useState("");
    const [newYear, setNewYear] = useState("");
    const [newMonth, setNewMonth] = useState("");
    const [newDay, setNewDay] = useState("");
    const [newGrade, setNewGrade] = useState("");
    const [newClass, setNewClass] = useState("");
    const [newAvatar, setNewAvatar] = useState("🧒");
    const [addMsg, setAddMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const [addLoading, setAddLoading] = useState(false);

    // 삭제 확인
    const [deleteId, setDeleteId] = useState<string | null>(null);

    // 피드백
    const [fbStudentId, setFbStudentId] = useState("");
    const [fbCourse, setFbCourse] = useState("");
    const [fbText, setFbText] = useState("");
    const [fbSending, setFbSending] = useState(false);
    const [fbHistory, setFbHistory] = useState<{id:string;parent_name:string;content:string;course_id:string;created_at:string;student_id:string}[]>([]);
    const [fbMsg, setFbMsg] = useState<{ok:boolean;text:string}|null>(null);
    const [profiles, setProfiles] = useState<{id:string;name:string}[]>([]);

    // 숙제
    const [hwTitle, setHwTitle] = useState("");
    const [hwDesc, setHwDesc] = useState("");
    const [hwDueDate, setHwDueDate] = useState("");
    const [hwCourse, setHwCourse] = useState("");
    const [hwSelectedStudents, setHwSelectedStudents] = useState<string[]>([]);
    const [hwSelectAll, setHwSelectAll] = useState(true);
    const [hwSending, setHwSending] = useState(false);
    const [hwMsg, setHwMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const [hwList, setHwList] = useState<{ id: string; title: string; description: string; due_date: string; course_id: string; assigned_to: string | null; is_active: boolean; created_at: string }[]>([]);
    const [hwSubs, setHwSubs] = useState<{ id: string; homework_id: string; user_id: string; content: string; score: number | null; feedback: string | null; submitted_at: string }[]>([]);
    const [gradingId, setGradingId] = useState<string | null>(null);
    const [gradeScore, setGradeScore] = useState("");
    const [gradeFeedback, setGradeFeedback] = useState("");
    const [gradingSaving, setGradingSaving] = useState(false);

    // 실시간 모니터
    interface PresenceRow { user_id: string; student_name: string; course_id: string | null; course_title: string | null; unit_id: string | null; unit_title: string | null; page_id: string | null; page_title: string | null; page_url: string | null; is_online: boolean; last_heartbeat: string; started_at: string; }
    const [presenceList, setPresenceList] = useState<PresenceRow[]>([]);

    const [authed, setAuthed] = useState(false);

    // Auth check — Supabase 세션 확인
    useEffect(() => {
        (async () => {
            try {
                const sb = createClient();
                const { data: { session } } = await sb.auth.getSession();
                if (!session) {
                    window.location.href = "/teacher/login";
                    return;
                }
                setAuthed(true);
            } catch {
                window.location.href = "/teacher/login";
            }
        })();
    }, []);

    /* ── Supabase에서 학생 목록 불러오기 ── */
    const fetchStudents = useCallback(async () => {
        setLoading(true);
        try {
            const sb = createClient();
            const { data, error } = await sb
                .from("students")
                .select("*")
                .order("created_at", { ascending: false });
            if (error) throw error;
            setStudents((data || []) as Student[]);
        } catch (err) {
            if (process.env.NODE_ENV === 'development') console.error("학생 목록 로드 실패:", err);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchStudents(); }, [fetchStudents]);

    /* ── 학생 프로필 목록 (피드백 드롭다운용) ── */
    useEffect(() => {
        (async () => {
            const sb = createClient();
            const { data } = await sb.from("profiles").select("id,name").order("name");
            if (data) setProfiles(data);
        })();
    }, []);

    /* ── 피드백 목록 불러오기 ── */
    const fetchFeedbacks = useCallback(async (studentId?: string) => {
        const sb = createClient();
        let q = sb.from("parent_feedback").select("*").order("created_at", { ascending: false }).limit(50);
        if (studentId) q = q.eq("student_id", studentId);
        const { data } = await q;
        setFbHistory(data || []);
    }, []);

    useEffect(() => { if (activeTab === "feedback") fetchFeedbacks(fbStudentId || undefined); }, [activeTab, fbStudentId, fetchFeedbacks]);

    /* ── 피드백 보내기 ── */
    const sendTeacherFeedback = async () => {
        if (!fbText.trim() || !fbStudentId) return;
        setFbSending(true); setFbMsg(null);
        try {
            const sb = createClient();
            const { error } = await sb.from("parent_feedback").insert({
                parent_name: "선생님",
                student_id: fbStudentId,
                content: fbText.trim(),
                course_id: fbCourse || null,
            });
            if (error) throw error;
            setFbMsg({ ok: true, text: "피드백이 전송되었습니다!" });
            setFbText("");
            fetchFeedbacks(fbStudentId);
        } catch (err: unknown) {
            setFbMsg({ ok: false, text: `오류: ${err instanceof Error ? err.message : String(err)}` });
        } finally { setFbSending(false); }
    };

    /* ── 숙제 목록 + 제출물 불러오기 ── */
    const fetchHomework = useCallback(async () => {
        const sb = createClient();
        const [rHw, rSubs] = await Promise.all([
            sb.from("homework").select("id,title,description,due_date,course_id,assigned_to,is_active,created_at")
                .eq("is_active", true).order("created_at", { ascending: false }).limit(50),
            sb.from("homework_submissions").select("id,homework_id,user_id,content,score,feedback,submitted_at")
                .order("submitted_at", { ascending: false }).limit(200),
        ]);
        setHwList(rHw.data || []);
        setHwSubs(rSubs.data || []);
    }, []);

    useEffect(() => { if (activeTab === "homework") fetchHomework(); }, [activeTab, fetchHomework]);

    // ── 실시간 모니터 ──
    useEffect(() => {
        if (activeTab !== "monitor") return;
        const sb = createClient();
        sb.from("student_presence").select("*").order("last_heartbeat", { ascending: false })
            .then(({ data }) => { if (data) setPresenceList(data as PresenceRow[]); });

        const ch = sb.channel("teacher-presence")
            .on("postgres_changes", { event: "*", schema: "public", table: "student_presence" }, (payload) => {
                const row = payload.new as PresenceRow;
                if (!row?.user_id) return;
                setPresenceList(prev => {
                    const idx = prev.findIndex(p => p.user_id === row.user_id);
                    if (idx >= 0) { const next = [...prev]; next[idx] = row; return next; }
                    return [row, ...prev];
                });
            })
            .subscribe();

        return () => { sb.removeChannel(ch); };
    }, [activeTab]);

    /* ── 숙제 출제 ── */
    const createHomework = async () => {
        if (!hwTitle.trim()) { setHwMsg({ ok: false, text: "숙제 제목을 입력해주세요" }); return; }
        if (!hwSelectAll && hwSelectedStudents.length === 0) { setHwMsg({ ok: false, text: "학생을 선택해주세요" }); return; }

        setHwSending(true); setHwMsg(null);
        try {
            const sb = createClient();
            if (hwSelectAll) {
                // 전체 학생 대상
                const { error } = await sb.from("homework").insert({
                    title: hwTitle.trim(),
                    description: hwDesc.trim(),
                    due_date: hwDueDate || null,
                    course_id: hwCourse || null,
                    assigned_to: null,
                });
                if (error) throw error;
            } else {
                // 선택한 학생별로 각각 생성
                const rows = hwSelectedStudents.map(sid => ({
                    title: hwTitle.trim(),
                    description: hwDesc.trim(),
                    due_date: hwDueDate || null,
                    course_id: hwCourse || null,
                    assigned_to: sid,
                }));
                const { error } = await sb.from("homework").insert(rows);
                if (error) throw error;
            }

            const count = hwSelectAll ? "전체 학생" : `${hwSelectedStudents.length}명`;
            setHwMsg({ ok: true, text: `"${hwTitle.trim()}" 숙제가 ${count}에게 출제되었습니다!` });
            setHwTitle(""); setHwDesc(""); setHwDueDate(""); setHwCourse("");
            setHwSelectedStudents([]); setHwSelectAll(true);
            fetchHomework();
        } catch (err: unknown) {
            setHwMsg({ ok: false, text: `오류: ${err instanceof Error ? err.message : String(err)}` });
        } finally { setHwSending(false); }
    };

    /* ── 숙제 삭제 (비활성화) ── */
    const deactivateHomework = async (id: string) => {
        const sb = createClient();
        await sb.from("homework").update({ is_active: false }).eq("id", id);
        fetchHomework();
    };

    /* ── 채점하기 ── */
    const gradeSubmission = async (subId: string) => {
        if (!gradeScore.trim()) return;
        setGradingSaving(true);
        try {
            const sb = createClient();
            const { error } = await sb.from("homework_submissions").update({
                score: parseInt(gradeScore, 10),
                feedback: gradeFeedback.trim() || null,
            }).eq("id", subId);
            if (error) throw error;
            setGradingId(null);
            setGradeScore("");
            setGradeFeedback("");
            fetchHomework();
        } catch (err) {
            if (process.env.NODE_ENV === 'development') console.error("채점 실패:", err);
        } finally { setGradingSaving(false); }
    };

    /* ── 학생 추가 ── */
    const handleAddStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmedName = newName.trim();
        if (!trimmedName) { setAddMsg({ ok: false, text: "이름을 입력해주세요" }); return; }
        if (!newYear || !newMonth || !newDay) { setAddMsg({ ok: false, text: "생년월일을 모두 선택해주세요" }); return; }

        const birthday = `${newYear}-${newMonth.padStart(2, "0")}-${newDay.padStart(2, "0")}`;
        setAddLoading(true); setAddMsg(null);

        try {
            const sb = createClient();
            const { error } = await sb.from("students").insert({
                name: trimmedName,
                birthday,
                grade: newGrade || null,
                class: newClass || null,
                avatar: newAvatar || "🧒",
            });
            if (error) throw error;

            setAddMsg({ ok: true, text: `"${trimmedName}" 학생이 추가되었습니다!` });
            setNewName(""); setNewYear(""); setNewMonth(""); setNewDay("");
            setNewGrade(""); setNewClass(""); setNewAvatar("🧒");
            fetchStudents();
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : String(err);
            setAddMsg({ ok: false, text: `오류: ${message}` });
        } finally { setAddLoading(false); }
    };

    /* ── 학생 삭제 ── */
    const handleDelete = async (id: string) => {
        try {
            const sb = createClient();
            const { error } = await sb.from("students").delete().eq("id", id);
            if (error) throw error;
            setDeleteId(null);
            fetchStudents();
        } catch (err) {
            if (process.env.NODE_ENV === 'development') console.error("삭제 실패:", err);
        }
    };

    const handleSendNotify = () => {
        if (!notifyMsg.trim()) return;
        setNotifySent(true);
        setTimeout(() => { setNotifySent(false); setNotifyMsg(""); }, 3000);
    };

    /* ── 연도/월/일 옵션 ── */
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => String(currentYear - i));
    const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
    const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

    const formatBirthday = (d: string) => {
        const date = new Date(d);
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}`;
    };

    if (!authed) {
        return (
            <div style={{ minHeight: "100vh", background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12 }}>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#3b82f6", animation: "spin 1s linear infinite" }}>progress_activity</span>
                <span style={{ fontSize: 14, color: "#94a3b8", fontWeight: 500 }}>인증 확인 중...</span>
                <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", background: "#F8FAFC" }}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />

            {/* Top bar */}
            <div style={{
                background: "#fff", borderBottom: "1px solid #e2e8f0",
                padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>← 홈</Link>
                    <h1 style={{ fontSize: 18, fontWeight: 800, color: "#172554" }}>선생님 관리 패널</h1>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>학생 {students.length}명</span>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399" }} />
                </div>
            </div>

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
                {/* Tab navigation */}
                <div style={{ display: "flex", gap: 4, marginBottom: 24, background: "#fff", borderRadius: 12, padding: 4, border: "1px solid #e2e8f0" }}>
                    {([
                        { id: "students" as const, label: "학생 목록" },
                        { id: "add" as const, label: "학생 추가" },
                        { id: "homework" as const, label: "숙제 출제" },
                        { id: "feedback" as const, label: "피드백" },
                        { id: "monitor" as const, label: "실시간 모니터" },
                        { id: "content" as const, label: "콘텐츠" },
                        { id: "notify" as const, label: "알림" },
                    ]).map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                            flex: 1, padding: "10px 16px", borderRadius: 10, border: "none", cursor: "pointer",
                            background: activeTab === tab.id ? "#2563eb" : "transparent",
                            color: activeTab === tab.id ? "#fff" : "#64748b",
                            fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                        }}>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* ═══ Students List Tab ═══ */}
                {activeTab === "students" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {/* Summary cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
                            {[
                                { label: "전체 학생", value: students.length, color: "#2563eb" },
                                { label: "이번 달 추가", value: students.filter(s => new Date(s.created_at).getMonth() === new Date().getMonth()).length, color: "#059669" },
                                { label: "학년 분포", value: [...new Set(students.map(s => s.grade).filter(Boolean))].length + "개", color: "#F59E0B" },
                            ].map(s => (
                                <div key={s.label} style={{
                                    background: "#fff", borderRadius: 14, padding: "16px", border: "1px solid #e2e8f0",
                                }}>
                                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>{s.label}</div>
                                    <div style={{ fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</div>
                                </div>
                            ))}
                        </div>

                        {/* Student list */}
                        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                            <div style={{
                                display: "grid", gridTemplateColumns: "40px 2fr 1.5fr 1fr 1fr 100px",
                                padding: "12px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0",
                                fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const,
                            }}>
                                <div></div><div>이름</div><div>생년월일</div><div>학년</div><div>반</div><div>관리</div>
                            </div>

                            {loading ? (
                                <div style={{ padding: 40, textAlign: "center", color: "#94a3b8", fontSize: 14 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 24, animation: "spin 1s linear infinite", display: "block", marginBottom: 8 }}>progress_activity</span>
                                    불러오는 중...
                                </div>
                            ) : students.length === 0 ? (
                                <div style={{ padding: 40, textAlign: "center", color: "#94a3b8", fontSize: 14 }}>
                                    학생이 없습니다. &quot;학생 추가&quot; 탭에서 추가해주세요.
                                </div>
                            ) : (
                                students.map(student => (
                                    <div key={student.id} style={{
                                        display: "grid", gridTemplateColumns: "40px 2fr 1.5fr 1fr 1fr 100px",
                                        padding: "14px 20px", borderBottom: "1px solid #f1f5f9",
                                        alignItems: "center",
                                    }}>
                                        <div style={{ fontSize: 20 }}>{student.avatar || "🧒"}</div>
                                        <div style={{ fontWeight: 700, fontSize: 14, color: "#172554" }}>{student.name}</div>
                                        <div style={{ fontSize: 13, color: "#64748b" }}>{formatBirthday(student.birthday)}</div>
                                        <div style={{ fontSize: 13, color: "#6366F1", fontWeight: 600 }}>{student.grade || "—"}</div>
                                        <div style={{ fontSize: 13, color: "#64748b" }}>{student.class || "—"}</div>
                                        <div>
                                            {deleteId === student.id ? (
                                                <div style={{ display: "flex", gap: 4 }}>
                                                    <button onClick={() => handleDelete(student.id)} style={{
                                                        padding: "4px 8px", borderRadius: 6, border: "none",
                                                        background: "#EF4444", color: "#fff", fontSize: 10,
                                                        fontWeight: 700, cursor: "pointer",
                                                    }}>확인</button>
                                                    <button onClick={() => setDeleteId(null)} style={{
                                                        padding: "4px 8px", borderRadius: 6, border: "1px solid #e2e8f0",
                                                        background: "#fff", color: "#64748b", fontSize: 10,
                                                        fontWeight: 600, cursor: "pointer",
                                                    }}>취소</button>
                                                </div>
                                            ) : (
                                                <button onClick={() => setDeleteId(student.id)} style={{
                                                    padding: "4px 10px", borderRadius: 6, border: "1px solid #fee2e2",
                                                    background: "#fff", fontSize: 10, fontWeight: 600,
                                                    color: "#EF4444", cursor: "pointer",
                                                }}>
                                                    삭제
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                )}

                {/* ═══ Add Student Tab ═══ */}
                {activeTab === "add" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{
                            background: "#fff", borderRadius: 20, padding: "36px",
                            border: "1px solid #e2e8f0", maxWidth: 520, margin: "0 auto",
                        }}>
                            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#172554", marginBottom: 8, textAlign: "center" }}>
                                새 학생 추가
                            </h3>
                            <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", marginBottom: 28 }}>
                                학생 정보를 입력하면 로그인 계정이 자동 생성됩니다
                            </p>

                            <form onSubmit={handleAddStudent} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                {/* 이름 */}
                                <div>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                                        이름 <span style={{ color: "#EF4444" }}>*</span>
                                    </label>
                                    <input
                                        type="text" value={newName} onChange={e => setNewName(e.target.value)}
                                        required placeholder="홍길동"
                                        style={{
                                            display: "block", width: "100%", padding: "13px 16px",
                                            border: "2px solid #e5e7eb", borderRadius: 14,
                                            fontSize: 15, outline: "none", boxSizing: "border-box",
                                        }}
                                        onFocus={e => e.target.style.borderColor = "#3b82f6"}
                                        onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                                    />
                                </div>

                                {/* 생년월일 */}
                                <div>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                                        생년월일 <span style={{ color: "#EF4444" }}>*</span>
                                    </label>
                                    <div style={{ display: "flex", gap: 8 }}>
                                        {[
                                            { val: newYear, set: setNewYear, opts: years, unit: "년", placeholder: "년" },
                                            { val: newMonth, set: setNewMonth, opts: months, unit: "월", placeholder: "월" },
                                            { val: newDay, set: setNewDay, opts: days, unit: "일", placeholder: "일" },
                                        ].map(({ val, set, opts, unit, placeholder }) => (
                                            <select key={unit} value={val} onChange={e => set(e.target.value)} style={{
                                                flex: 1, padding: "13px 10px", border: "2px solid #e5e7eb",
                                                borderRadius: 14, fontSize: 14, outline: "none",
                                                boxSizing: "border-box", cursor: "pointer",
                                            }}>
                                                <option value="">{placeholder}</option>
                                                {opts.map(o => <option key={o} value={o}>{o}{unit}</option>)}
                                            </select>
                                        ))}
                                    </div>
                                </div>

                                {/* 학년 + 반 */}
                                <div style={{ display: "flex", gap: 12 }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                                            학년
                                        </label>
                                        <select value={newGrade} onChange={e => setNewGrade(e.target.value)} style={{
                                            display: "block", width: "100%", padding: "13px 10px",
                                            border: "2px solid #e5e7eb", borderRadius: 14,
                                            fontSize: 14, outline: "none", cursor: "pointer",
                                        }}>
                                            <option value="">선택</option>
                                            {["초1", "초2", "초3", "초4", "초5", "초6", "중1", "중2", "중3"].map(g => (
                                                <option key={g} value={g}>{g}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                                            반
                                        </label>
                                        <select value={newClass} onChange={e => setNewClass(e.target.value)} style={{
                                            display: "block", width: "100%", padding: "13px 10px",
                                            border: "2px solid #e5e7eb", borderRadius: 14,
                                            fontSize: 14, outline: "none", cursor: "pointer",
                                        }}>
                                            <option value="">선택</option>
                                            {["A반", "B반", "C반", "D반"].map(c => (
                                                <option key={c} value={c}>{c}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* 아바타 선택 */}
                                <div>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                                        아바타
                                    </label>
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {["🧒", "👦", "👧", "🧑", "👶", "🐱", "🐶", "🦊", "🐰", "🐻", "🐼", "🦁"].map(emoji => (
                                            <button
                                                key={emoji} type="button"
                                                onClick={() => setNewAvatar(emoji)}
                                                style={{
                                                    width: 44, height: 44, borderRadius: 12, border: newAvatar === emoji ? "2px solid #3b82f6" : "2px solid #e5e7eb",
                                                    background: newAvatar === emoji ? "rgba(99,102,241,0.08)" : "#fff",
                                                    fontSize: 22, cursor: "pointer", transition: "all 0.15s",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                }}
                                            >
                                                {emoji}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* 메시지 */}
                                {addMsg && (
                                    <div style={{
                                        padding: "12px 16px", borderRadius: 14, fontSize: 13, fontWeight: 500,
                                        background: addMsg.ok ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)",
                                        color: addMsg.ok ? "#059669" : "#dc2626",
                                        border: `1px solid ${addMsg.ok ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)"}`,
                                    }}>
                                        {addMsg.text}
                                    </div>
                                )}

                                {/* 추가 버튼 */}
                                <button
                                    type="submit"
                                    disabled={addLoading}
                                    style={{
                                        padding: "15px 24px", borderRadius: 14, border: "none",
                                        background: "#2563eb", color: "#fff",
                                        fontWeight: 700, fontSize: 15, cursor: addLoading ? "not-allowed" : "pointer",
                                        opacity: addLoading ? 0.7 : 1, width: "100%",
                                    }}
                                >
                                    {addLoading ? "추가 중..." : "학생 추가하기"}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}

                {/* ═══ Homework Tab ═══ */}
                {activeTab === "homework" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            {/* 숙제 출제 폼 */}
                            <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0" }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#172554", marginBottom: 16 }}>숙제 출제</h3>

                                <input
                                    value={hwTitle} onChange={e => setHwTitle(e.target.value)}
                                    placeholder="숙제 제목 *"
                                    style={{ width: "100%", padding: "12px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", marginBottom: 10, boxSizing: "border-box" }}
                                />
                                <textarea
                                    value={hwDesc} onChange={e => setHwDesc(e.target.value)}
                                    placeholder="숙제 설명 (선택사항)"
                                    style={{ width: "100%", minHeight: 80, padding: "12px 14px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13, outline: "none", resize: "vertical", marginBottom: 10, boxSizing: "border-box" }}
                                />
                                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>마감일</label>
                                        <input
                                            type="date" value={hwDueDate} onChange={e => setHwDueDate(e.target.value)}
                                            style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                                        />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 4 }}>과목</label>
                                        <select value={hwCourse} onChange={e => setHwCourse(e.target.value)} style={{
                                            width: "100%", padding: "10px 12px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13, outline: "none",
                                        }}>
                                            <option value="">전체 / 일반</option>
                                            {COURSES.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                        </select>
                                    </div>
                                </div>

                                {/* 학생 선택 */}
                                <div style={{ padding: 14, borderRadius: 12, background: "#f8fafc", marginBottom: 12 }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: "#172554" }}>대상 학생</span>
                                        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#2563eb", fontWeight: 600, cursor: "pointer" }}>
                                            <input type="checkbox" checked={hwSelectAll} onChange={e => {
                                                setHwSelectAll(e.target.checked);
                                                if (e.target.checked) setHwSelectedStudents([]);
                                            }} />
                                            전체 학생
                                        </label>
                                    </div>
                                    {!hwSelectAll && (
                                        <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 200, overflowY: "auto" }}>
                                            {profiles.length === 0 ? (
                                                <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", padding: 12 }}>등록된 학생이 없습니다</p>
                                            ) : profiles.map(p => (
                                                <label key={p.id} style={{
                                                    display: "flex", alignItems: "center", gap: 8,
                                                    padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                                                    background: hwSelectedStudents.includes(p.id) ? "rgba(37,99,235,0.06)" : "transparent",
                                                    border: hwSelectedStudents.includes(p.id) ? "1px solid rgba(37,99,235,0.2)" : "1px solid transparent",
                                                }}>
                                                    <input
                                                        type="checkbox"
                                                        checked={hwSelectedStudents.includes(p.id)}
                                                        onChange={e => {
                                                            if (e.target.checked) setHwSelectedStudents(prev => [...prev, p.id]);
                                                            else setHwSelectedStudents(prev => prev.filter(id => id !== p.id));
                                                        }}
                                                    />
                                                    <span style={{ fontSize: 13, fontWeight: 600, color: "#334155" }}>{p.name}</span>
                                                </label>
                                            ))}
                                            {!hwSelectAll && hwSelectedStudents.length > 0 && (
                                                <div style={{ fontSize: 11, color: "#2563eb", fontWeight: 600, padding: "4px 10px" }}>
                                                    {hwSelectedStudents.length}명 선택됨
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {hwMsg && (
                                    <div style={{
                                        padding: "10px 14px", borderRadius: 10, fontSize: 13, marginBottom: 10,
                                        background: hwMsg.ok ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)",
                                        color: hwMsg.ok ? "#059669" : "#dc2626",
                                    }}>{hwMsg.text}</div>
                                )}

                                <button onClick={createHomework} disabled={hwSending || !hwTitle.trim()} style={{
                                    width: "100%", padding: "12px", borderRadius: 12, border: "none",
                                    background: hwTitle.trim() ? "#2563eb" : "#e2e8f0",
                                    color: hwTitle.trim() ? "#fff" : "#94a3b8",
                                    fontWeight: 700, fontSize: 14, cursor: hwTitle.trim() ? "pointer" : "default",
                                }}>
                                    {hwSending ? "출제 중..." : "숙제 출제하기"}
                                </button>
                            </div>

                            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                {/* 숙제 목록 */}
                                <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0" }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#172554", marginBottom: 16 }}>출제된 숙제 ({hwList.length}개)</h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 280, overflowY: "auto" }}>
                                        {hwList.length === 0 ? (
                                            <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: 24 }}>출제된 숙제가 없습니다</p>
                                        ) : hwList.map(hw => {
                                            const studentName = hw.assigned_to
                                                ? profiles.find(p => p.id === hw.assigned_to)?.name || "알 수 없음"
                                                : "전체 학생";
                                            const isOverdue = hw.due_date && new Date(hw.due_date) < new Date();
                                            const subCount = hwSubs.filter(s => s.homework_id === hw.id).length;
                                            const ungradedCount = hwSubs.filter(s => s.homework_id === hw.id && s.score === null).length;
                                            return (
                                                <div key={hw.id} style={{
                                                    padding: "12px 14px", borderRadius: 12, background: "#f8fafc",
                                                    borderLeft: `3px solid ${isOverdue ? "#f59e0b" : "#2563eb"}`,
                                                }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontSize: 14, fontWeight: 700, color: "#172554", marginBottom: 4 }}>{hw.title}</div>
                                                            <div style={{ display: "flex", gap: 10, fontSize: 11, color: "#94a3b8", flexWrap: "wrap" }}>
                                                                <span>{studentName}</span>
                                                                {hw.due_date && <span>{hw.due_date}</span>}
                                                                <span>제출 {subCount}건</span>
                                                                {ungradedCount > 0 && <span style={{ color: "#f59e0b", fontWeight: 700 }}>미채점 {ungradedCount}건</span>}
                                                            </div>
                                                        </div>
                                                        <button onClick={() => deactivateHomework(hw.id)} style={{
                                                            padding: "4px 10px", borderRadius: 6, border: "1px solid #fee2e2",
                                                            background: "#fff", fontSize: 10, fontWeight: 600,
                                                            color: "#EF4444", cursor: "pointer", flexShrink: 0,
                                                        }}>삭제</button>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* 채점 패널 */}
                                <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0" }}>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#172554", marginBottom: 16 }}>
                                        제출물 채점
                                        {hwSubs.filter(s => s.score === null).length > 0 && (
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", marginLeft: 8 }}>
                                                (미채점 {hwSubs.filter(s => s.score === null).length}건)
                                            </span>
                                        )}
                                    </h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 400, overflowY: "auto" }}>
                                        {hwSubs.length === 0 ? (
                                            <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: 24 }}>제출된 숙제가 없습니다</p>
                                        ) : hwSubs.map(sub => {
                                            const hw = hwList.find(h => h.id === sub.homework_id);
                                            const studentName = profiles.find(p => p.id === sub.user_id)?.name || "알 수 없음";
                                            const isGrading = gradingId === sub.id;
                                            const isGraded = sub.score !== null;
                                            return (
                                                <div key={sub.id} style={{
                                                    padding: "12px 14px", borderRadius: 12,
                                                    background: isGraded ? "#f0fdf4" : "#fffbeb",
                                                    borderLeft: `3px solid ${isGraded ? "#22c55e" : "#f59e0b"}`,
                                                }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                                        <div>
                                                            <span style={{ fontSize: 13, fontWeight: 700, color: "#172554" }}>{studentName}</span>
                                                            <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: 8 }}>{hw?.title || "숙제"}</span>
                                                        </div>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                            {isGraded ? (
                                                                <span style={{ fontSize: 12, fontWeight: 700, color: "#22c55e" }}>{sub.score}점</span>
                                                            ) : (
                                                                <button onClick={() => { setGradingId(isGrading ? null : sub.id); setGradeScore(""); setGradeFeedback(""); }} style={{
                                                                    padding: "4px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
                                                                    background: isGrading ? "#2563eb" : "#fff",
                                                                    color: isGrading ? "#fff" : "#2563eb",
                                                                    fontSize: 11, fontWeight: 700, cursor: "pointer",
                                                                }}>
                                                                    {isGrading ? "접기" : "채점"}
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    {/* 답안 미리보기 */}
                                                    <div style={{
                                                        padding: "8px 12px", borderRadius: 8, background: "rgba(255,255,255,0.7)",
                                                        fontSize: 12, color: "#475569", lineHeight: 1.5,
                                                        whiteSpace: "pre-wrap", maxHeight: isGrading ? 200 : 60, overflow: "hidden",
                                                    }}>
                                                        {sub.content}
                                                    </div>
                                                    <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>
                                                        제출: {new Date(sub.submitted_at).toLocaleDateString("ko-KR")} {new Date(sub.submitted_at).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                                                    </div>
                                                    {/* 채점 폼 */}
                                                    {isGrading && (
                                                        <div style={{ marginTop: 10, padding: "12px", borderRadius: 10, background: "rgba(255,255,255,0.8)", border: "1px solid #e2e8f0" }}>
                                                            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                                                                <div style={{ flex: "0 0 100px" }}>
                                                                    <label style={{ fontSize: 11, fontWeight: 600, color: "#334155", display: "block", marginBottom: 4 }}>점수</label>
                                                                    <input
                                                                        type="number" value={gradeScore} onChange={e => setGradeScore(e.target.value)}
                                                                        placeholder="100" min="0" max="100"
                                                                        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                                                                    />
                                                                </div>
                                                                <div style={{ flex: 1 }}>
                                                                    <label style={{ fontSize: 11, fontWeight: 600, color: "#334155", display: "block", marginBottom: 4 }}>피드백 (선택)</label>
                                                                    <input
                                                                        type="text" value={gradeFeedback} onChange={e => setGradeFeedback(e.target.value)}
                                                                        placeholder="잘했어요!"
                                                                        style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box" }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <button onClick={() => gradeSubmission(sub.id)} disabled={gradingSaving || !gradeScore.trim()} style={{
                                                                width: "100%", padding: "8px", borderRadius: 8, border: "none",
                                                                background: gradeScore.trim() ? "#2563eb" : "#e2e8f0",
                                                                color: gradeScore.trim() ? "#fff" : "#94a3b8",
                                                                fontWeight: 700, fontSize: 12, cursor: gradeScore.trim() ? "pointer" : "default",
                                                            }}>
                                                                {gradingSaving ? "저장 중..." : "채점 완료"}
                                                            </button>
                                                        </div>
                                                    )}
                                                    {/* 기존 피드백 표시 */}
                                                    {isGraded && sub.feedback && (
                                                        <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>{sub.feedback}</div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══ Content Tab ═══ */}
                {activeTab === "content" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                            {COURSES.slice(0, 4).map(course => (
                                <div key={course.id} style={{
                                    background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0",
                                    overflow: "hidden",
                                }}>
                                    <div style={{
                                        padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                        borderBottom: "1px solid #f1f5f9", cursor: "pointer",
                                    }}
                                        onClick={() => setEditingUnit(editingUnit === course.id ? null : course.id)}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <CourseIcon courseId={course.id} size={28} />
                                            <div>
                                                <div style={{ fontWeight: 700, fontSize: 14, color: "#172554" }}>{course.title}</div>
                                                <div style={{ fontSize: 11, color: "#94a3b8" }}>
                                                    {course.chapters.reduce((a, ch) => a + ch.units.length, 0)}개 유닛 · {course.totalProblems}개 문제
                                                </div>
                                            </div>
                                        </div>
                                        <span style={{ fontSize: 14, color: "#94a3b8", transform: editingUnit === course.id ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                                            ▼
                                        </span>
                                    </div>

                                    <AnimatePresence>
                                        {editingUnit === course.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                style={{ overflow: "hidden" }}
                                            >
                                                <div style={{ padding: "12px 20px" }}>
                                                    {(course.chapters[0]?.units || []).slice(0, 5).map((unit, idx) => (
                                                        <div key={unit.id} style={{
                                                            display: "flex", alignItems: "center", gap: 10,
                                                            padding: "8px 12px", borderRadius: 8,
                                                            background: idx % 2 === 0 ? "#f8fafc" : "transparent",
                                                        }}>
                                                            <span style={{
                                                                width: 24, height: 24, borderRadius: 6,
                                                                background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center",
                                                                fontSize: 11, fontWeight: 700, color: "#2563eb",
                                                            }}>{idx + 1}</span>
                                                            <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#334155" }}>{unit.title}</span>
                                                            <span style={{ fontSize: 11, color: "#94a3b8" }}>
                                                                {unit.type === "이론" ? "강의" : "실습"} · {(unit.problems?.length || 0)}문제
                                                            </span>
                                                        </div>
                                                    ))}
                                                    {(course.chapters[0]?.units.length || 0) > 5 && (
                                                        <div style={{ textAlign: "center", padding: "8px", fontSize: 12, color: "#94a3b8" }}>
                                                            +{(course.chapters[0]?.units.length || 0) - 5}개 더...
                                                        </div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* ═══ Notify Tab ═══ */}
                {activeTab === "notify" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ background: "#fff", borderRadius: 16, padding: "24px", border: "1px solid #e2e8f0" }}>
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#172554", marginBottom: 16 }}>전체 공지</h3>

                            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                                {[
                                    "오늘 숙제 잊지 마세요!",
                                    "이번 주 수업 잘했어요!",
                                    "내일 수업이 있습니다",
                                    "코딩 대회 참가 안내",
                                ].map(tmpl => (
                                    <button key={tmpl} onClick={() => setNotifyMsg(tmpl)} style={{
                                        padding: "6px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
                                        background: "#f8fafc", fontSize: 11, fontWeight: 600,
                                        color: "#2563eb", cursor: "pointer",
                                    }}>
                                        {tmpl}
                                    </button>
                                ))}
                            </div>

                            <textarea
                                value={notifyMsg}
                                onChange={e => setNotifyMsg(e.target.value)}
                                placeholder="알림 내용을 입력하세요..."
                                style={{
                                    width: "100%", minHeight: 120, padding: "14px", borderRadius: 12,
                                    border: "1px solid #e2e8f0", fontSize: 14, outline: "none",
                                    resize: "vertical", fontFamily: "inherit", boxSizing: "border-box",
                                }}
                            />

                            <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 16 }}>
                                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
                                    <input type="checkbox" defaultChecked /> 카카오톡 알림
                                </label>
                                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
                                    <input type="checkbox" defaultChecked /> 앱 내 알림
                                </label>
                                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#64748b" }}>
                                    <input type="checkbox" /> 이메일
                                </label>
                            </div>

                            <button
                                onClick={handleSendNotify}
                                disabled={!notifyMsg.trim()}
                                style={{
                                    marginTop: 16, padding: "12px 24px", borderRadius: 12, border: "none",
                                    background: notifyMsg.trim() ? "#2563eb" : "#e2e8f0",
                                    color: notifyMsg.trim() ? "#fff" : "#94a3b8",
                                    fontWeight: 700, fontSize: 14, cursor: notifyMsg.trim() ? "pointer" : "default",
                                    width: "100%",
                                }}
                            >
                                {notifySent ? "발송 완료!" : "전체 학생에게 발송"}
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* ═══ Feedback Tab ═══ */}
                {activeTab === "feedback" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            {/* Write */}
                            <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0" }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#172554", marginBottom: 16 }}>피드백 작성</h3>
                                <select value={fbStudentId} onChange={e => setFbStudentId(e.target.value)} style={{
                                    width: "100%", padding: "12px", borderRadius: 10, border: "1px solid #e2e8f0",
                                    fontSize: 14, marginBottom: 10, outline: "none",
                                }}>
                                    <option value="">학생 선택...</option>
                                    {profiles.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                                </select>
                                <select value={fbCourse} onChange={e => setFbCourse(e.target.value)} style={{
                                    width: "100%", padding: "10px", borderRadius: 10, border: "1px solid #e2e8f0",
                                    fontSize: 13, marginBottom: 10, outline: "none",
                                }}>
                                    <option value="">전체 / 일반 피드백</option>
                                    {COURSES.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                                </select>
                                <textarea value={fbText} onChange={e => setFbText(e.target.value)} placeholder="피드백 내용을 작성하세요..."
                                    style={{ width: "100%", minHeight: 120, padding: 14, borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", resize: "vertical", boxSizing: "border-box" }} />
                                {fbMsg && <div style={{ padding: "10px 14px", borderRadius: 10, fontSize: 13, marginTop: 8, background: fbMsg.ok ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)", color: fbMsg.ok ? "#059669" : "#dc2626" }}>{fbMsg.text}</div>}
                                <button onClick={sendTeacherFeedback} disabled={fbSending || !fbStudentId || !fbText.trim()} style={{
                                    marginTop: 12, padding: "12px", borderRadius: 12, border: "none", width: "100%",
                                    background: fbStudentId && fbText.trim() ? "#2563eb" : "#e2e8f0",
                                    color: fbStudentId && fbText.trim() ? "#fff" : "#94a3b8",
                                    fontWeight: 700, fontSize: 14, cursor: fbStudentId && fbText.trim() ? "pointer" : "default",
                                }}>{fbSending ? "보내는 중..." : "피드백 보내기"}</button>
                            </div>

                            {/* History */}
                            <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #e2e8f0" }}>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: "#172554", marginBottom: 16 }}>피드백 이력 ({fbHistory.length}개)</h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 400, overflowY: "auto" }}>
                                    {fbHistory.length === 0 ? (
                                        <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: 24 }}>피드백이 없습니다</p>
                                    ) : fbHistory.map(f => (
                                        <div key={f.id} style={{ padding: "10px 14px", borderRadius: 10, background: "#f8fafc", borderLeft: `3px solid ${f.parent_name === "선생님" ? "#2563eb" : "#10b981"}` }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                                <span style={{ fontSize: 11, fontWeight: 700, color: f.parent_name === "선생님" ? "#2563eb" : "#10b981" }}>
                                                    {f.parent_name === "선생님" ? "선생님" : f.parent_name}
                                                </span>
                                                <span style={{ fontSize: 10, color: "#94a3b8" }}>
                                                    {profiles.find(p => p.id === f.student_id)?.name || ""} · {new Date(f.created_at).toLocaleDateString("ko-KR")}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: 12, color: "#334155", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{f.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══ Monitor Tab ═══ */}
                {activeTab === "monitor" && (
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "#172554" }}>실시간 학생 모니터</h2>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: "#ECFDF5", fontSize: 12, fontWeight: 700, color: "#059669" }}>
                                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#059669", animation: "pulse 2s infinite" }} />
                                        {presenceList.filter(p => p.is_online && new Date(p.last_heartbeat).getTime() > Date.now() - 120000).length}명 접속 중
                                    </span>
                                </div>
                                <button onClick={() => {
                                    const sb = createClient();
                                    sb.from("student_presence").select("*").order("last_heartbeat", { ascending: false })
                                        .then(({ data }) => { if (data) setPresenceList(data as PresenceRow[]); });
                                }} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#64748b" }}>
                                    새로고침
                                </button>
                            </div>

                            {presenceList.length === 0 ? (
                                <p style={{ textAlign: "center", color: "#94a3b8", padding: 40, fontSize: 14 }}>접속 기록이 없습니다</p>
                            ) : (
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
                                    {[...presenceList]
                                        .sort((a, b) => {
                                            const aOnline = a.is_online && new Date(a.last_heartbeat).getTime() > Date.now() - 120000;
                                            const bOnline = b.is_online && new Date(b.last_heartbeat).getTime() > Date.now() - 120000;
                                            if (aOnline !== bOnline) return bOnline ? 1 : -1;
                                            return new Date(b.last_heartbeat).getTime() - new Date(a.last_heartbeat).getTime();
                                        })
                                        .map(p => {
                                            const isOnline = p.is_online && new Date(p.last_heartbeat).getTime() > Date.now() - 120000;
                                            const minutesAgo = Math.floor((Date.now() - new Date(p.last_heartbeat).getTime()) / 60000);
                                            const studyMin = isOnline ? Math.floor((Date.now() - new Date(p.started_at).getTime()) / 60000) : 0;
                                            return (
                                                <div key={p.user_id} style={{
                                                    padding: "16px", borderRadius: 14,
                                                    background: isOnline ? "#F0FDF4" : "#F8FAFC",
                                                    border: `1px solid ${isOnline ? "#BBF7D0" : "#E2E8F0"}`,
                                                    transition: "all 0.3s",
                                                }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                                                        <div style={{
                                                            width: 36, height: 36, borderRadius: "50%",
                                                            background: isOnline ? "linear-gradient(135deg, #059669, #10b981)" : "#cbd5e1",
                                                            display: "flex", alignItems: "center", justifyContent: "center",
                                                            color: "#fff", fontWeight: 800, fontSize: 14,
                                                        }}>
                                                            {p.student_name?.charAt(0) || "?"}
                                                        </div>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ fontSize: 14, fontWeight: 700, color: "#172554" }}>{p.student_name}</div>
                                                            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
                                                                <span style={{
                                                                    width: 6, height: 6, borderRadius: "50%",
                                                                    background: isOnline ? "#059669" : "#94a3b8",
                                                                    ...(isOnline ? { animation: "pulse 2s infinite" } : {}),
                                                                }} />
                                                                <span style={{ color: isOnline ? "#059669" : "#94a3b8", fontWeight: 600 }}>
                                                                    {isOnline ? "접속 중" : minutesAgo < 60 ? `${minutesAgo}분 전` : `${Math.floor(minutesAgo / 60)}시간 전`}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        {isOnline && studyMin > 0 && (
                                                            <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 8, background: "#DBEAFE", color: "#2563EB" }}>
                                                                {studyMin}분째
                                                            </span>
                                                        )}
                                                    </div>
                                                    {isOnline && p.course_title && (
                                                        <div style={{ padding: "8px 10px", borderRadius: 8, background: "#fff", border: "1px solid #E2E8F0", fontSize: 11, color: "#334155", lineHeight: 1.6 }}>
                                                            <div style={{ fontWeight: 700, color: "#2563EB", marginBottom: 2 }}>{p.course_title}</div>
                                                            {p.unit_title && <div>{p.unit_title}</div>}
                                                            {p.page_title && <div style={{ color: "#64748b" }}>{p.page_title}</div>}
                                                        </div>
                                                    )}
                                                    {!isOnline && p.course_title && (
                                                        <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>
                                                            마지막: {p.course_title}{p.unit_title ? ` > ${p.unit_title}` : ""}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.4; }
                }
            `}</style>
        </div>
    );
}
