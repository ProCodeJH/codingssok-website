"use client";

import { useRef, ElementType } from "react";
import { motion, useInView } from "framer-motion";

interface LetterRevealProps {
    children: string;
    className?: string;
    as?: ElementType;
    delay?: number;
    stagger?: number;
    duration?: number;
    once?: boolean;
    threshold?: number;
    splitBy?: "letter" | "word";
}

const hidden = {
    y: "110%",
    opacity: 0,
    rotateX: -80,
};

const visible = {
    y: "0%",
    opacity: 1,
    rotateX: 0,
};

export default function LetterReveal({
    children,
    className = "",
    as: Tag = "span",
    delay = 0,
    stagger = 0.03,
    duration = 0.7,
    once = true,
    threshold = 0.3,
    splitBy = "letter",
}: LetterRevealProps) {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once, amount: threshold });

    const units = splitBy === "letter" ? children.split("") : children.split(" ");

    return (
        <Tag className={`${className}`} style={{ perspective: "600px" }}>
            <span
                ref={ref}
                className="inline"
                aria-label={children}
                role="text"
            >
                {units.map((unit, i) => (
                    <span
                        key={i}
                        className="inline-block overflow-hidden align-bottom"
                        style={{ perspective: "400px" }}
                    >
                        <motion.span
                            className="inline-block"
                            initial={hidden}
                            animate={isInView ? visible : hidden}
                            transition={{
                                duration,
                                delay: delay + i * stagger,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {unit === " " ? "\u00A0" : unit}
                            {splitBy === "word" && i < units.length - 1 ? "\u00A0" : ""}
                        </motion.span>
                    </span>
                ))}
            </span>
        </Tag>
    );
}
