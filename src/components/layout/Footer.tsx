"use client";

import Link from "next/link";

/*
  Footer — exact nodcoding site-foot pattern
  Structure:
    footer.site-foot
      div.b-separator.u-container    (thin horizontal line)
      div.u-container
        div.s__cta                   (CTA row: content + link + shape)
          div.s__cta__content        (title + text)
          div.s__cta__link           (apply/contact button)
          div.s__cta__shape          (decorative circle)
        div.s__foot                  (bottom bar: menu + copyright)
          ul.s__foot__menu           (links)
          span.s__copyright
*/

export default function Footer() {
    return (
        <footer className="site-foot" data-plr-component="site-foot">
            {/* Separator line */}
            <div
                className="b-separator u-container"
                data-plr-component="b-separator"
            >
                <div className="b__line" />
            </div>

            <div className="u-container">
                {/* CTA row */}
                <div className="s__cta">
                    <div className="s__cta__content">
                        <h2 className="s__cta__title t-h-2xs">
                            코딩의 시작,
                            <br />
                            코딩쏙에서.
                        </h2>
                        <div className="s__cta__text t-t-lg">
                            현직 IT 전문가의 소수 정예 코딩 교육.
                            <br />
                            코드를 직접 치며 배우는 실전 수업.
                        </div>
                    </div>

                    <div className="s__cta__link">
                        <Link
                            href="tel:010-7566-7229"
                            className="btn-plain btn-plain--lg btn-plain--secondary"
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

                    {/* Decorative shape */}
                    <div className="s__cta__shape" aria-hidden="true" />
                </div>

                {/* Bottom bar */}
                <div className="s__foot">
                    <ul id="menu-footer-menu" className="s__foot__menu">
                        <li>
                            <Link href="#pricing">과정</Link>
                        </li>
                        <li>
                            <Link href="#faq">FAQ</Link>
                        </li>
                        <li>
                            <Link href="#contact">상담</Link>
                        </li>
                        <li>
                            <Link href="/parent">학부모</Link>
                        </li>
                        <li>
                            <Link href="/teacher/login">선생님</Link>
                        </li>
                        <li>
                            <Link href="/trial">무료 체험</Link>
                        </li>
                        <li>
                            <a href="tel:010-7566-7229">📞 010-7566-7229</a>
                        </li>
                    </ul>

                    <span className="s__copyright">
                        &copy; {new Date().getFullYear()} 코딩쏙
                    </span>
                </div>
            </div>
        </footer>
    );
}
