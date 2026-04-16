import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Design & development work",
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
            if (localStorage.getItem('theme') === 'light')
              document.documentElement.classList.add('light');
          } catch(e) {}
        ` }} />
      </head>
      <body suppressHydrationWarning className={`${inter.variable} font-sans bg-surface-base text-fg-primary antialiased transition-colors duration-200`}>
        {children}
      </body>
    </html>
  );
}
