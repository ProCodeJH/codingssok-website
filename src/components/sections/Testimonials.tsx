"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/*
  코딩쏙 — Success Stories (Ultra-Premium V2)
  초하이엔드급 초고퀄리티 수강생 성공 스토리
  Draggable horizontal slider + colored background cards
  세부 스토리: 수강 전/후 변화, 구체적 성과, 수업 기간 포함
*/

const STORIES = [
    {
        quote:
            "코딩이라곤 'Hello World'밖에 몰랐던 아이가, 코딩쏙에서 6개월 만에 정보처리기능사 실기를 한 번에 합격했습니다. C언어 기초부터 포인터, 구조체까지 체계적으로 배우니 실기 점수 82점으로 여유 있게 통과했어요. 선생님이 오답 노트를 매주 정리해주신 게 큰 도움이 됐습니다.",
        name: "김O준 학부모",
        secondary: "초등 6학년 · C언어 기초 → 정보처리기능사 합격",
        duration: "수강 6개월",
        achievement: "정보처리기능사 실기 82점 합격",
        photo: null,
    },
    {
        quote:
            "학교 방과후 수업으로는 한계가 있었는데, 코딩쏙에서 Python을 배우면서 직접 2D 슈팅 게임을 만들었어요. 선생님이 Pygame 라이브러리부터 충돌 판정 알고리즘까지 하나하나 알려주셨고, 완성한 게임을 학교 IT 동아리에서 발표해 금상을 받았습니다.",
        name: "이O서",
        secondary: "중학 2학년 · Python 게임 개발",
        duration: "수강 8개월",
        achievement: "교내 IT 동아리 금상 수상",
        photo: null,
    },
    {
        quote:
            "정보올림피아드 경시 대회를 독학으로 준비하다 한계를 느꼈는데, 코딩쏙에서 BFS/DFS부터 DP, 그리디 알고리즘까지 유형별로 풀어보며 실력이 확 늘었어요. 특히 시간 복잡도 분석 특강이 큰 도움이 되어서, 대전 지역 대회에서 동상을 수상했습니다.",
        name: "박O현 학부모",
        secondary: "고등 1학년 · 정보올림피아드 경시",
        duration: "수강 10개월",
        achievement: "대전 지역 정보올림피아드 동상",
        photo: null,
    },
    {
        quote:
            "학생부종합 전형을 준비하면서 소프트웨어 관련 활동이 부족했는데, 코딩쏙에서 3개월간 '우리 동네 분리수거 알리미' 앱을 기획부터 개발, 배포까지 완성했어요. 이 프로젝트 경험을 면접에서 설명하니 면접관분들이 굉장히 관심을 보이셨고, 대학에 합격했습니다.",
        name: "윤O현",
        secondary: "고등 2학년 · 프로젝트 포트폴리오",
        duration: "수강 5개월",
        achievement: "SW 특기자 전형 합격",
        photo: null,
    },
    {
        quote:
            "아이가 수학을 너무 싫어했는데, 코딩쏙의 사고력 수학 수업에서 코드로 도형을 그리고 패턴을 만들면서 '수학이 이렇게 재밌는 거였어?'라고 처음으로 말했어요. 4개월 후 수학 성적이 70점대에서 92점으로 올랐고, 이제는 스스로 문제를 풀려고 합니다.",
        name: "강O미 학부모",
        secondary: "초등 4학년 · 사고력 수학",
        duration: "수강 4개월",
        achievement: "수학 성적 70점 → 92점",
        photo: null,
    },
    {
        quote:
            "다른 대형 학원에서는 20명이 같이 수업받아서 아이가 질문도 못 하고 뒤처졌는데, 코딩쏙은 1:4 소수정예라 모르는 건 바로 물어볼 수 있어서 확실히 달랐어요. 스크래치에서 시작해 지금은 C언어로 간단한 계산기 프로그램도 혼자 만듭니다. 아이의 자신감이 완전히 달라졌어요.",
        name: "한O민 학부모",
        secondary: "초등 5학년 · 스크래치 → C언어 전환",
        duration: "수강 7개월",
        achievement: "C언어 자체 프로젝트 완성",
        photo: null,
    },
    {
        quote:
            "중3이 되면서 논리력이 부족하다는 걸 느꼈는데, C/C++ 심화 수업에서 포인터와 메모리 관리를 배우며 '왜 이렇게 동작하는지'를 깊이 이해하게 됐어요. 코딩 실력만 늘 줄 알았는데, 학교 수학·과학 성적까지 함께 올라서 부모님이 놀라셨습니다.",
        name: "정O환",
        secondary: "중학 3학년 · C/C++ 심화",
        duration: "수강 9개월",
        achievement: "내신 수학·과학 2등급 달성",
        photo: null,
    },
    {
        quote:
            "초등 2학년이라 너무 어릴까 걱정했는데, 블록코딩으로 시작하니 아이가 마치 레고 조립하듯 즐겁게 배웠어요. 3개월 만에 '바다 속 물고기 잡기' 게임을 완성했고, 지금은 변수와 반복문 개념을 자연스럽게 이해합니다. 일찍 시작하길 정말 잘했어요.",
        name: "송O진 학부모",
        secondary: "초등 2학년 · 블록코딩 입문",
        duration: "수강 3개월",
        achievement: "첫 게임 프로젝트 완성",
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
                                        {/* Achievement badge */}
                                        <div style={{
                                            display: "flex", alignItems: "center", gap: 8,
                                            padding: "8px 16px", margin: "12px 20px 0",
                                            borderRadius: 10,
                                            background: "rgba(79, 70, 229, 0.06)",
                                            border: "1px solid rgba(79, 70, 229, 0.1)",
                                        }}>
                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="#4F46E5" strokeWidth="1.5" strokeLinejoin="round" />
                                            </svg>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "#4F46E5" }}>{story.achievement}</span>
                                            <span style={{ fontSize: 11, color: "#94a3b8", marginLeft: "auto" }}>{story.duration}</span>
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

                                    {/* Connecting lines */}
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
