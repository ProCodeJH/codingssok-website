"use client";
import { useState, useEffect, useCallback, useRef } from "react";

interface ArrayBar { value: number; state: "default" | "comparing" | "swapping" | "sorted" | "pivot" | "merging" }
type Algorithm = "bubble" | "selection" | "insertion" | "quick" | "merge" | "binary-search";

const ALGORITHMS: { id: Algorithm; name: string; icon: string; desc: string; complexity: string }[] = [
    { id: "bubble", name: "Bubble Sort", icon: "🫧", desc: "인접 요소 비교 교환", complexity: "O(n²)" },
    { id: "selection", name: "Selection Sort", icon: "🎯", desc: "최솟값 선택 후 교환", complexity: "O(n²)" },
    { id: "insertion", name: "Insertion Sort", icon: "📥", desc: "삽입 위치에 배치", complexity: "O(n²)" },
    { id: "quick", name: "Quick Sort", icon: "⚡", desc: "피봇 기준 분할", complexity: "O(n log n)" },
    { id: "merge", name: "Merge Sort", icon: "🔀", desc: "분할 후 병합", complexity: "O(n log n)" },
    { id: "binary-search", name: "Binary Search", icon: "🔍", desc: "정렬 배열 이분 탐색", complexity: "O(log n)" },
];

export function AlgorithmVisualizer() {
    const [algo, setAlgo] = useState<Algorithm>("bubble");
    const [bars, setBars] = useState<ArrayBar[]>([]);
    const [running, setRunning] = useState(false);
    const [speed, setSpeed] = useState(50);
    const [size, setSize] = useState(20);
    const [steps, setSteps] = useState(0);
    const stopRef = useRef(false);
    const barsRef = useRef<ArrayBar[]>([]);

    const generateArray = useCallback(() => {
        const arr: ArrayBar[] = Array.from({ length: size }, () => ({
            value: Math.floor(Math.random() * 90) + 10, state: "default"
        }));
        setBars(arr); barsRef.current = arr; setSteps(0);
    }, [size]);

    useEffect(() => { generateArray(); }, [generateArray]);

    const sleep = (ms: number) => new Promise<void>(res => {
        const t = setTimeout(res, ms);
        const check = () => { if (stopRef.current) { clearTimeout(t); res(); } };
        const interval = setInterval(() => { check(); }, 10);
        setTimeout(() => clearInterval(interval), ms + 50);
    });

    const updateBars = (newBars: ArrayBar[]) => { barsRef.current = [...newBars]; setBars([...newBars]); };

    const bubbleSort = async () => {
        const a = [...barsRef.current]; let s = 0;
        for (let i = 0; i < a.length - 1 && !stopRef.current; i++) {
            for (let j = 0; j < a.length - i - 1 && !stopRef.current; j++) {
                a[j].state = "comparing"; a[j + 1].state = "comparing"; updateBars(a); await sleep(speed);
                if (a[j].value > a[j + 1].value) {
                    a[j].state = "swapping"; a[j + 1].state = "swapping"; updateBars(a); await sleep(speed);
                    [a[j], a[j + 1]] = [a[j + 1], a[j]];
                }
                a[j].state = "default"; a[j + 1].state = "default"; s++; setSteps(s);
            }
            a[a.length - 1 - i].state = "sorted"; updateBars(a);
        }
        if (!stopRef.current) { a.forEach(b => b.state = "sorted"); updateBars(a); }
    };

    const selectionSort = async () => {
        const a = [...barsRef.current]; let s = 0;
        for (let i = 0; i < a.length - 1 && !stopRef.current; i++) {
            let minIdx = i; a[i].state = "comparing"; updateBars(a);
            for (let j = i + 1; j < a.length && !stopRef.current; j++) {
                a[j].state = "comparing"; updateBars(a); await sleep(speed);
                if (a[j].value < a[minIdx].value) { if (minIdx !== i) a[minIdx].state = "default"; minIdx = j; a[minIdx].state = "pivot"; } else { a[j].state = "default"; }
                s++; setSteps(s);
            }
            if (minIdx !== i) { a[i].state = "swapping"; a[minIdx].state = "swapping"; updateBars(a); await sleep(speed);[a[i], a[minIdx]] = [a[minIdx], a[i]]; }
            a[i].state = "sorted"; if (minIdx !== i) a[minIdx].state = "default"; updateBars(a);
        }
        if (!stopRef.current) { a.forEach(b => b.state = "sorted"); updateBars(a); }
    };

    const insertionSort = async () => {
        const a = [...barsRef.current]; let s = 0;
        a[0].state = "sorted"; updateBars(a);
        for (let i = 1; i < a.length && !stopRef.current; i++) {
            const key = { ...a[i] }; a[i].state = "comparing"; updateBars(a); await sleep(speed);
            let j = i - 1;
            while (j >= 0 && a[j].value > key.value && !stopRef.current) {
                a[j + 1] = { ...a[j], state: "swapping" }; updateBars(a); await sleep(speed);
                j--; s++; setSteps(s);
            }
            a[j + 1] = { ...key, state: "sorted" };
            for (let k = 0; k <= i; k++) a[k].state = "sorted";
            updateBars(a);
        }
        if (!stopRef.current) { a.forEach(b => b.state = "sorted"); updateBars(a); }
    };

    const quickSort = async () => {
        const a = [...barsRef.current]; let s = 0;
        const qs = async (lo: number, hi: number) => {
            if (lo >= hi || stopRef.current) { if (lo === hi) { a[lo].state = "sorted"; updateBars(a); } return; }
            const pivot = a[hi]; a[hi].state = "pivot"; updateBars(a);
            let i = lo;
            for (let j = lo; j < hi && !stopRef.current; j++) {
                a[j].state = "comparing"; updateBars(a); await sleep(speed);
                if (a[j].value < pivot.value) {
                    a[j].state = "swapping"; a[i].state = "swapping"; updateBars(a); await sleep(speed);
                    [a[i], a[j]] = [a[j], a[i]]; i++;
                }
                if (a[j].state !== "sorted") a[j].state = "default"; s++; setSteps(s);
            }
            [a[i], a[hi]] = [a[hi], a[i]]; a[i].state = "sorted"; updateBars(a); await sleep(speed);
            await qs(lo, i - 1); await qs(i + 1, hi);
        };
        await qs(0, a.length - 1);
        if (!stopRef.current) { a.forEach(b => b.state = "sorted"); updateBars(a); }
    };

    const mergeSort = async () => {
        const a = [...barsRef.current]; let s = 0;
        const ms = async (lo: number, hi: number) => {
            if (lo >= hi || stopRef.current) return;
            const mid = Math.floor((lo + hi) / 2);
            await ms(lo, mid); await ms(mid + 1, hi);
            const left = a.slice(lo, mid + 1).map(b => ({ ...b }));
            const right = a.slice(mid + 1, hi + 1).map(b => ({ ...b }));
            let i = 0, j = 0, k = lo;
            while (i < left.length && j < right.length && !stopRef.current) {
                a[k].state = "merging"; updateBars(a); await sleep(speed);
                if (left[i].value <= right[j].value) { a[k] = { ...left[i], state: "merging" }; i++; }
                else { a[k] = { ...right[j], state: "merging" }; j++; }
                k++; s++; setSteps(s);
            }
            while (i < left.length) { a[k] = { ...left[i], state: "merging" }; i++; k++; updateBars(a); await sleep(speed / 2); }
            while (j < right.length) { a[k] = { ...right[j], state: "merging" }; j++; k++; updateBars(a); await sleep(speed / 2); }
            for (let x = lo; x <= hi; x++) a[x].state = "default";
            updateBars(a);
        };
        await ms(0, a.length - 1);
        if (!stopRef.current) { a.forEach(b => b.state = "sorted"); updateBars(a); }
    };

    const binarySearch = async () => {
        const a: ArrayBar[] = [...barsRef.current].sort((x, y) => x.value - y.value).map(b => ({ ...b, state: "default" as const }));
        updateBars(a); await sleep(300);
        const target = a[Math.floor(Math.random() * a.length)].value;
        let lo = 0, hi = a.length - 1, s = 0;
        while (lo <= hi && !stopRef.current) {
            const mid = Math.floor((lo + hi) / 2);
            a[mid].state = "comparing"; updateBars(a); await sleep(speed * 3);
            if (a[mid].value === target) { a[mid].state = "sorted"; updateBars(a); break; }
            else if (a[mid].value < target) { a[mid].state = "swapping"; lo = mid + 1; }
            else { a[mid].state = "swapping"; hi = mid - 1; }
            updateBars(a); s++; setSteps(s);
        }
    };

    const start = async () => {
        stopRef.current = false; setRunning(true); setSteps(0);
        generateArray(); await sleep(100);
        switch (algo) {
            case "bubble": await bubbleSort(); break;
            case "selection": await selectionSort(); break;
            case "insertion": await insertionSort(); break;
            case "quick": await quickSort(); break;
            case "merge": await mergeSort(); break;
            case "binary-search": await binarySearch(); break;
        }
        setRunning(false);
    };

    const stop = () => { stopRef.current = true; setRunning(false); };

    const getBarColor = (s: string) => {
        switch (s) {
            case "comparing": return "#3b82f6";
            case "swapping": return "#f59e0b";
            case "sorted": return "#22c55e";
            case "pivot": return "#ec4899";
            case "merging": return "#8b5cf6";
            default: return "#EC5212";
        }
    };

    const border = "rgba(255,255,255,0.06)";
    const maxVal = Math.max(...bars.map(b => b.value), 1);

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${border}`, background: "rgba(139,92,246,0.06)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>📊 알고리즘 시각화</span>
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)" }}>Steps: {steps}</span>
                </div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    {ALGORITHMS.map(a => (
                        <button key={a.id} onClick={() => !running && setAlgo(a.id)} style={{
                            padding: "3px 8px", borderRadius: 6, border: `1px solid ${algo === a.id ? "#8b5cf6" : border}`,
                            background: algo === a.id ? "rgba(139,92,246,0.2)" : "transparent",
                            color: algo === a.id ? "#c4b5fd" : "rgba(255,255,255,0.4)", fontSize: 10, cursor: running ? "default" : "pointer", fontWeight: 600,
                        }}>{a.icon} {a.name}</button>
                    ))}
                </div>
            </div>

            {/* Controls */}
            <div style={{ padding: "8px 16px", borderBottom: `1px solid ${border}`, display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                <button onClick={running ? stop : start} style={{
                    padding: "6px 16px", borderRadius: 6, border: "none",
                    background: running ? "#ef4444" : "#8b5cf6", color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer"
                }}>{running ? "⏹ 정지" : "▶ 시작"}</button>
                <button onClick={generateArray} disabled={running} style={{
                    padding: "6px 12px", borderRadius: 6, border: `1px solid ${border}`, background: "transparent",
                    color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: running ? "default" : "pointer"
                }}>🔄 새 배열</button>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
                    속도: <input type="range" min={5} max={200} value={200 - speed} onChange={e => setSpeed(200 - Number(e.target.value))} style={{ width: 60, accentColor: "#8b5cf6" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
                    크기: <input type="range" min={5} max={50} value={size} onChange={e => { if (!running) setSize(Number(e.target.value)); }} style={{ width: 60, accentColor: "#8b5cf6" }} />
                </div>
            </div>

            {/* Algorithm info */}
            <div style={{ padding: "6px 16px", borderBottom: `1px solid ${border}`, display: "flex", gap: 12, fontSize: 10, color: "rgba(255,255,255,0.3)" }}>
                <span>{ALGORITHMS.find(a => a.id === algo)?.desc}</span>
                <span style={{ color: "#8b5cf6", fontWeight: 600 }}>{ALGORITHMS.find(a => a.id === algo)?.complexity}</span>
            </div>

            {/* Bars */}
            <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 1, padding: "16px 12px 12px", overflow: "hidden" }}>
                {bars.map((b, i) => (
                    <div key={i} style={{
                        flex: 1, height: `${(b.value / maxVal) * 100}%`,
                        background: getBarColor(b.state), borderRadius: "3px 3px 0 0",
                        transition: "height 0.1s, background 0.15s", minWidth: 2,
                        boxShadow: b.state !== "default" ? `0 0 8px ${getBarColor(b.state)}40` : "none",
                    }} />
                ))}
            </div>

            {/* Legend */}
            <div style={{ padding: "6px 12px", borderTop: `1px solid ${border}`, display: "flex", gap: 10, fontSize: 9, color: "rgba(255,255,255,0.3)" }}>
                {[["기본", "#EC5212"], ["비교", "#3b82f6"], ["교환", "#f59e0b"], ["정렬", "#22c55e"], ["피봇", "#ec4899"], ["병합", "#8b5cf6"]].map(([l, c]) => (
                    <span key={l as string} style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <span style={{ width: 8, height: 8, borderRadius: 2, background: c as string }} />{l}
                    </span>
                ))}
            </div>
        </div>
    );
}
