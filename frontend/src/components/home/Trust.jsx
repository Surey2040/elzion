export default function Trust() {
  return (
    <section className="trust">
      <div className="wrap">
        <div className="trust-head">
          <div>
            <span className="eyebrow" style={{ color: 'var(--dim)' }}>The next era, engineered</span>
            <h2 style={{ marginTop: 14 }}>Why Trust Us with Your Product?</h2>
          </div>
          <p>
            ELZION is an independent technology startup creating intelligent software, immersive interfaces and
            scalable digital systems for founders, retailers and growing businesses.
          </p>
        </div>

        <div className="mosaic">
          <div className="tile t-laptop">
            <div className="laptop"><div className="lid"></div><div className="base"></div></div>
            <span className="lbl">Web Design</span>
          </div>

          <div className="tile t-brand">
            <span className="mark">elz<b>ion.</b></span>
            <span className="lbl">Brand identity</span>
          </div>

          <div className="tile stat">
            <strong>7</strong>
            <b>Service lines</b>
            <span>Branding to cloud, under one roof</span>
          </div>

          <div className="tile t-agent">
            <span className="msg u">Reorder stock for items below 10 units</span>
            <span className="msg a">Done. 6 purchase orders drafted and sent for approval.</span>
            <span className="lbl">AI Works</span>
          </div>

          <div className="tile stat">
            <strong>100%</strong>
            <b>Custom built</b>
            <span>Designed and coded for your business, never a template</span>
          </div>

          <div className="tile t-tablet">
            <div className="tab"><span></span><span></span><span></span><span></span><span></span></div>
            <span className="lbl">ERP &amp; CRM Systems</span>
          </div>
        </div>
      </div>
    </section>
  );
}
