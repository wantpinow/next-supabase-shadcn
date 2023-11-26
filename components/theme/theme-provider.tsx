"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { useEffect, useState } from "react";

// taken from https://github.com/vercel/next.js/discussions/22388#discussioncomment-6609801
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <NextThemesProvider {...props}>{children}</NextThemesProvider>
      ) : (
        <></>
      )}
    </>
  );
}
