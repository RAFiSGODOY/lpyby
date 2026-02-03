import ArrowRight from '../../../assets/icons/arrow-forward-outline.svg';

export function CheckIcon() {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
            aria-hidden="true"
        >
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

export function PanelShell({ children }) {
    return (
        <div className="about-panel">
            <div className="about-panelInner mx-auto w-full max-w-6xl px-6 lg:px-10">{children}</div>
        </div>
    );
}

export function MediaImage({ src, alt, className = '' }) {
    return <img src={src} alt={alt} className={`mx-auto h-auto object-contain ${className}`} loading="lazy" />;
}

export function PrimaryCta({ children }) {
    return (
        <button className="aboutHero-ctaPrimary rounded-full px-8 py-3 text-sm font-bold uppercase tracking-wide transition-opacity">
            {children}
        </button>
    );
}

export function SecondaryCta({ children }) {
    return (
        <span className="aboutHero-ctaSecondary text-sm ml-2 flex items-center gap-2 cursor-pointer rounded-full px-8 py-3 transition-opacity group">
            {children}
            <img src={ArrowRight} alt="Arrow Right" className="w-5 h-5 transition-transform duration-300 ease-out group-hover:translate-x-2" />
        </span>
    );
}

export function TwoColPanel({
    kicker,
    title,
    description,
    bullets,
    cards,
    media,
    reverse = false,
    align = 'left',
    cta
}) {
    const textAlign = align === 'right' ? 'text-right' : 'text-left';
    const wrapperOrder = reverse ? 'order-2 lg:order-1' : '';
    const mediaOrder = reverse ? 'order-1 lg:order-2' : '';

    return (
        <PanelShell>
            <div className="grid items-center gap-10 lg:grid-cols-2">
                <div className={`relative mx-auto w-full max-w-md lg:max-w-none ${mediaOrder}`}>
                    <div className="about-mockupFrame relative">{media}</div>
                </div>

                <div className={`${wrapperOrder} ${textAlign}`}>
                    <p
                        className={`inline-flex items-center gap-2 text-xs font-medium text-primary uppercase tracking-widest ${align === 'right' ? 'justify-end' : ''}`}
                    >
                        <span className="about-pillDot h-1.5 w-1.5 rounded-full" />
                        {kicker}
                    </p>
                    <h3 className={`mt-4 text-3xl sm:text-4xl font-regular text-gray-900 leading-tight ${textAlign}`}>{title}</h3>
                    <p className={`mt-4 text-gray-700 text-sm sm:text-base font-light leading-relaxed ${textAlign}`}>{description}</p>

                    {bullets?.length ? (
                        <ul className={`mt-6 space-y-3 text-sm text-gray-700 ${align === 'right' ? 'ml-auto' : ''}`}>
                            {bullets.map((b) => (
                                <li key={b} className={`flex gap-3 ${align === 'right' ? 'flex-row-reverse' : ''}`}>
                                    <span className="mt-0.5 text-primary">
                                        <CheckIcon />
                                    </span>
                                    {b}
                                </li>
                            ))}
                        </ul>
                    ) : null}

                    {cards?.length ? (
                        <div className="mt-8 grid gap-4 sm:grid-cols-2">
                            {cards.map((c) => (
                                <div key={c.title} className="about-card rounded-2xl p-5">
                                    <p className="text-sm font-semibold text-gray-900">{c.title}</p>
                                    <p className="mt-2 text-xs sm:text-sm font-light text-gray-600 leading-relaxed">{c.description}</p>
                                </div>
                            ))}
                        </div>
                    ) : null}

                    {cta ? <div className={`mt-8 flex flex-wrap gap-3 ${align === 'right' ? 'justify-end' : ''}`}>{cta}</div> : null}
                </div>
            </div>
        </PanelShell>
    );
}

