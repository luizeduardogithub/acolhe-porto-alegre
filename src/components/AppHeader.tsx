import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from "@ionic/react";
import { arrowBackOutline, informationCircleOutline } from "ionicons/icons";
import { useNavigate } from "@tanstack/react-router";

interface AppHeaderProps {
  title: string;
  backTo?: string;
  showAbout?: boolean;
}

export function AppHeader({ title, backTo, showAbout }: AppHeaderProps) {
  const navigate = useNavigate();

  return (
    <IonHeader>
      <IonToolbar color="primary">
        {backTo ? (
          <IonButtons slot="start">
            <IonButton onClick={() => navigate({ to: backTo })} aria-label="Voltar">
              <IonIcon slot="icon-only" icon={arrowBackOutline} />
            </IonButton>
          </IonButtons>
        ) : null}
        <IonTitle>{title}</IonTitle>
        {showAbout ? (
          <IonButtons slot="end">
            <IonButton onClick={() => navigate({ to: "/sobre" })} aria-label="Sobre o AcolhePOA">
              <IonIcon slot="icon-only" icon={informationCircleOutline} />
            </IonButton>
          </IonButtons>
        ) : null}
      </IonToolbar>
    </IonHeader>
  );
}