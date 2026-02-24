"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";

/*
  Why 코딩쏙 — 3-컬럼 프리미엄 피처 카드
  3D 틸트 호버 + SVG 아이콘 + 그라디언트 배경
*/

/* ── Custom SVG Icons ── */
function CalendarIcon({ color }: { color: string }) {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="4" width="18" height="18" rx="3" stroke={color} strokeWidth="1.5" fill="none" />
            <path d="M16 2v4M8 2v4M3 10h18" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <rect x="7" y="14" width="3" height="3" rx="0.5" fill={color} opacity="0.3" />
            <rect x="11" y="14" width="3" height="3" rx="0.5" fill={color} opacity="0.5" />
            <rect x="15" y="14" width="3" height="3" rx="0.5" fill={color} opacity="0.7" />
        </svg>
    );
}

function TimerIcon({ color }: { color: string }) {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="13" r="8" stroke={color} strokeWidth="1.5" fill="none" />
            <path d="M12 9v4l2.5 2.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10 2h4M12 2v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M20 7l-1.5 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

function CoachIcon({ color }: { color: string }) {
    return (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke={color} strokeWidth="1.5" fill="none" />
            <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M15 3c1.66 0 3 1.34 3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
            <path d="M9 3C7.34 3 6 4.34 6 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
    );
}

const reasons = [
    {
        number: "01",
        title: "월 5회/8회 시스템",
        desc: "한 달 4회는 진도 나가기 바쁩니다. 코딩쏙은 4번의 프로젝트와 1번의 '플러스 쏙(1:1 보완)'으로 배움을 완성합니다.",
        IconComponent: CalendarIcon,
        gradient: "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
        accentColor: "#4F46E5",
        statNum: "5",
        statLabel: "회 / 월",
        countTo: 5,
        countSuffix: "+",
    },
    {
        number: "02",
        title: "90분 몰입 수업",
        desc: "초등학생 집중력이 가장 높은 90분 수업. 더 자주, 더 즐겁게 만나며 코딩 습관을 만듭니다.",
        IconComponent: TimerIcon,
        gradient: "linear-gradient(135deg, #ECFDF5, #D1FAE5)",
        accentColor: "#34D399",
        statNum: "90",
        statLabel: "분 / 회",
        countTo: 90,
        countSuffix: "",
    },
    {
        number: "03",
        title: "1:6 소수 정예",
        desc: "선생님의 기준이 아닌 아이의 속도에 맞춘 밀착 코칭과 매주 발송되는 성장 리포트로 안심을 더합니다.",
        IconComponent: CoachIcon,
        gradient: "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
        accentColor: "#818CF8",
        statNum: "1:6",
        statLabel: "밀착 코칭",
        countTo: 0,
        countSuffix: "",
    },
];

/* ── CountUp hook ── */
function useCountUp(target: number, isInView: boolean, duration = 1600) {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isInView || target === 0) return;
        let start = 0;
        const step = (ts: number) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [isInView, target, duration]);
    return count;
}

function CountUpValue({ target, suffix, isInView }: { target: number; suffix: string; isInView: boolean }) {
    const count = useCountUp(target, isInView);
    return <>{target === 0 ? "1:6" : count}{suffix}</>;
}

function FeatureCard({ r, i, isInView }: { r: typeof reasons[0]; i: number; isInView: boolean }) {
    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setRotateX(-y * 10);
        setRotateY(x * 10);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setRotateX(0); setRotateY(0);
    }, []);

    const IconComp = r.IconComponent;

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 800 }}
        >
            <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    background: "#ffffff",
                    borderRadius: 16,
                    padding: "clamp(28px, 4vw, 40px)",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
                    transition: "box-shadow 0.4s",
                    cursor: "default",
                    transformStyle: "preserve-3d",
                    transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
                }}
            >
                {/* Top accent line */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 4,
                    background: `linear-gradient(90deg, ${r.accentColor}, ${r.accentColor}88)`,
                    borderRadius: "16px 16px 0 0",
                }} />

                {/* Number + Icon */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <span style={{ fontSize: 13, color: r.accentColor, fontWeight: 700, letterSpacing: "0.1em" }}>{r.number}</span>
                    <motion.div
                        animate={isInView ? { rotate: [0, -8, 8, 0] } : {}}
                        transition={{ delay: 0.5 + i * 0.15, duration: 0.6, ease: "easeInOut" }}
                        style={{
                            width: 56, height: 56, borderRadius: 16,
                            background: r.gradient,
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                    >
                        <IconComp color={r.accentColor} />
                    </motion.div>
                </div>

                {/* Stat number */}
                <div style={{ marginBottom: 16 }}>
                    <span style={{
                        fontSize: "clamp(36px, 5vw, 48px)",
                        fontWeight: 800, color: "#1a1a1a",
                        letterSpacing: "-0.03em", lineHeight: 1,
                    }}>
                        <CountUpValue target={r.countTo} suffix={r.countSuffix} isInView={isInView} />
                    </span>
                    <span style={{ fontSize: 14, color: "#999", marginLeft: 8, fontWeight: 500 }}>{r.statLabel}</span>
                </div>

                {/* Title + Description */}
                <h3 style={{
                    fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700,
                    color: "#1a1a1a", marginBottom: 12, lineHeight: 1.2,
                }}>
                    {r.title}
                </h3>
                <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7, marginBottom: 0 }}>
                    {r.desc}
                </p>
            </div>
        </motion.div>
    );
}

export default function WhyUs() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            style={{
                padding: "var(--section-spacing) 0",
                background: "var(--color-white)",
            }}
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
                        Why 코딩쏙
                    </p>
                    <h2 style={{
                        fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))",
                        fontWeight: 800, color: "var(--color-black)", lineHeight: 1.1, letterSpacing: "-0.03em",
                    }}>
                        왜 코딩쏙인가요?
                    </h2>
                    <p style={{
                        fontSize: "var(--font-size-t-md)", color: "var(--color-grey)",
                        marginTop: 16, maxWidth: 500, margin: "16px auto 0",
                    }}>
                        다른 학원과 다릅니다.
                    </p>
                </motion.div>

                {/* Cards Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))",
                    gap: "clamp(16px, 3vw, 28px)",
                }}>
                    {reasons.map((r, i) => (
                        <FeatureCard key={r.number} r={r} i={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
