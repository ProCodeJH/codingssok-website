"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", phone: "", grade: "", message: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="w-full py-24 bg-gray-50">
            <div className="w-full max-w-6xl mx-auto px-8">
                <div className="flex flex-col lg:flex-row justify-center gap-12">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 max-w-md"
                    >
                        <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">Contact</p>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">상담 신청</h2>
                        <p className="text-gray-500 mb-10">무료 상담으로 맞춤 커리큘럼을 안내받으세요.</p>

                        <div className="space-y-6 mb-10">
                            {[
                                { icon: MapPin, label: "위치", value: "대전 유성구 봉명동" },
                                { icon: Phone, label: "전화", value: "010-1234-5678" },
                                { icon: Clock, label: "운영", value: "평일 14:00 ~ 21:00" },
                            ].map(({ icon: Icon, label, value }, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                                        <Icon size={20} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{label}</p>
                                        <p className="text-gray-500">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="relative h-40 rounded-2xl overflow-hidden">
                            <Image src="/images/classroom2.png" alt="학원" fill className="object-cover" />
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="flex-1 max-w-md bg-white rounded-2xl p-8"
                    >
                        {isSubmitted ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl">✓</div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">신청 완료</h3>
                                <p className="text-gray-500">빠른 시일 내에 연락드리겠습니다.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {[
                                    { label: "이름", type: "text", key: "name", placeholder: "홍길동" },
                                    { label: "연락처", type: "tel", key: "phone", placeholder: "010-0000-0000" },
                                ].map(({ label, type, key, placeholder }) => (
                                    <div key={key}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
                                        <input
                                            type={type}
                                            value={formData[key as keyof typeof formData]}
                                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                            placeholder={placeholder}
                                            required
                                        />
                                    </div>
                                ))}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">학년</label>
                                    <select
                                        value={formData.grade}
                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900"
                                        required
                                    >
                                        <option value="">선택</option>
                                        <option>초등 저학년</option>
                                        <option>초등 고학년</option>
                                        <option>중학생</option>
                                        <option>고등학생</option>
                                        <option>성인</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">문의 내용</label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                                        rows={4}
                                        placeholder="궁금한 점을 적어주세요"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl"
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                >
                                    상담 신청하기
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
