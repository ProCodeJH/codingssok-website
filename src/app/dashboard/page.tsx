"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";
import type { User } from "@supabase/supabase-js";

/*
  학생 대시보드 — framer-motion 애니메이션, 프로필 아바타, 반응형
*/

interface ProgressData {
    label: string;
    subject: string;
    total: number;
    completed: number;
    color: string;
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState<ProgressData[]>([]);

    const supabase = createClient();

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) {
                window.location.href = "/login";
                return;
            }
            setUser(data.user);
            setLoading(false);
        });
    }, [supabase]);

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
                results.push({ label: sub.label, subject: sub.subject, total: sub.total, completed: data?.length || 0, color: sub.color });
            } catch {
                results.push({ label: sub.label, subject: sub.subject, total: sub.total, completed: 0, color: sub.color });
            }
        }

        setProgress(results);
    }, [user, supabase]);

    useEffect(() => {
        if (user) fetchProgress();
    }, [user, fetchProgress]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = "/";
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

    const userName = user?.email?.split("@")[0] || "학생";
    const avatarLetter = userName.charAt(0).toUpperCase();

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
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Avatar */}
                    <div style={{
                        width: 36, height: 36, borderRadius: 999,
                        background: "linear-gradient(135deg, #EC5212, #FF6B35)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#fff", fontWeight: 700, fontSize: 14,
                    }}>
                        {avatarLetter}
                    </div>
                    <span style={{ fontSize: 13, color: "#666", display: "none" }} className="dash-email">{user?.email}</span>
                    <button onClick={handleLogout} style={{
                        padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(0,0,0,0.08)",
                        background: "rgba(255,255,255,0.6)", fontSize: 12, cursor: "pointer", color: "#888",
                        fontWeight: 500, transition: "all 0.2s",
                    }}>로그아웃</button>
                </div>
            </motion.header>

            {/* Content */}
            <div style={{ maxWidth: 1000, margin: "0 auto", padding: "clamp(24px, 4vw, 48px) clamp(16px, 3vw, 24px)" }}>
                {/* Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    style={{ marginBottom: "clamp(24px, 4vw, 40px)" }}
                >
                    <h1 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 700, marginBottom: 8, color: "#1a1a1a" }}>
                        안녕하세요, {userName}님! 👋
                    </h1>
                    <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "#888" }}>오늘도 즐겁게 코딩 해볼까요?</p>
                </motion.div>

                {/* Module cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))", gap: 20, marginBottom: 32 }}>
                    {modules.map((mod, i) => (
                        <motion.div
                            key={mod.href}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link href={mod.href} style={{ textDecoration: "none", display: "block" }}>
                                <motion.div
                                    whileHover={{ y: -6, boxShadow: "0 12px 40px rgba(0,0,0,0.1)" }}
                                    style={{
                                        background: "#fff", borderRadius: 24, padding: "clamp(24px, 3vw, 32px)",
                                        border: "1.5px solid rgba(0,0,0,0.04)",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                                        transition: "all 0.3s", cursor: "pointer",
                                    }}
                                >
                                    <div style={{
                                        width: 56, height: 56, borderRadius: 16,
                                        background: mod.gradient, display: "flex",
                                        alignItems: "center", justifyContent: "center",
                                        fontSize: 28, marginBottom: 16,
                                    }}>
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
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{
                        background: "#fff", borderRadius: 24, padding: "clamp(24px, 3vw, 32px)",
                        border: "1.5px solid rgba(0,0,0,0.04)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                    }}
                >
                    <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24, color: "#1a1a1a" }}>📊 학습 진행률</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        {progress.length === 0 ? (
                            <p style={{ color: "#999", textAlign: "center", padding: 20 }}>진행률을 불러오는 중...</p>
                        ) : (
                            progress.map((item, i) => {
                                const percent = item.total > 0 ? Math.round((item.completed / item.total) * 100) : 0;
                                return (
                                    <motion.div
                                        key={item.subject}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + i * 0.1 }}
                                    >
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
        </div>
    );
}
