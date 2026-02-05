"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Award, Users } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 pt-20 md:pt-0">
            {/* Ultra Premium Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 -right-20 w-[400px] h-[400px] bg-gradient-to-br from-purple-300/30 to-pink-300/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 w-full py-12 md:py-24">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1, duration: 0.5 }}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 rounded-full mb-8 backdrop-blur-sm"
                        >
                            <Sparkles size={16} className="text-blue-600" />
                            <span className="text-sm font-semibold text-blue-700">AI 시대의 코딩 교육</span>
                        </motion.div>

                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight">
                            <span className="text-gray-900">
                                프리미엄
                            </span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x">
                                코딩 교육
                            </span>
                        </h1>

                        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-8 sm:mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                            C·Python 중심 텍스트코딩 강화로
                            <br className="hidden sm:block" />
                            <span className="text-gray-900 font-bold">프로젝트·공모전·자격증</span>까지.
                        </p>

                        {/* Premium CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10 sm:mb-12">
                            <motion.a
                                href="#contact"
                                className="group px-8 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white text-base font-bold rounded-2xl hover:shadow-2xl hover:shadow-gray-900/30 transition-all flex items-center justify-center gap-3"
                                whileHover={{ scale: 1.03, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                무료 상담 신청
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </motion.a>
                            <motion.a
                                href="#curriculum"
                                className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-900 text-base font-bold rounded-2xl border-2 border-gray-200 hover:border-gray-300 hover:bg-white transition-all flex items-center justify-center shadow-lg shadow-gray-100/50"
                                whileHover={{ scale: 1.03, y: -3 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                커리큘럼 보기
                            </motion.a>
                        </div>

                        {/* Premium Trust Badges */}
                        <motion.div
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <motion.div
                                className="flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50"
                                whileHover={{ y: -2, scale: 1.02 }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-md">
                                    <Award size={18} className="text-white" />
                                </div>
                                <span className="text-sm text-gray-800 font-bold">정보올림피아드 수상</span>
                            </motion.div>
                            <motion.div
                                className="flex items-center gap-3 px-5 py-3 bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50"
                                whileHover={{ y: -2, scale: 1.02 }}
                            >
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-md">
                                    <Users size={18} className="text-white" />
                                </div>
                                <span className="text-sm text-gray-800 font-bold">현직 개발자 강사진</span>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Ultra Premium Device Showcase */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative hidden lg:block h-[600px]"
                    >
                        {/* Glow Effect Behind Devices */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-3xl" />

                        {/* Tablet - Main */}
                        <motion.div
                            className="absolute left-0 top-8 z-10"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Image
                                src="/images/ipad-Photoroom.png"
                                alt="Learning dashboard"
                                width={420}
                                height={320}
                                className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                            />
                        </motion.div>

                        {/* Phone - Floating */}
                        <motion.div
                            className="absolute right-0 bottom-8 z-30"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            <Image
                                src="/images/iphone-Photoroom.png"
                                alt="Mobile app"
                                width={180}
                                height={360}
                                className="drop-shadow-[0_20px_50px_rgba(0,0,0,0.25)]"
                            />
                        </motion.div>

                        {/* Premium Floating Badge */}
                        <motion.div
                            className="absolute top-0 right-8 z-40 bg-white/95 backdrop-blur-xl px-6 py-4 rounded-2xl shadow-2xl border border-white/50"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                                <span className="text-sm font-bold text-gray-800">실시간 학습 관리</span>
                            </div>
                        </motion.div>

                        {/* Premium Stats Badge */}
                        <motion.div
                            className="absolute bottom-32 left-8 z-40 bg-white/95 backdrop-blur-xl px-6 py-5 rounded-2xl shadow-2xl border border-white/50"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wider">이번 주 진도</p>
                            <p className="text-3xl font-black text-gray-900">87%</p>
                            <div className="w-full h-2 bg-gray-100 rounded-full mt-3 overflow-hidden">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-full"
                                    initial={{ width: 0 }}
                                    animate={{ width: "87%" }}
                                    transition={{ duration: 1.5, delay: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
