import { describe, it, expect } from 'vitest'
import { rateLimit } from '@/lib/rate-limit'

describe('Rate Limiter', () => {
    it('allows requests within limit', () => {
        const key = `test-${Date.now()}`
        const result = rateLimit(key, { maxRequests: 5, windowMs: 10_000 })
        expect(result.success).toBe(true)
        expect(result.remaining).toBe(4)
    })

    it('blocks requests exceeding limit', () => {
        const key = `test-block-${Date.now()}`
        for (let i = 0; i < 5; i++) {
            rateLimit(key, { maxRequests: 5, windowMs: 10_000 })
        }
        const result = rateLimit(key, { maxRequests: 5, windowMs: 10_000 })
        expect(result.success).toBe(false)
        expect(result.remaining).toBe(0)
    })

    it('resets after window expires', async () => {
        const key = `test-reset-${Date.now()}`
        for (let i = 0; i < 3; i++) {
            rateLimit(key, { maxRequests: 3, windowMs: 100 })
        }
        // Wait for window to expire
        await new Promise(resolve => setTimeout(resolve, 150))
        const result = rateLimit(key, { maxRequests: 3, windowMs: 100 })
        expect(result.success).toBe(true)
    })
})
