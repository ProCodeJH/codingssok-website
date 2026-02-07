"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

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

    const navLinks = [
        { name: "커리큘럼", href: "#curriculum" },
        { name: "서비스", href: "#services" },
        { name: "수강료", href: "#pricing" },
        { name: "FAQ", href: "#faq" },
    ];

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
                    ? 'bg-white/90 backdrop-blur-lg shadow-sm'
                    : 'bg-transparent'
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
                                <span className="text-white text-sm font-bold">쏙</span>
                            </div>
                            <span className="font-semibold text-black">
                                코딩쏙
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm text-gray-600 hover:text-black transition-colors duration-300 relative group"
                                >
                                    {link.name}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 group-hover:w-full" />
                                </a>
                            ))}
                        </div>

                        {/* CTA Button */}
                        <div className="hidden md:flex items-center">
                            <motion.a
                                href="#contact"
                                className="inline-flex items-center gap-2 text-sm py-2.5 px-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-full shadow-lg shadow-blue-500/30"
                                whileHover={{ scale: 1.02, y: -1 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                상담 신청 <span className="opacity-80">→</span>
                            </motion.a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 text-black"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
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
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-white md:hidden"
                    >
                        <div className="flex flex-col h-full pt-24 px-6">
                            <div className="space-y-6">
                                {navLinks.map((link, i) => (
                                    <motion.a
                                        key={link.name}
                                        href={link.href}
                                        className="block text-2xl font-medium"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {link.name}
                                    </motion.a>
                                ))}
                            </div>

                            <motion.div
                                className="mt-auto mb-12"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-base rounded-full shadow-lg shadow-blue-500/30"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    상담 신청 <span className="opacity-80">→</span>
                                </a>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
