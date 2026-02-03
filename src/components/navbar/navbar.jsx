import { useState, useEffect, useRef } from 'react';
import './navbar.css';
import Logo from '../../assets/iconyby.png';

function Navbar() {
    const [activeSection, setActiveSection] = useState('inicio');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const sections = ['inicio', 'sobre', 'planos', 'contato'];
            const scrollPosition = currentScrollY + 150;

            // Detectar scroll para aplicar blur
            setIsScrolled(currentScrollY > 50);

            // Detectar direção do scroll para esconder/mostrar navbar
            if (currentScrollY < 50) {
                // Sempre mostrar no topo
                setIsVisible(true);
            } else if (currentScrollY > lastScrollY.current) {
                // Scroll para baixo - esconder
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY.current) {
                // Scroll para cima - mostrar
                setIsVisible(true);
            }

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

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const navItems = [
        { id: 'inicio', label: 'INÍCIO' },
        { id: 'App Mobile', label: 'App Mobile' },
        { id: 'App Mobile', label: 'Painel Web' },
        { id: 'planos', label: 'Planos' }
    ];

    return (
        <>
            <div className="absolute top-0 left-0 right-0 w-full z-50 pt-5" >
                <div className="flex flex-row items-center justify-between mx-auto px-5">
                    <div className="flex items-center">
                        <img src={Logo} alt="Logo" className="w-8 h-8 cursor-pointer" onClick={() => scrollToSection('inicio')} />
                    </div>
                    <div className="flex flex-row items-center justify-center gap-10">
                        {navItems.map((item) => (
                            <p
                                key={item.id}
                                className={`nav-link text-primary-light text-xs font-regular cursor-pointer uppercase`}
                                onClick={() => scrollToSection(item.id)}
                            >
                                {item.label}
                            </p>
                        ))}
                    </div>
                    <div className="border-1 cta-button cursor-pointer  border-primary-light text-primary-light rounded-xl px-6 py-2" onClick={() => scrollToSection('planos')}>
                        <p className="text-sm font-medium">Testar gratuitamente</p>
                    </div>



                </div>
            </div>
        </>
    )
}

export default Navbar;