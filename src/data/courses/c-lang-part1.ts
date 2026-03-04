import { Chapter } from './types';

/* ── 공통 블로그 CSS (블루 팔레트, 이모지 없음) ── */
const BLOG_CSS = `<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
.blog{max-width:700px;margin:0 auto;font-family:'Inter','Pretendard',system-ui,sans-serif;color:#1a1a2e;-webkit-font-smoothing:antialiased}
.blog>*{animation:fadeUp .6s ease-out both}
.blog>*:nth-child(2){animation-delay:.05s}
.blog>*:nth-child(3){animation-delay:.1s}
.blog h2{font-size:28px;font-weight:900;color:#0f172a;margin:60px 0 12px;letter-spacing:-.8px;line-height:1.35;position:relative}
.blog h2::after{content:'';position:absolute;bottom:-6px;left:0;width:40px;height:3px;border-radius:3px;background:linear-gradient(90deg,#0284c7,#38bdf8)}
.blog h3{font-size:21px;font-weight:700;color:#1e293b;margin:44px 0 14px}
.blog p{font-size:16.5px;line-height:2.05;color:#374151;margin:0 0 22px;word-break:keep-all}
.blog strong{color:#0f172a;font-weight:700}
.blog code{background:linear-gradient(135deg,#e0f2fe,#f0f9ff);padding:3px 9px;border-radius:7px;font-size:14px;font-family:'Fira Code',monospace;color:#0369a1;font-weight:600;border:1px solid #bae6fd}
.blog ul{margin:0 0 22px;padding-left:0;list-style:none}
.blog li{font-size:16px;line-height:2;color:#4b5563;padding:5px 0 5px 30px;position:relative}
.blog li::before{content:'';position:absolute;left:8px;top:16px;width:7px;height:7px;border-radius:50%;background:linear-gradient(135deg,#38bdf8,#0284c7);box-shadow:0 0 6px rgba(2,132,199,.3)}
.blog-hero{background:linear-gradient(135deg,#0369a1 0%,#0284c7 50%,#38bdf8 100%);background-size:200% 200%;animation:shimmer 6s ease infinite;border-radius:24px;padding:44px 36px;margin-bottom:44px;color:#fff;position:relative;overflow:hidden}
.blog-hero::before{content:'';position:absolute;top:-40%;right:-20%;width:300px;height:300px;border-radius:50%;background:rgba(255,255,255,.08)}
.blog-hero *{position:relative;z-index:1}
.blog-hero .meta{font-size:12px;color:rgba(255,255,255,.7);margin-bottom:14px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase}
.blog-hero h1{font-size:32px;font-weight:900;margin:0 0 12px;letter-spacing:-1px;line-height:1.25}
.blog-hero p{font-size:17px;line-height:1.75;color:rgba(255,255,255,.92);margin:0 0 22px}
.blog-hero .tags{display:flex;gap:8px;flex-wrap:wrap}
.blog-hero .tag{padding:7px 16px;border-radius:24px;background:rgba(255,255,255,.18);backdrop-filter:blur(8px);color:#fff;font-size:13px;font-weight:600;border:1px solid rgba(255,255,255,.15)}
.code-block{position:relative;margin:28px 0;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.05);box-shadow:0 4px 24px rgba(0,0,0,.12)}
.code-header{display:flex;justify-content:space-between;align-items:center;padding:10px 18px;background:#13131f;border-bottom:1px solid #252538}
.code-header .dots{display:flex;gap:6px}
.code-header .dots span{width:10px;height:10px;border-radius:50%}
.code-header .dots span:nth-child(1){background:#ff5f57}
.code-header .dots span:nth-child(2){background:#ffbd2e}
.code-header .dots span:nth-child(3){background:#28c840}
.code-header .file{font-size:12px;color:#8888a8;font-weight:600}
.code-body{background:linear-gradient(180deg,#1a1a2e,#16162a);padding:22px 26px;font-family:'Fira Code','JetBrains Mono',monospace;font-size:14.5px;line-height:2.1;color:#e2e8f0;overflow-x:auto;margin:0}
.code-body .kw{color:#c792ea;font-weight:600}
.code-body .inc{color:#89ddff}
.code-body .str{color:#c3e88d}
.code-body .fn{color:#82aaff}
.code-body .tp{color:#f78c6c}
.code-body .cm{color:#5c6370;font-style:italic}
.code-body .ln{color:#3d3d5c;user-select:none;margin-right:22px;display:inline-block;width:22px;text-align:right;font-size:12px}
.lms-run-btn{padding:7px 18px;border-radius:10px;border:none;background:linear-gradient(135deg,#10b981,#059669);color:#fff;font-size:12px;font-weight:700;cursor:pointer;box-shadow:0 2px 10px rgba(16,185,129,.35);transition:all .25s cubic-bezier(.4,0,.2,1)}
.lms-run-btn:hover{transform:translateY(-2px) scale(1.02);box-shadow:0 6px 20px rgba(16,185,129,.45)}
.lms-run-btn:disabled{background:#64748b!important;cursor:wait;transform:none;box-shadow:none}
.lms-code-wrap{position:relative}
.output-box{margin:-4px 0 28px;padding:16px 22px;border-radius:0 0 16px 16px;background:linear-gradient(135deg,#ecfdf5,#f0fdf4);border:1px solid #a7f3d0;border-top:3px solid #10b981;font-family:'Fira Code',monospace;font-size:14px;color:#166534;line-height:1.8}
.output-box::before{content:'OUTPUT';display:block;font-size:11px;font-weight:800;color:#059669;margin-bottom:10px;letter-spacing:1.5px;font-family:'Inter',sans-serif}
.lms-run-output{margin-top:12px;border-radius:12px;overflow:hidden;border:1px solid #252538;box-shadow:0 2px 8px rgba(0,0,0,.1)}
.lms-run-output .status{padding:8px 16px;font-size:11px;font-weight:700}
.lms-run-output .status.success{background:linear-gradient(135deg,#dcfce7,#bbf7d0);color:#15803d}
.lms-run-output .status.error{background:linear-gradient(135deg,#fee2e2,#fecaca);color:#dc2626}
.lms-run-output pre{margin:0;padding:14px 18px;background:#1a1a2e;color:#e2e8f0;font-size:13px;font-family:'Fira Code',monospace;line-height:1.8;white-space:pre-wrap;min-height:36px}
.callout{display:flex;gap:16px;padding:22px 24px;border-radius:16px;margin:28px 0;font-size:15.5px;line-height:1.95;transition:transform .2s,box-shadow .2s}
.callout:hover{transform:translateY(-2px);box-shadow:0 4px 16px rgba(0,0,0,.06)}
.callout-icon{font-size:13px;flex-shrink:0;width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-weight:800}
.callout-body{flex:1}
.callout-body strong{display:block;margin-bottom:6px;font-size:15px}
.callout.tip{background:linear-gradient(135deg,#fefce8,#fef9c3);border:1px solid #fde047;color:#854d0e}
.callout.tip .callout-icon{background:#fef08a;color:#a16207}
.callout.warn{background:linear-gradient(135deg,#fef2f2,#fee2e2);border:1px solid #fca5a5;color:#991b1b}
.callout.warn .callout-icon{background:#fecaca;color:#dc2626}
.callout.info{background:linear-gradient(135deg,#eff6ff,#dbeafe);border:1px solid #93c5fd;color:#1e40af}
.callout.info .callout-icon{background:#bfdbfe;color:#1d4ed8}
.step{display:flex;gap:18px;margin:24px 0;padding:24px 26px;background:linear-gradient(135deg,#fafbff,#f8fafc);border-radius:16px;border:1px solid #e5e7eb;transition:all .3s cubic-bezier(.4,0,.2,1);position:relative;overflow:hidden}
.step::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:linear-gradient(180deg,#0284c7,#38bdf8);opacity:0;transition:opacity .3s}
.step:hover{transform:translateX(4px);box-shadow:0 4px 20px rgba(2,132,199,.08);border-color:#bae6fd}
.step:hover::before{opacity:1}
.step-num{width:40px;height:40px;border-radius:12px;background:linear-gradient(135deg,#0284c7,#0ea5e9);color:#fff;font-size:17px;font-weight:900;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 2px 8px rgba(2,132,199,.3)}
.step-body{flex:1}
.step-body h4{font-size:16px;font-weight:700;color:#0f172a;margin:6px 0 10px}
.step-body p,.step-body li{font-size:15px;line-height:1.95;color:#4b5563;margin:0}
.divider{display:flex;align-items:center;justify-content:center;gap:10px;margin:52px 0}
.divider .dot{width:6px;height:6px;border-radius:50%;background:linear-gradient(135deg,#bae6fd,#7dd3fc)}
.divider .dot:nth-child(2){width:8px;height:8px;background:linear-gradient(135deg,#38bdf8,#0284c7)}
.flow{display:flex;align-items:center;justify-content:center;gap:0;margin:32px 0;flex-wrap:wrap}
.flow-step{text-align:center;padding:18px 20px;border-radius:14px;min-width:120px;transition:transform .2s}
.flow-step:hover{transform:scale(1.05)}
.flow-step .flow-label{font-size:14px;font-weight:700;color:#0f172a}
.flow-step .flow-desc{font-size:12px;color:#6b7280;margin-top:2px}
.flow-arrow{font-size:20px;color:#7dd3fc;margin:0 4px;font-weight:800}
.summary-table{width:100%;border-collapse:separate;border-spacing:0;border-radius:16px;overflow:hidden;border:1px solid #e5e7eb;margin:24px 0;box-shadow:0 2px 12px rgba(0,0,0,.05)}
.summary-table th{background:linear-gradient(135deg,#0284c7,#0ea5e9);color:#fff;padding:16px 20px;text-align:left;font-size:13px;font-weight:700;letter-spacing:.8px;text-transform:uppercase}
.summary-table td{padding:16px 20px;font-size:14.5px;color:#374151;border-bottom:1px solid #f1f5f9;line-height:1.7;transition:background .2s}
.summary-table tr:last-child td{border-bottom:none}
.summary-table tr:hover td{background:linear-gradient(135deg,#f0f9ff,#e0f2fe)}
.summary-table code{background:linear-gradient(135deg,#e0f2fe,#f0f9ff);padding:3px 9px;border-radius:6px;font-size:13px;color:#0369a1;border:1px solid #bae6fd}
.diagram{background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:28px;margin:28px 0;text-align:center}
.diagram-title{font-size:13px;font-weight:700;color:#64748b;letter-spacing:1px;text-transform:uppercase;margin-bottom:16px}
.diagram-flow{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
.diagram-box{padding:12px 20px;border-radius:10px;font-size:14px;font-weight:600;border:2px solid}
.diagram-arrow{color:#94a3b8;font-size:18px;font-weight:800}
</style>`;

// ────────────────────────────────────────────────
// PAGE 3.3 CONTENT PLACEHOLDER — will be added via replace
// ────────────────────────────────────────────────
const PAGE_33_CONTENT = BLOG_CSS + `
<div class="blog">

<div class="blog-hero">
  <div class="meta">Unit 3 · Page 3 · 난이도 ★☆☆ · 약 8분</div>
  <h1>Hello, world! 출력하기</h1>
  <p>1978년부터 이어져 온 프로그래밍의 전통. 단 8줄의 코드 속에 C 프로그래밍의 핵심 원리가 담겨 있습니다.</p>
  <div class="tags">
    <span class="tag">#include</span>
    <span class="tag">main()</span>
    <span class="tag">printf()</span>
    <span class="tag">이스케이프 시퀀스</span>
  </div>
</div>

<h2>왜 Hello, world! 인가?</h2>
<p>"Hello, world!"는 1978년 <strong>브라이언 커니핸(Brian Kernighan)</strong>이 C언어 교재에서 처음 사용한 이후, <strong>모든 프로그래밍 언어의 첫 번째 프로그램</strong>으로 자리잡았습니다.</p>
<p>이 프로그램을 통해 <strong>개발 환경이 올바르게 설정되었는지</strong> 확인하고, C언어의 기본 구조를 파악할 수 있습니다.</p>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>컴퓨팅 사고력 — 분해(Decomposition)</strong>
    "화면에 글자를 출력하라"는 문제를 네 단계로 쪼갤 수 있습니다: (1) 도구 준비 → (2) 시작점 만들기 → (3) 출력 명령 → (4) 종료 알림. 문제를 작은 단계로 나누는 것이 <strong>분해</strong>입니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>첫 번째 C 프로그램</h2>
<p>아래가 C언어에서 가장 기본적인 프로그램입니다. <strong>결과를 예측</strong>한 뒤 실행해 보세요.</p>

<div class="lms-code-wrap">
  <div class="code-block" style="margin-bottom:0;">
    <div class="code-header">
      <div class="dots"><span></span><span></span><span></span></div>
      <span class="file">hello.c</span>
      <button class="lms-run-btn" data-code="#include &lt;stdio.h&gt;\\nint main(void){\\n    printf(&quot;Hello, world!\\n&quot;);\\n    return 0;\\n}" onclick="window.__runCCode && window.__runCCode(this)">▶ 실행</button>
    </div>
    <div class="code-body">
<span class="ln">1</span><span class="inc">#include</span> <span class="str">&lt;stdio.h&gt;</span><br>
<span class="ln">2</span><br>
<span class="ln">3</span><span class="tp">int</span> <span class="fn">main</span>(<span class="tp">void</span>)<br>
<span class="ln">4</span>{<br>
<span class="ln">5</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"Hello, world!\\n"</span>);<br>
<span class="ln">6</span><br>
<span class="ln">7</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="str">0</span>;<br>
<span class="ln">8</span>}
    </div>
  </div>
</div>
<div class="output-box">Hello, world!</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>코드 한 줄씩 분석하기</h2>

<div class="diagram">
  <div class="diagram-title">프로그램 구조도</div>
  <div class="diagram-flow">
    <div class="diagram-box" style="background:#e0f2fe;border-color:#0284c7;color:#0369a1;">도구 준비<br><small>#include</small></div>
    <div class="diagram-arrow">→</div>
    <div class="diagram-box" style="background:#ecfdf5;border-color:#10b981;color:#166534;">시작점<br><small>main()</small></div>
    <div class="diagram-arrow">→</div>
    <div class="diagram-box" style="background:#fef9c3;border-color:#eab308;color:#854d0e;">출력 명령<br><small>printf()</small></div>
    <div class="diagram-arrow">→</div>
    <div class="diagram-box" style="background:#f1f5f9;border-color:#94a3b8;color:#475569;">종료<br><small>return 0</small></div>
  </div>
</div>

<div class="step">
  <div class="step-num">1</div>
  <div class="step-body">
    <h4><code>#include &lt;stdio.h&gt;</code> — 도구 준비</h4>
    <p>"Standard Input/Output" 헤더 파일을 포함합니다. 앱을 설치해야 사용할 수 있듯, <code>printf</code>를 쓰려면 이 헤더가 필요합니다.</p>
  </div>
</div>
<div class="step">
  <div class="step-num">2</div>
  <div class="step-body">
    <h4><code>int main(void)</code> — 프로그램의 시작점</h4>
    <p>모든 C 프로그램은 <code>main</code> 함수에서 시작합니다. 책의 첫 페이지처럼, 컴퓨터는 항상 <code>main</code>부터 읽기 시작합니다.</p>
  </div>
</div>
<div class="step">
  <div class="step-num">3</div>
  <div class="step-body">
    <h4><code>printf("Hello, world!\\n");</code> — 출력 명령</h4>
    <p><code>printf</code>는 "print formatted"의 약자로, 괄호 안의 문자열을 화면에 출력합니다. <code>\\n</code>은 줄바꿈 이스케이프 시퀀스입니다.</p>
  </div>
</div>
<div class="step">
  <div class="step-num">4</div>
  <div class="step-body">
    <h4><code>return 0;</code> — 종료 신호</h4>
    <p><code>0</code>은 "정상 종료"를 의미합니다. 운영체제에게 프로그램이 문제없이 끝났음을 알려줍니다.</p>
  </div>
</div>

<div class="callout warn">
  <span class="callout-icon">!</span>
  <div class="callout-body">
    <strong>세미콜론을 잊지 마세요</strong>
    <code>printf(...);</code>와 <code>return 0;</code> 뒤에는 반드시 세미콜론이 필요합니다.
  </div>
</div>

<h3>이스케이프 시퀀스 참조표</h3>
<table class="summary-table">
  <tr><th>시퀀스</th><th>의미</th><th>사용 예</th></tr>
  <tr><td><code>\\n</code></td><td>줄바꿈(new line)</td><td>다음 줄로 이동</td></tr>
  <tr><td><code>\\t</code></td><td>탭(tab)</td><td>칸 띄우기</td></tr>
  <tr><td><code>\\\\</code></td><td>백슬래시 출력</td><td>경로 표시</td></tr>
  <tr><td><code>\\"</code></td><td>큰따옴표 출력</td><td>문자열 안에 " 넣기</td></tr>
</table>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>실행 흐름</h2>
<div class="flow">
  <div class="flow-step" style="background:#e0f2fe;">
    <div style="font-size:22px;color:#0284c7;margin-bottom:6px;">{ }</div>
    <div class="flow-label">1. 컴파일</div>
    <div class="flow-desc">소스 코드를 기계어로 변환</div>
  </div>
  <div class="flow-arrow">→</div>
  <div class="flow-step" style="background:#ecfdf5;">
    <div style="font-size:22px;color:#059669;margin-bottom:6px;">▶</div>
    <div class="flow-label">2. main 진입</div>
    <div class="flow-desc">프로그램 시작</div>
  </div>
  <div class="flow-arrow">→</div>
  <div class="flow-step" style="background:#fefce8;">
    <div style="font-size:22px;color:#ca8a04;margin-bottom:6px;">A</div>
    <div class="flow-label">3. 출력</div>
    <div class="flow-desc">결과가 화면에 표시</div>
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>직접 실험하며 배우기</h2>
<p>코드를 보고 <strong>먼저 결과를 예측</strong>한 다음, 실행해서 비교하세요.</p>

<div class="callout tip">
  <span class="callout-icon">TIP</span>
  <div class="callout-body">
    <strong>학습법: 예측 → 실행 → 비교</strong>
    코드를 보자마자 실행하지 마세요. "이 코드를 실행하면 무엇이 나올까?" 예측하는 습관을 들이세요.
  </div>
</div>

<div class="lms-code-wrap">
  <div class="code-block" style="margin-bottom:0;">
    <div class="code-header">
      <div class="dots"><span></span><span></span><span></span></div>
      <span class="file">multi_print.c</span>
      <button class="lms-run-btn" data-code="#include &lt;stdio.h&gt;\\nint main(void){\\n    printf(&quot;Hello, world!\\n&quot;);\\n    printf(&quot;C언어 공부 시작!\\n&quot;);\\n    printf(&quot;코딩쏙에서 배워요!\\n&quot;);\\n    return 0;\\n}" onclick="window.__runCCode && window.__runCCode(this)">▶ 실행</button>
    </div>
    <div class="code-body">
<span class="ln">1</span><span class="inc">#include</span> <span class="str">&lt;stdio.h&gt;</span><br>
<span class="ln">2</span><br>
<span class="ln">3</span><span class="tp">int</span> <span class="fn">main</span>(<span class="tp">void</span>)<br>
<span class="ln">4</span>{<br>
<span class="ln">5</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"Hello, world!\\n"</span>);  <span class="cm">// 첫 번째 출력</span><br>
<span class="ln">6</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"C언어 공부 시작!\\n"</span>); <span class="cm">// 두 번째 출력</span><br>
<span class="ln">7</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"코딩쏙에서 배워요!\\n"</span>); <span class="cm">// 세 번째 출력</span><br>
<span class="ln">8</span><br>
<span class="ln">9</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="str">0</span>;<br>
<span class="ln">10</span>}
    </div>
  </div>
</div>
<div class="output-box">Hello, world!<br>C언어 공부 시작!<br>코딩쏙에서 배워요!</div>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>컴퓨팅 사고력 — 패턴 인식(Pattern Recognition)</strong>
    <code>printf("...\\n");</code>라는 동일한 구조가 3번 반복됩니다. 코드 속 패턴을 찾는 능력이 프로그래밍의 핵심입니다.
  </div>
</div>

<h3><code>\\n</code>을 빼면 어떻게 될까?</h3>
<div class="code-block">
  <div class="code-header"><div class="dots"><span></span><span></span><span></span></div><span class="file">예시</span></div>
  <div class="code-body"><span class="fn">printf</span>(<span class="str">"Hello, "</span>);<br><span class="fn">printf</span>(<span class="str">"world!"</span>);</div>
</div>
<div class="output-box">Hello, world!</div>
<p><code>\\n</code>이 없으면 같은 줄에 이어서 출력됩니다.</p>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>자주 하는 실수 TOP 3</h2>

<div class="step">
  <div class="step-num" style="background:linear-gradient(135deg,#ef4444,#dc2626);">1</div>
  <div class="step-body">
    <h4>세미콜론 <code>;</code> 빠뜨리기</h4>
    <p><code>error: expected ';' after expression</code></p>
  </div>
</div>
<div class="step">
  <div class="step-num" style="background:linear-gradient(135deg,#ef4444,#dc2626);">2</div>
  <div class="step-body">
    <h4>큰따옴표 <code>"</code> 빠뜨리기</h4>
    <p><code>error: use of undeclared identifier 'Hello'</code></p>
  </div>
</div>
<div class="step">
  <div class="step-num" style="background:linear-gradient(135deg,#ef4444,#dc2626);">3</div>
  <div class="step-body">
    <h4><code>#include</code> 빠뜨리기</h4>
    <p><code>warning: implicit declaration of function 'printf'</code></p>
  </div>
</div>

<div class="callout tip">
  <span class="callout-icon">TIP</span>
  <div class="callout-body">
    <strong>디버깅 첫걸음</strong>
    에러 메시지에는 몇 번째 줄에 어떤 문제가 있는지 힌트가 담겨 있습니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>핵심 정리</h2>
<table class="summary-table">
  <tr><th style="width:35%;">요소</th><th>역할</th></tr>
  <tr><td><code>#include &lt;stdio.h&gt;</code></td><td>표준 입출력 헤더 포함</td></tr>
  <tr><td><code>int main(void)</code></td><td>프로그램의 시작점</td></tr>
  <tr><td><code>{ }</code></td><td>코드 블록의 시작과 끝</td></tr>
  <tr><td><code>printf()</code></td><td>서식 출력 함수</td></tr>
  <tr><td><code>"문자열"</code></td><td>큰따옴표로 감싼 텍스트</td></tr>
  <tr><td><code>\\n</code></td><td>줄바꿈 이스케이프 시퀀스</td></tr>
  <tr><td><code>;</code></td><td>실행문의 종결자</td></tr>
  <tr><td><code>return 0;</code></td><td>정상 종료 코드</td></tr>
</table>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>오늘 배운 컴퓨팅 사고력</strong>
    <ul style="margin:8px 0 0;">
      <li><strong>분해</strong> — 큰 문제를 작은 단계로 나누기</li>
      <li><strong>순차 구조</strong> — 코드는 위에서 아래로 실행</li>
      <li><strong>패턴 인식</strong> — 반복되는 코드 구조 찾기</li>
    </ul>
  </div>
</div>

</div>`;

// ────────────────────────────────────────────────
// PAGE 3.4 CONTENT PLACEHOLDER — will be added via replace
// ────────────────────────────────────────────────
const PAGE_34_CONTENT = BLOG_CSS + `
<div class="blog">

<div class="blog-hero">
  <div class="meta">Unit 3 · Page 4 · 난이도 ★★☆ · 약 10분</div>
  <h1>서식 지정자 사용하기</h1>
  <p>printf()에서 숫자, 문자, 문자열을 원하는 형태로 출력하는 방법을 배웁니다.</p>
  <div class="tags">
    <span class="tag">%d</span>
    <span class="tag">%f</span>
    <span class="tag">%c</span>
    <span class="tag">%s</span>
  </div>
</div>

<h2>서식 지정자란?</h2>
<p>택배 송장에 빈칸이 있으면 보내는 사람, 받는 사람 이름을 채워 넣듯이, <code>printf</code>의 서식 지정자는 <strong>"여기에 값을 넣어 주세요"</strong>라는 빈칸 역할을 합니다.</p>
<p><code>%d</code>, <code>%f</code>, <code>%c</code>, <code>%s</code> — 이 네 가지만 알면 대부분의 출력을 처리할 수 있습니다.</p>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>컴퓨팅 사고력 — 추상화(Abstraction)</strong>
    구체적인 값(42, 3.14, 'A')을 직접 쓰지 않고, <code>%d</code>라는 일반적인 틀로 표현하는 것이 <strong>추상화</strong>입니다. 덕분에 같은 코드로 다양한 값을 출력할 수 있습니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>첫 번째 예제</h2>

<div class="lms-code-wrap">
  <div class="code-block" style="margin-bottom:0;">
    <div class="code-header">
      <div class="dots"><span></span><span></span><span></span></div>
      <span class="file">format.c</span>
      <button class="lms-run-btn" data-code="#include <stdio.h>\\nint main(void){\\n    printf(\\"정수: %d\\\\n\\", 42);\\n    printf(\\"실수: %f\\\\n\\", 3.14);\\n    printf(\\"문자: %c\\\\n\\", 'A');\\n    printf(\\"문자열: %s\\\\n\\", \\"Hello\\");\\n    return 0;\\n}" onclick="window.__runCCode && window.__runCCode(this)">▶ 실행</button>
    </div>
    <div class="code-body">
<span class="ln">1</span><span class="inc">#include</span> <span class="str">&lt;stdio.h&gt;</span><br>
<span class="ln">2</span><br>
<span class="ln">3</span><span class="tp">int</span> <span class="fn">main</span>(<span class="tp">void</span>)<br>
<span class="ln">4</span>{<br>
<span class="ln">5</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"정수: %d\\n"</span>, <span class="tp">42</span>);<br>
<span class="ln">6</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"실수: %f\\n"</span>, <span class="tp">3.14</span>);<br>
<span class="ln">7</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"문자: %c\\n"</span>, <span class="str">'A'</span>);<br>
<span class="ln">8</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"문자열: %s\\n"</span>, <span class="str">"Hello"</span>);<br>
<span class="ln">9</span><br>
<span class="ln">10</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="str">0</span>;<br>
<span class="ln">11</span>}
    </div>
  </div>
</div>
<div class="output-box">정수: 42<br>실수: 3.140000<br>문자: A<br>문자열: Hello</div>

<!-- 시각 자료: printf 매칭 다이어그램 -->
<div class="diagram">
  <div class="diagram-title">printf 서식 지정자 매칭 원리</div>
  <div class="diagram-flow">
    <div class="diagram-box" style="background:#fef9c3;border-color:#eab308;color:#854d0e;">printf("<strong>%d</strong>", ...)</div>
    <div class="diagram-arrow">←</div>
    <div class="diagram-box" style="background:#e0f2fe;border-color:#0284c7;color:#0369a1;"><strong>42</strong></div>
  </div>
  <p style="font-size:13px;color:#64748b;margin-top:12px;">서식 문자열의 <code>%d</code> 자리에 쉼표 뒤의 값 <code>42</code>가 들어갑니다.</p>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>4대 서식 지정자</h2>

<table class="summary-table">
  <tr><th>지정자</th><th>의미</th><th>예시 값</th><th>출력 결과</th></tr>
  <tr><td><code>%d</code></td><td>10진 정수(decimal)</td><td>42</td><td>42</td></tr>
  <tr><td><code>%f</code></td><td>실수(float)</td><td>3.14</td><td>3.140000</td></tr>
  <tr><td><code>%c</code></td><td>문자(character)</td><td>'A'</td><td>A</td></tr>
  <tr><td><code>%s</code></td><td>문자열(string)</td><td>"Hello"</td><td>Hello</td></tr>
</table>

<div class="step">
  <div class="step-num">1</div>
  <div class="step-body">
    <h4><code>%d</code> — 정수 출력</h4>
    <p><code>printf("%d", 42);</code> → 정수 42를 출력합니다. d는 decimal(10진수)의 약자입니다.</p>
  </div>
</div>
<div class="step">
  <div class="step-num">2</div>
  <div class="step-body">
    <h4><code>%f</code> — 실수 출력</h4>
    <p><code>printf("%f", 3.14);</code> → 기본적으로 소수점 6자리까지 출력됩니다. f는 float(부동소수점)의 약자입니다.</p>
  </div>
</div>
<div class="step">
  <div class="step-num">3</div>
  <div class="step-body">
    <h4><code>%c</code> — 문자 출력</h4>
    <p><code>printf("%c", 'A');</code> → 문자 하나를 출력합니다. <strong>작은따옴표</strong>로 감싸야 합니다.</p>
  </div>
</div>
<div class="step">
  <div class="step-num">4</div>
  <div class="step-body">
    <h4><code>%s</code> — 문자열 출력</h4>
    <p><code>printf("%s", "Hello");</code> → 문자열을 출력합니다. <strong>큰따옴표</strong>로 감싸야 합니다.</p>
  </div>
</div>

<div class="callout tip">
  <span class="callout-icon">TIP</span>
  <div class="callout-body">
    <strong>소수점 자리 지정하기</strong>
    <code>%.2f</code>로 쓰면 소수점 아래 <strong>2자리</strong>까지만 출력합니다.<br>
    <code>printf("%.2f", 3.141592);</code> → <code>3.14</code>
  </div>
</div>

<div class="callout warn">
  <span class="callout-icon">!</span>
  <div class="callout-body">
    <strong>타입이 일치해야 합니다</strong>
    <code>%d</code>에 실수를 넣거나, <code>%s</code>에 정수를 넣으면 잘못된 값이 출력되거나 에러가 발생합니다. 서식 지정자와 값의 타입이 반드시 일치해야 합니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>여러 값 동시 출력</h2>
<p>하나의 <code>printf</code>에서 서식 지정자를 여러 개 사용할 수 있습니다. 먼저 결과를 예측해 보세요.</p>

<div class="lms-code-wrap">
  <div class="code-block" style="margin-bottom:0;">
    <div class="code-header">
      <div class="dots"><span></span><span></span><span></span></div>
      <span class="file">multi_format.c</span>
      <button class="lms-run-btn" data-code="#include <stdio.h>\\nint main(void){\\n    printf(\\"이름: %s, 나이: %d세\\\\n\\", \\"홍길동\\", 20);\\n    printf(\\"점수: %d / %d (%.1f%%)\\\\n\\", 85, 100, 85.0);\\n    return 0;\\n}" onclick="window.__runCCode && window.__runCCode(this)">▶ 실행</button>
    </div>
    <div class="code-body">
<span class="ln">1</span><span class="inc">#include</span> <span class="str">&lt;stdio.h&gt;</span><br>
<span class="ln">2</span><br>
<span class="ln">3</span><span class="tp">int</span> <span class="fn">main</span>(<span class="tp">void</span>)<br>
<span class="ln">4</span>{<br>
<span class="ln">5</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"이름: %s, 나이: %d세\\n"</span>, <span class="str">"홍길동"</span>, <span class="tp">20</span>);<br>
<span class="ln">6</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"점수: %d / %d (%.1f%%)\\n"</span>, <span class="tp">85</span>, <span class="tp">100</span>, <span class="tp">85.0</span>);<br>
<span class="ln">7</span><br>
<span class="ln">8</span>&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="str">0</span>;<br>
<span class="ln">9</span>}
    </div>
  </div>
</div>
<div class="output-box">이름: 홍길동, 나이: 20세<br>점수: 85 / 100 (85.0%)</div>

<!-- 매칭 다이어그램 -->
<div class="diagram">
  <div class="diagram-title">여러 서식 지정자 매칭</div>
  <div style="font-family:'Fira Code',monospace;font-size:14px;color:#374151;line-height:2.2;text-align:left;max-width:420px;margin:0 auto;">
    <div>printf("<span style="color:#0284c7;font-weight:700;">%s</span>, <span style="color:#0284c7;font-weight:700;">%d</span>세", <span style="color:#059669;font-weight:700;">"홍길동"</span>, <span style="color:#059669;font-weight:700;">20</span>);</div>
    <div style="font-size:13px;color:#94a3b8;margin-top:4px;">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0284c7;">↑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#0284c7;">↑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#059669;">↑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#059669;">↑</span>
    </div>
    <div style="font-size:12px;color:#64748b;">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1번 ←──────── 1번 매칭<br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2번 ──── 2번 매칭
    </div>
  </div>
</div>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>컴퓨팅 사고력 — 패턴 인식(Pattern Recognition)</strong>
    서식 지정자(%○)와 뒤의 값이 <strong>순서대로 1:1 매칭</strong>됩니다. 첫 번째 %는 첫 번째 값, 두 번째 %는 두 번째 값. 이 패턴만 기억하면 됩니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>자주 하는 실수 TOP 3</h2>

<div class="step">
  <div class="step-num" style="background:linear-gradient(135deg,#ef4444,#dc2626);">1</div>
  <div class="step-body">
    <h4>서식 지정자와 값의 개수 불일치</h4>
    <p><code>printf("%d %d", 10);</code> → %d가 2개인데 값이 1개. 쓰레기 값이 출력됩니다.</p>
  </div>
</div>
<div class="step">
  <div class="step-num" style="background:linear-gradient(135deg,#ef4444,#dc2626);">2</div>
  <div class="step-body">
    <h4>타입 불일치</h4>
    <p><code>printf("%d", 3.14);</code> → 정수 지정자에 실수를 넣으면 <code>0</code>이나 이상한 값이 나옵니다.</p>
  </div>
</div>
<div class="step">
  <div class="step-num" style="background:linear-gradient(135deg,#ef4444,#dc2626);">3</div>
  <div class="step-body">
    <h4>문자와 문자열 따옴표 혼동</h4>
    <p>문자 <code>'A'</code>는 작은따옴표, 문자열 <code>"Hello"</code>는 큰따옴표. 바꿔 쓰면 에러가 납니다.</p>
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>핵심 정리</h2>
<table class="summary-table">
  <tr><th>요소</th><th>설명</th><th>예시</th></tr>
  <tr><td><code>%d</code></td><td>10진 정수 출력</td><td>printf("%d", 42) → 42</td></tr>
  <tr><td><code>%f</code></td><td>실수 출력 (소수점 6자리)</td><td>printf("%f", 3.14) → 3.140000</td></tr>
  <tr><td><code>%.nf</code></td><td>소수점 n자리까지 출력</td><td>printf("%.2f", 3.14) → 3.14</td></tr>
  <tr><td><code>%c</code></td><td>문자 1개 출력 (작은따옴표)</td><td>printf("%c", 'A') → A</td></tr>
  <tr><td><code>%s</code></td><td>문자열 출력 (큰따옴표)</td><td>printf("%s", "Hi") → Hi</td></tr>
  <tr><td><code>%%</code></td><td>% 기호 자체를 출력</td><td>printf("100%%") → 100%</td></tr>
</table>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>오늘 배운 컴퓨팅 사고력</strong>
    <ul style="margin:8px 0 0;">
      <li><strong>추상화</strong> — 구체적 값 대신 서식 지정자(%d)라는 일반적 틀 사용</li>
      <li><strong>패턴 인식</strong> — 서식 지정자와 값의 순서 매칭 패턴</li>
      <li><strong>일반화</strong> — 같은 printf 구조로 다양한 데이터 타입 처리</li>
    </ul>
  </div>
</div>

</div>`;

// ────────────────────────────────────────────────
// PAGE 3.5 — 심사 사이트 사용하기
// ────────────────────────────────────────────────
const PAGE_35_CONTENT = BLOG_CSS + `
<div class="blog">

<div class="blog-hero">
  <div class="meta">Unit 3 · Page 5 · 난이도 ★☆☆ · 약 5분</div>
  <h1>심사 사이트 사용하기</h1>
  <p>작성한 코드를 자동으로 채점받는 방법을 배웁니다. 출력 결과가 정확히 일치해야 통과됩니다.</p>
  <div class="tags">
    <span class="tag">온라인 저지</span>
    <span class="tag">자동 채점</span>
    <span class="tag">제출 방법</span>
  </div>
</div>

<h2>심사 사이트란?</h2>
<p><strong>심사 사이트(온라인 저지, Online Judge)</strong>는 여러분이 작성한 코드를 자동으로 채점해 주는 시스템입니다. 시험지를 제출하면 선생님이 채점하듯, 코드를 제출하면 컴퓨터가 대신 채점합니다.</p>
<p>정답 판정의 기준은 단 하나 — <strong>출력 결과가 정확히 일치</strong>하는지 여부입니다. 공백 하나, 줄바꿈 하나까지 정확해야 합니다.</p>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>컴퓨팅 사고력 — 정밀성(Precision)</strong>
    컴퓨터는 "대충 비슷하면 OK"가 아닙니다. <strong>글자 하나라도 다르면 오답</strong>입니다. 이런 엄격한 정밀성이 프로그래밍의 기본 원칙입니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>제출 과정</h2>

<div class="diagram">
  <div class="diagram-title">심사 채점 흐름</div>
  <div class="diagram-flow">
    <div class="diagram-box" style="background:#e0f2fe;border-color:#0284c7;color:#0369a1;">코드 작성<br><small>에디터</small></div>
    <div class="diagram-arrow">→</div>
    <div class="diagram-box" style="background:#fef9c3;border-color:#eab308;color:#854d0e;">제출<br><small>Submit</small></div>
    <div class="diagram-arrow">→</div>
    <div class="diagram-box" style="background:#ecfdf5;border-color:#10b981;color:#166534;">자동 채점<br><small>비교 판정</small></div>
    <div class="diagram-arrow">→</div>
    <div class="diagram-box" style="background:#f1f5f9;border-color:#94a3b8;color:#475569;">결과 확인<br><small>정답/오답</small></div>
  </div>
</div>

<div class="step">
  <div class="step-num">1</div>
  <div class="step-body">
    <h4>문제 읽기</h4>
    <p>문제에서 요구하는 <strong>출력 형식</strong>을 정확히 파악합니다. 예시 출력을 주의 깊게 읽으세요.</p>
  </div>
</div>
<div class="step">
  <div class="step-num">2</div>
  <div class="step-body">
    <h4>코드 작성</h4>
    <p>에디터에 코드를 작성합니다. 로컬에서 먼저 테스트한 후 제출하는 것이 좋습니다.</p>
  </div>
</div>
<div class="step">
  <div class="step-num">3</div>
  <div class="step-body">
    <h4>제출 및 결과 확인</h4>
    <p>코드를 붙여넣고 제출하면, 서버가 자동으로 컴파일·실행·비교하여 결과를 알려줍니다.</p>
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>심사 결과 유형</h2>
<table class="summary-table">
  <tr><th>결과</th><th>의미</th><th>대처 방법</th></tr>
  <tr><td><strong style="color:#16a34a;">정답</strong></td><td>출력이 완벽히 일치</td><td>축하합니다! 다음 문제로</td></tr>
  <tr><td><strong style="color:#dc2626;">오답</strong></td><td>출력이 다름</td><td>공백, 줄바꿈, 대소문자 확인</td></tr>
  <tr><td><strong style="color:#ea580c;">컴파일 에러</strong></td><td>문법 오류</td><td>에러 메시지 확인 후 수정</td></tr>
  <tr><td><strong style="color:#9333ea;">런타임 에러</strong></td><td>실행 중 오류</td><td>0으로 나누기, 배열 범위 초과 등 확인</td></tr>
</table>

<div class="callout warn">
  <span class="callout-icon">!</span>
  <div class="callout-body">
    <strong>가장 흔한 오답 원인</strong>
    <ul style="margin:8px 0 0;">
      <li><code>Hello, World!</code>와 <code>Hello, world!</code>는 <strong>다른 문자열</strong>입니다 (대소문자)</li>
      <li>마지막 줄바꿈 <code>\\n</code> 유무도 판정에 영향을 줄 수 있습니다</li>
      <li>불필요한 공백이나 문자가 들어가면 오답 처리됩니다</li>
    </ul>
  </div>
</div>

<div class="callout tip">
  <span class="callout-icon">TIP</span>
  <div class="callout-body">
    <strong>오답이 나왔을 때</strong>
    문제의 예시 출력을 한 글자씩 비교해 보세요. 눈에는 같아 보여도 공백이나 줄바꿈이 다를 수 있습니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>핵심 정리</h2>
<table class="summary-table">
  <tr><th style="width:40%;">요소</th><th>설명</th></tr>
  <tr><td>온라인 저지</td><td>코드를 자동 채점하는 시스템</td></tr>
  <tr><td>정답 판정 기준</td><td>기대 출력과 실제 출력이 100% 일치</td></tr>
  <tr><td>주의할 점</td><td>대소문자, 공백, 줄바꿈까지 정확히 맞추기</td></tr>
  <tr><td>오답 시 대처</td><td>예시 출력과 한 글자씩 비교</td></tr>
</table>

</div>`;

// ────────────────────────────────────────────────
// PAGE 3.7 — 연습문제: 문자열 출력하기
// ────────────────────────────────────────────────
const PAGE_37_CONTENT = BLOG_CSS + `
<div class="blog">

<div class="blog-hero">
  <div class="meta">Unit 3 · Page 7 · 연습문제 · 난이도 ★☆☆</div>
  <h1>연습문제: 문자열 출력하기</h1>
  <p>printf()를 사용하여 다양한 문자열을 출력하는 연습입니다.</p>
  <div class="tags">
    <span class="tag">printf</span>
    <span class="tag">\\n</span>
    <span class="tag">문자열</span>
  </div>
</div>

<h2>문제 1 — 한 줄 출력</h2>
<p>화면에 다음을 출력하세요:</p>
<div class="output-box">Hello, C!</div>

<div class="callout tip">
  <span class="callout-icon">TIP</span>
  <div class="callout-body">
    <strong>힌트</strong>
    <code>printf</code>의 큰따옴표 안에 출력할 문자열을 넣으세요. 마지막에 <code>\\n</code>을 잊지 마세요.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>문제 2 — 여러 줄 출력</h2>
<p>화면에 다음 3줄을 출력하세요:</p>
<div class="output-box">Hello, world!<br>Hello, C!<br>Hello, coding!</div>

<div class="callout tip">
  <span class="callout-icon">TIP</span>
  <div class="callout-body">
    <strong>힌트</strong>
    <code>printf</code>를 3번 사용하거나, 하나의 <code>printf</code> 안에 <code>\\n</code>을 넣어서 줄바꿈할 수 있습니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>문제 3 — 이스케이프 시퀀스</h2>
<p>화면에 다음을 출력하세요 (큰따옴표 포함):</p>
<div class="output-box">"Hello, world!"</div>

<div class="callout tip">
  <span class="callout-icon">TIP</span>
  <div class="callout-body">
    <strong>힌트</strong>
    큰따옴표를 출력하려면 이스케이프 시퀀스 <code>\\"</code>를 사용합니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>핵심 체크리스트</h2>
<table class="summary-table">
  <tr><th>체크 항목</th><th>확인</th></tr>
  <tr><td><code>#include &lt;stdio.h&gt;</code> 포함했나요?</td><td>필수</td></tr>
  <tr><td><code>main</code> 함수 안에 코드를 작성했나요?</td><td>필수</td></tr>
  <tr><td>문자열을 큰따옴표로 감쌌나요?</td><td>필수</td></tr>
  <tr><td>문장 끝에 세미콜론을 넣었나요?</td><td>필수</td></tr>
  <tr><td>출력 형식이 문제와 정확히 같나요?</td><td>필수</td></tr>
</table>

</div>`;

// ────────────────────────────────────────────────
// PAGE 3.8 — 연습문제: 서식 지정자 사용하기
// ────────────────────────────────────────────────
const PAGE_38_CONTENT = BLOG_CSS + `
<div class="blog">

<div class="blog-hero">
  <div class="meta">Unit 3 · Page 8 · 연습문제 · 난이도 ★★☆</div>
  <h1>연습문제: 서식 지정자 사용하기</h1>
  <p>%d, %f, %c, %s를 활용하여 다양한 데이터를 출력하는 연습입니다.</p>
  <div class="tags">
    <span class="tag">%d</span>
    <span class="tag">%f</span>
    <span class="tag">%c</span>
    <span class="tag">%s</span>
  </div>
</div>

<h2>문제 1 — 정수 출력</h2>
<p>서식 지정자를 사용하여 다음을 출력하세요:</p>
<div class="output-box">나는 20살입니다.</div>
<p><code>20</code>은 반드시 <code>%d</code> 서식 지정자를 사용하세요.</p>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>문제 2 — 실수 출력</h2>
<p>서식 지정자를 사용하여 키를 소수점 1자리까지 출력하세요:</p>
<div class="output-box">키: 175.5cm</div>

<div class="callout tip">
  <span class="callout-icon">TIP</span>
  <div class="callout-body">
    <strong>힌트</strong>
    소수점 1자리는 <code>%.1f</code>를 사용합니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>문제 3 — 복합 출력</h2>
<p>여러 서식 지정자를 조합하여 다음을 출력하세요:</p>
<div class="output-box">이름: 김코딩, 나이: 15세, 학점: A</div>
<p>이름은 <code>%s</code>, 나이는 <code>%d</code>, 학점은 <code>%c</code>를 사용하세요.</p>

<!-- 매칭 시각 자료 -->
<div class="diagram">
  <div class="diagram-title">서식 지정자 매칭 가이드</div>
  <div class="diagram-flow">
    <div class="diagram-box" style="background:#e0f2fe;border-color:#0284c7;color:#0369a1;">%s → "김코딩"</div>
    <div class="diagram-box" style="background:#ecfdf5;border-color:#10b981;color:#166534;">%d → 15</div>
    <div class="diagram-box" style="background:#fef9c3;border-color:#eab308;color:#854d0e;">%c → 'A'</div>
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>핵심 체크리스트</h2>
<table class="summary-table">
  <tr><th>체크 항목</th><th>확인</th></tr>
  <tr><td>서식 지정자와 값의 <strong>타입</strong>이 같나요?</td><td>%d↔정수, %f↔실수, %c↔문자, %s↔문자열</td></tr>
  <tr><td>서식 지정자와 값의 <strong>개수</strong>가 같나요?</td><td>%가 3개면 값도 3개</td></tr>
  <tr><td>서식 지정자와 값의 <strong>순서</strong>가 맞나요?</td><td>왼쪽부터 1:1 매칭</td></tr>
  <tr><td>문자는 <strong>작은따옴표</strong>, 문자열은 <strong>큰따옴표</strong>?</td><td>'A' vs "Hello"</td></tr>
</table>

</div>`;

// ────────────────────────────────────────────────
// PAGE 4.1 — 세미콜론
// ────────────────────────────────────────────────
const PAGE_41_CONTENT = BLOG_CSS + `
<div class="blog">

<div class="blog-hero">
  <div class="meta">Unit 4 · Page 1 · 난이도 ★☆☆ · 약 5분</div>
  <h1>세미콜론</h1>
  <p>C언어에서 문장의 끝을 알리는 마침표, 세미콜론(;)의 역할과 규칙을 배웁니다.</p>
  <div class="tags">
    <span class="tag">세미콜론 ;</span>
    <span class="tag">문장 종결</span>
    <span class="tag">구문 규칙</span>
  </div>
</div>

<h2>세미콜론이란?</h2>
<p>한국어에서 문장 끝에 마침표(.)를 찍듯, C언어에서는 <strong>실행문의 끝</strong>에 세미콜론(<code>;</code>)을 붙입니다. 세미콜론은 "이 문장은 여기서 끝"이라는 신호입니다.</p>

<div class="diagram">
  <div class="diagram-title">한국어 vs C언어 비교</div>
  <div class="diagram-flow">
    <div class="diagram-box" style="background:#f1f5f9;border-color:#94a3b8;color:#475569;">한국어: 나는 학생이다<strong>.</strong></div>
    <div class="diagram-arrow">≈</div>
    <div class="diagram-box" style="background:#e0f2fe;border-color:#0284c7;color:#0369a1;">C언어: printf("Hello")<strong>;</strong></div>
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>세미콜론이 필요한 곳</h2>
<div class="step">
  <div class="step-num">1</div>
  <div class="step-body">
    <h4>변수 선언</h4>
    <p><code>int a = 10;</code></p>
  </div>
</div>
<div class="step">
  <div class="step-num">2</div>
  <div class="step-body">
    <h4>함수 호출</h4>
    <p><code>printf("Hello");</code></p>
  </div>
</div>
<div class="step">
  <div class="step-num">3</div>
  <div class="step-body">
    <h4>return 문</h4>
    <p><code>return 0;</code></p>
  </div>
</div>

<h3>세미콜론이 필요 없는 곳</h3>
<table class="summary-table">
  <tr><th>구문</th><th>예시</th><th>이유</th></tr>
  <tr><td><code>#include</code></td><td>#include &lt;stdio.h&gt;</td><td>전처리 지시자 (실행문이 아님)</td></tr>
  <tr><td>함수 헤더</td><td>int main(void)</td><td>함수 정의의 시작 부분</td></tr>
  <tr><td>중괄호</td><td>{ }</td><td>블록 구분자</td></tr>
</table>

<div class="callout warn">
  <span class="callout-icon">!</span>
  <div class="callout-body">
    <strong>가장 흔한 에러</strong>
    세미콜론을 빼먹으면 <code>error: expected ';'</code> 에러가 나옵니다. 에러 메시지가 가리키는 줄의 <strong>윗줄</strong>을 확인하세요 — 보통 윗줄에 세미콜론이 빠져 있습니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>핵심 정리</h2>
<table class="summary-table">
  <tr><th style="width:40%;">규칙</th><th>설명</th></tr>
  <tr><td>실행문 끝에 <code>;</code></td><td>printf, return, 변수 선언 등</td></tr>
  <tr><td>전처리 지시자에는 붙이지 않음</td><td>#include, #define 등</td></tr>
  <tr><td>에러 발생 시</td><td>에러 줄의 윗줄을 먼저 확인</td></tr>
</table>

</div>`;

// ────────────────────────────────────────────────
// PAGE 4.2 — 주석
// ────────────────────────────────────────────────
const PAGE_42_CONTENT = BLOG_CSS + `
<div class="blog">

<div class="blog-hero">
  <div class="meta">Unit 4 · Page 2 · 난이도 ★☆☆ · 약 5분</div>
  <h1>주석</h1>
  <p>코드에 설명을 다는 방법. 컴퓨터는 무시하지만, 사람에게는 꼭 필요한 메모입니다.</p>
  <div class="tags">
    <span class="tag">// 한 줄 주석</span>
    <span class="tag">/* */ 여러 줄 주석</span>
  </div>
</div>

<h2>주석이란?</h2>
<p>교과서에 메모를 적듯, 코드에도 설명을 적을 수 있습니다. 이를 <strong>주석(comment)</strong>이라 합니다. 주석은 컴파일러가 <strong>완전히 무시</strong>하므로 프로그램 실행에 영향을 주지 않습니다.</p>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>컴퓨팅 사고력 — 추상화(Abstraction)</strong>
    주석은 복잡한 코드의 <strong>의도</strong>를 간결하게 요약합니다. "무엇을 하는 코드인지"를 한 줄로 설명하는 것이 추상화입니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>두 가지 주석 스타일</h2>

<div class="step">
  <div class="step-num">1</div>
  <div class="step-body">
    <h4>한 줄 주석 <code>//</code></h4>
    <p><code>//</code> 뒤의 모든 내용이 무시됩니다. 짧은 설명에 적합합니다.</p>
  </div>
</div>

<div class="code-block">
  <div class="code-header"><div class="dots"><span></span><span></span><span></span></div><span class="file">한 줄 주석 예시</span></div>
  <div class="code-body">
<span class="fn">printf</span>(<span class="str">"Hello"</span>); <span class="cm">// 화면에 Hello 출력</span><br>
<span class="cm">// 아래 코드는 실행되지 않습니다</span><br>
<span class="cm">// printf("이 줄은 무시됨");</span>
  </div>
</div>

<div class="step">
  <div class="step-num">2</div>
  <div class="step-body">
    <h4>여러 줄 주석 <code>/* */</code></h4>
    <p><code>/*</code>에서 시작하여 <code>*/</code>에서 끝납니다. 긴 설명에 적합합니다.</p>
  </div>
</div>

<div class="code-block">
  <div class="code-header"><div class="dots"><span></span><span></span><span></span></div><span class="file">여러 줄 주석 예시</span></div>
  <div class="code-body">
<span class="cm">/*</span><br>
<span class="cm"> * 프로그램명: Hello World</span><br>
<span class="cm"> * 작성자: 홍길동</span><br>
<span class="cm"> * 작성일: 2024-01-01</span><br>
<span class="cm"> */</span>
  </div>
</div>

<div class="callout tip">
  <span class="callout-icon">TIP</span>
  <div class="callout-body">
    <strong>좋은 주석 vs 나쁜 주석</strong>
    <ul style="margin:8px 0 0;">
      <li><strong>좋은 주석:</strong> <code>// 사용자 입력에서 공백 제거</code> (의도 설명)</li>
      <li><strong>나쁜 주석:</strong> <code>// a에 1을 더함</code> (코드를 그대로 반복)</li>
    </ul>
  </div>
</div>

<div class="callout warn">
  <span class="callout-icon">!</span>
  <div class="callout-body">
    <strong>주의: 여러 줄 주석은 중첩 불가</strong>
    <code>/* /* 중첩 주석 */ */</code>은 에러가 발생합니다. 첫 번째 <code>*/</code>에서 주석이 끝나기 때문입니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>핵심 정리</h2>
<table class="summary-table">
  <tr><th>종류</th><th>문법</th><th>용도</th></tr>
  <tr><td>한 줄 주석</td><td><code>// 내용</code></td><td>짧은 설명, 코드 옆 메모</td></tr>
  <tr><td>여러 줄 주석</td><td><code>/* 내용 */</code></td><td>긴 설명, 파일 헤더</td></tr>
  <tr><td>디버깅 활용</td><td>코드를 주석 처리</td><td>일시적으로 코드 비활성화</td></tr>
</table>

</div>`;

// ────────────────────────────────────────────────
// PAGE 4.3 — 중괄호
// ────────────────────────────────────────────────
const PAGE_43_CONTENT = BLOG_CSS + `
<div class="blog">

<div class="blog-hero">
  <div class="meta">Unit 4 · Page 3 · 난이도 ★☆☆ · 약 5분</div>
  <h1>중괄호</h1>
  <p>코드 블록의 시작과 끝을 나타내는 중괄호 { }의 의미와 사용법을 알아봅니다.</p>
  <div class="tags">
    <span class="tag">{ }</span>
    <span class="tag">코드 블록</span>
    <span class="tag">스코프</span>
  </div>
</div>

<h2>중괄호란?</h2>
<p>책에 목차와 장이 있듯, C언어에서는 <strong>중괄호(<code>{ }</code>)</strong>로 코드의 범위를 구분합니다. 여는 중괄호 <code>{</code>가 블록의 시작, 닫는 중괄호 <code>}</code>가 블록의 끝입니다.</p>

<div class="diagram">
  <div class="diagram-title">중괄호 = 코드의 울타리</div>
  <div class="diagram-flow">
    <div class="diagram-box" style="background:#e0f2fe;border-color:#0284c7;color:#0369a1;"><strong>{</strong> 블록 시작</div>
    <div class="diagram-arrow">···</div>
    <div class="diagram-box" style="background:#fef9c3;border-color:#eab308;color:#854d0e;">실행할 코드들</div>
    <div class="diagram-arrow">···</div>
    <div class="diagram-box" style="background:#e0f2fe;border-color:#0284c7;color:#0369a1;"><strong>}</strong> 블록 끝</div>
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>중괄호 사용 예시</h2>

<div class="code-block">
  <div class="code-header"><div class="dots"><span></span><span></span><span></span></div><span class="file">braces.c</span></div>
  <div class="code-body">
<span class="inc">#include</span> <span class="str">&lt;stdio.h&gt;</span><br>
<br>
<span class="tp">int</span> <span class="fn">main</span>(<span class="tp">void</span>)<br>
<span style="color:#38bdf8;font-weight:700;">{</span> <span class="cm">// main 함수 블록 시작</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"Hello!\\n"</span>);<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="str">0</span>;<br>
<span style="color:#38bdf8;font-weight:700;">}</span> <span class="cm">// main 함수 블록 끝</span>
  </div>
</div>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>컴퓨팅 사고력 — 분해(Decomposition)</strong>
    중괄호는 프로그램을 논리적 단위(블록)로 나눕니다. 각 블록은 하나의 역할을 담당합니다. 이것이 분해의 원리입니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>중괄호 규칙</h2>
<table class="summary-table">
  <tr><th>규칙</th><th>설명</th></tr>
  <tr><td>반드시 짝으로 사용</td><td><code>{</code>를 열면 반드시 <code>}</code>로 닫아야 합니다</td></tr>
  <tr><td>중첩 가능</td><td>블록 안에 블록을 넣을 수 있습니다</td></tr>
  <tr><td>세미콜론 불필요</td><td><code>}</code> 뒤에는 보통 세미콜론을 붙이지 않습니다</td></tr>
</table>

<div class="callout warn">
  <span class="callout-icon">!</span>
  <div class="callout-body">
    <strong>짝이 맞지 않으면?</strong>
    <code>error: expected '}'</code> 에러가 발생합니다. 에디터의 괄호 매칭 기능을 활용하세요.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>핵심 정리</h2>
<table class="summary-table">
  <tr><th style="width:40%;">요소</th><th>설명</th></tr>
  <tr><td><code>{ }</code></td><td>코드 블록의 시작과 끝</td></tr>
  <tr><td>반드시 짝으로</td><td>열면 반드시 닫기</td></tr>
  <tr><td>중첩</td><td>블록 안에 블록 가능</td></tr>
  <tr><td>에러 대처</td><td>에디터 괄호 매칭 활용</td></tr>
</table>

</div>`;

// ────────────────────────────────────────────────
// PAGE 4.4 — 들여쓰기
// ────────────────────────────────────────────────
const PAGE_44_CONTENT = BLOG_CSS + `
<div class="blog">

<div class="blog-hero">
  <div class="meta">Unit 4 · Page 4 · 난이도 ★☆☆ · 약 5분</div>
  <h1>들여쓰기</h1>
  <p>코드의 가독성을 높이는 들여쓰기(indentation) 규칙을 익힙니다.</p>
  <div class="tags">
    <span class="tag">들여쓰기</span>
    <span class="tag">가독성</span>
    <span class="tag">코딩 스타일</span>
  </div>
</div>

<h2>들여쓰기란?</h2>
<p>동화책에서 대화 내용을 안쪽으로 들여 쓰듯, 코드에서도 <strong>블록 안의 코드를 안쪽으로 밀어 넣어</strong> 구조를 한눈에 보이게 합니다. 들여쓰기는 프로그램 실행에 영향을 주지 않지만, <strong>사람이 코드를 읽는 데 결정적인 역할</strong>을 합니다.</p>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>들여쓰기 비교</h2>

<div class="step">
  <div class="step-num" style="background:linear-gradient(135deg,#ef4444,#dc2626);">X</div>
  <div class="step-body">
    <h4>나쁜 예 — 들여쓰기 없음</h4>
  </div>
</div>

<div class="code-block">
  <div class="code-header"><div class="dots"><span></span><span></span><span></span></div><span class="file">나쁜 예</span></div>
  <div class="code-body">
<span class="tp">int</span> <span class="fn">main</span>(<span class="tp">void</span>)<br>
{<br>
<span class="fn">printf</span>(<span class="str">"Hello!\\n"</span>);<br>
<span class="kw">return</span> <span class="str">0</span>;<br>
}
  </div>
</div>

<div class="step">
  <div class="step-num" style="background:linear-gradient(135deg,#10b981,#059669);">O</div>
  <div class="step-body">
    <h4>좋은 예 — 들여쓰기 적용</h4>
  </div>
</div>

<div class="code-block">
  <div class="code-header"><div class="dots"><span></span><span></span><span></span></div><span class="file">좋은 예</span></div>
  <div class="code-body">
<span class="tp">int</span> <span class="fn">main</span>(<span class="tp">void</span>)<br>
{<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"Hello!\\n"</span>);<br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="str">0</span>;<br>
}
  </div>
</div>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>컴퓨팅 사고력 — 패턴 인식</strong>
    들여쓰기된 코드는 시각적으로 "이 코드는 이 블록에 속한다"는 패턴을 보여줍니다. 깊이가 같으면 같은 수준의 코드입니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>들여쓰기 규칙</h2>
<table class="summary-table">
  <tr><th>규칙</th><th>설명</th></tr>
  <tr><td>들여쓰기 단위</td><td>공백 4칸 또는 탭 1개 (프로젝트마다 통일)</td></tr>
  <tr><td>중괄호 안</td><td><code>{</code> 다음 줄부터 들여쓰기 시작</td></tr>
  <tr><td>블록이 끝나면</td><td><code>}</code>는 블록 시작과 같은 위치</td></tr>
  <tr><td>중첩 블록</td><td>한 단계씩 더 들여쓰기</td></tr>
</table>

<div class="callout tip">
  <span class="callout-icon">TIP</span>
  <div class="callout-body">
    <strong>자동 들여쓰기 활용</strong>
    대부분의 에디터(VS Code, Visual Studio)는 Enter를 누르면 자동으로 들여쓰기를 해 줍니다. <code>Ctrl+Shift+F</code>를 누르면 코드 전체의 들여쓰기를 자동 정리할 수 있습니다.
  </div>
</div>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>핵심 정리</h2>
<table class="summary-table">
  <tr><th style="width:40%;">요소</th><th>설명</th></tr>
  <tr><td>들여쓰기</td><td>블록 안의 코드를 안쪽으로 밀어 넣기</td></tr>
  <tr><td>목적</td><td>코드 구조를 한눈에 파악</td></tr>
  <tr><td>단위</td><td>공백 4칸 또는 탭 1개</td></tr>
  <tr><td>도구</td><td>에디터 자동 정렬 기능 활용</td></tr>
</table>

</div>`;

// ────────────────────────────────────────────────
// PAGE 4.5 — 핵심 정리
// ────────────────────────────────────────────────
const PAGE_45_CONTENT = BLOG_CSS + `
<div class="blog">

<div class="blog-hero">
  <div class="meta">Unit 4 · 핵심 정리</div>
  <h1>기본 문법 핵심 정리</h1>
  <p>Unit 4에서 배운 세미콜론, 주석, 중괄호, 들여쓰기를 한 페이지로 정리합니다.</p>
  <div class="tags">
    <span class="tag">세미콜론</span>
    <span class="tag">주석</span>
    <span class="tag">중괄호</span>
    <span class="tag">들여쓰기</span>
  </div>
</div>

<h2>한눈에 보는 기본 문법</h2>
<table class="summary-table">
  <tr><th>요소</th><th>기호</th><th>역할</th><th>주의사항</th></tr>
  <tr><td>세미콜론</td><td><code>;</code></td><td>실행문의 끝 표시</td><td>#include 뒤에는 붙이지 않음</td></tr>
  <tr><td>한 줄 주석</td><td><code>//</code></td><td>줄 끝까지 메모</td><td>짧은 설명에 사용</td></tr>
  <tr><td>여러 줄 주석</td><td><code>/* */</code></td><td>여러 줄 메모</td><td>중첩 불가</td></tr>
  <tr><td>중괄호</td><td><code>{ }</code></td><td>코드 블록 구분</td><td>반드시 짝으로</td></tr>
  <tr><td>들여쓰기</td><td>공백 4칸</td><td>코드 구조 표현</td><td>블록마다 한 단계</td></tr>
</table>

<div class="divider"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>

<h2>올바른 코드 구조</h2>
<div class="code-block">
  <div class="code-header"><div class="dots"><span></span><span></span><span></span></div><span class="file">올바른 구조</span></div>
  <div class="code-body">
<span class="inc">#include</span> <span class="str">&lt;stdio.h&gt;</span> <span class="cm">// 세미콜론 없음</span><br>
<br>
<span class="tp">int</span> <span class="fn">main</span>(<span class="tp">void</span>) <span class="cm">// 세미콜론 없음</span><br>
{ <span class="cm">// 블록 시작</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="fn">printf</span>(<span class="str">"Hello"</span>)<span style="color:#38bdf8;font-weight:700;">;</span> <span class="cm">// 세미콜론 필요!</span><br>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> <span class="str">0</span><span style="color:#38bdf8;font-weight:700;">;</span> <span class="cm">// 세미콜론 필요!</span><br>
} <span class="cm">// 블록 끝</span>
  </div>
</div>

<div class="callout info">
  <span class="callout-icon">CT</span>
  <div class="callout-body">
    <strong>컴퓨팅 사고력 종합</strong>
    <ul style="margin:8px 0 0;">
      <li><strong>분해</strong> — 프로그램을 문장 단위(;)와 블록 단위({ })로 분리</li>
      <li><strong>패턴 인식</strong> — 들여쓰기로 코드의 구조적 패턴 시각화</li>
      <li><strong>추상화</strong> — 주석으로 복잡한 로직을 간결하게 설명</li>
    </ul>
  </div>
</div>

</div>`;

export const C_LANG_PART1: Chapter[] = [
  {
    id: 'c-ch01', chapterNumber: 1, title: '소개 & 기본문법', icon: '🚀',
    description: 'C언어 소개, Hello world!, 기본 문법',
    units: [
      {
        id: 'c-u03', unitNumber: 3, title: 'Hello, world!로 시작하기',
        pages: [
          {
            id: '1', title: 'Hello, world! 출력하기', type: '페이지',
            content: PAGE_33_CONTENT,
            quiz: {
              question: '다음 중 C언어에서 화면에 문자열을 출력하는 함수는?',
              options: ['scanf()', 'printf()', 'println()', 'cout'],
              answer: 1,
              explanation: 'C언어에서 화면에 문자열을 출력할 때는 printf() 함수를 사용합니다. scanf()는 입력, println()은 Java, cout은 C++에서 사용합니다.'
            },
            problems: [
              {
                id: 1,
                title: 'Hello, world! 출력하기',
                difficulty: 1,
                question: '<p>화면에 <strong>Hello, world!</strong>를 출력하는 C 프로그램을 작성하세요.</p><p>출력 마지막에 줄바꿈(<code>\\n</code>)을 포함해야 합니다.</p>',
                answer: '<p><strong>정답 코드:</strong></p><pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("Hello, world!\\n");\n\n    return 0;\n}</pre><p><strong>해설:</strong> <code>stdio.h</code> 헤더를 포함하고, <code>main</code> 함수 안에서 <code>printf</code>로 문자열을 출력합니다.</p>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // 여기에 Hello, world!를 출력하는 코드를 작성하세요\n    \n\n    return 0;\n}',
              },
              {
                id: 2,
                title: '두 줄 출력하기',
                difficulty: 1,
                question: '<p>화면에 다음 두 줄을 출력하는 프로그램을 작성하세요:</p><pre style="background:#f8fafc;padding:10px 14px;border-radius:8px;border:1px solid #e2e8f0;font-size:13px;">Hello, world!\nI love C programming!</pre>',
                answer: '<p><strong>정답 코드:</strong></p><pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("Hello, world!\\n");\n    printf("I love C programming!\\n");\n\n    return 0;\n}</pre>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // 여기에 두 줄을 출력하는 코드를 작성하세요\n    \n\n    return 0;\n}',
              },
            ],
          },
          {
            id: '2', title: '서식 지정자 사용하기', type: '페이지',
            content: PAGE_34_CONTENT,
            quiz: {
              question: '정수 42를 출력하기 위한 서식 지정자는?',
              options: ['%f', '%c', '%d', '%s'],
              answer: 2,
              explanation: '%d는 10진 정수를 출력하는 서식 지정자입니다. %f는 실수, %c는 문자, %s는 문자열에 사용합니다.'
            },
            problems: [
              {
                id: 1,
                title: '자기소개 출력하기',
                difficulty: 1,
                question: '<p>서식 지정자를 사용하여 다음과 같이 출력하세요:</p><pre style="background:#f8fafc;padding:10px 14px;border-radius:8px;border:1px solid #e2e8f0;font-size:13px;">이름: 홍길동, 나이: 20세</pre><p>이름은 문자열(%s), 나이는 정수(%d)로 출력하세요.</p>',
                answer: '<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("이름: %s, 나이: %d세\\n", "홍길동", 20);\n    return 0;\n}</pre>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // 서식 지정자로 자기소개를 출력하세요\n\n    return 0;\n}',
              },
              {
                id: 2,
                title: '원주율 소수점 2자리 출력',
                difficulty: 2,
                question: '<p>원주율(3.141592)을 소수점 아래 2자리까지 출력하세요:</p><pre style="background:#f8fafc;padding:10px 14px;border-radius:8px;border:1px solid #e2e8f0;font-size:13px;">원주율: 3.14</pre>',
                answer: '<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("원주율: %.2f\\n", 3.141592);\n    return 0;\n}</pre><p><code>%.2f</code>는 소수점 아래 2자리까지만 출력합니다.</p>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // 원주율을 소수점 2자리까지 출력하세요\n\n    return 0;\n}',
              },
            ],
          },
          {
            id: '3', title: '심사 사이트 사용하기', type: '페이지',
            content: PAGE_35_CONTENT,
            quiz: {
              question: '심사 사이트에서 정답 판정의 기준은?',
              options: ['코드가 깔끔하면 정답', '실행만 되면 정답', '출력이 기대값과 정확히 일치해야 정답', '변수 이름이 올바르면 정답'],
              answer: 2,
              explanation: '심사 사이트는 프로그램의 출력이 기대 출력과 100% 일치하는지를 기준으로 판정합니다. 공백, 줄바꿈, 대소문자까지 모두 정확해야 합니다.'
            },
          },
          {
            id: '4', title: '퀴즈', type: '퀴즈',
            quiz: {
              question: '다음 코드의 출력 결과는? printf("Hello\\nWorld");',
              options: ['HelloWorld', 'Hello\\nWorld', 'Hello (줄바꿈) World', '에러 발생'],
              answer: 2,
              explanation: '\\n은 줄바꿈 이스케이프 시퀀스입니다. Hello를 출력한 후 줄을 바꾸고 World를 출력합니다.'
            },
          },
          {
            id: '5', title: '연습문제: 문자열 출력하기', type: '페이지',
            content: PAGE_37_CONTENT,
            problems: [
              {
                id: 1, title: 'Hello, C! 출력', difficulty: 1,
                question: '<p>화면에 <strong>Hello, C!</strong>를 출력하세요.</p>',
                answer: '<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("Hello, C!\\n");\n    return 0;\n}</pre>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // Hello, C!를 출력하세요\n\n    return 0;\n}',
              },
              {
                id: 2, title: '3줄 출력하기', difficulty: 1,
                question: '<p>Hello, world! / Hello, C! / Hello, coding! 을 각각 한 줄씩 출력하세요.</p>',
                answer: '<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("Hello, world!\\n");\n    printf("Hello, C!\\n");\n    printf("Hello, coding!\\n");\n    return 0;\n}</pre>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // 3줄을 출력하세요\n\n    return 0;\n}',
              },
              {
                id: 3, title: '큰따옴표 포함 출력', difficulty: 2,
                question: '<p>화면에 <code>"Hello, world!"</code> (큰따옴표 포함)를 출력하세요.</p>',
                answer: '<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("\\"Hello, world!\\"\\n");\n    return 0;\n}</pre><p><code>\\"</code>로 큰따옴표를 출력합니다.</p>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // "Hello, world!" (큰따옴표 포함)를 출력하세요\n\n    return 0;\n}',
              },
            ],
          },
          {
            id: '6', title: '연습문제: 서식 지정자 사용하기', type: '페이지',
            content: PAGE_38_CONTENT,
            problems: [
              {
                id: 1, title: '나이 출력하기', difficulty: 1,
                question: '<p><code>%d</code>를 사용하여 "나는 20살입니다."를 출력하세요.</p>',
                answer: '<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("나는 %d살입니다.\\n", 20);\n    return 0;\n}</pre>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // %d를 사용하여 나이를 출력하세요\n\n    return 0;\n}',
              },
              {
                id: 2, title: '키 출력하기', difficulty: 1,
                question: '<p><code>%.1f</code>를 사용하여 "키: 175.5cm"를 출력하세요.</p>',
                answer: '<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("키: %.1fcm\\n", 175.5);\n    return 0;\n}</pre>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // %.1f를 사용하여 키를 출력하세요\n\n    return 0;\n}',
              },
              {
                id: 3, title: '복합 출력하기', difficulty: 2,
                question: '<p>%s, %d, %c를 사용하여 "이름: 김코딩, 나이: 15세, 학점: A"를 출력하세요.</p>',
                answer: '<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("이름: %s, 나이: %d세, 학점: %c\\n", "김코딩", 15, \'A\');\n    return 0;\n}</pre>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // %s, %d, %c를 사용하여 출력하세요\n\n    return 0;\n}',
              },
            ],
          },
          {
            id: '7', title: '심사문제: 문자열 출력하기', type: '퀴즈',
            problems: [
              {
                id: 1, title: '문자열 정확히 출력하기', difficulty: 1,
                question: '<p>다음을 <strong>정확히</strong> 출력하세요 (대소문자, 공백, 줄바꿈 주의):</p><pre style="background:#f8fafc;padding:10px 14px;border-radius:8px;border:1px solid #e2e8f0;font-size:13px;">Hello,&nbsp;world!\nI&nbsp;love&nbsp;C!</pre>',
                answer: '<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("Hello, world!\\n");\n    printf("I love C!\\n");\n    return 0;\n}</pre>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // 정확히 출력하세요\n\n    return 0;\n}',
              },
            ],
          },
          {
            id: '8', title: '심사문제: 서식 지정자 사용하기', type: '퀴즈',
            problems: [
              {
                id: 1, title: '서식 지정자로 출력하기', difficulty: 2,
                question: '<p>서식 지정자를 사용하여 다음을 정확히 출력하세요:</p><pre style="background:#f8fafc;padding:10px 14px;border-radius:8px;border:1px solid #e2e8f0;font-size:13px;">이름: 홍길동\n나이: 25세\n평균: 89.50점</pre>',
                answer: '<pre style="background:#1e293b;color:#e2e8f0;padding:14px 18px;border-radius:10px;font-size:13px;line-height:1.6;">#include &lt;stdio.h&gt;\n\nint main(void)\n{\n    printf("이름: %s\\n", "홍길동");\n    printf("나이: %d세\\n", 25);\n    printf("평균: %.2f점\\n", 89.5);\n    return 0;\n}</pre>',
                codeTemplate: '#include <stdio.h>\n\nint main(void)\n{\n    // 서식 지정자를 사용하여 출력하세요\n\n    return 0;\n}',
              },
            ],
          },
        ],
      },
      {
        id: 'c-u04', unitNumber: 4, title: '기본 문법 알아보기',
        pages: [
          {
            id: '1', title: '세미콜론', type: '페이지',
            content: PAGE_41_CONTENT,
            quiz: {
              question: '다음 중 세미콜론이 필요 없는 곳은?',
              options: ['printf("Hello");', 'return 0;', '#include <stdio.h>', 'int a = 10;'],
              answer: 2,
              explanation: '#include는 전처리 지시자로, 실행문이 아니기 때문에 세미콜론을 붙이지 않습니다.'
            },
          },
          {
            id: '2', title: '주석', type: '페이지',
            content: PAGE_42_CONTENT,
            quiz: {
              question: '다음 중 여러 줄 주석의 올바른 문법은?',
              options: ['// 이것은 주석 //', '/* 이것은 주석 */', '{{ 이것은 주석 }}', '## 이것은 주석'],
              answer: 1,
              explanation: '/* */는 C언어의 여러 줄 주석입니다. //는 한 줄 주석입니다.'
            },
          },
          {
            id: '3', title: '중괄호', type: '페이지',
            content: PAGE_43_CONTENT,
            quiz: {
              question: '중괄호 { }의 역할은?',
              options: ['문장의 끝을 표시', '주석을 작성', '코드 블록의 범위를 구분', '변수를 선언'],
              answer: 2,
              explanation: '중괄호는 코드 블록의 시작({)과 끝(})을 나타냅니다. 함수, 조건문, 반복문 등에서 사용합니다.'
            },
          },
          {
            id: '4', title: '들여쓰기', type: '페이지',
            content: PAGE_44_CONTENT,
            quiz: {
              question: '들여쓰기의 주된 목적은?',
              options: ['프로그램 실행 속도 향상', '코드의 가독성 향상', '메모리 절약', '컴파일 에러 방지'],
              answer: 1,
              explanation: '들여쓰기는 프로그램 실행에 영향을 주지 않지만, 사람이 코드의 구조를 한눈에 파악할 수 있게 해줍니다.'
            },
          },
          {
            id: '5', title: '핵심 정리', type: '핵심정리',
            content: PAGE_45_CONTENT,
          },
          {
            id: '6', title: 'Q & A', type: 'QnA',
            quiz: {
              question: '다음 코드에서 에러가 발생하는 이유는? printf("Hello")',
              options: ['큰따옴표가 잘못됨', '#include가 없음', '세미콜론이 없음', 'main 함수가 없음'],
              answer: 2,
              explanation: 'C언어에서 모든 실행문은 세미콜론(;)으로 끝나야 합니다. printf("Hello"); 처럼 세미콜론을 붙여야 합니다.'
            },
          },
        ],
      },
    ],
  },
  {
    id: 'c-ch02', chapterNumber: 2, title: '변수 & 디버거', icon: '📦',
    description: '변수 선언, 초기화, 디버거 사용법',
    units: [
      {
        id: 'c-u05', unitNumber: 5, title: '변수 만들기',
        pages: [
          { id: '1', title: '변수 만들기', type: '페이지' },
          { id: '2', title: '변수를 만들고 값 저장하기', type: '페이지' },
          { id: '3', title: '변수 여러 개를 한 번에 선언하기', type: '페이지' },
          { id: '4', title: '변수를 선언하면서 초기화하기', type: '페이지' },
          { id: '5', title: '퀴즈', type: '퀴즈' },
          { id: '6', title: '연습문제: 변수 여러 개를 선언하면서 값 초기화하기', type: '페이지' },
          { id: '7', title: '심사문제: 변수를 선언하고 값 할당하기', type: '퀴즈' },
        ],
      },
      {
        id: 'c-u06', unitNumber: 6, title: '디버거 사용하기',
        pages: [
          { id: '1', title: '중단점 사용하기', type: '페이지' },
        ],
      },
    ],
  },
];
