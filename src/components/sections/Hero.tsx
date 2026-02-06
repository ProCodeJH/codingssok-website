"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, Code, Zap, Star } from "lucide-react";

const stats = [
    { value: "50+", label: "수강생", icon: "👨‍💻" },
    { value: "98%", label: "만족도", icon: "⭐" },
    { value: "5년+", label: "교육 경력", icon: "🏆" },
];

const floatingTags = [
    { text: "C언어", delay: 0 },
    { text: "Python", delay: 0.1 },
    { text: "알고리즘", delay: 0.2 },
    { text: "아두이노", delay: 0.3 },
];

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-cosmic noise relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
            <div className="absolute top-20 left-20 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[150px] animate-pulse" />
            <div className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Grid Pattern */}
            <div className="absolute inset-0 grid-pattern opacity-50" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-20">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 max-w-xl text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 glass rounded-full text-sm text-purple-300 mb-8 border border-purple-500/30"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            대전 유성구 · 정원 마감 임박
                        </motion.div>

                        {/* Title */}
                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6 font-display">
                            <span className="text-white">코딩, 제대로</span>
                            <br />
                            <span className="text-gradient animate-gradient">배우는 곳</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                            C·Python 텍스트 코딩 중심.
                            <br />
                            <span className="text-purple-300">현직 개발자</span>가 프로젝트부터 자격증까지.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <motion.a
                                href="#contact"
                                className="btn-cosmic"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                무료 상담 신청 <ArrowRight size={18} />
                            </motion.a>
                            <motion.a
                                href="#curriculum"
                                className="btn-outline"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                커리큘럼 보기
                            </motion.a>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-center lg:justify-start gap-8">
                            {stats.map((stat, i) => (
                                <motion.div
                                    key={i}
                                    className="text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 + i * 0.1 }}
                                >
                                    <p className="text-3xl font-bold text-gradient">{stat.value}</p>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Image / Visual */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex-1 max-w-lg w-full relative"
                    >
                        {/* Floating Tags */}
                        {floatingTags.map((tag, i) => (
                            <motion.div
                                key={i}
                                className="absolute tag z-20"
                                style={{
                                    top: `${20 + i * 25}%`,
                                    left: i % 2 === 0 ? '-10%' : 'auto',
                                    right: i % 2 === 1 ? '-10%' : 'auto',
                                }}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.6 + tag.delay }}
                            >
                                {tag.text}
                            </motion.div>
                        ))}

                        {/* Main Image */}
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-card p-2">
                            <div className="w-full h-full relative rounded-2xl overflow-hidden">
                                <Image
                                    src="/images/classroom1.png"
                                    alt="코딩쏙 수업"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            </div>

                            {/* Overlay Card */}
                            <motion.div
                                className="absolute bottom-6 left-6 right-6 glass rounded-2xl p-5"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                                        <Code size={20} />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-white">실시간 학습 관리</p>
                                        <p className="text-sm text-gray-400">진도 · 과제 · 출결</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Decorative Elements */}
                        <motion.div
                            className="absolute -top-4 -right-4 w-20 h-20 border border-purple-500/30 rounded-full"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1 }}
                        />
                        <motion.div
                            className="absolute -bottom-8 -left-8 w-32 h-32 border border-cyan-500/20 rounded-full"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2 }}
                        />
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                >
                    <div className="w-1.5 h-3 bg-purple-400 rounded-full mt-2" />
                </motion.div>
            </motion.div>
        </section>
    );
}
