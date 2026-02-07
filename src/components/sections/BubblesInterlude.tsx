"use client";

import { useRef, useState, useEffect } from "react";
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

// Fixed positions to avoid hydration mismatch
const BUBBLE_SEEDS = [
    { x: 12, y: 18, size: 45 },
    { x: 48, y: 22, size: 62 },
    { x: 82, y: 16, size: 38 },
    { x: 18, y: 48, size: 55 },
    { x: 52, y: 45, size: 70 },
    { x: 78, y: 50, size: 42 },
    { x: 15, y: 72, size: 50 },
    { x: 45, y: 68, size: 35 },
    { x: 80, y: 75, size: 58 },
];

export default function BubblesInterlude() {
    const ref = useRef<HTMLDivElement>(null);
    const mouse = useMousePosition();
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    const waveY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const pathProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);

    const bubbles: Bubble[] = BUBBLE_SEEDS.map((seed, i) => ({
        x: seed.x,
        y: seed.y,
        size: seed.size,
        delay: i * 0.15,
        color: COLORS[i % COLORS.length],
    }));

    return (
        <section
            ref={ref}
            className="relative py-24 overflow-hidden"
            style={{ background: "linear-gradient(180deg, #3B82F6 0%, #1D4ED8 100%)" }}
        >
            {/* Wave top */}
            <motion.div className="absolute top-0 left-0 right-0 h-20 pointer-events-none" style={{ y: waveY }}>
                <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,0 L0,0 Z" fill="white" />
                </svg>
            </motion.div>

            {/* Bubbles */}
            <div className="max-w-7xl mx-auto px-8 relative z-10" style={{ minHeight: 300 }}>
                {bubbles.map((b, i) => {
                    const mx = (mouse.progressX - 0.5) * (i % 2 === 0 ? 20 : -15);
                    const my = (mouse.progressY - 0.5) * (i % 2 === 0 ? 15 : -10);

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
                            animate={{ x: mx, y: my }}
                        />
                    );
                })}

                {/* Center SVG line */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <svg width="100%" height="12" viewBox="0 0 1200 12" preserveAspectRatio="none" className="opacity-40">
                        <motion.path
                            d="M 0 6 Q 300 6 600 6 Q 900 6 1200 6"
                            fill="none" stroke="white" strokeWidth="2"
                            style={{ pathLength: pathProgress }}
                        />
                        <motion.circle cx="12" cy="6" r="5" fill="white" style={{ opacity: pathProgress }} />
                        <motion.circle cx="1188" cy="6" r="5" fill="white" style={{ opacity: pathProgress }} />
                    </svg>
                </div>
            </div>

            {/* Wave bottom */}
            <motion.div className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none" style={{ y: waveY }}>
                <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-full">
                    <path d="M0,40 Q360,80 720,40 Q1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
                </svg>
            </motion.div>
        </section>
    );
}
