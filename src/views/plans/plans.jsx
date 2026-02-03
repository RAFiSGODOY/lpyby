
import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './plans.css';

gsap.registerPlugin(ScrollTrigger);

function FeatureIcon({ included }) {
  if (included) {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-primary">
        <path
          d="M20 6L9 17L4 12"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="shrink-0 text-red-500">
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Plans() {
  const sectionRef = useRef(null);
  const plans = useMemo(
    () => [
      {
        id: 'profissional',
        name: 'Profissional',
        price: 'R$ 1,25',
        unit: '/aluno',
        badge: null,
        note: 'Incluso no plano',
        features: [
          { text: 'Até 500 alunos', included: true },
          { text: 'Registro de ponto offline', included: true },
          { text: 'Relatório de registros via aplicativo mobile', included: true },
          { text: 'Relatório de registros via painel de controle', included: true },
          { text: 'Suporte em horário comercial', included: true }
        ]
      },
      {
        id: 'padrao',
        name: 'Padrão',
        price: 'R$ 1,50',
        unit: '/aluno',
        badge: '30 dias grátis',
        note: 'Incluso no plano',
        features: [
          { text: 'Até 100 alunos', included: true },
          { text: 'Registro de ponto offline', included: false },
          { text: 'Relatório de registros via aplicativo mobile', included: false },
          { text: 'Relatório de registros via painel de controle', included: true },
          { text: 'Suporte em horário comercial', included: true }
        ]
      },
      {
        id: 'customizado',
        name: 'Customizado',
        price: 'sob consulta',
        unit: '',
        badge: null,
        note: 'Incluso no plano',
        features: [
          { text: 'Planos e limites sob consulta', included: true },
          { text: 'Registro de ponto offline', included: true },
          { text: 'Relatório de registros via aplicativo mobile', included: true },
          { text: 'Relatório de registros via painel de controle', included: true },
          { text: 'Suporte em horário comercial', included: true }
        ]
      }
    ],
    []
  );

  const [active, setActive] = useState(1); // Padrão como default
  const n = plans.length;

  const go = (dir) => setActive((i) => (i + dir + n) % n);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % n);
    }, 6000);

    return () => window.clearInterval(id);
  }, [n]);

  const handleSelect = () => {
    // Mantém simples por enquanto (pode plugar checkout/contato depois)
    const el = document.getElementById('contato');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (prefersReducedMotion) {
      section.querySelectorAll?.('[data-pl]').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);

      const kicker = q('[data-pl="kicker"]');
      const title = q('[data-pl="title"]');
      const desc = q('[data-pl="desc"]');
      const ctas = q('[data-pl="ctas"]');
      const carousel = q('[data-pl="carousel"]');
      const dots = q('[data-pl="dots"]');

      const enterEls = [kicker, title, desc, ctas, carousel, dots].flat().filter(Boolean);

      gsap.set(enterEls, { autoAlpha: 0, y: 14, force3D: true });
      gsap.set(title, { y: 18 });
      gsap.set(carousel, { y: 18 });

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
        .to(ctas, { autoAlpha: 1, y: 0, duration: 0.14 }, 0.42)
        .to(carousel, { autoAlpha: 1, y: 0, duration: 0.22 }, 0.50)
        .to(dots, { autoAlpha: 1, y: 0, duration: 0.12 }, 0.60);

      tl.to(enterEls, { autoAlpha: 0, y: -10, duration: 0.22, stagger: 0.012, ease: 'power2.in' }, 0.90);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="w-full flex flex-col justify-center items-center min-h-[900px] py-20 lg:py-24"
      data-section="plans"
    >
      <div className="mx-auto w-full  px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Coluna esquerda (texto) */}
          <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 mb-2 font-medium tracking-widest uppercase text-gray-500 text-sm" data-pl="kicker">
              <span className=" h-1 w-1 rounded-full bg-gray-500" />
              Planos Mensais
            </p>
            <h2 className="text-7xl font-regular  text-primary" data-pl="title">
              Planos que crescem
              <br />
              <span className="font-extrabold">com você</span>
            </h2>

            <p className="mt-6 text-sm sm:text-base font-light text-gray-700 leading-relaxed " data-pl="desc">
              Escolha o modelo ideal para o seu momento.
              <br />
              Os valores se ajustam <span className="font-semibold">conforme a quantidade</span><br />  de alunos.
            </p>
            <div className="flex items-center gap-5 mt-8" data-pl="ctas">
              <p className="text-md text-gray-500">Dúvidas?</p>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('contato');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className=" inline-flex bg-primary rounded-full px-6 py-3 text-sm font-semibold text-white cursor-pointer transition-all duration-300 hover:scale-102 "
              >
                Fale conosco <span aria-hidden="true">→</span>
              </button>
            </div>

          </div>

          {/* Coluna direita (carrossel) */}
          <div className="relative" data-pl="carousel">
            <div className="relative mx-auto h-[520px] w-full max-w-[820px]">
              {plans.map((plan, idx) => {
                let offset = (idx - active + n) % n;
                if (offset > n / 2) offset -= n; // vira -1,0,1...

                const isActive = offset === 0;
                const isNeighbor = Math.abs(offset) === 1;
                if (!isActive && !isNeighbor) return null;

                const x = offset * 280;
                const scale = isActive ? 1 : 0.92;
                const opacity = isActive ? 1 : 0.22;
                const blur = isActive ? 0 : 1.5;
                const zIndex = isActive ? 40 : 10;
                const y = isActive ? -10 : 0;

                return (
                  <div
                    key={plan.id}
                    className="absolute left-1/2 top-0 w-[300px] sm:w-[340px]"
                    style={{
                      transform: `translateX(calc(-50% + ${x}px)) translateY(${y}px) scale(${scale})`,
                      opacity,
                      filter: `blur(${blur}px)`,
                      zIndex,
                      transition: 'transform 420ms ease, opacity 420ms ease, filter 420ms ease'
                    }}
                  >
                    <div className="relative">
                      <div className={`planCardFrame ${isActive ? 'planCardFrameActive' : ''}`}>


                        <div className="relative p-6 pl-7">
                          <div className="flex items-center justify-between gap-4">
                            <div>
                              <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">Plano</p>
                              <p className="mt-1 text-3xl font-semibold text-primary">{plan.name}</p>
                            </div>

                            {plan.badge ? (
                              <span className=" bg-amber-400/95 px-3 py-1 text-xs font-semibold text-white">
                                {plan.badge}
                              </span>
                            ) : null}
                          </div>

                          <div className="mt-5">
                            <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">Preço</p>
                            <div className="mt-2 flex items-end gap-2">
                              {plan.price === 'sob consulta' ? (
                                <p className="text-3xl font-extrabold text-gray-900">sob consulta</p>
                              ) : (
                                <>
                                  <span className="text-primary text-sm font-semibold">R$</span>
                                  <span className="text-5xl leading-none font-extrabold text-gray-900">
                                    {plan.price.replace('R$ ', '')}
                                  </span>
                                  <span className="text-sm text-gray-500">{plan.unit}</span>
                                </>
                              )}
                            </div>
                            <p className="mt-6 text-sm text-primary-dark text-center">{plan.note}</p>
                          </div>

                          <div className="mt-0 h-px w-full bg-black/10 mt-2" />

                          <ul className="mt-5 space-y-3 text-sm text-gray-700">
                            {plan.features.map((f) => (
                              <li key={f.text} className="flex items-start gap-3">
                                <span className="mt-0.5">
                                  <FeatureIcon included={f.included} />
                                </span>
                                <span className={f.included ? '' : 'text-gray-400 line-through'}>{f.text}</span>
                              </li>
                            ))}
                          </ul>

                          <button
                            type="button"
                            onClick={handleSelect}
                            className={`mt-7 w-full cursor-pointer px-5 py-3 text-sm font-semibold transition-all duration-300 hover:scale-102 ${isActive
                                ? 'text-white bg-primary rounded-md'
                                : 'bg-black/5 text-gray-700 hover:bg-black/10'
                              }`}

                          >
                            Selecionar Plano <span aria-hidden="true">→</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Controles */}
              <div className="absolute inset-x-0 -bottom-10 flex items-center justify-center gap-3" data-pl="dots">
              

                <div className="flex items-center gap-2">
                  {plans.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setActive(i)}
                      className={`h-2.5 rounded-full cursor-pointer transition-all duration-300 hover:scale-102 ${i === active ? 'w-6 bg-primary' : 'w-2.5 bg-black/10 hover:bg-black/20'
                        }`}
                      aria-label={`Ir para plano ${p.name}`}
                    />
                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
