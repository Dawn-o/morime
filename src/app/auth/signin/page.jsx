"use client";

import { useActionState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/ui/link";
import { login, signInWithGoogle } from "@/lib/auth/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function SignInPage({ searchParams }) {
  const router = useRouter();
  const [loginState, loginAction, loginPending] = useActionState(login, {
    error: null,
    success: null,
  });

  const urlParams = use(searchParams) || {};
  const urlError = urlParams.error;
  const urlSuccess = urlParams.success;

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        router.push("/profile");
      }
    };
    checkAuth();
  }, [router]);

  const displayError =
    loginState.error ||
    (urlError === "callback-error" &&
      "Authentication failed. Please try again.") ||
    (urlError === "oauth-error" &&
      "Google sign in failed. Please try again.") ||
    (urlError === "signout-failed" &&
      "Failed to sign out. Please try again.") ||
    (urlError &&
      urlError !== "callback-error" &&
      urlError !== "oauth-error" &&
      urlError !== "signout-failed" &&
      urlError);

  const displaySuccess =
    (urlSuccess === "signed-out" && "You have been signed out successfully.") ||
    (urlSuccess === "confirmation-resent" &&
      "Confirmation email has been resent. Please check your inbox.") ||
    (urlSuccess &&
      urlSuccess !== "signed-out" &&
      urlSuccess !== "confirmation-resent" &&
      urlSuccess);

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>Sign in to your Morime account</CardDescription>
          </CardHeader>
          <CardContent>
            {displayError && (
              <Alert className="mb-4" variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Sign In Failed</AlertTitle>
                <AlertDescription>{displayError}</AlertDescription>
              </Alert>
            )}

            {displaySuccess && (
              <Alert className="mb-4">
                <CheckCircle2Icon />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{displaySuccess}</AlertDescription>
              </Alert>
            )}

            <div className="grid gap-6">
              <form action={signInWithGoogle}>
                <Button variant="outline" className="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mr-2 h-4 w-4"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Sign in with Google
                </Button>
              </form>

              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with
                </span>
              </div>

              <form action={loginAction}>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="m@example.com"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <Link
                        href="#"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={loginPending}
                  >
                    {loginPending ? "Signing In..." : "Sign In"}
                  </Button>
                </div>
              </form>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="underline underline-offset-4"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="text-muted-foreground text-center text-xs text-balance">
          By clicking continue, you agree to our{" "}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </div>
  );
}
