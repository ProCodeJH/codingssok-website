"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Sparkles } from "lucide-react";

const faqs = [
    { q: "수업은 어떤 방식으로 진행되나요?", a: "소수정예(4~6명) 그룹 수업으로 진행되며, 개인별 맞춤 피드백을 제공합니다." },
    { q: "코딩을 처음 배우는데 바로 C언어로 시작해도 되나요?", a: "초보자는 스크래치/엔트리로 시작하여 컴퓨팅 사고력을 먼저 기른 후 C언어로 진입하시는 것을 권장합니다." },
    { q: "수업 시간과 요일은 어떻게 되나요?", a: "평일 14시~21시 사이에 진행되며, 상담 시 원하시는 시간대를 선택하실 수 있습니다." },
    { q: "학부모가 학습 진도를 확인할 수 있나요?", a: "네, 전용 학부모 앱을 통해 실시간으로 학습 진도와 피드백을 확인하실 수 있습니다." },
    { q: "공모전이나 자격증 준비도 가능한가요?", a: "네, 정보올림피아드, SW공모전, 정보처리기능사 등 목표에 맞춘 집중 케어 프로그램을 운영하고 있습니다." },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="w-full bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden flex justify-center" style={{ paddingTop: '180px', paddingBottom: '180px' }}>
            {/* 배경 효과 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl" />
                {/* 그리드 패턴 */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '80px' }}
                >
                    {/* 3D 아이콘 */}
                    <motion.div
                        initial={{ scale: 0.8, rotateY: -30 }}
                        whileInView={{ scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ rotateY: 15, scale: 1.1 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl mb-8 shadow-2xl shadow-blue-500/30"
                        style={{
                            perspective: '1000px',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <MessageCircle size={32} className="text-white" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        자주 묻는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">질문</span>
                    </h2>
                    <p className="text-lg text-gray-500">
                        궁금한 점이 있으시면 언제든 문의해주세요
                    </p>
                </motion.div>

                {/* FAQ 아코디언 - 3D 카드 */}
                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20, rotateX: -10 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            whileHover={{
                                y: -4,
                                transition: { duration: 0.2 }
                            }}
                            style={{ perspective: '1000px' }}
                            className="group"
                        >
                            {/* 카드 글로우 */}
                            {openIndex === i && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-xl opacity-10 -z-10"
                                />
                            )}

                            <div className={`relative bg-white/80 backdrop-blur-xl rounded-2xl border-2 overflow-hidden transition-all duration-300 ${openIndex === i
                                    ? 'border-blue-400 shadow-xl shadow-blue-500/10'
                                    : 'border-gray-100 shadow-lg hover:border-blue-200 hover:shadow-xl'
                                }`}>
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className={`w-full flex items-center justify-between p-6 text-left transition-colors ${openIndex === i ? 'bg-gradient-to-r from-blue-50/50 to-cyan-50/50' : 'hover:bg-gray-50/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        {/* 3D 번호 배지 */}
                                        <motion.span
                                            className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-bold transition-all duration-300 ${openIndex === i
                                                    ? 'bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                                                    : 'bg-gray-100 text-gray-500'
                                                }`}
                                            whileHover={{ scale: 1.1, rotate: 5 }}
                                            style={{
                                                transformStyle: 'preserve-3d',
                                                transform: openIndex === i ? 'translateZ(10px)' : 'none'
                                            }}
                                        >
                                            {i + 1}
                                        </motion.span>
                                        <span className={`font-semibold text-lg transition-colors ${openIndex === i ? 'text-blue-700' : 'text-gray-900'}`}>
                                            {faq.q}
                                        </span>
                                    </div>
                                    <motion.div
                                        animate={{ rotate: openIndex === i ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className={`flex-shrink-0 ml-4 w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${openIndex === i ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                                            }`}
                                    >
                                        <ChevronDown size={20} />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {openIndex === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-2">
                                                <div className="pl-14 border-l-2 border-gradient-to-b from-blue-400 to-cyan-400 ml-1">
                                                    <p className="text-gray-600 leading-relaxed text-lg">
                                                        {faq.a}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <p className="text-gray-500 mb-6 text-lg">더 궁금한 점이 있으신가요?</p>
                    <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg rounded-2xl shadow-xl shadow-blue-500/30"
                        whileHover={{ scale: 1.03, y: -4, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Sparkles size={20} />
                        무료 상담 신청하기
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
