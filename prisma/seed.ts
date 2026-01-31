import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    // 관리자 계정 생성
    const adminPassword = await bcrypt.hash('admin123', 12);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@codingssok.com' },
        update: {},
        create: {
            name: '관리자',
            email: 'admin@codingssok.com',
            password: adminPassword,
            role: 'ADMIN',
            eduCode: '74123',
            points: 0
        }
    });
    console.log('✅ Admin created:', admin.email);

    // 샘플 문제 생성
    const problems = [
        // Python
        {
            title: 'Python 변수 선언',
            description: '숫자 10을 저장하는 변수 x를 선언하세요.\n\n예시: x = 10\n\n정답으로 "x = 10"을 입력하세요.',
            subject: 'PYTHON',
            difficulty: 'EASY',
            points: 10,
            answer: 'x = 10',
            hint: '변수명 = 값 형태로 작성합니다'
        },
        {
            title: 'Python print 함수',
            description: '"Hello, World!"를 출력하는 코드를 작성하세요.',
            subject: 'PYTHON',
            difficulty: 'EASY',
            points: 10,
            answer: 'print("Hello, World!")',
            hint: 'print() 함수를 사용합니다'
        },
        {
            title: 'Python 리스트 합계',
            description: '[1, 2, 3, 4, 5] 리스트의 합계를 구하는 코드를 작성하세요.\n\n힌트: sum() 함수 사용',
            subject: 'PYTHON',
            difficulty: 'MEDIUM',
            points: 20,
            answer: 'sum([1, 2, 3, 4, 5])',
            hint: 'sum() 함수를 사용합니다'
        },
        // C언어
        {
            title: 'C언어 Hello World',
            description: '다음 중 C언어에서 "Hello"를 출력하는 올바른 코드는?\n\n정답: printf("Hello");',
            subject: 'C_LANG',
            difficulty: 'EASY',
            points: 10,
            answer: 'printf("Hello");',
            hint: 'printf 함수를 사용합니다'
        },
        {
            title: 'C언어 정수형 변수',
            description: '정수 5를 저장하는 int형 변수 a를 선언하세요.',
            subject: 'C_LANG',
            difficulty: 'EASY',
            points: 10,
            answer: 'int a = 5;',
            hint: '자료형 변수명 = 값; 형태입니다'
        },
        // 알고리즘
        {
            title: '피보나치 수열',
            description: '피보나치 수열의 5번째 항은? (1, 1, 2, 3, ?)',
            subject: 'ALGORITHM',
            difficulty: 'EASY',
            points: 10,
            answer: '5',
            hint: '앞의 두 항을 더하면 됩니다'
        },
        {
            title: '시간 복잡도',
            description: '배열에서 특정 원소를 찾는 선형 탐색의 시간 복잡도는? (빅오 표기법)',
            subject: 'ALGORITHM',
            difficulty: 'MEDIUM',
            points: 20,
            answer: 'O(n)',
            hint: '최악의 경우 모든 원소를 확인해야 합니다'
        },
        // 스크래치
        {
            title: '스크래치 반복',
            description: '스크래치에서 10번 반복하려면 어떤 블록을 사용하나요?',
            subject: 'SCRATCH',
            difficulty: 'EASY',
            points: 10,
            answer: '10번 반복하기',
            hint: '제어 카테고리에 있습니다'
        }
    ];

    for (const problem of problems) {
        await prisma.problem.upsert({
            where: {
                id: problem.title.replace(/\s/g, '-').toLowerCase()
            },
            update: problem,
            create: problem
        });
    }
    console.log(`✅ Created ${problems.length} sample problems`);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
