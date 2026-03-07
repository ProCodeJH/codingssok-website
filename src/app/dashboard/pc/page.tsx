'use client'

import { useState, useEffect } from 'react'
import { getPCStatus, getRecentPCActivity } from '@/lib/actions/pc'
import {
    Monitor,
    Wifi,
    WifiOff,
    Lock,
    Loader2,
    Activity,
    RefreshCw,
} from 'lucide-react'

interface PC {
    id: string
    pc_name: string
    student_id: string | null
    ip_address: string | null
    status: 'online' | 'offline' | 'locked'
    last_screenshot_at: string | null
}

interface ActivityLog {
    id: string
    event_type: string
    app_name: string | null
    url: string | null
    created_at: string
    pc_sessions: { pc_name: string } | null
}

export default function PCManagementPage() {
    const [pcs, setPcs] = useState<PC[]>([])
    const [summary, setSummary] = useState({ online: 0, offline: 0, locked: 0, total: 0 })
    const [logs, setLogs] = useState<ActivityLog[]>([])
    const [loading, setLoading] = useState(true)
    const [refreshing, setRefreshing] = useState(false)

    const fetchData = async () => {
        const [pcResult, logResult] = await Promise.all([
            getPCStatus(),
            getRecentPCActivity(),
        ])
        if (pcResult.data) {
            setPcs(pcResult.data.pcs as PC[])
            setSummary(pcResult.data.summary)
        }
        setLogs((logResult.data || []) as ActivityLog[])
        setLoading(false)
        setRefreshing(false)
    }

    useEffect(() => { fetchData() }, [])

    const handleRefresh = () => {
        setRefreshing(true)
        fetchData()
    }

    const statusIcon = (status: string) => {
        switch (status) {
            case 'online': return <Wifi size={16} style={{ color: '#22C55E' }} />
            case 'locked': return <Lock size={16} style={{ color: '#F59E0B' }} />
            default: return <WifiOff size={16} style={{ color: '#6B7280' }} />
        }
    }

    const statusColor = (status: string) => {
        switch (status) {
            case 'online': return '#22C55E'
            case 'locked': return '#F59E0B'
            default: return '#6B7280'
        }
    }

    const statusLabel = (status: string) => {
        switch (status) {
            case 'online': return '온라인'
            case 'locked': return '잠김'
            default: return '오프라인'
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
        )
    }

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
                <button
                    onClick={handleRefresh}
                    disabled={refreshing}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                    style={{ border: '1px solid var(--color-border)' }}
                >
                    <RefreshCw size={16} className={refreshing ? 'animate-spin' : ''} />
                    새로고침
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
                <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.15), rgba(34,197,94,0.05))', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Wifi size={20} style={{ color: '#22C55E' }} />
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>온라인</span>
                    </div>
                    <p className="text-3xl font-bold">{summary.online}<span className="text-sm font-normal ml-1" style={{ color: 'var(--color-text-secondary)' }}>대</span></p>
                </div>
                <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(107,114,128,0.15), rgba(107,114,128,0.05))', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <WifiOff size={20} style={{ color: '#6B7280' }} />
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>오프라인</span>
                    </div>
                    <p className="text-3xl font-bold">{summary.offline}<span className="text-sm font-normal ml-1" style={{ color: 'var(--color-text-secondary)' }}>대</span></p>
                </div>
                <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.15), rgba(245,158,11,0.05))', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Lock size={20} style={{ color: '#F59E0B' }} />
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>잠김</span>
                    </div>
                    <p className="text-3xl font-bold">{summary.locked}<span className="text-sm font-normal ml-1" style={{ color: 'var(--color-text-secondary)' }}>대</span></p>
                </div>
                <div className="rounded-xl p-5" style={{ background: 'linear-gradient(135deg, rgba(0,102,255,0.15), rgba(0,102,255,0.05))', border: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-2 mb-2">
                        <Monitor size={20} style={{ color: '#3B82F6' }} />
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>전체</span>
                    </div>
                    <p className="text-3xl font-bold">{summary.total}<span className="text-sm font-normal ml-1" style={{ color: 'var(--color-text-secondary)' }}>대</span></p>
                </div>
            </div>

            {/* PC Grid */}
            {pcs.length === 0 ? (
                <div className="text-center py-16 rounded-2xl mb-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                    <Monitor size={48} className="mx-auto mb-4" style={{ color: 'var(--color-text-secondary)' }} />
                    <p className="text-lg font-medium mb-2">등록된 PC가 없습니다</p>
                    <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        PC 관리 시스템에서 PC를 등록하면 여기에 표시됩니다
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
                    {pcs.map(pc => (
                        <div
                            key={pc.id}
                            className="rounded-xl p-4 text-center transition-all hover:-translate-y-0.5"
                            style={{
                                background: 'var(--color-bg-card)',
                                border: `1px solid ${statusColor(pc.status)}30`,
                            }}
                        >
                            <div className="flex justify-center mb-2">
                                {statusIcon(pc.status)}
                            </div>
                            <p className="text-sm font-bold mb-1 truncate">{pc.pc_name}</p>
                            <span
                                className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                                style={{
                                    background: `${statusColor(pc.status)}15`,
                                    color: statusColor(pc.status),
                                }}
                            >
                                {statusLabel(pc.status)}
                            </span>
                            {pc.ip_address && (
                                <p className="text-[10px] mt-1 font-mono" style={{ color: 'var(--color-text-secondary)' }}>
                                    {pc.ip_address}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Recent Activity */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <div className="px-6 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <h2 className="font-bold flex items-center gap-2">
                        <Activity size={18} style={{ color: 'var(--color-accent-cyan)' }} />
                        최근 활동
                    </h2>
                </div>
                {logs.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>최근 활동 기록이 없습니다</p>
                    </div>
                ) : (
                    <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                        {logs.map(log => (
                            <div key={log.id} className="px-6 py-3 flex items-center gap-4 hover:bg-white/[0.02]">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: 'rgba(0,102,255,0.1)', color: 'var(--color-primary)' }}>
                                            {log.pc_sessions?.pc_name || '—'}
                                        </span>
                                        <span className="text-sm font-medium">{log.event_type}</span>
                                    </div>
                                    {log.app_name && (
                                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{log.app_name}</p>
                                    )}
                                </div>
                                <span className="text-xs flex-shrink-0" style={{ color: 'var(--color-text-secondary)' }}>
                                    {new Date(log.created_at).toLocaleString('ko-KR', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
