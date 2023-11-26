import { DeckProvider } from "@/components/deck/deck-provider";
import { BreadcrumbsBar } from "@/components/nav/breadcrumbs/breadcrumbs-bar";
import { selectDeckById } from "@/lib/data/decks";
import { createClient } from "@/lib/supabase/server";

export default async function DeckPage({
  params,
}: {
  params: { deckId: string };
}) {
  const supabase = createClient();
  const { data: deck } = await selectDeckById({ supabase, id: params.deckId });
  if (!deck) {
    return <div>Deck not found</div>;
  }
  return (
    <DeckProvider initialDeck={deck} initialCards={[]}>
      <BreadcrumbsBar
        links={[
          { href: "/home", label: "Decks" },
          { href: `/deck/${deck.id}`, label: deck.name },
        ]}
      />
    </DeckProvider>
  );
}
