import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Section title with the institutional green underline + optional actions. */
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="page-underline font-display text-2xl font-bold tracking-tight text-brand-dark">
          {title}
        </h2>
        {description && <p className="mt-2 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

/** Light card that groups the search / filter controls above a table. */
export function FilterBar({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-xl border bg-card p-4 shadow-sm", className)}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{children}</div>
    </div>
  );
}

/** Card wrapper around a data table with a green header row (see prototype). */
export function TableCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "mt-5 overflow-hidden rounded-xl border bg-card shadow-sm [&_thead_tr]:bg-primary [&_thead_th]:text-primary-foreground [&_thead_th]:font-semibold",
        className,
      )}
    >
      {children}
    </div>
  );
}
