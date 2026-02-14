'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { UserPlus, Mail, Lock, User, ArrowRight, GraduationCap, Users } from 'lucide-react'

type Role = 'student' | 'parent'

export default function SignUpPage() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState<Role>('student')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        if (password.length < 6) {
            setError('비밀번호는 6자 이상이어야 합니다.')
            setLoading(false)
            return
        }

        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name,
                        role,
                    },
                },
            })

            if (error) {
                if (error.message.includes('already registered')) {
                    setError('이미 가입된 이메일입니다.')
                } else {
                    setError('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.')
                }
                return
            }

            router.push('/dashboard')
            router.refresh()
        } catch {
            setError('회원가입 중 오류가 발생했습니다.')
        } finally {
            setLoading(false)
        }
    }

    const roles: { value: Role; label: string; desc: string; icon: React.ReactNode }[] = [
        {
            value: 'student',
            label: '학생',
            desc: '수업, 숙제, 교재 학습',
            icon: <GraduationCap size={20} />,
        },
        {
            value: 'parent',
            label: '학부모',
            desc: '자녀 학습 현황 확인',
            icon: <Users size={20} />,
        },
    ]

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: 'var(--color-bg-dark)' }}>
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.3) 0%, transparent 70%)' }} />
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full opacity-15"
                    style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.3) 0%, transparent 70%)' }} />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-3xl font-black font-display gradient-text">코딩쏙</h1>
                    </Link>
                    <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                        새 계정을 만들어 학습을 시작하세요
                    </p>
                </div>

                {/* Signup Card */}
                <div className="glass-premium rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'linear-gradient(135deg, #00E5FF, #7C3AED)' }}>
                            <UserPlus size={20} className="text-white" />
                        </div>
                        <h2 className="text-xl font-bold">회원가입</h2>
                    </div>

                    <form onSubmit={handleSignUp} className="space-y-4">
                        {/* Name */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                이름
                            </label>
                            <div className="relative">
                                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2"
                                    style={{ color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="이름을 입력하세요"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                    style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                이메일
                            </label>
                            <div className="relative">
                                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2"
                                    style={{ color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="이메일을 입력하세요"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                    style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                비밀번호
                            </label>
                            <div className="relative">
                                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2"
                                    style={{ color: 'var(--color-text-secondary)' }} />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="6자 이상 비밀번호"
                                    required
                                    minLength={6}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                    style={{ borderColor: 'var(--color-border)', background: 'rgba(255,255,255,0.03)' }}
                                />
                            </div>
                        </div>

                        {/* Role Selector */}
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-text-secondary)' }}>
                                역할 선택
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {roles.map((r) => (
                                    <button
                                        key={r.value}
                                        type="button"
                                        onClick={() => setRole(r.value)}
                                        className="p-3 rounded-xl border text-left transition-all duration-200"
                                        style={{
                                            borderColor: role === r.value ? 'var(--color-primary)' : 'var(--color-border)',
                                            background: role === r.value ? 'rgba(0,102,255,0.1)' : 'rgba(255,255,255,0.02)',
                                            boxShadow: role === r.value ? '0 0 20px rgba(0,102,255,0.15)' : 'none',
                                        }}
                                    >
                                        <div className="flex items-center gap-2 mb-1" style={{ color: role === r.value ? 'var(--color-primary)' : 'var(--color-text-secondary)' }}>
                                            {r.icon}
                                            <span className="font-semibold text-white text-sm">{r.label}</span>
                                        </div>
                                        <p className="text-xs" style={{ color: 'var(--color-text-secondary)' }}>{r.desc}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg text-sm" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full justify-center group"
                        >
                            {loading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    회원가입
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        이미 계정이 있으신가요?{' '}
                        <Link href="/login" className="font-semibold hover:underline" style={{ color: 'var(--color-accent-cyan)' }}>
                            로그인
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
