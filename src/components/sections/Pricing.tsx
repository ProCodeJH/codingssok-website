"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/*
  Pricing section — 코딩쏙 수강료
  nodcoding style: clean grid, left-aligned header, card per plan
*/

const plans = [
    {
        name: "기초 과정",
        price: "월 20만원",
        period: "주 2회 · 90분",
        features: ["C언어 or Python 기초", "1:1 코드 리뷰", "소수 정예 (최대 6명)", "자체 교재 제공", "학습 리포트 제공"],
        color: "var(--color-brand-5)",
        popular: false,
    },
    {
        name: "심화 과정",
        price: "월 28만원",
        period: "주 2회 · 120분",
        features: ["알고리즘·정보올림피아드", "실전 문제 풀이 위주", "대회 출전 준비", "모의고사 및 해설", "개인 멘토링 포함"],
        color: "var(--color-brand-1)",
        popular: true,
    },
    {
        name: "자격증 과정",
        price: "월 25만원",
        period: "주 3회 · 90분",
        features: ["정보처리기능사 완벽 대비", "이론 + 실기 통합", "기출문제 정복", "모의시험 실시", "합격 보장 프로그램"],
        color: "var(--color-brand-4)",
        popular: false,
    },
];

export default function Pricing() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="pricing"
            style={{
                padding: "var(--section-spacing) 0",
                background: "var(--color-beige)",
            }}
        >
            <div className="container-nod">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 60, textAlign: "center" }}
                >
                    <p style={{ fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-1)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Pricing
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                        수강료 안내
                    </h2>
                </motion.div>

                {/* Price cards */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
                    {plans.map((p, i) => (
                        <motion.div
                            key={p.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.12 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                padding: 40,
                                background: p.popular ? "var(--color-black)" : "var(--color-white)",
                                borderRadius: 20,
                                display: "flex",
                                flexDirection: "column",
                                position: "relative",
                                overflow: "hidden",
                            }}
                        >
                            {/* Popular badge */}
                            {p.popular && (
                                <div style={{
                                    position: "absolute",
                                    top: 16,
                                    right: 16,
                                    padding: "4px 12px",
                                    background: "var(--color-brand-1)",
                                    borderRadius: 999,
                                    fontSize: 12,
                                    fontWeight: 600,
                                    color: "var(--color-white)",
                                }}>
                                    인기
                                </div>
                            )}

                            {/* Top border line */}
                            <div style={{ width: 40, height: 3, background: p.color, borderRadius: 2, marginBottom: 24 }} />

                            <h3 style={{ fontSize: "var(--font-size-t-xl)", fontWeight: 600, color: p.popular ? "var(--color-white)" : "var(--color-black)", marginBottom: 8 }}>
                                {p.name}
                            </h3>
                            <p style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 700, color: p.popular ? "var(--color-brand-1)" : "var(--color-black)", marginBottom: 4 }}>
                                {p.price}
                            </p>
                            <p style={{ fontSize: 14, color: p.popular ? "var(--color-grey-1)" : "var(--color-grey)", marginBottom: 32 }}>
                                {p.period}
                            </p>

                            {/* Features */}
                            <ul style={{ listStyle: "none", margin: 0, padding: 0, flex: 1 }}>
                                {p.features.map((f, j) => (
                                    <li
                                        key={j}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 10,
                                            padding: "8px 0",
                                            fontSize: 15,
                                            color: p.popular ? "var(--color-grey-2)" : "var(--color-grey)",
                                            borderBottom: `1px solid ${p.popular ? "rgba(255,255,255,0.08)" : "var(--color-grey-3)"}`,
                                        }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                            <path d="M2 7l3.5 3.5L12 4" stroke={p.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <Link
                                href="#contact"
                                className="btn-pill"
                                style={{
                                    marginTop: 32,
                                    justifyContent: "center",
                                    background: p.popular ? "var(--color-brand-1)" : "var(--color-black)",
                                    color: "var(--color-white)",
                                }}
                            >
                                상담 예약
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
