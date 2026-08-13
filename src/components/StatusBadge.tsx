import { IonBadge } from "@ionic/react";
import type { AvailabilityStatus } from "@/types/institution";
import { STATUS_COLOR, STATUS_DOT, STATUS_LABEL } from "@/lib/status";

export function StatusBadge({ status }: { status: AvailabilityStatus }) {
  return (
    <IonBadge
      color={STATUS_COLOR[status]}
      className="status-badge"
      aria-label={`Situação: ${STATUS_LABEL[status]}`}
    >
      <span aria-hidden="true">{STATUS_DOT[status]}</span> {STATUS_LABEL[status]}
    </IonBadge>
  );
}