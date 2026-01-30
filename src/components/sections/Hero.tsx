"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-white">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 w-full py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="text-center lg:text-left"
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-block mb-8"
                        >
                            <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                                AI 시대의 코딩 교육
                            </span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-gray-900 leading-tight">
                            역량을 &apos;쏙&apos; 채우는
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                프리미엄 코딩 교육
                            </span>
                        </h1>

                        <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            C·Python 중심 텍스트코딩 강화로 프로젝트, 공모전, 자격증까지.
                            IT 현직 전문가가 직접 설계하고 가르칩니다.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
                            <motion.a
                                href="#contact"
                                className="px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                무료 상담 신청 →
                            </motion.a>
                            <motion.a
                                href="#curriculum"
                                className="px-8 py-4 bg-white text-gray-900 font-medium rounded-full border-2 border-gray-200 hover:border-gray-900 transition-all"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                커리큘럼 보기
                            </motion.a>
                        </div>

                        {/* Trust Badges */}
                        <motion.div
                            className="flex flex-wrap justify-center lg:justify-start gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                정보올림피아드 수상
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span className="w-2 h-2 rounded-full bg-green-500" />
                                현직 개발자 강사진
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Product Shots */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative h-[550px]">
                            {/* Tablet */}
                            <motion.div
                                className="absolute left-0 top-10"
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image
                                    src="/images/dashboard.png"
                                    alt="Learning dashboard"
                                    width={420}
                                    height={320}
                                    className="drop-shadow-2xl"
                                />
                            </motion.div>

                            {/* Phone */}
                            <motion.div
                                className="absolute right-0 bottom-0"
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            >
                                <Image
                                    src="/images/phone.png"
                                    alt="Mobile app"
                                    width={200}
                                    height={400}
                                    className="drop-shadow-2xl"
                                />
                            </motion.div>

                            {/* Floating Badge */}
                            <motion.div
                                className="absolute top-0 right-20 bg-white rounded-2xl px-5 py-4 shadow-xl"
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-sm font-medium text-gray-700">실시간 학습 관리</span>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
