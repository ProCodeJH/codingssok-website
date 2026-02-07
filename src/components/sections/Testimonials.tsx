"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/*
  코딩쏙 — Success Stories (nodcoding style)
  Marquee title + horizontal drag testimonial slider
*/

const STORIES = [
    {
        quote: "처음에 코딩이라곤 아무것도 몰랐는데, 코딩쏙에서 C언어부터 차근차근 배우니 정보처리기능사 실기를 한 번에 합격했어요. 체계적인 커리큘럼이 정말 좋았습니다.",
        name: "김O준",
        role: "초등 6학년 · C언어 기초",
        parent: "김O준 학부모",
    },
    {
        quote: "학교에서 배우는 것 보다 훨씬 깊고 재미있어요. 직접 게임도 만들어보고, 공모전 준비도 같이 해서 포트폴리오가 생겼습니다. 자신감이 확 올라갔어요.",
        name: "이O서",
        role: "중학 2학년 · Python",
    },
    {
        quote: "정올 준비 전문 학원을 찾기 어려웠는데, 코딩쏙에서 체계적으로 준비해서 지역 대회 입상까지 할 수 있었습니다. 알고리즘 문제 풀이가 특히 도움이 됐습니다.",
        name: "박O현",
        role: "고등 1학년 · 정보올림피아드",
        parent: "박O현 학부모",
    },
    {
        quote: "정보처리기능사 한 번에 합격했습니다. 실기 위주 수업이 실전에서 정말 도움이 됐어요. 학생부에도 쓸 수 있어서 일석이조였습니다.",
        name: "최O우",
        role: "고등 3학년 · 자격증 준비",
    },
    {
        quote: "아이가 코딩을 어려워했는데, 여기서 배우면서 자신감이 생겼어요. 선생님이 일일이 봐주시니까 따라가는 게 확실히 다릅니다. 소규모 수업이라 집중도가 높아요.",
        name: "강O미",
        role: "초등 4학년 · 스크래치 → C 전환",
        parent: "강O미 학부모",
    },
];

const MARQUEE_TEXT = "수강생 성공 스토리";

export default function Testimonials() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section
            ref={ref}
            className="s-success-stories"
            style={{
                padding: "var(--section-spacing) 0",
                background: "var(--color-beige)",
                overflow: "hidden",
            }}
        >
            {/* ── Marquee Title ── */}
            <h2 className="b-marquee s__title t-h-2xl">
                <span className="b__word">{MARQUEE_TEXT}</span>
                {Array.from({ length: 6 }).map((_, i) => (
                    <span key={i} className="b__ghost" data-title={MARQUEE_TEXT} />
                ))}
            </h2>

            <div className="u-container">
                {/* ── Testimonials Slider ── */}
                <div className="b-testimonials">
                    <div className="b__testimonials">
                        <motion.div
                            className="b__testimonials-slider"
                            drag="x"
                            dragConstraints={{ left: -(STORIES.length - 1) * 600, right: 0 }}
                            style={{ cursor: "grab" }}
                        >
                            {STORIES.map((story, i) => (
                                <motion.div
                                    key={i}
                                    className="sb-testimonial"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{
                                        delay: 0.1 * i,
                                        duration: 0.7,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                >
                                    <blockquote className="sb__quote">
                                        <div className="sb__quote__inner t-t-xl">
                                            <p className="sb__quote__text">
                                                &ldquo;&nbsp;{story.quote}&nbsp;&rdquo;
                                            </p>
                                        </div>

                                        <cite className="sb__quote__author t-t-sm">
                                            <span className="sb__quote__author__icon">
                                                {story.name.charAt(0)}
                                            </span>
                                            <span className="sb__quote__author__content">
                                                <span className="sb__quote__author__main">
                                                    {story.parent || story.name} — {story.role}
                                                </span>
                                            </span>
                                        </cite>
                                    </blockquote>

                                    <div className="sb__line sb__line--after" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
