"use client";

import { useDecks } from "@/components/decks/decks-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export function HomeSidebarDecksList() {
  const { decks } = useDecks();
  const params = useParams();

  return (
    <div className="space-y-2">
      {decks.map((deck) => (
        <Button
          variant={params?.deckId === deck.id ? "secondary" : "outline"}
          asChild
          size="sm"
          key={deck.id}
          className={cn(
            "w-full",
            params?.deckId === deck.id ? "" : "bg-transparent"
          )}
        >
          <Link href={`/deck/${deck.id}`}>{deck.name}</Link>
        </Button>
      ))}
      {decks.length === 0 && (
        <div className="text-center text-sm text-primary-foreground">
          No decks yet. Create one to get started.
        </div>
      )}
    </div>
  );
}
