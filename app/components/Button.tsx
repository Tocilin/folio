import { type AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-5 py-2.5 rounded-sm text-sm font-medium tracking-tight transition-opacity hover:opacity-80";
  const styles = {
    primary:   "bg-button-primary-fill text-button-primary-label",
    secondary: "border border-button-secondary-stroke text-button-secondary-label hover:opacity-100",
  };

  return (
    <a className={`${base} ${styles[variant]} ${className ?? ""}`} {...props}>
      {children}
    </a>
  );
}
