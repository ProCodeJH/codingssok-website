"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

/*
  Contact — Bionic Zenith 스타일
  Spatial Inquiry Form + Massive Phone Display
  코딩쏙 내용 유지하면서 디자인 템플릿 적용
*/

const INTERESTS = ["C언어", "Python", "HTML/CSS", "블록코딩", "사고력수학"];

export default function Contact() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-80px" });
    const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
    const [formData, setFormData] = useState({ name: "", phone: "", grade: "" });

    const toggleInterest = (interest: string) => {
        setSelectedInterests((prev) =>
            prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
        );
    };

    const inputBase: React.CSSProperties = {
        width: "100%", background: "transparent",
        borderTop: "none", borderLeft: "none", borderRight: "none",
        borderBottom: "2px solid rgba(255,255,255,0.1)",
        padding: "12px 0", fontSize: 16, color: "#fff",
        outline: "none", fontFamily: "inherit",
        transition: "border-color 0.3s",
    };

    return (
        <>
            {/* ═══════════════════════════════════════════════════
                SECTION 1: Spatial Inquiry Form
                ═══════════════════════════════════════════════════ */}
            <section
                ref={ref}
                id="contact"
                style={{
                    padding: "clamp(60px, 8vw, 120px) 0",
                    background: "linear-gradient(135deg, #0d131c 0%, #101822 50%, #0d131c 100%)",
                    position: "relative", overflow: "hidden",
                }}
            >
                {/* Background grid */}
                <div style={{
                    position: "absolute", inset: 0,
                    backgroundImage: "linear-gradient(rgba(61,138,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(61,138,245,0.04) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    pointerEvents: "none",
                }} />
                {/* Radial glow */}
                <div style={{
                    position: "absolute", top: 0, right: 0,
                    width: "50%", height: "100%",
                    background: "radial-gradient(ellipse at center, rgba(61,138,245,0.08) 0%, transparent 70%)",
                    pointerEvents: "none",
                }} />

                <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 clamp(16px, 3vw, 40px)", position: "relative", zIndex: 1 }}>
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{ textAlign: "center", marginBottom: 48 }}
                    >
                        {/* Live badge */}
                        <div style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            padding: "6px 14px", borderRadius: 99, marginBottom: 20,
                            background: "rgba(61,138,245,0.1)", border: "1px solid rgba(61,138,245,0.2)",
                        }}>
                            <span style={{
                                width: 8, height: 8, borderRadius: "50%",
                                background: "#3d8af5",
                                boxShadow: "0 0 8px rgba(61,138,245,0.6)",
                                animation: "pulse 2s infinite",
                            }} />
                            <span style={{ fontSize: 11, fontWeight: 700, color: "#3d8af5", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                                상담 접수 가능
                            </span>
                        </div>

                        <h2 style={{
                            fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                            fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 12,
                        }}>
                            Spatial Inquiries
                        </h2>
                        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 420, margin: "0 auto" }}>
                            아이의 코딩 적성에 맞는 최적의 트랙을 추천해 드립니다.
                        </p>
                    </motion.div>

                    {/* Form Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        style={{
                            background: "rgba(16,24,34,0.7)",
                            backdropFilter: "blur(12px)",
                            border: "1px solid rgba(255,255,255,0.05)",
                            borderRadius: 16, padding: "clamp(28px, 4vw, 48px)",
                            boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
                        }}
                    >
                        <div style={{
                            display: "grid", gridTemplateColumns: "1fr 1fr",
                            gap: "32px 40px",
                        }}>
                            {/* 학생 이름 */}
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
                                    학생 이름
                                </label>
                                <input
                                    type="text" placeholder="이름을 입력하세요"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{ ...inputBase }}
                                    onFocus={(e) => e.currentTarget.style.borderBottomColor = "#3d8af5"}
                                    onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>

                            {/* 연락처 */}
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
                                    연락처
                                </label>
                                <input
                                    type="tel" placeholder="010-0000-0000"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    style={{ ...inputBase }}
                                    onFocus={(e) => e.currentTarget.style.borderBottomColor = "#3d8af5"}
                                    onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.1)"}
                                />
                            </div>

                            {/* 학년 */}
                            <div>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 8 }}>
                                    학년
                                </label>
                                <select
                                    value={formData.grade}
                                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                    style={{
                                        ...inputBase,
                                        appearance: "none" as const,
                                        color: formData.grade ? "#fff" : "rgba(255,255,255,0.3)",
                                    }}
                                    onFocus={(e) => e.currentTarget.style.borderBottomColor = "#3d8af5"}
                                    onBlur={(e) => e.currentTarget.style.borderBottomColor = "rgba(255,255,255,0.1)"}
                                >
                                    <option value="">학년 선택</option>
                                    <option value="초등 1~3">초등 1~3</option>
                                    <option value="초등 4~6">초등 4~6</option>
                                    <option value="중등">중등</option>
                                    <option value="고등">고등</option>
                                </select>
                            </div>

                            {/* 빈 칸 (그리드 정렬) */}
                            <div />

                            {/* 관심 분야 - 풀 너비 */}
                            <div style={{ gridColumn: "1 / -1" }}>
                                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>
                                    관심 분야
                                </label>
                                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                    {INTERESTS.map((interest) => {
                                        const selected = selectedInterests.includes(interest);
                                        return (
                                            <span
                                                key={interest}
                                                onClick={() => toggleInterest(interest)}
                                                style={{
                                                    padding: "8px 18px", borderRadius: 99, cursor: "pointer",
                                                    fontSize: 13, fontWeight: 500,
                                                    background: selected ? "rgba(61,138,245,0.15)" : "rgba(255,255,255,0.04)",
                                                    color: selected ? "#3d8af5" : "rgba(255,255,255,0.5)",
                                                    border: selected ? "1px solid rgba(61,138,245,0.3)" : "1px solid rgba(255,255,255,0.06)",
                                                    transition: "all 0.2s",
                                                }}
                                            >
                                                {interest}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Submit */}
                            <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                                <motion.button
                                    whileHover={{ boxShadow: "0 0 30px -5px rgba(61,138,245,0.6)" }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        padding: "14px 32px", borderRadius: 8, border: "none",
                                        background: "#fff", color: "#0d131c",
                                        fontWeight: 700, fontSize: 15, cursor: "pointer",
                                        fontFamily: "inherit",
                                        display: "flex", alignItems: "center", gap: 10,
                                        transition: "all 0.3s",
                                        position: "relative", overflow: "hidden",
                                    }}
                                >
                                    무료 체험 신청하기
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>

                        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", textAlign: "center", marginTop: 20 }}>
                            상담 신청 후 24시간 이내 연락 드립니다
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════
                SECTION 2: Massive Phone Display
                ═══════════════════════════════════════════════════ */}
            <section style={{
                padding: "clamp(80px, 10vw, 160px) 0",
                background: "#000", textAlign: "center",
                position: "relative", overflow: "hidden",
            }}>
                {/* Grid bg */}
                <div style={{
                    position: "absolute", inset: 0, opacity: 0.15,
                    backgroundImage: "linear-gradient(rgba(61,138,245,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(61,138,245,0.08) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                    pointerEvents: "none",
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto", padding: "0 24px" }}
                >
                    <p style={{
                        fontSize: 12, fontWeight: 700, color: "#3d8af5",
                        letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 24,
                    }}>
                        Direct Neural Link
                    </p>

                    {/* Massive phone number */}
                    <a href="tel:010-7566-7229" style={{ textDecoration: "none" }}>
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            style={{
                                fontSize: "clamp(3rem, 10vw, 9rem)",
                                fontWeight: 900, letterSpacing: "-0.05em",
                                lineHeight: 0.9, marginBottom: 24,
                                background: "linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.4) 100%)",
                                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                            }}
                        >
                            010-7566-7229
                        </motion.h2>
                    </a>

                    <p style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
                        코딩쏙 — 무료 상담 및 체험 수업 문의
                    </p>

                    {/* Action circles */}
                    <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 40 }}>
                        {[
                            { href: "tel:010-7566-7229", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
                            { href: "https://blog.naver.com/codingssok", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> },
                            { href: "#", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="1.5" /></svg> },
                        ].map((item, i) => (
                            <motion.a
                                key={i}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                whileHover={{ scale: 1.1, background: "rgba(255,255,255,0.15)" }}
                                style={{
                                    width: 56, height: 56, borderRadius: "50%",
                                    background: "rgba(255,255,255,0.06)",
                                    backdropFilter: "blur(8px)",
                                    border: "1px solid rgba(255,255,255,0.08)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#fff", textDecoration: "none",
                                    transition: "all 0.2s",
                                }}
                            >
                                {item.icon}
                            </motion.a>
                        ))}
                    </div>
                </motion.div>

                <style>{`
                    @keyframes pulse {
                        0%, 100% { opacity: 1; }
                        50% { opacity: 0.4; }
                    }
                `}</style>
            </section>
        </>
    );
}
