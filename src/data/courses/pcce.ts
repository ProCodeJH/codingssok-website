import { Chapter } from './types';

/** PCCE (프로그래밍 언어 활용 능력 시험) 챕터 */
export const PCCE_CHAPTERS: Chapter[] = [
    {
        id: 'pcce-ch01', chapterNumber: 1, title: '프로그래밍 언어 기초', icon: '📝',
        description: 'PCCE 시험 범위의 프로그래밍 언어 기초',
        units: [
            { id: 'pcce-1', unitNumber: 1, title: '변수와 자료형', subtitle: 'PCCE 기초 영역', duration: '30분', type: '이론', difficulty: 1, content: 'PCCE 시험에서 다루는 변수, 자료형 개념을 학습합니다.', quiz: { question: 'int형 변수에 저장할 수 없는 값은?', options: ['100', '-50', '3.14', '0'], answer: 2, explanation: 'int형은 정수만 저장 가능하며, 3.14는 실수(float/double)입니다.' }, problems: [], problemCount: 15 },
            { id: 'pcce-2', unitNumber: 2, title: '조건문과 반복문', subtitle: 'PCCE 제어구조', duration: '40분', type: '실습', difficulty: 2, content: 'if-else, for, while 등 제어 구조를 학습합니다.', quiz: { question: 'for(int i=0; i<5; i++)는 몇 번 반복하나요?', options: ['4번', '5번', '6번', '무한'], answer: 1, explanation: 'i가 0,1,2,3,4 총 5번 반복합니다.' }, problems: [], problemCount: 20 },
        ],
    },
    {
        id: 'pcce-ch02', chapterNumber: 2, title: '함수와 배열', icon: '🔧',
        description: 'PCCE 시험 범위의 함수, 배열 활용',
        units: [
            { id: 'pcce-3', unitNumber: 3, title: '함수 활용', subtitle: 'PCCE 함수', duration: '40분', type: '실습', difficulty: 2, content: '함수 정의, 호출, 매개변수, 반환값을 학습합니다.', quiz: { question: '함수의 반환 타입이 void일 때 의미는?', options: ['정수 반환', '반환값 없음', '문자열 반환', '에러'], answer: 1, explanation: 'void는 반환값이 없는 함수를 의미합니다.' }, problems: [], problemCount: 15 },
            { id: 'pcce-4', unitNumber: 4, title: '배열과 문자열', subtitle: 'PCCE 배열', duration: '50분', type: '실습', difficulty: 2, content: '1차원/2차원 배열과 문자열 처리를 학습합니다.', quiz: { question: 'char str[] = "Hello"의 크기는?', options: ['5', '6', '4', '7'], answer: 1, explanation: '문자열 끝에 널 문자(\\0)가 포함되므로 6바이트입니다.' }, problems: [], problemCount: 15 },
        ],
    },
    {
        id: 'pcce-ch03', chapterNumber: 3, title: 'PCCE 실전 모의고사', icon: '🎯',
        description: 'PCCE 실전 모의고사 문제풀이',
        units: [
            { id: 'pcce-5', unitNumber: 5, title: '모의고사 1회', subtitle: 'PCCE 실전', duration: '60분', type: '종합', difficulty: 2, content: 'PCCE 형식의 실전 모의고사 1회분을 풀어봅니다.', quiz: { question: 'PCCE 시험의 총 문제 수는?', options: ['10문제', '20문제', '30문제', '40문제'], answer: 0, explanation: 'PCCE 시험은 보통 10문제로 구성됩니다.' }, problems: [], problemCount: 10 },
            { id: 'pcce-6', unitNumber: 6, title: '모의고사 2회', subtitle: 'PCCE 실전', duration: '60분', type: '종합', difficulty: 3, content: 'PCCE 형식의 실전 모의고사 2회분을 풀어봅니다.', quiz: { question: '코드의 빈칸을 채우는 문제에서 중요한 것은?', options: ['외우기', '코드 흐름 파악', '빠른 타이핑', '찍기'], answer: 1, explanation: '코드의 전체 흐름을 파악하고 빈칸에 들어갈 로직을 추론해야 합니다.' }, problems: [], problemCount: 10 },
        ],
    },
];
