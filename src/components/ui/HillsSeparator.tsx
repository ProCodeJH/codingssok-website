"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface HillsSeparatorProps {
    className?: string;
    color?: string;
    lines?: number;
}

export default function HillsSeparator({
    className = "",
    color = "#383030",
    lines = 3,
}: HillsSeparatorProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

    const progress = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
    const dotScale = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    const viewBoxH = 80 * lines;

    return (
        <div ref={ref} className={`w-full py-8 overflow-hidden ${className}`}>
            <div className="max-w-5xl mx-auto px-8">
                <svg
                    viewBox={`0 0 1200 ${viewBoxH}`}
                    preserveAspectRatio="none"
                    className="w-full"
                    style={{ height: viewBoxH / 3 }}
                >
                    {Array.from({ length: lines }, (_, row) => {
                        const y = 40 + row * 80;
                        const amp = 30 + row * 10;
                        const offset = row * 150;

                        return (
                            <g key={row}>
                                <motion.path
                                    d={`M 0 ${y} Q ${300 + offset} ${y - amp} 600 ${y} Q ${900 - offset} ${y + amp} 1200 ${y}`}
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="1.5"
                                    style={{ pathLength: progress }}
                                    opacity={0.3 + row * 0.2}
                                />
                                {/* Dots at intersections */}
                                <motion.circle
                                    cx={300 + offset}
                                    cy={y - amp / 2}
                                    r="4"
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="1.5"
                                    style={{ scale: dotScale }}
                                />
                                <motion.circle
                                    cx={900 - offset}
                                    cy={y + amp / 2}
                                    r="4"
                                    fill="none"
                                    stroke={color}
                                    strokeWidth="1.5"
                                    style={{ scale: dotScale }}
                                />
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}
