---
name: security-review
description: 보안 체크리스트 및 패턴
---

# Security Review Skill

## When to Activate
- 인증/권한 구현 시
- 사용자 입력 처리 시
- API 엔드포인트 생성 시

## Security Headers
```typescript
// next.config.ts
headers: [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
]
```

## Checklist
- [ ] 하드코딩된 시크릿 없음
- [ ] 모든 입력 검증
- [ ] SQL 인젝션 방지
- [ ] XSS 방지
