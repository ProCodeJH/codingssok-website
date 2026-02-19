"use client";
import { useMemo } from "react";

interface MemoryBlock {
    id: string; address: string; size: number; allocated: boolean; label: string; type: "stack" | "heap";
}

function parseMemoryOps(code: string): MemoryBlock[] {
    const blocks: MemoryBlock[] = [];
    let addr = 0x7fff0000;
    let heapAddr = 0x00600000;
    const lines = code.split("\n");

    for (const line of lines) {
        const trimmed = line.trim();
        // int variables
        const intMatch = trimmed.match(/int\s+(\w+)/);
        if (intMatch && !trimmed.includes("(")) {
            blocks.push({ id: `s${blocks.length}`, address: `0x${addr.toString(16)}`, size: 4, allocated: true, label: `int ${intMatch[1]}`, type: "stack" });
            addr -= 4;
        }
        // char arrays
        const charMatch = trimmed.match(/char\s+(\w+)\[(\d+)\]/);
        if (charMatch) {
            blocks.push({ id: `s${blocks.length}`, address: `0x${addr.toString(16)}`, size: parseInt(charMatch[2]), allocated: true, label: `char ${charMatch[1]}[${charMatch[2]}]`, type: "stack" });
            addr -= parseInt(charMatch[2]);
        }
        // float/double
        const floatMatch = trimmed.match(/(float|double)\s+(\w+)/);
        if (floatMatch && !trimmed.includes("(")) {
            const sz = floatMatch[1] === "float" ? 4 : 8;
            blocks.push({ id: `s${blocks.length}`, address: `0x${addr.toString(16)}`, size: sz, allocated: true, label: `${floatMatch[1]} ${floatMatch[2]}`, type: "stack" });
            addr -= sz;
        }
        // int arrays
        const arrMatch = trimmed.match(/int\s+(\w+)\[(\d+)\]/);
        if (arrMatch) {
            blocks.push({ id: `s${blocks.length}`, address: `0x${addr.toString(16)}`, size: parseInt(arrMatch[2]) * 4, allocated: true, label: `int ${arrMatch[1]}[${arrMatch[2]}]`, type: "stack" });
            addr -= parseInt(arrMatch[2]) * 4;
        }
        // malloc
        const mallocMatch = trimmed.match(/(\w+)\s*=.*malloc\((\d+)/);
        if (mallocMatch) {
            blocks.push({ id: `h${blocks.length}`, address: `0x${heapAddr.toString(16)}`, size: parseInt(mallocMatch[2]), allocated: true, label: `*${mallocMatch[1]} (malloc)`, type: "heap" });
            heapAddr += parseInt(mallocMatch[2]) + 16;
        }
        // free
        const freeMatch = trimmed.match(/free\((\w+)\)/);
        if (freeMatch) {
            const target = blocks.find(b => b.label.includes(`*${freeMatch[1]}`) && b.allocated);
            if (target) target.allocated = false;
        }
    }
    return blocks;
}

export function MemoryVisualizer({ code = "" }: { code?: string }) {
    const blocks = useMemo(() => parseMemoryOps(code), [code]);
    const stackBlocks = blocks.filter(b => b.type === "stack");
    const heapBlocks = blocks.filter(b => b.type === "heap");
    const border = "rgba(255,255,255,0.06)";

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${border}`, background: "rgba(6,182,212,0.06)" }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>🧠 메모리 시각화</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>{blocks.length}개 블록 감지</span>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
                {blocks.length === 0 ? (
                    <div style={{ textAlign: "center", padding: 32, color: "rgba(255,255,255,0.25)", fontSize: 12 }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>🧠</div>
                        코드에서 변수를 선언하면<br />메모리 레이아웃이 표시됩니다
                    </div>
                ) : (
                    <div style={{ display: "flex", gap: 12 }}>
                        {/* Stack */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, fontWeight: 600, color: "#06b6d4", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, textAlign: "center" }}>📥 Stack</div>
                            <div style={{ border: "1px solid rgba(6,182,212,0.2)", borderRadius: 8, overflow: "hidden" }}>
                                {stackBlocks.length === 0 ? (
                                    <div style={{ padding: 16, textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>비어 있음</div>
                                ) : stackBlocks.map(b => (
                                    <div key={b.id} style={{
                                        padding: "8px 10px", borderBottom: "1px solid rgba(6,182,212,0.1)",
                                        background: "rgba(6,182,212,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center"
                                    }}>
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 600, color: "#67e8f9" }}>{b.label}</div>
                                            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>{b.address}</div>
                                        </div>
                                        <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: "rgba(6,182,212,0.15)", color: "#06b6d4", fontWeight: 600 }}>{b.size}B</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Heap */}
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, fontWeight: 600, color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 8, textAlign: "center" }}>🌐 Heap</div>
                            <div style={{ border: "1px solid rgba(245,158,11,0.2)", borderRadius: 8, overflow: "hidden" }}>
                                {heapBlocks.length === 0 ? (
                                    <div style={{ padding: 16, textAlign: "center", fontSize: 10, color: "rgba(255,255,255,0.2)" }}>비어 있음</div>
                                ) : heapBlocks.map(b => (
                                    <div key={b.id} style={{
                                        padding: "8px 10px", borderBottom: "1px solid rgba(245,158,11,0.1)",
                                        background: b.allocated ? "rgba(245,158,11,0.05)" : "rgba(239,68,68,0.05)",
                                        opacity: b.allocated ? 1 : 0.5, textDecoration: b.allocated ? "none" : "line-through",
                                        display: "flex", justifyContent: "space-between", alignItems: "center"
                                    }}>
                                        <div>
                                            <div style={{ fontSize: 11, fontWeight: 600, color: b.allocated ? "#fbbf24" : "#ef4444" }}>{b.label}</div>
                                            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "monospace" }}>{b.address}</div>
                                        </div>
                                        <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: b.allocated ? "rgba(245,158,11,0.15)" : "rgba(239,68,68,0.15)", color: b.allocated ? "#f59e0b" : "#ef4444", fontWeight: 600 }}>{b.allocated ? `${b.size}B` : "freed"}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Memory layout legend */}
                <div style={{ marginTop: 16, padding: 10, background: "rgba(0,0,0,0.15)", borderRadius: 8, fontSize: 10, color: "rgba(255,255,255,0.3)", lineHeight: 1.8 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4, color: "rgba(255,255,255,0.5)" }}>📌 메모리 구조</div>
                    <div>높은 주소 → Stack (지역 변수, 매개변수)</div>
                    <div>낮은 주소 → Heap (malloc/calloc 동적 할당)</div>
                    <div style={{ marginTop: 4, color: "#ef4444" }}>⚠️ free() 후 메모리는 해제 표시됩니다</div>
                </div>
            </div>
        </div>
    );
}
