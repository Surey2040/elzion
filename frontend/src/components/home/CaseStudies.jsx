import { useRef } from 'react';
import '../../styles/case-studies.css';
import useCaseStudyMotion from './useCaseStudyMotion.js';

// Work: Jothi Vel Chits and the retail case study, with their original scroll animations
// (the red-card journey, rotating app screens, client feedback and the shutter transition).
export default function CaseStudies() {
  const rootRef = useRef(null);
  useCaseStudyMotion(rootRef);

  return (
    <div className="case-studies" ref={rootRef}>
    <section className="chrono-journey" id="jothi-vel-chits" aria-label="Travel to projects">
      <div className="chrono-sticky">
        <div className="chrono-cards" aria-hidden="true">
          <i className="chrono-card"></i><i className="chrono-card"></i><i className="chrono-card"></i><i className="chrono-card"></i>
          <div className="chrono-core"><span className="chrono-core-face chrono-core-face--front"><b>elzion.</b></span><span className="chrono-core-face chrono-core-face--back"><b>projects.</b></span></div>
          <i className="chrono-dust" style={{ '--n': 0 }}></i><i className="chrono-dust" style={{ '--n': 1 }}></i><i className="chrono-dust" style={{ '--n': 2 }}></i><i className="chrono-dust" style={{ '--n': 3 }}></i><i className="chrono-dust" style={{ '--n': 4 }}></i><i className="chrono-dust" style={{ '--n': 5 }}></i><i className="chrono-dust" style={{ '--n': 6 }}></i><i className="chrono-dust" style={{ '--n': 7 }}></i><i className="chrono-dust" style={{ '--n': 8 }}></i><i className="chrono-dust" style={{ '--n': 9 }}></i><i className="chrono-dust" style={{ '--n': 10 }}></i><i className="chrono-dust" style={{ '--n': 11 }}></i>
        </div>
        <section className="chrono-project" aria-label="Jothi Vel Chits project preview">
          <div className="chrono-project-frame">
            <svg className="chrono-project-ribbon" viewBox="0 0 1600 900" preserveAspectRatio="none" aria-hidden="true"><path d="M-140 670 C 180 525, 310 770, 570 690 S 960 380, 1220 430 S 1470 610, 1730 290"/><path className="chrono-project-ribbon-glint" d="M-140 670 C 180 525, 310 770, 570 690 S 960 380, 1220 430 S 1470 610, 1730 290"/></svg>
            <div className="chrono-project-copy"><small>FINTECH · MOBILE PRODUCT</small><h2>Money moves.<br /><em>People connect.</em></h2><p>A focused workflow for chit groups, members, collections and daily closing—shaped into one calm mobile experience.</p></div>
            <figure className="chrono-phone chrono-phone--one">
              <span className="chrono-device-screen"><img className="chrono-phone-screen" src="/assets/projects/jothi/screen-1.jpg" alt="Jothi Vel Chits app screen 1" /></span>
              <img className="chrono-device-art" src="/assets/mockups/iphone-17-pro-silver.png" alt="" aria-hidden="true" />
            </figure>
            <figure className="chrono-phone chrono-phone--two">
              <span className="chrono-device-screen"><img className="chrono-phone-screen" src="/assets/projects/jothi/screen-3.jpg" alt="Jothi Vel Chits app screen 3" /></span>
              <img className="chrono-device-art" src="/assets/mockups/iphone-17-pro-blue.png" alt="" aria-hidden="true" />
            </figure>
          </div>
        </section>
        <div className="chrono-grain"></div>
      </div>
    </section>

    <section className="mobile-project-intro" aria-label="Mobile project introduction">
      <h2>A project story<br />made for your <em>thumb.</em></h2>
      <i aria-hidden="true">↓</i>
    </section>

    <section className="mobile-project-reel" aria-label="Jothi Vel Chits mobile project preview">
      <div className="mobile-project-stage">
        <header><a href="#top">elzion.</a></header>
        <div className="mobile-project-copy">
          <small>PRODUCT DESIGN · MOBILE APP</small>
          <h2>Jothi Vel<br /><i>Chits.</i></h2>
          <p>Groups, collections and daily closing—designed as one clear mobile workflow.</p>
        </div>
        <div className="mobile-phone-scene">
          <figure className="mobile-project-phone mobile-project-phone--one">
            <span className="iphone17-screen"><img src="/assets/projects/jothi/screen-1.jpg" alt="Jothi Vel Chits login screen" /></span>
            <img className="iphone17-frame" src="/assets/mockups/iphone-17-pro-silver.png" alt="" aria-hidden="true" />
          </figure>
          <figure className="mobile-project-phone mobile-project-phone--two">
            <span className="iphone17-screen"><img src="/assets/projects/jothi/screen-3.jpg" alt="Jothi Vel Chits dashboard screen" /></span>
            <img className="iphone17-frame" src="/assets/mockups/iphone-17-pro-blue.png" alt="" aria-hidden="true" />
          </figure>
          <i className="mobile-orbit mobile-orbit--one" aria-hidden="true"></i>
          <i className="mobile-orbit mobile-orbit--two" aria-hidden="true"></i>
        </div>
      </div>
    </section>

    <section className="mobile-project-details" aria-label="Jothi Vel Chits product screens">
      <header><span>INSIDE THE PRODUCT</span></header>
      <h2>One flow.<br /><em>No friction.</em></h2>
      <div className="mobile-screen-strip">
        <figure><div className="iphone17-shell"><span className="iphone17-screen"><img src="/assets/projects/jothi/screen-2.jpg" alt="New chit screen" /></span><img className="iphone17-frame" src="/assets/mockups/iphone-17-pro-blue.png" alt="" aria-hidden="true" /></div><figcaption>CREATE</figcaption></figure>
        <figure><div className="iphone17-shell"><span className="iphone17-screen"><img src="/assets/projects/jothi/screen-4.jpg" alt="Member screen" /></span><img className="iphone17-frame" src="/assets/mockups/iphone-17-pro-silver.png" alt="" aria-hidden="true" /></div><figcaption>MEMBERS</figcaption></figure>
        <figure><div className="iphone17-shell"><span className="iphone17-screen"><img src="/assets/projects/jothi/screen-7.jpg" alt="Collection screen" /></span><img className="iphone17-frame" src="/assets/mockups/iphone-17-pro-blue.png" alt="" aria-hidden="true" /></div><figcaption>COLLECT</figcaption></figure>
      </div>
    </section>

    <section className="client-feedback" aria-label="Client feedback from Jothi Vel Chits">
      <div className="client-feedback-visual" aria-hidden="true">
        <div className="client-feedback-halo"></div>
        <figure className="client-feedback-phone client-feedback-phone--back"><span className="iphone17-screen"><img src="/assets/projects/jothi/screen-1.jpg" alt="" /></span><img className="iphone17-frame" src="/assets/mockups/iphone-17-pro-silver.png" alt="" /></figure>
        <figure className="client-feedback-phone client-feedback-phone--front"><span className="iphone17-screen"><img src="/assets/projects/jothi/screen-3.jpg" alt="" /></span><img className="iphone17-frame" src="/assets/mockups/iphone-17-pro-blue.png" alt="" /></figure>
      </div>
      <article className="client-feedback-quote">
        <div className="client-feedback-mark">“</div>
        <h2>They understood how our team <em>actually works.</em></h2>
        <p>ELZION turned a complicated daily process into one clear mobile experience. Collections, member tracking and closing now feel faster and easier—without losing the familiarity our staff needed.</p>
        <footer><div><strong>JOTHI VEL</strong><span>FOUNDER · JOTHI VEL CHITS</span></div><div className="client-feedback-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></footer>
      </article>
    </section>

    <section className="retail-transition" aria-label="Transition to Namba Kadai project">
      <div className="retail-transition-sticky">
        <div className="retail-shutter retail-shutter--top"><span>PROJECT 02</span></div>
        <div className="retail-shutter retail-shutter--bottom"><span>RETAIL OPERATING SYSTEM</span></div>
        <div className="retail-transition-core"><b>02</b><p>NAMBA KADAI</p></div>
      </div>
    </section>

    <section className="retail-case" id="namba-kadai" aria-label="Namba Kadai retail operating system case study">
      <div className="retail-hero">
        <div className="retail-grid" aria-hidden="true"></div><i className="retail-orbit retail-orbit--a"></i><i className="retail-orbit retail-orbit--b"></i>
        <div className="retail-hero-copy"><p>RETAIL TECHNOLOGY · MOBILE PRODUCT</p><h2>Every shelf.<br /><em>One pulse.</em></h2><span>A connected operating system for stock, purchases, customers, reports and the people running the store.</span></div>
        <div className="retail-phones" data-retail-rotator>
          <figure className="retail-phone retail-phone--a"><span><img src="/assets/projects/namba/screen-02.jpg" alt="Namba Kadai categories screen" /></span><img src="/assets/mockups/iphone-17-pro-silver.png" alt="" /></figure>
          <figure className="retail-phone retail-phone--b"><span><img src="/assets/projects/namba/screen-12.jpg" alt="Namba Kadai reports screen" /></span><img src="/assets/mockups/iphone-17-pro-blue.png" alt="" /></figure>
          <figure className="retail-phone retail-phone--c"><span><img src="/assets/projects/namba/screen-08.jpg" alt="Namba Kadai purchase screen" /></span><img src="/assets/mockups/iphone-17-pro-silver.png" alt="" /></figure>
        </div>
      </div>

      <div className="retail-overview"><p>THE PRODUCT SYSTEM</p><div><h2>Built for the<br /><em>rhythm of retail.</em></h2><aside><p>Namba Kadai brings master data, inward inventory, billing, reporting, backup and staff control into one dependable mobile workspace.</p><dl><div><dt>20</dt><dd>CORE SCREENS</dd></div><div><dt>06</dt><dd>CONNECTED FLOWS</dd></div><div><dt>01</dt><dd>CALM SYSTEM</dd></div></dl></aside></div></div>

      <div className="retail-flow"><header><p>FROM STOCK-IN TO STORE INSIGHT</p><h2>One system.<br /><em>No blind spots.</em></h2></header><div className="retail-flow-track">
        <article><b>01 / ORGANISE</b><div className="retail-mini-phone"><span><img src="/assets/projects/namba/screen-01.jpg" alt="Product management screen" /></span><img src="/assets/mockups/iphone-17-pro-blue.png" alt="" /></div><h3>Master every detail.</h3><p>Products, categories, suppliers and customers stay structured and ready for action.</p></article>
        <article><b>02 / RECEIVE</b><div className="retail-mini-phone"><span><img src="/assets/projects/namba/screen-08.jpg" alt="Purchase workflow screen" /></span><img src="/assets/mockups/iphone-17-pro-silver.png" alt="" /></div><h3>Move stock inward.</h3><p>Draft purchases, record costs and build a reliable inventory trail without friction.</p></article>
        <article><b>03 / UNDERSTAND</b><div className="retail-mini-phone"><span><img src="/assets/projects/namba/screen-11.jpg" alt="Business report screen" /></span><img src="/assets/mockups/iphone-17-pro-blue.png" alt="" /></div><h3>See the store clearly.</h3><p>Live stock value, profit, sales and audit views turn daily activity into decisions.</p></article>
        <article><b>04 / PROTECT</b><div className="retail-mini-phone"><span><img src="/assets/projects/namba/screen-17.jpg" alt="Backup and security screen" /></span><img src="/assets/mockups/iphone-17-pro-silver.png" alt="" /></div><h3>Keep every record safe.</h3><p>Local backup, cloud sync, users and hardware settings live inside one secure layer.</p></article>
      </div></div>

      <div className="retail-feedback" id="namba-feedback"><div className="retail-feedback-visual"><i></i><figure className="retail-phone"><span><img src="/assets/projects/namba/screen-12.jpg" alt="Namba Kadai reports screen" /></span><img src="/assets/mockups/iphone-17-pro-blue.png" alt="" /></figure></div><article><div>“</div><h2>Now we know what the store is doing—<em>before the day ends.</em></h2><p>ELZION brought inventory, purchases, reports and daily controls into one system our team can actually use. The workflow feels faster, clearer and far easier to trust.</p><footer><span><b>SASI</b><small>STORE OWNER · NAMBA KADAI</small></span><small>CLIENT FEEDBACK · 02</small></footer></article></div>
    </section>
    </div>
  );
}
