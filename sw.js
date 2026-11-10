const CACHE_NAME = 'treino-matheus-v5';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './img/supino-inclinado.jpg',
  './img/supino-maquina.jpg',
  './img/pec-deck.jpg',
  './img/elevacao-lateral.jpg',
  './img/desenvolvimento.jpg',
  './img/triceps-corda.jpg',
  './img/triceps-testa.jpg',
  './img/agachamento.jpg',
  './img/leg-press.jpg',
  './img/extensora.jpg',
  './img/flexora.jpg',
  './img/panturrilha.jpg',
  './img/abdominal.jpg',
  './img/prancha.jpg',
  './img/puxada-alta.jpg',
  './img/remada-baixa.jpg',
  './img/face-pull.jpg',
  './img/rosca-direta.jpg',
  './img/rosca-martelo.jpg',
  './img/rosca-scott.jpg'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys
          .filter(function (key) { return key !== CACHE_NAME; })
          .map(function (key) { return caches.delete(key); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(function (cached) {
      const fetchPromise = fetch(event.request)
        .then(function (networkResponse) {
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, networkResponse.clone());
          });
          return networkResponse;
        })
        .catch(function () { return cached; });
      return cached || fetchPromise;
    })
  );
});
