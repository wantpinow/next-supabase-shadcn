-- public.decks: decks of flashcards
CREATE TABLE PUBLIC .decks (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    NAME VARCHAR NOT NULL,
    user_id uuid NOT NULL REFERENCES PUBLIC .users(id) ON
    DELETE
        CASCADE ON
    UPDATE
        CASCADE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- public.cards: cards in decks
CREATE TABLE PUBLIC .cards (
    id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    deck_id uuid NOT NULL REFERENCES PUBLIC .decks(id) ON
    DELETE
        CASCADE ON
    UPDATE
        CASCADE,
        created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- enable RLS on decks and cards
ALTER TABLE
    PUBLIC .decks ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    PUBLIC .cards ENABLE ROW LEVEL SECURITY;

-- allow users to create, read, update, and delete their own decks and cards
CREATE POLICY decks_own_crud ON PUBLIC .decks FOR ALL TO PUBLIC WITH CHECK (auth.uid() = user_id);