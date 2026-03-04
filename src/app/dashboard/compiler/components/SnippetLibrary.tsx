"use client";

import { useState } from "react";

/* ═══════════════════════════════════════════════════
   코드 스니펫 라이브러리 — C-Studio SnippetLibrary.tsx 포팅
   태그 기반 필터 + 코드 복사/삽입
   ═══════════════════════════════════════════════════ */

interface Snippet { id: string; title: string; code: string; desc: string; tags: string[]; }

const snippets: Snippet[] = [
    {
        id: "hello", title: "Hello World", tags: ["기초", "입출력"], desc: "가장 기본적인 C 프로그램",
        code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`
    },
    {
        id: "swap", title: "두 변수 교환 (swap)", tags: ["기초", "포인터"], desc: "포인터를 이용한 Call by Reference",
        code: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x=%d, y=%d\\n", x, y);\n    return 0;\n}`
    },
    {
        id: "bubble", title: "버블 정렬", tags: ["정렬", "배열"], desc: "인접 요소 비교 교환 정렬",
        code: `#include <stdio.h>\n\nvoid bubbleSort(int arr[], int n) {\n    for (int i = 0; i < n-1; i++)\n        for (int j = 0; j < n-i-1; j++)\n            if (arr[j] > arr[j+1]) {\n                int temp = arr[j];\n                arr[j] = arr[j+1];\n                arr[j+1] = temp;\n            }\n}\n\nint main() {\n    int arr[] = {64, 34, 25, 12, 22};\n    int n = sizeof(arr)/sizeof(arr[0]);\n    bubbleSort(arr, n);\n    for (int i = 0; i < n; i++) printf("%d ", arr[i]);\n    return 0;\n}`
    },
    {
        id: "factorial", title: "팩토리얼 (재귀)", tags: ["재귀", "수학"], desc: "n! = n * (n-1)!",
        code: `#include <stdio.h>\n\nlong long factorial(int n) {\n    if (n <= 1) return 1;\n    return n * factorial(n - 1);\n}\n\nint main() {\n    printf("10! = %lld\\n", factorial(10));\n    return 0;\n}`
    },
    {
        id: "fibonacci", title: "피보나치 수열", tags: ["재귀", "DP"], desc: "메모이제이션 활용 피보나치",
        code: `#include <stdio.h>\n\nlong long memo[100] = {0};\n\nlong long fib(int n) {\n    if (n <= 1) return n;\n    if (memo[n]) return memo[n];\n    return memo[n] = fib(n-1) + fib(n-2);\n}\n\nint main() {\n    for (int i = 0; i < 20; i++)\n        printf("fib(%d) = %lld\\n", i, fib(i));\n    return 0;\n}`
    },
    {
        id: "linkedlist", title: "연결 리스트", tags: ["자료구조", "포인터"], desc: "단일 연결 리스트 생성·삽입·출력",
        code: `#include <stdio.h>\n#include <stdlib.h>\n\ntypedef struct Node {\n    int data;\n    struct Node *next;\n} Node;\n\nNode* createNode(int data) {\n    Node *node = (Node*)malloc(sizeof(Node));\n    node->data = data;\n    node->next = NULL;\n    return node;\n}\n\nvoid printList(Node *head) {\n    while (head) {\n        printf("%d -> ", head->data);\n        head = head->next;\n    }\n    printf("NULL\\n");\n}\n\nint main() {\n    Node *head = createNode(1);\n    head->next = createNode(2);\n    head->next->next = createNode(3);\n    printList(head);\n    return 0;\n}`
    },
    {
        id: "stack", title: "스택 구현", tags: ["자료구조"], desc: "배열 기반 스택 (LIFO)",
        code: `#include <stdio.h>\n#define MAX 100\n\nint stack[MAX], top = -1;\n\nvoid push(int val) { if (top < MAX-1) stack[++top] = val; }\nint pop()  { return top >= 0 ? stack[top--] : -1; }\nint peek() { return top >= 0 ? stack[top]   : -1; }\n\nint main() {\n    push(10); push(20); push(30);\n    printf("Top: %d\\n", peek());\n    printf("Pop: %d\\n", pop());\n    printf("Pop: %d\\n", pop());\n    return 0;\n}`
    },
    {
        id: "bsearch", title: "이진 탐색", tags: ["탐색", "알고리즘"], desc: "정렬된 배열에서 O(log n) 탐색",
        code: `#include <stdio.h>\n\nint binarySearch(int arr[], int n, int target) {\n    int lo = 0, hi = n - 1;\n    while (lo <= hi) {\n        int mid = (lo + hi) / 2;\n        if (arr[mid] == target) return mid;\n        else if (arr[mid] < target) lo = mid + 1;\n        else hi = mid - 1;\n    }\n    return -1;\n}\n\nint main() {\n    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72};\n    int idx = binarySearch(arr, 9, 23);\n    printf("Found at index: %d\\n", idx);\n    return 0;\n}`
    },
    {
        id: "fileio", title: "파일 읽기/쓰기", tags: ["파일", "입출력"], desc: "파일 생성 후 읽기",
        code: `#include <stdio.h>\n\nint main() {\n    // 쓰기\n    FILE *fp = fopen("test.txt", "w");\n    if (fp) {\n        fprintf(fp, "Hello File!\\n");\n        fprintf(fp, "Line 2\\n");\n        fclose(fp);\n    }\n    // 읽기\n    char buf[256];\n    fp = fopen("test.txt", "r");\n    if (fp) {\n        while (fgets(buf, sizeof(buf), fp))\n            printf("%s", buf);\n        fclose(fp);\n    }\n    return 0;\n}`
    },
    {
        id: "matrix", title: "행렬 곱셈", tags: ["수학", "배열"], desc: "N×N 행렬 곱셈 알고리즘",
        code: `#include <stdio.h>\n#define N 3\n\nvoid multiply(int a[N][N], int b[N][N], int c[N][N]) {\n    for (int i = 0; i < N; i++)\n        for (int j = 0; j < N; j++) {\n            c[i][j] = 0;\n            for (int k = 0; k < N; k++)\n                c[i][j] += a[i][k] * b[k][j];\n        }\n}\n\nint main() {\n    int a[N][N] = {{1,2,3},{4,5,6},{7,8,9}};\n    int b[N][N] = {{9,8,7},{6,5,4},{3,2,1}};\n    int c[N][N];\n    multiply(a, b, c);\n    for (int i = 0; i < N; i++) {\n        for (int j = 0; j < N; j++) printf("%4d", c[i][j]);\n        printf("\\n");\n    }\n    return 0;\n}`
    },
];

const allTags = Array.from(new Set(snippets.flatMap(s => s.tags)));

export default function SnippetLibrary({ onInsert, onClose }: { onInsert: (code: string) => void; onClose: () => void }) {
    const [search, setSearch] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [copied, setCopied] = useState("");

    const filtered = snippets.filter(s => {
        const matchSearch = !search || s.title.toLowerCase().includes(search.toLowerCase()) || s.desc.includes(search) || s.code.toLowerCase().includes(search.toLowerCase());
        const matchTag = !selectedTag || s.tags.includes(selectedTag);
        return matchSearch && matchTag;
    });

    const handleCopy = (code: string) => { navigator.clipboard.writeText(code); setCopied(code); setTimeout(() => setCopied(""), 1500); };

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#1e1c1a", color: "#f5f0e8" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #3a3632", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 800 }}> 스니펫 라이브러리</span>
                <button onClick={onClose} style={{ background: "none", border: "none", color: "#b0a898", fontSize: 16, cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ padding: "8px 12px" }}>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="⌕ 스니펫 검색..." style={{
                    width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #3a3632", background: "#252320", color: "#f5f0e8", fontSize: 12, outline: "none",
                }} />
            </div>

            <div style={{ padding: "4px 12px 8px", display: "flex", gap: 4, flexWrap: "wrap" }}>
                <button onClick={() => setSelectedTag(null)} style={{ padding: "3px 10px", borderRadius: 12, border: "none", fontSize: 10, fontWeight: 600, cursor: "pointer", background: !selectedTag ? "#EC5212" : "#2d2a26", color: !selectedTag ? "#fff" : "#b0a898" }}>전체</button>
                {allTags.map(tag => (
                    <button key={tag} onClick={() => setSelectedTag(selectedTag === tag ? null : tag)} style={{
                        padding: "3px 10px", borderRadius: 12, border: "none", fontSize: 10, fontWeight: 600, cursor: "pointer",
                        background: selectedTag === tag ? "#EC5212" : "#2d2a26", color: selectedTag === tag ? "#fff" : "#b0a898",
                    }}>{tag}</button>
                ))}
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 16px" }}>
                {filtered.map(snippet => (
                    <div key={snippet.id} style={{ marginBottom: 10, background: "#252320", borderRadius: 10, border: "1px solid #3a3632", overflow: "hidden" }}>
                        <div style={{ padding: "10px 12px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                <span style={{ fontSize: 13, fontWeight: 700 }}>{snippet.title}</span>
                                <div style={{ display: "flex", gap: 4 }}>
                                    {snippet.tags.map(tag => (
                                        <span key={tag} style={{ fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: "rgba(236,82,18,0.15)", color: "#EC5212" }}>{tag}</span>
                                    ))}
                                </div>
                            </div>
                            <div style={{ fontSize: 11, color: "#b0a898", marginBottom: 8 }}>{snippet.desc}</div>
                            <pre style={{ background: "#1e1c1a", borderRadius: 6, padding: 10, fontSize: 11, fontFamily: "monospace", color: "#fbbf24", overflowX: "auto", margin: 0, lineHeight: 1.5 }}>{snippet.code}</pre>
                            <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                                <button onClick={() => handleCopy(snippet.code)} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: "1px solid #3a3632", background: "#2d2a26", color: "#b0a898", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
                                    {copied === snippet.code ? "✓ 복사됨" : "≡ 코드 복사"}
                                </button>
                                <button onClick={() => onInsert(snippet.code)} style={{ flex: 1, padding: "6px 0", borderRadius: 6, border: "none", background: "#EC5212", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>
                                    ▶ 에디터에 삽입
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && <div style={{ textAlign: "center", padding: 32, color: "#b0a898", fontSize: 13 }}>검색 결과 없음</div>}
            </div>
        </div>
    );
}
