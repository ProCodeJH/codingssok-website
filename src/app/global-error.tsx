"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
          <h2>문제가 발생했습니다</h2>
          <button onClick={() => reset()} style={{ marginTop: 16, padding: "8px 24px", cursor: "pointer" }}>
            다시 시도
          </button>
        </div>
      </body>
    </html>
  );
}
