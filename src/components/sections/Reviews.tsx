"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  코딩쏙 — Reviews Section (nodcoding-faithful clone)
  Large colored blocks with rounded corners, big rating counters, progress lines
*/

const REVIEWS = [
    {
        name: "네이버 스마트플레이스",
        logoText: "N",
        color: "#FFBABA",     // brand-7 pink
        score: 4.9,
        href: "https://map.naver.com",
    },
    {
        name: "카카오맵",
        logoText: "K",
        color: "#FFD37D",     // brand-2 gold
        score: 4.8,
        href: "https://map.kakao.com",
    },
    {
        name: "구글 리뷰",
        logoText: "G",
        color: "#77C6B3",     // brand-4 teal
        score: 4.9,
        href: "https://maps.google.com",
    },
];

export default function Reviews() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section
            ref={ref}
            className="s-reviews"
            style={{
                padding: "var(--section-spacing) 0",
                background: "var(--color-white)",
            }}
        >
            <div className="u-container">
                {/* Title */}
                <motion.h2
                    className="s__title t-h-4xl"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Reviews
                </motion.h2>

                {/* Reviews List */}
                <ul className="s__reviews js-reviews">
                    {REVIEWS.map((r, i) => (
                        <motion.li
                            key={r.name}
                            className="s__review"
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: 0.15 * i,
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ "--review-color": r.color } as React.CSSProperties}
                        >
                            <a
                                href={r.href}
                                className="s__review__link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {/* Logo */}
                                <div className="s__review__logo">
                                    <span className="s__review__logo__text">
                                        {r.logoText}
                                    </span>
                                    <span className="s__review__logo__name">
                                        {r.name}
                                    </span>
                                </div>

                                {/* Rating */}
                                <div className="s__review__rating">
                                    <div className="s__review__rating__note">
                                        <div className="s__review__rating__counter">
                                            {r.score}
                                        </div>
                                        <div className="s__review__rating__slash">/5</div>
                                    </div>
                                    <div className="s__review__rating__line" />
                                </div>
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
