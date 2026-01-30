"use client";

import { motion } from "framer-motion";

const services = [
    {
        num: "01",
        title: "텍스트 코딩 심화",
        desc: "C언어와 Python을 체계적으로 배웁니다",
        features: ["C언어 기초부터 심화", "Python 프로그래밍", "알고리즘 문제풀이"]
    },
    {
        num: "02",
        title: "피지컬 컴퓨팅",
        desc: "하드웨어와 소프트웨어를 연결합니다",
        features: ["아두이노 IoT 프로젝트", "센서 활용 실습", "로봇 제어"]
    },
    {
        num: "03",
        title: "대회 & 자격증",
        desc: "목표를 향해 체계적으로 준비합니다",
        features: ["정보올림피아드 대비", "SW 공모전 준비", "정보처리기능사"]
    },
];

const features = [
    { title: "학습 관리", items: ["출결 체크", "진도 확인", "과제 피드백"] },
    { title: "포트폴리오", items: ["프로젝트 정리", "GitHub 관리", "발표 자료"] },
    { title: "대회 준비", items: ["공모전 일정", "자격증 준비", "면접 대비"] },
];

export default function Services() {
    return (
        <>
            {/* Features Grid Section */}
            <section id="services" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            세세한 것까지
                            <br />
                            <span className="text-gray-400">다 챙겨드립니다</span>
                        </h2>
                    </motion.div>

                    {/* 3-Column Features */}
                    <div className="grid md:grid-cols-3 gap-12 mb-24">
                        {features.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.8 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl font-bold text-gray-400">{String(i + 1).padStart(2, '0')}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                                <div className="space-y-2">
                                    {item.items.map((text, j) => (
                                        <p key={j} className="text-gray-500">{text}</p>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Section */}
            <section className="py-32 bg-gray-900 text-white">
                <div className="max-w-4xl mx-auto px-8 lg:px-12 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <p className="text-2xl md:text-3xl font-light leading-relaxed mb-12">
                            &quot;코딩쏙은 우리 학원의 운영 방식을 완전히 바꿔놓았습니다.
                            <br /><br />
                            더 이상 수업 관리에 시간을 쏟지 않고
                            학생들의 실력 향상에만 집중합니다.&quot;
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="text-white font-bold text-lg">쏙</span>
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-lg">코딩쏙 학원</p>
                                <p className="text-gray-400">IT 교육 전문</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Cards */}
            <section className="py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <span className="px-4 py-2 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full inline-block mb-6">
                            서비스
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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
                                className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-300"
                            >
                                <span className="text-5xl font-bold text-gray-100 block mb-6">
                                    {service.num}
                                </span>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                <p className="text-gray-500 text-sm mb-8">{service.desc}</p>
                                <div className="space-y-3">
                                    {service.features.map((f, j) => (
                                        <p key={j} className="flex items-center gap-3 text-gray-600 text-sm">
                                            <span className="text-blue-500">→</span>
                                            {f}
                                        </p>
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
