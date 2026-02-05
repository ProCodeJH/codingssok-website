"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

const plans = [
    {
        name: "기초반",
        price: "18만원",
        period: "/월",
        desc: "스크래치/엔트리",
        features: ["주 1회 (80분)", "컴퓨팅 사고력", "온라인 자료"],
        popular: false,
    },
    {
        name: "심화반",
        price: "25만원",
        period: "/월",
        desc: "C언어 · Python",
        features: ["주 2회 (80분)", "알고리즘 풀이", "1:1 멘토링", "포트폴리오"],
        popular: true,
    },
    {
        name: "자격증반",
        price: "30만원",
        period: "/월",
        desc: "시험 대비",
        features: ["주 3회 (80분)", "기출 분석", "합격까지 관리"],
        popular: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="w-full bg-gray-50 flex justify-center" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
            <div className="w-full max-w-5xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '80px' }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        합리적인 수강료
                    </h2>
                    <p className="text-gray-500">
                        목표에 맞는 플랜을 선택하세요
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                        >
                            {/* 인기 배지 - 카드 내부 상단 */}
                            {plan.popular && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <span className="px-4 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full">
                                        인기
                                    </span>
                                </div>
                            )}

                            <div className="text-center" style={{ marginTop: plan.popular ? '16px' : '0' }}>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                                <p className="text-sm text-gray-500 mb-6">{plan.desc}</p>

                                <div className="mb-8">
                                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                                    <span className="text-gray-400">{plan.period}</span>
                                </div>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-gray-600">
                                        <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <Check size={12} className="text-gray-600" />
                                        </div>
                                        {f}
                                    </li>
                                ))}
                            </ul>

                            <motion.a
                                href="#contact"
                                className="block w-full py-3.5 bg-gray-900 text-white font-medium rounded-xl text-center hover:bg-gray-800 transition-colors"
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
