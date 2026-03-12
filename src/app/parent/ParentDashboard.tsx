"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { COURSES, getAllUnits } from "@/data/courses";
import { verifyParentPin } from "@/hooks/useParentPin";

// ── Types ──

interface StudentProfile {
    id: string;
    name: string;
    email: string;
    level: number;
    total_xp: number;
    rank: string;
}

interface DailyReport {
    id: string;
    student_id: string;
    teacher_id: string;
    date: string;
    content: string;
    mood: string;
    created_at: string;
}

interface Homework {
    id: string;
    title: string;
    description: string;
    due_date: string;
    course_id: string | null;
    assigned_to: string | null;
    is_active: boolean;
    created_at: string;
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

interface CodeSubmission {
    id: string;
    user_id: string;
    language: string;
    status: string;
    code: string;
    output: string;
    created_at: string;
}

interface XpLog {
    id: string;
    user_id: string;
    amount: number;
    reason: string;
    created_at: string;
}

interface StudyProgress {
    course_id: string;
    completed_units: string[];
    updated_at: string;
}

interface TeacherFeedback {
    id: string;
    student_id: string;
    teacher_id: string;
    teacher_name: string;
    content: string;
    category: string;
    created_at: string;
}

interface ClassSchedule {
    id: string;
    student_id: string;
    title: string;
    day_of_week: number;
    start_time: string;
    end_time: string;
    room: string;
    teacher_name: string;
    is_active: boolean;
}

interface AttendanceRecord {
    id: string;
    user_id: string;
    check_date: string;
    note: string;
    xp_earned: number;
    check_in_time: string;
    check_out_time: string;
}

interface ParentFeedback {
    id: string;
    parent_name: string;
    student_id: string;
    content: string;
    course_id: string;
    created_at: string;
}

// ── Constants ──

const gc: React.CSSProperties = {
    background: "rgba(255,255,255,0.75)",
    backdropFilter: "blur(20px)",
    borderRadius: 20,
    border: "1px solid rgba(226,232,240,0.5)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
};

const BLUE = {
    primary: "#3b82f6",
    dark: "#2563eb",
    light: "#dbeafe",
    bg: "#EFF6FF",
    textDark: "#172554",
};

type Tab = "realtime" | "today" | "homework" | "growth" | "comments" | "schedule" | "attendance";

const DAY_NAMES = ["일", "월", "화", "수", "목", "금", "토"];

const MOOD_MAP: Record<string, { emoji: string; label: string; color: string }> = {
    great: { emoji: "😊", label: "아주 좋음", color: "#22c55e" },
    good: { emoji: "🙂", label: "좋음", color: "#3b82f6" },
    normal: { emoji: "😐", label: "보통", color: "#f59e0b" },
    tired: { emoji: "😴", label: "피곤", color: "#f97316" },
    bad: { emoji: "😟", label: "안 좋음", color: "#ef4444" },
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
    학습태도: { bg: "#dbeafe", text: "#2563eb" },
    과제: { bg: "#dcfce7", text: "#16a34a" },
    실력향상: { bg: "#fef3c7", text: "#d97706" },
    참여도: { bg: "#fce7f3", text: "#db2777" },
    창의성: { bg: "#ede9fe", text: "#7c3aed" },
    협동심: { bg: "#ffedd5", text: "#ea580c" },
};

// ── Helpers ──

function formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

function formatTime(timeStr: string): string {
    if (!timeStr) return "";
    const parts = timeStr.split(":");
    return `${parts[0]}:${parts[1]}`;
}

function timeAgo(ts: string): string {
    const d = Date.now() - new Date(ts).getTime();
    if (d < 60000) return "방금 전";
    if (d < 3600000) return `${Math.floor(d / 60000)}분 전`;
    if (d < 86400000) return `${Math.floor(d / 3600000)}시간 전`;
    return `${Math.floor(d / 86400000)}일 전`;
}

function getToday(): string {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getWeekDates(): string[] {
    const now = new Date();
    const dayOfWeek = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((dayOfWeek + 6) % 7));
    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(monday);
        d.setDate(monday.getDate() + i);
        dates.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
    }
    return dates;
}

function getMonthDates(year: number, month: number): { date: string; day: number; isCurrentMonth: boolean }[] {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const result: { date: string; day: number; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    for (let i = startPadding - 1; i >= 0; i--) {
        const d = new Date(year, month, -i);
        result.push({
            date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
            day: d.getDate(),
            isCurrentMonth: false,
        });
    }

    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
        const d = new Date(year, month, i);
        result.push({
            date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
            day: i,
            isCurrentMonth: true,
        });
    }

    // Next month padding to fill 6 rows
    while (result.length % 7 !== 0) {
        const d = new Date(year, month + 1, result.length - startPadding - lastDay.getDate() + 1);
        result.push({
            date: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
            day: d.getDate(),
            isCurrentMonth: false,
        });
    }

    return result;
}

// ── Component ──

export default function ParentDashboard() {
    const supabase = useMemo(() => createClient(), []);

    // Auth state
    const [studentCode, setStudentCode] = useState(() => {
        if (typeof window === "undefined") return "";
        return localStorage.getItem("parent_student_id") || "";
    });
    const [parentName, setParentName] = useState(() => {
        if (typeof window === "undefined") return "";
        return localStorage.getItem("parent_name") || "";
    });
    const [inputCode, setInputCode] = useState("");
    const [inputPin, setInputPin] = useState("");
    const [inputParentName, setInputParentName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Data state
    const [student, setStudent] = useState<StudentProfile | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>("realtime");

    // Tab data
    const [dailyReports, setDailyReports] = useState<DailyReport[]>([]);
    const [homeworkList, setHomeworkList] = useState<Homework[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [homeworkError, setHomeworkError] = useState(false);
    const [codeSubmissions, setCodeSubmissions] = useState<CodeSubmission[]>([]);
    const [xpLogs, setXpLogs] = useState<XpLog[]>([]);
    const [studyProgress, setStudyProgress] = useState<StudyProgress[]>([]);
    const [teacherFeedbacks, setTeacherFeedbacks] = useState<TeacherFeedback[]>([]);
    const [parentFeedbacks, setParentFeedbacks] = useState<ParentFeedback[]>([]);
    const [schedules, setSchedules] = useState<ClassSchedule[]>([]);
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    const [presence, setPresence] = useState<{ is_online: boolean; course_title: string | null; unit_title: string | null; page_title: string | null; last_heartbeat: string; started_at: string } | null>(null);

    // Feedback form
    const [replyText, setReplyText] = useState("");
    const [replySending, setReplySending] = useState(false);

    // Attendance calendar
    const [attMonth, setAttMonth] = useState(() => new Date().getMonth());
    const [attYear, setAttYear] = useState(() => new Date().getFullYear());

    // ── Data fetching ──

    const fetchStudentData = useCallback(async (query: string, pin?: string) => {
        setLoading(true);
        setError("");
        try {
            if (pin) {
                const profile = await verifyParentPin(supabase, query, pin);
                if (!profile) {
                    setError("학생을 찾을 수 없거나 접속 코드가 일치하지 않습니다.");
                    setLoading(false);
                    return;
                }
                const sid = profile.id;
                setStudent({
                    id: sid,
                    name: profile.name || "학생",
                    email: profile.email || "",
                    level: profile.level || 1,
                    total_xp: profile.total_xp || profile.xp || 0,
                    rank: profile.rank || "",
                });

                // Fetch all data in parallel
                const [
                    rReports, rSchedules, rAttendance,
                    rTeacherFb, rParentFb,
                    rCodeSubs, rXpLogs, rProgress,
                ] = await Promise.all([
                    supabase.from("daily_reports").select("*").eq("student_id", sid).order("date", { ascending: false }).limit(30),
                    supabase.from("class_schedules").select("*").eq("student_id", sid).eq("is_active", true),
                    supabase.from("attendance").select("*").eq("user_id", sid).order("check_date", { ascending: false }).limit(90),
                    supabase.from("teacher_feedback").select("*").eq("student_id", sid).order("created_at", { ascending: false }).limit(50),
                    supabase.from("parent_feedback").select("*").eq("student_id", sid).order("created_at", { ascending: false }),
                    supabase.from("code_submissions").select("*").eq("user_id", sid).order("created_at", { ascending: false }).limit(100),
                    supabase.from("xp_logs").select("*").eq("user_id", sid).order("created_at", { ascending: false }).limit(60),
                    supabase.from("study_progress").select("course_id,completed_units,updated_at").eq("user_id", sid).neq("course_id", "__parent_pin__"),
                ]);

                setDailyReports(rReports.data || []);
                setSchedules(rSchedules.data || []);
                setAttendance(rAttendance.data || []);
                setTeacherFeedbacks(rTeacherFb.data || []);
                setParentFeedbacks(rParentFb.data || []);
                setCodeSubmissions(rCodeSubs.data || []);
                setXpLogs(rXpLogs.data || []);
                setStudyProgress(rProgress.data || []);

                // Homework — 학생에게 배정된 숙제 + 전체 대상 숙제
                try {
                    const [rHw, rSub] = await Promise.all([
                        supabase.from("homework").select("id,title,description,due_date,course_id,assigned_to,is_active,created_at")
                            .eq("is_active", true)
                            .or(`assigned_to.eq.${sid},assigned_to.is.null`)
                            .order("created_at", { ascending: false }).limit(20),
                        supabase.from("homework_submissions").select("id,homework_id,user_id,content,score,feedback,submitted_at")
                            .eq("user_id", sid).order("submitted_at", { ascending: false }).limit(50),
                    ]);
                    if (rHw.error || rSub.error) {
                        setHomeworkError(true);
                        setHomeworkList([]);
                        setSubmissions([]);
                    } else {
                        setHomeworkList(rHw.data || []);
                        setSubmissions(rSub.data || []);
                        setHomeworkError(false);
                    }
                } catch {
                    setHomeworkError(true);
                    setHomeworkList([]);
                    setSubmissions([]);
                }

                // 접속 현황 조회
                const { data: presData } = await supabase.from("student_presence").select("*").eq("user_id", sid).maybeSingle();
                if (presData) setPresence(presData);

                localStorage.setItem("parent_student_id", sid);
                localStorage.setItem("parent_pin_cache", pin);
            } else {
                const cachedPin = localStorage.getItem("parent_pin_cache");
                if (cachedPin) {
                    await fetchStudentData(query, cachedPin);
                    return;
                } else {
                    setError("접속 코드가 필요합니다.");
                    setLoading(false);
                    return;
                }
            }
        } catch (err: any) {
            setError(err?.message || "데이터를 불러올 수 없습니다.");
        }
        setLoading(false);
    }, [supabase]);

    useEffect(() => {
        if (studentCode) fetchStudentData(studentCode);
    }, [studentCode, fetchStudentData]);

    // ── Realtime subscriptions ──

    useEffect(() => {
        if (!student) return;
        const ch = supabase.channel("parent-monitor-v2")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "daily_reports", filter: `student_id=eq.${student.id}` }, (p) =>
                setDailyReports(prev => [p.new as DailyReport, ...prev].slice(0, 30)))
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "teacher_feedback", filter: `student_id=eq.${student.id}` }, (p) =>
                setTeacherFeedbacks(prev => [p.new as TeacherFeedback, ...prev].slice(0, 50)))
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "attendance", filter: `user_id=eq.${student.id}` }, (p) =>
                setAttendance(prev => [p.new as AttendanceRecord, ...prev].slice(0, 90)))
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "code_submissions", filter: `user_id=eq.${student.id}` }, (p) =>
                setCodeSubmissions(prev => [p.new as CodeSubmission, ...prev].slice(0, 100)))
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "xp_logs", filter: `user_id=eq.${student.id}` }, (p) =>
                setXpLogs(prev => [p.new as XpLog, ...prev].slice(0, 60)))
            .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles", filter: `id=eq.${student.id}` }, (p) => {
                const d = p.new as Record<string, unknown>;
                setStudent(prev => prev ? { ...prev, level: (d.level as number) || prev.level, total_xp: (d.total_xp as number) || (d.xp as number) || prev.total_xp } : prev);
            })
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "homework" }, (p) => {
                const hw = p.new as Homework;
                if (hw.is_active && (hw.assigned_to === student.id || hw.assigned_to === null)) {
                    setHomeworkList(prev => [hw, ...prev].slice(0, 20));
                }
            })
            .on("postgres_changes", { event: "*", schema: "public", table: "student_presence", filter: `user_id=eq.${student.id}` }, (p) => {
                const row = p.new as Record<string, unknown>;
                if (row?.user_id) setPresence({
                    is_online: row.is_online as boolean,
                    course_title: row.course_title as string | null,
                    unit_title: row.unit_title as string | null,
                    page_title: row.page_title as string | null,
                    last_heartbeat: row.last_heartbeat as string,
                    started_at: row.started_at as string,
                });
            })
            .subscribe();
        return () => { supabase.removeChannel(ch); };
    }, [student, supabase]);

    // ── Actions ──

    const handleConnect = () => {
        if (!inputCode.trim() || !inputPin.trim()) {
            setError("자녀 정보와 접속 코드를 모두 입력해주세요.");
            return;
        }
        if (inputParentName.trim()) {
            setParentName(inputParentName.trim());
            localStorage.setItem("parent_name", inputParentName.trim());
        }
        fetchStudentData(inputCode.trim(), inputPin.trim());
    };

    const handleDisconnect = () => {
        setStudentCode("");
        setStudent(null);
        setDailyReports([]);
        setHomeworkList([]);
        setSubmissions([]);
        setCodeSubmissions([]);
        setXpLogs([]);
        setStudyProgress([]);
        setTeacherFeedbacks([]);
        setParentFeedbacks([]);
        setSchedules([]);
        setAttendance([]);
        localStorage.removeItem("parent_student_id");
        localStorage.removeItem("parent_pin_cache");
    };

    const sendReply = async () => {
        if (!replyText.trim() || !student || !parentName) return;
        setReplySending(true);
        await supabase.from("parent_feedback").insert({
            parent_name: parentName,
            student_id: student.id,
            content: replyText.trim(),
            course_id: null,
        });
        setReplyText("");
        setReplySending(false);
        const { data } = await supabase.from("parent_feedback").select("*").eq("student_id", student.id).order("created_at", { ascending: false });
        setParentFeedbacks(data || []);
    };

    // ── Login Screen ──

    if (!student) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${BLUE.bg},#F0F9FF,#F8FAFC)`, padding: 20 }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ ...gc, padding: "48px 40px", maxWidth: 480, width: "100%", textAlign: "center" }}>
                    <div style={{ width: 80, height: 80, borderRadius: 24, background: `linear-gradient(135deg,${BLUE.primary},${BLUE.dark})`, margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 40, color: "#fff" }}>family_restroom</span>
                    </div>
                    <h1 style={{ fontSize: 26, fontWeight: 800, color: BLUE.textDark, marginBottom: 8 }}>학부모 포털</h1>
                    <p style={{ fontSize: 14, color: "#64748b", marginBottom: 24, lineHeight: 1.6 }}>
                        자녀의 학습 현황을 실시간으로 확인합니다.
                    </p>
                    <input
                        value={inputParentName}
                        onChange={e => setInputParentName(e.target.value)}
                        placeholder="학부모 이름 (피드백 작성용)"
                        style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", marginBottom: 8, boxSizing: "border-box" }}
                    />
                    <input
                        value={inputCode}
                        onChange={e => setInputCode(e.target.value)}
                        placeholder="자녀 이름, 이메일, 또는 학생 ID"
                        style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 14, outline: "none", marginBottom: 8, boxSizing: "border-box" }}
                    />
                    <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                        <div style={{ position: "relative", flex: 1 }}>
                            <span className="material-symbols-outlined" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", fontSize: 18, color: "#94a3b8" }}>lock</span>
                            <input
                                value={inputPin}
                                onChange={e => setInputPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                                onKeyDown={e => e.key === "Enter" && handleConnect()}
                                placeholder="접속 코드 (6자리)"
                                maxLength={6}
                                style={{ width: "100%", padding: "12px 16px 12px 38px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 16, outline: "none", fontFamily: "'JetBrains Mono',monospace", letterSpacing: 4, boxSizing: "border-box" }}
                            />
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={handleConnect}
                            disabled={loading}
                            style={{ padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer", background: `linear-gradient(135deg,${BLUE.primary},${BLUE.dark})`, color: "#fff", fontWeight: 700, fontSize: 14, whiteSpace: "nowrap" }}
                        >
                            {loading ? "연결 중..." : "연결"}
                        </motion.button>
                    </div>
                    {error && <p style={{ fontSize: 12, color: "#ef4444", fontWeight: 600 }}>{error}</p>}
                    <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 8, lineHeight: 1.5 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 13, verticalAlign: "middle", marginRight: 4 }}>info</span>
                        접속 코드는 자녀의 <strong>프로필 페이지</strong>에서 확인할 수 있습니다.
                    </p>
                    <Link href="/" style={{ display: "inline-block", marginTop: 16, fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>
                        ← 홈으로
                    </Link>
                </motion.div>
            </div>
        );
    }

    // ── Tab definitions ──

    const TABS: { id: Tab; label: string; icon: string }[] = [
        { id: "realtime", label: "실시간", icon: "stream" },
        { id: "today", label: "오늘 수업", icon: "today" },
        { id: "homework", label: "숙제", icon: "assignment" },
        { id: "growth", label: "성장 추이", icon: "trending_up" },
        { id: "comments", label: "선생님", icon: "chat" },
        { id: "schedule", label: "일정", icon: "calendar_month" },
        { id: "attendance", label: "출결", icon: "fact_check" },
    ];

    // ── Computed data ──

    const todayStr = getToday();
    const todayReport = dailyReports.find(r => r.date === todayStr);

    // Growth data
    const weekDates = getWeekDates();
    const weekCodeCounts = weekDates.map(dateStr => {
        return codeSubmissions.filter(s => s.created_at.startsWith(dateStr)).length;
    });
    const maxWeekCode = Math.max(...weekCodeCounts, 1);

    const totalCoursePct = (() => {
        const activeCourses = COURSES.filter(c => c.chapters[0]?.id !== "coming-soon");
        if (activeCourses.length === 0) return 0;
        let totalDone = 0;
        let totalUnits = 0;
        activeCourses.forEach(c => {
            const units = getAllUnits(c.id);
            const prog = studyProgress.find(p => p.course_id === c.id);
            totalUnits += units.length;
            totalDone += prog?.completed_units?.length || 0;
        });
        return totalUnits > 0 ? Math.round((totalDone / totalUnits) * 100) : 0;
    })();

    const thisWeekSessions = codeSubmissions.filter(s => weekDates.some(d => s.created_at.startsWith(d))).length;

    // Today's summary stats
    const todayCodeCount = codeSubmissions.filter(s => s.created_at.startsWith(todayStr)).length;
    const todayXp = xpLogs.filter(l => l.created_at.startsWith(todayStr)).reduce((sum, l) => sum + (l.amount || 0), 0);
    const todaySuccessCount = codeSubmissions.filter(s => s.created_at.startsWith(todayStr) && s.status === "success").length;

    // Realtime activity feed — merge all activity types into one chronological list
    const realtimeActivities = useMemo(() => {
        const items: { type: string; time: string; title: string; detail: string; icon: string; color: string }[] = [];
        codeSubmissions.forEach(s => {
            items.push({
                type: "code",
                time: s.created_at,
                title: s.status === "success" ? "코드 실행 성공" : "코드 실행",
                detail: `${s.language} · ${s.code?.length || 0}자`,
                icon: "terminal",
                color: s.status === "success" ? "#22c55e" : "#f59e0b",
            });
        });
        xpLogs.forEach(l => {
            items.push({
                type: "xp",
                time: l.created_at,
                title: `+${l.amount} XP`,
                detail: l.reason || "경험치 획득",
                icon: "star",
                color: "#f59e0b",
            });
        });
        dailyReports.forEach(r => {
            items.push({
                type: "report",
                time: r.created_at,
                title: "수업 기록 등록",
                detail: r.content?.slice(0, 60) + (r.content?.length > 60 ? "..." : ""),
                icon: "school",
                color: BLUE.primary,
            });
        });
        attendance.forEach(a => {
            items.push({
                type: "attendance",
                time: a.check_in_time || a.check_date,
                title: "출석 체크",
                detail: a.check_in_time ? `${formatTime(a.check_in_time)} 등원` : formatDate(a.check_date),
                icon: "check_circle",
                color: "#22c55e",
            });
        });
        teacherFeedbacks.forEach(f => {
            items.push({
                type: "feedback",
                time: f.created_at,
                title: `${f.teacher_name || "선생님"} 코멘트`,
                detail: f.content?.slice(0, 60) + (f.content?.length > 60 ? "..." : ""),
                icon: "comment",
                color: "#7c3aed",
            });
        });
        homeworkList.forEach(hw => {
            items.push({
                type: "homework",
                time: hw.created_at,
                title: "새 숙제 출제",
                detail: `${hw.title}${hw.due_date ? ` · 마감 ${formatDate(hw.due_date)}` : ""}`,
                icon: "assignment",
                color: "#dc2626",
            });
        });
        return items.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 50);
    }, [codeSubmissions, xpLogs, dailyReports, attendance, teacherFeedbacks, homeworkList]);

    // Monthly XP totals (last 4 weeks)
    const weeklyXp: { label: string; amount: number }[] = [];
    for (let w = 3; w >= 0; w--) {
        const start = new Date();
        start.setDate(start.getDate() - (w * 7 + 6));
        const end = new Date();
        end.setDate(end.getDate() - w * 7);
        const startStr = `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, "0")}-${String(start.getDate()).padStart(2, "0")}`;
        const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, "0")}-${String(end.getDate()).padStart(2, "0")}`;
        const total = xpLogs.filter(l => l.created_at >= startStr && l.created_at <= endStr + "T23:59:59").reduce((s, l) => s + (l.amount || 0), 0);
        weeklyXp.push({ label: `${start.getMonth() + 1}/${start.getDate()}`, amount: total });
    }
    const maxWeeklyXp = Math.max(...weeklyXp.map(w => w.amount), 1);

    // Schedule: next class
    const now = new Date();
    const currentDayOfWeek = now.getDay();
    const sortedSchedules = [...schedules].sort((a, b) => {
        const aDist = ((a.day_of_week - currentDayOfWeek) + 7) % 7;
        const bDist = ((b.day_of_week - currentDayOfWeek) + 7) % 7;
        if (aDist !== bDist) return aDist - bDist;
        return (a.start_time || "").localeCompare(b.start_time || "");
    });

    // Attendance stats
    const monthDates = getMonthDates(attYear, attMonth);
    const attendanceMap: Record<string, string> = {};
    attendance.forEach(a => { attendanceMap[a.check_date] = a.note || "present"; });
    const presentCount = attendance.filter(a => (a.note || "present") === "present").length;
    const lateCount = attendance.filter(a => (a.note || "").includes("late") || (a.note || "").includes("지각")).length;
    const absentCount = attendance.filter(a => (a.note || "").includes("absent") || (a.note || "").includes("결석")).length;
    const totalAttendance = presentCount + lateCount + absentCount;
    const attendanceRate = totalAttendance > 0 ? Math.round(((presentCount + lateCount) / totalAttendance) * 100) : 100;

    // ── Render: Connected ──

    return (
        <div style={{ minHeight: "100vh", background: `linear-gradient(135deg,${BLUE.bg},#F0F9FF,#F8FAFC)`, padding: "24px 20px" }}>
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                {/* Header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
                    <div>
                        <Link href="/" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>← 홈</Link>
                        <h1 style={{ fontSize: 24, fontWeight: 800, color: BLUE.textDark, marginTop: 4 }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 24, verticalAlign: "middle", marginRight: 6, color: BLUE.primary }}>child_care</span>
                            {student.name}
                        </h1>
                        <p style={{ fontSize: 12, color: "#94a3b8" }}>
                            Lv.{student.level} · {(student.total_xp || 0).toLocaleString()} XP
                            {student.rank && ` · ${student.rank}`}
                        </p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                            style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                        <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>실시간</span>
                        <button onClick={handleDisconnect} style={{ padding: "6px 12px", borderRadius: 8, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 11, color: "#64748b", fontWeight: 600 }}>
                            연결 해제
                        </button>
                    </div>
                </div>

                {/* Today's Summary Card */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 10, marginBottom: 16 }}>
                    <div style={{ ...gc, padding: 16, textAlign: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 22, color: BLUE.primary }}>terminal</span>
                        <div style={{ fontSize: 24, fontWeight: 800, color: BLUE.primary, marginTop: 4 }}>{todayCodeCount}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>오늘 코딩</div>
                    </div>
                    <div style={{ ...gc, padding: 16, textAlign: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#22c55e" }}>check_circle</span>
                        <div style={{ fontSize: 24, fontWeight: 800, color: "#22c55e", marginTop: 4 }}>{todaySuccessCount}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>성공</div>
                    </div>
                    <div style={{ ...gc, padding: 16, textAlign: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#f59e0b" }}>star</span>
                        <div style={{ fontSize: 24, fontWeight: 800, color: "#f59e0b", marginTop: 4 }}>+{todayXp}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>오늘 XP</div>
                    </div>
                    <div style={{ ...gc, padding: 16, textAlign: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#7c3aed" }}>emoji_events</span>
                        <div style={{ fontSize: 24, fontWeight: 800, color: "#7c3aed", marginTop: 4 }}>Lv.{student.level}</div>
                        <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{(student.total_xp || 0).toLocaleString()} XP</div>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display: "flex", gap: 2, marginBottom: 20, ...gc, padding: 4, overflowX: "auto" }}>
                    {TABS.map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                            flex: 1,
                            padding: "10px 6px",
                            borderRadius: 14,
                            border: "none",
                            cursor: "pointer",
                            background: activeTab === t.id ? `linear-gradient(135deg,${BLUE.primary},${BLUE.dark})` : "transparent",
                            color: activeTab === t.id ? "#fff" : "#64748b",
                            fontWeight: 700,
                            fontSize: 11,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 3,
                            whiteSpace: "nowrap",
                            minWidth: 0,
                            transition: "all 0.2s",
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>{t.icon}</span>
                            {t.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">

                    {/* ══════════ TAB 0: 실시간 활동 ══════════ */}
                    {activeTab === "realtime" && (
                        <motion.div key="realtime" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {/* 현재 접속 상태 */}
                            {presence && (() => {
                                const isOnline = presence.is_online && new Date(presence.last_heartbeat).getTime() > Date.now() - 120000;
                                const studyMin = isOnline ? Math.floor((Date.now() - new Date(presence.started_at).getTime()) / 60000) : 0;
                                return (
                                    <div style={{
                                        ...gc, padding: "16px 20px", marginBottom: 16,
                                        background: isOnline ? "linear-gradient(135deg, #F0FDF4, #ECFDF5)" : undefined,
                                        border: isOnline ? "1px solid #BBF7D0" : undefined,
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <motion.span
                                                animate={isOnline ? { scale: [1, 1.4, 1] } : {}}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                style={{ width: 12, height: 12, borderRadius: "50%", background: isOnline ? "#22c55e" : "#94a3b8", flexShrink: 0 }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 14, fontWeight: 800, color: isOnline ? "#059669" : "#64748b" }}>
                                                    {isOnline ? "지금 공부 중!" : "오프라인"}
                                                </div>
                                                {isOnline && presence.course_title && (
                                                    <div style={{ fontSize: 12, color: "#334155", marginTop: 4, lineHeight: 1.5 }}>
                                                        <span style={{ fontWeight: 700, color: BLUE.dark }}>{presence.course_title}</span>
                                                        {presence.unit_title && <span> &gt; {presence.unit_title}</span>}
                                                        {presence.page_title && <span style={{ color: "#64748b" }}> &gt; {presence.page_title}</span>}
                                                    </div>
                                                )}
                                                {!isOnline && (
                                                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>
                                                        마지막 접속: {timeAgo(presence.last_heartbeat)}
                                                    </div>
                                                )}
                                            </div>
                                            {isOnline && studyMin > 0 && (
                                                <span style={{ fontSize: 12, fontWeight: 700, padding: "4px 12px", borderRadius: 10, background: BLUE.light, color: BLUE.dark }}>
                                                    {studyMin}분째 학습 중
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })()}

                            <div style={{ ...gc, padding: 20 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                                    <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                                        style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                                    <h3 style={{ fontSize: 15, fontWeight: 700, color: BLUE.textDark }}>실시간 활동 피드</h3>
                                    <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: "auto" }}>자동 갱신</span>
                                </div>
                                {realtimeActivities.length === 0 ? (
                                    <div style={{ padding: 48, textAlign: "center" }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 56, color: "#cbd5e1" }}>hourglass_empty</span>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: "#94a3b8", marginTop: 12 }}>아직 활동 기록이 없습니다</h3>
                                        <p style={{ fontSize: 13, color: "#cbd5e1", marginTop: 4 }}>학생이 활동하면 실시간으로 표시됩니다.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                                        {realtimeActivities.map((activity, i) => {
                                            const isToday = activity.time.startsWith(todayStr);
                                            const showDateSep = i === 0 || !realtimeActivities[i - 1].time.startsWith(activity.time.slice(0, 10));
                                            return (
                                                <div key={`${activity.type}-${activity.time}-${i}`}>
                                                    {showDateSep && (
                                                        <div style={{ padding: "12px 0 6px", fontSize: 11, fontWeight: 700, color: isToday ? BLUE.primary : "#94a3b8" }}>
                                                            {isToday ? "📌 오늘" : formatDate(activity.time)}
                                                        </div>
                                                    )}
                                                    <div style={{
                                                        display: "flex",
                                                        alignItems: "flex-start",
                                                        gap: 12,
                                                        padding: "10px 12px",
                                                        borderRadius: 12,
                                                        background: isToday ? `${activity.color}08` : "transparent",
                                                        borderLeft: `3px solid ${activity.color}`,
                                                        marginBottom: 6,
                                                    }}>
                                                        <span className="material-symbols-outlined" style={{
                                                            fontSize: 18,
                                                            color: activity.color,
                                                            width: 32,
                                                            height: 32,
                                                            borderRadius: 8,
                                                            background: `${activity.color}15`,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            flexShrink: 0,
                                                        }}>{activity.icon}</span>
                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                            <div style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>{activity.title}</div>
                                                            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{activity.detail}</div>
                                                        </div>
                                                        <span style={{ fontSize: 10, color: "#94a3b8", whiteSpace: "nowrap", flexShrink: 0 }}>{timeAgo(activity.time)}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* ══════════ TAB 1: 오늘 수업 ══════════ */}
                    {activeTab === "today" && (
                        <motion.div key="today" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {todayReport ? (
                                <div style={{ ...gc, padding: 24 }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 28, color: BLUE.primary }}>school</span>
                                            <div>
                                                <h3 style={{ fontSize: 16, fontWeight: 800, color: BLUE.textDark }}>오늘의 수업 기록</h3>
                                                <span style={{ fontSize: 11, color: "#94a3b8" }}>{formatDate(todayReport.date)}</span>
                                            </div>
                                        </div>
                                        {todayReport.mood && MOOD_MAP[todayReport.mood] && (
                                            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 20, background: "#f8fafc" }}>
                                                <span style={{ fontSize: 22 }}>{MOOD_MAP[todayReport.mood].emoji}</span>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: MOOD_MAP[todayReport.mood].color }}>
                                                    {MOOD_MAP[todayReport.mood].label}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div style={{ padding: 20, borderRadius: 14, background: "#f8fafc", lineHeight: 1.8, fontSize: 14, color: "#334155", whiteSpace: "pre-wrap" }}>
                                        {todayReport.content}
                                    </div>
                                </div>
                            ) : (
                                <div style={{ ...gc, padding: 60, textAlign: "center" }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 56, color: "#cbd5e1", marginBottom: 12 }}>event_note</span>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#94a3b8", marginBottom: 8 }}>아직 수업 기록이 없습니다</h3>
                                    <p style={{ fontSize: 13, color: "#cbd5e1" }}>선생님이 오늘 수업 내용을 기록하면 여기에 표시됩니다.</p>
                                </div>
                            )}

                            {/* Recent reports */}
                            {dailyReports.length > 0 && (
                                <div style={{ ...gc, padding: 20, marginTop: 16 }}>
                                    <h3 style={{ fontSize: 14, fontWeight: 700, color: BLUE.textDark, marginBottom: 14 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: "middle", marginRight: 6 }}>history</span>
                                        최근 수업 기록
                                    </h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        {dailyReports.filter(r => r.date !== todayStr).slice(0, 5).map(r => (
                                            <div key={r.id} style={{ padding: "14px 16px", borderRadius: 12, background: "#f8fafc", borderLeft: `3px solid ${BLUE.primary}` }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                                                    <span style={{ fontSize: 12, fontWeight: 600, color: BLUE.primary }}>{formatDate(r.date)}</span>
                                                    {r.mood && MOOD_MAP[r.mood] && (
                                                        <span style={{ fontSize: 16 }}>{MOOD_MAP[r.mood].emoji}</span>
                                                    )}
                                                </div>
                                                <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                                                    {r.content.length > 150 ? r.content.slice(0, 150) + "..." : r.content}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    {dailyReports.filter(r => r.date !== todayStr).length === 0 && (
                                        <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: 16 }}>이전 수업 기록이 없습니다.</p>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ══════════ TAB 2: 숙제 ══════════ */}
                    {activeTab === "homework" && (
                        <motion.div key="homework" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {homeworkError ? (
                                <div style={{ ...gc, padding: 48, textAlign: "center" }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 48, color: "#cbd5e1" }}>lock</span>
                                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#94a3b8", marginTop: 12 }}>숙제 데이터에 접근할 수 없습니다</h3>
                                    <p style={{ fontSize: 12, color: "#cbd5e1", marginTop: 8, lineHeight: 1.6 }}>
                                        보안 정책으로 인해 숙제 정보를 불러올 수 없습니다.<br />
                                        선생님에게 문의해 주세요.
                                    </p>
                                </div>
                            ) : homeworkList.length === 0 ? (
                                <div style={{ ...gc, padding: 60, textAlign: "center" }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 56, color: "#cbd5e1" }}>assignment_turned_in</span>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#94a3b8", marginTop: 12 }}>현재 숙제가 없습니다</h3>
                                    <p style={{ fontSize: 13, color: "#cbd5e1", marginTop: 4 }}>새로운 숙제가 나오면 여기에 표시됩니다.</p>
                                </div>
                            ) : (
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {homeworkList.map(hw => {
                                        const sub = submissions.find(s => s.homework_id === hw.id);
                                        const isOverdue = !sub && hw.due_date && new Date(hw.due_date) < new Date();
                                        const isSubmitted = !!sub;
                                        const isGraded = isSubmitted && sub.score !== null;

                                        return (
                                            <div key={hw.id} style={{ ...gc, padding: 20, borderLeft: `4px solid ${isSubmitted ? "#22c55e" : isOverdue ? "#ef4444" : BLUE.primary}` }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                                                    <div>
                                                        <h4 style={{ fontSize: 15, fontWeight: 700, color: BLUE.textDark, marginBottom: 4 }}>{hw.title}</h4>
                                                        {hw.description && (
                                                            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.5 }}>
                                                                {hw.description.length > 100 ? hw.description.slice(0, 100) + "..." : hw.description}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <span style={{
                                                        fontSize: 11,
                                                        fontWeight: 700,
                                                        padding: "4px 12px",
                                                        borderRadius: 20,
                                                        whiteSpace: "nowrap",
                                                        background: isSubmitted ? "rgba(34,197,94,0.1)" : isOverdue ? "rgba(239,68,68,0.1)" : "rgba(59,130,246,0.1)",
                                                        color: isSubmitted ? "#22c55e" : isOverdue ? "#ef4444" : BLUE.primary,
                                                    }}>
                                                        {isSubmitted ? "제출완료" : isOverdue ? "기한초과" : "미제출"}
                                                    </span>
                                                </div>
                                                <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#94a3b8" }}>
                                                    {hw.due_date && (
                                                        <span>
                                                            <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 4 }}>event</span>
                                                            마감: {formatDate(hw.due_date)}
                                                        </span>
                                                    )}
                                                    <span>
                                                        <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 4 }}>schedule</span>
                                                        출제: {timeAgo(hw.created_at)}
                                                    </span>
                                                </div>
                                                {isSubmitted && isGraded && (
                                                    <div style={{ marginTop: 10, padding: "8px 14px", borderRadius: 10, background: "#f0fdf4", display: "flex", alignItems: "center", gap: 8 }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#22c55e" }}>check_circle</span>
                                                        <span style={{ fontSize: 13, fontWeight: 700, color: "#16a34a" }}>
                                                            {sub.score}점
                                                        </span>
                                                        {sub.feedback && (
                                                            <span style={{ fontSize: 12, color: "#64748b", marginLeft: 8 }}> — {sub.feedback}</span>
                                                        )}
                                                    </div>
                                                )}
                                                {isSubmitted && !isGraded && (
                                                    <div style={{ marginTop: 10, padding: "8px 14px", borderRadius: 10, background: "#fffbeb", display: "flex", alignItems: "center", gap: 8 }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#f59e0b" }}>hourglass_top</span>
                                                        <span style={{ fontSize: 12, color: "#d97706", fontWeight: 600 }}>채점 대기 중</span>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ══════════ TAB 3: 성장 추이 ══════════ */}
                    {activeTab === "growth" && (
                        <motion.div key="growth" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {/* Stats cards */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 16 }}>
                                <div style={{ ...gc, padding: 18 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 20, color: BLUE.primary, width: 36, height: 36, borderRadius: 10, background: BLUE.light, display: "flex", alignItems: "center", justifyContent: "center" }}>terminal</span>
                                        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>이번 주 코딩</span>
                                    </div>
                                    <div style={{ fontSize: 28, fontWeight: 800, color: BLUE.primary }}>{thisWeekSessions}회</div>
                                </div>
                                <div style={{ ...gc, padding: 18 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#22c55e", width: 36, height: 36, borderRadius: 10, background: "#dcfce7", display: "flex", alignItems: "center", justifyContent: "center" }}>school</span>
                                        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>전체 진도</span>
                                    </div>
                                    <div style={{ fontSize: 28, fontWeight: 800, color: "#22c55e" }}>{totalCoursePct}%</div>
                                </div>
                                <div style={{ ...gc, padding: 18 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#f59e0b", width: 36, height: 36, borderRadius: 10, background: "#fef3c7", display: "flex", alignItems: "center", justifyContent: "center" }}>star</span>
                                        <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>레벨</span>
                                    </div>
                                    <div style={{ fontSize: 28, fontWeight: 800, color: "#f59e0b" }}>Lv.{student.level}</div>
                                </div>
                            </div>

                            {/* Weekly coding chart */}
                            <div style={{ ...gc, padding: 20, marginBottom: 16 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: BLUE.textDark, marginBottom: 16 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: "middle", marginRight: 6 }}>bar_chart</span>
                                    이번 주 코딩 활동
                                </h3>
                                <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 120, padding: "0 8px" }}>
                                    {weekDates.map((dateStr, i) => {
                                        const count = weekCodeCounts[i];
                                        const height = count > 0 ? Math.max((count / maxWeekCode) * 100, 8) : 4;
                                        const isToday = dateStr === todayStr;
                                        return (
                                            <div key={dateStr} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                                <span style={{ fontSize: 10, fontWeight: 700, color: count > 0 ? BLUE.primary : "#cbd5e1" }}>
                                                    {count > 0 ? count : ""}
                                                </span>
                                                <div style={{
                                                    width: "100%",
                                                    maxWidth: 40,
                                                    height,
                                                    borderRadius: 6,
                                                    background: count > 0
                                                        ? (isToday ? `linear-gradient(180deg,${BLUE.primary},${BLUE.dark})` : BLUE.light)
                                                        : "#f1f5f9",
                                                    transition: "height 0.3s",
                                                }} />
                                                <span style={{ fontSize: 10, color: isToday ? BLUE.primary : "#94a3b8", fontWeight: isToday ? 700 : 400 }}>
                                                    {DAY_NAMES[(new Date(dateStr).getDay())]}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Weekly XP chart */}
                            <div style={{ ...gc, padding: 20, marginBottom: 16 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: BLUE.textDark, marginBottom: 16 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: "middle", marginRight: 6 }}>emoji_events</span>
                                    주간 XP 획득
                                </h3>
                                <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 100, padding: "0 8px" }}>
                                    {weeklyXp.map((w, i) => {
                                        const height = w.amount > 0 ? Math.max((w.amount / maxWeeklyXp) * 80, 8) : 4;
                                        return (
                                            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                                <span style={{ fontSize: 10, fontWeight: 700, color: w.amount > 0 ? "#22c55e" : "#cbd5e1" }}>
                                                    {w.amount > 0 ? `+${w.amount}` : ""}
                                                </span>
                                                <div style={{
                                                    width: "100%",
                                                    maxWidth: 48,
                                                    height,
                                                    borderRadius: 6,
                                                    background: w.amount > 0 ? "linear-gradient(180deg,#22c55e,#16a34a)" : "#f1f5f9",
                                                    transition: "height 0.3s",
                                                }} />
                                                <span style={{ fontSize: 10, color: "#94a3b8" }}>{w.label}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Course progress */}
                            <div style={{ ...gc, padding: 20 }}>
                                <h3 style={{ fontSize: 14, fontWeight: 700, color: BLUE.textDark, marginBottom: 16 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: "middle", marginRight: 6 }}>menu_book</span>
                                    과목별 진도
                                </h3>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {COURSES.filter(c => c.chapters[0]?.id !== "coming-soon").map(c => {
                                        const p = studyProgress.find(pr => pr.course_id === c.id);
                                        const total = getAllUnits(c.id).length;
                                        const done = p?.completed_units?.length || 0;
                                        const pct = total > 0 ? Math.round(done / total * 100) : 0;
                                        return (
                                            <div key={c.id} style={{ padding: "14px 16px", borderRadius: 14, background: "#f8fafc" }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                                    <span style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>{c.title}</span>
                                                    <span style={{ fontSize: 12, fontWeight: 700, color: pct >= 100 ? "#22c55e" : BLUE.primary }}>{pct}%</span>
                                                </div>
                                                <div style={{ height: 8, borderRadius: 4, background: "#e2e8f0", overflow: "hidden" }}>
                                                    <div style={{ width: `${pct}%`, height: "100%", borderRadius: 4, background: pct >= 100 ? "linear-gradient(90deg,#22c55e,#10b981)" : `linear-gradient(90deg,${BLUE.primary},${BLUE.dark})`, transition: "width 0.5s" }} />
                                                </div>
                                                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 4 }}>{done}/{total} 유닛 완료</div>
                                            </div>
                                        );
                                    })}
                                    {COURSES.filter(c => c.chapters[0]?.id !== "coming-soon").length === 0 && (
                                        <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: 20 }}>등록된 과목이 없습니다.</p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* ══════════ TAB 4: 선생님 코멘트 ══════════ */}
                    {activeTab === "comments" && (
                        <motion.div key="comments" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {/* Teacher feedbacks */}
                            <div style={{ ...gc, padding: 20, marginBottom: 16 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: BLUE.textDark, marginBottom: 16 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 18, verticalAlign: "middle", marginRight: 6, color: BLUE.primary }}>comment</span>
                                    선생님 코멘트 ({teacherFeedbacks.length}건)
                                </h3>
                                {teacherFeedbacks.length === 0 ? (
                                    <div style={{ padding: 40, textAlign: "center" }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 48, color: "#cbd5e1" }}>speaker_notes_off</span>
                                        <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 12 }}>아직 선생님 코멘트가 없습니다.</p>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        {teacherFeedbacks.map(fb => {
                                            const catStyle = CATEGORY_COLORS[fb.category] || { bg: BLUE.light, text: BLUE.dark };
                                            return (
                                                <div key={fb.id} style={{ padding: "14px 16px", borderRadius: 14, background: "#f8fafc", borderLeft: `3px solid ${BLUE.primary}` }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                            <span className="material-symbols-outlined" style={{ fontSize: 16, color: BLUE.primary }}>person</span>
                                                            <span style={{ fontSize: 12, fontWeight: 700, color: "#334155" }}>{fb.teacher_name || "선생님"}</span>
                                                            {fb.category && (
                                                                <span style={{
                                                                    fontSize: 10,
                                                                    fontWeight: 700,
                                                                    padding: "2px 10px",
                                                                    borderRadius: 12,
                                                                    background: catStyle.bg,
                                                                    color: catStyle.text,
                                                                }}>
                                                                    {fb.category}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <span style={{ fontSize: 10, color: "#94a3b8" }}>{timeAgo(fb.created_at)}</span>
                                                    </div>
                                                    <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{fb.content}</p>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            {/* Parent reply */}
                            <div style={{ ...gc, padding: 20, marginBottom: 16 }}>
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: BLUE.textDark, marginBottom: 12 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 18, verticalAlign: "middle", marginRight: 6, color: BLUE.primary }}>reply</span>
                                    답변 보내기
                                </h3>
                                <textarea
                                    value={replyText}
                                    onChange={e => setReplyText(e.target.value)}
                                    placeholder="선생님께 전달할 내용을 작성하세요..."
                                    style={{ width: "100%", minHeight: 80, padding: "12px 14px", borderRadius: 12, border: "1px solid #e2e8f0", fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.6, boxSizing: "border-box" }}
                                />
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                                    <span style={{ fontSize: 11, color: "#94a3b8" }}>작성자: {parentName || "(이름 미설정)"}</span>
                                    <motion.button
                                        whileHover={{ scale: 1.03 }}
                                        whileTap={{ scale: 0.97 }}
                                        onClick={sendReply}
                                        disabled={replySending || !replyText.trim() || !parentName}
                                        style={{
                                            padding: "10px 24px",
                                            borderRadius: 10,
                                            border: "none",
                                            cursor: !replyText.trim() || !parentName ? "not-allowed" : "pointer",
                                            background: !replyText.trim() || !parentName ? "#e2e8f0" : `linear-gradient(135deg,${BLUE.primary},${BLUE.dark})`,
                                            color: !replyText.trim() || !parentName ? "#94a3b8" : "#fff",
                                            fontWeight: 700,
                                            fontSize: 13,
                                        }}
                                    >
                                        {replySending ? "보내는 중..." : "보내기"}
                                    </motion.button>
                                </div>
                            </div>

                            {/* Sent feedbacks */}
                            {parentFeedbacks.length > 0 && (
                                <div style={{ ...gc, padding: 20 }}>
                                    <h3 style={{ fontSize: 14, fontWeight: 700, color: BLUE.textDark, marginBottom: 14 }}>
                                        보낸 메시지 ({parentFeedbacks.length}건)
                                    </h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        {parentFeedbacks.map(f => (
                                            <div key={f.id} style={{ padding: "10px 14px", borderRadius: 12, background: "#f0f9ff", borderLeft: `3px solid ${BLUE.light}` }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                                    <span style={{ fontSize: 11, fontWeight: 600, color: BLUE.primary }}>{f.parent_name}</span>
                                                    <span style={{ fontSize: 10, color: "#94a3b8" }}>{timeAgo(f.created_at)}</span>
                                                </div>
                                                <p style={{ fontSize: 12, color: "#334155", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{f.content}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* ══════════ TAB 5: 수업 일정 ══════════ */}
                    {activeTab === "schedule" && (
                        <motion.div key="schedule" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {schedules.length === 0 ? (
                                <div style={{ ...gc, padding: 60, textAlign: "center" }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 56, color: "#cbd5e1" }}>calendar_month</span>
                                    <h3 style={{ fontSize: 16, fontWeight: 700, color: "#94a3b8", marginTop: 12 }}>등록된 수업 일정이 없습니다</h3>
                                    <p style={{ fontSize: 13, color: "#cbd5e1", marginTop: 4 }}>선생님이 일정을 등록하면 여기에 표시됩니다.</p>
                                </div>
                            ) : (
                                <>
                                    {/* Next class highlight */}
                                    {sortedSchedules.length > 0 && (
                                        <div style={{ ...gc, padding: 20, marginBottom: 16, borderLeft: `4px solid ${BLUE.primary}` }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                                <span className="material-symbols-outlined" style={{ fontSize: 22, color: BLUE.primary }}>notifications_active</span>
                                                <span style={{ fontSize: 13, fontWeight: 700, color: BLUE.primary }}>다음 수업</span>
                                            </div>
                                            <h3 style={{ fontSize: 18, fontWeight: 800, color: BLUE.textDark, marginBottom: 6 }}>
                                                {sortedSchedules[0].title}
                                            </h3>
                                            <div style={{ display: "flex", gap: 16, fontSize: 13, color: "#64748b" }}>
                                                <span>
                                                    <span className="material-symbols-outlined" style={{ fontSize: 15, verticalAlign: "middle", marginRight: 4 }}>calendar_today</span>
                                                    {DAY_NAMES[sortedSchedules[0].day_of_week]}요일
                                                </span>
                                                <span>
                                                    <span className="material-symbols-outlined" style={{ fontSize: 15, verticalAlign: "middle", marginRight: 4 }}>schedule</span>
                                                    {formatTime(sortedSchedules[0].start_time)} - {formatTime(sortedSchedules[0].end_time)}
                                                </span>
                                                {sortedSchedules[0].room && (
                                                    <span>
                                                        <span className="material-symbols-outlined" style={{ fontSize: 15, verticalAlign: "middle", marginRight: 4 }}>meeting_room</span>
                                                        {sortedSchedules[0].room}
                                                    </span>
                                                )}
                                            </div>
                                            {sortedSchedules[0].teacher_name && (
                                                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 6 }}>
                                                    <span className="material-symbols-outlined" style={{ fontSize: 14, verticalAlign: "middle", marginRight: 4 }}>person</span>
                                                    {sortedSchedules[0].teacher_name} 선생님
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Weekly calendar */}
                                    <div style={{ ...gc, padding: 20 }}>
                                        <h3 style={{ fontSize: 14, fontWeight: 700, color: BLUE.textDark, marginBottom: 16 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 16, verticalAlign: "middle", marginRight: 6 }}>view_week</span>
                                            주간 시간표
                                        </h3>
                                        <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6 }}>
                                            {DAY_NAMES.map((day, i) => {
                                                const daySchedules = schedules.filter(s => s.day_of_week === i);
                                                const isToday = i === currentDayOfWeek;
                                                return (
                                                    <div key={i} style={{
                                                        padding: "10px 6px",
                                                        borderRadius: 12,
                                                        background: isToday ? BLUE.light : "#f8fafc",
                                                        border: isToday ? `2px solid ${BLUE.primary}` : "2px solid transparent",
                                                        textAlign: "center",
                                                        minHeight: 80,
                                                    }}>
                                                        <div style={{
                                                            fontSize: 12,
                                                            fontWeight: 700,
                                                            color: isToday ? BLUE.primary : "#94a3b8",
                                                            marginBottom: 8,
                                                        }}>
                                                            {day}
                                                        </div>
                                                        {daySchedules.length === 0 ? (
                                                            <span style={{ fontSize: 10, color: "#cbd5e1" }}>-</span>
                                                        ) : (
                                                            daySchedules.map(s => (
                                                                <div key={s.id} style={{
                                                                    fontSize: 10,
                                                                    padding: "4px 4px",
                                                                    borderRadius: 6,
                                                                    background: isToday ? BLUE.primary : "#e2e8f0",
                                                                    color: isToday ? "#fff" : "#334155",
                                                                    marginBottom: 4,
                                                                    fontWeight: 600,
                                                                    lineHeight: 1.3,
                                                                }}>
                                                                    <div>{s.title}</div>
                                                                    <div style={{ opacity: 0.8, fontSize: 9 }}>{formatTime(s.start_time)}</div>
                                                                </div>
                                                            ))
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Full schedule list */}
                                    <div style={{ ...gc, padding: 20, marginTop: 16 }}>
                                        <h3 style={{ fontSize: 14, fontWeight: 700, color: BLUE.textDark, marginBottom: 14 }}>전체 수업 목록</h3>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                            {schedules.map(s => (
                                                <div key={s.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 12, background: s.day_of_week === currentDayOfWeek ? BLUE.light : "#f8fafc" }}>
                                                    <div style={{
                                                        width: 40,
                                                        height: 40,
                                                        borderRadius: 12,
                                                        background: s.day_of_week === currentDayOfWeek ? BLUE.primary : "#e2e8f0",
                                                        color: s.day_of_week === currentDayOfWeek ? "#fff" : "#64748b",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        fontWeight: 800,
                                                        fontSize: 14,
                                                        flexShrink: 0,
                                                    }}>
                                                        {DAY_NAMES[s.day_of_week]}
                                                    </div>
                                                    <div style={{ flex: 1 }}>
                                                        <div style={{ fontSize: 13, fontWeight: 700, color: "#334155" }}>{s.title}</div>
                                                        <div style={{ fontSize: 11, color: "#94a3b8" }}>
                                                            {formatTime(s.start_time)} - {formatTime(s.end_time)}
                                                            {s.room && ` · ${s.room}`}
                                                            {s.teacher_name && ` · ${s.teacher_name}`}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )}

                    {/* ══════════ TAB 6: 출결 ══════════ */}
                    {activeTab === "attendance" && (
                        <motion.div key="attendance" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            {/* Stats */}
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 10, marginBottom: 16 }}>
                                <div style={{ ...gc, padding: 16, textAlign: "center" }}>
                                    <div style={{ fontSize: 26, fontWeight: 800, color: "#22c55e" }}>{attendanceRate}%</div>
                                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>출석률</div>
                                </div>
                                <div style={{ ...gc, padding: 16, textAlign: "center" }}>
                                    <div style={{ fontSize: 26, fontWeight: 800, color: "#22c55e" }}>{presentCount}</div>
                                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>출석</div>
                                </div>
                                <div style={{ ...gc, padding: 16, textAlign: "center" }}>
                                    <div style={{ fontSize: 26, fontWeight: 800, color: "#f59e0b" }}>{lateCount}</div>
                                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>지각</div>
                                </div>
                                <div style={{ ...gc, padding: 16, textAlign: "center" }}>
                                    <div style={{ fontSize: 26, fontWeight: 800, color: "#ef4444" }}>{absentCount}</div>
                                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>결석</div>
                                </div>
                            </div>

                            {/* Calendar */}
                            <div style={{ ...gc, padding: 20 }}>
                                {/* Month navigation */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                                    <button aria-label="이전 달" onClick={() => {
                                        if (attMonth === 0) { setAttMonth(11); setAttYear(attYear - 1); }
                                        else setAttMonth(attMonth - 1);
                                    }} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#64748b" }}>chevron_left</span>
                                    </button>
                                    <h3 style={{ fontSize: 16, fontWeight: 800, color: BLUE.textDark }}>
                                        {attYear}년 {attMonth + 1}월
                                    </h3>
                                    <button aria-label="다음 달" onClick={() => {
                                        if (attMonth === 11) { setAttMonth(0); setAttYear(attYear + 1); }
                                        else setAttMonth(attMonth + 1);
                                    }} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8 }}>
                                        <span className="material-symbols-outlined" style={{ fontSize: 22, color: "#64748b" }}>chevron_right</span>
                                    </button>
                                </div>

                                {/* Day headers */}
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2, marginBottom: 4 }}>
                                    {DAY_NAMES.map(d => (
                                        <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: "#94a3b8", padding: "6px 0" }}>
                                            {d}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar grid */}
                                <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
                                    {monthDates.map((cell, i) => {
                                        const status = attendanceMap[cell.date];
                                        const dotColor = status === "present" ? "#22c55e" : status === "late" ? "#f59e0b" : status === "absent" ? "#ef4444" : null;
                                        const isTodayCell = cell.date === todayStr;
                                        return (
                                            <div key={i} style={{
                                                textAlign: "center",
                                                padding: "8px 4px",
                                                borderRadius: 8,
                                                background: isTodayCell ? BLUE.light : "transparent",
                                                opacity: cell.isCurrentMonth ? 1 : 0.3,
                                            }}>
                                                <div style={{
                                                    fontSize: 12,
                                                    fontWeight: isTodayCell ? 800 : 400,
                                                    color: isTodayCell ? BLUE.primary : "#334155",
                                                    marginBottom: 4,
                                                }}>
                                                    {cell.day}
                                                </div>
                                                {dotColor && (
                                                    <div style={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: "50%",
                                                        background: dotColor,
                                                        margin: "0 auto",
                                                    }} />
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                {/* Legend */}
                                <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 16, paddingTop: 12, borderTop: "1px solid #f1f5f9" }}>
                                    {[
                                        { color: "#22c55e", label: "출석" },
                                        { color: "#f59e0b", label: "지각" },
                                        { color: "#ef4444", label: "결석" },
                                    ].map(item => (
                                        <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: item.color }} />
                                            <span style={{ fontSize: 11, color: "#64748b" }}>{item.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent attendance list */}
                            {attendance.length > 0 && (
                                <div style={{ ...gc, padding: 20, marginTop: 16 }}>
                                    <h3 style={{ fontSize: 14, fontWeight: 700, color: BLUE.textDark, marginBottom: 14 }}>최근 출결 기록</h3>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                        {attendance.slice(0, 10).map(a => {
                                            const s = a.note || "present";
                                            const isPresent = s === "present" || (!s.includes("지각") && !s.includes("late") && !s.includes("결석") && !s.includes("absent"));
                                            const isLate = s.includes("지각") || s.includes("late");
                                            const statusColor = isLate ? "#f59e0b" : isPresent ? "#22c55e" : "#ef4444";
                                            const statusLabel = isLate ? "지각" : isPresent ? "출석" : "결석";
                                            return (
                                                <div key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderRadius: 10, background: "#f8fafc" }}>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: statusColor, flexShrink: 0 }} />
                                                        <span style={{ fontSize: 13, color: "#334155" }}>{formatDate(a.check_date)}</span>
                                                    </div>
                                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                                        {a.check_in_time && (
                                                            <span style={{ fontSize: 11, color: "#94a3b8" }}>
                                                                {formatTime(a.check_in_time)}
                                                                {a.check_out_time ? ` - ${formatTime(a.check_out_time)}` : ""}
                                                            </span>
                                                        )}
                                                        <span style={{ fontSize: 11, fontWeight: 700, color: statusColor, padding: "2px 10px", borderRadius: 12, background: `${statusColor}15` }}>
                                                            {statusLabel}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            )}

                            {attendance.length === 0 && (
                                <div style={{ ...gc, padding: 48, textAlign: "center", marginTop: 16 }}>
                                    <span className="material-symbols-outlined" style={{ fontSize: 48, color: "#cbd5e1" }}>event_available</span>
                                    <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 12 }}>출결 기록이 없습니다.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
