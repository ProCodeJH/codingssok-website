"use client";

import { useRef, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";

interface Bubble {
    x: number;
    y: number;
    size: number;
    delay: number;
    color: string;
}

const COLORS = ["#3B82F6", "#06B6D4", "#8B5CF6", "#EC4899", "#10B981", "#F59E0B"];

export default function BubblesInterlude() {
    const ref = useRef<HTMLDivElement>(null);
    const mouse = useMousePosition();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    const waveY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const pathProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

    const bubbles: Bubble[] = useMemo(
        () =>
            Array.from({ length: 9 }, (_, i) => ({
                x: 10 + (i % 3) * 35 + Math.random() * 15,
                y: 15 + Math.floor(i / 3) * 25 + Math.random() * 10,
                size: 30 + Math.random() * 50,
                delay: i * 0.15,
                color: COLORS[i % COLORS.length],
            })),
        []
    );

    return (
        <section
            ref={ref}
            className="relative py-24 overflow-hidden"
            style={{ background: "linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)" }}
        >
            {/* Animated wave top */}
            <motion.div className="absolute top-0 left-0 right-0 h-20 pointer-events-none" style={{ y: waveY }}>
                <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,0 L0,0 Z" fill="white" />
                </svg>
            </motion.div>

            {/* Bubbles */}
            <div className="max-w-7xl mx-auto px-8 relative z-10" style={{ minHeight: 300 }}>
                {bubbles.map((b, i) => {
                    const mouseOffset = {
                        x: (mouse.progressX - 0.5) * (i % 2 === 0 ? 20 : -15),
                        y: (mouse.progressY - 0.5) * (i % 2 === 0 ? 15 : -10),
                    };

                    return (
                        <motion.div
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                left: `${b.x}%`,
                                top: `${b.y}%`,
                                width: b.size,
                                height: b.size,
                                background: `radial-gradient(circle at 30% 30%, ${b.color}40, ${b.color}15)`,
                                backdropFilter: "blur(8px)",
                                border: `1px solid ${b.color}30`,
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: b.delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            animate={{
                                x: mouseOffset.x,
                                y: mouseOffset.y,
                            }}
                        />
                    );
                })}

                {/* Center SVG Line */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg width="100%" height="12" viewBox="0 0 1200 12" preserveAspectRatio="none" className="opacity-40">
                        <motion.path
                            d="M 0 6 Q 200 6 400 6 Q 600 6 800 6 Q 1000 6 1200 6"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            style={{ pathLength: pathProgress }}
                        />
                        <motion.circle cx="12" cy="6" r="5" fill="white" style={{ opacity: pathProgress }} />
                        <motion.circle cx="1188" cy="6" r="5" fill="white" style={{ opacity: pathProgress }} />
                    </svg>
                </div>
            </div>

            {/* Animated wave bottom */}
            <motion.div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ y: waveY }}>
                <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
                </svg>
            </motion.div>
        </section>
    );
}
