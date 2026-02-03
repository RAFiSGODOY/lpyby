import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SocialProof() {
  const sectionRef = useRef(null);

  const pills = ['Implantação guiada', 'Adoção rápida', 'Histórico rastreável', 'Mobile + Web'];

  const stats = [
    { k: 'Implantação', v: '48h', d: 'Onboarding guiado' },
    { k: 'Adoção', v: '7 dias', d: 'Ritmo no mobile' },
    { k: 'Visibilidade', v: 'Tempo real', d: 'Progresso e status' }
  ];

  const highlights = [
    { k: 'Menos atrito', v: 'Fluxos diretos e rápidos' },
    { k: 'Mais controle', v: 'Visão consolidada e detalhada' },
    { k: 'Conformidade', v: 'Rastreabilidade para validação' },
    { k: 'Escala', v: 'Planos por aluno e operação' }
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      // Garante estado visível e sem transforms
      section.querySelectorAll?.('[data-sp]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      const kicker = q('[data-sp="kicker"]');
      const title = q('[data-sp="title"]');
      const desc = q('[data-sp="desc"]');
      const pillsEl = q('[data-sp="pills"]');
      const statsCards = q('[data-sp="stats"] > *');
      const highlightItems = q('[data-sp="highlights"] > *');
      const footer = q('[data-sp="footer"]');

      const enterEls = [kicker, title, desc, pillsEl, statsCards, highlightItems, footer].flat().filter(Boolean);

      // Estado inicial: “fora”
      gsap.set(enterEls, { autoAlpha: 0, y: 14, force3D: true });
      gsap.set(title, { y: 18 });
      gsap.set(statsCards, { y: 18 });
      gsap.set(highlightItems, { y: 16 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 20%',
          end: 'bottom 25%',
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });

      // ENTRA: concentrado no início do scroll da seção (0–28%) para o efeito ser visto ao entrar
      tl.to(kicker, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.04)
        .to(title, { autoAlpha: 1, y: 0, duration: 0.10 }, 0.08)
        .to(desc, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.12)
        .to(pillsEl, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.16)
        .to(statsCards, { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.04 }, 0.18)
        .to(highlightItems, { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.04 }, 0.22)
        .to(footer, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.26);

      // SAI: só nos últimos ~18% do scroll da seção
      tl.to(enterEls, { autoAlpha: 0, y: -10, duration: 0.18, stagger: 0.012, ease: 'power2.in' }, 0.88);
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden py-24 sm:py-28 lg:py-64 h-[100vh]"
      data-section="social-proof"
      ref={sectionRef}
    >
      {/* respiro extra entre seções */}
      <div className="relative mx-auto w-full  px-6 lg:px-10">
        <div className="grid gap-14 lg:gap-16 lg:grid-cols-12 lg:items-start">
          {/* Texto (grande e editorial) */}
          <div className="lg:col-span-6" data-sp="left">
            <p
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gray-500 font-medium"
              data-sp="kicker"
            >
              <span className="h-1 w-1 rounded-full bg-gray-500" />
              Confiável no dia a dia
            </p>

            <h2
              className="mt-6 text-6xl sm:text-7xl leading-[0.95] font-regular text-primary"
              data-sp="title"
            >
              Rotina com
              <br />
              <span className="font-extrabold">clareza</span> e
              <br />
              <span className="font-extrabold">previsibilidade</span>
            </h2>

            <p className="mt-7 text-sm sm:text-base font-light text-gray-700 leading-relaxed max-w-xl" data-sp="desc">
              O YBY organiza o fluxo de registros e acompanhamento com visual limpo e dados confiáveis — reduzindo ruído operacional e facilitando
              validações.
            </p>

            <div className="mt-9 flex flex-wrap gap-2" data-sp="pills">
              {pills.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-black/10 bg-white/45 px-4 py-2 text-xs font-medium text-gray-700 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Destaques / “prova” */}
          <div className="lg:col-span-6" data-sp="right">
            <div className="grid gap-3 sm:grid-cols-3" data-sp="stats">
              {stats.map((s) => (
                <div key={s.k} className="rounded-2xl border border-black/10 bg-white/45 px-5 py-5">
                  <p className="text-xs uppercase tracking-widest text-gray-500">{s.k}</p>
                  <p className="mt-2 text-3xl font-extrabold text-gray-900">{s.v}</p>
                  <p className="mt-1 text-xs text-gray-600">{s.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2" data-sp="highlights">
              {highlights.map((c) => (
                <div key={c.k} className="border-l-4 border-primary pl-5">
                  <p className="text-xs uppercase tracking-widest text-gray-500">{c.k}</p>
                  <p className="mt-2 text-sm font-semibold text-gray-900">{c.v}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-7" data-sp="footer">
              <p className="text-xs uppercase tracking-widest text-gray-500">Pronto para mostrar o valor em poucos dias</p>
              <div className="h-[2px] w-24 bg-gradient-primary-horizontal opacity-60" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

