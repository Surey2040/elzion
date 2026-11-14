import { useEffect, useRef, useState } from 'react';

const TASKS = [
  'Define user roles & permissions',
  'Set up CI/CD pipeline',
  'Design system tokens',
  'API rate limiting',
  'Push notifications',
  'GST-ready invoice format',
  'Offline sync for billing',
  'Payment gateway sandbox',
  'Guardrails for the AI agent',
  'Daily database backups',
  'App store screenshots',
  'Lighthouse score above 90',
  'SSL & custom domain',
  'Role-based dashboards',
  'Load testing',
  'Analytics events',
  'Error monitoring',
  'Accessibility audit',
  'Onboarding flow',
  'Migrate data from Excel',
  'WhatsApp notifications',
  'SEO meta & sitemap',
  'Privacy policy page',
  'Test on low-end Android phones',
];

// [position class, text]: the order is also the order the bubbles pop in.
const BUBBLES = [
  ['b1', 'Why is our site so slow?'],
  ['b2', 'Our ERP is still a spreadsheet'],
  ['b3', 'It works on my phone, not theirs'],
  ['b4', 'We want AI, but where do we start?'],
  ['b5', 'The agency vanished after launch'],
  ['b6', 'Five vendors, zero accountability'],
];

// The list is rendered twice so the CSS scroll animation loops seamlessly;
// the duplicate half is hidden from assistive tech.
const LOOPED_TASKS = [...TASKS, ...TASKS];

export default function Pain() {
  const bubblesRef = useRef(null);
  const [inView, setInView] = useState(false);

  // The bubble loop runs only while the card is on screen; scrolling away and
  // back restarts it from the first bubble.
  useEffect(() => {
    const el = bubblesRef.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.25) setInView(true);
        else if (!entry.isIntersecting) setInView(false);
      },
      { threshold: [0, 0.25] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pain">
      <div className="wrap">
        <div className="dark-card pain-card">
          <div className="pain-copy">
            <p className="eyebrow">Sound familiar?</p>
            <h2>Building Software Shouldn’t Feel Like an Endless Backlog</h2>
          </div>
          <div className="tasks" aria-label="Typical launch checklist">
            <ul id="taskList">
              {LOOPED_TASKS.map((task, i) => (
                <li key={i} aria-hidden={i >= TASKS.length ? 'true' : undefined}>{task}</li>
              ))}
            </ul>
          </div>
          <div ref={bubblesRef} className={inView ? 'bubbles is-in' : 'bubbles'}>
            {BUBBLES.map(([cls, text], i) => (
              <span key={cls} className={`bubble ${cls}`} style={{ '--i': i }}>{text}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
