/* ═══════════════════════════════════
   코딩쏙 Service Worker — 오프라인 지원
   ═══════════════════════════════════ */

const CACHE_NAME = "codingssok-v2";
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
    "/",
];

// Install: pre-cache shell
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
    );
    self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
        )
    );
    self.clients.claim();
});

// Fetch: only handle same-origin requests
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // Skip external requests (fonts, CDN, etc.) — let browser handle directly
    if (url.origin !== self.location.origin) return;

    // Skip API requests
    if (url.pathname.startsWith("/api/")) return;

    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(() =>
                caches.match(event.request).then((r) => r || caches.match(OFFLINE_URL))
            )
        );
        return;
    }

    // Same-origin static: cache-first
    event.respondWith(
        caches.match(event.request).then((r) => r || fetch(event.request))
    );
});
