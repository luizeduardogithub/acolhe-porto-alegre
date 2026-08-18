/** Contextos onde o service worker nunca deve ser registrado (preview/dev/iframe). */
function isBlockedContext() {
  if (window.self !== window.top) return true;
  const host = window.location.hostname;
  // Servidor de desenvolvimento local
  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) return true;
  if (host.startsWith("id-preview--") || host.startsWith("preview--")) return true;
  const blocked = ["lovableproject.com", "lovableproject-dev.com", "beta.lovable.dev"];
  if (blocked.some((d) => host === d || host.endsWith(`.${d}`))) return true;
  if (new URLSearchParams(window.location.search).has("sw")) {
    return new URLSearchParams(window.location.search).get("sw") === "off";
  }
  return false;
}

async function unregisterAppWorkers() {
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.allSettled(
    regs
      .filter((r) => (r.active ?? r.waiting ?? r.installing)?.scriptURL.endsWith("/sw.js"))
      .map((r) => r.unregister()),
  );
}

/** Registro do service worker (apenas em produção, fora do preview). */
export function registerServiceWorker() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
  if (isBlockedContext()) {
    void unregisterAppWorkers();
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
