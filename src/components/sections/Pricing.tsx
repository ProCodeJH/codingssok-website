"use client";

import { motion } from "framer-motion";
import { Check, Star, Zap, Crown } from "lucide-react";

const plans = [
    {
        name: "기초반",
        description: "코딩 입문자를 위한 기초 과정",
        price: "18만원",
        period: "/월",
        features: ["주 1회 수업 (80분)", "스크래치/엔트리 기초", "컴퓨팅 사고력 훈련", "온라인 학습 자료"],
        cta: "시작하기",
        popular: false,
        icon: Star,
        gradient: "from-slate-500 to-gray-600",
        bgGradient: "from-gray-50 to-white"
    },
    {
        name: "심화반",
        description: "텍스트 코딩 완성 과정",
        price: "25만원",
        period: "/월",
        features: ["주 2회 수업 (80분)", "C언어/Python 심화", "알고리즘 문제 풀이", "1:1 멘토링 포함", "프로젝트 포트폴리오", "공모전 준비 지원"],
        cta: "추천 코스",
        popular: true,
        icon: Crown,
        gradient: "from-blue-600 to-purple-600",
        bgGradient: "from-gray-900 to-gray-800"
    },
    {
        name: "자격증반",
        description: "시험 대비 집중 과정",
        price: "30만원",
        period: "/월",
        features: ["주 3회 수업 (80분)", "정보처리기능사 대비", "코딩 자격증 취득", "모의고사 제공", "1:1 집중 관리"],
        cta: "문의하기",
        popular: false,
        icon: Zap,
        gradient: "from-orange-500 to-amber-500",
        bgGradient: "from-gray-50 to-white"
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 sm:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white relative overflow-hidden">
            {/* Premium Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <motion.span
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500/10 to-amber-500/10 border border-orange-200/50 rounded-full mb-6 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-sm font-semibold text-orange-700">수강료</span>
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-4 sm:mb-6 leading-tight">
                        합리적인 수강료,
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">확실한 성과</span>
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-500 max-w-lg mx-auto">
                        학생의 수준과 목표에 맞는 맞춤형 코스를 선택하세요
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.15, duration: 0.8 }}
                            whileHover={{ y: -8 }}
                            className={`relative rounded-3xl p-8 lg:p-10 transition-all duration-500 text-center ${plan.popular
                                ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl shadow-gray-900/30 md:scale-[1.05] z-10 border border-gray-700/50'
                                : 'bg-white/90 backdrop-blur-xl hover:shadow-2xl border border-white/50 shadow-lg'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <motion.span
                                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-xl shadow-purple-500/30 flex items-center gap-2"
                                        animate={{ scale: [1, 1.02, 1] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Crown size={14} />
                                        인기
                                    </motion.span>
                                </div>
                            )}

                            {/* Icon */}
                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-6 shadow-lg mx-auto ${plan.popular ? 'shadow-blue-500/30' : ''}`}>
                                <plan.icon size={24} className="text-white" />
                            </div>

                            <div className="mb-8">
                                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                                <p className={`text-base ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-10">
                                <span className="text-4xl sm:text-5xl font-black">{plan.price}</span>
                                <span className={`text-base ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {plan.period}
                                </span>
                            </div>

                            <ul className="space-y-4 mb-10 text-left inline-block">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.popular ? 'bg-blue-500/20' : 'bg-blue-500/10'}`}>
                                            <Check
                                                size={12}
                                                className={`${plan.popular ? 'text-blue-400' : 'text-blue-600'}`}
                                            />
                                        </div>
                                        <span className={`text-base ${plan.popular ? 'text-gray-300' : 'text-gray-600'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <motion.a
                                href="#contact"
                                className={`block w-full text-center py-4 sm:py-5 rounded-2xl font-bold text-base transition-all ${plan.popular
                                    ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-xl'
                                    : 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-gray-800 hover:to-gray-700 shadow-lg shadow-gray-900/10'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {plan.cta} <span className="opacity-60 ml-1">→</span>
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
