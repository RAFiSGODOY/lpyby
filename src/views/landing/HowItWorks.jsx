import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function HowItWorks() {
  const sectionRef = useRef(null);

  const steps = [
    {
      n: '01',
      title: 'Configure a operação',
      desc: 'Instituição, usuários, regras e permissões. Você define o essencial e o YBY se adapta ao seu fluxo.',
      tags: ['Painel Web', 'Perfis e permissões', 'Regras por instituição']
    },
    {
      n: '02',
      title: 'Registre e acompanhe',
      desc: 'O usuário registra pelo app com feedback imediato. No painel, você acompanha status, progresso e histórico em tempo real.',
      tags: ['App Mobile', 'Status', 'Histórico rastreável']
    },
    {
      n: '03',
      title: 'Relate e valide',
      desc: 'Relatórios e exportações com rastreabilidade para validação e auditoria quando necessário.',
      tags: ['Relatórios', 'Exportação', 'Auditoria']
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      section.querySelectorAll?.('[data-hi]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      const kicker = q('[data-hi="kicker"]');
      const title = q('[data-hi="title"]');
      const desc = q('[data-hi="desc"]');
      const stepsEls = q('[data-hi="steps"] > *');
      const cta = q('[data-hi="cta"]');

      const enterEls = [kicker, title, desc, stepsEls, cta].flat().filter(Boolean);

      gsap.set(enterEls, { autoAlpha: 0, y: 14, force3D: true });
      gsap.set(title, { y: 18 });
      gsap.set(stepsEls, { y: 18 });

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
        .to(stepsEls, { autoAlpha: 1, y: 0, duration: 0.22, stagger: 0.06 }, 0.42)
        .to(cta, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.60);

      tl.to(enterEls, { autoAlpha: 0, y: -10, duration: 0.22, stagger: 0.015, ease: 'power2.in' }, 0.90);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative" data-section="how-it-works">
      <div className="mx-auto w-full  px-6 lg:px-10 py-20 lg:pb-64 ">
        <div className="flex flex-col items-center gap-12">
          <div className="w-full max-w-3xl text-center">
            <p
              className="inline-flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-gray-500 font-medium"
              data-hi="kicker"
            >
              <span className="h-1 w-1 rounded-full bg-gray-500" />
              Como funciona
            </p>

            <h2 className="mt-5 text-5xl sm:text-6xl leading-[0.98] font-regular text-primary" data-hi="title">
              Do setup à
             
              supervisão,
              <br />
              <span className="font-extrabold">sem fricção</span>.
            </h2>

            <p className="mt-6 text-sm sm:text-base font-light text-gray-700 leading-relaxed mx-auto max-w-xl" data-hi="desc">
              Um fluxo enxuto para começar rápido, manter consistência e ganhar previsibilidade na rotina — com mobile e web integrados.
            </p>
          </div>

          <div className="w-full max-w-5xl">
            <div className="divide-y divide-black/10 border-y border-black/10" data-hi="steps">
              {steps.map((s) => (
                <article key={s.n} className="py-8">
                  <div className="grid gap-6 sm:grid-cols-[160px_1fr] sm:items-start">
                    <div className="flex items-baseline gap-4">
                      <span className="text-5xl sm:text-6xl leading-none font-extrabold text-primary">{s.n}</span>
                      <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">Passo</span>
                    </div>

                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">{s.title}</h3>
                      <p className="mt-3 text-sm sm:text-base font-light text-gray-700 leading-relaxed">{s.desc}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {s.tags.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center rounded-full border border-black/10 bg-white/40 px-3 py-1.5 text-xs font-medium text-gray-700 backdrop-blur-sm"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div
              className="mt-10 flex flex-col gap-4 flex-row sm:items-center sm:justify-between bg-white/40 px-6 py-6"
              data-hi="cta"
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">Tempo de implantação</p>
                <p className="mt-2 text-lg sm:text-xl font-extrabold text-gray-900">Menos de 48h (com onboarding guiado)</p>
              </div>

              <a
                href="#planos"
                className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 hover:scale-102 transition-all duration-300 text-base font-semibold text-white transition hover:bg-primary-dark"
              >
                Testar Gratuitamente agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}