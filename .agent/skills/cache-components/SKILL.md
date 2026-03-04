---
name: cache-components
description: Next.js Cache Components & PPR
---

# Cache Components Skill

## Key APIs
- `'use cache'` - 캐시 디렉티브
- `cacheLife()` - 캐시 수명 설정
- `cacheTag()` - 태그 기반 무효화
- `revalidateTag()` - 온디맨드 재검증

## Pattern
```typescript
async function CachedComponent() {
  'use cache';
  cacheLife('hours');
  
  const data = await fetchData();
  return <div>{data}</div>;
}
```
