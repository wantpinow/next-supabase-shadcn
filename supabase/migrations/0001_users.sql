-- public.users: table that mirrors the auth.users table
CREATE TABLE PUBLIC .users (
    id uuid NOT NULL PRIMARY KEY,
    email VARCHAR UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- function to update public.users when auth.users is updated
CREATE
OR REPLACE FUNCTION sync_users() RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER
SET
    search_path = PUBLIC AS $$ BEGIN
        IF TG_OP = 'INSERT' THEN
        INSERT INTO
            PUBLIC .users (id, email)
        VALUES
            (
                NEW .id,
                NEW .email
            );

ELSIF TG_OP = 'UPDATE' THEN
UPDATE
    PUBLIC .users
SET
    email = NEW .email
WHERE
    id = NEW .id;

ELSIF TG_OP = 'DELETE' THEN
DELETE FROM
    PUBLIC .users
WHERE
    id = OLD .id;

END IF;

RETURN NULL;

END;

$$;

-- trigger to sync auth.users to public.users
CREATE TRIGGER sync_users AFTER
INSERT
    OR
UPDATE
    OR
DELETE
    ON auth.users FOR EACH ROW EXECUTE PROCEDURE sync_users();

-- enable RLS
ALTER TABLE
    PUBLIC .users ENABLE ROW LEVEL SECURITY;

-- allow users to see their own data
CREATE POLICY select_users ON PUBLIC .users FOR
SELECT
    TO PUBLIC USING (auth.uid() = id);