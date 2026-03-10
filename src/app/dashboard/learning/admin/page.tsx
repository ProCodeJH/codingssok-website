"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

/* ── Types ── */
interface Student {
    id: string;
    name: string;
    birthday: string;
    grade: string | null;
    class: string | null;
    avatar: string | null;
}

interface XPLog {
    id: string;
    amount: number;
    reason: string;
    created_at: string;
}

/* ── Material Icon shortcut ── */
function MI({ icon, style }: { icon: string; style?: React.CSSProperties }) {
    return <span className="material-symbols-outlined" style={style}>{icon}</span>;
}

export default function AdminPage() {
    const { user } = useAuth();
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [xpAmount, setXpAmount] = useState(10);
    const [xpReason, setXpReason] = useState("");
    const [xpLogs, setXpLogs] = useState<XPLog[]>([]);
    const [editName, setEditName] = useState("");
    const [editGrade, setEditGrade] = useState("");
    const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

    const supabase = useMemo(() => createClient(), []);

    /* ── 권한 체크 ── */
    if (user?.role !== "teacher") {
        return (
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                minHeight: 400, fontFamily: "'Space Grotesk', sans-serif",
            }}>
                <div style={{
                    background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
                    borderRadius: 20, padding: "40px 32px", textAlign: "center",
                    border: "1px solid rgba(255,255,255,0.9)",
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                }}>
                    <MI icon="lock" style={{ fontSize: 48, color: "#94a3b8", marginBottom: 16, display: "block" }} />
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1e293b", margin: "0 0 8px" }}>접근 권한 없음</h2>
                    <p style={{ fontSize: 13, color: "#64748b" }}>관리자 계정으로 로그인해주세요.</p>
                </div>
            </div>
        );
    }

    /* ── 학생 목록 로드 ── */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        async function loadStudents() {
            try {
                const { data, error } = await supabase
                    .from("students")
                    .select("id, name, birthday, grade, class, avatar")
                    .order("name");
                if (error) throw error;
                setStudents(data || []);
            } catch (e) {
                console.error("Failed to load students:", e);
            } finally {
                setLoading(false);
            }
        }
        loadStudents();
    }, [supabase]);

    /* ── 학생 선택 시 XP 로그 로드 ── */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const selectStudent = useCallback(async (s: Student) => {
        setSelectedStudent(s);
        setEditName(s.name);
        setEditGrade(s.grade || "");
        setMsg(null);
        try {
            const { data } = await supabase
                .from("xp_logs")
                .select("id, amount, reason, created_at")
                .eq("user_id", s.id)
                .order("created_at", { ascending: false })
                .limit(10);
            setXpLogs(data || []);
        } catch { setXpLogs([]); }
    }, [supabase]);

    /* ── XP 부여 ── */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const grantXP = useCallback(async () => {
        if (!selectedStudent || xpAmount <= 0) return;
        try {
            const { error } = await supabase.from("xp_logs").insert({
                user_id: selectedStudent.id,
                amount: xpAmount,
                reason: xpReason || "관리자 부여",
            });
            if (error) throw error;

            const { data: progress } = await supabase
                .from("user_progress")
                .select("xp")
                .eq("user_id", selectedStudent.id)
                .single();

            if (progress) {
                await supabase.from("user_progress")
                    .update({ xp: (progress.xp || 0) + xpAmount })
                    .eq("user_id", selectedStudent.id);
            }

            setMsg({ ok: true, text: `${selectedStudent.name}에게 +${xpAmount} XP 부여 완료!` });
            setXpReason("");
            selectStudent(selectedStudent);
        } catch (e: unknown) {
            setMsg({ ok: false, text: `오류: ${e instanceof Error ? e.message : String(e)}` });
        }
    }, [selectedStudent, xpAmount, xpReason, supabase, selectStudent]);

    /* ── 프로필 수정 ── */
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const updateProfile = useCallback(async () => {
        if (!selectedStudent) return;
        try {
            const { error } = await supabase
                .from("students")
                .update({ name: editName, grade: editGrade || null })
                .eq("id", selectedStudent.id);
            if (error) throw error;
            setMsg({ ok: true, text: "프로필 수정 완료!" });
            setStudents(prev => prev.map(s => s.id === selectedStudent.id
                ? { ...s, name: editName, grade: editGrade || null } : s));
            setSelectedStudent(prev => prev ? { ...prev, name: editName, grade: editGrade || null } : null);
        } catch (e: unknown) {
            setMsg({ ok: false, text: `오류: ${e instanceof Error ? e.message : String(e)}` });
        }
    }, [selectedStudent, editName, editGrade, supabase]);

    /* ── 필터링 ── */
    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase())
    );

    const cardStyle: React.CSSProperties = {
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.9)",
        boxShadow: "0 20px 40px rgba(0,0,0,0.08), inset 0 0 30px rgba(147,197,253,0.15)",
        borderRadius: 20,
    };

    return (
        <div style={{
            fontFamily: "'Space Grotesk', 'Pretendard', sans-serif",
            color: "#0f172a",
            minHeight: "calc(100vh - 200px)",
        }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: 24 }}
            >
                <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", margin: "0 0 4px" }}>
                    <MI icon="admin_panel_settings" style={{ fontSize: 28, marginRight: 8, verticalAlign: "middle", color: "#2563eb" }} />
                    학생 관리
                </h1>
                <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>
                    학생 프로필 편집, XP 부여, 활동 내역 확인
                </p>
            </motion.div>

            <div style={{ display: "grid", gridTemplateColumns: selectedStudent ? "1fr 1fr" : "1fr", gap: 24 }}>
                {/* ── 학생 목록 ── */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    style={{ ...cardStyle, padding: 24 }}
                >
                    <div style={{ position: "relative", marginBottom: 16 }}>
                        <MI icon="search" style={{
                            position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)",
                            color: "#94a3b8", fontSize: 18,
                        }} />
                        <input
                            type="text"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            placeholder="학생 이름 검색..."
                            style={{
                                width: "100%", padding: "10px 16px 10px 40px",
                                border: "1px solid #e2e8f0", borderRadius: 12,
                                fontSize: 13, outline: "none", background: "rgba(241,245,249,0.5)",
                                boxSizing: "border-box",
                            }}
                        />
                    </div>

                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600, marginBottom: 12 }}>
                        총 {filtered.length}명
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 500, overflowY: "auto" }}>
                        {loading ? (
                            <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
                                <MI icon="progress_activity" style={{ fontSize: 24, animation: "spin 1s linear infinite" }} />
                            </div>
                        ) : filtered.length === 0 ? (
                            <div style={{ textAlign: "center", padding: 40, color: "#94a3b8", fontSize: 13 }}>
                                검색 결과 없음
                            </div>
                        ) : filtered.map((s) => (
                            <motion.button
                                key={s.id}
                                onClick={() => selectStudent(s)}
                                whileHover={{ x: 4 }}
                                style={{
                                    display: "flex", alignItems: "center", gap: 12,
                                    padding: "10px 14px", borderRadius: 12, border: "none",
                                    background: selectedStudent?.id === s.id
                                        ? "linear-gradient(135deg, rgba(14,165,233,0.08), rgba(99,102,241,0.06))"
                                        : "transparent",
                                    cursor: "pointer", textAlign: "left", width: "100%",
                                    transition: "all 0.2s",
                                }}
                            >
                                <div style={{
                                    width: 36, height: 36, borderRadius: 10,
                                    background: selectedStudent?.id === s.id
                                        ? "linear-gradient(135deg, #0ea5e9, #6366f1)"
                                        : "#e2e8f0",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: selectedStudent?.id === s.id ? "#fff" : "#64748b",
                                    fontWeight: 700, fontSize: 14, flexShrink: 0,
                                }}>
                                    {s.avatar || s.name[0]}
                                </div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{
                                        fontSize: 13, fontWeight: 700,
                                        color: selectedStudent?.id === s.id ? "#0369a1" : "#1e293b",
                                    }}>{s.name}</div>
                                    <div style={{ fontSize: 11, color: "#94a3b8" }}>
                                        {s.birthday} {s.grade ? `· ${s.grade}` : ""}
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </div>
                </motion.div>

                {/* ── 학생 상세 ── */}
                <AnimatePresence>
                    {selectedStudent && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            style={{ ...cardStyle, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 14,
                                    background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#fff", fontWeight: 800, fontSize: 20,
                                    boxShadow: "0 8px 24px rgba(14,165,233,0.3)",
                                }}>
                                    {selectedStudent.avatar || selectedStudent.name[0]}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{selectedStudent.name}</h3>
                                    <p style={{ fontSize: 12, color: "#64748b", margin: 0 }}>
                                        {selectedStudent.birthday} {selectedStudent.grade ? `· ${selectedStudent.grade}` : ""}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedStudent(null)}
                                    style={{
                                        marginLeft: "auto", background: "#f1f5f9", border: "none",
                                        borderRadius: 8, padding: 6, cursor: "pointer",
                                    }}
                                >
                                    <MI icon="close" style={{ fontSize: 16, color: "#64748b" }} />
                                </button>
                            </div>

                            {msg && (
                                <div style={{
                                    padding: "10px 14px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                                    background: msg.ok ? "#dcfce7" : "#fef2f2",
                                    color: msg.ok ? "#059669" : "#dc2626",
                                    border: `1px solid ${msg.ok ? "#86efac" : "#fca5a5"}`,
                                }}>
                                    {msg.text}
                                </div>
                            )}

                            {/* Profile Edit */}
                            <div>
                                <h4 style={{ fontSize: 12, fontWeight: 700, color: "#64748b", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                    <MI icon="edit" style={{ fontSize: 14, marginRight: 6, verticalAlign: "middle" }} />
                                    프로필 수정
                                </h4>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <input
                                        value={editName}
                                        onChange={e => setEditName(e.target.value)}
                                        placeholder="이름"
                                        style={{
                                            flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0",
                                            borderRadius: 8, fontSize: 13, outline: "none",
                                        }}
                                    />
                                    <input
                                        value={editGrade}
                                        onChange={e => setEditGrade(e.target.value)}
                                        placeholder="학년"
                                        style={{
                                            width: 100, padding: "8px 12px", border: "1px solid #e2e8f0",
                                            borderRadius: 8, fontSize: 13, outline: "none",
                                        }}
                                    />
                                    <button
                                        onClick={updateProfile}
                                        style={{
                                            padding: "8px 16px", borderRadius: 8, border: "none",
                                            background: "linear-gradient(135deg, #2563eb, #4338ca)",
                                            color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
                                        }}
                                    >
                                        저장
                                    </button>
                                </div>
                            </div>

                            {/* XP Grant */}
                            <div>
                                <h4 style={{ fontSize: 12, fontWeight: 700, color: "#64748b", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                    <MI icon="star" style={{ fontSize: 14, marginRight: 6, verticalAlign: "middle", color: "#f59e0b" }} />
                                    XP 부여
                                </h4>
                                <div style={{ display: "flex", gap: 6, marginBottom: 8, flexWrap: "wrap" }}>
                                    {[5, 10, 20, 50, 100].map(v => (
                                        <button
                                            key={v}
                                            onClick={() => setXpAmount(v)}
                                            style={{
                                                padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                                                border: xpAmount === v ? "2px solid #2563eb" : "1px solid #e2e8f0",
                                                background: xpAmount === v ? "rgba(37,99,235,0.06)" : "#fff",
                                                color: xpAmount === v ? "#2563eb" : "#64748b",
                                                cursor: "pointer",
                                            }}
                                        >
                                            +{v} XP
                                        </button>
                                    ))}
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <input
                                        value={xpReason}
                                        onChange={e => setXpReason(e.target.value)}
                                        placeholder="사유 (선택)"
                                        style={{
                                            flex: 1, padding: "8px 12px", border: "1px solid #e2e8f0",
                                            borderRadius: 8, fontSize: 13, outline: "none",
                                        }}
                                    />
                                    <button
                                        onClick={grantXP}
                                        style={{
                                            padding: "8px 20px", borderRadius: 8, border: "none",
                                            background: "linear-gradient(135deg, #f59e0b, #d97706)",
                                            color: "#fff", fontSize: 12, fontWeight: 700, cursor: "pointer",
                                            display: "flex", alignItems: "center", gap: 6,
                                        }}
                                    >
                                        <MI icon="bolt" style={{ fontSize: 14 }} />
                                        부여
                                    </button>
                                </div>
                            </div>

                            {/* XP Logs */}
                            <div>
                                <h4 style={{ fontSize: 12, fontWeight: 700, color: "#64748b", margin: "0 0 10px", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                    최근 XP 내역
                                </h4>
                                <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 200, overflowY: "auto" }}>
                                    {xpLogs.length === 0 ? (
                                        <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", padding: 20 }}>기록 없음</p>
                                    ) : xpLogs.map(log => (
                                        <div key={log.id} style={{
                                            display: "flex", alignItems: "center", justifyContent: "space-between",
                                            padding: "8px 12px", borderRadius: 8,
                                            background: "rgba(241,245,249,0.5)",
                                        }}>
                                            <div>
                                                <span style={{ fontSize: 12, fontWeight: 600, color: "#1e293b" }}>
                                                    {log.reason || "경험치"}
                                                </span>
                                                <span style={{ fontSize: 10, color: "#94a3b8", marginLeft: 8 }}>
                                                    {new Date(log.created_at).toLocaleDateString("ko-KR")}
                                                </span>
                                            </div>
                                            <span style={{
                                                fontSize: 12, fontWeight: 700,
                                                color: log.amount > 0 ? "#059669" : "#dc2626",
                                            }}>
                                                {log.amount > 0 ? "+" : ""}{log.amount} XP
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
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
