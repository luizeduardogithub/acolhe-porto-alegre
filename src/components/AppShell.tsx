import { IonApp, setupIonicReact } from "@ionic/react";
import { useEffect, useState, type ReactNode } from "react";

setupIonicReact({ mode: "ios" });

/**
 * Casca Ionic única do app. Os componentes Ionic são web components que
 * alteram o DOM ao hidratar, então a árvore é montada apenas no cliente
 * para evitar divergências de hidratação. As rotas do TanStack Router
 * renderizam um IonPage dentro desta casca.
 */
export function AppShell({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <IonApp>{children}</IonApp>;
}
