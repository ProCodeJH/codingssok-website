"use client";
import { useEffect, useState } from "react";

interface LevelUpModalProps {
    level: number;
    onClose: () => void;
}

export default function LevelUpModal({ level, onClose }: LevelUpModalProps) {
    const [show, setShow] = useState(false);
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number; delay: number }[]>([]);

    useEffect(() => {
        setTimeout(() => setShow(true), 50);
        // 파티클 생성
        const p = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            color: ['#fbbf24', '#f59e0b', '#6366f1', '#ec4899', '#10b981', '#0ea5e9', '#f43f5e'][Math.floor(Math.random() * 7)],
            size: Math.random() * 8 + 4,
            delay: Math.random() * 0.5,
        }));
        setParticles(p);
        const timer = setTimeout(onClose, 4000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <>
            <style>{`
                @keyframes lvlup-burst {
                    0% { transform: scale(0) rotate(0deg); opacity: 1; }
                    50% { opacity: 1; }
                    100% { transform: scale(1) rotate(180deg); opacity: 0; }
                }
                @keyframes lvlup-float {
                    0% { transform: translateY(0px) scale(1); opacity: 1; }
                    100% { transform: translateY(-200px) scale(0.3); opacity: 0; }
                }
                @keyframes lvlup-glow {
                    0%, 100% { text-shadow: 0 0 20px rgba(251,191,36,0.5), 0 0 60px rgba(251,191,36,0.3); }
                    50% { text-shadow: 0 0 40px rgba(251,191,36,0.8), 0 0 120px rgba(251,191,36,0.5), 0 0 200px rgba(99,102,241,0.3); }
                }
                @keyframes lvlup-number {
                    0% { transform: scale(0.3) rotateY(90deg); opacity: 0; }
                    60% { transform: scale(1.3) rotateY(-10deg); }
                    80% { transform: scale(0.95) rotateY(5deg); }
                    100% { transform: scale(1) rotateY(0deg); opacity: 1; }
                }
                @keyframes lvlup-ring {
                    0% { transform: scale(0.5); opacity: 1; border-width: 8px; }
                    100% { transform: scale(2.5); opacity: 0; border-width: 1px; }
                }
                @keyframes lvlup-shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px) rotate(-2deg); }
                    75% { transform: translateX(5px) rotate(2deg); }
                }
            `}</style>
            <div
                onClick={onClose}
                style={{
                    position: "fixed", inset: 0, zIndex: 99999,
                    background: show ? "rgba(0,0,0,0.7)" : "rgba(0,0,0,0)",
                    backdropFilter: show ? "blur(8px)" : "blur(0)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.5s ease",
                    cursor: "pointer",
                }}
            >
                {/* 파티클 */}
                {particles.map(p => (
                    <div key={p.id} style={{
                        position: "absolute",
                        left: `${p.x}%`, top: `${p.y}%`,
                        width: p.size, height: p.size,
                        borderRadius: p.size > 8 ? "2px" : "50%",
                        background: p.color,
                        animation: `lvlup-float 2s ${p.delay}s ease-out forwards`,
                    }} />
                ))}

                {/* 확장 링 */}
                {[0, 0.3, 0.6].map((d, i) => (
                    <div key={i} style={{
                        position: "absolute",
                        width: 120, height: 120,
                        borderRadius: "50%",
                        border: "4px solid rgba(251,191,36,0.6)",
                        animation: `lvlup-ring 1.5s ${d}s ease-out forwards`,
                    }} />
                ))}

                {/* 메인 콘텐츠 */}
                <div style={{
                    textAlign: "center",
                    animation: show ? "lvlup-shake 0.5s ease-in-out" : "none",
                }}>
                    <div style={{
                        fontSize: 48, marginBottom: 8,
                        animation: "lvlup-burst 1s ease-out",
                        display: "flex", alignItems: "center", justifyContent: "center",
                    }}><svg width="48" height="48" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 16.8l-6.2 4.5 2.4-7.4L2 9.4h7.6L12 2z" stroke="#fbbf24" strokeWidth="1.5" fill="#fbbf24" fillOpacity="0.3" /><circle cx="5" cy="5" r="1" fill="#f59e0b" /><circle cx="19" cy="4" r="1.5" fill="#ec4899" /><circle cx="20" cy="18" r="1" fill="#6366f1" /><circle cx="3" cy="17" r="1.5" fill="#10b981" /></svg></div>

                    <div style={{
                        fontSize: 16, fontWeight: 800, color: "#fbbf24",
                        letterSpacing: 6, textTransform: "uppercase",
                        marginBottom: 8,
                    }}>
                        LEVEL UP!
                    </div>

                    <div style={{
                        fontSize: 80, fontWeight: 900,
                        background: "linear-gradient(135deg, #fbbf24, #f59e0b, #6366f1)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        animation: "lvlup-number 0.8s 0.2s cubic-bezier(0.34,1.56,0.64,1) both, lvlup-glow 2s 1s ease-in-out infinite",
                        lineHeight: 1,
                    }}>
                        Lv.{level}
                    </div>

                    <p style={{
                        fontSize: 14, color: "rgba(255,255,255,0.7)",
                        marginTop: 16, fontWeight: 500,
                    }}>
                        축하합니다! 새로운 레벨에 도달했어요
                    </p>
                    <p style={{
                        fontSize: 11, color: "rgba(255,255,255,0.4)",
                        marginTop: 8,
                    }}>
                        아무 곳이나 클릭하면 닫힙니다
                    </p>
                </div>
            </div>
        </>
    );
}
