import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Search, UsersRound, Eye } from "lucide-react";
import { AppShell } from "@/components/AppShell";
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
import { credenciados, MODELOS_CONTRATO } from "@/lib/mock-data";

export const Route = createFileRoute("/app/credenciados")({
  head: () => ({ meta: [{ title: "Credenciados — Credenciamento HUM" }] }),
  component: Credenciados,
});

function Credenciados() {
  const [busca, setBusca] = useState("");
  const [area, setArea] = useState("");

  const filtrados = useMemo(() => {
    const t = busca.trim().toLowerCase();
    return credenciados.filter(
      (c) =>
        (!t || c.nome.toLowerCase().includes(t) || c.cpfCnpj.includes(t)) &&
        (!area || c.area === area),
    );
  }, [busca, area]);

  return (
    <AppShell title="Credenciados">
      <PageHeader
        title="Consulta de Credenciados"
        description="Pesquise os profissionais credenciados e suas informações."
        actions={
          <Button asChild>
            <Link to="/app/credenciados/cadastrar">
              <Plus className="h-4 w-4" /> Cadastrar solicitação
            </Link>
          </Button>
        }
      />

      <FilterBar>
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou CPF/CNPJ"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9"
          />
        </div>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          className="h-9 rounded-md border border-input bg-card px-3 text-sm"
        >
          <option value="">Todas as áreas</option>
          {MODELOS_CONTRATO.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </FilterBar>

      <TableCard>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">CPF/CNPJ</TableHead>
              <TableHead className="hidden lg:table-cell">Função</TableHead>
              <TableHead>Área</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.map((c) => (
              <TableRow key={c.id}>
                <TableCell>
                  <div className="font-medium">{c.nome}</div>
                  <div className="text-xs text-muted-foreground">{c.email}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell text-muted-foreground">{c.cpfCnpj}</TableCell>
                <TableCell className="hidden lg:table-cell text-muted-foreground">{c.funcao}</TableCell>
                <TableCell className="text-muted-foreground">{c.area}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="text-primary" aria-label="Ver">
                    <Eye className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filtrados.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted-foreground">
                  <UsersRound className="mx-auto mb-2 h-8 w-8 opacity-40" />
                  Nenhum credenciado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableCard>
    </AppShell>
  );
}
