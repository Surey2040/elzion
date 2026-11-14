import './marquee.css';

// Plain React + CSS port of the shadcn / 21st.dev Marquee (this project has no Tailwind or TypeScript).
// Same props: pauseOnHover, direction ('left' | 'right') and speed (seconds per loop).
// The children are rendered twice and the track slides by -50%, so the loop is seamless;
// the second copy is hidden from screen readers.
export function Marquee({ children, pauseOnHover = false, direction = 'left', speed = 30, className = '', ...props }) {
  const trackClass = ['marquee-ui__track', pauseOnHover && 'is-pausable', direction === 'right' && 'is-reverse']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={`marquee-ui ${className}`.trim()} {...props}>
      <div className="marquee-ui__viewport">
        <div className={trackClass} style={{ '--duration': `${speed}s` }}>
          <div className="marquee-ui__group">{children}</div>
          <div className="marquee-ui__group" aria-hidden="true">{children}</div>
        </div>
      </div>
    </div>
  );
}
