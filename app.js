const $=id=>document.getElementById(id);
function read(k,f){try{return JSON.parse(localStorage.getItem('sicilia-piano:'+k))??f}catch{return f}}
function save(k,v){try{localStorage.setItem('sicilia-piano:'+k,JSON.stringify(v))}catch{}}
const dates=['Сб','Нд','Пн','Аў','Ср'];
const today=new Intl.DateTimeFormat('en-CA',{timeZone:'Europe/Rome',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
let day=today>='2026-11-14'&&today<='2026-11-18'?Number(today.slice(-2)):14;
let etna=read('etna',15)===16?16:15, selected='all';
const stored=read('saved',[]), favorites=new Set(Array.isArray(stored)?stored:[]);
const moods={all:'Усе',slow:'Без спешкі',sea:'Хачу мора',food:'Хачу смачнага',view:'Хачу відаў',saved:'☆ Захаваныя'};
const enc=encodeURIComponent;
const map=q=>'https://www.google.com/maps/search/?api=1&query='+enc(q);
function directions(r){const [start,...rest]=r.nav, end=rest.pop();return 'https://www.google.com/maps/dir/?api=1&origin='+enc(start)+'&destination='+enc(end)+'&travelmode='+(r.walk?'walking':'driving')+(rest.length?'&waypoints='+enc(rest.join('|')):'')}
const safe=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const a=(url,label,klass='')=>`<a class="${klass}" target="_blank" rel="noopener noreferrer" href="${safe(url)}">${safe(label)} ↗</a>`;
const stopPhoto=(query)=>{
 const exact=[
  [/^Mercato di Ortigia/,'market'],[/^La Pescheria/,'pescheria'],[/^Cattedrale di San Nicolò/,'noto'],[/^Fonte Aretusa/,'aretusa'],[/^Teatro Antico/,'tao'],[/^Piazza del Duomo Catania/,'cat'],[/^Piazza Regina Margherita/,'mar'],[/^Crateri Silvestri/,'etna'],[/^Tonnara di Avola/,'avola'],[/^Lungomare dei Ciclopi/,'aci'],[/^Bam Bar/,'bam'],[/^Villa Comunale/,'villa'],[/^Isola Bella/,'isola'],[/^Catania Fontanarossa Airport/,'airport'],[/^Passeggio Aretusa/,'aretusa'],[/^Tempio di Apollo/,'apollo'],[/^Corso Vittorio Emanuele Noto/,'corso'],[/^Basilica di San Sebastiano Acireale/,'acireale']
 ];
 const key=exact.find(([pattern])=>pattern.test(query))?.[1];
 const photo=photoLibrary[key];
 return photo?`<img class="spot-thumb" src="${safe(photo.file)}" alt="${safe(photo.label)}" loading="lazy" decoding="async">`:'';
};
const img=(key,eager=false)=>`<img src="${safe(pics[key][0])}" alt="" loading="${eager?'eager':'lazy'}" decoding="async" referrerpolicy="no-referrer">`;
const photo=(key,eager=false)=>`<div class="photo scenery ${key}" role="img" aria-label="${safe(pics[key][1])}">${img(key,eager)}</div>`;
document.addEventListener('error',e=>{if(e.target.matches?.('.photo img,.spot-thumb'))e.target.hidden=true},true);
$('hero-art').classList.add('scenery','ortigia');
$('hero-art').insertAdjacentHTML('afterbegin',img('ortigia',true));
function renderDay(){
 $('days').innerHTML=dates.map((name,i)=>`<button class="day" data-day="${14+i}" aria-label="${14+i} лістапада, ${['субота','нядзеля','панядзелак','аўторак','серада'][i]}" aria-pressed="${day===14+i}"><b>${14+i}</b><small>${name}</small></button>`).join('');
 $('etna-switch').innerHTML=[15,16].map(d=>`<button class="pill" data-etna="${d}" aria-pressed="${etna===d}">${d} · ${dates[d-14]}</button>`).join('');
 const id=day===14?'arrival':day===18?'departure':day===etna?'etna':day===17?'ortigia':'noto';
 const r=routes[id];
 const secondary={arrival:['Правілы ZTL',ztl],etna:['Глянуць вэб-камеры',webcam],departure:['Сайт аэрапорта',airport],ortigia:['Гадзіны рынку',market]}[id];
 const hint=id==='etna'?'Калі вецер ці дрэнная бачнасць, перанясі Этну на суседні дзень. Калі абодва дні не падыходзяць — выбірай узбярэжжа.':id==='noto'?'Хочацца іншых відаў? Таарміна ніжэй. Калі сёння панядзелак і хочацца рынку — ёсць Катанія.':id==='ortigia'?'У аўторак можна застацца пешшу. Калі хочацца за руль — з’ездзі на La Pescheria ў Катаніі.':'';
 $('day-plan').innerHTML=`<article class="plan"><div class="plan-text"><div class="eyebrow">${r.tag}</div><h3>${r.title}</h3><p>${r.desc}</p>${hint?`<p class="hint">${hint}</p>`:''}<button class="cta" data-route="${id}">Адкрыць план →</button> <button class="pill build-from" data-build="${id}">Сабраць свой</button>${secondary?a(secondary[1],secondary[0],'secondary'):''}</div>${photo(r.pic)}</article>`;
}
function renderCards(){
 $('filters').innerHTML=Object.entries(moods).map(([key,label])=>`<button class="pill" data-filter="${key}" aria-pressed="${key===selected}">${label}</button>`).join('');
 const list=Object.entries(routes).filter(([id,r])=>r.vibe&&(selected==='all'||(selected==='saved'?favorites.has(id):r.vibe.includes(selected))));
 $('cards').innerHTML=list.map(([id,r])=>`<article class="card">${photo(r.pic)}<div class="card-body"><div class="eyebrow">${r.tag}${favorites.has(id)?' · ★':''}</div><h3>${r.title}</h3><p>${r.desc}</p><button class="pill" data-route="${id}" aria-label="Глядзець маршрут: ${r.title}">Маршрут →</button></div></article>`).join('');
 $('empty').hidden=list.length!==0;
}
const dialog=$('route');
let openId, trigger;
function saveLabel(id){return favorites.has(id)?'★ Захавана':'☆ Захаваць'}
function openRoute(id,button){
 const r=routes[id];if(!r)return;
 openId=id;trigger=button;
 $('route-body').innerHTML=`${photo(r.pic,true)}<div class="eyebrow">${r.tag}</div><h3 id="dialog-title">${r.title}</h3><p class="muted">${r.desc}</p><div class="actions">${a(directions(r),r.walk?'Пешы маршрут у Maps':'Дарога ў Maps','cta')}<button class="pill" data-build="${id}">Сабраць свой</button>${r.vibe?`<button class="pill" id="fav" aria-pressed="${favorites.has(id)}">${saveLabel(id)}</button>`:''}</div><p class="route-note">${r.note}</p>${r.links?`<div class="stop-links">${r.links.map(([l,u])=>a(u,l)).join('')}</div>`:''}<ol class="stops">${r.stops.map(([time,title,desc,q,site])=>`<li><div class="eyebrow">${time}</div><div class="spot-main">${stopPhoto(q)}<div><strong>${title}</strong><p>${desc}</p><div class="stop-links">${a(map(q),'На мапе')}${site?a(site,'Сайт'):''}</div></div></div></li>`).join('')}</ol>`;
 dialog.setAttribute('aria-labelledby','dialog-title');dialog.showModal();dialog.scrollTop=0;
}
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.day){day=Number(b.dataset.day);renderDay();document.querySelector(`[data-day="${day}"]`).focus()}
 else if(b.dataset.etna){etna=Number(b.dataset.etna);save('etna',etna);day=etna;renderDay();document.querySelector(`[data-etna="${etna}"]`).focus()}
 else if(b.dataset.filter){selected=b.dataset.filter;renderCards();document.querySelector(`[data-filter="${selected}"]`).focus()}
 else if(b.dataset.route)openRoute(b.dataset.route,b);
 else if(b.classList.contains('close'))dialog.close();
 else if(b.id==='fav'){
  favorites.has(openId)?favorites.delete(openId):favorites.add(openId);save('saved',[...favorites]);
  b.textContent=saveLabel(openId);b.setAttribute('aria-pressed',favorites.has(openId));renderCards();
 }
});
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
dialog.addEventListener('close',()=>{(trigger?.isConnected?trigger:document.querySelector(`[data-route="${openId}"]`)||document.querySelector('[data-filter][aria-pressed=true]'))?.focus()});
$('credits').innerHTML='<div>'+[a(market,'Рынак Артыджыі'),a('https://tour.catania.it/catania/what-to-see/details/pescheria','Рынак Катаніі'),a(cable,'Funivia dell’Etna'),a(airport,'Аэрапорт CTA'),a(ztl,'ZTL у Артыджыі')].join('')+'</div><ul class="photo-credits">'+Object.values(photoLibrary).map(p=>`<li>${a(p.page,p.title)} · ${safe(p.author||'Wikimedia Commons')} · ${a(p.licenseUrl,p.license)} · паменшаная копія</li>`).join('')+'</ul>';
renderDay();renderCards();



