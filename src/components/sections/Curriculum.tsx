"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

/*
  Program — 5트랙 아키텍처
  "아이마다 잘하는 영역은 다릅니다. 우리 아이에게 맞는 옷을 골라주세요."
*/

const tracks = [
    {
        id: "thinking-math",
        label: "THINKING MATH",
        title: "사고력 수학",
        desc: "코딩으로 수학 개념을 직접 구현하며 문제해결의 원리를 깨우칩니다.",
        target: "초등 1~6학년",
        format: "주 2회 / 90분",
        color: "var(--color-brand-5)",
        icon: "🧮",
    },
    {
        id: "physical",
        label: "PHYSICAL TRACK",
        title: "하드웨어",
        desc: "아두이노와 센서를 연결해 상상을 현실로 만드는 발명가 교육입니다.",
        target: "초등 3학년 ~ 중등",
        format: "주 2회 / 90분",
        color: "var(--color-brand-4)",
        icon: "🔧",
    },
    {
        id: "software",
        label: "SOFTWARE TRACK",
        title: "소프트웨어",
        desc: "블록코딩부터 파이썬까지, 논리적 사고의 기초 체력을 기릅니다.",
        target: "초등 ~ 고등",
        format: "주 2회 / 90분",
        color: "var(--color-brand-1)",
        icon: "💻",
    },
    {
        id: "project",
        label: "PROJECT TRACK",
        title: "스튜디오 방식",
        desc: "나만의 게임과 앱을 기획하고 완성하며 성취감을 맛봅니다.",
        target: "전연령",
        format: "맞춤 일정",
        color: "var(--color-brand-3)",
        icon: "🎮",
    },
    {
        id: "red",
        label: "RED TRACK",
        title: "자격증",
        desc: "컴활, 프로그래밍 기능사 등 스스로 목표를 세우고 달성하는 자신감을 얻습니다.",
        target: "고등 ~ 대학생",
        format: "시험 일정 맞춤",
        color: "var(--color-brand-6)",
        icon: "📜",
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
                        Program
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                        5트랙 교육 아키텍처
                    </h2>
                    <p style={{ fontSize: "var(--font-size-t-md)", color: "var(--color-grey)", marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>
                        아이마다 잘하는 영역은 다릅니다.<br />우리 아이에게 맞는 옷을 골라주세요.
                    </p>
                </motion.div>

                {/* 5 Track cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {tracks.map((t, i) => (
                        <motion.div
                            key={t.id}
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
                                    borderRadius: i === 0 ? "16px 16px 0 0" : i === tracks.length - 1 ? "0 0 16px 16px" : 0,
                                    textDecoration: "none",
                                    transition: "background 0.3s var(--ease-nod)",
                                    cursor: "pointer",
                                }}
                                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-beige-dark)"; }}
                                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--color-white)"; }}
                            >
                                {/* Left: icon + label + title */}
                                <div style={{ minWidth: 180, display: "flex", alignItems: "center", gap: 16 }}>
                                    <span style={{ fontSize: 32 }}>{t.icon}</span>
                                    <div>
                                        <span style={{ fontSize: 11, color: t.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                                            {t.label}
                                        </span>
                                        <h3 style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", fontWeight: 600, color: "var(--color-black)", marginTop: 4 }}>
                                            {t.title}
                                        </h3>
                                    </div>
                                </div>

                                {/* Center: desc + meta */}
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    <p style={{ fontSize: 14, color: "var(--color-grey)", lineHeight: 1.5 }}>
                                        {t.desc}
                                    </p>
                                    <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                                        <div>
                                            <span style={{ fontSize: 11, color: "var(--color-grey-1)" }}>대상</span>
                                            <p style={{ fontSize: 13, color: "var(--color-black)", fontWeight: 500 }}>{t.target}</p>
                                        </div>
                                        <div>
                                            <span style={{ fontSize: 11, color: "var(--color-grey-1)" }}>수업</span>
                                            <p style={{ fontSize: 13, color: "var(--color-black)", fontWeight: 500 }}>{t.format}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right: Arrow */}
                                <div style={{ display: "flex", alignItems: "center", gap: 8, color: t.color, fontWeight: 600, fontSize: 14, whiteSpace: "nowrap" }}>
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
