import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LoginButton } from "@/components/nav/landing/login-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { AirVentIcon, GithubIcon } from "lucide-react";

export function LandingTopbar() {
  return (
    <div className="bg-background">
      <div className="py-4 container flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Button variant="secondary" asChild>
            <Link href="/">
              <AirVentIcon className="mr-2" size={16} />
              NSS Flashcards
            </Link>
          </Button>
          <Button variant="link" asChild className="hidden md:inline-flex">
            <Link href="/">About</Link>
          </Button>
          <Button variant="link" asChild className="hidden md:inline-flex">
            <Link href="/">GitHub</Link>
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <GithubIcon size={24} />
          </Button>
          <ThemeToggle />
          <LoginButton />
        </div>
      </div>
    </div>
  );
}
