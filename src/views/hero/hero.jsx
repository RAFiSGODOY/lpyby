
import './hero.css';
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

    // Gerar partículas
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        left: Math.random() * 100,
        animationDuration: Math.random() * 20 + 15,
        animationDelay: Math.random() * 5,
        opacity: Math.random() * 0.5 + 0.2
    }));

    return (
        <>
            <div className="relative hero-container h-[95vh]">
                <div className="particles-container absolute inset-0 z-[2] pointer-events-none">
                    {particles.map((particle) => (
                        <div
                            key={particle.id}
                            className="particle"
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
                <img src={Bg1} alt="Background 1" className="absolute top-0 left-0 h-[100%] w-screen object-cover z-[1] opacity-90" />
                <img src={Bg2} alt="Background 2" className="absolute top-0 left-0 h-[100%] w-screen object-cover z-[3] opacity-95" />
                <img src={Bg3} alt="Background 3" className="absolute top-0 left-0 h-[90%] w-screen object-cover z-[4] hero-wave" />


                <div className="relative z-10 w-full h-full grid grid-cols-2 pl-10 ">
                    <div className="flex flex-col  items-start justify-center">
                        <div className="text-left text-primary-light   animate-fade-in-left">
                            <div className="flex flex-row items-center justify-start gap-2 mb-5">
                                <div className="w-1 h-1 bg-primary-light rounded-full" />
                                <p className="text-xs font-light uppercase tracking-widest">Sistema inteligente de gerenciamento de estágios</p>
                            </div>
                            <p className="text-7xl font-extrabold max-w-2xl">Adeus papelada</p>
                            <p className="text-primary-light max-w-xl leading-5 mt-2 font-light text-sm animate-fade-in-delay-1"> YBY é um ecossistema de registro de ponto que parece ter sido desenhado por quem usa — não por um manual de RH de 1998. Web e mobile em perfeita sincronia, com foco em clareza, ritmo e experiência de alto nível.</p>

                        </div>
                        <div className="flex flex-col gap-5  mt-15  justify-center">
                            <div className="flex flex-row items-center justify-center  gap-4 animate-fade-in-delay-2">
                                <div
                                    onClick={() => scrollToId('planos')}
                                    className="cta-button bg-primary-light transition-all duration-300  px-8 py-3 rounded-full cursor-pointer"
                                >
                                    <p className="text-md font-bold text-primary uppercase ">Começar avaliação gratuita</p>
                                </div>
                                <p
                                    onClick={() => scrollToId('App Mobile')}
                                    className="text-primary-light text-sm ml-4 flex items-center gap-2 cursor-pointer bg-white/10 rounded-full px-8 py-3 transition-opacity group"
                                >
                                    Saiba mais
                                    <img src={ArrowRight} alt="Arrow Right" className="w-5 h-5 brightness-0 invert transition-transform duration-300 ease-out group-hover:translate-x-2" />
                                </p>
                            </div>
                            <div className="flex flex-row items-start justify-start gap-10 ml-2">
                                <div className="flex flex-col items-start justify-start ">
                                    <p className="text-xs font-light uppercase text-primary-light text-center">Média de Adoção</p>
                                    <p className="text-xs font-medium text-primary-light">100% dos estágiarios em 7 dias</p>
                                </div>
                                <div className="flex flex-col items-start justify-start ">
                                    <p className="text-xs font-light uppercase text-primary-light text-center">Tempo de Implantação</p>
                                    <p className="text-xs font-medium text-primary-light">Menos de 48 horas</p>
                                </div>
                                <div className="flex flex-col items-start justify-start ">
                                    <p className="text-xs font-light uppercase text-primary-light text-center">Cobertura</p>
                                    <p className="text-xs font-medium text-primary-light">Mobile + Web integrados</p>
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="absolute top-20 right-0  lg:right-20 flex items-end justify-center rotate-6">
                        <img src={MockupHero} alt="Mockup Hero" className="w-[400px] h-[820px]" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;