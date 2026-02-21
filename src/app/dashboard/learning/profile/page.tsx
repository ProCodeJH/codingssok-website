"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { getTierInfo, getDisplayTier, calcLevel, xpForNextLevel } from "@/lib/xp-engine";
import { useUserProgress } from "@/hooks/useUserProgress";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

export default function ProfilePage() {
    const { user } = useAuth();
    const { progress } = useUserProgress();
    const supabase = useMemo(() => createClient(), []);

    const [profile, setProfile] = useState<any>(null);
    const [displayName, setDisplayName] = useState("");
    const [bio, setBio] = useState("");
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");
    const [followers, setFollowers] = useState<any[]>([]);
    const [following, setFollowing] = useState<any[]>([]);
    const [tab, setTab] = useState<"info" | "followers" | "following">("info");
    const fileRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!user) return;
        // 프로필 로드
        supabase.from("profiles").select("*").eq("id", user.id).single()
            .then(({ data }) => {
                if (data) {
                    setProfile(data);
                    setDisplayName(data.display_name || "");
                    setBio(data.bio || "");
                }
            });

        // 팔로워/팔로잉 로드 — FK 없이 2단계 조회
        (async () => {
            try {
                // 팔로워 (나를 팔로우하는 사람들)
                const { data: followerRows } = await supabase.from("follows")
                    .select("follower_id").eq("following_id", user.id);
                if (followerRows && followerRows.length > 0) {
                    const ids = followerRows.map((r: any) => r.follower_id);
                    const { data: profs } = await supabase.from("profiles")
                        .select("id, display_name, avatar_url, email").in("id", ids);
                    setFollowers((profs || []).map((p: any) => ({ profiles: p })));
                }

                // 팔로잉 (내가 팔로우하는 사람들)
                const { data: followingRows } = await supabase.from("follows")
                    .select("following_id").eq("follower_id", user.id);
                if (followingRows && followingRows.length > 0) {
                    const ids = followingRows.map((r: any) => r.following_id);
                    const { data: profs } = await supabase.from("profiles")
                        .select("id, display_name, avatar_url, email").in("id", ids);
                    setFollowing((profs || []).map((p: any) => ({ profiles: p })));
                }
            } catch (err) {
                console.error("팔로워/팔로잉 로드 실패:", err);
            }
        })();
    }, [user, supabase]);

    const saveProfile = async () => {
        if (!user) return;
        setSaving(true);
        await supabase.from("profiles").update({
            display_name: displayName,
            bio: bio,
        }).eq("id", user.id);
        setMsg("저장되었습니다! ✓");
        setSaving(false);
        setTimeout(() => setMsg(""), 3000);
    };

    const uploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !user) return;
        const ext = file.name.split(".").pop();
        const path = `avatars/${user.id}.${ext}`;
        setSaving(true);

        const { error } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
        if (!error) {
            const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(path);
            await supabase.from("profiles").update({ avatar_url: urlData.publicUrl }).eq("id", user.id);
            setProfile((prev: any) => ({ ...prev, avatar_url: urlData.publicUrl }));
            setMsg("프로필 사진이 변경되었습니다!");
        }
        setSaving(false);
        setTimeout(() => setMsg(""), 3000);
    };

    const tierInfo = getDisplayTier(progress?.tier || "Iron", progress?.level || 1, progress?.placement_done);
    const levelProgress = xpForNextLevel(progress?.xp || 0);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 800, margin: "0 auto" }}>
            {/* 프로필 헤더 카드 */}
            <div style={{
                ...glassCard, borderRadius: 32, padding: 40, position: "relative", overflow: "hidden",
            }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 120, background: tierInfo.gradient, opacity: 0.3 }} />
                <div style={{ position: "relative", zIndex: 10, display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center" }}>
                    {/* 아바타 */}
                    <div style={{ position: "relative" }}>
                        <div style={{
                            width: 100, height: 100, borderRadius: "50%", border: "4px solid #fff",
                            background: profile?.avatar_url ? `url(${profile.avatar_url}) center/cover` : "linear-gradient(135deg, #0ea5e9, #6366f1)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            color: "#fff", fontSize: 36, fontWeight: 900, boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                        }}>
                            {!profile?.avatar_url && (user?.email?.charAt(0) || "U").toUpperCase()}
                        </div>
                        <button onClick={() => fileRef.current?.click()} style={{
                            position: "absolute", bottom: 0, right: 0, width: 32, height: 32, borderRadius: "50%",
                            background: "#0ea5e9", border: "3px solid #fff", color: "#fff", cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center",
                        }}>
                            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>photo_camera</span>
                        </button>
                        <input ref={fileRef} type="file" accept="image/*" onChange={uploadAvatar} style={{ display: "none" }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                        <h2 style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", margin: 0 }}>{displayName || user?.email?.split("@")[0]}</h2>
                        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 6 }}>
                            <span style={{
                                padding: "4px 12px", borderRadius: 8, fontSize: 12, fontWeight: 700,
                                background: tierInfo.gradient, color: "#fff",
                            }}>{tierInfo.icon} {tierInfo.nameKo}</span>
                            <span style={{ fontSize: 13, color: "#64748b" }}>Lv.{progress?.level || 1}</span>
                            {profile?.role === "admin" && (
                                <span style={{ padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, background: "#fef2f2", color: "#dc2626" }}>🔧 관리자</span>
                            )}
                        </div>
                        <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
                            <button onClick={() => setTab("followers")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#64748b" }}>
                                <strong style={{ color: "#0f172a" }}>{followers.length}</strong> 팔로워
                            </button>
                            <button onClick={() => setTab("following")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: "#64748b" }}>
                                <strong style={{ color: "#0f172a" }}>{following.length}</strong> 팔로잉
                            </button>
                        </div>
                    </div>
                </div>

                {/* XP 바 */}
                <div style={{ marginTop: 24, position: "relative", zIndex: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontSize: 12, fontWeight: 700, color: "#475569" }}>경험치</span>
                        <span style={{ fontSize: 12, color: "#94a3b8" }}>{progress?.xp || 0} XP · 다음 레벨까지 {levelProgress.needed - levelProgress.current} XP</span>
                    </div>
                    <div style={{ height: 8, background: "#e2e8f0", borderRadius: 999, overflow: "hidden" }}>
                        <div style={{ width: `${levelProgress.progress}%`, height: "100%", background: tierInfo.gradient, borderRadius: 999, transition: "width 0.5s" }} />
                    </div>
                </div>
            </div>

            {/* 탭 */}
            <div style={{ display: "flex", gap: 8 }}>
                {[
                    { key: "info" as const, label: "📝 프로필 편집" },
                    { key: "followers" as const, label: `👥 팔로워 (${followers.length})` },
                    { key: "following" as const, label: `💫 팔로잉 (${following.length})` },
                ].map((t) => (
                    <button key={t.key} onClick={() => setTab(t.key)} style={{
                        padding: "10px 20px", borderRadius: 12, border: "none", fontSize: 13, fontWeight: 700,
                        background: tab === t.key ? "#0f172a" : "rgba(255,255,255,0.7)",
                        color: tab === t.key ? "#fff" : "#64748b", cursor: "pointer",
                    }}>{t.label}</button>
                ))}
            </div>

            {/* 프로필 편집 */}
            {tab === "info" && (
                <div style={{ ...glassCard, borderRadius: 24, padding: 28 }}>
                    {msg && <div style={{ padding: "12px 20px", borderRadius: 12, background: "#dcfce7", color: "#16a34a", fontSize: 14, fontWeight: 700, marginBottom: 20 }}>{msg}</div>}
                    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 6, display: "block" }}>표시 이름</label>
                            <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} style={{
                                width: "100%", padding: "14px 18px", borderRadius: 14, border: "1px solid #e2e8f0",
                                fontSize: 15, outline: "none", color: "#1e293b", background: "#f8fafc",
                            }} placeholder="이름을 입력하세요" />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 6, display: "block" }}>자기소개</label>
                            <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} style={{
                                width: "100%", padding: "14px 18px", borderRadius: 14, border: "1px solid #e2e8f0",
                                fontSize: 14, outline: "none", color: "#1e293b", resize: "vertical", background: "#f8fafc",
                            }} placeholder="자기소개를 작성해보세요" />
                        </div>
                        <div>
                            <label style={{ fontSize: 13, fontWeight: 700, color: "#475569", marginBottom: 6, display: "block" }}>이메일</label>
                            <input value={user?.email || ""} disabled style={{
                                width: "100%", padding: "14px 18px", borderRadius: 14, border: "1px solid #e2e8f0",
                                fontSize: 15, color: "#94a3b8", background: "#f1f5f9",
                            }} />
                        </div>
                        <button onClick={saveProfile} disabled={saving} style={{
                            padding: "16px 0", borderRadius: 16, border: "none", fontSize: 16, fontWeight: 800,
                            background: "linear-gradient(135deg, #0ea5e9, #6366f1)", color: "#fff",
                            cursor: "pointer", boxShadow: "0 10px 20px rgba(14,165,233,0.2)",
                        }}>{saving ? "저장 중..." : "프로필 저장"}</button>
                    </div>
                </div>
            )}

            {/* 팔로워/팔로잉 목록 */}
            {(tab === "followers" || tab === "following") && (
                <div style={{ ...glassCard, borderRadius: 24, padding: 28 }}>
                    <h3 style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", marginBottom: 16 }}>
                        {tab === "followers" ? "👥 팔로워" : "💫 팔로잉"}
                    </h3>
                    {(tab === "followers" ? followers : following).length === 0 ? (
                        <div style={{ textAlign: "center", padding: 40, color: "#94a3b8" }}>
                            <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>👻</span>
                            아직 {tab === "followers" ? "팔로워가" : "팔로잉이"} 없어요
                        </div>
                    ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {(tab === "followers" ? followers : following).map((f: any, i: number) => {
                                const p = tab === "followers" ? f.profiles : f.profiles;
                                return (
                                    <div key={i} style={{
                                        display: "flex", alignItems: "center", gap: 14, padding: "12px 16px",
                                        borderRadius: 14, background: "#f8fafc",
                                    }}>
                                        <div style={{
                                            width: 40, height: 40, borderRadius: "50%",
                                            background: p?.avatar_url ? `url(${p.avatar_url}) center/cover` : "linear-gradient(135deg, #0ea5e9, #6366f1)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "#fff", fontWeight: 700, fontSize: 14,
                                        }}>
                                            {!p?.avatar_url && (p?.display_name || p?.email || "U").charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 700, color: "#0f172a" }}>{p?.display_name || p?.email?.split("@")[0]}</div>
                                            <div style={{ fontSize: 11, color: "#94a3b8" }}>{p?.email}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
