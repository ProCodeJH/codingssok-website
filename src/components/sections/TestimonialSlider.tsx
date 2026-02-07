"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LetterReveal from "@/components/ui/LetterReveal";

interface Testimonial {
    quote: string;
    name: string;
    role: string;
    emoji: string;
}

const testimonials: Testimonial[] = [
    {
        quote: "코딩쏙 덕분에 정보올림피아드 수상할 수 있었어요. 선생님이 정말 잘 가르쳐주세요!",
        name: "김태우 학생",
        role: "정보올림피아드 수상 · 중학교 2학년",
        emoji: "🏆",
    },
    {
        quote: "처음에는 코딩이 어렵다고 생각했는데, 스크래치부터 차근차근 배우니까 재미있었어요.",
        name: "이서현 학생",
        role: "Python 기초반 수료 · 초등학교 5학년",
        emoji: "🌟",
    },
    {
        quote: "아이가 코딩을 배우면서 논리적 사고력이 많이 좋아졌어요. 수학 성적도 올랐습니다.",
        name: "박지은 학부모",
        role: "초4 학부모",
        emoji: "📈",
    },
    {
        quote: "C++ 알고리즘 수업이 정말 체계적이에요. 실전 대회 준비에 큰 도움이 됩니다.",
        name: "최민준 학생",
        role: "KOI 대비반 · 고등학교 1학년",
        emoji: "💻",
    },
    {
        quote: "아두이노 프로젝트 수업이 정말 재미있었어요! 직접 만든 로봇이 움직일 때 너무 신기했어요.",
        name: "정하윤 학생",
        role: "IoT 프로젝트반 · 중학교 1학년",
        emoji: "🤖",
    },
];

export default function TestimonialSlider() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sliderRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
    const x = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"]);

    return (
        <section ref={containerRef} className="py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 lg:px-12 mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                    <LetterReveal stagger={0.03}>수강 후기</LetterReveal>
                </h2>
                <p className="text-lg text-gray-500 max-w-xl">
                    <LetterReveal delay={0.3} stagger={0.01} splitBy="word">
                        코딩쏙과 함께 성장한 학생들의 이야기
                    </LetterReveal>
                </p>
            </div>

            {/* Draggable horizontal slider */}
            <motion.div
                ref={sliderRef}
                className="flex gap-6 cursor-grab active:cursor-grabbing px-8"
                style={{ x }}
                drag="x"
                dragConstraints={{ left: -800, right: 100 }}
                dragElastic={0.1}
            >
                {testimonials.map((t, i) => (
                    <motion.div
                        key={i}
                        className="flex-shrink-0 w-[380px] md:w-[440px] border-l-2 border-gray-200 pl-8 py-4 group"
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Quote */}
                        <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-light italic">
                            &ldquo;&nbsp;{t.quote}&nbsp;&rdquo;
                        </blockquote>

                        {/* Author */}
                        <cite className="flex items-center gap-4 not-italic">
                            <span className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-xl">
                                {t.emoji}
                            </span>
                            <div>
                                <span className="block text-sm font-semibold text-gray-900">{t.name}</span>
                                <span className="block text-xs text-gray-500">{t.role}</span>
                            </div>
                        </cite>

                        {/* Separator line */}
                        {i < testimonials.length - 1 && (
                            <div className="mt-6 h-px bg-gray-100 group-hover:bg-blue-200 transition-colors duration-500" />
                        )}
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
