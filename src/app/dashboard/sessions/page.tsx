'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getMyClasses } from '@/lib/actions/classes'
import { getSessionsByClass } from '@/lib/actions/sessions'
import {
    FileText,
    Loader2,
    Calendar,
    BookOpen,
    ChevronDown,
} from 'lucide-react'

interface ClassItem {
    id: string
    name: string
}

interface SessionLog {
    id: string
    date: string
    content: string
    created_at: string
}

export default function SessionsPage() {
    const [classes, setClasses] = useState<ClassItem[]>([])
    const [selectedClassId, setSelectedClassId] = useState<string>('')
    const [sessions, setSessions] = useState<SessionLog[]>([])
    const [loading, setLoading] = useState(true)
    const [sessionsLoading, setSessionsLoading] = useState(false)
    const [userRole, setUserRole] = useState<string>('student')
    const supabase = createClient()

    useEffect(() => {
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUserRole(user.user_metadata?.role || 'student')
            }
            const result = await getMyClasses()
            const classList = (result.data || []) as ClassItem[]
            setClasses(classList)
            if (classList.length > 0) {
                setSelectedClassId(classList[0].id)
            }
            setLoading(false)
        }
        init()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (!selectedClassId) return
        const fetchSessions = async () => {
            setSessionsLoading(true)
            const result = await getSessionsByClass(selectedClassId)
            setSessions((result.data || []) as SessionLog[])
            setSessionsLoading(false)
        }
        fetchSessions()
    }, [selectedClassId])

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <FileText size={24} />
                        수업 기록
                    </h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                        {userRole === 'teacher' ? '반별 수업 일지를 확인하세요' : '수업 진행 내용을 확인하세요'}
                    </p>
                </div>
            </div>

            {classes.length === 0 ? (
                <div className="text-center py-20 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <BookOpen size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
                    <p className="text-lg font-medium mb-2">소속된 반이 없습니다</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        반에 등록되면 수업 기록을 확인할 수 있습니다
                    </p>
                </div>
            ) : (
                <>
                    {/* Class Selector */}
                    <div className="mb-6 relative inline-block">
                        <select
                            value={selectedClassId}
                            onChange={(e) => setSelectedClassId(e.target.value)}
                            className="appearance-none px-4 py-2.5 pr-10 rounded-xl text-sm font-medium cursor-pointer"
                            style={{
                                background: 'var(--color-bg-card)',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-primary)',
                            }}
                        >
                            {classes.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'var(--color-text-secondary)' }} />
                    </div>

                    {/* Sessions List */}
                    {sessionsLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 size={24} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
                        </div>
                    ) : sessions.length === 0 ? (
                        <div className="text-center py-16 rounded-2xl" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                            <Calendar size={40} className="mx-auto mb-3" style={{ color: 'var(--color-text-secondary)' }} />
                            <p className="font-medium mb-1">수업 기록이 없습니다</p>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                아직 등록된 수업 기록이 없습니다
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {sessions.map((session) => (
                                <div
                                    key={session.id}
                                    className="rounded-xl p-5 transition-all hover:-translate-y-0.5"
                                    style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                                >
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                                            style={{ background: 'rgba(0,102,255,0.1)' }}
                                        >
                                            <Calendar size={18} style={{ color: 'var(--color-primary)' }} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-sm font-bold" style={{ color: 'var(--color-primary-light)' }}>
                                                    {session.date}
                                                </span>
                                            </div>
                                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                                                {session.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
