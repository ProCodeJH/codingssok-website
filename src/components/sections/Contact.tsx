"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Send, Sparkles } from "lucide-react";

const contactInfo = [
    { icon: MapPin, title: "위치", value: "대전 유성구 봉명동", color: "from-blue-600 to-cyan-500" },
    { icon: Phone, title: "전화", value: "010-1234-5678", color: "from-indigo-600 to-blue-600" },
    { icon: Clock, title: "운영", value: "평일 14:00 ~ 21:00", color: "from-cyan-500 to-blue-600" },
];

export default function Contact() {
    return (
        <section id="contact" className="w-full bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden flex justify-center" style={{ paddingTop: '180px', paddingBottom: '180px' }}>
            {/* 배경 효과 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-100/30 rounded-full blur-3xl" />
                {/* 그리드 패턴 */}
                <div className="absolute inset-0 opacity-[0.02]" style={{
                    backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }} />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center" style={{ marginBottom: '80px' }}
                >
                    {/* 3D 아이콘 */}
                    <motion.div
                        initial={{ scale: 0.8, rotateY: -30 }}
                        whileInView={{ scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ rotateY: 15, scale: 1.1 }}
                        className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl mb-8 shadow-2xl shadow-blue-500/30"
                        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                    >
                        <Send size={32} className="text-white" />
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        상담 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">신청</span>
                    </h2>
                    <p className="text-lg text-gray-500">
                        무료 상담으로 맞춤 커리큘럼을 안내받으세요
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* 왼쪽 - 연락처 정보 카드 */}
                    <div className="space-y-6">
                        {contactInfo.map((info, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30, rotateY: -15 }}
                                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{
                                    x: 8,
                                    rotateY: 5,
                                    transition: { duration: 0.2 }
                                }}
                                className="group"
                                style={{ perspective: '1000px' }}
                            >
                                {/* 카드 글로우 */}
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl blur-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                                <div className="relative flex items-center gap-5 p-6 bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-100 shadow-lg group-hover:shadow-xl group-hover:border-blue-200 transition-all duration-300">
                                    {/* 3D 아이콘 */}
                                    <motion.div
                                        className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20`}
                                        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                                        style={{ transformStyle: 'preserve-3d' }}
                                    >
                                        <info.icon size={24} className="text-white" />
                                    </motion.div>
                                    <div>
                                        <span className="text-sm text-gray-500 font-medium">{info.title}</span>
                                        <p className="font-semibold text-gray-900 text-lg">{info.value}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                        {/* 추가 정보 카드 */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="relative p-6 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl shadow-xl shadow-blue-500/30 text-white"
                        >
                            <Sparkles className="absolute top-4 right-4 opacity-50" size={24} />
                            <h4 className="font-bold text-lg mb-2">🎁 첫 상담 특전</h4>
                            <p className="text-white/80 text-sm leading-relaxed">
                                지금 상담 신청하시면 무료 레벨 테스트와 맞춤 커리큘럼 제안을 받으실 수 있습니다.
                            </p>
                        </motion.div>
                    </div>

                    {/* 오른쪽 - 폼 (3D 카드) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30, rotateY: 15 }}
                        whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        style={{ perspective: '1000px' }}
                    >
                        {/* 카드 글로우 */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur-2xl opacity-10" />

                        <form className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-2xl">
                            <div className="grid grid-cols-2 gap-5 mb-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                                    <input
                                        type="text"
                                        placeholder="홍길동"
                                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                                    <input
                                        type="tel"
                                        placeholder="010-0000-0000"
                                        className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900 placeholder:text-gray-400"
                                    />
                                </div>
                            </div>
                            <div className="mb-5">
                                <label className="block text-sm font-medium text-gray-700 mb-2">학년</label>
                                <select className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-900">
                                    <option>선택</option>
                                    <option>초등 1~3학년</option>
                                    <option>초등 4~6학년</option>
                                    <option>중학생</option>
                                    <option>고등학생</option>
                                    <option>성인</option>
                                </select>
                            </div>
                            <div className="mb-8">
                                <label className="block text-sm font-medium text-gray-700 mb-2">문의 내용</label>
                                <textarea
                                    rows={4}
                                    placeholder="궁금한 점을 적어주세요"
                                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-gray-900 placeholder:text-gray-400"
                                />
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-500/30"
                                whileHover={{ scale: 1.02, y: -2, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)" }}
                                whileTap={{ scale: 0.98 }}
                            >
                                상담 신청하기
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
