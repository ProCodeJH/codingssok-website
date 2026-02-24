/**
 * 코딩쏙 아카데미 — 전체 커리큘럼 인덱스
 * 7개 코스 / C언어만 실 콘텐츠, 나머지 껍데기
 */

import type { Course, Chapter } from './types';
import { C_LANG_PART1 } from './c-lang-part1';
import { C_LANG_PART2 } from './c-lang-part2';
import { C_LANG_PART3 } from './c-lang-part3';
import { C_LANG_PART4 } from './c-lang-part4';
import { C_LANG_PART5 } from './c-lang-part5';
import { C_LANG_PART6 } from './c-lang-part6';
import { C_LANG_PART7 } from './c-lang-part7';
import { C_LANG_PART8 } from './c-lang-part8';
import { C_LANG_PART9 } from './c-lang-part9';
import { C_LANG_PART10 } from './c-lang-part10';

// ── C언어 전체 챕터 (10개 파트 → 13 챕터, 85 유닛) ──
const C_LANG_ALL_CHAPTERS = [
    ...C_LANG_PART1,
    ...C_LANG_PART2,
    ...C_LANG_PART3,
    ...C_LANG_PART4,
    ...C_LANG_PART5,
    ...C_LANG_PART6,
    ...C_LANG_PART7,
    ...C_LANG_PART8,
    ...C_LANG_PART9,
    ...C_LANG_PART10,
];

// ── 빈 챕터 (준비 중 코스용) ──
const EMPTY_CHAPTERS: Chapter[] = [
    {
        id: 'coming-soon',
        chapterNumber: 0,
        title: '준비 중',
        icon: '🔜',
        description: '콘텐츠를 준비하고 있습니다.',
        units: [{
            id: 'placeholder',
            unitNumber: 0,
            title: '콘텐츠 준비 중입니다',
            type: '이론' as const,
            problems: [],
            pages: [],
        }],
    },
];

// ── 코스 정의 (7개) ──

export const COURSES: Course[] = [
    {
        id: '1',
        title: '코딩 기초',
        icon: '🌱',
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
        description: '프로그래밍의 기본 개념, 논리적 사고, 알고리즘 기초를 배우는 입문 코스입니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '2',
        title: '피지컬 컴퓨팅',
        icon: '🤖',
        gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
        description: '아두이노, 센서, LED를 활용한 피지컬 컴퓨팅과 IoT 프로젝트를 실습합니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '3',
        title: '파이썬',
        icon: '🐍',
        gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)',
        description: '파이썬의 기초 문법부터 자료구조, 함수, 클래스까지 체계적으로 학습합니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '4',
        title: 'C언어',
        icon: '💻',
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        description: 'C언어의 기초부터 구조체, 함수, 파일I/O, 실전 프로젝트까지 13개 챕터, 85개 유닛으로 완벽 마스터합니다.',
        totalUnits: 85,
        totalProblems: 950,
        estimatedHours: 80,
        chapters: C_LANG_ALL_CHAPTERS,
        htmlPath: '/learn/C언어/index.html',
    },
    {
        id: '5',
        title: 'CosPro',
        icon: '🏅',
        gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
        description: 'COS-Pro 1급·2급 자격증 대비 알고리즘, 자료구조, 실전 구현 연습을 합니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '6',
        title: '프로그래밍 대회',
        icon: '🏆',
        gradient: 'linear-gradient(135deg, #f97316, #eab308)',
        description: 'KOI, USACO 등 프로그래밍 대회 준비를 위한 알고리즘 문제풀이 코스입니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '7',
        title: '자격증',
        icon: '📋',
        gradient: 'linear-gradient(135deg, #8b5cf6, #d946ef)',
        description: '정보처리기능사, 워드프로세서 등 IT 자격증 대비 이론 및 모의고사를 제공합니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
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
export type { Course, Chapter, Unit, Quiz, CodeProblem, Page } from './types';
