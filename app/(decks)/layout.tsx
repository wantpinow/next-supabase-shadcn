import { DecksProvider } from "@/components/decks/decks-provider";
import { DecksSidebarContainer } from "@/components/nav/decks/decks-container";
import { selectDecks } from "@/lib/data/decks";
import { createClient } from "@/lib/supabase/server";

export default async function DecksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: decks } = await selectDecks({ supabase });
  return (
    <DecksProvider initialDecks={decks ?? []}>
      <DecksSidebarContainer>{children}</DecksSidebarContainer>
    </DecksProvider>
  );
}
