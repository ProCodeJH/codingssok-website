"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Clock, Send, Check } from "lucide-react";

const contactInfo = [
    { icon: Phone, label: "전화 상담", value: "010-7566-7229", sub: "평일/주말 상담 가능" },
    { icon: MapPin, label: "위치", value: "대전 유성구 테크노중앙로 67", sub: "엑스포타워 5층" },
    { icon: Clock, label: "운영 시간", value: "평일 14:00 - 21:00", sub: "주말 10:00 - 18:00" },
];

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
    };

    return (
        <section id="contact" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <span className="label mb-4 block">상담 신청</span>
                    <h2 className="heading-section mb-6">
                        무료 상담 신청
                    </h2>
                    <p className="text-body-lg max-w-lg mx-auto">
                        신청 후 24시간 이내 연락드립니다
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    {/* Left: Contact Info Cards */}
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
                                className="card p-6 flex items-start gap-5"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                                    <info.icon size={22} className="text-gray-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                                    <p className="font-medium text-lg">{info.value}</p>
                                    <p className="text-sm text-gray-500 mt-1">{info.sub}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="card p-8"
                    >
                        {isSubmitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                    <Check size={32} className="text-green-600" />
                                </div>
                                <h3 className="heading-card mb-3">신청 완료!</h3>
                                <p className="text-body">
                                    24시간 이내 연락드리겠습니다.
                                </p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">학생 이름</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="홍길동"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-2">학년</label>
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="초등 6학년"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">연락처</label>
                                    <input
                                        type="tel"
                                        className="input"
                                        placeholder="010-0000-0000"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">관심 과정 선택</label>
                                    <select className="input" required>
                                        <option value="">선택해주세요</option>
                                        <option value="basic">기초반 (스크래치/엔트리)</option>
                                        <option value="advanced">심화반 (C/Python)</option>
                                        <option value="cert">자격증반</option>
                                        <option value="contest">대회 준비반</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2">문의 사항 (선택)</label>
                                    <textarea
                                        className="input min-h-[120px] resize-none"
                                        placeholder="궁금하신 점을 자유롭게 적어주세요"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="btn-primary w-full justify-center"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    상담 신청 <Send size={16} className="ml-1" />
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
