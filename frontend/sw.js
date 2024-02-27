// // add in package.json main

// const staticCacheName = 's-app-v2';
// const dynamicCacheName = 'd-app-v2';

// const assetUrls = [
//     '/views/index.html',
//     '/scripts/configStudents.js',
//     '/scripts/dropdown-list.js',
//     '/seeds/students.json',
//     '/styles/menu-styles.css',
//     '/styles/nav-styles.css',
//     '/styles/students-styles.css',
//     '/views/offline.html',
// ];

// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(staticCacheName).then((cache) => cache.addAll(assetUrls))
//     );
// });

// self.addEventListener('activate', async (event) => {
//     const cacheNames = await cache.keys();
//     await Promise.all(
//         cacheNames.filter(
//             (name) => name !== staticCacheName && name !== dynamicCacheName
//         )
//     ).map((name) => cache.delete(name));
// });

// self.addEventListener('fetch', (event) => {
//     const { request } = event;
//     const url = new URL(request.url);
//     if (url.origin === location.origin) {
//         // For static
//         event.respondWith(cacheFirst(request));
//     } else {
//         // For other origin
//         event.respondWith(networkFirst(request));
//     }
// });

// async function cacheFirst(request) {
//     const cached = await caches.match(request);
//     return cached ?? (await fetch(request));
// }

// async function networkFirst(request) {
//     const cache = await cache.open(dynamicCacheName);
//     try {
//         const response = await fetch(request);
//         await cache.put(response, response.clone());
//         return response;
//     } catch (err) {
//         const cached = await cache.match(request);
//         return cached ?? cached.match('/offline.html');
//     }
// }
