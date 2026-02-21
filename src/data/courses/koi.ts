import { Chapter } from './types';

/** KOI 기출문제 챕터 (연도별) */
export const KOI_CHAPTERS: Chapter[] = [
    {
        id: 'koi-2025', chapterNumber: 1, title: '2025년 KOI', icon: '🏆',
        description: '2025년 한국정보올림피아드 기출문제',
        units: [
            { id: 'koi-2025-1', unitNumber: 1, title: '초등부 프로그래밍', subtitle: '2025 KOI 초등부', duration: '60분', type: '실습', difficulty: 2, content: '2025년 KOI 초등부 프로그래밍 기출문제를 풀어봅니다.', quiz: { question: 'KOI는 어떤 대회인가요?', options: ['한국수학올림피아드', '한국정보올림피아드', '한국과학올림피아드', '한국물리올림피아드'], answer: 1, explanation: 'KOI는 Korea Olympiad in Informatics의 약자입니다.' }, problems: [], problemCount: 5 },
            { id: 'koi-2025-2', unitNumber: 2, title: '중등부 프로그래밍', subtitle: '2025 KOI 중등부', duration: '90분', type: '실습', difficulty: 3, content: '2025년 KOI 중등부 프로그래밍 기출문제를 풀어봅니다.', quiz: { question: '알고리즘 문제 풀이에서 가장 중요한 것은?', options: ['빠른 타이핑', '문제 분석과 설계', '암기', '운'], answer: 1, explanation: '문제를 정확히 분석하고 적절한 알고리즘을 설계하는 것이 핵심입니다.' }, problems: [], problemCount: 5 },
            { id: 'koi-2025-3', unitNumber: 3, title: '고등부 프로그래밍', subtitle: '2025 KOI 고등부', duration: '120분', type: '실습', difficulty: 3, content: '2025년 KOI 고등부 프로그래밍 기출문제를 풀어봅니다.', quiz: { question: 'KOI 고등부에서 자주 출제되는 알고리즘은?', options: ['버블 정렬만', 'DP, 그래프, 그리디 등', 'HTML/CSS', '엑셀 함수'], answer: 1, explanation: 'DP, 그래프 탐색, 그리디 알고리즘 등 고급 알고리즘이 출제됩니다.' }, problems: [], problemCount: 5 },
        ],
    },
    {
        id: 'koi-2024', chapterNumber: 2, title: '2024년 KOI', icon: '🥇',
        description: '2024년 한국정보올림피아드 기출문제',
        units: [
            { id: 'koi-2024-1', unitNumber: 4, title: '초등부', subtitle: '2024 KOI 초등부', duration: '60분', type: '실습', difficulty: 2, content: '2024년 KOI 초등부 기출문제', quiz: { question: '배열의 인덱스는 보통 몇부터 시작하나요?', options: ['1', '0', '-1', '10'], answer: 1, explanation: 'C/C++에서 배열 인덱스는 0부터 시작합니다.' }, problems: [], problemCount: 5 },
            { id: 'koi-2024-2', unitNumber: 5, title: '중등부', subtitle: '2024 KOI 중등부', duration: '90분', type: '실습', difficulty: 3, content: '2024년 KOI 중등부 기출문제', quiz: { question: 'BFS에 사용되는 자료구조는?', options: ['스택', '큐', '트리', '해시'], answer: 1, explanation: 'BFS(너비 우선 탐색)는 큐를 사용합니다.' }, problems: [], problemCount: 5 },
            { id: 'koi-2024-3', unitNumber: 6, title: '고등부', subtitle: '2024 KOI 고등부', duration: '120분', type: '실습', difficulty: 3, content: '2024년 KOI 고등부 기출문제', quiz: { question: 'DFS에 사용되는 자료구조는?', options: ['큐', '스택', '배열', '링크드리스트'], answer: 1, explanation: 'DFS(깊이 우선 탐색)는 스택(또는 재귀)을 사용합니다.' }, problems: [], problemCount: 5 },
        ],
    },
    {
        id: 'koi-2023', chapterNumber: 3, title: '2023년 KOI', icon: '🥈',
        description: '2023년 한국정보올림피아드 기출문제',
        units: [
            { id: 'koi-2023-1', unitNumber: 7, title: '초등부', subtitle: '2023 KOI 초등부', duration: '60분', type: '실습', difficulty: 2, content: '2023년 KOI 초등부 기출문제', quiz: { question: '반복문의 종류가 아닌 것은?', options: ['for', 'while', 'do-while', 'repeat'], answer: 3, explanation: 'C 언어에서 repeat문은 없습니다. for, while, do-while이 있습니다.' }, problems: [], problemCount: 5 },
            { id: 'koi-2023-2', unitNumber: 8, title: '중등부', subtitle: '2023 KOI 중등부', duration: '90분', type: '실습', difficulty: 3, content: '2023년 KOI 중등부 기출문제', quiz: { question: '시간복잡도 O(n log n)인 정렬 알고리즘은?', options: ['버블 정렬', '삽입 정렬', '합병 정렬', '선택 정렬'], answer: 2, explanation: '합병 정렬(Merge Sort)은 O(n log n)의 시간복잡도를 가집니다.' }, problems: [], problemCount: 5 },
        ],
    },
    {
        id: 'koi-older', chapterNumber: 4, title: '2019~2022년 KOI', icon: '📚',
        description: '2019~2022년 한국정보올림피아드 기출문제 아카이브',
        units: [
            { id: 'koi-old-1', unitNumber: 9, title: '2022년 기출', subtitle: '2022 KOI', duration: '90분', type: '실습', difficulty: 2, content: '2022년 KOI 기출문제 모음', quiz: { question: '그래프에서 최단 경로를 구하는 알고리즘은?', options: ['버블정렬', '다익스트라', '이진탐색', '합병정렬'], answer: 1, explanation: '다익스트라 알고리즘은 가중 그래프에서 최단 경로를 찾습니다.' }, problems: [], problemCount: 10 },
            { id: 'koi-old-2', unitNumber: 10, title: '2021년 기출', subtitle: '2021 KOI', duration: '90분', type: '실습', difficulty: 2, content: '2021년 KOI 기출문제 모음', quiz: { question: 'DP는 무엇의 약자인가요?', options: ['Data Processing', 'Dynamic Programming', 'Digital Platform', 'Design Pattern'], answer: 1, explanation: 'DP(Dynamic Programming)는 동적 프로그래밍을 의미합니다.' }, problems: [], problemCount: 10 },
            { id: 'koi-old-3', unitNumber: 11, title: '2019~2020년 기출', subtitle: '2019-2020 KOI', duration: '120분', type: '실습', difficulty: 3, content: '2019~2020년 KOI 기출문제 모음', quiz: { question: '이진 탐색의 시간복잡도는?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1, explanation: '이진 탐색은 매 단계마다 범위를 반으로 줄이므로 O(log n)입니다.' }, problems: [], problemCount: 15 },
        ],
    },
];
