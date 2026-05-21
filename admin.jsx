// admin.jsx — Campedèl Hof Admin Panel

const ADMIN_DATA_KEY    = 'campedel:admin-data';
const ADMIN_SESSION_KEY = 'campedel:admin-session';
const ADMIN_PASSWORD    = 'campedel2026';

const A = {
  bg:     '#f5ede0',
  card:   '#ffffff',
  green:  '#0f2015',
  gold:   '#c9a227',
  ink:    '#1b1f17',
  sub:    '#6b6b5f',
  border: '#ddd4c2',
  red:    '#c0392b',
  input:  '#faf7f2',
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function aGenId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
}

function aLoadData() {
  try {
    const s = localStorage.getItem(ADMIN_DATA_KEY);
    if (s) return JSON.parse(s);
  } catch {}
  return {
    MENU:     JSON.parse(JSON.stringify(CATEGORIES)),
    SPECIALS: JSON.parse(JSON.stringify(SPECIALS)),
    WINES:    JSON.parse(JSON.stringify(WINES)),
    DRINKS:   JSON.parse(JSON.stringify(DRINKS)),
  };
}

function aSaveData(data) {
  localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(data));
  window.location.reload();
}

function aResetData() {
  localStorage.removeItem(ADMIN_DATA_KEY);
  window.location.reload();
}

// ── Shared UI ────────────────────────────────────────────────────────────────

function ABtn({ children, onClick, danger = false, outline = false, sm = false, type = 'button' }) {
  const bg = danger ? A.red : outline ? 'transparent' : A.green;
  const cl = danger ? '#fff' : outline ? A.green : '#fff';
  const bd = outline ? `1px solid ${A.green}` : '1px solid transparent';
  return (
    <button type={type} onClick={onClick} style={{
      background: bg, color: cl, border: bd,
      padding: sm ? '5px 11px' : '9px 16px',
      borderRadius: 6, cursor: 'pointer',
      fontSize: sm ? 11 : 13, fontWeight: 600,
      fontFamily: 'Manrope, sans-serif',
      display: 'inline-flex', alignItems: 'center', gap: 4,
      whiteSpace: 'nowrap',
    }}>{children}</button>
  );
}

function AField({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: 'block', fontSize: 10, fontWeight: 700,
        letterSpacing: '.08em', textTransform: 'uppercase',
        color: A.sub, marginBottom: 5,
        fontFamily: '"JetBrains Mono", monospace',
      }}>{label}</label>
      {children}
    </div>
  );
}

function AInput({ value, onChange, placeholder, rows, disabled }) {
  const base = {
    width: '100%', boxSizing: 'border-box', padding: '8px 10px',
    borderRadius: 6, border: `1px solid ${A.border}`,
    fontSize: 13, fontFamily: 'Manrope, sans-serif',
    background: disabled ? '#f0ebe0' : A.input,
    color: A.ink, outline: 'none', resize: 'vertical',
  };
  if (rows) return <textarea value={value} onChange={e => onChange(e.target.value)}
                             placeholder={placeholder} rows={rows} style={base} />;
  return <input type="text" value={value} onChange={e => onChange(e.target.value)}
                placeholder={placeholder} disabled={disabled} style={{ ...base, resize: undefined }} />;
}

function ASelect({ value, onChange, children }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} style={{
      width: '100%', padding: '8px 10px', borderRadius: 6,
      border: `1px solid ${A.border}`, fontSize: 13,
      fontFamily: 'Manrope, sans-serif', background: A.input,
      color: A.ink, cursor: 'pointer',
    }}>{children}</select>
  );
}

function ACheckbox({ label, checked, onChange }) {
  return (
    <label style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      cursor: 'pointer', fontSize: 13, color: A.ink, marginRight: 12,
    }}>
      <input type="checkbox" checked={checked} onChange={e => onChange(e.target.checked)}
             style={{ width: 15, height: 15, cursor: 'pointer', accentColor: A.green }} />
      {label}
    </label>
  );
}

function ACard({ children, style = {} }) {
  return (
    <div style={{
      background: A.card, borderRadius: 8,
      border: `1px solid ${A.border}`,
      padding: '14px 16px', marginBottom: 10, ...style,
    }}>{children}</div>
  );
}

function ADivider({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      margin: '18px 0 10px',
    }}>
      <div style={{ flex: 1, height: 1, background: A.border }} />
      {label && <span style={{
        fontSize: 9, fontFamily: '"JetBrains Mono", monospace',
        letterSpacing: '.14em', textTransform: 'uppercase', color: A.sub,
      }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: A.border }} />
    </div>
  );
}

// ── Login ────────────────────────────────────────────────────────────────────

function AdminLogin({ onLogin }) {
  const [pass, setPass] = React.useState('');
  const [err,  setErr]  = React.useState(false);

  function submit(e) {
    e.preventDefault();
    if (pass === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
      onLogin();
    } else {
      setErr(true);
      setPass('');
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: A.bg, padding: 24,
    }}>
      <div style={{
        background: A.card, borderRadius: 12, padding: '32px 28px',
        boxShadow: '0 4px 32px rgba(0,0,0,.08)',
        maxWidth: 340, width: '100%',
      }}>
        <div style={{
          fontSize: 9.5, letterSpacing: '.22em', textTransform: 'uppercase',
          color: A.gold, fontFamily: '"JetBrains Mono", monospace', marginBottom: 6,
        }}>Campedèl Hof</div>
        <h2 style={{ margin: '0 0 24px', fontSize: 22, fontWeight: 700, color: A.green }}>
          Admin Panel
        </h2>
        <form onSubmit={submit}>
          <AField label="Passwort">
            <input
              type="password" value={pass} autoFocus
              onChange={e => { setPass(e.target.value); setErr(false); }}
              placeholder="••••••••"
              style={{
                width: '100%', boxSizing: 'border-box', padding: '8px 10px',
                borderRadius: 6, border: `1px solid ${err ? A.red : A.border}`,
                fontSize: 14, fontFamily: 'Manrope, sans-serif',
                background: A.input, color: A.ink, outline: 'none',
              }}
            />
          </AField>
          {err && <p style={{ color: A.red, fontSize: 12, margin: '-6px 0 12px' }}>
            Falsches Passwort
          </p>}
          <button type="submit" style={{
            width: '100%', padding: '10px 0', background: A.green, color: '#fff',
            border: 'none', borderRadius: 6, fontSize: 14, fontWeight: 700,
            fontFamily: 'Manrope, sans-serif', cursor: 'pointer',
          }}>Anmelden</button>
        </form>
      </div>
    </div>
  );
}

// ── Item Form (Modal) ─────────────────────────────────────────────────────────

function ItemForm({ item, catId, categories, onSave, onClose }) {
  const isNew = !item.id;
  const [f, setF] = React.useState({
    nameDe: item.name?.de || '',
    nameIt: item.name?.it || '',
    nameEn: item.name?.en || '',
    descDe: item.desc?.de || '',
    descIt: item.desc?.it || '',
    descEn: item.desc?.en || '',
    ingDe:  (item.ingredients?.de || []).join(', '),
    ingIt:  (item.ingredients?.it || []).join(', '),
    ingEn:  (item.ingredients?.en || []).join(', '),
    price:  item.p || '',
    photo:  item.photo || '',
    pairing: item.pairing || '',
    dVeg:   (item.d || []).includes('veg'),
    dVegan: (item.d || []).includes('vegan'),
    dGf:    (item.d || []).includes('gf'),
    dLf:    (item.d || []).includes('lf'),
    h:      item.h  || false,
    hm:     item.hm || false,
    targetCat: catId,
  });

  const up = (k, v) => setF(p => ({ ...p, [k]: v }));

  function handleSave(e) {
    e.preventDefault();
    const diet = [];
    if (f.dVeg)   diet.push('veg');
    if (f.dVegan) diet.push('vegan');
    if (f.dGf)    diet.push('gf');
    if (f.dLf)    diet.push('lf');
    const built = {
      id: item.id || aGenId(),
      name: { de: f.nameDe, it: f.nameIt, en: f.nameEn },
      p: f.price,
      d: diet,
      ...(f.h  && { h: true }),
      ...(f.hm && { hm: true }),
      photo: f.photo,
      desc: { de: f.descDe, it: f.descIt, en: f.descEn },
      ingredients: {
        de: f.ingDe.split(',').map(x => x.trim()).filter(Boolean),
        it: f.ingIt.split(',').map(x => x.trim()).filter(Boolean),
        en: f.ingEn.split(',').map(x => x.trim()).filter(Boolean),
      },
      ...(f.pairing && { pairing: f.pairing }),
    };
    onSave(built, f.targetCat);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,.55)',
      zIndex: 200, display: 'flex', alignItems: 'flex-end',
      justifyContent: 'center',
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: A.bg, width: '100%', maxWidth: 640,
        borderRadius: '14px 14px 0 0',
        maxHeight: '92vh', overflowY: 'auto',
        padding: '0 0 40px',
      }}>
        {/* Handle */}
        <div style={{ textAlign: 'center', padding: '12px 0 4px' }}>
          <div style={{ width: 36, height: 4, borderRadius: 2, background: A.border, display: 'inline-block' }} />
        </div>
        <div style={{ padding: '0 18px' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: 17, fontWeight: 700, color: A.green }}>
            {isNew ? 'Artikel hinzufügen' : 'Artikel bearbeiten'}
          </h3>

          <form onSubmit={handleSave}>
            {/* Category selector for new items */}
            {isNew && (
              <AField label="Kategorie">
                <ASelect value={f.targetCat} onChange={v => up('targetCat', v)}>
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name.de}</option>
                  ))}
                </ASelect>
              </AField>
            )}

            <ADivider label="Name" />
            <AField label="Name · DE"><AInput value={f.nameDe} onChange={v => up('nameDe', v)} placeholder="Deutsch" /></AField>
            <AField label="Name · IT"><AInput value={f.nameIt} onChange={v => up('nameIt', v)} placeholder="Italiano" /></AField>
            <AField label="Name · EN"><AInput value={f.nameEn} onChange={v => up('nameEn', v)} placeholder="English" /></AField>

            <AField label="Preis (z.B. 12,50)">
              <AInput value={f.price} onChange={v => up('price', v)} placeholder="0,00" />
            </AField>

            <ADivider label="Beschreibung" />
            <AField label="Beschreibung · DE"><AInput value={f.descDe} onChange={v => up('descDe', v)} rows={2} /></AField>
            <AField label="Beschreibung · IT"><AInput value={f.descIt} onChange={v => up('descIt', v)} rows={2} /></AField>
            <AField label="Beschreibung · EN"><AInput value={f.descEn} onChange={v => up('descEn', v)} rows={2} /></AField>

            <ADivider label="Zutaten (kommagetrennt)" />
            <AField label="Zutaten · DE"><AInput value={f.ingDe} onChange={v => up('ingDe', v)} placeholder="Tomate, Basilikum, ..." /></AField>
            <AField label="Zutaten · IT"><AInput value={f.ingIt} onChange={v => up('ingIt', v)} placeholder="Pomodoro, Basilico, ..." /></AField>
            <AField label="Zutaten · EN"><AInput value={f.ingEn} onChange={v => up('ingEn', v)} placeholder="Tomato, Basil, ..." /></AField>

            <ADivider label="Details" />
            <AField label="Diät-Tags">
              <ACheckbox label="Vegetarisch"  checked={f.dVeg}   onChange={v => up('dVeg',   v)} />
              <ACheckbox label="Vegan"        checked={f.dVegan} onChange={v => up('dVegan', v)} />
              <ACheckbox label="Glutenfrei"   checked={f.dGf}    onChange={v => up('dGf',    v)} />
              <ACheckbox label="Laktosefrei"  checked={f.dLf}    onChange={v => up('dLf',    v)} />
            </AField>
            <AField label="Herkunft / Zubereitung">
              <ACheckbox label="Vom eigenen Hof" checked={f.h}  onChange={v => up('h',  v)} />
              <ACheckbox label="Hausgemacht"      checked={f.hm} onChange={v => up('hm', v)} />
            </AField>
            <AField label="Foto-Pfad (z.B. img/gericht.jpg)">
              <AInput value={f.photo} onChange={v => up('photo', v)} placeholder="img/..." />
            </AField>
            <AField label="Weinempfehlung (optional)">
              <AInput value={f.pairing} onChange={v => up('pairing', v)} placeholder="z.B. Sylvaner · Taschlerhof" />
            </AField>

            <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
              <ABtn type="submit">Speichern</ABtn>
              <ABtn outline onClick={onClose}>Abbrechen</ABtn>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Category Form (inline) ────────────────────────────────────────────────────

function CatForm({ onSave, onClose }) {
  const [de, setDe] = React.useState('');
  const [it, setIt] = React.useState('');
  const [en, setEn] = React.useState('');

  function handleSave(e) {
    e.preventDefault();
    if (!de.trim()) return;
    onSave({ id: aGenId(), name: { de, it: it || de, en: en || de }, items: [] });
  }

  return (
    <ACard style={{ border: `1px solid ${A.green}` }}>
      <form onSubmit={handleSave}>
        <div style={{ fontSize: 12, fontWeight: 700, color: A.green, marginBottom: 10 }}>
          Neue Kategorie
        </div>
        <AField label="Name · DE"><AInput value={de} onChange={setDe} placeholder="Deutsch" /></AField>
        <AField label="Name · IT"><AInput value={it} onChange={setIt} placeholder="Italiano" /></AField>
        <AField label="Name · EN"><AInput value={en} onChange={setEn} placeholder="English" /></AField>
        <div style={{ display: 'flex', gap: 8 }}>
          <ABtn type="submit" sm>Hinzufügen</ABtn>
          <ABtn outline sm onClick={onClose}>Abbrechen</ABtn>
        </div>
      </form>
    </ACard>
  );
}

// ── Menu Tab ──────────────────────────────────────────────────────────────────

function MenuTab({ menu, onChange }) {
  const [open,       setOpen]       = React.useState({});
  const [editItem,   setEditItem]   = React.useState(null); // { item, catId }
  const [addItem,    setAddItem]    = React.useState(null); // catId
  const [showCatForm, setShowCatForm] = React.useState(false);

  function toggleCat(id) { setOpen(o => ({ ...o, [id]: !o[id] })); }

  function saveItem(built, targetCatId) {
    const isNew = !editItem?.item?.id;
    let updated;
    if (isNew) {
      updated = menu.map(c =>
        c.id === targetCatId ? { ...c, items: [...c.items, built] } : c
      );
    } else {
      updated = menu.map(c =>
        c.id === targetCatId
          ? { ...c, items: c.items.map(i => i.id === built.id ? built : i) }
          : c
      );
    }
    onChange(updated);
    setEditItem(null);
    setAddItem(null);
  }

  function deleteItem(catId, itemId) {
    if (!confirm('Artikel löschen?')) return;
    onChange(menu.map(c =>
      c.id === catId ? { ...c, items: c.items.filter(i => i.id !== itemId) } : c
    ));
  }

  function deleteCat(catId) {
    if (!confirm('Kategorie und alle Artikel darin löschen?')) return;
    onChange(menu.filter(c => c.id !== catId));
  }

  function addCategory(cat) {
    onChange([...menu, cat]);
    setShowCatForm(false);
  }

  function moveItemUp(catId, idx) {
    onChange(menu.map(c => {
      if (c.id !== catId) return c;
      const items = [...c.items];
      if (idx === 0) return c;
      [items[idx - 1], items[idx]] = [items[idx], items[idx - 1]];
      return { ...c, items };
    }));
  }

  function moveItemDown(catId, idx, total) {
    onChange(menu.map(c => {
      if (c.id !== catId) return c;
      const items = [...c.items];
      if (idx === total - 1) return c;
      [items[idx], items[idx + 1]] = [items[idx + 1], items[idx]];
      return { ...c, items };
    }));
  }

  return (
    <div>
      {menu.map(cat => (
        <ACard key={cat.id}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button onClick={() => toggleCat(cat.id)} style={{
              all: 'unset', cursor: 'pointer', flex: 1,
              display: 'flex', alignItems: 'center', gap: 8,
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: A.ink }}>
                {cat.name.de}
              </span>
              <span style={{ fontSize: 11, color: A.sub }}>
                ({cat.items.length} Artikel)
              </span>
              <span style={{ fontSize: 11, color: A.sub, marginLeft: 'auto' }}>
                {open[cat.id] ? '▲' : '▼'}
              </span>
            </button>
            <ABtn sm outline onClick={() => { setAddItem(cat.id); setEditItem(null); }}>
              + Artikel
            </ABtn>
            <ABtn sm danger onClick={() => deleteCat(cat.id)}>✕</ABtn>
          </div>

          {open[cat.id] && (
            <div style={{ marginTop: 10 }}>
              {cat.items.length === 0 && (
                <p style={{ color: A.sub, fontSize: 12, margin: '6px 0' }}>Keine Artikel</p>
              )}
              {cat.items.map((item, idx) => (
                <div key={item.id} style={{
                  display: 'flex', alignItems: 'center', gap: 8,
                  padding: '8px 0',
                  borderTop: idx === 0 ? `1px solid ${A.border}` : 'none',
                  borderBottom: `1px solid ${A.border}`,
                }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: A.ink, whiteSpace: 'nowrap',
                                  overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name.de}
                    </div>
                    <div style={{ fontSize: 11, color: A.sub }}>€ {item.p}</div>
                  </div>
                  <button onClick={() => moveItemUp(cat.id, idx)} style={{ all: 'unset', cursor: 'pointer', color: A.sub, fontSize: 13 }}>↑</button>
                  <button onClick={() => moveItemDown(cat.id, idx, cat.items.length)} style={{ all: 'unset', cursor: 'pointer', color: A.sub, fontSize: 13 }}>↓</button>
                  <ABtn sm outline onClick={() => { setEditItem({ item, catId: cat.id }); setAddItem(null); }}>
                    Bearb.
                  </ABtn>
                  <ABtn sm danger onClick={() => deleteItem(cat.id, item.id)}>✕</ABtn>
                </div>
              ))}
            </div>
          )}
        </ACard>
      ))}

      {showCatForm
        ? <CatForm onSave={addCategory} onClose={() => setShowCatForm(false)} />
        : <ABtn outline onClick={() => setShowCatForm(true)}>+ Kategorie hinzufügen</ABtn>
      }

      {(editItem || addItem) && (
        <ItemForm
          item={editItem ? editItem.item : {}}
          catId={editItem ? editItem.catId : addItem}
          categories={menu}
          onSave={saveItem}
          onClose={() => { setEditItem(null); setAddItem(null); }}
        />
      )}
    </div>
  );
}

// ── Specials Tab ──────────────────────────────────────────────────────────────

function SpecialsTab({ specials, menu, onChange }) {
  const [s, setS] = React.useState({
    dateDe: specials.date?.de || '',
    dateIt: specials.date?.it || '',
    dateEn: specials.date?.en || '',
    introDe: specials.intro?.de || '',
    introIt: specials.intro?.it || '',
    introEn: specials.intro?.en || '',
  });
  const [items, setItems] = React.useState(specials.items || []);
  const [newKind, setNewKind] = React.useState('');
  const [newRef,  setNewRef]  = React.useState('');

  const up = (k, v) => setS(p => ({ ...p, [k]: v }));

  const allCats = menu;
  const selectedCat = allCats.find(c => c.id === newKind);

  function applyChanges() {
    onChange({
      date:  { de: s.dateDe, it: s.dateIt, en: s.dateEn },
      intro: { de: s.introDe, it: s.introIt, en: s.introEn },
      items,
    });
  }

  function addSpecialItem() {
    if (!newKind || !newRef) return;
    setItems(prev => [...prev, { kind: newKind, refId: newRef }]);
    setNewKind(''); setNewRef('');
  }

  return (
    <div>
      <ADivider label="Datum" />
      <AField label="Datum · DE"><AInput value={s.dateDe} onChange={v => up('dateDe', v)} placeholder="Montag, 1. Januar 2026" /></AField>
      <AField label="Datum · IT"><AInput value={s.dateIt} onChange={v => up('dateIt', v)} placeholder="Lunedì 1 gennaio 2026" /></AField>
      <AField label="Datum · EN"><AInput value={s.dateEn} onChange={v => up('dateEn', v)} placeholder="Monday, 1 January 2026" /></AField>

      <ADivider label="Einleitungstext" />
      <AField label="Intro · DE"><AInput value={s.introDe} onChange={v => up('introDe', v)} rows={2} /></AField>
      <AField label="Intro · IT"><AInput value={s.introIt} onChange={v => up('introIt', v)} rows={2} /></AField>
      <AField label="Intro · EN"><AInput value={s.introEn} onChange={v => up('introEn', v)} rows={2} /></AField>

      <ADivider label="Tagesgerichte" />
      {items.map((it, i) => {
        const cat = menu.find(c => c.id === it.kind);
        const item = cat?.items.find(x => x.id === it.refId);
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 0', borderBottom: `1px solid ${A.border}`,
          }}>
            <div style={{ flex: 1, fontSize: 13 }}>
              <span style={{ fontWeight: 600, color: A.green, marginRight: 6 }}>
                {cat?.name.de}
              </span>
              <span style={{ color: A.ink }}>{item?.name.de || it.refId}</span>
            </div>
            <ABtn sm danger onClick={() => setItems(prev => prev.filter((_, j) => j !== i))}>✕</ABtn>
          </div>
        );
      })}

      <ACard style={{ marginTop: 10 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: A.green, marginBottom: 10 }}>
          Gericht hinzufügen
        </div>
        <AField label="Kategorie">
          <ASelect value={newKind} onChange={v => { setNewKind(v); setNewRef(''); }}>
            <option value="">— wählen —</option>
            {menu.map(c => <option key={c.id} value={c.id}>{c.name.de}</option>)}
          </ASelect>
        </AField>
        {selectedCat && (
          <AField label="Gericht">
            <ASelect value={newRef} onChange={setNewRef}>
              <option value="">— wählen —</option>
              {selectedCat.items.map(it => (
                <option key={it.id} value={it.id}>{it.name.de}</option>
              ))}
            </ASelect>
          </AField>
        )}
        <ABtn sm onClick={addSpecialItem}>Hinzufügen</ABtn>
      </ACard>

      <div style={{ marginTop: 16 }}>
        <ABtn onClick={applyChanges}>Tageskarte übernehmen</ABtn>
      </div>
    </div>
  );
}

// ── Wines Tab ─────────────────────────────────────────────────────────────────

function WineForm({ section, onSave, onClose }) {
  const [f, setF] = React.useState({
    name: '', maker: '', region: '', grapes: '',
    price: '', size: '0,75 l', note: '',
    photo: '',
  });
  const up = (k, v) => setF(p => ({ ...p, [k]: v }));

  function handleSave(e) {
    e.preventDefault();
    onSave({
      id: aGenId(),
      name: f.name,
      maker: f.maker,
      region: f.region,
      ...(f.grapes && { grapes: f.grapes }),
      sizes: [{ s: f.size, p: f.price }],
      ...(f.note  && { note: f.note }),
      photo: f.photo || 'img/wein-placeholder.jpg',
    });
  }

  return (
    <ACard style={{ border: `1px solid ${A.green}`, marginTop: 10 }}>
      <form onSubmit={handleSave}>
        <div style={{ fontSize: 12, fontWeight: 700, color: A.green, marginBottom: 10 }}>
          Neuer Wein ({section})
        </div>
        <AField label="Name">        <AInput value={f.name}   onChange={v => up('name',   v)} /></AField>
        <AField label="Weingut">     <AInput value={f.maker}  onChange={v => up('maker',  v)} /></AField>
        <AField label="Region/DOC">  <AInput value={f.region} onChange={v => up('region', v)} /></AField>
        <AField label="Rebsorten">   <AInput value={f.grapes} onChange={v => up('grapes', v)} placeholder="optional" /></AField>
        <AField label="Preis">       <AInput value={f.price}  onChange={v => up('price',  v)} placeholder="0,00" /></AField>
        <AField label="Größe">       <AInput value={f.size}   onChange={v => up('size',   v)} placeholder="0,75 l" /></AField>
        <AField label="Bewertung">   <AInput value={f.note}   onChange={v => up('note',   v)} placeholder="optional" /></AField>
        <AField label="Foto-Pfad">   <AInput value={f.photo}  onChange={v => up('photo',  v)} placeholder="img/..." /></AField>
        <div style={{ display: 'flex', gap: 8 }}>
          <ABtn type="submit" sm>Hinzufügen</ABtn>
          <ABtn outline sm onClick={onClose}>Abbrechen</ABtn>
        </div>
      </form>
    </ACard>
  );
}

function WinesTab({ wines, onChange }) {
  const [addSection, setAddSection] = React.useState(null);

  const SECTIONS = [
    { key: 'bubbles', label: 'Perlweine / Sekt' },
    { key: 'white',   label: 'Weißweine' },
    { key: 'red',     label: 'Rotweine' },
  ];

  function addWine(section, wine) {
    onChange({ ...wines, [section]: [...(wines[section] || []), wine] });
    setAddSection(null);
  }

  function deleteWine(section, id) {
    if (!confirm('Wein löschen?')) return;
    onChange({ ...wines, [section]: wines[section].filter(w => w.id !== id) });
  }

  return (
    <div>
      {SECTIONS.map(sec => (
        <div key={sec.key}>
          <ADivider label={sec.label} />
          {(wines[sec.key] || []).map(w => (
            <ACard key={w.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px' }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: A.ink, whiteSpace: 'nowrap',
                              overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {w.name}
                </div>
                <div style={{ fontSize: 11, color: A.sub }}>{w.maker} · {w.sizes?.[0]?.p}</div>
              </div>
              <ABtn sm danger onClick={() => deleteWine(sec.key, w.id)}>✕</ABtn>
            </ACard>
          ))}
          {addSection === sec.key
            ? <WineForm section={sec.label} onSave={w => addWine(sec.key, w)} onClose={() => setAddSection(null)} />
            : <ABtn sm outline onClick={() => setAddSection(sec.key)}>+ Wein</ABtn>
          }
        </div>
      ))}
    </div>
  );
}

// ── Drinks Tab ────────────────────────────────────────────────────────────────

function DrinkSimpleForm({ section, onSave, onClose }) {
  const [nameDe, setNameDe] = React.useState('');
  const [nameIt, setNameIt] = React.useState('');
  const [nameEn, setNameEn] = React.useState('');
  const [price,  setPrice]  = React.useState('');
  const [photo,  setPhoto]  = React.useState('');

  function handleSave(e) {
    e.preventDefault();
    if (!nameDe.trim()) return;
    onSave({
      id: aGenId(),
      n: { de: nameDe, it: nameIt || nameDe, en: nameEn || nameDe },
      p: price,
      photo: photo || 'img/drink-placeholder.jpg',
    });
  }

  return (
    <ACard style={{ border: `1px solid ${A.green}`, marginTop: 10 }}>
      <form onSubmit={handleSave}>
        <div style={{ fontSize: 12, fontWeight: 700, color: A.green, marginBottom: 10 }}>
          Neues Getränk
        </div>
        <AField label="Name · DE"><AInput value={nameDe} onChange={setNameDe} /></AField>
        <AField label="Name · IT"><AInput value={nameIt} onChange={setNameIt} placeholder="optional" /></AField>
        <AField label="Name · EN"><AInput value={nameEn} onChange={setNameEn} placeholder="optional" /></AField>
        <AField label="Preis">    <AInput value={price}  onChange={setPrice}  placeholder="0,00" /></AField>
        <AField label="Foto-Pfad"><AInput value={photo}  onChange={setPhoto}  placeholder="img/..." /></AField>
        <div style={{ display: 'flex', gap: 8 }}>
          <ABtn type="submit" sm>Hinzufügen</ABtn>
          <ABtn outline sm onClick={onClose}>Abbrechen</ABtn>
        </div>
      </form>
    </ACard>
  );
}

function DrinksTab({ drinks, onChange }) {
  const [addSection, setAddSection] = React.useState(null);

  const SIMPLE_SECTIONS = [
    { key: 'hot',      label: 'Heiße Getränke' },
    { key: 'aperitif', label: 'Aperitif' },
    { key: 'digestif', label: 'Digestif' },
  ];

  const GRID_SECTIONS = [
    { key: 'water',  label: 'Wasser' },
    { key: 'juices', label: 'Säfte' },
    { key: 'beer',   label: 'Bier' },
  ];

  function addDrink(section, drink) {
    const sec = drinks[section];
    if (Array.isArray(sec)) {
      onChange({ ...drinks, [section]: [...sec, drink] });
    } else {
      onChange({ ...drinks, [section]: { ...sec, items: [...(sec.items || []), drink] } });
    }
    setAddSection(null);
  }

  function deleteDrink(section, id) {
    if (!confirm('Getränk löschen?')) return;
    const sec = drinks[section];
    if (Array.isArray(sec)) {
      onChange({ ...drinks, [section]: sec.filter(d => d.id !== id) });
    } else {
      onChange({ ...drinks, [section]: { ...sec, items: sec.items.filter(d => d.id !== id) } });
    }
  }

  function renderSection(key, label) {
    const sec = drinks[key];
    const items = Array.isArray(sec) ? sec : (sec?.items || []);
    return (
      <div key={key}>
        <ADivider label={label} />
        {items.map(d => (
          <ACard key={d.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: A.ink }}>
                {d.n?.de || d.name || d.id}
              </div>
              <div style={{ fontSize: 11, color: A.sub }}>
                {Array.isArray(d.p) ? d.p.join(' / ') : d.p}
              </div>
            </div>
            <ABtn sm danger onClick={() => deleteDrink(key, d.id)}>✕</ABtn>
          </ACard>
        ))}
        {addSection === key
          ? <DrinkSimpleForm section={label} onSave={d => addDrink(key, d)} onClose={() => setAddSection(null)} />
          : <ABtn sm outline onClick={() => setAddSection(key)}>+ Getränk</ABtn>
        }
      </div>
    );
  }

  return (
    <div>
      {[...SIMPLE_SECTIONS, ...GRID_SECTIONS].map(s => renderSection(s.key, s.label))}
    </div>
  );
}

// ── Main Admin Panel ──────────────────────────────────────────────────────────

function AdminPanel({ onExit }) {
  const [authed, setAuthed] = React.useState(
    () => sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
  );
  const [tab,  setTab]  = React.useState('menu');
  const [data, setData] = React.useState(aLoadData);
  const [saved, setSaved] = React.useState(false);

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  function handleSave() {
    localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleSaveReload() {
    aSaveData(data);
  }

  const TABS = [
    { id: 'menu',     label: 'Speisekarte' },
    { id: 'specials', label: 'Tageskarte'  },
    { id: 'wines',    label: 'Weine'       },
    { id: 'drinks',   label: 'Getränke'    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: A.bg, fontFamily: 'Manrope, sans-serif' }}>
      {/* Header */}
      <div style={{
        background: A.green, color: '#f5ede0',
        padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 12,
        position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={onExit} style={{
          all: 'unset', cursor: 'pointer', color: '#f5ede0', fontSize: 20,
          lineHeight: 1, padding: '2px 4px',
        }}>←</button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9.5, letterSpacing: '.2em', textTransform: 'uppercase',
                        color: 'rgba(245,237,224,.55)', fontFamily: '"JetBrains Mono", monospace' }}>
            Campedèl Hof
          </div>
          <div style={{ fontSize: 15, fontWeight: 700 }}>Admin Panel</div>
        </div>
        <button onClick={handleSave} style={{
          all: 'unset', cursor: 'pointer', background: 'rgba(245,237,224,.15)',
          color: saved ? A.gold : '#f5ede0',
          border: `1px solid ${saved ? A.gold : 'rgba(245,237,224,.3)'}`,
          padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
          transition: 'color .2s, border-color .2s',
        }}>
          {saved ? '✓ Gespeichert' : 'Speichern'}
        </button>
        <button onClick={handleSaveReload} style={{
          all: 'unset', cursor: 'pointer', background: A.gold,
          color: A.green, padding: '6px 12px', borderRadius: 6,
          fontSize: 12, fontWeight: 700,
        }}>
          Publizieren
        </button>
      </div>

      {/* Info bar */}
      <div style={{
        background: '#fff8ec', borderBottom: `1px solid ${A.border}`,
        padding: '8px 18px', fontSize: 11, color: A.sub,
      }}>
        <strong style={{ color: A.ink }}>Speichern</strong> sichert Änderungen lokal ·
        <strong style={{ color: A.green }}> Publizieren</strong> macht sie sofort in der Karte sichtbar
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex', borderBottom: `1px solid ${A.border}`,
        background: A.card, overflowX: 'auto',
        position: 'sticky', top: 55, zIndex: 9,
      }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            all: 'unset', cursor: 'pointer', padding: '12px 18px',
            fontSize: 13, fontWeight: tab === t.id ? 700 : 400,
            color: tab === t.id ? A.green : A.sub,
            borderBottom: tab === t.id ? `2px solid ${A.green}` : '2px solid transparent',
            whiteSpace: 'nowrap',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '16px 16px 80px', maxWidth: 680, margin: '0 auto' }}>
        {tab === 'menu' && (
          <MenuTab
            menu={data.MENU}
            onChange={newMenu => setData(d => ({ ...d, MENU: newMenu }))}
          />
        )}
        {tab === 'specials' && (
          <SpecialsTab
            specials={data.SPECIALS}
            menu={data.MENU}
            onChange={s => setData(d => ({ ...d, SPECIALS: s }))}
          />
        )}
        {tab === 'wines' && (
          <WinesTab
            wines={data.WINES}
            onChange={w => setData(d => ({ ...d, WINES: w }))}
          />
        )}
        {tab === 'drinks' && (
          <DrinksTab
            drinks={data.DRINKS}
            onChange={dr => setData(d => ({ ...d, DRINKS: dr }))}
          />
        )}
      </div>

      {/* Footer — Reset */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: A.card, borderTop: `1px solid ${A.border}`,
        padding: '10px 16px', display: 'flex', justifyContent: 'flex-end',
      }}>
        <button onClick={() => {
          if (confirm('Alle Änderungen zurücksetzen und Original-Daten wiederherstellen?'))
            aResetData();
        }} style={{
          all: 'unset', cursor: 'pointer', fontSize: 11, color: A.sub,
          textDecoration: 'underline',
        }}>
          Auf Original zurücksetzen
        </button>
      </div>
    </div>
  );
}

Object.assign(window, { AdminPanel });
