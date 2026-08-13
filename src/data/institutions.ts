import type { Institution } from "@/types/institution";

/** Gera um horário fictício coerente (X minutos atrás) para os dados demonstrativos. */
const minutesAgo = (minutes: number) =>
  new Date(Date.now() - minutes * 60_000).toISOString();

/**
 * DADOS DEMONSTRATIVOS. Não representam a situação real das unidades.
 * Campos deixados propositalmente editáveis e sem informações inventadas.
 */
export const institutions: Institution[] = [
  {
    institutionId: "acolher-1",
    name: "Acolher 1",
    kind: "Albergue",
    neighborhood: "Floresta",
    status: "AVAILABLE",
    updatedAt: minutesAgo(12),
    acceptsPets: null,
  },
  {
    institutionId: "acolher-2",
    name: "Acolher 2",
    kind: "Albergue",
    neighborhood: "Santa Maria Goretti",
    address: "Rua Morretes, 345",
    status: "FULL",
    updatedAt: minutesAgo(38),
    acceptsPets: null,
  },
  {
    institutionId: "acolher-3",
    name: "Acolher 3",
    kind: "Acolhimento",
    neighborhood: "Floresta",
    status: "AVAILABLE",
    updatedAt: minutesAgo(55),
    acceptsPets: null,
  },
  {
    institutionId: "albergue-dias-da-cruz",
    name: "Albergue Dias da Cruz",
    kind: "Albergue",
    neighborhood: "Azenha",
    status: "FULL",
    updatedAt: minutesAgo(95),
    acceptsPets: null,
  },
  {
    institutionId: "abrigo-municipal-marlene",
    name: "Abrigo Municipal Marlene",
    kind: "Abrigo/Albergue",
    neighborhood: "Menino Deus",
    address: "Avenida Getúlio Vargas, 40",
    status: "UNKNOWN",
    updatedAt: minutesAgo(420),
    acceptsPets: null,
  },
  {
    institutionId: "abrigo-bom-jesus",
    name: "Abrigo Bom Jesus",
    kind: "Abrigo",
    neighborhood: "Bom Jesus",
    address: "Rua São Domingos, 165",
    status: "AVAILABLE",
    updatedAt: minutesAgo(25),
    acceptsPets: null,
  },
  {
    institutionId: "abrigo-conego-paulo-de-nadal",
    name: "Abrigo Cônego Paulo De Nadal",
    kind: "Abrigo",
    neighborhood: "Praia de Belas",
    address: "Avenida Padre Cacique, 1372",
    status: "UNKNOWN",
    updatedAt: minutesAgo(300),
    acceptsPets: null,
  },
  {
    institutionId: "abrigo-joao-paulo-ii",
    name: "Abrigo João Paulo II",
    kind: "Abrigo",
    neighborhood: "Vila Nova",
    address: "Estrada Aracaju, 650",
    status: "UNKNOWN",
    updatedAt: minutesAgo(510),
    acceptsPets: null,
  },
  {
    institutionId: "albergue-acolher-2",
    name: "Albergue Acolher 2",
    kind: "Organização de serviço social / acolhimento",
    neighborhood: "Santa Maria Goretti",
    address: "Rua Morretes, 345",
    status: "FULL",
    updatedAt: minutesAgo(70),
    acceptsPets: null,
  },
];