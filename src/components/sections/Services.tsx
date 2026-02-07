"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import CountUp from "@/components/ui/CountUp";
import LetterReveal from "@/components/ui/LetterReveal";
import StaggerReveal from "@/components/ui/StaggerReveal";
import EyeTracker from "@/components/ui/EyeTracker";
import SVGPillButton from "@/components/ui/SVGPillButton";

const services = [
    { title: "1:1 맞춤 수업", desc: "학생 수준에 맞는 개인 맞춤형 커리큘럼으로 최적의 학습 효과를 경험하세요.", color: "#EC5212" },
    { title: "실전 프로젝트", desc: "배운 내용을 실제 프로젝트에 적용하여 포트폴리오를 완성합니다.", color: "#3B82F6" },
    { title: "체계적 관리", desc: "학습 진도, 성취도, 출석을 실시간으로 관리합니다.", color: "#10B981" },
    { title: "대회 준비", desc: "정보올림피아드, 코딩 공모전 등 각종 대회를 체계적으로 준비합니다.", color: "#8B5CF6" },
];

const stats = [
    { value: 500, suffix: "+", label: "누적 수강생" },
    { value: 95, suffix: "%", label: "학부모 만족도" },
    { value: 8, suffix: "년", label: "교육 경력" },
    { value: 30, suffix: "+", label: "자격증 취득" },
];

/* ── SVG illustration with animated shapes (like nodcoding USP) ── */
function ServiceIllustration({ color, index }: { color: string; index: number }) {
    const shapes = [
        // Circles
        <motion.circle key="c1" cx="50" cy="50" r="30" fill={color} opacity="0.2"
            animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 3, delay: index * 0.3 }} />,
        <motion.circle key="c2" cx="50" cy="50" r="18" fill={color} opacity="0.5"
            animate={{ scale: [1, 0.8, 1] }} transition={{ repeat: Infinity, duration: 2.5, delay: index * 0.2 }} />,
        // Lines
        <motion.line key="l1" x1="20" y1="80" x2="80" y2="80" stroke={color} strokeWidth="2" opacity="0.3"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }} />,
        <motion.line key="l2" x1="20" y1="88" x2="65" y2="88" stroke={color} strokeWidth="2" opacity="0.2"
            initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }} />,
    ];

    return (
        <svg viewBox="0 0 100 100" className="w-20 h-20 flex-shrink-0">
            {shapes}
        </svg>
    );
}

export default function Services() {
    const statsRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: statsRef, offset: ["start end", "end start"] });
    const bgScale = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

    return (
        <section id="services" className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/30 overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
                {/* Header with eye */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                    <div className="text-center md:text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-200/50 rounded-full mb-6"
                        >
                            <span className="text-sm font-medium text-purple-700">서비스</span>
                        </motion.span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                            <LetterReveal delay={0.1} stagger={0.04}>왜 코딩쏙인가요?</LetterReveal>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-lg">
                            <LetterReveal delay={0.5} stagger={0.02} splitBy="word">현직 IT 전문가가 직접 가르치는 프리미엄 코딩 교육</LetterReveal>
                        </p>
                    </div>

                    {/* Eye tracker — nodcoding signature "Why Nod?" section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, type: "spring" }}
                    >
                        <EyeTracker size={160} pupilColor="#383030" secondaryColor="#EC5212" />
                    </motion.div>
                </div>

                {/* Service cards with SVG illustrations */}
                <StaggerReveal className="grid md:grid-cols-2 gap-6 mb-20" stagger={0.15} distance={40}>
                    {services.map((service, i) => (
                        <TiltCard key={i} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full group" tiltDegree={4}>
                            <div className="flex items-start gap-6">
                                <ServiceIllustration color={service.color} index={i} />
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{service.desc}</p>
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </StaggerReveal>

                {/* CTA */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <SVGPillButton href="#contact" variant="dark" size="lg">
                        지금 상담하기
                    </SVGPillButton>
                </motion.div>

                {/* Stats panel with scroll-driven scale */}
                <motion.div
                    ref={statsRef}
                    style={{ scale: bgScale }}
                    className="bg-white rounded-3xl p-10 shadow-lg border border-gray-100 origin-center"
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="text-center"
                            >
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
