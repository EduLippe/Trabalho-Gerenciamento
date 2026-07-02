import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, Download, ArrowRight, FileText } from "lucide-react";
import { PublicHeader } from "@/components/PublicHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { StatusBadge } from "@/components/StatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { editais, formatarData, MODELOS_CONTRATO } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Editais Abertos — Credenciamento HUM" },
      {
        name: "description",
        content:
          "Consulte os editais de credenciamento do Hospital Universitário de Maringá e inscreva-se nos processos abertos.",
      },
      { property: "og:title", content: "Editais Abertos — Credenciamento HUM" },
      {
        property: "og:description",
        content: "Editais de credenciamento do Hospital Universitário de Maringá.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("");
  const [somenteVigentes, setSomenteVigentes] = useState(true);

  const filtrados = useMemo(() => {
    return editais.filter((e) => {
      const termo = busca.trim().toLowerCase();
      const matchBusca =
        !termo ||
        e.numero.toLowerCase().includes(termo) ||
        e.funcao.toLowerCase().includes(termo) ||
        e.setor.toLowerCase().includes(termo);
      const matchArea = !area || e.area === area;
      const matchVigente = !somenteVigentes || e.vigente;
      return matchBusca && matchArea && matchVigente;
    });
  }, [busca, area, somenteVigentes]);

  return (
    <div className="min-h-screen">
      <PublicHeader />

      <section className="brand-gradient text-brand-foreground">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-medium">
            Hospital Universitário de Maringá
          </span>
          <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            Credenciamento de profissionais de saúde
          </h1>
          <p className="mt-3 max-w-xl text-sm text-brand-foreground/85 sm:text-base">
            Acompanhe os editais abertos, consulte as funções disponíveis e realize sua inscrição
            de forma simples e centralizada.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild size="lg" variant="secondary">
              <Link to="/inscreva-se">
                Inscreva-se <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <a href="#editais">Ver editais</a>
            </Button>
          </div>
        </div>
      </section>

      <section id="editais" className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1.5">
            <h2 className="font-display text-xl font-semibold">Editais</h2>
            <p className="text-sm text-muted-foreground">
              {filtrados.length} {filtrados.length === 1 ? "edital encontrado" : "editais encontrados"}
            </p>
          </div>
          <div className="grid w-full gap-3 sm:max-w-xl sm:grid-cols-[1fr_auto]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Buscar por nº, função ou setor"
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-9"
              />
            </div>
            <select
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="h-9 rounded-md border border-input bg-card px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <option value="">Todas as áreas</option>
              {MODELOS_CONTRATO.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-2 sm:col-span-2">
              <Switch
                id="vigentes"
                checked={somenteVigentes}
                onCheckedChange={setSomenteVigentes}
              />
              <Label htmlFor="vigentes" className="text-sm text-muted-foreground">
                Mostrar apenas editais vigentes
              </Label>
            </div>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-secondary/60">
                <TableHead className="w-[120px]">Nº do Edital</TableHead>
                <TableHead>Função</TableHead>
                <TableHead className="hidden md:table-cell">Setor</TableHead>
                <TableHead className="hidden sm:table-cell">Prazo</TableHead>
                <TableHead>Situação</TableHead>
                <TableHead className="text-right">Edital</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtrados.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.numero}</TableCell>
                  <TableCell>
                    <div className="font-medium">{e.funcao}</div>
                    <div className="text-xs text-muted-foreground">{e.area}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {e.setor}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    até {formatarData(e.encerraEm)}
                  </TableCell>
                  <TableCell>
                    {e.vigente ? (
                      <StatusBadge label="Vigente" tone="success" />
                    ) : (
                      <StatusBadge label="Encerrado" tone="neutral" />
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toast.info("Download do edital (protótipo)")}
                    >
                      <Download className="h-4 w-4" /> PDF
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filtrados.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                    <FileText className="mx-auto mb-2 h-8 w-8 opacity-40" />
                    Nenhum edital encontrado com os filtros aplicados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <footer className="border-t bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6 text-center text-xs text-muted-foreground sm:px-6">
          Hospital Universitário de Maringá — Sistema de Credenciamento (protótipo)
        </div>
      </footer>
    </div>
  );
}
