import { createFileRoute, Link } from "@tanstack/react-router";
import { DEVELOPER_NAME, DEVELOPER_PHONE_DISPLAY, WHATSAPP_URL } from "@/lib/contact";

const TITLE = "AcolhePOA | Locais de acolhimento em Porto Alegre";
const DESCRIPTION =
  "AcolhePOA reúne locais de acolhimento para pessoas em situação de rua em Porto Alegre, com situação de vagas informada por cada unidade. Protótipo demonstrativo.";

const faq: { q: string; a: string }[] = [
  {
    q: "O AcolhePOA garante uma vaga de acolhimento?",
    a: "Não. O aplicativo apenas mostra a situação informada por cada unidade. A vaga só é confirmada no próprio local, e a disponibilidade pode mudar a qualquer momento.",
  },
  {
    q: "Os dados exibidos são reais?",
    a: "Não. Esta versão é um protótipo demonstrativo e utiliza dados fictícios, criados apenas para mostrar como o aplicativo funcionaria.",
  },
  {
    q: "Preciso instalar alguma coisa para usar?",
    a: "Não. O AcolhePOA funciona pelo navegador do celular ou do computador. Se quiser, é possível adicioná-lo à tela inicial do celular e usá-lo como um aplicativo.",
  },
  {
    q: "O aplicativo mostra quantas vagas existem?",
    a: "Não. A informação é simplificada em três situações: com vagas, sem vagas ou não informado. Isso torna a atualização rápida para quem trabalha na unidade.",
  },
  {
    q: "Como minha instituição pode participar?",
    a: "A criação de conta depende de autorização. Basta falar com o desenvolvedor pelo WhatsApp (51) 99818-4976 e pedir a liberação do acesso da unidade.",
  },
  {
    q: "O aplicativo coleta dados de quem consulta?",
    a: "Não. Nesta versão não há cadastro, login real nem coleta de dados de quem consulta a lista de locais.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AcolhePOA",
          url: "/",
          description: DESCRIPTION,
          inLanguage: "pt-BR",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }),
      },
    ],
  }),
  component: SitePage,
});

const features = [
  {
    title: "Lista de locais",
    text: "Unidades de acolhimento organizadas por nome, bairro e endereço, com link direto para o mapa.",
  },
  {
    title: "Situação de vagas",
    text: "Cada unidade informa se está com vagas, sem vagas ou se a situação não foi informada.",
  },
  {
    title: "Busca e filtros",
    text: "Encontre rapidamente por nome ou bairro e filtre pela situação atual das vagas.",
  },
  {
    title: "Aceite de animais",
    text: "Indicação de unidades que aceitam pets, um dos principais motivos de recusa de acolhimento.",
  },
  {
    title: "Área da instituição",
    text: "A própria unidade atualiza seus dados e a situação das vagas em um painel simples.",
  },
  {
    title: "Funciona no celular",
    text: "Feito para uso em campo: pode ser instalado na tela inicial e usado como aplicativo.",
  },
];

function SitePage() {
  return (
    <main className="min-h-screen bg-[#f4f7f6] text-[#14322f]">
      <div className="mx-auto w-full max-w-3xl px-5 py-10">
        <p className="inline-block rounded-full bg-[#0f5c63] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
          Protótipo demonstrativo
        </p>
        <h1 className="mt-5 text-4xl font-extrabold leading-tight text-[#0f5c63]">
          AcolhePOA — informações sobre locais de acolhimento em Porto Alegre
        </h1>
        <p className="mt-4 text-lg text-[#3d514e]">
          Um aplicativo simples para que pessoas em situação de rua, agentes sociais e serviços
          públicos encontrem locais de acolhimento e vejam a situação de vagas informada por cada
          unidade.
        </p>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/app"
            className="rounded-xl bg-[#0f5c63] px-6 py-3 text-center text-base font-bold text-white"
          >
            Acessar o aplicativo
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border-2 border-[#0f5c63] px-6 py-3 text-center text-base font-bold text-[#0f5c63]"
          >
            Falar no WhatsApp
          </a>
        </div>

        <section
          className="mt-8 rounded-xl border border-[#e0a800] bg-[#fff8e1] p-4 text-sm leading-relaxed"
          aria-label="Aviso"
        >
          <strong>Aviso importante:</strong> este site e o aplicativo são um{" "}
          <strong>protótipo demonstrativo</strong>. Os dados exibidos são fictícios, não representam
          a situação real das unidades e não garantem vaga ou acolhimento. Confirme sempre
          diretamente com a instituição.
        </section>

        <section className="mt-12" aria-labelledby="recursos">
          <h2 id="recursos" className="text-2xl font-extrabold text-[#0f5c63]">
            O que o aplicativo oferece
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {features.map((f) => (
              <article key={f.title} className="rounded-xl bg-white p-4 shadow-sm">
                <h3 className="text-base font-bold text-[#14322f]">{f.title}</h3>
                <p className="mt-1 text-sm text-[#4a5654]">{f.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12" aria-labelledby="como-funciona">
          <h2 id="como-funciona" className="text-2xl font-extrabold text-[#0f5c63]">
            Como funciona
          </h2>
          <ol className="mt-4 space-y-3 text-[#3d514e]">
            <li>
              <strong>1.</strong> A instituição acessa a área restrita e preenche os dados da
              unidade.
            </li>
            <li>
              <strong>2.</strong> A unidade atualiza a situação das vagas: com vagas, sem vagas ou
              não informado.
            </li>
            <li>
              <strong>3.</strong> Qualquer pessoa consulta a lista, busca por bairro e vê o endereço
              no mapa.
            </li>
          </ol>
        </section>

        <section className="mt-12" aria-labelledby="contato">
          <h2 id="contato" className="text-2xl font-extrabold text-[#0f5c63]">
            Fale com o desenvolvedor
          </h2>
          <p className="mt-3 text-[#3d514e]">
            Dúvidas, sugestões ou interesse em levar o AcolhePOA para a sua instituição? Converse
            com {DEVELOPER_NAME} pelo WhatsApp {DEVELOPER_PHONE_DISPLAY}.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-xl bg-[#128c7e] px-6 py-3 text-base font-bold text-white"
          >
            Falar com {DEVELOPER_NAME} no WhatsApp
          </a>
        </section>

        <footer className="mt-14 border-t border-[#d8e2e0] pt-6 text-sm text-[#5c6a68]">
          <nav className="flex flex-wrap gap-4">
            <Link to="/app">Aplicativo</Link>
            <Link to="/sobre">Sobre</Link>
            <Link to="/entrar">Área da instituição</Link>
          </nav>
          <p className="mt-4">
            AcolhePOA — protótipo demonstrativo, sem vínculo oficial com órgãos públicos.
          </p>
        </footer>
      </div>
    </main>
  );
}