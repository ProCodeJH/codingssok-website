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
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Left: Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="text-white"
                        >
                            <span className="label text-white/50 mb-4 block">커리큘럼</span>
                            <h2 className="heading-section mb-8">
                                체계적인 5트랙으로
                                <br />
                                <span className="text-white/70">완벽한 코딩 실력 완성</span>
                            </h2>

                            {/* Feature points */}
                            <div className="space-y-4 mb-10">
                                <p className="feature-point-white text-lg">실시간 학습 진도 추적 시스템</p>
                                <p className="feature-point-white text-lg">개인 맞춤 AI 학습 도우미</p>
                                <p className="feature-point-white text-lg">문제 발생 전 사전 알림</p>
                            </div>

                            {/* Quote */}
                            <motion.div
                                className="border-l-2 border-white/20 pl-6"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                            >
                                <p className="quote-white text-lg mb-4">
                                    &quot;코딩쏙 덕분에 완전한 학습 관리 시스템을 갖추게 되었어요.
                                    아이가 학습하는 동안 저희가 직접 챙기지 않아도 알아서 알려주세요.&quot;
                                </p>
                                <p className="text-white/50 text-sm">— 초등 6학년 학부모</p>
                            </motion.div>
                        </motion.div>

                        {/* Right: Phone Mockup */}
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
                                    width={300}
                                    height={600}
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
                    {/* Left: White with content */}
                    <div className="bg-white py-24 px-6 lg:px-16 flex items-center">
                        <div className="max-w-lg ml-auto">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="label mb-6 block">실시간 소통</span>
                                <h2 className="heading-section mb-6">
                                    모든 정보가
                                    <br />
                                    <span className="text-gray-400">실시간으로 공유됩니다</span>
                                </h2>
                                <p className="text-body-lg mb-8">
                                    코딩쏙은 학부모님과 학생이 있는 곳에서 함께합니다 —
                                    업데이트 공유, 질문 답변, 문제 해결까지 알아서 처리합니다.
                                </p>

                                <div className="space-y-4 mb-10">
                                    <p className="feature-point">카카오톡, 문자, 이메일로 즉시 응답</p>
                                    <p className="feature-point">학습 상담 및 진도 문의 실시간 처리</p>
                                    <p className="feature-point">학부모님과 학생에게 실시간 정보 제공</p>
                                </div>

                                <motion.a
                                    href="#contact"
                                    className="btn-primary"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    상담 신청 <span className="opacity-60">→</span>
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
                                        <div className="bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-sm text-sm max-w-[200px]">
                                            우리 아이 진도가 어떻게 되나요?
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center flex-shrink-0">
                                            <span className="text-white text-xs font-bold">쏙</span>
                                        </div>
                                        <div className="bg-white border px-4 py-2 rounded-2xl rounded-bl-sm text-sm shadow-sm">
                                            Python 3장까지 완료했고, 다음 수업은 6월 26일 예정입니다! 🎉
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
