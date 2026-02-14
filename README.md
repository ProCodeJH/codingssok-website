# 코딩쏙 통합 플랫폼 (CodingSSok Platform)

> AI 시대 역량을 '쏙' 채우는 코딩학원 통합 관리 플랫폼

## 🏗️ 기술 스택

- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **React**: 19
- **CSS**: Tailwind v4 + 커스텀 CSS Variables (다크 테마)
- **Backend**: Supabase (Auth, Database, Storage)
- **배포**: Vercel

## 📁 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃 (SEO 메타)
│   ├── page.tsx            # 랜딩 페이지
│   ├── login/              # 로그인
│   ├── signup/             # 회원가입
│   ├── not-found.tsx       # 커스텀 404
│   ├── sitemap.ts          # XML Sitemap
│   ├── robots.ts           # robots.txt
│   ├── api/
│   │   └── telemetry/compiler/route.ts  # C-Studio 텔레메트리 API
│   └── dashboard/
│       ├── layout.tsx      # 대시보드 레이아웃 (사이드바)
│       ├── page.tsx        # 메인 대시보드 + 위젯
│       ├── classes/        # 반 관리 (목록 + 상세)
│       ├── homework/       # 숙제 (목록 + 생성 + 상세)
│       ├── stats/[studentId]/ # 코딩 통계 (차트)
│       ├── learn/          # 교재 (7트랙 + iframe 뷰어)
│       ├── pc/             # PC 관리
│       └── children/       # 학부모 포털
├── lib/
│   ├── supabase/
│   │   ├── client.ts       # 브라우저 Supabase 클라이언트
│   │   ├── server.ts       # 서버 Supabase 클라이언트
│   │   └── types.ts        # DB 타입 (미래용)
│   └── actions/
│       ├── classes.ts      # 반 CRUD
│       ├── sessions.ts     # 수업 기록
│       ├── members.ts      # 반 멤버 관리
│       ├── homework.ts     # 숙제 출제/제출/채점
│       ├── stats.ts        # 코딩 통계
│       └── learning.ts     # 교재 진도
└── middleware.ts           # 인증 미들웨어
```

## 🚀 시작하기

```bash
# 1. 의존성 설치
npm install

# 2. 환경변수 설정 (.env.local)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# 3. DB 마이그레이션 (Supabase SQL Editor에서 실행)
# → supabase/migration.sql 파일 내용 복사 후 실행

# 4. 개발 서버 실행
npm run dev
```

## 📋 구현 완료 Phase

| Phase | 기능                                       | 라우트                                             |
| ----- | ------------------------------------------ | -------------------------------------------------- |
| 1     | 인증 + 대시보드 기초                       | `/login`, `/signup`, `/dashboard`                  |
| 2     | 수업 관리 (반 CRUD, 수업기록, 학생관리)    | `/dashboard/classes`, `.../[id]`                   |
| 3     | 숙제 시스템 (출제, 제출, 채점, 파일업로드) | `/dashboard/homework`, `.../new`, `.../[id]`       |
| 4     | C-Studio 연동 (텔레메트리 API, 코딩통계)   | `/api/telemetry/compiler`, `/dashboard/stats/[id]` |
| 5     | HTML 교재 (7트랙, iframe 뷰어, 진도추적)   | `/dashboard/learn`, `.../[contentId]`              |
| 6     | PC관리, 학부모, SEO, 404                   | `/dashboard/pc`, `/dashboard/children`             |

## 🗄️ DB 테이블 (Supabase)

`profiles`, `classes`, `class_members`, `session_logs`, `homework`, `submissions`, `compiler_activities`, `learning_progress`, `parent_children`

→ 상세: `supabase/migration.sql`

## 🎨 디자인 시스템

- 다크 테마 (`--color-bg-dark: #0a0a1a`)
- 글래스모피즘 (`.glass-premium`)
- 그라디언트 프라이머리 (`#0066FF → #00E5FF`)
- 역할별 UI: 학생/선생님/학부모

## 🔑 역할별 기능

| 역할   | 접근 페이지                                            |
| ------ | ------------------------------------------------------ |
| 학생   | 대시보드, 수업, 숙제, 교재, 코딩통계, C-Studio         |
| 선생님 | 대시보드, 반관리, 수업기록, 숙제관리, 학습현황, PC관리 |
| 학부모 | 대시보드, 자녀 학습현황                                |

## ⚙️ AI 이어서 작업하기

이 프로젝트를 AI와 이어서 작업할 때 아래 정보를 참고:

- **Supabase 프로젝트**: `mkihwheknuioouccevet` (Asia-Pacific)
- **관련 문서**: `codingssok-platform-doc/codingssok-unified-document-v3.html`
- **빌드 확인**: `npm run build` (16 routes, 2.3s)
- **Server Actions 패턴**: `src/lib/actions/` — 모든 데이터 로직이 여기에
- **Supabase 클라이언트**: Database 제네릭 제거됨 (타입은 `any` 반환)
