"use client";

import { useState, useRef, useEffect } from "react";

/*
  FAQ — 코딩쏙 자주 묻는 질문
  Accordion with CSS-driven expand/collapse (no framer-motion)
  Uses nodcoding accordion pattern with 3px solid borders
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

export default function FAQ() {
    const ref = useRef<HTMLElement>(null);
    const [isIn, setIsIn] = useState(false);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setIsIn(true);
                    obs.disconnect();
                }
            },
            { rootMargin: "-80px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <section
            ref={ref}
            id="faq"
            className={`s-faq${isIn ? " is-in" : ""}`}
        >
            <div className="u-container">
                {/* Header */}
                <div className="s__header">
                    <p className="s__subtitle">Questions?</p>
                    <h2 className="s__title">자주 묻는 질문</h2>
                </div>

                {/* Accordion */}
                <div className="s__accordion">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`sb-accordion-item${openIndex === i ? " sb-accordion-item--open" : ""}`}
                        >
                            <button
                                className="sb-accordion-item__trigger"
                                onClick={() =>
                                    setOpenIndex(openIndex === i ? null : i)
                                }
                            >
                                <span>{faq.q}</span>
                                <svg
                                    className="sb-accordion-item__icon"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <path
                                        d="M10 4v12M4 10h12"
                                        stroke="var(--color-brand-1)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </button>
                            <div className="sb-accordion-item__body">
                                <p className="sb-accordion-item__answer">
                                    {faq.a}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
