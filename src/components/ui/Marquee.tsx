"use client";

import { motion } from "framer-motion";

interface MarqueeProps {
    children: React.ReactNode;
    className?: string;
    /** Duration of one full loop in seconds */
    duration?: number;
    /** Direction */
    direction?: "left" | "right";
    /** Pause on hover */
    pauseOnHover?: boolean;
}

export default function Marquee({
    children,
    className = "",
    duration = 25,
    direction = "left",
    pauseOnHover = true,
}: MarqueeProps) {
    return (
        <div className={`overflow-hidden ${className}`}>
            <motion.div
                className={`flex gap-8 whitespace-nowrap w-max ${pauseOnHover ? "hover:[animation-play-state:paused]" : ""}`}
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    x: {
                        repeat: Infinity,
                        repeatType: "loop",
                        duration,
                        ease: "linear",
                    },
                }}
            >
                {/* Double the content for seamless loop */}
                <div className="flex gap-8 items-center shrink-0">{children}</div>
                <div className="flex gap-8 items-center shrink-0" aria-hidden>{children}</div>
            </motion.div>
        </div>
    );
}
