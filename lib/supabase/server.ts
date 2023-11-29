import { Database } from "@/types/database";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export const createClient = (_cookieStore?: ReturnType<typeof cookies>) => {
  let cookieStore: ReturnType<typeof cookies>;
  if (!_cookieStore) {
    cookieStore = cookies();
  } else {
    cookieStore = _cookieStore;
  }
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

export const signOut = async () => {
  "use server";

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  return redirect("/");
};

export const signIn = async ({
  email,
  password,
  redirectTo = "/decks",
  errorRedirectTo = "/login",
}: {
  email: string;
  password: string;
  redirectTo?: string;
  errorRedirectTo?: string;
}) => {
  "use server";

  redirectTo = process.env.HOST + redirectTo;
  errorRedirectTo = process.env.HOST + errorRedirectTo;

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // parse any search params from errorRedirectTo
    const url = new URL(errorRedirectTo);
    const searchParams = new URLSearchParams(url.search);
    // add error message to search params
    searchParams.set("error", error.message);
    errorRedirectTo = `${url.pathname}?${searchParams.toString()}`;
    return redirect(errorRedirectTo);
  }

  // parse any search params from redirectTo
  const url = new URL(redirectTo);
  const searchParams = new URLSearchParams(url.search);
  // add success message to search params
  searchParams.set("success", "Signed in");
  redirectTo = `${url.pathname}?${searchParams.toString()}`;

  return redirect(redirectTo);
};

export const signUp = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  "use server";

  const origin = headers().get("origin");
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect(`/login?error=${error.message}`);
  }

  return redirect("/login?signup=success&success=Email sent, check your inbox");
};

export const getUser = async () => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
};
