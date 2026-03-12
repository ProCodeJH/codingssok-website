import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/dashboard', '/parent', '/teacher/admin']
const LOGIN_PATH = '/login'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 보호된 경로 체크
    const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p))
    if (!isProtected) return NextResponse.next()

    // 클라이언트 사이드 인증 (localStorage) 사용 중이므로
    // 쿠키 기반 세션 토큰으로 서버 사이드 보호
    const authCookie = request.cookies.get('codingssok_session')?.value
    const supabaseAuth = request.cookies.getAll().some(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))

    if (!authCookie && !supabaseAuth) {
        // 인증 정보 없음 → 로그인 페이지로 리다이렉트
        const loginUrl = new URL(LOGIN_PATH, request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*', '/parent/:path*', '/teacher/admin/:path*'],
}
