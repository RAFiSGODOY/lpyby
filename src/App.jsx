import { useRef } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar';

import Hero from './views/hero/hero';
import About from './views/about/about';
import Plans from './views/plans/plans';
import Footer from './components/footer/footer';
import Manifest from './views/manifest/manifest';
import blobs from './assets/svgs/topography.svg';
import SocialProof from './views/landing/SocialProof';
import Benefits from './views/landing/Benefits';
import HowItWorks from './views/landing/HowItWorks';
import Integrations from './views/landing/Integrations';
import Security from './views/landing/Security';
import FAQ from './views/landing/FAQ';
import ContactCTA from './views/landing/ContactCTA';

function App() {
  const spotlightRef = useRef(null);
  const rafRef = useRef(0);

  const onPointerMove = (e) => {
    const el = spotlightRef.current;
    if (!el) return;

    // evita escrever style em alta frequência
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.setProperty('--mx', `${e.clientX}px`);
      el.style.setProperty('--my', `${e.clientY}px`);
      el.style.opacity = '0.22';
    });
  };

  const onPointerLeave = () => {
    const el = spotlightRef.current;
    if (!el) return;
    el.style.opacity = '0';
  };

  return (
    <div className="bg-primary-light relative" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {/* Background pattern base (sempre sutil) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] "
        style={{
          backgroundImage: `url(${blobs})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '1000px 1000px',
          backgroundPosition: '0 0'
        }}
      />

      {/* Spotlight: revela só ao redor do mouse */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-0 transition-opacity duration-150"
        style={{
          backgroundImage: `url(${blobs})`,
          backgroundRepeat: 'repeat',
          backgroundSize: '1000px 1000px',
          backgroundPosition: '0 0',
          // máscara radial (com fallback webkit)
          maskImage:
            'radial-gradient(140px circle at var(--mx, 50%) var(--my, 50%), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)',
          WebkitMaskImage:
            'radial-gradient(140px circle at var(--mx, 50%) var(--my, 50%), rgba(0,0,0,1) 0%, rgba(0,0,0,0) 70%)'
        }}
      />
      <Navbar />
      <section id="inicio">
        <Hero />
      </section>

      <section id="sobre">
        <SocialProof />
        <Benefits />
        <HowItWorks />


      </section>

      <section id="App Mobile" className="">
        {/* Âncora extra para compatibilidade com links existentes */}
        <div id="Painel Web" className="" />
        <About />
      </section>
      <Integrations />
      <Security />
      <section id="planos">
        <Plans />
      </section>
      <FAQ />
      <section id="contato">
     
        <Footer />
      </section>

    </div>
  )
}

export default App
