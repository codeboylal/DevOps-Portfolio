// const CACHE_NAME = "pwa-cache-v1"; // Update version to force cache refresh
// const ASSETS_TO_CACHE = [
//   "/",
//   "/index.html",
//   "/manifest.json",
//   "/logo 192.png",
//   "/logo 256.png",
//   "/logo 354.png",
//   "/logo 512.png",
//   "/ITI_logo.png",
//   "/ITI_logo.ico",
// ];

// // Install: Cache essential assets
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Caching essential assets...");
//       return cache.addAll(ASSETS_TO_CACHE);
//     })
//   );
//   self.skipWaiting();
// });

// // Activate: Delete old cache versions
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames
//           .filter((cache) => cache !== CACHE_NAME) // Remove old caches
//           .map((cache) => {
//             console.log("Deleting old cache:", cache);
//             return caches.delete(cache);
//           })
//       )
//     )
//   );
//   self.clients.claim();
// });

// // Fetch: Try network first, fallback to cache
// self.addEventListener("fetch", (event) => {
//   if (event.request.method !== "GET") return;

//   event.respondWith(
//     fetch(event.request)
//       .then((networkResponse) => {
//         return caches.open(CACHE_NAME).then((cache) => {
//           cache.put(event.request, networkResponse.clone()); // Update cache
//           return networkResponse;
//         });
//       })
//       .catch(() => {
//         return caches.match(event.request).then((cachedResponse) => {
//           return cachedResponse || fetch(event.request); // Fallback to cache if offline
//         });
//       })
//   );
// });

// // Listen for "clear cache" message and delete cache when online
// self.addEventListener("message", (event) => {
//   if (event.data && event.data.type === "CLEAR_CACHE") {
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cache) => {
//           console.log("Clearing cache:", cache);
//           return caches.delete(cache);
//         })
//       )
//     );
//   }
// });



// Install: No caching, just activate immediately
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

// Activate: Claim clients immediately
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch: Always go to the network
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    fetch(event.request).catch(() => {
      return new Response("You are offline.", {
        status: 503,
        statusText: "Service Unavailable"
      });
    })
  );
});

