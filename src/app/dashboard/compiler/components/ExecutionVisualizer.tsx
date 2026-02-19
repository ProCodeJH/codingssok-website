"use client";
import { useState, useEffect, useCallback, useMemo } from "react";

interface ExecutionStep {
    line: number; code: string; variables: Record<string, string | number>;
    output: string; description: string;
}

export function simulateExecution(code: string): ExecutionStep[] {
    const lines = code.split("\n");
    const steps: ExecutionStep[] = [];
    const vars: Record<string, string | number> = {};
    let output = "";

    for (let i = 0; i < lines.length; i++) {
        const trimmed = lines[i].trim();
        if (!trimmed || trimmed.startsWith("//") || trimmed.startsWith("#include") || trimmed === "{" || trimmed === "}") continue;

        // int declaration
        const intDecl = trimmed.match(/int\s+(\w+)\s*=\s*(\d+)/);
        if (intDecl) {
            vars[intDecl[1]] = parseInt(intDecl[2]);
            steps.push({ line: i + 1, code: trimmed, variables: { ...vars }, output, description: `변수 ${intDecl[1]}에 ${intDecl[2]} 할당` });
            continue;
        }
        const intOnly = trimmed.match(/int\s+(\w+)\s*;/);
        if (intOnly) {
            vars[intOnly[1]] = 0;
            steps.push({ line: i + 1, code: trimmed, variables: { ...vars }, output, description: `변수 ${intOnly[1]} 선언 (초기값 0)` });
            continue;
        }
        // assignment
        const assign = trimmed.match(/(\w+)\s*=\s*(.+);/);
        if (assign && !trimmed.includes("scanf")) {
            const expr = assign[2].trim();
            let evalVal: string | number = expr;
            // Simple a + b, a - b evaluation
            const arith = expr.match(/(\w+)\s*([+\-*/])\s*(\w+)/);
            if (arith) {
                const left = vars[arith[1]] !== undefined ? Number(vars[arith[1]]) : parseInt(arith[1]);
                const right = vars[arith[3]] !== undefined ? Number(vars[arith[3]]) : parseInt(arith[3]);
                if (!isNaN(left) && !isNaN(right)) {
                    switch (arith[2]) {
                        case "+": evalVal = left + right; break;
                        case "-": evalVal = left - right; break;
                        case "*": evalVal = left * right; break;
                        case "/": evalVal = right !== 0 ? Math.floor(left / right) : "Err"; break;
                    }
                }
            }
            vars[assign[1]] = evalVal;
            steps.push({ line: i + 1, code: trimmed, variables: { ...vars }, output, description: `${assign[1]} = ${evalVal}` });
            continue;
        }
        // printf
        const printfMatch = trimmed.match(/printf\("([^"]*)"(.*)\)/);
        if (printfMatch) {
            let fmt = printfMatch[1].replace(/\\n/g, "\n");
            const args = printfMatch[2] ? printfMatch[2].split(",").map(a => a.trim()).filter(Boolean) : [];
            let argIdx = 0;
            fmt = fmt.replace(/%d|%lld|%s|%c|%f/g, () => {
                if (argIdx < args.length) {
                    const v = vars[args[argIdx]] !== undefined ? String(vars[args[argIdx]]) : args[argIdx];
                    argIdx++;
                    return v;
                }
                return "?";
            });
            output += fmt;
            steps.push({ line: i + 1, code: trimmed, variables: { ...vars }, output, description: `출력: "${fmt.trim()}"` });
            continue;
        }
        // return
        if (trimmed.startsWith("return")) {
            steps.push({ line: i + 1, code: trimmed, variables: { ...vars }, output, description: "프로그램 종료" });
            continue;
        }
        // int main / function entry
        if (trimmed.includes("int main")) {
            steps.push({ line: i + 1, code: trimmed, variables: { ...vars }, output, description: "main 함수 진입" });
            continue;
        }
        // generic line
        if (trimmed.length > 2) {
            steps.push({ line: i + 1, code: trimmed, variables: { ...vars }, output, description: `실행: ${trimmed}` });
        }
    }
    return steps;
}

interface Props {
    code: string;
}

export function ExecutionVisualizer({ code }: Props) {
    const steps = useMemo(() => simulateExecution(code), [code]);
    const [current, setCurrent] = useState(0);
    const [playing, setPlaying] = useState(false);

    useEffect(() => { setCurrent(0); setPlaying(false); }, [code]);

    useEffect(() => {
        if (!playing || current >= steps.length - 1) { setPlaying(false); return; }
        const t = setTimeout(() => setCurrent(c => c + 1), 800);
        return () => clearTimeout(t);
    }, [playing, current, steps.length]);

    const step = steps[current];
    const border = "rgba(255,255,255,0.06)";

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${border}`, background: "rgba(34,197,94,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>▶️ 실행 시각화</span>
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>{steps.length > 0 ? `${current + 1} / ${steps.length}` : "0 steps"}</span>
                </div>
            </div>

            {steps.length === 0 ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
                    <div style={{ textAlign: "center" }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>▶️</div>
                        코드를 작성하면 실행 흐름을<br />단계별로 확인할 수 있습니다
                    </div>
                </div>
            ) : (
                <>
                    {/* Controls */}
                    <div style={{ padding: "8px 16px", borderBottom: `1px solid ${border}`, display: "flex", gap: 6, alignItems: "center" }}>
                        <button onClick={() => setCurrent(0)} style={{ padding: "4px 8px", borderRadius: 4, border: `1px solid ${border}`, background: "transparent", color: "#ccc", fontSize: 11, cursor: "pointer" }}>⏮</button>
                        <button onClick={() => setCurrent(c => Math.max(0, c - 1))} style={{ padding: "4px 8px", borderRadius: 4, border: `1px solid ${border}`, background: "transparent", color: "#ccc", fontSize: 11, cursor: "pointer" }}>◀</button>
                        <button onClick={() => setPlaying(!playing)} style={{ padding: "4px 12px", borderRadius: 4, border: "none", background: playing ? "#ef4444" : "#22c55e", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{playing ? "⏸ 일시정지" : "▶ 재생"}</button>
                        <button onClick={() => setCurrent(c => Math.min(steps.length - 1, c + 1))} style={{ padding: "4px 8px", borderRadius: 4, border: `1px solid ${border}`, background: "transparent", color: "#ccc", fontSize: 11, cursor: "pointer" }}>▶</button>
                        <button onClick={() => setCurrent(steps.length - 1)} style={{ padding: "4px 8px", borderRadius: 4, border: `1px solid ${border}`, background: "transparent", color: "#ccc", fontSize: 11, cursor: "pointer" }}>⏭</button>
                    </div>
                    {/* Progress */}
                    <div style={{ height: 3, background: "rgba(255,255,255,0.03)" }}>
                        <div style={{ height: "100%", width: `${((current + 1) / steps.length) * 100}%`, background: "#22c55e", transition: "width 0.3s" }} />
                    </div>

                    <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
                        {step && (
                            <>
                                {/* Current line */}
                                <div style={{ padding: 10, background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: 8, marginBottom: 12 }}>
                                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4 }}>Line {step.line}</div>
                                    <code style={{ fontSize: 12, color: "#a5d6ff", fontFamily: "monospace" }}>{step.code}</code>
                                    <div style={{ fontSize: 11, color: "#86efac", marginTop: 6 }}>💡 {step.description}</div>
                                </div>

                                {/* Variables */}
                                <div style={{ marginBottom: 12 }}>
                                    <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 6 }}>변수 상태</div>
                                    {Object.entries(step.variables).length === 0 ? (
                                        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", padding: 8 }}>선언된 변수 없음</div>
                                    ) : (
                                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                            {Object.entries(step.variables).map(([k, v]) => (
                                                <div key={k} style={{ padding: "4px 8px", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.2)", borderRadius: 6, fontSize: 11, fontFamily: "monospace" }}>
                                                    <span style={{ color: "#c4b5fd" }}>{k}</span> = <span style={{ color: "#fbbf24" }}>{String(v)}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Output */}
                                <div>
                                    <div style={{ fontSize: 10, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", marginBottom: 6 }}>출력</div>
                                    <div style={{ padding: 8, background: "rgba(0,0,0,0.3)", borderRadius: 6, fontFamily: "monospace", fontSize: 11, color: "#86efac", minHeight: 30, whiteSpace: "pre-wrap" }}>{step.output || "(출력 없음)"}</div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}
