"use client";

import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";

/* ── Sample Challenge Data ── */
const CHALLENGES = [
    {
        id: 1, status: "solved", number: 12, title: "행렬 나선형 순회",
        desc: "m x n 행렬이 주어졌을 때, 나선형 순서로 모든 요소를 반환하세요. 정사각형이 아닌 행렬의 엣지 케이스를 처리하세요.",
        tags: [{ icon: "grid_on", label: "배열" }],
        difficulty: "Medium", xp: 350,
    },
    {
        id: 2, status: "active", number: 13, title: "이진 트리 반전",
        desc: "이진 트리의 루트가 주어지면, 트리를 반전시키고 루트를 반환하세요. 재귀 효율성과 공간 복잡도 최적화에 집중하세요.",
        tags: [{ icon: "account_tree", label: "자료구조" }, { icon: "bolt", label: "Medium" }],
        difficulty: "Medium", xp: 500,
    },
    {
        id: 3, status: "hard", number: 14, title: "다이나믹 프로그래밍: 배낭 문제",
        desc: "다이나믹 프로그래밍을 사용하여 고전적인 0/1 배낭 문제를 풀어보세요. 메모이제이션을 활용한 대용량 데이터셋 최적화가 필요합니다.",
        tags: [{ icon: "functions", label: "알고리즘" }, { icon: "psychology", label: "Hard" }],
        difficulty: "Hard", xp: 1200,
    },
    {
        id: 4, status: "pending", number: 15, title: "그래프 컬러링",
        desc: "그래프를 최대 m개의 색으로 칠할 수 있는지 판별하세요. 인접한 두 정점이 같은 색을 갖지 않아야 합니다.",
        tags: [{ icon: "hub", label: "그래프 이론" }, { icon: "bolt", label: "Medium" }],
        difficulty: "Medium", xp: 800,
    },
    {
        id: 5, status: "pending", number: 16, title: "문자열 순열",
        desc: "주어진 문자열의 모든 순열을 출력하는 함수를 작성하세요. 중복 문자가 있는 문자열에서 중복 순열을 제거해야 합니다.",
        tags: [{ icon: "abc", label: "문자열" }, { icon: "emoji_objects", label: "Easy" }],
        difficulty: "Easy", xp: 300,
    },
    {
        id: 6, status: "pending", number: 17, title: "최소 신장 트리 (MST)",
        desc: "크루스칼 또는 프림 알고리즘을 구현하여 가중 그래프의 최소 신장 트리를 구하세요.",
        tags: [{ icon: "hub", label: "그래프" }, { icon: "psychology", label: "Hard" }],
        difficulty: "Hard", xp: 1000,
    },
    {
        id: 7, status: "pending", number: 18, title: "이진 탐색 최적화",
        desc: "정렬된 배열에서 특정 값의 첫 번째와 마지막 인덱스를 O(log n)으로 찾아보세요.",
        tags: [{ icon: "search", label: "탐색" }, { icon: "emoji_objects", label: "Easy" }],
        difficulty: "Easy", xp: 250,
    },
];

const statusConfig: Record<string, { badge: string; badgeBg: string; badgeColor: string; borderColor: string }> = {
    solved: { badge: "Solved", badgeBg: "#dcfce7", badgeColor: "#15803d", borderColor: "transparent" },
    active: { badge: "Active", badgeBg: "rgba(17,82,212,0.1)", badgeColor: "#1152d4", borderColor: "rgba(17,82,212,0.4)" },
    hard: { badge: "Hard", badgeBg: "#f3e8ff", badgeColor: "#7c3aed", borderColor: "rgba(124,58,237,0.3)" },
    pending: { badge: "Pending", badgeBg: "#f1f5f9", badgeColor: "#64748b", borderColor: "transparent" },
};

export default function ChallengesPage() {
    const { user } = useAuth();
    const solved = CHALLENGES.filter(c => c.status === "solved").length;
    const totalXP = CHALLENGES.reduce((s, c) => s + (c.status === "solved" ? c.xp : 0), 0);
    const maxXP = CHALLENGES.reduce((s, c) => s + c.xp, 0);

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 80px)", position: "relative" }}>
            {/* Ambient Background */}
            <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                <div style={{
                    position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw",
                    background: "rgba(17,82,212,0.04)", borderRadius: "50%", filter: "blur(120px)",
                    animation: "float 15s infinite ease-in-out",
                }} />
                <div style={{
                    position: "absolute", bottom: "-10%", right: "-10%", width: "40vw", height: "40vw",
                    background: "rgba(99,102,241,0.06)", borderRadius: "50%", filter: "blur(100px)",
                    animation: "float 15s infinite ease-in-out", animationDelay: "-5s",
                }} />
            </div>

            {/* Main Content */}
            <main style={{ flex: 1, overflowY: "auto", padding: "32px 0", paddingBottom: 140, position: "relative", zIndex: 10 }}>
                <div style={{ maxWidth: 900, margin: "0 auto" }}>
                    {/* Section Header */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
                        <div>
                            <h2 style={{ fontSize: 36, fontWeight: 900, letterSpacing: "-0.03em", color: "#0f172a", marginBottom: 8 }}>
                                챌린지 스트림
                            </h2>
                            <p style={{ color: "#64748b", fontWeight: 500, fontSize: 15 }}>
                                문제를 풀고 다음 티어를 잠금 해제하세요. 정확도가 핵심입니다.
                            </p>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                            <span style={{
                                padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 800,
                                background: "rgba(17,82,212,0.1)", color: "#1152d4", border: "1px solid rgba(17,82,212,0.2)",
                                textTransform: "uppercase", letterSpacing: "0.05em",
                            }}>
                                {CHALLENGES.length}개 문제
                            </span>
                            <span style={{
                                padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 800,
                                background: "#e2e8f0", color: "#475569", textTransform: "uppercase",
                            }}>
                                {maxXP.toLocaleString()} XP 총점
                            </span>
                        </div>
                    </div>

                    {/* Challenge Cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {CHALLENGES.map((ch) => {
                            const cfg = statusConfig[ch.status];
                            const isSolved = ch.status === "solved";
                            const isActive = ch.status === "active";
                            return (
                                <div key={ch.id} style={{
                                    position: "relative", padding: 28, borderRadius: 16,
                                    background: isSolved ? "rgba(248,250,252,0.5)" : "rgba(255,255,255,0.7)",
                                    backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
                                    border: `1px solid ${isActive ? cfg.borderColor : "rgba(255,255,255,0.6)"}`,
                                    boxShadow: isActive ? "0 4px 30px rgba(17,82,212,0.1)" : "0 4px 30px rgba(0,0,0,0.05)",
                                    opacity: isSolved ? 0.75 : 1, cursor: "pointer",
                                    transition: "all 0.3s", transform: "translateY(0)",
                                }}
                                    onMouseEnter={(e) => { if (!isSolved) { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(17,82,212,0.15)"; } }}
                                    onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = isActive ? "0 4px 30px rgba(17,82,212,0.1)" : "0 4px 30px rgba(0,0,0,0.05)"; }}
                                >
                                    {/* Active left bar */}
                                    {isActive && <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#1152d4", borderRadius: "16px 0 0 16px" }} />}
                                    {ch.status === "hard" && <div style={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", background: "#7c3aed", borderRadius: "16px 0 0 16px", opacity: 0 }} />}

                                    {/* Solved checkmark */}
                                    {isSolved && (
                                        <div style={{ position: "absolute", top: 16, right: 16, background: "#dcfce7", borderRadius: 99, padding: 4 }}>
                                            <span className="material-symbols-outlined" style={{ fontSize: 20, color: "#16a34a" }}>check_circle</span>
                                        </div>
                                    )}

                                    <div style={{ display: "flex", justifyContent: "space-between", gap: 24 }}>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                                <span style={{
                                                    padding: "3px 10px", borderRadius: 6, fontSize: 11, fontWeight: 800,
                                                    background: cfg.badgeBg, color: cfg.badgeColor,
                                                    textTransform: "uppercase", letterSpacing: "0.06em",
                                                }}>{cfg.badge}</span>
                                                <span style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>Problem #{ch.number}</span>
                                            </div>
                                            <h3 style={{ fontSize: 19, fontWeight: 800, color: isSolved ? "#475569" : "#0f172a", marginBottom: 8 }}>
                                                {ch.title}
                                            </h3>
                                            <p style={{ fontSize: 14, color: isSolved ? "#94a3b8" : "#64748b", lineHeight: 1.6, marginBottom: 14 }}>
                                                {ch.desc}
                                            </p>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                                                {ch.tags.map((tag, i) => (
                                                    <span key={i} style={{
                                                        display: "inline-flex", alignItems: "center", gap: 4,
                                                        padding: "4px 10px", borderRadius: 6,
                                                        background: "#f1f5f9", color: isSolved ? "#94a3b8" : "#64748b",
                                                        fontSize: 12, fontWeight: 500, border: "1px solid #e2e8f0",
                                                    }}>
                                                        <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{tag.icon}</span>
                                                        {tag.label}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", flexShrink: 0 }}>
                                            <div style={{ textAlign: "right", opacity: isSolved ? 0.5 : 1 }}>
                                                <span style={{ display: "block", fontSize: isSolved ? 20 : 26, fontWeight: 900, color: isSolved ? "#64748b" : "#0f172a" }}>
                                                    {ch.xp}
                                                </span>
                                                <span style={{ fontSize: 11, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                                                    XP Points
                                                </span>
                                            </div>
                                            {!isSolved && (
                                                <button style={{
                                                    width: 40, height: 40, borderRadius: 99, border: "none", cursor: "pointer",
                                                    background: isActive ? "#1152d4" : "#f1f5f9",
                                                    color: isActive ? "#fff" : "#94a3b8",
                                                    display: "flex", alignItems: "center", justifyContent: "center",
                                                    boxShadow: isActive ? "0 8px 20px rgba(17,82,212,0.3)" : "none",
                                                    transition: "all 0.2s",
                                                }}>
                                                    <span className="material-symbols-outlined">
                                                        {isActive ? "code" : ch.status === "hard" ? "lock_open" : "lock"}
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>

            {/* Sticky Command Bar */}
            <div style={{
                position: "fixed", bottom: 24, left: 0, width: "100%", zIndex: 50,
                display: "flex", justifyContent: "center", padding: "0 16px",
            }}>
                <div style={{
                    width: "100%", maxWidth: 900,
                    background: "rgba(255,255,255,0.8)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
                    border: "1px solid rgba(255,255,255,0.4)", boxShadow: "0 25px 50px rgba(0,0,0,0.12)",
                    borderRadius: 20, padding: "16px 24px",
                    display: "flex", alignItems: "center", gap: 32,
                }}>
                    {/* Progress */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, fontWeight: 800, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                            <span>진행률</span>
                            <span>{solved} / {CHALLENGES.length} 완료</span>
                        </div>
                        <div style={{ height: 8, width: "100%", background: "#e2e8f0", borderRadius: 99, overflow: "hidden" }}>
                            <div style={{
                                height: "100%", borderRadius: 99,
                                background: "linear-gradient(90deg, #1152d4, #6366f1)",
                                width: `${(solved / CHALLENGES.length) * 100}%`,
                                boxShadow: "0 0 10px rgba(17,82,212,0.5)",
                                transition: "width 0.5s",
                            }} />
                        </div>
                    </div>

                    {/* Score */}
                    <div style={{ borderLeft: "1px solid #e2e8f0", paddingLeft: 24 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.12em" }}>현재 점수</span>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                            <span style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", fontVariantNumeric: "tabular-nums" }}>
                                {totalXP.toLocaleString()}
                            </span>
                            <span style={{ fontSize: 12, fontWeight: 500, color: "#94a3b8" }}>/ {maxXP.toLocaleString()} XP</span>
                        </div>
                    </div>

                    {/* Action */}
                    <button style={{
                        position: "relative", overflow: "hidden", borderRadius: 16, border: "none", cursor: "pointer",
                        padding: "14px 32px", fontWeight: 800, fontSize: 15, letterSpacing: "0.03em",
                        background: "linear-gradient(135deg, #1152d4, #6366f1)",
                        color: "#fff", boxShadow: "0 8px 25px rgba(17,82,212,0.3)",
                        display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s",
                        flexShrink: 0,
                    }}>
                        모든 문제 보기
                        <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                    </button>
                </div>
            </div>

            {/* Animation keyframes */}
            <style>{`
                @keyframes float {
                    0% { transform: translate(0, 0) scale(1); }
                    50% { transform: translate(-20px, 20px) scale(1.1); }
                    100% { transform: translate(0, 0) scale(1); }
                }
            `}</style>
        </div>
    );
}
