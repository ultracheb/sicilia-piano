const statusEl=document.getElementById('offline-status');
if(location.protocol==='https:'||['localhost','127.0.0.1'].includes(location.hostname)){
 statusEl.hidden=false;
 statusEl.textContent='Рыхтуем планы і фота для афлайн…';
 if('serviceWorker' in navigator){
  navigator.serviceWorker.register('./sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{
   statusEl.textContent='✓ Гатова афлайн: планы, бакетліст і фота. Для Google Maps патрэбная сетка.';
  }).catch(()=>{statusEl.textContent='Афлайн-копія пакуль не захавалася. Паспрабуй адкрыць старонку з інтэрнэтам яшчэ раз.'});
 }else statusEl.textContent='Гэты браўзер не падтрымлівае афлайн-копію сайта.';
}
