import { createClient } from "@/lib/supabase/server";
import PageHeader   from "../_components/PageHeader";
import PipelineView from "./PipelineView";

export const metadata = { title: "Pipeline — Admin" };

export default async function PipelinePage() {
  const supabase = await createClient();

  const { data: leads } = await supabase
    .from("leads")
    .select("id, stage, destination, estimated_value, group_size, travel_date_from, travel_date_to, duration_days, budget_min, budget_max, flexible_dates, observations, created_at, contacts(full_name, phone)")
    .not("stage", "in", '("concluido","em_preparacao","em_viagem")')
    .order("created_at", { ascending: false });

  const count = leads?.length ?? 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <PageHeader
        title="Pipeline"
        sub={`${count} lead${count !== 1 ? "s" : ""}`}
      />
      <PipelineView leads={(leads ?? []) as any} />
    </div>
  );
}
