import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GardenViz",
  description: "Garden Design Visualizer for Busy Homeowners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans antialised">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
