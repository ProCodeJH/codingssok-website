"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";

// ═══════════════════════════════════════════════
// Hero — Fullscreen Cinematic (Alux-inspired)
// Dark overlay · Big typography · Video crossfade
// ═══════════════════════════════════════════════

const VIDEOS = [
    { src: "/videos/hero-bg.mp4",       filter: "brightness(0.6)" },
    { src: "/videos/hero-sphere-1.mp4", filter: "brightness(0.5) saturate(0.8)" },
    { src: "/videos/hero-sphere-2.mp4", filter: "brightness(0.5) saturate(0.8)" },
];

const CROSSFADE_SEC = 1.5;

const WORDS = ["코딩", "사고력", "미래"];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const transitioningRef = useRef(false);

    // Word rotation
    useEffect(() => {
        const id = setInterval(() => setWordIndex(p => (p + 1) % WORDS.length), 3000);
        return () => clearInterval(id);
    }, []);

    // Scroll parallax
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            setScrollProgress(Math.max(0, Math.min(1, -rect.top / window.innerHeight)));
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Start first video
    useEffect(() => {
        videoRefs.current[0]?.play().catch(() => {});
    }, []);

    // Crossfade logic
    const advanceVideo = useCallback((fromIndex: number) => {
        const next = (fromIndex + 1) % VIDEOS.length;
        const nextVideo = videoRefs.current[next];
        if (nextVideo) {
            nextVideo.currentTime = 0;
            nextVideo.play().catch(() => {});
        }
        setActiveIndex(next);
    }, []);

    useEffect(() => {
        const activeVideo = videoRefs.current[activeIndex];
        if (!activeVideo) return;

        const onTimeUpdate = () => {
            if (transitioningRef.current) return;
            const remaining = activeVideo.duration - activeVideo.currentTime;
            if (remaining > 0 && remaining <= CROSSFADE_SEC) {
                transitioningRef.current = true;
                advanceVideo(activeIndex);
            }
        };
        const onEnded = () => {
            if (!transitioningRef.current) advanceVideo(activeIndex);
        };

        activeVideo.addEventListener("timeupdate", onTimeUpdate);
        activeVideo.addEventListener("ended", onEnded);
        return () => {
            activeVideo.removeEventListener("timeupdate", onTimeUpdate);
            activeVideo.removeEventListener("ended", onEnded);
        };
    }, [activeIndex, advanceVideo]);

    useEffect(() => { transitioningRef.current = false; }, [activeIndex]);

    return (
        <section ref={sectionRef} id="hero" style={{
            position: "relative", width: "100%", height: "100vh", overflow: "hidden",
            background: "#000", color: "#fff",
        }}>
            {/* ── Video Background ── */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 0,
                transform: `scale(${1 + scrollProgress * 0.1})`,
                transition: "transform 0.1s linear",
            }}>
                {VIDEOS.map((v, i) => (
                    <video
                        key={v.src}
                        ref={(el) => { videoRefs.current[i] = el; }}
                        muted playsInline preload="auto"
                        style={{
                            position: "absolute", inset: 0,
                            width: "100%", height: "100%", objectFit: "cover",
                            filter: v.filter,
                            opacity: activeIndex === i ? 1 : 0,
                            transition: "opacity 1.5s ease-in-out",
                        }}
                    >
                        <source src={v.src} type="video/mp4" />
                    </video>
                ))}
                {/* Dark gradient overlay */}
                <div style={{
                    position: "absolute", inset: 0, zIndex: 1,
                    background: "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.5) 100%)",
                }} />
            </div>

            {/* ── Content ── */}
            <div style={{
                position: "relative", zIndex: 10,
                width: "100%", height: "100%",
                display: "flex", flexDirection: "column",
                justifyContent: "space-between",
                padding: "clamp(24px, 5vw, 48px)",
                opacity: 1 - scrollProgress * 0.6,
                filter: `blur(${scrollProgress * 5}px)`,
                transition: "opacity 0.1s, filter 0.1s",
                boxSizing: "border-box",
            }}>
                {/* Top bar: Logo + Nav hint */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    paddingTop: 60,
                }}>
                    <Image
                        src="/images/promo/logo-codingssok.png"
                        alt="코딩쏙"
                        width={140} height={45}
                        style={{ objectFit: "contain", filter: "brightness(10)" }}
                        priority
                    />
                    <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        fontSize: 12, fontWeight: 500, color: "rgba(255,255,255,0.5)",
                        letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>
                        <span style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: "#4ade80", animation: "heroPulse 2s ease-in-out infinite",
                        }} />
                        수강생 모집 중
                    </div>
                </div>

                {/* Center: Main heading */}
                <div style={{
                    display: "flex", flexDirection: "column", gap: "clamp(12px, 2vw, 20px)",
                    maxWidth: 900,
                }}>
                    <h1 style={{
                        fontSize: "clamp(40px, 8vw, 96px)",
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: "-0.03em",
                        margin: 0,
                        fontFamily: "'Outfit', 'Noto Sans KR', sans-serif",
                    }}>
                        AI 시대,<br />
                        <span style={{
                            display: "inline-block", position: "relative",
                            background: "linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        }}>
                            진짜 {WORDS[wordIndex]}
                        </span>
                        <span style={{ display: "inline-block", width: 4 }} />
                        을<br />배우세요.
                    </h1>

                    <p style={{
                        fontSize: "clamp(14px, 1.8vw, 20px)",
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.55)",
                        lineHeight: 1.6,
                        maxWidth: 520,
                    }}>
                        C · Python 중심 텍스트코딩 강화.<br />
                        프로젝트 · 공모전 · 자격증까지 대비합니다.
                    </p>

                    {/* CTA */}
                    <div style={{ display: "flex", gap: 12, marginTop: 8, flexWrap: "wrap" }}>
                        <a href="#contact" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "14px 32px", borderRadius: 999,
                            background: "#fff", color: "#0a0a0a",
                            fontSize: 15, fontWeight: 700, textDecoration: "none",
                            transition: "all 0.3s",
                            letterSpacing: "-0.01em",
                        }}>
                            상담 신청
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                        </a>
                        <a href="#curriculum" style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "14px 32px", borderRadius: 999,
                            background: "transparent", color: "#fff",
                            border: "1px solid rgba(255,255,255,0.25)",
                            fontSize: 15, fontWeight: 500, textDecoration: "none",
                            transition: "all 0.3s",
                            letterSpacing: "-0.01em",
                        }}>
                            커리큘럼 보기
                        </a>
                    </div>
                </div>

                {/* Bottom: Video indicator + scroll hint */}
                <div style={{
                    display: "flex", alignItems: "flex-end", justifyContent: "space-between",
                }}>
                    {/* Video progress dots */}
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        {VIDEOS.map((_, i) => (
                            <div key={i} style={{
                                width: activeIndex === i ? 32 : 8, height: 3,
                                borderRadius: 2,
                                background: activeIndex === i ? "#fff" : "rgba(255,255,255,0.3)",
                                transition: "all 0.5s ease",
                            }} />
                        ))}
                        <span style={{
                            fontSize: 11, fontWeight: 500, color: "rgba(255,255,255,0.4)",
                            marginLeft: 8, fontFamily: "'JetBrains Mono', monospace",
                        }}>
                            {String(activeIndex + 1).padStart(2, "0")} / {String(VIDEOS.length).padStart(2, "0")}
                        </span>
                    </div>

                    {/* Scroll indicator */}
                    <div style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                        animation: "heroFloat 2s ease-in-out infinite",
                    }}>
                        <span style={{
                            fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)",
                            letterSpacing: "0.15em", textTransform: "uppercase",
                            writingMode: "vertical-lr",
                        }}>
                            Scroll
                        </span>
                        <div style={{
                            width: 1, height: 40,
                            background: "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
                        }} />
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes heroPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
                @keyframes heroFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
            `}</style>
        </section>
    );
}
