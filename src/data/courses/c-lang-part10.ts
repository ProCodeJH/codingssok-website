import { Chapter } from './types';

/** C언어 Part 10 — CH13: 전처리기/헤더/실전 (U75-85) */
export const C_LANG_PART10: Chapter[] = [
    {
        id: 'c-ch13', chapterNumber: 13, title: '전처리기 & 헤더 & 실전', icon: '🛠️',
        description: '전처리기, 매크로, 헤더 파일, 실전 프로젝트, 코딩 도장 총정리',
        units: [
            {
                id: 'c-u75', unitNumber: 75, title: '매크로 사용하기',
                pages: [
                    { id: '75.0', title: '매크로 사용하기', type: '페이지' },
                    { id: '75.1', title: '#define으로 매크로 정의하기', type: '페이지' },
                    { id: '75.2', title: '매크로 함수 만들기', type: '페이지' },
                    { id: '75.3', title: '여러 줄 매크로 만들기', type: '페이지' },
                    { id: '75.4', title: '#과 ## 사용하기', type: '페이지' },
                    { id: '75.5', title: '퀴즈', type: '퀴즈' },
                    { id: '75.6', title: '연습문제: 매크로 함수 만들기', type: '페이지' },
                    { id: '75.7', title: '심사문제: 최댓값 매크로 만들기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u76', unitNumber: 76, title: '조건부 컴파일 사용하기',
                pages: [
                    { id: '76.1', title: '#if, #endif 사용하기', type: '페이지' },
                    { id: '76.2', title: '#ifdef, #ifndef 사용하기', type: '페이지' },
                    { id: '76.3', title: '#if defined 사용하기', type: '페이지' },
                    { id: '76.4', title: '조건부 컴파일과 디버깅', type: '페이지' },
                    { id: '76.5', title: '퀴즈', type: '퀴즈' },
                    { id: '76.6', title: '연습문제: 조건부 컴파일 사용하기', type: '페이지' },
                    { id: '76.7', title: '심사문제: 플랫폼별 코드 분리하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u77', unitNumber: 77, title: '헤더 파일 만들기',
                pages: [
                    { id: '77.1', title: '헤더 파일과 소스 파일 분리하기', type: '페이지' },
                    { id: '77.2', title: '헤더 가드 사용하기', type: '페이지' },
                    { id: '77.3', title: '#pragma once 사용하기', type: '페이지' },
                    { id: '77.4', title: '여러 소스 파일 사용하기', type: '페이지' },
                    { id: '77.5', title: '퀴즈', type: '퀴즈' },
                    { id: '77.6', title: '연습문제: 헤더 파일 만들기', type: '페이지' },
                    { id: '77.7', title: '심사문제: 함수 라이브러리 만들기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u78', unitNumber: 78, title: '미리 정의된 매크로 사용하기',
                pages: [
                    { id: '78.1', title: '__DATE__, __TIME__ 사용하기', type: '페이지' },
                    { id: '78.2', title: '__FILE__, __LINE__ 사용하기', type: '페이지' },
                    { id: '78.3', title: '__FUNCTION__ 사용하기', type: '페이지' },
                    { id: '78.4', title: '컴파일러 전용 매크로', type: '페이지' },
                    { id: '78.5', title: '퀴즈', type: '퀴즈' },
                    { id: '78.6', title: '연습문제: 미리 정의된 매크로 활용하기', type: '페이지' },
                    { id: '78.7', title: '심사문제: 디버그 로그 매크로 만들기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u79', unitNumber: 79, title: 'typedef 사용하기',
                pages: [
                    { id: '79.1', title: 'typedef로 별칭 만들기', type: '페이지' },
                    { id: '79.2', title: '함수 포인터에 typedef 사용하기', type: '페이지' },
                    { id: '79.3', title: '구조체에 typedef 사용하기', type: '페이지' },
                    { id: '79.4', title: '퀴즈', type: '퀴즈' },
                    { id: '79.5', title: '연습문제: typedef 활용하기', type: '페이지' },
                    { id: '79.6', title: '심사문제: 콜백 함수 typedef 만들기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u80', unitNumber: 80, title: '메모리 관리 함수 심화',
                pages: [
                    { id: '80.1', title: 'calloc 사용하기', type: '페이지' },
                    { id: '80.2', title: 'realloc으로 메모리 크기 변경하기', type: '페이지' },
                    { id: '80.3', title: 'memcpy, memmove 사용하기', type: '페이지' },
                    { id: '80.4', title: 'memcmp, memset 사용하기', type: '페이지' },
                    { id: '80.5', title: '메모리 누수(leak) 방지하기', type: '페이지' },
                    { id: '80.6', title: '퀴즈', type: '퀴즈' },
                    { id: '80.7', title: '연습문제: 동적 배열 크기 변경하기', type: '페이지' },
                    { id: '80.8', title: '심사문제: 안전한 메모리 관리 함수 만들기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u81', unitNumber: 81, title: '명령줄 인수 사용하기',
                pages: [
                    { id: '81.1', title: 'argc, argv 사용하기', type: '페이지' },
                    { id: '81.2', title: '명령줄 인수를 숫자로 변환하기', type: '페이지' },
                    { id: '81.3', title: '옵션 처리하기', type: '페이지' },
                    { id: '81.4', title: '퀴즈', type: '퀴즈' },
                    { id: '81.5', title: '연습문제: 명령줄 계산기 만들기', type: '페이지' },
                    { id: '81.6', title: '심사문제: 파일 처리 CLI 도구 만들기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u82', unitNumber: 82, title: '실전: 학생 성적 관리 프로그램',
                pages: [
                    { id: '82.1', title: '프로그램 설계하기', type: '페이지' },
                    { id: '82.2', title: '학생 구조체 정의하기', type: '페이지' },
                    { id: '82.3', title: '학생 추가 및 삭제 기능', type: '페이지' },
                    { id: '82.4', title: '성적 통계 기능', type: '페이지' },
                    { id: '82.5', title: '파일 저장 및 불러오기', type: '페이지' },
                    { id: '82.6', title: '메뉴 시스템 만들기', type: '페이지' },
                    { id: '82.7', title: '퀴즈', type: '퀴즈' },
                    { id: '82.8', title: '심사문제: 프로그램 확장하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u83', unitNumber: 83, title: '실전: 텍스트 기반 게임 만들기',
                pages: [
                    { id: '83.1', title: '게임 설계하기', type: '페이지' },
                    { id: '83.2', title: '맵 데이터 구조체 만들기', type: '페이지' },
                    { id: '83.3', title: '플레이어 이동 구현하기', type: '페이지' },
                    { id: '83.4', title: '아이템 시스템 구현하기', type: '페이지' },
                    { id: '83.5', title: '전투 시스템 구현하기', type: '페이지' },
                    { id: '83.6', title: '퀴즈', type: '퀴즈' },
                    { id: '83.7', title: '심사문제: 게임 기능 확장하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u84', unitNumber: 84, title: '실전: 간단한 데이터베이스 만들기',
                pages: [
                    { id: '84.1', title: '데이터베이스 설계하기', type: '페이지' },
                    { id: '84.2', title: '레코드 구조체 만들기', type: '페이지' },
                    { id: '84.3', title: 'CRUD(생성/읽기/수정/삭제) 구현하기', type: '페이지' },
                    { id: '84.4', title: '검색 기능 구현하기', type: '페이지' },
                    { id: '84.5', title: '파일로 데이터 영속화하기', type: '페이지' },
                    { id: '84.6', title: '퀴즈', type: '퀴즈' },
                    { id: '84.7', title: '심사문제: 인덱스 기능 추가하기', type: '퀴즈' },
                ],
            },
            {
                id: 'c-u85', unitNumber: 85, title: 'C언어 코딩 도장 총정리',
                pages: [
                    { id: '85.1', title: 'C언어 핵심 개념 요약', type: '핵심정리' },
                    { id: '85.2', title: '자료형과 변수 정리', type: '핵심정리' },
                    { id: '85.3', title: '제어문 정리', type: '핵심정리' },
                    { id: '85.4', title: '포인터와 메모리 정리', type: '핵심정리' },
                    { id: '85.5', title: '문자열 함수 정리', type: '핵심정리' },
                    { id: '85.6', title: '구조체와 함수 정리', type: '핵심정리' },
                    { id: '85.7', title: '전처리기와 파일 정리', type: '핵심정리' },
                    { id: '85.8', title: '코딩 테스트 대비 문제', type: '퀴즈' },
                    { id: '85.9', title: '종합 퀴즈', type: '퀴즈' },
                    { id: '85.10', title: '다음 단계 학습 안내', type: '페이지' },
                ],
            },
        ],
    },
];
