/**
 * 코딩쏙 아카데미 — 전체 커리큘럼 인덱스
 * 학습 자료는 추후 추가 예정
 */

import type { Course, Chapter } from './types';
import { PYTHON_BASICS } from './python-basics';

// ── 빈 챕터 (준비 중 코스용) ──
const EMPTY_CHAPTERS: Chapter[] = [
    {
        id: 'coming-soon',
        chapterNumber: 0,
        title: '준비 중',
        icon: '',
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

// ── CosPro 서브 코스 정의 ──
export interface CosProSubCourse {
    id: string;
    title: string;
    subtitle: string;
    language: 'Python' | 'C';
    level: 1 | 2;
    gradient: string;
    cardImage?: string;
    description: string;
    icon: string;
}

export const COSPRO_SUB_COURSES: CosProSubCourse[] = [
    {
        id: 'cospro-python-2',
        title: 'CosPro 파이썬 2급',
        subtitle: 'Python Level 2',
        language: 'Python',
        level: 2,
        gradient: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
        description: '파이썬 기초 문법, 자료형, 제어문, 함수 등 2급 시험 범위를 체계적으로 학습합니다.',
        icon: '🐍',
    },
    {
        id: 'cospro-python-1',
        title: 'CosPro 파이썬 1급',
        subtitle: 'Python Level 1',
        language: 'Python',
        level: 1,
        gradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
        description: '파이썬 고급 문법, 클래스, 알고리즘, 자료구조 등 1급 시험 범위를 마스터합니다.',
        icon: '🐍',
    },
    {
        id: 'cospro-c-2',
        title: 'CosPro C언어 2급',
        subtitle: 'C Language Level 2',
        language: 'C',
        level: 2,
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        description: 'C언어 기초 문법, 포인터, 배열, 구조체 등 2급 시험 범위를 체계적으로 학습합니다.',
        icon: '⚡',
    },
    {
        id: 'cospro-c-1',
        title: 'CosPro C언어 1급',
        subtitle: 'C Language Level 1',
        language: 'C',
        level: 1,
        gradient: 'linear-gradient(135deg, #ef4444, #f97316)',
        description: 'C언어 고급 문법, 동적 메모리, 파일I/O, 알고리즘 등 1급 시험 범위를 마스터합니다.',
        icon: '⚡',
    },
];

// ── 코스 정의 ──

export const COURSES: Course[] = [
    {
        id: '8',
        title: '컴퓨터 기초',
        icon: '',
        gradient: 'linear-gradient(135deg, #ec4899, #60a5fa)',
        cardImage: '/images/courses/computer-basics.jpg',
        description: '컴퓨터의 기본 구성 요소, 운영체제, 파일 관리, 인터넷 활용 등 컴퓨터 기초 지식을 배웁니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '1',
        title: '코딩 기초',
        icon: '',
        gradient: 'linear-gradient(135deg, #10b981, #06b6d4)',
        cardImage: '/images/courses/coding-basics.jpg',
        description: '프로그래밍의 기본 개념, 논리적 사고, 알고리즘 기초를 배우는 입문 코스입니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '2',
        title: '피지컬 컴퓨팅',
        icon: '',
        gradient: 'linear-gradient(135deg, #f59e0b, #f97316)',
        cardImage: '/images/courses/physical-computing.jpg',
        description: '아두이노, 센서, LED를 활용한 피지컬 컴퓨팅과 IoT 프로젝트를 실습합니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '3',
        title: '파이썬',
        icon: '',
        gradient: 'linear-gradient(135deg, #3b82f6, #3b82f6)',
        cardImage: '/images/courses/python.jpg',
        description: '파이썬의 기초 문법부터 자료구조, 함수, 클래스까지 체계적으로 학습합니다.',
        totalUnits: 4,
        totalProblems: 4,
        estimatedHours: 3,
        chapters: PYTHON_BASICS,
    },
    {
        id: '4',
        title: 'C언어',
        icon: '',
        gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)',
        cardImage: '/images/courses/c-lang.jpg',
        description: 'C언어의 기초부터 구조체, 함수, 파일I/O, 실전 프로젝트까지 체계적으로 학습합니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '5',
        title: 'CosPro',
        icon: '',
        gradient: 'linear-gradient(135deg, #ec4899, #f43f5e)',
        cardImage: '/images/courses/cospro.jpg',
        description: 'CosPro 파이썬/C언어 1급·2급 자격증 시험을 체계적으로 준비합니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '6',
        title: '프로그래밍 대회',
        icon: '',
        gradient: 'linear-gradient(135deg, #f97316, #eab308)',
        cardImage: '/images/courses/programming-contest.jpg',
        description: 'KOI, USACO 등 프로그래밍 대회 준비를 위한 알고리즘 문제풀이 코스입니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
    },
    {
        id: '7',
        title: '자격증',
        icon: '',
        gradient: 'linear-gradient(135deg, #2563eb, #d946ef)',
        cardImage: '/images/courses/certificate.jpg',
        description: '정보처리기능사, 워드프로세서 등 IT 자격증 대비 이론 및 모의고사를 제공합니다.',
        totalUnits: 0,
        totalProblems: 0,
        estimatedHours: 0,
        chapters: EMPTY_CHAPTERS,
        requiredTier: 'Bronze',
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
