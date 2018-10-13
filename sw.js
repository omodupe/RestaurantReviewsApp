// To cache files define
const cacheName = 'v1';

// Call Install Event
self.addEventListener('install', event => {
    console.log('Service Worker: Installed');
});

// Call Activate Event
self.addEventListener('activate', event => {
    console.log('Service Worker: Activated');

    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if(cache !== cacheName){
                        console.log('Service Worker: Clearing old files');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
})

// Call Fetch Event
self.addEventListener('fetch', event =>{
    console.log('Service Worker: Fetching');

    event.respondWith(
        fetch(event.request)
        .then(res => {
            const resClone = res.clone();
            caches
            .open(cacheName)
            .then(cache => {
                cache.put(event.request, resClone);
            })
            return res;
        })
        .catch(err => caches.match(event.request).then(res => res))
    );
});