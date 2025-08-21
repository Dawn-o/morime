"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignupFormSchema, SigninFormSchema } from "@/lib/auth/definitions";

/**
 * Enhanced login action with proper validation
 * @param {import('./definitions').SigninState} prevState
 * @param {FormData} formData
 * @returns {Promise<import('./definitions').AuthResult>}
 */
export async function login(prevState, formData) {
  const supabase = await createClient();

  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      error: null,
      success: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {

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
    } else if (error.message.includes("Too many requests")) {
      return {
        error:
          "Too many login attempts. Please wait a few minutes before trying again.",
        success: null,
      };
    } else {
      return {
        error: "An error occurred during login. Please try again.",
        success: null,
      };
    }
  }

  revalidatePath("/", "layout");
  redirect("/profile");
}

/**
 * Enhanced signup action with comprehensive validation
 * @param {import('./definitions').FormState} prevState
 * @param {FormData} formData
 * @returns {Promise<import('./definitions').AuthResult>}
 */
export async function signup(prevState, formData) {
  const supabase = await createClient();

  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If validation fails, return early with structured errors
  if (!validatedFields.success) {
    return {
      error: null,
      success: null,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data;

  // 2. Additional business logic validation
  if (password.length < 8) {
    return {
      error: null,
      success: null,
      errors: {
        password: ["Password must be at least 8 characters long."],
      },
    };
  }

  // 3. Attempt user creation
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        display_name: name, // Additional metadata for profile
      },
      emailRedirectTo: `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/auth/callback`,
    },
  });

  if (error) {

    // Handle specific signup errors
    if (error.message.includes("User already registered")) {
      return {
        error: null,
        success: null,
        errors: {
          email: ["An account with this email already exists."],
        },
      };
    } else if (error.message.includes("Password should be")) {
      return {
        error: null,
        success: null,
        errors: {
          password: [error.message],
        },
      };
    } else {
      return {
        error: "An error occurred during signup. Please try again.",
        success: null,
      };
    }
  }

  // 4. Handle successful signup
  if (data.user && !data.session) {
    return {
      error: null,
      success:
        "Success! Please check your email and click the confirmation link to complete your registration.",
    };
  } else if (data.session) {
    // Auto-confirmed user (rare case)
    revalidatePath("/", "layout");
    redirect("/profile");
  } else {
    return {
      error: null,
      success:
        "Success! Please check your email and click the confirmation link to complete your registration.",
    };
  }
}

/**
 * Enhanced Google OAuth sign-in with error handling
 */
export async function signInWithGoogle() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
      }/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error) {
    redirect("/auth/signin?error=oauth-error");
  }

  if (data.url) {
    redirect(data.url);
  }
}

/**
 * Enhanced sign out with proper cleanup
 */
export async function signOut() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/auth/signin");
  }

  revalidatePath("/", "layout");
  redirect("/auth/signin");
}

/**
 * Resend confirmation email with validation
 * @param {string} email - User's email address
 */
export async function resendConfirmation(email) {
  const supabase = await createClient();

  // Validate email format
  const emailValidation = SigninFormSchema.pick({ email: true }).safeParse({
    email,
  });

  if (!emailValidation.success) {
    redirect("/auth/signin?error=invalid-email");
  }

  const { error } = await supabase.auth.resend({
    type: "signup",
    email: emailValidation.data.email,
  });

  if (error) {
    redirect(
      `/auth/signin?error=${encodeURIComponent(
        "Failed to resend confirmation email. Please try again."
      )}`
    );
  }

  redirect("/auth/signin?success=confirmation-resent");
}
