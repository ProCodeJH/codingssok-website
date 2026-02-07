"use client";

import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import TextReveal from "@/components/ui/TextReveal";
import StaggerReveal from "@/components/ui/StaggerReveal";
import MagneticButton from "@/components/ui/MagneticButton";
import { Check } from "lucide-react";

const plans = [
    { name: "기초반", price: "15만원", period: "/월 (주1회)", features: ["스크래치/엔트리 기초", "컴퓨팅 사고력 훈련", "주 1회 80분 수업", "학습 리포트 제공"], popular: false },
    { name: "정규반", price: "25만원", period: "/월 (주2회)", features: ["Python/C언어 심화", "알고리즘 문제풀이", "주 2회 80분 수업", "1:1 맞춤 피드백", "자격증 준비"], popular: true },
    { name: "집중반", price: "35만원", period: "/월 (주3회)", features: ["전과목 통합 학습", "대회/올림피아드 준비", "주 3회 80분 수업", "프로젝트 포트폴리오", "진학 컨설팅"], popular: false },
];

export default function Pricing() {
    return (
        <section id="pricing" className="py-32 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-200/50 rounded-full mb-6"
                    >
                        <span className="text-sm font-medium text-orange-700">수강료</span>
                    </motion.span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        <TextReveal delay={0.1} stagger={0.08}>투명한 수강료 안내</TextReveal>
                    </h2>
                    <p className="text-lg text-gray-500">
                        <TextReveal delay={0.4} stagger={0.03}>모든 반 무료 체험 수업 가능</TextReveal>
                    </p>
                </div>

                <StaggerReveal className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" stagger={0.15} distance={50}>
                    {plans.map((plan, i) => (
                        <TiltCard
                            key={i}
                            className={`rounded-3xl p-8 h-full ${plan.popular
                                ? "bg-gray-900 text-white shadow-2xl shadow-gray-900/30 scale-105 border-2 border-blue-500/30"
                                : "bg-gray-50 border border-gray-100 hover:shadow-xl"
                                } transition-all duration-500`}
                            tiltDegree={4}
                            glareEnabled={plan.popular}
                        >
                            {plan.popular && (
                                <motion.span
                                    className="inline-block px-3 py-1 bg-blue-500 text-white text-xs font-bold rounded-full mb-4"
                                    animate={{ boxShadow: ["0 0 0px rgba(59,130,246,0)", "0 0 20px rgba(59,130,246,0.5)", "0 0 0px rgba(59,130,246,0)"] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    인기
                                </motion.span>
                            )}
                            <h3 className={`text-xl font-bold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>{plan.name}</h3>
                            <div className="mb-6">
                                <span className={`text-3xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>{plan.price}</span>
                                <span className={`text-sm ${plan.popular ? "text-gray-300" : "text-gray-500"}`}>{plan.period}</span>
                            </div>
                            <ul className="space-y-3 mb-8">
                                {plan.features.map((feature, fi) => (
                                    <li key={fi} className="flex items-center gap-3">
                                        <Check size={16} className={plan.popular ? "text-blue-400" : "text-blue-500"} />
                                        <span className={`text-sm ${plan.popular ? "text-gray-300" : "text-gray-600"}`}>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <MagneticButton
                                as="a"
                                href="#contact"
                                className={`block w-full py-3.5 text-center font-semibold rounded-full transition-all ${plan.popular ? "bg-white text-gray-900 hover:bg-gray-100" : "bg-gray-900 text-white hover:bg-gray-800"}`}
                                strength={6}
                            >
                                상담 신청
                            </MagneticButton>
                        </TiltCard>
                    ))}
                </StaggerReveal>
            </div>
        </section>
    );
}
