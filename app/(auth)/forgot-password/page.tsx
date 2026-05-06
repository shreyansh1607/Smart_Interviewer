"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "@/firebase/client";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email.trim(), {
        url: `${window.location.origin}/reset-password`,
        handleCodeInApp: true,
      });
      toast.success("Password reset email sent. Check your inbox.");
    } catch (error) {
      console.log(error);
      toast.error(`Could not send reset email: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card-wrap">
      <div className="auth-card">
        <div className="auth-tabs" role="tablist" aria-label="Authentication">
          <Link href="/sign-in" className="auth-tab">
            Sign In
          </Link>
          <Link href="/sign-up" className="auth-tab">
            Sign Up
          </Link>
        </div>

        <h3 className="auth-card__title">Reset your password</h3>
        <p className="auth-card__subtitle">
          Enter your account email and we&apos;ll send a secure reset link.
        </p>

        <form className="auth-form space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <Button type="submit" className="btn auth-form__submit" disabled={loading}>
            {loading ? "Sending..." : "Send reset link"}
          </Button>
        </form>

        <p className="auth-card__switch-text text-center">
          Remembered your password?
          <Link href="/sign-in" className="auth-card__switch-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
