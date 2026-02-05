"use client";

import { motion } from "framer-motion";
import { BookOpen, Zap, Rocket, Cpu, Trophy } from "lucide-react";

const tracks = [
    { num: "01", title: "기초", desc: "스크래치 · 엔트리", icon: BookOpen, color: "from-blue-500 to-cyan-500" },
    { num: "02", title: "C언어", desc: "문법 · 알고리즘", icon: Zap, color: "from-yellow-500 to-orange-500" },
    { num: "03", title: "Python", desc: "데이터 · 자동화", icon: Rocket, color: "from-green-500 to-emerald-500" },
    { num: "04", title: "아두이노", desc: "IoT · 로봇", icon: Cpu, color: "from-purple-500 to-pink-500" },
    { num: "05", title: "대회", desc: "정보올림피아드", icon: Trophy, color: "from-red-500 to-rose-500" },
];

const features = [
    { title: "실시간 진도 추적", desc: "학부모 앱으로 언제든 확인", emoji: "📊" },
    { title: "1:1 맞춤 피드백", desc: "개인별 강약점 분석", emoji: "💬" },
    { title: "프로젝트 포트폴리오", desc: "대입 · 취업 활용", emoji: "🎯" },
];

export default function Curriculum() {
    return (
        <section id="curriculum" className="w-full bg-gradient-to-b from-white to-gray-50 flex justify-center" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
            <div className="w-full max-w-6xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '100px' }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                        📚 CURRICULUM
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        체계적인 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">5트랙</span> 커리큘럼
                    </h2>
                    <p className="text-lg text-gray-500 max-w-md mx-auto">
                        단계별 맞춤 학습으로 코딩 실력을 키워보세요
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6" style={{ marginBottom: '100px' }}>
                    {tracks.map((track, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="group relative bg-white rounded-2xl p-6 text-center cursor-pointer border border-gray-100 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden"
                        >
                            {/* Gradient overlay on hover */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            <div className="relative z-10">
                                <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${track.color} flex items-center justify-center group-hover:bg-white/20 transition-colors`}>
                                    <track.icon size={24} className="text-white" />
                                </div>
                                <span className="text-3xl font-bold text-gray-200 group-hover:text-white/50 block mb-2 transition-colors">
                                    {track.num}
                                </span>
                                <h3 className="font-bold text-gray-900 group-hover:text-white mb-1 transition-colors">
                                    {track.title}
                                </h3>
                                <p className="text-sm text-gray-500 group-hover:text-white/80 transition-colors">
                                    {track.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-2xl p-8 text-center border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="text-4xl mb-5">{feature.emoji}</div>
                            <h3 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h3>
                            <p className="text-gray-500">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
