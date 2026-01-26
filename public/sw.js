/**
 * Service Worker for NextGen Learning
 * Provides offline capability and caching
 * Enhanced with better offline support and cache strategies
 */

const CACHE_VERSION = 'v2';
const CACHE_NAME = `nextgen-learning-${CACHE_VERSION}`;
const STATIC_CACHE = `nextgen-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `nextgen-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `nextgen-images-${CACHE_VERSION}`;

// Cache duration in milliseconds
const CACHE_DURATION = {
  static: 30 * 24 * 60 * 60 * 1000, // 30 days
  dynamic: 7 * 24 * 60 * 60 * 1000, // 7 days
  images: 30 * 24 * 60 * 60 * 1000, // 30 days
};

// Assets to cache immediately on install
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/favicon.ico',
  '/og-image.svg',
  '/site.webmanifest',
];

// Maximum cache sizes
const MAX_CACHE_SIZE = {
  static: 50,
  dynamic: 100,
  images: 60,
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log('[SW] Caching static assets');
      return cache.addAll(STATIC_ASSETS).catch((error) => {
        console.error('[SW] Failed to cache static assets:', error);
        // Continue even if some assets fail to cache
        return Promise.resolve();
      });
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            // Delete caches that don't match current version
            return name.startsWith('nextgen-') && 
                   name !== STATIC_CACHE && 
                   name !== DYNAMIC_CACHE && 
                   name !== IMAGE_CACHE;
          })
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control immediately
  self.clients.claim();
});

/**
 * Helper: Limit cache size
 * Removes oldest entries when cache exceeds max size
 */
async function limitCacheSize(cacheName, maxSize) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > maxSize) {
    // Delete oldest entries
    const deleteCount = keys.length - maxSize;
    for (let i = 0; i < deleteCount; i++) {
      await cache.delete(keys[i]);
    }
    console.log(`[SW] Trimmed ${deleteCount} entries from ${cacheName}`);
  }
}

/**
 * Helper: Check if cached response is still fresh
 */
function isCacheFresh(response, maxAge) {
  if (!response) return false;
  
  const cachedDate = response.headers.get('sw-cached-date');
  if (!cachedDate) return true; // No date header, assume fresh
  
  const age = Date.now() - new Date(cachedDate).getTime();
  return age < maxAge;
}

/**
 * Helper: Add timestamp to cached response
 */
function addCacheTimestamp(response) {
  const headers = new Headers(response.headers);
  headers.set('sw-cached-date', new Date().toISOString());
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers,
  });
}

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip external requests (analytics, fonts, etc.)
  if (!url.origin.includes(self.location.origin)) {
    return;
  }

  // Skip API requests
  if (url.pathname.startsWith('/api/')) {
    return;
  }

  // For navigation requests, try network first, then cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache the page
          const responseClone = addCacheTimestamp(response.clone());
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          // Limit cache size
          limitCacheSize(DYNAMIC_CACHE, MAX_CACHE_SIZE.dynamic);
          return response;
        })
        .catch(() => {
          // Fallback to cache or offline page
          return caches.match(request).then((cached) => {
            if (cached) return cached;
            // Return offline page
            return caches.match('/offline.html').then((offlinePage) => {
              return offlinePage || new Response('Offline', { status: 503 });
            });
          });
        })
    );
    return;
  }

  // For assets, try cache first, then network
  if (
    url.pathname.startsWith('/assets/') ||
    url.pathname.endsWith('.js') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.jpeg') ||
    url.pathname.endsWith('.webp') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.woff') ||
    url.pathname.endsWith('.woff2')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        // Check if cached response is fresh
        if (cached && isCacheFresh(cached, CACHE_DURATION.static)) {
          return cached;
        }
        
        // Fetch from network
        return fetch(request)
          .then((response) => {
            // Cache successful responses
            if (response.status === 200) {
              const responseClone = addCacheTimestamp(response.clone());
              const cacheName = url.pathname.match(/\.(jpg|jpeg|png|webp|svg)$/i) 
                ? IMAGE_CACHE 
                : STATIC_CACHE;
              
              caches.open(cacheName).then((cache) => {
                cache.put(request, responseClone);
              });
              
              // Limit cache size
              const maxSize = cacheName === IMAGE_CACHE 
                ? MAX_CACHE_SIZE.images 
                : MAX_CACHE_SIZE.static;
              limitCacheSize(cacheName, maxSize);
            }
            return response;
          })
          .catch(() => {
            // Return stale cache if network fails
            return cached || new Response('Asset not available offline', { status: 503 });
          });
      })
    );
    return;
  }

  // For other requests, try network first with cache fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Cache successful responses
        if (response.status === 200) {
          const responseClone = addCacheTimestamp(response.clone());
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
          limitCacheSize(DYNAMIC_CACHE, MAX_CACHE_SIZE.dynamic);
        }
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(request).then((cached) => {
          return cached || new Response('Content not available offline', { status: 503 });
        });
      })
  );
});

// Listen for messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
