import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Integrations() {
  const sectionRef = useRef(null);

  const items = [
    { title: 'Exportação de relatórios', desc: 'PDF/CSV para validações e auditoria.' },
    { title: 'Histórico consolidado', desc: 'Organização por período e filtros rápidos.' },
    { title: 'Permissões por perfil', desc: 'Acesso por papel (aluno, supervisor, instituição).' },
    { title: 'Integrações sob demanda', desc: 'Conecte com seus sistemas quando fizer sentido.' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      section.querySelectorAll?.('[data-in]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      const kicker = q('[data-in="kicker"]');
      const title = q('[data-in="title"]');
      const desc = q('[data-in="desc"]');
      const pills = q('[data-in="pills"] > *');
      const cards = q('[data-in="cards"] > *');

      const enterEls = [kicker, title, desc, pills, cards].flat().filter(Boolean);

      gsap.set(enterEls, { autoAlpha: 0, y: 14, force3D: true });
      gsap.set(title, { y: 18 });
      gsap.set(cards, { y: 18 });

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
        .to(pills, { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.05 }, 0.42)
        .to(cards, { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.06 }, 0.50);

      tl.to(enterEls, { autoAlpha: 0, y: -10, duration: 0.22, stagger: 0.012, ease: 'power2.in' }, 0.90);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full  px-6 lg:px-10 py-20 lg:py-64 grid grid-cols-12 gap-12 lg:gap-20 items-start  h-[100vh]"
      data-section="integrations"
    >
      <div className="flex flex-col text-left gap-10  items-start justify-start  col-span-7">
        <div className="max-w-4xl">
          <p
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 font-medium"
            data-in="kicker"
          >
            <span className="h-1 w-1 rounded-full bg-gray-500" />
            Integrações
          </p>

          <h2 className="mt-5 text-5xl sm:text-6xl leading-[0.95] font-regular text-primary" data-in="title">
            Pronto para
            <br />
            <span className="font-extrabold">encaixar</span>
            <br />
            no seu processo.
          </h2>

          <p className="mt-6 text-sm sm:text-base font-light text-gray-700 leading-relaxed" data-in="desc">
            Comece simples e evolua. Onde precisar, conectamos com o que você já usa e mantemos o fluxo consistente.
          </p>
        </div>

        <div className="flex flex-wrap gap-2" data-in="pills">
          {['PDF', 'CSV', 'Painel Web', 'App Mobile'].map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-black/10 bg-white/40 px-4 py-2 text-xs font-medium text-gray-700 backdrop-blur-sm transition-colors hover:bg-white/50"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-4 grid-cols-2  col-span-5" data-in="cards">
        {items.map((i) => (
          <div
            key={i.title}
            className="rounded-2xl border border-black/10 bg-white/40 backdrop-blur-sm p-6 transition-colors hover:bg-white/50"
          >
            <p className="text-sm font-semibold text-gray-900">{i.title}</p>
            <p className="mt-2 text-sm font-light text-gray-700 leading-relaxed">{i.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

