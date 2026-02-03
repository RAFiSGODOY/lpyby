import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQS = [
  {
    q: 'Funciona offline?',
    a: 'Sim. Você pode registrar offline e sincronizar quando a conexão voltar (conforme configuração da operação).'
  },
  {
    q: 'Quanto tempo para implantar?',
    a: 'Normalmente em menos de 48h com onboarding guiado e configuração alinhada à sua rotina.'
  },
  {
    q: 'O preço é por aluno?',
    a: 'Sim. Os planos se ajustam conforme a quantidade de alunos (e há opção sob consulta para cenários específicos).'
  },
  {
    q: 'Dá para exportar relatórios?',
    a: 'Sim. Relatórios e histórico podem ser exportados para apoiar validações e auditoria.'
  }
];

function PlusIcon({ className = '' }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M12 5v14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function FAQ() {
  const sectionRef = useRef(null);
  const [openIdx, setOpenIdx] = useState(-1);

  // refs para animação do accordion (altura + fade + ícone)
  const contentWrapRefs = useRef([]);
  const contentInnerRefs = useRef([]);
  const iconRefs = useRef([]);

  const ids = useMemo(() => FAQS.map((_, i) => `faq-item-${i}`), []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      section.querySelectorAll?.('[data-fq]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      const kicker = q('[data-fq="kicker"]');
      const title = q('[data-fq="title"]');
      const desc = q('[data-fq="desc"]');
      const items = q('[data-fq="items"] > *');

      const enterEls = [kicker, title, desc, items].flat().filter(Boolean);

      gsap.set(enterEls, { autoAlpha: 0, y: 14, force3D: true });
      gsap.set(title, { y: 18 });
      gsap.set(items, { y: 18 });

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          end: 'bottom 18%',
          scrub: 1.2,
          invalidateOnRefresh: true
        }
      });

      tl.to(kicker, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.04)
        .to(title, { autoAlpha: 1, y: 0, duration: 0.10 }, 0.08)
        .to(desc, { autoAlpha: 1, y: 0, duration: 0.08 }, 0.12)
        .to(items, { autoAlpha: 1, y: 0, duration: 0.16, stagger: 0.05 }, 0.16);

      tl.to(enterEls, { autoAlpha: 0, y: -10, duration: 0.18, stagger: 0.012, ease: 'power2.in' }, 0.88);
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    // Estado inicial: tudo fechado
    contentWrapRefs.current.forEach((wrap, i) => {
      if (!wrap) return;
      const inner = contentInnerRefs.current[i];
      gsap.set(wrap, { height: 0 });
      if (inner) gsap.set(inner, { autoAlpha: 0, y: -6 });
    });
    iconRefs.current.forEach((ico) => ico && gsap.set(ico, { rotate: 0 }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    contentWrapRefs.current.forEach((wrap, i) => {
      if (!wrap) return;

      const inner = contentInnerRefs.current[i];
      const ico = iconRefs.current[i];
      const isOpen = i === openIdx;

      gsap.killTweensOf([wrap, inner, ico].filter(Boolean));

      if (isOpen) {
        // abre
        gsap.to(ico, { rotate: 45, duration: 0.22, ease: 'power2.out' });
        gsap.to(wrap, { height: 'auto', duration: 0.32, ease: 'power2.out' });
        gsap.to(inner, { autoAlpha: 1, y: 0, duration: 0.22, ease: 'power2.out', delay: 0.06 });
      } else {
        // fecha
        gsap.to(ico, { rotate: 0, duration: 0.18, ease: 'power2.out' });
        gsap.to(inner, { autoAlpha: 0, y: -6, duration: 0.14, ease: 'power2.in' });
        gsap.to(wrap, { height: 0, duration: 0.26, ease: 'power2.inOut', delay: 0.04 });
      }
    });
  }, [openIdx]);

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="mx-auto w-full px-6 lg:px-10 py-20 lg:py-24 h-[100vh]"
      data-section="faq"
    >
      <div className="max-w-3xl">
        <p
          className="inline-flex items-center gap-2 text-sm uppercase tracking-widest text-gray-500 font-medium"
          data-fq="kicker"
        >
          <span className="h-1 w-1 rounded-full bg-gray-500" />
          FAQ
        </p>

        <h2 className="mt-5 text-5xl sm:text-6xl leading-[0.95] font-regular text-primary" data-fq="title">
          Perguntas
          <br />
          <span className="font-extrabold">frequentes</span>
        </h2>

        <p className="mt-6 text-sm sm:text-base font-light text-gray-700 leading-relaxed" data-fq="desc">
          Respostas rápidas para as dúvidas mais comuns.
        </p>
      </div>

      <div className="mt-12 grid gap-3" data-fq="items">
        {FAQS.map((f, i) => {
          const isOpen = i === openIdx;
          const panelId = `${ids[i]}-panel`;
          const buttonId = `${ids[i]}-button`;

          return (
            <div
              key={f.q}
              className={[
                'group rounded-2xl border border-black/10 bg-white/40 backdrop-blur-sm',
                'transition-colors',
                isOpen ? 'bg-white/55' : 'hover:bg-white/50'
              ].join(' ')}
            >
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIdx((cur) => (cur === i ? -1 : i))}
                className={[
                  'w-full text-left px-6 py-5',
                  'flex items-start justify-between gap-6 cursor-pointer',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent'
                ].join(' ')}
              >
                <span className="min-w-0">
                  <span className="block text-sm sm:text-base font-semibold text-gray-900 leading-snug">{f.q}</span>
                  <span className="mt-1 block text-xs text-gray-300 tracking-wide uppercase">Clique para ver a resposta</span>
                </span>

                <span
                  className={[
                    'shrink-0 grid place-items-center h-10 w-10 rounded-full',
                    ' bg-white/45 text-gray-700',
                    'transition-colors',
                    isOpen ? 'bg-white/65' : 'group-hover:bg-white/55'
                  ].join(' ')}
                >
                  <span ref={(el) => (iconRefs.current[i] = el)} className="block will-change-transform">
                    <PlusIcon className="block" />
                  </span>
                </span>
              </button>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                ref={(el) => (contentWrapRefs.current[i] = el)}
                className="overflow-hidden px-6"
                style={
                  // sem animação quando reduced-motion: abre/fecha instantaneamente
                  window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches
                    ? { height: isOpen ? 'auto' : 0 }
                    : undefined
                }
              >
                <div
                  ref={(el) => (contentInnerRefs.current[i] = el)}
                  className="pb-6"
                  aria-hidden={!isOpen}
                >
                  <div className="pt-1">
                    <p className="text-sm sm:text-[15px] font-light text-gray-700 leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

