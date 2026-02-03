import { useMemo, useState } from 'react';

export default function ContactCTA() {
  const [form, setForm] = useState({
    nome: '',
    instituicao: '',
    alunos: '',
    contato: ''
  });

  const mailto = useMemo(() => {
    const subject = encodeURIComponent('Contato — YBY (Landing)');
    const body = encodeURIComponent(
      `Nome: ${form.nome}\nInstituição: ${form.instituicao}\nQtd. alunos: ${form.alunos}\nContato (email/whatsapp): ${form.contato}\n\nMensagem:\n`
    );
    return `mailto:contato@yby.com.br?subject=${subject}&body=${body}`;
  }, [form]);

  return (
    <div className="mx-auto w-full max-w-7xl px-6 lg:px-10 py-14 lg:py-18">
      <div className="border border-black/10 bg-white/70 backdrop-blur p-8 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">Contato</p>
            <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-gray-900 leading-tight">
              Quer uma demonstração
              <br />
              com o seu cenário?
            </h3>
            <p className="mt-4 text-sm sm:text-base font-light text-gray-700 leading-relaxed">
              Envie alguns detalhes e a gente retorna com a melhor recomendação de plano e implantação.
            </p>

            <div className="mt-6 grid gap-3">
              {[
                { k: 'Resposta rápida', v: 'Em horário comercial' },
                { k: 'Implantação', v: 'Guiada e alinhada à rotina' },
                { k: 'Escala', v: 'Planos por aluno' }
              ].map((i) => (
                <div key={i.k} className="border-l-4 border-primary pl-4">
                  <p className="text-xs uppercase tracking-widest text-gray-500">{i.k}</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">{i.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <input
                value={form.nome}
                onChange={(e) => setForm((s) => ({ ...s, nome: e.target.value }))}
                placeholder="Seu nome"
                className="h-11 px-4 border border-black/10 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                value={form.instituicao}
                onChange={(e) => setForm((s) => ({ ...s, instituicao: e.target.value }))}
                placeholder="Instituição"
                className="h-11 px-4 border border-black/10 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                value={form.alunos}
                onChange={(e) => setForm((s) => ({ ...s, alunos: e.target.value }))}
                placeholder="Quantidade de alunos"
                className="h-11 px-4 border border-black/10 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
              <input
                value={form.contato}
                onChange={(e) => setForm((s) => ({ ...s, contato: e.target.value }))}
                placeholder="Email ou WhatsApp"
                className="h-11 px-4 border border-black/10 bg-white/90 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <a
                href={mailto}
                className="about-buttonPrimary rounded-full px-6 py-3 text-sm font-semibold text-white transition-opacity text-center"
              >
                Enviar e agendar
              </a>
              <p className="text-xs text-gray-500 uppercase tracking-widest">
                Sem compromisso • Você pode só tirar dúvidas
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

