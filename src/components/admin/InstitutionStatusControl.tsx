import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { swapHorizontalOutline } from "ionicons/icons";
import { useState } from "react";
import type { AvailabilityStatus, Institution } from "@/types/institution";
import { STATUS_DOT, STATUS_LABEL } from "@/lib/status";

const OPTIONS: AvailabilityStatus[] = ["AVAILABLE", "FULL", "UNKNOWN"];

/**
 * Alteração rápida da situação, sem abrir o formulário completo.
 * A gravação é delegada ao serviço central pelo callback onChange.
 */
export function InstitutionStatusControl({
  institution,
  onChange,
  size = "small",
}: {
  institution: Institution;
  onChange: (status: AvailabilityStatus) => void;
  size?: "small" | "default";
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IonButton size={size} fill="outline" onClick={() => setOpen(true)}>
        <IonIcon slot="start" icon={swapHorizontalOutline} aria-hidden="true" />
        Alterar situação
      </IonButton>
      <IonAlert
        isOpen={open}
        header="Situação das vagas"
        subHeader={institution.name}
        onDidDismiss={() => setOpen(false)}
        inputs={OPTIONS.map((status) => ({
          type: "radio" as const,
          label: `${STATUS_DOT[status]} ${STATUS_LABEL[status]}`,
          value: status,
          checked: institution.status === status,
        }))}
        buttons={[
          { text: "Cancelar", role: "cancel" },
          {
            text: "Salvar",
            handler: (value: AvailabilityStatus) => {
              if (value) onChange(value);
            },
          },
        ]}
      />
    </>
  );
}