"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Heart } from "lucide-react";

export default function Footer() {
    return (
        <footer className="w-full relative overflow-hidden">
            {/* CTA 섹션 - 프리미엄 다크 */}
            <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 relative" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
                {/* 배경 효과 */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
                    {/* 그리드 패턴 */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* 3D 뱃지 */}
                        <motion.div
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05, rotate: 3 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/80 mb-10"
                        >
                            <Sparkles size={16} className="text-cyan-400" />
                            지금 시작하세요
                        </motion.div>

                        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            꿈이 있으시군요.
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                코딩쏙이 함께할게요.
                            </span>
                        </h2>
                        <p className="text-lg lg:text-xl text-gray-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                            상담부터 수업, 포트폴리오까지 —
                            <br />
                            모든 학습의 방향을 직접 이끌어드립니다.
                        </p>

                        {/* 3D CTA 버튼 */}
                        <motion.a
                            href="#contact"
                            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-blue-500/40"
                            whileHover={{
                                scale: 1.05,
                                y: -6,
                                boxShadow: "0 30px 60px rgba(59, 130, 246, 0.5)",
                                rotateX: 5
                            }}
                            whileTap={{ scale: 0.98 }}
                            style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                        >
                            무료 상담 예약 <ArrowRight size={20} />
                        </motion.a>
                    </motion.div>
                </div>
            </div>

            {/* 푸터 하단 */}
            <div className="bg-gray-950 py-8 border-t border-white/5">
                <div className="max-w-6xl mx-auto px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* 로고 */}
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                                <span className="text-white text-sm font-bold">쏙</span>
                            </div>
                            <span className="font-bold text-white">코딩쏙</span>
                        </div>

                        {/* 저작권 */}
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                            Made with <Heart size={14} className="text-red-500 fill-red-500" /> by CodingSSok
                        </p>

                        {/* 연락처 */}
                        <p className="text-gray-500 text-sm">
                            대전 유성구 봉명동 · 010-1234-5678
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
