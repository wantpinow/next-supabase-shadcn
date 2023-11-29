----------------- SETUP -----------------
-----------------------------------------
BEGIN
;

-- number of tests
SELECT
    plan(1);

----------------- TESTS -----------------
-----------------------------------------
-- test@user.com
-----------------------------------------
CALL auth.login_as_user('test@user.com');

-- insert a deck
INSERT INTO
    PUBLIC .decks (id, NAME, user_id)
VALUES
    (
        '00000000-0000-0000-0000-000000000000' :: uuid,
        'test deck',
        '590151f5-db36-4aa0-ae7f-8d7a5f0166ed' :: uuid
    );

SELECT
    results_eq(
        'SELECT id FROM public.decks WHERE user_id = ''590151f5-db36-4aa0-ae7f-8d7a5f0166ed''::uuid',
        ARRAY [ '00000000-0000-0000-0000-000000000000' :: uuid ],
        'deck created'
    );

CALL auth.logout();

----------------- CLEANUP -----------------
-------------------------------------------
CALL auth.logout();

SELECT
    *
FROM
    finish();

ROLLBACK;