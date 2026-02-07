"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  nodcoding "Reviews" section → 코딩쏙 수강 후기
  Horizontal review cards with ratings + quotes
*/

const reviews = [
    {
        name: "김O준 학부모",
        role: "초등 6학년 · C언어 기초",
        quote: "아이가 코딩을 어려워했는데, 여기서 배우면서 자신감이 생겼어요. 선생님이 일일이 봐주시니까 따라가는 게 확실히 다릅니다.",
        rating: 5,
    },
    {
        name: "이O서",
        role: "중학 2학년 · Python",
        quote: "학교에서 배우는 것 보다 훨씬 깊고 재미있어요. 직접 게임도 만들어보고, 공모전 준비도 같이 해서 포트폴리오가 생겼습니다.",
        rating: 5,
    },
    {
        name: "박O현 학부모",
        role: "고등 1학년 · 정보올림피아드",
        quote: "정올 준비 전문 학원을 찾기 어려웠는데, 코딩쏙에서 체계적으로 준비해서 지역 대회 입상까지 할 수 있었습니다.",
        rating: 5,
    },
    {
        name: "최O우",
        role: "고등 3학년 · 자격증",
        quote: "정보처리기능사 한 번에 합격했습니다. 실기 위주 수업이 실전에서 정말 도움이 됐어요. 학생부에도 쓸 수 있어서 일석이조였습니다.",
        rating: 5,
    },
];

export default function Testimonials() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section
            ref={ref}
            style={{
                padding: "var(--section-spacing) 0",
                background: "var(--color-white)",
                overflow: "hidden",
            }}
        >
            <div className="container-nod">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 60 }}
                >
                    <p style={{ fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-1)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Reviews
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))", fontWeight: 600, color: "var(--color-black)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                        수강 후기
                    </h2>
                </motion.div>

                {/* Reviews grid — 2 columns */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
                    {reviews.map((r, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.1 * i, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                padding: 32,
                                background: "var(--color-beige)",
                                borderRadius: 16,
                                display: "flex",
                                flexDirection: "column",
                                gap: 20,
                            }}
                        >
                            {/* Stars */}
                            <div style={{ display: "flex", gap: 2 }}>
                                {Array.from({ length: r.rating }).map((_, j) => (
                                    <svg key={j} width="16" height="16" viewBox="0 0 16 16" fill="var(--color-brand-2)">
                                        <path d="M8 0l2.47 4.99L16 5.81l-4 3.9.94 5.49L8 12.86 3.06 15.2 4 9.71 0 5.81l5.53-.82L8 0z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Quote */}
                            <p style={{ fontSize: "var(--font-size-t-md)", color: "var(--color-black)", lineHeight: 1.6, flex: 1 }}>
                                &ldquo; {r.quote} &rdquo;
                            </p>

                            {/* Author */}
                            <div>
                                <p style={{ fontWeight: 600, fontSize: 14, color: "var(--color-black)" }}>{r.name}</p>
                                <p style={{ fontSize: 13, color: "var(--color-grey)" }}>{r.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
