const airport='https://aeroporto.catania.it/';
const market='https://ortigia.ortigiasiracusa.com/en/what-to-see-in-ortigia/ortigia-market';
const webcam='https://www.funiviaetna.com/it/webcam/';
const cable='https://www.funiviaetna.com/2500m/';
const ztl='https://www.siracusaturismo.it/servizi/ztl-zona-a-traffico-limitato/';
const home='Ortigia, Siracusa';
const park='Parcheggio Molo Sant’Antonio, Siracusa';
const cta='Catania Fontanarossa Airport';
const pics=Object.fromEntries(['ortigia','noto','mar','etna','tao','cat'].map(key=>{
 const photo=photoLibrary[key];
 return [key,[photo?.file||'postcard.svg',photo?.label||key]];
}));
const routes={
 ortigia:{title:'Артыджыя пешшу',tag:'ПЕШШУ · ПАВОЛЬНА',vibe:['slow','food'],desc:'Кава каля храма Апалона, устрыцы на рынку і піца пасля прагулкі ля мора.',pic:'ortigia',walk:true,nav:['Tempio di Apollo Siracusa','Mercato di Ortigia','Fonte Aretusa Siracusa'],note:'Рынак звычайна працуе пн–сб раніцай, прыкладна да 14:00. Лепш прыйсці да 11:00. У нядзелю замяні рынак прагулкай да Fonte Aretusa і абедам у цэнтры.',stops:[
 ['09:30','Caffè Apollo','Эспрэса і нешта салодкае каля храма Апалона.','Caffè Apollo Siracusa'],
 ['10:00','Mercato di Ortigia','Пытайся пра ўстрыцы на рыбных прылаўках. Калі ёсць — папрасі адкрыць на месцы. На перакус — сэндвіч у Caseificio Borderi.','Mercato di Ortigia',market],
 ['11:30','Piazza Duomo → Fonte Aretusa','Прайдзі праз белую саборную плошчу і выйдзі да вады.','Fonte Aretusa Siracusa'],
 ['19:30','Era Ora','Ідэя на вячэру: піца на Артыджыі. Правер, ці ёсць столік.','Era Ora Ortigia','https://www.eraoraortigia.it/en/']
 ]},
 noto:{title:'Нота → Марцамемі',tag:'35–45 ХВ ДА НОТА · ПАЎДНЯ',vibe:['slow','sea','food'],desc:'Міндальная граніта, мядовыя фасады і доўгі абед у рыбацкай вёсцы.',pic:'noto',nav:[park,'Porta Reale Noto','Piazza Regina Margherita Marzamemi'],note:'З Нота да Марцамемі яшчэ прыкладна 30–40 хв. Калі на ўзбярэжжы вецер або La Cialoma закрытая, абедай у Dammuso ў Нота і пакінь мора на іншы дзень.',stops:[
 ['10:00','Caffè Sicilia','Пачні ў Нота з эспрэса і канолі або міндальнай граніты з брыёшам.','Caffè Sicilia Noto','https://www.caffesicilia.it/'],
 ['10:45','Corso Vittorio Emanuele','Ад Porta Reale да сабора і Palazzo Ducezio; калі хочацца яшчэ — зазірні на Via Nicolaci.','Cattedrale di San Nicolò Noto'],
 ['13:15','Taverna La Cialoma','Абед у Марцамемі: спытай пра рыбу дня або пасту з морапрадуктамі. У лістападзе спачатку пацвердзі, што адкрыта.','Taverna La Cialoma Marzamemi','https://www.tavernalacialoma.it/'],
 ['14:45','Piazza Regina Margherita → Campisi','Паглядзі старыя рыбацкія дамы, прайдзі да вады і зазірні па тунца ці батарагу ў Campisi.','Campisi Conserve Marzamemi','https://www.campisiconserve.it/it/'],
 ['Запасны абед','Dammuso','Калі застаецеся ў Нота, зазірніце ў меню сіцылійскай траторыі і праверце гадзіны.','Ristorante Dammuso Noto','https://www.ristorantedammuso.it/']
 ]},
 mar:{title:'Марцамемі без спешкі',tag:'50–65 ХВ · МОРСКІ ДЗЕНЬ',vibe:['sea','slow','food'],desc:'Адна вёска, адзін доўгі абед і прагулка ўздоўж вады.',pic:'mar',nav:[park,'Parcheggio Marzamemi','Piazza Regina Margherita Marzamemi'],note:'Калі вёска ціхая і рэстараны закрытыя, зазірні ў Нота на зваротным шляху. Правер La Cialoma да выезду.',stops:[
 ['11:00','Piazza Regina Margherita','Вазьмі каву на плошчы, калі бары адкрытыя, і прайдзі ўздоўж вады да гавані.','Piazza Regina Margherita Marzamemi'],
 ['13:00','Taverna La Cialoma','Сядай на абед з выглядам на мора, калі дазваляе надвор’е. Спытай пра ўлоў дня.','Taverna La Cialoma Marzamemi','https://www.tavernalacialoma.it/'],
 ['14:30','Campisi','Вазьмі з сабой кансервы з тунца або батарагу.','Campisi Conserve Marzamemi','https://www.campisiconserve.it/it/']
 ]},
 etna:{title:'Цэлы дзень на Этне',tag:'1 Г 30–50 ХВ · ЦЭЛЫ ДЗЕНЬ',vibe:['view'],desc:'Чорная лава, кратары і, калі пашанцуе з бачнасцю, канатка над воблакамі.',pic:'etna',nav:[park,'Rifugio Sapienza Nicolosi'],note:'Вечарам і перад выездам правер вецер, бачнасць, працу канаткі і абмежаванні доступу. Вазьмі цёплыя слаі і абутак з добрым счапленнем. На вышэйшыя маршруты — з гідам, дзе гэта патрабуецца; прытрымлівайся мясцовых указанняў.',links:[['Вэб-камеры',webcam],['Камеры INGV','https://www.ct.ingv.it/sezioniesterne/webcam/WebcamEtna.php'],['Канатка',cable]],stops:[
 ['08:00','Выезд з Артыджыі','Захапі ваду і перакус. Едзь на паўднёвы схіл праз Nicolosi.','Rifugio Sapienza Nicolosi'],
 ['09:45','Rifugio Sapienza','Кава на базе. Калі канатка працуе і бачнасць добрая, падыміся да верхняй станцыі на 2500 м.','Funivia dell’Etna Nicolosi',cable],
 ['12:30','Абед і Crateri Silvestri','Перакус на базе. Калі сцежкі адкрытыя і ўмовы добрыя, прагуляйся да ніжніх кратэраў.','Crateri Silvestri Etna'],
 ['15:15','Спуск праз Nicolosi','Кава або ранні перакус і назад у Артыджыю да вечара.','Nicolosi centro']
 ]},
 tao:{title:'Таарміна над морам',tag:'1 Г 25–50 ХВ · ВІДЫ',vibe:['view','sea'],desc:'Граніта, антычны тэатр і сад з відам на Іанічнае мора.',pic:'tao',nav:[park,'Parcheggio Lumbi Taormina'],note:'Пакінь машыну ў Lumbi. Перад выездам правер гадзіны тэатра і шатла. Для марскога настрою дастаткова выгляду з саду, спускацца да Isola Bella неабавязкова.',stops:[
 ['10:30','Bam Bar','Граніта з брыёшам, калі бар адкрыты, або эспрэса на Corso Umberto.','Bam Bar Taormina'],
 ['11:15','Teatro Antico','Антычны тэатр з відам на мора, а ў яснае надвор’е — і на Этну.','Teatro Antico di Taormina'],
 ['13:00','Rosmarino','Сіцылійскі абед насупраць гарадскога саду. Правер меню і гадзіны.','Rosmarino Taormina','https://www.rosmarinotaormina.com/'],
 ['14:30','Villa Comunale','Кароткая прагулка па садзе перад дарогай дадому.','Villa Comunale Taormina']
 ]},
 cat:{title:'Катанія на смак',tag:'55–75 ХВ · РЫБНЫ РЫНАК',vibe:['food'],desc:'Рыбныя прылаўкі за саборам, фрыта з морапрадуктаў і канолі.',pic:'cat',nav:[park,'Parcheggio Borsellino Catania'],note:'La Pescheria — ранішні рынак, у нядзелю звычайна закрыты. Пачні з яго і пакінь цэнтр на пасля. У дзень вылету гэты маршрут лепш прапусціць.',stops:[
 ['09:30','La Pescheria','Агледзь рыбныя прылаўкі каля Piazza del Duomo. Устрыцы — калі ёсць у продажы.','La Pescheria Catania','https://tour.catania.it/catania/what-to-see/details/pescheria'],
 ['10:30','Pasticceria Savia','Эспрэса і канолі або аранчына на Via Etnea.','Pasticceria Savia Catania'],
 ['11:15','Via Etnea → Piazza del Duomo','Прайдзі ад Villa Bellini да фантана са сланом.','Piazza del Duomo Catania'],
 ['12:30','Scirocco Sicilian Fish Lab','Папяровы кулёк з смажанымі морапрадуктамі каля рынку.','Scirocco Sicilian Fish Lab Catania','https://www.sciroccolab.com/']
 ]},
 arrival:{title:'Прыляцелі. Цяпер — да мора.',tag:'12:00 · CTA → АРТЫДЖЫЯ',desc:'Забраць машыну, даехаць да Артыджыі і ўвечары пайсці на піцу.',pic:'ortigia',nav:[cta,park],note:'Ад CTA да Артыджыі каля 50–65 хв за рулём. Пакінь запас на багаж і пракат. У цэнтры Артыджыі дзейнічае ZTL; удакладні ў жылля, як пад’ехаць.',links:[['Правілы ZTL',ztl]],stops:[
 ['12:00','Прыбыццё ў CTA','Багаж, пракат і выезд у Сіракузы.','Catania Fontanarossa Airport',airport],
 ['Пасля засялення','Piazza Duomo і набярэжная','Кароткая прагулка да Fonte Aretusa. Калі прагаладаецеся, вазьміце аранчыну ў Antica Giudecca.','Antica Giudecca Siracusa'],
 ['19:30','Era Ora','Піца ў Артыджыі. Столік і гадзіны лепш праверыць.','Era Ora Ortigia','https://www.eraoraortigia.it/en/']
 ]},
 departure:{title:'Апошняя кава → CTA',tag:'14:40 · ВЫЛЕТ',desc:'Ранішняя кава каля дома і спакойная дарога ў аэрапорт з запасам на вяртанне машыны.',pic:'ortigia',nav:[park,cta],note:'Час арыенціровачны. Калі пракат па-за тэрміналам, патрэбная запраўка або авіякампанія просіць прыехаць раней, выязджай раней.',stops:[
 ['08:30','Caffè Apollo або рынак','Кава і апошні канолі. Калі хочацца падарункаў — хуткі заход па сыр ці алівы.','Mercato di Ortigia',market],
 ['10:15','Выезд з Артыджыі','Правер маршрут і месца вяртання машыны ў дамове пракату.','Parcheggio Molo Sant’Antonio Siracusa'],
 ['11:30–12:00','Аэрапорт Катаніі','Мэта — быць у зоне аэрапорта з запасам на здачу аўто, багаж і кантроль. Вылет а 14:40.',cta,airport]
 ]}
};

