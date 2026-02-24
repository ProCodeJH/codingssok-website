-- ═══════════════════════════════════════
-- 프로필 테이블 생성 + 관리자 등록
-- Supabase SQL Editor에서 실행해주세요
-- ═══════════════════════════════════════

-- 1. profiles 테이블 생성
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    display_name TEXT,
    email TEXT,
    role TEXT DEFAULT 'student',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. RLS 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. 정책 설정
CREATE POLICY "profiles_read" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (true);

-- 4. 구자현 관리자 등록
INSERT INTO public.profiles (id, display_name, email, role)
SELECT id, '구자현', email, 'admin'
FROM auth.users
WHERE email = 'louispetergu@naver.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin', display_name = '구자현';
