import "@/styles/globals.css";
import { font } from "@/styles/font";
import { Toaster } from "@/components/ui/toaster";
import { UrlToaster } from "@/components/shared/url-toaster";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Next.js, Supabase, shadcn/ui",
    template: `%s - NSS Starter`,
  },
  description: "A Next.js template with Supabase and shadcn/ui",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ThemeProvider attribute="class">
          {children}
          <Toaster />
          <UrlToaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
