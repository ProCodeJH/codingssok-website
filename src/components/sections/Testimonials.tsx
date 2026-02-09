"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/*
  코딩쏙 — Success Stories (nodcoding pixel-perfect clone)
  Draggable horizontal slider with colored background cards
  Structure: .s-success-stories > marquee + .u-container > .b-testimonials > slider

  CSS handles:
  - Color cycling via --testimonial-color + nth-child(4n+2/3/4)
  - Entry animation: translate3d(100vw,0,0) → translate3d(0,0,0) when .is-in
  - Connecting lines + dots via .sb__line
  - Speech bubble tail via SVG mask on .sb__quote__inner::after
*/

const STORIES = [
    {
        quote:
            "처음에 코딩이라곤 아무것도 몰랐는데, 코딩쏙에서 C언어부터 차근차근 배우니 정보처리기능사 실기를 한 번에 합격했어요. 체계적인 커리큘럼이 정말 좋았습니다.",
        name: "김O준 학부모",
        secondary: "초등 6학년 · C언어 기초",
        photo: null,
    },
    {
        quote:
            "학교에서 배우는 것 보다 훨씬 깊고 재미있어요. 직접 게임도 만들어보고, 공모전 준비도 같이 해서 포트폴리오가 생겼습니다. 자신감이 확 올라갔어요.",
        name: "이O서",
        secondary: "중학 2학년 · Python",
        photo: null,
    },
    {
        quote:
            "정올 준비 전문 학원을 찾기 어려웠는데, 코딩쏙에서 체계적으로 준비해서 지역 대회 입상까지 할 수 있었습니다. 알고리즘 문제 풀이가 특히 도움이 됐습니다.",
        name: "박O현 학부모",
        secondary: "고등 1학년 · 정보올림피아드 입상",
        photo: null,
    },
    {
        quote:
            "정보처리기능사 한 번에 합격했습니다. 실기 위주 수업이 실전에서 정말 도움이 됐어요. 학생부에도 쓸 수 있어서 일석이조였습니다.",
        name: "최O우",
        secondary: "고등 3학년 · 자격증 합격",
        photo: null,
    },
    {
        quote:
            "아이가 코딩을 어려워했는데, 여기서 배우면서 자신감이 생겼어요. 선생님이 일일이 봐주시니까 따라가는 게 확실히 다릅니다. 소규모 수업이라 집중도가 높아요.",
        name: "강O미 학부모",
        secondary: "초등 4학년 · 스크래치 → C 전환",
        photo: null,
    },
    {
        quote:
            "코딩쏙 수업 후 논리적으로 생각하는 습관이 생겼어요. 수학 성적도 덩달아 올랐습니다. 코딩이 사고력 훈련이라는 걸 실감했어요.",
        name: "정O환",
        secondary: "중학 3학년 · C/C++ 심화",
        photo: null,
    },
    {
        quote:
            "다른 학원에서는 따라가기 힘들었는데 여기 소수 정예 수업이라 모르는 거 바로 물어볼 수 있어서 좋았어요. 코딩 실력이 확실히 늘었습니다.",
        name: "한O민 학부모",
        secondary: "초등 5학년 · Python 기초",
        photo: null,
    },
    {
        quote:
            "대학 입시 준비하면서 소프트웨어 관련 생기부 내용을 채울 수 있었어요. 프로젝트 결과물이 면접 때 큰 도움이 됐습니다.",
        name: "윤O현",
        secondary: "고등 2학년 · 프로젝트 포트폴리오",
        photo: null,
    },
];

const MARQUEE_TEXT = "수강생 성공 스토리";

export default function Testimonials() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    /* Drag state */
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);
    const currentTranslate = useRef(0);

    /* IntersectionObserver for .is-in class */
    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    obs.disconnect();
                }
            },
            { rootMargin: "-80px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    /* Drag handlers for the slider */
    const onPointerDown = useCallback((e: React.PointerEvent) => {
        const slider = sliderRef.current;
        if (!slider) return;
        isDragging.current = true;
        startX.current = e.clientX;
        scrollLeft.current = currentTranslate.current;
        slider.style.cursor = "grabbing";
        slider.setPointerCapture(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e: React.PointerEvent) => {
        if (!isDragging.current) return;
        const dx = e.clientX - startX.current;
        const newTranslate = scrollLeft.current + dx;
        // Clamp: max 0 (left edge), min = -(sliderScrollWidth - containerWidth)
        const slider = sliderRef.current;
        if (!slider || !slider.parentElement) return;
        const maxScroll = slider.scrollWidth - slider.parentElement.clientWidth;
        currentTranslate.current = Math.max(
            -maxScroll,
            Math.min(0, newTranslate)
        );
        slider.style.transform = `translate3d(${currentTranslate.current}px, 0, 0)`;
    }, []);

    const onPointerUp = useCallback((e: React.PointerEvent) => {
        isDragging.current = false;
        const slider = sliderRef.current;
        if (slider) {
            slider.style.cursor = "grab";
            slider.releasePointerCapture(e.pointerId);
        }
    }, []);

    return (
        <div
            ref={sectionRef}
            className="s-success-stories"
            data-plr-component="s-success-stories"
        >
            {/* ── Marquee Title (top) ── */}
            <h2
                className="b-marquee s__title b-marquee--green t-h-2xl"
                data-plr-component="b-marquee"
                style={{ "--duration": "10.52s" } as React.CSSProperties}
            >
                <span className="b__word">{MARQUEE_TEXT}</span>
                {Array.from({ length: 6 }).map((_, i) => (
                    <span
                        key={i}
                        className="b__ghost"
                        data-title={MARQUEE_TEXT}
                    />
                ))}
            </h2>

            <div className="u-container">
                {/* ── Testimonials Slider ── */}
                <div
                    className={`b-testimonials b-testimonials--multiple${isInView ? " is-in" : ""}`}
                    data-plr-component="b-testimonials"
                >
                    <div className="b__testimonials js-testimonials">
                        <div
                            ref={sliderRef}
                            className="b__testimonials-slider js-slider"
                            style={{ cursor: "grab", touchAction: "pan-y" }}
                            onPointerDown={onPointerDown}
                            onPointerMove={onPointerMove}
                            onPointerUp={onPointerUp}
                            onPointerCancel={onPointerUp}
                        >
                            {STORIES.map((story, i) => (
                                <div
                                    key={i}
                                    className="sb-testimonial"
                                    style={{ touchAction: "pan-y" }}
                                >
                                    {/* Speech bubble card */}
                                    <blockquote className="sb__quote">
                                        <div className="sb__quote__inner t-t-xl">
                                            <p className="sb__quote__text">
                                                &ldquo;&nbsp;{story.quote}
                                                &nbsp;&rdquo;
                                            </p>
                                        </div>
                                    </blockquote>

                                    {/* Author below card */}
                                    <cite className="sb__quote__author t-t-sm">
                                        <span className="sb__quote__author__photo sb__quote__author__photo--initial">
                                            {story.name.charAt(0)}
                                        </span>
                                        <span className="sb__quote__author__content">
                                            <span className="sb__quote__author__main">
                                                {story.name}
                                            </span>
                                            <span className="sb__quote__author__secondary">
                                                {story.secondary}
                                            </span>
                                        </span>
                                    </cite>

                                    {/* Connecting lines (all cards get both) */}
                                    <div className="sb__line sb__line--before" />
                                    <div className="sb__line sb__line--after" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
