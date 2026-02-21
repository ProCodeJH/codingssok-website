import { Chapter } from './types';

/** 코딩 기초 전체 챕터 (5챕터, 15유닛) */
export const CODING_BASICS_CHAPTERS: Chapter[] = [
    {
        id: 'cb-ch01', chapterNumber: 1, title: '논리적 사고', icon: '🧠',
        description: '프로그래밍의 기초가 되는 논리적 사고력',
        units: [
            { id: 'cb-l1', unitNumber: 1, title: '논리 쉬움', subtitle: '참/거짓 판별', duration: '20분', type: '이론', difficulty: 1, content: '참과 거짓을 판별하는 논리적 사고를 배웁니다.', quiz: { question: '"모든 새는 날 수 있다"는 참일까요?', options: ['참', '거짓', '모름', '조건부'], answer: 1, explanation: '펭귄, 타조 등 날지 못하는 새가 있으므로 거짓입니다.' }, problems: [], problemCount: 8 },
            { id: 'cb-l2', unitNumber: 2, title: '논리 보통', subtitle: '조건부 논리', duration: '25분', type: '이론', difficulty: 2, content: 'AND, OR, NOT 논리 연산을 배웁니다.', quiz: { question: '"비가 오고(AND) 우산이 없으면" 결과는?', options: ['그냥 간다', '비를 맞는다', '논리 오류', '참'], answer: 1, explanation: '두 조건 모두 참이면 결과(비를 맞는다)가 발생합니다.' }, problems: [], problemCount: 10 },
            { id: 'cb-l3', unitNumber: 3, title: '논리 어려움', subtitle: '복합 논리', duration: '30분', type: '실습', difficulty: 3, content: '복합 조건과 진리표를 분석합니다.', quiz: { question: 'NOT(A AND B)와 같은 것은?', options: ['NOT A AND NOT B', 'NOT A OR NOT B', 'A OR B', 'A AND B'], answer: 1, explanation: '드모르간 법칙: NOT(A∧B) = (NOT A)∨(NOT B)' }, problems: [], problemCount: 12 },
        ],
    },
    {
        id: 'cb-ch02', chapterNumber: 2, title: '수학적 사고', icon: '🔢',
        description: '프로그래밍에 필요한 수학적 사고',
        units: [
            { id: 'cb-m1', unitNumber: 4, title: '수학 쉬움', subtitle: '사칙연산과 변수', duration: '20분', type: '이론', difficulty: 1, content: '수학 개념과 프로그래밍 변수의 관계를 배웁니다.', quiz: { question: 'x = x + 1 은 수학에서는 불가능하지만 프로그래밍에서는?', options: ['불가능', 'x에 1을 더한 값을 다시 x에 저장', '에러', '무한루프'], answer: 1, explanation: '프로그래밍에서 =는 대입 연산자. x의 현재 값에 1을 더해 다시 저장합니다.' }, problems: [], problemCount: 8 },
            { id: 'cb-m2', unitNumber: 5, title: '수학 보통', subtitle: '좌표와 함수', duration: '30분', type: '이론', difficulty: 2, content: '좌표 체계와 수학적 함수의 프로그래밍 적용.', quiz: { question: 'f(x) = 2x + 3에서 f(5)의 값은?', options: ['10', '13', '15', '8'], answer: 1, explanation: 'f(5) = 2×5 + 3 = 13' }, problems: [], problemCount: 10 },
            { id: 'cb-m3', unitNumber: 6, title: '수학 어려움', subtitle: '수열과 점화식', duration: '35분', type: '실습', difficulty: 3, content: '수열, 점화식, 재귀 관계를 배웁니다.', quiz: { question: 'a₁=1, aₙ=aₙ₋₁+2 일 때 a₅는?', options: ['7', '9', '10', '11'], answer: 1, explanation: 'a₁=1, a₂=3, a₃=5, a₄=7, a₅=9' }, problems: [], problemCount: 12 },
        ],
    },
    {
        id: 'cb-ch03', chapterNumber: 3, title: '순서도 & 의사코드', icon: '📊',
        description: '알고리즘의 시각적/텍스트 표현',
        units: [
            { id: 'cb-f1', unitNumber: 7, title: '순서도 쉬움', subtitle: '기본 도형', duration: '20분', type: '이론', difficulty: 1, content: '순서도의 기본 도형과 흐름을 배웁니다.', quiz: { question: '순서도에서 마름모(◇)는 무엇을 의미?', options: ['시작/끝', '처리', '조건 판단', '입출력'], answer: 2, explanation: '마름모는 조건 판단(분기)을 나타냅니다. Yes/No로 갈림길.' }, problems: [], problemCount: 8 },
            { id: 'cb-f2', unitNumber: 8, title: '순서도 보통', subtitle: '반복 구조', duration: '30분', type: '실습', difficulty: 2, content: '반복 구조를 포함한 순서도를 그립니다.', quiz: { question: '순서도에서 반복을 표현하려면?', options: ['마름모만', '화살표로 이전 단계 연결', '사각형', '원'], answer: 1, explanation: '반복은 화살표를 사용하여 이전 단계로 돌아가는 흐름으로 표현합니다.' }, problems: [], problemCount: 10 },
            { id: 'cb-f3', unitNumber: 9, title: '순서도 어려움', subtitle: '복합 구조', duration: '35분', type: '실습', difficulty: 3, content: '중첩 조건과 반복이 있는 복합 순서도.', quiz: { question: '로그인 시스템의 순서도에 필요한 판단은?', options: ['1개', '최소 2개(ID확인, PW확인)', '없음', '5개'], answer: 1, explanation: '로그인은 최소 ID 존재 여부와 비밀번호 일치 여부를 판단해야 합니다.' }, problems: [], problemCount: 12 },
        ],
    },
    {
        id: 'cb-ch04', chapterNumber: 4, title: '문제해결 전략', icon: '💡',
        description: '다양한 문제해결 접근법',
        units: [
            { id: 'cb-ps1', unitNumber: 10, title: '문제해결 쉬움', subtitle: '분석과 계획', duration: '25분', type: '이론', difficulty: 1, content: '문제를 분석하고 해결 계획을 세웁니다.', quiz: { question: '문제해결의 첫 단계는?', options: ['바로 코딩', '문제 이해와 분석', '검색', '포기'], answer: 1, explanation: '먼저 문제가 무엇인지 정확히 이해하고 분석해야 합니다.' }, problems: [], problemCount: 8 },
            { id: 'cb-ps2', unitNumber: 11, title: '문제해결 보통', subtitle: '패턴 활용', duration: '30분', type: '실습', difficulty: 2, content: '기존 패턴을 활용한 문제해결.', quiz: { question: '유사한 문제를 이전에 풀어본 경우 어떻게 하나요?', options: ['무시', '같은 패턴을 적용해 봄', '처음부터', '포기'], answer: 1, explanation: '이전 경험의 패턴을 새 문제에 적용하는 것이 효율적입니다.' }, problems: [], problemCount: 10 },
            { id: 'cb-ps3', unitNumber: 12, title: '문제해결 어려움', subtitle: '최적화', duration: '35분', type: '실습', difficulty: 3, content: '해결책의 효율성을 평가하고 최적화합니다.', quiz: { question: '두 가지 해결책이 있을 때 선택 기준은?', options: ['짧은 코드', '효율성(시간/공간) 비교', '먼저 생각난 것', '랜덤'], answer: 1, explanation: '시간복잡도와 공간복잡도를 비교하여 더 효율적인 해결책을 선택합니다.' }, problems: [], problemCount: 12 },
        ],
    },
    {
        id: 'cb-ch05', chapterNumber: 5, title: '이산수학 기초', icon: '📏',
        description: 'CS의 수학적 기초',
        units: [
            { id: 'cb-dm1', unitNumber: 13, title: '이산수학 쉬움', subtitle: '집합과 논리', duration: '25분', type: '이론', difficulty: 1, content: '집합 이론과 명제 논리의 기초.', quiz: { question: '집합 A={1,2,3}과 B={2,3,4}의 교집합은?', options: ['{1,2,3,4}', '{2,3}', '{1,4}', '{}'], answer: 1, explanation: '교집합은 두 집합에 공통으로 있는 원소: {2,3}' }, problems: [], problemCount: 10 },
            { id: 'cb-dm2', unitNumber: 14, title: '이산수학 보통', subtitle: '그래프와 트리', duration: '30분', type: '이론', difficulty: 2, content: '그래프와 트리의 기본 개념.', quiz: { question: '트리(tree)의 특징은?', options: ['사이클 있음', '사이클 없는 연결 그래프', '방향 그래프', '완전 그래프'], answer: 1, explanation: '트리는 사이클이 없는 연결 그래프며, n개 노드에 n-1개 간선을 가집니다.' }, problems: [], problemCount: 10 },
            { id: 'cb-dm3', unitNumber: 15, title: '이산수학 어려움', subtitle: '경우의 수와 확률', duration: '35분', type: '실습', difficulty: 3, content: '순열, 조합, 기초 확률.', quiz: { question: '5명 중 2명을 뽑는 조합의 수는?', options: ['20', '10', '25', '5'], answer: 1, explanation: '₅C₂ = 5!/(2!×3!) = 10' }, problems: [], problemCount: 12 },
        ],
    },
];
