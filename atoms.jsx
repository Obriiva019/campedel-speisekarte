// atoms.jsx — small UI atoms reused across the magazine screens.
// (Copy of the relevant bits from the prototype, minus the canvas-only Phone.)

const PALETTE = {
  parchment:   '#f5ede0',
  parchment2:  '#fbf6ec',
  ink:         '#1b1f17',
  forest:      '#0f2015',
  forest2:     '#162d1e',
  gold:        '#c9a227',
  goldDeep:    '#a07f1a',
  stone:       '#e8e0d0',
};

const DIET_LABELS = {
  veg:   { sym: 'V',   color: '#3a7d44' },
  vegan: { sym: 'VG',  color: '#2f6b39' },
  gf:    { sym: 'GF',  color: '#a07f1a' },
  lf:    { sym: 'LF',  color: '#8a5b1f' },
};

function L(obj, lang) { return obj?.[lang] ?? obj?.de ?? ''; }
function makeT(lang) { const t = Object.assign({}, UI_STRINGS); t._lang = lang; return t; }

function DietBadge({ k, dark = false }) {
  const d = DIET_LABELS[k]; if (!d) return null;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', justifyContent:'center',
      minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9,
      fontSize: 9.5, fontWeight: 700, letterSpacing: '.04em',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      color: d.color,
      background: dark ? 'rgba(255,255,255,.08)' : 'rgba(15,32,21,.06)',
      border: `1px solid ${d.color}33`,
    }}>{d.sym}</span>
  );
}

function OriginBadge({ dark = false, t }) {
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4,
      fontSize: 9.5, fontWeight: 600, letterSpacing:'.04em',
      color: dark ? PALETTE.gold : PALETTE.goldDeep,
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    }}>
      <svg width="9" height="9" viewBox="0 0 10 10">
        <path d="M5 1 L8.5 5 L5 9 L1.5 5 Z" fill="none" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
      {L(t.from_farm, t._lang).toUpperCase()}
    </span>
  );
}

function LangPicker({ value, onChange, dark = false }) {
  return (
    <div style={{
      display:'inline-flex', padding: 2, borderRadius: 999,
      background: dark ? 'rgba(255,255,255,.08)' : 'rgba(15,32,21,.06)',
      border: dark ? '1px solid rgba(255,255,255,.06)' : '1px solid rgba(15,32,21,.06)',
    }}>
      {['de','it','en'].map(l => {
        const on = l === value;
        return (
          <button key={l} onClick={() => onChange(l)} style={{
            border:0, background: on ? (dark ? PALETTE.gold : PALETTE.forest) : 'transparent',
            color: on ? (dark ? PALETTE.forest : '#fbf6ec') : (dark ? 'rgba(237,228,207,.7)' : PALETTE.forest),
            padding: '4px 10px', borderRadius: 999,
            fontSize: 11, fontWeight: 600,
            fontFamily: '"JetBrains Mono", ui-monospace, monospace',
            textTransform:'uppercase', letterSpacing:'.05em', cursor:'pointer',
          }}>{l}</button>
        );
      })}
    </div>
  );
}

function ImgPlaceholder({ caption, ratio = '4 / 3', tint = 'forest', radius = 4, style = {} }) {
  const tints = {
    forest: ['#1f3a29','#274932'],
    parch:  ['#e2d4b4','#d5c39c'],
    gold:   ['#c9a227','#a07f1a'],
    stone:  ['#cdc2a8','#b6a988'],
    cream:  ['#efe6d2','#e3d5b6'],
  };
  const [a, b] = tints[tint] || tints.forest;
  const isDark = tint === 'forest' || tint === 'gold';
  return (
    <div style={{
      aspectRatio: ratio, width: '100%', borderRadius: radius, overflow:'hidden',
      position:'relative',
      backgroundImage: `repeating-linear-gradient(135deg, ${a} 0 8px, ${b} 8px 16px)`,
      ...style,
    }}>
      <div style={{ position:'absolute', inset:0,
                    background: 'radial-gradient(60% 80% at 30% 30%, rgba(255,255,255,.10), transparent 60%)' }}/>
      {caption && (
        <span style={{
          position:'absolute', left: 10, bottom: 8,
          fontFamily:'"JetBrains Mono", ui-monospace, monospace',
          fontSize: 9, fontWeight: 500, letterSpacing:'.08em',
          color: isDark ? 'rgba(255,255,255,.78)' : 'rgba(15,32,21,.55)',
          textTransform:'uppercase',
        }}>{caption}</span>
      )}
    </div>
  );
}

function Photo({ src, caption, ratio='4 / 3', radius = 4, style = {} }) {
  const [err, setErr] = React.useState(false);
  if (err) return <ImgPlaceholder caption={caption} ratio={ratio} radius={radius} style={style} />;
  return (
    <div style={{
      aspectRatio: ratio, width:'100%', borderRadius: radius, overflow:'hidden',
      position:'relative', background:'#1f3a29', ...style,
    }}>
      <img src={src} alt={caption||''} onError={() => setErr(true)} style={{
        width:'100%', height:'100%', objectFit:'cover', display:'block',
      }}/>
      {caption && (
        <span style={{
          position:'absolute', left:10, bottom:8,
          fontFamily:'"JetBrains Mono", ui-monospace, monospace',
          fontSize: 9, fontWeight: 500, letterSpacing:'.08em',
          color: 'rgba(255,255,255,.85)', textTransform:'uppercase',
          textShadow:'0 1px 2px rgba(0,0,0,.5)',
        }}>{caption}</span>
      )}
    </div>
  );
}

function DietFilterRow({ active, onToggle, t, dark = false }) {
  const opts = [
    { k:'veg',   label: t.veg[t._lang] },
    { k:'vegan', label: t.vegan[t._lang] },
    { k:'gf',    label: t.gf[t._lang] },
    { k:'lf',    label: t.lf[t._lang] },
  ];
  return (
    <div style={{ display:'flex', flexWrap:'wrap', gap: 6 }}>
      {opts.map(o => {
        const on = active.includes(o.k);
        return (
          <button key={o.k} onClick={() => onToggle(o.k)} style={{
            border: on ? `1px solid ${dark ? PALETTE.gold : PALETTE.forest}` : `1px solid ${dark ? 'rgba(255,255,255,.18)' : 'rgba(15,32,21,.15)'}`,
            background: on ? (dark ? 'rgba(201,162,39,.18)' : 'rgba(15,32,21,.08)') : 'transparent',
            color: dark ? '#ede4cf' : PALETTE.ink,
            padding: '5px 10px', borderRadius: 999,
            fontSize: 11, fontWeight: 500, whiteSpace:'nowrap',
            cursor:'pointer', display:'inline-flex', alignItems:'center', gap: 5,
          }}>
            <DietBadge k={o.k} dark={dark} />
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

const Icon = {
  back: (size=18, c='currentColor') => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M15 6l-6 6 6 6" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  diamond: (size=10, c='currentColor') => (
    <svg width={size} height={size} viewBox="0 0 10 10">
      <path d="M5 1 L8.5 5 L5 9 L1.5 5 Z" fill="none" stroke={c} strokeWidth="1.2"/>
    </svg>
  ),
  chev: (size=14, c='currentColor', dir='down') => {
    const r = { down: 0, up: 180, left: 90, right: -90 }[dir];
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ transform:`rotate(${r}deg)` }}>
        <path d="M6 9l6 6 6-6" stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  },
};

Object.assign(window, {
  PALETTE, DIET_LABELS,
  L, makeT,
  DietBadge, OriginBadge, LangPicker, ImgPlaceholder, Photo, DietFilterRow, Icon,
});
