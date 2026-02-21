"use client";

import { ReactNode, forwardRef } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

/* ═══════════════════════════════════════════
 *  FadeIn — 기본 등장 애니메이션
 * ═══════════════════════════════════════════ */
interface FadeInProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
    duration?: number;
    direction?: "up" | "down" | "left" | "right" | "none";
    distance?: number;
}

export function FadeIn({ children, delay = 0, duration = 0.5, direction = "up", distance = 24, ...props }: FadeInProps) {
    const dirMap = { up: { y: distance }, down: { y: -distance }, left: { x: distance }, right: { x: -distance }, none: {} };
    return (
        <motion.div
            initial={{ opacity: 0, ...dirMap[direction] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════
 *  SlideIn — 뷰포트 진입 시 등장
 * ═══════════════════════════════════════════ */
interface SlideInProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    delay?: number;
    direction?: "up" | "down" | "left" | "right";
    distance?: number;
}

export function SlideIn({ children, delay = 0, direction = "up", distance = 40, ...props }: SlideInProps) {
    const dirMap = { up: { y: distance }, down: { y: -distance }, left: { x: distance }, right: { x: -distance } };
    return (
        <motion.div
            initial={{ opacity: 0, ...dirMap[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════
 *  StaggerList — 자식 순차 등장
 * ═══════════════════════════════════════════ */
const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export function StaggerList({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
    return (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className={className} style={style}>
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className, style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
    return (
        <motion.div variants={itemVariants} className={className} style={style}>
            {children}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════
 *  ScaleOnHover — 호버 시 확대 + 그림자
 * ═══════════════════════════════════════════ */
export function ScaleOnHover({
    children, scale = 1.03, className, style,
}: { children: ReactNode; scale?: number; className?: string; style?: React.CSSProperties }) {
    return (
        <motion.div
            whileHover={{ scale, y: -4, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={className}
            style={{ ...style, cursor: "pointer" }}
        >
            {children}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════
 *  GlowPulse — 글로우 펄스 효과
 * ═══════════════════════════════════════════ */
export function GlowPulse({
    children, color = "rgba(14,165,233,0.4)", className, style,
}: { children: ReactNode; color?: string; className?: string; style?: React.CSSProperties }) {
    return (
        <motion.div
            animate={{ boxShadow: [`0 0 0px ${color}`, `0 0 30px ${color}`, `0 0 0px ${color}`] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}

/* ═══════════════════════════════════════════
 *  AnimatedBar — 프로그레스 바 애니메이션
 * ═══════════════════════════════════════════ */
export function AnimatedBar({
    width, color, height = 8, delay = 0, className,
}: { width: string; color: string; height?: number; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ width: 0 }}
            animate={{ width }}
            transition={{ duration: 1, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
            style={{ height, background: color, borderRadius: 999 }}
        />
    );
}
