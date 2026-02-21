"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { createClient } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn } from "@/components/motion/motion";

const glassCard: React.CSSProperties = {
    background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)",
    border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
};

const CHANNELS = [
    { id: "general", label: "🏠 전체 채팅", desc: "모두의 대화방" },
    { id: "help", label: "❓ 질문방", desc: "코딩 질문 & 답변" },
    { id: "random", label: "🎲 자유방", desc: "자유롭게 대화" },
];

interface ChatMsg {
    id: string;
    user_id: string;
    display_name: string;
    avatar_url: string | null;
    content: string;
    channel: string;
    created_at: string;
}

export default function ChatPage() {
    const { user } = useAuth();
    const supabase = useMemo(() => createClient(), []);
    const [channel, setChannel] = useState("general");
    const [messages, setMessages] = useState<ChatMsg[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    // 메시지 로드
    useEffect(() => {
        setLoading(true);
        supabase.from("chat_messages").select("*").eq("channel", channel).order("created_at", { ascending: true }).limit(100)
            .then(({ data }) => {
                if (data) setMessages(data);
                setLoading(false);
                setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight }), 100);
            });

        // Realtime 구독
        const sub = supabase.channel(`chat-${channel}`)
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "chat_messages", filter: `channel=eq.${channel}` },
                (payload) => {
                    const newMsg = payload.new as ChatMsg;
                    // 중복 방지: 이미 optimistic으로 추가된 메시지는 ID로 교체
                    setMessages((prev) => {
                        const exists = prev.some(m => m.id === newMsg.id);
                        if (exists) return prev;
                        // optimistic 메시지(temp-로 시작)가 있으면 교체
                        const tempIdx = prev.findIndex(m =>
                            m.id.startsWith('temp-') &&
                            m.user_id === newMsg.user_id &&
                            m.content === newMsg.content
                        );
                        if (tempIdx >= 0) {
                            const updated = [...prev];
                            updated[tempIdx] = newMsg;
                            return updated;
                        }
                        return [...prev, newMsg];
                    });
                    setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 100);
                })
            .subscribe();

        return () => { supabase.removeChannel(sub); };
    }, [channel, supabase]);

    const sendMessage = async () => {
        if (!input.trim() || !user) return;
        const displayName = user.name || user.email?.split("@")[0] || "익명";
        const content = input.trim();
        setInput("");

        // Optimistic UI: 즉시 화면에 표시
        const optimisticMsg: ChatMsg = {
            id: `temp-${Date.now()}`,
            user_id: user.id,
            display_name: displayName,
            avatar_url: null,
            content,
            channel,
            created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, optimisticMsg]);
        setTimeout(() => scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" }), 50);

        // DB에 저장 (Realtime이 활성화되어 있으면 subscription이 실제 메시지로 교체)
        const { error } = await supabase.from("chat_messages").insert({
            user_id: user.id,
            display_name: displayName,
            content,
            channel,
        });

        // DB 저장 실패 시 optimistic 메시지 제거
        if (error) {
            setMessages((prev) => prev.filter(m => m.id !== optimisticMsg.id));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16, height: "calc(100vh - 200px)", minHeight: 500 }}>
            {/* 채널 목록 */}
            <div style={{ ...glassCard, borderRadius: 20, padding: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: "#0f172a", marginBottom: 8, padding: "0 8px" }}>💬 채팅방</h3>
                {CHANNELS.map((ch) => (
                    <button key={ch.id} onClick={() => setChannel(ch.id)} style={{
                        display: "flex", flexDirection: "column", gap: 2, padding: "10px 12px", borderRadius: 12,
                        border: "none", cursor: "pointer", textAlign: "left", fontSize: 13, fontWeight: 600,
                        background: channel === ch.id ? "#f0f9ff" : "transparent",
                        color: channel === ch.id ? "#0369a1" : "#64748b",
                    }}>
                        <span>{ch.label}</span>
                        <span style={{ fontSize: 10, opacity: 0.6 }}>{ch.desc}</span>
                    </button>
                ))}
            </div>

            {/* 채팅 영역 */}
            <div style={{ ...glassCard, borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden" }}>
                {/* 헤더 */}
                <div style={{ padding: "16px 20px", borderBottom: "1px solid #f1f5f9", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{CHANNELS.find(c => c.id === channel)?.label}</span>
                    <span style={{ fontSize: 12, color: "#94a3b8" }}>{messages.length}개 메시지</span>
                </div>

                {/* 메시지 영역 */}
                <div ref={scrollRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
                    {loading && <div style={{ textAlign: "center", color: "#94a3b8", padding: 40 }}>로딩 중...</div>}
                    {!loading && messages.length === 0 && (
                        <div style={{ textAlign: "center", color: "#94a3b8", padding: 60 }}>
                            <span style={{ fontSize: 40, display: "block", marginBottom: 12 }}>💬</span>
                            아직 메시지가 없어요. 첫 메시지를 보내보세요!
                        </div>
                    )}
                    {messages.map((msg) => {
                        const isMe = msg.user_id === user?.id;
                        return (
                            <div key={msg.id} style={{ display: "flex", gap: 10, flexDirection: isMe ? "row-reverse" : "row" }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: "50%", flexShrink: 0,
                                    background: isMe ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "linear-gradient(135deg, #f97316, #ef4444)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "#fff", fontWeight: 700, fontSize: 13,
                                }}>
                                    {msg.display_name?.charAt(0)?.toUpperCase() || "?"}
                                </div>
                                <div style={{ maxWidth: "70%" }}>
                                    <div style={{ fontSize: 11, color: "#94a3b8", marginBottom: 4, textAlign: isMe ? "right" : "left" }}>
                                        {msg.display_name} · {new Date(msg.created_at).toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" })}
                                    </div>
                                    <div style={{
                                        padding: "10px 16px", borderRadius: 16, fontSize: 14, lineHeight: 1.5,
                                        background: isMe ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "#f1f5f9",
                                        color: isMe ? "#fff" : "#1e293b",
                                        borderBottomRightRadius: isMe ? 4 : 16,
                                        borderBottomLeftRadius: isMe ? 16 : 4,
                                    }}>
                                        {msg.content}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 입력 영역 */}
                <div style={{ padding: "12px 20px", borderTop: "1px solid #f1f5f9", display: "flex", gap: 10 }}>
                    <input
                        value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                        placeholder="메시지를 입력하세요..."
                        style={{
                            flex: 1, padding: "12px 18px", borderRadius: 14, border: "1px solid #e2e8f0",
                            background: "#f8fafc", fontSize: 14, outline: "none", color: "#1e293b",
                        }}
                    />
                    <button onClick={sendMessage} disabled={!input.trim()} style={{
                        padding: "12px 20px", borderRadius: 14, border: "none", fontSize: 14, fontWeight: 700,
                        background: input.trim() ? "linear-gradient(135deg, #0ea5e9, #6366f1)" : "#e2e8f0",
                        color: input.trim() ? "#fff" : "#94a3b8", cursor: input.trim() ? "pointer" : "not-allowed",
                    }}>
                        <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
