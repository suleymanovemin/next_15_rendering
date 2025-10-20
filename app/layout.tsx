import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next.js 15 Rendering Strategiyaları | CSR, SSR, SSG, ISR, PPR",
  description: "Next.js 15-də mövcud olan bütün rendering strategiyalarını öyrənin. Client-Side Rendering (CSR), Server-Side Rendering (SSR), Static Site Generation (SSG), Incremental Static Regeneration (ISR) və Partial Prerendering (PPR) haqqında ətraflı məlumat və praktik nümunələr.",
  keywords: "Next.js, React, CSR, SSR, SSG, ISR, PPR, rendering, performance, SEO, web development",
  authors: [{ name: "Next.js Rendering Demo" }],
  openGraph: {
    title: "Next.js 15 Rendering Strategiyaları",
    description: "Bütün rendering strategiyalarını praktik nümunələrlə öyrənin",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <div className="container mx-auto max-w-4xl">{children}</div>
      </body>
    </html>
  );
}
