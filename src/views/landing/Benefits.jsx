import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Benefits() {
  const sectionRef = useRef(null);

  const benefits = [
    {
      title: 'Menos retrabalho',
      desc: 'Rotina clara para registros e validações, sem depender de planilhas e papel.'
    },
    {
      title: 'Dados confiáveis',
      desc: 'Histórico e rastreabilidade para auditoria e conferência rápida.'
    },
    {
      title: 'Acompanhamento simples',
      desc: 'Progresso em tempo real e visão consolidada para supervisão.'
    },
    {
      title: 'Experiência premium',
      desc: 'Mobile rápido para o dia a dia e painel web completo para gestão.'
    }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      section.querySelectorAll?.('[data-bf]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      const kicker = q('[data-bf="kicker"]');
      const title = q('[data-bf="title"]');
      const desc = q('[data-bf="desc"]');
      const callout = q('[data-bf="callout"]');
      const cards = q('[data-bf="cards"] > *');

      const enterEls = [kicker, title, desc, callout, cards].flat().filter(Boolean);

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
        .to(callout, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.42)
        .to(cards, { autoAlpha: 1, y: 0, duration: 0.2, stagger: 0.06 }, 0.48);

      tl.to(enterEls, { autoAlpha: 0, y: -10, duration: 0.22, stagger: 0.015, ease: 'power2.in' }, 0.90);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full  px-6 lg:px-10 py-16 lg:py-64 h-[100vh]"
      data-section="benefits"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
        {/* Texto grande (diferente da seção anterior) */}
        <div className="lg:col-span-5">
          <p
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 font-medium"
            data-bf="kicker"
          >
            <span className="h-1 w-1 rounded-full bg-gray-500" />
            Benefícios
          </p>
          <h3 className="mt-5 text-5xl sm:text-6xl leading-[0.95] font-regular text-primary" data-bf="title">
            Menos ruído.
            <br />
            <span className="font-extrabold">Mais rotina</span>.
          </h3>
          <p className="mt-6 text-sm sm:text-base font-light text-gray-700 leading-relaxed max-w-md" data-bf="desc">
            Não é só “mais uma ferramenta”. É um fluxo desenhado para reduzir atrito, deixar os dados claros e manter a operação andando.
          </p>

          <div className="mt-10 border-t border-black/10 pt-6" data-bf="callout">
            <p className="text-xs uppercase tracking-widest text-gray-500">
              Resultado prático: menos retrabalho e mais previsibilidade
            </p>
          </div>
        </div>

        {/* Trilha (linha) */}
        <div className="lg:col-span-7">
          <div className="relative">
            <div className="grid grid-cols-2 gap-2" data-bf="cards">
              {benefits.map((b, idx) => (
                <div
                  key={b.title}
                  className="relative pl-12 pr-2 py-1"
                >
                  <div className=" rounded-2xl border border-black/10 bg-white/40 backdrop-blur-sm px-6 py-5  transition-transform duration-300 hover:scale-[1.01]">
                    <div className="flex items-start justify-between gap-4">
                      <div className="w-100">
                        <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                          {String(idx + 1).padStart(2, '0')}
                        </p>
                        <p className="mt-2 text-lg font-semibold text-gray-900">{b.title}</p>
                      </div>
                      
                    </div>
                    <p className="mt-2 text-sm font-light text-gray-700 leading-relaxed max-w-xl">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

