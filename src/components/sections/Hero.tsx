"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/images/hero-bg.png"
                    alt="Premium coding classroom"
                    fill
                    className="object-cover"
                    priority
                    quality={95}
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/30 to-white/80" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="mb-6"
                        >
                            <span className="label">AI 시대의 코딩 교육</span>
                        </motion.div>

                        <h1 className="heading-hero mb-8 text-black">
                            역량을 &apos;쏙&apos; 채우는,
                            <br />
                            <span className="text-gray-500">프리미엄 코딩 교육.</span>
                        </h1>

                        <p className="text-body-lg mb-10 max-w-lg">
                            C·Python 중심 텍스트코딩 강화로 프로젝트·공모전·자격증까지.
                            <br />
                            IT 현직 전문가가 직접 설계하고 가르칩니다.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-wrap gap-4">
                            <motion.a
                                href="#contact"
                                className="btn-primary"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                무료 상담 신청
                                <span className="text-white/60">→</span>
                            </motion.a>
                            <motion.a
                                href="#curriculum"
                                className="btn-secondary"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                커리큘럼 보기
                            </motion.a>
                        </div>

                        {/* Trust Badges */}
                        <motion.div
                            className="mt-12 flex items-center gap-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">🏆</span>
                                <span className="text-sm text-gray-500">정보올림피아드 수상</span>
                            </div>
                            <div className="h-4 w-px bg-gray-200" />
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">👨‍💻</span>
                                <span className="text-sm text-gray-500">현직 개발자 강사진</span>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right: Premium Product Shot */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="relative hidden lg:block"
                    >
                        {/* 3D Folder */}
                        <motion.div
                            className="absolute -left-8 top-8 z-20"
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Image
                                src="/images/folder-3d.png"
                                alt="3D folder"
                                width={180}
                                height={180}
                                className="drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Dashboard Tablet */}
                        <motion.div
                            className="relative z-10"
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                        >
                            <Image
                                src="/images/dashboard.png"
                                alt="Learning dashboard"
                                width={500}
                                height={400}
                                className="rounded-2xl drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Floating Phone */}
                        <motion.div
                            className="absolute -right-12 -bottom-8 z-30"
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        >
                            <Image
                                src="/images/phone.png"
                                alt="Mobile app"
                                width={200}
                                height={400}
                                className="drop-shadow-2xl"
                            />
                        </motion.div>

                        {/* Floating Badge */}
                        <motion.div
                            className="absolute top-4 right-0 z-40 card-glass px-4 py-3"
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-sm font-medium">실시간 학습 관리</span>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
