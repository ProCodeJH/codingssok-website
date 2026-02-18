"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/*
  Why 코딩쏙 — 3-컬럼 프리미엄 피처 카드
  3D 틸트 호버 + 아이콘 펄스 애니메이션 + 그라디언트 배경
  *(yantra 3-컬럼 + noah 호버 인터랙션 + bhroovi 클린 타이포 혼합)*
*/

const reasons = [
    {
        number: "01",
        title: "월 5회/8회 시스템",
        desc: "한 달 4회는 진도 나가기 바쁩니다. 코딩쏙은 4번의 프로젝트와 1번의 '플러스 쏙(1:1 보완)'으로 배움을 완성합니다.",
        icon: "📅",
        gradient: "linear-gradient(135deg, #FFF5EB, #FFE8D6)",
        accentColor: "#EC5212",
        statNum: "5+",
        statLabel: "회 / 월",
    },
    {
        number: "02",
        title: "90분 몰입 수업",
        desc: "초등학생 집중력이 가장 높은 90분 수업. 더 자주, 더 즐겁게 만나며 코딩 습관을 만듭니다.",
        icon: "⏱️",
        gradient: "linear-gradient(135deg, #E6F7F2, #D4F0E7)",
        accentColor: "#77C6B3",
        statNum: "90",
        statLabel: "분 / 회",
    },
    {
        number: "03",
        title: "1:6 소수 정예",
        desc: "선생님의 기준이 아닌 아이의 속도에 맞춘 밀착 코칭과 매주 발송되는 성장 리포트로 안심을 더합니다.",
        icon: "👨‍🏫",
        gradient: "linear-gradient(135deg, #F0F0FF, #E3E3F5)",
        accentColor: "#70A2E1",
        statNum: "1:6",
        statLabel: "밀착 코칭",
    },
];

function FeatureCard({ r, i, isInView }: { r: typeof reasons[0]; i: number; isInView: boolean }) {
    const [hover, setHover] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setTilt({ x: y * -10, y: x * 10 });
    };

    const handleMouseLeave = () => {
        setHover(false);
        setTilt({ x: 0, y: 0 });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 * i, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setHover(true)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                perspective: 800,
            }}
        >
            <motion.div
                animate={{
                    rotateX: tilt.x,
                    rotateY: tilt.y,
                    scale: hover ? 1.03 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{
                    background: "#fff",
                    borderRadius: 24,
                    padding: "clamp(28px, 4vw, 40px)",
                    position: "relative",
                    overflow: "hidden",
                    boxShadow: hover
                        ? `0 20px 60px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03)`
                        : "0 2px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.03)",
                    transition: "box-shadow 0.4s ease",
                    cursor: "default",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Background gradient accent */}
                <div style={{
                    position: "absolute", top: 0, left: 0, right: 0, height: 4,
                    background: `linear-gradient(90deg, ${r.accentColor}, ${r.accentColor}88)`,
                    borderRadius: "24px 24px 0 0",
                }} />

                {/* Number + Icon row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
                    <span style={{ fontSize: 13, color: r.accentColor, fontWeight: 700, letterSpacing: "0.1em" }}>
                        {r.number}
                    </span>
                    <motion.div
                        animate={isInView ? { scale: [0, 1.2, 1], rotate: [0, 10, 0] } : {}}
                        transition={{ delay: 0.3 + i * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            width: 56, height: 56, borderRadius: 16,
                            background: r.gradient,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 28,
                        }}
                    >
                        {r.icon}
                    </motion.div>
                </div>

                {/* Stat */}
                <div style={{ marginBottom: 16 }}>
                    <span style={{ fontSize: "clamp(36px, 5vw, 48px)", fontWeight: 800, color: "#1a1a1a", letterSpacing: "-0.03em", lineHeight: 1 }}>
                        {r.statNum}
                    </span>
                    <span style={{ fontSize: 14, color: "#999", marginLeft: 8, fontWeight: 500 }}>
                        {r.statLabel}
                    </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 700, color: "#1a1a1a", marginBottom: 12, lineHeight: 1.2 }}>
                    {r.title}
                </h3>

                {/* Description */}
                <p style={{ fontSize: 14, color: "#777", lineHeight: 1.7, marginBottom: 0 }}>
                    {r.desc}
                </p>

                {/* Hover glow */}
                {hover && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        style={{
                            position: "absolute", inset: 0,
                            background: r.gradient,
                            borderRadius: 24,
                            pointerEvents: "none",
                            zIndex: -1,
                        }}
                    />
                )}
            </motion.div>
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
                padding: "clamp(80px, 12vw, 160px) 0",
                background: "var(--color-white)",
            }}
        >
            <div className="container-nod">
                {/* Section header — bhroovi 큰 타이포 스타일 */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: "clamp(40px, 6vw, 80px)", maxWidth: 700 }}
                >
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        style={{ fontSize: 13, color: "var(--color-brand-1)", fontWeight: 700, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.15em" }}
                    >
                        Why 코딩쏙?
                    </motion.p>
                    <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#1a1a1a", lineHeight: 1.15, letterSpacing: "-0.03em" }}>
                        남들 4번 배울 때,<br />
                        코딩쏙 아이들은{" "}
                        <span style={{ color: "var(--color-brand-1)", position: "relative" }}>
                            한 번 더
                            <motion.span
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : {}}
                                transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                                style={{
                                    position: "absolute", bottom: -4, left: 0, right: 0,
                                    height: 4, background: "var(--color-brand-1)", borderRadius: 2,
                                    transformOrigin: "left", opacity: 0.3,
                                }}
                            />
                        </span>{" "}
                        배웁니다.
                    </h2>
                </motion.div>

                {/* 3 feature cards — yantra 3-column 구조 */}
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
