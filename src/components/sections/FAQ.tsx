"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/*
  학부모 안심 FAQ — 신뢰 구축
  수학, 타이핑, 피드백 관련 3개 핵심 FAQ
*/

const faqs = [
    {
        q: "수학이 약하면 코딩이 어렵지 않나요?",
        a: "오히려 수학을 시각적으로 구현하며 더 쉽게 이해하게 됩니다. 사고력 수학 트랙이 그 가교 역할을 합니다.",
    },
    {
        q: "저학년인데 타이핑이 느려도 괜찮을까요?",
        a: "초기에는 블록코딩과 교구 조립 중심으로 진행하므로 타이핑 실력과 무관하게 시작할 수 있습니다.",
    },
    {
        q: "피드백은 어떻게 주시나요?",
        a: "주간 단위로 아이가 직면한 문제와 해결 과정을 담은 개별 리포트를 전송해 드립니다.",
    },
];

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
            }}
        >
            <div className="container-nod" style={{ maxWidth: 800 }}>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 60, textAlign: "center" }}
                >
                    <p style={{ fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-3)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        FAQ
                    </p>
                    <h2 style={{ fontSize: "clamp(1.8rem, 3.5vw, var(--font-size-h-2xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 1.1 }}>
                        학부모님이 자주<br />묻는 질문
                    </h2>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.08 * i, duration: 0.6 }}
                            style={{
                                background: "var(--color-white)",
                                borderRadius: i === 0 ? "16px 16px 0 0" : i === faqs.length - 1 ? "0 0 16px 16px" : 0,
                                overflow: "hidden",
                            }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                style={{
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    padding: "24px 32px",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    textAlign: "left",
                                }}
                            >
                                <span style={{ fontSize: "clamp(1rem, 1.8vw, 1.15rem)", fontWeight: 600, color: "var(--color-black)" }}>
                                    {faq.q}
                                </span>
                                <motion.span
                                    animate={{ rotate: openIndex === i ? 45 : 0 }}
                                    style={{
                                        fontSize: 24,
                                        color: "var(--color-brand-1)",
                                        flexShrink: 0,
                                        marginLeft: 16,
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
                                            padding: "0 32px 24px",
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
