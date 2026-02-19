"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";

/*
  C언어 온라인 컴파일러 — Coddy IDE Shell + 코딩쏙 브랜드
  - 다크 브라운 테마 (코딩쏙 일관)
  - Coddy 스타일 탭 바 + 파일명 + 실행 버튼
  - 줄번호 + 히스토리 사이드바
*/

const DEFAULT_CODE = `#include <stdio.h>

int main() {
    printf("Hello, 코딩쏙! 🌸\\n");
    
    // 변수 선언과 연산
    int a = 10;
    int b = 20;
    int sum = a + b;
    
    printf("%d + %d = %d\\n", a, b, sum);
    
    return 0;
}`;

interface Submission {
    id: string;
    code: string;
    output: string;
    status: string;
    created_at: string;
}

export default function CompilerPage() {
    const [code, setCode] = useState(DEFAULT_CODE);
    const [output, setOutput] = useState("");
    const [running, setRunning] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [history, setHistory] = useState<Submission[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [layout, setLayout] = useState<"split" | "stack">("split");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumberRef = useRef<HTMLDivElement>(null);

    const supabase = createClient();

    useEffect(() => {
        const check = () => setLayout(window.innerWidth < 768 ? "stack" : "split");
        check(); window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) { window.location.href = "/login"; return; }
            setUserId(data.user.id); setLoggedIn(true);
        });
    }, [supabase]);

    const fetchHistory = useCallback(async () => {
        if (!userId) return;
        try {
            const { data } = await supabase.from("code_submissions").select("*")
                .eq("user_id", userId).order("created_at", { ascending: false }).limit(20);
            setHistory(data || []);
        } catch (err) { console.error("히스토리 로드 실패:", err); }
    }, [userId, supabase]);

    useEffect(() => { if (userId) fetchHistory(); }, [userId, fetchHistory]);

    const runCode = useCallback(async () => {
        setRunning(true); setOutput("🔄 컴파일 중...");
        let resultOutput = ""; let resultStatus = "success";
        try {
            const response = await fetch("https://wandbox.org/api/compile.json", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, compiler: "gcc-head", options: "warning", "compiler-option-raw": "-std=c11" }),
            });
            const data = await response.json();
            if (data.compiler_error) { resultOutput = `❌ 컴파일 에러:\n${data.compiler_error}`; resultStatus = "compile_error"; }
            else if (data.program_error) { resultOutput = `⚠️ 런타임 에러:\n${data.program_error}`; resultStatus = "runtime_error"; }
            else { resultOutput = data.program_output || "(출력 없음)"; resultStatus = "success"; }
        } catch { resultOutput = "❌ 서버 연결 실패. 잠시 후 다시 시도해주세요."; resultStatus = "error"; }

        setOutput(resultOutput); setRunning(false);
        if (userId) {
            try {
                await supabase.from("code_submissions").insert({ user_id: userId, language: "c", code, output: resultOutput, status: resultStatus });
                fetchHistory();
            } catch (err) { console.error("제출 저장 실패:", err); }
        }
    }, [code, userId, supabase, fetchHistory]);

    const loadFromHistory = (sub: Submission) => { setCode(sub.code); setOutput(sub.output); setShowHistory(false); };

    const handleScroll = () => {
        if (textareaRef.current && lineNumberRef.current) {
            lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const lineCount = code.split("\n").length;

    if (!loggedIn) return null;

    // Theme — 코딩쏙 다크 브라운
    const bg1 = "#1e1c1a";  // deepest
    const bg2 = "#252320";  // panel
    const bg3 = "#2d2a26";  // elevated
    const border = "rgba(255,255,255,0.06)";
    const accent = "#EC5212";

    return (
        <div style={{ minHeight: "100vh", background: bg1, color: "#e0e0e0", display: "flex", flexDirection: "column" }}>
            {/* Header (Coddy IDE bar) */}
            <motion.header
                initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                style={{
                    height: 48, background: bg2, borderBottom: `1px solid ${border}`,
                    padding: "0 16px",
                    display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/dashboard" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ fontSize: 16 }}>🌸</span>
                        <span style={{ color: accent, fontSize: 13, fontWeight: 600 }}>← 대시보드</span>
                    </Link>
                    <div style={{ width: 1, height: 20, background: border }} />
                    <h1 style={{ fontSize: "clamp(13px, 2vw, 16px)", fontWeight: 700, color: "#fff" }}>💻 C언어 컴파일러</h1>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>Ctrl+Enter</span>
                    <button onClick={() => setShowHistory(!showHistory)} style={{
                        padding: "6px 10px", borderRadius: 8, border: `1px solid ${border}`,
                        background: showHistory ? bg3 : "transparent", color: "rgba(255,255,255,0.5)",
                        fontSize: 12, cursor: "pointer", fontWeight: 500, fontFamily: "inherit",
                    }}>
                        📜 기록 ({history.length})
                    </button>
                    <motion.button
                        onClick={runCode} disabled={running}
                        whileHover={running ? {} : { scale: 1.05 }}
                        whileTap={running ? {} : { scale: 0.95 }}
                        style={{
                            padding: "7px 18px", borderRadius: 8, border: "none",
                            background: running ? "#555" : accent, color: "#fff",
                            fontWeight: 700, fontSize: 13, cursor: running ? "not-allowed" : "pointer",
                            fontFamily: "inherit",
                            boxShadow: running ? "none" : `0 4px 16px ${accent}60`,
                        }}
                    >
                        {running ? "⏳ 실행 중..." : "▶ 실행"}
                    </motion.button>
                </div>
            </motion.header>

            <div style={{ flex: 1, display: "flex", position: "relative", flexDirection: layout === "stack" ? "column" : "row" }}>
                {/* History sidebar */}
                {showHistory && (
                    <motion.div
                        initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }}
                        style={{
                            width: layout === "stack" ? "100%" : 240, background: bg2,
                            borderRight: layout === "stack" ? "none" : `1px solid ${border}`,
                            borderBottom: layout === "stack" ? `1px solid ${border}` : "none",
                            overflowY: "auto", padding: 10, maxHeight: layout === "stack" ? 200 : "none",
                        }}
                    >
                        <h3 style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>제출 기록</h3>
                        {history.length === 0 ? (
                            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", textAlign: "center", padding: 16 }}>아직 제출 기록이 없어요</p>
                        ) : (
                            history.map((sub) => (
                                <button key={sub.id} onClick={() => loadFromHistory(sub)} style={{
                                    width: "100%", padding: "8px 10px", border: "none", borderRadius: 8,
                                    background: bg1, marginBottom: 4, cursor: "pointer", textAlign: "left",
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: sub.status === "success" ? "#77C6B3" : "#d32f2f", color: "#fff" }}>
                                            {sub.status === "success" ? "✓" : "✗"}
                                        </span>
                                        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>
                                            {new Date(sub.created_at).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                    </div>
                                    <pre style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                        {sub.code.substring(0, 50)}...
                                    </pre>
                                </button>
                            ))
                        )}
                    </motion.div>
                )}

                {/* Editor + Output */}
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: layout === "stack" ? "1fr" : "1fr 1fr", gridTemplateRows: layout === "stack" ? "1fr 1fr" : "1fr" }}>
                    {/* Editor with line numbers */}
                    <div style={{ display: "flex", flexDirection: "column", borderRight: layout === "stack" ? "none" : `1px solid ${border}`, borderBottom: layout === "stack" ? `1px solid ${border}` : "none" }}>
                        {/* File tab bar (Coddy style) */}
                        <div style={{
                            padding: "0 12px", background: bg2, fontSize: 12, color: "rgba(255,255,255,0.5)",
                            fontWeight: 600, borderBottom: `1px solid ${border}`,
                            display: "flex", alignItems: "center", height: 34, gap: 6,
                        }}>
                            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#f85149", display: "inline-block" }} />
                            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#d29922", display: "inline-block" }} />
                            <span style={{ width: 10, height: 10, borderRadius: 999, background: "#3fb950", display: "inline-block" }} />
                            <span style={{
                                marginLeft: 8, padding: "4px 12px", borderRadius: "6px 6px 0 0",
                                background: bg1, color: "#fff", fontSize: 12, fontWeight: 600,
                                borderTop: `2px solid ${accent}`,
                            }}>main.c</span>
                            <button
                                onClick={() => setCode(DEFAULT_CODE)}
                                style={{
                                    marginLeft: "auto", background: "none", border: "none",
                                    color: "rgba(255,255,255,0.25)", fontSize: 11, cursor: "pointer",
                                    fontFamily: "inherit",
                                }}
                            >↺ 리셋</button>
                        </div>
                        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
                            <div
                                ref={lineNumberRef}
                                style={{
                                    width: 44, background: bg2,
                                    padding: "14px 6px 14px 0", textAlign: "right",
                                    fontFamily: "'Fira Code', 'Consolas', monospace",
                                    fontSize: 13, lineHeight: "1.6", color: "rgba(255,255,255,0.2)",
                                    overflow: "hidden", userSelect: "none",
                                    borderRight: `1px solid ${border}`,
                                }}
                            >
                                {Array.from({ length: lineCount }, (_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                            <textarea
                                ref={textareaRef}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onScroll={handleScroll}
                                spellCheck={false}
                                style={{
                                    flex: 1, background: bg1, color: "#c9d1d9", border: "none",
                                    padding: "14px 16px 14px 12px",
                                    fontFamily: "'Fira Code', 'Consolas', monospace",
                                    fontSize: 13, lineHeight: 1.6, resize: "none", outline: "none", tabSize: 4,
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Tab") {
                                        e.preventDefault();
                                        const t = e.target as HTMLTextAreaElement;
                                        const s = t.selectionStart, end = t.selectionEnd;
                                        setCode(code.substring(0, s) + "    " + code.substring(end));
                                        setTimeout(() => { t.selectionStart = t.selectionEnd = s + 4; }, 0);
                                    }
                                    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") runCode();
                                }}
                            />
                        </div>
                    </div>

                    {/* Output (Coddy terminal style) */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{
                            padding: "0 12px", background: bg2, fontSize: 12, color: "rgba(255,255,255,0.5)",
                            fontWeight: 600, borderBottom: `1px solid ${border}`,
                            display: "flex", alignItems: "center", height: 34, gap: 6,
                        }}>
                            <span style={{ fontSize: 14 }}>📤</span>
                            <span>출력 (Output)</span>
                            {output && (
                                <span style={{
                                    marginLeft: "auto", fontSize: 10, fontWeight: 700,
                                    padding: "2px 8px", borderRadius: 20,
                                    background: output.startsWith("❌") || output.startsWith("⚠️") ? "rgba(211,47,47,0.15)" : "rgba(119,198,179,0.15)",
                                    color: output.startsWith("❌") || output.startsWith("⚠️") ? "#ef5350" : "#77C6B3",
                                }}>
                                    {output.startsWith("❌") || output.startsWith("⚠️") ? "ERROR" : "SUCCESS"}
                                </span>
                            )}
                        </div>
                        <pre style={{
                            flex: 1, background: bg1,
                            color: output.startsWith("❌") || output.startsWith("⚠️") ? "#ef5350" : "#77C6B3",
                            padding: 16, fontFamily: "'Fira Code', 'Consolas', monospace",
                            fontSize: 13, lineHeight: 1.6, margin: 0, overflow: "auto", whiteSpace: "pre-wrap",
                        }}>
                            {output || "▶ 실행 버튼을 눌러 결과를 확인하세요\n\n💡 Ctrl+Enter 단축키로도 실행할 수 있어요!"}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}
