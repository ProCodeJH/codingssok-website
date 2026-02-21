"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { awardXP, XP_REWARDS } from "@/lib/xp-engine";
import dynamic from "next/dynamic";

// Monaco를 SSR 없이 로드 (Next.js 필수)
const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

/*
  C언어 온라인 컴파일러 — Monaco Editor 통합
  - Monaco: 구문 하이라이팅, 자동완성, 줄번호
  - Wandbox API로 컴파일/실행
  - 제출 기록 + XP 보상
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

const PYTHON_DEFAULT = `# 파이썬 코딩쏙 🐍
name = "코딩쏙"
print(f"Hello, {name}!")

# 리스트와 반복문
numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(f"합계: {total}")
print(f"평균: {total / len(numbers):.1f}")`;

const CODE_TEMPLATES: Record<string, { label: string; code: string }[]> = {
    c: [
        { label: "Hello World", code: DEFAULT_CODE },
        { label: "배열 & 반복문", code: `#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int sum = 0;\n\n    for (int i = 0; i < 5; i++) {\n        printf("arr[%d] = %d\\n", i, arr[i]);\n        sum += arr[i];\n    }\n\n    printf("합계: %d\\n", sum);\n    printf("평균: %.1f\\n", (float)sum / 5);\n    return 0;\n}` },
        { label: "포인터 기초", code: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *p = &x;\n\n    printf("x의 값: %d\\n", x);\n    printf("x의 주소: %p\\n", (void*)&x);\n    printf("p가 가리키는 값: %d\\n", *p);\n\n    *p = 100;\n    printf("변경 후 x: %d\\n", x);\n    return 0;\n}` },
        { label: "구조체", code: `#include <stdio.h>\n\ntypedef struct {\n    char name[20];\n    int age;\n    float score;\n} Student;\n\nint main() {\n    Student s = {"홍길동", 18, 95.5};\n    printf("이름: %s\\n", s.name);\n    printf("나이: %d\\n", s.age);\n    printf("점수: %.1f\\n", s.score);\n    return 0;\n}` },
    ],
    python: [
        { label: "Hello World", code: PYTHON_DEFAULT },
        { label: "리스트 & 딕셔너리", code: `# 리스트와 딕셔너리\nfruits = ["사과", "바나나", "딸기"]\nfor i, fruit in enumerate(fruits):\n    print(f"{i+1}. {fruit}")\n\nstudent = {"이름": "홍길동", "나이": 18, "점수": 95.5}\nfor key, value in student.items():\n    print(f"{key}: {value}")` },
        { label: "함수 & 클래스", code: `# 함수 정의\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nfor i in range(1, 8):\n    print(f"{i}! = {factorial(i)}")\n\n# 클래스 정의\nclass Animal:\n    def __init__(self, name, sound):\n        self.name = name\n        self.sound = sound\n    def speak(self):\n        print(f"{self.name}: {self.sound}!")\n\ncat = Animal("고양이", "야옹")\ndog = Animal("강아지", "멍멍")\ncat.speak()\ndog.speak()` },
    ],
};

const LANG_CONFIG: Record<string, { label: string; icon: string; compiler: string; monacoLang: string; options: Record<string, string> }> = {
    c: {
        label: "C언어", icon: "💻", compiler: "gcc-head", monacoLang: "c",
        options: { options: "warning", "compiler-option-raw": "-std=c11" },
    },
    python: {
        label: "Python", icon: "🐍", compiler: "cpython-3.12.0", monacoLang: "python",
        options: {},
    },
};

interface Submission { id: string; code: string; output: string; status: string; created_at: string; language?: string; }

export default function CompilerPage() {
    const { user } = useAuth();
    const supabase = useMemo(() => createClient(), []);
    const [lang, setLang] = useState<"c" | "python">("c");
    const [code, setCode] = useState(DEFAULT_CODE);
    const [output, setOutput] = useState("");
    const [running, setRunning] = useState(false);
    const [history, setHistory] = useState<Submission[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [stdinInput, setStdinInput] = useState("");
    const [showStdin, setShowStdin] = useState(false);
    const [layout, setLayout] = useState<"split" | "stack">("split");
    const [xpMsg, setXpMsg] = useState("");
    const [editorReady, setEditorReady] = useState(false);
    const editorRef = useRef<any>(null);
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

    const switchLang = (newLang: "c" | "python") => {
        setLang(newLang);
        setCode(newLang === "c" ? DEFAULT_CODE : PYTHON_DEFAULT);
        setOutput("");
    };

    const runCode = useCallback(async () => {
        setRunning(true); setOutput("🔄 컴파일 중...");
        const config = LANG_CONFIG[lang];
        let resultOutput = ""; let resultStatus = "success";
        try {
            const response = await fetch("https://wandbox.org/api/compile.json", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, compiler: config.compiler, ...config.options, stdin: stdinInput }),
            });
            const data = await response.json();
            if (data.compiler_error) { resultOutput = `❌ 컴파일 에러:\n${data.compiler_error}`; resultStatus = "compile_error"; }
            else if (data.program_error) { resultOutput = `⚠️ 런타임 에러:\n${data.program_error}`; resultStatus = "runtime_error"; }
            else { resultOutput = data.program_output || "(출력 없음)"; resultStatus = "success"; }
        } catch { resultOutput = "❌ 서버 연결 실패. 잠시 후 다시 시도해주세요."; resultStatus = "error"; }

        setOutput(resultOutput); setRunning(false);
        if (userId) {
            try {
                await supabase.from("code_submissions").insert({ user_id: userId, language: lang, code, output: resultOutput, status: resultStatus });
                fetchHistory();
                if (resultStatus === "success") {
                    await awardXP(userId, XP_REWARDS.code_submit, "코드 실행 성공", "terminal");
                    setXpMsg(`+${XP_REWARDS.code_submit} XP!`);
                    setTimeout(() => setXpMsg(""), 3000);
                }
            } catch (err) { console.error("제출 저장 실패:", err); }
        }
    }, [code, lang, userId, supabase, fetchHistory, stdinInput]);

    const loadFromHistory = (sub: Submission) => {
        setCode(sub.code);
        setOutput(sub.output);
        if (sub.language === "python") setLang("python"); else setLang("c");
        setShowHistory(false);
    };

    const handleEditorMount = (editor: any) => {
        editorRef.current = editor;
        setEditorReady(true);
        // Ctrl+Enter로 실행
        editor.addAction({
            id: "run-code",
            label: "Run Code",
            keybindings: [2048 /* CtrlCmd */ | 3 /* Enter */],
            run: () => runCode(),
        });
    };

    const isError = output.startsWith("❌") || output.startsWith("⚠️");
    const PRIMARY = "#0ea5e9";
    const config = LANG_CONFIG[lang];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em" }}>
                        <span style={{ marginRight: 8 }}>{config.icon}</span>{config.label} 컴파일러
                    </h1>
                    <p style={{ fontSize: 14, color: "#64748b", marginTop: 4 }}>Monaco IDE로 코드를 작성하고 바로 실행하세요</p>
                </div>
                <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                    {xpMsg && <span style={{ fontSize: 13, fontWeight: 700, color: "#059669", background: "#dcfce7", padding: "6px 14px", borderRadius: 10 }}>{xpMsg}</span>}

                    {/* 언어 스위처 */}
                    <div style={{ display: "flex", borderRadius: 10, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                        {(["c", "python"] as const).map(l => (
                            <button key={l} onClick={() => switchLang(l)} style={{
                                padding: "7px 14px", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer",
                                background: lang === l ? "#0f172a" : "#fff", color: lang === l ? "#fff" : "#64748b",
                            }}>{LANG_CONFIG[l].icon} {LANG_CONFIG[l].label}</button>
                        ))}
                    </div>

                    <button onClick={() => setShowTemplates(!showTemplates)} style={{
                        padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                        border: "1px solid #e2e8f0", background: showTemplates ? "#fef3c7" : "#fff", color: showTemplates ? "#b45309" : "#475569",
                    }}>📝 템플릿</button>
                    <button onClick={() => setShowStdin(!showStdin)} style={{
                        padding: "8px 14px", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer",
                        border: "1px solid #e2e8f0", background: showStdin ? "#e0f2fe" : "#fff", color: showStdin ? "#0369a1" : "#475569",
                    }}>⌨️ 입력</button>
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
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 10, letterSpacing: "0.05em" }}>코드 템플릿 ({config.label})</h3>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                        {(CODE_TEMPLATES[lang] || []).map((t) => (
                            <button key={t.label} onClick={() => { setCode(t.code); setShowTemplates(false); }} style={{
                                padding: "8px 16px", borderRadius: 10, border: "1px solid #e2e8f0",
                                background: "#fafafa", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#475569",
                            }}>{t.label}</button>
                        ))}
                    </div>
                </div>
            )}

            {/* Stdin panel */}
            {showStdin && (
                <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)" }}>
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 10, letterSpacing: "0.05em" }}>⌨️ 표준 입력 (stdin)</h3>
                    <textarea
                        value={stdinInput} onChange={(e) => setStdinInput(e.target.value)}
                        placeholder="입력값을 작성하세요..."
                        style={{
                            width: "100%", minHeight: 80, padding: 12, borderRadius: 10, border: "1px solid #e2e8f0",
                            fontFamily: "'Fira Code', monospace", fontSize: 13, outline: "none", resize: "vertical",
                            background: "#f8fafc", color: "#0f172a",
                        }}
                    />
                </div>
            )}

            {/* History panel */}
            {showHistory && (
                <div style={{
                    background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: 16,
                    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)", maxHeight: 200, overflowY: "auto"
                }}>
                    <h3 style={{ fontSize: 12, fontWeight: 700, color: "#94a3b8", marginBottom: 10, letterSpacing: "0.05em" }}>제출 기록</h3>
                    {history.length === 0 ? (
                        <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: 16 }}>아직 제출 기록이 없어요</p>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                            {history.map((sub) => (
                                <button key={sub.id} onClick={() => loadFromHistory(sub)} style={{
                                    width: "100%", padding: "10px 14px", border: "1px solid #f1f5f9", borderRadius: 10,
                                    background: "#fafafa", cursor: "pointer", textAlign: "left" as const, display: "flex", justifyContent: "space-between", alignItems: "center",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <span style={{
                                            fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4,
                                            background: sub.status === "success" ? "#dcfce7" : "#fee2e2",
                                            color: sub.status === "success" ? "#15803d" : "#dc2626",
                                        }}>{sub.status === "success" ? "✓ 성공" : "✗ 에러"}</span>
                                        <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "#f1f5f9", color: "#64748b", fontWeight: 600 }}>
                                            {LANG_CONFIG[sub.language || "c"]?.icon || "💻"}
                                        </span>
                                        <pre style={{ fontSize: 11, color: "#64748b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 280 }}>
                                            {sub.code.substring(0, 55)}...
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

            {/* IDE Area */}
            <div style={{
                borderRadius: 16, overflow: "hidden", border: "1px solid #e2e8f0",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.08)", display: "grid",
                gridTemplateColumns: layout === "stack" ? "1fr" : "1fr 1fr",
                gridTemplateRows: layout === "stack" ? "1fr 1fr" : "1fr",
                minHeight: 700,
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
                        }}>{lang === "c" ? "main.c" : "main.py"}</span>
                        <button onClick={() => setCode(lang === "c" ? DEFAULT_CODE : PYTHON_DEFAULT)} style={{
                            marginLeft: "auto", background: "none", border: "none",
                            color: "rgba(255,255,255,0.3)", fontSize: 11, cursor: "pointer",
                        }}>↺ 리셋</button>
                    </div>

                    {/* Monaco Editor */}
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <Editor
                            height="100%"
                            language={config.monacoLang}
                            value={code}
                            onChange={(val) => setCode(val || "")}
                            onMount={handleEditorMount}
                            theme="vs-dark"
                            options={{
                                fontSize: 14,
                                fontFamily: "'Fira Code', 'Consolas', monospace",
                                fontLigatures: true,
                                minimap: { enabled: false },
                                scrollBeyondLastLine: false,
                                lineNumbers: "on",
                                renderLineHighlight: "all",
                                roundedSelection: true,
                                padding: { top: 12, bottom: 12 },
                                automaticLayout: true,
                                tabSize: 4,
                                wordWrap: "off",
                                bracketPairColorization: { enabled: true },
                                guides: { bracketPairs: true, indentation: true },
                                suggest: { showKeywords: true, showSnippets: true },
                                scrollbar: {
                                    verticalScrollbarSize: 8,
                                    horizontalScrollbarSize: 8,
                                },
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
