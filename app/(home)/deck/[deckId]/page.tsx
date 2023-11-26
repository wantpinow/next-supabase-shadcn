import { DeckProvider } from "@/components/deck/deck-provider";
import { BreadcrumbsBar } from "@/components/nav/breadcrumbs/breadcrumbs-bar";
import { selectDeckById } from "@/lib/data/decks";
import { createClient } from "@/lib/supabase/server";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { deckId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  console.log("metadata");
  // read route params
  const id = params.deckId;

  // get deck name from database
  const supabase = createClient();
  const { data: deck } = await supabase
    .from("decks")
    .select("name")
    .eq("id", id)
    .single();

  return {
    title: deck?.name ?? "Deck not found",
  };
}

export default async function DeckPage({
  params,
}: {
  params: { deckId: string };
}) {
  console.log("page");

  const supabase = createClient();
  const { data: deck } = await selectDeckById({ supabase, id: params.deckId });

  if (!deck) {
    return <div>Deck not found</div>;
  }
  return (
    <DeckProvider initialDeck={deck} initialCards={[]}>
      slower
      <BreadcrumbsBar
        links={[
          { href: "/home", label: "Decks" },
          { href: `/deck/${deck.id}`, label: deck.name },
        ]}
      />
    </DeckProvider>
  );
}
