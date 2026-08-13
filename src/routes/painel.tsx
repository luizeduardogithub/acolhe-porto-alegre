import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonTextarea,
  IonToggle,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { getDemoSession, signOutDemo, DEMO_USER } from "@/lib/demo-session";
import { getInstitution, updateInstitutionStatus } from "@/lib/institutions-service";
import { timeAgo } from "@/lib/format";
import type { AvailabilityStatus } from "@/types/institution";

export const Route = createFileRoute("/painel")({
  head: () => ({
    meta: [
      { title: "Painel da instituição | AcolhePOA" },
      {
        name: "description",
        content:
          "Painel demonstrativo onde a instituição atualiza a situação de vagas, contato, horário e aceite de pets.",
      },
      { property: "og:title", content: "Painel da instituição | AcolhePOA" },
      {
        property: "og:description",
        content: "Atualize a situação de vagas da sua unidade no AcolhePOA.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  ssr: false,
  component: PainelPage,
});

function PainelPage() {
  const navigate = useNavigate();
  const session = getDemoSession() ?? DEMO_USER;
  const institution = getInstitution(session.institutionId);

  const [status, setStatus] = useState<AvailabilityStatus>(institution?.status ?? "UNKNOWN");
  const [phone, setPhone] = useState(institution?.phone ?? "");
  const [schedule, setSchedule] = useState(institution?.schedule ?? "");
  const [notes, setNotes] = useState(institution?.notes ?? "");
  const [pets, setPets] = useState(institution?.acceptsPets === true);
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!getDemoSession()) navigate({ to: "/entrar" });
  }, [navigate]);

  if (!institution) return null;

  function handleSave() {
    const updated = updateInstitutionStatus({
      institutionId: session.institutionId,
      status,
      phone: phone || undefined,
      schedule: schedule || undefined,
      notes: notes || undefined,
      acceptsPets: pets,
    });
    setSavedAt(updated?.updatedAt ?? new Date().toISOString());
  }

  function handleSignOut() {
    signOutDemo();
    navigate({ to: "/" });
  }

  return (
    <IonPage>
      <AppHeader title="Painel da instituição" backTo="/" />
      <IonContent>
        <div className="panel-head">
          <p className="panel-user">Conectado como {session.name}</p>
          <h1 className="panel-title">{institution.name}</h1>
          <p className="panel-sub">
            {institution.kind} · {institution.neighborhood}
          </p>
          <div className="panel-current">
            <StatusBadge status={institution.status} />
            <span className="panel-updated">Atualizado {timeAgo(institution.updatedAt)}</span>
          </div>
        </div>

        <div className="panel-section">
          <h2 className="panel-section-title">Situação das vagas</h2>
          <IonSegment
            value={status}
            onIonChange={(e) => setStatus(e.detail.value as AvailabilityStatus)}
          >
            <IonSegmentButton value="AVAILABLE">
              <IonLabel>Com vagas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="FULL">
              <IonLabel>Sem vagas</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="UNKNOWN">
              <IonLabel>Não informado</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        <div className="panel-section">
          <h2 className="panel-section-title">Dados da unidade</h2>
          <IonList inset>
            <IonItem>
              <IonInput
                label="Telefone"
                labelPlacement="stacked"
                inputmode="tel"
                placeholder="(51) 0000-0000"
                value={phone}
                onIonInput={(e) => setPhone(e.detail.value ?? "")}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Horário de atendimento"
                labelPlacement="stacked"
                placeholder="Ex.: todos os dias, 18h às 8h"
                value={schedule}
                onIonInput={(e) => setSchedule(e.detail.value ?? "")}
              />
            </IonItem>
            <IonItem>
              <IonToggle checked={pets} onIonChange={(e) => setPets(e.detail.checked)}>
                Aceita animais de estimação
              </IonToggle>
            </IonItem>
            <IonItem>
              <IonTextarea
                label="Observações"
                labelPlacement="stacked"
                autoGrow
                rows={3}
                placeholder="Informações úteis para quem procura acolhimento"
                value={notes}
                onIonInput={(e) => setNotes(e.detail.value ?? "")}
              />
            </IonItem>
          </IonList>
        </div>

        <div className="panel-section">
          <IonButton expand="block" onClick={handleSave} className="panel-save">
            Salvar atualização
          </IonButton>
          {savedAt ? (
            <IonNote className="panel-saved" role="status">
              Informações atualizadas agora (protótipo: os dados não são gravados).
            </IonNote>
          ) : null}
          <IonButton expand="block" fill="clear" color="medium" onClick={handleSignOut}>
            Sair da conta
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}