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