"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Curriculum() {
    return (
        <>
            {/* Section 1: Photo Background with Phone Mockup */}
            <section
                id="curriculum"
                className="relative min-h-[90vh] flex items-center overflow-hidden"
            >
                {/* Background */}
                <div className="absolute inset-0">
                    <Image
                        src="/images/students.png"
                        alt="Students learning coding"
                        fill
                        className="object-cover"
                        quality={90}
                    />
                    <div className="absolute inset-0 gradient-overlay-left" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        {/* Left: Content - 더 여유롭게, 덜 형식적으로 */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-white lg:pl-8"
                        >
                            <span className="text-sm font-medium text-blue-300 tracking-wide mb-6 block">
                                커리큘럼
                            </span>
                            <h2 className="heading-section mb-10">
                                체계적인 5트랙으로
                                <br />
                                <span className="text-white/60">완벽한 코딩 실력 완성</span>
                            </h2>

                            {/* Feature points - 자연스러운 문장 */}
                            <div className="space-y-5 mb-12">
                                <p className="flex items-center gap-4 text-white/90 text-lg">
                                    <span className="text-blue-400">→</span>
                                    실시간으로 학습 진도를 추적해드려요
                                </p>
                                <p className="flex items-center gap-4 text-white/90 text-lg">
                                    <span className="text-blue-400">→</span>
                                    맞춤형 AI가 학습을 도와드려요
                                </p>
                                <p className="flex items-center gap-4 text-white/90 text-lg">
                                    <span className="text-blue-400">→</span>
                                    문제가 생기기 전에 미리 알려드려요
                                </p>
                            </div>

                            {/* Quote - 더 자연스럽게 */}
                            <motion.div
                                className="border-l-2 border-white/30 pl-8"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                <p className="text-white/80 text-lg mb-4 leading-relaxed italic">
                                    &quot;아이가 스스로 열심히 하더라고요.
                                    저희가 일일이 챙기지 않아도 알아서 알려주니까 너무 편해요.&quot;
                                </p>
                                <p className="text-white/40 text-sm">초등 6학년 학부모님</p>
                            </motion.div>
                        </motion.div>

                        {/* Right: Phone Mockup - 투명 배경 */}
                        <motion.div
                            initial={{ opacity: 0, x: 60 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="hidden lg:flex justify-center"
                        >
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Image
                                    src="/images/phone.png"
                                    alt="Mobile learning app"
                                    width={280}
                                    height={560}
                                    className="drop-shadow-2xl"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Section 2: Split Layout */}
            <section className="relative min-h-[80vh]">
                <div className="grid lg:grid-cols-2 min-h-[80vh]">
                    {/* Left: White with content - 패딩 개선 */}
                    <div className="bg-white py-24 px-6 lg:px-16 flex items-center">
                        <div className="max-w-lg ml-auto lg:pr-8">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-sm font-medium text-blue-600 tracking-wide mb-6 block">
                                    실시간 소통
                                </span>
                                <h2 className="heading-section mb-8">
                                    언제든 연락주세요.
                                    <br />
                                    <span className="text-gray-400">바로 답변드릴게요.</span>
                                </h2>
                                <p className="text-body-lg mb-10 leading-relaxed">
                                    카카오톡, 문자, 전화 — 편하신 방법으로 연락주시면 됩니다.
                                    학습 상담부터 진도 문의까지 실시간으로 도와드려요.
                                </p>

                                <div className="space-y-4 mb-10">
                                    <p className="flex items-center gap-4 text-gray-600 text-lg">
                                        <span className="text-blue-500">→</span>
                                        카카오톡으로 바로 상담
                                    </p>
                                    <p className="flex items-center gap-4 text-gray-600 text-lg">
                                        <span className="text-blue-500">→</span>
                                        수업 진도 실시간 확인
                                    </p>
                                    <p className="flex items-center gap-4 text-gray-600 text-lg">
                                        <span className="text-blue-500">→</span>
                                        중요한 알림은 자동 발송
                                    </p>
                                </div>

                                <motion.a
                                    href="#contact"
                                    className="btn-primary"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    상담 신청하기 <span className="opacity-60">→</span>
                                </motion.a>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right: Mentor Image */}
                    <div className="relative hidden lg:block">
                        <Image
                            src="/images/mentor.png"
                            alt="Mentor teaching student"
                            fill
                            className="object-cover"
                            quality={90}
                        />

                        {/* Floating Chat Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="absolute bottom-12 left-12 right-12"
                        >
                            <div className="card-glass p-6">
                                {/* Chat messages */}
                                <div className="space-y-4">
                                    <div className="flex justify-end">
                                        <div className="bg-blue-500 text-white px-5 py-3 rounded-2xl rounded-br-sm text-sm max-w-[220px]">
                                            우리 아이 진도가 어떻게 되나요?
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-9 h-9 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs font-bold">쏙</span>
                                        </div>
                                        <div className="bg-white border px-5 py-3 rounded-2xl rounded-bl-sm text-sm shadow-sm">
                                            Python 3장까지 완료했어요! 다음 수업은 수요일이에요 :)
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
