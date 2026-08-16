"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

type Post = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  cover_image_url: string | null;
  status: string;
};

const STATUS_OPTIONS = [
  { key: "rascunho",  label: "Rascunho" },
  { key: "publicado", label: "Publicado" },
  { key: "arquivado", label: "Arquivado" },
];

export default function PostForm({
  post,
  action,
}: {
  post?: Post;
  action: (fd: FormData) => Promise<void>;
}) {
  const [error, setError]     = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await action(fd);
        router.push("/admin/blog");
      } catch (err: any) {
        if (err?.digest?.startsWith?.("NEXT_REDIRECT")) return;
        setError(err.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)", maxWidth: 640 }}>
      <Field label="Título *" name="title" required defaultValue={post?.title} />
      <Field label="Slug" name="slug" defaultValue={post?.slug} placeholder="gerado do título se vazio" />
      <Field label="Resumo" name="excerpt" defaultValue={post?.excerpt ?? ""} />
      <Field label="Capa (URL da imagem)" name="cover_image_url" defaultValue={post?.cover_image_url ?? ""} placeholder="https://..." />

      <div>
        <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
          Conteúdo (markdown)
        </label>
        <textarea
          name="content"
          defaultValue={post?.content ?? ""}
          rows={12}
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
            fontFamily: "monospace",
          }}
        />
      </div>

      <div>
        <label style={{ fontSize: 11, fontWeight: 600, color: "var(--color-muted-foreground)", display: "block", marginBottom: "var(--space-2)" }}>
          Status
        </label>
        <select
          name="status"
          defaultValue={post?.status ?? "rascunho"}
          style={{
            width: "100%",
            padding: "var(--space-2) var(--space-3)",
            background: "var(--color-background)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            fontSize: 12,
            color: "var(--color-foreground)",
          }}
        >
          {STATUS_OPTIONS.map(({ key, label }) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {error && (
        <p style={{ fontSize: 12, color: "var(--color-destructive)" }}>{error}</p>
      )}

      <div className="flex items-center justify-end" style={{ gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
        <button
          type="button"
          onClick={() => router.push("/admin/blog")}
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
  label, name, defaultValue, required, placeholder,
}: {
  label: string; name: string; defaultValue?: string; required?: boolean; placeholder?: string;
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
