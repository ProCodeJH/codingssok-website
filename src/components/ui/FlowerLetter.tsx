"use client";

import { useRef, useEffect } from "react";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";

/*
  Pixel-perfect replica of nodcoding.com's `.b__letter` structure.
  Extracted from the exact Lottie SVG inline renders + stem path coordinates.

  Each letter has:
    .b__letter__flower  → Lottie SVG shapes (mouse-reactive translate3d + rotate)
    .b__letter__stem    → SVG quadratic stem + circle tip dot

  Mouse influence per letter (extracted from nodcoding inline transforms):
    코(C): translate3d(4.51, 0.012, 0) rotate(0.296°) — subtle
    딩(O): translate3d(57.75, 2.11, 0) rotate(4.19°)  — dramatic
    쏙(D): translate3d(26.43, 0.40, 0) rotate(1.74°)  — medium
*/

/* ─── SVG shape definitions — exact nodcoding Lottie paths ─── */

interface FlowerShape {
    viewBox: string;
    width: number;
    height: number;
    paths: { d: string; fill: string; transform?: string }[];
}

const SHAPES: Record<string, FlowerShape> = {
    /*
      Letter C (코) — Pink half-circle + Gold half-circle
      Lottie: home-hero-c.json
      Extracted from inline <svg viewBox="0 0 299 285">
    */
    코: {
        viewBox: "0 0 299 285",
        width: 299,
        height: 285,
        paths: [
            {
                d: "M155.34 284.27c-78.27 0-141.73-63.46-141.73-141.73S77.07 0.81 155.34 0.81V284.27z",
                fill: "#FFBABA", // rgb(255,186,186)
            },
            {
                d: "M253.2 284.27c-78.27 0-141.73-63.46-141.73-141.73S174.94 0.81 253.2 0.81V284.27z",
                fill: "#FFD37D", // rgb(255,211,125)
            },
        ],
    },
    /*
      Letter O (딩) — Green rotated half + Orange rotated half
      Lottie: home-hero-o.json
      Extracted from inline <svg viewBox="0 0 289 288">
      Note: uses matrix transforms for rotation animation
    */
    딩: {
        viewBox: "0 0 289 288",
        width: 289,
        height: 288,
        paths: [
            {
                d: "M0,-134 C74,54-134 134,-74,0 134,0 C46,0.23 -85.9,-0.23 -134,0 C-134,-74,0 -74,0-134 0,-134z",
                fill: "#77C6B3", // rgb(119,198,179)
                transform: "matrix(-0.82,0.69,-0.69,-0.82,-166.81,268.18)",
            },
            {
                d: "M0,-134 C74,-134 134,-74 134,0 C46,0.23 -85.9,-0.23 -134,0 C-134,-74 -74,-134 0,-134z",
                fill: "#EC5212", // rgb(236,82,18)
                transform: "matrix(0.82,-0.69,0.69,0.82,455.56,19.97)",
            },
        ],
    },
    /*
      Letter D (쏙) — Blue half-circle + Dark blue rectangle
      Lottie: home-hero-d.json
      Extracted from inline <svg viewBox="0 0 288 288">
    */
    쏙: {
        viewBox: "0 0 288 288",
        width: 288,
        height: 288,
        paths: [
            {
                d: "M144 0c74 0 134 60 134 134s-60 134-134 134V0z",
                fill: "#70A2E1", // rgb(112,162,225)
            },
            {
                d: "M56.5 0h88v287h-88V0z",
                fill: "#3658D3", // rgb(54,88,211)
            },
        ],
    },
};

/*
  Mouse influence multipliers per letter index.
  Extracted from nodcoding's inline transforms when mouse was at
  progress-x: 0.999, progress-y: 0.338:

  - C:  tx=4.51,   ty=0.012,  r=0.296°   → baseX≈9.0,  baseR≈0.6
  - O:  tx=57.75,  ty=2.11,   r=4.19°    → baseX≈115.7, baseR≈8.4
  - D:  tx=26.43,  ty=0.40,   r=1.74°    → baseX≈52.9,  baseR≈3.5

  Our 3 letters map: 코→C, 딩→O, 쏙→D
*/
const MOUSE_FACTORS = [
    { x: 9.0, y: 0.07, r: 0.6 },   // 코 (C) — subtle
    { x: 115.0, y: 13.0, r: 8.4 },  // 딩 (O) — dramatic
    { x: 53.0, y: 2.5, r: 3.5 },    // 쏙 (D) — medium
];

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
    const factor = MOUSE_FACTORS[index] || MOUSE_FACTORS[0];

    // Mouse-reactive flower transform
    // nodcoding formula: translate3d(X, Y, 0) rotate(R)
    // X = (progressX - 0.5) * factor.x * 2
    // Y = (progressY - 0.5) * factor.y * 2
    // R = (progressX - 0.5) * factor.r * 2
    const dx = (mouse.progressX - 0.5);
    const flowerX = dx * factor.x * 2;
    const flowerY = (mouse.progressY - 0.5) * factor.y * 2;
    const flowerRotate = dx * factor.r * 2;

    const springConfig = { damping: 25, stiffness: 120 };
    const springX = useSpring(useMotionValue(flowerX), springConfig);
    const springY = useSpring(useMotionValue(flowerY), springConfig);
    const springR = useSpring(useMotionValue(flowerRotate), springConfig);

    useEffect(() => {
        springX.set(flowerX);
        springY.set(flowerY);
        springR.set(flowerRotate);
    }, [flowerX, flowerY, flowerRotate, springX, springY, springR]);

    // Scroll-driven letter reveal
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "start 40%"],
    });
    const letterY = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
    const letterOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    // Stem path — nodcoding formula from extracted stems:
    // M cx stemHeight*1.2 Q cx stemHeight*0.5 (cx + flowerX*ratio) 0 m ... circle
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
                            fillOpacity={1}
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

            {/* Stem — nodcoding's exact SVG path with quadratic curve + circle tip */}
            <svg
                className="flower-letter__stem"
                width={stemWidth}
                height={stemHeight}
                fill="none"
                overflow="visible"
                preserveAspectRatio="none"
            >
                <motion.path
                    d={`M ${cx} ${stemHeight * 1.2} Q ${cx} ${stemHeight * 0.5} ${cx + flowerX * 0.3} 0`}
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
                {/* Stem tip dot — nodcoding's 6px radius circle at stem end */}
                <motion.circle
                    cx={cx + flowerX * 0.3}
                    cy={0}
                    r={6}
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
