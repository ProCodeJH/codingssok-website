"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springX = useSpring(cursorX, { stiffness: 150, damping: 25 });
    const springY = useSpring(cursorY, { stiffness: 150, damping: 25 });

    useEffect(() => {
        // 모바일에서는 비활성화
        if (typeof window === "undefined") return;
        const isMobile = window.matchMedia("(pointer: coarse)").matches;
        if (isMobile) return;

        setIsVisible(true);

        const handleMouseMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [cursorX, cursorY]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-[9999]"
            aria-hidden="true"
        >
            {/* 메인 글로우 — 블루 */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    width: 400,
                    height: 400,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, rgba(6, 182, 212, 0.04) 40%, transparent 70%)",
                    filter: "blur(1px)",
                }}
            />
            {/* 작은 포인트 — 시안 */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    x: springX,
                    y: springY,
                    width: 8,
                    height: 8,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(6, 182, 212, 0.6) 0%, transparent 100%)",
                    boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)",
                }}
            />
        </motion.div>
    );
}
