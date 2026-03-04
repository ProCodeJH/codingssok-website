import { Chapter } from './types';

/** C언어 Part 8 — CH11: 함수 (U60-69) */
export const C_LANG_PART8: Chapter[] = [
    {
        id: 'c-ch11', chapterNumber: 11, title: '함수', icon: '🔧',
        description: '함수 선언/정의, 매개변수, 반환값, 재귀, 함수 포인터, 가변인자',
        units: [
            {
                id: 'c-u60', unitNumber: 60, title: '함수 사용하기',
                pages: [
                    { id: '60.0', title: '함수 사용하기', type: '페이지' },
                    { id: '60.1', title: 'Hello, world! 출력 함수 만들기', type: '페이지' },
                    { id: '60.2', title: '함수 선언과 정의 분리하기', type: '페이지' },
                    { id: '60.3', title: '매개변수와 반환값이 없는 함수 만들기', type: '페이지' },
                    { id: '60.4', title: '퀴즈', type: '퀴즈' },
                    { id: '60.5', title: '연습문제: 함수 만들기', type: '페이지' },
                    { id: '60.6', title: '심사문제: 두 수의 합 함수 만들기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u61', unitNumber: 61, title: '매개변수 사용하기',
                pages: [
                    { id: '61.1', title: '매개변수 사용하기', type: '페이지' },
                    { id: '61.2', title: '덧셈 함수 만들기', type: '페이지' },
                    { id: '61.3', title: '매개변수를 여러 개 사용하는 함수 만들기', type: '페이지' },
                    { id: '61.4', title: '퀴즈', type: '퀴즈' },
                    { id: '61.5', title: '연습문제: 사칙연산 함수 만들기', type: '페이지' },
                    { id: '61.6', title: '심사문제: 원의 넓이와 둘레 구하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u62', unitNumber: 62, title: '반환값 사용하기',
                pages: [
                    { id: '62.1', title: '반환값 사용하기', type: '페이지' },
                    { id: '62.2', title: '반환값이 있는 함수 만들기', type: '페이지' },
                    { id: '62.3', title: 'return의 다양한 사용법', type: '페이지' },
                    { id: '62.4', title: 'bool 반환 함수 만들기', type: '페이지' },
                    { id: '62.5', title: '퀴즈', type: '퀴즈' },
                    { id: '62.6', title: '연습문제: 반환값 사용하기', type: '페이지' },
                    { id: '62.7', title: '심사문제: 절댓값 구하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u63', unitNumber: 63, title: '함수에서 포인터 매개변수 사용하기',
                pages: [
                    { id: '63.1', title: '포인터 매개변수 사용하기', type: '페이지' },
                    { id: '63.2', title: 'void 포인터 매개변수 사용하기', type: '페이지' },
                    { id: '63.3', title: '이중 포인터 매개변수 사용하기', type: '페이지' },
                    { id: '63.4', title: '문자열 매개변수 사용하기', type: '페이지' },
                    { id: '63.5', title: '퀴즈', type: '퀴즈' },
                    { id: '63.6', title: '연습문제: swap 함수 만들기', type: '페이지' },
                    { id: '63.7', title: '심사문제: 두 변수의 값 바꾸기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u64', unitNumber: 64, title: '함수에서 배열 매개변수 사용하기',
                pages: [
                    { id: '64.1', title: '배열 매개변수 사용하기', type: '페이지' },
                    { id: '64.2', title: '배열의 크기를 함께 전달하기', type: '페이지' },
                    { id: '64.3', title: '2차원 배열 매개변수 사용하기', type: '페이지' },
                    { id: '64.4', title: '퀴즈', type: '퀴즈' },
                    { id: '64.5', title: '연습문제: 배열의 합계 구하는 함수 만들기', type: '페이지' },
                    { id: '64.6', title: '심사문제: 배열의 최댓값 구하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u65', unitNumber: 65, title: '함수에서 구조체 매개변수 사용하기',
                pages: [
                    { id: '65.1', title: '구조체 매개변수 사용하기', type: '페이지' },
                    { id: '65.2', title: '구조체 포인터 매개변수 사용하기', type: '페이지' },
                    { id: '65.3', title: '구조체 반환하기', type: '페이지' },
                    { id: '65.4', title: '퀴즈', type: '퀴즈' },
                    { id: '65.5', title: '연습문제: 구조체 매개변수 사용하기', type: '페이지' },
                    { id: '65.6', title: '심사문제: 학생 성적 평균 구하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u66', unitNumber: 66, title: '재귀호출 사용하기',
                pages: [
                    { id: '66.0', title: '재귀호출 사용하기', type: '페이지' },
                    { id: '66.1', title: '재귀호출로 Hello, world! 출력하기', type: '페이지' },
                    { id: '66.2', title: '재귀호출로 팩토리얼 구하기', type: '페이지' },
                    { id: '66.3', title: '재귀호출로 피보나치 수 구하기', type: '페이지' },
                    { id: '66.4', title: '하노이의 탑', type: '페이지' },
                    { id: '66.5', title: '퀴즈', type: '퀴즈' },
                    { id: '66.6', title: '연습문제: 재귀호출로 합계 구하기', type: '페이지' },
                    { id: '66.7', title: '심사문제: 재귀호출로 거듭제곱 구하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u67', unitNumber: 67, title: '함수 포인터 사용하기',
                pages: [
                    { id: '67.1', title: '함수 포인터 만들기', type: '페이지' },
                    { id: '67.2', title: '함수 포인터를 배열에 넣기', type: '페이지' },
                    { id: '67.3', title: '함수 포인터를 매개변수로 사용하기', type: '페이지' },
                    { id: '67.4', title: '퀴즈', type: '퀴즈' },
                    { id: '67.5', title: '연습문제: 함수 포인터 사용하기', type: '페이지' },
                    { id: '67.6', title: '심사문제: 함수 포인터 배열로 계산기 만들기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u68', unitNumber: 68, title: '함수에서 가변 인자 사용하기',
                pages: [
                    { id: '68.1', title: '가변 인자 함수 만들기', type: '페이지' },
                    { id: '68.2', title: 'va_list, va_start, va_arg, va_end 사용하기', type: '페이지' },
                    { id: '68.3', title: '자료형이 다른 가변 인자 함수 만들기', type: '페이지' },
                    { id: '68.4', title: '퀴즈', type: '퀴즈' },
                    { id: '68.5', title: '연습문제: 가변 인자 함수 만들기', type: '페이지' },
                    { id: '68.6', title: '심사문제: 가변 인자로 합계 구하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u69', unitNumber: 69, title: '함수에서 변수의 범위 알아보기',
                pages: [
                    { id: '69.1', title: '지역 변수 사용하기', type: '페이지' },
                    { id: '69.2', title: '전역 변수 사용하기', type: '페이지' },
                    { id: '69.3', title: '정적 변수 사용하기', type: '페이지' },
                    { id: '69.4', title: 'extern으로 다른 파일의 변수 사용하기', type: '페이지' },
                    { id: '69.5', title: '퀴즈', type: '퀴즈' },
                    { id: '69.6', title: '연습문제: 정적 변수 사용하기', type: '페이지' },
                    { id: '69.7', title: '심사문제: 호출 횟수 세기', type: '퀴즈' },
                    { id: '69.8', title: '핵심 정리', type: '핵심정리' },
                    { id: '69.9', title: 'Q & A', type: 'QnA' },
                ],
            },
        ],
    },
];
