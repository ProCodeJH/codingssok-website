"use client";
import { useState, useMemo } from "react";

const STORAGE_KEY = "codingssok-coding-heatmap";
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
const DAYS = ["일", "월", "화", "수", "목", "금", "토"];

const getCodingData = (): Record<string, number> => {
    if (typeof window === "undefined") return {};
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"); } catch { return {}; }
};

export const recordCodingActivity = (lines: number = 1) => {
    if (typeof window === "undefined") return;
    const today = new Date().toISOString().split("T")[0];
    const data = getCodingData();
    data[today] = (data[today] || 0) + lines;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

interface Props { isOpen: boolean; onClose: () => void }

export function CodingHeatmap({ isOpen, onClose }: Props) {
    const [year, setYear] = useState(new Date().getFullYear());
    const codingData = useMemo(() => getCodingData(), [isOpen]);

    const weeks = useMemo(() => {
        const result: { date: string; count: number; day: number }[][] = [];
        const startDate = new Date(year, 0, 1);
        const startDay = startDate.getDay();
        let currentWeek: { date: string; count: number; day: number }[] = [];
        for (let d = 0; d < startDay; d++) currentWeek.push({ date: "", count: 0, day: d });
        const endDate = new Date(year, 11, 31);
        const current = new Date(startDate);
        while (current <= endDate) {
            const dateStr = current.toISOString().split("T")[0];
            currentWeek.push({ date: dateStr, count: codingData[dateStr] || 0, day: current.getDay() });
            if (current.getDay() === 6) { result.push(currentWeek); currentWeek = []; }
            current.setDate(current.getDate() + 1);
        }
        if (currentWeek.length > 0) result.push(currentWeek);
        return result;
    }, [year, codingData]);

    const stats = useMemo(() => {
        const yearData = Object.entries(codingData).filter(([d]) => d.startsWith(String(year)));
        const totalDays = yearData.filter(([, c]) => c > 0).length;
        const totalLines = yearData.reduce((s, [, c]) => s + c, 0);
        const maxDay = yearData.reduce((m, [, c]) => Math.max(m, c), 0);
        let longest = 0, cur = 0;
        const allDates = yearData.map(([d]) => d).sort();
        for (let i = 0; i < allDates.length; i++) {
            const dayDiff = i === 0 ? 1 : Math.round((new Date(allDates[i]).getTime() - new Date(allDates[i - 1]).getTime()) / 86400000);
            if (dayDiff === 1) { cur++; longest = Math.max(longest, cur); } else { cur = 1; }
        }
        return { totalDays, totalLines, maxDay, longestStreak: longest };
    }, [year, codingData]);

    const getColor = (count: number) => {
        if (count === 0) return "rgba(255,255,255,0.03)";
        if (count < 5) return "#2d6a2e";
        if (count < 15) return "#3da33e";
        if (count < 30) return "#57d458";
        return "#73f874";
    };

    if (!isOpen) return null;
    const border = "rgba(255,255,255,0.06)";

    return (
        <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 9998, background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)" }}>
            <div onClick={e => e.stopPropagation()} style={{ background: "#252320", borderRadius: 16, border: `1px solid ${border}`, maxWidth: 700, width: "90%", maxHeight: "80vh", overflow: "hidden" }}>
                {/* Header */}
                <div style={{ padding: "16px 20px", borderBottom: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>≡ 코딩 히트맵</span>
                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <button onClick={() => setYear(y => y - 1)} style={{ background: "transparent", border: `1px solid ${border}`, borderRadius: 4, color: "#ccc", cursor: "pointer", padding: "2px 8px" }}>◀</button>
                        <span style={{ fontSize: 13, fontWeight: 600, minWidth: 40, textAlign: "center" }}>{year}</span>
                        <button onClick={() => setYear(y => y + 1)} style={{ background: "transparent", border: `1px solid ${border}`, borderRadius: 4, color: "#ccc", cursor: "pointer", padding: "2px 8px" }}>▶</button>
                    </div>
                    <button onClick={onClose} style={{ background: "transparent", border: "none", color: "#888", fontSize: 16, cursor: "pointer" }}>✕</button>
                </div>

                {/* Stats */}
                <div style={{ display: "flex", padding: "12px 20px", gap: 16, borderBottom: `1px solid ${border}` }}>
                    {[["코딩 일수", stats.totalDays], ["총 라인 수", stats.totalLines.toLocaleString()], ["최장 연속일", stats.longestStreak], ["최다 일일", stats.maxDay]].map(([l, v]) => (
                        <div key={l as string} style={{ textAlign: "center" }}>
                            <div style={{ fontSize: 18, fontWeight: 700, color: "#73f874" }}>{v}</div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{l}</div>
                        </div>
                    ))}
                </div>

                {/* Grid */}
                <div style={{ padding: "16px 20px", overflowX: "auto" }}>
                    <div style={{ display: "flex", gap: 2 }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 2, marginRight: 4 }}>
                            {DAYS.map((d, i) => <span key={i} style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", height: 10, display: "flex", alignItems: "center" }}>{i % 2 === 1 ? d : ""}</span>)}
                        </div>
                        {weeks.map((week, wi) => (
                            <div key={wi} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                {week.map((day, di) => (
                                    <div key={di} title={day.date ? `${day.date}: ${day.count}줄` : ""} style={{ width: 10, height: 10, borderRadius: 2, background: day.date ? getColor(day.count) : "transparent" }} />
                                ))}
                            </div>
                        ))}
                    </div>
                    {/* Month labels */}
                    <div style={{ display: "flex", marginTop: 4, marginLeft: 16, gap: 0 }}>
                        {MONTHS.map((m, i) => <span key={i} style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", width: `${100 / 12}%` }}>{m}</span>)}
                    </div>
                </div>

                {/* Legend */}
                <div style={{ padding: "8px 20px 16px", display: "flex", alignItems: "center", gap: 4, justifyContent: "flex-end", fontSize: 9, color: "rgba(255,255,255,0.25)" }}>
                    <span>적게</span>
                    {[0, 1, 5, 15, 30].map(n => <div key={n} style={{ width: 10, height: 10, borderRadius: 2, background: getColor(n) }} />)}
                    <span>많이</span>
                </div>
            </div>
        </div>
    );
}
