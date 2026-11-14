import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/case-study.css';

const IMG = '/assets/projects/';

function Phone({ src, alt, className = '', style }) {
  return (
    <figure className={`cx-phone ${className}`} style={style}>
      <span className="cx-notch" aria-hidden="true" />
      <img src={IMG + src} alt={alt} loading="lazy" />
    </figure>
  );
}

function useInView(ref, opts = { threshold: 0.25 }) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return undefined; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, opts);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return seen;
}

function Count({ to }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return undefined;
    let raf; const t0 = performance.now();
    const tick = (t) => { const p = Math.min(1, (t - t0) / 1100); setN(Math.round(to * (1 - Math.pow(1 - p, 3)))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);
  return <b ref={ref}>{String(n).padStart(2, '0')}</b>;
}

export default function CaseStudy({ data }) {
  const { theme, number, name, kicker, intro, facts, hero, steps, roles, next } = data;
  const heroRef = useRef(null);
  const stepRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [cursor, setCursor] = useState(null);

  useEffect(() => { window.scrollTo(0, 0); }, [name]);

  // which story step is in the middle of the screen
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(Number(e.target.dataset.i)); });
    }, { rootMargin: '-45% 0px -45% 0px' });
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps]);

  const tilt = (e) => {
    const el = heroRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    el.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };

  return (
    <div className={`cx cx-${theme}`}>
      <header className="cx-nav">
        <Link to="/" className="logo">elz<b>ion.</b></Link>
        <span className="cx-nav-name"><i />{name}</span>
        <div><Link to={next.to}>Next project</Link><Link to="/#work">All work ↗</Link></div>
      </header>

      <main>
        {/* ---------- hero ---------- */}
        <section className="cx-hero" ref={heroRef} onPointerMove={tilt}>
          <div className="cx-blob" aria-hidden="true" />
          <span className="cx-bignum" aria-hidden="true">{number}</span>
          <div className="cx-hero-copy">
            <span className="cx-kicker">{kicker}</span>
            <h1 aria-label={name}>
              {name.split(' ').map((w, wi) => (
                <span className="cx-word" key={wi}>
                  {[...w].map((c, ci) => <span key={ci} style={{ '--d': `${(wi * 6 + ci) * 35}ms` }}>{c}</span>)}
                </span>
              ))}
            </h1>
            <p>{intro}</p>
            <a href="#story" className="cx-cta">See how it works <i aria-hidden="true">↓</i></a>
          </div>
          <div className="cx-fan" aria-label={`${name} screens`}>
            <div className="cx-fan-stack">{hero.map((src, i) => <Phone key={src} src={src} alt={`${name} screen ${i + 1}`} className={`cx-fan-${i}`} />)}</div>
          </div>
        </section>

        {/* ---------- facts ---------- */}
        <section className="cx-facts">
          {facts.map(([label, value, count]) => (
            <div key={label}>
              <span>{label}</span>
              {count ? <Count to={count} /> : <b>{value}</b>}
              {count && <small>{value}</small>}
            </div>
          ))}
        </section>

        {/* ---------- scroll story ---------- */}
        <section className="cx-story" id="story">
          <div className="cx-story-head">
            <span className="cx-kicker">How it works</span>
            <h2>One day in the app, <em>step by step.</em></h2>
          </div>
          <div className="cx-story-grid">
            <div className="cx-stage">
              <div className="cx-stage-phone">
                <span className="cx-notch" aria-hidden="true" />
                {steps.map((s, i) => (
                  <img key={s.img} src={IMG + s.img} alt={s.title} className={i === active ? 'on' : i < active ? 'past' : ''} />
                ))}
              </div>
              <div className="cx-stage-ring" aria-hidden="true" />
              <div className="cx-stage-count" aria-hidden="true"><b key={active}>{String(active + 1).padStart(2, '0')}</b><span>/ {String(steps.length).padStart(2, '0')}</span></div>
            </div>
            <ol className="cx-steps" style={{ '--p': steps.length > 1 ? active / (steps.length - 1) : 1 }}>
              {steps.map((s, i) => (
                <li key={s.title} data-i={i} ref={(el) => { stepRefs.current[i] = el; }} className={i === active ? 'on' : ''}>
                  <span className="cx-step-n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cx-step-tag">{s.tag}</span>
                  <h3>{s.title}</h3>
                  <p>{s.copy}</p>
                  <Phone src={s.img} alt={s.title} className="cx-step-phone" />
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- roles ---------- */}
        <section className="cx-roles">
          <span className="cx-kicker">Built for</span>
          <div className="cx-role-grid">
            {roles.map(([who, what], i) => (
              <article key={who} style={{ '--i': i }}>
                <b>{String(i + 1).padStart(2, '0')}</b>
                <h3>{who}</h3>
                <p>{what}</p>
              </article>
            ))}
          </div>
        </section>

        {/* ---------- next ---------- */}
        <section
          className="cx-next"
          onPointerMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setCursor({ x: e.clientX - r.left, y: e.clientY - r.top }); }}
          onPointerLeave={() => setCursor(null)}
        >
          <span className="cx-kicker">Next project</span>
          <Link to={next.to} className="cx-next-link">
            {next.name}<i aria-hidden="true">↗</i>
          </Link>
          <Phone src={next.img} alt="" className={`cx-next-peek ${cursor ? 'on' : ''}`}
            style={cursor ? { left: cursor.x, top: cursor.y } : undefined} />
        </section>
      </main>
    </div>
  );
}
