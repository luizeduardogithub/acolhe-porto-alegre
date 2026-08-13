import { useSyncExternalStore } from "react";
import {
  getStoreVersion,
  listAuditEntries,
  listInstitutions,
  getAdminStats,
  subscribe,
} from "@/lib/institutions-service";
import type { AdminStatsData } from "@/lib/institutions-service";
import type { AuditEntry, Institution } from "@/types/institution";

/**
 * Assina o serviço central para que a área pública e a administrativa
 * compartilhem exatamente os mesmos dados, sem cópia paralela.
 */
function useStoreVersion(): number {
  return useSyncExternalStore(
    subscribe,
    () => getStoreVersion(),
    () => 0,
  );
}

export function useInstitutions(): Institution[] {
  useStoreVersion();
  return listInstitutions();
}

export function useAdminStats(): AdminStatsData {
  useStoreVersion();
  return getAdminStats();
}

export function useAuditEntries(limit = 10): AuditEntry[] {
  useStoreVersion();
  return listAuditEntries(limit);
}
