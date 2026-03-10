import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    // Auth는 클라이언트 사이드 AuthContext (localStorage)에서 처리됨
    // 서버 사이드 Supabase Auth 세션 체크 불필요
    return NextResponse.next({ request })
}
