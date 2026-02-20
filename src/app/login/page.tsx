"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

type Mode = "login" | "signup";

const GRADES = [
  "초등 1학년", "초등 2학년", "초등 3학년", "초등 4학년", "초등 5학년", "초등 6학년",
  "중등 1학년", "중등 2학년", "중등 3학년",
  "고등 1학년", "고등 2학년", "고등 3학년",
  "대학생/성인",
];

/* ── Shared style helpers ── */
const PRIMARY = "#13daec";
const PRIMARY_DARK = "#0fbccb";

const inputWrap: React.CSSProperties = { position: "relative" };
const inputIcon: React.CSSProperties = {
  position: "absolute", top: 0, left: 0, bottom: 0, display: "flex",
  alignItems: "center", paddingLeft: 12, pointerEvents: "none", color: "#94a3b8",
};
const inputBase: React.CSSProperties = {
  display: "block", width: "100%", paddingLeft: 40, paddingRight: 12,
  paddingTop: 12, paddingBottom: 12, border: "1px solid #e2e8f0",
  borderRadius: 12, background: "rgba(248,250,252,0.5)", fontSize: 14,
  color: "#0f172a", outline: "none", transition: "all 0.2s",
};
const labelBase: React.CSSProperties = {
  display: "block", fontSize: 14, fontWeight: 500, color: "#334155",
  marginBottom: 6, marginLeft: 4,
};
const msgStyle = (ok: boolean): React.CSSProperties => ({
  padding: 12, borderRadius: 12, fontSize: 14, fontWeight: 500,
  background: ok ? "#f0fdf4" : "#fef2f2", color: ok ? "#15803d" : "#dc2626",
});
const primaryBtn: React.CSSProperties = {
  display: "flex", width: "100%", justifyContent: "center", padding: "14px 16px",
  borderRadius: 12, fontSize: 14, fontWeight: 700, color: "#fff", border: "none",
  background: `linear-gradient(to right, ${PRIMARY}, #0ea5b3)`,
  boxShadow: `0 4px 14px rgba(19,218,236,0.3)`, cursor: "pointer", transition: "all 0.2s",
};

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
  const [terms, setTerms] = useState(false);

  const fmtPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7)}`;
  };

  const switchMode = (m: Mode) => { setMode(m); setMsg(null); setSignupDone(false); };

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

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordConfirm) { setMsg({ ok: false, text: "비밀번호가 일치하지 않습니다" }); return; }
    if (password.length < 6) { setMsg({ ok: false, text: "비밀번호는 최소 6자 이상이어야 합니다" }); return; }
    if (!terms) { setMsg({ ok: false, text: "이용약관에 동의해주세요" }); return; }
    setLoading(true); setMsg(null);
    try {
      const sb = createClient();
      const { data, error } = await sb.auth.signUp({ email, password });
      if (error) throw error;
      if (data.user) {
        await sb.from("profiles").upsert({
          id: data.user.id, name, phone: phone.replace(/\D/g, "") || null, grade: grade || null, email,
        });
        // 신규 가입 시 user_progress 초기화
        await sb.from("user_progress").upsert({
          user_id: data.user.id, xp: 0, level: 1, streak: 0,
        }, { onConflict: "user_id" });
      }
      setSignupDone(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMsg({ ok: false, text: message.includes("already") ? "이미 가입된 이메일입니다" : message });
    } finally { setLoading(false); }
  };

  const pwStrength = password.length >= 12 ? 4 : password.length >= 8 ? 3 : password.length >= 6 ? 2 : password.length > 0 ? 1 : 0;
  const pwColor = pwStrength <= 1 ? "#f87171" : pwStrength <= 2 ? "#fb923c" : pwStrength <= 3 ? "#facc15" : "#22c55e";

  return (
    <div style={{ minHeight: "100vh", display: "flex", fontFamily: "Inter, sans-serif", color: "#0f172a", background: "#fff", overflow: "hidden" }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />

      {/* ── LEFT: Decorative Panel (Login Only) ── */}
      {mode === "login" && (
        <div style={{
          display: "none", width: "50%", background: "#f8fafc", position: "relative",
          alignItems: "center", justifyContent: "center", overflow: "hidden",
        }} className="login-left-panel">
          <div style={{ position: "absolute", top: "25%", left: "25%", width: 384, height: 384, background: "rgba(19,218,236,0.2)", borderRadius: "50%", filter: "blur(120px)" }} />
          <div style={{ position: "absolute", bottom: "25%", right: "25%", width: 320, height: 320, background: "rgba(59,130,246,0.1)", borderRadius: "50%", filter: "blur(100px)" }} />
          <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 48px", maxWidth: 640 }}>
            {/* Floating card */}
            <div style={{ marginBottom: 48, animation: "float 6s ease-in-out infinite" }}>
              <div style={{ position: "relative", width: 320, height: 320, margin: "0 auto" }}>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top right, rgba(19,218,236,0.3), rgba(37,99,235,0.3))", borderRadius: 24, filter: "blur(24px)", transform: "rotate(6deg)" }} />
                <div style={{
                  position: "relative", background: "#fff", border: "1px solid #f1f5f9",
                  borderRadius: 24, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
                  padding: 24, height: "100%", display: "flex", flexDirection: "column",
                  justifyContent: "space-between", overflow: "hidden",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f87171" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#facc15" }} />
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#4ade80" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "monospace", fontSize: 12, opacity: 0.7, textAlign: "left" }}>
                    <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, width: "33%" }} />
                    <div style={{ height: 8, background: "rgba(19,218,236,0.4)", borderRadius: 4, width: "75%" }} />
                    <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, width: "50%" }} />
                    <div style={{ height: 8, background: "#e2e8f0", borderRadius: 4, width: "66%" }} />
                    <div style={{ height: 8, background: "rgba(19,218,236,0.4)", borderRadius: 4, width: "25%", marginTop: 16 }} />
                  </div>
                  <div style={{
                    position: "absolute", bottom: 24, right: 24, background: "#fff",
                    padding: 12, borderRadius: 16, boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                    border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 12,
                  }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(19,218,236,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: PRIMARY }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 20 }}>verified</span>
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: 10, color: "#94a3b8", textTransform: "uppercase", fontWeight: 700, letterSpacing: "0.05em" }}>Status</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: "#0f172a" }}>Elite Member</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h1 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.025em", color: "#0f172a", marginBottom: 16 }}>
              Start your journey <br /> to <span style={{ color: "transparent", backgroundClip: "text", WebkitBackgroundClip: "text", backgroundImage: `linear-gradient(to right, ${PRIMARY}, #3b82f6)` }}>mastery</span>
            </h1>
            <p style={{ color: "#64748b", fontSize: 18, lineHeight: 1.7 }}>
              Join the top 1% of developers refining their craft. Access elite challenges, peer reviews, and gamified growth.
            </p>
          </div>
        </div>
      )}

      {/* ── RIGHT: Auth Form ── */}
      <div style={{
        width: mode === "login" ? "100%" : "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 32, background: "#fff", position: "relative",
      }} className={mode === "login" ? "login-form-panel" : ""}>
        {/* Signup background decoration */}
        {mode === "signup" && (
          <>
            <div style={{ position: "absolute", top: -160, right: -160, width: 384, height: 384, background: "rgba(19,218,236,0.2)", borderRadius: "50%", filter: "blur(48px)", opacity: 0.5, pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "50%", background: "linear-gradient(to top, rgba(255,255,255,0.8), transparent)", pointerEvents: "none" }} />
          </>
        )}

        <div style={{ width: "100%", maxWidth: 448, display: "flex", flexDirection: "column", gap: 32, position: "relative", zIndex: 10 }}>
          {/* Brand Header */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
              <div style={{ width: 40, height: 40, color: PRIMARY, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(19,218,236,0.1)", borderRadius: 12 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 24 }}>school</span>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.025em" }}>Elite Academy</h2>
            </div>
            {mode === "login" ? (
              <>
                <h1 style={{ fontSize: 30, fontWeight: 700, color: "#0f172a" }}>Welcome back</h1>
                <p style={{ color: "#64748b", marginTop: 8 }}>Please enter your details to sign in.</p>
              </>
            ) : (
              <>
                {!signupDone && (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 56, height: 56, borderRadius: "50%", background: "rgba(19,218,236,0.1)", color: PRIMARY, marginBottom: 16 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 24 }}>person_add</span>
                    </div>
                    <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0f172a", marginBottom: 8, letterSpacing: "-0.025em" }}>Join the Elite Community</h1>
                    <p style={{ color: "#64748b", fontSize: 14 }}>Start your journey to become a top-tier developer.</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Social Buttons */}
          {!signupDone && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "10px 16px", border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", cursor: "pointer", transition: "all 0.2s" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>Google</span>
                </button>
                <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, padding: "10px 16px", border: "1px solid #e2e8f0", borderRadius: 12, background: "#fff", cursor: "pointer", transition: "all 0.2s" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                  <span style={{ fontSize: 14, fontWeight: 600, color: "#334155" }}>GitHub</span>
                </button>
              </div>

              <div style={{ position: "relative", margin: "0" }}>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center" }}><div style={{ width: "100%", borderTop: "1px solid #e2e8f0" }} /></div>
                <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
                  <span style={{ background: "#fff", padding: "0 8px", fontSize: 12, textTransform: "uppercase", color: "#94a3b8" }}>
                    {mode === "login" ? "Or continue with" : "Or join with email"}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* ── LOGIN FORM ── */}
          {mode === "login" && (
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div>
                <label htmlFor="email" style={labelBase}>Email address</label>
                <div style={inputWrap}>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    style={inputBase} placeholder="student@elite.academy" />
                  <div style={inputIcon}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>mail</span>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="password" style={labelBase}>Password</label>
                <div style={inputWrap}>
                  <input id="password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                    style={{ ...inputBase, paddingRight: 40 }} placeholder="••••••••" />
                  <div style={inputIcon}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span>
                  </div>
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ position: "absolute", top: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", paddingRight: 12, background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{showPw ? "visibility" : "visibility_off"}</span>
                  </button>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <input id="remember-me" type="checkbox" style={{ width: 16, height: 16, accentColor: PRIMARY, borderRadius: 4 }} />
                  <label htmlFor="remember-me" style={{ marginLeft: 8, fontSize: 14, color: "#475569" }}>Remember me</label>
                </div>
                <a href="#" style={{ fontSize: 14, fontWeight: 500, color: PRIMARY, textDecoration: "none" }}>Forgot password?</a>
              </div>

              {msg && <p style={msgStyle(msg.ok)}>{msg.text}</p>}

              <button type="submit" disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.5 : 1 }}>
                {loading ? "로그인 중..." : "Log in"}
              </button>

              <p style={{ textAlign: "center", fontSize: 14, color: "#64748b" }}>
                Not a member yet?{" "}
                <button type="button" onClick={() => switchMode("signup")}
                  style={{ fontWeight: 600, color: PRIMARY, background: "none", border: "none", cursor: "pointer" }}>
                  Apply for access
                </button>
              </p>
            </form>
          )}

          {/* ── SIGNUP FORM ── */}
          {mode === "signup" && !signupDone && (
            <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Name */}
              <div>
                <label htmlFor="s-name" style={labelBase}>Full Name</label>
                <div style={inputWrap}>
                  <div style={inputIcon}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>badge</span></div>
                  <input id="s-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required
                    style={inputBase} placeholder="John Doe" />
                </div>
              </div>
              {/* Email */}
              <div>
                <label htmlFor="s-email" style={labelBase}>Email Address</label>
                <div style={inputWrap}>
                  <div style={inputIcon}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>mail</span></div>
                  <input id="s-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    style={inputBase} placeholder="you@example.com" />
                </div>
              </div>
              {/* Phone */}
              <div>
                <label htmlFor="s-phone" style={labelBase}>전화번호 (선택)</label>
                <div style={inputWrap}>
                  <div style={inputIcon}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>phone</span></div>
                  <input id="s-phone" type="tel" value={phone} onChange={(e) => setPhone(fmtPhone(e.target.value))}
                    style={inputBase} placeholder="010-1234-5678" />
                </div>
              </div>
              {/* Grade */}
              <div>
                <label htmlFor="s-grade" style={labelBase}>학년</label>
                <div style={inputWrap}>
                  <div style={inputIcon}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>school</span></div>
                  <select id="s-grade" value={grade} onChange={(e) => setGrade(e.target.value)} required
                    style={{ ...inputBase, appearance: "none", cursor: "pointer" }}>
                    <option value="" disabled>학년을 선택하세요</option>
                    {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              {/* Password */}
              <div>
                <label htmlFor="s-pw" style={labelBase}>Create Password</label>
                <div style={inputWrap}>
                  <div style={inputIcon}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span></div>
                  <input id="s-pw" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                    style={{ ...inputBase, paddingRight: 40 }} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    style={{ position: "absolute", top: 0, right: 0, bottom: 0, display: "flex", alignItems: "center", paddingRight: 12, background: "none", border: "none", color: "#94a3b8", cursor: "pointer" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{showPw ? "visibility" : "visibility_off"}</span>
                  </button>
                </div>
                {password && (
                  <div style={{ marginTop: 8, display: "flex", gap: 4, height: 4 }}>
                    {[1, 2, 3, 4].map((l) => (
                      <div key={l} style={{
                        flex: 1, borderRadius: 9999, transition: "all 0.2s",
                        background: l <= pwStrength ? pwColor : "#e2e8f0",
                      }} />
                    ))}
                  </div>
                )}
              </div>
              {/* Confirm PW */}
              <div>
                <label htmlFor="s-pwc" style={labelBase}>비밀번호 확인</label>
                <div style={inputWrap}>
                  <div style={inputIcon}><span className="material-symbols-outlined" style={{ fontSize: 20 }}>lock</span></div>
                  <input id="s-pwc" type={showPw ? "text" : "password"} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required
                    style={{ ...inputBase, borderColor: passwordConfirm && password !== passwordConfirm ? "#f87171" : "#e2e8f0" }}
                    placeholder="비밀번호 다시 입력" />
                </div>
                {passwordConfirm && password !== passwordConfirm && <p style={{ fontSize: 12, color: "#ef4444", marginTop: 4, marginLeft: 4 }}>비밀번호가 일치하지 않습니다</p>}
                {passwordConfirm && password === passwordConfirm && passwordConfirm.length >= 6 && <p style={{ fontSize: 12, color: "#16a34a", marginTop: 4, marginLeft: 4 }}>✓ 비밀번호가 일치합니다</p>}
              </div>

              {/* Terms */}
              <div style={{ display: "flex", alignItems: "center" }}>
                <input id="terms" type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)}
                  style={{ width: 16, height: 16, accentColor: PRIMARY, borderRadius: 4, cursor: "pointer" }} />
                <label htmlFor="terms" style={{ marginLeft: 8, fontSize: 14, color: "#475569" }}>
                  I agree to the{" "}
                  <a href="#" style={{ color: PRIMARY, fontWeight: 500, textDecoration: "none" }}>Terms</a> and{" "}
                  <a href="#" style={{ color: PRIMARY, fontWeight: 500, textDecoration: "none" }}>Privacy Policy</a>
                </label>
              </div>

              {msg && <p style={msgStyle(msg.ok)}>{msg.text}</p>}

              <button type="submit" disabled={loading} style={{ ...primaryBtn, opacity: loading ? 0.5 : 1 }}>
                {loading ? "가입 처리 중..." : "Create Account"}
              </button>

              <p style={{ textAlign: "center", fontSize: 14, color: "#475569" }}>
                Already have an account?{" "}
                <button type="button" onClick={() => switchMode("login")}
                  style={{ fontWeight: 700, color: PRIMARY, background: "none", border: "none", cursor: "pointer" }}>
                  Log in here
                </button>
              </p>
            </form>
          )}

          {/* ── SIGNUP DONE ── */}
          {mode === "signup" && signupDone && (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 60, marginBottom: 24 }}>🎉</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: "#0f172a", marginBottom: 12 }}>가입 완료!</h3>
              <p style={{ color: "#64748b", marginBottom: 24 }}>
                <strong style={{ color: "#0f172a" }}>{name}</strong>님 환영합니다!<br />이메일 인증 후 로그인해주세요.
              </p>
              <button onClick={() => { switchMode("login"); setPassword(""); setPasswordConfirm(""); }}
                style={{
                  padding: "12px 24px", borderRadius: 12, background: PRIMARY, color: "#fff",
                  fontWeight: 700, fontSize: 14, border: "none", cursor: "pointer",
                  boxShadow: `0 10px 15px -3px rgba(19,218,236,0.3)`, transition: "all 0.2s",
                }}>
                로그인하러 가기 →
              </button>
            </div>
          )}

          <p style={{ textAlign: "center", fontSize: 12, color: "#94a3b8", marginTop: 16 }}>
            <Link href="/" style={{ color: PRIMARY, fontWeight: 500, textDecoration: "none" }}>← 홈으로 돌아가기</Link>
          </p>
        </div>
      </div>

      <style>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
                @media (min-width: 1024px) {
                    .login-left-panel { display: flex !important; }
                    .login-form-panel { width: 50% !important; }
                }
            `}</style>
    </div>
  );
}
