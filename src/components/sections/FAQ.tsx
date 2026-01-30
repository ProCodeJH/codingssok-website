"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        q: "수업은 어떤 방식으로 진행되나요?",
        a: "소수정예(4~6명) 그룹 수업으로 진행되며, 개인별 맞춤 피드백을 제공합니다. 실습 위주의 프로젝트 기반 학습으로 실력을 키웁니다. 모든 수업은 IT 현직자 강사가 직접 진행합니다."
    },
    {
        q: "코딩을 처음 배우는데 바로 C언어로 시작해도 되나요?",
        a: "네, 가능합니다! 처음 시작하시는 분들은 스크래치/엔트리로 컴퓨팅 사고력을 배운 후 자연스럽게 텍스트 코딩으로 넘어갑니다. 학생의 수준에 맞춰 맞춤형 커리큘럼을 제공합니다."
    },
    {
        q: "수업 시간과 요일은 어떻게 되나요?",
        a: "평일 14:00 ~ 21:00, 주말 10:00 ~ 18:00 운영됩니다. 학생과 학부모님의 일정에 맞춰 유연하게 시간을 조정할 수 있습니다."
    },
    {
        q: "학부모가 학습 진도를 확인할 수 있나요?",
        a: "네! 실시간 학습 관리 시스템을 통해 언제든지 자녀의 진도, 과제 현황, 출결 상태를 확인하실 수 있습니다. 중요한 알림은 카카오톡으로 자동 발송됩니다."
    },
    {
        q: "공모전이나 자격증 준비도 가능한가요?",
        a: "물론입니다! 정보올림피아드, SW 공모전, 정보처리기능사 등 다양한 대회와 자격증 준비를 지원합니다. 다수의 수상 실적을 보유하고 있습니다."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="py-32 section-light">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                    {/* Left: Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="label mb-4 block">FAQ</span>
                        <h2 className="heading-section mb-6">
                            자주 묻는 질문
                        </h2>
                        <p className="text-body-lg mb-8">
                            더 궁금한 점이 있으시면 언제든지 상담 신청해주세요.
                        </p>

                        <motion.a
                            href="#contact"
                            className="btn-secondary"
                            whileHover={{ scale: 1.02 }}
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
                                className="bg-white rounded-xl overflow-hidden"
                            >
                                <button
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-medium pr-4">{faq.q}</span>
                                    <motion.div
                                        animate={{ rotate: openIndex === i ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ChevronDown size={20} className="text-gray-400 flex-shrink-0" />
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
