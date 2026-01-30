"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const services = [
    {
        num: "01",
        title: "텍스트 코딩 심화",
        desc: "C언어와 Python을 체계적으로",
        features: ["C언어 기초~심화", "Python 프로그래밍", "알고리즘 문제풀이"]
    },
    {
        num: "02",
        title: "피지컬 컴퓨팅",
        desc: "하드웨어와 소프트웨어 연결",
        features: ["아두이노 IoT", "센서 프로젝트", "로봇 제어"]
    },
    {
        num: "03",
        title: "대회 & 자격증",
        desc: "목표를 향해 체계적 준비",
        features: ["정보올림피아드", "SW 공모전", "정보처리기능사"]
    },
];

const highlights = [
    { title: "학습 관리", items: ["출결 체크", "진도 확인", "과제 피드백"] },
    { title: "포트폴리오", items: ["프로젝트 정리", "GitHub 관리", "발표 자료"] },
    { title: "대회 준비", items: ["공모전 일정", "자격증 준비", "면접 대비"] },
];

export default function Services() {
    return (
        <>
            {/* Highlights Section */}
            <section id="services" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="heading-section mb-4">
                            세세한 것까지
                            <br />
                            <span className="text-gray-400">다 챙겨드립니다.</span>
                        </h2>
                    </motion.div>

                    {/* 3-Column Highlights */}
                    <div className="grid md:grid-cols-3 gap-12 mb-24">
                        {highlights.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="text-center"
                            >
                                <h3 className="heading-small mb-6">{item.title}</h3>
                                <div className="space-y-3">
                                    {item.items.map((text, j) => (
                                        <p key={j} className="text-gray-500">{text}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section with Background */}
            <section className="relative min-h-[80vh] flex items-center overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="/images/mentor.png"
                        alt="Mentor teaching"
                        fill
                        className="object-cover"
                        quality={90}
                    />
                    <div className="absolute inset-0 gradient-overlay-left" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        <p className="quote-white text-2xl mb-10 leading-relaxed">
                            &quot;코딩쏙은 우리 학원의 운영 방식을 완전히 바꿔놓았습니다.
                            <br /><br />
                            우리 팀은 더 이상 수업 관리에 시간을 쏟지 않고
                            학생들의 실력 향상에만 집중합니다.
                            <br /><br />
                            믿을 수 있는 학습 시스템 덕분에, 오버헤드 없이 완전한 교육팀처럼 운영됩니다.&quot;
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
                                <span className="text-white font-bold text-lg">쏙</span>
                            </div>
                            <div>
                                <p className="text-white font-medium text-lg">코딩쏙 학원</p>
                                <p className="text-white/50">IT 교육 전문</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-32 section-light">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <span className="label mb-4 block">서비스</span>
                        <h2 className="heading-section mb-4">
                            IT 현직자가
                            <br />
                            <span className="text-gray-400">직접 가르칩니다</span>
                        </h2>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="card p-8 hover:shadow-2xl transition-all duration-500"
                            >
                                <div className="text-5xl font-bold text-gray-200 mb-6">{service.num}</div>
                                <h3 className="heading-card mb-2">{service.title}</h3>
                                <p className="text-body text-sm mb-6">{service.desc}</p>
                                <div className="space-y-3">
                                    {service.features.map((f, j) => (
                                        <p key={j} className="feature-point text-sm">{f}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
