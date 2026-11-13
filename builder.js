const builderKinds={all:'Усе',coffee:'☕ Кава',food:'🍕 Ежа',fish:'🦪 Морапрадукты',market:'🧺 Рынкі і крамы',sight:'📍 Што паглядзець',parking:'🅿 Паркоўка',local:'Парады з відэа'};
const stageNames=['Перад выездам','Па дарозе','На месцы','Па дарозе назад','Пасля вяртання'];
const spot=(id,title,kind,area,query,desc,site)=>({id,title,kind,area,query,desc,site});
const baseSpots=[
 spot('apollo','Caffè Apollo','coffee','Артыджыя','Caffè Apollo Siracusa','Эспрэса і выпечка каля храма Апалона.'),
 spot('ort-market','Mercato di Ortigia','market','Артыджыя','Mercato di Ortigia Siracusa','Раніцай пн–сб. Спытай на рыбных прылаўках пра ўстрыцы.',market),
 spot('burgio','Fratelli Burgio','food','Артыджыя','Fratelli Burgio Mercato di Ortigia Siracusa','Сэндвіч або сыр, алівы і іншае з сабой. Правер гадзіны.', 'https://fratelliburgio.com/it-it')
];
baseSpots.push(spot('apollo-temple','Tempio di Apollo','sight','Артыджыя','Tempio di Apollo Siracusa','Кароткі прыпынак каля руін грэчаскага храма.'));
const savia=spot('savia','Pasticceria Savia','coffee','Катанія','Pasticceria Savia Catania','Эспрэса, канолі і аранчыны на Via Etnea. Заезд у цэнтр.','https://lnx.savia.it/contattaci');
const pescheria=spot('pescheria','La Pescheria','market','Катанія','La Pescheria Catania','Рыбны рынак каля сабора. Едзь раніцай; у нядзелю звычайна закрыта.', 'https://tour.catania.it/catania/what-to-see/details/pescheria');
const scirocco=spot('scirocco','Scirocco Sicilian Fish Lab','fish','Катанія','Scirocco Sicilian Fish Lab Catania','Кулёк з фрытай з морапрадуктаў. Заезд у цэнтр.', 'https://www.sciroccolab.com/');
const avola=[
 spot('girlando','Pasticceria Girlando','coffee','Авала','Pasticceria Girlando Avola','Кава і сіцылійская выпечка ў Авала.', 'https://girlando.it/chi-siamo'),
 spot('tonnara','Tonnara di Avola','sight','Авала','Tonnara di Avola','Кароткая прагулка каля старой тунцовай фабрыкі і мора.')
];
const aci=[
 spot('cafe-de-mar','Sicilia’s Cafe de Mar','coffee','Ачы-Трэца','Sicilia’s Cafe de Mar Aci Trezza','Кава або граніта на набярэжнай. Гэта заезд на ўзбярэжжа.', 'https://www.siciliascafedemar.it/'),
 spot('federico','Trattoria Da Federico','fish','Ачы-Трэца','Trattoria Da Federico Via Provinciale 115 Aci Trezza','Абед з рыбай каля гавані. Правер гадзіны і столік.', 'https://www.touringclub.it/destinazioni/aci-trezza/mangiare/115228-da-federico'),
 spot('faraglioni','Faraglioni dei Ciclopi','sight','Ачы-Трэца','Lungomare dei Ciclopi Aci Trezza','Паглядзі на лававыя скалы з набярэжнай.'),
 spot('cipriani','Caffè Cipriani','coffee','Ачырэале','Caffè Cipriani Piazza Lionardo Vigo Acireale','Граніта ў гістарычным бары на барочнай плошчы. Заезд у цэнтр.', 'https://www.italia.it/it/sicilia/caffe-cipriani-acireale')
];
aci.push(spot('acireale-basilica','Basilica di San Sebastiano','sight','Ачырэале','Basilica di San Sebastiano Acireale','Барочная базіліка ў гістарычным цэнтры Ачырэале.'));
function existing(id,kinds,areas){
 return routes[id].stops.map(([,title,desc,query,site],i)=>spot(id+'-'+i,title,kinds[i],typeof areas==='string'?areas:areas[i],query,desc,site));
}
const taoSpots=existing('tao',['coffee','sight','food','sight'],'Таарміна');
taoSpots[1].site='https://parchiarcheologici.regione.sicilia.it/naxos-taormina/en/';
const notoSpots=existing('noto',['coffee','sight','fish','market','food'],['Нота','Нота','Марцамемі','Марцамемі','Нота']);
const etnaSpots=existing('etna',['parking','coffee','sight','coffee'],['Этна','Этна','Этна','Нікалозі']);
const ortSpots=existing('ortigia',['coffee','market','sight','food'],'Артыджыя');
const townParking=(id,title,area,query)=>spot(id,title,'parking',area,query,'Пакінь машыну і працягвай пешшу.');
const buckets={
 tao:{label:'Таарміна',start:park,groups:[baseSpots,[savia,pescheria,scirocco,...aci],[
  townParking('lumbi','Parcheggio Lumbi','Таарміна','Parcheggio Lumbi Taormina'),...taoSpots,
  spot('zuccaro','Villa Zuccaro','food','Таарміна','Pizzeria Villa Zuccaro Piazza Carmine Taormina','Піца ў старым горадзе. Правер, ці адкрыта на абед.', 'https://taormina.comune.digital/fooddrink/c/0'),
  spot('isola','Isola Bella','sight','Мацаро','Isola Bella Taormina','Бераг пад Таармінай. Лепш планаваць асобна ад прагулкі па верхнім горадзе.', 'https://taormina.comune.digital/amp/biglietti-e-orari/c/0/i/79470664/isolabella')
 ]]},
 noto:{label:'Нота → Марцамемі',start:park,groups:[baseSpots,avola,[notoSpots[0],notoSpots[1],notoSpots[4],notoSpots[2],notoSpots[3],spot('noto-corso','Corso Vittorio Emanuele','sight','Нота','Corso Vittorio Emanuele Noto','Галоўная барочная вуліца Нота.')]]},
 mar:{label:'Марцамемі',start:park,groups:[baseSpots,[...avola,notoSpots[0]],existing('mar',['sight','fish','market'],'Марцамемі')]},
 cat:{label:'Катанія',start:park,groups:[baseSpots,[],[
  townParking('borsellino','Parcheggio Borsellino','Катанія','Parcheggio Borsellino Catania'),
  pescheria,savia,existing('cat',['market','coffee','sight','fish'],'Катанія')[2],scirocco
 ]]},
 ortigia:{label:'Артыджыя пешшу',start:home,mode:'walking',groups:[[],[],[...ortSpots,baseSpots[2]]]},
 etna:{label:'Этна',start:park,groups:[baseSpots,[etnaSpots[3]],[etnaSpots[0],etnaSpots[1],etnaSpots[2]]]},
 arrival:{label:'Прыбыццё → Артыджыя',start:cta,groups:[[],[],[townParking('molo','Molo Sant’Antonio','Сіракузы',park),...ortSpots]]},
 departure:{label:'Артыджыя → аэрапорт',start:park,groups:[baseSpots,[],[spot('airport','Аэрапорт Катаніі','parking','CTA',cta,'Вярні машыну з запасам. Вылет а 14:40.',airport)]]}
};
const localTipIds=new Set(['pescheria','savia','faraglioni','tao-0','tao-1','tao-3','zuccaro','isola','ort-market','ortigia-1','apollo-temple']);
const localTag=s=>localTipIds.has(s.id.replace(/-(back|home)$/,''))?'<span class="local-tip">Парада мясцовага · з відэа</span>':'';
function videoSpot(id,title,kind,area,query,desc,site){
 localTipIds.add(id);
 return spot(id,title,kind,area,query,desc,site);
}
const catTip=(id,title,kind,query,desc,site)=>videoSpot(id,title,kind,'Катанія',query,desc,site);
const taoTip=(id,title,kind,query,desc,site)=>videoSpot(id,title,kind,'Таарміна',query,desc,site);
const ortTip=(id,title,kind,query,desc,site)=>videoSpot(id,title,kind,'Артыджыя',query,desc,site);
const parkingSpot=(id,title,area,query,desc,site)=>spot(id,title,'parking',area,query,desc,site);
const catParking='https://www.amts.ct.it/parcheggi';
const taoParking='https://www.asmtaormina.com/gestione-parcheggi-taormina/';
const molo=parkingSpot('molo','Molo Sant’Antonio','Сіракузы',park,'Паркоўка перад мастом у Артыджыю. Далей зручна пешшу.',ztl);
const notoParking=parkingSpot('noto-parking','Parcheggio Città di Noto','Нота','Parcheggio Città di Noto Via Cavour 158 Noto','Via Cavour 158, каля гарадскога саду і пачатку Corso Vittorio Emanuele.','https://www.siracusaparcheggi.it/it/');
const marParking=parkingSpot('mar-parking','Parcheggio Marzamemi Centro','Марцамемі','Parcheggio Marzamemi Centro Via Corrado Montoneri','Via Corrado Montoneri, пешшу да галоўнай плошчы. Правер сезонны рэжым.','https://parcheggimarzamemi.com/');
const aciCastello=videoSpot('aci-castello','Castello Normanno','sight','Ачы-Кастэла','Castello Normanno Aci Castello Piazza Castello','Замак на лававай скале над морам. Можна сумясціць з Ачы-Трэцай.');
const aciParking=parkingSpot('aci-parking','Паркоўка каля гавані Ачы-Трэцы','Ачы-Трэца','Parcheggio Lungomare dei Ciclopi Aci Trezza','Шукай пазначаныя парковачныя месцы каля набярэжнай. Правер знакі і аплату.');
const catCenter=buckets.cat.groups[2];
Object.assign(catCenter[0],{site:catParking,desc:'Piazza Borsellino, побач з рыбным рынкам і Piazza Duomo.'});
catCenter.splice(1,0,parkingSpot('corso-sicilia-parking','Parcheggio Corso Sicilia','Катанія','Parcheggio AMTS Corso Sicilia Catania','Альтэрнатыва каля Piazza Stesicoro і Via Etnea.',catParking));
catCenter.push(
 catTip('cathedral-cta','Cattedrale di Sant’Agata','sight','Cattedrale di Sant’Agata Catania','Сабор на Piazza Duomo, за крок ад рыбнага рынку.'),
 catTip('bellini-theater','Teatro Massimo Bellini','sight','Teatro Massimo Bellini Catania','Оперны тэатр на Piazza Vincenzo Bellini. Для візіту ўнутр правер афішу і экскурсіі.','https://www.teatromassimobellini.it/'),
 catTip('via-etnea','Via Etnea','sight','Piazza Stesicoro Via Etnea Catania','Прайдзі па галоўнай вуліцы ад Piazza Stesicoro ў бок сабора.'),
 catTip('cat-street','Стрытфуд каля La Pescheria','food','La Pescheria Catania','У відэа раяць стрытфуд. Каля рынку можна ўзяць фрыту з рыбы і морапрадуктаў у Scirocco.','https://www.sciroccolab.com/'),
 catTip('magri','Выпечка ў Bar Magrì','coffee','Bar Magrì Viale Mario Rapisardi 80 Catania','У Magrì некалькі філіялаў. На мапе — гістарычная кавярня на Viale Mario Rapisardi.','https://www.magrimichelangelo.it/'),
 catTip('norma','Pasta alla Norma','food','Trattoria U Fucularu Via Euplio Reina 20 Catania','У відэа раяць страву. U Fucularu каля Via Etnea падае яе з баклажанамі і салёнай рыкотай.','https://www.trattoriaufucularu.com/en-gb'),
 catTip('cavallo','Carne di cavallo','food','Trattoria U Fucularu Via Euplio Reina 20 Catania','У відэа раяць паспрабаваць каніну. У меню U Fucularu ёсць кавалкі і фрыкадэлькі з каніны.','https://www.trattoriaufucularu.com/en-gb')
);
buckets.cat.groups[2].push(aciParking,aci[2],aciCastello);
buckets.tao.groups[1].push(aciParking,aciCastello);
const taoCenter=buckets.tao.groups[2];
Object.assign(taoCenter[0],{site:taoParking,desc:'Паўночны ўезд. Правер шатл да старога горада.'});
taoCenter.splice(1,0,parkingSpot('porta-catania-parking','Parcheggio Porta Catania','Таарміна','Parcheggio Porta Catania Taormina','Паўднёвы ўезд, побач з Corso Umberto і Villa Zuccaro.',taoParking));
taoCenter.push(
 taoTip('xxv-aprile','Piazza IX Aprile','sight','Piazza IX Aprile Taormina','Плошча з відам на мора і Этну. На скрыншоце «XXV Aprile», на мапе яна называецца «IX Aprile».'),
 videoSpot('castelmola','Castelmola','sight','Кастэльмола','Piazza Sant’Antonio Castelmola','Гарадок вышэй за Таарміну. Заплануй асобны заезд да агляднай плошчы.'),
 taoTip('da-nino','Trattoria da Nino','fish','Trattoria da Nino Via Luigi Pirandello 37 Taormina','Морапрадукты і сіцылійская кухня каля верхняй станцыі канаткі.','https://trattoriadaninotaormina.com/it/')
);
buckets.noto.groups[2].unshift(notoParking);
buckets.noto.groups[2].splice(buckets.noto.groups[2].indexOf(notoSpots[2]),0,marParking);
buckets.mar.groups[1].push(notoParking);
buckets.mar.groups[2].unshift(marParking);
const ortCenter=buckets.ortigia.groups[2];
ortCenter.unshift(molo);
ortCenter.push(baseSpots.find(s=>s.id==='apollo-temple'),
 ortTip('ortigia-island','Ortigia','sight','Ponte Umbertino Siracusa','Перайдзі мост і прагуляйся па завулках старога горада.'),
 ortTip('duomo-sr','Duomo di Siracusa','sight','Duomo di Siracusa Piazza Duomo','Сабор у цэнтры Артыджыі, на Piazza Duomo.'),
 ortTip('diana','Fontana di Diana','sight','Fontana di Diana Piazza Archimede Siracusa','Фантан Дыяны пасярод Piazza Archimede.'),
 videoSpot('neapolis','Parco archeologico della Neapolis','sight','Сіракузы','Parco Archeologico della Neapolis ingresso Via Paradiso Siracusa','Грэчаскі тэатр і Вуха Дыянісія на мацерыку. Правер гадзіны і ўваход.','https://parchiarcheologici.regione.sicilia.it/siracusa/'),
 ortTip('borderi','Caseificio Borderi','food','Caseificio Borderi Via Emmanuele de Benedictis Siracusa','Паніні з сырам і сіцылійскімі начынкамі на рынку Артыджыі.'),
 ortTip('schiticchio','Schiticchio','food','Schiticchio Via Cavour 30 Siracusa','Піца на Via Cavour 30 у старым горадзе.','https://www.schiticchio.com/schiticchio-in-via-cavour-ortigia-siracusa-pizzeria-e-ristorante/'),
 ortTip('cucche','Cucche','food','Mercato di Ortigia Siracusa','Салёная выпечка, часта з сырам і каўбасой. Спытай на рынку ці ў пякарні, ці ёсць сёння.')
);
Object.assign(buckets.arrival.groups[2][0],molo);
buckets.arrival.groups[2].push(...ortCenter.filter(s=>!buckets.arrival.groups[2].some(old=>old.id===s.id)&&s.id!=='burgio'));
const roundTrips={
 tao:{from:'Parcheggio Lumbi Taormina',back:[aci[3],aci[4],...aci.slice(0,3),scirocco]},
 noto:{from:'Piazza Regina Margherita Marzamemi',back:[...avola,notoSpots[4],notoSpots[0]]},
 mar:{from:'Piazza Regina Margherita Marzamemi',back:[...avola,notoSpots[0]]},
 cat:{from:'Parcheggio Borsellino Catania',back:[savia,scirocco]},
 etna:{from:'Rifugio Sapienza Nicolosi',back:[etnaSpots[3],savia,scirocco]},
 ortigia:{from:'Fonte Aretusa Siracusa',back:[spot('marina','Passeggio Aretusa','sight','Артыджыя','Passeggio Aretusa Siracusa','Вяртайся ўздоўж вады праз набярэжную.')]},
};
for(const [id,r] of Object.entries(roundTrips)){
 const local=buckets[id];
 local.round=r;
 local.groups.push(r.back.map(s=>({...s,id:s.id+'-back'})),[ortSpots[3],baseSpots[0],ortSpots[2],...ortCenter.filter(s=>['schiticchio','borderi','diana'].includes(s.id))].map(s=>({...s,id:s.id+'-home'})));
}
const choose=$('destination');
const savedBuckets=read('buckets-v1',{});
const lists=savedBuckets&&typeof savedBuckets==='object'&&!Array.isArray(savedBuckets)?savedBuckets:{};
const previous=read('builder-direction','tao');
let active=Object.hasOwn(buckets,previous)?previous:'tao', kind='all', stageFilter='all';
choose.innerHTML=Object.entries(buckets).map(([id,b])=>`<option value="${id}">${b.label}</option>`).join('');
const jump=document.createElement('a');
jump.className='cta bucket-jump';jump.href='#bucket-title';$('builder').append(jump);
const current=()=>buckets[active];
const options=()=>current().groups.flatMap((g,stage)=>g.map(s=>({...s,stage})));
function items(){
 const lookup=new Map(options().map(s=>[s.id,s]));
 const seen=new Set();
 return (Array.isArray(lists[active])?lists[active]:[]).flatMap(entry=>{
  const id=typeof entry==='string'?entry:entry?.id, s=lookup.get(id);
  if(!s||seen.has(id))return [];
  seen.add(id);
  const stage=entry?.stage;
  return [{...s,stage:Number.isInteger(stage)&&stage>=0&&stage<current().groups.length?stage:s.stage}];
 });
}
const findSpot=id=>options().find(s=>s.id===id);
function routeQueries(stops,b){
 const q=stops.map(s=>s.query);
 if(!b.round)return q;
 const back=stops.findIndex(s=>s.stage===3);
 if(back>=0&&!stops.slice(0,back).some(s=>s.stage===2)){
  q.splice(back,0,b.round.from);
 }
 const after=stops.findIndex(s=>s.stage===4);
 if(after>=0&&stops.slice(0,after).some(s=>s.stage>=1&&s.stage<=3)){
  q.splice(after+(back>=0&&back<after&&q.length>stops.length?1:0),0,b.start);
 }else if(after<0&&back>=0){
  q.push(b.start);
 }
 return q.filter((place,i)=>i===0?place!==b.start:place!==q[i-1]);
}
const miniLinks=s=>`<div class="stop-links">${a(map(s.query),'На мапе')}${wazeLink(s.query)}${s.site?a(s.site,'Сайт'):''}</div>`;
function routeParts(start,stops,mode){
 const points=[start,...stops],urls=[];
 for(let i=0;i<points.length-1;i+=4){
  const [origin,...rest]=points.slice(i,i+5),destination=rest.pop();
  const params=new URLSearchParams({api:'1',origin,destination,travelmode:mode});
  if(rest.length)params.set('waypoints',rest.join('|'));
  urls.push('https://www.google.com/maps/dir/?'+params);
 }
 return urls;
}
function renderChoices(){
 const picked=new Set(items().map(s=>s.id));
 $('kind-filters').innerHTML=Object.entries(builderKinds).map(([id,label])=>`<button class="pill" data-kind="${id}" aria-pressed="${id===kind}">${label}</button>`).join('');
 $('choices').innerHTML=current().groups.map((group,i)=>{
  const visible=stageFilter!=='all'&&Number(stageFilter)!==i?[]:group.filter(s=>kind==='all'||s.kind===kind||(kind==='local'&&localTag(s)));
  return visible.length?`<div class="stage"><h3>${stageNames[i]}</h3>${visible.map(s=>`<div class="choice"><div class="spot-main">${stopPhoto(s.query)}<div><div class="eyebrow">${safe(s.area)} · ${builderKinds[s.kind]}</div><strong>${safe(s.title)}</strong>${localTag(s)}<p>${safe(s.desc)}</p>${miniLinks(s)}</div></div><button class="pill" data-pick="${s.id}" aria-pressed="${picked.has(s.id)}" aria-label="${safe((picked.has(s.id)?'Прыбраць ':'Дадаць ')+s.title)}">${picked.has(s.id)?'✓':'＋'}</button></div>`).join('')}</div>`:'';
 }).join('')||'<p class="muted">У гэтым кірунку няма такіх прыпынкаў. Паспрабуй іншы фільтр.</p>';
}
function renderBucket(){
 const stops=items(),b=current();
 jump.hidden=!stops.length;jump.textContent='Бакетліст · '+stops.length+' ↓';
 if(!stops.length){$('bucket-content').innerHTML='<p>Пакуль пусты. Націсні «＋» каля кавярні, рынку ці славутасці, каб дадаць прыпынак.</p>';return}
 const urls=routeParts(b.start,routeQueries(stops,b),b.mode||'driving');
 const inTown=stops.filter(s=>s.stage===2&&s.kind!=='parking'&&s.area===({tao:'Таарміна',cat:'Катанія'}[active]));
 const cityParking=stops.find(s=>s.stage===2&&s.kind==='parking'&&s.area===({tao:'Таарміна',cat:'Катанія'}[active]));
 const walkUrls=inTown.length?routeParts(cityParking?.query||inTown[0].query,inTown.slice(cityParking?0:1).map(s=>s.query),'walking'):[];
 $('bucket-content').innerHTML=`<p>Старт: <b>${safe(b.start)}</b> · ${stops.length} у спісе</p><ol>${stops.map((s,i)=>`<li class="bucket-row"><div class="spot-main">${stopPhoto(s.query)}<div><strong>${safe(s.title)}</strong>${localTag(s)}<p>${safe(s.area)}</p><select class="stage-select" data-edit-stage="${s.id}" aria-label="${safe('Этап: '+s.title)}">${stageNames.slice(0,b.groups.length).map((label,j)=>`<option value="${j}" ${j===s.stage?'selected':''}>${label}</option>`).join('')}</select><div class="stop-links"></div>${a(map(s.query),'На мапе')}${wazeLink(s.query)}</div></div><div class="row-actions"><button data-move="${s.id}" data-delta="-1" aria-label="${safe('Вышэй: '+s.title)}" ${i===0?'disabled':''}>↑</button><button data-move="${s.id}" data-delta="1" aria-label="${safe('Ніжэй: '+s.title)}" ${i===stops.length-1?'disabled':''}>↓</button><button data-drop="${s.id}" aria-label="${safe('Прыбраць '+s.title)}">×</button></div></li>`).join('')}</ol><div class="map-actions">${urls.map((url,i)=>a(url,urls.length===1?'Маршрут у Google Maps':`Maps · частка ${i+1} з ${urls.length}`,'cta')).join('')}</div>${urls.length>1?'<p>Доўгі маршрут падзелены на часткі для мабільных Maps. Наступная пачынаецца там, дзе скончылася папярэдняя.</p>':''}${walkUrls.length?`<div class="map-actions">${walkUrls.map((url,i)=>a(url,walkUrls.length===1?'Пешшу па цэнтры':`Пешшу · частка ${i+1}`,'pill')).join('')}</div>`:''}${b.mode?'':'<p>У цэнтрах ёсць пешыя зоны і ZTL. Пакідай машыну на паркоўцы і ідзі да кропак пешшу.</p>'}`;
}
function renderBuilder(){
 choose.value=active;
 const f=$('stage-filter');
 f.innerHTML='<option value="all">Усе этапы</option>'+stageNames.slice(0,current().groups.length).map((name,i)=>'<option value="'+i+'">'+name+'</option>').join('');
 f.value=stageFilter;
 renderChoices();renderBucket();
}
function selectBucket(id){if(!Object.hasOwn(buckets,id))return;active=id;kind='all';stageFilter='all';save('builder-direction',id);renderBuilder()}
function updateBucket(stops){lists[active]=stops.map(({id,stage})=>({id,stage}));save('buckets-v1',lists);renderChoices();renderBucket()}
function toggleSpot(id,drop=false){
 const stops=items(),index=stops.findIndex(s=>s.id===id),s=findSpot(id);if(!s)return;
 if(index!==-1)stops.splice(index,1);
 else insertAtStage(stops,s);
 updateBucket(stops);
 $('builder-status').textContent=(index===-1?'Дададзена: ':'Прыбрана: ')+s.title;
 (drop?$('bucket-content').querySelector('[data-drop]')||choose:document.querySelector(`[data-pick="${id}"]`))?.focus({preventScroll:true});
}
function insertAtStage(stops,s){
 const last=stops.findLastIndex(other=>other.stage===s.stage);
 const next=stops.findIndex(other=>other.stage>s.stage);
 stops.splice(last>=0?last+1:next<0?stops.length:next,0,s);
}
choose.addEventListener('change',()=>selectBucket(choose.value));
$('stage-filter').addEventListener('change',e=>{stageFilter=e.target.value;renderChoices()});
$('bucket-content').addEventListener('change',e=>{
 const id=e.target.dataset.editStage;
 if(!id)return;
 const stops=items(),i=stops.findIndex(s=>s.id===id),stage=Number(e.target.value);
 if(i<0||!Number.isInteger(stage)||stage<0||stage>=current().groups.length||stage===stops[i].stage)return;
 const [s]=stops.splice(i,1);
 insertAtStage(stops,{...s,stage});
 updateBucket(stops);
 $('builder-status').textContent=s.title+' → '+stageNames[stage];
 document.querySelector(`[data-edit-stage="${id}"]`)?.focus({preventScroll:true});
});
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 const d=b.dataset;
 if(d.build){const dialog=$('route');if(dialog.open)dialog.close();selectBucket(d.build);location.hash='builder';$('builder').scrollIntoView();requestAnimationFrame(()=>choose.focus({preventScroll:true}));}
 if(d.kind){kind=d.kind;renderChoices();document.querySelector(`[data-kind="${kind}"]`)?.focus()}
 if(d.pick)toggleSpot(d.pick);
 if(d.drop)toggleSpot(d.drop,true);
 if(d.move){
  const stops=items(),i=stops.findIndex(s=>s.id===d.move),j=i+Number(d.delta);
  if(i<0||j<0||j>=stops.length)return;
  [stops[i],stops[j]]=[stops[j],stops[i]];updateBucket(stops);
  $('builder-status').textContent=stops[j].title+' цяпер на пазіцыі '+(j+1);
  (document.querySelector(`[data-move="${d.move}"][data-delta="${d.delta}"]:not(:disabled)`)||document.querySelector(`[data-move="${d.move}"]:not(:disabled)`))?.focus({preventScroll:true});
 }
});
renderBuilder();







