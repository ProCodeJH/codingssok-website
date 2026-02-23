---
description: LMS 페이지 콘텐츠 작성 양식 (극최상 퀄리티)
---

# 페이지 콘텐츠 작성 규칙

모든 학습 페이지는 아래 양식과 원칙을 **반드시** 따른다.

---

## 🎯 교육학적 원칙 (필수 적용)

1. **PRIMM 학습법**: 예측(Predict) → 실행(Run) → 관찰(Investigate) → 수정(Modify) → 만들기(Make)
2. **비유-먼저 설명**: 추상적 개념은 반드시 현실 비유를 먼저 제시 (스마트폰 앱, 요리 레시피, LEGO 등)
3. **컴퓨팅 사고력 연결**: 매 페이지마다 분해/패턴인식/추상화/알고리즘 중 해당하는 것을 🧠 callout으로 연결
4. **에러 정상화**: 실수 TOP N + 실제 에러 메시지 포함, "실수는 배움의 기회"라는 톤
5. **스캐폴딩**: 쉬운 것 → 어려운 것 순서, 이전 페이지 개념 자연스럽게 복습
6. **마이크로 성공**: 작은 성공 체험을 자주 제공 ("축하합니다! 🎉")
7. **깊이 있는 설명**: 단순 "이렇게 하세요"가 아니라 **왜** 그런지 이유까지 설명

---

## 📐 콘텐츠 구조 (순서대로)

### 1. 히어로 헤더
```html
<div class="blog-hero">
  <div class="meta">📖 읽는 시간 약 N분 · Unit X · Page Y · 난이도 ★☆☆</div>
  <h1>페이지 제목</h1>
  <p>한 줄 요약 — 흥미를 유발하는 문장</p>
  <div class="tags">
    <span class="tag">핵심키워드1</span>
    <span class="tag">핵심키워드2</span>
    <span class="tag">컴퓨팅 사고력</span>
  </div>
</div>
```

### 2. 도입부 (왜 배우는가?)
- 역사적 맥락, 실생활 연결, 또는 호기심 유발 질문
- 이전 페이지에서 배운 내용과의 연결

### 3. 컴퓨팅 사고력 연결 (info callout)
```html
<div class="callout info">
  <span class="callout-icon">🧠</span>
  <div class="callout-body">
    <strong>컴퓨팅 사고력 — OOO</strong>
    구체적 설명...
  </div>
</div>
```

### 4. 핵심 코드 (실행 가능)
- macOS dots 포함 코드 블록
- 라인 번호 + 인라인 주석
- ▶ 실행하기 버튼
- 바로 아래 output-box로 예상 결과

### 5. 코드 분석 (step 카드)
- 각 줄/개념을 번호 스텝으로 깊이 분석
- **비유** 적극 활용 (tip callout)
- 관련 **컴퓨팅 사고력** 연결 (info callout)
- 핵심 용어는 영어 원어 병기: `문자열(String)`, `순차 구조(Sequential Structure)`

### 6. 참조 테이블 (해당 시)
```html
<table class="summary-table">
  <tr><th>항목</th><th>의미</th><th>예시</th></tr>
  ...
</table>
```

### 7. 실험 섹션 (PRIMM 적용)
- "먼저 예측하세요" tip callout
- 실행 가능한 코드 예제
- 패턴 인식 callout로 반복 구조 발견 유도
- "\\n을 빼면?" 같은 변형 실험

### 8. 자주 하는 실수 TOP 3
- 빨간 step 카드 (gradient: #ef4444 → #dc2626)
- 각 실수마다 실제 에러 메시지 포함
- 디버깅 팁 callout

### 9. 핵심 정리
- 8행 이상의 summary-table (요소 + 역할)
- 이전 정리보다 항목 확대: `{ }`, `"문자열"`, 이스케이프 시퀀스 등

### 10. 컴퓨팅 사고력 회고
```html
<div class="callout info">
  <span class="callout-icon">🧠</span>
  <div class="callout-body">
    <strong>오늘 배운 컴퓨팅 사고력</strong>
    <ul>
      <li><strong>분해(Decomposition)</strong> — ...</li>
      <li><strong>순차 구조(Sequence)</strong> — ...</li>
      <li><strong>패턴 인식(Pattern Recognition)</strong> — ...</li>
    </ul>
  </div>
</div>
```

---

## 🎨 CSS 클래스 참조

| 클래스 | 용도 |
|--------|------|
| `.blog` | 최상위 컨테이너 (max-width: 700px) |
| `.blog-hero` | 그라디언트 히어로 헤더 |
| `.code-block` | 코드 블록 (macOS dots 포함) |
| `.code-header .dots` | 🔴🟡🟢 트래픽 라이트 |
| `.code-header .file` | 파일명 표시 |
| `.code-body` | 코드 본문 (다크 테마) |
| `.output-box` | 실행 결과 박스 |
| `.step` / `.step-num` / `.step-body` | 번호 스텝 카드 |
| `.callout.tip` | 💡 팁 (노란색) |
| `.callout.warn` | ⚠️ 경고 (빨간색) |
| `.callout.info` | 🧠 정보/CT (파란색) |
| `.summary-table` | 요약 테이블 |
| `.divider` / `.dot` | 섹션 구분 점 |
| `.flow` / `.flow-step` / `.flow-arrow` | 비주얼 플로우차트 |
| `.lms-run-btn` | 실행 버튼 (초록색) |

## 🖌️ 코드 하이라이팅 클래스

| 클래스 | 색상 | 용도 |
|--------|------|------|
| `.kw` | #c792ea (보라) | 키워드: return, if, for |
| `.inc` | #89ddff (하늘) | 전처리기: #include |
| `.str` | #c3e88d (연두) | 문자열, 숫자 |
| `.fn` | #82aaff (파랑) | 함수명: printf, main |
| `.tp` | #f78c6c (주황) | 자료형: int, void, char |
| `.cm` | #5c6370 (회색) | 주석 |
| `.ln` | #3d3d5c (진회색) | 줄 번호 |

---

## ✅ 품질 체크리스트

- [ ] 읽는 시간, 난이도 표시 있음
- [ ] 컴퓨팅 사고력 callout 최소 2개
- [ ] 비유 최소 1개
- [ ] 실행 가능한 코드 최소 1개
- [ ] PRIMM "예측 → 실행" 유도 문구
- [ ] 자주 하는 실수 섹션 포함
- [ ] 실제 에러 메시지 포함
- [ ] 이스케이프 or 참조 테이블 (해당 시)
- [ ] 핵심 정리 (8행 이상 summary-table)
- [ ] CT 회고 (배운 사고력 정리)
- [ ] 영어 원어 병기 (String, Decomposition 등)
- [ ] 코드에 인라인 주석 포함
