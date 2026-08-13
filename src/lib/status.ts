import type { AvailabilityStatus } from "@/types/institution";

export const STATUS_LABEL: Record<AvailabilityStatus, string> = {
  AVAILABLE: "Vagas disponíveis",
  FULL: "Sem vagas",
  UNKNOWN: "Não informado",
};

/** Cores Ionic associadas a cada status (verde / vermelho / amarelo). */
export const STATUS_COLOR: Record<AvailabilityStatus, string> = {
  AVAILABLE: "success",
  FULL: "danger",
  UNKNOWN: "warning",
};

export const STATUS_DOT: Record<AvailabilityStatus, string> = {
  AVAILABLE: "🟢",
  FULL: "🔴",
  UNKNOWN: "🟡",
};

/**
 * Janela após a qual, no futuro, um status sem atualização deverá ser
 * considerado "Não informado". A regra ainda não é aplicada.
 */
export const STALE_AFTER_MINUTES = 720;

export function isStatus(value: string): value is AvailabilityStatus {
  return value === "AVAILABLE" || value === "FULL" || value === "UNKNOWN";
}