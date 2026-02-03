import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function clamp01(v) {
  return Math.max(0, Math.min(1, v));
}

/**
 * Reveal/Hide de painéis em um track horizontal controlado por scroll vertical.
 * Funciona bem com o pin do `useHorizontalScrollPin` (mesmo trigger/end).
 *
 * Estratégia:
 * - Usa 1 ScrollTrigger no `section` (mesmo end do horizontal)
 * - Mapeia o `progress` global em "segmentos" por painel
 * - Faz fade/translate por painel (sem depender de triggers horizontais)
 *
 * @param {React.RefObject<HTMLElement>} sectionRef
 * @param {React.RefObject<HTMLElement>} trackRef
 * @param {Object} [options]
 * @param {number} [options.enabledMinWidth=1024]
 */
export function useHorizontalPanelsReveal(sectionRef, trackRef, options = {}) {
  const { enabledMinWidth = 1024 } = options;

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    const enabled = !prefersReducedMotion && window.innerWidth >= enabledMinWidth;
    if (!enabled) {
      // Garante visibilidade normal no mobile / reduced-motion
      const inners = track.querySelectorAll?.('.about-panel .about-panelInner') ?? [];
      inners.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.pointerEvents = 'auto';
      });
      return;
    }

    const getDistance = () => {
      const width = Math.max(track.scrollWidth || 0, track.getBoundingClientRect?.().width || 0);
      return Math.max(0, width - window.innerWidth);
    };

    const ctx = gsap.context(() => {
      const inners = Array.from(track.querySelectorAll('.about-panel .about-panelInner'));
      const count = inners.length || 1;
      const seg = 1 / count;

      const setters = inners.map((el) => ({
        el,
        setOpacity: gsap.quickSetter(el, 'opacity'),
        setY: gsap.quickSetter(el, 'y')
      }));

      // Estado inicial: primeiro painel visível, resto oculto
      setters.forEach((s, idx) => {
        gsap.set(s.el, { force3D: true });
        if (idx === 0) {
          s.setOpacity(1);
          s.setY(0);
          s.el.style.pointerEvents = 'auto';
        } else {
          s.setOpacity(0);
          s.setY(18);
          s.el.style.pointerEvents = 'none';
        }
      });

      const update = (globalProgress) => {
        for (let i = 0; i < setters.length; i++) {
          const s = setters[i];
          const start = i * seg;
          const local = clamp01((globalProgress - start) / seg);

          let opacity = 0;
          let y = 18;

          // Painel 1: visível no começo, sai no fim do seu segmento
          if (i === 0) {
            if (local < 0.85) {
              opacity = 1;
              y = 0;
            } else {
              const t = (local - 0.85) / 0.15;
              opacity = 1 - t;
              y = -10 * t;
            }
          }
          // Último painel: entra e permanece até o final
          else if (i === count - 1) {
            if (local < 0.2) {
              const t = local / 0.2;
              opacity = t;
              y = 18 * (1 - t);
            } else {
              opacity = 1;
              y = 0;
            }
          }
          // Painéis do meio: entra, mantém, sai
          else {
            if (local < 0.2) {
              const t = local / 0.2;
              opacity = t;
              y = 18 * (1 - t);
            } else if (local < 0.8) {
              opacity = 1;
              y = 0;
            } else {
              const t = (local - 0.8) / 0.2;
              opacity = 1 - t;
              y = -10 * t;
            }
          }

          s.setOpacity(opacity);
          s.setY(y);
          s.el.style.pointerEvents = opacity > 0.6 ? 'auto' : 'none';
        }
      };

      const st = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${getDistance()}`,
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => update(self.progress)
      });

      // Garante um update inicial consistente
      update(st.progress || 0);
    }, section);

    // Refresh “seguro” quando dimensões mudarem (imagens / resize)
    let rafId = 0;
    const safeRefresh = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        ScrollTrigger.refresh();
      });
    };

    const onResize = () => safeRefresh();
    window.addEventListener('resize', onResize);
    window.addEventListener('load', safeRefresh);

    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => safeRefresh());
      ro.observe(track);
    }

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', safeRefresh);
      if (ro) ro.disconnect();
      if (rafId) window.cancelAnimationFrame(rafId);
      ctx.revert();
    };
  }, [sectionRef, trackRef, enabledMinWidth]);
}

