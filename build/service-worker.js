workbox.skipWaiting()
workbox.clientsClaim()

workbox.routing.registerNavigationRoute('/index.html')

// Google fonts (& material icons)
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
  }),
)

workbox.precaching.precacheAndRoute(self.__precacheManifest);
