"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Package = {
  id?: string;
  name: string;
  slug: string;
  tagline: string | null;
  destination: string;
  countries: string[] | null;
  cities: string[] | null;
  duration_days: number;
  price_from: number | null;
  photo_url: string | null;
  badge: string | null;
  profile_text: string | null;
  highlights: string[] | null;
  includes: string[] | null;
  not_includes: string[] | null;
  is_active: boolean;
  is_popular: boolean;
};

export default function PackageForm({
  pkg,
  action,
}: {
  pkg?: Package;
  action: (fd: FormData) => Promise<void>;
}) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await action(fd);
        router.push("/admin/pacotes");
      } catch (err: any) {
        if (err?.digest?.startsWith?.("NEXT_REDIRECT")) return;
        setError(err.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", maxWidth: 640 }}>
      <Field label="Nome *" name="name" required defaultValue={pkg?.name} />
      <Field label="Slug" name="slug" defaultValue={pkg?.slug} placeholder="gerado do nome se vazio" />
      <Field label="Tagline" name="tagline" defaultValue={pkg?.tagline ?? ""} />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
        <Field label="Destino *" name="destination" required defaultValue={pkg?.destination} />
        <Field label="Duração (dias) *" name="duration_days" type="number" required defaultValue={pkg?.duration_days} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
        <Field label="Países" name="countries" placeholder="Portugal, Espanha" defaultValue={pkg?.countries?.join(", ") ?? ""} />
        <Field label="Cidades" name="cities" placeholder="Lisboa, Porto" defaultValue={pkg?.cities?.join(", ") ?? ""} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)" }}>
        <Field label="Preço a partir de (R$)" name="price_from" type="number" defaultValue={pkg?.price_from ?? ""} />
        <Field label="Badge" name="badge" defaultValue={pkg?.badge ?? ""} placeholder="Exclusivo, Últimas vagas..." />
      </div>

      <Field label="Foto de capa (URL)" name="photo_url" defaultValue={pkg?.photo_url ?? ""} placeholder="https://..." />

      <TextArea label="Descrição" name="profile_text" defaultValue={pkg?.profile_text ?? ""} rows={4} />
      <TextArea label="Destaques (um por linha)" name="highlights" defaultValue={pkg?.highlights?.join("\n") ?? ""} rows={4} />
      <TextArea label="Inclui (um por linha)" name="includes" defaultValue={pkg?.includes?.join("\n") ?? ""} rows={4} />
      <TextArea label="Não inclui (um por linha)" name="not_includes" defaultValue={pkg?.not_includes?.join("\n") ?? ""} rows={4} />

      <div className="flex items-center" style={{ gap: "var(--space-6)" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: 12, color: "var(--color-muted-foreground)" }}>
          <input type="checkbox" name="is_active" defaultChecked={pkg?.is_active ?? true} />
          Ativo
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", fontSize: 12, color: "var(--color-muted-foreground)" }}>
          <input type="checkbox" name="is_popular" defaultChecked={pkg?.is_popular ?? false} />
          Popular
        </label>
      </div>

      {error && (
        <p style={{ fontSize: 12, color: "var(--color-destructive)" }}>{error}</p>
      )}

      <div className="flex items-center justify-end" style={{ gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
        <button
          type="button"
          onClick={() => router.push("/admin/pacotes")}
          style={{
            padding: "var(--space-2) var(--space-4)",
            background: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            fontSize: 12,
            cursor: "pointer",
            color: "var(--color-muted-foreground)",
          }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isPending}
          style={{
            padding: "var(--space-2) var(--space-4)",
            background: "var(--color-primary)",
            color: "#fff",
            border: "none",
            borderRadius: "var(--radius-md)",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            opacity: isPending ? 0.6 : 1,
          }}
        >
          {isPending ? "Salvando..." : "Salvar"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label, name, defaultValue, required, placeholder, type = "text",
}: {
  label: string; name: string; defaultValue?: string | number; required?: boolean; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
        {label}
      </label>
      <input
        name={name}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        type={type}
        style={{
          width: "100%",
          padding: "var(--space-2) var(--space-3)",
          background: "var(--color-background)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          fontSize: 12,
          color: "var(--color-foreground)",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}

function TextArea({
  label, name, defaultValue, rows,
}: {
  label: string; name: string; defaultValue?: string; rows: number;
}) {
  return (
    <div>
      <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
        {label}
      </label>
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={rows}
        style={{
          width: "100%",
          padding: "var(--space-3)",
          background: "var(--color-background)",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          fontSize: 12,
          color: "var(--color-foreground)",
          outline: "none",
          boxSizing: "border-box",
          resize: "vertical",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}
