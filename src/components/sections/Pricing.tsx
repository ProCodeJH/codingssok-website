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
        <section id="pricing" className="w-full py-48 bg-gray-50 flex justify-center">
            <div className="w-full max-w-6xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Pricing</p>
                    <h2 className="text-4xl font-bold text-gray-900">
                        합리적인 수강료
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className={`relative rounded-2xl p-8 text-center ${plan.popular ? 'bg-gray-900 text-white' : 'bg-white'
                                }`}
                        >
                            {plan.popular && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-white text-gray-900 text-xs font-bold rounded-full">
                                    인기
                                </span>
                            )}

                            <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                            <p className={`text-sm mb-6 ${plan.popular ? 'text-gray-400' : 'text-gray-500'}`}>
                                {plan.desc}
                            </p>

                            <div className="mb-8">
                                <span className="text-4xl font-bold">{plan.price}</span>
                                <span className={plan.popular ? 'text-gray-400' : 'text-gray-500'}>{plan.period}</span>
                            </div>

                            <ul className="space-y-3 mb-8 text-left">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm">
                                        <Check size={16} className={plan.popular ? 'text-white' : 'text-gray-900'} />
                                        <span className={plan.popular ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
                                    </li>
                                ))}
                            </ul>

                            <motion.a
                                href="#contact"
                                className={`block w-full py-4 font-semibold rounded-xl ${plan.popular ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'
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
