"use client";

import { useState, useEffect } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Challenge Data ── */
const DAILY_CHALLENGE = {
    title: "Array Rotation",
    difficulty: "Medium",
    category: "Algorithms",
    desc: "Given an integer array, rotate the array to the right by k steps. Can you do it in O(1) extra space?",
    xpReward: 150,
    timeLimit: "30 min",
    solvedBy: 342,
    hints: 3,
};

const CHALLENGE_HISTORY = [
    { day: "Mon", title: "Binary Search", difficulty: "Easy", xp: 80, status: "completed" },
    { day: "Tue", title: "Merge Sort", difficulty: "Medium", xp: 120, status: "completed" },
    { day: "Wed", title: "Graph BFS", difficulty: "Hard", xp: 200, status: "completed" },
    { day: "Thu", title: "Dynamic Prog", difficulty: "Hard", xp: 200, status: "completed" },
    { day: "Fri", title: "Array Rotation", difficulty: "Medium", xp: 150, status: "today" },
    { day: "Sat", title: "???", difficulty: "???", xp: 0, status: "locked" },
    { day: "Sun", title: "???", difficulty: "???", xp: 0, status: "locked" },
];

const LEADERBOARD_MINI = [
    { rank: 1, name: "Alex Kim", xp: 980, avatar: "A" },
    { rank: 2, name: "Sarah L.", xp: 870, avatar: "S" },
    { rank: 3, name: "Mike R.", xp: 750, avatar: "M" },
    { rank: 4, name: "You", xp: 650, avatar: "Y", isMe: true },
];

const CODE_TEMPLATE = `def rotate(nums, k):
    """
    Rotate array to the right by k steps.
    Do not return anything, modify nums in-place.
    """
    # Your solution here
    pass`;

export default function ChallengePage() {
    const { progress } = useUserProgress();
    const [timeLeft, setTimeLeft] = useState(1800);
    const [started, setStarted] = useState(false);
    const [code, setCode] = useState(CODE_TEMPLATE);

    useEffect(() => {
        if (!started) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, [started]);

    const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;
    const diffBadgeCls: Record<string, string> = {
        Easy: "bg-green-500/20 text-green-400 border-green-500/30",
        Medium: "bg-orange-500/20 text-orange-400 border-orange-500/30",
        Hard: "bg-red-500/20 text-red-400 border-red-500/30",
    };

    return (
        <div className="p-6 lg:p-10 max-w-[1200px] mx-auto flex flex-col gap-8">
            {/* Daily Challenge Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-8 lg:p-10 shadow-xl">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
                <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#13daec]/20 rounded-full blur-[80px]" />
                <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/20 rounded-full blur-[80px]" />
                <div className="relative z-10 flex flex-col lg:flex-row gap-8 items-start lg:items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#13daec] border border-white/10">
                                Daily Challenge
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${diffBadgeCls[DAILY_CHALLENGE.difficulty] || ""}`}>
                                {DAILY_CHALLENGE.difficulty}
                            </span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl font-black tracking-tight mb-3">{DAILY_CHALLENGE.title}</h1>
                        <p className="text-white/60 max-w-xl leading-relaxed">{DAILY_CHALLENGE.desc}</p>
                        <div className="flex gap-6 mt-6 text-sm">
                            <div className="flex items-center gap-2 text-white/50">
                                <span className="material-symbols-outlined text-[#13daec] text-lg">stars</span>
                                <span className="font-bold text-white">{DAILY_CHALLENGE.xpReward}</span> XP
                            </div>
                            <div className="flex items-center gap-2 text-white/50">
                                <span className="material-symbols-outlined text-[#13daec] text-lg">timer</span>
                                <span className="font-bold text-white">{DAILY_CHALLENGE.timeLimit}</span>
                            </div>
                            <div className="flex items-center gap-2 text-white/50">
                                <span className="material-symbols-outlined text-[#13daec] text-lg">group</span>
                                <span className="font-bold text-white">{DAILY_CHALLENGE.solvedBy}</span> solved
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-3">
                        <div className="relative w-28 h-28">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle className="text-white/10" cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" />
                                <circle className="text-[#13daec]" cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" strokeDasharray={`${(timeLeft / 1800) * 276.5}, 276.5`} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-2xl font-black tabular-nums">{formatTime(timeLeft)}</span>
                                <span className="text-[10px] text-white/40 uppercase tracking-wider">Remaining</span>
                            </div>
                        </div>
                        <button onClick={() => setStarted(!started)}
                            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-lg ${started ? "bg-red-500 hover:bg-red-600 shadow-red-500/30" : "bg-[#13daec] hover:bg-[#0fbccb] shadow-[#13daec]/30"} text-white`}>
                            <span className="material-symbols-outlined text-sm mr-1 align-middle">{started ? "pause" : "play_arrow"}</span>
                            {started ? "Pause" : "Start Challenge"}
                        </button>
                    </div>
                </div>
            </div>

            {/* Week Streak */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-gray-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#13daec]">calendar_month</span>
                        This Week&apos;s Challenges
                    </h2>
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full">4/7 Completed</span>
                </div>
                <div className="grid grid-cols-7 gap-3">
                    {CHALLENGE_HISTORY.map((ch, i) => (
                        <div key={i} className={`text-center p-3 rounded-xl transition-all cursor-pointer border
              ${ch.status === "completed" ? "bg-green-50 border-green-200 hover:border-green-300" : ch.status === "today" ? "bg-blue-50 border-blue-300 ring-2 ring-blue-200 shadow-md" : "bg-gray-50 border-gray-100 opacity-60"}`}>
                            <div className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${ch.status === "today" ? "text-blue-500" : ch.status === "completed" ? "text-green-600" : "text-gray-400"}`}>{ch.day}</div>
                            <div className={`size-8 mx-auto rounded-full flex items-center justify-center mb-2
                ${ch.status === "completed" ? "bg-green-500 text-white" : ch.status === "today" ? "bg-blue-500 text-white animate-pulse" : "bg-gray-200 text-gray-400"}`}>
                                <span className="material-symbols-outlined text-sm">
                                    {ch.status === "completed" ? "check" : ch.status === "today" ? "play_arrow" : "lock"}
                                </span>
                            </div>
                            <div className="text-[10px] font-bold text-gray-700 truncate">{ch.title}</div>
                            {ch.xp > 0 && ch.status !== "locked" && <div className="text-[10px] text-gray-400 mt-1">+{ch.xp} XP</div>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Code Editor */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-slate-900 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
                        {/* Editor header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                                <span className="text-xs text-slate-400 ml-3 font-mono">solution.py</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="text-[10px] font-bold text-slate-400 bg-slate-700 px-3 py-1 rounded-md hover:bg-slate-600 transition-colors">Python</button>
                                <button className="text-[10px] font-bold text-slate-400 bg-slate-700 px-3 py-1 rounded-md hover:bg-slate-600 transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px]">lightbulb</span> Hints ({DAILY_CHALLENGE.hints})
                                </button>
                            </div>
                        </div>
                        {/* Code area */}
                        <div className="p-4">
                            <textarea
                                className="w-full bg-transparent text-green-400 font-mono text-sm resize-none outline-none min-h-[350px] leading-relaxed"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                spellCheck={false}
                            />
                        </div>
                        {/* Editor footer */}
                        <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-t border-slate-700">
                            <div className="flex items-center gap-3">
                                <button className="text-xs font-bold text-slate-300 bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sm">play_arrow</span> Run
                                </button>
                                <button className="text-xs font-bold text-slate-300 bg-slate-700 px-4 py-2 rounded-lg hover:bg-slate-600 transition-colors flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-sm">bug_report</span> Debug
                                </button>
                            </div>
                            <button className="text-xs font-bold text-white bg-[#13daec] px-5 py-2 rounded-lg hover:bg-[#0fbccb] transition-colors shadow-lg shadow-[#13daec]/20 flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm">send</span> Submit Solution
                            </button>
                        </div>
                    </div>

                    {/* Test Cases */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-[#13daec]">checklist</span>
                            Test Cases
                        </h3>
                        <div className="space-y-3">
                            {[
                                { input: "[1,2,3,4,5,6,7], k=3", expected: "[5,6,7,1,2,3,4]", status: "pending" },
                                { input: "[-1,-100,3,99], k=2", expected: "[3,99,-1,-100]", status: "pending" },
                                { input: "[1,2], k=5", expected: "[2,1]", status: "pending" },
                            ].map((tc, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className={`size-8 rounded-full flex items-center justify-center text-gray-400 bg-gray-200 text-xs font-bold`}>
                                        {i + 1}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex gap-4 text-xs">
                                            <div><span className="text-gray-400 font-medium">Input:</span> <span className="font-mono text-gray-700">{tc.input}</span></div>
                                            <div><span className="text-gray-400 font-medium">Expected:</span> <span className="font-mono text-gray-700">{tc.expected}</span></div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400 bg-gray-200 px-2.5 py-1 rounded-md uppercase">Pending</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Mini Leaderboard */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-yellow-500">leaderboard</span>
                            Today&apos;s Ranking
                        </h3>
                        <div className="space-y-3">
                            {LEADERBOARD_MINI.map((u) => (
                                <div key={u.rank} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${u.isMe ? "bg-blue-50 border border-blue-200" : "hover:bg-gray-50"}`}>
                                    <span className={`text-xs font-black w-5 ${u.rank <= 3 ? "text-yellow-500" : "text-gray-400"}`}>#{u.rank}</span>
                                    <div className={`size-8 rounded-full flex items-center justify-center text-xs font-bold ${u.isMe ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}`}>{u.avatar}</div>
                                    <div className="flex-1">
                                        <div className={`text-sm font-bold ${u.isMe ? "text-blue-600" : "text-gray-900"}`}>{u.name}</div>
                                    </div>
                                    <span className="text-xs font-bold text-gray-500">{u.xp} XP</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Streak Stats */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 mb-4">
                            <span className="material-symbols-outlined text-orange-500">local_fire_department</span>
                            Challenge Stats
                        </h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-xl border border-orange-100">
                                <span className="text-sm text-orange-700 font-medium">Current Streak</span>
                                <span className="text-lg font-black text-gray-900">{progress.streak} days</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-xl border border-purple-100">
                                <span className="text-sm text-purple-700 font-medium">Best Streak</span>
                                <span className="text-lg font-black text-gray-900">14 days</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-xl border border-green-100">
                                <span className="text-sm text-green-700 font-medium">Total Solved</span>
                                <span className="text-lg font-black text-gray-900">47</span>
                            </div>
                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-xl border border-blue-100">
                                <span className="text-sm text-blue-700 font-medium">Win Rate</span>
                                <span className="text-lg font-black text-gray-900">89%</span>
                            </div>
                        </div>
                    </div>

                    {/* Achievement */}
                    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
                        <div className="absolute -right-6 -bottom-6 text-8xl opacity-20">🏆</div>
                        <div className="relative z-10">
                            <div className="text-[10px] font-bold uppercase tracking-wider text-yellow-100 mb-2">Next Achievement</div>
                            <h4 className="font-bold text-lg mb-1">7-Day Streak Master</h4>
                            <p className="text-sm text-yellow-100 mb-3">Complete 3 more daily challenges</p>
                            <div className="w-full bg-white/20 rounded-full h-2">
                                <div className="bg-white rounded-full h-2 transition-all" style={{ width: "57%" }} />
                            </div>
                            <p className="text-[10px] text-yellow-200 mt-1.5 text-right">4 / 7 days</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
