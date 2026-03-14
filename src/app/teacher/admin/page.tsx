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
    const [activeTab, setActiveTab] = useState<"students" | "add" | "homework" | "content" | "notify" | "feedback" | "monitor" | "chat">("students");
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
    const [hwHtmlUrl, setHwHtmlUrl] = useState("");
    const [hwType, setHwType] = useState<"text" | "html">("text");
    const [hwPreview, setHwPreview] = useState(false);
    const [hwSelectedStudents, setHwSelectedStudents] = useState<string[]>([]);
    const [hwSelectAll, setHwSelectAll] = useState(true);
    const [hwSending, setHwSending] = useState(false);
    const [hwMsg, setHwMsg] = useState<{ ok: boolean; text: string } | null>(null);
    const [hwList, setHwList] = useState<{ id: string; title: string; description: string; due_date: string; course_id: string; assigned_to: string | null; is_active: boolean; created_at: string; html_url?: string; homework_type?: string }[]>([]);
    const [hwSubs, setHwSubs] = useState<{ id: string; homework_id: string; user_id: string; content: string; score: number | null; feedback: string | null; submitted_at: string }[]>([]);
    const [gradingId, setGradingId] = useState<string | null>(null);
    const [gradeScore, setGradeScore] = useState("");
    const [gradeFeedback, setGradeFeedback] = useState("");
    const [gradingSaving, setGradingSaving] = useState(false);

    // 실시간 모니터
    interface PresenceRow { user_id: string; student_name: string; course_id: string | null; course_title: string | null; unit_id: string | null; unit_title: string | null; page_id: string | null; page_title: string | null; page_url: string | null; is_online: boolean; last_heartbeat: string; started_at: string; }
    const [presenceList, setPresenceList] = useState<PresenceRow[]>([]);

    // 채팅
    const [chatStudents, setChatStudents] = useState<{id:string;name:string;lastMsg:string;unread:number;lastTime:string}[]>([]);
    const [chatActiveId, setChatActiveId] = useState<string|null>(null);
    const [chatMessages, setChatMessages] = useState<{id:string;sender_id:string;receiver_id:string;sender_name:string;content:string;is_read:boolean;created_at:string}[]>([]);
    const [chatInput, setChatInput] = useState("");
    const [chatSending, setChatSending] = useState(false);

    // 학생 검색/필터/정렬
    const [studentSearch, setStudentSearch] = useState("");
    const [studentSort, setStudentSort] = useState<"name" | "grade" | "date">("date");
    const [studentDetail, setStudentDetail] = useState<Student | null>(null);

    // 채팅 검색
    const [chatSearch, setChatSearch] = useState("");

    // 일괄 채점
    const [batchGrading, setBatchGrading] = useState(false);
    const [batchScore, setBatchScore] = useState("");
    const [batchFeedback, setBatchFeedback] = useState("");

    // 콘텐츠 탭 - 챕터별 expand
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

    // 모니터 자동새로고침
    const [monitorAutoRefresh, setMonitorAutoRefresh] = useState(true);
    const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());

    const [authed, setAuthed] = useState(false);

    // Auth check — Supabase 세션 또는 localStorage 바이패스 확인
    useEffect(() => {
        (async () => {
            try {
                // 관리자 바이패스 체크
                const role = localStorage.getItem("codingssok_role");
                if (role === "teacher") {
                    setAuthed(true);
                    return;
                }
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
            sb.from("homework").select("id,title,description,due_date,course_id,assigned_to,is_active,created_at,html_url,homework_type")
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

    // 채팅 데이터 로드
    const fetchChatStudents = useCallback(async () => {
        const sb = createClient();
        const { data: msgs } = await sb
            .from("direct_messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (!msgs) return;

        // Get current user (teacher) session
        const { data: { session } } = await sb.auth.getSession();
        const teacherId = session?.user?.id || '';

        // Group by student
        const studentMap = new Map<string, { id: string; name: string; lastMsg: string; unread: number; lastTime: string }>();
        msgs.forEach((m: { sender_id: string; receiver_id: string; sender_name: string; content: string; is_read: boolean; created_at: string }) => {
            const studentId = m.sender_id === teacherId ? m.receiver_id : m.sender_id;
            const studentName = m.sender_id === teacherId ? '학생' : (m.sender_name || '학생');
            if (!studentMap.has(studentId)) {
                const date = new Date(m.created_at);
                studentMap.set(studentId, {
                    id: studentId,
                    name: profiles.find(p => p.id === studentId)?.name || studentName,
                    lastMsg: m.content.length > 30 ? m.content.slice(0, 30) + '...' : m.content,
                    unread: (!m.is_read && m.receiver_id === teacherId) ? 1 : 0,
                    lastTime: `${date.getMonth()+1}/${date.getDate()} ${date.getHours()}:${String(date.getMinutes()).padStart(2,'0')}`,
                });
            } else {
                const entry = studentMap.get(studentId)!;
                if (!m.is_read && m.receiver_id === teacherId) entry.unread++;
            }
        });

        setChatStudents(Array.from(studentMap.values()));
    }, [profiles]);

    const loadConversation = useCallback(async (studentId: string) => {
        const sb = createClient();
        const { data: { session } } = await sb.auth.getSession();
        const teacherId = session?.user?.id || '';

        const { data } = await sb
            .from("direct_messages")
            .select("*")
            .or(`and(sender_id.eq.${studentId},receiver_id.eq.${teacherId}),and(sender_id.eq.${teacherId},receiver_id.eq.${studentId})`)
            .order("created_at", { ascending: true });

        setChatMessages(data || []);

        // Mark as read
        const unread = (data || []).filter((m: { receiver_id: string; is_read: boolean }) => m.receiver_id === teacherId && !m.is_read);
        if (unread.length > 0) {
            await sb.from("direct_messages").update({ is_read: true }).in("id", unread.map((m: { id: string }) => m.id));
            fetchChatStudents();
        }

        // Scroll to bottom
        setTimeout(() => {
            const el = document.getElementById('chatScroll');
            if (el) el.scrollTop = el.scrollHeight;
        }, 100);
    }, [fetchChatStudents]);

    const sendChat = useCallback(async () => {
        if (!chatActiveId || !chatInput.trim()) return;
        setChatSending(true);
        try {
            const sb = createClient();
            const { data: { session } } = await sb.auth.getSession();
            await sb.from("direct_messages").insert({
                sender_id: session?.user?.id || '',
                receiver_id: chatActiveId,
                sender_name: '선생님',
                content: chatInput.trim(),
            });
            setChatInput("");
            loadConversation(chatActiveId);
        } catch (err) {
            if (process.env.NODE_ENV === 'development') console.error(err);
        } finally {
            setChatSending(false);
        }
    }, [chatActiveId, chatInput, loadConversation]);

    useEffect(() => { if (activeTab === 'chat') fetchChatStudents(); }, [activeTab, fetchChatStudents]);

    // Monitor auto-refresh every 30s
    useEffect(() => {
        if (activeTab !== "monitor" || !monitorAutoRefresh) return;
        const interval = setInterval(() => {
            const sb = createClient();
            sb.from("student_presence").select("*").order("last_heartbeat", { ascending: false })
                .then(({ data }) => { if (data) { setPresenceList(data as PresenceRow[]); setLastRefreshTime(new Date()); } });
        }, 30000);
        return () => clearInterval(interval);
    }, [activeTab, monitorAutoRefresh]);

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
                    html_url: hwType === 'html' ? hwHtmlUrl.trim() || null : null,
                    homework_type: hwType,
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
                    html_url: hwType === 'html' ? hwHtmlUrl.trim() || null : null,
                    homework_type: hwType,
                }));
                const { error } = await sb.from("homework").insert(rows);
                if (error) throw error;
            }

            const count = hwSelectAll ? "전체 학생" : `${hwSelectedStudents.length}명`;
            setHwMsg({ ok: true, text: `"${hwTitle.trim()}" 숙제가 ${count}에게 출제되었습니다!` });
            setHwTitle(""); setHwDesc(""); setHwDueDate(""); setHwCourse("");
            setHwSelectedStudents([]); setHwSelectAll(true);
            setHwHtmlUrl(""); setHwType("text"); setHwPreview(false);
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
                    <Link href="/" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 18, verticalAlign: "middle" }}>arrow_back</span> 홈
                    </Link>
                    <h1 style={{ fontSize: 18, fontWeight: 800, color: "#172554" }}>선생님 관리 패널</h1>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 12, color: "#64748b" }}>학생 {students.length}명</span>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#34D399" }} />
                </div>
            </div>

            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "24px 20px" }}>
                {/* ── Dashboard Summary Cards ── */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
                    {[
                        { icon: "groups", label: "전체 학생", value: students.length, color: "#2563eb", bg: "#EFF6FF" },
                        { icon: "wifi", label: "현재 접속", value: presenceList.filter(p => p.is_online && new Date(p.last_heartbeat).getTime() > Date.now() - 120000).length, color: "#059669", bg: "#ECFDF5" },
                        { icon: "assignment_late", label: "미채점 숙제", value: hwSubs.filter(s => s.score === null).length, color: "#F59E0B", bg: "#FFFBEB" },
                        { icon: "mark_chat_unread", label: "안읽은 메시지", value: chatStudents.reduce((a, s) => a + s.unread, 0), color: "#EF4444", bg: "#FEF2F2" },
                    ].map(card => (
                        <div key={card.label} style={{
                            background: "#fff", borderRadius: 14, padding: "16px 18px",
                            border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 14,
                        }}>
                            <div style={{
                                width: 44, height: 44, borderRadius: 12, background: card.bg,
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 24, color: card.color }}>{card.icon}</span>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{card.label}</div>
                                <div style={{ fontSize: 22, fontWeight: 800, color: card.color }}>{card.value}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tab navigation — horizontal scroll on mobile, underline active */}
                <div style={{ overflowX: "auto", marginBottom: 24, borderBottom: "2px solid #e2e8f0", WebkitOverflowScrolling: "touch" }}>
                    <div style={{ display: "flex", gap: 0, minWidth: "max-content" }}>
                        {([
                            { id: "students" as const, label: "학생 목록", icon: "people" },
                            { id: "add" as const, label: "학생 추가", icon: "person_add" },
                            { id: "homework" as const, label: "숙제 출제", icon: "assignment" },
                            { id: "feedback" as const, label: "피드백", icon: "rate_review" },
                            { id: "monitor" as const, label: "실시간 모니터", icon: "monitor_heart" },
                            { id: "chat" as const, label: "채팅", icon: "chat" },
                            { id: "content" as const, label: "콘텐츠", icon: "menu_book" },
                            { id: "notify" as const, label: "알림", icon: "notifications" },
                        ]).map(tab => {
                            const isActive = activeTab === tab.id;
                            const unreadBadge = tab.id === "chat" ? chatStudents.reduce((a, s) => a + s.unread, 0) : 0;
                            const ungradedBadge = tab.id === "homework" ? hwSubs.filter(s => s.score === null).length : 0;
                            const badgeCount = unreadBadge || ungradedBadge;
                            return (
                                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                                    padding: "12px 18px", border: "none", cursor: "pointer",
                                    background: "transparent",
                                    color: isActive ? "#2563eb" : "#64748b",
                                    fontWeight: isActive ? 700 : 500, fontSize: 13,
                                    borderBottom: isActive ? "3px solid #2563eb" : "3px solid transparent",
                                    marginBottom: -2, transition: "all 0.2s",
                                    display: "flex", alignItems: "center", gap: 6, position: "relative",
                                    whiteSpace: "nowrap",
                                }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{tab.icon}</span>
                                    {tab.label}
                                    {badgeCount > 0 && (
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, color: "#fff",
                                            background: "#EF4444", borderRadius: 20,
                                            padding: "1px 6px", minWidth: 16, textAlign: "center",
                                            lineHeight: "16px",
                                        }}>{badgeCount}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ═══ Students List Tab ═══ */}
                {activeTab === "students" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {/* Search & Sort bar */}
                        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
                            <div style={{ flex: 1, minWidth: 200, position: "relative" }}>
                                <span className="material-symbols-outlined" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 20, color: "#94a3b8" }}>search</span>
                                <input
                                    value={studentSearch} onChange={e => setStudentSearch(e.target.value)}
                                    placeholder="이름으로 검색..."
                                    style={{ width: "100%", padding: "10px 14px 10px 40px", borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box", background: "#fff" }}
                                />
                            </div>
                            <div style={{ display: "flex", gap: 4, background: "#fff", borderRadius: 10, border: "1px solid #e2e8f0", padding: 3 }}>
                                {([
                                    { key: "name" as const, label: "이름순", icon: "sort_by_alpha" },
                                    { key: "grade" as const, label: "학년순", icon: "school" },
                                    { key: "date" as const, label: "등록순", icon: "calendar_today" },
                                ]).map(s => (
                                    <button key={s.key} onClick={() => setStudentSort(s.key)} style={{
                                        padding: "6px 12px", borderRadius: 8, border: "none", cursor: "pointer",
                                        background: studentSort === s.key ? "#2563eb" : "transparent",
                                        color: studentSort === s.key ? "#fff" : "#64748b",
                                        fontWeight: 600, fontSize: 11, display: "flex", alignItems: "center", gap: 4,
                                    }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{s.icon}</span>
                                        {s.label}
                                    </button>
                                ))}
                            </div>
                            <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
                                {students.filter(s => !studentSearch || s.name.includes(studentSearch)).length}명 표시
                            </div>
                        </div>

                        {/* Student list */}
                        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                            <div style={{
                                display: "grid", gridTemplateColumns: "44px 2fr 1.2fr 0.8fr 0.8fr 1fr 140px",
                                padding: "12px 20px", background: "#f8fafc", borderBottom: "1px solid #e2e8f0",
                                fontSize: 11, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const,
                            }}>
                                <div></div><div>이름</div><div>생년월일</div><div>학년</div><div>반</div><div>등록일</div><div>관리</div>
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
                                [...students]
                                    .filter(s => !studentSearch || s.name.toLowerCase().includes(studentSearch.toLowerCase()))
                                    .sort((a, b) => {
                                        if (studentSort === "name") return a.name.localeCompare(b.name, "ko");
                                        if (studentSort === "grade") return (a.grade || "").localeCompare(b.grade || "", "ko");
                                        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                                    })
                                    .map(student => (
                                    <div key={student.id} style={{
                                        display: "grid", gridTemplateColumns: "44px 2fr 1.2fr 0.8fr 0.8fr 1fr 140px",
                                        padding: "14px 20px", borderBottom: "1px solid #f1f5f9",
                                        alignItems: "center", cursor: "pointer", transition: "background 0.15s",
                                    }}
                                        onClick={() => setStudentDetail(student)}
                                        onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
                                        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                                    >
                                        <div style={{
                                            width: 34, height: 34, borderRadius: 10, background: "#EFF6FF",
                                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
                                        }}>{student.avatar || "🧒"}</div>
                                        <div style={{ fontWeight: 700, fontSize: 14, color: "#172554" }}>{student.name}</div>
                                        <div style={{ fontSize: 13, color: "#64748b" }}>{formatBirthday(student.birthday)}</div>
                                        <div style={{ fontSize: 12, color: "#6366F1", fontWeight: 600 }}>
                                            {student.grade ? <span style={{ padding: "2px 8px", borderRadius: 6, background: "rgba(99,102,241,0.08)" }}>{student.grade}</span> : "—"}
                                        </div>
                                        <div style={{ fontSize: 13, color: "#64748b" }}>{student.class || "—"}</div>
                                        <div style={{ fontSize: 11, color: "#94a3b8" }}>{new Date(student.created_at).toLocaleDateString("ko-KR")}</div>
                                        <div style={{ display: "flex", gap: 4 }} onClick={e => e.stopPropagation()}>
                                            <button onClick={() => { setActiveTab("chat"); setChatActiveId(student.id); }} title="메시지" style={{
                                                padding: "5px 8px", borderRadius: 6, border: "1px solid #e2e8f0",
                                                background: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
                                            }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#2563eb" }}>chat</span>
                                            </button>
                                            <button onClick={() => { setActiveTab("homework"); }} title="숙제" style={{
                                                padding: "5px 8px", borderRadius: 6, border: "1px solid #e2e8f0",
                                                background: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
                                            }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#F59E0B" }}>assignment</span>
                                            </button>
                                            {deleteId === student.id ? (
                                                <>
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
                                                </>
                                            ) : (
                                                <button onClick={() => setDeleteId(student.id)} title="삭제" style={{
                                                    padding: "5px 8px", borderRadius: 6, border: "1px solid #fee2e2",
                                                    background: "#fff", cursor: "pointer", display: "flex", alignItems: "center",
                                                }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#EF4444" }}>delete</span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Student Detail Modal */}
                        <AnimatePresence>
                            {studentDetail && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    onClick={() => setStudentDetail(null)}
                                    style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
                                >
                                    <motion.div
                                        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                                        onClick={e => e.stopPropagation()}
                                        style={{ background: "#fff", borderRadius: 20, padding: 32, width: "100%", maxWidth: 420, boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
                                    >
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                                <div style={{
                                                    width: 56, height: 56, borderRadius: 16, background: "#EFF6FF",
                                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28,
                                                }}>{studentDetail.avatar || "🧒"}</div>
                                                <div>
                                                    <div style={{ fontSize: 20, fontWeight: 800, color: "#172554" }}>{studentDetail.name}</div>
                                                    <div style={{ fontSize: 13, color: "#64748b" }}>
                                                        {studentDetail.grade || "학년 미지정"} {studentDetail.class ? `· ${studentDetail.class}` : ""}
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => setStudentDetail(null)} style={{
                                                padding: 4, border: "none", background: "transparent", cursor: "pointer",
                                            }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#94a3b8" }}>close</span>
                                            </button>
                                        </div>

                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                                            {[
                                                { icon: "cake", label: "생년월일", value: formatBirthday(studentDetail.birthday) },
                                                { icon: "school", label: "학년", value: studentDetail.grade || "미지정" },
                                                { icon: "group", label: "반", value: studentDetail.class || "미지정" },
                                                { icon: "calendar_today", label: "등록일", value: new Date(studentDetail.created_at).toLocaleDateString("ko-KR") },
                                            ].map(info => (
                                                <div key={info.label} style={{ padding: "12px 14px", borderRadius: 12, background: "#f8fafc", border: "1px solid #f1f5f9" }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94a3b8" }}>{info.icon}</span>
                                                        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{info.label}</span>
                                                    </div>
                                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#172554" }}>{info.value}</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ display: "flex", gap: 8 }}>
                                            <button onClick={() => { setStudentDetail(null); setActiveTab("chat"); setChatActiveId(studentDetail.id); }} style={{
                                                flex: 1, padding: "11px", borderRadius: 10, border: "1px solid #e2e8f0",
                                                background: "#fff", fontWeight: 700, fontSize: 13, color: "#2563eb",
                                                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                            }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chat</span>
                                                메시지 보내기
                                            </button>
                                            <button onClick={() => { setStudentDetail(null); setActiveTab("homework"); }} style={{
                                                flex: 1, padding: "11px", borderRadius: 10, border: "none",
                                                background: "#2563eb", fontWeight: 700, fontSize: 13, color: "#fff",
                                                cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                            }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>assignment</span>
                                                숙제 출제
                                            </button>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </AnimatePresence>
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

                                {/* 숙제 유형 선택 */}
                                <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                                    <button
                                        onClick={() => { setHwType("text"); setHwPreview(false); }}
                                        style={{
                                            flex: 1, padding: "10px", borderRadius: 10,
                                            border: hwType === "text" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                                            background: hwType === "text" ? "rgba(37,99,235,0.06)" : "#fff",
                                            fontSize: 13, fontWeight: hwType === "text" ? 700 : 500,
                                            color: hwType === "text" ? "#2563eb" : "#64748b",
                                            cursor: "pointer", display: "flex", alignItems: "center", gap: 6, justifyContent: "center",
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>edit_note</span>
                                        텍스트 숙제
                                    </button>
                                    <button
                                        onClick={() => setHwType("html")}
                                        style={{
                                            flex: 1, padding: "10px", borderRadius: 10,
                                            border: hwType === "html" ? "2px solid #2563eb" : "1px solid #e2e8f0",
                                            background: hwType === "html" ? "rgba(37,99,235,0.06)" : "#fff",
                                            fontSize: 13, fontWeight: hwType === "html" ? 700 : 500,
                                            color: hwType === "html" ? "#2563eb" : "#64748b",
                                            cursor: "pointer", display: "flex", alignItems: "center", gap: 6, justifyContent: "center",
                                        }}
                                    >
                                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>code</span>
                                        HTML 숙제
                                    </button>
                                </div>

                                {hwType === "html" && (
                                    <div style={{ marginBottom: 10 }}>
                                        <div style={{ position: "relative" }}>
                                            <input
                                                value={hwHtmlUrl}
                                                onChange={e => setHwHtmlUrl(e.target.value)}
                                                placeholder="/homework/cospro-python2-week03.html"
                                                style={{ width: "100%", padding: "12px 14px", paddingRight: 80, borderRadius: 10, border: "1px solid #e2e8f0", fontSize: 13, outline: "none", boxSizing: "border-box", fontFamily: "'JetBrains Mono', monospace" }}
                                            />
                                            {hwHtmlUrl.trim() && (
                                                <button
                                                    onClick={() => setHwPreview(!hwPreview)}
                                                    style={{
                                                        position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                                                        padding: "6px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
                                                        background: hwPreview ? "#2563eb" : "#fff",
                                                        color: hwPreview ? "#fff" : "#2563eb",
                                                        fontSize: 11, fontWeight: 700, cursor: "pointer",
                                                    }}
                                                >
                                                    {hwPreview ? "닫기" : "미리보기"}
                                                </button>
                                            )}
                                        </div>
                                        {hwPreview && hwHtmlUrl.trim() && (
                                            <div style={{ marginTop: 8, borderRadius: 12, overflow: "hidden", border: "1px solid #e2e8f0", height: 300 }}>
                                                <iframe
                                                    src={hwHtmlUrl.trim()}
                                                    style={{ width: "100%", height: "100%", border: "none" }}
                                                    title="숙제 미리보기"
                                                />
                                            </div>
                                        )}
                                        <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 6 }}>
                                            public/homework/ 폴더에 HTML 파일을 넣고 경로를 입력하세요
                                        </p>
                                    </div>
                                )}

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
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#172554", margin: 0 }}>출제된 숙제 ({hwList.length}개)</h3>
                                        <div style={{ display: "flex", gap: 6, fontSize: 11, color: "#94a3b8" }}>
                                            <span style={{ padding: "3px 8px", borderRadius: 6, background: "#ECFDF5", color: "#059669", fontWeight: 600 }}>
                                                제출 {hwSubs.length}건
                                            </span>
                                            <span style={{ padding: "3px 8px", borderRadius: 6, background: "#FFFBEB", color: "#F59E0B", fontWeight: 600 }}>
                                                미채점 {hwSubs.filter(s => s.score === null).length}건
                                            </span>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 280, overflowY: "auto" }}>
                                        {hwList.length === 0 ? (
                                            <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: 24 }}>출제된 숙제가 없습니다</p>
                                        ) : hwList.map(hw => {
                                            const studentName = hw.assigned_to
                                                ? profiles.find(p => p.id === hw.assigned_to)?.name || "알 수 없음"
                                                : "전체 학생";
                                            const isOverdue = hw.due_date && new Date(hw.due_date) < new Date();
                                            const isDueSoon = hw.due_date && !isOverdue && (new Date(hw.due_date).getTime() - Date.now()) < 86400000 * 2;
                                            const subCount = hwSubs.filter(s => s.homework_id === hw.id).length;
                                            const totalStudents = hw.assigned_to ? 1 : profiles.length;
                                            const ungradedCount = hwSubs.filter(s => s.homework_id === hw.id && s.score === null).length;
                                            const dueBorderColor = isOverdue ? "#EF4444" : isDueSoon ? "#F59E0B" : "#2563eb";
                                            return (
                                                <div key={hw.id} style={{
                                                    padding: "12px 14px", borderRadius: 12, background: "#f8fafc",
                                                    borderLeft: `3px solid ${dueBorderColor}`,
                                                }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                        <div style={{ flex: 1 }}>
                                                            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                                                                <span style={{ fontSize: 14, fontWeight: 700, color: "#172554" }}>{hw.title}</span>
                                                                {(hw as {homework_type?: string}).homework_type === "html" && (
                                                                    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "rgba(139,92,246,0.1)", color: "#7c3aed" }}>HTML</span>
                                                                )}
                                                                {/* Status badge */}
                                                                {isOverdue ? (
                                                                    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#FEE2E2", color: "#DC2626" }}>마감됨</span>
                                                                ) : isDueSoon ? (
                                                                    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#FEF3C7", color: "#D97706" }}>마감 임박</span>
                                                                ) : (
                                                                    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "#ECFDF5", color: "#059669" }}>진행중</span>
                                                                )}
                                                            </div>
                                                            <div style={{ display: "flex", gap: 10, fontSize: 11, color: "#94a3b8", flexWrap: "wrap", alignItems: "center" }}>
                                                                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                                                                    <span className="material-symbols-outlined" style={{ fontSize: 13 }}>person</span>
                                                                    {studentName}
                                                                </span>
                                                                {hw.due_date && (
                                                                    <span style={{ color: isOverdue ? "#DC2626" : isDueSoon ? "#D97706" : "#94a3b8", fontWeight: isOverdue || isDueSoon ? 700 : 400 }}>
                                                                        {hw.due_date}
                                                                    </span>
                                                                )}
                                                                {/* Submission progress bar */}
                                                                <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                                                                    <span style={{ fontSize: 11, fontWeight: 600 }}>{subCount}/{totalStudents}</span>
                                                                    <span style={{ width: 40, height: 4, borderRadius: 2, background: "#e2e8f0", position: "relative", display: "inline-block" }}>
                                                                        <span style={{ position: "absolute", left: 0, top: 0, height: "100%", borderRadius: 2, background: "#2563eb", width: `${totalStudents > 0 ? Math.min(100, (subCount / totalStudents) * 100) : 0}%` }} />
                                                                    </span>
                                                                </span>
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
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#172554", margin: 0 }}>
                                            제출물 채점
                                            {hwSubs.filter(s => s.score === null).length > 0 && (
                                                <span style={{ fontSize: 12, fontWeight: 700, color: "#f59e0b", marginLeft: 8 }}>
                                                    (미채점 {hwSubs.filter(s => s.score === null).length}건)
                                                </span>
                                            )}
                                        </h3>
                                        {hwSubs.filter(s => s.score === null).length > 1 && (
                                            <button onClick={() => setBatchGrading(!batchGrading)} style={{
                                                padding: "6px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
                                                background: batchGrading ? "#2563eb" : "#fff",
                                                color: batchGrading ? "#fff" : "#2563eb",
                                                fontSize: 11, fontWeight: 700, cursor: "pointer",
                                                display: "flex", alignItems: "center", gap: 4,
                                            }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 15 }}>done_all</span>
                                                일괄 채점
                                            </button>
                                        )}
                                    </div>

                                    {/* Batch grading form */}
                                    {batchGrading && (
                                        <div style={{ padding: 14, borderRadius: 12, background: "#EFF6FF", border: "1px solid #BFDBFE", marginBottom: 14 }}>
                                            <div style={{ fontSize: 12, fontWeight: 700, color: "#2563eb", marginBottom: 8 }}>미채점 제출물 전체에 동일 점수 부여</div>
                                            <div style={{ display: "flex", gap: 8 }}>
                                                <input type="number" value={batchScore} onChange={e => setBatchScore(e.target.value)} placeholder="점수" min="0" max="100"
                                                    style={{ width: 80, padding: "8px 10px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, outline: "none" }} />
                                                <input type="text" value={batchFeedback} onChange={e => setBatchFeedback(e.target.value)} placeholder="피드백 (선택)"
                                                    style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 13, outline: "none" }} />
                                                <button onClick={async () => {
                                                    if (!batchScore.trim()) return;
                                                    const sb = createClient();
                                                    const ungraded = hwSubs.filter(s => s.score === null);
                                                    await Promise.all(ungraded.map(s =>
                                                        sb.from("homework_submissions").update({ score: parseInt(batchScore, 10), feedback: batchFeedback.trim() || null }).eq("id", s.id)
                                                    ));
                                                    setBatchGrading(false); setBatchScore(""); setBatchFeedback("");
                                                    fetchHomework();
                                                }} disabled={!batchScore.trim()} style={{
                                                    padding: "8px 16px", borderRadius: 8, border: "none",
                                                    background: batchScore.trim() ? "#2563eb" : "#e2e8f0",
                                                    color: batchScore.trim() ? "#fff" : "#94a3b8",
                                                    fontWeight: 700, fontSize: 12, cursor: batchScore.trim() ? "pointer" : "default",
                                                }}>적용 ({hwSubs.filter(s => s.score === null).length}건)</button>
                                            </div>
                                        </div>
                                    )}
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
                        {/* Summary */}
                        <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
                            <div style={{ padding: "8px 14px", borderRadius: 10, background: "#fff", border: "1px solid #e2e8f0", fontSize: 12, fontWeight: 600, color: "#64748b" }}>
                                전체 <span style={{ color: "#2563eb", fontWeight: 800 }}>{COURSES.length}</span>개 코스
                            </div>
                            <div style={{ padding: "8px 14px", borderRadius: 10, background: "#fff", border: "1px solid #e2e8f0", fontSize: 12, fontWeight: 600, color: "#64748b" }}>
                                총 <span style={{ color: "#059669", fontWeight: 800 }}>{COURSES.reduce((a, c) => a + c.chapters.reduce((b, ch) => b + ch.units.length, 0), 0)}</span>개 유닛
                            </div>
                        </div>

                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {COURSES.map(course => {
                                const totalUnits = course.chapters.reduce((a, ch) => a + ch.units.length, 0);
                                const isExpanded = editingUnit === course.id;
                                return (
                                    <div key={course.id} style={{
                                        background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0",
                                        overflow: "hidden",
                                    }}>
                                        <div style={{
                                            padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between",
                                            borderBottom: isExpanded ? "1px solid #e2e8f0" : "none", cursor: "pointer",
                                        }}
                                            onClick={() => setEditingUnit(isExpanded ? null : course.id)}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <CourseIcon courseId={course.id} size={28} />
                                                <div>
                                                    <div style={{ fontWeight: 700, fontSize: 14, color: "#172554" }}>{course.title}</div>
                                                    <div style={{ fontSize: 11, color: "#94a3b8" }}>
                                                        {course.chapters.length}개 챕터 · {totalUnits}개 유닛
                                                        {course.totalProblems > 0 && ` · ${course.totalProblems}개 문제`}
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                {totalUnits === 0 && (
                                                    <span style={{ fontSize: 10, fontWeight: 600, padding: "3px 8px", borderRadius: 6, background: "#FEF3C7", color: "#D97706" }}>준비중</span>
                                                )}
                                                <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#94a3b8", transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                                                    expand_more
                                                </span>
                                            </div>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    style={{ overflow: "hidden" }}
                                                >
                                                    <div style={{ padding: "8px 12px", maxHeight: 500, overflowY: "auto" }}>
                                                        {course.chapters.map((chapter, chIdx) => {
                                                            const chapterKey = `${course.id}-${chIdx}`;
                                                            const isChExpanded = expandedChapters.has(chapterKey);
                                                            if (chapter.id === "coming-soon") {
                                                                return (
                                                                    <div key={chIdx} style={{ padding: "16px", textAlign: "center", color: "#94a3b8", fontSize: 13 }}>
                                                                        콘텐츠를 준비하고 있습니다
                                                                    </div>
                                                                );
                                                            }
                                                            return (
                                                                <div key={chIdx} style={{ marginBottom: 4 }}>
                                                                    <div
                                                                        onClick={(e) => {
                                                                            e.stopPropagation();
                                                                            setExpandedChapters(prev => {
                                                                                const next = new Set(prev);
                                                                                if (next.has(chapterKey)) next.delete(chapterKey);
                                                                                else next.add(chapterKey);
                                                                                return next;
                                                                            });
                                                                        }}
                                                                        style={{
                                                                            display: "flex", alignItems: "center", gap: 8,
                                                                            padding: "10px 12px", borderRadius: 8, cursor: "pointer",
                                                                            background: isChExpanded ? "#f1f5f9" : "transparent",
                                                                            transition: "background 0.15s",
                                                                        }}
                                                                    >
                                                                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#94a3b8", transform: isChExpanded ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>
                                                                            chevron_right
                                                                        </span>
                                                                        <span style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>
                                                                            Ch.{chapter.chapterNumber} {chapter.title}
                                                                        </span>
                                                                        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>
                                                                            ({chapter.units.length}개 유닛)
                                                                        </span>
                                                                    </div>
                                                                    {isChExpanded && (
                                                                        <div style={{ paddingLeft: 28 }}>
                                                                            {chapter.units.map((unit, uIdx) => (
                                                                                <div key={unit.id} style={{
                                                                                    display: "flex", alignItems: "center", gap: 10,
                                                                                    padding: "7px 12px", borderRadius: 6,
                                                                                    background: uIdx % 2 === 0 ? "#fafbfc" : "transparent",
                                                                                    fontSize: 12,
                                                                                }}>
                                                                                    <span style={{
                                                                                        width: 22, height: 22, borderRadius: 5,
                                                                                        background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center",
                                                                                        fontSize: 10, fontWeight: 700, color: "#2563eb", flexShrink: 0,
                                                                                    }}>{unit.unitNumber}</span>
                                                                                    <span style={{ flex: 1, fontWeight: 500, color: "#334155" }}>{unit.title}</span>
                                                                                    <span style={{ fontSize: 10, color: "#94a3b8" }}>
                                                                                        {unit.type || "이론"}
                                                                                        {(unit.problems?.length || 0) > 0 && ` · ${unit.problems?.length}문제`}
                                                                                        {(unit.pages?.length || 0) > 0 && ` · ${unit.pages?.length}p`}
                                                                                    </span>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                );
                            })}
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
                        {/* Monitor summary cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 16 }}>
                            {[
                                { icon: "wifi", label: "접속 중", value: presenceList.filter(p => p.is_online && new Date(p.last_heartbeat).getTime() > Date.now() - 120000).length, color: "#059669", bg: "#ECFDF5" },
                                { icon: "wifi_off", label: "오프라인", value: presenceList.filter(p => !p.is_online || new Date(p.last_heartbeat).getTime() <= Date.now() - 120000).length, color: "#94a3b8", bg: "#F1F5F9" },
                                { icon: "history", label: "전체 기록", value: presenceList.length, color: "#2563eb", bg: "#EFF6FF" },
                            ].map(card => (
                                <div key={card.label} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", border: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: 12 }}>
                                    <div style={{ width: 38, height: 38, borderRadius: 10, background: card.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 20, color: card.color }}>{card.icon}</span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600 }}>{card.label}</div>
                                        <div style={{ fontSize: 20, fontWeight: 800, color: card.color }}>{card.value}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0", padding: 24 }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <h2 style={{ fontSize: 18, fontWeight: 800, color: "#172554", margin: 0 }}>실시간 학생 모니터</h2>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 20, background: "#ECFDF5", fontSize: 12, fontWeight: 700, color: "#059669" }}>
                                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#059669", animation: "pulse 2s infinite" }} />
                                        {presenceList.filter(p => p.is_online && new Date(p.last_heartbeat).getTime() > Date.now() - 120000).length}명 접속 중
                                    </span>
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    {/* Auto-refresh toggle */}
                                    <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "#64748b", cursor: "pointer", fontWeight: 500 }}>
                                        <input type="checkbox" checked={monitorAutoRefresh} onChange={e => setMonitorAutoRefresh(e.target.checked)} style={{ cursor: "pointer" }} />
                                        자동 새로고침
                                        {monitorAutoRefresh && (
                                            <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 10, color: "#059669" }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 12, animation: "spin 2s linear infinite" }}>sync</span>
                                                30초
                                            </span>
                                        )}
                                    </label>
                                    <span style={{ fontSize: 10, color: "#cbd5e1" }}>|</span>
                                    <span style={{ fontSize: 10, color: "#94a3b8" }}>
                                        마지막: {lastRefreshTime.toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                                    </span>
                                    <button onClick={() => {
                                        const sb = createClient();
                                        sb.from("student_presence").select("*").order("last_heartbeat", { ascending: false })
                                            .then(({ data }) => { if (data) { setPresenceList(data as PresenceRow[]); setLastRefreshTime(new Date()); } });
                                    }} style={{ padding: "6px 14px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#64748b", display: "flex", alignItems: "center", gap: 4 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 15 }}>refresh</span>
                                        새로고침
                                    </button>
                                </div>
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

                {activeTab === "chat" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ height: "calc(100vh - 260px)" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 0, height: "100%", background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0" }}>
                            {/* Student list */}
                            <div style={{ borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column" }}>
                                <div style={{ padding: "14px 16px", borderBottom: "1px solid #f1f5f9" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                        <h3 style={{ fontSize: 15, fontWeight: 700, color: "#172554", margin: 0 }}>채팅</h3>
                                        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500 }}>{chatStudents.length}명</span>
                                    </div>
                                    {/* Search */}
                                    <div style={{ position: "relative" }}>
                                        <span className="material-symbols-outlined" style={{ position: "absolute", left: 8, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#cbd5e1" }}>search</span>
                                        <input
                                            value={chatSearch} onChange={e => setChatSearch(e.target.value)}
                                            placeholder="학생 검색..."
                                            style={{ width: "100%", padding: "7px 10px 7px 30px", borderRadius: 8, border: "1px solid #e2e8f0", fontSize: 12, outline: "none", boxSizing: "border-box" }}
                                        />
                                    </div>
                                </div>
                                <div style={{ flex: 1, overflowY: "auto" }}>
                                    {chatStudents.length === 0 ? (
                                        <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 36, color: "#e2e8f0", display: "block", marginBottom: 8 }}>chat_bubble_outline</span>
                                            <p style={{ fontSize: 13, fontWeight: 500 }}>아직 대화가 없습니다</p>
                                            <p style={{ fontSize: 11, marginTop: 4 }}>학생이 먼저 메시지를 보내면 여기에 표시됩니다</p>
                                        </div>
                                    ) : chatStudents
                                        .filter(s => !chatSearch || s.name.toLowerCase().includes(chatSearch.toLowerCase()))
                                        .map(s => (
                                        <div key={s.id} onClick={() => { setChatActiveId(s.id); loadConversation(s.id); }} style={{
                                            padding: "12px 16px", cursor: "pointer",
                                            background: chatActiveId === s.id ? "rgba(37,99,235,0.06)" : "transparent",
                                            borderBottom: "1px solid #f8fafc",
                                            borderLeft: chatActiveId === s.id ? "3px solid #2563eb" : "3px solid transparent",
                                            transition: "background 0.15s",
                                        }}
                                            onMouseEnter={e => { if (chatActiveId !== s.id) e.currentTarget.style.background = "#fafbfc"; }}
                                            onMouseLeave={e => { if (chatActiveId !== s.id) e.currentTarget.style.background = "transparent"; }}
                                        >
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{
                                                    width: 36, height: 36, borderRadius: 10,
                                                    background: s.unread > 0 ? "#EFF6FF" : "#f1f5f9",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    fontWeight: 800, fontSize: 14, color: s.unread > 0 ? "#2563eb" : "#94a3b8", flexShrink: 0,
                                                }}>{s.name[0]}</div>
                                                <div style={{ flex: 1, minWidth: 0 }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                                        <span style={{ fontSize: 13, fontWeight: s.unread > 0 ? 800 : 600, color: "#172554" }}>{s.name}</span>
                                                        <span style={{ fontSize: 10, color: "#94a3b8", flexShrink: 0 }}>{s.lastTime}</span>
                                                    </div>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 3 }}>
                                                        <span style={{ fontSize: 11, color: s.unread > 0 ? "#334155" : "#94a3b8", fontWeight: s.unread > 0 ? 600 : 400, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 160 }}>{s.lastMsg}</span>
                                                        {s.unread > 0 && (
                                                            <span style={{ fontSize: 10, fontWeight: 700, color: "#fff", background: "#EF4444", borderRadius: 20, padding: "2px 7px", minWidth: 18, textAlign: "center", flexShrink: 0 }}>{s.unread}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Chat window */}
                            <div style={{ display: "flex", flexDirection: "column" }}>
                                {!chatActiveId ? (
                                    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8" }}>
                                        <div style={{ textAlign: "center" }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 56, color: "#e2e8f0", display: "block", marginBottom: 12 }}>forum</span>
                                            <p style={{ fontSize: 16, fontWeight: 700, color: "#cbd5e1" }}>대화를 선택해주세요</p>
                                            <p style={{ fontSize: 12, color: "#e2e8f0", marginTop: 4 }}>왼쪽 목록에서 학생을 선택하면 대화가 표시됩니다</p>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Chat header */}
                                        <div style={{ padding: "12px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#fff" }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14, color: "#2563eb" }}>
                                                    {chatStudents.find(s => s.id === chatActiveId)?.name[0] || "?"}
                                                </div>
                                                <div>
                                                    <span style={{ fontSize: 15, fontWeight: 700, color: "#172554", display: "block" }}>{chatStudents.find(s => s.id === chatActiveId)?.name}</span>
                                                    <span style={{ fontSize: 11, color: "#94a3b8" }}>{chatMessages.length}개 메시지</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Messages */}
                                        <div id="chatScroll" style={{ flex: 1, overflowY: "auto", padding: "20px 24px", background: "#f8fafc" }}>
                                            {chatMessages.length === 0 ? (
                                                <div style={{ textAlign: "center", color: "#cbd5e1", padding: 40 }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: 32, display: "block", marginBottom: 8 }}>chat_bubble_outline</span>
                                                    <p style={{ fontSize: 13 }}>아직 대화 내역이 없습니다</p>
                                                </div>
                                            ) : chatMessages.map(m => {
                                                const isMine = m.sender_id !== chatActiveId;
                                                return (
                                                    <div key={m.id} style={{ display: "flex", justifyContent: isMine ? "flex-end" : "flex-start", marginBottom: 10 }}>
                                                        {!isMine && (
                                                            <div style={{
                                                                width: 28, height: 28, borderRadius: 8, background: "#e2e8f0",
                                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                                fontWeight: 700, fontSize: 11, color: "#64748b", marginRight: 8, flexShrink: 0, alignSelf: "flex-end",
                                                            }}>{chatStudents.find(s => s.id === chatActiveId)?.name[0] || "?"}</div>
                                                        )}
                                                        <div style={{ maxWidth: "60%" }}>
                                                            {!isMine && (
                                                                <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 3, fontWeight: 600 }}>
                                                                    {m.sender_name || chatStudents.find(s => s.id === chatActiveId)?.name}
                                                                </div>
                                                            )}
                                                            <div style={{
                                                                padding: "10px 14px",
                                                                borderRadius: isMine ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                                                                background: isMine ? "linear-gradient(135deg, #2563eb, #3b82f6)" : "#fff",
                                                                color: isMine ? "#fff" : "#0f172a",
                                                                fontSize: 13, lineHeight: 1.6,
                                                                boxShadow: isMine ? "0 2px 8px rgba(37,99,235,0.2)" : "0 1px 3px rgba(0,0,0,0.06)",
                                                                whiteSpace: "pre-wrap",
                                                            }}>{m.content}</div>
                                                            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 3, justifyContent: isMine ? "flex-end" : "flex-start" }}>
                                                                <span style={{ fontSize: 10, color: "#94a3b8" }}>
                                                                    {new Date(m.created_at).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                                                                </span>
                                                                {isMine && m.is_read && (
                                                                    <span className="material-symbols-outlined" style={{ fontSize: 12, color: "#2563eb" }}>done_all</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* Input */}
                                        <div style={{ padding: "12px 16px", borderTop: "1px solid #f1f5f9", background: "#fff", display: "flex", gap: 8, alignItems: "center" }}>
                                            <input
                                                value={chatInput}
                                                onChange={e => setChatInput(e.target.value)}
                                                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); sendChat(); } }}
                                                placeholder="메시지를 입력하세요..."
                                                style={{
                                                    flex: 1, padding: "11px 16px", borderRadius: 12,
                                                    border: "1px solid #e2e8f0", fontSize: 13, outline: "none",
                                                    transition: "border-color 0.2s",
                                                }}
                                                onFocus={e => e.target.style.borderColor = "#3b82f6"}
                                                onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                                            />
                                            <button
                                                onClick={sendChat}
                                                disabled={chatSending || !chatInput.trim()}
                                                style={{
                                                    width: 42, height: 42, borderRadius: 12, border: "none",
                                                    background: chatInput.trim() ? "#2563eb" : "#e2e8f0",
                                                    color: chatInput.trim() ? "#fff" : "#94a3b8",
                                                    fontWeight: 700, fontSize: 13, cursor: chatInput.trim() ? "pointer" : "default",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    transition: "background 0.2s",
                                                }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
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
