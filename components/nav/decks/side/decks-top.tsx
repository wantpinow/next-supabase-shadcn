import { NewDeckDialog } from "@/components/decks/new-deck-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DecksSidebarDecksList } from "@/components/nav/decks/side/decks-list";
import { Separator } from "@/components/ui/separator";
import { AirVentIcon } from "lucide-react";

export function DecksSidebarDecksTop() {
  return (
    <div>
      <Button
        variant="ghost"
        asChild
        className="w-full hover:text-primary-foreground hover:bg-primary mb-4"
      >
        <Link href="/decks">
          <AirVentIcon className="mr-2" size={16} />
          NSS Flashcards
        </Link>
      </Button>
      <div className="">
        <NewDeckDialog />
        <Separator className="my-4" />
        <DecksSidebarDecksList />
      </div>
    </div>
  );
}
