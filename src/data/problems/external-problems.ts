/* ═══════════════════════════════════════════════
   외부 OJ 문제 데이터
   백준, KOI Study, 프로그래머스, 코드업
   ═══════════════════════════════════════════════ */

export interface ExternalProblem {
    id: string;
    title: string;
    source: 'baekjoon' | 'koistudy' | 'programmers' | 'codeup';
    sourceId: string;
    url: string;
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

const B = 'baekjoon' as const, P = 'programmers' as const, K = 'koistudy' as const, CU = 'codeup' as const;
const boj = (id:string,t:string,d:'bronze'|'silver'|'gold'|'platinum',c:string,tags:string[]):ExternalProblem=>({id:`boj-${id}`,title:t,source:B,sourceId:id,url:`https://www.acmicpc.net/problem/${id}`,difficulty:d,category:c,tags});
const pgm = (id:string,t:string,d:'bronze'|'silver'|'gold'|'platinum',c:string,tags:string[]):ExternalProblem=>({id:`pgm-${id}`,title:t,source:P,sourceId:id,url:`https://school.programmers.co.kr/learn/courses/30/lessons/${id}`,difficulty:d,category:c,tags});
const koi = (id:string,t:string,d:'bronze'|'silver'|'gold'|'platinum',c:string,tags:string[]):ExternalProblem=>({id:`koi-${id}`,title:t,source:K,sourceId:id,url:`https://koistudy.net/?mid=prob&prob=${id}`,difficulty:d,category:c,tags});
const cu = (id:string,t:string,d:'bronze'|'silver'|'gold'|'platinum',c:string,tags:string[]):ExternalProblem=>({id:`cu-${id}`,title:t,source:CU,sourceId:id,url:`https://codeup.kr/problem.php?id=${id}`,difficulty:d,category:c,tags});

// ═══ 1. 입출력 기초 (20문제) ═══
const IO_BASICS: ExternalProblem[] = [
    boj('2557','Hello World','bronze','입출력',['입출력','기초']),
    boj('1000','A+B','bronze','입출력',['입출력','기초']),
    boj('1001','A-B','bronze','입출력',['입출력','기초']),
    boj('10998','A×B','bronze','입출력',['입출력','기초']),
    boj('1008','A/B','bronze','입출력',['입출력','실수']),
    boj('10171','고양이','bronze','입출력',['입출력','출력']),
    boj('10172','개','bronze','입출력',['입출력','출력']),
    boj('11654','아스키 코드','bronze','입출력',['입출력','문자']),
    boj('11720','숫자의 합','bronze','입출력',['입출력','문자열']),
    boj('11721','열 개씩 끊어 출력하기','bronze','입출력',['입출력','문자열']),
    boj('10430','나머지','bronze','입출력',['입출력','수학']),
    boj('2588','곱셈','bronze','입출력',['입출력','수학']),
    boj('10926','??!','bronze','입출력',['입출력','문자열']),
    boj('18108','1998년생인 내가 태어난 해','bronze','입출력',['입출력','수학']),
    cu('1001','출력하기','bronze','입출력',['입출력','기초']),
    cu('1002','출력하기 2','bronze','입출력',['입출력','기초']),
    cu('1008','정수 입출력','bronze','입출력',['입출력','정수']),
    cu('1010','정수 2개 입출력','bronze','입출력',['입출력','정수']),
    cu('1013','실수 입출력','bronze','입출력',['입출력','실수']),
    cu('1019','연월일 입출력','bronze','입출력',['입출력','형식']),
];

// ═══ 2. 조건문 (15문제) ═══
const CONDITIONS: ExternalProblem[] = [
    boj('1330','두 수 비교하기','bronze','조건문',['조건문','비교']),
    boj('9498','시험 성적','bronze','조건문',['조건문','등급']),
    boj('2753','윤년','bronze','조건문',['조건문','계산']),
    boj('14681','사분면 고르기','bronze','조건문',['조건문','좌표']),
    boj('2884','알람 시계','bronze','조건문',['조건문','시간']),
    boj('2525','오븐 시계','bronze','조건문',['조건문','시간']),
    boj('2480','주사위 세개','bronze','조건문',['조건문','게임']),
    boj('10817','세 수','bronze','조건문',['조건문','정렬']),
    boj('2420','사파리 월드','bronze','조건문',['조건문','절댓값']),
    boj('2935','소음','bronze','조건문',['조건문','큰수']),
    cu('1065','짝수 홀수','bronze','조건문',['조건문']),
    cu('1066','3의 배수','bronze','조건문',['조건문','배수']),
    cu('1067','정수 범위 판별','bronze','조건문',['조건문','범위']),
    cu('1077','짝홀수 판단','bronze','조건문',['조건문']),
    koi('1001','비교 연산','bronze','조건문',['조건문','기초']),
];

// ═══ 3. 반복문 (18문제) ═══
const LOOPS: ExternalProblem[] = [
    boj('2739','구구단','bronze','반복문',['반복문','기초']),
    boj('10950','A+B - 3','bronze','반복문',['반복문','입출력']),
    boj('8393','합','bronze','반복문',['반복문','합계']),
    boj('15552','빠른 A+B','bronze','반복문',['반복문','빠른IO']),
    boj('2438','별 찍기 - 1','bronze','반복문',['반복문','패턴']),
    boj('2439','별 찍기 - 2','bronze','반복문',['반복문','패턴']),
    boj('2440','별 찍기 - 3','bronze','반복문',['반복문','패턴']),
    boj('2441','별 찍기 - 4','bronze','반복문',['반복문','패턴']),
    boj('2442','별 찍기 - 5','bronze','반복문',['반복문','패턴']),
    boj('10871','X보다 작은 수','bronze','반복문',['반복문','배열']),
    boj('10952','A+B - 5','bronze','반복문',['반복문','종료조건']),
    boj('10951','A+B - 4','bronze','반복문',['반복문','EOF']),
    boj('1110','더하기 사이클','bronze','반복문',['반복문','시뮬레이션']),
    boj('11022','A+B - 8','bronze','반복문',['반복문','형식출력']),
    cu('1099','별 찍기','bronze','반복문',['반복문','패턴']),
    cu('1100','삼각형 별','bronze','반복문',['반복문','패턴']),
    cu('1101','역삼각형','bronze','반복문',['반복문','패턴']),
    koi('1002','별 출력','bronze','반복문',['반복문','패턴']),
];

// ═══ 4. 배열 & 문자열 (18문제) ═══
const ARRAY_STR: ExternalProblem[] = [
    boj('10818','최소, 최대','bronze','배열',['배열','최소최대']),
    boj('2562','최댓값','bronze','배열',['배열','인덱스']),
    boj('10807','개수 세기','bronze','배열',['배열','카운팅']),
    boj('5597','과제 안 내신 분..?','bronze','배열',['배열','체크']),
    boj('3052','나머지','bronze','배열',['배열','집합']),
    boj('1546','평균','bronze','배열',['배열','평균']),
    boj('8958','OX퀴즈','bronze','문자열',['문자열','연속']),
    boj('4344','평균은 넘겠지','bronze','배열',['배열','평균']),
    boj('10809','알파벳 찾기','bronze','문자열',['문자열','인덱스']),
    boj('2675','문자열 반복','bronze','문자열',['문자열','반복']),
    boj('1157','단어 공부','bronze','문자열',['문자열','카운팅']),
    boj('1152','단어의 개수','bronze','문자열',['문자열','파싱']),
    boj('2908','상수','bronze','문자열',['문자열','뒤집기']),
    boj('5622','다이얼','bronze','문자열',['문자열','매핑']),
    pgm('12901','2016년','silver','구현',['구현','날짜']),
    pgm('12903','가운데 글자 가져오기','silver','문자열',['문자열']),
    pgm('12906','같은 숫자는 싫어','silver','배열',['배열','스택']),
    pgm('12910','나누어 떨어지는 숫자 배열','silver','배열',['배열','필터']),
];

// ═══ 5. 수학 (15문제) ═══
const MATH: ExternalProblem[] = [
    boj('1712','손익분기점','bronze','수학',['수학','부등식']),
    boj('2292','벌집','bronze','수학',['수학','패턴']),
    boj('1193','분수찾기','bronze','수학',['수학','규칙']),
    boj('2869','달팽이는 올라가고 싶다','bronze','수학',['수학','계산']),
    boj('10250','ACM 호텔','bronze','수학',['수학','나머지']),
    boj('2775','부녀회장이 될테야','bronze','수학',['수학','DP']),
    boj('2839','설탕 배달','bronze','수학',['수학','그리디']),
    boj('10757','큰 수 A+B','bronze','수학',['수학','큰수']),
    boj('1978','소수 찾기','bronze','수학',['수학','소수']),
    boj('2581','소수','bronze','수학',['수학','소수']),
    boj('1929','소수 구하기','silver','수학',['수학','에라토스테네스']),
    boj('4948','베르트랑 공준','silver','수학',['수학','소수']),
    boj('9020','골드바흐의 추측','silver','수학',['수학','소수']),
    boj('1085','직사각형에서 탈출','bronze','수학',['수학','기하']),
    boj('3009','네 번째 점','bronze','수학',['수학','기하']),
];

// ═══ 6. 정렬 & 탐색 (16문제) ═══
const SORT_SEARCH: ExternalProblem[] = [
    boj('2750','수 정렬하기','silver','정렬',['정렬','기초']),
    boj('2751','수 정렬하기 2','silver','정렬',['정렬','O(nlogn)']),
    boj('10989','수 정렬하기 3','silver','정렬',['정렬','카운팅정렬']),
    boj('2108','통계학','silver','정렬',['정렬','통계']),
    boj('1427','소트인사이드','bronze','정렬',['정렬','내림차순']),
    boj('11650','좌표 정렬하기','silver','정렬',['정렬','다중키']),
    boj('11651','좌표 정렬하기 2','silver','정렬',['정렬','다중키']),
    boj('1181','단어 정렬','silver','정렬',['정렬','문자열']),
    boj('1920','수 찾기','silver','탐색',['이진탐색']),
    boj('1654','랜선 자르기','silver','탐색',['이진탐색','매개변수']),
    boj('2805','나무 자르기','silver','탐색',['이진탐색']),
    boj('10816','숫자 카드 2','silver','탐색',['이진탐색','카운팅']),
    pgm('42746','가장 큰 수','silver','정렬',['정렬','비교함수']),
    pgm('42748','K번째수','silver','정렬',['정렬']),
    pgm('42747','H-Index','silver','정렬',['정렬']),
    koi('2001','정렬 연습','silver','정렬',['정렬']),
];

// ═══ 7. 스택 & 큐 & 덱 (16문제) ═══
const STACK_QUEUE: ExternalProblem[] = [
    boj('10828','스택','silver','스택',['스택','구현']),
    boj('10845','큐','silver','큐',['큐','구현']),
    boj('10866','덱','silver','덱',['덱','구현']),
    boj('9012','괄호','silver','스택',['스택','괄호']),
    boj('4949','균형잡힌 세상','silver','스택',['스택','괄호']),
    boj('1874','스택 수열','silver','스택',['스택']),
    boj('10773','제로','silver','스택',['스택']),
    boj('1966','프린터 큐','silver','큐',['큐','시뮬레이션']),
    boj('11866','요세푸스 문제 0','silver','큐',['큐','시뮬레이션']),
    boj('2164','카드2','silver','큐',['큐']),
    boj('18258','큐 2','silver','큐',['큐','구현']),
    pgm('42586','기능개발','silver','큐',['큐','시뮬레이션']),
    pgm('42587','프로세스','silver','큐',['큐','우선순위']),
    pgm('42583','다리를 지나는 트럭','silver','큐',['큐','시뮬레이션']),
    pgm('12909','올바른 괄호','silver','스택',['스택','괄호']),
    koi('2002','스택 연습','silver','스택',['스택']),
];

// ═══ 8. 재귀 & DP (18문제) ═══
const RECURSION_DP: ExternalProblem[] = [
    boj('10872','팩토리얼','bronze','재귀',['재귀','기초']),
    boj('10870','피보나치 수 5','bronze','재귀',['재귀','피보나치']),
    boj('2447','별 찍기 - 10','silver','재귀',['재귀','프랙탈']),
    boj('11729','하노이 탑 이동 순서','silver','재귀',['재귀']),
    boj('1003','피보나치 함수','silver','DP',['DP','메모이제이션']),
    boj('1463','1로 만들기','silver','DP',['DP']),
    boj('9184','신나는 함수 실행','silver','DP',['DP','메모이제이션']),
    boj('11726','2×n 타일링','silver','DP',['DP']),
    boj('11727','2×n 타일링 2','silver','DP',['DP']),
    boj('9461','파도반 수열','silver','DP',['DP']),
    boj('1932','정수 삼각형','silver','DP',['DP']),
    boj('2579','계단 오르기','silver','DP',['DP']),
    boj('1912','연속합','silver','DP',['DP','카데인']),
    boj('1149','RGB거리','silver','DP',['DP']),
    boj('12865','평범한 배낭','gold','DP',['DP','배낭']),
    boj('11053','가장 긴 증가하는 부분 수열','silver','DP',['DP','LIS']),
    pgm('42839','소수 찾기','silver','완전탐색',['완전탐색','소수']),
    pgm('43105','정수 삼각형','silver','DP',['DP']),
];

// ═══ 9. 그래프 & BFS/DFS (18문제) ═══
const GRAPH: ExternalProblem[] = [
    boj('1260','DFS와 BFS','silver','그래프',['DFS','BFS']),
    boj('2606','바이러스','silver','그래프',['DFS','BFS']),
    boj('1012','유기농 배추','silver','그래프',['DFS','BFS']),
    boj('2178','미로 탐색','silver','그래프',['BFS','최단경로']),
    boj('7576','토마토','gold','그래프',['BFS']),
    boj('2667','단지번호붙이기','silver','그래프',['DFS','BFS']),
    boj('1697','숨바꼭질','silver','그래프',['BFS']),
    boj('7569','토마토 3D','gold','그래프',['BFS','3차원']),
    boj('1926','그림','silver','그래프',['BFS','영역']),
    boj('2206','벽 부수고 이동하기','gold','그래프',['BFS','상태공간']),
    boj('11724','연결 요소의 개수','silver','그래프',['DFS','연결요소']),
    boj('2468','안전 영역','silver','그래프',['DFS','브루트포스']),
    boj('10026','적록색약','gold','그래프',['BFS']),
    pgm('43162','네트워크','gold','그래프',['DFS','BFS']),
    pgm('43163','단어 변환','gold','그래프',['BFS']),
    pgm('43164','여행경로','gold','그래프',['DFS','백트래킹']),
    pgm('43165','타겟 넘버','silver','그래프',['DFS','완전탐색']),
    koi('3001','그래프 탐색','silver','그래프',['그래프']),
];

// ═══ 10. 그리디 (14문제) ═══
const GREEDY: ExternalProblem[] = [
    boj('11047','동전 0','silver','그리디',['그리디']),
    boj('1931','회의실 배정','silver','그리디',['그리디','정렬']),
    boj('11399','ATM','silver','그리디',['그리디','정렬']),
    boj('1541','잃어버린 괄호','silver','그리디',['그리디','파싱']),
    boj('13305','주유소','silver','그리디',['그리디']),
    boj('1744','수 묶기','gold','그리디',['그리디','정렬']),
    boj('2217','로프','silver','그리디',['그리디']),
    boj('1946','신입 사원','silver','그리디',['그리디','정렬']),
    pgm('42860','조이스틱','silver','그리디',['그리디']),
    pgm('42862','체육복','silver','그리디',['그리디']),
    pgm('42883','큰 수 만들기','silver','그리디',['그리디','스택']),
    pgm('42884','구명보트','silver','그리디',['그리디','투포인터']),
    pgm('42885','섬 연결하기','gold','그리디',['그리디','크루스칼']),
    koi('2003','탐욕 연습','silver','그리디',['그리디']),
];

// ═══ 11. 해시 & 집합 (10문제) ═══
const HASH: ExternalProblem[] = [
    boj('1764','듣보잡','silver','해시',['해시','집합']),
    boj('10815','숫자 카드','silver','해시',['해시','이진탐색']),
    boj('7785','회사에 있는 사람','silver','해시',['해시','집합']),
    boj('1620','나는야 포켓몬 마스터','silver','해시',['해시','딕셔너리']),
    boj('17219','비밀번호 찾기','silver','해시',['해시','딕셔너리']),
    pgm('42576','완주하지 못한 선수','silver','해시',['해시']),
    pgm('42577','전화번호 목록','silver','해시',['해시','정렬']),
    pgm('42578','의상','silver','해시',['해시','조합']),
    pgm('42579','베스트앨범','silver','해시',['해시','정렬']),
    pgm('1845','폰켓몬','silver','해시',['해시','집합']),
];

// ═══ 12. 백트래킹 (10문제) ═══
const BACKTRACKING: ExternalProblem[] = [
    boj('15649','N과 M (1)','silver','백트래킹',['백트래킹','순열']),
    boj('15650','N과 M (2)','silver','백트래킹',['백트래킹','조합']),
    boj('15651','N과 M (3)','silver','백트래킹',['백트래킹','중복순열']),
    boj('15652','N과 M (4)','silver','백트래킹',['백트래킹','중복조합']),
    boj('9663','N-Queen','gold','백트래킹',['백트래킹']),
    boj('2580','스도쿠','gold','백트래킹',['백트래킹']),
    boj('14888','연산자 끼워넣기','silver','백트래킹',['백트래킹','완전탐색']),
    boj('14889','스타트와 링크','silver','백트래킹',['백트래킹','브루트포스']),
    boj('6603','로또','silver','백트래킹',['백트래킹','조합']),
    pgm('87946','피로도','silver','백트래킹',['백트래킹','완전탐색']),
];

// ═══ Problem Sets ═══
export const PROBLEM_SETS: ProblemSet[] = [
    { id:'io',     title:'입출력 기초',     description:'프로그래밍의 첫 걸음: 입출력 연습',          icon:'terminal',     color:'#3b82f6', problems: IO_BASICS },
    { id:'cond',   title:'조건문',          description:'if/else로 판단하고 분기하기',                icon:'call_split',   color:'#f59e0b', problems: CONDITIONS },
    { id:'loop',   title:'반복문',          description:'for/while로 패턴과 합계 구하기',            icon:'loop',         color:'#10b981', problems: LOOPS },
    { id:'array',  title:'배열 & 문자열',   description:'배열 활용과 문자열 처리',                    icon:'data_array',   color:'#3b82f6', problems: ARRAY_STR },
    { id:'math',   title:'수학',            description:'수학적 사고와 공식 활용',                    icon:'calculate',    color:'#a855f7', problems: MATH },
    { id:'sort',   title:'정렬 & 탐색',     description:'정렬 알고리즘과 이진 탐색',                 icon:'sort',         color:'#ec4899', problems: SORT_SEARCH },
    { id:'stack',  title:'스택 & 큐',       description:'스택/큐/덱 자료구조 활용',                  icon:'layers',       color:'#f97316', problems: STACK_QUEUE },
    { id:'dp',     title:'재귀 & DP',       description:'재귀 함수와 동적 프로그래밍',               icon:'account_tree', color:'#2563eb', problems: RECURSION_DP },
    { id:'graph',  title:'그래프 (BFS/DFS)', description:'그래프 탐색 알고리즘',                     icon:'hub',          color:'#ef4444', problems: GRAPH },
    { id:'greedy', title:'그리디',          description:'탐욕적 알고리즘으로 최적해 구하기',          icon:'trending_up',  color:'#14b8a6', problems: GREEDY },
    { id:'hash',   title:'해시 & 집합',     description:'해시맵과 집합으로 효율적 탐색',              icon:'tag',          color:'#0ea5e9', problems: HASH },
    { id:'bt',     title:'백트래킹',        description:'모든 경우의 수를 탐색하기',                 icon:'route',        color:'#e11d48', problems: BACKTRACKING },
];

export function getAllProblems(): ExternalProblem[] {
    return PROBLEM_SETS.flatMap(s => s.problems);
}

export function getTotalProblemCount(): number {
    return PROBLEM_SETS.reduce((sum, s) => sum + s.problems.length, 0);
}
