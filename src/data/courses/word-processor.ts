import { Chapter } from './types';

/** 워드프로세서 필기 챕터 */
export const WORD_PROCESSOR_CHAPTERS: Chapter[] = [
    {
        id: 'wp-ch01', chapterNumber: 1, title: '워드프로세싱 기본', icon: '📄',
        description: '워드프로세서 필기 1과목 - 워드프로세싱 용어 및 기능',
        units: [
            { id: 'wp-1', unitNumber: 1, title: '워드프로세서 개요', subtitle: '기본 개념', duration: '25분', type: '이론', difficulty: 1, content: '워드프로세서의 정의, 기능, 특징을 학습합니다.', quiz: { question: '워드프로세서의 주요 기능이 아닌 것은?', options: ['문서 작성', '데이터베이스 관리', '편집 및 교정', '인쇄'], answer: 1, explanation: '데이터베이스 관리는 DBMS의 기능이며 워드프로세서의 주요 기능이 아닙니다.' }, problems: [], problemCount: 10 },
            { id: 'wp-2', unitNumber: 2, title: '문서 편집 기능', subtitle: '편집 실무', duration: '30분', type: '이론', difficulty: 1, content: '복사, 이동, 삭제, 찾기/바꾸기 등 편집 기능을 학습합니다.', quiz: { question: '다른 이름으로 저장의 단축키는?', options: ['Ctrl+S', 'F12', 'Ctrl+O', 'Ctrl+N'], answer: 1, explanation: 'F12는 다른 이름으로 저장 기능의 단축키입니다.' }, problems: [], problemCount: 10 },
        ],
    },
    {
        id: 'wp-ch02', chapterNumber: 2, title: '전자출판 개요', icon: '🖨️',
        description: '전자출판의 개념과 실무',
        units: [
            { id: 'wp-3', unitNumber: 3, title: '전자출판 기초', subtitle: '출판 용어', duration: '30분', type: '이론', difficulty: 1, content: '전자출판의 개념, 용어, 프로세스를 학습합니다.', quiz: { question: 'DTP는 무엇의 약자인가요?', options: ['Digital Transfer Protocol', 'Desktop Publishing', 'Data Text Processing', 'Document Type Protocol'], answer: 1, explanation: 'DTP(Desktop Publishing)는 탁상출판으로, 컴퓨터를 이용한 출판을 의미합니다.' }, problems: [], problemCount: 10 },
            { id: 'wp-4', unitNumber: 4, title: '문서 서식과 레이아웃', subtitle: '서식 설정', duration: '30분', type: '이론', difficulty: 2, content: '글꼴, 단락, 페이지 설정 등 서식 관련 내용을 학습합니다.', quiz: { question: '커닝(Kerning)이란?', options: ['줄 간격 조절', '글자 간격 미세 조절', '단락 들여쓰기', '페이지 여백'], answer: 1, explanation: '커닝은 특정 글자 쌍 사이의 간격을 미세하게 조절하는 것입니다.' }, problems: [], problemCount: 10 },
        ],
    },
    {
        id: 'wp-ch03', chapterNumber: 3, title: '컴퓨터 일반', icon: '🖥️',
        description: '컴퓨터 기초 및 운영체제',
        units: [
            { id: 'wp-5', unitNumber: 5, title: '컴퓨터 구조', subtitle: 'HW/SW 기초', duration: '35분', type: '이론', difficulty: 1, content: '컴퓨터의 하드웨어, 소프트웨어 구조를 학습합니다.', quiz: { question: 'RAM의 특징은?', options: ['비휘발성', '휘발성', '읽기 전용', '영구 저장'], answer: 1, explanation: 'RAM은 전원이 꺼지면 데이터가 사라지는 휘발성 메모리입니다.' }, problems: [], problemCount: 10 },
            { id: 'wp-6', unitNumber: 6, title: '운영체제와 네트워크', subtitle: 'OS/네트워크', duration: '35분', type: '이론', difficulty: 2, content: '운영체제 기능과 네트워크 기초를 학습합니다.', quiz: { question: 'IP 주소의 형식은?', options: ['숫자 4묶음 (예: 192.168.1.1)', '영문 주소', '전화번호', 'MAC 주소'], answer: 0, explanation: 'IPv4 주소는 점으로 구분된 4개의 숫자(0~255) 묶음입니다.' }, problems: [], problemCount: 10 },
        ],
    },
    {
        id: 'wp-ch04', chapterNumber: 4, title: '실전 모의고사', icon: '📋',
        description: '워드프로세서 필기 실전 모의고사',
        units: [
            { id: 'wp-7', unitNumber: 7, title: '모의고사 1회', subtitle: '70문항 실전', duration: '60분', type: '종합', difficulty: 2, content: '워드프로세서 필기 형식의 70문항 모의고사를 풀어봅니다.', quiz: { question: '워드프로세서 필기 시험의 합격 기준은?', options: ['60점 이상', '70점 이상', '80점 이상', '90점 이상'], answer: 0, explanation: '워드프로세서 필기 시험은 60점(100점 만점) 이상이면 합격입니다.' }, problems: [], problemCount: 70 },
        ],
    },
];
