"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FlowerLetter from "@/components/ui/FlowerLetter";
import Link from "next/link";

/*
  Replicates nodcoding.com's `.b-hero-home` structure:
    .b__letters  → FlowerLetter × 3 ("코", "딩", "쏙")
    .b__bootcamp → clip-path reveal text ("대전 코딩 학원")
    .b__render   → SVG background shape
*/

const letters = [
    { letter: "코", shapeKey: "코", stemWidth: 109, stemHeight: 275, flowerHeight: 140 },
    { letter: "딩", shapeKey: "딩", stemWidth: 133, stemHeight: 247, flowerHeight: 140 },
    { letter: "쏙", shapeKey: "쏙", stemWidth: 107, stemHeight: 274, flowerHeight: 140 },
];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    // Bootcamp text clip-path reveal
    const clipProgress = useTransform(scrollYProgress, [0.05, 0.25], [0, 100]);

    // SVG render path — white fill rises from bottom
    const renderY = useTransform(scrollYProgress, [0, 0.3], [670, 400]);

    return (
        <section
            ref={sectionRef}
            className="b-hero-home"
            style={{
                position: "relative",
                minHeight: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                background: "#FAFAF9",
            }}
        >
            {/* ── .b__letters ── */}
            <div
                className="b__letters"
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: "clamp(8px, 2vw, 24px)",
                    padding: "60px 20px 0",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {letters.map((l, i) => (
                    <FlowerLetter
                        key={l.letter}
                        letter={l.letter}
                        shapeKey={l.shapeKey}
                        stemWidth={l.stemWidth}
                        stemHeight={l.stemHeight}
                        flowerHeight={l.flowerHeight}
                        index={i}
                    />
                ))}
            </div>

            {/* ── .b__bootcamp — clip-path text reveal ── */}
            <motion.div
                className="b__bootcamp"
                style={{
                    position: "relative",
                    zIndex: 3,
                    marginTop: "-30px",
                    textAlign: "center",
                    overflow: "hidden",
                }}
            >
                <motion.div
                    style={{
                        clipPath: `polygon(0 0, ${clipProgress}% 0, ${clipProgress}% 100%, 0 100%)`,
                    }}
                >
                    <h1
                        style={{
                            fontSize: "clamp(2rem, 5vw, 4.5rem)",
                            fontWeight: 800,
                            color: "#383030",
                            lineHeight: 1.1,
                            letterSpacing: "-0.03em",
                            whiteSpace: "nowrap",
                        }}
                    >
                        코딩쏙
                    </h1>
                </motion.div>
            </motion.div>

            {/* ── Subtitle ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    textAlign: "center",
                    marginTop: 24,
                    position: "relative",
                    zIndex: 3,
                }}
            >
                <p
                    style={{
                        fontSize: "clamp(1rem, 2vw, 1.25rem)",
                        color: "#6B6B6B",
                        maxWidth: 480,
                        margin: "0 auto",
                        lineHeight: 1.6,
                    }}
                >
                    C·Python 중심 텍스트코딩 전문 학원
                    <br />
                    AI 시대 역량을 &apos;쏙&apos; 채우는 코딩 교육
                </p>
            </motion.div>

            {/* ── CTA Buttons — nodcoding "Apply now" pill style ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    display: "flex",
                    gap: 16,
                    marginTop: 40,
                    position: "relative",
                    zIndex: 3,
                }}
            >
                <Link
                    href="#contact"
                    className="btn-pill btn-pill--primary"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "14px 32px",
                        borderRadius: 999,
                        background: "#EC5212",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 16,
                        textDecoration: "none",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                >
                    무료 상담 예약
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <Link
                    href="tel:010-7566-7229"
                    className="btn-pill btn-pill--secondary"
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "14px 32px",
                        borderRadius: 999,
                        background: "#383030",
                        color: "#fff",
                        fontWeight: 600,
                        fontSize: 16,
                        textDecoration: "none",
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    }}
                >
                    전화 문의
                </Link>
            </motion.div>

            {/* ── .b__render — SVG background shape (white fill from bottom) ── */}
            <svg
                className="b__render"
                width="100%"
                height="100%"
                fill="none"
                style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1,
                    pointerEvents: "none",
                }}
                viewBox="0 0 1920 1080"
                preserveAspectRatio="none"
            >
                <motion.path
                    d={`M 0 670 Q 960 670 1920 670 L 1920 1080 L 0 1080 Z`}
                    fill="#fff"
                    style={{ y: renderY }}
                />
            </svg>
        </section>
    );
}
