import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonToggle,
} from "@ionic/react";
import { useState } from "react";
import type {
  AvailabilityStatus,
  Institution,
  InstitutionKind,
  NewInstitutionInput,
} from "@/types/institution";
import { STATUS_LABEL } from "@/lib/status";
import { timeAgo } from "@/lib/format";

const KINDS: InstitutionKind[] = [
  "Albergue",
  "Abrigo",
  "Acolhimento",
  "Abrigo/Albergue",
  "Organização de serviço social / acolhimento",
];

type PetsChoice = "yes" | "no" | "unknown";

/** Formulário reutilizado para cadastro e edição. Não contém regra de negócio. */
export function InstitutionForm({
  institution,
  onSubmit,
  onCancel,
}: {
  institution?: Institution | undefined;
  onSubmit: (data: NewInstitutionInput) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(institution?.name ?? "");
  const [kind, setKind] = useState<InstitutionKind>(institution?.kind ?? "Albergue");
  const [neighborhood, setNeighborhood] = useState(institution?.neighborhood ?? "");
  const [address, setAddress] = useState(institution?.address ?? "");
  const [phone, setPhone] = useState(institution?.phone ?? "");
  const [schedule, setSchedule] = useState(institution?.schedule ?? "");
  const [audience, setAudience] = useState(institution?.audience ?? "");
  const [notes, setNotes] = useState(institution?.notes ?? "");
  const [status, setStatus] = useState<AvailabilityStatus>(institution?.status ?? "UNKNOWN");
  const [pets, setPets] = useState<PetsChoice>(
    institution?.acceptsPets === true ? "yes" : institution?.acceptsPets === false ? "no" : "unknown",
  );
  const [touched, setTouched] = useState(false);

  const invalid = !name.trim() || !neighborhood.trim();

  function handleSubmit() {
    setTouched(true);
    if (invalid) return;
    onSubmit({
      name: name.trim(),
      kind,
      neighborhood: neighborhood.trim(),
      address: address.trim() || undefined,
      phone: phone.trim() || undefined,
      schedule: schedule.trim() || undefined,
      audience: audience.trim() || undefined,
      notes: notes.trim() || undefined,
      status,
      acceptsPets: pets === "yes" ? true : pets === "no" ? false : null,
    });
  }

  return (
    <div className="admin-form">
      <IonList inset>
        <IonItem>
          <IonInput
            label="Nome *"
            labelPlacement="stacked"
            value={name}
            onIonInput={(e) => setName(e.detail.value ?? "")}
            placeholder="Nome da instituição"
          />
        </IonItem>
        <IonItem>
          <IonSelect
            label="Tipo"
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
            label="Bairro *"
            labelPlacement="stacked"
            value={neighborhood}
            onIonInput={(e) => setNeighborhood(e.detail.value ?? "")}
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Endereço"
            labelPlacement="stacked"
            value={address}
            onIonInput={(e) => setAddress(e.detail.value ?? "")}
            placeholder="Não informado"
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Telefone"
            labelPlacement="stacked"
            inputmode="tel"
            value={phone}
            onIonInput={(e) => setPhone(e.detail.value ?? "")}
            placeholder="Não informado"
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Horário de funcionamento"
            labelPlacement="stacked"
            value={schedule}
            onIonInput={(e) => setSchedule(e.detail.value ?? "")}
            placeholder="Não informado"
          />
        </IonItem>
        <IonItem>
          <IonInput
            label="Público atendido"
            labelPlacement="stacked"
            value={audience}
            onIonInput={(e) => setAudience(e.detail.value ?? "")}
            placeholder="Não informado"
          />
        </IonItem>
        <IonItem>
          <IonToggle
            checked={pets === "yes"}
            onIonChange={(e) => setPets(e.detail.checked ? "yes" : "no")}
          >
            Aceita pets
          </IonToggle>
        </IonItem>
        <IonItem>
          <IonSelect
            label="Aceita pets (detalhe)"
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
          <IonSelect
            label="Situação de vagas"
            labelPlacement="stacked"
            value={status}
            onIonChange={(e) => setStatus(e.detail.value as AvailabilityStatus)}
          >
            <IonSelectOption value="AVAILABLE">{STATUS_LABEL.AVAILABLE}</IonSelectOption>
            <IonSelectOption value="FULL">{STATUS_LABEL.FULL}</IonSelectOption>
            <IonSelectOption value="UNKNOWN">{STATUS_LABEL.UNKNOWN}</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonTextarea
            label="Observações"
            labelPlacement="stacked"
            autoGrow
            rows={3}
            value={notes}
            onIonInput={(e) => setNotes(e.detail.value ?? "")}
            placeholder="Não informado"
          />
        </IonItem>
        <IonItem lines="none">
          <IonLabel className="admin-form-meta">
            Última atualização:{" "}
            {institution ? timeAgo(institution.updatedAt) : "gerada automaticamente ao salvar"}
          </IonLabel>
        </IonItem>
      </IonList>

      {touched && invalid ? (
        <p className="admin-form-error">Informe ao menos nome e bairro.</p>
      ) : null}

      <div className="admin-form-actions">
        <IonButton expand="block" onClick={handleSubmit}>
          Salvar
        </IonButton>
        <IonButton expand="block" fill="clear" color="medium" onClick={onCancel}>
          Cancelar
        </IonButton>
      </div>
    </div>
  );
}