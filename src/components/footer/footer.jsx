import './footer.css';
import wave1 from '../../assets/images/background/footer-posit-1.svg';
import wave2 from '../../assets/images/background/footer-posit2.svg';
import wave3 from '../../assets/images/background/footer-posit3.svg';
import logo from '../../assets/iconyby.png';

function Footer() {
    const scrollToId = (id) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const year = new Date().getFullYear();

    return (
        <footer
            className="relative overflow-hidden h-[80vh] "
        >
            {/* Ondas (SVGs em camadas) */}
            <img src={wave1} alt="Background 1" className="absolute top-40 left-0 h-[100%] w-screen object-cover z-[1] opacity-90" />
                <img src={wave2} alt="Background 2" className="absolute top-40 left-0 h-[100%] w-screen object-cover z-[3] opacity-95" />
                <img src={wave3} alt="Background 3" className="absolute top-40 left-0 h-[100%] w-screen object-cover z-[4] " />

            <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10 mt-80 pb-10 z-5 flex flex-col justify-center items-center">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 w-full">
                    {/* Branding */}
                    <div className="lg:col-span-1 justify-self-start text-left">
                        <div className="flex items-center gap-3 justify-start">
                            <div className="h-10 w-10 place-items-center">
                                <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                            </div>
                        </div>

                        <p className="mt-5 text-white/90 text-sm leading-relaxed max-w-xs">
                            Plataforma digital para controle de jornada, com registros de check-in e check-out seguros, precisos e eficientes para
                            empresas e instituições.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="justify-self-center">
                        <p className="text-white/95 font-semibold">Links</p>
                        <div className="mt-4 space-y-3 text-white/85 text-sm flex flex-col gap-2">
                            <button type="button" onClick={() => scrollToId('App Mobile')} className="footerLink">
                                App Mobile <span aria-hidden="true">↗</span>
                            </button>
                            <button type="button" onClick={() => scrollToId('Painel Web')} className="footerLink">
                                Painel Web <span aria-hidden="true">↗</span>
                            </button>
                            <button type="button" onClick={() => scrollToId('planos')} className="footerLink">
                                Planos <span aria-hidden="true">↗</span>
                            </button>
                            <button type="button" onClick={() => scrollToId('inicio')} className="footerLink">
                                Início <span aria-hidden="true">↗</span>
                            </button>
                        </div>
                    </div>

                    {/* Suporte */}
                    <div className="justify-self-center">
                        <p className="text-white/95 font-semibold">Suporte</p>
                        <div className="mt-4 space-y-3 text-white/85 text-sm flex flex-col gap-2">
                            <button type="button" onClick={() => scrollToId('contato')} className="footerLink inline-flex items-center gap-2 ">
                                Contato <span aria-hidden="true">↗</span>
                            </button>
                            <a href="#faq" className="footerLink inline-flex items-center gap-2 ">
                                FAQ <span aria-hidden="true">↗</span>
                            </a>
                        </div>
                    </div>

                    {/* Termos */}
                    <div className="justify-self-center">
                        <p className="text-white/95 font-semibold">Termos</p>
                        <div className="mt-4 space-y-3 text-white/85 text-sm flex flex-col gap-2">
                            <a href="#termos" className="footerLink">
                                Termos de uso
                            </a>
                            <a href="#privacidade" className="footerLink ">
                                Política de privacidade
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-4 border-t border-white/20">
                    <p className="text-center text-white/80 text-xs">© {year} YBY. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;