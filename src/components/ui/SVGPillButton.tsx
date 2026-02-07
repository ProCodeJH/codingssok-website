"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface SVGPillButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "dark";
    size?: "sm" | "md" | "lg";
    className?: string;
    external?: boolean;
}

const sizeMap = {
    sm: { height: 38, px: 20, textClass: "text-sm", radius: 19 },
    md: { height: 48, px: 28, textClass: "text-base", radius: 24 },
    lg: { height: 56, px: 36, textClass: "text-lg", radius: 28 },
};

const variantColors = {
    primary: { fill: "#3B82F6", text: "text-white", hoverFill: "#2563EB" },
    secondary: { fill: "#F3F4F6", text: "text-gray-900", hoverFill: "#E5E7EB" },
    dark: { fill: "#1F2937", text: "text-white", hoverFill: "#374151" },
};

export default function SVGPillButton({
    children,
    href,
    onClick,
    variant = "primary",
    size = "md",
    className = "",
    external = false,
}: SVGPillButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 160, height: sizeMap[size].height });

    const { height, px, textClass, radius } = sizeMap[size];
    const { fill, text, hoverFill } = variantColors[variant];

    // Measure actual text width after mount
    const measureRef = (el: HTMLSpanElement | null) => {
        if (el) {
            const rect = el.getBoundingClientRect();
            setDimensions({ width: rect.width + px * 2 + 28, height }); // +28 for arrow space
        }
    };

    const { width: w, height: h } = dimensions;
    const r = radius;

    // SVG pill path
    const pillPath = `M${r},0 L${w - r},0 C${w - r + r * 0.66},0 ${w},${h * 0.5 - r * 0.66} ${w},${h / 2} C${w},${h * 0.5 + r * 0.66} ${w - r + r * 0.66},${h} ${w - r},${h} L${r},${h} C${r - r * 0.66},${h} 0,${h * 0.5 + r * 0.66} 0,${h / 2} C0,${h * 0.5 - r * 0.66} ${r - r * 0.66},0 ${r},0`;

    const content = (
        <motion.div
            ref={ref}
            className={`relative inline-flex items-center cursor-pointer select-none ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileTap={{ scale: 0.97 }}
            onClick={onClick}
        >
            {/* SVG Background */}
            <svg
                width={w}
                height={h}
                className="absolute inset-0"
                style={{ overflow: "visible" }}
            >
                {/* Shadow path */}
                <motion.path
                    d={pillPath}
                    fill={isHovered ? hoverFill : fill}
                    initial={false}
                    animate={{
                        scale: isHovered ? 1.04 : 1,
                    }}
                    style={{ transformOrigin: "center center" }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Border path */}
                <motion.path
                    d={pillPath}
                    fill="none"
                    stroke={isHovered ? hoverFill : fill}
                    strokeWidth="1.5"
                    opacity="0.3"
                    initial={false}
                    animate={{
                        scale: isHovered ? 1.08 : 1,
                        opacity: isHovered ? 0.5 : 0.3,
                    }}
                    style={{ transformOrigin: "center center" }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
            </svg>

            {/* Text Content */}
            <span
                ref={measureRef}
                className={`relative z-10 flex items-center gap-2 font-medium ${textClass} ${text}`}
                style={{ padding: `0 ${px}px`, height: `${h}px`, lineHeight: `${h}px` }}
            >
                {children}
                {/* Arrow */}
                <motion.svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="flex-shrink-0"
                    initial={false}
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                    <path
                        d="M1 7h11M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.svg>
            </span>
        </motion.div>
    );

    if (href) {
        if (external) {
            return <a href={href} target="_blank" rel="noreferrer">{content}</a>;
        }
        return <Link href={href}>{content}</Link>;
    }

    return content;
}
