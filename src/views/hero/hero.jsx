import Bg1 from '../../assets/images/background/back01.png';
import Bg2 from '../../assets/images/background/back02.png';
import Bg3 from '../../assets/images/background/back03.png';
import ArrowRight from '../../assets/icons/arrow-forward-outline.svg';
import MockupHero from '../../assets/images/mobile/TelaInicial.png';


function Hero() {
    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    // Gerar partículas (mantido como estava)
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        animationDuration: Math.random() * 20 + 15,
        animationDelay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.2
    }));

    return (
        <div
            className={[
                'relative overflow-hidden',
                'min-h-[80vh] h-auto',
                'min-[480px]:min-h-[82vh] sm:min-h-[85vh] md:min-h-[88vh]',
                'lg:h-[95vh] lg:min-h-[95vh]',
            ].join(' ')}
        >
            {/* Partículas */}
            <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
                {particles.map((particle) => (
                    <div
                        key={particle.id}
                        className={[
                            'absolute rounded-full pointer-events-none will-change-transform',
                            'bg-white/60',
                            'motion-reduce:animate-none',
                            'animate-[particleFloat_linear_infinite]',
                        ].join(' ')}
                        style={{
                            left: `${particle.left}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            animationDuration: `${particle.animationDuration}s`,
                            animationDelay: `${particle.animationDelay}s`,
                            opacity: particle.opacity
                        }}
                    />
                ))}
            </div>

            {/* Backgrounds */}
            <img
                src={Bg1}
                alt=""
                className="absolute top-0 left-0 z-[1] h-full w-full max-w-[100vw] object-cover opacity-90"
            />
            <img
                src={Bg2}
                alt=""
                className="absolute top-0 left-0 z-[3] h-full w-full max-w-[100vw] object-cover opacity-95"
            />
            <img
                src={Bg3}
                alt=""
                className={[
                    'absolute top-0 left-0 z-[4] h-[90%] w-full max-w-[100vw] object-cover',
                    'motion-reduce:animate-none',
                    'animate-[waveFloat_20s_ease-in-out_infinite]',
                ].join(' ')}
            />

            {/* Radial gradient overlay (equivale ao ::before) */}
            <div
                aria-hidden="true"
                className={[
                    'pointer-events-none absolute z-[2]',
                    'top-[20px] left-[500px] h-full w-full',
                    'bg-[radial-gradient(ellipse_at_center,rgb(255,255,255)_0%,transparent_50%)]',
                ].join(' ')}
            />

            {/* Conteúdo */}
            <div
                className={[
                    'relative z-10 w-full box-border',
                    'grid grid-cols-1 grid-rows-1 gap-4',
                    'min-h-[80vh] items-center justify-center',
                    'px-4 pt-8 pb-10',
                    'min-[480px]:px-6 min-[480px]:pt-10 min-[480px]:pb-12 min-[480px]:gap-6',
                    'sm:px-8 sm:pt-12 sm:pb-16 sm:gap-8',
                    'md:grid-cols-2 md:grid-rows-1 md:px-10 md:pt-14 md:pb-20 md:gap-10 md:items-center md:justify-start',
                    'lg:gap-0 lg:p-0 lg:pl-12 lg:min-h-[95vh]',
                    'xl:pl-16 xl:pr-4',
                    '2xl:pl-20 2xl:pr-6',
                ].join(' ')}
            >
                <div
                    className={[
                        'order-2 md:order-1',
                        'flex flex-col items-center text-center md:items-start md:text-left md:justify-center',
                        'md:pr-6',
                    ].join(' ')}
                >
                    <div className="text-center md:text-left text-primary-light motion-reduce:opacity-100 motion-reduce:translate-x-0 motion-safe:animate-[fadeInLeft_0.8s_ease-out_forwards]">
                        <div className="flex flex-row items-center justify-center md:justify-start gap-2 mb-2.5 min-[480px]:gap-2.5 min-[480px]:mb-3 sm:gap-3 sm:mb-4 md:gap-3 md:mb-3 lg:gap-2 lg:mb-2 xl:gap-2.5 xl:mb-3">
                            <div className="h-1 w-1 rounded-full bg-primary-light min-[480px]:h-1 min-[480px]:w-1 sm:h-2 sm:w-2 md:h-1.5 md:w-1.5 lg:h-1 lg:w-1 xl:h-1.5 xl:w-1.5" />
                            <p className="text-xs min-[480px]:text-xs sm:text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-light uppercase tracking-wider sm:tracking-widest leading-tight">
                                Sistema inteligente de gerenciamento de estágios
                            </p>
                        </div>

                        <p className="text-4xl min-[480px]:text-5xl sm:text-6xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold leading-tight sm:leading-none md:leading-tight lg:leading-none xl:leading-tight max-w-full md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl">
                            Adeus papelada
                        </p>

                        <p className="mt-2 min-[480px]:mt-2  sm:mt-4 md:mt-4 lg:mt-3 xl:mt-4 text-xs min-[480px]:text-sm sm:text-base md:text-sm lg:text-sm xl:text-base 2xl:text-lg font-light leading-relaxed sm:leading-relaxed md:leading-snug lg:leading-relaxed xl:leading-snug max-w-sm sm:max-w-md md:max-w-3xl lg:max-w-2xl xl:max-w-3xl text-primary-light opacity-0 motion-reduce:opacity-100 motion-safe:animate-[fadeIn_0.8s_ease-out_0.3s_forwards]">
                            YBY é um ecossistema de registro de ponto que parece ter sido desenhado por quem usa — não por um manual de RH de 1998. Web e mobile em perfeita sincronia, com foco em clareza, ritmo e experiência de alto nível.
                        </p>
                    </div>

                    <div className="mt-6 min-[480px]:mt-8 sm:mt-10 md:mt-12 lg:mt-16 xl:mt-20 flex w-full flex-col gap-4 min-[480px]:gap-5 sm:gap-6 md:gap-7 lg:gap-8 xl:gap-10 lg:w-auto items-center md:items-start">
                        <div className="flex flex-row items-stretch justify-center md:justify-start gap-3 min-[480px]:gap-4 min-[480px]:items-center sm:gap-5 sm:items-center md:gap-6 lg:gap-5 xl:gap-6 opacity-0 motion-reduce:opacity-100 motion-safe:animate-[fadeIn_0.8s_ease-out_0.6s_forwards]">
                            <div
                                onClick={() => scrollToId('planos')}
                                className={[
                                    'relative z-[1] cursor-pointer text-center rounded-full',
                                    'bg-primary-light',
                                    'px-4 py-2.5 min-[480px]:px-4 min-[480px]:py-2 sm:px-8 sm:py-3.5 md:px-10 md:py-4 lg:px-8 lg:py-3 xl:px-12 xl:py-4 2xl:px-14 2xl:py-5',
                                    'transition-all duration-300 hover:scale-[1.02]',
                                    'hover:bg-primary-light',
                                ].join(' ')}
                            >
                                <p className="text-xs min-[480px]:text-[10px] min-[480px]:font-medium sm:text-base md:text-lg lg:text-sm xl:text-base 2xl:text-lg font-bold uppercase text-primary">
                                    Começar avaliação gratuita
                                </p>
                            </div>

                            <p
                                onClick={() => scrollToId('App Mobile')}
                                className={[
                                    'cursor-pointer',
                                    'flex items-center justify-center',
                                    'gap-2 min-[480px]:gap-3 sm:gap-3.5 md:gap-4 lg:gap-3 xl:gap-4',
                                    'rounded-full',
                                    'bg-white/10',
                                    'px-4 py-2.5 min-[480px]:px-4 min-[480px]:py-2 sm:px-8 sm:py-3.5 md:px-10 md:py-4',
                                    'lg:ml-4 lg:px-8 lg:py-3',
                                    'xl:px-12 xl:py-4 2xl:px-14 2xl:py-5',
                                    'transition-opacity duration-300',
                                    'text-primary-light',
                                    'text-xs min-[480px]:text-[10px] min-[480px]:font-medium sm:text-base md:text-lg lg:text-sm xl:text-base 2xl:text-lg',
                                    'group',
                                ].join(' ')}
                            >
                                Saiba mais
                                <img
                                    src={ArrowRight}
                                    alt=""
                                    className={[
                                        'w-3.5 h-3.5 min-[480px]:w-4 min-[480px]:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-4.5 lg:h-4.5 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6',
                                        'invert brightness-0',
                                        'transition-transform duration-300 ease-out group-hover:translate-x-2',
                                    ].join(' ')}
                                />
                            </p>
                        </div>

                        <div
                            className={[
                                'grid grid-cols-1 gap-4',
                                'min-[480px]:grid-cols-3 min-[480px]:gap-5',
                                'sm:gap-6 md:gap-8 lg:gap-10',
                                'lg:flex lg:flex-row lg:ml-2',
                                'xl:gap-12 2xl:gap-16',
                                'justify-items-center md:justify-items-start',
                            ].join(' ')}
                        >
                            <div className="flex flex-col items-center md:items-start justify-start gap-1 sm:gap-1.5 md:gap-2">
                                <p className="text-center md:text-left text-xs min-[480px]:text-sm sm:text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-light uppercase text-primary-light">
                                    Média de Adoção
                                </p>
                                <p className="text-center md:text-left text-sm min-[480px]:text-base sm:text-lg md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-medium text-primary-light">
                                    100% dos estágiarios em 7 dias
                                </p>
                            </div>
                            <div className="flex flex-col items-center md:items-start justify-start gap-1 sm:gap-1.5 md:gap-2">
                                <p className="text-center md:text-left text-xs min-[480px]:text-sm sm:text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-light uppercase text-primary-light">
                                    Tempo de Implantação
                                </p>
                                <p className="text-center md:text-left text-sm min-[480px]:text-base sm:text-lg md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-medium text-primary-light">
                                    Menos de 48 horas
                                </p>
                            </div>
                            <div className="flex flex-col items-center md:items-start justify-start gap-1 sm:gap-1.5 md:gap-2">
                                <p className="text-center md:text-left text-xs min-[480px]:text-sm sm:text-base md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-light uppercase text-primary-light">
                                    Cobertura
                                </p>
                                <p className="text-center md:text-left text-sm min-[480px]:text-base sm:text-lg md:text-sm lg:text-xs xl:text-sm 2xl:text-base font-medium text-primary-light">
                                    Mobile + Web integrados
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className={[
                        'order-1 md:order-2 hidden md:flex',
                        'relative items-end justify-center',
                        'lg:absolute lg:top-20 lg:right-40 lg:rotate-[6deg]',
                        '2xl:right-[100px]',
                    ].join(' ')}
                >
                    <img
                        src={MockupHero}
                        alt="Mockup Hero"
                        className={[
                            'w-40 max-h-[38vh] object-contain object-bottom',
                            'min-[480px]:w-[200px] min-[480px]:max-h-[40vh]',
                            'sm:w-60 sm:max-h-[44vh]',
                            'md:w-[280px] md:max-h-[48vh]',
                            'lg:w-96 lg:max-h-[75vh]',
                            'xl:w-[400px] xl:max-h-[720px]',
                            '2xl:w-[420px]',
                        ].join(' ')}
                    />
                </div>
            </div>
        </div>
    );
}

export default Hero;