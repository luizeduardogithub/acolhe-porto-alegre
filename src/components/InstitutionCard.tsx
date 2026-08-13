import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonChip,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import {
  chevronForwardOutline,
  locationOutline,
  pawOutline,
  timeOutline,
  refreshOutline,
  mapOutline,
} from "ionicons/icons";
import { useNavigate } from "@tanstack/react-router";
import type { Institution } from "@/types/institution";
import { StatusBadge } from "./StatusBadge";
import { timeAgo, mapsUrl } from "@/lib/format";

export function InstitutionCard({ institution }: { institution: Institution }) {
  const navigate = useNavigate();
  const mapQuery = [institution.name, institution.address, institution.neighborhood, "Porto Alegre, RS"]
    .filter(Boolean)
    .join(", ");

  return (
    <IonCard className="institution-card">
      <IonCardHeader>
        <StatusBadge status={institution.status} />
        <IonCardTitle className="institution-title">{institution.name}</IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <p className="row">
          <IonIcon icon={locationOutline} aria-hidden="true" />
          <span>
            {institution.neighborhood}
            {institution.address ? ` · ${institution.address}` : ""}
          </span>
        </p>
        <p className="row">
          <IonIcon icon={mapOutline} aria-hidden="true" />
          <a
            className="map-link"
            href={mapsUrl(mapQuery)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ver endereço no mapa
          </a>
        </p>
        {institution.schedule ? (
          <p className="row">
            <IonIcon icon={timeOutline} aria-hidden="true" />
            <span>{institution.schedule}</span>
          </p>
        ) : null}
        <div className="chips">
          <IonChip outline>
            <IonLabel>{institution.kind}</IonLabel>
          </IonChip>
          <IonChip outline>
            <IonIcon icon={pawOutline} aria-hidden="true" />
            <IonLabel>
              Pets: {institution.acceptsPets === null ? "não informado" : institution.acceptsPets ? "aceita" : "não aceita"}
            </IonLabel>
          </IonChip>
        </div>
        <p className="row updated">
          <IonIcon icon={refreshOutline} aria-hidden="true" />
          <span>{timeAgo(institution.updatedAt)} (demonstrativo)</span>
        </p>
        <IonButton
          expand="block"
          size="default"
          onClick={() =>
            navigate({ to: "/local/$id", params: { id: institution.institutionId } })
          }
        >
          Ver detalhes
          <IonIcon slot="end" icon={chevronForwardOutline} aria-hidden="true" />
        </IonButton>
      </IonCardContent>
    </IonCard>
  );
}