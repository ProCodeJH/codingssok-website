/* ═══════════════════════════════════════════════
   외부 OJ 문제 데이터
   백준, KOI Study, 프로그래머스, 코드업
   ═══════════════════════════════════════════════ */

export interface ExternalProblem {
    id: string;
    title: string;
    source: 'baekjoon' | 'koistudy' | 'programmers' | 'codeup';
    sourceId: string;        // 원본 사이트 문제 번호
    url: string;             // 외부 링크
    difficulty: 'bronze' | 'silver' | 'gold' | 'platinum';
    category: string;
    tags: string[];
}

export interface ProblemSet {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    problems: ExternalProblem[];
}

// ── 색상 매핑 ──
export const DIFFICULTY_COLORS: Record<string, { bg: string; text: string; label: string }> = {
    bronze:   { bg: 'rgba(205,127,50,0.1)',  text: '#CD7F32', label: '브론즈' },
    silver:   { bg: 'rgba(192,192,192,0.1)', text: '#808080', label: '실버' },
    gold:     { bg: 'rgba(255,215,0,0.1)',   text: '#DAA520', label: '골드' },
    platinum: { bg: 'rgba(0,255,255,0.1)',   text: '#00B4D8', label: '플래티넘' },
};

export const SOURCE_INFO: Record<string, { label: string; color: string; baseUrl: string }> = {
    baekjoon:    { label: '백준',       color: '#0076C0', baseUrl: 'https://www.acmicpc.net/problem/' },
    koistudy:    { label: 'KOI Study', color: '#FF6B35', baseUrl: 'https://koistudy.net/?mid=prob&prob=' },
    programmers: { label: '프로그래머스', color: '#7B68EE', baseUrl: 'https://school.programmers.co.kr/learn/courses/30/lessons/' },
    codeup:      { label: '코드업',     color: '#2E8B57', baseUrl: 'https://codeup.kr/problem.php?id=' },
};

// ═══ 입출력 기초 ═══
const IO_BASICS: ExternalProblem[] = [
    { id:'boj-1000', title:'A+B', source:'baekjoon', sourceId:'1000', url:'https://www.acmicpc.net/problem/1000', difficulty:'bronze', category:'입출력', tags:['입출력','기초'] },
    { id:'boj-1001', title:'A-B', source:'baekjoon', sourceId:'1001', url:'https://www.acmicpc.net/problem/1001', difficulty:'bronze', category:'입출력', tags:['입출력','기초'] },
    { id:'boj-10998', title:'A×B', source:'baekjoon', sourceId:'10998', url:'https://www.acmicpc.net/problem/10998', difficulty:'bronze', category:'입출력', tags:['입출력','기초'] },
    { id:'boj-1008', title:'A/B', source:'baekjoon', sourceId:'1008', url:'https://www.acmicpc.net/problem/1008', difficulty:'bronze', category:'입출력', tags:['입출력','실수'] },
    { id:'boj-2557', title:'Hello World', source:'baekjoon', sourceId:'2557', url:'https://www.acmicpc.net/problem/2557', difficulty:'bronze', category:'입출력', tags:['입출력','기초'] },
    { id:'boj-10171', title:'고양이', source:'baekjoon', sourceId:'10171', url:'https://www.acmicpc.net/problem/10171', difficulty:'bronze', category:'입출력', tags:['입출력','출력'] },
    { id:'boj-10172', title:'개', source:'baekjoon', sourceId:'10172', url:'https://www.acmicpc.net/problem/10172', difficulty:'bronze', category:'입출력', tags:['입출력','출력'] },
    { id:'boj-11654', title:'아스키 코드', source:'baekjoon', sourceId:'11654', url:'https://www.acmicpc.net/problem/11654', difficulty:'bronze', category:'입출력', tags:['입출력','문자'] },
    { id:'cu-1001', title:'Hello', source:'codeup', sourceId:'1001', url:'https://codeup.kr/problem.php?id=1001', difficulty:'bronze', category:'입출력', tags:['입출력','기초'] },
    { id:'cu-1002', title:'Hello World', source:'codeup', sourceId:'1002', url:'https://codeup.kr/problem.php?id=1002', difficulty:'bronze', category:'입출력', tags:['입출력','기초'] },
    { id:'cu-1008', title:'정수 입출력', source:'codeup', sourceId:'1008', url:'https://codeup.kr/problem.php?id=1008', difficulty:'bronze', category:'입출력', tags:['입출력','정수'] },
    { id:'cu-1010', title:'정수 2개 입출력', source:'codeup', sourceId:'1010', url:'https://codeup.kr/problem.php?id=1010', difficulty:'bronze', category:'입출력', tags:['입출력','정수'] },
];

// ═══ 조건문 ═══
const CONDITIONS: ExternalProblem[] = [
    { id:'boj-1330', title:'두 수 비교하기', source:'baekjoon', sourceId:'1330', url:'https://www.acmicpc.net/problem/1330', difficulty:'bronze', category:'조건문', tags:['조건문','비교'] },
    { id:'boj-9498', title:'시험 성적', source:'baekjoon', sourceId:'9498', url:'https://www.acmicpc.net/problem/9498', difficulty:'bronze', category:'조건문', tags:['조건문','등급'] },
    { id:'boj-2753', title:'윤년', source:'baekjoon', sourceId:'2753', url:'https://www.acmicpc.net/problem/2753', difficulty:'bronze', category:'조건문', tags:['조건문','계산'] },
    { id:'boj-14681', title:'사분면 고르기', source:'baekjoon', sourceId:'14681', url:'https://www.acmicpc.net/problem/14681', difficulty:'bronze', category:'조건문', tags:['조건문','좌표'] },
    { id:'boj-2784', title:'알람 시계', source:'baekjoon', sourceId:'2884', url:'https://www.acmicpc.net/problem/2884', difficulty:'bronze', category:'조건문', tags:['조건문','시간'] },
    { id:'cu-1065', title:'짝수 홀수', source:'codeup', sourceId:'1065', url:'https://codeup.kr/problem.php?id=1065', difficulty:'bronze', category:'조건문', tags:['조건문'] },
];

// ═══ 반복문 ═══
const LOOPS: ExternalProblem[] = [
    { id:'boj-2739', title:'구구단', source:'baekjoon', sourceId:'2739', url:'https://www.acmicpc.net/problem/2739', difficulty:'bronze', category:'반복문', tags:['반복문','기초'] },
    { id:'boj-10950', title:'A+B - 3', source:'baekjoon', sourceId:'10950', url:'https://www.acmicpc.net/problem/10950', difficulty:'bronze', category:'반복문', tags:['반복문','입출력'] },
    { id:'boj-8393', title:'합', source:'baekjoon', sourceId:'8393', url:'https://www.acmicpc.net/problem/8393', difficulty:'bronze', category:'반복문', tags:['반복문','합계'] },
    { id:'boj-15552', title:'빠른 A+B', source:'baekjoon', sourceId:'15552', url:'https://www.acmicpc.net/problem/15552', difficulty:'bronze', category:'반복문', tags:['반복문','빠른IO'] },
    { id:'boj-2438', title:'별 찍기 - 1', source:'baekjoon', sourceId:'2438', url:'https://www.acmicpc.net/problem/2438', difficulty:'bronze', category:'반복문', tags:['반복문','패턴'] },
    { id:'boj-2439', title:'별 찍기 - 2', source:'baekjoon', sourceId:'2439', url:'https://www.acmicpc.net/problem/2439', difficulty:'bronze', category:'반복문', tags:['반복문','패턴'] },
    { id:'boj-10871', title:'X보다 작은 수', source:'baekjoon', sourceId:'10871', url:'https://www.acmicpc.net/problem/10871', difficulty:'bronze', category:'반복문', tags:['반복문','배열'] },
    { id:'cu-1099', title:'별 출력하기', source:'codeup', sourceId:'1099', url:'https://codeup.kr/problem.php?id=1099', difficulty:'bronze', category:'반복문', tags:['반복문','패턴'] },
];

// ═══ 배열 & 함수 ═══
const ARRAY_FUNC: ExternalProblem[] = [
    { id:'boj-10818', title:'최소, 최대', source:'baekjoon', sourceId:'10818', url:'https://www.acmicpc.net/problem/10818', difficulty:'bronze', category:'배열', tags:['배열','최소최대'] },
    { id:'boj-2562', title:'최댓값', source:'baekjoon', sourceId:'2562', url:'https://www.acmicpc.net/problem/2562', difficulty:'bronze', category:'배열', tags:['배열','최대'] },
    { id:'boj-10807', title:'개수 세기', source:'baekjoon', sourceId:'10807', url:'https://www.acmicpc.net/problem/10807', difficulty:'bronze', category:'배열', tags:['배열','카운팅'] },
    { id:'boj-5597', title:'과제 안 내신 분..?', source:'baekjoon', sourceId:'5597', url:'https://www.acmicpc.net/problem/5597', difficulty:'bronze', category:'배열', tags:['배열','체크'] },
    { id:'boj-3052', title:'나머지', source:'baekjoon', sourceId:'3052', url:'https://www.acmicpc.net/problem/3052', difficulty:'bronze', category:'배열', tags:['배열','나머지'] },
    { id:'pgm-12901', title:'2016년', source:'programmers', sourceId:'12901', url:'https://school.programmers.co.kr/learn/courses/30/lessons/12901', difficulty:'silver', category:'구현', tags:['구현','날짜'] },
    { id:'pgm-12903', title:'가운데 글자 가져오기', source:'programmers', sourceId:'12903', url:'https://school.programmers.co.kr/learn/courses/30/lessons/12903', difficulty:'silver', category:'문자열', tags:['문자열'] },
    { id:'pgm-12906', title:'같은 숫자는 싫어', source:'programmers', sourceId:'12906', url:'https://school.programmers.co.kr/learn/courses/30/lessons/12906', difficulty:'silver', category:'배열', tags:['배열','스택'] },
];

// ═══ 정렬 & 탐색 ═══
const SORT_SEARCH: ExternalProblem[] = [
    { id:'boj-2750', title:'수 정렬하기', source:'baekjoon', sourceId:'2750', url:'https://www.acmicpc.net/problem/2750', difficulty:'silver', category:'정렬', tags:['정렬','기초'] },
    { id:'boj-2751', title:'수 정렬하기 2', source:'baekjoon', sourceId:'2751', url:'https://www.acmicpc.net/problem/2751', difficulty:'silver', category:'정렬', tags:['정렬','O(nlogn)'] },
    { id:'boj-10989', title:'수 정렬하기 3', source:'baekjoon', sourceId:'10989', url:'https://www.acmicpc.net/problem/10989', difficulty:'silver', category:'정렬', tags:['정렬','카운팅정렬'] },
    { id:'boj-1920', title:'수 찾기', source:'baekjoon', sourceId:'1920', url:'https://www.acmicpc.net/problem/1920', difficulty:'silver', category:'탐색', tags:['이진탐색'] },
    { id:'boj-1654', title:'랜선 자르기', source:'baekjoon', sourceId:'1654', url:'https://www.acmicpc.net/problem/1654', difficulty:'silver', category:'탐색', tags:['이진탐색','매개변수탐색'] },
    { id:'boj-2805', title:'나무 자르기', source:'baekjoon', sourceId:'2805', url:'https://www.acmicpc.net/problem/2805', difficulty:'silver', category:'탐색', tags:['이진탐색'] },
    { id:'pgm-42746', title:'가장 큰 수', source:'programmers', sourceId:'42746', url:'https://school.programmers.co.kr/learn/courses/30/lessons/42746', difficulty:'silver', category:'정렬', tags:['정렬','비교함수'] },
    { id:'pgm-42748', title:'K번째수', source:'programmers', sourceId:'42748', url:'https://school.programmers.co.kr/learn/courses/30/lessons/42748', difficulty:'silver', category:'정렬', tags:['정렬'] },
    { id:'koi-2001', title:'정렬 연습', source:'koistudy', sourceId:'2001', url:'https://koistudy.net/?mid=prob&prob=2001', difficulty:'silver', category:'정렬', tags:['정렬'] },
];

// ═══ 스택 & 큐 ═══
const STACK_QUEUE: ExternalProblem[] = [
    { id:'boj-10828', title:'스택', source:'baekjoon', sourceId:'10828', url:'https://www.acmicpc.net/problem/10828', difficulty:'silver', category:'스택', tags:['스택','구현'] },
    { id:'boj-10845', title:'큐', source:'baekjoon', sourceId:'10845', url:'https://www.acmicpc.net/problem/10845', difficulty:'silver', category:'큐', tags:['큐','구현'] },
    { id:'boj-9012', title:'괄호', source:'baekjoon', sourceId:'9012', url:'https://www.acmicpc.net/problem/9012', difficulty:'silver', category:'스택', tags:['스택','괄호'] },
    { id:'boj-4949', title:'균형잡힌 세상', source:'baekjoon', sourceId:'4949', url:'https://www.acmicpc.net/problem/4949', difficulty:'silver', category:'스택', tags:['스택','괄호'] },
    { id:'boj-1874', title:'스택 수열', source:'baekjoon', sourceId:'1874', url:'https://www.acmicpc.net/problem/1874', difficulty:'silver', category:'스택', tags:['스택'] },
    { id:'pgm-42586', title:'기능개발', source:'programmers', sourceId:'42586', url:'https://school.programmers.co.kr/learn/courses/30/lessons/42586', difficulty:'silver', category:'큐', tags:['큐','시뮬레이션'] },
    { id:'pgm-42587', title:'프로세스', source:'programmers', sourceId:'42587', url:'https://school.programmers.co.kr/learn/courses/30/lessons/42587', difficulty:'silver', category:'큐', tags:['큐','우선순위'] },
];

// ═══ 재귀 & DP ═══
const RECURSION_DP: ExternalProblem[] = [
    { id:'boj-10872', title:'팩토리얼', source:'baekjoon', sourceId:'10872', url:'https://www.acmicpc.net/problem/10872', difficulty:'bronze', category:'재귀', tags:['재귀','기초'] },
    { id:'boj-10870', title:'피보나치 수 5', source:'baekjoon', sourceId:'10870', url:'https://www.acmicpc.net/problem/10870', difficulty:'bronze', category:'재귀', tags:['재귀','피보나치'] },
    { id:'boj-1003', title:'피보나치 함수', source:'baekjoon', sourceId:'1003', url:'https://www.acmicpc.net/problem/1003', difficulty:'silver', category:'DP', tags:['DP','메모이제이션'] },
    { id:'boj-1463', title:'1로 만들기', source:'baekjoon', sourceId:'1463', url:'https://www.acmicpc.net/problem/1463', difficulty:'silver', category:'DP', tags:['DP'] },
    { id:'boj-9184', title:'신나는 함수 실행', source:'baekjoon', sourceId:'9184', url:'https://www.acmicpc.net/problem/9184', difficulty:'silver', category:'DP', tags:['DP','메모이제이션'] },
    { id:'boj-11726', title:'2×n 타일링', source:'baekjoon', sourceId:'11726', url:'https://www.acmicpc.net/problem/11726', difficulty:'silver', category:'DP', tags:['DP'] },
    { id:'boj-11727', title:'2×n 타일링 2', source:'baekjoon', sourceId:'11727', url:'https://www.acmicpc.net/problem/11727', difficulty:'silver', category:'DP', tags:['DP'] },
    { id:'boj-1149', title:'RGB거리', source:'baekjoon', sourceId:'1149', url:'https://www.acmicpc.net/problem/1149', difficulty:'silver', category:'DP', tags:['DP'] },
    { id:'pgm-42839', title:'소수 찾기', source:'programmers', sourceId:'42839', url:'https://school.programmers.co.kr/learn/courses/30/lessons/42839', difficulty:'silver', category:'완전탐색', tags:['완전탐색','소수'] },
];

// ═══ 그래프 & BFS/DFS ═══
const GRAPH: ExternalProblem[] = [
    { id:'boj-1260', title:'DFS와 BFS', source:'baekjoon', sourceId:'1260', url:'https://www.acmicpc.net/problem/1260', difficulty:'silver', category:'그래프', tags:['DFS','BFS'] },
    { id:'boj-2606', title:'바이러스', source:'baekjoon', sourceId:'2606', url:'https://www.acmicpc.net/problem/2606', difficulty:'silver', category:'그래프', tags:['DFS','BFS'] },
    { id:'boj-1012', title:'유기농 배추', source:'baekjoon', sourceId:'1012', url:'https://www.acmicpc.net/problem/1012', difficulty:'silver', category:'그래프', tags:['DFS','BFS'] },
    { id:'boj-2178', title:'미로 탐색', source:'baekjoon', sourceId:'2178', url:'https://www.acmicpc.net/problem/2178', difficulty:'silver', category:'그래프', tags:['BFS','최단경로'] },
    { id:'boj-7576', title:'토마토', source:'baekjoon', sourceId:'7576', url:'https://www.acmicpc.net/problem/7576', difficulty:'gold', category:'그래프', tags:['BFS'] },
    { id:'boj-2667', title:'단지번호붙이기', source:'baekjoon', sourceId:'2667', url:'https://www.acmicpc.net/problem/2667', difficulty:'silver', category:'그래프', tags:['DFS','BFS'] },
    { id:'pgm-43162', title:'네트워크', source:'programmers', sourceId:'43162', url:'https://school.programmers.co.kr/learn/courses/30/lessons/43162', difficulty:'gold', category:'그래프', tags:['DFS','BFS'] },
    { id:'pgm-43163', title:'단어 변환', source:'programmers', sourceId:'43163', url:'https://school.programmers.co.kr/learn/courses/30/lessons/43163', difficulty:'gold', category:'그래프', tags:['BFS'] },
    { id:'koi-3001', title:'그래프 탐색', source:'koistudy', sourceId:'3001', url:'https://koistudy.net/?mid=prob&prob=3001', difficulty:'silver', category:'그래프', tags:['그래프'] },
];

// ═══ 그리디 ═══
const GREEDY: ExternalProblem[] = [
    { id:'boj-11047', title:'동전 0', source:'baekjoon', sourceId:'11047', url:'https://www.acmicpc.net/problem/11047', difficulty:'silver', category:'그리디', tags:['그리디'] },
    { id:'boj-1931', title:'회의실 배정', source:'baekjoon', sourceId:'1931', url:'https://www.acmicpc.net/problem/1931', difficulty:'silver', category:'그리디', tags:['그리디','정렬'] },
    { id:'boj-11399', title:'ATM', source:'baekjoon', sourceId:'11399', url:'https://www.acmicpc.net/problem/11399', difficulty:'silver', category:'그리디', tags:['그리디','정렬'] },
    { id:'boj-1541', title:'잃어버린 괄호', source:'baekjoon', sourceId:'1541', url:'https://www.acmicpc.net/problem/1541', difficulty:'silver', category:'그리디', tags:['그리디','파싱'] },
    { id:'pgm-42860', title:'조이스틱', source:'programmers', sourceId:'42860', url:'https://school.programmers.co.kr/learn/courses/30/lessons/42860', difficulty:'silver', category:'그리디', tags:['그리디'] },
    { id:'pgm-42862', title:'체육복', source:'programmers', sourceId:'42862', url:'https://school.programmers.co.kr/learn/courses/30/lessons/42862', difficulty:'silver', category:'그리디', tags:['그리디'] },
];

// ═══ Problem Sets ═══
export const PROBLEM_SETS: ProblemSet[] = [
    { id:'io',     title:'입출력 기초',     description:'프로그래밍의 첫 걸음: 입출력 연습',          icon:'terminal',     color:'#6366f1', problems: IO_BASICS },
    { id:'cond',   title:'조건문',          description:'if/else로 판단하고 분기하기',                icon:'call_split',   color:'#f59e0b', problems: CONDITIONS },
    { id:'loop',   title:'반복문',          description:'for/while로 패턴과 합계 구하기',            icon:'loop',         color:'#10b981', problems: LOOPS },
    { id:'array',  title:'배열 & 함수',     description:'배열 활용과 함수 분리',                      icon:'data_array',   color:'#3b82f6', problems: ARRAY_FUNC },
    { id:'sort',   title:'정렬 & 탐색',     description:'정렬 알고리즘과 이진 탐색',                 icon:'sort',         color:'#ec4899', problems: SORT_SEARCH },
    { id:'stack',  title:'스택 & 큐',       description:'스택/큐 자료구조 활용',                      icon:'layers',       color:'#f97316', problems: STACK_QUEUE },
    { id:'dp',     title:'재귀 & DP',       description:'재귀 함수와 동적 프로그래밍',               icon:'account_tree', color:'#8b5cf6', problems: RECURSION_DP },
    { id:'graph',  title:'그래프 (BFS/DFS)', description:'그래프 탐색 알고리즘',                     icon:'hub',          color:'#ef4444', problems: GRAPH },
    { id:'greedy', title:'그리디',          description:'탐욕적 알고리즘으로 최적해 구하기',          icon:'trending_up',  color:'#14b8a6', problems: GREEDY },
];

// Helper: get all problems flat
export function getAllProblems(): ExternalProblem[] {
    return PROBLEM_SETS.flatMap(s => s.problems);
}

// Helper: get total count
export function getTotalProblemCount(): number {
    return PROBLEM_SETS.reduce((sum, s) => sum + s.problems.length, 0);
}
