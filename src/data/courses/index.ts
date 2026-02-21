/**
 * 코딩쏙 아카데미 — 전체 커리큘럼 인덱스
 * 총 9개 코스 / 200+ 유닛 / learning-platform 연동
 */

import type { Course } from './types';
import { C_LANG_CH01_07 } from './c-lang-ch01-07';
import { C_LANG_CH08_17 } from './c-lang-ch08-17';
import { C_LANG_CH18_28 } from './c-lang-ch18-28';
import { COMPUTATIONAL_THINKING_CHAPTERS } from './computational-thinking';
import { CODING_BASICS_CHAPTERS } from './coding-basics';
import { PYTHON_CHAPTERS } from './python';
import { KOI_CHAPTERS } from './koi';
import { PCCE_CHAPTERS } from './pcce';
import { COS_CHAPTERS } from './cos';
import { COS_PRO_CHAPTERS } from './cos-pro';
import { WORD_PROCESSOR_CHAPTERS } from './word-processor';

// ── 코스 정의 ──

export const COURSES: Course[] = [
    // ── 기존 4개 코스 (인라인 콘텐츠 + HTML 연동) ──
    {
        id: '1',
        title: '컴퓨팅 사고력',
        icon: '🧠',
        gradient: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
        description: '분해, 패턴 인식, 추상화, 알고리즘 설계의 4가지 핵심 사고력을 체계적으로 학습합니다.',
        totalUnits: 36,
        totalProblems: 327,
        estimatedHours: 18,
        chapters: COMPUTATIONAL_THINKING_CHAPTERS,
        htmlPath: '/learn/컴퓨팅사고력/index.html',
    },
    {
        id: '2',
        title: 'C언어 기초',
        icon: '💻',
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        description: 'C언어의 기초부터 자료구조, 알고리즘, 실전 모의고사까지 28개 챕터, 68개 유닛으로 완벽 마스터합니다.',
        totalUnits: 68,
        totalProblems: 880,
        estimatedHours: 60,
        chapters: [...C_LANG_CH01_07, ...C_LANG_CH08_17, ...C_LANG_CH18_28],
        htmlPath: '/learn/C언어/index.html',
    },
    {
        id: '3',
        title: '코딩 기초',
        icon: '🌱',
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
        description: '논리적 사고, 수학적 사고, 순서도, 문제해결 전략, 이산수학 기초를 배웁니다.',
        totalUnits: 15,
        totalProblems: 150,
        estimatedHours: 8,
        chapters: CODING_BASICS_CHAPTERS,
        htmlPath: '/learn/코딩기초/index.html',
    },
    {
        id: '7',
        title: '파이썬 기초',
        icon: '🐍',
        gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
        description: '파이썬의 기초 문법부터 자료구조, 함수, 파일 처리, 클래스까지 체계적으로 학습합니다.',
        totalUnits: 18,
        totalProblems: 187,
        estimatedHours: 15,
        chapters: PYTHON_CHAPTERS,
        htmlPath: '/learn/파이썬/index.html',
    },

    // ── 신규 5개 코스 (learning-platform 연동) ──
    {
        id: '4',
        title: 'KOI 기출',
        icon: '🏆',
        gradient: 'linear-gradient(135deg, #f97316, #eab308)',
        description: '한국정보올림피아드 2019~2025년 초·중·고 기출문제를 연도별로 풀어봅니다.',
        totalUnits: 11,
        totalProblems: 100,
        estimatedHours: 20,
        chapters: KOI_CHAPTERS,
        htmlPath: '/learn/KOI기출/index.html',
    },
    {
        id: '5',
        title: 'PCCE',
        icon: '📋',
        gradient: 'linear-gradient(135deg, #14b8a6, #0ea5e9)',
        description: '프로그래밍 언어 활용 능력 시험(PCCE) 대비 핵심 개념과 실전 모의고사를 학습합니다.',
        totalUnits: 6,
        totalProblems: 85,
        estimatedHours: 10,
        chapters: PCCE_CHAPTERS,
        htmlPath: '/learn/PCCE/index.html',
    },
    {
        id: '6',
        title: 'COS',
        icon: '🎯',
        gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
        description: 'Coding Specialist 자격증 대비 프로그래밍 기본과 실전 문제풀이를 학습합니다.',
        totalUnits: 4,
        totalProblems: 70,
        estimatedHours: 8,
        chapters: COS_CHAPTERS,
        htmlPath: '/learn/COS/index.html',
    },
    {
        id: '8',
        title: 'COS-Pro',
        icon: '🏅',
        gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
        description: 'COS-Pro 1급·2급 자격증 대비 고급 알고리즘, 자료구조, 실전 구현 연습을 합니다.',
        totalUnits: 4,
        totalProblems: 55,
        estimatedHours: 12,
        chapters: COS_PRO_CHAPTERS,
        htmlPath: '/learn/COS-Pro/index.html',
    },
    {
        id: '9',
        title: '워드프로세서',
        icon: '📄',
        gradient: 'linear-gradient(135deg, #64748b, #475569)',
        description: '워드프로세서 필기 자격증 대비 7대 영역 핵심 이론과 70문항 모의고사를 제공합니다.',
        totalUnits: 7,
        totalProblems: 70,
        estimatedHours: 6,
        chapters: WORD_PROCESSOR_CHAPTERS,
        htmlPath: '/learn/워드프로세서/index.html',
    },
];

// ── 유틸리티 함수 ──

/** 코스 ID로 코스 찾기 */
export function getCourseById(courseId: string): Course | undefined {
    return COURSES.find(c => c.id === courseId);
}

/** 코스의 모든 유닛을 flat 배열로 반환 */
export function getAllUnits(courseId: string) {
    const course = getCourseById(courseId);
    if (!course) return [];
    return course.chapters.flatMap(ch => ch.units);
}

/** 코스의 특정 유닛 찾기 */
export function getUnit(courseId: string, unitId: string) {
    return getAllUnits(courseId).find(u => u.id === unitId);
}

/** 전체 통계 */
export function getCurriculumStats() {
    return {
        totalCourses: COURSES.length,
        totalChapters: COURSES.reduce((sum, c) => sum + c.chapters.length, 0),
        totalUnits: COURSES.reduce((sum, c) => sum + c.totalUnits, 0),
        totalProblems: COURSES.reduce((sum, c) => sum + c.totalProblems, 0),
        totalHours: COURSES.reduce((sum, c) => sum + c.estimatedHours, 0),
    };
}

// Re-export types
export type { Course, Chapter, Unit, Quiz, CodeProblem } from './types';
