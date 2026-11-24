// FootIQ: service worker kapatıcı.
// Eski sürümler bir service worker ile kendini önbelleğe alıyordu; yeni sürüm
// çıksa bile oyuncu eskisini görüyordu. Bu dosya eski önbelleği siler, kendini
// kaldırır ve açık sekmeleri bir kez yeniler. Sonrasında site normal web sayfası
// gibi yüklenir (GitHub Pages önbelleği en fazla 10 dk).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
