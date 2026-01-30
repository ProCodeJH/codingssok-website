"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Footer() {
    return (
        <>
            {/* CTA Section */}
            <section className="py-32 bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            꿈이 있으시군요.
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                코딩쏙이 함께할게요.
                            </span>
                        </h2>

                        <p className="text-lg text-gray-400 mb-12 max-w-lg mx-auto">
                            상담부터 수업, 포트폴리오까지 —
                            <br />
                            모든 학습의 방향을 직접가 이끌어드립니다.
                        </p>

                        <motion.a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-10 py-5 bg-white text-gray-900 font-semibold rounded-full hover:scale-105 transition-all shadow-xl"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            무료 상담 예약 →
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <div className="grid md:grid-cols-5 gap-12 mb-16">
                        {/* Logo */}
                        <div className="md:col-span-2">
                            <Link href="/" className="inline-flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">쏙</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">코딩쏙</span>
                            </Link>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                                C·Python 중심 텍스트코딩 전문 학원.
                                IT 현직 전문가가 직접 가르칩니다.
                            </p>
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-5">교육 과정</h4>
                            <ul className="space-y-3">
                                <li><Link href="#curriculum" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">커리큘럼</Link></li>
                                <li><Link href="#services" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">서비스</Link></li>
                                <li><Link href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">수강료</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-5">지원</h4>
                            <ul className="space-y-3">
                                <li><Link href="#faq" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">자주 묻는 질문</Link></li>
                                <li><Link href="#contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">상담 신청</Link></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-gray-900 mb-5">연락처</h4>
                            <ul className="space-y-3">
                                <li className="text-sm text-gray-500">010-7566-7229</li>
                                <li className="text-sm text-gray-500">대전 유성구 테크노중앙로 67</li>
                                <li className="text-sm text-gray-500">평일 14:00 - 21:00</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-gray-400">
                            © 2026 코딩쏙. All rights reserved.
                        </p>
                        <div className="flex gap-8">
                            <Link href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
                                개인정보처리방침
                            </Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">
                                이용약관
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
