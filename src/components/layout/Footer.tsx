"use client";

import Link from "next/link";

/*
  Footer — exact nodcoding site-foot pattern
  CTA section with decorative shape + bottom bar with links
*/

export default function Footer() {
    return (
        <footer className="site-foot" data-plr-component="site-foot">
            <div className="u-container">
                {/* CTA row */}
                <div className="s__cta">
                    <div>
                        <h2 className="s__cta__title t-h-2xs">
                            코딩의 시작,
                            <br />
                            코딩쏙에서.
                        </h2>
                        <p className="s__cta__text t-t-lg">
                            현직 IT 전문가의 소수 정예 코딩 교육.
                            <br />
                            코드를 직접 치며 배우는 실전 수업.
                        </p>
                    </div>
                    <div className="s__cta__link">
                        <Link href="#contact" className="btn-pill">
                            상담 신청
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                            >
                                <path
                                    d="M1 7h11M8 3l4 4-4 4"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    </div>
                    {/* Decorative shape */}
                    <div className="s__cta__shape" aria-hidden="true" />
                </div>
            </div>

            {/* Bottom bar */}
            <div className="u-container">
                <div className="s__foot">
                    <ul className="s__foot__menu">
                        <li>
                            <Link href="#curriculum">과정</Link>
                        </li>
                        <li>
                            <Link href="#pricing">수강료</Link>
                        </li>
                        <li>
                            <Link href="#faq">FAQ</Link>
                        </li>
                        <li>
                            <Link href="#contact">상담</Link>
                        </li>
                    </ul>

                    <span className="s__copyright">
                        &copy; {new Date().getFullYear()} 코딩쏙
                    </span>

                    <div className="s__signature">
                        <a
                            href="tel:010-7566-7229"
                            style={{
                                fontSize: 14,
                                color: "var(--color-grey)",
                            }}
                        >
                            📞 010-7566-7229
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
