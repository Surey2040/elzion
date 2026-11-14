const WAYS = [
  ['You see working software every week.', 'Our weekly demo rule'],
  ['Complex ideas should feel effortless to use.', 'Our design rule'],
  ['One team owns the whole outcome.', 'Our delivery rule'],
  ['Build for today, scale for next year.', 'Our engineering rule'],
  ['Your code, your data, your product.', 'Our ownership rule'],
];

function Way({ quote, label, hidden }) {
  return (
    <div className="way" aria-hidden={hidden ? 'true' : undefined}>
      <span className="q">“</span>
      <p>{quote}</p>
      <span>{label}</span>
    </div>
  );
}

export default function Ways() {
  return (
    <section className="ways" aria-label="How we work">
      <div className="wrap"><h3>How we work, in our words</h3></div>
      <div className="ways-track">
        {WAYS.map(([quote, label]) => (
          <Way key={quote} quote={quote} label={label} />
        ))}
        {WAYS.map(([quote, label]) => (
          <Way key={`${quote}-loop`} quote={quote} label={label} hidden />
        ))}
      </div>
    </section>
  );
}
