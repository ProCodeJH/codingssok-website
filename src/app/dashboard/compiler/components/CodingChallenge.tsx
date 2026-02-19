"use client";
import { useState } from "react";

interface Challenge {
    id: string; title: string; difficulty: "easy" | "medium" | "hard";
    points: number; category: string; description: string; starterCode: string;
    testCases: { input: string; expected: string }[]; hints: string[]; solution?: string;
}

const CHALLENGES: Challenge[] = [
    {
        id: "1", title: "두 수의 합", difficulty: "easy", points: 100, category: "기본",
        description: "두 정수 a와 b를 입력받아 합을 출력하세요.",
        starterCode: `#include <stdio.h>\n\nint main() {\n    int a, b;\n    // 여기에 코드를 작성하세요\n    \n    return 0;\n}`,
        testCases: [{ input: "3 5", expected: "8" }, { input: "10 20", expected: "30" }, { input: "-5 5", expected: "0" }],
        hints: ["scanf()로 두 수를 입력받으세요", "printf()로 결과를 출력하세요"],
        solution: `#include <stdio.h>\n\nint main() {\n    int a, b;\n    scanf("%d %d", &a, &b);\n    printf("%d", a + b);\n    return 0;\n}`
    },
    {
        id: "2", title: "짝수 홀수 판별", difficulty: "easy", points: 100, category: "조건문",
        description: '정수를 입력받아 짝수면 "Even", 홀수면 "Odd"를 출력하세요.',
        starterCode: `#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    // 여기에 코드를 작성하세요\n    \n    return 0;\n}`,
        testCases: [{ input: "4", expected: "Even" }, { input: "7", expected: "Odd" }, { input: "0", expected: "Even" }],
        hints: ["% 연산자로 나머지를 구할 수 있습니다", "if-else 문을 사용하세요"],
        solution: `#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    if (n % 2 == 0) printf("Even");\n    else printf("Odd");\n    return 0;\n}`
    },
    {
        id: "3", title: "팩토리얼", difficulty: "medium", points: 200, category: "반복문",
        description: "정수 n을 입력받아 n!을 계산하여 출력하세요.",
        starterCode: `#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    // 여기에 코드를 작성하세요\n    \n    return 0;\n}`,
        testCases: [{ input: "5", expected: "120" }, { input: "0", expected: "1" }, { input: "10", expected: "3628800" }],
        hints: ["for 반복문을 사용하세요", "0! = 1 입니다"],
        solution: `#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    long long result = 1;\n    for (int i = 1; i <= n; i++) result *= i;\n    printf("%lld", result);\n    return 0;\n}`
    },
    {
        id: "4", title: "피보나치 수열", difficulty: "medium", points: 250, category: "재귀",
        description: "n번째 피보나치 수를 출력하세요. (F(0)=0, F(1)=1)",
        starterCode: `#include <stdio.h>\n\nint fibonacci(int n) {\n    // 재귀 함수를 구현하세요\n}\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    printf("%d", fibonacci(n));\n    return 0;\n}`,
        testCases: [{ input: "6", expected: "8" }, { input: "10", expected: "55" }, { input: "0", expected: "0" }],
        hints: ["F(n) = F(n-1) + F(n-2)", "기저 조건(base case)을 먼저 처리하세요"],
        solution: `#include <stdio.h>\n\nint fibonacci(int n) {\n    if (n <= 1) return n;\n    return fibonacci(n-1) + fibonacci(n-2);\n}\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    printf("%d", fibonacci(n));\n    return 0;\n}`
    },
    {
        id: "5", title: "배열 최댓값", difficulty: "easy", points: 150, category: "배열",
        description: "n개의 정수 중 최댓값을 찾아 출력하세요.",
        starterCode: `#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    int arr[100];\n    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n    // 최댓값을 찾아 출력하세요\n    \n    return 0;\n}`,
        testCases: [{ input: "5\n1 5 3 2 4", expected: "5" }, { input: "3\n-1 -5 -2", expected: "-1" }, { input: "1\n42", expected: "42" }],
        hints: ["첫 번째 요소를 최댓값으로 가정하고 시작하세요", "더 큰 값을 찾으면 업데이트하세요"],
        solution: `#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    int arr[100];\n    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n    int max = arr[0];\n    for (int i = 1; i < n; i++) if (arr[i] > max) max = arr[i];\n    printf("%d", max);\n    return 0;\n}`
    },
    {
        id: "6", title: "문자열 뒤집기", difficulty: "medium", points: 200, category: "문자열",
        description: "입력받은 문자열을 뒤집어 출력하세요.",
        starterCode: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[100];\n    scanf("%s", str);\n    // 문자열을 뒤집어 출력하세요\n    \n    return 0;\n}`,
        testCases: [{ input: "hello", expected: "olleh" }, { input: "abc", expected: "cba" }, { input: "x", expected: "x" }],
        hints: ["strlen()으로 길이를 구하세요", "끝에서부터 출력하거나, swap으로 뒤집으세요"],
        solution: `#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[100];\n    scanf("%s", str);\n    int len = strlen(str);\n    for (int i = len - 1; i >= 0; i--) printf("%c", str[i]);\n    return 0;\n}`
    },
    {
        id: "7", title: "소수 판별", difficulty: "medium", points: 200, category: "수학",
        description: '주어진 수가 소수면 "Prime", 아니면 "Not Prime"을 출력하세요.',
        starterCode: `#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    // 소수인지 판별하세요\n    \n    return 0;\n}`,
        testCases: [{ input: "7", expected: "Prime" }, { input: "12", expected: "Not Prime" }, { input: "2", expected: "Prime" }],
        hints: ["2부터 n-1까지 나누어보세요", "제곱근까지만 검사해도 됩니다"],
        solution: `#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    if (n < 2) { printf("Not Prime"); return 0; }\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) { printf("Not Prime"); return 0; }\n    }\n    printf("Prime");\n    return 0;\n}`
    },
    {
        id: "8", title: "버블 정렬", difficulty: "hard", points: 300, category: "알고리즘",
        description: "n개의 정수를 버블 정렬로 오름차순 정렬하여 출력하세요.",
        starterCode: `#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    int arr[100];\n    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n    // 버블 정렬을 구현하세요\n    \n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    return 0;\n}`,
        testCases: [{ input: "5\n5 3 1 4 2", expected: "1 2 3 4 5" }, { input: "3\n3 2 1", expected: "1 2 3" }],
        hints: ["이중 반복문을 사용하세요", "인접한 두 원소를 비교하여 교환하세요"],
        solution: `#include <stdio.h>\n\nint main() {\n    int n;\n    scanf("%d", &n);\n    int arr[100];\n    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) { int t=arr[j]; arr[j]=arr[j+1]; arr[j+1]=t; }\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    return 0;\n}`
    }
];

interface CodingChallengeProps { onLoadCode?: (code: string) => void }

export function CodingChallenge({ onLoadCode }: CodingChallengeProps) {
    const [sel, setSel] = useState<Challenge | null>(null);
    const [showSol, setShowSol] = useState(false);
    const [showHints, setShowHints] = useState(false);
    const [completed, setCompleted] = useState<Set<string>>(new Set());
    const [totalPts, setTotalPts] = useState(0);

    const diffColor = (d: string) => d === "easy" ? "#22c55e" : d === "medium" ? "#f59e0b" : "#f85149";

    const start = (c: Challenge) => { setSel(c); setShowSol(false); setShowHints(false); onLoadCode?.(c.starterCode); };
    const complete = () => {
        if (sel && !completed.has(sel.id)) { setCompleted(p => new Set(p).add(sel.id)); setTotalPts(p => p + sel.points); }
    };

    const bg2 = "#252320"; const border = "rgba(255,255,255,0.06)";

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${border}`, background: "rgba(245,158,11,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>🏆 코딩 챌린지</span>
                <span style={{ padding: "4px 12px", background: "rgba(245,158,11,0.15)", border: "1px solid rgba(245,158,11,0.3)", borderRadius: 16, fontSize: 13, fontWeight: 700, color: "#f59e0b" }}>⭐ {totalPts} pts</span>
            </div>

            {sel ? (
                <div style={{ flex: 1, overflowY: "auto", padding: 16 }}>
                    <div onClick={() => setSel(null)} style={{ cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>← 목록으로</div>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: `${diffColor(sel.difficulty)}20`, color: diffColor(sel.difficulty), textTransform: "uppercase" }}>{sel.difficulty} • {sel.points}pts</span>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: "8px 0" }}>{sel.title}</h3>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6, padding: 12, background: "rgba(0,0,0,0.2)", borderRadius: 8 }}>{sel.description}</p>

                    <div style={{ marginTop: 16 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8 }}>테스트 케이스</div>
                        {sel.testCases.map((tc, i) => (
                            <div key={i} style={{ display: "flex", gap: 16, padding: 10, background: "rgba(0,0,0,0.15)", borderRadius: 8, marginBottom: 6, fontFamily: "monospace", fontSize: 12 }}>
                                <div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>입력</div><div style={{ color: "#a5d6ff" }}>{tc.input}</div></div>
                                <div><div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)" }}>출력</div><div style={{ color: "#a5d6ff" }}>{tc.expected}</div></div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
                        <button onClick={() => onLoadCode?.(sel.starterCode)} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", background: "linear-gradient(135deg,#f59e0b,#ea580c)", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>에디터에 로드</button>
                        <button onClick={() => setShowHints(!showHints)} style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${border}`, background: bg2, color: "#ccc", fontSize: 12, cursor: "pointer" }}>💡 힌트</button>
                        <button onClick={() => setShowSol(!showSol)} style={{ flex: 1, padding: 10, borderRadius: 8, border: `1px solid ${border}`, background: bg2, color: "#ccc", fontSize: 12, cursor: "pointer" }}>👀 정답</button>
                    </div>

                    {showHints && (
                        <div style={{ marginTop: 10, padding: 12, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8 }}>
                            {sel.hints.map((h, i) => <div key={i} style={{ fontSize: 12, color: "#93c5fd", marginBottom: 6 }}>💡 {h}</div>)}
                        </div>
                    )}
                    {showSol && (
                        <div style={{ marginTop: 10, padding: 12, background: "rgba(0,0,0,0.25)", borderRadius: 8 }}>
                            <pre style={{ fontFamily: "monospace", fontSize: 12, color: "#a5d6ff", margin: 0, whiteSpace: "pre-wrap" }}>{sel.solution}</pre>
                        </div>
                    )}

                    <button onClick={complete} disabled={completed.has(sel.id)} style={{ marginTop: 16, width: "100%", padding: 12, borderRadius: 8, border: "none", background: completed.has(sel.id) ? "#333" : "linear-gradient(135deg,#22c55e,#16a34a)", color: "#fff", fontWeight: 700, fontSize: 13, cursor: completed.has(sel.id) ? "default" : "pointer" }}>
                        {completed.has(sel.id) ? "✅ 완료됨!" : "완료로 표시"}
                    </button>
                </div>
            ) : (
                <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
                    {CHALLENGES.map(c => (
                        <div key={c.id} onClick={() => start(c)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: completed.has(c.id) ? "rgba(34,197,94,0.05)" : "rgba(0,0,0,0.1)", border: `1px solid ${completed.has(c.id) ? "rgba(34,197,94,0.2)" : border}`, borderRadius: 10, marginBottom: 6, cursor: "pointer", transition: "transform 0.15s" }}>
                            <div style={{ width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, background: completed.has(c.id) ? "rgba(34,197,94,0.2)" : "rgba(255,255,255,0.05)", color: completed.has(c.id) ? "#22c55e" : "transparent", border: completed.has(c.id) ? "none" : "2px solid rgba(255,255,255,0.1)" }}>{completed.has(c.id) ? "✓" : ""}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{c.title}</div>
                                <div style={{ display: "flex", gap: 8, marginTop: 4, fontSize: 10, color: "rgba(255,255,255,0.4)" }}>
                                    <span style={{ padding: "1px 6px", borderRadius: 4, background: `${diffColor(c.difficulty)}20`, color: diffColor(c.difficulty), fontWeight: 600, textTransform: "uppercase" }}>{c.difficulty}</span>
                                    <span>{c.category}</span>
                                    <span>⭐ {c.points}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
