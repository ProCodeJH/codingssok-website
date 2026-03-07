'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import {
    Settings,
    User,
    Mail,
    Shield,
    Save,
    Loader2,
    CheckCircle,
    Key,
} from 'lucide-react'

export default function SettingsPage() {
    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [userRole, setUserRole] = useState('')
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [passwordMode, setPasswordMode] = useState(false)
    const [newPassword, setNewPassword] = useState('')
    const [passwordSaving, setPasswordSaving] = useState(false)
    const [passwordMsg, setPasswordMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUserName(user.user_metadata?.name || '')
                setUserEmail(user.email || '')
                setUserRole(user.user_metadata?.role || 'student')
            }
            setLoading(false)
        }
        fetchUser()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const handleSaveProfile = async () => {
        setSaving(true)
        setSaved(false)
        const { error } = await supabase.auth.updateUser({
            data: { name: userName.trim() },
        })
        setSaving(false)
        if (!error) {
            setSaved(true)
            setTimeout(() => setSaved(false), 3000)
        }
    }

    const handleChangePassword = async () => {
        if (newPassword.length < 6) {
            setPasswordMsg({ type: 'error', text: '비밀번호는 6자 이상이어야 합니다.' })
            return
        }
        setPasswordSaving(true)
        setPasswordMsg(null)
        const { error } = await supabase.auth.updateUser({ password: newPassword })
        setPasswordSaving(false)
        if (error) {
            setPasswordMsg({ type: 'error', text: '비밀번호 변경에 실패했습니다.' })
        } else {
            setPasswordMsg({ type: 'success', text: '비밀번호가 변경되었습니다.' })
            setNewPassword('')
            setPasswordMode(false)
            setTimeout(() => setPasswordMsg(null), 3000)
        }
    }

    const roleLabelMap: Record<string, string> = {
        student: '학생',
        teacher: '선생님',
        parent: '학부모',
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 size={32} className="animate-spin" style={{ color: 'var(--color-primary)' }} />
            </div>
        )
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold flex items-center gap-2">
                    <Settings size={24} />
                    설정
                </h1>
                <p className="text-sm mt-1" style={{ color: 'var(--color-text-secondary)' }}>
                    프로필 정보와 계정 설정을 관리하세요
                </p>
            </div>

            {/* Profile Section */}
            <div className="rounded-2xl p-6 mb-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <h2 className="font-bold mb-5 flex items-center gap-2">
                    <User size={18} style={{ color: 'var(--color-primary)' }} />
                    프로필 정보
                </h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--color-text-secondary)' }}>
                            이름
                        </label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl text-sm"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-primary)',
                            }}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 flex items-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
                            <Mail size={14} />
                            이메일
                        </label>
                        <input
                            type="email"
                            value={userEmail}
                            disabled
                            className="w-full px-4 py-2.5 rounded-xl text-sm opacity-50 cursor-not-allowed"
                            style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-primary)',
                            }}
                        />
                        <p className="text-xs mt-1" style={{ color: 'var(--color-text-secondary)' }}>이메일은 변경할 수 없습니다</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1.5 flex items-center gap-1" style={{ color: 'var(--color-text-secondary)' }}>
                            <Shield size={14} />
                            역할
                        </label>
                        <div
                            className="px-4 py-2.5 rounded-xl text-sm inline-block"
                            style={{
                                background: 'rgba(0,102,255,0.1)',
                                color: 'var(--color-primary-light)',
                            }}
                        >
                            {roleLabelMap[userRole] || userRole}
                        </div>
                    </div>
                    <button
                        onClick={handleSaveProfile}
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                        style={{
                            background: saved ? 'rgba(34,197,94,0.15)' : 'var(--gradient-primary)',
                            color: saved ? '#22C55E' : '#fff',
                        }}
                    >
                        {saving ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : saved ? (
                            <CheckCircle size={16} />
                        ) : (
                            <Save size={16} />
                        )}
                        {saving ? '저장 중...' : saved ? '저장 완료!' : '변경사항 저장'}
                    </button>
                </div>
            </div>

            {/* Password Section */}
            <div className="rounded-2xl p-6" style={{ background: 'var(--color-bg-card)', border: '1px solid var(--color-border)' }}>
                <h2 className="font-bold mb-5 flex items-center gap-2">
                    <Key size={18} style={{ color: '#F59E0B' }} />
                    비밀번호 변경
                </h2>
                {passwordMsg && (
                    <div
                        className="mb-4 px-4 py-2.5 rounded-xl text-sm"
                        style={{
                            background: passwordMsg.type === 'success' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                            color: passwordMsg.type === 'success' ? '#22C55E' : '#EF4444',
                        }}
                    >
                        {passwordMsg.text}
                    </div>
                )}
                {!passwordMode ? (
                    <button
                        onClick={() => setPasswordMode(true)}
                        className="px-4 py-2.5 rounded-xl text-sm font-medium transition-all hover:bg-white/5"
                        style={{ border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)' }}
                    >
                        비밀번호 변경하기
                    </button>
                ) : (
                    <div className="space-y-3">
                        <input
                            type="password"
                            placeholder="새 비밀번호 (6자 이상)"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-xl text-sm"
                            style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid var(--color-border)',
                                color: 'var(--color-text-primary)',
                            }}
                        />
                        <div className="flex gap-2">
                            <button
                                onClick={handleChangePassword}
                                disabled={passwordSaving}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium"
                                style={{ background: 'rgba(245,158,11,0.15)', color: '#F59E0B' }}
                            >
                                {passwordSaving ? <Loader2 size={14} className="animate-spin" /> : <Key size={14} />}
                                {passwordSaving ? '변경 중...' : '변경'}
                            </button>
                            <button
                                onClick={() => { setPasswordMode(false); setNewPassword('') }}
                                className="px-4 py-2 rounded-xl text-sm"
                                style={{ color: 'var(--color-text-secondary)' }}
                            >
                                취소
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
