"use client";
import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const LANG_OPTIONS = [
    { value: "c", label: "C", ext: ".c", default: '#include <stdio.h>\n\nint main() {\n    printf("Hello!\\n");\n    return 0;\n}' },
    { value: "python", label: "Python", ext: ".py", default: '# Python\nprint("Hello!")' },
    { value: "cpp", label: "C++", ext: ".cpp", default: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello!" << endl;\n    return 0;\n}' },
    { value: "javascript", label: "JS", ext: ".js", default: 'console.log("Hello!");' },
];

type ThemeMode = "dark" | "light";

const THEME_STYLES: Record<ThemeMode, {
    editorTheme: string;
    headerBg: string; headerBorder: string;
    langActiveBg: string; langActiveColor: string; langColor: string;
    stdinBg: string; stdinBorder: string; stdinLabel: string;
    termBg: string; termBorder: string; termText: string; termError: string; termMuted: string;
    contextBg: string; contextColor: string;
    inputBg: string; inputBorder: string; inputBtn: string; inputBtnActive: string;
}> = {
    dark: {
        editorTheme: "vs-dark",
        headerBg: "#1e1e2e", headerBorder: "#2a2a3e",
        langActiveBg: "#fff", langActiveColor: "#0f172a", langColor: "#64748b",
        stdinBg: "#1a1a2e", stdinBorder: "#fde68a40", stdinLabel: "#fbbf24",
        termBg: "#0f172a", termBorder: "#1e293b", termText: "#e2e8f0", termError: "#fca5a5", termMuted: "#475569",
        contextBg: "#161625", contextColor: "#64748b",
        inputBg: "#1e1e2e", inputBorder: "#334155", inputBtn: "#334155", inputBtnActive: "#3b82f6",
    },
    light: {
        editorTheme: "light",
        headerBg: "#fafafa", headerBorder: "#e2e8f0",
        langActiveBg: "#0f172a", langActiveColor: "#fff", langColor: "#94a3b8",
        stdinBg: "#fffbeb", stdinBorder: "#fde68a", stdinLabel: "#b45309",
        termBg: "#f8fafc", termBorder: "#e2e8f0", termText: "#1e293b", termError: "#dc2626", termMuted: "#94a3b8",
        contextBg: "#f1f5f9", contextColor: "#94a3b8",
        inputBg: "#fff", inputBorder: "#e2e8f0", inputBtn: "#e2e8f0", inputBtnActive: "#dbeafe",
    },
};

interface Props {
    contextLabel?: string;
    onCodeRun?: () => void;
}

export default function MiniCodeEditor({ contextLabel, onCodeRun }: Props) {
    const [lang, setLang] = useState("c");
    const [code, setCode] = useState(LANG_OPTIONS[0].default);
    const [stdin, setStdin] = useState("");
    const [output, setOutput] = useState("");
    const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
    const [execTime, setExecTime] = useState<number | null>(null);
    const [showStdin, setShowStdin] = useState(false);
    const [theme, setTheme] = useState<ThemeMode>(() => {
        if (typeof window === "undefined") return "dark";
        return (localStorage.getItem("codingssok_mini_theme") as ThemeMode) || "dark";
    });
    const editorRef = useRef<unknown>(null);

    const t = THEME_STYLES[theme];

    // 테마 저장
    useEffect(() => {
        if (typeof window !== "undefined") localStorage.setItem("codingssok_mini_theme", theme);
    }, [theme]);

    // 코드 저장/복원
    const storageKey = `codingssok_mini_editor_${lang}`;
    useEffect(() => {
        if (typeof window === "undefined") return;
        const saved = localStorage.getItem(storageKey);
        if (saved) setCode(saved);
    }, [storageKey]);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const timer = setTimeout(() => { localStorage.setItem(storageKey, code); }, 500);
        return () => clearTimeout(timer);
    }, [code, storageKey]);

    const switchLang = (newLang: string) => {
        localStorage.setItem(storageKey, code);
        setLang(newLang);
        const opt = LANG_OPTIONS.find(l => l.value === newLang);
        const saved = localStorage.getItem(`codingssok_mini_editor_${newLang}`);
        setCode(saved || opt?.default || "");
        setOutput("");
        setStatus("idle");
    };

    const runCode = useCallback(async () => {
        setStatus("running");
        setOutput("");
        setExecTime(null);
        const t0 = performance.now();
        try {
            const res = await fetch("/api/compile", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code, language: lang, stdin }),
            });
            const data = await res.json();
            const ms = Math.round(performance.now() - t0);
            setExecTime(ms);
            if (!data.success) {
                setOutput(data.stderr || data.error || "오류 발생");
                setStatus("error");
            } else {
                setOutput(data.stdout || "(출력 없음)");
                setStatus("success");
                onCodeRun?.();
            }
        } catch {
            setOutput("서버 연결 실패");
            setStatus("error");
            setExecTime(Math.round(performance.now() - t0));
        }
    }, [code, lang, stdin, onCodeRun]);

    const statusColor = status === "success" ? "#22c55e" : status === "error" ? "#ef4444" : "#94a3b8";

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
            {/* 헤더 */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "8px 12px", borderBottom: `1px solid ${t.headerBorder}`, background: t.headerBg,
            }}>
                {/* 언어 선택 */}
                <div style={{ display: "flex", gap: 3 }}>
                    {LANG_OPTIONS.map(opt => (
                        <button key={opt.value} onClick={() => switchLang(opt.value)} style={{
                            padding: "3px 8px", borderRadius: 6, border: "none", cursor: "pointer",
                            fontSize: 10, fontWeight: lang === opt.value ? 800 : 500,
                            background: lang === opt.value ? t.langActiveBg : "transparent",
                            color: lang === opt.value ? t.langActiveColor : t.langColor,
                        }}>
                            {opt.label}
                        </button>
                    ))}
                </div>

                {/* 테마 + 실행 */}
                <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {/* 테마 토글 */}
                    <button
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        title={theme === "dark" ? "라이트 모드" : "다크 모드"}
                        style={{
                            padding: "3px 6px", borderRadius: 5, border: `1px solid ${t.inputBorder}`,
                            background: t.inputBg, cursor: "pointer", fontSize: 12, lineHeight: 1,
                            color: t.langColor, display: "flex", alignItems: "center",
                        }}
                    >
                        {theme === "dark" ? "☀️" : "🌙"}
                    </button>
                    <button
                        onClick={() => setShowStdin(!showStdin)}
                        title="입력(stdin)"
                        style={{
                            padding: "3px 6px", borderRadius: 5, border: `1px solid ${t.inputBorder}`,
                            background: showStdin ? t.inputBtnActive : t.inputBg, cursor: "pointer",
                            fontSize: 10, color: showStdin ? "#2563eb" : t.langColor,
                        }}
                    >
                        입력
                    </button>
                    <button
                        onClick={runCode}
                        disabled={status === "running"}
                        style={{
                            padding: "4px 12px", borderRadius: 6, border: "none", cursor: "pointer",
                            background: status === "running" ? "#94a3b8" : "linear-gradient(135deg, #22c55e, #16a34a)",
                            color: "#fff", fontSize: 10, fontWeight: 700,
                            display: "flex", alignItems: "center", gap: 4,
                        }}
                    >
                        {status === "running" ? "실행 중..." : "▶ 실행"}
                    </button>
                </div>
            </div>

            {/* 컨텍스트 라벨 */}
            {contextLabel && (
                <div style={{
                    padding: "4px 12px", fontSize: 9, color: t.contextColor, fontWeight: 600,
                    background: t.contextBg, borderBottom: `1px solid ${t.headerBorder}`,
                }}>
                    학습 중: {contextLabel}
                </div>
            )}

            {/* stdin */}
            {showStdin && (
                <div style={{ padding: "6px 12px", borderBottom: `1px solid ${t.headerBorder}`, background: t.stdinBg }}>
                    <div style={{ fontSize: 9, color: t.stdinLabel, fontWeight: 700, marginBottom: 4 }}>입력 (stdin)</div>
                    <textarea
                        value={stdin}
                        onChange={e => setStdin(e.target.value)}
                        placeholder="프로그램 입력값..."
                        rows={2}
                        style={{
                            width: "100%", resize: "vertical", padding: "6px 8px",
                            borderRadius: 6, border: `1px solid ${t.stdinBorder}`, fontSize: 11,
                            fontFamily: "'JetBrains Mono', monospace", background: t.inputBg,
                            color: t.termText, outline: "none",
                        }}
                    />
                </div>
            )}

            {/* 코드 에디터 */}
            <div style={{ flex: 1, minHeight: 180 }}>
                <Editor
                    height="100%"
                    language={lang === "c" ? "c" : lang === "cpp" ? "cpp" : lang}
                    value={code}
                    onChange={v => setCode(v || "")}
                    theme={t.editorTheme}
                    options={{
                        fontSize: 12,
                        lineHeight: 18,
                        minimap: { enabled: false },
                        scrollBeyondLastLine: false,
                        padding: { top: 8, bottom: 8 },
                        lineNumbers: "on",
                        lineNumbersMinChars: 3,
                        folding: false,
                        wordWrap: "on",
                        automaticLayout: true,
                        tabSize: 4,
                        renderWhitespace: "none",
                        overviewRulerBorder: false,
                        hideCursorInOverviewRuler: true,
                        scrollbar: { verticalScrollbarSize: 6, horizontalScrollbarSize: 6 },
                    }}
                    onMount={(editor) => { editorRef.current = editor; }}
                />
            </div>

            {/* 출력 (터미널) */}
            <div style={{
                borderTop: `1px solid ${t.termBorder}`,
                background: t.termBg,
                minHeight: 60,
                maxHeight: 140,
                overflowY: "auto",
            }}>
                {/* 출력 헤더 */}
                <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "4px 10px", borderBottom: `1px solid ${t.termBorder}`,
                }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: statusColor }} />
                        <span style={{ fontSize: 9, color: t.termMuted, fontWeight: 600 }}>출력</span>
                    </div>
                    {execTime !== null && (
                        <span style={{ fontSize: 9, color: t.termMuted }}>{execTime}ms</span>
                    )}
                </div>

                {/* 출력 내용 */}
                <pre style={{
                    margin: 0, padding: "8px 10px",
                    fontSize: 11, lineHeight: 1.5,
                    fontFamily: "'JetBrains Mono', monospace",
                    color: status === "error" ? t.termError : t.termText,
                    whiteSpace: "pre-wrap", wordBreak: "break-all",
                }}>
                    {status === "running" ? "실행 중..." : output || (status === "idle" ? "▶ 실행 버튼을 눌러보세요" : "")}
                </pre>
            </div>
        </div>
    );
}
