const CACHE = 'cache11';
const precachedResources = ['index.html', 'worker.js', 'service-worker.js', 'manifest.json', 'assets/viteLogo.svg'];

async function precache() {
    const cache = await caches.open(CACHE);
    console.log('Данные закешированы')
    return cache.addAll(precachedResources);
}

self.addEventListener('install', (event) => {
    console.log('Установлен');
    event.waitUntil(precache())
});

self.addEventListener("fetch", async (event) => {
    console.log('Данные запрошены')
    event.respondWith(
        (async () => {
            const r = await caches.match(event.request);
            console.log(`[Service Worker] Fetching resource: ${event.request.url}`);
            if (r) {
                return r;
            }
            const response = await fetch(event.request);
            const cache = await caches.open(CACHE);
            console.log(`[Service Worker] Caching new resource: ${event.request.url}`);
            if (!/^chrome-extension/i.test(new URL(event.request.url))){
                cache.put(event.request, response.clone());
            }

            return response;
        })(),
    );
});

self.addEventListener('activate', (event) => {
    console.log('Активирован');
});
