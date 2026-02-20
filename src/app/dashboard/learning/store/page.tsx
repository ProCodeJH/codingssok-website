"use client";

import { useUserProgress } from "@/hooks/useUserProgress";

const COMING_SOON_ITEMS = [
    { icon: "palette", name: "테마 스킨", desc: "에디터와 프로필을 커스터마이즈하세요", xp: 500 },
    { icon: "auto_awesome", name: "프리미엄 뱃지", desc: "특별한 뱃지로 자신을 표현하세요", xp: 300 },
    { icon: "smart_toy", name: "AI 더블 XP", desc: "24시간 XP 2배 부스터", xp: 200 },
    { icon: "extension", name: "힌트 팩", desc: "챌린지 힌트 10회 이용권", xp: 150 },
    { icon: "emoji_objects", name: "코드 리뷰", desc: "AI가 코드를 분석해드려요", xp: 400 },
    { icon: "workspace_premium", name: "멘토 패스", desc: "1:1 멘토링 30분 이용권", xp: 1000 },
];

export default function StorePage() {
    const { progress } = useUserProgress();

    return (
        <div className="p-6 lg:p-8 max-w-[1200px] mx-auto space-y-8">
            {/* Header */}
            <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-4 py-1.5 rounded-full text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">construction</span>
                    COMING SOON
                </div>
                <h1 className="text-3xl font-black text-gray-900">
                    🏪 XP 스토어
                </h1>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                    곧 XP를 사용해서 다양한 아이템을 구매할 수 있습니다! 지금은 열심히 XP를 모아두세요.
                </p>
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-5 py-2.5 rounded-xl text-sm font-bold border border-blue-200">
                    <span className="material-symbols-outlined text-lg">diamond</span>
                    보유 XP: {progress.xp.toLocaleString()}
                </div>
            </div>

            {/* Preview Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {COMING_SOON_ITEMS.map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm opacity-75 hover:opacity-100 transition-all group relative overflow-hidden">
                        <div className="absolute top-3 right-3 bg-gray-100 text-gray-500 text-[10px] font-bold px-2 py-0.5 rounded uppercase">준비 중</div>
                        <div className="size-14 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                            <span className="material-symbols-outlined text-blue-500 text-2xl">{item.icon}</span>
                        </div>
                        <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-500 mb-4">{item.desc}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-blue-600 flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">diamond</span>
                                {item.xp} XP
                            </span>
                            <button className="px-4 py-2 bg-gray-200 text-gray-400 rounded-lg text-xs font-bold cursor-not-allowed" disabled>
                                구매 불가
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Notification signup */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white shadow-xl">
                <span className="material-symbols-outlined text-5xl text-white/30 mb-4 block">notifications_active</span>
                <h2 className="text-xl font-bold mb-2">오픈 알림 받기</h2>
                <p className="text-sm text-indigo-200 mb-6 max-w-sm mx-auto">스토어 오픈 시 가장 먼저 알려드릴게요!</p>
                <div className="flex gap-3 max-w-sm mx-auto">
                    <input className="flex-1 px-4 py-3 rounded-xl bg-white/10 text-white placeholder:text-white/40 border border-white/20 outline-none focus:bg-white/20 text-sm" placeholder="이메일 주소" type="email" />
                    <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-white/90 transition-colors shadow-lg">
                        알림 신청
                    </button>
                </div>
            </div>
        </div>
    );
}
