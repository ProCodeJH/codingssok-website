"use client";

import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { COURSES } from "@/data/courses";

function toggleFullscreen() {
    if (typeof document === "undefined") return;
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen().catch(() => {});
}

/* ═══════════════════════════════════════
   PREMIUM 3D BOOK — 5-face, thick spine,
   metallic shine, mouse-tracking rotation
   ═══════════════════════════════════════ */

const T = 50;            // book thickness
const R = 6;             // corner radius
const PO = 2;            // pages inset from cover edges

function BookCard({
    course, progress, index, onClick,
}: {
    course: typeof COURSES[0];
    progress: number;
    index: number;
    onClick: () => void;
}) {
    const [flipped, setFlipped] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const bookRef = useRef<HTMLDivElement>(null);
    const colors = course.gradient.match(/#[0-9a-fA-F]{6}/g) || ["#3b82f6"];
    const spineColor = colors[0];
    const spineColor2 = colors[1] || colors[0];
    const spineColorDark = `color-mix(in srgb, ${spineColor} 70%, #000)`;

    // Per-card mouse-tracking rotation
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current || !bookRef.current || flipped) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;   // 0~1
        const y = (e.clientY - rect.top) / rect.height;    // 0~1
        const rotY = -35 + (x - 0.5) * 20;
        const rotX = 10 - (y - 0.5) * 12;
        bookRef.current.style.transform = `rotateY(${rotY}deg) rotateX(${rotX}deg)`;
    }, [flipped]);

    const handleMouseLeave = useCallback(() => {
        if (!bookRef.current) return;
        if (flipped) {
            bookRef.current.style.transform = `rotateY(160deg) rotateX(0deg)`;
        } else {
            bookRef.current.style.transform = `rotateY(-35deg) rotateX(10deg)`;
        }
        setFlipped(false);
    }, [flipped]);

    const handleClick = useCallback(() => {
        if (!flipped) {
            setFlipped(true);
            if (bookRef.current) {
                bookRef.current.style.transform = `rotateY(160deg) rotateX(0deg)`;
            }
        } else {
            onClick();
        }
    }, [flipped, onClick]);

    return (
        <div
            ref={containerRef}
            className={`bk-scene bks-${index}`}
            style={{ "--spine": spineColor, "--spine2": spineColor2, "--spine-dark": spineColorDark, "--shadow-c": `${spineColor}55` } as React.CSSProperties}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            <div ref={bookRef} className="bk">

                {/* ── FRONT COVER ── */}
                <div className="bk-face bk-front">
                    {course.cardImage ? (
                        <img src={course.cardImage} alt={course.title} className="bk-cover-img" draggable={false} />
                    ) : (
                        <div className="bk-cover-grad" style={{ background: course.gradient }} />
                    )}
                    <div className="bk-cover-dim" />
                    <div className="bk-cover-shine" />
                    <div className="bk-cover-info">
                        <span className="bk-cover-title">{course.title}</span>
                    </div>
                    {progress > 0 && (
                        <div className="bk-cover-progress">
                            <div className="bk-cover-progress-fill" style={{ width: `${progress}%` }} />
                        </div>
                    )}
                </div>

                {/* ── LEFT SPINE (colored, matching cover) ── */}
                <div className="bk-face bk-spine" />

                {/* ── RIGHT PAGE EDGES (paper texture) ── */}
                <div className="bk-face bk-pages" />

                {/* ── TOP EDGE ── */}
                <div className="bk-face bk-top" />

                {/* ── BOTTOM EDGE ── */}
                <div className="bk-face bk-bottom" />

                {/* ── BACK COVER ── */}
                <div className="bk-face bk-back">
                    {course.cardImage ? (
                        <img src={course.cardImage} alt="" className="bk-cover-img" draggable={false} />
                    ) : (
                        <div className="bk-cover-grad" style={{ background: course.gradient }} />
                    )}
                    <div className="bk-back-overlay" />
                    <div className="bk-back-content">
                        <span className="bk-back-title">{course.title}</span>
                        <p className="bk-back-desc">{course.description}</p>
                        {progress > 0 && (
                            <div className="bk-back-pbar"><div className="bk-back-pbar-fill" style={{ width: `${progress}%` }} /></div>
                        )}
                        <button className="bk-back-btn" onClick={(e) => { e.stopPropagation(); onClick(); }}>
                            코스 입장 →
                        </button>
                    </div>
                </div>
            </div>

            {/* ── GROUND SHADOW ── */}
            <div className="bk-ground-shadow" />
        </div>
    );
}

export default function LearningDashboard() {
    const { user } = useAuth();
    const router = useRouter();
    const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [ready, setReady] = useState(false);
    const supabase = useMemo(() => createClient(), []);

    useEffect(() => {
        async function load() {
            if (!user) { setIsLoading(false); return; }
            try {
                const { data } = await supabase
                    .from("user_course_progress").select("*").eq("user_id", user.id);
                if (data) {
                    const m: Record<string, number> = {};
                    data.forEach((p: any) => {
                        const completed = typeof p.completed_lessons === "number"
                            ? p.completed_lessons
                            : (Array.isArray(p.completed_lessons) ? p.completed_lessons.length : 0);
                        const c = COURSES.find(c => c.id === p.course_id);
                        m[p.course_id] = p.is_completed ? 100 : Math.round((completed / (c?.totalUnits || 1)) * 100);
                    });
                    setCourseProgress(m);
                }
            } catch (e) { console.error(e); }
            setIsLoading(false);
            requestAnimationFrame(() => setReady(true));
        }
        load();
    }, [user, supabase]);

    const go = useCallback((id: string) => { router.push(`/dashboard/learning/courses/${id}`); }, [router]);

    if (isLoading) {
        return (
            <div style={{ position:"fixed",inset:0,background:"#f0f4ff",display:"flex",alignItems:"center",justifyContent:"center" }}>
                <div style={{ width:40,height:40,borderRadius:"50%",border:"3px solid rgba(59,130,246,0.2)",borderTopColor:"#3b82f6",animation:"spin .8s linear infinite" }} />
                <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
            </div>
        );
    }

    return (
        <div className={`pg${ready ? " rdy" : ""}`}>
            <style>{`
                .pg {
                    width:100%;height:100%;
                    background:linear-gradient(145deg,#f0f4ff,#e8efff 40%,#eff6ff 70%,#f0f4ff);
                    display:flex;flex-direction:column;
                    font-family:'Plus Jakarta Sans',system-ui,sans-serif;
                    position:relative;overflow:hidden;
                }
                .pg::before{content:'';position:absolute;width:500px;height:500px;top:-15%;right:-8%;background:radial-gradient(circle,rgba(147,197,253,0.1),transparent 70%);border-radius:50%;pointer-events:none}
                .pg::after{content:'';position:absolute;width:500px;height:500px;bottom:-15%;left:-8%;background:radial-gradient(circle,rgba(196,181,253,0.08),transparent 70%);border-radius:50%;pointer-events:none}

                .pg-bar{display:flex;justify-content:space-between;align-items:center;padding:14px 24px;z-index:100;position:relative}
                .pg-logo{display:flex;align-items:center;gap:10}
                .pg-logo img{height:38px}
                .pg-acts{display:flex;align-items:center;gap:8}
                .pg-user{padding:5px 12px;border-radius:8px;background:rgba(255,255,255,0.7);border:1px solid rgba(59,130,246,0.12);display:flex;align-items:center;gap:7;font-size:13px;font-weight:700;color:#1e293b}
                .pg-dot{width:6px;height:6px;border-radius:50%;background:#22c55e}
                .pg-btn{padding:5px 8px;border-radius:8px;background:rgba(255,255,255,0.7);border:1px solid rgba(59,130,246,0.12);color:#64748b;cursor:pointer;display:flex;align-items:center;gap:4;font-size:12px;font-weight:600;transition:background .2s}
                .pg-btn:hover{background:rgba(255,255,255,0.95)}

                .pg-grid{flex:1;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:clamp(32px,5vh,56px);padding:0 24px;z-index:10;width:100%}
                .pg-r4{display:flex;justify-content:space-evenly;width:100%}
                .pg-r3{display:flex;justify-content:space-evenly;width:80%}

                /* ═══════════════════════════════════════
                   PREMIUM 3D BOOK
                   ═══════════════════════════════════════ */

                .bk-scene {
                    display:flex;align-items:center;justify-content:center;
                    perspective: 1600px;
                    cursor:pointer;
                    position:relative;
                    /* Entrance animation */
                    opacity:0;transform:translateY(30px);
                    transition:opacity .6s ease,transform .6s ease;
                }
                .pg.rdy .bk-scene{opacity:1;transform:translateY(0)}
                .pg.rdy .bks-0{transition-delay:0s}
                .pg.rdy .bks-1{transition-delay:.08s}
                .pg.rdy .bks-2{transition-delay:.16s}
                .pg.rdy .bks-3{transition-delay:.24s}
                .pg.rdy .bks-4{transition-delay:.32s}
                .pg.rdy .bks-5{transition-delay:.4s}
                .pg.rdy .bks-6{transition-delay:.48s}
                .pg.rdy .bks-7{transition-delay:.56s}

                /* Idle float */
                @keyframes bk-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
                .pg.rdy .bk-scene{animation:bk-float 4s ease-in-out infinite}
                .pg.rdy .bks-1{animation-delay:.6s}
                .pg.rdy .bks-2{animation-delay:1.2s}
                .pg.rdy .bks-3{animation-delay:1.8s}
                .pg.rdy .bks-4{animation-delay:.4s}
                .pg.rdy .bks-5{animation-delay:1s}
                .pg.rdy .bks-6{animation-delay:1.6s}
                .pg.rdy .bks-7{animation-delay:2.2s}
                .bk-scene:hover{animation-play-state:paused!important}

                /* ── THE BOOK ── */
                .bk {
                    width: clamp(130px, 13vw, 180px);
                    height: clamp(185px, 18.5vw, 250px);
                    position: relative;
                    transform-style: preserve-3d;
                    transform: rotateY(-35deg) rotateX(10deg);
                    transition: transform 0.5s cubic-bezier(0.23,1,0.32,1);
                }

                .bk-face {
                    position: absolute;
                    display: block;
                }

                /* ── FRONT COVER ── */
                .bk-front {
                    width: 100%;
                    height: 100%;
                    transform: translateZ(${T / 2}px);
                    border-radius: 2px ${R}px ${R}px 2px;
                    overflow: hidden;
                    box-shadow:
                        inset -5px 0 15px rgba(0,0,0,0.3);
                    z-index: 2;
                }
                /* Sheen/highlight on cover edges — like reference */
                .bk-front::before {
                    content:'';
                    position:absolute;inset:0;z-index:5;pointer-events:none;
                    background:linear-gradient(135deg,rgba(255,255,255,0.15) 0%,transparent 40%,transparent 60%,rgba(0,0,0,0.2) 100%);
                }
                .bk-cover-img {
                    position:absolute;inset:0;width:100%;height:100%;
                    object-fit:cover;display:block;
                }
                .bk-cover-grad { position:absolute;inset:0; }
                .bk-cover-dim {
                    position:absolute;inset:0;z-index:1;
                    background:linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.6) 100%);
                }

                /* Metallic shine sweep */
                @keyframes bk-shine {
                    0%{background-position:-200% -200%}
                    100%{background-position:200% 200%}
                }
                .bk-cover-shine {
                    position:absolute;inset:0;z-index:2;pointer-events:none;
                    background:linear-gradient(
                        135deg,
                        rgba(255,255,255,0) 0%,
                        rgba(255,255,255,0.08) 42%,
                        rgba(255,255,255,0.35) 50%,
                        rgba(255,255,255,0.08) 58%,
                        rgba(255,255,255,0) 100%
                    );
                    background-size:200% 200%;
                    animation: bk-shine 5s linear infinite;
                    opacity:0.7;
                }

                .bk-cover-info {
                    position:absolute;bottom:0;left:0;right:0;z-index:3;
                    padding:clamp(8px,1vw,14px);
                    display:flex;flex-direction:column;gap:2px;
                }

                .bk-cover-title {
                    font-size:clamp(11px,1vw,15px);font-weight:800;color:#fff;
                    text-shadow:0 1px 6px rgba(0,0,0,0.7),0 3px 10px rgba(0,0,0,0.4);
                    letter-spacing:-0.02em;line-height:1.25;
                }

                /* Progress bar on cover */
                .bk-cover-progress {
                    position:absolute;bottom:4px;left:10%;right:10%;z-index:4;
                    height:3px;border-radius:2px;
                    background:rgba(0,0,0,0.3);
                }
                .bk-cover-progress-fill {
                    height:100%;border-radius:2px;
                    background:linear-gradient(90deg, var(--spine), var(--spine2));
                }

                /* ── LEFT SPINE (colored, matching cover) ── */
                .bk-spine {
                    width: ${T}px;
                    height: 100%;
                    left: -${T / 2}px;
                    top: 0;
                    transform: rotateY(-90deg);
                    background: linear-gradient(180deg, var(--spine), var(--spine-dark));
                    border-radius: ${R}px 0 0 ${R}px;
                    box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
                }

                /* ── RIGHT PAGE EDGES (paper texture) ── */
                .bk-pages {
                    width: ${T}px;
                    height: 100%;
                    right: -${T / 2}px;
                    top: 0;
                    transform: rotateY(90deg);
                    background:
                        linear-gradient(to right, rgba(0,0,0,0.1), transparent),
                        repeating-linear-gradient(to right,
                            #e5e5e5 0px, #fff 1.5px, #ddd 3px
                        );
                    background-size: 100% 100%, 4px 100%;
                    box-shadow: inset 5px 0 15px rgba(0,0,0,0.15);
                }

                /* ── TOP EDGE ── */
                .bk-top {
                    width: 100%;
                    height: ${T}px;
                    top: -${T / 2}px;
                    left: 0;
                    transform: rotateX(90deg);
                    background: #e8e8e8;
                    background-image:
                        repeating-linear-gradient(to bottom, #ccc 0px, #eee 1px, #fff 2px);
                }

                /* ── BOTTOM EDGE ── */
                .bk-bottom {
                    width: 100%;
                    height: ${T}px;
                    bottom: -${T / 2}px;
                    left: 0;
                    transform: rotateX(-90deg);
                    background: #e0e0e0;
                    background-image:
                        repeating-linear-gradient(to top, #ccc 0px, #eee 1px, #fff 2px);
                }

                /* ── BACK COVER ── */
                .bk-back {
                    width: 100%;
                    height: 100%;
                    transform: translateZ(-${T / 2}px) rotateY(180deg);
                    border-radius: ${R}px 2px 2px ${R}px;
                    overflow: hidden;
                    backface-visibility: hidden;
                    -webkit-backface-visibility: hidden;
                }
                .bk-back-overlay {
                    position:absolute;inset:0;z-index:1;
                    background:rgba(15,23,42,0.82);
                    backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
                }
                .bk-back-content {
                    position:relative;z-index:2;
                    display:flex;flex-direction:column;align-items:center;
                    justify-content:center;gap:6px;
                    padding:clamp(10px,1.2vw,16px);height:100%;text-align:center;
                }
                .bk-back-title{font-size:clamp(12px,1.1vw,17px);font-weight:800;color:#fff}
                .bk-back-desc{font-size:clamp(8px,0.65vw,11px);color:rgba(255,255,255,0.6);line-height:1.4;margin:0;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}
                .bk-back-pbar{width:70%;height:3px;border-radius:2px;background:rgba(255,255,255,0.1)}
                .bk-back-pbar-fill{height:100%;border-radius:2px;background:linear-gradient(90deg,#3b82f6,#60a5fa)}
                .bk-back-btn{padding:7px 16px;border-radius:8px;background:rgba(255,255,255,0.1);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,0.2);color:#fff;cursor:pointer;font-size:clamp(9px,0.75vw,12px);font-weight:700;transition:all .2s}
                .bk-back-btn:hover{background:rgba(59,130,246,0.4);border-color:rgba(59,130,246,0.6);box-shadow:0 4px 20px rgba(59,130,246,0.35)}

                /* ── GROUND SHADOW ── */
                .bk-ground-shadow {
                    position:absolute;
                    bottom:-18px;left:10%;
                    width:80%;height:16px;
                    background:rgba(0,0,0,0.15);
                    filter:blur(12px);
                    border-radius:50%;
                    pointer-events:none;
                    z-index:-1;
                }

                .pg-hints{display:flex;justify-content:center;gap:20;padding:8px 0 12px;z-index:10;opacity:0.4}
                .pg-hint{font-size:10px;color:#94a3b8;display:flex;align-items:center;gap:4}

                /* ═══ C-Studio Special Card ═══ */
                @keyframes ide-code-rain{0%{transform:translateY(-100%);opacity:0}10%{opacity:0.6}90%{opacity:0.6}100%{transform:translateY(300%);opacity:0}}
                @keyframes ide-scanline{0%{top:-10%}100%{top:110%}}
                @keyframes ide-cursor-blink{0%,100%{opacity:1}50%{opacity:0}}
                @keyframes ide-glow-pulse{0%,100%{box-shadow:0 0 30px rgba(99,102,241,0.15),0 0 60px rgba(99,102,241,0.05)}50%{box-shadow:0 0 40px rgba(99,102,241,0.25),0 0 80px rgba(99,102,241,0.1)}}
                @keyframes ide-float{0%,100%{transform:translateY(0) rotateX(8deg) rotateY(-3deg)}50%{transform:translateY(-8px) rotateX(8deg) rotateY(-3deg)}}

                .ide-card-wrap{perspective:1200px;z-index:10;cursor:pointer}
                .ide-card{
                    width:clamp(320px,42vw,560px);height:clamp(140px,16vw,200px);
                    position:relative;border-radius:16px;overflow:hidden;
                    background:linear-gradient(135deg,#0f0f23,#1a1a3e,#0f0f23);
                    border:1px solid rgba(99,102,241,0.2);
                    transform-style:preserve-3d;
                    transform:rotateX(8deg) rotateY(-3deg);
                    animation:ide-float 5s ease-in-out infinite,ide-glow-pulse 4s ease-in-out infinite;
                    transition:transform 0.4s cubic-bezier(0.23,1,0.32,1),box-shadow 0.4s;
                }
                .ide-card:hover{
                    transform:rotateX(2deg) rotateY(0deg) scale(1.04);
                    box-shadow:0 20px 60px rgba(99,102,241,0.3),0 0 100px rgba(99,102,241,0.1)!important;
                }
                .ide-card::before{
                    content:'';position:absolute;inset:0;z-index:1;
                    background:linear-gradient(135deg,rgba(99,102,241,0.08),transparent 50%,rgba(6,182,212,0.06));
                    pointer-events:none;
                }
                .ide-scanline{
                    position:absolute;left:0;right:0;height:2px;z-index:5;pointer-events:none;
                    background:linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent);
                    animation:ide-scanline 3.5s linear infinite;
                }
                .ide-rain{position:absolute;inset:0;overflow:hidden;z-index:0;opacity:0.12;pointer-events:none}
                .ide-rain-col{
                    position:absolute;top:0;
                    font-family:'JetBrains Mono',monospace;font-size:10px;
                    color:#60a5fa;writing-mode:vertical-rl;
                    animation:ide-code-rain linear infinite;white-space:nowrap;
                }
                .ide-monitor-frame{
                    position:absolute;inset:0;border-radius:16px;z-index:2;pointer-events:none;
                    border:2px solid rgba(99,102,241,0.15);
                    box-shadow:inset 0 0 30px rgba(0,0,0,0.4),inset 0 1px 0 rgba(255,255,255,0.05);
                }
                .ide-screen-dots{
                    position:absolute;top:10px;left:14px;z-index:10;display:flex;gap:5;
                }
                .ide-screen-dot{width:7px;height:7px;border-radius:50%;opacity:0.8}
                .ide-content{position:relative;z-index:4;padding:16px 20px;display:flex;align-items:center;gap:clamp(16px,2vw,28px);height:100%}
                .ide-code-preview{
                    flex:1;font-family:'JetBrains Mono',monospace;font-size:clamp(9px,0.85vw,12px);
                    line-height:1.7;color:rgba(205,214,244,0.7);overflow:hidden;
                    max-height:100%;
                }
                .ide-code-kw{color:#c678dd}
                .ide-code-fn{color:#61afef}
                .ide-code-str{color:#98c379}
                .ide-code-cm{color:#5c6370;font-style:italic}
                .ide-code-num{color:#d19a66}
                .ide-info{display:flex;flex-direction:column;align-items:flex-end;gap:6;flex-shrink:0;text-align:right}
                .ide-title{font-size:clamp(18px,2vw,28px);font-weight:900;letter-spacing:-0.03em;line-height:1.1}
                .ide-title-c{background:linear-gradient(135deg,#60a5fa,#06b6d4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
                .ide-subtitle{font-size:clamp(9px,0.8vw,12px);color:rgba(148,163,184,0.7);font-weight:500}
                .ide-badge{
                    display:inline-flex;align-items:center;gap:4;
                    padding:4px 12px;border-radius:999px;font-size:9px;font-weight:800;
                    background:linear-gradient(135deg,rgba(99,102,241,0.2),rgba(6,182,212,0.15));
                    border:1px solid rgba(99,102,241,0.25);color:#a5b4fc;letter-spacing:0.5px;
                }
                .ide-enter-arrow{
                    font-size:18px;color:#60a5fa;
                    transition:transform 0.3s;
                }
                .ide-card:hover .ide-enter-arrow{transform:translateX(4px)}

                /* Reflection below card */
                .ide-reflection{
                    width:clamp(280px,36vw,480px);height:20px;margin:0 auto;
                    background:radial-gradient(ellipse,rgba(99,102,241,0.12),transparent 70%);
                    filter:blur(8px);pointer-events:none;
                }
            `}</style>

            <div className="pg-bar">
                <div className="pg-logo"><img src="/images/promo/logo-codingssok.png" alt="코딩쏙" /></div>
                <div className="pg-acts">
                    <div className="pg-user"><div className="pg-dot" />{user?.name || "학생"}</div>
                    <button className="pg-btn" onClick={toggleFullscreen}>
                        <span className="material-symbols-outlined" style={{fontSize:16}}>fullscreen</span>
                    </button>
                    <button className="pg-btn" onClick={() => { if(document.fullscreenElement) document.exitFullscreen(); router.push("/"); }}>
                        <span className="material-symbols-outlined" style={{fontSize:14}}>logout</span>나가기
                    </button>
                </div>
            </div>

            <div className="pg-grid">
                <div className="pg-r4">
                    {COURSES.slice(0,4).map((c,i) => (
                        <BookCard key={c.id} course={c} progress={courseProgress[c.id]||0} index={i} onClick={() => go(c.id)} />
                    ))}
                </div>
                <div className="pg-r4">
                    {COURSES.slice(4,8).map((c,i) => (
                        <BookCard key={c.id} course={c} progress={courseProgress[c.id]||0} index={i+4} onClick={() => go(c.id)} />
                    ))}
                </div>

                {/* ═══ C-Studio IDE Special Card ═══ */}
                <div className="ide-card-wrap" onClick={() => router.push("/dashboard/compiler")}>
                    <div className="ide-card">
                        {/* Scanline */}
                        <div className="ide-scanline" />

                        {/* Code Rain Background */}
                        <div className="ide-rain">
                            {["int main()", "#include", "printf()", "return 0;", "for(i=0)", "char *p;", "malloc()", "if(x>0)", "struct{}", "while(1)", "sizeof()", "break;"].map((txt, i) => (
                                <div key={i} className="ide-rain-col" style={{ left: `${(i / 12) * 100}%`, animationDuration: `${6 + Math.random() * 8}s`, animationDelay: `${Math.random() * 5}s` }}>{txt}</div>
                            ))}
                        </div>

                        {/* Monitor Frame */}
                        <div className="ide-monitor-frame" />

                        {/* Screen dots */}
                        <div className="ide-screen-dots">
                            <div className="ide-screen-dot" style={{ background: "#f38ba8" }} />
                            <div className="ide-screen-dot" style={{ background: "#f9e2af" }} />
                            <div className="ide-screen-dot" style={{ background: "#a6e3a1" }} />
                        </div>

                        {/* Content */}
                        <div className="ide-content">
                            {/* Code Preview */}
                            <div className="ide-code-preview">
                                <div><span className="ide-code-cm">{"// C-Studio Web IDE"}</span></div>
                                <div><span className="ide-code-kw">{"#include"}</span>{" <stdio.h>"}</div>
                                <div>&nbsp;</div>
                                <div><span className="ide-code-kw">int</span> <span className="ide-code-fn">main</span>{"() {"}</div>
                                <div>{"    "}<span className="ide-code-fn">printf</span>(<span className="ide-code-str">{'"Hello!"'}</span>);</div>
                                <div>{"    "}<span className="ide-code-kw">return</span> <span className="ide-code-num">0</span>;</div>
                                <div>{"}"}<span style={{ animation: "ide-cursor-blink 1s infinite", color: "#60a5fa", fontWeight: 700 }}>▌</span></div>
                            </div>

                            {/* Title & Info */}
                            <div className="ide-info">
                                <div className="ide-title"><span className="ide-title-c">C-Studio</span></div>
                                <div className="ide-subtitle">웹 기반 코드 에디터 & 컴파일러</div>
                                <div className="ide-badge">
                                    <span className="material-symbols-outlined" style={{ fontSize: 10 }}>terminal</span>
                                    LAUNCH IDE
                                    <span className="ide-enter-arrow material-symbols-outlined">arrow_forward</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="ide-reflection" />
                </div>
            </div>

            <div className="pg-hints">
                <span className="pg-hint"><span className="material-symbols-outlined" style={{fontSize:12}}>swipe</span>호버 — 3D 회전 / 클릭 — 뒤집기</span>
                <span className="pg-hint"><span className="material-symbols-outlined" style={{fontSize:12}}>touch_app</span>재클릭 — 진입</span>
            </div>
        </div>
    );
}
