"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { awardXP, XP_REWARDS } from "@/lib/xp-engine";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

/* ── Code Templates ── */
const C_DEFAULT = `#include <stdio.h>

int main() {
    printf("Hello, 코딩쏙! 🌸\\n");
    
    int a = 10;
    int b = 20;
    int sum = a + b;
    
    printf("%d + %d = %d\\n", a, b, sum);
    
    return 0;
}`;

const PYTHON_DEFAULT = `# 파이썬 코딩쏙 🐍
name = "코딩쏙"
print(f"Hello, {name}!")

numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(f"합계: {total}")
print(f"평균: {total / len(numbers):.1f}")`;

const CODE_TEMPLATES: Record<string, { label: string; code: string; icon: string }[]> = {
    c: [
        { label: "Hello World", icon: "👋", code: C_DEFAULT },
        { label: "배열 & 반복문", icon: "🔄", code: `#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int sum = 0;\n\n    for (int i = 0; i < 5; i++) {\n        printf("arr[%d] = %d\\n", i, arr[i]);\n        sum += arr[i];\n    }\n\n    printf("합계: %d\\n", sum);\n    printf("평균: %.1f\\n", (float)sum / 5);\n    return 0;\n}` },
        { label: "포인터 기초", icon: "📍", code: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *p = &x;\n\n    printf("x의 값: %d\\n", x);\n    printf("x의 주소: %p\\n", (void*)&x);\n    printf("p가 가리키는 값: %d\\n", *p);\n\n    *p = 100;\n    printf("변경 후 x: %d\\n", x);\n    return 0;\n}` },
        { label: "구조체", icon: "🏗️", code: `#include <stdio.h>\n\ntypedef struct {\n    char name[20];\n    int age;\n    float score;\n} Student;\n\nint main() {\n    Student s = {"홍길동", 18, 95.5};\n    printf("이름: %s\\n", s.name);\n    printf("나이: %d\\n", s.age);\n    printf("점수: %.1f\\n", s.score);\n    return 0;\n}` },
    ],
    python: [
        { label: "Hello World", icon: "👋", code: PYTHON_DEFAULT },
        { label: "리스트 & 딕셔너리", icon: "📦", code: `# 리스트와 딕셔너리\nfruits = ["사과", "바나나", "딸기"]\nfor i, fruit in enumerate(fruits):\n    print(f"{i+1}. {fruit}")\n\nstudent = {"이름": "홍길동", "나이": 18, "점수": 95.5}\nfor key, value in student.items():\n    print(f"{key}: {value}")` },
        { label: "함수 & 클래스", icon: "🎯", code: `# 함수 정의\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nfor i in range(1, 8):\n    print(f"{i}! = {factorial(i)}")\n\n# 클래스 정의\nclass Animal:\n    def __init__(self, name, sound):\n        self.name = name\n        self.sound = sound\n    def speak(self):\n        print(f"{self.name}: {self.sound}!")\n\ncat = Animal("고양이", "야옹")\ndog = Animal("강아지", "멍멍")\ncat.speak()\ndog.speak()` },
    ],
};

const LANG_CONFIG: Record<string, { label: string; icon: string; compiler: string; monacoLang: string; color: string; options: Record<string, string> }> = {
    c: { label: "C언어", icon: "💻", compiler: "gcc-head", monacoLang: "c", color: "#00599C", options: { options: "warning", "compiler-option-raw": "-std=c11" } },
    python: { label: "Python", icon: "🐍", compiler: "cpython-3.12.0", monacoLang: "python", color: "#3776AB", options: {} },
};

interface Submission { id: string; code: string; output: string; status: string; created_at: string; language?: string; }

/* ── Typing Animation Hook ── */
function useTypingAnimation(text: string, speed: number = 8) {
    const [displayed, setDisplayed] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() => {
        if (!text) { setDisplayed(""); setDone(true); return; }
        setDone(false); setDisplayed("");
        let i = 0;
        const interval = setInterval(() => {
            i += Math.max(1, Math.floor(text.length / 80)); // adaptive speed
            if (i >= text.length) { setDisplayed(text); setDone(true); clearInterval(interval); }
            else setDisplayed(text.slice(0, i));
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);
    return { displayed, done };
}

/* ── Styles ── */
const glass: React.CSSProperties = {
    background: "rgba(255,255,255,0.75)", backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.85)", boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
};
const toolBtn = (active: boolean, accent?: string): React.CSSProperties => ({
    padding: "7px 14px", borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: "pointer",
    border: active ? `1.5px solid ${accent || "#0ea5e9"}` : "1px solid #e2e8f0",
    background: active ? `${accent || "#0ea5e9"}10` : "#fff",
    color: active ? (accent || "#0ea5e9") : "#64748b",
    transition: "all 0.2s",
    display: "flex", alignItems: "center", gap: 6,
});

export default function CompilerPage() {
    const { user } = useAuth();
    const supabase = useMemo(() => createClient(), []);
    const [lang, setLang] = useState<"c" | "python">("c");
    const [code, setCode] = useState(C_DEFAULT);
    const [rawOutput, setRawOutput] = useState("");
    const [running, setRunning] = useState(false);
    const [execTime, setExecTime] = useState<number | null>(null);
    const [history, setHistory] = useState<Submission[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [stdinInput, setStdinInput] = useState("");
    const [showStdin, setShowStdin] = useState(false);
    const [layout, setLayout] = useState<"split" | "stack">("split");
    const [xpMsg, setXpMsg] = useState("");
    const [outputStatus, setOutputStatus] = useState<"idle" | "success" | "error">("idle");
    const editorRef = useRef<any>(null);
    const userId = user?.id || null;

    // Terminal typing animation
    const { displayed: typedOutput, done: typingDone } = useTypingAnimation(rawOutput);

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
        } catch { /* silent */ }
    }, [userId, supabase]);

    useEffect(() => { if (userId) fetchHistory(); }, [userId, fetchHistory]);

    const switchLang = (newLang: "c" | "python") => {
        setLang(newLang);
        setCode(newLang === "c" ? C_DEFAULT : PYTHON_DEFAULT);
        setRawOutput(""); setOutputStatus("idle"); setExecTime(null);
    };

    const runCode = useCallback(async () => {
        setRunning(true); setRawOutput(""); setOutputStatus("idle"); setExecTime(null);
        const config = LANG_CONFIG[lang];
        const startTime = performance.now();
        let resultOutput = ""; let resultStatus = "success";

        try {
            const response = await fetch("https://wandbox.org/api/compile.json", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, compiler: config.compiler, ...config.options, stdin: stdinInput }),
            });
            const data = await response.json();
            if (data.compiler_error) { resultOutput = data.compiler_error; resultStatus = "compile_error"; }
            else if (data.program_error) { resultOutput = data.program_error; resultStatus = "runtime_error"; }
            else { resultOutput = data.program_output || "(출력 없음)"; resultStatus = "success"; }
        } catch { resultOutput = "서버 연결 실패. 잠시 후 다시 시도해주세요."; resultStatus = "error"; }

        const elapsed = performance.now() - startTime;
        setExecTime(Math.round(elapsed));
        setOutputStatus(resultStatus === "success" ? "success" : "error");
        setRawOutput(resultOutput);
        setRunning(false);

        if (userId) {
            try {
                await supabase.from("code_submissions").insert({ user_id: userId, language: lang, code, output: resultOutput, status: resultStatus });
                fetchHistory();
                if (resultStatus === "success") {
                    await awardXP(userId, XP_REWARDS.code_submit, "코드 실행 성공", "terminal");
                    setXpMsg(`+${XP_REWARDS.code_submit} XP!`);
                    setTimeout(() => setXpMsg(""), 3000);
                }
            } catch { /* silent */ }
        }
    }, [code, lang, userId, supabase, fetchHistory, stdinInput]);

    const loadFromHistory = (sub: Submission) => {
        setCode(sub.code); setRawOutput(sub.output);
        setOutputStatus(sub.status === "success" ? "success" : "error");
        if (sub.language === "python") setLang("python"); else setLang("c");
        setShowHistory(false);
    };

    const handleEditorMount = (editor: any) => {
        editorRef.current = editor;
        editor.addAction({
            id: "run-code", label: "Run Code",
            keybindings: [2048 | 3],
            run: () => runCode(),
        });
    };

    const config = LANG_CONFIG[lang];

    const SHORTCUTS = [
        { keys: "Ctrl + Enter", desc: "코드 실행" },
        { keys: "Ctrl + S", desc: "저장" },
        { keys: "Ctrl + Z", desc: "되돌리기" },
        { keys: "Ctrl + /", desc: "주석 토글" },
        { keys: "Alt + ↑↓", desc: "줄 이동" },
        { keys: "Ctrl + D", desc: "단어 선택" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {/* ── Header ── */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{
                        width: 48, height: 48, borderRadius: 16,
                        background: `linear-gradient(135deg, ${config.color}, ${config.color}cc)`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 24, boxShadow: `0 8px 24px ${config.color}30`,
                    }}>{config.icon}</div>
                    <div>
                        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", letterSpacing: "-0.03em", margin: 0 }}>
                            {config.label} 컴파일러
                        </h1>
                        <p style={{ fontSize: 13, color: "#94a3b8", margin: 0, marginTop: 2 }}>
                            Monaco IDE · Wandbox 컴파일러 엔진
                        </p>
                    </div>
                </div>

                {/* XP badge */}
                <AnimatePresence>
                    {xpMsg && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.8 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            style={{
                                fontSize: 13, fontWeight: 800, color: "#059669",
                                background: "linear-gradient(135deg, #dcfce7, #bbf7d0)",
                                padding: "8px 18px", borderRadius: 12,
                                border: "1px solid #86efac",
                                boxShadow: "0 4px 12px rgba(34,197,94,0.2)",
                            }}
                        >{xpMsg}</motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* ── Toolbar ── */}
            <div style={{ ...glass, borderRadius: 16, padding: "10px 16px", display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {/* Language Switcher */}
                <div style={{
                    display: "flex", borderRadius: 10, overflow: "hidden",
                    border: "1px solid #e2e8f0", background: "#f8fafc",
                }}>
                    {(["c", "python"] as const).map(l => (
                        <button key={l} onClick={() => switchLang(l)} style={{
                            padding: "8px 16px", border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer",
                            background: lang === l ? LANG_CONFIG[l].color : "transparent",
                            color: lang === l ? "#fff" : "#64748b",
                            transition: "all 0.25s ease",
                        }}>{LANG_CONFIG[l].icon} {LANG_CONFIG[l].label}</button>
                    ))}
                </div>

                <div style={{ width: 1, height: 24, background: "#e2e8f0" }} />

                <button onClick={() => setShowTemplates(!showTemplates)} style={toolBtn(showTemplates, "#f59e0b")}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>description</span>
                    템플릿
                </button>
                <button onClick={() => setShowStdin(!showStdin)} style={toolBtn(showStdin, "#6366f1")}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>keyboard</span>
                    입력
                </button>
                <button onClick={() => setShowHistory(!showHistory)} style={toolBtn(showHistory, "#0ea5e9")}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>history</span>
                    기록 ({history.length})
                </button>
                <button onClick={() => setShowShortcuts(!showShortcuts)} style={toolBtn(showShortcuts, "#8b5cf6")}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>keyboard_command_key</span>
                    단축키
                </button>

                <div style={{ flex: 1 }} />

                {/* Execution time */}
                {execTime !== null && (
                    <motion.span
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        style={{
                            fontSize: 11, fontWeight: 700, color: "#94a3b8",
                            padding: "4px 10px", borderRadius: 8,
                            background: "#f8fafc", fontFamily: "'Fira Code', monospace",
                        }}
                    >⏱ {execTime}ms</motion.span>
                )}

                {/* Run Button */}
                <motion.button
                    onClick={runCode} disabled={running}
                    whileHover={running ? {} : { scale: 1.04 }}
                    whileTap={running ? {} : { scale: 0.96 }}
                    style={{
                        padding: "10px 24px", borderRadius: 12, border: "none", fontSize: 14, fontWeight: 800,
                        background: running ? "#94a3b8" : `linear-gradient(135deg, #10b981, #059669)`,
                        color: "#fff", cursor: running ? "not-allowed" : "pointer",
                        boxShadow: running ? "none" : "0 6px 20px rgba(16,185,129,0.3)",
                        display: "flex", alignItems: "center", gap: 8,
                        transition: "all 0.2s",
                    }}
                >
                    {running ? (
                        <>
                            <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="material-symbols-outlined" style={{ fontSize: 18 }}>sync</motion.span>
                            컴파일 중...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>play_arrow</span>
                            실행
                            <span style={{ fontSize: 10, opacity: 0.7, fontWeight: 500 }}>Ctrl+↵</span>
                        </>
                    )}
                </motion.button>
            </div>

            {/* ── Expandable Panels ── */}
            <AnimatePresence>
                {showShortcuts && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        style={{ ...glass, borderRadius: 16, padding: 16, overflow: "hidden" }}>
                        <h3 style={{ fontSize: 12, fontWeight: 800, color: "#8b5cf6", marginBottom: 12, letterSpacing: "0.05em" }}>
                            ⌨️ 키보드 단축키
                        </h3>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 8 }}>
                            {SHORTCUTS.map(s => (
                                <div key={s.keys} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 12px", borderRadius: 10, background: "#f8fafc" }}>
                                    <span style={{ fontSize: 12, color: "#64748b" }}>{s.desc}</span>
                                    <kbd style={{
                                        fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
                                        background: "#fff", border: "1px solid #e2e8f0", color: "#0f172a",
                                        fontFamily: "'Fira Code', monospace", boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                                    }}>{s.keys}</kbd>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {showTemplates && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        style={{ ...glass, borderRadius: 16, padding: 16, overflow: "hidden" }}>
                        <h3 style={{ fontSize: 12, fontWeight: 800, color: "#f59e0b", marginBottom: 12, letterSpacing: "0.05em" }}>
                            📝 코드 템플릿 — {config.label}
                        </h3>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            {(CODE_TEMPLATES[lang] || []).map(t => (
                                <motion.button key={t.label} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                                    onClick={() => { setCode(t.code); setShowTemplates(false); }}
                                    style={{
                                        padding: "10px 18px", borderRadius: 12, border: "1px solid #e2e8f0",
                                        background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 600,
                                        color: "#475569", display: "flex", alignItems: "center", gap: 6,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                    }}>
                                    <span>{t.icon}</span> {t.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}

                {showStdin && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        style={{ ...glass, borderRadius: 16, padding: 16, overflow: "hidden" }}>
                        <h3 style={{ fontSize: 12, fontWeight: 800, color: "#6366f1", marginBottom: 10, letterSpacing: "0.05em" }}>⌨️ 표준 입력 (stdin)</h3>
                        <textarea value={stdinInput} onChange={e => setStdinInput(e.target.value)} placeholder="입력값을 작성하세요..."
                            style={{
                                width: "100%", minHeight: 80, padding: 12, borderRadius: 10, border: "1px solid #e2e8f0",
                                fontFamily: "'Fira Code', monospace", fontSize: 13, outline: "none", resize: "vertical",
                                background: "#f8fafc", color: "#0f172a",
                            }} />
                    </motion.div>
                )}

                {showHistory && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                        style={{ ...glass, borderRadius: 16, padding: 16, overflow: "hidden", maxHeight: 220, overflowY: "auto" }}>
                        <h3 style={{ fontSize: 12, fontWeight: 800, color: "#0ea5e9", marginBottom: 10, letterSpacing: "0.05em" }}>📜 제출 기록</h3>
                        {history.length === 0 ? (
                            <p style={{ fontSize: 13, color: "#94a3b8", textAlign: "center", padding: 20 }}>아직 제출 기록이 없어요</p>
                        ) : (
                            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                {history.map((sub, i) => (
                                    <motion.button key={sub.id} whileHover={{ x: 4, backgroundColor: "#f0f9ff" }}
                                        onClick={() => loadFromHistory(sub)} style={{
                                            width: "100%", padding: "10px 14px", border: "1px solid #f1f5f9", borderRadius: 10,
                                            background: "#fafafa", cursor: "pointer", textAlign: "left" as const,
                                            display: "flex", justifyContent: "space-between", alignItems: "center",
                                        }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{
                                                fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 6,
                                                background: sub.status === "success" ? "#dcfce7" : "#fee2e2",
                                                color: sub.status === "success" ? "#15803d" : "#dc2626",
                                            }}>{sub.status === "success" ? "✓ 성공" : "✗ 에러"}</span>
                                            <span style={{ fontSize: 10, padding: "2px 6px", borderRadius: 4, background: "#f1f5f9", color: "#64748b", fontWeight: 600 }}>
                                                {LANG_CONFIG[sub.language || "c"]?.icon || "💻"}
                                            </span>
                                            <pre style={{ fontSize: 11, color: "#64748b", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 250 }}>
                                                {sub.code.substring(0, 50)}...
                                            </pre>
                                        </div>
                                        <span style={{ fontSize: 11, color: "#94a3b8", whiteSpace: "nowrap" }}>
                                            {new Date(sub.created_at).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                        </span>
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── IDE Area ── */}
            <div style={{
                borderRadius: 20, overflow: "hidden",
                boxShadow: "0 20px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.05)",
                display: "grid",
                gridTemplateColumns: layout === "stack" ? "1fr" : "1fr 1fr",
                gridTemplateRows: layout === "stack" ? "1fr 1fr" : "1fr",
                minHeight: 620,
            }}>
                {/* Editor Pane */}
                <div style={{ display: "flex", flexDirection: "column", borderRight: layout === "stack" ? "none" : "1px solid #1e293b", borderBottom: layout === "stack" ? "1px solid #1e293b" : "none" }}>
                    {/* File Tab Bar */}
                    <div style={{
                        padding: "0 16px", background: "#0f172a", fontSize: 12,
                        display: "flex", alignItems: "center", height: 40, gap: 8,
                        borderBottom: "1px solid #1e293b",
                    }}>
                        {/* Window controls */}
                        <div style={{ display: "flex", gap: 6, marginRight: 12 }}>
                            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#ef4444", opacity: 0.8 }} />
                            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#f59e0b", opacity: 0.8 }} />
                            <span style={{ width: 12, height: 12, borderRadius: 999, background: "#22c55e", opacity: 0.8 }} />
                        </div>
                        {/* Active tab */}
                        <div style={{
                            padding: "6px 16px", borderRadius: "8px 8px 0 0",
                            background: "#1e293b", color: "#e2e8f0", fontSize: 12, fontWeight: 600,
                            borderTop: `2px solid ${config.color}`,
                            display: "flex", alignItems: "center", gap: 6,
                        }}>
                            <span style={{ width: 8, height: 8, borderRadius: 2, background: config.color }} />
                            {lang === "c" ? "main.c" : "main.py"}
                        </div>
                        <button onClick={() => setCode(lang === "c" ? C_DEFAULT : PYTHON_DEFAULT)} style={{
                            marginLeft: "auto", background: "none", border: "none",
                            color: "rgba(255,255,255,0.3)", fontSize: 11, cursor: "pointer",
                            display: "flex", alignItems: "center", gap: 4,
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>restart_alt</span>
                            리셋
                        </button>
                    </div>

                    {/* Monaco Editor */}
                    <div style={{ flex: 1, minHeight: 0 }}>
                        <Editor
                            height="100%"
                            language={config.monacoLang}
                            value={code}
                            onChange={val => setCode(val || "")}
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
                                padding: { top: 16, bottom: 16 },
                                automaticLayout: true,
                                tabSize: 4,
                                wordWrap: "off",
                                bracketPairColorization: { enabled: true },
                                guides: { bracketPairs: true, indentation: true },
                                suggest: { showKeywords: true, showSnippets: true },
                                cursorBlinking: "expand",
                                cursorSmoothCaretAnimation: "on",
                                smoothScrolling: true,
                                scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
                            }}
                        />
                    </div>
                </div>

                {/* Output Terminal Pane */}
                <div style={{ display: "flex", flexDirection: "column", background: "#0a0e1a" }}>
                    {/* Terminal Tab */}
                    <div style={{
                        padding: "0 16px", background: "#0f172a", fontSize: 12,
                        display: "flex", alignItems: "center", height: 40, gap: 8,
                        borderBottom: "1px solid #1e293b",
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#64748b" }}>terminal</span>
                        <span style={{ color: "#94a3b8", fontWeight: 600 }}>터미널 출력</span>

                        {/* Status indicator */}
                        <AnimatePresence>
                            {outputStatus !== "idle" && (
                                <motion.span
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    style={{
                                        marginLeft: "auto", fontSize: 10, fontWeight: 800,
                                        padding: "3px 10px", borderRadius: 20,
                                        background: outputStatus === "success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                                        color: outputStatus === "success" ? "#4ade80" : "#f87171",
                                        display: "flex", alignItems: "center", gap: 4,
                                    }}>
                                    <span style={{
                                        width: 6, height: 6, borderRadius: "50%",
                                        background: outputStatus === "success" ? "#4ade80" : "#f87171",
                                    }} />
                                    {outputStatus === "success" ? "SUCCESS" : "ERROR"}
                                </motion.span>
                            )}
                        </AnimatePresence>

                        {execTime !== null && (
                            <span style={{ fontSize: 10, color: "#475569", fontFamily: "'Fira Code',monospace" }}>
                                {execTime}ms
                            </span>
                        )}
                    </div>

                    {/* Terminal Output */}
                    <div style={{ flex: 1, padding: 16, overflow: "auto", position: "relative" }}>
                        {running ? (
                            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#64748b" }}>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    style={{ width: 16, height: 16, border: "2px solid #334155", borderTopColor: "#0ea5e9", borderRadius: "50%" }}
                                />
                                <span style={{ fontSize: 13, fontFamily: "'Fira Code',monospace" }}>컴파일 중...</span>
                            </div>
                        ) : rawOutput ? (
                            <pre style={{
                                margin: 0, fontFamily: "'Fira Code', monospace", fontSize: 13, lineHeight: 1.7,
                                color: outputStatus === "error" ? "#f87171" : "#a7f3d0",
                                whiteSpace: "pre-wrap", wordBreak: "break-all",
                            }}>
                                <span style={{ color: "#475569", userSelect: "none" }}>
                                    {outputStatus === "success" ? "$ " : "stderr: "}
                                </span>
                                {typedOutput}
                                {!typingDone && (
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.6 }}
                                        style={{ color: "#0ea5e9", fontWeight: 700 }}
                                    >▌</motion.span>
                                )}
                            </pre>
                        ) : (
                            <div style={{ color: "#334155", fontSize: 13, fontFamily: "'Fira Code',monospace", lineHeight: 2 }}>
                                <span style={{ color: "#475569" }}>$</span> <span style={{ color: "#64748b" }}>코드를 작성하고 실행하세요</span><br />
                                <span style={{ color: "#475569" }}>$</span> <span style={{ color: "#334155" }}>Ctrl+Enter 로 빠르게 실행</span><br />
                                <span style={{ color: "#475569" }}>$</span> <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    style={{ color: "#0ea5e9" }}
                                >▌</motion.span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
