"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { awardXP, XP_REWARDS } from "@/lib/xp-engine";

/*
  C언어 온라인 컴파일러 — 화이트톤 (learning 레이아웃 통합)
  - 에디터 & 출력은 다크 유지 (IDE 관습)
  - 헤더/도구바는 화이트 스타일
  - layout.tsx 네비로 감싸짐
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

const CODE_TEMPLATES = [
    { label: "Hello World", code: DEFAULT_CODE },
    { label: "배열 & 반복문", code: `#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int sum = 0;\n\n    for (int i = 0; i < 5; i++) {\n        printf("arr[%d] = %d\\n", i, arr[i]);\n        sum += arr[i];\n    }\n\n    printf("합계: %d\\n", sum);\n    printf("평균: %.1f\\n", (float)sum / 5);\n    return 0;\n}` },
    { label: "포인터 기초", code: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *p = &x;\n\n    printf("x의 값: %d\\n", x);\n    printf("x의 주소: %p\\n", (void*)&x);\n    printf("p가 가리키는 값: %d\\n", *p);\n    printf("p의 값 (주소): %p\\n", (void*)p);\n\n    *p = 100;\n    printf("변경 후 x: %d\\n", x);\n    return 0;\n}` },
    { label: "구조체", code: `#include <stdio.h>\n\ntypedef struct {\n    char name[20];\n    int age;\n    float score;\n} Student;\n\nint main() {\n    Student s = {"홍길동", 18, 95.5};\n    printf("이름: %s\\n", s.name);\n    printf("나이: %d\\n", s.age);\n    printf("점수: %.1f\\n", s.score);\n    return 0;\n}` },
    { label: "문자열 처리", code: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = "Hello, Coding!";\n    printf("문자열: %s\\n", str);\n    printf("길이: %lu\\n", strlen(str));\n\n    // 문자열 뒤집기\n    int len = strlen(str);\n    for (int i = 0; i < len / 2; i++) {\n        char tmp = str[i];\n        str[i] = str[len-1-i];\n        str[len-1-i] = tmp;\n    }\n    printf("뒤집기: %s\\n", str);\n    return 0;\n}` },
];

interface Submission { id: string; code: string; output: string; status: string; created_at: string; }

export default function CompilerPage() {
    const { user } = useAuth();
    const [code, setCode] = useState(DEFAULT_CODE);
    const [output, setOutput] = useState("");
    const [running, setRunning] = useState(false);
    const [history, setHistory] = useState<Submission[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [layout, setLayout] = useState<"split" | "stack">("split");
    const [xpMsg, setXpMsg] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const lineNumberRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();
    const userId = user?.id || null;

    useEffect(() => {
        const check = () => setLayout(window.innerWidth < 768 ? "stack" : "split");
        check(); window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

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
                // XP 적립
                if (resultStatus === "success") {
                    const result = await awardXP(userId, XP_REWARDS.code_submit, "코드 실행 성공", "terminal");
                    setXpMsg(`+${XP_REWARDS.code_submit} XP!`);
                    setTimeout(() => setXpMsg(""), 3000);
                }
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
    const isError = output.startsWith("❌") || output.startsWith("⚠️");
    const PRIMARY = "#0ea5e9";

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&display=swap" />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em" }}>
                        <span style={{ marginRight: 8 }}>💻</span>C언어 컴파일러
                    </h1>
                    <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>온라인에서 바로 C 코드를 작성하고 실행하세요</p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    {xpMsg && <span style={{ fontSize: 13, fontWeight: 700, color: "#059669", background: "#dcfce7", padding: "6px 14px", borderRadius: 10, animation: "pulse 1s" }}>{xpMsg}</span>}
                    <span style={{ fontSize: 12, color: "#94a3b8", fontFamily: "monospace", background: "#f1f5f9", padding: "4px 10px", borderRadius: 8 }}>Ctrl+Enter 실행</span>
                    <button onClick={() => setShowTemplates(!showTemplates)} style={{
                        padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                        border: "1px solid #e2e8f0", background: showTemplates ? "#fef3c7" : "#fff", color: showTemplates ? "#b45309" : "#475569",
                    }}>📝 템플릿</button>
                    <button onClick={() => setShowHistory(!showHistory)} style={{
                        padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                        border: "1px solid #e2e8f0", background: showHistory ? "#f0f9ff" : "#fff", color: showHistory ? "#0369a1" : "#475569",
                    }}>📜 기록 ({history.length})</button>
                    <button onClick={runCode} disabled={running} style={{
                        padding: "8px 20px", borderRadius: 10, border: "none", fontSize: 14, fontWeight: 700,
                        background: running ? "#94a3b8" : `linear-gradient(to right, ${PRIMARY}, #6366f1)`, color: "#fff",
                        cursor: running ? "not-allowed" : "pointer", boxShadow: running ? "none" : "0 4px 14px rgba(14,165,233,0.3)",
                    }}>
                        {running ? "⏳ 실행 중..." : "▶ 실행"}
                    </button>
                </div>
            </div>

            {/* Template panel */}
            {showTemplates && (
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 10, letterSpacing: "0.05em" }}>코드 템플릿</h3>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {CODE_TEMPLATES.map((t) => (
                            <button key={t.label} onClick={() => { setCode(t.code); setShowTemplates(false); }} style={{
                                padding: "8px 16px", borderRadius: 10, border: "1px solid #e2e8f0",
                                background: "#fafafa", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#475569",
                            }}>{t.label}</button>
                        ))}
                    </div>
                </div>
            )}

            {/* History panel */}
            {showHistory && (
                <div style={{
                    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16,
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", maxHeight: 200, overflowY: "auto"
                }}>
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>제출 기록</h3>
                    {history.length === 0 ? (
                        <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: 16 }}>아직 제출 기록이 없어요</p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {history.map((sub) => (
                                <button key={sub.id} onClick={() => loadFromHistory(sub)} style={{
                                    width: "100%", padding: "10px 14px", border: "1px solid #f1f5f9", borderRadius: 10,
                                    background: "#fafafa", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                                            background: sub.status === "success" ? "#dcfce7" : "#fee2e2",
                                            color: sub.status === "success" ? "#15803d" : "#dc2626",
                                        }}>{sub.status === "success" ? "✓ 성공" : "✗ 에러"}</span>
                                        <pre style={{ fontSize: 11, color: "#64748b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 300 }}>
                                            {sub.code.substring(0, 60)}...
                                        </pre>
                                    </div>
                                    <span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>
                                        {new Date(sub.created_at).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* IDE Area (다크 유지) */}
            <div style={{
                borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08)", display: "grid",
                gridTemplateColumns: layout === "stack" ? "1fr" : "1fr 1fr",
                gridTemplateRows: layout === "stack" ? "1fr 1fr" : "1fr",
                minHeight: 500,
            }}>
                {/* Editor */}
                <div style={{ display: "flex", flexDirection: "column", borderRight: layout === "stack" ? "none" : "1px solid #334155", borderBottom: layout === "stack" ? "1px solid #334155" : "none" }}>
                    {/* File tab */}
                    <div style={{
                        padding: "0 12px", background: "#1e293b", fontSize: 12, color: "rgba(255,255,255,0.5)",
                        fontWeight: 600, borderBottom: "1px solid #334155", display: "flex", alignItems: "center", height: 36, gap: 6,
                    }}>
                        <span style={{ width: 10, height: 10, borderRadius: 999, background: "#f87171" }} />
                        <span style={{ width: 10, height: 10, borderRadius: 999, background: "#facc15" }} />
                        <span style={{ width: 10, height: 10, borderRadius: 999, background: "#4ade80" }} />
                        <span style={{
                            marginLeft: 8, padding: "4px 12px", borderRadius: "6px 6px 0 0",
                            background: "#0f172a", color: "#fff", fontSize: 12, fontWeight: 600,
                            borderTop: `2px solid ${PRIMARY}`,
                        }}>main.c</span>
                        <button onClick={() => setCode(DEFAULT_CODE)} style={{
                            marginLeft: "auto", background: "none", border: "none",
                            color: "rgba(255,255,255,0.3)", fontSize: 11, cursor: "pointer",
                        }}>↺ 리셋</button>
                    </div>
                    <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
                        <div ref={lineNumberRef} style={{
                            width: 44, background: "#1e293b", padding: "14px 6px 14px 0", textAlign: "right",
                            fontFamily: "'Fira Code', monospace", fontSize: 13, lineHeight: "1.6",
                            color: "rgba(255,255,255,0.2)", overflow: "hidden", userSelect: "none",
                            borderRight: "1px solid #334155",
                        }}>
                            {Array.from({ length: lineCount }, (_, i) => (<div key={i}>{i + 1}</div>))}
                        </div>
                        <textarea
                            ref={textareaRef} value={code} onChange={(e) => setCode(e.target.value)}
                            onScroll={handleScroll} spellCheck={false}
                            style={{
                                flex: 1, background: "#0f172a", color: "#c9d1d9", border: "none",
                                padding: "14px 16px 14px 12px", fontFamily: "'Fira Code', monospace",
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
                    <div style={{
                        padding: "0 12px", background: "#1e293b", fontSize: 12, color: "rgba(255,255,255,0.5)",
                        fontWeight: 600, borderBottom: "1px solid #334155", display: "flex", alignItems: "center", height: 36, gap: 6,
                    }}>
                        <span style={{ fontSize: 14 }}>📤</span>
                        <span>출력 (Output)</span>
                        {output && (
                            <span style={{
                                marginLeft: "auto", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20,
                                background: isError ? "rgba(211,47,47,0.15)" : "rgba(74,222,128,0.15)",
                                color: isError ? "#ef5350" : "#4ade80",
                            }}>{isError ? "ERROR" : "SUCCESS"}</span>
                        )}
                    </div>
                    <pre style={{
                        flex: 1, background: "#0f172a", color: isError ? "#ef5350" : "#4ade80",
                        padding: 16, fontFamily: "'Fira Code', monospace",
                        fontSize: 13, lineHeight: 1.6, margin: 0, overflow: "auto", whiteSpace: "pre-wrap",
                    }}>
                        {output || "▶ 실행 버튼을 눌러 결과를 확인하세요\n\n💡 Ctrl+Enter 단축키로도 실행할 수 있어요!"}
                    </pre>
                </div>
            </div>
        </div>
    );
}
