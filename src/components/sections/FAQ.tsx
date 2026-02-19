"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/*
  학부모 안심 FAQ — Coddy 패턴 적용
  - 바이너리 코드 배너 (0110... 스크롤 텍스트)
  - Coddy 스타일 아코디언 (카드 radius 16px)
  - slideUp 스태거 애니메이션
*/

const faqs = [
    {
        q: "수학이 약하면 코딩이 어렵지 않나요?",
        a: "오히려 수학을 시각적으로 구현하며 더 쉽게 이해하게 됩니다. 사고력 수학 트랙이 그 가교 역할을 합니다.",
        icon: "🧮",
    },
    {
        q: "저학년인데 타이핑이 느려도 괜찮을까요?",
        a: "초기에는 블록코딩과 교구 조립 중심으로 진행하므로 타이핑 실력과 무관하게 시작할 수 있습니다.",
        icon: "⌨️",
    },
    {
        q: "피드백은 어떻게 주시나요?",
        a: "주간 단위로 아이가 직면한 문제와 해결 과정을 담은 개별 리포트를 전송해 드립니다.",
        icon: "📊",
    },
    {
        q: "수업은 어떤 방식으로 진행되나요?",
        a: "1:1~1:4 소수정예 대면 수업으로, 아이의 수준에 맞춘 개별 커리큘럼을 제공합니다.",
        icon: "👩‍🏫",
    },
    {
        q: "체험 수업은 무료인가요?",
        a: "네, 첫 체험 수업은 무료입니다. 아이의 코딩 적성을 파악하고 적합한 트랙을 추천해 드립니다.",
        icon: "🎁",
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
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={isInView ? { scale: 1 } : {}}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        style={{
                            display: "inline-block", fontSize: 40, marginBottom: 16,
                        }}
                    >
                        💬
                    </motion.span>
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
                                    ? "0 8px 32px rgba(236,82,18,0.1)"
                                    : "0 2px 8px rgba(0,0,0,0.04)",
                                border: openIndex === i
                                    ? "1.5px solid rgba(236,82,18,0.2)"
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
                                    background: openIndex === i ? "rgba(236,82,18,0.1)" : "var(--color-grey-3)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 20, flexShrink: 0,
                                    transition: "background 0.25s",
                                }}>
                                    {faq.icon}
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
                                        background: openIndex === i ? "var(--color-brand-1)" : "var(--color-grey-3)",
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
