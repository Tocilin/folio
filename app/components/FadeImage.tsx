"use client";

import { useState } from "react";
import NextImage from "next/image";

interface FadeImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function FadeImage({ src, alt, className = "", priority = false }: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ background: "rgb(var(--fg-primary) / 0.06)" }}
    >
      <NextImage
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 900px"
        priority={priority}
        className={`object-cover transition-opacity duration-700 ease-out ${loaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
