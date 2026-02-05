"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send, Sparkles } from "lucide-react";

export default function Contact() {
    const [formData, setFormData] = useState({
        type: "",
        name: "",
        phone: "",
        grade: "",
        message: "",
    });

    return (
        <section id="contact" className="w-full bg-gradient-to-b from-gray-50 to-white flex justify-center" style={{ paddingTop: '200px', paddingBottom: '200px' }}>
            <div className="w-full max-w-6xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '100px' }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-medium mb-6">
                        <Sparkles size={16} />
                        CONTACT
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        상담 신청
                    </h2>
                    <p className="text-lg text-gray-500 max-w-md mx-auto">
                        무료 상담으로 맞춤 커리큘럼을 안내받으세요
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row justify-center gap-12">
                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3 space-y-6"
                    >
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100/50">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-4">
                                <MapPin size={24} className="text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">위치</h3>
                            <p className="text-gray-600">대전 유성구 봉명동</p>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-100/50">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-4">
                                <Phone size={24} className="text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">전화</h3>
                            <p className="text-gray-600">010-1234-5678</p>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100/50">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
                                <Clock size={24} className="text-white" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">운영</h3>
                            <p className="text-gray-600">평일 14:00 ~ 21:00</p>
                        </div>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-2/3"
                    >
                        <form className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                                    <input
                                        type="text"
                                        placeholder="홍길동"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                                    <input
                                        type="tel"
                                        placeholder="010-0000-0000"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">학년</label>
                                <select
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none bg-white"
                                    value={formData.grade}
                                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                >
                                    <option value="">선택</option>
                                    <option value="elementary">초등학생</option>
                                    <option value="middle">중학생</option>
                                    <option value="high">고등학생</option>
                                    <option value="adult">성인</option>
                                </select>
                            </div>

                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-2">문의 내용</label>
                                <textarea
                                    rows={4}
                                    placeholder="궁금한 점을 적어주세요"
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none resize-none"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <motion.button
                                type="submit"
                                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
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
