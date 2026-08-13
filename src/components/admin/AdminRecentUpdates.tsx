import { IonItem, IonLabel, IonList, IonNote } from "@ionic/react";
import type { AuditEntry } from "@/types/institution";
import { timeAgo } from "@/lib/format";

/**
 * Histórico (protótipo). A estrutura já registra instituição, alteração,
 * status anterior, novo status, usuário responsável e data/hora — pronta para
 * virar uma tabela de auditoria quando houver backend.
 */
export function AdminRecentUpdates({ entries }: { entries: AuditEntry[] }) {
  return (
    <section className="admin-section">
      <h2 className="admin-section-title">Últimas atualizações</h2>
      {entries.length === 0 ? (
        <IonNote className="admin-note">
          Nenhuma alteração registrada nesta sessão de demonstração.
        </IonNote>
      ) : (
        <IonList inset>
          {entries.map((entry) => (
            <IonItem key={entry.id}>
              <IonLabel className="ion-text-wrap">
                <strong>{entry.institutionName}</strong> — {entry.description} —{" "}
                {timeAgo(entry.createdAt).replace("Atualizado ", "")}
                <p className="admin-details-label">Responsável: {entry.actor}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      )}
    </section>
  );
}