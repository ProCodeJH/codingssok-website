"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Sparkles, HelpCircle, Lightbulb } from "lucide-react";

const faqs = [
    {
        q: "수업은 어떤 방식으로 진행되나요?",
        a: "소수정예(4~6명) 그룹 수업으로 진행되며, 개인별 맞춤 피드백을 제공합니다.",
        icon: MessageCircle,
        tag: "수업 방식",
    },
    {
        q: "코딩을 처음 배우는데 바로 C언어로 시작해도 되나요?",
        a: "초보자는 스크래치/엔트리로 시작하여 컴퓨팅 사고력을 먼저 기른 후 C언어로 진입하시는 것을 권장합니다.",
        icon: Lightbulb,
        tag: "초보자",
    },
    {
        q: "수업 시간과 요일은 어떻게 되나요?",
        a: "평일 14시~21시 사이에 진행되며, 상담 시 원하시는 시간대를 선택하실 수 있습니다.",
        icon: HelpCircle,
        tag: "시간표",
    },
    {
        q: "학부모가 학습 진도를 확인할 수 있나요?",
        a: "네, 전용 학부모 앱을 통해 실시간으로 학습 진도와 피드백을 확인하실 수 있습니다.",
        icon: HelpCircle,
        tag: "학부모",
    },
    {
        q: "공모전이나 자격증 준비도 가능한가요?",
        a: "네, 정보올림피아드, SW공모전, 정보처리기능사 등 목표에 맞춘 집중 케어 프로그램을 운영하고 있습니다.",
        icon: Sparkles,
        tag: "대회·자격증",
    },
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="w-full bg-gradient-to-b from-white via-gray-50/80 to-white relative overflow-hidden flex justify-center" style={{ paddingTop: '180px', paddingBottom: '180px' }}>
            {/* 배경 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-blue-50/30 to-cyan-50/30 rounded-full blur-3xl" />
                <div className="absolute inset-0 opacity-[0.015]" style={{
                    backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }} />
                <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
                    <filter id="faq-noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /></filter>
                    <rect width="100%" height="100%" filter="url(#faq-noise)" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-4xl mx-auto px-8">
                {/* 헤더 */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '80px' }}
                >
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                        className="inline-block mb-8"
                    >
                        <div className="relative">
                            {/* 아이콘 글로우 */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-40" />
                            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                                <MessageCircle size={32} className="text-white" />
                            </div>
                            {/* 플로팅 스파클 */}
                            <motion.div
                                className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                                animate={{ y: [0, -4, 0], scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <span className="text-white text-[10px] font-black">{faqs.length}</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        자주 묻는 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">질문</span>
                    </h2>
                    <p className="text-lg text-gray-500">
                        궁금한 점이 있으시면 언제든 문의해주세요
                    </p>
                </motion.div>

                {/* FAQ 프리미엄 아코디언 */}
                <div className="space-y-4">
                    {faqs.map((faq, i) => {
                        const isOpen = openIndex === i;
                        const Icon = faq.icon;

                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    delay: i * 0.08,
                                    type: "spring",
                                    stiffness: 100,
                                    damping: 15,
                                }}
                                className="group"
                            >
                                <div className="relative">
                                    {/* 카드 글로우 (활성 시) */}
                                    <motion.div
                                        className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-lg"
                                        animate={{ opacity: isOpen ? 0.15 : 0 }}
                                        transition={{ duration: 0.4 }}
                                    />

                                    <div className={`relative overflow-hidden rounded-2xl transition-all duration-500 ${isOpen
                                            ? 'bg-white shadow-2xl shadow-blue-500/10'
                                            : 'bg-white/80 backdrop-blur-xl shadow-lg hover:shadow-xl'
                                        }`}>
                                        {/* 왼쪽 그라디언트 사이드바 */}
                                        <motion.div
                                            className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500"
                                            animate={{
                                                opacity: isOpen ? 1 : 0,
                                                scaleY: isOpen ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                                            style={{ originY: 0 }}
                                        />

                                        {/* 상단 시머 라인 */}
                                        {isOpen && (
                                            <motion.div
                                                className="absolute top-0 left-0 right-0 h-[1px]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                style={{
                                                    background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(6,182,212,0.5), transparent)',
                                                }}
                                            />
                                        )}

                                        {/* 질문 버튼 */}
                                        <button
                                            onClick={() => setOpenIndex(isOpen ? null : i)}
                                            className="w-full flex items-center gap-4 p-5 md:p-6 text-left transition-colors duration-300 hover:bg-blue-50/30"
                                        >
                                            {/* 번호 + 아이콘 */}
                                            <motion.div
                                                className="relative flex-shrink-0"
                                                animate={isOpen ? { scale: [1, 1.15, 1] } : {}}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-500 ${isOpen
                                                        ? 'bg-gradient-to-br from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/30'
                                                        : 'bg-gray-100 group-hover:bg-blue-50'
                                                    }`}>
                                                    <AnimatePresence mode="wait">
                                                        {isOpen ? (
                                                            <motion.div
                                                                key="icon"
                                                                initial={{ scale: 0, rotate: -90 }}
                                                                animate={{ scale: 1, rotate: 0 }}
                                                                exit={{ scale: 0, rotate: 90 }}
                                                                transition={{ duration: 0.2 }}
                                                            >
                                                                <Icon size={18} className="text-white" />
                                                            </motion.div>
                                                        ) : (
                                                            <motion.span
                                                                key="num"
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                exit={{ scale: 0 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="text-sm font-bold text-gray-500 group-hover:text-blue-600 transition-colors"
                                                            >
                                                                {String(i + 1).padStart(2, '0')}
                                                            </motion.span>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </motion.div>

                                            {/* 질문 텍스트 */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className={`text-[10px] font-bold tracking-wider uppercase transition-colors duration-300 ${isOpen ? 'text-blue-500' : 'text-gray-300'
                                                        }`}>
                                                        {faq.tag}
                                                    </span>
                                                </div>
                                                <span className={`font-semibold text-base md:text-lg transition-colors duration-300 ${isOpen ? 'text-blue-700' : 'text-gray-900 group-hover:text-blue-600'
                                                    }`}>
                                                    {faq.q}
                                                </span>
                                            </div>

                                            {/* 화살표 */}
                                            <motion.div
                                                animate={{ rotate: isOpen ? 180 : 0 }}
                                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                                                className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${isOpen
                                                        ? 'bg-blue-100 text-blue-600 shadow-inner'
                                                        : 'bg-gray-50 text-gray-400 group-hover:bg-blue-50 group-hover:text-blue-500'
                                                    }`}
                                            >
                                                <ChevronDown size={18} />
                                            </motion.div>
                                        </button>

                                        {/* 답변 패널 */}
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-5 md:px-6 pb-6">
                                                        <div className="ml-[60px]">
                                                            {/* 답변 카드 */}
                                                            <motion.div
                                                                initial={{ y: 10, opacity: 0 }}
                                                                animate={{ y: 0, opacity: 1 }}
                                                                transition={{ delay: 0.1, duration: 0.4 }}
                                                                className="relative bg-gradient-to-br from-blue-50/80 to-cyan-50/50 rounded-xl p-5 border border-blue-100/50"
                                                            >
                                                                {/* 인용 마크 */}
                                                                <div className="absolute top-3 right-4 text-blue-200/50 text-4xl font-serif leading-none select-none">&rdquo;</div>

                                                                <p className="text-gray-700 leading-relaxed text-base md:text-lg relative z-10 pr-8">
                                                                    {faq.a}
                                                                </p>

                                                                {/* 하단 악센트 라인 */}
                                                                <motion.div
                                                                    className="mt-4 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                                                                    initial={{ scaleX: 0 }}
                                                                    animate={{ scaleX: 1 }}
                                                                    transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }}
                                                                    style={{ originX: 0, opacity: 0.3 }}
                                                                />
                                                            </motion.div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* 하단 CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <p className="text-gray-400 mb-6 text-sm font-medium tracking-wide">더 궁금한 점이 있으신가요?</p>
                    <motion.a
                        href="#contact"
                        className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-lg rounded-2xl shadow-xl shadow-blue-500/30 relative overflow-hidden group"
                        whileHover={{ scale: 1.03, y: -4, boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)" }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {/* 시머 오버레이 */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
                                backgroundSize: '200% 100%',
                                animation: 'shimmer 2s ease-in-out infinite',
                            }}
                        />
                        <Sparkles size={20} className="relative z-10" />
                        <span className="relative z-10">무료 상담 신청하기</span>
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
}
