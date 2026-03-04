"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════
   실시간 학생 모니터링 위젯
   WebSocket (시뮬레이션) 기반 라이브 피드
   선생님 관리 패널에 삽입 가능
   ═══════════════════════════════════════ */

interface LiveEvent {
    id: string;
    studentName: string;
    action: string;
    emoji: string;
    timestamp: number;
    color: string;
}

const ACTIONS = [
    { action: "유닛 완료", emoji: "✅", color: "#059669" },
    { action: "퀴즈 정답", emoji: "🎯", color: "#4F46E5" },
    { action: "퀴즈 오답", emoji: "❌", color: "#DC2626" },
    { action: "코드 실행", emoji: "▶️", color: "#0EA5E9" },
    { action: "로그인", emoji: "👋", color: "#F59E0B" },
    { action: "배지 획득", emoji: "🏅", color: "#8B5CF6" },
    { action: "스트릭 체크인", emoji: "🔥", color: "#EF4444" },
    { action: "레벨업!", emoji: "⬆️", color: "#6366F1" },
];

const NAMES = ["김민수", "이서연", "박지호", "최수아", "정하은"];

function generateEvent(): LiveEvent {
    const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
    const name = NAMES[Math.floor(Math.random() * NAMES.length)];
    return {
        id: Math.random().toString(36).slice(2),
        studentName: name,
        ...action,
        timestamp: Date.now(),
    };
}

export default function LiveMonitor() {
    const [events, setEvents] = useState<LiveEvent[]>([]);
    const [isLive, setIsLive] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isLive) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return;
        }

        // Generate initial events
        setEvents(Array.from({ length: 5 }, generateEvent));

        // Simulate live feed
        intervalRef.current = setInterval(() => {
            setEvents(prev => {
                const newEvent = generateEvent();
                return [newEvent, ...prev].slice(0, 20);
            });
        }, 3000 + Math.random() * 4000);

        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, [isLive]);

    const onlineCount = Math.floor(Math.random() * 3) + 2;

    return (
        <div style={{
            background: "#fff", borderRadius: 16, border: "1px solid #e2e8f0",
            overflow: "hidden", maxHeight: 500,
        }}>
            {/* Header */}
            <div style={{
                padding: "14px 20px", borderBottom: "1px solid #e2e8f0",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                background: "#f8fafc",
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <motion.div
                        animate={isLive ? { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        style={{ width: 8, height: 8, borderRadius: "50%", background: isLive ? "#EF4444" : "#94a3b8" }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "#1e1b4b" }}>실시간 모니터</span>
                    <span style={{ fontSize: 11, color: "#94a3b8" }}>· {onlineCount}명 접속 중</span>
                </div>
                <button
                    onClick={() => setIsLive(!isLive)}
                    style={{
                        padding: "4px 12px", borderRadius: 6, border: "1px solid #e2e8f0",
                        background: isLive ? "#FEF2F2" : "#ECFDF5", fontSize: 11, fontWeight: 600,
                        color: isLive ? "#DC2626" : "#059669", cursor: "pointer",
                    }}
                >
                    {isLive ? "⏸ 일시정지" : "▶️ 재개"}
                </button>
            </div>

            {/* Event feed */}
            <div style={{ padding: "8px 12px", overflowY: "auto", maxHeight: 400 }}>
                <AnimatePresence initial={false}>
                    {events.map(event => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, x: -20, height: 0 }}
                            animate={{ opacity: 1, x: 0, height: "auto" }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            style={{
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "8px 10px", borderRadius: 8,
                                marginBottom: 4,
                            }}
                        >
                            <span style={{ fontSize: 16 }}>{event.emoji}</span>
                            <div style={{ flex: 1 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: "#1e1b4b" }}>{event.studentName}</span>
                                <span style={{ fontSize: 12, color: "#94a3b8" }}> · {event.action}</span>
                            </div>
                            <span style={{ fontSize: 10, color: "#cbd5e1" }}>
                                {Math.floor((Date.now() - event.timestamp) / 1000)}초 전
                            </span>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
}
