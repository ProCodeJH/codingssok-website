"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

/* ═══════════════════════════════════════
   코드 골프 대회 — 최소 코드 챌린지
   /dashboard/learning/codegolf
   
   주어진 문제를 가장 짧은 코드로 풀기
   ═══════════════════════════════════════ */

interface GolfProblem {
    id: string;
    title: string;
    description: string;
    example: { input: string; output: string };
    difficulty: "easy" | "medium" | "hard";
    bestScore: number;       // current record (chars)
    bestPlayer: string;
    timeLimit: string;       // deadline
}

const PROBLEMS: GolfProblem[] = [
    {
        id: "g1", title: "숫자 뒤집기", difficulty: "easy",
        description: "정수 N을 입력받아 숫자를 뒤집어 출력하세요.",
        example: { input: "12345", output: "54321" },
        bestScore: 42, bestPlayer: "박지호", timeLimit: "3일 남음",
    },
    {
        id: "g2", title: "피보나치 n번째", difficulty: "medium",
        description: "n번째 피보나치 수를 출력하세요.",
        example: { input: "10", output: "55" },
        bestScore: 38, bestPlayer: "김민수", timeLimit: "5일 남음",
    },
    {
        id: "g3", title: "팰린드롬 체크", difficulty: "medium",
        description: "입력 문자열이 팰린드롬이면 YES, 아니면 NO를 출력하세요.",
        example: { input: "racecar", output: "YES" },
        bestScore: 55, bestPlayer: "이서연", timeLimit: "7일 남음",
    },
    {
        id: "g4", title: "소수 판별기", difficulty: "hard",
        description: "정수 N이 소수이면 1, 아니면 0을 출력하세요.",
        example: { input: "17", output: "1" },
        bestScore: 61, bestPlayer: "정하은", timeLimit: "10일 남음",
    },
];

const DIFF_STYLES: Record<string, { bg: string; color: string; label: string }> = {
    easy: { bg: "#ECFDF5", color: "#059669", label: "쉬움" },
    medium: { bg: "#FEF3C7", color: "#D97706", label: "보통" },
    hard: { bg: "#FEE2E2", color: "#DC2626", label: "어려움" },
};

// Leaderboard
const LEADERBOARD = [
    { rank: 1, name: "박지호", solved: 12, avgChars: 35, xp: 2100, badge: "" },
    { rank: 2, name: "김민수", solved: 10, avgChars: 42, xp: 1250, badge: "" },
    { rank: 3, name: "정하은", solved: 8, avgChars: 48, xp: 950, badge: "" },
    { rank: 4, name: "이서연", solved: 6, avgChars: 55, xp: 780, badge: "" },
    { rank: 5, name: "최수아", solved: 3, avgChars: 70, xp: 350, badge: "" },
];

export default function CodeGolfPage() {
    const [selectedProblem, setSelectedProblem] = useState<GolfProblem | null>(null);
    const [code, setCode] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        if (!code.trim()) return;
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    return (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "32px 20px" }}>
            {/* Header */}
            <div style={{ marginBottom: 24 }}>
                <Link href="/dashboard/learning" style={{ fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>← 대시보드</Link>
                <h1 style={{ fontSize: 26, fontWeight: 800, color: "#1e1b4b", marginTop: 8 }}>
                     코드 골프 대회
                </h1>
                <p style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
                    가장 짧은 코드로 문제를 풀어보세요! 글자 수가 적을수록 높은 점수!
                </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20, alignItems: "start" }}>
                {/* Left: Problems */}
                <div>
                    {/* Problem cards */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {PROBLEMS.map((problem, i) => {
                            const diff = DIFF_STYLES[problem.difficulty];
                            const isSelected = selectedProblem?.id === problem.id;
                            return (
                                <motion.div
                                    key={problem.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.08 }}
                                    onClick={() => { setSelectedProblem(problem); setCode(""); setSubmitted(false); }}
                                    style={{
                                        background: "#fff", borderRadius: 14, padding: "18px 20px",
                                        border: isSelected ? "2px solid #4F46E5" : "1px solid #e2e8f0",
                                        cursor: "pointer", transition: "all 0.2s",
                                    }}
                                >
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{
                                                padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                                                background: diff.bg, color: diff.color,
                                            }}>{diff.label}</span>
                                            <span style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b" }}>{problem.title}</span>
                                        </div>
                                        <span style={{ fontSize: 11, color: "#94a3b8" }}>{problem.timeLimit}</span>
                                    </div>
                                    <p style={{ fontSize: 12, color: "#64748b", marginBottom: 8, lineHeight: 1.5 }}>{problem.description}</p>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11 }}>
                                        <span style={{ color: "#059669", fontWeight: 700 }}> 최소 {problem.bestScore}자</span>
                                        <span style={{ color: "#94a3b8" }}>by {problem.bestPlayer}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Code editor (shown when problem selected) */}
                    <AnimatePresence>
                        {selectedProblem && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                style={{ marginTop: 16 }}
                            >
                                <div style={{
                                    background: "#0F172A", borderRadius: 14, overflow: "hidden",
                                }}>
                                    <div style={{
                                        padding: "10px 16px", borderBottom: "1px solid #1e293b",
                                        display: "flex", alignItems: "center", justifyContent: "space-between",
                                    }}>
                                        <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>
                                            코드 작성 — {selectedProblem.title}
                                        </span>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: code.length <= selectedProblem.bestScore ? "#34D399" : "#F59E0B" }}>
                                            {code.length}자 {code.length <= selectedProblem.bestScore ? " 신기록!" : ""}
                                        </span>
                                    </div>
                                    <div style={{ padding: "4px" }}>
                                        <textarea
                                            value={code}
                                            onChange={e => setCode(e.target.value)}
                                            placeholder={`// ${selectedProblem.title} - C 코드를 입력하세요\n#include <stdio.h>\nint main() {\n  \n}`}
                                            spellCheck={false}
                                            style={{
                                                width: "100%", minHeight: 160, padding: "12px",
                                                background: "transparent", border: "none", outline: "none",
                                                color: "#E2E8F0", fontSize: 13, fontFamily: "JetBrains Mono, monospace",
                                                resize: "vertical", lineHeight: 1.6, boxSizing: "border-box",
                                            }}
                                        />
                                    </div>
                                    <div style={{ padding: "8px 12px", display: "flex", gap: 8 }}>
                                        {/* Example */}
                                        <div style={{
                                            flex: 1, padding: "8px 12px", borderRadius: 8, background: "#1E293B",
                                            fontSize: 11, color: "#94a3b8", fontFamily: "JetBrains Mono, monospace",
                                        }}>
                                            <div>입력: <span style={{ color: "#93C5FD" }}>{selectedProblem.example.input}</span></div>
                                            <div>출력: <span style={{ color: "#34D399" }}>{selectedProblem.example.output}</span></div>
                                        </div>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={!code.trim()}
                                            style={{
                                                padding: "10px 20px", borderRadius: 10, border: "none",
                                                background: submitted ? "#059669" : code.trim() ? "#4F46E5" : "#334155",
                                                color: "#fff", fontWeight: 700, fontSize: 12,
                                                cursor: code.trim() ? "pointer" : "default",
                                            }}
                                        >
                                            {submitted ? "✓ 제출됨!" : " 제출"}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: Leaderboard */}
                <div style={{
                    background: "#fff", borderRadius: 16, padding: "20px",
                    border: "1px solid #e2e8f0", position: "sticky", top: 20,
                }}>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e1b4b", marginBottom: 16 }}>
                         리더보드
                    </h3>
                    {LEADERBOARD.map((player, i) => (
                        <div key={player.rank} style={{
                            display: "flex", alignItems: "center", gap: 10, padding: "10px 8px",
                            borderRadius: 10, marginBottom: 4,
                            background: i === 0 ? "#FFFBEB" : i === 1 ? "#F8FAFC" : "transparent",
                        }}>
                            <span style={{
                                width: 28, height: 28, borderRadius: 8, display: "flex",
                                alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800,
                                background: i < 3 ? ["#FEF3C7", "#F1F5F9", "#FEF3C7"][i] : "#f8fafc",
                                color: i < 3 ? ["#D97706", "#475569", "#B45309"][i] : "#94a3b8",
                            }}>
                                {player.badge || player.rank}
                            </span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 700, color: "#1e1b4b" }}>{player.name}</div>
                                <div style={{ fontSize: 10, color: "#94a3b8" }}>
                                    {player.solved}문제 · 평균 {player.avgChars}자
                                </div>
                            </div>
                            <span style={{ fontSize: 12, fontWeight: 700, color: "#F59E0B" }}>⭐ {player.xp}</span>
                        </div>
                    ))}

                    {/* XP Reward */}
                    <div style={{
                        marginTop: 16, padding: "12px", borderRadius: 10,
                        background: "linear-gradient(135deg, #EEF2FF, #F5F3FF)",
                        fontSize: 11, color: "#4F46E5", textAlign: "center", lineHeight: 1.6,
                    }}>
                         <strong>보상</strong><br />
                         500 XP ·  300 XP ·  200 XP
                    </div>
                </div>
            </div>
        </div>
    );
}
