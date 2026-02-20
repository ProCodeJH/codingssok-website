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
      }
      setSignupDone(true);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMsg({ ok: false, text: message.includes("already") ? "이미 가입된 이메일입니다" : message });
    } finally { setLoading(false); }
  };

  const pwStrength = password.length >= 12 ? 4 : password.length >= 8 ? 3 : password.length >= 6 ? 2 : password.length > 0 ? 1 : 0;

  return (
    <div className="min-h-screen flex font-[Inter,sans-serif] text-slate-900 bg-white overflow-hidden">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />

      {/* ── LEFT: Decorative Panel (Login Only) ── */}
      {mode === "login" && (
        <div className="hidden lg:flex w-1/2 bg-slate-50 relative items-center justify-center overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#13daec]/20 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="relative z-10 text-center px-12 max-w-2xl">
            {/* Floating card */}
            <div className="mb-12" style={{ animation: "float 6s ease-in-out infinite" }}>
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-tr from-[#13daec]/30 to-blue-600/30 rounded-3xl blur-2xl transform rotate-6" />
                <div className="relative bg-white border border-slate-100 rounded-3xl shadow-2xl p-6 h-full flex flex-col justify-between overflow-hidden">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="space-y-3 font-mono text-xs opacity-70 text-left">
                    <div className="h-2 bg-slate-200 rounded w-1/3" />
                    <div className="h-2 bg-[#13daec]/40 rounded w-3/4" />
                    <div className="h-2 bg-slate-200 rounded w-1/2" />
                    <div className="h-2 bg-slate-200 rounded w-2/3" />
                    <div className="h-2 bg-[#13daec]/40 rounded w-1/4 mt-4" />
                  </div>
                  <div className="absolute bottom-6 right-6 bg-white p-3 rounded-xl shadow-lg border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#13daec]/10 flex items-center justify-center text-[#13daec]">
                      <span className="material-symbols-outlined text-xl">verified</span>
                    </div>
                    <div className="text-left">
                      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Status</div>
                      <div className="text-xs font-bold text-slate-900">Elite Member</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-4">
              Start your journey <br /> to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#13daec] to-blue-500">mastery</span>
            </h1>
            <p className="text-slate-500 text-lg leading-relaxed">
              Join the top 1% of developers refining their craft. Access elite challenges, peer reviews, and gamified growth.
            </p>
          </div>
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03]" preserveAspectRatio="none" viewBox="0 0 100 100">
            <pattern height="4" id="grid" patternUnits="userSpaceOnUse" width="4">
              <path d="M 4 0 L 0 0 0 4" fill="none" stroke="currentColor" strokeWidth="0.05" />
            </pattern>
            <rect fill="url(#grid)" height="100" width="100" />
          </svg>
        </div>
      )}

      {/* ── RIGHT: Auth Form ── */}
      <div className={`${mode === "login" ? "w-full lg:w-1/2" : "w-full"} flex items-center justify-center p-8 bg-white relative`}>
        {/* Signup background decoration */}
        {mode === "signup" && (
          <>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9IiMxM2RhZWMiIGZpbGwtb3BhY2l0eT0iMC4yIi8+PC9zdmc+')] [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#13daec]/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" />
          </>
        )}

        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Brand Header */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="size-10 text-[#13daec] flex items-center justify-center bg-[#13daec]/10 rounded-xl">
                <span className="material-symbols-outlined text-2xl">school</span>
              </div>
              <h2 className="text-2xl font-bold tracking-tight">Elite Academy</h2>
            </div>
            {mode === "login" ? (
              <>
                <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
                <p className="text-slate-500 mt-2">Please enter your details to sign in.</p>
              </>
            ) : (
              <>
                {!signupDone && (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center size-14 rounded-full bg-[#13daec]/10 text-[#13daec] mb-4">
                      <span className="material-symbols-outlined text-2xl">person_add</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2 tracking-tight">Join the Elite Coding Community</h1>
                    <p className="text-slate-500 text-sm">Start your journey to become a top-tier developer.</p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Social Buttons */}
          {!signupDone && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
                  <span className="text-sm font-semibold text-slate-700">Google</span>
                </button>
                <button className="flex items-center justify-center gap-3 px-4 py-2.5 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group">
                  <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                  <span className="text-sm font-semibold text-slate-700">GitHub</span>
                </button>
              </div>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200" /></div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-slate-400">{mode === "login" ? "Or continue with" : "Or join with email"}</span>
                </div>
              </div>
            </>
          )}

          {/* ── LOGIN FORM ── */}
          {mode === "login" && (
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email address</label>
                <div className="relative">
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="block w-full rounded-xl border-slate-300 py-3 pl-10 text-sm shadow-sm placeholder:text-slate-400 focus:border-[#13daec] focus:ring-[#13daec]"
                    placeholder="student@elite.academy" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">mail</span>
                  </div>
                </div>
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <input id="password" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                    className="block w-full rounded-xl border-slate-300 py-3 pl-10 pr-10 text-sm shadow-sm placeholder:text-slate-400 focus:border-[#13daec] focus:ring-[#13daec]"
                    placeholder="••••••••" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">lock</span>
                  </div>
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600">
                    <span className="material-symbols-outlined text-[20px]">{showPw ? "visibility" : "visibility_off"}</span>
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" type="checkbox" className="h-4 w-4 rounded border-slate-300 text-[#13daec] focus:ring-[#13daec]" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-600">Remember me</label>
                </div>
                <a href="#" className="text-sm font-medium text-[#13daec] hover:text-[#0fbccb]">Forgot password?</a>
              </div>

              {msg && (
                <p className={`p-3 rounded-xl text-sm font-medium ${msg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{msg.text}</p>
              )}

              <button type="submit" disabled={loading}
                className="flex w-full justify-center rounded-xl bg-[#13daec] px-3 py-3.5 text-sm font-bold text-white shadow-[0_4px_14px_0_rgba(19,218,236,0.39)] hover:bg-[#0fbccb] hover:shadow-[0_6px_20px_rgba(19,218,236,0.23)] hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "로그인 중..." : "Log in"}
              </button>

              <p className="text-center text-sm text-slate-500">
                Not a member yet?{" "}
                <button type="button" onClick={() => switchMode("signup")} className="font-semibold text-[#13daec] hover:text-[#0fbccb]">
                  Apply for access
                </button>
              </p>
            </form>
          )}

          {/* ── SIGNUP FORM ── */}
          {mode === "signup" && !signupDone && (
            <form onSubmit={handleSignup} className="space-y-5">
              <div>
                <label htmlFor="s-name" className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">badge</span>
                  </div>
                  <input id="s-name" type="text" value={name} onChange={(e) => setName(e.target.value)} required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#13daec] focus:border-[#13daec] transition-all"
                    placeholder="John Doe" />
                </div>
              </div>
              <div>
                <label htmlFor="s-email" className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <input id="s-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#13daec] focus:border-[#13daec] transition-all"
                    placeholder="you@example.com" />
                </div>
              </div>
              <div>
                <label htmlFor="s-phone" className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">전화번호 (선택)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">phone</span>
                  </div>
                  <input id="s-phone" type="tel" value={phone} onChange={(e) => setPhone(fmtPhone(e.target.value))}
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#13daec] focus:border-[#13daec] transition-all"
                    placeholder="010-1234-5678" />
                </div>
              </div>
              <div>
                <label htmlFor="s-grade" className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">학년</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">school</span>
                  </div>
                  <select id="s-grade" value={grade} onChange={(e) => setGrade(e.target.value)} required
                    className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm focus:outline-none focus:ring-1 focus:ring-[#13daec] focus:border-[#13daec] transition-all appearance-none cursor-pointer">
                    <option value="" disabled>학년을 선택하세요</option>
                    {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="s-pw" className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">Create Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input id="s-pw" type={showPw ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
                    className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-xl bg-slate-50/50 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#13daec] focus:border-[#13daec] transition-all"
                    placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPw(!showPw)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer">
                    <span className="material-symbols-outlined text-[20px]">{showPw ? "visibility" : "visibility_off"}</span>
                  </button>
                </div>
                {password && (
                  <div className="mt-2 flex gap-1 h-1">
                    {[1, 2, 3, 4].map((l) => (
                      <div key={l} className={`flex-1 rounded-full transition-all ${l <= pwStrength ? (pwStrength <= 1 ? "bg-red-400" : pwStrength <= 2 ? "bg-orange-400" : pwStrength <= 3 ? "bg-yellow-400" : "bg-green-500") : "bg-slate-200"}`} />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label htmlFor="s-pwc" className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">비밀번호 확인</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <span className="material-symbols-outlined text-[20px]">lock</span>
                  </div>
                  <input id="s-pwc" type={showPw ? "text" : "password"} value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required
                    className={`block w-full pl-10 pr-3 py-3 border rounded-xl bg-slate-50/50 text-sm placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-[#13daec] transition-all ${passwordConfirm && password !== passwordConfirm ? "border-red-400" : "border-slate-200"}`}
                    placeholder="비밀번호 다시 입력" />
                </div>
                {passwordConfirm && password !== passwordConfirm && <p className="text-xs text-red-500 mt-1 ml-1">비밀번호가 일치하지 않습니다</p>}
                {passwordConfirm && password === passwordConfirm && passwordConfirm.length >= 6 && <p className="text-xs text-green-600 mt-1 ml-1">✓ 비밀번호가 일치합니다</p>}
              </div>

              <div className="flex items-center">
                <input id="terms" type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)}
                  className="h-4 w-4 text-[#13daec] focus:ring-[#13daec] border-slate-300 rounded cursor-pointer" />
                <label htmlFor="terms" className="ml-2 block text-sm text-slate-600">
                  I agree to the <a href="#" className="text-[#13daec] hover:underline font-medium">Terms</a> and <a href="#" className="text-[#13daec] hover:underline font-medium">Privacy Policy</a>
                </label>
              </div>

              {msg && (
                <p className={`p-3 rounded-xl text-sm font-medium ${msg.ok ? "bg-green-50 text-green-700" : "bg-red-50 text-red-600"}`}>{msg.text}</p>
              )}

              <button type="submit" disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 rounded-xl shadow-lg shadow-[#13daec]/20 text-sm font-bold text-white bg-gradient-to-r from-[#13daec] to-[#0ea5b3] hover:to-[#0c909c] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#13daec] transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "가입 처리 중..." : "Create Account"}
              </button>

              <p className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <button type="button" onClick={() => switchMode("login")} className="font-bold text-[#13daec] hover:text-[#0fbccb]">
                  Log in here
                </button>
              </p>
            </form>
          )}

          {/* ── SIGNUP DONE ── */}
          {mode === "signup" && signupDone && (
            <div className="text-center py-8">
              <div className="text-6xl mb-6">🎉</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">가입 완료!</h3>
              <p className="text-slate-500 mb-6"><strong className="text-slate-900">{name}</strong>님 환영합니다!<br />이메일 인증 후 로그인해주세요.</p>
              <button onClick={() => { switchMode("login"); setPassword(""); setPasswordConfirm(""); }}
                className="px-6 py-3 rounded-xl bg-[#13daec] text-white font-bold text-sm shadow-lg shadow-[#13daec]/30 hover:bg-[#0fbccb] transition-all">
                로그인하러 가기 →
              </button>
            </div>
          )}

          <p className="text-center text-xs text-slate-400 mt-4">
            <Link href="/" className="text-[#13daec] hover:text-[#0fbccb] font-medium">← 홈으로 돌아가기</Link>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
