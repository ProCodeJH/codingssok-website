"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { User } from "@supabase/supabase-js";

/*
  학생 대시보드 — 프로필 표시 + 프로필 편집 + 학습 모듈 + 진행률
*/

interface Profile {
    name: string | null;
    phone: string | null;
    grade: string | null;
    email: string;
}

interface ProgressData {
    label: string;
    subject: string;
    total: number;
    completed: number;
    color: string;
}

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

    // Profile edit state
    const [editName, setEditName] = useState("");
    const [editPhone, setEditPhone] = useState("");
    const [editGrade, setEditGrade] = useState("");
    const [saving, setSaving] = useState(false);
    const [saveMsg, setSaveMsg] = useState<string | null>(null);

    const supabase = createClient();

    /* Fetch user + profile */
    useEffect(() => {
        supabase.auth.getUser().then(async ({ data }) => {
            if (!data.user) {
                window.location.href = "/login";
                return;
            }
            setUser(data.user);

            // Get profile from profiles table
            const { data: prof } = await supabase
                .from("profiles")
                .select("name, phone, grade, email")
                .eq("id", data.user.id)
                .single();

            if (prof) {
                setProfile(prof);
                setEditName(prof.name || "");
                setEditPhone(prof.phone || "");
                setEditGrade(prof.grade || "");
            } else {
                // Fallback: user_metadata
                const meta = data.user.user_metadata || {};
                const fallback: Profile = {
                    name: meta.name || null,
                    phone: meta.phone || null,
                    grade: meta.grade || null,
                    email: data.user.email || "",
                };
                setProfile(fallback);
                setEditName(fallback.name || "");
                setEditPhone(fallback.phone || "");
                setEditGrade(fallback.grade || "");
            }

            setLoading(false);
        });
    }, [supabase]);

    /* Fetch progress */
    const fetchProgress = useCallback(async () => {
        if (!user) return;
        const subjects = [
            { label: "C언어 기초", subject: "c-lang", total: 10, color: "#EC5212" },
            { label: "HTML/CSS", subject: "html-css", total: 3, color: "#77C6B3" },
            { label: "알고리즘", subject: "algorithm", total: 10, color: "#70A2E1" },
        ];
        const results: ProgressData[] = [];
        for (const sub of subjects) {
            try {
                const { data, error } = await supabase
                    .from("learning_progress")
                    .select("id")
                    .eq("user_id", user.id)
                    .eq("subject", sub.subject)
                    .eq("completed", true);
                if (error) throw error;
                results.push({ ...sub, completed: data?.length || 0 });
            } catch {
                results.push({ ...sub, completed: 0 });
            }
        }
        setProgress(results);
    }, [user, supabase]);

    useEffect(() => {
        if (user) fetchProgress();
    }, [user, fetchProgress]);

    /* Save profile */
    const handleSaveProfile = async () => {
        if (!user) return;
        setSaving(true);
        setSaveMsg(null);
        try {
            const { error } = await supabase.from("profiles").upsert({
                id: user.id,
                email: user.email || "",
                name: editName.trim(),
                phone: editPhone.replace(/-/g, ""),
                grade: editGrade,
            });
            if (error) throw error;
            setProfile({ name: editName.trim(), phone: editPhone.replace(/-/g, ""), grade: editGrade, email: user.email || "" });
            setSaveMsg("저장되었습니다!");
            setTimeout(() => setSaveMsg(null), 2000);
        } catch {
            setSaveMsg("저장 중 오류가 발생했습니다.");
        } finally {
            setSaving(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
    };

    /* Phone format */
    const fmtPhone = (v: string) => {
        const d = v.replace(/\D/g, "").slice(0, 11);
        if (d.length <= 3) return d;
        if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
        return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
    };

    const fmtPhoneDisplay = (v: string | null) => {
        if (!v) return "미등록";
        const d = v.replace(/\D/g, "");
        if (d.length === 11) return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
        return v;
    };

    if (loading) {
        return (
            <div style={{ minHeight: "100vh", background: "#fdfaf5", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center" }}>
                    <motion.span animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} style={{ display: "inline-block", fontSize: 40 }}>🌸</motion.span>
                    <p style={{ marginTop: 16, color: "#888", fontSize: 14 }}>로딩 중...</p>
                </motion.div>
            </div>
        );
    }

    const displayName = profile?.name || user?.email?.split("@")[0] || "학생";
    const avatarLetter = displayName.charAt(0).toUpperCase();

    const modules = [
        { title: "C언어 컴파일러", desc: "온라인에서 바로 C 코드를 작성하고 실행하세요", href: "/dashboard/compiler", icon: "💻", color: "#EC5212", gradient: "linear-gradient(135deg, #FFF0E6, #FFE0CC)" },
        { title: "HTML 웹 문서 학습", desc: "HTML/CSS/JS를 배우고 실시간 미리보기로 확인", href: "/dashboard/learning", icon: "🌐", color: "#77C6B3", gradient: "linear-gradient(135deg, #E6F7F2, #CCF0E4)" },
        { title: "숙제 & 노트", desc: "선생님이 남겨주신 숙제와 수업 노트 확인", href: "/dashboard/homework", icon: "📝", color: "#FFD37D", gradient: "linear-gradient(135deg, #FFF8E6, #FFF0CC)" },
    ];

    return (
        <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #fdfaf5, #fff5eb)" }}>
            {/* Header */}
            <motion.header
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)",
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    padding: "clamp(12px, 2vw, 16px) clamp(16px, 3vw, 32px)",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    position: "sticky", top: 0, zIndex: 50,
                }}
            >
                <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 24 }}>🌸</span>
                    <span style={{ fontWeight: 700, fontSize: 18, color: "#1a1a1a" }}>코딩쏙</span>
                </Link>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {/* Profile button */}
                    <button
                        onClick={() => setShowProfile(true)}
                        style={{
                            display: "flex", alignItems: "center", gap: 8,
                            padding: "6px 12px 6px 6px", borderRadius: 999,
                            border: "1px solid rgba(0,0,0,0.06)", background: "rgba(255,255,255,0.6)",
                            cursor: "pointer", transition: "all 0.2s",
                        }}
                    >
                        <div style={{
                            width: 32, height: 32, borderRadius: 999,
                            background: "linear-gradient(135deg, #EC5212, #FF6B35)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontWeight: 700, fontSize: 13,
                        }}>
                            {avatarLetter}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#333" }}>{displayName}</span>
                    </button>
                    <button onClick={handleLogout} style={{
                        padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)",
                        background: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", color: "#888",
                        fontWeight: 500, fontFamily: "inherit",
                    }}>로그아웃</button>
                </div>
            </motion.header>

            {/* Content */}
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "clamp(24px, 4vw, 48px) clamp(16px, 3vw, 24px)" }}>
                {/* Greeting */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                    style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}
                >
                    <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, marginBottom: 8, color: "#1a1a1a" }}>
                        안녕하세요, {displayName}님! 👋
                    </h1>
                    <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "#888" }}>
                        {profile?.grade && <span style={{ background: "rgba(236,82,18,0.08)", color: "#EC5212", padding: "2px 10px", borderRadius: 6, fontSize: 12, fontWeight: 600, marginRight: 8 }}>{profile.grade}</span>}
                        오늘도 즐겁게 코딩 해볼까요?
                    </p>
                </motion.div>

                {/* Module cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 20, marginBottom: 32 }}>
                    {modules.map((mod, i) => (
                        <motion.div key={mod.href} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                            <Link href={mod.href} style={{ textDecoration: "none", display: "block" }}>
                                <motion.div
                                    whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
                                    style={{
                                        background: "#fff", borderRadius: 24, padding: "clamp(24px, 3vw, 32px)",
                                        border: "1.5px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                                        transition: "all 0.3s", cursor: "pointer",
                                    }}
                                >
                                    <div style={{ width: 56, height: 56, borderRadius: 16, background: mod.gradient, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginBottom: 16 }}>
                                        {mod.icon}
                                    </div>
                                    <h3 style={{ fontSize: 18, fontWeight: 600, color: "#1a1a1a", marginBottom: 8 }}>{mod.title}</h3>
                                    <p style={{ fontSize: 14, color: "#888", lineHeight: 1.5, marginBottom: 16 }}>{mod.desc}</p>
                                    <span style={{ fontSize: 13, fontWeight: 600, color: mod.color }}>시작하기 →</span>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Progress */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                    style={{ background: "#fff", borderRadius: 24, padding: "clamp(24px, 3vw, 32px)", border: "1.5px solid rgba(0,0,0,0.04)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
                >
                    <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24, color: "#1a1a1a" }}>📊 학습 진행률</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {progress.length === 0 ? (
                            <p style={{ color: "#999", textAlign: "center", padding: 20 }}>진행률을 불러오는 중...</p>
                        ) : (
                            progress.map((item, i) => {
                                const percent = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
                                return (
                                    <motion.div key={item.subject} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                            <span style={{ fontSize: 14, fontWeight: 600, color: "#333" }}>{item.label}</span>
                                            <span style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>{item.completed}/{item.total} ({percent}%)</span>
                                        </div>
                                        <div style={{ height: 10, background: "rgba(0,0,0,0.04)", borderRadius: 999, overflow: "hidden" }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percent}%` }}
                                                transition={{ delay: 0.8 + i * 0.1, duration: 1, ease: "easeOut" }}
                                                style={{ height: "100%", background: `linear-gradient(90deg, ${item.color}, ${item.color}cc)`, borderRadius: 999 }}
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })
                        )}
                    </div>
                </motion.div>
            </div>

            {/* ── Profile Modal ── */}
            <AnimatePresence>
                {showProfile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowProfile(false)}
                        style={{
                            position: "fixed", inset: 0, zIndex: 9999,
                            background: "rgba(0,0,0,0.4)", backdropFilter: "blur(8px)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            padding: 24,
                        }}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            style={{
                                background: "#fff", borderRadius: 24, padding: "clamp(24px, 4vw, 36px)",
                                maxWidth: 420, width: "100%",
                                boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                                maxHeight: "90vh", overflowY: "auto",
                            }}
                        >
                            {/* Profile header */}
                            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: 999,
                                    background: "linear-gradient(135deg, #EC5212, #FF6B35)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#fff", fontWeight: 700, fontSize: 24, flexShrink: 0,
                                }}>
                                    {avatarLetter}
                                </div>
                                <div>
                                    <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1a1a1a" }}>{displayName}</h3>
                                    <p style={{ fontSize: 13, color: "#888" }}>{user?.email}</p>
                                </div>
                                <button onClick={() => setShowProfile(false)} style={{ marginLeft: "auto", background: "none", border: "none", fontSize: 20, color: "#ccc", cursor: "pointer" }}>✕</button>
                            </div>

                            <hr style={{ border: "none", height: 1, background: "rgba(0,0,0,0.06)", margin: "0 0 20px" }} />

                            {/* Info display */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                    <span style={{ color: "#888" }}>📧 이메일</span>
                                    <span style={{ color: "#333", fontWeight: 500 }}>{user?.email}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                    <span style={{ color: "#888" }}>📱 전화번호</span>
                                    <span style={{ color: "#333", fontWeight: 500 }}>{fmtPhoneDisplay(profile?.phone || null)}</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                    <span style={{ color: "#888" }}>🎓 학년</span>
                                    <span style={{ color: "#333", fontWeight: 500 }}>{profile?.grade || "미등록"}</span>
                                </div>
                            </div>

                            <hr style={{ border: "none", height: 1, background: "rgba(0,0,0,0.06)", margin: "0 0 20px" }} />

                            {/* Edit form */}
                            <h4 style={{ fontSize: 15, fontWeight: 600, color: "#1a1a1a", marginBottom: 14 }}>✏️ 프로필 수정</h4>
                            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 4, display: "block" }}>이름</label>
                                    <input type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="이름 입력"
                                        style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 4, display: "block" }}>전화번호</label>
                                    <input type="tel" value={fmtPhone(editPhone)} onChange={(e) => setEditPhone(e.target.value.replace(/\D/g, ""))} placeholder="010-1234-5678"
                                        style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" }}
                                    />
                                </div>
                                <div>
                                    <label style={{ fontSize: 12, fontWeight: 600, color: "#888", marginBottom: 4, display: "block" }}>학년</label>
                                    <select value={editGrade} onChange={(e) => setEditGrade(e.target.value)}
                                        style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 10, fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit", appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", cursor: "pointer" }}
                                    >
                                        <option value="">선택해주세요</option>
                                        {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>

                                {saveMsg && (
                                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        style={{ fontSize: 13, fontWeight: 500, color: saveMsg.includes("저장") ? "#4caf50" : "#d32f2f", textAlign: "center", padding: "6px 0" }}
                                    >{saveMsg}</motion.p>
                                )}

                                <button onClick={handleSaveProfile} disabled={saving}
                                    style={{
                                        padding: "12px 0", borderRadius: 12, border: "none",
                                        background: saving ? "#ccc" : "linear-gradient(135deg, #EC5212, #FF6B35)",
                                        color: "#fff", fontWeight: 600, fontSize: 14, cursor: saving ? "not-allowed" : "pointer",
                                        fontFamily: "inherit",
                                        boxShadow: saving ? "none" : "0 4px 16px rgba(236,82,18,0.2)",
                                    }}
                                >
                                    {saving ? "저장 중..." : "저장하기"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
