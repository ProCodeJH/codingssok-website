---
name: tdd-workflow
description: 테스트 주도 개발 (80%+ 커버리지)
---

# TDD Workflow Skill

## Core Principles
1. **Tests BEFORE Code** - 테스트 먼저 작성
2. **80%+ Coverage** - 단위/통합/E2E 테스트
3. **Red-Green-Refactor** - TDD 사이클

## Test Patterns
```typescript
// Unit Test (Jest/Vitest)
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
```
