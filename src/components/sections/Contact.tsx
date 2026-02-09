"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/*
  Contact / CTA section — 코딩쏙 상담 신청
  Uses nodcoding s-content-1 pattern with background shape
  Form with proper CSS classes, no framer-motion
*/

export default function Contact() {
    const ref = useRef<HTMLElement>(null);
    const [isIn, setIsIn] = useState(false);
    const [submitted, setSubmitted] = useState(false);

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const data = new FormData(form);
        console.log("Contact form:", Object.fromEntries(data));
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        form.reset();
    };

    return (
        <section
            ref={ref}
            id="contact"
            className={`s-contact${isIn ? " is-in" : ""}`}
        >
            {/* Background shape */}
            <div className="s__background" />

            <div className="u-container">
                <div className="s__content">
                    <h2 className="s__title">상담 신청</h2>
                    <p className="s__text">
                        수업 방식, 커리큘럼, 시간표 등 궁금한 점이 있으시면
                        언제든 문의해주세요. 24시간 내 답변드립니다.
                    </p>
                </div>

                {/* Form */}
                <form className="s__form" onSubmit={handleSubmit}>
                    <div className="s__form-group">
                        <label className="s__form-label" htmlFor="contact-name">
                            이름 (학생/학부모)
                        </label>
                        <input
                            id="contact-name"
                            name="name"
                            type="text"
                            className="s__form-input"
                            placeholder="홍길동"
                            required
                        />
                    </div>

                    <div className="s__form-group">
                        <label
                            className="s__form-label"
                            htmlFor="contact-phone"
                        >
                            연락처
                        </label>
                        <input
                            id="contact-phone"
                            name="phone"
                            type="tel"
                            className="s__form-input"
                            placeholder="010-1234-5678"
                            required
                        />
                    </div>

                    <div className="s__form-group">
                        <label
                            className="s__form-label"
                            htmlFor="contact-course"
                        >
                            관심 과정
                        </label>
                        <select
                            id="contact-course"
                            name="course"
                            className="s__form-select"
                        >
                            <option value="">선택해주세요</option>
                            <option value="basic">기초 과정 (C/Python)</option>
                            <option value="advanced">
                                심화 과정 (알고리즘)
                            </option>
                            <option value="cert">
                                자격증 과정 (정보처리기능사)
                            </option>
                            <option value="trial">무료 체험 수업</option>
                        </select>
                    </div>

                    <div className="s__form-group">
                        <label
                            className="s__form-label"
                            htmlFor="contact-grade"
                        >
                            학년
                        </label>
                        <select
                            id="contact-grade"
                            name="grade"
                            className="s__form-select"
                        >
                            <option value="">선택해주세요</option>
                            <option value="elem-low">초등 1~3학년</option>
                            <option value="elem-high">초등 4~6학년</option>
                            <option value="middle">중학생</option>
                            <option value="high">고등학생</option>
                            <option value="adult">성인</option>
                        </select>
                    </div>

                    <div className="s__form-group">
                        <label
                            className="s__form-label"
                            htmlFor="contact-message"
                        >
                            문의 사항
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            className="s__form-textarea"
                            placeholder="궁금한 점을 적어주세요"
                            rows={4}
                        />
                    </div>

                    <div className="s__cta">
                        <button type="submit" className="btn-pill">
                            {submitted ? "✓ 전송 완료!" : "상담 신청하기"}
                            {!submitted && (
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
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
