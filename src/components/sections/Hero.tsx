"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════
// TEXT EFFECTS (kept from original)
// ═══════════════════════════════════════════════

// 1. Glitch/Matrix Decode Effect
function GlitchDecode({ text, delay = 0 }: { text: string; delay?: number }) {
    const [display, setDisplay] = useState("");
    const [started, setStarted] = useState(false);
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split("").map((char, i) => {
                    if (char === " ") return " ";
                    if (i < iteration) return char;
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            iteration += 0.5;
            if (iteration >= text.length) clearInterval(interval);
        }, 40);
        return () => clearInterval(interval);
    }, [started, text]);

    return (
        <p style={{
            fontSize: "clamp(24px, 5vw, 44px)",
            fontWeight: 600,
            color: "#1e293b",
            fontFamily: "'Pretendard', sans-serif",
            minHeight: "1.5em",
            textShadow: "0 0 20px rgba(255,255,255,0.8)",
            opacity: started ? 1 : 0,
            transition: "opacity 0.3s",
        }}>
            {display || "\u00A0"}
        </p>
    );
}

// 2. Stagger Letter Animation
function StaggerText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <p style={{ fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 500, color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase" as const, display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "center" }}>
            {text.split("").map((char, i) => (
                <span key={i} style={{
                    display: "inline-block",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s`,
                    textShadow: "0 0 10px rgba(255,255,255,0.6)",
                }}>
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </p>
    );
}

// 3. TypeWriter Effect
function TypeWriter({ lines, delay = 0 }: { lines: string[]; delay?: number }) {
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [started, setStarted] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        const current = lines[lineIdx];
        let timer: ReturnType<typeof setTimeout>;

        if (!deleting) {
            if (charIdx < current.length) {
                timer = setTimeout(() => setCharIdx(c => c + 1), 50 + Math.random() * 30);
            } else {
                timer = setTimeout(() => setDeleting(true), 2000);
            }
        } else {
            if (charIdx > 0) {
                timer = setTimeout(() => setCharIdx(c => c - 1), 25);
            } else {
                setDeleting(false);
                setLineIdx(l => (l + 1) % lines.length);
            }
        }
        return () => clearTimeout(timer);
    }, [charIdx, deleting, started, lineIdx, lines]);

    return (
        <div style={{
            background: "rgba(15, 23, 42, 0.85)",
            borderRadius: "12px",
            padding: "16px 24px",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "#38bdf8",
            minHeight: "52px",
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(56,189,248,0.2)",
            boxShadow: `0 4px 24px rgba(0,0,0,0.2), inset 0 0 30px rgba(14,165,233,0.05), 0 0 ${!deleting && charIdx > 0 ? 15 : 5}px rgba(56,189,248,${!deleting && charIdx > 0 ? 0.4 : 0.1})`,
            opacity: started ? 1 : 0,
            transition: "opacity 0.5s",
        }}>
            <span style={{ color: "#64748b", marginRight: "8px" }}>{">"}</span>
            {started ? lines[lineIdx].substring(0, charIdx) : ""}
            <span style={{ animation: "blink 0.8s step-end infinite", color: "#ef4444", fontWeight: 700, marginLeft: "1px" }}>|</span>
        </div>
    );
}

// ═══════════════════════════════════════════════
// Hero Component — Video Background
// ═══════════════════════════════════════════════
export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        if (!sectionRef.current) return;

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const viewH = window.innerHeight;
            const progress = Math.max(0, Math.min(1, -rect.top / viewH));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} id="hero" className="relative w-full text-slate-800" style={{ minHeight: "100vh", background: "#ffffff" }}>

            {/* VIDEO BACKGROUND — replaces Three.js Canvas */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full z-0"
            >
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: `translate(-50%, -50%) scale(${1 + scrollProgress * 0.15})`,
                        minWidth: "100%",
                        minHeight: "100%",
                        width: "auto",
                        height: "auto",
                        objectFit: "cover",
                        transition: "transform 0.1s ease-out",
                        filter: "saturate(0) contrast(1.2)",
                        opacity: 0.4,
                    }}
                >
                    <source src="/videos/hero-globe.mp4" type="video/mp4" />
                </video>
                {/* White vignette overlay */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "radial-gradient(ellipse at center, transparent 30%, rgba(255,255,255,0.8) 100%)",
                    pointerEvents: "none",
                }} />
            </motion.div>

            {/* Data stream decorations */}
            <style>{`
                .data-stream { position:absolute; background:linear-gradient(90deg,transparent,#cbd5e1,transparent); height:1px; width:150px; opacity:0.3; filter:blur(0.5px); animation:stream 4s cubic-bezier(0.4,0,0.2,1) infinite; }
                .data-stream-red { position:absolute; background:linear-gradient(90deg,transparent,#94a3b8,transparent); height:1px; width:120px; opacity:0.2; filter:blur(0.5px); animation:stream 5s cubic-bezier(0.4,0,0.2,1) infinite; }
                @keyframes stream { 0%{transform:translateX(-200%) translateY(0);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateX(120vw) translateY(50px);opacity:0} }
            `}</style>

            <div className="data-stream" style={{ top: '20%', left: 0, animationDuration: '5s' }} />
            <div className="data-stream-red" style={{ top: '45%', left: 0, animationDelay: '1.5s', animationDuration: '6s' }} />
            <div className="data-stream" style={{ top: '65%', left: 0, animationDelay: '2s', animationDuration: '4s' }} />
            <div className="data-stream" style={{ top: '35%', right: 0, animationDelay: '1s', animationDirection: 'reverse', animationDuration: '6s' }} />

            <div
                className="relative z-10 w-full min-h-[100vh] flex flex-col items-center justify-between pt-44 pb-12 pointer-events-none"
                style={{
                    filter: `blur(${scrollProgress * 4}px)`,
                    opacity: 1 - scrollProgress * 0.5,
                    transition: "filter 0.1s, opacity 0.1s",
                }}
            >
                {/* TOP: Logo + Tagline */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textAlign: "center" }}>
                    <img
                        src="/images/promo/logo-codingssok.png"
                        alt="코딩쏙"
                        style={{
                            height: "clamp(100px, 16vw, 220px)",
                            objectFit: "contain",
                            animation: "logoFlip 1.2s cubic-bezier(0.16,1,0.3,1) both",
                            filter: "drop-shadow(0 4px 20px rgba(59,130,246,0.3))",
                        }}
                    />
                    <p style={{ fontSize: "clamp(16px, 2.5vw, 24px)", fontWeight: 500, color: "#64748b", letterSpacing: "0.05em" }}>머리에 쏙쏙 들어오는 코딩교육</p>
                </div>

                {/* SPACER */}
                <div style={{ minHeight: "55vh" }} />

                {/* BOTTOM: Text effects */}
                <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textAlign: "center", maxWidth: "1100px", padding: "24px 32px",
                    background: "rgba(255,255,255,0.85)",
                    borderRadius: "24px",
                    border: "1px solid rgba(59,130,246,0.1)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                }}>
                    {/* Decorative accent line */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", opacity: 0.6 }}>
                        <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #0ea5e9)" }} />
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", boxShadow: "0 0 8px #0ea5e9" }} />
                        <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", color: "#0ea5e9", textTransform: "uppercase" as const }}>Codingssok Academy</span>
                        <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", boxShadow: "0 0 8px #0ea5e9" }} />
                        <div style={{ width: "40px", height: "1px", background: "linear-gradient(270deg, transparent, #0ea5e9)" }} />
                    </div>

                    <GlitchDecode text="AI 시대, 진짜 코딩을 배우세요" delay={800} />

                    <StaggerText text="Think → Code → Create → Launch" delay={2000} />

                    {/* Brief description */}
                    <p style={{
                        fontSize: "clamp(14px, 1.8vw, 18px)",
                        color: "#64748b",
                        lineHeight: 1.7,
                        maxWidth: "600px",
                        opacity: 0.8,
                        animation: "fadeSlideUp 1s ease 2.5s both",
                    }}>
                        단순 암기가 아닌, <span style={{ color: "#38bdf8", fontWeight: 600 }}>AI와 함께 사고하는 코딩</span>을<br />
                        기초부터 실전 프로젝트까지 체계적으로 배워보세요.
                    </p>

                    <TypeWriter lines={[
                        "const future = await learn('coding');",
                        "student.skills.push('React', 'AI', 'Web3');",
                        "console.log('Welcome to 코딩쏙! 🚀');",
                    ]} delay={3000} />

                    {/* CTA hint */}
                    <div style={{
                        display: "flex", gap: "8px", alignItems: "center",
                        animation: "fadeSlideUp 1s ease 4s both",
                        opacity: 0.5,
                    }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M5 10l3 3 3-3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span style={{ fontSize: "12px", color: "#94a3b8", letterSpacing: "0.1em" }}>SCROLL TO EXPLORE</span>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M5 10l3 3 3-3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes logoFlip {
                    0% { transform: perspective(600px) rotateY(-90deg) scale(0.5); opacity: 0; }
                    60% { transform: perspective(600px) rotateY(10deg) scale(1.05); opacity: 1; }
                    100% { transform: perspective(600px) rotateY(0deg) scale(1); opacity: 1; }
                }
                @keyframes blink { 50% { opacity: 0; } }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
