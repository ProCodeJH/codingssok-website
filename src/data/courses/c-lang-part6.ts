import { Chapter } from './types';

/** C언어 Part 6 — CH9: 문자열 (U39-47) */
export const C_LANG_PART6: Chapter[] = [
    {
        id: 'c-ch09', chapterNumber: 9, title: '문자열', icon: '📝',
        description: '문자열 사용, 입력, 길이, 비교, 복사, 붙이기, 만들기, 변환, 배열',
        units: [
            {
                id: 'c-u39', unitNumber: 39, title: '문자열 사용하기',
                pages: [
                    { id: '39.0', title: '문자열 사용하기', type: '페이지' },
                    { id: '39.1', title: '문자 배열에 문자열 저장하기', type: '페이지' },
                    { id: '39.2', title: '포인터에 문자열 저장하기', type: '페이지' },
                    { id: '39.3', title: '배열 형태의 문자열과 포인터 형태의 문자열', type: '페이지' },
                    { id: '39.4', title: '퀴즈', type: '퀴즈' },
                    { id: '39.5', title: '연습문제: 문자열 저장하기', type: '페이지' },
                    { id: '39.6', title: '심사문제: 문자열 요소 출력하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u40', unitNumber: 40, title: '입력 값을 문자열에 저장하기',
                pages: [
                    { id: '40.1', title: 'scanf로 문자열 입력받기', type: '페이지' },
                    { id: '40.2', title: '입력받은 문자열을 포인터에 저장하기', type: '페이지' },
                    { id: '40.3', title: '공백까지 포함하여 입력받기', type: '페이지' },
                    { id: '40.4', title: '문자열 길이 구하기', type: '페이지' },
                    { id: '40.5', title: '퀴즈', type: '퀴즈' },
                    { id: '40.6', title: '연습문제: 문자열 입력받기', type: '페이지' },
                    { id: '40.7', title: '심사문제: 문자열 길이 구하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u41', unitNumber: 41, title: '문자열 비교하기',
                pages: [
                    { id: '41.1', title: 'strcmp로 문자열 비교하기', type: '페이지' },
                    { id: '41.2', title: '대소문자를 무시하고 비교하기', type: '페이지' },
                    { id: '41.3', title: '퀴즈', type: '퀴즈' },
                    { id: '41.4', title: '연습문제: 문자열 비교하기', type: '페이지' },
                    { id: '41.5', title: '심사문제: 문자열 비교하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u42', unitNumber: 42, title: '문자열 복사하기',
                pages: [
                    { id: '42.1', title: 'strcpy로 문자열 복사하기', type: '페이지' },
                    { id: '42.2', title: '메모리에 문자열 복사하기', type: '페이지' },
                    { id: '42.3', title: '퀴즈', type: '퀴즈' },
                    { id: '42.4', title: '연습문제: 문자열 복사하기', type: '페이지' },
                    { id: '42.5', title: '심사문제: 문자열 복사하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u43', unitNumber: 43, title: '문자열 붙이기',
                pages: [
                    { id: '43.1', title: 'strcat으로 문자열 붙이기', type: '페이지' },
                    { id: '43.2', title: '메모리에 문자열 붙이기', type: '페이지' },
                    { id: '43.3', title: '퀴즈', type: '퀴즈' },
                    { id: '43.4', title: '연습문제: 문자열 붙이기', type: '페이지' },
                    { id: '43.5', title: '심사문제: 문자열 붙이기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u44', unitNumber: 44, title: '문자열 만들기',
                pages: [
                    { id: '44.1', title: 'sprintf로 문자열 만들기', type: '페이지' },
                    { id: '44.2', title: '메모리에 문자열 만들기', type: '페이지' },
                    { id: '44.3', title: '퀴즈', type: '퀴즈' },
                    { id: '44.4', title: '연습문제: 문자열 만들기', type: '페이지' },
                    { id: '44.5', title: '심사문제: 문자열 만들기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u45', unitNumber: 45, title: '문자열 검색하기',
                pages: [
                    { id: '45.1', title: 'strchr로 문자 검색하기', type: '페이지' },
                    { id: '45.2', title: 'strstr로 문자열 검색하기', type: '페이지' },
                    { id: '45.3', title: '퀴즈', type: '퀴즈' },
                    { id: '45.4', title: '연습문제: 문자열 검색하기', type: '페이지' },
                    { id: '45.5', title: '심사문제: 문자열에서 문자 존재 여부 확인하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u46', unitNumber: 46, title: '문자열 자르기 / 숫자 ↔ 문자열 변환하기',
                pages: [
                    { id: '46.1', title: 'strtok으로 문자열 자르기', type: '페이지' },
                    { id: '46.2', title: '문자열을 정수/실수로 변환하기', type: '페이지' },
                    { id: '46.3', title: '정수/실수를 문자열로 변환하기', type: '페이지' },
                    { id: '46.4', title: '퀴즈', type: '퀴즈' },
                    { id: '46.5', title: '연습문제: 문자열 자르기 및 숫자 변환하기', type: '페이지' },
                    { id: '46.6', title: '심사문제: 날짜 문자열에서 연, 월, 일 추출하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u47', unitNumber: 47, title: '문자열과 배열 응용하기',
                pages: [
                    { id: '47.1', title: '문자열 배열 사용하기', type: '페이지' },
                    { id: '47.2', title: '입력 값을 문자열 배열에 저장하기', type: '페이지' },
                    { id: '47.3', title: '문자열 정렬하기', type: '페이지' },
                    { id: '47.4', title: '회문(palindrome) 확인하기', type: '페이지' },
                    { id: '47.5', title: '퀴즈', type: '퀴즈' },
                    { id: '47.6', title: '연습문제: 문자열 배열과 정렬', type: '페이지' },
                    { id: '47.7', title: '심사문제: 회문 판별하기', type: '퀴즈' },
                    { id: '47.8', title: '핵심 정리', type: '핵심정리' },
                    { id: '47.9', title: 'Q & A', type: 'QnA' },
                ],
            },
        ],
    },
];
