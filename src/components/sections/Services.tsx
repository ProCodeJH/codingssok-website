"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code, Cpu, Trophy } from "lucide-react";

const services = [
    {
        icon: Code,
        title: "텍스트 코딩",
        desc: "C언어 · Python 체계적 학습",
        items: ["문법 기초부터 심화", "알고리즘 문제풀이", "프로젝트 개발"],
    },
    {
        icon: Cpu,
        title: "피지컬 컴퓨팅",
        desc: "하드웨어와 소프트웨어 연결",
        items: ["아두이노 IoT", "센서 활용 실습", "로봇 제어"],
    },
    {
        icon: Trophy,
        title: "대회 & 자격증",
        desc: "목표 달성을 위한 집중 케어",
        items: ["정보올림피아드", "SW 공모전", "정보처리기능사"],
    },
];

export default function Services() {
    return (
        <>
            {/* Quote Section */}
            <section className="py-24 bg-gray-900">
                <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white leading-relaxed mb-8">
                            "우리 아이가 직접 만든 게임을
                            <br />
                            저한테 자랑할 때 가장 뿌듯해요."
                        </p>
                        <p className="text-gray-400">— 학부모 김OO님</p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Services</p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            맞춤형 코딩 교육
                        </h2>
                        <p className="text-lg text-gray-500">
                            IT 현직자가 직접 가르칩니다
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-shadow"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-gray-900 flex items-center justify-center mx-auto mb-6">
                                    <service.icon size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-500 mb-6">{service.desc}</p>
                                <ul className="space-y-2">
                                    {service.items.map((item, j) => (
                                        <li key={j} className="text-sm text-gray-600">
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
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            수업 현장
                        </h2>
                    </motion.div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                                className="relative aspect-[4/3] rounded-2xl overflow-hidden group"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
