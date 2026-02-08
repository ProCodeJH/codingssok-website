"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  코딩쏙 — Reviews Section (nodcoding pixel-perfect)
  Title in .u-container, reviews list OUTSIDE container so bars span full viewport width.
  Bars extend from left edge → ~70% width with logo on far right.
*/

const REVIEWS = [
    {
        name: "네이버 스마트플레이스",
        logo: "/images/reviews-naver.svg",
        color: "#FFBABA",
        score: 4.9,
        href: "https://map.naver.com",
    },
    {
        name: "카카오맵",
        logo: "/images/reviews-kakao.svg",
        color: "#FFD37D",
        score: 4.8,
        href: "https://map.kakao.com",
    },
    {
        name: "구글 리뷰",
        logo: "/images/reviews-google.svg",
        color: "#77C6B3",
        score: 4.9,
        href: "https://maps.google.com",
    },
];

export default function Reviews() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <section ref={ref} className="s-reviews">
            {/* Title stays in container for centering */}
            <div className="u-container">
                <h2 className="s__title t-h-4xl">Reviews</h2>
            </div>

            {/* Reviews list OUTSIDE container — bars span full width */}
            <ul className="s__reviews js-reviews">
                {REVIEWS.map((r, i) => (
                    <motion.li
                        key={r.name}
                        className={`s__review${isInView ? " is-inview" : ""}`}
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            delay: 0.15 * i,
                            duration: 0.6,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{
                            "--review-delay": `${0.2 * i}s`,
                        } as React.CSSProperties}
                    >
                        <a
                            href={r.href}
                            className="s__review__link"
                            target="_blank"
                            rel="noreferrer"
                        >
                            {/* Rating block — long colored bar from left */}
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
                                    <div className="s__review__rating__slash">/5</div>
                                </div>

                                <div className="s__review__rating__line js-line" />
                            </div>

                            {/* Logo on the right */}
                            <img
                                loading="lazy"
                                src={r.logo}
                                alt={r.name}
                                className="s__review__logo js-logo"
                            />
                        </a>
                    </motion.li>
                ))}
            </ul>
        </section>
    );
}
