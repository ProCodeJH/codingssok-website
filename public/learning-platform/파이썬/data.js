const CATEGORIES = [

    { id: 'intro', name: '입문', desc: 'Unit 1~6: 소개·설치·기본문법' },

    { id: 'basic', name: '기초연산', desc: 'Unit 7~9: 숫자·변수·출력' },

    { id: 'logic', name: '논리·문자열', desc: 'Unit 10~12: 불·문자열·리스트·딕셔너리' },

    { id: 'condition', name: '조건문', desc: 'Unit 13~15: if·else·elif' },

    { id: 'loop', name: '반복문', desc: 'Unit 16~21: for·while·break·별찍기·FizzBuzz·터틀' },

    { id: 'datatype', name: '자료구조 응용', desc: 'Unit 22~28: 리스트·문자열·딕셔너리·세트·파일' },

    { id: 'function', name: '함수', desc: 'Unit 29~35: 함수·내장함수·모듈·예외·파일·정렬' },

    { id: 'oop', name: '객체지향', desc: 'Unit 36~38: 클래스·상속·OOP 실습' },

    { id: 'advanced', name: '고급·실전', desc: 'Unit 39~47: 알고리즘·DP·라이브러리·정규식·프로젝트' },

];



const TERMS = [

    // ──────── INTRO (Unit 1~6) ────────

    {

        id: 'u01', category: 'intro', name: 'Unit 1. 소프트웨어 교육과 파이썬', hanja: 'SW Education & Python',

        short: '문제 해결, 알고리즘, 코딩, 파이썬 소개', color: '#3b82f6', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: '소프트웨어 교육의 핵심은 "문제를 과학적으로 분석하고 절차적으로 해결하는 능력"입니다. 알고리즘은 문제 해결 절차이며, 코딩은 이를 컴퓨터 언어로 표현하는 것입니다. Python은 배우기 쉽고 강력한 프로그래밍 언어입니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '컴퓨팅 사고력', desc: '문제 분해 → 패턴 인식 → 추상화 → 알고리즘 설계' },

                    { label: '알고리즘', desc: '문제를 해결하기 위한 명확한 단계별 절차' },

                    { label: '파이썬 특징', desc: '간결한 문법, 풍부한 라이브러리, 다양한 분야 활용' },

                    { label: '인터프리터', desc: 'Python은 소스 코드를 한 줄씩 해석하며 실행' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: '프로그래밍이란 무엇인가?', choices: ['하드웨어 조립', '컴퓨터에게 명령을 내리는 코드 작성', '인터넷 검색', '문서 편집'], answer: 1, explanation: '프로그래밍은 컴퓨터가 수행할 작업을 코드로 작성하는 과정입니다. 사람의 언어를 기계가 이해할 수 있는 명령으로 변환합니다.' },

                    { q: '다음 중 Python의 특징이 아닌 것은?', choices: ['인터프리터 언어', '동적 타이핑', '컴파일 필수', '간결한 문법'], answer: 2, explanation: 'Python은 컴파일 없이 인터프리터가 코드를 바로 실행합니다. C/C++와 달리 별도의 컴파일 단계가 필요하지 않습니다.' },

                    { q: 'Python이 활용되는 분야로 거리가 먼 것은?', choices: ['인공지능(AI)', '데이터 분석', '웹 개발', '운영체제 커널 개발'], answer: 3, explanation: '운영체제 커널은 주로 C/C++로 개발합니다. Python은 AI, 데이터 분석, 웹 개발, 자동화 등에 널리 활용됩니다.' },

                    { q: '___에 들어갈 용어는?\n"컴퓨터 과학에서 문제를 해결하기 위해 논리적으로 생각하는 능력을 ___이라 한다"', choices: ['코딩', '디버깅', '컴퓨팅 사고력', '알고리즘'], answer: 2, explanation: '컴퓨팅 사고력(Computational Thinking)은 문제를 분해·추상화·패턴 인식·알고리즘 설계로 해결하는 사고 방식입니다.' },

                    { q: '알고리즘의 정의로 올바른 것은?', choices: ['프로그래밍 언어의 종류', '문제를 해결하기 위한 단계적 절차', '컴퓨터의 하드웨어 구성', '운영체제의 기능'], answer: 1, explanation: '알고리즘은 주어진 문제를 해결하기 위해 정해진 순서대로 수행하는 절차입니다. 요리 레시피와 비슷한 개념입니다.' },

                    { q: '인터프리터 언어와 컴파일 언어의 차이로 올바른 것은?', choices: ['인터프리터는 더 빠르다', '컴파일 언어는 한 줄씩 해석한다', '인터프리터는 코드를 한 줄씩 즉시 실행한다', '차이가 없다'], answer: 2, explanation: '인터프리터 언어는 코드를 한 줄씩 읽어 바로 실행합니다. 컴파일 언어는 전체 코드를 기계어로 변환 후 실행하여 속도가 빠릅니다.' },

                    { q: 'Python을 만든 사람은?', choices: ['제임스 고슬링', '귀도 반 로섬', '데니스 리치', '브렌던 아이크'], answer: 1, explanation: '귀도 반 로섬(Guido van Rossum)이 1991년에 Python을 만들었습니다. 이름은 영국 코미디 "Monty Python"에서 따왔습니다.' },

                    { q: '다음 중 Python과 같은 인터프리터 언어는?', choices: ['C', 'Java', 'JavaScript', 'Go'], answer: 2, explanation: 'JavaScript는 Python과 마찬가지로 인터프리터 방식으로 실행됩니다. C와 Go는 컴파일 언어입니다.' },

                    { q: '소프트웨어 개발 과정의 올바른 순서는?', choices: ['코딩→분석→설계→테스트', '분석→설계→코딩→테스트', '테스트→코딩→설계→분석', '설계→분석→테스트→코딩'], answer: 1, explanation: '소프트웨어 개발은 문제 분석 → 설계 → 구현(코딩) → 테스트 순서로 진행됩니다. 이를 소프트웨어 개발 생명주기라 합니다.' },

                    { q: '버그(Bug)의 의미는?', choices: ['새로운 기능', '프로그램의 오류', '프로그래밍 언어', '하드웨어 부품'], answer: 1, explanation: '버그는 프로그램에서 발생하는 오류를 의미합니다. 1947년 하버드 대학 컴퓨터에서 실제 벌레(나방)를 발견한 것이 유래입니다.' },

                    { q: '다음 코드의 실행 결과는?\nprint("Python")', choices: ['python', 'Python', 'PYTHON', 'Error'], answer: 1, explanation: 'print()는 괄호 안의 내용을 그대로 출력합니다. 대소문자가 유지되어 "Python"이 출력됩니다.' },

                    { q: '디버깅이란?', choices: ['코드를 작성하는 과정', '프로그램의 오류를 찾아 수정하는 과정', '프로그램을 설치하는 과정', '코드를 삭제하는 과정'], answer: 1, explanation: '디버깅(Debugging)은 버그를 찾아 수정하는 과정입니다. 개발 시간의 상당 부분을 차지하는 중요한 과정입니다.' },

                    { q: '다음 중 고급 프로그래밍 언어끼리 묶인 것은?', choices: ['Python, 기계어', 'C, 어셈블리', 'Python, Java, C', '기계어, 바이트코드'], answer: 2, explanation: 'Python, Java, C는 모두 고급 프로그래밍 언어입니다. 기계어와 어셈블리어는 저급 언어에 해당합니다.' },

                    { q: '___에 들어갈 말은?\n"Python은 ___ 타이핑 언어여서 변수 선언 시 자료형을 명시하지 않는다"', choices: ['정적', '동적', '강한', '약한'], answer: 1, explanation: '동적 타이핑(Dynamic Typing)은 실행 시점에 변수의 타입이 결정되는 방식입니다. x = 10 후 x = "hello"도 가능합니다.' },

                    { q: '순서도(Flowchart)에서 마름모 기호의 의미는?', choices: ['시작/끝', '처리/연산', '조건 판단', '입출력'], answer: 2, explanation: '마름모(◇)는 조건 판단을 나타냅니다. Yes/No로 분기하는 의사결정 지점에 사용됩니다.' },

                    { q: '다음 설명 중 올바르지 않은 것은?', choices: ['Python은 무료로 사용 가능하다', 'Python은 다양한 OS에서 동작한다', 'Python은 들여쓰기로 코드 블록을 구분한다', 'Python은 실행 속도가 C보다 빠르다'], answer: 3, explanation: 'Python은 인터프리터 언어라 일반적으로 C보다 느립니다. 대신 개발 속도, 가독성, 생산성에서 큰 장점이 있습니다.' },

                    { q: 'Python의 버전 2와 3의 관계로 올바른 것은?', choices: ['완전히 호환된다', '일부 문법이 달라 호환되지 않는 부분이 있다', '같은 언어가 아니다', '버전 2가 더 최신이다'], answer: 1, explanation: 'Python 2와 3은 일부 문법이 다릅니다. 예: print문(v2) vs print()(v3). Python 2는 2020년 지원 종료되었습니다.' },

                    { q: '의사코드(Pseudocode)란?', choices: ['Python 코드의 별칭', '프로그래밍 언어에 의존하지 않는 알고리즘 표현', '기계어 코드', '에러 메시지'], answer: 1, explanation: '의사코드는 특정 언어에 구애받지 않고 알고리즘의 논리를 자연어와 유사하게 표현하는 방법입니다.' },

                    { q: '오픈소스 소프트웨어의 특징은?', choices: ['소스 코드가 비공개', '무료이나 수정 불가', '소스 코드가 공개되어 누구나 수정·배포 가능', '기업만 사용 가능'], answer: 2, explanation: 'Python은 대표적인 오픈소스 프로젝트입니다. 누구나 소스 코드를 보고 수정하고 배포할 수 있습니다.' },

                    { q: '프로그래밍에서 추상화란?', choices: ['코드를 길게 작성하는 것', '복잡한 내용에서 핵심만 추출하는 것', '에러를 무시하는 것', '변수를 선언하는 것'], answer: 1, explanation: '추상화는 복잡한 시스템에서 핵심적인 개념만 추출하여 단순화하는 과정입니다. 컴퓨팅 사고력의 핵심 요소입니다.' },

                    { q: '다음 중 Python 파일의 확장자는?', choices: ['.java', '.py', '.c', '.js'], answer: 1, explanation: 'Python 소스 파일은 .py 확장자를 사용합니다. 예: hello.py, main.py 등입니다.' },

                    { q: 'IDLE이란?', choices: ['Python의 에러 종류', 'Python 기본 통합 개발 환경', '데이터베이스 프로그램', '웹 브라우저'], answer: 1, explanation: 'IDLE(Integrated Development and Learning Environment)은 Python 설치 시 함께 제공되는 기본 IDE입니다.' },

                    { q: '다음 코드에서 에러가 발생하는 이유는?\nPrint("Hello")', choices: ['괄호가 없어서', '대문자 P를 사용해서', '따옴표가 잘못돼서', 'Hello가 틀려서'], answer: 1, explanation: 'Python은 대소문자를 구분합니다. print가 맞고 Print는 정의되지 않은 이름이라 NameError가 발생합니다.' },

                    { q: '변수란?', choices: ['고정된 값', '데이터를 저장하는 메모리 공간의 이름', '프로그램의 오류', '출력 함수'], answer: 1, explanation: '변수는 값을 저장하고 나중에 참조할 수 있는 이름 붙은 메모리 공간입니다. x = 5처럼 사용합니다.' },

                    { q: '___에 들어갈 함수는?\n"화면에 결과를 출력하려면 ___(값)을 사용한다"', choices: ['input()', 'print()', 'return()', 'type()'], answer: 1, explanation: 'print() 함수는 괄호 안의 값을 화면에 출력합니다. Python에서 가장 기본적이고 자주 사용하는 함수입니다.' },

                    { q: '컴퓨팅 사고력의 4요소가 아닌 것은?', choices: ['분해', '패턴 인식', '추상화', '하드웨어 설계'], answer: 3, explanation: '컴퓨팅 사고력의 4요소는 분해, 패턴 인식, 추상화, 알고리즘 설계입니다. 하드웨어 설계는 포함되지 않습니다.' },

                    { q: '다음 설명에 해당하는 개발 방법론은?\n"계획→분석→설계→구현→테스트→유지보수"', choices: ['애자일', '폭포수 모델', '스크럼', '칸반'], answer: 1, explanation: '폭포수(Waterfall) 모델은 각 단계를 순차적으로 진행하는 전통적인 소프트웨어 개발 방법론입니다.' },

                    { q: 'Python이 느린 단점을 보완하기 위해 사용하는 방법이 아닌 것은?', choices: ['C 확장 모듈 사용', 'NumPy 등 최적화 라이브러리', 'Cython 활용', 'HTML로 변환'], answer: 3, explanation: 'HTML은 마크업 언어로 성능 최적화와 관계없습니다. C 확장, NumPy, Cython 등은 Python 성능을 높이는 실제 방법입니다.' },

                    { q: '다음 Python 코드의 실행 결과는?\nprint(1 + 2)', choices: ['1 + 2', '12', '3', 'Error'], answer: 2, explanation: 'print(1 + 2)는 먼저 1+2를 계산하여 3을 구한 뒤, 그 결과인 3을 화면에 출력합니다.' },

                    { q: '프로그래밍 언어의 세대 구분에서 Python은?', choices: ['1세대(기계어)', '2세대(어셈블리)', '3세대(고급 언어)', '4세대(비주얼 언어)'], answer: 2, explanation: 'Python은 3세대 고급 프로그래밍 언어입니다. 사람이 이해하기 쉬운 문법으로 작성하고, 인터프리터가 기계어로 변환합니다.' }

                ]

            },

        ], related: ['u02', 'u03'],

    },

    {

        id: 'u02', category: 'intro', name: 'Unit 2. 파이썬 설치하기', hanja: 'Installing Python',

        short: 'Python 다운로드, 설치, 환경변수 설정', color: '#3b82f6', icon: 'maintenance',

        sections: [

            { type: 'definition', title: '개요', content: 'Python 공식 사이트(python.org)에서 최신 버전을 다운로드하고 설치합니다. 설치 시 "Add Python to PATH" 체크가 중요합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '공식 사이트', desc: 'python.org → Downloads에서 최신 Python 3.x 다운로드' },

                    { label: 'PATH 설정', desc: '"Add Python to PATH" 체크 필수 — 명령 프롬프트에서 python 실행 가능' },

                    { label: 'IDLE', desc: 'Python 설치 시 함께 제공되는 통합 개발 환경' },

                    { label: '버전 확인', desc: '명령 프롬프트에서 python --version으로 확인' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: 'Python을 설치할 수 있는 공식 사이트는?', choices: ['github.com', 'python.org', 'python.com', 'pypi.org'], answer: 1, explanation: 'python.org가 Python의 공식 웹사이트입니다. 최신 버전 다운로드, 문서, 튜토리얼을 제공합니다.' },

                    { q: 'Python 설치 시 반드시 체크해야 할 옵션은?', choices: ['Install for all users', 'Add Python to PATH', 'Install pip', 'Use admin privileges'], answer: 1, explanation: 'Add Python to PATH를 체크하면 cmd/터미널 어디서든 python 명령을 사용할 수 있습니다. 체크하지 않으면 매번 전체 경로를 입력해야 합니다.' },

                    { q: '다음 명령어의 실행 결과는?\npython --version', choices: ['Python 설치', 'Python 버전 확인', 'Python 삭제', 'Python 실행'], answer: 1, explanation: '--version 옵션은 설치된 Python의 버전 정보를 출력합니다. 예: Python 3.12.1' },

                    { q: 'IDE의 약자는?', choices: ['Internet Development Engine', 'Integrated Development Environment', 'Internal Data Exchange', 'Interactive Design Editor'], answer: 1, explanation: 'IDE(Integrated Development Environment)는 코드 편집, 실행, 디버깅을 하나의 환경에서 제공하는 통합 개발 환경입니다.' },

                    { q: '다음 중 Python IDE가 아닌 것은?', choices: ['PyCharm', 'VS Code', 'IDLE', 'Photoshop'], answer: 3, explanation: 'Photoshop은 이미지 편집 소프트웨어입니다. PyCharm, VS Code, IDLE은 모두 Python 코드를 작성할 수 있는 개발 환경입니다.' },

                    { q: 'Python 대화형 모드(REPL)의 프롬프트 기호는?', choices: ['$', '#', '>>>', 'C:\\>'], answer: 2, explanation: '>>>는 Python 대화형 인터프리터의 프롬프트입니다. REPL(Read-Eval-Print-Loop)이라고도 부릅니다.' },

                    { q: 'pip란?', choices: ['Python 편집기', 'Python 패키지 관리자', 'Python 디버거', 'Python 컴파일러'], answer: 1, explanation: 'pip(Package Installer for Python)는 외부 라이브러리를 설치·관리하는 도구입니다. pip install 패키지명으로 사용합니다.' },

                    { q: '___에 들어갈 명령어는?\n"외부 라이브러리를 설치하려면 ___ install 패키지명"', choices: ['python', 'pip', 'apt', 'npm'], answer: 1, explanation: 'pip install 패키지명으로 PyPI에서 원하는 라이브러리를 설치합니다. 예: pip install requests' },

                    { q: 'VS Code에서 Python을 사용하려면 필요한 것은?', choices: ['Java 설치', 'Python 확장(Extension) 설치', 'C++ 컴파일러', '별도 설정 불필요'], answer: 1, explanation: 'VS Code에서 Python을 효과적으로 사용하려면 Microsoft의 Python 확장을 설치해야 합니다. 코드 자동완성, 디버깅 등을 지원합니다.' },

                    { q: '대화형 모드에서 다음을 입력하면?\n>>> 3 + 5', choices: ['3 + 5', '35', '8', 'Error'], answer: 2, explanation: '대화형 모드에서는 식을 입력하면 바로 결과를 표시합니다. 3 + 5의 계산 결과인 8이 출력됩니다.' },

                    { q: 'Python 스크립트 파일을 실행하는 명령어는?', choices: ['run hello.py', 'python hello.py', 'exec hello.py', 'start hello.py'], answer: 1, explanation: 'python 파일명.py로 스크립트를 실행합니다. 터미널에서 python hello.py를 입력하면 해당 파일이 실행됩니다.' },

                    { q: '가상환경(venv)을 사용하는 이유는?', choices: ['실행 속도 향상', '프로젝트별 독립적인 패키지 관리', '코드 암호화', '자동 백업'], answer: 1, explanation: '가상환경은 프로젝트별로 독립된 Python 환경을 만들어 패키지 버전 충돌을 방지합니다. python -m venv 이름으로 생성합니다.' },

                    { q: '다음 중 코드 에디터와 IDE의 차이점으로 올바른 것은?', choices: ['차이가 없다', 'IDE가 더 많은 기능(디버거, 빌드 등)을 통합 제공한다', '코드 에디터가 더 무겁다', 'IDE는 텍스트만 편집 가능하다'], answer: 1, explanation: 'IDE는 코드 편집 외에 디버거, 빌드 도구, 자동완성 등을 통합 제공합니다. 에디터는 가볍지만 확장으로 IDE에 가까워질 수 있습니다.' },

                    { q: 'Python을 웹 브라우저에서 실행할 수 있는 서비스는?', choices: ['Google Docs', 'Google Colab', 'Google Maps', 'Google Drive'], answer: 1, explanation: 'Google Colab은 브라우저에서 Python 코드를 작성·실행할 수 있는 무료 서비스입니다. 설치 없이 바로 사용 가능합니다.' },

                    { q: 'Jupyter Notebook의 특징이 아닌 것은?', choices: ['셀 단위 코드 실행', '마크다운 지원', '시각화 출력', 'C++ 전용 환경'], answer: 3, explanation: 'Jupyter Notebook은 Python용 대화형 환경입니다. C++ 전용이 아니며, 셀 단위 실행·마크다운·시각화를 지원합니다.' },

                    { q: '다음 명령어의 역할은?\npip list', choices: ['pip 설치', '설치된 패키지 목록 확인', '패키지 삭제', '패키지 업데이트'], answer: 1, explanation: 'pip list는 현재 환경에 설치된 모든 Python 패키지와 버전을 나열합니다.' },

                    { q: 'PATH 환경변수의 역할은?', choices: ['파일 내용 저장', '실행 파일을 찾을 디렉토리 목록 지정', '네트워크 설정', '화면 해상도 설정'], answer: 1, explanation: 'PATH는 OS가 명령어 실행 시 해당 프로그램을 찾는 디렉토리 목록입니다. Python이 PATH에 있어야 어디서든 python 명령을 사용할 수 있습니다.' },

                    { q: 'Python 2와 3이 동시에 설치된 경우, Python 3을 실행하려면?', choices: ['python', 'python3', 'py3', 'python_3'], answer: 1, explanation: '대부분의 시스템에서 python3 명령어로 명시적으로 Python 3을 실행합니다. Windows에서는 py -3도 사용 가능합니다.' },

                    { q: '다음 중 IDLE의 기능이 아닌 것은?', choices: ['코드 자동완성', '구문 강조(Syntax Highlighting)', '대화형 셸', '데이터베이스 관리'], answer: 3, explanation: 'IDLE은 코드 편집, 자동완성, 구문 강조, 대화형 셸을 제공하지만, 데이터베이스 관리 기능은 없습니다.' },

                    { q: '___에 들어갈 명령어는?\n"패키지를 최신 버전으로 업그레이드하려면 pip install --___ 패키지명"', choices: ['update', 'upgrade', 'latest', 'new'], answer: 1, explanation: 'pip install --upgrade 패키지명으로 이미 설치된 패키지를 최신 버전으로 업그레이드합니다.' },

                    { q: 'PyPI란?', choices: ['Python 에디터', 'Python 패키지 저장소(Python Package Index)', 'Python 문법 검사기', 'Python 디버거'], answer: 1, explanation: 'PyPI(Python Package Index)는 Python 패키지를 공유하는 공식 저장소입니다. pip가 여기서 패키지를 다운로드합니다.' },

                    { q: '가상환경 활성화 명령어(Windows)는?', choices: ['.venv/bin/activate', '.venv\\Scripts\\activate', 'source .venv/activate', 'venv start'], answer: 1, explanation: 'Windows에서는 .venv\Scripts\activate로 가상환경을 활성화합니다. 활성화하면 프롬프트 앞에 (.venv)가 표시됩니다.' },

                    { q: '다음 중 Python을 지원하는 온라인 코딩 환경이 아닌 것은?', choices: ['Replit', 'CodePen', 'Google Colab', 'Kaggle Notebooks'], answer: 1, explanation: 'CodePen은 HTML/CSS/JavaScript 전용 온라인 에디터입니다. Replit, Colab, Kaggle은 Python을 지원합니다.' },

                    { q: 'conda와 pip의 공통점은?', choices: ['둘 다 IDE이다', '둘 다 패키지 관리 도구이다', '둘 다 Google 제품이다', '둘 다 코드 에디터이다'], answer: 1, explanation: 'conda와 pip 모두 Python 패키지를 설치·관리하는 도구입니다. conda는 Anaconda에 포함되며 환경 관리도 지원합니다.' },

                    { q: '다음 에러 메시지의 원인은?\n"python은(는) 내부 또는 외부 명령...이 아닙니다"', choices: ['Python이 설치되지 않았거나 PATH에 추가되지 않았다', '코드에 오류가 있다', '인터넷이 연결되지 않았다', '하드디스크 용량 부족'], answer: 0, explanation: '이 에러는 Python이 설치되지 않았거나 PATH 환경변수에 Python 경로가 등록되지 않았을 때 발생합니다.' },

                    { q: 'requirements.txt 파일의 용도는?', choices: ['코드 실행 결과 저장', '프로젝트에 필요한 패키지 목록 기록', 'Python 설정 파일', '에러 로그 저장'], answer: 1, explanation: 'requirements.txt에 프로젝트가 필요로 하는 패키지와 버전을 기록합니다. pip install -r requirements.txt로 일괄 설치합니다.' },

                    { q: '터미널/CMD에서 현재 Python 경로를 확인하는 명령어는?', choices: ['python --path', 'where python (Windows) / which python (Mac/Linux)', 'find python', 'python --find'], answer: 1, explanation: 'Windows에서는 where python, Mac/Linux에서는 which python으로 Python 실행 파일의 위치를 확인합니다.' },

                    { q: 'Python REPL에서 exit()의 역할은?', choices: ['에러 발생', '대화형 모드 종료', '코드 초기화', '파일 저장'], answer: 1, explanation: 'exit() 또는 quit()을 입력하면 Python 대화형 모드를 종료합니다. Ctrl+Z(Windows) / Ctrl+D(Mac/Linux)도 사용 가능합니다.' },

                    { q: '들여쓰기에 탭과 공백 중 PEP 8이 권장하는 것은?', choices: ['탭', '공백 4칸', '공백 2칸', '상관없다'], answer: 1, explanation: 'PEP 8(Python 공식 스타일 가이드)은 들여쓰기에 공백 4칸을 권장합니다. 탭과 공백을 혼용하면 에러가 발생합니다.' },

                    { q: 'Python 스크립트 모드와 대화형 모드의 차이는?', choices: ['기능이 같다', '스크립트는 .py 파일을 실행, 대화형은 한 줄씩 입력·실행', '대화형이 더 빠르다', '스크립트 모드는 Windows 전용'], answer: 1, explanation: '스크립트 모드는 .py 파일에 코드를 작성 후 한 번에 실행합니다. 대화형 모드는 >>> 프롬프트에서 한 줄씩 입력하고 즉시 결과를 확인합니다.' }

                ]

            },

        ], related: ['u01', 'u03'],

    },

    {

        id: 'u03', category: 'intro', name: 'Unit 3. Hello, world!', hanja: 'Hello World',

        short: 'print 함수, IDLE 사용법, 소스 파일 실행', color: '#3b82f6', icon: 'output',

        sections: [

            { type: 'definition', title: '개요', content: 'print("Hello, world!")는 프로그래밍의 첫 번째 관문입니다. IDLE 대화형 셸과 스크립트 파일 두 가지 방식으로 실행할 수 있습니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: 'print()', desc: '화면에 값을 출력하는 내장 함수. 문자열은 따옴표로 감싸기' },

                    { label: 'IDLE 셸', desc: '>>> 프롬프트에서 바로 코드 입력 & 실행 가능' },

                    { label: '스크립트 파일', desc: '.py 파일에 코드를 저장하고 F5 또는 python 명령으로 실행' },

                    { label: '작은따옴표/큰따옴표', desc: "print(\'Hello\') = print(\"Hello\") — 둘 다 사용 가능" },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: '다음 코드의 출력 결과는?\nprint("Hello, World!")', choices: ['Hello, World', 'Hello, World!', 'hello, world!', '"Hello, World!"'], answer: 1, explanation: 'print() 함수는 따옴표 안의 문자열을 그대로 출력합니다. 따옴표 자체는 출력되지 않고, 느낌표까지 포함하여 Hello, World!가 출력됩니다.' },

                    { q: '다음 중 올바른 Python 출력문은?', choices: ['echo "Hello"', 'System.out.println("Hello")', 'print("Hello")', 'console.log("Hello")'], answer: 2, explanation: 'Python에서는 print() 함수로 출력합니다. echo는 쉘, System.out은 Java, console.log는 JavaScript의 출력 방식입니다.' },

                    { q: '다음 코드에서 에러가 발생하는 이유는?\nprint("Hello)', choices: ['Hello가 정의되지 않아서', '닫는 따옴표가 없어서', 'print 함수가 잘못되어서', '괄호가 잘못되어서'], answer: 1, explanation: '문자열은 반드시 열고 닫는 따옴표가 짝을 이루어야 합니다. "Hello"처럼 닫는 따옴표가 있어야 SyntaxError가 발생하지 않습니다.' },

                    { q: 'print()에서 작은따옴표와 큰따옴표의 차이는?', choices: ['큰따옴표만 사용 가능', '작은따옴표는 숫자용', '기능적 차이가 없다', '작은따옴표는 에러 발생'], answer: 2, explanation: 'Python에서 작은따옴표와 큰따옴표는 기능적으로 동일합니다. 단, 문자열 안에 따옴표를 쓸 때 서로 구분하면 편리합니다.' },

                    { q: '다음 코드의 출력 결과는?\nprint(3 + 4)', choices: ['3 + 4', '34', '7', 'Error'], answer: 2, explanation: '따옴표 없이 3 + 4를 전달하면 수식으로 계산됩니다. 결과인 7이 출력됩니다. "3 + 4"로 감싸면 문자열 "3 + 4"가 출력됩니다.' },

                    { q: '다음 코드의 출력은?\nprint("3 + 4")', choices: ['7', '3 + 4', '34', 'Error'], answer: 1, explanation: '따옴표로 감싸면 문자열로 취급되어 "3 + 4" 그대로 출력됩니다. 계산되지 않습니다.' },

                    { q: '___에 들어갈 코드는?\n___("안녕하세요")  # 안녕하세요 출력', choices: ['echo', 'say', 'print', 'output'], answer: 2, explanation: 'Python에서 화면 출력은 print() 함수를 사용합니다. echo, say, output은 Python에 없는 명령어입니다.' },

                    { q: '다음 코드의 출력은?\nprint("Hello", "World")', choices: ['HelloWorld', 'Hello World', 'Hello, World', 'Error'], answer: 1, explanation: 'print()에 여러 값을 쉼표로 구분하면 자동으로 공백(space)을 넣어 출력합니다. "Hello World"가 됩니다.' },

                    { q: '다음 코드의 출력은?\nprint("Hello" + "World")', choices: ['Hello World', 'HelloWorld', 'Hello+World', 'Error'], answer: 1, explanation: '+ 연산자는 문자열을 공백 없이 연결(concatenation)합니다. 결과는 "HelloWorld"입니다.' },

                    { q: '다음 코드에서 에러가 나는 부분은?\nprint("나이: " + 20)', choices: ['print 함수', '"나이: "', '+ 연산자로 문자열과 정수를 연결', '없음(정상 동작)'], answer: 2, explanation: '문자열과 정수를 + 로 직접 연결할 수 없습니다. TypeError 발생. str(20)으로 변환하거나 f-string을 사용해야 합니다.' },

                    { q: '위 에러를 수정하는 올바른 코드는?', choices: ['print("나이: " + str(20))', 'print("나이: " + int(20))', 'print("나이: " - 20)', 'print("나이: " + "20개")'], answer: 0, explanation: 'str(20)으로 정수를 문자열로 변환한 뒤 연결합니다. 또는 f"나이: {20}"처럼 f-string을 사용할 수 있습니다.' },

                    { q: '다음 코드의 출력은?\nprint("Python" * 3)', choices: ['Python3', 'PythonPythonPython', 'Python * 3', 'Error'], answer: 1, explanation: '문자열 * 정수는 문자열을 해당 횟수만큼 반복합니다. "Python"이 3번 반복되어 "PythonPythonPython"이 출력됩니다.' },

                    { q: '이스케이프 문자 \\n의 역할은?', choices: ['탭 삽입', '줄바꿈', '역슬래시 출력', '따옴표 출력'], answer: 1, explanation: '\n은 줄바꿈(newline) 이스케이프 문자입니다. print("A\nB")는 A와 B를 각각 다른 줄에 출력합니다.' },

                    { q: '다음 코드의 출력은?\nprint("A\\tB")', choices: ['A\\tB', 'A    B', 'AtB', 'Error'], answer: 1, explanation: '\t는 탭(Tab) 이스케이프 문자로, A와 B 사이에 탭 간격의 공백이 삽입됩니다.' },

                    { q: '다음 코드의 출력 결과는?\nprint("Hello\\nWorld")', choices: ['Hello\\nWorld', 'HellonWorld', 'Hello\nWorld (2줄)', 'Error'], answer: 2, explanation: '\n으로 인해 Hello 다음에 줄바꿈이 발생하여 두 줄로 출력됩니다. 1줄: Hello, 2줄: World' },

                    { q: 'print() 함수의 sep 매개변수 역할은?', choices: ['줄바꿈 문자 지정', '값 사이 구분자 지정', '들여쓰기 지정', '인코딩 지정'], answer: 1, explanation: 'sep은 여러 인수 사이의 구분 문자를 지정합니다. print("A","B",sep="-")는 "A-B"를 출력합니다.' },

                    { q: '다음 코드의 출력은?\nprint("A", "B", "C", sep="-")', choices: ['A B C', 'A-B-C', 'ABC', 'A,B,C'], answer: 1, explanation: 'sep="-"로 구분자를 하이픈으로 지정했으므로 각 값 사이에 - 가 들어가 "A-B-C"가 출력됩니다.' },

                    { q: 'print() 함수의 end 매개변수 역할은?', choices: ['출력 시작 문자 지정', '출력 끝에 추가할 문자 지정', '반복 횟수 지정', '문자열 인코딩'], answer: 1, explanation: 'end는 print() 출력 끝에 추가할 문자를 지정합니다. 기본값은 "\n"(줄바꿈)이며, end=""로 하면 줄바꿈 없이 이어서 출력됩니다.' },

                    { q: '다음 코드의 출력은?\nprint("A", end=" ")\nprint("B")', choices: ['A\nB', 'A B', 'AB', 'A, B'], answer: 1, explanation: '첫 print의 end=" "로 줄바꿈 대신 공백이 추가됩니다. 따라서 한 줄에 "A B"가 출력됩니다.' },

                    { q: '___에 들어갈 코드는?\nprint("I love", ___)  # 출력: I love Python', choices: ['"Python"', 'Python', '(Python)', '[Python]'], answer: 0, explanation: '문자열은 따옴표로 감싸야 합니다. "Python"을 전달하면 "I love Python"이 출력됩니다. 따옴표 없으면 변수로 인식합니다.' },

                    { q: '다음 코드에서 에러가 발생하는 이유는?\nprint(Hello)', choices: ['print 오타', '괄호 누락', 'Hello가 따옴표 없이 변수로 인식되는데 정의되지 않음', '들여쓰기 오류'], answer: 2, explanation: '따옴표로 감싸지 않은 Hello는 변수명으로 인식됩니다. Hello라는 변수가 정의되지 않았으므로 NameError가 발생합니다.' },

                    { q: '주석(#)의 올바른 설명은?', choices: ['코드를 더 빠르게 실행', '인터프리터가 무시하는 설명문', '화면에 출력되는 텍스트', '에러를 발생시키는 코드'], answer: 1, explanation: '#으로 시작하는 줄은 주석으로, 인터프리터가 무시합니다. 코드 설명이나 메모를 남길 때 사용합니다.' },

                    { q: '다음 코드의 출력은?\n# print("Hello")\nprint("World")', choices: ['Hello\nWorld', 'World', 'Hello', 'Error'], answer: 1, explanation: '첫 줄은 # 주석이라 무시됩니다. 두 번째 줄만 실행되어 "World"만 출력됩니다.' },

                    { q: 'f-string으로 올바르게 변수를 출력하는 코드는?', choices: ['print("이름: {name}")', 'print(f"이름: {name}")', 'print("이름: " + {name})', 'print(f"이름: name")'], answer: 1, explanation: 'f-string은 f"..." 안에서 {변수명}으로 값을 삽입합니다. f 접두사가 없으면 중괄호가 그대로 출력됩니다.' },

                    { q: '다음 코드의 출력은?\nname = "Python"\nprint(f"Hello, {name}!")', choices: ['Hello, name!', 'Hello, {name}!', 'Hello, Python!', 'Error'], answer: 2, explanation: 'f-string이므로 {name}이 변수 name의 값인 "Python"으로 대체됩니다. 결과: "Hello, Python!"' },

                    { q: '여러 줄 문자열을 만드는 방법은?', choices: ['\\n만 사용', '삼중 따옴표(세 개의 따옴표)', '{ } 사용', '불가능'], answer: 1, explanation: '삼중 따옴표(큰따옴표 3개 또는 작은따옴표 3개)를 사용하면 여러 줄에 걸친 문자열을 만들 수 있습니다.' },

                    { q: '다음 코드의 출력은?\nprint("Hello", end="!")\nprint("World")', choices: ['Hello!World', 'Hello! World', 'Hello!\nWorld', 'HelloWorld!'], answer: 0, explanation: 'end="!"로 줄바꿈 대신 !가 추가됩니다. 첫 print 후 "Hello!" 상태에서 바로 "World"가 이어져 "Hello!World"가 됩니다.' },

                    { q: '다음 코드의 출력은?\nprint("1" + "2")', choices: ['3', '12', '1 + 2', '1 2'], answer: 1, explanation: '"1"과 "2"는 문자열이므로 + 연산자가 연결 연산을 합니다. 결과는 문자열 "12"입니다. 숫자 덧셈이 아닙니다.' },

                    { q: '다음 코드 중 SyntaxError가 발생하는 것은?', choices: ['print("Hello")', "print(\'Hello\')", 'print(Hello")', 'print("He" + "llo")'], answer: 2, explanation: 'print(Hello")는 여는 따옴표가 없고 닫는 따옴표만 있어 SyntaxError가 발생합니다. 따옴표는 반드시 짝을 이루어야 합니다.' },

                    { q: '다음 코드의 출력은?\nprint(type("Hello"))', choices: ['Hello', 'str', "\u003cclass 'str'\u003e", 'string'], answer: 2, explanation: "type() 함수는 값의 자료형을 반환합니다. 문자열의 타입은 \u003cclass 'str'\u003e로 표시됩니다." }

                ]

            },

        ], related: ['u02', 'u04'],

    },



    {

        id: 'u04', category: 'intro', name: 'Unit 4. 기본 문법', hanja: 'Basic Syntax',

        short: '세미콜론, 주석, 들여쓰기, 코드 블록', color: '#3b82f6', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: 'Python은 세미콜론 대신 줄바꿈으로 문장을 구분하고, 들여쓰기로 코드 블록을 표현합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '세미콜론', desc: '선택사항. 한 줄에 여러 문장 쓸 때만 사용' },

                    { label: '주석 #', desc: '# 뒤의 내용은 실행되지 않음' },

                    { label: '들여쓰기', desc: '공백 4칸이 표준. 같은 블록은 동일한 들여쓰기 필수' },

                    { label: '코드 블록', desc: 'if, for, def 등 뒤에 콜론(:)과 들여쓰기로 블록 구성' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: '다음 코드에서 에러가 발생하는 이유는?\nif True\n    print("OK")', choices: ['True가 잘못됨', 'if문 끝에 콜론(:)이 빠짐', 'print 오류', '들여쓰기 오류'], answer: 1, explanation: 'Python에서 if, for, def 등의 구문 끝에는 반드시 콜론(:)이 필요합니다. if True: 처럼 작성해야 합니다.' },

                    { q: 'Python에서 코드 블록을 구분하는 방법은?', choices: ['중괄호 { }', '들여쓰기(indentation)', '세미콜론 ;', '괄호 ( )'], answer: 1, explanation: 'Python은 들여쓰기로 코드 블록을 구분합니다. 보통 공백 4칸을 사용하며, 이는 다른 언어의 중괄호 역할을 합니다.' },

                    { q: '다음 코드의 실행 결과는?\nprint(10 // 3)', choices: ['3.33', '3', '4', '1'], answer: 1, explanation: '// 는 정수 나눗셈(몫) 연산자입니다. 10 ÷ 3 = 3.33에서 소수점을 버려 3이 됩니다.' },

                    { q: '다음 중 올바른 변수명은?', choices: ['2name', 'my-var', '_count', 'class'], answer: 2, explanation: '변수명은 문자나 _로 시작해야 합니다. 숫자로 시작(2name), 하이픈(my-var), 예약어(class) 사용은 불가합니다.' },

                    { q: '다음 코드에서 에러가 나는 것은?', choices: ['x = 10', 'y = "hello"', '3z = 5', '_a = True'], answer: 2, explanation: '변수명은 숫자로 시작할 수 없습니다. 3z는 SyntaxError를 발생시킵니다. x, y, _a는 모두 유효한 변수명입니다.' },

                    { q: '___에 들어갈 연산자는?\n17 ___ 5 == 2  # 나머지 연산', choices: ['/', '//', '%', '**'], answer: 2, explanation: '% 는 나머지(modulo) 연산자입니다. 17 % 5 = 2 (17을 5로 나눈 나머지). 나눗셈(/)과 구별해야 합니다.' },

                    { q: '다음 코드의 결과는?\nprint(2 ** 10)', choices: ['20', '100', '1024', '12'], answer: 2, explanation: '** 는 거듭제곱 연산자입니다. 2 ** 10 = 2의 10승 = 1024입니다.' },

                    { q: 'Python 예약어(키워드)가 아닌 것은?', choices: ['if', 'while', 'print', 'return'], answer: 2, explanation: 'print는 내장 함수이지 예약어가 아닙니다. if, while, return은 Python 예약어로 변수명에 사용할 수 없습니다.' },

                    { q: '세미콜론(;)의 역할은?', choices: ['필수 문장 종료 기호', '한 줄에 여러 문장 작성 가능', '주석 표시', '블록 구분'], answer: 1, explanation: 'Python에서 세미콜론은 선택적이며, 한 줄에 여러 문장을 쓸 때 사용합니다. 예: x = 1; y = 2. 보통 권장하지 않습니다.' },

                    { q: '다음 코드의 출력은?\nx = 5\ny = x\nx = 10\nprint(y)', choices: ['10', '5', '15', 'Error'], answer: 1, explanation: 'y = x 시점에 y에 5가 복사됩니다. 이후 x를 10으로 바꿔도 y는 영향받지 않습니다. 정수는 값이 복사됩니다.' },

                    { q: '여러 줄에 걸쳐 코드를 작성할 때 사용하는 기호는?', choices: [';', '\\(역슬래시)', '#', '&'], answer: 1, explanation: '역슬래시(\)를 줄 끝에 붙이면 다음 줄과 이어서 하나의 문장으로 처리됩니다. 괄호 안에서는 자동으로 줄바꿈 가능합니다.' },

                    { q: '다음 코드의 결과는?\nprint(10 / 3)', choices: ['3', '3.33', '3.3333333333333335', '3.0'], answer: 2, explanation: '/ 는 일반 나눗셈으로 항상 실수(float) 결과를 반환합니다. 10 / 3 = 3.3333...입니다.' },

                    { q: 'pass 키워드의 용도는?', choices: ['프로그램 종료', '아무것도 하지 않는 빈 문장', '에러 무시', '반복 건너뛰기'], answer: 1, explanation: 'pass는 문법적으로 코드가 필요하지만 아무 동작도 하지 않을 때 사용합니다. 빈 함수나 클래스 정의 시 자주 쓰입니다.' },

                    { q: '다음 코드에서 IndentationError가 발생하는 곳은?\nif True:\nprint("Hello")', choices: ['if True:', 'print("Hello")', '없음', ':'], answer: 1, explanation: 'if 아래의 코드 블록은 반드시 들여쓰기가 필요합니다. print 앞에 공백 4칸을 추가해야 합니다.' },

                    { q: '다음 중 올바른 들여쓰기는?', choices: ['탭과 공백 혼용', '공백 3칸', '공백 4칸 (PEP 8 권장)', '공백 1칸'], answer: 2, explanation: 'PEP 8 스타일 가이드는 공백 4칸을 권장합니다. 탭과 공백을 혼용하면 TabError가 발생할 수 있습니다.' },

                    { q: '다음 코드의 출력은?\nprint(True + True)', choices: ['TrueTrue', '2', '1', 'Error'], answer: 1, explanation: 'Python에서 True는 정수 1, False는 0으로 취급됩니다. True + True = 1 + 1 = 2입니다.' },

                    { q: 'None의 의미는?', choices: ['0', '빈 문자열', '값이 없음을 나타내는 특수 값', 'False'], answer: 2, explanation: 'None은 "아무 값도 없다"를 나타내는 Python의 특수 객체입니다. 함수가 명시적으로 return하지 않으면 None을 반환합니다.' },

                    { q: '___에 들어갈 기호는?\nx = 5  ___ x에 5를 저장', choices: ['==', '=', ':=', '<='], answer: 1, explanation: '= 는 대입 연산자로 오른쪽 값을 왼쪽 변수에 저장합니다. ==는 비교 연산자이므로 구별해야 합니다.' },

                    { q: '다음 코드의 결과는?\nprint(type(3.14))', choices: ["<class \'int\'>", "<class \'float\'>", "<class \'str\'>", "<class \'double\'>"], answer: 1, explanation: '3.14는 소수점이 있는 실수이므로 float 타입입니다. Python에는 double이 없고 float가 배정밀도를 사용합니다.' },

                    { q: '대소문자 구분에 대한 올바른 설명은?', choices: ['Python은 대소문자를 구분하지 않는다', 'True와 true는 같다', 'Print와 print는 다르다', 'IF와 if는 같다'], answer: 2, explanation: 'Python은 대소문자를 엄격히 구분합니다. Print ≠ print, True ≠ true, IF ≠ if입니다.' },

                    { q: '여러 변수에 동시에 값을 대입하는 방법은?', choices: ['a = 1, b = 2', 'a, b = 1, 2', 'a = b = 1, 2', '(a)(b) = 1, 2'], answer: 1, explanation: 'a, b = 1, 2로 여러 변수에 동시 대입 가능합니다. a에 1, b에 2가 저장됩니다.' },

                    { q: '다음 코드의 출력은?\na, b = 10, 20\na, b = b, a\nprint(a, b)', choices: ['10 20', '20 10', '10 10', 'Error'], answer: 1, explanation: 'a, b = b, a는 두 변수의 값을 교환합니다. Python만의 간편한 스왑 방법으로, 임시 변수가 필요 없습니다.' },

                    { q: '다음 코드에서 에러가 나는 이유는?\n3 + "5"', choices: ['3이 문자열이라', '정수와 문자열을 더할 수 없어서', '"5"가 숫자라서', '+ 연산자가 없어서'], answer: 1, explanation: 'Python에서 정수(int)와 문자열(str)은 + 로 직접 더할 수 없습니다. int("5") 또는 str(3)으로 형변환해야 합니다.' },

                    { q: '한 줄 주석과 여러 줄 주석의 방법은?', choices: ['# (한 줄), /* */ (여러 줄)', '# (한 줄), 삼중 따옴표 (여러 줄)', '// (한 줄), # (여러 줄)', '-- (한 줄), ## (여러 줄)'], answer: 1, explanation: '# 으로 한 줄 주석, 삼중 따옴표(큰따옴표 3개)로 여러 줄 주석 처리합니다. /* */은 C/Java 스타일입니다.' },

                    { q: '다음 코드의 결과는?\nprint(10 % 3)', choices: ['3', '1', '0', '3.33'], answer: 1, explanation: '% 는 나머지 연산자입니다. 10을 3으로 나눈 나머지는 1입니다. (10 = 3×3 + 1)' },

                    { q: '증감 연산자 ++가 Python에서 동작하지 않는 이유는?', choices: ['Python 버전이 낮아서', 'Python에 ++ 연산자가 없어서', '변수가 정의되지 않아서', '괄호가 필요해서'], answer: 1, explanation: 'Python은 C/Java와 달리 ++ 연산자를 지원하지 않습니다. 대신 x += 1을 사용합니다.' },

                    { q: '다음 코드의 출력은?\nx = 5\nx += 3\nprint(x)', choices: ['5', '3', '8', '53'], answer: 2, explanation: 'x += 3은 x = x + 3과 같습니다. x가 5이므로 5 + 3 = 8이 됩니다.' },

                    { q: 'del 키워드의 역할은?', choices: ['변수 값을 0으로', '변수를 삭제', '변수를 출력', '변수를 복사'], answer: 1, explanation: 'del 변수명은 해당 변수를 메모리에서 삭제합니다. 삭제 후 접근하면 NameError가 발생합니다.' },

                    { q: '다음 코드의 결과는?\nprint(abs(-7))', choices: ['-7', '7', '0', 'Error'], answer: 1, explanation: 'abs()는 절댓값을 반환하는 내장 함수입니다. abs(-7) = 7입니다.' },

                    { q: '다음 코드의 출력은?\nprint(round(3.567, 1))', choices: ['3.5', '3.6', '4', '3.57'], answer: 1, explanation: 'round(숫자, 소수자릿수)는 반올림합니다. round(3.567, 1)은 소수 첫째 자리까지, 즉 3.6입니다.' }

                ]

            },

        ], related: ['u03', 'u05'],

    },



    // ──────── BASIC (Unit 5~9) ────────

    {

        id: 'u05', category: 'basic', name: 'Unit 5. 숫자 계산하기', hanja: 'Numeric Calculation',

        short: '정수·실수 연산, 산술 연산자, 괄호 우선순위', color: '#10b981', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: 'Python에서 +, -, *, / 등 산술 연산자로 숫자를 계산합니다. //는 몫, %는 나머지, **는 거듭제곱입니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '사칙연산', desc: '+ 덧셈, - 뺄셈, * 곱셈, / 나눗셈 (항상 실수 결과)' },

                    { label: '// 몫', desc: '정수 나눗셈. 7 // 2 = 3' },

                    { label: '% 나머지', desc: '7 % 2 = 1' },

                    { label: '** 거듭제곱', desc: '2 ** 10 = 1024' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: '다음 코드의 출력은?\nx = 10\nprint(x)', choices: ['x', '10', '"10"', 'Error'], answer: 1, explanation: 'x에 10이 저장되어 있으므로 print(x)는 x의 값인 10을 출력합니다. 따옴표 없이 x를 쓰면 변수로 인식됩니다.' },

                    { q: '변수 이름 규칙으로 올바르지 않은 것은?', choices: ['소문자로 시작 가능', '숫자로 시작 가능', '밑줄(_)로 시작 가능', '대문자로 시작 가능'], answer: 1, explanation: '변수명은 숫자로 시작할 수 없습니다. 문자(대소문자)나 밑줄(_)로 시작해야 하며, 예약어는 사용 불가합니다.' },

                    { q: '다음 코드의 출력은?\nname = "Python"\nprint(type(name))', choices: ["<class \'str\'>", "<class \'int\'>", "str", "Python"], answer: 0, explanation: "type()은 변수의 자료형을 반환합니다. 문자열 'Python'의 타입은 <class \'str\'>입니다." },

                    { q: '다음 코드에서 x의 값은?\nx = 5\nx = x + 3\nx = x * 2', choices: ['16', '13', '11', '8'], answer: 0, explanation: 'x=5 → x=5+3=8 → x=8*2=16. 변수는 마지막으로 대입된 값을 가집니다.' },

                    { q: '___에 들어갈 코드는?\nx = 10\ny = 20\nz = ___  # z에 x와 y의 합 저장', choices: ['x + y', '"x + y"', 'x, y', 'add(x, y)'], answer: 0, explanation: 'x + y는 변수 x와 y의 값을 더합니다. 따옴표로 감싸면 문자열이 되므로 주의합니다.' },

                    { q: '동적 타이핑의 의미는?', choices: ['변수 선언 시 타입 명시 필수', '실행 중에 변수의 타입이 자동 결정', '타입 변경 불가', '정적 분석 도구 사용'], answer: 1, explanation: '동적 타이핑은 변수에 값을 대입할 때 자동으로 타입이 결정됩니다. x = 5(int) 후 x = "hi"(str)도 가능합니다.' },

                    { q: '다음 코드의 결과는?\nx = "Hello"\nx = 100\nprint(type(x))', choices: ["<class \'str\'>", "<class \'int\'>", "Error", "<class \'float\'>"], answer: 1, explanation: 'x는 처음 str이었지만 100을 대입하면서 int로 바뀝니다. 동적 타이핑이므로 타입이 자유롭게 변경됩니다.' },

                    { q: '상수(constant)를 Python에서 표현하는 관례는?', choices: ['const 키워드 사용', '대문자와 밑줄로 변수명 작성', 'final 키워드 사용', '# 으로 표시'], answer: 1, explanation: 'Python에는 상수 키워드가 없습니다. 대문자와 밑줄(예: MAX_SIZE = 100)로 상수임을 표시하는 것이 관례입니다.' },

                    { q: '다음 코드의 출력은?\na = b = c = 0\nprint(a, b, c)', choices: ['0', '0 0 0', 'a b c', 'Error'], answer: 1, explanation: 'a = b = c = 0은 세 변수에 모두 0을 대입합니다. print에서 공백으로 구분되어 0 0 0이 출력됩니다.' },

                    { q: '변수 이름으로 사용할 수 없는 것은?', choices: ['_name', 'my_var2', 'for', 'Name'], answer: 2, explanation: 'for는 Python 예약어(반복문)이므로 변수명으로 사용할 수 없습니다. SyntaxError가 발생합니다.' },

                    { q: '다음 코드의 출력은?\ntemp = "ice"\ntemp = 0\ntemp = True\nprint(temp)', choices: ['ice', '0', 'True', 'Error'], answer: 2, explanation: '변수는 마지막에 대입한 값을 가집니다. temp에 "ice"→0→True 순서로 대입했으므로 최종 값은 True입니다.' },

                    { q: '다음 코드에서 id(x)의 의미는?', choices: ['변수명 출력', '변수의 메모리 주소(고유 식별자)', '변수의 타입', '변수의 크기'], answer: 1, explanation: 'id() 함수는 객체의 메모리 상 고유 식별자(주소)를 반환합니다. 같은 값이라도 다른 객체면 다른 id를 가질 수 있습니다.' },

                    { q: '다음 코드의 실행 결과는?\nx = 5\ny = 5\nprint(x is y)', choices: ['True', 'False', '5', 'Error'], answer: 0, explanation: 'Python은 작은 정수(-5~256)를 캐싱하므로 x와 y가 같은 객체를 참조합니다. 따라서 is 비교 결과가 True입니다.' },

                    { q: '다음 코드는 무엇을 하나?\nx, y, z = 1, 2, 3', choices: ['에러 발생', 'x=1, y=2, z=3 대입', '모두 같은 값 대입', '리스트 생성'], answer: 1, explanation: '여러 변수에 동시에 다른 값을 대입하는 언패킹입니다. x에 1, y에 2, z에 3이 저장됩니다.' },

                    { q: '다음 코드에서 에러가 나는 이유는?\nx, y = 1, 2, 3', choices: ['값이 부족해서', '변수가 많아서', '변수(2개)와 값(3개)의 수가 맞지 않아서', '쉼표 오류'], answer: 2, explanation: '왼쪽 변수 수와 오른쪽 값의 수가 일치해야 합니다. 2개 변수에 3개 값을 대입하면 ValueError가 발생합니다.' },

                    { q: '___에 들어갈 코드는?\nage = 20\nprint(f"나이: {___}")  # 출력: 나이: 20', choices: ['20', 'age', '"age"', 'str(age)'], answer: 1, explanation: 'f-string의 { } 안에 변수명을 넣으면 변수의 값이 삽입됩니다. {age}는 age의 값 20으로 대체됩니다.' },

                    { q: '다음 코드의 출력은?\nPI = 3.14\nprint(type(PI))', choices: ["<class \'int\'>", "<class \'float\'>", "<class \'double\'>", "<class \'decimal\'>"], answer: 1, explanation: '3.14는 소수점이 있으므로 float(실수) 타입입니다. Python에는 double이 따로 없고 float가 64비트 배정밀도입니다.' },

                    { q: '다음 코드의 출력은?\nx = 10\ndel x\nprint(x)', choices: ['10', '0', 'None', 'NameError'], answer: 3, explanation: 'del x로 변수를 삭제했으므로, 이후 x에 접근하면 NameError: name x is not defined가 발생합니다.' },

                    { q: '스네이크 케이스(snake_case)의 예시는?', choices: ['myVariable', 'MyVariable', 'my_variable', 'MYVARIABLE'], answer: 2, explanation: '스네이크 케이스는 소문자와 밑줄로 단어를 구분합니다(my_variable). Python에서 변수·함수명에 권장되는 방식입니다.' },

                    { q: '전역 변수와 지역 변수의 차이는?', choices: ['차이 없음', '전역은 프로그램 전체, 지역은 함수 내에서만 접근 가능', '전역이 항상 더 빠름', '지역 변수만 사용 가능'], answer: 1, explanation: '전역 변수는 프로그램 어디서든 접근 가능하고, 지역 변수는 정의된 함수 내에서만 사용할 수 있습니다.' },

                    { q: '다음 코드의 출력은?\ncount = 0\ncount += 1\ncount += 1\ncount += 1\nprint(count)', choices: ['0', '1', '3', 'Error'], answer: 2, explanation: 'count가 0에서 시작하여 += 1이 3번 실행되어 최종값은 3입니다. += 는 누적 덧셈 연산자입니다.' },

                    { q: '다음 중 불리언(bool) 타입의 값은?', choices: ['0', '"True"', 'True', 'None'], answer: 2, explanation: 'True와 False만 bool 타입입니다. "True"는 문자열, 0은 정수, None은 NoneType입니다.' },

                    { q: '다음 코드의 출력은?\nprint(bool(0), bool(""), bool(1))', choices: ['True True False', 'False False True', '0 "" 1', 'Error'], answer: 1, explanation: 'bool()에서 0, 빈 문자열""은 False, 그 외는 True입니다. 따라서 False False True가 출력됩니다.' },

                    { q: '다음 코드의 결과는?\nx = "3"\ny = int(x) + 2\nprint(y)', choices: ['32', '5', '"5"', 'Error'], answer: 1, explanation: 'int("3")은 문자열 "3"을 정수 3으로 변환합니다. 3 + 2 = 5가 됩니다.' },

                    { q: '변수 값을 교환하는 가장 Pythonic한 방법은?', choices: ['temp = a; a = b; b = temp', 'a, b = b, a', 'swap(a, b)', 'a = b; b = a'], answer: 1, explanation: 'a, b = b, a는 Python의 언패킹을 이용한 간단한 값 교환 방법입니다. 임시 변수가 필요 없습니다.' },

                    { q: 'is와 ==의 차이는?', choices: ['같은 기능', 'is는 객체 동일성, ==는 값 동일성', 'is가 더 빠름', '==는 문자열에만 사용'], answer: 1, explanation: 'is는 같은 객체인지(메모리 주소 비교), ==는 같은 값인지를 비교합니다. [1,2] == [1,2]는 True, is는 False입니다.' },

                    { q: '다음 코드의 출력은?\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)', choices: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'Error'], answer: 1, explanation: 'b = a는 같은 리스트 객체를 참조합니다(얕은 복사). b를 변경하면 a도 바뀝니다. 독립 복사는 a.copy()를 사용합니다.' },

                    { q: '파이썬에서 변수의 스코프(scope)를 확인하는 함수는?', choices: ['scope()', 'dir()', 'vars()', 'globals() / locals()'], answer: 3, explanation: 'globals()는 전역 변수, locals()는 지역 변수 딕셔너리를 반환합니다. 현재 스코프의 변수 목록을 확인할 수 있습니다.' },

                    { q: '다음 코드의 출력은?\nprint(isinstance(3.14, float))', choices: ['True', 'False', 'float', 'Error'], answer: 0, explanation: 'isinstance(값, 타입)은 값이 해당 타입의 인스턴스인지 True/False로 반환합니다. 3.14는 float이므로 True입니다.' },

                    { q: 'Python에서 변수 삭제와 값을 None으로 설정하는 것의 차이는?', choices: ['차이 없음', 'del은 변수 자체 삭제, None은 값만 비움', 'None이 더 위험', 'del은 불가능'], answer: 1, explanation: 'del x는 변수 x를 완전히 삭제하여 접근 불가. x = None은 변수는 존재하되 값이 None으로, 접근 시 에러가 나지 않습니다.' }

                ]

            },

        ], related: ['u04', 'u06'],

    },

    {

        id: 'u06', category: 'intro', name: 'Unit 6. 변수와 입력', hanja: 'Variables & Input',

        short: '변수 선언, input() 함수, 타입 변환', color: '#3b82f6', icon: 'maintenance',

        sections: [

            { type: 'definition', title: '개요', content: '변수는 값을 저장하는 공간이며 =로 할당합니다. input()으로 사용자 입력을 받고, int(), float()로 타입 변환합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '변수 할당', desc: 'x = 10 — 타입 자동 결정' },

                    { label: 'input()', desc: '사용자 입력을 받는 함수. 항상 str 반환' },

                    { label: '타입 변환', desc: 'int(), float(), str()' },

                    { label: '변수명 규칙', desc: '영문, 숫자, _ 사용. 숫자시작 불가. 키워드 불가' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: '사용자로부터 입력을 받는 함수는?', choices: ['print()', 'input()', 'scan()', 'read()'], answer: 1, explanation: 'input() 함수는 사용자의 키보드 입력을 받아 문자열로 반환합니다. 괄호 안에 안내 메시지를 넣을 수 있습니다.' },

                    { q: 'input()의 반환 타입은?', choices: ['int', 'float', 'str', '입력값에 따라 다름'], answer: 2, explanation: 'input()은 항상 문자열(str)을 반환합니다. 숫자를 입력해도 "123"처럼 문자열입니다. 연산하려면 int()나 float()로 변환해야 합니다.' },

                    { q: '사용자가 25를 입력했을 때 결과는?\nage = input("나이: ")\nprint(type(age))', choices: ["<class \'int\'>", "<class \'str\'>", "<class \'float\'>", "25"], answer: 1, explanation: 'input()은 항상 문자열을 반환하므로 25를 입력해도 type은 str입니다. 정수로 쓰려면 int(input())을 사용합니다.' },

                    { q: '___에 들어갈 코드는?\nnum = ___(input("숫자: "))  # 정수로 입력받기', choices: ['str', 'int', 'float', 'bool'], answer: 1, explanation: 'input()은 문자열을 반환하므로 int()로 감싸서 정수로 변환합니다. int(input("숫자: "))는 일반적인 정수 입력 패턴입니다.' },

                    { q: '다음 코드에서 사용자가 "abc"를 입력하면?\nnum = int(input("숫자: "))', choices: ['abc 출력', '0 저장', 'ValueError 발생', 'None 저장'], answer: 2, explanation: 'int()는 숫자 형태가 아닌 문자열을 변환할 수 없어 ValueError가 발생합니다. try-except로 처리하는 것이 바람직합니다.' },

                    { q: '다음 코드에서 3과 5를 입력하면 결과는?\na = input()\nb = input()\nprint(a + b)', choices: ['8', '35', '3 5', 'Error'], answer: 1, explanation: 'input()은 문자열을 반환하므로 "3" + "5"는 문자열 연결이 되어 "35"가 출력됩니다. 숫자 덧셈이 아닙니다.' },

                    { q: '위 코드에서 숫자 덧셈이 되게 하려면?', choices: ['a + b를 a - b로', 'int(a) + int(b)로 변경', 'a * b로 변경', 'str(a) + str(b)로 변경'], answer: 1, explanation: 'int()로 문자열을 정수로 변환한 후 더하면 됩니다. int("3") + int("5") = 8이 됩니다.' },

                    { q: 'input("메시지")에서 "메시지"의 역할은?', choices: ['변수명 지정', '사용자에게 보여줄 안내문(프롬프트)', '기본값 설정', '입력 타입 지정'], answer: 1, explanation: 'input()의 인수는 사용자에게 표시되는 안내 메시지(프롬프트)입니다. 예: input("이름: ")은 "이름: "을 보여주고 입력을 기다립니다.' },

                    { q: '실수(소수)를 입력받으려면?', choices: ['int(input())', 'float(input())', 'decimal(input())', 'real(input())'], answer: 1, explanation: 'float(input())으로 실수를 입력받습니다. 예: "3.14"를 입력하면 float 타입 3.14가 됩니다.' },

                    { q: '다음 코드에서 Kim을 입력하면 출력은?\nname = input("이름: ")\nprint(f"안녕, {name}!")', choices: ['안녕, name!', '안녕, Kim!', '안녕, {name}!', 'Error'], answer: 1, explanation: 'f-string의 {name}이 input()으로 받은 "Kim"으로 대체되어 "안녕, Kim!"이 출력됩니다.' },

                    { q: 'split()의 역할은?', choices: ['문자열 연결', '문자열을 구분자로 나누어 리스트 반환', '문자열 정렬', '문자열 삭제'], answer: 1, explanation: 'split()은 문자열을 공백(기본값) 또는 지정 구분자로 나누어 리스트로 반환합니다. "1 2 3".split() → ["1","2","3"]' },

                    { q: '다음 코드에서 "10 20"을 입력하면 a, b의 값은?\na, b = input().split()', choices: ['a=10, b=20 (정수)', 'a="10", b="20" (문자열)', 'Error', 'a="10 20", b=""'], answer: 1, explanation: 'split()은 공백으로 나누어 ["10", "20"]을 반환합니다. 언패킹으로 a="10", b="20"이 됩니다. 문자열임에 주의!' },

                    { q: '___에 들어갈 코드는?\na, b = map(___, input().split())  # 정수로 입력받기', choices: ['str', 'int', 'float', 'list'], answer: 1, explanation: 'map(int, ...)은 각 요소에 int()를 적용합니다. "10 20"을 입력하면 a=10, b=20 (정수)이 됩니다.' },

                    { q: 'map() 함수의 역할은?', choices: ['딕셔너리 생성', '반복 가능한 객체의 각 요소에 함수를 적용', '지도 표시', '파일 매핑'], answer: 1, explanation: 'map(함수, 반복가능객체)는 각 요소에 함수를 적용한 결과를 반환합니다. map(int, ["1","2"]) → 정수 1, 2로 변환됩니다.' },

                    { q: '여러 줄에 걸쳐 입력받으려면?', choices: ['input()을 여러 번 호출', 'input(3)으로 3줄 입력', 'multiline() 사용', 'readline() 사용'], answer: 0, explanation: 'Python의 input()은 한 번에 한 줄만 읽습니다. 여러 줄이 필요하면 input()을 반복 호출하거나 반복문을 사용합니다.' },

                    { q: '다음 코드의 출력은? (입력: 7)\nx = int(input())\nprint(x * 3)', choices: ['7', '21', '777', 'Error'], answer: 1, explanation: 'int(input())로 정수 7을 받고, 7 * 3 = 21이 출력됩니다. 문자열이었다면 "777"이 되었을 것입니다.' },

                    { q: '다음 코드에서 에러가 나지 않는 입력값은?\nage = int(input("나이: "))', choices: ['"twenty"', '"20살"', '"20"', '"3.5"'], answer: 2, explanation: 'int()는 정수 형태의 문자열만 변환합니다. "20"은 가능하지만, "twenty", "20살", "3.5"는 모두 ValueError를 발생시킵니다.' },

                    { q: 'eval() 함수의 역할과 위험성은?', choices: ['안전한 입력 함수', '문자열을 코드로 실행하며 보안 위험', '타입 변환 함수', '출력 함수'], answer: 1, explanation: 'eval()은 문자열을 Python 코드로 실행합니다. 사용자 입력에 사용하면 악성 코드 실행 위험이 있어 권장하지 않습니다.' },

                    { q: '다음 코드에서 "hello"를 입력하면?\ndata = input()\nprint(data.upper())', choices: ['hello', 'HELLO', 'Hello', 'Error'], answer: 1, explanation: 'upper()는 문자열을 모두 대문자로 변환합니다. "hello".upper() = "HELLO"입니다.' },

                    { q: '다음 코드에서 " Python "을 입력하면?\ndata = input().strip()\nprint(f"[{data}]")', choices: ['[ Python ]', '[Python]', '[ Python]', 'Error'], answer: 1, explanation: 'strip()은 문자열 양쪽 공백을 제거합니다. " Python "이 "Python"이 되어 "[Python]"이 출력됩니다.' },

                    { q: '다음 코드에서 "3,5,7"을 입력하면?\nnums = input().split(",")\nprint(nums)', choices: ["['3,5,7']", "['3', '5', '7']", "[3, 5, 7]", "Error"], answer: 1, explanation: 'split(",")은 쉼표를 기준으로 문자열을 나눕니다. 결과는 ["3", "5", "7"] (문자열 리스트)입니다.' },

                    { q: '___에 들어갈 코드는?\nnums = list(map(int, input().split()))\nprint(___(nums))  # 입력한 숫자들의 합계', choices: ['len', 'sum', 'max', 'count'], answer: 1, explanation: 'sum()은 리스트의 모든 요소를 합산합니다. "1 2 3" 입력 시 nums=[1,2,3], sum(nums)=6이 됩니다.' },

                    { q: 'input()과 sys.stdin의 차이는?', choices: ['같은 기능', 'sys.stdin이 대량 입력에 더 빠름', 'input()이 더 빠름', 'sys.stdin은 Python에 없음'], answer: 1, explanation: 'sys.stdin.readline()은 input()보다 빠르며, 대량의 입력을 처리할 때 유리합니다. 단, import sys가 필요합니다.' },

                    { q: '다음 코드의 출력은? (입력: 5)\nx = input()\nprint(x + x)', choices: ['10', '55', '5 5', 'Error'], answer: 1, explanation: 'input()은 문자열을 반환하므로 "5" + "5" = "55"(문자열 연결)입니다. 숫자 10을 원하면 int(x)로 변환해야 합니다.' },

                    { q: '다음 코드에서 빈 줄(Enter만)을 입력하면?\ndata = input()\nprint(len(data))', choices: ['1', '0', 'None', 'Error'], answer: 1, explanation: 'Enter만 누르면 빈 문자열 ""이 반환됩니다. len("")은 0입니다. input()은 줄바꿈 문자를 포함하지 않습니다.' },

                    { q: 'try-except로 잘못된 입력을 처리하는 올바른 코드는?', choices: ['try: int(input()) catch: pass', 'try: int(input())\nexcept ValueError: print("숫자를 입력하세요")', 'try int(input()) except pass', 'error: int(input())'], answer: 1, explanation: 'try-except 구문으로 ValueError를 잡아 사용자에게 안내 메시지를 출력합니다. Python에서는 catch가 아닌 except를 사용합니다.' },

                    { q: '다음 코드의 출력은? (입력: 3 4)\na, b = map(int, input().split())\nprint(a ** b)', choices: ['12', '7', '81', '34'], answer: 2, explanation: '3과 4를 정수로 입력받아 3 ** 4 = 3의 4승 = 81이 됩니다. ** 는 거듭제곱 연산자입니다.' },

                    { q: 'walrus 연산자(:=)를 input과 함께 사용하는 예시의 결과는?\nif (n := int(input())) > 0:\n    print("양수")', choices: ['항상 양수 출력', '입력이 양수일 때만 "양수" 출력', 'SyntaxError', '입력 불가'], answer: 1, explanation: ':= (walrus)는 대입과 비교를 동시에 합니다. 입력값을 n에 저장하고 0보다 큰지 확인합니다. Python 3.8+ 지원.' },

                    { q: '여러 테스트 케이스를 입력받는 일반적인 패턴은?', choices: ['input()만 반복', 'n = int(input())로 개수 후 for문', 'while True로 무한히', 'scan() 사용'], answer: 1, explanation: '먼저 n = int(input())으로 입력 개수를 받고, for문으로 n번 반복하여 데이터를 입력받는 것이 일반적인 패턴입니다.' },

                    { q: '다음 코드에서 "  42  "를 입력하면 result는?\nresult = int(input().strip())', choices: ['ValueError', '42', '" 42 "', '0'], answer: 1, explanation: 'strip()이 양쪽 공백을 제거하여 "42"가 되고, int("42")로 정수 42가 됩니다. strip 없이도 int()는 공백을 무시합니다.' }

                ]

            },

        ], related: ['u05', 'u07'],

    },



    // ──────── BASIC cont. (Unit 7~9) ────────

    {

        id: 'u07', category: 'basic', name: 'Unit 7. 정수·실수 연산', hanja: 'Integer & Float',

        short: '정수(int)와 실수(float) 타입, 연산 규칙', color: '#10b981', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: '정수(int)는 소수점이 없는 수, 실수(float)는 소수점이 있는 수입니다. 정수끼리 나눗셈(/)하면 실수가 됩니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: 'int', desc: '정수: 1, -5, 0, 100' },

                    { label: 'float', desc: '실수: 3.14, -0.5, 2.0' },

                    { label: '혼합 연산', desc: 'int + float = float (자동 변환)' },

                    { label: '정밀도', desc: 'float는 부동소수점 오차 가능' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: '다음 코드의 출력은?\nprint(7 + 3)', choices: ['73', '10', '7 + 3', 'Error'], answer: 1, explanation: '정수끼리의 + 연산은 덧셈입니다. 7 + 3 = 10이 출력됩니다.' },

                    { q: '다음 코드의 결과는?\nprint(10 / 3)', choices: ['3', '3.3333333333333335', '3.0', '3.33'], answer: 1, explanation: '/ 연산자는 항상 float를 반환합니다. 10 / 3 = 3.3333...입니다.' },

                    { q: '다음 코드의 결과는?\nprint(10 // 3)', choices: ['3.33', '3', '4', '3.0'], answer: 1, explanation: '// 는 정수 나눗셈(몫)입니다. 소수점을 버려 3이 됩니다.' },

                    { q: '다음 코드의 결과는?\nprint(10 % 3)', choices: ['3', '1', '0.33', '10'], answer: 1, explanation: '% 는 나머지 연산자입니다. 10 ÷ 3 = 몫 3, 나머지 1입니다.' },

                    { q: '다음 코드의 결과는?\nprint(2 ** 8)', choices: ['16', '256', '10', '28'], answer: 1, explanation: '** 는 거듭제곱입니다. 2^8 = 256입니다.' },

                    { q: '___에 들어갈 연산자는?\n15 ___ 4 == 3  # 몫 구하기', choices: ['/', '//', '%', '**'], answer: 1, explanation: '// 는 정수 나눗셈으로 몫을 구합니다. 15 // 4 = 3입니다.' },

                    { q: '다음 코드의 결과는?\nprint(-7 // 2)', choices: ['-3', '-4', '-3.5', '3'], answer: 1, explanation: 'Python의 //는 음수에서 내림(floor)합니다. -7/2=-3.5의 내림은 -4입니다.' },

                    { q: '연산자 우선순위가 높은 순서는?', choices: ['+ > * > **', '** > * > +', '* > ** > +', '+ > ** > *'], answer: 1, explanation: '거듭제곱(**) > 곱셈/나눗셈(*,/,//,%) > 덧셈/뺄셈(+,-) 순입니다.' },

                    { q: '다음 코드의 결과는?\nprint(2 + 3 * 4)', choices: ['20', '14', '24', '9'], answer: 1, explanation: '곱셈이 덧셈보다 우선이므로 3*4=12를 먼저 계산, 2+12=14입니다.' },

                    { q: '다음 코드의 결과는?\nprint((2 + 3) * 4)', choices: ['14', '20', '24', '9'], answer: 1, explanation: '괄호가 최우선이므로 (2+3)=5를 먼저 계산, 5*4=20입니다.' },

                    { q: '다음 코드의 결과는?\nprint(0.1 + 0.2 == 0.3)', choices: ['True', 'False', '0.3', 'Error'], answer: 1, explanation: '부동소수점 오차로 0.1+0.2=0.30000...04입니다. 정확한 비교가 필요하면 round()나 decimal 모듈을 사용합니다.' },

                    { q: 'float의 부동소수점 오차를 해결하는 방법은?', choices: ['int로 변환', 'round() 또는 decimal 모듈', 'str로 변환', '// 사용'], answer: 1, explanation: 'round(0.1+0.2, 1)==0.3은 True입니다. 정밀 계산이 필요하면 decimal.Decimal을 사용합니다.' },

                    { q: '다음 코드의 결과는?\nprint(divmod(17, 5))', choices: ['(3, 2)', '(2, 3)', '3.4', 'Error'], answer: 0, explanation: 'divmod(a,b)는 (몫, 나머지) 튜플을 반환합니다. 17÷5=몫3, 나머지2 → (3,2)입니다.' },

                    { q: '다음 코드의 결과는?\nprint(abs(-15))', choices: ['-15', '15', '0', 'Error'], answer: 1, explanation: 'abs()는 절댓값을 반환합니다. abs(-15) = 15입니다.' },

                    { q: '다음 코드의 결과는?\nprint(round(3.567, 2))', choices: ['3.5', '3.56', '3.57', '4'], answer: 2, explanation: 'round(값, 자릿수)는 반올림합니다. 소수 둘째 자리까지 반올림하면 3.57입니다.' },

                    { q: '정수와 실수를 더하면 결과의 타입은?', choices: ['int', 'float', 'complex', 'Error'], answer: 1, explanation: 'int + float = float입니다. 3 + 2.0 = 5.0처럼 더 넓은 타입으로 자동 변환됩니다.' },

                    { q: '다음 코드의 결과는?\nprint(3 + 2.0)', choices: ['5', '5.0', '32.0', 'Error'], answer: 1, explanation: '정수 3이 float로 변환되어 3.0 + 2.0 = 5.0이 됩니다.' },

                    { q: '___에 들어갈 함수는?\nresult = ___(3.7)  # result = 3', choices: ['round', 'int', 'floor', 'abs'], answer: 1, explanation: 'int()는 소수점 이하를 버립니다. int(3.7) = 3입니다. round(3.7) = 4이므로 다릅니다.' },

                    { q: '다음 코드에서 에러가 나는 것은?', choices: ['10 / 0', '10 // 3', '10 % 3', '10 ** 0'], answer: 0, explanation: '0으로 나누면 ZeroDivisionError가 발생합니다. 10 ** 0 = 1은 정상 동작합니다.' },

                    { q: '다음 코드의 결과는?\nprint(10 ** 0)', choices: ['0', '10', '1', 'Error'], answer: 2, explanation: '어떤 수의 0승은 항상 1입니다. 10 ** 0 = 1입니다.' },

                    { q: 'complex 타입을 만드는 방법은?', choices: ['complex(3, 4)', '3 + 4i', '3 + 4complex', 'complex 3 4'], answer: 0, explanation: 'complex(3, 4)로 복소수 3+4j를 만듭니다. Python에서 허수 단위는 i가 아닌 j입니다.' },

                    { q: '다음 코드의 결과는?\nprint(pow(2, 10))', choices: ['20', '1024', '12', '100'], answer: 1, explanation: 'pow(a, b)는 a**b와 같습니다. pow(2, 10) = 2^10 = 1024입니다.' },

                    { q: 'pow(2, 10, 100)의 결과는?', choices: ['1024', '24', '100', '20'], answer: 1, explanation: 'pow(a, b, m)은 (a**b) % m입니다. 2^10 = 1024, 1024 % 100 = 24입니다.' },

                    { q: '다음 코드의 결과는?\nimport math\nprint(math.sqrt(144))', choices: ['12', '12.0', '144', 'Error'], answer: 1, explanation: 'math.sqrt()는 float를 반환합니다. sqrt(144) = 12.0입니다.' },

                    { q: '다음 코드의 결과는?\nprint(max(3, 7, 1, 9, 2))', choices: ['1', '3', '9', '22'], answer: 2, explanation: 'max()는 가장 큰 값을 반환합니다. 3,7,1,9,2 중 최댓값은 9입니다.' },

                    { q: '다음 코드의 결과는?\nprint(min(3, 7, 1, 9, 2))', choices: ['1', '2', '3', '9'], answer: 0, explanation: 'min()은 가장 작은 값을 반환합니다. 3,7,1,9,2 중 최솟값은 1입니다.' },

                    { q: '다음 코드의 결과는?\nprint(sum([1, 2, 3, 4, 5]))', choices: ['12345', '15', '5', '[15]'], answer: 1, explanation: 'sum()은 리스트의 모든 요소를 합산합니다. 1+2+3+4+5 = 15입니다.' },

                    { q: '다음 코드에서 에러가 나는 것은?', choices: ['5 / 2', '5.0 // 2', '"5" + "2"', '"5" * "2"'], answer: 3, explanation: '문자열끼리 *는 불가합니다. 문자열 * 정수만 가능합니다(반복). "5" * "2"는 TypeError입니다.' },

                    { q: '다음 코드의 결과는?\nprint(int("0b1010", 2))', choices: ['1010', '0b1010', '10', 'Error'], answer: 2, explanation: 'int("0b1010", 2)는 2진수 문자열을 10진수로 변환합니다. 1010(2) = 10입니다.' },

                    { q: '다음 코드의 결과는?\nprint(hex(255))', choices: ['255', '0xff', 'ff', '0xFF'], answer: 1, explanation: 'hex()는 정수를 16진수 문자열로 변환합니다. 255 = 0xff입니다. 소문자로 표시됩니다.' }

                ]

            },

        ], related: ['u06', 'u08'],

    },

    {

        id: 'u08', category: 'basic', name: 'Unit 8. 복합 대입 연산자', hanja: 'Compound Assignment',

        short: '+=, -=, *=, /=, //=, %=, **= 연산자', color: '#10b981', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: '복합 대입 연산자는 연산과 대입을 한 번에 수행합니다. a += 5는 a = a + 5와 동일합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '+=', desc: 'a += b → a = a + b (덧셈 후 대입)' },

                    { label: '-=', desc: 'a -= b → a = a - b (뺄셈 후 대입)' },

                    { label: '*=, /=', desc: '곱셈/나눗셈 후 대입' },

                    { label: '**=, //=, %=', desc: '거듭제곱/몫/나머지 후 대입' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: '다음 코드의 결과는?\nx = 10\nx += 5\nprint(x)', choices: ['10', '5', '15', '105'], answer: 2, explanation: 'x += 5는 x = x + 5와 같습니다. 10 + 5 = 15입니다.' },

                    { q: '다음 코드의 결과는?\nx = 20\nx -= 8\nprint(x)', choices: ['28', '12', '8', '20'], answer: 1, explanation: 'x -= 8은 x = x - 8입니다. 20 - 8 = 12입니다.' },

                    { q: '다음 코드의 결과는?\nx = 3\nx *= 4\nprint(x)', choices: ['34', '7', '12', '3'], answer: 2, explanation: 'x *= 4는 x = x * 4입니다. 3 * 4 = 12입니다.' },

                    { q: '다음 코드의 결과는?\nx = 100\nx //= 7\nprint(x)', choices: ['14.28', '14', '15', '2'], answer: 1, explanation: 'x //= 7은 x = x // 7입니다. 100 // 7 = 14(몫)입니다.' },

                    { q: '다음 코드의 결과는?\nx = 100\nx %= 7\nprint(x)', choices: ['14', '2', '93', '7'], answer: 1, explanation: 'x %= 7은 x = x % 7입니다. 100 % 7 = 2(나머지)입니다.' },

                    { q: '___에 들어갈 연산자는?\nx = 2\nx ___= 10\n# x == 1024', choices: ['+', '*', '**', '//'], answer: 2, explanation: 'x **= 10은 x = x ** 10입니다. 2^10 = 1024입니다.' },

                    { q: '다음 코드의 결과는?\ntext = "Hi"\ntext += " Python"\nprint(text)', choices: ['Hi', 'Hi Python', 'HiPython', 'Error'], answer: 1, explanation: '+= 는 문자열에도 사용 가능합니다. "Hi" + " Python" = "Hi Python"입니다.' },

                    { q: '다음 코드의 결과는?\ntext = "AB"\ntext *= 3\nprint(text)', choices: ['AB3', 'ABABAB', 'AB AB AB', 'Error'], answer: 1, explanation: '*= 는 문자열 반복에도 사용됩니다. "AB" * 3 = "ABABAB"입니다.' },

                    { q: '다음 중 복합 대입 연산자가 아닌 것은?', choices: ['+=', '-=', '==', '//='], answer: 2, explanation: '==는 비교(같은지) 연산자입니다. +=, -=, //= 등이 복합 대입 연산자입니다.' },

                    { q: 'x += 1과 동일한 표현은?', choices: ['x = 1', 'x = x + 1', 'x++', 'x = 1 + 1'], answer: 1, explanation: 'x += 1은 x = x + 1의 단축 표현입니다. Python에는 x++가 없습니다.' },

                    { q: '다음 코드의 결과는?\nx = 50\nx /= 4\nprint(x, type(x))', choices: ["12 <class \'int\'>", "12.5 <class \'float\'>", "12 <class \'float\'>", "12.5 <class \'int\'>"], answer: 1, explanation: '/= 는 일반 나눗셈이므로 결과가 float입니다. 50/4=12.5이고 타입은 float입니다.' },

                    { q: '다음 코드의 결과는?\na = 10\na += 5\na -= 3\na *= 2\nprint(a)', choices: ['24', '14', '20', '12'], answer: 0, explanation: 'a=10 → a+=5 → 15 → a-=3 → 12 → a*=2 → 24입니다.' },

                    { q: '다음 코드에서 에러가 나는 것은?', choices: ['x = 5; x += 3', 'x = "hi"; x += "!"', 'x = "hi"; x -= "h"', 'x = [1]; x += [2]'], answer: 2, explanation: '문자열은 -= 연산을 지원하지 않습니다. TypeError가 발생합니다. +=(연결)와 *=(반복)만 가능합니다.' },

                    { q: '다음 코드의 결과는?\nlst = [1, 2]\nlst += [3, 4]\nprint(lst)', choices: ['[1, 2, 3, 4]', '[[1,2],[3,4]]', '[1, 2, [3, 4]]', 'Error'], answer: 0, explanation: '리스트의 += 는 extend와 같습니다. [1,2]에 [3,4]의 요소가 추가되어 [1,2,3,4]가 됩니다.' },

                    { q: '___에 들어갈 코드는?\nscore = 0\nscore ___ 10  # score에 10 추가', choices: ['= +', '+= ', '+ =', '== '], answer: 1, explanation: '+= 연산자로 기존 값에 더합니다. score += 10은 score = score + 10입니다.' },

                    { q: 'x = 5에서 x %=2 후 x의 값은?', choices: ['2', '2.5', '1', '0'], answer: 2, explanation: 'x %= 2는 x = x % 2입니다. 5 % 2 = 1(나머지)입니다.' },

                    { q: '다음 코드의 결과는?\nx = True\nx += True\nprint(x)', choices: ['TrueTrue', '2', 'True', 'Error'], answer: 1, explanation: 'True는 정수 1로 취급됩니다. True + True = 1 + 1 = 2입니다.' },

                    { q: '다음 코드의 결과는?\nx = 1\nfor i in range(5):\n    x *= 2\nprint(x)', choices: ['10', '32', '16', '64'], answer: 1, explanation: 'x가 1에서 시작, 5번 *=2: 1→2→4→8→16→32입니다.' },

                    { q: '복합 대입으로 자기 자신의 역수를 구하는 코드는?', choices: ['x /= x', 'x = 1/x', 'x **= -1', 'x //= x'], answer: 2, explanation: 'x **= -1은 x = x^(-1) = 1/x입니다. x=5이면 0.2가 됩니다.' },

                    { q: '다음 코드에서 cnt의 최종값은?\ncnt = 0\nfor ch in "hello":\n    cnt += 1\nprint(cnt)', choices: ['1', '4', '5', 'hello'], answer: 2, explanation: '"hello"는 5글자이므로 반복 5번, cnt가 0에서 1씩 증가하여 최종 5입니다.' },

                    { q: '다음 코드의 결과는?\nx = 10\nx &= 6\nprint(x)', choices: ['2', '6', '10', '14'], answer: 0, explanation: '&= 는 비트 AND 연산입니다. 10(1010) & 6(0110) = 2(0010)입니다.' },

                    { q: '다음 코드의 결과는?\nx = 10\nx |= 5\nprint(x)', choices: ['10', '5', '15', '50'], answer: 2, explanation: '|= 는 비트 OR 연산입니다. 10(1010) | 5(0101) = 15(1111)입니다.' },

                    { q: '다음 코드의 결과는?\nx = 8\nx >>= 2\nprint(x)', choices: ['32', '2', '4', '6'], answer: 1, explanation: '>>= 는 비트 오른쪽 시프트입니다. 8(1000)을 2칸 이동하면 2(0010)입니다.' },

                    { q: '다음 코드의 결과는?\nx = 3\nx <<= 3\nprint(x)', choices: ['9', '24', '6', '33'], answer: 1, explanation: '<<= 는 비트 왼쪽 시프트입니다. 3(011)을 3칸 이동하면 24(11000)입니다. 3 * 2^3 = 24.' },

                    { q: '다음 코드에서 에러가 발생하는 것은?', choices: ['x = 5; x += 0', 'x = 5; x /= 0', 'x = 5; x *= 0', 'x = 5; x -= 0'], answer: 1, explanation: 'x /= 0은 0으로 나누기이므로 ZeroDivisionError가 발생합니다.' },

                    { q: '다음 코드의 결과는?\nx = 7\nx ^= 3\nprint(x)', choices: ['4', '10', '21', '73'], answer: 0, explanation: '^= 는 비트 XOR 연산입니다. 7(111) ^ 3(011) = 4(100)입니다.' },

                    { q: '다음 코드의 결과는?\nresult = 1\nfor n in [2, 3, 4]:\n    result *= n\nprint(result)', choices: ['9', '24', '234', '6'], answer: 1, explanation: '1*2=2, 2*3=6, 6*4=24입니다. *= 로 누적 곱셈을 수행합니다.' },

                    { q: '복합 대입 연산자를 사용한 홀짝 토글 코드는?', choices: ['x += 1', 'x %= 2', 'x ^= 1', 'x //= 2'], answer: 2, explanation: 'x ^= 1은 0↔1 토글입니다. 0^1=1, 1^1=0. 홀짝 스위치에 활용됩니다.' },

                    { q: '다음 코드의 결과는?\nx = "abc"\nx += str(123)\nprint(x)', choices: ['abc123', 'abc 123', 'Error', '126abc'], answer: 0, explanation: 'str(123)="123"으로 변환 후 문자열 연결. "abc"+"123"="abc123"입니다.' },

                    { q: '다음 코드의 결과는?\nx = 10.5\nx //= 3\nprint(x)', choices: ['3', '3.5', '3.0', '4'], answer: 2, explanation: 'float //= 는 float 결과를 반환합니다. 10.5//3 = 3.0입니다.' }

                ]

            },

        ], related: ['u07', 'u09'],

    },

    {

        id: 'u09', category: 'basic', name: 'Unit 9. 자료형 변환', hanja: 'Type Conversion',

        short: 'int(), float(), str(), bool() 변환 함수', color: '#10b981', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: 'Python에서 자료형을 변환하는 것을 타입 캐스팅이라 합니다. int(), float(), str(), bool() 함수를 사용합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: 'int()', desc: '정수로 변환. 소수점 버림. 문자열→정수 가능' },

                    { label: 'float()', desc: '실수로 변환. 정수→실수, 문자열→실수' },

                    { label: 'str()', desc: '문자열로 변환. 모든 타입 가능' },

                    { label: 'bool()', desc: '논리값 변환. 0, "", [], None → False' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: 'int("42")의 결과는?', choices: ['42 (정수)', '"42" (문자열)', '42.0', 'Error'], answer: 0, explanation: 'int()는 문자열을 정수로 변환합니다. "42" → 42 (int 타입)입니다.' },

                    { q: 'float("3.14")의 결과는?', choices: ['3', '3.14 (float)', '"3.14"', 'Error'], answer: 1, explanation: 'float()는 문자열을 실수로 변환합니다. "3.14" → 3.14 (float 타입)입니다.' },

                    { q: 'str(100)의 결과는?', choices: ['100 (정수)', '"100" (문자열)', '백', 'Error'], answer: 1, explanation: 'str()은 값을 문자열로 변환합니다. 100 → "100" (str 타입)입니다.' },

                    { q: 'int(3.9)의 결과는?', choices: ['3', '4', '3.9', '3.0'], answer: 0, explanation: 'int()는 소수점 이하를 버립니다(내림이 아닌 절삭). int(3.9) = 3, int(-3.9) = -3입니다.' },

                    { q: '다음 코드의 결과는?\nprint(int("0xFF", 16))', choices: ['255', '0xFF', 'FF', 'Error'], answer: 0, explanation: 'int(문자열, 진법)으로 다른 진법의 문자열을 10진수로 변환합니다. 0xFF(16진) = 255입니다.' },

                    { q: 'bool(0)의 결과는?', choices: ['True', 'False', '0', 'Error'], answer: 1, explanation: 'bool()에서 0, 0.0, "", None, [], {} 등은 False입니다. 그 외 값은 True입니다.' },

                    { q: 'bool("False")의 결과는?', choices: ['False', 'True', 'Error', 'None'], answer: 1, explanation: '"False"는 비어있지 않은 문자열이므로 True입니다. 빈 문자열("")만 False입니다. 내용과 무관합니다.' },

                    { q: '다음 코드의 결과는?\nprint(bool([]), bool([0]))', choices: ['False False', 'True True', 'False True', 'True False'], answer: 2, explanation: '빈 리스트 []는 False, 요소가 있는 [0]은 True입니다. 0이 들어있어도 리스트 자체는 비어있지 않으므로 True.' },

                    { q: '다음 코드에서 에러가 나는 것은?', choices: ['int("3.14")', 'float("3.14")', 'int(3.14)', 'str(3.14)'], answer: 0, explanation: 'int()는 소수점이 포함된 문자열을 직접 변환할 수 없습니다. int(float("3.14"))로 2단계 변환해야 합니다.' },

                    { q: '___에 들어갈 코드는?\nx = "3.14"\nresult = int(___) # result = 3', choices: ['x', 'float(x)', 'str(x)', 'round(x)'], answer: 1, explanation: '문자열 "3.14"를 바로 int()하면 에러입니다. float(x)로 먼저 실수 변환 후 int()를 적용합니다.' },

                    { q: 'chr(65)의 결과는?', choices: ['65', '"A"', '"65"', 'Error'], answer: 1, explanation: 'chr()은 유니코드 코드 포인트를 문자로 변환합니다. 65는 대문자 A입니다.' },

                    { q: 'ord("A")의 결과는?', choices: ['A', '65', '97', 'Error'], answer: 1, explanation: 'ord()는 문자를 유니코드 코드 포인트(정수)로 변환합니다. "A"의 코드는 65입니다.' },

                    { q: '다음 코드의 결과는?\nprint(list("hello"))', choices: ['hello', "['h','e','l','l','o']", "['hello']", 'Error'], answer: 1, explanation: 'list()는 문자열의 각 문자를 요소로 하는 리스트를 만듭니다.' },

                    { q: '다음 코드의 결과는?\nprint(tuple([1, 2, 3]))', choices: ['[1, 2, 3]', '(1, 2, 3)', '{1, 2, 3}', 'Error'], answer: 1, explanation: 'tuple()은 리스트를 튜플로 변환합니다. [1,2,3] → (1,2,3)입니다.' },

                    { q: '다음 코드의 결과는?\nprint(set([1, 2, 2, 3, 3]))', choices: ['[1, 2, 2, 3, 3]', '{1, 2, 3}', '(1, 2, 3)', '[1, 2, 3]'], answer: 1, explanation: 'set()은 중복을 제거합니다. [1,2,2,3,3] → {1, 2, 3}입니다.' },

                    { q: '암시적 형변환이 일어나는 경우는?', choices: ['int("5")', 'str(5)', '3 + 2.0', 'float("5")'], answer: 2, explanation: '3 + 2.0에서 int 3이 자동으로 float 3.0으로 변환됩니다. 나머지는 모두 명시적 형변환입니다.' },

                    { q: '다음 코드의 결과는?\nprint(type(True + 3))', choices: ["<class \'bool\'>", "<class \'int\'>", "<class \'float\'>", "Error"], answer: 1, explanation: 'True(bool)와 3(int)을 더하면 int로 변환됩니다. True + 3 = 4 (int)입니다.' },

                    { q: '다음 코드의 결과는?\nprint(bin(10))', choices: ['10', '0b1010', '1010', '0x10'], answer: 1, explanation: 'bin()은 정수를 2진수 문자열로 변환합니다. 10 = 0b1010입니다.' },

                    { q: '다음 코드의 결과는?\nprint(oct(8))', choices: ['8', '0o10', '10', '08'], answer: 1, explanation: 'oct()은 정수를 8진수 문자열로 변환합니다. 8 = 0o10입니다.' },

                    { q: '다음 코드에서 에러가 나는 것은?', choices: ['int(True)', 'int(None)', 'int(3.0)', 'int(False)'], answer: 1, explanation: 'int(None)은 TypeError입니다. None은 수치형으로 변환할 수 없습니다. True=1, False=0은 가능합니다.' },

                    { q: '다음 코드의 결과는?\nx = "123"\ny = list(x)\nprint(y)', choices: ['[123]', '[1, 2, 3]', "['1', '2', '3']", 'Error'], answer: 2, explanation: 'list("123")은 각 문자를 분리합니다. ["1", "2", "3"]이 됩니다. 정수가 아닌 문자열 리스트입니다.' },

                    { q: '다음 코드의 결과는?\nprint("".join(["H","e","l","l","o"]))', choices: ['H e l l o', 'Hello', "['H','e','l','l','o']", 'Error'], answer: 1, explanation: '"".join(리스트)는 구분자 없이 리스트 요소를 연결합니다. 결과는 "Hello"입니다.' },

                    { q: 'dict([(1,"a"),(2,"b")])의 결과는?', choices: ['{1:"a", 2:"b"}', '[(1,"a")]', '[1, 2]', 'Error'], answer: 0, explanation: 'dict()는 (키, 값) 쌍의 리스트를 딕셔너리로 변환합니다. {1: "a", 2: "b"}가 됩니다.' },

                    { q: '다음 코드의 결과는?\nprint(list(range(5)))', choices: ['[1,2,3,4,5]', '[0,1,2,3,4]', 'range(5)', '[0,5]'], answer: 1, explanation: 'range(5)는 0부터 4까지 생성합니다. list()로 변환하면 [0,1,2,3,4]입니다.' },

                    { q: '다음 코드의 결과는?\nprint(list(map(str, [1,2,3])))', choices: ["[1,2,3]", "['1','2','3']", "['123']", "Error"], answer: 1, explanation: "map(str, [1,2,3])는 각 요소에 str()을 적용합니다. 결과는 ['1','2','3']입니다." },

                    { q: '다음 코드의 결과는?\nprint(float("inf") > 10**100)', choices: ['True', 'False', 'Error', 'inf'], answer: 0, explanation: 'float("inf")는 양의 무한대를 나타냅니다. 어떤 유한한 수보다 크므로 True입니다.' },

                    { q: '다음 코드의 결과는?\nprint(isinstance(True, int))', choices: ['True', 'False', 'Error', 'None'], answer: 0, explanation: 'Python에서 bool은 int의 하위 클래스입니다. 따라서 True는 int의 인스턴스이기도 합니다.' },

                    { q: '다음 코드의 결과는?\nprint(int("0o17", 8))', choices: ['17', '15', '8', 'Error'], answer: 1, explanation: 'int("0o17", 8)는 8진수 17을 10진수로 변환합니다. 1*8+7 = 15입니다.' },

                    { q: '다음 코드의 결과는?\nprint(format(255, "08b"))', choices: ['255', '11111111', '0b11111111', 'Error'], answer: 1, explanation: 'format(값, "08b")는 8자리 2진수로 포맷합니다. 255 = 11111111입니다.' },

                    { q: '다음 코드의 결과는?\nprint(complex(3, 4))', choices: ['3 + 4', '(3+4j)', '3.4', '7'], answer: 1, explanation: 'complex(3, 4)는 복소수 3+4j를 생성합니다. Python에서 허수 단위는 j입니다.' }

                ]

            },

        ], related: ['u08', 'u10'],

    },

    // ──────── LOGIC·STRING (Unit 10~12) ────────

    {

        id: 'u10', category: 'logic', name: 'Unit 10. 비교·논리 연산자', hanja: 'Comparison & Logic',

        short: '==, !=, <, >, and, or, not 연산자', color: '#8b5cf6', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: '비교 연산자는 두 값을 비교하여 True/False를 반환합니다. 논리 연산자는 여러 조건을 결합합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '비교 연산자', desc: '==, !=, <, >, <=, >= → True/False 반환' },

                    { label: 'and', desc: '논리곱. 둘 다 참이면 True' },

                    { label: 'or', desc: '논리합. 하나라도 참이면 True' },

                    { label: 'not', desc: '논리 부정. True→False, False→True' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: '5 == 5의 결과는?', choices: ['5', 'True', 'False', 'Error'], answer: 1, explanation: '== 는 값이 같은지 비교합니다. 5와 5는 같으므로 True입니다.' },

                    { q: '5 != 3의 결과는?', choices: ['True', 'False', '2', 'Error'], answer: 0, explanation: '!= 는 값이 다른지 비교합니다. 5와 3은 다르므로 True입니다.' },

                    { q: '3 > 5의 결과는?', choices: ['True', 'False', '-2', 'Error'], answer: 1, explanation: '3은 5보다 크지 않으므로 False입니다.' },

                    { q: '5 >= 5의 결과는?', choices: ['True', 'False', '5', 'Error'], answer: 0, explanation: '>= 는 크거나 같은지 비교합니다. 5는 5 이상이므로 True입니다.' },

                    { q: 'True and False의 결과는?', choices: ['True', 'False', '1', 'Error'], answer: 1, explanation: 'and는 둘 다 True여야 True입니다. 하나라도 False면 False입니다.' },

                    { q: 'True or False의 결과는?', choices: ['True', 'False', '1', 'Error'], answer: 0, explanation: 'or는 하나만 True여도 True입니다.' },

                    { q: 'not True의 결과는?', choices: ['True', 'False', 'None', 'Error'], answer: 1, explanation: 'not은 논리값을 반전합니다. not True = False입니다.' },

                    { q: '다음 코드의 결과는?\nprint(3 > 1 and 2 < 5)', choices: ['True', 'False', '3', 'Error'], answer: 0, explanation: '3>1은 True, 2<5도 True. True and True = True입니다.' },

                    { q: '다음 코드의 결과는?\nprint(3 > 1 and 2 > 5)', choices: ['True', 'False', '3', 'Error'], answer: 1, explanation: '3>1은 True, 2>5는 False. True and False = False입니다.' },

                    { q: '___에 들어갈 연산자는?\n5 < x ___ x < 10  # x가 5초과 10미만인지', choices: ['or', 'and', 'not', 'xor'], answer: 1, explanation: '두 조건을 모두 만족해야 하므로 and를 사용합니다. 5 < x and x < 10 (또는 5 < x < 10도 가능).' },

                    { q: 'Python에서 5 < x < 10이 가능한가?', choices: ['불가능', '가능 (체이닝 비교)', 'SyntaxError', '다른 의미'], answer: 1, explanation: 'Python은 비교 연산자 체이닝을 지원합니다. 5 < x < 10은 5 < x and x < 10과 동일합니다.' },

                    { q: '다음 코드의 결과는?\nprint("abc" == "ABC")', choices: ['True', 'False', 'abc', 'Error'], answer: 1, explanation: '문자열 비교는 대소문자를 구분합니다. "abc"와 "ABC"는 다르므로 False입니다.' },

                    { q: '다음 코드의 결과는?\nprint("apple" < "banana")', choices: ['True', 'False', 'Error', 'None'], answer: 0, explanation: '문자열 비교는 사전식(알파벳) 순서입니다. "apple"이 "banana"보다 앞이므로 True입니다.' },

                    { q: '단축 평가(Short-circuit)란?', choices: ['코드를 짧게 쓰는 것', 'and/or에서 앞의 결과로 전체를 결정하면 뒤를 실행하지 않는 것', '비교 연산 생략', '반복문 최적화'], answer: 1, explanation: 'False and X에서 X는 평가하지 않고, True or X에서도 X를 평가하지 않습니다. 이를 단축 평가라 합니다.' },

                    { q: '다음 코드의 결과는?\nprint(0 and "hello")', choices: ['True', 'False', '0', 'hello'], answer: 2, explanation: 'and에서 첫 값이 falsy(0)이면 첫 값을 반환합니다. 0은 falsy이므로 0이 반환됩니다.' },

                    { q: '다음 코드의 결과는?\nprint(0 or "hello")', choices: ['0', 'hello', 'True', 'False'], answer: 1, explanation: 'or에서 첫 값이 falsy(0)이면 두 번째 값을 반환합니다. "hello"가 반환됩니다.' },

                    { q: '다음 코드의 결과는?\nprint("" or "default")', choices: ['""', 'default', 'True', 'Error'], answer: 1, explanation: '빈 문자열은 falsy이므로 or의 두 번째 값 "default"가 반환됩니다. 기본값 설정 패턴에 활용됩니다.' },

                    { q: '다음 코드의 결과는?\nprint(not 0)', choices: ['True', 'False', '0', '-1'], answer: 0, explanation: '0은 falsy이므로 not 0 = True입니다. not은 불리언 반전을 수행합니다.' },

                    { q: '다음 코드의 결과는?\nprint(1 == 1.0)', choices: ['True', 'False', 'Error', 'None'], answer: 0, explanation: '==는 값만 비교합니다. 1(int)과 1.0(float)은 값이 같으므로 True입니다.' },

                    { q: '다음 코드의 결과는?\nprint(1 is 1.0)', choices: ['True', 'False', 'Error', 'None'], answer: 1, explanation: 'is는 객체 동일성을 비교합니다. 1(int)과 1.0(float)은 타입이 다른 별개 객체이므로 False입니다.' },

                    { q: '다음 조건 중 x가 짝수인지 확인하는 코드는?', choices: ['x / 2 == 0', 'x % 2 == 0', 'x // 2 == 0', 'x ** 2 == 0'], answer: 1, explanation: 'x % 2 == 0이면 나머지가 0, 즉 짝수입니다. 홀수는 x % 2 == 1로 확인합니다.' },

                    { q: '드모르간 법칙에 따라 not (A and B)와 같은 것은?', choices: ['not A and not B', 'not A or not B', 'A or B', 'not (A or B)'], answer: 1, explanation: '드모르간 법칙: not(A and B) = (not A) or (not B), not(A or B) = (not A) and (not B)입니다.' },

                    { q: '다음 코드의 결과는?\nprint(bool(None))', choices: ['True', 'False', 'None', 'Error'], answer: 1, explanation: 'None은 falsy입니다. bool(None) = False입니다.' },

                    { q: '다음 코드의 결과는?\nx = 5\nprint(1 < x < 10)', choices: ['True', 'False', 'Error', '5'], answer: 0, explanation: '체이닝 비교: 1 < 5 < 10 → True and True → True입니다.' },

                    { q: '다음 코드의 결과는?\nprint(all([True, True, False]))', choices: ['True', 'False', '[True,True,False]', 'Error'], answer: 1, explanation: 'all()은 모든 요소가 True일 때만 True입니다. False가 하나 있으므로 False입니다.' },

                    { q: '다음 코드의 결과는?\nprint(any([False, False, True]))', choices: ['True', 'False', '[True]', 'Error'], answer: 0, explanation: 'any()는 하나라도 True면 True입니다. True가 하나 있으므로 True입니다.' },

                    { q: 'in 연산자의 용도는?', choices: ['대입', '포함 여부 확인', '반복', '삭제'], answer: 1, explanation: 'in은 값이 시퀀스에 포함되어있는지 확인합니다. "a" in "abc" → True입니다.' },

                    { q: '다음 코드의 결과는?\nprint(3 in [1, 2, 3, 4])', choices: ['True', 'False', '3', 'Error'], answer: 0, explanation: '3이 리스트에 포함되어 있으므로 True입니다.' },

                    { q: '다음 코드의 결과는?\nprint(5 not in [1, 2, 3])', choices: ['True', 'False', '5', 'Error'], answer: 0, explanation: '5가 리스트에 없으므로 not in의 결과는 True입니다.' },

                    { q: '삼항 연산자의 올바른 문법은?', choices: ['조건 ? 참 : 거짓', '참 if 조건 else 거짓', 'if 조건 then 참 else 거짓', '조건 && 참 || 거짓'], answer: 1, explanation: 'Python의 삼항 연산자: 값_참 if 조건 else 값_거짓. 예: x = "양수" if n > 0 else "음수"' }

                ]

            },

        ], related: ['u09', 'u11'],

    },

    {

        id: 'u11', category: 'logic', name: 'Unit 11. 문자열', hanja: 'String',

        short: '문자열 생성, 인덱싱, 슬라이싱, 포매팅', color: '#8b5cf6', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: '문자열은 문자들의 시퀀스입니다. 인덱싱([0])으로 개별 문자에 접근하고, 슬라이싱([1:3])으로 부분 문자열을 추출합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '인덱싱', desc: 's[0]=첫 문자, s[-1]=마지막 문자' },

                    { label: '슬라이싱', desc: 's[1:4]=1~3번째, s[:3]=처음~2번째' },

                    { label: 'f-string', desc: 'f"이름: {name}" — 변수 삽입' },

                    { label: '불변(immutable)', desc: '문자열은 수정 불가. 새 문자열 생성 필요' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: '문자열을 만드는 올바른 방법이 아닌 것은?', choices: ['"Hello"', "'Hello'", 'Hello', '"""Hello"""'], answer: 2, explanation: '따옴표 없이 Hello를 쓰면 변수명으로 인식됩니다. 문자열은 반드시 따옴표로 감싸야 합니다.' },

                    { q: '다음 코드의 결과는?\ns = "Python"\nprint(s[0])', choices: ['P', 'y', 'Python', 'Error'], answer: 0, explanation: '문자열 인덱싱은 0부터 시작합니다. s[0]은 첫 번째 문자 "P"입니다.' },

                    { q: '다음 코드의 결과는?\ns = "Python"\nprint(s[-1])', choices: ['P', 'n', 'o', 'Error'], answer: 1, explanation: '음수 인덱스는 뒤에서부터 셉니다. s[-1]은 마지막 문자 "n"입니다.' },

                    { q: '다음 코드의 결과는?\ns = "Python"\nprint(s[1:4])', choices: ['Pyth', 'yth', 'ytho', 'Pyt'], answer: 1, explanation: 's[1:4]는 인덱스 1~3까지입니다. "Python"에서 y(1), t(2), h(3) → "yth"입니다.' },

                    { q: '다음 코드의 결과는?\ns = "Hello"\nprint(len(s))', choices: ['4', '5', '6', 'Error'], answer: 1, explanation: 'len()은 문자열의 길이(문자 수)를 반환합니다. "Hello"는 5글자입니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello" + " " + "World")', choices: ['HelloWorld', 'Hello World', 'Hello+World', 'Error'], answer: 1, explanation: '+ 로 문자열을 연결합니다. 공백도 문자열이므로 "Hello World"가 됩니다.' },

                    { q: '다음 코드의 결과는?\nprint("Ha" * 3)', choices: ['Ha3', 'HaHaHa', 'Ha Ha Ha', 'Error'], answer: 1, explanation: '문자열 * 정수는 반복입니다. "Ha" * 3 = "HaHaHa"입니다.' },

                    { q: '다음 코드에서 에러가 나는 이유는?\ns = "Hello"\ns[0] = "h"', choices: ['인덱스 오류', '문자열은 불변(immutable)이라 수정 불가', '대입 연산자 오류', '타입 오류'], answer: 1, explanation: 'Python 문자열은 불변 객체입니다. 한번 생성된 문자열은 수정할 수 없고, 새 문자열을 만들어야 합니다.' },

                    { q: '___에 들어갈 코드는?\nprint("hello".___)  # 출력: HELLO', choices: ['upper()', 'lower()', 'capitalize()', 'title()'], answer: 0, explanation: 'upper()는 모든 문자를 대문자로 변환합니다. "hello".upper() = "HELLO"입니다.' },

                    { q: '다음 코드의 결과는?\nprint("HELLO".lower())', choices: ['HELLO', 'hello', 'Hello', 'hELLO'], answer: 1, explanation: 'lower()는 모든 문자를 소문자로 변환합니다.' },

                    { q: '다음 코드의 결과는?\nprint("hello world".title())', choices: ['Hello World', 'hello world', 'HELLO WORLD', 'Hello world'], answer: 0, explanation: 'title()은 각 단어의 첫 글자를 대문자로 변환합니다.' },

                    { q: '이스케이프 문자 \\n의 의미는?', choices: ['탭', '줄바꿈', '역슬래시', '널 문자'], answer: 1, explanation: '\n은 줄바꿈(newline) 문자입니다. print("A\nB")는 A와 B를 각각 다른 줄에 출력합니다.' },

                    { q: '다음 코드의 결과는?\nprint("Python"[::-1])', choices: ['Python', 'nohtyP', 'P', 'Error'], answer: 1, explanation: '[::-1]은 문자열을 뒤집습니다. "Python" → "nohtyP"입니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello" in "Hello World")', choices: ['True', 'False', 'Hello', 'Error'], answer: 0, explanation: 'in 연산자로 부분 문자열 포함 여부를 확인합니다. "Hello"는 "Hello World"에 포함되므로 True입니다.' },

                    { q: 'f-string에서 변수를 삽입하는 방법은?', choices: ['%s', '{}', '{변수명} (f 접두사 필요)', '${변수명}'], answer: 2, explanation: 'f"... {변수명} ..."으로 변수 값을 삽입합니다. f 접두사가 반드시 필요합니다.' },

                    { q: '다음 코드의 결과는?\nname = "Kim"\nage = 20\nprint(f"{name}은 {age}살")', choices: ['name은 age살', '{name}은 {age}살', 'Kim은 20살', 'Error'], answer: 2, explanation: 'f-string의 { }가 변수 값으로 대체됩니다.' },

                    { q: '다음 코드의 결과는?\nprint("  Hello  ".strip())', choices: ['  Hello  ', 'Hello', '  Hello', 'Hello  '], answer: 1, explanation: 'strip()은 양쪽 공백을 제거합니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello World".split())', choices: ["['Hello World']", "['Hello', 'World']", "['H','e','l','l','o']", "Error"], answer: 1, explanation: 'split()은 공백 기준으로 분리하여 리스트를 반환합니다.' },

                    { q: '다음 코드의 결과는?\nprint("-".join(["a", "b", "c"]))', choices: ['abc', 'a-b-c', '-a-b-c-', 'a b c'], answer: 1, explanation: 'join()은 구분자로 리스트 요소를 연결합니다. "-"로 연결하면 "a-b-c"입니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello World".replace("World", "Python"))', choices: ['Hello World', 'Hello Python', 'HelloPython', 'Error'], answer: 1, explanation: 'replace(이전, 새값)는 문자열을 치환합니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello World".find("World"))', choices: ['0', '5', '6', '-1'], answer: 2, explanation: 'find()는 부분 문자열의 시작 인덱스를 반환합니다. "World"는 인덱스 6에서 시작합니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello World".count("l"))', choices: ['1', '2', '3', '0'], answer: 2, explanation: 'count()는 부분 문자열의 등장 횟수를 반환합니다. "l"은 3번 나타납니다.' },

                    { q: '다음 코드의 결과는?\nprint("hello".startswith("he"))', choices: ['True', 'False', 'he', 'Error'], answer: 0, explanation: 'startswith()는 문자열이 특정 접두사로 시작하는지 확인합니다.' },

                    { q: '다음 코드의 결과는?\nprint("42".isdigit())', choices: ['True', 'False', '42', 'Error'], answer: 0, explanation: 'isdigit()은 문자열이 모두 숫자인지 확인합니다. "42"는 숫자만으로 이루어져 True입니다.' },

                    { q: 'r-string(raw string)의 용도는?', choices: ['역방향 출력', '이스케이프 문자를 무시', '정규식 전용', '읽기 전용'], answer: 1, explanation: 'r"..." 은 이스케이프 문자를 처리하지 않습니다. r"\n"은 줄바꿈이 아닌 \과 n 두 글자입니다.' },

                    { q: '다음 코드의 결과는?\nprint("Python"[10])', choices: ['n', '""', 'None', 'IndexError'], answer: 3, explanation: '"Python"은 인덱스 0~5까지만 있습니다. 범위를 벗어나면 IndexError가 발생합니다.' },

                    { q: '다음 코드의 결과는?\nprint("Python"[1:100])', choices: ['IndexError', 'ython', 'Python', 'P'], answer: 1, explanation: '슬라이싱은 범위를 초과해도 에러가 나지 않고 가능한 범위까지 반환합니다.' },

                    { q: '다음 코드의 결과는?\nprint("abc".center(9, "*"))', choices: ['abc******', '***abc***', '******abc', '*abc*'], answer: 1, explanation: 'center(폭, 채움문자)는 가운데 정렬합니다. 총 9칸에서 "abc" 양쪽을 *로 채웁니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello\\tWorld")', choices: ['Hello\\tWorld', 'HelloWorld', 'Hello    World', 'Error'], answer: 2, explanation: '\t는 탭 문자로, Hello와 World 사이에 탭 간격의 공백이 삽입됩니다.' },

                    { q: '문자열 포매팅 방법 3가지는?', choices: ['% 포매팅, format(), f-string', 'print, input, format', 'concat, repeat, slice', 'upper, lower, title'], answer: 0, explanation: 'Python의 3가지 문자열 포매팅: % 연산자("이름: %s" % name), .format(), f-string(f"이름: {name}")입니다.' }

                ]

            },

        ], related: ['u10', 'u12'],

    },



    {

        id: 'u12', category: 'logic', name: 'Unit 12. 리스트와 딕셔너리 기초', hanja: 'List & Dict Basics',

        short: '리스트 생성·접근, 딕셔너리 키-값', color: '#8b5cf6', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: '리스트는 순서가 있는 가변 시퀀스([]), 딕셔너리는 키-값 쌍의 가변 매핑({})입니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '리스트', desc: '[1, 2, 3] — 순서 있음, 인덱스 접근, 수정 가능' },

                    { label: '딕셔너리', desc: '{"key": "value"} — 키로 접근, 순서 보장(3.7+)' },

                    { label: '추가/삭제', desc: 'append(), remove(), pop() / dict[key]=val' },

                    { label: '중첩', desc: '리스트 안에 리스트, 딕셔너리 안에 리스트 등 가능' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [

                    { q: 'upper()의 역할은?', choices: ['소문자 변환', '대문자 변환', '첫 글자만 대문자', '대소문자 반전'], answer: 1, explanation: 'upper()는 문자열의 모든 문자를 대문자로 변환합니다. "hello".upper() = "HELLO"' },

                    { q: 'lower()의 역할은?', choices: ['대문자 변환', '소문자 변환', '첫 글자만 소문자', '대소문자 반전'], answer: 1, explanation: 'lower()는 문자열의 모든 문자를 소문자로 변환합니다. "HELLO".lower() = "hello"' },

                    { q: '다음 코드의 결과는?\nprint("hELLO".swapcase())', choices: ['hello', 'HELLO', 'Hello', 'Hellow'], answer: 2, explanation: 'swapcase()는 대소문자를 반전합니다. h→H, ELLO→ello → "Hello"입니다.' },

                    { q: '다음 코드의 결과는?\nprint("hello python".capitalize())', choices: ['Hello Python', 'Hello python', 'HELLO PYTHON', 'hello Python'], answer: 1, explanation: 'capitalize()는 첫 글자만 대문자, 나머지는 소문자로. "Hello python"이 됩니다.' },

                    { q: 'strip(), lstrip(), rstrip()의 차이는?', choices: ['같은 기능', 'strip:양쪽, lstrip:왼쪽, rstrip:오른쪽 공백 제거', '문자열 분할', '문자열 연결'], answer: 1, explanation: 'strip()은 양쪽, lstrip()은 왼쪽, rstrip()은 오른쪽의 공백(또는 지정 문자)을 제거합니다.' },

                    { q: '다음 코드의 결과는?\nprint("xxHelloxx".strip("x"))', choices: ['Hello', 'xxHelloxx', 'Helloxx', 'xxHello'], answer: 0, explanation: 'strip("x")는 양쪽의 "x"를 제거합니다. 결과는 "Hello"입니다.' },

                    { q: '다음 코드의 결과는?\nprint("A,B,C".split(","))', choices: ['[A,B,C]', '[A, B, C]', '[A,·B,·C]', 'Error'], answer: 1, explanation: 'split(",")은 쉼표를 기준으로 분리합니다. ["A", "B", "C"]가 됩니다.' },

                    { q: '___에 들어갈 메서드는?\nwords = "Hello World".___()\nprint(words)  # ["Hello", "World"]', choices: ['join', 'split', 'replace', 'find'], answer: 1, explanation: 'split()은 문자열을 공백 기준으로 나누어 리스트를 반환합니다.' },

                    { q: '다음 코드의 결과는?\nprint(" ".join(["2026", "02", "14"]))', choices: ['20260214', '2026 02 14', '2026-02-14', 'Error'], answer: 1, explanation: '" ".join()은 공백으로 리스트 요소를 연결합니다. "2026 02 14"가 됩니다.' },

                    { q: '다음 코드의 결과는?\nprint("banana".replace("a", "o", 2))', choices: ['bonono', 'bonona', 'banana', 'bononn'], answer: 1, explanation: 'replace(이전, 새값, 횟수)에서 횟수=2이므로 처음 2개의 "a"만 "o"로 바뀝니다. "bonona"입니다.' },

                    { q: 'find()와 index()의 차이는?', choices: ['같은 기능', 'find는 못 찾으면 -1, index는 ValueError', 'index가 더 빠름', 'find는 문자열 전용'], answer: 1, explanation: 'find()는 못 찾으면 -1을 반환하고, index()는 ValueError 예외를 발생시킵니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello".find("xyz"))', choices: ['0', '-1', 'None', 'Error'], answer: 1, explanation: 'find()는 찾지 못하면 -1을 반환합니다. "Hello"에 "xyz"가 없으므로 -1입니다.' },

                    { q: '다음 코드의 결과는?\nprint("python".endswith("on"))', choices: ['True', 'False', 'on', 'Error'], answer: 0, explanation: 'endswith()는 문자열이 특정 접미사로 끝나는지 확인합니다. "python"은 "on"으로 끝나므로 True.' },

                    { q: '다음 코드의 결과는?\nprint("12345".isdigit())', choices: ['True', 'False', '12345', 'Error'], answer: 0, explanation: 'isdigit()은 문자열이 모두 숫자로 구성되어 있으면 True입니다.' },

                    { q: '다음 코드의 결과는?\nprint("hello".isalpha())', choices: ['True', 'False', 'hello', 'Error'], answer: 0, explanation: 'isalpha()는 문자열이 모두 알파벳으로 구성되어 있으면 True입니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello 123".isalnum())', choices: ['True', 'False', 'Error', 'None'], answer: 1, explanation: 'isalnum()은 알파벳+숫자만으로 구성되어야 True입니다. 공백이 있으므로 False입니다.' },

                    { q: '다음 코드의 결과는?\nprint("   ".isspace())', choices: ['True', 'False', '   ', 'Error'], answer: 0, explanation: 'isspace()는 모든 문자가 공백 문자이면 True입니다.' },

                    { q: '다음 코드의 결과는?\nprint("42".zfill(5))', choices: ['00042', '42000', '42   ', '  42 '], answer: 0, explanation: 'zfill(폭)은 문자열 앞을 0으로 채워 지정 폭을 맞춥니다. "00042"가 됩니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello".ljust(10, "-"))', choices: ['Hello-----', '-----Hello', '--Hello---', 'Hello'], answer: 0, explanation: 'ljust(폭, 채움)은 왼쪽 정렬 후 나머지를 채움 문자로 채웁니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello".rjust(10, "."))', choices: ['Hello.....', '.....Hello', '..Hello...', 'Hello'], answer: 1, explanation: 'rjust(폭, 채움)은 오른쪽 정렬 후 왼쪽을 채움 문자로 채웁니다.' },

                    { q: '다음 코드의 결과는?\nprint("Hello World".partition(" "))', choices: ["('Hello', ' ', 'World')", "['Hello', 'World']", "('Hello World',)", "Error"], answer: 0, explanation: 'partition()은 첫 번째 구분자를 기준으로 3-튜플(앞, 구분자, 뒤)을 반환합니다.' },

                    { q: '다음 코드의 결과는?\ntext = "Hello\nWorld\nPython"\nprint(text.splitlines())', choices: ["['Hello', 'World', 'Python']", "['Hello\nWorld\nPython']", "Error", "['H','e','l',...]"], answer: 0, explanation: 'splitlines()은 줄 단위로 분리합니다.' },

                    { q: '___에 들어갈 메서드는?\nprint("hello world".___())  # 출력: Hello World', choices: ['upper', 'capitalize', 'title', 'swapcase'], answer: 2, explanation: 'title()은 각 단어의 첫 글자를 대문자로 변환합니다.' },

                    { q: '다음 코드의 결과는?\nprint("Python".encode("utf-8"))', choices: ['Python', "b'Python'", '["P","y"...]', 'Error'], answer: 1, explanation: "encode()는 문자열을 바이트로 변환합니다. b'Python'은 바이트 객체입니다." },

                    { q: 'format() 메서드로 소수점 2자리까지 표시하는 방법은?', choices: ['"{:.2f}".format(3.14159)', '"{:2}".format(3.14159)', '"{:.2}".format(3.14159)', '"{:f2}".format(3.14159)'], answer: 0, explanation: '{:.2f}는 소수점 2자리까지의 실수 포맷입니다. 결과는 "3.14"입니다.' },

                    { q: '다음 코드의 결과는?\nprint(f"{42:08b}")', choices: ['42', '00101010', '0b101010', '101010'], answer: 1, explanation: ':08b는 8자리 2진수 포맷입니다. 42 = 00101010입니다.' },

                    { q: '다음 코드의 결과는?\nprint("abcabc".count("abc"))', choices: ['1', '2', '6', '0'], answer: 1, explanation: 'count()는 겹치지 않는 횟수를 셉니다. "abc"가 인덱스 0과 3에서 총 2번 나타납니다.' },

                    { q: '다음 코드에서 에러가 나지 않는 것은?', choices: ['"Hello"[0] = "h"', '"Hello".upper()', '"Hello".append("!")', '"Hello" + 5'], answer: 1, explanation: '문자열은 불변이므로 인덱스 대입, append 불가. + 숫자도 TypeError. upper()만 정상 동작합니다.' },

                    { q: '다음 코드의 결과는?\ntext = "  Python  "\nprint(f"[{text.strip()}]")', choices: ['[  Python  ]', '[Python]', '[ Python ]', 'Error'], answer: 1, explanation: 'strip()으로 양쪽 공백이 제거된 후 f-string으로 "[Python]"이 출력됩니다.' },

                    { q: '다음 코드의 결과는?\nprint("abc" * 0)', choices: ['abc', '0', '""(빈 문자열)', 'Error'], answer: 2, explanation: '문자열 * 0은 빈 문자열을 반환합니다. 음수도 마찬가지입니다.' }

                ]

            },

        ], related: ['u11', 'u13'],

    },

    // ──────── CONDITION (Unit 13~15) ────────

    {

        id: 'u13', category: 'condition', name: 'Unit 13. if 조건문', hanja: 'If Statement',

        short: 'if, else, elif 조건 분기', color: '#f59e0b', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: 'if문은 조건이 참일 때 코드를 실행합니다. else는 거짓일 때, elif는 추가 조건을 검사합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: 'if', desc: '조건이 True이면 블록 실행' },

                    { label: 'else', desc: '조건이 False이면 실행' },

                    { label: 'elif', desc: '추가 조건 검사 (else if)' },

                    { label: '중첩 if', desc: 'if 안에 if를 넣어 복잡한 분기 처리' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [
                    { q: 'if문의 올바른 문법은?', choices: ['if x > 0:', 'if (x > 0)', 'if x > 0 then:', 'if x > 0;'], answer: 0, explanation: 'Python의 if문은 조건 뒤에 콜론(:)을 붙입니다. 괄호는 선택사항이며 then 키워드는 사용하지 않습니다.' },
                    { q: '다음 코드의 출력은?\nx = 10\nif x > 5:\n    print("크다")', choices: ['크다', '아무것도 출력 안됨', 'Error', '5'], answer: 0, explanation: 'x=10이고 10>5는 True이므로 if 블록이 실행되어 "크다"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nx = 3\nif x > 5:\n    print("크다")\nprint("끝")', choices: ['크다\n끝', '끝', '크다', 'Error'], answer: 1, explanation: '3>5는 False이므로 if 블록은 건너뛰고, 들여쓰기 없는 print("끝")만 실행됩니다.' },
                    { q: 'if-else문에서 else의 역할은?', choices: ['항상 실행', 'if 조건이 False일 때 실행', 'if 조건이 True일 때 실행', '반복 실행'], answer: 1, explanation: 'else는 if 조건이 False일 때 실행되는 대안 코드 블록입니다.' },
                    { q: '다음 코드의 출력은?\nx = 2\nif x % 2 == 0:\n    print("짝수")\nelse:\n    print("홀수")', choices: ['홀수', '짝수', 'Error', '2'], answer: 1, explanation: '2 % 2 == 0은 True이므로 "짝수"가 출력됩니다.' },
                    { q: '___에 들어갈 키워드는?\nif score >= 90:\n    grade = "A"\n___ score >= 80:\n    grade = "B"', choices: ['else', 'elif', 'elseif', 'if'], answer: 1, explanation: 'Python에서 다중 조건 분기 시 elif를 사용합니다. elseif나 else if가 아닌 elif입니다.' },
                    { q: '다음 코드의 출력은?\nscore = 85\nif score >= 90:\n    print("A")\nelif score >= 80:\n    print("B")\nelse:\n    print("C")', choices: ['A', 'B', 'C', 'Error'], answer: 1, explanation: '85는 90 미만이지만 80 이상이므로 elif 블록이 실행되어 "B"가 출력됩니다.' },
                    { q: '다음 코드에서 에러가 나는 이유는?\nif x > 0\n    print("양수")', choices: ['x가 정의되지 않아서', 'if문 끝에 콜론이 없어서', 'print 오류', '들여쓰기 오류'], answer: 1, explanation: 'if문 끝에 콜론(:)이 반드시 필요합니다. if x > 0: 처럼 작성해야 합니다.' },
                    { q: '다음 코드의 출력은?\nage = 15\nif age >= 19:\n    print("성인")\nelif age >= 13:\n    print("청소년")\nelif age >= 7:\n    print("어린이")\nelse:\n    print("유아")', choices: ['성인', '청소년', '어린이', '유아'], answer: 1, explanation: '15세는 19미만, 13이상이므로 두 번째 elif가 실행됩니다. elif는 위에서 아래로 순서대로 검사합니다.' },
                    { q: '중첩 if문이란?', choices: ['if를 반복하는 것', 'if 안에 if가 있는 구조', 'elif와 같은 의미', 'if를 삭제하는 것'], answer: 1, explanation: '중첩 if는 if 블록 내부에 또 다른 if문이 있는 구조입니다. 복잡한 조건 판단에 사용됩니다.' },
                    { q: '다음 코드의 출력은?\nx = 10\nif x > 0:\n    if x > 5:\n        print("5 초과")\n    else:\n        print("5 이하")', choices: ['5 초과', '5 이하', 'Error', '아무것도 안 나옴'], answer: 0, explanation: 'x=10은 0보다 크고(True), 5보다도 크므로(True) "5 초과"가 출력됩니다.' },
                    { q: '삼항 연산자의 올바른 사용법은?', choices: ['x > 0 ? "양수" : "음수"', '"양수" if x > 0 else "음수"', 'if x > 0 then "양수" else "음수"', 'x > 0 and "양수" or "음수"'], answer: 1, explanation: '값_참 if 조건 else 값_거짓이 Python의 삼항(조건) 표현식입니다.' },
                    { q: '다음 코드의 결과는?\nx = -5\nresult = "양수" if x > 0 else "음수"\nprint(result)', choices: ['양수', '음수', 'Error', '-5'], answer: 1, explanation: 'x=-5이므로 x>0은 False. else 뒤의 "음수"가 result에 저장됩니다.' },
                    { q: '다음 코드의 출력은?\nif True:\n    pass\nprint("완료")', choices: ['Error', '완료', 'True', '아무것도 안 나옴'], answer: 1, explanation: 'pass는 아무 동작도 하지 않는 문장입니다. if 블록을 건너뛰고 "완료"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nx = 0\nif x:\n    print("참")\nelse:\n    print("거짓")', choices: ['참', '거짓', '0', 'Error'], answer: 1, explanation: '0은 falsy(거짓으로 평가)이므로 if x는 False와 같습니다. else 블록이 실행됩니다.' },
                    { q: '다음 조건식과 동일한 것은?\nnot (a > 5 and b < 10)', choices: ['a > 5 or b < 10', 'a <= 5 or b >= 10', 'a <= 5 and b >= 10', 'a > 5 and b >= 10'], answer: 1, explanation: '드모르간 법칙: not(A and B) = (not A) or (not B). not(a>5)=a<=5, not(b<10)=b>=10. 결과: a<=5 or b>=10.' },
                    { q: '다음 코드의 출력은?\nx = 7\nif x > 10:\n    print("A")\nif x > 5:\n    print("B")\nif x > 0:\n    print("C")', choices: ['A', 'B', 'B\nC', 'A\nB\nC'], answer: 2, explanation: '각각 독립적인 if문이므로 모두 검사합니다. x=7: 10초과(F), 5초과(T), 0초과(T) → B와 C 출력.' },
                    { q: '위 코드에서 B만 출력하려면 어떻게 바꿔야 하나?', choices: ['if를 전부 제거', 'if-elif-elif로 변경', 'else를 추가', 'pass를 추가'], answer: 1, explanation: 'elif를 사용하면 첫 번째 True 조건만 실행됩니다. 독립적인 if와 달리 나머지를 건너뜁니다.' },
                    { q: '다음 코드의 출력은?\nname = ""\nif name:\n    print(name)\nelse:\n    print("이름 없음")', choices: ['""', '이름 없음', 'Error', 'name'], answer: 1, explanation: '빈 문자열 ""은 falsy입니다. if name은 False로 평가되어 else블록의 "이름 없음"이 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nlst = []\nif lst:\n    print("있음")\nelse:\n    print("비어있음")', choices: ['있음', '비어있음', 'Error', '[]'], answer: 1, explanation: '빈 리스트 []는 falsy입니다. if lst는 False로 평가되어 "비어있음"이 출력됩니다.' },
                    { q: 'in 연산자를 조건문에서 사용하는 올바른 예시는?', choices: ['if "a" in "abc":', 'if in "a" "abc":', 'if "abc" has "a":', 'if contains("a", "abc"):'], answer: 0, explanation: 'in 연산자는 if 값 in 시퀀스: 형태로 포함 여부를 확인합니다.' },
                    { q: '다음 코드의 출력은?\ncolor = "red"\nif color in ["red", "green", "blue"]:\n    print("RGB")', choices: ['RGB', 'red', 'Error', '아무것도 안 나옴'], answer: 0, explanation: '"red"가 리스트에 포함되어 있으므로 in 연산 결과가 True이고 "RGB"가 출력됩니다.' },
                    { q: '다음 코드에서 에러가 나는 라인은?\n1: x = 10\n2: if x > 5:\n3: print("크다")', choices: ['1번', '2번', '3번', '에러 없음'], answer: 2, explanation: '3번 라인에 들여쓰기가 없습니다. if 블록의 코드는 반드시 들여쓰기해야 IndentationError가 발생하지 않습니다.' },
                    { q: '다음 코드의 출력은?\nx, y = 3, 5\nif x > y:\n    big = x\nelse:\n    big = y\nprint(big)', choices: ['3', '5', '8', 'Error'], answer: 1, explanation: '3>5는 False이므로 else 블록에서 big=y=5가 됩니다. 두 수 중 큰 값을 구하는 패턴입니다.' },
                    { q: '위 코드를 삼항 연산자로 바꾸면?', choices: ['big = max(x, y)', 'big = x if x > y else y', 'big = x > y', 'big = x or y'], answer: 1, explanation: '삼항 연산자: big = x if x > y else y. x가 크면 x, 아니면 y가 big에 저장됩니다.' },
                    { q: '다음 코드의 출력은?\nnum = -3\nif num > 0:\n    print("양수")\nelif num == 0:\n    print("영")\nelse:\n    print("음수")', choices: ['양수', '영', '음수', 'Error'], answer: 2, explanation: '-3은 0보다 작으므로 if(F), elif(F)를 거쳐 else 블록의 "음수"가 출력됩니다.' },
                    { q: '다음 코드의 결과는?\nfor i in range(1, 6):\n    if i % 2 == 0:\n        print(i, end=" ")', choices: ['1 3 5', '2 4', '1 2 3 4 5', '2 4 6'], answer: 1, explanation: 'range(1,6)은 1~5. 짝수인 2, 4만 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nx = None\nif x is None:\n    print("없음")', choices: ['없음', 'None', 'Error', '아무것도 안 나옴'], answer: 0, explanation: 'is None으로 None 체크합니다. == None보다 is None이 권장됩니다.' },
                    { q: '다음 코드의 출력은?\ntry:\n    x = int("abc")\nexcept ValueError:\n    print("변환 실패")', choices: ['abc', '변환 실패', 'Error', '0'], answer: 1, explanation: 'int("abc")는 ValueError를 발생시키고, except가 이를 잡아 "변환 실패"를 출력합니다.' },
                    { q: 'match-case문(Python 3.10+)의 역할은?', choices: ['반복문', '패턴 매칭(switch-case와 유사)', '예외 처리', '함수 정의'], answer: 1, explanation: 'match-case는 Python 3.10에서 추가된 구조적 패턴 매칭입니다. 다른 언어의 switch-case와 유사합니다.' }
                ]

            },

        ], related: ['u12', 'u14'],

    },

    {

        id: 'u14', category: 'condition', name: 'Unit 14. 조건문 심화', hanja: 'Advanced Conditions',

        short: '중첩 조건, 논리 연산, 삼항 연산자', color: '#f59e0b', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: '복잡한 분기 처리를 위해 중첩 if, 논리 연산자(and/or/not), 삼항 연산자를 활용합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '중첩 if', desc: 'if 안에 if를 넣어 세부 분기' },

                    { label: '논리 결합', desc: 'and, or로 여러 조건 결합' },

                    { label: '삼항 연산자', desc: 'A if 조건 else B — 한 줄 조건식' },

                    { label: 'match-case', desc: 'Python 3.10+ 패턴 매칭 (switch문 대체)' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [
                    { q: '다음 코드의 출력은?\nx = 15\nif x >= 10 and x <= 20:\n    print("범위 내")', choices: ['범위 내', 'Error', '아무것도 안 나옴', '15'], answer: 0, explanation: '15는 10이상이고 20이하이므로 and 조건이 True입니다. "범위 내"가 출력됩니다.' },
                    { q: '위 조건을 더 간결하게 쓰면?', choices: ['if 10 <= x <= 20:', 'if x in range(10, 20):', 'if x between 10 and 20:', 'if x >= 10 or x <= 20:'], answer: 0, explanation: 'Python은 체이닝 비교를 지원합니다. 10 <= x <= 20은 10 <= x and x <= 20과 동일합니다.' },
                    { q: '다음 코드의 출력은?\ngrade = "B"\nif grade == "A":\n    print(4.5)\nelif grade == "B":\n    print(4.0)\nelif grade == "C":\n    print(3.5)', choices: ['4.5', '4.0', '3.5', 'Error'], answer: 1, explanation: 'grade가 "B"이므로 두 번째 elif가 매칭되어 4.0이 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nx = 5\nif x > 3:\n    print("A")\n    if x > 4:\n        print("B")\n    print("C")', choices: ['A', 'A\nB', 'A\nB\nC', 'A\nC'], answer: 2, explanation: 'x=5: 3초과(T)→A출력, 4초과(T)→B출력, 내부if와 같은 레벨의 C도 출력. 결과: A B C.' },
                    { q: '다음 코드의 출력은?\nnum = 12\nif num % 3 == 0 and num % 4 == 0:\n    print("3과 4의 공배수")', choices: ['3과 4의 공배수', 'Error', '아무것도 안 나옴', '12'], answer: 0, explanation: '12 % 3 == 0(True) and 12 % 4 == 0(True) → True. "3과 4의 공배수"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nx = 7\nif x > 10:\n    print("A")\nelif x > 5:\n    print("B")\nelif x > 3:\n    print("C")', choices: ['A', 'B', 'C', 'B\nC'], answer: 1, explanation: 'elif는 이전 조건이 False일 때만 검사합니다. 7>10(F), 7>5(T)→"B"출력. 이후 elif는 건너뜁니다.' },
                    { q: '다음 코드의 출력은?\nyear = 2024\nif year % 4 == 0 and (year % 100 != 0 or year % 400 == 0):\n    print("윤년")\nelse:\n    print("평년")', choices: ['윤년', '평년', 'Error', '2024'], answer: 0, explanation: '2024%4==0(T) and (2024%100!=0(T) or ...) → True. 2024년은 윤년입니다.' },
                    { q: '___에 들어갈 조건은?\ntemp = 25\nif ___:\n    print("적정 온도")  # 18~28도', choices: ['temp > 18 and temp < 28', '18 <= temp <= 28', 'temp >= 18 or temp <= 28', '둘 다 가능 (첫째, 둘째)'], answer: 3, explanation: '첫째(and)와 둘째(체이닝) 모두 올바릅니다. or를 쓰면 모든 수가 조건을 만족하므로 오류입니다.' },
                    { q: '다음 코드의 출력은?\npassword = "abc123"\nif len(password) >= 8:\n    print("안전")\nelse:\n    print("짧음")', choices: ['안전', '짧음', 'Error', '6'], answer: 1, explanation: 'len("abc123")=6이고 6>=8은 False이므로 else의 "짧음"이 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nx = "hello"\nif isinstance(x, str):\n    print("문자열")\nelif isinstance(x, int):\n    print("정수")', choices: ['문자열', '정수', '문자열\n정수', 'Error'], answer: 0, explanation: 'isinstance(x, str)이 True이므로 "문자열"이 출력됩니다. elif는 검사하지 않습니다.' },
                    { q: '다음 코드의 출력은?\nx = ""\nresult = x or "기본값"\nprint(result)', choices: ['""', '기본값', 'True', 'Error'], answer: 1, explanation: '빈 문자열은 falsy이므로 or는 두 번째 피연산자 "기본값"을 반환합니다. 기본값 패턴에 활용됩니다.' },
                    { q: '다음 코드의 출력은?\nlst = [1, 2, 3]\nif 2 in lst and len(lst) > 2:\n    print("조건 충족")', choices: ['조건 충족', 'Error', '아무것도 안 나옴', 'True'], answer: 0, explanation: '2가 리스트에 있고(T) 길이가 2초과(T)이므로 and 결과가 True입니다.' },
                    { q: '다음 코드의 출력은?\nx = 42\nif x > 100:\n    size = "대"\nelif x > 50:\n    size = "중"\nelse:\n    size = "소"\nprint(size)', choices: ['대', '중', '소', 'Error'], answer: 2, explanation: '42는 100초과(F), 50초과(F)이므로 else의 size="소"가 실행됩니다.' },
                    { q: '다음 코드에서 에러가 나는 이유는?\nif True:\nprint("OK")', choices: ['True가 잘못됨', 'print 앞에 들여쓰기가 없어서', '콜론이 없어서', '괄호가 잘못됨'], answer: 1, explanation: 'if 블록 안의 코드는 반드시 들여쓰기가 필요합니다. IndentationError가 발생합니다.' },
                    { q: '다음 코드의 출력은?\nfor i in range(1, 4):\n    if i == 2:\n        continue\n    print(i, end=" ")', choices: ['1 2 3', '1 3', '2', '1 2'], answer: 1, explanation: 'i=2일 때 continue로 건너뛰므로 1과 3만 출력됩니다.' },
                    { q: 'walrus 연산자(:=)를 if문에서 사용하는 방법은?', choices: ['if x := 10 > 5:', 'if (n := len(data)) > 10:', 'if n = len(data) > 10:', 'if :=n len(data):'], answer: 1, explanation: ':= 는 대입과 조건검사를 동시에 합니다. n에 값을 할당하고 바로 비교합니다. Python 3.8+' },
                    { q: '다음 코드의 출력은?\nx = 5\ny = 10\nresult = "같음" if x == y else "다름"\nprint(result)', choices: ['같음', '다름', 'Error', '5 10'], answer: 1, explanation: '5 != 10이므로 else 뒤의 "다름"이 result에 저장됩니다.' },
                    { q: '다음 코드의 출력은?\nnum = 7\nif num % 2 == 0:\n    parity = "짝수"\nelse:\n    parity = "홀수"\nprint(f"{num}는 {parity}")', choices: ['7는 짝수', '7는 홀수', 'Error', '홀수'], answer: 1, explanation: '7%2==1(!=0)이므로 else의 parity="홀수"가 실행됩니다. f-string으로 "7는 홀수"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nx = 5\nif not x > 10:\n    print("10 이하")', choices: ['10 이하', 'Error', '아무것도 안 나옴', '5'], answer: 0, explanation: 'x>10은 False, not False = True이므로 "10 이하"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\ndata = {"name": "Kim"}\nif "age" in data:\n    print(data["age"])\nelse:\n    print("나이 정보 없음")', choices: ['Kim', '나이 정보 없음', 'Error', 'None'], answer: 1, explanation: 'in으로 딕셔너리 키 존재 여부를 확인합니다. "age" 키가 없으므로 else가 실행됩니다.' },
                    { q: '복합 조건에서 괄호의 역할은?\nif (a or b) and c:', choices: ['필수 문법', '우선순위를 명확히 지정', '에러 발생', '괄호는 무시됨'], answer: 1, explanation: '괄호로 논리 연산의 우선순위를 명확히 합니다. (a or b)를 먼저 평가한 후 c와 and 연산합니다.' },
                    { q: '다음 코드의 출력은?\nscores = [80, 95, 60, 75]\nfor s in scores:\n    if s >= 90:\n        print(f"{s}: 우수")\n    elif s >= 70:\n        print(f"{s}: 보통")\n    else:\n        print(f"{s}: 미흡")', choices: ['80: 보통\n95: 우수\n60: 미흡\n75: 보통', '95: 우수', '80: 보통', 'Error'], answer: 0, explanation: '각 점수에 대해 if-elif-else로 등급을 판정합니다. 80→보통, 95→우수, 60→미흡, 75→보통.' },
                    { q: 'assert문의 역할은?', choices: ['출력', '조건이 False면 AssertionError 발생', '변수 삭제', '반복'], answer: 1, explanation: 'assert 조건은 디버깅용으로, 조건이 False이면 AssertionError를 발생시켜 프로그램을 중단합니다.' },
                    { q: '다음 코드의 출력은?\nx = 10\nif x > 5:\n    print("A", end="")\nif x > 8:\n    print("B", end="")\nif x > 12:\n    print("C", end="")', choices: ['A', 'AB', 'ABC', 'B'], answer: 1, explanation: '독립적인 if문 3개: x=10은 5초과(T), 8초과(T), 12초과(F). "A"와 "B" 출력 → "AB".' },
                    { q: '가드 절(Guard Clause) 패턴이란?', choices: ['모든 조건을 중첩하는 것', '조기 종료로 중첩을 줄이는 패턴', '무한 반복 방지', '변수 보호'], answer: 1, explanation: '가드 절은 예외 상황을 먼저 처리하고 조기 반환하여 코드 중첩을 줄이는 깔끔한 패턴입니다.' },
                    { q: '다음 코드의 출력은?\ndef check(x):\n    if x <= 0: return "음수"\n    if x > 100: return "초과"\n    return "정상"\nprint(check(50))', choices: ['음수', '초과', '정상', 'Error'], answer: 2, explanation: '50은 0초과(가드 통과), 100이하(가드 통과)이므로 마지막 return "정상"이 실행됩니다.' },
                    { q: '다음 코드의 outputs는?\nfor ch in "Hello":\n    if ch.isupper():\n        print(ch, end="")', choices: ['H', 'HELLO', 'hello', 'Error'], answer: 0, explanation: '"Hello"에서 대문자는 H뿐입니다. isupper()로 대문자만 필터링하여 "H"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nage = 20\nhas_id = True\nif age >= 19 and has_id:\n    print("입장 가능")\nelse:\n    print("입장 불가")', choices: ['입장 가능', '입장 불가', 'Error', 'True'], answer: 0, explanation: '20>=19(T) and True(T) → True. "입장 가능"이 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nx = 3\ny = 7\nmax_val = x if x > y else y\nmin_val = x if x < y else y\nprint(max_val, min_val)', choices: ['3 7', '7 3', '7 7', '3 3'], answer: 1, explanation: 'x>y(F)→max_val=y=7. x<y(T)→min_val=x=3. 출력: 7 3.' },
                    { q: '단락 평가를 활용한 안전한 딕셔너리 접근은?\ndata = {}', choices: ['data["key"] or "default"', 'data.get("key", "default")', 'if "key" in data: data["key"]', '둘째, 셋째 모두 가능'], answer: 3, explanation: 'data.get()과 in 체크 모두 KeyError를 방지하는 안전한 접근법입니다. 첫째는 키가 없으면 에러.' }
                ]

            },

        ], related: ['u13', 'u15'],

    },

    {

        id: 'u15', category: 'condition', name: 'Unit 15. 조건문 활용', hanja: 'Condition Applications',

        short: '성적 판정, 윤년 판별, 계절 분류 실습', color: '#f59e0b', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: '실전에서 조건문을 활용합니다: 성적 등급 판정, 윤년 판별, 양수/음수/0 분류 등 다양한 문제를 해결합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '성적 판정', desc: 'A(90~), B(80~), C(70~), D(60~), F' },

                    { label: '윤년', desc: '4의배수 and (100의배수 아님 or 400의배수)' },

                    { label: '짝수/홀수', desc: 'x%2==0이면 짝수, 아니면 홀수' },

                    { label: '범위 검사', desc: '최솟값 <= x <= 최댓값' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [
                    { q: '다음 코드의 출력은?\nx = 5\nif x > 0:\n    if x % 2 == 0:\n        print("양수, 짝수")\n    else:\n        print("양수, 홀수")\nelse:\n    print("음수")', choices: ['양수, 짝수', '양수, 홀수', '음수', 'Error'], answer: 1, explanation: 'x=5는 양수(T)이고, 5%2!=0이므로 내부 else의 "양수, 홀수"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nmonth = 2\nif month in [3, 4, 5]:\n    season = "봄"\nelif month in [6, 7, 8]:\n    season = "여름"\nelif month in [9, 10, 11]:\n    season = "가을"\nelse:\n    season = "겨울"\nprint(season)', choices: ['봄', '여름', '가을', '겨울'], answer: 3, explanation: 'month=2는 어느 리스트에도 포함되지 않으므로 else의 "겨울"이 실행됩니다.' },
                    { q: '다음 코드의 출력은?\ntext = "Hello World"\nif " " in text:\n    words = text.split()\n    print(len(words), "개 단어")', choices: ['1 개 단어', '2 개 단어', 'Error', '11 개 단어'], answer: 1, explanation: '공백이 있으므로 split() 결과 ["Hello", "World"] => 2개 단어입니다.' },
                    { q: '다음 코드의 출력은?\na, b, c = 3, 7, 5\nif a > b and a > c:\n    print(a)\nelif b > c:\n    print(b)\nelse:\n    print(c)', choices: ['3', '7', '5', 'Error'], answer: 1, explanation: 'a>b(F) => elif: b>c(7>5=T) => 7 출력. 세 수 중 최댓값을 구하는 패턴입니다.' },
                    { q: '다음 코드의 출력은?\nchar = "A"\nif "a" <= char <= "z":\n    print("소문자")\nelif "A" <= char <= "Z":\n    print("대문자")\nelse:\n    print("기타")', choices: ['소문자', '대문자', '기타', 'Error'], answer: 1, explanation: '"A"는 "A"~"Z" 범위에 있으므로 "대문자"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nscore = 72\ngrade = "A" if score >= 90 else "B" if score >= 80 else "C" if score >= 70 else "D"\nprint(grade)', choices: ['A', 'B', 'C', 'D'], answer: 2, explanation: '72는 90미만, 80미만, 70이상이므로 "C"가 grade에 저장됩니다. 중첩 삼항 연산자입니다.' },
                    { q: '다음 코드의 출력은?\nnums = [1, -2, 3, -4, 5]\nresult = [x for x in nums if x > 0]\nprint(result)', choices: ['[1, 3, 5]', '[1, -2, 3, -4, 5]', '[-2, -4]', 'Error'], answer: 0, explanation: '리스트 컴프리헨션에서 if로 양수만 필터링합니다. [1, 3, 5]가 됩니다.' },
                    { q: '다음 코드의 출력은?\nx = 10\nif x % 2 == 0:\n    result = "짝수"\nelse:\n    result = "홀수"\nprint(result)', choices: ['짝수', '홀수', 'Error', '10'], answer: 0, explanation: '10%2==0은 True이므로 result="짝수"가 됩니다.' },
                    { q: 'BMI 판정 코드에서 ___에 들어갈 조건은?\nbmi = 22\nif bmi < 18.5:\n    print("저체중")\nelif ___:\n    print("정상")\nelse:\n    print("과체중")', choices: ['bmi < 25', 'bmi >= 18.5', 'bmi < 25 and bmi >= 18.5', 'bmi < 25 (이미 18.5이상 보장)'], answer: 3, explanation: 'elif에 도달했다면 이미 bmi>=18.5이므로 bmi < 25만 확인하면 됩니다.' },
                    { q: '다음 코드의 출력은?\ntry:\n    x = 10 / 0\nexcept ZeroDivisionError:\n    print("0으로 나눌 수 없음")', choices: ['Error', '0으로 나눌 수 없음', 'inf', '0'], answer: 1, explanation: '10/0은 ZeroDivisionError를 발생시키고, except가 이를 잡아 메시지를 출력합니다.' },
                    { q: '다음 코드의 출력은?\nfor n in range(1, 11):\n    if n % 3 == 0 or n % 5 == 0:\n        print(n, end=" ")', choices: ['3 5 6 9 10', '3 6 9', '5 10', '15 30'], answer: 0, explanation: '3의 배수(3,6,9) 또는 5의 배수(5,10)를 출력합니다. 결과: 3 5 6 9 10.' },
                    { q: '다음 코드의 출력은?\ndef is_even(n):\n    return n % 2 == 0\nprint(is_even(4), is_even(7))', choices: ['True True', 'True False', 'False True', '4 7'], answer: 1, explanation: '4는 짝수(True), 7은 홀수(False)입니다. 함수가 불리언을 반환합니다.' },
                    { q: '다음 코드의 출력은?\ntime = 14\nif time < 12:\n    greet = "오전"\nelif time < 18:\n    greet = "오후"\nelse:\n    greet = "저녁"\nprint(greet)', choices: ['오전', '오후', '저녁', 'Error'], answer: 1, explanation: '14는 12이상(F), 18미만(T)이므로 "오후"가 greet에 저장됩니다.' },
                    { q: '다음 코드의 출력은?\ntext = "Python3"\nhas_digit = any(c.isdigit() for c in text)\nif has_digit:\n    print("숫자 포함")', choices: ['숫자 포함', '아무것도 안 나옴', 'Error', 'True'], answer: 0, explanation: '"Python3"에 숫자 "3"이 있으므로 any()가 True를 반환하여 "숫자 포함"이 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nnum = 17\nis_prime = all(num % i != 0 for i in range(2, num))\nif is_prime and num > 1:\n    print("소수")', choices: ['소수', '아무것도 안 나옴', 'Error', '17'], answer: 0, explanation: '17은 2~16 어떤 수로도 나누어지지 않으므로 소수입니다. all()이 True를 반환합니다.' },
                    { q: '다음 코드의 출력은?\nage = 25\nif age < 0 or age > 150:\n    print("잘못된 나이")\nelif age < 20:\n    print("미성년")\nelse:\n    print("성인")', choices: ['잘못된 나이', '미성년', '성인', 'Error'], answer: 2, explanation: '25는 유효 범위(0~150), 20이상이므로 "성인"이 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nlst = [1, 2, 3, 4, 5]\neven = [x for x in lst if x % 2 == 0]\nprint(even)', choices: ['[2, 4]', '[1, 3, 5]', '[1, 2, 3, 4, 5]', 'Error'], answer: 0, explanation: '짝수 필터: [2,4]입니다. 리스트 컴프리헨션의 if 절로 필터링합니다.' },
                    { q: '딕셔너리 컴프리헨션에서 조건문을 사용하는 올바른 형태는?', choices: ['{k:v for k,v in d.items() if v > 0}', '{if k > 0: k:v for k,v in d}', '{k:v where v > 0}', '{filter(k,v) for k in d}'], answer: 0, explanation: '딕셔너리 컴프리헨션에서도 끝에 if 조건을 추가하여 필터링할 수 있습니다.' },
                    { q: '다음 코드의 결과는?\nresult = {x: x**2 for x in range(1, 6) if x % 2 != 0}\nprint(result)', choices: ['{1: 1, 3: 9, 5: 25}', '{2: 4, 4: 16}', '{1: 1, 2: 4, 3: 9}', 'Error'], answer: 0, explanation: '홀수만 필터링하여 {1:1, 3:9, 5:25}이 됩니다.' },
                    { q: '다음 코드의 출력은?\ndef classify(n):\n    if n > 0: return "양수"\n    elif n < 0: return "음수"\n    else: return "영"\nprint(classify(0))', choices: ['양수', '음수', '영', 'Error'], answer: 2, explanation: '0은 0보다 크지도(F), 작지도(F) 않으므로 else의 "영"이 반환됩니다.' },
                    { q: '다음 코드의 출력은?\ncommand = "quit"\nif command == "start":\n    print("시작")\nelif command in ("quit", "exit", "q"):\n    print("종료")\nelse:\n    print("알 수 없음")', choices: ['시작', '종료', '알 수 없음', 'Error'], answer: 1, explanation: '"quit"이 ("quit", "exit", "q") 튜플에 포함되므로 "종료"가 출력됩니다.' },
                    { q: 'FizzBuzz에서 15의 배수를 먼저 검사해야 하는 이유는?', choices: ['속도가 빠르므로', '15의 배수는 3과 5의 배수이므로 나중에 검사하면 Fizz나 Buzz로 출력됨', '문법 규칙', '15가 가장 큰 수이므로'], answer: 1, explanation: 'elif 구조에서 3의 배수를 먼저 검사하면 15도 Fizz로 출력됩니다. 가장 구체적인 조건을 먼저 검사합니다.' },
                    { q: '다음 코드의 결과는?\nimport random\nx = random.randint(1, 10)\nif 1 <= x <= 10:\n    print("정상 범위")', choices: ['정상 범위 (항상)', '때때로 출력', 'Error', '아무것도 안 나옴'], answer: 0, explanation: 'randint(1,10)은 항상 1~10 범위의 정수를 반환하므로 항상 "정상 범위"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\ndata = [10, 20, 30]\navg = sum(data) / len(data)\nif avg >= 20:\n    print("양호")', choices: ['양호', '아무것도 안 나옴', 'Error', '20'], answer: 0, explanation: '평균=60/3=20.0>=20(T)이므로 "양호"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nx = "hello"\nif x.isdigit():\n    print(int(x) * 2)\nelse:\n    print(x.upper())', choices: ['HELLO', '10', 'Error', 'hello'], answer: 0, explanation: '"hello"는 숫자가 아니므로(isdigit=F) else의 upper()가 실행되어 "HELLO"가 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nfor i in range(5):\n    if i == 3:\n        break\n    print(i, end=" ")', choices: ['0 1 2 3', '0 1 2', '0 1 2 3 4', '3'], answer: 1, explanation: 'i=3일 때 break로 반복문을 종료합니다. 0, 1, 2까지만 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nlst = [None, 0, "", "Hi", 42]\nresult = [x for x in lst if x]\nprint(result)', choices: ['[Hi, 42]', '[None, 0, ...]', '[]', 'Error'], answer: 0, explanation: 'if x로 truthy 값만 필터링합니다. None, 0, ""은 falsy이므로 "Hi"와 42만 남습니다.' },
                    { q: '다음 코드의 출력은?\ndef safe_div(a, b):\n    if b == 0:\n        return "0으로 나눌 수 없음"\n    return a / b\nprint(safe_div(10, 0))', choices: ['Error', 'inf', '0으로 나눌 수 없음', '0'], answer: 2, explanation: 'b=0이므로 가드 절로 조기 반환하여 "0으로 나눌 수 없음"을 출력합니다.' },
                    { q: '다음 코드의 출력은?\nmatrix = [[1,0],[0,1]]\nif all(matrix[i][i] == 1 for i in range(2)):\n    print("단위행렬")', choices: ['단위행렬', 'Error', '아무것도 안 나옴', '[[1,0],[0,1]]'], answer: 0, explanation: 'matrix[0][0]=1, matrix[1][1]=1이므로 all() 결과 True. "단위행렬"이 출력됩니다.' },
                    { q: '다음 코드의 출력은?\nx = [1, 2, 3]\nif x:\n    print("리스트에 요소가 있음")\nelse:\n    print("빈 리스트")', choices: ['리스트에 요소가 있음', '빈 리스트', 'Error', 'True'], answer: 0, explanation: '[1,2,3]은 비어있지 않은 리스트이므로 truthy입니다. if x가 True로 평가되어 첫 번째 메시지가 출력됩니다.' }
                ]

            },

        ], related: ['u14', 'u16'],

    },



    // ──────── LOOP (Unit 16~21) ────────

    {

        id: 'u16', category: 'loop', name: 'Unit 16. for 반복문', hanja: 'For Loop',

        short: 'for, range(), 시퀀스 순회', color: '#ef4444', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: 'for문은 시퀀스(리스트, 문자열 등)의 각 요소를 순회하며 반복합니다. range()로 숫자 범위를 생성합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: 'for 변수 in 시퀀스:', desc: '시퀀스의 각 요소를 변수에 할당하며 반복' },

                    { label: 'range(n)', desc: '0부터 n-1까지의 정수 시퀀스' },

                    { label: 'range(a,b)', desc: 'a부터 b-1까지' },

                    { label: 'range(a,b,step)', desc: 'a부터 b-1까지 step 간격' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: 'for문의 기본 문법은?', choices: ['for i in range(5):', 'for (i=0; i<5; i++)', 'for i = 0 to 5:', 'for each i in 5:'], answer: 0, explanation: 'Python의 for문은 for 변수 in 반복가능객체: 형태입니다. C 스타일의 for문은 사용하지 않습니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(5):\n    print(i, end=" ")', choices: ['1 2 3 4 5', '0 1 2 3 4', '0 1 2 3 4 5', '1 2 3 4'], answer: 1, explanation: 'range(5)는 0, 1, 2, 3, 4를 생성합니다. 0부터 시작하여 5 미만까지입니다.' },
{ q: 'range(2, 8)이 생성하는 수열은?', choices: ['2, 3, 4, 5, 6, 7', '2, 3, 4, 5, 6, 7, 8', '0, 1, 2, 3, 4, 5, 6, 7', '2, 8'], answer: 0, explanation: 'range(시작, 끝)은 시작부터 끝-1까지입니다. range(2, 8) = 2, 3, 4, 5, 6, 7.' },
{ q: 'range(1, 10, 2)의 결과는?', choices: ['1, 3, 5, 7, 9', '1, 2, 3, 4, 5', '2, 4, 6, 8, 10', '1, 10, 2'], answer: 0, explanation: 'range(시작, 끝, 간격)입니다. 1부터 9까지 2씩 증가: 1, 3, 5, 7, 9.' },
{ q: '다음 코드의 출력은?\nfor ch in "Python":\n    print(ch, end="")', choices: ['Python', 'P y t h o n', 'PYTHON', 'Error'], answer: 0, explanation: '문자열도 반복 가능합니다. 각 문자를 하나씩 꺼내어 "Python"이 출력됩니다.' },
{ q: '다음 코드의 출력은?\nfor item in [10, 20, 30]:\n    print(item, end=" ")', choices: ['10 20 30', '[10, 20, 30]', '0 1 2', 'Error'], answer: 0, explanation: '리스트의 각 요소를 순회합니다. 10, 20, 30이 차례로 출력됩니다.' },
{ q: '다음 코드의 출력은?\ntotal = 0\nfor i in range(1, 6):\n    total += i\nprint(total)', choices: ['6', '10', '15', '21'], answer: 2, explanation: '1+2+3+4+5 = 15입니다. range(1,6)으로 1부터 5까지 누적 합산합니다.' },
{ q: '___에 들어갈 코드는?\nfor i in ___:\n    print(i)  # 10, 8, 6, 4, 2 출력', choices: ['range(10, 1, -2)', 'range(2, 10, 2)', 'range(10, 0, -2)', 'range(10, 2, -2)'], answer: 0, explanation: 'range(10, 1, -2)는 10부터 2까지(1 초과) 2씩 감소: 10, 8, 6, 4, 2입니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(3):\n    for j in range(2):\n        print(f"({i},{j})", end=" ")', choices: ['(0,0) (0,1) (1,0) (1,1) (2,0) (2,1)', '(0,0) (1,1) (2,2)', '(0,0) (1,0) (2,0)', 'Error'], answer: 0, explanation: '중첩 for문에서 외부 i가 0,1,2일 때 각각 내부 j가 0,1을 반복합니다. 총 6개 출력.' },
{ q: 'enumerate()의 역할은?', choices: ['리스트 정렬', '인덱스와 값을 함께 반환', '리스트 생성', '문자열 변환'], answer: 1, explanation: 'enumerate(리스트)는 (인덱스, 값) 쌍을 반환합니다. for i, v in enumerate(lst): 형태로 사용합니다.' },
{ q: '다음 코드의 출력은?\nfor i, v in enumerate(["a", "b", "c"]):\n    print(f"{i}:{v}", end=" ")', choices: ['a:0 b:1 c:2', '0:a 1:b 2:c', '1:a 2:b 3:c', 'Error'], answer: 1, explanation: 'enumerate는 0부터 인덱스를 부여합니다. 0:a, 1:b, 2:c가 출력됩니다.' },
{ q: '다음 코드의 출력은?\nresult = [x**2 for x in range(1, 6)]\nprint(result)', choices: ['[1, 2, 3, 4, 5]', '[1, 4, 9, 16, 25]', '[2, 4, 6, 8, 10]', 'Error'], answer: 1, explanation: '리스트 컴프리헨션으로 1~5의 제곱을 구합니다. [1, 4, 9, 16, 25]입니다.' },
{ q: '다음 코드의 출력은?\nfruits = ["사과", "바나나", "체리"]\nfor f in fruits:\n    if len(f) == 2:\n        print(f, end=" ")', choices: ['사과 바나나 체리', '사과 체리', '바나나', '아무것도 안 나옴'], answer: 1, explanation: '길이가 2인 문자열: "사과"(2), "바나나"(3), "체리"(2). "사과"와 "체리"가 출력됩니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(5, 0, -1):\n    print(i, end=" ")', choices: ['5 4 3 2 1', '0 1 2 3 4 5', '5 4 3 2 1 0', '1 2 3 4 5'], answer: 0, explanation: 'range(5, 0, -1)은 5부터 1까지(0 초과) 1씩 감소합니다.' },
{ q: '다음 코드의 출력은?\nfor _ in range(3):\n    print("Hi", end=" ")', choices: ['Hi', 'Hi Hi Hi', '0 1 2', 'Error'], answer: 1, explanation: '_는 반복 변수를 사용하지 않을 때 관례적으로 사용합니다. 3번 반복하여 "Hi"를 출력합니다.' },
{ q: 'zip()의 역할은?', choices: ['파일 압축', '여러 반복가능객체를 병렬로 묶음', '리스트 정렬', '문자열 분리'], answer: 1, explanation: 'zip(a, b)는 a와 b의 요소를 쌍으로 묶어 반환합니다. for x, y in zip(a, b): 형태로 사용합니다.' },
{ q: '다음 코드의 출력은?\nnames = ["Kim", "Lee"]\nages = [20, 25]\nfor n, a in zip(names, ages):\n    print(f"{n}:{a}", end=" ")', choices: ['Kim:20 Lee:25', 'Kim Lee 20 25', '(Kim,20) (Lee,25)', 'Error'], answer: 0, explanation: 'zip으로 이름과 나이를 쌍으로 묶어 "Kim:20 Lee:25"를 출력합니다.' },
{ q: 'for-else에서 else는 언제 실행되나?', choices: ['항상', 'for가 break 없이 정상 완료될 때', 'for가 break로 종료될 때', '에러 발생 시'], answer: 1, explanation: 'for-else에서 else는 반복이 break 없이 정상 종료될 때 실행됩니다. break로 빠져나오면 else는 실행되지 않습니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(5):\n    if i == 10:\n        break\nelse:\n    print("완료")', choices: ['완료', '아무것도 안 나옴', 'Error', '10'], answer: 0, explanation: 'i==10이 되는 경우가 없으므로 break가 실행되지 않습니다. 정상 완료 후 else의 "완료"가 출력됩니다.' },
{ q: '다음 코드의 출력은?\nword = "hello"\nresult = ""\nfor ch in word:\n    result = ch + result\nprint(result)', choices: ['hello', 'olleh', 'h e l l o', 'Error'], answer: 1, explanation: '각 문자를 앞에 추가하므로 문자열이 뒤집힙니다. h→eh→leh→lleh→olleh.' },
{ q: '다음 코드의 출력은?\nfor i in range(1, 4):\n    print("*" * i)', choices: ['*\n**\n***', '***\n**\n*', '***', '* * *'], answer: 0, explanation: 'i=1: *, i=2: **, i=3: ***. 별이 한 줄씩 증가하는 삼각형 패턴입니다.' },
{ q: 'map() 함수의 역할은?', choices: ['지도 생성', '모든 요소에 함수를 적용', '필터링', '정렬'], answer: 1, explanation: 'map(함수, 반복가능)은 각 요소에 함수를 적용한 결과를 반환합니다.' },
{ q: '다음 코드의 출력은?\nnums = list(map(int, ["1", "2", "3"]))\nprint(nums)', choices: ['[1, 2, 3]', '["1", "2", "3"]', '[123]', 'Error'], answer: 0, explanation: 'map(int, ...)은 각 문자열에 int()를 적용합니다. ["1","2","3"] -> [1, 2, 3].' },
{ q: 'filter() 함수의 역할은?', choices: ['정렬', '조건에 맞는 요소만 걸러냄', '변환', '합산'], answer: 1, explanation: 'filter(함수, 반복가능)은 함수가 True를 반환하는 요소만 걸러냅니다.' },
{ q: '다음 코드의 출력은?\nnums = [1, 2, 3, 4, 5, 6]\nresult = list(filter(lambda x: x % 2 == 0, nums))\nprint(result)', choices: ['[1, 3, 5]', '[2, 4, 6]', '[1, 2, 3, 4, 5, 6]', 'Error'], answer: 1, explanation: 'filter로 짝수만 걸러냅니다. lambda x: x%2==0이 True인 [2, 4, 6]이 됩니다.' },
{ q: '다음 코드의 출력은?\nd = {"a": 1, "b": 2, "c": 3}\nfor k in d:\n    print(k, end=" ")', choices: ['a b c', '1 2 3', 'a:1 b:2 c:3', 'Error'], answer: 0, explanation: '딕셔너리를 for문으로 순회하면 키만 반복됩니다. a, b, c가 출력됩니다.' },
{ q: '다음 코드의 출력은?\nd = {"x": 10, "y": 20}\nfor k, v in d.items():\n    print(f"{k}={v}", end=" ")', choices: ['x=10 y=20', 'x y', '10 20', 'Error'], answer: 0, explanation: 'd.items()는 (키, 값) 쌍을 반환합니다. "x=10 y=20"이 출력됩니다.' },
{ q: '다음 코드의 출력은?\nresult = sum(i for i in range(1, 11))\nprint(result)', choices: ['10', '45', '55', '100'], answer: 2, explanation: '제너레이터 표현식으로 1~10의 합을 구합니다. 1+2+...+10 = 55입니다.' },
{ q: '다음 코드의 출력은?\nmatrix = [[1,2],[3,4],[5,6]]\nflat = [x for row in matrix for x in row]\nprint(flat)', choices: ['[[1,2],[3,4],[5,6]]', '[1, 2, 3, 4, 5, 6]', '[1, 3, 5]', 'Error'], answer: 1, explanation: '중첩 리스트 컴프리헨션으로 2차원 리스트를 1차원으로 펼칩니다. [1,2,3,4,5,6].' },
{ q: '다음 코드의 출력은?\nfor i in range(0):\n    print("실행")\nprint("끝")', choices: ['실행\n끝', '끝', 'Error', '무한 루프'], answer: 1, explanation: 'range(0)은 빈 시퀀스이므로 for 블록이 한 번도 실행되지 않습니다. "끝"만 출력됩니다.' }
]

            },

        ], related: ['u15', 'u17'],

    },

    {

        id: 'u17', category: 'loop', name: 'Unit 17. while 반복문', hanja: 'While Loop',

        short: 'while 조건, 무한 루프, 카운터 패턴', color: '#ef4444', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: 'while문은 조건이 True인 동안 계속 반복합니다. 반복 횟수가 정해지지 않은 경우에 유용합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: 'while 조건:', desc: '조건이 True인 동안 블록 반복 실행' },

                    { label: '무한 루프', desc: 'while True: — break로 탈출 필요' },

                    { label: '카운터', desc: 'i=0; while i<n: ... i+=1' },

                    { label: '주의', desc: '조건이 항상 True면 무한 반복 (프로그램 멈춤)' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: 'while문의 기본 문법은?', choices: ['while 조건:', 'while (조건) {}', 'while 조건 do:', 'do while 조건:'], answer: 0, explanation: 'Python의 while문은 while 조건: 형태입니다. 조건이 True인 동안 반복합니다.' },
{ q: '다음 코드의 출력은?\ni = 0\nwhile i < 3:\n    print(i, end=" ")\n    i += 1', choices: ['0 1 2', '0 1 2 3', '1 2 3', '무한 루프'], answer: 0, explanation: 'i=0에서 시작, 3 미만일 때 반복. 0, 1, 2를 출력하고 i=3이 되면 종료합니다.' },
{ q: '다음 코드의 문제점은?\ni = 0\nwhile i < 5:\n    print(i)', choices: ['문법 오류', 'i를 증가시키지 않아 무한 루프', '출력 오류', '조건 오류'], answer: 1, explanation: 'i 값이 변하지 않으므로 i < 5가 항상 True여서 무한 루프에 빠집니다. i += 1이 필요합니다.' },
{ q: '무한루프를 만드는 방법은?', choices: ['while True:', 'while 1:', 'for i in iter(int, 1):', '모두 가능'], answer: 3, explanation: 'while True, while 1, iter(int,1) 모두 무한 반복을 생성합니다. while True:가 가장 일반적입니다.' },
{ q: '다음 코드의 출력은?\nn = 1\nwhile n <= 100:\n    n *= 2\nprint(n)', choices: ['64', '128', '100', '256'], answer: 1, explanation: 'n: 1->2->4->8->16->32->64->128. n=128일 때 128<=100이 False가 되어 종료, 128 출력.' },
{ q: '___에 들어갈 코드는?\ncount = 10\nwhile ___:\n    print(count, end=" ")\n    count -= 1\n# 출력: 10 9 8 7 6 5 4 3 2 1', choices: ['count > 0', 'count >= 0', 'count != 0', 'count > 0과 count != 0 둘 다 가능'], answer: 3, explanation: 'count가 1씩 감소하므로 count > 0과 count != 0 모두 같은 결과를 냅니다. 양수일 때만 반복.' },
{ q: 'while-else에서 else는 언제 실행되나?', choices: ['항상', '조건이 False가 되어 정상 종료될 때', 'break로 종료될 때', '에러 발생 시'], answer: 1, explanation: 'while-else의 else는 조건이 False가 되어 정상 종료될 때 실행됩니다. break 시 실행되지 않습니다.' },
{ q: '다음 코드의 출력은?\ni = 0\nwhile i < 3:\n    i += 1\nelse:\n    print("정상 종료")', choices: ['정상 종료', '아무것도 안 나옴', 'Error', '0 1 2'], answer: 0, explanation: 'i가 3이 되면 조건이 False가 되어 정상 종료. else의 "정상 종료"가 출력됩니다.' },
{ q: '다음 코드의 출력은?\nwhile True:\n    name = "Kim"\n    break\nprint(name)', choices: ['Kim', 'Error', '아무것도 안 나옴', '무한 루프'], answer: 0, explanation: 'while True로 시작하지만 즉시 break로 빠져나옵니다. name="Kim"이 설정된 후 출력됩니다.' },
{ q: 'while문과 for문의 차이는?', choices: ['같은 기능', 'for는 횟수 기반, while은 조건 기반', 'while이 항상 빠르다', 'for는 무한루프 불가'], answer: 1, explanation: 'for는 반복 횟수가 정해진 경우, while은 조건에 따라 반복 횟수가 달라지는 경우에 적합합니다.' },
{ q: '다음 코드는 몇 번 반복하는가?\nx = 100\nwhile x > 1:\n    x //= 2', choices: ['6번', '7번', '50번', '100번'], answer: 1, explanation: 'x: 100->50->25->12->6->3->1. 총 7번 나눕니다. 마지막에 x=1이 되면 조건이 False.' },
{ q: '다음 코드의 출력은?\nn = 12345\ndigit_sum = 0\nwhile n > 0:\n    digit_sum += n % 10\n    n //= 10\nprint(digit_sum)', choices: ['12345', '15', '5', '54321'], answer: 1, explanation: '각 자릿수를 분리하여 합산: 5+4+3+2+1=15. n%10으로 끝자리, n//10으로 나머지 자릿수.' },
{ q: '다음 코드의 출력은?\nimport time\nstart = time.time()\nwhile time.time() - start < 0:\n    pass\nprint("즉시")', choices: ['즉시', '오래 걸림', 'Error', '무한 루프'], answer: 0, explanation: '경과 시간이 0보다 작을 수 없으므로 while 조건은 즉시 False. "즉시"가 출력됩니다.' },
{ q: '다음 코드의 출력은?\nresult = 1\nn = 5\nwhile n > 0:\n    result *= n\n    n -= 1\nprint(result)', choices: ['15', '120', '5', '24'], answer: 1, explanation: '5! = 5*4*3*2*1 = 120입니다. 팩토리얼을 while문으로 계산합니다.' },
{ q: '다음 코드의 출력은?\ncount = 0\ntext = "banana"\ni = 0\nwhile i < len(text):\n    if text[i] == "a":\n        count += 1\n    i += 1\nprint(count)', choices: ['1', '2', '3', '6'], answer: 2, explanation: '"banana"에서 a는 위치 1, 3, 5 = 아... b(0),a(1),n(2),a(3),n(4),a(5) -> 3개. 아, 3개입니다.' },
{ q: '다음 코드의 결과는?\na, b = 0, 1\nwhile b < 100:\n    a, b = b, a + b\nprint(a)', choices: ['89', '55', '144', '34'], answer: 0, explanation: '피보나치 수열: 0,1,1,2,3,5,8,13,21,34,55,89. b=144>=100일 때 a=89.' },
{ q: '다음 코드에서 에러가 나는 것은?', choices: ['while True: break', 'while 1: pass', 'while: pass', 'while False: pass'], answer: 2, explanation: 'while 뒤에 조건이 반드시 필요합니다. while: pass는 SyntaxError입니다.' },
{ q: '다음 코드의 출력은?\nn = 7\nwhile n != 1:\n    if n % 2 == 0:\n        n //= 2\n    else:\n        n = n * 3 + 1\nprint("도착")', choices: ['도착', '무한 루프', 'Error', '1'], answer: 0, explanation: '콜라츠 추측: 7->22->11->34->17->52->26->13->40->20->10->5->16->8->4->2->1. 최종 "도착".' },
{ q: '다음 코드의 출력은?\ntotal = 0\nn = 1\nwhile total < 20:\n    total += n\n    n += 1\nprint(f"{n - 1}까지 합: {total}")', choices: ['4까지 합: 10', '5까지 합: 15', '6까지 합: 21', '7까지 합: 28'], answer: 2, explanation: '1+2+3+4+5=15(<20), +6=21(>=20) 종료. n=7이지만 n-1=6까지 합산. "6까지 합: 21".' },
{ q: '다음 코드의 출력은?\nstack = [1, 2, 3]\nwhile stack:\n    print(stack.pop(), end=" ")', choices: ['1 2 3', '3 2 1', '3', 'Error'], answer: 1, explanation: 'pop()은 마지막 요소를 제거하고 반환합니다. 3, 2, 1 순으로 출력. 빈 리스트가 되면 False.' },
{ q: 'while문으로 사용자 입력을 반복 받는 패턴은?', choices: ['while True + break', 'while input() + 조건', 'do-while', '첫째와 둘째 모두 가능'], answer: 3, explanation: 'while True에서 break로 탈출하거나, while 조건에 입력을 넣어 반복할 수 있습니다.' },
{ q: '다음 코드의 출력은?\ni = 10\nwhile i > 0:\n    i -= 3\nprint(i)', choices: ['1', '0', '-2', '-1'], answer: 2, explanation: 'i: 10->7->4->1->-2. i=-2일 때 -2>0이 False가 되어 종료. -2 출력.' },
{ q: '다음 코드의 출력은?\nline = ""\nwhile len(line) < 5:\n    line += "#"\nprint(line)', choices: ['#####', '####', '######', 'Error'], answer: 0, explanation: '길이가 5 미만일 때 #을 추가: ""(0)->"#"(1)->...->"#####"(5). 5가 되면 종료. "#####" 출력.' },
{ q: '다음 코드의 출력은?\nlow, high = 0, 100\nwhile low < high:\n    mid = (low + high) // 2\n    if mid < 42:\n        low = mid + 1\n    else:\n        high = mid\nprint(low)', choices: ['42', '41', '43', '50'], answer: 0, explanation: '이진 탐색으로 42를 찾습니다. 최종적으로 low=high=42가 됩니다.' },
{ q: '다음 코드의 출력은?\nwhile False:\n    print("실행")\nprint("종료")', choices: ['실행\n종료', '종료', 'Error', '무한 루프'], answer: 1, explanation: 'while False는 조건이 처음부터 False이므로 본문이 한 번도 실행되지 않습니다. "종료"만 출력.' },
{ q: '다음 코드의 출력은?\ns = "abcde"\ni = len(s) - 1\nwhile i >= 0:\n    print(s[i], end="")\n    i -= 1', choices: ['abcde', 'edcba', 'e', 'Error'], answer: 1, explanation: '인덱스를 뒤에서 앞으로: s[4]=e, s[3]=d, s[2]=c, s[1]=b, s[0]=a. "edcba".' },
{ q: '다음 코드의 출력은?\nn = 1024\ncount = 0\nwhile n > 1:\n    n //= 2\n    count += 1\nprint(count)', choices: ['10', '9', '11', '1024'], answer: 0, explanation: '1024를 2로 나누는 횟수: 1024->512->...->1. 2^10=1024이므로 10번.' },
{ q: 'while문에서 sentinel(보초) 값이란?', choices: ['반복 횟수', '반복 종료를 알리는 특별한 입력값', '에러 코드', '초기값'], answer: 1, explanation: '보초 값은 반복 종료 조건으로 사용하는 특별한 값입니다. 예: -1을 입력하면 종료.' },
{ q: '다음 코드의 출력은?\nnum = 16\nresult = 0\nwhile 2 ** result <= num:\n    result += 1\nprint(result - 1)', choices: ['3', '4', '5', '16'], answer: 1, explanation: '2^0=1, 2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32>16 종료. result=5, result-1=4. log2(16)=4.' },
{ q: '다음 코드의 출력은?\nresult = []\nn = 1\nwhile n <= 5:\n    result.append(n * n)\n    n += 1\nprint(result)', choices: ['[1, 4, 9, 16, 25]', '[1, 2, 3, 4, 5]', '[2, 4, 6, 8, 10]', 'Error'], answer: 0, explanation: '1*1=1, 2*2=4, 3*3=9, 4*4=16, 5*5=25. while문으로 1~5의 제곱을 리스트에 추가합니다.' }
]

            },

        ], related: ['u16', 'u18'],

    },

    {

        id: 'u18', category: 'loop', name: 'Unit 18. break·continue', hanja: 'Break & Continue',

        short: 'break 탈출, continue 건너뛰기, for-else', color: '#ef4444', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: 'break는 반복문을 즉시 탈출하고, continue는 현재 반복을 건너뛰고 다음 반복으로 넘어갑니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: 'break', desc: '반복문을 즉시 종료. 가장 가까운 반복문만 탈출' },

                    { label: 'continue', desc: '나머지 코드를 건너뛰고 다음 반복으로' },

                    { label: 'for-else', desc: 'break 없이 정상 완료되면 else 실행' },

                    { label: '중첩 탈출', desc: 'flag 변수나 함수 return으로 중첩 반복 탈출' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: 'break문의 역할은?', choices: ['프로그램 종료', '현재 반복문을 즉시 종료', '다음 반복으로 건너뜀', '함수 종료'], answer: 1, explanation: 'break는 현재 반복문(for/while)을 즉시 종료합니다. 중첩 루프에서는 가장 안쪽 루프만 종료합니다.' },
{ q: 'continue문의 역할은?', choices: ['반복문 종료', '현재 반복을 건너뛰고 다음 반복으로', '프로그램 종료', '함수 종료'], answer: 1, explanation: 'continue는 현재 반복의 나머지를 건너뛰고 다음 반복으로 진행합니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(10):\n    if i == 5:\n        break\n    print(i, end=" ")', choices: ['0 1 2 3 4 5', '0 1 2 3 4', '5 6 7 8 9', '0 1 2 3 4 5 6 7 8 9'], answer: 1, explanation: 'i=5일 때 break로 종료합니다. 0, 1, 2, 3, 4까지만 출력됩니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(6):\n    if i % 2 == 0:\n        continue\n    print(i, end=" ")', choices: ['0 2 4', '1 3 5', '0 1 2 3 4 5', '1 2 3 4 5'], answer: 1, explanation: '짝수(0,2,4)일 때 continue로 건너뜁니다. 홀수 1, 3, 5만 출력됩니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(1, 6):\n    if i == 3:\n        continue\n    if i == 5:\n        break\n    print(i, end=" ")', choices: ['1 2 3 4', '1 2 4', '1 2', '1 2 4 5'], answer: 1, explanation: 'i=3은 continue(건너뜀), i=5는 break(종료). 1, 2, 4가 출력됩니다.' },
{ q: '중첩 for에서 break는 어떤 루프를 종료하나?', choices: ['모든 루프', '가장 바깥 루프', '가장 안쪽 루프', '선택 가능'], answer: 2, explanation: 'break는 자신을 감싸는 가장 안쪽 루프만 종료합니다. 바깥 루프를 종료하려면 플래그 변수 등을 사용합니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(3):\n    for j in range(3):\n        if j == 1:\n            break\n        print(f"{i},{j}", end=" ")', choices: ['0,0 1,0 2,0', '0,0 0,1 0,2 1,0 1,1 1,2 2,0 2,1 2,2', '0,0', 'Error'], answer: 0, explanation: '내부 루프에서 j=1일 때 break. 각 i에서 j=0만 출력: 0,0 1,0 2,0.' },
{ q: 'pass문의 역할은?', choices: ['반복문 종료', '다음 반복', '아무 동작 없음(자리 표시)', '프로그램 종료'], answer: 2, explanation: 'pass는 아무 동작도 하지 않습니다. 빈 블록이 필요할 때 자리 표시 용도로 사용합니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(5):\n    pass\nprint(i)', choices: ['4', '0', 'Error', '5'], answer: 0, explanation: 'pass는 아무 것도 하지 않지만 반복은 진행됩니다. 마지막 i=4가 출력됩니다.' },
{ q: '다음 코드의 출력은?\nnums = [2, 4, 7, 8, 10]\nfor n in nums:\n    if n % 2 != 0:\n        print(f"첫 홀수: {n}")\n        break', choices: ['첫 홀수: 2', '첫 홀수: 7', '첫 홀수: 10', '아무것도 안 나옴'], answer: 1, explanation: '2,4는 짝수(건너뜀), 7은 홀수 -> "첫 홀수: 7" 출력 후 break.' },
{ q: '다음 코드의 출력은?\ntext = "Hello World"\nfor ch in text:\n    if ch == " ":\n        continue\n    print(ch, end="")', choices: ['Hello World', 'HelloWorld', 'Hello', 'Error'], answer: 1, explanation: '공백 문자를 만나면 continue로 건너뜁니다. 공백 없이 "HelloWorld"가 출력됩니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(2, 10):\n    if i == 5:\n        break\nelse:\n    print("완료")\nprint("끝")', choices: ['완료\n끝', '끝', 'Error', '완료'], answer: 1, explanation: 'i=5에서 break가 실행되므로 else는 실행되지 않습니다. "끝"만 출력됩니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(2, 5):\n    pass\nelse:\n    print("완료")', choices: ['완료', '아무것도 안 나옴', 'Error', '2 3 4'], answer: 0, explanation: 'break 없이 for문이 정상 종료되므로 else가 실행됩니다. "완료" 출력.' },
{ q: '다음 코드의 출력은?\nresult = []\nfor i in range(10):\n    if i % 3 == 0:\n        continue\n    if i > 7:\n        break\n    result.append(i)\nprint(result)', choices: ['[1, 2, 4, 5, 7]', '[0, 3, 6, 9]', '[1, 2, 3, 4, 5, 6, 7]', '[1, 2, 4, 5, 7, 8]'], answer: 0, explanation: '3의 배수(0,3,6,9) continue, i>7(8,9) break. 남는 것: 1,2,4,5,7.' },
{ q: '다음 코드에서 에러가 나는 것은?', choices: ['break (for문 안)', 'continue (while문 안)', 'break (if문 안, 반복문 밖)', 'pass (어디서든)'], answer: 2, explanation: 'break와 continue는 반복문(for/while) 안에서만 사용 가능합니다. if문만 있으면 SyntaxError.' },
{ q: '다음 코드의 출력은?\ni = 0\nwhile i < 10:\n    i += 1\n    if i % 2 == 0:\n        continue\n    print(i, end=" ")', choices: ['1 3 5 7 9', '2 4 6 8 10', '0 1 2 3 4 5 6 7 8 9', '1 2 3 4 5'], answer: 0, explanation: '짝수일 때 continue. 홀수만 출력: 1, 3, 5, 7, 9.' },
{ q: '무한 루프에서 사용자 입력으로 종료하는 패턴은?', choices: ['while True + if input == "q": break', 'for i in range(infinity)', 'while input():', 'exit()만 사용'], answer: 0, explanation: 'while True로 무한 반복하고, 특정 입력(예: "q")이 들어오면 break로 탈출하는 것이 일반적입니다.' },
{ q: '다음 코드의 출력은?\nfor word in ["hello", "", "world", ""]:\n    if not word:\n        continue\n    print(word, end=" ")', choices: ['hello  world', 'hello world', 'hello  world  ', 'Error'], answer: 1, explanation: '빈 문자열은 falsy이므로 not word가 True -> continue. "hello"와 "world"만 출력됩니다.' },
{ q: '다음 코드에서 소수 판별의 핵심은?\nfor n in range(2, 20):\n    for i in range(2, n):\n        if n % i == 0:\n            break\n    else:\n        print(n, end=" ")', choices: ['중첩 for', 'for-else와 break 조합', 'continue', 'pass'], answer: 1, explanation: 'n이 어떤 i로도 나누어지면 break(소수 아님, else 미실행). 안 나누어지면 else 실행(소수).' },
{ q: '다음 코드의 출력은?\ndata = [1, -1, 2, -2, 3]\npos_sum = 0\nfor x in data:\n    if x < 0:\n        continue\n    pos_sum += x\nprint(pos_sum)', choices: ['3', '6', '-3', '0'], answer: 1, explanation: '음수는 continue로 건너뜁니다. 양수만 합산: 1+2+3=6.' },
{ q: '다음 코드의 출력은?\ncount = 0\nfor i in range(100):\n    if count >= 5:\n        break\n    if i % 7 == 0 and i > 0:\n        print(i, end=" ")\n        count += 1', choices: ['7 14 21 28 35', '7 14 21 28 35 42', '0 7 14 21 28', '7 14'], answer: 0, explanation: '7의 배수 중 양수 5개: 7,14,21,28,35. count=5가 되면 break.' },
{ q: '다음 코드의 출력은?\nfor i in range(3):\n    for j in range(3):\n        if i == j:\n            continue\n        print(f"{i}{j}", end=" ")', choices: ['01 02 10 12 20 21', '00 11 22', '01 10', 'Error'], answer: 0, explanation: 'i==j일 때 continue(00,11,22 건너뜀). 나머지 조합이 출력됩니다.' },
{ q: '플래그 변수를 사용한 중첩 루프 탈출 패턴은?', choices: ['break 두 번', 'found = True + 외부 if found: break', 'return 사용', '둘째와 셋째 모두 가능'], answer: 3, explanation: '플래그 변수(found=True)로 외부 루프도 break하거나, 함수로 감싸서 return으로 탈출할 수 있습니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(5):\n    try:\n        if i == 3:\n            raise StopIteration\n        print(i, end=" ")\n    except StopIteration:\n        break', choices: ['0 1 2', '0 1 2 3', '0 1 2 3 4', 'Error'], answer: 0, explanation: 'i=3에서 StopIteration 발생 -> except에서 break. 0,1,2만 출력됩니다.' },
{ q: '다음 코드의 출력은?\nnums = [4, 6, 8, 3, 10, 12]\nall_even = True\nfor n in nums:\n    if n % 2 != 0:\n        all_even = False\n        break\nprint(all_even)', choices: ['True', 'False', 'Error', '3'], answer: 1, explanation: '3은 홀수이므로 all_even=False로 설정하고 break. 결과: False.' },
{ q: '다음 코드의 출력은?\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\ntarget = 5\nfor i, row in enumerate(matrix):\n    for j, val in enumerate(row):\n        if val == target:\n            print(f"위치: ({i},{j})")\n            break\n    else:\n        continue\n    break', choices: ['위치: (1,1)', '위치: (0,0)', '위치: (2,2)', 'Error'], answer: 0, explanation: '5는 matrix[1][1]에 있습니다. for-else-continue-break 패턴으로 중첩 루프를 완전히 탈출합니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(1, 6):\n    if i == 1 or i == 5:\n        print("*" * i)\n    else:\n        print("*" + " " * (i-2) + "*")', choices: ['*\n* *\n*   *\n* *\n*****', '*\n**\n* *\n**\n*****', '*\n* *\n*  *\n*   *\n*****', 'Error'], answer: 2, explanation: 'i=1: *, i=2: **, i=3: * *, i=4: *  *, i=5: *****. 테두리만 출력하는 삼각형 패턴.' },
{ q: 'break와 return의 차이는?', choices: ['같은 기능', 'break는 반복문만 종료, return은 함수 전체 종료', 'return은 값을 반환하지 않음', 'break는 함수도 종료'], answer: 1, explanation: 'break는 가장 가까운 반복문만 종료하고, return은 현재 함수를 완전히 종료하며 값을 반환합니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(3):\n    print(f"i={i}")\n    for j in range(3, 0, -1):\n        if j == 2:\n            break\n        print(f"  j={j}")\nprint("끝")', choices: ['i=0\n  j=3\ni=1\n  j=3\ni=2\n  j=3\n끝', 'i=0\ni=1\ni=2\n끝', 'i=0\n  j=3\n  j=2\n끝', 'Error'], answer: 0, explanation: '내부 루프: j=3 출력 후 j=2에서 break. 외부 i=0,1,2 각각 j=3만 출력. 마지막 "끝".' },
{ q: '다음 코드의 출력은?\nresult = ""\nfor ch in "Python":\n    if ch in "aeiou":\n        continue\n    result += ch\nprint(result)', choices: ['Python', 'Pythn', 'oho', 'Error'], answer: 1, explanation: '모음(a,e,i,o,u)을 만나면 continue로 건너뜁니다. P,y,t,h,n만 남아 "Pythn"이 됩니다.' }
]

            },

        ], related: ['u17', 'u19'],

    },



    {

        id: 'u19', category: 'loop', name: 'Unit 19. 별찍기 패턴', hanja: 'Star Patterns',

        short: '직각삼각형, 역삼각형, 피라미드 패턴', color: '#ef4444', icon: 'maintenance',

        sections: [

            { type: 'definition', title: '개요', content: '중첩 for문을 활용하여 다양한 별 패턴을 출력합니다. 반복문의 논리를 연습하는 대표적인 예제입니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '직각삼각형', desc: 'for i in range(1,n+1): print("*"*i)' },

                    { label: '역삼각형', desc: 'for i in range(n,0,-1): print("*"*i)' },

                    { label: '피라미드', desc: '공백과 별 조합. " "*(n-i) + "*"*(2*i-1)' },

                    { label: '핵심 원리', desc: '행(i)과 열(j)의 관계식 파악이 핵심' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '다음 코드의 출력은?\nfor i in range(1, 4):\n    print("*" * i)', choices: ['*\n**\n***', '***\n**\n*', '* * *', '***'], answer: 0, explanation: 'i=1: *, i=2: **, i=3: ***. 별이 1개에서 3개로 증가하는 직각삼각형입니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(3, 0, -1):\n    print("*" * i)', choices: ['*\n**\n***', '***\n**\n*', '***', '* * *'], answer: 1, explanation: 'i=3: ***, i=2: **, i=1: *. 역삼각형 패턴으로 별이 감소합니다.' },
{ q: '___에 들어갈 코드는?\nfor i in range(1, 6):\n    print(___ + "*" * i)\n# 오른쪽 정렬 삼각형', choices: ['" " * i', '" " * (5 - i)', '"*" * (5 - i)', 'str(i)'], answer: 1, explanation: '공백을 (5-i)개 넣어 오른쪽 정렬합니다. i=1이면 공백4+별1, i=5이면 공백0+별5.' },
{ q: '다음 코드의 출력 패턴은?\nfor i in range(1, 4):\n    print(" " * (3-i) + "*" * (2*i-1))', choices: ['직각삼각형', '피라미드', '역삼각형', '마름모'], answer: 1, explanation: 'i=1: 공백2+별1, i=2: 공백1+별3, i=3: 공백0+별5. 가운데 정렬 피라미드.' },
{ q: '5행 피라미드의 마지막 줄 별 개수는?', choices: ['5', '9', '10', '7'], answer: 1, explanation: 'n행 피라미드의 마지막 줄 별 개수는 2*n-1입니다. n=5이면 2*5-1=9개.' },
{ q: '다음 코드의 출력은?\nfor i in range(5):\n    for j in range(5):\n        print("*", end=" ")\n    print()', choices: ['5x5 별 사각형', '삼각형', '한 줄', 'Error'], answer: 0, explanation: '외부 5번, 내부 5번 반복하여 5줄 x 5열의 별 직사각형을 출력합니다.' },
{ q: '다음 코드의 출력은?\nn = 4\nfor i in range(n):\n    for j in range(i+1):\n        print("*", end="")\n    print()', choices: ['*\n**\n***\n****', '****\n***\n**\n*', '****', '* * * *'], answer: 0, explanation: 'i=0: 별1, i=1: 별2, i=2: 별3, i=3: 별4. 왼쪽 정렬 직각삼각형.' },
{ q: '마름모를 출력하려면 어떤 구조가 필요한가?', choices: ['for문 1개', '피라미드 + 역피라미드 (for문 2개)', 'while문만', 'if문만'], answer: 1, explanation: '마름모는 위쪽 피라미드와 아래쪽 역피라미드를 결합하여 만듭니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(1, 6):\n    for j in range(1, 6):\n        if i == 1 or i == 5 or j == 1 or j == 5:\n            print("*", end="")\n        else:\n            print(" ", end="")\n    print()', choices: ['꽉 찬 사각형', '빈 사각형(테두리만)', '삼각형', 'Error'], answer: 1, explanation: '첫/마지막 행 또는 첫/마지막 열일 때만 별 출력. 나머지는 공백. 5x5 테두리 사각형.' },
{ q: '___에 들어갈 수식은?\nn = 5\nfor i in range(n):\n    print(" " * ___ + "*" * (2*i+1))', choices: ['i', 'n - i', 'n - i - 1', 'n - 1'], answer: 2, explanation: '공백 = n-i-1, 별 = 2*i+1. i=0: 공백4+별1, i=4: 공백0+별9. 피라미드 패턴.' },
{ q: '다음 코드의 출력은?\nfor i in range(5):\n    print(str(i+1) * (i+1))', choices: ['1\n22\n333\n4444\n55555', '12345', '54321', '1\n12\n123\n1234\n12345'], answer: 0, explanation: 'i=0: "1"*1, i=1: "2"*2, i=2: "3"*3... 숫자가 반복되는 삼각형 패턴.' },
{ q: '다음 코드의 출력은?\nfor i in range(1, 6):\n    for j in range(1, i+1):\n        print(j, end="")\n    print()', choices: ['1\n12\n123\n1234\n12345', '1\n22\n333', '12345\n1234\n123', 'Error'], answer: 0, explanation: 'j는 1부터 i까지 출력. 1->12->123->1234->12345. 숫자 삼각형.' },
{ q: '다음 코드의 출력은?\nfor i in range(4):\n    for j in range(4):\n        if (i + j) % 2 == 0:\n            print("#", end="")\n        else:\n            print(" ", end="")\n    print()', choices: ['체크무늬(#과 공백 번갈아)', '모두 #', '모두 공백', 'Error'], answer: 0, explanation: '(i+j)가 짝수면 #, 홀수면 공백. 체스판 같은 체크무늬 패턴이 만들어집니다.' },
{ q: '모래시계 패턴을 만들려면?', choices: ['역삼각형 + 삼각형', '삼각형 + 역삼각형', '사각형 2개', '원형 패턴'], answer: 0, explanation: '모래시계는 위쪽 역삼각형(큰->작은)과 아래쪽 삼각형(작은->큰)을 결합합니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(7):\n    if i < 4:\n        print(" " * (3-i) + "*" * (2*i+1))\n    else:\n        print(" " * (i-3) + "*" * (13-2*i))', choices: ['피라미드', '마름모', '역삼각형', '나비 모양'], answer: 1, explanation: 'i<4: 피라미드(별 증가), i>=4: 역피라미드(별 감소). 최대 7줄 마름모.' },
{ q: '이중 for문에서 별찍기의 시간복잡도는?', choices: ['O(1)', 'O(n)', 'O(n^2)', 'O(n!)'], answer: 2, explanation: '외부 n번, 내부 최대 n번 반복하므로 O(n^2)입니다.' },
{ q: '다음 코드의 출력은?\nn = 3\nfor i in range(n):\n    print("* " * n)', choices: ['별 9개 (3x3 격자)', '별 3개', '별 6개', 'Error'], answer: 0, explanation: '각 줄에 "* "을 3번 반복. 3줄 출력하여 3x3 격자(별 9개)가 됩니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(1, 6):\n    print(("*" * i).center(9))', choices: ['왼쪽 정렬 삼각형', '가운데 정렬 피라미드', '오른쪽 정렬 삼각형', 'Error'], answer: 1, explanation: 'center(9)로 별을 9칸 중앙에 배치합니다. 가운데 정렬 피라미드가 됩니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(5):\n    line = ""\n    for j in range(5):\n        if j <= i:\n            line += "*"\n        else:\n            line += " "\n    line += line[::-1]\n    print(line)', choices: ['삼각형', '나비 모양', '마름모', '사각형'], answer: 1, explanation: '왼쪽 삼각형을 만든 후 뒤집어 오른쪽에 붙입니다. 나비(bowtie) 모양이 됩니다.' },
{ q: '파스칼의 삼각형 첫 5줄의 마지막 줄은?', choices: ['1 4 6 4 1', '1 3 3 1', '1 5 10 10 5 1', '1 1 1 1 1'], answer: 0, explanation: '파스칼 삼각형 5번째 줄: 1, 4, 6, 4, 1. 각 수는 바로 위 두 수의 합입니다.' },
{ q: 'end="" 매개변수의 역할은?', choices: ['줄바꿈 방지', '프로그램 종료', '에러 무시', '반복 종료'], answer: 0, explanation: 'print()는 기본적으로 줄바꿈(\n)을 추가합니다. end=""로 줄바꿈 없이 같은 줄에 계속 출력합니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(5, 0, -1):\n    print(" " * (5-i) + "* " * i)', choices: ['역피라미드(가운데 정렬)', '피라미드', '직각삼각형', 'Error'], answer: 0, explanation: 'i=5: 별10, i=4: 공백1+별8... 가운데 정렬 역피라미드입니다.' },
{ q: '다음 코드의 출력은?\nalpha = "ABCDE"\nfor i in range(5):\n    print(alpha[:i+1])', choices: ['A\nAB\nABC\nABCD\nABCDE', 'ABCDE', 'E\nDE\nCDE', 'ABCDE\nABCD\nABC'], answer: 0, explanation: '슬라이싱으로 A, AB, ABC, ABCD, ABCDE를 차례로 출력합니다.' },
{ q: '다음 코드의 출력은?\nfor row in range(3):\n    line = ""\n    for col in range(6):\n        line += str((row + col) % 10)\n    print(line)', choices: ['012345\n123456\n234567', '000000\n111111\n222222', '012012\n120120\n201201', 'Error'], answer: 0, explanation: '(row+col)%10으로 숫자가 순환합니다. 대각선 방향으로 숫자가 증가하는 패턴.' },
{ q: '별찍기에서 sep 매개변수의 활용은?', choices: ['별 사이 구분자 설정', '줄바꿈 설정', '에러 처리', '색상 설정'], answer: 0, explanation: 'print("*", "*", sep="-")는 "*-*"를 출력합니다. sep로 출력 항목 사이 구분자를 설정합니다.' },
{ q: '다음 코드의 결과는?\npattern = ["  *  ", " *** ", "*****", " *** ", "  *  "]\nfor line in pattern:\n    print(line)', choices: ['마름모', '삼각형', '사각형', '별 1개'], answer: 0, explanation: '리스트에 미리 패턴을 저장하고 출력하는 방식입니다. 5줄 마름모가 출력됩니다.' },
{ q: 'join과 별찍기를 조합하면?', choices: ['의미 없음', '"*".join(["*"] * n)으로 간결한 별 행 생성', 'join은 숫자 전용', 'join은 리스트 전용'], answer: 1, explanation: '"*".join(["*"]*3) = "***" 이렇게는 안 되고, " ".join(["*"]*3) = "* * *"으로 간격 조절에 유용합니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(1, 6):\n    print(" ".join(str(j) for j in range(1, i+1)))', choices: ['1\n1 2\n1 2 3\n1 2 3 4\n1 2 3 4 5', '12345', '1\n12\n123', 'Error'], answer: 0, explanation: 'join으로 숫자 사이 공백을 넣습니다. 가독성 좋은 숫자 삼각형이 됩니다.' },
{ q: '별찍기 패턴 문제 해결의 핵심 전략은?', choices: ['무조건 외우기', '행(row)별로 공백과 별의 개수 규칙(수식)을 찾기', '랜덤 배치', '라이브러리 사용'], answer: 1, explanation: '각 행에서 공백=f(i), 별=g(i) 형태의 규칙을 찾는 것이 핵심입니다. 패턴을 수식으로 표현합니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(1, 4):\n    print((" " * (3-i)) + ("*" * (2*i-1)))', choices: ['  *\n ***\n*****', '*\n**\n***', '***\n**\n*', 'Error'], answer: 0, explanation: '공백과 별의 수가 변하여 가운데 정렬 피라미드가 됩니다. i=1:2공백+1별, i=2:1공백+3별, i=3:0공백+5별.' }
]

            },

        ], related: ['u18', 'u20'],

    },

    {

        id: 'u20', category: 'loop', name: 'Unit 20. FizzBuzz·구구단', hanja: 'FizzBuzz & Multiplication',

        short: 'FizzBuzz 문제, 구구단 출력, 반복 응용', color: '#ef4444', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: 'FizzBuzz(3→Fizz, 5→Buzz, 15→FizzBuzz)와 구구단은 반복문과 조건문을 결합하는 대표적인 프로그래밍 연습문제입니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: 'FizzBuzz', desc: '15의배수→FizzBuzz, 3의배수→Fizz, 5의배수→Buzz, else→숫자' },

                    { label: '구구단', desc: '이중 for문으로 2~9단 출력' },

                    { label: '조건 순서', desc: 'FizzBuzz에서 15의 배수를 먼저 검사해야 함' },

                    { label: '포매팅', desc: 'f-string으로 깔끔한 출력 구성' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: 'FizzBuzz 문제의 규칙은?', choices: ['3의 배수면 Fizz, 5의 배수면 Buzz, 둘 다면 FizzBuzz', '짝수면 Fizz, 홀수면 Buzz', '소수면 Fizz', '10의 배수면 FizzBuzz'], answer: 0, explanation: 'FizzBuzz는 유명한 프로그래밍 문제입니다. 3의 배수→Fizz, 5의 배수→Buzz, 15의 배수→FizzBuzz.' },
{ q: 'FizzBuzz에서 15를 먼저 검사해야 하는 이유는?', choices: ['15가 가장 크니까', '15는 3과 5의 공배수이므로 나중에 검사하면 Fizz나 Buzz로 처리됨', '순서 무관', '문법 규칙'], answer: 1, explanation: 'elif 구조에서 3의 배수를 먼저 검사하면 15도 Fizz로 출력됩니다. 가장 구체적인 조건 먼저!' },
{ q: '다음 코드의 출력에서 5번째 값은?\nfor i in range(1, 16):\n    if i % 15 == 0: print("FizzBuzz")\n    elif i % 3 == 0: print("Fizz")\n    elif i % 5 == 0: print("Buzz")\n    else: print(i)', choices: ['5', 'Buzz', 'Fizz', 'FizzBuzz'], answer: 1, explanation: '5번째(i=5)는 5의 배수이므로 "Buzz"입니다. 3의 배수도 아니고 15의 배수도 아닙니다.' },
{ q: '다음 코드의 출력에서 6번째 값은?', choices: ['6', 'Fizz', 'Buzz', 'FizzBuzz'], answer: 1, explanation: '6번째(i=6)는 3의 배수(6%3==0)이므로 "Fizz"입니다.' },
{ q: '1~15에서 FizzBuzz가 출력되는 수는?', choices: ['3', '5', '15', '3과 5'], answer: 2, explanation: 'FizzBuzz는 3과 5의 공배수(15의 배수)에서만 출력됩니다. 1~15 범위에서는 15뿐입니다.' },
{ q: '1~30에서 Fizz(FizzBuzz 제외)가 출력되는 횟수는?', choices: ['10', '8', '6', '4'], answer: 1, explanation: '3의 배수: 3,6,9,12,15,18,21,24,27,30(10개). 15,30은 FizzBuzz이므로 Fizz만: 8개.' },
{ q: 'FizzBuzz를 리스트 컴프리헨션으로 만들면?', choices: ['불가능', '["FizzBuzz" if i%15==0 else "Fizz" if i%3==0 else "Buzz" if i%5==0 else i for i in range(1,n)]', 'list(FizzBuzz(n))', '[fizzbuzz(i) for i in n]'], answer: 1, explanation: '중첩 삼항 연산자와 리스트 컴프리헨션으로 한 줄로 FizzBuzz를 구현할 수 있습니다.' },
{ q: '다음 코드의 결과에서 "숫자"가 출력되는 횟수는(1~15)?', choices: ['8', '7', '4', '11'], answer: 0, explanation: '1~15에서 Fizz(3,6,9,12), Buzz(5,10), FizzBuzz(15) = 7개. 나머지 숫자: 15-7 = 8개.' },
{ q: 'FizzBuzz를 i%3==0과 i%5==0 조합으로 작성하면?', choices: ['if i%3==0 and i%5==0: 먼저 검사', 'if i%3==0: 먼저 검사', '순서 무관', 'while문 필수'], answer: 0, explanation: 'i%3==0 and i%5==0을 먼저 검사하면 i%15==0과 같은 효과입니다.' },
{ q: '다음 FizzBuzz 변형의 출력은?\nfor i in range(1, 11):\n    out = ""\n    if i % 3 == 0: out += "Fizz"\n    if i % 5 == 0: out += "Buzz"\n    print(out or i)', choices: ['elif 방식과 다름', 'elif 방식과 동일', 'Error', '숫자만 출력'], answer: 1, explanation: '문자열 누적 방식: 3의 배수면 "Fizz", 5의 배수면 "Buzz" 추가. 15의 배수면 둘 다 추가되어 "FizzBuzz". elif 방식과 동일 결과.' },
{ q: '위 코드에서 "out or i"의 의미는?', choices: ['out과 i를 더함', 'out이 비어있으면 i를 출력', 'out이 있으면 i를 출력', 'Error'], answer: 1, explanation: '빈 문자열은 falsy이므로 or의 단축 평가로 i(숫자)가 출력됩니다. out에 값이 있으면 out을 출력.' },
{ q: 'FizzBuzz를 함수로 만들 때 적절한 설계는?', choices: ['def fizzbuzz(n): 하나의 수에 대한 결과 반환', 'def fizzbuzz(): 전체 출력', '클래스 필수', '함수 불필요'], answer: 0, explanation: '하나의 수를 받아 결과를 반환하는 함수가 재사용성이 좋습니다. 출력은 호출자가 결정합니다.' },
{ q: 'FizzBuzz 결과를 딕셔너리로 저장하면?', choices: ['{1:1, 2:2, 3:"Fizz", ...}', '[Fizz, Buzz, ...]', '불가능', '{Fizz: [3,6,9], ...}'], answer: 0, explanation: '{숫자: 결과} 형태로 저장할 수 있습니다. {1:1, 2:2, 3:"Fizz", 4:4, 5:"Buzz", ...}.' },
{ q: '다음 FizzBuzz 변형의 규칙은?\n3의 배수: Fizz, 5의 배수: Buzz, 7의 배수: Jazz', choices: ['105의 배수: FizzBuzzJazz', '15의 배수: FizzBuzz', '21의 배수: FizzJazz', '모두 맞음'], answer: 3, explanation: '여러 배수 조합이 가능합니다. 15→FizzBuzz, 21→FizzJazz, 35→BuzzJazz, 105→FizzBuzzJazz.' },
{ q: 'FizzBuzz에서 enumerate 활용은?', choices: ['불필요', '인덱스와 결과를 함께 관리할 때 유용', 'enumerate는 FizzBuzz에 사용 불가', '성능이 나빠짐'], answer: 1, explanation: 'enumerate를 사용하면 현재 위치와 함께 결과를 추적할 수 있어 유용합니다.' },
{ q: 'FizzBuzz 코드의 테스트 방법은?', choices: ['눈으로 확인', 'assert로 각 경우 검증', '실행만 하면 됨', '테스트 불필요'], answer: 1, explanation: 'assert fizzbuzz(3)=="Fizz", assert fizzbuzz(15)=="FizzBuzz" 등으로 자동 검증합니다.' },
{ q: '다음 코드의 출력은?\nresult = []\nfor i in range(1, 21):\n    if i % 3 == 0 and i % 5 == 0:\n        result.append("FB")\n    elif i % 3 == 0:\n        result.append("F")\n    elif i % 5 == 0:\n        result.append("B")\nprint(len(result))', choices: ['20', '9', '8', '10'], answer: 1, explanation: '3의 배수: 3,6,9,12,15,18(6개중 15는 FB), 5의 배수: 5,10,20(3개중 15는 FB). FB:1, F:5, B:3 = 총 9개.' },
{ q: 'FizzBuzz를 lambda로 표현하면?', choices: ['lambda i: "FizzBuzz" if i%15==0 else "Fizz" if i%3==0 else "Buzz" if i%5==0 else i', 'lambda: FizzBuzz()', 'lambda 불가', 'lambda i: fizz + buzz'], answer: 0, explanation: 'lambda에서도 중첩 삼항 연산자를 사용하여 FizzBuzz를 한 줄로 표현할 수 있습니다.' },
{ q: 'FizzBuzz 100까지의 실행에서 FizzBuzz의 출현 횟수는?', choices: ['6', '7', '5', '10'], answer: 0, explanation: '15의 배수: 15,30,45,60,75,90. 100까지 6개입니다. 100/15=6.67이므로 6번.' },
{ q: 'FizzBuzz를 map과 join으로 출력하면?', choices: ['print(",".join(map(fb, range(1,n))))', 'print(map(fb))', 'join 불가', 'map 불가'], answer: 0, explanation: 'fb 함수를 map으로 적용하고 join으로 연결하면 한 줄로 깔끔하게 출력됩니다.' },
{ q: 'FizzBuzz 문제가 코딩 면접에서 중요한 이유는?', choices: ['어렵기 때문', '조건 분기, 반복, 나머지 연산 등 기본 역량을 한 번에 평가', '특별한 알고리즘 필요', '속도 테스트'], answer: 1, explanation: 'FizzBuzz는 간단하지만 조건문 순서, 반복문, 모듈로 연산 등 기본기를 종합적으로 평가합니다.' },
{ q: '다음 코드에서 에러가 나는 것은?', choices: ['15 % 3', '15 % 0', '"15" % 3', '첫째와 셋째'], answer: 1, explanation: '0으로 나누면 ZeroDivisionError입니다. "15"%3은 포매팅 연산(오류 아님), 15%3=0은 정상.' },
{ q: 'FizzBuzz를 제너레이터로 만들면?', choices: ['def fb(n): yield 사용', 'def fb(n): return 사용', '제너레이터 불가', 'class 필수'], answer: 0, explanation: 'yield를 사용하면 메모리 효율적인 FizzBuzz 제너레이터를 만들 수 있습니다.' },
{ q: 'FizzBuzz에서 match-case(3.10+) 활용은?', choices: ['match i%15으로 패턴 매칭', '사용 불가', 'match i로 직접 매칭', 'case만 사용'], answer: 0, explanation: 'match (i%3, i%5): case (0,0): FizzBuzz / case (0,_): Fizz 등으로 구현 가능합니다.' },
{ q: '다음 코드의 출력은?\nfb = {i: ("Fizz"*(i%3==0) + "Buzz"*(i%5==0)) or str(i) for i in range(1, 16)}\nprint(fb[15])', choices: ['15', 'Fizz', 'Buzz', 'FizzBuzz'], answer: 3, explanation: '문자열*True="문자열", 문자열*False="". 15는 3과 5의 배수이므로 "Fizz"+"Buzz"="FizzBuzz".' },
{ q: '위 코드에서 or str(i)의 역할은?', choices: ['항상 str(i)', 'Fizz/Buzz가 없을 때(빈 문자열) 숫자를 문자열로 대체', '에러 방지', '타입 변환'], answer: 1, explanation: '3과 5의 배수가 아니면 빈 문자열("")이 되고, falsy이므로 or로 str(i)가 대체됩니다.' },
{ q: 'FizzBuzz를 역순(n부터 1까지)으로 출력하려면?', choices: ['range(n, 0, -1)', 'range(1, n+1)[::-1]', 'reversed(range(1, n+1))', '모두 가능'], answer: 3, explanation: '세 가지 방법 모두 n부터 1까지 역순으로 반복할 수 있습니다.' },
{ q: 'FizzBuzz 결과를 csv 파일로 저장하는 방법은?', choices: ['print만 사용', 'open() + write()로 파일 출력', '불가능', 'input() 사용'], answer: 1, explanation: 'with open("fb.csv","w") as f: 로 파일을 열고 각 줄을 write()로 저장합니다.' },
{ q: 'FizzBuzz를 재귀함수로 구현할 수 있는가?', choices: ['불가능', '가능하으나 비효율적', '가능하고 효율적', '재귀는 반복문과 무관'], answer: 1, explanation: '재귀로 구현 가능하지만, 단순 반복에는 for/while이 더 직관적이고 효율적입니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(1, 8):\n    if i % 3 == 0 and i % 5 == 0: print("FizzBuzz")\n    elif i % 3 == 0: print("Fizz")\n    elif i % 5 == 0: print("Buzz")\n    else: print(i)', choices: ['1 2 Fizz 4 Buzz Fizz 7', '1 2 3 4 5 6 7', 'Fizz Buzz FizzBuzz', 'Error'], answer: 0, explanation: '1~7: 1(숫자), 2(숫자), 3(Fizz), 4(숫자), 5(Buzz), 6(Fizz), 7(숫자).' }
]

            },

        ], related: ['u19', 'u21'],

    },

    {

        id: 'u21', category: 'loop', name: 'Unit 21. 터틀 그래픽', hanja: 'Turtle Graphics',

        short: 'turtle 모듈, 도형 그리기, 색상 설정', color: '#ef4444', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: 'turtle 모듈은 화면에 거북이를 움직여 그림을 그리는 교육용 도구입니다. 반복문과 결합하여 다양한 도형과 패턴을 만들 수 있습니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: 'forward()', desc: '거북이를 앞으로 이동 (선 그리기)' },

                    { label: 'right()/left()', desc: '오른쪽/왼쪽으로 회전 (각도)' },

                    { label: 'penup()/pendown()', desc: '펜 올리기/내리기 (선 그리기 on/off)' },

                    { label: 'color()/fillcolor()', desc: '선 색상/채우기 색상 설정' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: 'turtle 모듈의 역할은?', choices: ['게임 개발', '거북이 그래픽으로 그림 그리기', '데이터 분석', '웹 개발'], answer: 1, explanation: 'turtle은 거북이를 움직여 화면에 그림을 그리는 교육용 그래픽 모듈입니다.' },
{ q: 'turtle을 사용하기 위한 import문은?', choices: ['import graphics', 'import turtle', 'from draw import turtle', 'import pygame'], answer: 1, explanation: 'import turtle로 모듈을 불러옵니다. Python 표준 라이브러리에 포함되어 있습니다.' },
{ q: 'turtle.forward(100)의 의미는?', choices: ['뒤로 100 이동', '앞으로 100 픽셀 이동', '100도 회전', '속도 100 설정'], answer: 1, explanation: 'forward(거리)는 거북이가 현재 방향으로 지정 거리만큼 앞으로 이동합니다.' },
{ q: 'turtle.right(90)의 의미는?', choices: ['왼쪽으로 90도 회전', '오른쪽으로 90도 회전', '앞으로 90 이동', '뒤로 90 이동'], answer: 1, explanation: 'right(각도)는 거북이를 오른쪽(시계 방향)으로 지정 각도만큼 회전시킵니다.' },
{ q: '정사각형을 그리는 올바른 코드는?', choices: ['for i in range(4): t.forward(100); t.right(90)', 'for i in range(3): t.forward(100); t.right(120)', 't.circle(100)', 'for i in range(5): t.forward(100); t.right(72)'], answer: 0, explanation: '정사각형: 4번 반복, 한 변 100, 외각 90도 회전. 외각 = 360/변의수 = 360/4 = 90도.' },
{ q: '정삼각형의 외각은?', choices: ['60도', '90도', '120도', '180도'], answer: 2, explanation: '정다각형의 외각 = 360/변의 수. 정삼각형: 360/3 = 120도입니다.' },
{ q: '정n각형의 외각 공식은?', choices: ['360 / n', '180 / n', '360 * n', 'n * 90'], answer: 0, explanation: '정n각형의 외각 = 360/n도입니다. n=6(정육각형)이면 60도, n=5(오각형)이면 72도.' },
{ q: 'turtle.circle(50)의 의미는?', choices: ['반지름 50의 원 그리기', '지름 50의 원 그리기', '50각형 그리기', '50도 회전'], answer: 0, explanation: 'circle(반지름)은 지정 반지름의 원을 그립니다. 양수면 반시계 방향.' },
{ q: 'penup()과 pendown()의 역할은?', choices: ['색상 변경', '펜을 들어 이동 시 선 안 그림 / 펜을 내려 선 그림', '속도 조절', '크기 변경'], answer: 1, explanation: 'penup()으로 펜을 들면 이동해도 선이 안 그려집니다. pendown()으로 다시 그립니다.' },
{ q: 'pencolor("red")의 역할은?', choices: ['배경색 변경', '펜 색상을 빨강으로 설정', '거북이 크기 변경', '펜 굵기 변경'], answer: 1, explanation: 'pencolor()로 그리는 선의 색상을 변경합니다. "red", "#FF0000" 등 사용 가능.' },
{ q: 'turtle.speed(0)의 의미는?', choices: ['정지', '가장 느리게', '가장 빠르게', '보통 속도'], answer: 2, explanation: 'speed(0)은 애니메이션 없이 가장 빠르게 그립니다. 1(가장 느림)~10(빠름), 0(최고속).' },
{ q: '___에 들어갈 코드는?\nimport turtle\nt = turtle.Turtle()\nt.___()  # 펜 들기\nt.goto(100, 100)  # 선 없이 이동', choices: ['penup', 'pendown', 'hideturtle', 'clear'], answer: 0, explanation: 'penup()으로 펜을 들면 goto()로 이동해도 선이 그려지지 않습니다.' },
{ q: 'goto(x, y)의 역할은?', choices: ['상대 이동', '절대 좌표 (x, y)로 이동', '(x, y)만큼 이동', '회전'], answer: 1, explanation: 'goto(x, y)는 화면의 절대 좌표 (x, y)로 거북이를 이동시킵니다. (0,0)이 중앙입니다.' },
{ q: 'turtle의 기본 시작 위치와 방향은?', choices: ['(0,0) 오른쪽', '(100,100) 위쪽', '(0,0) 위쪽', '화면 왼쪽 상단'], answer: 0, explanation: '거북이는 화면 중앙 (0,0)에서 시작하며 오른쪽(동쪽)을 향합니다.' },
{ q: 'begin_fill()과 end_fill()의 역할은?', choices: ['색 채우기 시작/끝', '선 그리기 시작/끝', '화면 지우기', '프로그램 종료'], answer: 0, explanation: 'begin_fill()과 end_fill() 사이에 그린 도형 내부를 fillcolor()로 지정한 색으로 채웁니다.' },
{ q: '다음 코드로 그려지는 도형은?\nfor i in range(5):\n    t.forward(100)\n    t.right(144)', choices: ['오각형', '별(★)', '원', '삼각형'], answer: 1, explanation: '외각 144도로 5번 반복하면 별 모양이 그려집니다. 내각이 36도인 별입니다.' },
{ q: '나선(spiral)을 그리는 핵심은?', choices: ['같은 거리 반복', '이동 거리를 점점 증가시키며 회전', '원만 그리기', 'goto 사용'], answer: 1, explanation: '거리를 점점 늘리며 일정 각도를 회전하면 나선 형태가 됩니다. for i in range(100): t.forward(i);t.right(45)' },
{ q: 'hideturtle()의 역할은?', choices: ['거북이 삭제', '거북이 모양을 숨김(그림은 유지)', '화면 지우기', '프로그램 종료'], answer: 1, explanation: 'hideturtle()은 거북이 아이콘만 숨깁니다. 이미 그린 그림은 그대로 유지됩니다.' },
{ q: 'turtle.done()의 역할은?', choices: ['그림 삭제', '터틀 그래픽 창을 유지(닫히지 않게)', '프로그램 강제 종료', '그림 저장'], answer: 1, explanation: 'done()은 이벤트 루프를 시작하여 창이 바로 닫히지 않고 유지되게 합니다.' },
{ q: 'turtle.bgcolor("black")의 역할은?', choices: ['펜 색상 변경', '배경색을 검정으로 설정', '거북이 색상 변경', '채우기 색상'], answer: 1, explanation: 'bgcolor()로 터틀 그래픽 창의 배경색을 변경합니다.' },
{ q: '다음 코드의 결과는?\ncolors = ["red", "blue", "green", "yellow"]\nfor i in range(4):\n    t.pencolor(colors[i])\n    t.forward(100)\n    t.right(90)', choices: ['무지개 사각형', '4색 사각형(각 변 다른 색)', '빨간 사각형', 'Error'], answer: 1, explanation: '각 변을 그리기 전에 색상을 바꿉니다. 4색으로 된 정사각형이 그려집니다.' },
{ q: 'pensize(5)의 역할은?', choices: ['펜 색상 변경', '펜 굵기를 5픽셀로 설정', '이동 거리 5', '속도 5'], answer: 1, explanation: 'pensize() 또는 width()로 선의 굵기를 설정합니다. 기본값은 1입니다.' },
{ q: 'stamp()의 역할은?', choices: ['거북이 지우기', '현재 위치에 거북이 모양 도장 찍기', '소리 출력', '화면 저장'], answer: 1, explanation: 'stamp()는 현재 위치에 거북이 모양의 복사본을 찍습니다. 이동 경로 표시에 유용합니다.' },
{ q: 'clear()와 reset()의 차이는?', choices: ['같은 기능', 'clear: 그림만 지움, reset: 그림 지우고 위치/상태 초기화', 'clear가 더 강력', 'reset은 프로그램 종료'], answer: 1, explanation: 'clear()는 그림만 지우고 거북이 상태 유지. reset()은 그림 지우고 거북이를 초기 상태로 복원.' },
{ q: '다음 코드로 그려지는 것은?\nfor i in range(36):\n    t.circle(50)\n    t.right(10)', choices: ['원 1개', '꽃 모양(원 36개 겹침)', '나선', '사각형'], answer: 1, explanation: '원을 그리고 10도씩 회전하며 36번 반복(360도). 꽃잎처럼 원들이 겹치는 패턴.' },
{ q: 'screen.tracer(0)과 screen.update()의 조합 목적은?', choices: ['소리 추가', '그리기 애니메이션 끄고 한 번에 표시(속도 향상)', '색상 변경', '화면 크기 조절'], answer: 1, explanation: 'tracer(0)으로 실시간 그리기를 끄고, update()로 한 번에 화면을 갱신하여 속도를 크게 향상합니다.' },
{ q: 'turtle.shape("turtle")의 역할은?', choices: ['거북이 삭제', '커서 모양을 거북이로 변경', '거북이 크기 변경', '새 거북이 생성'], answer: 1, explanation: 'shape()로 커서 모양을 변경합니다. "arrow", "turtle", "circle", "square" 등을 사용 가능합니다.' },
{ q: '다음 코드의 결과는?\nfor i in range(100):\n    t.forward(i * 2)\n    t.right(91)', choices: ['직선', '정사각형 나선', '원', '별'], answer: 1, explanation: '거리가 점점 증가하고 91도(약 90도) 회전하여 정사각형 나선이 그려집니다.' },
{ q: 'turtle.onscreenclick()의 역할은?', choices: ['화면 클릭 이벤트 처리', '거북이 클릭', '프로그램 종료', '색상 변경'], answer: 0, explanation: 'onscreenclick(함수)로 화면 클릭 시 실행할 함수를 등록하여 인터랙티브 프로그램을 만듭니다.' },
{ q: 'turtle.write("Hello")의 역할은?', choices: ['파일에 저장', '화면에 텍스트 "Hello" 출력', '콘솔에 출력', '변수에 저장'], answer: 1, explanation: 'write()는 현재 거북이 위치에 텍스트를 그래픽 화면에 출력합니다.' }
]

            },

        ], related: ['u20', 'u22'],

    },



    // ──────── DATATYPE (Unit 22~28) ────────

    {

        id: 'u22', category: 'datatype', name: 'Unit 22. 리스트 심화', hanja: 'Advanced List',

        short: '슬라이싱, 컴프리헨션, 정렬, 복사', color: '#06b6d4', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: '리스트의 슬라이싱, 리스트 컴프리헨션, 정렬(sort/sorted), 얕은 복사/깊은 복사 등 고급 기법을 학습합니다.' },

            {

                type: 'keypoints', title: '핵심 포인트', items: [

                    { label: '슬라이싱', desc: 'a[1:4], a[::2], a[::-1] 등 부분 추출' },

                    { label: '컴프리헨션', desc: '[표현식 for 변수 in 시퀀스 if 조건]' },

                    { label: '정렬', desc: 'sort()(원본 변경) vs sorted()(새 리스트)' },

                    { label: '복사', desc: 'a[:], list(a), copy.deepcopy()' },

                ]

            },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '리스트의 특징으로 올바른 것은?', choices: ['변경 불가', '순서 있고 변경 가능', '중복 불허', '키-값 쌍'], answer: 1, explanation: '리스트는 순서가 있고(인덱스 접근), 변경 가능(mutable)하며, 중복 요소를 허용합니다.' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 3, 4, 5]\nprint(lst[1:4])', choices: ['[1, 2, 3]', '[2, 3, 4]', '[2, 3, 4, 5]', '[1, 2, 3, 4]'], answer: 1, explanation: '슬라이싱 [1:4]는 인덱스 1부터 3까지(4 미포함)입니다. [2, 3, 4].' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 3, 4, 5]\nprint(lst[-2:])', choices: ['[4, 5]', '[3, 4]', '[1, 2, 3]', '[5]'], answer: 0, explanation: 'lst[-2:]는 뒤에서 2번째부터 끝까지입니다. [4, 5].' },
{ q: 'append()와 extend()의 차이는?', choices: ['같은 기능', 'append: 요소 1개 추가, extend: 반복가능 객체의 요소들을 추가', 'extend가 더 느림', 'append는 리스트 전용'], answer: 1, explanation: 'append([1,2])는 리스트 자체를 추가하고, extend([1,2])는 1과 2를 각각 추가합니다.' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 3]\nlst.append([4, 5])\nprint(lst)', choices: ['[1, 2, 3, 4, 5]', '[1, 2, 3, [4, 5]]', '[1, 2, 3, 4]', 'Error'], answer: 1, explanation: 'append는 [4,5]를 리스트 하나의 요소로 추가합니다. [1, 2, 3, [4, 5]].' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 3]\nlst.extend([4, 5])\nprint(lst)', choices: ['[1, 2, 3, 4, 5]', '[1, 2, 3, [4, 5]]', '[1, 2, 3, 4]', 'Error'], answer: 0, explanation: 'extend는 [4,5]의 요소를 하나씩 추가합니다. [1, 2, 3, 4, 5].' },
{ q: 'insert(2, "X")의 의미는?', choices: ['인덱스 2의 값을 X로 변경', '인덱스 2 위치에 X를 삽입', 'X를 2번 추가', '2번째 X를 삭제'], answer: 1, explanation: 'insert(인덱스, 값)은 지정 위치에 값을 삽입합니다. 기존 요소는 뒤로 밀립니다.' },
{ q: 'pop()과 remove()의 차이는?', choices: ['같은 기능', 'pop: 인덱스로 삭제 + 반환, remove: 값으로 삭제', 'remove가 더 빠름', 'pop은 여러 개 삭제'], answer: 1, explanation: 'pop(i)는 인덱스 i의 요소를 제거하고 반환합니다. remove(v)는 첫 번째 값 v를 제거합니다.' },
{ q: '다음 코드의 출력은?\nlst = [3, 1, 4, 1, 5]\nlst.sort()\nprint(lst)', choices: ['[3, 1, 4, 1, 5]', '[1, 1, 3, 4, 5]', '[5, 4, 3, 1, 1]', 'Error'], answer: 1, explanation: 'sort()는 리스트를 오름차순으로 정렬합니다(원본 변경). [1, 1, 3, 4, 5].' },
{ q: 'sort()와 sorted()의 차이는?', choices: ['같은 기능', 'sort: 원본 변경, sorted: 새 리스트 반환', 'sorted가 느림', 'sort는 문자열 전용'], answer: 1, explanation: 'sort()는 원본을 직접 변경(None 반환), sorted()는 원본 유지하고 새 리스트를 반환합니다.' },
{ q: '다음 코드의 출력은?\nlst = [3, 1, 4]\nnew = sorted(lst, reverse=True)\nprint(new, lst)', choices: ['[4, 3, 1] [3, 1, 4]', '[4, 3, 1] [4, 3, 1]', '[1, 3, 4] [3, 1, 4]', 'Error'], answer: 0, explanation: 'sorted()는 원본을 변경하지 않고 새 내림차순 리스트를 반환합니다.' },
{ q: '리스트 컴프리헨션의 기본 형태는?', choices: ['[표현식 for 변수 in 반복가능]', 'list(for x in range)', 'new list = for x', '[for x: 표현식]'], answer: 0, explanation: '[표현식 for 변수 in 반복가능객체]가 기본 형태입니다. 조건 추가: [표현식 for 변수 in 반복가능 if 조건].' },
{ q: '다음 코드의 출력은?\nresult = [x**2 for x in range(5)]\nprint(result)', choices: ['[0, 1, 4, 9, 16]', '[1, 4, 9, 16, 25]', '[0, 2, 4, 6, 8]', 'Error'], answer: 0, explanation: 'range(5)는 0~4. 각 제곱: 0,1,4,9,16. [0, 1, 4, 9, 16].' },
{ q: '다음 코드의 출력은?\na = [1, 2, 3]\nb = a\nb.append(4)\nprint(a)', choices: ['[1, 2, 3]', '[1, 2, 3, 4]', '[4]', 'Error'], answer: 1, explanation: 'b = a는 같은 리스트를 참조합니다. b를 변경하면 a도 변경됩니다. 얕은 복사 주의!' },
{ q: '리스트를 독립적으로 복사하는 방법은?', choices: ['b = a', 'b = a.copy() 또는 b = a[:]', 'b = list(a)', '둘째와 셋째 모두'], answer: 3, explanation: 'a.copy(), a[:], list(a) 모두 새로운 리스트를 생성합니다. b=a는 참조만 복사.' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 3, 2, 1]\nprint(lst.count(2), lst.index(2))', choices: ['2 1', '1 2', '2 2', '1 1'], answer: 0, explanation: 'count(2)=2개, index(2)는 첫 번째 2의 위치=인덱스 1. "2 1" 출력.' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 3]\nlst.reverse()\nprint(lst)', choices: ['[1, 2, 3]', '[3, 2, 1]', '[3, 1, 2]', 'Error'], answer: 1, explanation: 'reverse()는 리스트를 역순으로 뒤집습니다(원본 변경). [3, 2, 1].' },
{ q: '다음 코드의 출력은?\nlst = [1, [2, 3], [4, [5, 6]]]\nprint(lst[2][1][0])', choices: ['4', '5', '6', 'Error'], answer: 1, explanation: 'lst[2]=[4,[5,6]], [2][1]=[5,6], [2][1][0]=5. 중첩 리스트 접근.' },
{ q: 'del lst[1]과 lst.pop(1)의 차이는?', choices: ['같은 기능', 'del은 반환값 없음, pop은 삭제된 값 반환', 'del이 느림', 'pop은 마지막만 삭제'], answer: 1, explanation: 'del은 삭제만 수행, pop은 삭제하면서 값을 반환합니다. pop()은 인덱스 생략 시 마지막 요소.' },
{ q: '다음 코드의 출력은?\nlst = list(range(0, 10, 2))\nprint(lst)', choices: ['[0, 2, 4, 6, 8]', '[0, 1, 2, 3, 4]', '[2, 4, 6, 8, 10]', '[0, 2, 4, 6, 8, 10]'], answer: 0, explanation: 'range(0,10,2)는 0부터 8까지 2씩 증가. list()로 변환하면 [0, 2, 4, 6, 8].' },
{ q: '다음 코드의 출력은?\nlst = [3, 1, 4, 1, 5, 9]\nprint(max(lst), min(lst), sum(lst))', choices: ['9 1 23', '5 1 23', '9 1 18', '9 0 23'], answer: 0, explanation: 'max=9, min=1, sum=3+1+4+1+5+9=23. 내장 함수로 리스트 통계를 구합니다.' },
{ q: '다음 코드의 출력은?\nlst = ["b", "a", "c"]\nlst.sort()\nprint(lst)', choices: ['["a", "b", "c"]', '["c", "b", "a"]', '["b", "a", "c"]', 'Error'], answer: 0, explanation: '문자열 리스트도 sort()로 정렬 가능합니다. 알파벳 순서(유니코드)로 정렬됩니다.' },
{ q: '리스트를 스택(Stack)으로 사용하려면?', choices: ['append + pop', 'insert + remove', 'extend + del', 'sort + reverse'], answer: 0, explanation: 'append()로 끝에 추가, pop()으로 끝에서 제거 = LIFO(후입선출) 스택 구현.' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 3, 4, 5]\nlst[1:3] = [20, 30, 40]\nprint(lst)', choices: ['[1, 20, 30, 40, 4, 5]', '[1, 20, 30, 4, 5]', '[1, 2, 20, 30, 40, 5]', 'Error'], answer: 0, explanation: '슬라이스 대입으로 인덱스 1~2를 [20,30,40]으로 교체합니다. 크기가 달라도 됩니다.' },
{ q: '다음 코드의 출력은?\nprint([i for i in range(10) if i % 3 == 0])', choices: ['[0, 3, 6, 9]', '[3, 6, 9]', '[0, 3, 6, 9, 12]', '[1, 2, 4, 5, 7, 8]'], answer: 0, explanation: '3의 배수 필터: 0, 3, 6, 9. range(10)에서 i%3==0인 것만 선택.' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 3] * 3\nprint(lst)', choices: ['[3, 6, 9]', '[1, 2, 3, 1, 2, 3, 1, 2, 3]', '[1, 2, 3]', 'Error'], answer: 1, explanation: '리스트 * n은 리스트를 n번 반복합니다. [1,2,3]이 3번 반복됩니다.' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 3]\nprint(lst + [4, 5])', choices: ['[1, 2, 3, 4, 5]', '[1, 2, 3, [4, 5]]', '[5, 7]', 'Error'], answer: 0, explanation: '+ 연산자는 두 리스트를 연결합니다. [1, 2, 3, 4, 5].' },
{ q: '다음 코드의 출력은?\nnums = [1, 2, 3, 4, 5]\nprint(nums[::2])', choices: ['[1, 3, 5]', '[2, 4]', '[1, 2]', '[5, 3, 1]'], answer: 0, explanation: '[::2]는 처음부터 끝까지 2칸씩 건너뛰어 선택합니다. [1, 3, 5].' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 3, 4, 5]\nprint(lst[::-1])', choices: ['[5, 4, 3, 2, 1]', '[1, 2, 3, 4, 5]', '[1, 3, 5]', 'Error'], answer: 0, explanation: '[::-1]은 리스트를 뒤집은 새 리스트를 반환합니다. [5, 4, 3, 2, 1].' },
{ q: '다음 코드의 출력은?\nprint([x for x in [1,2,2,3,3,3] if [1,2,2,3,3,3].count(x) == 1])', choices: ['[1]', '[2, 3]', '[1, 2, 3]', 'Error'], answer: 0, explanation: 'count(x)==1인 요소만 필터링합니다. 1은 1번, 2는 2번, 3은 3번 등장하므로 [1]만 남습니다.' }
]

            },

        ], related: ['u21', 'u23'],

    },

    {

        id: 'u23', category: 'datatype', name: 'Unit 23. 문자열 메서드', hanja: 'String Methods',

        short: 'split, join, replace, format, 정규식 기초', color: '#06b6d4', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: '문자열은 다양한 메서드를 제공합니다. split, join, replace, format 등으로 문자열을 처리하고 변환합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '튜플의 특징으로 올바른 것은?', choices: ['변경 가능', '순서 있고 변경 불가', '중복 불허', '키-값 쌍'], answer: 1, explanation: '튜플은 순서가 있고 변경 불가(immutable)하며 중복을 허용합니다. 소괄호()로 생성합니다.' },
{ q: '튜플을 생성하는 올바른 방법은?', choices: ['t = (1, 2, 3)', 't = [1, 2, 3]', 't = {1, 2, 3}', 't = <1, 2, 3>'], answer: 0, explanation: '튜플은 소괄호()로 생성합니다. 리스트는 [], 세트는 {}, 딕셔너리는 {k:v}.' },
{ q: '요소 1개인 튜플의 올바른 생성은?', choices: ['t = (1)', 't = (1,)', 't = tuple(1)', 't = [1]'], answer: 1, explanation: '(1)은 정수 1이고, (1,)이 요소 1개인 튜플입니다. 쉼표가 필수입니다.' },
{ q: '다음 코드의 출력은?\nt = (1, 2, 3)\nprint(t[1])', choices: ['1', '2', '3', 'Error'], answer: 1, explanation: '튜플도 인덱스로 접근합니다. t[1]은 두 번째 요소인 2입니다.' },
{ q: '다음 코드의 결과는?\nt = (1, 2, 3)\nt[0] = 10', choices: ['(10, 2, 3)', 'TypeError', '(1, 2, 3)', '[10, 2, 3]'], answer: 1, explanation: '튜플은 변경 불가(immutable)이므로 요소를 수정하면 TypeError가 발생합니다.' },
{ q: '튜플 언패킹이란?', choices: ['튜플 삭제', '튜플의 요소를 여러 변수에 한번에 대입', '튜플 정렬', '튜플 합치기'], answer: 1, explanation: 'a, b, c = (1, 2, 3)처럼 튜플의 각 요소를 변수에 대입하는 것이 언패킹입니다.' },
{ q: '다음 코드의 출력은?\na, b, c = (10, 20, 30)\nprint(b)', choices: ['10', '20', '30', 'Error'], answer: 1, explanation: '튜플 언패킹으로 a=10, b=20, c=30. b는 20입니다.' },
{ q: '다음 코드의 출력은?\na, *b = (1, 2, 3, 4, 5)\nprint(b)', choices: ['[2, 3, 4, 5]', '(2, 3, 4, 5)', '1', 'Error'], answer: 0, explanation: '*b는 나머지 요소를 리스트로 받습니다. a=1, b=[2,3,4,5]. 확장 언패킹.' },
{ q: '튜플을 사용하는 이유는?', choices: ['리스트보다 빠르다', '변경 방지(데이터 보호)', '딕셔너리 키로 사용 가능', '모두 맞음'], answer: 3, explanation: '튜플은 리스트보다 빠르고, 데이터 변경을 방지하며, 해시 가능하여 딕셔너리 키로 사용됩니다.' },
{ q: '다음 코드의 출력은?\nt = (1, 2, 3) + (4, 5)\nprint(t)', choices: ['(1, 2, 3, 4, 5)', '(5, 7)', '((1,2,3),(4,5))', 'Error'], answer: 0, explanation: '+ 연산자로 두 튜플을 연결합니다. (1, 2, 3, 4, 5).' },
{ q: '다음 코드의 출력은?\nt = (1, 2) * 3\nprint(t)', choices: ['(3, 6)', '(1, 2, 1, 2, 1, 2)', '(1, 2)', 'Error'], answer: 1, explanation: '튜플 * n은 튜플을 n번 반복합니다. (1, 2, 1, 2, 1, 2).' },
{ q: '다음 코드의 출력은?\nt = (3, 1, 4, 1, 5)\nprint(t.count(1), t.index(4))', choices: ['2 2', '1 4', '2 4', '1 2'], answer: 0, explanation: 'count(1)=2개, index(4)=인덱스 2. 튜플은 count와 index 메서드만 지원합니다.' },
{ q: '다음 코드의 출력은?\ndef get_info():\n    return "Kim", 25, "Seoul"\nname, age, city = get_info()\nprint(name)', choices: ['Kim', '25', 'Seoul', 'Error'], answer: 0, explanation: '함수가 여러 값을 반환하면 튜플로 묶입니다. 언패킹으로 각 변수에 대입됩니다.' },
{ q: '다음 코드의 출력은?\nt = (1, [2, 3], 4)\nt[1].append(5)\nprint(t)', choices: ['TypeError', '(1, [2, 3, 5], 4)', '(1, [2, 3], 4)', 'Error'], answer: 1, explanation: '튜플 자체는 불변이지만 내부의 리스트는 변경 가능합니다. [2,3]에 5가 추가됩니다.' },
{ q: '다음 코드의 출력은?\nprint(tuple("Hello"))', choices: ['("Hello",)', '("H","e","l","l","o")', 'Hello', 'Error'], answer: 1, explanation: 'tuple(문자열)은 각 문자를 요소로 하는 튜플을 생성합니다.' },
{ q: '튜플과 리스트의 변환은?', choices: ['불가능', 'list(튜플), tuple(리스트)로 변환', '자동 변환', '같은 타입'], answer: 1, explanation: 'list()로 튜플을 리스트로, tuple()로 리스트를 튜플로 변환할 수 있습니다.' },
{ q: '다음 코드의 출력은?\nfor i, v in enumerate(("a", "b", "c")):\n    print(f"{i}:{v}", end=" ")', choices: ['0:a 1:b 2:c', 'a b c', '0 1 2', 'Error'], answer: 0, explanation: 'enumerate는 튜플에도 사용 가능합니다. (인덱스, 값) 쌍을 반환합니다.' },
{ q: '다음 코드의 출력은?\ncoords = [(1,2), (3,4), (5,6)]\nfor x, y in coords:\n    print(x+y, end=" ")', choices: ['3 7 11', '1 2 3 4 5 6', '(1,2) (3,4) (5,6)', 'Error'], answer: 0, explanation: '각 튜플을 x, y로 언패킹하여 합산합니다. 1+2=3, 3+4=7, 5+6=11.' },
{ q: '다음 코드의 출력은?\na, b = 10, 20\na, b = b, a\nprint(a, b)', choices: ['10 20', '20 10', '20 20', 'Error'], answer: 1, explanation: '튜플 언패킹을 이용한 값 교환(swap)입니다. a=20, b=10이 됩니다.' },
{ q: '빈 튜플을 생성하는 방법은?', choices: ['t = ()', 't = tuple()', 't = (,)', '첫째와 둘째 모두'], answer: 3, explanation: '() 또는 tuple()로 빈 튜플을 생성합니다. (,)는 SyntaxError입니다.' },
{ q: '다음 코드의 출력은?\nt = 1, 2, 3\nprint(type(t))', choices: ['int', 'list', 'tuple', 'Error'], answer: 2, explanation: '괄호 없이 쉼표로 구분하면 자동으로 튜플이 됩니다. 1, 2, 3 = (1, 2, 3).' },
{ q: '다음 코드의 출력은?\nprint((1, 2, 3) == (1, 2, 3))', choices: ['True', 'False', 'Error', 'None'], answer: 0, explanation: '튜플은 요소별로 비교합니다. 모든 요소가 같으므로 True입니다.' },
{ q: '다음 코드의 출력은?\nprint((1, 2) < (1, 3))', choices: ['True', 'False', 'Error', 'None'], answer: 0, explanation: '튜플 비교는 사전식(lexicographic) 순서입니다. 첫 요소 같고 두 번째에서 2<3이므로 True.' },
{ q: 'named tuple이란?', choices: ['이름 있는 리스트', '필드명으로 접근 가능한 튜플', '딕셔너리의 별칭', '클래스'], answer: 1, explanation: 'collections.namedtuple로 필드명을 가진 튜플을 만듭니다. Point(x=1, y=2)처럼 접근 가능.' },
{ q: '다음 코드의 출력은?\nt = (1, 2, 3, 4, 5)\nprint(t[1:4])', choices: ['(2, 3, 4)', '(1, 2, 3)', '[2, 3, 4]', 'Error'], answer: 0, explanation: '튜플도 슬라이싱이 가능하며 결과도 튜플입니다. (2, 3, 4).' },
{ q: '튜플을 딕셔너리 키로 사용할 수 있는 이유는?', choices: ['크기가 작아서', '해시 가능(hashable)이므로', '정렬 가능해서', '문자열이라서'], answer: 1, explanation: '튜플은 불변이므로 해시 가능합니다. 리스트는 가변이라 딕셔너리 키로 사용 불가.' },
{ q: '다음 코드의 출력은?\nd = {(1,2): "A", (3,4): "B"}\nprint(d[(1,2)])', choices: ['A', 'B', 'Error', '(1,2)'], answer: 0, explanation: '튜플을 딕셔너리 키로 사용했습니다. (1,2) 키의 값 "A"를 반환합니다.' },
{ q: '다음 코드의 출력은?\nt = (10, 20, 30)\nprint(len(t), sum(t), max(t))', choices: ['3 60 30', '3 60 10', '3 30 30', 'Error'], answer: 0, explanation: 'len=3, sum=10+20+30=60, max=30. 내장 함수는 튜플에도 작동합니다.' },
{ q: '다음 코드의 출력은?\nprint(sorted((3, 1, 4, 1, 5)))', choices: ['(1, 1, 3, 4, 5)', '[1, 1, 3, 4, 5]', '(5, 4, 3, 1, 1)', 'Error'], answer: 1, explanation: 'sorted()는 항상 리스트를 반환합니다. 튜플을 정렬해도 결과는 리스트. [1,1,3,4,5].' },
{ q: '다음 코드의 출력은?\nt = (1, 2, 3)\nprint(3 in t)', choices: ['True', 'False', '3', 'Error'], answer: 0, explanation: 'in 연산자로 튜플에 값이 포함되어 있는지 확인합니다. 3이 있으므로 True.' }
]

            },

        ], related: ['u22', 'u24'],

    },

    {

        id: 'u24', category: 'datatype', name: 'Unit 24. 튜플', hanja: 'Tuple',

        short: '불변 시퀀스, 패킹·언패킹, 네임드 튜플', color: '#06b6d4', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: '튜플은 불변(immutable)인 순서 있는 시퀀스입니다. 수정이 필요 없는 데이터나 딕셔너리 키로 사용됩니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '딕셔너리의 특징은?', choices: ['순서 있는 리스트', '키-값 쌍으로 데이터 저장', '중복 키 허용', '변경 불가'], answer: 1, explanation: '딕셔너리는 {키: 값} 형태로 데이터를 저장합니다. 키는 중복 불가, 값은 중복 가능.' },
{ q: '딕셔너리를 생성하는 올바른 방법은?', choices: ['d = {"a": 1, "b": 2}', 'd = ["a": 1]', 'd = ("a", 1)', 'd = <"a": 1>'], answer: 0, explanation: '중괄호 {}에 키: 값 쌍을 넣어 생성합니다. d = {"a": 1, "b": 2}.' },
{ q: '다음 코드의 출력은?\nd = {"name": "Kim", "age": 25}\nprint(d["name"])', choices: ['Kim', '25', 'name', 'Error'], answer: 0, explanation: 'd["키"]로 값을 가져옵니다. d["name"]은 "Kim"입니다.' },
{ q: 'd["key"]와 d.get("key")의 차이는?', choices: ['같은 기능', 'd["key"]: 없으면 KeyError, get: 없으면 None', 'get이 느림', 'd["key"]가 안전'], answer: 1, explanation: '존재하지 않는 키에 d["key"]는 KeyError, d.get("key")는 None(기본값 설정 가능)을 반환합니다.' },
{ q: '다음 코드의 출력은?\nd = {"a": 1}\nprint(d.get("b", 0))', choices: ['None', '0', 'Error', '1'], answer: 1, explanation: '"b" 키가 없으므로 기본값 0을 반환합니다. get(키, 기본값).' },
{ q: '다음 코드의 출력은?\nd = {"a": 1, "b": 2}\nd["c"] = 3\nprint(d)', choices: ['{"a": 1, "b": 2}', '{"a": 1, "b": 2, "c": 3}', 'Error', '{"c": 3}'], answer: 1, explanation: '없는 키에 값을 대입하면 새 항목이 추가됩니다. d["c"] = 3.' },
{ q: '다음 코드의 출력은?\nd = {"a": 1, "b": 2}\nd["a"] = 10\nprint(d)', choices: ['{"a": 1, "b": 2}', '{"a": 10, "b": 2}', '{"a": 1, "a": 10, "b": 2}', 'Error'], answer: 1, explanation: '기존 키에 값을 대입하면 값이 갱신됩니다. "a"의 값이 1에서 10으로 변경.' },
{ q: 'keys(), values(), items()의 역할은?', choices: ['모두 리스트 반환', 'keys: 키들, values: 값들, items: (키,값) 쌍들 반환', '정렬 기능', '삭제 기능'], answer: 1, explanation: 'keys()는 모든 키, values()는 모든 값, items()는 (키, 값) 튜플들을 반환합니다.' },
{ q: '다음 코드의 출력은?\nd = {"x": 1, "y": 2, "z": 3}\nfor k, v in d.items():\n    print(f"{k}={v}", end=" ")', choices: ['x=1 y=2 z=3', '1 2 3', 'x y z', 'Error'], answer: 0, explanation: 'items()로 키-값 쌍을 순회합니다. f-string으로 "x=1 y=2 z=3" 출력.' },
{ q: '다음 코드의 출력은?\nd = {"a": 1, "b": 2, "c": 3}\nprint("b" in d)', choices: ['True', 'False', '2', 'Error'], answer: 0, explanation: 'in 연산자는 딕셔너리의 키에서 검색합니다. "b"가 키에 있으므로 True.' },
{ q: 'pop()과 del의 차이는?', choices: ['같은 기능', 'pop: 값 반환 + 삭제, del: 삭제만', 'del이 값 반환', 'pop은 에러 없음'], answer: 1, explanation: 'd.pop("키")는 값을 반환하면서 삭제, del d["키"]는 삭제만 수행합니다.' },
{ q: '다음 코드의 출력은?\nd = {"a": 1, "b": 2}\nval = d.pop("a")\nprint(val, d)', choices: ['1 {"b": 2}', 'a {"b": 2}', '1 {"a": 1, "b": 2}', 'Error'], answer: 0, explanation: 'pop("a")는 "a"의 값 1을 반환하고 해당 항목을 삭제합니다.' },
{ q: 'update()의 역할은?', choices: ['딕셔너리 삭제', '다른 딕셔너리의 항목을 병합/갱신', '정렬', '복사'], answer: 1, explanation: 'd.update(other)는 other의 키-값 쌍을 d에 추가하거나 기존 키의 값을 갱신합니다.' },
{ q: '다음 코드의 출력은?\nd1 = {"a": 1}\nd2 = {"b": 2, "a": 10}\nd1.update(d2)\nprint(d1)', choices: ['{"a": 1, "b": 2}', '{"a": 10, "b": 2}', '{"a": 1}', 'Error'], answer: 1, explanation: 'update로 d2를 병합합니다. "a" 키가 겹치므로 d2의 값 10으로 갱신됩니다.' },
{ q: '딕셔너리 컴프리헨션의 형태는?', choices: ['{k: v for k, v in ...}', '[k: v for k, v in ...]', '(k: v for k, v in ...)', 'dict[k, v]'], answer: 0, explanation: '{키표현식: 값표현식 for 변수 in 반복가능}이 딕셔너리 컴프리헨션입니다.' },
{ q: '다음 코드의 출력은?\nd = {x: x**2 for x in range(1, 6)}\nprint(d)', choices: ['{1:1, 2:4, 3:9, 4:16, 5:25}', '[1, 4, 9, 16, 25]', '{1, 4, 9, 16, 25}', 'Error'], answer: 0, explanation: '딕셔너리 컴프리헨션으로 {숫자: 제곱} 딕셔너리를 생성합니다.' },
{ q: '다음 코드의 출력은?\nword = "banana"\ncount = {}\nfor ch in word:\n    count[ch] = count.get(ch, 0) + 1\nprint(count)', choices: ['{"b":1, "a":3, "n":2}', '{"banana": 1}', '{"b":1, "a":1, "n":1}', 'Error'], answer: 0, explanation: 'get(키, 0)으로 기본값 0을 설정하고 1씩 증가시킵니다. 문자 빈도수 계산.' },
{ q: 'setdefault()의 역할은?', choices: ['키가 없으면 기본값으로 추가하고 반환', '값을 삭제', '정렬', '키 변경'], answer: 0, explanation: 'setdefault(키, 기본값)는 키가 없으면 기본값으로 추가하고, 있으면 기존 값을 반환합니다.' },
{ q: '다음 코드의 출력은?\nd = {}\nd.setdefault("a", []).append(1)\nd.setdefault("a", []).append(2)\nprint(d)', choices: ['{"a": [1, 2]}', '{"a": [1]}', '{"a": [2]}', 'Error'], answer: 0, explanation: '첫 호출에서 "a": []를 추가 후 1 추가. 두 번째는 기존 리스트에 2 추가. {"a": [1,2]}.' },
{ q: '딕셔너리의 키로 사용할 수 없는 것은?', choices: ['문자열', '숫자', '리스트', '튜플'], answer: 2, explanation: '딕셔너리 키는 해시 가능(immutable)해야 합니다. 리스트는 가변이므로 키 불가. TypeError 발생.' },
{ q: '다음 코드의 출력은?\nd = {"a": 1, "b": 2, "c": 3}\nprint(list(d.keys()))', choices: ['["a", "b", "c"]', '[1, 2, 3]', '[("a",1), ("b",2)]', 'Error'], answer: 0, explanation: 'd.keys()를 list로 변환하면 키들의 리스트가 됩니다. ["a", "b", "c"].' },
{ q: '다음 코드의 출력은?\nd = {"a": 1, "b": 2}\nprint(len(d))', choices: ['2', '4', '1', 'Error'], answer: 0, explanation: 'len(딕셔너리)는 키-값 쌍의 개수를 반환합니다. 2개 항목.' },
{ q: '중첩 딕셔너리 접근은?', choices: ['d["key1"]["key2"]', 'd["key1", "key2"]', 'd.key1.key2', 'get(key1, key2)'], answer: 0, explanation: '중첩 딕셔너리는 d["외부키"]["내부키"] 형태로 접근합니다.' },
{ q: '다음 코드의 출력은?\nstudents = {"Kim": {"math": 90}, "Lee": {"math": 85}}\nprint(students["Kim"]["math"])', choices: ['90', '85', 'Kim', 'Error'], answer: 0, explanation: 'students["Kim"]으로 내부 딕셔너리 접근, ["math"]로 값 90을 가져옵니다.' },
{ q: '다음 코드의 출력은?\nd1 = {"a": 1}\nd2 = d1.copy()\nd2["b"] = 2\nprint(d1)', choices: ['{"a": 1}', '{"a": 1, "b": 2}', '{"b": 2}', 'Error'], answer: 0, explanation: 'copy()는 얕은 복사입니다. d2 변경이 d1에 영향을 주지 않습니다.' },
{ q: 'clear()의 역할은?', choices: ['딕셔너리의 모든 항목 삭제', '마지막 항목 삭제', '첫 항목 삭제', '딕셔너리 출력'], answer: 0, explanation: 'clear()는 딕셔너리의 모든 키-값 쌍을 삭제하여 빈 딕셔너리 {}로 만듭니다.' },
{ q: '다음 코드의 출력은?\nd = dict(zip(["a","b","c"], [1,2,3]))\nprint(d)', choices: ['{"a":1, "b":2, "c":3}', '[("a",1), ("b",2)]', '{1:"a", 2:"b"}', 'Error'], answer: 0, explanation: 'zip으로 키와 값을 묶고 dict()로 변환합니다. {"a":1, "b":2, "c":3}.' },
{ q: '다음 코드의 출력은?\nd = {"a": 3, "b": 1, "c": 2}\nresult = sorted(d.items(), key=lambda x: x[1])\nprint(result)', choices: ['[("b",1), ("c",2), ("a",3)]', '[("a",3), ("c",2), ("b",1)]', '{"a":3, "b":1, "c":2}', 'Error'], answer: 0, explanation: '값(x[1])을 기준으로 정렬합니다. 결과는 리스트 오브 튜플입니다.' },
{ q: 'Python 3.7+에서 딕셔너리의 순서는?', choices: ['순서 없음', '삽입 순서 보장', '키 오름차순', '값 오름차순'], answer: 1, explanation: 'Python 3.7부터 딕셔너리는 삽입 순서를 공식적으로 보장합니다.' },
{ q: '다음 코드의 출력은?\nfrom collections import Counter\nprint(Counter("banana"))', choices: ['Counter({"a":3, "n":2, "b":1})', '{"banana": 1}', '6', 'Error'], answer: 0, explanation: 'Counter는 각 요소의 빈도수를 세는 딕셔너리 서브클래스입니다. a:3, n:2, b:1.' }
]

            },

        ], related: ['u23', 'u25'],

    },







    {

        id: 'u25', category: 'datatype', name: 'Unit 25. 딕셔너리 심화', hanja: 'Advanced Dictionary',

        short: '딕셔너리 메서드, 컴프리헨션, 중첩 딕셔너리', color: '#06b6d4', icon: 'maintenance',

        sections: [

            { type: 'definition', title: '개요', content: '딕셔너리의 다양한 메서드와 딕셔너리 컴프리헨션, 중첩 딕셔너리, defaultdict 등을 학습합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '딕셔너리에서 가장 큰 값의 키를 구하는 방법은?', choices: ['max(d)', 'max(d, key=d.get)', 'max(d.values())', 'sorted(d)[-1]'], answer: 1, explanation: 'max(d, key=d.get)은 값이 가장 큰 키를 반환합니다. key 매개변수로 비교 기준을 지정.' },
{ q: '다음 코드의 출력은?\nd = {"a": 3, "b": 1, "c": 2}\nprint(max(d, key=d.get))', choices: ['a', 'b', 'c', '3'], answer: 0, explanation: '값 기준 최대: d["a"]=3이 가장 크므로 키 "a"를 반환합니다.' },
{ q: '딕셔너리를 값으로 정렬하는 방법은?', choices: ['d.sort()', 'sorted(d)', 'sorted(d.items(), key=lambda x: x[1])', 'dict.sort(d)'], answer: 2, explanation: 'items()를 lambda로 값(x[1]) 기준 정렬합니다. 결과는 (키,값) 튜플 리스트.' },
{ q: '다음 코드의 출력은?\nstudents = {"Kim": 90, "Lee": 85, "Park": 95}\ntop = max(students, key=students.get)\nprint(f"1등: {top}")', choices: ['1등: Kim', '1등: Lee', '1등: Park', 'Error'], answer: 2, explanation: 'Park이 95점으로 가장 높습니다. max()가 값 기준으로 키를 반환합니다.' },
{ q: 'defaultdict의 장점은?', choices: ['속도가 빠름', '존재하지 않는 키 접근 시 기본값 자동 생성', '메모리 절약', '정렬 기능'], answer: 1, explanation: 'collections.defaultdict(int)는 없는 키 접근 시 자동으로 0을 생성합니다. KeyError 방지.' },
{ q: '다음 코드의 출력은?\nfrom collections import defaultdict\nd = defaultdict(list)\nd["fruits"].append("apple")\nd["fruits"].append("banana")\nprint(d["fruits"])', choices: ['["apple", "banana"]', 'Error', '[]', 'None'], answer: 0, explanation: 'defaultdict(list)는 없는 키에 빈 리스트를 자동 생성합니다. append로 요소 추가.' },
{ q: '딕셔너리 병합 연산자(3.9+)는?', choices: ['d1 + d2', 'd1 | d2', 'd1 & d2', 'd1 - d2'], answer: 1, explanation: 'Python 3.9부터 | 연산자로 딕셔너리를 병합합니다. d1 | d2는 d1과 d2를 합친 새 딕셔너리.' },
{ q: '다음 코드의 출력은?\ntext = "hello world"\nword_count = {}\nfor w in text.split():\n    word_count[w] = word_count.get(w, 0) + 1\nprint(word_count)', choices: ['{"hello": 1, "world": 1}', '{"hello world": 1}', '{"h": 1, "e": 1, ...}', 'Error'], answer: 0, explanation: 'split()으로 단어 분리 후 각 단어 빈도수를 계산합니다.' },
{ q: '다음 코드의 출력은?\nd = {"name": "Kim", "age": 25, "city": "Seoul"}\nresult = {k: v for k, v in d.items() if isinstance(v, str)}\nprint(result)', choices: ['{"name": "Kim", "city": "Seoul"}', '{"age": 25}', '{}', 'Error'], answer: 0, explanation: '값이 문자열인 항목만 필터링합니다. "Kim"과 "Seoul"이 str입니다.' },
{ q: '딕셔너리의 키와 값을 뒤집으려면?', choices: ['{v: k for k, v in d.items()}', 'd.reverse()', 'reversed(d)', 'dict(zip(d.values(), d.keys()))'], answer: 0, explanation: '컴프리헨션으로 {값: 키}를 생성합니다. 값이 중복되면 마지막 것만 남습니다.' },
{ q: '다음 코드의 출력은?\nd = {"a": 1, "b": 2}\nnew = {v: k for k, v in d.items()}\nprint(new)', choices: ['{1: "a", 2: "b"}', '{"a": 1, "b": 2}', '{2: "b", 1: "a"}', 'Error'], answer: 0, explanation: '키와 값을 교환합니다. {1: "a", 2: "b"}.' },
{ q: '여러 딕셔너리의 공통 키를 찾으려면?', choices: ['d1.keys() & d2.keys()', 'd1 + d2', 'd1.common(d2)', 'set(d1) + set(d2)'], answer: 0, explanation: 'dict_keys 객체는 집합 연산을 지원합니다. & 로 교집합(공통 키)을 구합니다.' },
{ q: 'JSON과 딕셔너리의 변환은?', choices: ['불가능', 'json.dumps(딕셔너리), json.loads(문자열)', 'str(딕셔너리)', 'dict(json)'], answer: 1, explanation: 'json.dumps()로 딕셔너리를 JSON 문자열로, json.loads()로 JSON 문자열을 딕셔너리로 변환합니다.' },
{ q: '다음 코드의 출력은?\nimport json\nd = {"name": "Kim", "age": 25}\ns = json.dumps(d)\nprint(type(s))', choices: ['dict', 'str', 'list', 'json'], answer: 1, explanation: 'json.dumps()는 딕셔너리를 JSON 문자열(str)로 변환합니다.' },
{ q: '딕셔너리에서 특정 값을 가진 모든 키를 찾는 방법은?', choices: ['d.find(value)', '[k for k, v in d.items() if v == target]', 'd.keys(value)', 'd[value]'], answer: 1, explanation: '컴프리헨션으로 값이 target인 모든 키를 리스트로 수집합니다.' },
{ q: 'OrderedDict와 일반 dict의 차이(3.7+)는?', choices: ['완전히 같음', 'OrderedDict는 == 비교시 순서도 고려', 'OrderedDict가 더 빠름', 'dict는 순서 없음'], answer: 1, explanation: '3.7+에서 둘 다 삽입 순서 보장하지만, OrderedDict는 == 비교시 순서까지 비교합니다.' },
{ q: '다음 코드의 출력은?\nscores = [("Kim",90), ("Lee",85), ("Park",95)]\nd = dict(scores)\nprint(d["Lee"])', choices: ['85', '90', '95', 'Error'], answer: 0, explanation: '(키,값) 튜플 리스트를 dict()로 변환합니다. Lee의 점수는 85.' },
{ q: 'ChainMap의 역할은?', choices: ['딕셔너리 삭제', '여러 딕셔너리를 하나처럼 검색', '딕셔너리 정렬', '딕셔너리 복사'], answer: 1, explanation: 'collections.ChainMap은 여러 딕셔너리를 체인처럼 연결하여 하나처럼 검색합니다.' },
{ q: '다음 코드의 출력은?\nd = {}\nfor word in ["apple", "banana", "apple", "cherry", "banana", "apple"]:\n    d[word] = d.get(word, 0) + 1\nprint(d["apple"])', choices: ['1', '2', '3', 'Error'], answer: 2, explanation: '"apple"이 3번 등장합니다. get(word,0)+1로 카운트합니다.' },
{ q: '딕셔너리를 사용한 간단한 캐시(메모이제이션) 패턴은?', choices: ['cache = {}; if n in cache: return cache[n]', '반복문만', '리스트 사용', '불가능'], answer: 0, explanation: '딕셔너리에 이전 계산 결과를 저장하여 중복 계산을 방지하는 메모이제이션 패턴입니다.' },
{ q: '다음 코드의 출력은?\nfrom collections import Counter\nwords = ["a", "b", "a", "c", "b", "a"]\nc = Counter(words)\nprint(c.most_common(2))', choices: ['[("a", 3), ("b", 2)]', '[("c", 1), ("b", 2)]', '{"a": 3}', 'Error'], answer: 0, explanation: 'most_common(n)은 가장 빈번한 n개를 (요소, 횟수) 형태로 반환합니다.' },
{ q: '딕셔너리를 키 기준으로 정렬하여 새 딕셔너리 만들기는?', choices: ['dict(sorted(d.items()))', 'd.sort()', 'sorted(d)', 'dict.sort(d)'], answer: 0, explanation: 'sorted(d.items())로 키 기준 정렬 후 dict()로 변환합니다.' },
{ q: '다음 코드의 출력은?\nmatrix = {}\nmatrix[(0,0)] = 1\nmatrix[(0,1)] = 2\nmatrix[(1,0)] = 3\nprint(matrix.get((1,1), 0))', choices: ['0', '1', '3', 'Error'], answer: 0, explanation: '(1,1) 키가 없으므로 기본값 0을 반환합니다. 튜플 키로 희소 행렬 구현.' },
{ q: '다음 코드의 출력은?\ninventory = {"apple": 5, "banana": 3}\ninventory["apple"] -= 2\nprint(inventory)', choices: ['{"apple": 3, "banana": 3}', '{"apple": 5, "banana": 3}', '{"apple": 7}', 'Error'], answer: 0, explanation: 'apple의 값을 5-2=3으로 갱신합니다. 재고 관리 패턴.' },
{ q: 'popitem()의 역할은?', choices: ['첫 번째 항목 제거', '마지막 삽입 항목을 제거하고 반환', '모든 항목 제거', '랜덤 항목 제거'], answer: 1, explanation: 'popitem()은 마지막으로 삽입된 (키, 값) 쌍을 제거하고 반환합니다(3.7+, LIFO).' },
{ q: '다음 코드의 출력은?\nfrom collections import Counter\na = Counter("aab")\nb = Counter("abc")\nprint(a + b)', choices: ['Counter({"a": 3, "b": 2, "c": 1})', 'Counter({"a": 2, "b": 1})', 'Error', '6'], answer: 0, explanation: 'Counter끼리 + 연산은 같은 키의 카운트를 합산합니다. a:2+1=3, b:1+1=2, c:0+1=1.' },
{ q: '다음 코드의 출력은?\nconfig = {"debug": False, "verbose": True, "timeout": 30}\nenabled = [k for k, v in config.items() if v is True]\nprint(enabled)', choices: ['["verbose"]', '["debug", "verbose"]', '["timeout"]', 'Error'], answer: 0, explanation: 'v is True인 키만 필터링합니다. verbose만 True이므로 ["verbose"].' },
{ q: '딕셔너리의 깊은 복사(deep copy)가 필요한 경우는?', choices: ['값이 모두 숫자일 때', '값에 리스트나 딕셔너리가 중첩되어 있을 때', '항상 필요', '절대 불필요'], answer: 1, explanation: '중첩 객체가 있으면 copy()는 내부 객체를 공유합니다. copy.deepcopy()로 완전히 독립적인 복사.' },
{ q: '다음 패턴의 용도는?\nd = {k: v for k, v in d.items() if v is not None}', choices: ['None 값 제거', '모든 값 None으로 설정', '키 필터링', '정렬'], answer: 0, explanation: 'None인 값을 가진 항목을 제거한 새 딕셔너리를 생성합니다. 데이터 정제에 유용.' },
{ q: '다음 코드의 출력은?\nd = {"a": 1, "b": 2, "c": 3}\nfiltered = {k: v for k, v in d.items() if v >= 2}\nprint(filtered)', choices: ['{"b": 2, "c": 3}', '{"a": 1}', '{"a": 1, "b": 2, "c": 3}', 'Error'], answer: 0, explanation: '값이 2 이상인 항목만 필터링합니다. b:2, c:3만 남습니다.' }
]

            },

        ], related: ['u24', 'u26'],

    },

    {

        id: 'u26', category: 'datatype', name: 'Unit 26. 세트', hanja: 'Set',

        short: '집합 연산, 교집합·합집합·차집합', color: '#06b6d4', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: '세트(set)는 중복을 허용하지 않는 순서 없는 컬렉션입니다. 집합 연산(교집합, 합집합, 차집합)을 지원합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '세트(set)의 특징은?', choices: ['순서 있음, 중복 허용', '순서 없음, 중복 불허', '키-값 쌍', '변경 불가'], answer: 1, explanation: '세트는 순서가 없고 중복 요소를 허용하지 않습니다. 중괄호 {}로 생성합니다.' },
{ q: '세트를 생성하는 올바른 방법은?', choices: ['s = {1, 2, 3}', 's = set([1, 2, 3])', 's = set("abc")', '모두 가능'], answer: 3, explanation: '{요소들}, set(리스트), set(문자열) 모두 세트를 생성합니다. 빈 세트는 set().' },
{ q: '빈 세트를 만드는 올바른 방법은?', choices: ['s = {}', 's = set()', 's = {None}', 's = set([])'], answer: 1, explanation: '{}는 빈 딕셔너리입니다! 빈 세트는 반드시 set()으로 생성해야 합니다.' },
{ q: '다음 코드의 출력은?\ns = {1, 2, 3, 2, 1}\nprint(s)', choices: ['{1, 2, 3, 2, 1}', '{1, 2, 3}', '{1, 1, 2, 2, 3}', 'Error'], answer: 1, explanation: '세트는 중복을 자동 제거합니다. {1, 2, 3}만 남습니다. 순서는 보장되지 않습니다.' },
{ q: '리스트의 중복을 제거하는 가장 간단한 방법은?', choices: ['for문으로 검사', 'list(set(lst))', 'lst.unique()', 'lst.distinct()'], answer: 1, explanation: 'set()으로 변환하면 중복이 제거되고, list()로 다시 리스트로 변환합니다. 단, 순서가 바뀔 수 있습니다.' },
{ q: 'add()와 update()의 차이는?', choices: ['같은 기능', 'add: 요소 1개 추가, update: 여러 요소 추가', 'update가 느림', 'add는 리스트에만'], answer: 1, explanation: 'add(요소)는 1개 추가, update(반복가능)은 여러 요소를 한번에 추가합니다.' },
{ q: '다음 코드의 출력은?\ns = {1, 2, 3}\ns.add(4)\ns.add(2)\nprint(len(s))', choices: ['3', '4', '5', 'Error'], answer: 1, explanation: '4는 새로 추가되고 2는 이미 있으므로 무시됩니다. 최종 {1,2,3,4}, 길이 4.' },
{ q: 'remove()와 discard()의 차이는?', choices: ['같은 기능', 'remove: 없으면 KeyError, discard: 없어도 무시', 'discard가 느림', 'remove는 여러 개 삭제'], answer: 1, explanation: 'remove(x)는 x가 없으면 KeyError, discard(x)는 없어도 에러 없이 무시합니다.' },
{ q: '합집합(Union) 연산자는?', choices: ['s1 & s2', 's1 | s2', 's1 - s2', 's1 ^ s2'], answer: 1, explanation: '| 또는 union()으로 합집합을 구합니다. 두 세트의 모든 요소를 포함합니다.' },
{ q: '교집합(Intersection) 연산자는?', choices: ['s1 & s2', 's1 | s2', 's1 - s2', 's1 ^ s2'], answer: 0, explanation: '& 또는 intersection()으로 교집합을 구합니다. 두 세트에 공통인 요소만 포함.' },
{ q: '차집합(Difference) 연산자는?', choices: ['s1 & s2', 's1 | s2', 's1 - s2', 's1 ^ s2'], answer: 2, explanation: '- 또는 difference()로 차집합을 구합니다. s1에는 있고 s2에는 없는 요소.' },
{ q: '대칭차집합(Symmetric Difference)이란?', choices: ['합집합', '교집합 제외한 나머지', '차집합', '부분집합'], answer: 1, explanation: '^ 또는 symmetric_difference()로 구합니다. 한쪽에만 있는 요소들의 집합(교집합 제외).' },
{ q: '다음 코드의 출력은?\na = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(a & b)', choices: ['{3, 4}', '{1, 2, 3, 4, 5, 6}', '{1, 2}', '{5, 6}'], answer: 0, explanation: '교집합: 양쪽에 공통인 {3, 4}.' },
{ q: '다음 코드의 출력은?\na = {1, 2, 3}\nb = {2, 3, 4}\nprint(a | b)', choices: ['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', 'Error'], answer: 0, explanation: '합집합: 모든 요소를 포함하는 {1, 2, 3, 4}.' },
{ q: '다음 코드의 출력은?\na = {1, 2, 3, 4}\nb = {3, 4, 5}\nprint(a - b)', choices: ['{1, 2}', '{5}', '{3, 4}', '{1, 2, 5}'], answer: 0, explanation: '차집합 a-b: a에만 있는 {1, 2}.' },
{ q: '다음 코드의 출력은?\na = {1, 2, 3}\nb = {3, 4, 5}\nprint(a ^ b)', choices: ['{3}', '{1, 2, 4, 5}', '{1, 2, 3, 4, 5}', 'Error'], answer: 1, explanation: '대칭차집합: 한쪽에만 있는 {1, 2, 4, 5}. 교집합 {3}은 제외.' },
{ q: 'issubset()의 역할은?', choices: ['합집합 검사', '부분집합 여부 확인', '교집합 계산', '동일 여부 확인'], answer: 1, explanation: 'a.issubset(b)는 a가 b의 부분집합인지 확인합니다. a <= b와 같습니다.' },
{ q: '다음 코드의 출력은?\na = {1, 2}\nb = {1, 2, 3, 4}\nprint(a.issubset(b), b.issuperset(a))', choices: ['True True', 'True False', 'False True', 'False False'], answer: 0, explanation: '{1,2}는 {1,2,3,4}의 부분집합이고, {1,2,3,4}는 {1,2}의 상위집합입니다.' },
{ q: 'frozenset이란?', choices: ['빈 세트', '변경 불가(immutable) 세트', '정렬된 세트', '딕셔너리 세트'], answer: 1, explanation: 'frozenset은 불변 세트입니다. 딕셔너리 키나 다른 세트의 요소로 사용 가능합니다.' },
{ q: '다음 코드의 출력은?\nlst = [1, 2, 2, 3, 3, 3]\nprint(len(set(lst)))', choices: ['3', '6', '2', 'Error'], answer: 0, explanation: 'set으로 중복 제거: {1, 2, 3}. 고유한 요소 수는 3개.' },
{ q: '다음 코드의 출력은?\ns = set("banana")\nprint(sorted(s))', choices: ['["a", "b", "n"]', '["b", "a", "n", "a", "n", "a"]', '{"a", "b", "n"}', 'Error'], answer: 0, explanation: 'set("banana")={a,b,n}(중복 제거). sorted()로 정렬하면 ["a","b","n"].' },
{ q: '세트 컴프리헨션의 형태는?', choices: ['{x for x in range(5)}', '[x for x in range(5)]', '(x for x in range(5))', 'set(x for x in range(5))'], answer: 0, explanation: '{표현식 for 변수 in 반복가능}이 세트 컴프리헨션입니다. 중복 자동 제거.' },
{ q: '다음 코드의 출력은?\nresult = {x % 3 for x in range(10)}\nprint(result)', choices: ['{0, 1, 2}', '{0, 1, 2, 3, 4}', '{0}', 'Error'], answer: 0, explanation: '0~9를 3으로 나눈 나머지: 0,1,2만 존재. 중복 제거되어 {0, 1, 2}.' },
{ q: '세트에서 pop()의 동작은?', choices: ['마지막 요소 제거', '임의의 요소를 제거하고 반환', '첫 요소 제거', 'Error'], answer: 1, explanation: '세트는 순서가 없으므로 pop()은 임의의 요소를 제거하고 반환합니다.' },
{ q: '세트를 사용한 멤버십 검사가 리스트보다 빠른 이유는?', choices: ['세트가 작아서', '해시 테이블을 사용하여 O(1) 검색', '정렬되어 있어서', '특별한 이유 없음'], answer: 1, explanation: '세트는 해시 테이블로 구현되어 in 검사가 O(1)입니다. 리스트는 O(n).' },
{ q: '다음 코드의 출력은?\na = {1, 2, 3}\nb = {4, 5, 6}\nprint(a.isdisjoint(b))', choices: ['True', 'False', 'Error', '{1,2,3,4,5,6}'], answer: 0, explanation: 'isdisjoint()는 두 세트에 공통 요소가 없으면 True입니다. 서로소 집합.' },
{ q: 'intersection_update()의 역할은?', choices: ['교집합을 새로 생성', '원본을 교집합으로 변경', '합집합으로 변경', '차집합 계산'], answer: 1, explanation: 'a.intersection_update(b)는 a를 a와 b의 교집합으로 직접 변경합니다.' },
{ q: '다음 코드의 출력은?\nwords = ["hi", "hello", "hi", "hey", "hello"]\nunique = list(dict.fromkeys(words))\nprint(unique)', choices: ['["hi", "hello", "hey"]', '["hi", "hello"]', '["hey", "hello", "hi"]', 'Error'], answer: 0, explanation: 'dict.fromkeys()는 순서를 유지하며 중복을 제거합니다. set과 달리 순서 보존!' },
{ q: '다음 코드의 출력은?\na = {1, 2, 3}\na.clear()\nprint(a)', choices: ['set()', '{}', 'None', 'Error'], answer: 0, explanation: 'clear()는 모든 요소를 삭제합니다. 빈 세트는 set()으로 표시됩니다({}는 딕셔너리).' },
{ q: '다음 코드의 출력은?\na = {1, 2, 3}\nb = {2, 3, 4}\nprint(a.symmetric_difference(b))', choices: ['{1, 4}', '{2, 3}', '{1, 2, 3, 4}', 'Error'], answer: 0, explanation: 'symmetric_difference는 한쪽에만 있는 요소입니다. 1은 a에만, 4는 b에만 있으므로 {1, 4}.' }
]

            },

        ], related: ['u25', 'u27'],

    },

    {

        id: 'u27', category: 'datatype', name: 'Unit 27. 2차원 리스트', hanja: '2D List',

        short: '행렬 표현, 순회, 전치, numpy 기초', color: '#06b6d4', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: '2차원 리스트(리스트의 리스트)로 행렬, 표, 격자 등을 표현합니다. 이중 for문으로 순회합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '2차원 리스트란?', choices: ['리스트 안에 리스트가 있는 구조', '튜플의 리스트', '딕셔너리 리스트', '문자열 리스트'], answer: 0, explanation: '2차원 리스트는 리스트가 요소로 포함된 리스트입니다. 행렬처럼 행과 열로 데이터를 관리합니다.' },
{ q: '2차원 리스트를 생성하는 방법은?', choices: ['matrix = [[1,2],[3,4],[5,6]]', 'matrix = [1,2,3,4,5,6]', 'matrix = (1,2,3)', 'matrix = {1:2, 3:4}'], answer: 0, explanation: '리스트 안에 리스트를 넣어 2차원 구조를 만듭니다. 각 내부 리스트가 한 행입니다.' },
{ q: '다음 코드의 출력은?\nmatrix = [[1,2,3],[4,5,6],[7,8,9]]\nprint(matrix[1][2])', choices: ['5', '6', '8', '2'], answer: 1, explanation: 'matrix[1]=[4,5,6], [1][2]=6. 첫 번째 인덱스는 행, 두 번째는 열입니다.' },
{ q: '다음 코드의 출력은?\nm = [[1,2],[3,4]]\nprint(m[0][0] + m[1][1])', choices: ['3', '5', '4', '6'], answer: 1, explanation: 'm[0][0]=1(첫행 첫열), m[1][1]=4(둘째행 둘째열). 1+4=5. 대각선 합.' },
{ q: '3x3 영행렬을 올바르게 생성하는 방법은?', choices: ['[[0]*3]*3', '[[0]*3 for _ in range(3)]', '둘 다 같음', 'matrix(3,3,0)'], answer: 1, explanation: '[[0]*3]*3은 같은 리스트를 3번 참조합니다(위험!). 컴프리헨션으로 독립적인 행을 생성해야 합니다.' },
{ q: '다음 코드의 문제점은?\nm = [[0]*3]*3\nm[0][0] = 1\nprint(m)', choices: ['정상 작동', '모든 행의 [0]이 1로 변경됨', 'Error', '첫 행만 변경됨'], answer: 1, explanation: '*3은 같은 리스트 객체를 3번 참조합니다. 한 행을 수정하면 모든 행이 변경됩니다.' },
{ q: '이중 for문으로 2차원 리스트를 순회하는 방법은?', choices: ['for row in matrix: for col in row:', 'for i in matrix: print(i)', 'matrix.traverse()', 'for i,j in matrix:'], answer: 0, explanation: '외부 for는 각 행(row), 내부 for는 각 열 요소(col)를 순회합니다.' },
{ q: '다음 코드의 출력은?\nm = [[1,2],[3,4],[5,6]]\nfor row in m:\n    print(sum(row), end=" ")', choices: ['3 7 11', '1 2 3 4 5 6', '21', 'Error'], answer: 0, explanation: '각 행의 합: 1+2=3, 3+4=7, 5+6=11. 행별 합계를 구합니다.' },
{ q: '2차원 리스트의 행 수와 열 수를 구하는 방법은?', choices: ['len(matrix), len(matrix[0])', 'matrix.shape', 'matrix.size()', 'rows(matrix), cols(matrix)'], answer: 0, explanation: 'len(matrix)는 행 수, len(matrix[0])는 첫 행의 열 수입니다.' },
{ q: '다음 코드의 출력은?\nm = [[1,2,3],[4,5,6]]\nprint(len(m), len(m[0]))', choices: ['2 3', '3 2', '6 2', '2 6'], answer: 0, explanation: '행 2개(외부 리스트 길이), 열 3개(내부 리스트 길이).' },
{ q: '2차원 리스트를 1차원으로 펼치는 방법은?', choices: ['[x for row in m for x in row]', 'm.flatten()', 'sum(m)', 'list(m)'], answer: 0, explanation: '중첩 컴프리헨션으로 각 행의 각 요소를 순서대로 1차원 리스트로 만듭니다.' },
{ q: '다음 코드의 출력은?\nm = [[1,2],[3,4]]\nflat = [x for row in m for x in row]\nprint(flat)', choices: ['[1, 2, 3, 4]', '[[1,2],[3,4]]', '[1, 3, 2, 4]', 'Error'], answer: 0, explanation: '행 순서대로 펼칩니다: 1,2 -> 3,4 = [1, 2, 3, 4].' },
{ q: '행렬의 전치(transpose)란?', choices: ['행과 열을 뒤바꿈', '값을 정렬', '행렬 삭제', '행을 뒤집음'], answer: 0, explanation: '전치는 행과 열을 교환합니다. m[i][j]가 m[j][i]가 됩니다.' },
{ q: '다음 코드의 출력은?\nm = [[1,2,3],[4,5,6]]\nt = [[row[i] for row in m] for i in range(3)]\nprint(t)', choices: ['[[1,4],[2,5],[3,6]]', '[[1,2,3],[4,5,6]]', '[[6,5,4],[3,2,1]]', 'Error'], answer: 0, explanation: '전치 행렬: 열을 행으로 변환. [[1,4],[2,5],[3,6]].' },
{ q: 'zip()으로 행렬을 전치하는 방법은?', choices: ['list(zip(*m))', 'zip(m)', 'm.zip()', 'zip(m[0],m[1])'], answer: 0, explanation: 'zip(*m)은 행렬의 열들을 튜플로 묶습니다. *로 언패킹하여 각 행을 인자로 전달.' },
{ q: '다음 코드의 출력은?\nm = [[1,2],[3,4]]\nresult = [list(row) for row in zip(*m)]\nprint(result)', choices: ['[[1,3],[2,4]]', '[[1,2],[3,4]]', '[[4,3],[2,1]]', 'Error'], answer: 0, explanation: 'zip(*m)으로 전치: (1,3), (2,4). list로 변환하여 [[1,3],[2,4]].' },
{ q: '다음 코드의 출력은?\nm = [[1,0,0],[0,1,0],[0,0,1]]\ndiag = [m[i][i] for i in range(3)]\nprint(diag)', choices: ['[1, 1, 1]', '[1, 0, 0]', '[0, 0, 1]', 'Error'], answer: 0, explanation: '대각선 요소: m[0][0]=1, m[1][1]=1, m[2][2]=1. 단위행렬의 대각선.' },
{ q: '다음 코드의 출력은?\nm = [[1,2],[3,4]]\ntotal = sum(sum(row) for row in m)\nprint(total)', choices: ['10', '4', '7', '3'], answer: 0, explanation: '각 행의 합(3, 7)을 다시 합산. 1+2+3+4=10. 전체 요소의 합.' },
{ q: '2차원 리스트에서 특정 값을 검색하는 방법은?', choices: ['m.find(value)', 'value in m', '이중 for문으로 순회하며 검색', 'm.index(value)'], answer: 2, explanation: '2차원 리스특에서는 이중 for문으로 각 행의 각 요소를 검사해야 합니다.' },
{ q: '다음 코드의 출력은?\nm = [[3,1],[4,2]]\nm[0].sort()\nm[1].sort()\nprint(m)', choices: ['[[1,3],[2,4]]', '[[3,1],[4,2]]', '[[1,2],[3,4]]', 'Error'], answer: 0, explanation: '각 행을 개별적으로 정렬합니다. [3,1]->[1,3], [4,2]->[2,4].' },
{ q: '다음 코드의 출력은?\nm = [[1,2,3],[4,5,6],[7,8,9]]\ncol = [row[1] for row in m]\nprint(col)', choices: ['[2, 5, 8]', '[4, 5, 6]', '[1, 2, 3]', 'Error'], answer: 0, explanation: '각 행의 인덱스 1번 요소를 추출: 2, 5, 8. 열(column) 추출 패턴.' },
{ q: '다음 코드의 출력은?\nm = [[1,2],[3,4]]\nm_copy = [row[:] for row in m]\nm_copy[0][0] = 99\nprint(m[0][0])', choices: ['99', '1', '0', 'Error'], answer: 1, explanation: 'row[:]로 각 행을 복사하여 독립적인 2차원 리스트를 만듭니다. 원본은 변경되지 않음.' },
{ q: '다음 코드의 출력은?\nboard = [["_"]*3 for _ in range(3)]\nboard[1][1] = "X"\nfor row in board:\n    print(" ".join(row))', choices: ['_ _ _\n_ X _\n_ _ _', 'X X X\n_ _ _\n_ _ _', '_ _ _\n_ _ _\n_ _ X', 'Error'], answer: 0, explanation: '3x3 보드에서 중앙(1,1)에 X를 배치. 틱택토 게임 보드 패턴.' },
{ q: '행렬 덧셈을 하는 코드는?', choices: ['m1 + m2', '[[m1[i][j]+m2[i][j] for j in range(c)] for i in range(r)]', 'sum(m1, m2)', 'add(m1, m2)'], answer: 1, explanation: '2차원 리스트의 +는 연결입니다. 요소별 덧셈은 이중 컴프리헨션으로 구현합니다.' },
{ q: 'numpy 없이 행렬 곱셈의 핵심은?', choices: ['단순 곱셈', '이중 for + 내적(dot product)', '+와 *만', '불가능'], answer: 1, explanation: '행렬 곱셈은 삼중 for문으로 각 위치의 값을 행-열 내적으로 계산합니다.' },
{ q: '다음 코드의 출력은?\nm = [[1,2,3],[4,5,6],[7,8,9]]\nprint(m[0][::-1])', choices: ['[3, 2, 1]', '[1, 2, 3]', '[7, 8, 9]', 'Error'], answer: 0, explanation: 'm[0]=[1,2,3], [::-1]로 뒤집으면 [3, 2, 1].' },
{ q: '다음 코드의 출력은?\nm = [[1,2],[3,4],[5,6]]\nmax_val = max(max(row) for row in m)\nprint(max_val)', choices: ['6', '5', '4', '21'], answer: 0, explanation: '각 행의 최대값(2,4,6) 중 최대값: 6. 2차원 리스트의 전체 최대값.' },
{ q: '2차원 리스트를 출력할 때 보기 좋게 포맷하는 방법은?', choices: ['print(m)', 'for row in m: print(row)', 'for row in m: print(*row)', '둘째와 셋째 모두'], answer: 3, explanation: 'for문으로 행별 출력합니다. print(*row)는 대괄호 없이 요소만 출력합니다.' },
{ q: '다음 코드의 출력은?\nm = [[1,2],[3,4]]\nm.append([5,6])\nprint(len(m))', choices: ['2', '3', '4', 'Error'], answer: 1, explanation: '2x2 행렬에 새 행 [5,6]을 추가하여 3x2 행렬이 됩니다. 행 수: 3.' },
{ q: '다음 코드의 출력은?\nm = [[i*3+j+1 for j in range(3)] for i in range(3)]\nprint(m[2])', choices: ['[7, 8, 9]', '[1, 2, 3]', '[3, 6, 9]', 'Error'], answer: 0, explanation: 'i=2: [2*3+0+1, 2*3+1+1, 2*3+2+1] = [7, 8, 9]. 3행 3열 행렬의 마지막 행.' }
]

            },

        ], related: ['u26', 'u28'],

    },

    {

        id: 'u28', category: 'datatype', name: 'Unit 28. 종합 자료구조 활용', hanja: 'Data Structure Mix',

        short: '리스트·딕셔너리·세트 조합 활용', color: '#06b6d4', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: '실전에서는 리스트, 딕셔너리, 세트, 튜플을 조합하여 복잡한 데이터를 처리합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '자료구조 선택 시 고려사항으로 옳지 않은 것은?', choices: ['순서가 필요한가', '중복 허용 여부', '변경 가능 여부', '변수 이름 길이'], answer: 3, explanation: '순서, 중복, 변경 가능 여부가 자료구조 선택의 핵심 기준입니다. 변수 이름은 무관합니다.' },
{ q: '순서가 있고 변경 가능한 자료구조는?', choices: ['튜플', '세트', '리스트', 'frozenset'], answer: 2, explanation: '리스트는 순서 O, 변경 O. 튜플은 순서 O, 변경 X. 세트는 순서 X.' },
{ q: '키-값 쌍으로 데이터를 저장하는 자료구조는?', choices: ['리스트', '튜플', '세트', '딕셔너리'], answer: 3, explanation: '딕셔너리는 {키: 값} 형태로 데이터를 저장합니다. 키로 빠른 접근 O(1).' },
{ q: '중복 제거가 필요할 때 적합한 자료구조는?', choices: ['리스트', '튜플', '세트', '딕셔너리'], answer: 2, explanation: '세트는 중복을 자동으로 제거합니다. list(set(data))로 중복 없는 리스트를 만들 수 있습니다.' },
{ q: '다음 코드의 출력은?\ndata = [1, 2, 3]\ndata_tuple = tuple(data)\ndata_set = set(data)\nprint(type(data_tuple), type(data_set))', choices: ['tuple set', '<class tuple> <class set>', 'list list', 'Error'], answer: 1, explanation: 'tuple()과 set()으로 변환합니다. type()은 <class type이름> 형식으로 출력합니다.' },
{ q: '다음 중 해시 가능한(hashable) 자료형은?', choices: ['리스트', '딕셔너리', '세트', '튜플'], answer: 3, explanation: '불변(immutable) 자료형만 해시 가능합니다. 튜플, 문자열, 정수, frozenset 등이 해시 가능.' },
{ q: '학생별 점수를 저장하기에 가장 적합한 자료구조는?', choices: ['리스트', '튜플', '딕셔너리', '세트'], answer: 2, explanation: '{"Kim": 90, "Lee": 85}처럼 이름(키)으로 점수(값)를 매핑하는 딕셔너리가 적합합니다.' },
{ q: '변경되면 안 되는 좌표 데이터를 저장하기에 적합한 것은?', choices: ['리스트', '튜플', '딕셔너리', '세트'], answer: 1, explanation: 'point = (3, 5)처럼 좌표는 변경되면 안 되므로 불변인 튜플이 적합합니다.' },
{ q: '다음 코드의 출력은?\nitems = {"apple": 3, "banana": 5}\nprint(list(items.keys()))', choices: ['["apple", "banana"]', '[3, 5]', '["apple": 3]', 'Error'], answer: 0, explanation: 'keys()로 키만 추출하고 list()로 변환합니다. ["apple", "banana"].' },
{ q: '스택(LIFO)을 구현하기에 적합한 자료구조는?', choices: ['세트', '리스트 (append + pop)', '딕셔너리', '튜플'], answer: 1, explanation: '리스트의 append()와 pop()으로 후입선출(LIFO) 스택을 구현합니다.' },
{ q: '큐(FIFO)를 구현하기에 적합한 것은?', choices: ['리스트', 'collections.deque', '세트', '튜플'], answer: 1, explanation: 'deque는 양끝 O(1) 연산을 제공합니다. 리스트의 pop(0)은 O(n)으로 느립니다.' },
{ q: '다음 코드의 출력은?\nfrom collections import deque\nq = deque([1, 2, 3])\nq.append(4)\nq.popleft()\nprint(list(q))', choices: ['[2, 3, 4]', '[1, 2, 3, 4]', '[1, 2, 3]', 'Error'], answer: 0, explanation: 'append(4)로 오른쪽에 4 추가, popleft()로 왼쪽의 1 제거. [2, 3, 4].' },
{ q: '리스트와 튜플의 메모리 사용량 비교는?', choices: ['리스트가 더 적음', '튜플이 더 적음', '같음', '상황에 따라 다름'], answer: 1, explanation: '튜플은 불변이므로 메모리 오버헤드가 적습니다. 대량 데이터에서 유의미한 차이.' },
{ q: '다음 코드의 출력은?\nimport sys\nprint(sys.getsizeof([1,2,3]) > sys.getsizeof((1,2,3)))', choices: ['True', 'False', 'Error', 'None'], answer: 0, explanation: '리스트는 가변성을 위한 추가 메모리가 필요하여 같은 요소의 튜플보다 크기가 큽니다.' },
{ q: '다음 자료구조 변환 중 올바른 것은?', choices: ['list({1,2,3}) -> [1,2,3]', 'tuple([1,2,3]) -> (1,2,3)', 'set((1,2,2)) -> {1,2}', '모두 올바름'], answer: 3, explanation: 'list(), tuple(), set() 함수로 자료구조 간 자유롭게 변환할 수 있습니다.' },
{ q: 'enumerate()의 역할은?', choices: ['정렬', '인덱스와 값을 함께 반환', '필터링', '변환'], answer: 1, explanation: 'enumerate(반복가능)은 (인덱스, 값) 쌍을 반환합니다. for i, v in enumerate(lst):' },
{ q: 'zip()의 역할은?', choices: ['파일 압축', '여러 반복 가능 객체를 병렬로 묶기', '정렬', '필터링'], answer: 1, explanation: 'zip(a, b)는 a와 b의 요소를 순서대로 쌍으로 묶습니다. [(a[0],b[0]), (a[1],b[1]), ...]' },
{ q: '다음 코드의 출력은?\nnames = ["Kim", "Lee"]\nscores = [90, 85]\nresult = dict(zip(names, scores))\nprint(result)', choices: ['{"Kim": 90, "Lee": 85}', '[("Kim",90), ("Lee",85)]', 'Error', '{"Kim": "Lee"}'], answer: 0, explanation: 'zip으로 이름과 점수를 쌍으로 묶고 dict()로 변환합니다.' },
{ q: '다음 코드의 출력은?\ndata = [(1, "a"), (2, "b"), (3, "c")]\nnums, chars = zip(*data)\nprint(nums)', choices: ['(1, 2, 3)', '["a", "b", "c"]', '[(1,"a")]', 'Error'], answer: 0, explanation: 'zip(*)로 언패킹하여 각 위치의 요소끼리 묶습니다. nums=(1,2,3).' },
{ q: '다음 코드의 출력은?\nscores = [85, 92, 78, 95, 88]\nabove_90 = [s for s in scores if s >= 90]\nprint(above_90, len(above_90))', choices: ['[92, 95] 2', '[85, 78, 88] 3', '[92, 95, 88] 3', 'Error'], answer: 0, explanation: '90 이상인 점수만 필터링합니다. 92, 95로 2개.' },
{ q: '복합 자료구조 리스트 of 딕셔너리의 예시는?', choices: ['[{"name": "Kim"}, {"name": "Lee"}]', '{"names": ["Kim", "Lee"]}', '[(name, Kim)]', '[name: Kim]'], answer: 0, explanation: '리스트 안에 딕셔너리를 넣으면 여러 레코드를 관리할 수 있습니다. 데이터베이스 패턴.' },
{ q: '다음 코드의 출력은?\nstudents = [{"name": "Kim", "score": 90}, {"name": "Lee", "score": 85}]\ntop = max(students, key=lambda x: x["score"])\nprint(top["name"])', choices: ['Kim', 'Lee', '90', 'Error'], answer: 0, explanation: 'score 기준 최대값인 Kim(90점)의 name을 출력합니다.' },
{ q: 'Counter와 딕셔너리의 관계는?', choices: ['무관', 'Counter는 dict의 서브클래스', 'Counter가 더 빠름', '같은 클래스'], answer: 1, explanation: 'Counter는 dict를 상속받아 빈도수 계산 기능이 추가된 클래스입니다.' },
{ q: '다음 코드의 출력은?\nfrom collections import Counter\nc = Counter([1, 1, 2, 2, 2, 3])\nprint(c.most_common(1))', choices: ['[(2, 3)]', '[(1, 2)]', '[(3, 1)]', 'Error'], answer: 0, explanation: '가장 빈번한 1개: 2가 3번으로 최다. [(2, 3)].' },
{ q: 'any()와 all()의 차이는?', choices: ['같은 기능', 'any: 하나라도 True면 True, all: 모두 True여야 True', 'any가 느림', '반대 기능'], answer: 1, explanation: 'any([F,T,F])=True(하나라도), all([T,T,F])=False(모두는 아님).' },
{ q: '다음 코드의 출력은?\nnums = [2, 4, 6, 8]\nprint(all(n % 2 == 0 for n in nums))', choices: ['True', 'False', 'Error', '[True, True, True, True]'], answer: 0, explanation: '모든 수가 짝수이므로 all()은 True입니다.' },
{ q: 'sorted()의 key 매개변수 역할은?', choices: ['정렬 순서 고정', '비교 기준 함수 지정', '오름차순 강제', '역순 강제'], answer: 1, explanation: 'key=함수로 각 요소를 변환한 값을 기준으로 정렬합니다. key=len, key=str.lower 등.' },
{ q: '다음 코드의 출력은?\nwords = ["banana", "apple", "cherry"]\nresult = sorted(words, key=len)\nprint(result)', choices: ['["apple", "banana", "cherry"]', '["apple", "cherry", "banana"]', '["banana", "apple", "cherry"]', 'Error'], answer: 0, explanation: '길이 기준 정렬: apple(5), banana(6), cherry(6). 같은 길이면 원래 순서 유지.' },
{ q: '다음 코드의 출력은?\ndata = {"b": 2, "a": 1, "c": 3}\nfor k in sorted(data):\n    print(f"{k}:{data[k]}", end=" ")', choices: ['a:1 b:2 c:3', 'b:2 a:1 c:3', 'c:3 b:2 a:1', 'Error'], answer: 0, explanation: 'sorted(data)는 키를 정렬합니다. a, b, c 순서로 출력.' },
{ q: '자료구조를 중첩할 때 주의할 점은?', choices: ['중첩 불가', '깊은 복사(deepcopy)를 사용해야 독립적 복사 가능', '자동으로 깊은 복사됨', '1단계만 중첩 가능'], answer: 1, explanation: '중첩 자료구조는 copy()로 얕은 복사만 됩니다. copy.deepcopy()로 모든 레벨을 독립 복사해야 합니다.' }
]

            },

        ], related: ['u27', 'u29'],

    },





    // ──────── FUNCTION (Unit 29~35) ────────

    {

        id: 'u29', category: 'function', name: 'Unit 29. 함수 정의와 호출', hanja: 'Function Basics',

        short: 'def, return, 매개변수, 인자', color: '#ec4899', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: '함수는 특정 작업을 수행하는 코드 블록입니다. def 키워드로 정의하고, 함수명()으로 호출합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '함수를 정의하는 키워드는?', choices: ['func', 'def', 'function', 'define'], answer: 1, explanation: 'Python에서 함수는 def 키워드로 정의합니다. def 함수이름(매개변수):' },
{ q: '다음 코드의 출력은?\ndef greet():\n    print("Hello!")\ngreet()', choices: ['Hello!', 'greet', 'None', 'Error'], answer: 0, explanation: 'greet() 호출 시 함수 본문의 print("Hello!")가 실행됩니다.' },
{ q: '함수를 사용하는 이유로 올바르지 않은 것은?', choices: ['코드 재사용', '가독성 향상', '프로그램 속도 2배 증가', '유지보수 용이'], answer: 2, explanation: '함수는 코드 재사용, 가독성, 유지보수에 도움을 주지만 속도를 2배 증가시키지는 않습니다.' },
{ q: '매개변수와 인자의 차이는?', choices: ['같은 용어', '매개변수: 함수 정의 시 변수, 인자: 함수 호출 시 전달값', '인자가 먼저', '매개변수만 존재'], answer: 1, explanation: 'def f(x): x가 매개변수(parameter). f(5): 5가 인자(argument).' },
{ q: '다음 코드의 출력은?\ndef add(a, b):\n    return a + b\nresult = add(3, 5)\nprint(result)', choices: ['8', '35', 'None', 'Error'], answer: 0, explanation: 'a=3, b=5가 전달되고 a+b=8을 반환합니다. return으로 값을 돌려줍니다.' },
{ q: 'return이 없는 함수의 반환값은?', choices: ['0', '""', 'None', 'Error'], answer: 2, explanation: 'return문이 없거나 return만 있으면 함수는 None을 반환합니다.' },
{ q: '다음 코드의 출력은?\ndef f():\n    print("A")\nresult = f()\nprint(result)', choices: ['A\nNone', 'A', 'None', 'Error'], answer: 0, explanation: 'f() 호출 시 "A" 출력. return이 없으므로 result=None. 두 번째 print로 None 출력.' },
{ q: '다음 코드의 출력은?\ndef double(x):\n    return x * 2\nprint(double(double(3)))', choices: ['6', '12', '9', 'Error'], answer: 1, explanation: 'double(3)=6, double(6)=12. 함수를 중첩 호출합니다.' },
{ q: '다음 코드의 출력은?\ndef swap(a, b):\n    return b, a\nx, y = swap(1, 2)\nprint(x, y)', choices: ['1 2', '2 1', '(2, 1)', 'Error'], answer: 1, explanation: 'return b, a는 튜플 (2, 1)을 반환합니다. 언패킹으로 x=2, y=1.' },
{ q: '함수는 여러 값을 반환할 수 있는가?', choices: ['불가능', '튜플로 여러 값 반환 가능', '리스트만 가능', '2개까지만'], answer: 1, explanation: 'return a, b, c는 (a, b, c) 튜플을 반환합니다. 여러 값을 자유롭게 반환 가능.' },
{ q: '지역 변수와 전역 변수의 차이는?', choices: ['같은 것', '지역: 함수 안에서만, 전역: 프로그램 전체에서 유효', '전역이 더 빠름', '지역이 더 안전하지 않음'], answer: 1, explanation: '지역 변수는 함수 내부에서만 존재하고, 전역 변수는 프로그램 전체에서 접근 가능합니다.' },
{ q: '다음 코드의 출력은?\nx = 10\ndef f():\n    x = 20\n    print(x)\nf()\nprint(x)', choices: ['20\n10', '20\n20', '10\n10', 'Error'], answer: 0, explanation: '함수 내 x=20은 지역 변수입니다. 함수 밖 x=10은 전역 변수. 서로 독립적.' },
{ q: 'global 키워드의 역할은?', choices: ['변수 삭제', '함수 안에서 전역 변수를 수정하겠다고 선언', '새 전역 변수 생성', '함수 종료'], answer: 1, explanation: 'global x를 선언하면 함수 안에서 전역 변수 x를 직접 수정할 수 있습니다.' },
{ q: '다음 코드의 출력은?\nx = 10\ndef f():\n    global x\n    x = 20\nf()\nprint(x)', choices: ['10', '20', 'Error', 'None'], answer: 1, explanation: 'global x로 전역 변수를 참조하므로 x=20으로 변경됩니다.' },
{ q: '독스트링(docstring)이란?', choices: ['주석', '함수의 설명 문자열(triple quote)', '에러 메시지', '변수 이름'], answer: 1, explanation: '함수 첫 줄에 세 겹 따옴표로 작성하는 설명입니다. help(함수)로 확인 가능.' },
{ q: '다음 코드의 출력은?\ndef is_even(n):\n    return n % 2 == 0\nprint(is_even(4), is_even(7))', choices: ['True False', 'True True', '0 1', 'Error'], answer: 0, explanation: '4%2==0은 True, 7%2==0은 False. bool 값을 반환합니다.' },
{ q: '재귀 함수(recursive function)란?', choices: ['반복문을 사용하는 함수', '자기 자신을 호출하는 함수', '매개변수가 없는 함수', '값을 반환하지 않는 함수'], answer: 1, explanation: '재귀 함수는 함수 내에서 자기 자신을 호출합니다. 반드시 종료 조건이 필요합니다.' },
{ q: '다음 재귀 함수의 출력은?\ndef factorial(n):\n    if n <= 1: return 1\n    return n * factorial(n-1)\nprint(factorial(5))', choices: ['120', '24', '5', 'Error'], answer: 0, explanation: '5!=5*4*3*2*1=120. 재귀적으로 n-1을 호출하여 곱합니다.' },
{ q: '재귀 함수에서 종료 조건이 없으면?', choices: ['정상 작동', 'RecursionError(무한 재귀)', '0 반환', '자동 종료'], answer: 1, explanation: '종료 조건 없이 무한 재귀하면 RecursionError(스택 오버플로)가 발생합니다.' },
{ q: '다음 코드의 출력은?\ndef fibonacci(n):\n    if n <= 1: return n\n    return fibonacci(n-1) + fibonacci(n-2)\nprint(fibonacci(6))', choices: ['8', '13', '5', '6'], answer: 0, explanation: 'fib(6)=fib(5)+fib(4)=5+3=8. 피보나치 수열: 0,1,1,2,3,5,8,13,...' },
{ q: '함수를 변수에 할당할 수 있는가?', choices: ['불가능', '함수는 일급 객체이므로 변수에 할당 가능', '문자열만 가능', '리스트만 가능'], answer: 1, explanation: 'Python에서 함수는 일급 객체입니다. f = double처럼 변수에 할당하고 f(3)으로 호출 가능.' },
{ q: 'pass 키워드의 역할은?', choices: ['함수 종료', '아무것도 하지 않는 빈 함수/블록 정의', '값 전달', '에러 무시'], answer: 1, explanation: 'def todo(): pass처럼 아직 구현하지 않은 함수의 빈 본문에 사용합니다.' },
{ q: '다음 코드의 출력은?\ndef calc(a, b, op):\n    if op == "+": return a + b\n    elif op == "-": return a - b\n    elif op == "*": return a * b\nprint(calc(10, 3, "-"))', choices: ['7', '13', '30', 'Error'], answer: 0, explanation: 'op="-"이므로 a-b=10-3=7을 반환합니다.' },
{ q: '함수 안에서 다른 함수를 정의할 수 있는가?', choices: ['불가능', '가능(중첩 함수/내부 함수)', '클래스 안에서만', 'import 필요'], answer: 1, explanation: '함수 안에 함수를 정의할 수 있습니다. 이를 중첩 함수 또는 내부 함수라고 합니다.' },
{ q: '다음 코드의 출력은?\ndef outer():\n    def inner():\n        return "Hello"\n    return inner()\nprint(outer())', choices: ['Hello', 'inner', 'None', 'Error'], answer: 0, explanation: 'outer()가 inner()를 호출하고 그 결과 "Hello"를 반환합니다.' },
{ q: '함수의 타입 힌트란?', choices: ['강제 타입 지정', '매개변수와 반환값의 예상 타입을 명시', '에러 검사', '자동 형변환'], answer: 1, explanation: 'def f(x: int) -> str: 처럼 타입을 명시합니다. 강제는 아니지만 가독성과 IDE 지원에 유용.' },
{ q: '다음 코드에서 에러가 발생하는 것은?', choices: ['def f(): return 1', 'def f(x): return x', 'def f(x, y=1, z): pass', 'def f(*args): pass'], answer: 2, explanation: '기본값이 있는 매개변수(y=1) 뒤에 기본값 없는 매개변수(z)가 오면 SyntaxError입니다.' },
{ q: '다음 코드의 출력은?\ndef count_up(n):\n    for i in range(1, n+1):\n        print(i, end=" ")\ncount_up(5)', choices: ['1 2 3 4 5', '0 1 2 3 4', '5 4 3 2 1', 'Error'], answer: 0, explanation: 'range(1, 6)으로 1부터 5까지 출력합니다.' },
{ q: '다음 코드의 출력은?\ndef apply(func, value):\n    return func(value)\nprint(apply(len, "Hello"))', choices: ['5', 'Hello', 'len', 'Error'], answer: 0, explanation: '함수를 인자로 전달합니다. apply(len, "Hello")는 len("Hello")=5.' },
{ q: '다음 코드의 출력은?\ndef power(base, exp=2):\n    return base ** exp\nprint(power(3), power(3, 3))', choices: ['9 27', '6 9', '3 3', 'Error'], answer: 0, explanation: 'power(3)은 3**2=9(기본값 사용), power(3,3)은 3**3=27. 기본값 매개변수 활용.' }
]

            },

        ], related: ['u28', 'u30'],

    },

    {

        id: 'u30', category: 'function', name: 'Unit 30. 내장 함수', hanja: 'Built-in Functions',

        short: 'print, input, len, range, type, int, str, list', color: '#ec4899', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: 'Python은 다양한 내장 함수를 제공합니다. import 없이 사용할 수 있는 편리한 함수들입니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '기본값 매개변수란?', choices: ['필수 매개변수', '호출 시 값을 전달하지 않으면 기본값을 사용하는 매개변수', '전역 변수', '상수'], answer: 1, explanation: 'def f(x=10): x에 값을 전달하지 않으면 기본값 10이 사용됩니다.' },
{ q: '다음 코드의 출력은?\ndef greet(name="World"):\n    print(f"Hello, {name}!")\ngreet()\ngreet("Python")', choices: ['Hello, World!\nHello, Python!', 'Hello, Python!\nHello, World!', 'Error', 'Hello, World!'], answer: 0, explanation: '첫 호출: 기본값 "World" 사용. 두 번째: "Python" 전달.' },
{ q: '키워드 인자란?', choices: ['특수 함수', '매개변수 이름을 지정하여 전달하는 인자', '기본값 인자', '전역 인자'], answer: 1, explanation: 'f(name="Kim", age=25)처럼 이름=값 형태로 전달합니다. 순서 무관.' },
{ q: '다음 코드의 출력은?\ndef info(name, age):\n    print(f"{name}: {age}")\ninfo(age=25, name="Kim")', choices: ['Kim: 25', '25: Kim', 'Error', 'name: age'], answer: 0, explanation: '키워드 인자로 순서와 상관없이 매개변수에 값을 전달합니다.' },
{ q: '*args의 역할은?', choices: ['키워드 인자 수집', '가변 위치 인자를 튜플로 수집', '리스트 전달', '에러 처리'], answer: 1, explanation: '*args는 개수가 정해지지 않은 위치 인자를 튜플로 모아줍니다. f(1,2,3) -> args=(1,2,3).' },
{ q: '다음 코드의 출력은?\ndef total(*args):\n    return sum(args)\nprint(total(1, 2, 3, 4, 5))', choices: ['15', '(1,2,3,4,5)', '5', 'Error'], answer: 0, explanation: 'args=(1,2,3,4,5) 튜플로 수집되고 sum()으로 합산하면 15.' },
{ q: '**kwargs의 역할은?', choices: ['가변 위치 인자', '가변 키워드 인자를 딕셔너리로 수집', '에러 처리', '데코레이터'], answer: 1, explanation: '**kwargs는 키워드 인자를 딕셔너리로 수집합니다. f(a=1, b=2) -> kwargs={"a":1, "b":2}.' },
{ q: '다음 코드의 출력은?\ndef show(**kwargs):\n    for k, v in kwargs.items():\n        print(f"{k}={v}", end=" ")\nshow(x=1, y=2, z=3)', choices: ['x=1 y=2 z=3', '{x:1, y:2, z:3}', 'Error', '1 2 3'], answer: 0, explanation: 'kwargs={"x":1, "y":2, "z":3}. items()로 순회하여 출력합니다.' },
{ q: '매개변수 순서 규칙은?', choices: ['순서 무관', '일반 -> *args -> 기본값 -> **kwargs', '일반 -> 기본값 -> *args -> **kwargs', '**kwargs가 먼저'], answer: 2, explanation: '올바른 순서: 일반 매개변수, 기본값 매개변수, *args, **kwargs.' },
{ q: '다음 코드의 출력은?\ndef f(a, b=10, *args):\n    print(a, b, args)\nf(1, 2, 3, 4)', choices: ['1 2 (3, 4)', '1 10 (2, 3, 4)', '1 2 3 4', 'Error'], answer: 0, explanation: 'a=1, b=2(기본값 덮어씀), args=(3,4). 위치 인자 순서대로 배정.' },
{ q: '다음 코드의 출력은?\ndef f(*args, **kwargs):\n    print(len(args), len(kwargs))\nf(1, 2, 3, x=4, y=5)', choices: ['3 2', '5 0', '2 3', 'Error'], answer: 0, explanation: '위치 인자 3개: args=(1,2,3). 키워드 인자 2개: kwargs={"x":4, "y":5}.' },
{ q: '언패킹 연산자 *의 함수 호출 시 역할은?', choices: ['곱셈', '리스트/튜플을 개별 인자로 풀어서 전달', '반복', '주소 참조'], answer: 1, explanation: 'f(*[1,2,3])은 f(1,2,3)과 같습니다. *로 시퀀스를 풀어서 전달합니다.' },
{ q: '다음 코드의 출력은?\ndef add(a, b, c):\n    return a + b + c\nnums = [1, 2, 3]\nprint(add(*nums))', choices: ['6', '[1, 2, 3]', 'Error', '123'], answer: 0, explanation: '*nums는 [1,2,3]을 풀어서 add(1,2,3)으로 호출합니다. 1+2+3=6.' },
{ q: '**로 딕셔너리를 언패킹하면?', choices: ['에러', '키워드 인자로 전달', '리스트로 변환', '정렬'], answer: 1, explanation: 'f(**{"a":1, "b":2})는 f(a=1, b=2)와 같습니다. 딕셔너리를 키워드 인자로 풀어줍니다.' },
{ q: 'lambda 함수란?', choices: ['대형 함수', '이름 없는 한 줄 함수', '클래스', '모듈'], answer: 1, explanation: 'lambda x: x*2처럼 def 없이 한 줄로 정의하는 익명 함수입니다.' },
{ q: '다음 코드의 출력은?\ndouble = lambda x: x * 2\nprint(double(5))', choices: ['10', '5', 'lambda', 'Error'], answer: 0, explanation: 'lambda x: x*2는 x를 2배로 만드는 함수입니다. double(5)=10.' },
{ q: 'map() 함수의 역할은?', choices: ['딕셔너리 생성', '반복 가능 객체의 각 요소에 함수를 적용', '필터링', '정렬'], answer: 1, explanation: 'map(함수, 반복가능)은 각 요소에 함수를 적용한 결과를 반환합니다.' },
{ q: '다음 코드의 출력은?\nresult = list(map(str, [1, 2, 3]))\nprint(result)', choices: ['["1", "2", "3"]', '[1, 2, 3]', '["123"]', 'Error'], answer: 0, explanation: 'map(str, [1,2,3])은 각 요소에 str()을 적용합니다. ["1","2","3"].' },
{ q: 'filter() 함수의 역할은?', choices: ['정렬', '조건을 만족하는 요소만 걸러냄', '변환', '개수 세기'], answer: 1, explanation: 'filter(함수, 반복가능)은 함수가 True를 반환하는 요소만 남깁니다.' },
{ q: '다음 코드의 출력은?\nevens = list(filter(lambda x: x%2==0, range(10)))\nprint(evens)', choices: ['[0, 2, 4, 6, 8]', '[1, 3, 5, 7, 9]', '[0, 1, 2, 3, 4]', 'Error'], answer: 0, explanation: '짝수만 필터링합니다. 0~9에서 짝수: [0, 2, 4, 6, 8].' },
{ q: 'reduce() 함수의 역할은?', choices: ['크기 축소', '반복 가능 객체를 하나의 값으로 누적 계산', '필터링', '정렬'], answer: 1, explanation: 'functools.reduce(함수, 반복가능)은 요소를 순차적으로 누적 계산합니다. 예: 곱, 합.' },
{ q: '다음 코드의 출력은?\nfrom functools import reduce\nresult = reduce(lambda a, b: a * b, [1, 2, 3, 4])\nprint(result)', choices: ['24', '10', '4', 'Error'], answer: 0, explanation: '1*2=2, 2*3=6, 6*4=24. 모든 요소의 곱을 구합니다.' },
{ q: '클로저(closure)란?', choices: ['함수 삭제', '외부 함수의 변수를 기억하는 내부 함수', '파일 닫기', '예외 처리'], answer: 1, explanation: '클로저는 외부 함수가 종료된 후에도 외부 함수의 변수를 참조하는 내부 함수입니다.' },
{ q: '데코레이터의 역할은?', choices: ['변수 장식', '함수의 기능을 확장하는 래퍼 함수', '클래스 생성', '에러 처리'], answer: 1, explanation: '데코레이터는 @decorator 문법으로 기존 함수를 수정하지 않고 기능을 추가합니다.' },
{ q: '다음 코드의 출력은?\ndef decorator(func):\n    def wrapper():\n        print("Before")\n        func()\n        print("After")\n    return wrapper\n@decorator\ndef hello():\n    print("Hello!")\nhello()', choices: ['Before\nHello!\nAfter', 'Hello!', 'Before\nAfter', 'Error'], answer: 0, explanation: '@decorator로 hello를 래핑합니다. wrapper가 실행되어 Before, Hello!, After 순서.' },
{ q: '다음 코드의 출력은?\ndef make_adder(n):\n    return lambda x: x + n\nadd5 = make_adder(5)\nprint(add5(3))', choices: ['8', '5', '3', 'Error'], answer: 0, explanation: 'make_adder(5)는 lambda x: x+5를 반환합니다. add5(3)=3+5=8. 클로저 활용.' },
{ q: '기본값 매개변수에 리스트를 사용하면 안 되는 이유는?', choices: ['문법 에러', '기본값은 함수 정의 시 한 번만 생성되어 공유됨', '리스트는 매개변수 불가', '속도 저하'], answer: 1, explanation: 'def f(lst=[]): 는 위험합니다. 호출마다 같은 리스트를 공유합니다. None을 기본값으로 쓰세요.' },
{ q: '다음 코드의 출력은?\ndef f(lst=None):\n    if lst is None: lst = []\n    lst.append(1)\n    return lst\nprint(f(), f())', choices: ['[1] [1]', '[1] [1, 1]', '[1, 1] [1, 1]', 'Error'], answer: 0, explanation: 'None 기본값 패턴으로 매 호출마다 새 리스트를 생성합니다. 각각 독립적인 [1].' },
{ q: '다음 코드의 출력은?\nops = {"+": lambda a,b: a+b, "-": lambda a,b: a-b, "*": lambda a,b: a*b}\nprint(ops["*"](4, 5))', choices: ['20', '9', '45', 'Error'], answer: 0, explanation: '딕셔너리에 lambda 함수를 저장합니다. ops["*"]는 곱셈 함수. 4*5=20.' },
{ q: '다음 코드의 출력은?\nsquared = list(map(lambda x: x**2, [1,2,3,4]))\nprint(squared)', choices: ['[1, 4, 9, 16]', '[2, 4, 6, 8]', '[1, 2, 3, 4]', 'Error'], answer: 0, explanation: 'map()으로 각 요소에 제곱 함수를 적용합니다. 1,4,9,16.' }
]

            },

        ], related: ['u29', 'u31'],

    },

    {

        id: 'u31', category: 'function', name: 'Unit 31. 함수 심화', hanja: 'Advanced Functions',

        short: '클로저, 데코레이터, 제너레이터, 고차함수', color: '#ec4899', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: '클로저, 데코레이터, 제너레이터, 고차함수 등 함수의 고급 개념을 학습합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '파일을 여는 함수는?', choices: ['read()', 'open()', 'file()', 'load()'], answer: 1, explanation: 'open(파일명, 모드)으로 파일을 엽니다. 모드: "r"(읽기), "w"(쓰기), "a"(추가).' },
{ q: 'open() 함수의 기본 모드는?', choices: ['"w"', '"r"', '"a"', '"rw"'], answer: 1, explanation: '모드를 생략하면 기본값은 "r"(읽기 전용)입니다.' },
{ q: 'with 문으로 파일을 여는 장점은?', choices: ['속도 향상', '블록 종료 시 자동으로 파일 닫기', '에러 무시', '파일 생성'], answer: 1, explanation: 'with open() as f: 블록이 끝나면 자동으로 f.close()가 호출됩니다. 안전한 파일 처리.' },
{ q: '다음 코드의 역할은?\nwith open("test.txt", "w") as f:\n    f.write("Hello")', choices: ['파일 읽기', 'test.txt에 "Hello" 쓰기', '파일 삭제', '파일 복사'], answer: 1, explanation: '"w" 모드로 열고 write()로 문자열을 씁니다. 기존 내용은 덮어씌워집니다.' },
{ q: '"w"와 "a" 모드의 차이는?', choices: ['같은 기능', '"w": 기존 내용 삭제 후 쓰기, "a": 기존 내용 뒤에 추가', '"a"가 더 빠름', '"w"는 읽기 전용'], answer: 1, explanation: '"w"는 덮어쓰기(기존 내용 삭제), "a"는 추가(기존 내용 유지 후 뒤에 추가).' },
{ q: 'read()와 readlines()의 차이는?', choices: ['같은 기능', 'read: 전체를 문자열로, readlines: 줄별 리스트로', 'readlines가 느림', 'read는 한 줄만'], answer: 1, explanation: 'read()는 전체 내용을 하나의 문자열로, readlines()는 각 줄을 리스트의 요소로 반환합니다.' },
{ q: 'readline()의 역할은?', choices: ['전체 읽기', '한 줄만 읽기', '마지막 줄', '랜덤 줄'], answer: 1, explanation: 'readline()은 파일에서 한 줄만 읽어 문자열로 반환합니다. 줄바꿈 문자 포함.' },
{ q: '다음 코드의 역할은?\nwith open("data.txt", "r") as f:\n    for line in f:\n        print(line.strip())', choices: ['파일 쓰기', '파일의 각 줄을 읽어 출력(줄바꿈 제거)', '파일 삭제', '에러 발생'], answer: 1, explanation: '파일 객체를 for문으로 순회하면 한 줄씩 읽습니다. strip()으로 줄바꿈을 제거합니다.' },
{ q: '파일 경로에서 역슬래시 문제를 해결하는 방법은?', choices: ['무시', 'r"경로" (raw string) 또는 슬래시(/) 사용', '따옴표 2개', 'import path'], answer: 1, explanation: 'Windows 경로의 \\를 r"C:\\Users"(raw string)이나 "C:/Users"(슬래시)로 처리합니다.' },
{ q: '인코딩을 지정하여 파일을 여는 방법은?', choices: ['open(f, encoding="utf-8")', 'open(f).encode()', 'decode(f)', 'utf8.open(f)'], answer: 0, explanation: 'open(파일, encoding="utf-8")로 인코딩을 지정합니다. 한글 파일에 필수적입니다.' },
{ q: '다음 코드의 결과는?\nwith open("nums.txt", "w") as f:\n    for i in range(5):\n        f.write(str(i) + "\n")', choices: ['파일에 0~4 각 줄에 쓰기', '콘솔에 출력', '에러', '파일 읽기'], answer: 0, explanation: '0부터 4까지 각 숫자를 한 줄씩 파일에 씁니다. str()로 숫자를 문자열로 변환.' },
{ q: 'writelines()의 역할은?', choices: ['한 줄 쓰기', '리스트의 각 요소를 파일에 쓰기(줄바꿈 자동 추가 안 함)', '파일 읽기', '줄바꿈 자동 추가'], answer: 1, explanation: 'writelines(리스트)는 각 요소를 연결하여 씁니다. 줄바꿈은 직접 추가해야 합니다.' },
{ q: 'os.path.exists()의 역할은?', choices: ['파일 생성', '파일이나 디렉터리 존재 여부 확인', '파일 삭제', '경로 변환'], answer: 1, explanation: 'os.path.exists(경로)는 파일이나 디렉터리가 존재하면 True를 반환합니다.' },
{ q: 'CSV 파일을 읽는 모듈은?', choices: ['json', 'csv', 'os', 'sys'], answer: 1, explanation: 'csv 모듈의 csv.reader()로 CSV 파일을 읽고, csv.writer()로 CSV 파일을 씁니다.' },
{ q: 'json.dump()와 json.dumps()의 차이는?', choices: ['같은 기능', 'dump: 파일에 쓰기, dumps: 문자열로 반환', 'dumps가 더 빠름', 'dump은 읽기'], answer: 1, explanation: 'json.dump(data, file)은 파일에 직접 쓰고, json.dumps(data)는 JSON 문자열을 반환합니다.' },
{ q: '다음 코드의 역할은?\nimport json\nwith open("data.json", "w") as f:\n    json.dump({"name": "Kim"}, f)', choices: ['JSON 읽기', 'JSON 파일에 딕셔너리 저장', '파일 삭제', '에러 발생'], answer: 1, explanation: 'json.dump()로 딕셔너리를 JSON 형식으로 파일에 저장합니다.' },
{ q: 'json.load()의 역할은?', choices: ['JSON 문자열을 딕셔너리로 변환', 'JSON 파일을 읽어 딕셔너리로 변환', '파일 쓰기', '모듈 로드'], answer: 1, explanation: 'json.load(파일객체)는 JSON 파일을 읽어 Python 딕셔너리로 변환합니다.' },
{ q: '"rb"와 "wb" 모드의 용도는?', choices: ['텍스트 파일', '바이너리(이미지, 동영상 등) 파일 읽기/쓰기', '추가 모드', '읽기 전용'], answer: 1, explanation: '"b"는 바이너리 모드입니다. 이미지, PDF 등 비텍스트 파일을 처리할 때 사용합니다.' },
{ q: 'seek()과 tell()의 역할은?', choices: ['파일 검색', 'seek: 파일 포인터 이동, tell: 현재 위치 반환', '파일 삭제', '줄 번호 확인'], answer: 1, explanation: 'seek(위치)로 읽기/쓰기 위치를 이동하고, tell()로 현재 위치를 확인합니다.' },
{ q: 'os.listdir()의 역할은?', choices: ['파일 삭제', '디렉터리 내 파일/폴더 목록 반환', '파일 읽기', '경로 생성'], answer: 1, explanation: 'os.listdir(경로)는 해당 디렉터리의 파일과 폴더 이름 리스트를 반환합니다.' },
{ q: 'pathlib 모듈의 장점은?', choices: ['속도 향상', '객체 지향적 경로 처리', '파일 압축', '네트워크 접근'], answer: 1, explanation: 'pathlib.Path()로 경로를 객체로 다룹니다. / 연산자로 경로 결합 등 직관적 API.' },
{ q: '다음 코드의 역할은?\nfrom pathlib import Path\np = Path("data") / "test.txt"\nprint(p)', choices: ['data/test.txt (경로 결합)', 'data + test.txt', 'Error', '파일 삭제'], answer: 0, explanation: 'Path 객체는 / 연산자로 경로를 결합합니다. "data/test.txt".' },
{ q: 'shutil.copy()의 역할은?', choices: ['파일 이동', '파일 복사', '파일 삭제', '디렉터리 생성'], answer: 1, explanation: 'shutil.copy(원본, 대상)으로 파일을 복사합니다. shutil.move()는 이동.' },
{ q: 'os.makedirs()의 역할은?', choices: ['파일 생성', '중첩 디렉터리 생성', '파일 삭제', '파일 읽기'], answer: 1, explanation: 'os.makedirs("a/b/c")는 중간 디렉터리까지 모두 생성합니다. exist_ok=True로 에러 방지.' },
{ q: '파일을 읽을 때 FileNotFoundError를 방지하는 방법은?', choices: ['무시', 'try-except 또는 os.path.exists() 확인', '항상 "w" 모드', 'pass 사용'], answer: 1, explanation: 'try-except로 예외 처리하거나, os.path.exists()로 파일 존재 여부를 먼저 확인합니다.' },
{ q: 'with 문 없이 파일을 사용할 때 반드시 해야 할 것은?', choices: ['pass 호출', 'f.close() 호출', 'return', 'del f'], answer: 1, explanation: 'with를 사용하지 않으면 반드시 f.close()로 파일을 닫아야 합니다. 리소스 누수 방지.' },
{ q: 'glob 모듈의 역할은?', choices: ['파일 내용 검색', '패턴으로 파일 목록 검색', '파일 압축', '네트워크 접근'], answer: 1, explanation: 'glob.glob("*.txt")로 현재 디렉터리의 모든 txt 파일을 검색합니다.' },
{ q: '다음 코드의 역할은?\nimport glob\nfiles = glob.glob("*.py")\nprint(files)', choices: ['모든 Python 파일 목록 출력', '파일 삭제', '파일 실행', 'Error'], answer: 0, explanation: 'glob("*.py")는 현재 디렉터리의 모든 .py 파일 이름을 리스트로 반환합니다.' },
{ q: 'tempfile 모듈의 용도는?', choices: ['파일 삭제', '임시 파일/디렉터리 생성', '파일 속도 측정', '영구 저장'], answer: 1, explanation: 'tempfile로 임시 파일을 생성합니다. 프로그램 종료 시 자동 삭제됩니다.' },
{ q: '다음 코드의 역할은?\nwith open("log.txt", "a") as f:\n    f.write("New entry\\n")', choices: ['파일 덮어쓰기', '기존 파일 끝에 내용 추가', '파일 읽기', '파일 삭제'], answer: 1, explanation: '"a" 모드는 기존 내용을 유지하고 파일 끝에 새 내용을 추가합니다.' }
]

            },

        ], related: ['u30', 'u32'],

    },





    {

        id: 'u32', category: 'function', name: 'Unit 32. 모듈과 패키지', hanja: 'Modules & Packages',

        short: 'import, from, as, pip, 표준 라이브러리', color: '#ec4899', icon: 'maintenance',

        sections: [

            { type: 'definition', title: '개요', content: '모듈은 .py 파일, 패키지는 모듈의 모음(디렉토리)입니다. import로 불러와서 사용합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '모듈이란?', choices: ['프로그램 전체', 'Python 코드가 담긴 .py 파일', '폴더', '변수'], answer: 1, explanation: '모듈은 함수, 클래스, 변수를 포함하는 Python 파일(.py)입니다.' },
{ q: 'import math의 의미는?', choices: ['math 삭제', 'math 모듈을 불러와 사용', 'math 변수 생성', 'math 파일 실행'], answer: 1, explanation: 'import 키워드로 모듈을 불러옵니다. math.sqrt() 형태로 사용합니다.' },
{ q: 'from math import sqrt의 장점은?', choices: ['속도 향상', 'math.sqrt 대신 sqrt로 직접 호출 가능', 'math 전체 로드', '에러 방지'], answer: 1, explanation: 'from...import로 특정 함수만 가져오면 math.을 생략하고 sqrt()로 바로 호출합니다.' },
{ q: 'import math as m의 의미는?', choices: ['math 삭제', 'math 모듈을 m이라는 별칭으로 사용', '새 모듈 생성', 'Error'], answer: 1, explanation: 'as로 별칭을 붙여 m.sqrt()처럼 짧게 사용합니다. numpy를 np로 쓰는 것이 대표적.' },
{ q: '패키지(package)란?', choices: ['단일 파일', '모듈을 포함하는 디렉터리', '변수 묶음', '함수 묶음'], answer: 1, explanation: '패키지는 __init__.py를 포함하는 디렉터리로, 여러 모듈을 계층적으로 조직합니다.' },
{ q: '__init__.py의 역할은?', choices: ['프로그램 시작점', '디렉터리를 패키지로 인식하게 함', '에러 로그', '테스트 파일'], answer: 1, explanation: '__init__.py가 있으면 Python이 해당 디렉터리를 패키지로 인식합니다. 비어있어도 됩니다.' },
{ q: 'math.sqrt(16)의 결과는?', choices: ['4', '4.0', '16', 'Error'], answer: 1, explanation: 'math.sqrt()는 항상 float를 반환합니다. sqrt(16)=4.0.' },
{ q: 'math.ceil()과 math.floor()의 차이는?', choices: ['같은 기능', 'ceil: 올림, floor: 내림', 'ceil: 내림, floor: 올림', '반올림'], answer: 1, explanation: 'ceil(3.2)=4(올림), floor(3.8)=3(내림). 반올림은 round().' },
{ q: 'random.randint(1, 10)의 범위는?', choices: ['1~9', '1~10(양쪽 포함)', '0~10', '0~9'], answer: 1, explanation: 'randint(a, b)는 a 이상 b 이하의 정수를 반환합니다. 양쪽 끝 모두 포함.' },
{ q: 'random.choice()의 역할은?', choices: ['정렬', '리스트에서 랜덤으로 하나 선택', '필터링', '개수 세기'], answer: 1, explanation: 'random.choice([1,2,3])은 리스트에서 무작위로 하나의 요소를 선택합니다.' },
{ q: 'random.shuffle()의 역할은?', choices: ['정렬', '리스트 요소를 무작위로 섞기(원본 변경)', '새 리스트 반환', '복사'], answer: 1, explanation: 'shuffle()은 리스트를 제자리에서 무작위로 섞습니다. 원본이 변경됩니다.' },
{ q: 'datetime 모듈로 현재 날짜를 구하는 방법은?', choices: ['datetime.now()', 'datetime.datetime.now()', 'date.today()', '둘째와 셋째 모두'], answer: 3, explanation: 'datetime.datetime.now()는 날짜+시간, datetime.date.today()는 날짜만 반환합니다.' },
{ q: 'os 모듈의 주요 기능은?', choices: ['수학 연산', '운영체제 관련 기능(파일, 디렉터리, 환경변수)', '웹 요청', '그래픽'], answer: 1, explanation: 'os 모듈은 파일/디렉터리 조작, 환경변수 접근 등 OS 관련 기능을 제공합니다.' },
{ q: 'sys.argv의 역할은?', choices: ['시스템 정보', '명령줄 인자를 리스트로 제공', '파일 목록', '에러 목록'], answer: 1, explanation: 'sys.argv[0]은 스크립트 이름, sys.argv[1:]은 전달된 명령줄 인자들입니다.' },
{ q: 'pip의 역할은?', choices: ['Python 실행기', 'Python 패키지 설치 도구', '코드 편집기', '디버거'], answer: 1, explanation: 'pip install 패키지명으로 외부 패키지를 설치합니다. PyPI에서 다운로드.' },
{ q: '__name__ == "__main__"의 의미는?', choices: ['항상 True', '직접 실행될 때만 True(import 시 False)', '파일 이름 확인', 'Error 검사'], answer: 1, explanation: '스크립트를 직접 실행하면 __name__="__main__", import하면 모듈 이름이 됩니다.' },
{ q: '다음 코드의 역할은?\nif __name__ == "__main__":\n    main()', choices: ['항상 main() 실행', '직접 실행 시에만 main() 호출', 'import 시에만 실행', 'Error'], answer: 1, explanation: '직접 실행할 때만 main()을 호출하고, 다른 파일에서 import할 때는 실행하지 않습니다.' },
{ q: 'collections 모듈에 포함된 것은?', choices: ['Counter, defaultdict, deque, namedtuple', 'list, dict, set', 'os, sys, math', 'json, csv, xml'], answer: 0, explanation: 'collections는 고급 자료구조를 제공합니다. Counter, defaultdict, deque, namedtuple 등.' },
{ q: 'itertools 모듈의 역할은?', choices: ['파일 처리', '효율적인 반복을 위한 함수 제공', '수학 연산', '네트워크'], answer: 1, explanation: 'itertools는 permutations, combinations, product 등 반복 도구를 제공합니다.' },
{ q: '다음 코드의 출력은?\nfrom itertools import combinations\nprint(list(combinations("ABC", 2)))', choices: ['[("A","B"), ("A","C"), ("B","C")]', '[("A","B","C")]', '["AB", "AC", "BC"]', 'Error'], answer: 0, explanation: 'combinations(반복가능, r)은 길이 r의 모든 조합을 튜플로 반환합니다.' },
{ q: 'functools 모듈의 lru_cache 역할은?', choices: ['파일 캐시', '함수 결과를 캐싱하여 재계산 방지', '리스트 캐시', '네트워크 캐시'], answer: 1, explanation: '@lru_cache 데코레이터로 함수 호출 결과를 메모이제이션합니다. 재귀 최적화에 유용.' },
{ q: 're 모듈의 역할은?', choices: ['파일 읽기', '정규 표현식 패턴 매칭', '수학 연산', '네트워크'], answer: 1, explanation: 're.search(), re.findall() 등으로 문자열에서 패턴을 검색하고 추출합니다.' },
{ q: '자신만의 모듈을 만드는 방법은?', choices: ['.py 파일을 만들면 됨', '특별한 명령어 필요', '컴파일 필수', 'pip으로만 가능'], answer: 0, explanation: '함수나 클래스를 .py 파일에 저장하면 그 자체가 모듈입니다. import 파일명으로 사용.' },
{ q: '가상환경(venv)의 목적은?', choices: ['속도 향상', '프로젝트별 독립적인 패키지 환경 관리', '보안 강화', '파일 압축'], answer: 1, explanation: '가상환경으로 프로젝트마다 다른 버전의 패키지를 독립적으로 관리합니다.' },
{ q: 'time.sleep(2)의 역할은?', choices: ['2초 대기', '2밀리초 대기', '프로그램 종료', '2번 반복'], answer: 0, explanation: 'time.sleep(초)는 지정된 초만큼 프로그램 실행을 일시 정지합니다.' },
{ q: 'string 모듈에서 ascii_letters의 내용은?', choices: ['숫자', 'a-zA-Z (영문 대소문자)', '특수문자', '한글'], answer: 1, explanation: 'string.ascii_letters는 "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"입니다.' },
{ q: '다음 코드의 출력은?\nimport math\nprint(math.pi, math.e)', choices: ['3.14... 2.71...', '3 2', 'Error', 'pi e'], answer: 0, explanation: 'math.pi는 원주율(3.14159...), math.e는 자연상수(2.71828...)입니다.' },
{ q: 'typing 모듈의 역할은?', choices: ['키보드 입력', '타입 힌트를 위한 도구 제공', '타입 강제', '문자열 처리'], answer: 1, explanation: 'List, Dict, Optional 등 복잡한 타입 힌트를 위한 도구를 제공합니다.' },
{ q: 'copy.deepcopy()의 역할은?', choices: ['얕은 복사', '중첩 객체까지 완전히 독립적으로 복사', '파일 복사', '모듈 복사'], answer: 1, explanation: 'deepcopy()는 모든 중첩 레벨의 객체를 새로 생성하여 완전 독립적인 사본을 만듭니다.' },
{ q: 'pip install requests의 역할은?', choices: ['requests 모듈 삭제', 'requests 패키지를 PyPI에서 다운로드하여 설치', 'Python 업데이트', '코드 실행'], answer: 1, explanation: 'pip install로 외부 패키지를 PyPI(Python 패키지 인덱스)에서 설치합니다.' }
]

            },

        ], related: ['u31', 'u33'],

    },

    {

        id: 'u33', category: 'function', name: 'Unit 33. 예외 처리', hanja: 'Exception Handling',

        short: 'try, except, finally, raise, 사용자 예외', color: '#ec4899', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: '예외 처리는 프로그램 실행 중 발생하는 오류를 처리하는 메커니즘입니다. try-except로 에러를 잡고 처리합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '예외(Exception)란?', choices: ['문법 오류', '프로그램 실행 중 발생하는 오류', '변수 이름', '함수 이름'], answer: 1, explanation: '예외는 프로그램 실행 중(런타임)에 발생하는 오류입니다. 문법 오류와는 다릅니다.' },
{ q: 'try-except 구문의 역할은?', choices: ['반복문', '에러 발생 시 프로그램 중단 방지', '함수 정의', '조건 검사'], answer: 1, explanation: 'try 블록에서 에러가 발생하면 except 블록이 실행되어 프로그램이 중단되지 않습니다.' },
{ q: '다음 코드의 출력은?\ntry:\n    print(10 / 0)\nexcept ZeroDivisionError:\n    print("0으로 나눌 수 없습니다")', choices: ['Error', '0으로 나눌 수 없습니다', 'inf', '0'], answer: 1, explanation: '10/0은 ZeroDivisionError를 발생시키고, except에서 메시지를 출력합니다.' },
{ q: '여러 예외를 처리하는 방법은?', choices: ['try만 여러 개', 'except를 여러 개 나열', '불가능', 'if문 사용'], answer: 1, explanation: 'except TypeError: ... except ValueError: ... 처럼 여러 except를 나열합니다.' },
{ q: '다음 코드의 출력은?\ntry:\n    num = int("abc")\nexcept ValueError as e:\n    print(f"오류: {e}")', choices: ['abc', '오류: invalid literal...', 'Error', '0'], answer: 1, explanation: '"abc"를 int로 변환하면 ValueError. as e로 에러 메시지를 출력합니다.' },
{ q: 'finally 블록의 역할은?', choices: ['에러 발생 시에만 실행', '에러 유무와 관계없이 항상 실행', '조건부 실행', '함수 종료'], answer: 1, explanation: 'finally 블록은 예외 발생 여부와 관계없이 반드시 실행됩니다. 리소스 정리에 사용.' },
{ q: '다음 코드의 출력은?\ntry:\n    x = 1 / 1\nexcept:\n    print("에러")\nfinally:\n    print("종료")', choices: ['에러\n종료', '종료', '에러', 'Error'], answer: 1, explanation: '1/1은 에러 없이 정상 실행. except는 건너뛰고 finally의 "종료"만 출력됩니다.' },
{ q: 'else 블록(try-except-else)의 역할은?', choices: ['에러 시 실행', '에러가 없을 때 실행', '항상 실행', '조건 검사'], answer: 1, explanation: 'else 블록은 try에서 예외가 발생하지 않았을 때만 실행됩니다.' },
{ q: '다음 코드의 출력은?\ntry:\n    result = 10 / 2\nexcept ZeroDivisionError:\n    print("에러")\nelse:\n    print(f"결과: {result}")\nfinally:\n    print("완료")', choices: ['결과: 5.0\n완료', '에러\n완료', '완료', '결과: 5.0'], answer: 0, explanation: '에러 없이 성공하므로 else 블록 실행("결과: 5.0"), finally도 실행("완료").' },
{ q: 'raise의 역할은?', choices: ['에러 무시', '의도적으로 예외를 발생시킴', '변수 생성', '함수 호출'], answer: 1, explanation: 'raise ValueError("메시지")로 개발자가 직접 예외를 발생시킬 수 있습니다.' },
{ q: '다음 코드의 출력은?\ndef check_age(age):\n    if age < 0:\n        raise ValueError("나이는 음수일 수 없습니다")\n    return age\ntry:\n    check_age(-1)\nexcept ValueError as e:\n    print(e)', choices: ['나이는 음수일 수 없습니다', '-1', 'Error', 'None'], answer: 0, explanation: 'age=-1이므로 raise로 ValueError를 발생시키고, except에서 에러 메시지를 출력합니다.' },
{ q: '사용자 정의 예외를 만드는 방법은?', choices: ['def로 함수 정의', 'Exception을 상속받는 클래스 정의', '문자열 사용', '불가능'], answer: 1, explanation: 'class MyError(Exception): pass로 Exception을 상속받아 사용자 정의 예외를 만듭니다.' },
{ q: 'except Exception as e에서 e의 역할은?', choices: ['에러 코드', '예외 객체(에러 메시지 포함)', '줄 번호', '파일 이름'], answer: 1, explanation: 'as e로 예외 객체를 변수에 저장합니다. str(e)로 에러 메시지를 확인할 수 있습니다.' },
{ q: 'bare except(except:)의 문제점은?', choices: ['속도 저하', '모든 예외를 잡아서 디버깅이 어려움', '문법 에러', '기능 없음'], answer: 1, explanation: 'except:는 모든 예외를 잡아 진짜 문제를 숨길 수 있습니다. 구체적 예외를 명시하세요.' },
{ q: '다음 중 ValueError가 발생하는 코드는?', choices: ['int("abc")', '10 / 0', 'lst[100]', 'x + y'], answer: 0, explanation: 'int("abc")는 문자열을 정수로 변환 불가하므로 ValueError. 10/0은 ZeroDivisionError.' },
{ q: '다음 중 IndexError가 발생하는 코드는?', choices: ['int("abc")', '10 / 0', '[1, 2][5]', 'None + 1'], answer: 2, explanation: '[1,2][5]는 인덱스 범위 초과로 IndexError. 리스트 길이는 2인데 인덱스 5 접근.' },
{ q: '다음 중 KeyError가 발생하는 코드는?', choices: ['lst[0]', 'd["없는키"] (d={})', '10 / 0', 'int("3")'], answer: 1, explanation: '빈 딕셔너리에서 존재하지 않는 키를 접근하면 KeyError가 발생합니다.' },
{ q: 'TypeError가 발생하는 상황은?', choices: ['0으로 나눔', '타입이 맞지 않는 연산(예: "a" + 1)', '인덱스 초과', '키 부재'], answer: 1, explanation: '문자열과 정수의 + 연산은 타입이 맞지 않아 TypeError가 발생합니다.' },
{ q: 'AttributeError가 발생하는 상황은?', choices: ['0으로 나눔', '존재하지 않는 속성/메서드 호출', '인덱스 초과', '타입 불일치'], answer: 1, explanation: '객체에 존재하지 않는 속성이나 메서드를 호출하면 AttributeError가 발생합니다.' },
{ q: '다음 코드의 출력은?\ntry:\n    lst = [1, 2, 3]\n    print(lst[5])\nexcept IndexError:\n    print("인덱스 초과")\nexcept Exception:\n    print("기타 에러")', choices: ['인덱스 초과', '기타 에러', '3', 'Error'], answer: 0, explanation: 'IndexError가 먼저 매칭됩니다. 구체적 예외를 먼저 배치해야 합니다.' },
{ q: '예외 처리의 올바른 순서는?', choices: ['큰 예외 -> 작은 예외', '작은(구체적) 예외 -> 큰(일반적) 예외', '순서 무관', '하나만 가능'], answer: 1, explanation: '구체적 예외(ValueError)를 먼저, 일반적 예외(Exception)를 나중에 배치합니다.' },
{ q: '다음 코드의 출력은?\ndef safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None\nprint(safe_divide(10, 0))', choices: ['None', '0', 'Error', 'inf'], answer: 0, explanation: '0으로 나누면 except에서 None을 반환합니다. 프로그램이 중단되지 않습니다.' },
{ q: 'FileNotFoundError는 언제 발생하는가?', choices: ['파일 쓰기 시', '존재하지 않는 파일을 읽으려 할 때', '인코딩 오류', '메모리 부족'], answer: 1, explanation: 'open("없는파일.txt", "r")에서 파일이 없으면 FileNotFoundError가 발생합니다.' },
{ q: 'NameError는 언제 발생하는가?', choices: ['파일 없음', '정의되지 않은 변수 사용', '0 나눗셈', '인덱스 초과'], answer: 1, explanation: '선언하지 않은 변수를 사용하면 NameError가 발생합니다. print(undefined_var).' },
{ q: '다음 코드의 출력은?\ntry:\n    x = int(input("숫자: "))\nexcept ValueError:\n    x = 0\nfinally:\n    print(f"x는 {x}")\n# 입력: abc', choices: ['x는 0', 'x는 abc', 'Error', 'x는 None'], answer: 0, explanation: '"abc"는 int 변환 불가(ValueError) -> except에서 x=0 -> finally에서 "x는 0" 출력.' },
{ q: 'assert문의 역할은?', choices: ['에러 무시', '조건이 False이면 AssertionError 발생', '변수 선언', '함수 호출'], answer: 1, explanation: 'assert 조건, "메시지"는 조건이 False일 때 AssertionError를 발생시킵니다. 디버깅 용도.' },
{ q: '다음 코드의 결과는?\nassert 2 + 2 == 5, "계산 오류"', choices: ['정상 통과', 'AssertionError: 계산 오류', 'SyntaxError', '5'], answer: 1, explanation: '2+2=4이므로 4==5는 False. AssertionError가 "계산 오류" 메시지와 함께 발생합니다.' },
{ q: 'traceback의 역할은?', choices: ['에러 무시', '에러 발생 경로(호출 스택)를 보여줌', '코드 실행', '변수 출력'], answer: 1, explanation: 'traceback은 에러 발생 시 호출 경로(어떤 함수에서 어떤 줄에서 에러)를 보여줍니다.' },
{ q: 'logging 모듈과 print의 차이는?', choices: ['같은 기능', 'logging은 레벨별 기록, 파일 저장, 포맷팅 등 전문적 로깅', 'print가 더 전문적', 'logging은 느림'], answer: 1, explanation: 'logging은 DEBUG/INFO/WARNING/ERROR/CRITICAL 레벨, 파일 출력 등 전문적 로깅을 지원합니다.' },
{ q: '다음 코드의 except 처리 순서로 올바른 것은?', choices: ['except Exception -> except ValueError', 'except ValueError -> except TypeError -> except Exception', 'except: -> except ValueError', '순서 무관'], answer: 1, explanation: '구체적 예외부터 일반적 예외 순서로 나열합니다. Exception은 가장 마지막에 배치.' }
]

            },

        ], related: ['u32', 'u34'],

    },

    {

        id: 'u34', category: 'function', name: 'Unit 34. 파일 입출력', hanja: 'File I/O',

        short: 'open, read, write, with, CSV, JSON', color: '#ec4899', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: 'open()으로 파일을 열고, read/write로 읽기/쓰기를 합니다. with문으로 자동으로 닫습니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '클래스(class)란?', choices: ['함수의 종류', '객체를 만들기 위한 설계도(틀)', '변수 묶음', '파일 형식'], answer: 1, explanation: '클래스는 속성(데이터)과 메서드(동작)를 하나로 묶은 객체의 설계도입니다.' },
{ q: '객체(object)란?', choices: ['클래스 자체', '클래스로부터 생성된 실체(인스턴스)', '함수', '모듈'], answer: 1, explanation: '객체는 클래스를 기반으로 생성된 실제 데이터입니다. dog = Dog()에서 dog이 객체.' },
{ q: '클래스를 정의하는 키워드는?', choices: ['def', 'class', 'object', 'new'], answer: 1, explanation: 'class 키워드로 클래스를 정의합니다. class ClassName:' },
{ q: '__init__ 메서드의 역할은?', choices: ['클래스 삭제', '객체 생성 시 자동 호출되는 초기화 메서드', '클래스 출력', '상속'], answer: 1, explanation: '__init__은 생성자로, 객체가 만들어질 때 속성을 초기화합니다.' },
{ q: 'self의 역할은?', choices: ['전역 변수', '현재 객체 자신을 참조하는 매개변수', '클래스 이름', '모듈 참조'], answer: 1, explanation: 'self는 메서드의 첫 매개변수로, 현재 인스턴스를 가리킵니다. self.속성으로 접근.' },
{ q: '다음 코드의 출력은?\nclass Dog:\n    def __init__(self, name):\n        self.name = name\n    def bark(self):\n        return f"{self.name}: 멍!"\nd = Dog("초코")\nprint(d.bark())', choices: ['초코: 멍!', 'Dog: 멍!', 'Error', 'None'], answer: 0, explanation: 'Dog("초코")로 name="초코" 설정. bark()에서 self.name="초코"를 사용합니다.' },
{ q: '인스턴스 변수와 클래스 변수의 차이는?', choices: ['같은 것', '인스턴스: 객체별 고유, 클래스: 모든 객체 공유', '클래스 변수가 더 빠름', '인스턴스만 존재'], answer: 1, explanation: '인스턴스 변수(self.x)는 각 객체 고유. 클래스 변수(Class.x)는 모든 인스턴스가 공유.' },
{ q: '다음 코드의 출력은?\nclass Counter:\n    count = 0\n    def __init__(self):\n        Counter.count += 1\na = Counter()\nb = Counter()\nprint(Counter.count)', choices: ['0', '1', '2', 'Error'], answer: 2, explanation: '클래스 변수 count를 두 번 증가시킵니다. a, b 생성 후 Counter.count=2.' },
{ q: '메서드(method)란?', choices: ['클래스 외부 함수', '클래스 내부에 정의된 함수', '전역 변수', '모듈'], answer: 1, explanation: '메서드는 클래스 내에 정의된 함수이며, 첫 매개변수로 self를 받습니다.' },
{ q: '상속(inheritance)이란?', choices: ['변수 복사', '기존 클래스의 속성과 메서드를 물려받아 새 클래스 생성', '함수 호출', '모듈 가져오기'], answer: 1, explanation: 'class Child(Parent):로 Parent의 기능을 재사용하고 확장합니다.' },
{ q: '다음 코드의 출력은?\nclass Animal:\n    def speak(self):\n        return "..."\nclass Cat(Animal):\n    def speak(self):\n        return "야옹"\nc = Cat()\nprint(c.speak())', choices: ['...', '야옹', 'Error', 'None'], answer: 1, explanation: 'Cat이 speak()을 오버라이딩합니다. 자식 클래스의 메서드가 우선 호출.' },
{ q: 'super()의 역할은?', choices: ['클래스 삭제', '부모 클래스의 메서드를 호출', '최상위 클래스 접근', '에러 처리'], answer: 1, explanation: 'super().메서드()로 부모 클래스의 메서드를 호출합니다. 주로 __init__에서 사용.' },
{ q: '다음 코드의 출력은?\nclass A:\n    def __init__(self, x):\n        self.x = x\nclass B(A):\n    def __init__(self, x, y):\n        super().__init__(x)\n        self.y = y\nb = B(1, 2)\nprint(b.x, b.y)', choices: ['1 2', 'Error', 'None None', '2 1'], answer: 0, explanation: 'super().__init__(1)로 부모의 x=1 설정. self.y=2 추가. b.x=1, b.y=2.' },
{ q: '__str__ 메서드의 역할은?', choices: ['문자열 변환', 'print() 시 객체의 문자열 표현 정의', '비교 연산', '삭제'], answer: 1, explanation: '__str__을 정의하면 print(객체) 시 이 메서드의 반환값이 출력됩니다.' },
{ q: '__repr__ 메서드의 역할은?', choices: ['__str__과 동일', '개발자를 위한 객체의 공식 표현 정의', '삭제', '비교'], answer: 1, explanation: '__repr__은 개발자용 표현, __str__은 사용자용 표현입니다. eval()로 복원 가능하게 작성.' },
{ q: '캡슐화(encapsulation)란?', choices: ['코드 삭제', '데이터를 외부로부터 숨기고 메서드를 통해 접근', '상속', '다형성'], answer: 1, explanation: '속성 앞에 _나 __를 붙여 외부 접근을 제한하고, getter/setter로 안전하게 접근합니다.' },
{ q: '다형성(polymorphism)이란?', choices: ['하나의 형태', '같은 이름의 메서드가 클래스별로 다르게 동작', '변수 복사', '파일 처리'], answer: 1, explanation: '같은 speak() 메서드가 Dog에서는 "멍", Cat에서는 "야옹"으로 다르게 동작합니다.' },
{ q: '@property 데코레이터의 역할은?', choices: ['변수 삭제', '메서드를 속성처럼 접근 가능하게 함', '상속', '클래스 생성'], answer: 1, explanation: '@property로 getter를 정의하면 obj.속성처럼 메서드를 호출합니다. 괄호 없이 접근.' },
{ q: '@classmethod의 특징은?', choices: ['인스턴스 메서드', '클래스 자체를 첫 인자(cls)로 받는 메서드', '정적 메서드', '추상 메서드'], answer: 1, explanation: '@classmethod는 cls로 클래스를 받아 클래스 변수에 접근합니다. 팩토리 메서드 패턴.' },
{ q: '@staticmethod의 특징은?', choices: ['self 필요', 'self, cls 모두 불필요한 유틸리티 메서드', '상속 전용', '추상 메서드'], answer: 1, explanation: '@staticmethod는 self도 cls도 받지 않는 일반 함수처럼 동작하는 메서드입니다.' },
{ q: '다음 코드의 출력은?\nclass Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Point(self.x+other.x, self.y+other.y)\np = Point(1,2) + Point(3,4)\nprint(p.x, p.y)', choices: ['4 6', '1 2', '3 4', 'Error'], answer: 0, explanation: '__add__로 + 연산자를 재정의합니다. (1+3, 2+4) = (4, 6).' },
{ q: 'isinstance()의 역할은?', choices: ['타입 변환', '객체가 특정 클래스의 인스턴스인지 확인', '클래스 생성', '상속 관계 정의'], answer: 1, explanation: 'isinstance(obj, Class)는 obj가 Class(또는 그 하위 클래스)의 인스턴스면 True.' },
{ q: '추상 클래스(ABC)의 역할은?', choices: ['일반 클래스', '인스턴스를 직접 생성할 수 없고 상속용으로만 사용', '빠른 클래스', '정적 클래스'], answer: 1, explanation: 'from abc import ABC, abstractmethod로 추상 클래스를 만듭니다. 자식 클래스에서 반드시 구현.' },
{ q: '다중 상속이란?', choices: ['여러 객체 생성', '하나의 클래스가 여러 부모 클래스를 상속', '상속 불가', '단일 상속만 가능'], answer: 1, explanation: 'class C(A, B):로 A와 B를 동시에 상속받습니다. MRO로 메서드 탐색 순서 결정.' },
{ q: '매직 메서드(던더 메서드)의 예시는?', choices: ['__init__, __str__, __len__', 'init, str, len', '_init, _str', 'new, del, add'], answer: 0, explanation: '이중 밑줄(__로 감싸는)을 사용하는 특수 메서드입니다. __init__, __str__, __len__ 등.' },
{ q: '다음 코드의 출력은?\nclass MyList:\n    def __init__(self, data):\n        self.data = data\n    def __len__(self):\n        return len(self.data)\nml = MyList([1,2,3])\nprint(len(ml))', choices: ['3', 'Error', 'MyList', 'None'], answer: 0, explanation: '__len__을 정의하면 len(객체)를 사용할 수 있습니다. len(ml)=3.' },
{ q: '데이터 클래스(dataclass)란?', choices: ['일반 클래스', '@dataclass로 __init__ 등을 자동 생성하는 클래스', '추상 클래스', '정적 클래스'], answer: 1, explanation:'from dataclasses import dataclass. @dataclass로 __init__, __repr__ 등을 자동 생성합니다.' },
{ q: '컴포지션(composition)과 상속의 차이는?', choices: ['같은 개념', '상속: is-a 관계, 컴포지션: has-a 관계', '컴포지션이 항상 우월', '상속이 항상 우월'], answer: 1, explanation: '상속은 "Cat is an Animal", 컴포지션은 "Car has an Engine". 관계에 따라 선택.' },
{ q: 'MRO(Method Resolution Order)란?', choices: ['메서드 삭제 순서', '다중 상속에서 메서드 탐색 우선순위', '메서드 생성 순서', '파일 읽기 순서'], answer: 1, explanation: 'MRO는 다중 상속에서 어떤 부모의 메서드를 먼저 찾을지 결정합니다. C3 선형화 알고리즘.' },
{ q: '다음 코드의 출력은?\nclass Circle:\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return 3.14 * self.r ** 2\nc = Circle(5)\nprint(c.area())', choices: ['78.5', '31.4', '15.7', 'Error'], answer: 0, explanation: '3.14 * 5^2 = 3.14 * 25 = 78.5. 클래스로 원의 넓이를 구합니다.' }
]

            },

        ], related: ['u33', 'u35'],

    },

    {

        id: 'u35', category: 'function', name: 'Unit 35. 정렬과 탐색', hanja: 'Sorting & Searching',

        short: '버블정렬, 선택정렬, 이진탐색, key 함수', color: '#ec4899', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: '정렬(bubble, selection, insertion)과 탐색(linear, binary) 알고리즘의 기본 원리를 학습합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '이터레이터(iterator)란?', choices: ['반복 가능 객체', 'next()로 값을 하나씩 반환하는 객체', '리스트', '딕셔너리'], answer: 1, explanation: '이터레이터는 __iter__와 __next__ 메서드를 가진 객체로, next()로 순차 접근합니다.' },
{ q: 'iter()와 next()의 역할은?', choices: ['정렬과 필터', 'iter: 이터레이터 생성, next: 다음 요소 반환', '읽기와 쓰기', '열기와 닫기'], answer: 1, explanation: 'iter(반복가능)으로 이터레이터를 만들고, next(이터레이터)로 요소를 하나씩 가져옵니다.' },
{ q: '다음 코드의 출력은?\nlst = [10, 20, 30]\nit = iter(lst)\nprint(next(it), next(it))', choices: ['10 20', '10 10', '20 30', 'Error'], answer: 0, explanation: 'next()를 호출할 때마다 다음 요소를 반환합니다. 첫 번째 10, 두 번째 20.' },
{ q: 'StopIteration 예외는 언제 발생하는가?', choices: ['항상', '이터레이터의 모든 요소를 소진했을 때', '시작할 때', '에러 시'], answer: 1, explanation: '더 이상 반환할 요소가 없을 때 next()가 StopIteration을 발생시킵니다.' },
{ q: '제너레이터(generator)란?', choices: ['일반 함수', 'yield를 사용하여 값을 하나씩 생산하는 함수', '클래스', '모듈'], answer: 1, explanation: '제너레이터는 return 대신 yield로 값을 반환합니다. 호출 시 이터레이터를 반환.' },
{ q: 'yield와 return의 차이는?', choices: ['같은 기능', 'yield: 함수 상태 유지, return: 함수 종료', 'return이 더 빠름', 'yield는 에러'], answer: 1, explanation: 'yield는 값을 반환하고 함수 상태를 유지합니다. 다음 호출 시 yield 이후부터 실행.' },
{ q: '다음 코드의 출력은?\ndef gen():\n    yield 1\n    yield 2\n    yield 3\nfor x in gen():\n    print(x, end=" ")', choices: ['1 2 3', 'gen', '[1, 2, 3]', 'Error'], answer: 0, explanation: 'yield로 1, 2, 3을 순차적으로 반환합니다. for문이 자동으로 next()를 호출.' },
{ q: '제너레이터의 메모리 장점은?', choices: ['없음', '모든 값을 한번에 메모리에 저장하지 않고 필요시 생성', '더 많은 메모리 사용', '디스크에 저장'], answer: 1, explanation: '제너레이터는 게으른 평가(lazy evaluation)로 한 번에 하나만 생성하여 메모리를 절약합니다.' },
{ q: '제너레이터 표현식의 형태는?', choices: ['[x for x in range(10)]', '(x for x in range(10))', '{x for x in range(10)}', 'gen(x for x in range(10))'], answer: 1, explanation: '소괄호()를 사용한 (표현식 for 변수 in 반복가능)이 제너레이터 표현식입니다.' },
{ q: '다음 코드의 출력은?\ng = (x**2 for x in range(5))\nprint(type(g))', choices: ['list', 'tuple', 'generator', 'set'], answer: 2, explanation: '소괄호 컴프리헨션은 제너레이터 객체를 생성합니다. <class generator>.' },
{ q: '다음 코드의 출력은?\ndef count_up(n):\n    i = 1\n    while i <= n:\n        yield i\n        i += 1\nprint(list(count_up(5)))', choices: ['[1, 2, 3, 4, 5]', '[0, 1, 2, 3, 4]', '[5]', 'Error'], answer: 0, explanation: 'while 루프에서 yield로 1부터 5까지 하나씩 반환합니다.' },
{ q: 'yield from의 역할은?', choices: ['에러 발생', '다른 제너레이터나 반복가능 객체의 값을 위임', '함수 종료', '예외 처리'], answer: 1, explanation: 'yield from iterable은 반복가능 객체의 각 값을 하나씩 yield합니다. 중첩 제너레이터.' },
{ q: '다음 코드의 출력은?\ndef flatten(lst):\n    for item in lst:\n        if isinstance(item, list):\n            yield from flatten(item)\n        else:\n            yield item\nprint(list(flatten([1,[2,[3,4]],5])))', choices: ['[1, 2, 3, 4, 5]', '[[1],[2,[3,4]],5]', 'Error', '[1, [2, [3, 4]], 5]'], answer: 0, explanation: 'yield from으로 재귀적으로 중첩 리스트를 평탄화합니다.' },
{ q: '이터러블(iterable)과 이터레이터(iterator)의 차이는?', choices: ['같은 것', '이터러블: __iter__ 보유, 이터레이터: __iter__ + __next__ 보유', '이터레이터가 더 큼', '이터러블만 존재'], answer: 1, explanation: '이터러블은 iter()를 호출하면 이터레이터를 반환합니다. 리스트는 이터러블, iter(리스트)는 이터레이터.' },
{ q: 'send() 메서드의 역할은?', choices: ['제너레이터 종료', '제너레이터에 값을 전송하여 yield의 반환값으로 사용', '에러 전송', '데이터 저장'], answer: 1, explanation: 'gen.send(value)로 yield 표현식에 값을 전달합니다. 양방향 통신.' },
{ q: '무한 제너레이터를 만드는 방법은?', choices: ['불가능', 'while True에서 yield 사용', 'forever 키워드', 'infinite()'], answer: 1, explanation: 'def inf(): while True: yield ... 으로 무한 시퀀스를 생성합니다. 게으른 평가로 가능.' },
{ q: '다음 코드의 출력은?\ndef even_nums():\n    n = 0\n    while True:\n        yield n\n        n += 2\ng = even_nums()\nprint([next(g) for _ in range(5)])', choices: ['[0, 2, 4, 6, 8]', '[0, 1, 2, 3, 4]', '[2, 4, 6, 8, 10]', 'Error'], answer: 0, explanation: '무한 짝수 제너레이터에서 5개만 가져옵니다. [0, 2, 4, 6, 8].' },
{ q: '제너레이터를 사용하기 적합한 상황은?', choices: ['작은 데이터', '대용량 데이터를 한 번에 처리할 때', '메모리가 충분할 때', '정렬이 필요할 때'], answer: 1, explanation: '대용량 파일 읽기, 무한 시퀀스 등 메모리를 절약해야 할 때 적합합니다.' },
{ q: 'close() 메서드의 역할은?', choices: ['파일 닫기', '제너레이터를 명시적으로 종료', '변수 삭제', '에러 처리'], answer: 1, explanation: 'gen.close()로 제너레이터를 종료하고 GeneratorExit 예외를 발생시킵니다.' },
{ q: 'itertools.count()의 역할은?', choices: ['요소 개수', '지정 시작값부터 무한히 증가하는 이터레이터', '카운트다운', '리스트 생성'], answer: 1, explanation: 'itertools.count(start=0, step=1)은 무한 카운터 이터레이터입니다.' },
{ q: 'itertools.chain()의 역할은?', choices: ['연결 리스트', '여러 이터러블을 하나로 연결', '정렬', '필터링'], answer: 1, explanation: 'chain(a, b, c)는 a, b, c의 요소를 순서대로 하나의 이터레이터로 연결합니다.' },
{ q: 'itertools.islice()의 역할은?', choices: ['리스트 슬라이싱', '이터레이터에서 지정 범위만 추출(게으른 슬라이싱)', '정렬', '필터링'], answer: 1, explanation: 'islice(이터레이터, start, stop)으로 이터레이터의 일부만 효율적으로 추출합니다.' },
{ q: '다음 코드의 출력은?\nfrom itertools import islice, count\nprint(list(islice(count(10), 5)))', choices: ['[10, 11, 12, 13, 14]', '[0, 1, 2, 3, 4]', '[10, 20, 30, 40, 50]', 'Error'], answer: 0, explanation: 'count(10)은 10부터 시작하는 무한 카운터. islice로 5개만 추출: [10~14].' },
{ q: 'map과 제너레이터 표현식의 공통점은?', choices: ['없음', '둘 다 게으른 평가(lazy evaluation)', '둘 다 리스트 반환', '둘 다 함수'], answer: 1, explanation: 'map()과 제너레이터 표현식 모두 요소를 필요할 때만 생성하는 게으른 평가입니다.' },
{ q: '다음 코드의 출력은?\ndef fib():\n    a, b = 0, 1\n    while True:\n        yield a\n        a, b = b, a + b\ng = fib()\nprint([next(g) for _ in range(8)])', choices: ['[0, 1, 1, 2, 3, 5, 8, 13]', '[1, 1, 2, 3, 5, 8, 13, 21]', '[0, 1, 2, 3, 4, 5, 6, 7]', 'Error'], answer: 0, explanation: '무한 피보나치 제너레이터. 8개 추출: 0, 1, 1, 2, 3, 5, 8, 13.' },
{ q: 'itertools.product()의 역할은?', choices: ['곱셈', '데카르트 곱(모든/조합)', '합집합', '교집합'], answer: 1, explanation: 'product("AB", "12")는 ("A","1"),("A","2"),("B","1"),("B","2")를 생성합니다.' },
{ q: 'itertools.groupby()의 역할은?', choices: ['그룹 삭제', '연속 같은 키를 가진 요소를 그룹화', '정렬', '필터링'], answer: 1, explanation: 'groupby(정렬된_데이터, key=기준)으로 같은 키의 연속 요소를 그룹화합니다.' },
{ q: '제너레이터는 한 번만 순회할 수 있는가?', choices: ['여러 번 가능', '한 번만 가능(소진되면 재사용 불가)', '무한 순회 가능', '상황에 따라 다름'], answer: 1, explanation: '제너레이터는 한 번 소진되면 다시 순회할 수 없습니다. 재사용하려면 새로 생성해야 합니다.' },
{ q: 'contextlib.contextmanager의 역할은?', choices: ['컨텍스트 삭제', '제너레이터를 with문 컨텍스트 매니저로 변환', '파일 관리', '에러 처리'], answer: 1, explanation: '@contextmanager와 yield를 사용하여 간단하게 with문에 사용 가능한 컨텍스트 매니저를 만듭니다.' },
{ q: '다음 코드의 출력은?\ndef squares(n):\n    for i in range(n):\n        yield i ** 2\nprint(sum(squares(4)))', choices: ['14', '9', '30', 'Error'], answer: 0, explanation: '0^2+1^2+2^2+3^2 = 0+1+4+9 = 14. 제너레이터로 제곱수의 합을 구합니다.' }
]

            },

        ], related: ['u34', 'u36'],

    },





    // ──────── OOP (Unit 36~40) ────────

    {

        id: 'u36', category: 'oop', name: 'Unit 36. 클래스와 객체', hanja: 'Class & Object',

        short: 'class, __init__, self, 속성, 메서드', color: '#14b8a6', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: '클래스는 객체의 설계도이고, 객체는 클래스로 만든 인스턴스입니다. __init__으로 초기화하고 self로 인스턴스를 참조합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '정규 표현식(regex)이란?', choices: ['일반 수식', '문자열의 패턴을 정의하는 특수 문자열', '변수 이름 규칙', '파일 포맷'], answer: 1, explanation: '정규 표현식은 문자열에서 특정 패턴을 검색, 매칭, 치환하는 강력한 도구입니다.' },
{ q: 're.search()의 역할은?', choices: ['문자열 전체 매칭', '문자열에서 패턴을 검색하여 첫 번째 매치 반환', '모든 매치 반환', '치환'], answer: 1, explanation: 're.search(패턴, 문자열)은 문자열 어디서든 패턴이 있으면 Match 객체를 반환합니다.' },
{ q: 're.match()와 re.search()의 차이는?', choices: ['같은 기능', 'match: 문자열 시작부터, search: 어디서든 검색', 'search가 느림', 'match가 더 유연'], answer: 1, explanation: 'match()는 문자열 처음부터 매칭, search()는 어디서든 첫 번째 매칭을 찾습니다.' },
{ q: 're.findall()의 역할은?', choices: ['첫 번째 매치만', '패턴에 맞는 모든 문자열을 리스트로 반환', '치환', '분할'], answer: 1, explanation: 'findall(패턴, 문자열)은 매칭되는 모든 부분을 리스트로 반환합니다.' },
{ q: '\\d의 의미는?', choices: ['공백', '숫자 한 자리(0-9)', '문자', '특수문자'], answer: 1, explanation: '\\d는 숫자(digit) 하나를 나타냅니다. [0-9]와 동일.' },
{ q: '\\w의 의미는?', choices: ['공백', '숫자만', '단어 문자(영문, 숫자, _)', '특수문자'], answer: 2, explanation: '\\w는 word character로 [a-zA-Z0-9_]와 동일합니다.' },
{ q: '\\s의 의미는?', choices: ['숫자', '공백 문자(스페이스, 탭, 줄바꿈)', '단어', '특수문자'], answer: 1, explanation: '\\s는 공백 문자(space, tab, newline 등)를 나타냅니다.' },
{ q: '.의 의미는?', choices: ['마침표만', '줄바꿈을 제외한 모든 문자', '숫자', '알파벳'], answer: 1, explanation: '. 은 줄바꿈(\\n)을 제외한 모든 문자 하나를 매칭합니다.' },
{ q: '*와 +의 차이는?', choices: ['같은 기능', '*: 0회 이상, +: 1회 이상', '*가 더 빠름', '+: 0회 이상, *: 1회 이상'], answer: 1, explanation: 'a*는 a가 0번 이상, a+는 a가 1번 이상 반복됨을 의미합니다.' },
{ q: '?의 의미는?', choices: ['에러', '0회 또는 1회(선택적)', '무한 반복', '줄바꿈'], answer: 1, explanation: 'a?는 a가 있거나 없거나(0회 또는 1회)를 의미합니다. 선택적 매칭.' },
{ q: '다음 코드의 출력은?\nimport re\nresult = re.findall(r"\\d+", "나이 25세, 키 175cm")\nprint(result)', choices: ['["25", "175"]', '["2", "5", "1", "7", "5"]', '["25세", "175cm"]', 'Error'], answer: 0, explanation: '\\d+는 연속된 숫자를 매칭합니다. "25"와 "175"를 찾습니다.' },
{ q: '[]의 의미는?', choices: ['리스트', '문자 클래스(지정 문자 중 하나)', '선택적', '반복'], answer: 1, explanation: '[abc]는 a, b, c 중 하나를 매칭합니다. [0-9]는 숫자 하나.' },
{ q: '^와 $의 의미는?', choices: ['지수 연산', '^: 문자열 시작, $: 문자열 끝', '부정', '그룹'], answer: 1, explanation: '^Hello는 Hello로 시작, world$는 world로 끝나는 문자열을 매칭합니다.' },
{ q: '그룹핑 ()의 역할은?', choices: ['함수 호출', '패턴 그룹화 및 캡처', '배열', '우선순위 없음'], answer: 1, explanation: '(패턴)으로 그룹을 만들어 캡처하고, group(1)로 추출합니다.' },
{ q: 're.sub()의 역할은?', choices: ['부분 문자열', '패턴에 매칭되는 부분을 치환', '빼기', '분할'], answer: 1, explanation: 're.sub(패턴, 치환, 문자열)은 매칭 부분을 치환한 새 문자열을 반환합니다.' },
{ q: '다음 코드의 출력은?\nimport re\nresult = re.sub(r"\\d+", "X", "Room 101, Floor 3")\nprint(result)', choices: ['Room X, Floor X', 'Room 101, Floor 3', 'X X', 'Error'], answer: 0, explanation: '숫자를 모두 "X"로 치환합니다. "Room X, Floor X".' },
{ q: 're.split()의 역할은?', choices: ['결합', '패턴을 기준으로 문자열을 분할', '검색', '치환'], answer: 1, explanation: 're.split(패턴, 문자열)은 패턴을 구분자로 문자열을 나눕니다. str.split()보다 유연.' },
{ q: '다음 코드의 출력은?\nimport re\nresult = re.split(r"[,;]", "a,b;c,d")\nprint(result)', choices: ['["a", "b", "c", "d"]', '["a,b;c,d"]', '["a,b", "c,d"]', 'Error'], answer: 0, explanation: '[,;]는 쉼표 또는 세미콜론을 구분자로 사용합니다. 4개로 분할.' },
{ q: 'r"문자열"(raw string)을 정규식에서 사용하는 이유는?', choices: ['속도 향상', '역슬래시를 이스케이프 없이 사용하기 위해', '대소문자 무시', '멀티라인'], answer: 1, explanation: 'r"\\d"는 \\d 그대로 전달됩니다. 없으면 "\\\\d"로 이스케이프 해야 합니다.' },
{ q: '{n,m}의 의미는?', choices: ['집합', 'n회 이상 m회 이하 반복', '정확히 n번', 'n 또는 m'], answer: 1, explanation: 'a{2,4}는 a가 2~4회 반복됨을 의미합니다. {n}은 정확히 n회.' },
{ q: '| (파이프)의 의미는?', choices: ['AND', 'OR(택일)', '부정', '그룹'], answer: 1, explanation: 'cat|dog은 "cat" 또는 "dog"을 매칭합니다. OR 연산.' },
{ q: '다음 코드의 출력은?\nimport re\npattern = r"(\\w+)@(\\w+\\.\\w+)"\nm = re.search(pattern, "email: test@gmail.com")\nprint(m.group(1), m.group(2))', choices: ['test gmail.com', 'test@gmail.com test', 'email test', 'Error'], answer: 0, explanation: '그룹1: (\\w+)="test", 그룹2: (\\w+\\.\\w+)="gmail.com". 이메일 파싱.' },
{ q: 're.compile()의 장점은?', choices: ['없음', '패턴을 미리 컴파일하여 반복 사용 시 효율적', '에러 방지', '자동 치환'], answer: 1, explanation: 're.compile(패턴)으로 패턴 객체를 만들면 여러 번 사용할 때 성능이 향상됩니다.' },
{ q: '탐욕적(greedy) vs 게으른(lazy) 매칭은?', choices: ['같은 것', '*는 최대 매칭(탐욕), *?는 최소 매칭(게으른)', '*가 항상 좋음', '?가 항상 좋음'], answer: 1, explanation: '.*는 가능한 많이(greedy), .*?는 가능한 적게(lazy) 매칭합니다.' },
{ q: '전방 탐색(lookahead) (?=...)의 역할은?', choices: ['문자 삭제', '패턴 뒤에 특정 패턴이 오는지 확인(소비하지 않음)', '그룹 캡처', '역방향 검색'], answer: 1, explanation: '(?=패턴)은 해당 패턴이 뒤에 오는지 확인하지만 매칭에 포함하지 않습니다.' },
{ q: '[^abc]의 의미는?', choices: ['a, b, c 중 하나', 'a, b, c가 아닌 문자', '문자열 시작', 'abc 다음'], answer: 1, explanation: '[] 안의 ^는 부정(NOT)입니다. [^abc]는 a, b, c를 제외한 모든 문자.' },
{ q: '\\b의 의미는?', choices: ['줄바꿈', '단어 경계(word boundary)', '탭', '백스페이스'], answer: 1, explanation: '\\b는 단어의 시작 또는 끝 경계입니다. \\bcat\\b는 "cat"만 매칭(category는 제외).' },
{ q: 're.IGNORECASE 플래그의 역할은?', choices: ['줄바꿈 무시', '대소문자 구분 없이 매칭', '공백 무시', '주석 추가'], answer: 1, explanation: 're.I 또는 re.IGNORECASE로 대소문자를 구분하지 않고 패턴을 매칭합니다.' },
{ q: '정규 표현식의 적절한 사용 사례는?', choices: ['이메일/전화번호 패턴 검증', '복잡한 수학 계산', '파일 시스템 탐색', '네트워크 통신'], answer: 0, explanation: '정규 표현식은 이메일, 전화번호, URL 등 문자열 패턴 검증과 추출에 가장 적합합니다.' },
{ q: '다음 코드의 출력은?\nimport re\nprint(re.findall(r"[A-Z]", "Hello World"))', choices: ['["H", "W"]', '["Hello", "World"]', '["ello", "orld"]', 'Error'], answer: 0, explanation: '[A-Z]는 대문자 하나를 매칭합니다. "H"와 "W"가 대문자입니다.' }
]

            },

        ], related: ['u35', 'u37'],

    },

    {

        id: 'u37', category: 'oop', name: 'Unit 37. 상속', hanja: 'Inheritance',

        short: '상속, 오버라이딩, super(), 다중 상속', color: '#14b8a6', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: '상속은 기존 클래스(부모)의 속성과 메서드를 새 클래스(자식)가 물려받는 것입니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '데코레이터의 기본 구조는?', choices: ['def decorator(func): def wrapper(): ... return wrapper', 'class Decorator:', '@only', 'lambda func:'], answer: 0, explanation: '데코레이터는 함수를 받아 래퍼 함수를 반환하는 함수입니다. @문법으로 적용.' },
{ q: '@functools.wraps의 역할은?', choices: ['함수 삭제', '래핑된 함수의 메타데이터(이름, 독스트링) 보존', '속도 향상', '에러 처리'], answer: 1, explanation: '@wraps(func)을 wrapper에 붙이면 원래 함수의 __name__, __doc__ 등이 유지됩니다.' },
{ q: '다음 코드의 출력은?\nimport time\ndef timer(func):\n    def wrapper(*a, **k):\n        s = time.time()\n        r = func(*a, **k)\n        print(f"{time.time()-s:.2f}s")\n        return r\n    return wrapper\n# timer는 실행시간 측정용', choices: ['실행시간 출력 데코레이터', '에러 처리 데코레이터', '로깅 데코레이터', '캐싱 데코레이터'], answer: 0, explanation: '함수 실행 전후의 시간 차이를 측정하여 실행시간을 출력하는 데코레이터입니다.' },
{ q: '매개변수를 받는 데코레이터를 만들려면?', choices: ['불가능', '3단 중첩 함수(데코레이터 팩토리)', '2단 함수', '클래스만'], answer: 1, explanation: 'def decorator(arg): def actual_decorator(func): def wrapper(): ... 3단 구조가 필요합니다.' },
{ q: '컨텍스트 매니저의 __enter__와 __exit__의 역할은?', choices: ['변수 생성/삭제', '진입 시 리소스 획득, 종료 시 리소스 해제', '에러 발생/처리', '반복 시작/종료'], answer: 1, explanation: '__enter__는 with 진입 시, __exit__는 블록 종료 시 실행됩니다. 파일 닫기 등.' },
{ q: 'with문의 as 키워드는 무엇을 받는가?', choices: ['파일 이름', '__enter__의 반환값', '예외 객체', '__exit__의 반환값'], answer: 1, explanation: 'with open() as f: 에서 f는 __enter__의 반환값입니다.' },
{ q: '다음 패턴의 이름은?\ndef singleton(cls):\n    instances = {}\n    def get_instance(*a, **k):\n        if cls not in instances:\n            instances[cls] = cls(*a, **k)\n        return instances[cls]\n    return get_instance', choices: ['팩토리', '싱글톤(데코레이터로 구현)', '옵저버', '전략'], answer: 1, explanation: '클래스의 인스턴스를 하나만 생성하도록 보장하는 싱글톤 패턴의 데코레이터 구현입니다.' },
{ q: 'descriptor 프로토콜의 메서드는?', choices: ['__init__, __del__', '__get__, __set__, __delete__', '__enter__, __exit__', '__iter__, __next__'], answer: 1, explanation: '디스크립터는 __get__, __set__, __delete__를 구현하여 속성 접근을 제어합니다.' },
{ q: 'metaclass란?', choices: ['일반 클래스', '클래스의 클래스(클래스 생성 방식을 제어)', '인스턴스', '모듈'], answer: 1, explanation: '메타클래스는 클래스를 생성하는 클래스입니다. type이 기본 메타클래스.' },
{ q: '__slots__의 역할은?', choices: ['메서드 정의', '인스턴스 속성을 제한하여 메모리 절약', '상속 제한', '가시성 설정'], answer: 1, explanation: '__slots__ = ["x", "y"]로 허용 속성을 제한하면 __dict__가 없어 메모리를 절약합니다.' },
{ q: 'weakref의 용도는?', choices: ['강한 참조', '가비지 컬렉션을 방해하지 않는 약한 참조', '파일 참조', '모듈 참조'], answer: 1, explanation: 'weakref는 참조 카운트를 증가시키지 않아 순환 참조를 방지합니다.' },
{ q: 'dataclasses.field()의 역할은?', choices: ['데이터 삭제', '데이터 클래스 필드의 세부 설정(기본값, factory 등)', '필드 정렬', '필드 검증'], answer: 1, explanation: 'field(default_factory=list)처럼 기본값 팩토리, repr 포함 여부 등을 상세 설정합니다.' },
{ q: 'Protocol(typing)의 역할은?', choices: ['네트워크 프로토콜', '구조적 서브타이핑(duck typing의 정적 버전)', '파일 프로토콜', '상속 프로토콜'], answer: 1, explanation: 'Protocol 클래스로 필요한 메서드를 정의하면 상속 없이도 타입 검사가 가능합니다.' },
{ q: 'enum.Enum의 용도는?', choices: ['숫자 열거', '명명된 상수 집합 정의', '리스트 생성', '딕셔너리 생성'], answer: 1, explanation: 'class Color(Enum): RED=1; GREEN=2 처럼 관련 상수를 그룹화합니다. 타입 안전.' },
{ q: '다음 코드의 출력은?\nfrom enum import Enum\nclass Status(Enum):\n    ACTIVE = 1\n    INACTIVE = 2\nprint(Status.ACTIVE.name, Status.ACTIVE.value)', choices: ['ACTIVE 1', '1 ACTIVE', 'Status.ACTIVE 1', 'Error'], answer: 0, explanation: '.name은 "ACTIVE", .value는 1을 반환합니다.' },
{ q: 'ABC(Abstract Base Class) 사용 시 @abstractmethod의 역할은?', choices: ['메서드 삭제', '자식 클래스에서 반드시 구현해야 하는 메서드 표시', '정적 메서드', '클래스 메서드'], answer: 1, explanation: '@abstractmethod로 표시된 메서드는 자식 클래스에서 반드시 오버라이딩해야 합니다.' },
{ q: '__call__ 메서드의 역할은?', choices: ['함수 호출', '객체를 함수처럼 호출 가능하게 함', '삭제', '문자열 변환'], answer: 1, explanation: '__call__을 정의하면 obj()처럼 객체를 함수처럼 호출할 수 있습니다.' },
{ q: '다음 코드의 출력은?\nclass Multiplier:\n    def __init__(self, n):\n        self.n = n\n    def __call__(self, x):\n        return self.n * x\ndouble = Multiplier(2)\nprint(double(5))', choices: ['10', '5', '2', 'Error'], answer: 0, explanation: '__call__로 double(5)를 호출하면 self.n * x = 2 * 5 = 10.' },
{ q: '__getattr__과 __getattribute__의 차이는?', choices: ['같은 기능', '__getattr__: 속성 없을 때만, __getattribute__: 모든 접근 시', '__getattr__이 먼저', '둘 다 불필요'], answer: 1, explanation: '__getattribute__는 모든 속성 접근 시 호출, __getattr__은 속성이 없을 때만 호출됩니다.' },
{ q: 'mixin 패턴이란?', choices: ['다중 상속의 일종', '특정 기능만 제공하는 작은 클래스를 조합', '단일 상속', '인터페이스'], answer: 1, explanation: 'Mixin은 특정 기능(로깅, 직렬화 등)을 제공하는 클래스로, 다중 상속으로 조합합니다.' },
{ q: 'namedtuple의 장점은?', choices: ['가변', '불변 + 이름으로 접근 가능 + 메모리 효율적', '순서 없음', '딕셔너리와 같음'], answer: 1, explanation: 'namedtuple은 튜플의 불변성과 이름 접근의 가독성을 모두 제공합니다.' },
{ q: 'typing.Generic의 용도는?', choices: ['일반 함수', '제네릭 타입 정의(타입 매개변수 지원)', '전역 변수', '상수 정의'], answer: 1, explanation: 'class Stack(Generic[T]):로 타입 매개변수를 사용하는 제네릭 클래스를 정의합니다.' },
{ q: '@property.setter의 역할은?', choices: ['읽기 전용', '속성에 값을 설정할 때 실행되는 메서드 정의', '삭제', '검증 불가'], answer: 1, explanation: '@속성.setter로 속성 대입 시 호출되는 메서드를 정의합니다. 값 검증에 사용.' },
{ q: '__new__와 __init__의 차이는?', choices: ['같은 기능', '__new__: 인스턴스 생성, __init__: 인스턴스 초기화', '__init__이 먼저', '__new__는 사용 안 함'], answer: 1, explanation: '__new__가 먼저 호출되어 인스턴스를 만들고, __init__이 그 인스턴스를 초기화합니다.' },
{ q: 'functools.cached_property의 역할은?', choices: ['함수 캐싱', '인스턴스 속성을 한 번만 계산하고 캐싱', '클래스 캐싱', '모듈 캐싱'], answer: 1, explanation: '@cached_property는 처음 접근 시 계산하고 결과를 캐싱합니다. 비용이 큰 계산에 유용.' },
{ q: 'operator 모듈의 용도는?', choices: ['연산자 삭제', '연산자를 함수로 제공(add, mul 등)', '모듈 관리', '파일 연산'], answer: 1, explanation: 'operator.add(a,b)는 a+b와 같습니다. sorted(key=operator.itemgetter(1))처럼 사용.' },
{ q: 'ABC와 Protocol의 차이는?', choices: ['같은 기능', 'ABC: 명목적 타이핑(상속 필수), Protocol: 구조적 타이핑(상속 불필요)', 'Protocol이 느림', 'ABC가 더 유연'], answer: 1, explanation: 'ABC는 반드시 상속해야 하지만, Protocol은 메서드만 구현하면 상속 없이도 호환됩니다.' },
{ q: 'functools.partial의 역할은?', choices: ['함수 삭제', '함수의 일부 인자를 고정한 새 함수 생성', '함수 분할', '함수 합성'], answer: 1, explanation: 'partial(f, x=10)은 x=10으로 고정된 새 함수를 만듭니다. 커링과 유사.' },
{ q: 'type() 함수의 두 가지 용도는?', choices: ['타입 확인만', '타입 확인 + 동적 클래스 생성', '타입 변환만', '타입 삭제'], answer: 1, explanation: 'type(obj)는 타입 확인, type("Name", (Base,), attr_dict)는 클래스를 동적으로 생성합니다.' },
{ q: 'contextlib.suppress()의 역할은?', choices: ['에러 발생', '지정 예외를 무시하는 컨텍스트 매니저', '파일 닫기', '출력 억제'], answer: 1, explanation: 'with suppress(FileNotFoundError): 로 특정 예외를 간결하게 무시합니다.' }
]

            },

        ], related: ['u36', 'u38'],

    },

    {

        id: 'u38', category: 'oop', name: 'Unit 38. 객체지향 실습', hanja: 'OOP Practice',

        short: '학생 관리, 은행 계좌, 도형 클래스 실습', color: '#14b8a6', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: '학생 관리 시스템, 은행 계좌, 도형 클래스 등을 만들며 객체지향 프로그래밍을 실습합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '탐색 알고리즘의 목적은?', choices: ['정렬', '데이터에서 특정 값을 찾기', '삭제', '삽입'], answer: 1, explanation: '탐색 알고리즘은 데이터 집합에서 원하는 값을 효율적으로 찾는 것이 목적입니다.' },
{ q: '선형 탐색(Linear Search)의 시간복잡도는?', choices: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'], answer: 2, explanation: '선형 탐색은 처음부터 끝까지 하나씩 비교합니다. 최악의 경우 n번 비교: O(n).' },
{ q: '다음 코드의 역할은?\ndef linear_search(lst, target):\n    for i, v in enumerate(lst):\n        if v == target:\n            return i\n    return -1', choices: ['정렬', '선형 탐색(값의 인덱스 반환)', '이진 탐색', '삭제'], answer: 1, explanation: '리스트를 처음부터 순회하며 target과 일치하는 요소의 인덱스를 반환합니다.' },
{ q: '이진 탐색(Binary Search)의 전제 조건은?', choices: ['조건 없음', '데이터가 정렬되어 있어야 함', '데이터가 짝수여야 함', '리스트만 가능'], answer: 1, explanation: '이진 탐색은 정렬된 데이터에서만 사용 가능합니다. 중간값과 비교하여 범위를 절반씩 줄입니다.' },
{ q: '이진 탐색의 시간복잡도는?', choices: ['O(n)', 'O(log n)', 'O(n^2)', 'O(1)'], answer: 1, explanation: '매번 탐색 범위가 절반으로 줄어들어 O(log n)입니다. n=1000이면 약 10번 비교.' },
{ q: '다음 이진 탐색 코드에서 빈칸에 들어갈 것은?\ndef binary_search(lst, target):\n    lo, hi = 0, len(lst)-1\n    while lo <= hi:\n        mid = (lo + hi) // 2\n        if lst[mid] == target: return mid\n        elif lst[mid] < target: lo = ___\n        else: hi = ___', choices: ['mid, mid', 'mid+1, mid-1', 'mid-1, mid+1', 'lo+1, hi-1'], answer: 1, explanation: 'target이 더 크면 왼쪽 절반 제거(lo=mid+1), 더 작으면 오른쪽 절반 제거(hi=mid-1).' },
{ q: '정렬 알고리즘의 목적은?', choices: ['검색', '데이터를 순서대로 배열', '삭제', '삽입'], answer: 1, explanation: '정렬 알고리즘은 데이터를 오름차순 또는 내림차순으로 배열합니다.' },
{ q: '버블 정렬(Bubble Sort)의 원리는?', choices: ['분할 정복', '인접 요소를 비교하여 교환, 큰 값이 뒤로 이동', '최소값을 선택', '삽입 위치 찾기'], answer: 1, explanation: '인접한 두 요소를 비교하여 순서가 잘못되면 교환합니다. 가장 큰 값이 거품처럼 뒤로.' },
{ q: '버블 정렬의 시간복잡도는?', choices: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], answer: 2, explanation: '이중 반복문으로 최악/평균 O(n^2)입니다. 가장 간단하지만 느린 정렬.' },
{ q: '선택 정렬(Selection Sort)의 원리는?', choices: ['인접 교환', '최소값(또는 최대값)을 찾아 맨 앞으로 이동', '분할 정복', '삽입'], answer: 1, explanation: '정렬되지 않은 부분에서 최소값을 찾아 맨 앞과 교환합니다. n-1번 반복.' },
{ q: '삽입 정렬(Insertion Sort)의 원리는?', choices: ['분할 정복', '각 요소를 이미 정렬된 부분의 적절한 위치에 삽입', '인접 교환', '최대값 선택'], answer: 1, explanation: '카드를 정리하듯 각 요소를 정렬된 부분의 올바른 위치에 삽입합니다.' },
{ q: '삽입 정렬이 유리한 경우는?', choices: ['대용량 랜덤 데이터', '거의 정렬된(nearly sorted) 데이터', '역순 데이터', '모든 경우'], answer: 1, explanation: '거의 정렬된 데이터에서는 이동이 적어 O(n)에 가깝게 동작합니다.' },
{ q: '퀵 정렬(Quick Sort)의 원리는?', choices: ['인접 교환', '피벗을 기준으로 분할하여 재귀 정렬', '최소값 선택', '병합'], answer: 1, explanation: '피벗(기준값)을 선택하고, 작은 값은 왼쪽, 큰 값은 오른쪽으로 분할하여 재귀 정렬.' },
{ q: '퀵 정렬의 평균 시간복잡도는?', choices: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'], answer: 1, explanation: '평균 O(n log n)이지만 최악(이미 정렬된 데이터)은 O(n^2)입니다.' },
{ q: '병합 정렬(Merge Sort)의 특징은?', choices: ['제자리 정렬', '항상 O(n log n), 안정 정렬, 추가 메모리 필요', 'O(n^2)', '불안정 정렬'], answer: 1, explanation: '병합 정렬은 분할-정복으로 항상 O(n log n)이고 안정 정렬이지만 O(n) 추가 메모리 필요.' },
{ q: '안정 정렬(Stable Sort)이란?', choices: ['빠른 정렬', '같은 값의 원래 순서가 유지되는 정렬', '메모리 적은 정렬', '모든 정렬'], answer: 1, explanation: '같은 키값을 가진 요소의 상대적 순서가 정렬 후에도 유지됩니다. 병합, 삽입이 안정.' },
{ q: '시간복잡도 비교: O(n) vs O(n log n) vs O(n^2), n=1000일 때?', choices: ['차이 없음', '1000 vs ~10000 vs 1000000', '모두 1000', '1000 vs 1000 vs 1000'], answer: 1, explanation: 'O(n)=1000, O(n log n)=약 10000, O(n^2)=1000000. 데이터 크기가 클수록 차이가 극대화.' },
{ q: 'Python 내장 sorted()의 알고리즘은?', choices: ['퀵 정렬', '팀소트(Timsort): 병합+삽입 하이브리드', '버블 정렬', '힙 정렬'], answer: 1, explanation: 'Timsort는 병합 정렬과 삽입 정렬을 결합한 하이브리드로, 실전에서 매우 효율적입니다.' },
{ q: '계수 정렬(Counting Sort)의 특징은?', choices: ['비교 기반', '비교 없이 O(n+k) 시간, 정수 범위가 작을 때 유리', '항상 O(n^2)', '문자열 전용'], answer: 1, explanation: '값의 범위(k)가 작을 때 O(n+k)로 매우 빠릅니다. 비교 없이 개수를 세어 정렬.' },
{ q: '재귀(recursion)와 분할 정복(divide & conquer)의 관계는?', choices: ['무관', '분할 정복은 재귀를 사용하여 문제를 작은 단위로 분할', '같은 개념', '반복문만 사용'], answer: 1, explanation: '분할 정복은 문제를 분할->정복->결합하는 패턴으로, 주로 재귀로 구현합니다.' },
{ q: '해시 테이블의 탐색 시간복잡도는?', choices: ['O(n)', 'O(log n)', 'O(1) 평균', 'O(n^2)'], answer: 2, explanation: '해시 함수로 인덱스를 직접 계산하므로 평균 O(1)입니다. 딕셔너리가 해시 테이블.' },
{ q: 'DFS(깊이 우선 탐색)의 자료구조는?', choices: ['큐', '스택(또는 재귀)', '해시 테이블', '배열'], answer: 1, explanation: 'DFS는 스택이나 재귀를 사용하여 한 경로를 끝까지 탐색한 후 되돌아갑니다.' },
{ q: 'BFS(너비 우선 탐색)의 자료구조는?', choices: ['스택', '큐', '해시 테이블', '트리'], answer: 1, explanation: 'BFS는 큐를 사용하여 같은 깊이(레벨)의 노드를 먼저 탐색합니다.' },
{ q: '동적 프로그래밍(DP)의 핵심은?', choices: ['무작위 탐색', '중복 하위 문제의 결과를 저장하여 재계산 방지', '분할만', '항상 재귀'], answer: 1, explanation: 'DP는 메모이제이션이나 타뷸레이션으로 중복 계산을 피합니다. 피보나치가 대표적.' },
{ q: '그리디(Greedy) 알고리즘의 특징은?', choices: ['모든 경우 탐색', '매 단계에서 최선의 선택(지역 최적)', '항상 최적해 보장', '재귀 필수'], answer: 1, explanation: '그리디는 각 단계에서 가장 좋은 선택을 합니다. 항상 최적해를 보장하지는 않습니다.' },
{ q: '빅오 표기법에서 O(1)의 의미는?', choices: ['1초', '입력 크기와 무관하게 일정한 시간', '1번 반복', '가장 느림'], answer: 1, explanation: 'O(1)은 상수 시간으로, 입력 크기가 얼마든 실행 시간이 동일합니다.' },
{ q: '공간복잡도(Space Complexity)란?', choices: ['실행 시간', '알고리즘이 사용하는 메모리 양', '코드 줄 수', '파일 크기'], answer: 1, explanation: '공간복잡도는 알고리즘이 입력 크기에 따라 필요로 하는 추가 메모리를 측정합니다.' },
{ q: '파이썬에서 bisect 모듈의 역할은?', choices: ['이진 탐색 + 정렬된 리스트에 삽입', '버블 정렬', '해시 검색', '문자열 검색'], answer: 0, explanation: 'bisect.bisect()로 삽입 위치를 찾고, bisect.insort()로 정렬 유지하며 삽입합니다.' },
{ q: '다음 알고리즘의 시간복잡도는?\ndef f(n):\n    for i in range(n):\n        for j in range(n):\n            print(i, j)', choices: ['O(n)', 'O(n^2)', 'O(n log n)', 'O(2^n)'], answer: 1, explanation: '이중 for문이 각각 n번 반복하므로 n*n = O(n^2)입니다.' },
{ q: '최선/최악/평균 시간복잡도의 의미는?', choices: ['같은 것', '입력에 따른 최고/최저/기대 성능', '속도 순위', '메모리 순위'], answer: 1, explanation: '최선: 가장 유리한 입력, 최악: 가장 불리한 입력, 평균: 모든 입력의 기대값.' }
]

            },

        ], related: ['u37', 'u39'],

    },





    // ──────── ADVANCED (Unit 39~44) ────────

    {

        id: 'u39', category: 'advanced', name: 'Unit 39. 알고리즘 기초', hanja: 'Algorithm Basics',

        short: '시간복잡도, 공간복잡도, Big-O 표기법', color: '#f59e0b', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: '알고리즘의 효율성을 측정하는 시간 복잡도(Big-O)와 공간 복잡도를 학습합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '스택(Stack)의 동작 원리는?', choices: ['FIFO', 'LIFO(후입선출)', '랜덤', '우선순위'], answer: 1, explanation: '스택은 Last In First Out. 마지막에 넣은 요소가 먼저 나옵니다. 접시 쌓기.' },
{ q: '큐(Queue)의 동작 원리는?', choices: ['LIFO', 'FIFO(선입선출)', '랜덤', '우선순위'], answer: 1, explanation: '큐는 First In First Out. 먼저 넣은 요소가 먼저 나옵니다. 줄 서기.' },
{ q: '리스트로 스택을 구현할 때 사용하는 메서드는?', choices: ['append + pop(0)', 'append + pop', 'insert + remove', 'extend + del'], answer: 1, explanation: 'append()로 끝에 추가, pop()으로 끝에서 제거하면 LIFO 스택입니다.' },
{ q: 'collections.deque로 큐를 구현할 때?', choices: ['append + pop', 'append + popleft', 'appendleft + pop', 'insert + remove'], answer: 1, explanation: 'append()로 오른쪽에 추가, popleft()로 왼쪽에서 제거하면 FIFO 큐입니다.' },
{ q: '연결 리스트(Linked List)의 특징은?', choices: ['인덱스 접근 O(1)', '노드가 값과 다음 노드 참조를 가짐, 삽입/삭제 O(1)', '정렬 필수', '크기 고정'], answer: 1, explanation: '연결 리스트는 각 노드가 데이터와 다음 노드 포인터를 가집니다. 중간 삽입/삭제가 O(1).' },
{ q: '이진 트리(Binary Tree)에서 각 노드의 최대 자식 수는?', choices: ['1', '2', '3', '무제한'], answer: 1, explanation: '이진 트리의 각 노드는 최대 2개의 자식(왼쪽, 오른쪽)을 가집니다.' },
{ q: '이진 탐색 트리(BST)의 규칙은?', choices: ['정렬 안 됨', '왼쪽 < 부모 < 오른쪽', '오른쪽 < 부모 < 왼쪽', '모든 값 같음'], answer: 1, explanation: 'BST: 왼쪽 자식 < 부모 < 오른쪽 자식. 이 규칙으로 O(log n) 탐색이 가능합니다.' },
{ q: '힙(Heap)의 특징은?', choices: ['정렬된 배열', '완전 이진 트리, 부모가 자식보다 크거나(최대힙) 작거나(최소힙)', '연결 리스트', '해시 테이블'], answer: 1, explanation: '힙은 부모-자식 관계만 보장합니다. heapq 모듈로 최소힙을 구현합니다.' },
{ q: 'heapq 모듈의 기본은?', choices: ['최대힙', '최소힙(가장 작은 값이 루트)', '정렬', '스택'], answer: 1, explanation: 'Python의 heapq는 최소힙입니다. heappush, heappop으로 사용합니다.' },
{ q: '다음 코드의 출력은?\nimport heapq\nh = []\nheapq.heappush(h, 3)\nheapq.heappush(h, 1)\nheapq.heappush(h, 2)\nprint(heapq.heappop(h))', choices: ['3', '1', '2', 'Error'], answer: 1, explanation: '최소힙이므로 가장 작은 값 1이 먼저 pop됩니다.' },
{ q: '그래프(Graph)를 표현하는 방법은?', choices: ['인접 행렬, 인접 리스트', '배열만', '트리만', '스택만'], answer: 0, explanation: '인접 행렬(2D 배열)과 인접 리스트(딕셔너리/리스트)로 그래프를 표현합니다.' },
{ q: '인접 리스트로 그래프 표현의 예시는?', choices: ['graph = {A: [B, C], B: [A, D]}', 'graph = [[0,1],[1,0]]', '[A, B, C, D]', '{A: 1, B: 2}'], answer: 0, explanation: '딕셔너리로 각 노드의 이웃 노드 리스트를 저장합니다.' },
{ q: 'DFS를 재귀로 구현하는 핵심은?', choices: ['큐 사용', '방문 체크 + 인접 노드 재귀 호출', '정렬', '해시'], answer: 1, explanation: 'visited 집합으로 방문 체크 후, 미방문 인접 노드에 대해 재귀 호출합니다.' },
{ q: 'BFS 코드의 핵심 구조는?', choices: ['재귀', '큐 + while문 + 방문 체크', '스택 + while문', '정렬'], answer: 1, explanation: 'deque를 큐로 사용하고, while 루프에서 popleft로 노드를 꺼내 인접 노드를 탐색합니다.' },
{ q: '우선순위 큐(Priority Queue)란?', choices: ['일반 큐', '우선순위가 높은 요소가 먼저 나오는 큐', 'LIFO 큐', '랜덤 큐'], answer: 1, explanation: '우선순위 큐는 삽입 순서와 관계없이 우선순위가 높은(값이 작은) 요소가 먼저 나옵니다.' },
{ q: '해시 테이블의 충돌(collision) 해결 방법은?', choices: ['무시', '체이닝(연결 리스트), 개방 주소법', '삭제', '정렬'], answer: 1, explanation: '같은 해시값이 나오면 체이닝(같은 버킷에 리스트로 연결)이나 개방 주소법으로 해결합니다.' },
{ q: '트리 순회 방법 3가지는?', choices: ['전위, 중위, 후위', '상위, 하위, 중위', '좌측, 우측, 중앙', 'DFS, BFS, 랜덤'], answer: 0, explanation: '전위(부모-왼-오), 중위(왼-부모-오), 후위(왼-오-부모). 방문 순서만 다릅니다.' },
{ q: 'deque의 시간복잡도 장점은?', choices: ['인덱스 접근 O(1)', '양끝 삽입/삭제 O(1)', '중간 삽입 O(1)', '정렬 O(n log n)'], answer: 1, explanation: 'deque는 양쪽 끝에서 O(1)으로 삽입/삭제합니다. 리스트의 pop(0)은 O(n).' },
{ q: 'defaultdict(list)의 활용 예시는?', choices: ['정렬', '그래프 인접 리스트 구현', '해시 테이블', '스택'], answer: 1, explanation: 'graph = defaultdict(list); graph["A"].append("B")로 간편하게 인접 리스트를 구성합니다.' },
{ q: 'OrderedDict의 특징은?', choices: ['정렬된 딕셔너리', '삽입 순서를 기억하고 == 비교 시 순서도 고려', '일반 dict와 동일', '성능 더 좋음'], answer: 1, explanation: '3.7+ dict도 순서 보장하지만, OrderedDict는 == 비교 시 순서까지 비교합니다.' },
{ q: 'Counter의 elements() 메서드는?', choices: ['요소 삭제', '각 요소를 카운트만큼 반복하는 이터레이터', '요소 정렬', '요소 추가'], answer: 1, explanation: 'Counter({"a":2, "b":3}).elements()는 a, a, b, b, b를 반환하는 이터레이터입니다.' },
{ q: 'ChainMap의 장점은?', choices: ['딕셔너리 삭제', '여러 딕셔너리를 합치지 않고 하나처럼 탐색', '정렬', '필터링'], answer: 1, explanation: 'ChainMap(d1, d2)은 d1에서 먼저 검색하고 없으면 d2에서 찾습니다. 설정 레이어링에 유용.' },
{ q: '다음 코드의 출력은?\nfrom collections import deque\nd = deque([1,2,3], maxlen=3)\nd.append(4)\nprint(list(d))', choices: ['[2, 3, 4]', '[1, 2, 3, 4]', '[1, 2, 3]', 'Error'], answer: 0, explanation: 'maxlen=3이므로 4를 추가하면 가장 오래된 1이 제거됩니다. [2, 3, 4].' },
{ q: '다음 코드의 출력은?\nfrom collections import Counter\na = Counter("aaabbc")\nb = Counter("abbcc")\nprint(a - b)', choices: ['Counter({"a": 2})', 'Counter({"a": 3, "b": 2, "c": 1})', 'Counter()', 'Error'], answer: 0, explanation: 'Counter 뺄셈: a:3-1=2, b:2-1=1->0이상만, c:1-2=음수->제거. Counter({"a":2}).' },
{ q: 'bisect.insort()의 역할은?', choices: ['이진 탐색만', '정렬된 리스트에 값을 정렬 유지하며 삽입', '리스트 정렬', '값 삭제'], answer: 1, explanation: 'insort(lst, val)은 정렬 순서를 유지하면서 val을 적절한 위치에 삽입합니다.' },
{ q: '트라이(Trie) 자료구조의 용도는?', choices: ['숫자 정렬', '문자열 검색/자동완성에 특화', '그래프 탐색', '수학 계산'], answer: 1, explanation: '트라이는 문자열의 접두사를 효율적으로 검색하는 트리 구조입니다. 자동완성, 사전에 활용.' },
{ q: '유니온-파인드(Union-Find)의 용도는?', choices: ['정렬', '서로소 집합의 합집합과 원소 소속 검사', '탐색', '해시'], answer: 1, explanation: 'Union-Find는 그룹 합치기(union)와 같은 그룹인지 확인(find)을 효율적으로 수행합니다.' },
{ q: 'LRU Cache의 원리는?', choices: ['가장 최근 사용 제거', '가장 오래 사용하지 않은 항목을 제거', '랜덤 제거', '모두 제거'], answer: 1, explanation: 'LRU(Least Recently Used)는 가장 오래 사용하지 않은 항목부터 제거하는 캐시 전략입니다.' },
{ q: 'Python의 list는 내부적으로 어떤 구조인가?', choices: ['연결 리스트', '동적 배열(Dynamic Array)', '해시 테이블', '트리'], answer: 1, explanation: 'Python의 list는 동적 배열로, 인덱스 접근 O(1), 끝 삽입 O(1) 분할상환, 중간 삽입 O(n)입니다.' },
{ q: 'frozenset의 특징은?', choices: ['가변 세트', '불변(immutable) 세트, 딕셔너리 키로 사용 가능', '정렬된 세트', '리스트와 같음'], answer: 1, explanation: 'frozenset은 변경할 수 없는 세트입니다. 해시 가능하므로 딕셔너리 키나 세트 원소로 사용.' }
]

            },

        ], related: ['u38', 'u40'],

    },

    {

        id: 'u40', category: 'advanced', name: 'Unit 40. 재귀와 동적 프로그래밍', hanja: 'Recursion & DP',

        short: '재귀, 메모이제이션, 타뷸레이션', color: '#f59e0b', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: '재귀적 문제 해결과 동적 프로그래밍(메모이제이션, 타뷸레이션)으로 효율적으로 문제를 풀어봅니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '재귀(Recursion)의 두 가지 필수 요소는?', choices: ['반복문과 조건문', '기저 조건(Base Case)과 재귀 호출', 'try와 except', 'for와 while'], answer: 1, explanation: '기저 조건은 재귀를 멈추는 조건, 재귀 호출은 자기 자신을 호출하는 부분입니다.' },
{ q: '다음 코드의 출력은?\ndef countdown(n):\n    if n <= 0: print("발사!")\n    else:\n        print(n)\n        countdown(n-1)\ncountdown(3)', choices: ['3 2 1 발사!', '발사! 1 2 3', '3 2 1', 'Error'], answer: 0, explanation: '3, 2, 1을 출력하고 n=0에서 "발사!"를 출력합니다. 재귀적 카운트다운.' },
{ q: '꼬리 재귀(Tail Recursion)란?', choices: ['재귀 없음', '재귀 호출이 함수의 마지막 연산인 재귀', '반복문으로 변환 불가', '기저 조건 없는 재귀'], answer: 1, explanation: '꼬리 재귀는 반환값이 재귀 호출 자체인 경우입니다. 일부 언어에서 최적화 가능.' },
{ q: '다음 코드의 출력은?\ndef sum_n(n):\n    if n == 0: return 0\n    return n + sum_n(n-1)\nprint(sum_n(10))', choices: ['55', '10', '45', 'Error'], answer: 0, explanation: '10+9+8+...+1+0 = 55. 1부터 10까지의 합을 재귀로 구합니다.' },
{ q: '다음 코드의 출력은?\ndef power(base, exp):\n    if exp == 0: return 1\n    return base * power(base, exp-1)\nprint(power(2, 10))', choices: ['1024', '20', '100', 'Error'], answer: 0, explanation: '2^10 = 1024. 재귀적으로 base를 exp번 곱합니다.' },
{ q: '하노이 탑 문제의 최소 이동 횟수(n개 원반)는?', choices: ['n', '2^n - 1', 'n^2', 'n!'], answer: 1, explanation: '3개: 7번, 4개: 15번. 공식: 2^n - 1. 재귀적 분할 정복으로 해결.' },
{ q: '동적 프로그래밍(DP)이 재귀보다 효율적인 이유는?', choices: ['코드가 짧아서', '중복 계산을 저장하여 재계산 방지', '항상 빠른 것은 아님', '메모리를 더 쓰기 때문'], answer: 1, explanation: 'DP는 메모이제이션으로 이미 계산한 결과를 저장하여 중복 계산을 O(1)로 줄입니다.' },
{ q: '메모이제이션(Memoization)이란?', choices: ['암기법', '함수 결과를 캐싱하여 같은 입력에 대해 재계산 방지', '메모리 삭제', '정렬 기법'], answer: 1, explanation: '이전 계산 결과를 딕셔너리 등에 저장하여 동일 입력 시 즉시 반환합니다.' },
{ q: '다음 코드의 시간복잡도 차이는?\n# 순수 재귀 피보나치: O(2^n)\n# DP 피보나치: O(n)', choices: ['차이 없음', 'n=40일 때 약 10억 vs 40으로 극적 차이', 'DP가 더 느림', '둘 다 O(n)'], answer: 1, explanation: '순수 재귀는 지수적, DP는 선형. n=40이면 약 10억회 vs 40회로 엄청난 차이.' },
{ q: '@lru_cache로 메모이제이션하는 방법은?', choices: ['import 불필요', 'from functools import lru_cache 후 @lru_cache 데코레이터 적용', '직접 딕셔너리만', '불가능'], answer: 1, explanation: '@lru_cache(maxsize=None)을 함수 위에 붙이면 자동으로 결과를 캐싱합니다.' },
{ q: '탑다운(Top-Down) vs 바텀업(Bottom-Up) DP의 차이는?', choices: ['같은 것', '탑다운: 재귀+메모이제이션, 바텀업: 반복문+테이블', '탑다운이 항상 빠름', '바텀업만 DP'], answer: 1, explanation: '탑다운은 큰 문제에서 시작하여 재귀, 바텀업은 작은 문제부터 반복문으로 해결합니다.' },
{ q: '다음 바텀업 DP 코드의 출력은?\ndef fib(n):\n    dp = [0, 1]\n    for i in range(2, n+1):\n        dp.append(dp[i-1] + dp[i-2])\n    return dp[n]\nprint(fib(10))', choices: ['55', '89', '34', 'Error'], answer: 0, explanation: 'fib(10)=55. 0,1,1,2,3,5,8,13,21,34,55. 바텀업으로 테이블을 채웁니다.' },
{ q: 'DP의 두 가지 핵심 조건은?', choices: ['정렬과 탐색', '최적 부분 구조 + 중복 하위 문제', '분할과 정복', '탐욕과 백트래킹'], answer: 1, explanation: '최적 부분 구조: 큰 문제의 최적해가 작은 문제의 최적해로 구성. 중복 하위 문제: 같은 하위 문제 반복.' },
{ q: '배낭 문제(Knapsack)에서 DP를 사용하는 이유는?', choices: ['정렬 필요', '모든 조합을 확인하면 지수 시간이므로 DP로 다항 시간에 해결', '그리디로 충분', '탐색 불필요'], answer: 1, explanation: 'n개 물건의 모든 조합은 2^n개. DP로 O(n*W)에 최적해를 구합니다.' },
{ q: '최장 공통 부분수열(LCS)의 DP 접근은?', choices: ['정렬', '2D 테이블로 두 문자열의 공통 부분수열 길이 계산', '해시', '스택'], answer: 1, explanation: 'dp[i][j]는 str1[:i]와 str2[:j]의 LCS 길이. 같으면 dp[i-1][j-1]+1, 다르면 max.' },
{ q: '피보나치의 공간 최적화 방법은?', choices: ['배열 전체 저장', '직전 두 값만 저장하면 O(1) 공간', '해시 사용', '불가능'], answer: 1, explanation: 'a, b = b, a+b로 직전 두 값만 유지하면 O(n) 공간에서 O(1)로 최적화됩니다.' },
{ q: '계단 오르기 문제(1칸 또는 2칸)의 점화식은?', choices: ['dp[n] = dp[n-1]', 'dp[n] = dp[n-1] + dp[n-2]', 'dp[n] = dp[n-1] * 2', 'dp[n] = n'], answer: 1, explanation: 'n번째 계단: n-1에서 1칸 + n-2에서 2칸. 피보나치와 같은 구조입니다.' },
{ q: '동전 교환 문제의 DP 접근은?', choices: ['그리디', 'dp[금액] = min(dp[금액-동전]+1) for 각 동전', '완전 탐색만', '정렬'], answer: 1, explanation: '각 금액에 대해 모든 동전을 시도하고, 최소 동전 수를 dp 테이블에 저장합니다.' },
{ q: '백트래킹(Backtracking)이란?', choices: ['DP의 일종', '해를 찾다가 막히면 되돌아가서 다른 경로 탐색', '정렬', '반복문'], answer: 1, explanation: '백트래킹은 가능한 모든 경로를 탐색하되, 유효하지 않은 경로는 즉시 포기(가지치기)합니다.' },
{ q: 'N-Queens 문제의 해법은?', choices: ['그리디', '백트래킹으로 퀸 배치 후 충돌 시 되돌리기', 'DP', '정렬'], answer: 1, explanation: 'N개의 퀸을 서로 공격하지 않게 배치. 행마다 퀸을 놓고 충돌하면 백트래킹.' },
{ q: '분할 정복(Divide & Conquer)과 DP의 차이는?', choices: ['같은 것', '분할 정복: 독립 하위 문제, DP: 중복 하위 문제', 'DP가 항상 빠름', '분할 정복은 재귀 안 씀'], answer: 1, explanation: '분할 정복은 하위 문제가 겹치지 않고(병합 정렬), DP는 하위 문제가 겹칩니다(피보나치).' },
{ q: '다음 코드의 출력은?\ndef gcd(a, b):\n    if b == 0: return a\n    return gcd(b, a % b)\nprint(gcd(48, 18))', choices: ['6', '18', '48', 'Error'], answer: 0, explanation: 'gcd(48,18)->gcd(18,12)->gcd(12,6)->gcd(6,0)->6. 유클리드 호제법.' },
{ q: '이진 탐색을 재귀로 구현하는 핵심은?', choices: ['반복문', 'mid 기준 왼쪽/오른쪽 절반에 대해 재귀 호출', '정렬', '스택'], answer: 1, explanation: 'target < lst[mid]면 왼쪽 절반, target > lst[mid]면 오른쪽 절반에 대해 재귀합니다.' },
{ q: '부분집합 생성을 재귀로 구현하는 원리는?', choices: ['정렬', '각 요소를 포함/불포함하여 2가지로 분기', '해시', '큐'], answer: 1, explanation: 'n개 요소 각각을 포함하거나 불포함하여 2^n개의 부분집합을 생성합니다.' },
{ q: '순열(Permutation)의 재귀적 생성 원리는?', choices: ['정렬', '각 위치에 아직 사용하지 않은 원소를 배치하고 재귀', '해시', 'DP'], answer: 1, explanation: '첫 위치에 n개 선택, 두 번째에 n-1개... 재귀적으로 모든 순열을 생성합니다.' },
{ q: '조합(Combination)과 순열의 차이는?', choices: ['같은 것', '순열: 순서 O, 조합: 순서 X', '조합이 더 많음', '순열은 재귀 불가'], answer: 1, explanation: '순열(nPr): 순서 구분, 조합(nCr): 순서 무관. nCr = nPr / r!.' },
{ q: '다음 코드의 출력은?\ndef flatten(lst):\n    result = []\n    for item in lst:\n        if isinstance(item, list):\n            result.extend(flatten(item))\n        else:\n            result.append(item)\n    return result\nprint(flatten([1,[2,[3]],4]))', choices: ['[1, 2, 3, 4]', '[[1],[2,[3]],4]', 'Error', '[1, [2, [3]], 4]'], answer: 0, explanation: '재귀적으로 중첩 리스트를 풀어 1차원 리스트로 만듭니다.' },
{ q: '재귀의 공간복잡도가 O(n)인 이유는?', choices: ['변수 때문', '재귀 호출마다 스택 프레임이 쌓이므로', '리스트 때문', '항상 O(1)'], answer: 1, explanation: 'n번 재귀하면 n개의 스택 프레임이 메모리에 쌓입니다. 깊은 재귀 시 주의.' },
{ q: '재귀를 반복문으로 변환하는 일반적 방법은?', choices: ['불가능', '스택 자료구조를 사용하여 상태 직접 관리', '큐 사용', '자동 변환'], answer: 1, explanation: '명시적 스택에 상태를 push/pop하여 재귀 호출을 시뮬레이션할 수 있습니다.' },
{ q: 'sys.setrecursionlimit()의 역할은?', choices: ['속도 제한', 'Python 재귀 깊이 제한을 변경', '메모리 제한', '스레드 제한'], answer: 1, explanation: 'Python 기본 재귀 한도는 1000입니다. setrecursionlimit(n)으로 변경 가능하지만 주의.' }
]

            },

        ], related: ['u39', 'u41'],

    },

    {

        id: 'u41', category: 'advanced', name: 'Unit 41. 라이브러리 활용', hanja: 'Standard Library',

        short: 'math, random, datetime, os, sys', color: '#f59e0b', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: 'Python 표준 라이브러리의 주요 모듈들 (math, random, datetime, os, sys)을 활용합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: 'NumPy란?', choices: ['게임 라이브러리', '수치 연산을 위한 고성능 배열 라이브러리', 'GUI 프레임워크', '웹 프레임워크'], answer: 1, explanation: 'NumPy는 다차원 배열(ndarray)과 수학 함수를 제공하는 과학 계산 라이브러리입니다.' },
{ q: 'NumPy 배열과 Python 리스트의 차이는?', choices: ['같은 것', 'NumPy: 같은 타입, 벡터 연산 가능, 빠름', 'Python 리스트가 더 빠름', '차이 없음'], answer: 1, explanation: 'NumPy 배열은 같은 타입만 저장하여 C 수준 속도로 벡터 연산이 가능합니다.' },
{ q: 'numpy 배열 생성 방법은?', choices: ['np.array([1,2,3])', 'numpy.list()', 'np.create()', 'array.numpy()'], answer: 0, explanation: 'import numpy as np; np.array([1,2,3])으로 리스트에서 배열을 생성합니다.' },
{ q: 'np.zeros((3,3))의 결과는?', choices: ['3x3 영행렬', '1x3 배열', '3x1 배열', 'Error'], answer: 0, explanation: '3x3 크기의 모든 요소가 0인 배열을 생성합니다.' },
{ q: 'pandas란?', choices: ['동물', '데이터 분석/조작을 위한 라이브러리', '그래프 도구', '웹 크롤러'], answer: 1, explanation: 'pandas는 DataFrame과 Series로 표 형태 데이터를 쉽게 처리하는 라이브러리입니다.' },
{ q: 'DataFrame이란?', choices: ['1차원 배열', '행과 열로 구성된 2차원 표 형태 자료구조', '딕셔너리', '리스트'], answer: 1, explanation: 'DataFrame은 엑셀 시트처럼 행과 열이 있는 표입니다. 각 열은 Series.' },
{ q: 'CSV 파일을 pandas로 읽는 방법은?', choices: ['pd.read_csv("file.csv")', 'pd.open("file.csv")', 'pd.load("file.csv")', 'pd.import("file.csv")'], answer: 0, explanation: 'pd.read_csv()로 CSV 파일을 DataFrame으로 읽습니다.' },
{ q: 'df.head()의 역할은?', choices: ['첫 번째 열', '처음 5행 미리보기', '마지막 행', '전체 출력'], answer: 1, explanation: 'df.head(n)은 처음 n행을 반환합니다. 기본값은 5행.' },
{ q: 'df.describe()의 역할은?', choices: ['데이터 타입', '수치 열의 통계 요약(평균, 표준편차, 최소, 최대 등)', '열 목록', '행 수'], answer: 1, explanation: 'describe()는 count, mean, std, min, 25%, 50%, 75%, max를 한눈에 보여줍니다.' },
{ q: 'matplotlib의 역할은?', choices: ['데이터 분석', '그래프/차트를 그리는 시각화 라이브러리', '웹 개발', '파일 처리'], answer: 1, explanation: 'matplotlib.pyplot으로 선 그래프, 막대 그래프, 산점도 등 다양한 차트를 생성합니다.' },
{ q: 'plt.plot()의 기본 기능은?', choices: ['막대 그래프', '선 그래프 그리기', '원형 차트', '히스토그램'], answer: 1, explanation: 'plt.plot(x, y)로 선 그래프를 그립니다. plt.show()로 표시.' },
{ q: 'plt.bar()의 기능은?', choices: ['선 그래프', '막대 그래프', '원형 차트', '산점도'], answer: 1, explanation: 'plt.bar(x, height)로 막대 그래프를 그립니다. 범주형 데이터 비교에 적합.' },
{ q: 'seaborn 라이브러리의 장점은?', choices: ['속도', 'matplotlib 기반의 더 아름다운 통계 시각화', '파일 처리', '웹 개발'], answer: 1, explanation: 'seaborn은 matplotlib 위에서 예쁜 통계 그래프(히트맵, 바이올린 등)를 쉽게 생성합니다.' },
{ q: 'requests 라이브러리의 역할은?', choices: ['파일 처리', 'HTTP 요청을 보내는 라이브러리', '그래프', '계산'], answer: 1, explanation: 'requests.get(url)로 웹 페이지 데이터를 가져옵니다. API 호출에 필수.' },
{ q: 'BeautifulSoup의 역할은?', choices: ['요리', 'HTML/XML 파싱 라이브러리(웹 스크래핑)', '데이터베이스', '보안'], answer: 1, explanation: 'BeautifulSoup으로 HTML을 파싱하여 원하는 데이터를 추출합니다. 웹 크롤링.' },
{ q: 'Flask란?', choices: ['데이터 분석', '경량 웹 프레임워크', 'GUI 도구', '게임 엔진'], answer: 1, explanation: 'Flask는 간단한 웹 애플리케이션을 빠르게 만들 수 있는 마이크로 웹 프레임워크입니다.' },
{ q: 'Django와 Flask의 차이는?', choices: ['같은 것', 'Django: 풀스택/배터리 포함, Flask: 경량/마이크로', 'Flask가 더 큼', 'Django는 비웹'], answer: 1, explanation: 'Django는 ORM, 관리자 등이 포함된 풀스택, Flask는 최소한의 기능만 제공하는 마이크로.' },
{ q: 'Pillow 라이브러리의 역할은?', choices: ['수면', '이미지 처리(열기, 변환, 필터, 크기 변경)', '소리', '네트워크'], answer: 1, explanation: 'Pillow(PIL)로 이미지를 열고, 크기 변경, 필터 적용, 형식 변환 등을 합니다.' },
{ q: 'sqlite3 모듈의 역할은?', choices: ['파일 처리', '경량 관계형 데이터베이스 조작', '웹 서버', '그래프'], answer: 1, explanation: 'sqlite3는 서버 없이 파일 기반 SQL 데이터베이스를 다룹니다. Python 내장 모듈.' },
{ q: 'pip install로 라이브러리를 설치한 후 확인하는 방법은?', choices: ['pip list', 'pip show 패키지명', '둘 다 가능', 'import로만'], answer: 2, explanation: 'pip list는 전체 목록, pip show 패키지명은 특정 패키지 정보를 보여줍니다.' },
{ q: 'virtualenv/venv의 목적은?', choices: ['속도 향상', '프로젝트별 독립적 패키지 환경', '보안', '백업'], answer: 1, explanation: '가상환경으로 프로젝트마다 다른 라이브러리 버전을 독립적으로 관리합니다.' },
{ q: 'requirements.txt의 역할은?', choices: ['코드 파일', '프로젝트 의존 패키지 목록 관리', '설정 파일', '실행 파일'], answer: 1, explanation: 'pip freeze > requirements.txt로 생성, pip install -r requirements.txt로 설치합니다.' },
{ q: 'tkinter의 역할은?', choices: ['웹 개발', 'Python 표준 GUI 라이브러리', '데이터 분석', '게임 엔진'], answer: 1, explanation: 'tkinter는 Python 내장 GUI 라이브러리로, 윈도우 응용 프로그램을 만듭니다.' },
{ q: 'pytest의 역할은?', choices: ['보안 테스트', 'Python 코드를 테스트하는 프레임워크', '성능 측정', '문서 생성'], answer: 1, explanation: 'pytest로 함수 테스트를 작성하고 실행합니다. assert로 기대값을 검증.' },
{ q: 'argparse 모듈의 역할은?', choices: ['인자 삭제', '명령줄 인자를 파싱하는 도구', '변수 타입', '파일 파싱'], answer: 1, explanation: 'argparse로 스크립트의 명령줄 옵션과 인자를 체계적으로 정의하고 파싱합니다.' },
{ q: 'logging 모듈의 레벨 순서는?', choices: ['ERROR만', 'DEBUG < INFO < WARNING < ERROR < CRITICAL', '역순', '레벨 없음'], answer: 1, explanation: '가장 상세한 DEBUG부터 가장 심각한 CRITICAL까지 5단계입니다.' },
{ q: 'Jupyter Notebook의 장점은?', choices: ['컴파일러', '코드, 출력, 마크다운을 한 문서에 결합한 대화형 환경', '웹 서버', 'IDE'], answer: 1, explanation: 'Jupyter는 셀 단위로 코드를 실행하고 결과를 즉시 확인하는 대화형 노트북입니다.' },
{ q: 'type hint + mypy의 조합으로 얻는 이점은?', choices: ['속도 향상', '정적 타입 검사로 타입 관련 버그 사전 발견', '자동 수정', '코드 단축'], answer: 1, explanation: 'mypy는 타입 힌트를 분석하여 런타임 전에 타입 불일치 등의 에러를 찾아줍니다.' },
{ q: 'black과 isort의 역할은?', choices: ['코드 실행', 'black: 코드 포맷터, isort: import 정렬', '디버거', '테스트 도구'], answer: 1, explanation: 'black은 PEP 8 기반 자동 코드 포맷팅, isort는 import문을 자동으로 정렬합니다.' },
{ q: 'asyncio 라이브러리의 역할은?', choices: ['동기 처리', '비동기 I/O를 위한 이벤트 루프 기반 라이브러리', '멀티프로세싱', '파일 처리'], answer: 1, explanation: 'asyncio는 async/await로 비동기 프로그래밍을 지원합니다. 네트워크 I/O에 효과적.' }
]

            },

        ], related: ['u40', 'u42'],

    },

    {

        id: 'u42', category: 'advanced', name: 'Unit 42. 정규 표현식', hanja: 'Regular Expression',

        short: 're 모듈, 패턴 매칭, 그룹, 치환', color: '#f59e0b', icon: 'maintenance',

        sections: [

            { type: 'definition', title: '개요', content: '정규 표현식(re 모듈)으로 문자열 패턴을 매칭, 검색, 치환합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: 'PEP 8이란?', choices: ['Python 버전', 'Python 코드 스타일 가이드', 'Python 에디터', 'Python 패키지'], answer: 1, explanation: 'PEP 8은 Python 공식 코드 스타일 가이드로, 들여쓰기, 네이밍, 줄 길이 등의 규칙을 정의합니다.' },
{ q: 'PEP 8에서 권장하는 들여쓰기는?', choices: ['탭 1개', '공백 4개', '공백 2개', '공백 8개'], answer: 1, explanation: 'PEP 8은 공백 4개를 들여쓰기 표준으로 권장합니다.' },
{ q: '변수 이름 규칙으로 올바른 것은?', choices: ['myVariable (카멜)', 'my_variable (스네이크)', 'MyVariable (파스칼)', '모두 가능하지만 스네이크 권장'], answer: 3, explanation: 'PEP 8은 변수, 함수에 snake_case를 권장합니다. 클래스는 PascalCase.' },
{ q: '상수 이름 규칙은?', choices: ['snake_case', 'UPPER_SNAKE_CASE', 'PascalCase', 'camelCase'], answer: 1, explanation: 'MAX_SIZE, PI 등 상수는 대문자+밑줄로 표기합니다.' },
{ q: 'import문의 올바른 순서는?', choices: ['순서 무관', '표준 라이브러리 -> 서드파티 -> 로컬', '로컬 -> 표준 -> 서드파티', '역순'], answer: 1, explanation: 'PEP 8: 1. 표준 라이브러리(os, sys) 2. 서드파티(requests) 3. 로컬 모듈 순서로 구분합니다.' },
{ q: 'DRY 원칙이란?', choices: ['코드 건조하기', 'Don\'t Repeat Yourself (반복하지 말라)', '코드 삭제', '빠른 개발'], answer: 1, explanation: '같은 코드를 반복하지 말고 함수, 클래스로 재사용하라는 원칙입니다.' },
{ q: 'KISS 원칙이란?', choices: ['사랑', 'Keep It Simple, Stupid (단순하게 유지)', '키보드 단축키', '코드 보안'], answer: 1, explanation: '가능한 한 단순하고 이해하기 쉬운 코드를 작성하라는 원칙입니다.' },
{ q: 'YAGNI 원칙이란?', choices: ['항상 미리 구현', 'You Ain\'t Gonna Need It (필요 없으면 만들지 마라)', '코드 삭제', '테스트 원칙'], answer: 1, explanation: '현재 필요하지 않은 기능은 미리 만들지 않는 원칙입니다. 과잉 설계 방지.' },
{ q: '리스트 컴프리헨션의 장점은?', choices: ['항상 빠름', '간결하고 Pythonic한 코드 작성', '메모리 절약', '에러 방지'], answer: 1, explanation: '[x**2 for x in range(10)]은 for문보다 간결합니다. Python답게(Pythonic) 코드를 작성.' },
{ q: 'f-string의 장점은?', choices: ['Python 2 호환', '가독성 좋고 빠른 문자열 포맷팅', '보안 강화', '메모리 절약'], answer: 1, explanation: 'f"Hello {name}"은 .format()이나 %보다 직관적이고 성능도 좋습니다.' },
{ q: 'with문을 사용해야 하는 이유는?', choices: ['속도', '리소스(파일, 연결 등)의 안전한 자동 해제', '코드 단축', '에러 무시'], answer: 1, explanation: 'with문은 블록 종료 시 자동으로 리소스를 해제합니다. close() 누락 방지.' },
{ q: '언패킹의 Pythonic한 활용은?', choices: ['a=lst[0]; b=lst[1]', 'a, b = lst (동시 할당)', '변수 하나만', '루프만'], answer: 1, explanation: 'a, b, c = [1, 2, 3]처럼 한 번에 여러 값을 할당합니다. 가독성과 간결성.' },
{ q: '삼항 연산자의 Python 문법은?', choices: ['a ? b : c', 'value = b if condition else c', 'if-else만', 'switch'], answer: 1, explanation: 'result = "짝수" if x%2==0 else "홀수"처럼 한 줄 조건식을 사용합니다.' },
{ q: 'enumerate()를 사용하는 이유는?', choices: ['속도', 'for i in range(len(lst)) 대신 Pythonic하게 인덱스+값 접근', '정렬', '필터'], answer: 1, explanation: 'for i, val in enumerate(lst):가 range(len())보다 Pythonic하고 실수가 적습니다.' },
{ q: 'zip()의 Pythonic한 활용은?', choices: ['파일 압축', '여러 리스트를 동시 순회', '정렬', '딕셔너리 생성만'], answer: 1, explanation: 'for a, b in zip(list1, list2):로 여러 시퀀스를 동시에 순회합니다.' },
{ q: 'any()와 all()의 Pythonic한 사용은?', choices: ['루프 대체', '조건 검사를 한 줄로 표현', '정렬', '필터'], answer: 1, explanation: 'if any(x > 10 for x in nums):가 for+if+break보다 간결합니다.' },
{ q: 'walrus operator(:=)란?', choices: ['동물', '할당과 표현식을 동시에(Python 3.8+)', '비교 연산자', '논리 연산자'], answer: 1, explanation: 'if (n := len(lst)) > 10: 처럼 변수 할당과 조건 검사를 한 줄에.' },
{ q: 'defaultdict를 사용하는 이유는?', choices: ['속도', '키 부재 시 기본값으로 KeyError 방지', '정렬', '필터'], answer: 1, explanation: 'defaultdict(int)는 없는 키에 0을, defaultdict(list)는 []을 자동 생성합니다.' },
{ q: '코드 리뷰의 중요성은?', choices: ['불필요', '버그 발견, 코드 품질 향상, 지식 공유', '속도 저하만', '개인 작업에만'], answer: 1, explanation: '코드 리뷰로 다른 사람의 시각에서 버그를 발견하고 더 나은 코드를 작성합니다.' },
{ q: 'docstring 작성 규칙은?', choices: ['선택적', '함수/클래스/모듈의 첫 줄에 삼중 따옴표로 설명', '주석으로 충분', '#만 사용'], answer: 1, explanation: '"""설명"""으로 함수의 목적, 매개변수, 반환값을 문서화합니다. help()로 확인 가능.' },
{ q: 'try-except에서 구체적 예외를 잡아야 하는 이유는?', choices: ['속도', '예상치 못한 에러를 숨기지 않기 위해', '문법 규칙', '메모리'], answer: 1, explanation: 'except Exception:보다 except ValueError:가 안전합니다. 다른 에러는 드러나야 디버깅 가능.' },
{ q: '__all__의 역할은?', choices: ['모든 변수', 'from module import * 시 공개할 이름 목록 지정', '전역 변수', '상수 목록'], answer: 1, explanation: '__all__ = ["func1", "func2"]로 외부에 공개할 API를 명시합니다.' },
{ q: 'Type Guard(isinstance)를 활용하는 이유는?', choices: ['타입 변환', '타입에 따라 안전하게 다른 로직 실행', '속도 향상', '메모리 절약'], answer: 1, explanation: 'isinstance(x, int)로 타입을 확인한 후 안전하게 해당 타입의 연산을 수행합니다.' },
{ q: 'getter/setter 대신 @property를 사용하는 이유는?', choices: ['속도', 'Pythonic하게 속성 접근 제어(자바 스타일 지양)', '보안', '메모리'], answer: 1, explanation: 'obj.get_x() 대신 obj.x로 접근하되, 내부에서 검증 로직을 수행합니다.' },
{ q: '구조 패턴 매칭(match-case)의 용도는?', choices: ['정규식', 'Python 3.10+ 구조적 패턴에 따른 분기', 'if-else 동일', '반복문'], answer: 1, explanation: 'match value: case pattern: 으로 값의 구조에 따라 분기합니다. switch보다 강력.' },
{ q: 'slots를 사용하면 좋은 경우는?', choices: ['항상', '대량의 인스턴스를 생성할 때 메모리 절약', '클래스 1개만', '상속 시만'], answer: 1, explanation: '__slots__는 __dict__를 제거하여 인스턴스당 메모리를 크게 줄입니다. 대량 생성 시 유리.' },
{ q: 'collections.abc의 역할은?', choices: ['알파벳', '컨테이너 추상 기본 클래스(Iterable, Sequence 등)', '데이터베이스', '파일 처리'], answer: 1, explanation: 'Iterable, Mapping, Sequence 등 추상 기본 클래스로 타입 검사와 인터페이스를 정의합니다.' },
{ q: '_ (밑줄) 변수의 관례적 의미는?', choices: ['에러', '사용하지 않는 값(무시)', '프라이빗', '전역'], answer: 1, explanation: 'for _ in range(5):처럼 반복 변수를 사용하지 않을 때 _로 무시 의도를 표현합니다.' },
{ q: 'str.join()이 + 연결보다 좋은 이유는?', choices: ['가독성만', '성능: 문자열 불변이므로 join이 O(n), +는 O(n^2)', '같은 성능', 'join이 느림'], answer: 1, explanation: '문자열은 불변이므로 +로 반복 연결하면 매번 새 객체 생성. join은 한 번에 결합.' },
{ q: 'Python에서 if __name__ == "__main__":을 코드 마지막에 넣는 이유는?', choices: ['필수 문법', '직접 실행 시에만 코드가 동작하고 import 시에는 실행되지 않도록', '속도 향상', '에러 방지'], answer: 1, explanation: '모듈로 import할 때 테스트 코드가 실행되는 것을 방지합니다. 재사용성 향상.' }
]

            },

        ], related: ['u41', 'u43'],

    },





    {

        id: 'u43', category: 'advanced', name: 'Unit 43. 에러 디버깅', hanja: 'Debugging',

        short: 'print 디버깅, pdb, 에러 메시지 읽기', color: '#f59e0b', icon: 'speed',

        sections: [

            { type: 'definition', title: '개요', content: '프로그램 오류를 찾고 수정하는 디버깅 기법을 학습합니다. print 디버깅, pdb, 에러 메시지 분석 등.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '동시성(Concurrency)과 병렬성(Parallelism)의 차이는?', choices: ['같은 것', '동시성: 작업 전환으로 동시 처리하는 것 같이, 병렬성: 실제 동시 실행', '병렬성이 느림', '동시성만 가능'], answer: 1, explanation: '동시성은 논리적 동시 처리(싱글 코어), 병렬성은 물리적 동시 실행(멀티 코어).' },
{ q: 'GIL(Global Interpreter Lock)이란?', choices: ['보안 기능', 'CPython에서 한 번에 하나의 스레드만 Python 코드를 실행하게 하는 락', '메모리 관리', '파일 잠금'], answer: 1, explanation: 'GIL로 인해 멀티스레딩이 CPU 바운드 작업에서는 진정한 병렬 실행이 제한됩니다.' },
{ q: 'threading 모듈의 적합한 사용 사례는?', choices: ['CPU 집약 작업', 'I/O 바운드 작업(파일, 네트워크)', '수학 계산', '이미지 처리'], answer: 1, explanation: 'I/O 대기 시 GIL이 해제되므로 네트워크, 파일 I/O에 스레딩이 효과적입니다.' },
{ q: 'multiprocessing 모듈의 장점은?', choices: ['GIL 공유', '별도 프로세스로 GIL 우회, 진정한 병렬 실행', '메모리 공유', '항상 빠름'], answer: 1, explanation: '각 프로세스는 독립적 GIL을 가져 CPU 바운드 작업을 진정으로 병렬 실행합니다.' },
{ q: 'async/await의 장점은?', choices: ['멀티스레딩', '단일 스레드에서 효율적인 비동기 I/O 처리', 'CPU 병렬 처리', '항상 빠름'], answer: 1, explanation: 'asyncio는 이벤트 루프로 I/O 대기 시간을 활용하여 다른 작업을 처리합니다.' },
{ q: 'concurrent.futures의 장점은?', choices: ['복잡한 API', '통일된 고수준 API로 스레드/프로세스 풀 관리', '저수준 제어', '동기만 지원'], answer: 1, explanation: 'ThreadPoolExecutor, ProcessPoolExecutor로 간편하게 병렬 작업을 관리합니다.' },
{ q: 'Lock의 역할은?', choices: ['파일 잠금', '공유 자원에 대한 동시 접근 방지(상호 배제)', '프로세스 종료', '메모리 관리'], answer: 1, explanation: 'Lock으로 임계 영역을 보호하여 여러 스레드가 동시에 자원을 수정하는 것을 방지합니다.' },
{ q: '데드락(Deadlock)이란?', choices: ['프로그램 종료', '두 스레드가 서로의 락을 기다리며 영원히 블로킹', '메모리 부족', '에러 처리'], answer: 1, explanation: '스레드 A가 락1 보유+락2 대기, 스레드 B가 락2 보유+락1 대기하면 교착 상태.' },
{ q: 'Queue를 스레드 간 통신에 사용하는 이유는?', choices: ['속도', '스레드 안전한 데이터 교환 지원', '간단해서', '메모리 절약'], answer: 1, explanation: 'queue.Queue는 스레드 안전하여 Lock 없이도 안전하게 데이터를 교환할 수 있습니다.' },
{ q: '다음 코드의 역할은?\nfrom concurrent.futures import ThreadPoolExecutor\nwith ThreadPoolExecutor(max_workers=4) as e:\n    results = e.map(func, data)', choices: ['동기 실행', '4개 스레드로 data의 각 요소에 func을 병렬 적용', '프로세스 실행', '파일 처리'], answer: 1, explanation: 'ThreadPoolExecutor로 4개 스레드 풀을 만들고 map으로 병렬 작업을 실행합니다.' },
{ q: 'asyncio.gather()의 역할은?', choices: ['데이터 수집', '여러 코루틴을 동시에 실행하고 결과 수집', '정렬', '필터링'], answer: 1, explanation: 'await asyncio.gather(coro1(), coro2())로 여러 비동기 작업을 동시에 실행합니다.' },
{ q: 'subprocess 모듈의 역할은?', choices: ['함수 호출', '외부 프로그램/명령을 실행하고 결과를 받음', '스레드 생성', '메모리 관리'], answer: 1, explanation: 'subprocess.run(["ls", "-l"])로 외부 명령을 실행하고 출력을 캡처합니다.' },
{ q: 'Race Condition이란?', choices: ['경주', '여러 스레드가 공유 자원에 동시 접근하여 결과가 비결정적', '속도 경쟁', '메모리 경쟁'], answer: 1, explanation: '동기화 없이 공유 변수를 수정하면 실행 순서에 따라 결과가 달라집니다.' },
{ q: 'Semaphore의 역할은?', choices: ['신호등', '동시 접근 가능한 스레드 수를 제한', '단일 접근만', '프로세스 관리'], answer: 1, explanation: 'Semaphore(n)으로 최대 n개 스레드만 동시에 임계 영역에 접근할 수 있게 제한합니다.' },
{ q: 'Event 객체의 역할은?', choices: ['이벤트 삭제', '스레드 간 신호 전달(set/wait/clear)', '예외 처리', '파일 이벤트'], answer: 1, explanation: 'Event.set()으로 신호를 보내고, Event.wait()으로 신호를 기다립니다. 스레드 동기화.' },
{ q: 'ProcessPoolExecutor 사용 시 주의점은?', choices: ['없음', '데이터가 직렬화 가능해야 함(pickle)', 'GIL 주의', '스레드만 가능'], answer: 1, explanation: '프로세스 간 데이터 전달 시 pickle로 직렬화합니다. lambda는 pickle 불가.' },
{ q: 'aiohttp의 용도는?', choices: ['동기 HTTP', '비동기 HTTP 클라이언트/서버', '파일 처리', '데이터베이스'], answer: 1, explanation: 'aiohttp는 asyncio 기반 비동기 HTTP입니다. 대량 API 호출에 requests보다 효과적.' },
{ q: 'threading.Timer의 역할은?', choices: ['시간 측정', '지정 시간 후 함수를 실행하는 타이머 스레드', '프로세스 관리', '반복 실행'], answer: 1, explanation: 'Timer(5, func)으로 5초 후에 func을 실행하는 스레드를 시작합니다.' },
{ q: 'daemon 스레드란?', choices: ['악성 코드', '메인 스레드 종료 시 함께 종료되는 백그라운드 스레드', '우선순위 높은 스레드', '영원히 실행'], answer: 1, explanation: 'daemon=True인 스레드는 메인 프로그램 종료 시 자동 종료됩니다. 보조 작업용.' },
{ q: 'multiprocessing.Pool의 장점은?', choices: ['단일 프로세스', '프로세스 풀로 작업을 분배하여 병렬 처리 간소화', '스레드 풀', '메모리 공유'], answer: 1, explanation: 'Pool(4).map(func, data)로 4개 프로세스에 작업을 자동 분배합니다.' },
{ q: '공유 메모리(shared memory)를 사용하는 이유는?', choices: ['보안', '프로세스 간 데이터를 복사 없이 공유하여 성능 향상', '항상 필요', '스레드 전용'], answer: 1, explanation: 'multiprocessing.shared_memory로 프로세스 간 대용량 데이터를 효율적으로 공유합니다.' },
{ q: 'asyncio.sleep()과 time.sleep()의 차이는?', choices: ['같은 기능', 'asyncio.sleep: 비동기(다른 코루틴 실행 가능), time.sleep: 동기(블로킹)', 'time.sleep이 비동기', '차이 없음'], answer: 1, explanation: 'await asyncio.sleep(1)은 대기 중 다른 코루틴에 제어를 넘깁니다. time.sleep은 전체 블로킹.' },
{ q: 'Future 객체란?', choices: ['미래 예측', '아직 완료되지 않은 비동기 작업의 결과 참조', '과거 데이터', '조건 변수'], answer: 1, explanation: 'Future는 비동기 작업의 결과를 나타냅니다. .result()로 완료 후 결과를 가져옵니다.' },
{ q: 'as_completed()의 역할은?', choices: ['정렬', '완료된 Future부터 순서대로 반환하는 이터레이터', '모두 완료 대기', '취소'], answer: 1, explanation: 'as_completed(futures)는 먼저 완료된 작업부터 순서대로 처리할 수 있게 합니다.' },
{ q: '스레드 로컬 저장소(thread-local)란?', choices: ['전역 변수', '각 스레드에 독립적인 데이터 저장 공간', '공유 메모리', '프로세스 저장소'], answer: 1, explanation: 'threading.local()로 각 스레드가 독립적인 데이터를 가질 수 있습니다. 충돌 방지.' },
{ q: 'Barrier의 역할은?', choices: ['장벽 생성', '지정된 수의 스레드가 모두 도착할 때까지 대기', '락 해제', '타이머'], answer: 1, explanation: 'Barrier(n)은 n개 스레드가 모두 도달할 때까지 각 스레드를 대기시킵니다. 동기화 지점.' },
{ q: 'CPU 바운드 작업에 가장 적합한 방법은?', choices: ['threading', 'multiprocessing 또는 ProcessPoolExecutor', 'asyncio', '동기 처리'], answer: 1, explanation: 'GIL 때문에 CPU 바운드는 멀티프로세싱이 적합합니다. 각 프로세스가 독립 GIL.' },
{ q: 'I/O 바운드 작업에 가장 적합한 방법은?', choices: ['multiprocessing만', 'threading, asyncio, 또는 ThreadPoolExecutor', 'CPU만', '동기 처리'], answer: 1, explanation: 'I/O 대기 시 GIL이 해제되므로 스레딩이나 asyncio가 효과적입니다.' },
{ q: 'signal 모듈의 역할은?', choices: ['소리', '프로세스에 보내는 시스템 신호(SIGINT 등)를 처리', '네트워크 신호', '전자 신호'], answer: 1, explanation: 'signal.signal(signal.SIGINT, handler)로 Ctrl+C 등의 인터럽트를 처리합니다.' },
{ q: 'asyncio.run()의 역할은?', choices: ['동기 실행', '이벤트 루프를 생성하고 코루틴을 실행하는 진입점', '스레드 생성', '프로세스 생성'], answer: 1, explanation: 'asyncio.run(main())으로 비동기 프로그램의 진입점을 실행합니다. Python 3.7+.' }
]

            },

        ], related: ['u42', 'u44'],

    },

    {

        id: 'u44', category: 'advanced', name: 'Unit 44. 코딩 스타일과 PEP 8', hanja: 'PEP 8 Style',

        short: 'PEP 8, 네이밍 규칙, 코드 가독성', color: '#f59e0b', icon: 'transmission',

        sections: [

            { type: 'definition', title: '개요', content: 'PEP 8은 Python 코드 스타일 가이드입니다. 일관된 코딩 스타일로 가독성과 유지보수성을 높입니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '단위 테스트(Unit Test)란?', choices: ['전체 시스템 테스트', '개별 함수/메서드의 정확성을 검증하는 테스트', 'UI 테스트', '성능 테스트'], answer: 1, explanation: '단위 테스트는 코드의 가장 작은 단위(함수)를 독립적으로 검증합니다.' },
{ q: 'pytest에서 테스트 함수를 인식하는 규칙은?', choices: ['아무 이름', 'test_로 시작하는 함수', 'check_로 시작', 'verify_로 시작'], answer: 1, explanation: 'pytest는 test_로 시작하는 함수와 Test로 시작하는 클래스를 자동으로 발견합니다.' },
{ q: 'assert의 역할은?', choices: ['출력', '조건이 True인지 확인하고 False면 AssertionError', '변수 선언', '반복'], answer: 1, explanation: 'assert result == expected로 기대값과 실제값을 비교합니다. 불일치 시 테스트 실패.' },
{ q: 'pytest.fixture의 역할은?', choices: ['테스트 삭제', '테스트에 필요한 데이터/객체를 준비하는 설정 함수', '테스트 실행', '결과 출력'], answer: 1, explanation: '@pytest.fixture로 공통 테스트 데이터를 준비하고 여러 테스트에서 재사용합니다.' },
{ q: 'TDD(Test-Driven Development)의 순서는?', choices: ['코드 -> 테스트', 'Red(실패 테스트) -> Green(통과 코드) -> Refactor(개선)', '테스트 없이 개발', '한번에 모두'], answer: 1, explanation: 'TDD: 실패하는 테스트 작성 -> 통과하는 최소 코드 -> 리팩터링. 사이클 반복.' },
{ q: 'pytest.raises의 역할은?', choices: ['에러 발생', '특정 예외가 발생하는지 검증', '에러 무시', '에러 로깅'], answer: 1, explanation: 'with pytest.raises(ValueError): 로 해당 코드가 ValueError를 발생시키는지 확인합니다.' },
{ q: 'mock의 역할은?', choices: ['조롱', '외부 의존성을 가짜 객체로 대체하여 격리 테스트', 'UI 테스트', '성능 측정'], answer: 1, explanation: 'mock으로 DB, API 등 외부 의존성을 가짜로 대체하여 함수만 독립적으로 테스트합니다.' },
{ q: 'parametrize의 역할은?', choices: ['매개변수 정의', '여러 입력값으로 같은 테스트를 반복 실행', '변수 타입 설정', '함수 실행'], answer: 1, explanation: '@pytest.mark.parametrize로 여러 테스트 케이스를 하나의 함수로 처리합니다.' },
{ q: '코드 커버리지(Coverage)란?', choices: ['파일 크기', '테스트가 실행하는 코드의 비율', '버그 수', '실행 속도'], answer: 1, explanation: '커버리지 90%는 코드의 90%가 테스트로 실행됨을 의미합니다. pytest-cov로 측정.' },
{ q: '통합 테스트(Integration Test)란?', choices: ['단위 테스트', '여러 모듈/컴포넌트가 함께 동작하는지 검증', 'UI 테스트', '성능 테스트'], answer: 1, explanation: '통합 테스트는 모듈 간 상호작용이 올바르게 동작하는지 확인합니다.' },
{ q: 'linting의 역할은?', choices: ['코드 실행', '코드 스타일과 잠재적 오류를 자동 검사', '컴파일', '배포'], answer: 1, explanation: 'pylint, flake8 등 린터는 코드를 실행하지 않고 스타일/에러를 분석합니다.' },
{ q: 'type checking(mypy)의 장점은?', choices: ['속도 향상', '실행 전에 타입 관련 버그를 발견', '자동 수정', '메모리 절약'], answer: 1, explanation: 'mypy는 타입 힌트를 분석하여 런타임 전에 타입 불일치를 경고합니다.' },
{ q: 'doctest의 역할은?', choices: ['문서 생성', 'docstring 안의 예제 코드를 자동으로 테스트', '코드 삭제', '리팩터링'], answer: 1, explanation: '>>> 형태의 docstring 예제를 실제로 실행하여 결과가 일치하는지 검증합니다.' },
{ q: 'conftest.py의 역할은?', choices: ['설정 파일', 'pytest의 fixture와 플러그인을 디렉터리 전체에 공유', '실행 파일', '데이터 파일'], answer: 1, explanation: 'conftest.py에 정의된 fixture는 같은 디렉터리의 모든 테스트에서 자동으로 사용 가능합니다.' },
{ q: 'CI/CD에서 테스트의 역할은?', choices: ['선택적', '코드 변경 시 자동으로 테스트를 실행하여 품질 보장', '배포만', '빌드만'], answer: 1, explanation: '지속적 통합(CI)에서 모든 커밋에 대해 자동 테스트를 실행하여 버그를 조기 발견합니다.' },
{ q: 'pdb의 역할은?', choices: ['패키지 관리', 'Python 내장 대화형 디버거', '성능 측정', '파일 처리'], answer: 1, explanation: 'import pdb; pdb.set_trace()로 중단점을 설정하고 대화형으로 디버깅합니다.' },
{ q: 'breakpoint() 함수의 역할은?', choices: ['프로그램 종료', 'Python 3.7+ 내장 디버거 진입점', '에러 발생', '변수 삭제'], answer: 1, explanation: 'breakpoint()는 pdb.set_trace()의 간편 버전입니다. Python 3.7+에서 사용.' },
{ q: 'print 디버깅의 단점은?', choices: ['없음', '코드 수정 필요, 정리 필요, 복잡한 버그 추적 어려움', '항상 좋음', '속도만'], answer: 1, explanation: 'print 문은 제거 필요, 조건부 출력 어렵고 전문 디버거보다 기능이 제한적입니다.' },
{ q: 'logging이 print보다 나은 이유는?', choices: ['같음', '레벨 분류, 파일 출력, 포맷팅, 성능 제어 가능', 'print가 더 나음', '코드 짧음'], answer: 1, explanation: 'logging은 DEBUG/INFO/WARNING/ERROR 레벨 분류와 파일 출력 등 전문 기능을 제공합니다.' },
{ q: 'traceback 읽는 방법은?', choices: ['위에서 아래로', '아래에서 위로(실제 에러가 아래), 호출 경로는 위에서', '중간만', '모두 불필요'], answer: 1, explanation: '가장 아래 줄이 실제 에러 종류와 메시지입니다. 위쪽은 호출 스택(경로).' },
{ q: 'pytest-cov의 역할은?', choices: ['코드 복사', 'pytest 실행 시 코드 커버리지 리포트 생성', '코드 정리', '배포'], answer: 1, explanation: 'pytest --cov=모듈명으로 테스트 커버리지를 측정하고 리포트를 생성합니다.' },
{ q: 'edge case(경계값) 테스트란?', choices: ['일반적 입력 테스트', '빈 리스트, 0, None, 최대값 등 극단적 입력 테스트', 'UI 테스트', '성능 테스트'], answer: 1, explanation: '경계값(빈 입력, 최대값, 음수, None)에서 함수가 올바르게 동작하는지 확인합니다.' },
{ q: 'hypothesis 라이브러리의 역할은?', choices: ['가설 검정', '속성 기반 테스트(랜덤 입력 자동 생성)', '단위 테스트만', '성능 측정'], answer: 1, explanation: 'hypothesis는 다양한 랜덤 입력을 자동 생성하여 예상치 못한 케이스를 발견합니다.' },
{ q: 'pytest marker(-m)의 역할은?', choices: ['마크다운', '테스트에 태그를 붙여 선택적으로 실행', '모든 테스트 순서', '병렬 실행'], answer: 1, explanation: '@pytest.mark.slow 등으로 태그를 붙이고 pytest -m slow로 해당 테스트만 실행합니다.' },
{ q: 'side_effect의 역할은?', choices: ['부작용 제거', 'mock 호출 시 특정 동작(예외, 값 변경) 설정', '에러 무시', '반환값 설정'], answer: 1, explanation: 'mock.side_effect = ValueError로 mock 호출 시 예외가 발생하게 설정합니다.' },
{ q: 'AAA 패턴이란?', choices: ['알파벳 순서', 'Arrange(준비) -> Act(실행) -> Assert(검증)', '자동 테스트', 'API 테스트'], answer: 1, explanation: '테스트 구조: 데이터 준비(Arrange), 함수 실행(Act), 결과 검증(Assert).' },
{ q: 'regression test(회귀 테스트)란?', choices: ['새 기능 테스트', '기존 기능이 코드 변경 후에도 정상 동작하는지 확인', 'UI 테스트', '보안 테스트'], answer: 1, explanation: '코드 수정 후 기존 기능이 깨지지 않았는지 확인하는 테스트입니다.' },
{ q: 'test isolation(테스트 격리)이 중요한 이유는?', choices: ['속도', '각 테스트가 독립적이어야 다른 테스트에 영향 없이 신뢰적', '메모리 절약', '순서 보장'], answer: 1, explanation: '테스트 간 상태를 공유하면 실행 순서에 따라 결과가 달라질 수 있습니다.' },
{ q: 'pytest의 -v 플래그의 역할은?', choices: ['버전 확인', '상세(verbose) 출력으로 각 테스트 결과를 개별 표시', '빠른 실행', '에러만 표시'], answer: 1, explanation: 'pytest -v로 각 테스트 함수의 이름과 PASSED/FAILED를 개별적으로 보여줍니다.' },
{ q: 'snapshot testing의 용도는?', choices: ['사진 촬영', '출력 결과를 스냅샷으로 저장하고 변경 시 감지', 'UI 캡처', '메모리 스냅샷'], answer: 1, explanation: '복잡한 출력의 정확성을 스냅샷과 비교하여 검증합니다. 변경 시 리뷰 후 업데이트.' }
]

            },

        ], related: ['u43', 'u45'],

    },

    {

        id: 'u45', category: 'advanced', name: 'Unit 45. 실전 프로젝트 기초', hanja: 'Project Basics',

        short: '프로젝트 구조, 가상환경, 패키지 관리', color: '#f59e0b', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: '실전 프로젝트의 기본 구조, 가상환경 설정, 패키지 관리, README 작성 등을 학습합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: 'Git이란?', choices: ['프로그래밍 언어', '분산 버전 관리 시스템', '텍스트 에디터', '운영체제'], answer: 1, explanation: 'Git은 소스 코드의 변경 이력을 관리하는 분산 버전 관리 시스템입니다.' },
{ q: 'git init의 역할은?', choices: ['원격 연결', '현재 디렉터리에 새 Git 저장소 초기화', '커밋', '브랜치 생성'], answer: 1, explanation: 'git init으로 .git 디렉터리가 생성되고 버전 관리가 시작됩니다.' },
{ q: 'git add의 역할은?', choices: ['파일 삭제', '변경된 파일을 스테이징 영역에 추가', '커밋', '푸시'], answer: 1, explanation: 'git add 파일명으로 커밋할 파일을 스테이징합니다. git add .은 모든 변경 파일.' },
{ q: 'git commit의 역할은?', choices: ['파일 업로드', '스테이징된 변경 사항을 저장소에 기록', '파일 다운로드', '브랜치 삭제'], answer: 1, explanation: 'git commit -m "메시지"로 변경 사항을 기록(스냅샷)합니다.' },
{ q: 'git push의 역할은?', choices: ['다운로드', '로컬 커밋을 원격 저장소에 업로드', '병합', '브랜치 생성'], answer: 1, explanation: 'git push origin main으로 로컬 커밋을 원격(GitHub 등)에 업로드합니다.' },
{ q: 'git pull의 역할은?', choices: ['업로드', '원격 저장소의 변경 사항을 로컬로 가져와 병합', '삭제', '초기화'], answer: 1, explanation: 'git pull은 fetch + merge입니다. 원격의 최신 코드를 로컬에 반영.' },
{ q: 'git clone의 역할은?', choices: ['복제 삭제', '원격 저장소를 로컬에 복제', '커밋', '브랜치'], answer: 1, explanation: 'git clone URL로 원격 저장소 전체를 로컬에 복사합니다.' },
{ q: 'branch(브랜치)의 역할은?', choices: ['파일 삭제', '독립적인 개발 라인을 생성하여 병렬 작업', '커밋 취소', '원격 연결'], answer: 1, explanation: '브랜치로 기능별 독립 개발 후 메인에 병합합니다. git branch 이름으로 생성.' },
{ q: 'git merge의 역할은?', choices: ['브랜치 삭제', '두 브랜치의 변경 사항을 합치기', '커밋 취소', '원격 동기화'], answer: 1, explanation: 'git merge 브랜치명으로 다른 브랜치의 변경 사항을 현재 브랜치에 합칩니다.' },
{ q: '.gitignore의 역할은?', choices: ['Git 삭제', 'Git이 추적하지 않을 파일/디렉터리 지정', '커밋 무시', '브랜치 무시'], answer: 1, explanation: '.gitignore에 패턴을 지정하면 해당 파일은 git add에서 제외됩니다. __pycache__/ 등.' },
{ q: 'GitHub란?', choices: ['Git 자체', 'Git 저장소를 호스팅하는 웹 서비스', '프로그래밍 언어', 'IDE'], answer: 1, explanation: 'GitHub는 Git 원격 저장소 호스팅, 협업, 코드 리뷰 등을 제공하는 플랫폼입니다.' },
{ q: 'Pull Request(PR)의 역할은?', choices: ['코드 삭제', '코드 변경을 리뷰받고 메인에 병합 요청', '파일 다운로드', '브랜치 삭제'], answer: 1, explanation: 'PR로 코드 리뷰, 토론, CI 테스트를 거쳐 안전하게 메인 브랜치에 병합합니다.' },
{ q: 'git status의 역할은?', choices: ['속도 확인', '현재 작업 디렉터리의 변경 상태 확인', '커밋 이력', '브랜치 목록'], answer: 1, explanation: '수정된 파일, 스테이징된 파일, 추적되지 않는 파일 등의 상태를 보여줍니다.' },
{ q: 'git log의 역할은?', choices: ['에러 로그', '커밋 이력(해시, 저자, 날짜, 메시지) 확인', '파일 내용', '브랜치 상태'], answer: 1, explanation: 'git log로 과거 커밋 이력을 시간순으로 확인합니다. --oneline으로 간결하게.' },
{ q: 'git diff의 역할은?', choices: ['파일 삭제', '파일 변경 내용의 차이점 확인', '병합', '브랜치 생성'], answer: 1, explanation: 'git diff로 마지막 커밋 이후의 변경 사항을 줄 단위로 확인합니다.' },
{ q: 'commit message 작성 규칙은?', choices: ['아무거나', '간결하고 명확한 현재형("Add login feature")', '코드 복사', '날짜만'], answer: 1, explanation: '좋은 커밋 메시지: "Fix bug in user validation", "Add search feature" 등 명확하고 간결하게.' },
{ q: 'git stash의 역할은?', choices: ['영구 저장', '작업 중인 변경 사항을 임시 저장하고 깨끗한 상태로', '커밋', '삭제'], answer: 1, explanation: 'git stash로 현재 변경을 임시 저장하고, git stash pop으로 복원합니다.' },
{ q: 'git rebase의 역할은?', choices: ['저장소 삭제', '커밋 이력을 깔끔하게 재정렬', '파일 복사', '원격 연결'], answer: 1, explanation: 'rebase는 커밋들을 다른 베이스 위에 재적용하여 이력을 선형으로 정리합니다.' },
{ q: 'merge conflict(병합 충돌) 해결 방법은?', choices: ['무시', '충돌 파일을 수동 편집하여 해결 후 커밋', '자동 해결', '브랜치 삭제'], answer: 1, explanation: '<<<<<<< ======= >>>>>>> 표시를 보고 원하는 코드를 선택하여 수동으로 해결합니다.' },
{ q: 'git reset의 역할은?', choices: ['저장소 초기화', '커밋을 취소하거나 스테이징 해제', '원격 동기화', '브랜치 생성'], answer: 1, explanation: 'git reset HEAD~1로 마지막 커밋을 취소합니다. --soft, --mixed, --hard 옵션.' },
{ q: 'git tag의 역할은?', choices: ['라벨', '특정 커밋에 버전 태그 부착 (v1.0.0)', '브랜치 생성', '파일 태그'], answer: 1, explanation: 'git tag v1.0.0으로 릴리스 버전을 표시합니다. 중요한 지점을 기록.' },
{ q: 'GitHub Actions의 역할은?', choices: ['게임', 'CI/CD 자동화 파이프라인', '파일 호스팅', '이메일'], answer: 1, explanation: 'GitHub Actions로 코드 push 시 자동 테스트, 빌드, 배포 등을 설정합니다.' },
{ q: 'fork의 역할은?', choices: ['식기', '다른 사람의 저장소를 내 계정에 복사하여 독립 개발', '브랜치 생성', '커밋'], answer: 1, explanation: 'Fork로 원본 저장소를 복사하고, 수정 후 PR로 기여합니다. 오픈소스 기여 방식.' },
{ q: 'README.md의 역할은?', choices: ['코드 파일', '프로젝트 소개, 설치 방법, 사용법 등을 안내하는 문서', '설정 파일', '테스트 파일'], answer: 1, explanation: 'README.md는 프로젝트의 첫인상입니다. 설명, 설치, 사용법, 기여 방법 등을 작성합니다.' },
{ q: 'LICENSE 파일의 역할은?', choices: ['라이선스 키', '오픈소스 프로젝트의 사용 조건과 권리 명시', '비밀번호', '설정'], answer: 1, explanation: 'MIT, Apache 2.0 등 라이선스로 다른 사람이 코드를 어떻게 사용할 수 있는지 명시합니다.' },
{ q: 'semantic versioning(SemVer)의 형식은?', choices: ['날짜', 'MAJOR.MINOR.PATCH (예: 2.1.0)', 'v1만', '숫자 하나'], answer: 1, explanation: 'MAJOR: 호환 깨지는 변경, MINOR: 호환 기능 추가, PATCH: 버그 수정. 예: 2.1.3.' },
{ q: 'git cherry-pick의 역할은?', choices: ['체리 선택', '다른 브랜치의 특정 커밋만 현재 브랜치에 적용', '모든 커밋', '브랜치 삭제'], answer: 1, explanation: 'cherry-pick 해시로 필요한 커밋만 선택적으로 가져옵니다.' },
{ q: 'git bisect의 역할은?', choices: ['이진 분할', '이진 탐색으로 버그가 도입된 커밋을 찾기', '브랜치 분할', '파일 분할'], answer: 1, explanation: 'git bisect start -> good/bad를 표시하여 이진 탐색으로 문제 커밋을 빠르게 찾습니다.' },
{ q: 'pre-commit hook의 역할은?', choices: ['커밋 후', '커밋 전에 자동으로 코드 검사(lint, format) 실행', '푸시 후', '병합 후'], answer: 1, explanation: '커밋 전에 자동으로 코드 포맷팅, 린팅, 테스트를 실행하여 품질을 보장합니다.' },
{ q: 'monorepo vs polyrepo는?', choices: ['같은 것', 'monorepo: 하나의 큰 저장소, polyrepo: 프로젝트별 저장소', 'monorepo가 항상 좋음', 'polyrepo만 가능'], answer: 1, explanation: 'monorepo는 모든 프로젝트를 한 곳에, polyrepo는 프로젝트마다 별도 저장소. 팀 규모에 따라 선택.' }
]

            },

        ], related: ['u44', 'u46'],

    },

    {

        id: 'u46', category: 'advanced', name: 'Unit 46. 웹 스크래핑 기초', hanja: 'Web Scraping',

        short: 'requests, BeautifulSoup, 웹 데이터 수집', color: '#f59e0b', icon: 'maintenance',

        sections: [

            { type: 'definition', title: '개요', content: 'requests로 웹 페이지를 가져오고, BeautifulSoup으로 HTML을 파싱하여 데이터를 추출합니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: 'API란?', choices: ['프로그래밍 언어', '프로그램 간 상호작용을 위한 인터페이스', '데이터베이스', '운영체제'], answer: 1, explanation: 'API(Application Programming Interface)는 소프트웨어 간 통신 규약/인터페이스입니다.' },
{ q: 'REST API의 특징은?', choices: ['상태 유지', 'HTTP 메서드(GET/POST/PUT/DELETE)로 자원을 조작하는 무상태 아키텍처', 'TCP 전용', '파일 전용'], answer: 1, explanation: 'REST는 URL로 자원을 식별하고 HTTP 메서드로 CRUD 연산을 수행합니다.' },
{ q: 'HTTP GET의 용도는?', choices: ['데이터 생성', '데이터 조회(읽기)', '데이터 삭제', '데이터 수정'], answer: 1, explanation: 'GET은 서버에서 데이터를 읽어오는 요청입니다. 부수 효과가 없어야 합니다.' },
{ q: 'HTTP POST의 용도는?', choices: ['조회', '새 데이터 생성(쓰기)', '삭제', '읽기'], answer: 1, explanation: 'POST는 서버에 새 데이터를 생성하는 요청입니다. 요청 본문에 데이터 포함.' },
{ q: 'HTTP 상태 코드 200의 의미는?', choices: ['에러', '성공(OK)', '리다이렉트', '서버 에러'], answer: 1, explanation: '200 OK는 요청이 성공적으로 처리되었음을 의미합니다.' },
{ q: 'HTTP 상태 코드 404의 의미는?', choices: ['성공', '리소스를 찾을 수 없음(Not Found)', '서버 에러', '인증 필요'], answer: 1, explanation: '404 Not Found는 요청한 URL에 해당하는 리소스가 존재하지 않음을 의미합니다.' },
{ q: 'JSON이란?', choices: ['프로그래밍 언어', '경량 데이터 교환 형식(키-값 쌍)', '이미지 형식', '실행 파일'], answer: 1, explanation: 'JSON(JavaScript Object Notation)은 {"key": "value"} 형태의 텍스트 데이터 형식입니다.' },
{ q: 'requests.get()의 사용법은?', choices: ['requests.get(url)', 'requests.download(url)', 'requests.fetch(url)', 'requests.read(url)'], answer: 0, explanation: 'response = requests.get(url)로 GET 요청을 보내고 응답을 받습니다.' },
{ q: 'response.json()의 역할은?', choices: ['JSON 문자열 반환', 'JSON 응답을 Python 딕셔너리로 변환', 'HTML 반환', '파일 저장'], answer: 1, explanation: '.json()은 응답 본문을 JSON으로 파싱하여 딕셔너리로 변환합니다.' },
{ q: 'SQL이란?', choices: ['프로그래밍 언어', '관계형 데이터베이스를 조작하는 쿼리 언어', '파일 형식', 'API'], answer: 1, explanation: 'SQL(Structured Query Language)로 데이터 생성, 조회, 수정, 삭제(CRUD)를 수행합니다.' },
{ q: 'SELECT문의 역할은?', choices: ['데이터 삽입', '데이터 조회(읽기)', '테이블 삭제', '데이터 수정'], answer: 1, explanation: 'SELECT 열 FROM 테이블 WHERE 조건으로 데이터를 조회합니다.' },
{ q: 'INSERT INTO의 역할은?', choices: ['조회', '테이블에 새 행(데이터) 삽입', '삭제', '수정'], answer: 1, explanation: 'INSERT INTO 테이블(열) VALUES(값)으로 새 데이터를 추가합니다.' },
{ q: 'UPDATE의 역할은?', choices: ['삽입', '기존 데이터 수정', '삭제', '조회'], answer: 1, explanation: 'UPDATE 테이블 SET 열=값 WHERE 조건으로 기존 행을 수정합니다.' },
{ q: 'DELETE의 역할은?', choices: ['테이블 생성', '행(데이터) 삭제', '열 추가', '데이터 수정'], answer: 1, explanation: 'DELETE FROM 테이블 WHERE 조건으로 행을 삭제합니다. WHERE 없으면 전체 삭제 주의.' },
{ q: 'ORM이란?', choices: ['데이터베이스 종류', '객체와 관계형 DB 테이블을 매핑하는 도구', 'API 종류', '파일 형식'], answer: 1, explanation: 'ORM(Object-Relational Mapping)은 Python 객체로 DB를 조작합니다. SQLAlchemy 등.' },
{ q: 'SQLAlchemy의 장점은?', choices: ['속도만', 'Python 코드로 DB 조작, DB 독립적, SQL 인젝션 방지', '단순함만', '파일 처리'], answer: 1, explanation: 'SQLAlchemy ORM으로 SQL을 직접 쓰지 않고도 안전하게 DB를 조작합니다.' },
{ q: 'SQL 인젝션이란?', choices: ['정상 기능', '악의적 SQL을 입력에 삽입하여 DB를 공격', '성능 최적화', 'API 호출'], answer: 1, explanation: '사용자 입력에 SQL을 삽입하여 DB를 조작하는 공격. 매개변수화된 쿼리로 방지.' },
{ q: 'NoSQL 데이터베이스의 예시는?', choices: ['MySQL', 'MongoDB (문서형), Redis (키-값)', 'PostgreSQL', 'SQLite'], answer: 1, explanation: 'NoSQL은 비관계형 DB입니다. MongoDB(문서), Redis(캐시), Cassandra(분산) 등.' },
{ q: 'WebSocket의 특징은?', choices: ['단방향', '양방향 실시간 통신(서버 push 가능)', 'HTTP만', '파일 전용'], answer: 1, explanation: 'WebSocket은 클라이언트-서버 간 양방향 실시간 통신을 지원합니다. 채팅, 게임 등.' },
{ q: 'FastAPI의 장점은?', choices: ['느림', '빠른 성능, 자동 문서화, 타입 힌트 기반 검증', '복잡한 설정', 'Python 2만'], answer: 1, explanation: 'FastAPI는 Starlette 기반 고성능 + Pydantic 타입 검증 + Swagger 자동 문서화.' },
{ q: 'GraphQL과 REST의 차이는?', choices: ['같은 것', 'GraphQL: 클라이언트가 원하는 데이터만 요청, REST: 고정 엔드포인트', 'REST가 더 유연', 'GraphQL이 느림'], answer: 1, explanation: 'GraphQL은 하나의 엔드포인트에서 필요한 데이터만 쿼리합니다. 과잉/부족 요청 방지.' },
{ q: 'CORS란?', choices: ['에러', '다른 출처(도메인) 간 리소스 공유를 허용하는 정책', 'CSS 종류', 'API 종류'], answer: 1, explanation: 'Cross-Origin Resource Sharing으로 브라우저에서 다른 도메인의 API를 호출할 수 있게 허용.' },
{ q: 'OAuth2의 역할은?', choices: ['파일 관리', '제3자 애플리케이션에 안전하게 권한 부여(인가)', '데이터베이스', '암호화'], answer: 1, explanation: 'OAuth2는 "구글로 로그인" 같은 제3자 인증/인가 프로토콜입니다.' },
{ q: 'JWT(JSON Web Token)의 용도는?', choices: ['파일 형식', '사용자 인증 정보를 안전하게 전달하는 토큰', '데이터베이스', '에러 로그'], answer: 1, explanation: 'JWT는 헤더.페이로드.서명 구조로 사용자 인증 정보를 안전하게 전달합니다.' },
{ q: 'pip install flask의 역할은?', choices: ['Flask 삭제', 'Flask 웹 프레임워크를 설치', 'Flask 실행', 'Flask 업데이트'], answer: 1, explanation: 'pip install flask로 Flask를 설치하고 웹 애플리케이션 개발을 시작합니다.' },
{ q: 'Docker의 역할은?', choices: ['가상머신', '컨테이너로 애플리케이션과 환경을 패키징하여 이식성 제공', '프로그래밍 언어', '데이터베이스'], answer: 1, explanation: 'Docker 컨테이너는 앱+의존성을 패키징하여 어디서든 동일하게 실행합니다.' },
{ q: 'Dockerfile의 역할은?', choices: ['문서', 'Docker 이미지를 정의하는 설정 파일', '코드 파일', '데이터 파일'], answer: 1, explanation: 'FROM python:3.12, COPY, RUN pip install, CMD 등으로 이미지를 정의합니다.' },
{ q: 'environment variable(.env)의 역할은?', choices: ['코드 파일', '비밀키, DB 주소 등 민감한 설정 값을 코드 외부에 저장', '테스트 파일', '문서'], answer: 1, explanation: '.env 파일에 API_KEY=xxx를 저장하고 코드에서 os.environ[]으로 읽습니다. Git에 올리지 않음.' },
{ q: 'rate limiting의 역할은?', choices: ['속도 향상', 'API 요청 횟수를 제한하여 서버 과부하 방지', '속도 제한 없음', '캐시'], answer: 1, explanation: 'Rate limiting은 일정 시간 내 API 호출 횟수를 제한합니다. 예: 100회/분.' },
{ q: 'HTTP 상태 코드 500의 의미는?', choices: ['성공', '클라이언트 에러', '서버 내부 에러(Internal Server Error)', '리다이렉트'], answer: 2, explanation: '500은 서버 측에서 처리 중 에러가 발생했음을 의미합니다. 서버 로그를 확인해야 합니다.' }
]

            },

        ], related: ['u45', 'u47'],

    },

    {

        id: 'u47', category: 'advanced', name: 'Unit 47. 종합 복습', hanja: 'Final Review',

        short: '전 범위 종합 문제', color: '#f59e0b', icon: 'accuracy',

        sections: [

            { type: 'definition', title: '개요', content: 'Unit 1~46의 핵심 개념을 종합적으로 복습하는 문제를 풀어봅니다.' },

            {

                type: 'exam', title: '연습문제', questions: [
{ q: '변수를 선언하고 값을 할당하는 기본 문법은?', choices: ['var x = 10', 'x = 10', 'int x = 10', 'let x = 10'], answer: 1, explanation: 'Python은 타입 선언 없이 변수명 = 값으로 변수를 생성합니다.' },
{ q: 'type(3.14)의 결과는?', choices: ['int', 'float', 'str', 'double'], answer: 1, explanation: '소수점이 있는 숫자는 float 타입입니다.' },
{ q: '다음 코드의 출력은?\nfor i in range(3):\n    print(i, end=" ")', choices: ['1 2 3', '0 1 2', '0 1 2 3', 'Error'], answer: 1, explanation: 'range(3)은 0, 1, 2를 생성합니다. end=" "로 공백 구분 출력.' },
{ q: '리스트에서 마지막 요소를 접근하는 방법은?', choices: ['lst[0]', 'lst[-1]', 'lst[last]', 'lst.end()'], answer: 1, explanation: '음수 인덱스 -1은 마지막 요소를 의미합니다.' },
{ q: '딕셔너리에서 키가 없을 때 기본값을 반환하는 메서드는?', choices: ['d[key]', 'd.get(key, default)', 'd.find(key)', 'd.default(key)'], answer: 1, explanation: '.get(key, default)은 키가 없으면 기본값을 반환합니다. d[key]는 KeyError.' },
{ q: 'def 함수의 return이 없으면 반환값은?', choices: ['0', 'None', '""', 'Error'], answer: 1, explanation: 'return이 없는 함수는 자동으로 None을 반환합니다.' },
{ q: '리스트 컴프리헨션으로 1~10의 제곱 리스트를 만드는 코드는?', choices: ['[x^2 for x in range(1,11)]', '[x**2 for x in range(1,11)]', 'list(map(pow, range(1,11)))', 'Error'], answer: 1, explanation: '[x**2 for x in range(1,11)]로 [1, 4, 9, ..., 100]을 생성합니다.' },
{ q: 'try-except-finally에서 finally의 특징은?', choices: ['에러 시만', '에러 유무와 관계없이 항상 실행', '조건부', '선택적'], answer: 1, explanation: 'finally 블록은 예외 발생 여부와 관계없이 반드시 실행됩니다.' },
{ q: 'class에서 self의 역할은?', choices: ['전역 변수', '현재 인스턴스를 참조하는 매개변수', '클래스 참조', '모듈 참조'], answer: 1, explanation: 'self는 메서드가 호출된 인스턴스 자체를 가리킵니다. self.속성으로 데이터 접근.' },
{ q: '상속에서 super()의 역할은?', choices: ['클래스 삭제', '부모 클래스의 메서드를 호출', '최상위 접근', '인스턴스 생성'], answer: 1, explanation: 'super().__init__()으로 부모 클래스의 초기화 메서드를 호출합니다.' },
{ q: 'with open("f.txt") as f:의 장점은?', choices: ['속도', '블록 종료 시 자동으로 파일 닫기', '에러 무시', '빠른 읽기'], answer: 1, explanation: 'with문은 블록을 벗어나면 자동으로 close()를 호출합니다. 리소스 누수 방지.' },
{ q: 'import와 from-import의 차이는?', choices: ['같은 것', 'import: 모듈 전체, from-import: 특정 함수/클래스만', 'from이 느림', 'import가 부분'], answer: 1, explanation: 'import math: math.sqrt() / from math import sqrt: sqrt() 직접 호출.' },
{ q: '*args와 **kwargs의 차이는?', choices: ['같은 것', '*args: 위치 인자 튜플, **kwargs: 키워드 인자 딕셔너리', '*args가 딕셔너리', '순서 무관'], answer: 1, explanation: '*args는 (1,2,3) 튜플, **kwargs는 {"a":1,"b":2} 딕셔너리로 수집합니다.' },
{ q: 'lambda x: x + 1의 의미는?', choices: ['클래스', 'x를 받아 x+1을 반환하는 익명 함수', '변수 선언', '리스트'], answer: 1, explanation: 'lambda는 한 줄 익명 함수입니다. f = lambda x: x+1; f(5) -> 6.' },
{ q: 'map, filter, reduce의 공통점은?', choices: ['정렬', '함수형 프로그래밍 도구(함수를 인자로 받음)', '클래스 도구', '파일 도구'], answer: 1, explanation: '모두 함수를 인자로 받아 반복 가능 객체에 적용합니다. 함수형 프로그래밍 패턴.' },
{ q: '제너레이터의 핵심 키워드는?', choices: ['return', 'yield', 'generate', 'produce'], answer: 1, explanation: 'yield로 값을 하나씩 반환하며 함수 상태를 유지합니다. 메모리 효율적.' },
{ q: '데코레이터 @의 의미는?', choices: ['주석', '함수를 다른 함수로 감싸 기능 추가', '변수 선언', '클래스 선언'], answer: 1, explanation: '@decorator는 함수를 래핑하여 전후 처리를 추가합니다. 로깅, 인증 등.' },
{ q: 'GIL의 의미와 영향은?', choices: ['보안', 'Global Interpreter Lock: CPU 바운드 멀티스레딩 제한', '메모리 관리', '파일 잠금'], answer: 1, explanation: 'GIL로 인해 CPU 작업은 멀티프로세싱, I/O 작업은 멀티스레딩이 적합합니다.' },
{ q: 'pytest로 테스트를 작성하는 기본 패턴은?', choices: ['print 확인', 'test_로 시작하는 함수에 assert 사용', 'if문만', 'main()'], answer: 1, explanation: 'def test_add(): assert add(1,2) == 3. 함수명 test_로 시작, assert로 검증.' },
{ q: 'git add -> git commit -> git push의 흐름은?', choices: ['역순', '변경 스테이징 -> 로컬 저장 -> 원격 업로드', '원격 -> 로컬', '커밋 -> 삭제'], answer: 1, explanation: 'add로 스테이징, commit으로 로컬 기록, push로 원격에 업로드하는 Git 기본 흐름.' },
{ q: 'PEP 8의 핵심 규칙 3가지는?', choices: ['속도, 메모리, 보안', '들여쓰기 4칸, snake_case, 줄 길이 79자', '탭 사용, camelCase, 제한 없음', '자유 형식'], answer: 1, explanation: 'PEP 8: 공백 4칸 들여쓰기, snake_case 변수명, 한 줄 79자 제한 등.' },
{ q: 'requests.get(url).json()의 역할은?', choices: ['파일 다운로드', 'URL에 GET 요청 후 JSON 응답을 딕셔너리로 반환', 'HTML 파싱', '파일 업로드'], answer: 1, explanation: 'GET 요청을 보내고, 응답 JSON을 Python 딕셔너리로 파싱합니다.' },
{ q: 'SQL의 SELECT * FROM users WHERE age > 20의 의미는?', choices: ['삭제', 'users 테이블에서 age가 20 초과인 모든 행 조회', '삽입', '수정'], answer: 1, explanation: 'SELECT *: 모든 열, FROM users: users 테이블에서, WHERE age>20: 조건 필터.' },
{ q: '동적 프로그래밍(DP)의 핵심 아이디어는?', choices: ['동적 타이핑', '중복 계산을 저장하여 효율적으로 해결', '동적 메모리', '실시간 처리'], answer: 1, explanation: 'DP는 이미 계산한 결과를 저장(메모이제이션)하여 같은 하위 문제를 재계산하지 않습니다.' },
{ q: 'Big-O에서 O(n log n)의 대표적 알고리즘은?', choices: ['버블 정렬', '병합 정렬, 퀵 정렬(평균)', '선형 탐색', '이진 탐색'], answer: 1, explanation: '효율적인 정렬 알고리즘: 병합 정렬(항상), 퀵 정렬(평균), 팀 정렬 등이 O(n log n).' },
{ q: 'asyncio의 적합한 사용 사례는?', choices: ['CPU 연산', '대량 네트워크 I/O(API 호출, 웹 크롤링)', '수학 계산', '이미지 처리'], answer: 1, explanation: 'asyncio는 I/O 대기 시간을 활용하여 여러 네트워크 요청을 효율적으로 처리합니다.' },
{ q: 'Docker의 핵심 장점은?', choices: ['속도만', '어디서든 동일한 환경에서 애플리케이션 실행(이식성)', '보안만', '무료만'], answer: 1, explanation: 'Docker 컨테이너로 개발/테스트/프로덕션 환경을 동일하게 유지합니다.' },
{ q: '다음 중 Python의 철학(Zen of Python)에 해당하지 않는 것은?', choices: ['Beautiful is better than ugly', 'Simple is better than complex', 'Complex is always wrong', 'Readability counts'], answer: 2, explanation: 'Zen of Python에서 "Complex is better than complicated"입니다. Complex 자체가 나쁜 것은 아닙니다.' },
{ q: 'Python 프로젝트의 표준 구조는?', choices: ['파일 하나', 'src/, tests/, requirements.txt, README.md, .gitignore', '폴더 없음', 'main.py만'], answer: 1, explanation: '소스 코드(src/), 테스트(tests/), 의존성(requirements.txt), 문서(README.md) 등으로 구성합니다.' },
{ q: 'Python 학습 후 추천하는 다음 단계는?', choices: ['더 이상 없음', '프로젝트 만들기 + 오픈소스 기여 + 심화 분야 선택', '다른 언어만', '이론만 복습'], answer: 1, explanation: '실전 프로젝트로 경험을 쌓고, 웹/데이터/AI 등 관심 분야를 심화 학습합니다.' }
]

            },

        ], related: ['u46'],

    },

];

