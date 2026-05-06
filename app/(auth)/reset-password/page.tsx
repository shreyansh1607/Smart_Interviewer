"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";

import { auth } from "@/firebase/client";
import { Button } from "@/components/ui/button";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = useMemo(() => searchParams.get("oobCode") || "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!oobCode) {
      toast.error("Invalid or expired reset link.");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await verifyPasswordResetCode(auth, oobCode);
      await confirmPasswordReset(auth, oobCode, password);
      toast.success("Password updated successfully. Please sign in.");
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
      toast.error(`Could not reset password: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-card-wrap">
      <div className="auth-card">
        <h3 className="auth-card__title">Set a new password</h3>
        <p className="auth-card__subtitle">
          Use a strong password you don&apos;t use elsewhere.
        </p>

        <form className="auth-form space-y-5" onSubmit={onSubmit}>
          <div>
            <label className="label">New Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Enter your new password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <div>
            <label className="label">Confirm Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <Button type="submit" className="btn auth-form__submit" disabled={loading}>
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </form>

        <p className="auth-card__switch-text text-center">
          Back to
          <Link href="/sign-in" className="auth-card__switch-link">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
