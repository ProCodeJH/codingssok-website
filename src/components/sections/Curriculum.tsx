"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

/*
  커리큘럼 인터랙티브 타임라인
  수직 타임라인 + 확장형 카드 + SVG 아이콘 + 3D 효과
*/

/* ── Custom SVG Icons for each step ── */
function MathIcon({ color }: { color: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5" />
            <path d="M7 8h4M9 6v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 16h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14.5 7.5l3 3M17.5 7.5l-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 15h0M17 15h0M16 14v0M16 16v0" stroke={color} strokeWidth="2" strokeLinecap="round" />
        </svg>
    );
}

function CodeIcon({ color }: { color: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <polyline points="16 18 22 12 16 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <polyline points="8 6 2 12 8 18" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="14" y1="4" x2="10" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function HardwareIcon({ color }: { color: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="1.5" />
            <rect x="8" y="8" width="8" height="8" rx="1" stroke={color} strokeWidth="1.5" />
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93L6.34 6.34M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function ProjectIcon({ color }: { color: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" stroke={color} strokeWidth="1.5" />
        </svg>
    );
}

function CertIcon({ color }: { color: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="10" r="6" stroke={color} strokeWidth="1.5" />
            <path d="M12 16v6" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M9 19l3 3 3-3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M9 8l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

const stepIcons = [MathIcon, CodeIcon, HardwareIcon, ProjectIcon, CertIcon];

const tracks = [
    {
        id: "thinking-math",
        step: 1,
        label: "STEP 1",
        title: "사고력 수학",
        desc: "코딩으로 수학 개념을 직접 구현하며 문제해결의 원리를 깨우칩니다.",
        details: "수학은 코딩의 기초 체력. 수학적 논리를 직접 코드로 구현하며 진짜 이해하는 수학을 배웁니다.",
        target: "초등 1~4학년",
        format: "주 2회 / 90분",
        skills: ["연산 자동화", "패턴 인식", "문제 분해"],
        color: "#818CF8",
    },
    {
        id: "software",
        step: 2,
        label: "STEP 2",
        title: "소프트웨어",
        desc: "블록코딩부터 파이썬까지, 논리적 사고의 기초 체력을 기릅니다.",
        details: "Scratch로 시작해 Python, C까지. 단계별 사다리를 올라가며 자신감과 실력을 동시에 키웁니다.",
        target: "초등 3학년 ~ 중등",
        format: "주 2회 / 90분",
        skills: ["파이썬 기초", "알고리즘", "자료구조"],
        color: "#4F46E5",
    },
    {
        id: "physical",
        step: 3,
        label: "STEP 3",
        title: "하드웨어",
        desc: "아두이노와 센서를 연결해 상상을 현실로 만드는 발명가 교육입니다.",
        details: "LED, 센서, 모터, 디스플레이까지. 디지털과 물리를 넘나들며 창작의 즐거움을 경험합니다.",
        target: "초등 3학년 이상",
        format: "주 1~2회 / 90분",
        skills: ["아두이노", "전자 회로", "IoT"],
        color: "#34D399",
    },
    {
        id: "project",
        step: 4,
        label: "STEP 4",
        title: "프로젝트 스튜디오",
        desc: "나만의 게임과 앱을 기획하고 완성하며 성취감을 맛봅니다.",
        details: "기획서 작성부터 개발, 발표까지. 실제 프로젝트 경험이 아이를 진정한 크리에이터로 성장시킵니다.",
        target: "전연령",
        format: "맞춤 일정",
        skills: ["앱 개발", "게임 제작", "UI 설계"],
        color: "#F59E0B",
    },
    {
        id: "cert",
        step: 5,
        label: "STEP 5",
        title: "자격증 트랙",
        desc: "컴활, 프로그래밍 기능사 등 목표를 세우고 달성하는 자신감.",
        details: "명확한 목표는 동기부여의 핵심. 검증된 자격증 취득으로 실력을 객관적으로 인정받습니다.",
        target: "중등 ~ 고등",
        format: "시험 일정 맞춤",
        skills: ["COS-Pro", "PCCE", "KOI"],
        color: "#FB923C",
    },
];

function TimelineCard({ t, i, isInView }: { t: typeof tracks[0]; i: number; isInView: boolean }) {
    const [expanded, setExpanded] = useState(false);
    const IconComp = stepIcons[i];

    return (
        <motion.div
            initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", alignItems: "flex-start", gap: 24, position: "relative" }}
        >
            {/* ── Vertical Line + Step Circle ── */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: 48 }}>
                <motion.div
                    animate={isInView ? { scale: [0.8, 1.1, 1] } : {}}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: t.color, color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 800,
                        zIndex: 2, position: "relative",
                        boxShadow: `0 4px 16px ${t.color}44`,
                    }}
                >
                    {t.step}
                </motion.div>
                {i < tracks.length - 1 && (
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ delay: i * 0.12 + 0.2, duration: 0.5 }}
                        style={{
                            width: 2, height: 80,
                            background: `linear-gradient(${t.color}, ${tracks[i + 1]?.color || t.color})`,
                            transformOrigin: "top center",
                            opacity: 0.3,
                        }}
                    />
                )}
            </div>

            {/* ── Card ── */}
            <motion.div
                onClick={() => setExpanded(!expanded)}
                whileHover={{ y: -4, boxShadow: `0 12px 32px ${t.color}15` }}
                style={{
                    flex: 1, background: "#fff", borderRadius: 16,
                    padding: "24px 28px", border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer", transition: "all 0.3s ease",
                    marginBottom: 0,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: `${t.color}12`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                        <IconComp color={t.color} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 11, color: t.color, fontWeight: 700, letterSpacing: "0.1em" }}>{t.label}</span>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e1b4b", marginTop: 2 }}>{t.title}</h3>
                    </div>
                    <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        style={{ fontSize: 14, color: "#94a3b8", transition: "transform 0.2s" }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </motion.span>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 0 }}>{t.desc}</p>

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: "hidden" }}
                        >
                            <div style={{ paddingTop: 16, borderTop: "1px solid #f1f5f9", marginTop: 16 }}>
                                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, marginBottom: 16 }}>{t.details}</p>
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                                    {t.skills.map((skill) => (
                                        <span key={skill} style={{
                                            padding: "4px 12px", borderRadius: 10, fontSize: 11, fontWeight: 600,
                                            background: `${t.color}10`, color: t.color, border: `1px solid ${t.color}20`,
                                        }}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                                <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#94a3b8" }}>
                                    <span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: "middle", marginRight: 4 }}>
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                        </svg>
                                        {t.format}
                                    </span>
                                    <span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ verticalAlign: "middle", marginRight: 4 }}>
                                            <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                            <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                        {t.target}
                                    </span>
                                </div>
                                <Link href="/trial" style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    marginTop: 16, padding: "8px 16px", borderRadius: 10,
                                    background: t.color, color: "#fff", fontSize: 12, fontWeight: 700,
                                    textDecoration: "none", boxShadow: `0 4px 12px ${t.color}30`,
                                }}>
                                    무료 체험 신청
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                                        <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
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
            style={{ padding: "var(--section-spacing) 0", background: "var(--color-beige)" }}
        >
            <div className="container-nod">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 60, textAlign: "center" }}
                >
                    <p style={{
                        fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-1)",
                        fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em",
                    }}>
                        Curriculum
                    </p>
                    <h2 style={{
                        fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))",
                        fontWeight: 800, color: "var(--color-black)", lineHeight: 1.1, letterSpacing: "-0.03em",
                    }}>
                        5단계 성장 로드맵
                    </h2>
                    <p style={{
                        fontSize: "var(--font-size-t-md)", color: "var(--color-grey)",
                        marginTop: 16, maxWidth: 500, margin: "16px auto 0",
                    }}>
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
