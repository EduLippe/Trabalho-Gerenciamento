import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, FileSearch, Eye } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { StatusBadge } from "@/components/StatusBadge";
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
import { editais, formatarData } from "@/lib/mock-data";

export const Route = createFileRoute("/app/editais")({
  head: () => ({ meta: [{ title: "Editais — Credenciamento HUM" }] }),
  component: Editais,
});

function Editais() {
  const [busca, setBusca] = useState("");
  const filtrados = useMemo(() => {
    const t = busca.trim().toLowerCase();
    return editais.filter(
      (e) =>
        !t ||
        e.numero.toLowerCase().includes(t) ||
        e.funcao.toLowerCase().includes(t) ||
        e.area.toLowerCase().includes(t),
    );
  }, [busca]);

  return (
    <AppShell title="Editais">
      <PageHeader title="Editais de Credenciamento" description="Consulte os editais publicados e sua vigência." />

      <FilterBar>
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nº, função ou área"
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
              <TableHead>Edital</TableHead>
              <TableHead className="hidden md:table-cell">Função</TableHead>
              <TableHead className="hidden lg:table-cell">Setor</TableHead>
              <TableHead>Encerramento</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.map((e) => (
              <TableRow key={e.id}>
                <TableCell>
                  <div className="font-medium">{e.numero}</div>
                  <div className="text-xs text-muted-foreground">{e.processo}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{e.funcao}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">{e.setor}</TableCell>
                <TableCell className="text-muted-foreground">{formatarData(e.encerraEm)}</TableCell>
                <TableCell>
                  <StatusBadge
                    label={e.vigente ? "Vigente" : "Encerrado"}
                    tone={e.vigente ? "success" : "neutral"}
                  />
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
                  <FileSearch className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  Nenhum edital encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableCard>
    </AppShell>
  );
}
