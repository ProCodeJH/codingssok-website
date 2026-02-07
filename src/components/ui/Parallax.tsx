"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxProps {
    children: React.ReactNode;
    className?: string;
    /** Speed multiplier: <1 = slower, >1 = faster than scroll. Default 0.5 */
    speed?: number;
    /** Horizontal parallax offset in px */
    horizontal?: number;
}

export default function Parallax({
    children,
    className = "",
    speed = 0.5,
    horizontal = 0,
}: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);
    const x = useTransform(scrollYProgress, [0, 1], [horizontal, -horizontal]);

    return (
        <div ref={ref} className={`relative overflow-hidden ${className}`}>
            <motion.div style={{ y, x }}>
                {children}
            </motion.div>
        </div>
    );
}
