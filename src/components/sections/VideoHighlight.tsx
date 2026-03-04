"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
} from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";

/*
  코딩쏙 Video Highlight Section
  - Replaced nodcoding's eye with:
    1. </> Code Bracket — mouse-tracking tilt SVG
    2. Terminal Cursor — typing effect with blinking cursor
*/

/* ─── Typing phrases for the terminal ─── */
const TYPING_PHRASES = [
    "> 코딩 시작...",
    "> print('안녕!')",
    "> for i in range(∞):",
    ">     꿈을 코딩하다",
    "> import 미래",
    "> def 성장():",
];

/* ─── Code Bracket + Terminal Component ─── */
function CodeBracketTerminal() {
    const mouse = useMousePosition();
    const [currentPhrase, setCurrentPhrase] = useState("");
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    // Mouse-tracking tilt for the bracket
    const springConfig = { damping: 20, stiffness: 100, mass: 0.5 };
    const rotateX = useSpring(
        useMotionValue((mouse.progressY - 0.5) * -20),
        springConfig
    );
    const rotateY = useSpring(
        useMotionValue((mouse.progressX - 0.5) * 20),
        springConfig
    );

    rotateX.set((mouse.progressY - 0.5) * -20);
    rotateY.set((mouse.progressX - 0.5) * 20);

    // Typing effect
    const tick = useCallback(() => {
        const fullPhrase = TYPING_PHRASES[phraseIndex];

        if (!isDeleting) {
            setCurrentPhrase(fullPhrase.substring(0, charIndex + 1));
            setCharIndex((prev) => prev + 1);

            if (charIndex + 1 === fullPhrase.length) {
                // Pause at end of phrase, then start deleting
                setTimeout(() => setIsDeleting(true), 1800);
                return;
            }
        } else {
            setCurrentPhrase(fullPhrase.substring(0, charIndex - 1));
            setCharIndex((prev) => prev - 1);

            if (charIndex <= 1) {
                setIsDeleting(false);
                setPhraseIndex((prev) => (prev + 1) % TYPING_PHRASES.length);
                setCharIndex(0);
            }
        }
    }, [charIndex, isDeleting, phraseIndex]);

    useEffect(() => {
        const speed = isDeleting ? 40 : 80;
        const timer = setTimeout(tick, speed);
        return () => clearTimeout(timer);
    }, [tick, isDeleting]);

    return (
        <div className="code-bracket-terminal">
            {/* </> Bracket — tilts with mouse */}
            <motion.div
                className="code-bracket"
                style={{
                    rotateX,
                    rotateY,
                    perspective: 600,
                }}
            >
                <svg
                    viewBox="0 0 200 100"
                    width="200"
                    height="100"
                    fill="none"
                    className="code-bracket__svg"
                >
                    {/* < */}
                    <motion.path
                        d="M 55 10 L 15 50 L 55 90"
                        stroke="var(--color-brand-1)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    />
                    {/* / */}
                    <motion.path
                        d="M 85 15 L 115 85"
                        stroke="var(--color-brand-3)"
                        strokeWidth="7"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.5 }}
                    />
                    {/* > */}
                    <motion.path
                        d="M 145 10 L 185 50 L 145 90"
                        stroke="var(--color-brand-4)"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    />
                </svg>
            </motion.div>

            {/* Terminal typing */}
            <div className="terminal-line">
                <span className="terminal-line__text">{currentPhrase}</span>
                <span className="terminal-line__cursor">_</span>
            </div>
        </div>
    );
}

/* ─── Main Section ─── */
export default function VideoHighlight() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 90%", "start 40%"],
    });

    const revealY = useTransform(scrollYProgress, [0, 1], [60, 0]);
    const revealOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    const handlePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <motion.div
            ref={sectionRef}
            className="s-video-highlight"
            style={{
                y: revealY,
                opacity: revealOpacity,
                position: "relative",
                zIndex: 2,
                marginTop: "var(--section-spacing)",
                marginBottom: "var(--section-spacing-lg)",
            }}
        >
            <div className="u-container">
                {/* ── Video section — full width ── */}
                <div className="video-body">
                    {/* Video mask + border overlays */}
                    <div className="video-body__mask" />
                    <div className="video-body__border" />

                    {/* Video wrapper */}
                    <div
                        className="video-body__wrapper"
                        onClick={handlePlay}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                                handlePlay();
                        }}
                    >
                        {/* Video — preloads metadata to show first frame as thumbnail */}
                        <div className="video-body__video">
                            <video
                                ref={videoRef}
                                className="video-body__player"
                                playsInline
                                width={1280}
                                height={720}
                                preload="metadata"
                                onEnded={() => setIsPlaying(false)}
                            >
                                <source
                                    src="/videos/codingssok-intro.mp4#t=0.5"
                                    type="video/mp4"
                                />
                            </video>
                        </div>

                        {/* Premium Frosted Glass Overlay */}
                        <motion.div
                            className="video-body__cover"
                            animate={{ opacity: isPlaying ? 0 : 1 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            style={{ pointerEvents: isPlaying ? "none" : "auto" }}
                        >
                            {/* Gradient glass overlay */}
                            <div style={{
                                position: 'absolute', inset: 0, borderRadius: '1.5rem',
                                background: 'linear-gradient(135deg, rgba(14,165,233,0.05) 0%, rgba(0,0,0,0.08) 50%, rgba(239,68,68,0.05) 100%)',
                            }} />

                            {/* Corner brackets decoration */}
                            <svg style={{ position: 'absolute', top: '16px', left: '16px', opacity: 0.4 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M2 14V4a2 2 0 012-2h10" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <svg style={{ position: 'absolute', top: '16px', right: '16px', opacity: 0.4 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M38 14V4a2 2 0 00-2-2H26" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <svg style={{ position: 'absolute', bottom: '16px', left: '16px', opacity: 0.4 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M2 26v10a2 2 0 002 2h10" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                            <svg style={{ position: 'absolute', bottom: '16px', right: '16px', opacity: 0.4 }} width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <path d="M38 26v10a2 2 0 01-2 2H26" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
                            </svg>

                            {/* Center play button with pulse ring */}
                            <div style={{
                                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
                            }}>
                                <div style={{ position: 'relative' }}>
                                    {/* Pulse ring */}
                                    <div style={{
                                        position: 'absolute', inset: '-12px', borderRadius: '50%',
                                        border: '2px solid rgba(255,255,255,0.2)',
                                        animation: 'videoPulse 2s ease-in-out infinite',
                                    }} />
                                    <div style={{
                                        width: '72px', height: '72px', borderRadius: '50%',
                                        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
                                        border: '2px solid rgba(255,255,255,0.3)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        transition: 'all 0.3s ease',
                                    }}>
                                        <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                                            <path d="M2 2l20 12L2 26V2z" fill="white" />
                                        </svg>
                                    </div>
                                </div>
                                <span style={{
                                    color: 'white', fontSize: '14px', fontWeight: 600, letterSpacing: '0.15em',
                                    textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                    textTransform: 'uppercase' as const,
                                }}>Play Video</span>
                            </div>

                            {/* Top-right badge */}
                            <div style={{
                                position: 'absolute', top: '20px', right: '20px',
                                background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(6px)',
                                padding: '6px 14px', borderRadius: '20px',
                                border: '1px solid rgba(255,255,255,0.15)',
                            }}>
                                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', fontWeight: 600, letterSpacing: '0.1em' }}>PREVIEW</span>
                            </div>
                        </motion.div>
                    </div>



                </div>
            </div>
        </motion.div>
    );
}
