"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowRight } from "lucide-react";

export default function FloatingCTA() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // 스크롤 300px 이후에 등장
        const handleScroll = () => {
            setIsVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed bottom-6 right-6 z-50"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                >
                    {/* 확장된 패널 */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                className="absolute bottom-20 right-0 w-72 bg-white rounded-2xl shadow-2xl shadow-blue-500/20 border border-blue-100 overflow-hidden"
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 20, scale: 0.9 }}
                                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* 헤더 */}
                                <div className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5 text-white">
                                    <p className="font-bold text-lg">무료 상담 신청</p>
                                    <p className="text-sm text-blue-100 mt-1">궁금한 점을 편하게 물어보세요!</p>
                                </div>
                                {/* 본문 */}
                                <div className="p-5 space-y-3">
                                    <a
                                        href="tel:042-123-4567"
                                        className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                                            📞
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">전화 상담</p>
                                            <p className="text-xs text-gray-500">042-123-4567</p>
                                        </div>
                                        <ArrowRight size={16} className="text-blue-400 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                    <a
                                        href="#contact"
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center gap-3 p-3 rounded-xl bg-cyan-50 hover:bg-cyan-100 transition-colors group"
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white flex-shrink-0 shadow-md">
                                            ✉️
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-gray-900">온라인 문의</p>
                                            <p className="text-xs text-gray-500">빠른 답변 보장</p>
                                        </div>
                                        <ArrowRight size={16} className="text-cyan-400 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* 메인 버튼 */}
                    <motion.button
                        onClick={() => setIsOpen(!isOpen)}
                        className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/40 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="상담 신청"
                    >
                        {/* Pulse glow ring */}
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 animate-ping opacity-20" />
                        <AnimatePresence mode="wait">
                            {isOpen ? (
                                <motion.span
                                    key="close"
                                    initial={{ rotate: -90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: 90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <X size={22} />
                                </motion.span>
                            ) : (
                                <motion.span
                                    key="open"
                                    initial={{ rotate: 90, opacity: 0 }}
                                    animate={{ rotate: 0, opacity: 1 }}
                                    exit={{ rotate: -90, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <MessageCircle size={22} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
