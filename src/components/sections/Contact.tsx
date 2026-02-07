"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";

const contactInfo = [
    { label: "전화 상담", value: "010-7566-7229", sub: "평일/주말 상담 가능" },
    { label: "위치", value: "대전 유성구 테크노중앙로 67", sub: "엑스포타워 5층" },
    { label: "운영 시간", value: "평일 14:00 - 21:00", sub: "주말 10:00 - 18:00" },
];

interface FormData { studentName: string; grade: string; phone: string; course: string; message: string; }
interface FormErrors { studentName?: string; phone?: string; course?: string; }

export default function Contact() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState("");
    const [formData, setFormData] = useState<FormData>({ studentName: "", grade: "", phone: "", course: "", message: "" });
    const [errors, setErrors] = useState<FormErrors>({});

    const validate = (): boolean => {
        const newErrors: FormErrors = {};
        if (!formData.studentName || formData.studentName.length < 2) newErrors.studentName = "이름은 2자 이상 입력해주세요";
        const phoneClean = formData.phone.replace(/[\s-]/g, "");
        if (!phoneClean || !/^01[0-9]\d{7,8}$/.test(phoneClean)) newErrors.phone = "올바른 전화번호를 입력해주세요 (예: 010-1234-5678)";
        if (!formData.course) newErrors.course = "관심 과정을 선택해주세요";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (field: keyof FormData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field as keyof FormErrors]) setErrors((prev) => ({ ...prev, [field]: undefined }));
        setSubmitError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsSubmitting(true);
        setSubmitError("");
        try {
            const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
            const data = await res.json();
            if (data.success) { setIsSubmitted(true); } else { setSubmitError(data.error || "전송 중 오류가 발생했습니다."); }
        } catch { setSubmitError("네트워크 오류가 발생했습니다. 다시 시도해주세요."); }
        finally { setIsSubmitting(false); }
    };

    const inputClass = (field: keyof FormErrors) =>
        `w-full px-5 py-4 bg-white border rounded-xl text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all ${errors[field] ? "border-red-300 focus:ring-red-500" : "border-gray-200 focus:ring-blue-500"}`;

    return (
        <section id="contact" className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-20">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-200/50 rounded-full mb-6">
                        <span className="text-sm font-medium text-green-700">상담 신청</span>
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">무료 상담 신청</h2>
                    <p className="text-lg text-gray-500">신청 후 24시간 이내 연락드립니다</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="space-y-6">
                        <div className="relative h-[200px] rounded-3xl overflow-hidden mb-8 shadow-xl">
                            <Image src="/images/classroom2.png" alt="Modern classroom" fill className="object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        </div>
                        {contactInfo.map((info, i) => (
                            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }} className="bg-gray-50 rounded-2xl p-6 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-gray-100">
                                <p className="text-sm text-gray-400 mb-2">{info.label}</p>
                                <p className="font-semibold text-xl text-gray-900">{info.value}</p>
                                <p className="text-sm text-gray-500 mt-1">{info.sub}</p>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
                        {isSubmitted ? (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16">
                                <motion.div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}>
                                    <Check size={40} className="text-green-600" />
                                </motion.div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">신청 완료!</h3>
                                <p className="text-gray-500">24시간 이내 연락드리겠습니다.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">학생 이름</label>
                                        <input type="text" className={inputClass("studentName")} placeholder="홍길동" value={formData.studentName} onChange={(e) => handleChange("studentName", e.target.value)} />
                                        {errors.studentName && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.studentName}</p>}
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">학년</label>
                                        <input type="text" className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="초등 6학년" value={formData.grade} onChange={(e) => handleChange("grade", e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">연락처</label>
                                    <input type="tel" className={inputClass("phone")} placeholder="010-0000-0000" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} />
                                    {errors.phone && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.phone}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">관심 과정</label>
                                    <select className={inputClass("course")} value={formData.course} onChange={(e) => handleChange("course", e.target.value)}>
                                        <option value="">선택해주세요</option>
                                        <option value="basic">기초반 (스크래치/엔트리)</option>
                                        <option value="advanced">심화반 (C/Python)</option>
                                        <option value="cert">자격증반</option>
                                        <option value="contest">대회 준비반</option>
                                    </select>
                                    {errors.course && <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1"><AlertCircle size={12} />{errors.course}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">문의 사항 (선택)</label>
                                    <textarea className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl text-sm min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" placeholder="궁금하신 점을 자유롭게 적어주세요" value={formData.message} onChange={(e) => handleChange("message", e.target.value)} />
                                </div>
                                {submitError && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl">
                                        <AlertCircle size={16} />{submitError}
                                    </motion.div>
                                )}
                                <motion.button type="submit" disabled={isSubmitting} className="w-full py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed" whileHover={isSubmitting ? {} : { scale: 1.01, y: -2 }} whileTap={isSubmitting ? {} : { scale: 0.99 }}>
                                    {isSubmitting ? (<><Loader2 size={16} className="animate-spin" />전송 중...</>) : (<>상담 신청 <Send size={16} /></>)}
                                </motion.button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
