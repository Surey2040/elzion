import Nav from '../components/home/Nav.jsx';
import Hero from '../components/home/Hero.jsx';
import Pain from '../components/home/Pain.jsx';
import Meet from '../components/home/Meet.jsx';
import TechMarquee from '../components/home/TechMarquee.jsx';
import Expertise from '../components/home/Expertise.jsx';
import Together from '../components/home/Together.jsx';
import Work from '../components/home/Work.jsx';
import Ways from '../components/home/Ways.jsx';
import FaqContactKinetic from './FaqContactKinetic.jsx';
import Footer from '../components/home/Footer.jsx';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <Pain />
        <Meet />
        <TechMarquee />
        <Expertise />
        <Together />
        <Work />
        <Ways />
        <FaqContactKinetic embedded />
      </main>
      <Footer />
    </>
  );
}
