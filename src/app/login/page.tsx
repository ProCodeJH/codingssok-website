"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";

/*
  로그인/회원가입 — 애니메이션 + 브랜드 강화
*/

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [mode, setMode] = useState<"login" | "signup">("login");

    const supabase = createClient();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (mode === "login") {
                const { error } = await supabase.auth.signInWithPassword({ email, password });
                if (error) throw error;
                window.location.href = "/dashboard";
            } else {
                const { error } = await supabase.auth.signUp({ email, password });
                if (error) throw error;
                setError("가입 완료! 이메일을 확인해주세요.");
            }
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : "오류가 발생했습니다.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #fdfaf5 0%, #fff5eb 50%, #f5e6d3 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24,
            position: "relative",
            overflow: "hidden",
        }}>
            {/* Background decorative elements */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", top: -100, right: -100,
                    width: 400, height: 400, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(255,211,125,0.15) 0%, transparent 70%)",
                }}
            />
            <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute", bottom: -120, left: -120,
                    width: 500, height: 500, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(236,82,18,0.08) 0%, transparent 70%)",
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    background: "rgba(255,255,255,0.85)",
                    backdropFilter: "blur(20px)",
                    borderRadius: 28,
                    padding: "clamp(32px, 5vw, 48px) clamp(24px, 4vw, 40px)",
                    maxWidth: 440,
                    width: "100%",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
                    border: "1px solid rgba(255,255,255,0.8)",
                    position: "relative",
                    zIndex: 1,
                }}
            >
                {/* Logo */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
                    style={{ textAlign: "center", marginBottom: 24 }}
                >
                    <Link href="/" style={{ textDecoration: "none" }}>
                        <span style={{ fontSize: 48, display: "block", marginBottom: 8 }}>🌸</span>
                        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em" }}>코딩쏙</h1>
                    </Link>
                    <p style={{ color: "#888", fontSize: 14, marginTop: 8 }}>
                        {mode === "login" ? "학습 플랫폼에 로그인하세요" : "새 계정을 만들어 시작하세요"}
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    style={{ display: "flex", marginBottom: 28, borderRadius: 14, background: "rgba(0,0,0,0.04)", padding: 4 }}
                >
                    {(["login", "signup"] as const).map((m) => (
                        <button
                            key={m}
                            onClick={() => { setMode(m); setError(null); }}
                            style={{
                                flex: 1, padding: "12px 0", border: "none", borderRadius: 10,
                                background: mode === m ? "#fff" : "transparent",
                                fontWeight: 600, fontSize: 14, cursor: "pointer",
                                color: mode === m ? "#1a1a1a" : "#999",
                                boxShadow: mode === m ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
                                transition: "all 0.25s ease",
                            }}
                        >
                            {m === "login" ? "🔑 로그인" : "✨ 회원가입"}
                        </button>
                    ))}
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleAuth}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 }}
                    style={{ display: "flex", flexDirection: "column", gap: 18 }}
                >
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6, display: "block" }}>이메일</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="student@codingssok.com"
                            required
                            style={{
                                width: "100%", padding: "14px 16px",
                                border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 14,
                                fontSize: 14, outline: "none", transition: "all 0.2s",
                                boxSizing: "border-box", background: "rgba(255,255,255,0.7)",
                            }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = "#EC5212"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(236,82,18,0.1)"; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6, display: "block" }}>비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            minLength={6}
                            style={{
                                width: "100%", padding: "14px 16px",
                                border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 14,
                                fontSize: 14, outline: "none", transition: "all 0.2s",
                                boxSizing: "border-box", background: "rgba(255,255,255,0.7)",
                            }}
                            onFocus={(e) => { e.currentTarget.style.borderColor = "#EC5212"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(236,82,18,0.1)"; }}
                            onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
                        />
                    </div>

                    {error && (
                        <motion.p
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: "12px 16px", borderRadius: 12,
                                background: error.includes("완료") ? "rgba(46,125,50,0.08)" : "rgba(211,47,47,0.08)",
                                color: error.includes("완료") ? "#2e7d32" : "#d32f2f",
                                fontSize: 13, fontWeight: 500,
                            }}
                        >
                            {error}
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={loading ? {} : { scale: 1.02, y: -1 }}
                        whileTap={loading ? {} : { scale: 0.98 }}
                        style={{
                            padding: "15px 0", borderRadius: 14, border: "none",
                            background: loading ? "#ccc" : "linear-gradient(135deg, #EC5212, #FF6B35)",
                            color: "#fff", fontWeight: 700, fontSize: 15,
                            cursor: loading ? "not-allowed" : "pointer",
                            transition: "background 0.3s",
                            marginTop: 4,
                            boxShadow: loading ? "none" : "0 4px 20px rgba(236,82,18,0.3)",
                        }}
                    >
                        {loading ? "처리 중..." : mode === "login" ? "로그인" : "가입하기"}
                    </motion.button>
                </motion.form>

                <p style={{ textAlign: "center", marginTop: 28, fontSize: 13, color: "#999" }}>
                    <Link href="/" style={{ color: "#EC5212", textDecoration: "none", fontWeight: 500 }}>
                        ← 홈으로 돌아가기
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
