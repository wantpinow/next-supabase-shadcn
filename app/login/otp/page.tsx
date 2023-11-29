import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OtpInput } from "@/components/ui/otp-input";
import { signIn } from "@/lib/supabase/server";
import { MailIcon } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Confirm Email",
};

export default function OtpPage({
  searchParams,
}: {
  searchParams: { email?: string };
}) {
  const submitOtp = async (otp: string) => {
    "use server";
    if (!searchParams.email) return;

    await fetch(
      `http://localhost:3000/auth/callback?type=signup&token=${otp}&email=${searchParams.email}`
    );

    // console.log(searchParams.email);
    // return signIn({
    //   email: searchParams.email,
    //   password: otp,
    //   errorRedirectTo: `/login/otp?email=${searchParams.email}`,
    // });
  };

  if (!searchParams.email) {
    return (
      <CardHeader className="text-center py-12">
        <MailIcon size={72} className="text-primary mx-auto" />
        <CardTitle>Invalid Email</CardTitle>
        <CardDescription>
          Please check your email and try again.
        </CardDescription>
      </CardHeader>
    );
  }

  return (
    <CardHeader className="text-center py-12">
      <MailIcon size={72} className="text-primary mx-auto" />
      <CardTitle>Email Sent</CardTitle>
      <CardDescription>
        Check your inbox for a confirmation email.
      </CardDescription>
      <OtpInput n={6} onSubmit={submitOtp} />
    </CardHeader>
  );
}
