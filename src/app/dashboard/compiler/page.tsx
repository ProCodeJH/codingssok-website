"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion } from "framer-motion";

/*
  C언어 온라인 컴파일러 — 반응형 + 줄번호 + DB 저장
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

    // Detect mobile
    useEffect(() => {
        const check = () => setLayout(window.innerWidth < 768 ? "stack" : "split");
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) { window.location.href = "/login"; return; }
            setUserId(data.user.id);
            setLoggedIn(true);
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
        setRunning(true);
        setOutput("🔄 컴파일 중...");
        let resultOutput = "";
        let resultStatus = "success";

        try {
            const response = await fetch("https://wandbox.org/api/compile.json", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, compiler: "gcc-head", options: "warning", "compiler-option-raw": "-std=c11" }),
            });
            const data = await response.json();
            if (data.compiler_error) { resultOutput = `❌ 컴파일 에러:\n${data.compiler_error}`; resultStatus = "compile_error"; }
            else if (data.program_error) { resultOutput = `⚠️ 런타임 에러:\n${data.program_error}`; resultStatus = "runtime_error"; }
            else { resultOutput = data.program_output || "(출력 없음)"; resultStatus = "success"; }
        } catch { resultOutput = "❌ 서버 연결 실패. 잠시 후 다시 시도해주세요."; resultStatus = "error"; }

        setOutput(resultOutput);
        setRunning(false);

        if (userId) {
            try {
                await supabase.from("code_submissions").insert({ user_id: userId, language: "c", code, output: resultOutput, status: resultStatus });
                fetchHistory();
            } catch (err) { console.error("제출 저장 실패:", err); }
        }
    }, [code, userId, supabase, fetchHistory]);

    const loadFromHistory = (sub: Submission) => { setCode(sub.code); setOutput(sub.output); setShowHistory(false); };

    // Sync scroll for line numbers
    const handleScroll = () => {
        if (textareaRef.current && lineNumberRef.current) {
            lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const lineCount = code.split("\n").length;

    if (!loggedIn) return null;

    return (
        <div style={{ minHeight: "100vh", background: "#0d1117", color: "#e0e0e0", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <motion.header
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    background: "#161b22", borderBottom: "1px solid #30363d", padding: "10px 16px",
                    display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Link href="/dashboard" style={{ textDecoration: "none", color: "#77C6B3", fontSize: 13, fontWeight: 500 }}>← 대시보드</Link>
                    <h1 style={{ fontSize: "clamp(14px, 2vw, 18px)", fontWeight: 700, color: "#fff" }}>💻 C언어 컴파일러</h1>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => setShowHistory(!showHistory)} style={{
                        padding: "8px 12px", borderRadius: 8, border: "1px solid #30363d",
                        background: showHistory ? "#21262d" : "transparent", color: "#8b949e",
                        fontSize: 12, cursor: "pointer", fontWeight: 500,
                    }}>
                        📜 히스토리 ({history.length})
                    </button>
                    <motion.button
                        onClick={runCode} disabled={running}
                        whileHover={running ? {} : { scale: 1.05 }}
                        whileTap={running ? {} : { scale: 0.95 }}
                        style={{
                            padding: "8px 20px", borderRadius: 8, border: "none",
                            background: running ? "#484f58" : "#238636", color: "#fff",
                            fontWeight: 600, fontSize: 13, cursor: running ? "not-allowed" : "pointer",
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
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        style={{
                            width: layout === "stack" ? "100%" : 260, background: "#161b22",
                            borderRight: layout === "stack" ? "none" : "1px solid #30363d",
                            borderBottom: layout === "stack" ? "1px solid #30363d" : "none",
                            overflowY: "auto", padding: 10, maxHeight: layout === "stack" ? 200 : "none",
                        }}
                    >
                        <h3 style={{ fontSize: 11, fontWeight: 600, color: "#8b949e", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.08em" }}>제출 기록</h3>
                        {history.length === 0 ? (
                            <p style={{ fontSize: 12, color: "#484f58", textAlign: "center", padding: 16 }}>아직 제출 기록이 없어요</p>
                        ) : (
                            history.map((sub) => (
                                <button key={sub.id} onClick={() => loadFromHistory(sub)} style={{
                                    width: "100%", padding: "8px 10px", border: "none", borderRadius: 6,
                                    background: "#0d1117", marginBottom: 3, cursor: "pointer", textAlign: "left",
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                                        <span style={{ fontSize: 10, fontWeight: 700, padding: "1px 5px", borderRadius: 4, background: sub.status === "success" ? "#238636" : "#da3633", color: "#fff" }}>
                                            {sub.status === "success" ? "✓" : "✗"}
                                        </span>
                                        <span style={{ fontSize: 10, color: "#484f58" }}>
                                            {new Date(sub.created_at).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                    </div>
                                    <pre style={{ fontSize: 10, color: "#8b949e", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
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
                    <div style={{ display: "flex", flexDirection: "column", borderRight: layout === "stack" ? "none" : "1px solid #30363d", borderBottom: layout === "stack" ? "1px solid #30363d" : "none" }}>
                        <div style={{ padding: "6px 12px", background: "#161b22", fontSize: 12, color: "#8b949e", fontWeight: 600, borderBottom: "1px solid #30363d", display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#f85149", display: "inline-block" }} />
                            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#d29922", display: "inline-block" }} />
                            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#3fb950", display: "inline-block" }} />
                            <span style={{ marginLeft: 8 }}>main.c</span>
                        </div>
                        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
                            {/* Line numbers */}
                            <div
                                ref={lineNumberRef}
                                style={{
                                    width: 48, background: "#161b22",
                                    padding: "16px 8px 16px 0", textAlign: "right",
                                    fontFamily: "'Fira Code', 'Consolas', monospace",
                                    fontSize: 13, lineHeight: "1.6", color: "#484f58",
                                    overflow: "hidden", userSelect: "none",
                                    borderRight: "1px solid #30363d",
                                }}
                            >
                                {Array.from({ length: lineCount }, (_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                            {/* Code textarea */}
                            <textarea
                                ref={textareaRef}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                onScroll={handleScroll}
                                spellCheck={false}
                                style={{
                                    flex: 1, background: "#0d1117", color: "#c9d1d9", border: "none",
                                    padding: "16px 16px 16px 12px",
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

                    {/* Output */}
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <div style={{ padding: "6px 12px", background: "#161b22", fontSize: 12, color: "#8b949e", fontWeight: 600, borderBottom: "1px solid #30363d" }}>
                            📤 출력 (Output)
                        </div>
                        <pre style={{
                            flex: 1, background: "#0d1117",
                            color: output.startsWith("❌") || output.startsWith("⚠️") ? "#f85149" : "#3fb950",
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
