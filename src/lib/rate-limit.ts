/**
 * 간단한 인메모리 Rate Limiter
 * Upstash Redis를 설정하면 프로덕션용으로 교체 가능
 */

interface RateLimitEntry {
    count: number
    resetTime: number
}

const store = new Map<string, RateLimitEntry>()

// 주기적으로 만료된 엔트리 정리
setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of store) {
        if (now > entry.resetTime) store.delete(key)
    }
}, 60_000)

export function rateLimit(
    key: string,
    { maxRequests = 10, windowMs = 60_000 }: { maxRequests?: number; windowMs?: number } = {}
): { success: boolean; remaining: number } {
    const now = Date.now()
    const entry = store.get(key)

    if (!entry || now > entry.resetTime) {
        store.set(key, { count: 1, resetTime: now + windowMs })
        return { success: true, remaining: maxRequests - 1 }
    }

    entry.count++
    const remaining = Math.max(0, maxRequests - entry.count)

    if (entry.count > maxRequests) {
        return { success: false, remaining: 0 }
    }

    return { success: true, remaining }
}
