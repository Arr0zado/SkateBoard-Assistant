


/* SERVICE WORKER INDIANO QUE SUPOSTAMENTE FUNCIONA 80%*/
const cacheName = 'v1';

// define the items

const cacheAssets = [
  "https://www.sk8pro.tk/index.html",
  "https://www.sk8pro.tk/tabs/tricks.html",
  "https://www.sk8pro.tk/css/style.css",
  "https://www.sk8pro.tk/js/script.js"
];

// call install event of service worker

self.addEventListener('install', () => {
  console.log("Service Worker Installed");

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log("Service Worker : Caching Files");
        cache.addAll(cacheAssets);
      })
    .then(() => self.skipWaiting())
  );
});

// call activate event of service worker

self.addEventListener('activate', e => {
  console.log("Service Worker Activated")

  //Remove the old caches

  e.waitUntil(
    caches.keys.map(cache => {
      if (cache !== cacheName) {
        console.log("Service Worker: Clearing Old Cache")
        return caches.delete(cache);
      }
    })
  )
})

//call fetch event 

self.addEventListener('fetch', e => {
  console.log("Service Worker Fetching");

  e.respondWith(fetch(e.request).catch(() => {
    caches.match(e.request);
  }))
})