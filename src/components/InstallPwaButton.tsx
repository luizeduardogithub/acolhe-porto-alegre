import { IonAlert, IonButton, IonIcon } from "@ionic/react";
import { downloadOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import type { BeforeInstallPromptEvent } from "@/lib/pwa";

/** Botão "Instalar app": usa o prompt do navegador quando disponível ou explica o passo a passo. */
export function InstallPwaButton() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setDeferred(null);
      setInstalled(true);
    };
    if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  if (installed) return null;

  return (
    <>
    <IonButton
      expand="block"
      fill="outline"
      className="install-pwa"
      onClick={async () => {
        if (!deferred) {
          setHelpOpen(true);
          return;
        }
        await deferred.prompt();
        await deferred.userChoice;
        setDeferred(null);
      }}
    >
      <IonIcon slot="start" icon={downloadOutline} aria-hidden="true" />
      Instalar app no celular
    </IonButton>
      <IonAlert
        isOpen={helpOpen}
        header="Instalar o AcolhePOA"
        message="No Android (Chrome): toque no menu ⋮ e escolha “Instalar app” ou “Adicionar à tela inicial”. No iPhone (Safari): toque em Compartilhar e depois em “Adicionar à Tela de Início”."
        buttons={["Entendi"]}
        onDidDismiss={() => setHelpOpen(false)}
      />
    </>
  );
}
