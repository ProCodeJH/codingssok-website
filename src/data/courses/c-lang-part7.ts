import { Chapter } from './types';

/** C언어 Part 7 — CH10: 구조체/공용체/열거형 (U48-59) */
export const C_LANG_PART7: Chapter[] = [
    {
        id: 'c-ch10', chapterNumber: 10, title: '구조체 & 공용체 & 열거형', icon: '🏗️',
        description: '구조체, 구조체 포인터, 멤버 정렬, 구조체 배열, 공용체, 열거형',
        units: [
            {
                id: 'c-u48', unitNumber: 48, title: '구조체 사용하기',
                pages: [
                    { id: '48.0', title: '구조체 사용하기', type: '페이지' },
                    { id: '48.1', title: '구조체를 만들고 사용하기', type: '페이지' },
                    { id: '48.2', title: 'typedef로 구조체의 별칭을 정의하기', type: '페이지' },
                    { id: '48.3', title: '익명 구조체 사용하기', type: '페이지' },
                    { id: '48.4', title: '구조체를 초기화하기', type: '페이지' },
                    { id: '48.5', title: '퀴즈', type: '퀴즈' },
                    { id: '48.6', title: '연습문제: 구조체 만들기', type: '페이지' },
                    { id: '48.7', title: '심사문제: 직사각형 넓이 구하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u49', unitNumber: 49, title: '구조체 포인터 사용하기',
                pages: [
                    { id: '49.0', title: '구조체 포인터 사용하기', type: '페이지' },
                    { id: '49.1', title: '구조체 포인터를 선언하고 메모리 할당하기', type: '페이지' },
                    { id: '49.2', title: '구조체의 멤버에 접근하기', type: '페이지' },
                    { id: '49.3', title: '구조체 변수의 주소 구하기', type: '페이지' },
                    { id: '49.4', title: '퀴즈', type: '퀴즈' },
                    { id: '49.5', title: '연습문제: 구조체 포인터 사용하기', type: '페이지' },
                    { id: '49.6', title: '심사문제: 학생 정보 출력하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u50', unitNumber: 50, title: '두 점 사이의 거리 구하기',
                pages: [
                    { id: '50.1', title: '구조체로 점 표현하기', type: '페이지' },
                    { id: '50.2', title: '두 점 사이의 거리 공식', type: '페이지' },
                    { id: '50.3', title: 'math.h 사용하기', type: '페이지' },
                    { id: '50.4', title: '퀴즈', type: '퀴즈' },
                    { id: '50.5', title: '연습문제: 두 점 사이의 거리 구하기', type: '페이지' },
                    { id: '50.6', title: '심사문제: 세 점 사이의 거리 구하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u51', unitNumber: 51, title: '구조체 멤버 정렬 사용하기',
                pages: [
                    { id: '51.1', title: '구조체 크기 알아보기', type: '페이지' },
                    { id: '51.2', title: '멤버 정렬(alignment) 알아보기', type: '페이지' },
                    { id: '51.3', title: '패딩(padding) 알아보기', type: '페이지' },
                    { id: '51.4', title: '#pragma pack으로 정렬 크기 바꾸기', type: '페이지' },
                    { id: '51.5', title: '퀴즈', type: '퀴즈' },
                    { id: '51.6', title: '연습문제: 구조체 크기 구하기', type: '페이지' },
                    { id: '51.7', title: '심사문제: 구조체 정렬 문제', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u52', unitNumber: 52, title: '구조체와 메모리 활용하기',
                pages: [
                    { id: '52.1', title: '구조체와 메모리를 할당하여 사용하기', type: '페이지' },
                    { id: '52.2', title: '구조체 포인터에 메모리를 할당하고 멤버에 접근하기', type: '페이지' },
                    { id: '52.3', title: '메모리를 할당하고 구조체 배열처럼 사용하기', type: '페이지' },
                    { id: '52.4', title: '구조체 안에서 구조체 멤버 사용하기', type: '페이지' },
                    { id: '52.5', title: '퀴즈', type: '퀴즈' },
                    { id: '52.6', title: '연습문제: 구조체와 메모리 활용하기', type: '페이지' },
                    { id: '52.7', title: '심사문제: 좌표 배열 출력하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u53', unitNumber: 53, title: '구조체 배열 사용하기',
                pages: [
                    { id: '53.1', title: '구조체 배열 선언하기', type: '페이지' },
                    { id: '53.2', title: '구조체 배열 초기화하기', type: '페이지' },
                    { id: '53.3', title: '반복문으로 구조체 배열 접근하기', type: '페이지' },
                    { id: '53.4', title: '퀴즈', type: '퀴즈' },
                    { id: '53.5', title: '연습문제: 학생 정보 배열 출력하기', type: '페이지' },
                    { id: '53.6', title: '심사문제: 구조체 배열에서 최댓값 찾기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u54', unitNumber: 54, title: '구조체에서 비트 필드 사용하기',
                pages: [
                    { id: '54.1', title: '비트 필드 사용하기', type: '페이지' },
                    { id: '54.2', title: '비트 필드 크기 알아보기', type: '페이지' },
                    { id: '54.3', title: '비트 필드로 플래그 구현하기', type: '페이지' },
                    { id: '54.4', title: '퀴즈', type: '퀴즈' },
                    { id: '54.5', title: '연습문제: 비트 필드 사용하기', type: '페이지' },
                    { id: '54.6', title: '심사문제: 비트 필드로 디바이스 상태 관리하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u55', unitNumber: 55, title: '공용체 사용하기',
                pages: [
                    { id: '55.0', title: '공용체 사용하기', type: '페이지' },
                    { id: '55.1', title: '공용체 만들기', type: '페이지' },
                    { id: '55.2', title: '공용체의 크기 알아보기', type: '페이지' },
                    { id: '55.3', title: '공용체와 엔디언', type: '페이지' },
                    { id: '55.4', title: '퀴즈', type: '퀴즈' },
                    { id: '55.5', title: '연습문제: 공용체 사용하기', type: '페이지' },
                    { id: '55.6', title: '심사문제: IP 주소를 정수로 변환하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u56', unitNumber: 56, title: '공용체와 포인터 / 공용체 배열 사용하기',
                pages: [
                    { id: '56.1', title: '공용체 포인터와 메모리 할당하기', type: '페이지' },
                    { id: '56.2', title: '공용체 배열 사용하기', type: '페이지' },
                    { id: '56.3', title: '공용체를 구조체에 넣어서 사용하기', type: '페이지' },
                    { id: '56.4', title: '퀴즈', type: '퀴즈' },
                    { id: '56.5', title: '연습문제: 공용체와 구조체 활용하기', type: '페이지' },
                    { id: '56.6', title: '심사문제: 공용체 배열 활용하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u57', unitNumber: 57, title: '열거형 사용하기',
                pages: [
                    { id: '57.0', title: '열거형 사용하기', type: '페이지' },
                    { id: '57.1', title: '열거형 정의하기', type: '페이지' },
                    { id: '57.2', title: '열거형을 switch에 활용하기', type: '페이지' },
                    { id: '57.3', title: '열거형에 값 지정하기', type: '페이지' },
                    { id: '57.4', title: '열거형을 for에 활용하기', type: '페이지' },
                    { id: '57.5', title: 'typedef로 열거형의 별칭 만들기', type: '페이지' },
                    { id: '57.6', title: '퀴즈', type: '퀴즈' },
                    { id: '57.7', title: '연습문제: 열거형 사용하기', type: '페이지' },
                    { id: '57.8', title: '심사문제: 계절 출력하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u58', unitNumber: 58, title: '자료형 변환 심화',
                pages: [
                    { id: '58.1', title: '다양한 자료형 변환하기', type: '페이지' },
                    { id: '58.2', title: '포인터의 자료형 변환하기', type: '페이지' },
                    { id: '58.3', title: 'void 포인터 활용하기', type: '페이지' },
                    { id: '58.4', title: '퀴즈', type: '퀴즈' },
                    { id: '58.5', title: '연습문제: 자료형 변환하기', type: '페이지' },
                    { id: '58.6', title: '심사문제: 포인터 자료형 변환하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u59', unitNumber: 59, title: '포인터 연산 사용하기',
                pages: [
                    { id: '59.1', title: '포인터 덧셈, 뺄셈', type: '페이지' },
                    { id: '59.2', title: '포인터 간 뺄셈', type: '페이지' },
                    { id: '59.3', title: 'void 포인터 연산하기', type: '페이지' },
                    { id: '59.4', title: '구조체 포인터 연산하기', type: '페이지' },
                    { id: '59.5', title: '퀴즈', type: '퀴즈' },
                    { id: '59.6', title: '연습문제: 포인터 연산하기', type: '페이지' },
                    { id: '59.7', title: '심사문제: 포인터 연산으로 배열 요소 접근하기', type: '퀴즈' },
                    { id: '59.8', title: '핵심 정리', type: '핵심정리' },
                    { id: '59.9', title: 'Q & A', type: 'QnA' },
                ],
            },
        ],
    },
];
