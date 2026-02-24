"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  FAQ — Crystalline Knowledge Base
  Bionic Zenith 스타일: 카드 그리드 노드 레이아웃
  코딩쏙 내용 유지
*/

const FAQ_NODES = [
    {
        question: "커리큘럼 깊이",
        answer: "수학이 약하면 코딩이 어렵지 않나요? 전혀 그렇지 않습니다. 코딩쏙에서는 아이의 현재 수준에 맞춘 개별 커리큘럼으로 시작합니다. 오히려 코딩을 통해 변수, 반복, 조건 등 수학적 개념을 자연스럽게 이해하게 됩니다.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <polyline points="16 18 22 12 16 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="8 6 2 12 8 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        question: "수업 방식",
        answer: "1:4~1:6 소수정예 대면 수업으로, 아이의 수준에 맞춘 개별 커리큘럼을 제공합니다. 90분 수업 중 처음 10분은 복습, 60분은 새로운 내용 실습, 마지막 20분은 자유 프로젝트 시간으로 운영됩니다.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        question: "자격증 취득",
        answer: "COS-Pro부터 정보처리기능사, 컴활까지 단계별 자격증 로드맵을 제공합니다. 시험 유형별 집중 학습과 실전 모의고사를 통해 합격률을 극대화합니다.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="10" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 16v6M9 19l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        question: "저학년 타이핑",
        answer: "저학년인데 타이핑이 느려도 괜찮을까요? 네, 전혀 문제없습니다! 1~2학년은 블록코딩(Scratch)으로 시작하여 마우스 드래그만으로 프로그래밍 개념을 배웁니다. 타이핑이 필요한 텍스트 코딩 전환 시에도 별도 시간을 배정합니다.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M6 10h1M9 10h1M12 10h1M15 10h1M18 10h1M7 14h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        question: "학습 리포트",
        answer: "매 수업 후 카카오톡으로 당일 학습 내용 요약을 전달하고, 매주 금요일에는 '주간 성장 리포트'를 발송합니다. 리포트에는 수업 진도, 이해도 평가, 다음 주 학습 목표, 추가 활동이 포함됩니다.",
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        question: "무료 체험 수업",
        answer: "첫 체험 수업은 완전 무료입니다. 90분 동안 실제 수업과 동일한 환경에서 진행되며, 체험 후 선생님이 아이의 코딩 적성과 추천 트랙을 안내해 드립니다.",
        cta: true,
        icon: (
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

function FAQCard({ node, index, isInView }: { node: typeof FAQ_NODES[0]; index: number; isInView: boolean }) {
    const isCta = "cta" in node && node.cta;

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -4, boxShadow: isCta ? "0 20px 60px rgba(61,138,245,0.3)" : "0 16px 48px rgba(61,138,245,0.06)" }}
            style={{
                position: "relative",
                background: isCta ? "#3d8af5" : "var(--color-white, #fff)",
                padding: 32, borderRadius: 16,
                border: isCta ? "none" : "1px solid rgba(0,0,0,0.06)",
                cursor: "pointer",
                transition: "all 0.3s",
                overflow: "hidden",
            }}
        >
            {/* Gradient overlay for CTA card */}
            {isCta && (
                <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 100%)",
                    pointerEvents: "none",
                }} />
            )}

            {/* Icon */}
            <div style={{
                position: "absolute", top: 24, right: 24,
                color: isCta ? "rgba(255,255,255,0.3)" : "rgba(61,138,245,0.15)",
                transition: "color 0.3s",
            }}>
                {node.icon}
            </div>

            {/* Content */}
            <h3 style={{
                fontSize: 19, fontWeight: 700,
                color: isCta ? "#fff" : "var(--color-black, #0f172a)",
                marginBottom: 12, paddingRight: 48,
                transition: "color 0.3s",
                position: "relative", zIndex: 1,
            }}>
                {node.question}
            </h3>

            <p style={{
                fontSize: 13,
                color: isCta ? "rgba(255,255,255,0.8)" : "rgba(100,116,139,1)",
                lineHeight: 1.7, marginBottom: 20,
                position: "relative", zIndex: 1,
            }}>
                {node.answer}
            </p>

            <div style={{
                display: "flex", alignItems: "center", gap: 8,
                fontSize: 13, fontWeight: 700,
                color: isCta ? "#fff" : "#3d8af5",
                position: "relative", zIndex: 1,
            }}>
                <span>{isCta ? "체험 신청하기" : "더 알아보기"}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </motion.div>
    );
}

export default function FAQ() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            id="faq"
            style={{
                padding: "clamp(60px, 8vw, 120px) 0",
                background: "var(--color-beige, #f5f7f8)",
                position: "relative", overflow: "hidden",
            }}
        >
            <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px, 3vw, 40px)" }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        display: "flex", flexDirection: "row",
                        justifyContent: "space-between", alignItems: "flex-end",
                        marginBottom: 48, gap: 24, flexWrap: "wrap",
                    }}
                >
                    <div>
                        <h2 style={{
                            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                            fontWeight: 700,
                            color: "var(--color-black, #0f172a)",
                            letterSpacing: "-0.02em",
                            marginBottom: 12,
                        }}>
                            Crystalline Knowledge Base
                        </h2>
                        <p style={{
                            fontSize: 15, color: "rgba(100,116,139,1)",
                            maxWidth: 420,
                        }}>
                            학부모님이 자주 묻는 질문을 노드 형태로 정리했습니다.
                        </p>
                    </div>

                    {/* Decorative icon */}
                    <motion.div
                        animate={isInView ? { opacity: [0.15, 0.3, 0.15] } : {}}
                        transition={{ duration: 3, repeat: Infinity }}
                        style={{ display: "none" }}
                    >
                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" style={{ color: "rgba(61,138,245,0.2)" }}>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
                            <circle cx="12" cy="3" r="1.5" fill="currentColor" />
                            <circle cx="12" cy="21" r="1.5" fill="currentColor" />
                            <circle cx="3" cy="12" r="1.5" fill="currentColor" />
                            <circle cx="21" cy="12" r="1.5" fill="currentColor" />
                            <path d="M12 5.5v3.5M12 15v3.5M5.5 12H9M15 12h3.5" stroke="currentColor" strokeWidth="1" />
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Card Grid */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                    gap: 20,
                }}>
                    {FAQ_NODES.map((node, i) => (
                        <FAQCard key={i} node={node} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>

            {/* Mobile responsive */}
            <style>{`
                @media (max-width: 768px) {
                    #faq > div > div:last-child {
                        grid-template-columns: 1fr !important;
                    }
                    #faq > div > div:first-child {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                    }
                }
            `}</style>
        </section>
    );
}
