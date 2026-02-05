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
            <section className="w-full py-24 bg-gray-900 flex justify-center">
                <div className="w-full max-w-4xl mx-auto px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-2xl lg:text-3xl text-white leading-relaxed mb-6">
                            "우리 아이가 직접 만든 게임을
                            <br />
                            저한테 자랑할 때 가장 뿌듯해요."
                        </p>
                        <p className="text-gray-400">— 학부모 김OO님</p>
                    </motion.div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="w-full py-24 bg-gray-50 flex justify-center">
                <div className="w-full max-w-6xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Services</p>
                        <h2 className="text-4xl font-bold text-gray-900">
                            맞춤형 코딩 교육
                        </h2>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-6">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="w-80 bg-white rounded-2xl p-8 text-center hover:shadow-lg transition-shadow"
                            >
                                <div className="w-14 h-14 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <service.icon size={24} className="text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
                                <p className="text-gray-500 mb-6">{service.desc}</p>
                                <ul className="space-y-2 text-sm text-gray-600">
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
            <section className="w-full py-24 bg-white flex justify-center">
                <div className="w-full max-w-6xl mx-auto px-8">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-gray-900 text-center mb-12"
                    >
                        수업 현장
                    </motion.h2>

                    <div className="flex flex-wrap justify-center gap-4">
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
                                transition={{ delay: i * 0.05 }}
                                className="w-80 aspect-[4/3] relative rounded-2xl overflow-hidden group"
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
