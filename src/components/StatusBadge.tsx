import { IonBadge } from "@ionic/react";
import type { AvailabilityStatus } from "@/types/institution";
import { STATUS_COLOR, STATUS_LABEL } from "@/lib/status";

export function StatusBadge({ status }: { status: AvailabilityStatus }) {
  return (
    <IonBadge
      color={STATUS_COLOR[status]}
      className="status-badge"
      aria-label={`Situação: ${STATUS_LABEL[status]}`}
    >
      <span className="status-dot" aria-hidden="true" /> {STATUS_LABEL[status]}
    </IonBadge>
  );
}