import {
  IonButton,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToggle,
} from "@ionic/react";
import { createOutline, eyeOutline, trashOutline } from "ionicons/icons";
import { useMemo, useState } from "react";
import type { AvailabilityStatus, Institution } from "@/types/institution";
import { StatusBadge } from "@/components/StatusBadge";
import { StaleBadge } from "./StaleBadge";
import { InstitutionStatusControl } from "./InstitutionStatusControl";
import { isStale } from "@/lib/institutions-service";
import { normalize, timeAgo } from "@/lib/format";

type Filter = "ALL" | AvailabilityStatus;
type SortMode = "recent" | "oldest" | "name";

export function AdminInstitutionList({
  institutions,
  onView,
  onEdit,
  onDelete,
  onStatusChange,
}: {
  institutions: Institution[];
  onView: (institution: Institution) => void;
  onEdit: (institution: Institution) => void;
  onDelete: (institution: Institution) => void;
  onStatusChange: (institution: Institution, status: AvailabilityStatus) => void;
}) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("ALL");
  const [sort, setSort] = useState<SortMode>("recent");
  const [onlyStale, setOnlyStale] = useState(false);

  const results = useMemo(() => {
    const q = normalize(query.trim());
    const filtered = institutions.filter((item) => {
      const matchesStatus = filter === "ALL" || item.status === filter;
      const matchesStale = !onlyStale || isStale(item);
      const matchesQuery =
        q.length === 0 ||
        normalize(item.name).includes(q) ||
        normalize(item.neighborhood).includes(q);
      return matchesStatus && matchesQuery && matchesStale;
    });
    return [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name, "pt-BR");
      const diff = new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      return sort === "recent" ? diff : -diff;
    });
  }, [institutions, query, filter, sort, onlyStale]);

  return (
    <section className="admin-section">
      <h2 className="admin-section-title">Instituições cadastradas</h2>

      <IonSearchbar
        value={query}
        onIonInput={(e) => setQuery(e.detail.value ?? "")}
        placeholder="Pesquisar por nome ou bairro"
        aria-label="Pesquisar por nome ou bairro"
      />

      <IonSegment
        scrollable
        value={filter}
        onIonChange={(e) => setFilter((e.detail.value as Filter) ?? "ALL")}
      >
        <IonSegmentButton value="ALL">
          <IonLabel>Todas</IonLabel>
        </IonSegmentButton>
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

      <IonList inset>
        <IonItem>
          <IonSelect
            label="Ordenar por"
            labelPlacement="stacked"
            value={sort}
            onIonChange={(e) => setSort(e.detail.value as SortMode)}
          >
            <IonSelectOption value="recent">Atualização mais recente</IonSelectOption>
            <IonSelectOption value="oldest">Atualização mais antiga</IonSelectOption>
            <IonSelectOption value="name">Nome (A–Z)</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem lines="none">
          <IonToggle checked={onlyStale} onIonChange={(e) => setOnlyStale(e.detail.checked)}>
            Somente informações desatualizadas
          </IonToggle>
        </IonItem>
      </IonList>

      {results.length === 0 ? (
        <IonText>
          <p className="empty">Nenhuma instituição encontrada com esses critérios.</p>
        </IonText>
      ) : (
        <div className="admin-cards">
          {results.map((item) => (
            <article key={item.institutionId} className="admin-card">
              <header className="admin-card-head">
                <div>
                  <h3>{item.name}</h3>
                  <p className="admin-card-sub">
                    {item.kind} · {item.neighborhood}
                  </p>
                </div>
                <StatusBadge status={item.status} />
              </header>
              <p className="admin-card-updated">{timeAgo(item.updatedAt)}</p>
              {isStale(item) ? <StaleBadge updatedAt={item.updatedAt} /> : null}
              <div className="admin-card-actions">
                <InstitutionStatusControl
                  institution={item}
                  onChange={(status) => onStatusChange(item, status)}
                />
                <IonButton size="small" fill="clear" onClick={() => onView(item)}>
                  <IonIcon slot="start" icon={eyeOutline} aria-hidden="true" />
                  Detalhes
                </IonButton>
                <IonButton size="small" fill="clear" onClick={() => onEdit(item)}>
                  <IonIcon slot="start" icon={createOutline} aria-hidden="true" />
                  Editar
                </IonButton>
                <IonButton
                  size="small"
                  fill="clear"
                  color="danger"
                  onClick={() => onDelete(item)}
                >
                  <IonIcon slot="start" icon={trashOutline} aria-hidden="true" />
                  Excluir
                </IonButton>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}