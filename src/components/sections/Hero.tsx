"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Users, Star, Award } from "lucide-react";
import CodeRainCanvas from "@/components/effects/CodeRainCanvas";

function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (!isInView) return;
        const steps = 50;
        let step = 0;
        const timer = setInterval(() => {
            step++;
            const progress = step / steps;
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(target * eased));
            if (step >= steps) clearInterval(timer);
        }, duration / steps);
        return () => clearInterval(timer);
    }, [isInView, target, duration]);

    return <span ref={ref}>{count}{suffix}</span>;
}

const titleChars = ["코", "딩", ",", " ", "제", "대", "로"];
const subtitleChars = ["배", "우", "는", " ", "곳"];

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"]
    });
    const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const bgY2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const bgY3 = useTransform(scrollYProgress, [0, 1], [0, -60]);

    return (
        <section ref={sectionRef} className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
            {/* 배경 그라디언트 mesh + 노이즈 + Parallax */}
            <div className="absolute inset-0 pointer-events-none">
                <motion.div style={{ y: bgY1 }} className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
                <motion.div style={{ y: bgY2 }} className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-200/20 rounded-full blur-3xl" />
                <motion.div style={{ y: bgY3 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/20 to-cyan-100/20 rounded-full blur-3xl" />
                {/* 도트 패턴 */}
                <div className="absolute inset-0 opacity-[0.015]" style={{
                    backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
                {/* 노이즈 텍스처 */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
                    <filter id="hero-noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /></filter>
                    <rect width="100%" height="100%" filter="url(#hero-noise)" />
                </svg>
                <CodeRainCanvas />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                        className="flex-1 max-w-xl text-center lg:text-left"
                    >
                        {/* 배지 */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full text-sm text-blue-700 mb-10 shadow-sm"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse" />
                            <span className="font-medium">대전 유성구</span>
                            <span className="text-blue-400">·</span>
                            <span className="text-blue-600 font-semibold">정원 마감 임박</span>
                        </motion.div>

                        {/* 타이틀 - Kinetic Typography */}
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-8">
                            <span className="inline-block">
                                {titleChars.map((char, i) => (
                                    <motion.span
                                        key={`t-${i}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                                        className="inline-block text-gray-900"
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </span>
                            <br />
                            <span className="inline-block">
                                {subtitleChars.map((char, i) => (
                                    <motion.span
                                        key={`s-${i}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"
                                    >
                                        {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                ))}
                            </span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.1, duration: 0.6 }}
                            className="text-lg text-gray-500 mb-12 leading-loose"
                        >
                            <span className="text-blue-600 font-semibold">C·Python</span> 텍스트 코딩 중심.
                            <br />
                            <span className="text-gray-700 font-medium">현직 개발자</span>가 프로젝트부터 자격증까지.
                        </motion.p>

                        {/* 버튼 그룹 */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.3, duration: 0.5 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start mb-14"
                        >
                            <motion.a
                                href="#contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30"
                                whileHover={{ scale: 1.03, y: -3, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                무료 상담 신청 <ArrowRight size={18} />
                            </motion.a>
                            <motion.a
                                href="#curriculum"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-blue-200 text-blue-700 font-semibold rounded-full hover:border-blue-400 hover:bg-blue-50 transition-all"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                커리큘럼 보기
                            </motion.a>
                        </motion.div>

                        {/* 통계 */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.6 }}
                            className="flex items-center justify-center lg:justify-start gap-10 sm:gap-14"
                        >
                            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Users size={18} className="text-blue-500" />
                                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"><AnimatedCounter target={50} suffix="+" /></p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">수강생</p>
                            </motion.div>
                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-blue-200 to-transparent" />
                            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Star size={18} className="text-cyan-500" />
                                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600"><AnimatedCounter target={98} suffix="%" /></p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">만족도</p>
                            </motion.div>
                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-blue-200 to-transparent" />
                            <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Award size={18} className="text-blue-500" />
                                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500"><AnimatedCounter target={5} suffix="년+" /></p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">교육 경력</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Image with floating elements */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 max-w-lg w-full relative"
                    >
                        {/* 플로팅 장식 */}
                        <motion.div
                            className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl opacity-20 blur-sm"
                            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full opacity-15 blur-sm"
                            animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* 메인 이미지 */}
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl shadow-blue-500/10 border border-blue-100/50">
                            <Image
                                src="/images/classroom1.png"
                                alt="코딩쏙 수업"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                            {/* 하단 카드 - 2열 */}
                            <motion.div
                                className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/50"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-3 flex-1">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30 text-sm flex-shrink-0">
                                            쏙
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm">실시간 학습 관리</p>
                                            <p className="text-xs text-gray-500">진도 · 과제 · 출결</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-xs text-green-600 font-medium">LIVE</span>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
