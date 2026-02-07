"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/*
  nodcoding "Apply Now" → 코딩쏙 상담 신청
  Application form with select dropdown + text fields
*/

export default function Contact() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(e.currentTarget);
        try {
            await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(Object.fromEntries(formData)),
            });
            setSubmitted(true);
        } catch {
            alert("전송에 실패했습니다. 전화(010-7566-7229)로 문의해주세요.");
        }
        setIsSubmitting(false);
    };

    return (
        <section
            ref={ref}
            id="contact"
            style={{
                padding: "var(--section-spacing) 0",
                background: "var(--color-black-dark)",
                color: "var(--color-white)",
            }}
        >
            <div className="container-nod" style={{ maxWidth: 700, margin: "0 auto" }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{ marginBottom: 48, textAlign: "center" }}
                >
                    <p style={{ fontSize: "var(--font-size-t-sm)", color: "var(--color-brand-1)", fontWeight: 600, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                        Apply Now
                    </p>
                    <h2 style={{ fontSize: "clamp(2rem, 4vw, var(--font-size-h-2xs))", fontWeight: 600, color: "var(--color-white)", lineHeight: 0.9, letterSpacing: "-0.03em" }}>
                        상담 신청
                    </h2>
                    <p style={{ fontSize: "var(--font-size-t-md)", color: "var(--color-grey-1)", marginTop: 16, lineHeight: 1.5 }}>
                        아래 양식을 작성하시면 빠른 시일 내 연락드리겠습니다.
                    </p>
                </motion.div>

                {submitted ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            textAlign: "center",
                            padding: 60,
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: 20,
                        }}
                    >
                        <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
                        <h3 style={{ fontSize: "var(--font-size-t-xl)", fontWeight: 600, marginBottom: 8 }}>
                            신청이 완료되었습니다!
                        </h3>
                        <p style={{ color: "var(--color-grey-1)" }}>
                            영업일 기준 1일 이내로 연락드리겠습니다.
                        </p>
                    </motion.div>
                ) : (
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ display: "flex", flexDirection: "column", gap: 20 }}
                    >
                        {/* Course select — nodcoding style */}
                        <select
                            name="course"
                            required
                            defaultValue=""
                            style={{
                                width: "100%",
                                padding: "16px 20px",
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: 12,
                                color: "var(--color-white)",
                                fontSize: 15,
                                appearance: "none",
                                cursor: "pointer",
                            }}
                        >
                            <option value="" disabled style={{ color: "#999" }}>관심 과정 선택</option>
                            <option value="c-lang">C언어 기초·심화</option>
                            <option value="python">Python 프로그래밍</option>
                            <option value="algorithm">알고리즘·정보올림피아드</option>
                            <option value="cert">정보처리 자격증</option>
                            <option value="project">앱 개발·공모전</option>
                            <option value="ai">AI 기초·데이터 분석</option>
                        </select>

                        {/* Name + Phone row */}
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                            <input
                                name="name"
                                required
                                placeholder="이름"
                                style={{
                                    padding: "16px 20px",
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: 12,
                                    color: "var(--color-white)",
                                    fontSize: 15,
                                }}
                            />
                            <input
                                name="phone"
                                required
                                placeholder="연락처"
                                type="tel"
                                style={{
                                    padding: "16px 20px",
                                    background: "rgba(255,255,255,0.06)",
                                    border: "1px solid rgba(255,255,255,0.12)",
                                    borderRadius: 12,
                                    color: "var(--color-white)",
                                    fontSize: 15,
                                }}
                            />
                        </div>

                        <input
                            name="email"
                            type="email"
                            placeholder="이메일 (선택)"
                            style={{
                                padding: "16px 20px",
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: 12,
                                color: "var(--color-white)",
                                fontSize: 15,
                            }}
                        />

                        <textarea
                            name="message"
                            placeholder="추가 문의 사항 (선택)"
                            rows={3}
                            style={{
                                padding: "16px 20px",
                                background: "rgba(255,255,255,0.06)",
                                border: "1px solid rgba(255,255,255,0.12)",
                                borderRadius: 12,
                                color: "var(--color-white)",
                                fontSize: 15,
                                resize: "vertical",
                            }}
                        />

                        <p style={{ fontSize: 13, color: "var(--color-grey-1)" }}>
                            제출 시 <a href="/privacy" style={{ color: "var(--color-brand-1)", textDecoration: "underline" }}>개인정보처리방침</a>에 동의하는 것으로 간주합니다.
                        </p>

                        {/* Submit — btn-plain style */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="btn-pill btn-pill--primary"
                            style={{
                                alignSelf: "center",
                                minWidth: 200,
                                justifyContent: "center",
                                opacity: isSubmitting ? 0.6 : 1,
                            }}
                        >
                            {isSubmitting ? "전송 중..." : "상담 신청하기"}
                            {!isSubmitting && (
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </button>
                    </motion.form>
                )}

                {/* Quick contact */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    style={{
                        marginTop: 48,
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        gap: 32,
                        flexWrap: "wrap",
                    }}
                >
                    <a
                        href="tel:010-7566-7229"
                        style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-grey-1)", fontSize: 14 }}
                    >
                        📞 010-7566-7229
                    </a>
                    <a
                        href="mailto:codingssok@gmail.com"
                        style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--color-grey-1)", fontSize: 14 }}
                    >
                        ✉ codingssok@gmail.com
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
