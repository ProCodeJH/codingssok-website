"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Code, Terminal, Cpu, Trophy, Rocket, BarChart3, MessageSquare, Target } from "lucide-react";

const tracks = [
    { num: "01", title: "기초", desc: "스크래치 · 엔트리", icon: Rocket, color: "from-emerald-500 to-teal-500", shadow: "shadow-emerald-500/30", detail: "컴퓨팅 사고력 기초" },
    { num: "02", title: "C언어", desc: "문법 · 알고리즘", icon: Terminal, color: "from-blue-500 to-indigo-500", shadow: "shadow-blue-500/30", detail: "프로그래밍의 근본" },
    { num: "03", title: "Python", desc: "데이터 · 자동화", icon: Code, color: "from-cyan-500 to-blue-500", shadow: "shadow-cyan-500/30", detail: "현업 실무 언어" },
    { num: "04", title: "아두이노", desc: "IoT · 로봇", icon: Cpu, color: "from-violet-500 to-purple-500", shadow: "shadow-violet-500/30", detail: "하드웨어 융합" },
    { num: "05", title: "대회", desc: "정보올림피아드", icon: Trophy, color: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/30", detail: "실전 경쟁력 확보" },
];

const features = [
    { num: "01", title: "실시간 진도 추적", desc: "학부모 앱으로 언제든 확인", icon: BarChart3, color: "from-blue-600 to-cyan-500" },
    { num: "02", title: "1:1 맞춤 피드백", desc: "개인별 강약점 분석", icon: MessageSquare, color: "from-indigo-600 to-blue-600" },
    { num: "03", title: "프로젝트 포트폴리오", desc: "대입 · 취업 활용", icon: Target, color: "from-cyan-500 to-blue-600" },
];

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const resetMouse = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={resetMouse}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Curriculum() {
    return (
        <section id="curriculum" className="w-full bg-gradient-to-b from-white via-gray-50 to-white flex justify-center relative overflow-hidden" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
            {/* 배경 장식 + 노이즈 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl" />
                <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
                    <filter id="curr-noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /></filter>
                    <rect width="100%" height="100%" filter="url(#curr-noise)" />
                </svg>
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '80px' }}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-sm text-blue-700 mb-6"
                    >
                        <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        순환형 커리큘럼
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        체계적인 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">5트랙</span> 커리큘럼
                    </h2>
                    <p className="text-lg text-gray-500">
                        단계별 맞춤 학습으로 실력을 키워요
                    </p>
                </motion.div>

                {/* 5트랙 카드 — 모바일 1열, 태블릿 3열, 데스크탑 5열 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5" style={{ marginBottom: '100px' }}>
                    {tracks.map((track, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                            className="group relative"
                        >
                            <TiltCard>
                                {/* 카드 글로우 */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${track.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 translate-y-4`} />

                                {/* 메인 카드 */}
                                <div className="relative bg-white rounded-3xl p-6 border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden"
                                    style={{ minHeight: '220px' }}
                                >
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${track.color}`} />

                                    <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <track.icon size={128} />
                                    </div>

                                    <motion.div
                                        className={`w-14 h-14 bg-gradient-to-br ${track.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg ${track.shadow}`}
                                        whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5 } }}
                                    >
                                        <track.icon size={24} className="text-white" />
                                    </motion.div>

                                    <span className="text-xs font-bold text-gray-300 tracking-widest">
                                        TRACK {track.num}
                                    </span>

                                    <h3 className="text-xl font-bold text-gray-900 mt-1 mb-1">
                                        {track.title}
                                    </h3>

                                    <p className="text-sm text-gray-500 mb-2">
                                        {track.desc}
                                    </p>

                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <span className={`text-xs font-medium text-transparent bg-clip-text bg-gradient-to-r ${track.color}`}>
                                            {track.detail}
                                        </span>
                                    </div>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>

                {/* 특징 카드 — 이모지 제거, 아이콘 기반 */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h3 className="text-2xl font-bold text-gray-900">
                        왜 코딩쏙인가요?
                    </h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                            className="group relative"
                        >
                            <TiltCard>
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 translate-y-4" />

                                <div className="relative bg-white rounded-3xl p-8 border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-300 text-center"
                                    style={{ minHeight: '200px' }}
                                >
                                    {/* 아이콘 (이모지 대체) */}
                                    <motion.div
                                        className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20`}
                                        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                                    >
                                        <feature.icon size={28} className="text-white" />
                                    </motion.div>

                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full text-xs font-bold mb-3 shadow-lg shadow-blue-500/30">
                                        {feature.num}
                                    </span>

                                    <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                                    <p className="text-sm text-gray-500">{feature.desc}</p>
                                </div>
                            </TiltCard>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
