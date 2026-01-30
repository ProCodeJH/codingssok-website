"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const tracks = [
    { num: "01", title: "기초 트랙", desc: "스크래치/엔트리로 컴퓨팅 사고력 배양" },
    { num: "02", title: "텍스트 코딩", desc: "Python, C언어 체계적 학습" },
    { num: "03", title: "알고리즘", desc: "문제 해결력과 논리적 사고력 강화" },
    { num: "04", title: "프로젝트", desc: "실전 프로젝트로 포트폴리오 완성" },
    { num: "05", title: "대회/자격증", desc: "정보올림피아드, 자격증 취득 준비" },
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
                        <span className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full inline-block mb-6">
                            커리큘럼
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            체계적인 5트랙으로
                            <br />
                            <span className="text-gray-400">완벽한 실력 완성</span>
                        </h2>
                    </motion.div>

                    {/* 5 Tracks Grid */}
                    <div className="grid md:grid-cols-5 gap-6 mb-24">
                        {tracks.map((track, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors"
                            >
                                <span className="text-4xl font-bold text-gray-200 block mb-4">
                                    {track.num}
                                </span>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {track.title}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {track.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Feature Grid */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
                                학습 진도를
                                <br />
                                실시간으로 확인하세요
                            </h3>

                            <div className="space-y-6 mb-10">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-blue-600 font-bold">1</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">실시간 진도 추적</h4>
                                        <p className="text-gray-500">언제든 자녀의 학습 현황을 확인할 수 있어요</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-green-600 font-bold">2</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">맞춤형 피드백</h4>
                                        <p className="text-gray-500">개인별 강약점 분석과 맞춤 학습 제안</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                                        <span className="text-purple-600 font-bold">3</span>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-900 mb-1">자동 알림</h4>
                                        <p className="text-gray-500">중요한 일정과 과제는 자동으로 알려드려요</p>
                                    </div>
                                </div>
                            </div>

                            <motion.a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                상담 신청하기 →
                            </motion.a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:flex justify-center"
                        >
                            <Image
                                src="/images/phone.png"
                                alt="Mobile learning app"
                                width={280}
                                height={560}
                                className="drop-shadow-2xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: 소통 섹션 */}
            <section className="py-32 bg-gray-50">
                <div className="max-w-7xl mx-auto px-8 lg:px-12">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative rounded-3xl overflow-hidden h-[500px] hidden lg:block"
                        >
                            <Image
                                src="/images/mentor.png"
                                alt="Mentor teaching"
                                fill
                                className="object-cover"
                                quality={90}
                            />
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full inline-block mb-6">
                                실시간 소통
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                                언제든 연락주세요.
                                <br />
                                <span className="text-gray-400">바로 답변드릴게요.</span>
                            </h2>
                            <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                                카카오톡, 문자, 전화 — 편하신 방법으로 연락주시면 됩니다.
                                학습 상담부터 진도 문의까지 실시간으로 도와드려요.
                            </p>

                            {/* Chat Preview */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
                                <div className="space-y-4">
                                    <div className="flex justify-end">
                                        <div className="bg-blue-500 text-white px-5 py-3 rounded-2xl rounded-br-md text-sm max-w-[200px]">
                                            우리 아이 진도가 어떻게 되나요?
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs font-bold">쏙</span>
                                        </div>
                                        <div className="bg-gray-100 px-5 py-3 rounded-2xl rounded-bl-md text-sm">
                                            Python 3장까지 완료했어요! 다음 수업은 수요일이에요 :)
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-blue-600 font-medium hover:underline"
                            >
                                상담 신청하기 →
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
