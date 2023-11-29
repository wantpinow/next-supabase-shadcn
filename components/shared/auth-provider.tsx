"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Session, User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

export const AuthContext = createContext<
  | {
      initial: boolean;
      session: Session | null;
      user: User | null;
    }
  | undefined
>(undefined);

type AuthProviderProps = {
  accessToken: string | null;
  // additional props that might be passed to AuthProvider
  [key: string]: any;
};

export const AuthProvider = (props: AuthProviderProps) => {
  const [initial, setInitial] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const { accessToken, ...rest } = props;

  useEffect(() => {
    const supabase = createClient();

    // get the latest session from supabase
    async function getActiveSession() {
      const {
        data: { session: session },
      } = await supabase.auth.getSession();
      const user = session?.user ?? null;
      setSession(session);
      setUser(user);
      setInitial(false);
    }
    getActiveSession();

    // listen for changes to auth status
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (currentSession?.access_token !== accessToken) {
        router.refresh();
      }
      // update session and user in state
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [accessToken, router]);

  // memoize the context value to update only when needed
  const value = useMemo(() => {
    return {
      initial,
      session,
      user,
    };
  }, [initial, session, user]);

  return <AuthContext.Provider value={value} {...rest} />;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
