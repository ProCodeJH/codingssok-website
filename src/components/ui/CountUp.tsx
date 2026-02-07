"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface CountUpProps {
    target: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    className?: string;
}

export default function CountUp({
    target,
    duration = 2,
    suffix = "",
    prefix = "",
    className = "",
}: CountUpProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        duration: duration * 1000,
        bounce: 0,
    });
    const [display, setDisplay] = useState("0");

    useEffect(() => {
        if (isInView) {
            motionValue.set(target);
        }
    }, [isInView, motionValue, target]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            setDisplay(Math.round(latest).toLocaleString());
        });
        return unsubscribe;
    }, [springValue]);

    return (
        <span ref={ref} className={className}>
            {prefix}{display}{suffix}
        </span>
    );
}
