"use client";

import { motion } from "framer-motion";
import TiltCard from "@/components/ui/TiltCard";
import TextReveal from "@/components/ui/TextReveal";
import StaggerReveal from "@/components/ui/StaggerReveal";

const tracks = [
    { icon: "🧩", title: "스크래치/엔트리", desc: "비주얼 프로그래밍으로 코딩 사고력 기초를 다집니다.", level: "입문", color: "from-emerald-400 to-teal-500" },
    { icon: "🐍", title: "Python", desc: "데이터 분석, AI 기초까지 가장 인기 있는 언어를 배웁니다.", level: "기초~중급", color: "from-blue-400 to-indigo-500" },
    { icon: "⚙️", title: "C/C++", desc: "정보올림피아드 & 알고리즘 대회를 위한 핵심 언어입니다.", level: "중급~심화", color: "from-orange-400 to-red-500" },
    { icon: "🤖", title: "Arduino/IoT", desc: "하드웨어와 소프트웨어를 결합한 창의적 프로젝트를 만듭니다.", level: "응용", color: "from-purple-400 to-pink-500" },
    { icon: "📱", title: "앱 개발", desc: "실제 사용 가능한 모바일 앱을 직접 기획하고 개발합니다.", level: "프로젝트", color: "from-cyan-400 to-blue-500" },
];

export default function Curriculum() {
    return (
        <section id="curriculum" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
                <div className="text-center mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-200/50 rounded-full mb-6"
                    >
                        <span className="text-sm font-medium text-green-700">커리큘럼</span>
                    </motion.span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        <TextReveal delay={0.1} stagger={0.06}>단계별 맞춤 학습 로드맵</TextReveal>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        <TextReveal delay={0.4} stagger={0.02} splitBy="word">입문부터 대회 준비까지 체계적으로 성장합니다</TextReveal>
                    </p>
                </div>

                <StaggerReveal className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" stagger={0.12} distance={50}>
                    {tracks.map((track, i) => (
                        <TiltCard key={i} className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full group" tiltDegree={6}>
                            <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${track.color} text-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                {track.icon}
                            </div>
                            <span className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full mb-3">{track.level}</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{track.title}</h3>
                            <p className="text-gray-500 leading-relaxed">{track.desc}</p>
                        </TiltCard>
                    ))}
                </StaggerReveal>
            </div>
        </section>
    );
}
