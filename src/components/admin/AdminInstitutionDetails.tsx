import { IonButton, IonIcon, IonItem, IonLabel, IonList } from "@ionic/react";
import { createOutline, trashOutline } from "ionicons/icons";
import type { AvailabilityStatus, Institution } from "@/types/institution";
import { StatusBadge } from "@/components/StatusBadge";
import { StaleBadge } from "./StaleBadge";
import { InstitutionStatusControl } from "./InstitutionStatusControl";
import { isStale } from "@/lib/institutions-service";
import { timeAgo } from "@/lib/format";

const NOT_INFORMED = "Não informado";

export function AdminInstitutionDetails({
  institution,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  institution: Institution;
  onEdit: () => void;
  onDelete: () => void;
  onStatusChange: (status: AvailabilityStatus) => void;
}) {
  const rows: Array<[string, string]> = [
    ["Tipo", institution.kind],
    ["Bairro", institution.neighborhood],
    ["Endereço", institution.address ?? NOT_INFORMED],
    ["Telefone", institution.phone ?? NOT_INFORMED],
    ["Horário de funcionamento", institution.schedule ?? NOT_INFORMED],
    ["Público atendido", institution.audience ?? NOT_INFORMED],
    [
      "Aceita pets",
      institution.acceptsPets === null ? NOT_INFORMED : institution.acceptsPets ? "Sim" : "Não",
    ],
    ["Observações", institution.notes ?? NOT_INFORMED],
    ["Última atualização", timeAgo(institution.updatedAt)],
    ["Fonte da informação", "Administração do sistema"],
  ];

  return (
    <div className="admin-details">
      <div className="admin-details-head">
        <h2>{institution.name}</h2>
        <StatusBadge status={institution.status} />
        {isStale(institution) ? <StaleBadge updatedAt={institution.updatedAt} /> : null}
      </div>

      <IonList inset>
        {rows.map(([label, value]) => (
          <IonItem key={label}>
            <IonLabel>
              <p className="admin-details-label">{label}</p>
              <span className="admin-details-value">{value}</span>
            </IonLabel>
          </IonItem>
        ))}
      </IonList>

      <div className="admin-card-actions">
        <InstitutionStatusControl
          institution={institution}
          onChange={onStatusChange}
          size="default"
        />
        <IonButton fill="outline" onClick={onEdit}>
          <IonIcon slot="start" icon={createOutline} aria-hidden="true" />
          Editar
        </IonButton>
        <IonButton fill="outline" color="danger" onClick={onDelete}>
          <IonIcon slot="start" icon={trashOutline} aria-hidden="true" />
          Excluir
        </IonButton>
      </div>
    </div>
  );
}