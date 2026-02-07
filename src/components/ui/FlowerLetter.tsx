"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";

/*
  Replicates nodcoding.com's `.b__letter` structure:
    .b__letter
      .b__letter__flower  → SVG shape (replaces Lottie), mouse-reactive translate3d + rotate
      .b__letter__stem    → SVG stem path drawn from bottom up
*/

/* ─── SVG shape definitions for each letter ─── */
/* Extracted colour palette from nodcoding's Lottie SVGs */

interface FlowerShape {
    viewBox: string;
    width: number;
    height: number;
    paths: { d: string; fill: string }[];
}

const SHAPES: Record<string, FlowerShape> = {
    // "코" — nodcoding "C" pattern: pink half-circle + gold half-circle
    코: {
        viewBox: "0 0 299 285",
        width: 299,
        height: 285,
        paths: [
            {
                d: "M155.34 284.27c-78.27 0-141.73-63.46-141.73-141.73S77.07 0.81 155.34 0.81V284.27z",
                fill: "#FFBABA",
            },
            {
                d: "M253.2 284.27c-78.27 0-141.73-63.46-141.73-141.73S174.94 0.81 253.2 0.81V284.27z",
                fill: "#FFD37D",
            },
        ],
    },
    // "딩" — nodcoding "O" pattern: green-orange rotated half-circles
    딩: {
        viewBox: "0 0 289 288",
        width: 289,
        height: 288,
        paths: [
            {
                d: "M144.5 144c0-74 60-134 134-134 0 60-60 134-134 134-74 0-134 60-134 134 0-74 60-134 134-134z",
                fill: "#77C6B3",
            },
            {
                d: "M144.5 144c0 74 60 134 134 134 0-60-60-134-134-134 74 0 134-60 134-134 0 74-60 134-134 134z",
                fill: "#EC5212",
            },
        ],
    },
    // "쏙" — nodcoding "D" pattern: blue half-circle + rectangle
    쏙: {
        viewBox: "0 0 288 288",
        width: 288,
        height: 288,
        paths: [
            {
                d: "M144 0c74 0 134 60 134 134s-60 134-134 134V0z",
                fill: "#70A2E1",
            },
            {
                d: "M56.5 0h88v287h-88V0z",
                fill: "#3658D3",
            },
        ],
    },
};

interface FlowerLetterProps {
    letter: string;
    shapeKey: string;
    stemWidth: number;
    stemHeight: number;
    flowerHeight: number;
    index: number;
}

export default function FlowerLetter({
    letter,
    shapeKey,
    stemWidth,
    stemHeight,
    flowerHeight,
    index,
}: FlowerLetterProps) {
    const ref = useRef<HTMLDivElement>(null);
    const mouse = useMousePosition();
    const shape = SHAPES[shapeKey];

    // Mouse-reactive flower transform — exactly like nodcoding's
    // transform: translate3d(Xpx, Ypx, 0px) rotate(Rdeg)
    const mouseInfluence = 0.8 + index * 0.15;
    const flowerX = (mouse.progressX - 0.5) * 12 * mouseInfluence;
    const flowerY = (mouse.progressY - 0.5) * 0.8 * mouseInfluence;
    const flowerRotate = (mouse.progressX - 0.5) * 2.5 * mouseInfluence;

    const springX = useSpring(useMotionValue(flowerX), { damping: 25, stiffness: 120 });
    const springY = useSpring(useMotionValue(flowerY), { damping: 25, stiffness: 120 });
    const springR = useSpring(useMotionValue(flowerRotate), { damping: 25, stiffness: 120 });

    useEffect(() => {
        springX.set(flowerX);
        springY.set(flowerY);
        springR.set(flowerRotate);
    }, [flowerX, flowerY, flowerRotate, springX, springY, springR]);

    // Scroll-driven letter reveal — translates from bottom
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "start 40%"],
    });
    const letterY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
    const letterOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    // Stem path
    const cx = stemWidth / 2;

    if (!shape) return null;

    return (
        <motion.div
            ref={containerRef}
            className="flower-letter"
            style={{
                y: letterY,
                opacity: letterOpacity,
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* Flower — mouse-reactive SVG shape */}
            <motion.div
                ref={ref}
                className="flower-letter__flower"
                style={{
                    x: springX,
                    y: springY,
                    rotate: springR,
                    width: shape.width * (flowerHeight / shape.height),
                    height: flowerHeight,
                    willChange: "transform",
                }}
            >
                <svg
                    viewBox={shape.viewBox}
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid meet"
                    style={{ overflow: "visible" }}
                >
                    {shape.paths.map((p, i) => (
                        <motion.path
                            key={i}
                            d={p.d}
                            fill={p.fill}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                delay: 0.3 + index * 0.2 + i * 0.1,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{ transformOrigin: "center center" }}
                        />
                    ))}
                </svg>
            </motion.div>

            {/* Stem — nodcoding's SVG path with quadratic curve */}
            <svg
                className="flower-letter__stem"
                width={stemWidth}
                height={stemHeight}
                fill="none"
                overflow="visible"
                preserveAspectRatio="none"
            >
                <motion.path
                    d={`M ${cx} ${stemHeight * 1.1} Q ${cx} ${stemHeight * 0.45} ${cx + flowerX * 0.3} 0`}
                    stroke="#383030"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        delay: 0.5 + index * 0.2,
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                />
                {/* Stem tip dot — nodcoding's circle at stem end */}
                <motion.circle
                    cx={cx + flowerX * 0.3}
                    cy={0}
                    r={4}
                    fill="#383030"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 1.0 + index * 0.2,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                    }}
                />
            </svg>
        </motion.div>
    );
}
