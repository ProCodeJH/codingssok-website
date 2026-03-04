"use client";

/* ═══════════════════════════════════════════════════════════════
   Curriculum — Holographic Exploded View Ultra V1.2
   Faithful 1:1 port from reference HTML
   ═══════════════════════════════════════════════════════════════ */

const cards = [
    {
        num: "01", tag: "Foundation", tagColor: "#3B82F6",
        icon: "functions", iconColor: "text-blue-500",
        title: "Math & Fusion", titleKr: "사고력 수학",
        desc: "코딩으로 수학 개념을 직접 구현하며 문제해결의 원리를 깨우칩니다.",
        skills: "연산 자동화 · 패턴 인식 · 문제 분해 · 수열 탐구 · 도형 코딩",
        skill: "수학 × 코딩 융합", skillIcon: "psychology",
        age: "초등 1~4학년 · 1:4 소수정예", ageIcon: "school",
        schedule: "주 2회 90분",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGyUvkoHf2VXnmX7um9_Gneh7M_6hCxzoF6wuS_iKfr3Bdq0P1yxemqv3Q2jeNSi-Wpfhvbij_LHWlQK6Wsf7bHLd9OoWa4R5RiJt2a78lEyUhf1uViIil8bEsAjZ1BTh8R4MUuUSp2JJDG9dGvKC7-hxz1-pDYGjSNoOX-YCtkJI1iesn53H4ogSaHgYGu-gHo_U-rcyhPTLZFaq9RHOxCLCvWbJx9-7QM86RC_F48MxlGW1WOpmEEPw460ocHUMa_3GU2EOhS46t",
        floatClass: "holo-float-1",
        hoverColor: "primary", glowColor: "rgba(59,130,246,0.3)",
        holoStyle: undefined as React.CSSProperties | undefined,
    },
    {
        num: "02", tag: "Core Logic", tagColor: "#0d9488",
        icon: "terminal", iconColor: "text-teal-600",
        title: "Software Master", titleKr: "소프트웨어",
        desc: "Scratch 블록코딩으로 사고력을 기른 후, 파이썬·C언어로 텍스트 코딩에 진입합니다.",
        skills: "파이썬 · C언어 · 자료구조 · 알고리즘 설계 · 디버깅",
        skill: "블록 → 텍스트 코딩", skillIcon: "code",
        age: "초등 3~중등 · 1:6 밀착 코칭", ageIcon: "school",
        schedule: "주 2회 90분",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZPMcDnv6xVrp8ZtKOfeouajqsosePTu4Aj88KxOXpPN0hS05d3V39eXyzaUGEwxtNnO3gA8OXQ0_nNX9SL2eio0e6nN2qHiL8aRSlmGxmBFikIj8ntEFsJyc6J2Iqgh2wLhwu1QkumM6B9_CquoaLQl8hTjCDywGkzR2Nn_rp6huomk9OH3j1WR3UihoNc4Pi5h7tGnxZ9jSFWebTufyG7Gvm4kZ8kFTk73AssC-ZXrPobZzCfx-zJifHrC2Ukt15trf7RXl_nhL-",
        floatClass: "holo-float-2",
        hoverColor: "teal", glowColor: "rgba(45,212,191,0.3)",
        holoStyle: { color: "#2dd4bf", textShadow: "0 0 10px rgba(45,212,191,0.8)" } as React.CSSProperties,
    },
    {
        num: "03", tag: "Hardware", tagColor: "#6366f1",
        icon: "memory", iconColor: "text-indigo-600",
        title: "Arduino / IoT", titleKr: "하드웨어",
        desc: "LED부터 센서, 서보모터 제어까지. 코드가 실제 장치를 움직이는 경험을 선사합니다.",
        skills: "아두이노 · 전자 회로 · 센서 활용 · IoT · 3D 프린팅",
        skill: "피지컬 컴퓨팅", skillIcon: "developer_board",
        age: "초등 3학년+ · 1:4 실습 중심", ageIcon: "engineering",
        schedule: "주 1~2회 90분",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBKBV9pIxjMZ0oJ3TMnNBRk1kBjP9LP5h9NiY1YdHVf1z4C0_4Pti8zuOY9jZbNP1No1gbvfTAqTWxcNnCYcVY-W7YiHXpnVkKVnYZrTrGcMqnZT3uqkQwKv6qVd5yor7LlCnPmcAEVPWjNW9qz_HAXHFPijAQEjkLA0diMQAya76GmQSSa0dQt5ptrrlr-6mCrxNEb9-0uRICCSWE-V2IaWVusIm3QARpkP0_QJN_asM__DmyfSnfyLc4d19g-jtA07MqP4X653dD7",
        floatClass: "holo-float-3",
        hoverColor: "indigo", glowColor: "rgba(99,102,241,0.3)",
        holoStyle: { color: "#818cf8", textShadow: "0 0 10px rgba(99,102,241,0.8)" } as React.CSSProperties,
    },
    {
        num: "04", tag: "Innovation", tagColor: "#f97316",
        icon: "brush", iconColor: "text-orange-600",
        title: "Creation Studio", titleKr: "프로젝트",
        desc: "기획서 → 와이어프레임 → 개발 → 테스트 → 발표. 실제 개발 프로세스를 경험합니다.",
        skills: "앱 개발 · 게임 제작 · UI/UX 설계 · 프레젠테이션 · 팀 협업",
        skill: "창작 스튜디오", skillIcon: "rocket_launch",
        age: "전연령 · 1:2~4 팀", ageIcon: "groups",
        schedule: "맞춤 일정",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBBBY_4zbi7hkFsTnV-bu1ciQhDQrxXIZg84zmvvw-PUHjgrsH2Ni-hCZZzb4Vtv9GdlH5qww4GVAWA0zQsn-DbD4p7qb2qWUMozOsoUq__KoRcGe5udjzYy1_zemmA5vW2RSCw42A_BnxXUsy4GsVyJTUX5jlYl0P1TIilLIQOGnG6XQzh-oFWkGfhncOBuY_qaWLWMUm1XZkzpDGjJdZPFE_zPpkoHIH0FxjXENQMqHDRkmQb0m3kZ1GhWKjqM9-aTVlSDtwd50KG",
        floatClass: "holo-float-4",
        hoverColor: "orange", glowColor: "rgba(249,115,22,0.3)",
        holoStyle: { color: "#fb923c", textShadow: "0 0 10px rgba(249,115,22,0.8)" } as React.CSSProperties,
    },
    {
        num: "05", tag: "Expert", tagColor: "#9333ea",
        icon: "verified", iconColor: "text-purple-600",
        title: "Pro Certification", titleKr: "자격증",
        desc: "시험 유형별 집중 학습과 실전 모의고사로 합격률을 극대화합니다.",
        skills: "COS-Pro · PCCE · 정보올림피아드 · 프로그래밍기능사 · 컴활",
        skill: "목표 달성 트랙", skillIcon: "workspace_premium",
        age: "중~고등 · 1:4 집중 코칭", ageIcon: "school",
        schedule: "시험 맞춤 일정",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnoss8UpmSxOZxOikwQhAadRJ8NdLlBpwGpUlZyt1d3hjaOxEA0wTZ0JeXBeBTcTZn0k1azp3kRnBcp21VaJ16-H-EyqyIETL-xlbgvBJrRnXjx7i6InbQEVzs8mghloyqbVGiWG5naoIQgBsODQ2_IirJZF3DwgiWkhEzLLYi2j2jH4TY4GRhN0QwxtTbRzKSygyE3eBeisy8bF0X7A9Iyc151hTwIV1EtrNzAhbKxTRlu4Q60fLB0qNNyH6zodNcGQDB6Krj7xZr",
        floatClass: "holo-float-5",
        hoverColor: "purple", glowColor: "rgba(147,51,234,0.3)",
        holoStyle: { color: "#c084fc", textShadow: "0 0 10px rgba(147,51,234,0.8)" } as React.CSSProperties,
    },
];

export default function Curriculum() {
    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500;700;900&display=swap" rel="stylesheet" />

            <section id="curriculum" className="holo-section">
                {/* BG */}
                <div className="holo-bg">
                    <div className="holo-bg-grad" />
                    <div className="holo-cyber-grid" />
                    <div className="holo-flare holo-flare-1" />
                    <div className="holo-flare holo-flare-2" />
                </div>

                <div className="container-nod" style={{ position: "relative", zIndex: 10 }}>
                    {/* Header */}
                    <header className="holo-header">
                        <div className="holo-watermark">ULTRA</div>
                        <h2 className="holo-sub-title">
                            <span className="holo-line" />
                            Holographic V1.2
                            <span className="holo-line" />
                        </h2>
                        <h1 className="holo-main-title">CURRICULUM</h1>
                        <p className="holo-desc">
                            5단계 마스터리 과정을 통해 체계적으로 성장하세요. 각 단계를 클릭하면 상세 커리큘럼을 확인할 수 있습니다.
                        </p>
                    </header>

                    {/* Energy pulse connectors */}
                    <div className="holo-connectors">
                        <div className="holo-connector-inner">
                            {[0, 1, 2, 3].map(i => (
                                <div key={i} className="holo-pulse" style={{ left: `${10 + i * 20}%`, width: "20%", animationDelay: `${i}s` }} />
                            ))}
                        </div>
                    </div>

                    {/* ═══ MONOLITH CARDS ═══ */}
                    <div className="holo-grid">
                        {cards.map((c, i) => (
                            <div key={i} className={`holo-mono-wrap ${c.floatClass}`} tabIndex={0}>
                                <div className="holo-slab group">
                                    {/* Number */}
                                    <div className="holo-num holo-depth-1">{c.num}</div>

                                    {/* Image */}
                                    <div className="holo-img-wrap holo-depth-2">
                                        <div className="holo-img-inner">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={c.img} alt={c.title} className="holo-img" />
                                            <div className="holo-img-overlay" />
                                        </div>
                                        {/* Etched icon */}
                                        <div className="holo-etched-icon holo-depth-3">
                                            <span className="material-symbols-outlined" style={{ fontSize: 28, color: c.tagColor }}>{c.icon}</span>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className="holo-body holo-depth-2">
                                        <span className="holo-glass-tag" style={{ color: c.tagColor, borderColor: `${c.tagColor}40`, boxShadow: `0 0 15px ${c.glowColor}` }}>{c.tag}</span>
                                        <h3 className="holo-card-title">{c.title}</h3>

                                        {/* Hologram Korean text */}
                                        <div className="holo-kr-text">
                                            <p className="holo-kr" style={c.holoStyle}>{c.titleKr}</p>
                                        </div>

                                        {/* Description */}
                                        <p className="holo-card-desc">{c.desc}</p>

                                        {/* Skills */}
                                        <p className="holo-card-skills">{c.skills}</p>

                                        {/* Meta */}
                                        <div className="holo-meta holo-depth-1">
                                            <div className="holo-meta-row">
                                                <span className="material-symbols-outlined" style={{ fontSize: 16, color: c.tagColor }}>{c.skillIcon}</span>
                                                <span>{c.skill}</span>
                                            </div>
                                            <div className="holo-meta-row">
                                                <span className="material-symbols-outlined" style={{ fontSize: 16, color: c.tagColor }}>{c.ageIcon}</span>
                                                <span>{c.age}</span>
                                            </div>
                                            <div className="holo-meta-row">
                                                <span className="material-symbols-outlined" style={{ fontSize: 16, color: c.tagColor }}>schedule</span>
                                                <span>{c.schedule}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Bottom glow */}
                                    <div className="holo-bottom-glow" style={{ background: `linear-gradient(90deg, transparent, ${c.tagColor}, transparent)` }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer */}
                    <div className="holo-footer">
                        <div className="holo-footer-line" />
                        <p className="holo-footer-text">System Status: Online // V1.2.0 Ultra</p>
                    </div>
                </div >

                <style>{`
/* ═══════════════════════════════════
   HOLOGRAPHIC EXPLODED VIEW — STYLES
   From reference HTML, 1:1
   ═══════════════════════════════════ */
.holo-section {
    position: relative; overflow: hidden;
    padding: clamp(60px, 8vw, 100px) 0;
    font-family: 'Inter', sans-serif;
    background-color: #F8FAFC;
    color: #1e293b;
}

/* ── BG ── */
.holo-bg { position: absolute; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.holo-bg-grad { position: absolute; inset: 0; background: linear-gradient(180deg, #fff, #f8fafc, #f1f5f9); }
.holo-cyber-grid {
    position: absolute; inset: 0;
    background-size: 60px 60px;
    background-image:
        linear-gradient(to right, rgba(59,130,246,0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(59,130,246,0.08) 1px, transparent 1px);
    transform: perspective(1000px) rotateX(60deg) scale(2);
    transform-origin: center top;
    mask-image: linear-gradient(to bottom, transparent, black 10%, black 90%, transparent);
    opacity: 0.4;
}
.holo-flare {
    position: absolute; border-radius: 50%;
    mix-blend-mode: screen; filter: blur(100px);
}
.holo-flare-1 { top: -10%; left: 20%; width: 800px; height: 800px; background: radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%); }
.holo-flare-2 { bottom: -10%; right: 10%; width: 600px; height: 600px; background: radial-gradient(circle, rgba(59,130,246,0.1), transparent 70%); opacity: 0.6; }

/* ── Header ── */
.holo-header { text-align: center; margin-bottom: clamp(48px, 6vw, 80px); position: relative; }
.holo-watermark {
    position: absolute; top: -40px; left: 50%; transform: translateX(-50%);
    font-family: 'Orbitron', sans-serif; font-size: clamp(6rem, 12vw, 10rem);
    font-weight: 900; color: #f1f5f9; user-select: none; z-index: -1;
}
.holo-sub-title {
    font-family: 'Orbitron', sans-serif; color: #3B82F6;
    letter-spacing: 0.5em; font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; gap: 16px;
    margin-bottom: 16px; text-transform: uppercase;
}
.holo-line { display: inline-block; width: 48px; height: 1px; background: rgba(59,130,246,0.5); box-shadow: 0 0 8px rgba(59,130,246,0.8); }
.holo-main-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(2.8rem, 7vw, 4.5rem); font-weight: 900;
    background: linear-gradient(135deg, #0f172a, #3B82F6, #1e293b);
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    line-height: 1; margin-bottom: 20px;
}
.holo-desc { color: #64748b; font-size: 16px; max-width: 560px; margin: 0 auto; line-height: 1.7; }

/* ── Connectors ── */
.holo-connectors { position: absolute; top: 54%; left: 0; right: 0; height: 2px; display: none; pointer-events: none; z-index: 0; }
@media (min-width: 1280px) { .holo-connectors { display: block; } }
.holo-connector-inner { position: relative; max-width: 1600px; margin: 0 auto; padding: 0 64px; height: 100%; }
.holo-pulse {
    position: absolute; height: 2px; top: 0;
    background: #3B82F6;
    box-shadow: 0 0 10px #3B82F6, 0 0 20px #3B82F6;
    animation: holoEnergyPulse 3s infinite ease-in-out;
}

/* ── Grid ── */
.holo-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 24px;
    max-width: 1600px; margin: 0 auto;
}
@media (min-width: 768px) { .holo-grid { grid-template-columns: repeat(2, 1fr); } }
@media (min-width: 1280px) { .holo-grid { grid-template-columns: repeat(5, 1fr); gap: 28px; } }

/* ── Monolith Wrapper ── */
.holo-mono-wrap {
    perspective: 1200px; transform-style: preserve-3d;
    height: auto; min-height: 480px;
}
@media (min-width: 1280px) { .holo-mono-wrap { height: 620px; } }

/* ── Monolith Slab (THE card) ── */
.holo-slab {
    background: linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,249,255,0.7));
    backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,0.8);
    border-radius: 24px; padding: 4px;
    height: 100%; display: flex; flex-direction: column;
    cursor: pointer; position: relative;
    transform-style: preserve-3d;
    transform: rotateY(0deg) rotateX(0deg);
    transition: transform 0.6s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.6s ease;
    box-shadow:
        20px 20px 60px rgba(186,205,226,0.4),
        -20px -20px 60px rgba(255,255,255,0.9),
        inset 0 0 0 1px rgba(255,255,255,0.6),
        inset 0 4px 20px rgba(59,130,246,0.1);
    overflow: hidden;
}
.holo-mono-wrap:hover .holo-slab {
    transform: rotateY(10deg) rotateX(5deg) scale(1.02);
    box-shadow:
        30px 30px 80px rgba(59,130,246,0.25),
        -30px -30px 80px rgba(255,255,255,0.9),
        0 0 0 2px rgba(59,130,246,0.3);
    z-index: 50;
}
.holo-mono-wrap:focus-within .holo-slab {
    transform: rotateY(0deg) rotateX(0deg) scale(1.05);
}
/* Shine sweep */
.holo-slab::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.8) 50%, transparent 70%);
    transform: translateX(-100%) skewX(-15deg);
    transition: 0.8s; z-index: 10; pointer-events: none;
    border-radius: 24px;
}
.holo-mono-wrap:hover .holo-slab::before {
    transform: translateX(100%) skewX(-15deg);
}

/* ── Depth layers ── */
.holo-depth-1 { transform: translateZ(20px); transition: transform 0.4s ease; }
.holo-depth-2 { transform: translateZ(40px); transition: transform 0.5s ease; }
.holo-depth-3 { transform: translateZ(60px); transition: transform 0.6s ease; }
.holo-mono-wrap:focus-within .holo-depth-1 { transform: translateZ(40px) translateY(-5px); }
.holo-mono-wrap:focus-within .holo-depth-2 { transform: translateZ(80px) translateY(-10px); }
.holo-mono-wrap:focus-within .holo-depth-3 { transform: translateZ(120px) translateY(-15px); }

/* ── Card number ── */
.holo-num {
    position: absolute; top: 16px; right: 16px;
    font-family: 'Orbitron', sans-serif; font-size: 32px;
    font-weight: 700; color: #e2e8f0; user-select: none; z-index: 0;
}

/* ── Image area ── */
.holo-img-wrap {
    position: relative; height: 180px; width: 100%;
    border-radius: 16px; overflow: visible; margin-bottom: 24px;
    background: #f1f5f9; box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
    border: 1px solid rgba(255,255,255,0.5);
}
.holo-img-inner { border-radius: 16px; overflow: hidden; height: 100%; width: 100%; position: relative; }
.holo-img {
    width: 100%; height: 100%; object-fit: cover;
    opacity: 1;
    transition: transform 0.7s ease;
}
.group:hover .holo-img { transform: scale(1.1); }
.holo-img-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(15,23,42,0.4), transparent); }

/* ── Etched Icon ── */
.holo-etched-icon {
    position: absolute; bottom: -20px; left: 16px;
    width: 52px; height: 52px; border-radius: 16px;
    background: linear-gradient(135deg, #e2e8f0, #fff);
    box-shadow:
        inset 2px 2px 5px rgba(0,0,0,0.1),
        inset -2px -2px 5px rgba(255,255,255,1),
        5px 5px 15px rgba(0,0,0,0.15);
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(255,255,255,0.2);
}

/* ── Body ── */
.holo-body {
    padding: 0 20px 28px; display: flex; flex-direction: column;
    flex-grow: 1; position: relative;
}
.holo-glass-tag {
    align-self: flex-start;
    padding: 4px 12px; border-radius: 999px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.1em;
    text-transform: uppercase; margin-bottom: 10px;
    background: rgba(59,130,246,0.08);
    border: 1px solid;
    backdrop-filter: blur(4px);
}
.holo-card-title {
    font-family: 'Orbitron', sans-serif;
    font-size: clamp(16px, 1.4vw, 20px); font-weight: 700;
    color: #1e293b; margin: 0;
    transition: color 0.3s;
}
.group:hover .holo-card-title { color: #3B82F6; }
.holo-card-desc {
    font-size: 12px; color: #64748b; line-height: 1.6;
    margin: 6px 0 0; display: -webkit-box;
    -webkit-line-clamp: 2; -webkit-box-orient: vertical;
    overflow: hidden;
}
.holo-card-skills {
    font-size: 10px; color: #94a3b8; line-height: 1.5;
    margin: 4px 0 0; font-weight: 500;
}

/* Hologram Korean text */
.holo-kr-text {
    position: absolute; right: -16px; top: 60px;
    transform: rotate(90deg); transform-origin: bottom right;
    pointer-events: none;
}
.holo-kr {
    color: #3B82F6; font-size: 15px; font-weight: 700;
    font-family: monospace; letter-spacing: 0.15em;
    white-space: nowrap; opacity: 0.8; margin: 0;
    text-shadow: 0 0 10px rgba(59,130,246,0.8), 0 0 20px rgba(59,130,246,0.4);
    animation: holoFlicker 3s infinite alternate;
}

/* ── Meta ── */
.holo-meta {
    margin-top: auto; padding-top: 14px;
    border-top: 1px solid #e2e8f0;
    display: flex; flex-direction: column; gap: 10px;
}
.holo-meta-row {
    display: flex; align-items: center; gap: 10px;
    font-size: 12px; font-weight: 500; color: #64748b;
    transition: transform 0.3s;
}
.group:hover .holo-meta-row { transform: translateX(4px); }

/* ── Bottom glow ── */
.holo-bottom-glow {
    position: absolute; bottom: 0; left: 0; right: 0;
    height: 3px; opacity: 0; border-radius: 0 0 24px 24px;
    transition: opacity 0.5s;
}
.group:hover .holo-bottom-glow { opacity: 1; }

/* ── Footer ── */
.holo-footer { margin-top: 80px; display: flex; flex-direction: column; align-items: center; }
.holo-footer-line {
    height: 80px; width: 1px; margin-bottom: 20px;
    background: linear-gradient(to bottom, transparent, rgba(59,130,246,0.5), transparent);
    box-shadow: 0 0 10px rgba(59,130,246,0.6);
}
.holo-footer-text {
    font-family: 'Orbitron', sans-serif;
    font-size: 10px; letter-spacing: 0.3em;
    color: #94a3b8; text-transform: uppercase; opacity: 0.7;
}

/* ═══ KEYFRAMES ═══ */
@keyframes holoFloat {
    0%, 100% { transform: translateY(0) rotateX(0deg) rotateY(0deg); }
    50% { transform: translateY(-15px) rotateX(2deg) rotateY(-1deg); }
}
@keyframes holoEnergyPulse {
    0% { opacity: 0.3; transform: scaleX(0); transform-origin: left; }
    50% { opacity: 1; transform: scaleX(1); transform-origin: left; }
    51% { opacity: 1; transform: scaleX(1); transform-origin: right; }
    100% { opacity: 0.3; transform: scaleX(0); transform-origin: right; }
}
@keyframes holoFlicker {
    0%, 100% { opacity: 0.8; text-shadow: 0 0 10px rgba(59,130,246,0.8), 0 0 20px rgba(59,130,246,0.4); }
    50% { opacity: 1; text-shadow: 0 0 15px rgba(59,130,246,1), 0 0 30px rgba(59,130,246,0.6); }
    70% { opacity: 0.7; }
}
.holo-float-1 { animation: holoFloat 8s ease-in-out infinite; animation-delay: 0s; }
.holo-float-2 { animation: holoFloat 9s ease-in-out infinite; animation-delay: 1.5s; }
.holo-float-3 { animation: holoFloat 8.5s ease-in-out infinite; animation-delay: 0.5s; }
.holo-float-4 { animation: holoFloat 9.5s ease-in-out infinite; animation-delay: 2s; }
.holo-float-5 { animation: holoFloat 8.2s ease-in-out infinite; animation-delay: 1s; }
                `}</style>
            </section >
        </>
    );
}
