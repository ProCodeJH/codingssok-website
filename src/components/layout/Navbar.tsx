"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";

const navLinks = [
    { href: "#curriculum", label: "커리큘럼" },
    { href: "#services", label: "서비스" },
    { href: "#portfolio", label: "수강생 작품" },
    { href: "#pricing", label: "수강료" },
    { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? "bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/10"
                        : "bg-transparent"
                    }`}
            >
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <motion.span
                                className="text-2xl font-bold"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-[#0066FF]">{"{"}</span>
                                <span className="gradient-text">코딩쏙</span>
                                <span className="text-[#0066FF]">{"}"}</span>
                            </motion.span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-white/70 hover:text-white transition-colors relative group py-2"
                                >
                                    {link.label}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#0066FF] to-[#00E5FF] group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:flex items-center gap-4">
                            <a
                                href="tel:010-7566-7229"
                                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                            >
                                <Phone className="w-4 h-4" />
                                <span>010-7566-7229</span>
                            </a>
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn-primary px-6 py-3 rounded-xl font-semibold"
                                style={{
                                    background: "linear-gradient(135deg, #0066FF 0%, #00E5FF 100%)",
                                }}
                            >
                                무료 상담
                            </motion.a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden text-white p-2"
                            aria-label="메뉴"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 md:hidden"
                    >
                        <div
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute right-0 top-0 bottom-0 w-80 bg-[#12121A] border-l border-white/10 p-6 pt-24"
                        >
                            <div className="flex flex-col gap-4">
                                {navLinks.map((link, index) => (
                                    <motion.a
                                        key={link.href}
                                        href={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="text-xl font-medium text-white/80 hover:text-white py-3 border-b border-white/10"
                                    >
                                        {link.label}
                                    </motion.a>
                                ))}
                                <motion.a
                                    href="#contact"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.5 }}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="mt-4 btn text-center py-4 rounded-xl font-semibold text-white"
                                    style={{
                                        background: "linear-gradient(135deg, #0066FF 0%, #00E5FF 100%)",
                                    }}
                                >
                                    무료 상담 신청
                                </motion.a>
                                <a
                                    href="tel:010-7566-7229"
                                    className="flex items-center justify-center gap-2 text-white/70 mt-4"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>010-7566-7229</span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
