import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border-default bg-surface-secondary">
      <div className="mx-auto flex flex-col gap-6 px-5 py-10 tablet:flex-row tablet:items-center tablet:justify-between tablet:px-8">
        <p className="type-small text-text-secondary">
          © 2026 {site.name}. Independent designer ·{" "}
          <a
            href={site.pluxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
          >
            Plux Studio
          </a>
        </p>
        <div className="flex flex-wrap gap-6 type-small text-text-secondary">
          <Link href="/work" className="hover:text-accent">
            Work
          </Link>
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
          <Link href="/styleguide" className="hover:text-accent">
            Styleguide
          </Link>
        </div>
      </div>
    </footer>
  );
}
