"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle } from "lucide-react";

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
        <section id="faq" className="w-full bg-gray-50 flex justify-center" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
            <div className="w-full max-w-3xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '60px' }}
                >
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6 shadow-lg shadow-blue-500/30">
                        <MessageCircle size={24} className="text-white" />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        자주 묻는 질문
                    </h2>
                    <p className="text-gray-500">
                        궁금한 점이 있으시면 언제든 문의해주세요
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${openIndex === i
                                    ? 'border-blue-400 shadow-xl shadow-blue-500/10'
                                    : 'border-gray-100 shadow-sm hover:border-gray-200 hover:shadow-md'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className={`w-full flex items-center justify-between p-6 text-left transition-colors ${openIndex === i ? 'bg-blue-50/50' : 'hover:bg-gray-50'
                                    }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold transition-colors ${openIndex === i
                                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white'
                                            : 'bg-gray-100 text-gray-500'
                                        }`}>
                                        {i + 1}
                                    </span>
                                    <span className={`font-medium transition-colors ${openIndex === i ? 'text-blue-700' : 'text-gray-900'}`}>
                                        {faq.q}
                                    </span>
                                </div>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === i ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'
                                        }`}
                                >
                                    <ChevronDown size={18} />
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
                                            <div className="pl-12 border-l-2 border-blue-200 ml-4">
                                                <p className="text-gray-600 leading-relaxed">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-500 mb-6">더 궁금한 점이 있으신가요?</p>
                    <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full shadow-lg shadow-blue-500/30"
                        whileHover={{ scale: 1.03, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        무료 상담 신청하기
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
