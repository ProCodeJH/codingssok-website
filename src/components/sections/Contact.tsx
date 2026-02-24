"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

/*
  Contact — Coddy 스플릿 스크린 패턴 + 코딩쏙 브랜드
  - 왼쪽: 정보 + 소셜 + 장점 카드 (SVG 아이콘)
  - 오른쪽: 문의 폼 카드 (16px radius)
  - 다크 섹션 배경 (Coddy 그라데이션)
*/

const BENEFITS = [
    {
        title: "1:1 맞춤 커리큘럼",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#EC5212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points="22 4 12 14.01 9 11.01" stroke="#EC5212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "현직 IT 전문가 강사",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="#EC5212" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="12" cy="7" r="4" stroke="#EC5212" strokeWidth="1.5" />
            </svg>
        ),
    },
    {
        title: "주간 학습 리포트",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 20V10M12 20V4M6 20v-6" stroke="#EC5212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: "무료 체험 수업",
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M20 12v10H4V12" stroke="#EC5212" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 7h20v5H2V7z" stroke="#EC5212" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M12 22V7" stroke="#EC5212" strokeWidth="1.5" />
                <path d="M12 7c-1.5-2-3.5-3-5-3s-2.5 1-2 3" stroke="#EC5212" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M12 7c1.5-2 3.5-3 5-3s2.5 1 2 3" stroke="#EC5212" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
];

export default function Contact() {
    const ref = useRef<HTMLDivElement>(null);
    const [isIn, setIsIn] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) { setIsIn(true); obs.disconnect(); } },
            { rootMargin: "-80px" }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            id="contact"
            style={{
                padding: "var(--section-spacing) 0",
                background: "linear-gradient(135deg, #2a2420 0%, #1e1c1a 50%, #252320 100%)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Background glow */}
            <div style={{
                position: "absolute", top: "-20%", right: "-10%",
                width: 500, height: 500, borderRadius: "50%",
                background: "radial-gradient(circle, rgba(236,82,18,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
            }} />

            <div className="u-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 clamp(16px, 3vw, 40px)" }}>
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(32px, 5vw, 80px)",
                    alignItems: "center",
                }}>
                    {/* ── 왼쪽: 정보 ── */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isIn ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span style={{
                            display: "inline-block", fontSize: 12, fontWeight: 700,
                            color: "#EC5212", letterSpacing: "0.15em", textTransform: "uppercase",
                            marginBottom: 16,
                        }}>CONTACT US</span>

                        <h2 style={{
                            fontSize: "clamp(2rem, 4vw, 3.5rem)",
                            fontWeight: 700, color: "#fff", lineHeight: 1.15,
                            marginBottom: 20,
                        }}>
                            코딩의 시작,<br />
                            코딩쏙에서.
                        </h2>

                        <p style={{
                            fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
                            color: "rgba(255,255,255,0.6)", lineHeight: 1.7,
                            marginBottom: 32, maxWidth: 400,
                        }}>
                            현직 IT 전문가의 소수 정예 코딩 교육.<br />
                            무료 체험 수업으로 시작하세요.
                        </p>

                        {/* Benefits grid */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
                            {BENEFITS.map((b, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={isIn ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 10,
                                        padding: "12px 16px", borderRadius: 12,
                                        background: "rgba(255,255,255,0.04)",
                                        border: "1px solid rgba(255,255,255,0.06)",
                                    }}
                                >
                                    <span style={{ display: "flex", flexShrink: 0 }}>{b.icon}</span>
                                    <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.8)" }}>{b.title}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Social / Contact links */}
                        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                            <Link href="tel:010-7566-7229" style={{
                                display: "flex", alignItems: "center", gap: 8,
                                padding: "10px 20px", borderRadius: 32,
                                background: "#EC5212", color: "#fff", textDecoration: "none",
                                fontSize: 14, fontWeight: 700,
                                boxShadow: "0 4px 16px rgba(236,82,18,0.4)",
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                010-7566-7229
                            </Link>
                            <a href="https://blog.naver.com/codingssok" target="_blank" rel="noopener noreferrer" style={{
                                display: "flex", alignItems: "center", gap: 6,
                                padding: "10px 20px", borderRadius: 32,
                                background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.7)",
                                textDecoration: "none", fontSize: 14, fontWeight: 600,
                                border: "1px solid rgba(255,255,255,0.06)",
                            }}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                네이버 블로그
                            </a>
                        </div>
                    </motion.div>

                    {/* ── 오른쪽: 상담 카드 ── */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isIn ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            background: "rgba(58,52,45,0.8)",
                            backdropFilter: "blur(20px)",
                            borderRadius: 16,
                            padding: "clamp(28px, 3vw, 40px)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                        }}
                    >
                        <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#EC5212" strokeWidth="1.5" strokeLinejoin="round" />
                                <path d="M9 12l2 2 4-4" stroke="#EC5212" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            무료 체험 상담
                        </h3>
                        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 24, lineHeight: 1.6 }}>
                            아이의 코딩 적성에 맞는 최적의 트랙을 추천해 드립니다.
                        </p>

                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>학생 이름</label>
                                <input type="text" placeholder="이름을 입력하세요"
                                    style={{
                                        width: "100%", height: 51, borderRadius: 12, border: "none",
                                        background: "#252320", color: "#fff", padding: "0 16px",
                                        fontSize: 14, outline: "none", fontFamily: "inherit",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>연락처</label>
                                <input type="tel" placeholder="010-0000-0000"
                                    style={{
                                        width: "100%", height: 51, borderRadius: 12, border: "none",
                                        background: "#252320", color: "#fff", padding: "0 16px",
                                        fontSize: 14, outline: "none", fontFamily: "inherit",
                                        boxSizing: "border-box",
                                    }}
                                />
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>학년</label>
                                <select style={{
                                    width: "100%", height: 51, borderRadius: 12, border: "none",
                                    background: "#252320", color: "rgba(255,255,255,0.7)", padding: "0 16px",
                                    fontSize: 14, outline: "none", fontFamily: "inherit",
                                    boxSizing: "border-box", appearance: "none",
                                }}>
                                    <option value="">학년 선택</option>
                                    {["초등 1~3", "초등 4~6", "중등", "고등"].map(g => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 6 }}>관심 분야</label>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {["C언어", "Python", "HTML/CSS", "블록코딩", "사고력수학"].map(tag => (
                                        <span key={tag} style={{
                                            padding: "8px 16px", borderRadius: 32,
                                            background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)",
                                            fontSize: 13, fontWeight: 500, cursor: "pointer",
                                            border: "1px solid rgba(255,255,255,0.06)",
                                            transition: "all 0.2s",
                                        }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button style={{
                            width: "100%", height: 47, borderRadius: 12, border: "none",
                            background: "#EC5212", color: "#fff", fontWeight: 700,
                            fontSize: 15, cursor: "pointer", marginTop: 24,
                            fontFamily: "inherit",
                            boxShadow: "0 4px 20px rgba(236,82,18,0.4)",
                            transition: "all 0.2s",
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            무료 체험 신청하기
                        </button>

                        <p style={{
                            fontSize: 12, color: "rgba(255,255,255,0.3)",
                            textAlign: "center", marginTop: 12,
                        }}>
                            상담 신청 후 24시간 이내 연락 드립니다
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
