"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "코딩을 처음 배우는 아이도 수강 가능한가요?",
        answer:
            "네, 물론입니다. 완전 초보부터 시작할 수 있도록 기초 개념부터 체계적으로 지도합니다. 블록코딩 트랙은 초등 저학년도 쉽게 따라올 수 있습니다.",
    },
    {
        question: "수업은 몇 명이 함께 듣나요?",
        answer:
            "소규모 그룹 수업(4~6명)으로 진행되며, 각 학생의 진도와 이해도에 맞춰 1:1 멘토링을 병행합니다.",
    },
    {
        question: "노트북이나 컴퓨터를 가져와야 하나요?",
        answer:
            "학원에서 수업용 컴퓨터와 아두이노 키트 등 모든 장비를 제공합니다. 따로 준비하실 필요 없습니다.",
    },
    {
        question: "공모전이나 대회 참가도 가능한가요?",
        answer:
            "네, 프로젝트 트랙에서는 공모전 준비를 정기적으로 진행하며, 지역 대회 및 전국 대회 참가를 지원합니다.",
    },
    {
        question: "수강료 환불 정책은 어떻게 되나요?",
        answer:
            "학원법에 따라 진행된 수업 횟수에 따라 환불이 가능합니다. 자세한 내용은 상담 시 안내해드립니다.",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section id="faq" className="section py-24 relative">
            <div className="absolute inset-0 bg-[#12121A]" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
                        자주 묻는 <span className="gradient-text">질문</span>
                    </h2>
                    <p className="text-lg text-white/60">
                        학부모님들이 가장 궁금해하시는 내용
                    </p>
                </motion.div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="glass rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <span className="text-lg font-semibold text-white pr-8">
                                    <span className="text-[#0066FF] mr-3">Q.</span>
                                    {faq.question}
                                </span>
                                <motion.div
                                    animate={{ rotate: openIndex === i ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <ChevronDown className="w-5 h-5 text-white/50" />
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
                                            <p className="text-white/70 leading-relaxed pl-8">
                                                <span className="text-[#00E5FF] mr-2">A.</span>
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-white/50 mb-6">더 궁금한 사항이 있으신가요?</p>
                    <motion.a
                        href="#contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white"
                        style={{
                            background: "linear-gradient(135deg, #0066FF 0%, #00E5FF 100%)",
                        }}
                    >
                        무료 상담 신청하기
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
