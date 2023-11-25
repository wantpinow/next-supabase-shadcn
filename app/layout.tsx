import "@/styles/globals.css";
import { font } from "@/styles/font";
import { defaultMetadata } from "@/config/site";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
