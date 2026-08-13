/**
 * Status de disponibilidade. Somente estes três valores são permitidos —
 * o app nunca informa quantidade de vagas.
 */
export type AvailabilityStatus = "AVAILABLE" | "FULL" | "UNKNOWN";

export type InstitutionKind =
  | "Albergue"
  | "Abrigo"
  | "Acolhimento"
  | "Abrigo/Albergue"
  | "Organização de serviço social / acolhimento";

export interface Institution {
  /** Identificador estável; futuramente a chave da instituição autenticada. */
  institutionId: string;
  name: string;
  kind: InstitutionKind;
  neighborhood: string;
  address?: string | undefined;
  phone?: string | undefined;
  schedule?: string | undefined;
  audience?: string | undefined;
  notes?: string | undefined;
  status: AvailabilityStatus;
  /** ISO string do momento da última atualização (demonstrativa). */
  updatedAt: string;
  /** Aceita animais de estimação — null = não informado. */
  acceptsPets: boolean | null;
}

/** Payload que uma futura área autenticada enviaria para atualizar a unidade. */
export interface StatusUpdateInput {
  institutionId: string;
  status: AvailabilityStatus;
  notes?: string | undefined;
  phone?: string | undefined;
  schedule?: string | undefined;
  acceptsPets?: boolean | null;
}

/** Payload completo do painel: a instituição preenche todos os informativos. */
export interface InstitutionProfileInput {
  institutionId: string;
  name: string;
  kind: InstitutionKind;
  neighborhood: string;
  address?: string | undefined;
  phone?: string | undefined;
  schedule?: string | undefined;
  audience?: string | undefined;
  notes?: string | undefined;
  status: AvailabilityStatus;
  acceptsPets: boolean | null;
}

/** Dados de criação de uma nova instituição (o id é gerado pelo serviço). */
export type NewInstitutionInput = Omit<InstitutionProfileInput, "institutionId">;

/**
 * Papéis previstos para quando o backend existir.
 * ATENÇÃO (segurança futura): estes papéis são apenas para a interface do
 * protótipo. Quando o backend for implementado, as permissões NÃO podem ser
 * controladas apenas no cliente — a autorização precisa ser garantida no
 * banco/servidor (ex.: RLS), de forma que:
 *  - uma instituição não consiga editar os dados de outra;
 *  - usuários públicos não consigam alterar nenhum dado;
 *  - somente administradores possam criar/excluir instituições.
 */
export type UserRole = "ADMIN" | "INSTITUTION" | "PUBLIC";

/** Registro de auditoria (estrutura preparada para o futuro banco). */
export interface AuditEntry {
  id: string;
  institutionId: string;
  institutionName: string;
  /** Descrição curta da alteração realizada. */
  action: "CREATE" | "UPDATE" | "STATUS_CHANGE" | "DELETE";
  description: string;
  previousStatus?: AvailabilityStatus | undefined;
  newStatus?: AvailabilityStatus | undefined;
  /** Usuário responsável — hoje demonstrativo. */
  actor: string;
  actorRole: UserRole;
  createdAt: string;
}