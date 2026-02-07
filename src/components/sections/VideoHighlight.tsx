"use client";

import { useRef, useState } from "react";
import {
    motion,
    useScroll,
    useTransform,
    useSpring,
    useMotionValue,
} from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";

/*
  Pixel-perfect replica of nodcoding.com's `.s-video-highlight` section.

  Structure (extracted from HTML):
    .s-video-highlight
      .u-container
        .b-heading-eye-1         → Title + animated eye
          .b__content .b__title  → "The Nod Coding Experience"
          .b__head .b__eye       → Mouse-tracking eye with pupil
        .s__body
          .s__video-wrapper      → Cover image + video + play button
          .s__text.t-t-xl        → Description with bullet point

  Eye paths (extracted):
    --path-open:  path('M 0 61 Q 137 -61 274 61 Q 137 183 0 61 Z')
    --path-close: path('M 0 61 Q 137  61 274 61 Q 137  61 0 61 Z')

  CSS:
    margin-top: 114px (~var(--section-spacing))
    margin-bottom: ~190px (~var(--section-spacing-lg))
    height: ~1130px
    z-index: 2
*/

/* ─── Animated Eye Component ─── */
function AnimatedEye() {
    const mouse = useMousePosition();

    // Pupil movement — tracks mouse with inertia 0.05
    const springConfig = { damping: 30, stiffness: 80 };
    const pupilX = useSpring(
        useMotionValue((mouse.progressX - 0.5) * 40),
        springConfig
    );
    const pupilY = useSpring(
        useMotionValue((mouse.progressY - 0.5) * 20),
        springConfig
    );

    // Update springs on mouse move
    pupilX.set((mouse.progressX - 0.5) * 40);
    pupilY.set((mouse.progressY - 0.5) * 20);

    return (
        <div className="eye-container">
            {/* Eye shape — SVG with open/close clip-path */}
            <svg
                className="eye-shape"
                viewBox="0 0 274 122"
                width="274"
                height="122"
                fill="none"
            >
                {/* Eye outline (open state) */}
                <path
                    d="M 0 61 Q 137 -61 274 61 Q 137 183 0 61 Z"
                    fill="var(--color-beige)"
                    stroke="var(--color-heading)"
                    strokeWidth="2.5"
                />
            </svg>

            {/* Pupil — follows mouse */}
            <motion.div
                className="eye-pupil"
                style={{
                    x: pupilX,
                    y: pupilY,
                }}
            >
                <div className="eye-pupil__inner eye-pupil__inner--main" />
                <div className="eye-pupil__inner eye-pupil__inner--secondary" />
            </motion.div>
        </div>
    );
}

/* ─── Main Section ─── */
export default function VideoHighlight() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start 90%", "start 40%"],
    });

    const revealY = useTransform(scrollYProgress, [0, 1], [60, 0]);
    const revealOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

    const handlePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <motion.div
            ref={sectionRef}
            className="s-video-highlight"
            style={{
                y: revealY,
                opacity: revealOpacity,
                position: "relative",
                zIndex: 2,
                marginTop: "var(--section-spacing)",
                marginBottom: "var(--section-spacing-lg)",
            }}
        >
            <div className="u-container">
                {/* ── b-heading-eye-1 — Title + Eye ── */}
                <div className="heading-eye">
                    <div className="heading-eye__content">
                        <div className="heading-eye__inner">
                            <motion.h2
                                className="heading-eye__title t-h-2xs"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{
                                    duration: 0.8,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                코딩쏙 학습 경험
                            </motion.h2>

                            {/* Decorative shapes — b__shapes */}
                            <div className="heading-eye__shapes">
                                <motion.div
                                    className="heading-eye__shape"
                                    initial={{ scale: 0, rotate: -45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.3,
                                        duration: 0.6,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                />
                                <motion.div
                                    className="heading-eye__shape"
                                    initial={{ scale: 0, rotate: 45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        delay: 0.5,
                                        duration: 0.6,
                                        type: "spring",
                                        stiffness: 200,
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Eye — mouse tracking */}
                    <div className="heading-eye__head">
                        <div className="heading-eye__head-bg" />
                        <AnimatedEye />
                    </div>
                </div>

                {/* ── s__body — Video section ── */}
                <div className="video-body">
                    {/* Video mask + border overlays */}
                    <div className="video-body__mask" />
                    <div className="video-body__border" />

                    {/* Video wrapper */}
                    <div
                        className="video-body__wrapper"
                        onClick={handlePlay}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                                handlePlay();
                        }}
                    >
                        {/* Cover image */}
                        <motion.div
                            className="video-body__cover"
                            animate={{ opacity: isPlaying ? 0 : 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Placeholder — replace with actual <Image> when file exists */}
                            <div
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    background: "linear-gradient(135deg, var(--color-brand-1) 0%, var(--color-brand-3) 50%, var(--color-brand-4) 100%)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "white",
                                    fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                                    fontWeight: 600,
                                    letterSpacing: "-0.03em",
                                    textAlign: "center",
                                    padding: "2rem",
                                }}
                            >
                                코딩쏙 소개 영상
                            </div>
                        </motion.div>

                        {/* Video */}
                        <div className="video-body__video">
                            <video
                                ref={videoRef}
                                className="video-body__player"
                                playsInline
                                width={720}
                                height={720}
                                preload="none"
                                onEnded={() => setIsPlaying(false)}
                            >
                                <source
                                    src="/videos/codingssok-intro.mp4"
                                    type="video/mp4"
                                />
                            </video>
                        </div>

                        {/* Play button */}
                        <motion.div
                            className="video-body__play"
                            animate={{
                                scale: isPlaying ? 0 : 1,
                                opacity: isPlaying ? 0 : 1,
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <svg
                                width="64"
                                height="64"
                                viewBox="0 0 64 64"
                                fill="none"
                            >
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="31"
                                    stroke="white"
                                    strokeWidth="2"
                                    fill="rgba(0,0,0,0.3)"
                                />
                                <path
                                    d="M26 20l18 12-18 12V20z"
                                    fill="white"
                                />
                            </svg>
                        </motion.div>
                    </div>

                    {/* Description text — t-t-xl */}
                    <motion.div
                        className="video-body__text t-t-xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                            delay: 0.4,
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                    >
                        <p>
                            <span className="bullet-point" />
                            코딩쏙의 혁신적인 학습 경험을 확인하고, 새로운
                            코딩 여정을 시작하세요.
                        </p>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}
