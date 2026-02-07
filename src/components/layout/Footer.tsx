"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Heart, MapPin, Phone, Mail, ArrowUp } from "lucide-react";

export default function Footer() {
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => setShowTop(window.scrollY > 600);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <>
            <footer className="w-full relative overflow-hidden">
                {/* CTA 섹션 */}
                <div className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 relative" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
                        <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                            backgroundSize: '60px 60px'
                        }} />
                        <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
                            <filter id="footer-noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /></filter>
                            <rect width="100%" height="100%" filter="url(#footer-noise)" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
                        >
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

                            <motion.a
                                href="#contact"
                                className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-blue-500/40"
                                whileHover={{
                                    scale: 1.05,
                                    y: -6,
                                    boxShadow: "0 30px 60px rgba(59, 130, 246, 0.5)",
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                무료 상담 예약 <ArrowRight size={20} />
                            </motion.a>
                        </motion.div>
                    </div>
                </div>

                {/* 푸터 하단 — 확장 */}
                <div className="bg-gray-950 py-10 border-t border-white/5">
                    <div className="max-w-6xl mx-auto px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            {/* 로고 + 설명 */}
                            <div>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center">
                                        <span className="text-white text-sm font-bold">쏙</span>
                                    </div>
                                    <span className="font-bold text-white text-lg">코딩쏙</span>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    대전 유성구 소수정예 코딩 교육 전문.
                                    <br />
                                    현직 개발자가 직접 가르칩니다.
                                </p>
                            </div>

                            {/* 연락처 */}
                            <div>
                                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-gray-500 text-sm">
                                        <MapPin size={14} className="text-blue-400 flex-shrink-0" />
                                        대전 유성구 봉명동
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-500 text-sm">
                                        <Phone size={14} className="text-blue-400 flex-shrink-0" />
                                        010-1234-5678
                                    </li>
                                    <li className="flex items-center gap-3 text-gray-500 text-sm">
                                        <Mail size={14} className="text-blue-400 flex-shrink-0" />
                                        codingssok@gmail.com
                                    </li>
                                </ul>
                            </div>

                            {/* 바로가기 */}
                            <div>
                                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
                                <ul className="space-y-3">
                                    {["커리큘럼", "서비스", "수강료", "FAQ"].map((link) => (
                                        <li key={link}>
                                            <a href={`#${link === '커리큘럼' ? 'curriculum' : link === '서비스' ? 'services' : link === '수강료' ? 'pricing' : 'faq'}`}
                                                className="text-gray-500 text-sm hover:text-blue-400 transition-colors">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* 구분선 */}
                        <div className="h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-6" />

                        {/* 저작권 */}
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-gray-600 text-xs">
                                © 2026 코딩쏙. All rights reserved.
                            </p>
                            <p className="text-gray-600 text-xs flex items-center gap-1">
                                Made with <Heart size={12} className="text-red-500 fill-red-500" /> by CodingSSok
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back-to-top */}
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        onClick={scrollToTop}
                        className="fixed bottom-24 right-6 z-40 w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 text-white rounded-full shadow-lg shadow-blue-500/30 flex items-center justify-center hover:shadow-xl hover:shadow-blue-500/40 transition-shadow"
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label="맨 위로 이동"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
