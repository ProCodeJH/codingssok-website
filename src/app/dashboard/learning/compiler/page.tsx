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
            i += Math.max(1, Math.floor(text.length / 80));
            if (i >= text.length) { setDisplayed(text); setDone(true); clearInterval(interval); }
            else setDisplayed(text.slice(0, i));
        }, speed);
        return () => clearInterval(interval);
    }, [text, speed]);
    return { displayed, done };
}

/* ── MI helper ── */
function MI({ icon, style, className }: { icon: string; style?: React.CSSProperties; className?: string }) {
    return <span className={`material-symbols-outlined ${className || ""}`} style={style}>{icon}</span>;
}

/* ── Probability pillar data ── */
const PROB_STATES = [
    { label: "|00⟩", pct: 49, color: "from-blue-500 to-cyan-500" },
    { label: "|01⟩", pct: 1, color: "" },
    { label: "|10⟩", pct: 1, color: "" },
    { label: "|11⟩", pct: 49, color: "from-cyan-500 to-blue-500" },
];

/* ── Objective Tasks ── */
const OBJECTIVE_TASKS = [
    { text: "코드를 작성하세요", done: false },
    { text: "컴파일 오류를 수정하세요", done: false },
    { text: "실행 결과를 확인하세요", done: false },
];

const SHORTCUTS = [
    { keys: "Ctrl + Enter", desc: "코드 실행" },
    { keys: "Ctrl + S", desc: "저장" },
    { keys: "Ctrl + Z", desc: "되돌리기" },
    { keys: "Ctrl + /", desc: "주석 토글" },
    { keys: "Alt + ↑↓", desc: "줄 이동" },
    { keys: "Ctrl + D", desc: "단어 선택" },
];

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
    const [stdinInput, setStdinInput] = useState("");
    const [showStdin, setShowStdin] = useState(false);
    const [xpMsg, setXpMsg] = useState("");
    const [outputStatus, setOutputStatus] = useState<"idle" | "success" | "error">("idle");
    const editorRef = useRef<any>(null);
    const userId = user?.id || null;

    const { displayed: typedOutput, done: typingDone } = useTypingAnimation(rawOutput);

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

    return (
        <>
            <style>{`
                @keyframes orbit-spin { 0% { transform: rotateX(60deg) rotateZ(0deg); } 100% { transform: rotateX(60deg) rotateZ(360deg); } }
                @keyframes orbit-spin-rev { 0% { transform: rotateY(60deg) rotateZ(0deg); } 100% { transform: rotateY(60deg) rotateZ(-360deg); } }
                @keyframes pulse-glow { 0%, 100% { opacity: 0.6; box-shadow: 0 0 15px rgba(37,106,244,0.3); } 50% { opacity: 1; box-shadow: 0 0 25px rgba(6,182,212,0.6); } }
                @keyframes pillar-rise { 0% { height: 20%; } 100% { height: var(--target-h); } }
                @keyframes blink-cursor { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
                @keyframes cube-rotate { 0% { transform: rotateX(60deg) rotateZ(0deg); } 100% { transform: rotateX(60deg) rotateZ(360deg); } }
                .forge-glass { background: rgba(255,255,255,0.6); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(255,255,255,0.8); }
                .forge-grid-bg { background-image: linear-gradient(to right, rgba(37,106,244,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(37,106,244,0.03) 1px, transparent 1px); background-size: 60px 60px; }
                .hide-scrollbar::-webkit-scrollbar { display: none; } .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                .cube-face { position: absolute; width: 100%; height: 100%; background: rgba(37,106,244,0.05); border: 1px solid rgba(6,182,212,0.3); display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 10px rgba(6,182,212,0.1); }
                .preserve-3d { transform-style: preserve-3d; }
                .perspective-1000 { perspective: 1000px; }
                @media (max-width: 1024px) {
                    .forge-layout { flex-direction: column !important; }
                    .forge-sidebar { display: none !important; }
                    .forge-right { display: none !important; }
                }
            `}</style>

            <div style={{ position: "relative", display: "flex", flexDirection: "column", height: "calc(100vh - 120px)", overflow: "hidden" }}>
                {/* ── Ambient Background ── */}
                <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
                    <div className="forge-grid-bg" style={{ position: "absolute", inset: 0, opacity: 0.6, maskImage: "radial-gradient(circle at center, black 40%, transparent 100%)" }} />
                    <motion.div animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 8, repeat: Infinity }} style={{ position: "absolute", top: "-10%", left: "-10%", width: "50%", height: "50%", background: "rgba(37,106,244,0.05)", borderRadius: "50%", filter: "blur(120px)" }} />
                    <motion.div animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 10, repeat: Infinity, delay: 2 }} style={{ position: "absolute", bottom: "-10%", right: "-10%", width: "60%", height: "60%", background: "rgba(6,182,212,0.05)", borderRadius: "50%", filter: "blur(100px)" }} />
                </div>

                {/* ── Header Bar ── */}
                <div style={{ position: "relative", zIndex: 20, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", marginBottom: 12 }}>
                    <div className="forge-glass" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 16px", borderRadius: 999 }}>
                        <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #256af4, #06b6d4)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(37,106,244,0.3)" }}>
                            <MI icon="code_blocks" style={{ fontSize: 16, color: "#fff" }} />
                        </div>
                        <div>
                            <div style={{ fontSize: 11, fontWeight: 800, color: "#0f172a", letterSpacing: 1 }}>QUANTUM FORGE</div>
                            <div style={{ fontSize: 9, color: "#94a3b8", fontWeight: 500 }}>{config.label} · Wandbox Engine</div>
                        </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {/* XP Badge */}
                        <AnimatePresence>
                            {xpMsg && (
                                <motion.div initial={{ opacity: 0, y: -10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }}
                                    style={{ fontSize: 12, fontWeight: 800, color: "#059669", background: "linear-gradient(135deg, #dcfce7, #bbf7d0)", padding: "6px 16px", borderRadius: 12, border: "1px solid #86efac" }}
                                >{xpMsg}</motion.div>
                            )}
                        </AnimatePresence>

                        <div className="forge-glass" style={{ display: "flex", alignItems: "center", gap: 4, padding: 5, borderRadius: 999 }}>
                            {(["c", "python"] as const).map(l => (
                                <button key={l} onClick={() => switchLang(l)} style={{
                                    padding: "6px 14px", border: "none", borderRadius: 999, fontSize: 11, fontWeight: 700, cursor: "pointer",
                                    background: lang === l ? "#0f172a" : "transparent",
                                    color: lang === l ? "#fff" : "#64748b",
                                    transition: "all 0.25s",
                                }}>{LANG_CONFIG[l].icon} {LANG_CONFIG[l].label}</button>
                            ))}
                        </div>

                        <div style={{ width: 1, height: 20, background: "#e2e8f0", margin: "0 4px" }} />

                        <motion.button onClick={runCode} disabled={running}
                            whileHover={running ? {} : { scale: 1.04 }} whileTap={running ? {} : { scale: 0.96 }}
                            style={{
                                padding: "8px 20px", borderRadius: 999, border: "none", fontSize: 12, fontWeight: 800,
                                background: running ? "#94a3b8" : "#0f172a", color: "#fff",
                                cursor: running ? "not-allowed" : "pointer",
                                boxShadow: running ? "none" : "0 6px 20px rgba(15,23,42,0.2)",
                                display: "flex", alignItems: "center", gap: 6,
                            }}>
                            {running ? (
                                <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><MI icon="sync" style={{ fontSize: 16 }} /></motion.span> 컴파일 중...</>
                            ) : (
                                <><MI icon="play_arrow" style={{ fontSize: 16 }} /> RUN SIMULATION</>
                            )}
                        </motion.button>
                    </div>
                </div>

                {/* ── 3-Column Layout ── */}
                <div className="forge-layout" style={{ position: "relative", zIndex: 10, flex: 1, display: "flex", gap: 16, overflow: "hidden" }}>

                    {/* ═══ LEFT SIDEBAR: Objective Panel ═══ */}
                    <motion.aside className="forge-sidebar" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
                        style={{ width: 280, display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>

                        <div className="forge-glass" style={{ borderRadius: 20, padding: 20, flex: 1, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #256af4, #06b6d4, #256af4)", opacity: 0.5 }} />

                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                                <span style={{ fontSize: 11, fontWeight: 800, color: "#0f172a", letterSpacing: 1.5, textTransform: "uppercase" }}>Objective</span>
                                <span style={{ padding: "3px 10px", borderRadius: 6, background: "#f0fdf4", color: "#22c55e", fontSize: 9, fontWeight: 800, border: "1px solid #dcfce7" }}>ACTIVE</span>
                            </div>

                            <h3 style={{ fontSize: 17, fontWeight: 800, color: "#0f172a", lineHeight: 1.4, marginBottom: 12 }}>{lang === "c" ? "C언어 실습" : "Python 실습"}</h3>
                            <p style={{ fontSize: 12, color: "#64748b", lineHeight: 1.7, marginBottom: 20 }}>
                                코드를 작성하고 실행하여 결과를 확인하세요. 기초 문법부터 고급 패턴까지 자유롭게 실험할 수 있습니다.
                            </p>

                            {/* Formula box */}
                            <div style={{ padding: 14, borderRadius: 14, background: "#f8fafc", border: "1px solid #f1f5f9", marginBottom: 20, position: "relative", overflow: "hidden" }}>
                                <div style={{ position: "absolute", top: 8, right: 8, opacity: 0.15 }}>
                                    <MI icon="functions" style={{ fontSize: 36, color: "#94a3b8" }} />
                                </div>
                                <div style={{ fontSize: 9, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1.5, marginBottom: 6 }}>COMPILER</div>
                                <div style={{ fontSize: 14, color: "#334155", fontStyle: "italic" }}>{config.compiler}</div>
                            </div>

                            {/* Tasks */}
                            <div style={{ marginBottom: 16 }}>
                                <div style={{ fontSize: 10, fontWeight: 800, color: "#0f172a", letterSpacing: 1, marginBottom: 10, display: "flex", alignItems: "center", gap: 6 }}>
                                    <MI icon="checklist" style={{ fontSize: 14, color: "#256af4" }} /> TASKS
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                    {OBJECTIVE_TASKS.map((t, i) => (
                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, color: "#475569", cursor: "pointer" }}>
                                            <div style={{ width: 16, height: 16, borderRadius: 4, border: "1.5px solid #cbd5e1", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                                {t.done && <MI icon="check" style={{ fontSize: 10, color: "#256af4" }} />}
                                            </div>
                                            <span>{t.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ flex: 1 }} />

                            {/* Step indicator */}
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 10, color: "#94a3b8", borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
                                <span>Step 1 of 4</span>
                                <div style={{ display: "flex", gap: 3 }}>
                                    <div style={{ width: 20, height: 3, borderRadius: 999, background: "#256af4" }} />
                                    <div style={{ width: 6, height: 3, borderRadius: 999, background: "#e2e8f0" }} />
                                    <div style={{ width: 6, height: 3, borderRadius: 999, background: "#e2e8f0" }} />
                                    <div style={{ width: 6, height: 3, borderRadius: 999, background: "#e2e8f0" }} />
                                </div>
                            </div>
                        </div>

                        {/* AI Assistant Pill */}
                        <motion.div whileHover={{ y: -2 }} className="forge-glass" style={{ borderRadius: 14, padding: 10, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #a855f7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(99,102,241,0.3)" }}>
                                <MI icon="smart_toy" style={{ fontSize: 14, color: "#fff" }} />
                            </div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, fontWeight: 700, color: "#334155" }}>AI Assistant</div>
                                <div style={{ fontSize: 9, color: "#94a3b8" }}>Ready for questions...</div>
                            </div>
                            <MI icon="expand_less" style={{ fontSize: 18, color: "#94a3b8" }} />
                        </motion.div>
                    </motion.aside>

                    {/* ═══ CENTER: Code Editor ═══ */}
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
                        {/* Editor Container */}
                        <div style={{
                            flex: 1, borderRadius: 20, overflow: "hidden",
                            background: "rgba(255,255,255,0.8)", backdropFilter: "blur(20px)",
                            border: "1px solid rgba(255,255,255,0.6)",
                            boxShadow: "0 20px 40px -10px rgba(37,106,244,0.1)",
                            display: "flex", flexDirection: "column",
                            position: "relative",
                        }}>
                            {/* Tab Bar */}
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 16px", borderBottom: "1px solid rgba(241,245,249,0.8)", position: "relative", zIndex: 20 }}>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <div style={{
                                        padding: "8px 16px", borderRadius: 10, background: "#fff",
                                        border: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 6,
                                        fontSize: 11, fontWeight: 700, color: "#256af4",
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                                    }}>
                                        <MI icon="code" style={{ fontSize: 14 }} />
                                        {lang === "c" ? "main.c" : "main.py"}
                                    </div>

                                    {/* Template button */}
                                    <button onClick={() => setShowTemplates(!showTemplates)} style={{
                                        padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
                                        background: showTemplates ? "rgba(245,158,11,0.1)" : "rgba(255,255,255,0.4)",
                                        color: showTemplates ? "#d97706" : "#94a3b8", fontSize: 11, fontWeight: 600,
                                        display: "flex", alignItems: "center", gap: 4,
                                    }}>
                                        <MI icon="description" style={{ fontSize: 14 }} /> 템플릿
                                    </button>

                                    {/* Stdin button */}
                                    <button onClick={() => setShowStdin(!showStdin)} style={{
                                        padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
                                        background: showStdin ? "rgba(99,102,241,0.1)" : "rgba(255,255,255,0.4)",
                                        color: showStdin ? "#6366f1" : "#94a3b8", fontSize: 11, fontWeight: 600,
                                        display: "flex", alignItems: "center", gap: 4,
                                    }}>
                                        <MI icon="keyboard" style={{ fontSize: 14 }} /> 입력
                                    </button>

                                    {/* History button */}
                                    <button onClick={() => setShowHistory(!showHistory)} style={{
                                        padding: "8px 16px", borderRadius: 10, border: "none", cursor: "pointer",
                                        background: showHistory ? "rgba(14,165,233,0.1)" : "rgba(255,255,255,0.4)",
                                        color: showHistory ? "#0ea5e9" : "#94a3b8", fontSize: 11, fontWeight: 600,
                                        display: "flex", alignItems: "center", gap: 4,
                                    }}>
                                        <MI icon="history" style={{ fontSize: 14 }} /> 기록 ({history.length})
                                    </button>
                                </div>

                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    {execTime !== null && (
                                        <span style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>⏱ {execTime}ms</span>
                                    )}
                                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>
                                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "pulse-glow 2s infinite" }} />
                                        KERNEL ACTIVE
                                    </div>
                                </div>
                            </div>

                            {/* Expandable Panels */}
                            <AnimatePresence>
                                {showTemplates && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        style={{ overflow: "hidden", borderBottom: "1px solid #f1f5f9", padding: "12px 16px", background: "rgba(255,255,255,0.5)" }}>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: "#d97706", marginBottom: 8, letterSpacing: 0.5 }}>📝 코드 템플릿</div>
                                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                            {(CODE_TEMPLATES[lang] || []).map(t => (
                                                <motion.button key={t.label} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
                                                    onClick={() => { setCode(t.code); setShowTemplates(false); }}
                                                    style={{ padding: "6px 14px", borderRadius: 10, border: "1px solid #e2e8f0", background: "#fff", cursor: "pointer", fontSize: 11, fontWeight: 600, color: "#475569", display: "flex", alignItems: "center", gap: 4 }}>
                                                    <span>{t.icon}</span> {t.label}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                                {showStdin && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        style={{ overflow: "hidden", borderBottom: "1px solid #f1f5f9", padding: "12px 16px", background: "rgba(255,255,255,0.5)" }}>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: "#6366f1", marginBottom: 6 }}>⌨️ 표준 입력 (stdin)</div>
                                        <textarea value={stdinInput} onChange={e => setStdinInput(e.target.value)} placeholder="입력값을 작성하세요..."
                                            style={{ width: "100%", minHeight: 60, padding: 10, borderRadius: 10, border: "1px solid #e2e8f0", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, outline: "none", resize: "vertical", background: "#fafafa" }} />
                                    </motion.div>
                                )}
                                {showHistory && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                        style={{ overflow: "hidden", borderBottom: "1px solid #f1f5f9", padding: "12px 16px", background: "rgba(255,255,255,0.5)", maxHeight: 200, overflowY: "auto" }}>
                                        <div style={{ fontSize: 10, fontWeight: 800, color: "#0ea5e9", marginBottom: 8 }}>📜 제출 기록</div>
                                        {history.length === 0 ? (
                                            <p style={{ fontSize: 12, color: "#94a3b8", textAlign: "center", padding: 16 }}>아직 제출 기록이 없어요</p>
                                        ) : (
                                            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                                                {history.map(sub => (
                                                    <motion.button key={sub.id} whileHover={{ x: 4, backgroundColor: "#f0f9ff" }}
                                                        onClick={() => loadFromHistory(sub)} style={{
                                                            width: "100%", padding: "8px 12px", border: "1px solid #f1f5f9", borderRadius: 10,
                                                            background: "#fafafa", cursor: "pointer", textAlign: "left" as const,
                                                            display: "flex", justifyContent: "space-between", alignItems: "center",
                                                        }}>
                                                        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 6, background: sub.status === "success" ? "#dcfce7" : "#fee2e2", color: sub.status === "success" ? "#15803d" : "#dc2626" }}>
                                                                {sub.status === "success" ? "✓ 성공" : "✗ 에러"}
                                                            </span>
                                                            <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "#f1f5f9", color: "#64748b", fontWeight: 600 }}>
                                                                {LANG_CONFIG[sub.language || "c"]?.icon || "💻"}
                                                            </span>
                                                            <span style={{ fontSize: 10, color: "#64748b", fontFamily: "'JetBrains Mono', monospace", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
                                                                {sub.code.substring(0, 40)}...
                                                            </span>
                                                        </div>
                                                        <span style={{ fontSize: 9, color: "#94a3b8", whiteSpace: "nowrap" }}>
                                                            {new Date(sub.created_at).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                                        </span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Monaco Editor */}
                            <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
                                <Editor
                                    height="100%"
                                    language={config.monacoLang}
                                    value={code}
                                    onChange={val => setCode(val || "")}
                                    onMount={handleEditorMount}
                                    theme="vs-dark"
                                    options={{
                                        fontSize: 14,
                                        fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace",
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
                                {/* Decorative spinning rings */}
                                <div style={{ position: "absolute", right: 30, top: "30%", width: 100, height: 100, borderRadius: "50%", border: "1px solid rgba(37,106,244,0.1)", animation: "orbit-spin 20s linear infinite", pointerEvents: "none", opacity: 0.3 }} />
                                <div style={{ position: "absolute", right: 30, top: "30%", width: 100, height: 100, borderRadius: "50%", border: "1px dashed rgba(6,182,212,0.15)", animation: "orbit-spin-rev 15s linear infinite", pointerEvents: "none", opacity: 0.2 }} />
                            </div>
                        </div>

                        {/* Bottom Status Bar */}
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 4px", marginTop: 8 }}>
                            <div style={{ display: "flex", gap: 8 }}>
                                <div className="forge-glass" style={{ padding: "5px 12px", borderRadius: 999, display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#64748b" }}>
                                    <MI icon="terminal" style={{ fontSize: 14 }} /> Console Ready
                                </div>
                                {execTime !== null && (
                                    <div className="forge-glass" style={{ padding: "5px 12px", borderRadius: 999, display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#64748b" }}>
                                        <MI icon="memory" style={{ fontSize: 14 }} /> {execTime}ms Execution
                                    </div>
                                )}
                            </div>
                            <div className="forge-glass" style={{ padding: "5px 12px", borderRadius: 999, display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "#64748b", cursor: "pointer" }}>
                                <MI icon="keyboard" style={{ fontSize: 14 }} /> Shortcuts
                            </div>
                        </div>
                    </div>

                    {/* ═══ RIGHT SIDEBAR: Q-Sphere + Probabilities ═══ */}
                    <motion.aside className="forge-right" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        style={{ width: 280, display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}>

                        {/* Quantum Processor Cube */}
                        <div className="forge-glass" style={{ flex: 2, borderRadius: 20, position: "relative", overflow: "hidden", display: "flex", flexDirection: "column" }}>
                            {/* Holographic grid overlay */}
                            <div style={{
                                position: "absolute", inset: 0, opacity: 0.08, pointerEvents: "none",
                                backgroundImage: "linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)",
                                backgroundSize: "20px 20px",
                            }} />
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(37,106,244,0.03), transparent, rgba(6,182,212,0.03))", pointerEvents: "none" }} />

                            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.5)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "relative", zIndex: 10 }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(74,222,128,0.5)", animation: "pulse-glow 2s infinite" }} />
                                    <span style={{ fontSize: 9, fontWeight: 800, color: "#334155", letterSpacing: 1.5, textTransform: "uppercase" }}>Quantum Processor</span>
                                </div>
                                <div style={{ fontSize: 8, color: "#94a3b8", fontFamily: "'JetBrains Mono', monospace" }}>
                                    QPU-7X <MI icon="settings" style={{ fontSize: 12, color: "#94a3b8", animation: "orbit-spin 15s linear infinite" }} />
                                </div>
                            </div>

                            {/* 3D Cube Visual */}
                            <div className="perspective-1000" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                                {/* Glow effect */}
                                <div style={{ position: "absolute", width: 80, height: 80, background: "rgba(37,106,244,0.15)", borderRadius: "50%", filter: "blur(30px)", animation: "pulse-glow 3s infinite" }} />

                                <div className="preserve-3d" style={{ width: 120, height: 120, position: "relative", animation: "cube-rotate 20s linear infinite" }}>
                                    {/* Cube faces using CSS */}
                                    <div className="cube-face" style={{ transform: "translateZ(40px)" }} />
                                    <div className="cube-face" style={{ transform: "translateZ(-40px)" }} />
                                    <div className="cube-face" style={{ transform: "rotateY(90deg) translateZ(40px)" }} />
                                    <div className="cube-face" style={{ transform: "rotateY(-90deg) translateZ(40px)" }} />
                                    <div className="cube-face" style={{ transform: "rotateX(90deg) translateZ(40px)" }} />
                                    <div className="cube-face" style={{ transform: "rotateX(-90deg) translateZ(40px)" }} />

                                    {/* Inner glow core */}
                                    <div style={{
                                        position: "absolute", top: "50%", left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        width: 30, height: 30, borderRadius: "50%",
                                        background: "radial-gradient(circle, #06b6d4, #256af4)",
                                        filter: "blur(4px)", boxShadow: "0 0 25px #06b6d4",
                                        animation: "pulse-glow 2s infinite",
                                    }} />
                                </div>

                                {/* Status label */}
                                <div style={{ position: "absolute", bottom: 12, width: "100%", textAlign: "center", zIndex: 10 }}>
                                    <span style={{
                                        fontSize: 8, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 2,
                                        color: "#06b6d4", background: "rgba(255,255,255,0.4)", padding: "4px 12px",
                                        borderRadius: 999, backdropFilter: "blur(4px)", border: "1px solid rgba(255,255,255,0.5)",
                                    }}>
                                        {running ? "PROCESSING" : outputStatus === "success" ? "COMPLETE" : outputStatus === "error" ? "ERROR" : "IDLE"}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Probability Amplitude Bars */}
                        <div className="forge-glass" style={{ flex: 1, borderRadius: 20, padding: 14, display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
                            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent, rgba(15,23,42,0.02))", pointerEvents: "none" }} />

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, position: "relative", zIndex: 10 }}>
                                <span style={{ fontSize: 9, fontWeight: 800, color: "#334155", letterSpacing: 1.5, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 4 }}>
                                    <MI icon="bar_chart_4_bars" style={{ fontSize: 14, color: "#06b6d4" }} /> Probability
                                </span>
                                <div style={{ display: "flex", gap: 2 }}>
                                    {[0, 0.2, 0.4].map(d => (
                                        <div key={d} style={{ width: 3, height: 3, borderRadius: "50%", background: "#06b6d4", animation: "pulse-glow 2s infinite", animationDelay: `${d}s` }} />
                                    ))}
                                </div>
                            </div>

                            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", justifyContent: "space-around", gap: 12, paddingBottom: 4, position: "relative", zIndex: 10 }}>
                                {PROB_STATES.map((s, i) => (
                                    <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, width: "100%", height: "100%", justifyContent: "flex-end" }}>
                                        <div style={{ fontSize: 9, fontWeight: 800, color: s.pct > 10 ? "#256af4" : "#94a3b8", opacity: 0.8 }}>{s.pct}%</div>
                                        <div style={{ width: "100%", position: "relative", height: "100%" }}>
                                            <motion.div
                                                initial={{ height: "5%" }}
                                                animate={{ height: `${Math.max(5, s.pct)}%` }}
                                                transition={{ duration: 2, ease: "easeInOut", delay: i * 0.2 }}
                                                style={{
                                                    position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
                                                    width: 32, borderRadius: "6px 6px 0 0",
                                                    background: s.pct > 10 ? `linear-gradient(to top, rgba(37,106,244,0.8), rgba(6,182,212,0.8))` : "rgba(203,213,225,0.3)",
                                                    boxShadow: s.pct > 10 ? "0 0 15px rgba(37,106,244,0.3)" : "none",
                                                    backdropFilter: "blur(4px)",
                                                    border: "1px solid rgba(255,255,255,0.3)",
                                                    borderBottom: "none",
                                                }}
                                            >
                                                {s.pct > 10 && <div style={{ position: "absolute", top: 0, width: "100%", height: 2, background: "rgba(255,255,255,0.5)", filter: "blur(1px)" }} />}
                                            </motion.div>
                                        </div>
                                        <span style={{ fontSize: 9, color: "#64748b", fontFamily: "'JetBrains Mono', monospace", letterSpacing: 1, background: s.pct > 10 ? "rgba(255,255,255,0.5)" : "transparent", padding: "2px 6px", borderRadius: 4, backdropFilter: "blur(4px)" }}>{s.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Output Terminal (mini) */}
                        <div style={{
                            flex: 1, borderRadius: 20, overflow: "hidden",
                            background: "#0a0e1a", display: "flex", flexDirection: "column",
                            border: "1px solid #1e293b",
                        }}>
                            <div style={{ padding: "8px 14px", background: "#0f172a", borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", gap: 6, fontSize: 10 }}>
                                <MI icon="terminal" style={{ fontSize: 14, color: "#64748b" }} />
                                <span style={{ color: "#94a3b8", fontWeight: 600 }}>터미널 출력</span>
                                <div style={{ flex: 1 }} />
                                <AnimatePresence>
                                    {outputStatus !== "idle" && (
                                        <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                            style={{
                                                fontSize: 8, fontWeight: 800, padding: "2px 8px", borderRadius: 20,
                                                background: outputStatus === "success" ? "rgba(34,197,94,0.15)" : "rgba(239,68,68,0.15)",
                                                color: outputStatus === "success" ? "#4ade80" : "#f87171",
                                                display: "flex", alignItems: "center", gap: 3,
                                            }}>
                                            <span style={{ width: 4, height: 4, borderRadius: "50%", background: outputStatus === "success" ? "#4ade80" : "#f87171" }} />
                                            {outputStatus === "success" ? "SUCCESS" : "ERROR"}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className="hide-scrollbar" style={{ flex: 1, padding: 12, overflow: "auto" }}>
                                {running ? (
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b" }}>
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            style={{ width: 12, height: 12, border: "2px solid #334155", borderTopColor: "#0ea5e9", borderRadius: "50%" }} />
                                        <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>컴파일 중...</span>
                                    </div>
                                ) : rawOutput ? (
                                    <pre style={{
                                        margin: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 11, lineHeight: 1.6,
                                        color: outputStatus === "error" ? "#f87171" : "#a7f3d0",
                                        whiteSpace: "pre-wrap", wordBreak: "break-all",
                                    }}>
                                        <span style={{ color: "#475569", userSelect: "none" }}>{outputStatus === "success" ? "$ " : "stderr: "}</span>
                                        {typedOutput}
                                        {!typingDone && (
                                            <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }}
                                                style={{ color: "#0ea5e9", fontWeight: 700 }}>▌</motion.span>
                                        )}
                                    </pre>
                                ) : (
                                    <div style={{ color: "#334155", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.8 }}>
                                        <span style={{ color: "#475569" }}>$</span> <span style={{ color: "#64748b" }}>코드를 실행하세요</span><br />
                                        <span style={{ color: "#475569" }}>$</span> <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ color: "#0ea5e9" }}>▌</motion.span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>
        </>
    );
}
