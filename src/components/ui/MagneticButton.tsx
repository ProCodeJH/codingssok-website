"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
    children: React.ReactNode;
    className?: string;
    /** Magnetic pull strength in px. Default 12 */
    strength?: number;
    as?: "button" | "a";
    href?: string;
    onClick?: () => void;
    ariaLabel?: string;
}

export default function MagneticButton({
    children,
    className = "",
    strength = 12,
    as: Tag = "button",
    href,
    onClick,
    ariaLabel,
}: MagneticButtonProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = (e.clientX - centerX) / (width / 2);
        const deltaY = (e.clientY - centerY) / (height / 2);
        setPosition({ x: deltaX * strength, y: deltaY * strength });
    };

    const handleLeave = () => setPosition({ x: 0, y: 0 });

    const MotionTag = Tag === "a" ? motion.a : motion.button;

    return (
        <div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={handleLeave}
            className="inline-block"
        >
            <MotionTag
                className={className}
                href={Tag === "a" ? href : undefined}
                onClick={onClick}
                animate={{ x: position.x, y: position.y }}
                transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
                whileTap={{ scale: 0.95 }}
                aria-label={ariaLabel}
            >
                {children}
            </MotionTag>
        </div>
    );
}
