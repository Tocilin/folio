import { type AnchorHTMLAttributes } from "react";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
};

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const base = "inline-flex items-center justify-center px-5 py-2.5 rounded-sm text-sm font-medium tracking-tight transition-colors";
  const styles = {
    primary:   "bg-button-primary-fill text-button-primary-label hover:bg-button-primary-fill-hover",
    secondary: "border border-button-secondary-stroke text-button-secondary-label hover:bg-fill-frame hover:border-button-secondary-stroke-hover hover:text-button-secondary-label-hover",
  };

  return (
    <a className={`${base} ${styles[variant]} ${className ?? ""}`} {...props}>
      {children}
    </a>
  );
}
