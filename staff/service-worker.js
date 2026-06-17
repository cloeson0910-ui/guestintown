self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
  let data = {
    title: 'Guest in Town',
    body: 'Nuova attività staff',
    url: './dashboard.html'
  };

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Guest in Town', {
      body: data.body || 'Nuova attività disponibile',
      icon: './icon-192.png',
      badge: './icon-192.png',
      data: {
        url: data.url || './dashboard.html'
      }
    })
  );
});

self.addEventListener('notificationclick', event => {
  event.notification.close();

  const targetUrl = event.notification.data?.url || './dashboard.html';

  event.waitUntil(
    clients.openWindow(targetUrl)
  );
});
