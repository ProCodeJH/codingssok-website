import { NextResponse, type NextRequest } from 'next/server'

const PROTECTED_PATHS = ['/dashboard', '/parent', '/teacher/admin']
const LOGIN_PATH = '/login'

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl

    // 보호된 경로 체크
    const isProtected = PROTECTED_PATHS.some(p => pathname.startsWith(p))
    if (!isProtected) return NextResponse.next()

    // 쿠키 기반 인증 체크
    const authCookie = request.cookies.get('codingssok_session')?.value
    const supabaseAuth = request.cookies.getAll().some(c => c.name.startsWith('sb-') && c.name.endsWith('-auth-token'))

    if (!authCookie && !supabaseAuth) {
        const loginUrl = new URL(LOGIN_PATH, request.url)
        loginUrl.searchParams.set('redirect', pathname)
        return NextResponse.redirect(loginUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
