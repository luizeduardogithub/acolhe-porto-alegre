/**
 * Sessão de demonstração (apenas navegável). Não há autenticação real:
 * guardamos o "login" no sessionStorage só para a navegação fazer sentido.
 */
const KEY = "acolhepoa.demo-session";

export interface DemoSession {
  name: string;
  email: string;
  institutionId: string;
}

export const DEMO_USER: DemoSession = {
  name: "Maria Souza",
  email: "maria.souza@acolher1.org.br",
  institutionId: "acolher-1",
};

export function signInDemo(): DemoSession {
  if (typeof window !== "undefined") {
    window.sessionStorage.setItem(KEY, JSON.stringify(DEMO_USER));
  }
  return DEMO_USER;
}

export function signOutDemo() {
  if (typeof window !== "undefined") window.sessionStorage.removeItem(KEY);
}

export function getDemoSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  const raw = window.sessionStorage.getItem(KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
}