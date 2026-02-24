"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════
   선생님 로그인 — 이메일 + 비밀번호
   /teacher/login
   성공 시 → /dashboard/learning/admin
   ═══════════════════════════════════════ */

export default function TeacherLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.trim() || !password.trim()) {
            setError("이메일과 비밀번호를 입력해주세요.");
            return;
        }

        setLoading(true);
        try {
            // Try Supabase auth
            const { createClient } = await import("@/lib/supabase");
            const supabase = createClient();
            const { error: authError } = await supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password.trim(),
            });

            if (authError) {
                setError("이메일 또는 비밀번호가 올바르지 않습니다.");
                setLoading(false);
                return;
            }

            // Mark as teacher session
            localStorage.setItem("codingssok_role", "teacher");
            localStorage.setItem("codingssok_user", JSON.stringify({ name: "선생님", role: "teacher", email: email.trim() }));
            router.push("/teacher/admin");
        } catch {
            setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
            background: "linear-gradient(135deg, #1E1B4B 0%, #312E81 50%, #3730A3 100%)",
            padding: 20,
        }}>
            <motion.div
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    background: "#fff", borderRadius: 24, padding: "48px 40px",
                    maxWidth: 420, width: "100%",
                    boxShadow: "0 25px 80px rgba(0,0,0,0.3)",
                }}
            >
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        style={{
                            width: 64, height: 64, borderRadius: 20, margin: "0 auto 16px",
                            background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 28,
                        }}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /><circle cx="12" cy="7" r="4" stroke="#fff" strokeWidth="1.5" /><path d="M2 12h3M19 12h3" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" /></svg>
                    </motion.div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: "#1e1b4b", letterSpacing: "-0.03em" }}>
                        선생님 로그인
                    </h1>
                    <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 8 }}>
                        관리자 계정으로 로그인하세요
                    </p>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Email */}
                    <div style={{ marginBottom: 16 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>
                            이메일
                        </label>
                        <input
                            type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="teacher@codingssok.com"
                            style={{
                                width: "100%", padding: "12px 16px", borderRadius: 12,
                                border: "1px solid #e2e8f0", fontSize: 14, outline: "none",
                                transition: "border-color 0.2s", boxSizing: "border-box",
                            }}
                            onFocus={e => e.target.style.borderColor = "#4F46E5"}
                            onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: 24 }}>
                        <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#64748b", marginBottom: 6 }}>
                            비밀번호
                        </label>
                        <input
                            type="password" value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                                width: "100%", padding: "12px 16px", borderRadius: 12,
                                border: "1px solid #e2e8f0", fontSize: 14, outline: "none",
                                transition: "border-color 0.2s", boxSizing: "border-box",
                            }}
                            onFocus={e => e.target.style.borderColor = "#4F46E5"}
                            onBlur={e => e.target.style.borderColor = "#e2e8f0"}
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                padding: "10px 14px", borderRadius: 10, marginBottom: 16,
                                background: "#FEF2F2", border: "1px solid #FECACA",
                                fontSize: 13, color: "#DC2626", fontWeight: 500,
                            }}
                        >
                            {error}
                        </motion.div>
                    )}

                    {/* Submit */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%", padding: "14px", border: "none", borderRadius: 14,
                            background: loading ? "#94a3b8" : "linear-gradient(135deg, #4F46E5, #6366F1)",
                            color: "#fff", fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
                            boxShadow: "0 6px 20px rgba(79,70,229,0.3)",
                        }}
                    >
                        {loading ? "로그인 중..." : "로그인"}
                    </motion.button>
                </form>

                {/* Info */}
                <div style={{
                    marginTop: 24, padding: "12px 16px", borderRadius: 10,
                    background: "#F8FAFC", fontSize: 11, color: "#94a3b8", textAlign: "center",
                }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg> 등록된 관리자 계정으로만 접근 가능합니다</span>
                </div>

                <div style={{ textAlign: "center", marginTop: 16 }}>
                    <Link href="/" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>← 홈으로</Link>
                </div>
            </motion.div>
        </div>
    );
}
