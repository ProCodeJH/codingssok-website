/**
 * 코딩쏙 아카데미 — 커리큘럼 데이터 타입 정의
 * 200+ 유닛 커리큘럼을 위한 공통 타입
 */

/** 퀴즈 (객관식) */
export interface Quiz {
    question: string;
    options: string[];
    answer: number; // 0~3 index
    explanation: string;
}

/** 코드 문제 */
export interface CodeProblem {
    id: number;
    title: string;
    difficulty: 1 | 2 | 3; // 1=쉬움, 2=보통, 3=어려움
    question: string; // HTML or markdown
    answer: string;    // HTML or markdown
    codeTemplate?: string; // 코드 실행 문제용 초기 코드
}

/** 학습 유닛 (하나의 레슨) */
export interface Unit {
    id: string;
    unitNumber: number;
    title: string;
    subtitle: string;
    duration: string;
    type: "이론" | "실습" | "퀴즈" | "종합";
    difficulty: 1 | 2 | 3;
    content: string; // 학습 내용 (HTML/markdown)
    tip?: string;
    quiz: Quiz;
    problems: CodeProblem[];
    problemCount: number;
}

/** 챕터 (유닛들의 묶음) */
export interface Chapter {
    id: string;
    chapterNumber: number;
    title: string;
    icon: string;
    description: string;
    units: Unit[];
}

/** 코스 (챕터들의 묶음) */
export interface Course {
    id: string;
    title: string;
    icon: string;
    gradient: string;
    description: string;
    totalUnits: number;
    totalProblems: number;
    estimatedHours: number;
    chapters: Chapter[];
}
