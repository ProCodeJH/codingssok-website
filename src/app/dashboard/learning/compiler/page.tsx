"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { awardXP, XP_REWARDS } from "@/lib/xp-engine";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import "./compiler.css";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

/* ═══════════════════════════════════════════
   C-Studio Web IDE — Full Port
   VSCode-style layout + 3D code flow effects
   ═══════════════════════════════════════════ */

/* ── Code Templates ── */
const C_DEFAULT = `#include <stdio.h>

int main() {
    printf("Hello, 코딩쏙!\\n");

    int a = 10;
    int b = 20;
    int sum = a + b;

    printf("%d + %d = %d\\n", a, b, sum);

    return 0;
}`;

const PY_DEFAULT = `# 파이썬 코딩쏙
name = "코딩쏙"
print(f"Hello, {name}!")

numbers = [1, 2, 3, 4, 5]
total = sum(numbers)
print(f"합계: {total}")
print(f"평균: {total / len(numbers):.1f}")`;

interface FileTab { id: string; name: string; content: string; lang: string; modified: boolean; }

const TEMPLATES: Record<string, { label: string; code: string }[]> = {
    c: [
        { label: "Hello World", code: C_DEFAULT },
        { label: "배열 & 반복문", code: `#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int sum = 0;\n\n    for (int i = 0; i < 5; i++) {\n        printf("arr[%d] = %d\\n", i, arr[i]);\n        sum += arr[i];\n    }\n\n    printf("합계: %d\\n", sum);\n    printf("평균: %.1f\\n", (float)sum / 5);\n    return 0;\n}` },
        { label: "포인터 기초", code: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *p = &x;\n\n    printf("x의 값: %d\\n", x);\n    printf("x의 주소: %p\\n", (void*)&x);\n    printf("p가 가리키는 값: %d\\n", *p);\n\n    *p = 100;\n    printf("변경 후 x: %d\\n", x);\n    return 0;\n}` },
        { label: "구조체", code: `#include <stdio.h>\n\ntypedef struct {\n    char name[20];\n    int age;\n    float score;\n} Student;\n\nint main() {\n    Student s = {"홍길동", 18, 95.5};\n    printf("이름: %s\\n", s.name);\n    printf("나이: %d\\n", s.age);\n    printf("점수: %.1f\\n", s.score);\n    return 0;\n}` },
    ],
    python: [
        { label: "Hello World", code: PY_DEFAULT },
        { label: "리스트 & 딕셔너리", code: `# 리스트와 딕셔너리\nfruits = ["사과", "바나나", "딸기"]\nfor i, fruit in enumerate(fruits):\n    print(f"{i+1}. {fruit}")\n\nstudent = {"이름": "홍길동", "나이": 18, "점수": 95.5}\nfor key, value in student.items():\n    print(f"{key}: {value}")` },
        { label: "함수 & 클래스", code: `# 함수 정의\ndef factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nfor i in range(1, 8):\n    print(f"{i}! = {factorial(i)}")\n\n# 클래스 정의\nclass Animal:\n    def __init__(self, name, sound):\n        self.name = name\n        self.sound = sound\n    def speak(self):\n        print(f"{self.name}: {self.sound}!")\n\ncat = Animal("고양이", "야옹")\ndog = Animal("강아지", "멍멍")\ncat.speak()\ndog.speak()` },
    ],
};

const LANG_CFG: Record<string, { label: string; compiler: string; monacoLang: string; ext: string; options: Record<string, string> }> = {
    c: { label: "C", compiler: "gcc-head", monacoLang: "c", ext: ".c", options: { options: "warning", "compiler-option-raw": "-std=c11" } },
    python: { label: "Python", compiler: "cpython-3.12.0", monacoLang: "python", ext: ".py", options: {} },
};

/* ── Code Rain Snippets ── */
const CODE_SNIPPETS = [
    "int main(){", "printf()", "#include", "return 0;", "for(i=0;", "while(1)", "if(x>0)", "char*p;",
    "malloc()", "sizeof()", "struct{}", "void f()", "&ptr", "*arr", "break;", "switch(c)",
];

/* ── Icons ── */
function MI({ icon, style, className }: { icon: string; style?: React.CSSProperties; className?: string }) {
    return <span className={`material-symbols-outlined ${className || ""}`} style={{ fontSize: 16, ...style }}>{icon}</span>;
}

/* ── Typing Animation ── */
function useTyping(text: string, speed = 8) {
    const [d, setD] = useState("");
    const [done, setDone] = useState(false);
    useEffect(() => {
        if (!text) { setD(""); setDone(true); return; }
        setDone(false); setD(""); let i = 0;
        const iv = setInterval(() => { i += Math.max(1, Math.floor(text.length / 80)); if (i >= text.length) { setD(text); setDone(true); clearInterval(iv); } else setD(text.slice(0, i)); }, speed);
        return () => clearInterval(iv);
    }, [text, speed]);
    return { displayed: d, done };
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */
export default function CompilerPage() {
    const { user } = useAuth();
    const supabase = useMemo(() => createClient(), []);
    const userId = user?.id || null;

    // Tabs
    const [tabs, setTabs] = useState<FileTab[]>([{ id: "1", name: "main.c", content: C_DEFAULT, lang: "c", modified: false }]);
    const [activeTabId, setActiveTabId] = useState("1");
    const [tabCounter, setTabCounter] = useState(2);
    const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
    const lang = activeTab?.lang || "c";
    const config = LANG_CFG[lang];

    // Compile state
    const [running, setRunning] = useState(false);
    const [output, setOutput] = useState("");
    const [outputStatus, setOutputStatus] = useState<"idle" | "success" | "error">("idle");
    const [execTime, setExecTime] = useState<number | null>(null);
    const [stdinInput, setStdinInput] = useState("");

    // UI state
    const [showSidebar, setShowSidebar] = useState(true);
    const [showRight, setShowRight] = useState(true);
    const [showTerminal, setShowTerminal] = useState(true);
    const [termH, setTermH] = useState(200);
    const [showTemplates, setShowTemplates] = useState(false);
    const [showStdin, setShowStdin] = useState(false);
    const [showPalette, setShowPalette] = useState(false);
    const [showShortcuts, setShowShortcuts] = useState(false);
    const [xpMsg, setXpMsg] = useState("");
    const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string }[]>([]);
    const [compileCount, setCompileCount] = useState(() => parseInt(localStorage.getItem("cs-compile-count") || "0"));
    const [theme] = useState<"dark">("dark");
    const editorRef = useRef<any>(null);
    const { displayed: typedOutput, done: typingDone } = useTyping(output);

    // History
    const [history, setHistory] = useState<{ id: string; code: string; output: string; status: string; created_at: string; language?: string }[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    useEffect(() => { localStorage.setItem("cs-compile-count", String(compileCount)); }, [compileCount]);

    const fetchHistory = useCallback(async () => {
        if (!userId) return;
        try { const { data } = await supabase.from("code_submissions").select("*").eq("user_id", userId).order("created_at", { ascending: false }).limit(20); setHistory(data || []); } catch {}
    }, [userId, supabase]);
    useEffect(() => { if (userId) fetchHistory(); }, [userId, fetchHistory]);

    // Tab operations
    const updateCode = (val: string | undefined) => {
        const v = val || "";
        setTabs(prev => prev.map(t => t.id === activeTabId ? { ...t, content: v, modified: t.content !== v } : t));
    };
    const newFile = () => {
        const id = String(tabCounter);
        setTabs(p => [...p, { id, name: `Untitled-${tabCounter}.c`, content: C_DEFAULT, lang: "c", modified: false }]);
        setActiveTabId(id); setTabCounter(p => p + 1);
    };
    const closeTab = (id: string) => {
        const idx = tabs.findIndex(t => t.id === id);
        setTabs(p => p.filter(t => t.id !== id));
        if (activeTabId === id) { const next = tabs[idx - 1] || tabs[idx + 1]; if (next) setActiveTabId(next.id); }
    };
    const switchLang = (newLang: string) => {
        const code = newLang === "c" ? C_DEFAULT : PY_DEFAULT;
        setTabs(p => p.map(t => t.id === activeTabId ? { ...t, lang: newLang, name: `main${LANG_CFG[newLang].ext}`, content: code, modified: false } : t));
        setOutput(""); setOutputStatus("idle"); setExecTime(null);
    };

    // Compile & Run
    const runCode = useCallback(async () => {
        if (!activeTab) return;
        setRunning(true); setOutput(""); setOutputStatus("idle"); setExecTime(null); setShowTerminal(true);
        const cfg = LANG_CFG[activeTab.lang];
        const t0 = performance.now();
        let res = "", stat = "success";
        try {
            const r = await fetch("https://wandbox.org/api/compile.json", {
                method: "POST", headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code: activeTab.content, compiler: cfg.compiler, ...cfg.options, stdin: stdinInput }),
            });
            const d = await r.json();
            if (d.compiler_error) { res = d.compiler_error; stat = "compile_error"; }
            else if (d.program_error) { res = d.program_error; stat = "runtime_error"; }
            else { res = d.program_output || "(출력 없음)"; stat = "success"; }
        } catch { res = "서버 연결 실패. 잠시 후 다시 시도해주세요."; stat = "error"; }
        const elapsed = Math.round(performance.now() - t0);
        setExecTime(elapsed); setOutputStatus(stat === "success" ? "success" : "error"); setOutput(res); setRunning(false);
        setCompileCount(p => p + 1);

        // Particle burst on success
        if (stat === "success") {
            const ps = Array.from({ length: 12 }, (_, i) => ({
                id: Date.now() + i, x: 50 + Math.random() * 60, y: 50 + Math.random() * 40,
                color: ["#a6e3a1", "#89b4fa", "#94e2d5", "#f9e2af"][i % 4],
            }));
            setParticles(ps); setTimeout(() => setParticles([]), 1000);
        }

        if (userId) {
            try {
                await supabase.from("code_submissions").insert({ user_id: userId, language: activeTab.lang, code: activeTab.content, output: res, status: stat });
                fetchHistory();
                if (stat === "success") { await awardXP(userId, XP_REWARDS.code_submit, "코드 실행 성공", "terminal"); setXpMsg(`+${XP_REWARDS.code_submit} XP!`); setTimeout(() => setXpMsg(""), 3000); }
            } catch {}
        }
    }, [activeTab, stdinInput, userId, supabase, fetchHistory]);

    const handleEditorMount = (editor: any) => {
        editorRef.current = editor;
        editor.addAction({ id: "run-code", label: "Run Code", keybindings: [2048 | 3], run: () => runCode() });
    };

    // Keyboard shortcuts
    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "P") { e.preventDefault(); setShowPalette(p => !p); }
            if ((e.ctrlKey || e.metaKey) && e.key === "n") { e.preventDefault(); newFile(); }
            if (e.key === "F5") { e.preventDefault(); runCode(); }
            if ((e.ctrlKey || e.metaKey) && e.key === "`") { e.preventDefault(); setShowTerminal(p => !p); }
        };
        window.addEventListener("keydown", h); return () => window.removeEventListener("keydown", h);
    }, [runCode]);

    // Code rain columns
    const rainCols = useMemo(() => Array.from({ length: 20 }, (_, i) => ({
        left: `${(i / 20) * 100}%`, delay: Math.random() * 10, duration: 8 + Math.random() * 12,
        text: CODE_SNIPPETS[i % CODE_SNIPPETS.length],
    })), []);

    return (
        <div className="cs-ide">
            {/* ── Title Bar ── */}
            <div className="cs-titlebar">
                <div className="cs-titlebar-brand">
                    <div className="cs-titlebar-logo"><MI icon="code" style={{ fontSize: 12, color: "#fff" }} /></div>
                    <span className="cs-titlebar-name">C-STUDIO</span>
                    <span style={{ color: "var(--cs-border)" }}>·</span>
                    <span className="cs-titlebar-file">{activeTab?.name || "Untitled"}</span>
                </div>
                <div className="cs-titlebar-actions">
                    {(["c", "python"] as const).map(l => (
                        <button key={l} className="cs-titlebar-btn" onClick={() => switchLang(l)}
                            style={lang === l ? { background: "var(--cs-accent)", color: "var(--cs-bg)" } : {}}>
                            {LANG_CFG[l].label}
                        </button>
                    ))}
                    <div style={{ width: 1, height: 14, background: "var(--cs-border)", margin: "0 4px" }} />
                    <button className="cs-titlebar-btn" onClick={() => setShowSidebar(p => !p)}><MI icon="side_navigation" style={{ fontSize: 14 }} /></button>
                    <button className="cs-titlebar-btn" onClick={() => setShowRight(p => !p)}><MI icon="right_panel_open" style={{ fontSize: 14 }} /></button>
                    <button className="cs-titlebar-btn" onClick={() => setShowShortcuts(p => !p)}><MI icon="keyboard" style={{ fontSize: 14 }} /></button>
                </div>
            </div>

            <div className="cs-body">
                {/* ── Left Sidebar ── */}
                {showSidebar && (
                    <motion.div className="cs-sidebar" initial={{ width: 0, opacity: 0 }} animate={{ width: 260, opacity: 1 }} exit={{ width: 0, opacity: 0 }}>
                        <div className="cs-sidebar-header">
                            <span>탐색기</span>
                            <button className="cs-titlebar-btn" onClick={newFile}><MI icon="add" style={{ fontSize: 14 }} /></button>
                        </div>
                        <div className="cs-sidebar-section">
                            <div className="cs-sidebar-label">열린 파일</div>
                            {tabs.map(t => (
                                <div key={t.id} className={`cs-file-item ${t.id === activeTabId ? "active" : ""}`} onClick={() => setActiveTabId(t.id)}>
                                    <MI icon={t.lang === "c" ? "code" : "data_object"} className="cs-file-icon" style={{ color: t.lang === "c" ? "#89b4fa" : "#f9e2af" }} />
                                    <span style={{ flex: 1 }}>{t.name}</span>
                                    {t.modified && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--cs-accent)" }} />}
                                </div>
                            ))}
                        </div>
                        <div className="cs-sidebar-section">
                            <div className="cs-sidebar-label">템플릿</div>
                            {(TEMPLATES[lang] || []).map(t => (
                                <div key={t.label} className="cs-file-item" onClick={() => { updateCode(t.code); setShowTemplates(false); }}>
                                    <MI icon="description" className="cs-file-icon" style={{ color: "var(--cs-text-dim)" }} />
                                    <span>{t.label}</span>
                                </div>
                            ))}
                        </div>
                        {/* Stats */}
                        <div style={{ marginTop: "auto", padding: 14, borderTop: "1px solid var(--cs-border)" }}>
                            <div style={{ fontSize: 9, color: "var(--cs-text-dim)", fontWeight: 700, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>Stats</div>
                            <div style={{ display: "flex", gap: 8 }}>
                                <div style={{ flex: 1, padding: 8, borderRadius: 8, background: "var(--cs-surface)", textAlign: "center" }}>
                                    <div style={{ fontSize: 16, fontWeight: 800, color: "var(--cs-accent)" }}>{compileCount}</div>
                                    <div style={{ fontSize: 8, color: "var(--cs-text-dim)" }}>컴파일</div>
                                </div>
                                <div style={{ flex: 1, padding: 8, borderRadius: 8, background: "var(--cs-surface)", textAlign: "center" }}>
                                    <div style={{ fontSize: 16, fontWeight: 800, color: "var(--cs-green)" }}>{history.filter(h => h.status === "success").length}</div>
                                    <div style={{ fontSize: 8, color: "var(--cs-text-dim)" }}>성공</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* ── Main Editor Area ── */}
                <div className="cs-main">
                    {/* Toolbar */}
                    <div className="cs-toolbar">
                        <motion.button className="cs-tool-btn primary" onClick={runCode} disabled={running} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                            {running ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}><MI icon="sync" style={{ fontSize: 14 }} /></motion.span> 컴파일 중...</>
                                : <><MI icon="play_arrow" style={{ fontSize: 14 }} /> 실행 (F5)</>}
                        </motion.button>
                        <div className="cs-tool-divider" />
                        <button className="cs-tool-btn" onClick={newFile}><MI icon="note_add" style={{ fontSize: 14 }} /> 새 파일</button>
                        <button className="cs-tool-btn" onClick={() => setShowStdin(p => !p)} style={showStdin ? { color: "var(--cs-accent)" } : {}}>
                            <MI icon="keyboard" style={{ fontSize: 14 }} /> 입력
                        </button>
                        <button className="cs-tool-btn" onClick={() => setShowHistory(p => !p)} style={showHistory ? { color: "var(--cs-cyan)" } : {}}>
                            <MI icon="history" style={{ fontSize: 14 }} /> 기록 ({history.length})
                        </button>
                        <button className="cs-tool-btn" onClick={() => setShowPalette(p => !p)}><MI icon="search" style={{ fontSize: 14 }} /> 명령 팔레트</button>
                        <div style={{ flex: 1 }} />
                        <AnimatePresence>
                            {xpMsg && (
                                <motion.div initial={{ opacity: 0, y: -10, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20 }}
                                    style={{ fontSize: 11, fontWeight: 800, color: "var(--cs-green)", background: "rgba(166,227,161,0.15)", padding: "4px 12px", borderRadius: 8, border: "1px solid rgba(166,227,161,0.3)" }}>
                                    {xpMsg}
                                </motion.div>
                            )}
                        </AnimatePresence>
                        {execTime !== null && <span style={{ fontSize: 10, fontWeight: 700, color: "var(--cs-text-dim)", fontFamily: "'JetBrains Mono', monospace" }}>⏱ {execTime}ms</span>}
                    </div>

                    {/* Tabs */}
                    <div className="cs-tabs">
                        {tabs.map(t => (
                            <button key={t.id} className={`cs-tab ${t.id === activeTabId ? "active" : ""}`} onClick={() => setActiveTabId(t.id)}>
                                <span className="cs-tab-dot" style={{ background: t.lang === "c" ? "var(--cs-accent)" : "var(--cs-yellow)" }} />
                                {t.name}
                                {t.modified && <span style={{ color: "var(--cs-accent)", fontSize: 14, lineHeight: 1 }}>●</span>}
                                {tabs.length > 1 && <span className="cs-tab-close" onClick={e => { e.stopPropagation(); closeTab(t.id); }}>✕</span>}
                            </button>
                        ))}
                    </div>

                    {/* Expandable stdin/history panels */}
                    <AnimatePresence>
                        {showStdin && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: "hidden", borderBottom: "1px solid var(--cs-border)", padding: "10px 14px", background: "var(--cs-surface)" }}>
                                <div style={{ fontSize: 10, fontWeight: 800, color: "var(--cs-accent)", marginBottom: 6, letterSpacing: 0.5 }}>⌨ 표준 입력 (stdin)</div>
                                <textarea value={stdinInput} onChange={e => setStdinInput(e.target.value)} placeholder="입력값을 작성하세요..."
                                    style={{ width: "100%", minHeight: 50, padding: 10, borderRadius: 8, border: "1px solid var(--cs-border)", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, outline: "none", resize: "vertical", background: "var(--cs-bg)", color: "var(--cs-text)" }} />
                            </motion.div>
                        )}
                        {showHistory && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                style={{ overflow: "hidden", borderBottom: "1px solid var(--cs-border)", padding: "10px 14px", background: "var(--cs-surface)", maxHeight: 180, overflowY: "auto" }}>
                                <div style={{ fontSize: 10, fontWeight: 800, color: "var(--cs-cyan)", marginBottom: 8 }}>제출 기록</div>
                                {history.length === 0 ? <p style={{ fontSize: 12, color: "var(--cs-text-dim)", textAlign: "center", padding: 12 }}>아직 기록이 없어요</p> :
                                    <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                        {history.slice(0, 10).map(s => (
                                            <button key={s.id} onClick={() => { updateCode(s.code); setOutput(s.output); setOutputStatus(s.status === "success" ? "success" : "error"); setShowHistory(false); }}
                                                style={{ width: "100%", padding: "6px 10px", border: "1px solid var(--cs-border)", borderRadius: 6, background: "var(--cs-bg)", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", color: "var(--cs-text)" }}>
                                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                                    <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: s.status === "success" ? "rgba(166,227,161,0.15)" : "rgba(243,139,168,0.15)", color: s.status === "success" ? "var(--cs-green)" : "var(--cs-red)" }}>
                                                        {s.status === "success" ? "✓" : "✗"}
                                                    </span>
                                                    <span style={{ fontSize: 10, color: "var(--cs-text-dim)", fontFamily: "'JetBrains Mono'", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
                                                        {s.code.substring(0, 40)}...
                                                    </span>
                                                </div>
                                                <span style={{ fontSize: 9, color: "var(--cs-text-dim)", whiteSpace: "nowrap" }}>
                                                    {new Date(s.created_at).toLocaleString("ko-KR", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                                                </span>
                                            </button>
                                        ))}
                                    </div>}
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Editor */}
                    <div className="cs-editor-area">
                        {/* Code Rain Background */}
                        <div className="cs-code-rain">
                            {rainCols.map((c, i) => (
                                <div key={i} className="cs-code-rain-col" style={{ left: c.left, animationDuration: `${c.duration}s`, animationDelay: `${c.delay}s` }}>{c.text}</div>
                            ))}
                        </div>
                        <Editor
                            height="100%" language={config.monacoLang} value={activeTab?.content || ""}
                            onChange={updateCode} onMount={handleEditorMount} theme="vs-dark"
                            options={{
                                fontSize: 14, fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', monospace", fontLigatures: true,
                                minimap: { enabled: true, maxColumn: 60 }, scrollBeyondLastLine: false, lineNumbers: "on",
                                renderLineHighlight: "all", roundedSelection: true, padding: { top: 16, bottom: 16 },
                                automaticLayout: true, tabSize: 4, wordWrap: "off", bracketPairColorization: { enabled: true },
                                guides: { bracketPairs: true, indentation: true }, suggest: { showKeywords: true, showSnippets: true },
                                cursorBlinking: "expand", cursorSmoothCaretAnimation: "on", smoothScrolling: true,
                                scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
                            }}
                        />
                        {/* Compile Pipeline Animation */}
                        {running && <div className="cs-pipeline"><div className="cs-pipeline-bar" /></div>}
                    </div>

                    {/* Terminal */}
                    {showTerminal && (
                        <div className="cs-terminal-area" style={{ height: termH }}>
                            <div className="cs-terminal-header">
                                <div className="cs-terminal-tab active" style={{ color: "var(--cs-accent)" }}>
                                    <MI icon="terminal" style={{ fontSize: 12 }} /> 터미널
                                </div>
                                <div style={{ flex: 1 }} />
                                <AnimatePresence>
                                    {outputStatus !== "idle" && (
                                        <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                                            style={{ fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 20, background: outputStatus === "success" ? "rgba(166,227,161,0.15)" : "rgba(243,139,168,0.15)", color: outputStatus === "success" ? "var(--cs-green)" : "var(--cs-red)", display: "flex", alignItems: "center", gap: 3 }}>
                                            <span className="cs-status-dot" style={{ background: outputStatus === "success" ? "var(--cs-green)" : "var(--cs-red)" }} />
                                            {outputStatus === "success" ? "SUCCESS" : "ERROR"}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                <button className="cs-titlebar-btn" onClick={() => { setOutput(""); setOutputStatus("idle"); }}><MI icon="delete" style={{ fontSize: 13 }} /></button>
                                <button className="cs-titlebar-btn" onClick={() => setShowTerminal(false)}><MI icon="close" style={{ fontSize: 13 }} /></button>
                            </div>
                            <div className="cs-terminal-body" style={{ position: "relative" }}>
                                <div className="cs-holo-scan" />
                                {running ? (
                                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            style={{ width: 12, height: 12, border: "2px solid var(--cs-border)", borderTopColor: "var(--cs-accent)", borderRadius: "50%" }} />
                                        <span className="cs-terminal-line info">컴파일 중...</span>
                                    </div>
                                ) : output ? (
                                    <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
                                        <span className="cs-terminal-prompt">{outputStatus === "success" ? "$ " : "stderr: "}</span>
                                        <span className={`cs-terminal-line ${outputStatus === "error" ? "error" : ""}`}>{typedOutput}</span>
                                        {!typingDone && <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.6 }} style={{ color: "var(--cs-accent)", fontWeight: 700 }}>▌</motion.span>}
                                    </pre>
                                ) : (
                                    <div className="cs-terminal-line" style={{ color: "var(--cs-text-dim)" }}>
                                        <span className="cs-terminal-prompt">$ </span>코드를 실행하세요 (F5)
                                        <br /><span className="cs-terminal-prompt">$ </span><motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} style={{ color: "var(--cs-accent)" }}>▌</motion.span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* ── Right Sidebar ── */}
                {showRight && (
                    <motion.div className="cs-right" initial={{ width: 0, opacity: 0 }} animate={{ width: 280, opacity: 1 }} exit={{ width: 0, opacity: 0 }}>
                        {/* 3D Cube Processor */}
                        <div className="cs-right-section" style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 20 }}>
                            <div className="cs-right-title"><MI icon="memory" style={{ fontSize: 12, color: "var(--cs-cyan)" }} /> PROCESSOR</div>
                            <div className="cs-cube-wrap">
                                <div className="cs-cube" style={running ? { animationDuration: "1s" } : {}}>
                                    <div className="cs-cube-face" style={{ transform: "translateZ(25px)" }}>{running ? "⚡" : "◈"}</div>
                                    <div className="cs-cube-face" style={{ transform: "translateZ(-25px)" }}>{"{}"}</div>
                                    <div className="cs-cube-face" style={{ transform: "rotateY(90deg) translateZ(25px)" }}>01</div>
                                    <div className="cs-cube-face" style={{ transform: "rotateY(-90deg) translateZ(25px)" }}>{"<>"}</div>
                                    <div className="cs-cube-face" style={{ transform: "rotateX(90deg) translateZ(25px)" }}>*p</div>
                                    <div className="cs-cube-face" style={{ transform: "rotateX(-90deg) translateZ(25px)" }}>#</div>
                                </div>
                            </div>
                            <div style={{ marginTop: 10, fontSize: 8, fontFamily: "'JetBrains Mono'", letterSpacing: 2, color: running ? "var(--cs-cyan)" : "var(--cs-text-dim)", textTransform: "uppercase" }} className={running ? "cs-pulse" : ""}>
                                {running ? "PROCESSING" : outputStatus === "success" ? "COMPLETE" : outputStatus === "error" ? "ERROR" : "IDLE"}
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="cs-right-section">
                            <div className="cs-right-title"><MI icon="info" style={{ fontSize: 12, color: "var(--cs-accent)" }} /> INFO</div>
                            {[
                                { label: "언어", value: config.label, color: "var(--cs-accent)" },
                                { label: "컴파일러", value: config.compiler, color: "var(--cs-text-dim)" },
                                { label: "라인", value: `${(activeTab?.content || "").split("\n").length}`, color: "var(--cs-yellow)" },
                                { label: "크기", value: `${new Blob([activeTab?.content || ""]).size} B`, color: "var(--cs-orange)" },
                            ].map(item => (
                                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 11 }}>
                                    <span style={{ color: "var(--cs-text-dim)" }}>{item.label}</span>
                                    <span style={{ color: item.color, fontFamily: "'JetBrains Mono'", fontWeight: 600 }}>{item.value}</span>
                                </div>
                            ))}
                        </div>

                        {/* Shortcuts */}
                        <div className="cs-right-section">
                            <div className="cs-right-title"><MI icon="keyboard" style={{ fontSize: 12, color: "var(--cs-pink)" }} /> 단축키</div>
                            {[
                                { keys: "F5", desc: "실행" }, { keys: "Ctrl+N", desc: "새 파일" },
                                { keys: "Ctrl+Enter", desc: "실행" }, { keys: "Ctrl+`", desc: "터미널" },
                                { keys: "Ctrl+/", desc: "주석" }, { keys: "Ctrl+Shift+P", desc: "팔레트" },
                            ].map(s => (
                                <div key={s.keys} style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 10, color: "var(--cs-text-dim)" }}>
                                    <span>{s.desc}</span>
                                    <kbd style={{ fontSize: 9, padding: "1px 6px", borderRadius: 4, background: "var(--cs-bg)", border: "1px solid var(--cs-border)", color: "var(--cs-text)", fontFamily: "'JetBrains Mono'" }}>{s.keys}</kbd>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </div>

            {/* ── Status Bar ── */}
            <div className="cs-statusbar">
                <div className="cs-status-group">
                    <div className="cs-status-item"><span className="cs-status-dot cs-pulse" style={{ background: "var(--cs-green)" }} /> Ready</div>
                    <div className="cs-status-item">Ln {(activeTab?.content || "").split("\n").length}</div>
                    <div className="cs-status-item">{config.label}</div>
                    <div className="cs-status-item">UTF-8</div>
                </div>
                <div className="cs-status-group">
                    <div className="cs-status-item">Wandbox Engine</div>
                    <div className="cs-status-item">C-Studio Web</div>
                </div>
            </div>

            {/* ── Particles ── */}
            {particles.map(p => (
                <div key={p.id} className="cs-particle" style={{ left: `${p.x}%`, top: `${p.y}%`, background: p.color, "--px": `${(Math.random() - 0.5) * 100}px`, "--py": `${(Math.random() - 0.5) * 100}px` } as React.CSSProperties} />
            ))}

            {/* ── Command Palette ── */}
            <AnimatePresence>
                {showPalette && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPalette(false)}
                        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", justifyContent: "center", paddingTop: 80 }}>
                        <motion.div initial={{ y: -20, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: -20, scale: 0.95 }} onClick={e => e.stopPropagation()}
                            style={{ width: 500, maxHeight: 400, background: "var(--cs-surface)", border: "1px solid var(--cs-border)", borderRadius: 12, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}>
                            <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--cs-border)", display: "flex", alignItems: "center", gap: 8 }}>
                                <MI icon="search" style={{ fontSize: 16, color: "var(--cs-text-dim)" }} />
                                <span style={{ fontSize: 12, color: "var(--cs-text-dim)" }}>명령어를 입력하세요...</span>
                            </div>
                            <div style={{ padding: 8 }}>
                                {[
                                    { label: "실행 (F5)", icon: "play_arrow", action: () => { runCode(); setShowPalette(false); } },
                                    { label: "새 파일 (Ctrl+N)", icon: "note_add", action: () => { newFile(); setShowPalette(false); } },
                                    { label: "터미널 토글 (Ctrl+`)", icon: "terminal", action: () => { setShowTerminal(p => !p); setShowPalette(false); } },
                                    { label: "사이드바 토글", icon: "side_navigation", action: () => { setShowSidebar(p => !p); setShowPalette(false); } },
                                    { label: "C언어로 전환", icon: "code", action: () => { switchLang("c"); setShowPalette(false); } },
                                    { label: "Python으로 전환", icon: "data_object", action: () => { switchLang("python"); setShowPalette(false); } },
                                ].map(cmd => (
                                    <button key={cmd.label} onClick={cmd.action}
                                        style={{ width: "100%", padding: "8px 12px", border: "none", borderRadius: 6, background: "transparent", color: "var(--cs-text)", cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 8, fontSize: 12, transition: "background 0.1s" }}
                                        onMouseEnter={e => (e.currentTarget.style.background = "var(--cs-bg-lighter)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                                        <MI icon={cmd.icon} style={{ fontSize: 14, color: "var(--cs-accent)" }} /> {cmd.label}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
