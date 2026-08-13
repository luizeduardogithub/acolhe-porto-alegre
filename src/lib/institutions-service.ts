import { institutions as seed } from "@/data/institutions";
import type { Institution, StatusUpdateInput } from "@/types/institution";

/**
 * Camada central de acesso aos dados. Hoje lê dados mockados em memória;
 * futuramente estas funções passam a consultar/gravar no banco, sem
 * alterar as páginas que as consomem.
 */
let store: Institution[] = [...seed];

export function listInstitutions(): Institution[] {
  return store;
}

export function getInstitution(institutionId: string): Institution | undefined {
  return store.find((i) => i.institutionId === institutionId);
}

/**
 * Ponto único de atualização de status. A aplicação pública não expõe esta
 * função na interface; ela existe para a futura área autenticada.
 */
export function updateInstitutionStatus(input: StatusUpdateInput): Institution | undefined {
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