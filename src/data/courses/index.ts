/**
 * 코딩쏙 아카데미 — 전체 커리큘럼 인덱스
 * 총 137+ 유닛 / 45 챕터 / 4개 코스
 */

import type { Course } from './types';
import { C_LANG_CH01_07 } from './c-lang-ch01-07';
import { C_LANG_CH08_17 } from './c-lang-ch08-17';
import { C_LANG_CH18_28 } from './c-lang-ch18-28';
import { COMPUTATIONAL_THINKING_CHAPTERS } from './computational-thinking';
import { CODING_BASICS_CHAPTERS } from './coding-basics';
import { PYTHON_CHAPTERS } from './python';

// ── 코스 정의 ──

export const COURSES: Course[] = [
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
