import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { FunText } from "@/app/components/FunText";

type FunLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  /** What the random color and underline style are picked from. Defaults to href. */
  seed?: string;
};

// The site's text link. On hover the text turns a bright solid color and a
// scribble underline draws in; both are picked per link, so every link looks
// different but stays the same between visits. Use this for any text link.
export function FunLink({ href, seed, className = "", children, ...rest }: FunLinkProps) {
  const body = <FunText seed={seed ?? href}>{children}</FunText>;
  const classes = `fun-link ${className}`;

  // Absolute URLs, mailto and in-page anchors go through a plain <a>.
  if (/^(https?:|mailto:|#)/.test(href)) {
    return (
      <a href={href} className={classes} {...rest}>
        {body}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {body}
    </Link>
  );
}
