import { Chapter } from './types';

/** C언어 Chapter 18~28 (심화/실전) */
export const C_LANG_CH18_28: Chapter[] = [
    {
        id: 'c-ch18', chapterNumber: 18, title: 'COS-Pro 모의고사', icon: '🏆',
        description: 'COS-Pro 2급/1급 모의고사 문제',
        units: [
            {
                id: 'c-u51', unitNumber: 51, title: '2급 모의고사 1회', subtitle: '기초 종합', duration: '60분', type: '퀴즈', difficulty: 2,
                content: 'COS-Pro 2급 수준의 종합 모의고사입니다.', quiz: { question: '다음 중 C언어의 특징이 아닌 것은?', options: ['절차 지향', '포인터 지원', '가비지 컬렉션', '저수준 접근'], answer: 2, explanation: 'C언어는 가비지 컬렉션이 없어 메모리를 직접 관리해야 합니다.' }, problems: [], problemCount: 20
            },
            {
                id: 'c-u52', unitNumber: 52, title: '2급 모의고사 2회', subtitle: '기초 종합', duration: '60분', type: '퀴즈', difficulty: 2,
                content: 'COS-Pro 2급 두 번째 모의고사입니다.', quiz: { question: '배열의 첫 번째 요소의 인덱스는?', options: ['1', '0', '-1', '없음'], answer: 1, explanation: 'C언어 배열의 인덱스는 0부터 시작합니다.' }, problems: [], problemCount: 20
            },
            {
                id: 'c-u53', unitNumber: 53, title: '1급 모의고사 1회', subtitle: '심화 종합', duration: '90분', type: '퀴즈', difficulty: 3,
                content: 'COS-Pro 1급 수준의 심화 모의고사입니다.', quiz: { question: '이진 탐색의 시간 복잡도는?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], answer: 1, explanation: '이진 탐색은 매 단계 반으로 줄여 O(log n)입니다.' }, problems: [], problemCount: 25
            },
            {
                id: 'c-u54', unitNumber: 54, title: '1급 모의고사 2회', subtitle: '심화 종합', duration: '90분', type: '퀴즈', difficulty: 3,
                content: 'COS-Pro 1급 두 번째 모의고사입니다.', quiz: { question: '재귀로 피보나치를 구현할 때 문제점은?', options: ['메모리 부족', '중복 계산', '컴파일 에러', '타입 에러'], answer: 1, explanation: '재귀 피보나치는 같은 값을 반복 계산하여 시간이 지수적으로 증가합니다. 메모이제이션으로 해결합니다.' }, problems: [], problemCount: 25
            },
        ],
    },
    {
        id: 'c-ch19', chapterNumber: 19, title: '정보처리기능사', icon: '📋',
        description: '정보처리기능사 C언어 기출 유형',
        units: [
            {
                id: 'c-u55', unitNumber: 55, title: '기출유형 분석', subtitle: '실기 C언어 파트', duration: '60분', type: '퀴즈', difficulty: 2,
                content: '정보처리기능사 실기 시험의 C언어 기출 유형을 분석하고 연습합니다.', quiz: { question: 'printf("%d", 10/3);의 출력은?', options: ['3.33', '3', '4', '3.0'], answer: 1, explanation: '정수끼리 나눗셈은 소수점 이하를 버립니다.' }, problems: [], problemCount: 30
            },
        ],
    },
    {
        id: 'c-ch20', chapterNumber: 20, title: 'OJ 실전', icon: '⚔️',
        description: '온라인 저지 실전 문제 풀이',
        units: [
            {
                id: 'c-u56', unitNumber: 56, title: '입출력 유형', subtitle: '다양한 입출력 패턴', duration: '50분', type: '실습', difficulty: 2,
                content: '온라인 저지 문제의 다양한 입출력 패턴을 연습합니다.', quiz: { question: 'EOF까지 입력받으려면?', options: ['scanf > 0', 'scanf != EOF', 'fgets != NULL', '모두 가능'], answer: 3, explanation: '여러 방법이 있지만 scanf != EOF, fgets != NULL 등이 대표적입니다.' }, problems: [], problemCount: 20
            },
        ],
    },
    {
        id: 'c-ch21', chapterNumber: 21, title: '정렬 알고리즘', icon: '📈',
        description: '버블, 선택, 삽입, 퀵소트',
        units: [
            {
                id: 'c-u57', unitNumber: 57, title: '버블/선택/삽입 정렬', subtitle: 'O(n²) 정렬', duration: '60분', type: '이론', difficulty: 3,
                content: '기본 정렬 알고리즘 3가지를 배웁니다. 모두 O(n²) 시간 복잡도입니다.', quiz: { question: '버블 정렬에서 인접한 두 원소를 비교하는 횟수는? (n개 기준)', options: ['n', 'n-1', 'n(n-1)/2', 'n²'], answer: 2, explanation: '총 비교 횟수: (n-1)+(n-2)+...+1 = n(n-1)/2' }, problems: [], problemCount: 25
            },
            {
                id: 'c-u58', unitNumber: 58, title: '퀵소트 & qsort', subtitle: 'O(n log n) · 표준라이브러리', duration: '55분', type: '이론', difficulty: 3,
                content: '퀵소트는 평균 O(n log n)의 효율적인 정렬입니다. stdlib.h의 qsort 함수로 사용 가능.', quiz: { question: 'qsort의 비교 함수가 음수를 반환하면?', options: ['첫 번째 원소가 더 큼', '첫 번째 원소가 더 작음', '같음', '에러'], answer: 1, explanation: '음수 반환은 첫 번째 원소가 두 번째보다 작다(앞에 위치)는 의미입니다.' }, problems: [], problemCount: 20
            },
        ],
    },
    {
        id: 'c-ch22', chapterNumber: 22, title: '자료구조 심화', icon: '🌲',
        description: '스택, 큐, 트리',
        units: [
            {
                id: 'c-u59', unitNumber: 59, title: '스택', subtitle: 'LIFO · push · pop', duration: '50분', type: '이론', difficulty: 3,
                content: '스택은 LIFO(Last In First Out) 구조입니다. push(삽입), pop(제거) 연산을 합니다.', quiz: { question: '스택의 동작 원리는?', options: ['FIFO', 'LIFO', 'Random', 'Priority'], answer: 1, explanation: 'LIFO = Last In First Out, 마지막에 들어온 것이 먼저 나갑니다.' }, problems: [], problemCount: 20
            },
            {
                id: 'c-u60', unitNumber: 60, title: '큐', subtitle: 'FIFO · enqueue · dequeue', duration: '45분', type: '이론', difficulty: 3,
                content: '큐는 FIFO(First In First Out) 구조입니다. enqueue(삽입), dequeue(제거).', quiz: { question: '큐의 동작 원리는?', options: ['LIFO', 'FIFO', 'Random', 'Priority'], answer: 1, explanation: 'FIFO = First In First Out, 먼저 들어온 것이 먼저 나갑니다.' }, problems: [], problemCount: 18
            },
        ],
    },
    {
        id: 'c-ch23', chapterNumber: 23, title: '고급 마스터', icon: '👑',
        description: '함수 포인터, 가변 인자, 비트필드',
        units: [
            {
                id: 'c-u61', unitNumber: 61, title: '함수 포인터 & 콜백', subtitle: '고급 포인터 활용', duration: '50분', type: '이론', difficulty: 3,
                content: '함수 포인터는 함수의 주소를 저장합니다. qsort의 비교 함수가 대표적인 예.', quiz: { question: '함수 포인터를 사용하는 이유는?', options: ['속도 향상', '유연한 함수 호출(콜백)', '메모리 절약', '에러 방지'], answer: 1, explanation: '함수 포인터로 실행 시점에 호출할 함수를 동적으로 결정할 수 있습니다.' }, problems: [], problemCount: 15
            },
        ],
    },
    {
        id: 'c-ch24', chapterNumber: 24, title: '전처리기 & 비트', icon: '🔧',
        description: '매크로 함수, 비트 마스킹',
        units: [
            {
                id: 'c-u62', unitNumber: 62, title: '매크로 함수 & 비트 마스크', subtitle: '#define 함수 · 비트 플래그', duration: '50분', type: '이론', difficulty: 3,
                content: '매크로 함수와 비트 마스킹 기법을 배웁니다. 임베디드/시스템 프로그래밍에 필수.', quiz: { question: '#define MAX(a,b) ((a)>(b)?(a):(b)) 에서 괄호가 중요한 이유?', options: ['문법 규칙', '연산 우선순위 보호', '속도 향상', '가독성'], answer: 1, explanation: '매크로는 텍스트 치환이라 괄호 없으면 연산 우선순위 문제 발생.' }, problems: [], problemCount: 18
            },
        ],
    },
    {
        id: 'c-ch25', chapterNumber: 25, title: '문자열 & 파일 심화', icon: '📖',
        description: '고급 문자열 처리, 바이너리 파일',
        units: [
            {
                id: 'c-u63', unitNumber: 63, title: '고급 문자열 & 파일', subtitle: 'strtok · fread · fwrite', duration: '50분', type: '이론', difficulty: 3,
                content: 'strtok으로 문자열 분리, fread/fwrite로 바이너리 파일 처리를 배웁니다.', quiz: { question: 'strtok의 역할은?', options: ['문자열 복사', '문자열 분리(토큰화)', '문자열 비교', '문자열 검색'], answer: 1, explanation: 'strtok은 구분자 기준으로 문자열을 토큰(조각)으로 분리합니다.' }, problems: [], problemCount: 15
            },
        ],
    },
    {
        id: 'c-ch26', chapterNumber: 26, title: 'DP & 그래프', icon: '🧮',
        description: '동적 프로그래밍, 그래프 탐색',
        units: [
            {
                id: 'c-u64', unitNumber: 64, title: 'DP 기초', subtitle: '메모이제이션 · 타뷸레이션', duration: '60분', type: '이론', difficulty: 3,
                content: '동적 프로그래밍은 큰 문제를 작은 문제로 나누고 결과를 저장하여 재사용합니다.', quiz: { question: 'DP의 핵심 아이디어는?', options: ['분할 정복', '결과 저장 & 재사용', '정렬 후 탐색', '그리디'], answer: 1, explanation: '이전에 계산한 결과를 저장하여 중복 계산을 피합니다.' }, problems: [], problemCount: 20
            },
            {
                id: 'c-u65', unitNumber: 65, title: 'BFS & DFS', subtitle: '너비/깊이 우선 탐색', duration: '55분', type: '이론', difficulty: 3,
                content: 'BFS(너비 우선: 큐 사용)와 DFS(깊이 우선: 스택/재귀 사용) 그래프 탐색.', quiz: { question: 'BFS에서 사용하는 자료구조는?', options: ['스택', '큐', '트리', '힙'], answer: 1, explanation: 'BFS는 큐를 사용하여 가까운 노드부터 탐색합니다.' }, problems: [], problemCount: 18
            },
        ],
    },
    {
        id: 'c-ch27', chapterNumber: 27, title: 'C 함정 & 실전', icon: '⚠️',
        description: '흔한 실수, 디버깅 패턴',
        units: [
            {
                id: 'c-u66', unitNumber: 66, title: 'C 함정 모음', subtitle: '흔한 버그 · 디버깅', duration: '45분', type: '이론', difficulty: 3,
                content: 'C 프로그래밍에서 자주 발생하는 실수와 디버깅 기법을 정리합니다.', quiz: { question: 'if(a = 5)에서 문제점은?', options: ['없음', '= 대신 ==를 써야 비교', '세미콜론 누락', '변수 선언 안 됨'], answer: 1, explanation: '=는 대입이므로 항상 참(5≠0). ==를 써야 비교입니다.' }, problems: [], problemCount: 20
            },
        ],
    },
    {
        id: 'c-ch28', chapterNumber: 28, title: '실전 모의고사', icon: '🎓',
        description: '전범위 종합 모의고사',
        units: [
            {
                id: 'c-u67', unitNumber: 67, title: '종합 모의고사 1회', subtitle: '전범위', duration: '90분', type: '종합', difficulty: 3,
                content: 'C언어 전범위 종합 모의고사 1회차입니다.', quiz: { question: '다음 중 컴파일 에러가 발생하는 것은?', options: ['int a = 3.14;', 'float f = 10;', 'char *p = "hello";', 'int arr[]; '], answer: 3, explanation: '배열 선언 시 크기를 지정하거나 초기화해야 합니다. int arr[];는 크기 미지정 에러.' }, problems: [], problemCount: 40
            },
            {
                id: 'c-u68', unitNumber: 68, title: '종합 모의고사 2회', subtitle: '전범위', duration: '90분', type: '종합', difficulty: 3,
                content: 'C언어 전범위 종합 모의고사 2회차입니다.', quiz: { question: 'sizeof 연산자의 반환 타입은?', options: ['int', 'long', 'size_t', 'unsigned'], answer: 2, explanation: 'sizeof는 size_t 타입을 반환합니다. 보통 unsigned long과 같습니다.' }, problems: [], problemCount: 40
            },
        ],
    },
];
