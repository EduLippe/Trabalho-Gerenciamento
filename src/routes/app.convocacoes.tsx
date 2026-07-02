import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, Megaphone, Eye } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { SituacaoBadge } from "@/components/StatusBadge";
import { PageHeader, FilterBar, TableCard } from "@/components/admin/AdminUI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { convocacoes, formatarData } from "@/lib/mock-data";

export const Route = createFileRoute("/app/convocacoes")({
  head: () => ({ meta: [{ title: "Convocações — Credenciamento HUM" }] }),
  component: Convocacoes,
});

function Convocacoes() {
  const [busca, setBusca] = useState("");
  const filtradas = useMemo(() => {
    const t = busca.trim().toLowerCase();
    return convocacoes.filter(
      (c) => !t || c.candidato.toLowerCase().includes(t) || c.edital.toLowerCase().includes(t),
    );
  }, [busca]);

  return (
    <AppShell title="Convocações">
      <PageHeader
        title="Convocações"
        description="Acompanhe as convocações emitidas e as respostas dos candidatos."
      />

      <FilterBar>
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por candidato ou edital"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>
      </FilterBar>

      <TableCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Candidato</TableHead>
              <TableHead className="hidden md:table-cell">Edital</TableHead>
              <TableHead className="hidden lg:table-cell">Convocado em</TableHead>
              <TableHead>Prazo</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtradas.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="font-medium">{c.candidato}</div>
                  <div className="text-xs text-muted-foreground">{c.funcao}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{c.edital}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {formatarData(c.dataConvocacao)}
                </TableCell>
                <TableCell className="text-muted-foreground">{formatarData(c.prazoResposta)}</TableCell>
                <TableCell>
                  <SituacaoBadge label={c.situacao} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-primary" aria-label="Ver">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtradas.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  <Megaphone className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  Nenhuma convocação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableCard>
    </AppShell>
  );
}
