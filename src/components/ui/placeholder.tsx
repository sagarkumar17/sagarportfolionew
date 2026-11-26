import Image from "next/image";
import { cn } from "@/lib/cn";

export type PlaceholderKind =
  | "wide"
  | "large"
  | "square"
  | "portrait"
  | "4x3";

const SRC: Record<PlaceholderKind, { src: string; w: number; h: number }> = {
  wide: { src: "/assets/placeholders/placeholder-wide.jpg", w: 1600, h: 900 },
  large: { src: "/assets/placeholders/placeholder-large.jpg", w: 1200, h: 900 },
  square: {
    src: "/assets/placeholders/placeholder-square.jpg",
    w: 1000,
    h: 1000,
  },
  portrait: {
    src: "/assets/placeholders/placeholder-portrait.jpg",
    w: 900,
    h: 1200,
  },
  "4x3": { src: "/assets/placeholders/placeholder-4x3.jpg", w: 1200, h: 900 },
};

type PlaceholderProps = {
  kind?: PlaceholderKind;
  className?: string;
  /** Fill parent (absolute positioning). Parent must be relative. */
  fill?: boolean;
  alt?: string;
  priority?: boolean;
};

/** Gray dummy media — swap files under public/assets/placeholders/ later. */
export function Placeholder({
  kind = "wide",
  className,
  fill = false,
  alt = "",
  priority,
}: PlaceholderProps) {
  const asset = SRC[kind];

  if (fill) {
    return (
      <Image
        src={asset.src}
        alt={alt}
        fill
        priority={priority}
        className={cn("object-cover", className)}
        sizes="100vw"
      />
    );
  }

  return (
    <Image
      src={asset.src}
      alt={alt}
      width={asset.w}
      height={asset.h}
      priority={priority}
      className={cn("h-auto w-full object-cover", className)}
    />
  );
}

/** CSS-only gray block when an image file isn’t needed. */
export function PlaceholderBlock({
  className,
  label = "Placeholder",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-surface-primary text-text-secondary type-small",
        className,
      )}
      aria-hidden
    >
      {label}
    </div>
  );
}
