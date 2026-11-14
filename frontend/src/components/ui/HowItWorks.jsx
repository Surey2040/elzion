import { useEffect, useRef, useState } from 'react';
import './how-it-works.css';

// Plain React + CSS port of the shadcn / 21st.dev "How it works" component (this project has no Tailwind,
// TypeScript or `motion`; the dashed line is animated with CSS instead).
// Each step: { title, description, colorTheme: 'green' | 'cream' | 'dark', colors?: { bg, text, border } }.

const Pin = () => (
  <svg className="hiw-pin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M16 3a1 1 0 0 1 .117 1.993l-.117 .007v4.764l1.894 3.789a1 1 0 0 1 .1 .331l.006 .116v2a1 1 0 0 1 -.883 .993l-.117 .007h-4v4a1 1 0 0 1 -1.993 .117l-.007 -.117v-4h-4a1 1 0 0 1 -.993 -.883l-.007 -.117v-2a1 1 0 0 1 .06 -.34l.046 -.107l1.894 -3.791v-4.762a1 1 0 0 1 -.117 -1.993l.117 -.007h8z" />
  </svg>
);

// Desktop positions inside the 1000px board (top in px; left/right as a share of the board width).
const DEFAULT_POSITIONS = [
  { top: 0, left: '15%', rotate: 8 },
  { top: 120, right: '15%', rotate: -8 },
  { top: 450, left: '15%', rotate: 8 },
  { top: 570, right: '10%', rotate: -8 },
  { top: 850, left: '15%', rotate: 8 },
];

// The dashed line is built from one curve per pair of neighbouring cards.
const PATH_SEGMENTS = [
  'M 290 150 C 500 150, 550 270, 710 270',
  ' C 850 270, 500 350, 290 450',
  ' C 290 600, 550 720, 750 720',
  ' C 950 720, 500 800, 290 850',
];

const BOARD_HEIGHT = { 1: 400, 2: 450, 3: 800, 4: 900 };

export default function HowItWorks({ features = [], stepPositions = DEFAULT_POSITIONS, className = '' }) {
  const rootRef = useRef(null);
  const [inView, setInView] = useState(false);

  // The cards pin up one after another the first time the board scrolls into view.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (features.length === 0) return null;

  const height = BOARD_HEIGHT[features.length] ?? 1130;
  const pathD = PATH_SEGMENTS.slice(0, features.length - 1).join('');

  return (
    <div ref={rootRef} className={`hiw ${inView ? 'is-in' : ''} ${className}`.trim()}>
      <div className="hiw-lines" aria-hidden="true"></div>
      <div className="hiw-inner">
        <div className="hiw-board" style={{ '--board-h': `${height}px` }}>
          {features.length > 1 && (
            <svg className="hiw-path" viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none" aria-hidden="true">
              <path
                d={pathD}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          )}

          <ol className="hiw-list">
            {features.map((step, index) => {
              const pos = stepPositions[index % stepPositions.length];
              const style = {
                '--i': index,
                '--t': `${pos.top}px`,
                '--l': pos.left ?? 'auto',
                '--r': pos.right ?? 'auto',
                '--rot': `${pos.rotate}deg`,
              };
              if (step.colors) {
                style['--bg'] = step.colors.bg;
                style['--text'] = step.colors.text;
                style['--border'] = step.colors.border;
              }
              return (
                <li key={step.title} className={`hiw-card hiw-${step.colorTheme || 'green'}`} style={style}>
                  <div className="hiw-frame">
                    <Pin />
                    <div className="hiw-body">
                      <span className="hiw-num">{String(index + 1).padStart(2, '0')}</span>
                      <h3>{step.title}</h3>
                      <p>{step.description}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
