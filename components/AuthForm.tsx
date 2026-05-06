"use client";

import { useState } from "react";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [googleLoading, setGoogleLoading] = useState(false);

  const plan = searchParams.get("plan");
  const billing = searchParams.get("billing") as "monthly" | "yearly" | null;

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const result = await signUp({
          uid: userCredential.user.uid,
          name: name!,
          email,
          password,
        });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Account created successfully. Please sign in.");
        if (plan) {
          router.push(`/sign-in?plan=${encodeURIComponent(plan)}${billing ? `&billing=${billing}` : ""}`);
        } else {
          router.push("/sign-in");
        }
      } else {
        const { email, password } = data;

        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        const result = await signIn({
          uid: userCredential.user.uid,
          email,
          name: userCredential.user.displayName || undefined,
          idToken,
        });

        if (!result?.success) {
          toast.error(result.message);
          return;
        }

        toast.success("Signed in successfully.");
        if (plan) {
          router.push(`/price?plan=${encodeURIComponent(plan)}${billing ? `&billing=${billing}` : ""}`);
        } else {
          router.push("/");
        }
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    }
  };

  const onGoogleAuth = async () => {
    try {
      setGoogleLoading(true);
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      const idToken = await userCredential.user.getIdToken();

      if (!idToken) {
        toast.error("Google sign-in failed. Please try again.");
        return;
      }

      const result = await signIn({
        uid: userCredential.user.uid,
        email: userCredential.user.email || "",
        name: userCredential.user.displayName || undefined,
        idToken,
      });

      if (!result?.success) {
        toast.error(result?.message || "Authentication failed.");
        return;
      }

      toast.success("Signed in with Google.");
      if (plan) {
        router.push(`/price?plan=${encodeURIComponent(plan)}${billing ? `&billing=${billing}` : ""}`);
      } else {
        router.push("/");
      }
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error(`Google authentication failed: ${error}`);
    } finally {
      setGoogleLoading(false);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    <div className="auth-card-wrap">
      <div className="auth-card">
        <div className="auth-tabs" role="tablist" aria-label="Authentication">
          <Link
            href="/sign-in"
            className={`auth-tab${isSignIn ? " auth-tab--active" : ""}`}
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className={`auth-tab${!isSignIn ? " auth-tab--active" : ""}`}
          >
            Sign Up
          </Link>
        </div>

        <h3 className="auth-card__title">
          {isSignIn ? "Welcome back" : "Create your account"}
        </h3>
        <p className="auth-card__subtitle">
          {isSignIn
            ? "Sign in to continue your journey"
            : "Join Nexus and start mock interviews with instant AI feedback."}
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 mt-2 form auth-form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Enter your full name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email address"
              placeholder="you@example.com"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              labelAction={
                isSignIn ? (
                  <Link
                    href="/forgot-password"
                    className="auth-form__forgot-link"
                  >
                    Forgot password?
                  </Link>
                ) : undefined
              }
              placeholder={
                isSignIn ? "Enter your password" : "Create a password"
              }
              type="password"
            />

            <Button className="btn auth-form__submit" type="submit">
              {isSignIn ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </Form>

        <div className="auth-social">
          <span>or continue with</span>
          <Button
            type="button"
            variant="outline"
            className="auth-google-btn"
            onClick={onGoogleAuth}
            disabled={googleLoading}
          >
            <span className="auth-google-btn__icon" aria-hidden>
              G
            </span>
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </Button>
        </div>

        <p className="text-center auth-card__switch-text">
          {isSignIn ? "No account yet?" : "Have an account already?"}
          <Link
            href={!isSignIn ? "/sign-in" : "/sign-up"}
            className="auth-card__switch-link"
          >
            {!isSignIn ? "Sign In" : "Sign Up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
