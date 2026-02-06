"use client";

import { motion } from "framer-motion";
import { BookOpen, Code, Rocket, Cpu, Trophy, Users, LineChart, Briefcase } from "lucide-react";

const tracks = [
    { num: "01", title: "기초", desc: "스크래치 · 엔트리", icon: BookOpen, color: "from-cyan-500 to-blue-500" },
    { num: "02", title: "C언어", desc: "문법 · 알고리즘", icon: Code, color: "from-purple-500 to-violet-500" },
    { num: "03", title: "Python", desc: "데이터 · 자동화", icon: Rocket, color: "from-pink-500 to-rose-500" },
    { num: "04", title: "아두이노", desc: "IoT · 로봇", icon: Cpu, color: "from-emerald-500 to-green-500" },
    { num: "05", title: "대회", desc: "정보올림피아드", icon: Trophy, color: "from-amber-500 to-orange-500" },
];

const features = [
    { num: "01", title: "실시간 진도 추적", desc: "학부모 앱으로 언제든 확인", icon: LineChart },
    { num: "02", title: "1:1 맞춤 피드백", desc: "개인별 강약점 분석", icon: Users },
    { num: "03", title: "프로젝트 포트폴리오", desc: "대입 · 취업 활용", icon: Briefcase },
];

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function Curriculum() {
    return (
        <section id="curriculum" className="section-cosmic bg-cosmic grid-pattern">
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
                        <BookOpen size={14} />
                        CURRICULUM
                    </span>
                    <h2 className="section-title text-gradient mb-4">
                        체계적인 5트랙 커리큘럼
                    </h2>
                    <p className="section-subtitle mx-auto">
                        단계별 맞춤 학습으로 실력을 키워요
                    </p>
                </motion.div>

                {/* 5 Tracks */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-20"
                >
                    {tracks.map((track, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            className="glass-card p-6 text-center group cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                        >
                            {/* Icon */}
                            <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center shadow-lg group-hover:animate-pulse-glow`}>
                                <track.icon size={20} className="text-white" />
                            </div>

                            {/* Number */}
                            <span className="text-2xl font-bold text-gray-600 block mb-1">
                                {track.num}
                            </span>

                            {/* Title */}
                            <h3 className="font-bold text-white mb-1 group-hover:text-gradient transition-all">
                                {track.title}
                            </h3>

                            {/* Desc */}
                            <p className="text-xs text-gray-400">
                                {track.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Features */}
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            variants={item}
                            className="glass-card p-8 text-center group"
                            whileHover={{ y: -8 }}
                        >
                            {/* Number Badge */}
                            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold shadow-lg shadow-purple-500/30">
                                {feature.num}
                            </div>

                            {/* Icon */}
                            <feature.icon size={32} className="mx-auto mb-4 text-purple-400" />

                            {/* Title */}
                            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>

                            {/* Desc */}
                            <p className="text-gray-400">{feature.desc}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
