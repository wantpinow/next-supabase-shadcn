import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MailIcon, ShieldXIcon } from "lucide-react";
import Link from "next/link";

export default function ConfirmSignupPage({
  searchParams,
}: {
  searchParams: { confirmation_url?: string };
}) {
  if (!searchParams.confirmation_url) {
    return (
      <CardHeader className="text-center py-12">
        <ShieldXIcon size={72} className="text-primary mx-auto" />
        <CardTitle>Could not verify</CardTitle>
        <CardDescription>
          Please contact support for assistance.
        </CardDescription>
      </CardHeader>
    );
  }
  return (
    <CardHeader className="text-center">
      <MailIcon size={72} className="text-primary mx-auto" />
      <CardTitle>Confirm Signup</CardTitle>
      <CardDescription>
        Click the button below to confirm your email address.
      </CardDescription>
      <div className="pt-4">
        <Button className="px-10 mx-auto" asChild>
          <Link href={searchParams.confirmation_url}>Confirm Email</Link>
        </Button>
      </div>
    </CardHeader>
  );
}
