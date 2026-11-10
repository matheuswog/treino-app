const CACHE_NAME = 'treino-matheus-v6';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './img/adutora.jpg',
  './img/crossover.jpg',
  './img/desenvolvimento.jpg',
  './img/elevacao-lateral-halteres.jpg',
  './img/elevacao-lateral.jpg',
  './img/extensora.jpg',
  './img/face-pull.jpg',
  './img/flexora-sentada.jpg',
  './img/flexora.jpg',
  './img/leg-press.jpg',
  './img/panturrilha-leg-press.jpg',
  './img/panturrilha.jpg',
  './img/paralela-maquina.jpg',
  './img/pec-deck.jpg',
  './img/pulldown-bracos-estendidos.jpg',
  './img/puxada-alta.jpg',
  './img/puxada-triangulo.jpg',
  './img/remada-baixa.jpg',
  './img/remada-maquina.jpg',
  './img/remada-unilateral.jpg',
  './img/rosca-direta.jpg',
  './img/rosca-martelo.jpg',
  './img/rosca-scott.jpg',
  './img/supino-halteres.jpg',
  './img/supino-inclinado.jpg',
  './img/supino-maquina.jpg',
  './img/supino-smith.jpg',
  './img/triceps-corda.jpg',
  './img/triceps-testa.jpg'
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
