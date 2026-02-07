"use client";

import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

interface StaggerRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
}

const containerVariants = (delay: number, stagger: number): Variants => ({
    hidden: {},
    visible: {
        transition: {
            delayChildren: delay,
            staggerChildren: stagger,
        },
    },
});

const itemUp = (distance: number): Variants => ({
    hidden: { opacity: 0, y: distance },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
});

const itemDown = (distance: number): Variants => ({
    hidden: { opacity: 0, y: -distance },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
});

const itemLeft = (distance: number): Variants => ({
    hidden: { opacity: 0, x: distance },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
});

const itemRight = (distance: number): Variants => ({
    hidden: { opacity: 0, x: -distance },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
});

function getItemVariants(direction: string, distance: number) {
    switch (direction) {
        case "down": return itemDown(distance);
        case "left": return itemLeft(distance);
        case "right": return itemRight(distance);
        default: return itemUp(distance);
    }
}

export default function StaggerReveal({
    children,
    className = "",
    delay = 0,
    stagger = 0.1,
    direction = "up",
    distance = 40,
}: StaggerRevealProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-5%" });
    const variants = getItemVariants(direction, distance);

    return (
        <motion.div
            ref={ref}
            className={className}
            variants={containerVariants(delay, stagger)}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
        >
            {Array.isArray(children)
                ? children.map((child, i) => (
                    <motion.div key={i} variants={variants}>
                        {child}
                    </motion.div>
                ))
                : <motion.div variants={variants}>{children}</motion.div>
            }
        </motion.div>
    );
}
