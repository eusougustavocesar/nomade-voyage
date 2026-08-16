import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageHeader from "../../_components/PageHeader";
import PackageForm from "../PackageForm";
import { createPackage } from "../actions";

export const metadata = { title: "Novo pacote — Admin" };

export default function NovoPacotePage() {
  return (
    <div>
      <Link
        href="/admin/pacotes"
        style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", textDecoration: "none", marginBottom: "var(--space-4)" }}
      >
        <ArrowLeft size={12} />
        Pacotes
      </Link>

      <PageHeader title="Novo pacote" />

      <PackageForm action={createPackage} />
    </div>
  );
}
