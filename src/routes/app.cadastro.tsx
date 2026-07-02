import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, ClipboardList, Eye } from "lucide-react";
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
import { cadastros, formatarData } from "@/lib/mock-data";

export const Route = createFileRoute("/app/cadastro")({
  head: () => ({ meta: [{ title: "Cadastro — Credenciamento HUM" }] }),
  component: Cadastro,
});

function Cadastro() {
  const [busca, setBusca] = useState("");
  const filtrados = useMemo(() => {
    const t = busca.trim().toLowerCase();
    return cadastros.filter(
      (c) => !t || c.nome.toLowerCase().includes(t) || c.protocolo.toLowerCase().includes(t),
    );
  }, [busca]);

  return (
    <AppShell title="Cadastro">
      <PageHeader
        title="Solicitações de Cadastro"
        description="Analise as solicitações de credenciamento recebidas."
      />

      <FilterBar>
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou protocolo"
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
              <TableHead>Protocolo</TableHead>
              <TableHead>Solicitante</TableHead>
              <TableHead className="hidden lg:table-cell">Edital</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-medium">{c.protocolo}</TableCell>
                <TableCell>
                  <div>{c.nome}</div>
                  <div className="text-xs text-muted-foreground">{c.funcao}</div>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">{c.edital}</TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">
                  {formatarData(c.data)}
                </TableCell>
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
            {filtrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted-foreground">
                  <ClipboardList className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  Nenhuma solicitação encontrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableCard>
    </AppShell>
  );
}
