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
    },
    {
        name: "심화반",
        description: "텍스트 코딩 완성 과정",
        price: "25만원",
        period: "/월",
        features: ["주 2회 수업 (80분)", "C언어/Python 심화", "알고리즘 문제 풀이", "1:1 멘토링 포함", "프로젝트 포트폴리오", "공모전 준비 지원"],
        cta: "추천 코스",
        popular: true,
    },
    {
        name: "자격증반",
        description: "시험 대비 집중 과정",
        price: "30만원",
        period: "/월",
        features: ["주 3회 수업 (80분)", "정보처리기능사 대비", "코딩 자격증 취득", "모의고사 제공", "1:1 집중 관리"],
        cta: "문의하기",
        popular: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="label mb-4 block">수강료</span>
                    <h2 className="heading-section mb-6">
                        합리적인 수강료,
                        <br />
                        <span className="text-gray-400">확실한 성과</span>
                    </h2>
                    <p className="text-body-lg max-w-lg mx-auto">
                        학생의 수준과 목표에 맞는 맞춤형 코스를 선택하세요
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className={`relative p-8 rounded-2xl transition-all duration-500 hover:shadow-2xl ${plan.popular
                                    ? 'bg-gray-900 text-white scale-105 shadow-xl'
                                    : 'bg-white border border-gray-100'
                                }`}
                        >
                            {plan.popular && (
                                <motion.div
                                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <span className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-1.5 rounded-full text-xs font-medium shadow-lg">
                                        인기
                                    </span>
                                </motion.div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                                <p className={`text-sm ${plan.popular ? 'text-white/60' : 'text-gray-500'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-10">
                                <span className="text-4xl font-semibold">{plan.price}</span>
                                <span className={`text-sm ${plan.popular ? 'text-white/60' : 'text-gray-500'}`}>
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
                                        <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-600'
                                            }`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <motion.a
                                href="#contact"
                                className={`block w-full text-center py-4 rounded-full font-medium text-sm transition-all duration-300 ${plan.popular
                                        ? 'bg-white text-black hover:bg-gray-100'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                    }`}
                                whileHover={{ scale: 1.02 }}
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
