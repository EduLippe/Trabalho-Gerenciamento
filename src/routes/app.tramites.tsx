import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, GitBranch, Eye } from "lucide-react";
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
import { tramites, formatarData } from "@/lib/mock-data";

export const Route = createFileRoute("/app/tramites")({
  head: () => ({ meta: [{ title: "Trâmites — Credenciamento HUM" }] }),
  component: Tramites,
});

function Tramites() {
  const [busca, setBusca] = useState("");
  const [tipo, setTipo] = useState("");

  const filtrados = useMemo(() => {
    const t = busca.trim().toLowerCase();
    return tramites.filter(
      (x) =>
        (!t || x.credenciado.toLowerCase().includes(t) || x.protocolo.toLowerCase().includes(t)) &&
        (!tipo || x.tipo === tipo),
    );
  }, [busca, tipo]);

  return (
    <AppShell title="Trâmites">
      <PageHeader
        title="Trâmites de Processos"
        description="Acompanhe a etapa atual de cada processo de credenciamento."
      />

      <FilterBar>
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por protocolo ou credenciado"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="h-9 rounded-md border border-input bg-card px-3 text-sm"
        >
          <option value="">Todos os tipos</option>
          <option value="Credenciamento">Credenciamento</option>
          <option value="Renovação">Renovação</option>
          <option value="Recurso">Recurso</option>
        </select>
      </FilterBar>

      <TableCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Protocolo</TableHead>
              <TableHead>Credenciado</TableHead>
              <TableHead className="hidden md:table-cell">Etapa</TableHead>
              <TableHead className="hidden lg:table-cell">Responsável</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.map((x) => (
              <TableRow key={x.id}>
                <TableCell>
                  <div className="font-medium">{x.protocolo}</div>
                  <div className="text-xs text-muted-foreground">{x.tipo}</div>
                </TableCell>
                <TableCell>{x.credenciado}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{x.etapa}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">
                  {x.responsavel}
                  <div className="text-xs">{formatarData(x.data)}</div>
                </TableCell>
                <TableCell>
                  <SituacaoBadge label={x.situacao} />
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-primary" aria-label="Ver">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  <GitBranch className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  Nenhum trâmite encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableCard>
    </AppShell>
  );
}
