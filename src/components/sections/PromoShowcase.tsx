"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/*
  PromoShowcase — 코딩쏙 프로모 이미지 3종 배치
  Hero banner (kid+brain) : 대형 배너
  Laptop promo            : 중간 카드
  Chalkboard kid          : 중간 카드
*/

export default function PromoShowcase() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="promo-showcase"
            style={{
                padding: "clamp(60px, 10vw, 120px) 0",
                background: "linear-gradient(180deg, #fff 0%, #F8FAFF 30%, #EEF2FF 70%, #fff 100%)",
                overflow: "hidden",
            }}
        >
            <div className="u-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

                {/* ── Section Header ── */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: "center", marginBottom: 56 }}
                >
                    <span style={{
                        display: "inline-block", padding: "6px 18px", borderRadius: 20,
                        background: "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
                        color: "#4F46E5", fontSize: 13, fontWeight: 700,
                        letterSpacing: "0.05em", marginBottom: 16,
                    }}>
                        WHY 코딩쏙?
                    </span>
                    <h2 style={{
                        fontSize: "clamp(28px, 4vw, 42px)",
                        fontWeight: 800,
                        color: "#1e1b4b",
                        letterSpacing: "-0.03em",
                        lineHeight: 1.3,
                        margin: 0,
                    }}>
                        코딩이 우리 아이 머리속으로 <span style={{ color: "#4F46E5" }}>쏙!</span>
                    </h2>
                </motion.div>

                {/* ── Hero Banner — Full Width ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.96 }}
                    animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        borderRadius: 24,
                        overflow: "hidden",
                        marginBottom: 24,
                        position: "relative",
                        boxShadow: "0 20px 60px rgba(79, 70, 229, 0.12), 0 0 0 1px rgba(79, 70, 229, 0.06)",
                    }}
                >
                    <Image
                        src="/images/promo/hero-kid-brain.png"
                        alt="코딩쏙 - 코딩이 우리 아이 머리속으로 쏙!"
                        width={1200}
                        height={1200}
                        style={{
                            width: "100%",
                            height: "auto",
                            display: "block",
                            maxHeight: 500,
                            objectFit: "cover",
                            objectPosition: "center top",
                        }}
                    />
                    {/* Subtle gradient overlay for blending */}
                    <div style={{
                        position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                        background: "linear-gradient(to top, rgba(238,242,255,0.8), transparent)",
                        pointerEvents: "none",
                    }} />
                </motion.div>

                {/* ── Two-Column Cards ── */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
                    gap: 24,
                }}>

                    {/* Card 1: Laptop Promo — "아이들에게 가장 쉬운 첫 코딩" */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, x: -20 }}
                        animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                        transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            borderRadius: 20,
                            overflow: "hidden",
                            position: "relative",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
                            background: "#fff",
                        }}
                    >
                        <Image
                            src="/images/promo/promo-first-coding.jpg"
                            alt="아이들에게 가장 쉬운 첫 코딩 - 마스터즈코딩학원"
                            width={800}
                            height={800}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                minHeight: 320,
                            }}
                        />
                        {/* CTA Overlay */}
                        <Link href="#contact" style={{ textDecoration: "none" }}>
                            <div style={{
                                position: "absolute", bottom: 0, left: 0, right: 0,
                                padding: "32px 24px 24px",
                                background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                            }}>
                                <motion.div
                                    whileHover={{ x: 6 }}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: 8,
                                        padding: "10px 20px", borderRadius: 12,
                                        background: "rgba(255,255,255,0.95)",
                                        color: "#1e1b4b", fontSize: 14, fontWeight: 700,
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    무료 상담 신청하기 →
                                </motion.div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Card 2: Chalkboard Kid */}
                    <motion.div
                        initial={{ opacity: 0, y: 30, x: 20 }}
                        animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
                        transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            borderRadius: 20,
                            overflow: "hidden",
                            position: "relative",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
                            background: "#fff",
                        }}
                    >
                        <Image
                            src="/images/promo/kid-chalkboard.jpg"
                            alt="코딩쏙학원 - Python, C언어, 알고리즘 수업"
                            width={1024}
                            height={682}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                minHeight: 320,
                            }}
                        />
                        {/* CTA Overlay */}
                        <Link href="/trial" style={{ textDecoration: "none" }}>
                            <div style={{
                                position: "absolute", bottom: 0, left: 0, right: 0,
                                padding: "32px 24px 24px",
                                background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)",
                            }}>
                                <motion.div
                                    whileHover={{ x: 6 }}
                                    style={{
                                        display: "inline-flex", alignItems: "center", gap: 8,
                                        padding: "10px 20px", borderRadius: 12,
                                        background: "rgba(255,255,255,0.95)",
                                        color: "#1e1b4b", fontSize: 14, fontWeight: 700,
                                        boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                                    }}
                                >
                                    🧪 무료 체험 시작 →
                                </motion.div>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
