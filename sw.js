const C='mathcafe-v1';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.json','icon-192.png','icon-512.png'])));});
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
// network first (so updates arrive), fall back to cache offline
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone(); caches.open(C).then(c=>c.put(e.request,cp)); return r;}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));});
