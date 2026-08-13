/** Registro do service worker (apenas no navegador, após o load). */
export function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  if (import.meta.env.DEV) {
    // Em desenvolvimento o SW em cache-first quebra os módulos do Vite (HMR).
    void navigator.serviceWorker.getRegistrations().then((rs) => rs.forEach((r) => void r.unregister()));
    void caches?.keys().then((keys) => keys.forEach((k) => void caches.delete(k)));
    return;
  }
  const register = () => {
    navigator.serviceWorker.register("/sw.js").catch((error) => {
      console.warn("Falha ao registrar o service worker", error);
    });
  };
  if (document.readyState === "complete") register();
  else window.addEventListener("load", register, { once: true });
}

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}
