"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ── Bubble positions (relative %, pre-randomized) ── */
const BUBBLES = [
    { x: 8, y: 20, size: 80, speed: 0.6 },
    { x: 18, y: 55, size: 60, speed: 0.8 },
    { x: 30, y: 35, size: 100, speed: 0.5 },
    { x: 42, y: 70, size: 50, speed: 0.9 },
    { x: 55, y: 25, size: 90, speed: 0.7 },
    { x: 65, y: 60, size: 70, speed: 0.4 },
    { x: 75, y: 40, size: 85, speed: 0.65 },
    { x: 85, y: 15, size: 55, speed: 0.85 },
    { x: 92, y: 50, size: 75, speed: 0.55 },
];

export default function InterludeBubbles() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [svgWidth, setSvgWidth] = useState(1920);

    /* ── Mouse tracking ── */
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        el.addEventListener("mousemove", handleMouseMove);

        // Set SVG width to container width
        const resizeObs = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setSvgWidth(entry.contentRect.width);
            }
        });
        resizeObs.observe(el);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            resizeObs.disconnect();
        };
    }, [handleMouseMove]);

    /* ── SVG path with two dots ── */
    const midX = svgWidth / 2;
    const dotRadius = 6;
    const pathD = `
    M 0 3
    Q ${midX * 0.65} 3 ${midX * 0.89} 3
    m 0 0 a ${dotRadius} ${dotRadius} 0 1 0 ${dotRadius * 2} 0
    a ${dotRadius} ${dotRadius} 0 1 0 -${dotRadius * 2} 0
    M ${svgWidth} 3
    Q ${midX * 1.35} 3 ${midX * 1.11} 3
    m -${dotRadius * 2} 0 a ${dotRadius} ${dotRadius} 0 1 0 ${dotRadius * 2} 0
    a ${dotRadius} ${dotRadius} 0 1 0 -${dotRadius * 2} 0
  `.trim();

    return (
        <div
            className="s-interlude s-interlude--bubbles"
            data-plr-component="s-interlude"
        >
            <div
                ref={containerRef}
                className="b-interlude-bubbles"
                data-plr-component="b-interlude-bubbles"
                style={
                    {
                        "--mouse-x": mousePos.x,
                        "--mouse-y": mousePos.y,
                    } as React.CSSProperties
                }
            >
                <div className="b__inner">
                    {/* Bubbles */}
                    <div className="b__bubbles js-bubbles">
                        {BUBBLES.map((bubble, i) => (
                            <div
                                key={i}
                                className="b__bubble js-bubble"
                                style={
                                    {
                                        "--bx": `${bubble.x}%`,
                                        "--by": `${bubble.y}%`,
                                        "--bsize": `${bubble.size}px`,
                                        "--bspeed": bubble.speed,
                                    } as React.CSSProperties
                                }
                            >
                                <div className="b__circle" />
                            </div>
                        ))}
                    </div>

                    {/* Continuous SVG line with dots */}
                    <svg
                        width={svgWidth}
                        height="6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="b__render js-render"
                        overflow="visible"
                        preserveAspectRatio="none"
                    >
                        <path
                            d={pathD}
                            fill="var(--color-grey-2, #D6D6D6)"
                            className="js-render-path"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
