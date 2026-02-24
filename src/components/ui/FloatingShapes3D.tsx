"use client";
import { motion } from "framer-motion";

/* ═══════════════════════════════════════
   3D Floating Shapes — CSS 3D 효과
   WebGL 없이 CSS transform3d 기반
   Hero, Dashboard 등에 삽입
   ═══════════════════════════════════════ */

interface Shape {
    emoji: string;
    size: number;
    x: string;
    y: string;
    delay: number;
    duration: number;
    rotate: number;
}

const SHAPES: Shape[] = [
    { emoji: "💻", size: 40, x: "10%", y: "20%", delay: 0, duration: 8, rotate: 25 },
    { emoji: "🚀", size: 36, x: "85%", y: "15%", delay: 1, duration: 10, rotate: -20 },
    { emoji: "⚡", size: 32, x: "75%", y: "65%", delay: 2, duration: 7, rotate: 15 },
    { emoji: "🧠", size: 44, x: "15%", y: "70%", delay: 0.5, duration: 9, rotate: -30 },
    { emoji: "🔮", size: 28, x: "50%", y: "10%", delay: 1.5, duration: 11, rotate: 10 },
    { emoji: "📱", size: 30, x: "90%", y: "45%", delay: 3, duration: 8, rotate: -15 },
    { emoji: "✨", size: 24, x: "30%", y: "85%", delay: 2.5, duration: 6, rotate: 35 },
    { emoji: "🎯", size: 34, x: "60%", y: "80%", delay: 0.8, duration: 12, rotate: -25 },
];

/* Orbit path for 3D effect */
const orbAnimation = (rotate: number, duration: number) => ({
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
                    animate={orbAnimation(s.rotate, s.duration)}
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
                    }}
                >
                    {s.emoji}
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
