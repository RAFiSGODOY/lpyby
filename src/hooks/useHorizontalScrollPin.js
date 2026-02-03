import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Horizontal scroll “pinned” controlado pelo scroll vertical.
 * Desktop: fixa a seção e move o "track" para a esquerda conforme o scroll.
 * Mobile / reduced-motion: desativa (layout vertical normal).
 *
 * @param {React.RefObject<HTMLElement>} sectionRef
 * @param {React.RefObject<HTMLElement>} trackRef
 * @param {Object} options
 * @param {number} [options.enabledMinWidth=1024] - largura mínima (px) para ativar
 * @param {number} [options.scrub=1] - suavidade do scrub
 * @param {string} [options.start='top top'] - início do ScrollTrigger
 */
export function useHorizontalScrollPin(sectionRef, trackRef, options = {}) {
    const {
        enabledMinWidth = 1024,
        scrub = 1,
        start = 'top top'
    } = options;

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        const enabled = !prefersReducedMotion && window.innerWidth >= enabledMinWidth;

        if (!enabled) {
            // Garante estado “normal” caso o trigger tenha existido antes
            gsap.set(track, { clearProps: 'transform' });
            return;
        }

        const ctx = gsap.context(() => {
            const getDistance = () => {
                const width = Math.max(
                    track.scrollWidth || 0,
                    track.getBoundingClientRect?.().width || 0
                );
                return Math.max(0, width - window.innerWidth);
            };

            gsap.to(track, {
                x: () => -getDistance(),
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start,
                    end: () => `+=${getDistance()}`,
                    scrub,
                    pin: true,
                    anticipatePin: 0,
                    // 'fixed' evita “deriva” vertical durante o scrub (comum em Win/subpixel)
                    pinType: 'fixed',
                    invalidateOnRefresh: true
                }
            });
        }, section);

        // Mantém o "end" correto mesmo quando imagens carregam e mudam o scrollWidth
        let rafId = 0;
        const safeRefresh = () => {
            if (rafId) return;
            rafId = window.requestAnimationFrame(() => {
                rafId = 0;
                ScrollTrigger.refresh();
            });
        };

        const handleResize = () => safeRefresh();
        window.addEventListener('resize', handleResize);
        window.addEventListener('load', safeRefresh);

        let ro = null;
        if (typeof ResizeObserver !== 'undefined') {
            ro = new ResizeObserver(() => safeRefresh());
            ro.observe(track);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('load', safeRefresh);
            if (ro) ro.disconnect();
            if (rafId) window.cancelAnimationFrame(rafId);
            ctx.revert();
        };
    }, [sectionRef, trackRef, enabledMinWidth, scrub, start]);
}

