"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * 코딩쏙 아카데미 — 프리미엄 티어 SVG 로고 컴포넌트
 * LoL 스타일의 고해상도 벡터 디자인 및 애니메이션 적용
 */

interface TierIconProps {
    tier: string;
    size?: number;
    showGlow?: boolean;
}

const TIER_DESIGNS: Record<string, {
    color: string;
    gradient: string[];
    glowColor: string;
    symbol: React.ReactNode;
    paths: string[];
}> = {
    Iron: {
        color: "#4b5563",
        gradient: ["#374151", "#4b5563", "#6b7280"],
        glowColor: "rgba(75, 85, 99, 0.4)",
        symbol: <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" strokeWidth="4" />,
        paths: ["M50 10 L85 25 L85 75 L50 90 L15 75 L15 25 Z"], // Octagon shield
    },
    Bronze: {
        color: "#b45309",
        gradient: ["#78350f", "#b45309", "#d97706"],
        glowColor: "rgba(180, 83, 9, 0.4)",
        symbol: <path d="M40 60 L50 40 L60 60 Z" fill="currentColor" />,
        paths: ["M20 30 C20 15 80 15 80 30 L80 70 C80 85 20 85 20 70 Z"], // Barrel-like shield
    },
    Silver: {
        color: "#64748b",
        gradient: ["#475569", "#64748b", "#94a3b8"],
        glowColor: "rgba(100, 116, 139, 0.4)",
        symbol: <rect x="38" y="38" width="24" height="24" transform="rotate(45 50 50)" fill="currentColor" />,
        paths: ["M50 12 L82 50 L50 88 L18 50 Z"], // Diamond frame
    },
    Gold: {
        color: "#ca8a04",
        gradient: ["#a16207", "#ca8a04", "#facc15"],
        glowColor: "rgba(202, 138, 4, 0.5)",
        symbol: <path d="M35 50 L45 60 L65 40" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />,
        paths: [
            "M50 10 L85 25 L80 75 L50 90 L20 75 L15 25 Z",
            "M30 15 Q50 5 70 15", // Crown-like top detail
        ],
    },
    Platinum: {
        color: "#0891b2",
        gradient: ["#164e63", "#0891b2", "#22d3ee"],
        glowColor: "rgba(8, 145, 178, 0.5)",
        symbol: <polygon points="50,30 70,70 30,70" fill="currentColor" />,
        paths: ["M50 15 L90 40 L75 85 L25 85 L10 40 Z"], // Pentagonal shield
    },
    Diamond: {
        color: "#2563eb",
        gradient: ["#1e3a8a", "#2563eb", "#60a5fa"],
        glowColor: "rgba(37, 99, 235, 0.6)",
        symbol: <path d="M50 30 L65 50 L50 70 L35 50 Z" fill="currentColor" />,
        paths: ["M50 10 L90 50 L50 90 L10 50 Z", "M50 20 L80 50 L50 80 L20 50 Z"], // Faceted diamond
    },
    Grandmaster: {
        color: "#7c3aed",
        gradient: ["#4c1d95", "#7c3aed", "#a78bfa"],
        glowColor: "rgba(124, 58, 237, 0.6)",
        symbol: <path d="M40 40 Q50 30 60 40 Q70 50 60 60 Q50 70 40 60 Q30 50 40 40" fill="currentColor" />,
        paths: ["M50 10 C80 10 90 40 90 60 C90 90 50 95 50 95 C50 95 10 90 10 60 C10 40 20 10 50 10 Z"], // Royal shield
    },
    Challenger: {
        color: "#dc2626",
        gradient: ["#7f1d1d", "#dc2626", "#f87171"],
        glowColor: "rgba(220, 38, 38, 0.7)",
        symbol: <path d="M30 40 L50 25 L70 40 L70 65 L50 80 L30 65 Z" fill="currentColor" />,
        paths: [
            "M15 40 L50 10 L85 40 L85 80 L50 95 L15 80 Z",
            "M35 15 L50 5 L65 15", // Pinnacle
        ],
    },
    Unranked: {
        color: "#64748b",
        gradient: ["#475569", "#64748b", "#94a3b8"],
        glowColor: "rgba(100, 116, 139, 0.3)",
        symbol: <text x="50" y="65" fontSize="40" fontWeight="900" textAnchor="middle" fill="currentColor">?</text>,
        paths: ["M50 15 A35 35 0 1 0 50 85 A35 35 0 1 0 50 15"], // Circular ring
    },
};

export const TierIcon: React.FC<TierIconProps> = ({ tier, size = 100, showGlow = true }) => {
    const design = TIER_DESIGNS[tier] || TIER_DESIGNS.Unranked;
    const id = `gradient-${tier}-${Math.random().toString(36).substr(2, 9)}`;

    return (
        <div style={{ width: size, height: size, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {showGlow && (
                <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    style={{
                        position: "absolute",
                        width: "80%",
                        height: "80%",
                        background: design.glowColor,
                        borderRadius: "50%",
                        filter: "blur(20px)",
                        zIndex: 0,
                    }}
                />
            )}

            <svg
                viewBox="0 0 100 100"
                style={{ width: "100%", height: "100%", position: "relative", zIndex: 1, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.2))" }}
            >
                <defs>
                    <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={design.gradient[0]} />
                        <stop offset="50%" stopColor={design.gradient[1]} />
                        <stop offset="100%" stopColor={design.gradient[2]} />
                    </linearGradient>
                    <filter id={`shimmer-${id}`}>
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur" />
                        <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1" specularExponent="20" lightingColor="#ffffff" result="specular">
                            <fePointLight x="-50" y="-100" z="200" />
                        </feSpecularLighting>
                        <feComposite in="specular" in2="SourceAlpha" operator="in" result="specular" />
                        <feComposite in="SourceGraphic" in2="specular" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" />
                    </filter>
                </defs>

                <motion.g
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                >
                    {/* Main Paths */}
                    {design.paths.map((path, i) => (
                        <path
                            key={i}
                            d={path}
                            fill={`url(#${id})`}
                            stroke="rgba(255,255,255,0.2)"
                            strokeWidth="1"
                            style={{ filter: `url(#shimmer-${id})` }}
                        />
                    ))}

                    {/* Inner Symbol */}
                    <g style={{ color: "rgba(255,255,255,0.9)", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))" }}>
                        {design.symbol}
                    </g>

                    {/* Light Reflections */}
                    <path
                        d={design.paths[0]}
                        fill="none"
                        stroke="white"
                        strokeWidth="0.5"
                        strokeDasharray="20 180"
                        opacity="0.5"
                    >
                        <animate
                            attributeName="stroke-dashoffset"
                            from="200"
                            to="0"
                            dur="3s"
                            repeatCount="indefinite"
                        />
                    </path>
                </motion.g>
            </svg>
        </div>
    );
};

export default TierIcon;
