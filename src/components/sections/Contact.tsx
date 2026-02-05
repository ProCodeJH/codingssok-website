"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Phone, Clock } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        grade: "",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 3000);
    };

    return (
        <section id="contact" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Contact</p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            상담 신청
                        </h2>
                        <p className="text-gray-500 mb-10">
                            무료 상담을 통해 맞춤 커리큘럼을 안내받으세요.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-6 mb-10">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                                    <MapPin size={20} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">위치</p>
                                    <p className="text-gray-500">대전 유성구 봉명동</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                                    <Phone size={20} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">전화</p>
                                    <p className="text-gray-500">010-1234-5678</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                                    <Clock size={20} className="text-white" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-900">운영 시간</p>
                                    <p className="text-gray-500">평일 14:00 ~ 21:00</p>
                                </div>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="relative h-48 rounded-2xl overflow-hidden">
                            <Image
                                src="/images/classroom2.png"
                                alt="코딩쏙 학원"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-8 shadow-sm"
                    >
                        {isSubmitted ? (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-white text-2xl">✓</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">신청 완료</h3>
                                <p className="text-gray-500">빠른 시일 내에 연락드리겠습니다.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        이름
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        placeholder="홍길동"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        연락처
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        placeholder="010-0000-0000"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        학년
                                    </label>
                                    <select
                                        value={formData.grade}
                                        onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                        required
                                    >
                                        <option value="">선택해주세요</option>
                                        <option value="초등 저학년">초등 저학년</option>
                                        <option value="초등 고학년">초등 고학년</option>
                                        <option value="중학생">중학생</option>
                                        <option value="고등학생">고등학생</option>
                                        <option value="성인">성인</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        문의 내용
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                                        rows={4}
                                        placeholder="궁금한 점을 적어주세요"
                                    />
                                </div>
                                <motion.button
                                    type="submit"
                                    className="w-full py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-colors"
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
