"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const plans = [
    {
        name: "블록코딩 트랙",
        target: "초등 저학년 추천",
        price: "150,000",
        period: "월 (주 1회)",
        features: ["C언어 기초", "Python 입문", "블록코딩 실습", "1:1 멘토링"],
        popular: false,
    },
    {
        name: "프로젝트 트랙",
        target: "초등 고학년·중학생",
        price: "200,000",
        period: "월 (주 2회)",
        features: [
            "앱/웹 개발",
            "아두이노 심화",
            "Python 응용",
            "프로젝트 완성",
            "공모전 준비",
        ],
        popular: true,
    },
    {
        name: "자격증 트랙",
        target: "중·고등학생",
        price: "180,000",
        period: "월 (주 1회)",
        features: [
            "정보처리기능사",
            "컴퓨터활용능력",
            "프로그래밍 자격증",
            "시험 대비 집중",
        ],
        popular: false,
    },
];

export default function Pricing() {
    return (
        <section id="pricing" className="section py-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] to-[#12121A]" />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
                        수강료 <span className="gradient-text">안내</span>
                    </h2>
                    <p className="text-lg text-white/60">
                        학생 맞춤형 커리큘럼과 합리적인 가격
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className={`relative rounded-3xl p-8 ${plan.popular
                                    ? "bg-gradient-to-b from-[#0066FF]/20 to-[#0066FF]/5 border-2 border-[#0066FF]"
                                    : "bg-[#12121A] border border-white/10"
                                }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <div className="flex items-center gap-1 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0066FF] to-[#00E5FF] text-white text-sm font-bold">
                                        <Star className="w-4 h-4" />
                                        인기
                                    </div>
                                </div>
                            )}

                            {/* Header */}
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-white mb-1">
                                    {plan.name}
                                </h3>
                                <p className="text-sm text-white/50">{plan.target}</p>
                            </div>

                            {/* Price */}
                            <div className="text-center mb-8">
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-4xl font-extrabold gradient-text">
                                        ₩{plan.price}
                                    </span>
                                </div>
                                <span className="text-white/50 text-sm">/{plan.period}</span>
                            </div>

                            {/* Features */}
                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3">
                                        <div
                                            className={`w-5 h-5 rounded-full flex items-center justify-center ${plan.popular ? "bg-[#0066FF]" : "bg-white/10"
                                                }`}
                                        >
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                        <span className="text-white/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className={`block w-full py-4 rounded-xl text-center font-bold transition-all ${plan.popular
                                        ? "bg-gradient-to-r from-[#0066FF] to-[#00E5FF] text-white shadow-lg shadow-[#0066FF]/30"
                                        : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                                    }`}
                            >
                                문의하기
                            </motion.a>
                        </motion.div>
                    ))}
                </div>

                {/* Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-center mt-12 space-y-2"
                >
                    <p className="text-white/50">
                        💡 모든 수강료는 교재비 포함 가격입니다 | 형제/자매 할인 10% 적용
                    </p>
                    <p className="text-white/40 text-sm">
                        ※ C·Python 중심 텍스트코딩 강화 | 프로젝트·공모전·현장체험 운영
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
