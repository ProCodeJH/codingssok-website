"use client";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════
   3D Floating Shapes — CSS 3D 효과
   WebGL 없이 CSS transform3d 기반
   Hero, Dashboard 등에 삽입
   SVG 아이콘 기반 (이모지 제거)
   ═══════════════════════════════════════ */

interface Shape {
    icon: React.ReactNode;
    size: number;
    x: string;
    y: string;
    delay: number;
    duration: number;
    rotate: number;
}

const SHAPES: Shape[] = [
    { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" /><path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>, size: 40, x: "10%", y: "20%", delay: 0, duration: 8, rotate: 25 },
    { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" stroke="currentColor" strokeWidth="1.5" /><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22 22 0 01-4 2z" stroke="currentColor" strokeWidth="1.5" /></svg>, size: 36, x: "85%", y: "15%", delay: 1, duration: 10, rotate: -20 },
    { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>, size: 32, x: "75%", y: "65%", delay: 2, duration: 7, rotate: 15 },
    { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M12 2a7 7 0 017 7c0 3-2 5.5-4 7l-3 3.5L9 16c-2-1.5-4-4-4-7a7 7 0 017-7z" stroke="currentColor" strokeWidth="1.5" /><path d="M9 12c0 .5.5 1.5 1.5 2.5L12 16l1.5-1.5C14.5 13.5 15 12.5 15 12" stroke="currentColor" strokeWidth="1" opacity="0.5" /></svg>, size: 44, x: "15%", y: "70%", delay: 0.5, duration: 9, rotate: -30 },
    { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M12 2v4M12 18v4M2 12h4M18 12h4" stroke="currentColor" strokeWidth="1" opacity="0.4" /></svg>, size: 28, x: "50%", y: "10%", delay: 1.5, duration: 11, rotate: 10 },
    { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><rect x="5" y="2" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="18" r="1" fill="currentColor" /></svg>, size: 30, x: "90%", y: "45%", delay: 3, duration: 8, rotate: -15 },
    { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>, size: 24, x: "30%", y: "85%", delay: 2.5, duration: 6, rotate: 35 },
    { icon: <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" /><circle cx="12" cy="12" r="1" fill="currentColor" /></svg>, size: 34, x: "60%", y: "80%", delay: 0.8, duration: 12, rotate: -25 },
];

/* Orbit path for 3D effect */
const orbAnimation = (rotate: number) => ({
    y: [0, -15, 0, 15, 0],
    x: [0, 10, 0, -10, 0],
    rotateY: [0, rotate, 0, -rotate, 0],
    rotateX: [0, rotate * 0.5, 0, -rotate * 0.5, 0],
    scale: [1, 1.1, 1, 0.95, 1],
});

export default function FloatingShapes3D({ opacity = 0.4 }: { opacity?: number }) {
    return (
        <div style={{
            position: "absolute", inset: 0, overflow: "hidden",
            pointerEvents: "none", zIndex: 0,
            perspective: "800px", perspectiveOrigin: "50% 50%",
        }}>
            {SHAPES.map((s, i) => (
                <motion.div
                    key={i}
                    animate={orbAnimation(s.rotate)}
                    transition={{
                        duration: s.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: s.delay,
                    }}
                    style={{
                        position: "absolute",
                        left: s.x, top: s.y,
                        fontSize: s.size,
                        opacity,
                        transformStyle: "preserve-3d",
                        filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))",
                        color: "#64748b",
                    }}
                >
                    {s.icon}
                </motion.div>
            ))}

            {/* Glassmorphic floating orbs */}
            <motion.div
                animate={{
                    x: [0, 40, 0, -40, 0],
                    y: [0, -20, 0, 20, 0],
                    scale: [1, 1.2, 1, 0.8, 1],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute", left: "20%", top: "40%",
                    width: 120, height: 120, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(79,70,229,0.08), transparent)",
                    filter: "blur(30px)",
                }}
            />
            <motion.div
                animate={{
                    x: [0, -30, 0, 30, 0],
                    y: [0, 30, 0, -30, 0],
                    scale: [1, 0.9, 1, 1.1, 1],
                }}
                transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                style={{
                    position: "absolute", right: "15%", bottom: "30%",
                    width: 160, height: 160, borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(245,158,11,0.06), transparent)",
                    filter: "blur(40px)",
                }}
            />
        </div>
    );
}
