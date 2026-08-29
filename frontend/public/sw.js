self.addEventListener('install', (e) => {
  // Force the new service worker to activate immediately
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    // Delete all old caches
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Take control of all pages immediately
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Always fetch from the network (bypassing cache)
  e.respondWith(
    fetch(e.request).catch(() => {
      return new Response("Network error occurred");
    })
  );
});
