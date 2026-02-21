import { Chapter } from './types';

/** C언어 Chapter 08~17 (배열~실전) */
export const C_LANG_CH08_17: Chapter[] = [
    {
        id: 'c-ch08', chapterNumber: 8, title: '배열', icon: '📊',
        description: '1차원 배열, 배열 반복, 2차원 배열, 문자 배열',
        units: [
            {
                id: 'c-u33', unitNumber: 33, title: '배열', subtitle: '선언 · 인덱스 · 초기화', duration: '45분', type: '이론', difficulty: 2,
                content: '배열은 같은 자료형의 데이터를 연속으로 저장합니다. int arr[5]; 로 선언하고 인덱스는 0부터 시작합니다.',
                quiz: { question: 'int arr[5]; 에서 사용 가능한 인덱스 범위는?', options: ['1~5', '0~5', '0~4', '1~4'], answer: 2, explanation: '배열 인덱스는 0부터 시작하므로 arr[0]~arr[4]까지 사용 가능합니다.' },
                problems: [], problemCount: 20
            },
            {
                id: 'c-u34', unitNumber: 34, title: '배열과 반복', subtitle: 'for문으로 순회 · 최대/최소', duration: '40분', type: '실습', difficulty: 2,
                content: 'for문으로 배열의 모든 요소를 순회하며 합계, 평균, 최대값, 최소값 등을 구합니다.',
                quiz: { question: '배열의 모든 요소를 출력할 때 가장 적합한 반복문은?', options: ['while', 'do-while', 'for', 'goto'], answer: 2, explanation: '배열 크기가 정해져 있으므로 for문이 가장 적합합니다.' },
                problems: [], problemCount: 18
            },
            {
                id: 'c-u35', unitNumber: 35, title: '2차원 배열', subtitle: '행·열 · 이중 for', duration: '50분', type: '이론', difficulty: 3,
                content: '2차원 배열은 행(row)과 열(column)로 구성됩니다. int arr[3][4]; = 3행 4열',
                quiz: { question: 'int arr[3][4]; 에서 전체 요소 개수는?', options: ['3', '4', '7', '12'], answer: 3, explanation: '3행 × 4열 = 12개의 요소를 저장할 수 있습니다.' },
                problems: [], problemCount: 15
            },
            {
                id: 'c-u36', unitNumber: 36, title: '문자 배열', subtitle: 'char[] · 널문자 · 문자열 입출력', duration: '40분', type: '이론', difficulty: 2,
                content: '문자 배열은 문자열을 저장합니다. 끝에 널 문자(\\0)가 자동으로 추가됩니다.',
                quiz: { question: '"Hello"를 저장하려면 char 배열의 최소 크기는?', options: ['4', '5', '6', '7'], answer: 2, explanation: '"Hello"는 5글자 + 널 문자(\\0) 1개 = 최소 6칸 필요합니다.' },
                problems: [], problemCount: 15
            },
        ],
    },
    {
        id: 'c-ch09', chapterNumber: 9, title: '문자열', icon: '📝',
        description: '문자열 함수, 문자열 변환',
        units: [
            {
                id: 'c-u37', unitNumber: 37, title: '문자열 함수', subtitle: 'strlen · strcpy · strcat · strcmp', duration: '50분', type: '이론', difficulty: 2,
                content: 'string.h의 문자열 처리 함수: strlen(길이), strcpy(복사), strcat(연결), strcmp(비교)',
                quiz: { question: 'strcmp("abc","abc")의 반환값은?', options: ['-1', '0', '1', 'true'], answer: 1, explanation: 'strcmp는 두 문자열이 같으면 0을 반환합니다.' },
                problems: [], problemCount: 20
            },
            {
                id: 'c-u38', unitNumber: 38, title: '문자열 변환', subtitle: 'atoi · atof · sprintf · sscanf', duration: '40분', type: '이론', difficulty: 2,
                content: 'atoi(문자열→정수), atof(문자열→실수), sprintf(서식→문자열), sscanf(문자열→변수)',
                quiz: { question: 'atoi("123")의 결과는?', options: ['"123"', '123', '1.23', '에러'], answer: 1, explanation: 'atoi는 문자열을 정수(int)로 변환합니다. "123" → 123' },
                problems: [], problemCount: 15
            },
        ],
    },
    {
        id: 'c-ch10', chapterNumber: 10, title: '포인터', icon: '📌',
        description: '포인터 기초, 역참조',
        units: [
            {
                id: 'c-u39', unitNumber: 39, title: '포인터 기초', subtitle: '주소 · * · & · NULL', duration: '55분', type: '이론', difficulty: 3,
                content: '포인터는 메모리 주소를 저장하는 변수입니다. & = 주소 연산자, * = 선언/역참조.',
                quiz: { question: 'int *p; 에서 p가 저장하는 것은?', options: ['정수 값', '메모리 주소', '배열 인덱스', '문자'], answer: 1, explanation: '포인터 변수 p는 int형 변수의 메모리 주소를 저장합니다.' },
                problems: [], problemCount: 25
            },
            {
                id: 'c-u40', unitNumber: 40, title: '역참조', subtitle: '*로 값 읽기/쓰기 · swap', duration: '45분', type: '실습', difficulty: 3,
                content: '*p는 포인터가 가리키는 값을 읽거나 변경합니다. swap 함수에서 포인터를 활용합니다.',
                quiz: { question: 'int a=10; int *p=&a; *p=20; 후 a의 값은?', options: ['10', '20', '주소값', '에러'], answer: 1, explanation: '*p로 값을 변경하면 a의 값도 변경됩니다. 같은 메모리를 가리키기 때문입니다.' },
                problems: [], problemCount: 20
            },
        ],
    },
    {
        id: 'c-ch11', chapterNumber: 11, title: '함수', icon: '🧩',
        description: '함수 정의, 매개변수, 반환, 재귀',
        units: [
            {
                id: 'c-u41', unitNumber: 41, title: '함수 기초', subtitle: '선언 · 정의 · 호출 · return', duration: '50분', type: '이론', difficulty: 2,
                content: '함수는 특정 작업을 수행하는 코드 블록입니다. 반환형 함수이름(매개변수) { ... return 값; }',
                quiz: { question: 'void 반환형의 의미는?', options: ['정수 반환', '반환값 없음', '문자 반환', '에러'], answer: 1, explanation: 'void는 함수가 값을 반환하지 않음을 의미합니다.' },
                problems: [], problemCount: 20
            },
            {
                id: 'c-u42', unitNumber: 42, title: '재귀 함수', subtitle: '자기 호출 · 팩토리얼 · 피보나치', duration: '55분', type: '이론', difficulty: 3,
                content: '재귀 함수는 자기 자신을 호출하는 함수입니다. 반드시 종료 조건(base case)이 필요합니다.',
                quiz: { question: '재귀 함수에서 가장 중요한 것은?', options: ['속도', '종료 조건(base case)', '매개변수 개수', '반환형'], answer: 1, explanation: '종료 조건이 없으면 무한 재귀에 빠져 스택 오버플로우가 발생합니다.' },
                problems: [], problemCount: 18
            },
        ],
    },
    {
        id: 'c-ch12', chapterNumber: 12, title: '구조체', icon: '🏗️',
        description: '구조체 정의, 멤버 접근, 포인터',
        units: [
            {
                id: 'c-u43', unitNumber: 43, title: '구조체', subtitle: 'struct · 멤버 · typedef · 포인터', duration: '60분', type: '이론', difficulty: 3,
                content: '구조체는 서로 다른 자료형의 데이터를 하나로 묶습니다. struct Student { char name[20]; int age; };',
                quiz: { question: '구조체 멤버에 접근하는 연산자는?', options: ['->만', '.만', '. 또는 ->', '::'], answer: 2, explanation: '일반 변수는 점(.), 포인터는 화살표(->) 연산자로 멤버에 접근합니다.' },
                problems: [], problemCount: 22
            },
        ],
    },
    {
        id: 'c-ch13', chapterNumber: 13, title: '파일 입출력', icon: '📂',
        description: '파일 열기/닫기, 읽기/쓰기',
        units: [
            {
                id: 'c-u44', unitNumber: 44, title: '파일 열기/닫기', subtitle: 'fopen · fclose · 모드', duration: '45분', type: '이론', difficulty: 2,
                content: 'fopen으로 파일을 열고 fclose로 닫습니다. 모드: "r"(읽기), "w"(쓰기), "a"(추가)',
                quiz: { question: 'fopen의 "w" 모드의 특징은?', options: ['읽기 전용', '파일이 있으면 내용을 지우고 새로 쓰기', '파일 끝에 추가', '바이너리 모드'], answer: 1, explanation: '"w" 모드는 파일이 존재하면 내용을 지우고 새로 작성합니다.' },
                problems: [], problemCount: 18
            },
        ],
    },
    {
        id: 'c-ch14', chapterNumber: 14, title: '전처리기', icon: '⚡',
        description: '매크로, 헤더파일, 조건부 컴파일',
        units: [
            {
                id: 'c-u45', unitNumber: 45, title: '전처리기', subtitle: '#define · #ifdef · #ifndef', duration: '40분', type: '이론', difficulty: 2,
                content: '전처리기는 컴파일 전에 코드를 변환합니다. #define으로 매크로를 정의합니다.',
                quiz: { question: '#define PI 3.14에서 PI는 무엇인가요?', options: ['변수', '상수', '매크로', '함수'], answer: 2, explanation: '#define으로 정의한 것은 매크로입니다. 컴파일 전에 텍스트 치환됩니다.' },
                problems: [], problemCount: 15
            },
            {
                id: 'c-u46', unitNumber: 46, title: '헤더 파일', subtitle: '.h파일 · include guard', duration: '35분', type: '이론', difficulty: 2,
                content: '헤더 파일은 함수 선언, 매크로 등을 별도 파일에 저장합니다. #include "파일.h"로 포함.',
                quiz: { question: '#include <stdio.h>와 #include "myfile.h"의 차이는?', options: ['없음', '<>는 시스템, ""는 사용자 헤더', '속도 차이', '컴파일러 차이'], answer: 1, explanation: '<>는 시스템 디렉토리에서, ""는 현재 디렉토리에서 먼저 찾습니다.' },
                problems: [], problemCount: 12
            },
        ],
    },
    {
        id: 'c-ch15', chapterNumber: 15, title: '고급 주제', icon: '🎯',
        description: '열거형, 동적 메모리 관리',
        units: [
            {
                id: 'c-u47', unitNumber: 47, title: '열거형', subtitle: 'enum · 가독성', duration: '30분', type: '이론', difficulty: 2,
                content: 'enum은 이름이 있는 정수 상수 집합입니다. enum Color { RED, GREEN, BLUE };',
                quiz: { question: 'enum Color { RED, GREEN, BLUE }; 에서 GREEN의 값은?', options: ['0', '1', '2', 'GREEN'], answer: 1, explanation: 'enum은 0부터 시작하여 순서대로 값이 부여됩니다. RED=0, GREEN=1, BLUE=2' },
                problems: [], problemCount: 10
            },
            {
                id: 'c-u48', unitNumber: 48, title: '메모리 관리', subtitle: 'malloc · free · calloc · realloc', duration: '55분', type: '이론', difficulty: 3,
                content: 'malloc으로 힙 메모리를 동적 할당하고 free로 해제합니다. 메모리 누수를 방지해야 합니다.',
                quiz: { question: 'malloc 후 반드시 해야 하는 것은?', options: ['realloc', 'free', 'calloc', 'memset'], answer: 1, explanation: '동적 할당된 메모리는 사용 후 반드시 free로 해제해야 메모리 누수를 방지합니다.' },
                problems: [], problemCount: 20
            },
        ],
    },
    {
        id: 'c-ch16', chapterNumber: 16, title: '자료구조', icon: '🔗',
        description: '연결 리스트',
        units: [
            {
                id: 'c-u49', unitNumber: 49, title: '연결 리스트', subtitle: 'node · next · 삽입 · 삭제', duration: '60분', type: '이론', difficulty: 3,
                content: '연결 리스트는 노드들이 포인터로 연결된 동적 자료구조입니다.',
                quiz: { question: '연결 리스트의 장점은?', options: ['빠른 인덱싱', '동적 크기 변경', '메모리 절약', '캐시 효율'], answer: 1, explanation: '연결 리스트는 크기가 동적으로 변할 수 있어 삽입/삭제가 유연합니다.' },
                problems: [], problemCount: 22
            },
        ],
    },
    {
        id: 'c-ch17', chapterNumber: 17, title: '실전 종합', icon: '🏅',
        description: '지금까지 배운 내용 종합 연습',
        units: [
            {
                id: 'c-u50', unitNumber: 50, title: '종합 문제', subtitle: '복합 문제 풀이', duration: '90분', type: '종합', difficulty: 3,
                content: 'Chapter 1~16까지 배운 모든 내용을 활용하는 종합 문제입니다.',
                quiz: { question: '다음 중 C 프로그램 실행 순서로 올바른 것은?', options: ['컴파일→링크→전처리→실행', '전처리→컴파일→링크→실행', '링크→전처리→컴파일→실행', '실행→컴파일→링크→전처리'], answer: 1, explanation: '전처리(#include 처리) → 컴파일(기계어 변환) → 링크(라이브러리 연결) → 실행' },
                problems: [], problemCount: 30
            },
        ],
    },
];
