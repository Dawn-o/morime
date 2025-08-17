"use client";

import { useState, useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { signup } from "@/lib/auth/actions";

export default function SignUpForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const [signupState, signupAction, signupPending] = useActionState(signup, {
    error: null,
    success: null,
    errors: {},
  });

  const validatePassword = (password) => {
    return (
      password.length >= 8 &&
      /[a-zA-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^a-zA-Z0-9]/.test(password)
    );
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword) || newPassword === "");
    setPasswordsMatch(
      newPassword === confirmPassword || confirmPassword === ""
    );
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(
      password === newConfirmPassword || newConfirmPassword === ""
    );
  };

  const isFormValid =
    passwordsMatch && passwordValid && password && confirmPassword;

  return (
    <>
      {/* Display general error message */}
      {signupState.error && (
        <Alert className="mb-4" variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Sign Up Failed</AlertTitle>
          <AlertDescription>{signupState.error}</AlertDescription>
        </Alert>
      )}

      {/* Display success message */}
      {signupState.success && (
        <Alert className="mb-4">
          <CheckCircle2Icon />
          <AlertTitle>Registration Successful!</AlertTitle>
          <AlertDescription>{signupState.success}</AlertDescription>
        </Alert>
      )}

      <form action={signupAction}>
        <div className="grid gap-6">
          {/* Name field with validation errors */}
          <div className="grid gap-3">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              required
              className={signupState.errors?.name ? "border-red-500" : ""}
            />
            {signupState.errors?.name && (
              <div className="text-sm text-red-500">
                {signupState.errors.name.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Email field with validation errors */}
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@example.com"
              required
              className={signupState.errors?.email ? "border-red-500" : ""}
            />
            {signupState.errors?.email && (
              <div className="text-sm text-red-500">
                {signupState.errors.email.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Password field with enhanced validation */}
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              className={
                (!passwordValid && password) || signupState.errors?.password
                  ? "border-red-500"
                  : ""
              }
              required
            />
            {/* Client-side validation feedback */}
            {!passwordValid && password && (
              <div className="text-sm text-red-500">
                <p>Password must:</p>
                <ul className="list-disc list-inside space-y-1 mt-1">
                  <li>Be at least 8 characters long</li>
                  <li>Contain at least one letter</li>
                  <li>Contain at least one number</li>
                  <li>Contain at least one special character</li>
                </ul>
              </div>
            )}
            {/* Server-side validation errors */}
            {signupState.errors?.password && (
              <div className="text-sm text-red-500">
                {signupState.errors.password.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password field */}
          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              className={
                (!passwordsMatch && confirmPassword) ||
                signupState.errors?.confirmPassword
                  ? "border-red-500"
                  : ""
              }
              required
            />
            {/* Client-side validation feedback */}
            {!passwordsMatch && confirmPassword && (
              <p className="text-sm text-red-500">Passwords do not match</p>
            )}
            {/* Server-side validation errors */}
            {signupState.errors?.confirmPassword && (
              <div className="text-sm text-red-500">
                {signupState.errors.confirmPassword.map((error) => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid || signupPending}
          >
            {signupPending ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </form>
    </>
  );
}
