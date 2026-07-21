import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Eugene Tochilin — Design & Management",
  description: "Independent designer and developer focused on product, brand, and AI-driven experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before paint — prevents theme flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('theme');
            if (t === 'light' || t === 'debug' || t === 'violet') document.documentElement.classList.add(t);
          } catch(e) {}
        ` }} />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans bg-surface-base text-fg-primary antialiased transition-colors duration-200`}>
        {children}
      </body>
    </html>
  );
}
