"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface WaveSeparatorProps {
    color?: string;
    height?: number;
    className?: string;
    variant?: "line" | "wave" | "dots";
}

export default function WaveSeparator({
    color = "#383030",
    height = 12,
    className = "",
    variant = "line",
}: WaveSeparatorProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const pathLength = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const dotOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0, 1, 1]);

    const viewBox = `0 0 1200 ${height}`;
    const mid = height / 2;

    const paths: Record<string, string> = {
        line: `M 0 ${mid} L 1200 ${mid}`,
        wave: `M 0 ${mid} Q 200 ${height} 400 ${mid} Q 600 0 800 ${mid} Q 1000 ${height} 1200 ${mid}`,
        dots: `M 0 ${mid} L 1200 ${mid}`,
    };

    return (
        <div ref={ref} className={`w-full overflow-hidden ${className}`} style={{ height }}>
            <svg
                viewBox={viewBox}
                preserveAspectRatio="none"
                className="w-full h-full"
                style={{ overflow: "visible" }}
            >
                {variant === "dots" ? (
                    <>
                        {/* Dotted line */}
                        <motion.path
                            d={paths.dots}
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                            strokeDasharray="4 8"
                            style={{ pathLength }}
                        />
                        {/* End dots */}
                        <motion.circle cx="0" cy={mid} r="4" fill={color} style={{ opacity: dotOpacity }} />
                        <motion.circle cx="1200" cy={mid} r="4" fill={color} style={{ opacity: dotOpacity }} />
                    </>
                ) : (
                    <>
                        {/* Main path */}
                        <motion.path
                            d={paths[variant]}
                            fill="none"
                            stroke={color}
                            strokeWidth="2"
                            style={{ pathLength }}
                        />
                        {/* End dots */}
                        <motion.circle cx="0" cy={mid} r="4" fill={color} style={{ opacity: dotOpacity }} />
                        <motion.circle cx="1200" cy={mid} r="4" fill={color} style={{ opacity: dotOpacity }} />
                    </>
                )}
            </svg>
        </div>
    );
}
