"use client";

import { motion } from "framer-motion";
import { Wrench, Monitor, Lightbulb, Brain, Trophy } from "lucide-react";

const tracks = [
    {
        id: "orange",
        name: "PHYSICAL COMPUTING",
        subtitle: "피지컬 컴퓨팅 트랙",
        color: "#FF6B35",
        icon: Wrench,
        features: ["아두이노", "엔트리·피지컬", "과학주제", "컴퓨터구조"],
    },
    {
        id: "blue",
        name: "TEXT CODING",
        subtitle: "텍스트코딩 트랙",
        color: "#0066FF",
        icon: Monitor,
        features: ["C언어", "파이썬", "블록코딩"],
    },
    {
        id: "green",
        name: "PROJECT",
        subtitle: "프로젝트 트랙",
        color: "#10B981",
        icon: Lightbulb,
        features: ["앱/웹 개발", "아두이노 심화", "Python 응용"],
    },
    {
        id: "purple",
        name: "THINKING MATH",
        subtitle: "사고력수학 트랙",
        color: "#7C3AED",
        icon: Brain,
        features: ["코딩수학", "문제해결", "창의융합수학"],
    },
    {
        id: "red",
        name: "자격증",
        subtitle: "자격증 트랙",
        color: "#EF4444",
        icon: Trophy,
        features: ["컴활2급", "정보처리", "프로그래밍 1/2급"],
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
};

export default function Curriculum() {
    return (
        <section id="curriculum" className="section py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#12121A] to-[#0A0A0F]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
                        <span className="gradient-text">5트랙 아키텍처</span>
                    </h2>
                    <p className="section-subtitle text-lg text-white/60 max-w-2xl mx-auto">
                        기초 개념 ↔ 프로젝트 중심의 순환 학습 시스템
                    </p>
                </motion.div>

                {/* Center Circle */}
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", damping: 15, delay: 0.3 }}
                    className="flex justify-center mb-12"
                >
                    <div className="relative">
                        <div className="w-40 h-40 rounded-full glass flex flex-col items-center justify-center text-center p-4 animate-pulse-glow">
                            <span className="text-sm text-white/60">핵심</span>
                            <span className="text-xl font-bold gradient-text">운영 원칙</span>
                            <span className="text-xs text-white/50 mt-2">기초 ↔ 프로젝트</span>
                        </div>

                        {/* Orbiting Lines */}
                        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "20s" }}>
                            {[0, 72, 144, 216, 288].map((deg, i) => (
                                <div
                                    key={i}
                                    className="absolute top-1/2 left-1/2 w-1 h-24 origin-bottom"
                                    style={{
                                        transform: `translate(-50%, -100%) rotate(${deg}deg)`,
                                        background: `linear-gradient(to top, ${tracks[i].color}40, transparent)`,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Track Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
                >
                    {tracks.map((track) => (
                        <motion.div
                            key={track.id}
                            variants={itemVariants}
                            whileHover={{
                                y: -10,
                                boxShadow: `0 20px 40px ${track.color}30`
                            }}
                            className="card group cursor-pointer"
                            style={{
                                borderColor: `${track.color}30`,
                            }}
                        >
                            {/* Icon */}
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                                style={{ background: `${track.color}20` }}
                            >
                                <track.icon className="w-7 h-7" style={{ color: track.color }} />
                            </div>

                            {/* Label */}
                            <div
                                className="text-xs font-bold tracking-wider mb-2"
                                style={{ color: track.color }}
                            >
                                {track.id.toUpperCase()}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg font-bold text-white mb-1">{track.name}</h3>
                            <p className="text-sm text-white/50 mb-4">{track.subtitle}</p>

                            {/* Features */}
                            <ul className="space-y-2">
                                {track.features.map((feature, i) => (
                                    <li
                                        key={i}
                                        className="text-sm text-white/70 flex items-center gap-2"
                                    >
                                        <span
                                            className="w-1.5 h-1.5 rounded-full"
                                            style={{ background: track.color }}
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {/* Hover Glow */}
                            <div
                                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                                style={{
                                    background: `radial-gradient(circle at center, ${track.color}10, transparent 70%)`,
                                }}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Note */}
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-white/50 mt-12"
                >
                    💡 모든 트랙은 기초 개념부터 프로젝트까지 순환 학습합니다
                </motion.p>
            </div>
        </section>
    );
}
