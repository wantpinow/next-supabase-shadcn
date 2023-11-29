-- https://oss.issuehunt.io/r/supabase/supabase/issues/7311
-- user impersonation via postgres functions
GRANT anon,
authenticated TO postgres;

CREATE
OR REPLACE PROCEDURE auth.login_as_user (user_email text) LANGUAGE plpgsql AS $$
DECLARE
    auth_user auth.users;

BEGIN
    SELECT
        * INTO auth_user
    FROM
        auth.users
    WHERE
        email = user_email;

EXECUTE format(
    'SET request.jwt.claim.sub=%L',
    (auth_user) .id :: text
);

EXECUTE format(
    'SET request.jwt.claim.role=%I',
    (auth_user) .ROLE
);

EXECUTE format(
    'SET request.jwt.claim.email=%L',
    (auth_user) .email
);

EXECUTE format(
    'SET request.jwt.claims=%L',
    json_strip_nulls(
        json_build_object('app_metadata', (auth_user) .raw_app_meta_data)
    ) :: text
);

-- RAISE NOTICE '%', format( 'SET ROLE %I; -- Logging in as %L (%L)', (auth_user).ROLE, (auth_user).id, (auth_user).email);
EXECUTE format('SET ROLE %I', (auth_user) .ROLE);

END;

$$;

CREATE
OR REPLACE PROCEDURE auth.login_as_anon () LANGUAGE plpgsql AS $$ BEGIN
    EXECUTE format('SET request.jwt.claim.sub=''''');

EXECUTE format('SET request.jwt.claim.role=''''');

EXECUTE format('SET request.jwt.claim.email=''''');

EXECUTE format('SET request.jwt.claims=''''');

EXECUTE format('SET ROLE anon');

END;

$$;

CREATE
OR REPLACE PROCEDURE auth.logout () LANGUAGE plpgsql AS $$ BEGIN
    EXECUTE format('SET request.jwt.claim.sub=''''');

EXECUTE format('SET request.jwt.claim.role=''''');

EXECUTE format('SET request.jwt.claim.email=''''');

EXECUTE format('SET request.jwt.claims=''''');

EXECUTE format('SET ROLE postgres');

-- For our use cases, this is 'postgres'. This may not be the case for everyone.
END;

$$;