"use client";

import { motion } from "framer-motion";

/*
  TechMarquee — 수업 키워드/기술 스택 마키 라인
  SVG 아이콘 + 3D 유리 필 + 네온 글로우 효과
*/

/* ── SVG Icons for each keyword ── */
const svgIcons: Record<string, React.ReactNode> = {
    "C언어": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3.14.69 4.22 1.78l-1.41 1.41A3.99 3.99 0 0012 7c-2.21 0-4 1.79-4 4s1.79 4 4 4a3.99 3.99 0 002.81-1.19l1.41 1.41A5.96 5.96 0 0112 17c-3.31 0-6-2.69-6-6s2.69-6 6-6z" fill="currentColor" /></svg>,
    "Python": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9.585 11.692h4.328a2.38 2.38 0 002.378-2.363V5.021a2.38 2.38 0 00-2.01-2.348c-1.276-.29-2.647-.407-3.93-.386-1.283.021-2.482.18-3.435.462C5.09 3.3 5 4.327 5 5.168v2.022h4.666v.667H4.333c-1.31 0-2.456.787-2.813 2.285-.412 1.718-.43 2.79 0 4.584.318 1.334 1.08 2.285 2.389 2.285h1.546V14.82c0-1.487 1.287-2.799 2.813-2.799h4.317c1.252 0 2.249-1.032 2.249-2.29V5.021c0-1.22-1.027-2.136-2.249-1.906-1.281.24-2.636.446-3.93.462V5.74c-.001.413-.342.748-.77.748s-.77-.337-.77-.751V3.577zM8.95 4.59a.87.87 0 01-.864-.867c0-.479.386-.867.864-.867s.865.388.865.867-.386.867-.865.867z" fill="currentColor" /><path d="M18.121 7.857v2.148c0 1.549-1.318 2.862-2.813 2.862H10.98c-1.233 0-2.249 1.055-2.249 2.29v4.308c0 1.22 1.06 1.938 2.249 2.29 1.424.42 2.789.497 4.317 0 1.015-.329 2.249-1.074 2.249-2.29v-1.718h-4.317v-.573h6.566c1.31 0 1.796-.913 2.249-2.285.468-1.413.448-2.773 0-4.584-.322-1.304-.937-2.285-2.249-2.285h-1.624v-.163zm-2.497 9.418a.87.87 0 01.865.867.87.87 0 01-.865.867.87.87 0 01-.864-.867c0-.479.386-.867.864-.867z" fill="currentColor" /></svg>,
    "HTML/CSS": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M4.136 3.012l1.375 15.433L11.999 21l6.5-2.558L19.864 3.012H4.136zM17.21 7.645H8.775l.235 2.632h7.965l-.742 8.136-4.234 1.17-4.233-1.17-.293-3.275h2.582l.148 1.667 1.796.484 1.797-.484.186-2.095H7.86L7.352 9.79h9.558l.3-2.145z" fill="currentColor" /></svg>,
    "알고리즘": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M6.5 6.5h0M17.5 6.5h0M17.5 17.5h0M6.5 17.5h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
    "정보올림피아드": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" /></svg>,
    "정보처리기능사": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" /><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /><line x1="9" y1="13" x2="15" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="9" y1="17" x2="15" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    "게임 개발": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 12h4m-2-2v4M15 11h.01M18 13h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M17.32 5H6.68a4 4 0 00-3.978 3.59l-.71 6.39A2 2 0 003.98 17h2.04a2 2 0 001.98-1.71l.23-1.58h7.54l.23 1.58A2 2 0 0017.98 17h2.04a2 2 0 001.98-2.02l-.71-6.39A4 4 0 0017.32 5z" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>,
    "앱 개발": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" fill="none" /><line x1="12" y1="18" x2="12" y2="18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
    "AI / 머신러닝": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
    "프로젝트 포트폴리오": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" fill="none" /></svg>,
    "소수 정예": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" fill="none" /><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" /></svg>,
    "1:6 밀착 코칭": <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" /><path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" /></svg>,
};

const KEYWORDS = [
    { text: "C언어", color: "#3b82f6" },
    { text: "Python", color: "#eab308" },
    { text: "HTML/CSS", color: "#ef4444" },
    { text: "알고리즘", color: "#8b5cf6" },
    { text: "정보올림피아드", color: "#f59e0b" },
    { text: "정보처리기능사", color: "#0ea5e9" },
    { text: "게임 개발", color: "#ec4899" },
    { text: "앱 개발", color: "#10b981" },
    { text: "AI / 머신러닝", color: "#6366f1" },
    { text: "프로젝트 포트폴리오", color: "#14b8a6" },
    { text: "소수 정예", color: "#f97316" },
    { text: "1:6 밀착 코칭", color: "#4f46e5" },
];

function MarqueeRow({ reverse = false, speed = 30 }: { reverse?: boolean; speed?: number }) {
    const items = [...KEYWORDS, ...KEYWORDS]; // duplicate for seamless loop

    return (
        <div style={{ overflow: "hidden", width: "100%", position: "relative" }}>
            {/* Gradient fades */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, var(--color-beige), transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(270deg, var(--color-beige), transparent)", zIndex: 2, pointerEvents: "none" }} />

            <motion.div
                animate={{ x: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
                transition={{ duration: speed, ease: "linear", repeat: Infinity }}
                style={{ display: "flex", gap: "clamp(16px, 3vw, 28px)", width: "max-content" }}
            >
                {items.map((kw, i) => (
                    <div
                        key={`${kw.text}-${i}`}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            padding: "10px 22px",
                            borderRadius: 999,
                            border: `1.5px solid ${kw.color}20`,
                            background: "rgba(255,255,255,0.7)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            whiteSpace: "nowrap",
                            fontSize: "clamp(13px, 1.5vw, 15px)",
                            fontWeight: 600,
                            color: "#334155",
                            transition: "all 0.3s",
                            flexShrink: 0,
                            boxShadow: `0 2px 8px ${kw.color}10, inset 0 0 20px rgba(255,255,255,0.5)`,
                        }}
                    >
                        <span style={{ color: kw.color, display: "flex", alignItems: "center" }}>
                            {svgIcons[kw.text]}
                        </span>
                        {kw.text}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export default function TechMarquee() {
    return (
        <section style={{
            padding: "clamp(32px, 5vw, 56px) 0",
            background: "var(--color-beige)",
            overflow: "hidden",
        }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "clamp(12px, 2vw, 16px)" }}>
                <MarqueeRow speed={35} />
                <MarqueeRow reverse speed={28} />
            </div>
        </section>
    );
}
