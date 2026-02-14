'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogIn, Mail, Lock, ArrowRight } from 'lucide-react'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            })

            if (error) {
                setError('이메일 또는 비밀번호가 올바르지 않습니다.')
                return
            }

            router.push('/dashboard')
            router.refresh()
        } catch {
            setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'var(--color-bg-dark)' }}>
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20"
                    style={{ background: 'radial-gradient(circle, rgba(0,102,255,0.3) 0%, transparent 70%)' }} />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15"
                    style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.3) 0%, transparent 70%)' }} />
            </div>

            <div className="w-full max-w-md relative z-10">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <h1 className="text-3xl font-black font-display gradient-text">코딩쏙</h1>
                    </Link>
                    <p className="mt-2" style={{ color: 'var(--color-text-secondary)' }}>
                        통합 학습 플랫폼에 로그인하세요
                    </p>
                </div>

                {/* Login Card */}
                <div className="glass-premium rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                            style={{ background: 'var(--gradient-primary)' }}>
                            <LogIn size={20} className="text-white" />
                        </div>
                        <h2 className="text-xl font-bold">로그인</h2>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
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
                                    style={{
                                        borderColor: 'var(--color-border)',
                                        background: 'rgba(255,255,255,0.03)',
                                    }}
                                />
                            </div>
                        </div>

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
                                    placeholder="비밀번호를 입력하세요"
                                    required
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border bg-transparent text-white placeholder:text-gray-500 focus:outline-none"
                                    style={{
                                        borderColor: 'var(--color-border)',
                                        background: 'rgba(255,255,255,0.03)',
                                    }}
                                />
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
                                    로그인
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                        아직 계정이 없으신가요?{' '}
                        <Link href="/signup" className="font-semibold hover:underline" style={{ color: 'var(--color-accent-cyan)' }}>
                            회원가입
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
