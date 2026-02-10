import { useState, useEffect, useRef } from 'react';
import Logo from '../../assets/iconyby.png';

function Navbar() {
    const [activeSection, setActiveSection] = useState('inicio');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const sections = ['inicio', 'sobre', 'planos', 'contato'];
            const scrollPosition = currentScrollY + 150;

            // Detectar scroll para aplicar blur
            setIsScrolled(currentScrollY > 50);

            lastScrollY.current = currentScrollY;

            // Detectar seção ativa
            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i]);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Verifica na montagem inicial

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Bloquear scroll do body quando o menu mobile estiver aberto
    useEffect(() => {
        if (isMobileMenuOpen) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = originalOverflow;
            };
        } else {
            document.body.style.overflow = '';
        }
    }, [isMobileMenuOpen]);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setIsMobileMenuOpen(false); // Fechar menu ao clicar
        }
    };

    const navItems = [
        { id: 'inicio', label: 'INÍCIO' },
        { id: 'App Mobile', label: 'App Mobile' },
        { id: 'App Mobile', label: 'Painel Web' },
        { id: 'planos', label: 'Planos' }
    ];

    return (
        <nav
            className={[
                'absolute top-5 left-0 right-0 w-full z-50 transition-all duration-300 ease-in-out',
               
            ].join(' ')}
        >
            <div className="mx-auto px-4 sm:px-5 lg:px-6 max-w-7xl">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img
                            src={Logo}
                            alt="Logo"
                            className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition-transform hover:scale-110"
                            onClick={() => scrollToSection('inicio')}
                        />
                    </div>

                    {/* Navegação principal (desktop/tablet) */}
                    <div className="hidden md:flex items-center justify-center gap-6 lg:gap-8 xl:gap-10">
                        {navItems.map((item) => (
                            <button
                                key={`${item.id}-${item.label}`}
                                onClick={() => scrollToSection(item.id)}
                                className={[
                                    'relative text-[var(--color-primary-light)] text-xs font-normal uppercase cursor-pointer transition-all duration-300',
                                    'hover:font-semibold',
                                    'before:content-[""] before:absolute before:bottom-[-4px] before:left-0 before:w-0 before:h-0.5 before:bg-white before:rounded-sm before:transition-all before:duration-300',
                                    'hover:before:w-full',
                                    activeSection === item.id
                                        ? 'font-extrabold after:content-[""] after:absolute after:bottom-[-4px] after:left-1/2 after:-translate-x-1/2 after:w-[40%] after:h-0.5 after:bg-white after:rounded-sm'
                                        : '',
                                ].join(' ')}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* Botão CTA (apenas desktop/tablet) */}
                    <div className="hidden md:block">
                        <button
                            onClick={() => scrollToSection('planos')}
                            className={[
                                'relative z-10 cursor-pointer border border-[var(--color-primary-light)] text-primary-light rounded-xl px-4 xl:px-6 py-2 transition-all duration-300',
                                'hover:bg-[var(--color-primary-light)] hover:scale-[1.01]',
                                'hover:text-[var(--color-primary)]',
                            ].join(' ')}
                        >
                            <p className="text-xs xl:text-sm font-medium">Testar gratuitamente</p>
                        </button>
                    </div>

                    {/* Mobile Menu Button (somente mobile: < md) - fica acima do overlay para animar ao abrir/fechar */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="hidden max-[767px]:flex flex-col gap-1.5 p-2 text-primary-light focus:outline-none relative z-50"
                        aria-label="Toggle menu"
                    >
                        <span
                            className={[
                                'block w-6 h-0.5 bg-current transition-all duration-300',
                                isMobileMenuOpen ? 'rotate-45 translate-y-2' : '',
                            ].join(' ')}
                        />
                        <span
                            className={[
                                'block w-6 h-0.5 bg-current transition-all duration-300',
                                isMobileMenuOpen ? 'opacity-0' : '',
                            ].join(' ')}
                        />
                        <span
                            className={[
                                'block w-6 h-0.5 bg-current transition-all duration-300',
                                isMobileMenuOpen ? '-rotate-45 -translate-y-2' : '',
                            ].join(' ')}
                        />
                    </button>
                </div>

                {/* Mobile Menu full-screen absoluto (somente mobile < md) */}
                <div
                    className={[
                        'fixed inset-x-0 inset-y-0 z-40 w-screen h-screen',
                        'backdrop-blur-sm bg-[rgba(141,205,247,0.719)] pt-5 px-5',
                        'md:hidden flex flex-col transition-all duration-300 ease-out',
                        isMobileMenuOpen
                            ? 'opacity-100 translate-y-0 pointer-events-auto'
                            : 'opacity-0 -translate-y-4 pointer-events-none',
                    ].join(' ')}
                >
                    <div className="mt-16 flex flex-col gap-6 pb-10 max-w-xl w-full">
                        {navItems.map((item) => (
                            <button
                                key={`${item.id}-${item.label}`}
                                onClick={() => scrollToSection(item.id)}
                                className={[
                                    'text-left justify-between text-[var(--color-primary-light)] whitespace-nowrap',
                                    'text-[12vw] sm:text-[10vw] font-semibold tracking-widest uppercase leading-none',
                                    'py-3 sm:py-5 transition-all duration-300',
                                    'hover:translate-x-2',
                                    activeSection === item.id
                                        ? 'font-extrabold'
                                        : '',
                                ].join(' ')}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;