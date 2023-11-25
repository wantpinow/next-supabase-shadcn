import "@/styles/globals.css";
import { font } from "@/styles/font";
import { defaultMetadata } from "@/config/site";
import { Toaster } from "@/components/ui/toaster";
import { UrlToaster } from "@/components/url-toaster";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <Toaster />
        <UrlToaster />
        {children}
      </body>
    </html>
  );
}
