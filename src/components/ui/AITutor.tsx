"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ═══════════════════════════════════════
   AI 튜터 사이드바 — GPT 기반 코딩 도우미
   
   사용법: <AITutor context="현재 학습 유닛 제목" />
   
   API 키가 없으면 프리셋 답변으로 동작합니다.
   ═══════════════════════════════════════ */

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: number;
}

// Preset answers for offline/demo mode
const PRESET_RESPONSES: Record<string, string> = {
    "변수": "변수(Variable)는 데이터를 저장하는 메모리 공간이에요!\n\n`int age = 10;` 이 코드에서:\n- `int`: 정수형 타입\n- `age`: 변수 이름\n- `10`: 저장할 값\n\n변수는 쉽게 말해 '이름이 붙은 상자'를 생각하면 돼요!",
    "포인터": "포인터(Pointer)는 다른 변수의 메모리 주소를 저장하는 변수예요!\n\n```c\nint a = 10;\nint *p = &a;  // p는 a의 주소를 가리킴\n```\n\n- `&a`: a의 메모리 주소\n- `*p`: p가 가리키는 값 (10)\n\n포인터는 '집 주소를 적은 메모지'와 비슷해요!",
    "배열": "배열(Array)은 같은 타입의 데이터를 연속으로 저장해요!\n\n```c\nint arr[5] = {1, 2, 3, 4, 5};\n```\n\n인덱스는 0부터 시작:\n- `arr[0]` → 1\n- `arr[4]` → 5\n\n배열은 '같은 크기의 서랍이 나란히 있는 서랍장'이라고 생각하세요!",
    "반복문": "반복문은 같은 코드를 여러 번 실행해요!\n\n**for문:**\n```c\nfor (int i = 0; i < 5; i++) {\n    printf(\"%d \", i);\n}\n// 출력: 0 1 2 3 4\n```\n\n**while문:**\n```c\nint i = 0;\nwhile (i < 5) {\n    printf(\"%d \", i);\n    i++;\n}\n```\n\n세탁기 생각해봐요 — 설정된 횟수만큼 돌아가죠!",
    "함수": "함수(Function)는 특정 작업을 수행하는 코드 블록이에요!\n\n```c\nint add(int a, int b) {\n    return a + b;\n}\n\nint result = add(3, 5);  // 8\n```\n\n- `int`: 반환 타입\n- `add`: 함수 이름\n- `(int a, int b)`: 매개변수\n- `return`: 결과 반환\n\n함수는 '자판기'처럼 입력을 넣으면 결과를 돌려줘요!",
    "조건문": "조건문은 조건에 따라 다른 코드를 실행해요!\n\n```c\nint score = 85;\n\nif (score >= 90) {\n    printf(\"A등급\");\n} else if (score >= 80) {\n    printf(\"B등급\");\n} else {\n    printf(\"C등급\");\n}\n// 출력: B등급\n```\n\n신호등과 같아요 — 빨간불이면 멈추고, 초록불이면 가는 거죠!",
    "default": "좋은 질문이에요!\n\n코딩에서 이 개념을 이해하려면:\n\n1. 먼저 기본 원리를 파악하기\n2. 간단한 예제 코드 직접 작성해보기\n3. 조금씩 변형하며 실험하기\n\n궁금한 점이 더 있으면 언제든 물어보세요!\n\n**Tip**: 코드를 직접 타이핑하면서 배우면 2배 빠르게 익힐 수 있어요!",
};

function findResponse(query: string): string {
    const q = query.toLowerCase();
    for (const [key, val] of Object.entries(PRESET_RESPONSES)) {
        if (key !== "default" && q.includes(key)) return val;
    }
    return PRESET_RESPONSES["default"];
}

export default function AITutor({ context }: { context?: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        const userMsg: Message = { role: "user", content: input.trim(), timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        // Simulate AI thinking delay
        await new Promise(r => setTimeout(r, 800 + Math.random() * 1200));

        const response = findResponse(userMsg.content);
        const aiMsg: Message = { role: "assistant", content: response, timestamp: Date.now() };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    };

    return (
        <>
            {/* ── Floating Button ── */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed", bottom: 24, right: 24, zIndex: 9000,
                    width: 56, height: 56, borderRadius: "50%", border: "none",
                    background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                    color: "#fff", fontSize: 24, cursor: "pointer",
                    boxShadow: "0 8px 24px rgba(79,70,229,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                }}
            >
                {isOpen ? "✕" : <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.5" /><circle cx="9" cy="10" r="1.5" fill="currentColor" /><circle cx="15" cy="10" r="1.5" fill="currentColor" /><path d="M8 15c1 1.5 3 2.5 4 2.5s3-1 4-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>}
            </motion.button>

            {/* ── Chat Panel ── */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        style={{
                            position: "fixed", bottom: 90, right: 24, zIndex: 9001,
                            width: 360, maxHeight: 520,
                            borderRadius: 20, overflow: "hidden",
                            boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
                            display: "flex", flexDirection: "column",
                            background: "#fff",
                        }}
                    >
                        {/* Header */}
                        <div style={{
                            padding: "16px 20px", borderBottom: "1px solid #e2e8f0",
                            background: "linear-gradient(135deg, #4F46E5, #6366F1)",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{
                                    width: 36, height: 36, borderRadius: 12,
                                    background: "rgba(255,255,255,0.2)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 18,
                                }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="4" stroke="#fff" strokeWidth="1.5" /><circle cx="9" cy="10" r="1.5" fill="#fff" /><circle cx="15" cy="10" r="1.5" fill="#fff" /><path d="M8 15c1 1.5 3 2.5 4 2.5s3-1 4-2.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" /></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>AI 코딩 튜터</div>
                                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>
                                        {context ? `${context} 학습 중` : "무엇이든 물어보세요!"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div style={{
                            flex: 1, overflowY: "auto", padding: 16,
                            display: "flex", flexDirection: "column", gap: 12,
                            maxHeight: 340,
                        }}>
                            {messages.length === 0 && (
                                <div style={{ textAlign: "center", padding: "20px 0", color: "#94a3b8" }}>
                                    <div style={{ marginBottom: 8, display: "flex", alignItems: "center", justifyContent: "center" }}><svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M18.36 5.64a9 9 0 11-12.73 0" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 2v4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" /><path d="M7 13l2 2 4-4" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                                    <div style={{ fontSize: 13, fontWeight: 600 }}>안녕하세요!</div>
                                    <div style={{ fontSize: 12, marginTop: 4 }}>코딩 관련 질문을 해보세요</div>

                                    <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                                        {["변수가 뭐야?", "포인터 설명해줘", "배열 알려줘"].map(q => (
                                            <button key={q} onClick={() => { setInput(q); }} style={{
                                                padding: "8px 12px", borderRadius: 10, border: "1px solid #e2e8f0",
                                                background: "#f8fafc", fontSize: 12, color: "#4F46E5", fontWeight: 600,
                                                cursor: "pointer",
                                            }}>
                                                {q}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    style={{
                                        alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                                        maxWidth: "85%",
                                    }}
                                >
                                    <div style={{
                                        padding: "10px 14px", borderRadius: 14,
                                        background: msg.role === "user" ? "#4F46E5" : "#f1f5f9",
                                        color: msg.role === "user" ? "#fff" : "#1e1b4b",
                                        fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap",
                                        borderBottomRightRadius: msg.role === "user" ? 4 : 14,
                                        borderBottomLeftRadius: msg.role === "assistant" ? 4 : 14,
                                    }}>
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    style={{ alignSelf: "flex-start" }}
                                >
                                    <div style={{
                                        padding: "10px 14px", borderRadius: 14, borderBottomLeftRadius: 4,
                                        background: "#f1f5f9", display: "flex", gap: 4,
                                    }}>
                                        {[0, 1, 2].map(i => (
                                            <motion.div
                                                key={i}
                                                animate={{ y: [0, -4, 0] }}
                                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                                style={{ width: 6, height: 6, borderRadius: "50%", background: "#94a3b8" }}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div style={{ padding: "12px 16px", borderTop: "1px solid #e2e8f0", display: "flex", gap: 8 }}>
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === "Enter" && sendMessage()}
                                placeholder="질문을 입력하세요..."
                                style={{
                                    flex: 1, padding: "10px 14px", borderRadius: 12,
                                    border: "1px solid #e2e8f0", fontSize: 13, outline: "none",
                                    boxSizing: "border-box",
                                }}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!input.trim()}
                                style={{
                                    padding: "10px 16px", borderRadius: 12, border: "none",
                                    background: input.trim() ? "#4F46E5" : "#e2e8f0",
                                    color: input.trim() ? "#fff" : "#94a3b8",
                                    fontWeight: 700, fontSize: 13, cursor: input.trim() ? "pointer" : "default",
                                }}
                            >
                                전송
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
