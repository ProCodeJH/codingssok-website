"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code, Cpu, Trophy, Quote, Sparkles } from "lucide-react";

const services = [
    {
        icon: Code,
        title: "텍스트 코딩",
        desc: "C언어 · Python",
        items: ["문법 기초부터 심화", "알고리즘 문제풀이", "프로젝트 개발"],
        gradient: "from-blue-500 to-cyan-500",
    },
    {
        icon: Cpu,
        title: "피지컬 컴퓨팅",
        desc: "아두이노 · IoT",
        items: ["센서 활용 실습", "로봇 제어", "하드웨어 연동"],
        gradient: "from-purple-500 to-pink-500",
    },
    {
        icon: Trophy,
        title: "대회 & 자격증",
        desc: "목표 달성 케어",
        items: ["정보올림피아드", "SW 공모전", "정보처리기능사"],
        gradient: "from-amber-500 to-orange-500",
    },
];

const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function Services() {
    return (
        <>
            {/* Quote Section */}
            <section className="section-cosmic bg-cosmic relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-transparent to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />

                <div className="relative z-10 w-full max-w-4xl mx-auto px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Quote size={48} className="mx-auto mb-8 text-purple-400 opacity-50" />
                        <p className="text-2xl lg:text-4xl font-medium text-white leading-relaxed mb-8">
                            "우리 아이가 직접 만든 게임을
                            <br />
                            <span className="text-gradient">저한테 자랑할 때</span> 가장 뿌듯해요."
                        </p>
                        <p className="text-gray-400 text-lg">— 학부모 김OO님</p>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="section-cosmic bg-cosmic noise">
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
                            <Sparkles size={14} />
                            SERVICES
                        </span>
                        <h2 className="section-title text-gradient mb-4">
                            맞춤형 코딩 교육
                        </h2>
                        <p className="section-subtitle mx-auto">
                            현직 개발자가 직접 설계한 커리큘럼
                        </p>
                    </motion.div>

                    {/* Service Cards */}
                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                variants={item}
                                className="glass-card p-8 text-center group"
                                whileHover={{ y: -12 }}
                            >
                                {/* Icon */}
                                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:animate-pulse-glow transition-all`}>
                                    <service.icon size={28} className="text-white" />
                                </div>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                                <p className="text-purple-300 text-sm mb-6">{service.desc}</p>

                                {/* Items */}
                                <ul className="space-y-3">
                                    {service.items.map((item, j) => (
                                        <li key={j} className="text-gray-400 flex items-center justify-center gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="section-cosmic bg-cosmic grid-pattern">
                <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="section-title text-gradient">
                            수업 현장
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-5 gap-4"
                    >
                        {[
                            { src: "/images/classroom1.png", alt: "수업 현장" },
                            { src: "/images/mentor1.png", alt: "1:1 멘토링" },
                            { src: "/images/robot.png", alt: "아두이노 프로젝트" },
                            { src: "/images/competition.png", alt: "대회 수상" },
                            { src: "/images/collaboration.png", alt: "팀 프로젝트" },
                        ].map((img, i) => (
                            <motion.div
                                key={i}
                                variants={item}
                                className="aspect-[4/3] relative rounded-2xl overflow-hidden glass-card p-1 group"
                                whileHover={{ scale: 1.02 }}
                            >
                                <div className="w-full h-full relative rounded-xl overflow-hidden">
                                    <Image
                                        src={img.src}
                                        alt={img.alt}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <p className="absolute bottom-4 left-4 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        {img.alt}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </>
    );
}
