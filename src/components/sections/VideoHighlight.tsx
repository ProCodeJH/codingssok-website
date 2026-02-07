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
                {/* ── b-heading-eye-1 — Title + Eye ── */}
                <div className="heading-eye">
                    <div className="heading-eye__content">
                        <div className="heading-eye__inner">
                            <motion.h2
                                className="heading-eye__title t-h-2xs"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                코딩쏙 학습 경험
                            </motion.h2>

                            {/* Decorative shapes — b__shapes */}
                            <div className="heading-eye__shapes">
                                <motion.div
                                    className="heading-eye__shape"
                                    initial={{ scale: 0, rotate: -45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.3,
                                        duration: 0.6,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                />
                                <motion.div
                                    className="heading-eye__shape"
                                    initial={{ scale: 0, rotate: 45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.5,
                                        duration: 0.6,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Code Bracket + Terminal — replaces eye */}
                    <div className="heading-eye__head">
                        <CodeBracketTerminal />
                    </div>
                </div>

                {/* ── s__body — Video section ── */}
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
                        {/* Cover image */}
                        <motion.div
                            className="video-body__cover"
                            animate={{ opacity: isPlaying ? 0 : 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Placeholder — replace with actual <Image> when file exists */}
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(135deg, var(--color-brand-1) 0%, var(--color-brand-3) 50%, var(--color-brand-4) 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                                    fontWeight: 600,
                                    letterSpacing: "-0.03em",
                                    textAlign: "center",
                                    padding: "2rem",
                                }}
                            >
                                코딩쏙 소개 영상
                            </div>
                        </motion.div>

                        {/* Video */}
                        <div className="video-body__video">
                            <video
                                ref={videoRef}
                                className="video-body__player"
                                playsInline
                                width={720}
                                height={720}
                                preload="none"
                                onEnded={() => setIsPlaying(false)}
                            >
                                <source
                                    src="/videos/codingssok-intro.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>

                        {/* Play button */}
                        <motion.div
                            className="video-body__play"
                            animate={{
                                scale: isPlaying ? 0 : 1,
                                opacity: isPlaying ? 0 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <svg
                                width="64"
                                height="64"
                                viewBox="0 0 64 64"
                                fill="none"
                            >
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="31"
                                    stroke="white"
                                    strokeWidth="2"
                                    fill="rgba(0,0,0,0.3)"
                                />
                                <path
                                    d="M26 20l18 12-18 12V20z"
                                    fill="white"
                                />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Description text — t-t-xl */}
                    <motion.div
                        className="video-body__text t-t-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            delay: 0.4,
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <p>
                            <span className="bullet-point" />
                            코딩쏙의 혁신적인 학습 경험을 확인하고, 새로운
                            코딩 여정을 시작하세요.
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
