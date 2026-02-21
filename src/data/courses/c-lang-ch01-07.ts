import { Chapter } from './types';

/** C언어 Chapter 01~07 (기초~반복문) */
export const C_LANG_CH01_07: Chapter[] = [
    {
        id: 'c-ch01', chapterNumber: 1, title: '소개 & 기본문법', icon: '🚀',
        description: 'C언어 소개, Hello world, 기본 문법',
        units: [
            {
                id: 'c-u03', unitNumber: 3, title: 'Hello, world!', subtitle: 'printf · main · 세미콜론', duration: '30분', type: '실습', difficulty: 1,
                content: 'C언어의 첫 프로그램! printf로 화면에 문자를 출력합니다.', tip: '💡 모든 C 프로그램은 main 함수에서 시작합니다!',
                quiz: { question: 'C언어에서 화면에 문자를 출력하는 함수는?', options: ['scanf', 'printf', 'cout', 'print'], answer: 1, explanation: 'printf는 C언어의 표준 출력 함수입니다.' },
                problems: [
                    { id: 1, title: 'Hello 출력', difficulty: 1, question: 'printf를 사용하여 "Hello, world!"를 출력하세요.', answer: '#include <stdio.h>\nint main() {\n    printf("Hello, world!\\n");\n    return 0;\n}' },
                    { id: 2, title: '여러 줄 출력', difficulty: 1, question: '이름과 나이를 각각 다른 줄에 출력하세요.', answer: 'printf("이름: 홍길동\\n");\nprintf("나이: 20\\n");' },
                ], problemCount: 15
            },
            {
                id: 'c-u04', unitNumber: 4, title: '기본 문법', subtitle: '#include · 주석 · 들여쓰기', duration: '35분', type: '이론', difficulty: 1,
                content: 'C 프로그램의 기본 구조: 헤더파일, main 함수, 주석, 세미콜론 규칙을 배웁니다.',
                quiz: { question: 'C언어에서 한 줄 주석 기호는?', options: ['/* */', '//', '#', '--'], answer: 1, explanation: '//는 C99부터 지원되는 한 줄 주석입니다. /* */는 여러 줄 주석입니다.' },
                problems: [
                    { id: 1, title: '주석 작성', difficulty: 1, question: '한 줄 주석과 여러 줄 주석을 사용하여 코드에 설명을 추가하세요.', answer: '// 한 줄 주석\n/* 여러 줄\n   주석 */' },
                ], problemCount: 10
            },
        ],
    },
    {
        id: 'c-ch02', chapterNumber: 2, title: '변수 & 디버거', icon: '📦',
        description: '변수 선언, 초기화, 디버거 사용법',
        units: [
            {
                id: 'c-u05', unitNumber: 5, title: '변수', subtitle: '선언 · 초기화 · 대입 · 네이밍', duration: '40분', type: '이론', difficulty: 1,
                content: '변수는 데이터를 저장하는 공간입니다. 자료형을 지정하고 이름을 붙여 선언합니다.',
                quiz: { question: '변수를 선언하면서 동시에 값을 저장하는 것을 무엇이라 하나요?', options: ['대입', '초기화', '선언', '참조'], answer: 1, explanation: '초기화(initialization)는 변수 선언 시 값을 할당하는 것입니다.' },
                problems: [
                    { id: 1, title: '변수 선언과 출력', difficulty: 1, question: 'int형 변수 num에 10을 저장하고 출력하세요.', answer: 'int num = 10;\nprintf("%d\\n", num);' },
                ], problemCount: 20
            },
        ],
    },
    {
        id: 'c-ch03', chapterNumber: 3, title: '자료형', icon: '🔢',
        description: '정수형, 실수형, 문자형, 상수',
        units: [
            {
                id: 'c-u07', unitNumber: 7, title: '정수 자료형', subtitle: 'int · short · long · unsigned · sizeof', duration: '50분', type: '이론', difficulty: 2,
                content: 'C언어의 정수 자료형은 크기에 따라 char(1B), short(2B), int(4B), long(4/8B), long long(8B)이 있습니다.',
                tip: '💡 int가 가장 많이 사용됩니다. sizeof 연산자로 크기 확인!',
                quiz: { question: 'sizeof(int)의 결과는 일반적으로 몇 바이트인가요?', options: ['1', '2', '4', '8'], answer: 2, explanation: 'int는 일반적으로 4바이트(32비트)입니다.' },
                problems: [
                    { id: 1, title: '정수형 변수 선언', difficulty: 1, question: 'int, short, long long 변수를 선언하고 값을 저장하세요.', answer: 'int num = 100;\nshort s = 200;\nlong long big = 1000000000;' },
                    { id: 2, title: '오버플로우', difficulty: 2, question: 'short s = 32767; s = s + 1; 의 결과는?', answer: '-32768 (오버플로우: 최댓값을 넘으면 최솟값으로)' },
                ], problemCount: 25
            },
            {
                id: 'c-u08', unitNumber: 8, title: '실수 자료형', subtitle: 'float · double · 정밀도 · 지수표기', duration: '45분', type: '이론', difficulty: 2,
                content: 'float(4B, 유효자릿수 6~7), double(8B, 유효자릿수 15~16)로 소수점이 있는 수를 표현합니다.',
                quiz: { question: 'double형의 크기는?', options: ['2바이트', '4바이트', '8바이트', '16바이트'], answer: 2, explanation: 'double은 8바이트(64비트)이며 유효자릿수가 15~16자리입니다.' },
                problems: [], problemCount: 20
            },
            {
                id: 'c-u09', unitNumber: 9, title: '문자 자료형', subtitle: 'char · ASCII · 문자와 정수', duration: '40분', type: '이론', difficulty: 1,
                content: 'char은 1바이트 자료형으로 문자 하나를 저장합니다. ASCII 코드로 문자와 숫자를 변환합니다.',
                quiz: { question: "'A'의 ASCII 코드값은?", options: ['60', '65', '90', '97'], answer: 1, explanation: "'A'의 ASCII 코드는 65입니다. 'a'는 97입니다." },
                problems: [], problemCount: 15
            },
            {
                id: 'c-u10', unitNumber: 10, title: '상수', subtitle: 'const · #define · 리터럴', duration: '30분', type: '이론', difficulty: 1,
                content: '상수는 값이 변하지 않는 변수입니다. const 키워드 또는 #define 매크로로 정의합니다.',
                quiz: { question: 'const int MAX = 100; 에서 MAX의 값을 나중에 바꿀 수 있나요?', options: ['예', '아니오', '조건부 가능', '컴파일러에 따라 다름'], answer: 1, explanation: 'const로 선언한 변수는 값을 변경할 수 없습니다.' },
                problems: [], problemCount: 10
            },
        ],
    },
    {
        id: 'c-ch04', chapterNumber: 4, title: '입력 & 연산자', icon: '⌨️',
        description: 'scanf 입력, 산술/증감/나머지 연산자, 형변환',
        units: [
            {
                id: 'c-u11', unitNumber: 11, title: '입력', subtitle: 'scanf · 서식지정자 · &', duration: '40분', type: '실습', difficulty: 1,
                content: 'scanf는 키보드에서 값을 입력받는 함수입니다. 변수 앞에 & 연산자를 붙여야 합니다.',
                quiz: { question: 'scanf에서 정수를 입력받을 때 사용하는 서식 지정자는?', options: ['%f', '%c', '%d', '%s'], answer: 2, explanation: '%d는 정수(int)를 입력받는 서식 지정자입니다.' },
                problems: [], problemCount: 15
            },
            {
                id: 'c-u12', unitNumber: 12, title: '덧셈/뺄셈', subtitle: '+ · - · 복합대입', duration: '30분', type: '실습', difficulty: 1,
                content: '산술 연산자 +, -와 복합 대입 연산자 +=, -=를 배웁니다.',
                quiz: { question: 'a += 5는 무엇과 같은 의미인가요?', options: ['a = 5', 'a = a + 5', 'a = a - 5', 'a == 5'], answer: 1, explanation: 'a += 5는 a = a + 5의 축약형입니다.' },
                problems: [], problemCount: 12
            },
            {
                id: 'c-u13', unitNumber: 13, title: '증감 연산자', subtitle: '++ · -- · 전위/후위', duration: '35분', type: '이론', difficulty: 2,
                content: '++a(전위)는 먼저 증가하고 사용, a++(후위)는 먼저 사용하고 증가합니다.',
                quiz: { question: 'int a = 5; int b = a++; 실행 후 b의 값은?', options: ['4', '5', '6', '7'], answer: 1, explanation: '후위 증감(a++)은 현재 값을 먼저 사용한 후 증가시킵니다. b=5, a=6이 됩니다.' },
                problems: [], problemCount: 15
            },
            {
                id: 'c-u14', unitNumber: 14, title: '곱셈/나눗셈', subtitle: '* · / · 정수나눗셈', duration: '30분', type: '실습', difficulty: 1,
                content: '정수끼리 나눗셈 시 소수점 이하는 버려집니다. 실수 결과를 원하면 형변환이 필요합니다.',
                quiz: { question: '7 / 2의 결과는? (int끼리 연산)', options: ['3', '3.5', '4', '3.0'], answer: 0, explanation: '정수끼리 나눗셈은 소수점 이하를 버립니다. 7/2 = 3' },
                problems: [], problemCount: 12
            },
            {
                id: 'c-u15', unitNumber: 15, title: '나머지 연산', subtitle: '% · 홀짝판별', duration: '25분', type: '실습', difficulty: 1,
                content: '% 연산자는 나눗셈의 나머지를 구합니다. 홀수/짝수 판별에 자주 사용됩니다.',
                quiz: { question: '17 % 5의 결과는?', options: ['2', '3', '4', '5'], answer: 0, explanation: '17 ÷ 5 = 3 나머지 2. 따라서 17 % 5 = 2' },
                problems: [], problemCount: 10
            },
            {
                id: 'c-u16', unitNumber: 16, title: '자료형 변환', subtitle: '암시적/명시적 캐스팅', duration: '35분', type: '이론', difficulty: 2,
                content: '작은 자료형에서 큰 자료형으로의 자동 변환과 (타입) 캐스팅 연산자를 배웁니다.',
                quiz: { question: '(double)7 / 2의 결과는?', options: ['3', '3.0', '3.5', '4'], answer: 2, explanation: '(double)7은 7.0이 되어 7.0/2 = 3.5가 됩니다.' },
                problems: [], problemCount: 15
            },
        ],
    },
    {
        id: 'c-ch05', chapterNumber: 5, title: '조건문', icon: '🔀',
        description: 'if, else, else if, 삼항연산자, 논리연산자, bool',
        units: [
            {
                id: 'c-u17', unitNumber: 17, title: 'if 조건문', subtitle: 'if · 비교연산자 · 블록', duration: '40분', type: '이론', difficulty: 1,
                content: 'if문은 조건이 참일 때만 코드를 실행합니다. 비교연산자(==, !=, <, >, <=, >=)로 조건을 만듭니다.',
                quiz: { question: 'C언어에서 "같다"를 비교하는 연산자는?', options: ['=', '==', '===', ':='], answer: 1, explanation: '==는 값이 같은지 비교합니다. =는 대입 연산자입니다.' },
                problems: [], problemCount: 15
            },
            {
                id: 'c-u18', unitNumber: 18, title: 'else', subtitle: 'if-else · 참/거짓 분기', duration: '30분', type: '이론', difficulty: 1,
                content: 'else는 if 조건이 거짓일 때 실행됩니다. 두 가지 경우 중 하나를 선택합니다.',
                quiz: { question: 'if(0) { A } else { B } — 어떤 코드가 실행되나요?', options: ['A', 'B', '둘 다', '아무것도'], answer: 1, explanation: 'C언어에서 0은 거짓(false)입니다. 조건이 거짓이므로 else의 B가 실행됩니다.' },
                problems: [], problemCount: 12
            },
            {
                id: 'c-u19', unitNumber: 19, title: 'else if', subtitle: '다중 조건 분기', duration: '35분', type: '이론', difficulty: 2,
                content: 'else if로 여러 조건을 차례로 확인합니다. 첫 번째로 참인 블록만 실행됩니다.',
                quiz: { question: 'if-else if-else에서 여러 조건이 참이면 몇 개의 블록이 실행되나요?', options: ['0개', '1개', '모두', '마지막'], answer: 1, explanation: '하나만 실행됩니다. 첫 번째로 참인 조건의 블록만 실행됩니다.' },
                problems: [], problemCount: 15
            },
            {
                id: 'c-u20', unitNumber: 20, title: '삼항 연산자', subtitle: '조건 ? 참 : 거짓', duration: '25분', type: '이론', difficulty: 2,
                content: '삼항 연산자는 if-else를 한 줄로 표현합니다. 조건 ? 참값 : 거짓값',
                quiz: { question: 'int x = (5 > 3) ? 10 : 20; x의 값은?', options: ['5', '10', '20', '3'], answer: 1, explanation: '5 > 3은 참이므로 10이 선택됩니다.' },
                problems: [], problemCount: 10
            },
            {
                id: 'c-u21', unitNumber: 21, title: '논리 연산자', subtitle: '&& · || · !', duration: '35분', type: '이론', difficulty: 2,
                content: '&&(AND), ||(OR), !(NOT) 논리 연산자로 복합 조건을 만듭니다.',
                quiz: { question: '(1 && 0)의 결과는?', options: ['1(참)', '0(거짓)', '에러', '-1'], answer: 1, explanation: 'AND 연산은 둘 다 참이어야 참입니다. 하나가 0이므로 결과는 0(거짓).' },
                problems: [], problemCount: 15
            },
            {
                id: 'c-u22', unitNumber: 22, title: '불 자료형', subtitle: 'stdbool.h · true/false', duration: '25분', type: '이론', difficulty: 1,
                content: 'C99부터 stdbool.h를 포함하면 bool, true, false를 사용할 수 있습니다.',
                quiz: { question: 'C언어에서 bool을 사용하려면 어떤 헤더를 포함해야 하나요?', options: ['stdlib.h', 'stdbool.h', 'string.h', 'math.h'], answer: 1, explanation: 'stdbool.h를 포함하면 bool, true, false 키워드를 사용할 수 있습니다.' },
                problems: [], problemCount: 8
            },
        ],
    },
    {
        id: 'c-ch06', chapterNumber: 6, title: '비트 연산 & switch', icon: '⚙️',
        description: '비트 연산자, 시프트, switch문',
        units: [
            {
                id: 'c-u23', unitNumber: 23, title: '비트 연산', subtitle: '& · | · ^ · ~', duration: '45분', type: '이론', difficulty: 3,
                content: '비트 연산자는 정수를 2진수 단위로 조작합니다. AND(&), OR(|), XOR(^), NOT(~)',
                quiz: { question: '5 & 3의 결과는? (비트 AND)', options: ['1', '3', '5', '7'], answer: 0, explanation: '5=101, 3=011, AND 연산: 001 = 1' },
                problems: [], problemCount: 15
            },
            {
                id: 'c-u24', unitNumber: 24, title: '시프트 연산', subtitle: '<< · >> · 2의 거듭제곱', duration: '40분', type: '이론', difficulty: 3,
                content: '<<는 왼쪽 시프트(×2), >>는 오른쪽 시프트(÷2). 비트를 이동시킵니다.',
                quiz: { question: '1 << 3의 결과는?', options: ['3', '4', '6', '8'], answer: 3, explanation: '1을 왼쪽으로 3칸 시프트: 0001 → 1000 = 8 (2³)' },
                problems: [], problemCount: 12
            },
            {
                id: 'c-u26', unitNumber: 26, title: 'switch문', subtitle: 'case · break · default', duration: '35분', type: '이론', difficulty: 2,
                content: 'switch문은 하나의 변수 값에 따라 여러 분기를 처리합니다. case마다 break 필수!',
                quiz: { question: 'switch에서 break를 생략하면 어떻게 되나요?', options: ['에러 발생', '다음 case도 실행(fall-through)', '프로그램 종료', '무한루프'], answer: 1, explanation: 'break가 없으면 다음 case로 계속 실행됩니다(fall-through).' },
                problems: [], problemCount: 15
            },
        ],
    },
    {
        id: 'c-ch07', chapterNumber: 7, title: '반복문', icon: '🔄',
        description: 'for, while, do-while, break, goto, 중첩루프',
        units: [
            {
                id: 'c-u27', unitNumber: 27, title: 'for 반복문', subtitle: '초기화 · 조건 · 증감 · 무한루프', duration: '45분', type: '실습', difficulty: 2,
                content: 'for문은 정해진 횟수만큼 코드를 반복합니다. for(초기화; 조건; 증감) 세 부분으로 구성.',
                tip: '💡 "Hello!" 100번 출력? for문 한 줄이면 OK!',
                quiz: { question: 'for(int i=0; i<5; i++) 는 몇 번 반복하나요?', options: ['4번', '5번', '6번', '무한'], answer: 1, explanation: 'i=0,1,2,3,4 → 총 5번 반복. i=5가 되면 5<5는 거짓이므로 종료.' },
                problems: [
                    { id: 1, title: 'for문 기본', difficulty: 1, question: 'for(int i=0; i<5; i++) printf("%d ", i);의 출력은?', answer: '0 1 2 3 4' },
                    { id: 2, title: '합계 구하기', difficulty: 2, question: '1부터 10까지의 합을 for문으로 구하세요.', answer: 'int sum=0;\nfor(int i=1;i<=10;i++) sum+=i;\nprintf("%d",sum); // 55' },
                ], problemCount: 20
            },
            {
                id: 'c-u28', unitNumber: 28, title: 'while 반복문', subtitle: '조건부 반복 · 무한루프', duration: '35분', type: '이론', difficulty: 2,
                content: 'while문은 조건이 참인 동안 반복합니다. 반복 횟수가 정해지지 않았을 때 유용합니다.',
                quiz: { question: 'while(1)은 어떻게 동작하나요?', options: ['1번 실행', '무한 반복', '실행 안 됨', '에러'], answer: 1, explanation: '1은 항상 참이므로 무한 반복입니다. break로 탈출합니다.' },
                problems: [], problemCount: 15
            },
            {
                id: 'c-u29', unitNumber: 29, title: 'do-while', subtitle: '최소 1회 실행', duration: '30분', type: '이론', difficulty: 2,
                content: 'do-while은 코드를 먼저 실행하고 조건을 확인합니다. 최소 1회는 반드시 실행됩니다.',
                quiz: { question: 'do-while과 while의 가장 큰 차이는?', options: ['속도', '최소 1회 실행 보장', '조건식', '반복 횟수'], answer: 1, explanation: 'do-while은 조건 확인 전에 본문을 먼저 실행하므로 최소 1회 실행이 보장됩니다.' },
                problems: [], problemCount: 10
            },
            {
                id: 'c-u30', unitNumber: 30, title: 'break & continue', subtitle: '반복 탈출 · 건너뛰기', duration: '30분', type: '이론', difficulty: 2,
                content: 'break는 반복문을 즉시 탈출, continue는 현재 반복을 건너뛰고 다음으로 이동합니다.',
                quiz: { question: 'continue문의 역할은?', options: ['반복문 탈출', '현재 반복 건너뛰기', '프로그램 종료', '다음 함수 호출'], answer: 1, explanation: 'continue는 이후 코드를 건너뛰고 반복문의 조건 확인으로 돌아갑니다.' },
                problems: [], problemCount: 12
            },
            {
                id: 'c-u31', unitNumber: 31, title: 'goto', subtitle: '라벨 이동 (비권장)', duration: '20분', type: '이론', difficulty: 2,
                content: 'goto는 지정된 라벨로 무조건 이동합니다. 스파게티 코드의 원인이므로 사용을 피합니다.',
                quiz: { question: 'goto문이 비권장되는 이유는?', options: ['속도가 느려서', '코드 흐름이 복잡해져서', '메모리 누수', '컴파일 에러'], answer: 1, explanation: 'goto는 코드 흐름을 추적하기 어렵게 만들어 유지보수가 힘들어집니다(스파게티 코드).' },
                problems: [], problemCount: 8
            },
            {
                id: 'c-u32', unitNumber: 32, title: '중첩 루프', subtitle: '이중 for · 구구단 · 별찍기', duration: '50분', type: '실습', difficulty: 3,
                content: '반복문 안에 반복문을 넣어 2차원 반복을 구현합니다. 구구단, 별찍기 등에 활용.',
                quiz: { question: '이중 for문에서 안쪽 루프는 바깥 루프 1회당 몇 번 실행되나요?', options: ['1번', '안쪽 조건만큼', '바깥 조건만큼', '제곱'], answer: 1, explanation: '바깥 루프 1회마다 안쪽 루프가 처음부터 끝까지 반복됩니다.' },
                problems: [], problemCount: 20
            },
        ],
    },
];
