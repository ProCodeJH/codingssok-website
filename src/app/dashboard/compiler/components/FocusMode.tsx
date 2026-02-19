"use client";
import { useState, useEffect, useCallback, useMemo } from "react";

const QUOTES = [
    { text: "코드는 시를 쓰는 것과 같다. 한 줄 한 줄에 의미를 담아라.", author: "Robert C. Martin" },
    { text: "프로그래밍은 생각하는 방법을 배우는 것이다.", author: "Steve Jobs" },
    { text: "완벽함이란 더 이상 추가할 것이 없을 때가 아니라, 더 이상 뺄 것이 없을 때 달성된다.", author: "Antoine de Saint-Exupéry" },
    { text: "먼저 문제를 풀고, 그 다음에 코드를 작성하라.", author: "John Johnson" },
    { text: "가장 좋은 에러 메시지는 절대 나타나지 않는 것이다.", author: "Thomas Fuchs" },
    { text: "단순함은 궁극의 정교함이다.", author: "Leonardo da Vinci" },
    { text: "코드를 작성하는 것은 쉽지만, 읽기 쉬운 코드를 작성하는 것은 어렵다.", author: "Anonymous" },
];

const AMBIENTS = [
    { id: "night", name: "밤하늘", emoji: "🌙", bg: "radial-gradient(ellipse at 50% 0%, rgba(30,30,80,0.8), rgba(10,10,30,0.95))" },
    { id: "forest", name: "숲", emoji: "🌲", bg: "radial-gradient(ellipse at 50% 100%, rgba(15,40,20,0.8), rgba(5,20,10,0.95))" },
    { id: "ocean", name: "바다", emoji: "🌊", bg: "radial-gradient(ellipse at 50% 50%, rgba(10,30,60,0.8), rgba(5,15,35,0.95))" },
    { id: "rain", name: "비", emoji: "🌧️", bg: "radial-gradient(ellipse at 50% 50%, rgba(15,20,30,0.8), rgba(8,12,20,0.95))" },
];

const PRESETS = [
    { label: "25분", value: 25 * 60 },
    { label: "30분", value: 30 * 60 },
    { label: "45분", value: 45 * 60 },
    { label: "60분", value: 60 * 60 },
];

interface FocusModeProps { isActive: boolean; onClose: () => void }

export function FocusMode({ isActive, onClose }: FocusModeProps) {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [timerRunning, setTimerRunning] = useState(false);
    const [ambient, setAmbient] = useState(AMBIENTS[0]);
    const [sessions, setSessions] = useState(0);

    const quote = useMemo(() => QUOTES[Math.floor(Math.random() * QUOTES.length)], [isActive]);

    useEffect(() => {
        if (!isActive) return;
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [isActive, onClose]);

    useEffect(() => {
        if (!timerRunning || timeLeft <= 0) {
            if (timeLeft <= 0 && timerRunning) { setTimerRunning(false); setSessions(s => s + 1); }
            return;
        }
        const t = setInterval(() => setTimeLeft(v => v - 1), 1000);
        return () => clearInterval(t);
    }, [timerRunning, timeLeft]);

    const toggleTimer = useCallback(() => setTimerRunning(r => !r), []);
    const resetTimer = useCallback(() => { setTimerRunning(false); setTimeLeft(25 * 60); }, []);

    const formatTime = () => {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    if (!isActive) return null;

    const progress = 1 - timeLeft / (25 * 60);
    const circumference = 2 * Math.PI * 120;

    return (
        <div style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: ambient.bg,
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            backdropFilter: "blur(20px)",
        }}>
            {/* Close button */}
            <button onClick={onClose} style={{
                position: "absolute", top: 20, right: 20, width: 36, height: 36, borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)", color: "#fff",
                fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center"
            }}>✕</button>

            {/* Session counter */}
            <div style={{ position: "absolute", top: 20, left: 20, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
                🔥 세션: {sessions}
            </div>

            {/* Ambient selector */}
            <div style={{ position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8 }}>
                {AMBIENTS.map(a => (
                    <button key={a.id} onClick={() => setAmbient(a)} style={{
                        padding: "6px 12px", borderRadius: 20, border: `1px solid ${a.id === ambient.id ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.08)"}`,
                        background: a.id === ambient.id ? "rgba(255,255,255,0.1)" : "transparent",
                        color: "rgba(255,255,255,0.7)", fontSize: 12, cursor: "pointer"
                    }}>{a.emoji} {a.name}</button>
                ))}
            </div>

            {/* Timer ring */}
            <div style={{ position: "relative", marginBottom: 32 }}>
                <svg width={260} height={260} style={{ transform: "rotate(-90deg)" }}>
                    <circle cx={130} cy={130} r={120} stroke="rgba(255,255,255,0.05)" strokeWidth={4} fill="none" />
                    <circle cx={130} cy={130} r={120} stroke={timeLeft <= 0 ? "#22c55e" : "#EC5212"} strokeWidth={4} fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - progress)}
                        style={{ transition: "stroke-dashoffset 1s linear" }}
                    />
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ fontSize: 56, fontWeight: 300, color: "#fff", fontVariantNumeric: "tabular-nums", letterSpacing: "0.1em" }}>{formatTime()}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{timerRunning ? "집중 중..." : timeLeft <= 0 ? "완료! 🎉" : "시작하세요"}</div>
                </div>
            </div>

            {/* Timer controls */}
            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                <button onClick={toggleTimer} style={{
                    padding: "12px 32px", borderRadius: 12, border: "none",
                    background: timerRunning ? "rgba(239,68,68,0.8)" : "rgba(236,82,18,0.8)",
                    color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer",
                    boxShadow: `0 8px 30px ${timerRunning ? "rgba(239,68,68,0.3)" : "rgba(236,82,18,0.3)"}`,
                }}>{timerRunning ? "⏸ 일시정지" : "▶ 시작"}</button>
                <button onClick={resetTimer} style={{
                    padding: "12px 20px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.6)", fontSize: 15, cursor: "pointer"
                }}>🔄</button>
            </div>

            {/* Presets */}
            <div style={{ display: "flex", gap: 8, marginBottom: 40 }}>
                {PRESETS.map(p => (
                    <button key={p.value} onClick={() => { setTimeLeft(p.value); setTimerRunning(false); }} style={{
                        padding: "6px 14px", borderRadius: 16, border: "1px solid rgba(255,255,255,0.08)",
                        background: timeLeft === p.value ? "rgba(255,255,255,0.1)" : "transparent",
                        color: "rgba(255,255,255,0.5)", fontSize: 12, cursor: "pointer"
                    }}>{p.label}</button>
                ))}
            </div>

            {/* Quote */}
            <div style={{ maxWidth: 500, textAlign: "center", padding: "0 20px" }}>
                <div style={{ fontSize: 15, color: "rgba(255,255,255,0.5)", fontStyle: "italic", lineHeight: 1.8 }}>"{quote.text}"</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", marginTop: 8 }}>— {quote.author}</div>
            </div>

            {/* ESC hint */}
            <div style={{ position: "absolute", bottom: 20, fontSize: 11, color: "rgba(255,255,255,0.15)" }}>ESC로 나가기</div>
        </div>
    );
}
