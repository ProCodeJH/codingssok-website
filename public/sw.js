/* ═══════════════════════════════════
   코딩쏙 Service Worker — 오프라인 지원
   ═══════════════════════════════════ */

const CACHE_NAME = "codingssok-v1";
const OFFLINE_URL = "/offline";

const PRECACHE_URLS = [
    "/",
    "/trial",
    "/offline",
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

// Fetch: network-first, fallback to cache
self.addEventListener("fetch", (event) => {
    if (event.request.mode === "navigate") {
        event.respondWith(
            fetch(event.request).catch(() =>
                caches.match(event.request).then((r) => r || caches.match(OFFLINE_URL))
            )
        );
        return;
    }

    // For other requests: cache-first for static, network-first for API
    if (event.request.url.includes("/api/")) {
        event.respondWith(fetch(event.request));
    } else {
        event.respondWith(
            caches.match(event.request).then((r) => r || fetch(event.request))
        );
    }
});
