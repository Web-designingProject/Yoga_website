const staticCachName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v2";

const assets = [

  '/',

 'index.html',


 'js/jquery.min.js',

 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js',

 'js/bootstrap.min.js',

 'js/app.js',

 'css/all.min.css',

 'css/fontawesome.min.css',

 'css/style.css',
 'fallback.html'

];
// Call Install Event

self.addEventListener('install', e =>{
  e.waitUntil(
    caches.open(staticCachName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
})

// Call Activate Event
self.addEventListener('activate', e=>{
    //console.log('sw activate');
//return self.ClientRectList.claim(); // this line ansure that service worker install correctly. Add this line makes is more robust
e.waitUntil(
  caches.keys().then(keys =>{
    //console.log(keys);
    return Promise.all(keys
       .filter(key=>key!= staticCachName && key!= dynamicCacheName)
       .map(key=>caches.delete(key))
    )
  })
);
// e.waitUntil(
//   caches.keys().then(keys=>{
//     //console.log(keys + "This is the change"); //
//     return Promise.all(keys
//       .filter(key=>key!= staticCachName)
//       .map(key=>caches.delete(key))
//       )
//   })
// );
});

// Call Fetch Event

self.addEventListener('fetch', e => {
  //console.log('fetch event', evt);
  e.respondWith(
    caches.match(e.request).then(cacheRes => {
      return cacheRes || fetch(e.request).then(fetchRes=>{
        return caches.open(dynamicCacheName).then(cache =>{
          cache.put(e.request.url,fetchRes.clone());
          return fetchRes;
        })
      });
    }).catch(()=>caches.match('/fallback.html'))
  );
});



// self.addEventListener('fetch', e => {
//   //console.log('Fetch Event',e)
//      console.log('Fetch event for ', e.request.url);
//      e.respondWith(
//        caches.match(e.request)
//        .then(response => {
//          if (response) {
//            console.log('Found ', e.request.url, ' in cache');
//           return response;
//          }
//          console.log('Network request for ', e.request.url);
//          return fetch(e.request)
  
//          .then(response => {
//              // TODO 5 - Respond with custom 404 page
//              return caches.open(staticCachName).then(cache => {
//                cache.put(e.request.url, response.clone());
//                return response;
//              });
//            });
  
//        }).catch(error => {
  
  
//        })
//      );
//   });


