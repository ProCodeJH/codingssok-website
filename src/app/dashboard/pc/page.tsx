'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    Monitor,
    ExternalLink,
    Wifi,
    WifiOff,
    Settings,
} from 'lucide-react'

export default function PCManagementPage() {
    const [viewMode, setViewMode] = useState<'embed' | 'link'>('link')

    // PC 관리 시스템 URL (실 배포 시 변경)
    const pcDashboardUrl = process.env.NEXT_PUBLIC_PC_DASHBOARD_URL || 'http://localhost:3001'

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Monitor size={24} />
                        PC 관리
                    </h1>
                    <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                        학원 PC 상태를 모니터링하고 관리하세요
                    </p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('link')}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                            background: viewMode === 'link' ? 'rgba(0,102,255,0.15)' : 'transparent',
                            color: viewMode === 'link' ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                        }}
                    >
                        카드 보기
                    </button>
                    <button
                        onClick={() => setViewMode('embed')}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                        style={{
                            background: viewMode === 'embed' ? 'rgba(0,102,255,0.15)' : 'transparent',
                            color: viewMode === 'embed' ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                        }}
                    >
                        전체 보기
                    </button>
                </div>
            </div>

            {viewMode === 'embed' ? (
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)', minHeight: '700px' }}
                >
                    <iframe
                        src={pcDashboardUrl}
                        className="w-full border-none"
                        style={{ minHeight: '700px' }}
                        title="PC 관리 대시보드"
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* 요약 카드 */}
                    <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.05))', border: '1px solid var(--color-border)' }}>
                        <div className="flex items-center gap-2 mb-3">
                            <Wifi size={20} style={{ color: '#10B981' }} />
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>온라인 PC</span>
                        </div>
                        <p className="text-3xl font-bold mb-1">—</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>Supabase 연결 후 실시간 표시</p>
                    </div>

                    <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))', border: '1px solid var(--color-border)' }}>
                        <div className="flex items-center gap-2 mb-3">
                            <WifiOff size={20} style={{ color: '#EF4444' }} />
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>오프라인 PC</span>
                        </div>
                        <p className="text-3xl font-bold mb-1">—</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>PC 관리 시스템 연동 필요</p>
                    </div>

                    <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(124,58,237,0.05))', border: '1px solid var(--color-border)' }}>
                        <div className="flex items-center gap-2 mb-3">
                            <Settings size={20} style={{ color: '#7C3AED' }} />
                            <span className="text-sm font-medium" style={{ color: 'var(--color-text-secondary)' }}>최근 작업</span>
                        </div>
                        <p className="text-3xl font-bold mb-1">—</p>
                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>원격 명령 실행 기록</p>
                    </div>

                    {/* 외부 대시보드 링크 */}
                    <Link
                        href={pcDashboardUrl}
                        target="_blank"
                        className="col-span-full rounded-xl p-6 flex items-center justify-between hover:-translate-y-0.5 transition-all block"
                        style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}
                    >
                        <div>
                            <h3 className="font-bold mb-1">PC 관리 대시보드 열기</h3>
                            <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                전체 PC 관리 시스템으로 이동합니다
                            </p>
                        </div>
                        <ExternalLink size={20} style={{ color: 'var(--color-primary)' }} />
                    </Link>
                </div>
            )}
        </div>
    )
}
