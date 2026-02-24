"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  맞춤형 스케줄링 시스템 — SVG 아이콘 + 3D 효과
*/

/* ── SVG Icons ── */
function ClipboardIcon() {
    return (
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="3" width="14" height="18" rx="2" stroke="#4F46E5" strokeWidth="1.5" />
            <path d="M9 1h6v4H9V1z" stroke="#4F46E5" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M9 10h6M9 14h4" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    );
}

const STEPS = [
    {
        step: "01",
        title: "결제 완료",
        desc: "매월 1일 자동 결제",
        color: "#4F46E5",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5" width="20" height="14" rx="3" stroke="#4F46E5" strokeWidth="1.5" />
                <path d="M2 10h20" stroke="#4F46E5" strokeWidth="1.5" />
                <path d="M6 15h4" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        step: "02",
        title: "폼 수신",
        desc: "스케줄 설정 구글 폼 발송",
        color: "#EC5212",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M22 6L12 13 2 6" stroke="#EC5212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <rect x="2" y="4" width="20" height="16" rx="3" stroke="#EC5212" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        step: "03",
        title: "시간표 확정",
        desc: "맞춤 시간표 자동 배치",
        color: "#34D399",
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#34D399" strokeWidth="1.5" />
                <path d="M8 12l3 3 5-6" stroke="#34D399" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

export default function Schedule() {
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
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 60, textAlign: "center" }}
                >
                    <p style={{ fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-4)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Schedule System
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>
                        아이의 스케줄에<br />교육을 맞춥니다.
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        background: "var(--color-beige)",
                        borderRadius: 24,
                        padding: "clamp(24px, 4vw, 48px) clamp(20px, 3vw, 40px)",
                        maxWidth: 800,
                        margin: "0 auto",
                    }}
                >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(12px, 2vw, 24px)", marginBottom: 32, flexWrap: "wrap" }}>
                        <motion.div
                            animate={isInView ? { rotate: [0, -5, 5, 0] } : {}}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            style={{ flexShrink: 0 }}
                        >
                            <ClipboardIcon />
                        </motion.div>
                        <div style={{ flex: 1, minWidth: 200 }}>
                            <h3 style={{ fontSize: "var(--font-size-t-xl)", fontWeight: 600, color: "var(--color-black)", marginBottom: 12 }}>
                                전용 구글 폼 스케줄링
                            </h3>
                            <p style={{ fontSize: "var(--font-size-t-md)", color: "var(--color-grey)", lineHeight: 1.7 }}>
                                매월 1일 결제 후 발송되는 전용 구글 폼을 통해, 아이의 하교 시간과 타 학원 일정에 최적화된 시간표를 직접 설계하세요.
                            </p>
                        </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(180px, 100%), 1fr))", gap: 16 }}>
                        {STEPS.map((s, i) => (
                            <motion.div
                                key={s.step}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                                whileHover={{ y: -6, boxShadow: `0 8px 24px ${s.color}15` }}
                                style={{
                                    background: "var(--color-white)",
                                    borderRadius: 16,
                                    padding: "clamp(16px, 2vw, 24px)",
                                    textAlign: "center",
                                    cursor: "default",
                                    transition: "all 0.3s",
                                }}
                            >
                                <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>{s.icon}</div>
                                <span style={{ fontSize: 12, fontWeight: 700, color: s.color, letterSpacing: "0.05em" }}>STEP {s.step}</span>
                                <h4 style={{ fontSize: 16, fontWeight: 600, color: "var(--color-black)", margin: "8px 0 4px" }}>{s.title}</h4>
                                <p style={{ fontSize: 13, color: "var(--color-grey)" }}>{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
