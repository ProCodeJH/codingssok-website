"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Exchange {
    id: string;
    points: number;
    giftType: string;
    status: string;
    createdAt: string;
}

const statusLabels: Record<string, { label: string; color: string }> = {
    "PENDING": { label: "대기 중", color: "bg-yellow-100 text-yellow-700" },
    "APPROVED": { label: "승인됨", color: "bg-green-100 text-green-700" },
    "REJECTED": { label: "거절됨", color: "bg-red-100 text-red-700" }
};

export default function PointsPage() {
    const { user, loading, refreshUser } = useAuth();
    const router = useRouter();

    const [exchanges, setExchanges] = useState<Exchange[]>([]);
    const [exchangePoints, setExchangePoints] = useState(500);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/login");
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchExchanges = async () => {
            try {
                const res = await fetch('/api/points/exchanges');
                const data = await res.json();
                setExchanges(data.exchanges || []);
            } catch (error) {
                console.error("Failed to fetch exchanges:", error);
            }
        };

        if (user) {
            fetchExchanges();
        }
    }, [user]);

    const handleExchange = async () => {
        if (!user || exchangePoints > user.points || submitting) return;

        setSubmitting(true);
        setMessage("");

        try {
            const res = await fetch('/api/points/exchange', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ points: exchangePoints })
            });
            const data = await res.json();

            if (data.success) {
                setMessage("교환 신청이 완료되었습니다! 관리자 승인 후 문상이 발급됩니다.");
                refreshUser();
                // 교환 목록 새로고침
                const res2 = await fetch('/api/points/exchanges');
                const data2 = await res2.json();
                setExchanges(data2.exchanges || []);
            } else {
                setMessage(data.error || "교환 신청에 실패했습니다");
            }
        } catch {
            setMessage("교환 신청 중 오류가 발생했습니다");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/learn" className="text-gray-400 hover:text-gray-600">← 학습으로</Link>
                        <h1 className="text-xl font-bold text-gray-900">포인트</h1>
                    </div>
                    <span className="text-sm font-semibold text-blue-600">{user.points.toLocaleString()} P</span>
                </div>
            </header>

            {/* Main */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Points Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white mb-8"
                >
                    <p className="text-blue-200 mb-2">보유 포인트</p>
                    <p className="text-5xl font-bold mb-4">{user.points.toLocaleString()}P</p>
                    <p className="text-blue-200 text-sm">문제를 풀고 포인트를 모아보세요!</p>
                </motion.div>

                {/* Exchange Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-2xl p-8 border border-gray-100 mb-8"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">문화상품권 교환</h2>

                    <div className="mb-6">
                        <p className="text-sm text-gray-500 mb-3">교환할 포인트를 선택하세요</p>
                        <div className="flex gap-3 flex-wrap">
                            {[500, 1000, 2000, 5000].map(pts => (
                                <button
                                    key={pts}
                                    onClick={() => setExchangePoints(pts)}
                                    disabled={pts > user.points}
                                    className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${exchangePoints === pts
                                            ? "bg-gray-900 text-white"
                                            : pts > user.points
                                                ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {pts.toLocaleString()}P = {(pts * 10).toLocaleString()}원
                                </button>
                            ))}
                        </div>
                    </div>

                    {message && (
                        <p className={`mb-4 p-4 rounded-xl text-sm ${message.includes('완료') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                            {message}
                        </p>
                    )}

                    <motion.button
                        onClick={handleExchange}
                        disabled={submitting || exchangePoints > user.points}
                        className="w-full py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: submitting ? 1 : 1.01 }}
                        whileTap={{ scale: submitting ? 1 : 0.99 }}
                    >
                        {submitting ? "신청 중..." : `${exchangePoints.toLocaleString()}P → ${(exchangePoints * 10).toLocaleString()}원 문상 교환 신청`}
                    </motion.button>

                    <p className="text-xs text-gray-400 mt-4 text-center">
                        * 관리자 승인 후 카카오톡으로 문화상품권이 발송됩니다
                    </p>
                </motion.div>

                {/* Exchange History */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white rounded-2xl p-8 border border-gray-100"
                >
                    <h2 className="text-xl font-bold text-gray-900 mb-6">교환 내역</h2>

                    {exchanges.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">아직 교환 내역이 없습니다</p>
                    ) : (
                        <div className="space-y-4">
                            {exchanges.map((exchange) => (
                                <div key={exchange.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                                    <div>
                                        <p className="font-semibold text-gray-900">{exchange.points.toLocaleString()}P → {(exchange.points * 10).toLocaleString()}원</p>
                                        <p className="text-sm text-gray-400">{new Date(exchange.createdAt).toLocaleDateString('ko-KR')}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs ${statusLabels[exchange.status]?.color || 'bg-gray-100'}`}>
                                        {statusLabels[exchange.status]?.label || exchange.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </main>
        </div>
    );
}
