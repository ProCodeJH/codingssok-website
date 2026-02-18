"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/*
  로그인/회원가입 — 풀 프로필 수집 + 유효성 검증 + 비밀번호 토글
*/

type Mode = "login" | "signup";

const GRADES = [
  "초등 1학년", "초등 2학년", "초등 3학년", "초등 4학년", "초등 5학년", "초등 6학년",
  "중등 1학년", "중등 2학년", "중등 3학년",
  "고등 1학년", "고등 2학년", "고등 3학년",
  "대학생/성인",
];

export default function LoginPage() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [grade, setGrade] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ text: string; ok: boolean } | null>(null);
  const [signupDone, setSignupDone] = useState(false);

  const supabase = createClient();

  /* 전화번호 자동 포맷 */
  const fmtPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  };

  const switchMode = (m: Mode) => {
    setMode(m);
    setMsg(null);
    setSignupDone(false);
  };

  /* ── 로그인 ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        if (error.message.includes("Invalid login")) throw new Error("이메일 또는 비밀번호가 잘못되었습니다.");
        throw error;
      }
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      setMsg({ text: err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다.", ok: false });
    } finally {
      setLoading(false);
    }
  };

  /* ── 회원가입 ── */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    // Validation
    if (!name.trim()) { setMsg({ text: "이름을 입력해주세요.", ok: false }); setLoading(false); return; }
    if (!grade) { setMsg({ text: "학년을 선택해주세요.", ok: false }); setLoading(false); return; }
    if (password.length < 6) { setMsg({ text: "비밀번호는 6자 이상이어야 합니다.", ok: false }); setLoading(false); return; }
    if (password !== passwordConfirm) { setMsg({ text: "비밀번호가 일치하지 않습니다.", ok: false }); setLoading(false); return; }

    try {
      // 1. Supabase Auth 회원가입
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name: name.trim(), phone: phone.replace(/-/g, ""), grade },
        },
      });
      if (error) {
        if (error.message.includes("already registered")) throw new Error("이미 가입된 이메일입니다.");
        throw error;
      }

      // 2. profiles 테이블에 프로필 생성
      if (data.user) {
        await supabase.from("profiles").upsert({
          id: data.user.id,
          email,
          name: name.trim(),
          phone: phone.replace(/-/g, ""),
          grade,
        });
      }

      setSignupDone(true);
      setMsg({ text: "🎉 가입이 완료되었습니다! 이메일 인증 후 로그인해주세요.", ok: true });
    } catch (err: unknown) {
      setMsg({ text: err instanceof Error ? err.message : "회원가입 중 오류가 발생했습니다.", ok: false });
    } finally {
      setLoading(false);
    }
  };

  /* ── Input 공통 스타일 ── */
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 16px",
    border: "1.5px solid rgba(0,0,0,0.08)", borderRadius: 12,
    fontSize: 14, outline: "none", transition: "all 0.2s",
    boxSizing: "border-box", background: "rgba(255,255,255,0.7)",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6, display: "block",
  };

  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "#EC5212";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(236,82,18,0.1)";
  };
  const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #fdfaf5 0%, #fff5eb 50%, #f5e6d3 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 24, position: "relative", overflow: "hidden",
    }}>
      {/* Background circles */}
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: -100, right: -100, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,211,125,0.15) 0%, transparent 70%)" }}
      />
      <motion.div animate={{ rotate: -360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", bottom: -120, left: -120, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(236,82,18,0.08) 0%, transparent 70%)" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          background: "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)",
          borderRadius: 28,
          padding: "clamp(28px, 5vw, 44px) clamp(24px, 4vw, 40px)",
          maxWidth: 460, width: "100%",
          boxShadow: "0 8px 40px rgba(0,0,0,0.06), 0 1px 4px rgba(0,0,0,0.04)",
          border: "1px solid rgba(255,255,255,0.8)",
          position: "relative", zIndex: 1,
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.15 }}
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontSize: 44, display: "block", marginBottom: 4 }}>🌸</span>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1a1a1a", letterSpacing: "-0.02em" }}>코딩쏙</h1>
          </Link>
          <p style={{ color: "#888", fontSize: 13, marginTop: 6 }}>
            {mode === "login" ? "학습 플랫폼에 로그인하세요" : "새 계정을 만들어 시작하세요"}
          </p>
        </motion.div>

        {/* Tabs */}
        <div style={{ display: "flex", marginBottom: 24, borderRadius: 12, background: "rgba(0,0,0,0.04)", padding: 3 }}>
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              onClick={() => switchMode(m)}
              style={{
                flex: 1, padding: "11px 0", border: "none", borderRadius: 10,
                background: mode === m ? "#fff" : "transparent",
                fontWeight: 600, fontSize: 13, cursor: "pointer",
                color: mode === m ? "#1a1a1a" : "#999",
                boxShadow: mode === m ? "0 2px 12px rgba(0,0,0,0.06)" : "none",
                transition: "all 0.25s", fontFamily: "inherit",
              }}
            >
              {m === "login" ? "🔑 로그인" : "✨ 회원가입"}
            </button>
          ))}
        </div>

        {/* ── 로그인 폼 ── */}
        <AnimatePresence mode="wait">
          {mode === "login" && (
            <motion.form
              key="login"
              onSubmit={handleLogin}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div>
                <label style={labelStyle}>이메일</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div>
                <label style={labelStyle}>비밀번호</label>
                <div style={{ position: "relative" }}>
                  <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} style={{ ...inputStyle, paddingRight: 48 }} onFocus={focusHandler} onBlur={blurHandler} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#999", padding: 4 }}>
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {msg && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  style={{ padding: "10px 14px", borderRadius: 10, background: msg.ok ? "rgba(46,125,50,0.08)" : "rgba(211,47,47,0.08)", color: msg.ok ? "#2e7d32" : "#d32f2f", fontSize: 13, fontWeight: 500 }}
                >
                  {msg.text}
                </motion.p>
              )}

              <motion.button type="submit" disabled={loading} whileHover={loading ? {} : { scale: 1.02, y: -1 }} whileTap={loading ? {} : { scale: 0.98 }}
                style={{ padding: "14px 0", borderRadius: 14, border: "none", background: loading ? "#ccc" : "linear-gradient(135deg, #EC5212, #FF6B35)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 4px 20px rgba(236,82,18,0.3)", fontFamily: "inherit", marginTop: 4 }}
              >
                {loading ? "로그인 중..." : "로그인"}
              </motion.button>
            </motion.form>
          )}

          {/* ── 회원가입 폼 ── */}
          {mode === "signup" && !signupDone && (
            <motion.form
              key="signup"
              onSubmit={handleSignup}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              style={{ display: "flex", flexDirection: "column", gap: 14 }}
            >
              {/* 이름 */}
              <div>
                <label style={labelStyle}>이름 <span style={{ color: "#EC5212" }}>*</span></label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>

              {/* 이메일 */}
              <div>
                <label style={labelStyle}>이메일 <span style={{ color: "#EC5212" }}>*</span></label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" required style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>

              {/* 전화번호 */}
              <div>
                <label style={labelStyle}>전화번호 (학부모 또는 본인)</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(fmtPhone(e.target.value))} placeholder="010-1234-5678" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>

              {/* 학년 */}
              <div>
                <label style={labelStyle}>학년 <span style={{ color: "#EC5212" }}>*</span></label>
                <select value={grade} onChange={(e) => setGrade(e.target.value)} required
                  style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", cursor: "pointer", color: grade ? "#1a1a1a" : "#aaa" }}
                  onFocus={focusHandler} onBlur={blurHandler}
                >
                  <option value="" disabled>학년을 선택하세요</option>
                  {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>

              {/* 비밀번호 */}
              <div>
                <label style={labelStyle}>비밀번호 <span style={{ color: "#EC5212" }}>*</span> <span style={{ fontWeight: 400, color: "#bbb" }}>(6자 이상)</span></label>
                <div style={{ position: "relative" }}>
                  <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 입력" required minLength={6} style={{ ...inputStyle, paddingRight: 48 }} onFocus={focusHandler} onBlur={blurHandler} />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#999", padding: 4 }}>
                    {showPw ? "🙈" : "👁️"}
                  </button>
                </div>
                {/* Password strength indicator */}
                {password && (
                  <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
                    {[1, 2, 3, 4].map((level) => {
                      const strength = password.length >= 12 ? 4 : password.length >= 8 ? 3 : password.length >= 6 ? 2 : 1;
                      const colors = ["#d32f2f", "#ff9800", "#ffc107", "#4caf50"];
                      return (
                        <div key={level} style={{ flex: 1, height: 3, borderRadius: 2, background: level <= strength ? colors[strength - 1] : "rgba(0,0,0,0.06)", transition: "all 0.3s" }} />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 비밀번호 확인 */}
              <div>
                <label style={labelStyle}>비밀번호 확인 <span style={{ color: "#EC5212" }}>*</span></label>
                <input type={showPw ? "text" : "password"} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="비밀번호 다시 입력" required style={{ ...inputStyle, borderColor: passwordConfirm && password !== passwordConfirm ? "#d32f2f" : undefined }} onFocus={focusHandler} onBlur={blurHandler} />
                {passwordConfirm && password !== passwordConfirm && (
                  <p style={{ fontSize: 12, color: "#d32f2f", marginTop: 4, fontWeight: 500 }}>비밀번호가 일치하지 않습니다</p>
                )}
                {passwordConfirm && password === passwordConfirm && passwordConfirm.length >= 6 && (
                  <p style={{ fontSize: 12, color: "#4caf50", marginTop: 4, fontWeight: 500 }}>✓ 비밀번호가 일치합니다</p>
                )}
              </div>

              {msg && (
                <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                  style={{ padding: "10px 14px", borderRadius: 10, background: msg.ok ? "rgba(46,125,50,0.08)" : "rgba(211,47,47,0.08)", color: msg.ok ? "#2e7d32" : "#d32f2f", fontSize: 13, fontWeight: 500 }}
                >
                  {msg.text}
                </motion.p>
              )}

              <motion.button type="submit" disabled={loading} whileHover={loading ? {} : { scale: 1.02, y: -1 }} whileTap={loading ? {} : { scale: 0.98 }}
                style={{ padding: "14px 0", borderRadius: 14, border: "none", background: loading ? "#ccc" : "linear-gradient(135deg, #EC5212, #FF6B35)", color: "#fff", fontWeight: 700, fontSize: 15, cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 4px 20px rgba(236,82,18,0.3)", fontFamily: "inherit", marginTop: 4 }}
              >
                {loading ? "가입 처리 중..." : "가입하기"}
              </motion.button>

              <p style={{ fontSize: 11, color: "#bbb", textAlign: "center", lineHeight: 1.5 }}>
                가입 시 <span style={{ color: "#888" }}>이용약관</span> 및 <span style={{ color: "#888" }}>개인정보 처리방침</span>에 동의합니다.
              </p>
            </motion.form>
          )}

          {/* ── 가입 완료 ── */}
          {mode === "signup" && signupDone && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ textAlign: "center", padding: "20px 0" }}
            >
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.6 }}
                style={{ fontSize: 56, display: "block", marginBottom: 16 }}
              >
                🎉
              </motion.span>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 8 }}>가입 완료!</h3>
              <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 24 }}>
                <strong>{name}</strong>님 환영합니다!<br />
                이메일 인증 후 로그인해주세요.
              </p>
              <button
                onClick={() => { switchMode("login"); setPassword(""); setPasswordConfirm(""); }}
                style={{
                  padding: "12px 28px", borderRadius: 12, border: "none",
                  background: "linear-gradient(135deg, #EC5212, #FF6B35)",
                  color: "#fff", fontWeight: 600, fontSize: 14, cursor: "pointer",
                  boxShadow: "0 4px 16px rgba(236,82,18,0.3)", fontFamily: "inherit",
                }}
              >
                로그인하러 가기 →
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "#999" }}>
          <Link href="/" style={{ color: "#EC5212", textDecoration: "none", fontWeight: 500 }}>
            ← 홈으로 돌아가기
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
