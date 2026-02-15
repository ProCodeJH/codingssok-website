-- 코딩쏙 LMS Database Schema
-- Supabase Migration

-- 학생 프로필
CREATE TABLE IF NOT EXISTS profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email TEXT NOT NULL,
    name TEXT,
    phone TEXT,
    grade TEXT, -- 학년
    track TEXT, -- 트랙 (thinking-math, physical, software, project, red)
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 학습 진행률
CREATE TABLE IF NOT EXISTS learning_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL, -- c-lang, html-css, algorithm, python 등
    lesson_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    score INT DEFAULT 0,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 코드 저장 (컴파일러 히스토리)
CREATE TABLE IF NOT EXISTS code_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    language TEXT NOT NULL DEFAULT 'c',
    code TEXT NOT NULL,
    output TEXT,
    status TEXT DEFAULT 'success', -- success, compile_error, runtime_error
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 숙제
CREATE TABLE IF NOT EXISTS homework (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    subject TEXT NOT NULL,
    due_date DATE,
    assigned_to UUID REFERENCES profiles(id),
    assigned_by TEXT DEFAULT 'teacher',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 숙제 제출
CREATE TABLE IF NOT EXISTS homework_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    homework_id UUID REFERENCES homework(id) ON DELETE CASCADE,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT,
    file_url TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW(),
    grade TEXT, -- 평가
    feedback TEXT -- 선생님 피드백
);

-- 수업 노트
CREATE TABLE IF NOT EXISTS notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS 정책
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
ALTER TABLE homework_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- 프로필: 본인만 읽기/수정
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- 학습 진행률: 본인만
CREATE POLICY "Users can view own progress" ON learning_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON learning_progress FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON learning_progress FOR UPDATE USING (auth.uid() = user_id);

-- 코드 제출: 본인만
CREATE POLICY "Users can view own submissions" ON code_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own submissions" ON code_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 숙제: 본인 것만 조회
CREATE POLICY "Users can view own homework" ON homework FOR SELECT USING (auth.uid() = assigned_to);

-- 숙제 제출: 본인만
CREATE POLICY "Users can view own hw submissions" ON homework_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can submit own hw" ON homework_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 노트: 본인만
CREATE POLICY "Users can view own notes" ON notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notes" ON notes FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notes" ON notes FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notes" ON notes FOR DELETE USING (auth.uid() = user_id);

-- 새 사용자 가입 시 프로필 자동 생성 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email)
    VALUES (NEW.id, NEW.email);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
