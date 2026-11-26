import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-ground-strong">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-8">
        <p className="text-sm text-muted">
          © 2026 {site.name}. Independent designer ·{" "}
          <a
            href={site.pluxUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink underline decoration-accent/60 underline-offset-4 transition-colors hover:text-accent"
          >
            Plux Studio
          </a>
        </p>
        <div className="flex gap-6 text-sm text-muted">
          <Link href="/work" className="hover:text-accent">
            Work
          </Link>
          <Link href="/about" className="hover:text-accent">
            About
          </Link>
          <Link href="/contact" className="hover:text-accent">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
