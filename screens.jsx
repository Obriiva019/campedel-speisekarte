// screens.jsx — four connected magazine screens.
// Each screen receives { lang, setLang, dark, goTo, itemId? } and shares state
// via the parent app, so language + theme persist across navigation.

// ────────────────────────────────────────────────────────────
// 01 · Landing (QR cover)
// ────────────────────────────────────────────────────────────
function MagLanding({ lang, setLang, dark, goTo }) {
  const t = makeT(lang);
  const ink = dark ? '#f1e7d0' : PALETTE.forest;
  const sub = dark ? 'rgba(237,228,207,.55)' : 'rgba(15,32,21,.55)';
  const rule = dark ? 'rgba(255,255,255,.1)' : 'rgba(15,32,21,.12)';

  return (
    <div className="mag-screen">
      <div style={{ padding: '14px 18px 0',
                    display:'flex', justifyContent:'space-between', alignItems:'center',
                    borderBottom: `1px solid ${rule}`, paddingBottom: 10 }}>
        <span style={{ fontSize: 9, letterSpacing:'.24em', textTransform:'uppercase',
                       fontFamily:'"JetBrains Mono", monospace', color: sub }}>
          №01 · {L(t.season, lang)}
        </span>
        <LangPicker dark={dark} value={lang} onChange={setLang} />
      </div>

      <div style={{ padding: '34px 22px 8px' }}>
        <div style={{ fontSize: 9.5, letterSpacing:'.32em', textTransform:'uppercase',
                      fontFamily:'"JetBrains Mono", monospace',
                      color: dark?PALETTE.gold:PALETTE.goldDeep, marginBottom: 18 }}>
          {L(t.welcome, lang)}
        </div>
        <h1 style={{ margin: 0, fontWeight: 200, fontSize: 'clamp(48px, 14vw, 64px)', lineHeight: .92,
                     letterSpacing:'-.05em', color: ink }}>
          Campedèl
        </h1>
        <h1 style={{ margin: '0 0 0 8px', fontWeight: 800, fontSize: 'clamp(48px, 14vw, 64px)', lineHeight: .92,
                     letterSpacing:'-.05em', color: ink, fontStyle:'italic' }}>
          Hof.
        </h1>
        <div style={{ marginTop: 18, display:'flex', alignItems:'center', gap: 10 }}>
          <span style={{ flex:1, height: 1, background: dark?PALETTE.gold:PALETTE.forest, opacity:.6 }}/>
          <span style={{ fontSize: 9.5, letterSpacing:'.24em', textTransform:'uppercase',
                         fontFamily:'"JetBrains Mono", monospace', color: ink, fontWeight: 600 }}>
            {L(t.tagline, lang)}
          </span>
        </div>
      </div>

      <div style={{ padding: '20px 22px 0' }}>
        <ImgPlaceholder ratio="3 / 2" tint={dark?'forest':'stone'} radius={4}
          caption={lang==='de'?'foto · der hof am abend':lang==='it'?'foto · il maso di sera':'photo · the farm at dusk'} />
      </div>

      <div style={{ padding: '20px 22px 0' }}>
        <p style={{ margin: 0, fontWeight: 200, fontSize: 17, lineHeight: 1.32, letterSpacing:'-.005em',
                    textWrap:'pretty', color: ink, fontStyle:'italic' }}>
          „{lang==='de'?'Saftige Wiesen, herrliche Aussicht, gutes Essen und ausgezeichneter Wein.'
             :lang==='it'?'Prati rigogliosi, una vista splendida, ottimo cibo e vino eccellente.'
             :'Lush meadows, stunning views, excellent food, and outstanding wine.'}"
        </p>
        <div style={{ marginTop: 16, fontSize: 12.5, lineHeight: 1.55, textWrap:'pretty', color: sub }}>
          {L(HOF_INTRO, lang)}
        </div>
      </div>

      <div style={{ padding: '24px 22px 0' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 10 }}>
          <div style={{ flex:1, height: 1, background: rule }}/>
          <span style={{ fontSize: 9.5, letterSpacing:'.24em', textTransform:'uppercase',
                         fontFamily:'"JetBrains Mono", monospace', color: sub }}>
            {lang==='de'?'Inhalt':lang==='it'?'Indice':'Contents'}
          </span>
          <div style={{ flex:1, height: 1, background: rule }}/>
        </div>
        <div>
          {CATEGORIES.slice(0,5).map((c, i) => (
            <button key={c.id} onClick={() => goTo('menu', { open: c.id })} style={{
              all:'unset', cursor:'pointer',
              display:'flex', alignItems:'baseline', gap: 10, width:'100%',
              padding: '10px 0', borderTop: i===0?'none':`1px solid ${rule}`,
            }}>
              <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                             color: dark?PALETTE.gold:PALETTE.goldDeep,
                             letterSpacing:'.1em', width: 26 }}>
                {String(i+1).padStart(2,'0')}
              </span>
              <span style={{ fontSize: 13.5, fontWeight: 600, color: ink, flex:1 }}>
                {L(c.name, lang)}
              </span>
              <span style={{ flex: 1, height: 1, borderBottom: `1px dotted ${rule}`,
                             marginBottom: 4 }}/>
              <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                             color: sub, letterSpacing:'.1em' }}>
                p. {String((i+1)*2).padStart(2,'0')}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '24px 22px 22px', display:'flex', flexDirection:'column', gap: 10 }}>
        <button onClick={() => goTo('menu')} style={{
          width:'100%', padding:'16px 18px', borderRadius: 4, border: `1px solid ${ink}`,
          background: ink, color: dark?PALETTE.forest:'#fbf6ec',
          fontSize: 14, fontWeight: 700, letterSpacing:'.02em', cursor:'pointer',
          display:'flex', justifyContent:'space-between', alignItems:'center',
          fontFamily:'inherit',
        }}>
          <span>{L(t.open_menu, lang)} →</span>
          <span style={{ fontFamily:'"JetBrains Mono", monospace', fontSize: 10, opacity:.7, letterSpacing:'.1em' }}>
            P.02
          </span>
        </button>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
          <button onClick={() => goTo('specials')} style={{
            padding:'12px 14px', borderRadius: 4,
            border: `1px solid ${dark?'rgba(237,228,207,.25)':'rgba(15,32,21,.2)'}`,
            background: 'transparent', color: ink,
            fontSize: 12.5, fontWeight: 600, letterSpacing:'.01em', cursor:'pointer',
            textAlign:'left', display:'flex', flexDirection:'column', gap: 4,
            fontFamily:'inherit',
          }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius:'50%', background: PALETTE.gold }}/>
              {L(t.todays, lang)}
            </span>
            <span style={{ fontSize: 9.5, fontFamily:'"JetBrains Mono", monospace',
                           letterSpacing:'.12em', textTransform:'uppercase', color: sub }}>
              4 {lang==='de'?'Gänge':lang==='it'?'portate':'courses'}
            </span>
          </button>
          <button onClick={() => goTo('wines')} style={{
            padding:'12px 14px', borderRadius: 4,
            border: `1px solid ${dark?'rgba(237,228,207,.25)':'rgba(15,32,21,.2)'}`,
            background: 'transparent', color: ink,
            fontSize: 12.5, fontWeight: 600, letterSpacing:'.01em', cursor:'pointer',
            textAlign:'left', display:'flex', flexDirection:'column', gap: 4,
            fontFamily:'inherit',
          }}>
            <span style={{ display:'inline-flex', alignItems:'center', gap: 6 }}>
              <span style={{
                width: 8, height: 8, transform:'rotate(45deg)',
                background: dark?PALETTE.gold:PALETTE.goldDeep,
              }}/>
              {L(t.wines, lang)} & {L(t.drinks, lang)}
            </span>
            <span style={{ fontSize: 9.5, fontFamily:'"JetBrains Mono", monospace',
                           letterSpacing:'.12em', textTransform:'uppercase', color: sub }}>
              {WINES.white.length + WINES.red.length + WINES.bubbles.length}+ {lang==='de'?'Weine':lang==='it'?'vini':'wines'}
            </span>
          </button>
        </div>
        <div style={{ marginTop: 8, textAlign:'center', fontSize: 9.5, fontFamily:'"JetBrains Mono", monospace',
                      letterSpacing:'.2em', textTransform:'uppercase', color: sub }}>
          {L(t.hours, lang)}
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 02 · Menu — editorial accordion
// ────────────────────────────────────────────────────────────
function MagMenu({ lang, setLang, dark, goTo, initialOpen }) {
  const [open, setOpen] = React.useState(initialOpen || 'primi');
  const [diet, setDiet] = React.useState([]);
  const t = makeT(lang);

  const toggleDiet = (k) => setDiet(d => d.includes(k) ? d.filter(x=>x!==k) : [...d, k]);

  const ink = dark ? '#f1e7d0' : PALETTE.forest;
  const inkSoft = dark ? 'rgba(241,231,208,.78)' : 'rgba(15,32,21,.85)';
  const sub = dark ? 'rgba(237,228,207,.5)' : 'rgba(15,32,21,.5)';
  const rule = dark ? 'rgba(255,255,255,.08)' : 'rgba(15,32,21,.12)';

  return (
    <div className="mag-screen">
      <div className="mag-sticky" style={{
        background: dark?'rgba(15,32,21,.94)':'rgba(245,237,224,.94)',
        backdropFilter:'blur(8px)',
        borderBottom: `1px solid ${rule}`,
      }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding: '10px 16px' }}>
          <button onClick={() => goTo('landing')} style={{
            all:'unset', cursor:'pointer', display:'flex', alignItems:'baseline', gap: 8,
          }}>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing:'-.03em', color: ink }}>Campedèl</span>
            <span style={{ fontSize: 9, letterSpacing:'.24em', textTransform:'uppercase',
                           fontFamily:'"JetBrains Mono", monospace',
                           color: dark?PALETTE.gold:PALETTE.goldDeep }}>HOF</span>
          </button>
          <LangPicker dark={dark} value={lang} onChange={setLang} />
        </div>
        <div style={{ padding: '0 16px 8px', display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
          <span style={{ fontSize: 9, letterSpacing:'.2em', textTransform:'uppercase',
                         fontFamily:'"JetBrains Mono", monospace', color: sub }}>
            №01 · {L(t.menu, lang)}
          </span>
          <span style={{ fontSize: 9, letterSpacing:'.2em', textTransform:'uppercase',
                         fontFamily:'"JetBrains Mono", monospace', color: sub }}>
            {L(t.season, lang)}
          </span>
        </div>
      </div>

      <div style={{ padding: '20px 18px 4px' }}>
        <h1 style={{ margin: 0, fontWeight: 200, fontSize: 'clamp(34px, 10vw, 42px)', lineHeight: .98,
                     letterSpacing:'-.045em', color: ink, textWrap:'balance' }}>
          {lang==='de' ? <>Aus der<br/><em style={{ fontStyle:'italic', fontWeight: 600 }}>Hofküche.</em></>
           : lang==='it' ? <>Dalla<br/><em style={{ fontStyle:'italic', fontWeight: 600 }}>cucina del maso.</em></>
           : <>From the<br/><em style={{ fontStyle:'italic', fontWeight: 600 }}>farm kitchen.</em></>}
        </h1>
        <p style={{ marginTop: 16, fontSize: 13, lineHeight: 1.55, textWrap:'pretty',
                    color: inkSoft, maxWidth: 320 }}>
          {lang==='de'
            ? 'Sechs Kapitel, vorwiegend mit Zutaten aus eigenem Anbau und Eisacktaler Höfen. Falten Sie sich durch — die Karte folgt dem Lauf eines Mahls.'
            : lang==='it'
            ? 'Sei capitoli, con ingredienti del nostro orto e dei masi della Val d\u2019Isarco. Sfogliate — la carta segue il ritmo di un pasto.'
            : 'Six chapters, mostly with produce from our garden and Eisack-valley farms. Leaf through — the menu follows the rhythm of a meal.'}
        </p>
      </div>

      <div style={{ padding: '14px 18px 0' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 8, marginBottom: 10 }}>
          <div style={{ flex:1, height: 1, background: rule }}/>
          <span style={{ fontSize: 9, letterSpacing:'.2em', textTransform:'uppercase',
                         fontFamily:'"JetBrains Mono", monospace', color: sub }}>
            {L(t.filters, lang)}
          </span>
          <div style={{ flex:1, height: 1, background: rule }}/>
        </div>
        <DietFilterRow dark={dark} active={diet} onToggle={toggleDiet} t={t} />
      </div>

      <div style={{ padding: '12px 0 80px' }}>
        {CATEGORIES.map((cat, ci) => {
          const items = cat.items.filter(it => diet.every(k => it.d.includes(k)));
          const isOpen = open === cat.id;
          return (
            <article key={cat.id} style={{ borderTop: ci===0 ? 'none' : `1px solid ${rule}` }}>
              <button onClick={() => setOpen(isOpen ? null : cat.id)} style={{
                all:'unset', cursor:'pointer', width:'100%', boxSizing:'border-box',
                padding: '18px 18px',
                display:'flex', alignItems:'center', gap: 14,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, letterSpacing:'.12em',
                  fontFamily:'"JetBrains Mono", monospace',
                  color: dark?PALETTE.gold:PALETTE.goldDeep, width: 28, flex:'0 0 28px',
                }}>{String(ci+1).padStart(2,'0')}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, letterSpacing:'-.02em',
                                color: ink, textWrap:'pretty' }}>
                    {L(cat.name, lang)}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 10.5, fontStyle:'italic',
                                color: sub }}>
                    {['de','it','en'].filter(l=>l!==lang).map(l => L(cat.name, l)).join(' · ')}
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap: 8,
                              color: dark?'rgba(237,228,207,.55)':'rgba(15,32,21,.55)' }}>
                  <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                                 letterSpacing:'.1em' }}>{String(items.length).padStart(2,'0')}</span>
                  {Icon.chev(14, 'currentColor', isOpen?'up':'down')}
                </div>
              </button>

              {isOpen && (
                <div style={{ padding: '0 18px 24px' }}>
                  {items.map((it, i) => (
                    <button key={it.id} onClick={() => goTo('detail', { itemId: it.id, catId: cat.id })} style={{
                      all:'unset', cursor:'pointer', width:'100%', boxSizing:'border-box',
                      display:'grid', gridTemplateColumns: '28px 1fr auto',
                      gap: 14, alignItems:'baseline',
                      padding: '14px 0',
                      borderTop: `1px solid ${rule}`,
                    }}>
                      <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                                     color: sub, letterSpacing:'.1em', paddingTop: 2 }}>
                        {String(ci+1)}.{String(i+1).padStart(2,'0')}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.25,
                                      letterSpacing:'-.005em',
                                      color: ink, textWrap:'pretty' }}>
                          {L(it.name, lang)}
                        </div>
                        <div style={{ marginTop: 3, fontSize: 10.5, fontStyle:'italic',
                                      color: sub, lineHeight: 1.35, textWrap:'pretty' }}>
                          {L(it.name, lang==='de'?'it':lang==='it'?'en':'de')}
                        </div>
                        {it.desc && (
                          <div style={{ marginTop: 6, fontSize: 12, lineHeight: 1.45,
                                        color: dark?'rgba(237,228,207,.7)':'rgba(15,32,21,.7)',
                                        textWrap:'pretty' }}>
                            {L(it.desc, lang)}
                          </div>
                        )}
                        <div style={{ display:'flex', alignItems:'center', gap: 6, flexWrap:'wrap', marginTop: 8 }}>
                          {it.h && <OriginBadge dark={dark} t={t} />}
                          {it.hm && !it.h && (
                            <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing:'.06em',
                                           color: dark?PALETTE.gold:PALETTE.goldDeep,
                                           fontFamily:'"JetBrains Mono", monospace',
                                           textTransform:'uppercase', display:'inline-flex', alignItems:'center', gap: 4 }}>
                              {Icon.diamond(7)} {L(t.house_made, lang)}
                            </span>
                          )}
                          {it.d.map(k => <DietBadge key={k} k={k} dark={dark} />)}
                        </div>
                      </div>
                      <div style={{ fontSize: 14.5, fontWeight: 600,
                                    fontFamily:'"JetBrains Mono", monospace',
                                    color: dark?PALETTE.gold:PALETTE.forest, fontVariantNumeric:'tabular-nums',
                                    whiteSpace:'nowrap' }}>
                        {it.p}<span style={{ fontWeight:400, opacity:.55, fontSize: 11 }}> €</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </article>
          );
        })}

        <div style={{ padding: '36px 22px 16px', textAlign:'center',
                      borderTop: `1px solid ${rule}` }}>
          <div style={{ fontSize: 9, letterSpacing:'.22em', textTransform:'uppercase',
                        fontFamily:'"JetBrains Mono", monospace', color: sub, marginBottom: 14 }}>
            ◇ ◆ ◇
          </div>
          <p style={{ margin: 0, fontWeight: 200, fontSize: 18, lineHeight: 1.25,
                      letterSpacing:'-.015em', color: ink, fontStyle:'italic', textWrap:'balance' }}>
            „{lang==='de'?'Das Leben ist viel zu kurz, um schlechten Wein zu trinken.'
              :lang==='it'?'La vita è troppo breve per bere vini mediocri.'
              :'Life is far too short to drink bad wine.'}"
          </p>
          <div style={{ marginTop: 10, fontSize: 10, letterSpacing:'.16em', textTransform:'uppercase',
                        fontFamily:'"JetBrains Mono", monospace', color: sub }}>
            Goethe · 1749–1832
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 03 · Detail
// ────────────────────────────────────────────────────────────
function MagDetail({ lang, setLang, dark, goTo, itemId, catId }) {
  const t = makeT(lang);
  const cat = CATEGORIES.find(c => c.id === catId) || CATEGORIES.find(c => c.id === 'primi');
  const it = (cat.items.find(x => x.id === itemId)) || cat.items.find(x => x.id === 'schlutz');
  const ink = dark ? '#f1e7d0' : PALETTE.forest;
  const sub = dark ? 'rgba(237,228,207,.55)' : 'rgba(15,32,21,.55)';
  const rule = dark ? 'rgba(255,255,255,.1)' : 'rgba(15,32,21,.12)';

  // Fall back to placeholder if no photo
  const HeroImg = it.photo
    ? <Photo src={it.photo} ratio="4 / 3" radius={4} caption={`foto · ${cat.id}`} />
    : <ImgPlaceholder ratio="4 / 3" tint="forest" radius={4} caption={`foto · ${cat.id}`} />;

  return (
    <div className="mag-screen">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding: '10px 16px 6px' }}>
        <button onClick={() => goTo('menu', { open: cat.id })} style={{
          all:'unset', cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 6,
          color: ink, fontSize: 12, fontWeight: 500,
        }}>
          {Icon.back(18)} <span>{L(t.back, lang)}</span>
        </button>
        <LangPicker dark={dark} value={lang} onChange={setLang} />
      </div>

      <div style={{ padding: '6px 22px 0' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
          <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                         letterSpacing:'.2em', textTransform:'uppercase',
                         color: dark?PALETTE.gold:PALETTE.goldDeep }}>
            03.01 — {L(cat.name, lang)}
          </span>
          <span style={{ flex:1, height:1, background: rule }}/>
        </div>

        <h1 style={{ margin: '18px 0 0', fontWeight: 200, fontSize: 'clamp(30px, 9vw, 38px)', lineHeight: 1.02,
                     letterSpacing:'-.04em', color: ink, textWrap:'balance' }}>
          {L(it.name, lang)}
        </h1>

        <div style={{ marginTop: 14, fontSize: 12, fontStyle:'italic', color: sub, lineHeight: 1.5 }}>
          {['de','it','en'].filter(l=>l!==lang).map(l => (
            <div key={l}>{L(it.name, l)}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: '20px 22px 0' }}>{HeroImg}</div>

      {it.desc && (
        <div style={{ padding: '20px 22px 0' }}>
          <p style={{ margin:0, fontSize: 13.5, lineHeight: 1.55, textWrap:'pretty',
                      color: dark?'rgba(237,228,207,.85)':PALETTE.ink }}>
            <span style={{ float:'left', fontSize: 46, lineHeight: .85,
                           fontWeight: 700, letterSpacing:'-.03em',
                           color: dark?PALETTE.gold:PALETTE.forest,
                           paddingRight: 6, marginTop: 2 }}>
              {L(it.desc, lang).slice(0,1)}
            </span>
            {L(it.desc, lang).slice(1)}
          </p>
        </div>
      )}

      <div style={{ padding: '20px 22px 0' }}>
        <div style={{ borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`,
                      padding: '14px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
          <div>
            <div style={{ fontSize: 9.5, letterSpacing:'.18em', textTransform:'uppercase',
                          fontFamily:'"JetBrains Mono", monospace', color: sub }}>
              {lang==='de'?'Preis':lang==='it'?'Prezzo':'Price'}
            </div>
            <div style={{ marginTop: 4, fontSize: 24, fontWeight: 700,
                          fontFamily:'"JetBrains Mono", monospace',
                          color: dark?PALETTE.gold:PALETTE.forest, fontVariantNumeric:'tabular-nums' }}>
              {it.p} €
            </div>
          </div>
          <div>
            <div style={{ fontSize: 9.5, letterSpacing:'.18em', textTransform:'uppercase',
                          fontFamily:'"JetBrains Mono", monospace', color: sub }}>
              {lang==='de'?'Art':lang==='it'?'Tipo':'Diet'}
            </div>
            <div style={{ marginTop: 6, display:'flex', gap: 5, flexWrap:'wrap', alignItems:'center' }}>
              {it.h && <OriginBadge dark={dark} t={t} />}
              {it.d.map(k => <DietBadge key={k} k={k} dark={dark} />)}
              {it.hm && (
                <span style={{ fontSize: 9, fontWeight: 700, padding:'2px 6px', borderRadius: 6,
                               border: `1px solid ${dark?PALETTE.gold:PALETTE.goldDeep}`,
                               color: dark?PALETTE.gold:PALETTE.goldDeep,
                               fontFamily:'"JetBrains Mono", monospace', letterSpacing:'.06em' }}>HM</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {it.ingredients && (
        <div style={{ padding: '18px 22px 0' }}>
          <div style={{ fontSize: 9.5, letterSpacing:'.18em', textTransform:'uppercase',
                        fontFamily:'"JetBrains Mono", monospace', color: sub, marginBottom: 8 }}>
            {L(t.ingredients, lang)}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.7, color: dark?'rgba(237,228,207,.85)':PALETTE.ink,
                        columnCount: 2, columnGap: 18 }}>
            {L(it.ingredients, lang).join(' · ')}
          </div>
        </div>
      )}

      {it.pairing && (
        <div style={{ padding: '20px 22px 40px' }}>
          <div style={{ borderTop: `1px solid ${rule}`, paddingTop: 14 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline' }}>
              <div style={{ fontSize: 9.5, letterSpacing:'.18em', textTransform:'uppercase',
                            fontFamily:'"JetBrains Mono", monospace',
                            color: dark?PALETTE.gold:PALETTE.goldDeep }}>
                {L(t.pairing, lang)}
              </div>
              <div style={{ fontSize: 11, fontFamily:'"JetBrains Mono", monospace',
                            color: sub, fontVariantNumeric:'tabular-nums' }}>
                0,75l · 32,00 €
              </div>
            </div>
            <div style={{ marginTop: 6, fontWeight: 200, fontSize: 24, letterSpacing:'-.02em',
                          color: ink }}>
              {it.pairing.split('·')[0].trim()}
            </div>
            <div style={{ fontSize: 11, fontStyle:'italic', color: sub }}>
              {it.pairing.split('·').slice(1).join('·').trim()}
            </div>
          </div>
        </div>
      )}

      {!it.pairing && <div style={{ height: 40 }}/>}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 04 · Specials / Tageskarte
// ────────────────────────────────────────────────────────────
function MagSpecials({ lang, setLang, dark, goTo }) {
  const t = makeT(lang);
  const ink = dark ? '#f1e7d0' : PALETTE.forest;
  const sub = dark ? 'rgba(237,228,207,.55)' : 'rgba(15,32,21,.55)';
  const rule = dark ? 'rgba(255,255,255,.1)' : 'rgba(15,32,21,.12)';
  const resolved = SPECIALS.items.map(s => ({
    cat: CATEGORIES.find(c => c.id === s.kind),
    it:  CATEGORIES.find(c => c.id === s.kind).items.find(x => x.id === s.refId),
  }));

  return (
    <div className="mag-screen">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding: '10px 16px 6px' }}>
        <button onClick={() => goTo('landing')} style={{
          all:'unset', cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 6,
          color: ink, fontSize: 12, fontWeight: 500,
        }}>
          {Icon.back(18)} <span>{L(t.back, lang)}</span>
        </button>
        <LangPicker dark={dark} value={lang} onChange={setLang} />
      </div>

      <div style={{ padding: '6px 22px 0' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', gap: 8, flexWrap:'wrap' }}>
          <span style={{ fontSize: 9.5, letterSpacing:'.24em', textTransform:'uppercase',
                         fontFamily:'"JetBrains Mono", monospace',
                         color: dark?PALETTE.gold:PALETTE.goldDeep }}>
            №01 · {L(t.today, lang)}
          </span>
          <span style={{ fontSize: 9.5, letterSpacing:'.16em', textTransform:'uppercase',
                         fontFamily:'"JetBrains Mono", monospace', color: sub }}>
            {L(SPECIALS.date, lang)}
          </span>
        </div>

        <h1 style={{ margin: '18px 0 0', fontWeight: 200, fontSize: 'clamp(30px, 9.5vw, 40px)', lineHeight: .98,
                     letterSpacing:'-.045em', color: ink, textWrap:'balance' }}>
          {lang==='de' ? <>Was heute auf dem<br/><em style={{ fontStyle:'italic', fontWeight: 700 }}>Tisch steht.</em></>
           : lang==='it' ? <>Cosa c\u2019è oggi<br/><em style={{ fontStyle:'italic', fontWeight: 700 }}>in tavola.</em></>
           : <>What\u2019s on the<br/><em style={{ fontStyle:'italic', fontWeight: 700 }}>table today.</em></>}
        </h1>

        <p style={{ marginTop: 14, fontSize: 13, lineHeight: 1.55, textWrap:'pretty',
                    color: dark?'rgba(237,228,207,.78)':'rgba(15,32,21,.78)' }}>
          {L(SPECIALS.intro, lang)}
        </p>
      </div>

      <div style={{ padding: '22px 22px 0' }}>
        {resolved.map(({ cat, it }, i) => (
          <button key={it.id} onClick={() => goTo('detail', { itemId: it.id, catId: cat.id })} style={{
            all:'unset', cursor:'pointer', width:'100%', boxSizing:'border-box',
            borderTop: `1px solid ${rule}`,
            padding: '18px 0',
            display:'grid', gridTemplateColumns:'48px 1fr',
            gap: 14,
          }}>
            <div>
              <div style={{
                fontWeight: 200, fontSize: 44, lineHeight: .9, letterSpacing:'-.045em',
                color: dark?PALETTE.gold:PALETTE.goldDeep, fontFamily:'inherit',
              }}>{String(i+1).padStart(2,'0')}</div>
            </div>
            <div>
              <div style={{ fontSize: 10, letterSpacing:'.16em', textTransform:'uppercase',
                            fontFamily:'"JetBrains Mono", monospace', color: sub }}>
                {L(cat.name, lang)}
              </div>
              <div style={{ marginTop: 4, fontSize: 18, fontWeight: 600, lineHeight: 1.18,
                            letterSpacing:'-.015em', color: ink, textWrap:'pretty' }}>
                {L(it.name, lang)}
              </div>
              <div style={{ marginTop: 4, fontSize: 11, fontStyle:'italic', color: sub, lineHeight: 1.4 }}>
                {L(it.name, lang==='de'?'it':'de')}
              </div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop: 10 }}>
                <div style={{ display:'flex', gap: 5, flexWrap:'wrap' }}>
                  {it.h && <OriginBadge dark={dark} t={t} />}
                  {it.d.slice(0,3).map(k => <DietBadge key={k} k={k} dark={dark} />)}
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 600, fontFamily:'"JetBrains Mono", monospace',
                              color: dark?PALETTE.gold:PALETTE.forest, fontVariantNumeric:'tabular-nums' }}>
                  {it.p} €
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: '24px 22px 40px' }}>
        <div style={{ borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`,
                      padding: '14px 0', display:'flex', justifyContent:'space-between', alignItems:'center', gap: 10 }}>
          <div>
            <div style={{ fontSize: 9.5, letterSpacing:'.18em', textTransform:'uppercase',
                          fontFamily:'"JetBrains Mono", monospace',
                          color: dark?PALETTE.gold:PALETTE.goldDeep }}>
              {lang==='de'?'Alle 4 Gänge':lang==='it'?'Tutte 4 le portate':'All 4 courses'}
            </div>
            <div style={{ marginTop: 4, fontWeight: 200, fontSize: 22, letterSpacing:'-.02em', color: ink }}>
              {L(t.from_farm, lang)}
            </div>
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, fontFamily:'"JetBrains Mono", monospace',
                        color: dark?PALETTE.gold:PALETTE.forest, fontVariantNumeric:'tabular-nums' }}>
            42,00<span style={{ opacity:.5, fontWeight: 300, fontSize: 14 }}> €</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// 06 · Wine Detail
// ────────────────────────────────────────────────────────────
function MagWineDetail({ lang, setLang, dark, goTo, wineId, sectionId }) {
  const t = makeT(lang);
  const ink = dark ? '#f1e7d0' : PALETTE.forest;
  const sub = dark ? 'rgba(237,228,207,.55)' : 'rgba(15,32,21,.55)';
  const rule = dark ? 'rgba(255,255,255,.1)' : 'rgba(15,32,21,.12)';

  const allWines = [...WINES.bubbles, ...WINES.white, ...WINES.red];
  const w = allWines.find(x => x.id === wineId) || allWines[0];
  const sec = WINE_SECTIONS.find(s => s.id === sectionId) || WINE_SECTIONS[0];

  const HeroImg = w.photo
    ? <Photo src={w.photo} ratio="4 / 3" radius={4} caption={`foto · ${w.name}`} />
    : <ImgPlaceholder ratio="4 / 3" tint="forest" radius={4} caption={`foto · ${w.name}`} />;

  return (
    <div className="mag-screen">
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding: '10px 16px 6px' }}>
        <button onClick={() => goTo('wines', { open: sectionId })} style={{
          all:'unset', cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 6,
          color: ink, fontSize: 12, fontWeight: 500,
        }}>
          {Icon.back(18)} <span>{L(t.back, lang)}</span>
        </button>
        <LangPicker dark={dark} value={lang} onChange={setLang} />
      </div>

      <div style={{ padding: '6px 22px 0' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
          <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                         letterSpacing:'.2em', textTransform:'uppercase',
                         color: dark?PALETTE.gold:PALETTE.goldDeep }}>
            {L(sec.name, lang)}
          </span>
          <span style={{ flex:1, height:1, background: rule }}/>
        </div>

        <h1 style={{ margin: '18px 0 0', fontWeight: 200, fontSize: 'clamp(28px, 9vw, 36px)', lineHeight: 1.02,
                     letterSpacing:'-.04em', color: ink, textWrap:'balance' }}>
          {w.name}
        </h1>

        <div style={{ marginTop: 6, fontSize: 14, fontStyle:'italic', color: sub }}>
          {w.maker}
        </div>

        {w.house && (
          <div style={{ marginTop: 10 }}>
            <span style={{
              fontSize: 10, fontWeight: 700, padding:'3px 8px', borderRadius: 6,
              border: `1px solid ${dark?PALETTE.gold:PALETTE.goldDeep}`,
              color: dark?PALETTE.gold:PALETTE.goldDeep,
              fontFamily:'"JetBrains Mono", monospace', letterSpacing:'.06em', textTransform:'uppercase',
            }}>
              {lang==='it'?'Vino della casa':lang==='en'?'House wine':'Hauswein'}
            </span>
          </div>
        )}
      </div>

      <div style={{ padding: '20px 22px 0' }}>{HeroImg}</div>

      <div style={{ padding: '20px 22px 0' }}>
        <div style={{ borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`,
                      padding: '14px 0', display:'grid', gridTemplateColumns:'1fr 1fr', gap: 10 }}>
          <div>
            <div style={{ fontSize: 9.5, letterSpacing:'.18em', textTransform:'uppercase',
                          fontFamily:'"JetBrains Mono", monospace', color: sub }}>
              {lang==='de'?'Herkunft':lang==='it'?'Origine':'Origin'}
            </div>
            <div style={{ marginTop: 6, fontSize: 12.5, lineHeight: 1.45, color: ink }}>
              {w.region}
            </div>
          </div>
          {w.grapes && (
            <div>
              <div style={{ fontSize: 9.5, letterSpacing:'.18em', textTransform:'uppercase',
                            fontFamily:'"JetBrains Mono", monospace', color: sub }}>
                {lang==='de'?'Rebsorten':lang==='it'?'Vitigni':'Grapes'}
              </div>
              <div style={{ marginTop: 6, fontSize: 12.5, lineHeight: 1.45, color: ink }}>
                {w.grapes}
              </div>
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '20px 22px 0' }}>
        <div style={{ fontSize: 9.5, letterSpacing:'.18em', textTransform:'uppercase',
                      fontFamily:'"JetBrains Mono", monospace', color: sub, marginBottom: 8 }}>
          {lang==='de'?'Preise':lang==='it'?'Prezzi':'Prices'}
        </div>
        {w.sizes.map((sz, j) => (
          <div key={j} style={{
            display:'flex', alignItems:'baseline', justifyContent:'space-between',
            borderTop: `1px solid ${rule}`, paddingTop: 10, paddingBottom: 6,
            fontFamily:'"JetBrains Mono", monospace', fontVariantNumeric:'tabular-nums',
          }}>
            <span style={{ fontSize: 12, color: sub, letterSpacing:'.04em' }}>{sz.s}</span>
            <span style={{ fontSize: 20, fontWeight: 700,
                           color: dark?PALETTE.gold:PALETTE.forest }}>
              {sz.p}<span style={{ opacity:.5, fontWeight:400, fontSize: 13 }}> €</span>
            </span>
          </div>
        ))}
      </div>

      {w.note && (
        <div style={{ padding: '16px 22px 0' }}>
          <div style={{ borderTop: `1px solid ${rule}`, paddingTop: 14 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing:'.08em',
                           color: dark?PALETTE.gold:PALETTE.goldDeep,
                           fontFamily:'"JetBrains Mono", monospace', textTransform:'uppercase' }}>
              ★ {w.note}
            </span>
          </div>
        </div>
      )}

      <div style={{ height: 40 }}/>
    </div>
  );
}

Object.assign(window, { MagLanding, MagMenu, MagDetail, MagSpecials, MagWines, MagWineDetail });

// ────────────────────────────────────────────────────────────
// 05 · Wein & Getränke
// ────────────────────────────────────────────────────────────

const WINE_SECTIONS = [
  { id: 'bubbles',  data: () => WINES.bubbles, kind: 'wine',
    name: { de:'Schaumwein',     it:'Bollicine',         en:'Sparkling'   } },
  { id: 'white',    data: () => WINES.white,   kind: 'wine',
    name: { de:'Weißwein',       it:'Vino bianco',       en:'White wine'  } },
  { id: 'red',      data: () => WINES.red,     kind: 'wine',
    name: { de:'Rotwein',        it:'Vino rosso',        en:'Red wine'    } },
  { id: 'aperitif', data: () => DRINKS.aperitif, kind: 'simple',
    name: { de:'Aperitif',       it:'Aperitivi',         en:'Aperitifs'   } },
  { id: 'beer',     data: () => DRINKS.beer,   kind: 'grid',
    name: { de:'Bier',           it:'Birra',             en:'Beer'        } },
  { id: 'water',    data: () => DRINKS.water,  kind: 'grid',
    name: { de:'Wasser & Säfte', it:'Acqua & succhi',    en:'Water & juices' } },
  { id: 'juices',   data: () => DRINKS.juices, kind: 'grid',
    name: { de:'Hausgemachte Säfte', it:'Succhi fatti in casa', en:'Homemade juices' } },
  { id: 'hot',      data: () => DRINKS.hot,    kind: 'simple',
    name: { de:'Warme Getränke', it:'Bevande calde',     en:'Hot drinks'  } },
  { id: 'digestif', data: () => DRINKS.digestif, kind: 'simple',
    name: { de:'Digestif',       it:'Digestivi',         en:'Digestifs'   } },
];

function MagWines({ lang, setLang, dark, goTo, initialOpen }) {
  const [open, setOpen] = React.useState(initialOpen || 'white');
  const t = makeT(lang);

  const ink = dark ? '#f1e7d0' : PALETTE.forest;
  const sub = dark ? 'rgba(237,228,207,.5)' : 'rgba(15,32,21,.5)';
  const inkSoft = dark ? 'rgba(241,231,208,.8)' : 'rgba(15,32,21,.78)';
  const rule = dark ? 'rgba(255,255,255,.08)' : 'rgba(15,32,21,.12)';

  return (
    <div className="mag-screen">
      {/* Header with back */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center',
                    padding: '10px 16px 6px' }}>
        <button onClick={() => goTo('landing')} style={{
          all:'unset', cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 6,
          color: ink, fontSize: 12, fontWeight: 500,
        }}>
          {Icon.back(18)} <span>{L(t.back, lang)}</span>
        </button>
        <LangPicker dark={dark} value={lang} onChange={setLang} />
      </div>

      {/* Editorial cover */}
      <div style={{ padding: '6px 22px 0' }}>
        <div style={{ display:'flex', alignItems:'center', gap: 10 }}>
          <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                         letterSpacing:'.2em', textTransform:'uppercase',
                         color: dark?PALETTE.gold:PALETTE.goldDeep }}>
            №02 · {L(t.wines, lang)} & {L(t.drinks, lang)}
          </span>
          <span style={{ flex:1, height:1, background: rule }}/>
        </div>

        <h1 style={{ margin: '18px 0 0', fontWeight: 200, fontSize: 'clamp(34px, 10vw, 42px)', lineHeight: .98,
                     letterSpacing:'-.045em', color: ink, textWrap:'balance' }}>
          {lang==='de' ? <>Aus dem<br/><em style={{ fontStyle:'italic', fontWeight: 700 }}>Campedèl-Keller.</em></>
           : lang==='it' ? <>Dalla<br/><em style={{ fontStyle:'italic', fontWeight: 700 }}>cantina Campedèl.</em></>
           : <>From the<br/><em style={{ fontStyle:'italic', fontWeight: 700 }}>Campedèl cellar.</em></>}
        </h1>

        <p style={{ marginTop: 16, fontSize: 13, lineHeight: 1.55, textWrap:'pretty', color: inkSoft }}>
          {lang==='de'
            ? 'Vorwiegend Südtiroler Lagen, ein paar Reisende aus dem Trentino und Venetien. Die Hausweine sind offen, bis zu 0,75 l.'
            : lang==='it'
            ? 'Soprattutto Alto Adige, qualche tappa in Trentino e Veneto. I vini della casa sono alla mescita, fino a 0,75 l.'
            : 'Mostly South Tyrolean estates, a few travelers from Trentino and the Veneto. House wines by the glass up to 0,75 l.'}
        </p>

        {/* Goethe quote — moved here from the menu since it belongs to the wine card */}
        <div style={{ marginTop: 20, padding: '14px 0', borderTop: `1px solid ${rule}`, borderBottom: `1px solid ${rule}`,
                      textAlign:'center' }}>
          <p style={{ margin: 0, fontWeight: 200, fontSize: 16, lineHeight: 1.3, letterSpacing:'-.01em',
                      color: ink, fontStyle:'italic', textWrap:'balance' }}>
            „{lang==='de'?'Das Leben ist viel zu kurz, um schlechten Wein zu trinken.'
              :lang==='it'?'La vita è troppo breve per bere vini mediocri.'
              :'Life is far too short to drink bad wine.'}"
          </p>
          <div style={{ marginTop: 6, fontSize: 9.5, letterSpacing:'.18em', textTransform:'uppercase',
                        fontFamily:'"JetBrains Mono", monospace', color: sub }}>
            Goethe · 1749–1832
          </div>
        </div>
      </div>

      {/* Sections */}
      <div style={{ padding: '12px 0 24px' }}>
        {WINE_SECTIONS.map((sec, si) => {
          const isOpen = open === sec.id;
          const items = sec.data();
          const count = sec.kind === 'grid' ? items.items.length : items.length;
          return (
            <article key={sec.id} style={{ borderTop: si===0 ? 'none' : `1px solid ${rule}` }}>
              <button onClick={() => setOpen(isOpen ? null : sec.id)} style={{
                all:'unset', cursor:'pointer', width:'100%', boxSizing:'border-box',
                padding: '18px 18px', display:'flex', alignItems:'center', gap: 14,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 600, letterSpacing:'.12em',
                  fontFamily:'"JetBrains Mono", monospace',
                  color: dark?PALETTE.gold:PALETTE.goldDeep, width: 28, flex:'0 0 28px',
                }}>{String(si+1).padStart(2,'0')}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 22, fontWeight: 700, lineHeight: 1, letterSpacing:'-.02em',
                                color: ink }}>
                    {L(sec.name, lang)}
                  </div>
                  <div style={{ marginTop: 4, fontSize: 10.5, fontStyle:'italic', color: sub }}>
                    {['de','it','en'].filter(l=>l!==lang).map(l => L(sec.name, l)).join(' · ')}
                  </div>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap: 8,
                              color: dark?'rgba(237,228,207,.55)':'rgba(15,32,21,.55)' }}>
                  <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                                 letterSpacing:'.1em' }}>{String(count).padStart(2,'0')}</span>
                  {Icon.chev(14, 'currentColor', isOpen?'up':'down')}
                </div>
              </button>

              {isOpen && (
                <div style={{ padding: '0 18px 24px' }}>
                  {sec.kind === 'wine' && (
                    <WineList items={items} sectionIndex={si} dark={dark} lang={lang} sub={sub} ink={ink} rule={rule} goTo={goTo} sectionId={sec.id} />
                  )}
                  {sec.kind === 'simple' && (
                    <SimpleDrinkList items={items} sectionIndex={si} dark={dark} lang={lang} sub={sub} ink={ink} rule={rule} />
                  )}
                  {sec.kind === 'grid' && (
                    <GridDrinkList block={items} sectionIndex={si} dark={dark} lang={lang} sub={sub} ink={ink} rule={rule} />
                  )}
                </div>
              )}
            </article>
          );
        })}

        {/* Legend */}
        <div style={{ padding: '24px 22px 0', borderTop: `1px solid ${rule}` }}>
          <div style={{ fontSize: 9.5, letterSpacing:'.2em', textTransform:'uppercase',
                        fontFamily:'"JetBrains Mono", monospace', color: sub, marginBottom: 10 }}>
            {lang==='it'?'Legenda · Vitigni':'Legende · Rebsorten'}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'auto 1fr', columnGap: 10, rowGap: 4,
                        fontSize: 11, lineHeight: 1.45 }}>
            {WINE_LEGEND.map(([abbr, full]) => (
              <React.Fragment key={abbr}>
                <span style={{ fontFamily:'"JetBrains Mono", monospace', fontWeight: 600,
                               color: dark?PALETTE.gold:PALETTE.goldDeep, letterSpacing:'.06em' }}>
                  {abbr}
                </span>
                <span style={{ color: inkSoft }}>{full}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div style={{ padding: '24px 22px 40px', textAlign:'center', fontSize: 9.5,
                      fontFamily:'"JetBrains Mono", monospace', letterSpacing:'.2em',
                      textTransform:'uppercase', color: sub }}>
          {L(t.tagline, lang)}
        </div>
      </div>
    </div>
  );
}

// ─── Wine row (with possible multiple sizes) ───────────────
function WineList({ items, sectionIndex, dark, lang, sub, ink, rule, goTo, sectionId }) {
  return (
    <div>
      {items.map((w, i) => (
        <button key={w.id || w.name + i} onClick={() => goTo('wine-detail', { wineId: w.id, sectionId })} style={{
          all:'unset', cursor:'pointer', width:'100%', boxSizing:'border-box',
          display:'grid', gridTemplateColumns: '28px 1fr auto',
          gap: 14, alignItems:'baseline',
          padding: '14px 0', borderTop: `1px solid ${rule}`,
        }}>
          <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                         color: sub, letterSpacing:'.1em', paddingTop: 4 }}>
            {String(sectionIndex+1)}.{String(i+1).padStart(2,'0')}
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ display:'flex', alignItems:'baseline', gap: 8, flexWrap:'wrap' }}>
              <span style={{ fontSize: 14.5, fontWeight: 600, lineHeight: 1.25,
                             letterSpacing:'-.005em', color: ink }}>
                {w.name}
              </span>
              {w.house && (
                <span style={{
                  fontSize: 9, fontWeight: 700, padding:'2px 6px', borderRadius: 6,
                  border: `1px solid ${dark?PALETTE.gold:PALETTE.goldDeep}`,
                  color: dark?PALETTE.gold:PALETTE.goldDeep,
                  fontFamily:'"JetBrains Mono", monospace', letterSpacing:'.06em',
                  textTransform:'uppercase',
                }}>
                  {lang==='it'?'Vino della casa':lang==='en'?'House wine':'Hauswein'}
                </span>
              )}
            </div>
            <div style={{ marginTop: 3, fontSize: 11, color: sub, fontStyle:'italic' }}>
              {w.maker}
            </div>
            <div style={{ marginTop: 2, fontSize: 10.5, color: sub,
                          fontFamily:'"JetBrains Mono", monospace', letterSpacing:'.04em' }}>
              {w.region}{w.grapes ? ` · ${w.grapes}` : ''}
            </div>
            {w.note && (
              <div style={{ marginTop: 4 }}>
                <span style={{ fontSize: 9.5, fontWeight: 600, letterSpacing:'.06em',
                               color: dark?PALETTE.gold:PALETTE.goldDeep,
                               fontFamily:'"JetBrains Mono", monospace', textTransform:'uppercase' }}>
                  ★ {w.note}
                </span>
              </div>
            )}
          </div>
          <div style={{ textAlign:'right', display:'flex', flexDirection:'column', gap: 2,
                        alignItems:'flex-end', minWidth: 70 }}>
            {w.sizes.map((sz, j) => (
              <div key={j} style={{
                display:'flex', alignItems:'baseline', gap: 8,
                fontFamily:'"JetBrains Mono", monospace', fontVariantNumeric:'tabular-nums',
              }}>
                <span style={{ fontSize: 9.5, color: sub, letterSpacing:'.04em',
                               textTransform:'lowercase' }}>{sz.s}</span>
                <span style={{ fontSize: 13, fontWeight: 600,
                               color: dark?PALETTE.gold:PALETTE.forest, whiteSpace:'nowrap' }}>
                  {sz.p}<span style={{ opacity:.5, fontWeight:400, fontSize: 10 }}> €</span>
                </span>
              </div>
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}

// ─── Simple drink list (single price column) ───────────────
function SimpleDrinkList({ items, sectionIndex, dark, lang, sub, ink, rule }) {
  return (
    <div>
      {items.map((d, i) => (
        <div key={i} style={{
          display:'grid', gridTemplateColumns: '28px 1fr auto',
          gap: 14, alignItems:'baseline',
          padding: '12px 0', borderTop: `1px solid ${rule}`,
        }}>
          <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                         color: sub, letterSpacing:'.1em', paddingTop: 2 }}>
            {String(sectionIndex+1)}.{String(i+1).padStart(2,'0')}
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ display:'flex', alignItems:'baseline', gap: 8, flexWrap:'wrap' }}>
              <span style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.25,
                             color: ink }}>
                {L(d.n, lang)}
              </span>
              {d.sig && (
                <span style={{
                  fontSize: 9, fontWeight: 700, padding:'2px 6px', borderRadius: 6,
                  border: `1px solid ${dark?PALETTE.gold:PALETTE.goldDeep}`,
                  color: dark?PALETTE.gold:PALETTE.goldDeep,
                  fontFamily:'"JetBrains Mono", monospace', letterSpacing:'.06em',
                  textTransform:'uppercase',
                }}>★</span>
              )}
            </div>
            <div style={{ marginTop: 2, fontSize: 10.5, color: sub, fontStyle:'italic' }}>
              {['de','it','en'].filter(l => l!==lang && L(d.n, l) !== L(d.n, lang)).map(l => L(d.n, l)).join(' · ')}
            </div>
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 600, fontFamily:'"JetBrains Mono", monospace',
                        color: dark?PALETTE.gold:PALETTE.forest, fontVariantNumeric:'tabular-nums',
                        whiteSpace:'nowrap' }}>
            {d.p}<span style={{ opacity:.55, fontWeight:400, fontSize: 11 }}> €</span>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Grid drink list (sizes header + price columns) ────────
function GridDrinkList({ block, sectionIndex, dark, lang, sub, ink, rule }) {
  const sizes = block.sizes;
  const items = block.items;
  return (
    <div>
      {/* Size header */}
      <div style={{
        display:'grid', gridTemplateColumns: `28px 1fr repeat(${sizes.length}, minmax(46px, auto))`,
        gap: 14, alignItems:'baseline',
        padding: '6px 0 6px',
      }}>
        <span/>
        <span/>
        {sizes.map(s => (
          <span key={s} style={{
            fontSize: 9.5, fontFamily:'"JetBrains Mono", monospace',
            color: sub, letterSpacing:'.06em', textAlign:'right',
            textTransform:'lowercase',
          }}>{s}</span>
        ))}
      </div>
      {items.map((d, i) => (
        <div key={i} style={{
          display:'grid', gridTemplateColumns: `28px 1fr repeat(${sizes.length}, minmax(46px, auto))`,
          gap: 14, alignItems:'baseline',
          padding: '12px 0', borderTop: `1px solid ${rule}`,
        }}>
          <span style={{ fontSize: 10, fontFamily:'"JetBrains Mono", monospace',
                         color: sub, letterSpacing:'.1em', paddingTop: 2 }}>
            {String(sectionIndex+1)}.{String(i+1).padStart(2,'0')}
          </span>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13.5, fontWeight: 500, lineHeight: 1.25, color: ink }}>
              {L(d.n, lang)}
            </div>
            <div style={{ marginTop: 2, fontSize: 10.5, color: sub, fontStyle:'italic' }}>
              {['de','it','en'].filter(l => l!==lang && L(d.n, l) !== L(d.n, lang)).map(l => L(d.n, l)).join(' · ')}
            </div>
          </div>
          {d.p.map((price, j) => (
            <span key={j} style={{
              fontSize: 12.5, fontWeight: 600, fontFamily:'"JetBrains Mono", monospace',
              fontVariantNumeric:'tabular-nums', textAlign:'right', whiteSpace:'nowrap',
              color: dark?PALETTE.gold:PALETTE.forest,
            }}>
              {price}<span style={{ opacity:.5, fontWeight:400, fontSize: 10 }}> €</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
