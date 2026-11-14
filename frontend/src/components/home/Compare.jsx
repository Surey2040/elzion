const COLUMNS = ['Agency', 'Freelancers', 'No-code DIY'];

const ROWS = [
  ['Team', 'Design + engineering together', 'Separate departments', 'Several people to manage', 'Just you'],
  ['Progress', 'Weekly working demos', 'Monthly reports', 'Varies by person', 'When you find time'],
  ['Scope', 'Web, apps, AI, ERP', 'Often web only', 'One skill each', 'Template limits'],
  ['Ownership', 'Full code & IP is yours', 'Sometimes locked in', 'Unclear', 'Platform-locked'],
  ['After launch', 'Care+ support available', 'Billed extra', 'Rarely', 'All on you'],
];

export default function Compare() {
  return (
    <section className="compare">
      <div className="wrap">
        <div className="compare-head">
          <span className="eyebrow">Why partner with us?</span>
          <h2>The Smarter Way to Build Software.</h2>
          <p>
            Compared with hiring freelancers, a large agency or doing it yourself with no-code tools, Elzion removes
            the hand-offs, delays and guesswork.
          </p>
        </div>
        <div className="tbl-wrap">
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="us"><span>Elzion</span></th>
                {COLUMNS.map((col) => (
                  <th key={col}><span>{col}</span></th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ROWS.map(([label, us, ...others]) => (
                <tr key={label}>
                  <th>{label}</th>
                  <td className="us">{us}</td>
                  {others.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="end">
          <p>Ready for a tech partner that keeps it simple?</p>
          <a href="#contact" className="btn btn-green">
            Start a project <span className="arr" aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
