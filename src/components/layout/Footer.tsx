"use client";

import Link from "next/link";

/*
  Footer — nodcoding style
  Clean minimal footer with links + copyright
*/

export default function Footer() {
    return (
        <footer
            style={{
                padding: "var(--section-spacing-sm) 0 var(--section-spacing-sm)",
                background: "var(--color-black)",
                color: "var(--color-grey-1)",
            }}
        >
            <div className="container-nod">
                {/* Top row: Logo + links */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                        gap: 40,
                        paddingBottom: 40,
                        borderBottom: "1px solid rgba(255,255,255,0.08)",
                    }}
                >
                    {/* Logo */}
                    <div>
                        <Link
                            href="/"
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 16,
                            }}
                        >
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    background: "var(--color-brand-1)",
                                    borderRadius: 8,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>쏙</span>
                            </div>
                            <span style={{ fontWeight: 600, fontSize: 16, color: "var(--color-white)" }}>
                                코딩쏙
                            </span>
                        </Link>
                        <p style={{ fontSize: 13, color: "var(--color-grey)", maxWidth: 300, lineHeight: 1.6 }}>
                            현직 IT 전문가의 소수 정예 코딩 교육.
                            <br />
                            코드를 직접 치며 배우는 실전 수업.
                        </p>
                    </div>

                    {/* Link columns */}
                    <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
                        <div>
                            <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--color-white)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                과정
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                                {["C언어", "Python", "알고리즘", "자격증", "AI"].map((t) => (
                                    <li key={t}>
                                        <Link href="#curriculum" style={{ fontSize: 14, color: "var(--color-grey-1)", transition: "color 0.2s" }}>
                                            {t}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--color-white)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                안내
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                                {[
                                    { name: "수강료", href: "#pricing" },
                                    { name: "FAQ", href: "#faq" },
                                    { name: "상담 신청", href: "#contact" },
                                ].map((l) => (
                                    <li key={l.name}>
                                        <Link href={l.href} style={{ fontSize: 14, color: "var(--color-grey-1)", transition: "color 0.2s" }}>
                                            {l.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ fontSize: 13, fontWeight: 600, color: "var(--color-white)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                                연락처
                            </h4>
                            <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                                <li>
                                    <a href="tel:010-7566-7229" style={{ fontSize: 14, color: "var(--color-grey-1)" }}>
                                        📞 010-7566-7229
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:codingssok@gmail.com" style={{ fontSize: 14, color: "var(--color-grey-1)" }}>
                                        ✉ codingssok@gmail.com
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingTop: 24,
                        flexWrap: "wrap",
                        gap: 16,
                    }}
                >
                    <p style={{ fontSize: 13, color: "var(--color-grey)" }}>
                        &copy; {new Date().getFullYear()} 코딩쏙. All rights reserved.
                    </p>
                    <div style={{ display: "flex", gap: 20 }}>
                        <Link href="/privacy" style={{ fontSize: 13, color: "var(--color-grey)" }}>
                            개인정보처리방침
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
