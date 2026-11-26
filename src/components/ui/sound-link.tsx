"use client";

import Link from "next/link";
import { useSound } from "@/components/sound-provider";
import { cn } from "@/lib/cn";

type SoundLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  external?: boolean;
  cue?: "click" | "whoosh";
};

/** Link that plays a soft UI cue when sound is enabled. */
export function SoundLink({
  href,
  children,
  className,
  onClick,
  external,
  cue = "click",
}: SoundLinkProps) {
  const { play } = useSound();

  const handle = () => {
    play(cue);
    onClick?.();
  };

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        className={className}
        onClick={handle}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : null)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(className)} onClick={handle}>
      {children}
    </Link>
  );
}
