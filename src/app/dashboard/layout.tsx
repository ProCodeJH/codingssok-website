'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    LayoutDashboard,
    BookOpen,
    Users,
    FileText,
    Monitor,
    Settings,
    LogOut,
    Menu,
    X,
    GraduationCap,
    BarChart3,
    ClipboardList,
    Code2,
    ChevronRight,
} from 'lucide-react'

interface NavItem {
    label: string
    href: string
    icon: React.ReactNode
}

const studentNav: NavItem[] = [
    { label: '대시보드', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: '내 수업', href: '/dashboard/classes', icon: <BookOpen size={20} /> },
    { label: '숙제', href: '/dashboard/homework', icon: <ClipboardList size={20} /> },
    { label: '학습 교재', href: '/dashboard/learning', icon: <GraduationCap size={20} /> },
    { label: 'C-Studio', href: '/dashboard/cstudio', icon: <Code2 size={20} /> },
]

const teacherNav: NavItem[] = [
    { label: '대시보드', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: '반 관리', href: '/dashboard/classes', icon: <Users size={20} /> },
    { label: '수업 기록', href: '/dashboard/sessions', icon: <FileText size={20} /> },
    { label: '숙제 관리', href: '/dashboard/homework', icon: <ClipboardList size={20} /> },
    { label: '학습 현황', href: '/dashboard/analytics', icon: <BarChart3 size={20} /> },
    { label: 'PC 관리', href: '/dashboard/pc', icon: <Monitor size={20} /> },
    { label: '설정', href: '/dashboard/settings', icon: <Settings size={20} /> },
]

const parentNav: NavItem[] = [
    { label: '대시보드', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
    { label: '자녀 학습 현황', href: '/dashboard/children', icon: <BarChart3 size={20} /> },
    { label: '수업 일지', href: '/dashboard/sessions', icon: <FileText size={20} /> },
]

function getNavByRole(role: string | null): NavItem[] {
    switch (role) {
        case 'teacher': return teacherNav
        case 'parent': return parentNav
        default: return studentNav
    }
}

function getRoleBadge(role: string | null) {
    switch (role) {
        case 'teacher':
            return { label: '선생님', color: '#10B981', bg: 'rgba(16,185,129,0.1)' }
        case 'parent':
            return { label: '학부모', color: '#7C3AED', bg: 'rgba(124,58,237,0.1)' }
        default:
            return { label: '학생', color: '#0066FF', bg: 'rgba(0,102,255,0.1)' }
    }
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userName, setUserName] = useState<string | null>(null)
    const [userRole, setUserRole] = useState<string | null>(null)
    const router = useRouter()
    const pathname = usePathname()
    const supabase = createClient()

    useEffect(() => {
        const fetchUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUserName(user.user_metadata?.name || user.email?.split('@')[0] || '사용자')
                setUserRole(user.user_metadata?.role || 'student')
            }
        }
        fetchUser()
    }, [supabase])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.push('/')
        router.refresh()
    }

    const navItems = getNavByRole(userRole)
    const roleBadge = getRoleBadge(userRole)

    return (
        <div className="min-h-screen flex" style={{ background: 'var(--color-bg-dark)' }}>
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 md:hidden"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:z-auto ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                style={{
                    background: 'var(--color-bg-card)',
                    borderRight: '1px solid var(--color-border)',
                }}
            >
                {/* Sidebar Header */}
                <div className="h-16 flex items-center justify-between px-5"
                    style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <Link href="/" className="flex items-center gap-2">
                        <span className="text-xl font-black font-display gradient-text">코딩쏙</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="md:hidden p-1 rounded-lg hover:bg-white/5"
                    >
                        <X size={20} style={{ color: 'var(--color-text-secondary)' }} />
                    </button>
                </div>

                {/* User Info */}
                <div className="px-5 py-4" style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                            style={{ background: 'var(--gradient-primary)' }}>
                            {userName?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                        <div className="min-w-0 flex-1">
                            <p className="font-semibold text-sm truncate">{userName || '로딩 중...'}</p>
                            <span
                                className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mt-1"
                                style={{ color: roleBadge.color, background: roleBadge.bg }}
                            >
                                {roleBadge.label}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSidebarOpen(false)}
                                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
                                style={{
                                    background: isActive ? 'rgba(0,102,255,0.1)' : 'transparent',
                                    color: isActive ? 'var(--color-primary-light)' : 'var(--color-text-secondary)',
                                    borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
                                }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                                {isActive && <ChevronRight size={16} className="ml-auto" />}
                            </Link>
                        )
                    })}
                </nav>

                {/* Logout */}
                <div className="px-3 py-4" style={{ borderTop: '1px solid var(--color-border)' }}>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium w-full transition-all duration-200 hover:bg-red-500/10"
                        style={{ color: 'var(--color-accent-red)' }}
                    >
                        <LogOut size={20} />
                        <span>로그아웃</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-h-screen">
                {/* Top Header */}
                <header
                    className="h-16 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30"
                    style={{
                        background: 'rgba(10,10,15,0.8)',
                        backdropFilter: 'blur(20px)',
                        borderBottom: '1px solid var(--color-border)',
                    }}
                >
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="md:hidden p-2 rounded-lg hover:bg-white/5"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="hidden md:block">
                        <h2 className="text-lg font-bold">
                            {navItems.find(item => item.href === pathname)?.label || '대시보드'}
                        </h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                            {userName}
                        </span>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                            style={{ background: 'var(--gradient-primary)' }}>
                            {userName?.charAt(0)?.toUpperCase() || '?'}
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    )
}
