"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase";

/* ── 클라이언트 사이드 Rate Limiting ── */
const LOGIN_ATTEMPTS_KEY = "codingssok_login_attempts";
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60_000; // 1분

function checkLoginRateLimit(): { allowed: boolean; remainingMs: number } {
    try {
        const raw = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
        if (!raw) return { allowed: true, remainingMs: 0 };
        const { count, firstAttempt } = JSON.parse(raw);
        const elapsed = Date.now() - firstAttempt;
        if (elapsed > LOCKOUT_MS) {
            localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
            return { allowed: true, remainingMs: 0 };
        }
        if (count >= MAX_ATTEMPTS) {
            return { allowed: false, remainingMs: LOCKOUT_MS - elapsed };
        }
        return { allowed: true, remainingMs: 0 };
    } catch { return { allowed: true, remainingMs: 0 }; }
}

function recordLoginAttempt() {
    try {
        const raw = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
        if (!raw) {
            localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify({ count: 1, firstAttempt: Date.now() }));
            return;
        }
        const data = JSON.parse(raw);
        if (Date.now() - data.firstAttempt > LOCKOUT_MS) {
            localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify({ count: 1, firstAttempt: Date.now() }));
        } else {
            data.count++;
            localStorage.setItem(LOGIN_ATTEMPTS_KEY, JSON.stringify(data));
        }
    } catch { /* ignore */ }
}

function clearLoginAttempts() {
    localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
}

/* ── 코딩쏙 아카데미 — 이름 + 4자리 비밀번호 로그인 ── */

interface StudentRow {
  id: string;
  name: string;
  pin: string | null;
  grade: string | null;
  class: string | null;
  avatar: string | null;
}

const PRIMARY = "#3b82f6";
const ACCENT = "#2563eb";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pinRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => { inputRef.current?.focus(); }, []);

  /* ── PIN 입력 핸들러 (각 자리별) ── */
  const handlePinDigit = (idx: number, value: string) => {
    if (value && !/^\d$/.test(value)) return; // 숫자만 허용
    const digits = pin.split("");
    while (digits.length < 4) digits.push("");
    digits[idx] = value;
    const newPin = digits.join("");
    setPin(newPin);
    setMsg(null);
    // 자동 포커스 이동
    if (value && idx < 3) {
      pinRefs[idx + 1].current?.focus();
    }
  };

  const handlePinKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !pin[idx] && idx > 0) {
      pinRefs[idx - 1].current?.focus();
    }
  };

  /* ── 로그인/가입 처리 ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) { setMsg({ ok: false, text: "이름을 입력해주세요" }); return; }
    if (pin.length !== 4) { setMsg({ ok: false, text: "비밀번호 4자리를 입력해주세요" }); return; }

    setLoading(true); setMsg(null);

    // Rate Limiting 체크
    const { allowed, remainingMs } = checkLoginRateLimit();
    if (!allowed) {
      setMsg({ ok: false, text: `로그인 시도가 너무 많습니다. ${Math.ceil(remainingMs / 1000)}초 후 다시 시도해주세요.` });
      setLoading(false);
      return;
    }
    recordLoginAttempt();

    try {
      const sb = createClient();

      // 1. 이름으로 검색
      const { data, error } = await sb
        .from("students")
        .select("id, name, pin, grade, class, avatar")
        .ilike("name", trimmed);

      if (error) throw error;

      if (!data || data.length === 0) {
        // ── 없으면 자동 가입 ──
        const { data: newStudent, error: insertErr } = await sb
          .from("students")
          .insert({ name: trimmed, pin, grade: null, avatar: null })
          .select("id, name, pin, grade, class, avatar")
          .single();

        if (insertErr) throw insertErr;

        clearLoginAttempts();
        setMsg({ ok: true, text: `"${trimmed}" 님 가입 완료! 로그인 중...` });
        setTimeout(() => loginAs(newStudent as StudentRow), 800);
      } else {
        // ── 이름이 있음 → PIN 확인 ──
        const matched = data.find((s: StudentRow) => s.pin === pin);

        if (matched) {
          clearLoginAttempts();
          loginAs(matched as StudentRow);
        } else {
          setMsg({ ok: false, text: "비밀번호가 틀렸습니다" });
          // PIN 입력 초기화
          setPin("");
          pinRefs[0].current?.focus();
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      if (process.env.NODE_ENV === 'development') console.error("[Login] error:", err);
      setMsg({ ok: false, text: `오류: ${message}` });
    } finally { setLoading(false); }
  };

  /* ── 로그인 처리 ── */
  const loginAs = (student: StudentRow) => {
    const profile = {
      id: student.id,
      name: student.name,
      email: "",
      role: "student" as const,
      grade: student.grade || undefined,
      avatar: student.avatar || undefined,
      level: 1, xp: 0, streak: 0,
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem("codingssok_user", JSON.stringify(profile));
    document.cookie = `codingssok_session=${student.id}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    window.location.href = "/dashboard/learning";
  };

  /* ── PIN digit style ── */
  const pinDigitStyle: React.CSSProperties = {
    width: 52, height: 60, textAlign: "center", fontSize: 24, fontWeight: 800,
    border: "2px solid #e5e7eb", borderRadius: 16, background: "rgba(255,255,255,0.8)",
    color: "#1f2937", outline: "none", transition: "all 0.2s", boxSizing: "border-box",
    letterSpacing: 0, caretColor: PRIMARY,
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Pretendard', 'Inter', sans-serif", color: "#0f172a",
      background: "#ffffff",
      position: "relative", overflow: "hidden",
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />



      {/* Login Card */}
      <div style={{
        width: "100%", maxWidth: 440, background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderRadius: 28, padding: "48px 36px", position: "relative", zIndex: 10,
        boxShadow: "0 25px 60px -12px rgba(99,102,241,0.15), 0 0 0 1px rgba(255,255,255,0.6)",
        border: "1px solid rgba(255,255,255,0.4)",
      }}>

        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img
            src="/images/promo/logo-codingssok.png"
            alt="코딩쏙"
            style={{ height: 48, width: "auto", margin: "0 auto 20px", display: "block" }}
          />
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, color: "#172554", margin: "0 0 8px" }}>
            코딩쏙 아카데미
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", fontWeight: 400, margin: 0, lineHeight: 1.5 }}>
            이름과 비밀번호를 입력하면 바로 시작해요!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* 이름 입력 */}
          <div>
            <label htmlFor="student-name" style={{
              display: "block", fontSize: 13, fontWeight: 600, color: "#374151",
              marginBottom: 8, marginLeft: 4,
            }}>
              이름
            </label>
            <div style={{ position: "relative" }}>
              <input
                ref={inputRef}
                id="student-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setMsg(null); }}
                required
                autoComplete="off"
                placeholder="홍길동"
                style={{
                  display: "block", width: "100%", paddingLeft: 16, paddingRight: 16,
                  paddingTop: 14, paddingBottom: 14, border: "2px solid #e5e7eb",
                  borderRadius: 16, background: "rgba(255,255,255,0.8)", fontSize: 16,
                  color: "#1f2937", outline: "none", transition: "all 0.2s",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => { e.target.style.borderColor = PRIMARY; e.target.style.boxShadow = `0 0 0 3px rgba(99,102,241,0.1)`; }}
                onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
              />
            </div>
          </div>

          {/* 4자리 비밀번호 */}
          <div>
            <label style={{
              display: "block", fontSize: 13, fontWeight: 600, color: "#374151",
              marginBottom: 8, marginLeft: 4,
            }}>
              비밀번호 (숫자 4자리)
            </label>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              {[0, 1, 2, 3].map((idx) => (
                <input
                  key={idx}
                  ref={pinRefs[idx]}
                  type="password"
                  inputMode="numeric"
                  maxLength={1}
                  aria-label={`비밀번호 ${idx + 1}번째 자리`}
                  value={pin[idx] || ""}
                  onChange={(e) => handlePinDigit(idx, e.target.value)}
                  onKeyDown={(e) => handlePinKeyDown(idx, e)}
                  onFocus={(e) => { e.target.style.borderColor = PRIMARY; e.target.style.boxShadow = `0 0 0 3px rgba(99,102,241,0.1)`; }}
                  onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
                  style={pinDigitStyle}
                />
              ))}
            </div>
          </div>

          {/* Error/Info Message */}
          {msg && (
            <div style={{
              padding: "12px 16px", borderRadius: 14, fontSize: 13, fontWeight: 500,
              background: msg.ok ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)",
              color: msg.ok ? "#059669" : "#dc2626",
              border: `1px solid ${msg.ok ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)"}`,
              whiteSpace: "pre-line", textAlign: "center",
            }}>
              {msg.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              display: "flex", width: "100%", justifyContent: "center", alignItems: "center",
              gap: 8, padding: "16px 20px", borderRadius: 16, fontSize: 15, fontWeight: 700,
              color: "#fff", border: "none",
              background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
              boxShadow: `0 6px 20px rgba(99,102,241,0.3)`,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.2s",
              marginTop: 4,
            }}
          >
            {loading ? (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: 18, animation: "spin 1s linear infinite" }}>progress_activity</span>
                로그인 중...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>
                로그인
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <p style={{ fontSize: 12, color: "#9ca3af", margin: 0, lineHeight: 1.6 }}>
            처음이라면 이름과 비밀번호를 정하면 자동으로 가입돼요!
            <br />
            <span style={{ color: "#3b82f6", fontWeight: 600 }}>이미 있는 이름이면 비밀번호로 로그인해요</span>
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
