"use client";

import { useEffect, useRef } from "react";

const CODE_CHARS = "01{}[]();=><+-*/printf#include int main void return if else for while class def import".split("");

export default function CodeRainCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let cols: number[];

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            const fontSize = 14;
            const columns = Math.floor(canvas.width / fontSize);
            cols = Array.from({ length: columns }, () => Math.random() * canvas.height / fontSize);
        };

        resize();
        window.addEventListener("resize", resize);

        const draw = () => {
            const fontSize = 14;
            // 반투명 흰색으로 서서히 지우기
            ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            cols.forEach((y, i) => {
                const char = CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
                const x = i * fontSize;

                // 블루/시안 그라디언트 랜덤 선택
                const hue = 200 + Math.random() * 30; // 블루~시안 범위
                const alpha = 0.15 + Math.random() * 0.15;
                ctx.fillStyle = `hsla(${hue}, 80%, 55%, ${alpha})`;

                ctx.fillText(char, x, y * fontSize);

                // 일정 확률로 리셋
                if (y * fontSize > canvas.height && Math.random() > 0.975) {
                    cols[i] = 0;
                }
                cols[i] += 0.5; // 느린 속도
            });

            animationId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ opacity: 0.4 }}
            aria-hidden="true"
        />
    );
}
