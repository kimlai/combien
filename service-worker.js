// mostly stolen from
// https://github.com/hankchizljaw/hylia/blob/master/src/_includes/partials/global/service-worker.js
const CACHE = "precache:v0";
const PRE_CACHE_URLS = ["/", "app.js", "app.css", "favicon.ico"];

const addItemsToCache = function(cacheName, items = []) {
  caches.open(cacheName).then(cache => cache.addAll(items));
};

self.addEventListener("install", evt => {
  // do not wait for all tabs of the app to be closed before updating the service worker
  self.skipWaiting();
  addItemsToCache(CACHE, PRE_CACHE_URLS);
});

self.addEventListener("activate", evt => {
  evt.waitUntil(
    caches
      .keys()
      .then(cacheNames => cacheNames.filter(cacheName => cacheName !== CACHE))
      .then(itemsToDelete =>
        Promise.all(itemsToDelete.map(item => caches.delete(item)))
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", evt => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then(cachedResponse => cachedResponse || fetch(evt.request))
  );
});
