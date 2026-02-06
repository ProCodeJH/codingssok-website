"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code, Cpu, Trophy } from "lucide-react";

const services = [
    {
        icon: Code,
        title: "텍스트 코딩",
        desc: "C언어 · Python",
        items: ["문법 기초부터 심화", "알고리즘 문제풀이", "프로젝트 개발"],
    },
    {
        icon: Cpu,
        title: "피지컬 컴퓨팅",
        desc: "아두이노 · IoT",
        items: ["센서 활용 실습", "로봇 제어", "하드웨어 연동"],
    },
    {
        icon: Trophy,
        title: "대회 & 자격증",
        desc: "목표 달성 케어",
        items: ["정보올림피아드", "SW 공모전", "정보처리기능사"],
    },
];

export default function Services() {
    return (
        <>
            {/* Quote */}
            <section className="w-full bg-gray-900 flex justify-center" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
                <div className="w-full max-w-3xl mx-auto px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-xl lg:text-2xl text-white leading-relaxed mb-6">
                            "우리 아이가 직접 만든 게임을
                            <br />
                            저한테 자랑할 때 가장 뿌듯해요."
                        </p>
                        <p className="text-gray-400">— 학부모 김OO님</p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="w-full bg-gray-50 flex justify-center" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
                <div className="w-full max-w-5xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center" style={{ marginBottom: '80px' }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                            맞춤형 코딩 교육
                        </h2>
                        <p className="text-gray-500">
                            현직 개발자가 직접 설계한 커리큘럼
                        </p>
                    </motion.div>

                    {/* 서비스 카드 - 동일 높이 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center bg-white rounded-2xl p-8 border border-gray-200 shadow-sm"
                                style={{ minHeight: '320px' }}
                            >
                                <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                                    <service.icon size={24} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 text-center">{service.title}</h3>
                                <p className="text-sm text-gray-500 mb-6 text-center">{service.desc}</p>
                                <ul className="space-y-2 text-sm text-gray-600 text-center mt-auto">
                                    {service.items.map((item, j) => (
                                        <li key={j}>{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="w-full bg-white flex justify-center" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
                <div className="w-full max-w-5xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center" style={{ marginBottom: '60px' }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            수업 현장
                        </h2>
                    </motion.div>

                    {/* 갤러리 - 동일 높이 (aspect ratio) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                className="aspect-[4/3] relative rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 shadow-sm hover:shadow-xl hover:shadow-purple-500/10 transition-all"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
