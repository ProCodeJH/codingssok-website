"use client";

import { useState, useEffect, useMemo } from "react";

/* ═══════════════════════════════════════════════════
   도전과제 시스템 — C-Studio Achievements.tsx 포팅
   컴파일수/줄수/챌린지 기반 도전과제 + XP 보상
   ═══════════════════════════════════════════════════ */

interface Achievement {
    id: string; emoji: string; name: string; description: string;
    rarity: "common" | "rare" | "epic" | "legendary";
    progress: number; maxProgress: number; xp: number;
    unlockedAt?: Date;
}

interface AchievementsProps {
    onClose: () => void;
    stats: { compileCount: number; totalLines: number; challengesCompleted: number; focusSessions: number; };
}

const RARITY = {
    common: { label: "일반", color: "#9ca3af", bg: "rgba(156,163,175,0.1)", border: "rgba(156,163,175,0.2)" },
    rare: { label: "희귀", color: "#3b82f6", bg: "rgba(59,130,246,0.1)", border: "rgba(59,130,246,0.2)" },
    epic: { label: "영웅", color: "#a855f7", bg: "rgba(168,85,247,0.1)", border: "rgba(168,85,247,0.2)" },
    legendary: { label: "전설", color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.2)" },
};

const ACHIEVEMENT_DEFS = [
    { id: "1", emoji: "◎", name: "첫 번째 컴파일", description: "처음으로 코드를 컴파일했습니다", rarity: "common" as const, maxProgress: 1, xp: 50, statKey: "compileCount" },
    { id: "2", emoji: "", name: "100줄 작성", description: "총 100줄의 코드를 작성했습니다", rarity: "common" as const, maxProgress: 100, xp: 100, statKey: "totalLines" },
    { id: "3", emoji: "", name: "컴파일 10회", description: "10번 컴파일을 달성했습니다", rarity: "rare" as const, maxProgress: 10, xp: 200, statKey: "compileCount" },
    { id: "4", emoji: "", name: "500줄 작성", description: "총 500줄의 코드를 작성했습니다", rarity: "rare" as const, maxProgress: 500, xp: 300, statKey: "totalLines" },
    { id: "5", emoji: "⭐", name: "챌린지 5개 완료", description: "5개의 챌린지를 완료했습니다", rarity: "epic" as const, maxProgress: 5, xp: 500, statKey: "challengesCompleted" },
    { id: "6", emoji: "", name: "집중 세션 3회", description: "집중 모드를 3회 완료했습니다", rarity: "epic" as const, maxProgress: 3, xp: 400, statKey: "focusSessions" },
    { id: "7", emoji: "", name: "마스터 프로그래머", description: "모든 챌린지 20개를 완료했습니다", rarity: "legendary" as const, maxProgress: 20, xp: 1000, statKey: "challengesCompleted" },
    { id: "8", emoji: "", name: "컴파일 100회", description: "100번 컴파일을 달성했습니다", rarity: "legendary" as const, maxProgress: 100, xp: 2000, statKey: "compileCount" },
];

export default function Achievements({ onClose, stats }: AchievementsProps) {
    const [filter, setFilter] = useState<string>("all");

    const achievements: Achievement[] = useMemo(() =>
        ACHIEVEMENT_DEFS.map(def => {
            const progress = Math.min(stats[def.statKey as keyof typeof stats] || 0, def.maxProgress);
            return { ...def, progress, unlockedAt: progress >= def.maxProgress ? new Date() : undefined };
        }), [stats]
    );

    const filtered = filter === "all" ? achievements
        : filter === "unlocked" ? achievements.filter(a => a.unlockedAt)
            : filter === "locked" ? achievements.filter(a => !a.unlockedAt)
                : achievements.filter(a => a.rarity === filter);

    const unlockedCount = achievements.filter(a => a.unlockedAt).length;
    const totalXp = achievements.filter(a => a.unlockedAt).reduce((s, a) => s + a.xp, 0);

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#1e1c1a", color: "#f5f0e8" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #3a3632", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 800 }}> 도전과제</span>
                <button onClick={onClose} style={{ background: "none", border: "none", color: "#b0a898", fontSize: 16, cursor: "pointer" }}>✕</button>
            </div>

            {/* Summary */}
            <div style={{ padding: "12px 16px", display: "flex", gap: 8 }}>
                <div style={{ flex: 1, background: "#252320", borderRadius: 10, padding: "10px 14px", textAlign: "center", border: "1px solid #3a3632" }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#22c55e" }}>{unlockedCount}</div>
                    <div style={{ fontSize: 10, color: "#b0a898" }}>달성</div>
                </div>
                <div style={{ flex: 1, background: "#252320", borderRadius: 10, padding: "10px 14px", textAlign: "center", border: "1px solid #3a3632" }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#f59e0b" }}>{totalXp}</div>
                    <div style={{ fontSize: 10, color: "#b0a898" }}>XP</div>
                </div>
                <div style={{ flex: 1, background: "#252320", borderRadius: 10, padding: "10px 14px", textAlign: "center", border: "1px solid #3a3632" }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: "#818cf8" }}>{Math.round((unlockedCount / achievements.length) * 100)}%</div>
                    <div style={{ fontSize: 10, color: "#b0a898" }}>완료율</div>
                </div>
            </div>

            {/* Filters */}
            <div style={{ padding: "4px 12px 10px", display: "flex", gap: 4, flexWrap: "wrap" }}>
                {[{ k: "all", l: "전체" }, { k: "unlocked", l: "✓ 달성" }, { k: "locked", l: " 미달성" }].map(f => (
                    <button key={f.k} onClick={() => setFilter(f.k)} style={{
                        padding: "4px 10px", borderRadius: 12, border: "none", fontSize: 10, fontWeight: 600, cursor: "pointer",
                        background: filter === f.k ? "#EC5212" : "#2d2a26", color: filter === f.k ? "#fff" : "#b0a898",
                    }}>{f.l}</button>
                ))}
            </div>

            {/* Achievement List */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 16px" }}>
                {filtered.map(ach => {
                    const r = RARITY[ach.rarity];
                    const unlocked = !!ach.unlockedAt;
                    const pct = Math.round((ach.progress / ach.maxProgress) * 100);
                    return (
                        <div key={ach.id} style={{
                            marginBottom: 8, padding: "12px 14px", background: unlocked ? r.bg : "#252320",
                            borderRadius: 10, border: `1px solid ${unlocked ? r.border : "#3a3632"}`,
                            opacity: unlocked ? 1 : 0.7,
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <span style={{ fontSize: 24, filter: unlocked ? "none" : "grayscale(1)" }}>{ach.emoji}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <span style={{ fontSize: 13, fontWeight: 700 }}>{ach.name}</span>
                                        <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: r.bg, color: r.color, border: `1px solid ${r.border}` }}>{r.label}</span>
                                    </div>
                                    <div style={{ fontSize: 11, color: "#b0a898", marginTop: 2 }}>{ach.description}</div>
                                </div>
                                <div style={{ textAlign: "right", flexShrink: 0 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: "#FCAD00" }}>+{ach.xp} XP</div>
                                    {unlocked && <div style={{ fontSize: 9, color: "#22c55e", marginTop: 2 }}>✓ 달성</div>}
                                </div>
                            </div>
                            {/* Progress Bar */}
                            <div style={{ marginTop: 8 }}>
                                <div style={{ height: 5, background: "#1e1c1a", borderRadius: 99, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${pct}%`, background: unlocked ? r.color : "#4a4038", borderRadius: 99, transition: "width 0.5s" }} />
                                </div>
                                <div style={{ fontSize: 10, color: "#b0a898", marginTop: 3, textAlign: "right" }}>{ach.progress}/{ach.maxProgress}</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
