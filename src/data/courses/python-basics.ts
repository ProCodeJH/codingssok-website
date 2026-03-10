/**
 * 파이썬 기초 커리큘럼
 * 4개 유닛: Hello World, 변수/입력, 불 & 비교, 조건문
 */

import type { Chapter } from './types';

export const PYTHON_BASICS: Chapter[] = [
    {
        id: 'py-ch1',
        chapterNumber: 1,
        title: '파이썬 시작하기',
        icon: '🐍',
        description: '파이썬의 기초 문법과 출력, 변수, 입력을 배웁니다.',
        units: [
            {
                id: 'py-u01',
                unitNumber: 1,
                title: 'Hello, World! — 파이썬 첫 프로그램',
                subtitle: 'print() 함수로 화면에 출력하기',
                duration: '30분',
                type: '이론',
                difficulty: 1,
                pages: [
                    {
                        id: 'py-1.1',
                        title: 'Hello, World! 학습',
                        type: '페이지',
                        content: '<iframe src="/learn/파이썬/py-u01-hello-world.html" style="width:100%;height:100%;border:none;min-height:80vh" />'
                    },
                    {
                        id: 'py-1.q1',
                        title: 'Hello World 퀴즈',
                        type: '퀴즈',
                        quiz: {
                            question: '파이썬에서 화면에 문자를 출력하는 함수는?',
                            options: ['echo()', 'printf()', 'print()', 'console.log()'],
                            answer: 2,
                            explanation: 'Python에서는 print() 함수를 사용하여 화면에 출력합니다.'
                        }
                    },
                ],
            },
            {
                id: 'py-u02',
                unitNumber: 2,
                title: '변수와 입력 — 데이터를 담는 상자',
                subtitle: '변수 선언, input() 함수 사용법',
                duration: '40분',
                type: '이론',
                difficulty: 1,
                pages: [
                    {
                        id: 'py-2.1',
                        title: '변수와 입력 학습',
                        type: '페이지',
                        content: '<iframe src="/learn/파이썬/py-u02-variables-input.html" style="width:100%;height:100%;border:none;min-height:80vh" />'
                    },
                    {
                        id: 'py-2.q1',
                        title: '변수 퀴즈',
                        type: '퀴즈',
                        quiz: {
                            question: '파이썬에서  사용자 입력을 받는 함수는?',
                            options: ['scanf()', 'input()', 'read()', 'get()'],
                            answer: 1,
                            explanation: 'Python에서는 input() 함수를 사용하여 사용자 입력을 받습니다.'
                        }
                    },
                ],
            },
        ],
    },
    {
        id: 'py-ch2',
        chapterNumber: 2,
        title: '조건과 논리',
        icon: '🔀',
        description: '불(Bool) 자료형, 비교 연산자, 조건문을 배웁니다.',
        units: [
            {
                id: 'py-u03',
                unitNumber: 3,
                title: 'Bool과 비교 연산자',
                subtitle: 'True/False와 비교 연산 이해하기',
                duration: '35분',
                type: '이론',
                difficulty: 1,
                pages: [
                    {
                        id: 'py-3.1',
                        title: 'Bool과 비교 연산자 학습',
                        type: '페이지',
                        content: '<iframe src="/learn/파이썬/py-u03-bool-comparison.html" style="width:100%;height:100%;border:none;min-height:80vh" />'
                    },
                    {
                        id: 'py-3.q1',
                        title: 'Bool 퀴즈',
                        type: '퀴즈',
                        quiz: {
                            question: 'Python에서 3 > 5의 결과는?',
                            options: ['True', 'False', '0', '에러'],
                            answer: 1,
                            explanation: '3은 5보다 작으므로 3 > 5는 False입니다.'
                        }
                    },
                ],
            },
            {
                id: 'py-u04',
                unitNumber: 4,
                title: 'if 조건문 — 갈림길에서 선택하기',
                subtitle: 'if, elif, else로 조건 분기 만들기',
                duration: '45분',
                type: '이론',
                difficulty: 2,
                pages: [
                    {
                        id: 'py-4.1',
                        title: 'if 조건문 학습',
                        type: '페이지',
                        content: '<iframe src="/learn/파이썬/py-u04-if-condition.html" style="width:100%;height:100%;border:none;min-height:80vh" />'
                    },
                    {
                        id: 'py-4.q1',
                        title: '조건문 퀴즈',
                        type: '퀴즈',
                        quiz: {
                            question: 'Python에서 여러 조건을 순차적으로 검사하려면?',
                            options: ['if만 여러 개', 'if, elif, else', 'switch/case', 'for문'],
                            answer: 1,
                            explanation: 'Python에서는 if, elif, else를 사용하여 여러 조건을 순차적으로 검사합니다.'
                        }
                    },
                ],
            },
        ],
    },
];
