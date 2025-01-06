self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('static-cache-v1').then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/image/vc_logo.png'
        ]);
      })
    );
  });

  // self.addEventListener("fetch", (event) => {
  //   if (event.request.url.includes("firestore.googleapis.com")) {
  //     event.respondWith(
  //       caches.match(event.request).then((response) => {
  //         return (
  //           response ||
  //           fetch(event.request)
  //             .then((fetchResponse) => {
  //               return caches.open("api-cache").then((cache) => {
  //                 cache.put(event.request, fetchResponse.clone());
  //                 return fetchResponse;
  //               });
  //             })
  //             .catch(() => {
  //               return new Response(
  //                 JSON.stringify({ message: "You are offline. Data is unavailable." }),
  //                 { headers: { "Content-Type": "application/json" } }
  //               );
  //             })
  //         );
  //       })
  //     );
  //   }
  // });
  
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  });