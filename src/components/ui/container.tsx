import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  /** Content starts at page midpoint (Maël Blanc split). */
  split?: boolean;
  as?: "div" | "header" | "footer" | "article";
};

export function Container({
  children,
  className,
  split = false,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-5 tablet:px-8",
        split && "lg:grid lg:grid-cols-2 lg:gap-8",
        className,
      )}
    >
      {split ? (
        <>
          <div className="hidden lg:block" aria-hidden />
          <div>{children}</div>
        </>
      ) : (
        children
      )}
    </Tag>
  );
}

type GridProps = {
  children: React.ReactNode;
  className?: string;
};

/** 12-column editorial grid. */
export function Grid({ children, className }: GridProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6", className)}>
      {children}
    </div>
  );
}

type CellProps = {
  children: React.ReactNode;
  className?: string;
  span?: 5 | 7 | 12;
};

export function Cell({ children, className, span = 12 }: CellProps) {
  const spanClass =
    span === 5
      ? "md:col-span-5"
      : span === 7
        ? "md:col-span-7"
        : "md:col-span-12";
  return <div className={cn(spanClass, className)}>{children}</div>;
}
