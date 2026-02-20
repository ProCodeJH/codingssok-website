-- ============================================================
-- 관리자 계정 설정
-- louispetergu@naver.com → admin role
-- ============================================================

-- profiles 테이블에서 role을 admin으로 변경
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'louispetergu@naver.com';

-- 혹시 email이 없으면 auth.users에서 조회해서 설정
UPDATE public.profiles
SET role = 'admin'
WHERE id = (
  SELECT id FROM auth.users WHERE email = 'louispetergu@naver.com' LIMIT 1
);

-- 확인 쿼리
SELECT id, name, email, role FROM public.profiles
WHERE email = 'louispetergu@naver.com'
   OR id = (SELECT id FROM auth.users WHERE email = 'louispetergu@naver.com' LIMIT 1);
