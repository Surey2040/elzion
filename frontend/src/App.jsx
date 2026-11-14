import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home.jsx';
import JothiVelChitsEditorial from './pages/JothiVelChitsEditorial.jsx';
import JothiVelChitsOS from './pages/JothiVelChitsOS.jsx';
import JothiVelChitsFilm from './pages/JothiVelChitsFilm.jsx';
import KadaikuttyPosControl from './pages/KadaikuttyPosControl.jsx';
import KadaikuttyVariants from './pages/KadaikuttyVariants.jsx';
import KadaikuttyTimeline from './pages/KadaikuttyTimeline.jsx';
import KadaikuttyGenome from './pages/KadaikuttyGenome.jsx';
import FaqContactDemo from './pages/FaqContactDemo.jsx';
import FaqContactKinetic from './pages/FaqContactKinetic.jsx';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/jothi-vel-chits" element={<JothiVelChitsOS />} />
        <Route path="/jothi-vel-chits" element={<JothiVelChitsOS />} />
        <Route path="/projects/jothi-vel-chits-editorial" element={<JothiVelChitsEditorial />} />
        <Route path="/projects/jothi-vel-chits-os" element={<JothiVelChitsOS />} />
        <Route path="/projects/jothi-vel-chits-film" element={<JothiVelChitsFilm />} />
        <Route path="/projects/kadaikutty-pos" element={<KadaikuttyGenome />} />
        <Route path="/projects/kadaikutty-pos-demo" element={<KadaikuttyPosControl />} />
        <Route path="/projects/kadaikutty-pos-a" element={<KadaikuttyPosControl />} />
        <Route path="/projects/kadaikutty-pos-b" element={<KadaikuttyVariants variant="b" />} />
        <Route path="/projects/kadaikutty-pos-c" element={<KadaikuttyVariants variant="c" />} />
        <Route path="/projects/kadaikutty-pos-d" element={<KadaikuttyVariants variant="d" />} />
        <Route path="/projects/kadaikutty-pos-e" element={<KadaikuttyTimeline />} />
        <Route path="/projects/kadaikutty-pos-f" element={<KadaikuttyGenome />} />
        <Route path="/demos/faq-contact-a" element={<FaqContactDemo variant="a" />} />
        <Route path="/demos/faq-contact-b" element={<FaqContactDemo variant="b" />} />
        <Route path="/demos/faq-contact-c" element={<FaqContactDemo variant="c" />} />
        <Route path="/demos/faq-contact-d" element={<FaqContactDemo variant="d" />} />
        <Route path="/demos/faq-contact-e" element={<FaqContactKinetic />} />
        <Route path="/kadaikutty-pos" element={<KadaikuttyGenome />} />
      </Routes>
    </BrowserRouter>
  );
}
