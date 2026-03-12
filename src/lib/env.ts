/**
 * 환경변수 검증 — 빌드/런타임 시 필수 환경변수 존재 확인
 */

function requireEnv(name: string): string {
    const value = process.env[name]
    if (!value) {
        // 빌드 시 정적 렌더링 중에는 환경변수가 없을 수 있음 (client component)
        if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
            return ''
        }
        throw new Error(
            `환경변수 ${name}이(가) 설정되지 않았습니다. .env.local 파일을 확인해주세요.`
        )
    }
    return value
}

export const env = {
    get SUPABASE_URL() {
        return requireEnv('NEXT_PUBLIC_SUPABASE_URL')
    },
    get SUPABASE_ANON_KEY() {
        return requireEnv('NEXT_PUBLIC_SUPABASE_ANON_KEY')
    },
}
