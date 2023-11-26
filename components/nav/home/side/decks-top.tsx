import { NewDeckDialog } from "@/components/decks/new-deck-dialog";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import Link from "next/link";
import { HomeSidebarDecksList } from "./decks-list";
import { Separator } from "@/components/ui/separator";

export function HomeSidebarDecksTop() {
  return (
    <div>
      <Button
        variant="ghost"
        asChild
        className="w-full hover:text-primary-foreground hover:bg-primary mb-4"
      >
        <Link href="/home">
          <Icon name="air-vent" className="mr-2" size={16} />
          NSS Flashcards
        </Link>
      </Button>
      <div className="">
        <NewDeckDialog />
        <Separator className="my-4" />
        <HomeSidebarDecksList />
      </div>
    </div>
  );
}
