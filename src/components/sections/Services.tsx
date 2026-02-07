"use client";

import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import CountUp from "@/components/ui/CountUp";

const services = [
    { icon: "🎯", title: "1:1 맞춤 수업", desc: "학생 수준에 맞는 개인 맞춤형 커리큘럼으로 최적의 학습 효과를 경험하세요." },
    { icon: "💻", title: "실전 프로젝트", desc: "배운 내용을 실제 프로젝트에 적용하여 포트폴리오를 완성합니다." },
    { icon: "📊", title: "체계적 관리", desc: "학습 진도, 성취도, 출석을 실시간으로 관리합니다." },
];

const stats = [
    { value: 500, suffix: "+", label: "누적 수강생" },
    { value: 95, suffix: "%", label: "학부모 만족도" },
    { value: 8, suffix: "년", label: "교육 경력" },
    { value: 30, suffix: "+", label: "자격증 취득" },
];

export default function Services() {
    return (
        <section id="services" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/30">
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-200/50 rounded-full mb-6">
                        <span className="text-sm font-medium text-purple-700">서비스</span>
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">왜 코딩쏙인가요?</h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">현직 IT 전문가가 직접 가르치는 프리미엄 코딩 교육</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 mb-20">
                    {services.map((service, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.6 }}>
                            <TiltCard className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full" tiltDegree={5}>
                                <div className="text-4xl mb-6">{service.icon}</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-500 leading-relaxed">{service.desc}</p>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                                    <CountUp target={stat.value} suffix={stat.suffix} />
                                </div>
                                <p className="text-sm text-gray-500">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
