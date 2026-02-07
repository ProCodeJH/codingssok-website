"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    tiltDegree?: number;
    glareEnabled?: boolean;
}

export default function TiltCard({
    children,
    className = "",
    tiltDegree = 8,
    glareEnabled = true,
}: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [glarePos, setGlarePos] = useState({ x: 50, y: 50 });
    const [isHovering, setIsHovering] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setTilt({
            x: (y - 0.5) * -tiltDegree * 2,
            y: (x - 0.5) * tiltDegree * 2,
        });
        setGlarePos({ x: x * 100, y: y * 100 });
    };

    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
        setIsHovering(false);
    };

    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    return (
        <motion.div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
            style={{ perspective: 800 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            animate={{
                rotateX: tilt.x,
                rotateY: tilt.y,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
        >
            {children}

            {glareEnabled && (
                <div
                    className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] transition-opacity duration-300"
                    style={{
                        opacity: isHovering ? 0.15 : 0,
                        background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.8) 0%, transparent 60%)`,
                    }}
                />
            )}
        </motion.div>
    );
}
