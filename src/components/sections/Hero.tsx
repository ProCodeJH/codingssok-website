"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

// ═══════════════════════════════════════════════
// Hero Component — 3-Video Crossfade Background
// ═══════════════════════════════════════════════

const VIDEOS = [
    { src: "/videos/hero-bg.mp4",       filter: "brightness(2.5)" },
    { src: "/videos/hero-sphere-1.mp4", filter: "brightness(3.5) saturate(0.3)" },
    { src: "/videos/hero-sphere-2.mp4", filter: "brightness(3.5) saturate(0.3)" },
];

const CROSSFADE_SEC = 1.5; // start fading this many seconds before video ends

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const transitioningRef = useRef(false);

    // Scroll parallax
    useEffect(() => {
        if (!sectionRef.current) return;
        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const viewH = window.innerHeight;
            const progress = Math.max(0, Math.min(1, -rect.top / viewH));
            setScrollProgress(progress);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Start first video on mount
    useEffect(() => {
        const first = videoRefs.current[0];
        if (first) first.play().catch(() => {});
    }, []);

    // Crossfade logic: use timeupdate to detect approaching end
    useEffect(() => {
        const activeVideo = videoRefs.current[activeIndex];
        if (!activeVideo) return;

        const onTimeUpdate = () => {
            if (transitioningRef.current) return;
            const remaining = activeVideo.duration - activeVideo.currentTime;
            if (remaining > 0 && remaining <= CROSSFADE_SEC) {
                transitioningRef.current = true;
                const next = (activeIndex + 1) % VIDEOS.length;
                // Prep & play next video so it's visible during crossfade overlap
                const nextVideo = videoRefs.current[next];
                if (nextVideo) {
                    nextVideo.currentTime = 0;
                    nextVideo.play().catch(() => {});
                }
                setActiveIndex(next);
            }
        };

        const onEnded = () => {
            // Safety: if timeupdate didn't trigger, force transition
            if (!transitioningRef.current) {
                const next = (activeIndex + 1) % VIDEOS.length;
                const nextVideo = videoRefs.current[next];
                if (nextVideo) {
                    nextVideo.currentTime = 0;
                    nextVideo.play().catch(() => {});
                }
                setActiveIndex(next);
            }
        };

        activeVideo.addEventListener("timeupdate", onTimeUpdate);
        activeVideo.addEventListener("ended", onEnded);
        return () => {
            activeVideo.removeEventListener("timeupdate", onTimeUpdate);
            activeVideo.removeEventListener("ended", onEnded);
        };
    }, [activeIndex]);

    // Reset transition lock when activeIndex changes
    useEffect(() => {
        transitioningRef.current = false;
    }, [activeIndex]);

    return (
        <section ref={sectionRef} id="hero" className="relative w-full text-slate-800" style={{ minHeight: "100vh", background: "#ffffff" }}>

            {/* VIDEO BACKGROUND — 3 videos with overlapping crossfade */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full z-0"
            >
                {VIDEOS.map((v, i) => (
                    <video
                        key={v.src}
                        ref={(el) => { videoRefs.current[i] = el; }}
                        muted
                        playsInline
                        preload="auto"
                        style={{
                            position: "absolute",
                            top: "70%",
                            left: "50%",
                            transform: `translate(-50%, -50%) scale(${1 + scrollProgress * 0.15})`,
                            minWidth: "100%",
                            minHeight: "100%",
                            width: "auto",
                            height: "auto",
                            objectFit: "cover",
                            mixBlendMode: "screen",
                            filter: v.filter,
                            opacity: activeIndex === i ? 1 : 0,
                            zIndex: activeIndex === i ? 1 : 0,
                            transition: "opacity 1.5s ease-in-out",
                        }}
                    >
                        <source src={v.src} type="video/mp4" />
                    </video>
                ))}
            </motion.div>

            <div
                className="relative z-10 w-full min-h-[100vh] flex flex-col items-center justify-between pt-24 pb-32 pointer-events-none"
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
                            height: "clamp(80px, 14vw, 180px)",
                            objectFit: "contain",
                            animation: "logoFlip 1.2s cubic-bezier(0.16,1,0.3,1) both",
                            filter: "drop-shadow(0 4px 20px rgba(59,130,246,0.3))",
                        }}
                    />
                    <p style={{ fontSize: "clamp(14px, 2vw, 20px)", fontWeight: 500, color: "#64748b", letterSpacing: "0.05em" }}>머리에 쏙쏙 들어오는 코딩교육</p>
                </div>

                {/* BOTTOM: Heading */}
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
                        <span style={{ background: "linear-gradient(135deg, #3b82f6, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
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
            `}</style>
        </section>
    );
}
