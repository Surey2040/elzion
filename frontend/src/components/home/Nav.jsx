import { useEffect, useRef, useState } from 'react';

// Is the page behind the logo dark? Looks at the first reasonably opaque background under it.
function isDarkBehind(header) {
  const logo = header.querySelector('.logo');
  if (!logo) return false;
  const box = logo.getBoundingClientRect();
  const stack = document.elementsFromPoint(box.left + box.width / 2, box.top + box.height / 2);
  for (const el of stack) {
    if (header.contains(el)) continue;
    const match = getComputedStyle(el).backgroundColor.match(/rgba?\(([^)]+)\)/);
    if (!match) continue;
    const [r, g, b, a = 1] = match[1].split(',').map(parseFloat);
    if (a < 0.5) continue;
    return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 < 0.45;
  }
  return false;
}

export default function Nav() {
  const headerRef = useRef(null);
  const [onDark, setOnDark] = useState(false);
  // The full nav (logo, links pill and "Let's talk") is always visible.
  // Over dark sections (e.g. the red project journey) the nav switches to light colours (.is-on-dark).
  useEffect(() => {
    let frame = 0;
    const checkDark = () => {
      frame = 0;
      if (headerRef.current) setOnDark(isDarkBehind(headerRef.current));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(checkDark);
    };

    checkDark();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  const classes = ['nav', onDark && 'is-on-dark'].filter(Boolean).join(' ');

  return (
    <header ref={headerRef} className={classes}>
      <div className="wrap">
        <a href="#top" className="logo" aria-label="Elzion home">
          elz<b>ion.</b>
        </a>
        <div className="nav-right">
          <nav className="pill" aria-label="Main">
            <a className="lnk" href="#process">How we work</a>
            <a className="lnk" href="#services">Services</a>
            <a className="lnk" href="#work">Work</a>
            <a className="lnk" href="#faq">FAQs</a>
          </nav>
          <a className="nav-cta" href="#contact">
            Let’s talk <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
