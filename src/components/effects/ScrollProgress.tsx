"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
            style={{
                scaleX,
                background: "linear-gradient(90deg, #2563EB 0%, #06B6D4 50%, #6366F1 100%)",
                boxShadow: "0 0 10px rgba(37, 99, 235, 0.5)",
            }}
        />
    );
}
