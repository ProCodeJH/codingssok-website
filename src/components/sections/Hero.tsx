"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Phone, MessageCircle, Shield, Award, Users } from "lucide-react";
import LetterReveal from "@/components/ui/LetterReveal";
import SVGPillButton from "@/components/ui/SVGPillButton";
import EyeTracker from "@/components/ui/EyeTracker";
import { useMousePosition } from "@/components/effects/MouseTracker";

const trustBadges = [
    { icon: Shield, label: "현직 IT 전문가" },
    { icon: Award, label: "8년 교육 경력" },
    { icon: Users, label: "500+ 수강생" },
];

/* ── Animated SVG Illustration ── */
function CodingIllustration() {
    const mouse = useMousePosition();
    const offsetX = (mouse.progressX - 0.5) * 20;
    const offsetY = (mouse.progressY - 0.5) * 15;

    return (
        <motion.div
            className="relative w-full h-full"
            animate={{ x: offsetX, y: offsetY }}
            transition={{ type: "spring", damping: 30, stiffness: 100 }}
        >
            <svg viewBox="0 0 500 500" className="w-full h-full" fill="none">
                {/* Monitor */}
                <motion.rect
                    x="80" y="60" width="340" height="240" rx="16"
                    fill="#1F2937" stroke="#374151" strokeWidth="2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                />
                {/* Screen content - code lines */}
                {[0, 1, 2, 3, 4, 5].map((i) => (
                    <motion.rect
                        key={i}
                        x={110 + (i % 3) * 8}
                        y={90 + i * 30}
                        width={80 + Math.random() * 160}
                        height="14"
                        rx="3"
                        fill={["#60A5FA", "#34D399", "#F59E0B", "#A78BFA", "#FB7185", "#22D3EE"][i]}
                        opacity="0.6"
                        initial={{ width: 0 }}
                        animate={{ width: 80 + ((i * 37) % 160) }}
                        transition={{ duration: 0.6, delay: 0.6 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    />
                ))}
                {/* Monitor stand */}
                <motion.path
                    d="M220 300 L280 300 L300 360 L200 360 Z"
                    fill="#374151"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                />
                {/* Keyboard */}
                <motion.rect
                    x="150" y="370" width="200" height="30" rx="6"
                    fill="#4B5563" stroke="#6B7280" strokeWidth="1"
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                />
                {/* Floating shapes - mouse reactive */}
                <motion.circle
                    cx="430" cy="120" r="25"
                    fill="#3B82F6" opacity="0.3"
                    animate={{ y: [0, -12, 0], x: offsetX * 0.5 }}
                    transition={{ y: { repeat: Infinity, duration: 3 }, x: { type: "spring" } }}
                />
                <motion.rect
                    x="50" y="350" width="40" height="40" rx="8"
                    fill="#8B5CF6" opacity="0.25"
                    animate={{ rotate: [0, 45, 0], x: offsetX * -0.3 }}
                    transition={{ rotate: { repeat: Infinity, duration: 6 }, x: { type: "spring" } }}
                />
                <motion.polygon
                    points="430,350 460,400 400,400"
                    fill="#10B981" opacity="0.3"
                    animate={{ y: [0, 8, 0], x: offsetX * 0.4 }}
                    transition={{ y: { repeat: Infinity, duration: 4 }, x: { type: "spring" } }}
                />
            </svg>
        </motion.div>
    );
}

export default function Hero() {
    /* ── Typing animation ── */
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

    /* ── Parallax ── */
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    return (
        <section ref={sectionRef} id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
            {/* Background blobs with parallax */}
            <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY, opacity }}>
                <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[120px]" />
                <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-cyan-100/40 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-100/30 rounded-full blur-[80px]" />
            </motion.div>

            <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 grid lg:grid-cols-2 gap-16 items-center w-full">
                {/* Left — text */}
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

                    {/* Headline — LetterReveal */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-[1.1] tracking-[-0.03em] mb-4">
                        <LetterReveal className="block" delay={0.3} stagger={0.04}>
                            AI 시대 역량을
                        </LetterReveal>
                        <LetterReveal className="block mt-2" delay={0.7} stagger={0.04}>
                            &apos;쏙&apos; 채우는 코딩 교육
                        </LetterReveal>
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

                    {/* CTA — SVGPillButton */}
                    <motion.div
                        className="flex flex-wrap gap-4 justify-center lg:justify-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <SVGPillButton href="tel:042-123-4567" variant="primary" size="lg">
                            <Phone size={16} /> 전화 상담
                        </SVGPillButton>
                        <SVGPillButton href="#contact" variant="secondary" size="lg">
                            <MessageCircle size={16} /> 카카오톡 문의
                        </SVGPillButton>
                    </motion.div>

                    {/* Trust badges */}
                    <motion.div
                        className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
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

                {/* Right — SVG illustration + EyeTracker */}
                <div className="hidden lg:block relative h-[600px]">
                    <CodingIllustration />

                    {/* Eye tracker - nodcoding signature */}
                    <motion.div
                        className="absolute bottom-8 right-8"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
                    >
                        <EyeTracker size={100} pupilColor="#1F2937" secondaryColor="#3B82F6" />
                    </motion.div>

                    {/* Floating badge */}
                    <motion.div
                        className="absolute top-[40%] right-[10%] px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-100 z-20"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                    >
                        <span className="text-xs font-semibold text-gray-700">합격률 95% ✨</span>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
