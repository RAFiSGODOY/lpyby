
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
        <div className="hero-root hero-container">
            <div className="particles-container hero-particles">
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
            <img src={Bg1} alt="" className="hero-bg1" />
            <img src={Bg2} alt="" className="hero-bg2" />
            <img src={Bg3} alt="" className="hero-bg3 hero-wave" />

            <div className="hero-grid">
                <div className="hero-content">
                    <div className="hero-text-block animate-fade-in-left">
                        <div className="hero-kicker-row">
                            <div className="hero-kicker-dot" />
                            <p className="hero-kicker-text">Sistema inteligente de gerenciamento de estágios</p>
                        </div>
                        <p className="hero-title">Adeus papelada</p>
                        <p className="hero-desc animate-fade-in-delay-1">
                            YBY é um ecossistema de registro de ponto que parece ter sido desenhado por quem usa — não por um manual de RH de 1998. Web e mobile em perfeita sincronia, com foco em clareza, ritmo e experiência de alto nível.
                        </p>
                    </div>
                    <div className="hero-actions">
                        <div className="hero-cta-row animate-fade-in-delay-2">
                            <div
                                onClick={() => scrollToId('planos')}
                                className="cta-button hero-cta-button"
                            >
                                <p>Começar avaliação gratuita</p>
                            </div>
                            <p
                                onClick={() => scrollToId('App Mobile')}
                                className="hero-link-more"
                            >
                                Saiba mais
                                <img src={ArrowRight} alt="" className="hero-link-more-icon" />
                            </p>
                        </div>
                        <div className="hero-stats">
                            <div className="hero-stat">
                                <p className="hero-stat-label">Média de Adoção</p>
                                <p className="hero-stat-value">100% dos estágiarios em 7 dias</p>
                            </div>
                            <div className="hero-stat">
                                <p className="hero-stat-label">Tempo de Implantação</p>
                                <p className="hero-stat-value">Menos de 48 horas</p>
                            </div>
                            <div className="hero-stat">
                                <p className="hero-stat-label">Cobertura</p>
                                <p className="hero-stat-value">Mobile + Web integrados</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hero-mockup-wrap">
                    <img src={MockupHero} alt="Mockup Hero" className="hero-mockup-img" />
                </div>
            </div>
        </div>
    );
}

export default Hero;