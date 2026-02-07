"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FlowerLetter from "@/components/ui/FlowerLetter";
import Link from "next/link";

/*
  코딩쏙 Hero — 3D Glass Code Orbs
  Transparent glass with strong depth, widely spaced
*/

const letters = [
    { letter: "코", shapeKey: "코", orbSize: 240 },
    { letter: "딩", shapeKey: "딩", orbSize: 280 },
    { letter: "쏙", shapeKey: "쏙", orbSize: 240 },
];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

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
                background: "var(--color-beige)",
            }}
        >
            {/* ── .b__letters ── */}
            <div
                className="b__letters"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "clamp(32px, 6vw, 64px)",
                    padding: "20px 20px 0",
                    position: "relative",
                    zIndex: 2,
                }}
            >
                {letters.map((l, i) => (
                    <FlowerLetter
                        key={l.letter}
                        letter={l.letter}
                        shapeKey={l.shapeKey}
                        orbSize={l.orbSize}
                        index={i}
                    />
                ))}
            </div>

            {/* ── s__content — nodcoding section content overlay ── */}
            <div className="s__content" style={{ width: "100%" }}>
                <div className="u-container">
                    <h1 className="s__title s__title--lg t-h-xs">
                        {/* s__title__main — letter reveal animation */}
                        <motion.span
                            className="s__title__main"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            코딩쏙
                        </motion.span>

                        {/* s__title__secondary — heading reveal */}
                        <motion.span
                            className="s__title__secondary"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            대전 C·Python 코딩 전문 학원
                        </motion.span>
                    </h1>

                    {/* s__text--sm — text reveal with delay */}
                    <motion.div
                        className="s__text s__text--sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p>AI 시대의 핵심 역량, 코딩을 배우세요. 커리어 전환이든 성장이든, 코딩은 당신의 삶을 영원히 바꿔줄 것입니다. 첫 걸음을 내딛고 코딩쏙의 C·Python 부트캠프에 지금 바로 지원하세요.</p>
                    </motion.div>
                </div>
            </div>

            {/* ── CTA Buttons — nodcoding btn-pill style ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{
                    display: "flex",
                    gap: 16,
                    marginTop: 16,
                    position: "relative",
                    zIndex: 3,
                    paddingLeft: `calc(var(--container-offset) / 2)`,
                    paddingRight: `calc(var(--container-offset) / 2)`,
                    maxWidth: "var(--container-max-width)",
                    width: "100%",
                }}
            >
                <Link
                    href="#contact"
                    className="btn-pill btn-pill--primary"
                >
                    무료 상담 예약
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <Link
                    href="tel:010-7566-7229"
                    className="btn-pill btn-pill--secondary"
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
