import type { Database } from "@/types/database";

// export tables
export type Deck = Database["public"]["Tables"]["decks"]["Row"];
export type NewDeck = Database["public"]["Tables"]["decks"]["Insert"];
export type Card = Database["public"]["Tables"]["cards"]["Row"];
