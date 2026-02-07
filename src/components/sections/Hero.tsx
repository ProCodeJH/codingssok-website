"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MessageCircle, ArrowRight, Shield, Award, Users } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import Parallax from "@/components/ui/Parallax";

const HEADLINE = "AI 시대 역량을";
const HEADLINE2 = "'쏙' 채우는 코딩 교육";

const trustBadges = [
    { icon: Shield, label: "현직 IT 전문가" },
    { icon: Award, label: "8년 교육 경력" },
    { icon: Users, label: "500+ 수강생" },
];

export default function Hero() {
    /* ── Typing animation for sub-headline ── */
    const fullText = "C·Python 중심 텍스트코딩 강화로\n프로젝트 · 공모전 · 자격증까지";
    const [displayText, setDisplayText] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    useEffect(() => {
        if (charIndex < fullText.length) {
            const timeout = setTimeout(() => {
                setDisplayText(fullText.slice(0, charIndex + 1));
                setCharIndex(charIndex + 1);
            }, 40);
            return () => clearTimeout(timeout);
        }
    }, [charIndex, fullText]);

    /* ── Parallax background ── */
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
            {/* Parallax background blobs */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY, opacity }}>
                <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[80px]" />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center w-full">
                {/* Left — text column */}
                <div className="text-center lg:text-left">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-200/50 rounded-full mb-8"
                    >
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-blue-700">2026 신규 모집 중</span>
                    </motion.div>

                    {/* Headline — TextReveal mask animation */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-[-0.03em] mb-4">
                        <TextReveal className="block" delay={0.3} stagger={0.08}>{HEADLINE}</TextReveal>
                        <TextReveal className="block mt-2" delay={0.6} stagger={0.08}>
                            {HEADLINE2}
                        </TextReveal>
                    </h1>

                    {/* Typing sub-headline */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.6 }}
                        className="text-lg text-gray-500 mt-6 mb-10 whitespace-pre-line min-h-[3.5rem]"
                    >
                        {displayText}
                        <motion.span
                            animate={{ opacity: [1, 0] }}
                            transition={{ repeat: Infinity, duration: 0.8 }}
                            className="inline-block w-[2px] h-5 bg-blue-500 ml-1 align-text-bottom"
                        />
                    </motion.p>

                    {/* CTA Buttons — MagneticButton */}
                    <motion.div
                        className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <MagneticButton as="a" href="tel:042-123-4567" className="btn-primary" strength={8}>
                            <Phone size={16} /> 전화 상담
                        </MagneticButton>
                        <MagneticButton as="a" href="#contact" className="btn-secondary" strength={8}>
                            <MessageCircle size={16} /> 카카오톡 문의
                        </MagneticButton>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.8, duration: 0.6 }}
                    >
                        {trustBadges.map((badge, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-500">
                                <badge.icon size={16} className="text-blue-400" />
                                {badge.label}
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Right — floating device showcase with parallax */}
                <Parallax speed={0.3} className="hidden lg:block h-[600px]">
                    <div className="relative w-full h-full">
                        {/* Laptop mockup */}
                        <motion.div
                            className="absolute top-8 left-0 w-[420px] h-[280px] bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl shadow-blue-500/10 p-3"
                            initial={{ opacity: 0, x: 60, rotate: 2 }}
                            animate={{ opacity: 1, x: 0, rotate: 0 }}
                            transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="w-full h-full bg-gray-950 rounded-lg flex items-center justify-center overflow-hidden">
                                <div className="text-[10px] font-mono text-green-400/70 leading-relaxed p-4 w-full">
                                    <p><span className="text-blue-400">def</span> <span className="text-yellow-300">solve</span>(n):</p>
                                    <p className="ml-4"><span className="text-purple-400">if</span> n &lt;= 1:</p>
                                    <p className="ml-8"><span className="text-purple-400">return</span> n</p>
                                    <p className="ml-4"><span className="text-purple-400">return</span> solve(n-1) + solve(n-2)</p>
                                    <p className="mt-2"><span className="text-gray-500"># 결과: 피보나치 수열</span></p>
                                    <p><span className="text-blue-400">print</span>(solve(<span className="text-orange-400">10</span>)) <span className="text-gray-500"># → 55</span></p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Phone mockup */}
                        <motion.div
                            className="absolute bottom-12 right-4 w-[180px] h-[360px] bg-gradient-to-br from-white to-gray-50 rounded-[28px] shadow-2xl shadow-cyan-500/10 p-2 border border-gray-200"
                            initial={{ opacity: 0, y: 80 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-cyan-500 rounded-[22px] flex flex-col items-center justify-center text-white p-4">
                                <div className="text-3xl mb-2">🏆</div>
                                <p className="text-xs font-bold text-center">정보올림피아드</p>
                                <p className="text-xs opacity-70 text-center mt-1">대회 준비반</p>
                            </div>
                        </motion.div>

                        {/* Floating badge */}
                        <motion.div
                            className="absolute top-[45%] right-[25%] px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-100"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                        >
                            <div className="flex items-center gap-2">
                                <ArrowRight size={14} className="text-blue-500" />
                                <span className="text-xs font-semibold text-gray-700">합격률 95%</span>
                            </div>
                        </motion.div>
                    </div>
                </Parallax>
            </div>
        </section>
    );
}
