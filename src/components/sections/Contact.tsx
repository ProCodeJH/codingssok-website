"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send, Sparkles } from "lucide-react";

const contactInfo = [
    { icon: MapPin, label: "위치", value: "대전 유성구 봉명동", gradient: "from-blue-500 to-cyan-500" },
    { icon: Phone, label: "전화", value: "010-1234-5678", gradient: "from-purple-500 to-pink-500" },
    { icon: Clock, label: "운영", value: "평일 14:00 ~ 21:00", gradient: "from-amber-500 to-orange-500" },
];

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        grade: "",
        message: "",
    });

    return (
        <section id="contact" className="section-cosmic bg-cosmic grid-pattern">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />

            <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="badge-cosmic mb-6">
                        <Sparkles size={14} />
                        CONTACT
                    </span>
                    <h2 className="section-title text-gradient mb-4">
                        상담 신청
                    </h2>
                    <p className="section-subtitle mx-auto">
                        무료 상담으로 맞춤 커리큘럼을 안내받으세요
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3 space-y-6"
                    >
                        {contactInfo.map((info, i) => (
                            <motion.div
                                key={i}
                                className="glass-card p-6 group"
                                whileHover={{ x: 8 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${info.gradient} flex items-center justify-center shadow-lg group-hover:animate-pulse-glow`}>
                                        <info.icon size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-white">{info.label}</h3>
                                        <p className="text-gray-400">{info.value}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-2/3"
                    >
                        <form className="glass-card p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">이름</label>
                                    <input
                                        type="text"
                                        placeholder="홍길동"
                                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">연락처</label>
                                    <input
                                        type="tel"
                                        placeholder="010-0000-0000"
                                        className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-300 mb-2">학년</label>
                                <select
                                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none appearance-none cursor-pointer"
                                    value={formData.grade}
                                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                >
                                    <option value="" className="bg-gray-900">선택</option>
                                    <option value="elementary" className="bg-gray-900">초등학생</option>
                                    <option value="middle" className="bg-gray-900">중학생</option>
                                    <option value="high" className="bg-gray-900">고등학생</option>
                                    <option value="adult" className="bg-gray-900">성인</option>
                                </select>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-300 mb-2">문의 내용</label>
                                <textarea
                                    rows={4}
                                    placeholder="궁금한 점을 적어주세요"
                                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="btn-cosmic w-full"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Send size={18} />
                                상담 신청하기
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
