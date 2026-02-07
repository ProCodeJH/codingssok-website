"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";
import Marquee from "@/components/ui/Marquee";
import LetterReveal from "@/components/ui/LetterReveal";
import SVGPillButton from "@/components/ui/SVGPillButton";
import EyeTracker from "@/components/ui/EyeTracker";
import { useMousePosition } from "@/components/effects/MouseTracker";

const trustItems = ["Python", "C/C++", "Arduino", "알고리즘", "정보올림피아드", "앱 개발", "자격증", "AI 기초", "데이터 분석", "웹 개발"];

export default function Footer() {
    const [showBackToTop, setShowBackToTop] = useState(false);
    const mouse = useMousePosition();

    useEffect(() => {
        const handleScroll = () => { setShowBackToTop(window.scrollY > 300); };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => { window.scrollTo({ top: 0, behavior: "smooth" }); };

    // Mouse-reactive gradient angle
    const gradientAngle = Math.round(mouse.progressX * 45 + 135);

    return (
        <>
            {/* CTA Section — nodcoding style with eye + mouse-reactive bg */}
            <section
                className="py-32 relative overflow-hidden"
                style={{
                    background: `linear-gradient(${gradientAngle}deg, #111827 0%, #1F2937 50%, #111827 100%)`,
                    transition: "background 0.5s ease",
                }}
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
                </div>
                <div className="relative z-10 max-w-4xl mx-auto px-8 lg:px-12 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                        {/* Eye tracker — nodcoding footer signature */}
                        <motion.div
                            className="flex justify-center mb-10"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, type: "spring" }}
                        >
                            <EyeTracker size={120} pupilColor="#1F2937" secondaryColor="#3B82F6" />
                        </motion.div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
                            <LetterReveal className="block text-white" delay={0.1} stagger={0.04}>
                                꿈이 있으시군요.
                            </LetterReveal>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                                <LetterReveal className="inline" delay={0.6} stagger={0.04}>
                                    코딩쏙이 함께할게요.
                                </LetterReveal>
                            </span>
                        </h2>
                        <p className="text-lg text-gray-400 mb-12 max-w-lg mx-auto">상담부터 수업, 포트폴리오까지 —<br />모든 학습의 방향을 직접 이끌어드립니다.</p>
                        <SVGPillButton href="#contact" variant="secondary" size="lg">
                            무료 상담 예약
                        </SVGPillButton>
                    </motion.div>
                </div>
            </section>

            {/* Trust Marquee Band */}
            <div className="py-6 bg-gray-900 border-t border-gray-800">
                <Marquee duration={20} direction="left" pauseOnHover>
                    {trustItems.map((item, i) => (
                        <span key={i} className="text-sm font-medium text-gray-400 px-4 py-1.5 border border-gray-700 rounded-full whitespace-nowrap">
                            {item}
                        </span>
                    ))}
                </Marquee>
            </div>

            {/* Achievement Gallery */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">우리 학생들의 성과</h3>
                        <p className="text-gray-500">자격증 취득부터 대회 수상까지</p>
                    </motion.div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[{ src: "/images/programming-cert.png", alt: "Certificate" }, { src: "/images/medal.png", alt: "Medal" }, { src: "/images/award.png", alt: "Award" }, { src: "/images/happy.png", alt: "Happy student" }].map((img, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="relative aspect-square rounded-2xl overflow-hidden group shadow-lg">
                                <Image src={img.src} alt={img.alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 bg-gray-50 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <div className="grid md:grid-cols-5 gap-12 mb-16">
                        <div className="md:col-span-2">
                            <Link href="/" className="inline-flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-xl">쏙</span>
                                </div>
                                <span className="text-2xl font-bold text-gray-900">코딩쏙</span>
                            </Link>
                            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">C·Python 중심 텍스트코딩 전문 학원. IT 현직 전문가가 직접 가르칩니다.</p>
                        </div>
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
                    <div className="pt-10 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-sm text-gray-400">© 2026 코딩쏙. All rights reserved.</p>
                        <div className="flex gap-8">
                            <Link href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">개인정보처리방침</Link>
                            <Link href="#" className="text-sm text-gray-400 hover:text-gray-900 transition-colors">이용약관</Link>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to top */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button initial={{ opacity: 0, scale: 0.8, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 20 }} transition={{ duration: 0.3 }}
                        onClick={scrollToTop} className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gray-900 text-white shadow-2xl flex items-center justify-center hover:bg-gray-700 hover:scale-110 transition-all cursor-pointer"
                        whileHover={{ y: -3 }} whileTap={{ scale: 0.9 }}>
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </>
    );
}
