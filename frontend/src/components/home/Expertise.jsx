import { useEffect, useRef, useState } from 'react';

// Expertise cards: front shows the Elzion pattern, back shows the area, its outcome and what the client gets.
const AREAS = [
  ['Strategy', 'Know what to build before we build it.', ['Discovery workshops', 'User & market research', 'Product roadmap', 'Scope, budget & timeline']],
  ['Design', 'Interfaces people understand at first glance.', ['UX flows & wireframes', 'UI design systems', 'Clickable prototypes', 'Brand identity']],
  ['Engineering', 'Fast, secure software built to scale.', ['Websites & web apps', 'iOS & Android apps', 'ERP & CRM systems', 'AI agents & automation']],
  ['Launch & Care', 'Live, monitored and improving every month.', ['Cloud hosting & deployment', 'Testing across devices', 'App store releases', 'Monitoring & Care+ support']],
];

export default function Expertise() {
  const deckRef = useRef(null);
  const [open, setOpen] = useState(false);

  // When the deck comes into view it deals itself: the cards appear stacked, fan out, then flip
  // open one by one. Scrolling fully away resets it, so it plays again on the way back.
  useEffect(() => {
    const el = deckRef.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setOpen(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.35) setOpen(true);
        else if (!entry.isIntersecting) setOpen(false);
      },
      { threshold: [0, 0.35] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="expertise" id="services">
      <div className="wrap center">
        <span className="eyebrow">What we do for you</span>
        <h2>Four Areas of Expertise. One Product.</h2>
        <p className="lead">
          Every project draws on all four. You never have to stitch freelancers together or translate between vendors.
        </p>
        <div ref={deckRef} className={open ? 'deck is-open' : 'deck'}>
          {AREAS.map(([title, outcome, items], i) => {
            const num = String(i + 1).padStart(2, '0');
            return (
              <article key={title} className="deck-card" style={{ '--i': i }}>
                <div className="deck-card-inner">
                  <div className="deck-face deck-front" aria-hidden="true">
                    <img src="/assets/expertise/elzion-pattern.png" alt="" loading="lazy" decoding="async" />
                  </div>
                  <div className="deck-face deck-back">
                    <b>{num}</b>
                    <h3>{title}</h3>
                    <p>{outcome}</p>
                    <i aria-hidden="true"></i>
                    <ul>
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
