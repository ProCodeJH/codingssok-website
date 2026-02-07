"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface MouseContextType {
    x: number;
    y: number;
    progressX: number;
    progressY: number;
}

const MouseContext = createContext<MouseContextType>({ x: 0, y: 0, progressX: 0.5, progressY: 0.5 });

export function useMousePosition() {
    return useContext(MouseContext);
}

export default function MouseTracker({ children }: { children: ReactNode }) {
    const [mouse, setMouse] = useState<MouseContextType>({ x: 0, y: 0, progressX: 0.5, progressY: 0.5 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            setMouse({
                x: clientX,
                y: clientY,
                progressX: clientX / innerWidth,
                progressY: clientY / innerHeight,
            });
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <MouseContext.Provider value={mouse}>
            <div
                style={{
                    // @ts-expect-error CSS custom properties
                    "--mouse-x": `${mouse.x}px`,
                    "--mouse-y": `${mouse.y}px`,
                    "--mouse-progress-x": mouse.progressX,
                    "--mouse-progress-y": mouse.progressY,
                }}
            >
                {children}
            </div>
        </MouseContext.Provider>
    );
}
