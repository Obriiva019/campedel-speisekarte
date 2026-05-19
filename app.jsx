// app.jsx — Campedèl Hof · Magazin
// Responsive shell: full-bleed on phones (QR-scan target), centered phone frame on desktop.
// Tiny in-memory router for the four screens, plus a discrete day/evening toggle.

const STORAGE_LANG = 'campedel:lang';
const STORAGE_DARK = 'campedel:dark';

function useLocal(key, initial) {
  const [v, setV] = React.useState(() => {
    try { const s = localStorage.getItem(key); return s === null ? initial : JSON.parse(s); }
    catch { return initial; }
  });
  React.useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [v]);
  return [v, setV];
}

function useViewport() {
  const [w, setW] = React.useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  React.useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return w;
}

function App() {
  const [lang, setLang] = useLocal(STORAGE_LANG, 'de');
  const [dark, setDark] = useLocal(STORAGE_DARK, false);
  const [route, setRoute] = React.useState({ screen: 'landing', params: {} });
  const [history, setHistory] = React.useState([]);

  const goTo = (screen, params = {}) => {
    setHistory(h => [...h, route]);
    setRoute({ screen, params });
    // scroll the content area to top on every navigation
    setTimeout(() => {
      const el = document.querySelector('.mag-scroll');
      if (el) el.scrollTo({ top: 0, behavior: 'auto' });
    }, 0);
  };

  const back = () => {
    if (!history.length) return setRoute({ screen: 'landing', params: {} });
    const prev = history[history.length - 1];
    setHistory(h => h.slice(0, -1));
    setRoute(prev);
  };

  // Override goTo: pass 'back' as screen sentinel — actually screens call goTo('landing') / goTo('menu') directly, so we keep the simple replace behavior.

  const w = useViewport();
  const isMobile = w < 768;

  // Set body background to match current theme so safe-area looks intentional
  React.useEffect(() => {
    document.documentElement.style.background = dark ? '#0a160d' : '#e8dec7';
    document.body.style.background = dark ? '#0a160d' : '#e8dec7';
    document.querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? PALETTE.forest : PALETTE.parchment);
  }, [dark]);

  const screenEl = (() => {
    const props = { lang, setLang, dark, goTo };
    switch (route.screen) {
      case 'menu':     return <MagMenu     {...props} initialOpen={route.params.open} />;
      case 'detail':   return <MagDetail   {...props} itemId={route.params.itemId} catId={route.params.catId} />;
      case 'specials': return <MagSpecials {...props} />;
      case 'wines':    return <MagWines    {...props} />;
      case 'landing':
      default:         return <MagLanding  {...props} />;
    }
  })();

  // Mobile: full-bleed. Desktop: centered phone frame.
  return (
    <div className={`mag-app ${dark?'is-dark':'is-light'}`}>
      <ThemeToggle dark={dark} onToggle={() => setDark(d => !d)} />
      {isMobile ? (
        <div className="mag-mobile mag-scroll">{screenEl}</div>
      ) : (
        <div className="mag-desktop">
          <div className="mag-phone">
            <div className="mag-phone-screen mag-scroll">{screenEl}</div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Discrete day / evening toggle (top-left, floating) ────
function ThemeToggle({ dark, onToggle }) {
  return (
    <button onClick={onToggle} className="mag-theme-toggle" aria-label="Toggle evening mode"
      title={dark ? 'Tag' : 'Abend'}>
      {dark ? (
        // Sun
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6"/>
          {[0,45,90,135,180,225,270,315].map(a => (
            <line key={a} x1="12" y1="2.5" x2="12" y2="5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"
              transform={`rotate(${a} 12 12)`}/>
          ))}
        </svg>
      ) : (
        // Moon
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a.5.5 0 0 0-.7-.46A9.5 9.5 0 1 0 20.46 15.2.5.5 0 0 0 20 14.5z"
            stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
        </svg>
      )}
    </button>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
