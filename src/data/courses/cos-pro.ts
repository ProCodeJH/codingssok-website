import { Chapter } from './types';

/** COS-Pro (Coding Specialist Professional) 자격증 챕터 */
export const COS_PRO_CHAPTERS: Chapter[] = [
    {
        id: 'cosp-ch01', chapterNumber: 1, title: 'COS-Pro 1급 준비', icon: '🏅',
        description: 'COS-Pro 1급 시험 대비 핵심 개념',
        units: [
            { id: 'cosp-1', unitNumber: 1, title: '고급 알고리즘', subtitle: 'COS-Pro 알고리즘', duration: '60분', type: '이론', difficulty: 3, content: 'COS-Pro 1급에 출제되는 고급 알고리즘(DP, 그래프 등)을 학습합니다.', quiz: { question: '동적 프로그래밍의 핵심 개념은?', options: ['완전 탐색', '메모이제이션과 최적 부분 구조', '정렬', '해싱'], answer: 1, explanation: 'DP는 작은 부분 문제의 결과를 저장(메모이제이션)하여 중복 계산을 방지합니다.' }, problems: [], problemCount: 15 },
            { id: 'cosp-2', unitNumber: 2, title: '고급 자료구조', subtitle: 'COS-Pro 자료구조', duration: '60분', type: '이론', difficulty: 3, content: '트리, 힙, 해시 등 고급 자료구조를 학습합니다.', quiz: { question: '이진 탐색 트리(BST)의 특징은?', options: ['정렬되지 않음', '왼쪽 < 부모 < 오른쪽', '배열 기반', '선형 탐색만 가능'], answer: 1, explanation: 'BST는 왼쪽 자식 < 부모 < 오른쪽 자식 규칙을 따릅니다.' }, problems: [], problemCount: 15 },
        ],
    },
    {
        id: 'cosp-ch02', chapterNumber: 2, title: 'COS-Pro 2급 준비', icon: '🎖️',
        description: 'COS-Pro 2급 시험 대비 실전 문제',
        units: [
            { id: 'cosp-3', unitNumber: 3, title: '함수 구현 문제', subtitle: 'COS-Pro 함수', duration: '50분', type: '실습', difficulty: 2, content: 'COS-Pro 2급 형식의 함수 구현 문제를 풀어봅니다.', quiz: { question: 'COS-Pro에서 주로 어떤 형식의 문제가 출제되나요?', options: ['객관식', '함수 구현 (빈칸 채우기)', 'OX 퀴즈', '에세이'], answer: 1, explanation: 'COS-Pro는 주어진 조건에 맞는 함수를 구현하거나 빈칸을 채우는 형식입니다.' }, problems: [], problemCount: 15 },
            { id: 'cosp-4', unitNumber: 4, title: '실전 모의고사', subtitle: 'COS-Pro 실전', duration: '90분', type: '종합', difficulty: 3, content: 'COS-Pro 형식의 실전 모의고사를 풀어봅니다.', quiz: { question: 'COS-Pro 시험 시간은?', options: ['30분', '50분', '90분', '120분'], answer: 2, explanation: 'COS-Pro 시험은 보통 90분이 주어집니다.' }, problems: [], problemCount: 10 },
        ],
    },
];
