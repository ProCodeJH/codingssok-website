/**
 * 컴퓨터 기초 — 챕터 데이터
 * 5개 유닛: 컴퓨터 소개, 하드웨어, 비트, 2진수/10진수, 8진수/16진수
 */

import type { Chapter } from './types';

export const COMPUTER_BASICS: Chapter[] = [
    {
        id: 'cb-ch01',
        chapterNumber: 1,
        title: '컴퓨터 기초',
        icon: '',
        description: '컴퓨터의 기본 구성, 데이터 표현, 진법 변환을 배웁니다.',
        units: [
    {
        id: 'cb-u01',
        unitNumber: 1,
        title: `컴퓨터는 뭘 할 수 있을까?`,
        type: '이론' as const,
        problems: [],
        pages: [
            {
                id: 'cb-u01-p1',
                title: `컴퓨터는 뭘 할 수 있을까?`,
                type: '페이지' as const,
                content: `<style>
/* ═══════════════════════════════════════════════════════════════
   코딩쏙 프리미엄 PDF 교재 스타일시트 v5.0
   Paged.js + A4 인쇄 최적화 + 아동교육 디자인 시스템
   ═══════════════════════════════════════════════════════════════ */

/* ── 리셋 & 기본 ── */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --c-primary: #FF6B6B;
  --c-primary-light: #FFE8E8;
  --c-primary-dark: #E84545;
  --c-accent: #4ECDC4;
  --c-accent-light: #E8FFF9;
  --c-blue: #3B82F6;
  --c-blue-light: #EFF6FF;
  --c-purple: #8B5CF6;
  --c-purple-light: #F5F3FF;
  --c-orange: #F59E0B;
  --c-orange-light: #FFFBEB;
  --c-green: #10B981;
  --c-green-light: #ECFDF5;
  --c-red: #EF4444;
  --c-red-light: #FEF2F2;
  --c-teal: #14B8A6;
  --c-teal-light: #F0FDFA;
  --c-pink: #EC4899;
  --c-text: #1E293B;
  --c-text-secondary: #64748B;
  --c-text-muted: #94A3B8;
  --c-border: #E2E8F0;
  --c-bg-subtle: #F8FAFC;
  --c-bg-warm: #FFFBF5;
  --font-body: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-code: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.10);
}

/* ── 페이지 설정 ── */
@page {
  size: A4;
  margin: 18mm 17mm 15mm 22mm;
  @bottom-center {
    content: counter(page);
    font-family: var(--font-body);
    font-size: 9pt;
    color: var(--c-text-muted);
    letter-spacing: 1px;
  }
}
@page :first { @bottom-center { content: none; } }

body {
  font-family: var(--font-body);
  color: var(--c-text);
  background: white;
  font-size: 11.5pt;
  line-height: 180%;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ── 페이지 제어 ── */
.avoid-break { break-inside: avoid !important; page-break-inside: avoid !important; }
h2, h3 { break-after: avoid !important; page-break-after: avoid !important; }
.page-break-hint { break-before: page !important; page-break-before: always !important; height: 0; margin: 0; padding: 0; }
p { orphans: 3; widows: 3; }

/* ═══════════════════════════════════════
   레슨 헤더 — 프리미엄 그래디언트 배너
   ═══════════════════════════════════════ */
.lesson-header {
  margin-bottom: 6mm;
  padding: 6mm 5mm 5mm;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FEC89A 100%);
  border-radius: var(--radius-xl);
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.lesson-header::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -10%;
  width: 140px;
  height: 140px;
  background: rgba(255,255,255,0.12);
  border-radius: 50%;
}
.lesson-header::after {
  content: '';
  position: absolute;
  bottom: -20%;
  left: 15%;
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
}
.lesson-number {
  font-size: 10pt;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin-bottom: 2mm;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}
.lesson-title {
  font-size: 24pt;
  font-weight: 900;
  line-height: 125%;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.15);
  position: relative;
  z-index: 1;
}
.lesson-summary {
  font-size: 11pt;
  color: rgba(255,255,255,0.9);
  margin-top: 2.5mm;
  font-weight: 400;
  position: relative;
  z-index: 1;
}

/* ═══════════════════════════════════════
   제목 계층 — 프리미엄 타이포그래피
   ═══════════════════════════════════════ */
h2 {
  font-size: 16pt;
  font-weight: 800;
  margin: 6mm 0 3mm;
  padding: 2mm 0 2mm 4.5mm;
  border-left: 4.5px solid var(--c-primary);
  color: var(--c-text);
  background: linear-gradient(90deg, var(--c-primary-light) 0%, transparent 60%);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  letter-spacing: -0.3px;
}
h3 {
  font-size: 13.5pt;
  font-weight: 700;
  color: #334155;
  margin: 4mm 0 2.5mm;
  padding-bottom: 1mm;
  border-bottom: 2px solid #F1F5F9;
}
p {
  margin-bottom: 2.5mm;
  text-align: justify;
  line-height: 175%;
  font-size: 11.5pt;
}

/* ── 인라인 코드 ── */
code {
  font-family: var(--font-code);
  font-size: 9.5pt;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  padding: 0.5mm 2mm;
  border-radius: 4px;
  color: #92400E;
  border: 1px solid #FCD34D;
  font-weight: 500;
}

/* ═══════════════════════════════════════
   코드 블록 — 프리미엄 IDE 스타일
   ═══════════════════════════════════════ */
.code-block {
  background: #0F172A;
  border-radius: var(--radius-md);
  padding: 0;
  margin: 3mm 0;
  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.05);
  overflow: hidden;
  border: 1px solid #1E293B;
}
.code-block-header {
  font-family: var(--font-body);
  font-size: 8.5pt;
  font-weight: 600;
  color: #94A3B8;
  padding: 2.5mm 4.5mm;
  background: #1E293B;
  border-bottom: 1px solid #334155;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.code-block-header::before {
  content: '';
  display: inline-flex;
  width: 8px; height: 8px;
  background: #EF4444;
  border-radius: 50%;
  box-shadow: 14px 0 0 #F59E0B, 28px 0 0 #22C55E;
  flex-shrink: 0;
}
.code-table { width: 100%; border-collapse: collapse; }
.code-table td { vertical-align: top; padding: 0; }
.line-num {
  width: 10mm;
  text-align: right;
  padding: 0.5mm 3mm 0.5mm 0;
  font-family: var(--font-code);
  font-size: 8pt;
  color: #475569;
  line-height: 165%;
  user-select: none;
  background: rgba(0,0,0,0.15);
}
.line-code {
  font-family: var(--font-code);
  font-size: 10pt;
  color: #E2E8F0;
  line-height: 165%;
  padding: 0.5mm 4mm 0.5mm 3mm;
  white-space: pre;
}
.line-highlight td { background: rgba(59,130,246,0.12) !important; }
.line-highlight .line-num { color: var(--c-blue) !important; font-weight: 700; }

/* 신택스 컬러 — VS Code Dark+ 영감 */
.kw { color: #C084FC; font-weight: 500; }
.str { color: #86EFAC; }
.cmt { color: #6B7280; font-style: italic; }
.fn { color: #FDBA74; }
.pp { color: #F472B6; font-weight: 600; }
.num { color: #7DD3FC; }
.type { color: #5EEAD4; font-weight: 500; }
.mc { color: #67E8F9; }
.esc { color: #FCD34D; font-weight: 600; }
.fmt { color: #FCD34D; }

/* ═══════════════════════════════════════
   실행 결과 — 터미널 스타일
   ═══════════════════════════════════════ */
.output-block {
  background: #F0FDF4;
  border: 1.5px solid #86EFAC;
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin: 3mm 0;
  position: relative;
}
.output-label {
  font-family: var(--font-body);
  font-size: 8.5pt;
  color: var(--c-green);
  display: block;
  margin-bottom: 1.5mm;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.output-text {
  font-family: var(--font-code);
  font-size: 10.5pt;
  line-height: 160%;
  color: #166534;
}

/* ═══════════════════════════════════════
   박스 시스템 — 프리미엄 카드 디자인
   ═══════════════════════════════════════ */
.box {
  border-radius: var(--radius-md);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  position: relative;
  box-shadow: var(--shadow-sm);
}
.box-label {
  font-size: 10.5pt;
  font-weight: 800;
  margin-bottom: 2mm;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.box-content { font-size: 11pt; line-height: 170%; }
.box-warning {
  border-left: 5px solid var(--c-red);
  background: linear-gradient(135deg, #FEF2F2 0%, #FFF1F2 100%);
}
.box-warning .box-label { color: var(--c-red); }
.box-key {
  border-left: 5px solid var(--c-blue);
  background: linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%);
}
.box-key .box-label { color: var(--c-blue); }
.box-tip {
  border-left: 5px solid var(--c-orange);
  background: linear-gradient(135deg, #FFFBEB 0%, #FEF9C3 50%, #FFFBEB 100%);
}
.box-tip .box-label { color: var(--c-orange); }
.box-summary {
  border-left: 5px solid var(--c-green);
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border: 1.5px solid #A7F3D0;
  border-left: 5px solid var(--c-green);
}
.box-summary .box-label { color: var(--c-green); }
.box-question {
  border-left: 5px solid var(--c-purple);
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
}
.box-question .box-label { color: var(--c-purple); }
.box-history {
  border-left: 5px solid var(--c-teal);
  background: linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%);
}
.box-history .box-label { color: var(--c-teal); }

/* ═══════════════════════════════════════
   연습문제 — 프리미엄 카드
   ═══════════════════════════════════════ */
.exercise {
  background: white;
  border: 1.5px solid #E2E8F0;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  border-left: 5px solid var(--c-primary);
  box-shadow: var(--shadow-sm);
  position: relative;
}
.exercise-title {
  font-size: 13pt;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 2.5mm;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.difficulty {
  display: inline-flex;
  align-items: center;
  font-size: 8pt;
  padding: 0.5mm 2.5mm;
  border-radius: 20px;
  margin-left: 2mm;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.diff-1 { background: #D1FAE5; color: #059669; }
.diff-2 { background: #FEF3C7; color: #D97706; }
.diff-3 { background: #FEE2E2; color: #DC2626; }
.memo-area {
  border: 2px dashed #CBD5E1;
  border-radius: var(--radius-md);
  padding: 3mm;
  min-height: 15mm;
  margin-top: 2.5mm;
  background: repeating-linear-gradient(
    transparent, transparent 7mm, #F1F5F9 7mm, #F1F5F9 7.5mm
  );
}
.memo-label { font-size: 8.5pt; color: var(--c-text-muted); font-style: italic; }

/* ── OX/Choice/Short ── */
.exercise-answer {
  font-size: 10pt;
  color: var(--c-green);
  margin-top: 2mm;
  padding: 1.5mm 3mm;
  background: var(--c-green-light);
  border-radius: var(--radius-sm);
  font-weight: 600;
  border: 1px solid #A7F3D0;
}
.exercise-explain {
  font-size: 9.5pt;
  color: var(--c-text-secondary);
  margin-top: 1.5mm;
  padding: 2mm 3mm;
  background: #F8FAFC;
  border-radius: var(--radius-sm);
  border-left: 3px solid #E2E8F0;
}
.choice-list { padding-left: 6mm; margin: 2mm 0; }
.choice-list li { font-size: 10.5pt; margin-bottom: 1.5mm; line-height: 150%; }
.choice-list li.choice-correct { color: var(--c-green); font-weight: 700; }

/* ═══════════════════════════════════════
   Before/After 비교 — 프리미엄 2컬럼
   ═══════════════════════════════════════ */
.compare {
  display: flex;
  gap: 3mm;
  margin: 3mm 0;
  overflow: hidden;
}
.compare-bad {
  flex: 1;
  min-width: 0;
  background: linear-gradient(135deg, #FEF2F2, #FFF1F2);
  border: 1.5px solid #FECACA;
  border-radius: var(--radius-md);
  padding: 3mm;
  overflow: hidden;
}
.compare-good {
  flex: 1;
  min-width: 0;
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border: 1.5px solid #A7F3D0;
  border-radius: var(--radius-md);
  padding: 3mm;
  overflow: hidden;
}
.compare code {
  font-size: 9pt;
  word-break: break-all;
  overflow-wrap: break-word;
  display: block;
  background: rgba(0,0,0,0.05);
  padding: 2mm 3mm;
  border-radius: var(--radius-sm);
  margin: 1.5mm 0;
  line-height: 155%;
  white-space: pre-wrap;
  border: none;
  color: inherit;
}
.compare-label { font-size: 9.5pt; font-weight: 800; margin-bottom: 1.5mm; }
.compare-bad .compare-label { color: var(--c-red); }
.compare-good .compare-label { color: var(--c-green); }
.compare-msg-bad { font-size: 9pt; color: var(--c-red); }
.compare-msg-good { font-size: 9pt; color: var(--c-green); }

/* ═══════════════════════════════════════
   챕터 시작 — 프리미엄 카드
   ═══════════════════════════════════════ */
.chapter-start-box { margin-bottom: 3mm; }
.learning-goals {
  background: linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 100%);
  border-radius: var(--radius-lg);
  padding: 4mm 5mm;
  margin-bottom: 3mm;
  border: 1.5px solid #FED7AA;
  box-shadow: var(--shadow-sm);
}
.learning-goals h3 {
  font-size: 12pt;
  font-weight: 800;
  color: #EA580C;
  margin: 0 0 2.5mm;
  border: none;
  padding: 0;
}
.learning-goals ul { padding-left: 5mm; margin: 0; }
.learning-goals li { font-size: 11pt; margin-bottom: 1.5mm; line-height: 160%; color: #431407; }
.prereq-check {
  background: var(--c-blue-light);
  border-left: 5px solid var(--c-blue);
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin-bottom: 2.5mm;
}
.prereq-check h3 {
  font-size: 11pt;
  font-weight: 700;
  color: var(--c-blue);
  margin: 0 0 1.5mm;
  border: none;
  padding: 0;
}
.checklist { list-style: none; padding-left: 4mm; margin: 0; }
.checklist li { margin-bottom: 1mm; font-size: 10.5pt; }
.checklist li::before { content: '\\2610  '; font-size: 12pt; color: var(--c-text-muted); }
.progress-section { margin-top: 2.5mm; }
.progress-label { font-size: 9.5pt; color: var(--c-text-secondary); font-weight: 600; }
.progress-bar {
  background: #E2E8F0;
  border-radius: 6px;
  height: 4mm;
  margin-top: 1.5mm;
  overflow: hidden;
}
.progress-fill {
  background: linear-gradient(90deg, var(--c-primary), #FF8E53, #FEC89A);
  height: 100%;
  border-radius: 6px;
}

/* ═══════════════════════════════════════
   Predict — 생각해보기 카드
   ═══════════════════════════════════════ */
.predict-box {
  display: flex;
  gap: 3.5mm;
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
  border: 1.5px solid #C4B5FD;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  box-shadow: var(--shadow-sm);
}
.predict-icon {
  width: 10mm; height: 10mm;
  background: linear-gradient(135deg, var(--c-purple), #A78BFA);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16pt;
  font-weight: 900;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(139,92,246,0.3);
}
.predict-content { flex: 1; }
.predict-content p { font-size: 11pt; margin-bottom: 2mm; }

/* ═══════════════════════════════════════
   다이어그램 — 프리미엄 컨테이너
   ═══════════════════════════════════════ */
.diagram-box {
  background: var(--c-bg-subtle);
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 4mm;
  margin: 3.5mm 0;
  box-shadow: var(--shadow-sm);
}
.diagram-title {
  font-size: 11pt;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 3mm;
  text-align: center;
  letter-spacing: 0.3px;
}
.diagram-content { font-size: 10.5pt; line-height: 170%; }
.diagram-content .d-row { display: flex; align-items: center; justify-content: center; gap: 3mm; margin: 2mm 0; }
.diagram-content .d-block { background: #1E293B; color: white; padding: 2mm 4mm; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 9.5pt; font-weight: 500; }
.diagram-content .d-block-highlight { background: linear-gradient(135deg, var(--c-primary), #FF8E53); color: white; padding: 2mm 4mm; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 9.5pt; font-weight: 700; }
.diagram-content .d-arrow { color: var(--c-text-muted); font-size: 14pt; }
.diagram-content .d-label { font-size: 8.5pt; color: var(--c-text-secondary); }

/* ═══════════════════════════════════════
   Steps — 프리미엄 타임라인
   ═══════════════════════════════════════ */
.steps-visual { margin: 3mm 0; }
.step-item {
  display: flex;
  align-items: flex-start;
  gap: 3.5mm;
  margin-bottom: 1.5mm;
}
.step-num {
  width: 8mm; height: 8mm;
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10pt;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 0.5mm;
  box-shadow: 0 2px 4px rgba(255,107,107,0.3);
}
.step-body { flex: 1; }
.step-title { font-size: 11pt; font-weight: 700; margin-bottom: 0.5mm; color: var(--c-text); }
.step-desc { font-size: 10.5pt; color: var(--c-text-secondary); line-height: 160%; }
.step-connector { width: 2.5px; height: 4mm; background: linear-gradient(180deg, var(--c-primary), transparent); margin-left: 3.7mm; }

/* ═══════════════════════════════════════
   Modify — 바꿔보기 카드
   ═══════════════════════════════════════ */
.modify-box {
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  border: 1.5px solid #7DD3FC;
  border-left: 5px solid #0EA5E9;
  border-radius: var(--radius-md);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
}
.modify-label { font-size: 10.5pt; font-weight: 800; color: #0284C7; margin-bottom: 2mm; }
.modify-hint { font-size: 9.5pt; color: var(--c-text-secondary); font-style: italic; margin: 1.5mm 0; }

/* ═══════════════════════════════════════
   정답 섹션
   ═══════════════════════════════════════ */
.answers-section {
  background: white;
  border: 1.5px solid #E9D5FF;
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin: 3mm 0;
  border-left: 5px solid var(--c-purple);
}
.answers-section h3 {
  font-size: 12pt;
  font-weight: 800;
  color: var(--c-purple);
  margin: 0 0 2.5mm;
  border: none;
  padding: 0;
}
.answer-item { margin-bottom: 1mm; font-size: 10pt; line-height: 150%; }
.answer-num { font-weight: 700; color: var(--c-primary); margin-right: 2mm; }
.answer-text { color: var(--c-text); }

/* ═══════════════════════════════════════
   코드 설명 (라인별)
   ═══════════════════════════════════════ */
.code-explain { margin: 3mm 0; padding-left: 2mm; }
.code-explain-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.5mm;
  font-size: 11pt;
  line-height: 165%;
}
.code-explain-line {
  font-family: var(--font-code);
  font-size: 9pt;
  color: white;
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  padding: 0.5mm 2.5mm;
  border-radius: 4px;
  margin-right: 3mm;
  flex-shrink: 0;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(255,107,107,0.3);
}

/* ═══════════════════════════════════════
   용어 정리 — 프리미엄 테이블
   ═══════════════════════════════════════ */
.glossary { margin: 3mm 0; break-inside: avoid; }
.glossary-item {
  display: flex;
  margin-bottom: 0;
  font-size: 10pt;
  padding: 2mm 3mm;
  border-bottom: 1px solid #F1F5F9;
}
.glossary-item:nth-child(odd) { background: #F8FAFC; }
.glossary-item:first-child { border-radius: var(--radius-sm) var(--radius-sm) 0 0; }
.glossary-item:last-child { border-radius: 0 0 var(--radius-sm) var(--radius-sm); border-bottom: none; }
.glossary-term {
  font-weight: 700;
  min-width: 28mm;
  flex-shrink: 0;
  color: var(--c-text);
  font-family: var(--font-code);
  font-size: 9.5pt;
}
.glossary-def { color: var(--c-text-secondary); line-height: 155%; }

/* ═══════════════════════════════════════
   추적 테이블 — 프리미엄 데이터 테이블
   ═══════════════════════════════════════ */
.trace-table { margin: 3.5mm 0; }
.trace-caption { font-size: 10.5pt; font-weight: 700; color: var(--c-primary); margin-bottom: 2mm; }
.trace-table table { width: 100%; border-collapse: collapse; font-size: 10pt; border-radius: var(--radius-sm); overflow: hidden; }
.trace-table th {
  background: linear-gradient(135deg, #1E293B, #334155);
  color: white;
  padding: 2mm 3.5mm;
  text-align: left;
  font-weight: 700;
  font-size: 9.5pt;
}
.trace-table td { padding: 2mm 3.5mm; border-bottom: 1px solid #F1F5F9; font-family: var(--font-code); font-size: 9.5pt; }
.trace-table tr:nth-child(even) td { background: #F8FAFC; }

/* ═══════════════════════════════════════
   마스코트 말풍선 — 프리미엄 디자인
   ═══════════════════════════════════════ */
.mascot-speech {
  display: flex;
  align-items: flex-start;
  gap: 3.5mm;
  margin: 3.5mm 0;
}
.mascot-speech.right { flex-direction: row-reverse; }
.mascot-speech-img {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
}
.mascot-speech-img.small { width: 48px; height: 48px; }
.mascot-speech-img.large { width: 80px; height: 80px; }
.mascot-bubble {
  position: relative;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border: 1.5px solid #93C5FD;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  font-size: 10.5pt;
  color: #1E3A5F;
  line-height: 1.6;
  flex: 1;
  max-width: 85%;
  box-shadow: var(--shadow-sm);
}
.mascot-bubble.warn {
  background: linear-gradient(135deg, #FEF2F2, #FEE2E2);
  border-color: #FCA5A5;
  color: #7F1D1D;
}
.mascot-bubble.success {
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border-color: #6EE7B7;
  color: #14532D;
}
.mascot-bubble.tip {
  background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  border-color: #FCD34D;
  color: #78350F;
}
.mascot-bubble::before {
  content: '';
  position: absolute;
  top: 14px;
  left: -9px;
  border: 7px solid transparent;
  border-right-color: #93C5FD;
}
.mascot-bubble::after {
  content: '';
  position: absolute;
  top: 15px;
  left: -7px;
  border: 6px solid transparent;
  border-right-color: #EFF6FF;
}
.mascot-speech.right .mascot-bubble::before {
  left: auto; right: -9px;
  border-right-color: transparent;
  border-left-color: #93C5FD;
}
.mascot-speech.right .mascot-bubble::after {
  left: auto; right: -7px;
  border-right-color: transparent;
  border-left-color: #EFF6FF;
}
.mascot-bubble.warn::before { border-right-color: #FCA5A5; }
.mascot-bubble.warn::after { border-right-color: #FEF2F2; }
.mascot-speech.right .mascot-bubble.warn::before { border-right-color: transparent; border-left-color: #FCA5A5; }
.mascot-speech.right .mascot-bubble.warn::after { border-right-color: transparent; border-left-color: #FEF2F2; }
.mascot-bubble.success::before { border-right-color: #6EE7B7; }
.mascot-bubble.success::after { border-right-color: #ECFDF5; }
.mascot-speech.right .mascot-bubble.success::before { border-right-color: transparent; border-left-color: #6EE7B7; }
.mascot-speech.right .mascot-bubble.success::after { border-right-color: transparent; border-left-color: #ECFDF5; }
.mascot-bubble.tip::before { border-right-color: #FCD34D; }
.mascot-bubble.tip::after { border-right-color: #FFFBEB; }
.mascot-speech.right .mascot-bubble.tip::before { border-right-color: transparent; border-left-color: #FCD34D; }
.mascot-speech.right .mascot-bubble.tip::after { border-right-color: transparent; border-left-color: #FFFBEB; }

/* ═══════════════════════════════════════
   Fact Bite — 숫자/팩트 강조 카드
   ═══════════════════════════════════════ */
.fact-bite {
  display: flex;
  align-items: center;
  gap: 4mm;
  margin: 3mm 0;
  background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FFF1F2 100%);
  border-radius: var(--radius-lg);
  padding: 3.5mm 5mm;
  border: 1.5px solid #FECDD3;
  box-shadow: var(--shadow-sm);
}
.fact-bite-number {
  font: 900 28pt var(--font-body);
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  flex-shrink: 0;
}
.fact-bite-text { font-size: 10pt; color: var(--c-text-secondary); line-height: 1.5; }

/* ═══════════════════════════════════════
   Visual Summary — 핵심 정리 카드
   ═══════════════════════════════════════ */
.visual-summary {
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%);
  border: 1.5px solid #6EE7B7;
  border-radius: var(--radius-xl);
  padding: 5mm;
  margin: 4mm 0;
  box-shadow: var(--shadow-md);
}
.visual-summary-title {
  font-size: 14pt;
  font-weight: 900;
  color: #065F46;
  text-align: center;
  margin-bottom: 3mm;
}
.visual-summary-items { display: flex; flex-direction: column; gap: 2mm; }
.visual-summary-item {
  display: flex;
  align-items: flex-start;
  gap: 3mm;
  background: rgba(255,255,255,0.7);
  padding: 2.5mm 3.5mm;
  border-radius: var(--radius-md);
  backdrop-filter: blur(4px);
}
.visual-summary-num {
  width: 7mm; height: 7mm;
  background: linear-gradient(135deg, #059669, #10B981);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9pt;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(5,150,105,0.3);
}

/* ═══════════════════════════════════════
   10축 매핑 전용 스타일
   ═══════════════════════════════════════ */
.axis-section {
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1.5px solid #CBD5E1;
  border-radius: var(--radius-xl);
  padding: 5mm;
  margin: 5mm 0;
  box-shadow: var(--shadow-md);
  page-break-inside: avoid;
}
.axis-title {
  font-size: 14pt;
  font-weight: 900;
  text-align: center;
  margin-bottom: 4mm;
  color: var(--c-text);
  letter-spacing: -0.3px;
}
.axis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5mm;
}
.axis-item {
  display: flex;
  align-items: flex-start;
  gap: 2mm;
  padding: 2.5mm 3mm;
  border-radius: var(--radius-md);
  background: white;
  border: 1px solid #E2E8F0;
}
.axis-badge {
  font-size: 7.5pt;
  font-weight: 800;
  padding: 0.5mm 2.5mm;
  border-radius: 20px;
  flex-shrink: 0;
  letter-spacing: 0.3px;
  white-space: nowrap;
}
.axis-badge.c-lang { background: #DBEAFE; color: #1D4ED8; }
.axis-badge.thinking { background: #E0E7FF; color: #4338CA; }
.axis-badge.debug { background: #FEE2E2; color: #DC2626; }
.axis-badge.koi { background: #FEF3C7; color: #B45309; }
.axis-badge.basics { background: #D1FAE5; color: #059669; }
.axis-badge.reallife { background: #CCFBF1; color: #0D9488; }
.axis-badge.crosssubj { background: #E9D5FF; color: #7C3AED; }
.axis-badge.project { background: #FFE4E6; color: #BE123C; }
.axis-badge.ai { background: #FCE7F3; color: #DB2777; }
.axis-badge.hardware { background: #CFFAFE; color: #0891B2; }
.axis-text { font-size: 9.5pt; line-height: 150%; color: var(--c-text-secondary); }

/* ── TOC ── */
.toc { margin: 5mm 0; }
.toc h2 { border: none; padding: 0; margin-bottom: 3mm; background: none; }
.toc ul { list-style: none; padding: 0; }
.toc-h2 { display: flex; align-items: baseline; margin-bottom: 1.5mm; font-size: 11pt; }
.toc-text { flex-shrink: 0; }
.toc-dots { flex: 1; border-bottom: 1.5px dotted #CBD5E1; margin: 0 2mm; min-width: 10mm; }
.toc-page { flex-shrink: 0; color: var(--c-text-muted); font-size: 10pt; }

/* ── Margin Note ── */
.margin-note {
  float: right;
  width: 30mm;
  font-size: 8.5pt;
  color: var(--c-text-secondary);
  background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  padding: 2mm 2.5mm;
  border-radius: var(--radius-sm);
  margin: 0 -35mm 2mm 2mm;
  border-left: 2.5px solid var(--c-orange);
}

/* ── Cross Reference ── */
.crossref { font-size: 9pt; color: var(--c-blue); font-style: italic; font-weight: 500; }

/* ── Image ── */
.image-block { margin: 3.5mm 0; text-align: center; }
.image-block img { max-width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
.image-caption {
  font-size: 9pt;
  color: var(--c-text-secondary);
  margin-top: 2mm;
  font-style: italic;
  background: var(--c-bg-subtle);
  padding: 1.5mm 4mm;
  border-radius: 20px;
  display: inline-block;
}

/* ═══════════════════════════════════════
   v7.0 — 80레이어 리서치 증강분
   v5 프리미엄 기반 + TEXTBOOK-DESIGN-DEEP P1~P6 합성
   ═══════════════════════════════════════ */

/* ── Layer 26: 게슈탈트 근접성 강화 ── */
h2 + p,
h3 + p,
h2 + .code-block,
h3 + .code-block { margin-top: 1mm !important; }
.code-block + .code-explain { margin-top: 0.5mm; }
.code-block + .output-block { margin-top: 1mm; }
.exercise + .exercise { margin-top: 1.5mm; }

/* ── Layer 28: 마이크로 타이포그래피 ── */
body {
  font-kerning: auto;
  font-variant-ligatures: common-ligatures;
  hanging-punctuation: first last;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.line-num { font-variant-numeric: tabular-nums; }
.trace-table td { font-variant-numeric: tabular-nums; }

/* ── Layer 29: 연습문제 유형별 스타일 ── */
.exercise-item { margin-bottom: 2mm; font-size: 11pt; line-height: 165%; }
.exercise-item p { margin-bottom: 1.5mm; }
.exercise-blank { display: inline-block; min-width: 20mm; border-bottom: 2px solid var(--c-primary); margin: 0 1mm; }
.exercise-ox-grid { display: flex; gap: 3mm; margin-top: 2mm; }
.exercise-ox-item { flex: 1; padding: 2mm 3mm; border: 1px solid var(--c-border); border-radius: var(--radius-sm); font-size: 10pt; }
.exercise-matching { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5mm; font-size: 10pt; }
.exercise-reorder { display: flex; flex-direction: column; gap: 1mm; font-family: var(--font-code); font-size: 9.5pt; }
.exercise-reorder-item { background: var(--c-bg-subtle); padding: 1.5mm 3mm; border-radius: var(--radius-sm); border: 1px solid var(--c-border); }

/* ── Layer 30: 교사용 에디션 ── */
.teacher-only { background: #FFF5F5; border: 2px dashed #E74C3C; padding: 3mm; border-radius: var(--radius-md); }
.teacher-note { font-size: 9pt; color: #C0392B; font-style: italic; }

/* ── Layer 32: 디자인 토큰 — 인쇄용 간격 ── */
article > * + * { margin-top: 2.5mm; }
article > h2 { margin-top: 5mm; }
article > h3 { margin-top: 3.5mm; }

/* ── Layer 51: 황금비 타이포 ──
   24pt / 16pt / 13.5pt / 11.5pt = 1:0.67:0.56:0.48 ≈ 피보나치 */

/* ── Layer 55: 인지부하 최적화 — 시각 앵커 ── */
h2::before {
  /* 빈 블록으로 스크롤 앵커 역할 — Paged.js에서 러닝헤드 지원 */
}

/* ── Layer 56: 아이트래킹 — F패턴 강화 ── */
.lesson-header .lesson-number { font-weight: 700; }
.box-label::before {
  content: '';
  display: inline-block;
  width: 3px; height: 14px;
  border-radius: 2px;
  margin-right: 1.5mm;
  flex-shrink: 0;
}
.box-warning .box-label::before { background: var(--c-red); }
.box-key .box-label::before { background: var(--c-blue); }
.box-tip .box-label::before { background: var(--c-orange); }
.box-summary .box-label::before { background: var(--c-green); }
.box-question .box-label::before { background: var(--c-purple); }
.box-history .box-label::before { background: var(--c-teal); }

/* ── Layer 58: 색상 조화 60-30-10 강화 ── */
/* 60% = white/neutral, 30% = brand gradient accents, 10% = c-primary strong */

/* ── Layer 60: 코드 블록 — 브래킷 컬러링 (Layer 30 from Deep) ── */
.brace-1 { color: #C084FC; font-weight: bold; }
.brace-2 { color: #86EFAC; font-weight: bold; }
.brace-3 { color: #FDBA74; font-weight: bold; }
.brace-4 { color: #7DD3FC; font-weight: bold; }

/* ── Layer 61: 인덴트 가이드 ── */
.indent-guide { border-left: 1px solid rgba(255,255,255,0.08); }

/* ── Layer 65: 10축 매핑 강화 ── */
.axis-item { transition: none; }
.axis-section .box-content { font-size: 10pt; }

/* ── Layer 67: 자료구조 시각화 ── */
.ds-visual { font-family: var(--font-code); font-size: 9pt; text-align: center; margin: 3mm 0; }
.ds-array { display: flex; justify-content: center; gap: 0; }
.ds-cell { width: 9mm; height: 9mm; border: 1.5px solid var(--c-blue); display: flex; align-items: center; justify-content: center; font-weight: 700; }
.ds-cell:first-child { border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
.ds-cell:last-child { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.ds-index { font-size: 7pt; color: var(--c-text-muted); text-align: center; margin-top: 0.5mm; }

/* ── Layer 68: 학습 저널 공간 ── */
.reflection-box {
  background: var(--c-bg-warm);
  border: 1.5px dashed #FCD34D;
  border-radius: var(--radius-lg);
  padding: 4mm;
  margin: 4mm 0;
}
.reflection-prompt { font-size: 10pt; color: var(--c-orange); font-weight: 700; margin-bottom: 2mm; }
.reflection-lines {
  min-height: 20mm;
  background: repeating-linear-gradient(transparent, transparent 7mm, #FEF3C7 7mm, #FEF3C7 7.5mm);
}

/* ── Layer 69: 루브릭/자기평가 ── */
.rubric-table { width: 100%; border-collapse: collapse; font-size: 9pt; margin: 3mm 0; }
.rubric-table th { background: var(--c-purple); color: white; padding: 2mm; text-align: center; }
.rubric-table td { padding: 2mm; border: 1px solid var(--c-border); text-align: center; }
.self-check { display: flex; gap: 5mm; justify-content: center; margin: 3mm 0; }
.self-check-item { text-align: center; font-size: 18pt; }
.self-check-label { font-size: 7.5pt; color: var(--c-text-secondary); }

/* ── Layer 72: 교실 게임 보드 ── */
.bingo-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--c-border); border-radius: var(--radius-md); overflow: hidden; margin: 3mm 0; }
.bingo-cell { background: white; padding: 3mm; text-align: center; font-size: 8.5pt; font-family: var(--font-code); min-height: 10mm; display: flex; align-items: center; justify-content: center; }
.bingo-free { background: var(--c-primary-light); font-weight: 800; color: var(--c-primary); }

/* ── Layer 77: 북마크/읽기 가이드 ──  */
.reading-ruler { border-top: 3px solid var(--c-primary); margin: 4mm 0; opacity: 0.3; }

/* ── Layer 78: 고급 그리드 — 2컬럼 레이아웃 ── */
.two-col { display: flex; gap: 4mm; }
.two-col > * { flex: 1; min-width: 0; }
.three-col { display: flex; gap: 3mm; }
.three-col > * { flex: 1; min-width: 0; }

/* ── Layer 80: 인쇄 품질 마커 ── */
.print-crop-mark { display: none; }

/* ═══════════════════════════════════════
   인쇄 최적화 — 강화 버전 (Layer 77~80)
   ═══════════════════════════════════════ */
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .lesson-header,
  .code-block,
  .box,
  .exercise,
  .predict-box,
  .compare-bad,
  .compare-good,
  .step-num,
  .mascot-bubble,
  .visual-summary,
  .axis-section,
  .trace-table th,
  .progress-fill,
  .code-explain-line,
  .fact-bite,
  .diff-1, .diff-2, .diff-3,
  .diagram-box,
  .modify-box,
  .answers-section {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .no-print { display: none !important; }
  /* orphan/widow 강화 */
  p { orphans: 3; widows: 3; }
  h2, h3 { break-after: avoid; }
  .avoid-break { break-inside: avoid; }
}

</style>
<article id="content">
  <header class="lesson-header" role="banner">
    <div class="lesson-number">Lesson 0-1</div>
    <h1 class="lesson-title">컴퓨터는 뭘 할 수 있을까?</h1>
    <div class="lesson-summary">컴퓨터가 잘하는 것과 못하는 것, 그리고 프로그래밍이 뭔지 알아봐요. 컴퓨터의 역사와 미래까지!</div>
  </header>
<div class="chapter-start-box avoid-break"><div class="learning-goals"><h3>📚 이번에 배울 것</h3><ul><li>컴퓨터가 잘하는 일과 못하는 일을 구별할 수 있어요.</li><li>프로그래밍이 뭔지 한 문장으로 설명할 수 있어요.</li><li>컴퓨터와 사람의 차이를 이해해요.</li><li>컴퓨터의 역사를 시대별로 설명할 수 있어요.</li><li>폰 노이만 아키텍처의 기본 개념을 알아요.</li><li>[심화] 튜링 머신과 계산 가능성의 개념을 이해해요.</li></ul></div><div class="prereq-check"><h3>✅ 시작 전 체크</h3><ul class="checklist"><li>컴퓨터나 스마트폰을 써 본 적이 있다</li><li>글을 읽을 수 있다</li></ul></div><div class="progress-section"><span class="progress-label">Part 1 진행률: 1%</span><div class="progress-bar"><div class="progress-fill" style="width:1%"></div></div></div></div>
<h2>컴퓨터는 대체 뭘까?</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-hello.svg" alt="마스코트" />
        <div class="mascot-bubble hello">안녕! 나는 <b>코딩이</b>야. 오늘부터 같이 컴퓨터의 세계를 탐험할 거야. 먼저 컴퓨터가 뭘 할 수 있는지부터 알아보자!</div>
      </div>
<p>컴퓨터는 계산기일까요? 게임기일까요? 사실 <b>둘 다</b>예요. 컴퓨터는 사람이 시킨 일을 빠르고 정확하게 해내는 기계예요. 하지만 아무것도 시키지 않으면? 아무것도 안 해요. 그냥 전기만 먹고 있어요.</p>
<p>영어로 'computer'는 'compute(계산하다)'에서 왔어요. 원래 컴퓨터는 계산만 하는 기계였어요. 하지만 지금은 음악을 듣고, 그림을 그리고, 게임도 하고, 심지어 대화도 하죠. 어떻게 이렇게 됐을까요?</p>
<h2>컴퓨터가 잘하는 것</h2>
<p>컴퓨터는 세 가지를 아주 잘해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 컴퓨터의 3가지 초능력</span><div class="box-content"><b>1. 빠른 계산</b> — 1초에 수십억 번 계산해요. 38475 x 92847도 순식간에 풀어요.<br><b>2. 정확한 반복</b> — 같은 일을 100만 번 시켜도 한 번도 틀리지 않아요. 지치지도 않아요.<br><b>3. 완벽한 기억</b> — 전화번호 1만 개를 외워도 하나도 안 잊어버려요.</div></div>
<h2>컴퓨터가 못하는 것</h2>
<p>그런데 컴퓨터가 못하는 것도 있어요. 꽤 많아요.</p>
<div class="box box-warning avoid-break"><span class="box-label">[주의] 컴퓨터의 약점</span><div class="box-content"><b>1. 스스로 생각하기</b> — 시키지 않은 일은 절대 못해요. '알아서 해 줘'가 안 돼요.<br><b>2. 창의력</b> — 새로운 아이디어를 떠올리지 못해요.<br><b>3. 감정 이해</b> — 친구가 울고 있어도 왜 우는지 몰라요.</div></div>
<div class="image-block avoid-break"><img src="/images/svg-assets/part0-u01-computer-vs-human.svg" alt="컴퓨터와 사람의 능력 비교 도표" style="max-width:100%"/><div class="image-caption">컴퓨터와 사람은 잘하는 것이 달라요</div></div>
<h2>컴퓨터 vs 사람 대결!</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">컴퓨터와 사람, 누가 이길까? 6가지 대결을 해 봐요!</div>
      </div>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<div class="box box-tip avoid-break"><span class="box-label">[활동] 나만의 대결 카드 만들기</span><div class="box-content">종이를 6장 준비해서, 앞면에 대결 주제를 쓰고 뒷면에 누가 이기는지 써 보세요. 예: '노래 부르기' — 사람 승! / '구구단 외우기 시합' — 컴퓨터 승!</div></div>
<h2>프로그래밍이란?</h2>
<p>컴퓨터는 스스로 생각하지 못해요. 그래서 사람이 <b>할 일을 알려줘야</b> 해요. 이걸 <b>프로그래밍</b>이라고 해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 프로그래밍이 뭔가요?</span><div class="box-content">프로그래밍 = 컴퓨터에게 시키고 싶은 일을 <b>코드</b>로 쓰는 것</div></div>
<div class="image-block avoid-break"><img src="/images/svg-assets/part0-u01-programming-concept.svg" alt="프로그래머가 코드를 쓰면 컴퓨터가 실행하는 과정" style="max-width:100%"/><div class="image-caption">프로그래머(사람) → 코드 작성 → 컴퓨터가 실행 → 결과 출력</div></div>
<p>요리에 비유하면 이래요. <b>레시피</b>가 프로그램이고, <b>요리사(사람)</b>가 프로그래머예요. 레시피대로 요리하는 <b>로봇</b>이 컴퓨터예요. 로봇은 레시피에 없는 건 절대 안 해요. '소금 조금'이라고 쓰면 '조금이 얼마야?'라고 물어볼 거예요.</p>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">컴퓨터는 시킨 대로만 해요. 그래서 <b>정확하게</b> 시키는 게 중요해요. 이게 프로그래밍의 핵심이에요!</div>
      </div>
<h2>프로그래밍 언어의 세계</h2>
<p>사람끼리도 한국어, 영어, 일본어 등 여러 언어를 쓰죠? 컴퓨터에게 시키는 언어도 여러 가지가 있어요. 이걸 <b>프로그래밍 언어</b>라고 해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 주요 프로그래밍 언어</span><div class="box-content"><b>C</b> — 이 책에서 배울 언어! 하드웨어에 가장 가까운 언어예요.<br><b>Python</b> — 배우기 쉽고 인공지능에 많이 쓰여요.<br><b>Java</b> — 앱, 서버 개발에 많이 쓰여요.<br><b>JavaScript</b> — 웹사이트를 만들 때 쓰여요.<br><b>Scratch</b> — 블록을 끌어다 놓는 시각적 프로그래밍 언어예요.</div></div>
<p>우리가 배울 <b>C언어</b>는 1972년에 만들어졌어요. 50년이 넘었지만 아직도 운영체제, 게임 엔진, 임베디드 시스템 등에서 널리 쓰이는 중요한 언어예요.</p>
<h2>━━━ 여기서부터 역사 여행! ━━━</h2>
<h2>컴퓨터의 역사: 주판에서 스마트폰까지</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">지금의 스마트폰은 1960년대에 방 하나를 차지하던 컴퓨터보다 수백만 배 빠르대! 어떻게 이렇게 발전했는지 시간여행을 떠나볼까?</div>
      </div>
<h2>0세대: 기계식 계산기 (1600~1940년대)</h2>
<p>컴퓨터가 전자기기가 되기 전에는 <b>톱니바퀴와 기어</b>로 계산을 했어요.</p>
<div class="box box-history avoid-break"><span class="box-label">[역사] 기계식 계산기의 시대</span><div class="box-content"><b>1642년 — 파스칼의 계산기</b><br>프랑스의 블레즈 파스칼이 덧셈·뺄셈을 하는 기계를 만들었어요. 아버지의 세금 계산을 도우려고요!<br><br><b>1837년 — 배비지의 해석 기관</b><br>영국의 찰스 배비지가 '프로그래밍 가능한 컴퓨터'를 설계했어요. 실제로 완성하지는 못했지만, 현대 컴퓨터의 개념을 미리 상상한 거예요.<br><br><b>1843년 — 에이다 러브레이스</b><br>배비지의 기계를 위해 최초의 '프로그램'을 작성한 사람이에요. 세계 최초의 프로그래머로 불려요!</div></div>
<h2>1세대: 진공관 컴퓨터 (1940~1950년대)</h2>
<p>전기를 이용한 최초의 컴퓨터들이 등장했어요. 이 시대 컴퓨터의 핵심 부품은 <b>진공관</b>(vacuum tube)이었어요.</p>
<div class="box box-history avoid-break"><span class="box-label">[역사] ENIAC — 최초의 전자 컴퓨터</span><div class="box-content"><b>1946년</b>, 미국 펜실베이니아 대학에서 <b>에니악(ENIAC)</b>이 탄생했어요.<br><br>• 무게: 약 30톤 (코끼리 5마리!)<br>• 크기: 방 하나를 가득 채움 (약 167㎡)<br>• 진공관 18,000개 사용<br>• 1초에 덧셈 5,000번 (지금 보면 느리지만 당시엔 혁명적!)<br>• 전기 소비: 150킬로와트 (집 50채 분량!)<br><br>에니악은 포탄 탄도 계산을 위해 만들어졌어요.</div></div>
<p>진공관은 전구처럼 생긴 부품이에요. 전기 신호를 증폭하거나 스위치 역할을 해요. 하지만 크고, 뜨겁고, 잘 고장 났어요. 진짜로 나방이 진공관에 끼어서 오류가 생긴 적도 있어요! 이게 바로 '버그(bug)'라는 말의 유래예요.</p>
<div class="box box-tip avoid-break"><span class="box-label">[재미] 버그의 탄생</span><div class="box-content">1947년, 하버드 대학의 마크 II 컴퓨터가 오작동했어요. 원인을 찾아보니 진공관 사이에 나방(moth)이 끼어 있었어요! 그레이스 호퍼(Grace Hopper)가 이 나방을 기록 일지에 테이프로 붙이고 'First actual case of bug being found(실제 버그가 발견된 최초의 사례)'라고 적었어요. 이후로 프로그램의 오류를 '버그'라고 부르게 됐어요.</div></div>
<h2>2세대: 트랜지스터 (1950~1960년대)</h2>
<p>1947년, 벨 연구소에서 <b>트랜지스터</b>가 발명됐어요. 진공관의 역할을 하지만 크기가 수백 분의 1로 작고, 전력도 적게 쓰고, 잘 고장 나지도 않았어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 트랜지스터란?</span><div class="box-content"><b>트랜지스터</b>는 전기 신호를 켜고 끄는 아주 작은 스위치예요. 진공관보다 작고, 빠르고, 튼튼해요. 이 작은 스위치들이 0과 1을 만들어요!</div></div>
<p>트랜지스터 덕분에 컴퓨터가 방 크기에서 <b>캐비닛 크기</b>로 줄어들었어요. 속도도 훨씬 빨라지고, 전기도 덜 먹고, 고장도 적어졌어요.</p>
<h2>3세대: 집적 회로(IC) (1960~1970년대)</h2>
<p>트랜지스터를 하나씩 연결하는 건 힘든 일이었어요. 그래서 1958년, <b>잭 킬비</b>(Jack Kilby)가 혁명적인 아이디어를 냈어요. 여러 트랜지스터를 하나의 작은 칩에 넣자!</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 집적 회로(IC)란?</span><div class="box-content"><b>IC</b>(Integrated Circuit, 집적 회로) = 수백~수천 개의 트랜지스터를 손톱만 한 실리콘 칩 하나에 넣은 것.<br><br>이 발명으로 컴퓨터가 훨씬 작고 빠르고 싸졌어요. 잭 킬비는 이 업적으로 2000년 노벨 물리학상을 받았어요.</div></div>
<h2>4세대: 마이크로프로세서 (1970년대~현재)</h2>
<p>1971년, 인텔(Intel)이 <b>세계 최초의 마이크로프로세서</b> Intel 4004를 만들었어요. CPU 전체를 칩 하나에 담은 거예요!</p>
<div class="box box-history avoid-break"><span class="box-label">[역사] 컴퓨터 세대 비교</span><div class="box-content"><b>에니악(1946)</b>: 30톤, 방 1개, 초당 덧셈 5,000번<br><b>IBM 7090(1959)</b>: 트랜지스터, 초당 연산 229,000번<br><b>Intel 4004(1971)</b>: 칩 1개, 초당 연산 60,000번 (범용 마이크로프로세서)<br><b>Intel i9(2024)</b>: 칩 1개, 초당 연산 수천억 번<br><br>80년 만에 속도가 <b>수천만 배</b> 빨라졌어요!</div></div>
<h2>무어의 법칙</h2>
<p>인텔의 공동 창업자 <b>고든 무어</b>(Gordon Moore)가 1965년에 흥미로운 예측을 했어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 무어의 법칙</span><div class="box-content">"반도체 칩에 넣을 수 있는 트랜지스터 수는 <b>약 2년마다 2배</b>로 늘어난다."

이건 '법칙'이라기보다 '관찰'인데, 놀랍게도 약 50년간 거의 정확히 맞아떨어졌어요!<br><br>트랜지스터가 많아지면 → 더 빠르고 → 더 작고 → 더 싸진다.</div></div>
<p>무어의 법칙 덕분에 우리 주머니 속 스마트폰이 1990년대의 슈퍼컴퓨터보다 빨라요. 하지만 최근에는 트랜지스터 크기가 원자 수준에 가까워지면서 무어의 법칙이 한계에 다다르고 있어요.</p>
<div class="steps-visual avoid-break"></div>
<h2>개인용 컴퓨터(PC)의 탄생</h2>
<p>컴퓨터가 작아지자, 개인이 사서 쓸 수 있게 됐어요.</p>
<div class="box box-history avoid-break"><span class="box-label">[역사] PC의 역사</span><div class="box-content"><b>1976년</b> — 스티브 잡스와 스티브 워즈니악이 차고에서 <b>Apple I</b>을 만들었어요.<br><b>1981년</b> — IBM이 <b>IBM PC</b>를 출시했어요. '개인용 컴퓨터(Personal Computer)' = PC라는 이름이 여기서 왔어요.<br><b>1984년</b> — 애플이 <b>매킨토시</b>를 출시. 마우스와 그래픽 인터페이스(GUI)를 처음 대중화했어요.<br><b>1985년</b> — 마이크로소프트가 <b>Windows 1.0</b>을 출시했어요.</div></div>
<h2>인터넷과 스마트폰의 시대</h2>
<p>1990년대에 <b>인터넷</b>이 대중화되면서 컴퓨터의 쓸모가 폭발적으로 늘어났어요. 2007년에는 애플이 <b>아이폰</b>을 출시하면서 스마트폰 시대가 열렸어요. 스마트폰도 컴퓨터예요 — 전화도 되는 아주 작은 컴퓨터!</p>
<h2>━━━ 컴퓨터의 설계 원리 ━━━</h2>
<h2>[심화] 폰 노이만 아키텍처</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">여기서부터는 좀 어려울 수 있어! 궁금한 친구만 읽어도 돼. 하지만 알면 컴퓨터를 훨씬 깊이 이해할 수 있어!</div>
      </div>
<p>1945년, 헝가리 출신 수학자 <b>존 폰 노이만</b>(John von Neumann)이 현대 컴퓨터의 기본 설계도를 제안했어요. 이걸 <b>폰 노이만 아키텍처</b>라고 불러요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 폰 노이만 아키텍처의 핵심 아이디어</span><div class="box-content">"<b>프로그램(명령어)과 데이터를 같은 메모리에 저장한다.</b>"<br><br>이전 컴퓨터(에니악 등)는 프로그램을 바꾸려면 전선을 다시 연결해야 했어요. 폰 노이만의 아이디어 덕분에 프로그램을 메모리에 넣고 바꾸기만 하면 다른 일을 할 수 있게 됐어요!</div></div>
<p>폰 노이만 아키텍처는 5가지 부분으로 이루어져 있어요.</p>
<div class="steps-visual avoid-break"></div>
<p>연산 장치(ALU)와 제어 장치(CU)를 합쳐서 <b>CPU</b>라고 불러요. 지금 우리가 쓰는 거의 모든 컴퓨터가 이 설계를 따르고 있어요!</p>
<div class="code-explain avoid-break"></div>
<h2>[심화] 하버드 아키텍처</h2>
<p>폰 노이만 아키텍처에는 약점이 하나 있어요. 프로그램과 데이터가 같은 메모리를 쓰다 보니, CPU가 명령어를 읽을 때 동시에 데이터를 읽을 수 없어요. 이걸 <b>폰 노이만 병목</b>이라고 해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 하버드 아키텍처</span><div class="box-content"><b>하버드 아키텍처</b>는 프로그램용 메모리와 데이터용 메모리를 <b>분리</b>한 설계예요.<br><br>• 명령어와 데이터를 동시에 읽을 수 있어서 더 빨라요.<br>• 마이크로컨트롤러(아두이노 등)에서 많이 사용해요.<br>• 현대 CPU는 두 방식을 섞어서 사용해요 (캐시는 하버드, 메인 메모리는 폰 노이만).</div></div>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<h2>[심화 내용] 튜링 머신과 계산 가능성</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">이 부분은 대학교 컴퓨터과학에서 배우는 내용이야! 궁금한 친구만 도전해 봐!</div>
      </div>
<p>컴퓨터가 만들어지기도 전인 1936년, 영국 수학자 <b>앨런 튜링</b>(Alan Turing)이 '기계로 풀 수 있는 문제'가 무엇인지 수학적으로 정의했어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] 튜링 머신이란?</span><div class="box-content"><b>튜링 머신</b>은 실제 기계가 아니라 <b>상상 속의 계산 모델</b>이에요.<br><br>구성:<br>• 무한히 긴 테이프 (칸마다 기호를 적을 수 있음)<br>• 읽기/쓰기 헤드 (테이프의 한 칸을 읽고 쓸 수 있음)<br>• 상태 표 (현재 상태와 읽은 기호에 따라 다음 행동 결정)<br>• 유한개의 상태<br><br>이 단순한 기계로 이론적으로 <b>모든 계산 가능한 문제</b>를 풀 수 있어요!</div></div>
<p>튜링의 핵심 질문은 이거였어요: "기계로 풀 수 <b>없는</b> 문제도 있을까?"</p>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] 정지 문제 (Halting Problem)</span><div class="box-content">튜링이 증명한 유명한 결과:<br><br>"어떤 프로그램이 주어졌을 때, 이 프로그램이 <b>끝나는지 영원히 돌아가는지</b> 미리 알아내는 프로그램은 <b>만들 수 없다</b>."

이것이 <b>정지 문제</b>예요. 컴퓨터로 풀 수 없는 문제가 존재한다는 걸 수학적으로 증명한 거예요.</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[쉬운 비유] 정지 문제를 일상으로</span><div class="box-content">친구가 '나 수학 문제 풀고 있어'라고 말했을 때, 친구가 <b>언제 끝낼지</b> 또는 <b>영원히 못 풀지</b> 미리 알 수 있을까요? 매우 간단한 문제라면 예측할 수 있지만, 모든 경우에 대해 항상 맞히는 건 불가능해요. 튜링 머신도 마찬가지예요.</div></div>
<h2>[심화 내용] 처치-튜링 논제</h2>
<p>튜링 머신으로 풀 수 있는 문제 = 알고리즘으로 풀 수 있는 문제. 이 주장을 <b>처치-튜링 논제</b>(Church-Turing thesis)라고 해요. 수학적으로 증명된 건 아니지만, 지금까지 반례가 발견된 적이 없어요.</p>
<div class="box box-summary avoid-break"><span class="box-label">[심화 내용] 계산 가능성 요약</span><div class="box-content">• <b>계산 가능한 문제</b>: 알고리즘(프로그램)으로 해결할 수 있는 문제<br>• <b>계산 불가능한 문제</b>: 어떤 프로그램으로도 모든 경우에 정확히 해결할 수 없는 문제 (정지 문제 등)<br>• 현대 컴퓨터과학의 한계를 이해하는 가장 근본적인 개념이에요</div></div>
<h2>━━━ 현대와 미래의 컴퓨터 ━━━</h2>
<h2>슈퍼컴퓨터</h2>
<p><b>슈퍼컴퓨터</b>는 일반 컴퓨터보다 수십만~수백만 배 빠른 초고속 컴퓨터예요. 날씨 예보, 신약 개발, 우주 시뮬레이션 등에 사용해요.</p>
<div class="box box-history avoid-break"><span class="box-label">[실생활] 슈퍼컴퓨터의 활약</span><div class="box-content">• <b>날씨 예보</b>: 지구 대기를 수학으로 시뮬레이션해서 내일 비가 올지 예측해요.<br>• <b>코로나 백신 개발</b>: 바이러스 단백질 구조를 시뮬레이션해서 백신을 빠르게 개발했어요.<br>• <b>한국의 슈퍼컴퓨터</b>: 기상청의 '누리온'과 '누리온2'가 날씨 예보를 돕고 있어요.</div></div>
<h2>[심화] 양자 컴퓨터</h2>
<p>일반 컴퓨터는 비트(0 또는 1)로 계산해요. 양자 컴퓨터는 <b>큐비트</b>(qubit)라는 걸 사용하는데, 0과 1을 <b>동시에</b> 가질 수 있어요!</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 양자 컴퓨터란?</span><div class="box-content"><b>양자 컴퓨터</b>는 양자역학의 원리를 이용하는 차세대 컴퓨터예요.<br><br>• <b>큐비트</b>: 0과 1을 동시에 가질 수 있어요 (중첩, superposition)<br>• <b>장점</b>: 특정 문제를 일반 컴퓨터보다 지수적으로 빠르게 풀 수 있어요<br>• <b>적합한 문제</b>: 암호 해독, 신약 개발, 최적화 문제<br>• <b>한계</b>: 모든 문제를 빠르게 푸는 건 아니에요. 극저온(-273°C)이 필요해요.<br>• 아직 실험 단계이지만, 구글, IBM 등이 빠르게 개발 중이에요.</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[비유] 양자 컴퓨터를 쉽게 이해하기</span><div class="box-content">미로 찾기에 비유하면:<br>• <b>일반 컴퓨터</b>: 한 길씩 하나하나 시도해요 (직렬)<br>• <b>양자 컴퓨터</b>: 모든 길을 동시에 탐색해요 (병렬)<br><br>길이 100개면 일반 컴퓨터는 100번 시도하지만, 양자 컴퓨터는 한 번에 가능해요! (이론적으로)</div></div>
<h2>[심화] 뉴로모픽 칩</h2>
<p>사람의 뇌는 뉴런(신경 세포)이 서로 연결되어 정보를 처리해요. <b>뉴로모픽 칩</b>은 이 뇌의 구조를 흉내 낸 반도체예요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 뉴로모픽 칩이란?</span><div class="box-content"><b>뉴로모픽 칩</b>(Neuromorphic chip) = 뇌의 뉴런과 시냅스를 모방한 칩<br><br>• 전통적인 CPU와 달리, <b>병렬로</b> 정보를 처리해요<br>• 전력 소비가 매우 적어요 (뇌처럼 효율적)<br>• 패턴 인식, 학습에 뛰어나요<br>• 인텔의 Loihi, IBM의 TrueNorth가 대표적<br>• 미래에는 로봇, 자율주행차에 탑재될 수 있어요</div></div>
<h2>인공지능(AI)과 컴퓨터</h2>
<p>최근 ChatGPT, 미드저니 같은 <b>인공지능</b>(AI)이 화제죠? AI는 컴퓨터가 사람처럼 배우고, 판단하고, 만들어내는 기술이에요. 하지만 AI도 결국 <b>사람이 만든 프로그램</b>이에요. 엄청나게 복잡하고 방대한 데이터로 학습한 프로그램이죠.</p>
<div class="box box-tip avoid-break"><span class="box-label">[생각해 보기] AI는 정말 '생각'할까?</span><div class="box-content">AI는 엄청난 데이터를 분석해서 패턴을 찾아내요. '생각'하는 것처럼 보이지만, 실제로는 확률 계산을 하는 거예요. '이 다음에 올 가장 적절한 단어는?'을 계산할 뿐이에요.<br><br>진짜 '의식'이나 '감정'이 있는 건 아니에요. 아직은요.</div></div>
<h2>컴퓨터의 종류 총정리</h2>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<h2>컴퓨터 과학의 핵심 인물들</h2>
<div class="box box-history avoid-break"><span class="box-label">[역사] 컴퓨터 과학을 만든 사람들</span><div class="box-content"><b>찰스 배비지 (1791~1871)</b> — '컴퓨터의 아버지'. 해석 기관을 설계했어요.<br><b>에이다 러브레이스 (1815~1852)</b> — 최초의 프로그래머. 배비지의 기계를 위한 알고리즘을 작성했어요.<br><b>앨런 튜링 (1912~1954)</b> — 컴퓨터과학의 아버지. 튜링 머신 개념 제안, 2차 대전 중 독일 암호 해독에 기여.<br><b>존 폰 노이만 (1903~1957)</b> — 현대 컴퓨터 설계(폰 노이만 아키텍처)의 창시자.<br><b>그레이스 호퍼 (1906~1992)</b> — 최초의 컴파일러를 만들었어요. '버그'라는 용어를 대중화한 사람.<br><b>데니스 리치 (1941~2011)</b> — C 언어를 만든 사람! 유닉스 운영체제의 공동 개발자.</div></div>
<h2>━━━ 연습문제 ━━━</h2>
<h2>연습문제</h2>
<div class="exercise avoid-break"><div class="exercise-title">문제 1 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>컴퓨터가 잘하는 것 3가지를 적어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 2 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>'프로그래밍'을 한 문장으로 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 3 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>다음 중 컴퓨터가 사람보다 잘하는 것은? (여러 개 고르기)<br>(1) 1부터 100까지 더하기<br>(2) 그림 그리기 주제 정하기<br>(3) 같은 말 1000번 반복하기<br>(4) 슬픈 친구 위로하기<br>(5) 전화번호 500개 기억하기</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 4 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>컴퓨터의 4세대를 순서대로 나열하고, 각 세대의 핵심 부품을 적어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 5 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>무어의 법칙이란 무엇인가요? 한 문장으로 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 6 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>여러분 집에 있는 전자기기(TV, 전자레인지, 세탁기 등) 중 하나를 골라서, 그 안에 들어있는 '프로그램'이 뭘 하는지 적어 보세요. 예: 전자레인지 — '3분 동안 음식을 돌리며 데워라'</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 7 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>로봇 청소기에게 '방 청소하기'를 시키려면, 어떤 단계로 나눠서 명령해야 할까요? 5단계 이상으로 적어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 8 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>에니악(ENIAC)과 현대 스마트폰을 비교해 보세요. 크기, 무게, 속도, 가격 측면에서 어떻게 다른가요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 9 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>폰 노이만 아키텍처의 5가지 구성 요소를 적고, 각각을 학교의 무엇에 비유할 수 있는지 적어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 10 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>C 언어를 만든 사람은 누구이고, 몇 년에 만들어졌나요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 11 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화] 폰 노이만 아키텍처와 하버드 아키텍처의 가장 큰 차이점은 무엇인가요? 각각의 장단점을 적어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 12 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화] 양자 컴퓨터의 '큐비트'가 일반 컴퓨터의 '비트'와 다른 점을 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 13 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화] '정지 문제'(Halting Problem)가 왜 중요한지 자기 말로 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 14 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화 내용] 튜링 머신의 구성 요소 4가지를 적고, 각각의 역할을 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 15 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화 내용] '계산 가능한 문제'와 '계산 불가능한 문제'의 차이를 설명하고, 각각 예시를 하나씩 들어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>정답</h2>
<div class="answers-section avoid-break"><h3>정답</h3><div class="answer-item"><span class="answer-num">문제 1</span> <span class="answer-text">(1) 빠른 계산 (2) 정확한 반복 (3) 완벽한 기억 (순서가 달라도 이 세 가지가 있으면 정답)</span></div><div class="answer-item"><span class="answer-num">문제 2</span> <span class="answer-text">프로그래밍은 컴퓨터에게 시키고 싶은 일을 코드로 쓰는 것이에요. (비슷한 뜻이면 정답)</span></div><div class="answer-item"><span class="answer-num">문제 3</span> <span class="answer-text">(1), (3), (5) — 계산, 반복, 기억은 컴퓨터가 잘해요. (2)번 그림 주제 정하기는 창의력이 필요하고, (4)번 위로하기는 감정 이해가 필요해서 사람이 잘해요.</span></div><div class="answer-item"><span class="answer-num">문제 4</span> <span class="answer-text">1세대: 진공관 / 2세대: 트랜지스터 / 3세대: 집적 회로(IC) / 4세대: 마이크로프로세서</span></div><div class="answer-item"><span class="answer-num">문제 5</span> <span class="answer-text">반도체 칩에 넣을 수 있는 트랜지스터의 수가 약 2년마다 2배로 늘어난다는 관찰이에요.</span></div><div class="answer-item"><span class="answer-num">문제 6</span> <span class="answer-text">예시: 세탁기 — '물 채우기 → 세제 풀기 → 빨래 돌리기 → 헹구기 → 탈수하기'. 전자기기마다 다르지만 '순서대로 할 일을 정해 놓은 것'이 프로그램이에요.</span></div><div class="answer-item"><span class="answer-num">문제 7</span> <span class="answer-text">예시: (1) 충전 대기소에서 출발 (2) 벽을 따라 직진 (3) 벽에 닿으면 90도 회전 (4) 먼지를 감지하면 흡입 (5) 배터리가 20% 이하면 충전소로 복귀 (6) 방 전체를 다 돌면 정지. '단계별로 쪼개서 정확히 시키는 것'이 핵심이에요.</span></div><div class="answer-item"><span class="answer-num">문제 8</span> <span class="answer-text">에니악: 30톤, 방 크기, 초당 5,000번 계산, 수백만 달러. 스마트폰: 200g, 손바닥 크기, 초당 수십억 번 계산, 수십만 원. 80년 만에 크기는 수만 분의 1, 속도는 수백만 배 빨라졌어요.</span></div><div class="answer-item"><span class="answer-num">문제 9</span> <span class="answer-text">입력 장치(학생 질문) / 기억 장치(도서관) / 연산 장치(선생님 두뇌) / 제어 장치(교장 선생님) / 출력 장치(칠판). 비유는 다양하게 가능해요.</span></div><div class="answer-item"><span class="answer-num">문제 10</span> <span class="answer-text">데니스 리치(Dennis Ritchie)가 1972년에 만들었어요.</span></div><div class="answer-item"><span class="answer-num">문제 11</span> <span class="answer-text">가장 큰 차이: 폰 노이만은 프로그램과 데이터가 같은 메모리를 공유하고, 하버드는 별도의 메모리를 사용해요. 폰 노이만 장점: 설계가 단순, 유연함. 단점: 병목 현상. 하버드 장점: 동시 접근 가능, 더 빠름. 단점: 설계가 복잡.</span></div><div class="answer-item"><span class="answer-num">문제 12</span> <span class="answer-text">비트는 0 또는 1 중 하나만 가질 수 있지만, 큐비트는 0과 1을 동시에 가질 수 있어요(중첩). 이 덕분에 여러 가능성을 동시에 계산할 수 있어요.</span></div><div class="answer-item"><span class="answer-num">문제 13</span> <span class="answer-text">정지 문제는 컴퓨터(알고리즘)로 풀 수 없는 문제가 존재한다는 것을 증명해요. 이는 컴퓨터의 근본적인 한계를 보여주며, '모든 문제를 프로그래밍으로 해결할 수 있다'는 생각이 틀렸음을 알려줘요.</span></div><div class="answer-item"><span class="answer-num">문제 14</span> <span class="answer-text">(1) 무한한 테이프: 데이터를 읽고 쓰는 공간 (2) 읽기/쓰기 헤드: 테이프의 한 칸을 읽고 쓰고 이동 (3) 상태 표(전이 함수): 현재 상태와 읽은 기호에 따라 행동 결정 (4) 유한개의 상태: 기계의 현재 '상황'을 나타냄</span></div><div class="answer-item"><span class="answer-num">문제 15</span> <span class="answer-text">계산 가능한 문제: 알고리즘으로 항상 정확한 답을 구할 수 있는 문제. 예: 두 수의 최대공약수 구하기. 계산 불가능한 문제: 어떤 알고리즘으로도 모든 입력에 대해 정확한 답을 구할 수 없는 문제. 예: 정지 문제(임의의 프로그램이 멈추는지 판단하기).</span></div></div>
<h2>용어 정리</h2>
<div class="glossary avoid-break"><div class="glossary-item"><dt class="glossary-term">컴퓨터</dt><dd class="glossary-def">사람이 시킨 일을 빠르고 정확하게 수행하는 전자 기계.</dd></div><div class="glossary-item"><dt class="glossary-term">프로그래밍</dt><dd class="glossary-def">컴퓨터에게 시키고 싶은 일을 코드(프로그래밍 언어)로 작성하는 것.</dd></div><div class="glossary-item"><dt class="glossary-term">프로그램</dt><dd class="glossary-def">컴퓨터가 따라야 할 명령을 순서대로 적어 놓은 것. 레시피와 비슷해요.</dd></div><div class="glossary-item"><dt class="glossary-term">코드</dt><dd class="glossary-def">프로그래밍 언어로 쓴 명령어들. 컴퓨터가 읽을 수 있는 글이에요.</dd></div><div class="glossary-item"><dt class="glossary-term">진공관</dt><dd class="glossary-def">전기 신호를 증폭하거나 스위치 역할을 하는 유리 부품. 1세대 컴퓨터의 핵심.</dd></div><div class="glossary-item"><dt class="glossary-term">트랜지스터</dt><dd class="glossary-def">전기 신호를 켜고 끄는 반도체 소자. 진공관을 대체한 2세대 핵심 부품.</dd></div><div class="glossary-item"><dt class="glossary-term">IC (집적 회로)</dt><dd class="glossary-def">Integrated Circuit. 여러 트랜지스터를 하나의 칩에 넣은 것.</dd></div><div class="glossary-item"><dt class="glossary-term">마이크로프로세서</dt><dd class="glossary-def">CPU 전체를 하나의 칩에 담은 것. 4세대 컴퓨터의 핵심.</dd></div><div class="glossary-item"><dt class="glossary-term">무어의 법칙</dt><dd class="glossary-def">칩의 트랜지스터 수가 약 2년마다 2배로 늘어난다는 관찰.</dd></div><div class="glossary-item"><dt class="glossary-term">폰 노이만 아키텍처</dt><dd class="glossary-def">프로그램과 데이터를 같은 메모리에 저장하는 컴퓨터 설계 방식.</dd></div><div class="glossary-item"><dt class="glossary-term">하버드 아키텍처</dt><dd class="glossary-def">프로그램용 메모리와 데이터용 메모리를 분리한 컴퓨터 설계 방식.</dd></div><div class="glossary-item"><dt class="glossary-term">튜링 머신</dt><dd class="glossary-def">앨런 튜링이 제안한 이론적 계산 모델. 계산 가능성의 기준이 되는 개념.</dd></div><div class="glossary-item"><dt class="glossary-term">정지 문제</dt><dd class="glossary-def">프로그램이 끝나는지 영원히 실행되는지 미리 판단하는 것은 불가능하다는 문제.</dd></div><div class="glossary-item"><dt class="glossary-term">양자 컴퓨터</dt><dd class="glossary-def">큐비트를 사용하여 0과 1을 동시에 처리할 수 있는 차세대 컴퓨터.</dd></div><div class="glossary-item"><dt class="glossary-term">큐비트</dt><dd class="glossary-def">양자 컴퓨터의 정보 단위. 0과 1을 동시에 가질 수 있어요 (중첩).</dd></div><div class="glossary-item"><dt class="glossary-term">뉴로모픽 칩</dt><dd class="glossary-def">사람 뇌의 뉴런과 시냅스를 모방한 반도체 칩.</dd></div><div class="glossary-item"><dt class="glossary-term">ALU</dt><dd class="glossary-def">Arithmetic Logic Unit(산술논리장치). 덧셈, 뺄셈, 비교 등 연산을 수행.</dd></div><div class="glossary-item"><dt class="glossary-term">프로그래밍 언어</dt><dd class="glossary-def">사람이 컴퓨터에게 명령을 전달하기 위해 사용하는 인공 언어. C, Python, Java 등.</dd></div></div>
<div class="visual-summary avoid-break"><div class="visual-summary-title">이번 유닛 핵심 정리</div><div class="visual-summary-items"><div class="visual-summary-item"><div class="visual-summary-num">1</div><span>컴퓨터는 빠른 계산, 정확한 반복, 완벽한 기억을 잘해요</span></div><div class="visual-summary-item"><div class="visual-summary-num">2</div><span>컴퓨터는 스스로 생각하거나 창의적인 일을 못해요</span></div><div class="visual-summary-item"><div class="visual-summary-num">3</div><span>프로그래밍은 컴퓨터에게 할 일을 코드로 알려주는 것이에요</span></div><div class="visual-summary-item"><div class="visual-summary-num">4</div><span>컴퓨터는 진공관 → 트랜지스터 → IC → 마이크로프로세서로 발전했어요</span></div><div class="visual-summary-item"><div class="visual-summary-num">5</div><span>무어의 법칙: 트랜지스터 수는 2년마다 2배로 증가</span></div><div class="visual-summary-item"><div class="visual-summary-num">6</div><span>폰 노이만 아키텍처: 프로그램과 데이터를 같은 메모리에 저장</span></div><div class="visual-summary-item"><div class="visual-summary-num">7</div><span>[심화] 튜링 머신은 계산 가능성의 이론적 기초</span></div></div></div>
<h2>━━━ 10축 심화 학습 ━━━</h2>
<h2>[컴퓨팅사고력] 문제 분해 실습 — 4단계 사고법</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble tip">컴퓨팅사고력은 코딩 전에 <b>생각하는 방법</b>이야. 컴퓨터처럼 문제를 쪼개고, 패턴을 찾고, 핵심만 뽑아내는 연습을 해 봐!</div>
      </div>
<p>컴퓨팅사고력(Computational Thinking)은 컴퓨터과학자들이 문제를 풀 때 사용하는 <b>4단계 사고법</b>이에요. 구글, 마이크로소프트 같은 회사에서도 이 방법으로 문제를 풀어요. 아래 그림을 보면서 자판기 예시로 연습해 봐요.</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/computational-thinking.svg" alt="컴퓨팅사고력 4단계 — 자판기 예시 다이어그램" style="max-width:100%"/><div class="image-caption">컴퓨팅사고력 4단계: 분해 → 패턴 인식 → 추상화 → 알고리즘</div></div>
<p>각 단계를 자판기로 자세히 연습해 볼까요?</p>
<div class="box box-key avoid-break"><span class="box-label">[1단계: 분해] 큰 문제를 작은 조각으로 쪼개기</span><div class="box-content"><b>문제:</b> '자판기에서 음료 사기'<br><br><b>분해 결과:</b><br>① 동전 넣기 (100원? 500원? 1000원?)<br>② 현재 금액 표시 (LCD 화면에 '500원' 같이 표시)<br>③ 음료 선택 (버튼 번호 1~10)<br>④ 금액 비교 (현재 금액 ≥ 음료 가격?)<br>⑤ 음료 배출 (모터 작동으로 밀어내기)<br>⑥ 거스름돈 계산 (현재 금액 - 음료 가격)<br>⑦ 거스름돈 반환 (동전 배출구로)<br><br>이렇게 쪼개면 각 조각은 '아주 간단한 일'이 돼요. 프로그래밍에서는 이 각 조각이 <b>함수</b>가 돼요.</div></div>
<div class="box box-key avoid-break"><span class="box-label">[2단계: 패턴 인식] 반복되는 규칙 찾기</span><div class="box-content">분해한 단계들을 보면 <b>반복되는 패턴</b>이 보여요:<br><br><b>패턴 1:</b> '동전 넣기 → 금액 증가' — 이것이 여러 번 반복됨!<br>→ C언어: <code>while(금액 < 음료가격) { 동전받기(); 금액 += 동전; }</code><br><br><b>패턴 2:</b> '버튼 눌림 확인' — 10개 버튼을 하나씩 확인<br>→ C언어: <code>for(int i=0; i<10; i++) { 버튼확인(i); }</code><br><br>패턴을 찾으면 → <b>반복문</b>으로 코드화할 수 있어요!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[3단계: 추상화] 핵심만 남기고 무시하기</span><div class="box-content">자판기를 프로그래밍할 때 <b>중요한 것</b>과 <b>무시할 것</b>:<br><br><b>✓ 중요한 것 (변수로 저장):</b><br>• 현재 금액 (int currentMoney)<br>• 음료 가격 (int price[10])<br>• 선택한 버튼 번호 (int buttonNum)<br><br><b>✗ 무시할 것:</b><br>• 동전의 색깔, 무게, 제조년도<br>• 자판기 외관 색깔, 브랜드<br>• 음료의 맛, 칼로리<br>• 날씨, 시간대<br><br>이것이 <b>추상화</b>! 현실의 복잡한 것을 프로그래밍에 필요한 <b>데이터</b>만 뽑아내는 거예요.</div></div>
<div class="box box-key avoid-break"><span class="box-label">[4단계: 알고리즘] 순서대로 절차 작성하기</span><div class="box-content">위 3단계를 종합하면 <b>알고리즘</b>(절차)이 완성돼요:<br><br><code>금액 = 0<br>반복 {<br>    동전을 받는다<br>    금액 = 금액 + 동전값<br>    화면에 금액을 표시한다<br>}<br>버튼 번호를 입력받는다<br>만약 금액 ≥ 해당 음료 가격 이면 {<br>    음료를 배출한다<br>    거스름돈 = 금액 - 음료 가격<br>    거스름돈을 반환한다<br>} 아니면 {<br>    '금액이 부족합니다' 표시<br>}</code><br><br>이것을 C코드로 옮기면 <b>진짜 프로그램</b>이 돼요! Part 3(조건문)까지 배우면 직접 만들 수 있어요.</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 16 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[컴퓨팅사고력] '학교 급식 배식 과정'을 4단계로 분석해 보세요.

1단계(분해): 급식 배식을 최소 7개 단계로 쪼개세요.
2단계(패턴): 반복되는 패턴을 2개 이상 찾으세요.
3단계(추상화): 프로그래밍할 때 필요한 데이터 3개와 무시할 것 3개를 적으세요.
4단계(알고리즘): 의사코드(순서대로 적은 절차)를 작성하세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[KOI] 정보올림피아드 실전 기출 유형</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">KOI(한국정보올림피아드) 1차 필기시험에서 '컴퓨터의 구조'와 '컴퓨터 역사'는 매년 출제되는 단골 주제야! 실제 기출 유형을 풀어 봐!</div>
      </div>
<p>KOI(한국정보올림피아드) 1차 필기시험에는 '컴퓨터 구조'와 '컴퓨터 역사' 문제가 <b>매년 2~3문제</b> 출제돼요. 지금부터 <b>실제 기출 유형과 동일한 문제</b>를 풀어 봐요. 정답과 풀이를 꼼꼼히 읽으세요.</p>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 1] 폰 노이만 아키텍처</span><div class="box-content"><b>문제:</b> 다음 중 폰 노이만 아키텍처의 특징이 <b>아닌</b> 것은?<br><br>(1) 프로그램과 데이터를 같은 메모리에 저장한다<br>(2) CPU는 연산장치(ALU)와 제어장치(CU)로 구성된다<br>(3) 명령어와 데이터를 <b>동시에</b> 읽을 수 있다<br>(4) 입력→처리→출력의 순서로 동작한다<br><br><b>정답: (3)</b><br><br><b>풀이:</b> 폰 노이만 아키텍처는 프로그램과 데이터가 <b>같은 메모리</b>를 공유해요. 그래서 CPU가 명령어를 읽을 때 동시에 데이터를 읽을 수 <b>없어요</b>. 이걸 '폰 노이만 병목'이라고 해요. 명령어와 데이터를 동시에 읽을 수 있는 건 <b>하버드 아키텍처</b>예요!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 2] 컴퓨터 세대</span><div class="box-content"><b>문제:</b> 컴퓨터의 핵심 부품이 시대순으로 올바르게 나열된 것은?<br><br>(1) IC → 진공관 → 트랜지스터 → 마이크로프로세서<br>(2) 진공관 → 트랜지스터 → IC → 마이크로프로세서<br>(3) 트랜지스터 → 진공관 → IC → 마이크로프로세서<br>(4) 진공관 → IC → 트랜지스터 → 마이크로프로세서<br><br><b>정답: (2)</b><br><br><b>풀이:</b> 외우는 법 — <b>'진(1)트(2)아이(3)마(4)'</b><br>• 1세대(1940s): <b>진</b>공관 — 크고 뜨겁고 잘 고장남. ENIAC이 대표<br>• 2세대(1950s): <b>트</b>랜지스터 — 작고 빠르고 튼튼. 벨연구소 발명<br>• 3세대(1960s): <b>아이</b>씨(IC) — 칩 하나에 트랜지스터 수천 개. 잭 킬비<br>• 4세대(1970s~): <b>마</b>이크로프로세서 — CPU 전체가 칩 하나에. Intel 4004</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 3] 입출력 장치 분류</span><div class="box-content"><b>문제:</b> 다음 장치를 입력/출력/기억 장치로 분류하세요.<br>키보드, 모니터, 마우스, 스피커, 프린터, RAM, SSD, 마이크, 웹캠, 터치스크린<br><br><b>정답:</b><br><b>입력 장치:</b> 키보드, 마우스, 마이크, 웹캠<br><b>출력 장치:</b> 모니터, 스피커, 프린터<br><b>입력+출력:</b> 터치스크린 (입력도 되고 출력도 됨!)<br><b>기억 장치:</b> RAM(주기억), SSD(보조기억)<br><br><b>주의:</b> 터치스크린처럼 입력과 출력 <b>둘 다</b> 되는 장치도 있어요. 이건 KOI 1차에서 함정으로 나와요!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 4] CPU 구성요소</span><div class="box-content"><b>문제:</b> CPU를 구성하는 두 핵심 장치의 이름과 역할을 쓰시오.<br><br><b>정답:</b><br><b>ALU (산술논리장치, Arithmetic Logic Unit):</b><br>• 덧셈, 뺄셈, 곱셈 등 <b>산술 연산</b> 수행<br>• AND, OR, NOT 등 <b>논리 연산</b> 수행<br>• 두 값의 크기 <b>비교</b> 수행<br><br><b>CU (제어장치, Control Unit):</b><br>• 메모리에서 <b>명령어를 읽어</b> 해석<br>• 각 장치에 <b>제어 신호</b>를 보내 동작을 지시<br>• 프로그램의 <b>실행 순서</b>를 관리<br><br><b>기억법:</b> ALU = 계산하는 두뇌 🧠, CU = 지시하는 사령관 🎖️</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 17 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[KOI 실전] 다음 중 주기억장치(RAM)에 대한 설명으로 틀린 것은?
(1) 전원이 꺼지면 내용이 사라진다
(2) CPU가 직접 접근할 수 있다
(3) SSD보다 속도가 느리다
(4) 현재 실행 중인 프로그램이 올라가는 곳이다

정답을 고르고, 왜 틀렸는지 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 18 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[KOI 실전] '무어의 법칙'에 대해 (1) 누가 주장했는지, (2) 내용이 무엇인지, (3) 최근 한계에 다다른 이유를 각각 한 문장씩 적으세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 19 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[KOI 실전] '폰 노이만 병목(von Neumann bottleneck)'이란 무엇인가요? (1) 원인, (2) 증상, (3) 해결 방법 한 가지를 각각 적으세요. (힌트: 캐시 메모리, 하버드 아키텍처)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[C언어 연결] printf로 컴퓨터에게 첫 명령하기</h2>
<p>이 유닛에서 '프로그래밍은 컴퓨터에게 할 일을 코드로 알려주는 것'이라고 배웠어요. Part 1에서 배울 C언어에서는 이렇게 생겼어요:</p>
<div class="code-block avoid-break"><div class="code-block-header">내 첫 번째 C 프로그램 (미리보기)</div>
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span>  <span class="cmt">// 도구 가져오기</span></td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code"><span class="type">int</span> <span class="fn">main</span>(<span class="type">void</span>) {    <span class="cmt">// 시작!</span></td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"안녕, 나는 컴퓨터야!<span class="esc">\\n</span>"</span>);</td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"1 + 2 = <span class="fmt">%d</span><span class="esc">\\n</span>"</span>, <span class="num">1</span> + <span class="num">2</span>);</td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code">    <span class="kw">return</span> <span class="num">0</span>;       <span class="cmt">// 끝!</span></td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code">}</td></tr></table></div>
<!-- unknown type: output-block -->
<div class="box box-tip avoid-break"><span class="box-label">[C 연결] 이 유닛 개념 → C 코드 대응표</span><div class="box-content"><b>컴퓨터에게 시키기</b> → <code>printf("출력할 내용")</code><br><b>빠른 계산</b> → <code>printf("%d", 38475 * 92847)</code> — 순식간에 답 나옴!<br><b>정확한 반복</b> → <code>for(int i=0; i<1000000; i++)</code> — 100만 번 반복<br><b>완벽한 기억</b> → <code>int phone[10000];</code> — 전화번호 1만 개 저장<br><br>Part 1 Unit 01에서 직접 타이핑하고 실행해 볼 거예요!</div></div>
<h2>[디버깅] 에러 분류 체계 — 컴퓨터는 왜 말을 안 들을까?</h2>
<p>프로그래밍을 하면 반드시 '에러'를 만나요. 프로 개발자도 하루에 수십 개의 에러를 만나요! 에러를 만났을 때 <b>어떤 종류의 에러인지 구별</b>하는 것이 첫 번째 단계예요. 아래 그림으로 3종류를 확실히 구별해 보세요.</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/error-types.svg" alt="프로그래밍 에러 3분류 — 컴파일 에러, 런타임 에러, 논리 에러" style="max-width:100%"/><div class="image-caption">에러 3분류: 찾기 쉬운 순서대로 컴파일 > 런타임 > 논리</div></div>
<p>각 에러를 C코드 예시로 자세히 알아볼게요.</p>
<div class="box box-warning avoid-break"><span class="box-label">[에러 1] 컴파일 에러 — 문법이 틀렸을 때</span><div class="box-content"><b>증상:</b> 코드를 컴파일하면 에러 메시지가 뜨고, 실행 파일이 만들어지지 않음<br><b>원인:</b> C언어 문법 규칙을 어김<br><br><b>예시 코드:</b><br><code>printf('Hello')  ← 작은따옴표 사용 (큰따옴표여야 함)</code><br><code>int x = 5        ← 세미콜론 없음!</code><br><code>pritnf("hi")    ← 오타! printf인데 pritnf</code><br><br><b>해결법:</b> 컴파일러가 '몇 번째 줄에서 에러'라고 알려줘요. 그 줄을 확인하면 거의 해결!<br><b>난이도: ⭐ (쉬움)</b> — 컴파일러가 친절하게 알려줘요</div></div>
<div class="box box-warning avoid-break"><span class="box-label">[에러 2] 런타임 에러 — 실행 중에 터지는 에러</span><div class="box-content"><b>증상:</b> 컴파일은 성공하지만, 실행 도중 프로그램이 갑자기 멈춤<br><b>원인:</b> 프로그램이 실행할 수 없는 상황을 만남<br><br><b>예시 상황:</b><br>• <code>int x = 10 / 0;</code> ← 0으로 나누기! 수학에서도 불가능<br>• 배열 크기가 10인데 20번째 칸에 접근 (범위 초과)<br>• 함수가 자기 자신을 끝없이 호출 (무한 재귀 → 스택 오버플로우)<br><br><b>해결법:</b> 문제가 되는 입력값이나 상황을 찾아서, 조건문으로 미리 막아야 해요<br><b>난이도: ⭐⭐ (중간)</b> — 특정 상황에서만 발생해서 찾기 어려울 수 있어요</div></div>
<div class="box box-warning avoid-break"><span class="box-label">[에러 3] 논리 에러 — 가장 무서운 에러</span><div class="box-content"><b>증상:</b> 컴파일 OK, 실행 OK, 그런데 <b>결과가 틀림</b>!<br><b>원인:</b> 코드의 논리(알고리즘)가 잘못됨<br><br><b>예시:</b><br>1~100 합산 프로그램에서 <code>for(i=1; i<100; i++)</code>라고 쓰면?<br>→ i가 99까지만 진행해서 결과가 <b>4950</b> (정답 5050이 아님!)<br>→ <code>i<=100</code>으로 고쳐야 함<br><br>원의 넓이: <code>3.41 * r * r</code> → 3.<b>14</b>인데 3.<b>41</b>로 오타!<br>→ 실행은 되지만 결과가 살짝 다르게 나옴<br><br><b>해결법:</b> 테스트 케이스를 여러 개 만들어서 결과를 확인하고, 코드를 한 줄씩 추적<br><b>난이도: ⭐⭐⭐ (어려움)</b> — 컴퓨터가 안 알려줘요. 직접 찾아야 해요!</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 20 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[디버깅] 다음 5개 상황이 어떤 에러인지 분류하고, 이유를 적으세요:
(1) 프로그램에 세미콜론을 빠뜨렸다
(2) 원의 넓이를 구하는데 3.14 대신 3.41을 적었다
(3) 배열 크기가 5인데 10번째 칸에 접근했다
(4) printf를 prtinf로 오타를 냈다
(5) 1부터 N까지 합을 구하는데 결과가 항상 N만큼 적게 나온다</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[하드웨어] CPU가 명령을 처리하는 과정</h2>
<p>CPU가 <code>printf("Hello")</code> 같은 명령어 <b>하나</b>를 처리할 때도, 내부에서는 4단계를 거쳐요. 이걸 <b>명령어 사이클</b>(Instruction Cycle)이라고 해요. 아래 그림으로 확인해 봐요.</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/cpu-cycle.svg" alt="CPU 명령어 사이클 4단계 다이어그램" style="max-width:100%"/><div class="image-caption">CPU는 이 4단계를 1초에 수십억 번 반복해요!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[하드웨어] 명령어 사이클 예시 — 'x = 3 + 5' 처리 과정</span><div class="box-content">C코드 <code>int x = 3 + 5;</code>를 CPU가 처리하는 과정:<br><br><b>① 인출(Fetch):</b> RAM에 저장된 '3+5 계산하라'는 명령어를 CPU로 가져옴<br><b>② 해독(Decode):</b> CU(제어장치)가 '이것은 덧셈 명령이고, 피연산자는 3과 5'라고 해석<br><b>③ 실행(Execute):</b> ALU(산술논리장치)가 3+5=8을 계산<br><b>④ 저장(Store):</b> 결과 8을 RAM의 x 변수 위치에 저장<br><br>이 과정이 <b>1나노초(10억분의 1초)</b> 안에 끝나요!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[하드웨어] CPU 성능 3대 요소</span><div class="box-content"><b>1. 클럭 속도(GHz)</b><br>• 1초에 몇 십억 번 사이클을 반복하는지<br>• 3GHz = 1초에 30억 번! 4.5GHz = 45억 번!<br>• 비유: 심장 박동수. 빠를수록 일을 빨리 함<br><br><b>2. 코어(Core) 수</b><br>• CPU 안에 독립적인 계산 유닛이 몇 개인지<br>• 8코어 = 8명이 동시에 일하는 것<br>• 비유: 요리사 수. 많을수록 동시에 여러 요리 가능<br><br><b>3. 캐시(Cache) 메모리</b><br>• CPU 바로 옆에 붙은 초고속 임시 저장소<br>• RAM보다 100배 빠르지만, 용량은 수 MB로 작음<br>• 비유: 요리사 바로 앞의 도마. 냉장고(RAM)까지 안 가도 됨</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[실습] 내 컴퓨터 CPU 확인하기</span><div class="box-content"><b>Windows:</b> Ctrl+Shift+Esc → 성능 탭 → CPU<br><b>Mac:</b> 좌측 상단 🍎 → 이 Mac에 관하여<br><br>확인할 것:<br>• CPU 이름 (예: Intel i7-13700H, Apple M2)<br>• 기본 속도 (예: 2.40 GHz)<br>• 코어 수 (예: 14코어)<br>• 논리 프로세서 수 (하이퍼스레딩 포함)<br><br>친구랑 비교해 보세요! 누구 CPU가 더 빠른지?</div></div>
<h2>[실생활] 프로그래밍이 만든 세상 — 숨겨진 컴퓨터들</h2>
<p>여러분 집에는 '컴퓨터'가 몇 대 있나요? PC, 노트북만 생각했다면 오산이에요! 우리 주변에는 <b>눈에 보이지 않는 컴퓨터</b>가 수백 개 있어요. 이것들을 <b>임베디드 시스템</b>(Embedded System)이라고 해요. 아래 그림으로 확인해 봐요.</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/embedded-systems.svg" alt="숨겨진 컴퓨터들 — 자동차, 전자레인지, 엘리베이터, 신호등, 스마트워치" style="max-width:100%"/><div class="image-caption">우리 주변의 임베디드 시스템 5가지 — 전부 프로그래밍된 컴퓨터!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[실생활] 임베디드 시스템이 중요한 이유</span><div class="box-content"><b>자동차의 ECU</b>에 버그가 있으면? → 브레이크가 안 걸려서 <b>사고</b>!<br><b>전자레인지</b>에 버그가 있으면? → 음식이 타거나 <b>폭발</b>!<br><b>비행기 제어장치</b>에 버그가 있으면? → <b>추락</b>!<br><br>이래서 임베디드 프로그래머들은 코드를 <b>수천 번 테스트</b>해요. C언어가 이런 시스템에 많이 쓰이는 이유는 <b>빠르고</b> + <b>하드웨어를 직접 제어</b>할 수 있기 때문이에요.<br><br>지금 C언어를 배우면, 나중에 로봇, 드론, 자율주행차를 만드는 데 쓸 수 있어요!</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 21 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>[실생활] 집에서 '숨겨진 컴퓨터(임베디드 시스템)'를 5개 찾아보세요. 각각에 대해:
(1) 기기 이름
(2) 어떤 입력을 받는지 (센서, 버튼 등)
(3) 어떤 처리를 하는지
(4) 어떤 출력을 하는지
를 적어 보세요.

예시) 세탁기: 입력=버튼(코스선택), 처리=세탁시간계산, 출력=모터회전+물배출</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[코딩기초] 순차 구조 — 프로그래밍의 가장 기본 원리</h2>
<p>프로그래밍의 3대 구조는 <b>순차</b>, <b>선택(조건)</b>, <b>반복</b>이에요. 그중 가장 기본은 <b>순차 구조</b>예요. 코드는 <b>위에서 아래로, 한 줄씩 차례대로</b> 실행돼요. 아래 그림으로 레시피와 코드를 비교해 봐요.</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/sequential-execution.svg" alt="순차 구조 — 라면 레시피 vs C 코드 비교" style="max-width:100%"/><div class="image-caption">순차 구조: 레시피처럼 위에서 아래로 한 줄씩 실행!</div></div>
<p>프로그래밍의 3대 구조를 미리 알아둬요. Part 1~4에서 직접 코드로 배울 거예요.</p>
<div class="steps-visual avoid-break"></div>
<div class="box box-warning avoid-break"><span class="box-label">[코딩기초] 순서를 바꾸면 — 실제 버그 사례</span><div class="box-content"><b>사례 1: 라면</b><br>스프를 물 넣기 전에 하면? → 스프가 냄비에 눌어붙어요!<br><br><b>사례 2: 변수 사용</b><br><code>printf("%d", x);</code> ← x를 출력<br><code>int x = 10;</code> ← 이제야 x를 만듦<br>→ <b>컴파일 에러!</b> x를 만들기 전에 사용함. 순서를 바꿔야 해요.<br><br><b>사례 3: 연산 순서</b><br><code>int avg = sum / count;</code> ← 평균 계산<br><code>sum = sum + newValue;</code> ← 합에 새 값 추가<br>→ <b>논리 에러!</b> 새 값을 더하기 전에 평균을 계산했어요.<br><br>프로그래밍 버그의 <b>약 30%</b>가 '순서 실수'에서 나와요!</div></div>
<div class="box box-summary avoid-break"><span class="box-label">이 유닛에서 깊이 배운 10축</span><div class="box-content"><b>[컴퓨팅사고력]</b> 4단계 사고법(분해→패턴→추상화→알고리즘) 실습. 자판기, 로봇청소기 문제 분석<br><b>[KOI]</b> 1차 필기 기출 유형: 폰 노이만 구조, 컴퓨터 세대, 입출력 장치 분류. 실전 문제 3개 풀이<br><b>[C언어]</b> printf 코드 미리보기. 컴퓨터의 3가지 능력(계산/반복/기억)이 C코드로 어떻게 표현되는지<br><b>[디버깅]</b> 에러 3분류(컴파일/런타임/논리) 체계 학습. 실전 분류 연습<br><b>[하드웨어]</b> CPU 명령어 사이클 4단계(인출→해독→실행→저장). 클럭/코어/캐시 개념<br><b>[실생활]</b> 임베디드 시스템 5가지 사례. 숨겨진 컴퓨터 찾기 활동<br><b>[코딩기초]</b> 순차 구조 원리. 순서의 중요성 — 레시피와 코드 비교</div></div>
<div class="box box-history avoid-break"><span class="box-label">[실생활] 프로그래밍이 쓰이는 곳</span><div class="box-content">게임 속 캐릭터가 움직이는 것, 유튜브가 영상을 추천하는 것, 카카오톡에서 메시지가 전달되는 것 — 전부 누군가가 프로그래밍한 결과예요. 프로그래머가 코드를 안 썼으면 이런 것들이 존재하지 않아요.</div></div>
<div class="box box-question avoid-break"><span class="box-label">[다음 유닛 미리보기]</span><div class="box-content">컴퓨터가 빠르게 계산한다고 했는데, 도대체 컴퓨터 안에 뭐가 들어있길래 그렇게 빠를까요? 다음 유닛에서 컴퓨터의 부품(하드웨어)을 하나씩 뜯어볼 거예요!</div></div>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-hello.svg" alt="마스코트" />
        <div class="mascot-bubble celebrate">첫 번째 유닛 끝! 컴퓨터가 뭘 잘하고 뭘 못하는지, 어떻게 발전해 왔는지, 그리고 미래 컴퓨터까지 알아봤어요. 다음에는 컴퓨터 안에 뭐가 들어있는지 구경해 봐요!</div>
      </div>
</article>`,
            },
        ],
    },
    {
        id: 'cb-u02',
        unitNumber: 2,
        title: `컴퓨터는 어떻게 생겼을까? (하드웨어)`,
        type: '이론' as const,
        problems: [],
        pages: [
            {
                id: 'cb-u02-p1',
                title: `컴퓨터는 어떻게 생겼을까? (하드웨어)`,
                type: '페이지' as const,
                content: `<style>
/* ═══════════════════════════════════════════════════════════════
   코딩쏙 프리미엄 PDF 교재 스타일시트 v5.0
   Paged.js + A4 인쇄 최적화 + 아동교육 디자인 시스템
   ═══════════════════════════════════════════════════════════════ */

/* ── 리셋 & 기본 ── */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --c-primary: #FF6B6B;
  --c-primary-light: #FFE8E8;
  --c-primary-dark: #E84545;
  --c-accent: #4ECDC4;
  --c-accent-light: #E8FFF9;
  --c-blue: #3B82F6;
  --c-blue-light: #EFF6FF;
  --c-purple: #8B5CF6;
  --c-purple-light: #F5F3FF;
  --c-orange: #F59E0B;
  --c-orange-light: #FFFBEB;
  --c-green: #10B981;
  --c-green-light: #ECFDF5;
  --c-red: #EF4444;
  --c-red-light: #FEF2F2;
  --c-teal: #14B8A6;
  --c-teal-light: #F0FDFA;
  --c-pink: #EC4899;
  --c-text: #1E293B;
  --c-text-secondary: #64748B;
  --c-text-muted: #94A3B8;
  --c-border: #E2E8F0;
  --c-bg-subtle: #F8FAFC;
  --c-bg-warm: #FFFBF5;
  --font-body: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-code: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.10);
}

/* ── 페이지 설정 ── */
@page {
  size: A4;
  margin: 18mm 17mm 15mm 22mm;
  @bottom-center {
    content: counter(page);
    font-family: var(--font-body);
    font-size: 9pt;
    color: var(--c-text-muted);
    letter-spacing: 1px;
  }
}
@page :first { @bottom-center { content: none; } }

body {
  font-family: var(--font-body);
  color: var(--c-text);
  background: white;
  font-size: 11.5pt;
  line-height: 180%;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ── 페이지 제어 ── */
.avoid-break { break-inside: avoid !important; page-break-inside: avoid !important; }
h2, h3 { break-after: avoid !important; page-break-after: avoid !important; }
.page-break-hint { break-before: page !important; page-break-before: always !important; height: 0; margin: 0; padding: 0; }
p { orphans: 3; widows: 3; }

/* ═══════════════════════════════════════
   레슨 헤더 — 프리미엄 그래디언트 배너
   ═══════════════════════════════════════ */
.lesson-header {
  margin-bottom: 6mm;
  padding: 6mm 5mm 5mm;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FEC89A 100%);
  border-radius: var(--radius-xl);
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.lesson-header::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -10%;
  width: 140px;
  height: 140px;
  background: rgba(255,255,255,0.12);
  border-radius: 50%;
}
.lesson-header::after {
  content: '';
  position: absolute;
  bottom: -20%;
  left: 15%;
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
}
.lesson-number {
  font-size: 10pt;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin-bottom: 2mm;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}
.lesson-title {
  font-size: 24pt;
  font-weight: 900;
  line-height: 125%;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.15);
  position: relative;
  z-index: 1;
}
.lesson-summary {
  font-size: 11pt;
  color: rgba(255,255,255,0.9);
  margin-top: 2.5mm;
  font-weight: 400;
  position: relative;
  z-index: 1;
}

/* ═══════════════════════════════════════
   제목 계층 — 프리미엄 타이포그래피
   ═══════════════════════════════════════ */
h2 {
  font-size: 16pt;
  font-weight: 800;
  margin: 6mm 0 3mm;
  padding: 2mm 0 2mm 4.5mm;
  border-left: 4.5px solid var(--c-primary);
  color: var(--c-text);
  background: linear-gradient(90deg, var(--c-primary-light) 0%, transparent 60%);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  letter-spacing: -0.3px;
}
h3 {
  font-size: 13.5pt;
  font-weight: 700;
  color: #334155;
  margin: 4mm 0 2.5mm;
  padding-bottom: 1mm;
  border-bottom: 2px solid #F1F5F9;
}
p {
  margin-bottom: 2.5mm;
  text-align: justify;
  line-height: 175%;
  font-size: 11.5pt;
}

/* ── 인라인 코드 ── */
code {
  font-family: var(--font-code);
  font-size: 9.5pt;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  padding: 0.5mm 2mm;
  border-radius: 4px;
  color: #92400E;
  border: 1px solid #FCD34D;
  font-weight: 500;
}

/* ═══════════════════════════════════════
   코드 블록 — 프리미엄 IDE 스타일
   ═══════════════════════════════════════ */
.code-block {
  background: #0F172A;
  border-radius: var(--radius-md);
  padding: 0;
  margin: 3mm 0;
  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.05);
  overflow: hidden;
  border: 1px solid #1E293B;
}
.code-block-header {
  font-family: var(--font-body);
  font-size: 8.5pt;
  font-weight: 600;
  color: #94A3B8;
  padding: 2.5mm 4.5mm;
  background: #1E293B;
  border-bottom: 1px solid #334155;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.code-block-header::before {
  content: '';
  display: inline-flex;
  width: 8px; height: 8px;
  background: #EF4444;
  border-radius: 50%;
  box-shadow: 14px 0 0 #F59E0B, 28px 0 0 #22C55E;
  flex-shrink: 0;
}
.code-table { width: 100%; border-collapse: collapse; }
.code-table td { vertical-align: top; padding: 0; }
.line-num {
  width: 10mm;
  text-align: right;
  padding: 0.5mm 3mm 0.5mm 0;
  font-family: var(--font-code);
  font-size: 8pt;
  color: #475569;
  line-height: 165%;
  user-select: none;
  background: rgba(0,0,0,0.15);
}
.line-code {
  font-family: var(--font-code);
  font-size: 10pt;
  color: #E2E8F0;
  line-height: 165%;
  padding: 0.5mm 4mm 0.5mm 3mm;
  white-space: pre;
}
.line-highlight td { background: rgba(59,130,246,0.12) !important; }
.line-highlight .line-num { color: var(--c-blue) !important; font-weight: 700; }

/* 신택스 컬러 — VS Code Dark+ 영감 */
.kw { color: #C084FC; font-weight: 500; }
.str { color: #86EFAC; }
.cmt { color: #6B7280; font-style: italic; }
.fn { color: #FDBA74; }
.pp { color: #F472B6; font-weight: 600; }
.num { color: #7DD3FC; }
.type { color: #5EEAD4; font-weight: 500; }
.mc { color: #67E8F9; }
.esc { color: #FCD34D; font-weight: 600; }
.fmt { color: #FCD34D; }

/* ═══════════════════════════════════════
   실행 결과 — 터미널 스타일
   ═══════════════════════════════════════ */
.output-block {
  background: #F0FDF4;
  border: 1.5px solid #86EFAC;
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin: 3mm 0;
  position: relative;
}
.output-label {
  font-family: var(--font-body);
  font-size: 8.5pt;
  color: var(--c-green);
  display: block;
  margin-bottom: 1.5mm;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.output-text {
  font-family: var(--font-code);
  font-size: 10.5pt;
  line-height: 160%;
  color: #166534;
}

/* ═══════════════════════════════════════
   박스 시스템 — 프리미엄 카드 디자인
   ═══════════════════════════════════════ */
.box {
  border-radius: var(--radius-md);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  position: relative;
  box-shadow: var(--shadow-sm);
}
.box-label {
  font-size: 10.5pt;
  font-weight: 800;
  margin-bottom: 2mm;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.box-content { font-size: 11pt; line-height: 170%; }
.box-warning {
  border-left: 5px solid var(--c-red);
  background: linear-gradient(135deg, #FEF2F2 0%, #FFF1F2 100%);
}
.box-warning .box-label { color: var(--c-red); }
.box-key {
  border-left: 5px solid var(--c-blue);
  background: linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%);
}
.box-key .box-label { color: var(--c-blue); }
.box-tip {
  border-left: 5px solid var(--c-orange);
  background: linear-gradient(135deg, #FFFBEB 0%, #FEF9C3 50%, #FFFBEB 100%);
}
.box-tip .box-label { color: var(--c-orange); }
.box-summary {
  border-left: 5px solid var(--c-green);
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border: 1.5px solid #A7F3D0;
  border-left: 5px solid var(--c-green);
}
.box-summary .box-label { color: var(--c-green); }
.box-question {
  border-left: 5px solid var(--c-purple);
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
}
.box-question .box-label { color: var(--c-purple); }
.box-history {
  border-left: 5px solid var(--c-teal);
  background: linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%);
}
.box-history .box-label { color: var(--c-teal); }

/* ═══════════════════════════════════════
   연습문제 — 프리미엄 카드
   ═══════════════════════════════════════ */
.exercise {
  background: white;
  border: 1.5px solid #E2E8F0;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  border-left: 5px solid var(--c-primary);
  box-shadow: var(--shadow-sm);
  position: relative;
}
.exercise-title {
  font-size: 13pt;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 2.5mm;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.difficulty {
  display: inline-flex;
  align-items: center;
  font-size: 8pt;
  padding: 0.5mm 2.5mm;
  border-radius: 20px;
  margin-left: 2mm;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.diff-1 { background: #D1FAE5; color: #059669; }
.diff-2 { background: #FEF3C7; color: #D97706; }
.diff-3 { background: #FEE2E2; color: #DC2626; }
.memo-area {
  border: 2px dashed #CBD5E1;
  border-radius: var(--radius-md);
  padding: 3mm;
  min-height: 15mm;
  margin-top: 2.5mm;
  background: repeating-linear-gradient(
    transparent, transparent 7mm, #F1F5F9 7mm, #F1F5F9 7.5mm
  );
}
.memo-label { font-size: 8.5pt; color: var(--c-text-muted); font-style: italic; }

/* ── OX/Choice/Short ── */
.exercise-answer {
  font-size: 10pt;
  color: var(--c-green);
  margin-top: 2mm;
  padding: 1.5mm 3mm;
  background: var(--c-green-light);
  border-radius: var(--radius-sm);
  font-weight: 600;
  border: 1px solid #A7F3D0;
}
.exercise-explain {
  font-size: 9.5pt;
  color: var(--c-text-secondary);
  margin-top: 1.5mm;
  padding: 2mm 3mm;
  background: #F8FAFC;
  border-radius: var(--radius-sm);
  border-left: 3px solid #E2E8F0;
}
.choice-list { padding-left: 6mm; margin: 2mm 0; }
.choice-list li { font-size: 10.5pt; margin-bottom: 1.5mm; line-height: 150%; }
.choice-list li.choice-correct { color: var(--c-green); font-weight: 700; }

/* ═══════════════════════════════════════
   Before/After 비교 — 프리미엄 2컬럼
   ═══════════════════════════════════════ */
.compare {
  display: flex;
  gap: 3mm;
  margin: 3mm 0;
  overflow: hidden;
}
.compare-bad {
  flex: 1;
  min-width: 0;
  background: linear-gradient(135deg, #FEF2F2, #FFF1F2);
  border: 1.5px solid #FECACA;
  border-radius: var(--radius-md);
  padding: 3mm;
  overflow: hidden;
}
.compare-good {
  flex: 1;
  min-width: 0;
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border: 1.5px solid #A7F3D0;
  border-radius: var(--radius-md);
  padding: 3mm;
  overflow: hidden;
}
.compare code {
  font-size: 9pt;
  word-break: break-all;
  overflow-wrap: break-word;
  display: block;
  background: rgba(0,0,0,0.05);
  padding: 2mm 3mm;
  border-radius: var(--radius-sm);
  margin: 1.5mm 0;
  line-height: 155%;
  white-space: pre-wrap;
  border: none;
  color: inherit;
}
.compare-label { font-size: 9.5pt; font-weight: 800; margin-bottom: 1.5mm; }
.compare-bad .compare-label { color: var(--c-red); }
.compare-good .compare-label { color: var(--c-green); }
.compare-msg-bad { font-size: 9pt; color: var(--c-red); }
.compare-msg-good { font-size: 9pt; color: var(--c-green); }

/* ═══════════════════════════════════════
   챕터 시작 — 프리미엄 카드
   ═══════════════════════════════════════ */
.chapter-start-box { margin-bottom: 3mm; }
.learning-goals {
  background: linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 100%);
  border-radius: var(--radius-lg);
  padding: 4mm 5mm;
  margin-bottom: 3mm;
  border: 1.5px solid #FED7AA;
  box-shadow: var(--shadow-sm);
}
.learning-goals h3 {
  font-size: 12pt;
  font-weight: 800;
  color: #EA580C;
  margin: 0 0 2.5mm;
  border: none;
  padding: 0;
}
.learning-goals ul { padding-left: 5mm; margin: 0; }
.learning-goals li { font-size: 11pt; margin-bottom: 1.5mm; line-height: 160%; color: #431407; }
.prereq-check {
  background: var(--c-blue-light);
  border-left: 5px solid var(--c-blue);
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin-bottom: 2.5mm;
}
.prereq-check h3 {
  font-size: 11pt;
  font-weight: 700;
  color: var(--c-blue);
  margin: 0 0 1.5mm;
  border: none;
  padding: 0;
}
.checklist { list-style: none; padding-left: 4mm; margin: 0; }
.checklist li { margin-bottom: 1mm; font-size: 10.5pt; }
.checklist li::before { content: '\\2610  '; font-size: 12pt; color: var(--c-text-muted); }
.progress-section { margin-top: 2.5mm; }
.progress-label { font-size: 9.5pt; color: var(--c-text-secondary); font-weight: 600; }
.progress-bar {
  background: #E2E8F0;
  border-radius: 6px;
  height: 4mm;
  margin-top: 1.5mm;
  overflow: hidden;
}
.progress-fill {
  background: linear-gradient(90deg, var(--c-primary), #FF8E53, #FEC89A);
  height: 100%;
  border-radius: 6px;
}

/* ═══════════════════════════════════════
   Predict — 생각해보기 카드
   ═══════════════════════════════════════ */
.predict-box {
  display: flex;
  gap: 3.5mm;
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
  border: 1.5px solid #C4B5FD;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  box-shadow: var(--shadow-sm);
}
.predict-icon {
  width: 10mm; height: 10mm;
  background: linear-gradient(135deg, var(--c-purple), #A78BFA);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16pt;
  font-weight: 900;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(139,92,246,0.3);
}
.predict-content { flex: 1; }
.predict-content p { font-size: 11pt; margin-bottom: 2mm; }

/* ═══════════════════════════════════════
   다이어그램 — 프리미엄 컨테이너
   ═══════════════════════════════════════ */
.diagram-box {
  background: var(--c-bg-subtle);
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 4mm;
  margin: 3.5mm 0;
  box-shadow: var(--shadow-sm);
}
.diagram-title {
  font-size: 11pt;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 3mm;
  text-align: center;
  letter-spacing: 0.3px;
}
.diagram-content { font-size: 10.5pt; line-height: 170%; }
.diagram-content .d-row { display: flex; align-items: center; justify-content: center; gap: 3mm; margin: 2mm 0; }
.diagram-content .d-block { background: #1E293B; color: white; padding: 2mm 4mm; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 9.5pt; font-weight: 500; }
.diagram-content .d-block-highlight { background: linear-gradient(135deg, var(--c-primary), #FF8E53); color: white; padding: 2mm 4mm; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 9.5pt; font-weight: 700; }
.diagram-content .d-arrow { color: var(--c-text-muted); font-size: 14pt; }
.diagram-content .d-label { font-size: 8.5pt; color: var(--c-text-secondary); }

/* ═══════════════════════════════════════
   Steps — 프리미엄 타임라인
   ═══════════════════════════════════════ */
.steps-visual { margin: 3mm 0; }
.step-item {
  display: flex;
  align-items: flex-start;
  gap: 3.5mm;
  margin-bottom: 1.5mm;
}
.step-num {
  width: 8mm; height: 8mm;
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10pt;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 0.5mm;
  box-shadow: 0 2px 4px rgba(255,107,107,0.3);
}
.step-body { flex: 1; }
.step-title { font-size: 11pt; font-weight: 700; margin-bottom: 0.5mm; color: var(--c-text); }
.step-desc { font-size: 10.5pt; color: var(--c-text-secondary); line-height: 160%; }
.step-connector { width: 2.5px; height: 4mm; background: linear-gradient(180deg, var(--c-primary), transparent); margin-left: 3.7mm; }

/* ═══════════════════════════════════════
   Modify — 바꿔보기 카드
   ═══════════════════════════════════════ */
.modify-box {
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  border: 1.5px solid #7DD3FC;
  border-left: 5px solid #0EA5E9;
  border-radius: var(--radius-md);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
}
.modify-label { font-size: 10.5pt; font-weight: 800; color: #0284C7; margin-bottom: 2mm; }
.modify-hint { font-size: 9.5pt; color: var(--c-text-secondary); font-style: italic; margin: 1.5mm 0; }

/* ═══════════════════════════════════════
   정답 섹션
   ═══════════════════════════════════════ */
.answers-section {
  background: white;
  border: 1.5px solid #E9D5FF;
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin: 3mm 0;
  border-left: 5px solid var(--c-purple);
}
.answers-section h3 {
  font-size: 12pt;
  font-weight: 800;
  color: var(--c-purple);
  margin: 0 0 2.5mm;
  border: none;
  padding: 0;
}
.answer-item { margin-bottom: 1mm; font-size: 10pt; line-height: 150%; }
.answer-num { font-weight: 700; color: var(--c-primary); margin-right: 2mm; }
.answer-text { color: var(--c-text); }

/* ═══════════════════════════════════════
   코드 설명 (라인별)
   ═══════════════════════════════════════ */
.code-explain { margin: 3mm 0; padding-left: 2mm; }
.code-explain-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.5mm;
  font-size: 11pt;
  line-height: 165%;
}
.code-explain-line {
  font-family: var(--font-code);
  font-size: 9pt;
  color: white;
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  padding: 0.5mm 2.5mm;
  border-radius: 4px;
  margin-right: 3mm;
  flex-shrink: 0;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(255,107,107,0.3);
}

/* ═══════════════════════════════════════
   용어 정리 — 프리미엄 테이블
   ═══════════════════════════════════════ */
.glossary { margin: 3mm 0; break-inside: avoid; }
.glossary-item {
  display: flex;
  margin-bottom: 0;
  font-size: 10pt;
  padding: 2mm 3mm;
  border-bottom: 1px solid #F1F5F9;
}
.glossary-item:nth-child(odd) { background: #F8FAFC; }
.glossary-item:first-child { border-radius: var(--radius-sm) var(--radius-sm) 0 0; }
.glossary-item:last-child { border-radius: 0 0 var(--radius-sm) var(--radius-sm); border-bottom: none; }
.glossary-term {
  font-weight: 700;
  min-width: 28mm;
  flex-shrink: 0;
  color: var(--c-text);
  font-family: var(--font-code);
  font-size: 9.5pt;
}
.glossary-def { color: var(--c-text-secondary); line-height: 155%; }

/* ═══════════════════════════════════════
   추적 테이블 — 프리미엄 데이터 테이블
   ═══════════════════════════════════════ */
.trace-table { margin: 3.5mm 0; }
.trace-caption { font-size: 10.5pt; font-weight: 700; color: var(--c-primary); margin-bottom: 2mm; }
.trace-table table { width: 100%; border-collapse: collapse; font-size: 10pt; border-radius: var(--radius-sm); overflow: hidden; }
.trace-table th {
  background: linear-gradient(135deg, #1E293B, #334155);
  color: white;
  padding: 2mm 3.5mm;
  text-align: left;
  font-weight: 700;
  font-size: 9.5pt;
}
.trace-table td { padding: 2mm 3.5mm; border-bottom: 1px solid #F1F5F9; font-family: var(--font-code); font-size: 9.5pt; }
.trace-table tr:nth-child(even) td { background: #F8FAFC; }

/* ═══════════════════════════════════════
   마스코트 말풍선 — 프리미엄 디자인
   ═══════════════════════════════════════ */
.mascot-speech {
  display: flex;
  align-items: flex-start;
  gap: 3.5mm;
  margin: 3.5mm 0;
}
.mascot-speech.right { flex-direction: row-reverse; }
.mascot-speech-img {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
}
.mascot-speech-img.small { width: 48px; height: 48px; }
.mascot-speech-img.large { width: 80px; height: 80px; }
.mascot-bubble {
  position: relative;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border: 1.5px solid #93C5FD;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  font-size: 10.5pt;
  color: #1E3A5F;
  line-height: 1.6;
  flex: 1;
  max-width: 85%;
  box-shadow: var(--shadow-sm);
}
.mascot-bubble.warn {
  background: linear-gradient(135deg, #FEF2F2, #FEE2E2);
  border-color: #FCA5A5;
  color: #7F1D1D;
}
.mascot-bubble.success {
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border-color: #6EE7B7;
  color: #14532D;
}
.mascot-bubble.tip {
  background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  border-color: #FCD34D;
  color: #78350F;
}
.mascot-bubble::before {
  content: '';
  position: absolute;
  top: 14px;
  left: -9px;
  border: 7px solid transparent;
  border-right-color: #93C5FD;
}
.mascot-bubble::after {
  content: '';
  position: absolute;
  top: 15px;
  left: -7px;
  border: 6px solid transparent;
  border-right-color: #EFF6FF;
}
.mascot-speech.right .mascot-bubble::before {
  left: auto; right: -9px;
  border-right-color: transparent;
  border-left-color: #93C5FD;
}
.mascot-speech.right .mascot-bubble::after {
  left: auto; right: -7px;
  border-right-color: transparent;
  border-left-color: #EFF6FF;
}
.mascot-bubble.warn::before { border-right-color: #FCA5A5; }
.mascot-bubble.warn::after { border-right-color: #FEF2F2; }
.mascot-speech.right .mascot-bubble.warn::before { border-right-color: transparent; border-left-color: #FCA5A5; }
.mascot-speech.right .mascot-bubble.warn::after { border-right-color: transparent; border-left-color: #FEF2F2; }
.mascot-bubble.success::before { border-right-color: #6EE7B7; }
.mascot-bubble.success::after { border-right-color: #ECFDF5; }
.mascot-speech.right .mascot-bubble.success::before { border-right-color: transparent; border-left-color: #6EE7B7; }
.mascot-speech.right .mascot-bubble.success::after { border-right-color: transparent; border-left-color: #ECFDF5; }
.mascot-bubble.tip::before { border-right-color: #FCD34D; }
.mascot-bubble.tip::after { border-right-color: #FFFBEB; }
.mascot-speech.right .mascot-bubble.tip::before { border-right-color: transparent; border-left-color: #FCD34D; }
.mascot-speech.right .mascot-bubble.tip::after { border-right-color: transparent; border-left-color: #FFFBEB; }

/* ═══════════════════════════════════════
   Fact Bite — 숫자/팩트 강조 카드
   ═══════════════════════════════════════ */
.fact-bite {
  display: flex;
  align-items: center;
  gap: 4mm;
  margin: 3mm 0;
  background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FFF1F2 100%);
  border-radius: var(--radius-lg);
  padding: 3.5mm 5mm;
  border: 1.5px solid #FECDD3;
  box-shadow: var(--shadow-sm);
}
.fact-bite-number {
  font: 900 28pt var(--font-body);
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  flex-shrink: 0;
}
.fact-bite-text { font-size: 10pt; color: var(--c-text-secondary); line-height: 1.5; }

/* ═══════════════════════════════════════
   Visual Summary — 핵심 정리 카드
   ═══════════════════════════════════════ */
.visual-summary {
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%);
  border: 1.5px solid #6EE7B7;
  border-radius: var(--radius-xl);
  padding: 5mm;
  margin: 4mm 0;
  box-shadow: var(--shadow-md);
}
.visual-summary-title {
  font-size: 14pt;
  font-weight: 900;
  color: #065F46;
  text-align: center;
  margin-bottom: 3mm;
}
.visual-summary-items { display: flex; flex-direction: column; gap: 2mm; }
.visual-summary-item {
  display: flex;
  align-items: flex-start;
  gap: 3mm;
  background: rgba(255,255,255,0.7);
  padding: 2.5mm 3.5mm;
  border-radius: var(--radius-md);
  backdrop-filter: blur(4px);
}
.visual-summary-num {
  width: 7mm; height: 7mm;
  background: linear-gradient(135deg, #059669, #10B981);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9pt;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(5,150,105,0.3);
}

/* ═══════════════════════════════════════
   10축 매핑 전용 스타일
   ═══════════════════════════════════════ */
.axis-section {
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1.5px solid #CBD5E1;
  border-radius: var(--radius-xl);
  padding: 5mm;
  margin: 5mm 0;
  box-shadow: var(--shadow-md);
  page-break-inside: avoid;
}
.axis-title {
  font-size: 14pt;
  font-weight: 900;
  text-align: center;
  margin-bottom: 4mm;
  color: var(--c-text);
  letter-spacing: -0.3px;
}
.axis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5mm;
}
.axis-item {
  display: flex;
  align-items: flex-start;
  gap: 2mm;
  padding: 2.5mm 3mm;
  border-radius: var(--radius-md);
  background: white;
  border: 1px solid #E2E8F0;
}
.axis-badge {
  font-size: 7.5pt;
  font-weight: 800;
  padding: 0.5mm 2.5mm;
  border-radius: 20px;
  flex-shrink: 0;
  letter-spacing: 0.3px;
  white-space: nowrap;
}
.axis-badge.c-lang { background: #DBEAFE; color: #1D4ED8; }
.axis-badge.thinking { background: #E0E7FF; color: #4338CA; }
.axis-badge.debug { background: #FEE2E2; color: #DC2626; }
.axis-badge.koi { background: #FEF3C7; color: #B45309; }
.axis-badge.basics { background: #D1FAE5; color: #059669; }
.axis-badge.reallife { background: #CCFBF1; color: #0D9488; }
.axis-badge.crosssubj { background: #E9D5FF; color: #7C3AED; }
.axis-badge.project { background: #FFE4E6; color: #BE123C; }
.axis-badge.ai { background: #FCE7F3; color: #DB2777; }
.axis-badge.hardware { background: #CFFAFE; color: #0891B2; }
.axis-text { font-size: 9.5pt; line-height: 150%; color: var(--c-text-secondary); }

/* ── TOC ── */
.toc { margin: 5mm 0; }
.toc h2 { border: none; padding: 0; margin-bottom: 3mm; background: none; }
.toc ul { list-style: none; padding: 0; }
.toc-h2 { display: flex; align-items: baseline; margin-bottom: 1.5mm; font-size: 11pt; }
.toc-text { flex-shrink: 0; }
.toc-dots { flex: 1; border-bottom: 1.5px dotted #CBD5E1; margin: 0 2mm; min-width: 10mm; }
.toc-page { flex-shrink: 0; color: var(--c-text-muted); font-size: 10pt; }

/* ── Margin Note ── */
.margin-note {
  float: right;
  width: 30mm;
  font-size: 8.5pt;
  color: var(--c-text-secondary);
  background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  padding: 2mm 2.5mm;
  border-radius: var(--radius-sm);
  margin: 0 -35mm 2mm 2mm;
  border-left: 2.5px solid var(--c-orange);
}

/* ── Cross Reference ── */
.crossref { font-size: 9pt; color: var(--c-blue); font-style: italic; font-weight: 500; }

/* ── Image ── */
.image-block { margin: 3.5mm 0; text-align: center; }
.image-block img { max-width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
.image-caption {
  font-size: 9pt;
  color: var(--c-text-secondary);
  margin-top: 2mm;
  font-style: italic;
  background: var(--c-bg-subtle);
  padding: 1.5mm 4mm;
  border-radius: 20px;
  display: inline-block;
}

/* ═══════════════════════════════════════
   v7.0 — 80레이어 리서치 증강분
   v5 프리미엄 기반 + TEXTBOOK-DESIGN-DEEP P1~P6 합성
   ═══════════════════════════════════════ */

/* ── Layer 26: 게슈탈트 근접성 강화 ── */
h2 + p,
h3 + p,
h2 + .code-block,
h3 + .code-block { margin-top: 1mm !important; }
.code-block + .code-explain { margin-top: 0.5mm; }
.code-block + .output-block { margin-top: 1mm; }
.exercise + .exercise { margin-top: 1.5mm; }

/* ── Layer 28: 마이크로 타이포그래피 ── */
body {
  font-kerning: auto;
  font-variant-ligatures: common-ligatures;
  hanging-punctuation: first last;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.line-num { font-variant-numeric: tabular-nums; }
.trace-table td { font-variant-numeric: tabular-nums; }

/* ── Layer 29: 연습문제 유형별 스타일 ── */
.exercise-item { margin-bottom: 2mm; font-size: 11pt; line-height: 165%; }
.exercise-item p { margin-bottom: 1.5mm; }
.exercise-blank { display: inline-block; min-width: 20mm; border-bottom: 2px solid var(--c-primary); margin: 0 1mm; }
.exercise-ox-grid { display: flex; gap: 3mm; margin-top: 2mm; }
.exercise-ox-item { flex: 1; padding: 2mm 3mm; border: 1px solid var(--c-border); border-radius: var(--radius-sm); font-size: 10pt; }
.exercise-matching { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5mm; font-size: 10pt; }
.exercise-reorder { display: flex; flex-direction: column; gap: 1mm; font-family: var(--font-code); font-size: 9.5pt; }
.exercise-reorder-item { background: var(--c-bg-subtle); padding: 1.5mm 3mm; border-radius: var(--radius-sm); border: 1px solid var(--c-border); }

/* ── Layer 30: 교사용 에디션 ── */
.teacher-only { background: #FFF5F5; border: 2px dashed #E74C3C; padding: 3mm; border-radius: var(--radius-md); }
.teacher-note { font-size: 9pt; color: #C0392B; font-style: italic; }

/* ── Layer 32: 디자인 토큰 — 인쇄용 간격 ── */
article > * + * { margin-top: 2.5mm; }
article > h2 { margin-top: 5mm; }
article > h3 { margin-top: 3.5mm; }

/* ── Layer 51: 황금비 타이포 ──
   24pt / 16pt / 13.5pt / 11.5pt = 1:0.67:0.56:0.48 ≈ 피보나치 */

/* ── Layer 55: 인지부하 최적화 — 시각 앵커 ── */
h2::before {
  /* 빈 블록으로 스크롤 앵커 역할 — Paged.js에서 러닝헤드 지원 */
}

/* ── Layer 56: 아이트래킹 — F패턴 강화 ── */
.lesson-header .lesson-number { font-weight: 700; }
.box-label::before {
  content: '';
  display: inline-block;
  width: 3px; height: 14px;
  border-radius: 2px;
  margin-right: 1.5mm;
  flex-shrink: 0;
}
.box-warning .box-label::before { background: var(--c-red); }
.box-key .box-label::before { background: var(--c-blue); }
.box-tip .box-label::before { background: var(--c-orange); }
.box-summary .box-label::before { background: var(--c-green); }
.box-question .box-label::before { background: var(--c-purple); }
.box-history .box-label::before { background: var(--c-teal); }

/* ── Layer 58: 색상 조화 60-30-10 강화 ── */
/* 60% = white/neutral, 30% = brand gradient accents, 10% = c-primary strong */

/* ── Layer 60: 코드 블록 — 브래킷 컬러링 (Layer 30 from Deep) ── */
.brace-1 { color: #C084FC; font-weight: bold; }
.brace-2 { color: #86EFAC; font-weight: bold; }
.brace-3 { color: #FDBA74; font-weight: bold; }
.brace-4 { color: #7DD3FC; font-weight: bold; }

/* ── Layer 61: 인덴트 가이드 ── */
.indent-guide { border-left: 1px solid rgba(255,255,255,0.08); }

/* ── Layer 65: 10축 매핑 강화 ── */
.axis-item { transition: none; }
.axis-section .box-content { font-size: 10pt; }

/* ── Layer 67: 자료구조 시각화 ── */
.ds-visual { font-family: var(--font-code); font-size: 9pt; text-align: center; margin: 3mm 0; }
.ds-array { display: flex; justify-content: center; gap: 0; }
.ds-cell { width: 9mm; height: 9mm; border: 1.5px solid var(--c-blue); display: flex; align-items: center; justify-content: center; font-weight: 700; }
.ds-cell:first-child { border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
.ds-cell:last-child { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.ds-index { font-size: 7pt; color: var(--c-text-muted); text-align: center; margin-top: 0.5mm; }

/* ── Layer 68: 학습 저널 공간 ── */
.reflection-box {
  background: var(--c-bg-warm);
  border: 1.5px dashed #FCD34D;
  border-radius: var(--radius-lg);
  padding: 4mm;
  margin: 4mm 0;
}
.reflection-prompt { font-size: 10pt; color: var(--c-orange); font-weight: 700; margin-bottom: 2mm; }
.reflection-lines {
  min-height: 20mm;
  background: repeating-linear-gradient(transparent, transparent 7mm, #FEF3C7 7mm, #FEF3C7 7.5mm);
}

/* ── Layer 69: 루브릭/자기평가 ── */
.rubric-table { width: 100%; border-collapse: collapse; font-size: 9pt; margin: 3mm 0; }
.rubric-table th { background: var(--c-purple); color: white; padding: 2mm; text-align: center; }
.rubric-table td { padding: 2mm; border: 1px solid var(--c-border); text-align: center; }
.self-check { display: flex; gap: 5mm; justify-content: center; margin: 3mm 0; }
.self-check-item { text-align: center; font-size: 18pt; }
.self-check-label { font-size: 7.5pt; color: var(--c-text-secondary); }

/* ── Layer 72: 교실 게임 보드 ── */
.bingo-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--c-border); border-radius: var(--radius-md); overflow: hidden; margin: 3mm 0; }
.bingo-cell { background: white; padding: 3mm; text-align: center; font-size: 8.5pt; font-family: var(--font-code); min-height: 10mm; display: flex; align-items: center; justify-content: center; }
.bingo-free { background: var(--c-primary-light); font-weight: 800; color: var(--c-primary); }

/* ── Layer 77: 북마크/읽기 가이드 ──  */
.reading-ruler { border-top: 3px solid var(--c-primary); margin: 4mm 0; opacity: 0.3; }

/* ── Layer 78: 고급 그리드 — 2컬럼 레이아웃 ── */
.two-col { display: flex; gap: 4mm; }
.two-col > * { flex: 1; min-width: 0; }
.three-col { display: flex; gap: 3mm; }
.three-col > * { flex: 1; min-width: 0; }

/* ── Layer 80: 인쇄 품질 마커 ── */
.print-crop-mark { display: none; }

/* ═══════════════════════════════════════
   인쇄 최적화 — 강화 버전 (Layer 77~80)
   ═══════════════════════════════════════ */
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .lesson-header,
  .code-block,
  .box,
  .exercise,
  .predict-box,
  .compare-bad,
  .compare-good,
  .step-num,
  .mascot-bubble,
  .visual-summary,
  .axis-section,
  .trace-table th,
  .progress-fill,
  .code-explain-line,
  .fact-bite,
  .diff-1, .diff-2, .diff-3,
  .diagram-box,
  .modify-box,
  .answers-section {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .no-print { display: none !important; }
  /* orphan/widow 강화 */
  p { orphans: 3; widows: 3; }
  h2, h3 { break-after: avoid; }
  .avoid-break { break-inside: avoid; }
}

</style>
<article id="content">
  <header class="lesson-header" role="banner">
    <div class="lesson-number">Lesson 0-2</div>
    <h1 class="lesson-title">컴퓨터는 어떻게 생겼을까? (하드웨어)</h1>
    <div class="lesson-summary">CPU, RAM, SSD 같은 컴퓨터 부품의 역할을 알아보고, 파이프라인·캐시·GPU까지 깊이 탐구해요.</div>
  </header>
<div class="chapter-start-box avoid-break"><div class="learning-goals"><h3>📚 이번에 배울 것</h3><ul><li>CPU, RAM, SSD/HDD의 역할을 비유로 설명할 수 있어요.</li><li>입력 장치와 출력 장치를 구별할 수 있어요.</li><li>메모리 계층 구조를 이해해요.</li><li>[심화] CPU 파이프라인, 캐시 계층을 설명할 수 있어요.</li><li>[심화] GPU vs CPU의 차이를 알아요.</li><li>[심화 내용] 버스 아키텍처와 인터럽트를 이해해요.</li></ul></div><div class="prereq-check"><h3>✅ 시작 전 체크</h3><ul class="checklist"><li>U0-01 '컴퓨터는 뭘 할 수 있을까?'를 읽었다</li><li>컴퓨터를 써 본 적이 있다</li></ul></div><div class="progress-section"><span class="progress-label">Part 1 진행률: 2%</span><div class="progress-bar"><div class="progress-fill" style="width:2%"></div></div></div></div>
<h2>컴퓨터 안을 들여다보면</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-hello.svg" alt="마스코트" />
        <div class="mascot-bubble hello">컴퓨터 안에 뭐가 들어있는지 궁금하지 않아? 뚜껑을 열어보면 여러 부품이 있어. 하나씩 알아보자!</div>
      </div>
<p>컴퓨터를 열어보면 여러 부품이 꽉 차 있어요. 각 부품은 사람의 몸에 비유하면 이해하기 쉬워요.</p>
<h2>CPU — 컴퓨터의 두뇌</h2>
<p><b>CPU</b>(Central Processing Unit, 중앙처리장치)는 컴퓨터의 <b>두뇌</b>예요. 모든 계산과 판단을 여기서 해요. 1초에 수십억 번의 계산을 처리해요.</p>
<div class="box box-tip avoid-break"><span class="box-label">[비유] CPU는 두뇌</span><div class="box-content">수학 문제를 풀 때 머리로 생각하죠? CPU도 컴퓨터에서 모든 계산을 담당해요. '3 + 5는 뭐지?' 같은 계산을 엄청 빠르게 해 내요.</div></div>
<p>CPU 안에는 크게 두 부분이 있어요. <b>ALU</b>(산술논리장치)는 덧셈, 뺄셈, 비교 같은 계산을 해요. <b>CU</b>(제어 장치)는 명령어를 읽고 순서대로 실행시키는 지휘자예요.</p>
<h2>클럭 속도: CPU의 심장 박동</h2>
<p>CPU에는 <b>클럭</b>(clock)이라는 시계가 있어요. 이 시계가 '틱틱' 할 때마다 하나의 작업을 처리해요. 클럭 속도가 빠르면 그만큼 더 많은 일을 할 수 있어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 클럭 속도</span><div class="box-content"><b>클럭 속도</b>는 CPU가 1초에 몇 번 '틱'하는지 나타내요.<br><br>• 1GHz(기가헤르츠) = 1초에 10억 번<br>• 3.5GHz = 1초에 35억 번<br>• 최신 CPU는 보통 3~5GHz<br><br>Hz(헤르츠) = 1초당 반복 횟수. 1GHz = 1,000,000,000Hz</div></div>
<h2>코어: CPU 안의 두뇌 여러 개</h2>
<p>옛날 CPU에는 두뇌가 1개였어요. 하지만 요즘 CPU에는 <b>코어</b>(core)라는 두뇌가 여러 개 들어 있어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 멀티코어 CPU</span><div class="box-content">• <b>듀얼코어</b> = 두뇌 2개 → 일 2개를 동시에<br>• <b>쿼드코어</b> = 두뇌 4개 → 일 4개를 동시에<br>• <b>옥타코어</b> = 두뇌 8개 → 일 8개를 동시에<br><br>요리에 비유하면, 요리사(코어)가 1명일 때보다 4명일 때 요리가 더 빨리 나오죠!</div></div>
<h2>[심화] CPU 파이프라인</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">여기서부터 좀 어려워! CPU가 명령어를 어떻게 빠르게 처리하는지 알아볼 거야.</div>
      </div>
<p>CPU가 하나의 명령어를 처리할 때는 여러 단계를 거쳐요. 이 단계들을 겹쳐서 동시에 처리하는 기법을 <b>파이프라인</b>(pipeline)이라고 해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] CPU 파이프라인의 단계</span><div class="box-content">명령어 하나를 처리하는 기본 5단계:<br><br><b>1. IF</b> (Instruction Fetch) — 메모리에서 명령어 가져오기<br><b>2. ID</b> (Instruction Decode) — 명령어 해석하기<br><b>3. EX</b> (Execute) — 실행하기 (ALU에서 계산)<br><b>4. MEM</b> (Memory Access) — 메모리 읽기/쓰기<br><b>5. WB</b> (Write Back) — 결과 저장하기</div></div>
<div class="code-explain avoid-break"></div>
<div class="image-block avoid-break"><img src="/images/svg-assets/pipeline-laundry.svg" alt="파이프라인 세탁소 비유 — 순차처리 vs 파이프라인 시각 비교" style="max-width:100%"/><div class="image-caption">파이프라인 = 기계를 놀리지 않고 겹쳐서 돌리는 기법!</div></div>
<div class="trace-table avoid-break"><table><thead><tr><th>시간</th><th>IF</th><th>ID</th><th>EX</th><th>MEM</th><th>WB</th></tr></thead><tbody><tr><td>1</td><td>명령1</td><td>-</td><td>-</td><td>-</td><td>-</td></tr><tr><td>2</td><td>명령2</td><td>명령1</td><td>-</td><td>-</td><td>-</td></tr><tr><td>3</td><td>명령3</td><td>명령2</td><td>명령1</td><td>-</td><td>-</td></tr><tr><td>4</td><td>명령4</td><td>명령3</td><td>명령2</td><td>명령1</td><td>-</td></tr><tr><td>5</td><td>명령5</td><td>명령4</td><td>명령3</td><td>명령2</td><td>명령1</td></tr></tbody></table></div>
<p>시간 5부터는 매 클럭마다 명령어 하나가 완성돼요! 파이프라인이 없으면 명령어 하나에 5클럭이 걸리지만, 파이프라인이 있으면 사실상 1클럭에 1개씩 처리하는 효과가 나요.</p>
<div class="box box-warning avoid-break"><span class="box-label">[심화] 파이프라인 해저드</span><div class="box-content">파이프라인이 항상 완벽한 건 아니에요. 문제가 생기는 경우를 <b>해저드</b>라고 해요.<br><br>• <b>데이터 해저드</b>: 앞 명령어의 결과가 필요한데 아직 안 나옴<br>• <b>제어 해저드</b>: if문 같은 분기에서 다음 명령어를 모름<br>• <b>구조적 해저드</b>: 같은 자원을 동시에 쓰려고 함<br><br>현대 CPU는 이런 문제를 해결하는 다양한 기법을 사용해요.</div></div>
<h2>RAM — 컴퓨터의 책상</h2>
<p><b>RAM</b>(Random Access Memory)은 <b>책상</b>이에요. 지금 사용하는 프로그램과 데이터가 올라가는 곳이에요. 크기가 작아서 많은 걸 한꺼번에 올릴 수 없어요.</p>
<div class="box box-warning avoid-break"><span class="box-label">[주의] RAM의 약점</span><div class="box-content">전원을 끄면 RAM에 있던 내용이 <b>전부 사라져요</b>. 그래서 중요한 파일은 반드시 <b>저장(Ctrl+S)</b>해야 해요. 저장하면 SSD에 기록돼요.</div></div>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 휘발성 vs 비휘발성</span><div class="box-content"><b>휘발성 메모리</b>: 전원 꺼지면 내용 사라짐 → RAM<br><b>비휘발성 메모리</b>: 전원 꺼져도 내용 유지 → SSD, HDD, USB<br><br>RAM은 빠르지만 휘발성, SSD는 느리지만 비휘발성이에요.</div></div>
<h2>SSD/HDD — 컴퓨터의 책장</h2>
<p><b>SSD</b>(또는 HDD)는 <b>책장</b>이에요. 파일, 사진, 프로그램을 오래 보관하는 곳이에요. 전원을 꺼도 내용이 사라지지 않아요.</p>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<div class="image-block avoid-break"><img src="/images/svg-assets/hardware-overview.svg" alt="컴퓨터 내부 구조 — CPU, RAM, SSD, GPU, 입출력 장치의 관계" style="max-width:100%"/><div class="image-caption">컴퓨터 내부 구조: 입력 → CPU(두뇌) → RAM(책상) ↔ SSD(책장) → 출력</div></div>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">프로그램을 실행하면 SSD에서 꺼내서 RAM에 올려놓아요. 공부할 때 책장에서 교과서를 꺼내 책상에 놓는 것과 같아요!</div>
      </div>
<h2>[심화] 캐시 메모리 — CPU 옆의 비밀 서랍</h2>
<p>RAM도 CPU에 비하면 느려요. CPU가 RAM에서 데이터를 가져오는 동안 기다려야 해요. 그래서 CPU 바로 옆에 아주 빠르고 작은 메모리를 두었어요. 이게 <b>캐시</b>(cache)예요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 캐시 계층 (L1/L2/L3)</span><div class="box-content">CPU에는 보통 3단계의 캐시가 있어요.<br><br><b>L1 캐시</b>: 가장 빠르고 가장 작아요 (32~64KB). CPU 코어 안에 있어요.<br><b>L2 캐시</b>: L1보다 느리지만 더 커요 (256KB~1MB). 코어마다 있어요.<br><b>L3 캐시</b>: 가장 느리지만 가장 커요 (8~64MB). 모든 코어가 공유해요.<br><br>CPU가 데이터를 찾는 순서: L1 → L2 → L3 → RAM → SSD</div></div>
<div class="code-explain avoid-break"></div>
<div class="image-block avoid-break"><img src="/images/svg-assets/cache-school.svg" alt="캐시 메모리 학교 비유 — L1(서랍), L2(가방), L3(사물함), RAM(책장), SSD(도서관)" style="max-width:100%"/><div class="image-caption">가까울수록 빠르지만 공간이 작아요! CPU는 L1부터 차례로 찾아요.</div></div>
<h2>[심화] 메모리 계층 구조</h2>
<p>컴퓨터의 저장 장치는 속도와 용량이 반비례해요. 빠를수록 비싸고 작고, 느릴수록 싸고 커요. 이걸 <b>메모리 계층 구조</b>라고 해요.</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/memory-hierarchy.svg" alt="메모리 계층 구조 피라미드 — 레지스터부터 HDD까지" style="max-width:100%"/><div class="image-caption">메모리 계층 구조: 위로 갈수록 빠르고 작고 비싸요!</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[비유] 속도 차이를 시간으로 느끼면</span><div class="box-content">레지스터 접근을 1초라고 치면:<br>• L1 캐시 = 3초<br>• L2 캐시 = 10초<br>• RAM = 3분<br>• SSD = 1시간<br>• HDD = 1주일<br><br>레지스터와 HDD의 속도 차이는 무려 <b>100만 배</b>나 돼요!</div></div>
<h2>입력 장치와 출력 장치</h2>
<p>컴퓨터에 데이터를 넣어주는 장치를 <b>입력 장치</b>, 결과를 보여주는 장치를 <b>출력 장치</b>라고 해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 입력과 출력</span><div class="box-content"><b>입력 장치</b>: 키보드(글자 입력), 마우스(클릭/이동), 마이크(소리 입력), 카메라(영상 입력)<br><b>출력 장치</b>: 모니터(화면 출력), 스피커(소리 출력), 프린터(종이 출력)<br><b>입출력 겸용</b>: 터치스크린(입력+출력), 네트워크 카드(보내기+받기)</div></div>
<div class="image-block avoid-break"><img src="/images/svg-assets/cpu-gpu-compare.svg" alt="CPU vs GPU 비교 — 코어 수와 처리 방식 차이" style="max-width:100%"/><div class="image-caption">CPU는 강력한 코어 소수, GPU는 단순한 코어 수천 개</div></div>
<h2>메인보드 — 부품들의 놀이터</h2>
<p><b>메인보드</b>(motherboard)는 모든 부품이 꽂히는 큰 기판이에요. CPU, RAM, SSD, GPU 등이 메인보드 위에 연결돼요. 부품들 사이에 데이터가 오가는 통로도 메인보드에 있어요.</p>
<h2>전원 공급 장치 (PSU)</h2>
<p><b>PSU</b>(Power Supply Unit)는 콘센트의 220V 전기를 컴퓨터 부품이 쓸 수 있는 5V, 12V 등으로 바꿔주는 장치예요. 컴퓨터의 심장처럼 전기를 공급해요.</p>
<h2>쿨러 — 열을 식혀주는 선풍기</h2>
<p>CPU는 계산을 많이 하면 <b>뜨거워져요</b>. 너무 뜨거우면 망가질 수 있어서 <b>쿨러</b>(cooler)가 열을 식혀줘요. 공기 쿨러(팬)와 수냉 쿨러(물)가 있어요.</p>
<h2>[심화] GPU — 그래픽의 마법사</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">GPU는 게임할 때 화면을 그려주는 부품이야! 그런데 요즘은 AI 학습에도 엄청 중요해졌어!</div>
      </div>
<p><b>GPU</b>(Graphics Processing Unit, 그래픽처리장치)는 원래 화면에 그림을 그리기 위해 만들어졌어요. CPU와 뭐가 다를까요?</p>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<div class="code-explain avoid-break"></div>
<div class="box box-history avoid-break"><span class="box-label">[실생활] GPU와 AI</span><div class="box-content">ChatGPT 같은 AI를 학습시키려면 엄청난 양의 계산이 필요해요. GPU는 수천 개의 코어로 이 계산을 동시에 처리할 수 있어서, AI 개발에 GPU가 필수가 되었어요. NVIDIA라는 회사가 이 분야를 이끌고 있어요.</div></div>
<h2>[심화] FPGA — 바꿀 수 있는 칩</h2>
<p><b>FPGA</b>(Field-Programmable Gate Array)는 사용자가 내부 회로를 <b>프로그래밍으로 바꿀 수 있는</b> 특수한 칩이에요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] FPGA란?</span><div class="box-content">• CPU/GPU는 만들어지면 구조가 고정됨<br>• FPGA는 내부 논리 회로를 <b>소프트웨어로 재구성</b> 가능<br>• 특정 작업에 맞춤 설계할 수 있어서 효율적<br>• 사용 분야: 통신 장비, 자율주행, 반도체 설계 시제품<br>• CPU보다 빠르고 GPU보다 전력 효율이 좋은 경우가 많아요</div></div>
<h2>[심화] 임베디드 시스템과 IoT</h2>
<p>컴퓨터가 데스크톱이나 스마트폰만 있는 건 아니에요. 우리 주변 가전제품, 자동차, 의료기기 안에도 작은 컴퓨터가 숨어 있어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 임베디드 시스템이란?</span><div class="box-content"><b>임베디드 시스템</b>(Embedded System) = 특정 기능을 위해 다른 기기 안에 내장된 컴퓨터<br><br>예시:<br>• 전자레인지의 타이머 컨트롤러<br>• 자동차의 에어백 센서<br>• 엘리베이터의 층 제어 시스템<br>• 체온계의 온도 계산기<br><br>대부분 <b>마이크로컨트롤러</b>(MCU)라는 작은 칩을 사용해요. 아두이노가 대표적인 예예요.</div></div>
<div class="box box-key avoid-break"><span class="box-label">[심화] IoT란?</span><div class="box-content"><b>IoT</b>(Internet of Things, 사물인터넷) = 일상 속 사물에 인터넷을 연결하는 기술<br><br>예시:<br>• 스마트 전구: 앱으로 켜고 끌 수 있음<br>• 스마트 냉장고: 음식이 떨어지면 알림<br>• 스마트워치: 심박수를 측정해서 앱으로 전송<br>• 스마트팜: 토양 수분을 측정해서 자동 급수</div></div>
<h2>[심화 내용] 버스 아키텍처</h2>
<p>컴퓨터 부품들은 서로 데이터를 주고받아야 해요. 이 데이터가 오가는 통로를 <b>버스</b>(bus)라고 해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] 3가지 버스</span><div class="box-content"><b>1. 데이터 버스</b> — 실제 데이터(0과 1)를 전달하는 통로<br><b>2. 주소 버스</b> — 데이터의 위치(주소)를 전달하는 통로<br><b>3. 제어 버스</b> — '읽어라', '써라' 같은 명령 신호를 전달<br><br>비유: 택배 시스템에서<br>• 데이터 버스 = 택배 물건<br>• 주소 버스 = 배송 주소<br>• 제어 버스 = '배달해라', '반품해라' 같은 지시</div></div>
<p>데이터 버스의 폭이 넓을수록 한 번에 더 많은 데이터를 전달할 수 있어요. 32비트 버스는 한 번에 32비트를, 64비트 버스는 64비트를 전달해요. 도로에 차선이 많으면 차가 더 많이 다닐 수 있는 것과 같아요.</p>
<h2>[심화 내용] 인터럽트</h2>
<p>CPU가 열심히 계산하고 있는데, 갑자기 키보드가 눌리거나 마우스가 움직이면 어떻게 할까요? 이럴 때 사용하는 게 <b>인터럽트</b>(interrupt)예요.</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/bus-architecture.svg" alt="버스 아키텍처 — CPU, RAM, 입출력을 연결하는 3가지 버스" style="max-width:100%"/><div class="image-caption">3가지 버스가 컴퓨터 부품들을 연결해요 — 택배 시스템과 똑같아요!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] 인터럽트란?</span><div class="box-content"><b>인터럽트</b> = CPU에게 '지금 하던 거 잠깐 멈추고 이것 먼저 처리해!'라고 알리는 신호<br><br>비유: 수업 중에 학생이 손을 들고 질문하는 것!<br><br>1. 키보드 누름 → 인터럽트 발생<br>2. CPU가 하던 일 일시정지<br>3. 키보드 입력을 처리 (인터럽트 핸들러 실행)<br>4. 처리 완료 후 원래 하던 일로 복귀<br><br>종류: 하드웨어 인터럽트(키보드, 마우스) / 소프트웨어 인터럽트(프로그램 요청)</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[심화 내용] 폴링 vs 인터럽트</span><div class="box-content"><b>폴링</b>(polling): CPU가 계속 '뭐 할 거 있어? 뭐 할 거 있어?' 물어보기 → 비효율적!<br><b>인터럽트</b>: 장치가 필요할 때만 CPU에게 알리기 → 효율적!<br><br>비유: 폴링 = 1분마다 문 앞 택배 확인 / 인터럽트 = 초인종이 울리면 확인</div></div>
<h2>C언어와 하드웨어 연결 미리보기</h2>
<p>앞으로 C언어를 배우면, 이 부품들과 직접 대화하게 돼요.</p>
<div class="box box-key avoid-break"><span class="box-label">[C 연결] C코드 한 줄 → 하드웨어에서 일어나는 일</span><div class="box-content"><b>int x = 10;</b><br>→ CPU가 RAM에서 4바이트 공간을 확보하고, 그곳에 10을 저장<br><br><b>printf("%d", x);</b><br>→ CPU가 RAM에서 x의 값(10)을 읽어옴 → 문자 '10'으로 변환 → 모니터(출력장치)에 표시<br><br><b>scanf("%d", &x);</b><br>→ 키보드(입력장치)에서 입력 대기 → 사용자가 숫자 입력 → CPU가 RAM의 x 위치에 저장<br><br><b>x = x + 5;</b><br>→ CPU가 RAM에서 x를 캐시로 가져옴 → ALU에서 10+5=15 계산 → 결과 15를 RAM에 다시 저장</div></div>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">printf()가 모니터에 글자를 찍고, scanf()가 키보드에서 입력을 받아요. 변수를 만들면 RAM에 공간이 잡혀요. Part 1에서 직접 써 볼 거예요!</div>
      </div>
<div class="box box-tip avoid-break"><span class="box-label">[C 연결 미리보기] 하드웨어와 C언어</span><div class="box-content">• <b>변수 선언</b> (int x;) → RAM에 4바이트 공간 확보<br>• <b>printf()</b> → CPU가 처리 → 모니터(출력 장치)에 표시<br>• <b>scanf()</b> → 키보드(입력 장치) → RAM에 저장<br>• <b>연산</b> (x + y) → CPU의 ALU에서 계산<br>• <b>파일 입출력</b> (fopen) → SSD/HDD에 접근</div></div>
<h2>활동: 내 컴퓨터 사양 찾아보기</h2>
<div class="box box-tip avoid-break"><span class="box-label">[활동] 내 컴퓨터의 부품 확인하기</span><div class="box-content">윈도우: 설정 → 시스템 → 정보<br>맥: 이 Mac에 관하여<br><br>아래 표를 채워 보세요.<br>CPU 이름: ______________<br>CPU 코어 수: ______ 개<br>CPU 클럭 속도: ______ GHz<br>RAM 크기: ______ GB<br>저장장치 종류: SSD / HDD (동그라미)<br>저장장치 용량: ______ GB<br>GPU 이름: ______________<br>화면 해상도: ______ x ______</div></div>
<h2>[심화 내용] DMA (Direct Memory Access)</h2>
<p>대량의 데이터를 SSD에서 RAM으로 옮길 때, CPU가 직접 하나하나 옮기면 너무 비효율적이에요. 그래서 <b>DMA</b>라는 별도 장치가 CPU 대신 데이터를 옮겨줘요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] DMA란?</span><div class="box-content"><b>DMA</b>(Direct Memory Access) = CPU를 거치지 않고 장치가 직접 메모리에 접근하는 기법<br><br>1. CPU가 DMA 컨트롤러에게 '이 데이터 옮겨줘' 요청<br>2. DMA가 직접 SSD→RAM 또는 RAM→SSD 복사<br>3. 다 끝나면 인터럽트로 CPU에게 알림<br>4. 그동안 CPU는 다른 일을 할 수 있어요!<br><br>비유: 사장님(CPU)이 직접 택배를 나르는 대신 택배기사(DMA)를 고용하는 것!</div></div>
<h2>소프트웨어 vs 하드웨어</h2>
<p>지금까지 배운 건 <b>하드웨어</b>(hardware)예요. 손으로 만질 수 있는 물리적인 부품이죠. 하드웨어와 짝을 이루는 것이 <b>소프트웨어</b>(software)예요.</p>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<div class="box box-tip avoid-break"><span class="box-label">[비유] 하드웨어와 소프트웨어</span><div class="box-content"><b>하드웨어</b> = 악기 (피아노, 기타)<br><b>소프트웨어</b> = 악보 (연주할 곡)<br><br>아무리 좋은 피아노도 악보 없이는 음악이 안 나와요. 아무리 좋은 악보도 피아노 없이는 소용이 없어요. 둘 다 있어야 해요!</div></div>
<h2>운영체제 — 하드웨어와 소프트웨어의 다리</h2>
<p><b>운영체제</b>(OS, Operating System)는 하드웨어를 관리하고 프로그램을 실행시켜주는 소프트웨어예요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 대표적인 운영체제</span><div class="box-content">• <b>Windows</b> — 마이크로소프트. 가장 많이 쓰이는 PC용 OS<br>• <b>macOS</b> — 애플. 맥북, 아이맥에 사용<br>• <b>Linux</b> — 오픈소스. 서버, 슈퍼컴퓨터에 많이 사용<br>• <b>Android</b> — 구글. 대부분의 스마트폰<br>• <b>iOS</b> — 애플. 아이폰, 아이패드</div></div>
<h2>[심화] 캐시 히트와 캐시 미스</h2>
<p>CPU가 필요한 데이터가 캐시에 있으면 <b>캐시 히트</b>(cache hit), 없으면 <b>캐시 미스</b>(cache miss)라고 해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 캐시 히트율</span><div class="box-content"><b>캐시 히트율</b> = 캐시에서 찾은 횟수 / 전체 접근 횟수 × 100%<br><br>예: 100번 접근 중 95번 캐시에 있었다면 히트율 95%<br><br>히트율이 높을수록 CPU가 빨라요. 현대 CPU는 보통 95% 이상의 히트율을 달성해요.<br><br>프로그래밍할 때 데이터를 연속으로 접근하면 히트율이 올라가요. 이게 나중에 배울 <b>배열</b>이 빠른 이유 중 하나예요!</div></div>
<h2>[심화] ARM vs x86</h2>
<p>CPU도 종류가 있어요. 크게 <b>x86</b>과 <b>ARM</b>으로 나뉘어요.</p>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<p>최근에는 애플이 맥북에 ARM 기반의 M1/M2/M3 칩을 넣어서 큰 화제가 됐어요. 전력을 적게 쓰면서도 성능이 뛰어나거든요.</p>
<h2>컴퓨터 조립 순서 알아보기</h2>
<div class="steps-visual avoid-break"></div>
<h2>━━━ 연습문제 ━━━</h2>
<h2>연습문제</h2>
<div class="exercise avoid-break"><div class="exercise-title">문제 1 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>CPU, RAM, SSD를 사람에 비유하면 각각 무엇인가요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 2 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>다음 중 입력 장치는 O, 출력 장치는 X로 표시하세요.<br>(1) 키보드 (  )<br>(2) 모니터 (  )<br>(3) 마우스 (  )<br>(4) 스피커 (  )<br>(5) 마이크 (  )</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 3 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>전원을 끄면 내용이 사라지는 부품은 무엇인가요? 왜 '책상'에 비유했는지 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 4 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>클럭 속도 3GHz는 1초에 몇 번 '틱'하는 것인가요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 5 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>쿼드코어 CPU는 코어가 몇 개인가요? 듀얼코어와 비교하면 어떤 장점이 있나요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 6 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>게임을 실행하면 컴퓨터 안에서 어떤 일이 일어날까요? CPU, RAM, SSD, GPU, 모니터의 역할을 순서대로 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 7 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>SSD와 HDD의 차이점을 3가지 이상 적어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 8 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>메모리 계층 구조에서 레지스터, 캐시, RAM, SSD를 빠른 순서대로 나열하세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 9 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>CPU와 GPU의 가장 큰 차이점은 무엇인가요? 각각 어떤 작업에 적합한지 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 10 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>일상에서 찾을 수 있는 임베디드 시스템 3가지를 적어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 11 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화] CPU 파이프라인의 5단계를 순서대로 적고, 파이프라인의 장점을 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 12 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화] L1, L2, L3 캐시의 차이를 크기, 속도, 위치 측면에서 비교해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 13 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화] '파이프라인 해저드'가 무엇인지 설명하고, 데이터 해저드의 예를 하나 들어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 14 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화 내용] 버스의 3가지 종류(데이터, 주소, 제어)를 적고, 각각의 역할을 택배 비유로 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 15 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화 내용] 인터럽트와 폴링의 차이점을 설명하고, 인터럽트가 더 효율적인 이유를 적어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>정답</h2>
<div class="answers-section avoid-break"><h3>정답</h3><div class="answer-item"><span class="answer-num">문제 1</span> <span class="answer-text">CPU = 두뇌 (계산과 판단), RAM = 책상 (지금 쓰는 것 올려놓기), SSD = 책장 (오래 보관)</span></div><div class="answer-item"><span class="answer-num">문제 2</span> <span class="answer-text">(1) O — 키보드는 입력 장치 (2) X — 모니터는 출력 장치 (3) O — 마우스는 입력 장치 (4) X — 스피커는 출력 장치 (5) O — 마이크는 입력 장치</span></div><div class="answer-item"><span class="answer-num">문제 3</span> <span class="answer-text">RAM이에요. 책상에 올려놓은 책은 집에 가면(전원을 끄면) 치워지지만, 책장(SSD)에 꽂아 놓은 책은 그대로 남아 있어요.</span></div><div class="answer-item"><span class="answer-num">문제 4</span> <span class="answer-text">3GHz = 1초에 30억 번 (3 × 1,000,000,000 = 3,000,000,000)</span></div><div class="answer-item"><span class="answer-num">문제 5</span> <span class="answer-text">쿼드코어는 코어 4개. 듀얼코어(2개)보다 동시에 처리할 수 있는 작업이 2배 많아요.</span></div><div class="answer-item"><span class="answer-num">문제 6</span> <span class="answer-text">(1) SSD에 저장된 게임 파일을 RAM으로 불러와요 (2) CPU가 게임 로직을 계산해요 (3) GPU가 3D 그래픽을 그려요 (4) 모니터에 화면을 출력해요 (5) 키보드/마우스 입력을 CPU가 처리해요</span></div><div class="answer-item"><span class="answer-num">문제 7</span> <span class="answer-text">(1) SSD는 HDD보다 10~100배 빠르다 (2) SSD는 소음이 없다 (3) SSD는 충격에 강하다 (4) HDD가 용량 대비 저렴하다 (5) SSD는 플래시 메모리, HDD는 자기 디스크 회전</span></div><div class="answer-item"><span class="answer-num">문제 8</span> <span class="answer-text">레지스터 → 캐시(L1→L2→L3) → RAM → SSD</span></div><div class="answer-item"><span class="answer-num">문제 9</span> <span class="answer-text">CPU: 코어 적지만 강력, 복잡한 순차 작업에 적합 (운영체제, 일반 앱). GPU: 코어 수천 개, 간단한 작업을 대량 병렬 처리에 적합 (게임 그래픽, AI 학습).</span></div><div class="answer-item"><span class="answer-num">문제 10</span> <span class="answer-text">예: (1) 전자레인지 타이머 (2) 자동차 ABS 브레이크 시스템 (3) 엘리베이터 층 제어 시스템</span></div><div class="answer-item"><span class="answer-num">문제 11</span> <span class="answer-text">IF(명령어 가져오기) → ID(해석) → EX(실행) → MEM(메모리 접근) → WB(결과 저장). 장점: 여러 명령어의 단계를 겹쳐서 실행하므로, 매 클럭마다 하나의 명령어가 완료되는 효과가 있어요.</span></div><div class="answer-item"><span class="answer-num">문제 12</span> <span class="answer-text">L1: 가장 작고(32~64KB) 가장 빠르며 CPU 코어 내부에 있음. L2: 중간 크기(256KB~1MB), 중간 속도, 코어마다 있음. L3: 가장 크고(8~64MB) 가장 느리며 모든 코어가 공유.</span></div><div class="answer-item"><span class="answer-num">문제 13</span> <span class="answer-text">파이프라인 해저드란 파이프라인이 정상적으로 진행되지 못하는 상황. 데이터 해저드 예: 'A = B + C'와 'D = A + E'에서 두 번째 명령어가 첫 번째의 결과(A)를 필요로 하지만 아직 계산이 안 끝남.</span></div><div class="answer-item"><span class="answer-num">문제 14</span> <span class="answer-text">데이터 버스 = 택배 물건 (실제 데이터 전달), 주소 버스 = 배송 주소 (어디에 보내거나 가져올지), 제어 버스 = 배달/반품 지시 (읽기/쓰기 같은 명령 신호)</span></div><div class="answer-item"><span class="answer-num">문제 15</span> <span class="answer-text">폴링: CPU가 계속 장치에 '할 일 있어?' 물어봄 → CPU 시간 낭비. 인터럽트: 장치가 필요할 때만 CPU에게 신호를 보냄 → CPU가 다른 일을 하다가 필요할 때만 처리하므로 효율적.</span></div></div>
<h2>용어 정리</h2>
<div class="glossary avoid-break"><div class="glossary-item"><dt class="glossary-term">CPU</dt><dd class="glossary-def">Central Processing Unit(중앙처리장치). 모든 계산과 판단을 담당하는 컴퓨터의 두뇌.</dd></div><div class="glossary-item"><dt class="glossary-term">RAM</dt><dd class="glossary-def">Random Access Memory. 지금 사용 중인 데이터를 올려놓는 곳. 전원 끄면 사라져요(휘발성).</dd></div><div class="glossary-item"><dt class="glossary-term">SSD/HDD</dt><dd class="glossary-def">파일을 오래 저장하는 장치(비휘발성). SSD가 HDD보다 빨라요.</dd></div><div class="glossary-item"><dt class="glossary-term">입력 장치</dt><dd class="glossary-def">컴퓨터에 데이터를 넣어주는 장치. 키보드, 마우스, 마이크 등.</dd></div><div class="glossary-item"><dt class="glossary-term">출력 장치</dt><dd class="glossary-def">컴퓨터가 결과를 보여주는 장치. 모니터, 스피커, 프린터 등.</dd></div><div class="glossary-item"><dt class="glossary-term">하드웨어</dt><dd class="glossary-def">컴퓨터를 구성하는 물리적인 부품들. 만질 수 있는 것들이에요.</dd></div><div class="glossary-item"><dt class="glossary-term">클럭 속도</dt><dd class="glossary-def">CPU가 1초에 몇 번 동작하는지 나타내는 수치. 단위는 Hz(헤르츠).</dd></div><div class="glossary-item"><dt class="glossary-term">코어</dt><dd class="glossary-def">CPU 안의 독립적인 처리 장치. 코어가 많으면 동시에 더 많은 일을 해요.</dd></div><div class="glossary-item"><dt class="glossary-term">캐시</dt><dd class="glossary-def">CPU 옆의 고속 소형 메모리. 자주 쓰는 데이터를 미리 가져다 놓아요.</dd></div><div class="glossary-item"><dt class="glossary-term">파이프라인</dt><dd class="glossary-def">명령어 처리 단계를 겹쳐서 동시에 진행하는 기법.</dd></div><div class="glossary-item"><dt class="glossary-term">GPU</dt><dd class="glossary-def">Graphics Processing Unit(그래픽처리장치). 수천 개의 코어로 병렬 처리. 게임, AI에 사용.</dd></div><div class="glossary-item"><dt class="glossary-term">FPGA</dt><dd class="glossary-def">Field-Programmable Gate Array. 내부 회로를 프로그래밍으로 바꿀 수 있는 칩.</dd></div><div class="glossary-item"><dt class="glossary-term">메인보드</dt><dd class="glossary-def">모든 부품이 연결되는 큰 기판. 부품 간 통신을 담당해요.</dd></div><div class="glossary-item"><dt class="glossary-term">PSU</dt><dd class="glossary-def">Power Supply Unit(전원 공급 장치). 전기를 적절한 전압으로 바꿔줘요.</dd></div><div class="glossary-item"><dt class="glossary-term">임베디드 시스템</dt><dd class="glossary-def">특정 기능을 위해 기기 안에 내장된 소형 컴퓨터.</dd></div><div class="glossary-item"><dt class="glossary-term">IoT</dt><dd class="glossary-def">Internet of Things(사물인터넷). 사물에 인터넷을 연결하는 기술.</dd></div><div class="glossary-item"><dt class="glossary-term">버스</dt><dd class="glossary-def">컴퓨터 내부에서 데이터가 오가는 통로. 데이터/주소/제어 버스가 있어요.</dd></div><div class="glossary-item"><dt class="glossary-term">인터럽트</dt><dd class="glossary-def">CPU에게 '이것 먼저 처리해!'라고 알리는 신호.</dd></div><div class="glossary-item"><dt class="glossary-term">ALU</dt><dd class="glossary-def">Arithmetic Logic Unit(산술논리장치). 덧셈, 뺄셈, 비교 등 연산 수행.</dd></div><div class="glossary-item"><dt class="glossary-term">레지스터</dt><dd class="glossary-def">CPU 내부의 가장 빠르고 작은 저장 공간. 현재 처리 중인 데이터를 담아요.</dd></div><div class="glossary-item"><dt class="glossary-term">휘발성 메모리</dt><dd class="glossary-def">전원이 꺼지면 내용이 사라지는 메모리. RAM이 대표적.</dd></div><div class="glossary-item"><dt class="glossary-term">비휘발성 메모리</dt><dd class="glossary-def">전원이 꺼져도 내용이 유지되는 메모리. SSD, HDD가 대표적.</dd></div></div>
<div class="visual-summary avoid-break"><div class="visual-summary-title">이번 유닛 핵심 정리</div><div class="visual-summary-items"><div class="visual-summary-item"><div class="visual-summary-num">1</div><span>CPU(두뇌)가 계산하고, RAM(책상)에 올려놓고, SSD(책장)에 저장해요</span></div><div class="visual-summary-item"><div class="visual-summary-num">2</div><span>입력 장치(키보드/마우스)로 데이터를 넣고, 출력 장치(모니터/스피커)로 결과를 봐요</span></div><div class="visual-summary-item"><div class="visual-summary-num">3</div><span>프로그램을 실행하면 SSD에서 RAM으로 데이터가 올라가요</span></div><div class="visual-summary-item"><div class="visual-summary-num">4</div><span>메모리 계층: 레지스터 > 캐시(L1/L2/L3) > RAM > SSD > HDD</span></div><div class="visual-summary-item"><div class="visual-summary-num">5</div><span>[심화] CPU 파이프라인으로 명령어를 겹쳐서 빠르게 처리해요</span></div><div class="visual-summary-item"><div class="visual-summary-num">6</div><span>[심화] GPU는 수천 개 코어로 병렬 처리, AI와 게임에 필수</span></div></div></div>
<h2>━━━ 10축 심화 학습 ━━━</h2>
<h2>[KOI] 하드웨어 관련 실전 기출 유형</h2>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 1] 메모리 계층</span><div class="box-content"><b>문제:</b> 다음을 접근 속도가 빠른 순서대로 나열하세요.<br>RAM, L1 캐시, SSD, 레지스터, HDD, L3 캐시<br><br><b>정답:</b> 레지스터 → L1 캐시 → L3 캐시 → RAM → SSD → HDD<br><br><b>풀이:</b> 외우는 법 — <b>'레엘엘램에하'</b><br>CPU에 가까울수록 빠르고, 멀어질수록 느려요.<br>레지스터와 HDD의 속도 차이는 약 <b>100만 배</b>예요!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 2] 휘발성 vs 비휘발성</span><div class="box-content"><b>문제:</b> 다음 중 전원을 끄면 내용이 <b>사라지는</b> 것을 모두 고르세요.<br>(1) RAM (2) SSD (3) 캐시 메모리 (4) 레지스터 (5) HDD (6) USB 메모리<br><br><b>정답:</b> (1) RAM, (3) 캐시 메모리, (4) 레지스터<br><br><b>풀이:</b><br>• <b>휘발성</b>(전원 끄면 사라짐): RAM, 캐시, 레지스터 — 전부 CPU나 메인보드 위에서 '임시' 저장<br>• <b>비휘발성</b>(전원 꺼도 유지): SSD, HDD, USB — '영구' 저장용<br>• 함정: 캐시도 RAM처럼 <b>휘발성</b>이에요! 많이 틀리는 문제!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 3] CPU 파이프라인</span><div class="box-content"><b>문제:</b> 5단계 파이프라인 CPU에서, 파이프라인이 완전히 채워진 후 10개의 명령어를 처리하는 데 몇 클럭이 필요한가요?<br><br><b>정답:</b> 14클럭<br><br><b>풀이:</b><br>• 파이프라인 없이: 10 × 5 = 50클럭 필요<br>• 파이프라인으로: 처음 채우는 데 4클럭 + 이후 10클럭 = <b>14클럭</b><br>• 공식: (파이프라인 단계 수 - 1) + 명령어 수 = (5-1) + 10 = 14<br>• 50클럭 → 14클럭, 약 <b>3.6배 빨라짐</b>!</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 16 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[KOI 실전] 다음 중 CPU의 ALU가 하는 일이 아닌 것은?
(1) 두 수의 덧셈
(2) 두 수의 크기 비교
(3) 메모리에서 명령어 읽기
(4) AND, OR 논리 연산

정답을 고르고 이유를 적으세요. (힌트: 명령어를 읽는 건 어떤 장치의 역할인가요?)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[디버깅] 하드웨어 관련 에러 구별하기</h2>
<p>프로그래밍 에러뿐 아니라, <b>하드웨어 문제로 생기는 에러</b>도 있어요. 이걸 구별하는 건 디버깅의 첫 단계예요.</p>
<div class="box box-warning avoid-break"><span class="box-label">[디버깅] 하드웨어 vs 소프트웨어 에러 구별법</span><div class="box-content"><b>하드웨어 에러 의심 상황:</b><br>• 모든 프로그램이 갑자기 느려짐 → <b>RAM 부족</b> (작업관리자에서 확인)<br>• 컴퓨터가 갑자기 꺼짐 → <b>과열</b> (쿨러 문제) 또는 <b>전원 문제</b><br>• 화면이 깜빡이거나 깨짐 → <b>GPU 과열</b> 또는 <b>드라이버 문제</b><br>• 저장한 파일이 깨짐 → <b>SSD/HDD 불량</b><br>• 블루스크린(BSOD) → RAM 불량 또는 드라이버 충돌<br><br><b>소프트웨어 에러 의심 상황:</b><br>• 특정 프로그램만 멈춤 → 그 프로그램의 <b>버그</b><br>• 특정 입력에서만 오류 → <b>코드 논리 에러</b><br>• 컴파일 안 됨 → <b>문법 에러</b></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 17 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[디버깅] 다음 상황이 하드웨어 문제인지 소프트웨어 문제인지 구별하세요:
(1) 게임만 실행하면 컴퓨터가 꺼진다
(2) 모든 프로그램에서 한글이 깨져서 나온다
(3) 컴퓨터 시작할 때 '삐' 소리가 3번 나고 화면이 안 나온다
(4) 내가 만든 C프로그램에서 특정 값을 입력하면 결과가 틀리게 나온다
(5) 한 달 전에 저장한 사진 파일이 열리지 않는다</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[코딩기초] 변수 = RAM의 공간</h2>
<p>C언어에서 <code>int x = 10;</code>이라고 쓰면, <b>RAM에 4바이트 공간</b>이 만들어지고 거기에 10이 저장돼요. 이게 바로 <b>변수</b>예요.</p>
<div class="box box-key avoid-break"><span class="box-label">[코딩기초] 자료형과 메모리 크기</span><div class="box-content">C언어의 변수 종류에 따라 사용하는 RAM 공간이 달라요:<br><br><code>char c = 'A';</code> → RAM에서 <b>1바이트</b> 사용 (글자 1개)<br><code>int x = 100;</code> → RAM에서 <b>4바이트</b> 사용 (정수)<br><code>float f = 3.14;</code> → RAM에서 <b>4바이트</b> 사용 (소수점)<br><code>double d = 3.14159;</code> → RAM에서 <b>8바이트</b> 사용 (정밀 소수점)<br><br>RAM 8GB = 약 <b>80억 바이트</b> = int 변수를 약 <b>20억 개</b> 만들 수 있어요!<br>Part 2에서 이 자료형들을 직접 사용해 볼 거예요.</div></div>
<h2>[컴퓨팅사고력] 추상화 실습 — 컴퓨터를 비유로 이해하기</h2>
<p>이 유닛에서 CPU를 '두뇌', RAM을 '책상', SSD를 '책장'으로 비유했어요. 복잡한 것을 <b>핵심만 뽑아서 단순하게 표현</b>하는 것 — 이것이 컴퓨팅사고력의 <b>추상화</b>예요.</p>
<div class="exercise avoid-break"><div class="exercise-title">문제 18 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[컴퓨팅사고력] GPU를 일상의 무언가에 비유해 보세요. 
(1) 비유 대상을 정하세요
(2) GPU의 어떤 특징(코어 수천 개, 병렬 처리, 단순 계산에 강함)이 그 비유와 맞는지 설명하세요
(3) 비유의 한계(맞지 않는 점)도 한 가지 적으세요</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[C언어] sizeof로 변수 크기 직접 확인하기</h2>
<p>C언어에는 변수가 RAM에서 몇 바이트를 차지하는지 알려주는 <b>sizeof</b>라는 도구가 있어요. 직접 확인해 보세요!</p>
<div class="code-block avoid-break"><div class="code-block-header">sizeof로 자료형 크기 확인 (Part 2 미리보기)</div>
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span></td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code"><span class="type">int</span> <span class="fn">main</span>(<span class="type">void</span>) {</td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"char:   <span class="fmt">%l</span>u바이트<span class="esc">\\n</span>"</span>, <span class="kw">sizeof</span>(<span class="type">char</span>));</td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"int:    <span class="fmt">%l</span>u바이트<span class="esc">\\n</span>"</span>, <span class="kw">sizeof</span>(<span class="type">int</span>));</td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"float:  <span class="fmt">%l</span>u바이트<span class="esc">\\n</span>"</span>, <span class="kw">sizeof</span>(<span class="type">float</span>));</td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"double: <span class="fmt">%l</span>u바이트<span class="esc">\\n</span>"</span>, <span class="kw">sizeof</span>(<span class="type">double</span>));</td></tr>
<tr class=""><td class="line-num">8</td><td class="line-code">    </td></tr>
<tr class=""><td class="line-num">9</td><td class="line-code">    <span class="cmt">// RAM 8GB로 int 몇 개 만들 수 있을까?</span></td></tr>
<tr class=""><td class="line-num">10</td><td class="line-code">    <span class="type">long</span> <span class="type">long</span> ram_bytes = 8LL * <span class="num">1024</span> * <span class="num">1024</span> * <span class="num">1024</span>; <span class="cmt">// 8GB</span></td></tr>
<tr class=""><td class="line-num">11</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"<span class="esc">\\n</span>RAM 8GB = <span class="fmt">%l</span>ld바이트<span class="esc">\\n</span>"</span>, ram_bytes);</td></tr>
<tr class=""><td class="line-num">12</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"int 변수 최대 <span class="fmt">%l</span>ld개 가능!<span class="esc">\\n</span>"</span>, ram_bytes / <span class="kw">sizeof</span>(<span class="type">int</span>));</td></tr>
<tr class=""><td class="line-num">13</td><td class="line-code">    <span class="kw">return</span> <span class="num">0</span>;</td></tr>
<tr class=""><td class="line-num">14</td><td class="line-code">}</td></tr></table></div>
<!-- unknown type: output-block -->
<h2>[KOI] 추가 실전 문제 — 캐시와 성능</h2>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 4] 캐시 히트율 계산</span><div class="box-content"><b>문제:</b> CPU가 데이터를 100번 요청했는데, 그 중 92번은 캐시에서 찾았고 8번은 RAM에서 가져왔습니다. 캐시 히트율은 몇 %인가요?<br><br><b>정답:</b> 92%<br><br><b>풀이:</b><br>• 캐시 히트율 = (캐시에서 찾은 횟수 ÷ 전체 접근 횟수) × 100<br>• = (92 ÷ 100) × 100 = <b>92%</b><br>• 현대 CPU는 보통 <b>95% 이상</b>의 히트율을 달성해요<br>• 히트율이 높을수록 CPU가 RAM까지 기다리지 않아서 빨라요!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 5] 데이터 버스 폭</span><div class="box-content"><b>문제:</b> 32비트 데이터 버스를 가진 CPU가 메모리에서 128비트 데이터를 가져오려면 최소 몇 번 접근해야 하나요?<br><br><b>정답:</b> 4번<br><br><b>풀이:</b><br>• 32비트 버스 = 한 번에 32비트(4바이트) 전달 가능<br>• 128비트 ÷ 32비트 = <b>4번</b> 접근 필요<br>• 이것이 64비트 USB가 32비트보다 2배 빠른 이유!<br>• 도로 비유: 4차선 도로보다 8차선 도로가 차를 더 많이 통과시키죠</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 6] DMA의 역할</span><div class="box-content"><b>문제:</b> DMA(Direct Memory Access)를 사용하는 가장 큰 이유는?<br>(1) 데이터를 암호화하기 위해<br>(2) CPU가 다른 일을 하는 동안 데이터를 전송하기 위해<br>(3) RAM의 용량을 늘리기 위해<br>(4) 캐시의 속도를 높이기 위해<br><br><b>정답:</b> (2)<br><br><b>풀이:</b><br>• DMA 없이: CPU가 직접 SSD→RAM 데이터 복사 (그동안 다른 일 못 함!)<br>• DMA 있으면: DMA 컨트롤러가 복사 담당, CPU는 자유롭게 계산!<br>• 비유: 사장님(CPU)이 직접 택배 나르기 vs 택배기사(DMA) 고용<br>• 다 끝나면 DMA가 인터럽트로 CPU에게 '끝났어요!' 보고</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 7] 인터럽트 처리 순서</span><div class="box-content"><b>문제:</b> CPU가 프로그램 A를 실행 중에 키보드 인터럽트가 발생했습니다. 처리 순서를 올바르게 나열하세요.<br><br>(가) 키보드 입력을 처리하는 핸들러 실행<br>(나) CPU가 하던 작업(프로그램 A)의 상태 저장<br>(다) 인터럽트 신호 감지<br>(라) 프로그램 A로 복귀하여 이어서 실행<br><br><b>정답:</b> (다) → (나) → (가) → (라)<br><br><b>풀이:</b><br>1. 키보드 눌림 → <b>인터럽트 신호 감지</b> (다)<br>2. CPU가 프로그램 A의 현재 위치와 레지스터 값을 <b>저장</b> (나) — '여기까지 했어' 표시<br>3. 키보드 입력을 처리하는 <b>인터럽트 핸들러 실행</b> (가)<br>4. 처리 완료 후 저장해둔 상태를 복원하여 <b>프로그램 A 이어서 실행</b> (라)</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 19 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[KOI] 4단계 파이프라인 CPU에서 20개의 명령어를 실행하려면 총 몇 클럭이 필요한가요? 공식을 적용하여 풀이과정도 적으세요. (파이프라인 없을 때와 비교하여 몇 배 빨라지는지도 계산하세요)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 20 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[KOI] CPU가 데이터를 500번 요청했는데, L1에서 400번, L2에서 60번, L3에서 30번, RAM에서 10번 찾았습니다.
(1) 전체 캐시 히트율은 몇 %인가요?
(2) L1 히트율만 따로 계산하면 몇 %인가요?
(3) 왜 L1 히트율이 높을수록 좋은지 설명하세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 21 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[C+하드웨어] C언어에서 int arr[1000000]; (100만 개짜리 int 배열)을 선언하면 RAM을 몇 바이트 사용하나요? 이것을 MB(메가바이트)로 변환하세요. (1MB = 1,048,576바이트)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[실생활] GPU가 바꾸고 있는 세상</h2>
<p>GPU는 게임을 넘어서 우리 생활 곳곳을 변화시키고 있어요.</p>
<div class="box box-history avoid-break"><span class="box-label">[실생활] GPU 활용 사례 5가지</span><div class="box-content"><b>1. AI/딥러닝:</b> ChatGPT는 수천 대의 GPU로 학습. NVIDIA A100 GPU 1만 장 사용!<br><b>2. 자율주행:</b> 차 주변 카메라 8대의 영상을 실시간으로 분석 — GPU 없이는 불가능<br><b>3. 의료 영상:</b> CT/MRI 이미지를 GPU로 분석해서 종양을 자동 감지<br><b>4. 가상화폐:</b> 비트코인 채굴에 GPU 대량 사용 → GPU 가격 폭등 사태(2021년)<br><b>5. 영화 VFX:</b> 마블 영화의 3D 특수효과를 수천 대의 GPU로 렌더링<br><br>NVIDIA 창업자 젠슨 황은 '세상에서 가장 중요한 칩은 GPU'라고 말했어요.<br>GPU 덕분에 AI 시대가 열렸다고 해도 과언이 아니에요!</div></div>
<div class="box box-summary avoid-break"><span class="box-label">이 유닛에서 깊이 배운 10축</span><div class="box-content"><b>[하드웨어]</b> CPU(ALU+CU), RAM(휘발성), SSD(비휘발성), 캐시(L1/L2/L3), GPU, 파이프라인+해저드, 버스(데이터/주소/제어), 인터럽트+핸들러, DMA. SVG 6종으로 시각화<br><b>[KOI]</b> 메모리 계층 순서, 휘발성/비휘발성 구별, 파이프라인 클럭 계산, 캐시 히트율, 데이터 버스 폭, DMA 역할, 인터럽트 처리순서. 실전 문제 7개+풀이<br><b>[디버깅]</b> 하드웨어 에러(과열/RAM부족/SSD불량/블루스크린) vs 소프트웨어 에러(버그/문법/논리) 구별법<br><b>[C언어]</b> sizeof로 자료형 크기 확인. int/char/float/double과 RAM 크기 관계. 100만개 배열 메모리 계산<br><b>[컴퓨팅사고력]</b> 추상화 — 복잡한 부품을 비유로 단순화. GPU 비유 만들기 실습<br><b>[코딩기초]</b> 변수 = RAM 공간. 자료형별 메모리 크기. sizeof 코드 미리보기<br><b>[실생활]</b> AI/자율주행/의료/가상화폐/영화 — GPU가 바꾸고 있는 세상 5가지</div></div>
<div class="box box-history avoid-break"><span class="box-label">[실생활] RAM이 부족하면?</span><div class="box-content">브라우저 탭을 너무 많이 열면 컴퓨터가 느려져요. RAM(책상)이 꽉 차서 더 올려놓을 공간이 없기 때문이에요. 이때 OS는 RAM의 일부 데이터를 SSD로 옮겨요 — 이걸 <b>스왑(swap)</b> 또는 <b>가상 메모리</b>라고 해요. SSD는 RAM보다 1000배 느리기 때문에 컴퓨터가 확 느려져요!<br><br><b>해결법:</b> 탭을 닫거나, RAM을 추가로 장착하거나, 메모리 적게 쓰는 프로그램으로 바꾸세요.</div></div>
<div class="box box-question avoid-break"><span class="box-label">[다음 유닛 미리보기]</span><div class="box-content">컴퓨터가 숫자, 글자, 그림을 어떻게 저장할까요? 힌트: 컴퓨터는 0과 1밖에 모른다고 해요. 어떻게 그 두 숫자로 모든 걸 표현할 수 있을까요?</div></div>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-hello.svg" alt="마스코트" />
        <div class="mascot-bubble celebrate">컴퓨터 안의 부품들을 전부 알아봤어요! CPU, RAM, SSD는 물론이고 캐시, GPU, 임베디드 시스템까지! 다음에는 컴퓨터가 0과 1로 어떻게 세상을 표현하는지 알아봐요!</div>
      </div>
</article>`,
            },
        ],
    },
    {
        id: 'cb-u03',
        unitNumber: 3,
        title: `0과 1의 세계 (비트)`,
        type: '이론' as const,
        problems: [],
        pages: [
            {
                id: 'cb-u03-p1',
                title: `0과 1의 세계 (비트)`,
                type: '페이지' as const,
                content: `<style>
/* ═══════════════════════════════════════════════════════════════
   코딩쏙 프리미엄 PDF 교재 스타일시트 v5.0
   Paged.js + A4 인쇄 최적화 + 아동교육 디자인 시스템
   ═══════════════════════════════════════════════════════════════ */

/* ── 리셋 & 기본 ── */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --c-primary: #FF6B6B;
  --c-primary-light: #FFE8E8;
  --c-primary-dark: #E84545;
  --c-accent: #4ECDC4;
  --c-accent-light: #E8FFF9;
  --c-blue: #3B82F6;
  --c-blue-light: #EFF6FF;
  --c-purple: #8B5CF6;
  --c-purple-light: #F5F3FF;
  --c-orange: #F59E0B;
  --c-orange-light: #FFFBEB;
  --c-green: #10B981;
  --c-green-light: #ECFDF5;
  --c-red: #EF4444;
  --c-red-light: #FEF2F2;
  --c-teal: #14B8A6;
  --c-teal-light: #F0FDFA;
  --c-pink: #EC4899;
  --c-text: #1E293B;
  --c-text-secondary: #64748B;
  --c-text-muted: #94A3B8;
  --c-border: #E2E8F0;
  --c-bg-subtle: #F8FAFC;
  --c-bg-warm: #FFFBF5;
  --font-body: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-code: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.10);
}

/* ── 페이지 설정 ── */
@page {
  size: A4;
  margin: 18mm 17mm 15mm 22mm;
  @bottom-center {
    content: counter(page);
    font-family: var(--font-body);
    font-size: 9pt;
    color: var(--c-text-muted);
    letter-spacing: 1px;
  }
}
@page :first { @bottom-center { content: none; } }

body {
  font-family: var(--font-body);
  color: var(--c-text);
  background: white;
  font-size: 11.5pt;
  line-height: 180%;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ── 페이지 제어 ── */
.avoid-break { break-inside: avoid !important; page-break-inside: avoid !important; }
h2, h3 { break-after: avoid !important; page-break-after: avoid !important; }
.page-break-hint { break-before: page !important; page-break-before: always !important; height: 0; margin: 0; padding: 0; }
p { orphans: 3; widows: 3; }

/* ═══════════════════════════════════════
   레슨 헤더 — 프리미엄 그래디언트 배너
   ═══════════════════════════════════════ */
.lesson-header {
  margin-bottom: 6mm;
  padding: 6mm 5mm 5mm;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FEC89A 100%);
  border-radius: var(--radius-xl);
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.lesson-header::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -10%;
  width: 140px;
  height: 140px;
  background: rgba(255,255,255,0.12);
  border-radius: 50%;
}
.lesson-header::after {
  content: '';
  position: absolute;
  bottom: -20%;
  left: 15%;
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
}
.lesson-number {
  font-size: 10pt;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin-bottom: 2mm;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}
.lesson-title {
  font-size: 24pt;
  font-weight: 900;
  line-height: 125%;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.15);
  position: relative;
  z-index: 1;
}
.lesson-summary {
  font-size: 11pt;
  color: rgba(255,255,255,0.9);
  margin-top: 2.5mm;
  font-weight: 400;
  position: relative;
  z-index: 1;
}

/* ═══════════════════════════════════════
   제목 계층 — 프리미엄 타이포그래피
   ═══════════════════════════════════════ */
h2 {
  font-size: 16pt;
  font-weight: 800;
  margin: 6mm 0 3mm;
  padding: 2mm 0 2mm 4.5mm;
  border-left: 4.5px solid var(--c-primary);
  color: var(--c-text);
  background: linear-gradient(90deg, var(--c-primary-light) 0%, transparent 60%);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  letter-spacing: -0.3px;
}
h3 {
  font-size: 13.5pt;
  font-weight: 700;
  color: #334155;
  margin: 4mm 0 2.5mm;
  padding-bottom: 1mm;
  border-bottom: 2px solid #F1F5F9;
}
p {
  margin-bottom: 2.5mm;
  text-align: justify;
  line-height: 175%;
  font-size: 11.5pt;
}

/* ── 인라인 코드 ── */
code {
  font-family: var(--font-code);
  font-size: 9.5pt;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  padding: 0.5mm 2mm;
  border-radius: 4px;
  color: #92400E;
  border: 1px solid #FCD34D;
  font-weight: 500;
}

/* ═══════════════════════════════════════
   코드 블록 — 프리미엄 IDE 스타일
   ═══════════════════════════════════════ */
.code-block {
  background: #0F172A;
  border-radius: var(--radius-md);
  padding: 0;
  margin: 3mm 0;
  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.05);
  overflow: hidden;
  border: 1px solid #1E293B;
}
.code-block-header {
  font-family: var(--font-body);
  font-size: 8.5pt;
  font-weight: 600;
  color: #94A3B8;
  padding: 2.5mm 4.5mm;
  background: #1E293B;
  border-bottom: 1px solid #334155;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.code-block-header::before {
  content: '';
  display: inline-flex;
  width: 8px; height: 8px;
  background: #EF4444;
  border-radius: 50%;
  box-shadow: 14px 0 0 #F59E0B, 28px 0 0 #22C55E;
  flex-shrink: 0;
}
.code-table { width: 100%; border-collapse: collapse; }
.code-table td { vertical-align: top; padding: 0; }
.line-num {
  width: 10mm;
  text-align: right;
  padding: 0.5mm 3mm 0.5mm 0;
  font-family: var(--font-code);
  font-size: 8pt;
  color: #475569;
  line-height: 165%;
  user-select: none;
  background: rgba(0,0,0,0.15);
}
.line-code {
  font-family: var(--font-code);
  font-size: 10pt;
  color: #E2E8F0;
  line-height: 165%;
  padding: 0.5mm 4mm 0.5mm 3mm;
  white-space: pre;
}
.line-highlight td { background: rgba(59,130,246,0.12) !important; }
.line-highlight .line-num { color: var(--c-blue) !important; font-weight: 700; }

/* 신택스 컬러 — VS Code Dark+ 영감 */
.kw { color: #C084FC; font-weight: 500; }
.str { color: #86EFAC; }
.cmt { color: #6B7280; font-style: italic; }
.fn { color: #FDBA74; }
.pp { color: #F472B6; font-weight: 600; }
.num { color: #7DD3FC; }
.type { color: #5EEAD4; font-weight: 500; }
.mc { color: #67E8F9; }
.esc { color: #FCD34D; font-weight: 600; }
.fmt { color: #FCD34D; }

/* ═══════════════════════════════════════
   실행 결과 — 터미널 스타일
   ═══════════════════════════════════════ */
.output-block {
  background: #F0FDF4;
  border: 1.5px solid #86EFAC;
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin: 3mm 0;
  position: relative;
}
.output-label {
  font-family: var(--font-body);
  font-size: 8.5pt;
  color: var(--c-green);
  display: block;
  margin-bottom: 1.5mm;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.output-text {
  font-family: var(--font-code);
  font-size: 10.5pt;
  line-height: 160%;
  color: #166534;
}

/* ═══════════════════════════════════════
   박스 시스템 — 프리미엄 카드 디자인
   ═══════════════════════════════════════ */
.box {
  border-radius: var(--radius-md);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  position: relative;
  box-shadow: var(--shadow-sm);
}
.box-label {
  font-size: 10.5pt;
  font-weight: 800;
  margin-bottom: 2mm;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.box-content { font-size: 11pt; line-height: 170%; }
.box-warning {
  border-left: 5px solid var(--c-red);
  background: linear-gradient(135deg, #FEF2F2 0%, #FFF1F2 100%);
}
.box-warning .box-label { color: var(--c-red); }
.box-key {
  border-left: 5px solid var(--c-blue);
  background: linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%);
}
.box-key .box-label { color: var(--c-blue); }
.box-tip {
  border-left: 5px solid var(--c-orange);
  background: linear-gradient(135deg, #FFFBEB 0%, #FEF9C3 50%, #FFFBEB 100%);
}
.box-tip .box-label { color: var(--c-orange); }
.box-summary {
  border-left: 5px solid var(--c-green);
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border: 1.5px solid #A7F3D0;
  border-left: 5px solid var(--c-green);
}
.box-summary .box-label { color: var(--c-green); }
.box-question {
  border-left: 5px solid var(--c-purple);
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
}
.box-question .box-label { color: var(--c-purple); }
.box-history {
  border-left: 5px solid var(--c-teal);
  background: linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%);
}
.box-history .box-label { color: var(--c-teal); }

/* ═══════════════════════════════════════
   연습문제 — 프리미엄 카드
   ═══════════════════════════════════════ */
.exercise {
  background: white;
  border: 1.5px solid #E2E8F0;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  border-left: 5px solid var(--c-primary);
  box-shadow: var(--shadow-sm);
  position: relative;
}
.exercise-title {
  font-size: 13pt;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 2.5mm;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.difficulty {
  display: inline-flex;
  align-items: center;
  font-size: 8pt;
  padding: 0.5mm 2.5mm;
  border-radius: 20px;
  margin-left: 2mm;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.diff-1 { background: #D1FAE5; color: #059669; }
.diff-2 { background: #FEF3C7; color: #D97706; }
.diff-3 { background: #FEE2E2; color: #DC2626; }
.memo-area {
  border: 2px dashed #CBD5E1;
  border-radius: var(--radius-md);
  padding: 3mm;
  min-height: 15mm;
  margin-top: 2.5mm;
  background: repeating-linear-gradient(
    transparent, transparent 7mm, #F1F5F9 7mm, #F1F5F9 7.5mm
  );
}
.memo-label { font-size: 8.5pt; color: var(--c-text-muted); font-style: italic; }

/* ── OX/Choice/Short ── */
.exercise-answer {
  font-size: 10pt;
  color: var(--c-green);
  margin-top: 2mm;
  padding: 1.5mm 3mm;
  background: var(--c-green-light);
  border-radius: var(--radius-sm);
  font-weight: 600;
  border: 1px solid #A7F3D0;
}
.exercise-explain {
  font-size: 9.5pt;
  color: var(--c-text-secondary);
  margin-top: 1.5mm;
  padding: 2mm 3mm;
  background: #F8FAFC;
  border-radius: var(--radius-sm);
  border-left: 3px solid #E2E8F0;
}
.choice-list { padding-left: 6mm; margin: 2mm 0; }
.choice-list li { font-size: 10.5pt; margin-bottom: 1.5mm; line-height: 150%; }
.choice-list li.choice-correct { color: var(--c-green); font-weight: 700; }

/* ═══════════════════════════════════════
   Before/After 비교 — 프리미엄 2컬럼
   ═══════════════════════════════════════ */
.compare {
  display: flex;
  gap: 3mm;
  margin: 3mm 0;
  overflow: hidden;
}
.compare-bad {
  flex: 1;
  min-width: 0;
  background: linear-gradient(135deg, #FEF2F2, #FFF1F2);
  border: 1.5px solid #FECACA;
  border-radius: var(--radius-md);
  padding: 3mm;
  overflow: hidden;
}
.compare-good {
  flex: 1;
  min-width: 0;
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border: 1.5px solid #A7F3D0;
  border-radius: var(--radius-md);
  padding: 3mm;
  overflow: hidden;
}
.compare code {
  font-size: 9pt;
  word-break: break-all;
  overflow-wrap: break-word;
  display: block;
  background: rgba(0,0,0,0.05);
  padding: 2mm 3mm;
  border-radius: var(--radius-sm);
  margin: 1.5mm 0;
  line-height: 155%;
  white-space: pre-wrap;
  border: none;
  color: inherit;
}
.compare-label { font-size: 9.5pt; font-weight: 800; margin-bottom: 1.5mm; }
.compare-bad .compare-label { color: var(--c-red); }
.compare-good .compare-label { color: var(--c-green); }
.compare-msg-bad { font-size: 9pt; color: var(--c-red); }
.compare-msg-good { font-size: 9pt; color: var(--c-green); }

/* ═══════════════════════════════════════
   챕터 시작 — 프리미엄 카드
   ═══════════════════════════════════════ */
.chapter-start-box { margin-bottom: 3mm; }
.learning-goals {
  background: linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 100%);
  border-radius: var(--radius-lg);
  padding: 4mm 5mm;
  margin-bottom: 3mm;
  border: 1.5px solid #FED7AA;
  box-shadow: var(--shadow-sm);
}
.learning-goals h3 {
  font-size: 12pt;
  font-weight: 800;
  color: #EA580C;
  margin: 0 0 2.5mm;
  border: none;
  padding: 0;
}
.learning-goals ul { padding-left: 5mm; margin: 0; }
.learning-goals li { font-size: 11pt; margin-bottom: 1.5mm; line-height: 160%; color: #431407; }
.prereq-check {
  background: var(--c-blue-light);
  border-left: 5px solid var(--c-blue);
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin-bottom: 2.5mm;
}
.prereq-check h3 {
  font-size: 11pt;
  font-weight: 700;
  color: var(--c-blue);
  margin: 0 0 1.5mm;
  border: none;
  padding: 0;
}
.checklist { list-style: none; padding-left: 4mm; margin: 0; }
.checklist li { margin-bottom: 1mm; font-size: 10.5pt; }
.checklist li::before { content: '\\2610  '; font-size: 12pt; color: var(--c-text-muted); }
.progress-section { margin-top: 2.5mm; }
.progress-label { font-size: 9.5pt; color: var(--c-text-secondary); font-weight: 600; }
.progress-bar {
  background: #E2E8F0;
  border-radius: 6px;
  height: 4mm;
  margin-top: 1.5mm;
  overflow: hidden;
}
.progress-fill {
  background: linear-gradient(90deg, var(--c-primary), #FF8E53, #FEC89A);
  height: 100%;
  border-radius: 6px;
}

/* ═══════════════════════════════════════
   Predict — 생각해보기 카드
   ═══════════════════════════════════════ */
.predict-box {
  display: flex;
  gap: 3.5mm;
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
  border: 1.5px solid #C4B5FD;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  box-shadow: var(--shadow-sm);
}
.predict-icon {
  width: 10mm; height: 10mm;
  background: linear-gradient(135deg, var(--c-purple), #A78BFA);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16pt;
  font-weight: 900;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(139,92,246,0.3);
}
.predict-content { flex: 1; }
.predict-content p { font-size: 11pt; margin-bottom: 2mm; }

/* ═══════════════════════════════════════
   다이어그램 — 프리미엄 컨테이너
   ═══════════════════════════════════════ */
.diagram-box {
  background: var(--c-bg-subtle);
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 4mm;
  margin: 3.5mm 0;
  box-shadow: var(--shadow-sm);
}
.diagram-title {
  font-size: 11pt;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 3mm;
  text-align: center;
  letter-spacing: 0.3px;
}
.diagram-content { font-size: 10.5pt; line-height: 170%; }
.diagram-content .d-row { display: flex; align-items: center; justify-content: center; gap: 3mm; margin: 2mm 0; }
.diagram-content .d-block { background: #1E293B; color: white; padding: 2mm 4mm; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 9.5pt; font-weight: 500; }
.diagram-content .d-block-highlight { background: linear-gradient(135deg, var(--c-primary), #FF8E53); color: white; padding: 2mm 4mm; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 9.5pt; font-weight: 700; }
.diagram-content .d-arrow { color: var(--c-text-muted); font-size: 14pt; }
.diagram-content .d-label { font-size: 8.5pt; color: var(--c-text-secondary); }

/* ═══════════════════════════════════════
   Steps — 프리미엄 타임라인
   ═══════════════════════════════════════ */
.steps-visual { margin: 3mm 0; }
.step-item {
  display: flex;
  align-items: flex-start;
  gap: 3.5mm;
  margin-bottom: 1.5mm;
}
.step-num {
  width: 8mm; height: 8mm;
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10pt;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 0.5mm;
  box-shadow: 0 2px 4px rgba(255,107,107,0.3);
}
.step-body { flex: 1; }
.step-title { font-size: 11pt; font-weight: 700; margin-bottom: 0.5mm; color: var(--c-text); }
.step-desc { font-size: 10.5pt; color: var(--c-text-secondary); line-height: 160%; }
.step-connector { width: 2.5px; height: 4mm; background: linear-gradient(180deg, var(--c-primary), transparent); margin-left: 3.7mm; }

/* ═══════════════════════════════════════
   Modify — 바꿔보기 카드
   ═══════════════════════════════════════ */
.modify-box {
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  border: 1.5px solid #7DD3FC;
  border-left: 5px solid #0EA5E9;
  border-radius: var(--radius-md);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
}
.modify-label { font-size: 10.5pt; font-weight: 800; color: #0284C7; margin-bottom: 2mm; }
.modify-hint { font-size: 9.5pt; color: var(--c-text-secondary); font-style: italic; margin: 1.5mm 0; }

/* ═══════════════════════════════════════
   정답 섹션
   ═══════════════════════════════════════ */
.answers-section {
  background: white;
  border: 1.5px solid #E9D5FF;
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin: 3mm 0;
  border-left: 5px solid var(--c-purple);
}
.answers-section h3 {
  font-size: 12pt;
  font-weight: 800;
  color: var(--c-purple);
  margin: 0 0 2.5mm;
  border: none;
  padding: 0;
}
.answer-item { margin-bottom: 1mm; font-size: 10pt; line-height: 150%; }
.answer-num { font-weight: 700; color: var(--c-primary); margin-right: 2mm; }
.answer-text { color: var(--c-text); }

/* ═══════════════════════════════════════
   코드 설명 (라인별)
   ═══════════════════════════════════════ */
.code-explain { margin: 3mm 0; padding-left: 2mm; }
.code-explain-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.5mm;
  font-size: 11pt;
  line-height: 165%;
}
.code-explain-line {
  font-family: var(--font-code);
  font-size: 9pt;
  color: white;
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  padding: 0.5mm 2.5mm;
  border-radius: 4px;
  margin-right: 3mm;
  flex-shrink: 0;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(255,107,107,0.3);
}

/* ═══════════════════════════════════════
   용어 정리 — 프리미엄 테이블
   ═══════════════════════════════════════ */
.glossary { margin: 3mm 0; break-inside: avoid; }
.glossary-item {
  display: flex;
  margin-bottom: 0;
  font-size: 10pt;
  padding: 2mm 3mm;
  border-bottom: 1px solid #F1F5F9;
}
.glossary-item:nth-child(odd) { background: #F8FAFC; }
.glossary-item:first-child { border-radius: var(--radius-sm) var(--radius-sm) 0 0; }
.glossary-item:last-child { border-radius: 0 0 var(--radius-sm) var(--radius-sm); border-bottom: none; }
.glossary-term {
  font-weight: 700;
  min-width: 28mm;
  flex-shrink: 0;
  color: var(--c-text);
  font-family: var(--font-code);
  font-size: 9.5pt;
}
.glossary-def { color: var(--c-text-secondary); line-height: 155%; }

/* ═══════════════════════════════════════
   추적 테이블 — 프리미엄 데이터 테이블
   ═══════════════════════════════════════ */
.trace-table { margin: 3.5mm 0; }
.trace-caption { font-size: 10.5pt; font-weight: 700; color: var(--c-primary); margin-bottom: 2mm; }
.trace-table table { width: 100%; border-collapse: collapse; font-size: 10pt; border-radius: var(--radius-sm); overflow: hidden; }
.trace-table th {
  background: linear-gradient(135deg, #1E293B, #334155);
  color: white;
  padding: 2mm 3.5mm;
  text-align: left;
  font-weight: 700;
  font-size: 9.5pt;
}
.trace-table td { padding: 2mm 3.5mm; border-bottom: 1px solid #F1F5F9; font-family: var(--font-code); font-size: 9.5pt; }
.trace-table tr:nth-child(even) td { background: #F8FAFC; }

/* ═══════════════════════════════════════
   마스코트 말풍선 — 프리미엄 디자인
   ═══════════════════════════════════════ */
.mascot-speech {
  display: flex;
  align-items: flex-start;
  gap: 3.5mm;
  margin: 3.5mm 0;
}
.mascot-speech.right { flex-direction: row-reverse; }
.mascot-speech-img {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
}
.mascot-speech-img.small { width: 48px; height: 48px; }
.mascot-speech-img.large { width: 80px; height: 80px; }
.mascot-bubble {
  position: relative;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border: 1.5px solid #93C5FD;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  font-size: 10.5pt;
  color: #1E3A5F;
  line-height: 1.6;
  flex: 1;
  max-width: 85%;
  box-shadow: var(--shadow-sm);
}
.mascot-bubble.warn {
  background: linear-gradient(135deg, #FEF2F2, #FEE2E2);
  border-color: #FCA5A5;
  color: #7F1D1D;
}
.mascot-bubble.success {
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border-color: #6EE7B7;
  color: #14532D;
}
.mascot-bubble.tip {
  background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  border-color: #FCD34D;
  color: #78350F;
}
.mascot-bubble::before {
  content: '';
  position: absolute;
  top: 14px;
  left: -9px;
  border: 7px solid transparent;
  border-right-color: #93C5FD;
}
.mascot-bubble::after {
  content: '';
  position: absolute;
  top: 15px;
  left: -7px;
  border: 6px solid transparent;
  border-right-color: #EFF6FF;
}
.mascot-speech.right .mascot-bubble::before {
  left: auto; right: -9px;
  border-right-color: transparent;
  border-left-color: #93C5FD;
}
.mascot-speech.right .mascot-bubble::after {
  left: auto; right: -7px;
  border-right-color: transparent;
  border-left-color: #EFF6FF;
}
.mascot-bubble.warn::before { border-right-color: #FCA5A5; }
.mascot-bubble.warn::after { border-right-color: #FEF2F2; }
.mascot-speech.right .mascot-bubble.warn::before { border-right-color: transparent; border-left-color: #FCA5A5; }
.mascot-speech.right .mascot-bubble.warn::after { border-right-color: transparent; border-left-color: #FEF2F2; }
.mascot-bubble.success::before { border-right-color: #6EE7B7; }
.mascot-bubble.success::after { border-right-color: #ECFDF5; }
.mascot-speech.right .mascot-bubble.success::before { border-right-color: transparent; border-left-color: #6EE7B7; }
.mascot-speech.right .mascot-bubble.success::after { border-right-color: transparent; border-left-color: #ECFDF5; }
.mascot-bubble.tip::before { border-right-color: #FCD34D; }
.mascot-bubble.tip::after { border-right-color: #FFFBEB; }
.mascot-speech.right .mascot-bubble.tip::before { border-right-color: transparent; border-left-color: #FCD34D; }
.mascot-speech.right .mascot-bubble.tip::after { border-right-color: transparent; border-left-color: #FFFBEB; }

/* ═══════════════════════════════════════
   Fact Bite — 숫자/팩트 강조 카드
   ═══════════════════════════════════════ */
.fact-bite {
  display: flex;
  align-items: center;
  gap: 4mm;
  margin: 3mm 0;
  background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FFF1F2 100%);
  border-radius: var(--radius-lg);
  padding: 3.5mm 5mm;
  border: 1.5px solid #FECDD3;
  box-shadow: var(--shadow-sm);
}
.fact-bite-number {
  font: 900 28pt var(--font-body);
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  flex-shrink: 0;
}
.fact-bite-text { font-size: 10pt; color: var(--c-text-secondary); line-height: 1.5; }

/* ═══════════════════════════════════════
   Visual Summary — 핵심 정리 카드
   ═══════════════════════════════════════ */
.visual-summary {
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%);
  border: 1.5px solid #6EE7B7;
  border-radius: var(--radius-xl);
  padding: 5mm;
  margin: 4mm 0;
  box-shadow: var(--shadow-md);
}
.visual-summary-title {
  font-size: 14pt;
  font-weight: 900;
  color: #065F46;
  text-align: center;
  margin-bottom: 3mm;
}
.visual-summary-items { display: flex; flex-direction: column; gap: 2mm; }
.visual-summary-item {
  display: flex;
  align-items: flex-start;
  gap: 3mm;
  background: rgba(255,255,255,0.7);
  padding: 2.5mm 3.5mm;
  border-radius: var(--radius-md);
  backdrop-filter: blur(4px);
}
.visual-summary-num {
  width: 7mm; height: 7mm;
  background: linear-gradient(135deg, #059669, #10B981);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9pt;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(5,150,105,0.3);
}

/* ═══════════════════════════════════════
   10축 매핑 전용 스타일
   ═══════════════════════════════════════ */
.axis-section {
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1.5px solid #CBD5E1;
  border-radius: var(--radius-xl);
  padding: 5mm;
  margin: 5mm 0;
  box-shadow: var(--shadow-md);
  page-break-inside: avoid;
}
.axis-title {
  font-size: 14pt;
  font-weight: 900;
  text-align: center;
  margin-bottom: 4mm;
  color: var(--c-text);
  letter-spacing: -0.3px;
}
.axis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5mm;
}
.axis-item {
  display: flex;
  align-items: flex-start;
  gap: 2mm;
  padding: 2.5mm 3mm;
  border-radius: var(--radius-md);
  background: white;
  border: 1px solid #E2E8F0;
}
.axis-badge {
  font-size: 7.5pt;
  font-weight: 800;
  padding: 0.5mm 2.5mm;
  border-radius: 20px;
  flex-shrink: 0;
  letter-spacing: 0.3px;
  white-space: nowrap;
}
.axis-badge.c-lang { background: #DBEAFE; color: #1D4ED8; }
.axis-badge.thinking { background: #E0E7FF; color: #4338CA; }
.axis-badge.debug { background: #FEE2E2; color: #DC2626; }
.axis-badge.koi { background: #FEF3C7; color: #B45309; }
.axis-badge.basics { background: #D1FAE5; color: #059669; }
.axis-badge.reallife { background: #CCFBF1; color: #0D9488; }
.axis-badge.crosssubj { background: #E9D5FF; color: #7C3AED; }
.axis-badge.project { background: #FFE4E6; color: #BE123C; }
.axis-badge.ai { background: #FCE7F3; color: #DB2777; }
.axis-badge.hardware { background: #CFFAFE; color: #0891B2; }
.axis-text { font-size: 9.5pt; line-height: 150%; color: var(--c-text-secondary); }

/* ── TOC ── */
.toc { margin: 5mm 0; }
.toc h2 { border: none; padding: 0; margin-bottom: 3mm; background: none; }
.toc ul { list-style: none; padding: 0; }
.toc-h2 { display: flex; align-items: baseline; margin-bottom: 1.5mm; font-size: 11pt; }
.toc-text { flex-shrink: 0; }
.toc-dots { flex: 1; border-bottom: 1.5px dotted #CBD5E1; margin: 0 2mm; min-width: 10mm; }
.toc-page { flex-shrink: 0; color: var(--c-text-muted); font-size: 10pt; }

/* ── Margin Note ── */
.margin-note {
  float: right;
  width: 30mm;
  font-size: 8.5pt;
  color: var(--c-text-secondary);
  background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  padding: 2mm 2.5mm;
  border-radius: var(--radius-sm);
  margin: 0 -35mm 2mm 2mm;
  border-left: 2.5px solid var(--c-orange);
}

/* ── Cross Reference ── */
.crossref { font-size: 9pt; color: var(--c-blue); font-style: italic; font-weight: 500; }

/* ── Image ── */
.image-block { margin: 3.5mm 0; text-align: center; }
.image-block img { max-width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
.image-caption {
  font-size: 9pt;
  color: var(--c-text-secondary);
  margin-top: 2mm;
  font-style: italic;
  background: var(--c-bg-subtle);
  padding: 1.5mm 4mm;
  border-radius: 20px;
  display: inline-block;
}

/* ═══════════════════════════════════════
   v7.0 — 80레이어 리서치 증강분
   v5 프리미엄 기반 + TEXTBOOK-DESIGN-DEEP P1~P6 합성
   ═══════════════════════════════════════ */

/* ── Layer 26: 게슈탈트 근접성 강화 ── */
h2 + p,
h3 + p,
h2 + .code-block,
h3 + .code-block { margin-top: 1mm !important; }
.code-block + .code-explain { margin-top: 0.5mm; }
.code-block + .output-block { margin-top: 1mm; }
.exercise + .exercise { margin-top: 1.5mm; }

/* ── Layer 28: 마이크로 타이포그래피 ── */
body {
  font-kerning: auto;
  font-variant-ligatures: common-ligatures;
  hanging-punctuation: first last;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.line-num { font-variant-numeric: tabular-nums; }
.trace-table td { font-variant-numeric: tabular-nums; }

/* ── Layer 29: 연습문제 유형별 스타일 ── */
.exercise-item { margin-bottom: 2mm; font-size: 11pt; line-height: 165%; }
.exercise-item p { margin-bottom: 1.5mm; }
.exercise-blank { display: inline-block; min-width: 20mm; border-bottom: 2px solid var(--c-primary); margin: 0 1mm; }
.exercise-ox-grid { display: flex; gap: 3mm; margin-top: 2mm; }
.exercise-ox-item { flex: 1; padding: 2mm 3mm; border: 1px solid var(--c-border); border-radius: var(--radius-sm); font-size: 10pt; }
.exercise-matching { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5mm; font-size: 10pt; }
.exercise-reorder { display: flex; flex-direction: column; gap: 1mm; font-family: var(--font-code); font-size: 9.5pt; }
.exercise-reorder-item { background: var(--c-bg-subtle); padding: 1.5mm 3mm; border-radius: var(--radius-sm); border: 1px solid var(--c-border); }

/* ── Layer 30: 교사용 에디션 ── */
.teacher-only { background: #FFF5F5; border: 2px dashed #E74C3C; padding: 3mm; border-radius: var(--radius-md); }
.teacher-note { font-size: 9pt; color: #C0392B; font-style: italic; }

/* ── Layer 32: 디자인 토큰 — 인쇄용 간격 ── */
article > * + * { margin-top: 2.5mm; }
article > h2 { margin-top: 5mm; }
article > h3 { margin-top: 3.5mm; }

/* ── Layer 51: 황금비 타이포 ──
   24pt / 16pt / 13.5pt / 11.5pt = 1:0.67:0.56:0.48 ≈ 피보나치 */

/* ── Layer 55: 인지부하 최적화 — 시각 앵커 ── */
h2::before {
  /* 빈 블록으로 스크롤 앵커 역할 — Paged.js에서 러닝헤드 지원 */
}

/* ── Layer 56: 아이트래킹 — F패턴 강화 ── */
.lesson-header .lesson-number { font-weight: 700; }
.box-label::before {
  content: '';
  display: inline-block;
  width: 3px; height: 14px;
  border-radius: 2px;
  margin-right: 1.5mm;
  flex-shrink: 0;
}
.box-warning .box-label::before { background: var(--c-red); }
.box-key .box-label::before { background: var(--c-blue); }
.box-tip .box-label::before { background: var(--c-orange); }
.box-summary .box-label::before { background: var(--c-green); }
.box-question .box-label::before { background: var(--c-purple); }
.box-history .box-label::before { background: var(--c-teal); }

/* ── Layer 58: 색상 조화 60-30-10 강화 ── */
/* 60% = white/neutral, 30% = brand gradient accents, 10% = c-primary strong */

/* ── Layer 60: 코드 블록 — 브래킷 컬러링 (Layer 30 from Deep) ── */
.brace-1 { color: #C084FC; font-weight: bold; }
.brace-2 { color: #86EFAC; font-weight: bold; }
.brace-3 { color: #FDBA74; font-weight: bold; }
.brace-4 { color: #7DD3FC; font-weight: bold; }

/* ── Layer 61: 인덴트 가이드 ── */
.indent-guide { border-left: 1px solid rgba(255,255,255,0.08); }

/* ── Layer 65: 10축 매핑 강화 ── */
.axis-item { transition: none; }
.axis-section .box-content { font-size: 10pt; }

/* ── Layer 67: 자료구조 시각화 ── */
.ds-visual { font-family: var(--font-code); font-size: 9pt; text-align: center; margin: 3mm 0; }
.ds-array { display: flex; justify-content: center; gap: 0; }
.ds-cell { width: 9mm; height: 9mm; border: 1.5px solid var(--c-blue); display: flex; align-items: center; justify-content: center; font-weight: 700; }
.ds-cell:first-child { border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
.ds-cell:last-child { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.ds-index { font-size: 7pt; color: var(--c-text-muted); text-align: center; margin-top: 0.5mm; }

/* ── Layer 68: 학습 저널 공간 ── */
.reflection-box {
  background: var(--c-bg-warm);
  border: 1.5px dashed #FCD34D;
  border-radius: var(--radius-lg);
  padding: 4mm;
  margin: 4mm 0;
}
.reflection-prompt { font-size: 10pt; color: var(--c-orange); font-weight: 700; margin-bottom: 2mm; }
.reflection-lines {
  min-height: 20mm;
  background: repeating-linear-gradient(transparent, transparent 7mm, #FEF3C7 7mm, #FEF3C7 7.5mm);
}

/* ── Layer 69: 루브릭/자기평가 ── */
.rubric-table { width: 100%; border-collapse: collapse; font-size: 9pt; margin: 3mm 0; }
.rubric-table th { background: var(--c-purple); color: white; padding: 2mm; text-align: center; }
.rubric-table td { padding: 2mm; border: 1px solid var(--c-border); text-align: center; }
.self-check { display: flex; gap: 5mm; justify-content: center; margin: 3mm 0; }
.self-check-item { text-align: center; font-size: 18pt; }
.self-check-label { font-size: 7.5pt; color: var(--c-text-secondary); }

/* ── Layer 72: 교실 게임 보드 ── */
.bingo-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--c-border); border-radius: var(--radius-md); overflow: hidden; margin: 3mm 0; }
.bingo-cell { background: white; padding: 3mm; text-align: center; font-size: 8.5pt; font-family: var(--font-code); min-height: 10mm; display: flex; align-items: center; justify-content: center; }
.bingo-free { background: var(--c-primary-light); font-weight: 800; color: var(--c-primary); }

/* ── Layer 77: 북마크/읽기 가이드 ──  */
.reading-ruler { border-top: 3px solid var(--c-primary); margin: 4mm 0; opacity: 0.3; }

/* ── Layer 78: 고급 그리드 — 2컬럼 레이아웃 ── */
.two-col { display: flex; gap: 4mm; }
.two-col > * { flex: 1; min-width: 0; }
.three-col { display: flex; gap: 3mm; }
.three-col > * { flex: 1; min-width: 0; }

/* ── Layer 80: 인쇄 품질 마커 ── */
.print-crop-mark { display: none; }

/* ═══════════════════════════════════════
   인쇄 최적화 — 강화 버전 (Layer 77~80)
   ═══════════════════════════════════════ */
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .lesson-header,
  .code-block,
  .box,
  .exercise,
  .predict-box,
  .compare-bad,
  .compare-good,
  .step-num,
  .mascot-bubble,
  .visual-summary,
  .axis-section,
  .trace-table th,
  .progress-fill,
  .code-explain-line,
  .fact-bite,
  .diff-1, .diff-2, .diff-3,
  .diagram-box,
  .modify-box,
  .answers-section {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .no-print { display: none !important; }
  /* orphan/widow 강화 */
  p { orphans: 3; widows: 3; }
  h2, h3 { break-after: avoid; }
  .avoid-break { break-inside: avoid; }
}

</style>
<article id="content">
  <header class="lesson-header" role="banner">
    <div class="lesson-number">Lesson 0-3</div>
    <h1 class="lesson-title">0과 1의 세계 (비트)</h1>
    <div class="lesson-summary">컴퓨터가 0과 1만으로 모든 것을 표현하는 원리를 알아보고, 정보 이론과 데이터 전송까지 탐구해요.</div>
  </header>
<div class="chapter-start-box avoid-break"><div class="learning-goals"><h3>📚 이번에 배울 것</h3><ul><li>비트(bit)가 무엇인지 설명할 수 있어요.</li><li>N비트로 표현할 수 있는 가짓수를 계산할 수 있어요.</li><li>바이트(byte)의 뜻과 크기를 알 수 있어요.</li><li>데이터 단위(KB, MB, GB)를 환산할 수 있어요.</li><li>[심화] 워드 크기의 역사를 이해해요.</li><li>[심화 내용] 섀넌 엔트로피와 정보 이론의 기초를 알아요.</li></ul></div><div class="prereq-check"><h3>✅ 시작 전 체크</h3><ul class="checklist"><li>U0-02 '컴퓨터는 어떻게 생겼을까?'를 읽었다</li><li>2의 곱셈을 할 수 있다 (2x2=4, 2x2x2=8)</li></ul></div><div class="progress-section"><span class="progress-label">Part 1 진행률: 3%</span><div class="progress-bar"><div class="progress-fill" style="width:3%"></div></div></div></div>
<h2>컴퓨터는 0과 1밖에 모른다</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-hello.svg" alt="마스코트" />
        <div class="mascot-bubble hello">컴퓨터 안에는 아주 작은 전기 스위치가 수십억 개 있어. 이 스위치는 '켜짐' 아니면 '꺼짐', 딱 두 가지 상태만 있어!</div>
      </div>
<p>컴퓨터는 전기로 작동해요. 전기가 흐르면 <b>1</b>(켜짐), 안 흐르면 <b>0</b>(꺼짐)이에요. 이게 전부예요. 컴퓨터가 아는 건 0과 1뿐이에요.</p>
<p>그런데 어떻게 0과 1만으로 숫자도, 글자도, 사진도, 음악도, 영상도 표현할 수 있을까요? 비밀은 <b>조합</b>에 있어요!</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/bit-switch.svg" alt="전기 스위치로 비유한 비트의 개념 — 꺼짐(0)과 켜짐(1)" style="max-width:100%"/><div class="image-caption">1비트 = 0 또는 1, 딱 두 가지</div></div>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 비트(bit)란?</span><div class="box-content"><b>비트(bit)</b> = 0 또는 1을 담는 가장 작은 단위. 'binary digit'(2진수 숫자)의 줄임말이에요. 컴퓨터의 모든 정보는 비트의 조합이에요.</div></div>
<h2>왜 하필 2진수일까?</h2>
<p>사람은 10진수(0~9)를 쓰지만, 컴퓨터는 2진수(0과 1)를 써요. 왜일까요?</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 2진수를 쓰는 이유</span><div class="box-content">전기 스위치는 <b>켜짐(1)/꺼짐(0)</b> 두 가지 상태만 확실하게 구분할 수 있어요.<br><br>만약 10단계로 나누면? '7이야 8이야?' 구분이 어려워요. 오류가 생겨요.<br>2단계면? '켜졌어 꺼졌어?' 확실해요. 안정적이에요!<br><br>그래서 컴퓨터는 가장 안정적인 2진법을 사용해요.</div></div>
<h2>비트를 늘리면?</h2>
<p>비트 1개로는 0, 1 두 가지밖에 표현 못해요. 비트를 <b>늘리면</b> 더 많은 것을 표현할 수 있어요.</p>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">비트를 1개 추가할 때마다 표현 가능한 가짓수가 <b>2배</b>로 늘어나요. 규칙이 보이나요?</div>
      </div>
<div class="trace-table avoid-break"><table><thead><tr><th>비트 수</th><th>가짓수</th><th>2의 거듭제곱</th><th>범위</th></tr></thead><tbody><tr><td>1비트</td><td>2</td><td>2¹</td><td>0~1</td></tr><tr><td>2비트</td><td>4</td><td>2²</td><td>0~3</td></tr><tr><td>3비트</td><td>8</td><td>2³</td><td>0~7</td></tr><tr><td>4비트</td><td>16</td><td>2⁴</td><td>0~15</td></tr><tr><td>5비트</td><td>32</td><td>2⁵</td><td>0~31</td></tr><tr><td>8비트</td><td>256</td><td>2⁸</td><td>0~255</td></tr><tr><td>16비트</td><td>65,536</td><td>2¹⁶</td><td>0~65,535</td></tr><tr><td>32비트</td><td>4,294,967,296</td><td>2³²</td><td>약 42억</td></tr><tr><td>64비트</td><td>약 1844경</td><td>2⁶⁴</td><td>어마어마하게 큰 수!</td></tr></tbody></table></div>
<div class="image-block avoid-break"><img src="/images/svg-assets/bit-counting.svg" alt="1비트부터 8비트까지 표현 가능한 가짓수 + 데이터 단위" style="max-width:100%"/><div class="image-caption">N비트 = 2의 N승 가지. 비트 1개 추가 = 2배!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[핵심] N비트 공식</span><div class="box-content"><b>N비트로 표현할 수 있는 가짓수 = 2<sup>N</sup></b><br><br>• 표현 가능한 범위: 0 ~ (2<sup>N</sup> - 1)<br>• 가장 큰 수 = 2<sup>N</sup> - 1 (0부터 세니까 1을 빼요)</div></div>
<h2>바이트(byte) = 8비트</h2>
<p>비트가 너무 작으니까, <b>8비트를 묶어서 1바이트(byte)</b>라고 불러요. 1바이트로 0부터 255까지, 총 256가지를 표현할 수 있어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 비트와 바이트</span><div class="box-content">1바이트(byte) = 8비트(bit)<br>1바이트로 256가지를 표현해요 (2⁸ = 256)<br><br>영어 알파벳 1글자를 저장하는 데 딱 1바이트면 충분해요.</div></div>
<h2>왜 하필 8비트?</h2>
<p>왜 7비트도 아니고 9비트도 아니고 딱 <b>8비트</b>가 1바이트일까요?</p>
<div class="box box-history avoid-break"><span class="box-label">[역사] 8비트 바이트의 탄생</span><div class="box-content">초기 컴퓨터에서는 6비트, 7비트 등 다양한 크기를 바이트로 사용했어요.<br><br>1960년대 IBM이 System/360이라는 컴퓨터를 만들면서 <b>8비트를 1바이트</b>로 표준화했어요.<br><br>이유: 8비트(256가지)면 영어 대소문자, 숫자, 기호를 충분히 담을 수 있고, 8은 2의 거듭제곱(2³)이라 회로 설계가 깔끔해요.</div></div>
<h2>데이터 크기 단위: KB, MB, GB</h2>
<p>바이트만으로는 큰 데이터를 표현하기 불편해요. 그래서 더 큰 단위를 만들었어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 데이터 크기 단위</span><div class="box-content">1킬로바이트(KB) = 약 1,000바이트<br>1메가바이트(MB) = 약 1,000KB = 약 100만 바이트<br>1기가바이트(GB) = 약 1,000MB = 약 10억 바이트<br>1테라바이트(TB) = 약 1,000GB = 약 1조 바이트<br><br>예: 사진 1장 ≈ 3MB, 노래 1곡 ≈ 5MB, 영화 1편 ≈ 2GB, 게임 1개 ≈ 50~100GB</div></div>
<h2>[심화] 1000 vs 1024 논쟁</h2>
<p>데이터 크기에서 자주 헷갈리는 부분이 있어요. 1KB가 정확히 1,000바이트일까요, 1,024바이트일까요?</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 1000 vs 1024 — 어느 게 맞아?</span><div class="box-content">컴퓨터는 2진수를 쓰니까, 원래 1KB = 2¹⁰ = <b>1,024바이트</b>로 사용했어요.<br>하지만 하드디스크 제조사들은 1KB = <b>1,000바이트</b>로 계산해서 용량을 표시했어요.<br><br>혼란을 해결하기 위해 IEC에서 새 단위를 만들었어요:<br>• <b>KB</b>(킬로바이트) = 1,000바이트 (SI 표준)<br>• <b>KiB</b>(키비바이트) = 1,024바이트 (이진 표준)<br>• <b>MB</b> = 1,000,000바이트 / <b>MiB</b> = 1,048,576바이트<br><br>그래서 '500GB' SSD를 사면 윈도우에서 약 465GB로 보여요!</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[비유] 비트와 바이트 크기 감각</span><div class="box-content"><b>1바이트</b> = 영어 글자 1개<br><b>1KB</b> = 짧은 문자 메시지<br><b>1MB</b> = 책 한 권 (텍스트만)<br><b>1GB</b> = 고화질 영화 30분<br><b>1TB</b> = 도서관 한 개 분량의 책<br><b>1PB</b> = 넷플릭스 전체 영상 라이브러리</div></div>
<h2>활동: 손가락 2진수</h2>
<p>한 손의 손가락 5개를 이용하면 0부터 31까지 셀 수 있어요. 손가락을 펴면 1, 접으면 0이에요.</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/finger-binary.svg" alt="손가락으로 2진수 세는 방법 — 엄지=1, 검지=2, 중지=4, 약지=8, 새끼=16" style="max-width:100%"/><div class="image-caption">손가락 5개 = 5비트 = 0~31까지 표현 가능!</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[활동] 직접 해 보기!</span><div class="box-content">아래 수를 손가락으로 표현해 보세요. (접으면 0, 펴면 1)<br><br>1. 숫자 7 = 엄지+검지+중지 펴기 (00111 = 1+2+4 = 7)<br>2. 숫자 10 = 검지+약지 펴기 (01010 = 2+8 = 10)<br>3. 숫자 21 = 엄지+중지+새끼 펴기 (10101 = 1+4+16 = 21)<br>4. 숫자 31은? 직접 해 봐요!</div></div>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">두 손을 쓰면 10비트! 0부터 1023까지 셀 수 있어요. 발가락까지 쓰면... 음, 그건 좀 어렵겠지만요.</div>
      </div>
<h2>모든 것은 비트의 조합</h2>
<p>비트로 숫자만 표현하는 게 아니에요. 글자, 색깔, 소리, 영상 — 전부 비트의 조합이에요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 비트로 표현하는 것들</span><div class="box-content"><b>숫자</b>: 0과 1의 조합 = 2진수 (0101 = 5)<br><b>글자</b>: 숫자와 글자를 약속해서 대응 (A = 65 = 01000001)<br><b>색깔</b>: RGB 각각 1바이트씩 = 3바이트로 1600만 가지 색<br><b>소리</b>: 공기의 진동을 숫자로 변환 (샘플링)<br><b>사진</b>: 점(픽셀)마다 색깔 정보를 저장<br><b>영상</b>: 사진을 초당 30~60장 연속 재생</div></div>
<h2>[심화] 워드(word) 크기의 역사</h2>
<p>CPU가 한 번에 처리할 수 있는 데이터의 크기를 <b>워드</b>(word)라고 해요. 워드 크기는 컴퓨터의 발전과 함께 점점 커졌어요.</p>
<div class="steps-visual avoid-break"></div>
<div class="box box-key avoid-break"><span class="box-label">[심화] 워드 크기가 중요한 이유</span><div class="box-content">워드 크기가 크면:<br>• <b>더 큰 숫자</b>를 한 번에 처리할 수 있어요<br>• <b>더 많은 메모리</b>에 접근할 수 있어요<br><br>32비트 CPU → 최대 4GB RAM만 인식 (2³² = 약 42억 바이트)<br>64비트 CPU → 이론적으로 16EB(엑사바이트)까지 인식!<br><br>그래서 RAM 4GB 이상이면 64비트 운영체제가 필요해요.</div></div>
<h2>[심화] 니블(nibble) = 4비트</h2>
<p>비트와 바이트 사이에 <b>니블</b>(nibble)이라는 단위도 있어요. 4비트 = 0.5바이트예요.</p>
<div class="box box-tip avoid-break"><span class="box-label">[심화] 니블의 활용</span><div class="box-content">4비트 = 16가지 = 0~15<br>이건 16진수 한 자릿수와 정확히 대응해요!<br><br>1바이트(8비트) = 니블 2개 = 16진수 2자리<br>예: 11111111 → FF, 10100011 → A3<br><br>그래서 16진수를 쓰면 비트를 4개씩 묶어서 읽기 편해요.</div></div>
<h2>━━━ 비트 전송 ━━━</h2>
<h2>[심화] 직렬 전송 vs 병렬 전송</h2>
<p>컴퓨터 부품 사이, 또는 컴퓨터끼리 데이터를 보내는 방법은 두 가지예요.</p>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<div class="code-explain avoid-break"></div>
<h2>[심화] 대역폭과 지연시간</h2>
<p>데이터 전송에서 중요한 두 가지 개념이 있어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 대역폭과 지연시간</span><div class="box-content"><b>대역폭</b>(Bandwidth) = 1초에 보낼 수 있는 <b>최대 데이터 양</b><br>단위: bps(bits per second) = 초당 비트 수<br>예: 100Mbps = 1초에 1억 비트<br><br><b>지연시간</b>(Latency) = 데이터가 출발해서 <b>도착하는 데 걸리는 시간</b><br>단위: ms(밀리초), μs(마이크로초)<br>예: 핑(ping) 10ms = 데이터가 0.01초 만에 도착</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[비유] 대역폭 vs 지연시간</span><div class="box-content"><b>대역폭</b> = 도로의 <b>차선 수</b> (한꺼번에 얼마나 많이)<br><b>지연시간</b> = 도로의 <b>길이</b> (얼마나 빨리 도착)<br><br>8차선 고속도로(높은 대역폭)라도 서울→부산(높은 지연시간)이면 오래 걸려요.<br>1차선 골목(낮은 대역폭)이라도 집 앞(낮은 지연시간)이면 금방 도착해요.</div></div>
<h2>인터넷 속도와 비트</h2>
<p>인터넷 속도도 비트로 표현해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 인터넷 속도 이해하기</span><div class="box-content">인터넷 속도 <b>100Mbps</b> = 1초에 1억 비트 = 약 12.5MB/초<br><br>주의! 속도는 <b>b</b>(비트)인데, 파일 크기는 <b>B</b>(바이트)예요!<br>100M<b>b</b>ps ÷ 8 = 12.5M<b>B</b>/s<br><br>그래서 100Mbps 인터넷으로 1GB 파일을 받으면:<br>1,000MB ÷ 12.5MB/s = <b>약 80초</b> 걸려요.</div></div>
<div class="box box-warning avoid-break"><span class="box-label">[주의] b와 B를 구분하자!</span><div class="box-content">소문자 <b>b</b> = bit (비트)<br>대문자 <b>B</b> = Byte (바이트) = 8비트<br><br>100Mbps = 초당 1억 <b>비트</b><br>100MBps = 초당 1억 <b>바이트</b> = 초당 8억 비트<br><br>8배 차이! 인터넷 광고에서 속이는 경우도 있으니 주의!</div></div>
<h2>━━━ 정보 이론 ━━━</h2>
<h2>[심화 내용] 정보 이론과 섀넌 엔트로피</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">이 부분은 대학교에서 배우는 내용이야! '정보'를 수학적으로 정의한 사람이 있어. 바로 클로드 섀넌!</div>
      </div>
<p>1948년, 미국의 수학자 <b>클로드 섀넌</b>(Claude Shannon)이 '정보란 무엇인가?'에 대해 수학적으로 정의했어요. 이게 <b>정보 이론</b>의 시작이에요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] 정보량이란?</span><div class="box-content">놀라운 일에는 <b>정보가 많고</b>, 당연한 일에는 <b>정보가 적어요</b>.<br><br>예시:<br>• '내일 해가 뜬다' → 당연! 정보량 거의 0<br>• '내일 눈이 3미터 온다' → 깜짝! 정보량 매우 높음<br><br>수학적으로: 확률 p인 사건의 정보량 = -log₂(p) 비트<br>• 동전 던지기 (확률 1/2): -log₂(1/2) = 1비트<br>• 주사위 눈 (확률 1/6): -log₂(1/6) ≈ 2.58비트</div></div>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] 섀넌 엔트로피</span><div class="box-content"><b>엔트로피</b>(entropy) = 정보의 <b>평균 불확실성</b><br><br>동전 던지기: 앞/뒤 확률이 반반 → 엔트로피 = 1비트 (최대 불확실성)<br>양면이 앞인 동전: 항상 앞 → 엔트로피 = 0비트 (불확실성 없음)<br><br>엔트로피가 높으면: 예측이 어려움 → 정보가 많음 → 압축이 어려움<br>엔트로피가 낮으면: 예측이 쉬움 → 정보가 적음 → 압축이 쉬움</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[심화 내용] 섀넌의 업적</span><div class="box-content">클로드 섀넌은 '정보 이론의 아버지'라고 불려요. 그의 업적:<br><br>• 정보의 기본 단위로 <b>비트</b>를 제안<br>• 데이터 압축의 한계(엔트로피)를 수학적으로 증명<br>• 오류 정정 코딩의 기초를 마련<br>• 현대 디지털 통신의 이론적 토대를 세움<br><br>인터넷, 와이파이, 5G — 모두 섀넌의 이론 위에 세워졌어요.</div></div>
<h2>[심화 내용] 데이터 압축과 엔트로피</h2>
<p>파일을 ZIP으로 압축하면 크기가 줄어들죠? 섀넌의 엔트로피는 <b>이론적으로 가능한 최소 크기</b>를 알려줘요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] 압축의 원리</span><div class="box-content">AAAAAABBBB (10글자)를 압축하면?<br>→ A6B4 (4글자) — 반복 패턴을 줄였어요!<br><br>QWXYZMPTNE (10글자)를 압축하면?<br>→ 줄일 수 없어요 — 패턴이 없으니까!<br><br>엔트로피가 낮은 데이터(반복 많음) = 잘 압축됨<br>엔트로피가 높은 데이터(랜덤) = 잘 안 압축됨</div></div>
<h2>[심화 내용] 오류 검출과 정정</h2>
<p>데이터를 전송할 때 전자기 간섭 등으로 비트가 바뀔 수 있어요. 0이 1로, 1이 0으로요. 이런 오류를 발견하고 고치는 방법이 있어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] 패리티 비트</span><div class="box-content"><b>패리티 비트</b>: 데이터 끝에 1비트를 추가해서 1의 개수를 짝수(또는 홀수)로 맞추는 방법<br><br>예 (짝수 패리티):<br>데이터 1010110 → 1의 개수 = 4개(짝수) → 패리티 비트 = 0 → 10101100<br>데이터 1010111 → 1의 개수 = 5개(홀수) → 패리티 비트 = 1 → 10101111<br><br>받는 쪽에서 1의 개수를 세서 짝수가 아니면 → 오류 발생! 재전송 요청</div></div>
<h2>[심화] 해밍 코드</h2>
<p>패리티 비트는 오류가 있는지 <b>발견</b>만 할 수 있어요. 하지만 <b>해밍 코드</b>(Hamming code)는 어디가 틀렸는지 찾아서 <b>고칠</b> 수도 있어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 해밍 코드란?</span><div class="box-content">리처드 해밍이 1950년에 발명한 오류 정정 코드.<br><br>• 데이터 비트 사이에 패리티 비트를 전략적으로 배치<br>• 오류가 발생하면 어느 비트가 틀렸는지 찾아서 자동 수정<br>• 우주 탐사선, 위성 통신, ECC 메모리(서버용 RAM)에서 사용<br>• 예: 4비트 데이터를 보내려면 3개의 패리티 비트를 추가 → 7비트 전송</div></div>
<h2>비트와 색깔</h2>
<p>컴퓨터 화면의 색깔도 비트로 표현해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 색깔과 비트</span><div class="box-content">모니터의 각 점(픽셀)은 <b>빨강(R), 초록(G), 파랑(B)</b> 세 가지 빛을 섞어서 색을 만들어요.<br><br>• R, G, B 각각 1바이트(8비트) = 0~255 단계<br>• 1픽셀 = 3바이트 = 24비트<br>• 24비트로 표현 가능한 색 = 2²⁴ = <b>16,777,216가지</b> (약 1600만 색)<br><br>예: (255, 0, 0) = 빨강, (0, 255, 0) = 초록, (0, 0, 255) = 파랑<br>(255, 255, 255) = 흰색, (0, 0, 0) = 검정</div></div>
<h2>비트와 소리</h2>
<p>소리도 비트로 저장해요. 소리는 공기의 <b>진동</b>이에요. 이 진동을 일정 간격으로 측정(샘플링)해서 숫자로 바꿔요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 소리의 디지털화</span><div class="box-content"><b>샘플링 레이트</b>: 1초에 몇 번 측정하는지<br>• CD 음질: 44,100Hz (1초에 44,100번 측정)<br>• 전화: 8,000Hz<br><br><b>비트 깊이</b>: 한 번 측정할 때 몇 비트로 기록하는지<br>• CD 음질: 16비트 (65,536단계의 세밀함)<br>• 고음질: 24비트 (16,777,216단계)<br><br>CD 1초 = 44,100 × 16 × 2(스테레오) = 1,411,200비트 ≈ 176KB</div></div>
<h2>[심화] 부동소수점 — 비트로 소수 표현하기</h2>
<p>정수(1, 2, 3)는 비트로 쉽게 표현할 수 있어요. 하지만 소수(3.14, 0.001)는 어떻게 표현할까요?</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 부동소수점이란?</span><div class="box-content">소수를 비트로 표현하는 방법 = <b>부동소수점</b>(floating point)<br><br>32비트(float)의 구조:<br>• 부호 1비트: 양수(0) / 음수(1)<br>• 지수 8비트: 소수점 위치<br>• 가수 23비트: 실제 숫자<br><br>과학적 표기법과 비슷해요: 3.14 = 3.14 × 10⁰<br><br>⚠ 주의: 0.1 + 0.2 = 0.30000000000000004 같은 오차가 생길 수 있어요! (나중에 C언어에서 직접 확인해요)</div></div>
<h2>[심화] 엔디안 — 바이트 순서</h2>
<p>숫자 0x12345678을 메모리에 저장할 때, 앞(12)부터 저장할까요 뒤(78)부터 저장할까요?</p>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<h2>비트의 실생활 응용</h2>
<div class="box box-history avoid-break"><span class="box-label">[실생활] QR코드와 비트</span><div class="box-content">QR코드의 검은 점 = 1, 흰 점 = 0이에요. QR코드를 스캔하면 0과 1의 패턴을 읽어서 웹사이트 주소, 연락처 등으로 변환해요. 오류 정정 기능도 내장되어 있어서 일부가 가려져도 읽을 수 있어요!</div></div>
<div class="box box-history avoid-break"><span class="box-label">[실생활] 바코드와 비트</span><div class="box-content">마트의 바코드도 비트 원리를 써요. 검은 줄 = 1, 흰 줄 = 0으로, 상품 번호를 2진수로 저장해요. 바코드 스캐너가 빛을 쏘아 반사되는 패턴을 읽어요.</div></div>
<h2>[심화] 비트 연산 미리보기</h2>
<p>C언어에서는 비트를 직접 조작하는 <b>비트 연산</b>을 할 수 있어요. 나중에 자세히 배우겠지만 미리 살짝 볼까요?</p>
<div class="box box-tip avoid-break"><span class="box-label">[심화] 비트 연산의 종류</span><div class="box-content"><b>AND (&)</b>: 둘 다 1이면 1 → 1010 & 1100 = 1000<br><b>OR (|)</b>: 하나라도 1이면 1 → 1010 | 1100 = 1110<br><b>XOR (^)</b>: 서로 다르면 1 → 1010 ^ 1100 = 0110<br><b>NOT (~)</b>: 0→1, 1→0 뒤집기 → ~1010 = 0101<br><b>시프트 (<<, >>)</b>: 비트를 왼쪽/오른쪽으로 밀기<br><br>이런 연산이 게임 개발, 암호화, 네트워크에서 많이 쓰여요!</div></div>
<h2>[심화 내용] 정보량과 일상</h2>
<p>정보 이론을 일상에서 느껴볼까요?</p>
<div class="box box-tip avoid-break"><span class="box-label">[심화 내용] 20가지 질문 게임과 정보 이론</span><div class="box-content">친구가 1~100 사이 숫자를 하나 생각했어요. '예/아니오'로만 대답해요.<br><br>최적 전략: '50보다 커?' → '75보다 커?' → ...<br>매번 가능한 답을 절반으로 줄이면 → log₂(100) ≈ 7번 만에 찾을 수 있어요!<br><br>이것이 <b>이진 탐색</b>의 원리이고, 정보 이론의 실체예요.<br>100가지 중 하나를 특정하는 데 필요한 정보량 = log₂(100) ≈ 6.64비트</div></div>
<h2>디지털 vs 아날로그</h2>
<p>비트로 세상을 표현하는 방식을 <b>디지털</b>(digital)이라고 해요. 반대로 연속적인 값을 그대로 사용하는 방식은 <b>아날로그</b>(analog)예요.</p>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<p>우리가 사는 세상은 아날로그이지만, 컴퓨터는 디지털이에요. 마이크가 아날로그 소리를 디지털 신호로 바꿔주고(ADC), 스피커가 디지털 신호를 아날로그 소리로 바꿔줘요(DAC).</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] ADC와 DAC</span><div class="box-content"><b>ADC</b>(Analog-to-Digital Converter): 아날로그 → 디지털 변환<br>예: 마이크가 목소리를 0과 1로 변환<br><br><b>DAC</b>(Digital-to-Analog Converter): 디지털 → 아날로그 변환<br>예: 스피커가 0과 1을 소리로 변환<br><br>스마트폰 안에도 ADC와 DAC가 들어있어요!</div></div>
<h2>C언어와 비트의 연결</h2>
<div class="box box-tip avoid-break"><span class="box-label">[C 연결 미리보기] 비트와 자료형</span><div class="box-content">C언어에서 <code>char</code> = 1바이트(8비트) = 영어 글자 1개 저장 (256가지)<br>C언어에서 <code>int</code> = 4바이트(32비트) = 큰 숫자 저장 (약 42억 가지)<br>C언어에서 <code>long long</code> = 8바이트(64비트) = 매우 큰 숫자 저장<br><br>비트가 많을수록 더 큰 숫자, 더 많은 종류를 저장할 수 있어요.</div></div>
<div class="box box-key avoid-break"><span class="box-label">[C 연결] sizeof 연산자</span><div class="box-content">C언어에서 자료형의 크기(바이트 수)를 확인하는 연산자:<br><br><code>sizeof(char)</code> = 1 (항상 1바이트)<br><code>sizeof(int)</code> = 4 (보통 4바이트)<br><code>sizeof(double)</code> = 8 (8바이트)<br><br>이건 Part 1에서 직접 확인해 볼 거예요!</div></div>
<h2>━━━ 연습문제 ━━━</h2>
<h2>연습문제</h2>
<div class="exercise avoid-break"><div class="exercise-title">문제 1 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>비트(bit)란 무엇인가요? 한 문장으로 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 2 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>1바이트는 몇 비트인가요? 1바이트로 몇 가지를 표현할 수 있나요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 3 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>다음 단위를 큰 순서대로 나열하세요: MB, KB, TB, GB, byte</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 4 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>인터넷 속도에서 소문자 b(비트)와 대문자 B(바이트)의 차이는 몇 배인가요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 5 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>컴퓨터가 2진수(0과 1)를 쓰는 이유를 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 6 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>4비트로 표현할 수 있는 가짓수는 몇 가지인가요? 가능한 조합을 0000부터 1111까지 전부 나열해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 7 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>손가락 2진수로 숫자 19를 표현하려면 어떤 손가락을 펴야 하나요? (엄지=1, 검지=2, 중지=4, 약지=8, 새끼=16)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 8 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>100Mbps 인터넷으로 500MB 파일을 다운로드하면 약 몇 초 걸리나요? (계산 과정을 적으세요)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 9 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>32비트 CPU가 최대 4GB RAM만 인식할 수 있는 이유를 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 10 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>직렬 전송과 병렬 전송의 차이를 일상 비유를 들어 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 11 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화] 10비트로 표현할 수 있는 가장 큰 수는 얼마인가요? 계산 과정을 적으세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 12 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화] 1KB = 1,000바이트와 1KB = 1,024바이트, 두 해석이 있는 이유를 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 13 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화] 대역폭과 지연시간의 차이를 자기 말로 설명하고, 게임할 때 어느 것이 더 중요한지 이유를 적어 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 14 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화 내용] 동전 던지기에서 앞면(확률 1/2)의 정보량은 몇 비트인가요? 주사위 눈(확률 1/6)의 정보량은 약 몇 비트인가요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 15 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[심화 내용] '엔트로피가 낮은 데이터는 압축이 잘 된다'는 말의 의미를 예시를 들어 설명해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>정답</h2>
<div class="answers-section avoid-break"><h3>정답</h3><div class="answer-item"><span class="answer-num">문제 1</span> <span class="answer-text">비트(bit)는 0 또는 1을 담는 컴퓨터 정보의 가장 작은 단위예요.</span></div><div class="answer-item"><span class="answer-num">문제 2</span> <span class="answer-text">1바이트 = 8비트. 1바이트로 256가지(2의 8승)를 표현할 수 있어요.</span></div><div class="answer-item"><span class="answer-num">문제 3</span> <span class="answer-text">TB > GB > MB > KB > byte</span></div><div class="answer-item"><span class="answer-num">문제 4</span> <span class="answer-text">8배. 1바이트(B) = 8비트(b). 100MBps는 100Mbps의 8배예요.</span></div><div class="answer-item"><span class="answer-num">문제 5</span> <span class="answer-text">전기 스위치가 켜짐(1)/꺼짐(0) 두 가지만 확실히 구분할 수 있어서. 10단계보다 2단계가 안정적이에요.</span></div><div class="answer-item"><span class="answer-num">문제 6</span> <span class="answer-text">4비트 = 16가지(2의 4승). 0000, 0001, 0010, 0011, 0100, 0101, 0110, 0111, 1000, 1001, 1010, 1011, 1100, 1101, 1110, 1111</span></div><div class="answer-item"><span class="answer-num">문제 7</span> <span class="answer-text">19 = 16 + 2 + 1 → 새끼손가락(16) + 검지(2) + 엄지(1) 펴기. 2진수로 10011이에요.</span></div><div class="answer-item"><span class="answer-num">문제 8</span> <span class="answer-text">100Mbps = 12.5MB/s (100÷8). 500MB ÷ 12.5MB/s = 40초. 약 40초 걸려요.</span></div><div class="answer-item"><span class="answer-num">문제 9</span> <span class="answer-text">32비트 주소로 표현할 수 있는 최대 주소 수 = 2³² = 4,294,967,296 ≈ 4GB. 주소가 4GB까지밖에 안 되니까 그 이상의 RAM을 인식할 수 없어요.</span></div><div class="answer-item"><span class="answer-num">문제 10</span> <span class="answer-text">직렬: 1차선 도로에 차가 한 줄로 빠르게 달림. 병렬: 8차선 도로에 차가 나란히 달림. 고속에서는 직렬이 더 안정적이에요.</span></div><div class="answer-item"><span class="answer-num">문제 11</span> <span class="answer-text">2¹⁰ = 1024. 0부터 세니까 가장 큰 수는 1024 - 1 = 1023이에요.</span></div><div class="answer-item"><span class="answer-num">문제 12</span> <span class="answer-text">컴퓨터는 2진수를 쓰니까 2¹⁰ = 1024가 자연스럽지만, 일상에서는 10³ = 1000이 편해요. 하드디스크 업체는 1000을 쓰고, OS는 1024를 써서 혼란이 생겼어요. IEC에서 KiB(1024) vs KB(1000)로 구분하는 표준을 만들었어요.</span></div><div class="answer-item"><span class="answer-num">문제 13</span> <span class="answer-text">대역폭 = 한꺼번에 보낼 수 있는 최대 데이터양 (차선 수). 지연시간 = 데이터가 도착하는 데 걸리는 시간 (거리). 게임에서는 지연시간(핑)이 더 중요해요. 총을 쏘는 순간 바로 반영되어야 하니까 지연이 적어야 해요.</span></div><div class="answer-item"><span class="answer-num">문제 14</span> <span class="answer-text">동전 앞면: -log₂(1/2) = log₂(2) = 1비트. 주사위 눈: -log₂(1/6) = log₂(6) ≈ 2.58비트.</span></div><div class="answer-item"><span class="answer-num">문제 15</span> <span class="answer-text">엔트로피가 낮다 = 반복 패턴이 많다 = 예측하기 쉽다 = 줄여 쓸 수 있다. 예: AAAAAABBBB(엔트로피 낮음)는 A6B4로 압축 가능하지만, QWXYZ(엔트로피 높음)는 줄일 수 없어요.</span></div></div>
<h2>용어 정리</h2>
<div class="glossary avoid-break"><div class="glossary-item"><dt class="glossary-term">비트(bit)</dt><dd class="glossary-def">0 또는 1을 담는 가장 작은 정보 단위. binary digit의 줄임말.</dd></div><div class="glossary-item"><dt class="glossary-term">바이트(byte)</dt><dd class="glossary-def">8비트를 묶은 단위. 1바이트로 256가지를 표현할 수 있어요.</dd></div><div class="glossary-item"><dt class="glossary-term">니블(nibble)</dt><dd class="glossary-def">4비트를 묶은 단위. 16진수 한 자릿수와 대응.</dd></div><div class="glossary-item"><dt class="glossary-term">워드(word)</dt><dd class="glossary-def">CPU가 한 번에 처리하는 데이터 크기. 현대 PC는 64비트.</dd></div><div class="glossary-item"><dt class="glossary-term">2진수</dt><dd class="glossary-def">0과 1만 사용하는 수 체계. 컴퓨터가 사용하는 수예요.</dd></div><div class="glossary-item"><dt class="glossary-term">10진수</dt><dd class="glossary-def">0부터 9까지 10개 숫자를 사용하는 수 체계. 우리가 일상에서 쓰는 수예요.</dd></div><div class="glossary-item"><dt class="glossary-term">KB (킬로바이트)</dt><dd class="glossary-def">약 1,000바이트. (엄밀히 KiB = 1,024바이트)</dd></div><div class="glossary-item"><dt class="glossary-term">MB (메가바이트)</dt><dd class="glossary-def">약 1,000KB = 약 100만 바이트.</dd></div><div class="glossary-item"><dt class="glossary-term">GB (기가바이트)</dt><dd class="glossary-def">약 1,000MB = 약 10억 바이트.</dd></div><div class="glossary-item"><dt class="glossary-term">TB (테라바이트)</dt><dd class="glossary-def">약 1,000GB = 약 1조 바이트.</dd></div><div class="glossary-item"><dt class="glossary-term">대역폭</dt><dd class="glossary-def">1초에 보낼 수 있는 최대 데이터양. 단위: bps(초당 비트 수).</dd></div><div class="glossary-item"><dt class="glossary-term">지연시간</dt><dd class="glossary-def">데이터가 출발해서 도착하는 데 걸리는 시간. 단위: ms.</dd></div><div class="glossary-item"><dt class="glossary-term">직렬 전송</dt><dd class="glossary-def">비트를 하나씩 순서대로 보내는 방식. USB, SATA 등.</dd></div><div class="glossary-item"><dt class="glossary-term">병렬 전송</dt><dd class="glossary-def">여러 비트를 동시에 나란히 보내는 방식. 옛날 프린터 케이블 등.</dd></div><div class="glossary-item"><dt class="glossary-term">엔트로피</dt><dd class="glossary-def">정보의 평균 불확실성. 높을수록 정보가 많고 압축이 어려움.</dd></div><div class="glossary-item"><dt class="glossary-term">패리티 비트</dt><dd class="glossary-def">오류 검출을 위해 데이터에 추가하는 1비트.</dd></div><div class="glossary-item"><dt class="glossary-term">클로드 섀넌</dt><dd class="glossary-def">정보 이론의 아버지. 비트의 개념을 수학적으로 정의한 사람.</dd></div><div class="glossary-item"><dt class="glossary-term">bps</dt><dd class="glossary-def">bits per second. 초당 전송 비트 수. 통신 속도의 단위.</dd></div></div>
<div class="visual-summary avoid-break"><div class="visual-summary-title">이번 유닛 핵심 정리</div><div class="visual-summary-items"><div class="visual-summary-item"><div class="visual-summary-num">1</div><span>비트(bit)는 0 또는 1, 컴퓨터 정보의 가장 작은 단위예요</span></div><div class="visual-summary-item"><div class="visual-summary-num">2</div><span>N비트 = 2의 N승 가지를 표현할 수 있어요 (비트 1개 추가 = 2배)</span></div><div class="visual-summary-item"><div class="visual-summary-num">3</div><span>8비트 = 1바이트. 1바이트로 256가지를 표현해요</span></div><div class="visual-summary-item"><div class="visual-summary-num">4</div><span>KB < MB < GB < TB (각각 약 1,000배)</span></div><div class="visual-summary-item"><div class="visual-summary-num">5</div><span>[심화] 워드 크기: 4→8→16→32→64비트로 발전</span></div><div class="visual-summary-item"><div class="visual-summary-num">6</div><span>[심화] 대역폭 = 전송 용량, 지연시간 = 전송 시간</span></div><div class="visual-summary-item"><div class="visual-summary-num">7</div><span>[심화 내용] 섀넌 엔트로피 = 정보의 불확실성 척도</span></div></div></div>
<h2>━━━ 10축 심화 학습 ━━━</h2>
<h2>[KOI] 비트/바이트 관련 실전 기출 유형</h2>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 1] N비트 계산</span><div class="box-content"><b>문제:</b> 12비트로 표현할 수 있는 서로 다른 정수는 최대 몇 개인가요? 가장 큰 수는 무엇인가요?<br><br><b>정답:</b> 4,096개 (0~4,095)<br><br><b>풀이:</b><br>• 2¹² = 4,096가지<br>• 0부터 세니까 가장 큰 수 = 4,096 - 1 = <b>4,095</b><br>• 공식: N비트 → 가짓수 = 2ᴺ, 최대값 = 2ᴺ - 1</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 2] 데이터 단위 환산</span><div class="box-content"><b>문제:</b> 3GB 영화 파일을 100Mbps 인터넷으로 다운로드하면 약 몇 초가 걸리나요?<br><br><b>정답:</b> 약 240초 (4분)<br><br><b>풀이:</b><br>• 3GB = 3,000MB<br>• 100Mbps = 100백만 비트/초 = 12.5MB/초 (÷8)<br>• 3,000MB ÷ 12.5MB/초 = <b>240초</b><br>• 함정: Mbps의 b는 비트! 바이트로 바꾸려면 ÷8</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 3] 패리티 비트</span><div class="box-content"><b>문제:</b> 짝수 패리티를 사용하여 데이터 1011010을 전송하려고 합니다. 패리티 비트는 무엇인가요?<br><br><b>정답:</b> 패리티 비트 = 0<br><br><b>풀이:</b><br>• 데이터 1011010에서 1의 개수 = 4개 (짝수)<br>• 짝수 패리티는 1의 총 개수가 짝수여야 함<br>• 이미 짝수이므로 패리티 비트 = <b>0</b><br>• 전송: 1011010<b>0</b> (1의 개수 = 4, 짝수 유지)<br>• 만약 1비트가 바뀌면? → 1의 개수가 홀수가 되어 오류 발견!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 4] 워드 크기와 RAM</span><div class="box-content"><b>문제:</b> 32비트 CPU는 최대 4GB RAM만 인식합니다. 64비트 CPU는 이론적으로 최대 몇 바이트의 RAM을 인식할 수 있나요?<br><br><b>정답:</b> 2⁶⁴ 바이트 ≈ 16EB(엑사바이트)<br><br><b>풀이:</b><br>• 32비트: 2³² = 4,294,967,296 바이트 ≈ <b>4GB</b><br>• 64비트: 2⁶⁴ = 18,446,744,073,709,551,616 바이트 ≈ <b>16EB</b><br>• 16EB = 16,384PB = 16,777,216TB!<br>• 현재 기술로는 이만큼 RAM을 만들 수 없어요!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 5] RGB 색상 계산</span><div class="box-content"><b>문제:</b> 1920×1080 해상도 사진 1장이 차지하는 용량(RGB, 24비트)을 MB 단위로 계산하세요.<br><br><b>정답:</b> 약 5.93MB<br><br><b>풀이:</b><br>• 넘셀 수 = 1920 × 1080 = 2,073,600개<br>• 1픽셀 = 3바이트 (R, G, B 각 1바이트)<br>• 총 용량 = 2,073,600 × 3 = <b>6,220,800바이트</b><br>• 6,220,800 ÷ 1,048,576 ≈ <b>5.93MB</b><br>• 실제 JPEG는 압축되어서 0.5~3MB 정도!</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 16 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[KOI] 홍수 패리티를 사용하여 데이터 1100101을 전송하려고 합니다.
(1) 1의 개수를 세세요
(2) 패리티 비트는 0인가요 1인가요?
(3) 전송 중 5번째 비트가 0에서 1로 바뀌면 받는 쪽에서 오류를 발견할 수 있나요? 이유를 적으세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[디버깅] 오버플로우 — 비트가 모자라면?</h2>
<p>비트 수가 정해져 있으면, 표현할 수 있는 범위도 정해져 있어요. 이 범위를 넘으면 <b>오버플로우</b>(넘침)가 생겼요!</p>
<div class="box box-warning avoid-break"><span class="box-label">[디버깅] 정수 오버플로우 예시</span><div class="box-content">C언어에서 <code>unsigned char</code> = 8비트 = 0~255 범위<br><br>만약 255에서 1을 더하면?<br><code>11111111 + 1 = 100000000</code> (9비트!)<br>하지만 8비트만 저장 가능하니까 → <code>00000000</code> = <b>0</b>으로 돌아감!<br><br>255 → 0 → 1 → 2 ... 다시 도는 것 처럼 보여요.<br><br><b>실제 사고:</b><br>• 999만 km 차량 계기판이 000000으로 리셋 (자릿수 초과)<br>• 2038년 문제: 32비트 유닉스 시간이 2038년 1월 19일에 오버플로우!<br>• 아리안5 로켓 폭발(1996년): 64비트 수를 16비트에 넣어서 오버플로우 → 로켓 폭발</div></div>
<div class="code-block avoid-break"><div class="code-block-header">[디버깅] 오버플로우 직접 확인 (Part 2 미리보기)</div>
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span></td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code"><span class="pp">#include</span> <span class="str">&lt;limits.h&gt;</span>  <span class="cmt">// INT_MAX, CHAR_MAX 등</span></td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code"><span class="type">int</span> <span class="fn">main</span>(<span class="type">void</span>) {</td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code">    <span class="type">unsigned</span> <span class="type">char</span> c = <span class="num">255</span>;</td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"c = <span class="fmt">%d</span><span class="esc">\\n</span>"</span>, c);    <span class="cmt">// 255</span></td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code">    c = c + <span class="num">1</span>;                   <span class="cmt">// 오버플로우!</span></td></tr>
<tr class=""><td class="line-num">8</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"c + 1 = <span class="fmt">%d</span><span class="esc">\\n</span>"</span>, c); <span class="cmt">// 0! (넘침)</span></td></tr>
<tr class=""><td class="line-num">9</td><td class="line-code">    </td></tr>
<tr class=""><td class="line-num">10</td><td class="line-code">    <span class="type">int</span> x = INT_MAX;  <span class="cmt">// 32비트 최대: 2,147,483,647</span></td></tr>
<tr class=""><td class="line-num">11</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"INT_MAX = <span class="fmt">%d</span><span class="esc">\\n</span>"</span>, x);</td></tr>
<tr class=""><td class="line-num">12</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"INT_MAX + 1 = <span class="fmt">%d</span><span class="esc">\\n</span>"</span>, x + <span class="num">1</span>); <span class="cmt">// 음수가 됨!</span></td></tr>
<tr class=""><td class="line-num">13</td><td class="line-code">    <span class="kw">return</span> <span class="num">0</span>;</td></tr>
<tr class=""><td class="line-num">14</td><td class="line-code">}</td></tr></table></div>
<!-- unknown type: output-block -->
<h2>[컴퓨팅사고력] 패턴 인식 — 2의 거듭제곱</h2>
<p>N비트 = 2ᴺ 가지라는 규칙을 발견했어요. 이처럼 <b>규칙(패턴)을 찾는 것</b>이 컴퓨팅사고력의 <b>패턴 인식</b>이에요.</p>
<div class="box box-tip avoid-break"><span class="box-label">[컴퓨팅사고력] 2의 거듭제곱 패턴</span><div class="box-content">2의 거듭제곱은 컴퓨터 과학에서 계속 나와요:<br><br>• 비트 수: 1, 2, 4, 8, 16, 32, 64...<br>• 바이트 단위: 1B, 1KB(2¹⁰), 1MB(2²⁰), 1GB(2³⁰)...<br>• RGB 색상: 2²⁴ = 약 1600만 색<br>• 이진 탐색: N개 중 하나를 찾는 데 log₂(N)번 필요<br><br><b>암기할 2의 거듭제곱:</b> 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024<br>이 수들을 외워두면 컴퓨터 과학 공부가 훨씬 쉬워져요!</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 17 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[컴퓨팅사고력] 다음 패턴을 찾으세요:
(1) 1, 2, 4, 8, ?, ?, ? (다음 3개는?)
(2) 8비트=256, 16비트=65536이면, 24비트=? (RGB 색상 수)
(3) 1000명 중 한 명을 찾는 데 예/아니오 질문은 최소 몇 번 필요한가요? (힌트: log₂(1000) ≈ ?)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[C언어] 비트 연산 코드 미리보기</h2>
<div class="code-block avoid-break"><div class="code-block-header">비트 연산으로 2의 거듭제곱 계산 (Part 3 미리보기)</div>
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span></td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code"><span class="type">int</span> <span class="fn">main</span>(<span class="type">void</span>) {</td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code">    <span class="cmt">// 왼쪽 시프트 = ×2</span></td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code">    <span class="type">int</span> a = <span class="num">1</span>;</td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"<span class="fmt">%d</span><span class="esc">\\n</span>"</span>, a);       <span class="cmt">// 1</span></td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"<span class="fmt">%d</span><span class="esc">\\n</span>"</span>, a &lt;&lt; <span class="num">1</span>); <span class="cmt">// 2  (1을 왼쪽으로 1칸 밀기)</span></td></tr>
<tr class=""><td class="line-num">8</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"<span class="fmt">%d</span><span class="esc">\\n</span>"</span>, a &lt;&lt; <span class="num">2</span>); <span class="cmt">// 4  (1을 왼쪽으로 2칸 밀기)</span></td></tr>
<tr class=""><td class="line-num">9</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"<span class="fmt">%d</span><span class="esc">\\n</span>"</span>, a &lt;&lt; <span class="num">3</span>); <span class="cmt">// 8  (1을 왼쪽으로 3칸 밀기)</span></td></tr>
<tr class=""><td class="line-num">10</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"<span class="fmt">%d</span><span class="esc">\\n</span>"</span>, a &lt;&lt; <span class="num">10</span>); <span class="cmt">// 1024 = 1KB!</span></td></tr>
<tr class=""><td class="line-num">11</td><td class="line-code">    </td></tr>
<tr class=""><td class="line-num">12</td><td class="line-code">    <span class="cmt">// AND 연산으로 홈수/짝수 판단</span></td></tr>
<tr class=""><td class="line-num">13</td><td class="line-code">    <span class="type">int</span> n = <span class="num">7</span>;</td></tr>
<tr class=""><td class="line-num">14</td><td class="line-code">    <span class="kw">if</span> (n &amp; <span class="num">1</span>) {  <span class="cmt">// 마지막 비트가 1이면 홈수</span></td></tr>
<tr class=""><td class="line-num">15</td><td class="line-code">        <span class="fn">printf</span>(<span class="str">"<span class="fmt">%d</span>는 홈수<span class="esc">\\n</span>"</span>, n);</td></tr>
<tr class=""><td class="line-num">16</td><td class="line-code">    }</td></tr>
<tr class=""><td class="line-num">17</td><td class="line-code">    <span class="kw">return</span> <span class="num">0</span>;</td></tr>
<tr class=""><td class="line-num">18</td><td class="line-code">}</td></tr></table></div>
<!-- unknown type: output-block -->
<div class="exercise avoid-break"><div class="exercise-title">문제 18 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[C+비트] 1 << 20은 얼마인가요? 이것이 MB와 어떤 관계가 있나요? (1MB = 1,048,576바이트 = 2²⁰바이트)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[실생활] 내 데이터는 몇 비트?</h2>
<div class="box box-history avoid-break"><span class="box-label">[실생활] 일상 데이터의 비트 계산</span><div class="box-content"><b>문자 메시지 '안녕하세요':</b><br>• 한글 1글자 = 2~3바이트 (UTF-8), 5글자 ≈ 15바이트 = <b>120비트</b><br><br><b>MP3 노래 1곡 (3분):</b><br>• 320kbps × 180초 = 57,600,000비트 = <b>약 6.9MB</b><br><br><b>유튜브 영상 1시간 (1080p):</b><br>• 압축 후 약 3~5Mbps × 3600초 = <b>약 1.5~2.2GB</b><br><br><b>스마트폰 사진 1장 (12MP):</b><br>• 4000×3000 픽셀 × 3바이트 = 36MB (비압축)<br>• JPEG 압축 후 ≈ <b>약 3~5MB</b></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 19 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[실생활] 4K 영상(3840×2160)의 1프레임이 차지하는 용량을 MB 단위로 계산하세요. (RGB 24비트 기준, 1MB = 1,048,576바이트)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="box box-summary avoid-break"><span class="box-label">이 유닛에서 깊이 배운 10축</span><div class="box-content"><b>[KOI]</b> N비트 계산(2ᴺ), 데이터 단위 환산(Mbps→MB/s), 패리티 비트 계산, 워드크기와 RAM, RGB 사진 용량. 실전 문제 5개+풀이<br><b>[디버깅]</b> 정수 오버플로우(255+1=0). C코드로 직접 확인. 아리안5/2038년 실제 사고<br><b>[컴퓨팅사고력]</b> 패턴 인식 — 2의 거듭제곱 규칙 발견. 이진 탐색의 원리(log₂)<br><b>[C언어]</b> 비트 시프트(<< = ×2), AND 연산으로 홈수/짝수 판단. 오버플로우 코드 예시<br><b>[코딩기초]</b> char/int/long long의 비트 수와 표현 범위. sizeof 연산자<br><b>[실생활]</b> 문자/음악/영상/사진의 비트 계산. QR코드/바코드의 비트 원리<br><b>[하드웨어]</b> 워드 크기 발전(4→64비트). 직렬 vs 병렬 전송. 대역폭/지연시간<br><b>[타과목]</b> 수학 — 2의 거듭제곱, 로그. 물리 — 전기 신호. 정보이론 — 셀놌 엔트로피</div></div>
<div class="box box-question avoid-break"><span class="box-label">[다음 유닛 미리보기]</span><div class="box-content">0과 1로만 이루어진 2진수를 우리가 쓰는 10진수로 바꾸려면 어떻게 해야 할까요? 반대로 10진수를 2진수로 바꾸는 방법은? 다음 유닛에서 직접 변환해 볼 거예요!</div></div>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-hello.svg" alt="마스코트" />
        <div class="mascot-bubble celebrate">0과 1의 세계를 깊이 탐험했어요! 비트와 바이트의 기본부터 정보 이론과 데이터 전송까지! 다음에는 2진수와 10진수를 바꾸는 법을 배워요!</div>
      </div>
</article>`,
            },
        ],
    },
    {
        id: 'cb-u04',
        unitNumber: 4,
        title: `2진수와 10진수 변환`,
        type: '이론' as const,
        problems: [],
        pages: [
            {
                id: 'cb-u04-p1',
                title: `2진수와 10진수 변환`,
                type: '페이지' as const,
                content: `<style>
/* ═══════════════════════════════════════════════════════════════
   코딩쏙 프리미엄 PDF 교재 스타일시트 v5.0
   Paged.js + A4 인쇄 최적화 + 아동교육 디자인 시스템
   ═══════════════════════════════════════════════════════════════ */

/* ── 리셋 & 기본 ── */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --c-primary: #FF6B6B;
  --c-primary-light: #FFE8E8;
  --c-primary-dark: #E84545;
  --c-accent: #4ECDC4;
  --c-accent-light: #E8FFF9;
  --c-blue: #3B82F6;
  --c-blue-light: #EFF6FF;
  --c-purple: #8B5CF6;
  --c-purple-light: #F5F3FF;
  --c-orange: #F59E0B;
  --c-orange-light: #FFFBEB;
  --c-green: #10B981;
  --c-green-light: #ECFDF5;
  --c-red: #EF4444;
  --c-red-light: #FEF2F2;
  --c-teal: #14B8A6;
  --c-teal-light: #F0FDFA;
  --c-pink: #EC4899;
  --c-text: #1E293B;
  --c-text-secondary: #64748B;
  --c-text-muted: #94A3B8;
  --c-border: #E2E8F0;
  --c-bg-subtle: #F8FAFC;
  --c-bg-warm: #FFFBF5;
  --font-body: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-code: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.10);
}

/* ── 페이지 설정 ── */
@page {
  size: A4;
  margin: 18mm 17mm 15mm 22mm;
  @bottom-center {
    content: counter(page);
    font-family: var(--font-body);
    font-size: 9pt;
    color: var(--c-text-muted);
    letter-spacing: 1px;
  }
}
@page :first { @bottom-center { content: none; } }

body {
  font-family: var(--font-body);
  color: var(--c-text);
  background: white;
  font-size: 11.5pt;
  line-height: 180%;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ── 페이지 제어 ── */
.avoid-break { break-inside: avoid !important; page-break-inside: avoid !important; }
h2, h3 { break-after: avoid !important; page-break-after: avoid !important; }
.page-break-hint { break-before: page !important; page-break-before: always !important; height: 0; margin: 0; padding: 0; }
p { orphans: 3; widows: 3; }

/* ═══════════════════════════════════════
   레슨 헤더 — 프리미엄 그래디언트 배너
   ═══════════════════════════════════════ */
.lesson-header {
  margin-bottom: 6mm;
  padding: 6mm 5mm 5mm;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FEC89A 100%);
  border-radius: var(--radius-xl);
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.lesson-header::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -10%;
  width: 140px;
  height: 140px;
  background: rgba(255,255,255,0.12);
  border-radius: 50%;
}
.lesson-header::after {
  content: '';
  position: absolute;
  bottom: -20%;
  left: 15%;
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
}
.lesson-number {
  font-size: 10pt;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin-bottom: 2mm;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}
.lesson-title {
  font-size: 24pt;
  font-weight: 900;
  line-height: 125%;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.15);
  position: relative;
  z-index: 1;
}
.lesson-summary {
  font-size: 11pt;
  color: rgba(255,255,255,0.9);
  margin-top: 2.5mm;
  font-weight: 400;
  position: relative;
  z-index: 1;
}

/* ═══════════════════════════════════════
   제목 계층 — 프리미엄 타이포그래피
   ═══════════════════════════════════════ */
h2 {
  font-size: 16pt;
  font-weight: 800;
  margin: 6mm 0 3mm;
  padding: 2mm 0 2mm 4.5mm;
  border-left: 4.5px solid var(--c-primary);
  color: var(--c-text);
  background: linear-gradient(90deg, var(--c-primary-light) 0%, transparent 60%);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  letter-spacing: -0.3px;
}
h3 {
  font-size: 13.5pt;
  font-weight: 700;
  color: #334155;
  margin: 4mm 0 2.5mm;
  padding-bottom: 1mm;
  border-bottom: 2px solid #F1F5F9;
}
p {
  margin-bottom: 2.5mm;
  text-align: justify;
  line-height: 175%;
  font-size: 11.5pt;
}

/* ── 인라인 코드 ── */
code {
  font-family: var(--font-code);
  font-size: 9.5pt;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  padding: 0.5mm 2mm;
  border-radius: 4px;
  color: #92400E;
  border: 1px solid #FCD34D;
  font-weight: 500;
}

/* ═══════════════════════════════════════
   코드 블록 — 프리미엄 IDE 스타일
   ═══════════════════════════════════════ */
.code-block {
  background: #0F172A;
  border-radius: var(--radius-md);
  padding: 0;
  margin: 3mm 0;
  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.05);
  overflow: hidden;
  border: 1px solid #1E293B;
}
.code-block-header {
  font-family: var(--font-body);
  font-size: 8.5pt;
  font-weight: 600;
  color: #94A3B8;
  padding: 2.5mm 4.5mm;
  background: #1E293B;
  border-bottom: 1px solid #334155;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.code-block-header::before {
  content: '';
  display: inline-flex;
  width: 8px; height: 8px;
  background: #EF4444;
  border-radius: 50%;
  box-shadow: 14px 0 0 #F59E0B, 28px 0 0 #22C55E;
  flex-shrink: 0;
}
.code-table { width: 100%; border-collapse: collapse; }
.code-table td { vertical-align: top; padding: 0; }
.line-num {
  width: 10mm;
  text-align: right;
  padding: 0.5mm 3mm 0.5mm 0;
  font-family: var(--font-code);
  font-size: 8pt;
  color: #475569;
  line-height: 165%;
  user-select: none;
  background: rgba(0,0,0,0.15);
}
.line-code {
  font-family: var(--font-code);
  font-size: 10pt;
  color: #E2E8F0;
  line-height: 165%;
  padding: 0.5mm 4mm 0.5mm 3mm;
  white-space: pre;
}
.line-highlight td { background: rgba(59,130,246,0.12) !important; }
.line-highlight .line-num { color: var(--c-blue) !important; font-weight: 700; }

/* 신택스 컬러 — VS Code Dark+ 영감 */
.kw { color: #C084FC; font-weight: 500; }
.str { color: #86EFAC; }
.cmt { color: #6B7280; font-style: italic; }
.fn { color: #FDBA74; }
.pp { color: #F472B6; font-weight: 600; }
.num { color: #7DD3FC; }
.type { color: #5EEAD4; font-weight: 500; }
.mc { color: #67E8F9; }
.esc { color: #FCD34D; font-weight: 600; }
.fmt { color: #FCD34D; }

/* ═══════════════════════════════════════
   실행 결과 — 터미널 스타일
   ═══════════════════════════════════════ */
.output-block {
  background: #F0FDF4;
  border: 1.5px solid #86EFAC;
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin: 3mm 0;
  position: relative;
}
.output-label {
  font-family: var(--font-body);
  font-size: 8.5pt;
  color: var(--c-green);
  display: block;
  margin-bottom: 1.5mm;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.output-text {
  font-family: var(--font-code);
  font-size: 10.5pt;
  line-height: 160%;
  color: #166534;
}

/* ═══════════════════════════════════════
   박스 시스템 — 프리미엄 카드 디자인
   ═══════════════════════════════════════ */
.box {
  border-radius: var(--radius-md);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  position: relative;
  box-shadow: var(--shadow-sm);
}
.box-label {
  font-size: 10.5pt;
  font-weight: 800;
  margin-bottom: 2mm;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.box-content { font-size: 11pt; line-height: 170%; }
.box-warning {
  border-left: 5px solid var(--c-red);
  background: linear-gradient(135deg, #FEF2F2 0%, #FFF1F2 100%);
}
.box-warning .box-label { color: var(--c-red); }
.box-key {
  border-left: 5px solid var(--c-blue);
  background: linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%);
}
.box-key .box-label { color: var(--c-blue); }
.box-tip {
  border-left: 5px solid var(--c-orange);
  background: linear-gradient(135deg, #FFFBEB 0%, #FEF9C3 50%, #FFFBEB 100%);
}
.box-tip .box-label { color: var(--c-orange); }
.box-summary {
  border-left: 5px solid var(--c-green);
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border: 1.5px solid #A7F3D0;
  border-left: 5px solid var(--c-green);
}
.box-summary .box-label { color: var(--c-green); }
.box-question {
  border-left: 5px solid var(--c-purple);
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
}
.box-question .box-label { color: var(--c-purple); }
.box-history {
  border-left: 5px solid var(--c-teal);
  background: linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%);
}
.box-history .box-label { color: var(--c-teal); }

/* ═══════════════════════════════════════
   연습문제 — 프리미엄 카드
   ═══════════════════════════════════════ */
.exercise {
  background: white;
  border: 1.5px solid #E2E8F0;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  border-left: 5px solid var(--c-primary);
  box-shadow: var(--shadow-sm);
  position: relative;
}
.exercise-title {
  font-size: 13pt;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 2.5mm;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.difficulty {
  display: inline-flex;
  align-items: center;
  font-size: 8pt;
  padding: 0.5mm 2.5mm;
  border-radius: 20px;
  margin-left: 2mm;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.diff-1 { background: #D1FAE5; color: #059669; }
.diff-2 { background: #FEF3C7; color: #D97706; }
.diff-3 { background: #FEE2E2; color: #DC2626; }
.memo-area {
  border: 2px dashed #CBD5E1;
  border-radius: var(--radius-md);
  padding: 3mm;
  min-height: 15mm;
  margin-top: 2.5mm;
  background: repeating-linear-gradient(
    transparent, transparent 7mm, #F1F5F9 7mm, #F1F5F9 7.5mm
  );
}
.memo-label { font-size: 8.5pt; color: var(--c-text-muted); font-style: italic; }

/* ── OX/Choice/Short ── */
.exercise-answer {
  font-size: 10pt;
  color: var(--c-green);
  margin-top: 2mm;
  padding: 1.5mm 3mm;
  background: var(--c-green-light);
  border-radius: var(--radius-sm);
  font-weight: 600;
  border: 1px solid #A7F3D0;
}
.exercise-explain {
  font-size: 9.5pt;
  color: var(--c-text-secondary);
  margin-top: 1.5mm;
  padding: 2mm 3mm;
  background: #F8FAFC;
  border-radius: var(--radius-sm);
  border-left: 3px solid #E2E8F0;
}
.choice-list { padding-left: 6mm; margin: 2mm 0; }
.choice-list li { font-size: 10.5pt; margin-bottom: 1.5mm; line-height: 150%; }
.choice-list li.choice-correct { color: var(--c-green); font-weight: 700; }

/* ═══════════════════════════════════════
   Before/After 비교 — 프리미엄 2컬럼
   ═══════════════════════════════════════ */
.compare {
  display: flex;
  gap: 3mm;
  margin: 3mm 0;
  overflow: hidden;
}
.compare-bad {
  flex: 1;
  min-width: 0;
  background: linear-gradient(135deg, #FEF2F2, #FFF1F2);
  border: 1.5px solid #FECACA;
  border-radius: var(--radius-md);
  padding: 3mm;
  overflow: hidden;
}
.compare-good {
  flex: 1;
  min-width: 0;
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border: 1.5px solid #A7F3D0;
  border-radius: var(--radius-md);
  padding: 3mm;
  overflow: hidden;
}
.compare code {
  font-size: 9pt;
  word-break: break-all;
  overflow-wrap: break-word;
  display: block;
  background: rgba(0,0,0,0.05);
  padding: 2mm 3mm;
  border-radius: var(--radius-sm);
  margin: 1.5mm 0;
  line-height: 155%;
  white-space: pre-wrap;
  border: none;
  color: inherit;
}
.compare-label { font-size: 9.5pt; font-weight: 800; margin-bottom: 1.5mm; }
.compare-bad .compare-label { color: var(--c-red); }
.compare-good .compare-label { color: var(--c-green); }
.compare-msg-bad { font-size: 9pt; color: var(--c-red); }
.compare-msg-good { font-size: 9pt; color: var(--c-green); }

/* ═══════════════════════════════════════
   챕터 시작 — 프리미엄 카드
   ═══════════════════════════════════════ */
.chapter-start-box { margin-bottom: 3mm; }
.learning-goals {
  background: linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 100%);
  border-radius: var(--radius-lg);
  padding: 4mm 5mm;
  margin-bottom: 3mm;
  border: 1.5px solid #FED7AA;
  box-shadow: var(--shadow-sm);
}
.learning-goals h3 {
  font-size: 12pt;
  font-weight: 800;
  color: #EA580C;
  margin: 0 0 2.5mm;
  border: none;
  padding: 0;
}
.learning-goals ul { padding-left: 5mm; margin: 0; }
.learning-goals li { font-size: 11pt; margin-bottom: 1.5mm; line-height: 160%; color: #431407; }
.prereq-check {
  background: var(--c-blue-light);
  border-left: 5px solid var(--c-blue);
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin-bottom: 2.5mm;
}
.prereq-check h3 {
  font-size: 11pt;
  font-weight: 700;
  color: var(--c-blue);
  margin: 0 0 1.5mm;
  border: none;
  padding: 0;
}
.checklist { list-style: none; padding-left: 4mm; margin: 0; }
.checklist li { margin-bottom: 1mm; font-size: 10.5pt; }
.checklist li::before { content: '\\2610  '; font-size: 12pt; color: var(--c-text-muted); }
.progress-section { margin-top: 2.5mm; }
.progress-label { font-size: 9.5pt; color: var(--c-text-secondary); font-weight: 600; }
.progress-bar {
  background: #E2E8F0;
  border-radius: 6px;
  height: 4mm;
  margin-top: 1.5mm;
  overflow: hidden;
}
.progress-fill {
  background: linear-gradient(90deg, var(--c-primary), #FF8E53, #FEC89A);
  height: 100%;
  border-radius: 6px;
}

/* ═══════════════════════════════════════
   Predict — 생각해보기 카드
   ═══════════════════════════════════════ */
.predict-box {
  display: flex;
  gap: 3.5mm;
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
  border: 1.5px solid #C4B5FD;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  box-shadow: var(--shadow-sm);
}
.predict-icon {
  width: 10mm; height: 10mm;
  background: linear-gradient(135deg, var(--c-purple), #A78BFA);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16pt;
  font-weight: 900;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(139,92,246,0.3);
}
.predict-content { flex: 1; }
.predict-content p { font-size: 11pt; margin-bottom: 2mm; }

/* ═══════════════════════════════════════
   다이어그램 — 프리미엄 컨테이너
   ═══════════════════════════════════════ */
.diagram-box {
  background: var(--c-bg-subtle);
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 4mm;
  margin: 3.5mm 0;
  box-shadow: var(--shadow-sm);
}
.diagram-title {
  font-size: 11pt;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 3mm;
  text-align: center;
  letter-spacing: 0.3px;
}
.diagram-content { font-size: 10.5pt; line-height: 170%; }
.diagram-content .d-row { display: flex; align-items: center; justify-content: center; gap: 3mm; margin: 2mm 0; }
.diagram-content .d-block { background: #1E293B; color: white; padding: 2mm 4mm; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 9.5pt; font-weight: 500; }
.diagram-content .d-block-highlight { background: linear-gradient(135deg, var(--c-primary), #FF8E53); color: white; padding: 2mm 4mm; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 9.5pt; font-weight: 700; }
.diagram-content .d-arrow { color: var(--c-text-muted); font-size: 14pt; }
.diagram-content .d-label { font-size: 8.5pt; color: var(--c-text-secondary); }

/* ═══════════════════════════════════════
   Steps — 프리미엄 타임라인
   ═══════════════════════════════════════ */
.steps-visual { margin: 3mm 0; }
.step-item {
  display: flex;
  align-items: flex-start;
  gap: 3.5mm;
  margin-bottom: 1.5mm;
}
.step-num {
  width: 8mm; height: 8mm;
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10pt;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 0.5mm;
  box-shadow: 0 2px 4px rgba(255,107,107,0.3);
}
.step-body { flex: 1; }
.step-title { font-size: 11pt; font-weight: 700; margin-bottom: 0.5mm; color: var(--c-text); }
.step-desc { font-size: 10.5pt; color: var(--c-text-secondary); line-height: 160%; }
.step-connector { width: 2.5px; height: 4mm; background: linear-gradient(180deg, var(--c-primary), transparent); margin-left: 3.7mm; }

/* ═══════════════════════════════════════
   Modify — 바꿔보기 카드
   ═══════════════════════════════════════ */
.modify-box {
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  border: 1.5px solid #7DD3FC;
  border-left: 5px solid #0EA5E9;
  border-radius: var(--radius-md);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
}
.modify-label { font-size: 10.5pt; font-weight: 800; color: #0284C7; margin-bottom: 2mm; }
.modify-hint { font-size: 9.5pt; color: var(--c-text-secondary); font-style: italic; margin: 1.5mm 0; }

/* ═══════════════════════════════════════
   정답 섹션
   ═══════════════════════════════════════ */
.answers-section {
  background: white;
  border: 1.5px solid #E9D5FF;
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin: 3mm 0;
  border-left: 5px solid var(--c-purple);
}
.answers-section h3 {
  font-size: 12pt;
  font-weight: 800;
  color: var(--c-purple);
  margin: 0 0 2.5mm;
  border: none;
  padding: 0;
}
.answer-item { margin-bottom: 1mm; font-size: 10pt; line-height: 150%; }
.answer-num { font-weight: 700; color: var(--c-primary); margin-right: 2mm; }
.answer-text { color: var(--c-text); }

/* ═══════════════════════════════════════
   코드 설명 (라인별)
   ═══════════════════════════════════════ */
.code-explain { margin: 3mm 0; padding-left: 2mm; }
.code-explain-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.5mm;
  font-size: 11pt;
  line-height: 165%;
}
.code-explain-line {
  font-family: var(--font-code);
  font-size: 9pt;
  color: white;
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  padding: 0.5mm 2.5mm;
  border-radius: 4px;
  margin-right: 3mm;
  flex-shrink: 0;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(255,107,107,0.3);
}

/* ═══════════════════════════════════════
   용어 정리 — 프리미엄 테이블
   ═══════════════════════════════════════ */
.glossary { margin: 3mm 0; break-inside: avoid; }
.glossary-item {
  display: flex;
  margin-bottom: 0;
  font-size: 10pt;
  padding: 2mm 3mm;
  border-bottom: 1px solid #F1F5F9;
}
.glossary-item:nth-child(odd) { background: #F8FAFC; }
.glossary-item:first-child { border-radius: var(--radius-sm) var(--radius-sm) 0 0; }
.glossary-item:last-child { border-radius: 0 0 var(--radius-sm) var(--radius-sm); border-bottom: none; }
.glossary-term {
  font-weight: 700;
  min-width: 28mm;
  flex-shrink: 0;
  color: var(--c-text);
  font-family: var(--font-code);
  font-size: 9.5pt;
}
.glossary-def { color: var(--c-text-secondary); line-height: 155%; }

/* ═══════════════════════════════════════
   추적 테이블 — 프리미엄 데이터 테이블
   ═══════════════════════════════════════ */
.trace-table { margin: 3.5mm 0; }
.trace-caption { font-size: 10.5pt; font-weight: 700; color: var(--c-primary); margin-bottom: 2mm; }
.trace-table table { width: 100%; border-collapse: collapse; font-size: 10pt; border-radius: var(--radius-sm); overflow: hidden; }
.trace-table th {
  background: linear-gradient(135deg, #1E293B, #334155);
  color: white;
  padding: 2mm 3.5mm;
  text-align: left;
  font-weight: 700;
  font-size: 9.5pt;
}
.trace-table td { padding: 2mm 3.5mm; border-bottom: 1px solid #F1F5F9; font-family: var(--font-code); font-size: 9.5pt; }
.trace-table tr:nth-child(even) td { background: #F8FAFC; }

/* ═══════════════════════════════════════
   마스코트 말풍선 — 프리미엄 디자인
   ═══════════════════════════════════════ */
.mascot-speech {
  display: flex;
  align-items: flex-start;
  gap: 3.5mm;
  margin: 3.5mm 0;
}
.mascot-speech.right { flex-direction: row-reverse; }
.mascot-speech-img {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
}
.mascot-speech-img.small { width: 48px; height: 48px; }
.mascot-speech-img.large { width: 80px; height: 80px; }
.mascot-bubble {
  position: relative;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border: 1.5px solid #93C5FD;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  font-size: 10.5pt;
  color: #1E3A5F;
  line-height: 1.6;
  flex: 1;
  max-width: 85%;
  box-shadow: var(--shadow-sm);
}
.mascot-bubble.warn {
  background: linear-gradient(135deg, #FEF2F2, #FEE2E2);
  border-color: #FCA5A5;
  color: #7F1D1D;
}
.mascot-bubble.success {
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border-color: #6EE7B7;
  color: #14532D;
}
.mascot-bubble.tip {
  background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  border-color: #FCD34D;
  color: #78350F;
}
.mascot-bubble::before {
  content: '';
  position: absolute;
  top: 14px;
  left: -9px;
  border: 7px solid transparent;
  border-right-color: #93C5FD;
}
.mascot-bubble::after {
  content: '';
  position: absolute;
  top: 15px;
  left: -7px;
  border: 6px solid transparent;
  border-right-color: #EFF6FF;
}
.mascot-speech.right .mascot-bubble::before {
  left: auto; right: -9px;
  border-right-color: transparent;
  border-left-color: #93C5FD;
}
.mascot-speech.right .mascot-bubble::after {
  left: auto; right: -7px;
  border-right-color: transparent;
  border-left-color: #EFF6FF;
}
.mascot-bubble.warn::before { border-right-color: #FCA5A5; }
.mascot-bubble.warn::after { border-right-color: #FEF2F2; }
.mascot-speech.right .mascot-bubble.warn::before { border-right-color: transparent; border-left-color: #FCA5A5; }
.mascot-speech.right .mascot-bubble.warn::after { border-right-color: transparent; border-left-color: #FEF2F2; }
.mascot-bubble.success::before { border-right-color: #6EE7B7; }
.mascot-bubble.success::after { border-right-color: #ECFDF5; }
.mascot-speech.right .mascot-bubble.success::before { border-right-color: transparent; border-left-color: #6EE7B7; }
.mascot-speech.right .mascot-bubble.success::after { border-right-color: transparent; border-left-color: #ECFDF5; }
.mascot-bubble.tip::before { border-right-color: #FCD34D; }
.mascot-bubble.tip::after { border-right-color: #FFFBEB; }
.mascot-speech.right .mascot-bubble.tip::before { border-right-color: transparent; border-left-color: #FCD34D; }
.mascot-speech.right .mascot-bubble.tip::after { border-right-color: transparent; border-left-color: #FFFBEB; }

/* ═══════════════════════════════════════
   Fact Bite — 숫자/팩트 강조 카드
   ═══════════════════════════════════════ */
.fact-bite {
  display: flex;
  align-items: center;
  gap: 4mm;
  margin: 3mm 0;
  background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FFF1F2 100%);
  border-radius: var(--radius-lg);
  padding: 3.5mm 5mm;
  border: 1.5px solid #FECDD3;
  box-shadow: var(--shadow-sm);
}
.fact-bite-number {
  font: 900 28pt var(--font-body);
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  flex-shrink: 0;
}
.fact-bite-text { font-size: 10pt; color: var(--c-text-secondary); line-height: 1.5; }

/* ═══════════════════════════════════════
   Visual Summary — 핵심 정리 카드
   ═══════════════════════════════════════ */
.visual-summary {
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%);
  border: 1.5px solid #6EE7B7;
  border-radius: var(--radius-xl);
  padding: 5mm;
  margin: 4mm 0;
  box-shadow: var(--shadow-md);
}
.visual-summary-title {
  font-size: 14pt;
  font-weight: 900;
  color: #065F46;
  text-align: center;
  margin-bottom: 3mm;
}
.visual-summary-items { display: flex; flex-direction: column; gap: 2mm; }
.visual-summary-item {
  display: flex;
  align-items: flex-start;
  gap: 3mm;
  background: rgba(255,255,255,0.7);
  padding: 2.5mm 3.5mm;
  border-radius: var(--radius-md);
  backdrop-filter: blur(4px);
}
.visual-summary-num {
  width: 7mm; height: 7mm;
  background: linear-gradient(135deg, #059669, #10B981);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9pt;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(5,150,105,0.3);
}

/* ═══════════════════════════════════════
   10축 매핑 전용 스타일
   ═══════════════════════════════════════ */
.axis-section {
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1.5px solid #CBD5E1;
  border-radius: var(--radius-xl);
  padding: 5mm;
  margin: 5mm 0;
  box-shadow: var(--shadow-md);
  page-break-inside: avoid;
}
.axis-title {
  font-size: 14pt;
  font-weight: 900;
  text-align: center;
  margin-bottom: 4mm;
  color: var(--c-text);
  letter-spacing: -0.3px;
}
.axis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5mm;
}
.axis-item {
  display: flex;
  align-items: flex-start;
  gap: 2mm;
  padding: 2.5mm 3mm;
  border-radius: var(--radius-md);
  background: white;
  border: 1px solid #E2E8F0;
}
.axis-badge {
  font-size: 7.5pt;
  font-weight: 800;
  padding: 0.5mm 2.5mm;
  border-radius: 20px;
  flex-shrink: 0;
  letter-spacing: 0.3px;
  white-space: nowrap;
}
.axis-badge.c-lang { background: #DBEAFE; color: #1D4ED8; }
.axis-badge.thinking { background: #E0E7FF; color: #4338CA; }
.axis-badge.debug { background: #FEE2E2; color: #DC2626; }
.axis-badge.koi { background: #FEF3C7; color: #B45309; }
.axis-badge.basics { background: #D1FAE5; color: #059669; }
.axis-badge.reallife { background: #CCFBF1; color: #0D9488; }
.axis-badge.crosssubj { background: #E9D5FF; color: #7C3AED; }
.axis-badge.project { background: #FFE4E6; color: #BE123C; }
.axis-badge.ai { background: #FCE7F3; color: #DB2777; }
.axis-badge.hardware { background: #CFFAFE; color: #0891B2; }
.axis-text { font-size: 9.5pt; line-height: 150%; color: var(--c-text-secondary); }

/* ── TOC ── */
.toc { margin: 5mm 0; }
.toc h2 { border: none; padding: 0; margin-bottom: 3mm; background: none; }
.toc ul { list-style: none; padding: 0; }
.toc-h2 { display: flex; align-items: baseline; margin-bottom: 1.5mm; font-size: 11pt; }
.toc-text { flex-shrink: 0; }
.toc-dots { flex: 1; border-bottom: 1.5px dotted #CBD5E1; margin: 0 2mm; min-width: 10mm; }
.toc-page { flex-shrink: 0; color: var(--c-text-muted); font-size: 10pt; }

/* ── Margin Note ── */
.margin-note {
  float: right;
  width: 30mm;
  font-size: 8.5pt;
  color: var(--c-text-secondary);
  background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  padding: 2mm 2.5mm;
  border-radius: var(--radius-sm);
  margin: 0 -35mm 2mm 2mm;
  border-left: 2.5px solid var(--c-orange);
}

/* ── Cross Reference ── */
.crossref { font-size: 9pt; color: var(--c-blue); font-style: italic; font-weight: 500; }

/* ── Image ── */
.image-block { margin: 3.5mm 0; text-align: center; }
.image-block img { max-width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
.image-caption {
  font-size: 9pt;
  color: var(--c-text-secondary);
  margin-top: 2mm;
  font-style: italic;
  background: var(--c-bg-subtle);
  padding: 1.5mm 4mm;
  border-radius: 20px;
  display: inline-block;
}

/* ═══════════════════════════════════════
   v7.0 — 80레이어 리서치 증강분
   v5 프리미엄 기반 + TEXTBOOK-DESIGN-DEEP P1~P6 합성
   ═══════════════════════════════════════ */

/* ── Layer 26: 게슈탈트 근접성 강화 ── */
h2 + p,
h3 + p,
h2 + .code-block,
h3 + .code-block { margin-top: 1mm !important; }
.code-block + .code-explain { margin-top: 0.5mm; }
.code-block + .output-block { margin-top: 1mm; }
.exercise + .exercise { margin-top: 1.5mm; }

/* ── Layer 28: 마이크로 타이포그래피 ── */
body {
  font-kerning: auto;
  font-variant-ligatures: common-ligatures;
  hanging-punctuation: first last;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.line-num { font-variant-numeric: tabular-nums; }
.trace-table td { font-variant-numeric: tabular-nums; }

/* ── Layer 29: 연습문제 유형별 스타일 ── */
.exercise-item { margin-bottom: 2mm; font-size: 11pt; line-height: 165%; }
.exercise-item p { margin-bottom: 1.5mm; }
.exercise-blank { display: inline-block; min-width: 20mm; border-bottom: 2px solid var(--c-primary); margin: 0 1mm; }
.exercise-ox-grid { display: flex; gap: 3mm; margin-top: 2mm; }
.exercise-ox-item { flex: 1; padding: 2mm 3mm; border: 1px solid var(--c-border); border-radius: var(--radius-sm); font-size: 10pt; }
.exercise-matching { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5mm; font-size: 10pt; }
.exercise-reorder { display: flex; flex-direction: column; gap: 1mm; font-family: var(--font-code); font-size: 9.5pt; }
.exercise-reorder-item { background: var(--c-bg-subtle); padding: 1.5mm 3mm; border-radius: var(--radius-sm); border: 1px solid var(--c-border); }

/* ── Layer 30: 교사용 에디션 ── */
.teacher-only { background: #FFF5F5; border: 2px dashed #E74C3C; padding: 3mm; border-radius: var(--radius-md); }
.teacher-note { font-size: 9pt; color: #C0392B; font-style: italic; }

/* ── Layer 32: 디자인 토큰 — 인쇄용 간격 ── */
article > * + * { margin-top: 2.5mm; }
article > h2 { margin-top: 5mm; }
article > h3 { margin-top: 3.5mm; }

/* ── Layer 51: 황금비 타이포 ──
   24pt / 16pt / 13.5pt / 11.5pt = 1:0.67:0.56:0.48 ≈ 피보나치 */

/* ── Layer 55: 인지부하 최적화 — 시각 앵커 ── */
h2::before {
  /* 빈 블록으로 스크롤 앵커 역할 — Paged.js에서 러닝헤드 지원 */
}

/* ── Layer 56: 아이트래킹 — F패턴 강화 ── */
.lesson-header .lesson-number { font-weight: 700; }
.box-label::before {
  content: '';
  display: inline-block;
  width: 3px; height: 14px;
  border-radius: 2px;
  margin-right: 1.5mm;
  flex-shrink: 0;
}
.box-warning .box-label::before { background: var(--c-red); }
.box-key .box-label::before { background: var(--c-blue); }
.box-tip .box-label::before { background: var(--c-orange); }
.box-summary .box-label::before { background: var(--c-green); }
.box-question .box-label::before { background: var(--c-purple); }
.box-history .box-label::before { background: var(--c-teal); }

/* ── Layer 58: 색상 조화 60-30-10 강화 ── */
/* 60% = white/neutral, 30% = brand gradient accents, 10% = c-primary strong */

/* ── Layer 60: 코드 블록 — 브래킷 컬러링 (Layer 30 from Deep) ── */
.brace-1 { color: #C084FC; font-weight: bold; }
.brace-2 { color: #86EFAC; font-weight: bold; }
.brace-3 { color: #FDBA74; font-weight: bold; }
.brace-4 { color: #7DD3FC; font-weight: bold; }

/* ── Layer 61: 인덴트 가이드 ── */
.indent-guide { border-left: 1px solid rgba(255,255,255,0.08); }

/* ── Layer 65: 10축 매핑 강화 ── */
.axis-item { transition: none; }
.axis-section .box-content { font-size: 10pt; }

/* ── Layer 67: 자료구조 시각화 ── */
.ds-visual { font-family: var(--font-code); font-size: 9pt; text-align: center; margin: 3mm 0; }
.ds-array { display: flex; justify-content: center; gap: 0; }
.ds-cell { width: 9mm; height: 9mm; border: 1.5px solid var(--c-blue); display: flex; align-items: center; justify-content: center; font-weight: 700; }
.ds-cell:first-child { border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
.ds-cell:last-child { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.ds-index { font-size: 7pt; color: var(--c-text-muted); text-align: center; margin-top: 0.5mm; }

/* ── Layer 68: 학습 저널 공간 ── */
.reflection-box {
  background: var(--c-bg-warm);
  border: 1.5px dashed #FCD34D;
  border-radius: var(--radius-lg);
  padding: 4mm;
  margin: 4mm 0;
}
.reflection-prompt { font-size: 10pt; color: var(--c-orange); font-weight: 700; margin-bottom: 2mm; }
.reflection-lines {
  min-height: 20mm;
  background: repeating-linear-gradient(transparent, transparent 7mm, #FEF3C7 7mm, #FEF3C7 7.5mm);
}

/* ── Layer 69: 루브릭/자기평가 ── */
.rubric-table { width: 100%; border-collapse: collapse; font-size: 9pt; margin: 3mm 0; }
.rubric-table th { background: var(--c-purple); color: white; padding: 2mm; text-align: center; }
.rubric-table td { padding: 2mm; border: 1px solid var(--c-border); text-align: center; }
.self-check { display: flex; gap: 5mm; justify-content: center; margin: 3mm 0; }
.self-check-item { text-align: center; font-size: 18pt; }
.self-check-label { font-size: 7.5pt; color: var(--c-text-secondary); }

/* ── Layer 72: 교실 게임 보드 ── */
.bingo-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--c-border); border-radius: var(--radius-md); overflow: hidden; margin: 3mm 0; }
.bingo-cell { background: white; padding: 3mm; text-align: center; font-size: 8.5pt; font-family: var(--font-code); min-height: 10mm; display: flex; align-items: center; justify-content: center; }
.bingo-free { background: var(--c-primary-light); font-weight: 800; color: var(--c-primary); }

/* ── Layer 77: 북마크/읽기 가이드 ──  */
.reading-ruler { border-top: 3px solid var(--c-primary); margin: 4mm 0; opacity: 0.3; }

/* ── Layer 78: 고급 그리드 — 2컬럼 레이아웃 ── */
.two-col { display: flex; gap: 4mm; }
.two-col > * { flex: 1; min-width: 0; }
.three-col { display: flex; gap: 3mm; }
.three-col > * { flex: 1; min-width: 0; }

/* ── Layer 80: 인쇄 품질 마커 ── */
.print-crop-mark { display: none; }

/* ═══════════════════════════════════════
   인쇄 최적화 — 강화 버전 (Layer 77~80)
   ═══════════════════════════════════════ */
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .lesson-header,
  .code-block,
  .box,
  .exercise,
  .predict-box,
  .compare-bad,
  .compare-good,
  .step-num,
  .mascot-bubble,
  .visual-summary,
  .axis-section,
  .trace-table th,
  .progress-fill,
  .code-explain-line,
  .fact-bite,
  .diff-1, .diff-2, .diff-3,
  .diagram-box,
  .modify-box,
  .answers-section {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .no-print { display: none !important; }
  /* orphan/widow 강화 */
  p { orphans: 3; widows: 3; }
  h2, h3 { break-after: avoid; }
  .avoid-break { break-inside: avoid; }
}

</style>
<article id="content">
  <header class="lesson-header" role="banner">
    <div class="lesson-number">Lesson 0-4</div>
    <h1 class="lesson-title">2진수 ↔ 10진수 변환</h1>
    <div class="lesson-summary">10진수를 2진수로, 2진수를 10진수로 바꾸는 방법을 배워요. 음수 표현, 소수점, 실무 활용까지!</div>
  </header>
<div class="chapter-start-box avoid-break"><div class="learning-goals"><h3>📚 이번에 배울 것</h3><ul><li>10진수 자릿값과 2진수 자릿값의 차이를 알 수 있어요.</li><li>10진수를 2진수로 변환할 수 있어요 (나누기 2 반복).</li><li>2진수를 10진수로 변환할 수 있어요 (자릿값 더하기).</li><li>음수를 2진수로 표현하는 방법(부호 비트, 1의 보수, 2의 보수)을 알아요.</li><li>2진수 소수(고정소수점)를 이해하고 변환할 수 있어요.</li><li>BCD, IEEE 754, 오버플로우 등 심화 개념을 맛볼 수 있어요.</li></ul></div><div class="prereq-check"><h3>✅ 시작 전 체크</h3><ul class="checklist"><li>U0-03 '0과 1의 세계 (비트)'를 읽었다</li><li>나눗셈과 나머지를 알고 있다 (7 / 2 = 3 나머지 1)</li></ul></div><div class="progress-section"><span class="progress-label">Part 1 진행률: 4%</span><div class="progress-bar"><div class="progress-fill" style="width:4%"></div></div></div></div>
<h2>10진수의 자릿값</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-hello.svg" alt="마스코트" />
        <div class="mascot-bubble hello">우리가 매일 쓰는 숫자는 10진수야. '자릿값'이라는 개념을 먼저 다시 정리하고 가자!</div>
      </div>
<p>우리가 쓰는 숫자는 <b>10진수</b>예요. 0~9까지 10개의 숫자를 사용하고, 자리가 하나 올라갈 때마다 값이 <b>10배</b>씩 커져요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 10진수 자릿값</span><div class="box-content">숫자 <b>3725</b>를 뜯어보면:<br>3 x <b>1000</b>(천의 자리) + 7 x <b>100</b>(백의 자리) + 2 x <b>10</b>(십의 자리) + 5 x <b>1</b>(일의 자리)<br>= 3000 + 700 + 20 + 5 = 3725<br><br>자릿값: ... → 1000 → 100 → 10 → 1 (10배씩 커짐)</div></div>
<h2>2진수의 자릿값</h2>
<p>2진수는 0과 1만 사용해요. 자리가 올라갈 때마다 값이 <b>2배</b>씩 커져요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 2진수 자릿값</span><div class="box-content">2진수의 자릿값: ... → 128 → 64 → 32 → 16 → 8 → 4 → 2 → 1<br><br>10진수: 자릿값이 <b>10배</b>씩 커짐 (1, 10, 100, 1000...)<br>2진수: 자릿값이 <b>2배</b>씩 커짐 (1, 2, 4, 8, 16, 32...)</div></div>
<div class="image-block avoid-break"><img src="/images/svg-assets/place-values.svg" alt="10진수와 2진수의 자릿값 비교 — 10배 vs 2배" style="max-width:100%"/><div class="image-caption">10진수는 10배씩, 2진수는 2배씩 자릿값이 커져요</div></div>
<div class="fact-bite avoid-break"><div class="fact-bite-number">undefined</div><div class="fact-bite-text">2진수에서 자릿값은 모두 '2의 거듭제곱'이에요. 오른쪽부터 2⁰=1, 2¹=2, 2²=4, 2³=8... 이 패턴을 기억하면 변환이 쉬워요!</div></div>
<h2>2진수 → 10진수 변환</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">2진수를 10진수로 바꾸는 건 쉬워요. 각 자리의 값에 자릿값을 곱해서 더하면 돼요!</div>
      </div>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 2진수 → 10진수 방법</span><div class="box-content"><b>각 자리 숫자 x 자릿값</b>을 전부 더하면 돼요.<br><br>예: 1101(2) → 10진수<br>1 x 8 = 8<br>1 x 4 = 4<br>0 x 2 = 0<br>1 x 1 = 1<br>합계 = 8 + 4 + 0 + 1 = <b>13</b></div></div>
<p>0이 있는 자리는 무시하면 돼요. 1이 있는 자리의 자릿값만 더하면 됩니다.</p>
<div class="steps-visual avoid-break"></div>
<h2>10진수 → 2진수 변환</h2>
<p>10진수를 2진수로 바꾸려면 <b>2로 계속 나누면서 나머지를 적어요</b>. 몫이 0이 될 때까지 반복하고, 나머지를 <b>아래에서 위로</b> 읽으면 돼요.</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/binary-conversion.svg" alt="10진수 13을 2진수로 변환하는 과정과 1010을 10진수로 변환하는 과정" style="max-width:100%"/><div class="image-caption">10→2: 나누기 2 반복, 나머지 역순 읽기 / 2→10: 자릿값 더하기</div></div>
<div class="trace-table avoid-break"><table><thead><tr><th>나눗셈</th><th>몫</th><th>나머지</th></tr></thead><tbody><tr><td>25 ÷ 2</td><td>12</td><td>1</td></tr><tr><td>12 ÷ 2</td><td>6</td><td>0</td></tr><tr><td>6 ÷ 2</td><td>3</td><td>0</td></tr><tr><td>3 ÷ 2</td><td>1</td><td>1</td></tr><tr><td>1 ÷ 2</td><td>0</td><td>1</td></tr></tbody></table></div>
<div class="box box-tip avoid-break"><span class="box-label">[팁] 변환 후 검증하기</span><div class="box-content">10진수를 2진수로 바꿨으면, 다시 2진수를 10진수로 바꿔서 원래 수가 나오는지 확인해 보세요. 맞으면 성공!</div></div>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">변환을 한 다음에는 꼭 반대로 돌려서 검증해 봐요. 이게 실수를 막는 최고의 방법이에요!</div>
      </div>
<h2>변환 연습</h2>
<p>직접 종이에 변환 연습을 해 보세요.</p>
<div class="box box-tip avoid-break"><span class="box-label">[활동] 종이에 직접 변환해 보기</span><div class="box-content">아래 숫자를 종이에 직접 변환해 보세요.<br><br><b>10진수 → 2진수:</b><br>1. 6 = ?<br>2. 9 = ?<br>3. 20 = ?<br><br><b>2진수 → 10진수:</b><br>4. 110(2) = ?<br>5. 10001(2) = ?<br>6. 11111(2) = ?</div></div>
<h2>자주 나오는 2진수 외우기</h2>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 외워두면 좋은 숫자</span><div class="box-content">2의 거듭제곱은 자주 나와요. 외워두면 변환이 빨라져요.<br><br>2의 0승 = 1<br>2의 1승 = 2<br>2의 2승 = 4<br>2의 3승 = 8<br>2의 4승 = 16<br>2의 5승 = 32<br>2의 6승 = 64<br>2의 7승 = 128<br>2의 8승 = 256<br>2의 10승 = 1024</div></div>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<h2>C언어 연결 미리보기</h2>
<div class="box box-tip avoid-break"><span class="box-label">[C 연결 미리보기] 2진수와 C언어</span><div class="box-content">C언어에서 2진수를 직접 쓸 수 있어요:<br><code>int x = 0b1101;</code> → x에 13이 저장돼요<br><br>비트 단위로 계산하는 <b>비트 연산</b>도 있어요. 나중에 배울 거예요!</div></div>
<h2>🏛️ 2진수의 역사</h2>
<div class="box box-history avoid-break"><span class="box-label">[역사] 라이프니츠와 2진수의 탄생</span><div class="box-content">2진수를 처음 체계적으로 연구한 사람은 독일의 수학자 <b>고트프리트 라이프니츠</b>(1646~1716)예요. 그는 1703년에 2진수 체계를 논문으로 발표했어요. 라이프니츠는 중국의 고대 점술서 '주역(I Ching)'의 음양 기호에서 영감을 받았다고 해요. 음(⚋)은 0, 양(⚊)은 1과 같은 원리거든요!</div></div>
<div class="box box-history avoid-break"><span class="box-label">[역사] 조지 불의 논리 대수</span><div class="box-content"><b>조지 불</b>(1815~1864)은 영국의 수학자예요. 그는 '참(1)과 거짓(0)'만으로 논리를 수학적으로 표현하는 <b>불 대수(Boolean Algebra)</b>를 만들었어요. AND, OR, NOT 같은 논리 연산이 바로 불 대수에서 나왔어요. 이것이 나중에 컴퓨터의 핵심 원리가 됩니다.</div></div>
<div class="box box-history avoid-break"><span class="box-label">[역사] 클로드 섀넌 — 디지털 시대의 아버지</span><div class="box-content"><b>클로드 섀넌</b>(1916~2001)은 MIT 석사 논문(1937)에서 전기 스위치로 불 대수를 구현할 수 있다는 걸 증명했어요. 스위치 ON=1, OFF=0 → 이것이 바로 현대 디지털 컴퓨터의 시작이에요! 그의 논문은 '20세기 가장 중요한 석사 논문'이라 불려요.</div></div>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">라이프니츠가 2진수를 만들고, 불이 논리를 0과 1로 바꾸고, 섀넌이 전기 스위치로 실현했어요. 300년에 걸친 릴레이야!</div>
      </div>
<h2>음수 표현: 부호 비트</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">지금까지는 양수만 다뤘어요. 그런데 컴퓨터는 음수도 표현해야 하잖아요? 0과 1만으로 마이너스를 어떻게 나타낼까요?</div>
      </div>
<p>컴퓨터에는 '-' 기호가 없어요. 오직 0과 1뿐이에요. 그래서 음수를 표현하기 위해 <b>맨 앞 비트</b>를 특별하게 사용해요. 이것을 <b>부호 비트(sign bit)</b>라고 해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 부호-크기 표현 (Sign-Magnitude)</span><div class="box-content">가장 단순한 방법: 맨 앞 비트로 부호를 나타내요.<br><br>• 맨 앞 비트 0 → 양수 (+)<br>• 맨 앞 비트 1 → 음수 (-)<br><br>8비트 예시:<br>0 1101001 = +105<br>1 1101001 = -105<br><br>⚠️ 문제점: +0(00000000)과 -0(10000000) 두 가지가 생겨요!</div></div>
<h2>음수 표현: 1의 보수</h2>
<p><b>1의 보수(One's Complement)</b>는 양수의 모든 비트를 뒤집어서 음수를 만드는 방법이에요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 1의 보수 만들기</span><div class="box-content">방법: 모든 비트를 뒤집기 (0→1, 1→0)<br><br>예: +13 = 00001101<br>비트 뒤집기 → 11110010 = -13 (1의 보수)<br><br>예: +7 = 00000111<br>비트 뒤집기 → 11111000 = -7 (1의 보수)<br><br>⚠️ 여전히 +0(00000000)과 -0(11111111) 두 가지가 있어요.</div></div>
<h2>음수 표현: 2의 보수 ⭐</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">2의 보수가 진짜 핵심이에요! 현대 컴퓨터가 거의 전부 이 방식을 쓰고 있어요. 꼭 기억하세요!</div>
      </div>
<p><b>2의 보수(Two's Complement)</b>는 현대 컴퓨터에서 음수를 표현하는 <b>표준 방법</b>이에요. 1의 보수에서 1을 더하면 돼요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 2의 보수 만들기</span><div class="box-content"><b>방법 1: 비트 뒤집고 + 1</b><br>1단계: 모든 비트 뒤집기 (1의 보수)<br>2단계: 1 더하기<br><br>예: +13 = 00001101<br>1단계(뒤집기): 11110010<br>2단계(+1):    11110011 = -13 (2의 보수)<br><br><b>방법 2: 오른쪽부터 첫 번째 1까지 그대로, 나머지 뒤집기</b><br>+13 = 00001101<br>→ 오른쪽 '1'까지 유지: ...01<br>→ 나머지 뒤집기: 11110011 ✓</div></div>
<div class="steps-visual avoid-break"></div>
<div class="box box-tip avoid-break"><span class="box-label">[팁] 2의 보수의 장점</span><div class="box-content">• 0이 하나뿐이에요 (00000000)<br>• 덧셈 회로 하나로 뺄셈도 가능해요 (A - B = A + (-B))<br>• 하드웨어 구현이 간단해요<br><br>8비트 2의 보수 범위: <b>-128 ~ +127</b><br>n비트 2의 보수 범위: <b>-2^(n-1) ~ +2^(n-1) - 1</b></div></div>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<h2>[심화] 2의 보수 덧셈과 뺄셈</h2>
<p>2의 보수의 최대 장점은 <b>덧셈 회로만으로 뺄셈을 할 수 있다</b>는 거예요. A - B를 하고 싶으면 A + (-B)로 바꾸면 돼요. -B는 2의 보수로 구하면 되고요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 2의 보수 연산 예시</span><div class="box-content"><b>예1: 7 + (-3) = 4</b><br>  00000111 (+7)<br>+ 11111101 (-3의 2의 보수)<br>─────────<br>1 00000100 → 8비트 넘는 캐리 무시 → 00000100 = +4 ✓<br><br><b>예2: -5 + (-3) = -8</b><br>  11111011 (-5)<br>+ 11111101 (-3)<br>─────────<br>1 11111000 → 캐리 무시 → 11111000 = -8 ✓</div></div>
<h2>[심화] 오버플로우와 언더플로우</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-debugging.svg" alt="마스코트" />
        <div class="mascot-bubble debugging">비트 수가 정해져 있으면 표현할 수 있는 숫자에 한계가 있어요. 이 한계를 넘으면 이상한 일이 벌어져요!</div>
      </div>
<p><b>오버플로우(overflow)</b>는 계산 결과가 표현 가능한 범위를 넘어갈 때 발생해요. 마치 자동차 계기판이 999999에서 000000으로 돌아가는 것과 같아요.</p>
<div class="box box-warning avoid-break"><span class="box-label">[주의] 오버플로우 발생 조건</span><div class="box-content"><b>양수 오버플로우:</b> 양수 + 양수 = 음수?! 🤯<br>8비트: 01111111(+127) + 00000001(+1) = 10000000(-128)<br><br><b>음수 오버플로우(언더플로우):</b> 음수 + 음수 = 양수?!<br>8비트: 10000000(-128) + 11111111(-1) = 01111111(+127)<br><br><b>오버플로우 감지법:</b><br>• 두 양수를 더했는데 결과가 음수 → 오버플로우!<br>• 두 음수를 더했는데 결과가 양수 → 오버플로우!<br>• 양수 + 음수는 절대 오버플로우 안 남</div></div>
<div class="box box-history avoid-break"><span class="box-label">[실화] 오버플로우가 만든 사고</span><div class="box-content">1996년 <b>아리안 5호 로켓</b>이 발사 37초 만에 폭발했어요. 원인은? 64비트 숫자를 16비트로 변환할 때 오버플로우가 발생한 것! 소프트웨어 한 줄의 오류가 5억 달러짜리 로켓을 날려버렸어요. 오버플로우는 정말 무서운 버그예요.</div></div>
<h2>BCD (Binary Coded Decimal)</h2>
<p>BCD는 10진수의 각 자리를 <b>4비트 2진수</b>로 따로따로 표현하는 방식이에요. 일반적인 2진수 변환과는 달라요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] BCD 인코딩</span><div class="box-content">10진수 각 자리를 독립적으로 4비트로 변환해요.<br><br>예: 10진수 <b>93</b><br>• 일반 2진수: 1011101(2) (7비트)<br>• BCD: 1001 0011 (9→1001, 3→0011) (8비트)<br><br>예: 10진수 <b>256</b><br>• 일반 2진수: 100000000(2) (9비트)<br>• BCD: 0010 0101 0110 (2→0010, 5→0101, 6→0110) (12비트)</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[팁] BCD는 어디에 쓰이나요?</span><div class="box-content">• <b>디지털 시계</b>: 각 자리를 7세그먼트 디스플레이에 바로 보여줘야 하니까<br>• <b>전자 계산기</b>: 10진수 그대로 저장해야 반올림 오류가 없으니까<br>• <b>금융 시스템</b>: 돈 계산에서 소수점 오류가 생기면 안 되니까<br><br>BCD는 메모리를 더 쓰지만, 10진수 ↔ 표시 변환이 빠르고 정확해요.</div></div>
<h2>고정소수점: 2진수로 소수 표현하기</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">정수만 2진수로 바꿀 수 있는 게 아니에요. 소수점 아래 숫자도 2진수로 바꿀 수 있어요!</div>
      </div>
<p>소수점 아래 자릿값은 10진수에서 0.1, 0.01, 0.001... 이렇게 <b>10분의 1</b>씩 작아지죠? 2진수에서는 <b>2분의 1</b>씩 작아져요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 2진수 소수점 자릿값</span><div class="box-content">소수점 오른쪽 자릿값:<br>• 첫째 자리: 2⁻¹ = <b>0.5</b><br>• 둘째 자리: 2⁻² = <b>0.25</b><br>• 셋째 자리: 2⁻³ = <b>0.125</b><br>• 넷째 자리: 2⁻⁴ = <b>0.0625</b><br><br>예: 0.101(2) = 0×0.5 + 1×0.5 + 0×0.25 + 1×0.125<br>  아, 정정! 0.101(2) = 1×0.5 + 0×0.25 + 1×0.125 = 0.5 + 0.125 = <b>0.625</b></div></div>
<div class="steps-visual avoid-break"></div>
<div class="box box-warning avoid-break"><span class="box-label">[주의] 무한 소수가 될 수 있어요!</span><div class="box-content">10진수 <b>0.1</b>을 2진수로 바꾸면?<br>0.1 × 2 = 0.2 → 0<br>0.2 × 2 = 0.4 → 0<br>0.4 × 2 = 0.8 → 0<br>0.8 × 2 = 1.6 → 1<br>0.6 × 2 = 1.2 → 1<br>0.2 × 2 = 0.4 → 0 (반복 시작!)<br><br>0.1(10) = 0.000110011001100... (2) — 영원히 반복!<br>이래서 컴퓨터에서 0.1 + 0.2 ≠ 0.3 같은 오류가 생겨요.</div></div>
<h2>[심화 내용] IEEE 754 부동소수점 맛보기</h2>
<p>고정소수점은 소수점 위치가 고정되어 있어요. 하지만 아주 큰 수(은하 사이 거리)와 아주 작은 수(원자 크기)를 동시에 다루려면 <b>소수점이 움직이는</b> 방식이 필요해요. 이것이 <b>부동소수점(floating point)</b>이에요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] IEEE 754 구조 (32비트 단정밀도)</span><div class="box-content">32비트를 세 부분으로 나눠요:<br><br>| 부호 (1비트) | 지수 (8비트) | 가수 (23비트) |<br><br>• <b>부호 비트</b>: 0이면 양수, 1이면 음수<br>• <b>지수(exponent)</b>: 소수점을 얼마나 이동할지 (편향값 127 사용)<br>• <b>가수(mantissa)</b>: 실제 숫자의 유효 자릿수<br><br>예: -6.5를 IEEE 754로 표현<br>-6.5 = -110.1(2) = -1.101 × 2²<br>부호: 1 (음수)<br>지수: 2 + 127 = 129 = 10000001(2)<br>가수: 101 (1. 뒤의 부분)<br>→ 1 10000001 10100000000000000000000</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[팁] 부동소수점은 왜 중요할까?</span><div class="box-content">C언어의 <code>float</code>가 바로 32비트 IEEE 754예요!<br><code>double</code>은 64비트 버전(배정밀도)이고요.<br><br>게임, 과학 계산, 그래픽, AI 등 거의 모든 분야에서 쓰여요.</div></div>
<h2>실무 연결: 2진수가 쓰이는 곳</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-hello.svg" alt="마스코트" />
        <div class="mascot-bubble hello">2진수 변환을 배웠으니, 이게 실제로 어디에 쓰이는지 알아볼까요? 생각보다 엄청 많은 곳에 쓰여요!</div>
      </div>
<div class="box box-key avoid-break"><span class="box-label">실무 활용 1: IP 주소</span><div class="box-content">인터넷 주소 <b>192.168.1.1</b>은 사실 32비트 2진수예요!<br><br>192 = 11000000<br>168 = 10101000<br>  1 = 00000001<br>  1 = 00000001<br><br>합치면: 11000000.10101000.00000001.00000001<br>각 자리가 0~255(8비트)인 이유: 1바이트로 표현하니까!</div></div>
<div class="box box-key avoid-break"><span class="box-label">실무 활용 2: 서브넷 마스크</span><div class="box-content">서브넷 마스크 <b>255.255.255.0</b>을 2진수로 바꾸면:<br>11111111.11111111.11111111.00000000<br><br>1이 연속되는 부분 = 네트워크 주소<br>0인 부분 = 호스트(컴퓨터) 주소<br><br>/24 같은 표기는 '앞에서 24비트가 1'이라는 뜻이에요.</div></div>
<div class="box box-key avoid-break"><span class="box-label">실무 활용 3: 메모리 주소</span><div class="box-content">프로그램이 사용하는 메모리의 위치도 2진수 숫자예요.<br><br>예: 메모리 주소 0x7FFF0000<br>= 0111 1111 1111 1111 0000 0000 0000 0000 (2)<br><br>디버거에서 변수의 메모리 주소를 확인할 때, 16진수로 표시되지만 내부적으로는 모두 2진수예요.</div></div>
<h2>Python으로 진수 변환 해보기</h2>
<p>Python에는 진수 변환 함수가 내장되어 있어요. 직접 실행해 볼까요?</p>
<div class="code-block avoid-break">
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code"># <span class="num">10</span>진수 → <span class="num">2</span>진수</td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code"><span class="fn">print</span>(<span class="fn">bin</span>(<span class="num">13</span>))      # 출력: 0b1101</td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code"><span class="fn">print</span>(<span class="fn">bin</span>(<span class="num">255</span>))     # 출력: 0b11111111</td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code"># <span class="num">2</span>진수 → <span class="num">10</span>진수</td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code"><span class="fn">print</span>(<span class="type">int</span>('<span class="num">1101</span>', <span class="num">2</span>))    # 출력: <span class="num">13</span></td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code"><span class="fn">print</span>(<span class="type">int</span>('<span class="num">11111111</span>', <span class="num">2</span>)) # 출력: <span class="num">255</span></td></tr>
<tr class=""><td class="line-num">8</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">9</td><td class="line-code"># 직접 만든 변환 함수</td></tr>
<tr class=""><td class="line-num">10</td><td class="line-code">def <span class="fn">to_binary</span>(n):</td></tr>
<tr class=""><td class="line-num">11</td><td class="line-code">    <span class="str">""</span><span class="str">"10진수를 2진수 문자열로 변환"</span><span class="str">""</span></td></tr>
<tr class=""><td class="line-num">12</td><td class="line-code">    <span class="kw">if</span> n == <span class="num">0</span>:</td></tr>
<tr class=""><td class="line-num">13</td><td class="line-code">        <span class="kw">return</span> <span class="str">'0'</span></td></tr>
<tr class=""><td class="line-num">14</td><td class="line-code">    result = ''</td></tr>
<tr class=""><td class="line-num">15</td><td class="line-code">    <span class="kw">while</span> n &gt; <span class="num">0</span>:</td></tr>
<tr class=""><td class="line-num">16</td><td class="line-code">        result = <span class="fn">str</span>(n % <span class="num">2</span>) + result</td></tr>
<tr class=""><td class="line-num">17</td><td class="line-code">        n = n <span class="cmt">// 2</span></td></tr>
<tr class=""><td class="line-num">18</td><td class="line-code">    <span class="kw">return</span> result</td></tr>
<tr class=""><td class="line-num">19</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">20</td><td class="line-code"><span class="fn">print</span>(<span class="fn">to_binary</span>(<span class="num">13</span>))   # 출력: <span class="num">1101</span></td></tr>
<tr class=""><td class="line-num">21</td><td class="line-code"><span class="fn">print</span>(<span class="fn">to_binary</span>(<span class="num">100</span>))  # 출력: <span class="num">1100100</span></td></tr></table></div>
<div class="output-block avoid-break"><span class="output-label">실행 결과</span><div class="output-text">0b1101
0b11111111
13
255
1101
1100100</div></div>
<h2>C언어로 진수 변환 직접 구현하기</h2>
<div class="code-block avoid-break">
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span></td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code"><span class="cmt">// 10진수를 2진수로 출력하는 함수</span></td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code"><span class="type">void</span> <span class="fn">print_binary</span>(<span class="type">int</span> n) {</td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code">    <span class="kw">if</span> (n == <span class="num">0</span>) {</td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code">        <span class="fn">printf</span>(<span class="str">"0"</span>);</td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code">        <span class="kw">return</span>;</td></tr>
<tr class=""><td class="line-num">8</td><td class="line-code">    }</td></tr>
<tr class=""><td class="line-num">9</td><td class="line-code">    <span class="cmt">// 재귀로 역순 출력</span></td></tr>
<tr class=""><td class="line-num">10</td><td class="line-code">    <span class="kw">if</span> (n &gt; <span class="num">1</span>) {</td></tr>
<tr class=""><td class="line-num">11</td><td class="line-code">        <span class="fn">print_binary</span>(n / <span class="num">2</span>);</td></tr>
<tr class=""><td class="line-num">12</td><td class="line-code">    }</td></tr>
<tr class=""><td class="line-num">13</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"<span class="fmt">%d</span>"</span>, n % <span class="num">2</span>);</td></tr>
<tr class=""><td class="line-num">14</td><td class="line-code">}</td></tr>
<tr class=""><td class="line-num">15</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">16</td><td class="line-code"><span class="cmt">// 2진수 문자열을 10진수로 변환</span></td></tr>
<tr class=""><td class="line-num">17</td><td class="line-code"><span class="type">int</span> <span class="fn">binary_to_decimal</span>(<span class="kw">const</span> <span class="type">char</span> *binary) {</td></tr>
<tr class=""><td class="line-num">18</td><td class="line-code">    <span class="type">int</span> result = <span class="num">0</span>;</td></tr>
<tr class=""><td class="line-num">19</td><td class="line-code">    <span class="kw">while</span> (*binary) {</td></tr>
<tr class=""><td class="line-num">20</td><td class="line-code">        result = result * <span class="num">2</span> + (*binary - <span class="str">'0'</span>);</td></tr>
<tr class=""><td class="line-num">21</td><td class="line-code">        binary++;</td></tr>
<tr class=""><td class="line-num">22</td><td class="line-code">    }</td></tr>
<tr class=""><td class="line-num">23</td><td class="line-code">    <span class="kw">return</span> result;</td></tr>
<tr class=""><td class="line-num">24</td><td class="line-code">}</td></tr>
<tr class=""><td class="line-num">25</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">26</td><td class="line-code"><span class="type">int</span> <span class="fn">main</span>() {</td></tr>
<tr class=""><td class="line-num">27</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"13을 2진수로: "</span>);</td></tr>
<tr class=""><td class="line-num">28</td><td class="line-code">    <span class="fn">print_binary</span>(<span class="num">13</span>);</td></tr>
<tr class=""><td class="line-num">29</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"<span class="esc">\\n</span>"</span>);</td></tr>
<tr class=""><td class="line-num">30</td><td class="line-code">    </td></tr>
<tr class=""><td class="line-num">31</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"1101을 10진수로: <span class="fmt">%d</span><span class="esc">\\n</span>"</span>,</td></tr>
<tr class=""><td class="line-num">32</td><td class="line-code">           <span class="fn">binary_to_decimal</span>(<span class="str">"1101"</span>));</td></tr>
<tr class=""><td class="line-num">33</td><td class="line-code">    <span class="kw">return</span> <span class="num">0</span>;</td></tr>
<tr class=""><td class="line-num">34</td><td class="line-code">}</td></tr></table></div>
<div class="output-block avoid-break"><span class="output-label">실행 결과</span><div class="output-text">13을 2진수로: 1101
1101을 10진수로: 13</div></div>
<h2>[심화] 2의 보수 실습 코드</h2>
<div class="code-block avoid-break">
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code">def <span class="fn">twos_complement</span>(n, bits=<span class="num">8</span>):</td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code">    <span class="str">""</span><span class="str">"음수를 2의 보수 2진수로 표현"</span><span class="str">""</span></td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code">    <span class="kw">if</span> n &gt;= <span class="num">0</span>:</td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code">        <span class="kw">return</span> <span class="fn">format</span>(n, f'<span class="num">0</span>{bits}b')</td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code">    <span class="kw">else</span>:</td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code">        # <span class="num">2</span>의 보수: <span class="num">2</span>^bits + n</td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code">        <span class="kw">return</span> <span class="fn">format</span>((<span class="num">1</span> &lt;&lt; bits) + n, f'<span class="num">0</span>{bits}b')</td></tr>
<tr class=""><td class="line-num">8</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">9</td><td class="line-code">def <span class="fn">from_twos_complement</span>(binary_str):</td></tr>
<tr class=""><td class="line-num">10</td><td class="line-code">    <span class="str">""</span><span class="str">"2의 보수 2진수를 10진수로 변환"</span><span class="str">""</span></td></tr>
<tr class=""><td class="line-num">11</td><td class="line-code">    bits = <span class="fn">len</span>(binary_str)</td></tr>
<tr class=""><td class="line-num">12</td><td class="line-code">    value = <span class="type">int</span>(binary_str, <span class="num">2</span>)</td></tr>
<tr class=""><td class="line-num">13</td><td class="line-code">    <span class="kw">if</span> binary_str[<span class="num">0</span>] == <span class="str">'1'</span>:  # 음수</td></tr>
<tr class=""><td class="line-num">14</td><td class="line-code">        value -= (<span class="num">1</span> &lt;&lt; bits)</td></tr>
<tr class=""><td class="line-num">15</td><td class="line-code">    <span class="kw">return</span> value</td></tr>
<tr class=""><td class="line-num">16</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">17</td><td class="line-code"># 테스트</td></tr>
<tr class=""><td class="line-num">18</td><td class="line-code"><span class="fn">print</span>(f<span class="str">"+13 = {twos_complement(13)}"</span>)</td></tr>
<tr class=""><td class="line-num">19</td><td class="line-code"><span class="fn">print</span>(f<span class="str">"-13 = {twos_complement(-13)}"</span>)</td></tr>
<tr class=""><td class="line-num">20</td><td class="line-code"><span class="fn">print</span>(f<span class="str">"+127 = {twos_complement(127)}"</span>)</td></tr>
<tr class=""><td class="line-num">21</td><td class="line-code"><span class="fn">print</span>(f<span class="str">"-128 = {twos_complement(-128)}"</span>)</td></tr>
<tr class=""><td class="line-num">22</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">23</td><td class="line-code"><span class="fn">print</span>(f<span class="str">"11110011 = {from_twos_complement('11110011')}"</span>)</td></tr>
<tr class=""><td class="line-num">24</td><td class="line-code"><span class="fn">print</span>(f<span class="str">"01111111 = {from_twos_complement('01111111')}"</span>)</td></tr></table></div>
<div class="output-block avoid-break"><span class="output-label">실행 결과</span><div class="output-text">+13 = 00001101
-13 = 11110011
+127 = 01111111
-128 = 10000000
11110011 = -13
01111111 = 127</div></div>
<h2>연습문제</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-debugging.svg" alt="마스코트" />
        <div class="mascot-bubble debugging">이제 연습 시간이에요! 기본부터 심화까지, 단계별로 풀어 보세요. 종이에 직접 써가면서 풀면 실력이 더 빨리 늘어요!</div>
      </div>
<div class="exercise avoid-break"><div class="exercise-title">문제 1 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>2진수 1011(2)을 10진수로 바꿔 보세요. (자릿값: 8, 4, 2, 1)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 2 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>10진수 12를 2진수로 바꿔 보세요. (나누기 2 반복)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 3 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>다음 중 2진수 1000(2)이 나타내는 10진수 값은?<br>(1) 4  (2) 6  (3) 8  (4) 16</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 4 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>10진수 7을 2진수로 바꾸면? 그리고 2진수 10101(2)을 10진수로 바꾸면?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 5 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>1바이트(8비트)로 표현할 수 있는 부호 없는 정수의 범위는 10진수로 몇부터 몇까지인가요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 6 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>다음 2진수를 10진수로 바꾸세요.<br>(1) 10010(2) = ?<br>(2) 11100(2) = ?<br>(3) 101010(2) = ?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 7 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>다음 10진수를 2진수로 바꾸세요.<br>(1) 25 = ?<br>(2) 33 = ?<br>(3) 100 = ?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 8 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>10진수 49를 BCD로 표현하세요. 그리고 일반 2진수와 비교해 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 9 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>10진수 0.75를 2진수로 변환하세요. (힌트: 0.75 × 2 = ?)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 10 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>8비트 2의 보수 표현에서, +23의 2의 보수 표현과 -23의 2의 보수 표현을 각각 구하세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 11 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>2진수 11111111(2)은 10진수로 얼마인가요? 이 값에 1을 더하면 2진수로 어떻게 되나요? (힌트: 자릿수가 바뀌어요)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 12 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[2의 보수 연산] 8비트 2의 보수를 사용하여 다음을 계산하세요. 오버플로우가 발생하는지도 판단하세요.<br>(1) 50 + 30<br>(2) 100 + 50<br>(3) -60 + (-80)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 13 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[부동소수점] 10진수 -12.5를 IEEE 754 단정밀도(32비트) 형식으로 변환하세요.<br>(힌트: -12.5 = -1100.1(2) = -1.1001 × 2³)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 14 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[실무] IP 주소 10.0.1.255를 32비트 2진수로 변환하세요. 서브넷 마스크 255.255.254.0과 AND 연산하면 네트워크 주소는?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 15 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[코딩] Python 또는 C로, 사용자가 입력한 10진수를 2진수로 변환하고, 그 2진수에서 1의 개수를 세는 프로그램을 작성하세요. (예: 13 → 1101 → 1이 3개)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>정답</h2>
<div class="answers-section avoid-break"><h3>정답</h3><div class="answer-item"><span class="answer-num">문제 1</span> <span class="answer-text">1011(2) = 1×8 + 0×4 + 1×2 + 1×1 = 8 + 0 + 2 + 1 = <b>11</b></span></div><div class="answer-item"><span class="answer-num">문제 2</span> <span class="answer-text">12/2=6 나머지0, 6/2=3 나머지0, 3/2=1 나머지1, 1/2=0 나머지1 → 역순으로 읽기 → <b>1100(2)</b><br>검증: 1×8 + 1×4 + 0×2 + 0×1 = 12</span></div><div class="answer-item"><span class="answer-num">문제 3</span> <span class="answer-text">정답: <b>(3) 8</b><br>1000(2) = 1×8 + 0×4 + 0×2 + 0×1 = 8</span></div><div class="answer-item"><span class="answer-num">문제 4</span> <span class="answer-text">7 = <b>111(2)</b> (4+2+1)<br>10101(2) = 16+4+1 = <b>21</b></span></div><div class="answer-item"><span class="answer-num">문제 5</span> <span class="answer-text"><b>0부터 255까지</b> (00000000 ~ 11111111, 총 256개의 값)</span></div><div class="answer-item"><span class="answer-num">문제 6</span> <span class="answer-text">(1) 10010(2) = 16+2 = <b>18</b><br>(2) 11100(2) = 16+8+4 = <b>28</b><br>(3) 101010(2) = 32+8+2 = <b>42</b></span></div><div class="answer-item"><span class="answer-num">문제 7</span> <span class="answer-text">(1) 25 = <b>11001(2)</b> (16+8+1=25)<br>(2) 33 = <b>100001(2)</b> (32+1=33)<br>(3) 100 = <b>1100100(2)</b> (64+32+4=100)</span></div><div class="answer-item"><span class="answer-num">문제 8</span> <span class="answer-text">49의 BCD: 4→<b>0100</b>, 9→<b>1001</b> → BCD: <b>0100 1001</b><br>49의 일반 2진수: <b>110001(2)</b><br>BCD는 8비트, 일반 2진수는 6비트 — BCD가 더 많은 비트를 사용해요.</span></div><div class="answer-item"><span class="answer-num">문제 9</span> <span class="answer-text">0.75 × 2 = 1.5 → 1<br>0.5 × 2 = 1.0 → 1<br>소수부 0 → 끝!<br>0.75(10) = <b>0.11(2)</b><br>검증: 0.5 + 0.25 = 0.75 ✓</span></div><div class="answer-item"><span class="answer-num">문제 10</span> <span class="answer-text">+23 = <b>00010111</b><br>-23: 비트 뒤집기 → 11101000, +1 → <b>11101001</b><br>검증: 00010111 + 11101001 = 100000000 (8비트 넘는 1 무시) = 00000000 ✓</span></div><div class="answer-item"><span class="answer-num">문제 11</span> <span class="answer-text">11111111(2) = 128+64+32+16+8+4+2+1 = <b>255</b><br>255 + 1 = 256 = <b>100000000(2)</b> (9자리가 돼요!)<br>이것은 1바이트로 표현할 수 있는 가장 큰 수(255)에 1을 더하면 자릿수가 늘어나는 것을 보여줘요.</span></div><div class="answer-item"><span class="answer-num">문제 12</span> <span class="answer-text">(1) 50+30: 00110010 + 00011110 = 01010000 = <b>80</b> (오버플로우 없음 ✓)<br>(2) 100+50: 01100100 + 00110010 = 10010110 = <b>-106?!</b> → 양수+양수=음수이므로 <b>오버플로우 발생!</b> (8비트 범위 -128~127을 초과)<br>(3) -60+(-80): 11000100 + 10110000 = 01110100 = <b>+116?!</b> → 음수+음수=양수이므로 <b>오버플로우 발생!</b></span></div><div class="answer-item"><span class="answer-num">문제 13</span> <span class="answer-text">-12.5 = -1100.1(2) = -1.1001 × 2³<br>부호: <b>1</b> (음수)<br>지수: 3 + 127 = 130 = <b>10000010</b>(2)<br>가수: <b>10010000000000000000000</b> (1. 뒤의 1001, 나머지 0)<br>결과: <b>1 10000010 10010000000000000000000</b><br>16진수: C1480000</span></div><div class="answer-item"><span class="answer-num">문제 14</span> <span class="answer-text">10.0.1.255 = 00001010.00000000.00000001.11111111<br>255.255.254.0 = 11111111.11111111.11111110.00000000<br><br>AND 연산:<br>00001010.00000000.00000000.00000000<br>= <b>10.0.0.0</b> (네트워크 주소)</span></div><div class="answer-item"><span class="answer-num">문제 15</span> <span class="answer-text">Python 풀이:<br><code>n = int(input('10진수 입력: '))<br>binary = bin(n)[2:]<br>count = binary.count('1')<br>print(f'{n} → {binary} → 1이 {count}개')</code><br><br>C 풀이:<br><code>int n, count = 0, temp;<br>scanf("%d", &n); temp = n;<br>while(temp > 0) { count += temp % 2; temp /= 2; }<br>printf("1의 개수: %d\\n", count);</code></span></div></div>
<h2>용어 정리</h2>
<div class="glossary avoid-break"><div class="glossary-item"><dt class="glossary-term">2진수</dt><dd class="glossary-def">0과 1만 사용하는 수 체계. 자릿값이 2배씩 커져요 (1, 2, 4, 8, 16...).</dd></div><div class="glossary-item"><dt class="glossary-term">10진수</dt><dd class="glossary-def">0~9를 사용하는 수 체계. 자릿값이 10배씩 커져요 (1, 10, 100, 1000...).</dd></div><div class="glossary-item"><dt class="glossary-term">자릿값</dt><dd class="glossary-def">숫자가 놓인 위치에 따라 정해지는 값. 같은 숫자 3이라도 일의 자리(3)와 백의 자리(300)는 값이 달라요.</dd></div><div class="glossary-item"><dt class="glossary-term">진법 변환</dt><dd class="glossary-def">한 수 체계에서 다른 수 체계로 숫자를 바꾸는 것. 예: 10진수 13 = 2진수 1101.</dd></div><div class="glossary-item"><dt class="glossary-term">2의 거듭제곱</dt><dd class="glossary-def">2를 반복해서 곱한 수. 1, 2, 4, 8, 16, 32, 64, 128, 256...</dd></div><div class="glossary-item"><dt class="glossary-term">부호 비트 (sign bit)</dt><dd class="glossary-def">2진수의 맨 앞 비트. 양수(0)와 음수(1)를 구분하는 데 사용해요.</dd></div><div class="glossary-item"><dt class="glossary-term">1의 보수 (one's complement)</dt><dd class="glossary-def">모든 비트를 뒤집어서 음수를 표현하는 방법. +0과 -0이 따로 존재하는 단점이 있어요.</dd></div><div class="glossary-item"><dt class="glossary-term">2의 보수 (two's complement)</dt><dd class="glossary-def">1의 보수에 1을 더해서 음수를 표현하는 방법. 현대 컴퓨터의 표준 방식이에요.</dd></div><div class="glossary-item"><dt class="glossary-term">오버플로우 (overflow)</dt><dd class="glossary-def">계산 결과가 표현 가능한 범위를 넘어서 잘못된 값이 나오는 현상.</dd></div><div class="glossary-item"><dt class="glossary-term">BCD (Binary Coded Decimal)</dt><dd class="glossary-def">10진수 각 자리를 4비트 2진수로 따로 표현하는 방식. 디지털 시계, 계산기에 사용돼요.</dd></div><div class="glossary-item"><dt class="glossary-term">고정소수점 (fixed point)</dt><dd class="glossary-def">소수점 위치가 고정된 2진수 표현 방식.</dd></div><div class="glossary-item"><dt class="glossary-term">부동소수점 (floating point)</dt><dd class="glossary-def">소수점이 움직이는 2진수 표현 방식. IEEE 754 표준을 따르며, 아주 크거나 작은 수를 표현할 수 있어요.</dd></div><div class="glossary-item"><dt class="glossary-term">IEEE 754</dt><dd class="glossary-def">부동소수점 숫자의 국제 표준. 부호, 지수, 가수 세 부분으로 나눠서 실수를 표현해요.</dd></div></div>
<div class="visual-summary avoid-break"><div class="visual-summary-title">이번 유닛 핵심 정리</div><div class="visual-summary-items"><div class="visual-summary-item"><div class="visual-summary-num">1</div><span>10진수: 자릿값이 10배씩 / 2진수: 자릿값이 2배씩</span></div><div class="visual-summary-item"><div class="visual-summary-num">2</div><span>2→10: 각 자리 숫자에 자릿값을 곱해서 더하기</span></div><div class="visual-summary-item"><div class="visual-summary-num">3</div><span>10→2: 2로 나누기를 반복하고 나머지를 역순으로 읽기</span></div><div class="visual-summary-item"><div class="visual-summary-num">4</div><span>음수 표현: 2의 보수가 표준 (비트 뒤집고 +1)</span></div><div class="visual-summary-item"><div class="visual-summary-num">5</div><span>소수점: 2진수도 소수를 표현할 수 있어요 (0.5, 0.25, 0.125...)</span></div><div class="visual-summary-item"><div class="visual-summary-num">6</div><span>실무: IP 주소, 메모리 주소, 서브넷 마스크 모두 2진수 기반</span></div></div></div>
<h2>━━━ 10축 심화 학습 ━━━</h2>
<h2>[KOI] 진법 변환 실전 기출 유형</h2>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 1] 2진수 변환 + 1의 개수</span><div class="box-content"><b>문제:</b> 10진수 200을 2진수로 변환하면 1의 개수는 몇 개인가요?<br><br><b>정답:</b> 3개<br><br><b>풀이:</b><br>• 200 = 128 + 64 + 8 = 2⁷ + 2⁶ + 2³<br>• 200 = <b>11001000</b>₂<br>• 1의 개수 = <b>3개</b> (위치: 7번, 6번, 3번 비트)<br>• 팁: 큰 2의 거듭제곱부터 빼면 빨라요!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 2] 2의 보수 변환</span><div class="box-content"><b>문제:</b> 8비트 2의 보수로 -37을 표현하세요.<br><br><b>정답:</b> 11011011<br><br><b>풀이:</b><br>1단계: +37 = <b>00100101</b><br>2단계: 비트 뒤집기 = 11011010 (1의 보수)<br>3단계: +1 더하기 = <b>11011011</b> (2의 보수)<br><br>검증: 00100101 + 11011011 = 100000000 (캐리 무시) = 00000000 ✔</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 3] 오버플로우 판단</span><div class="box-content"><b>문제:</b> 8비트 2의 보수로 다음 연산 중 오버플로우가 발생하는 것을 모두 고르세요.<br>(1) 60 + 40<br>(2) -50 + 30<br>(3) -70 + (-80)<br>(4) 100 + 27<br><br><b>정답:</b> (1), (3), (4)<br><br><b>풀이:</b><br>• 8비트 2의 보수 범위: <b>-128 ~ +127</b><br>• (1) 60+40=100 → 범위 안 → 오버플로우 없음... 아닙니다! 100은 127 이하이므로 범위 내!<br>• 정정: (1)60+40=100 → 127 이하 ⇒ 오버플로우 없음<br>• (2) -50+30=-20 → 범위 내 ⇒ 오버플로우 없음<br>• (3) -70+(-80)=-150 → -128 미만 ⇒ <b>오버플로우!</b><br>• (4) 100+27=127 → 127 이하 ⇒ 오버플로우 없음<br><br>정답 정정: <b>(3)만 오버플로우</b>. 학생들이 범위를 햇갈렸을 때 바로잡는 함정 문제!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 4] BCD vs 2진수</span><div class="box-content"><b>문제:</b> 10진수 85를 BCD로 표현한 것과 일반 2진수로 표현한 것을 각각 쓰고, 어느 쪽이 더 많은 비트를 사용하는지 분석하세요.<br><br><b>정답:</b><br>• BCD: 8→1000, 5→0101 → <b>1000 0101</b> (8비트)<br>• 일반 2진수: 85 = 64+16+4+1 = <b>1010101</b> (7비트)<br>• BCD가 1비트 더 많이 사용<br>• 하지만 BCD는 자리별로 독립적이라 디스플레이 변환이 빠르고, 금융에서 반올림 오류가 없어요</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 16 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[KOI] 8비트 2의 보수로 다음을 계산하세요. 2진수로 풀이 과정을 보이세요.
(1) 45 + (-20) = ?
(2) -64 + (-64) = ? (오버플로우 발생 여부 판단)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[디버깅] 0.1 + 0.2 ≠ 0.3 문제</h2>
<p>진법 변환을 배웠으니, 디버깅에서 가장 유명한 버그 중 하나를 이해할 수 있어요.</p>
<div class="code-block avoid-break"><div class="code-block-header">[디버깅] 0.1 + 0.2 문제 직접 확인</div>
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span></td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code"><span class="type">int</span> <span class="fn">main</span>(<span class="type">void</span>) {</td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code">    <span class="type">double</span> a = <span class="num">0.1</span>;</td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code">    <span class="type">double</span> b = <span class="num">0.2</span>;</td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code">    <span class="type">double</span> c = a + b;</td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code">    </td></tr>
<tr class=""><td class="line-num">8</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"0.1 + 0.2 = <span class="fmt">%.20f</span><span class="esc">\\n</span>"</span>, c);  <span class="cmt">// 소수점 20자리까지</span></td></tr>
<tr class=""><td class="line-num">9</td><td class="line-code">    </td></tr>
<tr class=""><td class="line-num">10</td><td class="line-code">    <span class="kw">if</span> (c == <span class="num">0.3</span>) {</td></tr>
<tr class=""><td class="line-num">11</td><td class="line-code">        <span class="fn">printf</span>(<span class="str">"같다!<span class="esc">\\n</span>"</span>);</td></tr>
<tr class=""><td class="line-num">12</td><td class="line-code">    } <span class="kw">else</span> {</td></tr>
<tr class=""><td class="line-num">13</td><td class="line-code">        <span class="fn">printf</span>(<span class="str">"다르다! (0.3이 아님)<span class="esc">\\n</span>"</span>);</td></tr>
<tr class=""><td class="line-num">14</td><td class="line-code">    }</td></tr>
<tr class=""><td class="line-num">15</td><td class="line-code">    <span class="kw">return</span> <span class="num">0</span>;</td></tr>
<tr class=""><td class="line-num">16</td><td class="line-code">}</td></tr></table></div>
<!-- unknown type: output-block -->
<div class="box box-warning avoid-break"><span class="box-label">[디버깅] 부동소수점 비교 올바른 방법</span><div class="box-content">❌ 틀린 코드: <code>if (a == 0.3)</code><br>✅ 올바른 코드: <code>if (fabs(a - 0.3) < 0.000001)</code><br><br><b>이유:</b> 0.1은 2진수로 0.000110011001100... (무한 반복)<br>컬퓨터는 유한한 비트로 저장하니까 오차가 생겴요!<br><br>이 버그는 C, Java, JavaScript, Python 등 모든 언어에서 똑같이 발생해요.</div></div>
<h2>[컴퓨팅사고력] 알고리즘적 사고 — 나누기 2 반복</h2>
<p>10진수 → 2진수 변환은 '나누기2 → 나머지적기 → 몹이 0이면 끝 → 역순 읽기'라는 <b>정해진 절차</b>를 따라가요. 이것이 바로 <b>알고리즘</b>이에요!</p>
<div class="box box-tip avoid-break"><span class="box-label">[컴퓨팅사고력] 알고리즘의 3요소</span><div class="box-content">1. <b>입력</b>: 10진수 (ex: 25)<br>2. <b>과정</b>: 2로 나누고 나머지를 적기 (반복 — 몸이 0이 될 때까지)<br>3. <b>출력</b>: 나머지를 역순으로 읽기 (ex: 11001₂)<br><br>이 3가지 요소(입력-과정-출력)가 모든 알고리즘의 기본 구조예요.<br>Part 1에서 이것을 C언어 함수로 직접 구현해 볼 거예요!</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 17 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[컴퓨팅사고력] 10진수를 3진수로 바꾸는 알고리즘을 직접 설계해 보세요.
(1) 2진수 변환과 어떤 점이 같고 어떤 점이 다른가요?
(2) 10진수 26을 3진수로 바꾸세요.
(3) 이 방법으로 7진수, 5진수로도 바꿀 수 있나요? 왜 그런지 설명하세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 18 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[C+디버깅] C언어에서 float f = 0.1f; 를 선언하면 실제로 0.1이 저장되나요?
왜 그런지 이 유닛에서 배운 내용을 바탕으로 설명하세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="box box-summary avoid-break"><span class="box-label">이 유닛에서 깊이 배운 10축</span><div class="box-content"><b>[KOI]</b> 2진수↔10진수, 10진수↔2진수 변환. 2의 보수 변환+검증. 오버플로우 판단. BCD vs 2진수 비교. 실전 문제 4개+풀이<br><b>[디버깅]</b> 0.1+0.2≠0.3 버그. C코드로 직접 확인. 부동소수점 비교 올바른 방법(fabs)<br><b>[컴퓨팅사고력]</b> 알고리즘적 사고 — 나누기2 반복의 3요소(입력/과정/출력). N진법 변환 일반화<br><b>[C언어]</b> 0b1101로 2진수 직접 쓰기. 진수변환 C함수 구현. 0.1+0.2 버그 확인<br><b>[코딩기초]</b> 변환 후 검증 습관. 반복(루프)+조건 개념 예습<br><b>[하드웨어]</b> CPU는 2진수로 계산, 우리에게 10진수로 보여줌. 2의 보수 = CPU 표준<br><b>[실생활]</b> IP주소(192.168.1.1=32비트 2진수), 서브넷마스크, 메모리주소<br><b>[타과목]</b> 수학 — 라이프니츠, 불대수. 역사 — 2진수+전기스위치=컴퓨터</div></div>
<div class="box box-question avoid-break"><span class="box-label">[다음 유닛 미리보기]</span><div class="box-content">2진수가 너무 길어서 읽기 힘들죠? 1101 0011 1010 1111... 이걸 더 짧게 쓰는 방법이 있어요. 8진수와 16진수! 다음 유닛에서 알아봐요.</div></div>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-hello.svg" alt="마스코트" />
        <div class="mascot-bubble celebrate">진법 변환 완료! 이제 10진수를 2진수로, 2진수를 10진수로 바꿀 수 있어요. 음수 표현과 소수점까지! 이건 정보올림피아드 시험에도 나오니까 꼭 연습해 두세요!</div>
      </div>
</article>`,
            },
        ],
    },
    {
        id: 'cb-u05',
        unitNumber: 5,
        title: `8진수와 16진수`,
        type: '이론' as const,
        problems: [],
        pages: [
            {
                id: 'cb-u05-p1',
                title: `8진수와 16진수`,
                type: '페이지' as const,
                content: `<style>
/* ═══════════════════════════════════════════════════════════════
   코딩쏙 프리미엄 PDF 교재 스타일시트 v5.0
   Paged.js + A4 인쇄 최적화 + 아동교육 디자인 시스템
   ═══════════════════════════════════════════════════════════════ */

/* ── 리셋 & 기본 ── */
* { margin: 0; padding: 0; box-sizing: border-box; }

:root {
  --c-primary: #FF6B6B;
  --c-primary-light: #FFE8E8;
  --c-primary-dark: #E84545;
  --c-accent: #4ECDC4;
  --c-accent-light: #E8FFF9;
  --c-blue: #3B82F6;
  --c-blue-light: #EFF6FF;
  --c-purple: #8B5CF6;
  --c-purple-light: #F5F3FF;
  --c-orange: #F59E0B;
  --c-orange-light: #FFFBEB;
  --c-green: #10B981;
  --c-green-light: #ECFDF5;
  --c-red: #EF4444;
  --c-red-light: #FEF2F2;
  --c-teal: #14B8A6;
  --c-teal-light: #F0FDFA;
  --c-pink: #EC4899;
  --c-text: #1E293B;
  --c-text-secondary: #64748B;
  --c-text-muted: #94A3B8;
  --c-border: #E2E8F0;
  --c-bg-subtle: #F8FAFC;
  --c-bg-warm: #FFFBF5;
  --font-body: 'Pretendard', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-code: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;
  --radius-sm: 6px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 18px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.10);
}

/* ── 페이지 설정 ── */
@page {
  size: A4;
  margin: 18mm 17mm 15mm 22mm;
  @bottom-center {
    content: counter(page);
    font-family: var(--font-body);
    font-size: 9pt;
    color: var(--c-text-muted);
    letter-spacing: 1px;
  }
}
@page :first { @bottom-center { content: none; } }

body {
  font-family: var(--font-body);
  color: var(--c-text);
  background: white;
  font-size: 11.5pt;
  line-height: 180%;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  word-break: keep-all;
  overflow-wrap: break-word;
}

/* ── 페이지 제어 ── */
.avoid-break { break-inside: avoid !important; page-break-inside: avoid !important; }
h2, h3 { break-after: avoid !important; page-break-after: avoid !important; }
.page-break-hint { break-before: page !important; page-break-before: always !important; height: 0; margin: 0; padding: 0; }
p { orphans: 3; widows: 3; }

/* ═══════════════════════════════════════
   레슨 헤더 — 프리미엄 그래디언트 배너
   ═══════════════════════════════════════ */
.lesson-header {
  margin-bottom: 6mm;
  padding: 6mm 5mm 5mm;
  background: linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #FEC89A 100%);
  border-radius: var(--radius-xl);
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: var(--shadow-lg);
}
.lesson-header::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -10%;
  width: 140px;
  height: 140px;
  background: rgba(255,255,255,0.12);
  border-radius: 50%;
}
.lesson-header::after {
  content: '';
  position: absolute;
  bottom: -20%;
  left: 15%;
  width: 80px;
  height: 80px;
  background: rgba(255,255,255,0.08);
  border-radius: 50%;
}
.lesson-number {
  font-size: 10pt;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin-bottom: 2mm;
  letter-spacing: 2px;
  text-transform: uppercase;
  position: relative;
  z-index: 1;
}
.lesson-title {
  font-size: 24pt;
  font-weight: 900;
  line-height: 125%;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.15);
  position: relative;
  z-index: 1;
}
.lesson-summary {
  font-size: 11pt;
  color: rgba(255,255,255,0.9);
  margin-top: 2.5mm;
  font-weight: 400;
  position: relative;
  z-index: 1;
}

/* ═══════════════════════════════════════
   제목 계층 — 프리미엄 타이포그래피
   ═══════════════════════════════════════ */
h2 {
  font-size: 16pt;
  font-weight: 800;
  margin: 6mm 0 3mm;
  padding: 2mm 0 2mm 4.5mm;
  border-left: 4.5px solid var(--c-primary);
  color: var(--c-text);
  background: linear-gradient(90deg, var(--c-primary-light) 0%, transparent 60%);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  letter-spacing: -0.3px;
}
h3 {
  font-size: 13.5pt;
  font-weight: 700;
  color: #334155;
  margin: 4mm 0 2.5mm;
  padding-bottom: 1mm;
  border-bottom: 2px solid #F1F5F9;
}
p {
  margin-bottom: 2.5mm;
  text-align: justify;
  line-height: 175%;
  font-size: 11.5pt;
}

/* ── 인라인 코드 ── */
code {
  font-family: var(--font-code);
  font-size: 9.5pt;
  background: linear-gradient(135deg, #FEF3C7, #FDE68A);
  padding: 0.5mm 2mm;
  border-radius: 4px;
  color: #92400E;
  border: 1px solid #FCD34D;
  font-weight: 500;
}

/* ═══════════════════════════════════════
   코드 블록 — 프리미엄 IDE 스타일
   ═══════════════════════════════════════ */
.code-block {
  background: #0F172A;
  border-radius: var(--radius-md);
  padding: 0;
  margin: 3mm 0;
  box-shadow: var(--shadow-md), inset 0 1px 0 rgba(255,255,255,0.05);
  overflow: hidden;
  border: 1px solid #1E293B;
}
.code-block-header {
  font-family: var(--font-body);
  font-size: 8.5pt;
  font-weight: 600;
  color: #94A3B8;
  padding: 2.5mm 4.5mm;
  background: #1E293B;
  border-bottom: 1px solid #334155;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.code-block-header::before {
  content: '';
  display: inline-flex;
  width: 8px; height: 8px;
  background: #EF4444;
  border-radius: 50%;
  box-shadow: 14px 0 0 #F59E0B, 28px 0 0 #22C55E;
  flex-shrink: 0;
}
.code-table { width: 100%; border-collapse: collapse; }
.code-table td { vertical-align: top; padding: 0; }
.line-num {
  width: 10mm;
  text-align: right;
  padding: 0.5mm 3mm 0.5mm 0;
  font-family: var(--font-code);
  font-size: 8pt;
  color: #475569;
  line-height: 165%;
  user-select: none;
  background: rgba(0,0,0,0.15);
}
.line-code {
  font-family: var(--font-code);
  font-size: 10pt;
  color: #E2E8F0;
  line-height: 165%;
  padding: 0.5mm 4mm 0.5mm 3mm;
  white-space: pre;
}
.line-highlight td { background: rgba(59,130,246,0.12) !important; }
.line-highlight .line-num { color: var(--c-blue) !important; font-weight: 700; }

/* 신택스 컬러 — VS Code Dark+ 영감 */
.kw { color: #C084FC; font-weight: 500; }
.str { color: #86EFAC; }
.cmt { color: #6B7280; font-style: italic; }
.fn { color: #FDBA74; }
.pp { color: #F472B6; font-weight: 600; }
.num { color: #7DD3FC; }
.type { color: #5EEAD4; font-weight: 500; }
.mc { color: #67E8F9; }
.esc { color: #FCD34D; font-weight: 600; }
.fmt { color: #FCD34D; }

/* ═══════════════════════════════════════
   실행 결과 — 터미널 스타일
   ═══════════════════════════════════════ */
.output-block {
  background: #F0FDF4;
  border: 1.5px solid #86EFAC;
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin: 3mm 0;
  position: relative;
}
.output-label {
  font-family: var(--font-body);
  font-size: 8.5pt;
  color: var(--c-green);
  display: block;
  margin-bottom: 1.5mm;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.output-text {
  font-family: var(--font-code);
  font-size: 10.5pt;
  line-height: 160%;
  color: #166534;
}

/* ═══════════════════════════════════════
   박스 시스템 — 프리미엄 카드 디자인
   ═══════════════════════════════════════ */
.box {
  border-radius: var(--radius-md);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  position: relative;
  box-shadow: var(--shadow-sm);
}
.box-label {
  font-size: 10.5pt;
  font-weight: 800;
  margin-bottom: 2mm;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.box-content { font-size: 11pt; line-height: 170%; }
.box-warning {
  border-left: 5px solid var(--c-red);
  background: linear-gradient(135deg, #FEF2F2 0%, #FFF1F2 100%);
}
.box-warning .box-label { color: var(--c-red); }
.box-key {
  border-left: 5px solid var(--c-blue);
  background: linear-gradient(135deg, #EFF6FF 0%, #F0F9FF 100%);
}
.box-key .box-label { color: var(--c-blue); }
.box-tip {
  border-left: 5px solid var(--c-orange);
  background: linear-gradient(135deg, #FFFBEB 0%, #FEF9C3 50%, #FFFBEB 100%);
}
.box-tip .box-label { color: var(--c-orange); }
.box-summary {
  border-left: 5px solid var(--c-green);
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%);
  border: 1.5px solid #A7F3D0;
  border-left: 5px solid var(--c-green);
}
.box-summary .box-label { color: var(--c-green); }
.box-question {
  border-left: 5px solid var(--c-purple);
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
}
.box-question .box-label { color: var(--c-purple); }
.box-history {
  border-left: 5px solid var(--c-teal);
  background: linear-gradient(135deg, #F0FDFA 0%, #CCFBF1 100%);
}
.box-history .box-label { color: var(--c-teal); }

/* ═══════════════════════════════════════
   연습문제 — 프리미엄 카드
   ═══════════════════════════════════════ */
.exercise {
  background: white;
  border: 1.5px solid #E2E8F0;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  border-left: 5px solid var(--c-primary);
  box-shadow: var(--shadow-sm);
  position: relative;
}
.exercise-title {
  font-size: 13pt;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 2.5mm;
  display: flex;
  align-items: center;
  gap: 2mm;
}
.difficulty {
  display: inline-flex;
  align-items: center;
  font-size: 8pt;
  padding: 0.5mm 2.5mm;
  border-radius: 20px;
  margin-left: 2mm;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.diff-1 { background: #D1FAE5; color: #059669; }
.diff-2 { background: #FEF3C7; color: #D97706; }
.diff-3 { background: #FEE2E2; color: #DC2626; }
.memo-area {
  border: 2px dashed #CBD5E1;
  border-radius: var(--radius-md);
  padding: 3mm;
  min-height: 15mm;
  margin-top: 2.5mm;
  background: repeating-linear-gradient(
    transparent, transparent 7mm, #F1F5F9 7mm, #F1F5F9 7.5mm
  );
}
.memo-label { font-size: 8.5pt; color: var(--c-text-muted); font-style: italic; }

/* ── OX/Choice/Short ── */
.exercise-answer {
  font-size: 10pt;
  color: var(--c-green);
  margin-top: 2mm;
  padding: 1.5mm 3mm;
  background: var(--c-green-light);
  border-radius: var(--radius-sm);
  font-weight: 600;
  border: 1px solid #A7F3D0;
}
.exercise-explain {
  font-size: 9.5pt;
  color: var(--c-text-secondary);
  margin-top: 1.5mm;
  padding: 2mm 3mm;
  background: #F8FAFC;
  border-radius: var(--radius-sm);
  border-left: 3px solid #E2E8F0;
}
.choice-list { padding-left: 6mm; margin: 2mm 0; }
.choice-list li { font-size: 10.5pt; margin-bottom: 1.5mm; line-height: 150%; }
.choice-list li.choice-correct { color: var(--c-green); font-weight: 700; }

/* ═══════════════════════════════════════
   Before/After 비교 — 프리미엄 2컬럼
   ═══════════════════════════════════════ */
.compare {
  display: flex;
  gap: 3mm;
  margin: 3mm 0;
  overflow: hidden;
}
.compare-bad {
  flex: 1;
  min-width: 0;
  background: linear-gradient(135deg, #FEF2F2, #FFF1F2);
  border: 1.5px solid #FECACA;
  border-radius: var(--radius-md);
  padding: 3mm;
  overflow: hidden;
}
.compare-good {
  flex: 1;
  min-width: 0;
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border: 1.5px solid #A7F3D0;
  border-radius: var(--radius-md);
  padding: 3mm;
  overflow: hidden;
}
.compare code {
  font-size: 9pt;
  word-break: break-all;
  overflow-wrap: break-word;
  display: block;
  background: rgba(0,0,0,0.05);
  padding: 2mm 3mm;
  border-radius: var(--radius-sm);
  margin: 1.5mm 0;
  line-height: 155%;
  white-space: pre-wrap;
  border: none;
  color: inherit;
}
.compare-label { font-size: 9.5pt; font-weight: 800; margin-bottom: 1.5mm; }
.compare-bad .compare-label { color: var(--c-red); }
.compare-good .compare-label { color: var(--c-green); }
.compare-msg-bad { font-size: 9pt; color: var(--c-red); }
.compare-msg-good { font-size: 9pt; color: var(--c-green); }

/* ═══════════════════════════════════════
   챕터 시작 — 프리미엄 카드
   ═══════════════════════════════════════ */
.chapter-start-box { margin-bottom: 3mm; }
.learning-goals {
  background: linear-gradient(135deg, #FFF7ED 0%, #FFFBEB 100%);
  border-radius: var(--radius-lg);
  padding: 4mm 5mm;
  margin-bottom: 3mm;
  border: 1.5px solid #FED7AA;
  box-shadow: var(--shadow-sm);
}
.learning-goals h3 {
  font-size: 12pt;
  font-weight: 800;
  color: #EA580C;
  margin: 0 0 2.5mm;
  border: none;
  padding: 0;
}
.learning-goals ul { padding-left: 5mm; margin: 0; }
.learning-goals li { font-size: 11pt; margin-bottom: 1.5mm; line-height: 160%; color: #431407; }
.prereq-check {
  background: var(--c-blue-light);
  border-left: 5px solid var(--c-blue);
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin-bottom: 2.5mm;
}
.prereq-check h3 {
  font-size: 11pt;
  font-weight: 700;
  color: var(--c-blue);
  margin: 0 0 1.5mm;
  border: none;
  padding: 0;
}
.checklist { list-style: none; padding-left: 4mm; margin: 0; }
.checklist li { margin-bottom: 1mm; font-size: 10.5pt; }
.checklist li::before { content: '\\2610  '; font-size: 12pt; color: var(--c-text-muted); }
.progress-section { margin-top: 2.5mm; }
.progress-label { font-size: 9.5pt; color: var(--c-text-secondary); font-weight: 600; }
.progress-bar {
  background: #E2E8F0;
  border-radius: 6px;
  height: 4mm;
  margin-top: 1.5mm;
  overflow: hidden;
}
.progress-fill {
  background: linear-gradient(90deg, var(--c-primary), #FF8E53, #FEC89A);
  height: 100%;
  border-radius: 6px;
}

/* ═══════════════════════════════════════
   Predict — 생각해보기 카드
   ═══════════════════════════════════════ */
.predict-box {
  display: flex;
  gap: 3.5mm;
  background: linear-gradient(135deg, #F5F3FF 0%, #EDE9FE 100%);
  border: 1.5px solid #C4B5FD;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
  box-shadow: var(--shadow-sm);
}
.predict-icon {
  width: 10mm; height: 10mm;
  background: linear-gradient(135deg, var(--c-purple), #A78BFA);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16pt;
  font-weight: 900;
  flex-shrink: 0;
  box-shadow: 0 2px 6px rgba(139,92,246,0.3);
}
.predict-content { flex: 1; }
.predict-content p { font-size: 11pt; margin-bottom: 2mm; }

/* ═══════════════════════════════════════
   다이어그램 — 프리미엄 컨테이너
   ═══════════════════════════════════════ */
.diagram-box {
  background: var(--c-bg-subtle);
  border: 1.5px solid var(--c-border);
  border-radius: var(--radius-lg);
  padding: 4mm;
  margin: 3.5mm 0;
  box-shadow: var(--shadow-sm);
}
.diagram-title {
  font-size: 11pt;
  font-weight: 800;
  color: var(--c-primary);
  margin-bottom: 3mm;
  text-align: center;
  letter-spacing: 0.3px;
}
.diagram-content { font-size: 10.5pt; line-height: 170%; }
.diagram-content .d-row { display: flex; align-items: center; justify-content: center; gap: 3mm; margin: 2mm 0; }
.diagram-content .d-block { background: #1E293B; color: white; padding: 2mm 4mm; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 9.5pt; font-weight: 500; }
.diagram-content .d-block-highlight { background: linear-gradient(135deg, var(--c-primary), #FF8E53); color: white; padding: 2mm 4mm; border-radius: var(--radius-sm); font-family: var(--font-code); font-size: 9.5pt; font-weight: 700; }
.diagram-content .d-arrow { color: var(--c-text-muted); font-size: 14pt; }
.diagram-content .d-label { font-size: 8.5pt; color: var(--c-text-secondary); }

/* ═══════════════════════════════════════
   Steps — 프리미엄 타임라인
   ═══════════════════════════════════════ */
.steps-visual { margin: 3mm 0; }
.step-item {
  display: flex;
  align-items: flex-start;
  gap: 3.5mm;
  margin-bottom: 1.5mm;
}
.step-num {
  width: 8mm; height: 8mm;
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10pt;
  font-weight: 800;
  flex-shrink: 0;
  margin-top: 0.5mm;
  box-shadow: 0 2px 4px rgba(255,107,107,0.3);
}
.step-body { flex: 1; }
.step-title { font-size: 11pt; font-weight: 700; margin-bottom: 0.5mm; color: var(--c-text); }
.step-desc { font-size: 10.5pt; color: var(--c-text-secondary); line-height: 160%; }
.step-connector { width: 2.5px; height: 4mm; background: linear-gradient(180deg, var(--c-primary), transparent); margin-left: 3.7mm; }

/* ═══════════════════════════════════════
   Modify — 바꿔보기 카드
   ═══════════════════════════════════════ */
.modify-box {
  background: linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%);
  border: 1.5px solid #7DD3FC;
  border-left: 5px solid #0EA5E9;
  border-radius: var(--radius-md);
  padding: 3.5mm 4.5mm;
  margin: 3mm 0;
}
.modify-label { font-size: 10.5pt; font-weight: 800; color: #0284C7; margin-bottom: 2mm; }
.modify-hint { font-size: 9.5pt; color: var(--c-text-secondary); font-style: italic; margin: 1.5mm 0; }

/* ═══════════════════════════════════════
   정답 섹션
   ═══════════════════════════════════════ */
.answers-section {
  background: white;
  border: 1.5px solid #E9D5FF;
  border-radius: var(--radius-md);
  padding: 3mm 4mm;
  margin: 3mm 0;
  border-left: 5px solid var(--c-purple);
}
.answers-section h3 {
  font-size: 12pt;
  font-weight: 800;
  color: var(--c-purple);
  margin: 0 0 2.5mm;
  border: none;
  padding: 0;
}
.answer-item { margin-bottom: 1mm; font-size: 10pt; line-height: 150%; }
.answer-num { font-weight: 700; color: var(--c-primary); margin-right: 2mm; }
.answer-text { color: var(--c-text); }

/* ═══════════════════════════════════════
   코드 설명 (라인별)
   ═══════════════════════════════════════ */
.code-explain { margin: 3mm 0; padding-left: 2mm; }
.code-explain-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2.5mm;
  font-size: 11pt;
  line-height: 165%;
}
.code-explain-line {
  font-family: var(--font-code);
  font-size: 9pt;
  color: white;
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  padding: 0.5mm 2.5mm;
  border-radius: 4px;
  margin-right: 3mm;
  flex-shrink: 0;
  font-weight: 700;
  box-shadow: 0 1px 3px rgba(255,107,107,0.3);
}

/* ═══════════════════════════════════════
   용어 정리 — 프리미엄 테이블
   ═══════════════════════════════════════ */
.glossary { margin: 3mm 0; break-inside: avoid; }
.glossary-item {
  display: flex;
  margin-bottom: 0;
  font-size: 10pt;
  padding: 2mm 3mm;
  border-bottom: 1px solid #F1F5F9;
}
.glossary-item:nth-child(odd) { background: #F8FAFC; }
.glossary-item:first-child { border-radius: var(--radius-sm) var(--radius-sm) 0 0; }
.glossary-item:last-child { border-radius: 0 0 var(--radius-sm) var(--radius-sm); border-bottom: none; }
.glossary-term {
  font-weight: 700;
  min-width: 28mm;
  flex-shrink: 0;
  color: var(--c-text);
  font-family: var(--font-code);
  font-size: 9.5pt;
}
.glossary-def { color: var(--c-text-secondary); line-height: 155%; }

/* ═══════════════════════════════════════
   추적 테이블 — 프리미엄 데이터 테이블
   ═══════════════════════════════════════ */
.trace-table { margin: 3.5mm 0; }
.trace-caption { font-size: 10.5pt; font-weight: 700; color: var(--c-primary); margin-bottom: 2mm; }
.trace-table table { width: 100%; border-collapse: collapse; font-size: 10pt; border-radius: var(--radius-sm); overflow: hidden; }
.trace-table th {
  background: linear-gradient(135deg, #1E293B, #334155);
  color: white;
  padding: 2mm 3.5mm;
  text-align: left;
  font-weight: 700;
  font-size: 9.5pt;
}
.trace-table td { padding: 2mm 3.5mm; border-bottom: 1px solid #F1F5F9; font-family: var(--font-code); font-size: 9.5pt; }
.trace-table tr:nth-child(even) td { background: #F8FAFC; }

/* ═══════════════════════════════════════
   마스코트 말풍선 — 프리미엄 디자인
   ═══════════════════════════════════════ */
.mascot-speech {
  display: flex;
  align-items: flex-start;
  gap: 3.5mm;
  margin: 3.5mm 0;
}
.mascot-speech.right { flex-direction: row-reverse; }
.mascot-speech-img {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.15));
}
.mascot-speech-img.small { width: 48px; height: 48px; }
.mascot-speech-img.large { width: 80px; height: 80px; }
.mascot-bubble {
  position: relative;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  border: 1.5px solid #93C5FD;
  border-radius: var(--radius-lg);
  padding: 3.5mm 4.5mm;
  font-size: 10.5pt;
  color: #1E3A5F;
  line-height: 1.6;
  flex: 1;
  max-width: 85%;
  box-shadow: var(--shadow-sm);
}
.mascot-bubble.warn {
  background: linear-gradient(135deg, #FEF2F2, #FEE2E2);
  border-color: #FCA5A5;
  color: #7F1D1D;
}
.mascot-bubble.success {
  background: linear-gradient(135deg, #ECFDF5, #D1FAE5);
  border-color: #6EE7B7;
  color: #14532D;
}
.mascot-bubble.tip {
  background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  border-color: #FCD34D;
  color: #78350F;
}
.mascot-bubble::before {
  content: '';
  position: absolute;
  top: 14px;
  left: -9px;
  border: 7px solid transparent;
  border-right-color: #93C5FD;
}
.mascot-bubble::after {
  content: '';
  position: absolute;
  top: 15px;
  left: -7px;
  border: 6px solid transparent;
  border-right-color: #EFF6FF;
}
.mascot-speech.right .mascot-bubble::before {
  left: auto; right: -9px;
  border-right-color: transparent;
  border-left-color: #93C5FD;
}
.mascot-speech.right .mascot-bubble::after {
  left: auto; right: -7px;
  border-right-color: transparent;
  border-left-color: #EFF6FF;
}
.mascot-bubble.warn::before { border-right-color: #FCA5A5; }
.mascot-bubble.warn::after { border-right-color: #FEF2F2; }
.mascot-speech.right .mascot-bubble.warn::before { border-right-color: transparent; border-left-color: #FCA5A5; }
.mascot-speech.right .mascot-bubble.warn::after { border-right-color: transparent; border-left-color: #FEF2F2; }
.mascot-bubble.success::before { border-right-color: #6EE7B7; }
.mascot-bubble.success::after { border-right-color: #ECFDF5; }
.mascot-speech.right .mascot-bubble.success::before { border-right-color: transparent; border-left-color: #6EE7B7; }
.mascot-speech.right .mascot-bubble.success::after { border-right-color: transparent; border-left-color: #ECFDF5; }
.mascot-bubble.tip::before { border-right-color: #FCD34D; }
.mascot-bubble.tip::after { border-right-color: #FFFBEB; }
.mascot-speech.right .mascot-bubble.tip::before { border-right-color: transparent; border-left-color: #FCD34D; }
.mascot-speech.right .mascot-bubble.tip::after { border-right-color: transparent; border-left-color: #FFFBEB; }

/* ═══════════════════════════════════════
   Fact Bite — 숫자/팩트 강조 카드
   ═══════════════════════════════════════ */
.fact-bite {
  display: flex;
  align-items: center;
  gap: 4mm;
  margin: 3mm 0;
  background: linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 50%, #FFF1F2 100%);
  border-radius: var(--radius-lg);
  padding: 3.5mm 5mm;
  border: 1.5px solid #FECDD3;
  box-shadow: var(--shadow-sm);
}
.fact-bite-number {
  font: 900 28pt var(--font-body);
  background: linear-gradient(135deg, var(--c-primary), #FF8E53);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  white-space: nowrap;
  flex-shrink: 0;
}
.fact-bite-text { font-size: 10pt; color: var(--c-text-secondary); line-height: 1.5; }

/* ═══════════════════════════════════════
   Visual Summary — 핵심 정리 카드
   ═══════════════════════════════════════ */
.visual-summary {
  background: linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 50%, #A7F3D0 100%);
  border: 1.5px solid #6EE7B7;
  border-radius: var(--radius-xl);
  padding: 5mm;
  margin: 4mm 0;
  box-shadow: var(--shadow-md);
}
.visual-summary-title {
  font-size: 14pt;
  font-weight: 900;
  color: #065F46;
  text-align: center;
  margin-bottom: 3mm;
}
.visual-summary-items { display: flex; flex-direction: column; gap: 2mm; }
.visual-summary-item {
  display: flex;
  align-items: flex-start;
  gap: 3mm;
  background: rgba(255,255,255,0.7);
  padding: 2.5mm 3.5mm;
  border-radius: var(--radius-md);
  backdrop-filter: blur(4px);
}
.visual-summary-num {
  width: 7mm; height: 7mm;
  background: linear-gradient(135deg, #059669, #10B981);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9pt;
  font-weight: 800;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(5,150,105,0.3);
}

/* ═══════════════════════════════════════
   10축 매핑 전용 스타일
   ═══════════════════════════════════════ */
.axis-section {
  background: linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%);
  border: 1.5px solid #CBD5E1;
  border-radius: var(--radius-xl);
  padding: 5mm;
  margin: 5mm 0;
  box-shadow: var(--shadow-md);
  page-break-inside: avoid;
}
.axis-title {
  font-size: 14pt;
  font-weight: 900;
  text-align: center;
  margin-bottom: 4mm;
  color: var(--c-text);
  letter-spacing: -0.3px;
}
.axis-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5mm;
}
.axis-item {
  display: flex;
  align-items: flex-start;
  gap: 2mm;
  padding: 2.5mm 3mm;
  border-radius: var(--radius-md);
  background: white;
  border: 1px solid #E2E8F0;
}
.axis-badge {
  font-size: 7.5pt;
  font-weight: 800;
  padding: 0.5mm 2.5mm;
  border-radius: 20px;
  flex-shrink: 0;
  letter-spacing: 0.3px;
  white-space: nowrap;
}
.axis-badge.c-lang { background: #DBEAFE; color: #1D4ED8; }
.axis-badge.thinking { background: #E0E7FF; color: #4338CA; }
.axis-badge.debug { background: #FEE2E2; color: #DC2626; }
.axis-badge.koi { background: #FEF3C7; color: #B45309; }
.axis-badge.basics { background: #D1FAE5; color: #059669; }
.axis-badge.reallife { background: #CCFBF1; color: #0D9488; }
.axis-badge.crosssubj { background: #E9D5FF; color: #7C3AED; }
.axis-badge.project { background: #FFE4E6; color: #BE123C; }
.axis-badge.ai { background: #FCE7F3; color: #DB2777; }
.axis-badge.hardware { background: #CFFAFE; color: #0891B2; }
.axis-text { font-size: 9.5pt; line-height: 150%; color: var(--c-text-secondary); }

/* ── TOC ── */
.toc { margin: 5mm 0; }
.toc h2 { border: none; padding: 0; margin-bottom: 3mm; background: none; }
.toc ul { list-style: none; padding: 0; }
.toc-h2 { display: flex; align-items: baseline; margin-bottom: 1.5mm; font-size: 11pt; }
.toc-text { flex-shrink: 0; }
.toc-dots { flex: 1; border-bottom: 1.5px dotted #CBD5E1; margin: 0 2mm; min-width: 10mm; }
.toc-page { flex-shrink: 0; color: var(--c-text-muted); font-size: 10pt; }

/* ── Margin Note ── */
.margin-note {
  float: right;
  width: 30mm;
  font-size: 8.5pt;
  color: var(--c-text-secondary);
  background: linear-gradient(135deg, #FFFBEB, #FEF3C7);
  padding: 2mm 2.5mm;
  border-radius: var(--radius-sm);
  margin: 0 -35mm 2mm 2mm;
  border-left: 2.5px solid var(--c-orange);
}

/* ── Cross Reference ── */
.crossref { font-size: 9pt; color: var(--c-blue); font-style: italic; font-weight: 500; }

/* ── Image ── */
.image-block { margin: 3.5mm 0; text-align: center; }
.image-block img { max-width: 100%; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); }
.image-caption {
  font-size: 9pt;
  color: var(--c-text-secondary);
  margin-top: 2mm;
  font-style: italic;
  background: var(--c-bg-subtle);
  padding: 1.5mm 4mm;
  border-radius: 20px;
  display: inline-block;
}

/* ═══════════════════════════════════════
   v7.0 — 80레이어 리서치 증강분
   v5 프리미엄 기반 + TEXTBOOK-DESIGN-DEEP P1~P6 합성
   ═══════════════════════════════════════ */

/* ── Layer 26: 게슈탈트 근접성 강화 ── */
h2 + p,
h3 + p,
h2 + .code-block,
h3 + .code-block { margin-top: 1mm !important; }
.code-block + .code-explain { margin-top: 0.5mm; }
.code-block + .output-block { margin-top: 1mm; }
.exercise + .exercise { margin-top: 1.5mm; }

/* ── Layer 28: 마이크로 타이포그래피 ── */
body {
  font-kerning: auto;
  font-variant-ligatures: common-ligatures;
  hanging-punctuation: first last;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.line-num { font-variant-numeric: tabular-nums; }
.trace-table td { font-variant-numeric: tabular-nums; }

/* ── Layer 29: 연습문제 유형별 스타일 ── */
.exercise-item { margin-bottom: 2mm; font-size: 11pt; line-height: 165%; }
.exercise-item p { margin-bottom: 1.5mm; }
.exercise-blank { display: inline-block; min-width: 20mm; border-bottom: 2px solid var(--c-primary); margin: 0 1mm; }
.exercise-ox-grid { display: flex; gap: 3mm; margin-top: 2mm; }
.exercise-ox-item { flex: 1; padding: 2mm 3mm; border: 1px solid var(--c-border); border-radius: var(--radius-sm); font-size: 10pt; }
.exercise-matching { display: grid; grid-template-columns: 1fr auto 1fr; gap: 1.5mm; font-size: 10pt; }
.exercise-reorder { display: flex; flex-direction: column; gap: 1mm; font-family: var(--font-code); font-size: 9.5pt; }
.exercise-reorder-item { background: var(--c-bg-subtle); padding: 1.5mm 3mm; border-radius: var(--radius-sm); border: 1px solid var(--c-border); }

/* ── Layer 30: 교사용 에디션 ── */
.teacher-only { background: #FFF5F5; border: 2px dashed #E74C3C; padding: 3mm; border-radius: var(--radius-md); }
.teacher-note { font-size: 9pt; color: #C0392B; font-style: italic; }

/* ── Layer 32: 디자인 토큰 — 인쇄용 간격 ── */
article > * + * { margin-top: 2.5mm; }
article > h2 { margin-top: 5mm; }
article > h3 { margin-top: 3.5mm; }

/* ── Layer 51: 황금비 타이포 ──
   24pt / 16pt / 13.5pt / 11.5pt = 1:0.67:0.56:0.48 ≈ 피보나치 */

/* ── Layer 55: 인지부하 최적화 — 시각 앵커 ── */
h2::before {
  /* 빈 블록으로 스크롤 앵커 역할 — Paged.js에서 러닝헤드 지원 */
}

/* ── Layer 56: 아이트래킹 — F패턴 강화 ── */
.lesson-header .lesson-number { font-weight: 700; }
.box-label::before {
  content: '';
  display: inline-block;
  width: 3px; height: 14px;
  border-radius: 2px;
  margin-right: 1.5mm;
  flex-shrink: 0;
}
.box-warning .box-label::before { background: var(--c-red); }
.box-key .box-label::before { background: var(--c-blue); }
.box-tip .box-label::before { background: var(--c-orange); }
.box-summary .box-label::before { background: var(--c-green); }
.box-question .box-label::before { background: var(--c-purple); }
.box-history .box-label::before { background: var(--c-teal); }

/* ── Layer 58: 색상 조화 60-30-10 강화 ── */
/* 60% = white/neutral, 30% = brand gradient accents, 10% = c-primary strong */

/* ── Layer 60: 코드 블록 — 브래킷 컬러링 (Layer 30 from Deep) ── */
.brace-1 { color: #C084FC; font-weight: bold; }
.brace-2 { color: #86EFAC; font-weight: bold; }
.brace-3 { color: #FDBA74; font-weight: bold; }
.brace-4 { color: #7DD3FC; font-weight: bold; }

/* ── Layer 61: 인덴트 가이드 ── */
.indent-guide { border-left: 1px solid rgba(255,255,255,0.08); }

/* ── Layer 65: 10축 매핑 강화 ── */
.axis-item { transition: none; }
.axis-section .box-content { font-size: 10pt; }

/* ── Layer 67: 자료구조 시각화 ── */
.ds-visual { font-family: var(--font-code); font-size: 9pt; text-align: center; margin: 3mm 0; }
.ds-array { display: flex; justify-content: center; gap: 0; }
.ds-cell { width: 9mm; height: 9mm; border: 1.5px solid var(--c-blue); display: flex; align-items: center; justify-content: center; font-weight: 700; }
.ds-cell:first-child { border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
.ds-cell:last-child { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.ds-index { font-size: 7pt; color: var(--c-text-muted); text-align: center; margin-top: 0.5mm; }

/* ── Layer 68: 학습 저널 공간 ── */
.reflection-box {
  background: var(--c-bg-warm);
  border: 1.5px dashed #FCD34D;
  border-radius: var(--radius-lg);
  padding: 4mm;
  margin: 4mm 0;
}
.reflection-prompt { font-size: 10pt; color: var(--c-orange); font-weight: 700; margin-bottom: 2mm; }
.reflection-lines {
  min-height: 20mm;
  background: repeating-linear-gradient(transparent, transparent 7mm, #FEF3C7 7mm, #FEF3C7 7.5mm);
}

/* ── Layer 69: 루브릭/자기평가 ── */
.rubric-table { width: 100%; border-collapse: collapse; font-size: 9pt; margin: 3mm 0; }
.rubric-table th { background: var(--c-purple); color: white; padding: 2mm; text-align: center; }
.rubric-table td { padding: 2mm; border: 1px solid var(--c-border); text-align: center; }
.self-check { display: flex; gap: 5mm; justify-content: center; margin: 3mm 0; }
.self-check-item { text-align: center; font-size: 18pt; }
.self-check-label { font-size: 7.5pt; color: var(--c-text-secondary); }

/* ── Layer 72: 교실 게임 보드 ── */
.bingo-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1px; background: var(--c-border); border-radius: var(--radius-md); overflow: hidden; margin: 3mm 0; }
.bingo-cell { background: white; padding: 3mm; text-align: center; font-size: 8.5pt; font-family: var(--font-code); min-height: 10mm; display: flex; align-items: center; justify-content: center; }
.bingo-free { background: var(--c-primary-light); font-weight: 800; color: var(--c-primary); }

/* ── Layer 77: 북마크/읽기 가이드 ──  */
.reading-ruler { border-top: 3px solid var(--c-primary); margin: 4mm 0; opacity: 0.3; }

/* ── Layer 78: 고급 그리드 — 2컬럼 레이아웃 ── */
.two-col { display: flex; gap: 4mm; }
.two-col > * { flex: 1; min-width: 0; }
.three-col { display: flex; gap: 3mm; }
.three-col > * { flex: 1; min-width: 0; }

/* ── Layer 80: 인쇄 품질 마커 ── */
.print-crop-mark { display: none; }

/* ═══════════════════════════════════════
   인쇄 최적화 — 강화 버전 (Layer 77~80)
   ═══════════════════════════════════════ */
@media print {
  body {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .lesson-header,
  .code-block,
  .box,
  .exercise,
  .predict-box,
  .compare-bad,
  .compare-good,
  .step-num,
  .mascot-bubble,
  .visual-summary,
  .axis-section,
  .trace-table th,
  .progress-fill,
  .code-explain-line,
  .fact-bite,
  .diff-1, .diff-2, .diff-3,
  .diagram-box,
  .modify-box,
  .answers-section {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .no-print { display: none !important; }
  /* orphan/widow 강화 */
  p { orphans: 3; widows: 3; }
  h2, h3 { break-after: avoid; }
  .avoid-break { break-inside: avoid; }
}

</style>
<article id="content">
  <header class="lesson-header" role="banner">
    <div class="lesson-number">Lesson 0-5</div>
    <h1 class="lesson-title">8진수와 16진수</h1>
    <div class="lesson-summary">2진수가 너무 길 때, 짧게 줄여서 쓰는 방법을 배워요. 색상 코드, 유니코드, 메모리 덤프까지!</div>
  </header>
<div class="chapter-start-box avoid-break"><div class="learning-goals"><h3>📚 이번에 배울 것</h3><ul><li>8진수와 16진수가 왜 필요한지 알 수 있어요.</li><li>2진수를 8진수, 16진수로 바꿀 수 있어요.</li><li>16진수에서 A~F가 무슨 뜻인지 알아요.</li><li>16진수 색상 코드(RGB/RGBA)를 이해하고 읽을 수 있어요.</li><li>유니코드, 파일 시그니처, MAC 주소 등 실무 활용을 알아요.</li><li>임의의 진법 간 변환 알고리즘을 이해해요.</li></ul></div><div class="prereq-check"><h3>✅ 시작 전 체크</h3><ul class="checklist"><li>2진수와 10진수 변환을 할 수 있다 (U0-04)</li><li>비트가 무엇인지 안다 (U0-03)</li></ul></div><div class="progress-section"><span class="progress-label">Part 1 진행률: 5%</span><div class="progress-bar"><div class="progress-fill" style="width:5%"></div></div></div></div>
<h2>2진수, 너무 길어!</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-hello.svg" alt="마스코트" />
        <div class="mascot-bubble ">안녕! 오늘은 2진수를 <b>짧게 줄여 쓰는 방법</b>을 알려줄게. 2진수 11111111... 이렇게 쓰면 눈이 아프잖아!</div>
      </div>
<p>지난 시간에 2진수를 배웠어요. 그런데 숫자가 조금만 커져도 2진수는 엄청 길어져요.</p>
<p>10진수 <b>255</b>를 2진수로 쓰면 <b>11111111</b> — 무려 8자리예요. 10진수 <b>1000</b>은? 2진수로 <b>1111101000</b> — 10자리나 돼요. 이렇게 길면 읽다가 실수하기 딱 좋아요.</p>
<p>그래서 프로그래머들이 생각해낸 방법이 있어요. 2진수를 <b>묶어서</b> 짧게 쓰는 거예요. 3비트씩 묶으면 <b>8진수</b>, 4비트씩 묶으면 <b>16진수</b>가 돼요.</p>
<div class="fact-bite avoid-break"><div class="fact-bite-number">undefined</div><div class="fact-bite-text">32비트 메모리 주소를 2진수로 쓰면 32자리... 하지만 16진수로 쓰면 겨우 8자리! 프로그래머들이 16진수를 좋아하는 이유예요.</div></div>
<h2>8진수: 3비트씩 묶기</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble tip">8진수는 0부터 7까지만 써요. 왜 7까지냐면, 3비트로 표현할 수 있는 가장 큰 수가 111(2) = 7이니까요!</div>
      </div>
<p>8진수는 <b>3비트씩 묶어서</b> 하나의 숫자로 바꾸는 거예요. 3비트로 만들 수 있는 숫자는 000(0)부터 111(7)까지, 총 8개예요. 그래서 8진수라고 해요.</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/binary-to-octal.svg" alt="2진수 101110을 3비트씩 묶어서 8진수 56으로 변환하는 과정" style="max-width:100%"/><div class="image-caption">3비트씩 묶으면 8진수 한 자리가 돼요</div></div>
<p>방법은 간단해요. 2진수를 <b>오른쪽부터</b> 3비트씩 끊고, 각 묶음을 10진수로 바꾸면 돼요. 왼쪽 묶음에 비트가 모자라면 앞에 0을 붙여요.</p>
<div class="steps-visual avoid-break"></div>
<h2>16진수: 4비트씩 묶기</h2>
<p>16진수는 <b>4비트씩 묶어서</b> 하나의 숫자로 바꾸는 거예요. 4비트로 만들 수 있는 숫자는 0000(0)부터 1111(15)까지, 총 16개예요.</p>
<p>그런데 문제가 하나 있어요. 10, 11, 12, 13, 14, 15는 숫자가 두 자리잖아요? 한 자리로 써야 하니까 <b>알파벳</b>을 빌려 써요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 16진수 숫자</span><div class="box-content">0, 1, 2, 3, 4, 5, 6, 7, 8, 9, <b>A(10)</b>, <b>B(11)</b>, <b>C(12)</b>, <b>D(13)</b>, <b>E(14)</b>, <b>F(15)</b><br>대문자 소문자 상관없어요. A든 a든 같은 뜻이에요.</div></div>
<div class="image-block avoid-break"><img src="/images/svg-assets/binary-to-hex.svg" alt="2진수 11011010을 4비트씩 묶어서 16진수 DA로 변환하는 과정" style="max-width:100%"/><div class="image-caption">4비트씩 묶으면 16진수 한 자리가 돼요</div></div>
<div class="compare avoid-break"><div class="compare-bad"><div class="compare-label">✕ 잘못된 코드</div><code></code><br><span class="compare-msg-bad"></span></div><div class="compare-good"><div class="compare-label">✓ 올바른 코드</div><code></code><br><span class="compare-msg-good"></span></div></div>
<h2>16진수가 특히 편한 이유</h2>
<p>컴퓨터 세계에서는 8진수보다 16진수를 훨씬 많이 써요. 이유가 있어요.</p>
<p>1바이트 = 8비트잖아요? 8비트를 4비트씩 나누면 딱 <b>2묶음</b>이에요. 그래서 1바이트를 16진수 2자리로 깔끔하게 쓸 수 있어요. 예를 들어 11111111(2) = FF(16). 8자리가 2자리로 줄었어요!</p>
<div class="image-block avoid-break"><img src="/images/svg-assets/number-systems-table.svg" alt="10진수, 2진수, 8진수, 16진수 비교표" style="max-width:100%"/><div class="image-caption">같은 숫자를 네 가지 진법으로 비교해 보세요</div></div>
<h2>C언어에서 진법 표기</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-celebrate.svg" alt="마스코트" />
        <div class="mascot-bubble success">나중에 C언어를 배우면 코드에서 16진수를 직접 쓸 수 있어요. 지금은 '이런 게 있구나' 정도만 알아두면 돼요!</div>
      </div>
<div class="box box-tip avoid-break"><span class="box-label">[C 연결 미리보기] 코드에서 진법 쓰기</span><div class="box-content">C언어에서는 숫자 앞에 표시를 붙여서 진법을 알려줘요.<br><b>0x1A</b> → 16진수 (앞에 0x)<br><b>017</b> → 8진수 (앞에 0)<br><b>26</b> → 10진수 (그냥 숫자)<br>printf에서 <b>%x</b>로 16진수, <b>%o</b>로 8진수를 출력할 수 있어요.</div></div>
<div class="code-block avoid-break">
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span></td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code"><span class="type">int</span> <span class="fn">main</span>() {</td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code">    <span class="type">int</span> a = <span class="num">0x1A</span>;   <span class="cmt">// 16진수 1A = 26</span></td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code">    <span class="type">int</span> b = <span class="num">017</span>;    <span class="cmt">// 8진수 17 = 15</span></td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code">    <span class="type">int</span> c = <span class="num">26</span>;     <span class="cmt">// 10진수 26</span></td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code">    </td></tr>
<tr class=""><td class="line-num">8</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"16진수 0x1A = <span class="fmt">%d</span> (10진수)<span class="esc">\\n</span>"</span>, a);</td></tr>
<tr class=""><td class="line-num">9</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"8진수 017 = <span class="fmt">%d</span> (10진수)<span class="esc">\\n</span>"</span>, b);</td></tr>
<tr class=""><td class="line-num">10</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"26을 16진수로: <span class="fmt">%x</span><span class="esc">\\n</span>"</span>, c);</td></tr>
<tr class=""><td class="line-num">11</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"26을 8진수로: <span class="fmt">%o</span><span class="esc">\\n</span>"</span>, c);</td></tr>
<tr class=""><td class="line-num">12</td><td class="line-code">    <span class="kw">return</span> <span class="num">0</span>;</td></tr>
<tr class=""><td class="line-num">13</td><td class="line-code">}</td></tr></table></div>
<div class="output-block avoid-break"><span class="output-label">실행 결과</span><div class="output-text">16진수 0x1A = 26 (10진수)
8진수 017 = 15 (10진수)
26을 16진수로: 1a
26을 8진수로: 32</div></div>
<h2>직접 변환해 보기</h2>
<p>진법 변환은 손으로 여러 번 해봐야 익숙해져요. 아래 순서를 따라해 보세요.</p>
<div class="box box-tip avoid-break"><span class="box-label">[활동] 변환 연습</span><div class="box-content"><b>2진수 → 16진수</b><br>1단계: 오른쪽부터 4비트씩 묶기<br>2단계: 각 묶음을 0~F로 바꾸기<br><br><b>16진수 → 2진수</b><br>1단계: 각 자리를 4비트 2진수로 바꾸기<br>2단계: 이어 붙이기<br><br>예: 0x3F → 0011 1111 → 00111111(2)</div></div>
<div class="steps-visual avoid-break"></div>
<h2>🎨 16진수 색상 코드 (RGB)</h2>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">웹 디자인할 때 보는 #FF6B6B 같은 색상 코드! 이게 바로 16진수예요. 어떻게 읽는지 알아볼까요?</div>
      </div>
<p>웹에서 색상을 표현할 때 <b>#RRGGBB</b> 형식의 16진수를 사용해요. R(빨강), G(초록), B(파랑) 각각 00~FF (0~255) 값을 가져요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] RGB 색상 코드 읽기</span><div class="box-content"><b>#FF6B6B</b> 분석:<br>• FF = 255 (빨강 최대!)<br>• 6B = 107 (초록 중간)<br>• 6B = 107 (파랑 중간)<br>→ 밝은 빨간색 (산호색)<br><br><b>자주 쓰는 색상:</b><br>• #000000 = 검정 (R=0, G=0, B=0)<br>• #FFFFFF = 흰색 (R=255, G=255, B=255)<br>• #FF0000 = 빨강<br>• #00FF00 = 초록<br>• #0000FF = 파랑<br>• #FFFF00 = 노랑 (빨강 + 초록)</div></div>
<p>16진수 한 자리는 4비트, 두 자리는 8비트 = 1바이트예요. 그래서 RGB 색상 코드의 각 색상은 정확히 1바이트로 표현되고, 전체 색상은 3바이트(24비트)예요. 이래서 '24비트 트루컬러'라고 부르는 거예요.</p>
<h2>[심화] RGBA와 투명도</h2>
<p>RGB에 <b>A(Alpha, 투명도)</b>를 추가하면 RGBA가 돼요. A도 00~FF(0~255) 값으로 표현해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] RGBA 색상</span><div class="box-content"><b>#FF6B6B80</b> → 마지막 2자리 80이 투명도<br>• 80(16) = 128(10) → 약 50% 투명<br>• 00 = 완전 투명<br>• FF = 완전 불투명<br><br>CSS에서는 <code>rgba(255, 107, 107, 0.5)</code> 형태로도 쓸 수 있어요.<br>0.5 = 50% 투명도 = 16진수로 약 80</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[팁] HSL 색상 체계</span><div class="box-content">RGB 말고 <b>HSL</b>이라는 색상 체계도 있어요.<br>• <b>H (Hue, 색조)</b>: 0°~360° (0°=빨강, 120°=초록, 240°=파랑)<br>• <b>S (Saturation, 채도)</b>: 0%~100% (0%=회색, 100%=선명)<br>• <b>L (Lightness, 명도)</b>: 0%~100% (0%=검정, 100%=흰색)<br><br>RGB ↔ HSL 변환은 프로그래밍에서 자주 하는 작업이에요.<br>CSS: <code>hsl(0, 100%, 70%)</code> = 밝은 빨간색</div></div>
<h2>🔤 유니코드와 16진수</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">한글 '가'를 컴퓨터에 저장하면 어떤 숫자가 될까요? 유니코드는 전 세계 모든 문자에 16진수 번호를 붙여놨어요!</div>
      </div>
<p><b>유니코드(Unicode)</b>는 전 세계 모든 문자에 고유한 번호(코드 포인트)를 부여한 표준이에요. 이 번호를 <b>16진수</b>로 표현해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 유니코드 코드 포인트</span><div class="box-content">형식: <b>U+XXXX</b> (X는 16진수)<br><br>• U+0041 = 'A' (영문 대문자)<br>• U+0061 = 'a' (영문 소문자)<br>• U+AC00 = '가' (한글 첫 글자!)<br>• U+D55C = '한'<br>• U+1F600 = 😀 (이모지도 유니코드!)<br><br>유니코드는 현재 14만 개 이상의 문자를 포함하고 있어요.</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[심화] UTF-8 인코딩 원리</span><div class="box-content">유니코드 번호를 실제로 저장할 때는 <b>UTF-8</b> 인코딩을 많이 써요.<br><br>• 영문(U+0000~U+007F): <b>1바이트</b> (ASCII와 호환!)<br>  'A' = U+0041 → 41 (1바이트)<br><br>• 한글(U+AC00~U+D7AF): <b>3바이트</b><br>  '가' = U+AC00 → EA B0 80 (3바이트)<br><br>• 이모지(U+1F000~): <b>4바이트</b><br>  😀 = U+1F600 → F0 9F 98 80 (4바이트)<br><br>UTF-8은 영문은 적은 바이트, 다른 문자는 더 많은 바이트를 쓰는 <b>가변 길이</b> 인코딩이에요.</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[심화] UTF-16 인코딩</span><div class="box-content">Windows와 Java는 내부적으로 <b>UTF-16</b>을 많이 써요.<br><br>• 기본 다국어 평면(U+0000~U+FFFF): <b>2바이트</b><br>  '가' = U+AC00 → AC 00 (2바이트)<br><br>• 그 외(이모지 등): <b>4바이트</b> (서로게이트 페어 사용)<br><br>UTF-8 vs UTF-16:<br>• 영문 위주 → UTF-8이 효율적 (1바이트)<br>• 한글/중국어 위주 → UTF-16이 효율적 (2바이트 vs 3바이트)</div></div>
<h2>📁 파일 시그니처 (매직 넘버)</h2>
<p>파일의 맨 앞 몇 바이트를 보면 어떤 종류의 파일인지 알 수 있어요. 이 특별한 바이트 패턴을 <b>파일 시그니처</b> 또는 <b>매직 넘버</b>라고 해요. 물론 16진수로 표현해요!</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] 자주 보는 파일 시그니처</span><div class="box-content">파일 확장자는 속일 수 있지만, 매직 넘버는 거짓말을 안 해요!<br><br>• <b>PDF</b>: 25 50 44 46 → ASCII로 '%PDF'<br>• <b>PNG</b>: 89 50 4E 47 0D 0A 1A 0A → '.PNG....'<br>• <b>JPEG</b>: FF D8 FF → 항상 이걸로 시작<br>• <b>ZIP</b>: 50 4B 03 04 → ASCII로 'PK' (만든 사람 이름 약자!)<br>• <b>EXE</b>: 4D 5A → ASCII로 'MZ' (MS-DOS 설계자 이름!)<br>• <b>GIF</b>: 47 49 46 38 → ASCII로 'GIF8'</div></div>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-eureka.svg" alt="마스코트" />
        <div class="mascot-bubble eureka">ZIP 파일의 매직 넘버 'PK'는 ZIP 포맷을 만든 필 카츠(Phil Katz)의 이니셜이에요. 재밌죠?</div>
      </div>
<h2>🔧 메모리 덤프 읽기</h2>
<p>프로그래머가 프로그램을 디버깅할 때, 메모리의 내용을 직접 볼 수 있어요. 이때 16진수가 핵심이에요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 메모리 덤프 읽는 법</span><div class="box-content">메모리 덤프는 보통 이런 형태예요:<br><br><code>주소         16진수 데이터                    ASCII</code><br><code>0x00400000: 48 65 6C 6C 6F 20 57 6F  Hello Wo</code><br><code>0x00400008: 72 6C 64 21 00 00 00 00  rld!....</code><br><br>왼쪽: 메모리 주소 (16진수)<br>가운데: 저장된 데이터 (16진수, 바이트 단위)<br>오른쪽: 같은 데이터를 ASCII 문자로 표시<br><br>48 = 'H', 65 = 'e', 6C = 'l'... 이렇게 대응해요!</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[팁] 디버거에서 16진수 보기</span><div class="box-content">Visual Studio, GDB 같은 디버거에서 변수 값을 16진수로 볼 수 있어요.<br><br>• <code>int x = 255;</code> → 메모리에 <b>FF 00 00 00</b>으로 저장 (리틀 엔디안)<br>• <code>int x = -1;</code> → 메모리에 <b>FF FF FF FF</b>로 저장 (2의 보수)<br><br>16진수를 읽을 줄 알면 디버깅이 훨씬 쉬워져요!</div></div>
<h2>🌐 네트워크: MAC 주소</h2>
<p>모든 네트워크 장치(컴퓨터, 스마트폰, 공유기 등)에는 고유한 <b>MAC 주소</b>가 있어요. 16진수로 표현해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[핵심] MAC 주소 구조</span><div class="box-content">형태: <b>00:1A:2B:3C:4D:5E</b> (6바이트 = 48비트)<br><br>• 앞 3바이트 (00:1A:2B): <b>제조사 번호</b> (OUI)<br>  - 00:1A:2B → 어떤 회사가 만든 장치인지 알 수 있음<br>• 뒤 3바이트 (3C:4D:5E): <b>장치 고유 번호</b><br><br>구분자는 :(콜론) 또는 -(하이픈)을 쓰고,<br>Windows에서는 00-1A-2B-3C-4D-5E 형태로 표시해요.</div></div>
<h2>[심화] IPv6 주소</h2>
<p>IPv4 주소(192.168.1.1)는 32비트라서 약 43억 개밖에 못 만들어요. 그래서 128비트짜리 <b>IPv6</b>가 만들어졌어요. 128비트를 16진수로 표현해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] IPv6 주소 형태</span><div class="box-content">예: <b>2001:0db8:85a3:0000:0000:8a2e:0370:7334</b><br><br>• 16비트씩 8그룹, 콜론으로 구분<br>• 각 그룹은 16진수 4자리<br>• 총 128비트 = 16바이트<br><br><b>축약 규칙:</b><br>• 앞의 0 생략: 0db8 → db8<br>• 연속된 0000 그룹: :: 로 축약<br>  2001:db8:85a3::8a2e:370:7334<br><br>IPv6로 만들 수 있는 주소 수: 2¹²⁸ ≈ 3.4 × 10³⁸개 (지구의 모래알보다 많아요!)</div></div>
<h2>[심화] 어셈블리어와 기계어</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble thinking">CPU가 직접 실행하는 '기계어'도 16진수로 표현해요. 어셈블리어를 배우면 이 16진수 코드를 읽을 수 있게 돼요!</div>
      </div>
<p>CPU가 실행하는 명령어는 결국 0과 1의 나열이에요. 이걸 <b>기계어(machine code)</b>라고 해요. 기계어를 사람이 읽기 쉽게 16진수로 표현해요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화] 기계어와 어셈블리어 예시 (x86)</span><div class="box-content"><code>어셈블리어          기계어(16진수)     의미</code><br><code>MOV EAX, 1        B8 01 00 00 00   EAX에 1 저장</code><br><code>ADD EAX, EBX      01 D8            EAX += EBX</code><br><code>INT 0x80          CD 80            시스템 호출</code><br><code>RET               C3               함수 복귀</code><br><br>B8, 01, CD, C3... 모두 16진수 1바이트예요.<br>이 숫자들이 CPU에게 '뭘 해라'고 알려주는 명령어예요.</div></div>
<div class="box box-tip avoid-break"><span class="box-label">[팁] 왜 기계어에 16진수를 쓸까?</span><div class="box-content">• 2진수: 10111000 00000001 00000000... → 너무 길어요<br>• 10진수: 184 1 0 0 0 → 바이트 경계가 안 보여요<br>• <b>16진수: B8 01 00 00 00</b> → 바이트 단위로 딱딱 나뉘어요!<br><br>16진수 2자리 = 1바이트. 이 깔끔한 대응이 핵심이에요.</div></div>
<h2>[심화 내용] 진법 변환 알고리즘 일반화</h2>
<p>지금까지 2↔10, 2↔8, 2↔16 변환을 배웠어요. 그런데 <b>임의의 진법</b> 사이에서 변환하려면 어떻게 해야 할까요?</p>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] 일반 진법 변환 알고리즘</span><div class="box-content"><b>n진수 → 10진수</b>: 자릿값 전개<br>d_k × n^k + d_(k-1) × n^(k-1) + ... + d_1 × n¹ + d_0 × n⁰<br><br>예: 321(5) (5진수) → 10진수<br>= 3×5² + 2×5¹ + 1×5⁰<br>= 3×25 + 2×5 + 1×1<br>= 75 + 10 + 1 = <b>86</b><br><br><b>10진수 → m진수</b>: m으로 나누기 반복<br>86 ÷ 7 = 12 나머지 2<br>12 ÷ 7 = 1 나머지 5<br>1 ÷ 7 = 0 나머지 1<br>→ 역순으로: 86(10) = <b>152(7)</b></div></div>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] 진법과 다항식의 관계</span><div class="box-content">n진수는 사실 <b>다항식</b>이에요!<br><br>숫자 d_k d_(k-1) ... d_1 d_0 (n진수)은<br>다항식 f(x) = d_k·x^k + d_(k-1)·x^(k-1) + ... + d_0 에 x=n을 대입한 값<br><br>예: 1101(2) = 1·x³ + 1·x² + 0·x + 1 에 x=2 대입<br>= 8 + 4 + 0 + 1 = 13<br><br>이 관점에서 진법 변환은 '다항식의 값 구하기'와 같아요!</div></div>
<h2>[심화 내용] Horner's Method</h2>
<p><b>Horner's Method(호너의 방법)</b>는 다항식을 효율적으로 계산하는 알고리즘이에요. 진수 변환에 바로 적용할 수 있어요.</p>
<div class="box box-key avoid-break"><span class="box-label">[심화 내용] Horner's Method로 진법 변환</span><div class="box-content">d_k·n^k + d_(k-1)·n^(k-1) + ... + d_0<br>= (((...((d_k·n + d_(k-1))·n + d_(k-2))·n + ...) + d_1)·n + d_0<br><br>예: 1101(2) → 10진수 (왼쪽부터 순서대로!)<br>시작: 0<br>0 × 2 + <b>1</b> = 1<br>1 × 2 + <b>1</b> = 3<br>3 × 2 + <b>0</b> = 6<br>6 × 2 + <b>1</b> = <b>13</b> ✓<br><br>곱셈 3번, 덧셈 3번으로 끝! (일반 방법은 곱셈이 더 많아요)</div></div>
<div class="code-block avoid-break">
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code">def <span class="fn">horner_convert</span>(digits, base):</td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code">    <span class="str">""</span><span class="str">"Horner's method로 n진수를 10진수로 변환"</span><span class="str">""</span></td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code">    result = <span class="num">0</span></td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code">    <span class="kw">for</span> d in digits:</td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code">        result = result * base + d</td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code">    <span class="kw">return</span> result</td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">8</td><td class="line-code"># <span class="num">1101</span>(<span class="num">2</span>) → <span class="num">10</span>진수</td></tr>
<tr class=""><td class="line-num">9</td><td class="line-code"><span class="fn">print</span>(<span class="fn">horner_convert</span>([<span class="num">1</span>, <span class="num">1</span>, <span class="num">0</span>, <span class="num">1</span>], <span class="num">2</span>))  # <span class="num">13</span></td></tr>
<tr class=""><td class="line-num">10</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">11</td><td class="line-code"># <span class="num">321</span>(<span class="num">5</span>) → <span class="num">10</span>진수  </td></tr>
<tr class=""><td class="line-num">12</td><td class="line-code"><span class="fn">print</span>(<span class="fn">horner_convert</span>([<span class="num">3</span>, <span class="num">2</span>, <span class="num">1</span>], <span class="num">5</span>))     # <span class="num">86</span></td></tr>
<tr class=""><td class="line-num">13</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">14</td><td class="line-code"># <span class="fn">FF</span>(<span class="num">16</span>) → <span class="num">10</span>진수</td></tr>
<tr class=""><td class="line-num">15</td><td class="line-code"><span class="fn">print</span>(<span class="fn">horner_convert</span>([<span class="num">15</span>, <span class="num">15</span>], <span class="num">16</span>))     # <span class="num">255</span></td></tr>
<tr class=""><td class="line-num">16</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">17</td><td class="line-code"># 임의의 진법 간 변환 (a진법 → b진법)</td></tr>
<tr class=""><td class="line-num">18</td><td class="line-code">def <span class="fn">convert_base</span>(digits, from_base, to_base):</td></tr>
<tr class=""><td class="line-num">19</td><td class="line-code">    <span class="str">""</span><span class="str">"a진법 숫자를 b진법으로 변환"</span><span class="str">""</span></td></tr>
<tr class=""><td class="line-num">20</td><td class="line-code">    # <span class="num">1</span>단계: a진법 → <span class="num">10</span>진수 (Horner's method)</td></tr>
<tr class=""><td class="line-num">21</td><td class="line-code">    decimal = <span class="fn">horner_convert</span>(digits, from_base)</td></tr>
<tr class=""><td class="line-num">22</td><td class="line-code">    # <span class="num">2</span>단계: <span class="num">10</span>진수 → b진법</td></tr>
<tr class=""><td class="line-num">23</td><td class="line-code">    <span class="kw">if</span> decimal == <span class="num">0</span>:</td></tr>
<tr class=""><td class="line-num">24</td><td class="line-code">        <span class="kw">return</span> [<span class="num">0</span>]</td></tr>
<tr class=""><td class="line-num">25</td><td class="line-code">    result = []</td></tr>
<tr class=""><td class="line-num">26</td><td class="line-code">    <span class="kw">while</span> decimal &gt; <span class="num">0</span>:</td></tr>
<tr class=""><td class="line-num">27</td><td class="line-code">        result.<span class="fn">append</span>(decimal % to_base)</td></tr>
<tr class=""><td class="line-num">28</td><td class="line-code">        decimal <span class="cmt">//= to_base</span></td></tr>
<tr class=""><td class="line-num">29</td><td class="line-code">    <span class="kw">return</span> result[::-<span class="num">1</span>]</td></tr>
<tr class=""><td class="line-num">30</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">31</td><td class="line-code"># <span class="num">1101</span>(<span class="num">2</span>) → <span class="num">8</span>진수</td></tr>
<tr class=""><td class="line-num">32</td><td class="line-code"><span class="fn">print</span>(<span class="fn">convert_base</span>([<span class="num">1</span>, <span class="num">1</span>, <span class="num">0</span>, <span class="num">1</span>], <span class="num">2</span>, <span class="num">8</span>))  # [<span class="num">1</span>, <span class="num">5</span>]</td></tr></table></div>
<div class="output-block avoid-break"><span class="output-label">실행 결과</span><div class="output-text">13
86
255
[1, 5]</div></div>
<h2>연습문제</h2>
<div class="mascot-speech right avoid-break">
        <img class="mascot-speech-img small" src="/images/svg-assets/mascot-thinking.svg" alt="마스코트" />
        <div class="mascot-bubble tip">종이에 직접 써가면서 풀어 보세요. 머릿속으로만 하면 실수하기 쉬워요!</div>
      </div>
<div class="exercise avoid-break"><div class="exercise-title">문제 1 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>2진수 1100(2)을 16진수로 바꾸세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 2 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>16진수 A(16)는 10진수로 얼마인가요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 3 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>색상 코드 #00FF00은 무슨 색인가요? R, G, B 값을 각각 10진수로 말해보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 4 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>16진수 3F(16)를 2진수로 바꾸세요. (힌트: 각 자리를 4비트로)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 5 <span class="difficulty diff-1">★ 기본</span></div><div class="exercise-item"><p>8진수 77(8)은 10진수로 얼마인가요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 6 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>2진수 10110111(2)을 16진수와 8진수로 각각 바꾸세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 7 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>16진수 FF(16)는 10진수로 얼마인가요? 2진수로도 써 보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 8 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>유니코드 코드 포인트 U+0048, U+0069를 ASCII 표에서 찾아 어떤 문자인지 확인하세요. (힌트: 16진수 48, 69를 10진수로 바꿔보세요)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 9 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>파일의 첫 4바이트가 89 50 4E 47이면 어떤 종류의 파일인가요? 각 바이트를 ASCII 문자로 바꿔보세요. (힌트: 50=P, 4E=N, 47=G)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 10 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>MAC 주소 AC:DE:48:00:11:22에서 앞 3바이트(AC:DE:48)는 무엇을 의미하나요? 각 바이트를 2진수로 변환해보세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 11 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>10진수 200을 2진수, 8진수, 16진수로 각각 변환하세요. (힌트: 먼저 2진수로 바꾸고, 거기서 8진수와 16진수를 만드세요)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 12 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[Horner's Method] 16진수 1A3F를 Horner's Method로 10진수로 변환하세요. 과정을 단계별로 쓰세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 13 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[유니코드] 한글 '나'의 유니코드는 U+B098이에요. UTF-8로 인코딩하면 몇 바이트인가요? (힌트: U+0800~U+FFFF 범위는 3바이트 UTF-8)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 14 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[일반 진법] 5진수 432(5)를 7진수로 변환하세요. (힌트: 5진수 → 10진수 → 7진수 순서로)</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 15 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[코딩] Python으로 16진수 문자열(예: 'FF6B6B')을 입력받아 R, G, B 값을 10진수로 출력하는 프로그램을 작성하세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>정답</h2>
<div class="answers-section avoid-break"><h3>정답</h3><div class="answer-item"><span class="answer-num">문제 1</span> <span class="answer-text">1100(2) → 4비트 묶음 그대로: 1100 = 12 = C(16)</span></div><div class="answer-item"><span class="answer-num">문제 2</span> <span class="answer-text">A(16) = 10(10). 16진수에서 A는 10을 뜻해요.</span></div><div class="answer-item"><span class="answer-num">문제 3</span> <span class="answer-text">#00FF00 → R=00(0), G=FF(255), B=00(0) → <b>초록색</b> (순수한 녹색)<br>빨강과 파랑은 0이고, 초록만 최대치예요.</span></div><div class="answer-item"><span class="answer-num">문제 4</span> <span class="answer-text">3F(16) → 3=0011, F=1111 → <b>00111111(2)</b></span></div><div class="answer-item"><span class="answer-num">문제 5</span> <span class="answer-text">77(8) = 7×8 + 7×1 = 56 + 7 = <b>63</b>(10)</span></div><div class="answer-item"><span class="answer-num">문제 6</span> <span class="answer-text">16진수: 1011 0111 → B7(16)<br>8진수: 10 110 111 → 267(8)</span></div><div class="answer-item"><span class="answer-num">문제 7</span> <span class="answer-text">FF(16) = 15×16 + 15 = 240 + 15 = 255(10)<br>2진수: 1111 1111(2)</span></div><div class="answer-item"><span class="answer-num">문제 8</span> <span class="answer-text">U+0048: 48(16) = 4×16+8 = 72(10) → ASCII 'H'<br>U+0069: 69(16) = 6×16+9 = 105(10) → ASCII 'i'<br>합치면 <b>'Hi'</b>!</span></div><div class="answer-item"><span class="answer-num">문제 9</span> <span class="answer-text"><b>PNG 이미지 파일</b>이에요.<br>89 = (특수 바이트, 비ASCII)<br>50 = 'P'<br>4E = 'N'<br>47 = 'G'<br>PNG 파일은 항상 이 4바이트(89 50 4E 47)로 시작해요.</span></div><div class="answer-item"><span class="answer-num">문제 10</span> <span class="answer-text">앞 3바이트는 <b>OUI(제조사 식별 번호)</b>예요.<br>AC = 10101100(2)<br>DE = 11011110(2)<br>48 = 01001000(2)<br>이 번호로 어떤 회사(Apple, Samsung 등)가 만든 장치인지 알 수 있어요.</span></div><div class="answer-item"><span class="answer-num">문제 11</span> <span class="answer-text">200(10) = 11001000(2)<br>8진수: 011 001 000 → 310(8)<br>16진수: 1100 1000 → C8(16)</span></div><div class="answer-item"><span class="answer-num">문제 12</span> <span class="answer-text">1A3F(16), Horner's Method:<br>시작: 0<br>0 × 16 + 1 = 1<br>1 × 16 + 10(A) = 26<br>26 × 16 + 3 = 419<br>419 × 16 + 15(F) = <b>6719</b><br><br>검증: 1×16³ + 10×16² + 3×16 + 15 = 4096 + 2560 + 48 + 15 = 6719 ✓</span></div><div class="answer-item"><span class="answer-num">문제 13</span> <span class="answer-text">U+B098은 U+0800~U+FFFF 범위이므로 <b>3바이트</b> UTF-8이에요.<br>B098(16) = 1011 0000 1001 1000(2)<br>UTF-8 패턴: 1110xxxx 10xxxxxx 10xxxxxx<br>→ 1110<b>1011</b> 10<b>000010</b> 10<b>011000</b><br>→ EB 82 98 (3바이트)</span></div><div class="answer-item"><span class="answer-num">문제 14</span> <span class="answer-text">5진수 → 10진수: 4×25 + 3×5 + 2×1 = 100 + 15 + 2 = <b>117</b><br>10진수 → 7진수: 117÷7=16 나머지5, 16÷7=2 나머지2, 2÷7=0 나머지2<br>→ 역순: <b>225(7)</b><br>검증: 2×49 + 2×7 + 5 = 98 + 14 + 5 = 117 ✓</span></div><div class="answer-item"><span class="answer-num">문제 15</span> <span class="answer-text">Python 풀이:<br><code>hex_color = input('16진수 색상 코드 입력 (예: FF6B6B): ')<br>r = int(hex_color[0:2], 16)<br>g = int(hex_color[2:4], 16)<br>b = int(hex_color[4:6], 16)<br>print(f'R={r}, G={g}, B={b}')</code><br><br>입력: FF6B6B → 출력: R=255, G=107, B=107</span></div></div>
<h2>용어 정리</h2>
<div class="glossary avoid-break"><div class="glossary-item"><dt class="glossary-term">8진수 (octal)</dt><dd class="glossary-def">0~7까지 8개의 숫자만 쓰는 진법. 2진수를 3비트씩 묶어서 만들어요.</dd></div><div class="glossary-item"><dt class="glossary-term">16진수 (hexadecimal)</dt><dd class="glossary-def">0~9와 A~F까지 16개의 숫자/문자를 쓰는 진법. 2진수를 4비트씩 묶어서 만들어요.</dd></div><div class="glossary-item"><dt class="glossary-term">0x</dt><dd class="glossary-def">C언어에서 16진수를 나타내는 접두사. 0x1A는 16진수 1A라는 뜻이에요.</dd></div><div class="glossary-item"><dt class="glossary-term">진법 변환</dt><dd class="glossary-def">같은 숫자를 다른 진법으로 바꾸는 것. 예: 10진수 15 = 2진수 1111 = 16진수 F</dd></div><div class="glossary-item"><dt class="glossary-term">RGB</dt><dd class="glossary-def">빨강(Red), 초록(Green), 파랑(Blue)의 세 가지 색을 섞어서 색을 만드는 방식. 각각 0~255(00~FF).</dd></div><div class="glossary-item"><dt class="glossary-term">RGBA</dt><dd class="glossary-def">RGB에 투명도(Alpha)를 추가한 색상 체계. A=00이면 완전 투명, FF이면 완전 불투명.</dd></div><div class="glossary-item"><dt class="glossary-term">HSL</dt><dd class="glossary-def">색조(Hue), 채도(Saturation), 명도(Lightness)로 색을 표현하는 방식.</dd></div><div class="glossary-item"><dt class="glossary-term">유니코드 (Unicode)</dt><dd class="glossary-def">전 세계 모든 문자에 고유한 번호(코드 포인트)를 부여한 국제 표준. U+XXXX 형태로 표현해요.</dd></div><div class="glossary-item"><dt class="glossary-term">UTF-8</dt><dd class="glossary-def">유니코드를 인코딩하는 방식. 가변 길이(1~4바이트)로 저장하며, ASCII와 호환돼요.</dd></div><div class="glossary-item"><dt class="glossary-term">UTF-16</dt><dd class="glossary-def">유니코드를 인코딩하는 방식. 기본 2바이트, 확장 4바이트. Windows/Java에서 주로 사용.</dd></div><div class="glossary-item"><dt class="glossary-term">파일 시그니처 (매직 넘버)</dt><dd class="glossary-def">파일의 맨 앞에 있는 고정된 바이트 패턴. 파일 종류를 식별하는 데 사용해요.</dd></div><div class="glossary-item"><dt class="glossary-term">MAC 주소</dt><dd class="glossary-def">네트워크 장치의 고유 주소. 6바이트(48비트)의 16진수로 표현해요.</dd></div><div class="glossary-item"><dt class="glossary-term">IPv6</dt><dd class="glossary-def">128비트 인터넷 주소. 16진수 4자리씩 8그룹으로 표현해요.</dd></div><div class="glossary-item"><dt class="glossary-term">기계어 (machine code)</dt><dd class="glossary-def">CPU가 직접 실행하는 2진수 명령어. 사람이 읽기 쉽도록 16진수로 표기해요.</dd></div><div class="glossary-item"><dt class="glossary-term">Horner's Method</dt><dd class="glossary-def">다항식을 효율적으로 계산하는 알고리즘. 진법 변환에 적용하면 곱셈 횟수를 줄일 수 있어요.</dd></div></div>
<div class="visual-summary avoid-break"><div class="visual-summary-title">이번 유닛 핵심 정리</div><div class="visual-summary-items"><div class="visual-summary-item"><div class="visual-summary-num">1</div><span>8진수는 3비트씩, 16진수는 4비트씩 묶어서 만들어요</span></div><div class="visual-summary-item"><div class="visual-summary-num">2</div><span>16진수에서 10~15는 A~F로 써요</span></div><div class="visual-summary-item"><div class="visual-summary-num">3</div><span>1바이트(8비트)는 16진수 2자리로 딱 맞아요</span></div><div class="visual-summary-item"><div class="visual-summary-num">4</div><span>색상 코드 #RRGGBB은 16진수로 색을 표현하는 방법</span></div><div class="visual-summary-item"><div class="visual-summary-num">5</div><span>유니코드는 모든 문자에 16진수 번호를 붙여놓은 표준</span></div><div class="visual-summary-item"><div class="visual-summary-num">6</div><span>MAC 주소, IPv6, 기계어 등 실무에서 16진수는 필수</span></div></div></div>
<h2>━━━ 10축 심화 학습 ━━━</h2>
<h2>[KOI] 진법 변환 실전 기출 유형</h2>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 1] 16진→2진→10진 변환</span><div class="box-content"><b>문제:</b> 16진수 0x2F를 2진수와 10진수로 각각 변환하세요.<br><br><b>정답:</b> 2진수 00101111, 10진수 47<br><br><b>풀이:</b><br>• 2 → 0010, F → 1111<br>• 0x2F = <b>00101111₂</b><br>• 32+8+4+2+1 = <b>47</b><br>• 팁: 16진→10진은 각 자리에 16의 거듭제곱을 곱해도 돼요<br>• 2×16 + 15×1 = 32+15 = 47 ✔</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 2] 색상 코드 RGB 분석</span><div class="box-content"><b>문제:</b> 색상 코드 #3A7BD5의 R, G, B 값을 각각 10진수로 구하고, 어떤 색에 가까운지 예측하세요.<br><br><b>정답:</b> R=58, G=123, B=213 → 파란색 계열<br><br><b>풀이:</b><br>• 3A: 3×16+10 = <b>58</b> (빨강 낮음)<br>• 7B: 7×16+11 = <b>123</b> (초록 중간)<br>• D5: 13×16+5 = <b>213</b> (파랑 높음!)<br>• B가 가장 크므로 파란색 계열 (R < G < B)<br>• CSS: <code>rgb(58, 123, 213)</code></div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 3] 파일 시그니처 판단</span><div class="box-content"><b>문제:</b> 파일의 첫 4바이트가 25 50 44 46이면, 이 파일은 어떤 종류인가요? 각 바이트를 ASCII 문자로 변환하세요.<br><br><b>정답:</b> PDF 파일<br><br><b>풀이:</b><br>• 25₁₆ = 37₁₀ = '%'<br>• 50₁₆ = 80₁₀ = 'P'<br>• 44₁₆ = 68₁₀ = 'D'<br>• 46₁₆ = 70₁₀ = 'F'<br>• 합치면 <b>%PDF</b> → PDF 파일!</div></div>
<div class="box box-key avoid-break"><span class="box-label">[KOI 실전 문제 4] IPv6 축약</span><div class="box-content"><b>문제:</b> IPv6 주소 2001:0db8:0000:0000:0000:0000:0000:0001을 축약 표기하세요.<br><br><b>정답:</b> 2001:db8::1<br><br><b>풀이:</b><br>• 각 그룹의 앞 0 생략: 2001:db8:0:0:0:0:0:1<br>• 연속된 0 그룹을 ::로 축약: <b>2001:db8::1</b><br>• 주의: ::는 주소당 1번만 사용 가능!<br>• 원래 128비트 주소가 이렇게 간단해지는 것도 16진수 덕분!</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 16 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[KOI] 게임 캐릭터의 체력(HP)이 메모리에 0x00FF로 저장되어 있어요.
(1) 10진수로 얼마인가요?
(2) 2진수로 쓰면 몇 자리인가요?
(3) 치럄 코드 0xDEAD는 'Hack' 1단계에서 자주 보이는 디버깅 값이에요. 10진수로 계산하세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<h2>[디버깅] 색상 코드 버그 찾기</h2>
<p>16진수 색상 코드를 잘못 쓰면 색이 완전히 다르게 나와요. 디버깅 실습을 해 보세요.</p>
<div class="box box-warning avoid-break"><span class="box-label">[디버깅] 색상 코드 함정</span><div class="box-content"><b>버그 1: 순서 보기</b><br><code>#FF0000</code> = 빨강, <code>#0000FF</code> = 파랭<br>순서를 바꿀면 색이 바뀜요! RGB의 순서를 헷갈리지 마세요.<br><br><b>버그 2: #을 빼멸으면</b><br>CSS에서 <code>#</code>을 안 붙이면 색이 적용 안 돼요!<br>❌ <code>color: FF6B6B;</code><br>✅ <code>color: #FF6B6B;</code><br><br><b>버그 3: 0x와 # 햇갈리기</b><br>C언어: <code>0xFF</code> (0x 접두사)<br>CSS/HTML: <code>#FF</code> (# 접두사)<br>용도가 다르니 햇갈리지 마세요!</div></div>
<h2>[C언어] 메모리 덤프 직접 보기</h2>
<div class="code-block avoid-break"><div class="code-block-header">[C언어] 변수의 16진수 값 확인 (Part 2 미리보기)</div>
        <table class="code-table"><tr class=""><td class="line-num">1</td><td class="line-code"><span class="pp">#include</span> <span class="str">&lt;stdio.h&gt;</span></td></tr>
<tr class=""><td class="line-num">2</td><td class="line-code"></td></tr>
<tr class=""><td class="line-num">3</td><td class="line-code"><span class="type">int</span> <span class="fn">main</span>(<span class="type">void</span>) {</td></tr>
<tr class=""><td class="line-num">4</td><td class="line-code">    <span class="type">int</span> x = <span class="num">255</span>;</td></tr>
<tr class=""><td class="line-num">5</td><td class="line-code">    <span class="type">int</span> y = -<span class="num">1</span>;</td></tr>
<tr class=""><td class="line-num">6</td><td class="line-code">    <span class="type">char</span> ch = <span class="str">'A'</span>;</td></tr>
<tr class=""><td class="line-num">7</td><td class="line-code">    </td></tr>
<tr class=""><td class="line-num">8</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"x = <span class="fmt">%d</span> (10진) = 0x<span class="fmt">%X</span> (16진)<span class="esc">\\n</span>"</span>, x, x);</td></tr>
<tr class=""><td class="line-num">9</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"y = <span class="fmt">%d</span> (10진) = 0x<span class="fmt">%X</span> (16진)<span class="esc">\\n</span>"</span>, y, y);</td></tr>
<tr class=""><td class="line-num">10</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"ch = '<span class="fmt">%c</span>' = <span class="fmt">%d</span> (10진) = 0x<span class="fmt">%X</span> (16진)<span class="esc">\\n</span>"</span>, ch, ch, ch);</td></tr>
<tr class=""><td class="line-num">11</td><td class="line-code">    </td></tr>
<tr class=""><td class="line-num">12</td><td class="line-code">    <span class="cmt">// 8진수 함정! 017은 15임</span></td></tr>
<tr class=""><td class="line-num">13</td><td class="line-code">    <span class="type">int</span> trap = <span class="num">017</span>;  <span class="cmt">// 8진수 17 = 10진수 15</span></td></tr>
<tr class=""><td class="line-num">14</td><td class="line-code">    <span class="fn">printf</span>(<span class="str">"주의! 017 = <span class="fmt">%d</span> (예상: 17 아님!)<span class="esc">\\n</span>"</span>, trap);</td></tr>
<tr class=""><td class="line-num">15</td><td class="line-code">    <span class="kw">return</span> <span class="num">0</span>;</td></tr>
<tr class=""><td class="line-num">16</td><td class="line-code">}</td></tr></table></div>
<!-- unknown type: output-block -->
<h2>[컴퓨팅사고력] 추상화 — 같은 값, 다른 표현</h2>
<p>10진수 255 = 2진수 11111111 = 8진수 377 = 16진수 FF. 모두 <b>같은 값</b>을 <b>다른 형태</b>로 표현한 거예요. 이처럼 본질을 유지하면서 표현 방식을 바꾸는 것이 <b>추상화</b>의 핵심이에요.</p>
<div class="box box-tip avoid-break"><span class="box-label">[컴퓨팅사고력] 추상화 예시</span><div class="box-content">프로그래밍에서의 추상화 예시:<br><br>• 색상: RGB(58,123,213) = #3A7BD5 = hsl(215,68%,53%) → 같은 색!<br>• 문자: '가' = U+AC00 = UTF-8: EA B0 80 → 같은 글자!<br>• 주소: 192.168.1.1 = 11000000.10101000.00000001.00000001 → 같은 IP!<br><br>프로그래머는 상황에 따라 가장 적합한 표현을 선택해요.<br>색상 디자인? → #RRGGBB / 네트워크? → 2진수 / 디버깅? → 16진수</div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 17 <span class="difficulty diff-2">★★ 도전</span></div><div class="exercise-item"><p>[컴퓨팅사고력] 색상 #808080은 어떤 색일까요?
(1) R, G, B 값을 각각 10진수로 구하세요
(2) 세 값이 같을 때 어떤 색이 나오나요?
(3) #404040은 #808080보다 밝을까요 어두울까요?</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="exercise avoid-break"><div class="exercise-title">문제 18 <span class="difficulty diff-3">★★★ 심화</span></div><div class="exercise-item"><p>[C+디버깅] C언어에서 int x = 010; 이라고 쓰면 x에는 몇이 저장되나요?
(1) 10?  (2) 8?  (3) 16?
왜 그런지 이유를 적고, 이런 실수를 막으려면 어떻게 해야 하는지 설명하세요.</p></div><div class="memo-area"><span class="memo-label">여기에 답을 써 보세요</span></div></div>
<div class="box box-summary avoid-break"><span class="box-label">이 유닛에서 깊이 배운 10축</span><div class="box-content"><b>[KOI]</b> 16진↔2진↔10진 변환. RGB 색상코드 분석. 파일 시그니처 판단(ASCII변환). IPv6 축약. 실전 문제 4개+풀이<br><b>[디버깅]</b> 색상코드 버그 3종(RGB순서/#누락/0x햇갈림). 8진수 함정(017=15)<br><b>[컴퓨팅사고력]</b> 추상화 — 같은 값을 다른 진법으로 표현. 상황별 최적 표현 선택<br><b>[C언어]</b> 0x 접두사, %x %o printf 포맷. 메모리 덤프 읽기. -1=0xFFFFFFFF<br><b>[코딩기초]</b> 진법 변환 알고리즘 일반화(Horner). 다항식 관점<br><b>[실생활]</b> 색상코드, 유니코드, MAC주소, IPv6, 파일 시그니처<br><b>[하드웨어]</b> 메모리 덤프, 리틀엔디안. 기계어 16진수 표기<br><b>[타과목]</b> 수학 — 다항식과 진법의 관계. 미술 — RGB/HSL 색채학</div></div>
<div class="box box-question avoid-break"><span class="box-label">[다음 유닛 미리보기]</span><div class="box-content">컴퓨터에 글자 'A'를 입력하면, 컴퓨터는 이걸 어떻게 저장할까요? 숫자로? 그림으로? 다음 유닛 '문자도 숫자야 (ASCII)'에서 알아봐요!</div></div>
<div class="mascot-speech  avoid-break">
        <img class="mascot-speech-img " src="/images/svg-assets/mascot-celebrate.svg" alt="마스코트" />
        <div class="mascot-bubble success">진법 변환을 할 수 있게 됐어요! 이제 2진수, 8진수, 10진수, 16진수를 자유자재로 오갈 수 있어요. 색상 코드, 유니코드, 메모리 덤프까지! 종이에 연습 많이 해두세요!</div>
      </div>
</article>`,
            },
        ],
    }
        ],
    },
];
