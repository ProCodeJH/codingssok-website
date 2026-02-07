"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Phone, MessageCircle, MapPin, Clock, CheckCircle } from "lucide-react";
import LetterReveal from "@/components/ui/LetterReveal";
import StaggerReveal from "@/components/ui/StaggerReveal";
import SVGPillButton from "@/components/ui/SVGPillButton";
import WaveSeparator from "@/components/ui/WaveSeparator";

const contactInfo = [
    { icon: Phone, label: "전화", value: "042-123-4567", href: "tel:042-123-4567" },
    { icon: MessageCircle, label: "카카오톡", value: "codingssok", href: "https://pf.kakao.com/codingssok" },
    { icon: MapPin, label: "위치", value: "대전광역시 유성구", href: "#" },
    { icon: Clock, label: "운영시간", value: "평일 14:00 - 21:00", href: "#" },
];

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({ studentName: "", phone: "", course: "", message: "" });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.studentName.trim()) newErrors.studentName = "학생 이름을 입력해주세요";
        if (!formData.phone.trim()) newErrors.phone = "연락처를 입력해주세요";
        if (!formData.course) newErrors.course = "관심 과정을 선택해주세요";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        try {
            const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
            if (res.ok) setIsSubmitted(true);
        } catch { /* handle error */ }
        setIsLoading(false);
    };

    return (
        <section id="contact" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-200/50 rounded-full mb-6"
                    >
                        <span className="text-sm font-medium text-blue-700">상담 신청</span>
                    </motion.span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        <LetterReveal delay={0.1} stagger={0.04}>무료 상담을 신청하세요</LetterReveal>
                    </h2>
                    <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                        <LetterReveal delay={0.5} stagger={0.02} splitBy="word">아이의 코딩 교육, 전문가와 함께 시작하세요</LetterReveal>
                    </p>
                </div>

                {/* SVG wave separator */}
                <div className="max-w-3xl mx-auto mb-12">
                    <WaveSeparator variant="wave" height={14} color="#D1D5DB" />
                </div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    {/* Contact info */}
                    <StaggerReveal className="space-y-6" stagger={0.1} direction="left" distance={30}>
                        {contactInfo.map((info, i) => (
                            <a key={i} href={info.href} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                                    <info.icon size={20} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">{info.label}</p>
                                    <p className="font-semibold text-gray-900">{info.value}</p>
                                </div>
                            </a>
                        ))}
                    </StaggerReveal>

                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="success"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center h-full gap-4 text-center py-16"
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                    >
                                        <CheckCircle size={64} className="text-green-500" />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold text-gray-900">신청 완료!</h3>
                                    <p className="text-gray-500">빠른 시일 내에 연락드리겠습니다.</p>
                                </motion.div>
                            ) : (
                                <motion.form key="form" onSubmit={handleSubmit} className="space-y-5">
                                    {[
                                        { name: "studentName", label: "학생 이름", type: "text", placeholder: "학생 이름을 입력하세요" },
                                        { name: "phone", label: "연락처", type: "tel", placeholder: "010-0000-0000" },
                                    ].map((field, fi) => (
                                        <motion.div
                                            key={field.name}
                                            initial={{ opacity: 0, y: 15 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: fi * 0.1, duration: 0.5 }}
                                            className="relative group"
                                        >
                                            <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                                            <input
                                                type={field.type}
                                                className={`input ${errors[field.name] ? "border-red-300" : ""}`}
                                                placeholder={field.placeholder}
                                                value={formData[field.name as keyof typeof formData]}
                                                onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                                            />
                                            {/* SVG underline on focus */}
                                            <svg className="absolute bottom-0 left-0 w-full h-0.5 overflow-visible opacity-0 group-focus-within:opacity-100 transition-opacity" viewBox="0 0 400 2" preserveAspectRatio="none">
                                                <motion.line x1="0" y1="1" x2="400" y2="1" stroke="#3B82F6" strokeWidth="2"
                                                    initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                                                    transition={{ duration: 0.6 }} />
                                            </svg>
                                            {errors[field.name] && <p className="text-xs text-red-500 mt-1">{errors[field.name]}</p>}
                                        </motion.div>
                                    ))}

                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2, duration: 0.5 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">관심 과정</label>
                                        <select
                                            className={`input ${errors.course ? "border-red-300" : ""}`}
                                            value={formData.course}
                                            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                        >
                                            <option value="">선택해주세요</option>
                                            <option value="scratch">스크래치/엔트리 (입문)</option>
                                            <option value="python">Python (기초~중급)</option>
                                            <option value="c">C/C++ (중급~심화)</option>
                                            <option value="arduino">Arduino/IoT (응용)</option>
                                            <option value="app">앱 개발 (프로젝트)</option>
                                        </select>
                                        {errors.course && <p className="text-xs text-red-500 mt-1">{errors.course}</p>}
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                    >
                                        <label className="block text-sm font-medium text-gray-700 mb-2">추가 메시지 (선택)</label>
                                        <textarea
                                            className="input min-h-[100px] resize-none"
                                            placeholder="궁금한 점이 있으시면 적어주세요"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        />
                                    </motion.div>

                                    <SVGPillButton
                                        onClick={() => { }}
                                        variant="primary"
                                        size="lg"
                                        className="w-full justify-center"
                                    >
                                        {isLoading ? (
                                            <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>⏳</motion.span>
                                        ) : (
                                            <>상담 신청 <Send size={16} /></>
                                        )}
                                    </SVGPillButton>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
