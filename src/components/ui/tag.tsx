import { cn } from "@/lib/cn";

type TagProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "accent";
};

export function Tag({ children, className, tone = "default" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center type-label px-2 py-0.5",
        tone === "accent"
          ? "bg-accent/10 text-accent"
          : "bg-surface-primary text-text-secondary",
        className,
      )}
    >
      {children}
    </span>
  );
}
