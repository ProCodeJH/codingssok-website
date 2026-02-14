'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { learningTracks } from '@/lib/actions/learning'
import Link from 'next/link'
import { Loader2, BookOpen, ChevronRight } from 'lucide-react'

interface ProgressEntry {
    track_id: string
    content_id: string
    progress: number
    completed: boolean
}

export default function LearnPage() {
    const [progressMap, setProgressMap] = useState<Map<string, ProgressEntry[]>>(new Map())
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetch = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) { setLoading(false); return }

            const { data } = await supabase
                .from('learning_progress')
                .select('track_id, content_id, progress, completed')
                .eq('student_id', user.id)

            const map = new Map<string, ProgressEntry[]>()
            for (const entry of (data || []) as ProgressEntry[]) {
                const arr = map.get(entry.track_id) || []
                arr.push(entry)
                map.set(entry.track_id, arr)
            }
            setProgressMap(map)
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

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold">학습 교재</h1>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    트랙을 선택하고 교재를 학습하세요
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {learningTracks.map((track) => {
                    const entries = progressMap.get(track.id) || []
                    const completedCount = entries.filter(e => e.completed).length
                    const progressRate = track.totalLessons > 0 ? Math.round((completedCount / track.totalLessons) * 100) : 0

                    return (
                        <Link
                            key={track.id}
                            href={`/dashboard/learn/${track.id}`}
                            className="group rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 block"
                            style={{
                                background: `linear-gradient(135deg, ${track.color}15, ${track.color}05)`,
                                border: '1px solid var(--color-border)',
                            }}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className="text-3xl">{track.icon}</div>
                                <ChevronRight
                                    size={18}
                                    className="group-hover:translate-x-1 transition-transform"
                                    style={{ color: 'var(--color-text-secondary)' }}
                                />
                            </div>
                            <h3 className="font-bold text-lg mb-1">{track.name}</h3>
                            <p className="text-xs mb-3" style={{ color: 'var(--color-text-secondary)' }}>
                                {track.totalLessons}개 레슨 · {completedCount}개 완료
                            </p>

                            {/* Progress Bar */}
                            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                                <div
                                    className="h-full rounded-full transition-all duration-500"
                                    style={{ width: `${progressRate}%`, background: track.color }}
                                />
                            </div>
                            <p className="text-xs mt-1 text-right font-medium" style={{ color: track.color }}>
                                {progressRate}%
                            </p>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}
