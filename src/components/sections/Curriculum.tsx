"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/*
  nodcoding "Upcoming Bootcamps" → 코딩쏙 "커리큘럼"
  Course cards with hover reveal + "Apply" pill CTA
*/

const courses = [
    {
        id: "c-lang",
        label: "정규 과정",
        title: "C언어 기초·심화",
        period: "상시 모집",
        format: "주 2회 / 90분",
        target: "초등 5학년 ~ 중등",
        color: "var(--color-brand-5)",
    },
    {
        id: "python",
        label: "정규 과정",
        title: "Python 프로그래밍",
        period: "상시 모집",
        format: "주 2회 / 90분",
        target: "중등 ~ 고등",
        color: "var(--color-brand-4)",
    },
    {
        id: "algorithm",
        label: "심화 과정",
        title: "알고리즘·정보올림피아드",
        period: "상시 모집",
        format: "주 2회 / 120분",
        target: "중등 ~ 고등",
        color: "var(--color-brand-1)",
    },
    {
        id: "cert",
        label: "자격증 과정",
        title: "정보처리 자격증 취득",
        period: "시험 일정 맞춤",
        format: "주 3회 / 90분",
        target: "고등 ~ 대학생",
        color: "var(--color-brand-3)",
    },
    {
        id: "project",
        label: "프로젝트",
        title: "앱 개발·공모전 준비",
        period: "수시 모집",
        format: "맞춤 일정",
        target: "전연령",
        color: "var(--color-brand-6)",
    },
    {
        id: "ai",
        label: "특별 과정",
        title: "AI 기초·데이터 분석",
        period: "2026년 3월 개강",
        format: "주 2회 / 90분",
        target: "고등 ~ 성인",
        color: "var(--color-brand-8)",
    },
];

export default function Curriculum() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            id="curriculum"
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
                        Curriculum
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                        교육 과정
                    </h2>
                </motion.div>

                {/* Course cards — nodcoding bootcamp list style */}
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {courses.map((c, i) => (
                        <motion.div
                            key={c.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <Link
                                href="#contact"
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto 1fr auto",
                                    alignItems: "center",
                                    gap: 24,
                                    padding: "28px 32px",
                                    background: "var(--color-white)",
                                    borderRadius: i === 0 ? "16px 16px 0 0" : i === courses.length - 1 ? "0 0 16px 16px" : 0,
                                    textDecoration: "none",
                                    transition: "background 0.3s var(--ease-nod)",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-beige-dark)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-white)"; }}
                            >
                                {/* Left: label + title */}
                                <div style={{ minWidth: 120 }}>
                                    <span style={{ fontSize: 12, color: c.color, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                        {c.label}
                                    </span>
                                    <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 600, color: "var(--color-black)", marginTop: 4 }}>
                                        {c.title}
                                    </h3>
                                </div>

                                {/* Center: meta */}
                                <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
                                    <div>
                                        <span style={{ fontSize: 12, color: "var(--color-grey-1)" }}>일정</span>
                                        <p style={{ fontSize: 14, color: "var(--color-black)", fontWeight: 500 }}>{c.period}</p>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 12, color: "var(--color-grey-1)" }}>수업</span>
                                        <p style={{ fontSize: 14, color: "var(--color-black)", fontWeight: 500 }}>{c.format}</p>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 12, color: "var(--color-grey-1)" }}>대상</span>
                                        <p style={{ fontSize: 14, color: "var(--color-black)", fontWeight: 500 }}>{c.target}</p>
                                    </div>
                                </div>

                                {/* Right: Apply arrow */}
                                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-brand-1)", fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>
                                    상담
                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
