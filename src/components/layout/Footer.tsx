"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <>
            {/* CTA Section */}
            <section className="py-40 bg-white text-center relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-50 to-transparent rounded-full opacity-50" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="heading-hero mb-6">
                            꿈이 있으시군요.
                            <br />
                            <span className="text-gray-400">코딩쏙이 함께할게요.</span>
                        </h2>
                        <p className="text-body-lg mb-10 max-w-md mx-auto">
                            상담부터 수업, 포트폴리오까지 —
                            <br />
                            모든 복잡한 일은 저희가 처리합니다.
                        </p>
                        <motion.a
                            href="#contact"
                            className="btn-primary px-10 py-4 text-base"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            무료 상담 예약 <span className="opacity-60">→</span>
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        {/* Logo & Tagline */}
                        <div className="md:col-span-1">
                            <Link href="/" className="flex items-center gap-2 mb-4">
                                <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">쏙</span>
                                </div>
                                <span className="font-semibold">코딩쏙</span>
                            </Link>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                AI 시대 역량을 &apos;쏙&apos; 채우는
                                <br />
                                코딩 교육 전문 학원
                            </p>
                        </div>

                        {/* 교육 과정 */}
                        <div>
                            <h4 className="font-semibold text-sm mb-5">교육 과정</h4>
                            <ul className="space-y-3">
                                <li><Link href="#curriculum" className="footer-link">커리큘럼</Link></li>
                                <li><Link href="#services" className="footer-link">서비스</Link></li>
                                <li><Link href="#pricing" className="footer-link">수강료</Link></li>
                            </ul>
                        </div>

                        {/* 지원 */}
                        <div>
                            <h4 className="font-semibold text-sm mb-5">지원</h4>
                            <ul className="space-y-3">
                                <li><Link href="#faq" className="footer-link">자주 묻는 질문</Link></li>
                                <li><Link href="#contact" className="footer-link">상담 신청</Link></li>
                            </ul>
                        </div>

                        {/* 연락처 */}
                        <div>
                            <h4 className="font-semibold text-sm mb-5">연락처</h4>
                            <ul className="space-y-3 text-sm text-gray-500">
                                <li>📞 010-7566-7229</li>
                                <li>📍 대전 유성구 테크노중앙로 67</li>
                                <li>🕐 평일 14:00 - 21:00</li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-gray-400">
                            © 2025 코딩쏙. All rights reserved.
                        </p>
                        <p className="text-xs text-gray-400">
                            대전 유성구 테크노중앙로 67 엑스포타워 5층
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
}
