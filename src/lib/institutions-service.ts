import { institutions as seed } from "@/data/institutions";
import type {
  Institution,
  InstitutionProfileInput,
  StatusUpdateInput,
} from "@/types/institution";

/**
 * Camada central de acesso aos dados. Hoje lê dados mockados em memória;
 * futuramente estas funções passam a consultar/gravar no banco, sem
 * alterar as páginas que as consomem.
 */
let store: Institution[] = [...seed];

/**
 * Persistência local (protótipo): o que a instituição preenche no painel fica
 * guardado no navegador para que o app público mostre os mesmos dados.
 */
const STORAGE_KEY = "acolhepoa.institution-overrides";
let hydrated = false;

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const overrides = JSON.parse(raw) as Record<string, Partial<Institution>>;
    store = store.map((item) =>
      overrides[item.institutionId] ? { ...item, ...overrides[item.institutionId] } : item,
    );
  } catch {
    /* ignora dados inválidos */
  }
}

function persist(institution: Institution) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const overrides = raw ? (JSON.parse(raw) as Record<string, Partial<Institution>>) : {};
    overrides[institution.institutionId] = institution;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
  } catch {
    /* armazenamento indisponível */
  }
}

export function listInstitutions(): Institution[] {
  hydrate();
  return store;
}

export function getInstitution(institutionId: string): Institution | undefined {
  hydrate();
  return store.find((i) => i.institutionId === institutionId);
}

/**
 * Atualização completa feita pela própria instituição no painel autenticado.
 */
export function saveInstitutionProfile(input: InstitutionProfileInput): Institution | undefined {
  hydrate();
  const updatedAt = new Date().toISOString();
  store = store.map((item) =>
    item.institutionId === input.institutionId ? { ...item, ...input, updatedAt } : item,
  );
  const updated = getInstitution(input.institutionId);
  if (updated) persist(updated);
  return updated;
}

/**
 * Ponto único de atualização de status. A aplicação pública não expõe esta
 * função na interface; ela existe para a futura área autenticada.
 */
export function updateInstitutionStatus(input: StatusUpdateInput): Institution | undefined {
  hydrate();
  store = store.map((item) =>
    item.institutionId === input.institutionId
      ? {
          ...item,
          status: input.status,
          notes: input.notes ?? item.notes,
          phone: input.phone ?? item.phone,
          schedule: input.schedule ?? item.schedule,
          acceptsPets: input.acceptsPets !== undefined ? input.acceptsPets : item.acceptsPets,
          updatedAt: new Date().toISOString(),
        }
      : item,
  );
  return getInstitution(input.institutionId);
}