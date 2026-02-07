"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import TextReveal from "@/components/ui/TextReveal";

const categories = [
    { name: "수업", color: "bg-blue-500" },
    { name: "비용", color: "bg-green-500" },
    { name: "기타", color: "bg-purple-500" },
];

const faqs = [
    { q: "코딩을 처음 배우는데 괜찮을까요?", a: "물론이죠! 스크래치, 엔트리 등 비주얼 프로그래밍부터 시작해서 단계적으로 텍스트코딩까지 자연스럽게 진행합니다.", cat: 0 },
    { q: "수업은 어떤 방식으로 진행되나요?", a: "1:1 또는 소수정예(최대 4명) 그룹 수업으로 진행됩니다. 학생 수준에 맞는 맞춤형 커리큘럼을 제공합니다.", cat: 0 },
    { q: "수강료는 어떻게 되나요?", a: "기초반 15만원/월(주1회), 정규반 25만원/월(주2회), 집중반 35만원/월(주3회)입니다. 무료 체험 수업도 가능합니다.", cat: 1 },
    { q: "환불 정책은 어떻게 되나요?", a: "수업 시작 전 100% 환불, 1/3 경과 전 2/3 환불, 1/2 경과 전 1/2 환불이 가능합니다.", cat: 1 },
    { q: "자격증 취득도 가능한가요?", a: "네! 정보처리기능사, DIAT, COS 등 다양한 IT 자격증 취득을 지원합니다. 현재까지 30건 이상의 자격증 취득 실적이 있습니다.", cat: 2 },
    { q: "대회 준비도 도와주시나요?", a: "정보올림피아드, 소프트웨어 대회 등 각종 대회 준비를 체계적으로 지원합니다.", cat: 2 },
];

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(null);

    return (
        <section id="faq" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="max-w-3xl mx-auto px-8 lg:px-12">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-200/50 rounded-full mb-6"
                    >
                        <span className="text-sm font-medium text-amber-700">FAQ</span>
                    </motion.span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        <TextReveal delay={0.1} stagger={0.08}>자주 묻는 질문</TextReveal>
                    </h2>
                </div>
                <div className="space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = open === i;
                        const cat = categories[faq.cat];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className={`rounded-2xl border transition-all duration-300 ${isOpen ? "bg-white shadow-lg border-gray-200" : "bg-white/60 border-gray-100 hover:bg-white hover:shadow-sm"}`}
                            >
                                <button onClick={() => setOpen(isOpen ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2.5 h-2.5 rounded-full ${cat.color} flex-shrink-0`} />
                                        <span className={`font-semibold transition-colors ${isOpen ? "text-gray-900" : "text-gray-700"}`}>{faq.q}</span>
                                    </div>
                                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}>
                                        <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                                    </motion.div>
                                </button>
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <div className="px-6 pb-6 pl-11">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className={`text-xs px-2 py-0.5 rounded-full text-white ${cat.color}`}>{cat.name}</span>
                                                </div>
                                                <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
