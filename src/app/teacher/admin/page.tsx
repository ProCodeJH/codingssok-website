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
    const [activeTab, setActiveTab] = useState<"students" | "add" | "content" | "notify">("students");
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
            console.error("학생 목록 로드 실패:", err);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchStudents(); }, [fetchStudents]);

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

            setAddMsg({ ok: true, text: `✅ "${trimmedName}" 학생이 추가되었습니다!` });
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
            console.error("삭제 실패:", err);
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
                <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#6366f1", animation: "spin 1s linear infinite" }}>progress_activity</span>
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
                    <h1 style={{ fontSize: 18, fontWeight: 800, color: "#1e1b4b" }}>👨‍🏫 선생님 관리 패널</h1>
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
                        { id: "students" as const, icon: "👥", label: "학생 목록" },
                        { id: "add" as const, icon: "➕", label: "학생 추가" },
                        { id: "content" as const, icon: "📝", label: "콘텐츠 관리" },
                        { id: "notify" as const, icon: "📢", label: "알림 발송" },
                    ]).map(tab => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                            flex: 1, padding: "10px 16px", borderRadius: 10, border: "none", cursor: "pointer",
                            background: activeTab === tab.id ? "#4F46E5" : "transparent",
                            color: activeTab === tab.id ? "#fff" : "#64748b",
                            fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                        }}>
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* ═══ Students List Tab ═══ */}
                {activeTab === "students" && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        {/* Summary cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 24 }}>
                            {[
                                { label: "전체 학생", value: students.length, icon: "👥", color: "#4F46E5" },
                                { label: "이번 달 추가", value: students.filter(s => new Date(s.created_at).getMonth() === new Date().getMonth()).length, icon: "🆕", color: "#059669" },
                                { label: "학년 분포", value: [...new Set(students.map(s => s.grade).filter(Boolean))].length + "개", icon: "📊", color: "#F59E0B" },
                            ].map(s => (
                                <div key={s.label} style={{
                                    background: "#fff", borderRadius: 14, padding: "16px", border: "1px solid #e2e8f0",
                                }}>
                                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 4 }}>{s.icon} {s.label}</div>
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
                                        <div style={{ fontWeight: 700, fontSize: 14, color: "#1e1b4b" }}>{student.name}</div>
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
                            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#1e1b4b", marginBottom: 8, textAlign: "center" }}>
                                ➕ 새 학생 추가
                            </h3>
                            <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", marginBottom: 28 }}>
                                학생 정보를 입력하면 로그인 계정이 자동 생성됩니다
                            </p>

                            <form onSubmit={handleAddStudent} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                {/* 이름 */}
                                <div>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                                        👤 이름 <span style={{ color: "#EF4444" }}>*</span>
                                    </label>
                                    <input
                                        type="text" value={newName} onChange={e => setNewName(e.target.value)}
                                        required placeholder="홍길동"
                                        style={{
                                            display: "block", width: "100%", padding: "13px 16px",
                                            border: "2px solid #e5e7eb", borderRadius: 14,
                                            fontSize: 15, outline: "none", boxSizing: "border-box",
                                        }}
                                        onFocus={e => e.target.style.borderColor = "#6366f1"}
                                        onBlur={e => e.target.style.borderColor = "#e5e7eb"}
                                    />
                                </div>

                                {/* 생년월일 */}
                                <div>
                                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 8 }}>
                                        🎂 생년월일 <span style={{ color: "#EF4444" }}>*</span>
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
                                            📚 학년
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
                                            🏫 반
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
                                        😊 아바타
                                    </label>
                                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                        {["🧒", "👦", "👧", "🧑", "👶", "🐱", "🐶", "🦊", "🐰", "🐻", "🐼", "🦁"].map(emoji => (
                                            <button
                                                key={emoji} type="button"
                                                onClick={() => setNewAvatar(emoji)}
                                                style={{
                                                    width: 44, height: 44, borderRadius: 12, border: newAvatar === emoji ? "2px solid #6366f1" : "2px solid #e5e7eb",
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
                                        background: "#4F46E5", color: "#fff",
                                        fontWeight: 700, fontSize: 15, cursor: addLoading ? "not-allowed" : "pointer",
                                        opacity: addLoading ? 0.7 : 1, width: "100%",
                                    }}
                                >
                                    {addLoading ? "추가 중..." : "✅ 학생 추가하기"}
                                </button>
                            </form>
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
                                                <div style={{ fontWeight: 700, fontSize: 14, color: "#1e1b4b" }}>{course.title}</div>
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
                                                                background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center",
                                                                fontSize: 11, fontWeight: 700, color: "#4F46E5",
                                                            }}>{idx + 1}</span>
                                                            <span style={{ flex: 1, fontSize: 13, fontWeight: 500, color: "#334155" }}>{unit.title}</span>
                                                            <span style={{ fontSize: 11, color: "#94a3b8" }}>
                                                                {unit.type === "이론" ? "📖 강의" : "✏️ 실습"} · {(unit.problems?.length || 0)}문제
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
                            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#1e1b4b", marginBottom: 16 }}>📢 전체 공지</h3>

                            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
                                {[
                                    "📚 오늘 숙제 잊지 마세요!",
                                    "🎉 이번 주 수업 잘했어요!",
                                    "⏰ 내일 수업이 있습니다",
                                    "🏆 코딩 대회 참가 안내",
                                ].map(tmpl => (
                                    <button key={tmpl} onClick={() => setNotifyMsg(tmpl)} style={{
                                        padding: "6px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
                                        background: "#f8fafc", fontSize: 11, fontWeight: 600,
                                        color: "#4F46E5", cursor: "pointer",
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
                                    background: notifyMsg.trim() ? "#4F46E5" : "#e2e8f0",
                                    color: notifyMsg.trim() ? "#fff" : "#94a3b8",
                                    fontWeight: 700, fontSize: 14, cursor: notifyMsg.trim() ? "pointer" : "default",
                                    width: "100%",
                                }}
                            >
                                {notifySent ? "✅ 발송 완료!" : "📤 전체 학생에게 발송"}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}
