'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import {
    BookOpen,
    ClipboardList,
    Code2,
    BarChart3,
    Monitor,
    Users,
    GraduationCap,
    TrendingUp,
    Clock,
    Star,
} from 'lucide-react'

interface WidgetCard {
    title: string
    value: string
    subtitle: string
    icon: React.ReactNode
    color: string
    gradient: string
}

const studentWidgets: WidgetCard[] = [
    {
        title: '진행 중인 수업',
        value: '—',
        subtitle: '다음 수업을 확인하세요',
        icon: <BookOpen size={24} />,
        color: '#0066FF',
        gradient: 'linear-gradient(135deg, rgba(0,102,255,0.2), rgba(0,229,255,0.1))',
    },
    {
        title: '미제출 숙제',
        value: '—',
        subtitle: '기한 내 제출하세요',
        icon: <ClipboardList size={24} />,
        color: '#FF6B35',
        gradient: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,107,53,0.05))',
    },
    {
        title: '코딩 활동',
        value: '—',
        subtitle: '이번 주 컴파일 횟수',
        icon: <Code2 size={24} />,
        color: '#10B981',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))',
    },
    {
        title: '학습 진도',
        value: '—',
        subtitle: '전체 교재 진행률',
        icon: <TrendingUp size={24} />,
        color: '#7C3AED',
        gradient: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))',
    },
]

const teacherWidgets: WidgetCard[] = [
    {
        title: '총 학생 수',
        value: '—',
        subtitle: '전체 등록 학생',
        icon: <Users size={24} />,
        color: '#0066FF',
        gradient: 'linear-gradient(135deg, rgba(0,102,255,0.2), rgba(0,229,255,0.1))',
    },
    {
        title: '오늘 수업',
        value: '—',
        subtitle: '오늘 예정된 수업',
        icon: <Clock size={24} />,
        color: '#10B981',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))',
    },
    {
        title: '채점 대기',
        value: '—',
        subtitle: '미채점 제출물',
        icon: <ClipboardList size={24} />,
        color: '#FF6B35',
        gradient: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,107,53,0.05))',
    },
    {
        title: 'PC 상태',
        value: '—',
        subtitle: '온라인 PC 수',
        icon: <Monitor size={24} />,
        color: '#7C3AED',
        gradient: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(124,58,237,0.05))',
    },
]

const parentWidgets: WidgetCard[] = [
    {
        title: '자녀 학습 현황',
        value: '—',
        subtitle: '이번 주 학습 시간',
        icon: <GraduationCap size={24} />,
        color: '#0066FF',
        gradient: 'linear-gradient(135deg, rgba(0,102,255,0.2), rgba(0,229,255,0.1))',
    },
    {
        title: '숙제 제출률',
        value: '—',
        subtitle: '최근 30일 기준',
        icon: <BarChart3 size={24} />,
        color: '#10B981',
        gradient: 'linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))',
    },
    {
        title: '코딩 점수',
        value: '—',
        subtitle: '평균 컴파일 성공률',
        icon: <Star size={24} />,
        color: '#FF6B35',
        gradient: 'linear-gradient(135deg, rgba(255,107,53,0.2), rgba(255,107,53,0.05))',
    },
]

function getWidgetsByRole(role: string | null): WidgetCard[] {
    switch (role) {
        case 'teacher': return teacherWidgets
        case 'parent': return parentWidgets
        default: return studentWidgets
    }
}

function getGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return '좋은 아침이에요'
    if (hour < 18) return '좋은 오후에요'
    return '좋은 저녁이에요'
}

function CodingActivityWidget({ userId, role }: { userId: string; role: string | null }) {
    const [stats, setStats] = useState<{ total: number; success: number; error: number } | null>(null)
    const supabase = createClient()

    useEffect(() => {
        if (!userId) return
        const fetch = async () => {
            const since = new Date()
            since.setDate(since.getDate() - 7)
            const { data } = await supabase
                .from('compiler_activities')
                .select('status')
                .eq('student_id', userId)
                .gte('created_at', since.toISOString())
            if (data) {
                const success = data.filter((d: { status: string }) => d.status === 'success').length
                setStats({ total: data.length, success, error: data.length - success })
            }
        }
        if (role !== 'teacher') fetch()
    }, [userId, role]) // eslint-disable-line react-hooks/exhaustive-deps

    if (role === 'teacher' || !stats || stats.total === 0) return null

    const rate = stats.total > 0 ? Math.round((stats.success / stats.total) * 100) : 0

    return (
        <div>
            <h2 className="text-lg font-bold mb-4">내 코딩 활동</h2>
            <Link
                href={`/dashboard/stats/${userId}`}
                className="rounded-xl p-6 flex items-center justify-between transition-all hover:-translate-y-1 block"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            >
                <div>
                    <p className="text-sm mb-1" style={{ color: 'var(--color-text-secondary)' }}>이번 주 컴파일</p>
                    <p className="text-3xl font-bold">{stats.total}회</p>
                    <p className="text-xs mt-1" style={{ color: '#22C55E' }}>성공률 {rate}%</p>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-xl font-bold" style={{ color: '#22C55E' }}>{stats.success}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>성공</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xl font-bold" style={{ color: '#EF4444' }}>{stats.error}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>실패</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default function DashboardPage() {
    const [userName, setUserName] = useState<string>('')
    const [userRole, setUserRole] = useState<string | null>(null)
    const [userId, setUserId] = useState<string>('')
    const supabase = createClient()

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUserName(user.user_metadata?.name || user.email?.split('@')[0] || '사용자')
                setUserRole(user.user_metadata?.role || 'student')
                setUserId(user.id)
            }
        }
        fetchUser()
    }, [supabase])

    const widgets = getWidgetsByRole(userRole)

    return (
        <div className="max-w-6xl mx-auto space-y-8">
            {/* Welcome Banner */}
            <div
                className="rounded-2xl p-6 md:p-8 relative overflow-hidden"
                style={{
                    background: 'linear-gradient(135deg, rgba(0,102,255,0.15), rgba(0,229,255,0.08), rgba(124,58,237,0.1))',
                    border: '1px solid var(--color-border)',
                }}
            >
                <div className="relative z-10">
                    <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-accent-cyan)' }}>
                        {getGreeting()} 👋
                    </p>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        {userName ? `${userName}님, 환영합니다!` : '환영합니다!'}
                    </h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        코딩쏙 통합 플랫폼에서 학습 현황을 확인하세요.
                    </p>
                </div>
                {/* Decorative gradient orb */}
                <div
                    className="absolute -right-10 -top-10 w-48 h-48 rounded-full opacity-30"
                    style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.4), transparent 70%)' }}
                />
            </div>

            {/* Widget Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {widgets.map((widget, i) => (
                    <div
                        key={i}
                        className="rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                        style={{
                            background: widget.gradient,
                            border: '1px solid var(--color-border)',
                        }}
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ background: `${widget.color}20`, color: widget.color }}
                            >
                                {widget.icon}
                            </div>
                        </div>
                        <p className="text-2xl font-bold mb-1">{widget.value}</p>
                        <p className="text-sm font-medium mb-0.5">{widget.title}</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>
                            {widget.subtitle}
                        </p>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <h2 className="text-lg font-bold mb-4">빠른 시작</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Link
                        href="/dashboard/cstudio"
                        className="glass-premium rounded-xl p-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer block"
                    >
                        <Code2 size={24} style={{ color: 'var(--color-accent-cyan)' }} />
                        <h3 className="font-semibold mt-3 mb-1">C-Studio 열기</h3>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            C 프로그래밍 IDE로 바로 이동
                        </p>
                    </Link>
                    <Link
                        href="/dashboard/learning"
                        className="glass-premium rounded-xl p-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer block"
                    >
                        <BookOpen size={24} style={{ color: 'var(--color-primary)' }} />
                        <h3 className="font-semibold mt-3 mb-1">교재 학습</h3>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            이어서 학습하기
                        </p>
                    </Link>
                    <Link
                        href="/dashboard/homework"
                        className="glass-premium rounded-xl p-5 hover:-translate-y-1 transition-all duration-300 cursor-pointer block"
                    >
                        <ClipboardList size={24} style={{ color: 'var(--color-accent-orange)' }} />
                        <h3 className="font-semibold mt-3 mb-1">숙제 확인</h3>
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            미제출 숙제를 확인하세요
                        </p>
                    </Link>
                </div>
            </div>

            {/* Coding Activity Widget */}
            <CodingActivityWidget userId={userId} role={userRole} />
        </div>
    )
}
