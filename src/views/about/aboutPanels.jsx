import ArrowRight from '../../assets/icons/arrow-forward-outline.svg';
import TelaRegistro from '../../assets/images/mobile/TelaRegistro.png';
import TelaInicial from '../../assets/images/mobile/TelaInicial.png';
import TelaAtestados from '../../assets/images/mobile/TelaAtestados.png';
import MonitorAbout from '../../assets/images/desktop/MonitorAbout.png';
import Dashboard from '../../assets/images/desktop/Relatorios.png';
import Dashboard2 from '../../assets/images/desktop/mapadecalor.png';
import AboutHeroPanel from './panels/AboutHeroPanel';


function CheckIcon() {
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

function PanelShell({ children }) {
    return (
        <div className="about-panel">
            <div className="about-panelInner mx-auto w-full max-w-6xl px-6 lg:px-10">{children}</div>
        </div>
    );
}

function MediaImage({ src, alt, className = '' }) {
    return <img src={src} alt={alt} className={`mx-auto h-auto object-contain ${className}`} loading="lazy" />;
}
export default function AboutPanels() {
    const goToPlans = () => {
        const el = document.getElementById('planos');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <>
            {/* Painel 1: Mini-hero (estilo Hero) */}
            <AboutHeroPanel />

            {/* Painel 2: Registro de ponto */}
            <PanelShell>
                <div className="grid grid-cols-12 gap-20 items-start">
                    {/* Título topo esquerdo */}
                    <div className="col-span-12 lg:col-span-7 pl-4 relative">
                        <div className="absolute left-0 top-0 h-full w-[3px] bg-primary rounded-full opacity-90" />
                        <div className="absolute left-0 -bottom-20 w-6 h-6 -translate-x-[15px] flex items-center justify-center ">
                            <p className=" text-primary text-8xl font-bold ">1</p>

                        </div>
                        <p className="inline-flex items-center gap-2 font-medium tracking-widest uppercase text-gray-500 text-sm">
                            <span className=" h-1 w-1 rounded-full bg-gray-500" />
                            Registro e contexto em um gesto
                        </p>

                        <h3 className="mt-2 text-4xl lg:text-5xl font-regular text-primary pb-2 ">
                            <span className="font-extrabold  ">Registro</span> <br />de ponto <br /><span className=" font-regular">em segundos</span>
                        </h3>

                        <p className="mt-5 text-gray-700 text-base lg:text-md font-light leading-relaxed max-w-md">
                            <span className="font-semibold">Arraste e pronto.  </span> Registro rápido, com confirmação de contexto e retorno imediato — <span className="font-semibold">pensado para o dia a dia corrido.</span> Com <span className="font-semibold">geolocalização automática</span> (confirmação de contexto e localização no registro, com visual claro pra auditoria) e <span className="font-semibold">registros offline e online</span> (Sincronização automática para garantir que você nunca perca um  registro).
                        </p>

                        {/* Mobile: lista embaixo (no desktop os callouts ficam na tela) */}
                        <ul className="mt-6 space-y-3 text-sm text-gray-700 lg:hidden">
                            {[
                                'Localização: confirmação automática quando aplicável.',
                                'Offline + sync: registre offline e sincronize depois.',
                                'Um gesto: fluxo direto, sem telas desnecessárias.',
                                'Feedback imediato: você sabe na hora se deu certo.'
                            ].map((b) => (
                                <li key={b} className="flex gap-3">
                                    <span className="mt-0.5 text-primary">
                                        <CheckIcon />
                                    </span>
                                    {b}
                                </li>
                            ))}
                        </ul>


                    </div>

                    {/* Tela + callouts (meio/direita) */}
                    <div className="col-span-12 lg:col-span-5">
                        <div className="relative mx-auto w-full max-w-2xl lg:ml-auto lg:mr-0 min-h-[520px] flex items-center justify-center lg:justify-end">
                            {/* Imagem central */}
                            <div className="relative">
                                <MediaImage src={TelaRegistro} alt="Registro de ponto no app" className="w-[280px] lg:w-[320px]" />
                            </div>

                            {/* Callouts (desktop) */}
                            <div className="hidden lg:block">
                                {/* Left 1 */}
                                <div className="absolute right-0 top-[18%] translate-x-[82%] w-[380px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-left">
                                        <p className="text-xs font-semibold text-gray-900">horário e direção de registro</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Horário e direção de registro que serão enviados para o servidor ao realizar o ponto.</p>
                                        <div className="absolute left-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>
                                {/* Left 2 */}
                                <div className="absolute right-0 top-[36%] translate-x-[90%] w-[280px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-left">
                                        <p className="text-xs font-semibold text-gray-900">Localização automática</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Coordenadas geográficas do dispositivo são enviadas para o servidor ao realizar o ponto.</p>
                                        <div className="absolute left-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>
                                {/* Right 1 */}
                                <div className="absolute left-0 top-[50%] -translate-x-[85%] w-[200px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-right">
                                        <p className="text-xs font-semibold text-gray-900">Um gesto</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Fluxo direto, sem telas desnecessárias.</p>
                                        <div className="absolute right-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute right-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>
                                {/* Right 2 */}
                                <div className="absolute left-0 top-[72%] -translate-x-[90%] w-[280px]">
                                    <div className="relative text-right rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10">
                                        <p className="text-xs font-semibold text-gray-900">Feedback imediato</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Seu registro é enviado para o servidor imediatamente e a resposta instantânea é exibida para você.</p>
                                        <div className="absolute right-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute right-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PanelShell>

            {/* Painel 3: Acompanhamento */}
            <PanelShell>
                <div className="grid grid-cols-12 gap-20 items-start">
                    {/* Título topo esquerdo */}
                    <div className="col-span-12 lg:col-span-7 pl-4 relative">
                        <div className="absolute left-0 top-0 h-full w-[3px] bg-primary rounded-full opacity-90" />
                        <div className="absolute left-0 -bottom-20 w-6 h-6 -translate-x-[15px] flex items-center justify-center ">
                            <p className=" text-primary text-8xl font-bold">2</p>

                        </div>
                        <p className="inline-flex items-center gap-2 font-medium tracking-widest uppercase text-gray-500 text-sm">
                            <span className=" h-1 w-1 rounded-full bg-gray-500" />
                            Controle sobre horas cumpridas
                        </p>

                            <h3 className="mt-2 text-4xl lg:text-5xl font-regular text-primary pb-2 ">
                            <span className="font-extrabold  ">Acompanhamento</span> <br />do estágio em<br /><span className=" font-regular"> tempo real</span>
                        </h3>

                        <p className="mt-5 text-gray-700 text-base lg:text-md font-light leading-relaxed max-w-md">
                            Monitore em <span className="font-semibold">tempo real</span> o progresso da carga horária dos estagiários. Tenha <span className="font-semibold">total controle</span> sobre horas cumpridas, pendentes e previstas, evitando atrasos, inconsistências e problemas na validação do estágio e <span className="font-semibold">garantindo conformidade</span> com as <span className="font-semibold">exigências acadêmicas e institucionais</span>.
                        </p>

                        {/* Mobile: lista embaixo (no desktop os callouts ficam na tela) */}
                        <ul className="mt-6 space-y-3 text-sm text-gray-700 lg:hidden">
                            {[
                                'Progresso em tempo real: horas cumpridas, pendentes e previstas.',
                                'Metas claras: entenda rapidamente o que falta para concluir.',
                                'Transparência: histórico e status organizados para validação.',
                                'Conformidade: reduz inconsistências e atrasos na rotina.'
                            ].map((b) => (
                                <li key={b} className="flex gap-3">
                                    <span className="mt-0.5 text-primary">
                                        <CheckIcon />
                                    </span>
                                    {b}
                                </li>
                            ))}
                        </ul>


                    </div>

                    {/* Tela + callouts (meio/direita) */}
                    <div className="col-span-12 lg:col-span-5">
                        <div className="relative mx-auto w-full max-w-2xl lg:ml-auto lg:mr-0 min-h-[520px] flex items-center justify-center lg:justify-end">
                            {/* Imagem central */}
                            <div className="relative">
                                <MediaImage src={TelaInicial} alt="TelaInicial do app" className="w-[280px] lg:w-[320px]" />
                            </div>

                            {/* Callouts (desktop) */}
                            <div className="hidden lg:block">
                                {/* Left 1 */}
                                <div className="absolute right-0 top-[28%] translate-x-[82%] w-[280px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-left">
                                        <p className="text-xs font-semibold text-gray-900">Estágios disponíveis para ativar</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Lista de estágios disponíveis para ativação, o estágiário pode realizar diversos estagios em um unico aplicativo.</p>
                                        <div className="absolute left-[-30px] top-1/2 h-px w-8 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-[-35px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>

                                {/* Right 1 */}
                                <div className="absolute left-0 top-[44%] -translate-x-[82%] w-[200px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-right">
                                        <p className="text-xs font-semibold text-gray-900">Progresso Atual</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Porcentagem atual de horas cumpridas em relação às metas propostas pelo estágio.</p>
                                        <div className="absolute right-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute right-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>
                                {/* Right 2 */}
                                <div className="absolute left-0 top-[64%] translate-x-[122%] w-[280px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10">
                                        <p className="text-xs font-semibold text-gray-900">Informações sobre o estágio ativo</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Informações sobre o estágio ativo, como metas de horas a serem cumpridas e quantida já feita, endereço, entre outras.</p>
                                        <div className="absolute left-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PanelShell>

            {/* Painel 4: Envio de atestados (app) */}
            <PanelShell>
                <div className="grid grid-cols-12 gap-20 items-start">
                    {/* Título topo esquerdo */}
                    <div className="col-span-12 lg:col-span-7 pl-4 relative">
                        <div className="absolute left-0 top-0 h-full w-[3px] bg-primary rounded-full opacity-90" />
                        <div className="absolute left-0 -bottom-20 w-6 h-6 -translate-x-[15px] flex items-center justify-center ">
                            <p className=" text-primary text-8xl font-bold">3</p>
                        </div>

                        <p className="inline-flex items-center gap-2 font-medium tracking-widest uppercase text-gray-500 text-sm">
                            <span className=" h-1 w-1 rounded-full bg-gray-500" />
                            Mais autonomia, menos burocracia
                        </p>

                        <h3 className="mt-2 text-4xl lg:text-5xl font-regular text-primary pb-2 ">
                            Envio de <br /><span className="font-extrabold">atestados</span> <br />
                            <span className="font-regular">médicos</span>
                        </h3>

                        <p className="mt-5 text-gray-700 text-base lg:text-md font-light leading-relaxed max-w-md">
                            Centralize o envio e a <span className="font-semibold">gestão de atestados médicos diretamente pela plataforma.</span> Estagiários enviam documentos de forma rápida e segura, enquanto supervisores <span className="font-semibold">analisam e validam</span> tudo em um único lugar, com <span className="font-semibold">histórico organizado</span> e <span className="font-semibold">sem burocracia</span>.</p>

                        {/* Mobile: lista embaixo (no desktop os callouts ficam na tela) */}
                        <ul className="mt-6 space-y-3 text-sm text-gray-700 lg:hidden">
                            {[
                                'Anexos: upload simples do documento.',
                                'Observações: mensagem para contexto e validação.',
                                'Status: em análise / aprovado / recusado.',
                                'Histórico: tudo registrado por usuário e data.'
                            ].map((b) => (
                                <li key={b} className="flex gap-3">
                                    <span className="mt-0.5 text-primary">
                                        <CheckIcon />
                                    </span>
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tela + callouts (meio/direita) */}
                    <div className="col-span-12 lg:col-span-5">
                        <div className="relative mx-auto w-full max-w-2xl lg:ml-auto lg:mr-0 min-h-[520px] flex items-center justify-center lg:justify-end">
                            {/* Imagem central */}
                            <div className="relative">
                                <MediaImage src={TelaAtestados} alt="Envio de atestados no app" className="w-[280px] lg:w-[320px]" />
                            </div>

                            {/* Callouts (desktop) */}
                            <div className="hidden lg:block">
                                {/* Left 1 */}
                                <div className="absolute right-0 top-[15%] translate-x-[86%] w-[280px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-left">
                                        <p className="text-xs font-semibold text-gray-900">Filtros para busca</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Facilite a visualização de atestados, com filtros por etapas de validação, status, entre outros.</p>
                                        <div className="absolute left-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>

                                {/* Left 2 */}
                                <div className="absolute right-0 top-[74%] translate-x-[86%] w-[280px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-left">
                                        <p className="text-xs font-semibold text-gray-900">Botão flutuante para envio</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Botão flutuante para envio de atestados médicos, com mensagem para justificativa, data do periodo da ausência e envio do documento.</p>
                                        <div className="absolute left-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-[-52px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>

                                {/* Right 1 */}
                                <div className="absolute left-0 top-[34%] -translate-x-[90%] w-[200px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-right">
                                        <p className="text-xs font-semibold text-gray-900">Atestados enviados</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Lista de atestados enviados, com status de análise, aprovado ou recusado.</p>
                                        <div className="absolute right-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute right-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </PanelShell>

            {/* Painel 5: Relatorios (web) */}
            <PanelShell>
                <div className="grid grid-cols-12 gap-20 items-start">
                    {/* Título topo esquerdo */}
                    <div className="col-span-12 lg:col-span-5 pl-4 relative ">
                        <div className="absolute left-0 top-0 h-full w-[3px] bg-primary rounded-full opacity-90" />
                        <div className="absolute left-0 -bottom-20 w-6 h-6 -translate-x-[15px] flex items-center justify-center ">
                            <p className=" text-primary text-8xl font-bold">4</p>
                        </div>

                        <p className="inline-flex items-center gap-2 font-medium tracking-widest uppercase text-gray-500 text-sm">
                            <span className=" h-1 w-1 rounded-full bg-gray-500" />
                            Baixe Relatórios
                        </p>

                        <h3 className="mt-2 text-4xl lg:text-5xl font-regular text-primary pb-2 ">
                            <span className="font-extrabold">Relatorios completos </span><br />para uma <br />
                            <span className="font-regular">melhor gestão </span>
                        </h3>
                        <p className="mt-5 text-gray-700 text-base lg:text-md font-light leading-relaxed max-w-md">
                            Gere <span className="font-semibold">relatórios detalhados</span> de frequência, horários e histórico de registros <span className="font-semibold">com poucos cliques</span>. Supervisores e instituições têm acesso rápido a informações claras, <span className="font-semibold">facilitando avaliações, validações acadêmicas e prestação de contas</span>.</p>


                        {/* Mobile: lista embaixo (no desktop os callouts ficam na tela) */}
                        <ul className="mt-6 space-y-3 text-sm text-gray-700 lg:hidden">
                            {[
                                'Filtros: período, usuário e instituição.',
                            ].map((b) => (
                                <li key={b} className="flex gap-3">
                                    <span className="mt-0.5 text-primary">
                                        <CheckIcon />
                                    </span>
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tela + callouts (meio/direita) */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="relative mx-auto  w-full lg:mr-0 min-h-[520px] flex items-center justify-center lg:justify-end">
                            {/* Imagem central */}
                            <div className="relative">
                                <MediaImage src={Dashboard} alt="Mapa de calor de pontos no painel web" className="w-[520px] lg:h-[740px]" />
                            </div>

                            {/* Callouts (desktop) */}
                            <div className="hidden lg:block">
                                {/* Left 1 */}
                                <div className="absolute right-0 top-[22%] translate-x-[84%] w-[300px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-left">
                                        <p className="text-xs font-semibold text-gray-900">Relatórios recentes</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Lista completa com os ultimos relatórios gerados.</p>
                                        <div className="absolute left-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>

                                {/* Top  1 */}
                                <div className="absolute right-0 -top-[15%] -translate-x-[50%] w-[300px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-center">
                                        <p className="text-xs font-semibold text-gray-900">Filtros</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Selecione se deseja baixar relatório por alunos ou por turma e asseguir selecione o periodo e o formato desejado (Excel ou PDF).</p>
                                        {/* Conector (desce em direção à imagem) */}
                                        <div className="absolute left-1/2 bottom-[-94px] -translate-x-1/2 w-px h-24 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-1/2 bottom-[-94px] -translate-x-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>



                                {/* bottom 1 */}
                                <div className="absolute left-0 top-[78%] translate-x-[72%] w-[300px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-center">
                                        <p className="text-xs font-semibold text-gray-900">Alunos ou turma</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Após selecionar o periodo e o formato, selecione qual aluno ou turma deseja baixar o relatório.</p>
                                        {/* Conector (sobe em direção à imagem) */}
                                        <div className="absolute left-1/2 top-[-74px] -translate-x-1/2 w-px h-16 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-1/2 top-[-82px] -translate-x-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PanelShell>

            {/* Painel 6: Mapa de calor (web) */}
            <PanelShell>
                <div className="grid grid-cols-12 gap-20 items-start">
                    {/* Título topo esquerdo */}
                    <div className="col-span-12 lg:col-span-5 pl-4 relative">
                        <div className="absolute left-0 top-0 h-full w-[3px] bg-primary rounded-full opacity-90" />
                        <div className="absolute left-0 -bottom-20 w-6 h-6 -translate-x-[15px] flex items-center justify-center ">
                            <p className=" text-primary text-8xl font-bold">5</p>
                        </div>

                        <p className="inline-flex items-center gap-2 font-medium tracking-widest uppercase text-gray-500 text-sm">
                            <span className=" h-1 w-1 rounded-full bg-gray-500" />
                            Insights visuais e rápidos
                        </p>

                        <h3 className="mt-2 text-4xl lg:text-5xl font-regular text-primary pb-2 ">
                            Mapa de calor <span className="font-extrabold">inteligente</span> <br />
                            <span className="font-regular">para decisões rápidas</span>
                        </h3>

                        <p className="mt-5 text-gray-700 text-base lg:text-md font-light leading-relaxed max-w-md">
                            Enxergue picos, vales e padrões de registros em segundos — ideal para supervisionar e ajustar rotinas com clareza.
                        </p>

                        {/* Mobile: lista embaixo (no desktop os callouts ficam na tela) */}
                        <ul className="mt-6 space-y-3 text-sm text-gray-700 lg:hidden">
                            {[
                                'Picos e vales: leitura por cores, onde concentra.',
                                'Comparações: períodos e grupos lado a lado.',
                                'Tendências: padrões ficam óbvios rapidamente.',
                                'Ações: base para ajustes e acompanhamento.'
                            ].map((b) => (
                                <li key={b} className="flex gap-3">
                                    <span className="mt-0.5 text-primary">
                                        <CheckIcon />
                                    </span>
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Tela + callouts (meio/direita) */}
                    <div className="col-span-12 lg:col-span-7">
                        <div className="relative mx-auto w-full max-w-3xl lg:ml-auto lg:mr-0 min-h-[520px] flex items-center justify-center lg:justify-end">
                            {/* Imagem central */}
                            <div className="relative">
                                <MediaImage src={Dashboard2} alt="Mapa de calor no painel web" className="w-[520px] lg:w-[640px]" />
                            </div>

                            {/* Callouts (desktop) */}
                            <div className="hidden lg:block">
                                {/* Left 1 */}
                                <div className="absolute right-0 top-[6%] translate-x-[104%] w-[300px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-left">
                                        <p className="text-xs font-semibold text-gray-900">Escolha seu mapa</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Alterne entre o mapa de calor e o mapa de pontos para visualizar as informações de forma mais clara, conforme sua necessidade.</p>
                                        <div className="absolute left-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>

                                {/* Left 2 */}
                                <div className="absolute right-0 top-[38%] translate-x-[84%] w-[300px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-left">
                                        <p className="text-xs font-semibold text-gray-900">Mapa de Calor</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Tenha um mapa prático e preciso para localizar regiões com grandes volumes de registros.</p>
                                        <div className="absolute left-[-56px] top-1/2 h-px w-14 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-[-62px] top-1/2 -translate-y-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>

                                {/* Top  1 */}
                                <div className="absolute right-0 -top-[15%] -translate-x-[50%] w-[300px]">
                                    <div className="relative rounded-2xl bg-white/40 backdrop-blur-sm p-4 border border-black/10 text-center">
                                        <p className="text-xs font-semibold text-gray-900">Filtros</p>
                                        <p className="mt-1 text-xs font-light text-gray-600 leading-relaxed">Busque por aluno, periodo e tipo de registro.</p>
                                        {/* Conector (desce em direção à imagem) */}
                                        <div className="absolute left-1/2 bottom-[-94px] -translate-x-1/2 w-px h-24 bg-[rgba(48,155,213,0.55)]" />
                                        <div className="absolute left-1/2 bottom-[-94px] -translate-x-1/2 h-2 w-2 rounded-full bg-[rgba(48,155,213,0.85)] ring-8 ring-[rgba(141,205,247,0.18)]" />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </PanelShell>

            {/* Painel 7: callout */}
            <PanelShell>
                <div className="relative overflow-hidden justify-center flex items-center w-full">
                    {/* detalhe clean */}

                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between pl-4 justify-center">
                        <div className="max-w-4xl text-center w-full flex flex-col items-center justify-center">
                            <p className="inline-flex items-center text-center justify-center w-full gap-2 font-medium tracking-widest uppercase text-gray-500 text-sm">
                                <span className="h-1 w-1 rounded-full bg-gray-500" />   
                                Visão geral
                            </p>
                            <h4 className="text-7xl font-regular text-primary pb-2">
                                Apenas uma <span className="font-extrabold">amostra</span> do que YBY entrega.
                            </h4>
                            <p className="mt-5 text-sm sm:text-base font-light text-gray-700 leading-relaxed max-w-xl">
                                As funcionalidades que você viu aqui são apenas algumas. O sistema pode ser configurado para diferentes rotinas,
                                regras e necessidades — do registro ao acompanhamento, relatórios e insights.
                            </p>


                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-20 w-full lg:w-auto flex items-center justify-center">
                            <div className="border-l-3 flex  flex-col items-start justify-center border-primary pl-2 h-10">
                                <p className="text-xs uppercase tracking-widest text-gray-500">Implantação</p>
                                <p className="text-md font-semibold text-gray-700">Menos de 48h</p>
                            </div>
                            <div className="border-l-3 flex  flex-col items-start justify-center border-primary pl-2 h-10 ">
                                <p className="text-xs uppercase tracking-widest text-gray-500">Adoção</p>
                                <p className="text-md font-semibold text-gray-700">Rápida e guiada</p>
                            </div>
                            <div className="border-l-3 flex  flex-col items-start justify-center border-primary pl-2 h-10">
                                <p className="text-xs uppercase tracking-widest text-gray-500">Escala</p>
                                <p className=" text-md font-semibold text-gray-700">Por aluno</p>
                            </div>
                        </div>
                        <div className="mt-6 flex flex-col w-full justify-center items-center gap-3 mb-5">
                            <p className="text-xs uppercase tracking-widest text-gray-500">
                                Quer ver o que faz sentido para sua operação?
                            </p>
                            <button
                                type="button"
                                onClick={goToPlans}
                                className="bg-primary rounded-full px-30 py-3 text-sm font-semibold text-white  cursor-pointer transition-all duration-300 hover:scale-102 "
                            >
                                Ver planos disponíveis
                            </button>

                        </div>
                    </div>
                </div>
            </PanelShell>
        </>
    );
}

