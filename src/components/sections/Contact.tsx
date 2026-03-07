"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, MapPin, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { submitContactForm } from "@/lib/actions/contact";

export default function Contact() {
    const [formState, setFormState] = useState({
        name: "",
        phone: "",
        age: "",
        track: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMsg(null);

        const fd = new FormData();
        fd.set('name', formState.name);
        fd.set('phone', formState.phone);
        fd.set('age', formState.age);
        fd.set('track', formState.track);
        fd.set('message', formState.message);

        const result = await submitContactForm(fd);

        if (result.error) {
            setErrorMsg(result.error);
            setIsSubmitting(false);
            return;
        }

        setIsSubmitted(true);
        setIsSubmitting(false);
    };

    return (
        <section id="contact" className="section py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#12121A] to-[#0A0A0F]" />

            {/* Glowing Orb */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.3, 0.2],
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0066FF] rounded-full blur-[200px] pointer-events-none"
            />

            <div className="container mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="section-title text-4xl md:text-5xl font-bold mb-4">
                        무료 <span className="gradient-text">상담 신청</span>
                    </h2>
                    <p className="text-lg text-white/60">
                        개인 맞춤형 학습 계획을 무료로 제공해드립니다
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="glass rounded-3xl p-8">
                            <h3 className="text-2xl font-bold text-white mb-6">연락처 정보</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#0066FF]/20 flex items-center justify-center flex-shrink-0">
                                        <Phone className="w-5 h-5 text-[#0066FF]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">전화번호</h4>
                                        <a href="tel:010-7566-7229" className="text-[#00E5FF] hover:underline text-lg">
                                            010-7566-7229
                                        </a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#0066FF]/20 flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-5 h-5 text-[#0066FF]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">주소</h4>
                                        <p className="text-white/70">대전 유성구 관평동 806번지</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-[#0066FF]/20 flex items-center justify-center flex-shrink-0">
                                        <Clock className="w-5 h-5 text-[#0066FF]" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-white mb-1">운영시간</h4>
                                        <p className="text-white/70">평일 10:00 - 21:00</p>
                                        <p className="text-white/70">주말 10:00 - 18:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4">
                            <a
                                href="https://www.instagram.com/codingssok/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 glass rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                            >
                                📷 Instagram
                            </a>
                            <a
                                href="https://pf.kakao.com/_tNeen"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 glass rounded-xl p-4 flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                            >
                                💬 KakaoTalk
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="glass rounded-3xl p-8 text-center h-full flex flex-col items-center justify-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-[#10B981]/20 flex items-center justify-center mb-6">
                                    <CheckCircle className="w-10 h-10 text-[#10B981]" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-3">
                                    상담 신청이 완료되었습니다!
                                </h3>
                                <p className="text-white/60">
                                    빠른 시일 내에 연락드리겠습니다.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 space-y-6">
                                {errorMsg && (
                                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#EF4444]/10 text-[#EF4444] text-sm">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        {errorMsg}
                                    </div>
                                )}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">
                                            이름 <span className="text-[#EF4444]">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formState.name}
                                            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#0066FF] focus:outline-none transition-colors"
                                            placeholder="홍길동"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">
                                            연락처 <span className="text-[#EF4444]">*</span>
                                        </label>
                                        <input
                                            type="tel"
                                            required
                                            value={formState.phone}
                                            onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#0066FF] focus:outline-none transition-colors"
                                            placeholder="010-0000-0000"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">
                                            학생 나이
                                        </label>
                                        <input
                                            type="text"
                                            value={formState.age}
                                            onChange={(e) => setFormState({ ...formState, age: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#0066FF] focus:outline-none transition-colors"
                                            placeholder="예: 초등학교 3학년"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-white/80 mb-2">
                                            관심 트랙
                                        </label>
                                        <select
                                            value={formState.track}
                                            onChange={(e) => setFormState({ ...formState, track: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#0066FF] focus:outline-none transition-colors"
                                        >
                                            <option value="" className="bg-[#12121A]">선택해주세요</option>
                                            <option value="block" className="bg-[#12121A]">블록코딩 트랙</option>
                                            <option value="text" className="bg-[#12121A]">텍스트코딩 트랙</option>
                                            <option value="project" className="bg-[#12121A]">프로젝트 트랙</option>
                                            <option value="physical" className="bg-[#12121A]">피지컬컴퓨팅 트랙</option>
                                            <option value="cert" className="bg-[#12121A]">자격증 트랙</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-white/80 mb-2">
                                        문의 내용
                                    </label>
                                    <textarea
                                        rows={4}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-white/30 focus:border-[#0066FF] focus:outline-none transition-colors resize-none"
                                        placeholder="궁금하신 사항을 자유롭게 작성해주세요."
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 disabled:opacity-50"
                                    style={{
                                        background: "linear-gradient(135deg, #0066FF 0%, #00E5FF 100%)",
                                    }}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            전송 중...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            상담 신청하기
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
