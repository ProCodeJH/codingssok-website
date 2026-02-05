"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, Phone, MapPin, Clock } from "lucide-react";
import Image from "next/image";

const contactInfo = [
    {
        label: "전화 상담",
        value: "010-7566-7229",
        sub: "평일/주말 상담 가능",
        icon: Phone,
        gradient: "from-blue-500 to-cyan-500"
    },
    {
        label: "위치",
        value: "대전 유성구 테크노중앙로 67",
        sub: "엑스포타워 5층",
        icon: MapPin,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        label: "운영 시간",
        value: "평일 14:00 - 21:00",
        sub: "주말 10:00 - 18:00",
        icon: Clock,
        gradient: "from-orange-500 to-amber-500"
    },
];

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        grade: "",
        phone: "",
        course: "",
        message: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <section id="contact" className="py-24 sm:py-32 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white relative overflow-hidden">
            {/* Premium Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 -left-20 w-96 h-96 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
                <div className="absolute bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-cyan-200/30 to-blue-200/30 rounded-full blur-3xl" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-purple-100/20 to-pink-100/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 sm:mb-20"
                >
                    <motion.span
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-200/50 rounded-full mb-6 backdrop-blur-sm"
                        whileHover={{ scale: 1.05 }}
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-sm font-semibold text-green-700">상담 신청</span>
                    </motion.span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
                        무료 상담 신청
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-500 max-w-md mx-auto">
                        신청 후 24시간 이내 연락드립니다
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
                    {/* Left: Contact Info + Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6 text-center lg:text-left"
                    >
                        {/* Premium Image with Overlay */}
                        <div className="relative h-[220px] sm:h-[260px] rounded-3xl overflow-hidden shadow-2xl group">
                            <Image
                                src="/images/classroom2.png"
                                alt="Modern classroom"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-white/90 text-sm font-medium">최신 시설과 장비로</p>
                                <p className="text-white text-xl font-bold">최고의 학습 환경을 제공합니다</p>
                            </div>
                        </div>

                        {/* Premium Contact Cards */}
                        {contactInfo.map((info, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="group bg-white/80 backdrop-blur-xl rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/50 flex items-start gap-4"
                            >
                                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br ${info.gradient} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                    <info.icon size={22} className="text-white" />
                                </div>
                                <div className="text-left">
                                    <p className="text-xs sm:text-sm text-gray-400 mb-1 uppercase tracking-wider font-medium">{info.label}</p>
                                    <p className="font-bold text-lg sm:text-xl text-gray-900">{info.value}</p>
                                    <p className="text-sm text-gray-500 mt-0.5">{info.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right: Premium Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/50 shadow-2xl"
                    >
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12 sm:py-16"
                            >
                                <motion.div
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", delay: 0.2 }}
                                >
                                    <Check size={40} className="text-white" />
                                </motion.div>
                                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">신청 완료!</h3>
                                <p className="text-gray-500 text-lg">
                                    24시간 이내 연락드리겠습니다.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-2.5">학생 이름</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all duration-300"
                                            placeholder="홍길동"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-2.5">학년</label>
                                        <input
                                            type="text"
                                            name="grade"
                                            value={formData.grade}
                                            onChange={handleChange}
                                            className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all duration-300"
                                            placeholder="초등 6학년"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-2.5">연락처</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-xl text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all duration-300"
                                        placeholder="010-0000-0000"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-2.5">관심 과정</label>
                                    <select
                                        name="course"
                                        value={formData.course}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-xl text-base text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all duration-300 appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="">선택해주세요</option>
                                        <option value="basic">기초반 (스크래치/엔트리)</option>
                                        <option value="advanced">심화반 (C/Python)</option>
                                        <option value="cert">자격증반</option>
                                        <option value="contest">대회 준비반</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-800 mb-2.5">문의 사항 <span className="text-gray-400 font-normal">(선택)</span></label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-5 py-4 bg-gray-50/80 border-2 border-gray-100 rounded-xl text-base text-gray-900 placeholder-gray-400 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 focus:bg-white transition-all duration-300"
                                        placeholder="궁금하신 점을 자유롭게 적어주세요"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="w-full py-4 sm:py-5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white font-bold text-lg rounded-2xl hover:from-gray-800 hover:to-gray-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-gray-900/20 group"
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    상담 신청하기
                                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                                </motion.button>

                                <p className="text-center text-sm text-gray-400 mt-4">
                                    개인정보는 상담 목적으로만 사용됩니다
                                </p>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
