import { DecksProvider } from "@/components/decks/decks-provider";
import { HomeSidebarContainer } from "@/components/nav/home/home-container";
import { selectDecks } from "@/lib/data/decks";
import { createClient } from "@/lib/supabase/server";

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: decks } = await selectDecks({ supabase });
  return (
    <DecksProvider initialDecks={decks ?? []}>
      <HomeSidebarContainer>{children}</HomeSidebarContainer>
    </DecksProvider>
  );
}
