var cacheName = 'v1';

var cacheAssets = [
    '../index.html',
    '../script.js',
    '../style.css',
    '../turbolinks.js',
    '../tabs/*',
];

function precache() {
    return caches.open(cacheName).then(function (cache) {
        return cache.addAll(cacheAssets);
    });
}

self.addEventListener('install', function(event) {
    event.waitUntil(precache());
});

addEventListener('fetch', event => {
  event.respondWith(async function() {
      const cachedResponse = await caches.match(event.request);
      if (cachedResponse) return cachedResponse;       
      return fetch(event.request).then(updateCache(event.request));
  }());
});

function updateCache(request) {
  return caches.open(cacheName).then(cache => {
      return fetch(request).then(response => {
          const resClone = response.clone();
          if (response.status < 400)
              return cache.put(request, resClone);
          return response;
      });
  });
}