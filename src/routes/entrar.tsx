import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  IonButton,
  IonContent,
  IonNote,
  IonPage,
  IonSpinner,
} from "@ionic/react";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { GoogleMark } from "@/components/GoogleMark";
import { signInDemo } from "@/lib/demo-session";

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
      <AppHeader title="Área da instituição" backTo="/" />
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
        </div>
      </IonContent>
    </IonPage>
  );
}