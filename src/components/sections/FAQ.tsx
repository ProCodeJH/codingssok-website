"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

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
        <section id="faq" className="w-full bg-white flex justify-center" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
            <div className="w-full max-w-3xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '60px' }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        자주 묻는 질문
                    </h2>
                    <p className="text-gray-500">
                        궁금한 점이 있으시면 언제든 문의해주세요
                    </p>
                </motion.div>

                <div className="space-y-3">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`rounded-xl overflow-hidden transition-colors ${openIndex === i ? 'bg-gray-50' : 'bg-white border border-gray-200'
                                }`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className="font-medium text-gray-900">{faq.q}</span>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown size={18} className="text-gray-400" />
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
                                        <p className="px-5 pb-5 text-gray-600 leading-relaxed">
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
                        className="inline-block px-8 py-3.5 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
                    >
                        상담 신청하기
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
