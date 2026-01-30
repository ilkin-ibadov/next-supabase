import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import {CornerDownLeft} from "lucide-react";

export default async function ProtectedPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <h1>Hello <CornerDownLeft/> </h1>
    </div>
  );
}
