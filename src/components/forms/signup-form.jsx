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
  });

  const validatePassword = (password) => {
    return password.length >= 6;
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
      {signupState.error && (
        <Alert className="mb-4" variant="destructive">
          <AlertCircleIcon />
          <AlertTitle>Sign Up Failed</AlertTitle>
          <AlertDescription>
            {signupState.error}
          </AlertDescription>
        </Alert>
      )}

      {signupState.success && (
        <Alert className="mb-4">
          <CheckCircle2Icon />
          <AlertTitle>Check Your Email</AlertTitle>
          <AlertDescription>
            {signupState.success}
          </AlertDescription>
        </Alert>
      )}

      <form action={signupAction}>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Wakatsuki Nico"
            required
          />
        </div>
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
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={!passwordValid && password ? "border-red-500" : ""}
            required
          />
          {!passwordValid && password && (
            <p className="text-sm text-red-500">
              Password must be at least 6 characters long
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className={
              !passwordsMatch && confirmPassword ? "border-red-500" : ""
            }
            required
          />
          {!passwordsMatch && confirmPassword && (
            <p className="text-sm text-red-500">Passwords do not match</p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={!isFormValid || signupPending}>
          {signupPending ? "Creating Account..." : "Create Account"}
        </Button>
      </div>
    </form>
    </>
  );
}
