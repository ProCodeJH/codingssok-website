"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

/*
  커리큘럼 인터랙티브 타임라인
  수직 타임라인 + 확장형 카드 + 단계 표시 인디케이터
*/

const tracks = [
    {
        id: "thinking-math",
        step: 1,
        label: "STEP 1",
        title: "사고력 수학",
        desc: "코딩으로 수학 개념을 직접 구현하며 문제해결의 원리를 깨우칩니다.",
        detail: "패턴 인식, 분해, 추상화 등 컴퓨팅 사고력의 핵심 요소를 수학 문제에 자연스럽게 녹여냅니다. 블록 코딩부터 시작해 자신감을 기릅니다.",
        target: "초등 1~3학년",
        format: "주 2회 / 90분",
        skills: ["논리적 사고", "패턴 인식", "블록 코딩"],
        color: "#818CF8",
        icon: "🧮",
    },
    {
        id: "software",
        step: 2,
        label: "STEP 2",
        title: "소프트웨어",
        desc: "블록코딩부터 파이썬까지, 논리적 사고의 기초 체력을 기릅니다.",
        detail: "스크래치에서 시작해 엔트리, 파이썬으로 점진적으로 전환합니다. 반복문, 조건문, 함수 등 프로그래밍의 기초를 탄탄히 다집니다.",
        target: "초등 3학년 ~ 중등",
        format: "주 2회 / 90분",
        skills: ["파이썬 기초", "알고리즘", "자료구조"],
        color: "#4F46E5",
        icon: "💻",
    },
    {
        id: "physical",
        step: 3,
        label: "STEP 3",
        title: "하드웨어",
        desc: "아두이노와 센서를 연결해 상상을 현실로 만드는 발명가 교육입니다.",
        detail: "LED, 서보모터, 초음파 센서 등을 활용해 실제로 동작하는 프로젝트를 만듭니다. 코딩과 공학의 만남으로 STEAM 사고력을 키웁니다.",
        target: "초등 3학년 ~ 중등",
        format: "주 2회 / 90분",
        skills: ["아두이노", "센서 공학", "C언어"],
        color: "#34D399",
        icon: "🔧",
    },
    {
        id: "project",
        step: 4,
        label: "STEP 4",
        title: "프로젝트 스튜디오",
        desc: "나만의 게임과 앱을 기획하고 완성하며 성취감을 맛봅니다.",
        detail: "기획 → 설계 → 구현 → 발표의 4단계 프로세스를 경험합니다. 팀 프로젝트를 통해 협업과 커뮤니케이션 능력도 함께 성장합니다.",
        target: "전연령",
        format: "맞춤 일정",
        skills: ["앱 개발", "게임 제작", "UI 설계"],
        color: "#F59E0B",
        icon: "🎮",
    },
    {
        id: "red",
        step: 5,
        label: "STEP 5",
        title: "자격증 트랙",
        desc: "컴활, 프로그래밍 기능사 등 목표를 세우고 달성하는 자신감.",
        detail: "COS, COS-Pro, PCCE, KOI 등 국내 인정 자격증과 대회를 체계적으로 준비합니다. 실전 모의고사와 해설 강의를 제공합니다.",
        target: "중등 ~ 고등",
        format: "시험 일정 맞춤",
        skills: ["COS-Pro", "PCCE", "KOI"],
        color: "#FB923C",
        icon: "📜",
    },
];

function TimelineCard({ t, i, isInView }: { t: typeof tracks[0]; i: number; isInView: boolean }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "flex-start", gap: 24, position: "relative" }}
        >
            {/* Timeline dot + line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 48 }}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.1 * i + 0.2, type: "spring", stiffness: 300 }}
                    style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: t.color, color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 800, zIndex: 2, position: "relative",
                        boxShadow: `0 4px 16px ${t.color}44`,
                    }}
                >
                    {t.step}
                </motion.div>
                {i < tracks.length - 1 && (
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ delay: 0.15 * i + 0.4, duration: 0.5 }}
                        style={{
                            width: 2, height: 80, background: `linear-gradient(${t.color}, ${tracks[i + 1].color})`,
                            transformOrigin: "top", opacity: 0.3,
                        }}
                    />
                )}
            </div>

            {/* Card */}
            <div
                onClick={() => setExpanded(!expanded)}
                style={{
                    flex: 1, background: "#fff", borderRadius: 16, padding: "24px 28px",
                    border: `1px solid ${expanded ? t.color + '33' : '#e2e8f0'}`,
                    boxShadow: expanded ? `0 8px 32px ${t.color}15` : "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer", transition: "all 0.3s ease",
                    marginBottom: i < tracks.length - 1 ? 0 : 0,
                }}
            >
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 28 }}>{t.icon}</span>
                    <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 11, color: t.color, fontWeight: 700, letterSpacing: "0.1em" }}>
                            {t.label}
                        </span>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e1b4b", marginTop: 2 }}>
                            {t.title}
                        </h3>
                    </div>
                    <span style={{
                        fontSize: 14, color: "#94a3b8", transition: "transform 0.2s",
                        transform: expanded ? "rotate(180deg)" : "none",
                    }}>▼</span>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: expanded ? 0 : 0 }}>
                    {t.desc}
                </p>

                {/* Expanded content */}
                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: "hidden" }}
                        >
                            <div style={{ borderTop: "1px solid #f1f5f9", marginTop: 16, paddingTop: 16 }}>
                                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, marginBottom: 16 }}>
                                    {t.detail}
                                </p>

                                {/* Skills pills */}
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                                    {t.skills.map(s => (
                                        <span key={s} style={{
                                            padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
                                            background: t.color + '15', color: t.color,
                                        }}>
                                            {s}
                                        </span>
                                    ))}
                                </div>

                                {/* Meta */}
                                <div style={{ display: "flex", gap: 24, fontSize: 12 }}>
                                    <div>
                                        <span style={{ color: "#94a3b8" }}>대상</span>
                                        <p style={{ color: "#1e1b4b", fontWeight: 600, marginTop: 2 }}>{t.target}</p>
                                    </div>
                                    <div>
                                        <span style={{ color: "#94a3b8" }}>수업</span>
                                        <p style={{ color: "#1e1b4b", fontWeight: 600, marginTop: 2 }}>{t.format}</p>
                                    </div>
                                </div>

                                <Link href="#contact" style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    marginTop: 16, padding: "8px 20px", borderRadius: 12,
                                    background: t.color, color: "#fff", fontSize: 12, fontWeight: 700,
                                    textDecoration: "none",
                                }}>
                                    상담 신청 →
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

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
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))", fontWeight: 800, color: "var(--color-black)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                        5단계 성장 로드맵
                    </h2>
                    <p style={{ fontSize: "var(--font-size-t-md)", color: "var(--color-grey)", marginTop: 16, maxWidth: 500, margin: "16px auto 0" }}>
                        아이의 단계에 맞춰 시작하세요.<br />각 단계를 클릭하면 자세한 내용을 볼 수 있습니다.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div style={{ maxWidth: 640, margin: "0 auto" }}>
                    {tracks.map((t, i) => (
                        <TimelineCard key={t.id} t={t} i={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
