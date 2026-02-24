"use client";
import { motion } from "framer-motion";
import { useStreak, getLastNDays } from "@/hooks/useStreak";

/* ═══════════════════════════════════════
   스트릭 위젯 — 대시보드 상단 배치
   🔥 연속일수 + 주간 히트맵 + 🧊 아이스
   ═══════════════════════════════════════ */

const DAYS_KO = ["일", "월", "화", "수", "목", "금", "토"];

export default function StreakWidget() {
    const { streak, checkIn, useIce, badge, isAtRisk } = useStreak();
    const last7 = getLastNDays(7);

    return (
        <div style={{
            background: "#fff", borderRadius: 16, padding: "20px 24px",
            border: "1px solid #e2e8f0",
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}>
            {/* Top row: fire + streak count + badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <motion.span
                    animate={streak.currentStreak > 0 ? { scale: [1, 1.2, 1] } : {}}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    style={{ fontSize: 32 }}
                >
                    {streak.currentStreak > 0 ? "🔥" : "💤"}
                </motion.span>
                <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 22, color: "#1e1b4b", letterSpacing: "-0.03em" }}>
                        {streak.currentStreak}일 연속
                    </div>
                    <div style={{ fontSize: 11, color: "#94a3b8" }}>
                        최장 {streak.longestStreak}일 · 총 {streak.totalDays}일
                    </div>
                </div>
                {badge && (
                    <div style={{
                        padding: "4px 10px", borderRadius: 12,
                        background: badge.color + "20", fontSize: 12, fontWeight: 700,
                        color: badge.color,
                    }}>
                        {badge.emoji} {badge.label}
                    </div>
                )}
            </div>

            {/* Weekly heatmap */}
            <div style={{
                display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 16,
            }}>
                {last7.map(date => {
                    const isActive = streak.activeDates.includes(date);
                    const isFrozen = streak.frozenDates.includes(date);
                    const dayIdx = new Date(date).getDay();
                    return (
                        <div key={date} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 10, color: "#94a3b8", marginBottom: 4, fontWeight: 600 }}>
                                {DAYS_KO[dayIdx]}
                            </div>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                style={{
                                    width: "100%", aspectRatio: "1", borderRadius: 8,
                                    background: isActive ? "linear-gradient(135deg, #4F46E5, #6366F1)"
                                        : isFrozen ? "linear-gradient(135deg, #67E8F9, #22D3EE)"
                                            : "#f1f5f9",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 14,
                                }}
                            >
                                {isActive ? "✓" : isFrozen ? "🧊" : ""}
                            </motion.div>
                        </div>
                    );
                })}
            </div>

            {/* At risk warning + ice */}
            {isAtRisk && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: "#FEF3C7", borderRadius: 10, padding: "10px 14px",
                        display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
                    }}
                >
                    <span style={{ fontSize: 18 }}>⚠️</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "#92400E" }}>스트릭 위험!</div>
                        <div style={{ fontSize: 11, color: "#B45309" }}>오늘 학습하지 않으면 스트릭이 초기화됩니다.</div>
                    </div>
                    {streak.iceItems > 0 && (
                        <button
                            onClick={useIce}
                            style={{
                                padding: "6px 12px", borderRadius: 8, border: "none",
                                background: "linear-gradient(135deg, #67E8F9, #22D3EE)",
                                color: "#0E7490", fontWeight: 700, fontSize: 11, cursor: "pointer",
                                whiteSpace: "nowrap",
                            }}
                        >
                            🧊 사용 ({streak.iceItems})
                        </button>
                    )}
                </motion.div>
            )}

            {/* Ice inventory */}
            <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "8px 12px", borderRadius: 10, background: "#f8fafc",
            }}>
                <span style={{ fontSize: 16 }}>🧊</span>
                <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>
                    아이스 보유: {streak.iceItems}개
                </span>
                <span style={{ fontSize: 10, color: "#94a3b8", marginLeft: "auto" }}>
                    500 XP로 구매 가능
                </span>
            </div>
        </div>
    );
}
