"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Code, Cpu, Trophy, Sparkles, ArrowRight, Zap } from "lucide-react";

const services = [
    {
        icon: Code,
        title: "텍스트 코딩",
        subtitle: "C언어 · Python",
        items: ["문법 기초부터 심화", "알고리즘 문제풀이", "프로젝트 개발"],
        gradient: "from-blue-600 to-cyan-500",
        iconBg: "bg-gradient-to-br from-blue-600 to-cyan-500",
        shadow: "shadow-blue-500/30",
        hoverShadow: "group-hover:shadow-blue-500/20",
    },
    {
        icon: Cpu,
        title: "피지컬 컴퓨팅",
        subtitle: "아두이노 · IoT",
        items: ["센서 활용 실습", "로봇 제어", "하드웨어 연동"],
        gradient: "from-indigo-600 to-blue-600",
        iconBg: "bg-gradient-to-br from-indigo-600 to-blue-600",
        shadow: "shadow-indigo-500/30",
        hoverShadow: "group-hover:shadow-indigo-500/20",
    },
    {
        icon: Trophy,
        title: "대회 & 자격증",
        subtitle: "목표 달성 케어",
        items: ["정보올림피아드", "SW 공모전", "정보처리기능사"],
        gradient: "from-cyan-500 to-blue-600",
        iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
        shadow: "shadow-cyan-500/30",
        hoverShadow: "group-hover:shadow-cyan-500/20",
    },
];

export default function Services() {
    return (
        <>
            {/* Quote - 프리미엄 다크 */}
            <section className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 relative overflow-hidden flex justify-center" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
                {/* 배경 효과 */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
                    {/* 그리드 패턴 */}
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }} />
                </div>

                <div className="relative z-10 w-full max-w-4xl mx-auto px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/70 mb-8"
                        >
                            <Sparkles size={14} className="text-cyan-400" />
                            학부모 후기
                        </motion.div>

                        <p className="text-2xl lg:text-4xl text-white leading-relaxed mb-8 font-light">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">"</span>
                            우리 아이가 직접 만든 게임을
                            <br />
                            저한테 자랑할 때 가장 뿌듯해요.
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">"</span>
                        </p>
                        <p className="text-gray-500">— 학부모 김OO님</p>
                    </motion.div>
                </div>
            </section>

            {/* Services - 세련된 카드 디자인 */}
            <section id="services" className="w-full bg-white relative overflow-hidden flex justify-center" style={{ paddingTop: '180px', paddingBottom: '180px' }}>
                {/* 배경 */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-50 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center" style={{ marginBottom: '80px' }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full text-sm text-blue-700 mb-6"
                        >
                            <Zap size={14} className="text-blue-500" />
                            현직 개발자 설계
                        </motion.div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            맞춤형 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">코딩 교육</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            각 분야 전문 커리큘럼으로 체계적인 성장을 이끌어냅니다
                        </p>
                    </motion.div>

                    {/* 서비스 카드 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                whileHover={{
                                    y: -12,
                                    transition: { duration: 0.3 }
                                }}
                                className="group relative"
                            >
                                {/* 카드 배경 글로우 */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500 translate-y-4`} />

                                {/* 메인 카드 */}
                                <div className={`relative bg-white rounded-3xl border border-gray-100 shadow-lg ${service.hoverShadow} group-hover:shadow-2xl transition-all duration-300 overflow-hidden h-full`}>
                                    {/* 상단 그라디언트 바 */}
                                    <div className={`h-1.5 bg-gradient-to-r ${service.gradient}`} />

                                    <div className="p-8">
                                        {/* 아이콘 */}
                                        <motion.div
                                            className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${service.shadow}`}
                                            whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                                            transition={{ duration: 0.4 }}
                                        >
                                            <service.icon size={28} className="text-white" />
                                        </motion.div>

                                        {/* 타이틀 */}
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                        <p className={`text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} mb-6`}>
                                            {service.subtitle}
                                        </p>

                                        {/* 항목 리스트 */}
                                        <ul className="space-y-3 mb-8">
                                            {service.items.map((item, j) => (
                                                <motion.li
                                                    key={j}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ delay: i * 0.1 + j * 0.05 }}
                                                    className="flex items-center gap-3 text-gray-600"
                                                >
                                                    <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                                                    {item}
                                                </motion.li>
                                            ))}
                                        </ul>

                                        {/* 더보기 링크 */}
                                        <motion.a
                                            href="#contact"
                                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all"
                                            whileHover={{ x: 4 }}
                                        >
                                            자세히 보기 <ArrowRight size={14} />
                                        </motion.a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery - 세련된 */}
            <section className="w-full bg-gray-50 flex justify-center" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
                <div className="w-full max-w-6xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center" style={{ marginBottom: '60px' }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            수업 현장
                        </h2>
                        <p className="text-gray-500">실제 수업 풍경을 확인해보세요</p>
                    </motion.div>

                    {/* 갤러리 */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { src: "/images/classroom1.png", alt: "코딩 수업", label: "소수정예 수업" },
                            { src: "/images/mentor1.png", alt: "멘토링", label: "1:1 멘토링" },
                            { src: "/images/robot.png", alt: "로봇 프로젝트", label: "아두이노 실습" },
                        ].map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -8 }}
                                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-lg cursor-pointer"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {/* 오버레이 */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                {/* 라벨 */}
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-white font-medium text-lg">{img.label}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
