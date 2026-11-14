import { Link } from 'react-router-dom';
import Footer from '../components/home/Footer.jsx';
import '../styles/kadaikutty-genome.css';

const CELLS = [
  ['PRODUCT', '01', 'screen-02.jpg'], ['SUPPLY', '02', 'screen-08.jpg'],
  ['SALE', '03', 'screen-12.jpg'], ['REPORT', '04', 'screen-11.jpg'],
];

export default function KadaikuttyGenome() {
  return <div className="kg-page">
    <header className="kg-nav"><Link to="/" className="logo">elz<b>ion.</b></Link><span>KADAIKUTTY POS / RETAIL GENOME</span><div><Link to="/projects/jothi-vel-chits">Previous project</Link><Link to="/#work">All work ↗</Link></div></header>
    <main>
      <section className="kg-hero">
        <div className="kg-code"><span>KKPOS—2026</span><span>ANDROID / RETAIL / CONNECTED</span></div>
        <div className="kg-title"><span>THE SYSTEM BENEATH THE STORE</span><h1>RETAIL<br /><em>GENOME.</em></h1><p>Products, stock, sales and reports behave like one living code—each movement connected to the next.</p></div>
        <div className="kg-dna" aria-label="Connected retail interface sequence">
          {CELLS.map(([label, number, screen], index) => <div className={`kg-gene kg-gene-${index + 1}`} key={label}><span>{number} / {label}</span><figure><img src={`/assets/projects/namba/${screen}`} alt={`${label} interface`} /></figure><i></i></div>)}
        </div>
        <div className="kg-barcode" aria-hidden="true">{Array.from({ length: 34 }, (_, i) => <i key={i}></i>)}</div>
      </section>

      <section className="kg-sequence"><div className="kg-sequence-head"><span>SEQUENCE MAP</span><h2>Four signals.<br />One <em>retail organism.</em></h2></div><div className="kg-rows">
        {CELLS.map(([label, number, screen], index) => <article key={label}><span>{number}</span><h3>{label}</h3><p>{['Structure every item and relationship.','Record every movement into the store.','Keep every counter action immediate.','Turn the day into something readable.'][index]}</p><figure><img src={`/assets/projects/namba/${screen}`} alt={label} /></figure><b>CONNECTED</b></article>)}
      </div></section>

      <section className="kg-core"><span>CORE EXPRESSION / KADAIKUTTY POS</span><h2>Nothing lives<br />in <em>isolation.</em></h2><div className="kg-core-mark"><i></i><b>01</b><small>CONNECTED<br />SYSTEM</small></div><Link to="/#work">Back to projects ↗</Link></section>
    </main><Footer />
  </div>;
}
