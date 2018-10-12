// To cache files define
const cacheName = 'v1';

const cacheFiles = [
    'index.html',
    'restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',    
    '/js/main.js', 
    '/js/restaurant_info.js', 
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

// Call Install Event
self.addEventListener('install', event => {
    console.log('Service Worker: Installed');

    // Do this after cache files define
    event.waitUntil(
        caches
        .open(cacheName)
        .then(Cache => {
            console.log('Service Worker: Caching files');
            Cache.addAll(cacheFiles);
        })
        // Do this to skip waiting
        .then(() => self.skipWaiting())
    );
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
        fetch(event.request).catch(() => caches.match(e.request))
    )
})