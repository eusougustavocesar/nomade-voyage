export const PAYMENT_STATUS_MAP: Record<string, { label: string; color: string; bg: string }> = {
  pendente:    { label: "Pendente",    color: "var(--color-muted-foreground)", bg: "var(--color-muted)" },
  pago:        { label: "Pago",        color: "var(--color-success)",          bg: "var(--color-success-bg)" },
  atrasado:    { label: "Atrasado",    color: "var(--color-destructive)",      bg: "var(--color-destructive-bg)" },
  cancelado:   { label: "Cancelado",   color: "var(--color-muted-foreground)", bg: "var(--color-muted)" },
  reembolsado: { label: "Reembolsado", color: "var(--color-purple)",           bg: "var(--color-purple-bg)" },
};
