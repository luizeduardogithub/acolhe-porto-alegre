import { IonBadge } from "@ionic/react";
import { timeAgo } from "@/lib/format";

/**
 * "Desatualizado" NÃO altera a situação informada — apenas sinaliza que o dado
 * está velho (mais de 24h).
 */
export function StaleBadge({ updatedAt }: { updatedAt: string }) {
  return (
    <IonBadge color="warning" className="stale-badge">
      ⚠️ Informação desatualizada · {timeAgo(updatedAt).replace("Atualizado ", "")}
    </IonBadge>
  );
}