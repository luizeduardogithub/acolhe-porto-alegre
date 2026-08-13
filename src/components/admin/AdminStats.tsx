import { IonCard, IonCardContent, IonCol, IonGrid, IonRow } from "@ionic/react";
import type { AdminStatsData } from "@/lib/institutions-service";

const CARDS: Array<{ key: string; label: string; tone: string }> = [
  { key: "total", label: "instituições", tone: "neutral" },
  { key: "AVAILABLE", label: "com vagas", tone: "ok" },
  { key: "FULL", label: "sem vagas", tone: "bad" },
  { key: "UNKNOWN", label: "não informadas", tone: "warn" },
  { key: "stale", label: "informações desatualizadas", tone: "stale" },
];

export function AdminStats({ stats }: { stats: AdminStatsData }) {
  const value = (key: string) =>
    key === "total"
      ? stats.total
      : key === "stale"
        ? stats.stale
        : stats.byStatus[key as "AVAILABLE" | "FULL" | "UNKNOWN"];

  return (
    <IonGrid className="admin-grid">
      <IonRow>
        {CARDS.map((card) => (
          <IonCol key={card.key} size="6" sizeMd="4" sizeLg="2.4">
            <IonCard className={`admin-stat admin-stat--${card.tone}`}>
              <IonCardContent>
                <span className="admin-stat-value">{value(card.key)}</span>
                <span className="admin-stat-label">{card.label}</span>
              </IonCardContent>
            </IonCard>
          </IonCol>
        ))}
      </IonRow>
    </IonGrid>
  );
}