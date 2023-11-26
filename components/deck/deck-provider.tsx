"use client";

import { createClient } from "@/lib/supabase/client";
import { Card, Deck } from "@/types/supabase";
import { createContext, useContext, useState } from "react";

const DeckContext = createContext<
  | {
      deck: Deck;
      cards: Card[];
    }
  | undefined
>(undefined);

export const DeckProvider = ({
  children,
  initialDeck,
  initialCards,
}: {
  children: React.ReactNode;
  initialDeck: Deck;
  initialCards: Card[];
}) => {
  const supabase = createClient();
  const [deck, setDeck] = useState<Deck>(initialDeck);
  const [cards, setCards] = useState<Card[]>(initialCards);

  return (
    <DeckContext.Provider value={{ deck, cards }}>
      {children}
    </DeckContext.Provider>
  );
};
export const useDecks = () => {
  const context = useContext(DeckContext);
  if (context === undefined) {
    throw new Error("useDecks must be used within a DeckContext Provider");
  }
  return context;
};
