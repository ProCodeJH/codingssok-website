"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

/*
  nodcoding "Questions?" → 코딩쏙 FAQ
  Accordion with smooth expand/collapse
*/

const faqs = [
    {
        q: "수업은 어떤 방식으로 진행되나요?",
        a: "소수 정예(최대 6명) 오프라인 수업입니다. 학생 수준에 맞춰 직접 코드를 치며 배우는 실습 중심 수업이고, 이론 설명 → 함께 풀기 → 자기 힘으로 풀기 3단계로 진행됩니다.",
    },
    {
        q: "코딩을 전혀 모르는데 따라갈 수 있나요?",
        a: "물론입니다. 절반 이상의 학생이 코딩 경험 0에서 시작합니다. 첫 수업에서 환경 설정부터 차근차근 안내하고, 개인별 속도에 맞춰 진도를 조절합니다.",
    },
    {
        q: "무료 체험 수업이 있나요?",
        a: "네, 첫 1회 무료 체험 수업을 제공합니다. 실제 수업과 동일한 방식으로 진행되며, 수업 후 학생 수준 진단과 학습 방향 상담을 드립니다.",
    },
    {
        q: "정보올림피아드 준비도 가능한가요?",
        a: "기초 과정 수료 후 심화 과정에서 정보올림피아드(정올) 대비가 가능합니다. 기출 문제 풀이, 알고리즘 유형별 학습, 모의 대회 등을 통해 체계적으로 준비합니다.",
    },
    {
        q: "성인도 수강 가능한가요?",
        a: "네, 코딩쏙은 초등학생부터 성인까지 전연령을 대상으로 합니다. 취업 준비, 자격증 취득, 직무 전환 등 목적에 맞춘 맞춤 커리큘럼을 제공합니다.",
    },
    {
        q: "수업 장소와 시간은 어떻게 되나요?",
        a: "수원 지역에서 진행됩니다. 평일 오후/저녁, 주말 시간대 선택 가능하며, 학생의 학교 일정에 맞춰 유연하게 조율합니다.",
    },
];

function AccordionItem({ q, a, isOpen, onClick }: { q: string; a: string; isOpen: boolean; onClick: () => void }) {
    return (
        <div
            style={{
                borderBottom: "1px solid var(--color-grey-2)",
            }}
        >
            <button
                onClick={onClick}
                style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "24px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    textAlign: "left",
                    gap: 16,
                }}
            >
                <span style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", fontWeight: 500, color: "var(--color-black)" }}>
                    {q}
                </span>
                <motion.svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.645, 0.045, 0.355, 1] }}
                    style={{ flexShrink: 0 }}
                >
                    <path d="M10 4v12M4 10h12" stroke="var(--color-brand-1)" strokeWidth="2" strokeLinecap="round" />
                </motion.svg>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.645, 0.045, 0.355, 1] }}
                        style={{ overflow: "hidden" }}
                    >
                        <p style={{ paddingBottom: 24, fontSize: "var(--font-size-t-md)", color: "var(--color-grey)", lineHeight: 1.7, maxWidth: 640 }}>
                            {a}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQ() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section
            ref={ref}
            id="faq"
            style={{
                padding: "var(--section-spacing) 0",
                background: "var(--color-white)",
            }}
        >
            <div className="container-nod" style={{ maxWidth: 800, margin: "0 auto" }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 60, textAlign: "center" }}
                >
                    <p style={{ fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-1)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Questions?
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                        자주 묻는 질문
                    </h2>
                </motion.div>

                {/* Accordion */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    {faqs.map((faq, i) => (
                        <AccordionItem
                            key={i}
                            q={faq.q}
                            a={faq.a}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
