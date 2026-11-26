import Link from "next/link";
import { cn } from "@/lib/cn";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

/** Standalone editorial text link — underline on hover only. */
export function TextLink({ href, children, className, external }: TextLinkProps) {
  const classes = cn(
    "type-small text-text-primary underline-offset-4 transition-colors hover:text-accent hover:underline",
    className,
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={classes}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
