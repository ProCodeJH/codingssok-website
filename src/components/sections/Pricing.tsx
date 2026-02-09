"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";

/*
  Pricing section — 코딩쏙 수강료
  Uses nodcoding s-bootcamps pattern with proper CSS classes
  3-column grid with bordered cards, accent color bars, feature lists
*/

const plans = [
    {
        name: "기초 과정",
        price: "월 20만원",
        period: "주 2회 · 90분",
        features: [
            "C언어 or Python 기초",
            "1:1 코드 리뷰",
            "소수 정예 (최대 6명)",
            "자체 교재 제공",
            "학습 리포트 제공",
        ],
        color: "var(--color-brand-5)",
        popular: false,
    },
    {
        name: "심화 과정",
        price: "월 28만원",
        period: "주 2회 · 120분",
        features: [
            "알고리즘·정보올림피아드",
            "실전 문제 풀이 위주",
            "대회 출전 준비",
            "모의고사 및 해설",
            "개인 멘토링 포함",
        ],
        color: "var(--color-brand-1)",
        popular: true,
    },
    {
        name: "자격증 과정",
        price: "월 25만원",
        period: "주 3회 · 90분",
        features: [
            "정보처리기능사 완벽 대비",
            "이론 + 실기 통합",
            "기출문제 정복",
            "모의시험 실시",
            "합격 보장 프로그램",
        ],
        color: "var(--color-brand-4)",
        popular: false,
    },
];

export default function Pricing() {
    const ref = useRef<HTMLElement>(null);
    const [isIn, setIsIn] = useState(false);

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
            id="pricing"
            className={`s-pricing${isIn ? " is-in" : ""}`}
        >
            <div className="u-container">
                {/* Header */}
                <div className="s__header">
                    <div>
                        <p className="s__subtitle">Pricing</p>
                        <h2 className="s__title">수강료 안내</h2>
                    </div>
                </div>

                {/* Price cards */}
                <div className="s__cards">
                    {plans.map((p) => (
                        <div
                            key={p.name}
                            className={`sb-price-card${p.popular ? " sb-price-card--popular" : ""}`}
                        >
                            {/* Popular badge */}
                            {p.popular && (
                                <div className="sb-price-card__badge">인기</div>
                            )}

                            {/* Top accent bar */}
                            <div
                                className="sb-price-card__accent"
                                style={{ background: p.color }}
                            />

                            <h3 className="sb-price-card__name">{p.name}</h3>
                            <p className="sb-price-card__price">{p.price}</p>
                            <p className="sb-price-card__period">{p.period}</p>

                            {/* Features */}
                            <ul className="sb-price-card__features">
                                {p.features.map((f, j) => (
                                    <li key={j}>
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                        >
                                            <path
                                                d="M2 7l3.5 3.5L12 4"
                                                stroke={p.color}
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            {/* CTA */}
                            <div className="sb-price-card__cta">
                                <Link href="#contact" className="btn-pill">
                                    상담 예약
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                    >
                                        <path
                                            d="M1 7h11M8 3l4 4-4 4"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
