"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

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
                    }}
                >
                    <source src="/videos/hero-bg.mp4" type="video/mp4" />
                </video>
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

                {/* BOTTOM: Heading only */}
                <div style={{
                    padding: "28px 48px",
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "20px",
                    border: "1px solid rgba(0,0,0,0.06)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
                    backdropFilter: "blur(12px)",
                }}>
                    <p style={{
                        fontSize: "clamp(28px, 4vw, 44px)",
                        fontWeight: 700,
                        color: "#0f172a",
                        lineHeight: 1.3,
                        letterSpacing: "-0.02em",
                        margin: 0,
                    }}>
                        AI 시대,{" "}
                        <span style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            진짜 코딩
                        </span>을 배우세요
                    </p>
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
