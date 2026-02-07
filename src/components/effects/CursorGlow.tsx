"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isClicking, setIsClicking] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // 메인 글로우 — 부드러운 추적
    const springX = useSpring(cursorX, { stiffness: 120, damping: 20 });
    const springY = useSpring(cursorY, { stiffness: 120, damping: 20 });

    // 트레일 글로우 — 더 느린 추적 (잔상)
    const trailX = useSpring(cursorX, { stiffness: 50, damping: 25 });
    const trailY = useSpring(cursorY, { stiffness: 50, damping: 25 });

    const handleMouseMove = useCallback((e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
    }, [cursorX, cursorY]);

    const handleHoverStart = useCallback(() => setIsHovering(true), []);
    const handleHoverEnd = useCallback(() => setIsHovering(false), []);
    const handleMouseDown = useCallback(() => setIsClicking(true), []);
    const handleMouseUp = useCallback(() => setIsClicking(false), []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const isMobile = window.matchMedia("(pointer: coarse)").matches;
        if (isMobile) return;

        setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);

        // 인터랙티브 요소 호버 감지
        const handleOver = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], input, textarea, select, [data-hover]")) {
                setIsHovering(true);
            }
        };
        const handleOut = (e: Event) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], input, textarea, select, [data-hover]")) {
                setIsHovering(false);
            }
        };

        document.addEventListener("mouseover", handleOver);
        document.addEventListener("mouseout", handleOut);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mousedown", handleMouseDown);
            window.removeEventListener("mouseup", handleMouseUp);
            document.removeEventListener("mouseover", handleOver);
            document.removeEventListener("mouseout", handleOut);
        };
    }, [handleMouseMove, handleMouseDown, handleMouseUp]);

    if (!isVisible) return null;

    return (
        <motion.div
            className="pointer-events-none fixed inset-0 z-[9999]"
            aria-hidden="true"
        >
            {/* 레이어 1: 트레일 글로우 (잔상) */}
            <motion.div
                className="absolute rounded-full"
                style={{
                    x: trailX,
                    y: trailY,
                    width: 500,
                    height: 500,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: "radial-gradient(circle, rgba(37,99,235,0.04) 0%, rgba(6,182,212,0.02) 30%, transparent 65%)",
                }}
            />

            {/* 레이어 2: 메인 글로우 */}
            <motion.div
                className="absolute rounded-full"
                animate={{
                    width: isHovering ? 250 : 350,
                    height: isHovering ? 250 : 350,
                    scale: isClicking ? 0.85 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: isHovering
                        ? "radial-gradient(circle, rgba(6,182,212,0.12) 0%, rgba(37,99,235,0.06) 35%, transparent 65%)"
                        : "radial-gradient(circle, rgba(37,99,235,0.07) 0%, rgba(6,182,212,0.03) 35%, transparent 65%)",
                }}
            />

            {/* 레이어 3: 포인트 도트 */}
            <motion.div
                className="absolute rounded-full"
                animate={{
                    width: isHovering ? 40 : 10,
                    height: isHovering ? 40 : 10,
                    scale: isClicking ? 0.6 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                style={{
                    x: springX,
                    y: springY,
                    translateX: "-50%",
                    translateY: "-50%",
                    background: isHovering
                        ? "radial-gradient(circle, rgba(6,182,212,0.3) 0%, rgba(37,99,235,0.15) 50%, transparent 100%)"
                        : "radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 100%)",
                    boxShadow: isHovering
                        ? "0 0 30px rgba(6,182,212,0.3), 0 0 60px rgba(37,99,235,0.15)"
                        : "0 0 15px rgba(37,99,235,0.25)",
                    border: isHovering ? "1px solid rgba(6,182,212,0.2)" : "none",
                    backdropFilter: isHovering ? "blur(1px)" : "none",
                }}
            />
        </motion.div>
    );
}
