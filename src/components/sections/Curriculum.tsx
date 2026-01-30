"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const tracks = [
    { num: "01", title: "기초 트랙", desc: "스크래치/엔트리로 컴퓨팅 사고력 배양", color: "blue" },
    { num: "02", title: "텍스트 코딩", desc: "Python, C언어 체계적 학습", color: "purple" },
    { num: "03", title: "알고리즘", desc: "문제 해결력과 논리적 사고력 강화", color: "green" },
    { num: "04", title: "프로젝트", desc: "실전 프로젝트로 포트폴리오 완성", color: "orange" },
    { num: "05", title: "대회/자격증", desc: "정보올림피아드, 자격증 취득 준비", color: "pink" },
];

export default function Curriculum() {
    return (
        <>
            {/* Section 1: 5트랙 커리큘럼 */}
            <section id="curriculum" className="py-32 bg-white">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-200/50 rounded-full mb-6">
                            <span className="text-sm font-medium text-blue-700">커리큘럼</span>
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                            체계적인 5트랙으로
                            <br />
                            <span className="text-gray-400">완벽한 실력 완성</span>
                        </h2>
                    </motion.div>

                    {/* 5 Tracks Grid */}
                    <div className="grid md:grid-cols-5 gap-6 mb-32">
                        {tracks.map((track, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="group bg-gray-50 rounded-3xl p-6 hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100"
                            >
                                <span className="text-4xl font-bold text-gray-200 group-hover:text-blue-200 transition-colors block mb-4">
                                    {track.num}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {track.title}
                                </h3>
                                <p className="text-sm text-gray-500 leading-relaxed">
                                    {track.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Feature Grid with Image */}
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                                학습 진도를
                                <br />
                                <span className="text-gray-400">실시간으로 확인하세요</span>
                            </h3>

                            <div className="space-y-6 mb-10">
                                {[
                                    { num: "01", title: "실시간 진도 추적", desc: "언제든 자녀의 학습 현황을 확인할 수 있어요", color: "blue" },
                                    { num: "02", title: "맞춤형 피드백", desc: "개인별 강약점 분석과 맞춤 학습 제안", color: "green" },
                                    { num: "03", title: "자동 알림", desc: "중요한 일정과 과제는 자동으로 알려드려요", color: "purple" }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1, duration: 0.6 }}
                                        className="flex gap-4"
                                    >
                                        <div className={`w-12 h-12 rounded-2xl bg-${item.color}-100 flex items-center justify-center flex-shrink-0`}>
                                            <span className={`text-${item.color}-600 font-bold text-sm`}>{item.num}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                                            <p className="text-gray-500">{item.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all shadow-lg"
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                상담 신청하기 <span className="opacity-60">→</span>
                            </motion.a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:flex justify-center"
                        >
                            <motion.div
                                animate={{ y: [0, -12, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image
                                    src="/images/phone-Photoroom.png"
                                    alt="Mobile learning app"
                                    width={300}
                                    height={600}
                                    className="drop-shadow-2xl"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: 소통 섹션 */}
            <section className="py-32 bg-gradient-to-br from-gray-50 to-blue-50/30">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-3xl overflow-hidden h-[500px] hidden lg:block shadow-2xl"
                        >
                            <Image
                                src="/images/consultation.png"
                                alt="Parent consultation"
                                fill
                                className="object-cover"
                                quality={90}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-200/50 rounded-full mb-6">
                                <span className="text-sm font-medium text-green-700">실시간 소통</span>
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                언제든 연락주세요.
                                <br />
                                <span className="text-gray-400">바로 답변드릴게요.</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                카카오톡, 문자, 전화 — 편하신 방법으로 연락주시면 됩니다.
                                학습 상담부터 진도 문의까지 실시간으로 도와드려요.
                            </p>

                            {/* Chat Preview */}
                            <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100 mb-8">
                                <div className="space-y-4">
                                    <div className="flex justify-end">
                                        <div className="bg-blue-500 text-white px-5 py-3 rounded-2xl rounded-br-md text-sm max-w-[220px]">
                                            우리 아이 진도가 어떻게 되나요?
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center flex-shrink-0 shadow-lg">
                                            <span className="text-white text-xs font-bold">쏙</span>
                                        </div>
                                        <div className="bg-gray-50 px-5 py-3 rounded-2xl rounded-bl-md text-sm">
                                            Python 3장까지 완료했어요! 다음 수업은 수요일이에요 :)
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                                whileHover={{ x: 4 }}
                            >
                                상담 신청하기 <span>→</span>
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
