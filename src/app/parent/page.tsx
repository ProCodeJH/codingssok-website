"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { createClient } from "@/lib/supabase";
import { COURSES, getAllUnits } from "@/data/courses";
import { verifyParentPin } from "@/hooks/useParentPin";

interface StudentProfile { id:string; name:string; email:string; level:number; xp:number; streak_current:number; streak_max:number; }
interface Submission { id:string; language:string; status:string; created_at:string; code:string; output:string; }
interface XpLog { id:string; amount:number; reason:string; icon:string; created_at:string; }
interface StudyNote { note_key:string; content:string; color:string; updated_at:string; }
interface Progress { course_id:string; completed_units:string[]; }
interface Feedback { id:string; parent_name:string; content:string; course_id:string; created_at:string; }

const gc: React.CSSProperties = {
    background:"rgba(255,255,255,0.75)", backdropFilter:"blur(20px)",
    borderRadius:20, border:"1px solid rgba(226,232,240,0.5)",
    boxShadow:"0 4px 20px rgba(0,0,0,0.04)",
};

type Tab = "overview"|"progress"|"notes"|"feedback"|"code";

const NOTE_COLORS: Record<string,string> = { yellow:"#fde047", green:"#86efac", blue:"#93c5fd", purple:"#c084fc", red:"#fca5a5", orange:"#fdba74" };

export default function ParentDashboard() {
    const supabase = useMemo(() => createClient(), []);
    const [studentCode, setStudentCode] = useState(() => {
        if (typeof window === "undefined") return "";
        return localStorage.getItem("parent_student_id") || "";
    });
    const [parentName, setParentName] = useState(() => {
        if (typeof window === "undefined") return "";
        return localStorage.getItem("parent_name") || "";
    });
    const [inputCode, setInputCode] = useState("");
    const [inputPin, setInputPin] = useState("");
    const [inputParentName, setInputParentName] = useState("");
    const [student, setStudent] = useState<StudentProfile | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [xpLogs, setXpLogs] = useState<XpLog[]>([]);
    const [progress, setProgress] = useState<Progress[]>([]);
    const [notes, setNotes] = useState<StudyNote[]>([]);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState<Tab>("overview");
    const [fbText, setFbText] = useState("");
    const [fbCourse, setFbCourse] = useState("");
    const [fbSending, setFbSending] = useState(false);

    const fetchStudentData = useCallback(async (query: string, pin?: string) => {
        setLoading(true); setError("");
        try {
            // If PIN provided, verify it
            if (pin) {
                const profile = await verifyParentPin(supabase, query, pin);
                if (!profile) { setError("학생을 찾을 수 없거나 접속 코드가 일치하지 않습니다."); setLoading(false); return; }
                const sid = profile.id;
                setStudent({ id:sid, name:profile.name||"학생", email:profile.email||"", level:profile.level||1, xp:profile.xp||0, streak_current:profile.streak_current||0, streak_max:profile.streak_max||0 });

                const [r1,r2,r3,r4,r5] = await Promise.all([
                    supabase.from("code_submissions").select("*").eq("user_id",sid).order("created_at",{ascending:false}).limit(50),
                    supabase.from("xp_logs").select("*").eq("user_id",sid).order("created_at",{ascending:false}).limit(30),
                    supabase.from("study_progress").select("course_id,completed_units").eq("user_id",sid).neq("course_id","__parent_pin__"),
                    supabase.from("study_notes").select("note_key,content,color,updated_at").eq("user_id",sid).order("updated_at",{ascending:false}),
                    supabase.from("parent_feedback").select("*").eq("student_id",sid).order("created_at",{ascending:false}),
                ]);
                setSubmissions(r1.data||[]); setXpLogs(r2.data||[]); setProgress(r3.data||[]); setNotes(r4.data||[]); setFeedbacks(r5.data||[]);
                localStorage.setItem("parent_student_id", sid);
                localStorage.setItem("parent_pin_cache", pin);
            } else {
                // Auto-reconnect from cache — use cached PIN
                const cachedPin = localStorage.getItem("parent_pin_cache");
                if (cachedPin) { await fetchStudentData(query, cachedPin); return; }
                else { setError("접속 코드가 필요합니다."); setLoading(false); return; }
            }
        } catch (err:any) { setError(err?.message||"데이터를 불러올 수 없습니다."); }
        setLoading(false);
    }, [supabase]);

    useEffect(() => { if (studentCode) fetchStudentData(studentCode); }, [studentCode, fetchStudentData]);

    // Realtime
    useEffect(() => {
        if (!student) return;
        const ch = supabase.channel("parent-monitor")
            .on("postgres_changes",{event:"INSERT",schema:"public",table:"code_submissions",filter:`user_id=eq.${student.id}`},(p)=>setSubmissions(prev=>[p.new as Submission,...prev].slice(0,50)))
            .on("postgres_changes",{event:"*",schema:"public",table:"xp_logs",filter:`user_id=eq.${student.id}`},(p)=>{if(p.eventType==="INSERT")setXpLogs(prev=>[p.new as XpLog,...prev].slice(0,30))})
            .on("postgres_changes",{event:"UPDATE",schema:"public",table:"profiles",filter:`id=eq.${student.id}`},(p)=>{const d=p.new as any;setStudent(prev=>prev?{...prev,level:d.level||prev.level,xp:d.xp||prev.xp,streak_current:d.streak_current||prev.streak_current}:prev)})
            .subscribe();
        return ()=>{supabase.removeChannel(ch)};
    }, [student, supabase]);

    const handleConnect = () => {
        if (!inputCode.trim() || !inputPin.trim()) { setError("자녀 정보와 접속 코드를 모두 입력해주세요."); return; }
        if (inputParentName.trim()) { setParentName(inputParentName.trim()); localStorage.setItem("parent_name", inputParentName.trim()); }
        fetchStudentData(inputCode.trim(), inputPin.trim());
    };
    const handleDisconnect = () => { setStudentCode(""); setStudent(null); setSubmissions([]); setXpLogs([]); setProgress([]); setNotes([]); setFeedbacks([]); localStorage.removeItem("parent_student_id"); };

    const sendFeedback = async () => {
        if (!fbText.trim() || !student || !parentName) return;
        setFbSending(true);
        await supabase.from("parent_feedback").insert({ parent_name: parentName, student_id: student.id, content: fbText.trim(), course_id: fbCourse || null });
        setFbText(""); setFbSending(false);
        const { data } = await supabase.from("parent_feedback").select("*").eq("student_id", student.id).order("created_at",{ascending:false});
        setFeedbacks(data || []);
    };

    const timeAgo = (ts:string) => { const d=Date.now()-new Date(ts).getTime(); if(d<60000)return"방금 전"; if(d<3600000)return`${Math.floor(d/60000)}분 전`; if(d<86400000)return`${Math.floor(d/3600000)}시간 전`; return`${Math.floor(d/86400000)}일 전`; };
    const todaySubs = submissions.filter(s=>new Date(s.created_at).toDateString()===new Date().toDateString());
    const successRate = submissions.length>0 ? Math.round(submissions.filter(s=>s.status==="success").length/submissions.length*100) : 0;
    const totalXpToday = xpLogs.filter(l=>new Date(l.created_at).toDateString()===new Date().toDateString()).reduce((s,l)=>s+(l.amount||0),0);

    // === Not Connected ===
    if (!student) {
        return (
            <div style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", background:"linear-gradient(135deg,#EEF2FF,#F0F9FF,#F8FAFC)", padding:20 }}>
                <motion.div initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} style={{...gc,padding:"48px 40px",maxWidth:480,width:"100%",textAlign:"center"}}>
                    <div style={{ width:80, height:80, borderRadius:24, background:"linear-gradient(135deg,#6366f1,#8b5cf6)", margin:"0 auto 24px", display:"flex", alignItems:"center", justifyContent:"center" }}>
                        <span className="material-symbols-outlined" style={{fontSize:40,color:"#fff"}}>family_restroom</span>
                    </div>
                    <h1 style={{fontSize:26,fontWeight:800,color:"#1e1b4b",marginBottom:8}}>학부모 모니터링</h1>
                    <p style={{fontSize:14,color:"#64748b",marginBottom:24,lineHeight:1.6}}>
                        자녀의 학습 현황을 실시간으로 확인합니다.
                    </p>
                    <input value={inputParentName} onChange={e=>setInputParentName(e.target.value)} placeholder="학부모 이름 (피드백 작성용)"
                        style={{ width:"100%",padding:"12px 16px",borderRadius:12,border:"1px solid #e2e8f0",fontSize:14,outline:"none",marginBottom:8,boxSizing:"border-box" }}/>
                    <input value={inputCode} onChange={e=>setInputCode(e.target.value)} placeholder="자녀 이름, 이메일, 또는 학생 ID"
                        style={{ width:"100%",padding:"12px 16px",borderRadius:12,border:"1px solid #e2e8f0",fontSize:14,outline:"none",marginBottom:8,boxSizing:"border-box" }}/>
                    <div style={{display:"flex",gap:8,marginBottom:12}}>
                        <div style={{position:"relative",flex:1}}>
                            <span className="material-symbols-outlined" style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",fontSize:18,color:"#94a3b8"}}>lock</span>
                            <input value={inputPin} onChange={e=>setInputPin(e.target.value.replace(/\D/g,'').slice(0,6))} onKeyDown={e=>e.key==="Enter"&&handleConnect()}
                                placeholder="접속 코드 (6자리)" maxLength={6}
                                style={{ width:"100%",padding:"12px 16px 12px 38px",borderRadius:12,border:"1px solid #e2e8f0",fontSize:16,outline:"none",fontFamily:"'JetBrains Mono',monospace",letterSpacing:4,boxSizing:"border-box" }}/>
                        </div>
                        <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={handleConnect} disabled={loading}
                            style={{ padding:"12px 24px", borderRadius:12, border:"none", cursor:"pointer", background:"linear-gradient(135deg,#6366f1,#8b5cf6)", color:"#fff", fontWeight:700, fontSize:14, whiteSpace:"nowrap" }}>
                            {loading?"연결 중...":"연결"}
                        </motion.button>
                    </div>
                    {error && <p style={{fontSize:12,color:"#ef4444",fontWeight:600}}>{error}</p>}
                    <p style={{fontSize:11,color:"#94a3b8",marginTop:8,lineHeight:1.5}}>
                        <span className="material-symbols-outlined" style={{fontSize:13,verticalAlign:"middle",marginRight:4}}>info</span>
                        접속 코드는 자녀의 <strong>프로필 페이지</strong>에서 확인할 수 있습니다.
                    </p>
                    <Link href="/" style={{display:"inline-block",marginTop:16,fontSize:13,color:"#94a3b8",textDecoration:"none"}}>← 홈으로</Link>
                </motion.div>
            </div>
        );
    }

    // === Connected ===
    const TABS:{id:Tab;label:string;icon:string}[] = [
        {id:"overview",label:"종합",icon:"dashboard"},
        {id:"progress",label:"진도",icon:"school"},
        {id:"notes",label:"노트",icon:"edit_note"},
        {id:"feedback",label:"피드백",icon:"rate_review"},
        {id:"code",label:"코드",icon:"terminal"},
    ];

    return (
        <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#EEF2FF,#F0F9FF,#F8FAFC)", padding:"24px 20px" }}>
            <div style={{ maxWidth:960, margin:"0 auto" }}>
                {/* Header */}
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24, flexWrap:"wrap", gap:12 }}>
                    <div>
                        <Link href="/" style={{fontSize:12,color:"#94a3b8",textDecoration:"none"}}>← 홈</Link>
                        <h1 style={{fontSize:24,fontWeight:800,color:"#1e1b4b",marginTop:4}}>{student.name} 학습 현황</h1>
                        <p style={{fontSize:12,color:"#94a3b8"}}>Lv.{student.level} · {student.xp.toLocaleString()} XP · 🔥{student.streak_current}일 연속</p>
                    </div>
                    <div style={{display:"flex",alignItems:"center",gap:8}}>
                        <motion.span animate={{scale:[1,1.3,1]}} transition={{duration:2,repeat:Infinity}}
                            style={{width:8,height:8,borderRadius:"50%",background:"#22c55e",display:"inline-block"}}/>
                        <span style={{fontSize:11,color:"#22c55e",fontWeight:600}}>실시간</span>
                        <button onClick={handleDisconnect} style={{padding:"6px 12px",borderRadius:8,border:"1px solid #e2e8f0",background:"#fff",cursor:"pointer",fontSize:11,color:"#64748b",fontWeight:600}}>해제</button>
                    </div>
                </div>

                {/* Tabs */}
                <div style={{ display:"flex", gap:3, marginBottom:20, ...gc, padding:4, overflow:"auto" }}>
                    {TABS.map(t=>(
                        <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{
                            flex:1, padding:"10px 8px", borderRadius:14, border:"none", cursor:"pointer",
                            background:activeTab===t.id?"linear-gradient(135deg,#6366f1,#8b5cf6)":"transparent",
                            color:activeTab===t.id?"#fff":"#64748b", fontWeight:700, fontSize:12,
                            display:"flex", alignItems:"center", justifyContent:"center", gap:4, whiteSpace:"nowrap",
                        }}>
                            <span className="material-symbols-outlined" style={{fontSize:16}}>{t.icon}</span>
                            {t.label}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                {/* === Overview === */}
                {activeTab==="overview" && (
                    <motion.div key="ov" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:12,marginBottom:20}}>
                            {[
                                {icon:"local_fire_department",label:"연속 출석",value:`${student.streak_current}일`,sub:`최대 ${student.streak_max}일`,color:"#EF4444",bg:"#FEF2F2"},
                                {icon:"star",label:"레벨 / XP",value:`Lv.${student.level}`,sub:`${student.xp.toLocaleString()} XP`,color:"#F59E0B",bg:"#FFFBEB"},
                                {icon:"code",label:"오늘 코드",value:`${todaySubs.length}회`,sub:`성공률 ${successRate}%`,color:"#6366f1",bg:"#EEF2FF"},
                                {icon:"trending_up",label:"오늘 XP",value:`+${totalXpToday}`,sub:`총 ${submissions.length}회`,color:"#10b981",bg:"#ECFDF5"},
                            ].map(s=>(
                                <div key={s.label} style={{...gc,padding:20}}>
                                    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                                        <span className="material-symbols-outlined" style={{fontSize:20,width:38,height:38,borderRadius:12,background:s.bg,display:"flex",alignItems:"center",justifyContent:"center",color:s.color}}>{s.icon}</span>
                                        <span style={{fontSize:12,color:"#94a3b8",fontWeight:600}}>{s.label}</span>
                                    </div>
                                    <div style={{fontSize:28,fontWeight:800,color:s.color}}>{s.value}</div>
                                    <div style={{fontSize:11,color:"#94a3b8",marginTop:2}}>{s.sub}</div>
                                </div>
                            ))}
                        </div>
                        {/* Quick progress summary */}
                        <div style={{...gc,padding:20,marginBottom:20}}>
                            <h3 style={{fontSize:14,fontWeight:700,color:"#1e1b4b",marginBottom:16}}>과목별 진도</h3>
                            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
                                {COURSES.filter(c=>c.chapters[0]?.id!=="coming-soon").map(c=>{
                                    const p = progress.find(pr=>pr.course_id===c.id);
                                    const total = getAllUnits(c.id).length;
                                    const done = p?.completed_units?.length||0;
                                    const pct = total>0?Math.round(done/total*100):0;
                                    return (
                                        <div key={c.id} style={{padding:"12px 14px",borderRadius:12,background:"#f8fafc"}}>
                                            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                                                <span style={{fontSize:12,fontWeight:700,color:"#334155"}}>{c.title}</span>
                                                <span style={{fontSize:11,fontWeight:700,color:"#6366f1"}}>{pct}%</span>
                                            </div>
                                            <div style={{height:6,borderRadius:3,background:"#e2e8f0",overflow:"hidden"}}>
                                                <div style={{width:`${pct}%`,height:"100%",borderRadius:3,background:"linear-gradient(90deg,#6366f1,#8b5cf6)",transition:"width 0.5s"}}/>
                                            </div>
                                            <div style={{fontSize:10,color:"#94a3b8",marginTop:4}}>{done}/{total} 유닛</div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* Recent activity */}
                        <div style={{...gc,padding:20}}>
                            <h3 style={{fontSize:14,fontWeight:700,color:"#1e1b4b",marginBottom:12}}>최근 XP 활동</h3>
                            {xpLogs.slice(0,8).map(l=>(
                                <div key={l.id} style={{display:"flex",justifyContent:"space-between",marginBottom:6,fontSize:12}}>
                                    <span style={{color:"#334155"}}>{l.reason}</span>
                                    <span style={{color:l.amount>0?"#22c55e":"#ef4444",fontWeight:700}}>{l.amount>0?"+":""}{l.amount} XP</span>
                                </div>
                            ))}
                            {xpLogs.length===0&&<p style={{fontSize:12,color:"#94a3b8"}}>아직 데이터가 없습니다</p>}
                        </div>
                    </motion.div>
                )}

                {/* === Progress === */}
                {activeTab==="progress" && (
                    <motion.div key="pr" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                        <div style={{display:"flex",flexDirection:"column",gap:12}}>
                            {COURSES.filter(c=>c.chapters[0]?.id!=="coming-soon").map(c=>{
                                const p = progress.find(pr=>pr.course_id===c.id);
                                const units = getAllUnits(c.id);
                                const done = p?.completed_units||[];
                                const pct = units.length>0?Math.round(done.length/units.length*100):0;
                                return (
                                    <div key={c.id} style={{...gc,padding:20}}>
                                        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
                                            <div>
                                                <h3 style={{fontSize:16,fontWeight:800,color:"#1e1b4b"}}>{c.title}</h3>
                                                <p style={{fontSize:11,color:"#94a3b8"}}>{done.length}/{units.length} 유닛 완료</p>
                                            </div>
                                            <div style={{fontSize:24,fontWeight:800,color:pct>=100?"#22c55e":"#6366f1"}}>{pct}%</div>
                                        </div>
                                        <div style={{height:8,borderRadius:4,background:"#f1f5f9",overflow:"hidden",marginBottom:12}}>
                                            <div style={{width:`${pct}%`,height:"100%",borderRadius:4,background:pct>=100?"linear-gradient(90deg,#22c55e,#10b981)":"linear-gradient(90deg,#6366f1,#8b5cf6)",transition:"width 0.5s"}}/>
                                        </div>
                                        {/* Unit list */}
                                        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:4}}>
                                            {units.slice(0,20).map(u=>(
                                                <div key={u.id} style={{
                                                    fontSize:11,padding:"6px 10px",borderRadius:8,
                                                    background:done.includes(u.id)?"rgba(34,197,94,0.1)":"#f8fafc",
                                                    color:done.includes(u.id)?"#22c55e":"#94a3b8",
                                                    display:"flex",alignItems:"center",gap:6,
                                                }}>
                                                    <span className="material-symbols-outlined" style={{fontSize:14}}>{done.includes(u.id)?"check_circle":"radio_button_unchecked"}</span>
                                                    {u.title}
                                                </div>
                                            ))}
                                            {units.length>20&&<div style={{fontSize:10,color:"#94a3b8",padding:8}}>+{units.length-20}개 더</div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                )}

                {/* === Notes === */}
                {activeTab==="notes" && (
                    <motion.div key="nt" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                        <div style={{...gc,padding:20,marginBottom:12}}>
                            <h3 style={{fontSize:15,fontWeight:700,color:"#1e1b4b",marginBottom:4}}>학습 노트</h3>
                            <p style={{fontSize:12,color:"#94a3b8"}}>자녀가 학습 중 작성한 노트 ({notes.length}개)</p>
                        </div>
                        {notes.length===0 ? (
                            <div style={{...gc,padding:48,textAlign:"center"}}>
                                <span className="material-symbols-outlined" style={{fontSize:48,color:"#cbd5e1"}}>note</span>
                                <p style={{fontSize:13,color:"#94a3b8",marginTop:12}}>아직 작성된 노트가 없습니다</p>
                            </div>
                        ) : (
                            <div style={{display:"flex",flexDirection:"column",gap:8}}>
                                {notes.map(n=>(
                                    <div key={n.note_key} style={{...gc,padding:16,borderLeft:`4px solid ${NOTE_COLORS[n.color]||"#e2e8f0"}`}}>
                                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                                            <span style={{fontSize:10,color:"#94a3b8",fontWeight:600}}>{n.note_key.replace(/_/g," › ")}</span>
                                            <span style={{fontSize:10,color:"#94a3b8"}}>{timeAgo(n.updated_at)}</span>
                                        </div>
                                        <p style={{fontSize:13,color:"#334155",lineHeight:1.7,whiteSpace:"pre-wrap"}}>{n.content || "(빈 노트)"}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}

                {/* === Feedback === */}
                {activeTab==="feedback" && (
                    <motion.div key="fb" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                        {/* Write feedback */}
                        <div style={{...gc,padding:20,marginBottom:16}}>
                            <h3 style={{fontSize:15,fontWeight:700,color:"#1e1b4b",marginBottom:12}}>
                                <span className="material-symbols-outlined" style={{fontSize:18,verticalAlign:"middle",marginRight:6}}>rate_review</span>
                                피드백 작성
                            </h3>
                            <select value={fbCourse} onChange={e=>setFbCourse(e.target.value)}
                                style={{width:"100%",padding:"10px 14px",borderRadius:10,border:"1px solid #e2e8f0",fontSize:13,marginBottom:8,outline:"none",color:"#334155"}}>
                                <option value="">전체 / 일반 피드백</option>
                                {COURSES.map(c=><option key={c.id} value={c.id}>{c.title}</option>)}
                            </select>
                            <textarea value={fbText} onChange={e=>setFbText(e.target.value)} placeholder="자녀에게 보낼 피드백을 작성하세요..."
                                style={{width:"100%",minHeight:100,padding:"12px 14px",borderRadius:10,border:"1px solid #e2e8f0",fontSize:13,resize:"vertical",outline:"none",lineHeight:1.6,boxSizing:"border-box"}}/>
                            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8}}>
                                <span style={{fontSize:11,color:"#94a3b8"}}>작성자: {parentName||"(이름 미설정)"}</span>
                                <motion.button whileHover={{scale:1.03}} whileTap={{scale:0.97}} onClick={sendFeedback} disabled={fbSending||!fbText.trim()||!parentName}
                                    style={{padding:"10px 24px",borderRadius:10,border:"none",cursor:"pointer",background:!fbText.trim()||!parentName?"#e2e8f0":"linear-gradient(135deg,#6366f1,#8b5cf6)",color:!fbText.trim()||!parentName?"#94a3b8":"#fff",fontWeight:700,fontSize:13}}>
                                    {fbSending?"보내는 중...":"피드백 보내기"}
                                </motion.button>
                            </div>
                        </div>
                        {/* Feedback list */}
                        <div style={{...gc,padding:20}}>
                            <h3 style={{fontSize:15,fontWeight:700,color:"#1e1b4b",marginBottom:16}}>보낸 피드백 ({feedbacks.length}개)</h3>
                            {feedbacks.length===0 ? (
                                <p style={{fontSize:13,color:"#94a3b8",textAlign:"center",padding:24}}>아직 피드백이 없습니다</p>
                            ) : (
                                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                                    {feedbacks.map(f=>(
                                        <div key={f.id} style={{padding:"12px 16px",borderRadius:12,background:"#f8fafc",borderLeft:"3px solid #6366f1"}}>
                                            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
                                                <span style={{fontSize:11,fontWeight:600,color:"#6366f1"}}>{f.parent_name}</span>
                                                <span style={{fontSize:10,color:"#94a3b8"}}>{timeAgo(f.created_at)}</span>
                                            </div>
                                            {f.course_id && <span style={{fontSize:9,padding:"2px 8px",borderRadius:5,background:"rgba(99,102,241,0.1)",color:"#6366f1",fontWeight:600}}>{COURSES.find(c=>c.id===f.course_id)?.title||f.course_id}</span>}
                                            <p style={{fontSize:13,color:"#334155",marginTop:6,lineHeight:1.6,whiteSpace:"pre-wrap"}}>{f.content}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* === Code === */}
                {activeTab==="code" && (
                    <motion.div key="cd" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} exit={{opacity:0}}>
                        <div style={{display:"flex",flexDirection:"column",gap:12}}>
                            {submissions.slice(0,20).map(s=>(
                                <div key={s.id} style={{...gc,padding:16,overflow:"hidden"}}>
                                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:8}}>
                                        <div style={{display:"flex",alignItems:"center",gap:8}}>
                                            <span style={{fontSize:9,padding:"2px 8px",borderRadius:6,fontWeight:700,textTransform:"uppercase",background:"rgba(99,102,241,0.1)",color:"#6366f1"}}>{s.language}</span>
                                            <span style={{fontSize:9,padding:"2px 8px",borderRadius:6,fontWeight:700,background:s.status==="success"?"rgba(34,197,94,0.1)":"rgba(239,68,68,0.1)",color:s.status==="success"?"#22c55e":"#ef4444"}}>{s.status==="success"?"성공":"실패"}</span>
                                        </div>
                                        <span style={{fontSize:11,color:"#94a3b8"}}>{timeAgo(s.created_at)}</span>
                                    </div>
                                    <pre style={{fontSize:11,lineHeight:1.6,color:"#334155",background:"#f8fafc",borderRadius:8,padding:12,overflow:"auto",maxHeight:120,fontFamily:"'JetBrains Mono',monospace",margin:0}}>{s.code?.slice(0,500)}{(s.code?.length||0)>500?"\n...":""}</pre>
                                    {s.output && <div style={{marginTop:8,fontSize:11,color:s.status==="success"?"#22c55e":"#ef4444",background:"#f8fafc",borderRadius:8,padding:"8px 12px",fontFamily:"'JetBrains Mono',monospace",maxHeight:60,overflow:"auto"}}>{s.output.slice(0,200)}</div>}
                                </div>
                            ))}
                            {submissions.length===0 && <div style={{...gc,padding:40,textAlign:"center"}}><p style={{fontSize:13,color:"#94a3b8"}}>아직 코드 실행 기록이 없습니다</p></div>}
                        </div>
                    </motion.div>
                )}
                </AnimatePresence>
            </div>
        </div>
    );
}
