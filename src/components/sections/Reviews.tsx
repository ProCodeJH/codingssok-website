"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  코딩쏙 — Reviews Section
  Pixel-perfect nodcoding clone: img logos, sr-only /5, animated counter, rating line
  Structure matches: .s-reviews > .u-container > h2 + ul.s__reviews > li.s__review
*/

const REVIEWS = [
    {
        name: "네이버 스마트플레이스",
        logo: "/images/reviews-naver.svg",
        color: "#FFBABA",     // brand-7
        score: 4.9,
        href: "https://map.naver.com",
    },
    {
        name: "카카오맵",
        logo: "/images/reviews-kakao.svg",
        color: "#FFD37D",     // brand-2
        score: 4.8,
        href: "https://map.kakao.com",
    },
    {
        name: "구글 리뷰",
        logo: "/images/reviews-google.svg",
        color: "#77C6B3",     // brand-4
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
        >
            <div className="u-container">
                <h2 className="s__title t-h-4xl">Reviews</h2>

                <ul className="s__reviews js-reviews">
                    {REVIEWS.map((r, i) => (
                        <motion.li
                            key={r.name}
                            className={`s__review${isInView ? " is-inview" : ""}`}
                            initial={{ opacity: 0, y: 40 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: 0.15 * i,
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <a
                                href={r.href}
                                className="s__review__link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {/* Logo — img like nodcoding */}
                                <img
                                    loading="lazy"
                                    src={r.logo}
                                    alt={r.name}
                                    className="s__review__logo js-logo"
                                />

                                {/* Rating block with colored bg */}
                                <div
                                    className="s__review__rating js-rating"
                                    style={{ "--review-color": r.color } as React.CSSProperties}
                                >
                                    <div className="s__review__rating__note js-note">
                                        <div
                                            className="s__review__rating__counter js-counter"
                                            data-note={r.score}
                                        >
                                            {r.score}
                                        </div>

                                        <div className="u-sr-only">/5</div>
                                    </div>

                                    <div className="s__review__rating__line js-line" />
                                </div>
                            </a>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
