"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/*
  FAQ — 학부모님 자주 묻는 질문
  SVG 아이콘 + 아코디언 + 3D 효과
*/

const FAQ_ITEMS = [
    {
        question: "수학이 약하면 코딩이 어렵지 않나요?",
        answer: "전혀 그렇지 않습니다. 코딩쏙에서는 아이의 현재 수준에 맞춘 개별 커리큘럼으로 시작합니다. 오히려 코딩을 통해 변수, 반복, 조건 등 수학적 개념을 자연스럽게 이해하게 되어 수학 실력이 함께 향상되는 사례가 많습니다.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7 8h4M9 6v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M14.5 7.5l3 3M17.5 7.5l-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M7 16h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="16" cy="16" r="2" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        question: "저학년인데 타이핑이 느려도 괜찮을까요?",
        answer: "네, 전혀 문제없습니다! 1~2학년은 블록코딩(Scratch)으로 시작하여 마우스 드래그만으로 프로그래밍 개념을 배웁니다. 타이핑이 필요한 텍스트 코딩으로 전환할 때도 타이핑 연습 시간을 별도로 배정하여 자연스럽게 적응할 수 있도록 돕습니다.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 10h1M9 10h1M12 10h1M15 10h1M18 10h1M7 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        question: "피드백은 어떻게 주시나요?",
        answer: "매 수업 후 카카오톡으로 당일 학습 내용 요약을 전달하고, 매주 금요일에는 '주간 성장 리포트'를 발송합니다. 리포트에는 수업 진도, 이해도 평가, 다음 주 학습 목표, 그리고 집에서 해볼 수 있는 추가 활동이 포함됩니다.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        question: "수업은 어떤 방식으로 진행되나요?",
        answer: "1:4~1:6 소수정예 대면 수업으로, 아이의 수준에 맞춘 개별 커리큘럼을 제공합니다. 90분 수업 중 처음 10분은 복습, 60분은 새로운 내용 실습, 마지막 20분은 자유 프로젝트 시간으로 운영됩니다. 선생님이 각 아이 옆에서 직접 코드를 함께 확인하며 밀착 지도합니다.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M2 8h3M19 8h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            </svg>
        ),
    },
    {
        question: "체험 수업은 무료인가요?",
        answer: "네, 첫 체험 수업은 완전 무료입니다. 90분 동안 실제 수업과 동일한 환경에서 진행되며, 체험 후 선생님이 아이의 코딩 적성과 추천 트랙을 안내해 드립니다. 부담 없이 신청해 주세요!",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 12v10H4V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 7h20v5H2V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M12 22V7M12 7c-1.5-2-3.5-3-5-3s-2.5 1-2 3M12 7c1.5-2 3.5-3 5-3s2.5 1 2 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        question: "코딩을 배우면 학교 성적에 도움이 되나요?",
        answer: "코딩 교육은 논리적 사고력, 문제 해결 능력, 집중력 향상에 직접적인 도움이 됩니다. 특히 수학과 과학 과목에서 향상 효과가 두드러집니다. 또한 2025년부터 초·중학교 SW 교육 의무화가 확대되어, 학교 정보 과목 성적에도 직접적인 도움이 됩니다.",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M6 12v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" stroke="currentColor" strokeWidth="1.5" />
            </svg>
        ),
    },
];

function FAQItem({ item, index, isInView }: { item: typeof FAQ_ITEMS[0]; index: number; isInView: boolean }) {
    const [open, setOpen] = useState(index === 3); // 4th item open by default

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
                background: "var(--color-white)",
                borderRadius: 16,
                overflow: "hidden",
                boxShadow: open
                    ? `0 8px 32px rgba(236,82,18,0.1)`
                    : "0 2px 8px rgba(0,0,0,0.04)",
                border: open
                    ? "1.5px solid rgba(236,82,18,0.2)"
                    : "1.5px solid rgba(0,0,0,0.04)",
                transition: "all 0.3s",
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 16,
                    padding: "20px 24px", background: "none", border: "none",
                    cursor: "pointer", textAlign: "left", fontFamily: "inherit",
                }}
            >
                <span style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: open ? "rgba(236,82,18,0.1)" : "var(--color-grey-3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: open ? "#EC5212" : "#64748b",
                    flexShrink: 0, transition: "all 0.25s",
                }}>
                    {item.icon}
                </span>
                <span style={{
                    flex: 1, fontSize: "clamp(0.9rem, 1.8vw, 1.1rem)",
                    fontWeight: 600, color: "var(--color-black)",
                }}>
                    {item.question}
                </span>
                <motion.span
                    animate={{ rotate: open ? 135 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        width: 32, height: 32, borderRadius: 8,
                        background: open ? "var(--color-brand-1)" : "var(--color-grey-3)",
                        color: open ? "#fff" : "var(--color-grey)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 18, fontWeight: 700, flexShrink: 0,
                        transition: "background 0.25s, color 0.25s",
                    }}
                >
                    +
                </motion.span>
            </button>

            <AnimatePresence>
                {open && (
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
                            margin: 0,
                        }}>
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQ() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} id="faq" style={{ padding: "var(--section-spacing) 0", background: "var(--color-beige)" }}>
            <div className="container-nod" style={{ maxWidth: 800, paddingTop: 20 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 48, textAlign: "center" }}
                >
                    <motion.div
                        animate={isInView ? { scale: [0.9, 1.1, 1] } : {}}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        style={{ display: "inline-block", marginBottom: 16 }}
                    >
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="var(--color-brand-1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M12 8v0M12 12v0M8 12v0M16 12v0" stroke="var(--color-brand-1)" strokeWidth="2" strokeLinecap="round" />
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

                {/* FAQ Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {FAQ_ITEMS.map((item, i) => (
                        <FAQItem key={i} item={item} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>
        </section>
    );
}
