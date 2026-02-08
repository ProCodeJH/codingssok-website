"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  코딩쏙 — Success Stories (pixel-perfect nodcoding clone)
  Structure: .s-success-stories > h2.b-marquee.b-marquee--green + .u-container > .b-testimonials.b-testimonials--multiple
  Each testimonial: .sb-testimonial > blockquote.sb__quote + .sb__line--before (first only) + .sb__line--after
  Author: .sb__quote__author__photo > img + .sb__quote__author__content > __main + __secondary
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
];

const MARQUEE_TEXT = "수강생 성공 스토리";

export default function Testimonials() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <div
            ref={ref}
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
                    className={`b-testimonials b-testimonials--multiple lg-reveal${isInView ? " is-in" : ""}`}
                    data-plr-component="b-testimonials"
                    data-lg-reveal=""
                >
                    <div className="b__testimonials js-testimonials">
                        <motion.div
                            className="b__testimonials-slider js-slider"
                            drag="x"
                            dragConstraints={{
                                left: -(STORIES.length - 1) * 600,
                                right: 0,
                            }}
                            style={{
                                cursor: "grab",
                                userSelect: "none",
                                touchAction: "pan-y",
                            }}
                        >
                            {STORIES.map((story, i) => (
                                <motion.div
                                    key={i}
                                    className="sb-testimonial"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={
                                        isInView
                                            ? { opacity: 1, y: 0 }
                                            : {}
                                    }
                                    transition={{
                                        delay: 0.1 * i,
                                        duration: 0.7,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    style={{ touchAction: "pan-y" }}
                                >
                                    <blockquote className="sb__quote">
                                        <div className="sb__quote__inner t-t-xl">
                                            <p className="sb__quote__text">
                                                &ldquo;&nbsp;{story.quote}
                                                &nbsp;&rdquo;
                                            </p>
                                        </div>

                                        <cite className="sb__quote__author t-t-sm">
                                            {/* Photo or fallback icon */}
                                            {story.photo ? (
                                                <span className="sb__quote__author__photo">
                                                    <img
                                                        loading="lazy"
                                                        src={story.photo}
                                                        width={200}
                                                        height={200}
                                                        alt=""
                                                    />
                                                </span>
                                            ) : (
                                                <span className="sb__quote__author__photo sb__quote__author__photo--initial">
                                                    {story.name.charAt(0)}
                                                </span>
                                            )}

                                            <span className="sb__quote__author__content">
                                                <span className="sb__quote__author__main">
                                                    {story.name}
                                                </span>
                                                <span className="sb__quote__author__secondary">
                                                    {story.secondary}
                                                </span>
                                            </span>
                                        </cite>
                                    </blockquote>

                                    {/* First testimonial gets sb__line--before */}
                                    {i === 0 && (
                                        <div className="sb__line sb__line--before" />
                                    )}
                                    <div className="sb__line sb__line--after" />
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* ── Marquee Title (bottom, like nodcoding) ── */}
            <h2
                className="b-marquee s__title b-marquee--green t-h-2xl"
                data-plr-component="b-marquee"
                style={{ "--duration": "10.52s" } as React.CSSProperties}
            >
                <span className="b__word">{MARQUEE_TEXT}</span>
                {Array.from({ length: 6 }).map((_, i) => (
                    <span
                        key={`btm-${i}`}
                        className="b__ghost"
                        data-title={MARQUEE_TEXT}
                    />
                ))}
            </h2>
        </div>
    );
}
