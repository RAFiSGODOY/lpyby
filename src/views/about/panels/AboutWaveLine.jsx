import { useEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function buildWavePath({ width, baseline, amplitude, halfWave, startUp = true }) {
    let d = `M0,${baseline}`;
    let x = 0;
    let up = startUp;
    while (x < width) {
        const nextX = Math.min(width, x + halfWave);
        const cx = x + (nextX - x) / 2;
        const cy = baseline + (up ? -amplitude : amplitude);
        d += ` Q${cx},${cy} ${nextX},${baseline}`;
        x = nextX;
        up = !up;
    }
    return d;
}

export default function AboutWaveLine({ sectionRef, trackRef }) {
    const svgRef = useRef(null);
    const corePathRef = useRef(null);
    const [panelsCount, setPanelsCount] = useState(1);

    const view = useMemo(() => {
        const panelWidth = 1000;
        const width = panelsCount * panelWidth;
        return {
            width,
            height: 180
        };
    }, [panelsCount]);

    const paths = useMemo(() => {
        // Camadas levemente diferentes para criar sensação “ribbon / ondas” como na referência
        const base = {
            width: view.width,
            baseline: 92,
            halfWave: 92
        };

        return {
            core: buildWavePath({ ...base, amplitude: 10, halfWave: 86, startUp: true }),
            ribbonA: buildWavePath({ ...base, baseline: 88, amplitude: 18, halfWave: 104, startUp: false }),
            ribbonB: buildWavePath({ ...base, baseline: 98, amplitude: 14, halfWave: 78, startUp: true }),
            mist: buildWavePath({ ...base, baseline: 94, amplitude: 26, halfWave: 126, startUp: false })
        };
    }, [view.width]);

    useEffect(() => {
        const section = sectionRef?.current;
        const track = trackRef?.current;
        const corePath = corePathRef.current;
        const svg = svgRef.current;
        if (!section || !track || !corePath || !svg) return;

        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        const enabled = !prefersReducedMotion && window.innerWidth >= 1024;
        if (!enabled) return;

        // Conta painéis para garantir que a linha vá até o último
        const count = track.querySelectorAll('.about-panel').length || 1;
        if (count !== panelsCount) setPanelsCount(count);

        const getDistance = () => {
            const width = Math.max(track.scrollWidth || 0, track.getBoundingClientRect?.().width || 0);
            return Math.max(0, width - window.innerWidth);
        };

        const ctx = gsap.context(() => {
            const wavePaths = Array.from(svg.querySelectorAll('path[data-wave="true"]'));
            const len = corePath.getTotalLength();
            gsap.set(wavePaths, { strokeDasharray: len, strokeDashoffset: len });

            gsap.to(wavePaths, {
                strokeDashoffset: 0,
                ease: 'none',
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',
                    end: () => `+=${getDistance()}`,
                    scrub: 1,
                    invalidateOnRefresh: true
                }
            });
        }, svg);

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            ctx.revert();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sectionRef, trackRef, panelsCount]);

    return (
        <div className="aboutWave" aria-hidden="true">
            <svg
                ref={svgRef}
                className="aboutWave-svg"
                viewBox={`0 0 ${view.width} ${view.height}`}
                preserveAspectRatio="none"
            >
                <defs>
                    <linearGradient id="aboutWaveCore" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(141, 205, 247, 0.15)" />
                        <stop offset="22%" stopColor="rgba(48, 155, 213, 0.75)" />
                        <stop offset="50%" stopColor="rgba(141, 205, 247, 0.55)" />
                        <stop offset="78%" stopColor="rgba(48, 155, 213, 0.75)" />
                        <stop offset="100%" stopColor="rgba(141, 205, 247, 0.18)" />
                    </linearGradient>

                    <linearGradient id="aboutWaveRibbon" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(141, 205, 247, 0.06)" />
                        <stop offset="30%" stopColor="rgba(48, 155, 213, 0.45)" />
                        <stop offset="70%" stopColor="rgba(48, 155, 213, 0.45)" />
                        <stop offset="100%" stopColor="rgba(141, 205, 247, 0.08)" />
                    </linearGradient>

                    <filter id="aboutWaveBlurA" x="-20%" y="-120%" width="140%" height="340%">
                        <feGaussianBlur stdDeviation="3.5" />
                    </filter>
                    <filter id="aboutWaveBlurB" x="-20%" y="-120%" width="140%" height="340%">
                        <feGaussianBlur stdDeviation="2" />
                    </filter>
                </defs>

                {/* Camada “mist” (bem suave, bem larga) */}
                <path
                    data-wave="true"
                    d={paths.mist}
                    fill="none"
                    stroke="rgba(141, 205, 247, 0.12)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  
                />

                {/* Ribbon A (largura média com blur) */}
                <path
                    data-wave="true"
                    d={paths.ribbonA}
                    fill="none"
                    stroke="url(#aboutWaveRibbon)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                   
                />

                {/* Ribbon B (segunda fita, cruzando) */}
                <path
                    data-wave="true"
                    d={paths.ribbonB}
                    fill="none"
                    stroke="url(#aboutWaveRibbon)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                   
                    style={{ opacity: 1 }}
                />

                {/* Core (linha nítida por cima) */}
                <path
                    ref={corePathRef}
                    data-wave="true"
                    d={paths.core}
                    fill="none"
                    stroke="url(#aboutWaveCore)"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    );
}

