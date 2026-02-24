"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";

/*
  커리큘럼 5단계 성장 로드맵 — Ultra-Premium
  학습 대시보드 코스 데이터와 연동
  수직 타임라인 + 확장형 카드 + SVG + 고급 애니메이션
*/

/* ── Custom SVG Icons ── */
function MathIcon({ color }: { color: string }) {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5" />
            <path d="M7 8h4M9 6v4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 16h4" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14.5 7.5l3 3M17.5 7.5l-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="16" cy="16" r="1" fill={color} />
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

/* ── Course badges that link to dashboard ── */
interface CourseBadge {
    name: string;
    id: string;
    color: string;
    units?: number;
    status: "active" | "coming";
}

const tracks = [
    {
        id: "thinking-math",
        step: 1,
        label: "STEP 1",
        title: "사고력 수학",
        headline: "코딩으로 수학 개념을 직접 구현하며 문제해결의 원리를 깨우칩니다.",
        details: "수학은 코딩의 기초 체력입니다. 연산, 패턴, 분류 등 수학적 논리를 직접 코드로 구현하며 '왜 이게 필요한지'를 체감합니다. 단순 암기가 아닌 원리 학습을 통해 학교 수학 성적까지 자연스럽게 올라갑니다.",
        target: "초등 1~4학년",
        format: "주 2회 / 90분",
        capacity: "1:4 소수정예",
        skills: ["연산 자동화", "패턴 인식", "문제 분해", "수열 탐구", "도형 코딩"],
        courses: [
            { name: "코딩 기초", id: "1", color: "#10b981", units: 0, status: "coming" as const },
        ],
        progression: [
            { week: "1~4주", content: "숫자와 연산 (덧셈·뺄셈 자동화)" },
            { week: "5~8주", content: "패턴과 반복 (별찍기, 피보나치)" },
            { week: "9~12주", content: "분류와 정렬 (나만의 정렬 알고리즘)" },
            { week: "13~16주", content: "도형과 좌표 (거북이 그래픽)" },
        ],
        color: "#818CF8",
    },
    {
        id: "software",
        step: 2,
        label: "STEP 2",
        title: "소프트웨어",
        headline: "블록코딩부터 파이썬, C언어까지. 논리적 사고의 기초 체력을 기릅니다.",
        details: "Scratch 블록코딩으로 프로그래밍 사고력을 기른 후, 파이썬으로 텍스트 코딩에 진입합니다. 이후 C언어까지 체계적으로 학습하며, 변수·조건·반복·함수의 핵심 4대 개념을 완벽히 마스터합니다.",
        target: "초등 3학년 ~ 중등",
        format: "주 2회 / 90분",
        capacity: "1:6 밀착 코칭",
        skills: ["파이썬 문법", "C언어 기초", "자료구조", "알고리즘 설계", "디버깅"],
        courses: [
            { name: "파이썬", id: "3", color: "#3b82f6", units: 0, status: "coming" as const },
            { name: "C언어", id: "4", color: "#f59e0b", units: 85, status: "active" as const },
        ],
        progression: [
            { week: "1~4주", content: "변수, 입출력, 기본 자료형" },
            { week: "5~8주", content: "조건문, 반복문 마스터" },
            { week: "9~16주", content: "함수, 배열, 문자열 처리" },
            { week: "17~24주", content: "포인터, 구조체, 파일 I/O" },
        ],
        color: "#4F46E5",
    },
    {
        id: "physical",
        step: 3,
        label: "STEP 3",
        title: "하드웨어",
        headline: "아두이노와 센서를 연결해 상상을 현실로 만드는 발명가 교육입니다.",
        details: "LED 깜빡이기부터 시작해 온습도 센서, 초음파 거리측정, 서보모터 제어까지. 코드가 실제 장치를 움직이는 경험은 아이에게 강력한 동기부여가 됩니다. IoT 미니 프로젝트로 마무리합니다.",
        target: "초등 3학년 이상",
        format: "주 1~2회 / 90분",
        capacity: "1:4 실습 중심",
        skills: ["아두이노", "전자 회로", "센서 활용", "IoT", "3D 프린팅"],
        courses: [
            { name: "피지컬 컴퓨팅", id: "2", color: "#f59e0b", units: 0, status: "coming" as const },
        ],
        progression: [
            { week: "1~3주", content: "LED, 버저 — 기본 출력 제어" },
            { week: "4~6주", content: "센서 입력 (온도, 거리, 빛)" },
            { week: "7~9주", content: "모터, 서보 — 움직이는 장치" },
            { week: "10~12주", content: "IoT 미니 프로젝트 완성" },
        ],
        color: "#34D399",
    },
    {
        id: "project",
        step: 4,
        label: "STEP 4",
        title: "프로젝트 스튜디오",
        headline: "나만의 게임과 앱을 기획하고 완성하며 성취감을 맛봅니다.",
        details: "기획서 작성 → 와이어프레임 → 개발 → 테스트 → 발표. 실제 소프트웨어 개발 프로세스를 경험합니다. 완성된 프로젝트는 포트폴리오로 관리되며, 학교 발표나 대회 출품에 직접 활용할 수 있습니다.",
        target: "전연령",
        format: "맞춤 일정",
        capacity: "1:2~4 프로젝트 팀",
        skills: ["앱 개발", "게임 제작", "UI 설계", "발표 스킬", "팀워크"],
        courses: [] as CourseBadge[],
        progression: [
            { week: "1~2주", content: "아이디어 브레인스토밍 & 기획서" },
            { week: "3~4주", content: "와이어프레임 & 디자인" },
            { week: "5~8주", content: "개발 스프린트 (MVP 제작)" },
            { week: "9~10주", content: "테스트, 개선, 발표 준비" },
        ],
        color: "#F59E0B",
    },
    {
        id: "cert",
        step: 5,
        label: "STEP 5",
        title: "자격증 트랙",
        headline: "컴활, 프로그래밍 기능사, COS-Pro 등 목표를 세우고 달성하는 자신감.",
        details: "명확한 목표는 동기부여의 핵심입니다. 시험 유형별 집중 학습과 실전 모의고사를 통해 합격률을 극대화합니다. 초등학생도 도전 가능한 COS-Pro부터 정보처리기능사까지 단계별 자격증 로드맵을 제공합니다.",
        target: "중등 ~ 고등",
        format: "시험 일정 맞춤",
        capacity: "1:4 집중 코칭",
        skills: ["COS-Pro", "PCCE", "KOI", "정보처리기능사", "컴활"],
        courses: [
            { name: "CosPro", id: "5", color: "#ec4899", units: 0, status: "coming" as const },
            { name: "프로그래밍 대회", id: "6", color: "#f97316", units: 0, status: "coming" as const },
            { name: "자격증", id: "7", color: "#8b5cf6", units: 0, status: "coming" as const },
        ],
        progression: [
            { week: "1~4주", content: "기출 분석 & 핵심 개념 정리" },
            { week: "5~8주", content: "유형별 문제 풀이 특훈" },
            { week: "9~11주", content: "실전 모의고사 3회 이상" },
            { week: "시험 직전", content: "취약 단원 집중 보완" },
        ],
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
                    animate={isInView ? { scale: [0.6, 1.15, 1] } : {}}
                    transition={{ delay: i * 0.12, duration: 0.6, type: "spring" }}
                    style={{
                        width: 48, height: 48, borderRadius: "50%",
                        background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`,
                        color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 800,
                        zIndex: 2, position: "relative",
                        boxShadow: `0 4px 20px ${t.color}44`,
                    }}
                >
                    {/* Pulse ring */}
                    <motion.div
                        animate={isInView ? { scale: [1, 1.6, 1.6], opacity: [0.5, 0, 0] } : {}}
                        transition={{ delay: i * 0.12 + 0.3, duration: 1.5, repeat: 2 }}
                        style={{
                            position: "absolute", inset: 0, borderRadius: "50%",
                            border: `2px solid ${t.color}`,
                        }}
                    />
                    {t.step}
                </motion.div>
                {i < tracks.length - 1 && (
                    <motion.div
                        initial={{ scaleY: 0 }}
                        animate={isInView ? { scaleY: 1 } : {}}
                        transition={{ delay: i * 0.12 + 0.2, duration: 0.6, ease: "easeOut" }}
                        style={{
                            width: 2, height: 80,
                            background: `linear-gradient(${t.color}60, ${tracks[i + 1]?.color || t.color}60)`,
                            transformOrigin: "top center",
                        }}
                    />
                )}
            </div>

            {/* ── Card ── */}
            <motion.div
                onClick={() => setExpanded(!expanded)}
                whileHover={{ y: -4, boxShadow: `0 16px 40px ${t.color}12` }}
                style={{
                    flex: 1, background: "#fff", borderRadius: 16,
                    padding: "24px 28px", border: "1px solid #e2e8f0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    cursor: "pointer", transition: "all 0.3s ease",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                    <motion.div
                        animate={isInView ? { rotate: [0, -8, 8, 0] } : {}}
                        transition={{ delay: i * 0.12 + 0.3, duration: 0.6 }}
                        style={{
                            width: 40, height: 40, borderRadius: 12,
                            background: `${t.color}10`,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                    >
                        <IconComp color={t.color} />
                    </motion.div>
                    <div style={{ flex: 1 }}>
                        <span style={{ fontSize: 11, color: t.color, fontWeight: 700, letterSpacing: "0.1em" }}>{t.label}</span>
                        <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1e1b4b", marginTop: 2 }}>{t.title}</h3>
                    </div>
                    {/* Info badges */}
                    <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <span style={{
                            padding: "3px 8px", borderRadius: 6,
                            background: "#f1f5f9", fontSize: 10, fontWeight: 700, color: "#64748b",
                        }}>
                            {t.capacity}
                        </span>
                    </div>
                    <motion.span
                        animate={{ rotate: expanded ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        style={{ color: "#94a3b8", flexShrink: 0 }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </motion.span>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, marginBottom: 0 }}>{t.headline}</p>

                <AnimatePresence>
                    {expanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            style={{ overflow: "hidden" }}
                        >
                            <div style={{ paddingTop: 16, borderTop: "1px solid #f1f5f9", marginTop: 16 }}>
                                {/* Description */}
                                <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7, marginBottom: 16 }}>{t.details}</p>

                                {/* Meta info row */}
                                <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#94a3b8", marginBottom: 16 }}>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                        {t.format}
                                    </span>
                                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5" /></svg>
                                        {t.target}
                                    </span>
                                </div>

                                {/* Skills */}
                                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
                                    {t.skills.map((skill) => (
                                        <motion.span
                                            key={skill}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                            style={{
                                                padding: "4px 12px", borderRadius: 10, fontSize: 11, fontWeight: 600,
                                                background: `${t.color}10`, color: t.color, border: `1px solid ${t.color}20`,
                                            }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>

                                {/* Weekly progression timeline */}
                                <div style={{
                                    background: "#f8fafc", borderRadius: 12, padding: 16, marginBottom: 16,
                                }}>
                                    <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                        진행 커리큘럼
                                    </p>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                        {t.progression.map((p, pi) => (
                                            <motion.div
                                                key={pi}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: pi * 0.06, duration: 0.3 }}
                                                style={{
                                                    display: "flex", alignItems: "center", gap: 10,
                                                }}
                                            >
                                                <div style={{
                                                    width: 6, height: 6, borderRadius: "50%",
                                                    background: t.color, flexShrink: 0,
                                                    boxShadow: `0 0 6px ${t.color}60`,
                                                }} />
                                                <span style={{ fontSize: 11, fontWeight: 700, color: t.color, minWidth: 56, flexShrink: 0 }}>
                                                    {p.week}
                                                </span>
                                                <span style={{ fontSize: 12, color: "#475569" }}>
                                                    {p.content}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Linked dashboard courses */}
                                {t.courses.length > 0 && (
                                    <div style={{ marginBottom: 16 }}>
                                        <p style={{ fontSize: 11, fontWeight: 700, color: "#94a3b8", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                            학습 대시보드 코스
                                        </p>
                                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                            {t.courses.map((c) => (
                                                <Link key={c.id} href={`/dashboard/learning/${c.id}`} onClick={(e) => e.stopPropagation()} style={{
                                                    display: "inline-flex", alignItems: "center", gap: 6,
                                                    padding: "6px 12px", borderRadius: 8,
                                                    background: `${c.color}10`, border: `1px solid ${c.color}20`,
                                                    fontSize: 12, fontWeight: 600, color: c.color,
                                                    textDecoration: "none",
                                                }}>
                                                    <div style={{
                                                        width: 8, height: 8, borderRadius: "50%",
                                                        background: c.status === "active"
                                                            ? `linear-gradient(135deg, ${c.color}, ${c.color}cc)`
                                                            : "#cbd5e1",
                                                    }} />
                                                    {c.name}
                                                    {(c.units ?? 0) > 0 && (
                                                        <span style={{ fontSize: 10, opacity: 0.7 }}>({c.units}개 유닛)</span>
                                                    )}
                                                    {c.status === "coming" && (
                                                        <span style={{ fontSize: 9, padding: "1px 5px", borderRadius: 4, background: "#f1f5f9", color: "#94a3b8" }}>준비 중</span>
                                                    )}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* CTA Button */}
                                <Link href="/trial" onClick={(e) => e.stopPropagation()} style={{
                                    display: "inline-flex", alignItems: "center", gap: 6,
                                    padding: "10px 20px", borderRadius: 10,
                                    background: `linear-gradient(135deg, ${t.color}, ${t.color}cc)`,
                                    color: "#fff", fontSize: 13, fontWeight: 700,
                                    textDecoration: "none", boxShadow: `0 4px 16px ${t.color}30`,
                                    transition: "transform 0.2s",
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
                        marginTop: 16, maxWidth: 520, margin: "16px auto 0", lineHeight: 1.7,
                    }}>
                        아이의 단계에 맞춰 시작하세요.<br />각 단계를 클릭하면 자세한 커리큘럼, 진행 방식, 연결 코스를 확인할 수 있습니다.
                    </p>

                    {/* Quick stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{
                            display: "inline-flex", gap: 24, marginTop: 28,
                            padding: "14px 28px", borderRadius: 16,
                            background: "rgba(255,255,255,0.8)", backdropFilter: "blur(10px)",
                            border: "1px solid rgba(0,0,0,0.05)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
                        }}
                    >
                        {[
                            { value: "5", label: "성장 단계" },
                            { value: "7", label: "코스" },
                            { value: "85+", label: "학습 유닛" },
                            { value: "950+", label: "실습 문제" },
                        ].map((stat) => (
                            <div key={stat.label} style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 20, fontWeight: 800, color: "#4F46E5" }}>{stat.value}</div>
                                <div style={{ fontSize: 10, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Timeline */}
                <div style={{ maxWidth: 680, margin: "0 auto" }}>
                    {tracks.map((t, i) => (
                        <TimelineCard key={t.id} t={t} i={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
