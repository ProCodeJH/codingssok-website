'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import {
    Code2,
    Play,
    ExternalLink,
    BarChart3,
    CheckCircle2,
    XCircle,
    Terminal,
} from 'lucide-react'

export default function CStudioPage() {
    const [userId, setUserId] = useState<string>('')
    const [recentStats, setRecentStats] = useState<{
        total: number; success: number; error: number
    } | null>(null)
    const supabase = createClient()

    const cstudioUrl = process.env.NEXT_PUBLIC_CSTUDIO_URL || 'https://cstudio.codingssok.com'

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return
            setUserId(user.id)

            const since = new Date()
            since.setDate(since.getDate() - 7)
            const { data } = await supabase
                .from('compiler_activities')
                .select('status')
                .eq('student_id', user.id)
                .gte('created_at', since.toISOString())

            if (data) {
                const success = data.filter((d: { status: string }) => d.status === 'success').length
                setRecentStats({ total: data.length, success, error: data.length - success })
            }
        }
        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const successRate = recentStats && recentStats.total > 0
        ? Math.round((recentStats.success / recentStats.total) * 100)
        : 0

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Code2 size={24} style={{ color: 'var(--color-accent-cyan)' }} />
                    C-Studio
                </h1>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    C 프로그래밍 통합 개발 환경
                </p>
            </div>

            {/* IDE Launch Card */}
            <a
                href={cstudioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl p-8 flex items-center justify-between transition-all hover:-translate-y-1 block"
                style={{
                    background: 'linear-gradient(135deg, rgba(0,229,255,0.12), rgba(0,102,255,0.08))',
                    border: '1px solid var(--color-border)',
                }}
            >
                <div className="flex items-center gap-5">
                    <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ background: 'rgba(0,229,255,0.15)' }}
                    >
                        <Terminal size={32} style={{ color: 'var(--color-accent-cyan)' }} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold mb-1">C-Studio IDE 열기</h2>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            브라우저에서 바로 C 코드를 작성하고 컴파일하세요
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Play size={20} style={{ color: 'var(--color-accent-cyan)' }} />
                    <ExternalLink size={16} style={{ color: 'var(--color-text-secondary)' }} />
                </div>
            </a>

            {/* Recent Activity Stats */}
            {recentStats && (
                <div>
                    <h2 className="text-lg font-bold mb-4">이번 주 코딩 활동</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="rounded-xl p-5" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <Code2 size={18} style={{ color: 'var(--color-accent-cyan)' }} />
                                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>총 컴파일</span>
                            </div>
                            <p className="text-3xl font-bold">{recentStats.total}<span className="text-sm font-normal ml-1" style={{ color: 'var(--color-text-secondary)' }}>회</span></p>
                        </div>
                        <div className="rounded-xl p-5" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 size={18} style={{ color: '#22C55E' }} />
                                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>성공</span>
                            </div>
                            <p className="text-3xl font-bold" style={{ color: '#22C55E' }}>{recentStats.success}<span className="text-sm font-normal ml-1" style={{ color: 'var(--color-text-secondary)' }}>회</span></p>
                        </div>
                        <div className="rounded-xl p-5" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-center gap-2 mb-2">
                                <XCircle size={18} style={{ color: '#EF4444' }} />
                                <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>실패</span>
                            </div>
                            <p className="text-3xl font-bold" style={{ color: '#EF4444' }}>{recentStats.error}<span className="text-sm font-normal ml-1" style={{ color: 'var(--color-text-secondary)' }}>회</span></p>
                        </div>
                    </div>

                    {recentStats.total > 0 && (
                        <div className="mt-4 rounded-xl p-5" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium">성공률</span>
                                <span className="text-sm font-bold" style={{ color: successRate >= 70 ? '#22C55E' : successRate >= 40 ? '#F59E0B' : '#EF4444' }}>
                                    {successRate}%
                                </span>
                            </div>
                            <div className="w-full h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{
                                        width: `${successRate}%`,
                                        background: successRate >= 70 ? '#22C55E' : successRate >= 40 ? '#F59E0B' : '#EF4444',
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Quick Links */}
            {userId && (
                <div className="flex gap-3">
                    <Link
                        href={`/dashboard/stats/${userId}`}
                        className="flex-1 rounded-xl p-4 flex items-center gap-3 transition-all hover:-translate-y-0.5"
                        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                    >
                        <BarChart3 size={20} style={{ color: 'var(--color-primary)' }} />
                        <span className="text-sm font-medium">상세 통계 보기</span>
                    </Link>
                </div>
            )}
        </div>
    )
}
