"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import FlowerLetter from "@/components/ui/FlowerLetter";
import Link from "next/link";

/*
  코딩쏙 Hero — 브랜드 철학
  "우리 아이의 코딩은 틀린 것이 아니라, 나만의 답을 찾아가는 과정입니다."
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

            {/* ── 브랜드 철학 카피 ── */}
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
                            style={{ fontSize: "clamp(1rem, 2.5vw, 1.8rem)", lineHeight: 1.5, display: "block", marginTop: 16 }}
                        >
                            우리 아이의 코딩은 틀린 것이 아니라,<br />
                            나만의 답을 찾아가는 과정입니다.
                        </motion.span>
                    </h1>

                    <motion.div
                        className="s__text s__text--sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <p>정해진 기준에 아이를 맞추지 마세요. 코딩쏙은 스스로 문제를 정의하고 나만의 해결 기준을 만드는 <strong>&lsquo;진짜 교육&rsquo;</strong>을 지향합니다.</p>
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
                    flexWrap: "wrap",
                }}
            >
                <Link href="#contact" className="btn-pill btn-pill--primary">
                    🎯 우리 아이 코딩 시작점 30초 체크
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
                <Link href="tel:010-7566-7229" className="btn-pill btn-pill--secondary">
                    📞 전화 문의
                </Link>
            </motion.div>

            {/* ── SVG background shape ── */}
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
