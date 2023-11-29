"use client";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { createClient } from "@/lib/supabase/client";
import { useBreakpoint } from "@/lib/tailwind";
import { NavLink } from "@/types/shared";
import { useParams, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";

export function DecksBreadcrumbs() {
  const [links, setLinks] = useState<NavLink[]>([]);
  const params = useParams();
  const path = usePathname();

  const { isMd } = useBreakpoint("md");

  useEffect(() => {
    if (path === "/decks") {
      setLinks([
        { label: "Flashcards", href: "/decks" },
        { label: "All Decks", href: "/decks" },
      ]);
    } else if (params.deckId) {
      // get deck name from database
      const supabase = createClient();
      supabase
        .from("decks")
        .select("name")
        .eq("id", params.deckId)
        .single()
        .then(({ data: deck }) => {
          if (!deck) return console.error("Deck not found");
          setLinks([
            { label: "Decks", href: "/decks" },
            {
              label: deck.name,
              href: `/deck/${params.deckId}`,
            },
          ]);
        });
    } else {
      setLinks([]);
    }
  }, [path, params]);

  if (!links.length) return null;
  return <Breadcrumbs links={isMd ? links : [links[links.length - 1]]} />;
}
