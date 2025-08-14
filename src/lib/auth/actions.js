"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function login(prevState, formData) {
  const supabase = await createClient();

  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  if (!loginData.email || !loginData.password) {
    return {
      error: "Please fill in all fields.",
      success: null,
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword(loginData);

  if (error) {
    console.error("Login error:", error);

    if (error.message.includes("Invalid login credentials")) {
      return {
        error:
          "Invalid email or password. Please check your credentials and try again.",
        success: null,
      };
    } else if (error.message.includes("Email not confirmed")) {
      return {
        error:
          "Please check your email and click the confirmation link before signing in.",
        success: null,
      };
    } else {
      return {
        error: error.message,
        success: null,
      };
    }
  }

  revalidatePath("/", "layout");
  redirect("/profile");
}

export async function signup(prevState, formData) {
  const supabase = await createClient();

  const formValues = {
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    name: formData.get("name"),
  };

  if (
    !formValues.email ||
    !formValues.password ||
    !formValues.confirmPassword ||
    !formValues.name
  ) {
    return {
      error: "Please fill in all fields.",
      success: null,
    };
  }

  if (formValues.password !== formValues.confirmPassword) {
    return {
      error: "Passwords do not match.",
      success: null,
    };
  }

  if (formValues.password.length < 6) {
    return {
      error: "Password must be at least 6 characters long.",
      success: null,
    };
  }

  const { data, error } = await supabase.auth.signUp({
    email: formValues.email,
    password: formValues.password,
    options: {
      data: {
        name: formValues.name,
      },
    },
  });

  if (error) {
    console.error("Signup error:", error);
    return {
      error: error.message,
      success: null,
    };
  }

  if (data.user && !data.session) {
    return {
      error: null,
      success:
        "Please check your email and click the confirmation link to complete your registration.",
    };
  } else if (data.session) {
    revalidatePath("/", "layout");
    redirect("/profile");
  } else {
    return {
      error: null,
      success:
        "Please check your email and click the confirmation link to complete your registration.",
    };
  }
}

export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    console.error("Google sign in error:", error);
    redirect("/auth/signin?error=oauth-error");
  }

  if (data.url) {
    redirect(data.url);
  }
}

export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error);
    // For signOut, we'll still redirect with error since it's a simple case
    redirect("/auth/signin?error=signout-failed");
  }

  revalidatePath("/", "layout");
  redirect("/auth/signin?success=signed-out");
}

export async function resendConfirmation(email) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email,
  });

  if (error) {
    console.error("Resend confirmation error:", error);
    redirect(`/auth/signin?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/auth/signin?success=confirmation-resent");
}
