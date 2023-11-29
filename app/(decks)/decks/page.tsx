import { getUser } from "@/lib/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Flashcards",
};

export default async function DecksPage() {
  const user = await getUser();
  return (
    <div className="space-y-4">
      {/* <BreadcrumbsBar
        links={[
          {
            label: "Flashcards",
            href: "/decks",
          },
          {
            label: "All Decks",
            href: "/decks",
          },
        ]}
      /> */}
    </div>
  );
}
