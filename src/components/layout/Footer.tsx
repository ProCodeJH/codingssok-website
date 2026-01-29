"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const footerLinks = {
    quickLinks: [
        { href: "#curriculum", label: "커리큘럼" },
        { href: "#services", label: "서비스" },
        { href: "#portfolio", label: "수강생 작품" },
        { href: "#pricing", label: "수강료" },
        { href: "#contact", label: "상담 신청" },
    ],
    social: [
        { href: "https://www.instagram.com/codingssok/", label: "Instagram", icon: "📷" },
        { href: "https://pf.kakao.com/_tNeen", label: "KakaoTalk", icon: "💬" },
        { href: "http://blog.naver.com/dlabcoding", label: "Blog", icon: "📝" },
    ],
};

export default function Footer() {
    return (
        <footer className="relative bg-[#0A0A0F] border-t border-white/10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Logo & Description */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-bold">
                                <span className="text-[#0066FF]">{"{"}</span>
                                <span className="gradient-text">코딩쏙</span>
                                <span className="text-[#0066FF]">{"}"}</span>
                            </span>
                        </Link>
                        <p className="text-white/60 text-sm leading-relaxed">
                            AI 시대 역량을 &apos;쏙&apos; 채우는 학원
                            <br />
                            C·Python 중심 텍스트코딩 강화
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-white mb-4">바로가기</h4>
                        <ul className="space-y-3">
                            {footerLinks.quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-white/60 hover:text-white transition-colors text-sm"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-white mb-4">연락처</h4>
                        <ul className="space-y-3 text-sm text-white/60">
                            <li className="flex items-start gap-2">
                                <span>📍</span>
                                <span>대전 유성구 관평동 806번지</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>📞</span>
                                <a href="tel:010-7566-7229" className="hover:text-white transition-colors">
                                    010-7566-7229
                                </a>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>🕐</span>
                                <span>평일 10:00 - 21:00</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span>🕐</span>
                                <span>주말 10:00 - 18:00</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="font-bold text-white mb-4">소셜 미디어</h4>
                        <div className="flex flex-wrap gap-3">
                            {footerLinks.social.map((link) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                                >
                                    <span>{link.icon}</span>
                                    <span>{link.label}</span>
                                </motion.a>
                            ))}
                        </div>
                        <p className="mt-6 text-xs text-white/40">
                            프로젝트·공모전·현장체험 운영
                            <br />
                            학생 맞춤형 1:1 멘토링
                        </p>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-white/40">
                            © 2026 코딩쏙학원. All rights reserved.
                        </p>
                        <p className="text-xs text-white/30">
                            대전 유성구 관평동 806번지 | 대표: 코딩쏙학원 | Tel: 010-7566-7229
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
