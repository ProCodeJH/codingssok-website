"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-7xl mx-auto px-8 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 max-w-xl text-center lg:text-left"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600 mb-8">
                            <span className="w-2 h-2 bg-green-500 rounded-full" />
                            대전 유성구 · 정원 마감 임박
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                            코딩, 제대로
                            <br />
                            <span className="text-gray-400">배우는 곳</span>
                        </h1>

                        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                            C·Python 텍스트 코딩 중심.
                            <br />
                            현직 개발자가 프로젝트부터 자격증까지.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <motion.a
                                href="#contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                무료 상담 신청 <ArrowRight size={18} />
                            </motion.a>
                            <motion.a
                                href="#curriculum"
                                className="inline-flex items-center justify-center px-8 py-4 border border-gray-200 text-gray-700 font-semibold rounded-full hover:border-gray-300"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                커리큘럼 보기
                            </motion.a>
                        </div>

                        <div className="flex items-center justify-center lg:justify-start gap-8">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">50+</p>
                                <p className="text-sm text-gray-400">수강생</p>
                            </div>
                            <div className="w-px h-10 bg-gray-200" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">98%</p>
                                <p className="text-sm text-gray-400">만족도</p>
                            </div>
                            <div className="w-px h-10 bg-gray-200" />
                            <div className="text-center">
                                <p className="text-2xl font-bold text-gray-900">5년+</p>
                                <p className="text-sm text-gray-400">교육 경력</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 max-w-lg w-full"
                    >
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100">
                            <Image
                                src="/images/classroom1.png"
                                alt="코딩쏙 수업"
                                fill
                                className="object-cover"
                                priority
                            />
                            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur rounded-2xl p-5">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold">쏙</div>
                                    <div>
                                        <p className="font-semibold text-gray-900">실시간 학습 관리</p>
                                        <p className="text-sm text-gray-500">진도 · 과제 · 출결</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
