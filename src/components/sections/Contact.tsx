"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";

const contactInfo = [
    { label: "전화 상담", value: "010-7566-7229", sub: "평일/주말 상담 가능" },
    { label: "위치", value: "대전 유성구 테크노중앙로 67", sub: "엑스포타워 5층" },
    { label: "운영 시간", value: "평일 14:00 - 21:00", sub: "주말 10:00 - 18:00" },
];

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <section id="contact" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="px-4 py-2 bg-green-100 text-green-700 text-sm font-semibold rounded-full inline-block mb-6">
                        상담 신청
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        무료 상담 신청
                    </h2>
                    <p className="text-lg text-gray-500">
                        신청 후 24시간 이내 연락드립니다
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        {contactInfo.map((info, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="bg-gray-50 rounded-2xl p-6"
                            >
                                <p className="text-sm text-gray-400 mb-2">{info.label}</p>
                                <p className="font-semibold text-xl text-gray-900">{info.value}</p>
                                <p className="text-sm text-gray-500 mt-1">{info.sub}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gray-50 rounded-3xl p-8"
                    >
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-16"
                            >
                                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                    <Check size={40} className="text-green-600" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">신청 완료!</h3>
                                <p className="text-gray-500">
                                    24시간 이내 연락드리겠습니다.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">학생 이름</label>
                                        <input
                                            type="text"
                                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="홍길동"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">학년</label>
                                        <input
                                            type="text"
                                            className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                            placeholder="초등 6학년"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">연락처</label>
                                    <input
                                        type="tel"
                                        className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="010-0000-0000"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">관심 과정</label>
                                    <select
                                        className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
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
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">문의 사항 (선택)</label>
                                    <textarea
                                        className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                        placeholder="궁금하신 점을 자유롭게 적어주세요"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="w-full py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    상담 신청 <Send size={16} />
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
