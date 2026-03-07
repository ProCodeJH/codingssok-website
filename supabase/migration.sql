-- ═══════════════════════════════════════════════════════════════
-- 코딩쏙 통합 플랫폼 — Supabase Migration (전체)
-- Supabase SQL Editor에서 이 파일 전체를 복사하여 실행하세요.
-- ═══════════════════════════════════════════════════════════════

-- ─── 1. 프로필 ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  email TEXT,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'parent', 'admin')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- auth.users 생성 시 자동으로 profiles 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ─── 2. 반 (Classes) ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  teacher_id UUID REFERENCES profiles(id),
  schedule TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 3. 반 멤버 ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS class_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(class_id, student_id)
);

-- ─── 4. 수업 기록 ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS session_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 5. 숙제 ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS homework (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id UUID REFERENCES classes(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  max_score INTEGER DEFAULT 100,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ─── 6. 숙제 제출 ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  homework_id UUID REFERENCES homework(id) ON DELETE CASCADE,
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT,
  file_url TEXT,
  score INTEGER,
  feedback TEXT,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  graded_at TIMESTAMPTZ,
  UNIQUE(homework_id, student_id)
);

-- ─── 7. 컴파일러 활동 (C-Studio 텔레메트리) ──────────────────
CREATE TABLE IF NOT EXISTS compiler_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN ('success', 'error')),
  error_message TEXT,
  code_snippet TEXT,
  execution_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_compiler_student_date
  ON compiler_activities(student_id, created_at DESC);

-- ─── 8. 학습 진도 ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS learning_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content_id TEXT NOT NULL,
  track_id TEXT NOT NULL,
  progress INTEGER DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  completed BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, content_id)
);

-- ─── 9. 학부모-자녀 연결 ──────────────────────────────────────
CREATE TABLE IF NOT EXISTS parent_children (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  child_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(parent_id, child_id)
);

-- ─── 10. RLS (Row Level Security) ─────────────────────────────
-- profiles: 본인 읽기/수정, 선생님 전체 읽기
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Teachers can view all profiles" ON profiles FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'teacher'));

-- classes: 선생님 CRUD, 학생 읽기(소속 반)
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage classes" ON classes FOR ALL
  USING (teacher_id = auth.uid());
CREATE POLICY "Students view their classes" ON classes FOR SELECT
  USING (EXISTS (SELECT 1 FROM class_members WHERE class_id = classes.id AND student_id = auth.uid()));

-- class_members: 선생님 관리, 학생 읽기
ALTER TABLE class_members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage members" ON class_members FOR ALL
  USING (EXISTS (SELECT 1 FROM classes WHERE id = class_members.class_id AND teacher_id = auth.uid()));
CREATE POLICY "Students view own membership" ON class_members FOR SELECT
  USING (student_id = auth.uid());

-- homework: 선생님 CRUD, 학생 읽기
ALTER TABLE homework ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage homework" ON homework FOR ALL
  USING (created_by = auth.uid());
CREATE POLICY "Students view homework" ON homework FOR SELECT
  USING (EXISTS (SELECT 1 FROM class_members WHERE class_id = homework.class_id AND student_id = auth.uid()));

-- submissions: 본인 읽기/쓰기, 선생님 읽기/채점
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students manage own submissions" ON submissions FOR ALL
  USING (student_id = auth.uid());
CREATE POLICY "Teachers view submissions" ON submissions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM homework h
    JOIN classes c ON c.id = h.class_id
    WHERE h.id = submissions.homework_id AND c.teacher_id = auth.uid()
  ));
CREATE POLICY "Teachers grade submissions" ON submissions FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM homework h
    JOIN classes c ON c.id = h.class_id
    WHERE h.id = submissions.homework_id AND c.teacher_id = auth.uid()
  ));

-- compiler_activities: 본인 쓰기/읽기, 선생님 읽기
ALTER TABLE compiler_activities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students manage own activities" ON compiler_activities FOR ALL
  USING (student_id = auth.uid());
CREATE POLICY "Teachers view activities" ON compiler_activities FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'teacher'));

-- learning_progress: 본인 CRUD, 선생님 읽기
ALTER TABLE learning_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Students manage own progress" ON learning_progress FOR ALL
  USING (student_id = auth.uid());
CREATE POLICY "Teachers view progress" ON learning_progress FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'teacher'));

-- parent_children: 본인 읽기
ALTER TABLE parent_children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Parents view own children" ON parent_children FOR SELECT
  USING (parent_id = auth.uid());

-- session_logs: 선생님 CRUD, 학생 읽기
ALTER TABLE session_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage logs" ON session_logs FOR ALL
  USING (created_by = auth.uid());
CREATE POLICY "Students view logs" ON session_logs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM class_members WHERE class_id = session_logs.class_id AND student_id = auth.uid()
  ));

-- ─── 11. 상담 문의 ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  student_age TEXT,
  interest_track TEXT,
  message TEXT,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- contact_inquiries: 누구나 INSERT(비로그인 포함), 선생님/관리자만 읽기
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiry" ON contact_inquiries FOR INSERT
  WITH CHECK (true);
CREATE POLICY "Teachers can view inquiries" ON contact_inquiries FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')));
CREATE POLICY "Teachers can update inquiries" ON contact_inquiries FOR UPDATE
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')));

-- ─── 12. PC 세션 ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pc_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pc_name TEXT NOT NULL,
  student_id UUID REFERENCES profiles(id),
  ip_address TEXT,
  status TEXT DEFAULT 'offline' CHECK (status IN ('online', 'offline', 'locked')),
  last_screenshot_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE pc_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers manage PC sessions" ON pc_sessions FOR ALL
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')));

-- ─── 13. PC 활동 로그 ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS pc_activity_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pc_session_id UUID REFERENCES pc_sessions(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  app_name TEXT,
  url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE pc_activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Teachers view PC logs" ON pc_activity_logs FOR SELECT
  USING (EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('teacher', 'admin')));

-- ─── 14. homework에 status 컬럼 추가 (없으면) ──────────────
DO $$ BEGIN
  ALTER TABLE homework ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active'
    CHECK (status IN ('draft', 'active', 'closed'));
EXCEPTION WHEN others THEN NULL;
END $$;

-- ─── 15. Storage Bucket ─────────────────────────────────────
-- Supabase Dashboard > Storage에서 'homework-submissions' 버킷을 수동 생성하세요.
-- Public 접근: ON (제출 파일 다운로드용)

-- ─── 16. 학부모: 자녀의 정보 조회 허용 ─────────────────────
CREATE POLICY "Parents view children profiles" ON profiles FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM parent_children WHERE parent_id = auth.uid() AND child_id = profiles.id
  ));
CREATE POLICY "Parents view children classes" ON class_members FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM parent_children WHERE parent_id = auth.uid() AND child_id = class_members.student_id
  ));
CREATE POLICY "Parents view children homework" ON submissions FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM parent_children WHERE parent_id = auth.uid() AND child_id = submissions.student_id
  ));
CREATE POLICY "Parents view children activities" ON compiler_activities FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM parent_children WHERE parent_id = auth.uid() AND child_id = compiler_activities.student_id
  ));
CREATE POLICY "Parents view children progress" ON learning_progress FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM parent_children WHERE parent_id = auth.uid() AND child_id = learning_progress.student_id
  ));
CREATE POLICY "Parents view session logs" ON session_logs FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM class_members cm
    JOIN parent_children pc ON pc.child_id = cm.student_id
    WHERE cm.class_id = session_logs.class_id AND pc.parent_id = auth.uid()
  ));

-- ═══════════════════════════════════════════════════════════════
-- 완료! 모든 테이블, RLS 정책, 트리거가 생성되었습니다.
-- ═══════════════════════════════════════════════════════════════
