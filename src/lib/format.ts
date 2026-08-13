/** "Atualizado há X minutos" em linguagem simples. */
export function timeAgo(iso: string): string {
  const diffMin = Math.max(0, Math.round((Date.now() - new Date(iso).getTime()) / 60_000));
  if (diffMin < 1) return "Atualizado agora";
  if (diffMin === 1) return "Atualizado há 1 minuto";
  if (diffMin < 60) return `Atualizado há ${diffMin} minutos`;
  const hours = Math.round(diffMin / 60);
  if (hours === 1) return "Atualizado há 1 hora";
  if (hours < 24) return `Atualizado há ${hours} horas`;
  const days = Math.round(hours / 24);
  return days === 1 ? "Atualizado há 1 dia" : `Atualizado há ${days} dias`;
}

export function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

export function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}