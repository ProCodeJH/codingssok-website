"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "수업은 어떤 방식으로 진행되나요?",
        a: "소수정예(4~6명) 그룹 수업으로 진행되며, 개인별 맞춤 피드백을 제공합니다. 실습 위주의 프로젝트 기반 학습으로 실력을 키웁니다."
    },
    {
        q: "코딩을 처음 배우는데 바로 C언어로 시작해도 되나요?",
        a: "처음 시작하시는 분들은 스크래치/엔트리로 컴퓨팅 사고력을 배운 후 자연스럽게 텍스트 코딩으로 넘어갑니다."
    },
    {
        q: "수업 시간과 요일은 어떻게 되나요?",
        a: "평일 14:00 ~ 21:00, 주말 10:00 ~ 18:00 운영됩니다. 학생 일정에 맞춰 유연하게 조정 가능합니다."
    },
    {
        q: "학부모가 학습 진도를 확인할 수 있나요?",
        a: "네! 실시간 학습 관리 시스템을 통해 언제든지 진도, 과제 현황, 출결 상태를 확인하실 수 있습니다."
    },
    {
        q: "공모전이나 자격증 준비도 가능한가요?",
        a: "정보올림피아드, SW 공모전, 정보처리기능사 등 다양한 대회와 자격증 준비를 지원합니다."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-32 bg-gradient-to-br from-gray-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24">
                    {/* Left: Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center lg:text-left"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200/50 border border-gray-200 rounded-full mb-6">
                            <span className="text-sm font-medium text-gray-700">FAQ</span>
                        </span>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                            자주 묻는 질문
                        </h2>
                        <p className="text-lg text-gray-500 mb-10">
                            더 궁금한 점이 있으시면 언제든지 상담 신청해주세요.
                        </p>

                        <motion.a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-900 hover:text-white transition-all"
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            상담 신청 <span className="opacity-60">→</span>
                        </motion.a>
                    </motion.div>

                    {/* Right: Accordion */}
                    <div className="space-y-4">
                        {faqs.map((faq, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05, duration: 0.6 }}
                                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900 pr-4 text-sm sm:text-base leading-relaxed">{faq.q}</span>
                                    <motion.div
                                        animate={{ rotate: openIndex === i ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex-shrink-0"
                                    >
                                        <ChevronDown size={20} className="text-gray-400" />
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
                                            <div className="px-6 pb-6">
                                                <p className="text-gray-600 leading-relaxed">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
