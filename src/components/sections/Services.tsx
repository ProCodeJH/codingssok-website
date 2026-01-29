"use client";

import { motion } from "framer-motion";
import { Wrench, Code, Trophy, Users, BookOpen, Target } from "lucide-react";

const services = [
    {
        icon: Wrench,
        title: "피지컬 컴퓨팅",
        description:
            "아두이노, 센서, 로봇 등 실제 하드웨어를 다루며 코딩의 원리를 체험합니다.",
        color: "#FF6B35",
    },
    {
        icon: Code,
        title: "텍스트 코딩",
        description:
            "C언어, 파이썬 등 실무에서 사용하는 프로그래밍 언어를 체계적으로 학습합니다.",
        color: "#0066FF",
    },
    {
        icon: Trophy,
        title: "자격증 대비",
        description:
            "컴활, 정보처리, 프로그래밍 자격증 취득을 위한 맞춤형 커리큘럼을 제공합니다.",
        color: "#10B981",
    },
];

const whyUs = [
    {
        icon: Users,
        title: "전문 강사진",
        description: "10년 이상의 교육 경력을 가진 전문 강사가 직접 지도합니다.",
    },
    {
        icon: BookOpen,
        title: "맞춤형 커리큘럼",
        description: "학생의 수준과 목표에 맞는 개인화된 학습 계획을 수립합니다.",
    },
    {
        icon: Target,
        title: "1:1 멘토링",
        description: "개별 피드백과 관리로 확실한 실력 향상을 보장합니다.",
    },
];

export default function Services() {
    return (
        <section id="services" className="section py-24 relative">
            <div className="absolute inset-0 bg-[#0A0A0F]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Services */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
                        우리의 <span className="gradient-text">서비스</span>
                    </h2>
                    <p className="text-lg text-white/60">
                        학생들의 성장을 위한 맞춤형 교육 서비스를 제공합니다
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                    {services.map((service, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="card group relative overflow-hidden"
                        >
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6"
                                style={{ background: `${service.color}20` }}
                            >
                                <service.icon
                                    className="w-8 h-8"
                                    style={{ color: service.color }}
                                />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">
                                {service.title}
                            </h3>
                            <p className="text-white/60 leading-relaxed">
                                {service.description}
                            </p>
                            <a
                                href="#curriculum"
                                className="inline-flex items-center gap-2 mt-4 text-sm font-medium group-hover:gap-3 transition-all"
                                style={{ color: service.color }}
                            >
                                자세히 보기 →
                            </a>

                            {/* Gradient Border on Hover */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                style={{
                                    background: `linear-gradient(135deg, ${service.color}10, transparent)`,
                                }}
                            />
                        </motion.div>
                    ))}
                </div>

                {/* Why Choose Us */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
                        왜 <span className="gradient-text">코딩쏙</span>인가?
                    </h2>
                    <p className="text-lg text-white/60">선택해야 하는 3가지 이유</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {whyUs.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-start gap-5 p-6 glass rounded-2xl"
                        >
                            <div className="w-14 h-14 rounded-xl bg-[#0066FF]/20 flex items-center justify-center flex-shrink-0">
                                <item.icon className="w-7 h-7 text-[#0066FF]" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-white mb-2">
                                    {item.title}
                                </h4>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
