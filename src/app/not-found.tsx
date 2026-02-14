import Link from 'next/link'

export default function NotFound() {
    return (
        <div
            className="min-h-screen flex items-center justify-center"
            style={{ background: 'var(--color-bg-dark)' }}
        >
            <div className="text-center max-w-md mx-auto px-4">
                {/* Glitch effect number */}
                <div className="relative mb-6">
                    <h1
                        className="text-[120px] font-black leading-none select-none"
                        style={{
                            background: 'var(--gradient-primary)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            opacity: 0.8,
                        }}
                    >
                        404
                    </h1>
                </div>

                <h2 className="text-2xl font-bold mb-3">페이지를 찾을 수 없습니다</h2>
                <p className="text-sm mb-8" style={{ color: 'var(--color-text-secondary)' }}>
                    요청하신 페이지가 존재하지 않거나 이동되었습니다.
                </p>

                <div className="flex gap-3 justify-center">
                    <Link
                        href="/"
                        className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                        style={{ background: 'var(--gradient-primary)', color: '#fff' }}
                    >
                        홈으로 이동
                    </Link>
                    <Link
                        href="/dashboard"
                        className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:-translate-y-0.5"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--color-border)' }}
                    >
                        대시보드
                    </Link>
                </div>
            </div>
        </div>
    )
}
