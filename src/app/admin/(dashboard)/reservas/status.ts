export const STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  rascunho:   { label: "Rascunho",   color: "var(--color-muted-foreground)", bg: "var(--color-muted)" },
  confirmado: { label: "Confirmado", color: "var(--color-primary-light)",    bg: "var(--color-muted)" },
  pago:       { label: "Pago",       color: "var(--color-success)",          bg: "var(--color-success-bg)" },
  em_viagem:  { label: "Em viagem",  color: "var(--color-primary)",          bg: "var(--color-muted)" },
  concluido:  { label: "Concluído",  color: "var(--color-muted-foreground)", bg: "var(--color-muted)" },
  cancelado:  { label: "Cancelado",  color: "var(--color-destructive)",      bg: "var(--color-destructive-bg)" },
  reembolsado:{ label: "Reembolsado",color: "var(--color-purple)",           bg: "var(--color-purple-bg)" },
};
