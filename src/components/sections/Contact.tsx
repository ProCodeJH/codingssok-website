"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/*
  Contact / CTA — exact nodcoding s-content-1 pattern
  Background shape on right side, content on left with title + body text + CTA btn
  Structure: div.s-content-1 > u-container > div.s__inner > div.s__content + div.s__shape
*/

export default function Contact() {
    const ref = useRef<HTMLDivElement>(null);
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
        <div
            ref={ref}
            id="contact"
            className={`s-content-1${isIn ? " is-in" : ""}`}
            data-plr-component="s-content-1"
        >
            {/* Background — nodcoding uses a rounded shaped bg */}
            <div className="s__background" />

            <div className="u-container">
                <div className="s__inner">
                    {/* Content column */}
                    <div className="s__content">
                        <h2 className="s__title t-h-2xs">
                            코딩의 시작,
                            <br />
                            코딩쏙에서.
                        </h2>
                        <div className="s__text t-t-lg">
                            <p>
                                현직 IT 전문가의 소수 정예 코딩 교육.
                                <br />
                                무료 체험 수업으로 시작하세요.
                            </p>
                        </div>
                        <div className="s__cta">
                            <Link
                                href="tel:010-7566-7229"
                                className="btn-plain s__cta__btn"
                                data-plr-component="btn-plain"
                            >
                                <span className="btn-plain__inner">
                                    <span className="btn-plain__text">
                                        상담 신청
                                    </span>
                                    <span className="btn-plain__arrow" />
                                </span>
                            </Link>
                        </div>
                    </div>

                    {/* Decorative shape */}
                    <div className="s__shape" aria-hidden="true">
                        <div className="s__shape__circle" />
                    </div>
                </div>
            </div>
        </div>
    );
}
