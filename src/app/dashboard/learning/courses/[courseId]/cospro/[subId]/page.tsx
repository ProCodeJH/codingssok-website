"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo } from "react";
import { COSPRO_SUB_COURSES } from "@/data/courses";

export default function CosProSubCoursePage() {
    const params = useParams();
    const router = useRouter();
    const subId = params.subId as string;

    const sub = useMemo(() => COSPRO_SUB_COURSES.find(s => s.id === subId), [subId]);

    if (!sub) {
        return (
            <div style={{ textAlign: "center", padding: 80, color: "#64748b" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", marginBottom: 8 }}>
                    코스를 찾을 수 없습니다
                </h2>
                <button
                    onClick={() => router.push("/dashboard/learning/courses/5")}
                    style={{
                        padding: "10px 24px", borderRadius: 12, border: "none", cursor: "pointer",
                        background: "linear-gradient(135deg, #ec4899, #8b5cf6)", color: "#fff",
                        fontSize: 14, fontWeight: 700, marginTop: 16,
                    }}
                >
                    CosPro 선택으로 돌아가기
                </button>
            </div>
        );
    }

    const colors = sub.gradient.match(/#[0-9a-fA-F]{6}/g) || ["#ec4899"];

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(145deg, #f8fafc, #f0f4ff)",
            fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
            padding: "32px 24px",
        }}>
            <style>{`
                .csp-back{
                    display:inline-flex;align-items:center;gap:6px;
                    font-size:13px;font-weight:600;color:#94a3b8;
                    text-decoration:none;cursor:pointer;transition:color .2s;
                    margin-bottom:24px;
                }
                .csp-back:hover{color:#64748b}
                .csp-hero{
                    max-width:800px;margin:0 auto 40px;
                    border-radius:20px;padding:40px;
                    position:relative;overflow:hidden;
                    color:#fff;text-align:center;
                }
                .csp-hero::before{
                    content:'';position:absolute;inset:0;
                    background:linear-gradient(135deg,rgba(255,255,255,0.1),transparent 50%);
                    pointer-events:none;
                }
                .csp-hero-icon{font-size:56px;margin-bottom:12px;filter:drop-shadow(0 4px 12px rgba(0,0,0,0.3))}
                .csp-hero h1{font-size:32px;font-weight:900;margin:0 0 8px;letter-spacing:-0.02em}
                .csp-hero p{font-size:15px;opacity:0.8;margin:0;line-height:1.6}
                .csp-hero-badge{
                    display:inline-flex;align-items:center;gap:6px;
                    padding:6px 16px;border-radius:999px;margin-top:16px;
                    background:rgba(255,255,255,0.15);backdrop-filter:blur(4px);
                    border:1px solid rgba(255,255,255,0.25);
                    font-size:11px;font-weight:800;letter-spacing:1px;
                }
                .csp-empty{
                    max-width:600px;margin:0 auto;text-align:center;
                    background:#fff;border-radius:16px;padding:48px 32px;
                    border:1px solid #e2e8f0;
                }
                .csp-empty-icon{font-size:48px;margin-bottom:16px}
                .csp-empty h3{font-size:18px;font-weight:800;color:#0f172a;margin:0 0 8px}
                .csp-empty p{font-size:14px;color:#94a3b8;margin:0;line-height:1.6}
            `}</style>

            <div style={{ maxWidth: 800, margin: "0 auto" }}>
                <a className="csp-back" onClick={() => router.push("/dashboard/learning/courses/5")}>
                    <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_back</span>
                    CosPro 선택으로 돌아가기
                </a>

                <div className="csp-hero" style={{ background: sub.gradient }}>
                    <div className="csp-hero-icon">{sub.icon}</div>
                    <h1>{sub.title}</h1>
                    <p>{sub.description}</p>
                    <div className="csp-hero-badge">
                        <span className="material-symbols-outlined" style={{ fontSize: 12 }}>workspace_premium</span>
                        {sub.subtitle}
                    </div>
                </div>

                <div className="csp-empty">
                    <div className="csp-empty-icon">📖</div>
                    <h3>학습 자료 준비 중</h3>
                    <p>
                        {sub.title} 학습 자료를 준비하고 있습니다.<br />
                        곧 체계적인 이론 학습과 모의고사를 제공할 예정입니다.
                    </p>
                </div>
            </div>
        </div>
    );
}
