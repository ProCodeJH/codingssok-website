"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Users, Star, Award } from "lucide-react";

export default function Hero() {
    return (
        <section className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
            {/* 배경 그라디언트 mesh */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-20">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex-1 max-w-xl text-center lg:text-left"
                    >
                        {/* 배지 - 긴급감 강화 */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-full text-sm text-purple-700 mb-8 shadow-sm"
                            animate={{ scale: [1, 1.02, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse" />
                            <span className="font-medium">대전 유성구</span>
                            <span className="text-purple-400">·</span>
                            <span className="text-pink-600 font-semibold">정원 마감 임박</span>
                        </motion.div>

                        {/* 타이틀 - 그라디언트 텍스트 */}
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            <span className="text-gray-900">코딩, 제대로</span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 animate-gradient-x">
                                배우는 곳
                            </span>
                        </h1>

                        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
                            <span className="text-purple-600 font-semibold">C·Python</span> 텍스트 코딩 중심.
                            <br />
                            <span className="text-gray-700 font-medium">현직 개발자</span>가 프로젝트부터 자격증까지.
                        </p>

                        {/* 버튼 그룹 - 세컨더리 버튼 강화 */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                            <motion.a
                                href="#contact"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold rounded-full shadow-lg shadow-purple-500/30"
                                whileHover={{ scale: 1.03, y: -3, boxShadow: "0 20px 40px rgba(168, 85, 247, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                무료 상담 신청 <ArrowRight size={18} />
                            </motion.a>
                            <motion.a
                                href="#curriculum"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-purple-200 text-purple-700 font-semibold rounded-full hover:border-purple-400 hover:bg-purple-50 transition-all"
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                커리큘럼 보기
                            </motion.a>
                        </div>

                        {/* 통계 - 아이콘 + 그라디언트 숫자 */}
                        <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8">
                            <motion.div
                                className="text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <Users size={18} className="text-purple-500" />
                                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">50+</p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">수강생</p>
                            </motion.div>
                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-200 to-transparent" />
                            <motion.div
                                className="text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <Star size={18} className="text-pink-500" />
                                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">98%</p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">만족도</p>
                            </motion.div>
                            <div className="w-px h-12 bg-gradient-to-b from-transparent via-purple-200 to-transparent" />
                            <motion.div
                                className="text-center"
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="flex items-center justify-center gap-2 mb-1">
                                    <Award size={18} className="text-purple-500" />
                                    <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">5년+</p>
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500">교육 경력</p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Image with floating elements */}
                    <motion.div
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="flex-1 max-w-lg w-full relative"
                    >
                        {/* 플로팅 장식 요소들 */}
                        <motion.div
                            className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-20 blur-sm"
                            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.div
                            className="absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full opacity-15 blur-sm"
                            animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* 플로팅 태그들 */}
                        <motion.div
                            className="absolute -top-2 right-8 z-20 px-3 py-1.5 bg-white rounded-full shadow-lg border border-purple-100 text-xs font-medium text-purple-600"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            🐍 Python
                        </motion.div>
                        <motion.div
                            className="absolute top-1/4 -left-4 z-20 px-3 py-1.5 bg-white rounded-full shadow-lg border border-pink-100 text-xs font-medium text-pink-600"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            ⚡ C언어
                        </motion.div>
                        <motion.div
                            className="absolute bottom-1/4 -right-2 z-20 px-3 py-1.5 bg-white rounded-full shadow-lg border border-purple-100 text-xs font-medium text-purple-600"
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            🤖 아두이노
                        </motion.div>

                        {/* 메인 이미지 */}
                        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-2xl shadow-purple-500/10 border border-purple-100/50">
                            <Image
                                src="/images/classroom1.png"
                                alt="코딩쏙 수업"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* 이미지 위 그라디언트 오버레이 */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                            {/* 하단 카드 - 강화 */}
                            <motion.div
                                className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-white/50"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30 animate-pulse">
                                        쏙
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-semibold text-gray-900">실시간 학습 관리</p>
                                        <p className="text-sm text-gray-500">진도 · 과제 · 출결</p>
                                    </div>
                                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
