import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  IonIcon,
  IonButton,
  IonContent,
  IonNote,
  IonPage,
  IonSpinner,
} from "@ionic/react";
import { logoWhatsapp } from "ionicons/icons";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { GoogleMark } from "@/components/GoogleMark";
import { signInDemo } from "@/lib/demo-session";
import { WHATSAPP_ACCESS_URL } from "@/lib/contact";

export const Route = createFileRoute("/entrar")({
  head: () => ({
    meta: [
      { title: "Entrar | AcolhePOA" },
      {
        name: "description",
        content:
          "Área das instituições do AcolhePOA: entre com a conta Google da unidade para atualizar a situação de vagas.",
      },
      { property: "og:title", content: "Entrar | AcolhePOA" },
      {
        property: "og:description",
        content: "Acesso das instituições para atualizar a situação de vagas no AcolhePOA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EntrarPage,
});

function EntrarPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  function handleSignIn() {
    setLoading(true);
    signInDemo();
    // Protótipo navegável: simulamos o retorno do provedor antes de seguir.
    window.setTimeout(() => navigate({ to: "/painel" }), 600);
  }

  return (
    <IonPage>
      <AppHeader title="Área da instituição" backTo="/app" />
      <IonContent>
        <div className="login-wrap">
          <div className="login-badge" aria-hidden="true">
            AcolhePOA
          </div>
          <h1 className="login-title">Acesso da instituição</h1>
          <p className="login-text">
            Entre com a conta Google da unidade para informar se há vagas disponíveis. Somente
            representantes das instituições cadastradas têm acesso.
          </p>

          <IonButton
            expand="block"
            fill="outline"
            className="google-button"
            onClick={handleSignIn}
            disabled={loading}
          >
            {loading ? (
              <IonSpinner name="crescent" />
            ) : (
              <>
                <span className="google-mark">
                  <GoogleMark />
                </span>
                Entrar com Google
              </>
            )}
          </IonButton>

          <IonNote className="login-note">
            Protótipo navegável: nenhum login real é realizado e nenhum dado é enviado.
          </IonNote>

          <div className="login-divider">
            <span>Ainda não tem conta?</span>
          </div>

          <IonButton
            expand="block"
            fill="outline"
            color="success"
            href={WHATSAPP_ACCESS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IonIcon slot="start" icon={logoWhatsapp} aria-hidden="true" />
            Criar conta com Google
          </IonButton>
          <IonNote className="login-note">
            A criação de conta depende de autorização. Ao tocar acima, você pede a autorização a
            Eduardo pelo WhatsApp (51) 99818-4976; depois disso, o acesso com Google é liberado para
            a instituição.
          </IonNote>
        </div>
      </IonContent>
    </IonPage>
  );
}