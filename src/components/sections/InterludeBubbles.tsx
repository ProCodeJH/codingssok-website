"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ── 9 bubbles matching nodcoding ── */
const BUBBLE_COUNT = 9;

export default function InterludeBubbles() {
    const outerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [outerW, setOuterW] = useState(1952);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!outerRef.current) return;
        const rect = outerRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    }, []);

    useEffect(() => {
        const el = outerRef.current;
        if (!el) return;
        el.addEventListener("mousemove", handleMouseMove);

        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setOuterW(entry.contentRect.width);
            }
        });
        ro.observe(el);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            ro.disconnect();
        };
    }, [handleMouseMove]);

    /* ── SVG geometry — reverse-engineered from nodcoding ──
     * SVG width = container width
     * Dots: center ± 392px (verified across 1952px and 6960px viewports)
     * Q control points: 40% of distance from edge to dot
     */
    const svgW = outerW;
    const centerX = svgW / 2;
    const dotOffset = 392;
    const dotLeft = centerX - dotOffset;
    const dotRight = centerX + dotOffset;
    const qLeft = dotLeft * 0.4;
    const qRight = svgW - (svgW - dotRight) * 0.4;
    const r = 6;

    const pathD = [
        `M 0 3`,
        `Q ${qLeft} 3 ${dotLeft} 3`,
        `m 0 0 a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 -${r * 2} 0`,
        `M ${svgW} 3`,
        `Q ${qRight} 3 ${dotRight} 3`,
        `m -${r * 2} 0 a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 -${r * 2} 0`,
    ].join(" ");

    /* ── Per-bubble mouse offset (tiny parallax like nodcoding) ── */
    const speeds = [0.5, 0.65, 0.8, 0.52, 0.68, 0.9, 0.55, 0.72, 0.95];

    const bubbles = Array.from({ length: BUBBLE_COUNT }, (_, i) => {
        const factor = speeds[i] * 0.000005;
        return {
            x: -(mousePos.x * factor),
            y: -(mousePos.y * factor),
        };
    });

    return (
        <div
            className="s-interlude s-interlude--bubbles"
            data-plr-component="s-interlude"
        >
            <div
                ref={outerRef}
                className="b-interlude-bubbles"
                data-plr-component="b-interlude-bubbles"
            >
                <div className="b__inner">
                    {/* Bubbles — mouse-reactive */}
                    <div className="b__bubbles js-bubbles">
                        {bubbles.map((off, i) => (
                            <div
                                key={i}
                                className="b__bubble js-bubble"
                                style={
                                    {
                                        "--x": `${off.x}px`,
                                        "--y": `${off.y}px`,
                                    } as React.CSSProperties
                                }
                            >
                                <div className="b__circle" />
                            </div>
                        ))}
                    </div>

                    {/* SVG line with two dots — white fill */}
                    <svg
                        width="1920"
                        height="980"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="b__render js-render"
                        overflow="visible"
                        preserveAspectRatio="none"
                        style={{
                            width: `${svgW}px`,
                            height: "6px",
                        }}
                    >
                        <path
                            d={pathD}
                            fill="#fff"
                            className="js-render-path"
                        />
                    </svg>

                    <div className="b__ruler js-ruler" />
                </div>
            </div>
        </div>
    );
}
