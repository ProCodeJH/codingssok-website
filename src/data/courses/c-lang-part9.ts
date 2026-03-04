import { Chapter } from './types';

/** C언어 Part 9 — CH12: 파일/정렬/연결리스트 (U70-74) */
export const C_LANG_PART9: Chapter[] = [
    {
        id: 'c-ch12', chapterNumber: 12, title: '파일 & 정렬 & 연결리스트', icon: '📂',
        description: '파일 처리, 버블/선택/삽입 정렬, 연결리스트',
        units: [
            {
                id: 'c-u70', unitNumber: 70, title: '파일에서 문자열 읽고 쓰기',
                pages: [
                    { id: '70.0', title: '파일에서 문자열 읽고 쓰기', type: '페이지' },
                    { id: '70.1', title: '서식을 지정하여 파일에 문자열 쓰기', type: '페이지' },
                    { id: '70.2', title: '서식을 지정하여 파일에서 문자열 읽기', type: '페이지' },
                    { id: '70.3', title: '파일에 문자열 쓰기', type: '페이지' },
                    { id: '70.4', title: '파일에서 문자열 읽기', type: '페이지' },
                    { id: '70.5', title: '퀴즈', type: '퀴즈' },
                    { id: '70.6', title: '연습문제: 수열을 파일에 쓰고 읽기', type: '페이지' },
                    { id: '70.7', title: '심사문제: CSV 파일 처리하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u71', unitNumber: 71, title: '파일에서 구조체 읽고 쓰기',
                pages: [
                    { id: '71.1', title: '구조체를 파일에 쓰기', type: '페이지' },
                    { id: '71.2', title: '구조체를 파일에서 읽기', type: '페이지' },
                    { id: '71.3', title: '파일 포인터 이동하기', type: '페이지' },
                    { id: '71.4', title: '바이너리 모드로 읽고 쓰기', type: '페이지' },
                    { id: '71.5', title: '퀴즈', type: '퀴즈' },
                    { id: '71.6', title: '연습문제: 학생 정보 파일에 저장하기', type: '페이지' },
                    { id: '71.7', title: '심사문제: 구조체 배열을 파일에 저장하고 읽기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u72', unitNumber: 72, title: '버블 정렬과 선택 정렬',
                pages: [
                    { id: '72.0', title: '버블 정렬과 선택 정렬', type: '페이지' },
                    { id: '72.1', title: '버블 정렬 구현하기', type: '페이지' },
                    { id: '72.2', title: '선택 정렬 구현하기', type: '페이지' },
                    { id: '72.3', title: '정렬 함수 qsort 사용하기', type: '페이지' },
                    { id: '72.4', title: '퀴즈', type: '퀴즈' },
                    { id: '72.5', title: '연습문제: 버블 정렬과 선택 정렬 구현하기', type: '페이지' },
                    { id: '72.6', title: '심사문제: 내림차순 정렬하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u73', unitNumber: 73, title: '삽입 정렬',
                pages: [
                    { id: '73.1', title: '삽입 정렬 구현하기', type: '페이지' },
                    { id: '73.2', title: '정렬 알고리즘 비교하기', type: '페이지' },
                    { id: '73.3', title: '시간 복잡도 알아보기', type: '페이지' },
                    { id: '73.4', title: '퀴즈', type: '퀴즈' },
                    { id: '73.5', title: '연습문제: 삽입 정렬 구현하기', type: '페이지' },
                    { id: '73.6', title: '심사문제: 문자열 배열 정렬하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u74', unitNumber: 74, title: '연결 리스트 사용하기',
                pages: [
                    { id: '74.0', title: '연결 리스트 사용하기', type: '페이지' },
                    { id: '74.1', title: '노드 만들기', type: '페이지' },
                    { id: '74.2', title: '노드 추가하기', type: '페이지' },
                    { id: '74.3', title: '노드 삭제하기', type: '페이지' },
                    { id: '74.4', title: '노드 검색하기', type: '페이지' },
                    { id: '74.5', title: '이중 연결 리스트 만들기', type: '페이지' },
                    { id: '74.6', title: '퀴즈', type: '퀴즈' },
                    { id: '74.7', title: '연습문제: 연결 리스트 구현하기', type: '페이지' },
                    { id: '74.8', title: '심사문제: 연결 리스트에서 특정 노드 삭제하기', type: '퀴즈' },
                    { id: '74.9', title: '핵심 정리', type: '핵심정리' },
                    { id: '74.10', title: 'Q & A', type: 'QnA' },
                ],
            },
        ],
    },
];
