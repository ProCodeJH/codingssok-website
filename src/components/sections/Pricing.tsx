"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
    {
        name: "기초반",
        price: "18만원",
        period: " / 월",
        desc: "스크래치/엔트리 기초",
        features: ["주 1회 수업 (80분)", "스크래치/엔트리 기초", "컴퓨팅 사고력 훈련", "온라인 학습 자료"],
        popular: false,
    },
    {
        name: "심화반",
        price: "25만원",
        period: " / 월",
        desc: "C언어 · Python 심화",
        features: ["주 2회 수업 (80분)", "C언어/Python 심화", "알고리즘 문제풀이", "1:1 멘토링 포함", "프로젝트 포트폴리오"],
        popular: true,
    },
    {
        name: "자격증반",
        price: "30만원",
        period: " / 월",
        desc: "시험 대비 집중 과정",
        features: ["주 3회 수업 (80분)", "정보처리기능사 대비", "코딩 자격증 취득", "기출문제 집중 분석", "합격까지 관리"],
        popular: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Pricing</p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        합리적인 수강료
                    </h2>
                    <p className="text-lg text-gray-500 max-w-md mx-auto">
                        학생에게 맞는 코스를 선택하세요
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`relative rounded-2xl p-8 text-center ${plan.popular
                                    ? 'bg-gray-900 text-white'
                                    : 'bg-white border border-gray-100'
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-gray-900 text-xs font-bold rounded-full">
                                    인기
                                </span>
                            )}

                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <p className={`text-sm mb-6 ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                                {plan.desc}
                            </p>

                            <div className="mb-8">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className={plan.popular ? 'text-gray-400' : 'text-gray-500'}>
                                    {plan.period}
                                </span>
                            </div>

                            <ul className="space-y-3 mb-8 text-left">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm">
                                        <Check size={16} className={plan.popular ? 'text-white' : 'text-gray-900'} />
                                        <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <motion.a
                                href="#contact"
                                className={`block w-full py-4 font-semibold rounded-xl transition-colors ${plan.popular
                                        ? 'bg-white text-gray-900 hover:bg-gray-100'
                                        : 'bg-gray-900 text-white hover:bg-gray-800'
                                    }`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                문의하기
                            </motion.a>
                        </motion.div>
                    ))}
                </div>

                {/* Footer */}
                <p className="text-center text-gray-400 text-sm mt-12">
                    * 추가 코스: 아두이노, 정보올림피아드 별도 문의
                </p>
            </div>
        </section>
    );
}
