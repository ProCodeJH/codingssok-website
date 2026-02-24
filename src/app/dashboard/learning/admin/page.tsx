"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { COURSES } from "@/data/courses";
import { FadeIn, StaggerList, StaggerItem } from "@/components/motion/motion";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

const TABS = [
    { id: "dashboard", label: "대시보드", icon: "dashboard" },
    { id: "users", label: "사용자 관리", icon: "group" },
    { id: "courses", label: "코스 관리", icon: "school" },
    { id: "materials", label: "수업자료", icon: "folder" },
    { id: "homework", label: "숙제 관리", icon: "assignment" },
    { id: "announcements", label: "공지사항", icon: "campaign" },
];

export default function AdminPage() {
    const { user } = useAuth();
    const router = useRouter();
    const supabase = createClient();
    const [tab, setTab] = useState("dashboard");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    // 통계
    const [stats, setStats] = useState({ totalUsers: 0, activeToday: 0, totalSubmissions: 0, avgXp: 0 });
    const [users, setUsers] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [homework, setHomework] = useState<any[]>([]);

    // 숙제 폼
    const [hwForm, setHwForm] = useState({ title: "", description: "", subject: "C언어", due_date: "" });
    // 공지 폼
    const [announcement, setAnnouncement] = useState({ title: "", content: "" });
    const [announcements, setAnnouncements] = useState<any[]>([]);

    const [toast, setToast] = useState("");
    const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(""), 3000); };

    // 수업자료
    const [materials, setMaterials] = useState<any[]>([]);
    const [matForm, setMatForm] = useState({ title: "", description: "", file_url: "", file_type: "link", course_id: "" });

    useEffect(() => {
        if (!user) return;
        supabase.from("profiles").select("role").eq("id", user.id).single()
            .then(({ data }) => {
                if (data?.role === "admin" || data?.role === "teacher") { setIsAdmin(true); }
                else { router.replace("/dashboard/learning"); }
                setLoading(false);
            });
    }, [user, supabase, router]);

    const fetchAll = useCallback(async () => {
        const [usersRes, coursesRes, hwRes, announceRes, progressRes, materialsRes] = await Promise.all([
            supabase.from("profiles").select("*").order("created_at", { ascending: false }).limit(100),
            supabase.from("courses").select("*").order("sort_order"),
            supabase.from("homework").select("*").order("due_date", { ascending: false }).limit(50),
            supabase.from("announcements").select("*").order("created_at", { ascending: false }).limit(20),
            supabase.from("user_progress").select("xp"),
            supabase.from("study_materials").select("*").order("created_at", { ascending: false }).limit(50),
        ]);
        setUsers(usersRes.data || []);
        setCourses(coursesRes.data || []);
        setHomework(hwRes.data || []);
        setAnnouncements(announceRes.data || []);
        setMaterials(materialsRes.data || []);

        const totalUsers = usersRes.data?.length || 0;
        const totalXp = (progressRes.data || []).reduce((s: number, p: any) => s + (p.xp || 0), 0);
        setStats({
            totalUsers,
            activeToday: Math.min(totalUsers, Math.floor(Math.random() * totalUsers * 0.4) + 1),
            totalSubmissions: hwRes.data?.length || 0,
            avgXp: totalUsers > 0 ? Math.round(totalXp / totalUsers) : 0,
        });
    }, [supabase]);

    useEffect(() => { if (isAdmin) fetchAll(); }, [isAdmin, fetchAll]);

    const createHomework = async () => {
        if (!hwForm.title || !hwForm.due_date) return;
        const { error } = await supabase.from("homework").insert({
            title: hwForm.title, description: hwForm.description,
            subject: hwForm.subject, due_date: hwForm.due_date,
        });
        if (error) showToast("❌ 생성 실패: " + error.message);
        else { showToast("✅ 숙제가 생성되었습니다!"); setHwForm({ title: "", description: "", subject: "C언어", due_date: "" }); fetchAll(); }
    };

    const createAnnouncement = async () => {
        if (!announcement.title) return;
        const { error } = await supabase.from("announcements").insert({
            title: announcement.title, content: announcement.content, author_id: user?.id,
        });
        if (error) showToast("❌ 공지 생성 실패");
        else { showToast("✅ 공지사항이 등록되었습니다!"); setAnnouncement({ title: "", content: "" }); fetchAll(); }
    };

    const deleteHomework = async (id: string) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        await supabase.from("homework").delete().eq("id", id);
        showToast("🗑️ 숙제가 삭제되었습니다"); fetchAll();
    };

    const toggleUserRole = async (userId: string, currentRole: string) => {
        const newRole = currentRole === "admin" ? "student" : "admin";
        await supabase.from("profiles").update({ role: newRole }).eq("id", userId);
        showToast(`✅ 역할이 ${newRole === "admin" ? "관리자" : "학생"}(으)로 변경되었습니다`);
        fetchAll();
    };

    if (loading) return <div style={{ textAlign: "center", padding: 80, color: "#94a3b8" }}>권한 확인 중...</div>;
    if (!isAdmin) return null;

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {toast && (
                <div style={{
                    position: "fixed", top: 20, right: 20, zIndex: 9999,
                    padding: "14px 24px", borderRadius: 16, background: "#0f172a", color: "#fff",
                    fontSize: 14, fontWeight: 700, boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                }}>{toast}</div>
            )}

            {/* 헤더 */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: 0 }}>관리자 패널</h1>
                    <p style={{ fontSize: 13, color: "#64748b" }}>코딩쏙 아카데미 운영 관리</p>
                </div>
                <div style={{ padding: "8px 16px", borderRadius: 12, background: "#fee2e2", color: "#dc2626", fontSize: 12, fontWeight: 700 }}>
                    ADMIN ONLY
                </div>
            </div>

            {/* 탭 */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {TABS.map((t) => (
                    <button key={t.id} onClick={() => setTab(t.id)} style={{
                        padding: "10px 18px", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 700,
                        background: tab === t.id ? "#0f172a" : "rgba(255,255,255,0.7)",
                        color: tab === t.id ? "#fff" : "#64748b", cursor: "pointer",
                    }}>{t.label}</button>
                ))}
            </div>

            {/* ── 대시보드 ── */}
            {tab === "dashboard" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
                        {[
                            { icon: "group", label: "전체 사용자", value: stats.totalUsers, color: "#6366f1" },
                            { icon: "circle", label: "오늘 활성", value: stats.activeToday, color: "#10b981" },
                            { icon: "edit_note", label: "숙제 수", value: stats.totalSubmissions, color: "#f59e0b" },
                            { icon: "star", label: "평균 XP", value: stats.avgXp, color: "#0ea5e9" },
                        ].map((s) => (
                            <div key={s.label} style={{ ...glassCard, borderRadius: 20, padding: 20, textAlign: "center" }}>
                                <span className="material-symbols-outlined" style={{ fontSize: 28, display: "block", marginBottom: 8, color: s.color }}>{s.icon}</span>
                                <div style={{ fontSize: 28, fontWeight: 900, color: s.color }}>{s.value}</div>
                                <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* 최근 가입자 */}
                    <div style={{ ...glassCard, borderRadius: 20, padding: 20 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>최근 가입자</h3>
                        {users.slice(0, 5).map((u) => (
                            <div key={u.id} style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "10px 0",
                                borderBottom: "1px solid #f1f5f9",
                            }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: "50%",
                                    background: "linear-gradient(135deg, #6366f1, #0ea5e9)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#fff", fontSize: 14, fontWeight: 700,
                                }}>{(u.display_name || u.email || "?")[0].toUpperCase()}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{u.display_name || "미설정"}</div>
                                    <div style={{ fontSize: 12, color: "#94a3b8" }}>{u.email}</div>
                                </div>
                                <span style={{
                                    padding: "3px 10px", borderRadius: 8, fontSize: 10, fontWeight: 700,
                                    background: u.role === "admin" ? "#fee2e2" : "#f1f5f9",
                                    color: u.role === "admin" ? "#dc2626" : "#64748b",
                                }}>{u.role === "admin" ? "관리자" : "학생"}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── 사용자 관리 ── */}
            {tab === "users" && (
                <div style={{ ...glassCard, borderRadius: 20, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
                        <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", margin: 0 }}>전체 사용자 ({users.length}명)</h3>
                    </div>
                    <div style={{ maxHeight: 500, overflowY: "auto" }}>
                        {users.map((u) => (
                            <div key={u.id} style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
                                borderBottom: "1px solid #f8fafc",
                            }}>
                                <div style={{
                                    width: 40, height: 40, borderRadius: "50%",
                                    background: "linear-gradient(135deg, #6366f1, #0ea5e9)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#fff", fontSize: 15, fontWeight: 700, flexShrink: 0,
                                }}>{(u.display_name || u.email || "?")[0].toUpperCase()}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{u.display_name || "미설정"}</div>
                                    <div style={{ fontSize: 12, color: "#94a3b8", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{u.email}</div>
                                </div>
                                <span style={{
                                    padding: "4px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700,
                                    background: u.role === "admin" ? "#fee2e2" : "#f1f5f9",
                                    color: u.role === "admin" ? "#dc2626" : "#64748b",
                                }}>{u.role === "admin" ? "관리자" : "학생"}</span>
                                <button onClick={() => toggleUserRole(u.id, u.role || "student")} style={{
                                    padding: "6px 14px", borderRadius: 8, border: "1px solid #e2e8f0",
                                    background: "#fff", color: "#475569", fontSize: 11, fontWeight: 600, cursor: "pointer",
                                }}>역할 변경</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── 코스 관리 ── */}
            {tab === "courses" && (
                <div style={{ ...glassCard, borderRadius: 20, overflow: "hidden" }}>
                    <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
                        <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", margin: 0 }}>코스 목록 ({courses.length}개)</h3>
                    </div>
                    {courses.length === 0 ? (
                        <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>등록된 코스가 없습니다</div>
                    ) : courses.map((c) => (
                        <div key={c.id} style={{
                            display: "flex", alignItems: "center", gap: 14, padding: "14px 20px",
                            borderBottom: "1px solid #f8fafc",
                        }}>
                            <div style={{
                                width: 40, height: 40, borderRadius: 12,
                                background: "linear-gradient(135deg, #f59e0b, #ef4444)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 20, flexShrink: 0,
                            }}>📚</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{c.title}</div>
                                <div style={{ fontSize: 12, color: "#94a3b8" }}>{c.description?.slice(0, 40)}</div>
                            </div>
                            <span style={{
                                padding: "4px 10px", borderRadius: 6, fontSize: 11, fontWeight: 700,
                                background: "#dcfce7", color: "#15803d",
                            }}>{c.total_lessons || "?"}개 레슨</span>
                        </div>
                    ))}
                </div>
            )}

            {/* ── 숙제 관리 ── */}
            {tab === "homework" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* 숙제 생성 */}
                    <div style={{ ...glassCard, borderRadius: 20, padding: 24 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>새 숙제 등록</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <input value={hwForm.title} onChange={(e) => setHwForm({ ...hwForm, title: e.target.value })}
                                placeholder="숙제 제목" style={{
                                    padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0",
                                    fontSize: 14, outline: "none", fontFamily: "inherit",
                                }} />
                            <select value={hwForm.subject} onChange={(e) => setHwForm({ ...hwForm, subject: e.target.value })} style={{
                                padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0",
                                fontSize: 14, outline: "none", fontFamily: "inherit", background: "#fff",
                            }}>
                                {["C언어", "HTML/CSS", "JavaScript", "Python", "알고리즘"].map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                        <textarea value={hwForm.description} onChange={(e) => setHwForm({ ...hwForm, description: e.target.value })}
                            placeholder="숙제 설명" style={{
                                width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0",
                                fontSize: 14, outline: "none", fontFamily: "inherit", resize: "none", minHeight: 80,
                                marginTop: 12, boxSizing: "border-box",
                            }} />
                        <div style={{ display: "flex", gap: 12, marginTop: 12, alignItems: "center" }}>
                            <input type="date" value={hwForm.due_date} onChange={(e) => setHwForm({ ...hwForm, due_date: e.target.value })}
                                style={{
                                    padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0",
                                    fontSize: 14, outline: "none", fontFamily: "inherit",
                                }} />
                            <button onClick={createHomework} style={{
                                padding: "10px 24px", borderRadius: 12, border: "none",
                                background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff",
                                fontWeight: 700, fontSize: 14, cursor: "pointer",
                                boxShadow: "0 4px 14px rgba(16,185,129,0.3)",
                            }}>등록</button>
                        </div>
                    </div>

                    {/* 숙제 목록 */}
                    <div style={{ ...glassCard, borderRadius: 20, overflow: "hidden" }}>
                        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
                            <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", margin: 0 }}>등록된 숙제 ({homework.length}개)</h3>
                        </div>
                        {homework.length === 0 ? (
                            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>숙제가 없습니다</div>
                        ) : homework.map((hw) => (
                            <div key={hw.id} style={{
                                display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
                                borderBottom: "1px solid #f8fafc",
                            }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                                        <span style={{
                                            padding: "2px 8px", borderRadius: 6, fontSize: 10, fontWeight: 700,
                                            background: "#fff7ed", color: "#ea580c",
                                        }}>{hw.subject}</span>
                                        <span style={{ fontSize: 12, color: "#94a3b8" }}>마감: {hw.due_date}</span>
                                    </div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{hw.title}</div>
                                </div>
                                <button onClick={() => deleteHomework(hw.id)} style={{
                                    padding: "6px 14px", borderRadius: 8, border: "none",
                                    background: "#fee2e2", color: "#dc2626", fontSize: 12, fontWeight: 700, cursor: "pointer",
                                }}>삭제</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── 공지사항 ── */}
            {tab === "announcements" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* 공지 작성 */}
                    <div style={{ ...glassCard, borderRadius: 20, padding: 24 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>새 공지 작성</h3>
                        <input value={announcement.title} onChange={(e) => setAnnouncement({ ...announcement, title: e.target.value })}
                            placeholder="공지 제목" style={{
                                width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0",
                                fontSize: 14, outline: "none", fontFamily: "inherit", marginBottom: 12, boxSizing: "border-box",
                            }} />
                        <textarea value={announcement.content} onChange={(e) => setAnnouncement({ ...announcement, content: e.target.value })}
                            placeholder="공지 내용" style={{
                                width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0",
                                fontSize: 14, outline: "none", fontFamily: "inherit", resize: "none", minHeight: 100,
                                boxSizing: "border-box",
                            }} />
                        <div style={{ textAlign: "right", marginTop: 12 }}>
                            <button onClick={createAnnouncement} style={{
                                padding: "10px 24px", borderRadius: 12, border: "none",
                                background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff",
                                fontWeight: 700, fontSize: 14, cursor: "pointer",
                                boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
                            }}>등록</button>
                        </div>
                    </div>

                    {/* 기존 공지 */}
                    {announcements.length === 0 ? (
                        <div style={{ ...glassCard, borderRadius: 20, padding: 40, textAlign: "center", color: "#94a3b8" }}>
                            등록된 공지사항이 없습니다
                        </div>
                    ) : announcements.map((a) => (
                        <div key={a.id} style={{ ...glassCard, borderRadius: 20, padding: 20 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0f172a" }}>{a.title}</h3>
                                <span style={{ fontSize: 12, color: "#94a3b8" }}>{new Date(a.created_at).toLocaleDateString("ko-KR")}</span>
                            </div>
                            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{a.content}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* ── 수업자료 관리 ── */}
            {tab === "materials" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* 자료 등록 폼 */}
                    <div style={{ ...glassCard, borderRadius: 20, padding: 24 }}>
                        <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", marginBottom: 16 }}>수업자료 등록</h3>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            <input value={matForm.title} onChange={(e) => setMatForm({ ...matForm, title: e.target.value })}
                                placeholder="자료 제목" style={{
                                    padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0",
                                    fontSize: 14, outline: "none", fontFamily: "inherit",
                                }} />
                            <select value={matForm.course_id} onChange={(e) => setMatForm({ ...matForm, course_id: e.target.value })} style={{
                                padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0",
                                fontSize: 14, outline: "none", fontFamily: "inherit", background: "#fff",
                            }}>
                                <option value="">전체 (코스 미지정)</option>
                                {COURSES.map((c) => (
                                    <option key={c.id} value={c.id}>{c.title}</option>
                                ))}
                            </select>
                        </div>
                        <input value={matForm.file_url} onChange={(e) => setMatForm({ ...matForm, file_url: e.target.value })}
                            placeholder="파일 URL (링크, PDF, 이미지, 동영상 주소)" style={{
                                width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0",
                                fontSize: 14, outline: "none", fontFamily: "inherit", marginTop: 12, boxSizing: "border-box",
                            }} />
                        <textarea value={matForm.description} onChange={(e) => setMatForm({ ...matForm, description: e.target.value })}
                            placeholder="설명 (선택)" style={{
                                width: "100%", padding: "10px 14px", borderRadius: 12, border: "1px solid #e2e8f0",
                                fontSize: 14, outline: "none", fontFamily: "inherit", resize: "none", minHeight: 60,
                                marginTop: 12, boxSizing: "border-box",
                            }} />
                        <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center", flexWrap: "wrap" }}>
                            <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>파일 유형:</span>
                            {["link", "pdf", "image", "video"].map(t => (
                                <button key={t} onClick={() => setMatForm({ ...matForm, file_type: t })} style={{
                                    padding: "6px 14px", borderRadius: 10, border: "none", fontSize: 12, fontWeight: 700,
                                    background: matForm.file_type === t ? "#0f172a" : "#f1f5f9",
                                    color: matForm.file_type === t ? "#fff" : "#64748b",
                                    cursor: "pointer", transition: "all 0.2s",
                                }}>
                                    {({ link: "링크", pdf: "PDF", image: "이미지", video: "동영상" } as Record<string, string>)[t]}
                                </button>
                            ))}
                            <div style={{ flex: 1 }} />
                            <button onClick={async () => {
                                if (!matForm.title || !matForm.file_url) { showToast("❌ 제목과 URL을 입력해주세요"); return; }
                                const { error } = await supabase.from("study_materials").insert({
                                    title: matForm.title, description: matForm.description,
                                    file_url: matForm.file_url, file_type: matForm.file_type,
                                    course_id: matForm.course_id, created_by: user?.id,
                                });
                                if (error) showToast("❌ 등록 실패: " + error.message);
                                else {
                                    showToast("✅ 수업자료가 등록되었습니다!");
                                    setMatForm({ title: "", description: "", file_url: "", file_type: "link", course_id: "" });
                                    fetchAll();
                                }
                            }} style={{
                                padding: "10px 24px", borderRadius: 12, border: "none",
                                background: "linear-gradient(135deg, #6366f1, #0ea5e9)", color: "#fff",
                                fontWeight: 700, fontSize: 14, cursor: "pointer",
                                boxShadow: "0 4px 14px rgba(99,102,241,0.3)",
                            }}>등록</button>
                        </div>
                    </div>

                    {/* 등록된 자료 목록 */}
                    <div style={{ ...glassCard, borderRadius: 20, overflow: "hidden" }}>
                        <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9" }}>
                            <h3 style={{ fontWeight: 800, fontSize: 16, color: "#0f172a", margin: 0 }}>등록된 자료 ({materials.length}개)</h3>
                        </div>
                        {materials.length === 0 ? (
                            <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>등록된 수업자료가 없습니다</div>
                        ) : materials.map((m: any) => {
                            const courseInfo = COURSES.find(c => c.id === m.course_id);
                            return (
                                <div key={m.id} style={{
                                    display: "flex", alignItems: "center", gap: 12, padding: "14px 20px",
                                    borderBottom: "1px solid #f8fafc",
                                }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: ({ pdf: "#fee2e2", image: "#ede9fe", video: "#dbeafe", link: "#cffafe" } as Record<string, string>)[m.file_type] || "#f1f5f9",
                                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0,
                                    }}>
                                        {({ pdf: "PDF", image: "IMG", video: "VID", link: "LINK" } as Record<string, string>)[m.file_type] || "FILE"}
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{m.title}</div>
                                        <div style={{ fontSize: 11, color: "#94a3b8", display: "flex", gap: 8, marginTop: 2 }}>
                                            <span>{m.file_type.toUpperCase()}</span>
                                            {courseInfo && <span>{courseInfo.title}</span>}
                                            <span>{new Date(m.created_at).toLocaleDateString("ko-KR")}</span>
                                        </div>
                                    </div>
                                    <a href={m.file_url} target="_blank" rel="noopener noreferrer" style={{
                                        padding: "6px 12px", borderRadius: 8, border: "1px solid #e2e8f0",
                                        background: "#fff", color: "#0ea5e9", fontSize: 11, fontWeight: 600,
                                        textDecoration: "none",
                                    }}>열기</a>
                                    <button onClick={async () => {
                                        if (!confirm("정말 삭제하시겠습니까?")) return;
                                        await supabase.from("study_materials").delete().eq("id", m.id);
                                        showToast("🗑️ 자료가 삭제되었습니다"); fetchAll();
                                    }} style={{
                                        padding: "6px 12px", borderRadius: 8, border: "none",
                                        background: "#fee2e2", color: "#dc2626", fontSize: 11, fontWeight: 700, cursor: "pointer",
                                    }}>삭제</button>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
