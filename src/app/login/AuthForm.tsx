"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { LogIn, UserPlus, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";

type Tab = "login" | "register";

export default function AuthForm() {
  const router = useRouter();

  const [tab,      setTab]      = useState<Tab>("login");
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [confirm,  setConfirm]  = useState("");
  const [showPwd,  setShowPwd]  = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [success,  setSuccess]  = useState<string | null>(null);

  function reset() {
    setError(null);
    setSuccess(null);
  }

  function switchTab(t: Tab) {
    setTab(t);
    reset();
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    reset();
    setLoading(true);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Email ou senha incorretos.");
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    const isStaff = profile?.role === "admin" || profile?.role === "agent";
    router.push(isStaff ? "/admin" : "/");
    router.refresh();
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    reset();
    const supabase = createClient();

    if (password !== confirm) {
      setError("As senhas não coincidem.");
      return;
    }
    if (password.length < 6) {
      setError("A senha deve ter ao menos 6 caracteres.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name.trim() } },
    });

    if (error) {
      setError(error.message === "User already registered"
        ? "Este email já está cadastrado. Tente fazer login."
        : "Não foi possível criar a conta. Tente novamente.");
      setLoading(false);
      return;
    }

    setSuccess("Conta criada! Verifique seu email para confirmar o cadastro.");
    setLoading(false);
  }

  const isLogin = tab === "login";

  return (
    <div>
      {/* Tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          background: "var(--color-muted)",
          borderRadius: "var(--radius-md)",
          padding: 4,
          marginBottom: "var(--space-8)",
        }}
      >
        {(["login", "register"] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => switchTab(t)}
            style={{
              padding: "var(--space-2) var(--space-4)",
              borderRadius: "calc(var(--radius-md) - 2px)",
              border: "none",
              cursor: "pointer",
              fontSize: "var(--text-caption)",
              fontWeight: 600,
              transition: "background 150ms, color 150ms, box-shadow 150ms",
              background: tab === t ? "var(--color-surface)" : "transparent",
              color: tab === t ? "var(--color-primary)" : "var(--color-muted-foreground)",
              boxShadow: tab === t ? "var(--shadow-sm)" : "none",
            }}
          >
            {t === "login" ? "Entrar" : "Criar conta"}
          </button>
        ))}
      </div>

      {/* Success */}
      {success && (
        <div
          className="flex items-start"
          style={{ gap: "var(--space-3)", padding: "var(--space-4)", background: "var(--color-success-bg)", borderRadius: "var(--radius-md)", marginBottom: "var(--space-6)", border: "1px solid rgba(22,163,74,0.2)" }}
        >
          <CheckCircle size={16} color="var(--color-success)" style={{ flexShrink: 0, marginTop: 1 }} />
          <span style={{ fontSize: "var(--text-caption)", color: "var(--color-success)", lineHeight: 1.5 }}>{success}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={isLogin ? handleLogin : handleRegister} style={{ display: "flex", flexDirection: "column", gap: "var(--space-4)" }}>

        {!isLogin && (
          <Field label="Nome completo">
            <input
              className="input"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </Field>
        )}

        <Field label="Email">
          <input
            className="input"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
        </Field>

        <Field label="Senha">
          <div style={{ position: "relative" }}>
            <input
              className="input"
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={isLogin ? "current-password" : "new-password"}
              style={{ paddingRight: 44 }}
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              style={{
                position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer",
                color: "var(--color-muted-foreground)", padding: 0,
              }}
            >
              {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </Field>

        {!isLogin && (
          <Field label="Confirmar senha">
            <input
              className="input"
              type={showPwd ? "text" : "password"}
              placeholder="••••••••"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              autoComplete="new-password"
            />
          </Field>
        )}

        {isLogin && (
          <div style={{ textAlign: "right", marginTop: -8 }}>
            <span style={{ fontSize: 12, color: "var(--color-primary-light)", cursor: "pointer" }}>
              Esqueci minha senha
            </span>
          </div>
        )}

        {error && (
          <div
            className="flex items-center"
            style={{ gap: "var(--space-2)", padding: "var(--space-3)", background: "var(--color-destructive-bg)", borderRadius: "var(--radius-md)", border: "1px solid rgba(220,38,38,0.2)" }}
          >
            <AlertCircle size={14} color="var(--color-destructive)" style={{ flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "var(--color-destructive)" }}>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
          style={{ marginTop: "var(--space-2)", justifyContent: "center", width: "100%", opacity: loading ? 0.7 : 1 }}
        >
          {isLogin
            ? <><LogIn size={15} />{loading ? "Entrando..." : "Entrar"}</>
            : <><UserPlus size={15} />{loading ? "Criando conta..." : "Criar conta"}</>
          }
        </button>
      </form>

      {/* Switch hint */}
      <p style={{ textAlign: "center", fontSize: 12, color: "var(--color-muted-foreground)", marginTop: "var(--space-6)" }}>
        {isLogin ? "Não tem conta? " : "Já tem conta? "}
        <button
          type="button"
          onClick={() => switchTab(isLogin ? "register" : "login")}
          style={{ background: "none", border: "none", cursor: "pointer", color: "var(--color-primary-light)", fontWeight: 600, fontSize: 12, padding: 0 }}
        >
          {isLogin ? "Criar agora" : "Entrar"}
        </button>
      </p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-2)" }}>
      <label style={{ fontSize: "var(--text-caption)", fontWeight: 600, color: "var(--color-foreground)" }}>
        {label}
      </label>
      {children}
    </div>
  );
}
