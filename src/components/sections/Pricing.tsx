"use client";


import { motion } from "framer-motion";
import { Check, Star, Sparkles, Crown } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";

const plans = [
    {
        name: "기초반",
        target: "스크래치/엔트리",
        price: "18",
        features: ["주 1회 (80분)", "컴퓨팅 사고력", "온라인 자료"],
        popular: false,
        accent: "from-emerald-500 to-teal-500",
    },
    {
        name: "심화반",
        target: "C언어 · Python",
        price: "25",
        features: ["주 2회 (80분)", "알고리즘 풀이", "1:1 멘토링", "포트폴리오"],
        popular: true,
        accent: "from-blue-600 to-cyan-500",
    },
    {
        name: "자격증반",
        target: "시험 대비",
        price: "30",
        features: ["주 3회 (80분)", "기출 분석", "합격까지 관리"],
        popular: false,
        accent: "from-violet-500 to-purple-500",
    },
];



export default function Pricing() {
    return (
        <section id="pricing" className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden flex justify-center" style={{ paddingTop: '180px', paddingBottom: '180px' }}>
            {/* 배경 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-40 left-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
                <div className="absolute bottom-40 right-10 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
                <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
                    <filter id="price-noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /></filter>
                    <rect width="100%" height="100%" filter="url(#price-noise)" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '80px' }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full text-sm text-blue-700 mb-6"
                    >
                        <Crown size={14} className="text-blue-500" />
                        투명한 가격 정책
                    </motion.div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        합리적인 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">수강료</span>
                    </h2>
                    <p className="text-lg text-gray-500">
                        목표에 맞는 플랜을 선택하세요
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                            className={`group relative ${plan.popular ? 'md:-mt-8 md:mb-8' : ''}`}
                        >
                            <TiltCard>
                                {/* 인기 배지 */}
                                {plan.popular && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                                    >
                                        <div className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-bold rounded-full shadow-lg shadow-blue-500/40">
                                            <Star size={14} fill="currentColor" />
                                            BEST
                                        </div>
                                    </motion.div>
                                )}

                                {/* 카드 글로우 — relative 부모 안 */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${plan.accent} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 translate-y-4`} />

                                {/* 메인 카드 */}
                                <div className={`relative h-full rounded-3xl overflow-hidden transition-all duration-300 ${plan.popular
                                    ? 'bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 shadow-2xl shadow-blue-500/20 border-2 border-blue-500/30'
                                    : 'bg-white shadow-xl border border-gray-100 group-hover:shadow-2xl'
                                    }`}>
                                    {/* 상단 그라디언트 바 — 모든 카드에 적용 */}
                                    <div className={`h-1 bg-gradient-to-r ${plan.accent}`} />

                                    <div className="p-8 lg:p-10">
                                        <div className="text-center mb-8">
                                            <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                                                {plan.name}
                                            </h3>
                                            <p className={`text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                                                {plan.target}
                                            </p>
                                        </div>

                                        <div className="text-center mb-8">
                                            <div className="flex items-end justify-center gap-1">
                                                <span className={`text-5xl lg:text-6xl font-bold ${plan.popular
                                                    ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'
                                                    : `text-transparent bg-clip-text bg-gradient-to-r ${plan.accent}`
                                                    }`}>
                                                    {plan.price}
                                                </span>
                                                <span className={`text-xl mb-2 ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                                                    만원<span className="text-sm">/월</span>
                                                </span>
                                            </div>
                                        </div>

                                        <ul className="space-y-4 mb-10">
                                            {plan.features.map((feature, j) => (
                                                <motion.li
                                                    key={j}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.1 + j * 0.05 }}
                                                    className={`flex items-center gap-3 ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}
                                                >
                                                    <span className={`flex items-center justify-center w-5 h-5 rounded-full ${plan.popular
                                                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500'
                                                        : `bg-gradient-to-r ${plan.accent}`
                                                        }`}>
                                                        <Check size={12} className={plan.popular ? 'text-white' : 'text-gray-900'} />
                                                    </span>
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>

                                        <motion.a
                                            href="#contact"
                                            className={`block w-full py-4 text-center font-semibold rounded-2xl transition-all duration-300 ${plan.popular
                                                ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40'
                                                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                                                }`}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {plan.popular ? '시작하기' : '문의하기'}
                                        </motion.a>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-gray-500 text-sm">
                        <Sparkles size={14} className="inline text-blue-500 mr-1" />
                        모든 플랜은 <span className="text-blue-600 font-medium">첫 달 10% 할인</span> 혜택이 적용됩니다
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
