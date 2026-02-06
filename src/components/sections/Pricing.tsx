"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

const plans = [
    {
        name: "기초반",
        price: "18만원",
        period: "/월",
        desc: "스크래치/엔트리",
        icon: Zap,
        features: ["주 1회 (80분)", "컴퓨팅 사고력", "온라인 자료"],
        popular: false,
        gradient: "from-cyan-500/20 to-blue-500/20",
    },
    {
        name: "심화반",
        price: "25만원",
        period: "/월",
        desc: "C언어 · Python",
        icon: Crown,
        features: ["주 2회 (80분)", "알고리즘 풀이", "1:1 멘토링", "포트폴리오"],
        popular: true,
        gradient: "from-purple-500/20 to-pink-500/20",
    },
    {
        name: "자격증반",
        price: "30만원",
        period: "/월",
        desc: "시험 대비",
        icon: Sparkles,
        features: ["주 3회 (80분)", "기출 분석", "합격까지 관리"],
        popular: false,
        gradient: "from-amber-500/20 to-orange-500/20",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function Pricing() {
    return (
        <section id="pricing" className="section-cosmic bg-cosmic noise">
            <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="badge-cosmic mb-6">
                        <Sparkles size={14} />
                        PRICING
                    </span>
                    <h2 className="section-title text-gradient mb-4">
                        합리적인 수강료
                    </h2>
                    <p className="section-subtitle mx-auto">
                        목표와 수준에 맞는 최적의 플랜을 선택하세요
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            className={`relative glass-card p-8 ${plan.popular ? 'ring-2 ring-purple-500/50' : ''}`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold rounded-full shadow-lg shadow-purple-500/30">
                                        ✨ 인기
                                    </span>
                                </div>
                            )}

                            {/* Gradient Overlay */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-50`} />

                            {/* Content */}
                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                                    <plan.icon size={24} className="text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                                <p className="text-sm text-gray-400 mb-6">{plan.desc}</p>

                                {/* Price */}
                                <div className="mb-8">
                                    <span className="text-5xl font-bold text-gradient">{plan.price}</span>
                                    <span className="text-gray-400 ml-1">{plan.period}</span>
                                </div>

                                {/* Features */}
                                <ul className="space-y-4 mb-8">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-center gap-3 text-gray-300">
                                            <div className="w-5 h-5 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                                                <Check size={12} className="text-purple-400" />
                                            </div>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                {/* Button */}
                                <motion.a
                                    href="#contact"
                                    className={plan.popular ? "btn-cosmic w-full" : "btn-outline w-full"}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    문의하기
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
