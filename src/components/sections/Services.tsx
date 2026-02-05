"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code, Cpu, Trophy, Quote } from "lucide-react";

const services = [
    {
        icon: Code,
        title: "텍스트 코딩",
        desc: "C언어 · Python",
        items: ["문법 기초부터 심화", "알고리즘 문제풀이", "프로젝트 개발"],
        gradient: "from-blue-500 to-cyan-500",
        bgGradient: "from-blue-50 to-cyan-50",
    },
    {
        icon: Cpu,
        title: "피지컬 컴퓨팅",
        desc: "아두이노 · IoT",
        items: ["센서 활용 실습", "로봇 제어", "하드웨어 연동"],
        gradient: "from-purple-500 to-pink-500",
        bgGradient: "from-purple-50 to-pink-50",
    },
    {
        icon: Trophy,
        title: "대회 & 자격증",
        desc: "목표 달성 케어",
        items: ["정보올림피아드", "SW 공모전", "정보처리기능사"],
        gradient: "from-amber-500 to-orange-500",
        bgGradient: "from-amber-50 to-orange-50",
    },
];

export default function Services() {
    return (
        <>
            {/* Quote */}
            <section className="w-full bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex justify-center relative overflow-hidden" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
                {/* Background effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mb-8">
                            <Quote size={32} className="text-white" />
                        </div>
                        <p className="text-2xl lg:text-4xl text-white leading-relaxed mb-8 font-medium">
                            "우리 아이가 직접 만든 게임을
                            <br />
                            저한테 자랑할 때 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">가장 뿌듯해요</span>."
                        </p>
                        <p className="text-gray-400 text-lg">— 학부모 김OO님</p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="w-full bg-gradient-to-b from-gray-50 to-white flex justify-center" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
                <div className="w-full max-w-6xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center" style={{ marginBottom: '100px' }}
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                            🎓 SERVICES
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            맞춤형 <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">코딩 교육</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-md mx-auto">
                            현직 개발자가 직접 설계한 커리큘럼
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`bg-gradient-to-br ${service.bgGradient} rounded-3xl p-8 text-center hover:shadow-xl transition-all duration-300 border border-white/50`}
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                                    <service.icon size={28} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-500 mb-6">{service.desc}</p>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    {service.items.map((item, j) => (
                                        <li key={j} className="flex items-center justify-center gap-2">
                                            <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="w-full bg-white flex justify-center" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
                <div className="w-full max-w-6xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center" style={{ marginBottom: '60px' }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            📸 수업 현장
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { src: "/images/classroom1.png", alt: "수업 현장 1" },
                            { src: "/images/mentor1.png", alt: "멘토링" },
                            { src: "/images/robot.png", alt: "로봇 프로젝트" },
                        ].map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="aspect-[4/3] relative rounded-3xl overflow-hidden group shadow-lg"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
