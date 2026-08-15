"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateLeadStage(leadId: string, stage: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("leads")
    .update({ stage: stage as any })
    .eq("id", leadId);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/pipeline");
}
