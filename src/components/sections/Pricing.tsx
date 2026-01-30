"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
    {
        name: "기초반",
        description: "코딩 입문자를 위한 기초 과정",
        price: "18만원",
        period: "/월",
        features: ["주 1회 수업 (80분)", "스크래치/엔트리 기초", "컴퓨팅 사고력 훈련", "온라인 학습 자료"],
        cta: "시작하기",
        popular: false,
        gradient: "from-gray-100 to-gray-50"
    },
    {
        name: "심화반",
        description: "텍스트 코딩 완성 과정",
        price: "25만원",
        period: "/월",
        features: ["주 2회 수업 (80분)", "C언어/Python 심화", "알고리즘 문제 풀이", "1:1 멘토링 포함", "프로젝트 포트폴리오", "공모전 준비 지원"],
        cta: "추천 코스",
        popular: true,
        gradient: "from-blue-600 to-purple-600"
    },
    {
        name: "자격증반",
        description: "시험 대비 집중 과정",
        price: "30만원",
        period: "/월",
        features: ["주 3회 수업 (80분)", "정보처리기능사 대비", "코딩 자격증 취득", "모의고사 제공", "1:1 집중 관리"],
        cta: "문의하기",
        popular: false,
        gradient: "from-gray-100 to-gray-50"
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-200/50 rounded-full mb-6">
                        <span className="text-sm font-medium text-orange-700">수강료</span>
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        합리적인 수강료,
                        <br />
                        <span className="text-gray-400">확실한 성과</span>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-lg mx-auto">
                        학생의 수준과 목표에 맞는 맞춤형 코스를 선택하세요
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className={`relative rounded-3xl p-8 transition-all duration-500 ${plan.popular
                                    ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl scale-105 border border-gray-700'
                                    : 'bg-gray-50 hover:bg-white hover:shadow-xl border border-transparent hover:border-gray-100'
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-1.5 rounded-full text-xs font-semibold shadow-lg">
                                        인기
                                    </span>
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                                <p className={`text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-10">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className={`text-sm ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {plan.period}
                                </span>
                            </div>

                            <ul className="space-y-4 mb-10">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-start gap-3">
                                        <Check
                                            size={18}
                                            className={`mt-0.5 flex-shrink-0 ${plan.popular ? 'text-blue-400' : 'text-blue-500'
                                                }`}
                                        />
                                        <span className={`text-sm ${plan.popular ? 'text-gray-300' : 'text-gray-600'
                                            }`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <motion.a
                                href="#contact"
                                className={`block w-full text-center py-4 rounded-full font-semibold text-sm transition-all ${plan.popular
                                        ? 'bg-white text-gray-900 hover:bg-gray-100 shadow-lg'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                    }`}
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {plan.cta} <span className="opacity-60">→</span>
                            </motion.a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
