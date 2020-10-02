const cacheName = 'SK8PRO V1';
const cacheAssets = [
  '/',
  'tabs/tricks.html',
  'tabs/news.html',
  'tabs/settings.html',
  'tabs/chat.html',
  'fonts/OpenSans-Regular.ttf',
  'css/style.css',
  'js/script.js',
  'js/turbolinks.js',
  'icons/apple-icon-144x144.png',
  'icons/favicon-32x32.png',
];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});