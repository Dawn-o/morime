import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignInFormClient from "@/components/auth/signin-form-client";

export default async function SignInPage({ searchParams }) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!error && user) {
    redirect("/profile");
  }

  return <SignInFormClient searchParams={searchParams} />;
}
