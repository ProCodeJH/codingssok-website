"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Phone, MessageCircle } from "lucide-react";

const typingWords = ["프리미엄", "코딩 교육"];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-blue-100/10 to-purple-100/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-12 w-full py-24">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} className="text-center lg:text-left">
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1, duration: 0.5 }} className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-200/50 rounded-full mb-8">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                            <span className="text-sm font-medium text-blue-700">AI 시대의 코딩 교육</span>
                        </motion.div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {typingWords.map((word, wi) => (
                                <span key={wi} className="block">
                                    <span className={wi === 0 ? "text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900" : "text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"}>
                                        {word.split("").map((char, ci) => (
                                            <motion.span key={ci} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + wi * 0.5 + ci * 0.05, duration: 0.3, ease: "easeOut" }} className="inline-block">
                                                {char === " " ? "\u00A0" : char}
                                            </motion.span>
                                        ))}
                                    </span>
                                </span>
                            ))}
                        </h1>

                        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            C·Python 중심 텍스트코딩 강화로 프로젝트·공모전·자격증까지.<br className="hidden md:block" />IT 현직 전문가가 직접 가르칩니다.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-6">
                            <motion.a href="#contact" className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg shadow-gray-900/20 flex items-center justify-center gap-2" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                                무료 상담 신청 <span className="opacity-60">→</span>
                            </motion.a>
                            <motion.a href="tel:010-7566-7229" className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-200 hover:border-gray-300 transition-all flex items-center justify-center gap-2" whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
                                <Phone size={16} className="text-blue-500" /> 전화 상담
                            </motion.a>
                        </div>
                        <div className="flex justify-center lg:justify-start mb-12">
                            <motion.a href="https://pf.kakao.com/_codingssok" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-[#FEE500] text-[#3C1E1E] font-semibold rounded-full hover:brightness-95 transition-all text-sm" whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                                <MessageCircle size={16} /> 카카오톡 상담
                            </motion.a>
                        </div>

                        <motion.div className="flex flex-wrap items-center justify-center lg:justify-start gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.8 }}>
                            <div className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-blue-500" />
                                <span className="text-sm text-gray-600 font-medium">정보올림피아드 수상</span>
                            </div>
                            <div className="flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm">
                                <div className="w-2 h-2 rounded-full bg-green-500" />
                                <span className="text-sm text-gray-600 font-medium">현직 개발자 강사진</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} className="relative hidden lg:block h-[600px]">
                        <motion.div className="absolute left-0 top-8 z-10" animate={{ y: [0, -12, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
                            <Image src="/images/ipad-Photoroom.png" alt="Learning dashboard" width={420} height={320} className="drop-shadow-2xl" />
                        </motion.div>
                        <motion.div className="absolute right-0 bottom-8 z-30" animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
                            <Image src="/images/iphone-Photoroom.png" alt="Mobile app" width={180} height={360} className="drop-shadow-2xl" />
                        </motion.div>
                        <motion.div className="absolute top-0 right-8 z-40 bg-white/90 backdrop-blur-lg px-5 py-3 rounded-2xl shadow-xl border border-gray-100" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}>
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-semibold text-gray-800">실시간 학습 관리</span>
                            </div>
                        </motion.div>
                        <motion.div className="absolute bottom-32 left-8 z-40 bg-white/90 backdrop-blur-lg px-6 py-4 rounded-2xl shadow-xl border border-gray-100" animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                            <p className="text-xs text-gray-500 mb-1">이번 주 진도</p>
                            <p className="text-2xl font-bold text-gray-900">87%</p>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
                                <div className="w-[87%] h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
