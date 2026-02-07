"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/*
  코딩쏙 — Reviews Section (nodcoding style)
  Rating logos with animated counter scores
*/

const REVIEWS = [
    {
        name: "네이버 스마트플레이스",
        logo: null, // Text-based logo
        logoText: "N",
        logoColor: "#03C75A",
        score: 4.9,
        href: "#",
    },
    {
        name: "카카오맵",
        logo: null,
        logoText: "K",
        logoColor: "#FEE500",
        logoTextColor: "#3C1E1E",
        score: 4.8,
        href: "#",
    },
    {
        name: "구글 리뷰",
        logo: null,
        logoText: "G",
        logoColor: "#4285F4",
        score: 4.9,
        href: "#",
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
                    style={{
                        marginBottom: "3rem",
                    }}
                >
                    Reviews
                </motion.h2>

                {/* Reviews List */}
                <ul className="s__reviews">
                    {REVIEWS.map((r, i) => (
                        <motion.li
                            key={r.name}
                            className="s__review"
                            initial={{ opacity: 0, y: 30 }}
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
                                {/* Logo */}
                                <div
                                    className="s__review__logo"
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 16,
                                        background: r.logoColor,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 36,
                                        fontWeight: 700,
                                        color: r.logoTextColor || "#fff",
                                    }}
                                >
                                    {r.logoText}
                                </div>

                                {/* Rating */}
                                <div className="s__review__rating">
                                    <div className="s__review__rating__note">
                                        <div className="s__review__rating__counter">
                                            {r.score}
                                        </div>
                                        <span className="s__review__rating__max">/5</span>
                                    </div>
                                    <div className="s__review__rating__name">{r.name}</div>
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
