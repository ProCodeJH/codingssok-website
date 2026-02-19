"use client";

import { useState, useRef, useCallback, useEffect, Suspense } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════════════════════════════
   코딩쏙 학습 플랫폼 — 5개 학습 트랙 통합 버전
   learning-platform 레포의 전체 커리큘럼 + 기존 웹개발 에디터
   ═══════════════════════════════════════════════════════════════ */

// ─── Types ───
interface Lesson {
    id: string;
    title: string;
    category: string;
    desc: string;
    code: string;
    xp: number;
    difficulty: "입문" | "기초" | "중급";
}

interface TrackDomain {
    name: string;
    icon: string;
    color: string;
    problems: number;
    difficulties: { label: string; count: number; desc: string; time: string }[];
}

interface Track {
    id: string;
    name: string;
    icon: string;
    color: string;
    gradient: string;
    totalProblems: number;
    desc: string;
    domains: TrackDomain[];
}

// ─── 5개 학습 트랙 데이터 (learning-platform 포팅) ───
const tracks: Track[] = [
    {
        id: "coding-basics", name: "코딩 기초 사고력", icon: "💡", color: "#818cf8",
        gradient: "linear-gradient(135deg, #818cf8, #6366f1)", totalProblems: 900,
        desc: "논리·수학·순서도·문제해결·이산수학 5개 영역",
        domains: [
            {
                name: "논리적 사고", icon: "🧩", color: "#6366f1", problems: 180, difficulties: [
                    { label: "쉬움", count: 60, desc: "참/거짓, AND/OR/NOT, 진리표, 벤다이어그램", time: "40~60분" },
                    { label: "보통", count: 60, desc: "드모르간, 비트연산, XOR, 단락평가", time: "50~80분" },
                    { label: "어려움", count: 60, desc: "카르노맵, 증명, 부울 대수 최적화", time: "60~100분" },
                ]
            },
            {
                name: "수학적 사고", icon: "🔢", color: "#ea580c", problems: 180, difficulties: [
                    { label: "쉬움", count: 60, desc: "사칙연산, 나머지, 소수, 수열 패턴", time: "40~60분" },
                    { label: "보통", count: 60, desc: "진법 변환, 집합론, 순열, 조합", time: "50~80분" },
                    { label: "어려움", count: 60, desc: "좌표, 행렬, 등차/등비수열, 모듈러", time: "60~100분" },
                ]
            },
            {
                name: "순서도 & 의사코드", icon: "📊", color: "#0891b2", problems: 180, difficulties: [
                    { label: "쉬움", count: 60, desc: "기호, 순차, 조건, 반복 기초", time: "40~60분" },
                    { label: "보통", count: 60, desc: "함수, 배열, 정렬, 스택/큐", time: "50~80분" },
                    { label: "어려움", count: 60, desc: "분할정복, DP, 그래프 알고리즘", time: "60~100분" },
                ]
            },
            {
                name: "문제해결 전략", icon: "🎯", color: "#16a34a", problems: 180, difficulties: [
                    { label: "쉬움", count: 60, desc: "패턴 인식, 분해, 추상화", time: "50~80분" },
                    { label: "보통", count: 60, desc: "시뮬레이션, 최적화, 모델링", time: "60~90분" },
                    { label: "어려움", count: 60, desc: "설계 패턴, 시스템 설계, 고급 최적화", time: "80~120분" },
                ]
            },
            {
                name: "이산수학 기초", icon: "🔗", color: "#db2777", problems: 180, difficulties: [
                    { label: "쉬움", count: 60, desc: "집합, 관계, 함수, 그래프 입문", time: "50~80분" },
                    { label: "보통", count: 60, desc: "그래프 알고리즘, 조합론, 부울대수", time: "60~90분" },
                    { label: "어려움", count: 60, desc: "정수론, 오토마타, 암호학", time: "80~120분" },
                ]
            },
        ],
    },
    {
        id: "computational-thinking", name: "컴퓨팅 사고력", icon: "🧠", color: "#10b981",
        gradient: "linear-gradient(135deg, #22c55e, #22d3ee)", totalProblems: 1440,
        desc: "분해·패턴인식·추상화·알고리즘설계 CT 4대 영역",
        domains: [
            {
                name: "분해", icon: "🔍", color: "#6366f1", problems: 300, difficulties: [
                    { label: "Level 1", count: 60, desc: "단순 분해, 요소 식별", time: "30~50분" },
                    { label: "Level 2", count: 60, desc: "구조적 분해, 계층 분석", time: "40~60분" },
                    { label: "Level 3", count: 60, desc: "복합 시스템 분해", time: "50~80분" },
                    { label: "Level 4", count: 60, desc: "재귀적 분해, 모듈화", time: "60~90분" },
                    { label: "Level 5", count: 60, desc: "설계 수준 분해, 아키텍처", time: "80~120분" },
                ]
            },
            {
                name: "패턴인식", icon: "🔄", color: "#10b981", problems: 300, difficulties: [
                    { label: "Level 1", count: 60, desc: "수열 패턴, 반복 찾기", time: "30~50분" },
                    { label: "Level 2", count: 60, desc: "2차원 패턴, 규칙 발견", time: "40~60분" },
                    { label: "Level 3", count: 60, desc: "복합 패턴, 일반화", time: "50~80분" },
                    { label: "Level 4", count: 60, desc: "알고리즘 패턴 매칭", time: "60~90분" },
                    { label: "Level 5", count: 60, desc: "고급 패턴 분석, 최적화", time: "80~120분" },
                ]
            },
            {
                name: "추상화", icon: "🎨", color: "#06b6d4", problems: 300, difficulties: [
                    { label: "Level 1", count: 60, desc: "핵심 추출, 불필요 제거", time: "30~50분" },
                    { label: "Level 2", count: 60, desc: "모델링, 단순화", time: "40~60분" },
                    { label: "Level 3", count: 60, desc: "계층적 추상화", time: "50~80분" },
                    { label: "Level 4", count: 60, desc: "인터페이스 설계", time: "60~90분" },
                    { label: "Level 5", count: 60, desc: "프레임워크 수준 추상화", time: "80~120분" },
                ]
            },
            {
                name: "알고리즘 설계", icon: "⚙️", color: "#f97316", problems: 300, difficulties: [
                    { label: "Level 1", count: 60, desc: "순차/조건/반복 기초", time: "30~50분" },
                    { label: "Level 2", count: 60, desc: "정렬, 탐색 기초", time: "40~60분" },
                    { label: "Level 3", count: 60, desc: "재귀, 분할정복", time: "50~80분" },
                    { label: "Level 4", count: 60, desc: "그래프, 동적 프로그래밍", time: "60~90분" },
                    { label: "Level 5", count: 60, desc: "고급 알고리즘, 최적화", time: "80~120분" },
                ]
            },
            {
                name: "종합평가", icon: "📝", color: "#a855f7", problems: 180, difficulties: [
                    { label: "Level 1", count: 60, desc: "기초 종합 평가", time: "40~60분" },
                    { label: "Level 2", count: 60, desc: "중급 종합 평가", time: "50~80분" },
                    { label: "Level 3", count: 60, desc: "고급 종합 평가", time: "60~100분" },
                ]
            },
            {
                name: "프로젝트", icon: "🚀", color: "#f43f5e", problems: 60, difficulties: [
                    { label: "Level 1", count: 20, desc: "미니 프로젝트", time: "90~120분" },
                    { label: "Level 2", count: 20, desc: "중급 프로젝트", time: "120~180분" },
                    { label: "Level 3", count: 20, desc: "종합 프로젝트", time: "180~240분" },
                ]
            },
        ],
    },
    {
        id: "c-language", name: "C 언어", icon: "⚡", color: "#f59e0b",
        gradient: "linear-gradient(135deg, #f59e0b, #ef4444)", totalProblems: 1285,
        desc: "Hello world부터 DP·그래프까지 28 Chapters · 78 Units",
        domains: [
            {
                name: "기초 (Ch 1~7)", icon: "📗", color: "#22c55e", problems: 321, difficulties: [
                    { label: "입문", count: 107, desc: "변수, 자료형, 입출력, 연산자", time: "30~50분" },
                    { label: "기초", count: 107, desc: "조건문, 반복문, 배열", time: "40~60분" },
                    { label: "응용", count: 107, desc: "함수, 문자열, 포인터 입문", time: "50~80분" },
                ]
            },
            {
                name: "중급 (Ch 8~17)", icon: "📘", color: "#3b82f6", problems: 460, difficulties: [
                    { label: "기본", count: 153, desc: "포인터, 구조체, 동적 메모리", time: "50~80분" },
                    { label: "심화", count: 153, desc: "파일 I/O, 전처리기, 비트연산", time: "60~90분" },
                    { label: "실전", count: 154, desc: "연결리스트, 스택, 큐 구현", time: "80~120분" },
                ]
            },
            {
                name: "고급 (Ch 18~28)", icon: "📕", color: "#ef4444", problems: 504, difficulties: [
                    { label: "알고리즘", count: 168, desc: "정렬, 탐색, 재귀", time: "60~100분" },
                    { label: "자료구조", count: 168, desc: "트리, 그래프, 해시", time: "80~120분" },
                    { label: "마스터", count: 168, desc: "DP, 그래프 알고리즘, 최적화", time: "100~150분" },
                ]
            },
        ],
    },
    {
        id: "koi", name: "KOI 기출", icon: "🏆", color: "#f97316",
        gradient: "linear-gradient(135deg, #f97316, #fb923c)", totalProblems: 103,
        desc: "한국정보올림피아드 2019–2025 프로그래밍 & 필기시험",
        domains: [
            {
                name: "2019~2021", icon: "📋", color: "#f97316", problems: 42, difficulties: [
                    { label: "초등부", count: 14, desc: "기초 알고리즘, 수학", time: "30~60분" },
                    { label: "중등부", count: 14, desc: "탐색, 정렬, 자료구조", time: "60~90분" },
                    { label: "고등부", count: 14, desc: "DP, 그래프, 고급 알고리즘", time: "90~150분" },
                ]
            },
            {
                name: "2022~2025", icon: "📋", color: "#fb923c", problems: 61, difficulties: [
                    { label: "초등부", count: 20, desc: "기초 알고리즘, 수학", time: "30~60분" },
                    { label: "중등부", count: 20, desc: "탐색, 정렬, 자료구조", time: "60~90분" },
                    { label: "고등부", count: 21, desc: "DP, 그래프, 고급 알고리즘", time: "90~150분" },
                ]
            },
        ],
    },
    {
        id: "word-processor", name: "워드프로세서 필기", icon: "📄", color: "#2563eb",
        gradient: "linear-gradient(135deg, #2563eb, #06b6d4)", totalProblems: 70,
        desc: "워드프로세싱 7대 영역 핵심 이론 + 기출문제",
        domains: [
            {
                name: "워드프로세싱 용어", icon: "📝", color: "#2563eb", problems: 10, difficulties: [
                    { label: "이론+문제", count: 10, desc: "기본 용어, 개념 정리", time: "20~30분" },
                ]
            },
            {
                name: "PC 운영 체제", icon: "🖥️", color: "#3b82f6", problems: 10, difficulties: [
                    { label: "이론+문제", count: 10, desc: "OS 기초, 파일 관리", time: "20~30분" },
                ]
            },
            {
                name: "PC 기본 상식", icon: "💻", color: "#06b6d4", problems: 10, difficulties: [
                    { label: "이론+문제", count: 10, desc: "하드웨어, 소프트웨어 기초", time: "20~30분" },
                ]
            },
            {
                name: "정보 통신과 인터넷", icon: "🌐", color: "#0891b2", problems: 10, difficulties: [
                    { label: "이론+문제", count: 10, desc: "네트워크, 프로토콜, 보안", time: "20~30분" },
                ]
            },
            {
                name: "ICT 신기술 활용", icon: "🤖", color: "#7c3aed", problems: 10, difficulties: [
                    { label: "이론+문제", count: 10, desc: "AI, IoT, 클라우드, 블록체인", time: "20~30분" },
                ]
            },
            {
                name: "전자출판", icon: "📰", color: "#db2777", problems: 10, difficulties: [
                    { label: "이론+문제", count: 10, desc: "전자출판 개요, DTP", time: "20~30분" },
                ]
            },
            {
                name: "멀티미디어", icon: "🎬", color: "#f97316", problems: 10, difficulties: [
                    { label: "이론+문제", count: 10, desc: "이미지, 오디오, 비디오 포맷", time: "20~30분" },
                ]
            },
        ],
    },
];

// ─── 웹 개발 레슨 (기존 유지) ───
const webLessons: Lesson[] = [
    {
        id: "html-basic", title: "HTML 기본 구조", category: "HTML", desc: "웹 페이지의 기본 뼈대를 만들어봐요", xp: 10, difficulty: "입문",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <title>나의 첫 웹페이지</title>\n</head>\n<body>\n    <h1>안녕하세요!</h1>\n    <p>코딩쏙에서 만든 첫 번째 웹페이지입니다.</p>\n</body>\n</html>`
    },
    {
        id: "html-list", title: "목록과 링크", category: "HTML", desc: "리스트와 하이퍼링크를 만들어봐요", xp: 15, difficulty: "입문",
        code: `<!DOCTYPE html>\n<html>\n<body>\n    <h2>좋아하는 과일 목록</h2>\n    <ul>\n        <li>🍎 사과</li>\n        <li>🍊 오렌지</li>\n        <li>🍇 포도</li>\n    </ul>\n    <h2>유용한 사이트</h2>\n    <ol>\n        <li><a href="https://google.com">구글</a></li>\n        <li><a href="https://naver.com">네이버</a></li>\n    </ol>\n</body>\n</html>`
    },
    {
        id: "css-basic", title: "CSS 스타일링 기초", category: "CSS", desc: "색상, 폰트, 배경으로 꾸며봐요", xp: 15, difficulty: "입문",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        body { font-family: Arial; background: #fdfaf5; margin: 40px; }\n        h1 { color: #EC5212; border-bottom: 3px solid #FFD37D; padding-bottom: 10px; }\n        .card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 400px; }\n        .tag { display: inline-block; background: #77C6B3; color: white; padding: 4px 12px; border-radius: 20px; font-size: 14px; }\n    </style>\n</head>\n<body>\n    <h1>CSS 스타일링 연습</h1>\n    <div class="card"><h2>나의 프로필</h2><p>이름: 코딩쏙 학생</p><span class="tag">초급</span></div>\n</body>\n</html>`
    },
    {
        id: "css-flexbox", title: "Flexbox 레이아웃", category: "CSS", desc: "요소를 자유롭게 배치해봐요", xp: 25, difficulty: "기초",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        body { font-family: sans-serif; margin: 20px; background: #f5f5f5; }\n        .container { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }\n        .box { width: 150px; height: 150px; border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 40px; color: white; }\n    </style>\n</head>\n<body>\n    <h2 style="text-align:center;">Flexbox 갤러리</h2>\n    <div class="container">\n        <div class="box" style="background:#EC5212;">🎨</div>\n        <div class="box" style="background:#77C6B3;">🎵</div>\n        <div class="box" style="background:#70A2E1;">📚</div>\n        <div class="box" style="background:#FFD37D;">⭐</div>\n    </div>\n</body>\n</html>`
    },
    {
        id: "js-basic", title: "JavaScript 기초", category: "JS", desc: "버튼 클릭으로 웹 페이지를 제어해봐요", xp: 20, difficulty: "기초",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        body { font-family: sans-serif; margin: 40px; background: #fdfaf5; }\n        button { background: #EC5212; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-size: 16px; cursor: pointer; margin: 8px; }\n        #result { margin-top: 20px; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); font-size: 18px; }\n    </style>\n</head>\n<body>\n    <h2>🎮 JavaScript 인터랙션</h2>\n    <button onclick="sayHello()">인사하기</button>\n    <button onclick="random()">랜덤 숫자</button>\n    <div id="result">버튼을 클릭해보세요!</div>\n    <script>\n        function sayHello() { document.getElementById('result').textContent = '안녕하세요! 🌸'; }\n        function random() { document.getElementById('result').textContent = '🎲 ' + (Math.floor(Math.random()*100)+1); }\n    </script>\n</body>\n</html>`
    },
];

const webCategories = ["전체", "HTML", "CSS", "JS"];
const catColors: Record<string, string> = { HTML: "#E85A18", CSS: "#29ABE2", JS: "#FCAD00" };
const diffColors: Record<string, string> = { "입문": "#05B20C", "기초": "#29ABE2", "중급": "#cf7f26" };
const diffBadgeColors: Record<string, string> = {
    "쉬움": "#22c55e", "보통": "#f59e0b", "어려움": "#ef4444",
    "Level 1": "#22c55e", "Level 2": "#3b82f6", "Level 3": "#a855f7", "Level 4": "#f97316", "Level 5": "#ef4444",
    "입문": "#22c55e", "기초": "#3b82f6", "응용": "#f59e0b", "기본": "#22c55e", "심화": "#3b82f6", "실전": "#ef4444",
    "알고리즘": "#a855f7", "자료구조": "#f97316", "마스터": "#ef4444", "이론+문제": "#2563eb",
    "초등부": "#22c55e", "중등부": "#f59e0b", "고등부": "#ef4444",
};

// ─── Coddy.tech 스타일 C 언어 코스 (Journey) ───
interface CLesson {
    id: string; title: string; type: "lesson" | "challenge";
    desc: string; xp: number;
    content: string; // bite-sized 설명
    code: string; // 기본 코드
    hint?: string; // 챌린지 힌트
}
interface CSection { id: string; title: string; icon: string; color: string; lessons: CLesson[]; }

const cCourse: CSection[] = [
    {
        id: "intro", title: "소개", icon: "👋", color: "#818cf8", lessons: [
            { id: "c-hello", title: "Hello World!", type: "lesson", desc: "첫 번째 C 프로그램을 만들어봅시다", xp: 10, content: "printf() 함수는 화면에 텍스트를 출력합니다. 모든 C 프로그램은 #include <stdio.h>로 시작합니다.", code: '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}' },
            { id: "c-main", title: "main 함수", type: "lesson", desc: "C 프로그램의 진입점을 이해합시다", xp: 10, content: "main() 함수는 프로그램이 시작되는 곳입니다. int main()은 정수를 반환하며, return 0은 프로그램이 성공적으로 끝났음을 의미합니다.", code: '#include <stdio.h>\n\nint main() {\n    printf("프로그램 시작!\\n");\n    printf("여기는 main 함수 안입니다.\\n");\n    printf("프로그램 종료!\\n");\n    return 0;\n}' },
        ]
    },
    {
        id: "variables", title: "변수", icon: "📦", color: "#22c55e", lessons: [
            { id: "c-int", title: "정수형 (int)", type: "lesson", desc: "정수를 저장하는 변수를 만들어봅시다", xp: 15, content: "int는 정수를 저장합니다. 변수를 선언하고 값을 대입할 수 있습니다. printf에서 %d로 정수를 출력합니다.", code: '#include <stdio.h>\n\nint main() {\n    int age = 15;\n    int year = 2026;\n    printf("나이: %d\\n", age);\n    printf("연도: %d\\n", year);\n    return 0;\n}' },
            { id: "c-float", title: "실수형 (float)", type: "lesson", desc: "소수점이 있는 수를 다뤄봅시다", xp: 15, content: "float는 소수점이 있는 수를 저장합니다. printf에서 %f로 출력하고, %.2f로 소수점 2자리만 표시할 수 있습니다.", code: '#include <stdio.h>\n\nint main() {\n    float pi = 3.14159f;\n    float temp = 36.5f;\n    printf("원주율: %.2f\\n", pi);\n    printf("체온: %.1f도\\n", temp);\n    return 0;\n}' },
            { id: "c-char", title: "문자형 (char)", type: "lesson", desc: "한 글자를 저장하는 변수를 알아봅시다", xp: 15, content: "char는 한 글자를 저장합니다. 작은따옴표('A')로 감싸고, printf에서 %c로 출력합니다.", code: '#include <stdio.h>\n\nint main() {\n    char grade = \x27A\x27;\n    char initial = \x27K\x27;\n    printf("등급: %c\\n", grade);\n    printf("이니셜: %c\\n", initial);\n    return 0;\n}' },
            { id: "c-var-ch1", title: "📝 Recap Challenge #1", type: "challenge", desc: "변수를 선언하고 출력해보세요", xp: 25, content: "💪 이름, 나이, 키를 각각 char[], int, float 변수에 저장하고 출력해보세요.", hint: "char name[] = \"코딩쏙\"; 형태로 문자열을 저장할 수 있어요", code: '#include <stdio.h>\n\nint main() {\n    // TODO: name, age, height 변수를 선언하고 출력하세요\n    \n    return 0;\n}' },
            { id: "c-var-ch2", title: "📝 Recap Challenge #2", type: "challenge", desc: "변수 연산 챌린지", xp: 25, content: "💪 두 정수의 합, 차, 곱, 나눗셈 결과를 출력하는 프로그램을 만드세요.", hint: "나눗셈 결과를 소수점으로 보려면 float로 형변환하세요", code: '#include <stdio.h>\n\nint main() {\n    int a = 17, b = 5;\n    // TODO: 합, 차, 곱, 나눗셈 결과를 출력하세요\n    \n    return 0;\n}' },
        ]
    },
    {
        id: "operators", title: "연산자", icon: "🔧", color: "#f59e0b", lessons: [
            { id: "c-arith", title: "산술 연산자", type: "lesson", desc: "+, -, *, /, % 연산을 배워봅시다", xp: 15, content: "C에서는 +, -, *, /(나눗셈), %(나머지) 연산자를 사용합니다. 정수끼리 나누면 정수 결과만 나옵니다.", code: '#include <stdio.h>\n\nint main() {\n    int a = 17, b = 5;\n    printf("%d + %d = %d\\n", a, b, a+b);\n    printf("%d - %d = %d\\n", a, b, a-b);\n    printf("%d * %d = %d\\n", a, b, a*b);\n    printf("%d / %d = %d\\n", a, b, a/b);\n    printf("%d %% %d = %d\\n", a, b, a%b);\n    return 0;\n}' },
            { id: "c-incdec", title: "증감 연산자", type: "lesson", desc: "++ 와 -- 사용법을 알아봅시다", xp: 15, content: "++는 1을 더하고, --는 1을 뺍니다. 전위(++a)는 먼저 증가, 후위(a++)는 나중에 증가합니다.", code: '#include <stdio.h>\n\nint main() {\n    int count = 10;\n    printf("원래 값: %d\\n", count);\n    count++;\n    printf("count++ 후: %d\\n", count);\n    count--;\n    printf("count-- 후: %d\\n", count);\n    printf("++count: %d\\n", ++count);\n    printf("count++: %d\\n", count++);\n    printf("현재 값: %d\\n", count);\n    return 0;\n}' },
            { id: "c-assign", title: "대입 연산자", type: "lesson", desc: "=, +=, -=, *= 등을 배워봅시다", xp: 15, content: "복합 대입 연산자(+=, -=, *=, /=)를 사용하면 코드를 더 짧게 쓸 수 있습니다. a += 5는 a = a + 5와 같습니다.", code: '#include <stdio.h>\n\nint main() {\n    int score = 100;\n    printf("초기: %d\\n", score);\n    score += 20;  // score = score + 20\n    printf("+20: %d\\n", score);\n    score -= 30;  // score = score - 30\n    printf("-30: %d\\n", score);\n    score *= 2;   // score = score * 2\n    printf("x2: %d\\n", score);\n    score /= 3;   // score = score / 3\n    printf("/3: %d\\n", score);\n    return 0;\n}' },
            { id: "c-compare", title: "비교 연산자", type: "lesson", desc: "값을 비교하는 방법을 알아봅시다", xp: 15, content: "==, !=, <, >, <=, >= 로 두 값을 비교합니다. 결과는 1(참) 또는 0(거짓)입니다.", code: '#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n    printf("%d == %d → %d\\n", a, b, a==b);\n    printf("%d != %d → %d\\n", a, b, a!=b);\n    printf("%d < %d → %d\\n", a, b, a<b);\n    printf("%d > %d → %d\\n", a, b, a>b);\n    return 0;\n}' },
            { id: "c-logic", title: "논리 연산자", type: "lesson", desc: "AND, OR, NOT 논리를 배워봅시다", xp: 15, content: "&&(AND), ||(OR), !(NOT) 연산자로 여러 조건을 조합합니다.", code: '#include <stdio.h>\n\nint main() {\n    int age = 15;\n    int hasTicket = 1;\n    printf("나이 >= 12 AND 티켓 있음: %d\\n", (age >= 12) && hasTicket);\n    printf("나이 < 10 OR 티켓 있음: %d\\n", (age < 10) || hasTicket);\n    printf("NOT 티켓 있음: %d\\n", !hasTicket);\n    return 0;\n}' },
            { id: "c-op-ch1", title: "📝 Recap Challenge #1", type: "challenge", desc: "연산자를 활용한 계산기", xp: 30, content: "💪 두 수를 입력받아 모든 산술 연산 결과를 출력하세요.", hint: "scanf(\"%d\", &a)로 입력을 받을 수 있어요", code: '#include <stdio.h>\n\nint main() {\n    int a, b;\n    // TODO: scanf로 두 수를 입력받고\n    // 합, 차, 곱, 몫, 나머지를 출력하세요\n    \n    return 0;\n}' },
            { id: "c-op-ch2", title: "📝 Recap Challenge #2", type: "challenge", desc: "짝수/홀수 판별기", xp: 30, content: "💪 숫자를 입력받아 짝수인지 홀수인지 판별하세요.", hint: "나머지(%) 연산자를 사용하여 2로 나눈 나머지를 확인하세요", code: '#include <stdio.h>\n\nint main() {\n    int num;\n    // TODO: 숫자를 입력받아 짝수/홀수를 판별하세요\n    \n    return 0;\n}' },
        ]
    },
    {
        id: "decision", title: "조건문", icon: "🔀", color: "#a855f7", lessons: [
            { id: "c-if", title: "if 문", type: "lesson", desc: "조건에 따라 다른 코드를 실행해봅시다", xp: 20, content: "if문은 조건이 참일 때 코드를 실행합니다. 중괄호 안에 실행할 코드를 넣습니다.", code: '#include <stdio.h>\n\nint main() {\n    int score = 85;\n    if (score >= 90) {\n        printf("A등급! 🏆\\n");\n    }\n    if (score >= 80) {\n        printf("B등급 이상! 👍\\n");\n    }\n    if (score >= 70) {\n        printf("C등급 이상! 😊\\n");\n    }\n    return 0;\n}' },
            { id: "c-elseif", title: "if-else if-else", type: "lesson", desc: "여러 조건을 체인으로 연결해봅시다", xp: 20, content: "else if로 추가 조건을, else로 나머지 모든 경우를 처리합니다. 위에서부터 순서대로 평가됩니다.", code: '#include <stdio.h>\n\nint main() {\n    int score = 75;\n    if (score >= 90) {\n        printf("🏆 A등급\\n");\n    } else if (score >= 80) {\n        printf("👍 B등급\\n");\n    } else if (score >= 70) {\n        printf("😊 C등급\\n");\n    } else {\n        printf("📚 더 노력하자!\\n");\n    }\n    return 0;\n}' },
            { id: "c-dec-ch1", title: "📝 Recap Challenge #1", type: "challenge", desc: "학점 계산기", xp: 35, content: "💪 점수를 입력받아 A/B/C/D/F 학점을 출력하세요.", hint: "90이상 A, 80이상 B, 70이상 C, 60이상 D, 나머지 F", code: '#include <stdio.h>\n\nint main() {\n    int score;\n    printf("점수를 입력하세요: ");\n    scanf("%d", &score);\n    // TODO: 학점 판별 로직을 작성하세요\n    \n    return 0;\n}' },
            { id: "c-dec-ch2", title: "📝 Recap Challenge #2", type: "challenge", desc: "윤년 판별기", xp: 35, content: "💪 연도를 입력받아 윤년인지 판별하세요.", hint: "4의 배수이면서 100의 배수가 아니거나, 400의 배수이면 윤년", code: '#include <stdio.h>\n\nint main() {\n    int year;\n    printf("연도를 입력하세요: ");\n    scanf("%d", &year);\n    // TODO: 윤년 판별 로직\n    \n    return 0;\n}' },
        ]
    },
    {
        id: "basic-io", title: "입출력", icon: "📝", color: "#06b6d4", lessons: [
            { id: "c-printf", title: "출력 (printf)", type: "lesson", desc: "다양한 형식으로 출력해봅시다", xp: 15, content: "printf는 서식 지정자(%d, %f, %s, %c)를 사용하여 다양한 데이터를 출력합니다.", code: '#include <stdio.h>\n\nint main() {\n    printf("정수: %d\\n", 42);\n    printf("실수: %.2f\\n", 3.14);\n    printf("문자: %c\\n", \x27A\x27);\n    printf("문자열: %s\\n", "코딩쏙");\n    printf("%-10s|%10s\\n", "왼쪽정렬", "오른쪽정렬");\n    return 0;\n}' },
            { id: "c-printf-var", title: "변수와 출력", type: "lesson", desc: "변수 값을 출력에 활용해봅시다", xp: 15, content: "여러 변수를 printf 하나로 출력할 수 있습니다. 서식 지정자의 순서와 변수 순서가 일치해야 합니다.", code: '#include <stdio.h>\n\nint main() {\n    char name[] = "코딩쏙";\n    int age = 15;\n    float height = 165.5f;\n    printf("이름: %s\\n나이: %d세\\n키: %.1fcm\\n", name, age, height);\n    return 0;\n}' },
            { id: "c-scanf", title: "입력 (scanf)", type: "lesson", desc: "사용자 입력을 받아봅시다", xp: 20, content: "scanf는 키보드 입력을 변수에 저장합니다. 변수 앞에 &를 붙여야 합니다(주소 전달).", code: '#include <stdio.h>\n\nint main() {\n    int num;\n    printf("숫자 입력: ");\n    scanf("%d", &num);\n    printf("입력한 수: %d\\n", num);\n    printf("2배: %d\\n", num * 2);\n    return 0;\n}' },
            { id: "c-io-ch1", title: "📝 Recap Challenge #1", type: "challenge", desc: "자기소개 프로그램", xp: 30, content: "💪 이름과 나이를 입력받아 자기소개를 출력하세요.", hint: "문자열 입력은 char name[50]; scanf(\"%s\", name); 형태", code: '#include <stdio.h>\n\nint main() {\n    // TODO: 이름, 나이를 입력받아 자기소개를 출력하세요\n    \n    return 0;\n}' },
            { id: "c-io-ch2", title: "📝 Recap Challenge #2", type: "challenge", desc: "원의 넓이 계산기", xp: 30, content: "💪 반지름을 입력받아 원의 넓이와 둘레를 계산하세요.", hint: "π는 3.14159로, 넓이 = π×r², 둘레 = 2×π×r", code: '#include <stdio.h>\n\nint main() {\n    float radius;\n    printf("반지름 입력: ");\n    scanf("%f", &radius);\n    // TODO: 넓이와 둘레를 계산하여 출력하세요\n    \n    return 0;\n}' },
        ]
    },
    {
        id: "loops", title: "반복문", icon: "🔁", color: "#ef4444", lessons: [
            { id: "c-for", title: "for 반복문", type: "lesson", desc: "정해진 횟수만큼 반복해봅시다", xp: 20, content: "for(초기화; 조건; 증감)은 조건이 참인 동안 반복합니다.", code: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("반복 %d번째 🔄\\n", i);\n    }\n    // 구구단 3단\n    printf("\\n=== 구구단 3단 ===\\n");\n    for (int i = 1; i <= 9; i++) {\n        printf("3 × %d = %d\\n", i, 3*i);\n    }\n    return 0;\n}' },
            { id: "c-while", title: "while 반복문", type: "lesson", desc: "조건이 참인 동안 반복해봅시다", xp: 20, content: "while(조건)은 조건이 참인 동안 계속 반복합니다. 무한루프에 주의하세요!", code: '#include <stdio.h>\n\nint main() {\n    int count = 5;\n    while (count > 0) {\n        printf("카운트다운: %d 🚀\\n", count);\n        count--;\n    }\n    printf("발사! 🎆\\n");\n    return 0;\n}' },
            { id: "c-dowhile", title: "do...while 반복문", type: "lesson", desc: "최소 1회는 실행하는 반복문", xp: 20, content: "do-while은 코드를 먼저 실행한 후 조건을 검사합니다. 최소 1번은 실행됩니다.", code: '#include <stdio.h>\n\nint main() {\n    int num;\n    do {\n        printf("1~10 사이 숫자: ");\n        scanf("%d", &num);\n    } while (num < 1 || num > 10);\n    printf("유효한 입력: %d ✅\\n", num);\n    return 0;\n}' },
            { id: "c-break", title: "break 문", type: "lesson", desc: "반복문을 중간에 멈춰봅시다", xp: 15, content: "break는 가장 가까운 반복문을 즉시 종료합니다.", code: '#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 100; i++) {\n        if (i * i > 50) {\n            printf("제곱이 50 초과: i = %d\\n", i);\n            break;\n        }\n        printf("%d² = %d\\n", i, i*i);\n    }\n    return 0;\n}' },
            { id: "c-continue", title: "continue 문", type: "lesson", desc: "특정 반복을 건너뛰어봅시다", xp: 15, content: "continue는 현재 반복의 나머지를 건너뛰고 다음 반복으로 넘어갑니다.", code: '#include <stdio.h>\n\nint main() {\n    printf("1~20 중 3의 배수:\\n");\n    for (int i = 1; i <= 20; i++) {\n        if (i % 3 != 0) continue;\n        printf("%d ", i);\n    }\n    printf("\\n");\n    return 0;\n}' },
            { id: "c-loop-ch1", title: "📝 Recap Challenge #1", type: "challenge", desc: "별 피라미드", xp: 35, content: "💪 n을 입력받아 별(★) 피라미드를 출력하세요.", hint: "바깥 for: 줄 수, 안쪽 for: 별 개수", code: '#include <stdio.h>\n\nint main() {\n    int n;\n    printf("높이: ");\n    scanf("%d", &n);\n    // TODO: 별 피라미드\n    // n=3이면:\n    //   *\n    //  **\n    // ***\n    \n    return 0;\n}' },
            { id: "c-loop-ch2", title: "📝 Recap Challenge #2", type: "challenge", desc: "소수 찾기", xp: 35, content: "💪 2부터 n까지의 소수를 모두 출력하세요.", hint: "2부터 i-1까지 나눠서 나머지가 0인 수가 없으면 소수", code: '#include <stdio.h>\n\nint main() {\n    int n;\n    printf("범위: ");\n    scanf("%d", &n);\n    // TODO: 2~n까지 소수 출력\n    \n    return 0;\n}' },
        ]
    },
    {
        id: "final", title: "최종 챌린지", icon: "🏆", color: "#f97316", lessons: [
            { id: "c-final-1", title: "🔥 글자 수 세기", type: "challenge", desc: "문자열에서 각 알파벳 빈도를 세세요", xp: 50, content: "💪 문장을 입력받아 알파벳별 등장 횟수를 출력하세요.", hint: "int freq[26] = {0}; 배열에 빈도를 저장하세요", code: '#include <stdio.h>\n#include <ctype.h>\n\nint main() {\n    char text[256];\n    int freq[26] = {0};\n    printf("문장 입력: ");\n    fgets(text, sizeof(text), stdin);\n    // TODO: 각 알파벳의 빈도를 세세요\n    \n    return 0;\n}' },
            { id: "c-final-2", title: "🔥 고급 계산기", type: "challenge", desc: "사칙연산 + 거듭제곱 계산기", xp: 50, content: "💪 두 수와 연산자를 입력받아 결과를 출력하세요. +, -, *, /, ^(거듭제곱)을 지원합니다.", hint: "switch문으로 연산자를 분기하고, 거듭제곱은 for문으로 구현", code: '#include <stdio.h>\n\nint main() {\n    double a, b;\n    char op;\n    printf("수식 입력 (예: 2 ^ 10): ");\n    scanf("%lf %c %lf", &a, &op, &b);\n    // TODO: 연산자별 계산\n    \n    return 0;\n}' },
            { id: "c-final-3", title: "🔥 틱택토 분석기", type: "challenge", desc: "3×3 틱택토 보드의 승자를 판별", xp: 60, content: "💪 3×3 틱택토 보드를 입력받아 X 승리, O 승리, 무승부를 판별하세요.", hint: "가로3, 세로3, 대각선2 총 8줄을 검사하세요", code: '#include <stdio.h>\n\nint main() {\n    char board[3][3];\n    printf("보드 입력 (X, O, .):\\n");\n    for (int i = 0; i < 3; i++)\n        for (int j = 0; j < 3; j++)\n            scanf(" %c", &board[i][j]);\n    // TODO: 승자 판별\n    \n    return 0;\n}' },
        ]
    },
];

// ─── Main View Mode ───
type ViewMode = "tracks" | "c-course" | "web-editor";

export default function LearningPage() {
    return (
        <Suspense fallback={<div style={{ minHeight: "100vh", background: "#1e1c1a" }} />}>
            <LearningPageInner />
        </Suspense>
    );
}

function LearningPageInner() {
    const searchParams = useSearchParams();
    const initialView = (searchParams.get("view") as ViewMode) || "tracks";
    const [viewMode, setViewMode] = useState<ViewMode>(initialView);
    const [activeTrack, setActiveTrack] = useState<string | null>(null);
    const [completedByTrack, setCompletedByTrack] = useState<Record<string, number>>({});
    // C course states
    const [activeCSection, setActiveCSection] = useState(cCourse[0].id);
    const [activeCLesson, setActiveCLesson] = useState<CLesson | null>(null);
    const [cCode, setCCode] = useState("");
    const [completedCLessons, setCompletedCLessons] = useState<string[]>([]);
    const [showHint, setShowHint] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    // Web editor states
    const [selectedLesson, setSelectedLesson] = useState(webLessons[0]);
    const [code, setCode] = useState(webLessons[0].code);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [filterCat, setFilterCat] = useState("전체");
    const [showXpToast, setShowXpToast] = useState(false);
    const [earnedXp, setEarnedXp] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const supabase = createClient();

    const t = {
        bgPrimary: "#1e1c1a", bgSecondary: "#252320", bgCard: "#2d2a26", bgEditor: "#1e1c1a",
        textPrimary: "#f5f0e8", textSecondary: "#b0a898", border: "#3a3632",
        hover: "#3e3830", accent: "#EC5212", headerBg: "rgba(30,28,26,0.95)",
    };

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) { window.location.href = "/login"; return; }
            setUserId(data.user.id);
        });
    }, [supabase]);

    const fetchCompleted = useCallback(async () => {
        if (!userId) return;
        try {
            const { data } = await supabase.from("learning_progress").select("lesson_id, subject")
                .eq("user_id", userId).eq("completed", true);
            if (data) {
                setCompletedLessons(data.filter(d => d.subject === "html-css").map(d => d.lesson_id));
                setCompletedCLessons(data.filter(d => d.subject === "c-course").map(d => d.lesson_id));
                const trackCounts: Record<string, number> = {};
                data.forEach(d => { trackCounts[d.subject] = (trackCounts[d.subject] || 0) + 1; });
                setCompletedByTrack(trackCounts);
            }
        } catch (err) { console.error(err); }
    }, [userId, supabase]);

    useEffect(() => { if (userId) fetchCompleted(); }, [userId, fetchCompleted]);

    const updatePreview = useCallback(() => {
        if (!iframeRef.current) return;
        const doc = iframeRef.current.contentDocument;
        if (doc) { doc.open(); doc.write(code); doc.close(); }
    }, [code]);
    useEffect(() => { if (viewMode === "web-editor") updatePreview(); }, [code, updatePreview, viewMode]);

    const selectLesson = (lesson: Lesson) => { setSelectedLesson(lesson); setCode(lesson.code); };

    const markComplete = async () => {
        if (!userId || completedLessons.includes(selectedLesson.id)) return;
        try {
            await supabase.from("learning_progress").upsert({
                user_id: userId, subject: "html-css", lesson_id: selectedLesson.id, completed: true,
            }, { onConflict: "user_id,subject,lesson_id" });
            setCompletedLessons([...completedLessons, selectedLesson.id]);
            setEarnedXp(selectedLesson.xp);
            setShowXpToast(true);
            setTimeout(() => setShowXpToast(false), 2500);
        } catch (err) { console.error(err); }
    };

    const totalXp = completedLessons.reduce((sum, id) => sum + (webLessons.find(l => l.id === id)?.xp || 0), 0);
    const filtered = filterCat === "전체" ? webLessons : webLessons.filter(l => l.category === filterCat);

    // ─── RENDER ───
    return (
        <div style={{ minHeight: "100vh", background: t.bgPrimary, fontFamily: "'Pretendard', system-ui, sans-serif", color: t.textPrimary }}>

            {/* ═══ Header ═══ */}
            <motion.header initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{
                background: t.headerBg, backdropFilter: "blur(20px)", borderBottom: `1px solid ${t.border}`,
                padding: "0 clamp(16px, 3vw, 32px)", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between",
                position: "sticky", top: 0, zIndex: 50,
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <Link href="/dashboard" style={{ textDecoration: "none", color: t.accent, fontSize: 13, fontWeight: 600 }}>← 대시보드</Link>
                    <span style={{ color: t.border }}>|</span>
                    <h1 style={{ fontSize: 16, fontWeight: 800, margin: 0 }}>📚 학습 플랫폼</h1>
                </div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {([{ key: "tracks" as const, icon: "🗂️", label: "트랙 허브" }, { key: "c-course" as const, icon: "⚡", label: "C 코스" }, { key: "web-editor" as const, icon: "🌐", label: "웹 에디터" }]).map(v => (
                        <button key={v.key} onClick={() => setViewMode(v.key)} style={{
                            padding: "6px 14px", borderRadius: 20, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer",
                            background: viewMode === v.key ? t.accent : t.bgCard, color: viewMode === v.key ? "#fff" : t.textSecondary,
                        }}>{v.icon} {v.label}</button>
                    ))}
                </div>
            </motion.header>

            {viewMode === "tracks" ? (
                /* ═══════════════════════════════════════════
                   TRACK HUB VIEW — 5개 학습 트랙 카드
                   ═══════════════════════════════════════════ */
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px 60px" }}>

                    {/* Track Stats Bar */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{
                        textAlign: "center", marginBottom: 36,
                    }}>
                        <h2 style={{
                            fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900,
                            background: "linear-gradient(135deg, #EC5212, #e8854a, #22c55e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                        }}>학습 플랫폼</h2>
                        <p style={{ color: t.textSecondary, fontSize: 14, marginTop: 8 }}>
                            코딩 기초 사고력 · 컴퓨팅 사고력 · C 언어 · KOI 기출 · 워드프로세서를 체계적으로 학습하세요
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
                            <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 50, padding: "8px 18px", fontSize: 13, fontWeight: 700 }}>
                                📊 총 <span style={{ color: t.accent }}>{tracks.reduce((s, tr) => s + tr.totalProblems, 0).toLocaleString()}</span> 문제
                            </div>
                            <div style={{ background: t.bgCard, border: `1px solid ${t.border}`, borderRadius: 50, padding: "8px 18px", fontSize: 13, fontWeight: 700 }}>
                                📁 <span style={{ color: "#22c55e" }}>5</span> 트랙
                            </div>
                        </div>
                    </motion.div>

                    {/* Track Cards Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20, marginBottom: 32 }}>
                        {tracks.map((track, i) => {
                            const completed = completedByTrack[track.id] || 0;
                            const pct = Math.round((completed / track.totalProblems) * 100);
                            const isExpanded = activeTrack === track.id;
                            return (
                                <motion.div key={track.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                                    onClick={() => setActiveTrack(isExpanded ? null : track.id)}
                                    style={{
                                        background: t.bgCard, border: `1.5px solid ${t.border}`, borderRadius: 16,
                                        padding: "28px 24px", cursor: "pointer", position: "relative", overflow: "hidden",
                                        transition: "all 0.3s", borderColor: isExpanded ? track.color : t.border,
                                    }}
                                    whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}
                                >
                                    {/* Top accent bar */}
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: track.gradient, borderRadius: "16px 16px 0 0" }} />

                                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                        <span style={{ fontSize: 32 }}>{track.icon}</span>
                                        <div>
                                            <div style={{ fontSize: 16, fontWeight: 800 }}>{track.name}</div>
                                            <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>{track.desc}</div>
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: `${track.color}15`, color: track.color }}>
                                            {track.domains.length}개 영역
                                        </span>
                                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: `${track.color}15`, color: track.color }}>
                                            {track.totalProblems.toLocaleString()}문제
                                        </span>
                                    </div>

                                    {/* Progress */}
                                    <div style={{ height: 5, background: "#2d2a26", borderRadius: 99, overflow: "hidden", marginBottom: 6 }}>
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8 }}
                                            style={{ height: "100%", background: track.gradient, borderRadius: 99 }} />
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: t.textSecondary }}>
                                        <span>진행률 <strong style={{ color: t.textPrimary }}>{pct}%</strong></span>
                                        <span>{completed}/{track.totalProblems}</span>
                                    </div>

                                    {/* Expanded: Domain list */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                                                style={{ marginTop: 16, overflow: "hidden" }}>
                                                <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 16 }}>
                                                    {track.domains.map(domain => (
                                                        <div key={domain.name} style={{ marginBottom: 14 }}>
                                                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                                                                <span style={{ fontSize: 16 }}>{domain.icon}</span>
                                                                <span style={{ fontSize: 13, fontWeight: 700 }}>{domain.name}</span>
                                                                <span style={{ fontSize: 10, color: domain.color, fontWeight: 600, marginLeft: "auto" }}>{domain.problems}문제</span>
                                                            </div>
                                                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                                                {domain.difficulties.map(diff => (
                                                                    <div key={diff.label} style={{
                                                                        flex: "1 1 auto", minWidth: 100, background: t.bgPrimary, borderRadius: 10,
                                                                        padding: "10px 12px", border: `1px solid ${t.border}`,
                                                                    }}>
                                                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                                                                            <span style={{ fontSize: 11, fontWeight: 700, color: diffBadgeColors[diff.label] || t.textPrimary }}>{diff.label}</span>
                                                                            <span style={{ fontSize: 10, color: t.textSecondary }}>{diff.count}문제</span>
                                                                        </div>
                                                                        <div style={{ fontSize: 10, color: t.textSecondary, lineHeight: 1.4 }}>{diff.desc}</div>
                                                                        <div style={{ fontSize: 9, color: t.textSecondary, marginTop: 4 }}>⏱️ {diff.time}</div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div style={{ fontSize: 13, fontWeight: 700, color: t.textSecondary, marginTop: 12, display: "flex", alignItems: "center", gap: 6 }}>
                                        {isExpanded ? "접기 ▲" : "상세보기 ▼"}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>

                    {/* Web Editor Quick Link */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ textAlign: "center" }}>
                        <button onClick={() => setViewMode("web-editor")} style={{
                            display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 32px",
                            background: "linear-gradient(135deg, #EC5212, #e8854a)", color: "#fff", border: "none",
                            borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer",
                            boxShadow: "0 4px 16px rgba(236,82,18,0.25)",
                        }}>
                            🌐 HTML/CSS/JS 웹 에디터로 이동
                        </button>
                    </motion.div>
                </div>
            ) : viewMode === "c-course" ? (
                /* ═══════════════════════════════════════════
                   C COURSE JOURNEY VIEW — coddy.tech 스타일
                   ═══════════════════════════════════════════ */
                <div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
                    {/* Left: Section Sidebar */}
                    <aside style={{ width: 280, background: t.bgSecondary, borderRight: `1px solid ${t.border}`, overflowY: "auto", display: "flex", flexDirection: "column" }}>
                        <div style={{ padding: 16, borderBottom: `1px solid ${t.border}` }}>
                            <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>⚡ C for Beginners</div>
                            <div style={{ fontSize: 11, color: t.textSecondary }}>
                                {cCourse.reduce((s, sec) => s + sec.lessons.length, 0)}개 레슨 · {cCourse.reduce((s, sec) => s + sec.lessons.filter(l => l.type === "challenge").length, 0)}개 챌린지
                            </div>
                            <div style={{ marginTop: 10 }}>
                                <div style={{ height: 5, background: t.bgCard, borderRadius: 99, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${(completedCLessons.length / cCourse.reduce((s, sec) => s + sec.lessons.length, 0)) * 100}%`, background: `linear-gradient(90deg, #22c55e, ${t.accent})`, borderRadius: 99, transition: "width 0.5s" }} />
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: t.textSecondary, marginTop: 4 }}>
                                    <span>{completedCLessons.length}/{cCourse.reduce((s, sec) => s + sec.lessons.length, 0)} 완료</span>
                                    <span>⚡ {completedCLessons.reduce((s, id) => { const l = cCourse.flatMap(sec => sec.lessons).find(l => l.id === id); return s + (l?.xp || 0); }, 0)} XP</span>
                                </div>
                            </div>
                        </div>
                        {/* Sections */}
                        <div style={{ flex: 1, overflowY: "auto", padding: 8 }}>
                            {cCourse.map(section => {
                                const isActive = activeCSection === section.id;
                                const sectionDone = section.lessons.filter(l => completedCLessons.includes(l.id)).length;
                                return (
                                    <div key={section.id} style={{ marginBottom: 4 }}>
                                        <button onClick={() => setActiveCSection(isActive ? "" : section.id)} style={{
                                            width: "100%", padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer",
                                            background: isActive ? `${section.color}15` : "transparent", color: t.textPrimary,
                                            textAlign: "left", display: "flex", alignItems: "center", gap: 8,
                                        }}>
                                            <span style={{ fontSize: 18 }}>{section.icon}</span>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ fontSize: 13, fontWeight: 700 }}>{section.title}</div>
                                                <div style={{ fontSize: 10, color: t.textSecondary }}>{sectionDone}/{section.lessons.length}</div>
                                            </div>
                                            <span style={{ fontSize: 10, color: t.textSecondary }}>{isActive ? "▲" : "▼"}</span>
                                        </button>
                                        {isActive && (
                                            <div style={{ padding: "4px 0 4px 18px" }}>
                                                {section.lessons.map(lesson => {
                                                    const done = completedCLessons.includes(lesson.id);
                                                    const selected = activeCLesson?.id === lesson.id;
                                                    return (
                                                        <button key={lesson.id} onClick={() => { setActiveCLesson(lesson); setCCode(lesson.code); setShowHint(false); }} style={{
                                                            width: "100%", padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                                                            background: selected ? `${section.color}20` : "transparent", color: t.textPrimary,
                                                            textAlign: "left", display: "flex", alignItems: "center", gap: 8, marginBottom: 2,
                                                            borderLeft: selected ? `3px solid ${section.color}` : "3px solid transparent",
                                                        }}>
                                                            <span style={{ fontSize: 14, flexShrink: 0 }}>{done ? "✅" : lesson.type === "challenge" ? "🎯" : "📖"}</span>
                                                            <div style={{ flex: 1 }}>
                                                                <div style={{ fontSize: 12, fontWeight: selected ? 700 : 500, color: selected ? section.color : t.textPrimary }}>{lesson.title}</div>
                                                            </div>
                                                            <span style={{ fontSize: 9, color: "#FCAD00", fontWeight: 700 }}>+{lesson.xp}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Right: Lesson Content + Code Editor */}
                    {activeCLesson ? (
                        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            {/* Lesson Header */}
                            <div style={{ padding: "16px 24px", background: t.bgSecondary, borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: activeCLesson.type === "challenge" ? "#f59e0b20" : "#22c55e20", color: activeCLesson.type === "challenge" ? "#f59e0b" : "#22c55e" }}>
                                            {activeCLesson.type === "challenge" ? "챌린지" : "레슨"}
                                        </span>
                                        <span style={{ fontSize: 10, color: "#FCAD00", fontWeight: 700 }}>+{activeCLesson.xp} XP</span>
                                    </div>
                                    <div style={{ fontSize: 18, fontWeight: 800 }}>{activeCLesson.title}</div>
                                    <div style={{ fontSize: 12, color: t.textSecondary, marginTop: 2 }}>{activeCLesson.desc}</div>
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    {activeCLesson.hint && (
                                        <button onClick={() => setShowHint(!showHint)} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${t.border}`, background: showHint ? t.bgCard : "transparent", color: t.textSecondary, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                                            💡 힌트
                                        </button>
                                    )}
                                    <button onClick={() => setCCode(activeCLesson.code)} style={{ padding: "6px 14px", borderRadius: 8, border: `1px solid ${t.border}`, background: "transparent", color: t.textSecondary, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>
                                        ↺ 리셋
                                    </button>
                                    <button onClick={async () => {
                                        if (!userId || !activeCLesson || completedCLessons.includes(activeCLesson.id)) return;
                                        try {
                                            await supabase.from("learning_progress").upsert({ user_id: userId, subject: "c-course", lesson_id: activeCLesson.id, completed: true }, { onConflict: "user_id,subject,lesson_id" });
                                            setCompletedCLessons([...completedCLessons, activeCLesson.id]);
                                            setEarnedXp(activeCLesson.xp); setShowXpToast(true); setTimeout(() => setShowXpToast(false), 2500);
                                        } catch (err) { console.error(err); }
                                    }} disabled={completedCLessons.includes(activeCLesson.id)} style={{
                                        padding: "7px 18px", borderRadius: 8, border: "none", fontSize: 12, fontWeight: 700, cursor: "pointer",
                                        background: completedCLessons.includes(activeCLesson.id) ? "#22c55e" : t.accent, color: "#fff",
                                    }}>{completedCLessons.includes(activeCLesson.id) ? "✅ 완료" : "✓ 완료하기"}</button>
                                </div>
                            </div>

                            {/* Lesson Content Card */}
                            <div style={{ padding: "12px 24px", background: t.bgPrimary, borderBottom: `1px solid ${t.border}` }}>
                                <div style={{ background: t.bgCard, borderRadius: 12, padding: "14px 18px", border: `1px solid ${t.border}` }}>
                                    <p style={{ fontSize: 13, lineHeight: 1.7, color: t.textPrimary, margin: 0 }}>{activeCLesson.content}</p>
                                </div>
                                {showHint && activeCLesson.hint && (
                                    <div style={{ marginTop: 8, background: "rgba(245,158,11,0.08)", borderRadius: 10, padding: "10px 14px", border: "1px solid rgba(245,158,11,0.2)" }}>
                                        <div style={{ fontSize: 12, color: "#f59e0b", fontWeight: 700, marginBottom: 4 }}>💡 힌트</div>
                                        <div style={{ fontSize: 12, color: t.textSecondary, lineHeight: 1.5 }}>{activeCLesson.hint}</div>
                                    </div>
                                )}
                            </div>

                            {/* Code Editor */}
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                                <div style={{ padding: "0 16px", height: 34, background: t.bgCard, borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                                    <span style={{ width: 10, height: 10, borderRadius: 999, background: "#f85149" }} />
                                    <span style={{ width: 10, height: 10, borderRadius: 999, background: "#d29922" }} />
                                    <span style={{ width: 10, height: 10, borderRadius: 999, background: "#3fb950" }} />
                                    <span style={{ marginLeft: 8, fontSize: 12, fontWeight: 600, color: t.textSecondary }}>main.c</span>
                                    <Link href="/dashboard/compiler" style={{ marginLeft: "auto", fontSize: 11, color: t.accent, fontWeight: 600, textDecoration: "none" }}>🖥️ 컴파일러에서 실행 →</Link>
                                </div>
                                <div style={{ flex: 1, display: "flex", overflow: "auto" }}>
                                    <div style={{ padding: "14px 0", minWidth: 40, textAlign: "right", fontFamily: "monospace", fontSize: 13, lineHeight: "1.6", color: "rgba(255,255,255,0.15)", userSelect: "none", borderRight: `1px solid ${t.border}`, paddingRight: 10 }}>
                                        {cCode.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
                                    </div>
                                    <textarea value={cCode} onChange={(e) => setCCode(e.target.value)} spellCheck={false} style={{
                                        flex: 1, padding: "14px 16px", border: "none", background: t.bgPrimary, fontFamily: "'Fira Code', monospace",
                                        fontSize: 13, lineHeight: 1.6, resize: "none", outline: "none", tabSize: 4, color: "#c9d1d9", caretColor: t.accent,
                                    }} onKeyDown={(e) => { if (e.key === "Tab") { e.preventDefault(); const ta = e.target as HTMLTextAreaElement; const s = ta.selectionStart; setCCode(cCode.substring(0, s) + "    " + cCode.substring(ta.selectionEnd)); setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + 4; }, 0); } }} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: t.bgPrimary }}>
                            <div style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 48, marginBottom: 16 }}>⚡</div>
                                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>C 언어 기초 코스</div>
                                <div style={{ fontSize: 13, color: t.textSecondary, lineHeight: 1.6, maxWidth: 400 }}>
                                    coddy.tech 스타일의 bite-sized 레슨으로<br />C 프로그래밍을 처음부터 배워보세요.
                                </div>
                                <div style={{ marginTop: 20, display: "flex", gap: 12, justifyContent: "center" }}>
                                    <button onClick={() => { setActiveCSection("intro"); setActiveCLesson(cCourse[0].lessons[0]); setCCode(cCourse[0].lessons[0].code); }} style={{
                                        padding: "10px 24px", borderRadius: 10, border: "none", background: t.accent, color: "#fff",
                                        fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: `0 4px 16px ${t.accent}40`,
                                    }}>🚀 시작하기</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                /* ═══════════════════════════════════════════
                   WEB EDITOR VIEW — 기존 코드 에디터
                   ═══════════════════════════════════════════ */
                <div style={{ flex: 1, display: "flex", flexDirection: "row", height: "calc(100vh - 60px)" }}>

                    {/* Sidebar */}
                    <aside style={{
                        width: 280, background: t.bgSecondary, borderRight: `1px solid ${t.border}`,
                        overflowY: "auto", display: "flex", flexDirection: "column",
                    }}>
                        <div style={{ padding: 16, borderBottom: `1px solid ${t.border}` }}>
                            <div style={{ background: "rgba(236,82,18,0.08)", borderRadius: 12, padding: 14 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary }}>진행률</span>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>{Math.round((completedLessons.length / webLessons.length) * 100)}%</span>
                                </div>
                                <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 99, overflow: "hidden" }}>
                                    <div style={{ height: "100%", width: `${(completedLessons.length / webLessons.length) * 100}%`, background: "linear-gradient(90deg, #77C6B3, #EC5212)", borderRadius: 99, transition: "width 0.5s" }} />
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: t.textSecondary }}>
                                    <span>{completedLessons.length}/{webLessons.length} 완료</span>
                                    <span>⚡ {totalXp} XP</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: "12px 16px 8px", display: "flex", gap: 6, flexWrap: "wrap" }}>
                            {webCategories.map(cat => (
                                <button key={cat} onClick={() => setFilterCat(cat)} style={{
                                    padding: "5px 14px", borderRadius: 20, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
                                    background: filterCat === cat ? (cat === "전체" ? t.accent : catColors[cat]) : "rgba(255,255,255,0.06)",
                                    color: filterCat === cat ? "#fff" : t.textSecondary,
                                }}>{cat}</button>
                            ))}
                        </div>

                        <div style={{ flex: 1, overflowY: "auto", padding: "4px 12px 16px" }}>
                            {filtered.map(lesson => {
                                const done = completedLessons.includes(lesson.id);
                                const active = selectedLesson.id === lesson.id;
                                return (
                                    <button key={lesson.id} onClick={() => selectLesson(lesson)} style={{
                                        width: "100%", textAlign: "left", padding: "12px 14px", border: "none",
                                        borderRadius: 12, marginBottom: 4, cursor: "pointer", display: "block",
                                        background: active ? "rgba(236,82,18,0.12)" : "transparent",
                                        borderLeft: active ? `3px solid ${t.accent}` : "3px solid transparent",
                                        color: t.textPrimary,
                                    }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                            <span style={{ fontSize: 14 }}>{done ? "✅" : active ? "▶️" : "📄"}</span>
                                            <span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: `${catColors[lesson.category]}20`, color: catColors[lesson.category] }}>{lesson.category}</span>
                                            <span style={{ fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: `${diffColors[lesson.difficulty]}15`, color: diffColors[lesson.difficulty] }}>{lesson.difficulty}</span>
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? t.accent : t.textPrimary, display: "block" }}>{lesson.title}</span>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                                            <span style={{ fontSize: 11, color: t.textSecondary }}>{lesson.desc}</span>
                                            <span style={{ fontSize: 10, color: "#FCAD00", fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>+{lesson.xp} XP</span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    {/* Editor + Preview */}
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr" }}>
                        {/* Code Editor */}
                        <div style={{ display: "flex", flexDirection: "column", borderRight: `1px solid ${t.border}` }}>
                            <div style={{ padding: "0 16px", height: 40, background: t.bgCard, borderBottom: `1px solid ${t.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <div style={{ display: "flex", alignItems: "center", gap: 6, background: t.bgEditor, padding: "4px 14px", borderRadius: "8px 8px 0 0", borderBottom: `2px solid ${t.accent}`, fontSize: 12, fontWeight: 600 }}>
                                    <span style={{ color: catColors[selectedLesson.category] || "#999" }}>●</span>
                                    {selectedLesson.title}
                                </div>
                                <div style={{ display: "flex", gap: 8 }}>
                                    <button onClick={() => setCode(selectedLesson.code)} style={{ background: "none", border: `1px solid ${t.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 11, cursor: "pointer", color: t.textSecondary, fontWeight: 600 }}>↺ 리셋</button>
                                    <button onClick={markComplete} disabled={completedLessons.includes(selectedLesson.id)} style={{
                                        padding: "5px 16px", borderRadius: 8, border: "none", fontSize: 11, fontWeight: 700, cursor: "pointer",
                                        background: completedLessons.includes(selectedLesson.id) ? "#05B20C" : t.accent, color: "#fff",
                                    }}>{completedLessons.includes(selectedLesson.id) ? "✅ 완료됨" : "✓ 완료하기"}</button>
                                </div>
                            </div>
                            <div style={{ flex: 1, display: "flex", overflow: "auto", background: t.bgEditor }}>
                                <div style={{ padding: "16px 0", minWidth: 44, textAlign: "right", fontFamily: "monospace", fontSize: 13, lineHeight: "1.6", color: "rgba(255,255,255,0.2)", userSelect: "none", borderRight: `1px solid ${t.border}`, paddingRight: 12 }}>
                                    {code.split("\n").map((_, i) => <div key={i}>{i + 1}</div>)}
                                </div>
                                <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} style={{
                                    flex: 1, padding: 16, border: "none", background: "transparent", fontFamily: "monospace",
                                    fontSize: 13, lineHeight: "1.6", resize: "none", outline: "none", tabSize: 2, color: t.textPrimary, caretColor: t.accent,
                                }} onKeyDown={(e) => { if (e.key === "Tab") { e.preventDefault(); const ta = e.target as HTMLTextAreaElement; const s = ta.selectionStart; setCode(code.substring(0, s) + "  " + code.substring(ta.selectionEnd)); setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + 2; }, 0); } }} />
                            </div>
                        </div>

                        {/* Preview */}
                        <div style={{ display: "flex", flexDirection: "column", background: t.bgCard }}>
                            <div style={{ height: 40, padding: "0 16px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ display: "flex", gap: 5 }}>
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary }}>미리보기</span>
                            </div>
                            <iframe ref={iframeRef} style={{ flex: 1, border: "none", background: "#fff" }} sandbox="allow-scripts" title="Preview" />
                        </div>
                    </div>
                </div>
            )}

            {/* XP Toast */}
            <AnimatePresence>
                {showXpToast && (
                    <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} style={{
                        position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
                        background: "linear-gradient(135deg, #FCAD00, #E85A18)", color: "#fff", padding: "12px 28px",
                        borderRadius: 16, fontWeight: 700, fontSize: 16, zIndex: 999, boxShadow: "0 8px 32px rgba(252,173,0,0.4)",
                    }}>⚡ +{earnedXp} XP 획득!</motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
