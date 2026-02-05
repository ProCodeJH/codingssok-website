"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

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
        <section id="faq" className="w-full bg-gradient-to-b from-white to-gray-50 flex justify-center" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
            <div className="w-full max-w-3xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '80px' }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 rounded-full text-sm font-medium mb-6">
                        <HelpCircle size={16} />
                        FAQ
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        자주 묻는 질문
                    </h2>
                    <p className="text-lg text-gray-500">
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
                            className={`rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i
                                    ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200/50'
                                    : 'bg-white border border-gray-100 hover:border-gray-200'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className={`font-semibold ${openIndex === i ? 'text-blue-700' : 'text-gray-900'}`}>
                                    {faq.q}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${openIndex === i ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'
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
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="px-6 pb-6 text-gray-600 leading-relaxed">
                                            {faq.a}
                                        </p>
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
                    className="text-center mt-12"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/25"
                    >
                        상담 신청하기
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
