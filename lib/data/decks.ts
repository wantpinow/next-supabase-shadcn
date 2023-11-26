import { Database } from "@/types/database";
import { NewDeck } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export async function selectDecks({
  supabase,
}: {
  supabase: SupabaseClient<Database>;
}) {
  const { data, error } = await supabase.from("decks").select("*");
  return { data, error };
}

export async function selectDeckById({
  supabase,
  id,
}: {
  supabase: SupabaseClient<Database>;
  id: string;
}) {
  const { data, error } = await supabase
    .from("decks")
    .select("*")
    .eq("id", id)
    .single();
  return { data, error };
}

export async function insertDeck({
  supabase,
  deck,
}: {
  supabase: SupabaseClient<Database>;
  deck: NewDeck;
}) {
  const { data, error } = await supabase
    .from("decks")
    .insert(deck)
    .select("*")
    .single();
  return { data, error };
}
