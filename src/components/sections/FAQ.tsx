"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    { q: "수업은 어떤 방식으로 진행되나요?", a: "소수정예(4~6명) 그룹 수업으로 진행되며, 개인별 맞춤 피드백을 제공합니다." },
    { q: "코딩을 처음 배우는데 바로 C언어로 시작해도 되나요?", a: "처음은 스크래치/엔트리로 시작 후 자연스럽게 텍스트 코딩으로 넘어갑니다." },
    { q: "수업 시간과 요일은 어떻게 되나요?", a: "평일 14:00~21:00, 주말 10:00~18:00. 학생 일정에 맞춰 조정 가능합니다." },
    { q: "학부모가 학습 진도를 확인할 수 있나요?", a: "네! 실시간 학습 관리 시스템으로 진도, 과제, 출결을 확인하실 수 있습니다." },
    { q: "공모전이나 자격증 준비도 가능한가요?", a: "정보올림피아드, SW 공모전, 정보처리기능사 대비를 지원합니다." },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">FAQ</p>
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">자주 묻는 질문</h2>
                </motion.div>

                <div className="space-y-3 mb-12">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.03 }}
                            className="border border-gray-100 rounded-xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50"
                            >
                                <span className="font-semibold text-gray-900">{faq.q}</span>
                                <motion.div animate={{ rotate: openIndex === i ? 180 : 0 }}>
                                    <ChevronDown size={20} className="text-gray-400" />
                                </motion.div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: "auto" }}
                                        exit={{ height: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-5 pb-5">
                                            <p className="text-gray-500">{faq.a}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center">
                    <motion.a
                        href="#contact"
                        className="inline-flex items-center px-8 py-4 bg-gray-900 text-white font-semibold rounded-full"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        상담 신청하기
                    </motion.a>
                </div>
            </div>
        </section>
    );
}
