"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/*
  학부모 안심 FAQ — Ultra-Premium V2
  SVG 아이콘 + Coddy 스타일 아코디언
  바이너리 코드 배너 + 3D 마이크로 인터랙션
*/

/* ── Custom SVG Icons for FAQ items ── */
const faqIcons: Record<string, React.ReactNode> = {
    math: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M7 8h4M9 6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14.5 7.5l3 3M17.5 7.5l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    keyboard: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="4" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 8h0M10 8h0M14 8h0M18 8h0M8 12h0M12 12h0M16 12h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 16h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
    chart: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    ),
    teacher: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
            <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 12h3M19 12h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
    ),
    gift: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M20 12v10H4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 7h20v5H2V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            <path d="M12 22V7" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 7c-1.5-2-3.5-3-5-3s-2.5 1-2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 7c1.5-2 3.5-3 5-3s2.5 1 2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    ),
};

const faqs = [
    {
        q: "수학이 약하면 코딩이 어렵지 않나요?",
        a: "오히려 수학을 시각적으로 구현하며 더 쉽게 이해하게 됩니다. 사고력 수학 트랙이 그 가교 역할을 합니다.",
        iconKey: "math",
        color: "#6366f1",
    },
    {
        q: "저학년인데 타이핑이 느려도 괜찮을까요?",
        a: "초기에는 블록코딩과 교구 조립 중심으로 진행하므로 타이핑 실력과 무관하게 시작할 수 있습니다.",
        iconKey: "keyboard",
        color: "#0ea5e9",
    },
    {
        q: "피드백은 어떻게 주시나요?",
        a: "주간 단위로 아이가 직면한 문제와 해결 과정을 담은 개별 리포트를 전송해 드립니다.",
        iconKey: "chart",
        color: "#10b981",
    },
    {
        q: "수업은 어떤 방식으로 진행되나요?",
        a: "1:1~1:4 소수정예 대면 수업으로, 아이의 수준에 맞춘 개별 커리큘럼을 제공합니다.",
        iconKey: "teacher",
        color: "#f59e0b",
    },
    {
        q: "체험 수업은 무료인가요?",
        a: "네, 첫 체험 수업은 무료입니다. 아이의 코딩 적성을 파악하고 적합한 트랙을 추천해 드립니다.",
        iconKey: "gift",
        color: "#ec4899",
    },
];

// Coddy-style binary code banner
const BINARY = "01001000 01100101 01101100 01101100 01101111 00100000 01010111 01101111 01110010 01101100 01100100 ";

export default function FAQ() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section
            ref={ref}
            id="faq"
            style={{
                padding: "var(--section-spacing) 0",
                background: "var(--color-beige)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* ── Coddy Binary Code Banner ── */}
            <div style={{
                position: "absolute", top: 0, left: 0, right: 0,
                overflow: "hidden", height: 40, display: "flex", alignItems: "center",
                background: "linear-gradient(90deg, var(--color-brand-1), #f06830, var(--color-brand-2))",
            }}>
                <motion.div
                    animate={{ x: [0, -1200] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    style={{
                        display: "flex", whiteSpace: "nowrap", gap: 0,
                        fontFamily: "'Courier New', monospace", fontSize: 13,
                        color: "rgba(255,255,255,0.6)", fontWeight: 600,
                        letterSpacing: "0.05em",
                    }}
                >
                    {[0, 1, 2].map((k) => (
                        <span key={k} style={{ paddingRight: 40 }}>{BINARY.repeat(3)}</span>
                    ))}
                </motion.div>
            </div>

            <div className="container-nod" style={{ maxWidth: 800, paddingTop: 20 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 48, textAlign: "center" }}
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        style={{
                            display: "inline-flex", alignItems: "center", justifyContent: "center",
                            width: 56, height: 56, borderRadius: 16,
                            background: "linear-gradient(135deg, #EEF2FF, #E0E7FF)",
                            marginBottom: 16,
                        }}
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M8 9h8M8 13h4" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </motion.div>
                    <p style={{
                        fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-1)",
                        fontWeight: 700, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.15em",
                    }}>
                        FAQ
                    </p>
                    <h2 style={{
                        fontSize: "clamp(1.8rem, 3.5vw, var(--font-size-h-2xs))",
                        fontWeight: 700, color: "var(--color-black)", lineHeight: 1.1,
                    }}>
                        학부모님이 자주<br />묻는 질문
                    </h2>
                </motion.div>

                {/* Accordion Cards */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.08 * i, duration: 0.6 }}
                            style={{
                                background: "var(--color-white)",
                                borderRadius: 16,
                                overflow: "hidden",
                                boxShadow: openIndex === i
                                    ? `0 8px 32px ${faq.color}18`
                                    : "0 2px 8px rgba(0,0,0,0.04)",
                                border: openIndex === i
                                    ? `1.5px solid ${faq.color}30`
                                    : "1.5px solid rgba(0,0,0,0.04)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 16,
                                    padding: "20px 24px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                    fontFamily: "inherit",
                                }}
                            >
                                <span style={{
                                    width: 42, height: 42, borderRadius: 12,
                                    background: openIndex === i ? `${faq.color}15` : "var(--color-grey-3)",
                                    color: openIndex === i ? faq.color : "#64748b",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    flexShrink: 0,
                                    transition: "background 0.25s, color 0.25s",
                                }}>
                                    {faqIcons[faq.iconKey]}
                                </span>
                                <span style={{
                                    flex: 1, fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
                                    fontWeight: 600, color: "var(--color-black)",
                                }}>
                                    {faq.q}
                                </span>
                                <motion.span
                                    animate={{ rotate: openIndex === i ? 135 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    style={{
                                        width: 32, height: 32, borderRadius: 8,
                                        background: openIndex === i ? faq.color : "var(--color-grey-3)",
                                        color: openIndex === i ? "#fff" : "var(--color-grey)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 18, fontWeight: 700, flexShrink: 0,
                                        transition: "background 0.25s, color 0.25s",
                                    }}
                                >
                                    +
                                </motion.span>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <p style={{
                                            padding: "0 24px 24px 82px",
                                            fontSize: "var(--font-size-t-md)",
                                            color: "var(--color-grey)",
                                            lineHeight: 1.7,
                                        }}>
                                            {faq.a}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
