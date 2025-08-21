import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignUpFormClient from "@/components/auth/signup-form-client";

export default async function SignUpPage({ searchParams }) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!error && user) {
    redirect("/profile");
  }

  return <SignUpFormClient searchParams={searchParams} />;
}
