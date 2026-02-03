import { useEffect, useMemo, useState } from 'react';

export default function AboutHeroPanel() {
    const phrases = useMemo(
        () => ['que fazem a diferença.', 'que mudam o dia a dia.', 'que simplificam a gestão.'],
        []
    );

    const [phraseIdx, setPhraseIdx] = useState(0);
    const [charCount, setCharCount] = useState(0);
    const [phase, setPhase] = useState('typing'); // typing | waiting | deleting

    const maxLen = useMemo(() => Math.max(...phrases.map((p) => p.length)), [phrases]);
    const currentPhrase = phrases[phraseIdx] ?? '';
    const typed = currentPhrase.slice(0, charCount);

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
        if (prefersReducedMotion) {
            setPhraseIdx(0);
            setCharCount((phrases[0] ?? '').length);
            setPhase('typing');
            return;
        }

        const TYPE_SPEED = 120;
        const DELETE_SPEED = 55;
        const HOLD_MS = 1600;
        const NEXT_DELAY = 320;

        let timeoutId;

        if (phase === 'typing') {
            if (charCount < currentPhrase.length) {
                timeoutId = window.setTimeout(() => setCharCount((v) => v + 1), TYPE_SPEED);
            } else {
                timeoutId = window.setTimeout(() => setPhase('deleting'), HOLD_MS);
            }
        } else if (phase === 'deleting') {
            if (charCount > 0) {
                timeoutId = window.setTimeout(() => setCharCount((v) => v - 1), DELETE_SPEED);
            } else {
                setPhraseIdx((v) => (v + 1) % phrases.length);
                setPhase('waiting');
            }
        } else if (phase === 'waiting') {
            timeoutId = window.setTimeout(() => setPhase('typing'), NEXT_DELAY);
        }

        return () => window.clearTimeout(timeoutId);
    }, [phrases, phraseIdx, currentPhrase.length, charCount, phase]);

    return (
        <div className="about-panel aboutHero-panel mt-0">
            <div className="about-panelInner mx-auto w-full max-w-7xl px-6 lg:px-10">
                <div className="flex">
                    <div className="text-center mx-auto flex flex-col items-center justify-center mt-4">
                        <div className="aboutHero-kickerRow">
                            <p className="font-medium tracking-widest uppercase text-gray-500 text-sm">PAINEL WEB </p>
                            <span className="w-1 h-1 bg-gray-500 rounded-full" />
                            <p className="font-medium tracking-widest uppercase text-gray-500 text-sm"> APP mobile</p>
                        </div>

                        <h2 className="text-7xl font-regular  text-primary">
                            <span className="font-extrabold">Funcionalidades </span> <br />
                            <span className=" text-7xl font-regular justify-center items-center text-primary">
                                <span
                                    className="aboutHero-typeText "
                                    style={{ minWidth: `${maxLen}ch` }}
                                >
                                    <span className="aboutHero-typeActual ">{typed}</span>
                                    <span className="aboutHero-typeCaret" aria-hidden="true" />
                                </span>
                            </span>
                        </h2>


                        <p className="aboutHero-subtitle text-gray-500">
                           A seguir algumas das funcionalidades do nosso sistema. App mobile rápido para o dia a dia e um painel web completo para supervisão, relatórios e insights — tudo com a mesma
                            experiência premium.
                        </p>

                    </div>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-[1px] bg-gray-500 opacity-60" />
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-gray-500 animate-pulse"
                        >
                            <path
                                d="M9 6L15 12L9 18"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="w-12 h-[1px] bg-gray-500 opacity-60" />
                    </div>
                    <p className="text-gray-500 text-xs uppercase font-medium tracking-widest opacity-80">
                        Scroll para o lado
                    </p>
                </div>
            </div>
        </div>
    );
}

