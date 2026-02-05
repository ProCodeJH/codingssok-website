"use client";

import { motion } from "framer-motion";

const tracks = [
    { num: "01", title: "기초", desc: "스크래치 · 엔트리" },
    { num: "02", title: "C언어", desc: "문법 · 알고리즘" },
    { num: "03", title: "Python", desc: "데이터 · 자동화" },
    { num: "04", title: "아두이노", desc: "IoT · 로봇" },
    { num: "05", title: "대회", desc: "정보올림피아드" },
];

const features = [
    { title: "실시간 진도 추적", desc: "학부모 앱으로 언제든 확인" },
    { title: "1:1 맞춤 피드백", desc: "개인별 강약점 분석" },
    { title: "프로젝트 포트폴리오", desc: "대입 · 취업 활용" },
];

export default function Curriculum() {
    return (
        <section id="curriculum" className="w-full py-48 bg-white flex justify-center">
            <div className="w-full max-w-6xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Curriculum</p>
                    <h2 className="text-4xl font-bold text-gray-900">
                        체계적인 5트랙 커리큘럼
                    </h2>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-12 mb-32">
                    {tracks.map((track, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="group w-40 bg-gray-50 hover:bg-gray-900 rounded-2xl p-6 text-center cursor-pointer transition-colors"
                        >
                            <span className="text-3xl font-bold text-gray-200 group-hover:text-gray-700 block mb-2 transition-colors">
                                {track.num}
                            </span>
                            <h3 className="font-bold text-gray-900 group-hover:text-white mb-1 transition-colors">
                                {track.title}
                            </h3>
                            <p className="text-sm text-gray-500 group-hover:text-gray-400 transition-colors">
                                {track.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="flex flex-wrap justify-center gap-12">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.05 }}
                            className="w-72 bg-gray-50 rounded-2xl p-8 text-center"
                        >
                            <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-5 font-bold">
                                {String(i + 1).padStart(2, '0')}
                            </div>
                            <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                            <p className="text-gray-500">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
