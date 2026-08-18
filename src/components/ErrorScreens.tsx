import { Link, useRouter } from "@tanstack/react-router";
import { WHATSAPP_URL } from "@/lib/contact";

function Frame({
  badge,
  title,
  description,
  children,
}: {
  badge: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="site-page flex min-h-screen items-center justify-center px-5 py-10">
      <div className="w-full max-w-md text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-[color:var(--ion-color-primary,#0f5c63)]">
          {badge}
        </p>
        <h1 className="mt-3 text-2xl font-extrabold text-[#10221f]">{title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-[#4b5f5c]">{description}</p>
        <div className="mt-7 flex flex-wrap justify-center gap-2">{children}</div>
        <p className="mt-8 text-xs text-[#7b8b89]">
          AcolhePOA — protótipo demonstrativo.{" "}
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">
            Falar com o desenvolvedor
          </a>
        </p>
      </div>
    </div>
  );
}

/** Página 404 personalizada do AcolhePOA. */
export function NotFoundScreen() {
  return (
    <Frame
      badge="Erro 404"
      title="Não encontramos esta página"
      description="O endereço pode estar incorreto, ou o local que você procura não está mais publicado no AcolhePOA."
    >
      <Link to="/" className="site-btn">
        Ir para o site
      </Link>
      <Link to="/app" className="site-btn site-btn--outline">
        Ver locais de acolhimento
      </Link>
    </Frame>
  );
}

/** Página de erro personalizada do AcolhePOA. */
export function ErrorScreen({ error, reset }: { error?: Error; reset?: () => void }) {
  const router = useRouter();
  if (error) console.error(error);
  return (
    <Frame
      badge="Ops"
      title="Esta página não carregou"
      description="Algo deu errado do nosso lado. Tente novamente em instantes ou volte para o início."
    >
      <button
        type="button"
        className="site-btn"
        onClick={() => {
          router.invalidate();
          reset?.();
        }}
      >
        Tentar de novo
      </button>
      <a href="/" className="site-btn site-btn--outline">
        Ir para o site
      </a>
    </Frame>
  );
}
