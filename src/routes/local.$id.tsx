import { createFileRoute, notFound } from "@tanstack/react-router";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonToast,
  IonToolbar,
} from "@ionic/react";
import { callOutline, navigateOutline } from "ionicons/icons";
import { useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { DisclaimerNote } from "@/components/DisclaimerNote";
import { StatusBadge } from "@/components/StatusBadge";
import { getInstitution } from "@/lib/institutions-service";
import { mapsUrl, telHref, timeAgo } from "@/lib/format";

export const Route = createFileRoute("/local/$id")({
  head: () => ({
    meta: [
      { title: "Detalhes da unidade | AcolhePOA" },
      {
        name: "description",
        content:
          "Endereço, telefone, horário e situação informada de uma unidade de acolhimento em Porto Alegre.",
      },
      { property: "og:title", content: "Detalhes da unidade | AcolhePOA" },
      {
        property: "og:description",
        content: "Informações de contato e situação informada da unidade de acolhimento.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ params }) => {
    const institution = getInstitution(params.id);
    if (!institution) throw notFound();
    return institution;
  },
  component: DetalhesPage,
});

function Info({ label, value }: { label: string; value: string }) {
  return (
    <IonItem lines="full">
      <IonLabel className="ion-text-wrap">
        <h3 className="info-label">{label}</h3>
        <p className="info-value">{value}</p>
      </IonLabel>
    </IonItem>
  );
}

function DetalhesPage() {
  const institution = Route.useLoaderData();
  const [toast, setToast] = useState<string | null>(null);

  const fullAddress = [institution.address, institution.neighborhood, "Porto Alegre, RS"]
    .filter(Boolean)
    .join(", ");

  return (
    <IonPage>
      <AppHeader title="Detalhes" backTo="/" />
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <StatusBadge status={institution.status} />
            <IonCardTitle className="institution-title">{institution.name}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className="updated">{timeAgo(institution.updatedAt)} (dado demonstrativo)</p>
            {institution.status === "UNKNOWN" ? (
              <p className="unknown-note">
                Esta unidade não informou a situação de vagas. Confirme por telefone antes de se
                deslocar.
              </p>
            ) : null}
          </IonCardContent>
        </IonCard>

        <IonList inset>
          <Info label="Tipo" value={institution.kind} />
          <Info label="Endereço" value={institution.address ?? "Não informado"} />
          <Info label="Bairro" value={institution.neighborhood} />
          <Info label="Telefone" value={institution.phone ?? "Não informado"} />
          <Info label="Horário" value={institution.schedule ?? "Não informado"} />
          <Info label="Público atendido" value={institution.audience ?? "Não informado"} />
          <Info
            label="Aceita animais de estimação"
            value={
              institution.acceptsPets === null
                ? "Não informado"
                : institution.acceptsPets
                  ? "Sim"
                  : "Não"
            }
          />
          <Info label="Observações" value={institution.notes ?? "Não informado"} />
        </IonList>

        <DisclaimerNote />
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <div className="footer-actions">
            <IonButton
              expand="block"
              size="large"
              onClick={() => {
                if (institution.phone) {
                  window.location.href = telHref(institution.phone);
                } else {
                  setToast("Telefone não informado para esta unidade.");
                }
              }}
            >
              <IonIcon slot="start" icon={callOutline} aria-hidden="true" />
              Ligar
            </IonButton>
            <IonButton
              expand="block"
              size="large"
              fill="outline"
              onClick={() =>
                window.open(mapsUrl(`${institution.name}, ${fullAddress}`), "_blank", "noopener")
              }
            >
              <IonIcon slot="start" icon={navigateOutline} aria-hidden="true" />
              Como chegar
            </IonButton>
          </div>
        </IonToolbar>
      </IonFooter>

      <IonToast
        isOpen={toast !== null}
        message={toast ?? ""}
        duration={2500}
        onDidDismiss={() => setToast(null)}
      />
    </IonPage>
  );
}
