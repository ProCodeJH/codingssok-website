"use client";

import { useState } from "react";

/* ═══════════════════════════════════════════════════
   C언어 치트시트 — C-Studio CheatSheet.tsx 포팅
   카테고리별 접기/펼치기 + 코드 복사
   ═══════════════════════════════════════════════════ */

interface CheatItem { code: string; desc: string; }
interface CheatSection { id: string; title: string; icon: string; items: CheatItem[]; }

const sections: CheatSection[] = [
    {
        id: "types", title: "자료형", icon: "", items: [
            { code: "int a = 10;", desc: "정수형 (4bytes, -2^31 ~ 2^31-1)" },
            { code: "float f = 3.14f;", desc: "실수형 (4bytes, 소수점 6~7자리)" },
            { code: "double d = 3.14159;", desc: "배정밀도 실수 (8bytes, 15~16자리)" },
            { code: "char c = 'A';", desc: "문자형 (1byte, ASCII 0~127)" },
            { code: "long long ll = 123456789LL;", desc: "큰 정수 (8bytes)" },
            { code: "unsigned int u = 42u;", desc: "부호없는 정수 (0 ~ 2^32-1)" },
            { code: "_Bool b = 1;", desc: "불리언 (C99, 0 또는 1)" },
        ]
    },
    {
        id: "io", title: "입출력", icon: "", items: [
            { code: 'printf("Hello %s\\n", name);', desc: "서식 출력 (%d, %f, %s, %c, %x)" },
            { code: 'scanf("%d", &num);', desc: "서식 입력 (주소 연산자 & 필수)" },
            { code: "putchar('A');", desc: "문자 1개 출력" },
            { code: "int ch = getchar();", desc: "문자 1개 입력" },
            { code: 'puts("Hello");', desc: "문자열 출력 (자동 줄바꿈)" },
            { code: "char s[100]; fgets(s, 100, stdin);", desc: "안전한 문자열 입력" },
        ]
    },
    {
        id: "control", title: "제어문", icon: "↻", items: [
            { code: "if (a > b) { ... } else if (...) { ... } else { ... }", desc: "조건문" },
            { code: "switch (val) { case 1: ...; break; default: ...; }", desc: "다중 분기" },
            { code: "for (int i = 0; i < n; i++) { ... }", desc: "반복문 (초기;조건;증감)" },
            { code: "while (조건) { ... }", desc: "조건 반복" },
            { code: "do { ... } while (조건);", desc: "최소 1회 실행 보장" },
            { code: "break;  continue;", desc: "루프 탈출 / 다음 반복으로" },
        ]
    },
    {
        id: "pointer", title: "포인터", icon: "", items: [
            { code: "int *p = &a;", desc: "포인터 선언 및 주소 대입" },
            { code: "*p = 42;", desc: "역참조로 값 변경" },
            { code: "int arr[] = {1,2,3}; int *p = arr;", desc: "배열과 포인터 관계" },
            { code: "void swap(int *a, int *b) { ... }", desc: "포인터로 Call by Reference" },
            { code: "int **pp = &p;", desc: "이중 포인터" },
            { code: "int *p = malloc(sizeof(int) * n);", desc: "동적 메모리 할당" },
            { code: "free(p); p = NULL;", desc: "메모리 해제 + NULL 초기화" },
        ]
    },
    {
        id: "struct", title: "구조체", icon: "", items: [
            { code: "struct Point { int x, y; };", desc: "구조체 정의" },
            { code: "struct Point p = {10, 20};", desc: "구조체 초기화" },
            { code: "p.x = 30;", desc: "멤버 접근 (dot)" },
            { code: "ptr->x = 30;", desc: "포인터 멤버 접근 (arrow)" },
            { code: "typedef struct { ... } Name;", desc: "typedef로 별명 부여" },
        ]
    },
    {
        id: "string", title: "문자열", icon: "", items: [
            { code: 'char s[] = "Hello";', desc: "문자열 초기화 (배열)" },
            { code: "strlen(s)", desc: "문자열 길이 (\\0 제외)" },
            { code: "strcpy(dst, src)", desc: "문자열 복사" },
            { code: "strcat(dst, src)", desc: "문자열 이어붙이기" },
            { code: "strcmp(a, b)", desc: "문자열 비교 (0이면 같음)" },
            { code: "strstr(s, sub)", desc: "부분 문자열 검색" },
        ]
    },
    {
        id: "file", title: "파일 I/O", icon: "", items: [
            { code: 'FILE *fp = fopen("data.txt", "r");', desc: "파일 열기 (r/w/a/rb/wb)" },
            { code: "fclose(fp);", desc: "파일 닫기" },
            { code: 'fprintf(fp, "%d", num);', desc: "파일에 서식 출력" },
            { code: 'fscanf(fp, "%d", &num);', desc: "파일에서 서식 입력" },
            { code: "fgets(buf, size, fp);", desc: "파일에서 한 줄 읽기" },
            { code: "fread(buf, size, count, fp);", desc: "바이너리 읽기" },
        ]
    },
    {
        id: "preprocessor", title: "전처리기", icon: "", items: [
            { code: "#include <stdio.h>", desc: "시스템 헤더 포함" },
            { code: '#include "myheader.h"', desc: "사용자 헤더 포함" },
            { code: "#define PI 3.14159", desc: "매크로 상수 정의" },
            { code: "#define MAX(a,b) ((a)>(b)?(a):(b))", desc: "매크로 함수" },
            { code: "#ifdef DEBUG ... #endif", desc: "조건부 컴파일" },
        ]
    },
];

export default function CheatSheet({ onClose }: { onClose: () => void }) {
    const [expanded, setExpanded] = useState<Record<string, boolean>>({ types: true });
    const [copied, setCopied] = useState("");
    const [search, setSearch] = useState("");

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(""), 1500);
    };

    const toggle = (id: string) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }));

    const filteredSections = search
        ? sections.map(s => ({ ...s, items: s.items.filter(it => it.code.toLowerCase().includes(search.toLowerCase()) || it.desc.includes(search)) })).filter(s => s.items.length > 0)
        : sections;

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#1e1c1a", color: "#f5f0e8" }}>
            {/* Header */}
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #3a3632", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 800 }}>≡ C언어 치트시트</span>
                <button onClick={onClose} style={{ background: "none", border: "none", color: "#b0a898", fontSize: 16, cursor: "pointer" }}>✕</button>
            </div>

            {/* Search */}
            <div style={{ padding: "8px 12px" }}>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="⌕ 검색..." style={{
                    width: "100%", padding: "8px 12px", borderRadius: 8, border: "1px solid #3a3632",
                    background: "#252320", color: "#f5f0e8", fontSize: 12, outline: "none",
                }} />
            </div>

            {/* Sections */}
            <div style={{ flex: 1, overflowY: "auto", padding: "0 12px 16px" }}>
                {filteredSections.map(section => (
                    <div key={section.id} style={{ marginBottom: 8 }}>
                        <button onClick={() => toggle(section.id)} style={{
                            width: "100%", padding: "10px 12px", background: "#252320", border: "1px solid #3a3632",
                            borderRadius: 10, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#f5f0e8",
                        }}>
                            <span style={{ fontSize: 13, fontWeight: 700 }}>{section.icon} {section.title}</span>
                            <span style={{ fontSize: 11, color: "#b0a898" }}>{expanded[section.id] ? "▲" : "▼"} {section.items.length}</span>
                        </button>
                        {expanded[section.id] && (
                            <div style={{ padding: "8px 0" }}>
                                {section.items.map((item, i) => (
                                    <div key={i} style={{
                                        marginBottom: 6, padding: "8px 10px", background: "#2d2a26",
                                        borderRadius: 8, border: "1px solid #3a3632",
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                            <code style={{ fontSize: 12, color: "#fbbf24", fontFamily: "monospace", flex: 1, wordBreak: "break-all" }}>{item.code}</code>
                                            <button onClick={() => handleCopy(item.code)} style={{
                                                background: "none", border: "none", cursor: "pointer", fontSize: 12,
                                                color: copied === item.code ? "#22c55e" : "#b0a898", marginLeft: 8, flexShrink: 0,
                                            }}>{copied === item.code ? "✓" : "≡"}</button>
                                        </div>
                                        <div style={{ fontSize: 11, color: "#b0a898", marginTop: 4 }}>{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
