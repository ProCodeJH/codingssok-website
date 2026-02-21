import { Chapter } from './types';

/** 파이썬 기초 챕터 (5챕터, 20유닛) */
export const PYTHON_CHAPTERS: Chapter[] = [
    {
        id: 'py-ch01', chapterNumber: 1, title: '파이썬 소개', icon: '🐍',
        description: '파이썬 설치, 첫 프로그램, 기본 문법',
        units: [
            { id: 'py-u01', unitNumber: 1, title: '파이썬이란?', subtitle: '소개 · 특징 · 활용', duration: '15분', type: '이론', difficulty: 1, content: '파이썬은 쉽고 강력한 프로그래밍 언어입니다. 웹, AI, 데이터 분석 등 다양한 분야에 사용됩니다.', quiz: { question: '파이썬의 특징이 아닌 것은?', options: ['읽기 쉬운 문법', '인터프리터 언어', '수동 메모리 관리 필수', '풍부한 라이브러리'], answer: 2, explanation: '파이썬은 자동 메모리 관리(가비지 컬렉션)를 제공합니다.' }, problems: [], problemCount: 5 },
            { id: 'py-u02', unitNumber: 2, title: 'print와 입력', subtitle: 'print · input · f-string', duration: '25분', type: '실습', difficulty: 1, content: 'print()로 출력하고 input()으로 입력받습니다. f-string으로 편리한 문자열 포맷팅.', quiz: { question: "f'이름: {name}'에서 {name}에 들어가는 것은?", options: ['문자 그대로', '변수 name의 값', '에러', '없음'], answer: 1, explanation: 'f-string에서 {}안의 변수는 자동으로 값이 채워집니다.' }, problems: [], problemCount: 10 },
            { id: 'py-u03', unitNumber: 3, title: '변수와 자료형', subtitle: 'int · float · str · bool', duration: '30분', type: '이론', difficulty: 1, content: '파이썬은 변수 타입을 자동으로 판단합니다. type()으로 자료형을 확인합니다.', quiz: { question: 'x = 3.14 일 때 type(x)의 결과는?', options: ['int', 'float', 'str', 'double'], answer: 1, explanation: '소수점이 있는 숫자는 float 타입입니다.' }, problems: [], problemCount: 12 },
            { id: 'py-u04', unitNumber: 4, title: '연산자', subtitle: '산술 · 비교 · 논리', duration: '25분', type: '이론', difficulty: 1, content: '파이썬의 산술(+,-,*,/,//,%,**), 비교(==,!=,<,>), 논리(and,or,not) 연산자.', quiz: { question: '7 // 2의 결과는?', options: ['3.5', '3', '4', '1'], answer: 1, explanation: '//는 정수 나눗셈(바닥 나눗셈)으로 소수점을 버립니다. 7//2=3' }, problems: [], problemCount: 10 },
        ],
    },
    {
        id: 'py-ch02', chapterNumber: 2, title: '조건문과 반복문', icon: '🔄',
        description: 'if, for, while, 리스트 컴프리헨션',
        units: [
            { id: 'py-u05', unitNumber: 5, title: 'if 조건문', subtitle: 'if · elif · else', duration: '30분', type: '이론', difficulty: 1, content: '파이썬 조건문은 들여쓰기(indentation)로 블록을 구분합니다.', quiz: { question: '파이썬에서 블록을 구분하는 방법은?', options: ['중괄호 {}', '들여쓰기(indentation)', '세미콜론', 'begin/end'], answer: 1, explanation: '파이썬은 들여쓰기(보통 4칸 스페이스)로 코드 블록을 구분합니다.' }, problems: [], problemCount: 12 },
            { id: 'py-u06', unitNumber: 6, title: 'for 반복문', subtitle: 'range · enumerate · zip', duration: '35분', type: '실습', difficulty: 2, content: 'for문으로 리스트, range, 문자열 등을 순회합니다.', quiz: { question: 'range(1, 6)이 생성하는 수는?', options: ['1~6', '1~5', '0~5', '0~6'], answer: 1, explanation: 'range(1,6)은 1부터 5까지(6 미포함) 생성합니다.' }, problems: [], problemCount: 15 },
            { id: 'py-u07', unitNumber: 7, title: 'while 반복문', subtitle: '조건 반복 · break · continue', duration: '25분', type: '이론', difficulty: 2, content: 'while 조건이 참인 동안 반복. break/continue로 흐름 제어.', quiz: { question: 'while True에서 탈출하려면?', options: ['return', 'break', 'exit', 'stop'], answer: 1, explanation: 'break문으로 while 무한루프를 탈출합니다.' }, problems: [], problemCount: 10 },
            { id: 'py-u08', unitNumber: 8, title: '리스트 컴프리헨션', subtitle: '[x for x in ...]', duration: '30분', type: '실습', difficulty: 2, content: '리스트 컴프리헨션으로 간결하게 리스트를 생성합니다.', quiz: { question: '[x**2 for x in range(5)]의 결과는?', options: ['[0,1,4,9,16]', '[1,4,9,16,25]', '[0,2,4,6,8]', '[1,2,3,4,5]'], answer: 0, explanation: 'x=0,1,2,3,4에 대해 x²: [0,1,4,9,16]' }, problems: [], problemCount: 10 },
        ],
    },
    {
        id: 'py-ch03', chapterNumber: 3, title: '자료구조', icon: '📦',
        description: '리스트, 튜플, 딕셔너리, 세트',
        units: [
            { id: 'py-u09', unitNumber: 9, title: '리스트', subtitle: 'append · pop · sort · slice', duration: '40분', type: '이론', difficulty: 2, content: '리스트는 가변(mutable) 시퀀스입니다. 다양한 메서드로 데이터를 조작합니다.', quiz: { question: 'a=[1,2,3]; a.append(4) 후 a는?', options: ['[1,2,3]', '[4,1,2,3]', '[1,2,3,4]', '에러'], answer: 2, explanation: 'append는 리스트 끝에 요소를 추가합니다.' }, problems: [], problemCount: 18 },
            { id: 'py-u10', unitNumber: 10, title: '딕셔너리', subtitle: 'key:value · get · items', duration: '35분', type: '이론', difficulty: 2, content: '딕셔너리는 key-value 쌍으로 데이터를 저장합니다. {}로 생성.', quiz: { question: "d={'a':1,'b':2}; d['c']=3 후 len(d)는?", options: ['2', '3', '4', '에러'], answer: 1, explanation: '새 키를 할당하면 딕셔너리에 추가됩니다. 총 3개.' }, problems: [], problemCount: 15 },
            { id: 'py-u11', unitNumber: 11, title: '튜플과 세트', subtitle: '불변 시퀀스 · 집합 연산', duration: '30분', type: '이론', difficulty: 2, content: '튜플은 불변(immutable), 세트는 중복 없는 집합입니다.', quiz: { question: '세트 {1,2,3} | {3,4,5}의 결과는?', options: ['{3}', '{1,2,3,4,5}', '{1,2,4,5}', '에러'], answer: 1, explanation: '| 는 합집합 연산입니다. 중복 제거하여 {1,2,3,4,5}' }, problems: [], problemCount: 12 },
        ],
    },
    {
        id: 'py-ch04', chapterNumber: 4, title: '함수와 모듈', icon: '⚡',
        description: '함수 정의, 람다, 모듈, 패키지',
        units: [
            { id: 'py-u12', unitNumber: 12, title: '함수', subtitle: 'def · return · 기본값 · *args', duration: '40분', type: '이론', difficulty: 2, content: 'def로 함수를 정의합니다. 기본값 매개변수, 가변 인자를 사용합니다.', quiz: { question: 'def f(a, b=10): return a+b 에서 f(5)의 결과는?', options: ['5', '10', '15', '에러'], answer: 2, explanation: 'b에 기본값 10이 있으므로 f(5)=5+10=15' }, problems: [], problemCount: 15 },
            { id: 'py-u13', unitNumber: 13, title: '람다와 고차함수', subtitle: 'lambda · map · filter', duration: '30분', type: '이론', difficulty: 3, content: 'lambda는 이름 없는 함수. map, filter, sorted에서 자주 사용합니다.', quiz: { question: 'list(map(lambda x:x*2, [1,2,3]))의 결과는?', options: ['[1,2,3]', '[2,4,6]', '[1,4,9]', '에러'], answer: 1, explanation: 'lambda x:x*2를 각 요소에 적용: [2,4,6]' }, problems: [], problemCount: 12 },
            { id: 'py-u14', unitNumber: 14, title: '모듈과 패키지', subtitle: 'import · from · pip', duration: '25분', type: '이론', difficulty: 2, content: 'import로 외부 모듈을 사용합니다. pip install로 패키지를 설치합니다.', quiz: { question: 'import math 후 원주율을 사용하려면?', options: ['pi', 'math.pi', 'Math.PI', 'import pi'], answer: 1, explanation: 'import math를 하면 math.pi로 원주율에 접근합니다.' }, problems: [], problemCount: 8 },
        ],
    },
    {
        id: 'py-ch05', chapterNumber: 5, title: '파일과 예외', icon: '📁',
        description: '파일 입출력, 예외 처리, 클래스 기초',
        units: [
            { id: 'py-u15', unitNumber: 15, title: '파일 입출력', subtitle: 'open · read · write · with', duration: '30분', type: '이론', difficulty: 2, content: 'open()으로 파일을 열고 with문으로 안전하게 처리합니다.', quiz: { question: "'with open(f) as fp:' 의 장점은?", options: ['빠른 실행', '자동으로 파일을 닫아줌', '에러 무시', '파일 생성'], answer: 1, explanation: 'with문은 블록이 끝나면 자동으로 파일을 닫아 리소스 누수를 방지합니다.' }, problems: [], problemCount: 10 },
            { id: 'py-u16', unitNumber: 16, title: '예외 처리', subtitle: 'try · except · finally · raise', duration: '30분', type: '이론', difficulty: 2, content: 'try-except로 에러를 처리하여 프로그램 비정상 종료를 방지합니다.', quiz: { question: '0으로 나눌 때 발생하는 예외는?', options: ['ValueError', 'TypeError', 'ZeroDivisionError', 'IndexError'], answer: 2, explanation: '0으로 나누면 ZeroDivisionError가 발생합니다.' }, problems: [], problemCount: 10 },
            { id: 'py-u17', unitNumber: 17, title: '클래스 기초', subtitle: 'class · __init__ · self · 메서드', duration: '45분', type: '이론', difficulty: 3, content: 'class로 객체를 정의합니다. __init__은 생성자, self는 인스턴스 참조.', quiz: { question: '__init__ 메서드의 역할은?', options: ['클래스 삭제', '인스턴스 초기화(생성자)', '상속', '출력'], answer: 1, explanation: '__init__은 인스턴스 생성 시 자동 호출되는 생성자(초기화 메서드)입니다.' }, problems: [], problemCount: 15 },
            { id: 'py-u18', unitNumber: 18, title: '파이썬 종합 연습', subtitle: '전범위', duration: '60분', type: '종합', difficulty: 3, content: '파이썬 기초 전범위 종합 연습 문제입니다.', quiz: { question: '다음 중 파이썬의 mutable 타입은?', options: ['int', 'str', 'tuple', 'list'], answer: 3, explanation: '리스트(list)는 가변(mutable) 타입으로 요소를 변경할 수 있습니다.' }, problems: [], problemCount: 25 },
        ],
    },
];
