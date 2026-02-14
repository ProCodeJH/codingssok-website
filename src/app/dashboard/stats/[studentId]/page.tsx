'use client'

import { useState, useEffect, use } from 'react'
import { getStudentStats } from '@/lib/actions/stats'
import Link from 'next/link'
import {
    ArrowLeft,
    Loader2,
    Code2,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    TrendingUp,
    Calendar,
} from 'lucide-react'

interface DailyStat {
    date: string
    success: number
    error: number
}

interface TopError {
    message: string
    count: number
}

interface StatsData {
    totalSuccess: number
    totalError: number
    total: number
    dailyStats: DailyStat[]
    topErrors: TopError[]
}

export default function StatsPage({ params }: { params: Promise<{ studentId: string }> }) {
    const { studentId } = use(params)
    const [stats, setStats] = useState<StatsData | null>(null)
    const [loading, setLoading] = useState(true)
    const [days, setDays] = useState(30)

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            const result = await getStudentStats(studentId, days)
            if (result.data) setStats(result.data as StatsData)
            setLoading(false)
        }
        fetch()
    }, [studentId, days])

    const successRate = stats && stats.total > 0 ? Math.round((stats.totalSuccess / stats.total) * 100) : 0

    // 차트: 최대값 기준으로 막대 높이 계산
    const maxDaily = stats
        ? Math.max(...stats.dailyStats.map((d) => d.success + d.error), 1)
        : 1

    const periodOptions = [
        { label: '7일', value: 7 },
        { label: '30일', value: 30 },
        { label: '90일', value: 90 },
    ]

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Link
                href="/dashboard"
                className="inline-flex items-center gap-1 text-sm mb-4 hover:underline"
                style={{ color: 'var(--color-text-secondary)' }}
            >
                <ArrowLeft size={16} />
                대시보드
            </Link>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Code2 size={24} />
                    코딩 활동 통계
                </h1>
                <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    {periodOptions.map((opt) => (
                        <button
                            key={opt.value}
                            onClick={() => setDays(opt.value)}
                            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                            style={{
                                background: days === opt.value ? 'rgba(0,102,255,0.15)' : 'transparent',
                                color: days === opt.value ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                            }}
                        >
                            {opt.label}
                        </button>
                    ))}
                </div>
            </div>

            {!stats || stats.total === 0 ? (
                <div className="text-center py-20">
                    <Code2 size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
                    <p className="text-lg font-medium mb-1">코딩 활동이 없습니다</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        C-Studio에서 코드를 컴파일하면 여기에 기록됩니다
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-4">
                        <div className="rounded-xl p-5" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <TrendingUp size={16} style={{ color: 'var(--color-primary)' }} />
                                <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>총 컴파일</span>
                            </div>
                            <p className="text-2xl font-bold">{stats.total.toLocaleString()}</p>
                        </div>
                        <div className="rounded-xl p-5" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 size={16} style={{ color: '#22C55E' }} />
                                <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>성공</span>
                            </div>
                            <p className="text-2xl font-bold" style={{ color: '#22C55E' }}>{stats.totalSuccess.toLocaleString()}</p>
                        </div>
                        <div className="rounded-xl p-5" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <XCircle size={16} style={{ color: '#EF4444' }} />
                                <span className="text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>실패</span>
                            </div>
                            <p className="text-2xl font-bold" style={{ color: '#EF4444' }}>{stats.totalError.toLocaleString()}</p>
                        </div>
                    </div>

                    {/* Success/Fail Donut (CSS-based) */}
                    <div className="rounded-xl p-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                        <h3 className="font-bold mb-4">성공률</h3>
                        <div className="flex items-center gap-8">
                            <div className="relative w-28 h-28">
                                <svg viewBox="0 0 36 36" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                                    <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(239,68,68,0.3)" strokeWidth="4" />
                                    <circle
                                        cx="18" cy="18" r="14" fill="none"
                                        stroke="#22C55E" strokeWidth="4"
                                        strokeDasharray={`${successRate * 0.88} ${88 - successRate * 0.88}`}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="text-xl font-bold">{successRate}%</span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ background: '#22C55E' }} />
                                    <span className="text-sm">성공 {stats.totalSuccess}회</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ background: '#EF4444' }} />
                                    <span className="text-sm">실패 {stats.totalError}회</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Daily Activity Chart (CSS bar chart) */}
                    <div className="rounded-xl p-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                        <h3 className="font-bold mb-4 flex items-center gap-2">
                            <Calendar size={16} />
                            일별 컴파일 활동
                        </h3>
                        <div className="flex items-end gap-1 h-40 overflow-x-auto pb-6">
                            {stats.dailyStats.map((day) => {
                                const total = day.success + day.error
                                const height = (total / maxDaily) * 100
                                const successH = total > 0 ? (day.success / total) * height : 0
                                const errorH = height - successH
                                const dateLabel = new Date(day.date).toLocaleDateString('ko-KR', { month: 'numeric', day: 'numeric' })
                                return (
                                    <div
                                        key={day.date}
                                        className="flex flex-col items-center gap-1 min-w-[28px]"
                                        title={`${day.date}: 성공 ${day.success}, 실패 ${day.error}`}
                                    >
                                        <div className="flex flex-col-reverse w-5 rounded-sm overflow-hidden" style={{ height: `${Math.max(height, 2)}%` }}>
                                            <div style={{ height: `${successH}%`, background: '#22C55E', minHeight: successH > 0 ? '2px' : 0 }} />
                                            <div style={{ height: `${errorH}%`, background: '#EF4444', minHeight: errorH > 0 ? '2px' : 0 }} />
                                        </div>
                                        <span className="text-[9px] whitespace-nowrap" style={{ color: 'var(--color-text-secondary)' }}>
                                            {dateLabel}
                                        </span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Top Errors */}
                    {stats.topErrors.length > 0 && (
                        <div className="rounded-xl p-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <AlertTriangle size={16} style={{ color: '#F59E0B' }} />
                                에러 Top 5
                            </h3>
                            <div className="space-y-3">
                                {stats.topErrors.map((err, i) => {
                                    const pct = stats.totalError > 0 ? (err.count / stats.totalError) * 100 : 0
                                    return (
                                        <div key={i}>
                                            <div className="flex items-center justify-between text-sm mb-1">
                                                <span className="truncate flex-1 font-mono text-xs" style={{ color: '#EF4444' }}>
                                                    {err.message}
                                                </span>
                                                <span className="ml-2 text-xs font-medium" style={{ color: 'var(--color-text-secondary)' }}>
                                                    {err.count}회 ({Math.round(pct)}%)
                                                </span>
                                            </div>
                                            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                                <div className="h-full rounded-full" style={{ width: `${pct}%`, background: '#EF4444' }} />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
