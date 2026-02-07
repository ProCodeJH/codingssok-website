"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
    const [showBackToTop, setShowBackToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => { setShowBackToTop(window.scrollY > 300); };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

    return (
        <>
            <footer className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <div className="grid md:grid-cols-4 gap-12 mb-16">
                        <div className="md:col-span-1">
                            <Link href="/" className="inline-flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-lg">쏙</span>
                                </div>
                                <span className="text-xl font-bold text-gray-900">코딩쏙</span>
                            </Link>
                            <p className="text-gray-500 text-sm leading-relaxed">C·Python 중심 텍스트코딩 전문 학원</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">교육 과정</h4>
                            <ul className="space-y-2">
                                <li><Link href="#curriculum" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">커리큘럼</Link></li>
                                <li><Link href="#pricing" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">수강료</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">지원</h4>
                            <ul className="space-y-2">
                                <li><Link href="#faq" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">FAQ</Link></li>
                                <li><Link href="#contact" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">상담 신청</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-4">연락처</h4>
                            <ul className="space-y-2">
                                <li className="text-sm text-gray-500">010-7566-7229</li>
                                <li className="text-sm text-gray-500">대전 유성구 테크노중앙로 67</li>
                                <li className="text-sm text-gray-500">평일 14:00 - 21:00</li>
                            </ul>
                        </div>
                    </div>
                    <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-sm text-gray-400">© 2026 코딩쏙. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">개인정보처리방침</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">이용약관</Link>
                        </div>
                    </div>
                </div>
            </footer>

            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        transition={{ duration: 0.3 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center hover:bg-gray-700 hover:scale-110 transition-all cursor-pointer"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
