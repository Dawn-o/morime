import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/auth/signin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
            <CardDescription>Your account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <strong>Name:</strong> {profile?.name || "Not set"}
            </div>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Member since:</strong>{" "}
              {new Date(user.created_at).toLocaleDateString()}
            </div>
            <div>
              <strong>SFW Mode:</strong>{" "}
              {profile?.sfw_mode ? "Enabled" : "Disabled"}
            </div>
            <div>
              <strong>Theme:</strong> {profile?.theme_preference || "System"}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
