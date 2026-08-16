export function fmtCurrency<F extends string | null = string>(v: number | null | undefined, fallback: F = "—" as F): string | F {
  if (!v) return fallback;
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(v);
}

type DateStyle = "compact" | "full" | "long";

export function fmtDate(d: string | null | undefined, style: DateStyle = "full") {
  if (!d) return "—";
  const date = new Date(d.includes("T") ? d : `${d}T12:00:00`);
  const opts: Intl.DateTimeFormatOptions =
    style === "compact" ? { day: "2-digit", month: "short" } :
    style === "long"    ? { day: "numeric", month: "long", year: "numeric" } :
                           { day: "numeric", month: "short", year: "numeric" };
  return date.toLocaleDateString("pt-BR", opts);
}
