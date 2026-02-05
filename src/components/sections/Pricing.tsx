"use client";

import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

const plans = [
    {
        name: "기초반",
        price: "18만원",
        period: "/월",
        desc: "스크래치/엔트리",
        features: ["주 1회 (80분)", "컴퓨팅 사고력", "온라인 자료"],
        popular: false,
        gradient: "from-blue-50 to-indigo-50",
        accent: "bg-blue-500",
    },
    {
        name: "심화반",
        price: "25만원",
        period: "/월",
        desc: "C언어 · Python",
        features: ["주 2회 (80분)", "알고리즘 풀이", "1:1 멘토링", "포트폴리오"],
        popular: true,
        gradient: "from-violet-600 via-purple-600 to-indigo-600",
        accent: "bg-gradient-to-r from-pink-500 to-violet-500",
    },
    {
        name: "자격증반",
        price: "30만원",
        period: "/월",
        desc: "시험 대비",
        features: ["주 3회 (80분)", "기출 분석", "합격까지 관리"],
        popular: false,
        gradient: "from-emerald-50 to-teal-50",
        accent: "bg-emerald-500",
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="w-full bg-gradient-to-b from-gray-50 to-white flex justify-center" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
            <div className="w-full max-w-6xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '100px' }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        <Sparkles size={16} />
                        PRICING
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        합리적인 수강료
                    </h2>
                    <p className="text-lg text-gray-500 max-w-md mx-auto">
                        목표와 수준에 맞는 최적의 플랜을 선택하세요
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative rounded-3xl p-8 text-center transition-all duration-300 ${plan.popular
                                    ? 'bg-gradient-to-br ' + plan.gradient + ' text-white shadow-2xl shadow-purple-500/25 scale-105 border-0'
                                    : 'bg-white border border-gray-100 hover:border-gray-200 hover:shadow-xl'
                                }`}
                        >
                            {plan.popular && (
                                <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-white/20 backdrop-blur text-white text-xs font-bold rounded-full mb-6 border border-white/30">
                                    <Sparkles size={12} />
                                    인기
                                </span>
                            )}

                            <h3 className={`text-xl font-bold mb-1 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                                {plan.name}
                            </h3>
                            <p className={`text-sm mb-6 ${plan.popular ? 'text-white/70' : 'text-gray-500'}`}>
                                {plan.desc}
                            </p>

                            <div className="mb-8">
                                <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                                    {plan.price}
                                </span>
                                <span className={plan.popular ? 'text-white/60' : 'text-gray-400'}>
                                    {plan.period}
                                </span>
                            </div>

                            <ul className="space-y-4 mb-8 text-left">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? 'bg-white/20' : 'bg-blue-100'
                                            }`}>
                                            <Check size={12} className={plan.popular ? 'text-white' : 'text-blue-600'} />
                                        </div>
                                        <span className={plan.popular ? 'text-white/90' : 'text-gray-600'}>
                                            {f}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <motion.a
                                href="#contact"
                                className={`block w-full py-4 font-semibold rounded-xl transition-all ${plan.popular
                                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                문의하기
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
