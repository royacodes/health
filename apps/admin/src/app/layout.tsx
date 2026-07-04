import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healthy Recipe Platform - Admin",
  description: "Admin dashboard for Healthy Recipe Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
