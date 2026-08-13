import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import {
  arrowBackOutline,
  globeOutline,
  informationCircleOutline,
  personCircleOutline,
} from "ionicons/icons";
import { useNavigate } from "@tanstack/react-router";

interface AppHeaderProps {
  title: string;
  backTo?: string;
  showAbout?: boolean;
  showLogin?: boolean;
  showSite?: boolean;
}

export function AppHeader({ title, backTo, showAbout, showLogin, showSite }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <IonHeader>
      <IonToolbar color="primary">
        {backTo || showSite ? (
          <IonButtons slot="start">
            {backTo ? (
              <IonButton onClick={() => navigate({ to: backTo })} aria-label="Voltar">
                <IonIcon slot="icon-only" icon={arrowBackOutline} />
              </IonButton>
            ) : (
              <IonButton onClick={() => navigate({ to: "/" })} aria-label="Voltar para o site">
                <IonIcon slot="icon-only" icon={globeOutline} />
              </IonButton>
            )}
          </IonButtons>
        ) : null}
        <IonTitle>{title}</IonTitle>
        {showAbout ? (
          <IonButtons slot="end">
            {showLogin ? (
              <IonButton onClick={() => navigate({ to: "/entrar" })} aria-label="Área da instituição">
                <IonIcon slot="icon-only" icon={personCircleOutline} />
              </IonButton>
            ) : null}
            <IonButton onClick={() => navigate({ to: "/sobre" })} aria-label="Sobre o AcolhePOA">
              <IonIcon slot="icon-only" icon={informationCircleOutline} />
            </IonButton>
          </IonButtons>
        ) : null}
      </IonToolbar>
    </IonHeader>
  );
}