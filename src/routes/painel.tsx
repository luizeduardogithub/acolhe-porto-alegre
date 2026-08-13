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
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { AppHeader } from "@/components/AppHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { getDemoSession, signOutDemo, DEMO_USER } from "@/lib/demo-session";
import { getInstitution, saveInstitutionProfile } from "@/lib/institutions-service";
import { timeAgo } from "@/lib/format";
import type { AvailabilityStatus, Institution, InstitutionKind } from "@/types/institution";

const KINDS: InstitutionKind[] = [
  "Albergue",
  "Abrigo",
  "Acolhimento",
  "Abrigo/Albergue",
  "Organização de serviço social / acolhimento",
];

type PetsChoice = "yes" | "no" | "unknown";

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
  const [institution, setInstitution] = useState<Institution | undefined>(() =>
    getInstitution(session.institutionId),
  );

  const [status, setStatus] = useState<AvailabilityStatus>(institution?.status ?? "UNKNOWN");
  const [name, setName] = useState(institution?.name ?? "");
  const [kind, setKind] = useState<InstitutionKind>(institution?.kind ?? "Albergue");
  const [neighborhood, setNeighborhood] = useState(institution?.neighborhood ?? "");
  const [address, setAddress] = useState(institution?.address ?? "");
  const [audience, setAudience] = useState(institution?.audience ?? "");
  const [phone, setPhone] = useState(institution?.phone ?? "");
  const [schedule, setSchedule] = useState(institution?.schedule ?? "");
  const [notes, setNotes] = useState(institution?.notes ?? "");
  const [pets, setPets] = useState<PetsChoice>(
    institution?.acceptsPets === true ? "yes" : institution?.acceptsPets === false ? "no" : "unknown",
  );
  const [savedAt, setSavedAt] = useState<string | null>(null);

  useEffect(() => {
    if (!getDemoSession()) navigate({ to: "/entrar" });
  }, [navigate]);

  if (!institution) return null;

  const missing = [
    !name.trim() && "nome",
    !neighborhood.trim() && "bairro",
    !address.trim() && "endereço",
    !phone.trim() && "telefone",
    !schedule.trim() && "horário",
    !audience.trim() && "público atendido",
    pets === "unknown" && "aceite de pets",
    status === "UNKNOWN" && "situação das vagas",
  ].filter(Boolean) as string[];

  function handleSave() {
    const updated = saveInstitutionProfile({
      institutionId: session.institutionId,
      name: name.trim(),
      kind,
      neighborhood: neighborhood.trim(),
      address: address.trim() || undefined,
      audience: audience.trim() || undefined,
      phone: phone.trim() || undefined,
      schedule: schedule.trim() || undefined,
      notes: notes.trim() || undefined,
      status,
      acceptsPets: pets === "yes" ? true : pets === "no" ? false : null,
    });
    if (updated) setInstitution(updated);
    setSavedAt(updated?.updatedAt ?? new Date().toISOString());
  }

  function handleSignOut() {
    signOutDemo();
    navigate({ to: "/app" });
  }

  return (
    <IonPage>
      <AppHeader title="Painel da instituição" backTo="/app" />
      <IonContent>
        <div className="panel-head">
          <p className="panel-user">Conectado como {session.name}</p>
          <h1 className="panel-title">{institution.name}</h1>
          <p className="panel-sub">
            {institution.kind} · {institution.neighborhood}
          </p>
          <div className="panel-current">
            <StatusBadge status={institution.status} />
            <span className="panel-updated">{timeAgo(institution.updatedAt)}</span>
          </div>
          {missing.length ? (
            <p className="panel-missing">Faltam preencher: {missing.join(", ")}.</p>
          ) : (
            <p className="panel-complete">Todos os informativos estão preenchidos.</p>
          )}
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
          <h2 className="panel-section-title">Identificação</h2>
          <IonList inset>
            <IonItem>
              <IonInput
                label="Nome da instituição"
                labelPlacement="stacked"
                placeholder="Ex.: Albergue Municipal"
                value={name}
                onIonInput={(e) => setName(e.detail.value ?? "")}
              />
            </IonItem>
            <IonItem>
              <IonSelect
                label="Tipo de serviço"
                labelPlacement="stacked"
                value={kind}
                onIonChange={(e) => setKind(e.detail.value as InstitutionKind)}
              >
                {KINDS.map((k) => (
                  <IonSelectOption key={k} value={k}>
                    {k}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonInput
                label="Bairro"
                labelPlacement="stacked"
                placeholder="Ex.: Floresta"
                value={neighborhood}
                onIonInput={(e) => setNeighborhood(e.detail.value ?? "")}
              />
            </IonItem>
            <IonItem>
              <IonInput
                label="Endereço completo"
                labelPlacement="stacked"
                placeholder="Rua, número"
                value={address}
                onIonInput={(e) => setAddress(e.detail.value ?? "")}
              />
            </IonItem>
          </IonList>
        </div>

        <div className="panel-section">
          <h2 className="panel-section-title">Atendimento</h2>
          <IonList inset>
            <IonItem>
              <IonInput
                label="Público atendido"
                labelPlacement="stacked"
                placeholder="Ex.: homens adultos, famílias, mulheres"
                value={audience}
                onIonInput={(e) => setAudience(e.detail.value ?? "")}
              />
            </IonItem>
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
              <IonSelect
                label="Aceita animais de estimação"
                labelPlacement="stacked"
                value={pets}
                onIonChange={(e) => setPets(e.detail.value as PetsChoice)}
              >
                <IonSelectOption value="yes">Sim</IonSelectOption>
                <IonSelectOption value="no">Não</IonSelectOption>
                <IonSelectOption value="unknown">Não informado</IonSelectOption>
              </IonSelect>
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
              Informações publicadas no app agora (protótipo: gravado apenas neste dispositivo).
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