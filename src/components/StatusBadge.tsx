import { cn } from "@/lib/utils";
import type { ContratoStatus, EntrevistaResultado } from "@/lib/mock-data";

type Tone = "success" | "warning" | "info" | "danger" | "neutral";

const toneClass: Record<Tone, string> = {
  success: "bg-success/15 text-success border-success/30",
  warning: "bg-warning/20 text-warning-foreground border-warning/40",
  info: "bg-info/15 text-info border-info/30",
  danger: "bg-destructive/12 text-destructive border-destructive/30",
  neutral: "bg-muted text-muted-foreground border-border",
};

const contratoTone: Record<ContratoStatus, Tone> = {
  Pendente: "neutral",
  "Em análise": "info",
  "Aguardando assinatura": "warning",
  Ativo: "success",
  Encerrado: "neutral",
  Suspenso: "danger",
};

const entrevistaTone: Record<EntrevistaResultado, Tone> = {
  Agendada: "info",
  Aprovado: "success",
  Recusado: "danger",
};

export function StatusBadge({
  label,
  tone,
  className,
}: {
  label: string;
  tone: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        toneClass[tone],
        className,
      )}
    >
      {label}
    </span>
  );
}

export function ContratoBadge({ status }: { status: ContratoStatus }) {
  return <StatusBadge label={status} tone={contratoTone[status]} />;
}

export function EntrevistaBadge({ resultado }: { resultado: EntrevistaResultado }) {
  return <StatusBadge label={resultado} tone={entrevistaTone[resultado]} />;
}

/** Picks a tone from a free-form status label — used by the admin table screens. */
const positivas = ["ativo", "confirmada", "concluído", "realizado", "apto", "aprovado", "regularizada"];
const alertas = ["pendente", "pendência", "aguardando", "andamento", "análise", "agendado"];
const negativas = ["inativo", "recusada", "recusado", "cancelado", "vencido", "encerrado", "suspenso"];

export function situacaoTone(label: string): Tone {
  const l = label.toLowerCase();
  if (negativas.some((k) => l.includes(k))) return "danger";
  if (positivas.some((k) => l.includes(k))) return "success";
  if (alertas.some((k) => l.includes(k))) return "warning";
  return "neutral";
}

export function SituacaoBadge({ label }: { label: string }) {
  return <StatusBadge label={label} tone={situacaoTone(label)} />;
}

