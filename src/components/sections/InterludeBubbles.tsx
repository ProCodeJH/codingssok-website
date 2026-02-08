"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ── 9 bubbles matching nodcoding's layout ── */
const BUBBLES = [
    { size: 80, speed: 0.6 },
    { size: 60, speed: 0.8 },
    { size: 100, speed: 0.5 },
    { size: 50, speed: 0.9 },
    { size: 90, speed: 0.7 },
    { size: 70, speed: 0.4 },
    { size: 85, speed: 0.65 },
    { size: 55, speed: 0.85 },
    { size: 75, speed: 0.55 },
];

export default function InterludeBubbles() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [dims, setDims] = useState({ w: 1920, h: 980 });

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

        const ro = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setDims({
                    w: entry.contentRect.width,
                    h: entry.contentRect.height,
                });
            }
        });
        ro.observe(el);

        return () => {
            el.removeEventListener("mousemove", handleMouseMove);
            ro.disconnect();
        };
    }, [handleMouseMove]);

    /* ── SVG path matching nodcoding: line + two filled dots ── */
    const W = dims.w;
    const dotQ1 = W * 0.444; // ~3088/6960
    const dotQ2 = W * 0.556; // ~3872/6960
    const r = 6;

    const pathD = [
        `M 0 3`,
        `Q ${W * 0.178} 3 ${dotQ1} 3`,
        `m 0 0 a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 -${r * 2} 0`,
        `M ${W} 3`,
        `Q ${W * 0.822} 3 ${dotQ2} 3`,
        `m -${r * 2} 0 a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 -${r * 2} 0`,
    ].join(" ");

    /* ── Compute per-bubble mouse offset (tiny parallax) ── */
    const bubbleOffset = (speed: number) => {
        const factor = speed * 0.00001;
        return {
            x: -(mousePos.x * factor),
            y: mousePos.y * factor * 0.2,
        };
    };

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
                    {/* Wave decoration */}
                    <div
                        className="a-waves a-waves--white"
                        data-plr-component="a-waves"
                    />

                    {/* Bubbles — mouse-reactive */}
                    <div className="b__bubbles js-bubbles">
                        {BUBBLES.map((bubble, i) => {
                            const off = bubbleOffset(bubble.speed);
                            return (
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
                            );
                        })}
                    </div>

                    {/* SVG continuous line with two dots — white fill like nodcoding */}
                    <svg
                        width={W}
                        height="980"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="b__render js-render"
                        overflow="visible"
                        preserveAspectRatio="none"
                        style={{
                            width: `${W}px`,
                            height: "6px",
                        }}
                    >
                        <path d={pathD} fill="#fff" className="js-render-path" />
                    </svg>

                    <div className="b__ruler js-ruler" />
                </div>
            </div>
        </div>
    );
}
