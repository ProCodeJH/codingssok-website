"use client";

import { motion } from "framer-motion";
import { ChevronDown, Sparkles, Code2, Cpu, Zap, GraduationCap } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0D0D14] to-[#12121A]">
                {/* Gradient Mesh */}
                <div className="absolute inset-0 gradient-mesh opacity-60" />

                {/* Grid Pattern */}
                <div className="absolute inset-0 geometric-grid opacity-30" />

                {/* Glowing Orbs */}
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#0066FF] rounded-full blur-[200px]"
                />
                <motion.div
                    animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.28, 0.15] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-[#00E5FF] rounded-full blur-[180px]"
                />
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#7C3AED] rounded-full blur-[150px]"
                />
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[
                    { top: "12%", left: "8%", delay: 0, icon: Code2, size: "w-10 h-10" },
                    { top: "20%", right: "12%", delay: 0.3, icon: Cpu, size: "w-8 h-8" },
                    { bottom: "25%", left: "5%", delay: 0.6, icon: Zap, size: "w-9 h-9" },
                    { bottom: "15%", right: "8%", delay: 0.9, icon: GraduationCap, size: "w-10 h-10" },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 0.6, scale: 1 }}
                        transition={{ delay: item.delay + 1.2, duration: 0.8 }}
                        className="absolute"
                        style={{ top: item.top, left: item.left, right: item.right, bottom: item.bottom }}
                    >
                        <motion.div
                            animate={{ y: [-8, 8, -8], rotate: [0, 5, 0, -5, 0] }}
                            transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }}
                            className="p-4 glass-premium rounded-2xl"
                        >
                            <item.icon className={`${item.size} text-[#00E5FF]`} />
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10 pt-24">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="inline-flex items-center gap-3 badge badge-glow mb-10"
                    >
                        <Sparkles className="w-4 h-4" aria-hidden="true" />
                        <span className="font-medium">IT 아빠들이 선택한 코딩교육</span>
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="font-display text-5xl md:text-6xl lg:text-8xl font-black leading-[1.05] mb-8 tracking-tight"
                    >
                        <span className="text-white">AI 시대 역량을</span>
                        <br />
                        <span className="gradient-text glow-text">&apos;쏙&apos;</span>
                        <span className="text-white"> 채우는 학원</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-lg md:text-xl lg:text-2xl text-white/50 mb-12 max-w-2xl mx-auto leading-relaxed font-medium"
                    >
                        C·Python 중심{" "}
                        <span className="text-[#00E5FF] font-semibold">텍스트코딩</span> 강화
                        <br className="hidden sm:block" />
                        프로젝트 · 공모전 · 자격증 완벽 대비
                    </motion.p>

                    {/* Keyword Tags - VOM Academy Style */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                        className="flex flex-wrap justify-center gap-3 mb-14 max-w-3xl mx-auto"
                    >
                        {["C언어", "Python", "Arduino", "알고리즘", "자료구조", "정보올림피아드", "취업포트폴리오", "1:1 멘토링"].map((tag, i) => (
                            <motion.span
                                key={tag}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.9 + i * 0.05 }}
                                className="px-4 py-2 text-sm font-medium text-white/70 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-colors cursor-default"
                            >
                                {tag}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="flex flex-col sm:flex-row gap-5 justify-center"
                    >
                        <motion.a
                            href="#contact"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn btn-primary text-lg px-12 py-5 rounded-2xl font-bold shadow-2xl shadow-[#0066FF]/30"
                        >
                            🎯 무료 상담 신청
                        </motion.a>
                        <motion.a
                            href="#curriculum"
                            whileHover={{ scale: 1.03, y: -2 }}
                            whileTap={{ scale: 0.97 }}
                            className="btn btn-secondary text-lg px-12 py-5 rounded-2xl font-bold"
                        >
                            📚 커리큘럼 보기
                        </motion.a>
                    </motion.div>

                    {/* Stats Row */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2 }}
                        className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
                    >
                        {[
                            { value: "5", label: "트랙 커리큘럼", suffix: "개" },
                            { value: "10", label: "교육 경력", suffix: "년+" },
                            { value: "1:1", label: "맞춤 멘토링", suffix: "" },
                            { value: "100", label: "수강생 만족도", suffix: "%" },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.3 + i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-3xl md:text-4xl lg:text-5xl font-black gradient-text tabular-nums">
                                    {stat.value}
                                    <span className="text-xl md:text-2xl">{stat.suffix}</span>
                                </div>
                                <div className="text-sm text-white/40 mt-2 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 text-white/30"
                >
                    <span className="text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
                    <ChevronDown className="w-5 h-5" aria-hidden="true" />
                </motion.div>
            </motion.div>
        </section>
    );
}
