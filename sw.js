importScripts('./photos.js');
const prefix='sicilia-piano:'+self.registration.scope+':';
const name=prefix+'2';
const files=['./index.html','./style.css?v=5','./photos.js','./data.js','./app.js?v=4','./builder.js?v=5','./offline.js','./manifest.webmanifest','./icon.svg','./postcard.svg',...Object.values(photoLibrary).map(p=>p.file)];
self.addEventListener('install',event=>event.waitUntil((async()=>{
 const cache=await caches.open(name);
 await cache.addAll(files);
 await self.skipWaiting();
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
 for(const key of await caches.keys())if(key.startsWith(prefix)&&key!==name)await caches.delete(key);
 await self.clients.claim();
})()));
const assets=new Set(files.map(file=>new URL(file,self.registration.scope).href));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url),root=new URL(self.registration.scope);
 if(event.request.method!=='GET'||url.origin!==root.origin||!url.pathname.startsWith(root.pathname))return;
 if(event.request.mode==='navigate'&&(url.pathname===root.pathname||url.pathname===root.pathname+'index.html')){
  event.respondWith(caches.open(name).then(cache=>cache.match('./index.html')).then(hit=>hit||fetch(event.request)));
 }else if(assets.has(url.href)){
  event.respondWith(caches.open(name).then(cache=>cache.match(event.request)).then(hit=>hit||fetch(event.request)));
 }
});

