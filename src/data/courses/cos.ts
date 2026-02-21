import { Chapter } from './types';

/** COS (Coding Specialist) 자격증 챕터 */
export const COS_CHAPTERS: Chapter[] = [
    {
        id: 'cos-ch01', chapterNumber: 1, title: '프로그래밍 기본', icon: '💻',
        description: 'COS 1과목 - 프로그래밍 기본 개념',
        units: [
            { id: 'cos-1', unitNumber: 1, title: '알고리즘과 흐름제어', subtitle: 'COS 기초', duration: '40분', type: '이론', difficulty: 1, content: 'COS 시험 범위의 알고리즘 기초와 흐름 제어를 학습합니다.', quiz: { question: '알고리즘의 조건이 아닌 것은?', options: ['입력', '출력', '유한성', '무한 반복'], answer: 3, explanation: '알고리즘은 유한한 단계 안에 종료되어야 합니다. 무한 반복은 알고리즘이 아닙니다.' }, problems: [], problemCount: 15 },
            { id: 'cos-2', unitNumber: 2, title: '자료구조 기초', subtitle: 'COS 자료구조', duration: '50분', type: '이론', difficulty: 2, content: '배열, 스택, 큐, 리스트 등 기초 자료구조를 학습합니다.', quiz: { question: 'LIFO 방식의 자료구조는?', options: ['큐', '스택', '배열', '트리'], answer: 1, explanation: 'LIFO(Last In, First Out)는 스택의 특징입니다.' }, problems: [], problemCount: 15 },
        ],
    },
    {
        id: 'cos-ch02', chapterNumber: 2, title: '실전 문제풀이', icon: '🎯',
        description: 'COS 실전 문제풀이 및 모의고사',
        units: [
            { id: 'cos-3', unitNumber: 3, title: '기출 유형 분석', subtitle: 'COS 유형별', duration: '60분', type: '실습', difficulty: 2, content: 'COS 시험 기출 유형을 분석하고 풀이 전략을 세웁니다.', quiz: { question: 'COS 시험의 주요 출제 분야는?', options: ['웹 디자인', '프로그래밍 로직과 자료구조', '네트워크', '데이터베이스'], answer: 1, explanation: 'COS는 프로그래밍 로직, 자료구조, 알고리즘 이해가 핵심입니다.' }, problems: [], problemCount: 20 },
            { id: 'cos-4', unitNumber: 4, title: '모의고사', subtitle: 'COS 실전', duration: '60분', type: '종합', difficulty: 3, content: 'COS 자격증 형식의 모의고사를 풀어봅니다.', quiz: { question: '시험에서 부분 점수를 받으려면?', options: ['포기', '코드 흐름을 최대한 작성', '빈칸', '주석만'], answer: 1, explanation: '완벽하지 않더라도 가능한 부분까지 코드를 작성하면 부분 점수를 받을 수 있습니다.' }, problems: [], problemCount: 20 },
        ],
    },
];
