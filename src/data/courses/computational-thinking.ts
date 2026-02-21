import { Chapter } from './types';

/** 컴퓨팅 사고력 전체 챕터 (7챕터, 43유닛) */
export const COMPUTATIONAL_THINKING_CHAPTERS: Chapter[] = [
    {
        id: 'ct-ch01', chapterNumber: 1, title: '분해', icon: '🧩',
        description: '복잡한 문제를 작은 부분으로 나누기',
        units: [
            { id: 'ct-d1', unitNumber: 1, title: '분해 Level 1', subtitle: '기본 분해', duration: '20분', type: '이론', difficulty: 1, content: '큰 문제를 작고 해결 가능한 부분으로 나누는 분해 기법을 배웁니다.', quiz: { question: '문제 분해의 목적은?', options: ['문제를 크게 만들기', '복잡한 문제를 작은 부분으로 나누기', '문제를 삭제하기', '정답만 외우기'], answer: 1, explanation: '분해는 복잡한 문제를 해결 가능한 작은 부분으로 나누는 것입니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-d1a', unitNumber: 2, title: '분해 Level 1 추가', subtitle: '연습 문제', duration: '15분', type: '실습', difficulty: 1, content: '분해 Level 1의 추가 연습문제입니다.', quiz: { question: '요리 레시피를 분해하면?', options: ['한 번에 다 만든다', '재료 준비→조리→담기 단계로', '레시피를 무시한다', '다른 음식을 만든다'], answer: 1, explanation: '요리를 단계별로 나누면 재료 준비, 조리, 담기 등으로 분해할 수 있습니다.' }, problems: [], problemCount: 6 },
            { id: 'ct-d2', unitNumber: 3, title: '분해 Level 2', subtitle: '중급 분해', duration: '25분', type: '이론', difficulty: 2, content: '더 복잡한 문제의 분해를 연습합니다.', quiz: { question: '학교 운동회를 분해하면 적절한 것은?', options: ['하루종일 놀기', '일정/팀/규칙/장비/진행 으로 나누기', '운동 안 하기', '선생님한테 맡기기'], answer: 1, explanation: '운동회를 계획/팀편성/규칙/장비/진행 등 작은 작업으로 분해합니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-d2a', unitNumber: 4, title: '분해 Level 2 추가', subtitle: '연습', duration: '20분', type: '실습', difficulty: 2, content: '분해 Level 2 추가 문제.', quiz: { question: '앱 만들기를 분해하면?', options: ['한 번에 코딩', '기획→디자인→개발→테스트', '포기하기', '다운로드'], answer: 1, explanation: '앱 개발은 기획, 디자인, 개발, 테스트 단계로 분해됩니다.' }, problems: [], problemCount: 6 },
            { id: 'ct-d3', unitNumber: 5, title: '분해 Level 3', subtitle: '고급 분해', duration: '30분', type: '이론', difficulty: 2, content: '고급 분해 기법을 배웁니다.', quiz: { question: '분해의 핵심 원칙은?', options: ['크게 합치기', '각 부분이 독립적으로 해결 가능', '무조건 둘로 나누기', '순서 무시'], answer: 1, explanation: '좋은 분해는 각 부분이 독립적으로 해결할 수 있도록 나누는 것입니다.' }, problems: [], problemCount: 10 },
            { id: 'ct-d3a', unitNumber: 6, title: '분해 Level 3+', subtitle: '심화', duration: '25분', type: '실습', difficulty: 3, content: '분해 심화 문제.', quiz: { question: '재귀적 분해란?', options: ['한 번에 나누기', '분해한 것을 다시 분해', '분해 안 하기', '합치기'], answer: 1, explanation: '재귀적 분해는 나눈 부분을 더 작은 부분으로 반복 분해하는 것입니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-d4', unitNumber: 7, title: '분해 Level 4', subtitle: '응용', duration: '30분', type: '실습', difficulty: 3, content: '실제 문제에 분해를 적용합니다.', quiz: { question: '웹사이트를 분해하면?', options: ['한 페이지에 다 넣기', '헤더/네비/콘텐츠/푸터로', '그림만 넣기', '텍스트만 쓰기'], answer: 1, explanation: '웹사이트는 헤더, 네비게이션, 콘텐츠, 푸터 등 구성요소로 분해합니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-d4a', unitNumber: 8, title: '분해 Level 4+', subtitle: '응용 실습', duration: '25분', type: '실습', difficulty: 3, content: '분해 Level 4 추가.', quiz: { question: '분해 결과가 좋은지 판단하는 기준은?', options: ['조각이 많을수록', '각 조각이 독립적+관리 가능', '빠르게 나눌수록', '크기가 같을수록'], answer: 1, explanation: '각 조각이 독립적이고 관리 가능한 크기여야 좋은 분해입니다.' }, problems: [], problemCount: 6 },
            { id: 'ct-d5', unitNumber: 9, title: '분해 Level 5', subtitle: '마스터', duration: '35분', type: '종합', difficulty: 3, content: '분해 마스터 레벨.', quiz: { question: '분해가 가장 중요한 이유는?', options: ['시험 점수', '복잡한 문제를 해결 가능하게', '코드 길이 줄이기', '컴퓨터 속도'], answer: 1, explanation: '분해는 복잡한 문제를 해결 가능한 수준으로 만드는 핵심 사고법입니다.' }, problems: [], problemCount: 10 },
            { id: 'ct-d5a', unitNumber: 10, title: '분해 Level 5+', subtitle: '종합평가', duration: '30분', type: '퀴즈', difficulty: 3, content: '분해 종합평가.', quiz: { question: '다음 중 분해의 예시가 아닌 것은?', options: ['요리→재료+조리+담기', '빨래→분류+세탁+건조', '덧셈→곱셈으로 변환', '청소→방+화장실+주방'], answer: 2, explanation: '덧셈을 곱셈으로 변환하는 것은 분해가 아니라 추상화 또는 변환입니다.' }, problems: [], problemCount: 8 },
        ],
    },
    {
        id: 'ct-ch02', chapterNumber: 2, title: '패턴 인식', icon: '🔍',
        description: '데이터에서 반복되는 규칙 찾기',
        units: [
            { id: 'ct-p1', unitNumber: 11, title: '패턴 인식 Level 1', subtitle: '숫자 패턴', duration: '20분', type: '이론', difficulty: 1, content: '숫자 수열에서 패턴을 찾는 연습을 합니다.', quiz: { question: '2, 4, 6, 8, ? 다음 수는?', options: ['9', '10', '12', '14'], answer: 1, explanation: '2씩 증가하는 패턴: 다음은 10입니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-p2', unitNumber: 12, title: '패턴 인식 Level 2', subtitle: '도형 패턴', duration: '25분', type: '이론', difficulty: 2, content: '도형과 시각적 패턴을 인식합니다.', quiz: { question: '패턴 인식이 프로그래밍에 도움이 되는 이유는?', options: ['코드를 짧게', '반복 구조를 발견하여 효율적 해결', '디자인', '수학 실력'], answer: 1, explanation: '패턴을 찾으면 반복문, 공식 등으로 효율적인 코드를 작성할 수 있습니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-p3', unitNumber: 13, title: '패턴 인식 Level 3', subtitle: '코드 패턴', duration: '30분', type: '실습', difficulty: 2, content: '코드에서 반복 패턴을 찾아 최적화합니다.', quiz: { question: '같은 코드가 5번 반복되면 어떻게 개선?', options: ['그냥 둔다', '반복문 사용', '삭제한다', '주석 처리'], answer: 1, explanation: '반복되는 코드는 for/while 반복문으로 줄일 수 있습니다.' }, problems: [], problemCount: 10 },
            { id: 'ct-p4', unitNumber: 14, title: '패턴 인식 Level 4', subtitle: '복합 패턴', duration: '30분', type: '이론', difficulty: 3, content: '여러 규칙이 결합된 복합 패턴을 분석합니다.', quiz: { question: '1,1,2,3,5,8,? 다음 수는?', options: ['10', '11', '13', '15'], answer: 2, explanation: '피보나치 수열: 앞 두 수의 합 = 다음 수. 5+8=13' }, problems: [], problemCount: 10 },
            { id: 'ct-p5', unitNumber: 15, title: '패턴 인식 Level 5', subtitle: '마스터', duration: '35분', type: '종합', difficulty: 3, content: '패턴 인식 마스터 레벨.', quiz: { question: '패턴 인식과 가장 관련 깊은 것은?', options: ['변수 선언', '반복문/공식 도출', '파일 저장', '네트워크'], answer: 1, explanation: '패턴을 발견하면 반복문이나 수학 공식으로 표현할 수 있습니다.' }, problems: [], problemCount: 10 },
        ],
    },
    {
        id: 'ct-ch03', chapterNumber: 3, title: '추상화', icon: '🎭',
        description: '핵심만 남기고 불필요한 것 제거',
        units: [
            { id: 'ct-a1', unitNumber: 16, title: '추상화 Level 1', subtitle: '핵심 파악', duration: '20분', type: '이론', difficulty: 1, content: '불필요한 정보를 제거하고 핵심만 남기는 추상화를 배웁니다.', quiz: { question: '추상화의 핵심은?', options: ['모든 세부사항 기억', '핵심만 남기고 불필요한 것 제거', '복잡하게 만들기', '더 많은 변수 추가'], answer: 1, explanation: '추상화는 불필요한 세부사항을 제거하고 핵심만 남기는 것입니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-a2', unitNumber: 17, title: '추상화 Level 2', subtitle: '모델링', duration: '25분', type: '이론', difficulty: 2, content: '실세계를 간단한 모델로 표현합니다.', quiz: { question: '지도는 어떤 추상화의 예인가요?', options: ['분해', '패턴 인식', '공간의 단순화 표현', '알고리즘'], answer: 2, explanation: '지도는 실제 지형에서 필요한 정보(도로, 지명)만 남긴 추상화입니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-a3', unitNumber: 18, title: '추상화 Level 3', subtitle: '데이터 추상화', duration: '30분', type: '실습', difficulty: 2, content: '데이터에서 핵심 속성만 추출합니다.', quiz: { question: '학생 관리 시스템에서 추상화할 때 불필요한 것은?', options: ['이름', '학번', '혈액형', '성적'], answer: 2, explanation: '학생 관리에 혈액형은 일반적으로 불필요한 정보입니다.' }, problems: [], problemCount: 10 },
            { id: 'ct-a4', unitNumber: 19, title: '추상화 Level 4', subtitle: '함수 추상화', duration: '30분', type: '이론', difficulty: 3, content: '함수를 통한 행동 추상화를 배웁니다.', quiz: { question: '함수가 추상화의 도구인 이유는?', options: ['코드가 짧아서', '내부 구현을 숨기고 인터페이스만 제공', '빠르게 실행', '변수 절약'], answer: 1, explanation: '함수는 복잡한 내부 로직을 숨기고 간단한 호출로 사용할 수 있게 합니다.' }, problems: [], problemCount: 10 },
            { id: 'ct-a5', unitNumber: 20, title: '추상화 Level 5', subtitle: '마스터', duration: '35분', type: '종합', difficulty: 3, content: '추상화 마스터 레벨.', quiz: { question: '좋은 추상화의 조건은?', options: ['모든 정보 포함', '필요한 것만 남기되 핵심은 유지', '가능한 적게', '없애기'], answer: 1, explanation: '좋은 추상화는 필요한 핵심 정보는 유지하면서 불필요한 것만 제거합니다.' }, problems: [], problemCount: 10 },
        ],
    },
    {
        id: 'ct-ch04', chapterNumber: 4, title: '알고리즘 설계', icon: '📐',
        description: '단계적 해결 절차 만들기',
        units: [
            { id: 'ct-al1', unitNumber: 21, title: '알고리즘 Level 1', subtitle: '순서도', duration: '20분', type: '이론', difficulty: 1, content: '순서도를 사용하여 알고리즘을 시각적으로 표현합니다.', quiz: { question: '알고리즘이란?', options: ['프로그래밍 언어', '문제를 해결하는 단계적 절차', '컴퓨터 부품', '운영체제'], answer: 1, explanation: '알고리즘은 문제를 해결하기 위한 정확하고 유한한 단계적 절차입니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-al2', unitNumber: 22, title: '알고리즘 Level 2', subtitle: '의사코드', duration: '25분', type: '이론', difficulty: 2, content: '의사코드(pseudocode)로 알고리즘을 작성합니다.', quiz: { question: '의사코드의 장점은?', options: ['컴파일 가능', '프로그래밍 언어에 구애받지 않음', '실행 가능', '자동 테스트'], answer: 1, explanation: '의사코드는 특정 언어에 종속되지 않아 아이디어를 자유롭게 표현합니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-al3', unitNumber: 23, title: '알고리즘 Level 3', subtitle: '조건과 반복', duration: '30분', type: '실습', difficulty: 2, content: '조건문과 반복문을 포함한 알고리즘을 설계합니다.', quiz: { question: '정수가 짝수인지 판별하는 알고리즘의 핵심 연산은?', options: ['덧셈', '나머지(%) 연산', '곱셈', '나눗셈'], answer: 1, explanation: '숫자 % 2 == 0이면 짝수입니다. 나머지 연산이 핵심.' }, problems: [], problemCount: 10 },
            { id: 'ct-al4', unitNumber: 24, title: '알고리즘 Level 4', subtitle: '탐색과 정렬', duration: '35분', type: '이론', difficulty: 3, content: '기본적인 탐색과 정렬 알고리즘을 개념적으로 학습합니다.', quiz: { question: '순차 탐색의 최악 시간은?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 2, explanation: '순차 탐색은 최악의 경우 모든 원소를 확인: O(n)' }, problems: [], problemCount: 10 },
            { id: 'ct-al5', unitNumber: 25, title: '알고리즘 Level 5', subtitle: '마스터', duration: '40분', type: '종합', difficulty: 3, content: '알고리즘 설계 마스터.', quiz: { question: '알고리즘 효율성을 측정하는 대표적 방법은?', options: ['코드 줄 수', '시간/공간 복잡도 (빅오)', '변수 개수', '함수 개수'], answer: 1, explanation: '빅오(Big-O) 표기법으로 시간복잡도와 공간복잡도를 분석합니다.' }, problems: [], problemCount: 12 },
        ],
    },
    {
        id: 'ct-ch05', chapterNumber: 5, title: '종합 평가', icon: '📝',
        description: '컴퓨팅 사고력 종합 평가',
        units: [
            { id: 'ct-e1', unitNumber: 26, title: '종합평가 Level 1', subtitle: '기초', duration: '30분', type: '퀴즈', difficulty: 1, content: '컴퓨팅 사고력 기초 종합평가.', quiz: { question: '컴퓨팅 사고의 4가지 핵심 요소가 아닌 것은?', options: ['분해', '패턴 인식', '코딩', '추상화'], answer: 2, explanation: '4가지 핵심: 분해, 패턴 인식, 추상화, 알고리즘 설계. 코딩은 도구입니다.' }, problems: [], problemCount: 15 },
            { id: 'ct-e2', unitNumber: 27, title: '종합평가 Level 2', subtitle: '중급', duration: '40분', type: '퀴즈', difficulty: 2, content: '중급 종합평가.', quiz: { question: '네비게이션 앱이 사용하는 컴퓨팅 사고 요소는?', options: ['분해만', '모든 요소(분해+패턴+추상화+알고리즘)', '코딩만', '패턴만'], answer: 1, explanation: '네비게이션은 지도 추상화, 경로 알고리즘, 교통 패턴 등 모든 요소를 활용합니다.' }, problems: [], problemCount: 20 },
            { id: 'ct-e3', unitNumber: 28, title: '종합평가 Level 3', subtitle: '고급', duration: '50분', type: '퀴즈', difficulty: 3, content: '고급 종합평가.', quiz: { question: '컴퓨팅 사고가 일상에서 중요한 이유는?', options: ['게임을 잘하려고', '복잡한 문제를 체계적으로 해결', '수학 점수', '컴퓨터 작동 원리'], answer: 1, explanation: '컴퓨팅 사고는 프로그래밍뿐 아니라 모든 복잡한 문제를 체계적으로 해결합니다.' }, problems: [], problemCount: 25 },
        ],
    },
    {
        id: 'ct-ch06', chapterNumber: 6, title: 'CT 통합 프로젝트', icon: '🚀',
        description: '실제 문제를 4단계 CT로 해결',
        units: [
            { id: 'ct-pj1', unitNumber: 29, title: '프로젝트 Level 1', subtitle: '기초 프로젝트', duration: '40분', type: '실습', difficulty: 2, content: 'CT 4단계를 적용한 기초 프로젝트.', quiz: { question: '프로젝트에서 첫 번째로 해야 할 CT 단계는?', options: ['추상화', '패턴 인식', '분해', '알고리즘'], answer: 2, explanation: '먼저 문제를 분해하여 해결할 수 있는 크기로 나눕니다.' }, problems: [], problemCount: 10 },
            { id: 'ct-pj2', unitNumber: 30, title: '프로젝트 Level 2', subtitle: '중급', duration: '50분', type: '실습', difficulty: 2, content: '중급 CT 프로젝트.', quiz: { question: 'CT 프로젝트에서 추상화 단계의 역할은?', options: ['코드 작성', '핵심 데이터/기능만 선별', '디버깅', '배포'], answer: 1, explanation: '추상화 단계에서 프로젝트에 꼭 필요한 핵심 기능과 데이터만 선별합니다.' }, problems: [], problemCount: 12 },
            { id: 'ct-pj3', unitNumber: 31, title: '프로젝트 Level 3', subtitle: '고급', duration: '60분', type: '실습', difficulty: 3, content: '고급 CT 프로젝트.', quiz: { question: '프로젝트 완성 후 개선점을 찾는 과정은?', options: ['분해', '패턴 인식', '리팩토링/최적화', '삭제'], answer: 2, explanation: '완성된 프로젝트에서 반복 패턴을 찾아 코드를 리팩토링하고 최적화합니다.' }, problems: [], problemCount: 15 },
        ],
    },
    {
        id: 'ct-ch07', chapterNumber: 7, title: 'CT-C언어 연계', icon: '🔗',
        description: 'CT 개념을 C언어 코드로 구현',
        units: [
            { id: 'ct-c1', unitNumber: 32, title: '분해 → C언어 (쉬움)', subtitle: '기초 코드화', duration: '30분', type: '실습', difficulty: 1, content: '분해 결과를 C언어 코드로 구현합니다.', quiz: { question: '문제를 분해한 후 코드로 만들 때 각 부분은?', options: ['한 줄로', '각각 함수로 구현', '모두 main에', '주석으로'], answer: 1, explanation: '분해한 각 부분을 separate 함수로 구현하면 체계적입니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-c2', unitNumber: 33, title: '패턴 → C언어 (쉬움)', subtitle: '반복문 활용', duration: '30분', type: '실습', difficulty: 1, content: '발견한 패턴을 C언어 반복문으로 구현합니다.', quiz: { question: '1~100의 합을 구하는 패턴의 C구현은?', options: ['100번 printf', 'for문으로 sum+=i', '배열 100개', 'if문 100개'], answer: 1, explanation: 'for(i=1;i<=100;i++) sum+=i; 패턴을 반복문으로 구현합니다.' }, problems: [], problemCount: 8 },
            { id: 'ct-c3', unitNumber: 34, title: '추상화 → C언어 (쉬움)', subtitle: '구조체/함수', duration: '30분', type: '실습', difficulty: 1, content: '추상화 결과를 C언어 구조체와 함수로 구현합니다.', quiz: { question: '학생을 추상화한 C 구조체에 포함할 것은?', options: ['이름, 성적, 학번', '키, 몸무게, 혈액형', '좋아하는 음식', '신발 사이즈'], answer: 0, explanation: '학생 관리에 필요한 핵심 정보: 이름, 성적, 학번을 구조체 멤버로.' }, problems: [], problemCount: 8 },
            { id: 'ct-c4', unitNumber: 35, title: '알고리즘 → C언어 (보통)', subtitle: '조건+반복 구현', duration: '40분', type: '실습', difficulty: 2, content: '설계한 알고리즘을 C언어로 구현합니다.', quiz: { question: '순서도의 마름모(◇)는 C에서 무엇으로?', options: ['printf', 'if/switch', 'for', 'return'], answer: 1, explanation: '마름모는 조건 판단을 의미하며 C의 if문이나 switch문에 해당합니다.' }, problems: [], problemCount: 10 },
            { id: 'ct-c5', unitNumber: 36, title: 'CT 종합 → C언어 (어려움)', subtitle: '복합 구현', duration: '50분', type: '종합', difficulty: 3, content: 'CT 4단계를 모두 활용한 C언어 종합 프로젝트.', quiz: { question: 'CT 4단계를 코드에 적용한 결과물의 특징은?', options: ['긴 코드', '체계적이고 유지보수가 쉬운 코드', '빠른 코드', '짧은 코드'], answer: 1, explanation: 'CT를 적용하면 체계적으로 분해, 구조화된 유지보수가 쉬운 코드가 됩니다.' }, problems: [], problemCount: 12 },
        ],
    },
];
