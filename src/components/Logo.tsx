import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface LogoProps {
  to?: string;
  className?: string;
  /** default = dark text (light bg), light = white text (dark/green bg) */
  variant?: "default" | "light";
  /** show the "Hospital Universitário de Maringá" subtitle */
  showSubtitle?: boolean;
}

/**
 * HUM institutional mark — recreated from the prototype:
 * a green rounded tile with stacked horizontal bars, next to the "HUM"
 * wordmark and the hospital's full name.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-lg bg-brand shadow-sm",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" className="h-2/3 w-2/3" aria-hidden="true">
        <g fill="currentColor" className="text-brand-foreground">
          <rect x="3" y="5" width="18" height="3.2" rx="1.6" />
          <rect x="3" y="10.4" width="13" height="3.2" rx="1.6" />
          <rect x="3" y="15.8" width="8" height="3.2" rx="1.6" />
        </g>
      </svg>
    </span>
  );
}

export function Logo({
  to = "/",
  className,
  variant = "default",
  showSubtitle = true,
}: LogoProps) {
  return (
    <Link to={to} className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-xl font-extrabold tracking-tight",
            variant === "light" ? "text-white" : "text-brand-dark",
          )}
        >
          HUM
        </span>
        {showSubtitle && (
          <span
            className={cn(
              "mt-0.5 text-[9px] font-medium uppercase tracking-wide",
              variant === "light" ? "text-white/75" : "text-muted-foreground",
            )}
          >
            Hospital Universitário de Maringá
          </span>
        )}
      </span>
    </Link>
  );
}
