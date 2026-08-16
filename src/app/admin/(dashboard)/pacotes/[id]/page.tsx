import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import PageHeader from "../../_components/PageHeader";
import PackageForm from "../PackageForm";
import { updatePackage } from "../actions";

export const metadata = { title: "Editar pacote — Admin" };

export default async function EditarPacotePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: pkg } = await supabase
    .from("packages")
    .select("id, name, slug, tagline, destination, countries, cities, duration_days, price_from, photo_url, badge, profile_text, highlights, includes, not_includes, is_active, is_popular")
    .eq("id", id)
    .single();

  if (!pkg) notFound();

  return (
    <div>
      <Link
        href="/admin/pacotes"
        style={{ display: "inline-flex", alignItems: "center", gap: "var(--space-1)", fontSize: "var(--admin-label-fs)", color: "var(--color-muted-foreground)", textDecoration: "none", marginBottom: "var(--space-4)" }}
      >
        <ArrowLeft size={12} />
        Pacotes
      </Link>

      <PageHeader title={pkg.name} />

      <PackageForm pkg={pkg} action={updatePackage.bind(null, id)} />
    </div>
  );
}
