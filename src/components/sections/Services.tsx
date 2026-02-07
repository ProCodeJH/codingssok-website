"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { Code, Cpu, Trophy, Sparkles, ArrowRight, Zap, Quote } from "lucide-react";

const services = [
    {
        icon: Code,
        title: "텍스트 코딩",
        subtitle: "C언어 · Python",
        items: ["문법 기초부터 심화", "알고리즘 문제풀이", "프로젝트 개발"],
        gradient: "from-blue-600 to-cyan-500",
        iconBg: "bg-gradient-to-br from-blue-600 to-cyan-500",
        shadow: "shadow-blue-500/30",
    },
    {
        icon: Cpu,
        title: "피지컬 컴퓨팅",
        subtitle: "아두이노 · IoT",
        items: ["센서 활용 실습", "로봇 제어", "하드웨어 연동"],
        gradient: "from-indigo-600 to-blue-600",
        iconBg: "bg-gradient-to-br from-indigo-600 to-blue-600",
        shadow: "shadow-indigo-500/30",
    },
    {
        icon: Trophy,
        title: "대회 & 자격증",
        subtitle: "목표 달성 케어",
        items: ["정보올림피아드", "SW 공모전", "정보처리기능사"],
        gradient: "from-cyan-500 to-blue-600",
        iconBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
        shadow: "shadow-cyan-500/30",
    },
];

const reviews = [
    { text: "우리 아이가 직접 만든 게임을 저한테 자랑할 때 가장 뿌듯해요.", name: "학부모 김OO님", role: "초등 5학년 자녀" },
    { text: "C언어를 이렇게 쉽게 가르쳐주시는 선생님은 처음이에요.", name: "학부모 박OO님", role: "중학 2학년 자녀" },
    { text: "정보처리기능사 한 번에 합격! 코딩쏙 덕분입니다.", name: "수강생 이OO", role: "고등 1학년" },
];

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const resetMouse = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={resetMouse}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export default function Services() {
    return (
        <>
            {/* Quote - 3개 리뷰 캐러셀 */}
            <section className="w-full bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 relative overflow-hidden flex justify-center" style={{ paddingTop: '140px', paddingBottom: '140px' }}>
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
                    <div className="absolute inset-0 opacity-[0.03]" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px'
                    }} />
                    <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
                        <filter id="quote-noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /></filter>
                        <rect width="100%" height="100%" filter="url(#quote-noise)" />
                    </svg>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0.8 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full text-sm text-white/70 mb-8"
                        >
                            <Sparkles size={14} className="text-cyan-400" />
                            수강 후기
                        </motion.div>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {reviews.map((review, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const }}
                                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                                className="group"
                            >
                                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 h-full group-hover:border-blue-500/30 group-hover:bg-white/[0.08] transition-all duration-300">
                                    <Quote size={24} className="text-blue-400/40 mb-4" />
                                    <p className="text-white/90 text-lg leading-relaxed mb-6 font-light">
                                        &ldquo;{review.text}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                            {review.name.charAt(4)}
                                        </div>
                                        <div>
                                            <p className="text-white/80 font-medium text-sm">{review.name}</p>
                                            <p className="text-white/40 text-xs">{review.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section id="services" className="w-full bg-white relative overflow-hidden flex justify-center" style={{ paddingTop: '180px', paddingBottom: '180px' }}>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-blue-50 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-50 rounded-full blur-3xl" />
                    <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
                        <filter id="svc-noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /></filter>
                        <rect width="100%" height="100%" filter="url(#svc-noise)" />
                    </svg>
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

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }}
                                className="group relative"
                            >
                                <TiltCard>
                                    <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-all duration-500 translate-y-4`} />

                                    <div className="relative bg-white rounded-3xl border border-gray-100 shadow-lg group-hover:shadow-2xl transition-all duration-300 overflow-hidden h-full">
                                        <div className={`h-1.5 bg-gradient-to-r ${service.gradient}`} />

                                        <div className="p-8">
                                            <motion.div
                                                className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center mb-6 shadow-lg ${service.shadow}`}
                                                whileHover={{ rotate: [0, -5, 5, 0], scale: 1.05 }}
                                                transition={{ duration: 0.4 }}
                                            >
                                                <service.icon size={28} className="text-white" />
                                            </motion.div>

                                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                                            <p className={`text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r ${service.gradient} mb-6`}>
                                                {service.subtitle}
                                            </p>

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

                                            <motion.a
                                                href="#contact"
                                                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:gap-3 transition-all"
                                                whileHover={{ x: 4 }}
                                            >
                                                자세히 보기 <ArrowRight size={14} />
                                            </motion.a>
                                        </div>
                                    </div>
                                </TiltCard>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Gallery */}
            <section className="w-full bg-gray-50 relative overflow-hidden flex justify-center" style={{ paddingTop: '160px', paddingBottom: '160px' }}>
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-20 left-20 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-100/30 rounded-full blur-3xl" />
                    <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
                        <filter id="gal-noise"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="4" stitchTiles="stitch" /></filter>
                        <rect width="100%" height="100%" filter="url(#gal-noise)" />
                    </svg>
                </div>

                <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center" style={{ marginBottom: '60px' }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            수업 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">현장</span>
                        </h2>
                        <p className="text-gray-500">실제 수업 풍경을 확인해보세요</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { src: "/images/classroom1.png", alt: "코딩 수업", label: "소수정예 수업", desc: "4~6명 소수정예" },
                            { src: "/images/mentor1.png", alt: "멘토링", label: "1:1 멘토링", desc: "개인별 맞춤 지도" },
                            { src: "/images/robot.png", alt: "로봇 프로젝트", label: "아두이노 실습", desc: "하드웨어 융합 교육" },
                        ].map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as const }}
                                whileHover={{ y: -8 }}
                                className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-gray-200 shadow-lg cursor-pointer"
                            >
                                <Image
                                    src={img.src}
                                    alt={img.alt}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <span className="text-white font-bold text-lg block">{img.label}</span>
                                    <span className="text-white/70 text-sm">{img.desc}</span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
