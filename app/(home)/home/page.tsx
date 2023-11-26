import { BreadcrumbsBar } from "@/components/nav/breadcrumbs/breadcrumbs-bar";
import { getUser } from "@/lib/supabase/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Flashcards",
};

export default async function Home() {
  const user = await getUser();
  return (
    <div className="space-y-4">
      <BreadcrumbsBar
        links={[
          {
            label: "Decks",
            href: "/home",
          },
        ]}
      />
    </div>
  );
}
