import { cn } from "@/lib/cn";
import { Container } from "./container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Section title — Maël style plain label (not forced uppercase) */
  label?: string;
  count?: string | number;
  action?: React.ReactNode;
  soft?: boolean;
  inverse?: boolean;
  flush?: boolean;
};

/**
 * Maël Blanc section chrome: hairline rule with label left + (count) right,
 * then 48px to content.
 */
export function Section({
  children,
  className,
  id,
  label,
  count,
  action,
  soft,
  inverse,
  flush,
}: SectionProps) {
  const countText =
    count == null
      ? null
      : typeof count === "number"
        ? `(${String(count).padStart(2, "0")})`
        : count.startsWith("(")
          ? count
          : `(${count})`;

  return (
    <section
      id={id}
      className={cn(
        soft && "bg-surface-primary",
        inverse && "bg-surface-inverse text-text-inverse",
        !flush && "py-20 tablet:py-24 desktop:py-[7.5rem]",
        className,
      )}
    >
      <Container>
        {label || action ? (
          <div className="mb-12 border-t border-border-default pt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <p className="type-small text-text-primary">{label}</p>
              <div className="flex items-center gap-6">
                {action}
                {countText ? (
                  <p className="type-small text-text-secondary">{countText}</p>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
