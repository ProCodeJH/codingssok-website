const ko = {
    common: {
        loading: '로딩 중...',
        error: '오류가 발생했습니다',
        retry: '다시 시도',
        home: '홈으로 이동',
        back: '뒤로',
        next: '다음',
        prev: '이전',
        save: '저장',
        cancel: '취소',
        delete: '삭제',
        edit: '수정',
        confirm: '확인',
        close: '닫기',
    },
    auth: {
        login: '로그인',
        logout: '로그아웃',
        name: '이름',
        pin: '비밀번호 (숫자 4자리)',
        loginButton: '시작하기',
        loginLoading: '로그인 중...',
        signupComplete: '가입 완료! 로그인 중...',
        wrongPin: '비밀번호가 틀렸습니다',
        nameRequired: '이름을 입력해주세요',
        pinRequired: '비밀번호 4자리를 입력해주세요',
        rateLimited: '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.',
    },
    dashboard: {
        learning: '학습',
        compiler: 'C-Studio',
        homework: '숙제',
        problems: '문제',
        profile: '프로필',
        materials: '자료실',
    },
    xp: {
        attendance: '출석체크',
        homeworkSubmit: '숙제 제출',
        lessonComplete: '레슨 완료',
        dailyMission: '데일리 미션',
        codeSubmit: '코드 제출',
    },
    errors: {
        notFound: '페이지를 찾을 수 없습니다',
        offline: '오프라인 상태입니다',
        serverError: '서버 오류가 발생했습니다',
    },
}

export default ko
export type Locale = typeof ko
