"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";

/* ── 코딩쏙 아카데미 — 이름 + 생년월일 로그인 ── */

interface StudentRow {
  id: string;
  name: string;
  birthday: string;
  grade: string | null;
  class: string | null;
  avatar: string | null;
}

const PRIMARY = "#6366f1";
const PRIMARY_DARK = "#4f46e5";
const ACCENT = "#8b5cf6";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [matches, setMatches] = useState<StudentRow[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  /* 생년월일 → YYYY-MM-DD */
  const toBirthday = () => {
    if (!birthYear || !birthMonth || !birthDay) return null;
    return `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`;
  };

  /* ── 이름 + 생년월일 검색 ── */
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) { setMsg({ ok: false, text: "이름을 입력해주세요" }); return; }

    const birthday = toBirthday();
    if (!birthday) { setMsg({ ok: false, text: "생년월일을 모두 선택해주세요" }); return; }

    setLoading(true); setMsg(null); setMatches(null);

    try {
      const sb = createClient();
      const { data, error } = await sb
        .from("students")
        .select("id, name, birthday, grade, class, avatar")
        .ilike("name", trimmed)
        .eq("birthday", birthday);

      if (error) throw error;

      if (!data || data.length === 0) {
        setMsg({ ok: false, text: `"${trimmed}" 학생을 찾을 수 없습니다.\n이름과 생년월일을 확인해주세요.` });
      } else if (data.length === 1) {
        loginAs(data[0] as StudentRow);
      } else {
        setMatches(data as StudentRow[]);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setMsg({ ok: false, text: `오류: ${message}` });
    } finally { setLoading(false); }
  };

  /* ── 로그인 처리 ── */
  const loginAs = (student: StudentRow) => {
    const profile = {
      id: student.id,
      name: student.name,
      email: "",
      grade: student.grade || undefined,
      avatar: student.avatar || undefined,
      level: 1, xp: 0, streak: 0,
      joinedAt: new Date().toISOString(),
    };
    localStorage.setItem("codingssok_user", JSON.stringify(profile));
    window.location.href = "/dashboard/learning";
  };

  /* ── 연도/월/일 옵션 ── */
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => String(currentYear - i)); // current ~ 1950
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));

  const selectStyle: React.CSSProperties = {
    flex: 1, padding: "14px 10px", border: "2px solid #e5e7eb",
    borderRadius: 14, background: "rgba(255,255,255,0.8)", fontSize: 15,
    color: "#1f2937", outline: "none", boxSizing: "border-box",
    appearance: "none" as const, WebkitAppearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath d='M3 5l3 3 3-3' fill='none' stroke='%239ca3af' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
    cursor: "pointer",
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Pretendard', 'Inter', sans-serif", color: "#0f172a",
      background: "linear-gradient(135deg, #f0f0ff 0%, #e8e0ff 50%, #f0f4ff 100%)",
      position: "relative", overflow: "hidden",
    }}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />

      {/* Background decorations */}
      <div style={{ position: "absolute", top: -120, left: -120, width: 400, height: 400, background: `radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -80, right: -80, width: 350, height: 350, background: `radial-gradient(circle, rgba(139,92,246,0.12), transparent 70%)`, borderRadius: "50%", pointerEvents: "none" }} />

      {/* Login Card */}
      <div style={{
        width: "100%", maxWidth: 440, background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
        borderRadius: 28, padding: "48px 36px", position: "relative", zIndex: 10,
        boxShadow: "0 25px 60px -12px rgba(99,102,241,0.15), 0 0 0 1px rgba(255,255,255,0.6)",
        border: "1px solid rgba(255,255,255,0.4)",
      }}>

        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <img
            src="/images/promo/logo-codingssok.png"
            alt="코딩쏙"
            style={{ height: 48, width: "auto", margin: "0 auto 20px", display: "block" }}
          />
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5, color: "#1e1b4b", margin: "0 0 8px" }}>
            코딩쏙 아카데미
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", fontWeight: 400, margin: 0, lineHeight: 1.5 }}>
            이름과 생년월일을 입력하면 바로 시작해요!
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {/* 이름 입력 */}
          <div>
            <label htmlFor="student-name" style={{
              display: "block", fontSize: 13, fontWeight: 600, color: "#374151",
              marginBottom: 8, marginLeft: 4,
            }}>
              👤 학생 이름
            </label>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", top: 0, left: 0, bottom: 0,
                display: "flex", alignItems: "center", paddingLeft: 14, pointerEvents: "none", color: "#9ca3af",
              }}>
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person</span>
              </div>
              <input
                ref={inputRef}
                id="student-name"
                type="text"
                value={name}
                onChange={(e) => { setName(e.target.value); setMatches(null); setMsg(null); }}
                required
                autoComplete="off"
                placeholder="홍길동"
                style={{
                  display: "block", width: "100%", paddingLeft: 44, paddingRight: 16,
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

          {/* 생년월일 입력 */}
          <div>
            <label style={{
              display: "block", fontSize: 13, fontWeight: 600, color: "#374151",
              marginBottom: 8, marginLeft: 4,
            }}>
              🎂 생년월일
            </label>
            <div style={{ display: "flex", gap: 8 }}>
              <select
                value={birthYear} onChange={(e) => setBirthYear(e.target.value)}
                style={selectStyle}
              >
                <option value="">년</option>
                {years.map(y => <option key={y} value={y}>{y}년</option>)}
              </select>
              <select
                value={birthMonth} onChange={(e) => setBirthMonth(e.target.value)}
                style={selectStyle}
              >
                <option value="">월</option>
                {months.map(m => <option key={m} value={m}>{m}월</option>)}
              </select>
              <select
                value={birthDay} onChange={(e) => setBirthDay(e.target.value)}
                style={selectStyle}
              >
                <option value="">일</option>
                {days.map(d => <option key={d} value={d}>{d}일</option>)}
              </select>
            </div>
          </div>

          {/* Error/Info Message */}
          {msg && (
            <div style={{
              padding: "12px 16px", borderRadius: 14, fontSize: 13, fontWeight: 500,
              background: msg.ok ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.06)",
              color: msg.ok ? "#059669" : "#dc2626",
              border: `1px solid ${msg.ok ? "rgba(16,185,129,0.12)" : "rgba(239,68,68,0.1)"}`,
              whiteSpace: "pre-line",
            }}>
              {msg.text}
            </div>
          )}

          {/* 동명이인 선택 */}
          {matches && matches.length > 1 && (
            <div style={{
              background: "rgba(99,102,241,0.03)", borderRadius: 16, padding: 16,
              border: "1px solid rgba(99,102,241,0.08)",
            }}>
              <p style={{ fontSize: 12, color: "#6366f1", fontWeight: 700, margin: "0 0 12px", letterSpacing: 0.3 }}>
                동명이인이 있어요. 본인을 선택해주세요:
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {matches.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => loginAs(s)}
                    style={{
                      display: "flex", alignItems: "center", gap: 12, padding: "12px 16px",
                      border: "1px solid #e5e7eb", borderRadius: 14, background: "#fff",
                      cursor: "pointer", transition: "all 0.2s", textAlign: "left",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = PRIMARY; e.currentTarget.style.background = "rgba(99,102,241,0.02)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#e5e7eb"; e.currentTarget.style.background = "#fff"; }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 12,
                      background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0,
                    }}>
                      {s.avatar || s.name[0]}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#1f2937" }}>{s.name}</div>
                      <div style={{ fontSize: 12, color: "#9ca3af" }}>
                        {[s.grade, s.class].filter(Boolean).join(" · ") || "정보 없음"}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
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
                찾는 중...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>login</span>
                시작하기
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <p style={{ textAlign: "center", fontSize: 12, color: "#9ca3af", marginTop: 24 }}>
          이름이 없나요? <span style={{ color: "#6366f1", fontWeight: 600 }}>선생님에게 말해주세요!</span>
        </p>
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
