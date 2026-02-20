"use client";

import { useState } from "react";
import { useUserProgress } from "@/hooks/useUserProgress";

/* ── Data ── */
const WEEKLY = [
    { day: "Mon", done: true, xp: 40 },
    { day: "Tue", done: true, xp: 60 },
    { day: "Wed", done: true, xp: 30 },
    { day: "Thu", done: false, xp: 0, today: true },
    { day: "Fri", done: false, xp: 0 },
    { day: "Sat", done: false, xp: 0 },
    { day: "Sun", done: false, xp: 0 },
];

const PAST = [
    { title: "문자열 뒤집기", difficulty: "쉬움", diffColor: "green", score: 100, time: "3:12", date: "어제" },
    { title: "피보나치 수열", difficulty: "보통", diffColor: "yellow", score: 85, time: "8:45", date: "2일 전" },
    { title: "이진 탐색", difficulty: "어려움", diffColor: "red", score: 70, time: "12:30", date: "3일 전" },
];

const KEYWORDS = ["배열", "문자열", "정렬", "재귀", "스택", "큐", "그래프", "DP"];

export default function ChallengePage() {
    const { progress } = useUserProgress();
    const [showHint, setShowHint] = useState(false);
    const [code, setCode] = useState(`def two_sum(nums, target):\n    # 두 수의 합이 target이 되는\n    # 인덱스를 반환하세요\n    seen = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in seen:\n            return [seen[diff], i]\n        seen[n] = i\n    return []`);

    return (
        <div className="p-6 lg:p-8 max-w-[1400px] mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 flex items-center gap-3">
                        <span className="material-symbols-outlined text-blue-600 text-3xl">fitness_center</span>
                        데일리 챌린지
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">매일 한 문제씩 풀고 실력을 키워보세요!</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-orange-100 px-3 py-1.5 rounded-lg">
                        <span className="material-symbols-outlined text-orange-500 text-lg">local_fire_department</span>
                        <span className="font-bold text-orange-700 text-sm">{progress.streak}일 연속</span>
                    </div>
                    <div className="flex items-center gap-1 bg-blue-100 px-3 py-1.5 rounded-lg">
                        <span className="material-symbols-outlined text-blue-500 text-lg">diamond</span>
                        <span className="font-bold text-blue-700 text-sm">{progress.xp} XP</span>
                    </div>
                </div>
            </div>

            {/* Weekly Tracker */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-purple-500 text-xl">event_note</span>
                    이번 주 진행률
                </h2>
                <div className="flex justify-between gap-2">
                    {WEEKLY.map((d, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 flex-1">
                            <div className={`size-12 rounded-xl flex items-center justify-center text-xl font-bold transition-all
                ${d.done ? "bg-green-500 text-white shadow-green-200 shadow-md" : d.today ? "bg-blue-500 text-white animate-pulse shadow-blue-200 shadow-md" : "bg-gray-100 text-gray-400 border border-gray-200"}
              `}>
                                {d.done ? "✓" : d.today ? "?" : "—"}
                            </div>
                            <span className={`text-xs font-bold ${d.today ? "text-blue-600" : d.done ? "text-green-600" : "text-gray-400"}`}>{d.day}</span>
                            {d.xp > 0 && <span className="text-[10px] font-bold text-gray-400">+{d.xp}xp</span>}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Challenge */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Problem Card */}
                    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded backdrop-blur-sm">오늘의 문제</span>
                                <span className="text-xs font-bold bg-yellow-400/30 text-yellow-100 px-2 py-1 rounded">보통 난이도</span>
                                <span className="text-xs font-medium text-blue-200">+50 XP</span>
                            </div>
                            <h2 className="text-xl font-bold mb-2">Two Sum 문제</h2>
                            <p className="text-sm text-blue-100 leading-relaxed">
                                정수 배열 <code className="bg-white/10 px-1 rounded">nums</code>와 정수 <code className="bg-white/10 px-1 rounded">target</code>이 주어졌을 때, 합이 target이 되는 두 수의 인덱스를 반환하세요.
                            </p>
                        </div>

                        {/* Code Editor */}
                        <div className="border-b border-gray-200">
                            <div className="flex items-center justify-between px-4 py-2 bg-gray-50 border-b border-gray-200">
                                <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">code</span> Python
                                </span>
                                <button className="text-xs text-gray-500 hover:text-gray-700 font-medium">Reset</button>
                            </div>
                            <textarea
                                className="w-full h-48 p-4 font-mono text-sm text-gray-800 bg-gray-900 text-green-400 resize-none outline-none focus:ring-2 focus:ring-blue-500/30"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                spellCheck={false}
                            />
                        </div>

                        {/* Actions */}
                        <div className="p-4 flex items-center justify-between bg-gray-50">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="text-sm text-gray-500 hover:text-blue-600 flex items-center gap-1 font-medium transition-colors"
                            >
                                <span className="material-symbols-outlined text-lg">lightbulb</span>
                                {showHint ? "힌트 숨기기" : "힌트 보기"}
                            </button>
                            <div className="flex gap-3">
                                <button className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-300 transition-colors">
                                    테스트 실행
                                </button>
                                <button className="px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md transition-colors flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">send</span> 제출
                                </button>
                            </div>
                        </div>

                        {showHint && (
                            <div className="mx-4 mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-yellow-800">
                                <p className="font-bold mb-1">💡 힌트</p>
                                <p>해시맵(딕셔너리)을 사용해서 이미 본 숫자를 기록하세요. 각 숫자에 대해 <code className="bg-yellow-100 px-1 rounded">target - num</code>이 해시맵에 있는지 확인하면 O(n) 시간에 풀 수 있습니다.</p>
                            </div>
                        )}
                    </div>

                    {/* Past Challenges */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h2 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-gray-500 text-xl">history</span>
                            지난 챌린지
                        </h2>
                        <div className="space-y-3">
                            {PAST.map((p, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group border border-transparent hover:border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className={`size-8 rounded-lg bg-${p.diffColor}-100 text-${p.diffColor}-600 flex items-center justify-center`}>
                                            <span className="material-symbols-outlined text-sm">code</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-900">{p.title}</p>
                                            <p className="text-xs text-gray-500">{p.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-gray-500">
                                        <span className={`font-bold text-${p.diffColor}-600 bg-${p.diffColor}-100 px-2 py-0.5 rounded`}>{p.difficulty}</span>
                                        <span className="font-mono">{p.time}</span>
                                        <span className="font-bold text-blue-600">{p.score}점</span>
                                        <span className="material-symbols-outlined text-gray-300 group-hover:text-blue-500 text-sm">chevron_right</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Timer */}
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-2xl p-6 shadow-xl">
                        <h3 className="text-xs font-bold text-purple-200 uppercase tracking-wider mb-3">⏱ 남은 시간</h3>
                        <div className="flex gap-3 justify-center mb-4">
                            {[{ v: "14", l: "시간" }, { v: "32", l: "분" }, { v: "08", l: "초" }].map((t, i) => (
                                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center min-w-[60px]">
                                    <div className="text-3xl font-black tabular-nums">{t.v}</div>
                                    <div className="text-[10px] text-purple-200 uppercase">{t.l}</div>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-purple-200 text-center">내일 자정에 새로운 문제가 출제됩니다</p>
                    </div>

                    {/* Rankings */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-yellow-500 text-xl">emoji_events</span>
                            오늘의 순위
                        </h3>
                        <div className="space-y-3">
                            {[
                                { rank: 1, name: "Alex K.", score: 100, time: "1:45", medal: "🥇" },
                                { rank: 2, name: "Mia W.", score: 100, time: "2:12", medal: "🥈" },
                                { rank: 3, name: "Chris P.", score: 95, time: "3:08", medal: "🥉" },
                                { rank: 24, name: "나", score: 0, time: "—", medal: "", isMe: true },
                            ].map((r, i) => (
                                <div key={i} className={`flex items-center justify-between p-2.5 rounded-xl ${r.isMe ? "bg-blue-50 ring-1 ring-blue-200" : "bg-gray-50"}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg w-7 text-center">{r.medal || `#${r.rank}`}</span>
                                        <span className={`text-sm font-bold ${r.isMe ? "text-blue-600" : "text-gray-900"}`}>{r.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-gray-500">
                                        <span className="font-mono">{r.time}</span>
                                        <span className="font-bold">{r.score}점</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Keywords */}
                    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-teal-500 text-xl">tag</span>
                            추천 키워드
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {KEYWORDS.map((k) => (
                                <button key={k} className="px-3 py-1.5 text-xs font-medium bg-gray-100 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200 hover:border-blue-200">
                                    {k}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
