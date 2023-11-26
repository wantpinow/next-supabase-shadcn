"use client";

import { insertDeck } from "@/lib/data/decks";
import { createClient } from "@/lib/supabase/client";
import { Deck, NewDeck } from "@/types/supabase";
import { createContext, useContext, useState } from "react";

const DecksContext = createContext<
  | {
      decks: Deck[];
      addDeck: (deck: NewDeck) => Promise<Deck | undefined>;
    }
  | undefined
>(undefined);

export const DecksProvider = ({
  children,
  initialDecks,
}: {
  children: React.ReactNode;
  initialDecks: Deck[];
}) => {
  const supabase = createClient();
  const [decks, setDecks] = useState<Deck[]>(initialDecks);

  const addDeck = async (deck: NewDeck) => {
    const { data, error } = await insertDeck({ supabase, deck });
    if (error || !data) {
      return;
    }
    setDecks([...decks, data].sort((a, b) => a.name.localeCompare(b.name)));
    return data;
  };

  return (
    <DecksContext.Provider value={{ decks, addDeck }}>
      {children}
    </DecksContext.Provider>
  );
};
export const useDecks = () => {
  const context = useContext(DecksContext);
  if (context === undefined) {
    throw new Error("useDecks must be used within a DecksContext Provider");
  }
  return context;
};
