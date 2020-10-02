const cacheName = 'SK8PRO V1';
const cacheAssets = [
  'https://www.sk8pro.tk',
  'https://www.sk8pro.tk/index.html',
  'https://www.sk8pro.tk/tricks',
  'https://www.sk8pro.tk/news',
  'https://www.sk8pro.tk/settings',
  'https://www.sk8pro.tk/chat',
  'https://www.sk8pro.tk/fonts/DroidSans-Bold.ttf',
  'https://www.sk8pro.tk/css/style.css',
  'https://www.sk8pro.tk/js/script.js',
  'https://www.sk8pro.tk/js/turbolinks.js',
  'https://www.sk8pro.tk/js/manifest.json',
  'https://www.sk8pro.tk/icons/apple-icon-144x144.png',
  'https://www.sk8pro.tk/images/banner.jpg',
  'https://www.sk8pro.tk/icons/favicon-32x32.png'
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