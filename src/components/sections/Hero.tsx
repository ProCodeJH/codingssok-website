"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center bg-white pt-20 md:pt-0">
            {/* Subtle Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 w-full py-16 md:py-24">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full mb-8"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-sm font-medium text-gray-600">대전 유성구 · 정원 마감 임박</span>
                        </motion.div>

                        {/* Headline */}
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.15] tracking-tight">
                            코딩, 제대로
                            <br />
                            <span className="text-gray-400">배우는 곳</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg text-gray-500 mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed">
                            C·Python 텍스트 코딩 중심.
                            <br />
                            현직 개발자가 프로젝트부터 자격증까지 책임집니다.
                        </p>

                        {/* CTA */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <motion.a
                                href="#contact"
                                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                무료 상담 신청
                                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </motion.a>
                            <motion.a
                                href="#curriculum"
                                className="inline-flex items-center justify-center px-8 py-4 text-gray-700 font-semibold rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                커리큘럼 보기
                            </motion.a>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-center lg:justify-start gap-8">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">50+</p>
                                <p className="text-sm text-gray-500">수강생</p>
                            </div>
                            <div className="w-px h-10 bg-gray-200" />
                            <div>
                                <p className="text-2xl font-bold text-gray-900">98%</p>
                                <p className="text-sm text-gray-500">만족도</p>
                            </div>
                            <div className="w-px h-10 bg-gray-200" />
                            <div>
                                <p className="text-2xl font-bold text-gray-900">5년+</p>
                                <p className="text-sm text-gray-500">교육 경력</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative hidden lg:block"
                    >
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100">
                            <Image
                                src="/images/classroom1.png"
                                alt="코딩쏙 수업 현장"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Overlay Card */}
                            <motion.div
                                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-lg"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                                        <span className="text-white font-bold">쏙</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">실시간 학습 관리</p>
                                        <p className="text-sm text-gray-500">진도 · 과제 · 출결 확인</p>
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
