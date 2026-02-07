"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface TextRevealProps {
    children: string;
    className?: string;
    /** "word" splits by spaces, "line" treats entire string as one block */
    splitBy?: "word" | "line";
    /** Delay before first word starts */
    delay?: number;
    /** Duration for each word */
    duration?: number;
    /** Stagger between words in seconds */
    stagger?: number;
    as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export default function TextReveal({
    children,
    className = "",
    splitBy = "word",
    delay = 0,
    duration = 0.6,
    stagger = 0.05,
    as: Tag = "span",
}: TextRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10%" });

    const words = splitBy === "word" ? children.split(" ") : [children];

    return (
        <Tag className={className}>
            <span ref={ref} className="inline" aria-label={children}>
                {words.map((word, i) => (
                    <span key={i} className="inline-block overflow-hidden align-bottom">
                        <motion.span
                            className="inline-block"
                            initial={{ y: "100%", opacity: 0 }}
                            animate={isInView ? { y: "0%", opacity: 1 } : { y: "100%", opacity: 0 }}
                            transition={{
                                duration,
                                delay: delay + i * stagger,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            {word}
                            {splitBy === "word" && i < words.length - 1 ? "\u00A0" : ""}
                        </motion.span>
                    </span>
                ))}
            </span>
        </Tag>
    );
}
