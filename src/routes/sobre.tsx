import { createFileRoute } from "@tanstack/react-router";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonPage,
} from "@ionic/react";
import { AppHeader } from "@/components/AppHeader";
import { IonButton } from "@ionic/react";
import { useNavigate } from "@tanstack/react-router";
import { DisclaimerNote } from "@/components/DisclaimerNote";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre o AcolhePOA | Locais de acolhimento em Porto Alegre" },
      {
        name: "description",
        content:
          "Saiba o que é o AcolhePOA, protótipo que reúne informações sobre locais de acolhimento em Porto Alegre com dados demonstrativos.",
      },
      { property: "og:title", content: "Sobre o AcolhePOA" },
      {
        property: "og:description",
        content:
          "Protótipo para facilitar a localização de informações sobre locais de acolhimento em Porto Alegre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SobrePage,
});

function SobrePage() {
  const navigate = useNavigate();
  return (
    <IonPage>
      <AppHeader title="Sobre o AcolhePOA" backTo="/app" />
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>O que é o AcolhePOA</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>
              O AcolhePOA é um protótipo de aplicativo criado para facilitar a localização de
              informações sobre locais de acolhimento em Porto Alegre.
            </p>
            <p>
              Esta versão utiliza dados demonstrativos. A disponibilidade real deve ser confirmada
              diretamente com a instituição.
            </p>
          </IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Como a situação é exibida</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p>🟢 Vagas disponíveis</p>
            <p>🔴 Sem vagas</p>
            <p>🟡 Não informado</p>
            <p>
              O aplicativo não informa quantidade de vagas: a intenção é manter a informação simples
              e fácil de atualizar pela própria instituição.
            </p>
          </IonCardContent>
        </IonCard>

        <DisclaimerNote />

        <div className="ion-padding-vertical">
          <IonButton
            expand="block"
            fill="clear"
            size="small"
            color="medium"
            onClick={() => navigate({ to: "/admin" })}
          >
            Painel administrativo (demonstração)
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}
