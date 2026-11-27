"use client";

import { cn } from "@/lib/cn";

type ModuleShellProps = {
  children: React.ReactNode;
  className?: string;
  depth: 1 | 2 | 3;
  label: string;
};

/** Shared chrome for modular product UI panels — Maël hover: no scale. */
export function ModuleShell({
  children,
  className,
  depth,
  label,
}: ModuleShellProps) {
  return (
    <div
      data-hero-module
      data-depth={depth}
      className={cn(
        "hero-module group/mod absolute select-none overflow-hidden border border-border-default bg-surface-secondary/90 shadow-[0_1px_0_rgb(0_0_0_/0.04)] backdrop-blur-md transition-[border-color,background-color] duration-300 ease-out will-change-transform",
        "hover:border-accent/40 hover:bg-surface-secondary",
        className,
      )}
      aria-hidden
    >
      <div className="flex items-center justify-between border-b border-border-default px-3 py-1.5">
        <span className="type-label text-text-secondary transition-colors group-hover/mod:text-accent">
          {label}
        </span>
        <span className="flex gap-1" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-border-default" />
          <span className="h-1.5 w-1.5 rounded-full bg-border-default" />
          <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
        </span>
      </div>
      <div className="p-3">{children}</div>
    </div>
  );
}

/** Design-system tokens — swatches + type specimen. */
export function ModuleDsTokens({ className }: { className?: string }) {
  return (
    <ModuleShell
      depth={2}
      label="Design system"
      className={cn(
        "left-[6%] top-[18%] w-[min(220px,42vw)] tablet:left-[8%] tablet:top-[22%] tablet:w-[240px]",
        className,
      )}
    >
      <div className="flex gap-1.5">
        {["bg-text-primary", "bg-text-secondary", "bg-surface-primary", "bg-accent"].map(
          (swatch) => (
            <span
              key={swatch}
              className={cn(
                "h-7 flex-1 border border-border-default transition-[filter,opacity] duration-300 group-hover/mod:opacity-100",
                swatch,
              )}
            />
          ),
        )}
      </div>
      <p className="mt-3 type-small font-semibold tracking-tight text-text-primary">
        Inter · 600
      </p>
      <p className="type-label mt-1 text-text-secondary">Display / H2 / Body</p>
    </ModuleShell>
  );
}

/** Compact product interface — list + detail frame. */
export function ModuleProductFrame({ className }: { className?: string }) {
  const rows = [
    { t: "Checkout flow", s: "Live" },
    { t: "Empty states", s: "Review" },
    { t: "Nav IA", s: "Shipped" },
  ];

  return (
    <ModuleShell
      depth={3}
      label="Product UI"
      className={cn(
        "right-[5%] top-[14%] w-[min(240px,46vw)] tablet:right-[10%] tablet:top-[16%] tablet:w-[260px]",
        className,
      )}
    >
      <ul className="space-y-2">
        {rows.map((row) => (
          <li
            key={row.t}
            className="flex items-center justify-between border-b border-border-default/60 pb-2 last:border-0 last:pb-0"
          >
            <span className="type-small text-text-primary">{row.t}</span>
            <span
              className={cn(
                "type-label",
                row.s === "Live" ? "text-accent" : "text-text-secondary",
              )}
            >
              {row.s}
            </span>
          </li>
        ))}
      </ul>
    </ModuleShell>
  );
}

/** AI workflow chip — prompt → response. */
export function ModuleAiStrip({ className }: { className?: string }) {
  return (
    <ModuleShell
      depth={1}
      label="AI workflow"
      className={cn(
        "bottom-[22%] left-[10%] w-[min(260px,52vw)] tablet:bottom-[20%] tablet:left-[14%] tablet:w-[280px]",
        className,
      )}
    >
      <div className="rounded-sm bg-surface-primary px-2.5 py-2">
        <p className="type-label text-text-secondary">Prompt</p>
        <p className="type-small mt-1 text-text-primary">
          Map onboarding → activation
        </p>
      </div>
      <div className="mt-2 flex items-center gap-2 border-l-2 border-accent pl-2.5">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-pulse rounded-full bg-accent/40" />
          <span className="relative h-2 w-2 rounded-full bg-accent" />
        </span>
        <p className="type-small text-text-secondary">
          3 flows · 1 recommendation
        </p>
      </div>
    </ModuleShell>
  );
}

/** Complex workflow rail — stepped nodes. */
export function ModuleWorkflow({ className }: { className?: string }) {
  const steps = ["Discover", "System", "Ship"];

  return (
    <ModuleShell
      depth={2}
      label="Workflow"
      className={cn(
        "bottom-[18%] right-[6%] w-[min(250px,48vw)] tablet:bottom-[16%] tablet:right-[12%] tablet:w-[270px]",
        className,
      )}
    >
      <ol className="flex items-center gap-1">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-1 items-center gap-1">
            <div className="min-w-0 flex-1">
              <p className="type-label text-accent">
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="type-small truncate text-text-primary">{step}</p>
            </div>
            {i < steps.length - 1 ? (
              <span
                className="h-px w-3 shrink-0 bg-border-strong/40 transition-[background-color,width] duration-300 group-hover/mod:w-4 group-hover/mod:bg-accent/50"
                aria-hidden
              />
            ) : null}
          </li>
        ))}
      </ol>
    </ModuleShell>
  );
}
