import { NewDeckDialog } from "@/components/decks/new-deck-dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Link from "next/link";

export function HomeSidebarTasksTop() {
  return (
    <div>
      <Button
        variant="ghost"
        asChild
        className="w-full hover:text-primary-foreground hover:bg-primary mb-4"
      >
        <Link href="/">
          <Icon name="air-vent" className="mr-2" size={16} />
          NSS Flashcards
        </Link>
      </Button>
      <NewDeckDialog />
    </div>
  );
}
