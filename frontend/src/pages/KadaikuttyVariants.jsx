import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer.jsx';
import '../styles/kadaikutty-variants.css';

const img = (n) => `/assets/projects/namba/screen-${String(n).padStart(2, '0')}.jpg`;

function ConceptNav({ letter, title }) {
  return <header className="kv-nav"><Link to="/" className="logo">elz<b>ion.</b></Link><span>CONCEPT {letter} / {title}</span><div><Link to="/#work">All work</Link><Link to={`/projects/kadaikutty-pos-${letter === 'B' ? 'c' : letter === 'C' ? 'd' : 'a'}`}>Next ↗</Link></div></header>;
}

function EditorialLedger() {
  return <div className="kv-page kv-b"><ConceptNav letter="B" title="STORE LEDGER" /><main>
    <section className="kvb-hero"><div className="kvb-index"><span>RETAIL SYSTEM / 2026</span><b>B—01</b></div><h1>KADAIKUTTY<br /><em>STORE LEDGER</em></h1><div className="kvb-intro"><p>A precise visual record of stock, sales and the decisions that move a store forward.</p><span>ANDROID / PRODUCT DESIGN / ENGINEERING</span></div><figure className="kvb-cover"><img src={img(12)} alt="Kadaikutty report screen" /></figure></section>
    <section className="kvb-statement"><span>THE BRIEF</span><p>Turn a busy retail day into a system that feels <em>clear enough to trust.</em></p></section>
    <section className="kvb-chapters">{[
      ['01','MASTER','Structure every product, supplier and customer record.',2],['02','MOVE','Connect purchases, inward stock and billing.',8],['03','READ','Close the day with the whole picture visible.',11]
    ].map(([n,k,t,s])=><article key={n}><div><span>{n} / {k}</span><h2>{t}</h2><p>One focused movement inside a larger connected retail workflow.</p></div><figure><img src={img(s)} alt={t} /></figure></article>)}</section>
    <section className="kvb-end"><span>END OF ENTRY / START OF CLARITY</span><h2>Everything in its<br /><em>right place.</em></h2><Link to="/#work">Return to work ↗</Link></section>
  </main><Footer /></div>;
}

function SpatialShelf() {
  return <div className="kv-page kv-c"><ConceptNav letter="C" title="SPATIAL SHELF" /><main>
    <section className="kvc-hero"><div className="kvc-copy"><span>THE DIGITAL STORE FLOOR</span><h1>EVERY<br />LAYER,<br /><em>CONNECTED.</em></h1><p>Walk through the system as one continuous retail space—from master data to daily insight.</p></div><div className="kvc-world"><div className="kvc-ring"></div>{[1,8,11,17].map((s,i)=><figure key={s} className={`kvc-float kvc-float-${i+1}`}><span>0{i+1}</span><img src={img(s)} alt={`System layer ${i+1}`} /></figure>)}</div><div className="kvc-floor"><span>PRODUCTS</span><span>PURCHASES</span><span>BILLING</span><span>REPORTS</span></div></section>
    <section className="kvc-tunnel"><div className="kvc-tunnel-head"><span>SYSTEM MAP</span><h2>Move through<br />the retail stack.</h2></div>{[['01','ORGANISE',2],['02','RECEIVE',9],['03','UNDERSTAND',12]].map(([n,t,s])=><article key={n}><span>{n}</span><h3>{t}</h3><figure><img src={img(s)} alt={t} /></figure><i>CONNECTED ↗</i></article>)}</section>
    <section className="kvc-end"><span>ONE FLOOR / ONE SYSTEM</span><h2>Nothing falls<br />between the <em>gaps.</em></h2><Link to="/#work">Back to projects ↗</Link></section>
  </main><Footer /></div>;
}

function ProductFilm() {
  return <div className="kv-page kv-d"><ConceptNav letter="D" title="PRODUCT FILM" /><main>
    <section className="kvd-hero"><span>KADAIKUTTY POS / A PRODUCT FILM</span><h1>THE DAY<br /><em>IN FOCUS.</em></h1><figure><img src={img(12)} alt="Kadaikutty POS" /></figure><p>A quiet, cinematic story about making an entire store easier to read.</p><div className="kvd-cue">PLAY THE STORY ↓</div></section>
    <section className="kvd-line"><span>SCENE 01</span><h2>Before the first sale,<br />the system is <em>ready.</em></h2><figure><img src={img(1)} alt="Product management" /></figure></section>
    <section className="kvd-line kvd-line-dark"><span>SCENE 02</span><h2>As stock moves,<br />the record moves <em>with it.</em></h2><figure><img src={img(8)} alt="Stock workflow" /></figure></section>
    <section className="kvd-line"><span>SCENE 03</span><h2>At closing time,<br />nothing is left <em>unclear.</em></h2><figure><img src={img(11)} alt="Business reports" /></figure></section>
    <section className="kvd-end"><span>THE END / AND TOMORROW'S BEGINNING</span><h2>Built for every<br />day after this.</h2><Link to="/#work">Close film ↗</Link></section>
  </main><Footer /></div>;
}

export default function KadaikuttyVariants({ variant }) {
  if (variant === 'b') return <EditorialLedger />;
  if (variant === 'c') return <SpatialShelf />;
  return <ProductFilm />;
}
