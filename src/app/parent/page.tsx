"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase";

/* ═══════════════════════════════════════
   학부모 대시보드 — 자녀 학습 실시간 현황
   /parent
   Supabase 기반 실시간 데이터
   ═══════════════════════════════════════ */

interface StudentProfile {
    id: string;
    name: string;
    email: string;
    level: number;
    xp: number;
    streak_current: number;
    streak_max: number;
}

interface Submission {
    id: string;
    language: string;
    status: string;
    created_at: string;
    code: string;
    output: string;
}

interface XpLog {
    id: string;
    amount: number;
    reason: string;
    icon: string;
    created_at: string;
}

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)",
    borderRadius: 20, border: "1px solid rgba(226,232,240,0.5)",
    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
};

export default function ParentDashboard() {
    const supabase = useMemo(() => createClient(), []);
    const [studentCode, setStudentCode] = useState(() => {
        if (typeof window === "undefined") return "";
        return localStorage.getItem("parent_student_id") || "";
    });
    const [inputCode, setInputCode] = useState("");
    const [student, setStudent] = useState<StudentProfile | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [xpLogs, setXpLogs] = useState<XpLog[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<"overview" | "activity" | "code">("overview");

    const fetchStudentData = useCallback(async (query: string) => {
        setLoading(true); setError("");
        try {
            // Try email first, then name, then UUID
            let profile: any = null;
            const q = query.trim();

            // Check if it looks like email
            if (q.includes("@")) {
                const { data } = await supabase.from("profiles").select("*").eq("email", q).single();
                profile = data;
            }

            // Try by name if not found
            if (!profile) {
                const { data } = await supabase.from("profiles").select("*").eq("name", q).maybeSingle();
                profile = data;
            }

            // Try by UUID
            if (!profile && q.length > 10) {
                const { data } = await supabase.from("profiles").select("*").eq("id", q).single();
                profile = data;
            }

            if (!profile) { setError("학생을 찾을 수 없습니다. 이름, 이메일, 또는 학생 ID를 확인해주세요."); setLoading(false); return; }

            setStudent({
                id: profile.id,
                name: profile.name || "학생",
                email: profile.email || "",
                level: profile.level || 1,
                xp: profile.xp || 0,
                streak_current: profile.streak_current || 0,
                streak_max: profile.streak_max || 0,
            });

            // Fetch recent submissions (last 50)
            const { data: subs } = await supabase
                .from("code_submissions").select("*")
                .eq("user_id", profile.id)
                .order("created_at", { ascending: false }).limit(50);
            setSubmissions(subs || []);

            // Fetch XP logs (last 30)
            const { data: logs } = await supabase
                .from("xp_logs").select("*")
                .eq("user_id", profile.id)
                .order("created_at", { ascending: false }).limit(30);
            setXpLogs(logs || []);

            localStorage.setItem("parent_student_id", profile.id);
        } catch (err: any) {
            setError(err?.message || "데이터를 불러올 수 없습니다.");
        }
        setLoading(false);
    }, [supabase]);

    // Auto-load if we have a saved student code
    useEffect(() => {
        if (studentCode) fetchStudentData(studentCode);
    }, [studentCode, fetchStudentData]);

    // Real-time subscription for new submissions
    useEffect(() => {
        if (!studentCode) return;
        const channel = supabase
            .channel("parent-monitor")
            .on("postgres_changes", {
                event: "INSERT",
                schema: "public",
                table: "code_submissions",
                filter: `user_id=eq.${studentCode}`,
            }, (payload) => {
                setSubmissions(prev => [payload.new as Submission, ...prev].slice(0, 50));
            })
            .on("postgres_changes", {
                event: "*",
                schema: "public",
                table: "xp_logs",
                filter: `user_id=eq.${studentCode}`,
            }, (payload) => {
                if (payload.eventType === "INSERT") {
                    setXpLogs(prev => [payload.new as XpLog, ...prev].slice(0, 30));
                }
            })
            .on("postgres_changes", {
                event: "UPDATE",
                schema: "public",
                table: "profiles",
                filter: `id=eq.${studentCode}`,
            }, (payload) => {
                const p = payload.new as any;
                setStudent(prev => prev ? {
                    ...prev,
                    level: p.level || prev.level,
                    xp: p.xp || prev.xp,
                    streak_current: p.streak_current || prev.streak_current,
                    streak_max: p.streak_max || prev.streak_max,
                } : prev);
            })
            .subscribe();
        return () => { supabase.removeChannel(channel); };
    }, [studentCode, supabase]);

    // === Stats ===
    const todaySubmissions = submissions.filter(s => {
        const d = new Date(s.created_at);
        const today = new Date();
        return d.toDateString() === today.toDateString();
    });
    const successRate = submissions.length > 0
        ? Math.round(submissions.filter(s => s.status === "success").length / submissions.length * 100)
        : 0;
    const totalXpToday = xpLogs.filter(l => {
        const d = new Date(l.created_at);
        return d.toDateString() === new Date().toDateString();
    }).reduce((sum, l) => sum + (l.amount || 0), 0);

    // Language stats
    const langStats = submissions.reduce((acc, s) => {
        acc[s.language] = (acc[s.language] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Activity heatmap (last 14 days)
    const last14: { date: string; count: number }[] = [];
    for (let i = 13; i >= 0; i--) {
        const d = new Date(); d.setDate(d.getDate() - i);
        const ds = d.toISOString().slice(0, 10);
        const cnt = submissions.filter(s => s.created_at.slice(0, 10) === ds).length;
        last14.push({ date: ds, count: cnt });
    }

    const handleConnect = () => {
        if (inputCode.trim()) {
            setStudentCode(inputCode.trim());
        }
    };

    const handleDisconnect = () => {
        setStudentCode("");
        setStudent(null);
        setSubmissions([]);
        setXpLogs([]);
        localStorage.removeItem("parent_student_id");
    };

    const timeAgo = (ts: string) => {
        const diff = Date.now() - new Date(ts).getTime();
        if (diff < 60000) return "방금 전";
        if (diff < 3600000) return `${Math.floor(diff / 60000)}분 전`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)}시간 전`;
        return `${Math.floor(diff / 86400000)}일 전`;
    };

    // === Not Connected View ===
    if (!student) {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #EEF2FF 0%, #F0F9FF 50%, #F8FAFC 100%)", padding: 20 }}>
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} style={{ ...glassCard, padding: "48px 40px", maxWidth: 480, width: "100%", textAlign: "center" }}>
                    <div style={{ width: 80, height: 80, borderRadius: 24, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 40, color: "#fff" }}>family_restroom</span>
                    </div>
                    <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1e1b4b", marginBottom: 8, letterSpacing: -0.5 }}>학부모 모니터링</h1>
                    <p style={{ fontSize: 14, color: "#64748b", marginBottom: 32, lineHeight: 1.6 }}>
                        자녀의 학습 현황을 실시간으로 확인합니다.<br />
                        자녀의 <strong>이름</strong>, <strong>이메일</strong>, 또는 <strong>학생 ID</strong>를 입력해주세요.
                    </p>
                    <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                        <input
                            value={inputCode}
                            onChange={e => setInputCode(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleConnect()}
                            placeholder="이름, 이메일, 또는 학생 ID"
                            style={{
                                flex: 1, padding: "12px 16px", borderRadius: 12, border: "1px solid #e2e8f0",
                                fontSize: 14, outline: "none", fontFamily: "'JetBrains Mono', monospace",
                            }}
                        />
                        <motion.button
                            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            onClick={handleConnect}
                            disabled={loading}
                            style={{
                                padding: "12px 24px", borderRadius: 12, border: "none", cursor: "pointer",
                                background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
                                fontWeight: 700, fontSize: 14, whiteSpace: "nowrap",
                            }}
                        >
                            {loading ? "연결 중..." : "연결"}
                        </motion.button>
                    </div>
                    {error && <p style={{ fontSize: 12, color: "#ef4444", fontWeight: 600 }}>{error}</p>}
                    <p style={{ fontSize: 11, color: "#94a3b8", marginTop: 16 }}>
                        이름 또는 이메일로 검색 가능합니다.
                    </p>
                    <Link href="/" style={{ display: "inline-block", marginTop: 20, fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>← 홈으로</Link>
                </motion.div>
            </div>
        );
    }

    // === Connected View ===
    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #EEF2FF 0%, #F0F9FF 50%, #F8FAFC 100%)", padding: "24px 20px" }}>
            <div style={{ maxWidth: 960, margin: "0 auto" }}>
                {/* ── Header ── */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
                    <div>
                        <Link href="/" style={{ fontSize: 12, color: "#94a3b8", textDecoration: "none" }}>← 홈</Link>
                        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1e1b4b", marginTop: 4, letterSpacing: -0.5 }}>
                            {student.name} 학습 현황
                        </h1>
                        <p style={{ fontSize: 12, color: "#94a3b8" }}>실시간 모니터링 · Lv.{student.level}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                            style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px rgba(34,197,94,0.5)" }} />
                        <span style={{ fontSize: 11, color: "#22c55e", fontWeight: 600 }}>실시간 연결됨</span>
                        <button onClick={handleDisconnect} style={{
                            padding: "6px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
                            background: "#fff", cursor: "pointer", fontSize: 11, color: "#64748b", fontWeight: 600, marginLeft: 8,
                        }}>연결 해제</button>
                    </div>
                </div>

                {/* ── Tab Nav ── */}
                <div style={{ display: "flex", gap: 4, marginBottom: 24, ...glassCard, padding: 5 }}>
                    {(["overview", "activity", "code"] as const).map(tab => (
                        <button key={tab} onClick={() => setActiveTab(tab)} style={{
                            flex: 1, padding: "10px", borderRadius: 14, border: "none", cursor: "pointer",
                            background: activeTab === tab ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "transparent",
                            color: activeTab === tab ? "#fff" : "#64748b",
                            fontWeight: 700, fontSize: 13, transition: "all 0.2s",
                        }}>
                            {tab === "overview" ? "종합 현황" : tab === "activity" ? "활동 기록" : "코드 이력"}
                        </button>
                    ))}
                </div>

                {/* ═══ Overview ═══ */}
                {activeTab === "overview" && (
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        {/* Summary Cards */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12, marginBottom: 20 }}>
                            {[
                                { icon: "local_fire_department", label: "연속 출석", value: `${student.streak_current}일`, sub: `최대 ${student.streak_max}일`, color: "#EF4444", bg: "#FEF2F2" },
                                { icon: "star", label: "레벨 / XP", value: `Lv.${student.level}`, sub: `${student.xp.toLocaleString()} XP`, color: "#F59E0B", bg: "#FFFBEB" },
                                { icon: "code", label: "오늘 코드 실행", value: `${todaySubmissions.length}회`, sub: `성공률 ${successRate}%`, color: "#6366f1", bg: "#EEF2FF" },
                                { icon: "trending_up", label: "오늘 획득 XP", value: `+${totalXpToday}`, sub: `총 ${submissions.length}회 실행`, color: "#10b981", bg: "#ECFDF5" },
                            ].map(s => (
                                <div key={s.label} style={{ ...glassCard, padding: 20 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                        <span className="material-symbols-outlined" style={{
                                            fontSize: 20, width: 38, height: 38, borderRadius: 12,
                                            background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", color: s.color,
                                        }}>{s.icon}</span>
                                        <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600 }}>{s.label}</span>
                                    </div>
                                    <div style={{ fontSize: 28, fontWeight: 800, color: s.color, letterSpacing: -0.5 }}>{s.value}</div>
                                    <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{s.sub}</div>
                                </div>
                            ))}
                        </div>

                        {/* 14-Day Activity Chart */}
                        <div style={{ ...glassCard, padding: "20px 24px", marginBottom: 20 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1e1b4b", marginBottom: 16 }}>최근 2주 활동</h3>
                            <div style={{ display: "flex", gap: 6, alignItems: "flex-end", height: 80 }}>
                                {last14.map(d => (
                                    <div key={d.date} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                                        <div style={{
                                            width: "100%", minHeight: 4,
                                            height: d.count > 0 ? Math.min(60, d.count * 12) : 4,
                                            borderRadius: 4,
                                            background: d.count > 0 ? `rgba(99,102,241,${Math.min(1, d.count * 0.2 + 0.2)})` : "#f1f5f9",
                                            transition: "height 0.3s",
                                        }} title={`${d.date}: ${d.count}회`} />
                                        <span style={{ fontSize: 8, color: "#94a3b8" }}>{d.date.slice(8)}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Language Distribution */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <div style={{ ...glassCard, padding: 20 }}>
                                <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1e1b4b", marginBottom: 12 }}>언어별 사용</h4>
                                {Object.entries(langStats).length > 0 ? Object.entries(langStats).sort((a, b) => b[1] - a[1]).map(([lang, cnt]) => (
                                    <div key={lang} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 12 }}>
                                        <span style={{ fontWeight: 600, color: "#334155", textTransform: "uppercase" }}>{lang}</span>
                                        <span style={{ color: "#6366f1", fontWeight: 700 }}>{cnt}회</span>
                                    </div>
                                )) : <p style={{ fontSize: 12, color: "#94a3b8" }}>아직 데이터가 없습니다</p>}
                            </div>
                            <div style={{ ...glassCard, padding: 20 }}>
                                <h4 style={{ fontSize: 13, fontWeight: 700, color: "#1e1b4b", marginBottom: 12 }}>최근 XP 활동</h4>
                                {xpLogs.slice(0, 5).map(l => (
                                    <div key={l.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11 }}>
                                        <span style={{ color: "#334155" }}>{l.reason}</span>
                                        <span style={{ color: l.amount > 0 ? "#22c55e" : "#ef4444", fontWeight: 700 }}>
                                            {l.amount > 0 ? "+" : ""}{l.amount} XP
                                        </span>
                                    </div>
                                ))}
                                {xpLogs.length === 0 && <p style={{ fontSize: 12, color: "#94a3b8" }}>아직 데이터가 없습니다</p>}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══ Activity Tab ═══ */}
                {activeTab === "activity" && (
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ ...glassCard, padding: "24px" }}>
                            <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b", marginBottom: 20 }}>전체 활동 타임라인</h3>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {[...submissions.map(s => ({
                                    type: "code" as const,
                                    time: s.created_at,
                                    lang: s.language,
                                    status: s.status,
                                    detail: s.status === "success" ? "실행 성공" : "실행 실패",
                                })), ...xpLogs.map(l => ({
                                    type: "xp" as const,
                                    time: l.created_at,
                                    lang: "",
                                    status: l.amount > 0 ? "success" : "error",
                                    detail: `${l.reason} (${l.amount > 0 ? "+" : ""}${l.amount} XP)`,
                                }))].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 30).map((item, i) => (
                                    <div key={i} style={{
                                        display: "flex", alignItems: "center", gap: 12, padding: "10px 14px",
                                        borderRadius: 12, background: "#f8fafc",
                                    }}>
                                        <span className="material-symbols-outlined" style={{
                                            fontSize: 18, width: 32, height: 32, borderRadius: 8, display: "flex",
                                            alignItems: "center", justifyContent: "center",
                                            background: item.type === "code" ? "#EEF2FF" : "#ECFDF5",
                                            color: item.type === "code" ? "#6366f1" : "#10b981",
                                        }}>{item.type === "code" ? "terminal" : "star"}</span>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontSize: 12, fontWeight: 600, color: "#334155" }}>{item.detail}</div>
                                            {item.lang && <span style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase" }}>{item.lang}</span>}
                                        </div>
                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                            <span style={{
                                                fontSize: 9, padding: "2px 8px", borderRadius: 6, fontWeight: 700,
                                                background: item.status === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                                                color: item.status === "success" ? "#22c55e" : "#ef4444",
                                            }}>{item.status === "success" ? "성공" : "실패"}</span>
                                            <span style={{ fontSize: 10, color: "#94a3b8" }}>{timeAgo(item.time)}</span>
                                        </div>
                                    </div>
                                ))}
                                {submissions.length === 0 && xpLogs.length === 0 && (
                                    <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: 40 }}>
                                        아직 활동 기록이 없습니다
                                    </p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ═══ Code History Tab ═══ */}
                {activeTab === "code" && (
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {submissions.slice(0, 20).map(s => (
                                <div key={s.id} style={{ ...glassCard, padding: 16, overflow: "hidden" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{
                                                fontSize: 9, padding: "2px 8px", borderRadius: 6, fontWeight: 700,
                                                textTransform: "uppercase",
                                                background: "rgba(99,102,241,0.1)", color: "#6366f1",
                                            }}>{s.language}</span>
                                            <span style={{
                                                fontSize: 9, padding: "2px 8px", borderRadius: 6, fontWeight: 700,
                                                background: s.status === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                                                color: s.status === "success" ? "#22c55e" : "#ef4444",
                                            }}>{s.status === "success" ? "성공" : "실패"}</span>
                                        </div>
                                        <span style={{ fontSize: 11, color: "#94a3b8" }}>{timeAgo(s.created_at)}</span>
                                    </div>
                                    <pre style={{
                                        fontSize: 11, lineHeight: 1.6, color: "#334155",
                                        background: "#f8fafc", borderRadius: 8, padding: 12,
                                        overflow: "auto", maxHeight: 120, fontFamily: "'JetBrains Mono', monospace",
                                        margin: 0,
                                    }}>{s.code?.slice(0, 500)}{(s.code?.length || 0) > 500 ? "\n..." : ""}</pre>
                                    {s.output && (
                                        <div style={{
                                            marginTop: 8, fontSize: 11, color: s.status === "success" ? "#22c55e" : "#ef4444",
                                            background: "#f8fafc", borderRadius: 8, padding: "8px 12px",
                                            fontFamily: "'JetBrains Mono', monospace", maxHeight: 60, overflow: "auto",
                                        }}>
                                            {s.output.slice(0, 200)}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {submissions.length === 0 && (
                                <div style={{ ...glassCard, padding: 40, textAlign: "center" }}>
                                    <p style={{ fontSize: 13, color: "#94a3b8" }}>아직 코드 실행 기록이 없습니다</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
