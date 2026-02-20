"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { User } from "@supabase/supabase-js";

/*
  학생 대시보드 — Coddy 게이미피케이션 + 코딩쏙 브랜드
  - XP / 스트릭 / 레벨 상단 바
  - Coddy 스타일 코스 카드 그리드
  - 게이미피케이션 사이드 카드 (스트릭, 파워업)
  - 진행률 + 프로필 모달
*/

interface Profile { name: string | null; phone: string | null; grade: string | null; email: string; }
interface ProgressData { label: string; subject: string; total: number; completed: number; color: string; }

const GRADES = [
    "초등 1학년", "초등 2학년", "초등 3학년", "초등 4학년", "초등 5학년", "초등 6학년",
    "중등 1학년", "중등 2학년", "중등 3학년",
    "고등 1학년", "고등 2학년", "고등 3학년",
    "대학생/성인",
];

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState<ProgressData[]>([]);
    const [showProfile, setShowProfile] = useState(false);
    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editGrade, setEditGrade] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState<string | null>(null);

    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(async ({ data }) => {
            if (!data.user) { window.location.href = "/login"; return; }
            setUser(data.user);
            const { data: prof } = await supabase.from("profiles").select("name, phone, grade, email").eq("id", data.user.id).single();
            if (prof) { setProfile(prof); setEditName(prof.name || ""); setEditPhone(prof.phone || ""); setEditGrade(prof.grade || ""); }
            else {
                const meta = data.user.user_metadata || {};
                const fb: Profile = { name: meta.name || null, phone: meta.phone || null, grade: meta.grade || null, email: data.user.email || "" };
                setProfile(fb); setEditName(fb.name || ""); setEditPhone(fb.phone || ""); setEditGrade(fb.grade || "");
            }
            setLoading(false);
        });
    }, [supabase]);

    const fetchProgress = useCallback(async () => {
        if (!user) return;
        const subjects = [
            { label: "C언어 기초", subject: "c-lang", total: 10, color: "#EC5212" },
            { label: "C 코스 (coddy)", subject: "c-course", total: 34, color: "#f59e0b" },
            { label: "HTML/CSS", subject: "html-css", total: 6, color: "#77C6B3" },
            { label: "알고리즘", subject: "algorithm", total: 10, color: "#70A2E1" },
        ];
        const results: ProgressData[] = [];
        for (const sub of subjects) {
            try {
                const { data, error } = await supabase.from("learning_progress").select("id").eq("user_id", user.id).eq("subject", sub.subject).eq("completed", true);
                if (error) throw error;
                results.push({ ...sub, completed: data?.length || 0 });
            } catch { results.push({ ...sub, completed: 0 }); }
        }
        setProgress(results);
    }, [user, supabase]);

    useEffect(() => { if (user) fetchProgress(); }, [user, fetchProgress]);

    const handleSaveProfile = async () => {
        if (!user) return;
        setSaving(true); setSaveMsg(null);
        try {
            const { error } = await supabase.from("profiles").upsert({ id: user.id, email: user.email || "", name: editName.trim(), phone: editPhone.replace(/-/g, ""), grade: editGrade });
            if (error) throw error;
            setProfile({ name: editName.trim(), phone: editPhone.replace(/-/g, ""), grade: editGrade, email: user.email || "" });
            setSaveMsg("저장되었습니다!"); setTimeout(() => setSaveMsg(null), 2000);
        } catch { setSaveMsg("저장 중 오류가 발생했습니다."); }
        finally { setSaving(false); }
    };

    const handleLogout = async () => { await supabase.auth.signOut(); window.location.href = "/"; };

    const fmtPhone = (v: string) => {
        const d = v.replace(/\D/g, "").slice(0, 11);
        if (d.length <= 3) return d; if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
        return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    };
    const fmtPhoneDisplay = (v: string | null) => {
        if (!v) return "미등록"; const d = v.replace(/\D/g, "");
        if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`; return v;
    };

    if (loading) return (
        <div style={{ minHeight: "100vh", background: "#1e1c1a", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center" }}>
                <motion.span animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} style={{ display: "inline-block", fontSize: 40 }}>🌸</motion.span>
                <p style={{ marginTop: 16, color: "rgba(255,255,255,0.5)", fontSize: 14 }}>로딩 중...</p>
            </motion.div>
        </div>
    );

    const displayName = profile?.name || user?.email?.split("@")[0] || "학생";
    const avatarLetter = displayName.charAt(0).toUpperCase();
    const totalCompleted = progress.reduce((a, b) => a + b.completed, 0);
    const totalXp = totalCompleted * 20;
    const level = Math.floor(totalXp / 50) + 1;
    const streak = totalCompleted; // simplified

    const modules = [
        { title: "C언어 컴파일러", desc: "온라인에서 바로 C 코드를 작성하고 실행하세요", href: "/dashboard/compiler", icon: "💻", color: "#EC5212", tag: "C" },
        { title: "⚡ C 코스 Journey", desc: "coddy.tech 스타일 34개 레슨+챌린지로 C 기초 마스터", href: "/dashboard/learning?view=c-course", icon: "⚡", color: "#f59e0b", tag: "NEW" },
        { title: "학습 트랙 허브", desc: "코딩사고력·컴퓨팅사고력·C언어·KOI·워프 5개 트랙", href: "/dashboard/learning?view=tracks", icon: "🗂️", color: "#818cf8", tag: "5트랙" },
        { title: "HTML 웹 에디터", desc: "HTML/CSS/JS를 배우고 실시간 미리보기로 확인", href: "/dashboard/learning?view=web-editor", icon: "🌐", color: "#77C6B3", tag: "HTML" },
        { title: "숙제 & 노트", desc: "선생님이 남겨주신 숙제와 수업 노트 확인", href: "/dashboard/homework", icon: "📝", color: "#FFD37D", tag: "과제" },
        { title: "Elite 학습센터", desc: "로드맵·챌린지·리더보드·코드에디터 올인원 프리미엄", href: "/dashboard/learning", icon: "🏆", color: "#2563eb", tag: "ELITE" },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "#1e1c1a", color: "rgba(255,255,255,0.87)" }}>
            {/* ── Topbar (Coddy Standard 54px) ── */}
            <motion.header
                initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                style={{
                    height: 54, background: "rgba(42,36,32,0.95)", backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                    padding: "0 clamp(16px, 3vw, 32px)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    position: "sticky", top: 0, zIndex: 50,
                }}
            >
                <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 22 }}>🌸</span>
                    <span style={{ fontWeight: 700, fontSize: 17, color: "#EC5212" }}>코딩쏙</span>
                </Link>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {/* XP Badge */}
                    <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(255,211,125,0.12)", padding: "4px 10px", borderRadius: 20 }}>
                        <span style={{ fontSize: 12 }}>⚡</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#D4940A", fontFamily: "monospace" }}>{totalXp} XP</span>
                    </div>
                    {/* Streak */}
                    <div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(236,82,18,0.12)", padding: "4px 10px", borderRadius: 20 }}>
                        <span style={{ fontSize: 12 }}>🔥</span>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#EC5212", fontFamily: "monospace" }}>{streak}</span>
                    </div>
                    {/* Level */}
                    <div style={{ background: "rgba(119,198,179,0.12)", padding: "4px 10px", borderRadius: 20 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#77C6B3", fontFamily: "monospace" }}>Lv.{level}</span>
                    </div>
                    {/* Avatar */}
                    <button onClick={() => setShowProfile(true)} style={{
                        display: "flex", alignItems: "center", gap: 8,
                        padding: "4px 10px 4px 4px", borderRadius: 999,
                        border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)",
                        cursor: "pointer",
                    }}>
                        <div style={{
                            width: 28, height: 28, borderRadius: 999,
                            background: "linear-gradient(135deg, #EC5212, #FF6B35)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontWeight: 700, fontSize: 12,
                        }}>{avatarLetter}</div>
                        <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{displayName}</span>
                    </button>
                    <button onClick={handleLogout} style={{
                        padding: "6px 12px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.08)",
                        background: "transparent", fontSize: 12, cursor: "pointer", color: "rgba(255,255,255,0.4)",
                        fontWeight: 500, fontFamily: "inherit",
                    }}>로그아웃</button>
                </div>
            </motion.header>

            {/* ── Main Content ── */}
            <div style={{ maxWidth: 1100, margin: "0 auto", padding: "clamp(24px, 4vw, 40px) clamp(16px, 3vw, 24px)" }}>
                {/* Greeting */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ marginBottom: 32 }}
                >
                    <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 800, marginBottom: 8 }}>
                        안녕하세요, {displayName}님! 👋
                    </h1>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)" }}>
                        {profile?.grade && <span style={{ background: "rgba(236,82,18,0.12)", color: "#EC5212", padding: "3px 10px", borderRadius: 20, fontSize: 12, fontWeight: 600, marginRight: 8 }}>{profile.grade}</span>}
                        오늘도 즐겁게 코딩 해볼까요?
                    </p>
                </motion.div>

                {/* Two-column layout */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24, alignItems: "start" }}>
                    {/* Left: Course cards + Progress */}
                    <div>
                        {/* Course Cards Grid (Coddy Style) */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                            {modules.map((mod, i) => (
                                <motion.div key={mod.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }}>
                                    <Link href={mod.href} style={{ textDecoration: "none", display: "block" }}>
                                        <motion.div
                                            whileHover={{ scale: 1.01, boxShadow: "0 8px 30px rgba(0,0,0,0.3)" }}
                                            style={{
                                                background: "#2d2a26", borderRadius: 16,
                                                padding: "clamp(20px, 3vw, 28px)",
                                                border: "1px solid rgba(255,255,255,0.06)",
                                                display: "flex", alignItems: "center", gap: 20,
                                                cursor: "pointer", transition: "all 0.3s",
                                            }}
                                        >
                                            <div style={{
                                                width: 56, height: 56, borderRadius: 14,
                                                background: `${mod.color}15`, border: `1px solid ${mod.color}30`,
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: 28, flexShrink: 0,
                                            }}>{mod.icon}</div>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                                    <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{mod.title}</h3>
                                                    <span style={{
                                                        fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                                                        background: `${mod.color}20`, color: mod.color,
                                                    }}>{mod.tag}</span>
                                                </div>
                                                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", lineHeight: 1.4 }}>{mod.desc}</p>
                                            </div>
                                            <span style={{ fontSize: 14, fontWeight: 600, color: mod.color, flexShrink: 0 }}>시작 →</span>
                                        </motion.div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress Section */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                            style={{
                                background: "#2d2a26", borderRadius: 16,
                                padding: "clamp(20px, 3vw, 28px)",
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <h2 style={{ fontSize: 17, fontWeight: 600, marginBottom: 20, color: "rgba(255,255,255,0.87)" }}>📊 학습 진행률</h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                                {progress.length === 0 ? (
                                    <p style={{ color: "rgba(255,255,255,0.3)", textAlign: "center", padding: 20 }}>진행률을 불러오는 중...</p>
                                ) : (
                                    progress.map((item, i) => {
                                        const percent = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
                                        return (
                                            <motion.div key={item.subject} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}>
                                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                                    <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{item.label}</span>
                                                    <span style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>{item.completed}/{item.total} ({percent}%)</span>
                                                </div>
                                                <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${percent}%` }}
                                                        transition={{ delay: 0.7 + i * 0.1, duration: 1, ease: "easeOut" }}
                                                        style={{ height: "100%", background: `linear-gradient(90deg, ${item.color}, ${item.color}aa)`, borderRadius: 999 }}
                                                    />
                                                </div>
                                            </motion.div>
                                        );
                                    })
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Gamification sidebar */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {/* Gamification Card */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                            style={{
                                background: "#2d2a26", borderRadius: 16,
                                padding: 24, border: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <div style={{ textAlign: "center", marginBottom: 20 }}>
                                <div style={{
                                    width: 72, height: 72, borderRadius: 999, margin: "0 auto 12px",
                                    background: "linear-gradient(135deg, #EC5212, #FF6B35)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 32, color: "#fff", fontWeight: 700,
                                    boxShadow: "0 8px 24px rgba(236,82,18,0.3)",
                                }}>{avatarLetter}</div>
                                <h3 style={{ fontSize: 16, fontWeight: 700 }}>{displayName}</h3>
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Level {level} 코더</p>
                            </div>

                            {/* Stats row */}
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 16 }}>
                                {[
                                    { label: "XP", value: totalXp, icon: "⚡", color: "#D4940A" },
                                    { label: "스트릭", value: streak, icon: "🔥", color: "#EC5212" },
                                    { label: "레벨", value: level, icon: "🏆", color: "#77C6B3" },
                                ].map((s) => (
                                    <div key={s.label} style={{
                                        textAlign: "center", padding: "10px 4px", borderRadius: 12,
                                        background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.04)",
                                    }}>
                                        <span style={{ fontSize: 16, display: "block", marginBottom: 4 }}>{s.icon}</span>
                                        <span style={{ fontSize: 16, fontWeight: 700, color: s.color, fontFamily: "monospace", display: "block" }}>{s.value}</span>
                                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{s.label}</span>
                                    </div>
                                ))}
                            </div>

                            {/* XP Progress to next level */}
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 6 }}>
                                    <span>다음 레벨까지</span>
                                    <span>{totalXp % 50}/50 XP</span>
                                </div>
                                <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 999, overflow: "hidden" }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(totalXp % 50) / 50 * 100}%` }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                        style={{ height: "100%", background: "linear-gradient(90deg, #EC5212, #FF6B35)", borderRadius: 999 }}
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Power-up Cards (Coddy style) */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                            style={{
                                background: "#2d2a26", borderRadius: 16,
                                padding: 20, border: "1px solid rgba(255,255,255,0.06)",
                            }}
                        >
                            <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "rgba(255,255,255,0.7)" }}>🎯 오늘의 목표</h4>
                            {[
                                { text: "레슨 1개 완료하기", done: totalCompleted >= 1, emoji: "📖" },
                                { text: "코드 3번 실행하기", done: false, emoji: "▶️" },
                                { text: "10분 이상 학습하기", done: false, emoji: "⏱️" },
                            ].map((g, i) => (
                                <div key={i} style={{
                                    display: "flex", alignItems: "center", gap: 10,
                                    padding: "10px 12px", borderRadius: 10, marginBottom: 6,
                                    background: g.done ? "rgba(119,198,179,0.08)" : "rgba(255,255,255,0.02)",
                                    border: g.done ? "1px solid rgba(119,198,179,0.15)" : "1px solid rgba(255,255,255,0.04)",
                                }}>
                                    <span style={{ fontSize: 14 }}>{g.emoji}</span>
                                    <span style={{
                                        fontSize: 13, color: g.done ? "#77C6B3" : "rgba(255,255,255,0.5)",
                                        textDecoration: g.done ? "line-through" : "none", flex: 1,
                                    }}>{g.text}</span>
                                    {g.done && <span style={{ fontSize: 14 }}>✅</span>}
                                </div>
                            ))}
                        </motion.div>

                        {/* Quick links */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
                            style={{
                                background: "linear-gradient(135deg, rgba(236,82,18,0.15), rgba(255,107,53,0.08))",
                                borderRadius: 16, padding: 20,
                                border: "1px solid rgba(236,82,18,0.15)",
                            }}
                        >
                            <p style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 4 }}>🚀 빠른 시작</p>
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginBottom: 14 }}>지난 학습을 이어가세요</p>
                            <Link href="/dashboard/learning" style={{ textDecoration: "none" }}>
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        width: "100%", padding: "12px 0", borderRadius: 12, border: "none",
                                        background: "#EC5212", color: "#fff", fontWeight: 700, fontSize: 14,
                                        cursor: "pointer", fontFamily: "inherit",
                                        boxShadow: "0 4px 16px rgba(236,82,18,0.3)",
                                    }}
                                >
                                    학습 계속하기 →
                                </motion.button>
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Responsive */}
            <style>{`
                @media (max-width: 768px) {
                    div[style*="grid-template-columns: 1fr 300px"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>

            {/* ── Profile Modal ── */}
            <AnimatePresence>
                {showProfile && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setShowProfile(false)}
                        style={{
                            position: "fixed", inset: 0, zIndex: 9999,
                            background: "rgba(0,0,0,0.6)", backdropFilter: "blur(8px)",
                            display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: "#2d2a26", borderRadius: 20, padding: "clamp(24px, 4vw, 36px)",
                                maxWidth: 420, width: "100%",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                maxHeight: "90vh", overflowY: "auto",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: 999,
                                    background: "linear-gradient(135deg, #EC5212, #FF6B35)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#fff", fontWeight: 700, fontSize: 24, flexShrink: 0,
                                }}>{avatarLetter}</div>
                                <div>
                                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>{displayName}</h3>
                                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{user?.email}</p>
                                </div>
                                <button onClick={() => setShowProfile(false)} style={{ marginLeft: "auto", background: "none", border: "none", fontSize: 20, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>✕</button>
                            </div>

                            <hr style={{ border: "none", height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 20px" }} />

                            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                                {[
                                    { label: "📧 이메일", value: user?.email },
                                    { label: "📱 전화번호", value: fmtPhoneDisplay(profile?.phone || null) },
                                    { label: "🎓 학년", value: profile?.grade || "미등록" },
                                ].map((r) => (
                                    <div key={r.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                        <span style={{ color: "rgba(255,255,255,0.4)" }}>{r.label}</span>
                                        <span style={{ color: "rgba(255,255,255,0.8)", fontWeight: 500 }}>{r.value}</span>
                                    </div>
                                ))}
                            </div>

                            <hr style={{ border: "none", height: 1, background: "rgba(255,255,255,0.06)", margin: "0 0 20px" }} />

                            <h4 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 14 }}>✏️ 프로필 수정</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 4, display: "block" }}>이름</label>
                                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="이름 입력"
                                        style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "rgba(255,255,255,0.04)", color: "#fff" }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 4, display: "block" }}>전화번호</label>
                                    <input type="tel" value={fmtPhone(editPhone)} onChange={(e) => setEditPhone(e.target.value.replace(/\D/g, ""))} placeholder="010-1234-5678"
                                        style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", background: "rgba(255,255,255,0.04)", color: "#fff" }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.4)", marginBottom: 4, display: "block" }}>학년</label>
                                    <select value={editGrade} onChange={(e) => setEditGrade(e.target.value)}
                                        style={{ width: "100%", padding: "10px 14px", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", appearance: "none", background: "rgba(255,255,255,0.04)", color: "#fff", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", cursor: "pointer" }}
                                    >
                                        <option value="">선택해주세요</option>
                                        {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                {saveMsg && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        style={{ fontSize: 13, fontWeight: 500, color: saveMsg.includes("저장") ? "#77C6B3" : "#ef5350", textAlign: "center", padding: "6px 0" }}
                                    >{saveMsg}</motion.p>
                                )}
                                <button onClick={handleSaveProfile} disabled={saving}
                                    style={{
                                        padding: "12px 0", borderRadius: 12, border: "none",
                                        background: saving ? "#555" : "#EC5212",
                                        color: "#fff", fontWeight: 600, fontSize: 14, cursor: saving ? "not-allowed" : "pointer",
                                        fontFamily: "inherit", boxShadow: saving ? "none" : "0 4px 16px rgba(236,82,18,0.3)",
                                    }}
                                >{saving ? "저장 중..." : "저장하기"}</button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
