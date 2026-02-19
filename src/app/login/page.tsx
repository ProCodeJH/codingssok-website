"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/*
  로그인/회원가입 — Coddy 스플릿 스크린 + 코딩쏙 브랜드
  - 왼쪽: 로그인/회원가입 카드
  - 오른쪽: 혜택 리스트 + 코딩쏙 브랜딩
*/

type Mode = "login" | "signup";

const GRADES = [
  "초등 1학년", "초등 2학년", "초등 3학년", "초등 4학년", "초등 5학년", "초등 6학년",
  "중등 1학년", "중등 2학년", "중등 3학년",
  "고등 1학년", "고등 2학년", "고등 3학년",
  "대학생/성인",
];

const BENEFITS = [
  { icon: "💻", title: "실습 중심", desc: "코드를 직접 작성하며 배워요" },
  { icon: "🎯", title: "맞춤형 학습", desc: "학년별 커리큘럼 제공" },
  { icon: "🔥", title: "게이미피케이션", desc: "XP, 스트릭, 레벨업!" },
  { icon: "🤖", title: "AI 코딩 도우미", desc: "막히면 AI가 힌트를 줘요" },
  { icon: "📊", title: "실시간 진행률", desc: "학습 현황을 한눈에 확인" },
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
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [signupDone, setSignupDone] = useState(false);

  /* 전화번호 자동 포맷 */
  const fmtPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  };

  const switchMode = (m: Mode) => {
    setMode(m); setMsg(null); setSignupDone(false);
  };

  /* ── 로그인 ── */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setMsg(null);
    try {
      const sb = createClient();
      const { error } = await sb.auth.signInWithPassword({ email, password });
      if (error) throw error;
      window.location.href = "/dashboard";
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMsg({ ok: false, text: message.includes("Invalid") ? "이메일 또는 비밀번호가 잘못되었습니다" : message });
    } finally { setLoading(false); }
  };

  /* ── 회원가입 ── */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) { setMsg({ ok: false, text: "비밀번호가 일치하지 않습니다" }); return; }
    if (password.length < 6) { setMsg({ ok: false, text: "비밀번호는 최소 6자 이상이어야 합니다" }); return; }
    setLoading(true); setMsg(null);
    try {
      const sb = createClient();
      const { data, error } = await sb.auth.signUp({ email, password });
      if (error) throw error;
      if (data.user) {
        await sb.from("profiles").upsert({
          id: data.user.id, name, phone: phone.replace(/\D/g, "") || null, grade: grade || null, email,
        });
      }
      setSignupDone(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMsg({ ok: false, text: message.includes("already") ? "이미 가입된 이메일입니다" : message });
    } finally { setLoading(false); }
  };

  // 코딩쏙 브랜드 스타일
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "0 16px", borderRadius: 12, border: "none",
    background: "#252320", color: "#fff", height: 51,
    fontSize: 14, outline: "none", fontFamily: "inherit",
    transition: "all 0.2s",
  };

  const labelStyle: React.CSSProperties = {
    display: "block", fontSize: 12, fontWeight: 600, marginBottom: 6,
    color: "rgba(255,255,255,0.6)",
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      background: "linear-gradient(135deg, #3a2e24 0%, #2a2420 40%, #1e1c1a 100%)",
    }}>
      {/* ── 왼쪽: 로그인/회원가입 카드 ── */}
      <div style={{
        flex: "0 0 clamp(380px, 35vw, 520px)", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "clamp(20px, 3vw, 40px)",
      }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "rgba(58,52,45,0.95)", backdropFilter: "blur(20px)",
            borderRadius: 16, padding: "clamp(28px, 3vw, 40px)",
            width: "100%", maxWidth: 460,
            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Tabs — Coddy JSON: 342×2px divider, 1px radius */}
          <div style={{
            display: "flex", marginBottom: 24,
            borderBottom: "2px solid rgba(255,255,255,0.06)", borderRadius: "0 0 1px 1px",
          }}>
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => switchMode(m)}
                style={{
                  flex: 1, padding: "14px 0", border: "none", background: "transparent",
                  fontWeight: 600, fontSize: 14, cursor: "pointer",
                  color: mode === m ? "#fff" : "rgba(255,255,255,0.4)",
                  borderBottom: mode === m ? "3px solid #EC5212" : "2px solid transparent",
                  marginBottom: -2, transition: "all 0.25s", fontFamily: "inherit",
                }}
              >
                {m === "login" ? "로그인" : "가입하기"}
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
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.4 }}>✉️</span>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="이메일 주소" required
                      style={{ ...inputStyle, paddingLeft: 42 }}
                    />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>비밀번호</label>
                  <div style={{ position: "relative" }}>
                    <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: 16, opacity: 0.4 }}>🔑</span>
                    <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)}
                      placeholder="비밀번호" required minLength={6}
                      style={{ ...inputStyle, paddingLeft: 42, paddingRight: 48 }}
                    />
                    <button type="button" onClick={() => setShowPw(!showPw)}
                      style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "rgba(255,255,255,0.4)", padding: 4 }}
                    >
                      {showPw ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {msg && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    style={{ padding: "10px 14px", borderRadius: 10, background: msg.ok ? "rgba(46,125,50,0.15)" : "rgba(211,47,47,0.15)", color: msg.ok ? "#81c784" : "#ef5350", fontSize: 13, fontWeight: 500 }}
                  >
                    {msg.text}
                  </motion.p>
                )}

                <motion.button type="submit" disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02, y: -1 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  style={{
                    padding: "15px 0", borderRadius: 12, border: "none",
                    background: loading ? "#555" : "#EC5212",
                    color: "#fff", fontWeight: 700, fontSize: 15,
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: loading ? "none" : "0 4px 20px rgba(236,82,18,0.4)",
                    fontFamily: "inherit", marginTop: 4, height: 47,
                    transition: "all 0.2s",
                  }}
                >
                  {loading ? "로그인 중..." : "계정 로그인"}
                </motion.button>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "4px 0" }}>
                  <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1 }} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>또는</span>
                  <div style={{ flex: 1, height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1 }} />
                </div>

                {/* Social Buttons (placeholder) */}
                <div style={{ display: "flex", gap: 10 }}>
                  <button type="button" style={{
                    flex: 1, padding: "12px 0", borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.6)",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}>
                    🟡 KAKAO
                  </button>
                  <button type="button" style={{
                    flex: 1, height: 51, borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)",
                    background: "#2d2a26", color: "rgba(255,255,255,0.6)",
                    fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
                    transition: "all 0.2s",
                  }}>
                    G GOOGLE
                  </button>
                </div>
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
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                <div>
                  <label style={labelStyle}>이름 <span style={{ color: "#EC5212" }}>*</span></label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="홍길동" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>이메일 <span style={{ color: "#EC5212" }}>*</span></label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="student@example.com" required style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>전화번호 (학부모 또는 본인)</label>
                  <input type="tel" value={phone} onChange={(e) => setPhone(fmtPhone(e.target.value))} placeholder="010-1234-5678" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>학년 <span style={{ color: "#EC5212" }}>*</span></label>
                  <select value={grade} onChange={(e) => setGrade(e.target.value)} required
                    style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23999' d='M6 8L1 3h10z'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center", cursor: "pointer" }}
                  >
                    <option value="" disabled>학년을 선택하세요</option>
                    {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>비밀번호 <span style={{ color: "#EC5212" }}>*</span> <span style={{ fontWeight: 400, color: "rgba(255,255,255,0.3)" }}>(6자 이상)</span></label>
                  <div style={{ position: "relative" }}>
                    <input type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="비밀번호 입력" required minLength={6} style={{ ...inputStyle, paddingRight: 48 }} />
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "rgba(255,255,255,0.4)", padding: 4 }}>
                      {showPw ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {password && (
                    <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
                      {[1, 2, 3, 4].map((level) => {
                        const strength = password.length >= 12 ? 4 : password.length >= 8 ? 3 : password.length >= 6 ? 2 : 1;
                        const colors = ["#d32f2f", "#ff9800", "#ffc107", "#4caf50"];
                        return <div key={level} style={{ flex: 1, height: 3, borderRadius: 2, background: level <= strength ? colors[strength - 1] : "rgba(255,255,255,0.08)", transition: "all 0.3s" }} />;
                      })}
                    </div>
                  )}
                </div>
                <div>
                  <label style={labelStyle}>비밀번호 확인 <span style={{ color: "#EC5212" }}>*</span></label>
                  <input type={showPw ? "text" : "password"} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} placeholder="비밀번호 다시 입력" required
                    style={{ ...inputStyle, borderColor: passwordConfirm && password !== passwordConfirm ? "#d32f2f" : undefined }}
                  />
                  {passwordConfirm && password !== passwordConfirm && (
                    <p style={{ fontSize: 12, color: "#ef5350", marginTop: 4, fontWeight: 500 }}>비밀번호가 일치하지 않습니다</p>
                  )}
                  {passwordConfirm && password === passwordConfirm && passwordConfirm.length >= 6 && (
                    <p style={{ fontSize: 12, color: "#81c784", marginTop: 4, fontWeight: 500 }}>✓ 비밀번호가 일치합니다</p>
                  )}
                </div>

                {msg && (
                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                    style={{ padding: "10px 14px", borderRadius: 10, background: msg.ok ? "rgba(46,125,50,0.15)" : "rgba(211,47,47,0.15)", color: msg.ok ? "#81c784" : "#ef5350", fontSize: 13, fontWeight: 500 }}
                  >
                    {msg.text}
                  </motion.p>
                )}

                <motion.button type="submit" disabled={loading}
                  whileHover={loading ? {} : { scale: 1.02, y: -1 }}
                  whileTap={loading ? {} : { scale: 0.98 }}
                  style={{
                    padding: "15px 0", borderRadius: 12, border: "none",
                    background: loading ? "#555" : "#EC5212",
                    color: "#fff", fontWeight: 700, fontSize: 15,
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: loading ? "none" : "0 4px 20px rgba(236,82,18,0.4)",
                    fontFamily: "inherit", marginTop: 4,
                  }}
                >
                  {loading ? "가입 처리 중..." : "계정 생성"}
                </motion.button>

                <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "center", lineHeight: 1.5 }}>
                  가입 시 <span style={{ color: "rgba(255,255,255,0.5)" }}>이용약관</span> 및 <span style={{ color: "rgba(255,255,255,0.5)" }}>개인정보 처리방침</span>에 동의합니다.
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
                <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.6 }}
                  style={{ fontSize: 56, display: "block", marginBottom: 16 }}
                >
                  🎉
                </motion.span>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8 }}>가입 완료!</h3>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: 24 }}>
                  <strong style={{ color: "#fff" }}>{name}</strong>님 환영합니다!<br />
                  이메일 인증 후 로그인해주세요.
                </p>
                <button
                  onClick={() => { switchMode("login"); setPassword(""); setPasswordConfirm(""); }}
                  style={{
                    padding: "12px 28px", borderRadius: 12, border: "none",
                    background: "#EC5212", color: "#fff", fontWeight: 600,
                    fontSize: 14, cursor: "pointer",
                    boxShadow: "0 4px 16px rgba(236,82,18,0.4)", fontFamily: "inherit",
                  }}
                >
                  로그인하러 가기 →
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          <p style={{ textAlign: "center", marginTop: 24, fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            <Link href="/" style={{ color: "#EC5212", textDecoration: "none", fontWeight: 500 }}>
              ← 홈으로 돌아가기
            </Link>
          </p>
        </motion.div>
      </div>

      {/* ── 오른쪽: 혜택 리스트 + 브랜딩 ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "clamp(24px, 4vw, 60px)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Decorative blob */}
        <div style={{
          position: "absolute", top: "-20%", right: "-10%", width: "70%", height: "70%",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(236,82,18,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: "-15%", left: "-5%", width: "50%", height: "50%",
          borderRadius: "50%", background: "radial-gradient(circle, rgba(255,211,125,0.06) 0%, transparent 70%)",
          filter: "blur(60px)",
        }} />

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ position: "relative", zIndex: 1, maxWidth: 480 }}
        >
          {/* Brand heading */}
          <div style={{ marginBottom: 48 }}>
            <span style={{ fontSize: 48, display: "block", marginBottom: 12 }}>🌸</span>
            <h1 style={{
              fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, lineHeight: 1.2,
              color: "#fff", marginBottom: 12,
            }}>
              코딩 여정을<br />
              <span style={{
                background: "linear-gradient(90deg, #EC5212, #FF6B35)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>시작하세요</span>
            </h1>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
              코딩쏙에서 재미있게 코딩을 배워보세요.
            </p>
          </div>

          {/* Benefits list */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {BENEFITS.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                style={{ display: "flex", alignItems: "center", gap: 16 }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: "rgba(236,82,18,0.1)", border: "1px solid rgba(236,82,18,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20, flexShrink: 0,
                }}>
                  {b.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{b.title}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)" }}>{b.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              marginTop: 48, fontSize: 14, color: "rgba(255,255,255,0.25)",
              fontStyle: "italic", textAlign: "center",
            }}
          >
            Learn → Practice → Code → Repeat. 🚀
          </motion.p>
        </motion.div>
      </div>

      {/* Mobile: hide right side */}
      <style>{`
        @media (max-width: 768px) {
          body > div > div:last-child { display: none !important; }
          body > div > div:first-child { flex: 1 !important; }
        }
      `}</style>
    </div>
  );
}
