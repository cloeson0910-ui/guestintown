const CACHE_NAME = 'guest-staff-v2';

const FILES_TO_CACHE = [
  './login.html',
  './dashboard.html',
  './task.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});

self.addEventListener('push', event => {
  let data = {
    title: 'Guest in Town',
    body: 'Nuova notifica staff',
    url: './dashboard.html'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || 'Nuova attività disponibile',
    icon: './icon-192.png',
    badge: './icon-192.png',
    data: {
      url: data.url || './dashboard.html'
    }
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'Guest in Town',
      options
    )
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const targetUrl =
    event.notification.data?.url || './dashboard.html';

  event.waitUntil(
    clients
      .matchAll({
        type: 'window',
        includeUncontrolled: true
      })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url.includes('/staff/') && 'focus' in client) {
            client.navigate(targetUrl);
            return client.focus();
          }
        }

        if (clients.openWindow) {
          return clients.openWindow(targetUrl);
        }
      })
  );
});
