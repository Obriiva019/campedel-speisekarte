// data.jsx — Speisekarte „Campedèl Hof"
// Trilingual (DE/IT/EN) menu. Diet tags + origin flag for filtering & badges.

const HOF_INTRO = {
  de: 'Ein Südtiroler Hofschank, in dem alles passt: saftige Wiesen, herrliche Aussicht, gutes Essen und ausgezeichneter Wein. Sie befinden sich im denkmalgeschützten Untergeschoss des Feuerhauses — dem Campedèl-Keller — umgeben von Mauern aus dem 13. Jahrhundert.',
  it: 'Un tipico Hofschank altoatesino dove tutto è in armonia: prati rigogliosi, una vista splendida, ottimo cibo e vino eccellente. Vi trovate nel piano interrato tutelato della casa del fuoco, la cosiddetta cantina Campedèl, circondati da mura del 13° secolo.',
  en: 'A South Tyrolean farm tavern where everything comes together: lush meadows, stunning views, excellent food, and outstanding wine. You are in the protected basement of the main house — the Campedèl cellar — surrounded by 13th-century walls.',
};

const UI_STRINGS = {
  open_menu:   { de: 'Speisekarte öffnen', it: 'Apri il menù', en: 'Open the menu' },
  todays:      { de: 'Tageskarte',          it: 'Piatti del giorno', en: "Today's specials" },
  menu:        { de: 'Speisekarte',         it: 'Menù',              en: 'Menu' },
  wines:       { de: 'Weinkarte',           it: 'Carta dei vini',    en: 'Wine list' },
  drinks:      { de: 'Getränke',            it: 'Bevande',           en: 'Drinks' },
  filters:     { de: 'Filter',              it: 'Filtri',            en: 'Filters' },
  veg:         { de: 'Vegetarisch',         it: 'Vegetariano',       en: 'Vegetarian' },
  vegan:       { de: 'Vegan',               it: 'Vegano',            en: 'Vegan' },
  gf:          { de: 'Glutenfrei',          it: 'Senza glutine',     en: 'Gluten-free' },
  lf:          { de: 'Laktosefrei',         it: 'Senza lattosio',    en: 'Lactose-free' },
  from_farm:   { de: 'Vom eigenen Hof',     it: 'Dal nostro maso',   en: 'From our farm' },
  house_made:  { de: 'Hausgemacht',         it: 'Fatto in casa',     en: 'House-made' },
  back:        { de: 'Zurück',              it: 'Indietro',          en: 'Back' },
  welcome:     { de: 'Willkommen im',       it: 'Benvenuti al',      en: 'Welcome to' },
  ingredients: { de: 'Zutaten',             it: 'Ingredienti',       en: 'Ingredients' },
  pairing:     { de: 'Empfehlung dazu',     it: 'In abbinamento',    en: 'Pairs well with' },
  today:       { de: 'Heute',               it: 'Oggi',              en: 'Today' },
  season:      { de: 'Frühling 2026',       it: 'Primavera 2026',    en: 'Spring 2026' },
  tagline:     { de: 'Südtiroler Hofschank · seit 2019',
                 it: 'Hofschank altoatesino · dal 2019',
                 en: 'South Tyrolean farm tavern · since 2019' },
  hours:       { de: 'Di–So · 11:30 – 22:00',
                 it: 'Mar–Dom · 11:30 – 22:00',
                 en: 'Tue–Sun · 11:30 – 22:00' },
  search:      { de: 'Suchen', it: 'Cerca', en: 'Search' },
  more:        { de: 'Mehr anzeigen', it: 'Mostra altro', en: 'Show more' },
};

// d = diet tags: 'veg' / 'vegan' / 'gf' / 'lf'
// h = vom eigenen Hof
// hm = hausgemacht
const CATEGORIES = [
  {
    id: 'cold',
    name: { de: 'Kalte Vorspeisen', it: 'Antipasti', en: 'Starters' },
    items: [
      { id: 'salad',     name: { de: 'Gemischter Salat', it: 'Insalata mista', en: 'Mixed salad' }, p: '6,00', d: ['veg','vegan','gf','lf'], photo: 'img/salad.jpg' },
      { id: 'brett',     name: { de: 'Bretteljause mit Speck und Käse', it: 'Tagliere di speck con formaggi', en: 'Speck and cheese platter' }, p: '15,90', d: ['gf'], h: true, photo: 'img/brett.jpg',
        desc: { de: 'Hausgereifter Speck, Bergkäse, hausgemachtes Brot.',
                it: 'Speck stagionato in casa, formaggio di malga, pane fatto in casa.',
                en: 'House-aged speck, mountain cheese, homemade bread.' } },
      { id: 'tatar',     name: { de: 'Avokado-Tomatentatar mit Burrata und Wildkräutersalat',
                                  it: 'Tartare di avocado e pomodori con burrata e insalata di erbe selvatiche',
                                  en: 'Avocado & tomato tartare with burrata and wild herb salad' }, p: '16,90', d: ['veg'], photo: 'img/tatar.jpg' },
    ],
  },
  {
    id: 'soup',
    name: { de: 'Suppen', it: 'Zuppe', en: 'Soups' },
    items: [
      { id: 'knoedel',   name: { de: 'Speckknödelsuppe', it: 'Canederli allo speck in brodo', en: 'Speck dumpling soup' }, p: '12,90', d: [], h: true, hm: true, photo: 'img/knoedel.jpg' },
      { id: 'spargel',   name: { de: 'Spargelcremesuppe mit Brotcroutons', it: 'Crema di asparagi con crostini', en: 'Cream of asparagus soup with croutons' }, p: '9,90', d: ['veg'], photo: 'img/spargel.jpg' },
    ],
  },
  {
    id: 'primi',
    name: { de: 'Warme Vorspeisen', it: 'Primi piatti', en: 'First courses' },
    items: [
      { id: 'schlutz',   name: { de: 'Hausgemachte Schlutzkrapfen mit Butter und Reibkäse',
                                  it: 'Mezzelune con spinaci fatte in casa, burro fuso e parmigiano',
                                  en: 'Homemade Schlutzkrapfen with butter and grated cheese' },
        p: '15,50', d: ['veg'], hm: true, photo: 'img/schlutz.jpg',
        desc: { de: 'Halbmondförmige Teigtaschen mit Spinat- und Topfenfüllung — ein Südtiroler Klassiker, bei uns nach Großmutters Rezept gefaltet.',
                it: 'Mezzelune di pasta con ripieno di spinaci e ricotta — un classico altoatesino, piegate a mano secondo la ricetta della nonna.',
                en: 'Half-moon pasta pockets filled with spinach and quark — a South Tyrolean classic, folded by hand to grandmother\u2019s recipe.' },
        ingredients: { de: ['Hartweizen­teig','Spinat','Topfen','Bergbutter','Reibkäse','Schnittlauch'],
                       it: ['Pasta di grano','Spinaci','Ricotta','Burro di malga','Parmigiano','Erba cipollina'],
                       en: ['Durum pasta','Spinach','Quark','Mountain butter','Grated cheese','Chives'] },
        pairing: 'Sylvaner · Weingut Taschlerhof' },
      { id: 'knoedeltris', name: { de: 'Knödeltris mit Butter und Reibkäse',
                                    it: 'Tris di canederli con burro fuso e parmigiano',
                                    en: 'Trio of dumplings with butter and grated cheese' }, p: '16,50', d: ['veg'], hm: true, photo: 'img/knoedeltris.jpg' },
      { id: 'tortelloni',  name: { de: 'Hausgemachte Tortelloni mit Ricottafüllung, Bärlauch und Spargelragout',
                                    it: 'Tortelloni ripieni di ricotta con ragù di asparagi e aglio orsino',
                                    en: 'Homemade tortelloni with ricotta, wild garlic and asparagus ragout' }, p: '16,50', d: ['veg'], hm: true, photo: 'img/tortelloni.jpg' },
      { id: 'risotto',     name: { de: 'Brennnessel-Risotto mit frischem Spargel',
                                    it: 'Risotto alle ortiche con asparagi freschi',
                                    en: 'Nettle risotto with fresh asparagus' }, p: '16,90', d: ['veg','gf'], photo: 'img/risotto.jpg' },
    ],
  },
  {
    id: 'main',
    name: { de: 'Hauptspeisen', it: 'Piatti principali', en: 'Main courses' },
    items: [
      { id: 'entrecote',  name: { de: 'Entrecote vom Rind mit Kartoffelspalten, Salat und Kräuterbutter',
                                   it: 'Entrecote con spicchi di patate, insalata mista e burro alle erbe',
                                   en: 'Beef entrecote with potato wedges, mixed salad and herb butter' }, p: '28,50', d: ['gf'], h: true, photo: 'img/entrecote.jpg' },
      { id: 'burger',     name: { de: '„Campedèl-Burger" vom eigenen Grauvieh',
                                   it: '«Campedèl Burger» con carne dei nostri bovini',
                                   en: '"Campedèl Burger" with our own grey-cattle beef' }, p: '18,90', d: [], h: true, hm: true, photo: 'img/burger.jpg',
        desc: { de: 'Mit hausgebackenem Brot, Speck, Bergkäse, Tomaten, roter Zwiebel, Salat und Kartoffelspalten.',
                it: 'Con pane fatto in casa, speck, formaggio, pomodori, cipolla rossa, insalata e spicchi di patate.',
                en: 'With homemade bread, bacon, mountain cheese, tomato, red onion, salad and potato wedges.' } },
      { id: 'pepper',     name: { de: 'Pfeffersteak „Campedèl", medium, mit Röstkartoffeln und Salat',
                                   it: 'Filetto al pepe verde «Campedèl», cottura media, con patate arrosto e insalata',
                                   en: '"Campedèl" pepper steak, medium, with roasted potatoes and salad' }, p: '34,00', d: ['gf'], h: true, photo: 'img/pepper.jpg' },
      { id: 'gulasch',    name: { de: 'Hofeigenes Rindsgulasch mit zwei Speckknödeln',
                                   it: 'Gulasch di manzo della casa con due canederli allo speck',
                                   en: 'Homemade beef goulash with two speck dumplings' }, p: '19,50', d: [], h: true, hm: true, photo: 'img/gulasch.jpg' },
      { id: 'wiener',     name: { de: 'Wienerschnitzel vom Hofkalb mit Pommes und Preiselbeermarmelade',
                                   it: 'Cotoletta di vitello del maso con patatine e mirtilli rossi',
                                   en: 'Viennese schnitzel of farm veal with fries and cranberry jam' }, p: '22,90', d: [], h: true, photo: 'img/wiener.jpg' },
      { id: 'spargel-main', name: { de: 'Frische Stangenspargel mit Hausschinken, Naturkartoffeln und Bozner Sauce',
                                     it: 'Asparagi bianchi freschi con prosciutto della casa, patate lesse e salsa bolzanina',
                                     en: 'Fresh white asparagus with homemade ham, boiled potatoes and Bozner sauce' }, p: '23,90', d: ['gf'], h: true, photo: 'img/spargel-main.jpg' },
    ],
  },
  {
    id: 'kids',
    name: { de: 'Für unsere kleinen Gäste', it: 'Per i bambini', en: 'For kids' },
    items: [
      { id: 'k-wiener', name: { de: 'Wienerschnitzel vom Hofkalb mit Pommes', it: 'Cotoletta di vitello del maso con patatine', en: 'Veal schnitzel with fries' }, p: '15,00', d: [], h: true, photo: 'img/k-wiener.jpg' },
      { id: 'k-spag',   name: { de: 'Spaghetti mit Tomatensauce oder Ragu', it: 'Spaghetti al pomodoro o ragù', en: 'Spaghetti with tomato or ragù' }, p: '9,50', d: ['veg'], photo: 'img/k-spag.jpg' },
      { id: 'k-wurst',  name: { de: 'Grillwurst mit Pommes', it: 'Würstel alla griglia con patatine', en: 'Grilled sausage with fries' }, p: '9,50', d: [], photo: 'img/k-wurst.jpg' },
      { id: 'k-fries',  name: { de: 'Pommes frites', it: 'Patatine fritte', en: 'French fries' }, p: '6,00', d: ['veg','vegan'], photo: 'img/k-fries.jpg' },
    ],
  },
  {
    id: 'dessert',
    name: { de: 'Dessert', it: 'Dolci', en: 'Desserts' },
    items: [
      { id: 'buchteln', name: { de: 'Buchteln mit Vanillesauce', it: 'Buchteln con crema alla vaniglia', en: 'Buchteln with vanilla sauce' }, p: '9,50', d: ['veg'], hm: true, photo: 'img/buchteln.jpg' },
      { id: 'icehimb',  name: { de: 'Vanilleeis mit heißen Himbeeren', it: 'Gelato alla vaniglia con lamponi caldi', en: 'Vanilla ice cream with warm raspberries' }, p: '8,50', d: ['veg','gf'], photo: 'img/icehimb.jpg' },
      { id: 'sorbet',   name: { de: 'Zitronensorbet mit Limoncello', it: 'Sorbetto al limone con Limoncello', en: 'Lemon sorbet with Limoncello' }, p: '7,90', d: ['veg','vegan','gf','lf'], photo: 'img/sorbet.jpg' },
      { id: 'strudel',  name: { de: 'Apfelstrudel mit Vanillesauce', it: 'Strudel di mele con crema alla vaniglia', en: 'Apple strudel with vanilla sauce' }, p: '5,90', d: ['veg'], hm: true, photo: 'img/strudel.jpg' },
      { id: 'creme',    name: { de: 'Crème brûlée mit frischen Erdbeeren', it: 'Crème brûlée con fragole fresche', en: 'Crème brûlée with fresh strawberries' }, p: '7,90', d: ['veg','gf'], photo: 'img/creme.jpg' },
    ],
  },
];

const DRINKS = {
  hot: [
    { n: { de:'Espresso',          it:'Espresso',           en:'Espresso' },          p:'1,80' },
    { n: { de:'Macchiato',         it:'Macchiato',          en:'Macchiato' },         p:'1,80' },
    { n: { de:'Doppelter Espresso',it:'Espresso doppio',    en:'Double espresso' },   p:'3,60' },
    { n: { de:'Cappuccino',        it:'Cappuccino',         en:'Cappuccino' },        p:'3,00' },
    { n: { de:'Latte Macchiato',   it:'Latte macchiato',    en:'Latte macchiato' },   p:'3,00' },
    { n: { de:'Heiße Schokolade',  it:'Cioccolata calda',   en:'Hot chocolate' },     p:'4,00' },
    { n: { de:'Tee (Früchte · Kräuter · Schwarz)', it:'Tè (frutta · erbe · nero)', en:'Tea (fruit · herbal · black)' }, p:'3,00' },
  ],
  // multi-size sets: each entry has `sizes` array
  water: {
    sizes: ['0,3 l', '0,5 l', '1,0 l'],
    items: [
      { n: { de:'Mineralwasser', it:'Acqua minerale', en:'Mineral water' }, p:['2,00','2,50','5,00'] },
      { n: { de:'Wasser Natur',  it:'Acqua naturale', en:'Still water'    }, p:['2,00','2,50','5,00'] },
      { n: { de:'Apfelsaft',     it:'Succo di mela',  en:'Apple juice'    }, p:['3,00','5,00','9,00'] },
      { n: { de:'Skiwasser',     it:'Skiwasser',      en:'Skiwasser'      }, p:['3,50','6,00','12,00'] },
    ],
  },
  juices: {
    sizes: ['0,3 l', '0,5 l'],
    items: [
      { n: { de:'Himbeersaft',   it:'Succo di lampone',  en:'Raspberry juice'    }, p:['3,00','5,00'] },
      { n: { de:'Holundersaft',  it:'Succo di sambuco',  en:'Elderflower juice'  }, p:['3,00','5,00'] },
      { n: { de:'Melissensaft',  it:'Succo di melissa',  en:'Lemon-balm juice'   }, p:['3,00','5,00'] },
      { n: { de:'Colasaft',      it:'Succo di mela e cola', en:'Cola juice'      }, p:['3,00','5,00'] },
    ],
  },
  beer: {
    sizes: ['0,3 l', '0,5 l'],
    items: [
      { n: { de:'Kronen Forst Bier', it:'Birra Forst Kronen', en:'Forst Kronen beer' }, p:['3,80','6,00'] },
      { n: { de:'Radler',            it:'Radler',             en:'Shandy (Radler)'   }, p:['3,80','6,00'] },
      { n: { de:'Hefeweizen',        it:'Hefeweizen',         en:'Wheat beer'        }, p:['3,80','6,00'] },
      { n: { de:'Alkoholfreies Bier',it:'Birra analcolica',   en:'Alcohol-free beer' }, p:['3,50','6,00'] },
    ],
  },
  aperitif: [
    { n: { de:'Aperitif Campedeller',  it:'Aperitivo Campedeller', en:'Campedeller aperitif' }, p:'5,00', sig: true },
    { n: { de:'Hugo (Holunderspritz)', it:'Hugo',                  en:'Hugo (elderflower spritz)' }, p:'5,00' },
    { n: { de:'Veneziano (Aperolspritz)', it:'Veneziano',          en:'Aperol spritz' }, p:'5,00' },
    { n: { de:'Prosecco',              it:'Prosecco',              en:'Prosecco' }, p:'4,00' },
    { n: { de:'Sanbitter Weiß',        it:'Sanbittèr bianco',      en:'Sanbittèr white' }, p:'4,00' },
    { n: { de:'Gin Tonic · Hendrick\u2019s',  it:'Gin Tonic · Hendrick\u2019s',  en:'Gin & Tonic · Hendrick\u2019s' }, p:'10,00' },
    { n: { de:'Gin Tonic · Illusionist',it:'Gin Tonic · Illusionist',en:'Gin & Tonic · Illusionist' }, p:'14,00' },
  ],
  digestif: [
    { n: { de:'Hausschnaps',  it:'Grappa della casa', en:'House schnapps' }, p:'3,50', sig:true },
    { n: { de:'Latschen',     it:'Latschen (mugo)',   en:'Mountain pine' }, p:'3,50' },
    { n: { de:'Nusseler',     it:'Liquore alle noci', en:'Walnut liqueur' }, p:'3,50' },
    { n: { de:'Zirmschnaps',  it:'Cembro',            en:'Swiss pine schnapps' }, p:'3,50' },
    { n: { de:'Limoncello',   it:'Limoncello',        en:'Limoncello' }, p:'3,50' },
    { n: { de:'Williams',     it:'Williams',          en:'Williams' }, p:'3,50' },
    { n: { de:'Enzian',       it:'Genziana',          en:'Gentian' }, p:'3,50' },
    { n: { de:'Treber',       it:'Grappa di vinacce', en:'Grappa di vinaccia' }, p:'3,50' },
    { n: { de:'Heuschnaps',   it:'Distillato di fieno', en:'Hay schnapps' }, p:'3,50' },
    { n: { de:'Branca Menta', it:'Branca Menta',      en:'Branca Menta' }, p:'4,00' },
    { n: { de:'Fernet Branca',it:'Fernet Branca',     en:'Fernet Branca' }, p:'4,00' },
    { n: { de:'Cynar',        it:'Cynar',             en:'Cynar' }, p:'4,00' },
    { n: { de:'Montenegro',   it:'Montenegro',        en:'Montenegro' }, p:'4,00' },
  ],
};

const WINES = {
  bubbles: [
    { name:'Arunda Brut',         maker:'Sektkellerei Arunda',         region:'Südtirol DOC · brut',                    grapes:'CH · PB · PN', sizes:[{s:'0,75 l', p:'39,00'}] },
    { name:'Zemmer Millesimato',  maker:'Weingut Peter Zemmer',        region:'Vino Spumante di Qualità · brut',        grapes:'CH · RI',      sizes:[{s:'0,75 l', p:'29,00'},{s:'Glas', p:'5,00'}] },
  ],
  white: [
    { name:'Michelstrunk Weiss',  maker:'Kellerei St. Michael-Eppan',  region:'Vino Bianco d\u2019Italia · trocken',     house:true, sizes:[{s:'1,0 l', p:'18,00'},{s:'1/2 l', p:'10,00'},{s:'1/4 l', p:'5,50'},{s:'Glas', p:'2,70'}] },
    { name:'T Cuvée Weiss',       maker:'Kellerei Tramin',             region:'Weinberge Dolomiten IGT · trocken',       grapes:'CH · SB · PB', sizes:[{s:'0,75 l', p:'26,00'},{s:'Glas', p:'5,00'}] },
    { name:'Gewürztraminer',      maker:'Kellerei St. Michael-Eppan',  region:'Südtirol DOC · trocken',                  sizes:[{s:'0,75 l', p:'29,00'}] },
    { name:'Schulthaus Weissburgunder', maker:'Kellerei St. Michael-Eppan', region:'Südtirol DOC · trocken',             grapes:'Pinot Bianco', sizes:[{s:'0,75 l', p:'30,00'},{s:'Glas', p:'5,00'}] },
    { name:'Sylvaner',            maker:'Weingut Taschlerhof',         region:'Südtirol Eisacktaler DOC · trocken',      sizes:[{s:'0,75 l', p:'32,00'}] },
    { name:'Kerner',              maker:'Zu Tschötsch',                region:'Weinberge Dolomiten IGT · halbtrocken',   sizes:[{s:'0,75 l', p:'34,00'},{s:'Glas', p:'5,50'}] },
    { name:'Sauvignon',           maker:'Weingut Putzenhof',           region:'Südtirol DOC · trocken',                  sizes:[{s:'0,75 l', p:'30,00'},{s:'Glas', p:'5,00'}] },
    { name:'Sanct Valentin Sauvignon', maker:'Kellerei St. Michael-Eppan', region:'Südtirol DOC · trocken',              sizes:[{s:'0,75 l', p:'41,00'}], note:'Falstaff 92 · Parker 93 · Suckling 93' },
    { name:'Riesling',            maker:'Weingut Strasserhof',         region:'Südtirol Eisacktaler DOC · trocken',      sizes:[{s:'0,75 l', p:'33,00'}], note:'Falstaff 92' },
    { name:'Fellis Chardonnay Riserva', maker:'Weingut Bessererhof',   region:'Südtirol DOC · trocken',                  sizes:[{s:'0,75 l', p:'33,00'}] },
  ],
  red: [
    { name:'Michelstrunk Rot',    maker:'Kellerei St. Michael-Eppan',  region:'Vino Rosso d\u2019Italia · trocken',      house:true, sizes:[{s:'1,0 l', p:'18,00'},{s:'1/2 l', p:'10,00'},{s:'1/4 l', p:'5,50'},{s:'Glas', p:'2,70'}] },
    { name:'Zeder',               maker:'Weingut Kornell',             region:'Südtirol DOC · trocken',                  grapes:'ME · CS · LA', sizes:[{s:'0,75 l', p:'30,00'},{s:'Glas', p:'5,00'}] },
    { name:'Soma',                maker:'Kellerei Kurtatsch',          region:'Südtirol DOC · trocken',                  grapes:'ME · CF · CS', sizes:[{s:'0,75 l', p:'40,00'}] },
    { name:'Cabernet Riserva',    maker:'Weingut Wassererhof',         region:'Südtirol DOC · trocken',                  grapes:'CS · CF', sizes:[{s:'0,75 l', p:'44,00'}], note:'Falstaff 93' },
    { name:'St. Magdalener',      maker:'Kellerei St. Michael-Eppan',  region:'Südtirol DOC · trocken',                  grapes:'VT · LA', sizes:[{s:'0,75 l', p:'27,00'},{s:'Glas', p:'5,00'}] },
    { name:'Roan Zweigelt',       maker:'Weingut Bessererhof',         region:'Weinberge Dolomiten IGT · trocken',       sizes:[{s:'0,75 l', p:'33,00'}] },
    { name:'Pinot Noir',          maker:'Kellerei St. Michael-Eppan',  region:'Südtirol DOC · trocken',                  sizes:[{s:'0,75 l', p:'30,00'},{s:'Glas', p:'5,00'}] },
    { name:'Marith Blauburgunder',maker:'Weingut Kornell',             region:'Südtirol DOC · trocken',                  sizes:[{s:'0,75 l', p:'34,00'}] },
    { name:'Glen Blauburgunder Riserva', maker:'Kellerei Kurtatsch',   region:'Südtirol DOC · trocken',                  sizes:[{s:'0,75 l', p:'39,00'}] },
    { name:'Lagrein',             maker:'Kellerei St. Michael-Eppan',  region:'Südtirol DOC · trocken',                  sizes:[{s:'0,75 l', p:'29,00'},{s:'Glas', p:'5,00'}] },
    { name:'Karl Lagrein Riserva',maker:'Weingut Bergmannhof',         region:'Südtirol DOC · trocken',                  sizes:[{s:'0,75 l', p:'42,00'}] },
    { name:'Huberfeld Merlot',    maker:'Kellerei St. Pauls',          region:'Südtirol DOC · trocken',                  sizes:[{s:'0,75 l', p:'31,00'}] },
    { name:'Terre di San Leonardo',maker:'Tenuta San Leonardo, Trient',region:'Weinberge Dolomiten IGT · trocken',       grapes:'CS · ME · CRE', sizes:[{s:'0,75 l', p:'31,00'}] },
    { name:'Amarone',             maker:'Casa Vinicola Bennati, Venetien', region:'Amarone d. Valpolicella DOCG · trocken', grapes:'CV · RON · MOL', sizes:[{s:'0,75 l', p:'40,00'}] },
  ],
};

// Grape-abbreviation legend (footer of wine list)
const WINE_LEGEND = [
  ['CF','Cabernet Franc'], ['CH','Chardonnay'], ['CRE','Carménère'],
  ['CS','Cabernet Sauvignon'], ['CV','Corvina'], ['LA','Lagrein'],
  ['ME','Merlot'], ['MOL','Molinara'], ['PB','Weissburgunder · Pinot Bianco'],
  ['PN','Pinot Noir · Pinot Nero'], ['RI','Riesling'], ['RON','Rondinella'],
  ['SB','Sauvignon Blanc'], ['VT','Vernatsch · Schiava'],
];

// Tageskarte / Specials — frühlingshaft 2026
const SPECIALS = {
  date: { de: 'Freitag, 8. Mai 2026', it: 'Venerdì 8 maggio 2026', en: 'Friday, 8 May 2026' },
  intro: { de: 'Heute aus der Hofküche — vorwiegend mit Zutaten aus dem eigenen Garten und dem Eisacktal.',
           it: 'Oggi dalla cucina del maso — con ingredienti del nostro orto e della Val d\u2019Isarco.',
           en: 'From the farm kitchen today — using produce from our garden and the Eisack valley.' },
  items: [
    { kind:'soup', refId:'spargel' },
    { kind:'primi', refId:'risotto' },
    { kind:'main', refId:'spargel-main' },
    { kind:'dessert', refId:'sorbet' },
  ],
};

Object.assign(window, { MENU: CATEGORIES, CATEGORIES, DRINKS, WINES, WINE_LEGEND, SPECIALS, UI_STRINGS, HOF_INTRO });
