'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import {
    Loader2,
    BookOpen,
    ClipboardList,
    Code2,
    TrendingUp,
    Users,
    ChevronRight,
} from 'lucide-react'

interface Child {
    id: string
    name: string
    email: string
}

export default function ParentDashboardPage() {
    const [children, setChildren] = useState<Child[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetch = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) { setLoading(false); return }

            // 학부모-자녀 연결 테이블
            const { data } = await supabase
                .from('parent_children')
                .select('child_id, profiles!parent_children_child_id_fkey(name, email)')
                .eq('parent_id', user.id)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const kids = ((data || []) as any[]).map(d => {
                const profile = Array.isArray(d.profiles) ? d.profiles[0] : d.profiles
                return {
                    id: d.child_id,
                    name: profile?.name || '—',
                    email: profile?.email || '—',
                }
            })
            setChildren(kids)
            setLoading(false)
        }
        fetch()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
        )
    }

    const summaryCards = [
        { icon: <BookOpen size={20} />, label: '수업', color: '#3B82F6' },
        { icon: <ClipboardList size={20} />, label: '숙제', color: '#F59E0B' },
        { icon: <Code2 size={20} />, label: '코딩 활동', color: '#10B981' },
        { icon: <TrendingUp size={20} />, label: '교재 진도', color: '#8B5CF6' },
    ]

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-2">학부모 대시보드</h1>
            <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
                자녀의 학습 현황을 확인하세요
            </p>

            {children.length === 0 ? (
                <div className="text-center py-20 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <Users size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
                    <p className="text-lg font-medium mb-2">연결된 자녀가 없습니다</p>
                    <p className="text-sm mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                        학원에 문의하여 자녀 계정을 연결하세요
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {children.map((child) => (
                        <div
                            key={child.id}
                            className="rounded-2xl p-6"
                            style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'var(--gradient-primary)' }}>
                                        {child.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-bold">{child.name}</p>
                                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{child.email}</p>
                                    </div>
                                </div>
                                <Link
                                    href={`/dashboard/stats/${child.id}`}
                                    className="text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"
                                    style={{ background: 'rgba(0,102,255,0.1)', color: 'var(--color-primary)' }}
                                >
                                    상세 보기
                                    <ChevronRight size={14} />
                                </Link>
                            </div>

                            <div className="grid grid-cols-4 gap-3">
                                {summaryCards.map((card, i) => (
                                    <div key={i} className="rounded-xl p-3 text-center" style={{ background: `${card.color}10` }}>
                                        <div className="flex justify-center mb-1" style={{ color: card.color }}>{card.icon}</div>
                                        <p className="text-lg font-bold">—</p>
                                        <p className="text-[10px]" style={{ color: 'var(--color-text-secondary)' }}>{card.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
