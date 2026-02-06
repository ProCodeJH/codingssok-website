"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code, MapPin, Phone, Mail, Instagram, Youtube } from "lucide-react";

const footerLinks = [
    {
        title: "교육과정",
        links: [
            { label: "커리큘럼", href: "#curriculum" },
            { label: "수강료", href: "#pricing" },
            { label: "FAQ", href: "#faq" },
        ],
    },
    {
        title: "문의",
        links: [
            { label: "상담 신청", href: "#contact" },
            { label: "오시는 길", href: "#" },
        ],
    },
];

const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "Youtube" },
];

export default function Footer() {
    return (
        <footer className="bg-cosmic border-t border-white/5">
            <div className="w-full max-w-6xl mx-auto px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link href="/" className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                <Code size={20} className="text-white" />
                            </div>
                            <span className="text-xl font-bold text-white font-display">
                                코딩<span className="text-gradient">쏙</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-sm leading-relaxed">
                            C·Python 텍스트 코딩 전문 교육.
                            <br />
                            현직 개발자가 프로젝트부터 자격증까지 책임집니다.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-gray-400">
                                <MapPin size={16} className="text-purple-400" />
                                <span>대전 유성구 봉명동</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <Phone size={16} className="text-purple-400" />
                                <span>010-1234-5678</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <Mail size={16} className="text-purple-400" />
                                <span>hello@codingssok.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            href={link.href}
                                            className="text-gray-400 hover:text-purple-300 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © 2026 코딩쏙. All rights reserved.
                    </p>

                    {/* Social Links */}
                    <div className="flex items-center gap-4">
                        {socialLinks.map((social) => (
                            <motion.a
                                key={social.label}
                                href={social.href}
                                className="w-10 h-10 rounded-xl glass flex items-center justify-center text-gray-400 hover:text-purple-300 transition-colors"
                                whileHover={{ scale: 1.1, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <social.icon size={18} />
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
