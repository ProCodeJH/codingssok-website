"use client";

/* ═══════════════════════════════════════════════════
   코드 통계 분석 — C-Studio CodeStats.tsx 포팅
   실시간 코드 메트릭 분석 (줄수, 복잡도, 함수 수 등)
   ═══════════════════════════════════════════════════ */

interface CodeStatsProps { code: string; onClose: () => void; }

interface Stats {
    totalLines: number; codeLines: number; commentLines: number; blankLines: number;
    functions: number; variables: number; includes: number;
    complexity: number; complexityLabel: string; complexityColor: string;
    longestLine: number; avgLineLength: number;
    ifCount: number; loopCount: number; switchCount: number;
}

function analyzeCode(code: string): Stats {
    const lines = code.split("\n");
    const totalLines = lines.length;
    let codeLines = 0, commentLines = 0, blankLines = 0;
    let inBlockComment = false;

    for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) { blankLines++; continue; }
        if (inBlockComment) {
            commentLines++;
            if (trimmed.includes("*/")) inBlockComment = false;
            continue;
        }
        if (trimmed.startsWith("/*")) { commentLines++; inBlockComment = !trimmed.includes("*/"); continue; }
        if (trimmed.startsWith("//")) { commentLines++; continue; }
        codeLines++;
    }

    const codeStr = code;
    const functions = (codeStr.match(/\b(int|void|char|float|double|long)\s+\w+\s*\(/g) || []).length;
    const variables = (codeStr.match(/\b(int|char|float|double|long|short|unsigned)\s+\w+/g) || []).length;
    const includes = (codeStr.match(/#include/g) || []).length;
    const ifCount = (codeStr.match(/\bif\s*\(/g) || []).length;
    const loopCount = (codeStr.match(/\b(for|while|do)\s*[\({]/g) || []).length;
    const switchCount = (codeStr.match(/\bswitch\s*\(/g) || []).length;

    const complexity = ifCount + loopCount * 2 + switchCount + (functions > 3 ? 2 : 0);
    const complexityLabel = complexity <= 3 ? "쉬움" : complexity <= 8 ? "보통" : "복잡";
    const complexityColor = complexity <= 3 ? "#22c55e" : complexity <= 8 ? "#f59e0b" : "#ef4444";

    const lineLengths = lines.map(l => l.length);
    const longestLine = Math.max(...lineLengths, 0);
    const avgLineLength = totalLines > 0 ? Math.round(lineLengths.reduce((a, b) => a + b, 0) / totalLines) : 0;

    return { totalLines, codeLines, commentLines, blankLines, functions, variables, includes, complexity, complexityLabel, complexityColor, longestLine, avgLineLength, ifCount, loopCount, switchCount };
}

export default function CodeStats({ code, onClose }: CodeStatsProps) {
    const stats = analyzeCode(code);
    const codePercent = stats.totalLines > 0 ? Math.round((stats.codeLines / stats.totalLines) * 100) : 0;
    const commentPercent = stats.totalLines > 0 ? Math.round((stats.commentLines / stats.totalLines) * 100) : 0;

    const StatRow = ({ label, value, color }: { label: string; value: string | number; color?: string }) => (
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0", borderBottom: "1px solid #2d2a26" }}>
            <span style={{ fontSize: 12, color: "#b0a898" }}>{label}</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: color || "#f5f0e8", fontFamily: "monospace" }}>{value}</span>
        </div>
    );

    const BarStat = ({ label, value, max, color }: { label: string; value: number; max: number; color: string }) => (
        <div style={{ marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 4 }}>
                <span style={{ color: "#b0a898" }}>{label}</span>
                <span style={{ fontWeight: 700, color }}>{value}</span>
            </div>
            <div style={{ height: 6, background: "#2d2a26", borderRadius: 99, overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${max > 0 ? (value / max) * 100 : 0}%`, background: color, borderRadius: 99, transition: "width 0.5s" }} />
            </div>
        </div>
    );

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#1e1c1a", color: "#f5f0e8" }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid #3a3632", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, fontWeight: 800 }}>📊 코드 통계</span>
                <button onClick={onClose} style={{ background: "none", border: "none", color: "#b0a898", fontSize: 16, cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "12px 16px" }}>
                {/* Complexity Badge */}
                <div style={{ textAlign: "center", padding: 16, background: "#252320", borderRadius: 12, border: "1px solid #3a3632", marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: "#b0a898", marginBottom: 6 }}>복잡도</div>
                    <div style={{ fontSize: 36, fontWeight: 900, color: stats.complexityColor, fontFamily: "monospace" }}>{stats.complexity}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: stats.complexityColor, marginTop: 4, padding: "3px 12px", borderRadius: 20, background: `${stats.complexityColor}15`, display: "inline-block" }}>
                        {stats.complexityLabel}
                    </div>
                </div>

                {/* Lines Breakdown */}
                <div style={{ background: "#252320", borderRadius: 10, padding: 14, border: "1px solid #3a3632", marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>📝 줄 수 분석</div>
                    <StatRow label="전체 줄 수" value={stats.totalLines} color="#818cf8" />
                    <StatRow label="코드 줄" value={`${stats.codeLines} (${codePercent}%)`} color="#22c55e" />
                    <StatRow label="주석 줄" value={`${stats.commentLines} (${commentPercent}%)`} color="#fbbf24" />
                    <StatRow label="빈 줄" value={stats.blankLines} color="#b0a898" />
                </div>

                {/* Structure Breakdown */}
                <div style={{ background: "#252320", borderRadius: 10, padding: 14, border: "1px solid #3a3632", marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>🏗️ 구조 분석</div>
                    <BarStat label="함수" value={stats.functions} max={10} color="#818cf8" />
                    <BarStat label="변수 선언" value={stats.variables} max={20} color="#22c55e" />
                    <BarStat label="#include" value={stats.includes} max={10} color="#06b6d4" />
                </div>

                {/* Control Flow */}
                <div style={{ background: "#252320", borderRadius: 10, padding: 14, border: "1px solid #3a3632", marginBottom: 12 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>🔄 제어 흐름</div>
                    <StatRow label="if 조건문" value={stats.ifCount} color="#f59e0b" />
                    <StatRow label="반복문 (for/while)" value={stats.loopCount} color="#06b6d4" />
                    <StatRow label="switch 문" value={stats.switchCount} color="#a855f7" />
                </div>

                {/* Line Metrics */}
                <div style={{ background: "#252320", borderRadius: 10, padding: 14, border: "1px solid #3a3632" }}>
                    <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10 }}>📏 길이 분석</div>
                    <StatRow label="가장 긴 줄" value={`${stats.longestLine}자`} />
                    <StatRow label="평균 줄 길이" value={`${stats.avgLineLength}자`} />
                </div>
            </div>
        </div>
    );
}
