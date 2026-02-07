"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

/*
  Replicates nodcoding.com's `.site-head` navbar:
  - Logo + nav links with SVG path underline
  - "상담 예약" pill CTA with SVG pill background (btn-plain)
  - Hamburger toggle with line rotation
  - Scroll-aware transparency
*/

const navLinks = [
    { name: "커리큘럼", href: "#curriculum" },
    { name: "수강료", href: "#pricing" },
    { name: "FAQ", href: "#faq" },
    { name: "문의", href: "#contact" },
];

/* ── SVG Menu Underline — nodcoding menu-item__line ── */
function MenuLink({
    name,
    href,
    isActive,
    onClick,
}: {
    name: string;
    href: string;
    isActive: boolean;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (ref.current) setWidth(ref.current.offsetWidth);
    }, [name]);

    const cx = width / 2;
    const h = 2.4;

    // SVG underline paths — nodcoding uses two <path>s with Q curves
    // On hover/active: paths expand from center → full width
    const pathIdle = `M${cx},0 Q${cx},0 ${cx},0`;
    const pathActive = `M0,${h / 2} Q${cx},${h * 1.5} ${width},${h / 2}`;

    return (
        <a
            ref={ref}
            href={href}
            onClick={(e) => onClick(e, href)}
            className="menu-link"
            style={{ position: "relative", display: "inline-flex" }}
        >
            <span className="menu-item__text" data-text={name}>
                {name}
            </span>
            <svg
                className="menu-item__line"
                width={width}
                height={h}
                fill="none"
                overflow="visible"
                preserveAspectRatio="none"
                style={{
                    position: "absolute",
                    bottom: -4,
                    left: 0,
                    width,
                    height: h,
                }}
            >
                <path
                    d={isActive ? pathActive : pathIdle}
                    stroke="#EC5212"
                    strokeWidth="2"
                    fill="none"
                    style={{ transition: "d 0.4s cubic-bezier(0.645, 0.045, 0.355, 1)" }}
                />
            </svg>
        </a>
    );
}

/* ── SVG Pill Button — nodcoding btn-plain (exact path) ── */
function PillButton({
    children,
    href,
    onClick,
}: {
    children: React.ReactNode;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
    const w = 160;
    const h = 54;

    // Exact nodcoding btn-plain path coordinates
    const pillPath = "M27,0 L133,0 C168.505,0 168.505,54 133,54 L27,54 C-8.505,54 -8.505,0 27,0";

    return (
        <a href={href} onClick={onClick} className="btn-plain" style={{ width: w, height: h }}>
            <span className="btn-plain__inner">
                <span className="btn-plain__text">{children}</span>
                <span className="btn-plain__arrow" />
            </span>
            <svg
                className="btn-plain__background"
                width="10"
                height="10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                overflow="visible"
                preserveAspectRatio="none"
                style={{ width: w, height: h }}
            >
                <path d={pillPath} className="btn-plain__path" />
                <path d={pillPath} className="btn-plain__path" />
            </svg>
        </a>
    );
}

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Intersection observer for active section
    useEffect(() => {
        const ids = navLinks.map((l) => l.href.replace("#", ""));
        const observers: IntersectionObserver[] = [];
        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (!el) return;
            const obs = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { rootMargin: "-40% 0px -55% 0px" }
            );
            obs.observe(el);
            observers.push(obs);
        });
        return () => observers.forEach((o) => o.disconnect());
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
            {/* ── site-head ── */}
            <motion.nav
                className="site-head"
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.645, 0.045, 0.355, 1] }}
                style={{
                    background: isScrolled ? "rgba(253, 250, 245, 0.92)" : "transparent",
                    backdropFilter: isScrolled ? "blur(12px)" : "none",
                    WebkitBackdropFilter: isScrolled ? "blur(12px)" : "none",
                }}
            >
                <div className="site-head__inner">
                    {/* ── Logo ── */}
                    <Link href="/" className="s__logo" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                        <div
                            style={{
                                width: 36,
                                height: 36,
                                background: "var(--color-black)",
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <span style={{ color: "#fff", fontWeight: 700, fontSize: 18 }}>쏙</span>
                        </div>
                        <span style={{ fontWeight: 600, fontSize: 18, color: "var(--color-black)" }}>코딩쏙</span>
                    </Link>

                    {/* ── Desktop nav-main ── */}
                    <div
                        className="nav-main"
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 36,
                        }}
                    >
                        <ul
                            className="site-head__menu"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 32,
                                listStyle: "none",
                            }}
                        >
                            {navLinks.map((link) => (
                                <li key={link.name} className="menu-item">
                                    <MenuLink
                                        name={link.name}
                                        href={link.href}
                                        isActive={activeSection === link.href.replace("#", "")}
                                        onClick={handleNavClick}
                                    />
                                </li>
                            ))}
                        </ul>

                        {/* ── CTA — btn-plain pill ── */}
                        <PillButton href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                            상담 예약
                        </PillButton>
                    </div>

                    {/* ── Mobile toggle ── */}
                    <div
                        className={`s__toggle ${isMobileMenuOpen ? "is-open" : ""}`}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <div className="s__toggle__lines">
                            <div className="s__toggle__line" />
                            <div className="s__toggle__line" />
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* ── Mobile menu ── */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{
                            position: "fixed",
                            inset: 0,
                            zIndex: 99,
                            background: "var(--color-beige)",
                            display: "flex",
                            flexDirection: "column",
                            paddingTop: 100,
                            paddingLeft: 36,
                            paddingRight: 36,
                        }}
                    >
                        {navLinks.map((link, i) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.08 }}
                                style={{
                                    display: "block",
                                    fontSize: "clamp(1.5rem, 4vw, 2rem)",
                                    fontWeight: 600,
                                    color: activeSection === link.href.replace("#", "") ? "var(--color-brand-1)" : "var(--color-black)",
                                    padding: "16px 0",
                                    borderBottom: "1px solid var(--color-grey-2)",
                                }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            style={{ marginTop: 40 }}
                        >
                            <a
                                href="tel:010-7566-7229"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "16px 24px",
                                    background: "var(--color-beige-dark)",
                                    borderRadius: 16,
                                    color: "var(--color-black)",
                                    fontWeight: 500,
                                    marginBottom: 12,
                                }}
                            >
                                📞 010-7566-7229
                            </a>
                            <PillButton href="#contact" onClick={(e) => handleNavClick(e, "#contact")}>
                                상담 예약
                            </PillButton>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Responsive: hide desktop nav on mobile */}
            <style jsx global>{`
        @media (max-width: 768px) {
          .nav-main { display: none !important; }
        }
      `}</style>
        </>
    );
}
