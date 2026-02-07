"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";

const navLinks = [
    { name: "커리큘럼", href: "#curriculum" },
    { name: "서비스", href: "#services" },
    { name: "수강료", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
];

const sectionIds = ["curriculum", "services", "pricing", "faq", "contact"];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const observers: IntersectionObserver[] = [];
        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) setActiveSection(id);
                },
                { rootMargin: "-40% 0px -55% 0px" }
            );
            observer.observe(el);
            observers.push(observer);
        });
        return () => observers.forEach((obs) => obs.disconnect());
    }, []);

    const handleNavClick = useCallback(
        (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
            e.preventDefault();
            const el = document.getElementById(href.replace("#", ""));
            if (el) {
                const top = el.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: "smooth" });
            }
            setIsMobileMenuOpen(false);
        },
        []
    );

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm" : "bg-transparent"}`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                                <span className="text-white text-sm font-bold">쏙</span>
                            </div>
                            <span className="font-semibold text-black group-hover:tracking-wide transition-all duration-300">코딩쏙</span>
                        </Link>

                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.replace("#", "");
                                return (
                                    <a key={link.name} href={link.href} onClick={(e) => handleNavClick(e, link.href)}
                                        className={`text-sm transition-colors duration-300 relative group ${isActive ? "text-black font-semibold" : "text-gray-600 hover:text-black"}`}>
                                        {link.name}
                                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
                                    </a>
                                );
                            })}
                        </div>

                        <div className="hidden md:flex items-center gap-3">
                            <motion.a href="tel:010-7566-7229" className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors px-3 py-2" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Phone size={14} /> 전화
                            </motion.a>
                            <motion.a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="btn-primary text-sm py-2.5 px-5" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                상담 신청 <span className="opacity-60">→</span>
                            </motion.a>
                        </div>

                        <button className="md:hidden p-2 text-black" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl md:hidden">
                        <div className="flex flex-col h-full pt-24 px-6">
                            <div className="space-y-6">
                                {navLinks.map((link, i) => (
                                    <motion.a key={link.name} href={link.href}
                                        className={`block text-2xl font-medium ${activeSection === link.href.replace("#", "") ? "text-black" : "text-gray-500"}`}
                                        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                                        onClick={(e) => handleNavClick(e, link.href)}>
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>
                            <motion.div className="mt-12 space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                <a href="tel:010-7566-7229" className="flex items-center gap-3 px-6 py-4 bg-gray-50 rounded-2xl text-gray-700 font-medium">
                                    <Phone size={20} className="text-blue-500" /> 010-7566-7229 전화 상담
                                </a>
                                <a href="https://pf.kakao.com/_codingssok" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-6 py-4 bg-[#FEE500]/20 rounded-2xl text-gray-700 font-medium">
                                    <MessageCircle size={20} className="text-[#3C1E1E]" /> 카카오톡 상담
                                </a>
                            </motion.div>
                            <motion.div className="mt-auto mb-12" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                <a href="#contact" className="btn-primary w-full justify-center text-base py-4" onClick={(e) => handleNavClick(e, "#contact")}>
                                    상담 신청 <span className="opacity-60">→</span>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
