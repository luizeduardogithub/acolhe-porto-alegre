import { IonButton, IonIcon } from "@ionic/react";
import { logoWhatsapp } from "ionicons/icons";
import { WHATSAPP_URL } from "@/lib/contact";

/** Botão de contato direto com o desenvolvedor pelo WhatsApp. */
export function WhatsAppButton() {
  return (
    <IonButton
      expand="block"
      fill="outline"
      color="success"
      className="whatsapp-button"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IonIcon slot="start" icon={logoWhatsapp} aria-hidden="true" />
      Falar com o desenvolvedor
    </IonButton>
  );
}