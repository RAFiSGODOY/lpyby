import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook customizado para animar o desenho de um SVG path durante o scroll
 * @param {React.RefObject} svgRef - Referência para o elemento SVG container
 * @param {React.RefObject} pathRef - Referência para o elemento path do SVG
 * @param {Object} options - Opções de configuração da animação
 * @param {string} options.start - Posição de início do ScrollTrigger (padrão: 'top 80%')
 * @param {string} options.end - Posição de fim do ScrollTrigger (padrão: 'bottom 20%')
 * @param {number} options.scrub - Valor do scrub para suavidade (padrão: 1)
 */
export function useSvgDrawAnimation(svgRef, pathRef, options = {}) {
    const {
        start = 'top 80%',
        end = 'bottom 20%',
        scrub = 1
    } = options;

    useEffect(() => {
        const path = pathRef.current;
        const svg = svgRef.current;
        
        if (!path || !svg) return;

        // Calcular o comprimento total do path
        const pathLength = path.getTotalLength();
        
        // Configurar o path para animação
        gsap.set(path, {
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength
        });

        // Criar animação com ScrollTrigger
        const animation = gsap.to(path, {
            strokeDashoffset: 0,
            ease: 'none',
            scrollTrigger: {
                trigger: svg,
                start: start,
                end: end,
                scrub: scrub,
            }
        });

        // Garantir que a linha seja completamente desenhada quando a animação terminar
        ScrollTrigger.create({
            trigger: svg,
            start: end,
            onEnter: () => {
                gsap.set(path, { strokeDashoffset: 0 });
            },
            once: true
        });

        // Cleanup
        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === svg) {
                    trigger.kill();
                }
            });
        };
    }, [svgRef, pathRef, start, end, scrub]);
}
