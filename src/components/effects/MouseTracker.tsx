"use client";

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MouseContextType {
    x: number;
    y: number;
    progressX: number;
    progressY: number;
}

const MouseContext = createContext<MouseContextType>({ x: 0, y: 0, progressX: 0.5, progressY: 0.5 });

export function useMousePosition() {
    return useContext(MouseContext);
}

export default function MouseTracker({ children }: { children: ReactNode }) {
    const [mouse, setMouse] = useState<MouseContextType>({ x: 0, y: 0, progressX: 0.5, progressY: 0.5 });
    const ref = useRef<HTMLDivElement>(null);

    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const mouseX = useSpring(useMotionValue(0), springConfig);
    const mouseY = useSpring(useMotionValue(0), springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            mouseX.set(clientX);
            mouseY.set(clientY);

            setMouse({
                x: clientX,
                y: clientY,
                progressX: clientX / innerWidth,
                progressY: clientY / innerHeight,
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <MouseContext.Provider value={mouse}>
            <motion.div
                ref={ref}
                style={{
                    // @ts-expect-error CSS custom properties
                    "--mouse-x": `${mouse.x}px`,
                    "--mouse-y": `${mouse.y}px`,
                    "--mouse-progress-x": mouse.progressX,
                    "--mouse-progress-y": mouse.progressY,
                }}
            >
                {children}
            </motion.div>
        </MouseContext.Provider>
    );
}
