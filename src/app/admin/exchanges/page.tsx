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
    user: { name: string; email: string };
}

export default function AdminExchangesPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    const [exchanges, setExchanges] = useState<Exchange[]>([]);
    const [processing, setProcessing] = useState<string | null>(null);

    useEffect(() => {
        if (!loading) {
            if (!user) {
                router.push("/auth/login");
            } else if (user.role !== "ADMIN") {
                router.push("/learn");
            }
        }
    }, [user, loading, router]);

    useEffect(() => {
        const fetchExchanges = async () => {
            const res = await fetch('/api/admin/exchanges');
            const data = await res.json();
            setExchanges(data.exchanges || []);
        };
        if (user?.role === "ADMIN") {
            fetchExchanges();
        }
    }, [user]);

    const handleAction = async (exchangeId: string, status: 'APPROVED' | 'REJECTED') => {
        setProcessing(exchangeId);

        try {
            const res = await fetch('/api/admin/exchanges', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ exchangeId, status })
            });
            const data = await res.json();

            if (data.success) {
                setExchanges(exchanges.map(e =>
                    e.id === exchangeId ? { ...e, status } : e
                ));
            }
        } catch (error) {
            console.error("Action failed:", error);
        } finally {
            setProcessing(null);
        }
    };

    if (loading || !user || user.role !== "ADMIN") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    const pendingExchanges = exchanges.filter(e => e.status === 'PENDING');
    const processedExchanges = exchanges.filter(e => e.status !== 'PENDING');

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/learn" className="text-gray-400 hover:text-gray-600">← 학습으로</Link>
                        <h1 className="text-xl font-bold text-gray-900">관리자 - 교환 관리</h1>
                    </div>
                    <Link href="/admin/problems" className="text-sm text-blue-600 hover:text-blue-700">
                        문제 관리 →
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-6 py-12">
                {/* Pending */}
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                    대기 중인 교환 신청 ({pendingExchanges.length})
                </h2>

                {pendingExchanges.length === 0 ? (
                    <p className="text-gray-400 bg-white rounded-2xl p-8 text-center mb-12">
                        대기 중인 교환 신청이 없습니다
                    </p>
                ) : (
                    <div className="space-y-4 mb-12">
                        {pendingExchanges.map((exchange) => (
                            <motion.div
                                key={exchange.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-xl p-6 border border-gray-100"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-gray-900">
                                            {exchange.user.name} ({exchange.user.email})
                                        </p>
                                        <p className="text-blue-600 font-semibold mt-1">
                                            {exchange.points.toLocaleString()}P → {(exchange.points * 10).toLocaleString()}원
                                        </p>
                                        <p className="text-sm text-gray-400 mt-1">
                                            {new Date(exchange.createdAt).toLocaleString('ko-KR')}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <motion.button
                                            onClick={() => handleAction(exchange.id, 'APPROVED')}
                                            disabled={processing === exchange.id}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {processing === exchange.id ? "..." : "승인"}
                                        </motion.button>
                                        <motion.button
                                            onClick={() => handleAction(exchange.id, 'REJECTED')}
                                            disabled={processing === exchange.id}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {processing === exchange.id ? "..." : "거절"}
                                        </motion.button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Processed */}
                <h2 className="text-xl font-bold text-gray-900 mb-6">처리 완료</h2>

                {processedExchanges.length === 0 ? (
                    <p className="text-gray-400 bg-white rounded-2xl p-8 text-center">
                        처리된 교환 내역이 없습니다
                    </p>
                ) : (
                    <div className="space-y-4">
                        {processedExchanges.map((exchange) => (
                            <div
                                key={exchange.id}
                                className="bg-white rounded-xl p-6 border border-gray-100 flex items-center justify-between"
                            >
                                <div>
                                    <p className="font-semibold text-gray-900">{exchange.user.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {exchange.points.toLocaleString()}P → {(exchange.points * 10).toLocaleString()}원
                                    </p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${exchange.status === 'APPROVED'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-red-100 text-red-700'
                                    }`}>
                                    {exchange.status === 'APPROVED' ? '승인됨' : '거절됨'}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
