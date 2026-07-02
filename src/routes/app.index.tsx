import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  FileCheck2,
  AlertCircle,
  CalendarClock,
  BellRing,
  ArrowRight,
  CalendarPlus,
  FileSignature,
  UserPlus,
  FileSearch,
} from "lucide-react";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  dashboardKpis,
  credenciadosPorArea,
  alertas,
  contratos,
  diasParaVencer,
  formatarData,
  type DashboardKpi,
  type Alerta,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — Credenciamento HUM" }] }),
  component: Dashboard,
});

const kpiIcons: Record<DashboardKpi["icon"], React.ElementType> = {
  credenciados: Users,
  ativos: FileCheck2,
  pendencias: AlertCircle,
  entrevistas: CalendarClock,
  alertas: BellRing,
};

const donutColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
];

const totalCredenciados = credenciadosPorArea.reduce((s, a) => s + a.total, 0);

const proximosVencimento = contratos
  .filter((c) => c.status === "Ativo")
  .sort((a, b) => diasParaVencer(a.termino) - diasParaVencer(b.termino))
  .slice(0, 5);

const acoes = [
  { label: "Agendar entrevista", to: "/app/entrevistas/agendar", icon: CalendarPlus },
  { label: "Gerar contrato", to: "/app/contratos/gerar", icon: FileSignature },
  { label: "Nova solicitação", to: "/app/credenciados/cadastrar", icon: UserPlus },
  { label: "Consultar editais", to: "/app/editais", icon: FileSearch },
] as const;

const alertaTone: Record<Alerta["severidade"], string> = {
  alta: "border-l-destructive bg-destructive/5",
  media: "border-l-warning bg-warning/10",
  baixa: "border-l-success bg-success/5",
};

const alertaDot: Record<Alerta["severidade"], string> = {
  alta: "bg-destructive",
  media: "bg-warning",
  baixa: "bg-success",
};

function Dashboard() {
  return (
    <AppShell title="Dashboard">
      {/* Faixa de KPIs (card verde-escuro) */}
      <div className="grid gap-4 lg:grid-cols-5">
        <div className="brand-gradient rounded-2xl p-5 text-brand-foreground shadow-md lg:col-span-3">
          <p className="text-sm font-medium text-brand-foreground/80">Visão geral</p>
          <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-5">
            {dashboardKpis.map((kpi) => {
              const Icon = kpiIcons[kpi.icon];
              return (
                <div key={kpi.label} className="flex flex-col items-center text-center">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15">
                    <Icon className="h-4.5 w-4.5" />
                  </span>
                  <p className="mt-2 font-display text-3xl font-bold leading-none">{kpi.value}</p>
                  <p className="mt-1 text-[11px] leading-tight text-brand-foreground/80">
                    {kpi.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Donut — Credenciados por área */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm lg:col-span-2">
          <h2 className="font-display font-semibold">Credenciados por área</h2>
          <div className="mt-2 flex items-center gap-4">
            <div className="relative h-32 w-32 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={credenciadosPorArea}
                    dataKey="total"
                    nameKey="area"
                    innerRadius={42}
                    outerRadius={62}
                    paddingAngle={2}
                    stroke="none"
                  >
                    {credenciadosPorArea.map((_, i) => (
                      <Cell key={i} fill={donutColors[i % donutColors.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-2xl font-bold leading-none">
                  {totalCredenciados}
                </span>
                <span className="text-[10px] text-muted-foreground">total</span>
              </div>
            </div>
            <ul className="flex-1 space-y-1.5 text-sm">
              {credenciadosPorArea.map((a, i) => (
                <li key={a.area} className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: donutColors[i % donutColors.length] }}
                  />
                  <span className="flex-1 truncate text-muted-foreground">{a.area}</span>
                  <span className="font-semibold">{a.total}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Ações rápidas */}
        <div className="rounded-2xl border bg-card p-5 shadow-sm lg:col-span-2">
          <h2 className="font-display font-semibold">Ações rápidas</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {acoes.map((a) => (
              <Link
                key={a.to}
                to={a.to}
                className="group flex flex-col gap-2 rounded-xl border bg-secondary/40 p-4 transition-colors hover:border-primary/40 hover:bg-accent"
              >
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
                  <a.icon className="h-4.5 w-4.5" />
                </span>
                <span className="text-sm font-medium leading-tight">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Próximos vencimentos */}
        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm lg:col-span-3 [&_thead_tr]:bg-primary [&_thead_th]:text-primary-foreground">
          <div className="flex items-center justify-between px-5 py-4">
            <h2 className="font-display font-semibold">Contratos ativos — vigência</h2>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app/contratos">
                Ver todos <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato</TableHead>
                <TableHead className="hidden sm:table-cell">Término</TableHead>
                <TableHead className="text-right">Prazo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proximosVencimento.map((c) => {
                const dias = diasParaVencer(c.termino);
                return (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="font-medium">{c.numero}</div>
                      <div className="text-xs text-muted-foreground">{c.credenciado}</div>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-muted-foreground">
                      {formatarData(c.termino)}
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={cn(
                          "font-semibold",
                          dias < 0
                            ? "text-destructive"
                            : dias <= 30
                              ? "text-warning-foreground"
                              : "text-muted-foreground",
                        )}
                      >
                        {dias < 0 ? "Vencido" : `${dias} dias`}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Painel de alertas */}
      <div className="mt-6 rounded-2xl border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle className="h-4.5 w-4.5 text-primary" />
          <h2 className="font-display font-semibold">Alertas e pendências</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {alertas.map((a) => (
            <div
              key={a.id}
              className={cn("flex items-start gap-3 rounded-lg border-l-4 p-3", alertaTone[a.severidade])}
            >
              <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", alertaDot[a.severidade])} />
              <div>
                <p className="text-sm font-medium leading-snug">{a.titulo}</p>
                <p className="text-xs text-muted-foreground">{a.descricao}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
