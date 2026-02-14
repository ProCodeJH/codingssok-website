'use client'

import { useState, useEffect, useRef, useCallback, use } from 'react'
import { createClient } from '@/lib/supabase/client'
import { learningTracks } from '@/lib/actions/learning'
import Link from 'next/link'
import {
    ArrowLeft,
    Loader2,
    CheckCircle2,
    BookOpen,
} from 'lucide-react'

export default function ContentViewerPage({ params }: { params: Promise<{ contentId: string }> }) {
    const { contentId } = use(params)
    const [loading, setLoading] = useState(true)
    const [progress, setProgress] = useState(0)
    const [completed, setCompleted] = useState(false)
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const heartbeatRef = useRef<ReturnType<typeof setInterval> | null>(null)
    const supabase = createClient()

    const track = learningTracks.find(t => t.id === contentId)

    // postMessage 수신
    const handleMessage = useCallback((event: MessageEvent) => {
        if (!event.data || typeof event.data !== 'object') return
        const { type, payload } = event.data

        switch (type) {
            case 'READY':
                // 교재가 로드 완료
                setLoading(false)
                // INIT 보내기
                iframeRef.current?.contentWindow?.postMessage(
                    { type: 'INIT', payload: { progress } },
                    '*'
                )
                break
            case 'PROGRESS':
                if (payload?.progress !== undefined) {
                    setProgress(Math.min(payload.progress, 100))
                    saveProgress(contentId, payload.progress, false)
                }
                break
            case 'COMPLETE':
                setProgress(100)
                setCompleted(true)
                saveProgress(contentId, 100, true)
                break
        }
    }, [contentId, progress]) // eslint-disable-line react-hooks/exhaustive-deps

    const saveProgress = async (cId: string, prog: number, isCompleted: boolean) => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data: existing } = await supabase
            .from('learning_progress')
            .select('id')
            .eq('student_id', user.id)
            .eq('content_id', cId)
            .maybeSingle()

        if (existing) {
            await supabase
                .from('learning_progress')
                .update({
                    progress: Math.min(prog, 100),
                    completed: isCompleted,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', existing.id)
        } else {
            await supabase
                .from('learning_progress')
                .insert({
                    student_id: user.id,
                    content_id: cId,
                    track_id: cId.split('-')[0],
                    progress: Math.min(prog, 100),
                    completed: isCompleted,
                })
        }
    }

    useEffect(() => {
        window.addEventListener('message', handleMessage)

        // 30초 Heartbeat
        heartbeatRef.current = setInterval(() => {
            iframeRef.current?.contentWindow?.postMessage(
                { type: 'HEARTBEAT', payload: { timestamp: Date.now() } },
                '*'
            )
        }, 30000)

        // 기존 진도 로드
        const loadProgress = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) return

            const { data } = await supabase
                .from('learning_progress')
                .select('progress, completed')
                .eq('student_id', user.id)
                .eq('content_id', contentId)
                .maybeSingle()

            if (data) {
                setProgress((data as { progress: number }).progress)
                setCompleted((data as { completed: boolean }).completed)
            }
            // iframe이 로드 안된 경우 대비 타임아웃
            setTimeout(() => setLoading(false), 3000)
        }
        loadProgress()

        return () => {
            window.removeEventListener('message', handleMessage)
            if (heartbeatRef.current) clearInterval(heartbeatRef.current)
        }
    }, [contentId, handleMessage]) // eslint-disable-line react-hooks/exhaustive-deps

    // 교재 URL (실제 배포 시 Supabase Storage 또는 CDN 경로로 변경)
    const contentUrl = `/content/${contentId}/index.html`

    return (
        <div className="h-full flex flex-col">
            {/* Top Bar */}
            <div
                className="flex items-center justify-between px-4 py-3 rounded-xl mb-4"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            >
                <div className="flex items-center gap-3">
                    <Link
                        href="/dashboard/learn"
                        className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
                    >
                        <ArrowLeft size={18} style={{ color: 'var(--color-text-secondary)' }} />
                    </Link>
                    <div className="flex items-center gap-2">
                        <span className="text-xl">{track?.icon || '📚'}</span>
                        <h1 className="font-bold">{track?.name || contentId}</h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {completed && (
                        <span className="flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full" style={{ background: 'rgba(34,197,94,0.15)', color: '#22C55E' }}>
                            <CheckCircle2 size={14} />
                            완료
                        </span>
                    )}
                    <div className="flex items-center gap-2 w-32">
                        <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                            <div
                                className="h-full rounded-full transition-all duration-500"
                                style={{ width: `${progress}%`, background: track?.color || 'var(--color-primary)' }}
                            />
                        </div>
                        <span className="text-xs font-medium whitespace-nowrap" style={{ color: track?.color }}>{progress}%</span>
                    </div>
                </div>
            </div>

            {/* iframe Content */}
            <div
                className="flex-1 rounded-xl overflow-hidden relative"
                style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
            >
                {loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10" style={{ background: 'var(--color-bg-dark)' }}>
                        <Loader2 size={32} className="animate-spin mb-3" style={{ color: 'var(--color-primary)' }} />
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>교재를 불러오는 중...</p>
                    </div>
                )}

                <iframe
                    ref={iframeRef}
                    src={contentUrl}
                    className="w-full h-full border-none"
                    style={{ minHeight: '600px' }}
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    title={track?.name || '교재'}
                />

                {/* Fallback for no content */}
                {!loading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-0" id="no-content-fallback">
                        <BookOpen size={48} className="mb-3" style={{ color: 'var(--color-text-secondary)' }} />
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>교재 콘텐츠를 준비 중입니다</p>
                    </div>
                )}
            </div>
        </div>
    )
}
