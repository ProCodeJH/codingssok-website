"use client";

import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { createClient } from "@/lib/supabase";

interface DM {
    id: string;
    sender_id: string;
    receiver_id: string;
    sender_name: string;
    content: string;
    is_read: boolean;
    created_at: string;
}

export default function DMPage() {
    const { user } = useAuth();
    const supabase = useMemo(() => createClient(), []);
    const [messages, setMessages] = useState<DM[]>([]);
    const [newMsg, setNewMsg] = useState("");
    const [sending, setSending] = useState(false);
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    const fetchMessages = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            // Get all messages where I'm sender or receiver
            const { data } = await supabase
                .from("direct_messages")
                .select("*")
                .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
                .order("created_at", { ascending: true })
                .limit(100);
            setMessages(data || []);

            // Mark unread messages as read
            if (data && data.length > 0) {
                const unread = data.filter(m => m.receiver_id === user.id && !m.is_read);
                if (unread.length > 0) {
                    await supabase
                        .from("direct_messages")
                        .update({ is_read: true })
                        .in("id", unread.map(m => m.id));
                }
            }
        } catch (err) {
            if (process.env.NODE_ENV === 'development') console.error(err);
        } finally {
            setLoading(false);
        }
    }, [user, supabase]);

    useEffect(() => { fetchMessages(); }, [fetchMessages]);

    // Realtime subscription
    useEffect(() => {
        if (!user) return;
        const ch = supabase.channel("dm-" + user.id)
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "direct_messages" }, (payload) => {
                const msg = payload.new as DM;
                if (msg.sender_id === user.id || msg.receiver_id === user.id) {
                    setMessages(prev => [...prev, msg]);
                    // Auto mark as read if I'm the receiver
                    if (msg.receiver_id === user.id) {
                        supabase.from("direct_messages").update({ is_read: true }).eq("id", msg.id);
                    }
                }
            })
            .subscribe();
        return () => { supabase.removeChannel(ch); };
    }, [user, supabase]);

    // Auto scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const sendMessage = async () => {
        if (!user || !newMsg.trim()) return;
        setSending(true);
        try {
            // Find teacher profile to get their ID
            const { data: teacherProfiles } = await supabase
                .from("profiles")
                .select("id")
                .eq("role", "teacher")
                .limit(1);

            const teacherId = teacherProfiles?.[0]?.id || "00000000-0000-0000-0000-000000000000";

            await supabase.from("direct_messages").insert({
                sender_id: user.id,
                receiver_id: teacherId,
                sender_name: user.name || "학생",
                content: newMsg.trim(),
            });
            setNewMsg("");
        } catch (err) {
            if (process.env.NODE_ENV === 'development') console.error(err);
        } finally {
            setSending(false);
        }
    };

    const formatTime = (ts: string) => {
        const d = new Date(ts);
        return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    };

    const formatDate = (ts: string) => {
        const d = new Date(ts);
        return `${d.getFullYear()}.${(d.getMonth()+1).toString().padStart(2,'0')}.${d.getDate().toString().padStart(2,'0')}`;
    };

    // Group messages by date
    const groupedMessages: { date: string; msgs: DM[] }[] = [];
    let lastDate = "";
    messages.forEach(m => {
        const d = formatDate(m.created_at);
        if (d !== lastDate) {
            groupedMessages.push({ date: d, msgs: [] });
            lastDate = d;
        }
        groupedMessages[groupedMessages.length - 1].msgs.push(m);
    });

    return (
        <div style={{ maxWidth: 700, margin: "0 auto", height: "calc(100vh - 160px)", display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{
                padding: "16px 20px", background: "#fff", borderRadius: "16px 16px 0 0",
                border: "1px solid #e2e8f0", borderBottom: "none",
                display: "flex", alignItems: "center", gap: 12,
            }}>
                <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 18, fontWeight: 800,
                }}>T</div>
                <div>
                    <h2 style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", margin: 0 }}>선생님과 1:1 채팅</h2>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>궁금한 점이 있으면 편하게 물어보세요</p>
                </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{
                flex: 1, overflowY: "auto", background: "#f1f5f9",
                padding: "16px 20px", borderLeft: "1px solid #e2e8f0", borderRight: "1px solid #e2e8f0",
            }}>
                {loading ? (
                    <div style={{ textAlign: "center", padding: 40 }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 32, color: "#94a3b8", animation: "spin 1s linear infinite" }}>progress_activity</span>
                    </div>
                ) : messages.length === 0 ? (
                    <div style={{ textAlign: "center", padding: 60, color: "#94a3b8" }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 48, display: "block", marginBottom: 12, color: "#cbd5e1" }}>chat</span>
                        <p style={{ fontSize: 14, fontWeight: 600 }}>아직 대화가 없습니다</p>
                        <p style={{ fontSize: 12, marginTop: 4 }}>선생님에게 메시지를 보내보세요!</p>
                    </div>
                ) : (
                    groupedMessages.map((group, gi) => (
                        <div key={gi}>
                            <div style={{ textAlign: "center", margin: "16px 0 12px" }}>
                                <span style={{
                                    fontSize: 11, color: "#94a3b8", background: "#e2e8f0",
                                    padding: "4px 14px", borderRadius: 20, fontWeight: 600,
                                }}>{group.date}</span>
                            </div>
                            {group.msgs.map(m => {
                                const isMine = m.sender_id === user?.id;
                                return (
                                    <div key={m.id} style={{
                                        display: "flex", justifyContent: isMine ? "flex-end" : "flex-start",
                                        marginBottom: 8,
                                    }}>
                                        {!isMine && (
                                            <div style={{
                                                width: 32, height: 32, borderRadius: 10,
                                                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "#fff", fontSize: 12, fontWeight: 800,
                                                marginRight: 8, flexShrink: 0, marginTop: 2,
                                            }}>T</div>
                                        )}
                                        <div style={{ maxWidth: "70%" }}>
                                            {!isMine && (
                                                <span style={{ fontSize: 11, color: "#64748b", fontWeight: 600, marginBottom: 4, display: "block" }}>
                                                    {m.sender_name || "선생님"}
                                                </span>
                                            )}
                                            <div style={{
                                                padding: "10px 14px",
                                                borderRadius: isMine ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                                                background: isMine ? "#2563eb" : "#fff",
                                                color: isMine ? "#fff" : "#0f172a",
                                                fontSize: 13, lineHeight: 1.6,
                                                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                                                whiteSpace: "pre-wrap", wordBreak: "break-word",
                                            }}>
                                                {m.content}
                                            </div>
                                            <span style={{
                                                fontSize: 10, color: "#94a3b8", marginTop: 4,
                                                display: "block", textAlign: isMine ? "right" : "left",
                                            }}>{formatTime(m.created_at)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            <div style={{
                padding: "12px 16px", background: "#fff",
                borderRadius: "0 0 16px 16px", border: "1px solid #e2e8f0", borderTop: "none",
                display: "flex", gap: 8, alignItems: "flex-end",
            }}>
                <textarea
                    value={newMsg}
                    onChange={e => setNewMsg(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                    placeholder="메시지를 입력하세요..."
                    rows={1}
                    style={{
                        flex: 1, padding: "10px 14px", borderRadius: 12,
                        border: "2px solid #e2e8f0", fontSize: 14, outline: "none",
                        resize: "none", fontFamily: "inherit", lineHeight: 1.5,
                        maxHeight: 120, overflow: "auto",
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = "#3b82f6"}
                    onBlur={e => e.currentTarget.style.borderColor = "#e2e8f0"}
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={sendMessage}
                    disabled={sending || !newMsg.trim()}
                    style={{
                        padding: "10px 16px", borderRadius: 12, border: "none",
                        background: newMsg.trim() ? "#2563eb" : "#e2e8f0",
                        color: newMsg.trim() ? "#fff" : "#94a3b8",
                        cursor: newMsg.trim() ? "pointer" : "default",
                        display: "flex", alignItems: "center", gap: 4,
                        fontWeight: 700, fontSize: 13, flexShrink: 0,
                    }}
                >
                    <span className="material-symbols-outlined" style={{ fontSize: 18 }}>send</span>
                </motion.button>
            </div>
        </div>
    );
}
