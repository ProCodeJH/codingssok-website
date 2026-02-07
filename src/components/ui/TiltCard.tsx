"use client";

import { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

interface TiltCardProps {
    children: React.ReactNode;
    className?: string;
    tiltDegree?: number;
}

export default function TiltCard({ children, className = "", tiltDegree = 5 }: TiltCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-0.5, 0.5], [tiltDegree, -tiltDegree]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-tiltDegree, tiltDegree]);

    const handleMouse = (e: React.MouseEvent) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const resetMouse = () => { x.set(0); y.set(0); };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouse}
            onMouseLeave={resetMouse}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
