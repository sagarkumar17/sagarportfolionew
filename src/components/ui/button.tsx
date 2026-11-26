import Link from "next/link";
import { cn } from "@/lib/cn";

const variants = {
  dark:
    "bg-surface-inverse text-text-inverse hover:bg-surface-inverse-hover",
  outline:
    "border border-border-strong bg-transparent text-text-primary hover:bg-surface-inverse hover:text-text-inverse",
  light:
    "bg-static-white text-static-black hover:bg-surface-primary",
  "outline-light":
    "border border-static-white/40 bg-transparent text-static-white hover:bg-static-white hover:text-static-black",
  accent:
    "bg-accent text-accent-foreground hover:opacity-90",
} as const;

export type ButtonVariant = keyof typeof variants;

type Common = {
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonAsButton = Common &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = Common & {
  href: string;
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 px-6 py-3 type-small transition-colors duration-200";

export function Button(props: ButtonProps) {
  const variant = props.variant ?? "dark";
  const className = cn(base, variants[variant], props.className);

  if ("href" in props && props.href) {
    const { href, external, children } = props;
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          className={className}
          {...(href.startsWith("http")
            ? { target: "_blank", rel: "noopener noreferrer" }
            : null)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  const { children, type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={className} {...rest}>
      {children}
    </button>
  );
}
