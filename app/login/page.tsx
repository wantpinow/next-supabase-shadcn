import Link from "next/link";

import { signIn, signUp } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Metadata } from "next";
import { MailIcon } from "lucide-react";

export const metadata: Metadata = {
  title: "Login",
};

export default function LoginPage({
  searchParams,
}: {
  searchParams: { signup?: string; redirect?: string };
}) {
  const signInSubmit = async (formData: FormData) => {
    "use server";
    return signIn({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: searchParams.redirect,
    });
  };

  const signUpSubmit = async (formData: FormData) => {
    "use server";
    return signUp({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });
  };

  return searchParams.signup === "success" ? (
    <CardHeader className="text-center py-12">
      <MailIcon size={72} className="text-primary mx-auto" />
      <CardTitle>Email Sent</CardTitle>
      <CardDescription>
        Check your inbox for a confirmation email.
      </CardDescription>
    </CardHeader>
  ) : (
    <>
      <CardHeader className="text-center">
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Sign in to your account to continue.</CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>
        <form
          className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action={signInSubmit}
        >
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="you@example.com"
            required
            className="mb-4"
          />
          <Label id="email" htmlFor="password">
            Password
          </Label>
          <Input
            type="password"
            name="password"
            placeholder="••••••••"
            required
            className="mb-6"
          />
          <Button variant="default">Sign In</Button>
          <Button
            formAction={signUpSubmit}
            variant="outline"
            className="text-primary hover:text-primary"
          >
            Sign Up
          </Button>
        </form>
      </CardContent>
    </>
  );
}
