import { institutions as seed } from "@/data/institutions";
import type {
  AuditEntry,
  AvailabilityStatus,
  Institution,
  InstitutionProfileInput,
  NewInstitutionInput,
  StatusUpdateInput,
  UserRole,
} from "@/types/institution";
import { STATUS_LABEL, STALE_AFTER_MINUTES } from "@/lib/status";

/**
 * Camada central de acesso aos dados. Hoje lê dados mockados em memória;
 * futuramente estas funções passam a consultar/gravar no banco, sem
 * alterar as páginas que as consomem.
 *
 * Toda regra de negócio (criação, edição, exclusão, mudança de situação e
 * registro de histórico) vive aqui — as páginas apenas chamam estas funções.
 *
 * SEGURANÇA FUTURA: nenhuma checagem de permissão feita aqui vale como
 * proteção real. Quando houver backend, a autorização precisa ser aplicada no
 * servidor/banco (RLS), não na interface.
 */
let store: Institution[] = [...seed];
let auditLog: AuditEntry[] = [];

/**
 * Persistência local (protótipo): o que a instituição preenche no painel fica
 * guardado no navegador para que o app público mostre os mesmos dados.
 */
const STORAGE_KEY = "acolhepoa.institutions";
const AUDIT_KEY = "acolhepoa.audit-log";
const LEGACY_OVERRIDES_KEY = "acolhepoa.institution-overrides";
let hydrated = false;

/** Assinantes (React) que devem re-renderizar quando os dados mudam. */
const listeners = new Set<() => void>();
let snapshotVersion = 0;

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Identidade estável do snapshot para useSyncExternalStore. */
export function getStoreVersion(): number {
  hydrate();
  return snapshotVersion;
}

function emit() {
  snapshotVersion += 1;
  listeners.forEach((l) => l());
}

function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      store = JSON.parse(raw) as Institution[];
    } else {
      const legacy = window.localStorage.getItem(LEGACY_OVERRIDES_KEY);
      if (legacy) {
        const overrides = JSON.parse(legacy) as Record<string, Partial<Institution>>;
        store = store.map((item) =>
          overrides[item.institutionId] ? { ...item, ...overrides[item.institutionId] } : item,
        );
      }
    }
    const rawAudit = window.localStorage.getItem(AUDIT_KEY);
    if (rawAudit) auditLog = JSON.parse(rawAudit) as AuditEntry[];
  } catch {
    /* ignora dados inválidos */
  }
}

function persist() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    window.localStorage.setItem(AUDIT_KEY, JSON.stringify(auditLog.slice(0, 50)));
  } catch {
    /* armazenamento indisponível */
  }
}

/** Registra uma entrada de histórico (base para a futura auditoria no banco). */
function record(entry: Omit<AuditEntry, "id" | "createdAt">) {
  auditLog = [
    {
      ...entry,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
    },
    ...auditLog,
  ].slice(0, 50);
}

export function listAuditEntries(limit = 10): AuditEntry[] {
  hydrate();
  return auditLog.slice(0, limit);
}

/** Informação considerada velha (mais de 24h sem atualização). */
export function isStale(institution: Institution): boolean {
  const minutes = (Date.now() - new Date(institution.updatedAt).getTime()) / 60_000;
  return minutes > STALE_AFTER_MINUTES;
}

function slugify(value: string): string {
  return (
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "instituicao"
  );
}

export function listInstitutions(): Institution[] {
  hydrate();
  return store;
}

export function getInstitution(institutionId: string): Institution | undefined {
  hydrate();
  return store.find((i) => i.institutionId === institutionId);
}

/** Criação — no futuro, permitida apenas ao papel ADMIN (validado no backend). */
export function createInstitution(
  input: NewInstitutionInput,
  actor = "Administração do sistema",
  actorRole: UserRole = "ADMIN",
): Institution {
  hydrate();
  let id = slugify(input.name);
  while (store.some((i) => i.institutionId === id)) id = `${id}-${store.length + 1}`;
  const created: Institution = {
    ...input,
    institutionId: id,
    updatedAt: new Date().toISOString(),
  };
  store = [created, ...store];
  record({
    institutionId: id,
    institutionName: created.name,
    action: "CREATE",
    description: "instituição cadastrada",
    newStatus: created.status,
    actor,
    actorRole,
  });
  persist();
  emit();
  return created;
}

/** Exclusão — no futuro, permitida apenas ao papel ADMIN. */
export function deleteInstitution(
  institutionId: string,
  actor = "Administração do sistema",
  actorRole: UserRole = "ADMIN",
): boolean {
  hydrate();
  const target = getInstitution(institutionId);
  if (!target) return false;
  store = store.filter((i) => i.institutionId !== institutionId);
  record({
    institutionId,
    institutionName: target.name,
    action: "DELETE",
    description: "instituição excluída",
    actor,
    actorRole,
  });
  persist();
  emit();
  return true;
}

/**
 * Atualização completa feita pela própria instituição no painel autenticado.
 */
export function saveInstitutionProfile(
  input: InstitutionProfileInput,
  actor = "Instituição",
  actorRole: UserRole = "INSTITUTION",
): Institution | undefined {
  hydrate();
  const previous = getInstitution(input.institutionId);
  if (!previous) return undefined;
  const updatedAt = new Date().toISOString();
  store = store.map((item) =>
    item.institutionId === input.institutionId ? { ...item, ...input, updatedAt } : item,
  );
  const updated = getInstitution(input.institutionId);
  if (updated) {
    record({
      institutionId: updated.institutionId,
      institutionName: updated.name,
      action: "UPDATE",
      description:
        previous.status === updated.status
          ? "dados atualizados"
          : `situação alterada para ${STATUS_LABEL[updated.status]}`,
      previousStatus: previous.status,
      newStatus: updated.status,
      actor,
      actorRole,
    });
    persist();
    emit();
  }
  return updated;
}

/**
 * Ponto único de atualização de status. A aplicação pública não expõe esta
 * função na interface; ela existe para a futura área autenticada.
 */
export function updateInstitutionStatus(
  input: StatusUpdateInput,
  actor = "Administração do sistema",
  actorRole: UserRole = "ADMIN",
): Institution | undefined {
  hydrate();
  const previous = getInstitution(input.institutionId);
  if (!previous) return undefined;
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
  const updated = getInstitution(input.institutionId);
  if (updated) {
    record({
      institutionId: updated.institutionId,
      institutionName: updated.name,
      action: "STATUS_CHANGE",
      description: `situação alterada para ${STATUS_LABEL[updated.status]}`,
      previousStatus: previous.status,
      newStatus: updated.status,
      actor,
      actorRole,
    });
    persist();
    emit();
  }
  return updated;
}

/** Estatísticas do sistema, calculadas dinamicamente. */
export interface AdminStatsData {
  total: number;
  byStatus: Record<AvailabilityStatus, number>;
  stale: number;
}

export function getAdminStats(): AdminStatsData {
  hydrate();
  const byStatus: Record<AvailabilityStatus, number> = { AVAILABLE: 0, FULL: 0, UNKNOWN: 0 };
  let stale = 0;
  for (const item of store) {
    byStatus[item.status] += 1;
    if (isStale(item)) stale += 1;
  }
  return { total: store.length, byStatus, stale };
}