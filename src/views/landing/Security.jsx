import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Item({ title, desc }) {
  return (
    <div className="rounded-2xl border border-black/10 border-l-4 border-l-primary/70 bg-white/40 backdrop-blur-sm px-6 py-6 transition-colors hover:bg-white/50">
      <p className="text-sm font-semibold text-gray-900">{title}</p>
      <p className="mt-2 text-sm font-light text-gray-700 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function Security() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      section.querySelectorAll?.('[data-sc]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      const kicker = q('[data-sc="kicker"]');
      const title = q('[data-sc="title"]');
      const desc = q('[data-sc="desc"]');
      const items = q('[data-sc="items"] > *');

      const enterEls = [kicker, title, desc, items].flat().filter(Boolean);

      gsap.set(enterEls, { autoAlpha: 0, y: 14, force3D: true });
      gsap.set(title, { y: 18 });
      gsap.set(items, { y: 18 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 90%',
          end: 'bottom 10%',
          scrub: 1,
          invalidateOnRefresh: true
        }
      });

      tl.to(kicker, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.26)
        .to(title, { autoAlpha: 1, y: 0, duration: 0.16 }, 0.30)
        .to(desc, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.36)
        .to(items, { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.06 }, 0.42);

      tl.to(enterEls, { autoAlpha: 0, y: -10, duration: 0.22, stagger: 0.015, ease: 'power2.in' }, 0.90);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full  px-6 lg:px-10 py-20 lg:py-64 h-[100vh]"
      data-section="security"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        <div className="lg:col-span-5">
          <p
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 font-medium"
            data-sc="kicker"
          >
            <span className="h-1 w-1 rounded-full bg-gray-500" />
            Segurança
          </p>

          <h2 className="mt-5 text-5xl sm:text-6xl leading-[0.95] font-regular text-primary" data-sc="title">
            Confiança para
            <br />
            operar com
            <br />
            <span className="font-extrabold">tranquilidade</span>.
          </h2>

          <p className="mt-6 text-sm sm:text-base font-light text-gray-700 leading-relaxed max-w-xl" data-sc="desc">
            Privacidade, controle e rastreabilidade não são extras. Eles sustentam a operação e deixam auditorias e validações mais simples.
          </p>
        </div>

        <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2" data-sc="items">
          <Item title="LGPD by design" desc="Boas práticas de privacidade e minimização de dados." />
          <Item title="Controle de acesso" desc="Perfis e permissões por tipo de usuário." />
          <Item title="Histórico rastreável" desc="Registros e eventos organizados para conferência." />
          <Item title="Confiabilidade" desc="Fluxos pensados para reduzir inconsistência e erro humano." />
        </div>
      </div>
    </section>
  );
}

