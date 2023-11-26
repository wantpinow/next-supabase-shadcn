import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Link from "next/link";
import { LoginButton } from "./login-button";

export function LandingTopbar() {
  return (
    <div className="bg-secondary">
      <div className="py-4 container flex justify-between items-center">
        <div className="flex gap-1 items-center">
          <Button variant="secondary" asChild>
            <Link href="/">
              <Icon name="air-vent" className="mr-2" size={16} />
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
          <LoginButton />
          <Button
            variant="outline"
            size="icon"
            className="hidden md:inline-flex"
          >
            <Icon name="github" size={24} />
          </Button>
        </div>
      </div>
    </div>
  );
}
