import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vinrsr",
  description: "Personal site of vinrsr – game developer, creator, and visual world builder.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}