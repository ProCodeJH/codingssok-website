"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FlowerLetter from "@/components/ui/FlowerLetter";
import Link from "next/link";

/*
  코딩쏙 Hero — Lottie Flower Letters
  Six letters (C, O, D, I, N, G) with Lottie flowers on stems
  nodcoding.com style
*/

const LETTERS = [
    { key: "c", lottie: "/lottie/home-hero-c.json", flowerWidth: 299, flowerHeight: 285, stemWidth: 236, stemHeight: 400 },
    { key: "o", lottie: "/lottie/home-hero-o.json", flowerWidth: 289, flowerHeight: 288, stemWidth: 287, stemHeight: 360 },
    { key: "d", lottie: "/lottie/home-hero-d.json", flowerWidth: 288, flowerHeight: 288, stemWidth: 231, stemHeight: 390 },
    { key: "i", lottie: "/lottie/home-hero-i.json", flowerWidth: 83, flowerHeight: 284, stemWidth: 82, stemHeight: 400 },
    { key: "n", lottie: "/lottie/home-hero-n.json", flowerWidth: 411, flowerHeight: 402, stemWidth: 231, stemHeight: 360 },
    { key: "g", lottie: "/lottie/home-hero-g.json", flowerWidth: 284, flowerHeight: 355, stemWidth: 284, stemHeight: 420 },
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
            {/* ── Flower Letters ── */}
            <div
                className="b__letters js-letters"
                style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "center",
                    gap: 0,
                    padding: "20px 20px 0",
                    position: "relative",
                    zIndex: 2,
                    width: "100%",
                    maxWidth: 1400,
                }}
            >
                {LETTERS.map((l, i) => (
                    <FlowerLetter
                        key={l.key}
                        lottieFile={l.lottie}
                        flowerWidth={l.flowerWidth}
                        flowerHeight={l.flowerHeight}
                        stemWidth={l.stemWidth}
                        stemHeight={l.stemHeight}
                        index={i}
                    />
                ))}
            </div>

            {/* ── s__content — heading + description ── */}
            <div className="s__content" style={{ width: "100%" }}>
                <div className="u-container">
                    <h1 className="s__title s__title--lg t-h-xs">
                        <motion.span
                            className="s__title__main"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            코딩쏙
                        </motion.span>

                        <motion.span
                            className="s__title__secondary"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            대전 C·Python 코딩 전문 학원
                        </motion.span>
                    </h1>

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

            {/* ── CTA Buttons ── */}
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
                <Link href="#contact" className="btn-pill btn-pill--primary">
                    무료 상담 예약
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <Link href="tel:010-7566-7229" className="btn-pill btn-pill--secondary">
                    전화 문의
                </Link>
            </motion.div>

            {/* ── .b__render — SVG background shape ── */}
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
