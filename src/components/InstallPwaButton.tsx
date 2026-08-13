import { IonButton, IonIcon } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import type { BeforeInstallPromptEvent } from "@/lib/pwa";

/** Botão "Instalar app" exibido apenas quando o navegador oferece a instalação. */
export function InstallPwaButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setDeferred(null);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (!deferred) return null;

  return (
    <IonButton
      expand="block"
      fill="outline"
      className="install-pwa"
      onClick={async () => {
        await deferred.prompt();
        await deferred.userChoice;
        setDeferred(null);
      }}
    >
      <IonIcon slot="start" icon={downloadOutline} aria-hidden="true" />
      Instalar app no celular
    </IonButton>
  );
}
