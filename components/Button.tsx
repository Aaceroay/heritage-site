import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-colors " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brisa-600 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants = {
  primary: "bg-brisa-600 text-white hover:bg-brisa-700 dark:bg-brisa-500 dark:hover:bg-brisa-600",
  secondary:
    "bg-transparent text-brisa-700 border border-brisa-300 hover:bg-brisa-50 dark:text-brisa-100 dark:border-brisa-700 dark:hover:bg-brisa-900",
  accent: "bg-tierra-600 text-white hover:bg-tierra-700",
} as const;

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: { href: string; variant?: Variant } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: { variant?: Variant } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
