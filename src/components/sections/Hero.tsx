"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Code2, Cpu } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0A0A0F] to-[#12121A]">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: "50px 50px",
                    }}
                />

                {/* Glowing Orbs */}
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0066FF] rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00E5FF] rounded-full blur-[150px]"
                />
                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute top-1/2 right-1/3 w-64 h-64 bg-[#7C3AED] rounded-full blur-[120px]"
                />
            </div>

            {/* Floating Code Elements */}
            <div className="absolute inset-0 pointer-events-none">
                {[
                    { top: "15%", left: "10%", delay: 0, icon: Code2 },
                    { top: "25%", right: "15%", delay: 0.5, icon: Cpu },
                    { bottom: "30%", left: "8%", delay: 1, icon: Sparkles },
                    { bottom: "20%", right: "10%", delay: 1.5, icon: Code2 },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 0.4, y: 0 }}
                        transition={{ delay: item.delay + 1, duration: 1 }}
                        className="absolute"
                        style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                    >
                        <motion.div
                            animate={{ y: [-10, 10, -10] }}
                            transition={{ duration: 4 + i, repeat: Infinity }}
                            className="p-4 glass rounded-xl"
                        >
                            <item.icon className="w-8 h-8 text-[#0066FF]" />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-[#00E5FF]" />
                        <span className="text-sm font-medium text-white/80">
                            IT 아빠들이 선택한 코딩교육
                        </span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-5xl md:text-7xl font-extrabold leading-tight mb-6"
                    >
                        AI 시대 역량을
                        <br />
                        <span className="gradient-text">&apos;쏙&apos;</span> 채우는 학원
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-xl md:text-2xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed"
                    >
                        C·Python 중심 텍스트코딩 강화
                        <br />
                        <span className="text-[#00E5FF]">프로젝트 · 공모전 · 자격증</span> 완벽 대비
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 102, 255, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            className="btn text-lg px-8 py-4 rounded-xl font-bold text-white"
                            style={{
                                background: "linear-gradient(135deg, #0066FF 0%, #00E5FF 100%)",
                            }}
                        >
                            🎯 무료 상담 신청
                        </motion.a>
                        <motion.a
                            href="#curriculum"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn text-lg px-8 py-4 rounded-xl font-bold text-white border-2 border-white/20 hover:border-[#0066FF] hover:bg-[#0066FF]/10 transition-all"
                        >
                            📚 커리큘럼 보기
                        </motion.a>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto"
                    >
                        {[
                            { value: "5", label: "트랙 커리큘럼" },
                            { value: "10+", label: "년 교육 경력" },
                            { value: "1:1", label: "맞춤 멘토링" },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold gradient-text">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-white/60 mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-white/50"
                >
                    <span className="text-sm">스크롤</span>
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </section>
    );
}
