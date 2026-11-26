import { cn } from "@/lib/cn";
import { Container } from "./container";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  label?: string;
  count?: string | number;
  action?: React.ReactNode;
  /** Soft panel background */
  soft?: boolean;
  inverse?: boolean;
  /** Skip default vertical padding */
  flush?: boolean;
};

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
  return (
    <section
      id={id}
      className={cn(
        "border-t border-border-default",
        soft && "bg-surface-primary",
        inverse && "bg-surface-inverse text-text-inverse",
        !flush && "py-20 md:py-24 xl:py-[7.5rem]",
        className,
      )}
    >
      <Container>
        {label || action ? (
          <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
            <div>
              {label ? (
                <p className="type-label text-text-secondary">
                  {label}
                  {count != null ? (
                    <span className="ml-2 text-text-secondary">
                      [({typeof count === "number" ? String(count).padStart(2, "0") : count})]
                    </span>
                  ) : null}
                </p>
              ) : null}
            </div>
            {action}
          </div>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
