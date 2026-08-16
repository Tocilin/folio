"use client";

import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

function storageKey(slug: string) {
  return `unlocked:${slug}`;
}

export function PasswordGate({
  slug,
  password,
  children,
}: {
  slug: string;
  password: string;
  children: ReactNode;
}) {
  const [unlocked, setUnlocked] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(storageKey(slug)) === "true") setUnlocked(true);
  }, [slug]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().toLowerCase() === password.toLowerCase()) {
      sessionStorage.setItem(storageKey(slug), "true");
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
    }
  }

  if (unlocked) return <>{children}</>;

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center px-6 md:px-12 h-16 border-b border-stroke bg-surface-base/90 backdrop-blur-md">
        <Link href="/" className="text-sm text-fg-secondary underline-dots hover:text-fg-primary transition-colors">
          ← Back
        </Link>
      </nav>
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col items-center justify-center gap-4 w-full max-w-xs mx-auto px-6">
        <p className="text-xs text-fg-tertiary uppercase tracking-widest">This page is password protected</p>
        <input
          type="password"
          autoFocus
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setError(false);
          }}
          placeholder="Password"
          className="w-full px-4 py-2.5 rounded-sm text-sm bg-transparent border border-button-secondary-stroke text-fg-primary placeholder:text-fg-tertiary focus:outline-none focus:border-button-secondary-stroke-hover transition-colors"
        />
        {error && <p className="text-xs text-red-500">Wrong password, try again.</p>}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-sm text-sm font-medium tracking-tight bg-button-primary-fill text-button-primary-label hover:bg-button-primary-fill-hover transition-colors"
        >
          Unlock
        </button>
      </form>
    </div>
  );
}
