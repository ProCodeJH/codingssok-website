"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface EyeTrackerProps {
    size?: number;
    className?: string;
    pupilColor?: string;
    secondaryColor?: string;
}

export default function EyeTracker({
    size = 132,
    className = "",
    pupilColor = "#383030",
    secondaryColor = "#EC5212",
}: EyeTrackerProps) {
    const eyeRef = useRef<HTMLDivElement>(null);
    const [isBlinking, setIsBlinking] = useState(false);

    const pupilX = useSpring(useMotionValue(0), { damping: 20, stiffness: 200, mass: 0.3 });
    const pupilY = useSpring(useMotionValue(0), { damping: 20, stiffness: 200, mass: 0.3 });

    const halfW = size / 2;
    const halfH = size * 0.447; // aspect like nodcoding
    const pupilSize = size * 0.22;
    const maxTravel = size * 0.18;

    // Blink every 3-6 seconds
    useEffect(() => {
        const blink = () => {
            setIsBlinking(true);
            setTimeout(() => setIsBlinking(false), 150);
        };

        const interval = setInterval(blink, 3000 + Math.random() * 3000);
        return () => clearInterval(interval);
    }, []);

    // Track mouse
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!eyeRef.current) return;
            const rect = eyeRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;

            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const maxDist = Math.max(dist, 1);

            const nx = (dx / maxDist) * Math.min(maxTravel, dist * 0.15);
            const ny = (dy / maxDist) * Math.min(maxTravel * 0.6, dist * 0.1);

            pupilX.set(nx);
            pupilY.set(ny);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [pupilX, pupilY, maxTravel]);

    // Eye shape paths (open and close for blink)
    const openPath = `M 0 ${halfH} Q ${halfW} ${-halfH} ${size} ${halfH} Q ${halfW} ${halfH * 3} 0 ${halfH} Z`;
    const closedPath = `M 0 ${halfH} Q ${halfW} ${halfH} ${size} ${halfH} Q ${halfW} ${halfH} 0 ${halfH} Z`;

    return (
        <div ref={eyeRef} className={`relative inline-flex items-center justify-center ${className}`} style={{ width: size, height: halfH * 2 }}>
            <svg width={size} height={halfH * 2} viewBox={`0 0 ${size} ${halfH * 2}`} className="overflow-visible">
                <motion.path
                    d={isBlinking ? closedPath : openPath}
                    fill="white"
                    stroke="#383030"
                    strokeWidth="2"
                    initial={false}
                    animate={{ d: isBlinking ? closedPath : openPath }}
                    transition={{ duration: 0.1, ease: "easeInOut" }}
                />
                <clipPath id="eye-clip">
                    <motion.path
                        d={isBlinking ? closedPath : openPath}
                        initial={false}
                        animate={{ d: isBlinking ? closedPath : openPath }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                    />
                </clipPath>
                <g clipPath="url(#eye-clip)">
                    <motion.g style={{ x: pupilX, y: pupilY }}>
                        {/* Main pupil */}
                        <circle cx={halfW} cy={halfH} r={pupilSize} fill={pupilColor} />
                        {/* Secondary color ring */}
                        <circle cx={halfW} cy={halfH} r={pupilSize * 0.6} fill={secondaryColor} />
                        {/* Highlight */}
                        <circle cx={halfW + pupilSize * 0.3} cy={halfH - pupilSize * 0.3} r={pupilSize * 0.15} fill="white" opacity="0.8" />
                    </motion.g>
                </g>
            </svg>
        </div>
    );
}
