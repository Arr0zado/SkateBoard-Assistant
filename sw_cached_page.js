const cacheName = 'SK8PRO V1';
const cacheAssets = [
  'index.html',
  'css/style.css',
  'js/script.js',
  'js/turbolinks.js',
  'ajax/libs/jquery/3.3.1/jquery.min.js',
  'css?family=Open+Sans:300,400,700&display=swap',
  's/opensans/v18/mem5YaGs126MiZpBA-UN7rgOUuhp.woff2',
  'aos@next/dist/aos.css',
  'aos@next/dist/aos.js',
  'icons/apple-icon-144x144.png',
  'icons/favicon-32x32.png'
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