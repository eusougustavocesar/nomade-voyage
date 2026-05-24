"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogIn, AlertCircle } from "lucide-react";

export default function LoginForm() {
  const router   = useRouter();
  const supabase = createClient();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState<string | null>(null);
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Email ou senha inválidos.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <label style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>
          Email
        </label>
        <input
          type="email"
          className="input"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
        <label style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>
          Senha
        </label>
        <input
          type="password"
          className="input"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
      </div>

      {error && (
        <div className="flex items-center" style={{ gap: "var(--space-2)", padding: "var(--space-3)", background: "var(--color-destructive-bg)", borderRadius: "var(--radius-md)" }}>
          <AlertCircle size={15} color="var(--color-destructive)" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: "var(--text-caption)", color: "var(--color-destructive)" }}>{error}</span>
        </div>
      )}

      <button
        type="submit"
        className="btn-primary"
        disabled={loading}
        style={{ marginTop: "var(--space-2)", justifyContent: "center", opacity: loading ? 0.7 : 1 }}
      >
        <LogIn size={16} />
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
