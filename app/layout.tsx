import "@/styles/globals.css";
import { font } from "@/styles/font";
import { Toaster } from "@/components/ui/toaster";
import { UrlToaster } from "@/components/shared/url-toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Metadata } from "next";
import { AuthProvider } from "@/components/shared/auth-provider";
import { createClient } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Next.js, Supabase, shadcn/ui",
    template: `%s - NSS Starter`,
  },
  description: "A Next.js template with Supabase and shadcn/ui",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { session: session },
  } = await supabase.auth.getSession();
  const accessToken = session?.access_token ?? null;
  return (
    <html lang="en">
      <body className={cn(font.className)}>
        <AuthProvider accessToken={accessToken}>
          <ThemeProvider attribute="class">
            {children}
            <Toaster />
            <UrlToaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
